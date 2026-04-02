# Section Templates -- 13 Playbook Sections

> Knowledge base for playbook-forge agents.
> Documents the composition of each section in the Sofka playbook reference.

---

## Part A: Playbook Operativo (S1-S8)

These 8 sections form the operational playbook. Each section lives inside `<main class="container">` and is separated by `<hr class="section-divider">`.

---

### S1: Oportunidad (id="oportunidad")

**Purpose**: Frame the problem, map roles to tools, establish guardrails, and set capacity expectations.

**Component composition**:

1. **section-header**: Title with orange `<span>` highlight + subtitle paragraph
2. **problem-grid**: 4 problem cards (each: h4 title + p description with `<strong>` cost note)
   - Cards can override `border-left-color` and `h4 color` via inline styles
   - Default border: `--sofka-critical`; variants use orange, info, violet, green
3. **inline h3**: Subheading for role mapping
4. **map-table**: Role mapping table (4 columns: Rol, Reto principal, Jarvis prioritario, Workflow tipico)
   - 4 rows minimum, Jarvis column uses `.jarvis-name` class (orange, bold)
5. **guardrail-grid**: SI vs NO two-column grid
   - `.guardrail-col.si`: green top border, checkmark list items
   - `.guardrail-col.no`: red top border, X-mark list items
   - 6 items per column (12 total)
6. **callout (warning)**: Supuestos/assumptions
   - Yellow callout with `<strong>` title + `<ul>` (4 items)
7. **inline h3**: Capacidad subheading
8. **decision-table**: Capacity/investment table (4 columns: Periodo, Horas/semana, Desglose, Implicacion)
   - 2 rows (e.g., S1-S3 vs S4+)
9. **callout (orange)**: Ritmo recomendado
   - Orange callout with title + paragraph

---

### S2: Ciclo (id="ciclo")

**Purpose**: Present the agentic workflow cycle, map deliverables, and introduce Gem links.

**Component composition**:

1. **section-header**: Title + subtitle
2. **cycle-visual**: 5 workflow steps with arrows between them
   - Each step: `.step-num` (orange circle) + `.step-label` + `.step-jarvis` + `.step-artifact`
   - 4 `.cycle-arrow` elements between 5 steps
3. **map-table**: Jarvis deliverables table (4 columns: Jarvis, Artefacto, Que resuelve, Frecuencia)
   - 5 rows (one per Jarvis agent)
4. **gem-bar**: Black bar with 5 gem links
   - `.gem-bar-title` + 5x `a.gem-link` (each with star icon via `::before`)
5. **inline h3**: Entregables subheading
6. **decision-table**: Deliverables detail table (5 columns: #, Entregable, Alcance, Frecuencia, Jarvis)
   - 5 rows
7. **callout (info)**: Jira tag integration
   - Blue callout with `<code>` tags for Jira label names

---

### S3: Jarvis Fichas (id="jarvis")

**Purpose**: Detail each AI agent with full specification cards.

**Component composition**:

1. **section-header**: Title + subtitle
2. **jarvis-cards**: Grid of 5 agent cards
   - Each card structure:
     - `jarvis-card-header`: `.jarvis-icon.{variant}` (2-char abbrev) + `h3` (name + `<small>` subtitle)
     - `jarvis-card-body`:
       - `<p>` description
       - `div.jf` (Artefacto principal): `.jf-label` + `.jf-value`
       - `div.jf` (Cuando usarlo): `.jf-label` + `.jf-value`
       - `div.jf` (Ejemplo de prompt): `.jf-label` + `.jf-prompt` (code block)
       - `div.jf` (Conexion VR-AID): `.jf-label` + `.jf-value`
       - `div.jf-antiuse`: anti-use warning (red background)
       - `a.gem-link`: External Gemini gem URL

**5 card variants**:

| # | Icon Class | Abbrev | Name |
|---|-----------|--------|------|
| 1 | `.laforja` | LF | Jarvis LaForja |
| 2 | `.lareu` | LR | Jarvis LaReu |
| 3 | `.lavuelta` | LV | Jarvis LaVuelta |
| 4 | `.elrepo` | ER | Jarvis ElRepo |
| 5 | `.lainfo` | LI | Jarvis LaInfo |

---

### S4: Adopcion (id="adopcion")

**Purpose**: Present the 4-week adoption timeline with gates.

**Component composition**:

1. **section-header**: Title + subtitle
2. **timeline**: 4 timeline items (one per week)
   - Each item:
     - `.timeline-dot` (numbered, color by position: orange, info, green, violet)
     - `.timeline-content`:
       - `h3 > span.wk` (week label) + title
       - `p.week-obj` (objective)
       - `div.jtags`: agent tags (`.jtag.t-{variant}`)
       - `div.tl-deliverable`: deliverable description
       - `div.gate-box`: gate criteria (gold text on black)
3. **callout (orange)** x3: Edge case scenarios
   - 3 separate orange callouts for specific situations

---

### S5: Decision Rapida (id="decision")

**Purpose**: Quick-reference decision matrix for common situations.

**Component composition**:

1. **section-header**: Title + subtitle
2. **decision-table**: Situation matrix (5 columns: Situacion, Jarvis, Input minimo, Output esperado, Tiempo)
   - 8 rows with color-coded Jarvis names
3. **metrics-row**: 4 KPI metric cards
   - Each card: `.mv` (large value) + `.ml` (label)

---

### S6: Semaforo + VR-AID (id="semaforo")

**Purpose**: Define the value traffic light and the VR-AID framework.

**Component composition**:

1. **section-header**: Title + subtitle
2. **semaforo-grid**: 4 traffic light cards
   - `.semaforo-card.verde`: Green (visible value)
   - `.semaforo-card.blanco`: White/gray (enabling value)
   - `.semaforo-card.amarillo`: Yellow (1 week no value)
   - `.semaforo-card.rojo`: Red (2+ weeks no value)
   - Each card: `h4` (colored) + `p` (description)
3. **vraid-box**: VR-AID breakdown
   - `h3` title
   - `div.vraid-letters`: 5 letter cards (V, R, A, I, D)
     - Each: `.letter` (large character) + `.meaning` (definition) + `.feeds` (source agents)
   - `p.vraid-note`: Explanatory note
4. **inline h3**: Template subheading
5. **decision-table**: VR-AID template table (3 columns: Campo, Contenido, Ejemplo)
   - 6 rows (ID, V, R, A, I, D) + optional Decision row

---

### S7: Agradecimiento / Equipo (id="agradecimiento")

**Purpose**: Social proof with case study and testimonials.

**Component composition**:

1. **section-header**: Title + subtitle
2. **case-highlight**: Hero metric box
   - Left: `.case-metric` with `.big` (large number) + `.unit` (label)
   - Right: `.case-detail` with `h4` + `p`
3. **testimonial-grid**: 3 testimonial cards
   - Each: `.testimonial-quote` (italic text) + `.testimonial-author` (name) + `.testimonial-role` (position)
4. **callout (orange)**: Support information

---

### S8: Cierre (id="cierre")

**Purpose**: Day-1 actions and acceptance criteria.

**Component composition**:

1. **section-header**: Title + subtitle
2. **decision-table**: Day-1 actions (5 columns: #, Accion, Responsable, Herramienta, Evidencia)
   - 5 rows, some cells contain `<a>` links to Gemini gems
3. **inline h3**: Acceptance criteria heading
4. **inline p**: Subtitle
5. **acceptance-list**: 5 acceptance criteria
   - `<ol class="acceptance-list">` with CSS counter prefix "CA-1" through "CA-5"

---

## Part B: Cartilla de Katas + Flujos (S9-S13)

These sections come from the Katas adoption document. They extend the base playbook with hands-on exercises and the full 13-flow methodology.

---

### S9: Empieza / Como usar esta cartilla (id="empieza")

**Purpose**: Onboarding guide to the katas system.

**Component composition**:

1. **section-header**: Bilingual title + subtitle
2. **problem-grid** (variant): 4 step cards with `.tip-card` class
   - Each card has `data-tip` tooltip, inline `border-left-color` override (orange, info, green, violet)
3. **callout (orange)**: Pedagogical principle (70-20-10 model)
4. **platform-badge** x2: Tool introduction cards (Gemini + NotebookLM)
   - Each with `.reveal-trigger` + `.reveal-box` for expandable details
5. **callout (info)**: Prerequisites checklist (3 items)
6. **decision-table**: Session breakdown (6 rows: 4 katas + empty + total)
7. **callout (warning)**: Time trade-off (30 vs 60 min)
8. **callout (info)**: Upload rules (what to / not to upload)
9. **NotebookLM box**: Operational memory setup
   - Reuses `guardrail-grid` with info-blue styling
   - `gem-bar` with NotebookLM link

---

### S10: Habitos / Los 4 habitos (id="habitos")

**Purpose**: Present the 4 core habits and the science behind habit formation.

**Component composition**:

1. **section-header**: Bilingual title + subtitle
2. **cycle-visual**: 4 habit steps with arrows
   - Each step: color-coded border (info, orange, green, violet), bilingual labels, Jarvis name, artifact
3. **map-table**: Workflow mapping (4 columns: Flujo, Kata, Gema, Que cambia)
4. **inline h3**: Habit science heading
5. **case-highlight** x2: Twin boxes
   - First: "4 ensayos para iniciar" (orange theme)
   - Second: "21 ensayos para reconfigurar" (info-blue theme, override)
6. **decision-table**: Habit progression table
   - 4 rows (one per workflow), 3 progression phases
7. **callout (orange)**: Reconfiguration math breakdown
8. **callout (info)**: Commit to 4 trials

---

### S11: Katas 1-4 (id="kata1", "kata2", "kata3", "kata4")

**Purpose**: Detailed exercise guides for each of the 4 core katas.

Each kata follows the same structure:

1. **section-header**: Bilingual title + subtitle
2. **jarvis-card** (full-width variant: `style="max-width:none"`):
   - Header: `.jarvis-icon.{variant}` + bilingual `h3` with `<small>` subtitle
   - Body:
     - `div.jf` (Por que importa): Why this kata matters
     - `div.jf` (Ejercicio 30 min): Timed steps as `<ol>` with `<strong>` time marks and `<a>` gem links
     - `div.jf` (Criterio de exito): Success criterion
     - `div.jf` (Mejor practica): Best practice tip
3. **gate-box**: Checkpoint with `.tip-card` and `data-tip`

**Per-kata specifics**:

| Kata | ID | Icon | Agent(s) | Steps | Extra Component |
|------|-----|------|----------|-------|-----------------|
| Kata 1: Preparar | `kata1` | `.lareu` "LR" | LaForja + LaReu | 4 | -- |
| Kata 2: Capitalizar | `kata2` | `.lavuelta` "LV" | LaVuelta | 5 | -- |
| Kata 3: Reportar | `kata3` | `.elrepo` "ER" | ElRepo | 5 | **vraid-box** (VR-AID breakdown) |
| Kata 4: Visibilizar | `kata4` | `.lainfo` "LI" | LaInfo | 4 | No "Por que importa" field; uses "CHECKPOINT FINAL" |

---

### S12: 13 Flujos (id="flujos")

**Purpose**: The complete methodology with all 13 AI-native flows.

**Component composition**:

1. **section-header**: Bilingual title + subtitle
2. **vraid-box** (variant): 3-layer architecture box
   - Info-blue color override via inline styles
   - 3 cards: Data Layer, Middleware (NotebookLM), Front (Gemini + Gems)
3. **map-table**: Complete 13-flow reference table
   - 13 rows with background color coding:
     - Rows 1-4: default (core flows)
     - Rows 5-8: `--sofka-orange-dim` (research/NLM flows)
     - Rows 9-11: `--sofka-info-dim` (architecture flows)
     - Rows 12-13: `--sofka-positive-dim` (mastery flows)
   - Columns: #, Flujo, Herramientas, Cuando, Output
4. **Flow 5: Deep Research**: jarvis-card with LaForja icon "DR", 5 steps
5. **Flow 6: Vitaminize**: jarvis-card with ElRepo icon "V+", 45-min exercise (5 steps)
6. **Flows 7-8: NotebookLM Setup**: antipatron layout variant (both columns `.good`)
   - Left: Flow 7 steps (info-blue border)
   - Right: Flow 8 steps (orange border) with `.jf-prompt` example
7. **Flows 9-12: Layer Cards**: 2x2 grid of jarvis-card.tip-card
   - Icons are flow numbers (9, 10, 11, 12) with inline color styles
8. **Flow 13: Create Own Flow**: jarvis-card with gear emoji icon
   - 5 sequential steps + success criterion
   - `callout (info)`: Example about the 5 Jarvis
9. **Learning Katas Table (KA-1 to KA-5)**: map-table with 5 rows
   - Columns: Kata, Nombre, Que haces, Duracion, Criterio
   - Maps to Shu-Ha-Ri levels
10. **case-highlight** (variant): Shu-Ha-Ri progression
    - `.big` value is text "KA" instead of a number
11. **callout (orange)**: How to apply learning katas
12. **gate-box**: Closing note about flows 1-4 vs 5-13

---

### S13: Anti-patrones + Tu Ritmo + Gemas (id="antipatrones", "ritmo", "gemas")

These are three related closing sections in the katas document.

#### S13a: Anti-patrones (id="antipatrones")

1. **section-header**: Title + subtitle
2. **decision-table**: Anti-pattern troubleshooting (4 columns: Anti-patron, Sintoma, Causa raiz, Correccion)
   - 5 rows
3. **callout (orange)**: Summary guidance

#### S13b: Tu Ritmo (id="ritmo")

1. **section-header**: Title + subtitle
2. **metrics-row**: 4 KPI metric cards
3. **callout (orange)**: Weekly progression guide (4 weeks)
4. **callout (info)**: Advice for limited time
5. **semaforo-grid** (variant): 3 maturity levels (3-column override)
   - Novato (verde), Practicante (blanco), Autonomo (orange inline)
6. **decision-table**: Weekly scorecard (5 columns: Metrica, Sem 1-4)
   - 6 metric rows

#### S13c: Gemas (id="gemas")

1. **section-header**: Title + subtitle
2. **gem-bar**: 5 gem links (LaForja, LaReu, LaVuelta, ElRepo, LaInfo)
3. **Auto-deploy calendar box**: Black box with:
   - Bilingual title + description
   - `a.pulse.gem-link`: CTA with pulse animation
   - `<details>/<summary>`: Expandable prompt text in `<pre>`
   - `decision-table`: 6 calendar event rows
4. **callout (warning)**: Acknowledgments/credits
5. **Author metadata box**: Wrapped `decision-table` with 7 metadata rows

---

## Summary: Component Usage Frequency

| Component | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 | S9 | S10 | S11 | S12 | S13 |
|-----------|----|----|----|----|----|----|----|----|----|----|-----|-----|-----|
| section-header | x | x | x | x | x | x | x | x | x | x | x | x | x |
| problem-grid | x | | | | | | | | x | | | | |
| map-table | x | x | | | | | | | | x | | x | |
| decision-table | x | x | | | x | x | | x | x | x | | x | x |
| callout | x | x | | | | | x | | x | x | | x | x |
| guardrail-grid | x | | | | | | | | x | | | | |
| jarvis-cards | | | x | | | | | | | | x | x | |
| cycle-visual | | x | | | | | | | | x | | | |
| timeline | | | | x | | | | | | | | | |
| gem-bar | | x | | | | | | | x | | | | x |
| metrics-row | | | | | x | | | | | | | | x |
| semaforo-grid | | | | | | x | | | | | | | x |
| vraid-box | | | | | | x | | | | | x | x | |
| case-highlight | | | | | | | x | | | x | | x | |
| testimonial-grid | | | | | | | x | | | | | | |
| acceptance-list | | | | | | | | x | | | | | |
| gate-box | | | | x | | | | | | | x | x | |
