# Design System — WWIS (Wisdom Wealth International School)

## Product Context
- **What this is:** Rebuilt marketing/admissions website for Wisdom Wealth International School, Trichy — replacing the current WordPress site.
- **Who it's for:** Prospective parents researching Cambridge-curriculum schools (directly, and increasingly via AI search/chat tools), plus current families checking admissions/tuition/curriculum info.
- **Space/industry:** K-12 international education, Cambridge curriculum, Trichy/Tamil Nadu.
- **Project type:** Marketing + admissions site, static build (Astro/Next.js-class stack per `PLANNING.md`).
- **Note:** This site's first build phase is the AI-visibility/structured-content foundation described in `PLANNING.md` (tuition, admissions, staff, curriculum, contact). This DESIGN.md governs the visual system those pages — and everything after — are built in.

## Aesthetic Direction
- **Direction (current, v2):** Kid-friendly / playful — white background always, purple + pink accents, Comic Sans lettering. Approved 2026-08-17, superseding the dark futuristic-editorial system below. See Decisions Log.
- **Decoration level:** Playful, friendly, approachable — soft rounded cards, no glow/blur effects.
- **Mood:** Warm, welcoming, fun for kids and parents alike. Not corporate, not "AI-native" — a school site that reads as friendly first.
- **Direction (superseded, v1):** AI-native / futuristic-editorial — dark-mode-first, glassmorphism, animated gradient glow, bold geometric type. Built through iteration in `/design-consultation`; kept here for history only. Do not use for new work.

## Typography
- **All headings and body text:** Comic Sans MS, with **Comic Neue** (Google Fonts) as the web fallback — Comic Sans MS is a proprietary system font and can't be embedded via CDN, so Comic Neue (an open-source visual match) is what actually renders on most browsers/OSes. Stack: `'Comic Sans MS', 'Comic Neue', cursive, sans-serif`.
- **Loading:** Google Fonts CDN (`Comic Neue`, weights 400/700).
- **Scale:** Hero h1 44–64px / Section h2 28–34px / Card h3 18–20px / Body 16px / Labels 13px (uppercase, bold, pink).
- *(Superseded: v1 used Space Grotesk / Instrument Sans / Fraunces / JetBrains Mono — no longer loaded.)*

## Color
- **Approach:** Bright, light-mode-only. White is the background **always** — no dark mode.
- **White** `#FFFFFF` — primary background, always.
- **Pink** `#FF5DA2` — primary accent. CTAs, gradient text, labels.
- **Purple** `#9B5DE5` — primary accent, pairs with pink in gradients/borders.
- **Purple Deep** `#7C3AED` — headings and strong text (better contrast on white than the accent purple).
- **Pink Soft** `#FFE3F1` / **Purple Soft** `#F1E7FE` — pastel card-fill tints (used together as a soft gradient on cards).
- **Ink** `#4B2E6B` — primary body text on white.
- **Fog (muted)** `#9C87B8` — secondary/muted text.
- **Card surfaces:** soft pink→purple pastel gradient fill, `2px` solid purple-tinted border (`rgba(155,93,229,0.28)`), soft drop shadow — no blur/backdrop-filter (that was a dark-mode-only effect).
- **Logo handling:** unchanged — the WWIS logo already has a white background, so it now sits directly on the page background with no special plate/chip needed.
- **Dark mode:** Not in scope. This is a full pivot away from the v1 dark aesthetic — do not reintroduce dark backgrounds without a follow-up design pass.

## Spacing
- **Base unit:** 8px.
- **Density:** Comfortable-to-spacious. Section padding 100–120px vertical; hero padding 100px.
- **Scale:** 2xs(4) xs(8) sm(16) md(24) lg(40) xl(64) 2xl(100+).

## Layout
- **Approach:** Simple card grid on a plain white page — no full-bleed background effects.
- **Grid:** 3-column card grids on desktop, collapsing to 2 then 1 on smaller breakpoints (900px, 860px).
- **Max content width:** 1240px container.
- **Border radius:** hierarchical — pills/badges/buttons `999px`, cards `24px`, large panels `28–32px`. Kept generously rounded to read as friendly.
- **Nav:** Plain white, border-bottom hairline. No blur/glass effect (that was dark-mode-only).

## Motion
- **Approach:** Light and friendly, not a differentiator — kept minimal.
- **Interactive:** Subtle `translateY(-6px)` lift on card hover. No glow, no gradient-border reveal, no background orbs (those were part of the superseded dark theme).
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out) for hovers.
- **Accessibility constraint:** All motion must be transform/opacity-only (GPU-cheap) and respect `prefers-reduced-motion: reduce`.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-08-11 | Initial proposal: navy + Fraunces serif + crimson/orange accents, minimal motion, light background | Grounded directly in the WWIS logo; "safe" category-standard direction for an international school |
| 2026-08-11 | **Rejected** the above — founder called it "old," asked for "futuristic," "mind blowing" | Founder wants WWIS to stand out from templated competitor school sites, not blend in |
| 2026-08-11 | **Approved:** dark-mode-first, glassmorphism, animated gradient glow, Space Grotesk display, expressive motion | Iterated live via HTML preview (v2), approved directly by founder |
| 2026-08-11 | **Approved:** large logo hero treatment — full logo on a glowing white glass plate with orbit rings, right side of split hero | Founder asked for the logo to be bigger/more prominent (v3 iteration) |
| 2026-08-11 | Added explicit motion/performance constraint (reduced-motion, GPU-only animation) | Not yet tested against real content — flagged so it isn't lost against the AI-crawlability priority in `PLANNING.md` during implementation |
| 2026-08-17 | **Pivoted** from dark futuristic-editorial (v1) to a light, kid-friendly system: white background always, purple/pink accents, Comic Sans lettering | Founder explicit request — site should feel kid-friendly, not "AI-native/futuristic" |
