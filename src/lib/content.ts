/**
 * Single source of truth for DrBlocks site content.
 * All copy, specs and assets are preserved faithfully from drblocks.pl.
 */

export const company = {
  name: "DrBlocks",
  legal: "Jimmyworld Jakub Stryjewski",
  phone: "+48 506 057 727",
  phoneHref: "tel:+48506057727",
  emailContact: "kontakt@drblocks.pl",
  emailSales: "sprzedaz@drblocks.pl",
  address: "ul. Krakowska 69/9, 43-300 Bielsko-Biała",
  nip: "9372592697",
  regon: "362105276",
  instagram: "https://www.instagram.com/drblocksforbuildings/",
};

export const nav = [
  {
    label: "Oferta",
    href: "/oferta",
    children: [
      { label: "Standard Block", href: "/oferta/standard-block" },
      { label: "Standard Plus Block", href: "/oferta/standard-plus-block" },
    ],
  },
  { label: "Jak to działa", href: "/#jak-to-dziala" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

export const hero = {
  eyebrow: "Regulowane bloczki fundamentowe",
  title: "Fundament w jeden dzień.",
  titleAccent: "Precyzja do milimetra.",
  subtitle:
    "Regulowane bloczki fundamentowe dla budownictwa modułowego. Bez wylewki betonowej, bez tygodni oczekiwania – tylko stabilne, precyzyjne posadowienie.",
  primaryCta: { label: "Darmowa wycena", href: "/kontakt" },
  secondaryCta: { label: "Nasze produkty", href: "/oferta" },
  youtubeId: "lpWBq72v3HA",
  stats: [
    { value: "±1 mm", label: "Precyzja" },
    { value: "2000 kg", label: "Nośność" },
    { value: "1 dzień", label: "Montaż" },
    { value: "0", label: "Prac mokrych" },
  ],
};

export const trust = {
  heading: "Zaufali nam liderzy budownictwa modułowego",
  logos: [
    { src: "/assets/global-containers-1024x195-1.png", alt: "Global Home Containers" },
    { src: "/assets/JR.png", alt: "JR Modular Systems" },
    { src: "/assets/Komato.png", alt: "Komato Kontenery" },
    { src: "/assets/Cont4you.png", alt: "CONT4YOU" },
    { src: "/assets/art-pawilony.png", alt: "art pawilony" },
    { src: "/assets/syrek-1.png", alt: "Syrek" },
    { src: "/assets/NoviPawilony-1.png", alt: "Novi Pawilony" },
  ],
};

export const system = {
  heading: "System DrBlocks",
  body:
    "System DrBlocks to nowoczesna alternatywa dla tradycyjnych fundamentów betonowych, zaprojektowana specjalnie dla budownictwa modułowego. Każdy bloczek składa się z betonowego korpusu klasy B30 oraz stalowej nakładki z gwintem regulacyjnym. Dzięki temu możesz precyzyjnie ustawić wysokość posadowienia z dokładnością do 1 mm – bez wylewki, bez mokrych robót, bez tygodni oczekiwania.",
  steps: [
    { no: "01", icon: "grid", title: "Ustaw", desc: "Rozmieszczasz bloczki w siatce podpór pod konstrukcją." },
    { no: "02", icon: "level", title: "Wypoziomuj", desc: "Gwintowana stopa reguluje wysokość z dokładnością do 1 mm." },
    { no: "03", icon: "load", title: "Obciąż", desc: "Posadawiasz moduł – nośność do 2 ton na bloczek." },
    { no: "04", icon: "check", title: "Gotowe", desc: "Konstrukcja gotowa do dalszych prac tego samego dnia." },
  ],
};

export const benefits = {
  heading: "Dlaczego warto nas wybrać?",
  intro:
    "Nasze innowacyjne bloczki fundamentowe powstały, aby zapewnić solidne i precyzyjne posadowienie, które jest niezbędne dla długowieczności i stabilności budynków modułowych. Dzięki możliwości regulacji wysokości, nasze bloczki eliminują ryzyko niedokładnego osadzenia fundamentu, co często jest bagatelizowane w tradycyjnych rozwiązaniach.",
  items: [
    { img: "/assets/Zrzut-ekranu-2026-04-16-o-11.35.15.png", title: "Szybki montaż", desc: "Kompletne posadowienie w jeden dzień zamiast tygodni pracy." },
    { img: "/assets/Zrzut-ekranu-2026-04-16-o-11.37.21.png", title: "Precyzja do 1 mm", desc: "Gwintowana stopa pozwala idealnie wypoziomować konstrukcję." },
    { img: "/assets/Zrzut-ekranu-2026-04-16-o-11.38.20.png", title: "Bez mokrych robót", desc: "Zapomnij o betonie, szalowaniu i sezonowaniu." },
    { img: "/assets/Zrzut-ekranu-2026-04-16-o-11.36.26.png", title: "Nośność do 2 ton", desc: "Każdy bloczek wytrzymuje obciążenie do 2000 kg." },
    { img: "/assets/Zrzut-ekranu-2026-04-16-o-11.37.59.png", title: "Możliwość demontażu w każdej chwili", desc: "Bloczki można zdemontować i wykorzystać ponownie." },
    { img: "/assets/Zrzut-ekranu-2026-04-16-o-11.36.53.png", title: "Sprawdzone rozwiązanie", desc: "Współpracujemy z liderami budownictwa modułowego." },
  ],
};

export const experts = {
  heading: "Porozmawiaj z naszymi ekspertami",
  body: "Nie wiesz, które rozwiązanie będzie najlepsze? Pomożemy dobrać produkt i przygotujemy wycenę.",
  cta: { label: "Skontaktuj się", href: "/kontakt" },
};

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

const baseSpecs: Spec[] = [
  { k: "Klasa betonu", v: "B30 (lany, wibrowany, zbrojony)" },
  { k: "Zakres regulacji wysokości", v: "do 55 mm", highlight: true },
  { k: "Zakres wysokości posadowienia", v: "120–200 mm" },
  { k: "Precyzja regulacji", v: "do 1 mm", highlight: true },
  { k: "Nośność", v: "1–2 t (bez podlewki), >2 t (z polewką cementową)", highlight: true },
  { k: "Stopa regulacyjna", v: "Stal ocynkowana, 195 × 205 mm, grubość 5 mm" },
  { k: "Pręty gwintowane", v: "4× M16, klasa 8.8, z podkładkami i nakrętkami samokontrującymi" },
  { k: "Nakładka", v: "Stal 5 mm z przekładką izolacyjną" },
];

export const products: Product[] = [
  {
    slug: "standard-block",
    name: "Standard Block",
    short: "Podstawowy bloczek fundamentowy z regulacją wysokości do 55 mm. Solidna podstawa dla każdej konstrukcji.",
    intro:
      "Standard Block to solidny, precyzyjny i łatwy w montażu bloczek betonowy zaprojektowany dla budownictwa modułowego. Betonowy korpus klasy B30 oraz stalowa nakładka z gwintem regulacyjnym umożliwiają precyzyjne ustawienie wysokości posadowienia z dokładnością do 1 mm. Dzięki temu idealnie dopasujesz fundament do warunków terenowych – bez wylewki betonowej, bez mokrych robót.",
    image: "/assets/STANDARD-983x1024-1.png",
    specs: baseSpecs,
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
    short: "Z magnetycznymi chwytakami do montażu obróbki dolnej. Funkcjonalność i estetyka w jednym.",
    intro:
      "Standard Plus Block to zaawansowana wersja bloczka z magnetycznymi chwytakami do montażu obróbki dolnej – elementu wykończeniowego zamykającego przestrzeń między budynkiem modułowym a gruntem. Łączy pełną funkcjonalność systemu DrBlocks z szybkim i precyzyjnym, estetycznym wykończeniem.",
    image: "/assets/STANDARD-PLUS-1966x2048-1.png",
    specs: [...baseSpecs, { k: "Chwytaki magnetyczne", v: "Tak – do montażu obróbki dolnej", highlight: true }],
    closer: {
      heading: "Więcej niż fundament – wykończenie na najwyższym poziomie",
      body: "Standard Plus Block to rozwiązanie dla projektów, w których liczy się nie tylko stabilność, ale też estetyka i perfekcyjne wykończenie. Magnetyczne uchwyty skracają montaż i eliminują zbędne komplikacje na budowie.",
      cta: "Wybierz rozwiązanie Klasy Premium",
    },
    related: "standard-block",
  },
];

export const about = {
  heading: "Solidny fundament dla budownictwa modułowego",
  mission:
    "Wspieramy rozwój budownictwa modułowego w Polsce, dostarczając solidne fundamenty – dosłownie i w przenośni.",
  paragraphs: [
    "DrBlocks to polski producent innowacyjnych bloczków fundamentowych z regulacją wysokości. Łączymy nowoczesne technologie produkcji z praktycznym doświadczeniem w branży budowlanej.",
    "Fundamenty pod lekkie konstrukcje modułowe często traktowane są zbyt powierzchownie. Prowadzi to do nierównomiernego osiadania budynku, trudności z otwieraniem okien i drzwi oraz kosztownych napraw.",
    "Dlatego stworzyliśmy system, który daje precyzyjne, stabilne i trwałe posadowienie – bez prac mokrych, bez tygodni oczekiwania, bez kompromisów.",
  ],
  images: ["/assets/grafika1.png"],
};

export const faq = {
  heading: "Najczęściej zadawane pytania",
  items: [
    {
      q: "Co to są regulowane bloczki fundamentowe i jakie korzyści oferują?",
      a: "Regulowane bloczki fundamentowe to innowacyjne rozwiązanie stosowane w budownictwie modułowym, które umożliwia precyzyjną regulację wysokości fundamentu z dokładnością do milimetra. Pozwalają dopasować posadowienie do ukształtowania terenu, zwiększają stabilność konstrukcji i umożliwiają lekkie wypełnienie cementowe pod budynkiem.",
    },
    {
      q: "Czym różni się Bloczek Standard od Bloczek Standard Plus?",
      a: "Bloczek Standard to podstawowy model wyposażony w stalową nakładkę umożliwiającą regulację wysokości do 5,5 cm. Bloczek Standard Plus oferuje dodatkowo chwytaki magnetyczne, które ułatwiają montaż obróbki dolnej. Dzięki nim wykończenie przestrzeni pomiędzy budynkiem modułowym a gruntem jest bardziej precyzyjne i estetyczne.",
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
      a: "Bloczki DrBlocks mają innowacyjne możliwości, oferując większą elastyczność i precyzję. Modele Standard mają regulowaną stalową płytę (regulacja do 5,5 cm), a warianty Plus dodają chwytaki magnetyczne dla lepszego dopasowania fundamentu do warunków terenowych.",
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
};

export type BlogPost = { slug: string; title: string; date: string; excerpt: string };
export const blog: BlogPost[] = [
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
    title: "Bloczek betonowy fundamentowy versus bloczek betonowy fundamentowy od Dr. Blocks",
    date: "2024-08-13",
    excerpt:
      "Wybór odpowiednich materiałów budowlanych ma kluczowe znaczenie dla trwałości i stabilności każdej konstrukcji. Jednym z najważniejszych elementów fundamentów są bloczki…",
  },
  {
    slug: "po-co-stosuje-sie-bloczki-betonowe-fundamentowe-dlaczego-sa-tak-wazne",
    title: "Po co stosuje się bloczki betonowe fundamentowe? Dlaczego są tak ważne?",
    date: "2024-08-13",
    excerpt:
      "Fundamenty to podstawa każdej trwałej konstrukcji. Sprawdź, jakie funkcje pełnią bloczki betonowe i dlaczego mają tak duże znaczenie dla stabilności budynku…",
  },
];
