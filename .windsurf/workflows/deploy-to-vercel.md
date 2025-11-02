---
description: Deploy TMPL Escapade to Vercel
---

# Vercel Deployment Workflow

## Pre-Deployment Checklist

### 1. Build Locally
// turbo
```bash
npm run build
```

### 2. Test Production Build
// turbo
```bash
npm run preview
```

### 3. Verify Environment Variables
Check .env.supabase file contains:
- VITE_SUPABASE_PROJECT_URL
- VITE_SUPABASE_ANON_KEY

## Deployment Steps

### 1. Ensure vercel.json Exists
File should contain SPA rewrite rules:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 2. Set Environment Variables in Vercel
Navigate to: Vercel Dashboard > Project Settings > Environment Variables

Add variables for all environments (Production, Preview, Development):
- VITE_SUPABASE_PROJECT_URL = https://vvrmfgealitetfgwsdeu.supabase.co
- VITE_SUPABASE_ANON_KEY = [from .env.supabase]

### 3. Deploy via Git (Recommended)
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

### 4. Manual Deploy (Alternative)
```bash
vercel --prod
```

### 5. Verify Deployment
- Check build logs for errors
- Test live URL
- Verify all routes work
- Test authentication
- Check database connectivity

## Post-Deployment Testing

### 1. Test Production URL
Navigate to: https://tmpl-pi.vercel.app

### 2. Test Critical Flows
- Login with all 7 user roles
- Create/Edit/Delete package
- Create booking
- Update user settings
- Test payment calculations

### 3. Monitor Performance
- Check Lighthouse scores
- Verify page load times
- Test on mobile devices
- Check console for errors

## Rollback Procedure
If deployment fails:
1. Go to Vercel Dashboard
2. Navigate to Deployments
3. Select previous working deployment
4. Click "Promote to Production"

## Current Deployment Info
- Production URL: https://tmpl-pi.vercel.app
- Project ID: prj_GCI5HUvfTycOy0bIuq9XIxi0f8rq
- Region: Singapore (sin1)
- Framework: Vite
