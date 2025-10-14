# Deploying to Vercel with Convex

This guide walks you through deploying your ME Recruits site to Vercel with Convex backend.

## Prerequisites

- Vercel account connected to your GitHub repository
- Convex account and project set up (already done via `npx convex dev`)

## Step-by-Step Deployment

### 1. Deploy Convex to Production

First, create a production Convex deployment:

```bash
npx convex deploy
```

This will:
- Create a production deployment
- Give you a production URL (e.g., `https://blessed-ibis-400.convex.cloud`)
- Keep this URL handy for the next step

### 2. Configure Vercel Environment Variables

**Option A: Via Vercel Dashboard (Recommended)**

1. Go to https://vercel.com/dashboard
2. Select your `merecruits` project
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:
   - **Name:** `NEXT_PUBLIC_CONVEX_URL`
   - **Value:** `https://your-production-deployment.convex.cloud` (from step 1)
   - **Environment:** Check all (Production, Preview, Development)
5. Click **Save**

**Option B: Via Vercel CLI**

```bash
vercel env add NEXT_PUBLIC_CONVEX_URL
# Paste your production Convex URL when prompted
# Select: Production, Preview, Development
```

### 3. Seed Production Data (Optional)

Add sample data to your production Convex deployment:

```bash
npx convex run --prod seed:seedData
```

### 4. Trigger Vercel Deployment

Push to trigger a new deployment:

```bash
git push origin master
```

Or manually redeploy from Vercel dashboard:
- Go to **Deployments** tab
- Click **...** on latest deployment
- Click **Redeploy**

### 5. Verify Deployment

Once deployed, visit your Vercel URL and check:
- [ ] Home page loads
- [ ] Job vacancies page shows jobs (if you seeded data)
- [ ] Contact form submits successfully
- [ ] No console errors
- [ ] Convex dashboard shows data: https://dashboard.convex.dev

## Troubleshooting

### Error: "Cannot find module convex/_generated/api"

**Cause:** Vercel built before Convex generated types.

**Solution:** The generated files are now committed to Git, so this shouldn't happen. If it does:
1. Make sure `convex/_generated/` files are in your repository
2. Check they're not in `.gitignore`
3. Commit and push them

### Error: "NEXT_PUBLIC_CONVEX_URL is not defined"

**Cause:** Environment variable not set in Vercel.

**Solution:**
1. Go to Vercel dashboard → Settings → Environment Variables
2. Add `NEXT_PUBLIC_CONVEX_URL` with your production Convex URL
3. Redeploy

### Error: 404 NOT_FOUND or blank pages

**Cause:** Convex database is empty or wrong URL.

**Solution:**
1. Verify the Convex URL in Vercel matches your production deployment
2. Run `npx convex run --prod seed:seedData` to add sample data
3. Check Convex dashboard to verify data exists

### Forms not working

**Cause:** Convex mutations not finding data.

**Solution:**
1. Open browser console and check for errors
2. Verify `NEXT_PUBLIC_CONVEX_URL` is set correctly
3. Check Convex dashboard Functions tab for errors

## Environment Variable Reference

### Required for Production

| Variable | Where to Get It | Purpose |
|---|---|---|
| `NEXT_PUBLIC_CONVEX_URL` | `npx convex deploy` output | Connects Next.js to Convex backend |

### Optional (Future Features)

| Variable | Where to Get It | Purpose |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics | Analytics tracking |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Microsoft Clarity | User behavior analytics |
| `RESEND_API_KEY` | Resend.com | Email notifications |
| `NEXTAUTH_SECRET` | Generate random string | Authentication (if added) |

## Deployment Checklist

- [ ] Convex production deployment created (`npx convex deploy`)
- [ ] `NEXT_PUBLIC_CONVEX_URL` set in Vercel
- [ ] Production data seeded (`npx convex run --prod seed:seedData`)
- [ ] Code pushed to GitHub
- [ ] Vercel deployment successful
- [ ] Site loads without errors
- [ ] Forms submit successfully
- [ ] Data appears in Convex dashboard

## Development vs Production

| Environment | Convex URL | Deploy Command | Data |
|---|---|---|---|
| **Development** | `watchful-pigeon-937.convex.cloud` | `npx convex dev` | Local test data |
| **Production** | `blessed-ibis-400.convex.cloud` | `npx convex deploy` | Real user data |

## Managing Multiple Environments

You can have separate data for dev and production:

**Development:**
```bash
npx convex dev                      # Use dev deployment
npx convex run seed:seedData        # Seed dev data
```

**Production:**
```bash
npx convex deploy                   # Use prod deployment
npx convex run --prod seed:seedData # Seed prod data
```

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Convex Docs:** https://docs.convex.dev
- **Convex Discord:** https://convex.dev/community
