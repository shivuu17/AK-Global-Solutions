# Firebase Architecture & Security Design

**Project:** AK Global Solutions  
**Client:** React 19 + Vite 8 SPA hosted on Vercel / Firebase Hosting  
**Backend:** Firebase Authentication + Cloud Firestore + Cloudinary Media CDN  

---

## 1. High-Level Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                                  USER / CLIENT BROWSER                            |
|                                                                                   |
|   +-----------------------------+           +---------------------------------+   |
|   |   Public Website Visitor    |           |   Authenticated Administrator   |   |
|   |  - Homepage & 3D Visualizer |           |  - /admin/login                 |   |
|   |  - Dynamic Project Gallery  |           |  - /admin (Dashboard Metrics)   |   |
|   |  - Live Event Popups        |           |  - /admin/projects (CRUD)       |   |
|   |  - Real Enquiry Submissions |           |  - /admin/enquiries (Pipeline)  |   |
|   +--------------+--------------+           |  - /admin/popups (Event Modals) |   |
|                  |                          |  - /admin/media (Cloudinary)    |   |
|                  |                          +----------------+----------------+   |
+------------------|-------------------------------------------|--------------------+
                   | (Public Queries / Submissions)            | (Admin Auth Token)
                   v                                           v
+-----------------------------------------------------------------------------------+
|                                 FIREBASE PLATFORM                                 |
|                                                                                   |
|   +---------------------------------------------------------------------------+   |
|   |                           Firebase Authentication                         |   |
|   |   - Secure Email & Password Admin Credentials                             |   |
|   |   - Browser Local Persistence (indexedDB)                                 |   |
|   |   - Strict Admin Verification via Role / Allowlist                        |   |
|   +---------------------------------------------------------------------------+   |
|                                      |                                            |
|                                      v                                            |
|   +---------------------------------------------------------------------------+   |
|   |                            Cloud Firestore                                |   |
|   |   Security Rules (`firestore.rules`):                                     |   |
|   |   - projects:  Public read (only if published == true). Admin write.      |   |
|   |   - services:  Public read. Admin write.                                  |   |
|   |   - popups:    Public read (only if active == true). Admin write.         |   |
|   |   - events:    Public read (only if published == true). Admin write.      |   |
|   |   - enquiries: Public CREATE ONLY (with strict payload rules).            |   |
|   |                Admin READ, UPDATE, DELETE ONLY.                           |   |
|   |   - settings:  Public read for approved site settings. Admin write.       |   |
|   |   - media:     Admin read & write only.                                   |   |
|   +---------------------------------------------------------------------------+   |
+-----------------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------------+
|                                CLOUDINARY MEDIA CDN                               |
|   - High performance image uploads, responsive transformations, AVIF/WebP         |
|   - Secure Direct Admin Upload via Cloudinary Unsigned Upload Preset OR           |
|     Vercel Serverless Signing Function (`/api/cloudinary-sign`)                   |
|   - Metadata saved into Firestore `media` collection                              |
+-----------------------------------------------------------------------------------+
```

---

## 2. Authentication & Admin Authorization Model

### A. Authentication Engine
- Built on Firebase Auth modular SDK: `signInWithEmailAndPassword`, `signOut`, `onAuthStateChanged`, `sendPasswordResetEmail`.
- Persistence: `browserLocalPersistence` ensures administrative logins survive browser tab reloads while preventing session leakage across unauthenticated users.

### B. Authorization & Least Privilege Principle
- **No Self-Registration:** Public registration is completely prohibited. The admin login route `/admin/login` only accepts credentials of pre-configured administrators.
- **Admin Role Verification:** To prevent any ordinary Firebase user from obtaining admin dashboard access, an explicit verification mechanism is enforced:
  1. Primary: Verified Administrator Email Allowlist configured via environment / Firestore admin collection (`admins/{uid}`).
  2. Fallback / Custom Claim: Firebase Auth Custom Claim `admin: true` where set via Firebase Admin SDK.
- **Route Guards:** The `<ProtectedRoute />` wrapper blocks unauthenticated and non-admin users, redirecting them to `/admin/login` with preserved redirection targets.

---

## 3. Image Storage: Cloudinary Strategy

### A. Why Cloudinary
- AK Global Solutions showcases rich architectural photography (high-res interiors, timber textures, floorplans, before/after renovation sliders).
- Cloudinary Free tier offers 25 monthly credits (approx. 25,000 transformations or 25 GB storage/bandwidth), perfectly suitable without requiring immediate Google Cloud Spark &rarr; Blaze billing upgrades.
- Automatic WebP/AVIF formatting and on-the-fly resizing (`c_fill,w_1200,q_auto,f_auto`).

### B. Safe Upload Architecture
- **Method 1 (Recommended & Zero Serverless Overhead):** Authenticated Admin Cloudinary Upload using an **Unsigned Preset** restricted by:
  - Allowed formats: `jpg`, `jpeg`, `png`, `webp`
  - Max file size: 10 MB
  - Dedicated folder: `ak_global_solutions/projects`, `ak_global_solutions/popups`
- **Method 2 (Serverless Signed Endpoint):** When deploying on Vercel, a lightweight serverless endpoint `/api/cloudinary-sign` can generate SHA-1/SHA-256 signatures using `CLOUDINARY_API_SECRET` stored strictly in Vercel environment variables, ensuring zero secret leakage to the browser.
- **Client Safety Guarantee:** Under no circumstances will `CLOUDINARY_API_SECRET` or Firebase Service Account private keys be exposed in Vite client code (`VITE_` prefix).

---

## 4. Firestore Query Efficiency & Caching

1. **Bounded Queries:** Public project queries request only published items using `query(collection(db, 'projects'), where('published', '==', true), orderBy('displayOrder', 'asc'), limit(20))`.
2. **Listener Lifecycle:** Any snapshot listeners (`onSnapshot`) are cleaned up when React components unmount, eliminating phantom reads.
3. **Graceful Fallbacks:** If Firebase environment variables are absent (e.g. during fresh developer cloning or offline testing), services automatically fall back to static local data (`PROJECTS_DATA`, `SERVICES_DATA`, `COMPANY_INFO`), ensuring zero site downtime.

