# Convex Migration - Setup Guide

This project has been migrated from Prisma/PostgreSQL to Convex for real-time data management.

## What Changed?

### ✅ Removed
- Prisma ORM and schema
- PostgreSQL database requirement
- API routes (`/api/contact`, `/api/upload-cv`, `/api/jobs`, `/api/news`)
- Manual database configuration

### ✅ Added
- Convex backend with real-time queries
- Convex schema in `convex/schema.ts`
- Convex functions in `convex/` directory
- ConvexProvider in Next.js app

## Setup Instructions

### 1. Install Dependencies (Already Done)
```bash
npm install convex
```

### 2. Initialize Convex
Run this command and follow the prompts:
```bash
npx convex dev
```

This will:
- Prompt you to login/create a Convex account
- Create a new Convex project
- Generate `convex/_generated` files
- Give you a deployment URL

### 3. Set Environment Variable
Add the URL from step 2 to your `.env.local`:
```
NEXT_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
```

### 4. Seed Sample Data
In the Convex dashboard (opens automatically), or via CLI:
```bash
npx convex run seed:seedData
```

This creates sample:
- 4 job listings (2 featured)
- 2 news articles
- 1 team member

### 5. Start Development
Keep `convex dev` running in one terminal:
```bash
npx convex dev
```

Start Next.js in another terminal:
```bash
npm run dev
```

## Convex Dashboard

Access your dashboard at: https://dashboard.convex.dev

Features:
- View all data in real-time
- Run queries and mutations manually
- Monitor function performance
- View logs and errors

## Architecture Overview

### Schema (`convex/schema.ts`)
Defines 5 tables:
- `jobs` - Job listings with filtering indexes
- `cvUploads` - CV submissions linked to jobs
- `newsArticles` - Blog/news content
- `teamMembers` - Team profiles
- `contactSubmissions` - Contact form submissions

### Queries (`convex/*.ts`)
- `jobs.list` - Get filtered job listings
- `jobs.getBySlug` - Get single job by slug
- `news.list` - Get published articles
- `news.getBySlug` - Get single article
- `news.getRelated` - Get related articles
- `team.list` - Get active team members

### Mutations (`convex/*.ts`)
- `contact.submit` - Submit contact form
- `cvUploads.submit` - Submit CV application

### Client Usage
```tsx
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

// Fetch data
const jobs = useQuery(api.jobs.list, { type: "PERMANENT" })

// Submit data
const submitContact = useMutation(api.contact.submit)
await submitContact({ name, email, message, type })
```

## Deployment to Vercel

### 1. Deploy Convex to Production
```bash
npx convex deploy
```

This gives you a production URL.

### 2. Set Vercel Environment Variable
In Vercel dashboard, add:
```
NEXT_PUBLIC_CONVEX_URL=<your-production-convex-url>
```

### 3. Seed Production Data
```bash
npx convex run --prod seed:seedData
```

### 4. Deploy Next.js
```bash
git push origin master
```

Vercel will automatically deploy.

## Benefits of Convex

1. **Real-time Updates** - Data changes appear instantly in UI
2. **No Database Setup** - Convex handles hosting and scaling
3. **Type Safety** - Generated TypeScript types
4. **Automatic Indexes** - Optimized queries out of the box
5. **Built-in Auth** - Easy integration with Clerk/Auth0
6. **Developer Experience** - Hot reloading, great debugging

## Troubleshooting

### Error: "Cannot find module @/convex/_generated/api"
Run `npx convex dev` - it generates these files automatically.

### Error: "NEXT_PUBLIC_CONVEX_URL is not defined"
Make sure you have `.env.local` with the Convex URL from `npx convex dev`.

### Data not showing?
1. Check Convex dashboard - is data there?
2. Run seed script: `npx convex run seed:seedData`
3. Check browser console for errors

### Build failing?
Make sure `convex dev` has run at least once to generate types.

## Next Steps

- [ ] Add authentication (Clerk recommended)
- [ ] Implement file storage for CV uploads
- [ ] Add email notifications (Resend integration)
- [ ] Create admin dashboard for content management
- [ ] Add more seed data

## Support

- Convex Docs: https://docs.convex.dev
- Convex Discord: https://convex.dev/community
- Next.js + Convex Guide: https://docs.convex.dev/quickstart/nextjs
