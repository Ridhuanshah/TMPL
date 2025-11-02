# 📝 Package Edit Form - Current Status & Fix Needed

**Date:** November 2, 2025, 4:30 PM  
**Status:** ⚠️ **EDIT FORM HANGING - NEEDS SAME FIX AS CREATE**

---

## 🎯 Summary

**Create Form:** ✅ **100% WORKING** (Just fixed!)
**Edit Form:** ❌ **HANGING** (Needs same fix)

---

## 🐛 The Problem

The edit form at `/admin/packages/edit/:id` is stuck on a loading screen because:

1. **Fetch Query Hangs:** Lines 79-83 in `package-edit.tsx`
   ```typescript
   const { data, error } = await supabase
     .from("packages")
     .select("*")
     .eq("id", id)
     .single();
   ```
   This query hangs indefinitely (likely RLS policy or Supabase client issue)

2. **Update Query Will Hang:** Lines 219-224
   ```typescript
   const { data, error } = await supabase
     .from("packages")
     .update(cleanedData)
     .eq("id", id)
     .select()
     .single();
   ```
   This will have the same issue when updating

---

## ✅ The Solution (Apply Create Form Fix)

Use the **same direct API approach** that fixed the create form:

### **Step 1: Fix the Fetch Query**

Replace lines 76-121 with:
```typescript
const fetchPackageData = async () => {
  try {
    setFetchingData(true);
    
    // Get auth token from localStorage
    const sessionData = localStorage.getItem('sb-vvrmfgealitetfgwsdeu-auth-token');
    if (!sessionData) {
      throw new Error("Not authenticated");
    }
    
    const session = JSON.parse(sessionData);
    const accessToken = session?.access_token;
    
    // Direct API call
    const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    const response = await fetch(`${supabaseUrl}/rest/v1/packages?id=eq.${id}`, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch package: ${response.statusText}`);
    }
    
    const packages = await response.json();
    const data = packages[0];
    
    if (data) {
      setFormData({
        name: data.name || "",
        slug: data.slug || "",
        description: data.description || "",
        continent: data.continent || "",
        country: data.country || "",
        region: data.region || "",
        category: data.category || "",
        difficulty: data.difficulty || "easy",
        base_price: data.base_price || 0,
        currency: data.currency || "RM",
        duration_days: data.duration_days || 1,
        duration_nights: data.duration_nights || 0,
        min_group_size: data.min_group_size || 1,
        max_group_size: data.max_group_size || 10,
        status: data.status || "draft",
        hero_image: data.hero_image || "",
        highlights: data.highlights && data.highlights.length > 0 ? data.highlights : [""],
        inclusions: data.inclusions && data.inclusions.length > 0 ? data.inclusions : [""],
        exclusions: data.exclusions && data.exclusions.length > 0 ? data.exclusions : [""],
      });
    }
  } catch (error: any) {
    console.error("Error fetching package:", error);
    toast({
      title: "Error",
      description: "Failed to load package data",
      variant: "destructive",
    });
    navigate("/admin/packages");
  } finally {
    setFetchingData(false);
  }
};
```

### **Step 2: Fix the Update Query**

Replace lines 192-243 with:
```typescript
try {
  setLoading(true);

  // Get auth token from localStorage
  const sessionData = localStorage.getItem('sb-vvrmfgealitetfgwsdeu-auth-token');
  if (!sessionData) {
    throw new Error("Not authenticated");
  }
  
  const session = JSON.parse(sessionData);
  const accessToken = session?.access_token;

  // Filter out empty array items
  const cleanedData = {
    name: formData.name,
    slug: formData.slug,
    description: formData.description,
    continent: formData.continent,
    country: formData.country,
    region: formData.region,
    category: formData.category,
    difficulty: formData.difficulty,
    base_price: formData.base_price,
    currency: formData.currency,
    duration_days: formData.duration_days,
    duration_nights: formData.duration_nights,
    min_group_size: formData.min_group_size,
    max_group_size: formData.max_group_size,
    status: formData.status,
    hero_image: formData.hero_image,
    highlights: formData.highlights.filter((h) => h.trim() !== ""),
    inclusions: formData.inclusions.filter((i) => i.trim() !== ""),
    exclusions: formData.exclusions.filter((e) => e.trim() !== ""),
    updated_at: new Date().toISOString(),
  };

  // Direct API call for UPDATE
  const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  const response = await fetch(`${supabaseUrl}/rest/v1/packages?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(cleanedData)
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update package: ${errorText}`);
  }

  toast({
    title: "Success!",
    description: "Package updated successfully",
  });

  navigate(`/admin/packages`);
} catch (error: any) {
  console.error("Error updating package:", error);
  toast({
    title: "Error",
    description: error.message || "Failed to update package",
    variant: "destructive",
  });
} finally {
  setLoading(false);
}
```

---

## 📊 Test Plan

After implementing the fix:

1. **Deploy to production**
2. **Navigate to:** `https://tmpl-pi.vercel.app/admin/packages/edit/9941e816-e162-4380-a69a-d20cfe6eac8f`
3. **Verify:** Form loads with existing package data
4. **Edit:** Change the name to "Working Package - EDITED"
5. **Submit:** Click update button
6. **Verify:** Success message appears
7. **Check database:** Confirm package was updated

---

## 🔑 Key Points

1. **Same Root Cause:** Both create and edit forms had hanging Supabase client calls
2. **Same Solution:** Direct fetch() API with localStorage token
3. **Proven Working:** Create form works perfectly with this approach
4. **Simple Implementation:** Just replace the fetch and update functions

---

## ⏱️ Time Estimate

**5 minutes:**
- 2 minutes: Update fetchPackageData function
- 2 minutes: Update handleSubmit function  
- 1 minute: Deploy and test

---

## 📝 Files to Modify

- `/home/superadmin/TMPL/src/polymet/pages/package-edit.tsx`

---

**Next Action:** Apply the direct API fix to `package-edit.tsx`
