# ShopEasy App Download & Screenshot Management Setup Guide

## Overview
The ShopEasy website now has a comprehensive app download system with:
- Google Play Store link management
- Apple App Store link management
- Direct APK download functionality
- App screenshot gallery management

All managed through the Admin Dashboard!

## Database Setup

### Step 1: Run the Migration SQL

Run the new migration SQL file in your Supabase SQL Editor:

```sql
-- This is already in /supabase/migrations/20241219000000_add_app_screenshots.sql
```

This creates:
- `app_screenshots` table for storing screenshot URLs and captions
- RLS policies for public read and authenticated write access

### Step 2: Create Storage Buckets (Optional)

If you want to use Supabase Storage for hosting files, run these commands in the Supabase SQL Editor:

```sql
-- Create APK files bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('apk-files', 'apk-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create screenshots bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('app-screenshots', 'app-screenshots', true)
ON CONFLICT (id) DO NOTHING;

-- Set storage policies for APK files
CREATE POLICY "Allow public read access to APK files"
ON storage.objects FOR SELECT
USING (bucket_id = 'apk-files');

CREATE POLICY "Allow authenticated upload to APK files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'apk-files' AND auth.role() = 'authenticated');

-- Set storage policies for screenshots
CREATE POLICY "Allow public read access to screenshots"
ON storage.objects FOR SELECT
USING (bucket_id = 'app-screenshots');

CREATE POLICY "Allow authenticated upload to screenshots"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'app-screenshots' AND auth.role() = 'authenticated');
```

## How to Use the Admin Dashboard

### 1. Access the Admin Dashboard
- Navigate to `/admin` on your website
- Log in with your admin credentials

### 2. Go to "App Settings" Tab
Click on the "App Settings" tab in the admin dashboard.

### 3. Configure App Download Links

#### Google Play Store
1. Upload your app to Google Play Store
2. Get the Play Store URL (e.g., `https://play.google.com/store/apps/details?id=com.shopeasy.app`)
3. Paste it in the "Google Play Store URL" field
4. Click "Save Changes"
5. The "Coming Soon" badge will be replaced with an active download link!

#### Apple App Store
1. Upload your app to Apple App Store
2. Get the App Store URL (e.g., `https://apps.apple.com/app/shopeasy/id123456789`)
3. Paste it in the "Apple App Store URL" field
4. Click "Save Changes"
5. The "Coming Soon" badge will be replaced with an active download link!

#### Direct APK Download
1. Upload your APK file to a hosting service:
   - **Option 1: Supabase Storage** (if you set up the buckets above)
     - Go to your Supabase Dashboard → Storage → apk-files
     - Upload your .apk file
     - Copy the public URL
   
   - **Option 2: Google Drive**
     - Upload your .apk file to Google Drive
     - Set sharing to "Anyone with the link"
     - Get the direct download link
   
   - **Option 3: Dropbox**
     - Upload your .apk file
     - Get a shareable link and replace `dl=0` with `dl=1` at the end
   
   - **Option 4: Your own server**
     - Upload to your server and get the direct download URL

2. Paste the download URL in the "APK Download URL" field
3. Enter the version (e.g., `v1.0.0`) in the "APK Version" field
4. Click "Save Changes"
5. A blue "Direct Download" badge will appear on the app download page!

### 4. Add App Screenshots

1. Upload your app screenshots to a hosting service (same options as APK above)
2. In the "App Screenshots" section:
   - Paste the screenshot URL in the "Screenshot URL" field
   - Add an optional caption (e.g., "Dashboard View")
   - Click "Add Screenshot"
3. Repeat for all your screenshots
4. Screenshots will appear in order on the app download page
5. To delete a screenshot, click the red X button on it

## App Download Page Features

The app download page (`/download-app`) now shows:

### Download Badges
- **Google Play**: Shows "Coming Soon" until you add a link
- **App Store**: Shows "Coming Soon" until you add a link  
- **Direct Download**: Only appears when you upload an APK

### Screenshots Section
- Displays all uploaded screenshots in a scrollable gallery
- Shows captions below each screenshot
- If no screenshots are uploaded, shows placeholder cards
- Perfect mobile-first design

## File Hosting Recommendations

### For APK Files (10-50 MB)
1. **Supabase Storage** - Best for this project (5GB free)
2. **Firebase Storage** - Good alternative (5GB free)
3. **AWS S3** - Enterprise option
4. **GitHub Releases** - Free for open source projects

### For Screenshots (< 1 MB each)
1. **Imgur** - Free, unlimited screenshots
2. **Supabase Storage** - Integrated with your database
3. **Cloudinary** - Free tier with 10GB storage
4. **Your own server** - Full control

## Example URLs

### Google Play Store URL
```
https://play.google.com/store/apps/details?id=com.shopeasy.pos
```

### Apple App Store URL
```
https://apps.apple.com/ng/app/shopeasy-pos/id1234567890
```

### Direct APK Download (Supabase Storage)
```
https://mgkcmohjjzqsrnkmchsv.supabase.co/storage/v1/object/public/apk-files/shopeasy-v1.0.0.apk
```

### Screenshot URL (Supabase Storage)
```
https://mgkcmohjjzqsrnkmchsv.supabase.co/storage/v1/object/public/app-screenshots/screenshot-1.png
```

## Troubleshooting

### "Coming Soon" badges not updating
- Make sure you clicked "Save Changes" in the admin dashboard
- Refresh the app download page
- Check browser console for any errors

### Screenshots not showing
- Verify the image URL is publicly accessible
- Try opening the URL in a new browser tab
- Make sure you're using direct image URLs (not webpage links)

### APK download not working
- Ensure the URL is a direct download link (not a webpage)
- For Google Drive, make sure sharing is set to "Anyone with the link"
- For Dropbox, replace `dl=0` with `dl=1` in the URL

## Next Steps

1. ✅ Run the migration SQL in Supabase
2. ✅ (Optional) Set up storage buckets
3. ✅ Upload your APK file to a hosting service
4. ✅ Add the APK download URL in admin dashboard
5. ✅ Upload app screenshots
6. ✅ Add screenshot URLs in admin dashboard
7. ✅ (Later) Add Google Play and App Store URLs when ready

## Security Notes

- All download links are publicly accessible (as intended)
- Admin dashboard requires authentication to modify links
- Use HTTPS URLs for all uploads
- Consider versioning your APK files (e.g., `shopeasy-v1.0.0.apk`)

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all URLs are publicly accessible
3. Ensure the migration SQL was run successfully
4. Check Supabase RLS policies are correctly set

---

**Created:** December 19, 2024
**Version:** 1.0
