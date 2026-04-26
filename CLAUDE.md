# Playbook Forge v7.0.0 — Plugin Hub

> **Dual-engine HTML generator**:
> - **SPA mode** (ecosystem/forensic/elrepo): single-page playbooks con modales JS, 38 gates
> - **Paginated mode** (ask/preview/qa/proposal/annex): A4 print-first, 0 JS, 20 gates
>
> **Multi-brand parametrizable**: Sofka v5.1, MetodologIA Neo-Swiss, ElRepo Dark, Generic.

## Quick Start — SPA mode

```
/playbook:forge "P4 ElRepo — Reportar Valor" --mode=ecosystem
/playbook:forge "Assessment cloud-native retail" --mode=forensic
/playbook:forge "weekly status analysis" --mode=elrepo
/playbook:suite outputs/golden-jarvis-bu2_v2.html
/playbook:certify outputs/playbook_bu2_pb4.html
```

## Quick Start — Paginated mode (A4 PDF-ready)

```
/playbook:ask "Migracion Drupal" --brand=metodologia --client=Acme              # 4 paginas
/playbook:paginated preview "Propuesta editorial" --brand=metodologia            # 7 paginas
/playbook:qa "Respuestas a 12 preguntas" --brand=metodologia --client=Prolipa   # 10 paginas
/playbook:proposal "Migracion AI-native" --brand=metodologia --pages=36          # 30-42 paginas
/playbook:annex "Anexos tecnicos" --brand=metodologia --client=Prolipa          # 101 paginas
```

## Commands

### SPA mode commands
| Command | What it does |
|---------|-------------|
| `/playbook:forge "<topic>" [--mode=eco\|forensic\|elrepo]` | Genera SPA playbook completo |
| `/playbook:suite <golden>` | Batch 14 secondary playbooks |
| `/playbook:certify <path.html>` | 38-gate SPA certification |

### Paginated mode commands (NEW v7)
| Command | Pages | Pattern primario |
|---------|-------|------------------|
| `/playbook:ask "<topic>"` | 4 | Funnel + Bridge |
| `/playbook:paginated preview "<topic>"` | 7 | Funnel + Stairway + Stamp |
| `/playbook:qa "<topic>"` | 10 | Minto + Bridge (5 bloques Q-A) |
| `/playbook:proposal "<topic>" [--pages=30-42]` | 30-42 | Storytelling completo |
| `/playbook:annex "<topic>"` | 101 | Reference-grade tecnico+legal |

### Shared commands
| Command | What it does |
|---------|-------------|
| `/playbook:ingest [path]` | Ingesta fuentes de contexto |
| `/playbook:preview` | Abre ultimo HTML en browser |
| `/playbook:status` | Estado del pipeline |
| `/playbook:export [path]` | Exporta a ruta especifica |

## Pipeline

```
INTAKE → MODE DETECT → INGEST → CLARIFY → COMPOSE → ENRICH → ASSEMBLE → ROBUSTIFY → VERIFY → DELIVER
```

1. **INTAKE**: Parsea topic, detecta fuentes
2. **MODE DETECT**: elrepo (repo-doc/vr-aid/radar) o ecosystem (P0-P13/Jarvis/gems) o forensic (assessment/discovery)
3. **INGEST**: `context-ingester` extrae contexto de artifacts
4. **CLARIFY**: Preguntas mode-specific (5 elrepo / 8 ecosystem / 6 forensic)
5. **COMPOSE**: `compose-manifest.js` genera manifest deterministico (90% template)
6. **ENRICH**: `content-strategist` llena campos `_generate` (10% LLM)
7. **ASSEMBLE**: `html-assembler` + `assemble.js` (snippets + manifest → HTML)
8. **ROBUSTIFY**: `robustify.js` aplica spec compliance automatica
9. **VERIFY**: `verify-spec.js` (35 gates) + `playbook-reviewer` (32 checks)
10. **DELIVER**: HTML self-contained en `outputs/`, se ofrece preview + certify

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

## Design Systems

### Sofka DS v5.1 (ecosystem + forensic modes)
- **Brand**: 42 CSS tokens, 40+ componentes
- **Fonts**: Clash Grotesk (display) + Inter (body)
- **Primary**: `#FF7E08` (Sofka Orange)
- **Tokens**: `references/brand-tokens-sofka.json`

### ElRepo Dark DS (elrepo mode)
- **Brand**: 20 CSS tokens, dark palette
- **Fonts**: System fonts only (no CDN, no external fonts)
- **Primary**: `#F26322` (ElRepo Brand)
- **Tokens**: `references/brand-tokens-elrepo.json`
- **Logo**: `sofka_logo.jpg` from `javiermontano-sofka` repo
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
| PLAYBOOK-SPEC (28 gates) | `references/PLAYBOOK-SPEC.md` |
| CONTENT-SPEC (density) | `references/CONTENT-SPEC.md` |
| MODAL-SPEC (10 categories) | `references/MODAL-SPEC.md` |
| FLOW-SPEC (13 flows) | `references/FLOW-SPEC.md` |
| KATA-SPEC (5 levels) | `references/KATA-SPEC.md` |
| CHECKLIST (78 checks) | `references/CHECKLIST.md` |
| Golden manifest | `templates/golden-manifest.json` |
| Section blocks (6) | `templates/section-blocks/*.json` |
| Modal templates | `templates/modal-templates/*.json` |
| Compose manifest script | `skills/playbook-generation/scripts/compose-manifest.js` |
| Verify content script | `skills/playbook-generation/scripts/verify-content.js` |
| Verify spec script | `skills/playbook-generation/scripts/verify-spec.js` |
| Robustify script | `skills/playbook-generation/scripts/robustify.js` |
| Ecosystem registry (14 PBs) | `references/ecosystem-playbooks.json` |
| Intake (ecosystem mode) | `skills/playbook-generation/prompts/intake-questions-ecosystem.md` |
| Intake (forensic mode) | `skills/playbook-generation/prompts/intake-questions-forensic.md` |
| Content gen (ecosystem) | `skills/playbook-generation/prompts/content-generation-ecosystem.md` |
| Content gen (forensic) | `skills/playbook-generation/prompts/content-generation-forensic.md` |
| Ruta section snippet | `skills/playbook-generation/snippets/ruta-section.html` |
| Ecosystem gem-bar snippet | `skills/playbook-generation/snippets/gem-bar-ecosystem.html` |
| ElRepo brand tokens | `references/brand-tokens-elrepo.json` |
| ElRepo head (dark CSS) | `skills/playbook-generation/snippets/elrepo-head.html` |
| ElRepo radar skeleton | `skills/playbook-generation/snippets/elrepo-radar.html` |
| ElRepo analyst report | `skills/playbook-generation/snippets/elrepo-analyst-report.html` |
| ElRepo footer | `skills/playbook-generation/snippets/elrepo-footer.html` |
| Intake (elrepo mode) | `skills/playbook-generation/prompts/intake-questions-elrepo.md` |
| Content gen (elrepo) | `skills/playbook-generation/prompts/content-generation-elrepo.md` |

## Sofka Brand Skills Suite (v2.0.0)

| Skill | Path | Purpose |
|-------|------|---------|
| `sofka-brand-knowhow` | `skills/sofka-brand-knowhow/SKILL.md` | Brand intelligence — identity, services, culture, visual (Manual 2024), metrics, Jarvis rules, digital presence |
| `sofka-priming-forge` | `skills/sofka-priming-forge/SKILL.md` | Generate priming prompts for 10 surfaces. MCP-aware, multimodal-ready |
| `sofka-assistant-vitaminer` | `skills/sofka-assistant-vitaminer/SKILL.md` | Diagnose + upgrade assistants against VR-S01-S10 + 7 priming blocks |

### References

| File | Content |
|------|---------|
| `skills/sofka-brand-knowhow/references/manual-de-marca-extract.md` | Manual de Marca 2024 extraction |
| `skills/sofka-brand-knowhow/references/web-presence-registry.md` | URLs, social handles |
| `skills/sofka-brand-knowhow/references/metrics-dashboard.md` | KPIs and certifications |

### Priming Surface Templates (10)

| # | Surface | File |
|---|---------|------|
| 1 | LLM Assistant | `skills/sofka-priming-forge/prompts/surface-llm-assistant.md` |
| 2 | LinkedIn | `skills/sofka-priming-forge/prompts/surface-social-linkedin.md` |
| 3 | Instagram | `skills/sofka-priming-forge/prompts/surface-social-instagram.md` |
| 4 | Presentation | `skills/sofka-priming-forge/prompts/surface-presentation.md` |
| 5 | Proposal | `skills/sofka-priming-forge/prompts/surface-proposal.md` |
| 6 | NLM Notebook | `skills/sofka-priming-forge/prompts/surface-nlm-notebook.md` |
| 7 | Multimodal | `skills/sofka-priming-forge/prompts/surface-multimodal.md` |
| 8 | Playbook | `skills/sofka-priming-forge/prompts/surface-playbook.md` |
| 9 | Gemini Gem | `skills/sofka-priming-forge/prompts/surface-gem.md` |
| 10 | Email | `skills/sofka-priming-forge/prompts/surface-email-campaign.md` |
