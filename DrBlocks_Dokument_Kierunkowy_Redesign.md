# DOKUMENT KIERUNKOWY — REDESIGN STRONY drblocks.pl

**Klient / podmiot prawny:** Jimmyworld Jakub Stryjewski (NIP 9372592697, REGON 362105276), ul. Krakowska 69/9, 43-300 Bielsko-Biała
**Marka:** DrBlocks — regulowane bloczki fundamentowe dla budownictwa modułowego
**Pozycjonowanie marki:** „Fundament w jeden dzień. Precyzja do milimetra."
**Data dokumentu:** 2026-06-14
**Status:** wersja robocza do uzgodnienia z klientem i zespołem wdrożeniowym

> Dokument scala 7 raportów badawczych (audyt strony, wywiad gospodarczy, profil produktu, rynek/konkurencja, nowoczesne funkcje, SEO/treści, design/UX) w jeden kierunek strategiczny. Sprzeczności i dane wymagające weryfikacji zebrano w końcowej sekcji „NIEPEWNE / DO WERYFIKACJI".

---

## 1. PROFIL FIRMY I PRODUKTU

### 1.1. Kim jest firma
DrBlocks to młoda marka produktowa (start ~połowa 2024 r.) prowadzona w ramach jednoosobowej działalności gospodarczej Jakuba Stryjewskiego z Bielska-Białej. Działalność (CEIDG) istnieje od 2015 r., pierwotnie w profilu sportowo-rekreacyjnym; produkcja bloczków to nowy, główny kierunek. Firma pozycjonuje się jako **polski producent innowacyjnych, regulowanych bloczków fundamentowych** wspierających rozwój budownictwa modułowego w Polsce.

Charakterystyczny rys: marka ma obecnie **minimalny ślad cyfrowy** — jedyny potwierdzony kanał to Instagram (@drblocksforbuildings), brak Facebooka, LinkedIna, YouTube, brak realizacji i opinii w sieci, brak deklarowanych certyfikatów. To zarazem ryzyko (niska wiarygodność) i szansa (czysta karta do zbudowania spójnego wizerunku premium).

### 1.2. Produkt — istota systemu
DrBlocks to **regulowany fundament punktowy** (typu „pier") zastępujący ciągłą ławę betonową lub płytę. Każdy bloczek to **betonowy korpus B30** (lany, wibrowany, zbrojony) zwieńczony **stalową stopą/nakładką z gwintem regulacyjnym**, która pozwala niezależnie wypoziomować każdy punkt podparcia **co do 1 mm** — bez wylewania betonu na miejscu. Budynek staje na siatce punktów zamiast na ciągłym fundamencie (odpowiednik systemu pier & beam).

**Unikalna wartość (USP):**
- **Montaż w jeden dzień** zamiast tygodni (brak sezonowania betonu).
- **Precyzja regulacji do 1 mm** — idealne poziomowanie na nierównym terenie.
- **Bez prac mokrych** — bez betonowania, szalowania, wykopów.
- **Nośność do 2000 kg** na bloczek (>2 t z podlewką cementową).
- **Wielokrotnego użytku / mobilny** — można zdemontować i wykorzystać ponownie.
- **Praca całoroczna** — niezależnie od pogody i temperatury.
- **Mała ekipa** — montaż możliwy nawet przez 1 osobę.

**Ograniczenie (uczciwie komunikowane):** system jest dedykowany konstrukcjom **lekkim i średnim**; dla ciężkich budynków producent sam wskazuje, że tradycyjny fundament lany bywa lepszy.

### 1.3. Linia produktowa i parametry

| Parametr | Standard Block | Standard Plus Block | Standard Block L |
|---|---|---|---|
| Korpus | Beton B30 (lany, wibrowany, zbrojony) | jak Standard | jak Standard (niepotwierdzone) |
| Stopa regulacyjna | Stal ocynk. 195 × 205 mm, gr. 5 mm | jak Standard | jak Standard (niepotwierdzone) |
| Mechanizm regulacji | 4× pręt M16 kl. 8.8, podkładki + nakrętki samokontrujące | jak Standard | jak Standard |
| Zakres regulacji (gwint) | do 55 mm (5,5 cm) | do 55 mm | b.d. |
| Wysokość posadowienia | 120–200 mm | 120–200 mm | b.d. |
| Precyzja | 1 mm | 1 mm | 1 mm |
| Nośność | 1–2 t (bez podlewki); >2 t (z podlewką) | jak Standard | b.d. |
| Cecha wyróżniająca | podstawowy bloczek | **magnetyczne chwytaki** do montażu obróbki dolnej (cokół maskujący) | **kształt L + otwory do kotwienia** (chemicznie/mechanicznie) na trudnym, zmiennym gruncie |
| Karta produktu na stronie | jest | jest | **BRAK (404) — produkt-widmo** |
| Cena | brak cennika (model „darmowa wycena") | brak cennika | brak cennika |

**Uwaga merytoryczna do ujednolicenia:** marketing mówi „regulacja do 55 mm", karta podaje „wysokość posadowienia 120–200 mm". To dwie różne wielkości (55 mm = precyzyjna regulacja gwintem; 120–200 mm = całkowita wysokość zabudowy nad gruntem). Na nowej stronie należy to rozdzielić i nazwać jednoznacznie.

**„Obróbka dolna"** (dla Standard Plus): element wykończeniowy/cokół zamykający estetycznie przestrzeń między dolną krawędzią budynku modułowego a gruntem; magnetyczne chwytaki ułatwiają jego szybki montaż.

---

## 2. AUDYT OBECNEJ STRONY — kluczowe problemy i luki

**Stack i wydajność**
- WordPress + Astra + Elementor + ElementsKit (Yoast SEO, Cloudflare, PHP 8.1, nginx).
- **Słaba wydajność:** TTFB ~2 s, HTTP/1.1 (brak HTTP/2), 161 KB samego HTML, 26 plików CSS + 10 JS na stronie głównej.
- **Obrazy nieoptymalne:** PNG/JPEG, brak WebP/AVIF, lazy-load tylko na 6 z 19 obrazów → ryzyko słabych Core Web Vitals (LCP/TBT), szczególnie na mobile.

**Konwersja / sprzedaż**
- **Zero cen i zero cennika/widełek** na całej stronie — każda ścieżka kończy się generycznym „Darmowa wycena / Kontakt". Wysokie tarcie, brak kwalifikacji leada.
- **Brak kalkulatora wyceny/doboru, brak wizualizacji 3D, brak konfiguratora/planera** — produkt techniczny prezentowany wyłącznie statycznymi PNG.
- Formularz minimalny, z niechlujnymi etykietami; brak pól kwalifikujących (typ obiektu, liczba bloczków, termin, lokalizacja).
- Brak wyróżnionego, stałego CTA w headerze (np. „Wyceń projekt").

**Zaufanie / dowód społeczny**
- Sekcja „Zaufali nam liderzy budownictwa modułowego" **bez ani jednego logotypu, nazwy klienta, case study czy referencji** — pusta obietnica.
- **Brak realizacji/portfolio, zdjęć montażu, filmów.**
- **Brak certyfikatów, deklaracji właściwości użytkowych (DoP/CE), atestów, badań nośności** — krytyczne dla produktu konstrukcyjnego.
- Strona „O nas" anonimowa (brak zespołu, historii, zakładu, dat). Dane firmowe (NIP/adres) tylko w polityce prywatności.
- **E-mail do RODO na prywatnej skrzynce Gmail** (kubastryjewski@gmail.com) — sygnał nieprofesjonalizmu.

**Treść / oferta**
- **„Standard Block L" opisany w FAQ, ale strona produktu nie istnieje (404)** — niespójność oferty.
- Brak instrukcji montażu krok po kroku, rysunków technicznych, kart katalogowych PDF.
- Brak strony „Zastosowania" (kontenery, domki holenderskie, tarasy, garaże itp.).
- Brak FAQ logistycznego (dostawa, MOQ, czas realizacji, gwarancja).
- Niespójne nazewnictwo: „O nas" vs „O firmie", „Standard Block L" vs „Standard Blok L".

**Nawigacja / IA / SEO**
- „Kontakt" schowany pod „O nas" w menu; brak własnego, widocznego miejsca.
- Wszystkie wpisy bloga w kategorii „Uncategorized"; blog bez paginacji/kategorii; **martwy od ~14 miesięcy** (ostatni wpis IV 2025).
- Brak danych strukturalnych Product/Offer na stronach produktów. OG image strony głównej to wąski baner 1024×195 (źle renderuje się jako social preview).
- Plusy do utrzymania: poprawne, unikalne `title`/meta, canonical, schema Organization/WebSite/Breadcrumb, jeden H1.

---

## 3. RYNEK, KONKURENCJA I KLIENT DOCELOWY

### 3.1. Rynek
Budownictwo modułowe w Polsce to rynek **~4,7–5,1 mld zł (2024)**, rosnący ~7–10% rocznie, z prognozą **~7,2 mld zł do 2030 r.** (źródła rozbieżne metodologicznie: PMR ~4,4–4,6 mld zł, Spectis ~5,0–5,1 mld zł). Segment budynków modułowych odpowiada za >37% przychodów największych producentów prefabrykatów. Drivery: domy modułowe, domki holenderskie/letniskowe, tiny house, garden office, kontenery, segment instytucjonalny (hotele, akademiki).

Kontekst cenowy istotny dla narracji: dom modułowy kosztuje **4 000–9 000 zł/m²**, a fundament **15 000–60 000 zł** — czyli zwykle kilka procent inwestycji. To uzasadnia komunikat „premium fundament za promil budżetu".

### 3.2. Konkurencja
- **Bezpośrednia (regulowany betonowy bloczek 2 t):** praktycznie **brak konkurentów w PL/EU** rankujących na tę kategorię. DrBlocks jest faktycznie **pionierem kategorii / first-moverem**.
- **Pale śrubowe (Krinner, Winkelmann, PSF, Camo)** — najgroźniejszy konkurent technologiczny: ta sama obietnica (1 dzień, bez betonu, demontowalne). Ceny: tanie pale 40–90 zł/szt., markowe 87–250 zł/szt.; cały fundament śrubowy 15–60 tys. zł. Przewaga DrBlocks: brak maszyn do wkręcania, prostsza milimetrowa regulacja, niższa bariera dla B2C.
- **Tradycyjne bloczki betonowe** — 4–10 zł/szt.; najtańsze, ale bez regulacji, prace mokre, brak demontażu.
- **Regulowane wsporniki tarasowe (Fitberg, DDGRO)** — 5–20 zł/szt., ale nośność ~1 t (połowa DrBlocks). Przewaga DrBlocks: 2× nośność → wchodzi w segment cięższych domów całorocznych, nie tylko tarasów.
- **Zagraniczne „instant foundation" (TuffBlock US, EasyPad/Elite GSS UK)** — analogiczna idea, brak dowodów na aktywną dystrybucję w PL; potencjalne zagrożenie wejściem.

### 3.3. Klient docelowy (segmenty, malejąco wg priorytetu)
1. **B2B — producenci/wykonawcy domów modułowych** (najważniejszy; powtarzalne zakupy; liderzy: Unihouse, Northouse, Simple House, Rosil, TICAB).
2. **Firmy tarasowe i garden office / domki ogrodowe całoroczne** (przewaga: nośność i status „fundamentu", nie „wspornika").
3. **Branża domków letniskowych / holenderskich do 35 m²** (popyt napędzany przepisami: do 35 m² na zgłoszenie).
4. **Branża kontenerowa / eventowa / tymczasowa** (atut: demontaż i ponowny użytek).
5. **Inwestorzy indywidualni (B2C)** — samodzielny montaż bez ekipy i sprzętu.

### 3.4. Pozycjonowanie cenowe
DrBlocks to **produkt premium**: drożej niż bloczek betonowy i wspornik tarasowy, ale taniej i prościej niż kompletny fundament śrubowy, jeśli liczyć całe rozwiązanie. **Brak transparentnego cennika to słabość komunikacyjna** — rekomendacja: kalkulator pokazujący koszt fundamentu DrBlocks vs alternatywy dla zadanego metrażu.

---

## 4. KIERUNEK REDESIGNU

### 4.1. Idea przewodnia
**„Precyzja inżynierska, którą widać."** Strona ma jednocześnie sprzedawać **techniczną wiarygodność** (parametry, normy, dane) i **odciążającą prostotę** (mniej roboty niż beton). Estetyka: czysty industrial — fabryka/laboratorium, nie błotnisty plac budowy. Bliżej „Apple/Tesla dla komponentu przemysłowego" niż klasycznej strony firmy budowlanej. Wzorce z najlepszych w branży (Katana Foundations, GoliathTech, GroundPlug): wygrywa konkret — dokładne wymiary, materiały, porównanie z betonem, liczby-dowody.

### 4.2. Proponowana mapa strony (sitemap)
```
/                         Strona główna (hero 3D, KPI, jak działa, porównanie z betonem, produkty, realizacje, wycena)
/produkty/                Przegląd linii + porównywarka wariantów
  /produkty/standard-block/
  /produkty/standard-plus-block/
  /produkty/standard-block-l/      ← NOWA, domknięcie luki 404
/jak-to-dziala/           Proces montażu, regulacja, scroll-3D demo, wideo
/zastosowania/            Segmenty + landingi long-tail (patrz SEO):
  /zastosowania/fundament-pod-dom-modulowy/
  /zastosowania/fundament-pod-kontener/
  /zastosowania/fundament-pod-domek-holenderski/
  /zastosowania/fundament-pod-domek-letniskowy/
  /zastosowania/fundament-pod-taras/
  /zastosowania/fundament-pod-garaz-blaszany/
  /zastosowania/fundament-pod-altane-wiate/
  /zastosowania/fundament-pod-hale-pawilon/    (B2B)
/wycena/ (kalkulator)     Główny lead-gen (duplikat CTA z całej strony)
/realizacje/              Galeria projektów + case studies
/dla-wykonawcow/          (opcjonalnie) strefa B2B: hurt, warunki współpracy
/o-nas/                   Historia, podmiot, twarz firmy, „dlaczego DrBlocks"
/faq/                     Rozbudowane (15–20 pytań) + Schema FAQPage
/do-pobrania/             Karty techniczne PDF, katalog, rysunki (lead magnet)
/blog/                    Treści SEO z kategoriami
/kontakt/                 Formularz, telefon, e-maile firmowe, dane podmiotu, mapa
/polityka-prywatnosci/
```
**Nawigacja główna (6 + 2 CTA):** Produkty · Jak to działa · Zastosowania · Realizacje · FAQ · Kontakt — plus stały **klikalny telefon** i pomarańczowy **[Wyceń projekt]**. „O nas", „Blog", „Do pobrania" w stopce/dropdownie.

### 4.3. Styl wizualny, kolory, typografia
**Paleta „Steel & Signal":**
- Primary: Graphite Navy `#11171F`, Steel Blue `#1E2A38` (ciemne sekcje, hero, footer — eksponują render 3D).
- Akcent CTA: Signal Orange `#FF5A1F` (tylko 5–8% powierzchni: CTA, kluczowe liczby, linie pomiarowe).
- Akcent wsparcia: Concrete Amber `#F2A900` (hover, „nowość/plus").
- Neutralne: Ink `#0B0E12`, Slate `#5C6773`, Concrete `#E7E9EC`, Paper `#F7F8FA`, Pure `#FFFFFF`.
- Sukces: Spec Green `#1FA971`.
- Rytm sekcji: ciemna–jasna–ciemna. Kontrast WCAG AA; tekst na pomarańczowym CTA ciemny (`#11171F`).

**Typografia (open-source, pełne PL znaki):**
- Nagłówki: **Space Grotesk** (lub Archivo dla cięższego, industrialnego tonu).
- Tekst/UI: **Inter**.
- Dane/parametry/liczby: **IBM Plex Mono** (tabular-nums) — sygnał „dane pomiarowe" przy mm/kg/t.
- Skala modularna ~1.25, baza odstępów 8 px, siatka 12 kolumn, max-width 1280 px, małe zaokrąglenia (4–8 px = ostrość/precyzja), płaskie cienie.
- Motyw kompozycyjny: cienkie linie/hairline jako „rysunek techniczny", znaczniki wymiarowe (kreski + liczba w mono) przy zdjęciach produktu, etykiety sekcji wielkimi literami z literowaniem i krótką pomarańczową kreską.

### 4.4. Układ strony głównej (sekwencja)
1. **Sticky header** (logo, menu, klikalny telefon, [Wyceń projekt]).
2. **Hero ciemne** — H1 „Fundament w jeden dzień. Precyzja do milimetra." + 2 CTA + **interaktywny render 3D bloczka**; pasek mikro-zaufania: `±1 mm` · `2000 kg` · `1 dzień` · `0 prac mokrych`.
3. **Pasek KPI** (liczby count-up).
4. **„Jak to działa"** — 3–4 kroki + scroll-driven animacja regulacji.
5. **Porównanie DrBlocks vs beton** (tabela, zielone checki vs szare myślniki).
6. **Produkty** — 3 karty (Standard / Plus / L) z renderem i 3 parametrami w mono.
7. **Parametry techniczne** — format „karta danych" + diagram wymiarowy.
8. **Dowód społeczny** — realizacje, logo klientów, opinie, certyfikaty/atesty.
9. **Zastosowania** — kafelki segmentów.
10. **Sekcja konwersji** — kalkulator/formularz wyceny + telefon + e-mail.
11. **Footer** — pełne dane podmiotu, kontakty, dokumenty, social.

### 4.5. Ścieżka konwersji (B2B, malejące tarcie)
1. **Telefon** klikalny w headerze i przy każdym CTA (`tel:+48506057727`).
2. **Kalkulator wyceny (główny magnes)** — krótki kreator 3-krokowy (typ obiektu → wymiary/obciążenie → max 5 pól kontaktu) → wynik: liczba bloczków + rekomendowany wariant + „dokładna wycena w 24–48 h".
3. **Formularz zapytania ofertowego** — prosty, z wyborem adresata (handel vs ogólny), opcjonalny upload PDF projektu.
Zasady: jeden dominujący CTA na sekcję; CTA kontekstowe; sticky pasek mobilny (Zadzwoń / Wyceń); walidacja inline; lekki lead-scoring (wykonawca/inwestor/projektant).

### 4.6. Mobile, dostępność, wydajność
Mobile-first (≥360 px), sticky dolny pasek CTA, cele dotykowe ≥44 px. WCAG 2.2 AA: kontrast ≥4.5:1, `prefers-reduced-motion` wyłącza count-up/scroll-3D, 3D degraduje do statycznego obrazu, pełna obsługa klawiatury i focus. Wydajność: WebP/AVIF, `srcset`, kompresja glTF (Draco), lazy-load 3D, cel CWV — LCP <2,5 s, CLS <0,1, INP <200 ms; model 3D nie blokuje LCP.

---

## 5. REKOMENDOWANE NOWOCZESNE FUNKCJE — ranking WPŁYW vs NAKŁAD

| # | Funkcja | Co robi | Technologia | Złożoność (nakład) | Wpływ | Werdykt |
|---|---|---|---|---|---|---|
| 1 | **Kalkulator doboru/wyceny + formularz** | Użytkownik podaje wymiary obiektu, rozstaw, typ obciążenia → dostaje liczbę bloczków, rekomendowany wariant (Standard/Plus/L), szacunkowy koszt i CTA „wyślij zapytanie" z prewypełnionymi danymi | React/JS komponent, rysunek siatki SVG/Canvas, API route / Formspree → e-mail + CRM | **Niska** (logika) / niska-średnia (z rysunkiem siatki + walidacją nośności 2000 kg) | **Bardzo wysoki** | **NAJPIERW.** Największa luka konwersyjna, najwyższy ROI, czysta matematyka. Wymaga danych od firmy (cena jednostkowa, rekomendowany rozstaw, waga). |
| 2 | **Suwak before/after** | Pokazuje „beton vs DrBlocks", „teren przed/po niwelacji" | JuxtaposeJS / lekki web-component (clip-path) | **Bardzo niska** | Średni-wysoki | **Quick win.** 1 dzień roboczy, potrzebne 2 dobre zdjęcia/rendery. |
| 3 | **Wizualizacja 3D bloczka** | Obrót/zoom modelu, klikalne hotspoty (śruba regulacyjna, chwytak magnetyczny, stopa), opcjonalna animacja „exploded view" | Google `<model-viewer>` (Apache 2.0, jeden tag HTML), model GLB/glTF | **Niska-średnia** (model-viewer) / wysoka (custom R3F z animacją) | **Wysoki** | **Tak.** Bloczek to prosta geometria → tani model ($100–500 lub eksport z CAD). Jeden model obsługuje też AR. Duży efekt nowoczesności. |
| 4 | **AR „zobacz u siebie"** | Postawienie wirtualnego bloczka w realnej przestrzeni telefonem | model-viewer (`ar`, GLB + USDZ); iOS AR Quick Look / Android Scene Viewer | **Niska** (dodatek do #3) | Średni | **Tak**, skoro prawie darmowe przy model-viewer. Efekt wow marki (dla bloczka bardziej wizerunkowy niż twardo konwertujący). |
| 5 | **Animacja „jak to działa" / regulacja wysokości** | Tłumaczy hasło „precyzja co do mm" i montaż w 1 dzień (bloczek „rośnie" 0–55 mm) | Lottie (JSON z After Effects) / CSS+SVG+GSAP ScrollTrigger / animacja w glTF | **Niska-średnia** | Średni-wysoki | **Tak.** Koszt głównie po stronie produkcji animacji, nie kodu. |
| 6 | **Planer/konfigurator fundamentu 2D** | Użytkownik rysuje obrys obiektu → narzędzie rozkłada bloczki na siatce, liczy liczbę, pokazuje regulację na nierównym terenie → łączy się z kalkulatorem wyceny | Konva.js / Fabric.js na Canvas (wzorzec: deckplanner.site); open-source react-planner/Arcada jako baza | **Średnia** (~3–6 tyg. deva) | **Wysoki** | **Etap 2.** To kalkulator (#1) rozbudowany o rysowanie obrysu + wizualną siatkę. Daje 90% wartości pełnego 3D ułamkiem kosztu. Przewaga first-mover. |
| 7 | **Planer/konfigurator fundamentu 3D** | Pełne 3D: rozmieszczanie bloczków na rzucie, teren, różne wysokości słupków (do 55 mm), walidacja nośności, eksport | React Three Fiber + drei, **InstancedMesh** (setki bloczków w jednym draw-call) | **Wysoka** (miesiące / agencja) | Wysoki (wow) | **Później / opcjonalnie.** Tylko po walidacji popytu z faz 1–2. Największy wyróżnik kategorii, ale wymaga osobnej wyceny technicznej. |

**Synteza dla trzech funkcji wymaganych w briefie:**
- **Kalkulator doboru/wyceny** — priorytet #1, najwyższy ROI. Logika gotowa jako szkielet (siatka rozstawu + walidacja 2000 kg/bloczek); brakuje danych firmowych do kalibracji (cena, rozstaw, waga, ciężary referencyjne).
- **Wizualizacja 3D bloczka** — priorytet #3, tania i efektowna, baza pod AR i animacje. Jeden model GLB obsługuje wizualizację + hotspoty + AR + animację „jak działa".
- **Konfigurator/planer fundamentu 3D** — najambitniejszy; rekomendacja: najpierw **wariant 2D (#6)**, pełne 3D (#7) dopiero po walidacji popytu.

---

## 6. PLAN SEO I TREŚCI

**Kontekst:** w niszy „regulowanych bloczków fundamentowych" praktycznie brak bezpośredniej konkurencji produktowej w SERP — DrBlocks może zdominować długi ogon, zanim zrobi to ktoś inny.

### 6.1. Kluczowe klastry fraz
- **Rdzeniowe/produktowe (niska konkurencja, wysoka konwersja):** „regulowane bloczki fundamentowe", „fundament bez betonowania", „fundament w jeden dzień", „fundament wielokrotnego użytku", „prefabrykowany fundament punktowy".
- **`fundament pod [obiekt]` — priorytet #1 (transakcyjny long-tail):** dom modułowy, kontener / dom kontenerowy, **domek holenderski** (gorąca nisza), domek mobilny, domek letniskowy, dom szkieletowy, taras, garaż blaszany, altana/wiata, hala/pawilon (B2B).
- **Konkurencyjne/porównawcze (przechwyt ruchu pali śrubowych — duży wolumen):** „pale śrubowe / fundamenty śrubowe cena", „fundament punktowy cena/rozstaw", „fundament punktowy a płyta", „ile kosztuje fundament pod dom modułowy", „bloczki vs wylewany beton", „fundament na gruncie pochyłym".
- **Informacyjne (góra lejka, featured snippets):** „jaki fundament pod [obiekt]", „czy domek mobilny/letniskowy wymaga fundamentów", „fundament bez pozwolenia/zgłoszenia", „nośność gruntu", „głębokość przemarzania gruntu Polska mapa" (link magnet).

### 6.2. Mapowanie na strony (silosy)
Każdy landing `fundament-pod-[obiekt]` = osobny URL z osadzonym kalkulatorem i CTA. Linkowanie: wpis blogowy (info) → landing (transakcja) → strona produktu + kalkulator. Strony produktów jako osobne URL pod Schema Product.

### 6.3. Blog — 15 tematów priorytetowych (min. 2 wpisy/mies.)
Filary: (1) „Jaki fundament pod dom modułowy? Przewodnik 2026", (2) „Jaki fundament pod domek holenderski", (3) „Fundament pod kontener mieszkalny — opcje i koszty", (4) **„Pale śrubowe czy regulowane bloczki? Porównanie"** (kluczowy przechwyt), (5) „Fundament punktowy a płyta — co tańsze".
Kosztowe: (6) „Ile kosztuje fundament pod domek… 2026" (→ kalkulator), (7) „Ile bloczków potrzebujesz? Rozstaw i liczba podpór".
Problemowe/techniczne: (8) „Fundament bez betonowania", (9) „Fundament na działce pochyłej / nierównym terenie", (10) „Fundament pod taras — bloczki vs wsporniki", (11) „Fundament pod garaż blaszany", (12) „Czy domek holenderski/mobilny wymaga fundamentów — przepisy".
Edukacyjne/wsparcie sprzedaży: (13) „Głębokość przemarzania gruntu w Polsce — mapa", (14) „Nośność gruntu pod lekki dom", (15) „Montaż DrBlocks w 1 dzień — case study / instrukcja" (wideo).
Dodatkowo: wprowadzić **kategorie** (Fundamenty pod obiekty modułowe / Porównania technologii / Poradniki montażu / Koszty i wycena) zamiast „Uncategorized".

### 6.4. On-page i techniczne
- Wzorce title/meta z USP (1 mm / 1 dzień / 2 t / bez betonu) + CTA; jeden H1 = jedna główna fraza.
- **Schema:** Organization/LocalBusiness (telefon, e-mail firmowy, adres, areaServed: Polska), **Product** (na produktach; Offer/AggregateOffer), **FAQPage** (rozbudowane FAQ), BreadcrumbList, Article/BlogPosting, **HowTo** (montaż).
- Poprawić OG image (zastąpić wąski baner), alt-teksty z frazami, linkowanie wewnętrzne (największa niewykorzystana dźwignia), Core Web Vitals (3D ładowane lazy).
- **Google Business Profile** + katalogi branżowe.
- **Linki:** współpraca z producentami obiektów (wzajemne „rekomendowany fundament"), portale (muratordom, extradom, inzynieria.com), link magnets (kalkulator, planer, mapa przemarzania), grupy FB, fora.

---

## 7. ROADMAPA WDROŻENIA W FAZACH

### FAZA 0 — Fundament redesignu i higiena (przed/równolegle)
- Decyzja o stacku: optymalizacja WordPress (WebP/AVIF, HTTP/2-3, redukcja CSS/JS) **lub** migracja na Next.js/React (czystsza integracja 3D/kalkulatora). Rekomendacja: nowoczesny stack jeśli budżet pozwala.
- Naprawa higieny: firmowy e-mail do RODO, spójne nazewnictwo, wyróżniony „Kontakt/Wyceń" w headerze, pełne dane podmiotu w stopce.
- **Domknięcie luki 404:** utworzenie pełnej strony produktu **Standard Block L** (lub usunięcie wzmianki z FAQ — rekomendowane: utworzenie).

### FAZA 1 — MVP konwersyjne (najszybsze leady)
- Nowa strona główna wg układu 4.4 + system designu (kolory/typografia).
- Strony produktów (Standard / Plus / L) z kartą danych + PDF do pobrania.
- **Kalkulator doboru/wyceny + formularz** (funkcja #1) i **suwak before/after** (#2).
- Strona „Jak to działa", rozbudowane FAQ (Schema FAQPage), strona Kontakt z pełnymi danymi.
- Podstawowy zestaw landingów `fundament-pod-[obiekt]` (3–4 najgorętsze: dom modułowy, kontener, domek holenderski, taras).
- SEO on-page + Schema Product/Organization, Google Business Profile, ożywienie bloga (kategorie + pierwsze 4–6 wpisów filarowych).

### FAZA 2 — Nowoczesność marki i autorytet
- **Wizualizacja 3D bloczka** (model-viewer + hotspoty, #3) + **AR** (#4) + **animacja „jak to działa"** (#5) — jeden model GLB obsługuje wszystkie trzy.
- Sekcja **Realizacje / case studies** (gdy dostępne materiały), logo klientów, opinie, certyfikaty/DoP/CE.
- Pełen zestaw landingów zastosowań + sekcja **Do pobrania** (karty techniczne, katalog, rysunki).
- Rozbudowa bloga do pełnych 15 tematów, link building, strefa B2B `/dla-wykonawcow/`.

### FAZA 3 — Przewaga konkurencyjna
- **Planer fundamentu 2D** (#6) jako rozszerzenie kalkulatora (rysowanie obrysu → siatka bloczków).
- **Planer/konfigurator 3D** (#7) — tylko po walidacji popytu z faz 1–2; osobna wycena techniczna.
- Ewentualna wielojęzyczność (eksport), strony regionalne („fundament pod dom modułowy [region]").

---

## 8. OTWARTE PYTANIA / CZEGO POTRZEBUJEMY OD KLIENTA

**Materiały produktowe i wizualne**
- [ ] **Model 3D / CAD/DWG bloczka** — czy istnieje? (przesądza: tani eksport vs modelowanie od zera).
- [ ] Profesjonalne **zdjęcia produktu** (detal betonu, stali, gwintu) i **zdjęcia/filmy z montażu**.
- [ ] **Realizacje / portfolio** — lokalizacje, typy obiektów, zgody na publikację.
- [ ] **Logo klientów/partnerów** i zgody; **opinie/referencje** wykonawców.
- [ ] Logo DrBlocks w wektorze + ewentualny brandbook.

**Dane techniczne i sprzedażowe (krytyczne dla kalkulatora)**
- [ ] **Cennik / ceny jednostkowe** każdego wariantu (czy publikujemy ceny czy tylko „wycena"?).
- [ ] **Waga bloczka** (każdy wariant).
- [ ] **Rekomendowany rozstaw** bloczków pod legary/belki i zależność od obciążenia.
- [ ] **Ciężary referencyjne** typowych obiektów (do walidacji nośności 2000 kg).
- [ ] Pełne dane **Standard Block L** (wymiary, nośność, regulacja).
- [ ] Wymiary całkowite korpusu betonowego (podana tylko stopa 195×205×5 mm).
- [ ] **Oficjalna instrukcja montażu** krok po kroku + rysunki techniczne / karty PDF.

**Wiarygodność i firma**
- [ ] **Certyfikaty / atesty / DoP / CE / badania nośności** betonu B30 — czy istnieją?
- [ ] **Miejsce produkcji** / model produkcji (własny zakład vs podwykonawca) — do narracji „O nas".
- [ ] Historia firmy, zespół, „twarz" marki do strony „O nas".
- [ ] **Firmowy e-mail do RODO** (zastąpić prywatny Gmail).
- [ ] Logistyka: dostawa, MOQ, czas realizacji, gwarancja, obszar obsługi (areaServed).

**Strategiczne / decyzyjne**
- [ ] Czy publikujemy ceny/widełki (wpływa na Schema Offer i kalkulator)?
- [ ] Preferowany stack (optymalizacja WP vs migracja na Next.js)?
- [ ] Budżet i priorytet na 3D/planer (przesądza zakres faz 2–3)?
- [ ] Plany eksportowe (czy projektować pod wielojęzyczność)?
- [ ] Dostęp do analityki i Search Console (do priorytetyzacji SEO).

---

## NIEPEWNE / DO WERYFIKACJI

1. **Status CEIDG firmy** — agregator (egospodarka.pl) pokazuje „podmiot zawieszony", co kłóci się z aktywną sprzedażą. Prawdopodobnie dane archiwalne. Zweryfikować w aplikacja.ceidg.gov.pl po NIP 9372592697.
2. **Pełna, aktualna lista PKD** — źródła rozbieżne (część podaje tylko kody sportowo-rekreacyjne, część szerszy zestaw z metalem/budownictwem).
3. **Tożsamość i tło Jakuba Stryjewskiego** — możliwy (niepotwierdzony) trop byłego narciarza alpejskiego z FIS; charakter pierwotnego biznesu „JimmyWorld" nieustalony.
4. **Parametry Standard Block L** — brak karty produktu (404); dane wyłącznie z FAQ. Wymiary/nośność/regulacja wariantu L niepotwierdzone.
5. **Rozbieżność „55 mm" vs „120–200 mm"** — wymaga ujednolicenia komunikatu z firmą.
6. **Brak danych do kalkulatora:** waga bloczka, cena jednostkowa, rekomendowany rozstaw, ciężary referencyjne obiektów — bez nich kalkulator daje jedynie szacunki.
7. **Certyfikaty/atesty/DoP/CE/badania nośności** — nie znaleziono i nie są deklarowane; do potwierdzenia z firmą.
8. **Miejsce produkcji** — nieujawnione; wniosek o modelu zleconym to hipoteza, nie fakt.
9. **Rejestracja znaku towarowego „DrBlocks"** — nieznaleziona w UPRP/EUIPO (wyszukiwarki formularzowe); sprawdzić ręcznie.
10. **Wartość rynku modułowego** — rozbieżność PMR (4,4–4,6 mld zł) vs Spectis (5,0–5,1 mld zł); różne metodologie. Udziały segmentów/materiałów w płatnych raportach.
11. **Realne Core Web Vitals i responsywność obecnej strony** — ocena oparta na nagłówkach HTTP i analizie HTML, bez Lighthouse/renderu przeglądarki.
12. **Wolumeny i trudność fraz SEO** — szacowane jakościowo (brak Ahrefs/Senuto); zweryfikować przed finalną priorytetyzacją.
13. **Numer telefonu +48 506 057 727** — widnieje na stronie głównej, ale nie w pozyskanych rekordach CEIDG/polityce prywatności; potwierdzić jako oficjalny kontakt.
14. **Brak twardego dowodu na nieistnienie konkurenta** w PL/EU oferującego identyczny regulowany bloczek betonowy — silna przesłanka „pioniera kategorii", ale nie dowód negatywny.
