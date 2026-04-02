# Katas & Adoption HTML -- Exhaustive Component Inventory

**Source**: `/Users/deonto/Documents/workspace/outputs/tasks/jarvis_katas_adopcion_sofka.html`
**Total lines**: 1583
**Version**: Cartilla Jarvis v3.0 GOLD -- Bilingual
**Generated**: 2026-04-02

---

## Table of Contents

1. [Global: CSS Custom Properties (Design Tokens)](#1-global-css-custom-properties)
2. [Global: CSS Class Registry](#2-global-css-class-registry)
3. [Bilingual System](#3-bilingual-system)
4. [Section: `<head>` and Style Block](#4-head-and-style-block)
5. [Section: Skip Link](#5-skip-link)
6. [Section: NAV (toc)](#6-nav-toc)
7. [Section: HERO](#7-hero)
8. [Section: Empieza (S0)](#8-empieza-s0)
9. [Section: Habitos (S1)](#9-habitos-s1)
10. [Section: Kata 1 -- Preparar](#10-kata-1-preparar)
11. [Section: Kata 2 -- Capitalizar](#11-kata-2-capitalizar)
12. [Section: Kata 3 -- Reportar](#12-kata-3-reportar)
13. [Section: Kata 4 -- Visibilizar](#13-kata-4-visibilizar)
14. [Section: 13 Flujos](#14-13-flujos)
15. [Section: Anti-patrones](#15-anti-patrones)
16. [Section: Tu Ritmo](#16-tu-ritmo)
17. [Section: Gemas](#17-gemas)
18. [Section: Footer](#18-footer)
19. [Section: Script](#19-script)
20. [NEW Components vs Base Playbook](#20-new-components-vs-base-playbook)

---

## 1. Global: CSS Custom Properties

**Lines**: 13-54

All tokens are identical to the base playbook SOFKA DS v5.1, with these additions/confirmations:

| Token | Value | Notes |
|-------|-------|-------|
| `--sofka-positive` | `#FFD700` | Used for gold/mastery tier |
| `--sofka-positive-dim` | `rgba(255,215,0,.12)` | NEW -- not in base playbook |
| `--sofka-positive-text` | `#B8860B` | NEW -- not in base playbook |
| `--sofka-warning` | `#D97706` | Same as base |
| `--sofka-warning-dim` | `rgba(217,119,6,.08)` | Same as base |
| `--sofka-warning-border` | `rgba(217,119,6,.3)` | Same as base |

All other tokens (`--sofka-orange`, `--sofka-black`, `--sofka-white`, `--sofka-light`, `--sofka-critical*`, `--sofka-info*`, `--sofka-green`, `--sofka-teal`, `--sofka-violet`, `--sofka-gray-*`, `--font-display`, `--font-body`, `--radius-*`, `--shadow-*`, `--max-w`) match the base playbook.

---

## 2. Global: CSS Class Registry

### Classes SHARED with Base Playbook

| Class | Lines (CSS) | Purpose |
|-------|-------------|---------|
| `.skip-link` | 62-63 | Accessibility skip link |
| `nav.toc` | 67 | Sticky top navigation |
| `.toc-inner` | 68-69 | Nav inner flex container |
| `.toc-logo` | 70 | Sofka brand text in nav |
| `nav.toc a` | 71-72 | Nav links |
| `.hero` | 75-76 | Hero section |
| `.hero::before` | 76 | Orange radial gradient overlay |
| `.hero-inner` | 77 | Hero content wrapper |
| `.hero-logo` | 78 | Sofka Technologies logo text |
| `.hero-badges` | 79 | Flex badge container |
| `.hero-badge` | 80 | Individual hero badge |
| `.hero h1` | 81 | Hero title |
| `.hero h1 span` | 82 | Orange-highlighted text in hero title |
| `.hero-sub` | 83 | Hero subtitle paragraph |
| `.hero-kpis` | 84 | KPI grid |
| `.hero-kpi` | 85 | Single KPI cell |
| `.hero-kpi-icon` | 86 | KPI emoji icon |
| `.hero-kpi-value` | 87 | KPI large value |
| `.hero-kpi-label` | 88 | KPI label text |
| `main.container` | 91-92 | Main content wrapper |
| `.section-header` | 93-96 | Section header block |
| `.section-divider` | 97 | HR divider |
| `.problem-grid` | 100 | Auto-fit grid for problem cards |
| `.problem-card` | 101-104 | Problem/step card |
| `.antipatron` | 107 | 3-column compare layout |
| `.antipatron-col` | 108 | Compare column |
| `.antipatron-col.bad` | 109 | Red-bordered bad column |
| `.antipatron-col.good` | 110 | Green-bordered good column |
| `.antipatron-arrow` | 118 | Arrow between columns |
| `.cycle-visual` | 121 | Flex cycle step container |
| `.cycle-step` | 122-123 | Individual cycle step card |
| `.step-num` | 124 | Orange circle with number |
| `.step-label` | 125 | Step name |
| `.step-jarvis` | 126 | Jarvis agent name |
| `.step-artifact` | 127 | Output artifact name |
| `.cycle-arrow` | 128 | Arrow between cycle steps |
| `.map-table` | 131-135 | Data mapping table |
| `.jarvis-name` | 135 | Orange bold agent name in tables |
| `.jarvis-cards` | 138 | Grid for Jarvis cards |
| `.jarvis-card` | 139-140 | Individual Jarvis card |
| `.jarvis-card-header` | 141 | Card header with icon |
| `.jarvis-icon` | 142 | 44x44 icon box |
| `.jarvis-icon.lareu` | 143 | Blue icon variant |
| `.jarvis-icon.lavuelta` | 144 | Orange icon variant |
| `.jarvis-icon.elrepo` | 145 | Green icon variant |
| `.jarvis-icon.lainfo` | 146 | Violet icon variant |
| `.jarvis-icon.laforja` | 147 | Red/critical icon variant |
| `.jarvis-card-body` | 150-151 | Card body |
| `.jf` | 152 | Jarvis field wrapper |
| `.jf-label` | 153 | Field label (uppercase, orange) |
| `.jf-value` | 154 | Field value |
| `.jf-prompt` | 155 | Code/prompt block |
| `.timeline` | 158-159 | Timeline container with gradient line |
| `.timeline-item` | 160 | Timeline node |
| `.timeline-dot` | 161 | Colored dot |
| `.timeline-content` | 166-168 | Timeline card |
| `.jtags` | 170 | Tag flex container |
| `.jtag` | 171 | Tag pill |
| `.jtag.t-lareu` | 172 | Blue tag |
| `.jtag.t-lavuelta` | 173 | Orange tag |
| `.jtag.t-elrepo` | 174 | Green tag |
| `.jtag.t-lainfo` | 175 | Violet tag |
| `.jtag.t-laforja` | 176 | Red tag |
| `.tl-deliverable` | 177-178 | Timeline deliverable block |
| `.compare-grid` | 181 | Before/after grid |
| `.compare-col` | 182-183 | Compare column |
| `.compare-col.before` | 183 | Red before column |
| `.compare-col.after` | 184 | Green after column |
| `.metrics-row` | 193 | 4-column metric grid |
| `.metric-card` | 194-196 | Single metric card |
| `.metric-card .mv` | 195 | Metric value |
| `.metric-card .ml` | 196 | Metric label |
| `.semaforo-grid` | 199 | Semaforo grid |
| `.semaforo-card` | 200 | Semaforo card |
| `.semaforo-card.verde` | 201 | Green semaforo |
| `.semaforo-card.blanco` | 202 | White/gray semaforo |
| `.semaforo-card.amarillo` | 203 | Yellow semaforo |
| `.semaforo-card.rojo` | 204 | Red semaforo |
| `.vraid-box` | 213-214 | VR-AID container box |
| `.vraid-letters` | 215 | VR-AID letter flex |
| `.vraid-letter` | 216-219 | Single VR-AID letter card |
| `.vraid-note` | 220-221 | VR-AID note text |
| `.gem-link` | 224-226 | Orange CTA button with star |
| `.gem-bar` | 227-228 | Black bar with gem links |
| `.gem-bar-title` | 228 | Gem bar title text |
| `.callout` | 231 | Base callout |
| `.callout-warning` | 232 | Yellow callout |
| `.callout-info` | 233 | Blue callout |
| `.callout-orange` | 234 | Orange callout |
| `.decision-table` | 241-244 | Decision/data table |
| `.guardrail-grid` | 247 | 2-column guardrail grid |
| `.guardrail-col` | 248 | Guardrail column |
| `.guardrail-col.si` | 249 | Green guardrail (do) |
| `.guardrail-col.no` | 250 | Red guardrail (don't) |
| `.gate-box` | 260 | Black/gold checkpoint box |
| `.jf-antiuse` | 263-264 | Anti-use warning block |
| `.acceptance-list` | 267-269 | Numbered acceptance criteria |
| `.testimonial-grid` | 272 | Testimonial grid |
| `.testimonial` | 273 | Single testimonial |
| `.case-highlight` | 277-282 | Case study highlight box |
| `.case-metric` | 278 | Big metric in case box |
| `.case-detail` | 281-282 | Detail text in case box |
| `.recommendations` | 283 | Recommendations wrapper |
| `.rec-card` | 284-286 | Recommendation card |
| `footer.site-footer` | 289-290 | Footer block |
| `.footer-inner` | 290 | Footer content wrapper |
| `.footer-row` | 291 | Footer flex row |
| `.footer-logo` | 292 | Footer logo text |
| `.footer-badges` | 293 | Footer badge container |
| `.footer-badge` | 294 | Footer badge pill |
| `.footer-bottom` | 295 | Footer copyright line |

### Classes NEW to this Document (not in base playbook)

| Class | Lines (CSS) | Purpose | Flag |
|-------|-------------|---------|------|
| `.tip-card` | 335-338 | Tooltip-on-hover component using `data-tip` attribute | **NEW** |
| `.tip-card::after` | 337 | Tooltip popup via CSS `content: attr(data-tip)` | **NEW** |
| `.reveal-box` | 339 | Collapsible content box (max-height transition) | **NEW** |
| `.reveal-trigger` | 340, 343 | Hidden checkbox for reveal toggle | **NEW** |
| `.reveal-trigger:checked ~ .reveal-box` | 340 | Expanded state for reveal | **NEW** |
| `.reveal-label` | 341-342 | Clickable label for reveal | **NEW** |
| `.pulse` | 344-345 | Pulsing orange glow animation | **NEW** |
| `.platform-badge` | 346-350 | Platform card (Gemini/NotebookLM) | **NEW** |
| `.pb-icon` | 348 | Platform badge icon | **NEW** |
| `.pb-name` | 349 | Platform badge name | **NEW** |
| `.pb-desc` | 350 | Platform badge description | **NEW** |
| `.lang-btn` | 355-358 | Language toggle button | **NEW** |
| `body.lang-es .en` | 353 | Hide English spans | **NEW** |
| `body.lang-en .es` | 354 | Hide Spanish spans | **NEW** |
| `nav .lang-btn` | 357-358 | Nav-specific lang button style | **NEW** |

---

## 3. Bilingual System

**CSS**: Lines 352-358
**JS**: Lines 1568-1581

### Mechanism

1. `<body class="lang-es">` is the default state (line 361)
2. CSS rules `body.lang-es .en { display: none !important; }` and `body.lang-en .es { display: none !important; }` toggle visibility
3. All bilingual content uses paired `<span class="es">...</span><span class="en">...</span>` inside the same parent element
4. A `<button class="lang-btn">` in the nav (line 378) calls `toggleLang()`
5. A second lang-btn exists in the hero as `hero-badge` style (line 388 area -- badges use bilingual spans)
6. The `<html lang="es">` attribute is also toggled by the JS function (line 2 for initial, line 1574 for toggle)

### Data Slots for Bilingual Content

Every user-facing text element has paired `<span class="es">` and `<span class="en">` children. This is used in:
- Nav links (lines 368-377)
- Hero badges, titles, subtitles, KPI labels (lines 387-420)
- Section headers (all `<h2>`, `<h3>`, `<p>` in section-header blocks)
- Table headers (`<tr class="es">` and `<tr class="en">` as separate rows)
- Table cell content (bilingual spans inside `<td>`)
- Callout content
- Jarvis card fields
- Gate/checkpoint boxes
- Footer text

---

## 4. Head and Style Block

**Lines**: 1-360

| Sub-component | Lines | Notes |
|---------------|-------|-------|
| DOCTYPE + html | 1-2 | `<html lang="es">` |
| Meta tags | 3-5 | charset, viewport |
| Title | 6 | "Cartilla Jarvis -- Guia de Auto-Adopcion..." |
| Google Fonts preconnect | 7-8 | fonts.googleapis.com, fonts.gstatic.com |
| Inter font | 9 | Weights: 300-900 |
| Clash Grotesk font | 10 | Weights: 400-700 via fontshare |
| `<style>` block | 11-358 | All CSS inline |
| Reset | 55 | `*, *::before, *::after { box-sizing... }` |
| Base html/body | 56-57 | Smooth scroll, antialiasing |
| Headings | 58 | font-display, 700, line-height 1.2 |
| Links | 59-60 | Orange-dark default |
| Strong | 61 | Black, 700 |
| Responsive (768px) | 298-313 | Mobile breakpoint |
| Responsive (480px) | 314-318 | Small mobile breakpoint |
| Print styles | 321-331 | Page breaks, no bg |
| Reduced motion | 332 | Respects prefers-reduced-motion |

---

## 5. Skip Link

**Lines**: 362

```
<a href="#main" class="skip-link">
  <span class="es">Ir al contenido</span>
  <span class="en">Skip to content</span>
</a>
```

- **Classes**: `skip-link`
- **Bilingual**: Yes
- **Data slots**: None (static)
- **Status**: Same as base playbook

---

## 6. NAV (toc)

**Lines**: 364-380

### Structure

```
nav.toc
  div.toc-inner
    div.toc-logo          -- "Sofka"
    a[href=#empieza]      -- bilingual spans
    a[href=#habitos]      -- bilingual spans
    a[href=#kata1]        -- bilingual spans
    a[href=#kata2]        -- bilingual spans
    a[href=#kata3]        -- bilingual spans
    a[href=#kata4]        -- bilingual spans
    a[href=#flujos]       -- "13" + bilingual spans
    a[href=#antipatrones] -- bilingual spans
    a[href=#ritmo]        -- bilingual spans
    a[href=#gemas]        -- bilingual spans
    button.lang-btn       -- "EN / ES" (NEW)
```

### Data Slots

| Slot | Type | Content |
|------|------|---------|
| Nav links `href` | Anchor IDs | `#empieza`, `#habitos`, `#kata1-4`, `#flujos`, `#antipatrones`, `#ritmo`, `#gemas` |
| Nav link text | Bilingual | es/en span pairs |

### NEW vs Base

- **NEW**: `button.lang-btn` with `onclick="toggleLang()"` -- not in base playbook
- **NEW**: Nav sections for `#habitos`, `#kata1-4`, `#flujos`, `#antipatrones`, `#ritmo` are specific to this document

---

## 7. HERO

**Lines**: 382-423

### Structure

```
header.hero
  div.hero-inner
    div.hero-logo                -- "Sofka Technologies"
    div.hero-badges
      span.hero-badge x3         -- bilingual
    h1.es                        -- Spanish title with <span> orange highlights
    h1.en                        -- English title with <span> orange highlights
    p.hero-sub.es                -- Spanish subtitle
    p.hero-sub.en                -- English subtitle
    div.hero-kpis
      div.hero-kpi x5            -- icon, value, label (bilingual)
```

### KPI Data Slots

| # | Icon | Value | Label (es) | Label (en) |
|---|------|-------|-----------|-----------|
| 1 | target emoji | 4 | Habitos a instalar | Habits to build |
| 2 | stopwatch emoji | 30 min | Por kata (auto-agendable) | Per kata (self-scheduled) |
| 3 | calendar emoji | 3 h/sem | Inversion total | Total investment |
| 4 | wrench emoji | 5 | Gemas IA incluidas | AI Gems included |
| 5 | checkmark emoji | 0 | Dependencias externas | External dependencies |

### Variants vs Base

- Base playbook has 5 KPIs in hero; this file also has 5 but with different content
- Hero badges: 3 badges (same pattern as base)
- **NEW**: KPI #3 has bilingual span INSIDE the value: `3 h/<span class="es">sem</span><span class="en">wk</span>`

---

## 8. Empieza (S0) -- "Como usar esta cartilla"

**Lines**: 427-626
**ID**: `#empieza`

### Sub-components

#### 8.1 Section Header (lines 429-434)
- `div.section-header` > `h2.es`, `h2.en`, `p.es`, `p.en`
- Standard pattern

#### 8.2 Problem Grid as "Steps" (lines 436-457) -- **VARIANT**
- `div.problem-grid` with 4x `div.problem-card.tip-card`
- **VARIANT**: Uses `problem-card` with `tip-card` class AND inline `style` overrides for border-left-color (orange, info, green, violet instead of all-critical)
- **NEW**: `data-tip` attributes on each card for tooltip content
- Each card: `h4` (inline color override), `p.es`, `p.en`

| Card | Border Color | data-tip (es) |
|------|-------------|---------------|
| 1. Elige tu kata | `--sofka-orange` | "Si tienes poco tiempo, empieza por Kata 2..." |
| 2. Agenda 30 min | `--sofka-info` | "Si no esta en el calendario, no existe..." |
| 3. Practica con evidencia | `#16A34A` | "Datos inventados = output pobre..." |
| 4. Verifica resultado | `--sofka-violet` | "4 ensayos para iniciar el habito..." |

#### 8.3 Callout: Pedagogical Principle (lines 459-464)
- `div.callout.callout-orange`
- `strong.es`, `strong.en`, `p.es`, `p.en`
- Content: 70-20-10 learning model

#### 8.4 Platform Badges (lines 466-515) -- **NEW COMPONENT**
- Inline `<h3>` with bilingual spans
- Inline grid: `style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;"`
- 2x `div.platform-badge.tip-card` with complex nested structure:

**Platform Badge inner structure:**
```
div.platform-badge.tip-card[data-tip][style]
  div[style=flex row]
    span.pb-icon          -- emoji
    span.pb-name          -- platform name
  p.pb-desc[style]        -- bilingual description with <strong>
  input.reveal-trigger[type=checkbox][id=reveal-X]    -- NEW
  label.reveal-label[for=reveal-X]                     -- NEW
    span.es / span.en
  div.reveal-box[style]                                 -- NEW
    p[style]
      span.es / span.en
```

| Platform | Icon | Name | reveal-id | data-tip |
|----------|------|------|-----------|----------|
| Google Gemini | sparkles | Google Gemini | `reveal-gemini` | "Gemini es gratuito con cuenta corporativa..." |
| Google NotebookLM | book | Google NotebookLM | `reveal-nlm` | "NotebookLM es tu memoria operativa..." |

#### 8.5 Callout: Prerequisites (lines 517-530)
- `div.callout.callout-info`
- `strong.es/en`, `ul.es`, `ul.en` (3 items each)

#### 8.6 Session Breakdown Table (lines 532-550)
- Inline `<h3>` bilingual
- Inline `<p>` bilingual
- `table.decision-table` with bilingual thead rows
- 5 data rows + 1 total row
- **Data slots**: Session #, Kata name (color-coded), duration, frequency, subtotal

#### 8.7 Callout: Trade-off 30 vs 60 min (lines 552-557)
- `div.callout.callout-warning`

#### 8.8 Callout: What to upload / not upload (lines 559-574)
- `div.callout.callout-info`
- Complex `<ul>` with color-coded `<strong>` for SI/NO rules

#### 8.9 NotebookLM Operational Memory Box (lines 576-625) -- **NEW COMPONENT**
- Wrapper: `div[style]` with info-blue border
- Inner `<h3>` bilingual with book emoji
- `<p>` bilingual description
- `div.guardrail-grid` (reused class, but with info-blue `style` override)
  - Left column: "Que cargar" (5 items, bilingual)
  - Right column: "Para que sirve" (5 items, bilingual)
- `div.gem-bar` with NotebookLM link
- Info box about Winning Sales Deck Generator

---

## 9. Habitos (S1) -- "Los 4 habitos"

**Lines**: 630-756
**ID**: `#habitos`

### Sub-components

#### 9.1 Section Header (lines 632-637)

#### 9.2 Cycle Visual -- 4 Habits (lines 639-667) -- **NEW CONTENT**
- `div.cycle-visual` with 4x `div.cycle-step` + 3x `div.cycle-arrow`
- Each step has inline `style` for border-color (info, orange, green, violet)
- Structure per step: `.step-num`, `.step-label` (bilingual), `.step-jarvis`, `.step-artifact` (bilingual)

| Step | Color | Label | Jarvis | Artifact |
|------|-------|-------|--------|----------|
| 1 | info | Preparar reuniones | LaForja + LaReu | Agenda + guia de moderacion |
| 2 | orange | Capitalizar decisiones | LaVuelta | Quad-Doc: tareas + ruta critica |
| 3 | green | Reportar con evidencia | ElRepo | Reporte Ejecutivo + VR-AID |
| 4 | violet | Visibilizar el valor | LaInfo | Infografia ejecutiva HTML |

#### 9.3 Workflow Map Table (lines 672-685) -- **NEW CONTENT**
- `table.map-table` with 4 rows
- Columns: Flujo, Kata, Gema, Que cambia

#### 9.4 Habit Science Section (lines 687-755) -- **NEW COMPONENT**
- Inline `<h3>` bilingual: "La ciencia del habito: 4 ensayos para iniciar, 21 para reconfigurar"
- 2x `div.case-highlight`:
  - **First** (lines 690-701): `big=4`, unit="ensayos para iniciar", detail paragraph
  - **Second** (lines 703-714): `big=21` (info-blue color override), unit="ensayos para reconfigurar", detail paragraph

#### 9.5 Habit Progression Table (lines 716-729) -- **NEW COMPONENT**
- `table.decision-table`
- Columns: Flujo | Ensayo 1-4 | Ensayo 5-12 | Ensayo 13-21
- 4 rows (one per workflow), fully bilingual
- Each cell describes behavior at that progression stage

#### 9.6 Callout: Reconfiguration Math (lines 731-748)
- `div.callout.callout-orange`
- `<ul>` with 4 items showing math per kata
- Summary paragraph

#### 9.7 Callout: Commit to 4 Trials (lines 750-755)
- `div.callout.callout-info`

---

## 10. Kata 1 -- Preparar

**Lines**: 760-801
**ID**: `#kata1`

### Structure

```
section#kata1
  div.section-header (h2 bilingual, p bilingual)
  div.jarvis-card[style=max-width:none]
    div.jarvis-card-header
      div.jarvis-icon.lareu    -- "LR"
      h3 (bilingual with <small>)
    div.jarvis-card-body
      div.jf (Por que importa)
      div.jf (Ejercicio 30 min)
        ol.es (4 steps with <strong> time marks and <a> gem links)
        ol.en (4 steps)
      div.jf (Criterio de exito)
      div.jf (Mejor practica)
  div.gate-box.tip-card[data-tip] -- CHECKPOINT
```

### Data Slots

| Field | Content Type |
|-------|-------------|
| Icon text | "LR" |
| Gem name | "LaForja + LaReu" |
| Subtitle | "Generador de prompts + Analista forense de reuniones" |
| Why it matters | Bilingual paragraph |
| Exercise steps | 4 timed steps with external gem links |
| Success criterion | Bilingual paragraph |
| Best practice | Bilingual paragraph |
| Checkpoint text | Bilingual requirement |
| data-tip | "No avances sin completar este checkpoint..." |

### External Links

- LaForja: `https://gemini.google.com/gem/1n0GlVXpCmItHWLBM2e17ChV7ceFW6Teq?usp=sharing`
- LaReu: `https://gemini.google.com/gem/1dxbSKPGyDZR1iPtjDReRThZS86gEPmqB?usp=sharing`

---

## 11. Kata 2 -- Capitalizar

**Lines**: 805-848
**ID**: `#kata2`

### Structure

Identical pattern to Kata 1:
```
section#kata2
  div.section-header
  div.jarvis-card[style=max-width:none]
    div.jarvis-card-header
      div.jarvis-icon.lavuelta    -- "LV"
      h3 (bilingual)
    div.jarvis-card-body
      div.jf (Por que importa)
      div.jf (Ejercicio 30 min)
        ol.es (5 steps)
        ol.en (5 steps)
      div.jf (Criterio de exito)
      div.jf (Mejor practica)
  div.gate-box.tip-card[data-tip] -- CHECKPOINT
```

### Data Slots

| Field | Content |
|-------|---------|
| Icon | "LV" |
| Gem | LaVuelta |
| Exercise steps | 5 timed steps (0-5, 5-10, 10-20, 20-25, 25-30) with `<code>` tags for Jira labels |
| Checkpoint | "al menos 2 Quad-Docs de reuniones reales" |

### External Links

- LaVuelta: `https://gemini.google.com/gem/1uXB-whRTHB1OcaLo7yLA0rVeKVyY3kbp?usp=sharing`

---

## 12. Kata 3 -- Reportar

**Lines**: 852-906
**ID**: `#kata3`

### Structure

Same kata pattern PLUS VR-AID box:
```
section#kata3
  div.section-header
  div.jarvis-card[style=max-width:none]
    ...jarvis-icon.elrepo "ER"
    ...5 exercise steps
  div.vraid-box                    -- VR-AID breakdown
    h3 "VR-AID"
    div.vraid-letters
      div.vraid-letter x5          -- V, R, A, I, D
  div.gate-box.tip-card[data-tip]  -- CHECKPOINT
```

### VR-AID Component (lines 894-903)

| Letter | Meaning (es) | Meaning (en) |
|--------|-------------|-------------|
| V | Valor entregado o habilitado | Value delivered or enabled |
| R | Riesgos al valor | Risks to value |
| A | Assumptions / Supuestos | Assumptions to validate |
| I | Issues / Incidentes activos | Issues / Active incidents |
| D | Dependencies fuera del equipo | Dependencies outside the team |

### External Links

- ElRepo: `https://gemini.google.com/gem/1ZK3CMeM7Yw-cNgzJeRsV2BRDyXNV_81S?usp=sharing`

---

## 13. Kata 4 -- Visibilizar

**Lines**: 910-949
**ID**: `#kata4`

### Structure

Same kata pattern:
```
section#kata4
  div.section-header
  div.jarvis-card[style=max-width:none]
    ...jarvis-icon.lainfo "LI"
    ...4 exercise steps
    ...(no "Por que importa" field -- starts with Ejercicio)
  div.gate-box.tip-card[data-tip]  -- FINAL CHECKPOINT
```

### Unique Features

- This is the only kata without a "Por que importa" field -- it goes directly to the exercise
- The gate-box is labeled "CHECKPOINT FINAL"
- data-tip text is the same as other checkpoints

### External Links

- LaInfo: `https://gemini.google.com/gem/1YwjJ7X72zAaVHfSrycpEbW2u3xr1z39a?usp=sharing`

---

## 14. 13 Flujos -- "La metodologia vivida"

**Lines**: 953-1303
**ID**: `#flujos`

This is the largest section. Contains multiple sub-sections.

### 14.1 Section Header (lines 955-959)

### 14.2 3-Layer Architecture Box (lines 962-985) -- **NEW COMPONENT**

```
div.vraid-box[style=border-color:var(--sofka-info)]
  h3[style=color:var(--sofka-info)] -- bilingual
  div.vraid-letters
    div.vraid-letter[style=info theme] x3
```

| Layer | Icon | Name | Description |
|-------|------|------|-------------|
| Data | folder emoji | Capa de Datos | Google Drive with governed units |
| Middleware | book emoji | NotebookLM = Middleware | Anti-hallucination, graphic content |
| Front | sparkles emoji | Gemini + Gems = Front | Exploration, command center |

**VARIANT**: Uses `vraid-box` and `vraid-letter` classes but with info-blue color overrides via inline styles. The `.letter` holds an emoji instead of a character. The `.meaning` has `font-weight:700`. The `.feeds` class holds the full description.

### 14.3 Full 13-Flow Map Table (lines 987-1010) -- **NEW COMPONENT**

- `table.map-table`
- 13 rows with background color coding:
  - Rows 1-4: No background (base flows)
  - Rows 5-8: `background:var(--sofka-orange-dim)` (research/NLM flows)
  - Rows 9-11: `background:var(--sofka-info-dim)` (architecture flows)
  - Rows 12-13: `background:var(--sofka-positive-dim)` (mastery flows)
- Flow number colors: info(1), orange(2), green(3), violet(4), critical(5-8), info(9-11), positive-text(12-13)

| # | Flow | Tools | When | Output |
|---|------|-------|------|--------|
| 1 | Preparar sesiones | LaForja + LaReu | Before key meetings | Agenda + guide |
| 2 | Capitalizar decisiones | LaVuelta | Post-meeting | Quad-Doc |
| 3 | Reportar avances | ElRepo | Friday | Report + VR-AID |
| 4 | Visibilizar impacto | LaInfo | Biweekly | HTML infographic |
| 5 | Deep Research | LaForja + Deep Research | Before strategic meetings | Market dossier |
| 6 | Vitaminize presentation | Deep Research + NLM | Before C-level | Brand-ready deck |
| 7 | Populate NotebookLM | NotebookLM + Drive | Project start | Operational notebook |
| 8 | Configure NLM system prompt | NotebookLM Notes | After populating | Custom-answering notebook |
| 9 | Govern Drive | Google Drive | Setup + ongoing | Structured units |
| 10 | NLM as middleware | NotebookLM | When mixing sources | Cited answers + graphics |
| 11 | Gemini as front | Gemini | Free exploration | Ideas, drafts |
| 12 | Gems as command center | Gemini Gems | After mastering 1-11 | Custom workflows |
| 13 | Create own agentic flow | LaForja + NLM + Gems | When repetitive process found | Interconnected system |

### 14.4 Flow 5: Deep Research (lines 1014-1050) -- **NEW COMPONENT**

```
h3[style] -- bilingual with red-colored span
div.jarvis-card[style=max-width:none]
  div.jarvis-card-header
    div.jarvis-icon.laforja    -- "DR"
    h3 (bilingual)
  div.jarvis-card-body
    div.jf (Por que importa)
    div.jf (Ejercicio 30 min) -- 5 steps es, 5 steps en
    div.jf (Criterio de exito)
```

### 14.5 Flow 6: Vitaminize Presentation (lines 1053-1085) -- **NEW COMPONENT**

```
h3[style] -- bilingual
div.jarvis-card[style=max-width:none]
  div.jarvis-card-header
    div.jarvis-icon.elrepo    -- "V+"
    h3 (bilingual)
  div.jarvis-card-body
    div.jf (Ejercicio 45 min) -- 5 steps (not timed, sequential)
    div.jf (Criterio de exito)
```

**Note**: This flow has a 45-min exercise (unique among all flows/katas).

### 14.6 Flows 7-8: NotebookLM Setup (lines 1089-1119) -- **NEW COMPONENT**

Uses the `antipatron` layout in a **VARIANT** form:
- Both columns are `.antipatron-col.good` (not bad/good pair)
- Left: info-blue border, Flow 7 steps (5 items with `<strong>`, `<code>`)
- Right: orange border, Flow 8 steps (3 items + `.jf-prompt` block with example system prompt)
- Arrow between columns

### 14.7 Flows 9-12: Layer Cards (lines 1123-1173) -- **NEW COMPONENT**

```
h3[style] -- bilingual
div.jarvis-cards[style=grid-template-columns:repeat(2,1fr)]
  div.jarvis-card.tip-card[data-tip] x4
```

Each card uses `.jarvis-card` pattern but with:
- **VARIANT**: `.jarvis-icon` with inline styles instead of named variant classes
- Icon text is the flow number (9, 10, 11, 12)
- data-tip tooltips on each card
- Only `<p>` body content (no `.jf` fields)

| Flow | Icon BG | Icon Color | data-tip topic |
|------|---------|------------|----------------|
| 9 | info-dim | info | Drive naming convention |
| 10 | info-dim | info | NLM anti-hallucination |
| 11 | orange-dim | orange | Gemini free exploration |
| 12 | positive-dim | positive-text | Command center with 5 Gems |

### 14.8 Flow 13: Create Own Flow (lines 1177-1212) -- **NEW COMPONENT**

```
h3[style] -- bilingual
p[style] -- description
div.jarvis-card[style=max-width:none]
  div.jarvis-card-header
    div.jarvis-icon[style=positive theme]    -- gear emoji
    h3 (bilingual with <small>)
  div.jarvis-card-body
    div.jf (Paso 1-5) x5 -- 5 sequential steps
    div.jf (Criterio de exito)
div.callout.callout-info  -- example about the 5 Jarvis
```

**VARIANT**: jarvis-icon uses emoji (gear) instead of text initials.

### 14.9 Learning Katas Table (lines 1216-1270) -- **NEW COMPONENT**

- Inline `<h3>` bilingual
- `<p>` bilingual description
- `table.map-table` with 5 rows (KA-1 through KA-5)
- Columns: Kata | Nombre | Que haces | Duracion | Criterio de exito

| Kata | Name | Duration | Shu-Ha-Ri Level |
|------|------|----------|-----------------|
| KA-1 | Observar | 15 min | Shu |
| KA-2 | Imitar | 30 min | Shu |
| KA-3 | Adaptar | 30 min | Ha |
| KA-4 | Ensenar | 30 min | Ri |
| KA-5 | Crear | 60 min | Ri |

### 14.10 Shu-Ha-Ri Case Highlight (lines 1272-1283) -- **VARIANT**

- `div.case-highlight`
- **VARIANT**: `.big` value is "KA" (text, not a number), with `font-size:1.5rem` override
- `.unit` contains the full progression arrow chain

### 14.11 Callout: How to Apply KA (lines 1285-1300)
- `div.callout.callout-orange`
- `<ul>` with 4 items mapping flows to KA levels

### 14.12 Gate Note (line 1302)
- `div.gate-box.tip-card[data-tip]`
- Note (not checkpoint): "Los flujos 1-4 son las katas basicas..."

---

## 15. Anti-patrones

**Lines**: 1307-1338
**ID**: `#antipatrones`

### Structure

```
section#antipatrones
  div.section-header
  table.decision-table
    thead: Anti-patron | Sintoma | Causa raiz | Correccion
    tbody: 5 rows
  div.callout.callout-orange
```

### Anti-pattern Table Data

| Anti-pattern | Symptom | Root Cause | Fix |
|-------------|---------|------------|-----|
| Kata sin evidencia real | Datos inventados | No material ready | Open real doc first |
| Kata postergada | "Lo hago manana" | No slot blocked | Schedule now |
| Output sin destino | Quad-Doc not published | Dies in clipboard | Kata ends at publish |
| Perfeccionismo paralizante | 45 min reviewing | Draft vs final confusion | 80% published > 100% never |
| Kata 3 sin Kata 2 | Report without capitalizing | No inputs for ElRepo | Go back to Kata 2 |

---

## 16. Tu Ritmo

**Lines**: 1342-1417
**ID**: `#ritmo`

### Sub-components

#### 16.1 Section Header (lines 1344-1349)

#### 16.2 Metrics Row (lines 1351-1356)
- `div.metrics-row` with 4x `div.metric-card`

| Value | Label |
|-------|-------|
| -50% | Tiempo en OKRs (benchmark) |
| 100% | Semanas con semaforo (meta) |
| 6 x 30 | Sesiones / semana (min) |
| <48h | Regla escalamiento VR-AID |

#### 16.3 Callout: Weekly Progression (lines 1358-1373)
- `div.callout.callout-orange`
- 4 weeks of suggested progression

#### 16.4 Callout: "Si no tienes 3 horas" (lines 1375-1380)
- `div.callout.callout-info`
- Advice to start with Kata 2 only

#### 16.5 Maturity Levels (lines 1382-1397) -- **VARIANT**
- `div.semaforo-grid[style=grid-template-columns:repeat(3,1fr)]`
- 3x `div.semaforo-card` (3-column override vs default 4-column)
- **VARIANT**: Third card uses inline style `border-left-color:var(--sofka-orange)` instead of a named class

| Level | Border Color | Class |
|-------|-------------|-------|
| Novato | verde (green) | `.semaforo-card.verde` |
| Practicante | blanco (gray) | `.semaforo-card.blanco` |
| Autonomo | orange | `.semaforo-card` + inline style |

#### 16.6 Weekly Scorecard Table (lines 1399-1416)
- `table.decision-table`
- Columns: Metrica | Semana 1 | Semana 2 | Semana 3 | Semana 4+
- 6 metric rows

---

## 17. Gemas

**Lines**: 1421-1549
**ID**: `#gemas`

### Sub-components

#### 17.1 Section Header (lines 1423-1428)

#### 17.2 Gem Bar (lines 1430-1437)
- `div.gem-bar` with 5x `a.gem-link`
- Links: LaForja, LaReu, LaVuelta, ElRepo, LaInfo

#### 17.3 Auto-Deploy Calendar Box (lines 1439-1523) -- **NEW COMPONENT**

```
div[style=black bg, orange border, border-radius]
  h3[style=orange] -- bilingual with lightning emoji
  p[style] -- bilingual description
  div[style=flex]
    a.pulse.gem-link[href=long Gemini URL] -- CTA button
  details
    summary[style] -- bilingual
    pre[style] -- Full prompt text (monospace)
  div[style=info box] -- Requirement note
  h4[style] -- "Event names in your calendar"
  table.decision-table -- 6 event rows
```

**Key features:**
- **NEW**: `.pulse` class on the CTA button (keyframe animation)
- **NEW**: `<details>/<summary>` for expandable prompt (native HTML, no JS)
- **NEW**: Long encoded URL with `prompt_text=...&prompt_action=prefill` for Gemini pre-fill
- Table with 6 calendar events mapped to katas

| Day | Event Name | Kata | Practice |
|-----|-----------|------|----------|
| Lunes | Jarvis Kata: Forja tu Sesion | 1 | Prepare meeting |
| Post-reu x3 | Capitaliza la Jugada #1-3 | 2 | Quad-Doc |
| Viernes AM | Reporta con Evidencia | 3 | Report + VR-AID |
| Viernes PM | Visibiliza el Valor | 4 | HTML infographic |

#### 17.4 Acknowledgments Callout (lines 1526-1531)
- `div.callout.callout-warning`
- Credits: Andres Felipe Sanchez Garcia, Ivan Dario Rojas Gallego, DeUna team

#### 17.5 Author/Context Table (lines 1533-1548)
- Wrapper: `div[style=gray bg, orange border]`
- `table.decision-table` with 7 metadata rows

| Field | Value |
|-------|-------|
| Autor | Javier Montano |
| Equipo | Presales Transversal Sofka |
| Iniciativa | Big Rocks Scale Up 2026 |
| Version | Cartilla Jarvis v3.0 GOLD -- Bilingual |
| Piloto | DeUna (Q1 2026) |
| Plataforma | Gemas de Gemini -- 5 asistentes |
| Licencia | (c) 2026 Sofka Technologies |

---

## 18. Footer

**Lines**: 1553-1566

### Structure

```
footer.site-footer
  div.footer-inner
    div.footer-row
      div.footer-logo          -- "Sofka Technologies"
      div.footer-badges
        span.footer-badge x3   -- "Cartilla Jarvis v3.0 GOLD", "Big Rocks Scale Up 2026", "Presales Transversal"
    div.footer-bottom          -- copyright + author credit (bilingual)
```

Same pattern as base playbook.

---

## 19. Script

**Lines**: 1568-1581

```javascript
function toggleLang() {
  var b = document.body;
  if (b.classList.contains('lang-es')) {
    b.classList.remove('lang-es');
    b.classList.add('lang-en');
    document.documentElement.lang = 'en';
  } else {
    b.classList.remove('lang-en');
    b.classList.add('lang-es');
    document.documentElement.lang = 'es';
  }
}
```

**NEW**: Entire script block is new. Base playbook has no JS.

---

## 20. NEW Components vs Base Playbook

### Entirely NEW Components

| Component | Lines | Description |
|-----------|-------|-------------|
| **Bilingual system** | CSS 352-358, JS 1568-1581 | `body.lang-es/lang-en` + `span.es/en` + `toggleLang()` |
| **Language toggle button** | CSS 355-358, HTML 378 | `button.lang-btn` in nav |
| **Tip card / Tooltip system** | CSS 335-338 | `data-tip` attribute + CSS `::after` pseudo-element |
| **Reveal/Expand system** | CSS 339-343 | `input.reveal-trigger` + `label.reveal-label` + `div.reveal-box` (pure CSS, no JS) |
| **Pulse animation** | CSS 344-345 | `@keyframes pulse-glow` on `.pulse` class |
| **Platform badge** | CSS 346-350 | `.platform-badge`, `.pb-icon`, `.pb-name`, `.pb-desc` |
| **3-layer architecture box** | HTML 962-985 | Reuses `.vraid-box` + `.vraid-letter` with style overrides |
| **13-flow map table** | HTML 987-1010 | `table.map-table` with background-colored row groups |
| **Flow cards (5-13)** | HTML 1014-1212 | 9 new flow detail sections using jarvis-card pattern |
| **Learning katas table (KA-1 to KA-5)** | HTML 1216-1270 | Transversal learning methodology |
| **Shu-Ha-Ri case highlight** | HTML 1272-1283 | Case-highlight with text value instead of number |
| **Habit progression table** | HTML 716-729 | 4-row x 3-phase progression matrix |
| **Habit science (4 + 21 trials)** | HTML 690-714 | Twin case-highlight boxes |
| **Reconfiguration math callout** | HTML 731-748 | Math breakdown per kata |
| **Auto-deploy calendar box** | HTML 1439-1523 | Black box with pulse CTA, details/summary, Gemini URL |
| **Anti-pattern table** | HTML 1316-1330 | 5-row troubleshooting table |
| **Maturity levels (3-col semaforo)** | HTML 1384-1397 | 3-column variant of semaforo-grid |
| **Weekly scorecard table** | HTML 1401-1416 | 6-metric progression table |
| **`<details>/<summary>` prompt viewer** | HTML 1457-1493 | Native HTML collapsible with `<pre>` prompt |

### Positive-Tier Design Tokens (NEW)

| Token | Used By |
|-------|---------|
| `--sofka-positive` (#FFD700) | Flow 12-13 badges, KA-5 row |
| `--sofka-positive-dim` | Background for mastery-tier rows and cards |
| `--sofka-positive-text` (#B8860B) | Text color for mastery-tier headings |

### Reused Components with VARIANTS

| Component | Variant Description |
|-----------|-------------------|
| `.problem-card` | Used as step cards with per-card border-color overrides (orange/info/green/violet) instead of all-critical |
| `.antipatron` | Both columns `.good` (flows 7-8) instead of bad/good pair |
| `.vraid-box` | Blue-themed for 3-layer architecture (originally orange for VR-AID) |
| `.vraid-letter` | Emoji icons instead of single characters; bold `.meaning`; long `.feeds` text |
| `.case-highlight` | Text value ("KA") instead of numeric; info-blue color variant |
| `.jarvis-icon` | Inline-styled variants for flows 9-12 (numbered) and flow 13 (emoji gear) |
| `.semaforo-grid` | 3-column override (default is 4) |
| `.semaforo-card` | Inline orange variant (no `.naranja` class) |
| `.guardrail-col.si` | Used with info-blue border override (originally green) |
| `.jarvis-card` | Combined with `.tip-card` for flows 9-12 |
| `.gem-bar` | Used for NotebookLM link (not just gem links) |

### Gate/Checkpoint System -- **NEW PATTERN**

| Location | Line | Content |
|----------|------|---------|
| After Kata 1 | 800 | "Antes de pasar a Kata 2, verifica que preparaste al menos 1 reunion..." |
| After Kata 2 | 847 | "Antes de pasar a Kata 3, verifica que produjiste al menos 2 Quad-Docs..." |
| After Kata 3 | 905 | "Antes de pasar a Kata 4, verifica que produjiste al menos 1 Reporte..." |
| After Kata 4 | 948 | "CHECKPOINT FINAL: Has producido al menos 1 infografia ejecutiva..." |
| After 13 flows | 1302 | "NOTA: Los flujos 1-4 son las katas basicas..." (note, not gate) |

All use `div.gate-box.tip-card[data-tip]` with bilingual content.

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total HTML lines | 1583 |
| CSS classes (unique) | ~85 |
| NEW CSS classes | 14 |
| Sections (nav anchors) | 10 |
| Kata sections | 4 (kata1-kata4) |
| Flow detail sections | 9 (flow 5-13) |
| Tables | 9 |
| Callouts | 11 |
| Gate/checkpoint boxes | 5 |
| Gem links (external) | 14 occurrences across 5 unique gems |
| Bilingual span pairs | ~250+ (every text element) |
| data-tip tooltips | 12 |
| Reveal/expand toggles | 2 (Gemini, NotebookLM) |
| case-highlight boxes | 4 |
| jarvis-card instances | 10 |
| `<details>` elements | 1 (auto-deploy prompt) |
