# TMPL Escapade - Vercel Deployment Guide

**Status:** ✅ Ready to Deploy  
**Configuration:** ✅ Created  
**Build Test:** ✅ Passed (3.5s build time)

---

## 🚀 Quick Deployment Steps

### Option 1: Vercel CLI (Recommended - Faster)

```bash
# Navigate to project directory
cd /home/user-pc2/TMPL

# Deploy to production
vercel --prod
```

**Follow the prompts:**
1. "Set up and deploy ~/TMPL?" → Press **Y** (Yes)
2. "Which scope?" → Select your account: **ridhuanshah**
3. "Link to existing project?" → Press **N** (No)
4. "What's your project's name?" → Type: **tmpl-escapade** (or your preferred name)
5. "In which directory is your code located?" → Press **Enter** (current directory)
6. "Want to modify settings?" → Press **N** (No - we have vercel.json)

**Deployment will:**
- Upload ~1.6 GB node_modules (first time only)
- Build the project (~3-4 seconds)
- Deploy to production
- Give you a URL like: `https://tmpl-escapade.vercel.app`

### Option 2: Vercel Dashboard (Visual Interface)

1. Go to: https://vercel.com/new
2. Click **"Add New Project"**
3. **Import Git Repository** (if you have Git) OR **Upload folder**
4. Since this project has no Git, you'll need to:
   - Initialize Git first (see below)
   - OR use Vercel CLI (Option 1)

---

## 📦 Files Created

I've prepared your project for deployment:

### 1. `vercel.json` (Deployment Configuration)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "regions": ["sin1"],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Explanation:**
- `regions: ["sin1"]` - Singapore region (closest to Malaysia)
- `rewrites` - Ensures React Router works correctly (all routes go to index.html)

### 2. `.gitignore` (Files to Ignore)
Created to prevent uploading unnecessary files.

---

## ⚙️ Deployment Configuration

### Build Settings (Already Configured)
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Node Version:** 20.x (from your system)

### Expected Deployment Details
- **Build Time:** ~3-5 seconds
- **Bundle Size:** ~1.47 MB
- **Deployment Size:** ~2-3 MB (gzipped)
- **Region:** Singapore (sin1)

---

## 🌍 What Gets Deployed

### Included ✅
- All compiled JavaScript (~1.38 MB)
- All CSS (~88 KB)
- HTML entry point
- Public assets
- Production-optimized bundle

### Excluded ❌
- node_modules (installed on Vercel)
- Source TypeScript files
- Development files
- .git directory (none exists)

---

## 🔍 Post-Deployment Checklist

After successful deployment, verify:

### 1. Homepage Loads
- Visit: `https://your-project.vercel.app`
- Should see TMPL Escapade customer homepage
- Hero banner should display correctly

### 2. Admin Access Works
- Visit: `https://your-project.vercel.app/admin/login`
- Try logging in with demo credentials
- Test: `superadmin@tmplescapade.my` / `super123`

### 3. Routing Works
- Navigate to different pages
- Use browser back/forward buttons
- Refresh page on any route (should not 404)

### 4. Mobile Responsive
- Test on mobile device or browser DevTools
- Check sidebar collapses properly
- Verify touch interactions work

---

## 🐛 Common Deployment Issues

### Issue 1: Build Fails
**Error:** "Command npm run build exited with 1"

**Solution:**
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check for ESLint errors
npm run lint
```

### Issue 2: 404 on Routes
**Error:** Page refreshes to 404 on `/admin/packages`

**Solution:** Already fixed! The `vercel.json` rewrites configuration handles this.

### Issue 3: Environment Variables Missing
**Note:** This project currently has no environment variables. When you add backend:

```bash
# In Vercel dashboard, add:
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### Issue 4: Large Bundle Warning
**Warning:** "Chunk is larger than 500 KB"

**Solution:** This is just a warning. The app will work. Optimize later with code splitting.

---

## 📊 Expected Deployment Output

```
Vercel CLI 48.4.0
🔗  Linked to your-project (created .vercel folder)
🔍  Inspect: https://vercel.com/ridhuanshah/tmpl-escapade/[deployment-id]
✅  Production: https://tmpl-escapade.vercel.app [3s]
```

---

## 🔄 Updating After First Deploy

### Subsequent Deployments (Faster)
```bash
# From project directory
vercel --prod

# Or just
vercel
```

**Note:** After first deploy, Vercel remembers your settings. Future deploys are faster (~10-15 seconds).

---

## 🌐 Custom Domain (Optional)

### After Deployment
1. Go to: https://vercel.com/ridhuanshah/tmpl-escapade/settings/domains
2. Click **"Add Domain"**
3. Enter your domain: `tmplescapade.my` or `escapade.tmpl.my`
4. Follow DNS configuration instructions
5. Add these DNS records:

```
Type: A
Name: @ (or subdomain)
Value: 76.76.21.21

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

---

## 📈 Monitoring & Analytics

### Vercel Dashboard
Access at: https://vercel.com/ridhuanshah/tmpl-escapade

**Available Metrics:**
- Deployment history
- Build logs
- Error logs
- Performance metrics
- Bandwidth usage

### Enable Analytics (Optional)
```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to your main.tsx
import { Analytics } from '@vercel/analytics/react';

<Analytics />
```

---

## 🔐 Environment Variables (Future)

When you add backend integration, set these in Vercel dashboard:

### Development (.env.local)
```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=http://localhost:54321
```

### Production (Vercel Dashboard)
```env
VITE_API_URL=https://api.tmplescapade.my
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_STRIPE_PUBLIC_KEY=pk_live_...
```

**Add in:** Project Settings → Environment Variables

---

## 🎯 Next Steps After Deployment

### Immediate
1. ✅ Visit your live site
2. ✅ Test all main features
3. ✅ Share URL with stakeholders
4. ✅ Check Vercel dashboard for metrics

### Short-term (This Week)
1. Initialize Git repository
2. Connect Git to Vercel (for auto-deploy)
3. Set up custom domain
4. Enable analytics

### Medium-term (Next Month)
1. Set up Supabase backend
2. Configure environment variables
3. Enable real authentication
4. Add payment gateway

---

## 💡 Pro Tips

### Faster Deployments
```bash
# Preview deployment (not production)
vercel

# Production deployment
vercel --prod

# Deployment with custom alias
vercel --prod --alias my-custom-name.vercel.app
```

### Deployment Regions
```json
// In vercel.json, change region:
"regions": ["sin1"]  // Singapore (current)
"regions": ["hnd1"]  // Tokyo
"regions": ["all"]   // Global (expensive)
```

### Build Optimization
```bash
# Analyze bundle size
npm run build -- --mode=production

# Check what's in the bundle
npx vite-bundle-visualizer
```

---

## 📞 Support

### If Deployment Fails
1. Check build locally: `npm run build`
2. Review Vercel logs in dashboard
3. Check this guide's troubleshooting section
4. Contact Vercel support: https://vercel.com/support

### Useful Links
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Documentation:** https://vercel.com/docs
- **CLI Reference:** https://vercel.com/docs/cli
- **Vite Deployment:** https://vitejs.dev/guide/static-deploy.html#vercel

---

## ✅ Deployment Checklist

Before deploying, ensure:
- [x] `npm run build` works locally
- [x] `vercel.json` exists
- [x] `.gitignore` created
- [x] No build errors
- [x] Vercel CLI installed
- [x] Logged into Vercel account

**You're ready! Run:** `vercel --prod` in your terminal.

---

**Created:** October 20, 2025  
**Project:** TMPL Escapade  
**For:** Production Deployment to Vercel
