# Google Forms Setup Guide for ShopEasy Website

This website now uses a comprehensive Admin Panel that allows you to configure Google Forms URLs without editing code files directly. However, you still need to create your Google Forms and get the correct URLs and entry IDs.

## Step 1: Create Google Forms

### Contact Form
1. Go to [Google Forms](https://forms.google.com)
2. Create a new form titled "ShopEasy Contact Form"
3. Add the following fields:
   - **Name** (Short answer, Required)
   - **Email** (Short answer, Required)
   - **Phone** (Short answer, Optional)
   - **Subject** (Dropdown, Required) - Options: Sales Inquiry, Technical Support, On-Site Training, Partnership, Other
   - **Message** (Paragraph, Required)

### Training Request Form
1. Create another form titled "ShopEasy Training Requests"
2. Add the following fields:
   - **Business Name** (Short answer, Required)
   - **Contact Name** (Short answer, Required)
   - **Email** (Short answer, Required)
   - **Phone** (Short answer, Required)
   - **Location/City** (Short answer, Required)
   - **Number of Staff** (Short answer, Optional)
   - **Preferred Training Date** (Date, Optional)
   - **Type of Training** (Dropdown, Optional) - Options: Basic Training, Standard Training, Premium Training
   - **Additional Information** (Paragraph, Optional)

## Step 2: Get Form Submission URLs

⚠️ **IMPORTANT**: You need the **formResponse** URL, not the **viewform** URL!

### Getting the formResponse URL:
1. Click the **Send** button in your Google Form
2. Click the **<>** (link) icon
3. Copy the form URL - it will look like: `https://docs.google.com/forms/d/e/1FAIpQLSe.../viewform`
4. **Replace** `viewform` with `formResponse` at the end of the URL
5. Your final URL should look like: `https://docs.google.com/forms/d/e/1FAIpQLSe.../formResponse`

### Getting Entry IDs (Field IDs):
1. Open your form's preview or published link
2. Right-click on the page and select "View Page Source" or "Inspect"
3. Search for `entry.` (use Ctrl+F or Cmd+F)
4. You'll find IDs like `entry.123456789` for each field
5. Note down the entry ID for each field in order

**Example Entry IDs for Contact Form:**
- Name: `entry.123456789`
- Email: `entry.987654321`
- Phone: `entry.456789123`
- Subject: `entry.789123456`
- Message: `entry.321654987`

## Step 3: Configure via Admin Panel

🎉 **NEW**: You can now configure everything through the Admin Panel!

### Access the Admin Panel:
1. Go to your website homepage
2. Scroll to the footer
3. Click on the **shield icon** (🛡️) in the footer
4. Enter the password: `shopeasy2024`

### Update Google Forms Settings:
1. Once logged in, click on the **"Google Forms"** tab
2. Paste your Contact Form `formResponse` URL in the **Contact Form URL** field
3. Paste your Training Form `formResponse` URL in the **Training Booking Form URL** field
4. Click **"Save Changes"**

✅ **That's it!** Your forms are now configured.

### Note on Entry IDs:
Currently, the entry IDs need to be updated in the code files directly. Here's how:

#### Update Contact Page Entry IDs (`/components/pages/ContactPage.tsx`):
Find lines around 46-50 and replace with your entry IDs:

```typescript
googleFormData.append('entry.YOUR_NAME_FIELD_ID', formData.name);
googleFormData.append('entry.YOUR_EMAIL_FIELD_ID', formData.email);
googleFormData.append('entry.YOUR_PHONE_FIELD_ID', formData.phone);
googleFormData.append('entry.YOUR_SUBJECT_FIELD_ID', formData.subject);
googleFormData.append('entry.YOUR_MESSAGE_FIELD_ID', formData.message);
```

#### Update Training Page Entry IDs (`/components/pages/TrainingPage.tsx`):
Find lines around 50-58 and replace with your entry IDs:

```typescript
googleFormData.append('entry.YOUR_BUSINESS_NAME_FIELD_ID', formData.businessName);
googleFormData.append('entry.YOUR_CONTACT_NAME_FIELD_ID', formData.contactName);
googleFormData.append('entry.YOUR_EMAIL_FIELD_ID', formData.email);
googleFormData.append('entry.YOUR_PHONE_FIELD_ID', formData.phone);
googleFormData.append('entry.YOUR_LOCATION_FIELD_ID', formData.location);
googleFormData.append('entry.YOUR_DATE_FIELD_ID', formData.preferredDate);
googleFormData.append('entry.YOUR_STAFF_FIELD_ID', formData.numberOfStaff);
googleFormData.append('entry.YOUR_TYPE_FIELD_ID', formData.trainingType);
googleFormData.append('entry.YOUR_NOTES_FIELD_ID', formData.additionalNotes);
```

## Step 4: View Responses

1. Open your Google Form
2. Click on the **Responses** tab
3. You can view responses in the form or click the Google Sheets icon to create a spreadsheet
4. Set up email notifications (Form Settings > Responses > Get email notifications for new responses)

## Step 5: Test Your Forms

1. Go to your Contact page and submit a test message
2. Check your Google Form responses to verify the submission
3. Do the same for the Training page
4. If submissions don't appear, double-check your formResponse URL and entry IDs

## Additional Settings in Admin Panel

The Admin Panel also allows you to configure:

### 📱 App Downloads Tab:
- APK download URL
- Signup/Login URL

### 🎥 YouTube Videos Tab:
- YouTube Channel URL (for footer icon)
- Tutorial Playlist URL (for "Watch Tutorial" buttons)
- Individual video IDs for tutorial pages

### 📞 Contact Info Tab:
- WhatsApp number
- Email address
- Phone number
- Office address
- City, State, Country

### 💰 Pricing Plans Tab:
- Update pricing for all tiers
- Modify features for each plan
- Change plan names and descriptions

All changes are saved in your browser's localStorage and will instantly update across the entire website without needing page refreshes!

## Tips

- Test the forms by submitting a test entry to ensure everything works
- You can customize the success messages in the code files
- The forms use `mode: 'no-cors'` which is required for Google Forms submissions
- Google Forms may not provide direct feedback, so we show success messages optimistically
- Consider setting up automated responses in Google Forms to confirm submissions to users
- The admin password is `shopeasy2024` - consider changing this in production

## Troubleshooting

### Forms not submitting?
1. Verify your formResponse URL is correct (not viewform)
2. Double-check entry IDs match your form fields
3. Check browser console for errors

### Contact info not updating?
1. Make sure you're saving changes in the Admin Panel
2. The website uses localStorage - changes apply instantly
3. Clear your browser cache if issues persist

### Admin panel not accessible?
1. Look for the shield icon 🛡️ in the footer
2. Password is: `shopeasy2024`
3. Try clicking the icon directly

---

**Need Help?** Contact support at shopeazy025@gmail.com or WhatsApp: 09156061396
