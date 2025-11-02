-- ========================================
-- FIX: Essential Items RLS Policies
-- ========================================
-- This script fixes RLS policies to allow INSERT, UPDATE, DELETE operations
-- on essential_items, travel_tips, daily_itinerary, and package_departure_dates

-- 1. Enable RLS on essential_items (if not already enabled)
ALTER TABLE essential_items ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies (if any) to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for all users" ON essential_items;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON essential_items;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON essential_items;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON essential_items;

-- 3. Create comprehensive RLS policies for essential_items
-- Allow authenticated users to SELECT all essential_items
CREATE POLICY "Enable read access for all users"
ON essential_items FOR SELECT
USING (true);

-- Allow authenticated users to INSERT essential_items
CREATE POLICY "Enable insert for authenticated users only"
ON essential_items FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to UPDATE essential_items
CREATE POLICY "Enable update for authenticated users only"
ON essential_items FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to DELETE essential_items
CREATE POLICY "Enable delete for authenticated users only"
ON essential_items FOR DELETE
TO authenticated
USING (true);

-- ========================================
-- Fix RLS for travel_tips
-- ========================================
ALTER TABLE travel_tips ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON travel_tips;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON travel_tips;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON travel_tips;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON travel_tips;

CREATE POLICY "Enable read access for all users"
ON travel_tips FOR SELECT
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON travel_tips FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only"
ON travel_tips FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only"
ON travel_tips FOR DELETE
TO authenticated
USING (true);

-- ========================================
-- Fix RLS for daily_itinerary
-- ========================================
ALTER TABLE daily_itinerary ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON daily_itinerary;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON daily_itinerary;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON daily_itinerary;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON daily_itinerary;

CREATE POLICY "Enable read access for all users"
ON daily_itinerary FOR SELECT
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON daily_itinerary FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only"
ON daily_itinerary FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only"
ON daily_itinerary FOR DELETE
TO authenticated
USING (true);

-- ========================================
-- Fix RLS for package_departure_dates
-- ========================================
ALTER TABLE package_departure_dates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON package_departure_dates;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON package_departure_dates;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON package_departure_dates;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON package_departure_dates;

CREATE POLICY "Enable read access for all users"
ON package_departure_dates FOR SELECT
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON package_departure_dates FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only"
ON package_departure_dates FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only"
ON package_departure_dates FOR DELETE
TO authenticated
USING (true);

-- ========================================
-- Verification Query
-- ========================================
-- Run this to verify policies are applied
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd,
    roles
FROM pg_policies
WHERE tablename IN ('essential_items', 'travel_tips', 'daily_itinerary', 'package_departure_dates')
ORDER BY tablename, cmd;
