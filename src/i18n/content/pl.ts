import type { SiteContent } from "@/i18n/types";

export const pl: SiteContent = {
  // ---------------------------------------------------------------------------
  // Chrome / shared UI strings
  // ---------------------------------------------------------------------------
  ui: {
    skipToContent: "Przejdź do treści",
    homeAria: "DrBlocks – strona główna",
    freeQuote: "Darmowa wycena",
    call: "Zadzwoń",
    contactCta: "Skontaktuj się",
    readMore: "Czytaj więcej",
    learnMore: "Dowiedz się więcej",
    backToBlog: "Wróć do bloga",
    backHome: "Strona główna",
    seeOffer: "Zobacz ofertę",
    offerOverview: "Przegląd oferty",
    breadcrumbAria: "Nawigacja okruszkowa",
    breadcrumbHome: "Strona główna",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    mobileNavAria: "Menu mobilne",
    mainNavAria: "Główna nawigacja",
    langSwitchAria: "Zmień język",
    footerTagline:
      "Regulowane bloczki fundamentowe dla budownictwa modułowego. Fundament w jeden dzień, precyzja do milimetra.",
    footerContact: "Kontakt",
    footerInfo: "Informacje",
    footerCompany: "O firmie",
    privacyPolicy: "Polityka prywatności",
    rights: "Wszelkie prawa zastrzeżone",
  },

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------
  nav: [
    {
      label: "Oferta",
      href: "/oferta",
      children: [
        { label: "Standard Block", href: "/oferta/standard-block" },
        { label: "Standard Plus Block", href: "/oferta/standard-plus-block" },
      ],
    },
    { label: "Jak to działa", href: "/#jak-to-dziala" },
    { label: "Zostań partnerem", href: "/zostan-partnerem" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
  ],

  // ---------------------------------------------------------------------------
  // Hero section
  // ---------------------------------------------------------------------------
  hero: {
    eyebrow: "Regulowane bloczki fundamentowe",
    title: "Fundament w jeden dzień.",
    titleAccent: "Precyzja do milimetra.",
    subtitle:
      "Regulowane bloczki fundamentowe dla budownictwa modułowego. Bez wylewki betonowej, bez tygodni oczekiwania – tylko stabilne, precyzyjne posadowienie.",
    primaryCta: { label: "Darmowa wycena", href: "/kontakt" },
    secondaryCta: { label: "Nasze produkty", href: "/oferta" },
    youtubeId: "lpWBq72v3HA",
    videoLabel: "Film produktowy DrBlocks – regulowany bloczek fundamentowy",
    badge: "Beton B30 · Stal · Regulacja wysokości",
    stats: [
      { value: "±1 mm", label: "Precyzja" },
      { value: "1000 kg", label: "Nośność" },
      { value: "1 dzień", label: "Montaż" },
      { value: "0", label: "Prac mokrych" },
    ],
  },

  // ---------------------------------------------------------------------------
  // Trust bar
  // ---------------------------------------------------------------------------
  trust: {
    heading: "Zaufali nam liderzy budownictwa modułowego",
    logos: [
      {
        src: "/assets/global-containers-1024x195-1.png",
        alt: "Global Home Containers",
        w: 480,
        h: 91,
        scale: 0.86,
        pad: 0.95,
      },
      { src: "/assets/JR.png", alt: "JR Modular Systems", w: 480, h: 125, scale: 0.92, pad: 1 },
      {
        src: "/assets/Komato.png",
        alt: "Komato Kontenery",
        w: 480,
        h: 125,
        scale: 1.08,
        pad: 0.95,
      },
      { src: "/assets/Cont4you.png", alt: "CONT4YOU", w: 480, h: 125, scale: 1.04, pad: 0.9 },
      {
        src: "/assets/art-pawilony.png",
        alt: "art pawilony",
        w: 480,
        h: 125,
        scale: 1.32,
        pad: 0.85,
      },
      { src: "/assets/syrek-1.png", alt: "Syrek", w: 480, h: 125, scale: 1.16, pad: 0.9 },
      {
        src: "/assets/NoviPawilony-1.png",
        alt: "Novi Pawilony",
        w: 480,
        h: 125,
        scale: 1.28,
        pad: 0.9,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // System / How it works
  // ---------------------------------------------------------------------------
  system: {
    heading: "System DrBlocks",
    body: "System DrBlocks to nowoczesna alternatywa dla tradycyjnych fundamentów betonowych, zaprojektowana specjalnie dla budownictwa modułowego. Każdy bloczek składa się z betonowego korpusu klasy B30 oraz stalowej nakładki z gwintem regulacyjnym. Dzięki temu możesz precyzyjnie ustawić wysokość posadowienia z dokładnością do 1 mm – bez wylewki, bez mokrych robót, bez tygodni oczekiwania.",
    steps: [
      {
        no: "01",
        icon: "grid",
        title: "Ustaw",
        desc: "Rozmieszczasz bloczki w siatce podpór pod konstrukcją.",
      },
      {
        no: "02",
        icon: "level",
        title: "Wypoziomuj",
        desc: "Gwintowana stopa reguluje wysokość z dokładnością do 1 mm.",
      },
      {
        no: "03",
        icon: "load",
        title: "Obciąż",
        desc: "Posadawiasz moduł – nośność do 1 t na bloczek (do 5 t z podlewką).",
      },
      {
        no: "04",
        icon: "check",
        title: "Gotowe",
        desc: "Konstrukcja gotowa do dalszych prac tego samego dnia.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Benefits / Why us
  // ---------------------------------------------------------------------------
  benefits: {
    heading: "Dlaczego warto nas wybrać?",
    intro:
      "Nasze innowacyjne bloczki fundamentowe powstały, aby zapewnić solidne i precyzyjne posadowienie, które jest niezbędne dla długowieczności i stabilności budynków modułowych. Dzięki możliwości regulacji wysokości, nasze bloczki eliminują ryzyko niedokładnego osadzenia fundamentu, co często jest bagatelizowane w tradycyjnych rozwiązaniach.",
    items: [
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.35.15.png",
        title: "Szybki montaż",
        desc: "Kompletne posadowienie w jeden dzień zamiast tygodni pracy.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.37.21.png",
        title: "Precyzja do 1 mm",
        desc: "Gwintowana stopa pozwala idealnie wypoziomować konstrukcję.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.38.20.png",
        title: "Bez mokrych robót",
        desc: "Zapomnij o betonie, szalowaniu i sezonowaniu.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.36.26.png",
        title: "Wysoka nośność",
        desc: "Każdy bloczek przenosi do 1000 kg bez podlewki, a z podlewką cementową nawet do 5000 kg.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.37.59.png",
        title: "Możliwość demontażu w każdej chwili",
        desc: "Bloczki można zdemontować i wykorzystać ponownie.",
      },
      {
        img: "/assets/Zrzut-ekranu-2026-04-16-o-11.36.53.png",
        title: "Sprawdzone rozwiązanie",
        desc: "Współpracujemy z liderami budownictwa modułowego.",
      },
    ],
    cta: "Darmowa wycena",
  },

  // ---------------------------------------------------------------------------
  // 3D viewer
  // ---------------------------------------------------------------------------
  viewer3d: {
    heading: "Zobacz bloczek w 3D",
    body: "Obejrzyj system DrBlocks dokładnie tak, jak wygląda w rzeczywistości, i sprawdź, jak działa precyzyjna regulacja wysokości. Pełna, interaktywna konstrukcja, nie zdjęcie.",
    points: [
      "Obróć i przybliż z każdej strony",
      "Zobacz na żywo regulację 120–200 mm",
      "Korpus B30, stalowa stopa, 4× pręty M16",
      "Przełącz Standard / Plus i porównaj chwytak magnetyczny",
    ],
    cta: "Darmowa wycena",
    loading: "Ładowanie modelu 3D…",
    loadAria: "Załaduj interaktywny model 3D bloczka",
    posterAlt: "Regulowany bloczek fundamentowy DrBlocks Standard Block",
    badge: "Model 3D",
    open: "Obejrzyj w 3D",
    dragHint: "Przeciągnij, aby obrócić · scroll, aby przybliżyć",
    closeAria: "Zamknij model 3D",
    closeTitle: "Zamknij model 3D (zwalnia zasoby)",
    variant: "Wariant",
    heightAdjust: "Regulacja wysokości",
    heightAria: "Wysokość posadowienia w milimetrach",
    heightFrom: "120 mm",
    heightTo: "do 200 mm (zakres 70 mm)",
    preview: "Podgląd",
    labels: "Etykiety",
    grout: "Podlewka cementowa",
    groutTitle: "Świeża (mokra) podlewka cementowa w luce pod regulowaną stopą",
    annotations: {
      body: "Korpus betonowy B30",
      foot: "Stalowa stopa regulacyjna",
      bolts: "Śruby M16 (4×)",
      height: "Regulacja wysokości",
      magnet: "Chwytak magnetyczny",
      grout: "Podlewka cementowa",
    },
  },

  // ---------------------------------------------------------------------------
  // Products
  // ---------------------------------------------------------------------------
  products: {
    heading: "Nasze produkty",
    intro:
      "Dwa warianty jednego, sprawdzonego systemu – dobierzemy odpowiedni do Twojego projektu i terenu.",
    compareCta: "Porównaj warianty",
    list: [
      {
        slug: "standard-block",
        name: "Standard Block",
        short:
          "Podstawowy bloczek fundamentowy z regulacją wysokości 120–200 mm. Solidna podstawa dla każdej konstrukcji.",
        intro:
          "Standard Block to solidny, precyzyjny i łatwy w montażu bloczek betonowy zaprojektowany dla budownictwa modułowego. Betonowy korpus klasy B30 oraz stalowa nakładka z gwintem regulacyjnym umożliwiają precyzyjne ustawienie wysokości posadowienia z dokładnością do 1 mm. Dzięki temu idealnie dopasujesz fundament do warunków terenowych – bez wylewki betonowej, bez mokrych robót.",
        image: "/assets/STANDARD-983x1024-1.webp",
        specs: [
          { k: "Klasa betonu", v: "B30 (lany, wibrowany, zbrojony)" },
          {
            k: "Regulacja wysokości",
            v: "120–200 mm (zakres regulacji 70 mm)",
            highlight: true,
          },
          { k: "Precyzja regulacji", v: "do 1 mm", highlight: true },
          {
            k: "Nośność",
            v: "do 1 t (bez podlewki), do 5 t (z podlewką cementową)",
            highlight: true,
          },
          {
            k: "Stopa regulacyjna",
            v: "Stal ocynkowana, 195 × 205 mm, grubość 5 mm",
          },
          {
            k: "Pręty gwintowane",
            v: "4× M16, klasa 8.8, z podkładkami i nakrętkami samokontrującymi",
          },
          { k: "Nakładka", v: "Stal 5 mm z przekładką izolacyjną" },
        ],
        closer: {
          heading: "Zbuduj fundament bez kompromisów",
          body: "Solidna podstawa dla domków modułowych, kontenerów, pawilonów i tarasów. Skontaktuj się, a dobierzemy rozwiązanie i przygotujemy wycenę.",
          cta: "Darmowa wycena",
        },
        related: "standard-plus-block",
      },
      {
        slug: "standard-plus-block",
        name: "Standard Plus Block",
        badge: "Premium",
        short:
          "Z magnetycznymi chwytakami do montażu obróbki dolnej. Funkcjonalność i estetyka w jednym.",
        intro:
          "Standard Plus Block to zaawansowana wersja bloczka z magnetycznymi chwytakami do montażu obróbki dolnej – elementu wykończeniowego zamykającego przestrzeń między budynkiem modułowym a gruntem. Łączy pełną funkcjonalność systemu DrBlocks z szybkim i precyzyjnym, estetycznym wykończeniem.",
        image: "/assets/STANDARD-PLUS-1966x2048-1.webp",
        specs: [
          { k: "Klasa betonu", v: "B30 (lany, wibrowany, zbrojony)" },
          {
            k: "Regulacja wysokości",
            v: "120–200 mm (zakres regulacji 70 mm)",
            highlight: true,
          },
          { k: "Precyzja regulacji", v: "do 1 mm", highlight: true },
          {
            k: "Nośność",
            v: "do 1 t (bez podlewki), do 5 t (z podlewką cementową)",
            highlight: true,
          },
          {
            k: "Stopa regulacyjna",
            v: "Stal ocynkowana, 195 × 205 mm, grubość 5 mm",
          },
          {
            k: "Pręty gwintowane",
            v: "4× M16, klasa 8.8, z podkładkami i nakrętkami samokontrującymi",
          },
          { k: "Nakładka", v: "Stal 5 mm z przekładką izolacyjną" },
          {
            k: "Chwytaki magnetyczne",
            v: "Tak – do montażu obróbki dolnej",
            highlight: true,
          },
        ],
        closer: {
          heading: "Więcej niż fundament – wykończenie na najwyższym poziomie",
          body: "Standard Plus Block to rozwiązanie dla projektów, w których liczy się nie tylko stabilność, ale też estetyka i perfekcyjne wykończenie. Magnetyczne uchwyty skracają montaż i eliminują zbędne komplikacje na budowie.",
          cta: "Wybierz rozwiązanie Klasy Premium",
        },
        related: "standard-block",
      },
    ],
    detail: {
      specsHeading: "Parametry techniczne",
      priceNote: "Cena ustalana indywidualnie",
      priceNoteLink: "Więcej w FAQ",
      seeAlso: "Zobacz też",
      breadcrumbOffer: "Oferta",
    },
    compare: {
      heading: "Porównanie wariantów",
      paramHeader: "Parametr",
      yes: "Tak",
      no: "Nie",
      rows: [
        { k: "Korpus betonowy", standard: "B30", plus: "B30" },
        { k: "Regulacja wysokości", standard: "120–200 mm", plus: "120–200 mm" },
        { k: "Zakres regulacji", standard: "70 mm", plus: "70 mm" },
        { k: "Precyzja regulacji", standard: "1 mm", plus: "1 mm" },
        {
          k: "Nośność",
          standard: "do 1 t (5 t z podlewką)",
          plus: "do 1 t (5 t z podlewką)",
        },
        { k: "Chwytaki magnetyczne", standard: false, plus: true },
        { k: "Montaż obróbki dolnej (cokół)", standard: false, plus: true },
        { k: "Przeznaczenie", standard: "uniwersalne", plus: "wykończenie cokołu" },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // Experts CTA
  // ---------------------------------------------------------------------------
  experts: {
    heading: "Porozmawiaj z naszymi ekspertami",
    body: "Nie wiesz, które rozwiązanie będzie najlepsze? Pomożemy dobrać produkt i przygotujemy wycenę.",
    cta: { label: "Skontaktuj się", href: "/kontakt" },
  },

  // ---------------------------------------------------------------------------
  // About
  // ---------------------------------------------------------------------------
  about: {
    heading: "Solidny fundament dla budownictwa modułowego",
    mission:
      "Wspieramy rozwój budownictwa modułowego w Polsce, dostarczając solidne fundamenty – dosłownie i w przenośni.",
    paragraphs: [
      "DrBlocks to polski producent innowacyjnych bloczków fundamentowych z regulacją wysokości. Łączymy nowoczesne technologie produkcji z praktycznym doświadczeniem w branży budowlanej.",
      "Fundamenty pod lekkie konstrukcje modułowe często traktowane są zbyt powierzchownie. Prowadzi to do nierównomiernego osiadania budynku, trudności z otwieraniem okien i drzwi oraz kosztownych napraw.",
      "Dlatego stworzyliśmy system, który daje precyzyjne, stabilne i trwałe posadowienie – bez prac mokrych, bez tygodni oczekiwania, bez kompromisów.",
    ],
    images: ["/assets/grafika1.webp"],
    closerHeading: "Zbudujmy solidny fundament",
    closerBody: "Skontaktuj się z nami – dobierzemy rozwiązanie i przygotujemy wycenę.",
  },

  // ---------------------------------------------------------------------------
  // FAQ
  // ---------------------------------------------------------------------------
  faq: {
    heading: "Najczęściej zadawane pytania",
    lead: "Masz pytania o regulowane bloczki fundamentowe? Zebraliśmy najważniejsze odpowiedzi w jednym miejscu.",
    items: [
      {
        q: "Co to są regulowane bloczki fundamentowe i jakie korzyści oferują?",
        a: "Regulowane bloczki fundamentowe to innowacyjne rozwiązanie stosowane w budownictwie modułowym, które umożliwia precyzyjną regulację wysokości fundamentu z dokładnością do milimetra. Pozwalają dopasować posadowienie do ukształtowania terenu, zwiększają stabilność konstrukcji i umożliwiają lekkie wypełnienie cementowe pod budynkiem.",
      },
      {
        q: "Czym różni się Bloczek Standard od Bloczek Standard Plus?",
        a: "Bloczek Standard to podstawowy model wyposażony w stalową nakładkę umożliwiającą regulację wysokości posadowienia w zakresie 120–200 mm (zakres regulacji do 7 cm). Bloczek Standard Plus oferuje dodatkowo chwytaki magnetyczne, które ułatwiają montaż obróbki dolnej. Dzięki nim wykończenie przestrzeni pomiędzy budynkiem modułowym a gruntem jest bardziej precyzyjne i estetyczne.",
      },
      {
        q: "Jakie są metody kotwienia Standard Blok L w gruncie?",
        a: "Standard Blok L można zakotwić w gruncie na dwa sposoby: chemicznie, przy użyciu odpowiednich środków wiążących, lub mechanicznie, za pomocą głęboko wbitych kotew. Obie metody zapewniają trwałe i pewne zamocowanie fundamentu, co jest szczególnie istotne w przypadku budynków posadowionych na zmiennym gruncie.",
      },
      {
        q: "Jakie są zalety użycia chwytaków magnetycznych w bloczkach fundamentowych?",
        a: "Chwytaki magnetyczne ułatwiają precyzyjny montaż obróbki dolnej. Umożliwiają szybkie, stabilne i estetyczne wykończenie przestrzeni pomiędzy budynkiem modułowym a gruntem, poprawiając ochronę i trwałość konstrukcji.",
      },
      {
        q: "Dlaczego ważne jest solidne posadowienie budynku modułowego?",
        a: "Odpowiednie posadowienie zapobiega nierównomiernemu osiadaniu budynku, które z czasem prowadzi do uszkodzeń konstrukcji. Produkty DrBlocks zapewniają precyzyjne i stabilne ustawienie, minimalizując problemy związane z fundamentem.",
      },
      {
        q: "Czym różni się standardowy bloczek betonowy od bloczka betonowego DrBlocks?",
        a: "Bloczki DrBlocks mają innowacyjne możliwości, oferując większą elastyczność i precyzję. Modele Standard mają regulowaną stalową płytę (regulacja wysokości 120–200 mm), a warianty Plus dodają chwytaki magnetyczne dla lepszego dopasowania fundamentu do warunków terenowych.",
      },
      {
        q: "Czy warto zainwestować w bloczki DrBlocks?",
        a: "Zdecydowanie warto – jako alternatywa dla prowizorycznych rozwiązań zapobiegają niszczeniu drewna, brakowi wypoziomowania oraz późniejszym trudnościom w obsłudze drzwi i okien czy nieszczelnościom.",
      },
      {
        q: "Czy bloczki DrBlocks są drogie?",
        a: "Bloczki DrBlocks mogą wydawać się droższe na pierwszy rzut oka w porównaniu do standardowych bloczków betonowych, ale biorąc pod uwagę skalę całej inwestycji, jest to jedynie niewielki promil całkowitych kosztów. To jednorazowa inwestycja, która zapewnia długoterminową stabilność i trwałość posadowienia, redukując przyszłe koszty napraw.",
      },
    ],
    noAnswerHeading: "Nie znalazłeś odpowiedzi?",
    noAnswerBody:
      "Każdy projekt jest inny – chętnie odpowiemy na Twoje pytania i pomożemy dobrać najlepsze rozwiązanie.",
    noAnswerCta: "Skontaktuj się z nami",
  },

  // ---------------------------------------------------------------------------
  // Blog
  // ---------------------------------------------------------------------------
  blog: {
    heading: "Wiedza o fundamentach",
    lead: "Poradniki, porównania i praktyczna wiedza o posadowieniu budynków modułowych, kontenerów i pawilonów.",
    posts: [
      {
        slug: "tani-bloczek-vs-drblocks",
        title:
          "Tani bloczek fundamentowy jako fundament dla pawilonów? Pozorna oszczędność, która może kosztować Cię więcej niż myślisz",
        date: "2025-04-17",
        excerpt:
          "W świecie budownictwa modułowego, gdzie liczy się szybkość montażu, mobilność i niska cena, wielu inwestorów decyduje się na tani bloczek…",
      },
      {
        slug: "stopa-fundamentowa-to-najlepsze-rozwiazanie",
        title: "Stopa fundamentowa to najlepsze rozwiązanie!?",
        date: "2025-02-07",
        excerpt:
          "Wybór odpowiedniego fundamentu to kluczowy krok w każdej inwestycji budowlanej. Przez lata standardem było stosowanie lanych fundamentów betonowych, jednak rozwój technologii…",
      },
      {
        slug: "bloczek-betonowy-fundamentowy-versus-bloczek-betonowy-fundamentowy-od-dr-blocks",
        title:
          "Bloczek betonowy fundamentowy versus bloczek betonowy fundamentowy od Dr. Blocks",
        date: "2024-08-13",
        excerpt:
          "Wybór odpowiednich materiałów budowlanych ma kluczowe znaczenie dla trwałości i stabilności każdej konstrukcji. Jednym z najważniejszych elementów fundamentów są bloczki…",
      },
      {
        slug: "po-co-stosuje-sie-bloczki-betonowe-fundamentowe-dlaczego-sa-tak-wazne",
        title:
          "Po co stosuje się bloczki betonowe fundamentowe? Dlaczego są tak ważne?",
        date: "2024-08-13",
        excerpt:
          "Fundamenty to podstawa każdej trwałej konstrukcji. Sprawdź, jakie funkcje pełnią bloczki betonowe i dlaczego mają tak duże znaczenie dla stabilności budynku…",
      },
    ],
    closerHeading: "Zastanawiasz się nad fundamentem?",
    closerBody: "Pomożemy dobrać rozwiązanie i przygotujemy wycenę dla Twojego projektu.",
    closerCta: "Darmowa wycena",
  },

  // ---------------------------------------------------------------------------
  // Contact
  // ---------------------------------------------------------------------------
  contact: {
    heading: "Porozmawiajmy o Twoim fundamencie",
    lead: "Napisz lub zadzwoń – pomożemy dobrać produkt, policzymy liczbę bloczków i przygotujemy wycenę dopasowaną do Twojego projektu.",
    dataHeading: "Dane kontaktowe",
    phone: "Telefon",
    sales: "Sprzedaż",
    general: "Kontakt ogólny",
    instagram: "@drblocksforbuildings",
    form: {
      nameLabel: "Imię i nazwisko",
      namePlaceholder: "Jan Kowalski",
      emailLabel: "E-mail",
      emailPlaceholder: "jan@firma.pl",
      phoneLabel: "Telefon",
      phonePlaceholder: "+48 600 000 000",
      messageLabel: "Wiadomość",
      messagePlaceholder: "Opisz projekt: typ obiektu, wymiary, termin…",
      consent:
        "Wyrażam zgodę na przetwarzanie moich danych osobowych przez {company} w celu obsługi zapytania, zgodnie z {policy}.",
      consentPolicy: "polityką prywatności",
      submit: "Wyślij zapytanie",
      submitting: "Wysyłanie…",
      replyNote: "Zwykle odpowiadamy w ciągu 24 godzin w dni robocze.",
      successHeading: "Dziękujemy za zapytanie!",
      successBody:
        "Otrzymaliśmy Twoją wiadomość i odezwiemy się zwykle w ciągu 24 godzin w dni robocze. W pilnej sprawie zadzwoń: {phone}.",
      errorBody:
        "Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się bezpośrednio: {phone}, {email}.",
      subjectPrefix: "Zapytanie ze strony DrBlocks – {name}",
      errNameRequired: "Podaj imię i nazwisko.",
      errEmail: "Podaj poprawny adres e-mail.",
      errMessage: "Napisz, w czym możemy pomóc.",
      errConsent: "Zaznacz zgodę na kontakt.",
      honeypot: "Nie wypełniaj tego pola",
    },
  },

  // ---------------------------------------------------------------------------
  // Partner page
  // ---------------------------------------------------------------------------
  partner: {
    hero: {
      eyebrow: "Program partnerski",
      title: "Zostań partnerem DrBlocks",
      subtitle:
        "Rozwijamy ogólnopolską sieć partnerów i szukamy firm, z którymi zbudujemy rynek nowoczesnych, regulowanych fundamentów. Dołącz do grona producentów i wykonawców, którzy już nam zaufali.",
      primaryCta: "Zamów darmową wycenę",
      secondaryCta: "Dowiedz się więcej",
    },
    growth: {
      heading: "Marka, która dynamicznie rośnie",
      paragraphs: [
        "DrBlocks to polski producent regulowanych bloczków fundamentowych i jeden z pionierów tej kategorii na rynku. Budownictwo modułowe w Polsce rośnie kilka–kilkanaście procent rocznie, a my rośniemy razem z nim – poszerzamy sieć partnerów, produkcję i zasięg.",
        "Współpracujemy już z czołowymi producentami domów modułowych, pawilonów i kontenerów. Teraz otwieramy program partnerski, aby wspólnie docierać do kolejnych inwestorów w całej Polsce i Europie.",
      ],
      stats: [
        { value: "±1 mm", label: "Precyzja" },
        { value: "do 5 t", label: "Nośność (z podlewką)" },
        { value: "1 dzień", label: "Montaż" },
        { value: "0", label: "Prac mokrych" },
      ],
      cta: "Zamów darmową wycenę",
    },
    paths: {
      heading: "Dwie ścieżki współpracy",
      lead: "Niezależnie od tego, czy produkujesz budynki, czy realizujesz prace ziemne – mamy dla Ciebie dopasowany model partnerstwa.",
      cards: [
        {
          eyebrow: "Producenci",
          title: "Dla producentów budynków modułowych, pawilonów i kontenerów",
          points: [
            "Oferuj klientom kompletne, nowoczesne posadowienie w standardzie",
            "Regulowane bloczki DrBlocks skracają montaż i podnoszą jakość Twoich realizacji",
            "Rekomendowany fundament w Twojej ofercie – gotowe rozwiązanie pod moduły i kontenery",
            "Atrakcyjne ceny i priorytet dostaw dla stałych partnerów",
            "Wsparcie techniczne w doborze rozstawu i nośności",
            "Obecność na naszej mapie partnerów i wzajemna rekomendacja",
          ],
        },
        {
          eyebrow: "Wykonawcy",
          title: "Dla firm budowlanych zajmujących się pracami ziemnymi",
          points: [
            "Nowa, dochodowa usługa: montaż regulowanych fundamentów",
            "Minimum sprzętu, szybka realizacja, bez prac mokrych",
            "Szkolenie i wsparcie techniczne DrBlocks",
            "Stały dopływ zleceń z naszej sieci producentów",
            "Atrakcyjne warunki zakupu i priorytet dostaw",
            "Obecność na mapie partnerów jako rekomendowany wykonawca",
          ],
        },
      ],
    },
    benefits: {
      heading: "Co zyskujesz jako partner?",
      lead: "Program partnerski DrBlocks to więcej niż sprzedaż – to wspólny rozwój.",
      items: [
        {
          title: "Atrakcyjne warunki partnerskie",
          desc: "Indywidualne rabaty i ceny zależne od skali współpracy oraz priorytet w realizacji zamówień.",
        },
        {
          title: "System lojalnościowy",
          desc: "Im więcej realizacji, tym lepsze warunki – stałych partnerów nagradzamy dodatkowymi korzyściami.",
        },
        {
          title: "Wsparcie marketingowe",
          desc: "Obecność na mapie partnerów, wzajemne rekomendacje i materiały wspierające sprzedaż.",
        },
      ],
    },
    map: {
      heading: "Nasi partnerzy na mapie",
      lead: "Sieć partnerów DrBlocks rośnie. Poniżej firmy, które już z nami współpracują – docelowo mapa obejmie partnerów z całej Europy i świata.",
      legendProducer: "Producent budynków modułowych",
      legendContractor: "Firma budowlana (prace ziemne)",
      listHeading: "LISTA PARTNERÓW",
      hint: "Przewiń, aby przybliżyć · przeciągnij, aby przesunąć",
      zoomIn: "Przybliż",
      zoomOut: "Oddal",
      reset: "Resetuj widok",
      categoryProducer: "Producent",
      categoryContractor: "Wykonawca",
    },
    form: {
      heading: "Zostań partnerem",
      lead: "Wypełnij formularz – odezwiemy się w ciągu 24 godzin w dni robocze.",
      companyLabel: "Nazwa firmy",
      companyPlaceholder: "Twoja firma sp. z o.o.",
      emailLabel: "Adres e-mail",
      emailPlaceholder: "kontakt@twojafirma.pl",
      locationLabel: "Lokalizacja (miasto/region)",
      locationPlaceholder: "np. Warszawa, woj. mazowieckie",
      typeLabel: "Rodzaj partnerstwa",
      typeProducer: "Producent",
      typeContractor: "Firma budowlana",
      messageLabel: "Wiadomość (opcjonalnie)",
      messagePlaceholder: "Opisz swój profil działalności i oczekiwania…",
      consent:
        "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zgłoszenia partnerskiego, zgodnie z {policy}.",
      consentPolicy: "polityką prywatności",
      submit: "Wyślij zgłoszenie",
      submitting: "Wysyłanie…",
      successHeading: "Zgłoszenie przyjęte!",
      successBody:
        "Dziękujemy za zainteresowanie programem partnerskim. Odezwiemy się w ciągu 24 godzin w dni robocze.",
      errorBody:
        "Nie udało się wysłać zgłoszenia. Spróbuj ponownie lub napisz bezpośrednio na kontakt@drblocks.pl.",
      subjectPrefix: "Zgłoszenie partnerskie DrBlocks – {company}",
      errCompany: "Podaj nazwę firmy.",
      errEmail: "Podaj poprawny adres e-mail.",
      errLocation: "Podaj lokalizację.",
      errConsent: "Zaznacz zgodę na przetwarzanie danych.",
    },
  },

  // ---------------------------------------------------------------------------
  // Not found
  // ---------------------------------------------------------------------------
  notFound: {
    code: "404",
    title: "Nie znaleźliśmy tej strony",
    body: "Strona mogła zostać przeniesiona lub nie istnieje. Wróć na stronę główną albo sprawdź naszą ofertę.",
    home: "Strona główna",
    offer: "Zobacz ofertę",
  },

  // ---------------------------------------------------------------------------
  // Privacy policy
  // ---------------------------------------------------------------------------
  privacy: {
    title: "Polityka prywatności",
    updated: "Ostatnia aktualizacja: 2024",
    sections: [
      {
        h: "§1. Administrator danych",
        body: "Administratorem danych osobowych jest Jimmyworld Jakub Stryjewski, NIP 9372592697, REGON 362105276 (dalej „Administrator“). W sprawach dotyczących ochrony danych osobowych można kontaktować się pod adresem kontakt@drblocks.pl.",
      },
      {
        h: "§2. Zakres i cel przetwarzania danych",
        body: "Dane osobowe (imię i nazwisko, adres e-mail, numer telefonu oraz treść wiadomości) przetwarzamy w celu: obsługi zapytań przesłanych przez formularz kontaktowy lub pocztą elektroniczną, przygotowania i przedstawienia oferty oraz wyceny, realizacji ewentualnej umowy oraz kontaktu w jej ramach.",
      },
      {
        h: "§3. Podstawa prawna",
        body: "Dane przetwarzamy na podstawie art. 6 ust. 1 lit. a RODO (zgoda), art. 6 ust. 1 lit. b RODO (podjęcie działań przed zawarciem umowy i jej realizacja) oraz art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora polegający na obsłudze zapytań).",
      },
      {
        h: "§4. Okres przechowywania danych",
        body: "Dane przechowujemy przez okres niezbędny do obsługi zapytania i realizacji umowy, a następnie przez okres wynikający z przepisów prawa (m.in. podatkowych), nie dłużej niż 10 lat, lub do momentu cofnięcia zgody.",
      },
      {
        h: "§5. Prawa osoby, której dane dotyczą",
        body: "Przysługuje Ci prawo dostępu do danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, prawo do przenoszenia danych, wniesienia sprzeciwu, a także prawo do cofnięcia zgody w dowolnym momencie oraz wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.",
      },
      {
        h: "§6. Pliki cookies",
        body: "Serwis wykorzystuje pliki cookies: sesyjne (usuwane po zamknięciu przeglądarki), stałe oraz analityczne (służące do anonimowej analizy ruchu). Możesz zarządzać plikami cookies w ustawieniach swojej przeglądarki, w tym je zablokować lub usunąć.",
      },
      {
        h: "§7. Kontakt",
        body: "We wszelkich sprawach dotyczących przetwarzania danych osobowych prosimy o kontakt: kontakt@drblocks.pl, tel. +48 506 057 727.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // SEO meta
  // ---------------------------------------------------------------------------
  meta: {
    home: {
      title: "Regulowane bloczki fundamentowe | DrBlocks",
      description:
        "Fundament w jeden dzień bez betonowania. Regulacja 120–200 mm, precyzja ±1 mm, nośność do 5 t. Pod kontenery, domy modułowe, tarasy.",
      keywords: ["bloczki fundamentowe regulowane", "fundament regulowany śrubowy"],
    },
    oferta: {
      title: "Oferta — regulowane bloczki fundamentowe | DrBlocks",
      description:
        "Standard i Standard Plus: stalowo-betonowy fundament B30 z regulacją wysokości. Porównaj warianty, nośność i zastosowania. Darmowa wycena.",
      keywords: [
        "regulowane bloczki fundamentowe",
        "bloczek fundamentowy regulowany cena",
      ],
    },
    "product-standard-block": {
      title: "Standard Block — bloczek regulowany | DrBlocks",
      description:
        "Bloczek fundamentowy z regulacją 120–200 mm, precyzja ±1 mm. Beton B30 + stopa stalowa, do 1 t (5 t z podlewką). Montaż w 1 dzień.",
      keywords: [
        "bloczki fundamentowe z regulacją wysokości",
        "stopa fundamentowa regulowana",
      ],
    },
    "product-standard-plus-block": {
      title: "Standard Plus — bloczek regulowany | DrBlocks",
      description:
        "Wersja Plus z chwytakiem magnetycznym i obróbką cokołu. Regulacja 120–200 mm ±1 mm, nośność do 5 t z podlewką cementową.",
      keywords: [
        "stopa fundamentowa z gwintem regulowana wysokość",
        "fundament punktowy regulowany",
      ],
    },
    oNas: {
      title: "O nas — polski producent | DrBlocks",
      description:
        "Polski producent regulowanych bloczków fundamentowych. Dlaczego stworzyliśmy system stalowo-betonowy do lekkich konstrukcji.",
      keywords: [
        "producent bloczków fundamentowych",
        "regulowany fundament producent",
      ],
    },
    partner: {
      title: "Zostań partnerem | DrBlocks",
      description:
        "Dołącz do ogólnopolskiej sieci partnerów DrBlocks. Dla producentów domów modułowych i firm ziemnych. Atrakcyjne warunki.",
      keywords: [
        "program partnerski fundamenty",
        "dystrybutor bloczków fundamentowych",
      ],
    },
    faq: {
      title: "FAQ — regulowane bloczki fundamentowe | DrBlocks",
      description:
        "Odpowiedzi o nośności, montażu, gruncie i cenie. Jaki fundament pod dom modułowy i kontener? Czym różni się od pali śrubowych?",
      keywords: [
        "jaki fundament pod dom modułowy",
        "fundament pod kontener",
      ],
    },
    blog: {
      title: "Blog — fundamenty bez betonowania | DrBlocks",
      description:
        "Poradniki o fundamentach pod kontenery, domy modułowe i tarasy. Porównania, koszty, montaż bez wykopów i prac mokrych.",
      keywords: ["fundament bez betonowania", "fundament bez wykopów"],
    },
    "post-tani-bloczek-vs-drblocks": {
      title: "Tani bloczek vs DrBlocks — pozorna oszczędność | DrBlocks",
      description:
        "Czy tani bloczek pod pawilon się opłaca? Liczymy ukryte koszty osiadania i poprawek kontra regulowany fundament DrBlocks.",
      keywords: ["tani bloczek fundamentowy", "fundament pod pawilon"],
    },
    "post-stopa-fundamentowa-to-najlepsze-rozwiazanie": {
      title: "Stopa fundamentowa — najlepsze rozwiązanie? | DrBlocks",
      description:
        "Lany fundament czy regulowana stopa stalowa? Porównujemy czas montażu, koszt i precyzję poziomowania ±1 mm.",
      keywords: [
        "stopa fundamentowa regulowana",
        "fundament punktowy a płyta",
      ],
    },
    "post-bloczek-betonowy-fundamentowy-versus-bloczek-betonowy-fundamentowy-od-dr-blocks":
      {
        title: "Zwykły bloczek vs bloczek DrBlocks | DrBlocks",
        description:
          "Czym regulowany bloczek stalowo-betonowy bije zwykły bloczek 38×24×12? Nośność, regulacja, demontaż — pełne porównanie.",
        keywords: [
          "bloczek betonowy fundamentowy",
          "regulowane bloczki fundamentowe",
        ],
      },
    "post-po-co-stosuje-sie-bloczki-betonowe-fundamentowe-dlaczego-sa-tak-wazne":
      {
        title: "Po co stosuje się bloczki fundamentowe? | DrBlocks",
        description:
          "Jaką rolę pełni bloczek fundamentowy i kiedy regulowany system wygrywa z tradycyjnym. Przewodnik dla inwestorów.",
        keywords: [
          "po co bloczki fundamentowe",
          "rodzaje fundamentów punktowych",
        ],
      },
    kontakt: {
      title: "Kontakt — zamów darmową wycenę | DrBlocks",
      description:
        "Skontaktuj się z DrBlocks: tel. +48 506 057 727, kontakt@drblocks.pl, sprzedaz@drblocks.pl. Przygotujemy wycenę regulowanych bloczków fundamentowych do Twojego projektu.",
      keywords: ["kontakt drblocks", "wycena bloczki fundamentowe"],
    },
    privacy: {
      title: "Polityka prywatności | DrBlocks",
      description:
        "Polityka prywatności serwisu drblocks.pl – zasady przetwarzania danych osobowych i wykorzystania plików cookies.",
    },
  },
};
