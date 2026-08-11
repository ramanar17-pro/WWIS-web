# Design System — WWIS (Wisdom Wealth International School)

## Product Context
- **What this is:** Rebuilt marketing/admissions website for Wisdom Wealth International School, Trichy — replacing the current WordPress site.
- **Who it's for:** Prospective parents researching Cambridge-curriculum schools (directly, and increasingly via AI search/chat tools), plus current families checking admissions/tuition/curriculum info.
- **Space/industry:** K-12 international education, Cambridge curriculum, Trichy/Tamil Nadu.
- **Project type:** Marketing + admissions site, static build (Astro/Next.js-class stack per `PLANNING.md`).
- **Note:** This site's first build phase is the AI-visibility/structured-content foundation described in `PLANNING.md` (tuition, admissions, staff, curriculum, contact). This DESIGN.md governs the visual system those pages — and everything after — are built in.

## Aesthetic Direction
- **Direction:** AI-native / futuristic-editorial — dark-mode-first, glassmorphism, animated gradient glow, bold geometric type.
- **Decoration level:** Expressive.
- **Mood:** Confident, premium, unmistakably "not another templated school site." Feels like a modern product launch, not a brochure.
- **Origin:** Built through iteration in `/design-consultation` — first pass was a safe navy+serif "traditional school" direction (grounded directly in the WWIS logo), which the founder rejected as "old." This dark, glowing, motion-forward system is the approved direction. See Decisions Log.
- **Reference:** No external reference sites — direction was generated and iterated via live HTML previews (v1 traditional → v2 dark/glow → v3 big-logo hero), approved by the founder directly.

## Typography
- **Display/Hero:** Space Grotesk (700) — bold geometric sans for headlines, big scale (44–76px), often rendered with a gradient text-fill (white → crimson → orange).
- **Body:** Instrument Sans (400/500/600) — clean, highly legible. This also serves the AI-crawlability goal from `PLANNING.md`: body content must stay plain, readable text regardless of the visual chrome around it.
- **Accent/quote:** Fraunces (italic, 500) — used sparingly for short callout lines (e.g. "— the individual child, always."). This is the one deliberate nod back to the logo wordmark's serif gravitas.
- **System/labels/data:** JetBrains Mono (400/500) — badges, "live" tags, table headers, footer, section labels (`// OUR PROGRAMS`). Reinforces the tech/AI-native mood.
- **Loading:** Google Fonts CDN (`Space Grotesk`, `Fraunces`, `Instrument Sans`, `JetBrains Mono`).
- **Scale:** Hero h1 64–76px / Section h2 34–42px / Card h3 19–22px / Body 16px / Labels 11.5–13px (mono, uppercase, tracked).

## Color
- **Approach:** Expressive, dark-mode-first. Dark is the default and signature look, not a toggleable alternative.
- **Void Navy** `#0A1220` — primary background.
- **Navy-2** `#0F1B2E` — secondary surface tone.
- **Crimson Glow** `#FF2D75` — primary accent (brightened from the logo emblem's `#A91E5C` for glow/gradient use). CTAs, gradient text, glow effects.
- **Ember Orange** `#FF9D3D` — secondary accent (from the logo's orange dot). Pairs with crimson in gradients.
- **Signal Cyan** `#3DE8FF` — new accent, not in the original logo. Used for "live"/status indicators, stat-number gradients, and one background orb. Reads as "AI-native" / system-status color.
- **Fog Gray** `#8B9AB0` — secondary text on dark backgrounds.
- **Text** `#EEF3FA` — primary text on dark.
- **Glass surfaces:** `rgba(255,255,255,0.04–0.05)` fill, `rgba(255,255,255,0.12)` border, `backdrop-filter: blur(10–16px)`.
- **Semantic:** success `#3DE896`, warning `#FF9D3D`, error `#FF2D75`, info `#3DE8FF` — all rendered as tinted-glass alert pills with matching border, not solid fills.
- **Logo handling:** The WWIS logo has a white background and ink colors that don't work directly on dark surfaces. **Always place the logo on a white/light plate or chip** — never directly on the dark background. (Nav: small white rounded chip. Hero: large white rounded "plate" inside the glass panel.)
- **Light mode:** Not designed. Dark is the only mode currently in scope — do not build a light-mode toggle without a follow-up design pass.

## Spacing
- **Base unit:** 8px.
- **Density:** Comfortable-to-spacious. Section padding 100–120px vertical; hero padding 100px.
- **Scale:** 2xs(4) xs(8) sm(16) md(24) lg(40) xl(64) 2xl(100+).

## Layout
- **Approach:** Hybrid bento/glass-grid. Split hero (copy left, large logo glass panel right). 3-column glass-card grids for programs. Full-bleed animated gradient-mesh background behind all sections.
- **Grid:** 3-column card grids on desktop, collapsing to 2 then 1 on smaller breakpoints (900px, 860px).
- **Max content width:** 1240px container.
- **Border radius:** hierarchical — pills/badges/buttons `999px`, cards `20px`, large panels `28–32px`.
- **Nav:** Sticky, blurred glass background (`backdrop-filter: blur(16px) saturate(160%)`), border-bottom hairline.

## Motion
- **Approach:** Expressive — this is one of the system's deliberate differentiators, not an afterthought.
- **Background:** 3 slow-floating blurred gradient orbs (crimson, orange, cyan) on independent 18–26s loops, plus a faint fixed grid overlay masked to fade toward the bottom.
- **Hero:** Staggered fade-up entrance (badge → headline → paragraph → CTAs → logo panel, ~100ms stagger).
- **Logo panel:** Two counter-rotating dashed orbit rings (28s / 40s loops) around the logo plate.
- **Interactive:** Glow-on-hover for primary buttons (`box-shadow` bloom), gradient border reveal on card hover, subtle `translateY(-6px)` lift on cards, pulsing "live" status dots.
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out) for entrances and hovers.
- **Performance/accessibility constraint (open item — must be handled at implementation):** All motion must be transform/opacity-only (GPU-cheap), and every animation must respect `prefers-reduced-motion: reduce` by disabling or drastically simplifying. This matters more than usual here because `PLANNING.md` prioritizes fast load and plain-HTML AI-crawlability — the animated chrome must never block or delay the actual text content from rendering server-side.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-08-11 | Initial proposal: navy + Fraunces serif + crimson/orange accents, minimal motion, light background | Grounded directly in the WWIS logo; "safe" category-standard direction for an international school |
| 2026-08-11 | **Rejected** the above — founder called it "old," asked for "futuristic," "mind blowing" | Founder wants WWIS to stand out from templated competitor school sites, not blend in |
| 2026-08-11 | **Approved:** dark-mode-first, glassmorphism, animated gradient glow, Space Grotesk display, expressive motion | Iterated live via HTML preview (v2), approved directly by founder |
| 2026-08-11 | **Approved:** large logo hero treatment — full logo on a glowing white glass plate with orbit rings, right side of split hero | Founder asked for the logo to be bigger/more prominent (v3 iteration) |
| 2026-08-11 | Added explicit motion/performance constraint (reduced-motion, GPU-only animation) | Not yet tested against real content — flagged so it isn't lost against the AI-crawlability priority in `PLANNING.md` during implementation |
