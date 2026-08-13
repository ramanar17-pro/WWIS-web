## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

## Architecture
Read PLANNING.md before making any content-schema or data-flow decisions.
Approach: Astro Content Collections, one collection per topic (tuition, admissions,
staff, curriculum, contact). Each generates both a human page and schema.org
JSON-LD from the same source. Canonical EducationalOrganization entity lives in
the `contact` collection; other collections reference it by `@id`, never duplicate
its fields. See TODOS.md for deferred decisions (CMS, hosting/DNS, off-site audit).

## Development
When starting the dev server, use background mode:
```
astro dev --background
```
Manage it with `astro dev stop`, `astro dev status`, `astro dev logs`.
