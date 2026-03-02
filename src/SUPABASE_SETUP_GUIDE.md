# ShopEasy Supabase Setup Guide

This guide will help you set up your new Supabase account and database for the ShopEasy Admin Dashboard.

## Prerequisites

- You should have already connected to your new Supabase account using the connection modal
- Make sure you have a Supabase project created

## Step 1: Run the Database Migration

The migration file has been created at `/supabase/migrations/20241217000000_create_shopeasy_tables.sql`

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your ShopEasy project
3. Navigate to **SQL Editor** in the left sidebar
4. Click **"New query"**
5. Copy the entire contents of the migration file `/supabase/migrations/20241217000000_create_shopeasy_tables.sql`
6. Paste it into the SQL Editor
7. Click **"Run"** to execute the migration
8. You should see a success message: "Success. No rows returned"

### Option B: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase db push
```

## Step 2: Verify Tables Were Created

1. In your Supabase Dashboard, go to **Table Editor**
2. You should see three new tables:
   - `contact_messages` - Stores contact form submissions
   - `training_requests` - Stores training request submissions
   - `app_settings` - Stores app download links and settings

## Step 3: Verify Row Level Security (RLS)

1. Go to **Authentication** > **Policies** in your Supabase Dashboard
2. You should see policies for all three tables
3. These policies allow:
   - Public users to submit contact forms and training requests
   - Authenticated admin users to read, update, and delete all records
   - Public users to read app settings (for the download page)

## Step 4: Test the Admin Dashboard

1. Navigate to the Admin Login page: `/admin`
2. Use the password: **shopeasy2024** (You can change this in `/supabase/functions/server/index.tsx`)
3. After logging in, you should be able to:
   - View contact messages (will be empty initially)
   - View training requests (will be empty initially)
   - Update app settings (Play Store URL, App Store URL, APK Download URL)

## Database Schema Overview

### contact_messages
- `id` (UUID, Primary Key)
- `name` (Text, Required)
- `email` (Text, Required)
- `phone` (Text, Optional)
- `subject` (Text, Required)
- `message` (Text, Required)
- `status` (Text, 'read' or 'unread')
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### training_requests
- `id` (UUID, Primary Key)
- `name` (Text, Required)
- `email` (Text, Required)
- `phone` (Text, Required)
- `business_name` (Text, Required)
- `location` (Text, Required)
- `branches` (Text, Optional)
- `preferred_date` (Text, Optional)
- `message` (Text, Optional)
- `status` (Text, 'read' or 'unread')
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### app_settings
- `id` (UUID, Primary Key)
- `play_store_url` (Text)
- `app_store_url` (Text)
- `apk_download_url` (Text)
- `apk_version` (Text)
- `last_updated` (Timestamp)
- `created_at` (Timestamp)

## API Endpoints

The server provides the following endpoints:

### Public Endpoints
- `POST /make-server-96ec88bb/contact` - Submit contact form
- `POST /make-server-96ec88bb/training` - Submit training request
- `GET /make-server-96ec88bb/app-settings` - Get app download links

### Admin Endpoints (Require Authorization)
- `POST /make-server-96ec88bb/admin/login` - Admin login
- `GET /make-server-96ec88bb/admin/contacts` - Get all contact messages
- `GET /make-server-96ec88bb/admin/training` - Get all training requests
- `POST /make-server-96ec88bb/admin/app-settings` - Update app settings
- `DELETE /make-server-96ec88bb/admin/contacts/:id` - Delete contact message
- `DELETE /make-server-96ec88bb/admin/training/:id` - Delete training request
- `POST /make-server-96ec88bb/admin/contacts/:id/mark-read` - Mark contact as read
- `POST /make-server-96ec88bb/admin/training/:id/mark-read` - Mark training request as read

## Security Notes

### Change the Admin Password

The default admin password is `shopeasy2024`. To change it:

1. Open `/supabase/functions/server/index.tsx`
2. Find line 29: `const ADMIN_PASSWORD = "shopeasy2024";`
3. Change the password to something more secure
4. Save the file

### Important Security Considerations

- The current implementation uses a simple password check. For production, consider implementing proper authentication with password hashing
- All data is stored in Supabase with Row Level Security (RLS) enabled
- Only authenticated users can access admin endpoints
- Public users can submit forms but cannot view or modify existing data

## Troubleshooting

### "Failed to fetch contacts/training"

**Cause**: Server function may not be deployed or migration not run

**Solution**:
1. Make sure you've run the database migration (Step 1)
2. Check that your Supabase Edge Function is deployed
3. Verify your project ID and API keys in `/utils/supabase/info.tsx`

### "Unauthorized" error

**Cause**: Admin password incorrect or not logged in

**Solution**:
1. Make sure you're using the correct password (default: `shopeasy2024`)
2. Try logging out and logging in again
3. Check browser console for authentication errors

### Tables not appearing in Table Editor

**Cause**: Migration not executed successfully

**Solution**:
1. Go to SQL Editor in Supabase Dashboard
2. Run this query to check if tables exist:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('contact_messages', 'training_requests', 'app_settings');
   ```
3. If no results, re-run the migration from Step 1

## Next Steps

Once your database is set up:

1. Test the contact form on the Contact page
2. Test the training request form on the Training page
3. Check that submissions appear in the Admin Dashboard
4. Configure your app download links in App Settings
5. Share the admin password with authorized team members (consider changing it first!)

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Check the Supabase Dashboard > Logs for server errors
3. Verify your Supabase connection is active
4. Make sure the Edge Function is deployed

---

**Need Help?** Contact ShopEasy Support at shopeazy025@gmail.com
