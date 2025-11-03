# 🪣 SUPABASE STORAGE SETUP GUIDE

## 📋 **SETUP REQUIRED FOR PDF UPLOAD**

Your PDF upload feature needs a properly configured Supabase Storage bucket. Follow these steps:

---

## 🚀 **QUICK SETUP (5 MINUTES)**

### **Step 1: Access Supabase Dashboard**

1. Go to: https://supabase.com/dashboard
2. Login with your account
3. Select project: **tmpl-escapade-production**
4. Project ID: `vvrmfgealitetfgwsdeu`

### **Step 2: Navigate to Storage**

1. Click **"Storage"** in the left sidebar
2. You should see a list of buckets

### **Step 3: Check if Bucket Exists**

Look for a bucket named: **`package-files`**

**If it exists:**
- ✅ Good! Proceed to Step 4 to configure policies

**If it does NOT exist:**
- ➡️ Click **"New Bucket"** button
- Name: `package-files`
- Public bucket: **YES** (toggle ON)
- File size limit: `10485760` (10MB)
- Allowed MIME types: `application/pdf`
- Click **"Create bucket"**

### **Step 4: Configure Bucket Policies**

**IMPORTANT:** The bucket needs public access policies.

1. Click on the **`package-files`** bucket
2. Go to **"Policies"** tab at the top
3. You should see policy options

**Create these 3 policies:**

#### **Policy 1: Public Upload**
```
Click "New Policy"
→ Select "For full customization"
→ Policy name: "Allow public uploads"
→ Allowed operation: INSERT
→ Target roles: public
→ USING expression: true
→ WITH CHECK expression: bucket_id = 'package-files'
→ Click "Review" then "Save policy"
```

#### **Policy 2: Public Read**
```
Click "New Policy"
→ Select "For full customization"
→ Policy name: "Allow public reads"
→ Allowed operation: SELECT
→ Target roles: public
→ USING expression: bucket_id = 'package-files'
→ Click "Review" then "Save policy"
```

#### **Policy 3: Public Delete**
```
Click "New Policy"
→ Select "For full customization"
→ Policy name: "Allow public deletes"
→ Allowed operation: DELETE
→ Target roles: public
→ USING expression: bucket_id = 'package-files'
→ Click "Review" then "Save policy"
```

### **Step 5: Verify Setup**

1. Go back to **Storage** → **`package-files`**
2. Try uploading a test PDF manually
3. Click **"Upload file"**
4. Select any PDF
5. If upload succeeds → ✅ Setup is correct!

---

## 🧪 **TEST THE UPLOAD FEATURE**

After completing the setup:

1. **Go to Admin Dashboard**
   ```
   https://tmpl-pi.vercel.app/admin/login
   ```

2. **Edit a Package**
   ```
   https://tmpl-pi.vercel.app/admin/packages/edit/00000000-0000-0000-0000-000000000004
   ```

3. **Go to Images Tab**
   - Scroll to bottom
   - Find "3D PDF Itinerary (Optional)"

4. **Click "Choose PDF File"**
   - Select a PDF file (under 10MB)
   - You should see:
     - ✅ Blue card with filename
     - ✅ File size displayed
     - ✅ Remove button (X)

5. **Save Package**
   - Click "Save Package"
   - Watch browser console (F12)
   - Look for messages:
     - "Uploading PDF file: filename.pdf Size: 12345"
     - "PDF uploaded successfully: https://..."

6. **Verify Upload**
   - Refresh the page
   - PDF URL should persist
   - Go to Supabase Storage
   - Check `package-files/itineraries/` folder
   - Your PDF should be there!

---

## 🎨 **VISUAL FEEDBACK NOW WORKING**

### **When You Select a File:**

**Before (OLD - nothing happened):**
```
[Choose PDF File] button
... nothing visible ...
```

**After (NEW - clear feedback):**
```
┌─────────────────────────────────────────┐
│ 📄 amazon-itinerary.pdf            [X] │
│ 2.34 MB                                 │
└─────────────────────────────────────────┘
[Change PDF File] button
```

**Features:**
- ✅ Blue background when file selected
- ✅ Shows filename
- ✅ Shows file size in MB
- ✅ Remove button to clear
- ✅ Button changes to "Change PDF File"
- ✅ Validation alerts for invalid files

---

## 🔧 **TROUBLESHOOTING**

### **Issue: Nothing happens when I select a file**

**Solution 1: Check File Type**
- Make sure you're selecting a `.pdf` file
- Other file types will be rejected with alert

**Solution 2: Check File Size**
- Maximum 10MB
- If larger, you'll see alert message
- Compress your PDF first

**Solution 3: Clear Browser Cache**
- Hard refresh: `Ctrl + Shift + R` (Windows/Linux)
- Hard refresh: `Cmd + Shift + R` (Mac)

**Solution 4: Check Browser Console**
- Press F12 to open DevTools
- Go to "Console" tab
- Look for error messages
- Share errors with developer

### **Issue: File selected but upload fails on save**

**Check Supabase Storage:**

1. **Verify Bucket Exists:**
   - Go to Supabase Dashboard → Storage
   - Confirm `package-files` bucket exists
   - If not, create it (see Step 3 above)

2. **Check Policies:**
   - Click on `package-files` bucket
   - Go to Policies tab
   - Must have 3 policies: INSERT, SELECT, DELETE
   - All with `public` role access

3. **Test Direct Upload:**
   - In Supabase Dashboard
   - Go to Storage → package-files
   - Click "Upload file"
   - Try uploading manually
   - If this fails, policies are wrong

**Check Browser Console:**
```
Open DevTools (F12)
→ Console tab
→ Look for errors like:
  - "403 Forbidden" → Policy issue
  - "404 Not Found" → Bucket doesn't exist
  - "413 Payload Too Large" → File > 10MB
  - "Network error" → Connection issue
```

### **Issue: File uploads but doesn't save to database**

**Check Package Save:**
- Look for "Package saved successfully" in console
- Check for error alerts
- Verify package ID exists
- Check Supabase database connection

---

## 📊 **EXPECTED FLOW**

### **Successful Upload Flow:**

```
1. User clicks "Choose PDF File"
   ↓
2. File picker opens
   ↓
3. User selects PDF
   ↓
4. Validation checks:
   - Size < 10MB? ✅
   - Type = PDF? ✅
   ↓
5. Blue card appears with file info
   ↓
6. User clicks "Save Package"
   ↓
7. Console: "Uploading PDF file: ..."
   ↓
8. Upload to Supabase Storage
   ↓
9. Public URL generated
   ↓
10. Console: "PDF uploaded successfully: ..."
   ↓
11. Package saved to database with PDF URL
   ↓
12. Success message
   ↓
13. Data persists on refresh ✅
```

---

## 🔒 **SECURITY NOTES**

**Public Bucket:**
- Files are publicly accessible
- Anyone with URL can view
- No authentication required
- Safe for marketing materials

**File Restrictions:**
- Only PDF files allowed
- Maximum 10MB per file
- Enforced by validation
- Malicious files blocked

**Best Practices:**
- Don't upload sensitive PDFs
- Use for public itineraries only
- Keep file sizes reasonable
- Test before deploying to customers

---

## 📝 **BUCKET CONFIGURATION DETAILS**

**Bucket Settings:**
```yaml
Name: package-files
ID: package-files
Public: true
File Size Limit: 10485760 bytes (10 MB)
Allowed MIME Types: application/pdf
Path: /storage/v1/object/public/package-files/
```

**Storage Path Structure:**
```
package-files/
  └─ itineraries/
      └─ {packageId}_{timestamp}.pdf
```

**Example File Path:**
```
package-files/itineraries/00000000-0000-0000-0000-000000000004_1730628000000.pdf
```

**Public URL Format:**
```
https://vvrmfgealitetfgwsdeu.supabase.co/storage/v1/object/public/package-files/itineraries/filename.pdf
```

---

## ✅ **VERIFICATION CHECKLIST**

After setup, verify these:

- [ ] Supabase Storage bucket `package-files` exists
- [ ] Bucket is marked as "Public"
- [ ] 3 policies created (INSERT, SELECT, DELETE)
- [ ] All policies have `public` role
- [ ] Manual upload test in Supabase works
- [ ] File selection shows blue card with info
- [ ] Save button uploads PDF successfully
- [ ] Console logs show upload progress
- [ ] Database saves PDF URL
- [ ] Data persists on page refresh
- [ ] Customer site shows 3D flipbook

---

## 🎯 **QUICK COMMANDS FOR SUPABASE CLI**

If you prefer using Supabase CLI:

**Check Bucket:**
```bash
supabase storage ls
```

**Create Bucket:**
```bash
supabase storage create package-files --public
```

**Test Upload:**
```bash
supabase storage upload package-files/test.pdf ./local-file.pdf
```

**List Files:**
```bash
supabase storage ls package-files/itineraries
```

---

## 📞 **NEED HELP?**

**Still not working?**

1. **Check browser console** (F12) for errors
2. **Try in incognito mode** to rule out cache
3. **Test with different PDF** (small file first)
4. **Verify Supabase project** is the correct one
5. **Check Supabase Dashboard** for Storage tab access

**Share these details:**
- Browser console errors
- Supabase project ID
- File size and type
- Screenshot of error

---

## 🚀 **DEPLOYMENT STATUS**

**Current Deployment:**
- Visual feedback: ✅ Deployed
- File validation: ✅ Deployed  
- Error messages: ✅ Deployed
- Console logging: ✅ Deployed

**Next Deployment:**
```bash
vercel --prod
```

This will deploy the latest changes with visual feedback!

---

*Updated: November 3, 2025*  
*Status: Setup instructions ready - follow Steps 1-5 above*  
*Next: Deploy latest changes with vercel --prod* 🎉
