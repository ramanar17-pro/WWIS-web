# Works Done

Status snapshot as of 2026-08-13.

## Done

- **PLANNING.md** — approved architecture doc (Structured Content Core: Astro Content Collections, schema.org JSON-LD per topic, tuition-first sequencing).
- **DESIGN.md** — approved visual system (dark-mode glassmorphism, Space Grotesk/Instrument Sans/JetBrains Mono, crimson/orange/cyan).
- **`/plan-eng-review`** — architecture locked: Astro version, JSON-LD generation approach, canonical `EducationalOrganization` entity + `@id` pattern, script-injection escaping, empty-collection guard, CI validation step. 6 deferred items captured in `TODOS.md`.
- **Working scaffold, built and tested**, committed (`3511386`) and pushed to GitHub:
  - `content.config.ts` (contact + tuition schemas)
  - `schema-mappers.ts`, `JsonLd.astro` (with the `</script>` escaping fix)
  - `tuition.astro` — proven to render correctly with **zero** real content (the actual current state)
  - CI JSON-LD validation script wired into `npm run build`
  - Vitest suite, 9/9 passing, including the injection regression test
  - `contact/main.md` exists but is **placeholder-only**, clearly marked as such

## What's actually blocking progress right now — not code

1. **Real content.** Per PLANNING.md's own "Assignment": get real tuition figures (or feeRange if exact numbers aren't approved for publishing), the real address/phone/office-hours for the contact entity, from whoever owns that info at WWIS. Nothing else meaningfully moves until this exists — the architecture is proven, it just has no real facts in it.
2. From `TODOS.md`, unblocked but undecided:
   - Who maintains content long-term (plain Markdown/git vs. a CMS like Decap)
   - Hosting choice (Vercel/Netlify/Cloudflare Pages) + wwistrichy.com DNS cutover — this is what starts the 2-week/6-week success-criteria clock
   - Off-site accuracy audit (Google Business Profile, directories) — the "80% of GEO is off-site" half of the problem, doesn't touch code
3. Once tuition has real content and ships, extend the same pattern to admissions, staff, curriculum, contact (in that rough order — contact should go early since it's the canonical entity source).

Short version: the machine is built and proven. It's waiting on real facts, not more engineering.
