# Cloud Firestore Database Schema

**Project:** AK Global Solutions  
**Database:** Cloud Firestore  
**Mode:** Production  

---

## 1. Collections Overview

| Collection | Description | Read Access | Write Access |
|---|---|---|---|
| `projects` | Architectural & interior project portfolio | Public (published only) | Verified Admin only |
| `services` | Studio capabilities & craft offerings | Public | Verified Admin only |
| `popups` | Promotional event modals & banner announcements | Public (active & within date) | Verified Admin only |
| `events` | Exhibitions, workshops & site visit events | Public (published only) | Verified Admin only |
| `enquiries` | Client lead submissions & quote requests | Admin only | Public CREATE only |
| `settings` | Studio contact info, social links, SEO, hero | Public (approved fields) | Verified Admin only |
| `media` | Cloudinary asset library metadata | Admin only | Verified Admin only |
| `admins` | Verified administrator allowlist & roles | Admin only | System / Root Admin |

---

## 2. Collection Schemas in Detail

### A. Collection: `projects`
**Document ID:** Auto-generated ID or kebab-cased slug (e.g. `elysian-residence`)

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | String | Yes | Unique project identifier/slug |
| `title` | String | Yes | Project title (e.g., "Elysian Private Residence") |
| `slug` | String | Yes | URL slug |
| `category` | String | Yes | "Residential", "Commercial", "Renovation", "Interior", "Carpentry" |
| `location` | String | Yes | e.g. "Kensington, London" or "Sector 45, Noida" |
| `year` | String | Yes | Completion year (e.g. "2025") |
| `clientType` | String | No | e.g. "Private Homeowner" |
| `scope` | String | Yes | Scope of work summary |
| `area` | String | No | e.g. "3,800 sq ft" |
| `tagline` | String | Yes | Short poetic architectural description |
| `description` | String | Yes | Detailed project overview and craftsmanship breakdown |
| `coverImage` | String (URL) | Yes | Cloudinary or optimized image URL |
| `beforeAfter` | Map | No | `{ before: URL, after: URL, caption: String }` |
| `gallery` | Array<String> | No | List of gallery image URLs |
| `features` | Array<String> | No | Key craft highlights (bullet points) |
| `isFeatured` | Boolean | Yes | Flag for homepage spotlight (defaults to `false`) |
| `aspect` | String | No | "large" or "small" (for editorial asymmetric grid) |
| `status` | String | Yes | "published" or "draft" |
| `displayOrder` | Number | Yes | Integer sorting index |
| `createdAt` | Timestamp | Yes | Creation timestamp |
| `updatedAt` | Timestamp | Yes | Last modified timestamp |

---

### B. Collection: `services`
**Document ID:** Slug (e.g. `interior-design`)

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | String | Yes | Service identifier |
| `number` | String | Yes | Architectural index (e.g. "01") |
| `title` | String | Yes | e.g. "Interior Design & Architecture" |
| `slug` | String | Yes | URL slug |
| `shortDesc` | String | Yes | One-sentence summary |
| `fullDesc` | String | Yes | In-depth description |
| `capabilities` | Array<String> | Yes | List of deliverables / deliverables bullet points |
| `image` | String (URL) | Yes | Service representation photo |
| `modelLayer` | String | Yes | 3D model layer hook ("interior", "carpentry", "renovation", "painting", "complete") |
| `displayOrder` | Number | Yes | Sort position |
| `status` | String | Yes | "published" or "draft" |
| `createdAt` | Timestamp | Yes | Timestamp |
| `updatedAt` | Timestamp | Yes | Timestamp |

---

### C. Collection: `popups` (Event Pop-up Creator)
**Document ID:** Auto-generated ID

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | String | Yes | Pop-up headline (e.g. "Special Site Consultation Week") |
| `subtitle` | String | No | Secondary badge/text |
| `message` | String | Yes | Body content text |
| `image` | String (URL) | No | Optional graphic / banner image from Cloudinary |
| `ctaLabel` | String | Yes | e.g. "Book Consultation" or "Claim Offer" |
| `ctaUrl` | String | Yes | e.g. "#contact" or external link |
| `active` | Boolean | Yes | Master switch toggle |
| `startAt` | Timestamp / String | Yes | ISO string or timestamp when popup starts |
| `endAt` | Timestamp / String | Yes | ISO string or timestamp when popup expires |
| `priority` | Number | Yes | Sorting weight if multiple popups active |
| `dismissKey` | String | Yes | LocalStorage key identifier to prevent repetitive popups |
| `createdAt` | Timestamp | Yes | Creation timestamp |
| `updatedAt` | Timestamp | Yes | Last updated timestamp |

---

### D. Collection: `enquiries`
**Document ID:** Auto-generated ID

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Client's full name (max 100 chars) |
| `phone` | String | Yes | Client's contact phone number (10-15 chars) |
| `email` | String | Yes | Client's email address |
| `service` | String | No | Selected service interest |
| `message` | String | Yes | Project details / inquiry description (max 2000 chars) |
| `sourcePage` | String | Yes | Page or modal where submitted (e.g. "HomePage:ContactSection") |
| `status` | String | Yes | "new" \| "contacted" \| "qualified" \| "converted" \| "closed" |
| `adminNotes` | String | No | Private internal notes entered by admin team |
| `createdAt` | Timestamp | Yes | Firestore `serverTimestamp()` |
| `updatedAt` | Timestamp | Yes | Last update timestamp |

---

### E. Collection: `settings`
**Document ID:** `general` (singleton)

| Field | Type | Description |
|---|---|---|
| `name` | String | Business name ("AK Global Solutions") |
| `tagline` | String | "Building Your Dreams, Brick by Brick!" |
| `phone` | String | "+91-9569664741" |
| `displayPhone` | String | "+91 95696 64741" |
| `email` | String | "akglobalsolutions@gmail.com" |
| `location` | String | "Sadarpur, Sec-45, Noida (UP)" |
| `address` | String | Full physical studio address |
| `heroTitle` | String | Homepage hero title |
| `heroDesc` | String | Homepage hero subtext |
| `socials` | Array<Map> | `[{ name: 'WhatsApp', url: '...' }]` |
| `logoUrl` | String | Public logo path |

---

### F. Collection: `media`
**Document ID:** Auto-generated ID

| Field | Type | Description |
|---|---|---|
| `url` | String | Secure HTTPS Cloudinary URL |
| `publicId` | String | Cloudinary public identifier |
| `format` | String | e.g. "webp", "jpg" |
| `width` | Number | Image width in px |
| `height` | Number | Image height in px |
| `bytes` | Number | File size in bytes |
| `alt` | String | Accessible description |
| `category` | String | "project", "popup", "service", "general" |
| `createdAt` | Timestamp | Upload timestamp |
| `createdBy` | String | Admin UID |

