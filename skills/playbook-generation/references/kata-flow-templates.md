# Kata & Flow Templates

> Knowledge base for playbook-forge agents.
> Defines the structure of each kata (1-4) and each flow (5-13) with adaptation guidelines.

---

## Part A: Katas (1-4) -- Core Habits

Katas are the foundational exercises. Each kata maps to one habit and one primary AI agent. They are designed as 30-minute, self-schedulable sessions.

### Universal Kata Template

Every kata follows this structure inside a full-width `jarvis-card`:

```
section#{kata_id}
  div.section-header
    h2: [Kata title with orange <span> highlight]
    p: [Kata subtitle/description]
  div.jarvis-card[style="max-width:none"]
    div.jarvis-card-header
      div.jarvis-icon.{agent_class}: [2-char abbreviation]
      h3: [Agent name]
        small: [Agent subtitle/role]
    div.jarvis-card-body
      div.jf: [Por que importa / Why it matters]
        div.jf-label: "POR QUE IMPORTA"
        div.jf-value: [paragraph]
      div.jf: [Ejercicio 30 min / Exercise]
        div.jf-label: "EJERCICIO (30 MIN)"
        ol: [timed steps with <strong> time marks and <a> gem links]
      div.jf: [Criterio de exito]
        div.jf-label: "CRITERIO DE EXITO"
        div.jf-value: [success criterion text]
      div.jf: [Mejor practica]
        div.jf-label: "MEJOR PRACTICA"
        div.jf-value: [best practice text]
  div.gate-box.tip-card[data-tip]: [CHECKPOINT requirement]
```

### Required Fields Per Kata

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `title` | Yes | String | Bilingual, with orange span |
| `subtitle` | Yes | String | Brief description |
| `agent_class` | Yes | Enum | `lareu`, `lavuelta`, `elrepo`, `lainfo`, `laforja` |
| `agent_abbrev` | Yes | String (2 chars) | LR, LV, ER, LI, LF |
| `agent_name` | Yes | String | Full agent name |
| `agent_subtitle` | Yes | String | Agent role description |
| `why_it_matters` | Yes* | Paragraph | *Kata 4 omits this field |
| `exercise_steps` | Yes | Ordered list | 4-5 timed steps |
| `exercise_duration` | Yes | String | Usually "30 min" |
| `tools` | Yes | List of agent names | Referenced in steps |
| `success_criterion` | Yes | Paragraph | Measurable outcome |
| `best_practice` | Yes | Paragraph | Practical tip |
| `checkpoint` | Yes | String | Gate-box requirement |
| `checkpoint_tip` | Yes | String | Tooltip text for gate-box |
| `gem_links` | Optional | URL list | External Gemini gem URLs |

---

### Kata 1: Preparar (id="kata1")

**Habit**: Preparar reuniones (Prepare meetings)
**Agent**: LaForja + LaReu
**Icon**: `.lareu` / "LR"

**Template fields**:

- **title**: "Kata 1 -- Preparar"
- **agent_name**: "LaForja + LaReu"
- **agent_subtitle**: "Generador de prompts + Analista forense de reuniones"
- **why_it_matters**: Meeting preparation reduces unproductive time by 40%. Without preparation, meetings become improvisation sessions.
- **exercise (30 min)**:
  1. (0-5 min) Open LaForja, describe the meeting purpose
  2. (5-10 min) Review the generated agenda structure
  3. (10-20 min) Open LaReu with participant context
  4. (20-30 min) Finalize the moderation guide
- **tools**: LaForja, LaReu
- **success_criterion**: "Agenda with 3+ discussion points and moderation guide before the meeting"
- **best_practice**: "Share agenda 24h before the meeting"
- **checkpoint**: "Tienes al menos 1 agenda + guia de moderacion generada con datos reales"

**Gem links**:
- LaForja: `https://gemini.google.com/gem/...`
- LaReu: `https://gemini.google.com/gem/...`

---

### Kata 2: Capitalizar (id="kata2")

**Habit**: Capitalizar decisiones (Capitalize on decisions)
**Agent**: LaVuelta
**Icon**: `.lavuelta` / "LV"

**Template fields**:

- **title**: "Kata 2 -- Capitalizar"
- **agent_name**: "LaVuelta"
- **agent_subtitle**: "Multiplicador de Claridad Operativa"
- **why_it_matters**: 65% of meeting decisions are lost within 48h if not documented. LaVuelta generates the Quad-Doc that captures decisions, tasks, and critical path in one output.
- **exercise (30 min)**:
  1. (0-5 min) Open LaVuelta immediately after meeting
  2. (5-10 min) Paste meeting notes/recording
  3. (10-20 min) Review Quad-Doc: validate decisions, assign owners
  4. (20-25 min) Add Jira labels using `<code>` tags
  5. (25-30 min) Publish to project channel
- **tools**: LaVuelta
- **success_criterion**: "Quad-Doc published within 2h of meeting end"
- **best_practice**: "Run immediately post-meeting while context is fresh"
- **checkpoint**: "Al menos 2 Quad-Docs de reuniones reales publicados"

**Gem links**:
- LaVuelta: `https://gemini.google.com/gem/...`

---

### Kata 3: Reportar (id="kata3")

**Habit**: Reportar con evidencia (Report with evidence)
**Agent**: ElRepo
**Icon**: `.elrepo` / "ER"

**Template fields**:

- **title**: "Kata 3 -- Reportar"
- **agent_name**: "ElRepo"
- **agent_subtitle**: "Asistente de Reporting con Evidencia"
- **why_it_matters**: Stakeholders need evidence-based updates, not opinions. The VR-AID framework ensures every report addresses Value, Risks, Assumptions, Issues, and Dependencies.
- **exercise (30 min)**:
  1. (0-5 min) Open ElRepo with project context
  2. (5-10 min) Feed accumulated Quad-Docs from the week
  3. (10-20 min) Review executive report and VR-AID framework
  4. (20-25 min) Validate evidence citations
  5. (25-30 min) Publish report
- **tools**: ElRepo
- **success_criterion**: "Weekly executive report with VR-AID framework and traceable citations"
- **best_practice**: "Friday morning -- let the data accumulate all week"
- **checkpoint**: "Al menos 1 reporte semanal con VR-AID generado con datos reales"

**Extra component**: `vraid-box` after the jarvis-card with VR-AID letter breakdown (V, R, A, I, D)

**Gem links**:
- ElRepo: `https://gemini.google.com/gem/...`

---

### Kata 4: Visibilizar (id="kata4")

**Habit**: Visibilizar el valor (Visualize value)
**Agent**: LaInfo
**Icon**: `.lainfo` / "LI"

**Template fields**:

- **title**: "Kata 4 -- Visibilizar"
- **agent_name**: "LaInfo"
- **agent_subtitle**: "Arquitecto de Infografias HTML"
- **why_it_matters**: *Omitted* -- this is the only kata without "Por que importa"
- **exercise (30 min)**:
  1. (0-5 min) Open LaInfo with this week's report data
  2. (5-15 min) Select visualization type and key metrics
  3. (15-25 min) Review generated HTML infographic
  4. (25-30 min) Share with stakeholders
- **tools**: LaInfo
- **success_criterion**: "HTML infographic published biweekly showing team value"
- **best_practice**: "Pair with Kata 3 output for consistency"
- **checkpoint**: "CHECKPOINT FINAL: Tienes al menos 1 infografia HTML generada con datos de reportes reales"

**Gem links**:
- LaInfo: `https://gemini.google.com/gem/...`

---

## Part B: Flows (5-13) -- Extended Methodology

Flows 5-13 extend beyond the 4 core katas. They are organized in 4 tiers:

| Tier | Flows | Theme | Background Color |
|------|-------|-------|-----------------|
| Core | 1-4 | Basic katas | Default (no tint) |
| Research/NLM | 5-8 | Advanced research + NotebookLM setup | `--sofka-orange-dim` |
| Architecture | 9-11 | 3-layer grounding setup | `--sofka-info-dim` |
| Mastery | 12-13 | Custom workflows + own flows | `--sofka-positive-dim` |

### Universal Flow Template

Each flow in the 13-flow map table needs:

| Field | Required | Type |
|-------|----------|------|
| `number` | Yes | Integer (1-13) |
| `name` | Yes | String (bilingual) |
| `layer` | Yes | Enum: core, research, architecture, mastery |
| `tools` | Yes | List of tool/agent names |
| `when` | Yes | String (trigger condition) |
| `output` | Yes | String (deliverable) |
| `exercise` | Yes (for detailed flows) | Timed steps |
| `criterion` | Yes (for detailed flows) | Success measure |
| `duration` | Optional | Default 30 min |

---

### Flow 5: Deep Research

**Tier**: Research/NLM
**Tools**: LaForja + Deep Research
**When**: Before strategic meetings requiring market/competitive data
**Output**: Market dossier with cited sources

**Exercise (30 min)**:
1. Define research question with LaForja
2. Launch Deep Research with specific parameters
3. Review sourced findings
4. Synthesize into briefing document
5. Attach to meeting preparation

**Criterion**: "Dossier with 5+ cited sources before the strategic meeting"

**HTML structure**: Full jarvis-card with `.jarvis-icon.laforja` "DR"

---

### Flow 6: Vitaminize Presentation

**Tier**: Research/NLM
**Tools**: Deep Research + NotebookLM
**When**: Before C-level or high-stakes presentations
**Output**: Brand-ready presentation deck

**Exercise (45 min)** -- note: this is the only flow with 45-min duration:
1. Gather existing presentation materials
2. Run Deep Research for supporting data
3. Feed materials into NotebookLM
4. Generate enhanced talking points and visuals
5. Assemble final deck

**Criterion**: "Presentation with grounded data points and visual consistency"

**HTML structure**: Full jarvis-card with `.jarvis-icon.elrepo` "V+"

---

### Flow 7: Populate NotebookLM

**Tier**: Research/NLM
**Tools**: NotebookLM + Google Drive
**When**: Project kickoff or when starting new initiative
**Output**: Operational notebook with governed sources

**Steps** (presented in antipatron layout, left column):
1. Create notebook in NotebookLM
2. Name following convention: `[CLIENT]-[PROJECT]-[TYPE]`
3. Upload governed documents from Drive
4. Verify source count and quality
5. Test with sample questions

---

### Flow 8: Configure NLM System Prompt

**Tier**: Research/NLM
**Tools**: NotebookLM Notes feature
**When**: After populating a notebook (follows Flow 7)
**Output**: Custom-answering notebook with defined behavior

**Steps** (presented in antipatron layout, right column):
1. Open Notes section in NotebookLM
2. Write system prompt defining expected behavior
3. Test responses against known answers

Includes `.jf-prompt` block with example system prompt text.

---

### Flow 9: Govern Drive

**Tier**: Architecture
**Tools**: Google Drive
**When**: Setup + ongoing governance
**Output**: Structured units with naming convention

**Presented as**: Compact jarvis-card with flow number "9" as icon, info-blue theme.
**Key rule**: `[CLIENTE]/[PROYECTO]/[TIPO]` naming convention.
**Tooltip**: Drive naming convention details.

---

### Flow 10: NLM as Middleware

**Tier**: Architecture
**Tools**: NotebookLM
**When**: Mixing sources that need citation tracking
**Output**: Cited answers + graphic content

**Presented as**: Compact jarvis-card with "10" icon, info-blue theme.
**Key principle**: Anti-hallucination layer.

---

### Flow 11: Gemini as Front

**Tier**: Architecture
**Tools**: Gemini
**When**: Free exploration and brainstorming
**Output**: Ideas, drafts, exploration

**Presented as**: Compact jarvis-card with "11" icon, orange theme.
**Key principle**: Exploration space grounded by middleware.

---

### Flow 12: Gems as Command Center

**Tier**: Mastery
**Tools**: Gemini Gems
**When**: After mastering flows 1-11
**Output**: Custom AI workflows per domain

**Presented as**: Compact jarvis-card with "12" icon, positive/gold theme.
**Key principle**: Gems become the team's command center.

---

### Flow 13: Create Own Agentic Flow

**Tier**: Mastery
**Tools**: LaForja + NLM + Gems
**When**: When a repetitive process is identified
**Output**: Interconnected multi-agent system

**Exercise (full jarvis-card with gear emoji icon)**:
1. Identify repetitive process
2. Map input-output chain
3. Select appropriate gems/tools
4. Build prompt chain in LaForja
5. Test with real data

**Criterion**: "Working agentic flow that saves 2+ hours/week"

---

## Part C: Learning Katas (KA-1 to KA-5) -- Transversal

These are meta-learning katas that apply across all 13 flows. They follow the Shu-Ha-Ri progression:

| Kata | Name | Level | Duration | What You Do |
|------|------|-------|----------|-------------|
| KA-1 | Observar | Shu | 15 min | Watch someone execute the flow |
| KA-2 | Imitar | Shu | 30 min | Copy the exact steps |
| KA-3 | Adaptar | Ha | 30 min | Modify for your context |
| KA-4 | Ensenar | Ri | 30 min | Teach another person |
| KA-5 | Crear | Ri | 60 min | Design your own flow |

**Mapping to flows**:
- Flows 1-4: Start at KA-2 (imitate)
- Flows 5-8: Start at KA-1 (observe first)
- Flows 9-11: Start at KA-3 (adapt to your stack)
- Flows 12-13: Start at KA-5 (create)

---

## Part D: Adaptation Guidelines

### How to Contextualize for Different Teams

**For katas (1-4)**:

1. **Replace agent names**: If the team uses different AI tools, swap Jarvis names with actual tool names. Keep the icon color system.
2. **Adjust exercise timing**: The 30-min format is a minimum. Teams with complex workflows may need 45-60 min.
3. **Localize deliverables**: Quad-Doc, VR-AID, etc. are Sofka-specific names. Replace with team terminology but keep the structure.
4. **Keep the gate-box checkpoints**: These are the quality assurance layer. Always require evidence before progressing.
5. **Adapt gem links**: Replace Gemini gem URLs with actual tool URLs for the team's stack.

**For flows (5-13)**:

1. **Flows 1-4 are mandatory**: Every team should implement the 4 core habits.
2. **Flows 5-8 depend on research needs**: Skip if team does not do strategic research.
3. **Flows 7-11 depend on grounding stack**: These are architecture-dependent. See `grounding-architecture.md` for stack adaptation rules.
4. **Flows 12-13 are mastery-only**: Only introduce after 4+ weeks with flows 1-4.

**For the 13-flow map table**:

- Keep the 4-tier color coding
- Keep the background color bands (`orange-dim`, `info-dim`, `positive-dim`)
- Replace tool names with actual stack equivalents
- Replace output names with team-specific deliverables

**Anti-pattern table adaptation**:
- Keep the 4-column structure (Anti-patron, Sintoma, Causa raiz, Correccion)
- Replace specific tool references with team equivalents
- Add team-specific anti-patterns discovered during pilot

**Habit science numbers are universal**:
- 4 trials to initiate (backed by habit research)
- 21 trials to reconfigure (backed by neuroplasticity research)
- These numbers should NOT be changed when adapting
