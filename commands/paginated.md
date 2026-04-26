---
description: "Umbrella: genera documento paginated A4 (ask, preview, qa, proposal, annex)"
user-invocable: true
argument-hint: "<use-case> <topic> [--brand=metodologia|sofka|elrepo|generic] [--client=name]"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Bash", "Agent", "AskUserQuestion", "TodoWrite"]
---

# /playbook:paginated — Umbrella para Documentos Paginated

## Use Cases (5)

| Use Case | Pages | Comando rapido |
|----------|-------|----------------|
| `ask` | 4 | `/playbook:ask "<topic>"` |
| `preview` | 7 | `/playbook:paginated preview "<topic>"` |
| `qa` | 10 | `/playbook:qa "<topic>"` |
| `proposal` | 30-42 | `/playbook:proposal "<topic>"` |
| `annex` | 101 | `/playbook:annex "<topic>"` |

## Brands soportados

- `metodologia` — Neo-Swiss DS (navy + gold, Poppins+Montserrat) — DEFAULT
- `sofka` — Sofka v5.1 (orange + warm grays, Clash Grotesk+Inter)
- `elrepo` — ElRepo Dark
- `generic` — System fonts neutral fallback

## Pipeline (10 pasos)

```
INTAKE → MODE DETECT (paginated) → INGEST (opt) → CLARIFY (5-8 Qs) →
COMPOSE (compose-manifest.js + templates/formats/{use-case}.json) →
ENRICH (content-strategist llena _generate fields) →
ASSEMBLE (assemble-paginated.js --brand={brand}) →
ROBUSTIFY (--mode=paginated, skip SPA transforms) →
VERIFY (verify-spec.js --format=paginated --pages={target}) →
DELIVER (HTML PDF-ready en outputs/)
```

## Quality Gates (BLOQUEANTE)

`verify-spec.js --format=paginated` corre 20 checks (P0-P3):
- **P0** Estructura: @page, .page A4, page count, 0 scripts, 0 modals
- **P1** Content: cover, ATOC if pages>10, footer, brand-lockup
- **P2** Print CSS: page-break, print-color-adjust, @media print, A4 size
- **P3** Brand: CSS tokens, var() usage, logo, brand name

## Diferencias vs SPA mode

| Aspecto | SPA (ecosystem/forensic/elrepo) | Paginated |
|---------|--------------------------------|-----------|
| Output | Single-page con modales JS | A4 multi-page print-first |
| JavaScript | toggleLang, openModal, copyPrompt | 0 JS |
| CSS | display/flex | @page, page-break-* |
| Use case | Adopcion progresiva | Propuestas, preguntas, anexos |

## Naming convention

Output: `{client}_{use-case}_{slug}_v{version}.html`
Ejemplo: `prolipa_proposal_migracion-ai_v1.html`
