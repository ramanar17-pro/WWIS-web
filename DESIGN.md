# Design System — WWIS (Wisdom Wealth International School)

## Product Context
- **What this is:** Rebuilt marketing/admissions website for Wisdom Wealth International School, Trichy — replacing the current WordPress site.
- **Who it's for:** Prospective parents researching Cambridge-curriculum schools (directly, and increasingly via AI search/chat tools), plus current families checking admissions/tuition/curriculum info.
- **Space/industry:** K-12 international education, Cambridge curriculum, Trichy/Tamil Nadu.
- **Project type:** Marketing + admissions site, static build (Astro/Next.js-class stack per `PLANNING.md`).
- **Note:** This site's first build phase is the AI-visibility/structured-content foundation described in `PLANNING.md` (tuition, admissions, staff, curriculum, contact). This DESIGN.md governs the visual system those pages — and everything after — are built in.

## Aesthetic Direction
- **Standing rule (do not deviate without explicit founder approval):** Page background is **white, always**. The design is a direct copy of innovaschools.edu.pe's structure and feel — full-bleed gradient hero, nav-on-hero, bold headline with a highlighted phrase, pill CTA, large photo — rebuilt with WWIS's own logo, logo-derived colors (navy/crimson/orange), the real founder-supplied photo, and Poppins/Nunito Sans. Everything below the hero returns to plain white. This is v4, approved 2026-08-17. See Decisions Log for the full pivot history (v1 dark AI-native → v2 Comic Sans/purple → v3 logo colors, Innova-referenced → v4 Innova-copied).
- **Decoration level:** Moderate — one full-bleed gradient hero per page, card sections below it on white. Not maximalist, not flat/plain either.
- **Mood:** Warm, trustworthy, "real school, real kids" — balances professionalism (it's still an accredited Cambridge school parents are trusting with their kids) with approachability. Explicitly *not* Comic Sans/cartoonish (v2) and *not* the dark AI-native chrome (v1).
- **Reference:** [innovaschools.edu.pe](https://www.innovaschools.edu.pe/) — copied directly (see `Screenshots/image.2.png`, the founder-supplied reference screenshot), not just loosely inspired by. Structure: full-width gradient photo hero, horizontal nav overlaid on the hero, card-based sections, alternating text/image feature blocks below.

## Typography
- **Headings:** Poppins (700/600) — bold, rounded-geometric sans. Reads warm and modern without being cartoonish; close to the weight/character Innova uses for its headline type.
- **Body:** Nunito Sans (400/600) — clean, rounded-friendly, highly legible at small sizes. Serves the AI-crawlability goal from `PLANNING.md`: body content must stay plain, readable text regardless of visual chrome.
- **Loading:** Google Fonts CDN (`Poppins` 600/700, `Nunito Sans` 400/600).
- **Scale:** Hero h1 40–56px / Section h2 28–34px / Card h3 18–20px / Body 16px / Labels 13px (uppercase, bold, crimson).
- *(Superseded: v2 used Comic Sans MS/Comic Neue — no longer loaded. v1 used Space Grotesk/Instrument Sans/Fraunces/JetBrains Mono.)*

## Color
- **Approach:** Light-mode-only, colors drawn directly from the WWIS logo rather than invented. Page background is **white, always** — the one deliberate exception is the full-bleed hero band at the top of each page, which carries the navy→crimson→orange gradient (see Layout). Everything else — nav on non-hero pages, card sections, all content below the hero — is white.
- **White** `#FFFFFF` — primary page background, always.
- **Navy** `#1B3B63` — from the logo's open-book mark and wordmark. Primary text color for headings, nav.
- **Crimson** `#A91E5C` — from the logo's tulip/person emblem. Primary accent — CTAs, labels, key highlights.
- **Orange** `#F2941F` — from the logo's dot accent. Secondary accent, used sparingly (small highlights, not large fills).
- **Slate (muted)** `#6B7A8F` — secondary/muted text, close to the logo's gray "INTERNATIONAL SCHOOL" subtext.
- **Crimson Soft** `#FBE7EF` / **Navy Soft** `#EAF0F7` — pale tints for section backgrounds and card fills (alternating, Innova-style).
- **Card surfaces:** white or pale-tint fill, `1px` solid navy-tinted border (`rgba(27,59,99,0.12)`), soft drop shadow — no blur/backdrop-filter.
- **Logo handling:** unchanged — the WWIS logo already has a white background, so it sits directly on the page background with no special plate/chip needed.
- **Dark mode:** Not in scope.

## Photography
- **Direction:** Authentic, in-the-moment student photography (classroom, activities, campus life) — not stock-photo-posed, per the Innova reference.
- **Status:** Founder supplied a real photo (`image.png` → `public/photos/tuition-hero.png`) — a classroom moment with students and a teacher, WWIS branding visible. Now used in the tuition page hero. Source file is small (330×247px); it will look soft at large display sizes — flag to the founder that a higher-resolution version is needed before public launch.
- **Constraint:** Illustrated placeholders (navy/crimson/orange abstract shapes, see `PhotoPlaceholder.astro`) remain the fallback for topics without a real photo yet (admissions, staff, curriculum) — never substitute a stock photo of unrelated children. Real photos are a content dependency, same category as tuition figures in `PLANNING.md`'s Dependencies.

## Spacing
- **Base unit:** 8px.
- **Density:** Comfortable-to-spacious. Section padding 100–120px vertical; hero padding 100px.
- **Scale:** 2xs(4) xs(8) sm(16) md(24) lg(40) xl(64) 2xl(100+).

## Layout
- **Approach (v4, current):** Directly modeled on innovaschools.edu.pe's actual homepage hero (founder supplied a screenshot, `Screenshots/image.2.png`) — full-bleed diagonal gradient hero band, transparent nav overlaid on top of it, bold white headline with one highlighted phrase, light subhead, pill CTA button, large photo bleeding into the band. Below the hero, page content returns to a plain white background — this is the one deliberate colored exception to "white background always."
- **Hero band:** full-bleed section (breaks out of the 1240px container to span the viewport), diagonal gradient `navy → crimson → orange` (`linear-gradient(135deg, ...)`, matching Innova's blue→teal→green diagonal but in WWIS's own logo colors). Two low-opacity decorative shapes (circle, rotated rounded square) add texture, echoing Innova's geometric background without copying their specific iconography/assets.
- **Nav on the hero:** transparent, positioned over the gradient (`Nav.astro`'s `variant="on-gradient"`), white nav-link text, logo wrapped in a white rounded "chip" (reapplies the original logo-handling rule below — the WWIS logo has a white background baked in and needs a light plate on any dark/colored surface). Non-hero pages keep the default `variant="light"`: plain white bar, navy text.
- **Hero copy:** eyebrow label, `h1` in white with one phrase highlighted in soft gold (`#FFE9B0`), a short subhead, and a pill CTA button in orange with white text — CTA scrolls to the fees grid (`#fees`), it does not link anywhere fake.
- **Hero photo:** the real founder-supplied photo, enlarged, rounded corners, drop shadow — sits directly in the gradient band rather than a separate white card. **Not a background-removed cutout** (unlike Innova's photo, which is clearly knocked out of its background) — that requires actual photo editing/segmentation tooling this project doesn't have. Flagged as a follow-up if the founder wants that exact look.
- **Nav logo (non-hero pages):** 64px tall.
- **Grid:** 3-column card grids on desktop, collapsing to 2 then 1 on smaller breakpoints (900px, 860px).
- **Max content width:** 1240px container (the hero band is the one deliberate exception, going full-bleed).
- **Border radius:** hierarchical — pills/badges/buttons `999px`, cards `16–20px`, large panels/hero image `24px`.

## Motion
- **Approach:** Light and functional, not a differentiator — kept minimal.
- **Interactive:** Subtle `translateY(-6px)` lift on card hover. No glow, no gradient-border reveal, no background orbs.
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
| 2026-08-17 | **Pivoted** (v2) from dark futuristic-editorial (v1) to a light, kid-friendly system: white background always, purple/pink accents, Comic Sans lettering | Founder explicit request — site should feel kid-friendly, not "AI-native/futuristic" |
| 2026-08-17 | **Pivoted** (v3) from v2's invented purple/pink/Comic Sans to logo-derived colors (navy/crimson/orange from the real WWIS logo) + Poppins/Nunito Sans, layout and photography direction referenced from innovaschools.edu.pe | Founder pointed to the actual logo and a real peer-school site rather than an invented playful direction — grounds the palette in the school's real brand instead of a guess |
| 2026-08-17 | Enlarged the logo (nav + a big hero placement), added a full-bleed faded color wash behind the hero (navy/crimson/orange, low-opacity), and swapped the illustrated hero placeholder for a real founder-supplied student photo | Founder asked for a bigger, more colorful logo treatment and to use the real photo (`image.png`) instead of a placeholder |
| 2026-08-17 | Replaced the faded-wash hero with a fully colored diagonal gradient hero band (navy→crimson→orange), transparent nav-on-gradient with a logo chip, white headline/highlight/CTA — directly modeled on an innovaschools.edu.pe screenshot the founder supplied | Founder pointed to a specific reference screenshot and asked to match it "fully," not just take inspiration from the general layout |
| 2026-08-17 | Clarified/consolidated DESIGN.md (v4): restated the standing rule explicitly — page background white always, hero band is the one deliberate colored exception, design directly copies innovaschools.edu.pe's structure rather than just referencing it | Founder asked me to re-confirm and update the doc to make sure this was correctly captured, not buried across the pivot history |
