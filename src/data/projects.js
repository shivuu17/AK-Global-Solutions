/**
 * Centralized Project Data Repository
 * Structured for future backend API integration (/api/projects)
 */

export const PROJECTS_DATA = [
  {
    id: "elysian-residence",
    title: "Elysian Private Residence",
    category: "Residential",
    location: "Kensington, London",
    year: "2025",
    clientType: "Private Homeowner",
    scope: "Full Renovation & Interior Architecture",
    area: "3,800 sq ft",
    tagline: "Minimalist concrete, warm oak timber, and tailored architectural lighting.",
    description: "A comprehensive transformation of a 4-story Victorian residence into a contemporary light-filled architectural sanctuary. AK Global Solutions executed all structural re-configurations, custom millwork, bespoke timber carpentry, and micro-cement wall finishes.",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      caption: "Living room structural opening and integrated timber joinery"
    },
    gallery: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Custom flush oak cabinetry & hidden storage solutions",
      "Monolithic micro-cement bathroom surfaces",
      "Structural floor plate extension & acoustic damping",
      "Architectural recessed linear lighting design"
    ],
    isFeatured: true,
    aspect: "large"
  },
  {
    id: "nordic-minimal-kitchen",
    title: "Minimalist Oak & Quartz Kitchen",
    category: "Carpentry",
    location: "Richmond, Surrey",
    year: "2025",
    clientType: "Residential Client",
    scope: "Bespoke Millwork & Interior Finishing",
    area: "650 sq ft",
    tagline: "Handcrafted smoked oak joinery paired with honed Calacatta quartz.",
    description: "Designed and crafted in-house by AK Global Solutions carpentry studio. Features hand-selected quarter-sawn white oak veneers, concealed magnetic push releases, integrated brass details, and seamlessly flush appliance integration.",
    coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
      after: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      caption: "Outdated enclosed kitchen transformed into an open architectural hub"
    },
    gallery: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Solid white oak structural island island framing",
      "Zero-handle push release soft-close joinery",
      "Durable natural oil matte finish",
      "Custom integrated spice & utensil drawer organizers"
    ],
    isFeatured: true,
    aspect: "small"
  },
  {
    id: "apex-design-studio",
    title: "Apex Architecture Workspace",
    category: "Commercial",
    location: "Soho, Central City",
    year: "2024",
    clientType: "Commercial Enterprise",
    scope: "Commercial Office Fit-Out & Acoustic Design",
    area: "5,400 sq ft",
    tagline: "Raw concrete industrial structure meets refined acoustic timber partition walls.",
    description: "A complete commercial transformation converting an old industrial warehouse floor into a flexible modern workplace. AK Global Solutions managed partition framing, HVAC integration, custom acoustic slatted timber ceilings, and high-durability epoxy flooring.",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      after: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      caption: "Dilapidated warehouse floor converted into a high-performance office"
    },
    gallery: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Custom slatted oak acoustic ceiling baffles",
      "Glazed modular partition walls with matte steel frames",
      "Commercial grade low-VOC matte paint application",
      "Integrated under-desk wire raceways and power hubs"
    ],
    isFeatured: true,
    aspect: "large"
  },
  {
    id: "stone-ash-bathroom",
    title: "Monolithic Stone & Ash Ensuite",
    category: "Interior",
    location: "Chelsea, London",
    year: "2024",
    clientType: "Private Client",
    scope: "Luxury Interior Design & Plumbing Re-fit",
    area: "280 sq ft",
    tagline: "Serene textural harmony featuring brushed gunmetal fixtures and terrazzo stone.",
    description: "A sanctuary-like bathroom space designed with precision spatial layout and executed with custom waterproof membranes, seamless stone tiling, and handcrafted floating ash vanity furniture.",
    coverImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      after: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      caption: "Dated tile layout renewed with monolithic micro-stone"
    },
    gallery: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Custom floating timber vanity with undermount basin",
      "Thermostatic concealed shower controls",
      "Architectural niche cove lighting",
      "Waterproof tanking system with 10-year warranty"
    ],
    isFeatured: true,
    aspect: "small"
  },
  {
    id: "horizon-penthouse",
    title: "Horizon Loft Transformation",
    category: "Renovation",
    location: "Docklands, London",
    year: "2025",
    clientType: "Private Property Investor",
    scope: "Full Structural Renovation & Finishing",
    area: "2,200 sq ft",
    tagline: "Open-plan living emphasizing floor-to-ceiling vistas and warm natural textures.",
    description: "Re-imagining a duplex loft apartment to maximize natural daylight and streamline circulation. Structural walls were removed and replaced with slim-profile steel posts, complemented by dark stain timber wall panels and custom steel library shelving.",
    coverImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      after: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      caption: "Cramped loft partitions opened up into high-ceiling living gallery"
    },
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Steel beam installation & space wall opening",
      "Custom dark walnut wall cladding",
      "Architectural spray painting finish",
      "Smart environment HVAC controls installation"
    ],
    isFeatured: false,
    aspect: "large"
  },
  {
    id: "bespoke-timber-library",
    title: "Wall-to-Wall Walnut Library",
    category: "Carpentry",
    location: "Hampstead, London",
    year: "2024",
    clientType: "Private Collector",
    scope: "Custom Furniture & Millwork",
    area: "420 sq ft",
    tagline: "Precision built-in joinery with integrated LED accent channels.",
    description: "Tailor-made floor-to-ceiling library wall featuring solid American Walnut edge details, secret door storage access, and dimmable micro LED strips built directly into shelf dado grooves.",
    coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      after: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      caption: "Empty study transformed into custom solid wood library"
    },
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "American Walnut construction with hardwax oil seal",
      "Concealed pivot door leading to private study",
      "Precision routed LED channels",
      "Adjustable shelf pin indexing system"
    ],
    isFeatured: false,
    aspect: "small"
  }
];
