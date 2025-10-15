# Team Member Photos - Upload Guide

## Where to Save Photos

### Option 1: Convex File Storage (Recommended)
Upload photos directly to Convex file storage for automatic hosting and CDN delivery.

**Benefits:**
- Automatic hosting and CDN
- No external dependencies
- Built-in access control
- Easy to manage

**Steps:**
1. Save your photos locally first (see naming convention below)
2. I'll create an upload script for you to run
3. Photos will be stored in Convex and URLs automatically updated in database

### Option 2: Public Folder
Place photos in the Next.js public folder for simple static hosting.

**Steps:**
1. Create folder: `public/team/`
2. Save photos in that folder
3. Update database with paths like `/team/neil-simmons.jpg`

---

## Photo Requirements

### File Specifications:
- **Format**: JPG or PNG (JPG recommended for smaller file size)
- **Dimensions**: 800x800px (square) or larger
- **Aspect Ratio**: 1:1 (square) for best results
- **File Size**: Under 500KB per photo (compress if needed)
- **Background**: Professional solid color or clean background

### Naming Convention:
Use lowercase with hyphens, matching team member names:
```
neil-simmons.jpg
ellie-waterman.jpg
helen-barham.jpg
kate-byrom.jpg
sarah-bysouth.jpg
melissa-staveley.jpg
jo-marsden-strong.jpg
rachel-fisher.jpg
emma-moss.jpg
isobel-colman.jpg
```

---

## Quick Setup Instructions

### Using Convex File Storage (Recommended):

1. **Prepare your photos**:
   - Get professional headshots for all 10 team members
   - Resize to 800x800px square
   - Save with naming convention above
   - Place all photos in a folder on your computer

2. **Upload to Convex**:
   I'll create a script that you can run to upload all photos at once:
   ```bash
   node scripts/upload-team-photos.js
   ```

3. **Automatic update**:
   The script will:
   - Upload each photo to Convex
   - Get the hosted URL
   - Update the team member record in database
   - Display success message for each upload

### Using Public Folder (Simple but not recommended):

1. **Create the folder**:
   ```bash
   mkdir public/team
   ```

2. **Copy your photos**:
   Place all photos in `public/team/` folder

3. **Update database**:
   Run the mutation to update imageUrl fields:
   ```bash
   npx convex run seed:updateTeamPhotos --prod
   ```

---

## Current Team Member Photo URLs

After upload, photos will be displayed at:
- **Meet the Team page**: https://merecruits.vercel.app/meet-the-team
- **Admin Team page**: https://merecruits.vercel.app/admin/team

Currently showing: Colored circles with initials (placeholder)
After update: Professional headshots

---

## What I Need From You

Please provide:
1. **10 team member photos** (one for each person)
2. **Choose upload method**:
   - Convex Storage (I'll create the upload script)
   - Public folder (you copy files manually)

Once you have the photos ready, let me know and I'll:
1. Create the upload script (if using Convex)
2. Update the database with photo URLs
3. Deploy the changes

---

## Team Members Needing Photos

1. ✅ Neil Simmons - MD
2. ✅ Ellie Waterman - Operations Director
3. ✅ Helen Barham - Lead Consultant, ME Recruits
4. ✅ Kate Byrom - Administrator
5. ✅ Sarah Bysouth - Accounts Assistant
6. ✅ Melissa Staveley - Temp Consultant
7. ✅ Jo Marsden-Strong - Recruitment Consultant (name updated!)
8. ✅ Rachel Fisher - Recruitment Consultant
9. ✅ Emma Moss - Recruitment Consultant
10. ✅ Isobel Colman - Recruitment Resourcer

---

## Image Optimization Tips

**Before uploading:**
1. Use a tool like TinyPNG or Squoosh.app to compress images
2. Ensure faces are clearly visible and well-lit
3. Keep consistent style across all photos (same background color if possible)
4. Professional dress code
5. Friendly, approachable expressions

**Recommended free tools:**
- **TinyPNG**: https://tinypng.com/ (online compression)
- **Squoosh**: https://squoosh.app/ (Google's image optimizer)
- **ImageOptim**: Mac app for batch compression
- **Photopea**: https://www.photopea.com/ (online Photoshop alternative)

---

## Next Steps

1. **Gather photos**: Get all 10 team member headshots
2. **Optimize**: Compress and resize to 800x800px
3. **Name correctly**: Use the naming convention above
4. **Let me know**: Tell me when you're ready and which upload method you prefer
5. **I'll handle**: Creating upload script and updating database

**Estimated time**: 5-10 minutes once photos are ready
