---
description: "Genera una sola seccion del playbook (ej: timeline, katas, flujos, semaforo)"
user-invocable: true
argument-hint: "<section-type>"
allowed-tools: ["Read", "Write", "Glob"]
---

# /section — Generate a Single Playbook Section

## Execution Steps

### 1. Parse Section Type

Extract `<section-type>` from the argument. Valid section types:

## Supported Section Types

| Type | Template | Description |
|------|----------|-------------|
| `glosario` | section-blocks/glosario.json | 10+ glossary term cards + gem-bar |
| `katas` | section-blocks/katas.json | 3 mastery levels (Shu-Ha-Ri) |
| `antipatrones` | section-blocks/antipatrones.json | 5+ anti-patterns with remediation |
| `ritmo` | section-blocks/ritmo.json | Metrics + acceptance criteria |
| `empezar` | section-blocks/empezar.json | 6 empathy cards |
| `cierre` | section-blocks/cierre.json | Metadata table + acknowledgments |

Other sections (nucleo, investigacion, infra, avanzado) require flow-specific content and are composed by the full `/playbook:forge` pipeline — they are not available as standalone sections.

If the section type is not recognized, list the valid options and ask the user to choose.

### 2. Load Context (if available)

- Check for `outputs/.playbook-context.json` — use as context if present.
- Check for `outputs/.playbook-manifest.json` — extract relevant section data if present.
- If neither exists, generate the section with generic/placeholder content and note that running `/ingest` first would improve quality.

### 3. Generate Section HTML

Generate a standalone HTML fragment for the requested section. The fragment must:

- Use Sofka DS v5.1 CSS tokens and components.
- Be self-contained (inline styles if standalone viewing is needed).
- Follow the same structure as the corresponding section in a full playbook.
- Include proper semantic HTML (`<section>`, `<article>`, `<h2>`, etc.).

### 4. Write Output

Write the section to: `outputs/section-<type>-<YYYYMMDD>.html`

### 5. Report

Print:
- Section generated: `<type>`
- Output file: `<path>`
- Suggest: "Use `/forge` to generate a complete playbook, or `/preview` to open this section."
