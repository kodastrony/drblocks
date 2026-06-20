import type { SiteContent } from "@/i18n/types";

export const en: SiteContent = {
  // ---------------------------------------------------------------------------
  // Chrome / shared UI strings
  // ---------------------------------------------------------------------------
  ui: {
    skipToContent: "Skip to content",
    homeAria: "DrBlocks – home page",
    freeQuote: "Free Quote",
    call: "Call Us",
    contactCta: "Get in Touch",
    readMore: "Read More",
    learnMore: "Learn More",
    backToBlog: "Back to Blog",
    backHome: "Home",
    seeOffer: "View Products",
    offerOverview: "Product Overview",
    breadcrumbAria: "Breadcrumb navigation",
    breadcrumbHome: "Home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mobileNavAria: "Mobile navigation",
    mainNavAria: "Main navigation",
    langSwitchAria: "Change language",
    footerTagline:
      "Adjustable foundation blocks for modular construction. Foundation in one day, precision to the millimetre.",
    footerContact: "Contact",
    footerInfo: "Information",
    footerCompany: "About Us",
    privacyPolicy: "Privacy Policy",
    rights: "All rights reserved",
  },

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------
  nav: [
    {
      label: "Products",
      href: "/oferta",
      children: [
        { label: "Standard Block", href: "/oferta/standard-block" },
        { label: "Standard Plus Block", href: "/oferta/standard-plus-block" },
      ],
    },
    { label: "How It Works", href: "/#jak-to-dziala" },
    { label: "Become a Partner", href: "/zostan-partnerem" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
  ],

  // ---------------------------------------------------------------------------
  // Hero section
  // ---------------------------------------------------------------------------
  hero: {
    eyebrow: "Adjustable Foundation Blocks",
    title: "Foundation in one day.",
    titleAccent: "Precision to the millimetre.",
    subtitle:
      "Adjustable foundation blocks for modular construction. No concrete pour, no weeks of waiting — just a stable, precisely levelled foundation.",
    primaryCta: { label: "Get a Free Quote", href: "/kontakt" },
    secondaryCta: { label: "Our Products", href: "/oferta" },
    youtubeId: "lpWBq72v3HA",
    videoLabel: "DrBlocks product video – adjustable foundation block",
    badge: "B30 Concrete · Steel · Height Adjustment",
    stats: [
      { value: "±1 mm", label: "Precision" },
      { value: "1,000 kg", label: "Load Capacity" },
      { value: "1 Day", label: "Installation" },
      { value: "0", label: "Wet Trades" },
    ],
  },

  // ---------------------------------------------------------------------------
  // Trust bar
  // ---------------------------------------------------------------------------
  trust: {
    heading: "Trusted by leaders in modular construction",
    logos: [
      { src: "/assets/global-containers-1024x195-1.png", alt: "Global Home Containers", w: 480, h: 91, scale: 0.6, mx: 0.02 },
      { src: "/assets/JR.png", alt: "JR Modular Systems", w: 480, h: 125, scale: 0.72, mx: 0.71 },
      { src: "/assets/Komato.png", alt: "Komato Kontenery", w: 480, h: 125, scale: 1.12, mx: 0.9 },
      { src: "/assets/Cont4you.png", alt: "CONT4YOU", w: 480, h: 125, scale: 0.92, mx: 1.09 },
      { src: "/assets/art-pawilony.png", alt: "art pawilony", w: 480, h: 125, scale: 0.97, mx: 1.01 },
      { src: "/assets/syrek-1.png", alt: "Syrek", w: 480, h: 125, scale: 0.95, mx: 1.57 },
      { src: "/assets/NoviPawilony-1.png", alt: "Novi Pawilony", w: 480, h: 125, scale: 1.32, mx: 1.56 },
    ],
  },

  // ---------------------------------------------------------------------------
  // System / How it works
  // ---------------------------------------------------------------------------
  system: {
    heading: "The DrBlocks System",
    body: "The DrBlocks system is a modern alternative to traditional concrete foundations, engineered specifically for modular construction. Each block consists of a B30-grade concrete body and a steel cap with a threaded adjustment spindle. This lets you set the exact bearing height with ±1 mm accuracy — no pour, no wet trades, no weeks of curing.",
    steps: [
      {
        no: "01",
        icon: "grid",
        title: "Position",
        desc: "Place the blocks in a support grid beneath the structure.",
      },
      {
        no: "02",
        icon: "level",
        title: "Level",
        desc: "The threaded foot adjusts height with ±1 mm precision.",
      },
      {
        no: "03",
        icon: "load",
        title: "Load",
        desc: "Set your module in place — up to 1 t per block (up to 5 t with cement grout).",
      },
      {
        no: "04",
        icon: "check",
        title: "Done",
        desc: "The structure is ready for the next phase — on the same day.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Benefits / Why us
  // ---------------------------------------------------------------------------
  benefits: {
    heading: "Why choose DrBlocks?",
    intro:
      "Our adjustable foundation blocks were built to deliver the precise, stable bearing that modular structures demand for long-term performance. By enabling fine height adjustment, our blocks eliminate the uneven settling that traditional foundations so often leave unchecked.",
    items: [
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.35.15.png",
        title: "Fast installation",
        desc: "Complete foundation bearing in one day instead of weeks on site.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.37.21.png",
        title: "±1 mm precision",
        desc: "The threaded foot lets you level any structure perfectly.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.38.20.png",
        title: "No wet trades",
        desc: "Forget concrete, formwork and curing times.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.36.26.png",
        title: "High load capacity",
        desc: "Each block carries up to 1,000 kg without grout and up to 5,000 kg with cement grout.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.37.59.png",
        title: "Fully removable and reusable",
        desc: "Blocks can be dismantled and used again on another project.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.36.53.png",
        title: "Proven in the field",
        desc: "Used by leading manufacturers in the modular construction industry.",
      },
    ],
    cta: "Get a Free Quote",
  },

  // ---------------------------------------------------------------------------
  // 3D viewer
  // ---------------------------------------------------------------------------
  viewer3d: {
    heading: "See the block in 3D",
    body: "Explore the DrBlocks system exactly as it looks in real life and see the precision height adjustment in action. A fully interactive model — not a photograph.",
    points: [
      "Rotate and zoom from any angle",
      "Watch live height adjustment from 120 to 200 mm",
      "B30 body, steel foot, 4× M16 threaded rods",
      "Switch between Standard and Plus, and compare the magnetic grabber",
    ],
    cta: "Get a Free Quote",
    loading: "Loading 3D model…",
    loadAria: "Load the interactive 3D block model",
    posterAlt: "DrBlocks Standard Block – adjustable foundation block",
    badge: "3D Model",
    open: "View in 3D",
    dragHint: "Drag to rotate · scroll to zoom",
    closeAria: "Close 3D model",
    closeTitle: "Close 3D model (frees resources)",
    variant: "Variant",
    heightAdjust: "Height adjustment",
    heightAria: "Bearing height in millimetres",
    heightFrom: "120 mm",
    heightTo: "up to 200 mm (70 mm range)",
    preview: "Preview",
    labels: "Labels",
    grout: "Cement grout",
    groutTitle: "Fresh (wet) cement grout in the gap beneath the adjustable foot",
    annotations: {
      body: "B30 concrete body",
      foot: "Steel adjustment foot",
      bolts: "M16 bolts (4×)",
      height: "Height adjustment",
      magnet: "Magnetic grabber",
      grout: "Cement grout",
    },
  },

  // ---------------------------------------------------------------------------
  // Products
  // ---------------------------------------------------------------------------
  products: {
    heading: "Our products",
    intro:
      "Two variants of one proven system — we'll help you choose the right one for your project and site conditions.",
    compareCta: "Compare variants",
    list: [
      {
        slug: "standard-block",
        name: "Standard Block",
        short:
          "The core adjustable foundation block with 120–200 mm height adjustment. A solid base for any structure.",
        intro:
          "Standard Block is a robust, precise and easy-to-install concrete foundation block engineered for modular construction. A B30-grade concrete body paired with a steel cap and threaded adjustment spindle allows the bearing height to be set with ±1 mm accuracy. It adapts perfectly to uneven terrain — no concrete pour, no wet trades.",
        image: "/assets/STANDARD-983x1024-1.webp",
        specs: [
          { k: "Concrete grade", v: "B30 (poured, vibrated, reinforced)" },
          {
            k: "Height adjustment",
            v: "120–200 mm (70 mm range)",
            highlight: true,
          },
          { k: "Adjustment precision", v: "±1 mm", highlight: true },
          {
            k: "Load capacity",
            v: "up to 1 t (without grout) / up to 5 t (with cement grout)",
            highlight: true,
          },
          {
            k: "Adjustment foot",
            v: "Galvanised steel, 195 × 205 mm, 5 mm thick",
          },
          {
            k: "Threaded rods",
            v: "4× M16, grade 8.8, with washers and self-locking nuts",
          },
          { k: "Cap plate", v: "5 mm steel with thermal break insert" },
        ],
        closer: {
          heading: "Build a foundation without compromise",
          body: "The solid bearing solution for modular homes, container buildings, pavilions and decks. Get in touch and we'll recommend the right setup and prepare a quote.",
          cta: "Get a Free Quote",
        },
        related: "standard-plus-block",
      },
      {
        slug: "standard-plus-block",
        name: "Standard Plus Block",
        badge: "Premium",
        short:
          "With magnetic grabbers for skirting panel installation. Function and finish in one product.",
        intro:
          "Standard Plus Block is the advanced version of our foundation block, featuring magnetic grabbers for attaching the skirting panel — the finishing element that closes the gap between a modular building and the ground. It combines the full capability of the DrBlocks system with fast, precise and aesthetically clean finishing.",
        image: "/assets/STANDARD-PLUS-1966x2048-1.webp",
        specs: [
          { k: "Concrete grade", v: "B30 (poured, vibrated, reinforced)" },
          {
            k: "Height adjustment",
            v: "120–200 mm (70 mm range)",
            highlight: true,
          },
          { k: "Adjustment precision", v: "±1 mm", highlight: true },
          {
            k: "Load capacity",
            v: "up to 1 t (without grout) / up to 5 t (with cement grout)",
            highlight: true,
          },
          {
            k: "Adjustment foot",
            v: "Galvanised steel, 195 × 205 mm, 5 mm thick",
          },
          {
            k: "Threaded rods",
            v: "4× M16, grade 8.8, with washers and self-locking nuts",
          },
          { k: "Cap plate", v: "5 mm steel with thermal break insert" },
          {
            k: "Magnetic grabbers",
            v: "Yes — for skirting panel attachment",
            highlight: true,
          },
        ],
        closer: {
          heading: "More than a foundation — premium finish included",
          body: "Standard Plus Block is the right choice when stability and a flawless aesthetic finish both matter. The magnetic mounts speed up installation and eliminate unnecessary complications on site.",
          cta: "Choose the Premium solution",
        },
        related: "standard-block",
      },
    ],
    detail: {
      specsHeading: "Technical specifications",
      priceNote: "Price on request",
      priceNoteLink: "More in FAQ",
      seeAlso: "See also",
      breadcrumbOffer: "Products",
    },
    compare: {
      heading: "Compare variants",
      paramHeader: "Parameter",
      yes: "Yes",
      no: "No",
      rows: [
        { k: "Concrete body", standard: "B30", plus: "B30" },
        { k: "Height adjustment", standard: "120–200 mm", plus: "120–200 mm" },
        { k: "Adjustment range", standard: "70 mm", plus: "70 mm" },
        { k: "Adjustment precision", standard: "1 mm", plus: "1 mm" },
        {
          k: "Load capacity",
          standard: "up to 1 t (5 t with grout)",
          plus: "up to 1 t (5 t with grout)",
        },
        { k: "Magnetic grabbers", standard: false, plus: true },
        { k: "Skirting panel attachment", standard: false, plus: true },
        { k: "Intended use", standard: "universal", plus: "skirting finish" },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // Experts CTA
  // ---------------------------------------------------------------------------
  experts: {
    heading: "Talk to our experts",
    body: "Not sure which solution fits your project? We'll help you choose the right product and prepare a quote.",
    cta: { label: "Get in Touch", href: "/kontakt" },
  },

  // ---------------------------------------------------------------------------
  // About
  // ---------------------------------------------------------------------------
  about: {
    heading: "A solid foundation for modular construction",
    mission:
      "We support the growth of modular construction by delivering solid foundations — literally and figuratively.",
    paragraphs: [
      "DrBlocks is a Polish manufacturer of innovative adjustable foundation blocks. We combine modern production technology with hands-on experience in the construction industry.",
      "Foundations under lightweight modular structures are too often treated as an afterthought. The result is uneven settlement, sticking windows and doors, and costly remedial work.",
      "That's why we built a system that delivers precise, stable and durable bearing — without wet trades, without weeks of waiting, without compromise.",
    ],
    images: ["/assets/grafika1.webp"],
    closerHeading: "Let's build a solid foundation together",
    closerBody: "Contact us — we'll recommend the right solution and prepare a quote.",
  },

  // ---------------------------------------------------------------------------
  // FAQ
  // ---------------------------------------------------------------------------
  faq: {
    heading: "Frequently asked questions",
    lead: "Questions about adjustable foundation blocks? We've gathered the most important answers in one place.",
    items: [
      {
        q: "What are adjustable foundation blocks and what are their benefits?",
        a: "Adjustable foundation blocks are an innovative solution for modular construction that allows the bearing height to be set with millimetre accuracy. They adapt to uneven terrain, increase structural stability and allow a light cement grout to be injected beneath the building.",
      },
      {
        q: "What is the difference between Standard Block and Standard Plus Block?",
        a: "Standard Block is the core model with a steel cap that adjusts the bearing height across a 120–200 mm range (70 mm of travel). Standard Plus Block adds magnetic grabbers that make fitting the skirting panel faster and easier — giving a more precise and aesthetically refined finish to the gap between the building and the ground.",
      },
      {
        q: "What anchoring methods are available for the Standard Block L in the ground?",
        a: "Standard Block L can be anchored in two ways: chemically, using appropriate bonding agents, or mechanically, using deeply driven anchors. Both methods provide a secure, permanent connection — particularly important when bearing on variable ground conditions.",
      },
      {
        q: "What are the advantages of magnetic grabbers in foundation blocks?",
        a: "Magnetic grabbers make fitting the skirting panel fast, stable and visually clean. They enable quick and precise finishing of the gap between the modular building and the ground, improving both protection and the long-term durability of the structure.",
      },
      {
        q: "Why is correct foundation bearing so important for modular buildings?",
        a: "Proper bearing prevents uneven settlement, which over time causes structural damage. DrBlocks products deliver a precise, stable setup that minimises foundation-related problems from day one.",
      },
      {
        q: "How do DrBlocks blocks differ from ordinary concrete foundation blocks?",
        a: "DrBlocks blocks offer far greater flexibility and precision. Standard models include an adjustable steel plate with a 120–200 mm height range, while Plus variants add magnetic grabbers for a better-fitting finish on any terrain.",
      },
      {
        q: "Is investing in DrBlocks blocks worth it?",
        a: "Absolutely — as an alternative to makeshift solutions they prevent timber decay, uneven levelling and the problems that follow: sticking doors and windows, air leaks and expensive repairs further down the line.",
      },
      {
        q: "Are DrBlocks blocks expensive?",
        a: "DrBlocks blocks may look more expensive at first glance compared to standard concrete blocks, but relative to the total investment they represent only a tiny fraction of overall costs. It's a one-time purchase that delivers long-term stability and durability, reducing future repair bills.",
      },
    ],
    noAnswerHeading: "Didn't find your answer?",
    noAnswerBody:
      "Every project is different — we're happy to answer your questions and help you find the best solution.",
    noAnswerCta: "Get in Touch",
  },

  // ---------------------------------------------------------------------------
  // Blog
  // ---------------------------------------------------------------------------
  blog: {
    heading: "Foundation knowledge",
    lead: "Guides, comparisons and practical insight on foundation bearing for modular buildings, container structures and pavilions.",
    posts: [
      {
        slug: "tani-bloczek-vs-drblocks",
        title:
          "Cheap foundation blocks under a pavilion? The false economy that could cost you far more than you think",
        date: "2025-04-17",
        excerpt:
          "In the world of modular construction — where speed, mobility and low cost rule — many buyers reach for the cheapest block on the market…",
      },
      {
        slug: "stopa-fundamentowa-to-najlepsze-rozwiazanie",
        title: "Is a concrete footing really the best solution?",
        date: "2025-02-07",
        excerpt:
          "Choosing the right foundation is one of the most critical decisions in any construction project. Poured concrete has been the standard for years, but advances in technology…",
      },
      {
        slug: "bloczek-betonowy-fundamentowy-versus-bloczek-betonowy-fundamentowy-od-dr-blocks",
        title:
          "Standard concrete foundation block vs Dr. Blocks foundation block",
        date: "2024-08-13",
        excerpt:
          "The choice of building materials is decisive for the durability and stability of any structure. Among the most important foundation components are concrete blocks…",
      },
      {
        slug: "po-co-stosuje-sie-bloczki-betonowe-fundamentowe-dlaczego-sa-tak-wazne",
        title:
          "Why use concrete foundation blocks? And why do they matter so much?",
        date: "2024-08-13",
        excerpt:
          "Foundations are the bedrock of every lasting structure. Discover the role concrete foundation blocks play and why they are so critical to building stability…",
      },
    ],
    closerHeading: "Thinking about your foundation?",
    closerBody: "We'll help you choose the right solution and prepare a quote for your project.",
    closerCta: "Get a Free Quote",
  },

  // ---------------------------------------------------------------------------
  // Contact
  // ---------------------------------------------------------------------------
  contact: {
    heading: "Let's talk about your foundation",
    lead: "Write or call — we'll help you choose the right product, calculate the number of blocks you need and prepare a quote tailored to your project.",
    dataHeading: "Contact details",
    phone: "Phone",
    sales: "Sales",
    general: "General enquiries",
    instagram: "@drblocksforbuildings",
    form: {
      nameLabel: "Full name",
      namePlaceholder: "John Smith",
      emailLabel: "Email",
      emailPlaceholder: "john@company.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+48 600 000 000",
      messageLabel: "Message",
      messagePlaceholder: "Describe your project: structure type, dimensions, timeline…",
      consent:
        "I agree to the processing of my personal data by {company} for the purpose of handling this enquiry, in accordance with the {policy}.",
      consentPolicy: "privacy policy",
      submit: "Send enquiry",
      submitting: "Sending…",
      replyNote: "We typically reply within 24 hours on business days.",
      successHeading: "Thank you for your enquiry!",
      successBody:
        "We've received your message and will get back to you within 24 business hours. For urgent matters, call: {phone}.",
      errorBody:
        "Your message could not be sent. Please try again or contact us directly: {phone}, {email}.",
      subjectPrefix: "Enquiry from DrBlocks website – {name}",
      errNameRequired: "Please enter your full name.",
      errEmail: "Please enter a valid email address.",
      errMessage: "Please tell us how we can help.",
      errConsent: "Please tick the consent box to proceed.",
      honeypot: "Do not fill in this field",
    },
  },

  // ---------------------------------------------------------------------------
  // Partner page
  // ---------------------------------------------------------------------------
  partner: {
    hero: {
      eyebrow: "Partner Programme",
      title: "Become a DrBlocks partner",
      subtitle:
        "We're building a Europe-wide partner network and looking for companies to grow the market for modern adjustable foundations together. Join the manufacturers and contractors who already work with us.",
      primaryCta: "Become a partner",
      secondaryCta: "Learn More",
    },
    growth: {
      heading: "A brand that's growing fast",
      paragraphs: [
        "DrBlocks is a Polish manufacturer of adjustable foundation blocks and one of the pioneers of this category. Modular construction is growing at several per cent per year, and we're growing with it — expanding our partner network, production capacity and reach.",
        "We already work with leading manufacturers of modular homes, pavilions and container buildings. We're now opening our partner programme to reach more investors across Poland and Europe together.",
      ],
      stats: [
        { value: "±1 mm", label: "Precision" },
        { value: "up to 5 t", label: "Load capacity (grouted)" },
        { value: "1 Day", label: "Installation" },
        { value: "0", label: "Wet trades" },
      ],
      cta: "Become a partner",
    },
    paths: {
      heading: "Two partnership paths",
      lead: "Whether you manufacture buildings or carry out groundworks — we have a partnership model to match.",
      cards: [
        {
          eyebrow: "Manufacturers",
          title: "For manufacturers of modular buildings, pavilions and container structures",
          points: [
            "Offer your clients a complete, modern foundation as standard",
            "DrBlocks adjustable blocks cut installation time and raise the quality of your projects",
            "A recommended foundation solution in your portfolio — ready to go under modules and containers",
            "Attractive pricing and delivery priority for regular partners",
            "Technical support for block spacing and load calculations",
            "Listing on our partner map and mutual referrals",
          ],
        },
        {
          eyebrow: "Contractors",
          title: "For construction companies specialising in groundworks",
          points: [
            "A new, profitable service: installing adjustable foundations",
            "Minimal equipment, fast turnaround, no wet trades",
            "DrBlocks training and technical support",
            "A steady stream of leads from our manufacturer network",
            "Attractive purchasing terms and delivery priority",
            "Listing on the partner map as a recommended installer",
          ],
        },
      ],
    },
    benefits: {
      heading: "What you gain as a partner",
      lead: "The DrBlocks partner programme is more than a sales arrangement — it's a shared growth journey.",
      items: [
        {
          title: "Attractive partner terms",
          desc: "Individual discounts and pricing based on the scale of cooperation, plus priority order fulfilment.",
        },
        {
          title: "Loyalty programme",
          desc: "The more projects you complete, the better the terms — we reward our most active partners with additional benefits.",
        },
        {
          title: "Marketing support",
          desc: "Listing on our partner map, mutual referrals and sales support materials.",
        },
      ],
    },
    map: {
      heading: "Our partners on the map",
      lead: "The DrBlocks partner network is growing. Below are the companies already working with us — the map will eventually cover partners across Europe and beyond.",
      legendProducer: "Modular building manufacturer",
      legendContractor: "Construction company (groundworks)",
      listHeading: "PARTNER LIST",
      hint: "Scroll to zoom · drag to pan",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      reset: "Reset view",
      categoryProducer: "Manufacturer",
      categoryContractor: "Contractor",
    },
    form: {
      heading: "Become a partner",
      lead: "Fill in the form — we'll get back to you within 24 hours on business days.",
      companyLabel: "Company name",
      companyPlaceholder: "Your Company Ltd.",
      emailLabel: "Email address",
      emailPlaceholder: "contact@yourcompany.com",
      locationLabel: "Location (city / region)",
      locationPlaceholder: "e.g. Warsaw, Masovian Voivodeship",
      typeLabel: "Partnership type",
      typeProducer: "Manufacturer",
      typeContractor: "Construction company",
      messageLabel: "Message (optional)",
      messagePlaceholder: "Describe your business and what you're looking for…",
      consent:
        "I agree to the processing of my personal data for the purpose of handling this partner application, in accordance with the {policy}.",
      consentPolicy: "privacy policy",
      submit: "Submit application",
      submitting: "Sending…",
      successHeading: "Application received!",
      successBody:
        "Thank you for your interest in the partner programme. We'll get back to you within 24 hours on business days.",
      errorBody:
        "Your application could not be sent. Please try again or write directly to kontakt@drblocks.pl.",
      subjectPrefix: "DrBlocks partner application – {company}",
      errCompany: "Please enter your company name.",
      errEmail: "Please enter a valid email address.",
      errLocation: "Please enter your location.",
      errConsent: "Please tick the data processing consent box.",
    },
  },

  // ---------------------------------------------------------------------------
  // Not found
  // ---------------------------------------------------------------------------
  notFound: {
    code: "404",
    title: "We couldn't find this page",
    body: "The page may have been moved or no longer exists. Go back to the home page or browse our products.",
    home: "Home",
    offer: "View products",
  },

  // ---------------------------------------------------------------------------
  // Privacy policy
  // ---------------------------------------------------------------------------
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: 2024",
    sections: [
      {
        h: "§1. Data Controller",
        body: "The data controller is Jimmyworld Jakub Stryjewski, NIP 9372592697, REGON 362105276 (hereinafter 'the Controller'). For all matters relating to personal data protection, please contact us at kontakt@drblocks.pl.",
      },
      {
        h: "§2. Scope and Purpose of Processing",
        body: "Personal data (name, email address, phone number and message content) are processed for the following purposes: handling enquiries submitted via the contact form or by email, preparing and presenting offers and quotes, and performing any resulting contract and related communications.",
      },
      {
        h: "§3. Legal Basis",
        body: "Data are processed on the basis of Art. 6(1)(a) GDPR (consent), Art. 6(1)(b) GDPR (steps taken prior to entering into a contract and its performance), and Art. 6(1)(f) GDPR (the Controller's legitimate interest in handling enquiries).",
      },
      {
        h: "§4. Retention Period",
        body: "Data are retained for as long as necessary to handle the enquiry and perform the contract, and thereafter for the period required by applicable law (including tax law), but no longer than 10 years, or until consent is withdrawn.",
      },
      {
        h: "§5. Rights of the Data Subject",
        body: "You have the right to access your data, rectify it, erase it or restrict its processing, the right to data portability, the right to object, the right to withdraw consent at any time and the right to lodge a complaint with the President of the Personal Data Protection Office.",
      },
      {
        h: "§6. Cookies",
        body: "This site uses cookies: session cookies (deleted when the browser is closed), persistent cookies and analytical cookies (used for anonymous traffic analysis). You can manage cookies in your browser settings, including blocking or deleting them.",
      },
      {
        h: "§7. Contact",
        body: "For all matters relating to personal data processing, please contact us at: kontakt@drblocks.pl, tel. +48 506 057 727.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // SEO meta
  // ---------------------------------------------------------------------------
  meta: {
    home: {
      title: "Adjustable Foundation Blocks – Footing in a Day | DrBlocks",
      description:
        "Foundation in one day — no concrete, no digging. 120–200 mm adjustment with ±1 mm precision and up to 5 t load. For containers, modular homes and decks.",
      keywords: ["adjustable foundation blocks", "screw pile alternative"],
    },
    oferta: {
      title: "Adjustable Foundation Blocks B30 – Range | DrBlocks",
      description:
        "Standard and Standard Plus: B30 concrete and steel screw-thread footing with 120–200 mm adjustment. Compare load ratings and applications. Get a free quote.",
      keywords: [
        "adjustable foundation blocks",
        "adjustable pier block price",
      ],
    },
    "product-standard-block": {
      title: "Standard Block – Adjustable Foundation Block | DrBlocks",
      description:
        "Height-adjustable foundation block: 120–200 mm with ±1 mm precision, B30 body and steel foot. Up to 1 t (5 t grouted), installed in a single day.",
      keywords: [
        "height-adjustable foundation block",
        "threaded foundation block",
      ],
    },
    "product-standard-plus-block": {
      title: "Standard Plus – Adjustable Block with Grabber | DrBlocks",
      description:
        "Standard Plus with a magnetic grabber for skirting finish. 120–200 mm adjustment with ±1 mm precision, up to 5 t load with cement grout and no wet trades.",
      keywords: [
        "adjustable pier blocks with magnetic grabber",
        "modular home foundation block",
      ],
    },
    oNas: {
      title: "About Us – Adjustable Foundation Block Maker | DrBlocks",
      description:
        "Meet DrBlocks — the Polish manufacturer of adjustable foundation blocks. Why we built a steel-and-concrete levelling system for light modular structures.",
      keywords: [
        "adjustable foundation block manufacturer",
        "modular foundation manufacturer",
      ],
    },
    partner: {
      title: "Become a Partner – Programme for Manufacturers | DrBlocks",
      description:
        "Join the DrBlocks partner network: for modular building and pavilion manufacturers and groundwork contractors. Discounts, leads and technical support.",
      keywords: [
        "foundation block distributor",
        "modular foundation partner programme",
      ],
    },
    faq: {
      title: "FAQ – Adjustable Foundation Blocks Explained | DrBlocks",
      description:
        "Answers on load capacity, installation, ground anchoring and price. Best foundation for a modular home or container? How it compares to screw piles and piers.",
      keywords: [
        "foundation for modular building",
        "container foundation blocks",
      ],
    },
    blog: {
      title: "Blog – Foundations for Modular Construction | DrBlocks",
      description:
        "Guides and comparisons on foundations for containers, modular homes, pavilions and decks. Costs, no-dig installation and choosing the right solution for you.",
      keywords: ["foundation without concrete", "one-day foundation installation"],
    },
    "post-tani-bloczek-vs-drblocks": {
      title: "Cheap Blocks vs DrBlocks – False Economy | DrBlocks",
      description:
        "Do cheap pier blocks under a pavilion really pay off? We price the hidden cost of settling and remedial work against an adjustable DrBlocks foundation.",
      keywords: ["cheap foundation pier blocks", "pavilion foundation"],
    },
    "post-stopa-fundamentowa-to-najlepsze-rozwiazanie": {
      title: "Is a Concrete Footing Really the Best Choice? | DrBlocks",
      description:
        "Poured footing or an adjustable steel foot for a light structure? We compare installation time, cost and ±1 mm levelling precision — a complete guide.",
      keywords: [
        "adjustable foundation pier",
        "foundation alternatives to concrete",
      ],
    },
    "post-bloczek-betonowy-fundamentowy-versus-bloczek-betonowy-fundamentowy-od-dr-blocks":
      {
        title: "Standard Block vs DrBlocks Block – Compared | DrBlocks",
        description:
          "How an adjustable steel-and-concrete block outperforms a plain masonry block: load capacity, height adjustment and removability — a full comparison.",
        keywords: [
          "precast concrete adjustable footing",
          "adjustable foundation blocks",
        ],
      },
    "post-po-co-stosuje-sie-bloczki-betonowe-fundamentowe-dlaczego-sa-tak-wazne":
      {
        title: "Why Use Foundation Blocks, and When Exactly? | DrBlocks",
        description:
          "What a foundation block does and when an adjustable system beats the traditional poured approach. A practical guide for builders and investors alike.",
        keywords: [
          "what are foundation blocks for",
          "point foundation types",
        ],
      },
    kontakt: {
      title: "Contact – Free Adjustable Foundation Quote | DrBlocks",
      description:
        "Contact DrBlocks: tel. +48 506 057 727 or kontakt@drblocks.pl. We will prepare a free quote for adjustable foundation blocks tailored to your project.",
      keywords: ["contact drblocks", "adjustable foundation block quote"],
    },
    privacy: {
      title: "Privacy Policy and Cookie Notice (GDPR) | DrBlocks",
      description:
        "Privacy policy for drblocks.pl — how we process personal data under GDPR and use cookies: the data controller, the purposes and your rights as a user.",
    },
  },
};
