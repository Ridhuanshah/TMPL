# 🗄️ Database Migrations - Direct Booking System

## Migration Files (Run in Order)

| File | Description | Status |
|------|-------------|--------|
| `001_booking_tables.sql` | Create 10 new tables | ⏳ Pending |
| `002_enhance_bookings.sql` | Add columns to bookings table | ⏳ Pending |
| `003_indexes.sql` | Create performance indexes | ⏳ Pending |
| `004_functions.sql` | Database functions & triggers | ⏳ Pending |
| `005_views.sql` | Create helpful views | ⏳ Pending |
| `006_rls_policies.sql` | Row Level Security policies | ⏳ Pending |

## Quick Run (All Migrations)

```bash
# Run all migrations at once
cat 001_booking_tables.sql \
    002_enhance_bookings.sql \
    003_indexes.sql \
    004_functions.sql \
    005_views.sql \
    006_rls_policies.sql | \
psql $DATABASE_URL
```

## Run Individually (Recommended)

```bash
# 1. Create tables
psql $DATABASE_URL -f 001_booking_tables.sql

# 2. Enhance existing tables
psql $DATABASE_URL -f 002_enhance_bookings.sql

# 3. Create indexes
psql $DATABASE_URL -f 003_indexes.sql

# 4. Create functions & triggers
psql $DATABASE_URL -f 004_functions.sql

# 5. Create views
psql $DATABASE_URL -f 005_views.sql

# 6. Setup RLS policies
psql $DATABASE_URL -f 006_rls_policies.sql
```

## Via Supabase Dashboard

1. Go to https://supabase.com/dashboard/project/vvrmfgealitetfgwsdeu/editor
2. Click "SQL Editor"
3. Create new query
4. Copy contents of migration file
5. Run query
6. Repeat for all files

## Verify Migrations

```sql
-- Check new tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'booking_%'
ORDER BY table_name;

-- Check new columns in bookings
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'bookings' 
AND column_name IN ('booking_number', 'departure_date_id', 'payment_plan')
ORDER BY column_name;

-- Check functions exist
SELECT proname, prosrc 
FROM pg_proc 
WHERE proname LIKE '%booking%' 
OR proname LIKE '%installment%' 
OR proname LIKE '%deposit%';

-- Check views exist
SELECT table_name 
FROM information_schema.views 
WHERE table_schema = 'public';

-- Test booking number generation
SELECT get_next_booking_number('pkg_004', '2025-01-15');

-- Test deposit calculation
SELECT calculate_deposit_amount(8000); -- Should return 500
SELECT calculate_deposit_amount(15000); -- Should return 1000

-- Test installment count
SELECT calculate_installment_count(8000); -- Should return 3
SELECT calculate_installment_count(15000); -- Should return 4
SELECT calculate_installment_count(35000); -- Should return 6
```

## Rollback (If Needed)

```sql
-- Drop in reverse order
DROP VIEW IF EXISTS payment_followup;
DROP VIEW IF EXISTS booking_summary;

DROP POLICY IF EXISTS "System can create admin notifications" ON admin_notifications;
-- ... (drop all policies)

DROP TRIGGER IF EXISTS update_installment_plans_updated_at ON installment_plans;
-- ... (drop all triggers)

DROP FUNCTION IF EXISTS update_updated_at_column;
DROP FUNCTION IF EXISTS calculate_installment_count;
DROP FUNCTION IF EXISTS calculate_deposit_amount;
DROP FUNCTION IF EXISTS get_next_booking_number;

DROP TABLE IF EXISTS admin_notifications;
DROP TABLE IF EXISTS booking_notifications;
DROP TABLE IF EXISTS coupon_usage;
DROP TABLE IF EXISTS booking_sequences;
DROP TABLE IF EXISTS installment_schedule;
DROP TABLE IF EXISTS installment_plans;
DROP TABLE IF EXISTS booking_payments;
DROP TABLE IF EXISTS booking_addons;
DROP TABLE IF EXISTS package_addons;
DROP TABLE IF EXISTS booking_travelers;

-- Remove added columns from bookings
ALTER TABLE bookings DROP COLUMN IF EXISTS booking_number;
ALTER TABLE bookings DROP COLUMN IF EXISTS departure_date_id;
-- ... (drop all added columns)
```

## Post-Migration Checklist

- [ ] All 10 tables created
- [ ] Bookings table enhanced with new columns
- [ ] All indexes created
- [ ] All functions working
- [ ] All triggers active
- [ ] Both views created
- [ ] RLS policies enabled
- [ ] Test queries run successfully
- [ ] No errors in Supabase logs

## Next Steps

After successful migration:
1. ✅ Phase 1 complete!
2. 👉 Move to Phase 2: UI Components
3. Start building the booking wizard components
