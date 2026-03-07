# How to Get API Keys for .env File

## 🔑 Required API Keys

---

## 1️⃣ CLERK KEYS (User Authentication)

### Sign Up / Login:
**Link:** https://clerk.com/

### Steps:
1. Go to https://dashboard.clerk.com/sign-up
2. Create a free account
3. Create a new application
4. Choose authentication methods (Email, Google, etc.)

### Get Your Keys:
After creating an application, go to:
https://dashboard.clerk.com/last-active?path=api-keys

**Copy these keys:**
- **CLERK_PUBLISHABLE_KEY** - Starts with `pk_test_` or `pk_live_`
- **CLERK_SECRET_KEY** - Starts with `sk_test_` or `sk_live_`

### Webhook Secret:
1. Go to: https://dashboard.clerk.com/last-active?path=webhooks
2. Click "Add Endpoint"
3. Add your endpoint URL: `http://localhost:5000/api/webhooks/clerk` (for development)
4. Select events: `user.created`, `user.updated`, `user.deleted`
5. Copy the **Signing Secret** - This is your `CLERK_WEBHOOK_SECRET`

---

## 2️⃣ CLOUDINARY KEYS (File Upload - Resume, Images)

### Sign Up / Login:
**Link:** https://cloudinary.com/

### Steps:
1. Go to https://cloudinary.com/users/register_free
2. Create a free account (Free tier includes 25GB storage + 25GB bandwidth)
3. Verify your email

### Get Your Keys:
After login, you'll be on the dashboard:
https://console.cloudinary.com/

**Copy these keys from the dashboard:**
- **CLOUDINARY_CLOUD_NAME** - Your cloud name (visible at top)
- **CLOUDINARY_API_KEY** - API Key
- **CLOUDINARY_API_SECRET** - API Secret (click "eye" icon to reveal)

---

## 3️⃣ JWT_SECRET (Already Set - But You Can Change It)

This is for company authentication. It should be a random, secure string.

### Generate a Strong JWT Secret:
You can use any of these methods:

**Method 1: Online Generator**
- Visit: https://www.grc.com/passwords.htm
- Use the "63 random alpha-numeric characters" password

**Method 2: Node.js (in terminal)**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Method 3: Use the default I provided**
The one already in your .env file is fine for development

---

## 4️⃣ MONGODB_URI (Already Set ✅)

You already have this configured:
```
mongodb+srv://basaravanishreesha_db_user:shreesha123@node.cu9cd1u.mongodb.net/job-portal
```

This is your MongoDB Atlas connection string - **Keep this as is!**

---

## 📝 UPDATE YOUR .env FILE

Once you have all the keys, update your `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb+srv://basaravanishreesha_db_user:shreesha123@node.cu9cd1u.mongodb.net/job-portal
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_api_secret_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## 🚀 QUICK START (For Testing Only)

### If you want to test WITHOUT Cloudinary and Clerk:

**Option 1:** Comment out file upload features temporarily
**Option 2:** Use these settings for basic testing:

```env
PORT=5000
MONGODB_URI=mongodb+srv://basaravanishreesha_db_user:shreesha123@node.cu9cd1u.mongodb.net/job-portal
JWT_SECRET=my_super_secret_jwt_key_for_development_testing_12345
CLERK_WEBHOOK_SECRET=test_webhook_secret
CLERK_PUBLISHABLE_KEY=pk_test_placeholder
CLERK_SECRET_KEY=sk_test_placeholder
CLOUDINARY_CLOUD_NAME=placeholder
CLOUDINARY_API_KEY=placeholder
CLOUDINARY_API_SECRET=placeholder
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**What will work:**
✅ Company registration & login
✅ Job creation (without images)
✅ Job listing and filtering
✅ Applications (without resume upload)

**What won't work:**
❌ Resume file uploads
❌ Company logo uploads
❌ Clerk user authentication

---

## 🔒 SECURITY NOTES

⚠️ **NEVER commit your .env file to Git!**

The `.env` file should be in your `.gitignore`:
```
.env
```

✅ Use the `.env.example` file to share the structure (without actual keys)

---

## ⏰ TIME REQUIRED

- **Clerk Setup:** 5-10 minutes
- **Cloudinary Setup:** 3-5 minutes
- **JWT Secret:** 1 minute (use generator)
- **Total:** ~15 minutes

---

## 🆘 NEED HELP?

If you get stuck:
1. Check the official documentation:
   - Clerk: https://clerk.com/docs
   - Cloudinary: https://cloudinary.com/documentation

2. Make sure all keys are copied correctly (no extra spaces)
3. Restart your server after updating .env file

---

## ✅ VERIFICATION

After adding all keys, test with Postman:

1. **Register Company:** `POST http://localhost:5000/api/company/register`
2. **Login:** `POST http://localhost:5000/api/company/login`
3. **Create Job:** `POST http://localhost:5000/api/jobs` (with company token)

If all work ✅ - You're ready to go!
