# Content Generation Prompt for Playbook Manifest

## Context

You are generating the structured content manifest for a branded AI-native playbook. The manifest is a complete JSON document that the HTML assembler will transform into a self-contained playbook. Every piece of content must be concrete, actionable, and tailored to the user's specific team, tools, and problems.

## Input

You receive a **structured brief** (JSON) containing:
- `topic`: The playbook subject
- `language`: Target language (es/en/pt)
- `audience`: Roles, seniority, team size
- `tools`: Categorized tool inventory
- `problems`: 3-4 specific problems to solve
- `grounding`: 3-layer architecture (data/middleware/front)
- `context_file`: Path to ingested context (optional)

## Output

A complete JSON manifest following the playbook schema. The manifest contains all text content, structured data, and metadata needed to assemble the HTML. No placeholder tokens — every field must have real content.

---

## Section-by-Section Generation Guide

### S1 — Oportunidad

Generate the opening section that frames the "why":

- **4 Problems**: Take the user's top problems from the brief. For each, write: a title (max 8 words), a description (2-3 sentences), the affected role(s), and the estimated weekly time waste.
- **Role-Workflow Map**: Create a table mapping each role to their top 3-4 relevant AI-native workflows from the 13 available.
- **Guardrails**: Write 3-4 guardrails (what this playbook is NOT: not a replacement for critical thinking, not an excuse to skip review, not a silver bullet).

### S2 — Ciclo Semanal

Map the user's tools to 5 moments of the weekly cycle:

- **Lunes — Planificacion**: Which tools for sprint planning, backlog review, priority setting.
- **Martes/Miercoles — Ejecucion**: Which tools for daily work, collaboration, code review.
- **Jueves — Revision**: Which tools for status checks, quality gates, demos.
- **Viernes — Capitalizacion**: Which tools for documentation, retrospectives, knowledge capture.
- **Continuo — Automatizacion**: Which tools run continuously (CI/CD, monitoring, alerts).

For each moment, describe the AI-native enhancement (what changes with AI vs. without).

### S3 — Fichas de Herramientas (Jarvis Cards)

Generate a tool card for each major tool/workflow combination. Each card includes:
- Tool name and icon reference
- Primary use case (1 sentence)
- AI-native enhancement (what AI adds)
- Layer in the 3-layer architecture (Data/Middleware/Front)
- Difficulty level (Basico/Intermedio/Avanzado)
- Time to learn estimate

### S4 — Adopcion Progresiva

Create a 4-week adoption timeline adapted to the team's capacity:

- **Semana 1 — Fundamentos**: Set up the grounding architecture. First 2-3 simple flows. Goal: everyone has access and has run 1 flow.
- **Semana 2 — Habitos**: Daily AI habits. 4-5 intermediate flows. Goal: team uses AI daily for at least 1 task.
- **Semana 3 — Flujos Avanzados**: Complex multi-tool workflows. Katas 1-2. Goal: team can chain 3+ tools in a single workflow.
- **Semana 4 — Autonomia**: Full workflow ownership. Katas 3-4. Retrospective. Goal: team operates AI-native independently.

Each week includes: objectives, activities, tools used, success criteria, and a checkpoint question.

### S5 — Arbol de Decision

Generate a situation-to-tool lookup table. Format:

| Situacion | Herramienta | Flujo | Capa |
|-----------|-------------|-------|------|

Include 15-20 common situations mapped to the user's specific tools. Situations should come from their stated problems and roles.

### S6 — Semaforo de Valor

Create the value traffic light with VR-AID framework:

- **Rojo** (No value yet): Metrics that indicate AI is not being used or is misused. 3-4 indicators.
- **Amarillo** (Partial value): Metrics showing adoption in progress. 3-4 indicators.
- **Verde** (Full value): Metrics showing AI-native maturity. 3-4 indicators.

VR-AID dimensions for each indicator:
- **V** (Velocidad): Time saved
- **R** (Repetibilidad): Consistency improvement
- **A** (Alcance): Coverage expansion
- **I** (Impacto): Business outcome
- **D** (Dependencia): Risk of reverting

### S7 — Equipo (Agradecimiento)

Generate a recognition section:
- If specific names were provided in context, include them with roles.
- If no names, generate a generic template with role-based recognition.
- Include a team commitment statement.
- Add a "champions" section for early adopters.

### S8 — Cierre

Generate the closing section:
- **Day-1 Actions**: 3-5 concrete actions to take immediately after reading the playbook.
- **Acceptance Criteria**: How the team knows the playbook adoption was successful (3-4 measurable criteria).
- **Next Level**: What comes after this playbook (advanced topics, scaling, custom workflows).
- **Support Channels**: Where to get help (generic: Slack channel, weekly office hours, playbook champion).

### Katas (4 total)

Generate 4 hands-on katas adapted to the user's tools and scenarios:

- **Kata 1** (Basico): Simple single-tool exercise. 15 min. Uses the most accessible tool.
- **Kata 2** (Intermedio): Two-tool chain exercise. 30 min. Connects data layer to middleware.
- **Kata 3** (Avanzado): Multi-tool workflow. 45 min. Full 3-layer architecture exercise.
- **Kata 4** (Maestria): Real-world scenario from the user's problems. 60 min. End-to-end solution.

Each kata includes: title, objective, prerequisites, step-by-step instructions (5-8 steps), expected output, success criteria, and a "challenge" extension for advanced users.

### Flujos (13 AI-native flows)

Generate 13 AI-native workflow descriptions, each mapped to the user's specific tools in the 3-layer architecture:

1. Capitalizacion de Reuniones
2. Generacion de Reportes
3. Analisis de Riesgos
4. Documentacion Automatica
5. Onboarding Acelerado
6. Quality Assurance AI-assisted
7. Sprint Planning Inteligente
8. Retrospectiva Aumentada
9. Monitoreo de Salud del Proyecto
10. Gestion de Conocimiento
11. Comunicacion con Stakeholders
12. Estimacion y Forecasting
13. Mejora Continua Basada en Datos

Each flow includes: name, objective (1 sentence), trigger (when to use), input (what you need), process (3-5 steps using specific tools), output (what you get), layer mapping (Data→Middleware→Front), time estimate, and difficulty level.

---

## Grounding Strategy

In every flow and kata, ensure the 3-layer architecture is explicit:
- Data always starts in the governed data layer (Drive/Confluence/SharePoint).
- Processing always goes through the middleware (NLM/RAG) for anti-hallucination.
- Exploration and output happen in the front layer (Gemini/ChatGPT/Claude).
- Never skip the middleware — this is the anti-hallucination guarantee.

### Glossary (17 terms)

Generate 17 bilingual glossary terms covering all key concepts used in the playbook. Each term requires: id, name, subtitleEs, subtitleEn, conceptEs, conceptEn, whyEs, whyEn, exampleEs, exampleEn. Terms should cover the methodology vocabulary, tool names, framework concepts, and process terms.

### Empezar Cards (6 empathy cards)

Generate 6 empathy-driven onboarding cards for the `empezarCards` array:
- 5 clickable cards that link to specific flow modals via `flowNum` (e.g., "f1", "f5")
- 1 static tip card with `isStatic: true` (general tool guidance, no modal link)

Each card has:
- `emoji`: Relevant emoji icon
- `titleEs`/`titleEn`: Empathic pain-point title (e.g., "Las reuniones se pierden en el olvido" / "Meetings vanish into thin air")
- `descEs`/`descEn`: Description pointing to the specific flow that solves this pain point
- `color`: CSS color variable (e.g., `var(--sofka-info)`, `var(--sofka-orange)`)
- `flowNum`: Flow number string for clickable cards (e.g., "f1")

### H2 Title Pattern

All section h2 titles must use the `<span>` highlight pattern for the orange-highlighted word:
- `plain_text <span>highlight</span>` or `<span>highlight</span> plain_text`
- Example: `Flujos de <span>Trabajo</span>` or `<span>Empezar</span> por aqui`

### Role Variants (3 objects)

Generate the `roleVariants` array with exactly 3 role variant objects:
1. **Process Lead** (`id: "process"`): The person managing day-to-day process execution
2. **Future Leader** (`id: "futuro"`): The emerging leader preparing for greater responsibility
3. **Self-Pilot** (`id: "autonomo"`): The autonomous practitioner who self-manages their workflow

Each variant requires: id, nameEs, nameEn, subtitleEs, subtitleEn, conceptEs, conceptEn, flowsEs, flowsEn. Optional: calloutEs, calloutEn.

### Metric Modals (4 objects)

Generate the `metricModals` array with 4 metric detail objects:
1. **Time** (`id: "tiempo"`): -50% time reduction metric details
2. **Precision** (`id: "precision"`): 100% verifiable outputs metric details
3. **Deliverables** (`id: "entregables"`): 3/3 deliverables completion metric details
4. **OKR** (`id: "okr"`): -50% OKR cycle time metric details

Each requires: id, titleEs, titleEn, subtitleEs, subtitleEn, detailEs, detailEn. Optional: evidenceEs, evidenceEn (pilot evidence).

### Impact Modal (1 object)

Generate the `impactModal` object with a weekly progression timeline:
- `titleEs`/`titleEn`: Impact modal title
- `subtitleEs`/`subtitleEn`: Impact modal subtitle
- `weeks`: Array of 3 milestone objects:
  1. Week 1-2: Initial adoption milestone
  2. Week 4: Intermediate proficiency milestone
  3. Week 8: Full autonomy milestone

Each week requires: labelEs, labelEn, descEs, descEn.

## Constraints

- **No invented metrics**: Do not fabricate specific percentages or numbers. Use ranges or qualitative indicators.
- **Real tool names only**: Use the exact tool names from the brief. No generic "your PM tool."
- **Consistent terminology**: Pick one name per tool and use it everywhere (e.g., always "Google Drive", never "GDrive" or "Drive").
- **Actionable language**: Every instruction must be executable. "Configure X" not "Consider configuring X."
- **Respectful of existing processes**: Frame AI as enhancement, not replacement. Acknowledge what the team already does well.
