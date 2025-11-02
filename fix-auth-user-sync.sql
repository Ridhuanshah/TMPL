-- Fix: Sync Supabase Auth users with users table
-- This ensures every auth.users entry has a corresponding row in public.users

-- First, let's check if the Super Admin user exists in the users table
SELECT id, email, name FROM users WHERE email = 'superadmin@tmplescapade.my';

-- If the user doesn't exist or has wrong ID, we need to either:
-- 1. Update the existing user row with the correct auth user ID
-- 2. Or insert a new row with the auth user ID

-- Solution: Update the existing user row with the auth user ID
-- Replace 'YOUR_AUTH_USER_ID_HERE' with the actual ID from Supabase Auth
UPDATE users 
SET id = 'a5bfcc33-7d12-4867-b147-0ff8ef31b849'  -- Auth user ID
WHERE email = 'superadmin@tmplescapade.my';

-- Verify the update
SELECT id, email, name, role, status FROM users WHERE email = 'superadmin@tmplescapade.my';

-- Alternative approach: Insert if not exists
-- INSERT INTO users (id, email, name, phone, role, status, created_at, updated_at)
-- VALUES (
--   'a5bfcc33-7d12-4867-b147-0ff8ef31b849',  -- Auth user ID
--   'superadmin@tmplescapade.my',
--   'Super Admin',
--   '+60196616388',
--   'super admin',
--   'active',
--   NOW(),
--   NOW()
-- )
-- ON CONFLICT (email) DO UPDATE SET
--   id = EXCLUDED.id,
--   updated_at = NOW();
