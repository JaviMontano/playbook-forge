# Playbook Forge v4.0.0 — Plugin Hub

> Genera playbooks HTML branded v2 con metodologia vivida: 13 flujos AI-native, 5 katas (Shu-Ha-Ri), 65 modals interactivos, contenido bilingue ES/EN, 13 anti-patrones, glosario, perfiles de manager, adopcion progresiva, VR-AID, semaforo de valor. Sofka DS v5.1.

## Quick Start

```
/playbook:forge "Workflows agénticos para equipos de QA en BU3"
```

## Commands

| Command | What it does |
|---------|-------------|
| `/playbook:forge "<topic>"` | Genera playbook completo (11 secciones + 5 katas + 13 flujos + 65 modals) |
| `/playbook:ingest [path]` | Ingesta fuentes de contexto |
| `/playbook:preview` | Abre ultimo playbook en browser |
| `/playbook:section "<tipo>"` | Genera una seccion individual |
| `/playbook:status` | Estado del pipeline |
| `/playbook:export [path]` | Exporta a ruta especifica |

## Pipeline

```
INTAKE → INGEST → CLARIFY → GENERATE → ASSEMBLE → VALIDATE → DELIVER
```

1. **INTAKE**: Parsea topic, detecta fuentes
2. **INGEST**: `context-ingester` extrae roles, herramientas, problemas
3. **CLARIFY**: 3-5 preguntas al usuario (roles, tools, problemas, stack, idioma)
4. **GENERATE**: `content-strategist` produce JSON manifest con 11 secciones + 5 katas + 13 flujos + 65 modals (bilingue)
5. **ASSEMBLE**: `html-assembler` ensambla HTML desde snippets + manifest (84% deterministico)
6. **VALIDATE**: `playbook-reviewer` verifica 19 checkpoints de calidad (v2)
7. **DELIVER**: HTML self-contained en `outputs/`, se ofrece preview

## Entrusted Standard (3-Layer Determinism)

### Layer 1: Specs (references/)
| Spec | What it governs |
|------|----------------|
| PLAYBOOK-SPEC.md | HTML structure (28 gates) |
| CONTENT-SPEC.md | Content density per section |
| MODAL-SPEC.md | Modal internal patterns (10 categories) |
| FLOW-SPEC.md | 13 flow definitions |
| KATA-SPEC.md | 5 kata levels (Shu-Ha-Ri) |
| CHECKLIST.md | 78 checks across 4 gates |

### Layer 2: Templates (templates/)
| Template | Purpose |
|----------|---------|
| golden-manifest.json | Reference manifest (source of truth) |
| section-blocks/*.json | 6 composable section templates |
| modal-templates/*.json | Modal body patterns |

### Layer 3: Engine (scripts/)
| Script | Purpose |
|--------|---------|
| compose-manifest.js | 90% deterministic manifest composition |
| verify-content.js | Content density validation |
| assemble.js | Manifest → HTML builder |
| robustify.js | Spec compliance auto-fixer |
| verify-spec.js | 28-gate HTML validator |

## Agents

| Agent | Model | Rol |
|-------|-------|-----|
| `forge-orchestrator` | opus | Orquesta todo el pipeline |
| `context-ingester` | sonnet | Analiza fuentes del usuario |
| `content-strategist` | opus | Genera JSON manifest contextualizado |
| `html-assembler` | sonnet | Ensambla HTML deterministicamente |
| `playbook-reviewer` | sonnet | Valida calidad antes de entregar |

## Design System

- **Brand**: Sofka DS v5.1 — 42 CSS tokens, 33 componentes
- **Fonts**: Clash Grotesk (display) + Inter (body)
- **Primary**: `#FF7E08` (Sofka Orange)
- **Tokens**: `references/brand-tokens-sofka.json`
- **Snippets**: `skills/playbook-generation/snippets/*.html` (33 archivos)
- **Modals**: 65 interactive modals (flows, anti-patterns, glossary, katas, profiles)
- **Bilingual**: Native ES/EN with toggle
- **Anti-patterns**: 13 with remediation

## Arquitectura de 3 Capas (Grounding)

Cada playbook promueve centralizar la informacion:

| Capa | Default (Sofka) | Alternativas |
|------|-----------------|-------------|
| **Data** | Google Drive (unidades gobernadas) | SharePoint, Confluence, Notion |
| **Middleware** | NotebookLM (anti-alucinacion) | Custom RAG, Azure AI Search |
| **Front** | Gemini + Gems (centro de mando) | ChatGPT, Claude, Custom UI |

## Los 13 Flujos AI-Native

| # | Flujo | Herramientas |
|---|-------|-------------|
| 1 | Preparar sesiones efectivas | LaForja + LaReu |
| 2 | Capitalizar decisiones | LaVuelta |
| 3 | Reportar avances y valor | ElRepo |
| 4 | Visibilizar impacto | LaInfo |
| 5 | Investigar con Deep Research | LaForja + Gemini DR |
| 6 | Vitaminizar presentacion | DR + NLM + LaInfo |
| 7 | Poblar y etiquetar NotebookLM | NLM + Drive |
| 8 | Configurar system prompt NLM | NLM Notes |
| 9 | Gobernar Drive como capa de datos | Google Drive |
| 10 | NotebookLM como middleware | NotebookLM |
| 11 | Gemini como front de exploracion | Gemini |
| 12 | Gems como centro de mando | Gemini Gems |
| 13 | Crear tu propio flujo agentico | LaForja + NLM + Gems |

## Hard Rules

1. **Sofka DS v5.1 only** — No mezclar tokens de otros design systems
2. **3-layer architecture always** — Cada playbook incluye estrategia de grounding
3. **Evidence tags** — `[CODIGO]` `[CONFIG]` `[DOC]` `[INFERENCIA]` `[SUPUESTO]`
4. **No invented data** — Solo metricas y nombres del brief del usuario
5. **Script-first** — Usar `assemble.js` para el 84% deterministico
6. **Validate before deliver** — `playbook-reviewer` siempre antes de entregar

## Ontology Index

| Need | Read |
|------|------|
| Brand tokens (JSON) | `references/brand-tokens-sofka.json` |
| Manifest schema | `references/content-manifest-schema.json` |
| Placeholder dictionary | `references/placeholder-dictionary.md` |
| Component inventory (base) | `references/component-inventory.md` |
| Katas inventory | `references/katas-inventory.md` |
| Design system reference | `skills/playbook-generation/references/design-system.md` |
| Component catalog (33) | `references/component-inventory.md` |
| Section templates (11) | `skills/playbook-generation/references/section-templates.md` |
| Kata/flow templates | `skills/playbook-generation/references/kata-flow-templates.md` |
| Grounding strategy | `skills/playbook-generation/references/grounding-architecture.md` |
| HTML snippets (33) | `skills/playbook-generation/snippets/*.html` |
| Assembly script | `skills/playbook-generation/scripts/assemble.js` |
| Validation script | `skills/playbook-generation/scripts/validate-manifest.js` |
| Placeholder map script | `skills/playbook-generation/scripts/placeholder-map.js` |
