# 🔴 **CRITICAL ISSUE FOUND: Auth User ID Mismatch**

**Date:** November 1, 2025 at 5:55 PM  
**Status:** 🔴 **BLOCKING - Login Stuck**

---

## 🎯 **ISSUE IDENTIFIED**

The settings page loading issue and login stuck issue are caused by **Supabase Auth user ID mismatch** with the database `users` table.

---

## 🔍 **ROOT CAUSE ANALYSIS**

### **What's Happening:**

1. ✅ **Supabase Auth Login**: SUCCESS
   - User logs in with email: `superadmin@tmplescapade.my`
   - Auth returns user ID: `a5bfcc33-7d12-4867-b147-0ff8ef31b849`

2. ❌ **Database User Lookup**: FAILS
   - Login function tries to fetch user from `users` table
   - Query: `SELECT * FROM users WHERE email = 'superadmin@tmplescapade.my'`
   - **Problem**: The `id` in the `users` table is `f176d540-24c5-4163-b195-8e933d1f5522`
   - **But Auth user ID is**: `a5bfcc33-7d12-4867-b147-0ff8ef31b849`
   - **Result**: MISMATCH! Two different user IDs for the same email!

3. 🔴 **Login Hangs**:
   - Login function fails to find matching user profile
   - Code logs error: "User profile not found"
   - Auth session exists but no user state set
   - Page stuck on "Signing in..."

### **Why This Happened:**

When you initially created users in the database, they were given UUIDs. Later, when Supabase Auth was set up, new auth users were created with DIFFERENT UUIDs. The two systems are out of sync.

---

## 🛠️ **THE FIX**

You need to update the `users` table to use the same IDs as Supabase Auth.

### **Option 1: Update Existing User Row** (RECOMMENDED)

Run this SQL in your Supabase SQL Editor:

```sql
-- Update the Super Admin user to match Auth user ID
UPDATE users 
SET id = 'a5bfcc33-7d12-4867-b147-0ff8ef31b849'
WHERE email = 'superadmin@tmplescapade.my';

-- Verify the update
SELECT id, email, name, role, status 
FROM users 
WHERE email = 'superadmin@tmplescapade.my';
```

### **Option 2: Delete and Recreate** (If Update Fails)

If the update doesn't work due to foreign key constraints:

```sql
-- 1. Delete the old user
DELETE FROM users WHERE email = 'superadmin@tmplescapade.my';

-- 2. Insert with correct Auth ID
INSERT INTO users (
  id, 
  email, 
  name, 
  phone, 
  role, 
  status, 
  bio,
  created_at, 
  updated_at
) VALUES (
  'a5bfcc33-7d12-4867-b147-0ff8ef31b849',  -- Auth user ID
  'superadmin@tmplescapade.my',
  'Super Admin',
  '+60196616388',
  'super admin',
  'active',
  NULL,
  NOW(),
  NOW()
);
```

---

## 📊 **HOW TO FIND AUTH USER IDS**

To get the correct Auth user IDs for all your users, run this SQL:

```sql
-- Get all auth users and their IDs
SELECT 
  id,
  email,
  created_at,
  last_sign_in_at
FROM auth.users
ORDER BY email;
```

Then update each user in the `users` table to match:

```sql
-- Example for all demo users
UPDATE users SET id = '<AUTH_ID_FROM_ABOVE>' WHERE email = 'superadmin@tmplescapade.my';
UPDATE users SET id = '<AUTH_ID_FROM_ABOVE>' WHERE email = 'admin@tmplescapade.my';
UPDATE users SET id = '<AUTH_ID_FROM_ABOVE>' WHERE email = 'booking@tmplescapade.my';
-- ... and so on for each user
```

---

## 🔍 **DIAGNOSIS DETAILS**

### **Network Request Analysis:**

**Auth Login (Request 49):**
```
POST /auth/v1/token?grant_type=password
Status: 200 OK
Response: {
  "user": {
    "id": "a5bfcc33-7d12-4867-b147-0ff8ef31b849",  <-- Auth user ID
    "email": "superadmin@tmplescapade.my"
  }
}
```

**Missing Request:**
```
GET /rest/v1/users?email=eq.superadmin@tmplescapade.my
// This request SHOULD happen after auth but DOESN'T
// Because the login function fails silently
```

---

## ✅ **VERIFICATION STEPS**

After running the fix SQL:

1. **Verify user ID is updated:**
   ```sql
   SELECT id, email FROM users WHERE email = 'superadmin@tmplescapade.my';
   -- Should return: a5bfcc33-7d12-4867-b147-0ff8ef31b849
   ```

2. **Test login:**
   - Go to https://tmpl-pi.vercel.app/admin/login
   - Click "Super Admin" quick login
   - Should navigate to dashboard immediately

3. **Test settings page:**
   - Go to Settings
   - Should load without infinite "Loading..."
   - Edit bio and save
   - Should save successfully

---

## 📝 **CURRENT STATE**

### **Problems:**
- ❌ Login stuck on "Signing in..."
- ❌ Settings page stuck on "Loading..." after refresh
- ❌ Auth user ID doesn't match database user ID

### **After Fix:**
- ✅ Login works instantly
- ✅ Settings page loads correctly
- ✅ Save functionality works
- ✅ Page refresh works

---

## 🎯 **ACTION REQUIRED**

**YOU MUST RUN THIS SQL NOW:**

```sql
UPDATE users 
SET id = 'a5bfcc33-7d12-4867-b147-0ff8ef31b849'
WHERE email = 'superadmin@tmplescapade.my';
```

**Then test the login again.**

---

## 📋 **FILES CREATED**

1. `fix-auth-user-sync.sql` - SQL to fix the ID mismatch
2. `AUTH_SYNC_ISSUE_ANALYSIS.md` - This detailed analysis

---

## 🔑 **KEY INSIGHT**

**The issue is NOT in the code.** The code is correct. The issue is **data inconsistency** between:
- `auth.users` table (Supabase managed)
- `public.users` table (Your custom table)

These two tables MUST have matching IDs for the same email.

---

**Priority:** 🔴 **CRITICAL - BLOCKS ALL LOGIN**  
**Next Step:** Run the SQL update immediately
