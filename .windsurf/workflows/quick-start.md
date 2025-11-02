---
description: Quick start development workflow
---

# Quick Start Development

## 1. Start Development
// turbo
```bash
cd /home/superadmin/TMPL
npm run dev
```

## 2. Common Tasks

### Run Tests
```bash
npm run test
```

### Build for Production
```bash
npm run build
```

### Lint Code
```bash
npm run lint
```

## 3. Access Application
- **Local:** http://localhost:5173
- **Production:** https://tmpl-pi.vercel.app

## 4. Demo Accounts
```
Super Admin: superadmin@tmplescapade.my / super123
Admin: admin@tmplescapade.my / admin123
Booking: booking@tmplescapade.my / booking123
Tour Guide: tourguide@tmplescapade.my / guide123
Agent: agent@tmplescapade.my / agent123
Finance: finance@tmplescapade.my / finance123
Marketing: marketing@tmplescapade.my / marketing123
```

## 5. Key Directories
- `/src/polymet/components/` - Business components
- `/src/polymet/pages/` - Application pages
- `/src/polymet/services/` - API services
- `/src/components/ui/` - Reusable UI components
- `/src/polymet/data/` - Mock data (to be replaced)

## 6. Database
- **Project ID:** vvrmfgealitetfgwsdeu
- **URL:** https://vvrmfgealitetfgwsdeu.supabase.co
- **Tables:** 23 tables (see COMPLETE_TABLE_LIST.md)
- **Status:** Active & Connected

## 7. Deployment
- **Platform:** Vercel
- **Region:** Singapore
- **Auto-deploy:** Enabled on git push

## 8. Quick Checks
```bash
# Check if server is running
curl http://localhost:5173

# Check build size
npm run build && du -sh dist/

# Check dependencies
npm list --depth=0
```
