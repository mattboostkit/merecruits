# ME Recruits - Recruitment Website

A modern recruitment website built with Next.js 15, featuring job listings, news articles, CV uploads, and contact forms.

## Tech Stack

- **Framework:** Next.js 15.5.5 with Turbopack
- **Database:** Prisma ORM (SQLite for local, PostgreSQL for production)
- **UI Components:** Shadcn/ui with Tailwind CSS
- **Form Validation:** Zod + React Hook Form
- **Icons:** Lucide React

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Initialize the database:
```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Vercel Deployment

### Required Environment Variables

Set these in your Vercel project settings:

```
DATABASE_URL=<your-vercel-postgres-connection-string>
NEXTAUTH_SECRET=<random-string-for-production>
NEXTAUTH_URL=https://your-domain.com
ADMIN_EMAIL=info@merecruits.com
NEXT_PUBLIC_GA_ID=G-4VYP23VK90
NEXT_PUBLIC_CLARITY_PROJECT_ID=smzm2qpgl5
```

### Database Setup on Vercel

1. Add **Vercel Postgres** to your project
2. Copy the `DATABASE_URL` from Vercel Postgres settings
3. Set it as an environment variable
4. Run migrations:
```bash
npx prisma migrate deploy
```

### First Deployment

The first build may not have database content. The sitemap will fallback to static pages only until you:
1. Set up the database
2. Run migrations
3. Seed initial data

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
