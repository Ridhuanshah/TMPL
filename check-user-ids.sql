-- Step 1: Check current user IDs in public.users table
SELECT id, email, name, role, status 
FROM users 
WHERE email IN (
  'superadmin@tmplescapade.my',
  'admin@tmplescapade.my',
  'booking@tmplescapade.my',
  'tourguide@tmplescapade.my',
  'agent@tmplescapade.my',
  'finance@tmplescapade.my',
  'marketing@tmplescapade.my'
)
ORDER BY email;

-- Step 2: Check auth user IDs from auth.users table
SELECT id, email, created_at, last_sign_in_at
FROM auth.users
WHERE email IN (
  'superadmin@tmplescapade.my',
  'admin@tmplescapade.my',
  'booking@tmplescapade.my',
  'tourguide@tmplescapade.my',
  'agent@tmplescapade.my',
  'finance@tmplescapade.my',
  'marketing@tmplescapade.my'
)
ORDER BY email;

-- Step 3: Find mismatches
SELECT 
  au.id as auth_id,
  au.email as auth_email,
  u.id as users_id,
  u.email as users_email,
  CASE 
    WHEN au.id = u.id THEN '✅ MATCH'
    ELSE '❌ MISMATCH'
  END as status
FROM auth.users au
FULL OUTER JOIN users u ON au.email = u.email
WHERE au.email IN (
  'superadmin@tmplescapade.my',
  'admin@tmplescapade.my',
  'booking@tmplescapade.my',
  'tourguide@tmplescapade.my',
  'agent@tmplescapade.my',
  'finance@tmplescapade.my',
  'marketing@tmplescapade.my'
)
ORDER BY au.email;
