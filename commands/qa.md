---
description: "Genera RESPUESTAS tecnicas a preguntas del cliente (10 paginas A4, paginated, bridge pattern)"
user-invocable: true
argument-hint: "<topic> [--brand=metodologia|sofka|elrepo|generic] [--client=name]"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Bash", "Agent", "AskUserQuestion", "TodoWrite"]
---

# /playbook:qa — Respuesta Tecnica (10 paginas)

## Que hace

Documento de 10 paginas A4 que responde a preguntas del cliente.
Use case: clarificar dudas tecnicas/comerciales pre-firma.

## Estructura (10 paginas)

| Page | Pattern | Content |
|------|---------|---------|
| 1 | cover dark | Titulo + cliente + N preguntas |
| 2 | minto | TL;DR (claim + 3 supports) |
| 3-7 | bridge (5 bloques) | Q-A por tema con evidence tags |
| 8 | callout | Disclaimers y supuestos |
| 9 | cta | Contacto formal |
| 10 | atoc/xref | Referencias cruzadas (opcional) |

## Pipeline

1. Parse topic + flags
2. Launch `forge-orchestrator` con `--format=paginated --use-case=qa`
3. Pipeline determinístico (compose → enrich → assemble → robustify → verify)
4. Verify: `verify-spec.js --format=paginated --pages=10`

## Reference Specs

- `references/PAGINATED-SPEC.md`, `AUTHORITY-PATTERNS.md`
- `templates/formats/qa-10p.json`
- `references/brand-tokens-{brand}.json`

## Ejemplo

```
/playbook:qa "Respuestas a 12 preguntas editoriales" --brand=metodologia --client=Prolipa
```

Genera: `outputs/prolipa_qa_respuestas_v1.html` (10 paginas).
