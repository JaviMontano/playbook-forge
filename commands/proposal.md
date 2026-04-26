---
description: "Genera PROPUESTA comercial completa (30-42 paginas A4, narrativa + opciones + pricing + ROI)"
user-invocable: true
argument-hint: "<topic> [--brand=metodologia|sofka|elrepo|generic] [--client=name] [--pages=30|36|42]"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Bash", "Agent", "AskUserQuestion", "TodoWrite"]
---

# /playbook:proposal — Propuesta Comercial (30-42 paginas)

## Que hace

Propuesta comercial completa con narrativa storytelling: contexto → opciones → pricing → ROI → CTA.
Use case: documento maestro post-discovery.

## Estructura (30-42 paginas, expandible)

Pages base (~21):
- Cover, ATOC, Resumen Ejecutivo (Minto)
- Antecedentes, Oportunidad (Funnel), Cost-of-Delay
- Opciones overview (Stairway), Opciones 1-4 detalle
- Entregables, Cronograma (Stairway), Pricing (Pricing Table)
- ROI (Stamp), Criterios go/no-go (GO-Signal), Diferenciadores (Minto)
- FAQs (Bridge), Anexos resumen (ATOC), CTA, XREF

Pages opcionales (hasta 42): audiencias, risk-matrix, stakeholder-map, benchmark, equipo, references, testimonios, glosario, condiciones, firma.

## Pipeline

1. Parse topic + flags (--pages controla expansion)
2. Launch orchestrator con `--format=paginated --use-case=proposal`
3. Compose desde `templates/formats/proposal-30to42p.json`
4. Verify: `verify-spec.js --format=paginated --pages=30-42`

## Quality Gate

`verify-spec.js --format=paginated --pages=30-42` debe pasar 20/20.

## Reference Specs

- `references/PAGINATED-SPEC.md`, `AUTHORITY-PATTERNS.md`
- `templates/formats/proposal-30to42p.json`
- `references/brand-tokens-{brand}.json`

## Ejemplo

```
/playbook:proposal "Migracion editorial AI-native con 4 opciones" --brand=metodologia --client=Prolipa --pages=36
```

Genera: `outputs/prolipa_proposal_migracion-ai-native_v1.html` (36 paginas).
