-- FIX: Sync ALL user IDs with their auth.users IDs
-- This is the ROOT CAUSE of the login issue

-- Update each user to use their auth.users ID
UPDATE users SET id = '037f336a-f7d5-4245-9873-e17aa732a641' WHERE email = 'admin@tmplescapade.my';
UPDATE users SET id = 'aacb879d-17c9-4d69-9449-d82f2902d593' WHERE email = 'agent@tmplescapade.my';
UPDATE users SET id = '41b5b04a-f4ab-46f3-872a-b43b0c0df863' WHERE email = 'booking@tmplescapade.my';
UPDATE users SET id = '125ef9df-ddfa-4c84-a877-405aacd14e86' WHERE email = 'finance@tmplescapade.my';
UPDATE users SET id = '24da049a-8da7-4042-a700-a5dac575336a' WHERE email = 'marketing@tmplescapade.my';
UPDATE users SET id = '98f47660-c709-404f-8d7a-e933d2a1c01a' WHERE email = 'tourguide@tmplescapade.my';

-- Verify the fix
SELECT 
  au.id as auth_id,
  au.email,
  u.id as users_id,
  CASE 
    WHEN au.id = u.id THEN '✅ MATCH'
    ELSE '❌ MISMATCH'
  END as status
FROM auth.users au
LEFT JOIN users u ON au.email = u.email
ORDER BY au.email;
