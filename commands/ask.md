---
description: "Genera un documento de PREGUNTAS al cliente (4 paginas A4, paginated, brand parametrizable)"
user-invocable: true
argument-hint: "<topic> [--brand=metodologia|sofka|elrepo|generic] [--client=name]"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Bash", "Agent", "AskUserQuestion", "TodoWrite"]
---

# /playbook:ask — Document de Preguntas (4 paginas)

## Que hace

Genera un documento PDF-ready (HTML A4) de 4 paginas para enviar preguntas al cliente.
Use case: clarificar alcance antes de propuesta formal.

## Estructura (4 paginas fijas)

| Page | Type | Pattern | Content |
|------|------|---------|---------|
| 1 | cover | dark | Titulo + cliente + version + fecha |
| 2 | content | funnel | Contexto y por que preguntamos (4-tier funnel) |
| 3 | content | bridge | Lista de 5-7 preguntas clave (bridge: necesidad ↔ pregunta) |
| 4 | cta | callout | Siguiente paso + deadline + contacto |

## Pipeline

1. Parse topic + flags
2. Launch `forge-orchestrator` con `--format=paginated --use-case=ask`
3. Pipeline determinístico:
   - INTAKE → CLARIFY (5 questions: client, deadline, themes, depth, deliverables)
   - COMPOSE: `compose-manifest.js` con `templates/formats/ask-4p.json`
   - ENRICH: `content-strategist` llena solo `_generate` fields
   - ASSEMBLE: `assemble-paginated.js --brand={brand}`
   - ROBUSTIFY: `robustify.js --mode=paginated`
   - VERIFY: `verify-spec.js --format=paginated --pages=4` debe pasar 20/20
4. DELIVER: HTML self-contained en `outputs/{client}_ask_{slug}_v{ver}.html`

## Quality Gate (BLOQUEANTE)

`verify-spec.js --format=paginated --pages=4` debe pasar 20/20:
- P0: Estructura (4 pages exactas, @page rule, 0 scripts, 0 modals)
- P1: Content (cover, footer en cada page, brand-lockup)
- P2: Print CSS (page-break, print-color-adjust, @media print)
- P3: Brand (CSS tokens, var() usage, logo, brand name)

## Reference Specs

- `references/PAGINATED-SPEC.md` — Estructura general
- `references/AUTHORITY-PATTERNS.md` — Funnel + Bridge + Callout patterns
- `templates/formats/ask-4p.json` — Format template
- `references/brand-tokens-{brand}.json` — Tokens del brand

## Ejemplo

```
/playbook:ask "Migracion Drupal 7 a 10 para portal corporativo" --brand=metodologia --client=Acme
```

Genera: `outputs/acme_ask_migracion-drupal_v1.html` (4 paginas A4 con MetodologIA Neo-Swiss DS).
