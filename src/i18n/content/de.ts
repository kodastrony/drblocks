import type { SiteContent } from "@/i18n/types";

export const de: SiteContent = {
  // ---------------------------------------------------------------------------
  // Chrome / shared UI strings
  // ---------------------------------------------------------------------------
  ui: {
    skipToContent: "Zum Inhalt springen",
    homeAria: "DrBlocks – Startseite",
    freeQuote: "Kostenloses Angebot",
    call: "Anrufen",
    contactCta: "Kontakt aufnehmen",
    readMore: "Mehr lesen",
    learnMore: "Mehr erfahren",
    backToBlog: "Zurück zum Ratgeber",
    backHome: "Startseite",
    seeOffer: "Zum Sortiment",
    offerOverview: "Sortimentübersicht",
    breadcrumbAria: "Breadcrumb-Navigation",
    breadcrumbHome: "Startseite",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    mobileNavAria: "Mobiles Menü",
    mainNavAria: "Hauptnavigation",
    langSwitchAria: "Sprache wechseln",
    footerTagline:
      "Verstellbare Fundamentblöcke für den Modulbau. Fundament an einem Tag – Millimetergenauigkeit garantiert.",
    footerContact: "Kontakt",
    footerInfo: "Informationen",
    footerCompany: "Über uns",
    privacyPolicy: "Datenschutzerklärung",
    rights: "Alle Rechte vorbehalten",
  },

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------
  nav: [
    {
      label: "Sortiment",
      href: "/oferta",
      children: [
        { label: "Standard Block", href: "/oferta/standard-block" },
        { label: "Standard Plus Block", href: "/oferta/standard-plus-block" },
      ],
    },
    { label: "So funktioniert es", href: "/#jak-to-dziala" },
    { label: "Partner werden", href: "/zostan-partnerem" },
    { label: "FAQ", href: "/faq" },
    { label: "Ratgeber", href: "/blog" },
  ],

  // ---------------------------------------------------------------------------
  // Hero section
  // ---------------------------------------------------------------------------
  hero: {
    eyebrow: "Verstellbare Fundamentblöcke",
    title: "Fundament an einem Tag.",
    titleAccent: "Auf den Millimeter genau.",
    subtitle:
      "Verstellbare Fundamentblöcke für den Modulbau – ohne Betonage, ohne wochenlange Wartezeiten. Nur ein stabiles, präzises Fundament.",
    primaryCta: { label: "Kostenloses Angebot", href: "/kontakt" },
    secondaryCta: { label: "Unsere Produkte", href: "/oferta" },
    youtubeId: "lpWBq72v3HA",
    videoLabel: "Produktvideo DrBlocks – verstellbarer Fundamentblock",
    badge: "Beton B30 · Stahl · Höhenverstellung",
    stats: [
      { value: "±1 mm", label: "Genauigkeit" },
      { value: "1000 kg", label: "Tragkraft" },
      { value: "1 Tag", label: "Montage" },
      { value: "0", label: "Nassarbeiten" },
    ],
  },

  // ---------------------------------------------------------------------------
  // Trust bar
  // ---------------------------------------------------------------------------
  trust: {
    heading: "Führende Unternehmen im Modulbau vertrauen uns",
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
    heading: "Das DrBlocks-System",
    body: "DrBlocks ist die moderne Schraubfundament-Alternative für den Modulbau. Jeder Block besteht aus einem Betonkörper der Klasse B30 sowie einem Stahlaufsatz mit Gewinderegulierung. So lässt sich die Gründungshöhe auf den Millimeter genau einstellen – ohne Betonage, ohne Nassarbeiten, ohne wochenlange Wartezeiten.",
    steps: [
      {
        no: "01",
        icon: "grid",
        title: "Positionieren",
        desc: "Die Blöcke werden im Stützraster unter der Konstruktion verteilt.",
      },
      {
        no: "02",
        icon: "level",
        title: "Nivellieren",
        desc: "Der Gewindefuß regelt die Höhe mit einer Genauigkeit von 1 mm.",
      },
      {
        no: "03",
        icon: "load",
        title: "Belasten",
        desc: "Das Modul wird aufgesetzt – Tragkraft bis 1 t pro Block (bis 5 t mit Verguss).",
      },
      {
        no: "04",
        icon: "check",
        title: "Fertig",
        desc: "Die Konstruktion ist noch am selben Tag für die weiteren Arbeiten bereit.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Benefits / Why us
  // ---------------------------------------------------------------------------
  benefits: {
    heading: "Warum DrBlocks wählen?",
    intro:
      "Unsere innovativen Fundamentblöcke wurden entwickelt, um eine solide und präzise Gründung zu gewährleisten – die Grundlage für Langlebigkeit und Standsicherheit von Modulbauten. Dank der Höhenverstellung eliminieren unsere Blöcke das Risiko ungenauer Setzung, das bei herkömmlichen Lösungen häufig unterschätzt wird.",
    items: [
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.35.15.png",
        title: "Schnelle Montage",
        desc: "Komplette Gründung an einem Tag statt wochenlanger Baustellenarbeit.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.37.21.png",
        title: "Genauigkeit bis 1 mm",
        desc: "Der Gewindefuß ermöglicht eine perfekte Nivellierung der Konstruktion.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.38.20.png",
        title: "Keine Nassarbeiten",
        desc: "Kein Beton, keine Schalung, keine Aushärtezeiten.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.36.26.png",
        title: "Hohe Tragkraft",
        desc: "Jeder Block trägt bis zu 1.000 kg ohne Verguss – mit Zementverguss sogar bis 5.000 kg.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.37.59.png",
        title: "Jederzeit rückbaubar",
        desc: "Die Blöcke lassen sich demontieren und erneut verwenden.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.36.53.png",
        title: "Bewährte Lösung",
        desc: "Wir arbeiten mit führenden Unternehmen im Modulbau zusammen.",
      },
    ],
    cta: "Kostenloses Angebot",
  },

  // ---------------------------------------------------------------------------
  // 3D viewer
  // ---------------------------------------------------------------------------
  viewer3d: {
    heading: "Block in 3D ansehen",
    body: "Erleben Sie das DrBlocks-System exakt so, wie es in der Realität aussieht, und überzeugen Sie sich selbst von der präzisen Höhenverstellung. Eine vollständige, interaktive Konstruktion – kein Produktfoto.",
    points: [
      "Aus jedem Winkel drehen und heranzoomen",
      "Verstellung 120–200 mm live erleben",
      "Betonkörper B30, Stahlfuß, 4× Gewindestäbe M16",
      "Standard / Plus umschalten und Magnetgreifer vergleichen",
    ],
    cta: "Kostenloses Angebot",
    loading: "3D-Modell wird geladen…",
    loadAria: "Interaktives 3D-Modell des Fundamentblocks laden",
    posterAlt: "Verstellbarer Fundamentblock DrBlocks Standard Block",
    badge: "3D-Modell",
    open: "In 3D ansehen",
    dragHint: "Ziehen zum Drehen · Scrollen zum Zoomen",
    closeAria: "3D-Modell schließen",
    closeTitle: "3D-Modell schließen (Ressourcen freigeben)",
    variant: "Variante",
    heightAdjust: "Höhenverstellung",
    heightAria: "Gründungshöhe in Millimetern",
    heightFrom: "120 mm",
    heightTo: "bis 200 mm (Verstellbereich 70 mm)",
    preview: "Vorschau",
    labels: "Beschriftungen",
    grout: "Zementverguss",
    groutTitle: "Frischer (nasser) Zementverguss im Spalt unter dem verstellbaren Fuß",
    annotations: {
      body: "Betonkörper B30",
      foot: "Verstellbarer Stahlfuß",
      bolts: "Gewindestäbe M16 (4×)",
      height: "Höhenverstellung",
      magnet: "Magnetgreifer",
      grout: "Zementverguss",
    },
  },

  // ---------------------------------------------------------------------------
  // Products
  // ---------------------------------------------------------------------------
  products: {
    heading: "Unsere Produkte",
    intro:
      "Zwei Varianten eines bewährten Systems – wir finden die passende Lösung für Ihr Projekt und Ihr Gelände.",
    compareCta: "Varianten vergleichen",
    list: [
      {
        slug: "standard-block",
        name: "Standard Block",
        short:
          "Verstellbarer Fundamentblock mit Höhenregulierung 120–200 mm. Die solide Basis für jede Konstruktion.",
        intro:
          "Der Standard Block ist ein solider, präziser und einfach zu montierender Betonblock für den Modulbau. Der Betonkörper der Klasse B30 und der Stahlaufsatz mit Gewinde ermöglichen eine millimetergenaue Höheneinstellung. So passen Sie das Fundament optimal an die Geländebedingungen an – ohne Betonage, ohne Nassarbeiten.",
        image: "/assets/STANDARD-983x1024-1.webp",
        specs: [
          { k: "Betonklasse", v: "B30 (gegossen, vibriert, bewehrt)" },
          {
            k: "Höhenverstellung",
            v: "120–200 mm (Verstellbereich 70 mm)",
            highlight: true,
          },
          { k: "Verstellgenauigkeit", v: "bis 1 mm", highlight: true },
          {
            k: "Tragkraft",
            v: "bis 1 t (ohne Verguss), bis 5 t (mit Zementverguss)",
            highlight: true,
          },
          {
            k: "Verstellfuß",
            v: "Verzinkter Stahl, 195 × 205 mm, Stärke 5 mm",
          },
          {
            k: "Gewindestäbe",
            v: "4× M16, Festigkeitsklasse 8.8, mit Unterlegscheiben und Sicherungsmuttern",
          },
          { k: "Aufsatzplatte", v: "Stahl 5 mm mit Isolierzwischenlage" },
        ],
        closer: {
          heading: "Fundament ohne Kompromisse",
          body: "Die solide Basis für Modulhäuser, Container, Pavillons und Terrassen. Kontaktieren Sie uns – wir wählen die passende Lösung aus und erstellen Ihr Angebot.",
          cta: "Kostenloses Angebot",
        },
        related: "standard-plus-block",
      },
      {
        slug: "standard-plus-block",
        name: "Standard Plus Block",
        badge: "Premium",
        short:
          "Mit Magnetgreifern für die Montage der Sockelverkleidung. Funktionalität und Ästhetik in einem.",
        intro:
          "Der Standard Plus Block ist die erweiterte Ausführung mit Magnetgreifern für die Montage der Sockelverkleidung – dem Abschlusselement, das den Spalt zwischen Modulgebäude und Boden schließt. Er vereint die volle Funktionalität des DrBlocks-Systems mit einer schnellen, präzisen und ansprechenden Ausführung.",
        image: "/assets/STANDARD-PLUS-1966x2048-1.webp",
        specs: [
          { k: "Betonklasse", v: "B30 (gegossen, vibriert, bewehrt)" },
          {
            k: "Höhenverstellung",
            v: "120–200 mm (Verstellbereich 70 mm)",
            highlight: true,
          },
          { k: "Verstellgenauigkeit", v: "bis 1 mm", highlight: true },
          {
            k: "Tragkraft",
            v: "bis 1 t (ohne Verguss), bis 5 t (mit Zementverguss)",
            highlight: true,
          },
          {
            k: "Verstellfuß",
            v: "Verzinkter Stahl, 195 × 205 mm, Stärke 5 mm",
          },
          {
            k: "Gewindestäbe",
            v: "4× M16, Festigkeitsklasse 8.8, mit Unterlegscheiben und Sicherungsmuttern",
          },
          { k: "Aufsatzplatte", v: "Stahl 5 mm mit Isolierzwischenlage" },
          {
            k: "Magnetgreifer",
            v: "Ja – für die Montage der Sockelverkleidung",
            highlight: true,
          },
        ],
        closer: {
          heading: "Mehr als ein Fundament – Verarbeitung auf höchstem Niveau",
          body: "Der Standard Plus Block ist die Wahl für Projekte, bei denen nicht nur Stabilität, sondern auch Ästhetik und perfekte Ausführung zählen. Die Magnethalter beschleunigen die Montage und beseitigen unnötige Komplikationen auf der Baustelle.",
          cta: "Premium-Lösung wählen",
        },
        related: "standard-block",
      },
    ],
    detail: {
      specsHeading: "Technische Daten",
      priceNote: "Preis auf Anfrage",
      priceNoteLink: "Mehr im FAQ",
      seeAlso: "Weitere Produkte",
      breadcrumbOffer: "Sortiment",
    },
    compare: {
      heading: "Variantenvergleich",
      paramHeader: "Parameter",
      yes: "Ja",
      no: "Nein",
      rows: [
        { k: "Betonkörper", standard: "B30", plus: "B30" },
        { k: "Höhenverstellung", standard: "120–200 mm", plus: "120–200 mm" },
        { k: "Verstellbereich", standard: "70 mm", plus: "70 mm" },
        { k: "Verstellgenauigkeit", standard: "1 mm", plus: "1 mm" },
        {
          k: "Tragkraft",
          standard: "bis 1 t (5 t mit Verguss)",
          plus: "bis 1 t (5 t mit Verguss)",
        },
        { k: "Magnetgreifer", standard: false, plus: true },
        { k: "Sockelverkleidung montierbar", standard: false, plus: true },
        { k: "Einsatzbereich", standard: "universell", plus: "Sockelausführung" },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // Experts CTA
  // ---------------------------------------------------------------------------
  experts: {
    heading: "Sprechen Sie mit unseren Experten",
    body: "Unsicher, welche Lösung für Sie passt? Wir helfen bei der Produktauswahl und erstellen Ihr individuelles Angebot.",
    cta: { label: "Kontakt aufnehmen", href: "/kontakt" },
  },

  // ---------------------------------------------------------------------------
  // About
  // ---------------------------------------------------------------------------
  about: {
    heading: "Solides Fundament für den Modulbau",
    mission:
      "Wir treiben den Modulbau voran, indem wir solide Fundamente liefern – im wörtlichen wie im übertragenen Sinne.",
    paragraphs: [
      "DrBlocks ist ein polnischer Hersteller innovativer Fundamentblöcke mit Höhenverstellung. Wir verbinden modernste Fertigungstechnologie mit jahrelanger Praxiserfahrung im Baugewerbe.",
      "Fundamente unter leichten Modulkonstruktionen werden häufig unterschätzt. Die Folge: ungleichmäßige Setzung, Probleme beim Öffnen von Fenstern und Türen sowie kostspielige Nachbesserungen.",
      "Deshalb haben wir ein System entwickelt, das eine präzise, stabile und dauerhafte Gründung ermöglicht – ohne Nassarbeiten, ohne wochenlange Wartezeiten, ohne Kompromisse.",
    ],
    images: ["/assets/grafika1.webp"],
    closerHeading: "Gemeinsam das richtige Fundament bauen",
    closerBody: "Nehmen Sie Kontakt auf – wir finden die passende Lösung und erstellen Ihr Angebot.",
  },

  // ---------------------------------------------------------------------------
  // FAQ
  // ---------------------------------------------------------------------------
  faq: {
    heading: "Häufig gestellte Fragen",
    lead: "Sie haben Fragen zu verstellbaren Fundamentblöcken? Hier finden Sie die wichtigsten Antworten auf einen Blick.",
    items: [
      {
        q: "Was sind verstellbare Fundamentblöcke und welche Vorteile bieten sie?",
        a: "Verstellbare Fundamentblöcke sind eine innovative Lösung für den Modulbau, die eine millimetergenaue Höhenregulierung des Fundaments ermöglicht. Sie passen die Gründung an das Gelände an, erhöhen die Standsicherheit der Konstruktion und erlauben eine leichte Zementverfüllung unter dem Gebäude.",
      },
      {
        q: "Was unterscheidet den Standard Block vom Standard Plus Block?",
        a: "Der Standard Block ist das Grundmodell mit Stahlaufsatz und einer Höhenverstellung von 120–200 mm (Verstellbereich bis 70 mm). Der Standard Plus Block verfügt zusätzlich über Magnetgreifer, die die Montage der Sockelverkleidung erleichtern. Dadurch ist die Ausführung des Bereichs zwischen Modulgebäude und Boden präziser und ansprechender.",
      },
      {
        q: "Welche Verankerungsmethoden gibt es für den Standard Blok L im Boden?",
        a: "Der Standard Blok L kann auf zwei Arten im Boden verankert werden: chemisch mit geeigneten Bindemitteln oder mechanisch mit tief eingeschlagenen Ankern. Beide Methoden gewährleisten eine dauerhafte und sichere Befestigung – besonders wichtig bei Gebäuden auf wechselhaftem Untergrund.",
      },
      {
        q: "Welche Vorteile bieten Magnetgreifer in Fundamentblöcken?",
        a: "Magnetgreifer ermöglichen eine präzise Montage der Sockelverkleidung. Sie sorgen für eine schnelle, stabile und optisch ansprechende Ausführung des Bereichs zwischen Modulgebäude und Boden und verbessern so den Schutz und die Haltbarkeit der Konstruktion.",
      },
      {
        q: "Warum ist eine solide Gründung beim Modulgebäude so wichtig?",
        a: "Eine fachgerechte Gründung verhindert ungleichmäßige Setzungen, die mit der Zeit zu Konstruktionsschäden führen. DrBlocks-Produkte gewährleisten eine präzise und stabile Positionierung und minimieren fundamentbedingte Probleme.",
      },
      {
        q: "Was unterscheidet einen normalen Betonblock von einem DrBlocks-Fundamentblock?",
        a: "DrBlocks-Blöcke bieten innovative Möglichkeiten mit deutlich mehr Flexibilität und Präzision. Standard-Modelle haben eine verstellbare Stahlplatte (Höhenverstellung 120–200 mm), während Plus-Varianten zusätzlich Magnetgreifer für eine bessere Anpassung an die Geländebedingungen mitbringen.",
      },
      {
        q: "Lohnt sich die Investition in DrBlocks-Blöcke?",
        a: "Absolut – als Alternative zu provisorischen Lösungen verhindern sie Holzschäden, mangelhafte Nivellierung sowie spätere Schwierigkeiten beim Betrieb von Türen und Fenstern oder Undichtigkeiten.",
      },
      {
        q: "Sind DrBlocks-Blöcke teuer?",
        a: "DrBlocks-Blöcke erscheinen auf den ersten Blick teurer als gewöhnliche Betonblöcke – im Verhältnis zum Gesamtinvestitionsvolumen sind sie jedoch nur ein kleiner Bruchteil der Gesamtkosten. Es handelt sich um eine einmalige Investition, die langfristige Stabilität und Dauerhaftigkeit der Gründung sichert und künftige Reparaturkosten senkt.",
      },
    ],
    noAnswerHeading: "Keine passende Antwort gefunden?",
    noAnswerBody:
      "Jedes Projekt ist einzigartig – wir beantworten Ihre Fragen gerne und helfen Ihnen, die beste Lösung zu finden.",
    noAnswerCta: "Kontakt aufnehmen",
  },

  // ---------------------------------------------------------------------------
  // Blog
  // ---------------------------------------------------------------------------
  blog: {
    heading: "Fundament-Ratgeber",
    lead: "Anleitungen, Vergleiche und praxisnahes Wissen zur Gründung von Modulgebäuden, Containern und Pavillons.",
    posts: [
      {
        slug: "tani-bloczek-vs-drblocks",
        title:
          "Billiger Fundamentblock als Unterbau für Pavillons? Eine scheinbare Ersparnis, die Sie mehr kosten kann als gedacht",
        date: "2025-04-17",
        excerpt:
          "Im Modulbau, wo Montagegeschwindigkeit, Mobilität und niedriger Preis zählen, entscheiden sich viele Bauherren für einen günstigen Block…",
      },
      {
        slug: "stopa-fundamentowa-to-najlepsze-rozwiazanie",
        title: "Ist das Streifenfundament wirklich die beste Lösung?",
        date: "2025-02-07",
        excerpt:
          "Die Wahl des richtigen Fundaments ist ein entscheidender Schritt bei jeder Bauinvestition. Jahrelang galt das Betonstreifenfundament als Standard, doch der technologische Fortschritt…",
      },
      {
        slug: "bloczek-betonowy-fundamentowy-versus-bloczek-betonowy-fundamentowy-od-dr-blocks",
        title:
          "Normaler Betonblock versus DrBlocks-Fundamentblock",
        date: "2024-08-13",
        excerpt:
          "Die Wahl der richtigen Baumaterialien ist entscheidend für die Haltbarkeit und Stabilität jeder Konstruktion. Fundamentblöcke gehören zu den wichtigsten Elementen…",
      },
      {
        slug: "po-co-stosuje-sie-bloczki-betonowe-fundamentowe-dlaczego-sa-tak-wazne",
        title:
          "Wozu werden Betonblöcke als Fundament eingesetzt? Warum sind sie so wichtig?",
        date: "2024-08-13",
        excerpt:
          "Das Fundament ist die Grundlage jeder dauerhaften Konstruktion. Erfahren Sie, welche Funktionen Betonblöcke übernehmen und warum sie für die Standsicherheit eines Gebäudes unverzichtbar sind…",
      },
    ],
    closerHeading: "Auf der Suche nach dem richtigen Fundament?",
    closerBody: "Wir helfen Ihnen bei der Lösungswahl und erstellen ein Angebot für Ihr Projekt.",
    closerCta: "Kostenloses Angebot",
  },

  // ---------------------------------------------------------------------------
  // Contact
  // ---------------------------------------------------------------------------
  contact: {
    heading: "Sprechen wir über Ihr Fundament",
    lead: "Schreiben Sie uns oder rufen Sie an – wir helfen bei der Produktauswahl, berechnen die Blockanzahl und erstellen ein maßgeschneidertes Angebot für Ihr Projekt.",
    dataHeading: "Kontaktdaten",
    phone: "Telefon",
    sales: "Vertrieb",
    general: "Allgemeiner Kontakt",
    instagram: "@drblocksforbuildings",
    form: {
      nameLabel: "Vor- und Nachname",
      namePlaceholder: "Max Mustermann",
      emailLabel: "E-Mail",
      emailPlaceholder: "max@firma.de",
      phoneLabel: "Telefon",
      phonePlaceholder: "+49 000 000 0000",
      messageLabel: "Nachricht",
      messagePlaceholder: "Beschreiben Sie Ihr Projekt: Objekttyp, Abmessungen, Zeitplan…",
      consent:
        "Ich stimme der Verarbeitung meiner personenbezogenen Daten durch {company} zur Bearbeitung meiner Anfrage gemäß der {policy} zu.",
      consentPolicy: "Datenschutzerklärung",
      submit: "Anfrage senden",
      submitting: "Wird gesendet…",
      replyNote: "Wir antworten in der Regel innerhalb von 24 Stunden an Werktagen.",
      successHeading: "Vielen Dank für Ihre Anfrage!",
      successBody:
        "Wir haben Ihre Nachricht erhalten und melden uns in der Regel innerhalb von 24 Stunden an Werktagen. Bei dringenden Anliegen erreichen Sie uns unter: {phone}.",
      errorBody:
        "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt: {phone}, {email}.",
      subjectPrefix: "Anfrage von DrBlocks-Website – {name}",
      errNameRequired: "Bitte geben Sie Ihren Namen an.",
      errEmail: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
      errMessage: "Bitte schildern Sie, womit wir Ihnen helfen können.",
      errConsent: "Bitte stimmen Sie der Kontaktaufnahme zu.",
      honeypot: "Dieses Feld nicht ausfüllen",
    },
  },

  // ---------------------------------------------------------------------------
  // Partner page
  // ---------------------------------------------------------------------------
  partner: {
    hero: {
      eyebrow: "Partnerprogramm",
      title: "Werden Sie DrBlocks-Partner",
      subtitle:
        "Wir bauen ein europaweites Partnernetzwerk auf und suchen Unternehmen, mit denen wir den Markt für moderne, verstellbare Fundamente gemeinsam gestalten. Schließen Sie sich den Herstellern und Bauunternehmen an, die uns bereits vertrauen.",
      primaryCta: "Partner werden",
      secondaryCta: "Mehr erfahren",
    },
    growth: {
      heading: "Eine Marke mit starkem Wachstum",
      paragraphs: [
        "DrBlocks ist ein polnischer Hersteller verstellbarer Fundamentblöcke und Pionier dieser Kategorie auf dem Markt. Der Modulbau wächst jährlich um mehrere bis zweistellige Prozentpunkte – und wir wachsen mit ihm: Wir erweitern unser Partnernetzwerk, unsere Produktion und unsere Reichweite.",
        "Wir arbeiten bereits mit führenden Herstellern von Modulhäusern, Pavillons und Containern zusammen. Jetzt öffnen wir unser Partnerprogramm, um gemeinsam weitere Bauherren in ganz Europa zu erreichen.",
      ],
      stats: [
        { value: "±1 mm", label: "Genauigkeit" },
        { value: "bis 5 t", label: "pro Stütze", muted: true },
        { value: "1 Tag", label: "Montage" },
        { value: "0", label: "Nassarbeiten" },
      ],
      cta: "Partner werden",
    },
    paths: {
      heading: "Zwei Kooperationswege",
      lead: "Ob Sie Gebäude herstellen oder Erdarbeiten ausführen – wir haben das passende Partnermodell für Sie.",
      cards: [
        {
          eyebrow: "Hersteller",
          title: "Für Hersteller von Modulgebäuden, Pavillons und Containern",
          points: [
            "Bieten Sie Ihren Kunden eine vollständige, moderne Gründung als Standard an",
            "Verstellbare DrBlocks-Blöcke verkürzen die Montage und steigern die Qualität Ihrer Projekte",
            "Empfohlenes Fundament in Ihrem Angebot – fertige Lösung für Module und Container",
            "Attraktive Konditionen und Lieferprioriät für Stammpartner",
            "Technische Unterstützung bei der Wahl von Rastermaß und Tragkraft",
            "Aufnahme in unsere Partnerkarte und gegenseitige Empfehlung",
          ],
        },
        {
          eyebrow: "Bauunternehmen",
          title: "Für Bauunternehmen im Bereich Erdarbeiten",
          points: [
            "Neue, rentable Dienstleistung: Montage verstellbarer Fundamente",
            "Minimaler Geräteaufwand, schnelle Umsetzung, keine Nassarbeiten",
            "Schulung und technische Unterstützung durch DrBlocks",
            "Stetiger Auftragsfluss aus unserem Herstellernetzwerk",
            "Attraktive Einkaufsbedingungen und Lieferpriorität",
            "Aufnahme in die Partnerkarte als empfohlener Auftragnehmer",
          ],
        },
      ],
    },
    benefits: {
      heading: "Was Sie als Partner gewinnen",
      lead: "Das DrBlocks-Partnerprogramm ist mehr als Vertrieb – es ist gemeinsames Wachstum.",
      items: [
        {
          title: "Attraktive Partnerkonditionen",
          desc: "Individuelle Rabatte und Preise je nach Kooperationsumfang sowie Priorität bei der Auftragsabwicklung.",
        },
        {
          title: "Treueprogramm",
          desc: "Je mehr Projekte, desto bessere Konditionen – treue Partner werden mit zusätzlichen Vorteilen belohnt.",
        },
        {
          title: "Marketing-Unterstützung",
          desc: "Aufnahme in die Partnerkarte, gegenseitige Empfehlungen und Vertriebsmaterialien.",
        },
      ],
    },
    map: {
      heading: "Unsere Partner auf der Karte",
      lead: "Das DrBlocks-Partnernetzwerk wächst. Hier sehen Sie die Unternehmen, die bereits mit uns zusammenarbeiten – langfristig soll die Karte Partner aus ganz Europa und darüber hinaus umfassen.",
      legendProducer: "Hersteller von Modulgebäuden",
      legendContractor: "Bauunternehmen (Erdarbeiten)",
      listHeading: "PARTNERLISTE",
      hint: "Scrollen zum Zoomen · Ziehen zum Verschieben",
      zoomIn: "Vergrößern",
      zoomOut: "Verkleinern",
      reset: "Ansicht zurücksetzen",
      categoryProducer: "Hersteller",
      categoryContractor: "Auftragnehmer",
    },
    form: {
      heading: "Partner werden",
      lead: "Füllen Sie das Formular aus – wir melden uns innerhalb von 24 Stunden an Werktagen.",
      companyLabel: "Firmenname",
      companyPlaceholder: "Musterfirma GmbH",
      emailLabel: "E-Mail-Adresse",
      emailPlaceholder: "kontakt@ihrefirma.de",
      locationLabel: "Standort (Stadt/Region)",
      locationPlaceholder: "z.B. München, Bayern",
      typeLabel: "Art der Partnerschaft",
      typeProducer: "Hersteller",
      typeContractor: "Bauunternehmen",
      messageLabel: "Nachricht (optional)",
      messagePlaceholder: "Beschreiben Sie Ihr Tätigkeitsprofil und Ihre Erwartungen…",
      consent:
        "Ich stimme der Verarbeitung meiner personenbezogenen Daten zur Bearbeitung meiner Partneranfrage gemäß der {policy} zu.",
      consentPolicy: "Datenschutzerklärung",
      submit: "Anfrage senden",
      submitting: "Wird gesendet…",
      successHeading: "Anfrage eingegangen!",
      successBody:
        "Vielen Dank für Ihr Interesse an unserem Partnerprogramm. Wir melden uns innerhalb von 24 Stunden an Werktagen.",
      errorBody:
        "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an kontakt@drblocks.pl.",
      subjectPrefix: "Partneranfrage DrBlocks – {company}",
      errCompany: "Bitte geben Sie den Firmennamen an.",
      errEmail: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
      errLocation: "Bitte geben Sie Ihren Standort an.",
      errConsent: "Bitte stimmen Sie der Datenverarbeitung zu.",
    },
  },

  // ---------------------------------------------------------------------------
  // Not found
  // ---------------------------------------------------------------------------
  notFound: {
    code: "404",
    title: "Diese Seite wurde nicht gefunden",
    body: "Die Seite wurde möglicherweise verschoben oder existiert nicht mehr. Gehen Sie zur Startseite oder schauen Sie sich unser Sortiment an.",
    home: "Startseite",
    offer: "Zum Sortiment",
  },

  // ---------------------------------------------------------------------------
  // Privacy policy
  // ---------------------------------------------------------------------------
  privacy: {
    title: "Datenschutzerklärung",
    updated: "Zuletzt aktualisiert: 2024",
    sections: [
      {
        h: "§1. Verantwortlicher",
        body: "Verantwortlicher für die Verarbeitung personenbezogener Daten ist Jimmyworld Jakub Stryjewski, NIP 9372592697, REGON 362105276 (nachfolgend „Verantwortlicher“). In datenschutzrechtlichen Angelegenheiten wenden Sie sich bitte an: kontakt@drblocks.pl.",
      },
      {
        h: "§2. Umfang und Zweck der Datenverarbeitung",
        body: "Personenbezogene Daten (Name, E-Mail-Adresse, Telefonnummer sowie Nachrichteninhalt) werden verarbeitet, um: Anfragen über das Kontaktformular oder per E-Mail zu bearbeiten, Angebote und Kostenvoranschläge vorzubereiten und zu übermitteln, einen etwaigen Vertrag abzuwickeln und in dessen Rahmen zu kommunizieren.",
      },
      {
        h: "§3. Rechtsgrundlage",
        body: "Die Daten werden verarbeitet auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen und Vertragserfüllung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse des Verantwortlichen an der Bearbeitung von Anfragen).",
      },
      {
        h: "§4. Speicherdauer",
        body: "Die Daten werden für die Dauer der Bearbeitung der Anfrage und Abwicklung des Vertrags gespeichert, anschließend für den gesetzlich vorgeschriebenen Zeitraum (u.a. steuerrechtliche Vorschriften), längstens 10 Jahre, bzw. bis zum Widerruf der Einwilligung.",
      },
      {
        h: "§5. Rechte der betroffenen Person",
        body: "Sie haben das Recht auf Auskunft über Ihre Daten, auf Berichtigung, Löschung oder Einschränkung der Verarbeitung, auf Datenübertragbarkeit, auf Widerspruch sowie auf jederzeitigen Widerruf Ihrer Einwilligung und auf Beschwerde bei der zuständigen Aufsichtsbehörde.",
      },
      {
        h: "§6. Cookies",
        body: "Diese Website verwendet Cookies: Sitzungscookies (werden beim Schließen des Browsers gelöscht), dauerhafte Cookies sowie Analyse-Cookies (zur anonymen Auswertung des Datenverkehrs). Sie können Cookies in den Einstellungen Ihres Browsers verwalten, blockieren oder löschen.",
      },
      {
        h: "§7. Kontakt",
        body: "Bei allen Fragen zur Verarbeitung personenbezogener Daten wenden Sie sich bitte an: kontakt@drblocks.pl, Tel. +48 506 057 727.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // SEO meta
  // ---------------------------------------------------------------------------
  meta: {
    home: {
      title: "Verstellbare Fundamentblöcke ohne Beton | DrBlocks",
      description:
        "Fundament an einem Tag – ohne Beton. Höhenverstellung 120–200 mm mit ±1 mm Genauigkeit und Tragkraft bis 5 t. Für Container, Modulhäuser und Terrassen.",
      keywords: ["verstellbare Fundamentblöcke", "Schraubfundament Alternative"],
    },
    oferta: {
      title: "Sortiment – Verstellbare Fundamentblöcke B30 | DrBlocks",
      description:
        "Standard und Standard Plus: Stahl-Beton-Fundament B30 mit Höhenverstellung 120–200 mm. Varianten, Tragkraft und Einsatz vergleichen. Kostenloses Angebot.",
      keywords: [
        "höhenverstellbarer Fundamentblock",
        "Punktfundament verstellbar",
      ],
    },
    "product-standard-block": {
      title: "Standard Block – Verstellbarer Fundamentblock | DrBlocks",
      description:
        "Fundamentblock mit Höhenverstellung 120–200 mm und ±1 mm Genauigkeit. Beton B30 und Stahlfuß, bis 1 t (5 t mit Verguss), Montage an einem einzigen Tag.",
      keywords: [
        "höhenverstellbares Punktfundament",
        "Gewindefundament",
      ],
    },
    "product-standard-plus-block": {
      title: "Standard Plus – Verstellbarer Block mit Greifer | DrBlocks",
      description:
        "Plus-Variante mit Magnetgreifer für die Sockelverkleidung. Höhenverstellung 120–200 mm mit ±1 mm, Tragkraft bis 5 t mit Zementverguss und ohne Nassarbeiten.",
      keywords: [
        "verstellbare Fundamentfüße",
        "Stützfundament verstellbar",
      ],
    },
    oNas: {
      title: "Über uns – Hersteller verstellbarer Fundamente | DrBlocks",
      description:
        "Lernen Sie DrBlocks kennen – den polnischen Hersteller verstellbarer Fundamentblöcke. Warum wir ein Stahl-Beton-Nivelliersystem für leichte Bauten entwickelten.",
      keywords: [
        "Hersteller verstellbare Fundamentblöcke",
        "Fundamentblock Hersteller",
      ],
    },
    partner: {
      title: "Partner werden – Programm für Hersteller | DrBlocks",
      description:
        "Werden Sie DrBlocks-Partner: für Modulhaus- und Pavillon-Hersteller sowie Erdbaufirmen. Attraktive Konditionen, Rabatte und technische Unterstützung inklusive.",
      keywords: [
        "Fundamentblock Vertriebspartner",
        "Schraubfundament Partner",
      ],
    },
    faq: {
      title: "FAQ – Verstellbare Fundamentblöcke erklärt | DrBlocks",
      description:
        "Antworten zu Tragkraft, Montage, Verankerung im Boden und Kosten. Welches Fundament für Modulhaus oder Container? Vorteile gegenüber dem Schraubfundament.",
      keywords: [
        "Fundament Modulhaus",
        "Fundament für Container",
      ],
    },
    blog: {
      title: "Ratgeber – Fundamente für das modulare Bauen | DrBlocks",
      description:
        "Ratgeber und Vergleiche zu Fundamenten für Container, Modulhäuser, Pavillons und Terrassen. Kosten, Montage ohne Aushub und Nassarbeiten sowie Auswahlhilfe.",
      keywords: ["Fundament ohne Beton", "Fundament ohne Buddeln"],
    },
    "post-tani-bloczek-vs-drblocks": {
      title: "Billiger Block vs DrBlocks – Scheinersparnis | DrBlocks",
      description:
        "Lohnt sich ein billiger Block unter dem Pavillon wirklich? Wir rechnen versteckte Setzungs- und Nachbesserungskosten gegen ein verstellbares DrBlocks-Fundament.",
      keywords: ["Fundament Pavillon", "Stelzlager Tragkraft"],
    },
    "post-stopa-fundamentowa-to-najlepsze-rozwiazanie": {
      title: "Ist das Streifenfundament wirklich am besten? | DrBlocks",
      description:
        "Betonfundament oder verstellbarer Stahlfuß für leichte Bauten? Wir vergleichen Montagezeit, Kosten und Nivelliergenauigkeit von ±1 mm – der Ratgeber.",
      keywords: [
        "Punktfundament verstellbar",
        "Stützfundament",
      ],
    },
    "post-bloczek-betonowy-fundamentowy-versus-bloczek-betonowy-fundamentowy-od-dr-blocks":
      {
        title: "Normaler Block vs DrBlocks-Block – Vergleich | DrBlocks",
        description:
          "Wie ein verstellbarer Stahl-Beton-Block den einfachen Mauerblock schlägt: Tragkraft, Höhenverstellung und Rückbau – ein vollständiger Vergleich.",
        keywords: [
          "höhenverstellbarer Fundamentblock",
          "Gewindefundament",
        ],
      },
    "post-po-co-stosuje-sie-bloczki-betonowe-fundamentowe-dlaczego-sa-tak-wazne":
      {
        title: "Wozu dienen Fundamentblöcke – und wann? | DrBlocks",
        description:
          "Welche Rolle ein Fundamentblock spielt und wann ein verstellbares System das Betonieren schlägt. Ein praktischer Ratgeber für Bauherren und Fachbetriebe.",
        keywords: [
          "wozu Fundamentblöcke",
          "Punktfundament verstellbar",
        ],
      },
    kontakt: {
      title: "Kontakt – kostenloses Fundament-Angebot | DrBlocks",
      description:
        "Kontaktieren Sie DrBlocks: Tel. +48 506 057 727 oder kontakt@drblocks.pl. Wir erstellen Ihr kostenloses Angebot für verstellbare Fundamentblöcke.",
      keywords: ["Kontakt DrBlocks", "Angebot Fundamentblöcke"],
    },
    privacy: {
      title: "Datenschutzerklärung und Cookies (DSGVO) | DrBlocks",
      description:
        "Datenschutzerklärung für drblocks.pl – Verarbeitung personenbezogener Daten nach DSGVO und Einsatz von Cookies: Verantwortlicher, Zwecke und Ihre Rechte.",
    },
  },
};
