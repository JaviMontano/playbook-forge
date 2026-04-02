---
name: playbook-generation
description: >
  Genera playbooks HTML branded con metodologia vivida (13 flujos AI-native,
  4 katas, adopcion progresiva, VR-AID, semaforo de valor). Use when the user asks
  to "crear playbook", "generar playbook", "playbook HTML", "cartilla de adopcion",
  "playbook de workflows", "generar cartilla".
argument-hint: "<topic>"
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

# Playbook Generation Skill

## TL;DR

- Generates a self-contained, branded HTML playbook from a topic and optional source files.
- Covers 13 AI-native workflows, 4 hands-on katas, progressive adoption timeline, and a value traffic light.
- Outputs a single HTML file (80-200KB) that works offline, prints cleanly, and looks professional.
- Follows the Sofka DS v5.1 design system with 42 CSS tokens and 22 components.
- Promotes the 3-layer grounding architecture (Drive/NLM/Gemini or adapted stack).

## Inputs

- **Topic** (required): The subject of the playbook (e.g., "AI-native Project Management", "Automatizacion de QA con IA").
- **Source files** (optional): Directory or files containing context about the team, tools, problems, and processes. Supported formats: `.md`, `.txt`, `.json`, `.yaml`, `.csv`.
- **Intake answers** (gathered interactively): Audience/roles, tools/platforms, top problems, centralization strategy, language.

## Outputs

- **Primary**: `outputs/playbook-<topic-slug>-<YYYYMMDD>.html` — Self-contained HTML playbook.
- **Intermediate**: `outputs/.playbook-context.json` — Extracted context from source files.
- **Intermediate**: `outputs/.playbook-manifest.json` — Structured content manifest (JSON) before HTML assembly.

## Pipeline Overview

1. **Ingest**: Scan source files for roles, tools, problems, processes, metrics, and org info. Write to `.playbook-context.json`.
2. **Clarify**: Run intake questions to fill gaps not covered by source files. Build a structured brief.
3. **Generate Manifest**: Using the brief + context, produce a complete JSON manifest with all section content following `prompts/content-generation.md`.
4. **Assemble HTML**: Transform the manifest into a single-file HTML playbook with inline CSS, responsive layout, and print styles.
5. **Validate**: Check for unreplaced placeholders, size within 80-200KB, all required sections present, valid structure, consistent terminology.
6. **Deliver**: Report output path, file metrics, and offer browser preview.

## Design System: Sofka DS v5.1

- **42 CSS custom properties** (colors, spacing, typography, shadows, radii).
- **22 reusable components**: hero, section-card, tool-card, kata-card, flow-card, timeline-step, decision-row, traffic-light, checklist, metric-badge, quote-block, callout, nav-bar, footer, print-header, and more.
- **Responsive**: Mobile-first with breakpoints at 768px and 1024px.
- **Print-ready**: `@media print` rules for clean A4 output.
- **Accessibility**: Semantic HTML, ARIA labels, sufficient contrast ratios.

## Architecture: 3-Layer Grounding

Every playbook promotes a centralized information architecture to prevent AI hallucination:

- **Capa de Datos**: Google Drive (or Confluence/SharePoint/Notion) with governed naming and structure.
- **Middleware**: NotebookLM (or custom RAG) as anti-hallucination layer — only answers from your sources.
- **Front**: Gemini + Gems (or ChatGPT/Claude) as exploration and command center.

The architecture adapts to the user's actual stack while preserving the grounding principle.

## Quality Gates

- No `{{placeholder}}` tokens remain in final HTML.
- File size between 80KB and 200KB.
- All 13 required sections present in the manifest and HTML.
- Consistent use of tool names (no mixing "Google Drive" and "GDrive").
- Valid HTML5 structure.
- All internal links resolve.

## References

Reference files in the `references/` directory provide templates, schemas, and examples:
- `references/content-manifest-schema.json` — JSON schema for the manifest
- `references/brand-tokens-sofka.json` — Brand design tokens (Sofka DS v5.1)
- `skills/playbook-generation/references/section-templates.md` — HTML templates per section type
