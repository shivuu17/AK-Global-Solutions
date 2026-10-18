# Step-by-Step Implementation Plan: Firebase & Admin Panel Migration

**Project:** AK Global Solutions  
**Status:** In Progress  

---

## Phases & Deliverables Checklist

### Phase 1: Foundation & Firebase SDK Setup
- [x] Audit existing frontend components, routing, and hardcoded data (`docs/FRONTEND_AUDIT.md`).
- [x] Document Cloud Firestore schema & Firebase architecture (`docs/FIREBASE_ARCHITECTURE.md`, `docs/FIRESTORE_SCHEMA.md`).
- [x] Install `firebase` modular JavaScript SDK into `package.json`.
- [ ] Create centralized Firebase configuration at `src/lib/firebase.js`.
- [ ] Create `.env.example` with Vite environment variables (`VITE_FIREBASE_*`, `VITE_CLOUDINARY_*`).
- [ ] Implement `firestore.rules` and `firestore.indexes.json` with production least-privilege security.

### Phase 2: Centralized Service Layer
- [ ] `src/services/authService.js`: Email/password login, logout, observer, admin verification.
- [ ] `src/services/projectService.js`: Dynamic Firestore fetch with fallback to `PROJECTS_DATA`, CRUD operations for admin.
- [ ] `src/services/serviceDataService.js`: Dynamic Firestore fetch with fallback to `SERVICES_DATA`, CRUD operations for admin.
- [ ] `src/services/enquiryService.js`: High-security Firestore submission (`enquiries` collection), admin query/filter/update/delete.
- [ ] `src/services/popupService.js`: Fetch active event popups by date and priority, admin CRUD.
- [ ] `src/services/settingsService.js`: Singleton fetch/update for studio settings.
- [ ] `src/services/mediaService.js`: Cloudinary upload handler (unsigned preset / signed endpoint) & metadata persistence.

### Phase 3: Admin Panel Frontend
- [ ] Auth context & protected route guard (`src/context/AuthContext.jsx`, `src/components/admin/ProtectedRoute.jsx`).
- [ ] Admin layout with sidebar navigation, stats header, and architectural styling (`src/components/admin/AdminLayout.jsx`).
- [ ] Admin pages:
  - `src/pages/admin/AdminLoginPage.jsx` (Clean, secure email/password login).
  - `src/pages/admin/AdminDashboardPage.jsx` (Overview metrics: total enquiries, new leads, projects count, quick actions).
  - `src/pages/admin/AdminProjectsPage.jsx` (Project list, editor modal/form, cover image uploader, gallery manager, before/after config).
  - `src/pages/admin/AdminServicesPage.jsx` (Service editor, deliverables checklist, 3D model layer mapping).
  - `src/pages/admin/AdminEnquiriesPage.jsx` (Enquiry pipeline, status badges `new`, `contacted`, `qualified`, `converted`, `closed`, internal notes modal).
  - `src/pages/admin/AdminPopupsPage.jsx` (Event pop-up creator, live visual preview, date picker, priority, active toggle).
  - `src/pages/admin/AdminMediaPage.jsx` (Cloudinary asset upload, copy URL, image gallery).
  - `src/pages/admin/AdminSettingsPage.jsx` (Manage studio contact numbers, address, email, social links).

### Phase 4: Public Site Dynamic Enhancement
- [ ] Activate real dynamic inquiry form in `ContactSection.jsx` with instant Firestore submission, honeypot spam protection, loading state, and success alert.
- [ ] Activate real dynamic inquiry form in `DynamicModal.jsx` ("Get a Quote" modal).
- [ ] Add `EventPopup.jsx` to `App.jsx`: listens for active popups from Firestore, checks scheduling, displays sleek architectural announcement with CTA, supports "Do not show again for today".
- [ ] Connect `ProjectsSection.jsx` and `ProjectDetailPage.jsx` to live Firestore project updates while preserving 3D canvas and animations.

### Phase 5: Verification & Production Build
- [ ] Run `npm run build` to verify zero compile or TypeScript/linting errors.
- [ ] Verify route guarding against unauthenticated access.
- [ ] Verify fallback behavior when Firebase config is unset or offline.
- [ ] Provide deployment instructions for Firebase and Vercel.

