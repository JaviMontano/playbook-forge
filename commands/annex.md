---
description: "Genera ANEXOS tecnicos y legales (101 paginas A4, denso, reference-grade)"
user-invocable: true
argument-hint: "<topic> [--brand=metodologia|sofka|elrepo|generic] [--client=name]"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Bash", "Agent", "AskUserQuestion", "TodoWrite"]
---

# /playbook:annex — Anexos Tecnicos y Legales (101 paginas)

## Que hace

Documento de referencia completo para anexar a propuestas formales.
Use case: respuesta a RFP que requiere documentacion exhaustiva.

## Estructura (~101 paginas, 6 secciones)

| Seccion | Pages | Contenido |
|---------|-------|-----------|
| Front matter | 1-4 | Cover, ATOC extendido, Convenciones, Abreviaturas |
| Anexo A: Arquitectura | 5-25 | Overview, Componentes, Flujos, Seguridad, Escalabilidad |
| Anexo B: Tecnicos | 26-45 | Stack, Deployment, CI/CD, Monitoreo, DR |
| Anexo C: Procesos | 46-60 | Onboarding, Soporte, SLA, Escalation, Cambios |
| Anexo D: Benchmarks | 61-72 | Competencia, Casos exito, Comparativa, ROI |
| Anexo E: FAQs | 73-85 | Tecnicas, Comerciales, Legales |
| Anexo F: Legal | 86-95 | Condiciones, Licencias, Garantias, Confidencialidad, IP, Jurisdiccion |
| Back matter | 96-101 | Glosario, Indice tablas, Indice figuras, Contacto, Firma |

## Pipeline

1. Parse topic + flags
2. Compose desde `templates/formats/annex-101p.json`
3. Verify: `verify-spec.js --format=paginated --pages=80-120` (acepta rango porque cada subseccion expande)

## Reference Specs

- `references/PAGINATED-SPEC.md`, `AUTHORITY-PATTERNS.md`
- `templates/formats/annex-101p.json`
- `references/brand-tokens-{brand}.json`

## Ejemplo

```
/playbook:annex "Anexos tecnicos migracion editorial" --brand=metodologia --client=Prolipa
```

Genera: `outputs/prolipa_annex_tecnicos_v1.html` (~101 paginas).
