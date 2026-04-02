---
description: "Genera una sola seccion del playbook (ej: timeline, katas, flujos, semaforo)"
user-invocable: true
argument-hint: "<section-type>"
allowed-tools: ["Read", "Write", "Glob", "Agent"]
---

# /section — Generate a Single Playbook Section

## Execution Steps

### 1. Parse Section Type

Extract `<section-type>` from the argument. Valid section types:

| Type | Description |
|------|-------------|
| `oportunidad` | S1 — Oportunidad: 4 problemas, mapa rol-workflow, guardrails |
| `ciclo` | S2 — Ciclo Semanal: 5 momentos del ciclo mapeados a herramientas |
| `jarvis` | S3 — Fichas de Herramientas: cards por cada tool/workflow |
| `adopcion` | S4 — Adopcion Progresiva: timeline 4 semanas |
| `decision` | S5 — Arbol de Decision: tabla Situacion → Herramienta |
| `semaforo` | S6 — Semaforo de Valor: traffic light + VR-AID framework |
| `agradecimiento` | S7 — Equipo: reconocimiento (generico si no hay nombres) |
| `cierre` | S8 — Cierre: acciones dia-1 + criterios de aceptacion |
| `empieza` | Quick-start: primeros pasos inmediatos |
| `habitos` | Habitos AI-native: rutinas diarias recomendadas |
| `katas` | 4 katas adaptadas a herramientas y escenarios del usuario |
| `flujos` | 13 flujos AI-native con arquitectura 3 capas |
| `consolidacion` | Consolidacion: metricas de adopcion y siguiente nivel |

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
