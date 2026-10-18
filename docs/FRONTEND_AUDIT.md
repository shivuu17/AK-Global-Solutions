# Frontend Audit: AK Global Solutions

**Date:** 2026-10-18  
**Project:** AK Global Solutions  
**Framework:** React 19 + Vite 8 + Tailwind CSS v4 + React Router v7 + Three.js / R3F + GSAP  
**Hosting Target:** Vercel (Frontend) + Firebase (Backend & Firestore) / Cloudinary (Media)

---

## 1. Executive Summary

AK Global Solutions is an architectural design, civil contracting, real estate, and interior carpentry studio based in Sadarpur, Sec-45, Noida (UP). The existing codebase is built using a modern React 19 single-page application bundled with Vite.

The existing frontend is aesthetically crafted with high architectural rigor, featuring Three.js 3D model visualizers, Before/After interactive renovation sliders, GSAP hero entrance transitions, and mobile drawer navigation.

However, the website currently operates with hardcoded static data files (`src/data/projects.js`, `src/data/services.js`, `src/data/company.js`) and simulated mock services (`src/services/enquiryService.js`, `src/services/projectService.js`). The contact section and quote modal currently display "Enquiry Form Temporarily Paused".

This audit details the existing components, hardcoded data sources, dependencies, and the exact integration points required to transform AK Global Solutions into a full-stack, Firebase-backed web application with an Admin Panel, Cloudinary media management, enquiry tracker, and event pop-up creator.

---

## 2. Codebase & Dependency Audit

### Package Details (`package.json`)
- **React & DOM:** `^19.2.8`
- **Routing:** `react-router-dom ^7.18.4`
- **Styling:** `@tailwindcss/vite ^4.3.3`, `tailwindcss ^4.3.3`, `clsx`, `tailwind-merge`
- **Animation & 3D:** `three ^0.186.1`, `@react-three/fiber ^9.8.1`, `@react-three/drei ^10.7.9`, `gsap ^3.15.0`
- **Icons:** `lucide-react ^1.52.0`
- **Build & Lint:** `vite ^8.3.0`, `@vitejs/plugin-react ^6.1.1`, `oxlint ^1.81.0`
- **Backend SDK to Add:** `firebase ^11.x`

### Routing Analysis (`src/App.jsx`)
- `/` &rarr; `HomePage` (Hero, Intro/Trust, Services, Projects, Before/After, Process, Contact)
- `/projects/:id` &rarr; `ProjectDetailPage` (Hero image, Project metrics, Description, Before/After slider, Gallery, Related projects)
- `*` &rarr; `NotFoundPage`

**Proposed Admin Routes to Add:**
- `/admin/login` &rarr; Firebase email/password authentication
- `/admin` &rarr; Admin overview dashboard (metrics, enquiry pipeline, quick links)
- `/admin/projects` &rarr; Project CRUD (cover image, gallery, before/after, category, publish status, display order)
- `/admin/services` &rarr; Service CRUD (descriptions, scope bullets, model layers, status)
- `/admin/media` &rarr; Cloudinary media manager and asset library
- `/admin/popups` &rarr; Pop-up announcement & event modal creator with date scheduling and real-time preview
- `/admin/events` &rarr; Special events & workshop management
- `/admin/enquiries` &rarr; Real-time client enquiry management with status transitions and internal admin notes
- `/admin/settings` &rarr; Studio details, phone, email, address, social links, hero headline

---

## 3. Existing Data Structures & Dynamic Migration Targets

### A. Company Profile (`src/data/company.js`)
- **Current State:** Hardcoded object (`name`, `tagline`, `phone`, `email`, `location`, `address`, `socials`, `heroLabel`, `heroTitle`, `heroDesc`, `introHeadline`, `introDesc`).
- **Dynamic Plan:** Store in Firestore `settings/general`. Provide fallback to `COMPANY_INFO` so the website always renders seamlessly even before initial database seeding.

### B. Projects (`src/data/projects.js`)
- **Current State:** Array of 6 projects (`elysian-residence`, `nordic-minimal-kitchen`, `apex-design-studio`, `stone-ash-bathroom`, `horizon-penthouse`, `bespoke-timber-library`).
- **Data Shape:**
  - `id`: Unique slug/ID
  - `title`: String
  - `category`: String ("Residential", "Carpentry", "Commercial", "Interior", "Renovation")
  - `location`: String
  - `year`: String
  - `clientType`: String
  - `scope`: String
  - `area`: String
  - `tagline`: String
  - `description`: String
  - `coverImage`: URL (Unsplash)
  - `beforeAfter`: `{ before, after, caption }`
  - `gallery`: Array of URLs
  - `features`: Array of Strings
  - `isFeatured`: Boolean
  - `aspect`: "large" | "small"
- **Dynamic Plan:** Firestore collection `projects`. Enable CRUD, Cloudinary image upload, reordering, draft/published flags. Public queries only fetch published items ordered by `displayOrder` or `createdAt`. Fallback to `PROJECTS_DATA` if Firestore is offline or empty.

### C. Services (`src/data/services.js`)
- **Current State:** 5 services (`interior-design`, `wood-works-kitchen-almirah`, `civil-construction`, `painter-finishing-fabrication`, `real-estate-property-transformation`).
- **Data Shape:** `id`, `number`, `title`, `shortDesc`, `fullDesc`, `capabilities`, `image`, `modelLayer`.
- **Dynamic Plan:** Firestore collection `services`.

### D. Enquiries & Form Submissions (`ContactSection.jsx` & `DynamicModal.jsx`)
- **Current State:** Forms were replaced with static "Enquiry Form Temporarily Paused" cards directing users to phone / WhatsApp.
- **Dynamic Plan:** Rebuild high-conversion, architectural enquiry forms with:
  - Name, Phone, Email, Selected Service, Message, Estimated Timeline/Budget
  - Anti-spam honeypot & rate-limiting protection
  - Client-side validation + Firebase server timestamp
  - Direct Firestore insertion into `enquiries` collection
  - Instant admin notification tracking

### E. Event Pop-up Creator (`src/components/ui/EventPopup.jsx`)
- **Requirement:** New feature requested by user to display event popups / announcement banners on the main site.
- **Dynamic Plan:**
  - Collection `popups`: `title`, `message`, `image`, `ctaLabel`, `ctaUrl`, `active`, `startAt`, `endAt`, `priority`.
  - Frontend component checks active popups in Firestore within current date range, checks `sessionStorage` or `localStorage` to avoid annoying repeating popups, displays sleek architectural modal or banner with image and CTA.

---

## 4. UI/UX & Responsive Integrity Guidelines

1. **Architectural Design System:** Maintain existing color palette:
   - Charcoal / Black: `#111111`
   - Off-white canvas: `#F7F7F5`
   - Warm grey surface: `#EEEEEB`
   - Structural borders: `#D9D9D4`
   - Brand terracotta accent: `#D85B3F`
   - Typography: Font sans, font serif italic accents, monospace labels (`tracking-architectural`).
2. **Three.js & Canvas Safety:** Retain lazy loading with `WebGLFallback` in `ServicesSection.jsx`.
3. **No Breaking Changes:** The public site must never break or display blank screens if network or Firebase connectivity is interrupted; provide smart fallbacks.

