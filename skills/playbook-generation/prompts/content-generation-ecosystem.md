# Content Generation Prompt for Ecosystem Playbook Manifest (Jarvis P0-P13)

## Context

You are generating the structured content manifest for a **Sofka Technologies Jarvis ecosystem playbook**. This playbook documents one gem/tool within the 14-playbook suite, with AI-native workflows, progressive mastery, and crosslinks to sibling playbooks. Every piece of content must be concrete, actionable, and tailored to the user's specific team, tools, and problems.

## Input

You receive a **structured brief** (JSON) containing:
- `mode`: "ecosystem"
- `playbook`: id (P0-P13), gem name, BU, team, initiative
- `language`: Target language (es/en/pt)
- `tools`: Jarvis gems + supporting tools + 3-layer architecture mapping
- `flows`: Which of 13 flows are in scope
- `katas`: Customization or "default" (5 Shu-Ha-Ri levels)
- `antipatterns`: Custom list or "default" (13 standard)
- `crosslinks`: Current P-number, siblings, layer
- `constraints`: Timeline, compliance, budget
- `context_file`: Path to ingested context (optional)

## Output

A complete JSON manifest following the playbook schema. No placeholder tokens — every field must have real content. All content bilingual (ES + EN).

---

## Section-by-Section Generation Guide

### S1 — Hero

Generate the hero section:
- **Logo**: Use `meta.logoUrl` from brand tokens
- **Badges**: 4-5 badges (playbook number, tier, gem name, BU, layer)
- **H1**: `{Gem Name} — <span>{Highlight}</span>` pattern
- **Subtitle**: 1-2 sentences positioning this gem in the ecosystem
- **KPIs**: 4-6 metrics (use cases count, time saved, ritual duration, connected gems, etc.)

### S2 — Contexto / Problema

Generate the opening section that frames "why this gem matters":
- **4 Problem Cards**: Pain points this gem solves. Each with: title (max 8 words), description (2-3 sentences), affected role(s), estimated weekly time waste
- **Compare Grid**: Before (without gem) vs. After (with gem) — 4-5 bullet points each
- **Guardrails**: 3-4 items (what this playbook is NOT)

### S3 — Ciclo Semanal

Map the gem to 5 moments of the weekly cycle:
- **Lunes — Planificacion**: How this gem helps sprint planning
- **Martes/Miercoles — Ejecucion**: How it supports daily work
- **Jueves — Revision**: How it aids quality gates and demos
- **Viernes — Capitalizacion**: How it captures knowledge
- **Continuo — Automatizacion**: What runs continuously

For each moment: describe the AI-native enhancement (what changes with this gem vs. without).

### S4 — Flujos (13 AI-native Flows)

Generate 13 flow cards. Each flow includes:
- Flow number (1-13)
- Name (bilingual)
- Icon class (jarvis-icon variant)
- Subtitle (1 sentence)
- "Why it matters" field
- Exercise steps (3-5 steps)
- Success criteria
- CTA links (gem-links to related tools)

**The 13 Standard Flows:**
1. Preparar sesiones efectivas (LaForja + LaReu)
2. Capitalizar decisiones (LaVuelta)
3. Reportar avances y valor (ElRepo — VR-AID)
4. Visibilizar impacto (LaInfo)
5. Investigar con Deep Research (LaForja + Gemini DR)
6. Vitaminizar presentacion (DR + NLM + LaInfo)
7. Poblar y etiquetar NotebookLM (NLM + Drive)
8. Configurar system prompt NLM (NLM Notes)
9. Gobernar Drive como capa de datos (Google Drive)
10. NotebookLM como middleware (NotebookLM)
11. Gemini como front de exploracion (Gemini)
12. Gems como centro de mando (Gemini Gems)
13. Crear tu propio flujo agentico (LaForja + NLM + Gems)

For each flow, also generate a **modal deep-dive** with: purpose, step-by-step with time estimates, expected output, Definition of Done, progression timeline (week 1-2, month 1, month 2), and CTA links.

### S5 — Katas (5 Shu-Ha-Ri Levels)

Generate 5 mastery checkpoints:

- **KA-1 (Shu — Observar)**: Follow step by step. 45 min. Gate: complete without skipping.
- **KA-2 (Shu — Imitar)**: Reproduce without guide. 30 min. Gate: match expected output.
- **KA-3 (Ha — Adaptar)**: Adapt to own context. 25 min. Gate: maintain output quality while adapting.
- **KA-4 (Ha — Ensenar)**: Teach a colleague. 20 min. Gate: colleague executes independently.
- **KA-5 (Ri — Crear)**: Create your own flow. 15 min. Gate: new flow produces novel value.

Each kata includes: concept, 4 practice trials, advancement criterion. Generate modals for each.

### S6 — Semaforo de Valor (Traffic Light)

Create the value traffic light:
- **Verde** (Using well): 3-4 indicators of healthy adoption
- **Amarillo** (Partial): 3-4 indicators of adoption in progress
- **Rojo** (Not using / misusing): 3-4 indicators of non-adoption or misuse

VR-AID dimensions for each indicator:
- **V** (Velocidad): Time saved
- **R** (Repetibilidad): Consistency improvement
- **A** (Alcance): Coverage expansion
- **I** (Impacto): Business outcome
- **D** (Dependencia): Risk of reverting

### S7 — Anti-patrones (13 standard)

Generate 13 anti-patterns as a decision table with modal deep-dives. Each includes:
- Number, name (bilingual), subtitle
- Symptom: how to detect it
- Why it matters: consequence of not fixing
- Detection method: concrete check
- 3 remediation steps
- Accountability: who is responsible

### S8 — Decision Matrix

Generate a situation-to-tool lookup table (15-20 rows):

| Situacion | Herramienta | Flujo | Capa |
|-----------|-------------|-------|------|

Situations should come from the team's stated problems and the gem's use cases.

### S9 — Glosario (17 terms)

Generate 17 bilingual glossary terms. Each requires: id, name, subtitleEs/En, conceptEs/En, whyEs/En, exampleEs/En. Cover: methodology vocabulary, gem names, framework concepts, 3-layer architecture terms, VR-AID dimensions.

### S10 — Empezar (6 empathy cards)

Generate 6 navigation cards:
- 5 clickable cards linking to specific flow modals via `flowNum`
- 1 static tip card with `isStatic: true`

Each card: emoji, bilingual title (pain-point framing), bilingual description, color (CSS variable), flowNum.

### S11 — Ruta (14-Playbook Roadmap)

Generate the 14-playbook roadmap section showing this playbook's position. Read from `references/ecosystem-playbooks.json`. Mark the current playbook as `.ruta-card.current`. Include the 3-layer architecture callout.

### S12 — Ritmo (Adoption Metrics)

Generate adoption metrics + acceptance criteria:
- **Metrics Row**: 4 metric cards (time reduction, precision, deliverables, OKR cycle)
- **Acceptance Criteria**: 3-4 numbered items (CA-1, CA-2, etc.) with measurable success criteria
- **Impact Modal**: Weekly progression (week 1-2 foundation, month 1 proficiency, month 2 autonomy)

### S13 — Cierre

Generate closing section:
- **Day-1 Actions**: 3-5 concrete actions for week 1
- **Next Level**: What comes after this playbook
- **Support Channels**: Where to get help
- **Gem Bar**: Links to all sibling playbooks in the ecosystem

---

## Additional Content Blocks

### Role Variants (3 objects)

Generate 3 stakeholder perspective objects:
1. **Process Lead** (`id: "process"`): Day-to-day process execution view
2. **Future Leader** (`id: "futuro"`): Emerging leader preparing for responsibility
3. **Self-Pilot** (`id: "autonomo"`): Autonomous practitioner self-managing workflow

Each: id, nameEs/En, subtitleEs/En, conceptEs/En, flowsEs/En. Optional: calloutEs/En.

### Metric Modals (4 objects)

1. **Time** (`id: "tiempo"`): Time reduction details
2. **Precision** (`id: "precision"`): Verifiable output details
3. **Deliverables** (`id: "entregables"`): Completion details
4. **OKR** (`id: "okr"`): Cycle time details

### H2 Title Pattern

All section h2 titles must use: `plain_text <span>highlight</span>` or `<span>highlight</span> plain_text`. Example: `Flujos de <span>Trabajo</span>`.

### Auto-Contenido de Herramientas

NEVER reference a tool by name alone. Always include what it does:
- "asistente de capitalización de decisiones y gestión de compromisos post-reunión (Jarvis LaVuelta)"
- "motor de síntesis anti-alucinación basado en fuentes gobernadas (NotebookLM)"

### EXITO Criteria

Every copyable prompt MUST end with: `EXITO: [criterio verificable en 1 linea]`

---

## Grounding Strategy

In every flow and kata, the 3-layer architecture must be explicit:
- **Data Layer**: Google Drive (or adapted) with governed naming and structure
- **Middleware**: NotebookLM (or custom RAG) as anti-hallucination engine — only answers from your sources
- **Front**: Gemini + Gems (or adapted) as exploration and command center
- Never skip the middleware — this is the anti-hallucination guarantee

## Constraints

- **No invented metrics**: Use ranges or qualitative indicators, not fabricated percentages
- **Real tool names only**: Exact names from the brief + auto-contenido description
- **Consistent terminology**: One name per tool everywhere
- **Actionable language**: "Configure X" not "Consider configuring X"
- **Respectful of existing processes**: Frame AI as enhancement, not replacement
- **Bilingual**: All content ES + EN
- **Evidence tags**: `[CODIGO]`, `[CONFIG]`, `[DOC]`, `[ENTREVISTA]`, `[INFERENCIA]`, `[SUPUESTO]` where applicable
- **No prices**: FTE-months with disclaimers only
