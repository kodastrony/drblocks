# DESIGN.md — DrBlocks

**Aesthetic:** clean engineering precision. Trustworthy, technical, modern. Light base with a deep-navy "data" sections. Faint blueprint-grid motif. Not playful, not corporate-stocky.

**Color strategy:** Restrained — tinted neutrals + navy + one teal accent (≤10% surface). Tokens in `src/app/globals.css` `@theme`:
- `navy #1e293b` (primary text, dark sections), `ink #0f172a` (footer), `slate #334155`, `steel #475569`, `mute #64748b`.
- `teal #2dbdb0` (accent), `teal-600 #16a99c`, `teal-700 #0f8c82` (text-on-light, AA), `teal-50 #e9f8f6`.
- `blue #046bd2` (brand secondary, used sparingly).
- `mist #f0f5fa` (light section bg), `line #e2e8f0`, `paper #fff`.
- Signature `magenta #e6007e` + `lime #38d430` appear ONLY inside the hero product video.

**Type (3 families max):** `Wix Madefor Display` (headings, 700), `Wix Madefor Text` (body, 400/500), `Oswald` (labels/eyebrows + tabular numbers). Loaded via next/font.

**Spacing/grid:** Tailwind scale; container max 1200px; section padding ~py-20/28. radius-2xl cards, radius-xl inputs/buttons.

**Motion:** Framer Motion. Reveal (fade+rise on in-view, once) + Stagger for lists. Ease `[0.16,1,0.3,1]` (out-expo). Hover lifts on cards (transl-y + border/shadow). `prefers-reduced-motion` respected globally + in components.

**Components:** `ui/` (Container, Button, SectionLabel, Reveal/Stagger, PageHeader, YouTubeFacade), `Icons.tsx` (UI + step icons, two-tone teal), `ProductCard`, `FaqAccordion`, `ContactForm`, `Markdown`, sections in `components/sections/`.

**Known intentional choices to weigh in audit:** section eyebrows (SectionLabel) are used — impeccable flags per-section eyebrows as an AI tell; evaluate whether to reduce. Calculator is the hero conversion feature.
