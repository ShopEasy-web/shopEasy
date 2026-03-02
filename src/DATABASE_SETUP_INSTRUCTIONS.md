# 🔧 Database Setup Instructions

## Current Status
Your database has the following tables set up correctly:
- ✅ `contact_messages` - Working
- ✅ `training_requests` - Working
- ✅ `app_settings` - Partially working

## ⚠️ Missing: `site_settings` JSONB Column

The contact info and other settings in the **Admin Panel** (accessible via Settings icon) are not persisting because the `site_settings` JSONB column hasn't been added to the database yet.

---

## 📋 Step-by-Step Fix

### Step 1: Run the Migration SQL

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/mgkcmohjjzqsrnkmchsv
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste this SQL:

```sql
-- Add JSONB column to store all site settings
ALTER TABLE app_settings ADD COLUMN IF NOT EXISTS site_settings JSONB DEFAULT '{}'::jsonb;

-- Update RLS policies to allow public insert (for initial setup)
CREATE POLICY IF NOT EXISTS "Allow public insert on app_settings"
  ON app_settings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
```

5. Click **Run** (or press Ctrl/Cmd + Enter)
6. You should see "Success. No rows returned"

### Step 2: Verify the Column Was Added

1. In Supabase Dashboard, go to **Table Editor**
2. Select the `app_settings` table
3. You should now see a new column called `site_settings` with type `jsonb`

### Step 3: Wait for Edge Function Auto-Deploy (Optional)

The Edge Function should already be deployed. You can verify by checking:
- Go to **Edge Functions** in your Supabase dashboard
- Look for `make-server-96ec88bb`
- It should show as "Active"

If it's not deployed, you can deploy it manually by clicking "Deploy" button.

### Step 4: Test the Admin Panel

1. Go to your website and click the Settings icon (or navigate to `/admin`)
2. Login with password: `shopeasy2024`
3. Go to the **Contact Info** tab
4. Make a change (e.g., update the phone number)
5. Click **Save Changes**
6. Refresh the page - your changes should persist!

---

## 🔍 How to Verify Everything Works

### Check 1: Verify in Supabase Database
1. Go to **Table Editor** → `app_settings`
2. You should see one row with:
   - Regular columns: `play_store_url`, `app_store_url`, etc.
   - New `site_settings` column with JSON data containing your contact info, pricing, etc.

### Check 2: Check the Frontend
Open your browser console (F12) and run:
```javascript
fetch('https://mgkcmohjjzqsrnkmchsv.supabase.co/functions/v1/make-server-96ec88bb/settings')
  .then(r => r.json())
  .then(console.log)
```

You should see your settings data returned.

### Check 3: Test Persistence
1. Update contact info in Admin Panel → Save
2. Clear browser cache and localStorage (or use Incognito mode)
3. Reload the page
4. Check if your changes are still there

---

## 📊 Summary of What Each Admin Panel Does

### 🛠 **AdminPage** (`/admin` - Settings Icon)
**Purpose:** Site-wide content management
- Contact information (WhatsApp, email, address)
- Pricing plans
- YouTube tutorial URLs
- Google Form URLs
- APK download URL

**Database Location:** `app_settings.site_settings` (JSONB column)
**Endpoints Used:**
- `GET /settings` - Loads settings
- `POST /settings` - Saves settings

### 📋 **AdminDashboard** (`/admin-login` - Separate Login)
**Purpose:** Customer inquiry management + App store links
- View/manage contact form submissions
- View/manage training booking requests
- Update app store URLs (Google Play, Apple App Store, APK)

**Database Location:**
- Contact messages: `contact_messages` table
- Training requests: `training_requests` table  
- App store URLs: `app_settings` table (dedicated columns)

**Endpoints Used:**
- `GET /admin/contacts` - Fetch contact messages
- `GET /admin/training` - Fetch training requests
- `GET/POST /admin/app-settings` - Manage app download links
- `DELETE /admin/contacts/:id` - Delete contact
- `DELETE /admin/training/:id` - Delete training request

---

## ❓ FAQ

**Q: Why are there two admin panels?**
A: They serve different purposes:
- **AdminPage**: For you to update website content (pricing, contact info, etc.)
- **AdminDashboard**: For you to view and manage customer inquiries

**Q: I ran the migration but settings still aren't saving**
A: Make sure you:
1. Cleared your browser cache
2. The Edge Function is deployed (check Edge Functions tab in Supabase)
3. Check browser console for any error messages

**Q: Can I merge these into one admin panel?**
A: Yes! But that would require refactoring code. For now, they work independently.

**Q: Where do I find customer contact submissions?**
A: Go to `/admin-login`, enter password `shopeasy2024`, and you'll see all contact messages and training requests.

---

## 🚀 Next Steps After Setup

Once the migration is complete and settings are persisting:

1. **Update Contact Info**: Go to `/admin` → Contact Info tab
2. **Set Pricing**: Go to `/admin` → Pricing Plans tab  
3. **Add YouTube Videos**: Go to `/admin` → YouTube Videos tab
4. **Configure Forms**: Go to `/admin` → Google Forms tab
5. **Check Customer Inquiries**: Go to `/admin-login` to view submissions

---

## 🆘 Troubleshooting

**Settings not saving:**
- Check browser console (F12) for errors
- Verify the migration was run successfully
- Check Edge Function is deployed and active

**Can't login to admin:**
- Password is: `shopeasy2024`
- For AdminPage: Go to `/admin`
- For AdminDashboard: Go to `/admin-login`

**Changes appear locally but not on other devices:**
- This means localStorage is working but Supabase isn't
- Run the migration SQL again
- Check Edge Function deployment status

---

Need help? Check the browser console for detailed error messages!
