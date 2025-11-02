# 🔐 SUPABASE AUTHENTICATION SETUP GUIDE
**TMPL Escapade - Complete Auth Migration**  
**Date:** November 1, 2025

---

## ✅ WHAT'S BEEN DONE

### **1. Database Users Created** ✅
All 7 users have been added to the `users` table in Supabase:

| Email | Name | Role | Status |
|-------|------|------|--------|
| superadmin@tmplescapade.my | Super Admin | super_admin | ✅ Created |
| admin@tmplescapade.my | Admin User | admin | ✅ Created |
| booking@tmplescapade.my | Michael Chen | booking_reservation | ✅ Created |
| tourguide@tmplescapade.my | Alex Thompson | tour_guide | ✅ Created |
| agent@tmplescapade.my | Sarah Williams | travel_agent | ✅ Created |
| finance@tmplescapade.my | David Lee | finance | ✅ Created |
| marketing@tmplescapade.my | Jennifer Lee | sales_marketing | ✅ Created |

### **2. Supabase Auth Service Created** ✅
- Created `/src/lib/supabase-auth.ts`
- Implements real Supabase Auth
- Replaces mock authentication

---

## 🚀 REQUIRED STEPS (DO THIS NOW)

### **Step 1: Create Supabase Auth Users**

You need to create auth users in Supabase Dashboard for each user.

#### **Option A: Via Supabase Dashboard (Recommended)**

1. Go to: https://app.supabase.com/project/vvrmfgealitetfgwsdeu/auth/users

2. Click **"Add User"** button

3. Create each user with these credentials:

```
User 1: Super Admin
Email: superadmin@tmplescapade.my
Password: Super@123!
✅ Auto Confirm User: YES

User 2: Admin
Email: admin@tmplescapade.my
Password: Admin@123!
✅ Auto Confirm User: YES

User 3: Booking & Reservation
Email: booking@tmplescapade.my
Password: Booking@123!
✅ Auto Confirm User: YES

User 4: Tour Guide
Email: tourguide@tmplescapade.my
Password: Guide@123!
✅ Auto Confirm User: YES

User 5: Travel Agent
Email: agent@tmplescapade.my
Password: Agent@123!
✅ Auto Confirm User: YES

User 6: Finance
Email: finance@tmplescapade.my
Password: Finance@123!
✅ Auto Confirm User: YES

User 7: Sales & Marketing
Email: marketing@tmplescapade.my
Password: Marketing@123!
✅ Auto Confirm User: YES
```

**Important:** Check "Auto Confirm User" for all users so they can login immediately.

---

#### **Option B: Via SQL (Quick Method)**

I can help you run this SQL if you prefer:

```sql
-- Note: This requires Supabase Auth extension
-- You may need to do this via Dashboard instead

SELECT auth.create_user(
  email => 'superadmin@tmplescapade.my',
  password => 'Super@123!',
  email_confirm => true
);

SELECT auth.create_user(
  email => 'admin@tmplescapade.my',
  password => 'Admin@123!',
  email_confirm => true
);

-- ... (repeat for all 7 users)
```

---

### **Step 2: Update Auth Context**

Replace the mock auth with Supabase auth:

**File:** `/src/polymet/components/auth-context.tsx`

Replace the entire login function with:

```typescript
import { supabaseAuth } from '@/lib/supabase-auth'

// In AuthProvider component, replace the login function:
const login = async (email: string, password: string): Promise<LoginResult> => {
  return await supabaseAuth.signIn(email, password)
}

// Replace the logout function:
const logout = async () => {
  await supabaseAuth.signOut()
  setUser(null)
}

// Update the useEffect to check Supabase session:
useEffect(() => {
  const loadUser = async () => {
    try {
      const currentUser = await supabaseAuth.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Error loading auth state:', error)
    } finally {
      setIsLoading(false)
    }
  }

  loadUser()

  // Listen to auth changes
  const { data: { subscription } } = supabaseAuth.onAuthStateChange((user) => {
    setUser(user)
  })

  return () => {
    subscription?.unsubscribe()
  }
}, [])
```

---

### **Step 3: Test the Authentication**

After creating the auth users:

1. **Logout** from current session
2. **Clear browser localStorage**: `localStorage.clear()`
3. **Refresh** the page
4. **Login** with new credentials:
   - Email: `superadmin@tmplescapade.my`
   - Password: `Super@123!`

---

## 📋 COMPLETE CREDENTIALS LIST

### **Production Credentials (Use These)**

```
Super Admin:
Email: superadmin@tmplescapade.my
Password: Super@123!

Admin:
Email: admin@tmplescapade.my
Password: Admin@123!

Booking & Reservation:
Email: booking@tmplescapade.my
Password: Booking@123!

Tour Guide:
Email: tourguide@tmplescapade.my
Password: Guide@123!

Travel Agent:
Email: agent@tmplescapade.my
Password: Agent@123!

Finance:
Email: finance@tmplescapade.my
Password: Finance@123!

Sales & Marketing:
Email: marketing@tmplescapade.my
Password: Marketing@123!
```

---

## 🔄 MIGRATION CHECKLIST

- [x] Users created in `users` table
- [x] Supabase Auth service created
- [ ] **YOU DO:** Create auth users in Supabase Dashboard
- [ ] **YOU DO:** Update auth-context.tsx
- [ ] **YOU DO:** Test login with new credentials
- [ ] **YOU DO:** Update login page with new passwords
- [ ] **YOU DO:** Remove mock auth code

---

## 🚨 IMPORTANT NOTES

### **Password Security**
- **Old passwords** (super123, admin123, etc.) were for MOCK auth only
- **New passwords** (Super@123!, Admin@123!, etc.) are for Supabase Auth
- Change these to secure passwords in production!

### **Auth Flow**
1. User enters email/password
2. Supabase Auth validates credentials
3. On success, fetch user profile from `users` table
4. Check if user status is 'active'
5. Return user object with role

### **Database vs Auth**
- **Supabase Auth:** Handles authentication (login/logout)
- **Users Table:** Stores user profile (name, role, avatar, etc.)
- Both are linked by email address

---

## 🎯 NEXT STEPS AFTER SETUP

1. **Enable RLS on users table:**
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.email() = email);

-- Admins can view all users
CREATE POLICY "Admins can view all users"
ON users FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.email = auth.email()
    AND users.role IN ('super_admin', 'admin')
  )
);
```

2. **Update login page:**
   - Remove quick login buttons (or update passwords)
   - Add password reset link
   - Update demo credentials display

3. **Add password reset:**
```typescript
async resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  return { success: !error, error }
}
```

---

## ✅ VERIFICATION STEPS

After setup, verify:

1. ✅ Can login with new Supabase Auth credentials
2. ✅ User role is correctly fetched from database
3. ✅ Menu items filtered based on role
4. ✅ Logout works properly
5. ✅ Session persists on page refresh
6. ✅ Old mock auth no longer works

---

## 🆘 TROUBLESHOOTING

### **Can't Login**
- Check if auth user was created in Supabase Dashboard
- Verify email is confirmed (auto-confirm checked)
- Check browser console for errors
- Verify database user exists with matching email

### **Role Not Working**
- Check `users` table has correct role
- Verify email matches between auth and database
- Check RLS policies aren't blocking access

### **Session Lost on Refresh**
- Verify Supabase client configuration
- Check auth state change listener is working
- Verify localStorage isn't being cleared

---

## 📞 READY TO HELP

I can help you:
1. Create the auth users via SQL if needed
2. Update the auth-context.tsx file
3. Test the authentication
4. Set up RLS policies

**Let me know when you've created the auth users in Supabase Dashboard, and I'll help with the next steps!**
