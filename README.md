# AK Global Solutions

> **Building Your Dreams, Brick by Brick!**  
> *Design. Build. Transform.*

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?logo=three.js&logoColor=white)](https://threejs.org/)

A minimalist, high-performance architectural frontend web application for **AK Global Solutions**, a premier real-estate, interior design, civil construction, and property transformation company located in **Sadarpur, Sec-45, Noida (UP), India**.

---

## 🌟 Overview & Key Features

- **Ambient Background Video Engine**: Full-screen, high-definition auto-playing architectural video background with custom playback vignettes for optimal text contrast.
- **Subtle 3D Layer Viewer**: Interactive Three.js / React Three Fiber layer visualizer ("From structure to space") allowing users to isolate structural layers (interior design, timber joinery, civil framing, plaster finishes).
- **Asymmetric Editorial Gallery**: Filterable project showcase displaying residential townhouses, commercial offices, and bespoke joinery commissions.
- **Before / After Transformation Slider**: Interactive split-screen slider demonstrating structural renovations and property renewal.
- **Persistent Floating WhatsApp Overlay**: One-click direct access to WhatsApp chat (`+91 95696 64741`).
- **100% Multi-Device Responsive**: Tailored layouts for ultra-mobile (320px–390px), tablet (768px), laptop (1024px), and ultra-wide screens (1440px+).
- **API Service Layer Ready**: Decoupled service facades (`projectService.js`, `enquiryService.js`, `serviceDataService.js`) designed for seamless REST API integration.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + PostCSS
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Lucide React
- **Routing**: React Router DOM v7

---

## 📍 Business & Contact Details

- **Company Name**: AK Global Solutions
- **Primary Category**: Real Estate & Interior Designer
- **Phone / WhatsApp**: [+91 95696 64741](tel:+919569664741)
- **Email**: [akglobalsolutions@gmail.com](mailto:akglobalsolutions@gmail.com)
- **Office Address**: Sadarpur, Sec-45, Noida, Uttar Pradesh, India

### Core Services
1. **Interior Designer & Architecture** (Spatial planning, 3D renderings, false ceilings)
2. **Construction Work & Civil Contractor** (Masonry, structural steel, foundation civil work)
3. **Wood Works, Modern Kitchen & Almirah** (Modular kitchens, fitted wardrobes, custom joinery)
4. **Painter, Micro-cement & Finishing** (Architectural spray paint, texture plasters, PU stain)
5. **Steel & Metal Fabrication** (MS/SS grills, gates, partition frames)
6. **Real Estate & Turnkey Property Overhaul**

---

## 📁 Project Structure

```
ak-global-solutions/
├── public/
│   └── logo.png               # Official AK Global Solutions logo asset & favicon
├── src/
│   ├── components/
│   │   ├── layout/            # Container, Navbar (with sticky scroll blur), Footer
│   │   ├── sections/          # Hero, IntroTrust, Services, Projects, BeforeAfter, Process, About, Contact
│   │   └── ui/                # Button, ProjectCard, ServiceRow, BeforeAfterSlider, WebGLFallback, WhatsAppFloatingButton
│   ├── data/                  # Company metadata, structured projects, services, process data
│   ├── pages/                 # HomePage, ProjectDetailPage (/projects/:id), NotFoundPage
│   ├── services/              # API facade layer (projectService, enquiryService, serviceDataService)
│   ├── styles/                # index.css (Tailwind v4 directives & architectural grid utilities)
│   ├── App.jsx                # App layout & routing
│   └── main.jsx               # Entrypoint
├── index.html                 # Main HTML template with favicon & font preconnects
├── tailwind.config.js         # Custom theme configuration
├── vite.config.js             # Vite build & @tailwindcss/vite plugin configuration
└── package.json               # Dependencies & build scripts
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- `npm` or `yarn`

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/shivuu17/AK-Global-Solutions.git

# Navigate to the project directory
cd AK-Global-Solutions

# Install dependencies
npm install
```

### 2. Running Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the live site.

### 3. Production Build
```bash
# Build production assets
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License

&copy; 2026 **AK Global Solutions**. All rights reserved. Sadarpur, Sec-45, Noida (UP).
