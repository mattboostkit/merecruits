# ME Recruits - Recruitment Website

A modern recruitment website built with Next.js 15 and Convex, featuring real-time job listings, news articles, CV uploads, and contact forms.

## Tech Stack

- **Framework:** Next.js 15.5.5 with Turbopack
- **Backend:** Convex (real-time database and backend functions)
- **UI Components:** Shadcn/ui with Tailwind CSS
- **Form Validation:** Zod + React Hook Form
- **Icons:** Lucide React

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Initialize Convex:
```bash
npx convex dev
```
This will prompt you to login and create a project. It will add `NEXT_PUBLIC_CONVEX_URL` to your `.env.local`

3. Seed sample data:
```bash
npm run seed
```

4. Run the development server (in another terminal):
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

**Note:** Keep `npx convex dev` running while developing for real-time updates!

## Vercel Deployment

### Quick Start

1. **Deploy Convex to production:**
```bash
npx convex deploy
```
This gives you a production URL like `https://blessed-ibis-400.convex.cloud`

2. **Add environment variable in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_CONVEX_URL` = `<your-production-convex-url>`
   - Save and redeploy

3. **Seed production data:**
```bash
npx convex run --prod seed:seedData
```

4. **Deploy to Vercel:**
```bash
git push origin master
```

**See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.**

## Project Structure

```
src/
├── app/                  # Next.js 15 app directory
│   ├── api/             # API routes
│   ├── about-us/        # About page
│   ├── contact/         # Contact form
│   ├── meet-the-team/   # Team member profiles
│   ├── need-a-job/      # Job seeker section
│   ├── need-staff/      # Employer section
│   ├── news/            # News/blog articles
│   ├── upload-cv/       # CV upload form
│   └── ...
├── components/          # React components
│   ├── ui/             # Shadcn/ui components
│   └── layout/         # Layout components
├── lib/                # Utility functions
└── prisma/             # Database schema and migrations
```

## Features

- ✅ Responsive design for all devices
- ✅ SEO-optimized with sitemap generation
- ✅ Dynamic job vacancies with filtering
- ✅ News/blog system
- ✅ Contact form with database persistence
- ✅ CV upload functionality
- ✅ UK English content throughout
- ✅ Google Analytics & Microsoft Clarity integration

## Build

```bash
npm run build
```

## License

Copyright © 2025 ME Recruits. All rights reserved.
