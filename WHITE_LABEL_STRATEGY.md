# White Label Recruitment Platform - Strategy Document

## Executive Summary

Transform ME Recruits into a white-label SaaS platform for recruitment agencies. This document outlines the technical requirements, business model, and roadmap for creating a multi-tenant recruitment website + backend solution.

---

## Current Platform Strengths ✅

### What You've Already Built (The Good Stuff!)

1. **AI-Powered CV Analysis** ⭐ *Flagship Feature*
   - GPT-5 powered CV scoring (out of 10)
   - Detailed job-specific CV analysis
   - AI CV rewriting for specific roles
   - Supports PDF, DOCX, TXT uploads

2. **Complete Job Management System**
   - Full CRUD operations
   - Search and filtering
   - Hourly rate support
   - Featured jobs
   - Job status management (Active/Draft/Closed)
   - Consultant assignment

3. **Professional Content Management**
   - Markdown blog with templates (Standard, How-To, Listicle, Interview)
   - Auto-slug generation
   - Author linking with photos/bios
   - Draft/publish workflow

4. **Team Management**
   - Team member profiles with photos
   - Roles and bios
   - Email and LinkedIn integration

5. **Modern Tech Stack**
   - Next.js 15 (latest)
   - Convex (real-time backend)
   - TypeScript (type-safe)
   - Tailwind + shadcn/ui (beautiful UI)
   - OpenAI integration

6. **Business Features**
   - CV uploads with job linking
   - Contact form management
   - Admin dashboard with real stats
   - SEO-optimized (sitemap, meta tags)

---

## What You Need to Add for White Labelling

### 🔴 CRITICAL (Must Have Before Launch)

#### 1. Multi-Tenancy Architecture
**Current:** Single agency (ME Recruits)
**Needed:** Multiple agencies on one platform

**Technical Requirements:**
- Add `tenantId` to all database tables
- Subdomain routing (`acme-recruitment.yourplatform.com`)
- Custom domain support (`www.acme-recruitment.com`)
- Tenant isolation (Agency A can't see Agency B's data)

**Database Changes:**
```typescript
// Add to schema.ts
tenants: defineTable({
  name: v.string(),
  subdomain: v.string(), // "acme-recruitment"
  customDomain: v.optional(v.string()), // "www.acme.com"
  logo: v.string(),
  primaryColor: v.string(), // Brand color
  secondaryColor: v.string(),
  contactEmail: v.string(),
  phone: v.string(),
  address: v.optional(v.string()),

  // Subscription
  plan: v.union(v.literal("STARTER"), v.literal("PROFESSIONAL"), v.literal("ENTERPRISE")),
  subscriptionStatus: v.union(v.literal("ACTIVE"), v.literal("TRIAL"), v.literal("SUSPENDED")),
  trialEndsAt: v.optional(v.number()),

  // Features enabled
  features: v.object({
    aiCvAnalysis: v.boolean(),
    unlimitedJobs: v.boolean(),
    customBranding: v.boolean(),
    apiAccess: v.boolean(),
  }),

  createdAt: v.number(),
})
.index("by_subdomain", ["subdomain"])
.index("by_domain", ["customDomain"])
```

**All Other Tables Need:**
```typescript
tenantId: v.id("tenants")
```

#### 2. Authentication & User Management
**Current:** No auth (anyone can access admin)
**Needed:** Proper user authentication

**Requirements:**
- User login/signup
- Role-based access (Admin, Recruiter, Viewer)
- Per-tenant user management
- Password reset
- 2FA (optional, but good for Enterprise tier)

**Suggested Stack:**
- **Clerk** (easiest, handles everything) - $25/mo + per-user
- **Auth0** (enterprise-grade) - more expensive
- **NextAuth.js** (free, self-hosted) - more work

#### 3. Onboarding & Setup Wizard
**Needed:** First-time setup flow

**Steps:**
1. Sign up for platform
2. Choose subdomain (`yourname.recruitflow.com`)
3. Upload logo
4. Set brand colors (color picker)
5. Add company details
6. Create first admin user
7. Choose plan (Starter/Pro/Enterprise)
8. Payment (Stripe)

#### 4. Customizable Branding
**Current:** Hardcoded ME Recruits branding
**Needed:** Dynamic branding per tenant

**What to Make Customizable:**
- Logo (header, footer, favicon)
- Primary color (buttons, links, accents)
- Secondary color (headers, CTAs)
- Company name (everywhere)
- Contact details (footer, contact page)
- Social media links
- About us content
- Privacy policy / Terms

**Theme Configuration UI:**
- Live preview as they customize
- Color picker with brand color suggestions
- Logo upload (automatically resize/optimize)
- Font selector (optional - 3-4 professional fonts)

#### 5. Billing & Subscription Management
**Needed:** Payment processing

**Stripe Integration:**
- Stripe Checkout for subscriptions
- Webhook handling (subscription.created, subscription.cancelled)
- Usage-based billing (optional: charge per job post)
- Invoice generation
- Payment method management

**Pricing Tiers:** (Suggested)

**Starter - £99/month**
- 1 user
- 10 active job posts
- 50 CV submissions/month
- Basic AI CV analysis (50 analyses/month)
- Email support

**Professional - £249/month**
- 5 users
- Unlimited job posts
- 500 CV submissions/month
- Unlimited AI CV analysis
- Custom domain
- Priority email + chat support
- Remove "Powered by" branding

**Enterprise - £499/month**
- Unlimited users
- Unlimited everything
- API access
- Dedicated account manager
- Phone support
- Custom integrations
- White-glove onboarding

#### 6. Super Admin Dashboard
**Needed:** Platform management interface

**Features:**
- View all tenants
- Monitor system health
- Subscription management
- Feature flag management
- Usage analytics (jobs posted, CVs analyzed, etc.)
- Support ticket system
- Billing overview

---

### 🟡 IMPORTANT (Should Have Soon)

#### 7. Email Notifications
**Current:** Contact forms and CVs save to database only
**Needed:** Automatic email notifications

**Emails to Send:**
- New CV submission → Notify recruiter
- New contact form → Notify admin
- Job application → Confirmation to candidate
- Job application → Notify assigned consultant
- New job posted → Email to subscribers (if newsletter)

**Email Service Options:**
- **Resend** (you already have API key) - Clean API, great for Next.js
- **SendGrid** - More features, complex
- **Postmark** - Transactional focus

**Template System:**
- Email templates per tenant
- Merge tags ({{candidateName}}, {{jobTitle}})
- Customizable from admin panel

#### 8. Applicant Tracking System (ATS) Features
**Current:** Basic CV storage
**Needed:** Proper candidate pipeline

**Features:**
- Candidate stages (New → Screening → Interview → Offer → Hired/Rejected)
- Drag-and-drop pipeline board (like Trello)
- Notes on candidates
- Star/favorite candidates
- Tags (JavaScript, Senior, Remote, etc.)
- Search by skills, experience, location
- Candidate comparison (side-by-side CVs)

#### 9. Job Board Integrations
**Needed:** Auto-post jobs to external boards

**Integrations:**
- **Indeed** (job posting API)
- **Reed.co.uk** (UK recruitment)
- **Total Jobs**
- **CV-Library**
- **LinkedIn Jobs** (expensive but valuable)

**Features:**
- One-click multi-post
- Sync job status (close on all boards when filled)
- Track which board generated applications

#### 10. Analytics & Reporting
**Needed:** Business intelligence

**Metrics to Track:**
- Jobs posted per month
- Applications per job
- Time to fill
- Source of applications (website, Indeed, LinkedIn)
- CV analysis usage
- Conversion rates
- Most popular job categories
- Consultant performance (applications per consultant)

**Dashboards:**
- Executive dashboard (high-level metrics)
- Recruiter dashboard (their jobs, their candidates)
- Financial dashboard (revenue, churn, MRR)

#### 11. Advanced CV Analysis Features
**Enhance Your Flagship Feature:**

- **Batch CV Analysis** - Upload 50 CVs, rank them all
- **CV Database Search** - "Find all JavaScript developers in London"
- **Skills Extraction** - Automatically tag CVs with detected skills
- **Auto-Matching** - "These 5 CVs best match this job"
- **Candidate Sourcing** - AI suggests passive candidates for roles
- **Video CV Analysis** - Transcribe + analyze video applications

#### 12. Mobile Apps (Future)
**Needed Eventually:** Native apps

**Why:**
- Recruiters want to review CVs on the go
- Push notifications for urgent applications
- Quick candidate notes while in interviews

**Options:**
- React Native (share code with web)
- Progressive Web App (PWA) - Easier, "good enough"

---

### 🟢 NICE TO HAVE (Competitive Advantages)

#### 13. Client Portal
**For companies hiring through the agency:**

- View shortlisted candidates
- Leave feedback on CVs
- Schedule interviews
- Track hiring pipeline
- Approve/reject candidates

#### 14. Candidate Portal
**For job seekers:**

- Create profile
- Track application status
- Job alerts (email when matching jobs posted)
- Saved jobs
- Application history

#### 15. WhatsApp Integration
**Very popular in recruitment:**

- Candidates apply via WhatsApp
- Recruiters get WhatsApp alerts
- WhatsApp Business API

#### 16. AI Interview Scheduler
**Time-saver:**

- Suggest meeting times based on availability
- Send calendar invites
- Sync with Google Calendar / Outlook
- Automated reminders

#### 17. Reference Checking
**Automate reference collection:**

- Send reference request emails
- Structured questionnaires
- Collect and store securely

#### 18. Compliance & GDPR
**Critical for UK/EU:**

- GDPR consent management
- Right to be forgotten (delete candidate data)
- Data retention policies
- Audit logs (who viewed what candidate)
- DBS/background check integration

#### 19. API & Webhooks
**For Enterprise customers:**

- REST API for job posting
- Webhooks for new applications
- API documentation
- Rate limiting
- API keys per tenant

#### 20. Marketplace / App Store
**Advanced:**

- 3rd party integrations
- Plugin system
- Revenue share with integration partners

---

## Technical Roadmap

### Phase 1: Foundation (Month 1-2)
**Goal:** Make it multi-tenant

- [ ] Add tenant table and architecture
- [ ] Implement authentication (Clerk)
- [ ] Build onboarding wizard
- [ ] Subdomain routing
- [ ] Basic branding customization
- [ ] Update all queries to filter by tenantId

### Phase 2: Monetization (Month 3)
**Goal:** Start charging

- [ ] Stripe integration
- [ ] Pricing page
- [ ] Subscription management
- [ ] Usage tracking
- [ ] Super admin dashboard

### Phase 3: Essential Features (Month 4-5)
**Goal:** Feature parity for competitive advantage

- [ ] Email notifications (Resend)
- [ ] Basic ATS (candidate pipeline)
- [ ] Advanced branding (custom domains)
- [ ] Analytics dashboard
- [ ] Export features (CSV, PDF reports)

### Phase 4: Growth Features (Month 6+)
**Goal:** Premium features that justify higher pricing

- [ ] Job board integrations
- [ ] Client portal
- [ ] Candidate portal
- [ ] Advanced AI features
- [ ] Mobile PWA

---

## Business Model

### Revenue Streams

1. **Subscription Revenue** (Primary)
   - Starter: £99/mo × 100 customers = £9,900/mo
   - Pro: £249/mo × 30 customers = £7,470/mo
   - Enterprise: £499/mo × 10 customers = £4,990/mo
   - **Total MRR: £22,360/mo (£268,320/year)**

2. **Add-ons** (Secondary)
   - Extra AI CV analyses: £50/100 credits
   - Additional users: £20/user/month
   - Premium integrations: £99/mo each
   - Custom branding (remove "Powered by"): £49/mo

3. **Setup Fees** (One-time)
   - Enterprise onboarding: £999
   - Custom integrations: £2,500+
   - Data migration: £500+

### Target Market

**Primary:**
- Small-to-medium recruitment agencies (5-50 employees)
- UK-focused (ME postcode expertise translates well)
- Tired of expensive legacy ATS systems (Bullhorn = £££)

**Secondary:**
- In-house recruiters at growing companies
- Niche recruiters (tech, healthcare, etc.)
- International expansion (English-speaking countries first)

### Competition

**Existing Players:**
- **Bullhorn** - Enterprise, expensive, complex
- **Vincere** - Mid-market, £££
- **Recruitee** - Modern, but no UK focus
- **Workable** - ATS but not recruitment-agency focused

**Your Advantage:**
- **AI CV Analysis** (nobody else has GPT-5 integration)
- **Modern UX** (Next.js 15, fast, beautiful)
- **Affordable** (1/3 the price of Bullhorn)
- **UK-focused** (integrations with UK job boards)
- **Quick setup** (live in 30 minutes vs weeks)

---

## Marketing Strategy

### Launch Strategy

1. **Beta Program** (Month 1-2)
   - Offer free accounts to 10 recruitment agencies
   - Collect feedback
   - Case studies
   - Testimonials

2. **Content Marketing**
   - Blog: "How to Use AI in Recruitment"
   - YouTube demos
   - LinkedIn articles
   - SEO for "recruitment software UK"

3. **Partnership with ME Recruits**
   - ME Recruits as the flagship case study
   - "Used by top Kent recruiters"
   - Show real metrics (time saved, placements increased)

4. **Direct Outreach**
   - LinkedIn outreach to recruitment agency owners
   - Recruitment industry events (UK Recruiter Awards, etc.)
   - Facebook groups for recruiters

5. **Affiliate Program**
   - 20% recurring commission for referrals
   - Recruitment consultants refer their agency

### Pricing Psychology

- **Anchor high:** Show Enterprise tier first (£499)
- **Popular badge:** Professional tier (£249)
- **Entry point:** Starter tier (£99)
- **Free trial:** 14 days, no credit card required
- **Annual discount:** Pay yearly, get 2 months free

---

## Technical Architecture for Multi-Tenancy

### Subdomain Routing (Next.js)

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  const subdomain = hostname?.split('.')[0]

  // Skip for main marketing site
  if (subdomain === 'www' || subdomain === 'yourplatform') {
    return NextResponse.next()
  }

  // Pass subdomain to app as header
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-tenant-subdomain', subdomain || '')

  return NextResponse.rewrite(
    new URL(request.url),
    { request: { headers: requestHeaders } }
  )
}
```

### Tenant Context Provider

```typescript
// context/TenantContext.tsx
'use client'

import { createContext, useContext } from 'react'
import { useQuery } from 'convex/react'
import { api } from 'convex/_generated/api'

const TenantContext = createContext(null)

export function TenantProvider({ children, subdomain }) {
  const tenant = useQuery(api.tenants.getBySubdomain, { subdomain })

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  )
}

export const useTenant = () => useContext(TenantContext)
```

### Branding Application

```typescript
// Use tenant's brand colors
const tenant = useTenant()

<Button style={{
  backgroundColor: tenant.primaryColor,
  '--primary': tenant.primaryColor
}}>
  Apply Now
</Button>
```

---

## Competitive Pricing Analysis

| Feature | Your Platform | Bullhorn | Vincere | Recruitee |
|---------|--------------|----------|---------|-----------|
| **Price** | £99-499/mo | £300-600/user/mo | £250+/user/mo | £200+/user/mo |
| **Setup Time** | 30 mins | 3-6 months | 6-8 weeks | 2-4 weeks |
| **AI CV Analysis** | ✅ | ❌ | ❌ | ❌ |
| **Modern UI** | ✅ | ❌ (Legacy) | ⚠️ (OK) | ✅ |
| **UK Job Boards** | ✅ | ✅ | ✅ | ⚠️ (Limited) |
| **Custom Branding** | ✅ | ✅ | ✅ | ⚠️ (Premium) |
| **API Access** | ✅ | ✅ | ✅ | ✅ |

**Your USP:** "The only recruitment platform with built-in AI CV analysis. Set up in 30 minutes, not 6 months. From £99/month."

---

## Risk Mitigation

### Technical Risks

1. **Scalability**
   - Convex handles scaling automatically
   - Next.js on Vercel scales horizontally
   - OpenAI rate limits (cache results, batching)

2. **Data Security**
   - SOC 2 compliance (required for Enterprise)
   - Regular security audits
   - Penetration testing
   - GDPR compliance (data residency in UK/EU)

3. **Multi-Tenancy Bugs**
   - Thorough testing (prevent data leakage)
   - Row-level security in Convex
   - Automated tests for tenant isolation

### Business Risks

1. **Churn**
   - Annual contracts for discount
   - Customer success manager (Enterprise)
   - In-app NPS surveys
   - Exit interviews

2. **Competition**
   - Patent AI CV analysis approach (if novel)
   - Build moat with integrations
   - Strong customer relationships

3. **OpenAI Dependency**
   - Fallback to GPT-4 if GPT-5 issues
   - Consider fine-tuning own model (long-term)
   - Pricing buffer for API cost increases

---

## Launch Checklist

### Legal
- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] Data Processing Agreement (for GDPR)
- [ ] Acceptable Use Policy
- [ ] SLA (Service Level Agreement) for Enterprise

### Infrastructure
- [ ] Production Convex environment
- [ ] Staging environment
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Error tracking (Sentry)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Backup strategy (Convex automatic + manual exports)

### Marketing Site
- [ ] Landing page with features, pricing, demo
- [ ] Product screenshots/videos
- [ ] Customer testimonials
- [ ] FAQ section
- [ ] Blog
- [ ] Documentation/Help Center (Notion or GitBook)

### Support
- [ ] Support email (support@yourplatform.com)
- [ ] Help desk software (Intercom or Crisp)
- [ ] Knowledge base
- [ ] Video tutorials (Loom)

### Analytics
- [ ] Google Analytics 4
- [ ] Mixpanel/Amplitude (product analytics)
- [ ] Stripe dashboard
- [ ] Custom admin dashboard

---

## Estimated Timeline & Budget

### Timeline
- **Months 1-2:** Multi-tenancy + Auth (Foundation)
- **Month 3:** Billing + Monetization
- **Months 4-5:** Essential features (Email, ATS basics)
- **Month 6:** Beta launch with 10 agencies
- **Month 7-8:** Iterate based on feedback
- **Month 9:** Public launch
- **Month 12:** 100 customers, £10k MRR

### Budget (First Year)

**Development:**
- Your time: £X (or development team)
- Freelance help (optional): £10-30k

**Infrastructure:**
- Vercel Pro: £20/mo = £240/year
- Convex: ~£50-200/mo = £2,400/year
- OpenAI API: ~£200-500/mo = £6,000/year
- Clerk Auth: £25/mo + per user = £500/year
- Stripe fees: 1.5% of revenue
- Domain, SSL, misc: £200/year

**Marketing:**
- LinkedIn Ads: £1,000/mo = £12,000/year
- Content creation: £500/mo = £6,000/year
- Conference sponsorships: £5,000/year

**Legal/Admin:**
- Company formation: £500
- Legal docs (T&Cs, Privacy): £2,000
- Accounting software: £300/year

**Total First Year: ~£35,000-50,000**

**Break-even:** ~30-40 Professional tier customers (£249/mo)

---

## Naming Ideas

- **RecruitFlow** - Modern, implies efficiency
- **TalentForge** - Building talent pipelines
- **HireOS** - Operating system for hiring
- **AgencyStack** - Complete stack for agencies
- **RecruitOS** - Recruitment Operating System
- **CandidateHub** - Central hub for candidates
- **PlacementPro** - Professional placements
- **HireForge** - Forging great hires
- **RecruitmentStack** - Full-stack recruiting
- **TalentBase** - Base for talent management

**My Recommendation:** **RecruitFlow**
- Modern, memorable, available domain
- Implies smooth, efficient process
- Not too niche (can expand beyond recruitment)

---

## Conclusion

You've built 70% of a £10k MRR SaaS product already. The core features are solid and unique (AI CV analysis is a killer feature).

**Immediate Next Steps:**

1. **Decision:** Are you all-in on this? If yes:
2. **Validate:** Talk to 5 recruitment agencies this week
3. **Scope:** Pick the Critical features (auth + multi-tenancy)
4. **Timeline:** Set a 12-week goal to beta launch
5. **Name & Brand:** Choose name, register domain
6. **Legal:** Set up limited company for the platform

**The Opportunity is Real:**

UK recruitment industry = £35 billion/year
- 20,000+ recruitment agencies in UK
- If you capture just 0.5% (100 agencies) at £249/mo = £24,900/mo (£299k/year)
- With AI as your moat, you can genuinely disrupt this market

Let me know if you want to start building the multi-tenancy architecture - that's the critical first step!
