-- ========================================
-- Investigation: Essential Items Not Saving
-- ========================================

-- 1. Check if essential_items table exists and its structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'essential_items'
ORDER BY ordinal_position;

-- 2. Check current essential_items data for the test package
SELECT * FROM essential_items 
WHERE package_id = '00000000-0000-0000-0000-000000000004'
ORDER BY display_order;

-- 3. Check RLS policies on essential_items table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'essential_items';

-- 4. Check if RLS is enabled on essential_items
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename = 'essential_items';

-- 5. Check ALL related tables for the package
SELECT 'daily_itinerary' as table_name, COUNT(*) as row_count 
FROM daily_itinerary 
WHERE package_id = '00000000-0000-0000-0000-000000000004'
UNION ALL
SELECT 'travel_tips', COUNT(*) 
FROM travel_tips 
WHERE package_id = '00000000-0000-0000-0000-000000000004'
UNION ALL
SELECT 'essential_items', COUNT(*) 
FROM essential_items 
WHERE package_id = '00000000-0000-0000-0000-000000000004'
UNION ALL
SELECT 'package_departure_dates', COUNT(*) 
FROM package_departure_dates 
WHERE package_id = '00000000-0000-0000-0000-000000000004';

-- 6. Check package main data
SELECT 
    id,
    name,
    category,
    inclusions,
    exclusions,
    highlights
FROM packages
WHERE id = '00000000-0000-0000-0000-000000000004';

-- ========================================
-- FINDINGS ANALYSIS
-- ========================================
-- After running the above queries, check:
-- 1. If essential_items table has proper columns (id, package_id, item, display_order)
-- 2. If there's any data in essential_items for this package
-- 3. If RLS policies are blocking INSERT/DELETE operations
-- 4. Compare with other tables (travel_tips, daily_itinerary) to see if they have the same issue
