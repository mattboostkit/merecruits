# ME Recruits - Production Management Guide

This guide explains how to manage job postings and CV submissions in production using Convex.

## Table of Contents
1. [Understanding Convex](#understanding-convex)
2. [Managing Jobs](#managing-jobs)
3. [Managing CV Submissions](#managing-cv-submissions)
4. [Convex Dashboard Access](#convex-dashboard-access)
5. [How File Uploads Work](#how-file-uploads-work)

---

## Understanding Convex

**Convex** is your real-time database and backend. It's already deployed and running at: `https://[your-deployment].convex.cloud`

### Key Concepts:
- **Queries** = Read data from database (e.g., list all jobs)
- **Mutations** = Write/update data (e.g., create a new job, close a job)
- **Real-time** = Changes appear instantly on the website without page refresh
- **Dashboard** = Web interface to view and manage all your data

---

## Managing Jobs

### Option 1: Convex Dashboard (Easiest - No Code Required)

1. **Go to Convex Dashboard**: https://dashboard.convex.dev
2. **Select your project**: "merecruits"
3. **Click "Data"** in the left sidebar
4. **Select "jobs" table**

#### To CREATE a new job:
1. Click **"Add Document"** button
2. Fill in the fields:
   ```json
   {
     "title": "Marketing Manager",
     "slug": "marketing-manager-maidstone",
     "location": "Maidstone",
     "description": "Full job description here...",
     "salary": "£35,000 - £45,000",
     "salaryMin": 35000,
     "salaryMax": 45000,
     "type": "PERMANENT",
     "category": "Marketing / PR / Events",
     "consultant": "Helen Barham",
     "status": "ACTIVE",
     "featured": true
   }
   ```
3. Click **"Create"**
4. **Job appears on website instantly!** 🎉

#### To EDIT an existing job:
1. Find the job in the "jobs" table
2. Click on the job row
3. Click **"Edit"** button
4. Modify any fields (e.g., change status to "CLOSED" when filled)
5. Click **"Save"**
6. **Changes appear instantly on website!**

#### To CLOSE a filled job:
1. Find the job in the table
2. Edit the job
3. Change `"status": "ACTIVE"` to `"status": "CLOSED"`
4. Save
5. **Job disappears from public listings immediately!**

---

### Option 2: Using Functions (For Developers)

The Convex dashboard also has a **"Functions"** tab where you can run mutations directly.

#### Create a job:
```javascript
// Go to Functions → jobs:create
{
  "title": "Digital Marketing Executive",
  "slug": "digital-marketing-executive-tunbridge-wells",
  "location": "Tunbridge Wells",
  "description": "Join our dynamic team...",
  "salary": "£30,000 - £35,000",
  "salaryMin": 30000,
  "salaryMax": 35000,
  "type": "PERMANENT",
  "category": "Marketing / PR / Events",
  "consultant": "Helen Barham",
  "status": "ACTIVE",
  "featured": false
}
```

#### Close a job:
```javascript
// Go to Functions → jobs:close
{
  "id": "k17abc123def456" // Copy the job ID from the Data tab
}
```

#### Reopen a job:
```javascript
// Go to Functions → jobs:reopen
{
  "id": "k17abc123def456"
}
```

---

## Managing CV Submissions

### Where CV Submissions Go

When someone uploads a CV on your website:

1. **Database Record Created**: All candidate information is saved to `cvUploads` table in Convex
2. **File Stored**: The actual CV file needs to be stored (see [File Uploads](#how-file-uploads-work))

### Viewing CV Submissions in Dashboard

1. Go to **Convex Dashboard** → **Data** → **cvUploads** table
2. You'll see all submissions with:
   - First Name / Last Name
   - Email / Phone
   - File Name
   - Job Reference (if applying for specific job)
   - Cover Letter message
   - Submission date/time

### Export CV Data

**Option 1: Manual Export**
1. In Convex Dashboard, select `cvUploads` table
2. Click **"Export"** button
3. Download as CSV or JSON
4. Open in Excel/Google Sheets

**Option 2: View in Dashboard**
- Click on any CV submission row to see full details
- Copy email address to contact candidate
- See which job they applied for

---

## Convex Dashboard Access

### Getting Access

1. **Already deployed?** Your Convex project is at: https://dashboard.convex.dev
2. **First time?**
   - Sign in with the same account used to deploy
   - Or request access from whoever deployed the site

### Dashboard Features

**Data Tab**:
- View all tables (jobs, cvUploads, teamMembers, newsArticles)
- Add, edit, delete records
- Export data

**Functions Tab**:
- Run queries and mutations manually
- Test database operations
- Useful for bulk operations

**Logs Tab**:
- See all database operations
- Debug issues
- Track CV submissions in real-time

**Settings Tab**:
- Manage environment variables
- View deployment status
- Configure webhooks (for future integrations)

---

## How File Uploads Work

### Current Implementation (Placeholder)

Currently, the CV upload form **collects the file name** but doesn't actually store the file. This is because file storage requires additional setup.

### Future Implementation Options

#### Option A: Convex File Storage (Recommended)

Convex provides built-in file storage. To implement:

1. **Update `cvUploads.ts`**:
```typescript
// Add file storage
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const submit = mutation({
  args: {
    // ... existing args
    storageId: v.id("_storage"), // Add this
  },
  handler: async (ctx, args) => {
    // Get file URL from storage
    const fileUrl = await ctx.storage.getUrl(args.storageId);

    await ctx.db.insert("cvUploads", {
      // ... existing fields
      fileUrl: fileUrl!, // Real file URL
    });
  },
});
```

2. **Update `page.tsx` upload form**:
```typescript
// Get upload URL
const getUploadUrl = useMutation(api.cvUploads.generateUploadUrl);

// Upload file
const uploadUrl = await getUploadUrl();
const result = await fetch(uploadUrl, {
  method: "POST",
  body: file,
});
const { storageId } = await result.json();

// Submit with storage ID
await submitCV({
  ...formData,
  storageId: storageId,
});
```

**Benefits**:
- Built-in, no extra services needed
- Automatic CDN distribution
- Secure URLs

#### Option B: AWS S3 / Cloudinary

For larger file storage needs, integrate with S3 or Cloudinary.

---

## CV Information Extraction

### Current State
Right now, CV files are uploaded but not parsed. Staff manually review CVs.

### Future Enhancement: AI CV Parsing

You could add AI-powered CV parsing using:

**Option 1: OpenAI API**
```typescript
import OpenAI from "openai";

export const parseCV = action({
  args: { fileUrl: v.string() },
  handler: async (ctx, args) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Extract text from PDF
    const pdfText = await extractPDFText(args.fileUrl);

    // Use GPT to parse
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: `Extract the following from this CV:
        - Full Name
        - Email
        - Phone
        - Skills (list)
        - Work Experience (last 3 roles)
        - Education

        CV Text:
        ${pdfText}`
      }],
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content);
  },
});
```

**This would enable**:
- Automatic skill matching to jobs
- Quick candidate search by skills
- Auto-categorisation of CVs

---

## Quick Reference

### Job Status Values
- `ACTIVE` = Visible on website, accepting applications
- `DRAFT` = Not visible, work in progress
- `CLOSED` = Filled, no longer accepting applications

### Job Type Values
- `PERMANENT` = Full-time permanent role
- `TEMPORARY` = Temp/contract role
- `CONTRACT` = Fixed-term contract

### Categories (Sectors)
- Marketing / PR / Events
- Legal
- Admin / Secretarial / Office Support
- Sales & Account Management
- Trades & Services
- HR & Recruitment
- Finance & Accountancy

### Locations
- Maidstone
- Medway
- Tunbridge Wells
- Dartford
- West Malling
- Kings Hill

---

## Support

### Common Tasks

**"I want to add a new job"**
→ Go to Convex Dashboard → Data → jobs → Add Document

**"A job has been filled"**
→ Find the job → Edit → Change status to "CLOSED"

**"I want to see who applied"**
→ Go to Convex Dashboard → Data → cvUploads

**"I want to re-post an old job"**
→ Find the job → Edit → Change status to "ACTIVE"

**"I want to export all CVs"**
→ Convex Dashboard → cvUploads table → Export button

### Getting Help

- **Convex Documentation**: https://docs.convex.dev
- **Convex Discord**: https://convex.dev/community
- **This codebase**: All functions are documented in `convex/` folder

---

## Next Steps

1. ✅ **Schema defined** - Database structure is ready
2. ✅ **Mutations created** - Functions to manage jobs exist
3. ✅ **Queries created** - Functions to read data exist
4. ⏳ **File storage** - Needs implementation (see [File Uploads](#option-a-convex-file-storage-recommended))
5. ⏳ **Email notifications** - Could add Resend or SendGrid integration
6. ⏳ **Admin UI** - Could build a custom admin panel (optional, dashboard works fine)

---

## Production Workflow

### Daily Operations

1. **Morning**: Check Convex Dashboard → cvUploads for new applications
2. **New CV arrives**:
   - Review in dashboard
   - Contact candidate via email/phone from dashboard
   - Mark job as CLOSED if filled
3. **New job comes in**:
   - Add via Convex Dashboard
   - Appears on website instantly
   - Share direct link: `merecruits.com/need-a-job/job-vacancies/[slug]`

### Weekly Tasks

- Review CLOSED jobs - decide if any should be reopened
- Export CV database for backup
- Check featured jobs - update to highlight best opportunities

---

**This system is LIVE and working right now!**

You can start managing jobs immediately via the Convex Dashboard. No code deployment needed for adding/editing jobs. 🚀
