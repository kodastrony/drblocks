// The full content contract for one locale. Every user-facing string on the
// site lives here so that pl/en/de stay structurally identical and type-checked.

export type Spec = { k: string; v: string; highlight?: boolean };

export type Product = {
  slug: string;
  name: string;
  badge?: string;
  short: string;
  intro: string;
  image: string;
  specs: Spec[];
  closer: { heading: string; body: string; cta: string };
  related: string;
};

export type BlogPost = { slug: string; title: string; date: string; excerpt: string };

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type PartnerCategory = "producent" | "wykonawca";

export type Partner = {
  name: string;
  city: string;
  /** [latitude, longitude] in WGS84 degrees. */
  coords: [number, number];
  category: PartnerCategory;
};

/** Page-level SEO metadata, one entry per route key. */
export type Meta = { title: string; description: string; keywords?: string[] };

export type SiteContent = {
  /** Chrome / shared UI strings. */
  ui: {
    skipToContent: string;
    homeAria: string;
    freeQuote: string; // "Darmowa wycena"
    call: string; // "Zadzwoń"
    contactCta: string; // "Skontaktuj się"
    readMore: string; // "Czytaj więcej" / "Dowiedz się więcej"
    learnMore: string;
    backToBlog: string;
    backHome: string;
    seeOffer: string;
    offerOverview: string; // "Przegląd oferty"
    breadcrumbAria: string;
    breadcrumbHome: string; // "Strona główna"
    openMenu: string;
    closeMenu: string;
    mobileNavAria: string;
    mainNavAria: string;
    langSwitchAria: string;
    footerTagline: string;
    footerContact: string;
    footerInfo: string; // "Informacje"
    footerCompany: string; // "O firmie"
    privacyPolicy: string;
    rights: string; // "Wszelkie prawa zastrzeżone" (optional)
  };
  nav: NavItem[];
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    youtubeId: string;
    videoLabel: string;
    badge: string; // "Beton B30 · Stal · Regulacja wysokości"
    stats: { value: string; label: string }[];
  };
  trust: {
    heading: string;
    logos: { src: string; alt: string; w: number; h: number; scale: number; mx: number }[];
  };
  system: {
    heading: string;
    body: string;
    steps: { no: string; icon: string; title: string; desc: string }[];
  };
  benefits: {
    heading: string;
    intro: string;
    items: { img: string; title: string; desc: string }[];
    cta: string;
  };
  viewer3d: {
    heading: string;
    body: string;
    points: string[];
    cta: string;
    loading: string;
    loadAria: string;
    posterAlt: string;
    badge: string; // "Model 3D"
    open: string; // "Obejrzyj w 3D"
    dragHint: string; // "Przeciągnij, aby obrócić · scroll, aby przybliżyć"
    closeAria: string;
    closeTitle: string;
    variant: string;
    heightAdjust: string;
    heightAria: string;
    heightFrom: string; // "120 mm"
    heightTo: string; // "do 200 mm (zakres 70 mm)"
    preview: string;
    labels: string; // "Etykiety"
    grout: string; // "Podlewka cementowa"
    groutTitle: string;
    annotations: { body: string; foot: string; bolts: string; height: string; magnet: string; grout: string };
  };
  products: {
    heading: string;
    intro: string;
    compareCta: string;
    list: Product[];
    detail: {
      specsHeading: string;
      priceNote: string;
      priceNoteLink: string;
      seeAlso: string;
      breadcrumbOffer: string;
    };
    compare: {
      heading: string;
      paramHeader: string;
      yes: string;
      no: string;
      rows: { k: string; standard: string | boolean; plus: string | boolean }[];
    };
  };
  experts: { heading: string; body: string; cta: { label: string; href: string } };
  about: {
    heading: string;
    mission: string;
    paragraphs: string[];
    images: string[];
    closerHeading: string;
    closerBody: string;
  };
  faq: {
    heading: string;
    lead: string;
    items: { q: string; a: string }[];
    noAnswerHeading: string;
    noAnswerBody: string;
    noAnswerCta: string;
  };
  blog: {
    heading: string;
    lead: string;
    posts: BlogPost[];
    closerHeading: string;
    closerBody: string;
    closerCta: string;
  };
  contact: {
    heading: string;
    lead: string;
    dataHeading: string;
    phone: string;
    sales: string;
    general: string;
    instagram: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      consent: string; // contains {policy} token replaced with a link
      consentPolicy: string; // the link text
      submit: string;
      submitting: string;
      replyNote: string;
      successHeading: string;
      successBody: string; // contains {phone}
      errorBody: string; // contains {phone} {email}
      subjectPrefix: string; // "Zapytanie ze strony DrBlocks – {name}"
      errNameRequired: string;
      errEmail: string;
      errMessage: string;
      errConsent: string;
      honeypot: string;
    };
  };
  partner: {
    hero: { eyebrow: string; title: string; subtitle: string; primaryCta: string; secondaryCta: string };
    growth: {
      heading: string;
      paragraphs: string[];
      stats: { value: string; label: string; muted?: boolean }[];
      cta: string;
    };
    paths: {
      heading: string;
      lead: string;
      cards: { eyebrow: string; title: string; points: string[] }[];
    };
    benefits: { heading: string; lead: string; items: { title: string; desc: string }[] };
    map: {
      heading: string;
      lead: string;
      legendProducer: string;
      legendContractor: string;
      listHeading: string;
      hint: string;
      zoomIn: string;
      zoomOut: string;
      reset: string;
      categoryProducer: string;
      categoryContractor: string;
    };
    form: {
      heading: string;
      lead: string;
      companyLabel: string;
      companyPlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      locationLabel: string;
      locationPlaceholder: string;
      typeLabel: string;
      typeProducer: string;
      typeContractor: string;
      messageLabel: string;
      messagePlaceholder: string;
      consent: string;
      consentPolicy: string;
      submit: string;
      submitting: string;
      successHeading: string;
      successBody: string;
      errorBody: string;
      subjectPrefix: string;
      errCompany: string;
      errEmail: string;
      errLocation: string;
      errConsent: string;
    };
  };
  notFound: { code: string; title: string; body: string; home: string; offer: string };
  privacy: { title: string; updated: string; sections: { h: string; body: string }[] };
  /** Per-route SEO. Keys: home, oferta, product-<slug>, oNas, partner, faq, blog, post-<slug>, kontakt, privacy. */
  meta: Record<string, Meta>;
};
