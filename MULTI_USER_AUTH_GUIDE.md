# Multi-User Authentication Implementation Guide

## Overview
This guide explains how to implement individual user logins for each team member with role-based permissions.

---

## Recommended Approach: Simple Email/Password Auth

### Why This Approach?
- **Simple to implement**: 4-6 hours of development
- **No monthly costs**: No third-party services required
- **Perfect for team size**: Ideal for 10 users
- **Secure**: Industry-standard bcrypt password hashing
- **Customizable**: Full control over permissions and features

---

## Implementation Plan

### Phase 1: Database Schema (30 minutes)

#### Add Users Table to Convex Schema

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ... existing tables ...

  users: defineTable({
    email: v.string(),
    name: v.string(),
    role: v.union(
      v.literal("ADMIN"),      // Full access - Neil, Ellie
      v.literal("CONSULTANT"),  // Limited access - Consultants
      v.literal("VIEWER")       // Read-only - Kate, Sarah
    ),
    passwordHash: v.string(),
    active: v.boolean(),
    teamMemberId: v.optional(v.id("teamMembers")),
    lastLogin: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"])
    .index("by_active", ["active"]),

  // Activity log for audit trail
  activityLog: defineTable({
    userId: v.id("users"),
    action: v.string(), // "created_job", "edited_job", "deleted_job", etc.
    resourceType: v.string(), // "job", "cv", "team", etc.
    resourceId: v.optional(v.string()),
    details: v.optional(v.string()),
    timestamp: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_resource", ["resourceType", "resourceId"])
    .index("by_timestamp", ["timestamp"]),
});
```

### Phase 2: Authentication Functions (1-2 hours)

#### Create User Management Functions

```typescript
// convex/users.ts
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Query: Get user by email (for login)
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    return user;
  },
});

// Query: Get current user
export const getCurrent = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user || !user.active) return null;

    // Don't return password hash
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
});

// Query: List all users (admin only)
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    // Remove password hashes from response
    return users.map(({ passwordHash, ...user }) => user);
  },
});

// Mutation: Create new user (admin only)
export const create = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("ADMIN"), v.literal("CONSULTANT"), v.literal("VIEWER")),
    password: v.string(),
    teamMemberId: v.optional(v.id("teamMembers")),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("User with this email already exists");
    }

    // In production, use bcrypt or similar - this is a placeholder
    // You'll need to implement password hashing in your API route
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      role: args.role,
      passwordHash: args.password, // TEMPORARY - hash this properly!
      active: true,
      teamMemberId: args.teamMemberId,
      createdAt: Date.now(),
    });

    return userId;
  },
});

// Mutation: Update user
export const update = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    role: v.optional(v.union(v.literal("ADMIN"), v.literal("CONSULTANT"), v.literal("VIEWER"))),
    active: v.optional(v.boolean()),
    teamMemberId: v.optional(v.id("teamMembers")),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

// Mutation: Update last login
export const updateLastLogin = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      lastLogin: Date.now(),
    });
  },
});

// Mutation: Change password
export const changePassword = mutation({
  args: {
    userId: v.id("users"),
    newPasswordHash: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      passwordHash: args.newPasswordHash,
    });
    return { success: true };
  },
});
```

### Phase 3: Update Authentication API (1 hour)

#### Update Auth Route for Multi-User Support

```typescript
// src/app/api/admin/auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs"; // npm install bcryptjs

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Fetch user from Convex by email
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/query`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "users:getByEmail",
          args: { email },
        }),
      }
    );

    const user = await response.json();

    if (!user || !user.active) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Update last login
    await fetch(`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/mutation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "users:updateLastLogin",
        args: { userId: user._id },
      }),
    });

    // Create session
    const sessionData = {
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const cookieStore = await cookies();
    cookieStore.set("admin_session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin_session");

    if (!sessionCookie?.value) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie.value);

    return NextResponse.json({
      authenticated: true,
      user: session,
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
```

### Phase 4: Update Login Page (30 minutes)

```typescript
// src/app/admin/login/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Lock, Mail } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        setError(data.error || "Invalid credentials")
      }
    } catch {
      setError("Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">ME Recruits Admin</CardTitle>
          <CardDescription>Sign in with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@merecruits.com"
                  className="pl-10"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Protected area - authorized access only</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

### Phase 5: Permission System (1-2 hours)

#### Create Permission Helper

```typescript
// src/lib/permissions.ts
export type UserRole = "ADMIN" | "CONSULTANT" | "VIEWER";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  teamMemberId?: string;
}

export const permissions = {
  // Job permissions
  canCreateJob: (user: User) => ["ADMIN", "CONSULTANT"].includes(user.role),
  canEditJob: (user: User, jobConsultant?: string) => {
    if (user.role === "ADMIN") return true;
    if (user.role === "CONSULTANT") {
      return !jobConsultant || jobConsultant === user.name;
    }
    return false;
  },
  canDeleteJob: (user: User) => user.role === "ADMIN",
  canViewAllJobs: (user: User) => true, // Everyone can view

  // CV permissions
  canViewCVs: (user: User) => true, // Everyone can view CVs
  canDeleteCV: (user: User) => user.role === "ADMIN",

  // Team permissions
  canManageTeam: (user: User) => user.role === "ADMIN",

  // User management
  canManageUsers: (user: User) => user.role === "ADMIN",

  // Settings
  canChangeSettings: (user: User) => user.role === "ADMIN",
};
```

---

## Initial User Setup

### Create Admin Users (Run Once)

```typescript
// convex/seed.ts - Add this function

export const createInitialUsers = mutation({
  args: {},
  handler: async (ctx) => {
    // NOTE: In production, hash these passwords properly with bcrypt!
    const users = [
      {
        email: "neil@merecruits.com",
        name: "Neil Simmons",
        role: "ADMIN" as const,
        // Password: MERneil2025! (use bcrypt in production)
        passwordHash: "TEMPORARY_HASH",
        teamMemberId: undefined, // Link to team member if exists
      },
      {
        email: "ellie@merecruits.com",
        name: "Ellie Waterman",
        role: "ADMIN" as const,
        passwordHash: "TEMPORARY_HASH",
      },
      {
        email: "helen@merecruits.com",
        name: "Helen Barham",
        role: "CONSULTANT" as const,
        passwordHash: "TEMPORARY_HASH",
      },
      // ... add all 10 team members
    ];

    for (const user of users) {
      await ctx.db.insert("users", {
        ...user,
        active: true,
        createdAt: Date.now(),
      });
    }

    return { success: true, usersCreated: users.length };
  },
});
```

---

## Testing Checklist

- [ ] Admin can log in with email/password
- [ ] Consultant can log in
- [ ] Viewer can log in
- [ ] Admin can create/edit/delete any job
- [ ] Consultant can only edit their own jobs
- [ ] Viewer cannot edit anything
- [ ] Session persists across page refreshes
- [ ] Logout works correctly
- [ ] Invalid login shows error
- [ ] Inactive users cannot log in

---

## Security Considerations

1. **Password Hashing**: Always use bcrypt with high salt rounds (12+)
2. **Session Security**: Use HTTP-only, secure cookies
3. **Password Requirements**: Enforce strong passwords (min 12 chars, mixed case, numbers, symbols)
4. **Rate Limiting**: Add rate limiting to prevent brute force attacks
5. **Password Reset**: Implement secure password reset flow with email verification
6. **Activity Logging**: Log all important actions for audit trail

---

## Cost & Time Estimate

### Development Time:
- **Database Schema**: 30 minutes
- **Authentication Functions**: 1-2 hours
- **API Route Updates**: 1 hour
- **Login Page**: 30 minutes
- **Permission System**: 1-2 hours
- **Testing**: 1 hour

**Total: 4-6 hours**

### Ongoing Costs:
- **$0/month** - No external services required
- Uses existing Convex and Vercel infrastructure

---

## Alternative: Quick Password-Per-User Setup (1 hour)

If you need something faster, you can implement a simpler system:

1. Each user gets a unique password stored in Vercel environment variables
2. Login form has dropdown to select user
3. Password check happens in API route

This is less secure and doesn't scale well, but can be implemented in 1 hour.

---

## Next Steps

1. Decide which approach to use
2. Install required packages (`bcryptjs`)
3. Update database schema
4. Implement authentication functions
5. Test thoroughly
6. Create user accounts for all team members
7. Provide login credentials securely

Would you like me to implement this system for you?
