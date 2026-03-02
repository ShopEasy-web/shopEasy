# 🚀 ShopEasy Supabase Configuration - COMPLETE GUIDE

## 📌 Current Status

✅ **Supabase Connected**: Your project `widmtwmadokbhuqdfcva` is connected  
✅ **Edge Function Created**: Server code is ready at `/supabase/functions/server/index.tsx`  
✅ **Migration File Ready**: Database schema at `/supabase/migrations/20241217000000_create_shopeasy_tables.sql`  
⚠️ **Migration Not Run Yet**: Database tables need to be created

## 🔴 Why Changes Aren't Persisting

**The database tables don't exist yet!** 

You have all the code in place, but you need to **run the migration SQL** in your Supabase dashboard to create the tables. Without these tables, your data has nowhere to be stored.

## ⚡ QUICK START (5 Minutes)

### Option 1: Use the Diagnostic Tool (Recommended)

1. **Navigate to**: `your-website.com/diagnostic` (or locally: `localhost/diagnostic`)
2. **Click "Run Diagnostics"**
3. **Follow the instructions** shown on the page
4. The tool will tell you exactly what's wrong and how to fix it

### Option 2: Manual Fix

Follow these steps in order:

#### Step 1: Copy Migration SQL (30 seconds)

1. Open `/supabase/migrations/20241217000000_create_shopeasy_tables.sql`
2. Select ALL content (Ctrl+A / Cmd+A)
3. Copy it (Ctrl+C / Cmd+C)

#### Step 2: Run in Supabase (2 minutes)

1. Go to https://supabase.com/dashboard
2. Select project: `widmtwmadokbhuqdfcva`
3. Click **"SQL Editor"** (left sidebar)
4. Click **"New query"** button
5. **Paste** the migration SQL
6. Click **"Run"** (bottom right)
7. Wait for: "Success. No rows returned"

#### Step 3: Verify (1 minute)

1. Click **"Table Editor"** (left sidebar)
2. You should see 3 new tables:
   - `contact_messages`
   - `training_requests`
   - `app_settings`

#### Step 4: Test (2 minutes)

1. Go to `/admin` on your website
2. Login with: `shopeasy2024`
3. Go to "App Settings" tab
4. Enter any URL and click "Update Settings"
5. **Refresh the page** (F5)
6. ✅ The URL should still be there!

## 📊 What Gets Created

### Tables

| Table | Purpose | Public Access |
|-------|---------|---------------|
| `contact_messages` | Stores contact form submissions | Write only (submit forms) |
| `training_requests` | Stores training requests | Write only (submit forms) |
| `app_settings` | Stores app download URLs | Read & Write (admin only for write) |

### Row Level Security (RLS) Policies

All tables have RLS enabled with these policies:

**Contact Messages & Training Requests:**
- ✅ Anyone can INSERT (public forms)
- ✅ Authenticated users can SELECT, UPDATE, DELETE (admin only)

**App Settings:**
- ✅ Anyone can SELECT (public can read download links)
- ✅ Authenticated users can UPDATE (admin only)

### Indexes

Performance indexes created on:
- `created_at` (for sorting)
- `status` (for filtering read/unread)

### Triggers

Auto-update triggers for `updated_at` timestamp on every record update.

## 🧪 Testing Your Setup

### Test 1: Diagnostic Tool
```
Navigate to: /diagnostic
Click: "Run Diagnostics"
Expected: All checks pass ✅
```

### Test 2: Contact Form
```
Navigate to: /contact
Fill out form and submit
Go to: /admin
Login: shopeasy2024
Check: Contact Messages tab
Expected: Your message appears ✅
```

### Test 3: App Settings Persistence
```
Navigate to: /admin
Login: shopeasy2024
Go to: App Settings tab
Enter: https://test.com
Click: Update Settings
Refresh page: F5
Expected: URL still there ✅
```

### Test 4: Training Request
```
Navigate to: /training
Fill out form and submit
Go to: /admin
Check: Training Requests tab
Expected: Your request appears ✅
```

## 🔐 Security Configuration

### Admin Password

Default: `shopeasy2024`

**To change it:**
1. Open `/supabase/functions/server/index.tsx`
2. Find line 38: `const ADMIN_PASSWORD = "shopeasy2024";`
3. Change to your secure password
4. Save file
5. Redeploy Edge Function (if needed)

### Service Role Key

Your Edge Function uses the service role key to bypass RLS for admin operations. This is stored securely in Supabase environment variables (`SUPABASE_SERVICE_ROLE_KEY`).

⚠️ **Never expose the service role key in client-side code!**

## 📡 API Endpoints

Base URL: `https://widmtwmadokbhuqdfcva.supabase.co/functions/v1/make-server-96ec88bb`

### Public Endpoints

```
POST /contact
Body: { name, email, phone, subject, message }
Response: { success: true, message: "Message received", data: {...} }

POST /training
Body: { name, email, phone, businessName, location, branches, preferredDate, message }
Response: { success: true, message: "Training request received", data: {...} }

GET /app-settings
Response: { playStoreUrl, appStoreUrl, apkDownloadUrl, apkVersion, lastUpdated }
```

### Admin Endpoints (require Authorization header)

```
POST /admin/login
Body: { password: "shopeasy2024" }
Response: { success: true, token: "..." }

GET /admin/contacts
Headers: { Authorization: "Bearer <token>" }
Response: { success: true, contacts: [...] }

GET /admin/training
Headers: { Authorization: "Bearer <token>" }
Response: { success: true, requests: [...] }

POST /admin/app-settings
Headers: { Authorization: "Bearer <token>" }
Body: { playStoreUrl, appStoreUrl, apkDownloadUrl, apkVersion }
Response: { success: true, message: "App settings updated", settings: {...} }

DELETE /admin/contacts/:id
Headers: { Authorization: "Bearer <token>" }
Response: { success: true, message: "Contact deleted" }

DELETE /admin/training/:id
Headers: { Authorization: "Bearer <token>" }
Response: { success: true, message: "Training request deleted" }

POST /admin/contacts/:id/mark-read
Headers: { Authorization: "Bearer <token>" }
Response: { success: true, message: "Contact marked as read" }

POST /admin/training/:id/mark-read
Headers: { Authorization: "Bearer <token>" }
Response: { success: true, message: "Training request marked as read" }
```

## 🐛 Troubleshooting

### Problem: "Failed to fetch" errors

**Possible causes:**
1. Edge Function not deployed
2. Incorrect project ID
3. Network issues

**Solutions:**
1. Go to Supabase Dashboard > Edge Functions
2. Check `make-server-96ec88bb` is deployed
3. Verify project ID in `/utils/supabase/info.tsx`

### Problem: "Policy violation" errors

**Cause:** Migration not run (tables/policies don't exist)

**Solution:** Run the migration in SQL Editor (see Quick Start above)

### Problem: Admin login not working

**Possible causes:**
1. Wrong password
2. Server not deployed

**Solutions:**
1. Check password in `/supabase/functions/server/index.tsx` (line 38)
2. Verify Edge Function is deployed

### Problem: Data not persisting

**Cause:** Migration not run (tables don't exist)

**Solution:** 
1. Run `/diagnostic` to confirm
2. Run migration in SQL Editor
3. Test again

## 📚 File Structure

```
/supabase/
  /functions/
    /server/
      index.tsx          # Main server code with all API endpoints
      kv_store.tsx       # (Not used - legacy)
  /migrations/
    20241217000000_create_shopeasy_tables.sql  # Database schema

/utils/
  /supabase/
    info.tsx             # Supabase connection details

/components/
  /pages/
    AdminDashboard.tsx   # Admin UI
    AdminLoginPage.tsx   # Admin login
    AdminPage.tsx        # Admin wrapper
    ContactPage.tsx      # Public contact form
    TrainingPage.tsx     # Public training form
    AppDownloadPage.tsx  # Public app download page
    DiagnosticPage.tsx   # System diagnostics tool
```

## 🎯 Next Steps After Setup

Once migration is complete:

1. ✅ Test all forms (contact, training)
2. ✅ Configure app download URLs in admin panel
3. ✅ Change admin password to something secure
4. ✅ Share admin credentials with authorized team members
5. ✅ Monitor submissions in admin dashboard
6. ✅ Set up email notifications (future enhancement)

## 🔗 Quick Links

- **Supabase Dashboard**: https://supabase.com/dashboard
- **Your Project**: https://supabase.com/dashboard/project/widmtwmadokbhuqdfcva
- **SQL Editor**: https://supabase.com/dashboard/project/widmtwmadokbhuqdfcva/sql
- **Table Editor**: https://supabase.com/dashboard/project/widmtwmadokbhuqdfcva/editor
- **Edge Functions**: https://supabase.com/dashboard/project/widmtwmadokbhuqdfcva/functions

## 📞 Support

**Project**: ShopEasy POS  
**Contact**: shopeazy025@gmail.com  
**WhatsApp**: 09156061396  
**Office**: No. 127 Redeem Road, Eagle Island, Port Harcourt

---

## ✅ Quick Checklist

Before you start using the admin dashboard, make sure:

- [ ] Migration SQL copied from migration file
- [ ] Migration run in Supabase SQL Editor
- [ ] "Success" message received
- [ ] 3 tables visible in Table Editor
- [ ] Edge Function deployed
- [ ] Diagnostic tool passes all checks
- [ ] Admin login works
- [ ] Test contact form submission works
- [ ] Test training request works
- [ ] App settings persist after refresh

**Once all checked, your ShopEasy backend is live! 🎉**
