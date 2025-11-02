# 🔧 **COMPLETE AUTH REBUILD PLAN**

## **ROOT CAUSE DISCOVERED**

1. ✅ **Database IDs Fixed** - All auth.users IDs now match public.users IDs
2. ❌ **Code Issue** - The React auth context is not properly responding to Supabase auth changes

## **THE PROBLEM WITH CURRENT CODE**

The current auth pattern has a race condition:
1. Login function authenticates → fetches user profile → calls setUser()
2. But onAuthStateChange handler ALSO tries to fetch user profile
3. These two compete and cause state to not update properly
4. Navigation depends on `isAuthenticated` which is derived from `user` state

## **THE NEW, MODERN SOLUTION**

Use Supabase's built-in auth state management properly:

### **Key Changes:**

1. **Remove duplicate user fetching** - Only fetch in ONE place
2. **Trust onAuthStateChange** - Let it be the single source of truth
3. **Simplify the login function** - Just call signInWithPassword, let the listener handle the rest
4. **Add proper error handling**

### **Architecture:**

```
Login Flow:
1. User clicks login
2. Call supabase.auth.signInWithPassword()
3. Supabase fires SIGNED_IN event
4. onAuthStateChange handler catches it
5. Handler fetches user profile ONCE
6. Sets user state
7. isAuthenticated becomes true
8. useEffect in login page navigates
```

This is the modern, clean way that avoids race conditions.

## **FILES TO REWRITE:**

1. `/src/polymet/components/auth-context.tsx` - Simplify drastically
2. `/src/polymet/pages/login.tsx` - Simplify login handlers

## **IMPLEMENTATION:**

See NEW_AUTH_CONTEXT.tsx and NEW_LOGIN.tsx
