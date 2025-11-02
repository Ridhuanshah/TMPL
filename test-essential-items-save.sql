-- ========================================
-- TEST: Essential Items Save Operation
-- ========================================
-- This script tests if you can manually insert/delete essential items
-- to verify RLS policies are working

-- 1. Try to INSERT a test essential item (as authenticated user)
-- Replace YOUR_USER_ID with your actual user ID from auth.users
BEGIN;
  INSERT INTO essential_items (package_id, item, display_order)
  VALUES ('00000000-0000-0000-0000-000000000004', 'TEST ITEM - Water bottle', 1);
  
  -- Check if insert succeeded
  SELECT * FROM essential_items 
  WHERE package_id = '00000000-0000-0000-0000-000000000004';
ROLLBACK; -- Don't commit, just testing

-- 2. Try to DELETE essential items (testing the main issue)
BEGIN;
  DELETE FROM essential_items 
  WHERE package_id = '00000000-0000-0000-0000-000000000004';
  
  -- Check if delete succeeded
  SELECT COUNT(*) as remaining_items FROM essential_items 
  WHERE package_id = '00000000-0000-0000-0000-000000000004';
ROLLBACK; -- Don't commit, just testing

-- 3. Full simulation of what the app does during update
BEGIN;
  -- Delete existing
  DELETE FROM essential_items 
  WHERE package_id = '00000000-0000-0000-0000-000000000004';
  
  -- Insert new
  INSERT INTO essential_items (package_id, item, display_order)
  VALUES 
    ('00000000-0000-0000-0000-000000000004', 'Waterproof jacket', 1),
    ('00000000-0000-0000-0000-000000000004', 'Hiking boots', 2),
    ('00000000-0000-0000-0000-000000000004', 'Sunscreen SPF 50+', 3);
  
  -- Verify
  SELECT * FROM essential_items 
  WHERE package_id = '00000000-0000-0000-0000-000000000004'
  ORDER BY display_order;
ROLLBACK; -- Don't commit, just testing

-- If all above queries work without errors, the RLS policies are fixed
-- If you get permission denied errors, run the fix-essential-items-rls.sql script
