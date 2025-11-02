# 📦 PACKAGES MIGRATION GUIDE

## Overview
This guide explains how to migrate the 4 mock packages from `/src/polymet/data/package-data.ts` to the Supabase database.

---

## 🎯 What This Migration Does

### **Packages Being Migrated:**
1. **Himalayan Base Camp Trek** (Nepal) - 14 days, RM 4,500
2. **African Safari Adventure** (Kenya/Tanzania) - 10 days, RM 6,200  
3. **Antarctic Expedition Cruise** (Antarctica) - 12 days, RM 15,000
4. **Amazon Rainforest Explorer** (Peru) - 8 days, RM 3,800

### **Data Included for Each Package:**
- ✅ Core package details (name, description, pricing, duration, etc.)
- ✅ Daily itinerary (4 sample days per package)
- ✅ Travel tips (4 tips per package)
- ✅ Essential items (8 items per package)
- ✅ Departure dates (3-4 dates per package with capacity/booking info)

### **Total Records:**
- 4 packages
- 16 daily itinerary items
- 16 travel tips  
- 32 essential items
- 15 departure dates

---

## 🚀 HOW TO RUN THE MIGRATION

### **Option 1: Supabase SQL Editor** (RECOMMENDED)

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Navigate to your project: `tmpl-escapade-production`

2. **Open SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New query"

3. **Copy & Paste SQL**
   - Open file: `/home/superadmin/TMPL/migrate-packages-to-supabase.sql`
   - Copy ALL contents (282 lines)
   - Paste into SQL Editor

4. **Run Migration**
   - Click "Run" button (or press Cmd/Ctrl + Enter)
   - Wait for completion (~5-10 seconds)

5. **Verify Success**
   - You should see: "Success. No rows returned"
   - Scroll to bottom and run the verification queries

### **Option 2: Using Supabase MCP Tool**

Run the migration script using the MCP Supabase tool (already configured).

---

## 📊 DATABASE SCHEMA MAPPING

### **Mock Data → Supabase Columns**

#### **Packages Table:**
```typescript
Mock Field              → Database Column
---------------------------------------------
id: "pkg_001"          → id: '00000000-0000-0000-0000-000000000001'
name                   → name
description            → description  
continent              → continent
country                → country
duration               → duration_days
difficulty             → difficulty (lowercase: "Easy" → "easy")
groupSize.min          → min_group_size
groupSize.max          → max_group_size
pricing.basePrice      → base_price
pricing.currency       → currency
status                 → status
highlights[]           → highlights (ARRAY)
inclusions[]           → inclusions (ARRAY)
exclusions[]           → exclusions (ARRAY)
images.hero            → hero_image
images.gallery[]       → gallery_images (ARRAY)
pdfItinerary           → pdf_itinerary_url
bookings               → total_bookings
revenue                → total_revenue
rating                 → average_rating
reviews                → total_reviews
```

#### **Package Departure Dates:**
```typescript
Mock Field              → Database Column
---------------------------------------------
id                     → id (generated UUID)
startDate              → start_date
endDate                → end_date
capacity               → capacity
booked                 → booked
status                 → status
price                  → price_override
flightType             → (not migrated)
flightCompany          → (not migrated - needs flight_company_id FK)
tripCode               → trip_code
```

---

## ⚠️ IMPORTANT NOTES

### **UUIDs Changed:**
Mock data used simple IDs like `pkg_001`, but Supabase requires proper UUIDs:
- `pkg_001` → `00000000-0000-0000-0000-000000000001`
- `pkg_002` → `00000000-0000-0000-0000-000000000002`
- `pkg_003` → `00000000-0000-0000-0000-000000000003`
- `pkg_004` → `00000000-0000-0000-0000-000000000004`

### **Difficulty Values Lowercase:**
- Mock: "Easy", "Moderate", "Challenging", "Extreme"
- Database: "easy", "moderate", "challenging", "expert"

### **Data Truncation:**
Migration script includes `TRUNCATE` commands that will **DELETE ALL existing package data**.  
⚠️ Only run this on a **fresh database** or when you want to reset package data!

### **RLS Policies:**
The script enables Row Level Security and creates policies:
- ✅ **Public read access** for active packages (for customer browsing)
- ✅ **Admin full access** for super_admin, admin, sales_marketing roles

---

## ✅ VERIFICATION

After running the migration, verify with these queries:

```sql
-- Count packages
SELECT COUNT(*) as total_packages FROM packages;
-- Expected: 4

-- List all packages
SELECT name, continent, country, base_price, total_bookings, average_rating
FROM packages
ORDER BY created_at;

-- Count all related records
SELECT 
  (SELECT COUNT(*) FROM packages) as packages_count,
  (SELECT COUNT(*) FROM daily_itinerary) as itinerary_items,
  (SELECT COUNT(*) FROM travel_tips) as travel_tips,
  (SELECT COUNT(*) FROM essential_items) as essential_items,
  (SELECT COUNT(*) FROM package_departure_dates) as departure_dates;
-- Expected: 4, 16, 16, 32, 15
```

---

## 🔄 NEXT STEPS

After successful migration:

1. **Update Frontend Code** - Modify `/src/polymet/pages/package-management.tsx`:
   - Replace mock data imports
   - Add Supabase query to fetch from database
   - Update TypeScript types to match database schema

2. **Test Package List Page**:
   - Visit: https://tmpl-pi.vercel.app/admin/packages
   - Verify all 4 packages display correctly
   - Test filters (continent, category, status, difficulty)
   - Test search functionality

3. **Add Create/Edit/Delete** functionality:
   - Package CRUD operations
   - Itinerary management  
   - Departure date management

---

## 📁 FILES

| File | Description |
|------|-------------|
| `migrate-packages-to-supabase.sql` | Complete migration SQL script (282 lines) |
| `PACKAGES_MIGRATION_GUIDE.md` | This guide |
| `src/polymet/data/package-data.ts` | Original mock data (reference) |
| `src/polymet/pages/package-management.tsx` | Frontend component to update |

---

## 🆘 TROUBLESHOOTING

### **Error: "column does not exist"**
- Check column names match database schema exactly
- Common issue: `booked_count` vs `booked`, `price` vs `price_override`

### **Error: "invalid UUID format"**
- Ensure UUIDs are in format: `'00000000-0000-0000-0000-000000000001'::uuid`
- Not: `'pkg_001'::uuid`

### **Error: "RLS policy already exists"**
- Drop existing policies first:
  ```sql
  DROP POLICY IF EXISTS "Allow public read access to active packages" ON packages;
  ```

### **No Data Showing in Frontend**
1. Check RLS policies are enabled and correct
2. Verify Supabase connection in frontend
3. Check browser console for errors
4. Test with Supabase anon key has SELECT permission

---

## ✅ MIGRATION CHECKLIST

- [ ] Database backup taken (if needed)
- [ ] SQL script reviewed and understood
- [ ] Migration executed in Supabase SQL Editor
- [ ] Verification queries run successfully
- [ ] 4 packages visible in packages table
- [ ] Related tables populated correctly
- [ ] RLS policies enabled and tested
- [ ] Frontend code updated to use Supabase
- [ ] Package list page tested and working

---

**Ready to migrate! 🚀**

Date: November 2, 2025  
Project: TMPL Escapade  
Database: tmpl-escapade-production (vvrmfgealitetfgwsdeu)
