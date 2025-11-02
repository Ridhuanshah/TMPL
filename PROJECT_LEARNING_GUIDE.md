# TMPL Escapade - Complete Learning Guide
**For New Development Environment Transfer**  
**Created:** October 31, 2025  
**Status:** ✅ Project Successfully Transferred

---

## 🎯 Quick Overview

You have successfully transferred the **TMPL Escapade** project to a new computer. This is a comprehensive travel agency management system with both admin and customer-facing applications.

**Development Server:** http://localhost:5173 ✅ RUNNING

---

## 📚 Phase 1: Project Fundamentals

### What is TMPL Escapade?

**Business Purpose:**
- Malaysian travel agency management system
- Manages tour packages, bookings, payments, and operations
- Serves both internal staff and external customers

**Two Main Applications:**

1. **Admin Dashboard** (`/admin/*`)
   - Internal CMS for staff
   - Package management (142 packages)
   - Booking management (234 bookings)
   - Payment tracking with installments
   - User management (7 role types)
   - Analytics and reporting

2. **Customer Website** (`/`)
   - Public-facing booking site
   - Browse packages by continent
   - View detailed itineraries
   - Request quotes via WhatsApp/Email
   - Blog and travel tips

### Tech Stack

```
Frontend Framework: React 19.0.0
Language: TypeScript 5.7.2
Build Tool: Vite 6.2.0
Styling: Tailwind CSS 3.4.17
UI Components: Radix UI + shadcn/ui
Icons: Lucide React
Charts: Recharts, Highcharts, D3, ECharts
Forms: React Hook Form + Zod
Routing: React Router DOM
```

### Current Status

✅ **Working:**
- Complete UI/UX implementation
- All frontend features functional
- Role-based access control (mock)
- Responsive design
- Deployed to production

❌ **Not Connected:**
- Backend API
- Real database
- Authentication system
- Payment gateway
- File storage
- Email notifications

---

## 📊 Phase 2: Database Connection

### Current Architecture

```
Component → packageService → Mock Database (in-memory) → Returns data
```

**What This Means:**
- All data exists in TypeScript files
- Changes don't persist (reset on refresh for new data)
- No actual database queries
- Works perfectly for development

### Database-Ready Design

The project has a **sophisticated abstraction layer** that makes database migration trivial:

**Key Files:**

1. **`/src/polymet/services/database.types.ts`** (196 lines)
   - Complete TypeScript types matching Supabase schema
   - Defines 5 tables: packages, daily_itinerary, package_images, travel_tips, essential_items

2. **`/src/polymet/services/mock-database.ts`** (240+ lines)
   - Simulates real PostgreSQL behavior
   - Network delay simulation (50-150ms)
   - Full CRUD operations
   - Converts 142 packages to database format

3. **`/src/polymet/services/package-service.ts`** (91 lines)
   - **Service Layer Abstraction**
   - Currently uses mock database
   - To switch to Supabase: Change ONE line (line 4)

### Database Migration Path

**Option 1: Continue with Mock (Current)**
- ✅ No setup needed
- ✅ Works immediately
- ✅ Perfect for development
- ❌ No data persistence
- ❌ No multi-user support

**Option 2: Migrate to Supabase (~30 minutes)**
- See `DATABASE_MIGRATION_GUIDE.md`
- Steps:
  1. Create Supabase project
  2. Run SQL migrations (already written)
  3. Add environment variables
  4. Change 1 line in `package-service.ts`
  5. Redeploy

### Tables Schema

```sql
packages (main table)
├── id, name, slug, description
├── continent, country, region
├── pricing, duration, difficulty
├── capacity, bookings, revenue
└── status, ratings

daily_itinerary (1-to-many with packages)
├── day_number, title, description
├── location_from, location_to
└── activities, meals, accommodation

package_images (1-to-many with packages)
├── url, alt_text
├── type (hero, gallery, thumbnail)
└── display_order

travel_tips (1-to-many with packages)
essential_items (1-to-many with packages)
```

---

## 🚀 Phase 3: Vercel Deployment

### Current Deployment

**Status:** ✅ Successfully Deployed

- **Live URL:** https://tmpl-9s8fwkmkg-gogotek.vercel.app
- **Project ID:** prj_GCI5HUvfTycOy0bIuq9XIxi0f8rq
- **Region:** Singapore (sin1) - Closest to Malaysia
- **Framework:** Vite (auto-detected)
- **Build Time:** ~3.93 seconds
- **Bundle Size:** 1.53 MB (412 KB gzipped)

### Deployment Configuration

**File: `vercel.json`**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "regions": ["sin1"],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**What this does:**
- Builds with Vite
- Deploys to Singapore region
- Handles React Router (SPA rewrites)
- Serves from `/dist` folder

### How to Deploy Updates

```bash
# From project directory
vercel --prod

# Or for preview deployment
vercel
```

**Deployment is connected to:**
- Organization: gogotek
- Project Name: tmpl
- Auto-deploys on push (if Git is configured)

### Test the Live Site

**Homepage:**
https://tmpl-9s8fwkmkg-gogotek.vercel.app/

**Admin Login:**
https://tmpl-9s8fwkmkg-gogotek.vercel.app/admin/login
- Email: `superadmin@tmplescapade.my`
- Password: `super123`

**Package Details Example:**
https://tmpl-9s8fwkmkg-gogotek.vercel.app/packages/pkg_003

---

## 🗂️ Phase 4: Next Development Phase

### Immediate Priorities (Based on Documentation)

#### 1. **Backend Integration** (Highest Priority)

Currently the app has NO backend. Next steps:

**Option A: Supabase (Recommended)**
- Fastest to implement (~2-4 hours total)
- Already architected for it
- Built-in auth, storage, real-time
- Free tier available

**Steps:**
1. Create Supabase project
2. Run migrations from `DATABASE_MIGRATION_GUIDE.md`
3. Create `.env.local`:
   ```
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   ```
4. Update `package-service.ts` line 4
5. Test locally
6. Add env vars to Vercel
7. Deploy

**Option B: Custom Backend**
- Build Node.js/Express API
- Set up PostgreSQL separately
- More control, more work
- Estimated: 2-3 weeks

#### 2. **Real Authentication**

Current auth is mock (localStorage only). Implement:
- Supabase Auth (if using Supabase)
- Or JWT-based auth with custom backend
- Password hashing (bcrypt)
- Session management
- Password reset flow

#### 3. **File Upload System**

For package images, user avatars:
- Supabase Storage (recommended)
- Or AWS S3
- Or Cloudinary

#### 4. **Payment Gateway Integration**

Malaysian payment options:
- Stripe (international + some Malaysian cards)
- PayPal
- iPay88 (Malaysian focused)
- Revenue Monster (Malaysian)

Payment flows already designed:
- Full payment
- Installment plans (3/4/6 payments)
- Deposit + balance

#### 5. **Email Notifications**

Use:
- SendGrid
- Resend
- AWS SES

Email types needed:
- Booking confirmations
- Payment reminders
- Tour guide assignments
- Newsletter

### Feature Roadmap

**Short-term (1-2 weeks):**
- [ ] Connect to Supabase
- [ ] Migrate mock data
- [ ] Real authentication
- [ ] File uploads

**Medium-term (1 month):**
- [ ] Payment gateway
- [ ] Email system
- [ ] WhatsApp integration
- [ ] Booking workflow automation

**Long-term (2-3 months):**
- [ ] Customer self-service portal
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Multi-language support

---

## 📁 Project Structure Guide

```
/home/superadmin/TMPL/
├── src/
│   ├── components/ui/          # 50+ shadcn/ui components
│   │   └── button.tsx, card.tsx, dialog.tsx, etc.
│   │
│   ├── polymet/                # Main application code
│   │   ├── components/         # Business logic components (40+)
│   │   │   ├── hero-banner-with-locations.tsx
│   │   │   ├── package-hero-floating.tsx
│   │   │   └── ...
│   │   │
│   │   ├── data/               # Mock data (15 files)
│   │   │   ├── package-data.ts     # 142 packages
│   │   │   ├── booking-data.ts     # 234 bookings
│   │   │   ├── auth-data.ts        # 7 users
│   │   │   └── ...
│   │   │
│   │   ├── layouts/            # Layout wrappers
│   │   │   ├── admin-layout.tsx
│   │   │   └── customer-layout.tsx
│   │   │
│   │   ├── pages/              # Route pages (27 pages)
│   │   │   ├── customer-home.tsx
│   │   │   ├── customer-package-details.tsx
│   │   │   ├── admin-dashboard.tsx
│   │   │   └── ...
│   │   │
│   │   ├── services/           # Database layer ⭐
│   │   │   ├── database.types.ts       # TypeScript types
│   │   │   ├── mock-database.ts        # Mock DB
│   │   │   └── package-service.ts      # Service abstraction
│   │   │
│   │   └── plans/              # Documentation
│   │       └── *.md files
│   │
│   ├── App.tsx                 # Main router
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
│
├── Documentation Files (Root)
│   ├── PROJECT_DOCUMENTATION.md        # Complete overview
│   ├── DATABASE_MIGRATION_GUIDE.md     # How to connect DB
│   ├── DEPLOYMENT_GUIDE.md             # Vercel deployment
│   ├── DEPLOYMENT_SUCCESS_SUMMARY.md   # Current deployment
│   ├── QUICK_START_GUIDE.md            # Quick reference
│   └── PROJECT_LEARNING_GUIDE.md       # This file
│
├── package.json                # 122 dependencies
├── vercel.json                 # Deployment config
└── vite.config.ts              # Build config
```

---

## 🔑 Key Files to Know

### Service Layer (Most Important!)

1. **`/src/polymet/services/package-service.ts`**
   - Single point of database access
   - Change one line to switch databases
   - All components use this, never direct data

2. **`/src/polymet/services/mock-database.ts`**
   - Simulates real database
   - Has all 142 packages converted
   - Can be replaced with Supabase calls

3. **`/src/polymet/services/database.types.ts`**
   - TypeScript types for all tables
   - Matches Supabase schema exactly
   - Ensures type safety

### Main Application Files

4. **`/src/App.tsx`**
   - All routes defined here
   - Protected routes logic
   - Layout wrappers

5. **`/src/polymet/data/auth-data.ts`**
   - User roles and permissions
   - Menu items per role
   - Demo login credentials

6. **`/src/polymet/pages/customer-package-details.tsx`**
   - Main customer-facing page
   - Uses packageService
   - Fully responsive

### Configuration

7. **`vercel.json`** - Deployment settings
8. **`vite.config.ts`** - Build settings
9. **`tailwind.config.js`** - Styling config
10. **`package.json`** - Dependencies

---

## 🧪 Testing the Application

### Local Development

**Dev Server:** http://localhost:5173 (Currently running ✅)

**Test Customer Site:**
1. Visit http://localhost:5173
2. See hero banner with location cards
3. Click a package card
4. View package details
5. Test responsive (resize browser)

**Test Admin Dashboard:**
1. Visit http://localhost:5173/admin/login
2. Login: `superadmin@tmplescapade.my` / `super123`
3. Explore dashboard
4. Check package management
5. View bookings calendar
6. Test different user roles

### Production Testing

**Live Site:** https://tmpl-9s8fwkmkg-gogotek.vercel.app

Same tests as local, but on production.

---

## 💡 Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# Deploy to Vercel
vercel --prod
```

---

## 📖 Documentation Priority Reading Order

1. **This file** - PROJECT_LEARNING_GUIDE.md (you're here!)
2. **QUICK_START_GUIDE.md** - Quick reference for common tasks
3. **PROJECT_DOCUMENTATION.md** - Complete technical overview
4. **DATABASE_MIGRATION_GUIDE.md** - When ready for real database
5. **DEPLOYMENT_GUIDE.md** - Deployment details

---

## 🎯 Your Next Actions

### Today (Understanding Phase)

- [x] Read this learning guide
- [ ] Explore the live site
- [ ] Test local dev server
- [ ] Login to admin dashboard
- [ ] Browse through code structure
- [ ] Review service layer files

### This Week (Planning Phase)

- [ ] Decide: Mock DB or migrate to Supabase?
- [ ] If Supabase: Follow DATABASE_MIGRATION_GUIDE.md
- [ ] Set up environment variables
- [ ] Test database connection
- [ ] Make first code change

### Next Steps (Development Phase)

- [ ] Implement real authentication
- [ ] Add file upload capability
- [ ] Connect payment gateway
- [ ] Set up email notifications
- [ ] Build admin booking workflow

---

## ❓ Common Questions

### Q: Can I add new packages?
**A:** Yes! Add to `/src/polymet/services/mock-database.ts` in the packages array. With real DB, use admin interface.

### Q: How do I change user permissions?
**A:** Edit `/src/polymet/data/auth-data.ts` → `rolePermissions` object.

### Q: Is data persisted?
**A:** No, it's in-memory mock data. Resets on server restart. Use Supabase for persistence.

### Q: Can I deploy changes?
**A:** Yes! Run `vercel --prod` from project directory.

### Q: How do I add a new page?
**A:** Create in `/src/polymet/pages/`, add route in `App.tsx`, add to menu in `auth-data.ts`.

---

## 🚨 Important Notes

### Security Warnings

⚠️ **Current app is NOT production-ready for real users because:**
- Authentication is mock (easily bypassed)
- Passwords in plain text (in code)
- No backend validation
- No data encryption
- Client-side only security

**Before going live with customers:**
- Must implement real backend
- Must use proper authentication
- Must secure all endpoints
- Must add HTTPS
- Must validate all inputs

### Performance Notes

⚠️ **Bundle size warning:**
- Current: 1.53 MB (large!)
- Recommended: < 500 KB
- Why: Many chart libraries included

**To optimize:**
- Implement code splitting
- Lazy load routes
- Remove unused libraries
- Use dynamic imports

---

## 🎉 Summary

You now have a complete understanding of:

✅ **Project Fundamentals**
- Travel agency management system
- Admin dashboard + Customer website
- React + TypeScript + Vite stack
- 142 packages, 234 bookings (mock)

✅ **Database Connection**
- Currently: Mock database (in-memory)
- Architecture: Service layer abstraction
- Migration: 30 minutes to Supabase
- Schema: Already defined and ready

✅ **Vercel Deployment**
- Live: https://tmpl-9s8fwkmkg-gogotek.vercel.app
- Region: Singapore
- Build: 3.93s, working perfectly
- Updates: Run `vercel --prod`

✅ **Next Development Phase**
- Priority 1: Supabase backend
- Priority 2: Real authentication
- Priority 3: File uploads
- Priority 4: Payment gateway
- Priority 5: Email system

**The project is well-architected and ready for the next phase!** 🚀

---

**Created:** October 31, 2025  
**Environment:** Transferred to new computer  
**Status:** ✅ Fully understood and documented  
**Dev Server:** ✅ Running on http://localhost:5173
