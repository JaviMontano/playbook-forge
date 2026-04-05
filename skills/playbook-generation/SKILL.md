---
name: playbook-generation
version: "6.0.0"
description: >
  Dual-mode playbook engine. Generates BOTH:
  (1) Jarvis ecosystem playbooks (P0-P13 gems, 3-layer architecture, 13 flujos,
  5 katas Shu-Ha-Ri, 13 anti-patrones, crosslinks, VR-AID, semaforo) AND
  (2) Forensic analysis playbooks (discovery/assessment findings, 13 dimensiones,
  hallazgos priorizados, risk maps, recomendaciones, roadmap).
  Triggers: "crear playbook", "generar playbook", "playbook jarvis",
  "playbook ecosistema", "playbook P0"-"playbook P13", "playbook de adopcion",
  "playbook de flujos", "playbook de rituales", "playbook de analisis",
  "playbook de hallazgos", "playbook de discovery", "forensic analysis playbook",
  "assessment playbook", "cartilla de adopcion".
argument-hint: "<topic> [--mode=ecosystem|forensic]"
author: "Javier Montano · Sofka Technologies"
model: opus
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - Agent
  - AskUserQuestion
  - TodoWrite
---

# Playbook Generation Skill v6 — Dual-Mode Engine

## TL;DR

- **Dual-mode**: Generates both **Jarvis ecosystem playbooks** (P0-P13) and **forensic analysis playbooks** from a single pipeline.
- **Ecosystem mode**: 13 AI-native workflows, 5 katas (Shu-Ha-Ri), 13 anti-patterns, 17 glossary terms, 55+ modals, VR-AID, traffic light, 14-playbook crosslinks.
- **Forensic mode**: 13 analysis dimensions, prioritized findings, risk maps, maturity assessment, recommendations roadmap, evidence-tagged claims.
- Both modes share: Sofka DS v5.1 (42 CSS tokens), bilingual ES/EN, responsive + print, accessibility, brand polish (scroll progress, nav tracking, fade-in, back-to-top).
- Outputs a single HTML file (80-200KB) that works offline, prints cleanly, and looks executive-grade.

## Mode Detection

When `--mode` flag is not explicit, the engine auto-detects:

| Signal in topic | Detected mode |
|----------------|---------------|
| P0-P13, Jarvis, gem, kata, flujo, workflow, rituales, adopcion | **ecosystem** |
| assessment, discovery, forense, forensic, findings, hallazgos, dimensiones | **forensic** |
| (none of the above) | **ecosystem** (default) |

## Ecosystem Mode

Generates playbooks for the 14-playbook Jarvis suite. Each playbook documents one gem/tool with:

- **14 sections**: hero, contexto, ciclo-semanal, flujos (13 flows as cards), katas (5 Shu-Ha-Ri), semaforo, antipatrones, decision-matrix, glosario, empezar, ruta (14-PB roadmap), ritmo, cierre
- **55+ modals**: 13 flow deep-dives, 5 kata checkpoints, 13 anti-pattern remediations, 17 glossary terms, 3 role variants, 4 metrics, 1 impact
- **Crosslinks**: `.gem-link` buttons + `.gem-bar` footer connecting to sibling playbooks
- **3-layer architecture**: Data (Drive) → Middleware (NLM) → Front (Gemini/Gems)

### The 14 Playbooks

| ID | Name | Layer |
|----|------|-------|
| P0 | Sistema de Archivos | Foundation |
| P1 | LaForja — Prompts Maestros | Front |
| P2 | LaReu — Reuniones Efectivas | Front |
| P3 | LaVuelta — Capitalizar Decisiones | Front |
| P4 | ElRepo — Reportar Valor (VR-AID) | Front |
| P5 | LaInfo — Visibilidad Ejecutiva | Front |
| P6 | Deep Research | Middleware |
| P7 | Vitaminizar Presentaciones | Front |
| P8 | NotebookLM — Poblar Cuadernos | Middleware |
| P9 | NotebookLM — System Prompt | Middleware |
| P10 | Drive Gobernado — Capa Cero | Data |
| P11 | NotebookLM — Middleware Enrutador | Middleware |
| P12 | Gemini — Explorador Libre | Front |
| P13 | Gems — Centro de Mando | Front |

### Intake (Ecosystem)

8 questions: playbook identity, target tools, use cases, mastery progression, anti-patterns, crosslink position, constraints, language. See `prompts/intake-questions-ecosystem.md`.

### Content Generation (Ecosystem)

See `prompts/content-generation-ecosystem.md` for section-by-section guide.

## Forensic Mode

Generates playbooks documenting Sofka's discovery/assessment methodology:

1. **Forensic Analysis**: Deep investigation into systems, code, architecture, infrastructure — hard evidence.
2. **Conversational Analysis**: Structured findings from stakeholder interviews and workshops.
3. **Multidimensional Assessment**: Cross-cutting evaluation across 13 dimensions.

### The 13 Analysis Dimensions

1. Software Architecture (AS-IS)
2. Cloud & Infrastructure
3. Data & Analytics
4. Security & Compliance
5. DevOps & CI/CD
6. Performance & Scalability
7. UX & Accessibility
8. Organizational Readiness
9. Technical Debt
10. Integration & APIs
11. Quality Engineering
12. Business Alignment
13. Innovation & AI Readiness

### Intake (Forensic)

6 questions: engagement context, stakeholders, dimensions in scope, key findings, constraints, language. See `prompts/intake-questions-forensic.md`.

### Content Generation (Forensic)

See `prompts/content-generation-forensic.md` for section-by-section guide.

## Shared Infrastructure

Both modes share:

- **Design System**: Sofka DS v5.1 — 42 CSS tokens, 40+ components
- **Fonts**: Clash Grotesk (display) + Inter (body)
- **Brand**: `references/brand-tokens-sofka.json`
- **Assembly**: `assemble.js` (deterministic HTML builder)
- **JS**: toggleLang, openModal (regex-based), closeModal, copyPrompt
- **Brand polish**: scroll progress bar, nav active tracking, section fade-in, back-to-top, print header
- **Bilingual**: Native ES/EN with `body.lang-es` / `body.lang-en` toggle
- **Evidence tags**: `[CODIGO]`, `[CONFIG]`, `[DOC]`, `[ENTREVISTA]`, `[INFERENCIA]`, `[SUPUESTO]`

## Inputs

- **Topic** (required): Subject of the playbook.
- **Mode flag** (optional): `--mode=ecosystem` or `--mode=forensic`. Auto-detected if omitted.
- **Source files** (optional): Context files in `.md`, `.txt`, `.json`, `.yaml`, `.csv`.
- **Intake answers** (gathered interactively): Mode-specific questions.

## Outputs

- **Primary**: `outputs/playbook-<slug>-<YYYYMMDD>.html`
- **Intermediate**: `outputs/.playbook-context.json`, `outputs/.playbook-manifest.json`

## Pipeline Overview

1. **Intake**: Parse topic + detect mode
2. **Ingest**: Scan source files for context → `.playbook-context.json`
3. **Clarify**: Run mode-specific intake questions → structured brief
4. **Compose**: `compose-manifest.js` generates 90% deterministic manifest
5. **Enrich**: `content-strategist` fills `_generate` fields (10% LLM)
6. **Assemble**: `assemble.js` + snippets → single HTML file
7. **Robustify**: `robustify.js` applies spec compliance
8. **Verify**: `verify-spec.js` (35 gates) + reviewer (32 checks)
9. **Deliver**: Report path, size, score. Offer preview + certify.

## Quality Gates

- No `{{placeholder}}` tokens in final HTML
- File size 80-200KB
- All required sections present (mode-specific)
- Evidence tags on every finding/claim
- 32/32 reviewer checks PASS
- 35/35 verify-spec gates PASS
- 10/10 certification checks (via `/playbook:certify`)

## References

| Need | File |
|------|------|
| Brand tokens | `references/brand-tokens-sofka.json` |
| Manifest schema | `references/content-manifest-schema.json` |
| Ecosystem registry | `references/ecosystem-playbooks.json` |
| Intake (ecosystem) | `prompts/intake-questions-ecosystem.md` |
| Intake (forensic) | `prompts/intake-questions-forensic.md` |
| Content gen (ecosystem) | `prompts/content-generation-ecosystem.md` |
| Content gen (forensic) | `prompts/content-generation-forensic.md` |
| Section templates | `references/section-templates.md` |
| Design system | `references/design-system.md` |
