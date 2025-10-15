# ME Recruits - Pre-Launch Checklist & Recommendations

## ✅ Current Status
All jobs (21 in database) are editable through the admin panel.

---

## 🔴 CRITICAL - Must Fix Before Launch

### 1. **Remove Duplicate Jobs**
- **Issue**: Database has 21 jobs but 10 are duplicates from re-running seed
- **Impact**: Confuses admin panel, clutters job listings
- **Fix**: Run cleanup script to remove duplicates
- **Priority**: HIGH

### 2. **Fix API Keys Exposure**
- **Issue**: `.env.local` contains API keys and should NEVER be committed to Git
- **Impact**: Security risk - API keys visible in repository
- **Current Keys Exposed**:
  - Resend API key
  - OpenAI API key
- **Fix**:
  1. Remove `.env.local` from Git history
  2. Rotate both API keys (generate new ones)
  3. Add `.env.local` to `.gitignore` (already done)
  4. Update environment variables in Vercel and Convex with new keys
- **Priority**: CRITICAL

### 3. **Admin Password Security**
- **Issue**: Default password is "merecruits2025" and stored in environment variables
- **Impact**: Not secure for production use
- **Fix**: Change to a strong, unique password in Vercel environment variables
- **Priority**: HIGH

### 4. **Placeholder LinkedIn Links**
- **Issue**: Team member cards have `href="#"` for LinkedIn buttons (line 83 in meet-the-team/page.tsx)
- **Impact**: Poor user experience, non-functional buttons
- **Fix Options**:
  1. Remove LinkedIn buttons entirely
  2. Add actual LinkedIn profile URLs to team member database
  3. Hide buttons if no LinkedIn URL provided
- **Priority**: MEDIUM

---

## 🟡 RECOMMENDED - Should Fix Before Launch

### 5. **Team Member Photos**
- **Current**: Using initials in colored circles
- **Recommendation**: Add professional headshots for all 10 team members
- **Implementation**:
  1. Upload photos to Convex file storage
  2. Update team member records with imageUrl
  3. Display actual photos instead of initials
- **Priority**: MEDIUM

### 6. **Email Verification**
- **Issue**: Using Resend test domain `onboarding@resend.dev`
- **Impact**: Emails may go to spam, looks unprofessional
- **Fix**:
  1. Verify merecruits.com domain with Resend
  2. Update email 'from' addresses to use @merecruits.com
  3. Add SPF/DKIM DNS records
- **Priority**: MEDIUM

### 7. **Admin Dashboard Stats**
- **Issue**: Dashboard shows hardcoded numbers (10 jobs, 23 CVs, 4 team members, 8 contacts)
- **Recommendation**: Make these dynamic with real data from database
- **Priority**: LOW

### 8. **Contact Form Functionality**
- **Status**: Need to verify contact form submissions work
- **Check**: Test contact form and ensure submissions are stored in database
- **Priority**: MEDIUM

### 9. **Robots.txt & SEO**
- **Current**: Has robots.txt file
- **Check**: Ensure sitemap is working correctly
- **Recommendation**: Test sitemap.xml generates properly
- **Priority**: LOW

### 10. **Remove Test Job**
- **Issue**: "Marketing HERO" job appears to be a test entry
- **Fix**: Delete this job before launch
- **Priority**: MEDIUM

---

## 🟢 NICE TO HAVE - Future Enhancements

### 11. **Job Application Tracking**
- Add ability to link CV submissions to specific jobs
- Track which jobs get the most applications
- Priority: Future

### 12. **News/Blog Management**
- Currently no admin interface for managing news articles
- Consider adding CRUD interface for news
- Priority: Future

### 13. **Analytics Integration**
- Add Google Analytics or similar
- Track job views, applications, page visits
- Priority: Future

### 14. **Email Templates**
- Professional HTML email templates for notifications
- Currently using plain text
- Priority: Future

---

## 🎯 Multi-User Authentication System

### Current Situation
- Single admin password for all users
- All users share same login credentials
- No user tracking or audit logs

### Recommended Solution: Role-Based Authentication

#### **Option 1: Simple Email-Based Auth (Recommended for MVP)**

**Implementation Steps:**

1. **Create Users Table in Convex**
```typescript
// convex/schema.ts
users: defineTable({
  email: v.string(),
  name: v.string(),
  role: v.union(
    v.literal("ADMIN"),     // Full access (Neil, Ellie)
    v.literal("CONSULTANT"), // Can view/edit own jobs & CVs
    v.literal("VIEWER")      // Read-only access
  ),
  passwordHash: v.string(),
  active: v.boolean(),
  teamMemberId: v.optional(v.id("teamMembers")), // Link to team member profile
})
.index("by_email", ["email"])
.index("by_role", ["role"])
```

2. **User Management Features**
- Admin can create new users
- Each user has unique email/password
- Password reset functionality
- Activity logging (who edited what, when)

3. **Permissions Structure**
- **ADMIN** (Neil, Ellie): Full access to everything
- **CONSULTANT** (Helen, Melissa, Jo, Rachel, Emma, Isobel):
  - View all jobs
  - Edit only jobs assigned to them
  - View CVs submitted to their jobs
  - Cannot delete jobs or manage users
- **VIEWER** (Kate, Sarah):
  - View-only access to jobs and CVs
  - Cannot edit or delete anything

4. **Benefits**
- Each person has their own login
- Audit trail of who made changes
- Consultants only see relevant data
- Easy to add/remove users

**Time to Implement**: 4-6 hours

#### **Option 2: Advanced Auth with Clerk/Auth0**

**Pros:**
- Professional authentication service
- OAuth support (Google, Microsoft)
- Built-in user management UI
- MFA support
- Session management

**Cons:**
- Monthly cost (~$25-50/month)
- More complex integration
- May be overkill for 10 users

**Time to Implement**: 2-3 hours

#### **Option 3: Simple Password Protection Per User**

**Quick Implementation:**
- Each team member gets their own password stored in environment variables
- Login form allows selecting user from dropdown
- Simpler but less scalable

**Time to Implement**: 1-2 hours

---

## 📋 Pre-Launch Testing Checklist

Before sharing with client, test the following:

- [ ] Create a new job from admin panel
- [ ] Edit an existing job
- [ ] Delete a test job
- [ ] Upload a CV from the public site
- [ ] Verify CV notification emails are sent
- [ ] Test contact form submission
- [ ] Check all team members appear on "Meet the Team" page
- [ ] Verify job filters work correctly
- [ ] Test job search functionality
- [ ] Check responsive design on mobile devices
- [ ] Verify all external links work (social media, email)
- [ ] Test admin logout and re-login
- [ ] Confirm production Convex deployment is connected
- [ ] Check that job slugs generate correctly without conflicts

---

## 🚀 Launch Preparation Steps

### Before Sharing with Client:

1. **Run duplicate job cleanup**
2. **Rotate API keys and update everywhere**
3. **Change admin password to strong password**
4. **Remove test "Marketing HERO" job**
5. **Fix or remove LinkedIn buttons**
6. **Add team member photos (if available)**
7. **Verify domain email is set up**
8. **Test all critical functionality**
9. **Review and approve content on all pages**

### After Client Approval:

1. **Set up custom domain** (if not already done)
2. **Configure email domain verification**
3. **Add Google Analytics** (optional)
4. **Create user accounts for team members** (if implementing multi-user auth)
5. **Provide training documentation for admin panel**
6. **Set up regular database backups**

---

## 🔐 Security Recommendations

1. **Enable 2FA** for Vercel and Convex dashboards
2. **Rotate API keys** every 90 days
3. **Regular security audits** of environment variables
4. **Monitor failed login attempts**
5. **Keep Next.js and dependencies updated**
6. **Set up alerts** for unusual activity

---

## 📞 Support & Maintenance

Consider offering:
- Monthly website health check
- Content updates support
- Technical support for admin panel
- Regular backups and security updates
- Performance monitoring

