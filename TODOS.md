# TODOS

## Measurement

### Isolate whether structured JSON-LD specifically moves AI answers

**What:** When re-running the Success Criteria test queries at 2/6 weeks, also test a control — whether plain readable text alone (no JSON-LD) would produce the same improved answer — or otherwise design the checkpoint so it can distinguish "the markup helped" from "the content existing at all helped."

**Why:** PLANNING.md's success measurement currently can't tell these apart. Structured JSON-LD is separately required to pass Google's Rich Results Test and validator.schema.org (which validates the markup is correct), but that's a different claim from "this specific markup format is what changed the AI's answer." Flagged by an independent outside-voice review during /plan-eng-review — not a blocker, but worth knowing before treating a good checkpoint result as proof the schema.org investment specifically paid off.

**Context:** Surfaced 2026-08-13 during architecture review of the Structured Content Core plan. Doesn't change anything about how the site gets built — only how the 2-week/6-week measurement should be designed to be conclusive.

**Effort:** S
**Priority:** P2
**Depends on:** None

### Add noise control to the success-criteria measurement

**What:** Run each test query 3x per AI tool at each checkpoint (2-week, 6-week) instead of once, and log all runs rather than a single answer.

**Why:** LLM outputs vary run-to-run, and models get updated silently between checkpoints. A single sample per query can't distinguish "the content fix worked" from "got a different random answer this time" — turns the sponsor's before/after proof artifact from an anecdote into something defensible.

**Context:** Flagged by outside-voice review during /plan-eng-review (2026-08-13). Applies at measurement time, not implementation time — no code changes needed now, just remember this when actually running the 2-week checkpoint.

**Effort:** S
**Priority:** P2
**Depends on:** Site must be live (see "Hosting/DNS cutover decision" below)

## Content & Operations

### Decide non-technical content-editing solution

**What:** Confirm who at WWIS will maintain tuition/staff/admissions content post-launch and whether they're comfortable editing Markdown via GitHub. Based on that, decide: plain Markdown files (developer/technical-comfort workflow) vs. a lightweight headless CMS (Decap CMS, Sanity) layered on top of the same Content Collections.

**Why:** PLANNING.md's premise #3 is that this architecture only works if someone keeps facts current quarterly. If the real content owner can't self-serve plain Markdown/git, that premise silently fails after launch even though the code is correct.

**Context:** Open Question from PLANNING.md, carried through /plan-eng-review (2026-08-13) unresolved. Doesn't block the tuition-first build — plain Markdown works fine for the first topic — but should be resolved before extending the pattern to the other 4 topics, since it may change how those are authored.

**Effort:** S (conversation/decision, not code — CMS integration itself would be M if chosen)
**Priority:** P1
**Depends on:** None

### Hosting/DNS cutover decision

**What:** Pick a host (Vercel, Netlify, or Cloudflare Pages), set up git-push auto-deploy, and plan the DNS cutover window moving wwistrichy.com off the current WordPress host.

**Why:** This is what actually starts the 2-week/6-week success-criteria clock from PLANNING.md — there's no "post-launch" checkpoint without a launch. Confirmed during /plan-eng-review that this does NOT block writing code (the site builds as fully static output, no server adapter needed), but it does block going live.

**Context:** Open Question from PLANNING.md, carried through /plan-eng-review (2026-08-13) unresolved. Can happen in parallel with implementation.

**Effort:** S
**Priority:** P1
**Depends on:** None

### Off-site accuracy audit (Google Business Profile, directories, review sites)

**What:** Audit and correct WWIS's listing on the 3-5 highest-traffic third-party sources for the same facts being fixed on-site (tuition, address, curriculum).

**Why:** PLANNING.md's own Landscape Findings say GEO (Generative Engine Optimization) is ~80% strategic/off-site and only ~20% technical. The on-site Structured Content Core build (everything reviewed in /plan-eng-review) only addresses the smaller half of the actual problem — AI systems weight brand/entity mentions across the whole web, not just the owned site.

**Context:** Explicit parallel workstream from PLANNING.md's Off-Site Accuracy section — a content-accuracy task, not a build task. Doesn't block or get blocked by the code work. Owner not yet assigned (also an open question in PLANNING.md: "who owns quarterly content review... same person as off-site audit, or someone else?").

**Effort:** S-M
**Priority:** P1
**Depends on:** None

## Implementation

### Extend Structured Content Core pattern to remaining 4 topics

**What:** Once the tuition topic proves the pattern end-to-end (content.config.ts schema, schema-mapper function, JsonLd rendering, empty-collection guard), repeat it for admissions (HowTo), staff (Person), curriculum (Course), and contact (EducationalOrganization — the canonical entity source).

**Why:** PLANNING.md's Recommended Approach explicitly sequences this as "build the pattern once, prove it on tuition, then extend" — this TODO is that extension step, not a new architectural decision.

**Context:** Blocked on real content being gathered for each topic (PLANNING.md's "Assignment" — tuition content should be gathered first, per the founder's own sequencing). Contact should likely go early since it's the canonical entity source that tuition and curriculum pages reference by @id.

**Effort:** M
**Priority:** P1
**Depends on:** Tuition topic shipped and proven; real content gathered for each remaining topic
