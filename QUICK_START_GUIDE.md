# TMPL Escapade - Quick Start Guide

**Project:** Travel Agency Management System  
**Status:** Frontend Complete, Backend Pending  
**Last Updated:** October 20, 2025

---

## 🚀 Quick Start Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Check for linting errors
```

---

## 🔐 Demo Login Credentials

Access the admin dashboard at `/admin/login`:

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Super Admin** | superadmin@tmplescapade.my | super123 | Full access |
| **Admin** | admin@tmplescapade.my | admin123 | Payment management |
| **Booking** | booking@tmplescapade.my | booking123 | Booking operations |
| **Tour Guide** | tourguide@tmplescapade.my | guide123 | Tour assignments |
| **Agent** | agent@tmplescapade.my | agent123 | Sales & booking |
| **Finance** | finance@tmplescapade.my | finance123 | Financial reports |
| **Marketing** | marketing@tmplescapade.my | marketing123 | Packages & promos |

---

## 📍 Key Routes

### Customer Website
- `/` - Homepage
- `/about` - About Us
- `/how-it-works` - How It Works
- `/blog` - Blog & Travel Tips
- `/blog/:slug` - Individual blog post

### Admin Dashboard
- `/admin` - Dashboard Overview
- `/admin/packages` - Package Management
- `/admin/bookings` - Booking Management
- `/admin/calendar` - Booking Calendar
- `/admin/payment-follow-up` - Payment Tracking
- `/admin/coupons` - Coupon Management
- `/admin/users` - User Management
- `/admin/tour-guide-test` - Tour Guide Dashboard
- `/admin/destinations` - Destination Management
- `/admin/reviews` - Review Management
- `/admin/analytics` - Analytics & Reports
- `/admin/settings` - System Settings

---

## ⚠️ Critical Information

### What Works ✅
- Complete frontend UI/UX
- Role-based access control (mock)
- All CRUD interfaces
- Responsive design
- Multiple chart libraries
- Form validation

### What Doesn't Work ❌
- **NO BACKEND** - All data is mock
- **NO DATABASE** - Nothing persists
- **NO REAL AUTH** - Easily bypassed
- **NO API CALLS** - Frontend only
- **NO FILE UPLOADS** - No storage
- **NO PAYMENTS** - No gateway

---

## 🗄️ Data Location

All data is **hardcoded** in `/src/polymet/data/`:

```
auth-data.ts              # Users, roles, permissions (7 users)
package-data.ts           # Travel packages (142 packages)
booking-data.ts           # Bookings (234 bookings)
customer-data.ts          # Customer information
destination-data.ts       # Destinations & continents
review-data.ts           # Customer reviews
dashboard-data.ts        # Dashboard metrics
coupon-data.ts           # Discount coupons
enhanced-payment-data.ts # Payment structures
tour-guide-assignments.ts # Guide assignments
```

---

## 📦 Tech Stack Summary

| Category | Technology |
|----------|-----------|
| **Framework** | React 19.0 + TypeScript 5.7 |
| **Build Tool** | Vite 6.2 |
| **Routing** | React Router DOM |
| **UI Library** | Radix UI + shadcn/ui |
| **Styling** | Tailwind CSS 3.4 |
| **Icons** | Lucide React |
| **Charts** | Recharts, Highcharts, D3, ECharts |
| **Forms** | React Hook Form + Zod |
| **State** | React Context API |
| **Auth** | Mock (localStorage) |
| **Backend** | **NONE** |
| **Database** | **NONE** |

---

## 🔧 Project Structure

```
TMPL/
├── src/
│   ├── components/ui/          # 50+ shadcn/ui components
│   ├── polymet/
│   │   ├── components/         # Business components (40+)
│   │   ├── data/              # Mock data files (15 files)
│   │   ├── layouts/           # Admin & customer layouts
│   │   ├── pages/             # 25+ pages/routes
│   │   └── plans/             # Implementation docs (5 files)
│   ├── App.tsx                # Main routing
│   └── main.tsx               # Entry point
├── package.json               # 122 dependencies
└── vite.config.ts            # Build configuration
```

---

## 🚨 Before Production Checklist

### Must Have (Critical)
- [ ] Set up Supabase backend
- [ ] Create database schema
- [ ] Implement real authentication
- [ ] Migrate mock data to DB
- [ ] Add API endpoints
- [ ] Enable HTTPS
- [ ] Hash passwords
- [ ] Set up monitoring

### Should Have (Important)
- [ ] Initialize Git repository
- [ ] Deploy to Vercel
- [ ] Optimize bundle size
- [ ] Add unit tests
- [ ] Set up CI/CD
- [ ] Configure environment variables
- [ ] Add error logging

### Nice to Have
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] SMS/WhatsApp
- [ ] File upload to cloud
- [ ] Advanced analytics
- [ ] Mobile app

---

## 💡 Common Tasks

### Add a New Page

1. Create page component in `/src/polymet/pages/new-page.tsx`
2. Add route in `/src/App.tsx`:
```typescript
<Route
  path="/admin/new-page"
  element={
    <ProtectedRoute>
      <AdminLayout>
        <NewPage />
      </AdminLayout>
    </ProtectedRoute>
  }
/>
```
3. Add menu item in `/src/polymet/data/auth-data.ts`

### Add Mock Data

1. Open relevant file in `/src/polymet/data/`
2. Add new entry following existing pattern
3. Use TypeScript interface for type safety
4. Data appears immediately (no backend needed)

### Change User Role Access

1. Edit `/src/polymet/data/auth-data.ts`
2. Modify `rolePermissions` object
3. Update `menuItems.requiredRoles` array
4. Refresh browser

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

---

## 🐛 Troubleshooting

### App Won't Start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build Fails
- Check TypeScript errors: `npx tsc --noEmit`
- Check ESLint errors: `npm run lint`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Data Not Showing
- Data is hardcoded - check `/src/polymet/data/`
- Refresh browser
- Check browser console for errors

### Login Not Working
- Use exact credentials from table above
- Check localStorage in DevTools
- Auth is mock - password is not secure

### Bundle Too Large
- Remove unused chart libraries
- Implement code splitting
- Use lazy loading for routes

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `PROJECT_DOCUMENTATION.md` | Complete project overview |
| `TECHNICAL_ANALYSIS_REPORT.md` | Technical deep-dive |
| `QUICK_START_GUIDE.md` | This file - quick reference |
| `SETUP_COMPLETE.md` | Initial setup completed |
| `VERCEL_MCP_SETUP.md` | Vercel MCP configuration |
| `/src/polymet/plans/*.md` | Implementation plans (5 files) |

---

## 🔗 Important Links

### Project
- **Local Dev:** http://localhost:5173
- **Admin Login:** http://localhost:5173/admin/login
- **Vercel Dashboard:** https://vercel.com/dashboard

### Resources
- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com
- **shadcn/ui:** https://ui.shadcn.com
- **Supabase:** https://supabase.com/docs
- **Vite:** https://vitejs.dev

---

## 🎯 Next Steps

### Today
1. Read `PROJECT_DOCUMENTATION.md`
2. Read `TECHNICAL_ANALYSIS_REPORT.md`
3. Test all admin features with different roles
4. Identify which features you need first

### This Week
1. Initialize Git repository
2. Create Supabase project
3. Design database schema
4. Deploy to Vercel (staging)

### Next Week
1. Implement backend API
2. Migrate mock data to database
3. Set up real authentication
4. Connect frontend to backend

---

## 💬 Getting Help

### Documentation
1. Start with this Quick Start Guide
2. Read PROJECT_DOCUMENTATION.md for overview
3. Read TECHNICAL_ANALYSIS_REPORT.md for technical details
4. Check plan files in `/src/polymet/plans/`

### Common Issues
- **Build errors:** Check TypeScript and ESLint
- **Routing issues:** Check App.tsx and protected routes
- **Data issues:** Check mock data files
- **Auth issues:** Remember it's mock auth

### Code Examples
- Look at existing pages for patterns
- Check components/ui/ for UI patterns
- Review data files for data structure
- See plans/ for implementation notes

---

**Remember:** This is a **frontend prototype**. Backend integration is required before production use.

**Quick Check:** Can you see the customer homepage at `/`? Can you login at `/admin/login`? If yes, you're all set!

---

**Last Updated:** October 20, 2025  
**Version:** 1.0  
**For:** TMPL Escapade Development Team
