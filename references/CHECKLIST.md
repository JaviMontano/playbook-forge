# CHECKLIST v1.0 -- Pre/Post/Delivery Quality Gates

> **Entrusted Standard** for the quality gates that every playbook must pass
> before delivery. Three checklists (pre-generation, post-generation,
> post-assembly) plus a final delivery gate. No exceptions.
>
> Derived from golden reference: `playbook_bu2_agile_pm_excellence_v3.html`
> and the `playbook-forge` pipeline architecture.

---

## Gate 1: Pre-Generation Checklist

> **When**: Before the LLM runs. After `compose-manifest.js` executes.
> **Who**: `compose-manifest.js` + human review of brief.json
> **Blocking**: YES -- if any check fails, do NOT invoke the LLM.

### 1.1 Brief Validation

- [ ] **PRE-1.1** -- `brief.json` exists and is valid JSON
- [ ] **PRE-1.2** -- `brief.json.topic` is non-empty string (min 5 characters)
- [ ] **PRE-1.3** -- `brief.json.roles` is array with >= 1 entry
- [ ] **PRE-1.4** -- `brief.json.tools` is array with >= 3 entries (one per core flow tool)
- [ ] **PRE-1.5** -- `brief.json.problems` is array with >= 5 entries (empathy cards)
- [ ] **PRE-1.6** -- `brief.json.dataStack` is object with `layers` array (>= 1 layer)
- [ ] **PRE-1.7** -- `brief.json.language` is `"bilingual"` or `"es"` or `"en"`

### 1.2 Manifest Validation

- [ ] **PRE-2.1** -- `compose-manifest.js` executed successfully (exit code 0)
- [ ] **PRE-2.2** -- Manifest JSON is valid and parseable
- [ ] **PRE-2.3** -- Manifest has >= 10 section entries
- [ ] **PRE-2.4** -- Manifest has >= 5 kata entries (KA-1 through KA-5)
- [ ] **PRE-2.5** -- Manifest has >= 13 flow entries (or >= 10 if custom topic)
- [ ] **PRE-2.6** -- All `GENERATE` marked fields are present (not null, not empty string)
- [ ] **PRE-2.7** -- Mandatory sections are flagged: glosario, profile, flujos, katas, nucleo, antipatrones, ritmo, empezar, cierre

### 1.3 Template Validation

- [ ] **PRE-3.1** -- Section-block templates loaded correctly for all mandatory sections
- [ ] **PRE-3.2** -- Modal templates loaded for: flow, anti-pattern, glossary, kata
- [ ] **PRE-3.3** -- CSS template (Sofka DS v5.1) loaded and non-empty
- [ ] **PRE-3.4** -- JS runtime template loaded with toggleLang, openModal, closeModal
- [ ] **PRE-3.5** -- Bilingual flag set correctly (matches brief.json.language)

### 1.4 Dependency Check

- [ ] **PRE-4.1** -- Node.js >= 18 available
- [ ] **PRE-4.2** -- All required npm packages installed (if applicable)
- [ ] **PRE-4.3** -- Output directory exists and is writable

---

## Gate 2: Post-Generation Checklist

> **When**: After LLM generates content, before assembly.
> **Who**: `validate-manifest.js` + `verify-content.js`
> **Blocking**: YES -- if any check fails, re-invoke LLM or fix manually.

### 2.1 Schema Validation

- [ ] **POST-1.1** -- `validate-manifest.js` passes (exit code 0)
- [ ] **POST-1.2** -- All manifest fields conform to expected types
- [ ] **POST-1.3** -- 0 `GENERATE` fields still empty or containing placeholder text
- [ ] **POST-1.4** -- 0 fields containing `{{PLACEHOLDER}}` markers
- [ ] **POST-1.5** -- 0 fields containing `<!-- SWARM: -->` markers

### 2.2 Content Density Validation

- [ ] **POST-2.1** -- `verify-content.js` passes (exit code 0)
- [ ] **POST-2.2** -- Bilingual pairs balanced: ES count ~ EN count (+/- 5)
- [ ] **POST-2.3** -- All 13 flows (or all manifest flows) have complete fields:
  - `nameEs` (non-empty, >= 3 words)
  - `nameEn` (non-empty, >= 3 words)
  - `tools` (non-empty)
  - `whenEs` + `whenEn` (non-empty)
  - `outputEs` + `outputEn` (non-empty)
  - `kaLevel` (matches pattern `KA-[1-5]`)
- [ ] **POST-2.4** -- All 5 katas have complete fields:
  - `name` (ES + EN)
  - `phase` (Shu, Ha, or Ri)
  - `concept` (ES + EN, >= 20 words each)
  - `practiceSteps` (array of 3-4 trials)
  - `criterion` (ES + EN, measurable statement)
- [ ] **POST-2.5** -- Glossary has >= 10 terms, each with:
  - `termEs` + `termEn`
  - `descEs` + `descEn` (>= 20 words each)
  - `slug` (ASCII, lowercase, hyphenated)
- [ ] **POST-2.6** -- Anti-patterns has >= 5 entries, each with:
  - `nameEs` + `nameEn`
  - `whyEs` + `whyEn`
  - `fixSteps` (array of 3 remediation steps)
  - `signalEs` + `signalEn`

### 2.3 Cross-reference Integrity

- [ ] **POST-3.1** -- Every flow referenced in kata activation matrix exists in flow list
- [ ] **POST-3.2** -- Every glossary term referenced in sections has a matching modal entry
- [ ] **POST-3.3** -- Every anti-pattern referenced in the table has a matching modal entry
- [ ] **POST-3.4** -- KA levels referenced in flows match valid kata levels (KA-1 through KA-5)
- [ ] **POST-3.5** -- CTA URLs are non-empty for all flows (placeholder URLs acceptable at this stage)

---

## Gate 3: Post-Assembly Checklist

> **When**: After `assemble.js` produces the final HTML file.
> **Who**: `verify-spec.js` + `robustify.js`
> **Blocking**: YES -- verify-spec.js must report 28/28 PASS.

### 3.1 Structural Verification (verify-spec.js)

- [ ] **ASM-1.1** -- `verify-spec.js` reports 28/28 PASS (BLOCKING -- zero failures allowed)
- [ ] **ASM-1.2** -- `robustify.js` executed (idempotent -- safe to run multiple times)

### 3.2 Size and Completeness

- [ ] **ASM-2.1** -- File size between 150 KB and 600 KB
- [ ] **ASM-2.2** -- 0 unreplaced `{{PLACEHOLDER}}` markers in final HTML
- [ ] **ASM-2.3** -- 0 `<!-- SWARM: -->` markers in final HTML
- [ ] **ASM-2.4** -- 0 `GENERATE` text literals in final HTML
- [ ] **ASM-2.5** -- 0 empty `<div class="modal-body"></div>` blocks

### 3.3 Component Counts (PLAYBOOK-SPEC Gate 0-4 equivalents)

- [ ] **ASM-3.1** -- >= 10 `<section` tags with `id` attributes (G0.1)
- [ ] **ASM-3.2** -- >= 30 `.modal-overlay` elements (G0.2)
- [ ] **ASM-3.3** -- `body` has class containing `lang-es` (G0.3)
- [ ] **ASM-3.4** -- JS `<script>` block with `toggleLang`, `openModal`, `closeModal` (G0.4)
- [ ] **ASM-3.5** -- >= 40 `.timeline-item` elements (G1.1)
- [ ] **ASM-3.6** -- >= 30 `.callout` elements (G1.2)
- [ ] **ASM-3.7** -- >= 15 `.problem-card` elements (G1.3)
- [ ] **ASM-3.8** -- >= 8 `.jarvis-card` elements (G1.4)
- [ ] **ASM-3.9** -- >= 20 `.clickable-card` elements (G1.5)
- [ ] **ASM-3.10** -- >= 5 `.gem-link` elements (G1.6)

### 3.4 Bilingual Verification

- [ ] **ASM-4.1** -- `span.es` count ~ `span.en` count (+/- 5) (G2.1)
- [ ] **ASM-4.2** -- All `h2` contain both `.es` and `.en` spans (G2.2)
- [ ] **ASM-4.3** -- All `modal-header h3` contain both `.es` and `.en` spans (G2.3)
- [ ] **ASM-4.4** -- Language toggle button present in nav (G2.4)
- [ ] **ASM-4.5** -- `span.es` count >= 200 (soft target from G6.2)

### 3.5 Accessibility Verification

- [ ] **ASM-5.1** -- >= 20 `role="button"` elements (G3.1)
- [ ] **ASM-5.2** -- All `.modal-close` buttons have `aria-label` (G3.2)
- [ ] **ASM-5.3** -- Skip link present with `class="skip-link"` (G3.3)
- [ ] **ASM-5.4** -- `:focus-visible` rule in CSS (G3.4)

### 3.6 Mandatory Sections Verification

- [ ] **ASM-6.1** -- `section#glosario` present (G4.1)
- [ ] **ASM-6.2** -- Section with kata content present (G4.2)
- [ ] **ASM-6.3** -- Section with antipattern content + >= 5 clickable rows (G4.3)
- [ ] **ASM-6.4** -- Section with rhythm/adoption content present (G4.4)
- [ ] **ASM-6.5** -- `section#empezar` present with >= 4 card elements (G4.5)
- [ ] **ASM-6.6** -- `section#cierre` present with metadata table (G4.6)

### 3.7 Modal Quality Spot-Check

- [ ] **ASM-7.1** -- Sample flow modal has all 10 internal sections (MODAL-SPEC Cat 1)
- [ ] **ASM-7.2** -- Sample anti-pattern modal has all 5 sections (MODAL-SPEC Cat 2)
- [ ] **ASM-7.3** -- Sample kata modal has all 3 sections (MODAL-SPEC Cat 4)
- [ ] **ASM-7.4** -- All sampled modals have bilingual content

---

## Gate 4: Delivery Gate (Final -- No Exceptions)

> **When**: Before delivering the file to the user.
> **Who**: Human reviewer + automated browser check.
> **Blocking**: ABSOLUTE -- no playbook ships without passing ALL items.

### 4.1 Gate Prerequisites

- [ ] **DEL-1.1** -- Gate 1 (Pre-Generation) PASSED
- [ ] **DEL-1.2** -- Gate 2 (Post-Generation) PASSED
- [ ] **DEL-1.3** -- Gate 3 (Post-Assembly) PASSED -- verify-spec.js 28/28

### 4.2 Browser Verification

- [ ] **DEL-2.1** -- Page loads in browser without errors (console clean)
- [ ] **DEL-2.2** -- Language toggle works: click switches all visible text ES/EN
- [ ] **DEL-2.3** -- Language preference persists on page reload (localStorage key `wr-lang`)
- [ ] **DEL-2.4** -- At least 3 modals tested: open (click card) + close (X button) + close (overlay click) + close (Escape key)
- [ ] **DEL-2.5** -- Nav links scroll to correct sections
- [ ] **DEL-2.6** -- No visual artifacts (broken layout, missing content, overlapping elements)
- [ ] **DEL-2.7** -- Responsive: no horizontal scroll at 768px viewport width

### 4.3 File Compliance

- [ ] **DEL-3.1** -- File name follows convention: `playbook_{unit}_{slug}_v{version}.html`
- [ ] **DEL-3.2** -- File is a single self-contained HTML file (no external CSS/JS except fonts)
- [ ] **DEL-3.3** -- File size between 150 KB and 600 KB
- [ ] **DEL-3.4** -- `<title>` tag is descriptive and bilingual-compatible

### 4.4 Content Integrity

- [ ] **DEL-4.1** -- Hero section has >= 3 badges and >= 4 KPI cards
- [ ] **DEL-4.2** -- Footer has company name, badges, and bilingual copyright
- [ ] **DEL-4.3** -- No lorem ipsum or placeholder content visible
- [ ] **DEL-4.4** -- All gem-link URLs are valid (no broken links to tools)

---

## Quick Reference: Gate Summary

| Gate | Name | When | Checks | Blocking |
|---|---|---|---|---|
| Gate 1 | Pre-Generation | Before LLM | 19 checks | YES |
| Gate 2 | Post-Generation | After LLM, before assembly | 17 checks | YES |
| Gate 3 | Post-Assembly | After assemble.js | 27 checks | YES (28/28 from verify-spec.js) |
| Gate 4 | Delivery | Before user delivery | 15 checks | ABSOLUTE |
| **TOTAL** | | | **78 checks** | |

### Failure Protocol

1. **Gate 1 failure**: Fix brief.json or manifest. Re-run compose-manifest.js.
2. **Gate 2 failure**: Re-invoke LLM with corrected context, or fix manifest manually.
3. **Gate 3 failure**: Run robustify.js. If still failing, debug the assembler.
4. **Gate 4 failure**: Return to Gate 3. Fix and re-assemble. Never ship a Gate 4 failure.

### Escalation Rules

- 3 consecutive Gate 2 failures on the same field: escalate to human review of the brief
- Any Gate 3 failure after robustify.js: file a bug against the assembler
- Gate 4 visual artifact: screenshot + file, return to assembly pipeline

---

## Entrusted Standard Declaration

```
CHECKLIST v1.0 -- Entrusted Standard
========================================
This specification defines the quality gates that every playbook must pass
before delivery. 78 checks across 4 gates. No playbook ships without
passing ALL gates. Gate 4 is absolute -- no exceptions.

Golden reference: playbook_bu2_agile_pm_excellence_v3.html
Spec version: 1.0
Date: 2026-04-04
Author: Javier Montano (JM Labs / Sofka Technologies)
Companion specs: PLAYBOOK-SPEC.md, CONTENT-SPEC.md, MODAL-SPEC.md, FLOW-SPEC.md, KATA-SPEC.md
```
