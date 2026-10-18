# Complete Firebase & Cloudinary Deployment Guide

**Target Environment:** Firebase Hosting / Vercel + Cloud Firestore + Firebase Authentication + Cloudinary CDN  
**Project:** AK Global Solutions  

---

## 1. Firebase Project Setup

### A. Create Project
1. Navigate to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** (or select an existing one).
3. Name your project (e.g. `ak-global-solutions-prod`).
4. (Optional) Enable Google Analytics for web traffic insights.
5. Click **Create project**.

### B. Register the Web App
1. On your Firebase Project Overview dashboard, click the Web icon (`</>`) to add an app.
2. App nickname: `AK Global Web`.
3. Check the box: **"Also set up Firebase Hosting for this app"**.
4. Click **Register app**.
5. Copy the `firebaseConfig` keys into your `.env.local` (and into your Vercel / Firebase Hosting environment variables):
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=1:...:web:...
   ```

---

## 2. Firebase Authentication Setup

1. In the Firebase Console left menu, go to **Build &gt; Authentication**.
2. Click **Get started**.
3. Under **Sign-in method**, choose **Email/Password**.
4. Toggle **Enable** on (keep Email link passwordless sign-in disabled). Click **Save**.
5. Go to the **Users** tab and click **Add user**:
   - Email: `akglobalsolutions@gmail.com` (or your preferred admin email)
   - Password: Choose a strong administrative password.
   - Click **Add user**.
6. Set the authorized email in your environment variables:
   ```env
   VITE_ADMIN_EMAILS=akglobalsolutions@gmail.com
   ```

---

## 3. Cloud Firestore Provisioning

1. In Firebase Console left menu, go to **Build &gt; Firestore Database**.
2. Click **Create database**.
3. Select **Production mode** (Security rules will be applied via `firestore.rules`).
4. Select your Cloud Firestore location:
   - Recommended for Noida / India: `asia-south1` (Mumbai) or nearest target.
5. Click **Enable**.

---

## 4. Deploying Security Rules & Indexes

Using the Firebase CLI:

1. Install Firebase tools globally (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```
2. Log in to Firebase:
   ```bash
   firebase login
   ```
3. Associate with your Firebase project:
   ```bash
   firebase use --add
   ```
4. Deploy security rules and indexes:
   ```bash
   firebase deploy --only firestore:rules,firestore:indexes
   ```

---

## 5. Cloudinary Free Tier Setup (Media & Photography CDN)

1. Sign up for a free account at [Cloudinary.com](https://cloudinary.com/).
2. On your Cloudinary Dashboard, copy your **Cloud Name**.
3. Go to **Settings (Gear Icon) &gt; Upload &gt; Upload Presets**.
4. Click **Add upload preset**.
   - Preset name: `ak_global_admin_preset`
   - Signing Mode: **Unsigned**
   - Folder: `ak_global_solutions`
   - Allowed formats: `jpg, png, webp, avif`
   - Max file size: `10000000` (10 MB)
5. Click **Save**.
6. Add the variables to your `.env.local` / Vercel settings:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=ak_global_admin_preset
   ```

---

## 6. One-Click Database Seeding

Once your Firebase and Cloudinary credentials are set up:

1. Start your local dev server:
   ```bash
   npm run dev
   ```
2. Open `/admin/login` in your browser.
3. Sign in with the administrator email & password you created in Step 2.
4. Navigate to **Studio Settings** (`/admin/settings`).
5. Scroll down to the **Data Initialization Utility** card and click **Seed Database Now &rarr;**.
6. All 6 curated projects, 5 capabilities, and official company contact records will be uploaded to your Cloud Firestore database instantly!

---

## 7. Deploying to Firebase Hosting or Vercel

### Option A: Deploy to Firebase Hosting
```bash
# Build the production assets
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### Option B: Deploy to Vercel
1. Push your repository to GitHub.
2. In [Vercel Dashboard](https://vercel.com/dashboard), import your repository.
3. Under **Environment Variables**, add:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_ADMIN_EMAILS`
   - `VITE_CLOUDINARY_CLOUD_NAME`
   - `VITE_CLOUDINARY_UPLOAD_PRESET`
4. Click **Deploy**. `vercel.json` already handles all SPA rewrites for `/admin/*`.

