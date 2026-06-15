# Deploy na Cloudflare Pages

Strona to **statyczny eksport Next.js** (`output: 'export'`) serwowany w **korzeniu** (root, bez prefiksu `/drblocks`). Cloudflare Pages tylko serwuje gotowy folder `out/` — nie potrzeba Functions ani SSR.

## Wariant A — połączenie z repo GitHub (zalecane, auto-deploy na push)

1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Wybierz repozytorium `kodastrony/drblocks`, branch **`main`**.
3. Ustaw **Build configuration**:
   - **Framework preset:** `Next.js (Static HTML Export)` *(albo „None")*
   - **Build command:** `STATIC_EXPORT=true npx next build`
   - **Build output directory:** `out`
   - **Root directory:** `/`
4. (Opcjonalnie) **Environment variables** — żadne nie są wymagane.
   `basePath` jest puste domyślnie, więc strona działa w korzeniu.
   Node wersja brana z `.nvmrc` (20).
5. **Save and Deploy.** Każdy push na `main` = automatyczny redeploy.

> Po zbudowaniu dostaniesz adres `https://drblocks.pages.dev`. Własną domenę
> (np. `drblocks.pl`) podłączasz w **Custom domains** projektu Pages.

## Wariant B — deploy bezpośredni z CLI (wrangler)

```bash
STATIC_EXPORT=true npx next build       # tworzy out/
npx wrangler pages deploy out --project-name drblocks
```

(Konfiguracja `out` jest już w `wrangler.toml`.)

## Uwagi

- **Nie ustawiaj** `NEXT_PUBLIC_BASE_PATH` dla Cloudflare — to było tylko dla
  GitHub Pages (podścieżka `/drblocks`). Na Cloudflare strona jest w korzeniu.
- Formularz kontaktowy działa przez `mailto:` (brak backendu) — OK na statyku.
- Lokalna weryfikacja eksportu: `STATIC_EXPORT=true npm run build` → sprawdź `out/index.html`
  (ścieżki `/_next/…`, bez `/drblocks/`).
