-- ============================================================
-- CREATE ALL 7 USERS IN SUPABASE
-- TMPL Escapade - User Setup Script
-- ============================================================

-- 1. SUPER ADMIN
INSERT INTO users (
  id,
  email,
  password_hash,
  name,
  phone,
  avatar,
  role,
  status,
  flag_tier,
  country,
  city,
  email_verified,
  phone_verified
) VALUES (
  gen_random_uuid(),
  'superadmin@tmplescapade.my',
  '$2a$10$YourHashedPasswordHere', -- Will be set via Supabase Auth
  'Super Admin',
  '+60196616388',
  'https://github.com/polymet-ai.png',
  'super_admin',
  'active',
  'vvip',
  'Malaysia',
  'Kuala Lumpur',
  true,
  true
);

-- 2. ADMIN
INSERT INTO users (
  id,
  email,
  password_hash,
  name,
  phone,
  avatar,
  role,
  status,
  flag_tier,
  country,
  city,
  email_verified,
  phone_verified
) VALUES (
  gen_random_uuid(),
  'admin@tmplescapade.my',
  '$2a$10$YourHashedPasswordHere',
  'Admin User',
  '+60196616389',
  'https://github.com/yusufhilmi.png',
  'admin',
  'active',
  'vip',
  'Malaysia',
  'Kuala Lumpur',
  true,
  true
);

-- 3. BOOKING & RESERVATION
INSERT INTO users (
  id,
  email,
  password_hash,
  name,
  phone,
  avatar,
  role,
  status,
  flag_tier,
  country,
  city,
  email_verified,
  phone_verified
) VALUES (
  gen_random_uuid(),
  'booking@tmplescapade.my',
  '$2a$10$YourHashedPasswordHere',
  'Michael Chen',
  '+60123456781',
  'https://github.com/denizbuyuktas.png',
  'booking_reservation',
  'active',
  'normal',
  'Malaysia',
  'Petaling Jaya',
  true,
  true
);

-- 4. TOUR GUIDE
INSERT INTO users (
  id,
  email,
  password_hash,
  name,
  phone,
  avatar,
  role,
  status,
  flag_tier,
  country,
  city,
  email_verified,
  phone_verified
) VALUES (
  gen_random_uuid(),
  'tourguide@tmplescapade.my',
  '$2a$10$YourHashedPasswordHere',
  'Alex Thompson',
  '+60123456782',
  'https://github.com/shoaibux1.png',
  'tour_guide',
  'active',
  'normal',
  'Malaysia',
  'Kuala Lumpur',
  true,
  true
);

-- 5. TRAVEL AGENT
INSERT INTO users (
  id,
  email,
  password_hash,
  name,
  phone,
  avatar,
  role,
  status,
  flag_tier,
  country,
  city,
  email_verified,
  phone_verified
) VALUES (
  gen_random_uuid(),
  'agent@tmplescapade.my',
  '$2a$10$YourHashedPasswordHere',
  'Sarah Williams',
  '+60123456785',
  'https://github.com/yahyabedirhan.png',
  'travel_agent',
  'active',
  'normal',
  'Malaysia',
  'Shah Alam',
  true,
  true
);

-- 6. FINANCE
INSERT INTO users (
  id,
  email,
  password_hash,
  name,
  phone,
  avatar,
  role,
  status,
  flag_tier,
  country,
  city,
  email_verified,
  phone_verified
) VALUES (
  gen_random_uuid(),
  'finance@tmplescapade.my',
  '$2a$10$YourHashedPasswordHere',
  'David Lee',
  '+60123456786',
  'https://github.com/kdrnp.png',
  'finance',
  'active',
  'normal',
  'Malaysia',
  'Kuala Lumpur',
  true,
  true
);

-- 7. SALES & MARKETING
INSERT INTO users (
  id,
  email,
  password_hash,
  name,
  phone,
  avatar,
  role,
  status,
  flag_tier,
  country,
  city,
  email_verified,
  phone_verified
) VALUES (
  gen_random_uuid(),
  'marketing@tmplescapade.my',
  '$2a$10$YourHashedPasswordHere',
  'Jennifer Lee',
  '+60123456780',
  'https://github.com/yahyabedirhan.png',
  'sales_marketing',
  'active',
  'normal',
  'Malaysia',
  'Cyberjaya',
  true,
  true
);

-- Verify users created
SELECT id, email, name, role, status FROM users ORDER BY role;
