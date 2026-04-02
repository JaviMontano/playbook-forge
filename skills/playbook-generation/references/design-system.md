# Sofka DS v5.1 -- Design System Reference

> Knowledge base for playbook-forge agents.
> Source: `brand-tokens-sofka.json` + `component-inventory.md`

---

## 1. CSS Custom Properties (42 Tokens)

### 1.1 Brand Primary (4 tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `--sofka-orange` | `#FF7E08` | Primary brand color, CTAs, highlights, borders |
| `--sofka-orange-light` | `#FF9E42` | Hover states, lighter accents |
| `--sofka-orange-dark` | `#CC6506` | Link default color, text on light backgrounds |
| `--sofka-orange-dim` | `rgba(255,126,8,.10)` | Background tint for orange-themed cards/callouts |

### 1.2 Neutrals (3 tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `--sofka-black` | `#000000` | Hero background, strong text, footer background |
| `--sofka-white` | `#FFFFFF` | Body background, text on dark backgrounds |
| `--sofka-light` | `#EFEAE4` | Warm neutral background (unused in current components) |

### 1.3 Semantic Colors (12 tokens)

| Token | Value | Category |
|-------|-------|----------|
| `--sofka-positive` | `#FFD700` | Gold/mastery tier, gate-box text |
| `--sofka-positive-dim` | `rgba(255,215,0,.12)` | Background for mastery-tier rows |
| `--sofka-positive-text` | `#B8860B` | Text color for mastery headings |
| `--sofka-warning` | `#D97706` | Warning callout border |
| `--sofka-warning-dim` | `rgba(217,119,6,.08)` | Warning callout background |
| `--sofka-warning-border` | `rgba(217,119,6,.3)` | Warning border transparency |
| `--sofka-critical` | `#DC2626` | Red/error, problem-card border default |
| `--sofka-critical-dim` | `rgba(220,38,38,.07)` | Critical background |
| `--sofka-critical-border` | `rgba(220,38,38,.25)` | Critical border transparency |
| `--sofka-info` | `#2563EB` | Blue/informational |
| `--sofka-info-dim` | `rgba(37,99,235,.07)` | Info background |
| `--sofka-info-border` | `rgba(37,99,235,.25)` | Info border transparency |

### 1.4 Accent Colors (3 tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `--sofka-green` | `#42D36F` | Positive/good column borders, semaforo verde |
| `--sofka-teal` | `#06C8C8` | Available for charts/diagrams |
| `--sofka-violet` | `#9747FF` | Fourth tier, timeline dot 4, LaInfo icon |

### 1.5 Gray Scale (7 tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `--sofka-gray-50` | `#FAF8F6` | Card backgrounds, nav background |
| `--sofka-gray-100` | `#F4F0EC` | Table hover, prompt blocks |
| `--sofka-gray-200` | `#E4DED7` | Card borders, table cell borders, cycle-step borders |
| `--sofka-gray-300` | `#D1C9BE` | Nav border, section divider, table outer border |
| `--sofka-gray-500` | `#6B6560` | Secondary text, descriptions, labels |
| `--sofka-gray-700` | `#333130` | Body text alternate, prompt text |
| `--sofka-gray-900` | `#111110` | Primary text, table header background |

### 1.6 Typography (2 tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `--font-display` | `'Clash Grotesk', 'Inter', sans-serif` | Headings, KPI values, logos, display text |
| `--font-body` | `'Inter', system-ui, sans-serif` | Body text, paragraphs, table cells |

### 1.7 Radius (4 tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Badges, hero-badge, callout code blocks, gem-link, acceptance items |
| `--radius-md` | `12px` | Cards, callouts, tables, most components |
| `--radius-lg` | `16px` | Jarvis cards, testimonials, VR-AID box, gem-bar |
| `--radius-xl` | `24px` | Reserved for large containers (not used in current playbook) |

### 1.8 Shadows (4 tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,.05)` | Nav, guardrail columns, semaforo cards, timeline content |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,.08)` | Tables, VR-AID box, card hover state |
| `--shadow-lg` | `0 12px 40px rgba(0,0,0,0.12)` | Reserved for modals/overlays |
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.06)` | Problem cards, jarvis cards, testimonials |

### 1.9 Layout (1 token)

| Token | Value | Usage |
|-------|-------|-------|
| `--max-w` | `1100px` | Main container max-width, nav inner, hero inner, footer inner |

---

## 2. Typography Rules

### 2.1 Font Loading

```html
<!-- Google Fonts: Inter (300-900) -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

<!-- Fontshare: Clash Grotesk (400-700) -->
<link href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&display=swap" rel="stylesheet">
```

### 2.2 Font Usage Map

| Context | Font Family | Weight | Size | Line Height |
|---------|------------|--------|------|-------------|
| Body default | `--font-body` (Inter) | 400 | 16px | 1.65 |
| Headings (h1-h5) | `--font-display` (Clash Grotesk) | 700 | varies | 1.2 |
| Hero h1 | `--font-display` | 700 | `clamp(2rem, 5vw, 3.2rem)` | 1.2 |
| Section h2 | `--font-display` | 700 | 2rem | 1.2 |
| Hero logo | `--font-display` | 700 | 1.6rem | -- |
| Nav logo | `--font-display` | 700 | 1.1rem | -- |
| KPI values | `--font-display` | 700 | 2rem | 1 |
| Links (a) | `--font-body` | 600 | inherit | inherit |
| Strong | `--font-body` | 700 | inherit | inherit |
| Table headers | `--font-body` | 600 | .72-.78rem | -- |
| Labels (.jf-label) | `--font-body` | 700 | .68rem | -- |
| Badges | `--font-body` | 600 | .72-.75rem | -- |
| Nav links | `--font-body` | 600 | .72rem | -- |

### 2.3 Text Transform Rules

- **Nav links**: `text-transform: uppercase; letter-spacing: 1.5px`
- **Table headers (th)**: `text-transform: uppercase; letter-spacing: .5px`
- **JF labels**: `text-transform: uppercase; letter-spacing: .8px`
- **Hero badges**: `text-transform: uppercase; letter-spacing: 1px`
- **Gem-bar title**: `text-transform: uppercase; letter-spacing: 1.5px`
- **Footer badges**: no text-transform

---

## 3. Color System

### 3.1 Primary Palette

```
Primary:       #FF7E08 (orange)
Primary Light:  #FF9E42
Primary Dark:   #CC6506
Primary Dim:    rgba(255,126,8,.10)
```

### 3.2 Semantic Palette

```
Positive:  #FFD700 (gold)     -- mastery, gates, checkpoints
Warning:   #D97706 (amber)    -- callout-warning, supuestos
Critical:  #DC2626 (red)      -- errors, problems, anti-patterns
Info:      #2563EB (blue)     -- informational, LaReu agent
```

### 3.3 Accent Palette

```
Green:   #42D36F  -- good/positive columns, semaforo verde
Teal:    #06C8C8  -- charts, secondary accent
Violet:  #9747FF  -- 4th tier, LaInfo agent
```

### 3.4 Gray Scale Progression

```
50:  #FAF8F6  (warmest, card bg)
100: #F4F0EC  (hover bg)
200: #E4DED7  (borders)
300: #D1C9BE  (heavy borders)
500: #6B6560  (secondary text)
700: #333130  (body text alt)
900: #111110  (primary text, table headers)
```

### 3.5 Hard-coded Colors (not tokenized)

| Value | Where Used |
|-------|-----------|
| `#16A34A` | Green text for .good columns, .after columns, semaforo verde headings |
| `rgba(66,211,111,.1)` | .elrepo icon background |
| `rgba(66,211,111,.25)` | .elrepo icon border |
| `rgba(66,211,111,.06)` | .after column background |
| `rgba(66,211,111,.2)` | .after column border, .t-elrepo tag border |
| `rgba(151,71,255,.08)` | .lainfo icon background |
| `rgba(151,71,255,.2)` | .lainfo icon border |
| `rgba(151,71,255,.06)` | .t-lainfo tag background |
| `rgba(151,71,255,.18)` | .t-lainfo tag border |

---

## 4. Component Styling Rules

### 4.1 Global Reset

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0 }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased }
body { font-family: var(--font-body); background: var(--sofka-white); color: var(--sofka-gray-900); line-height: 1.65; font-size: 16px }
```

### 4.2 Card Pattern (shared by most components)

All cards follow this pattern:
- `background: var(--sofka-gray-50)`
- `border: 1px solid var(--sofka-gray-200)` or `box-shadow: var(--shadow-card)`
- `border-radius: var(--radius-md)` or `var(--radius-lg)` for larger cards
- `padding: 1.25rem-1.75rem`
- Hover: `transform: translateY(-2px); box-shadow: var(--shadow-md)`

### 4.3 Table Pattern

Two table types share the same structure:

**map-table**: Data mapping tables (roles, entregables)
**decision-table**: Decision/reference tables (capacity, actions)

Both use:
- `width: 100%; border-collapse: collapse`
- `border-radius: var(--radius-md); overflow: hidden`
- `box-shadow: var(--shadow-md); border: 1px solid var(--sofka-gray-300)`
- `th`: dark header (`--sofka-gray-900` bg, white text, uppercase)
- `td`: light rows (`--sofka-gray-50` bg, `--sofka-gray-200` border-bottom)
- `tr:hover td`: `background: var(--sofka-gray-100)`

### 4.4 Callout Pattern

Three semantic variants:

| Class | Background | Border-left Color |
|-------|-----------|------------------|
| `.callout-warning` | `--sofka-warning-dim` | `--sofka-warning` |
| `.callout-info` | `--sofka-info-dim` | `--sofka-info` |
| `.callout-orange` | `--sofka-orange-dim` | `--sofka-orange` |

All callouts: `padding: 1.25rem 1.5rem; border-radius: var(--radius-md); border-left: 4px solid`

### 4.5 Grid Patterns

| Component | Grid Template | Gap |
|-----------|--------------|-----|
| `.problem-grid` | `repeat(auto-fit, minmax(230px, 1fr))` | 1.25rem |
| `.jarvis-cards` | `repeat(auto-fit, minmax(320px, 1fr))` | 1.5rem |
| `.hero-kpis` | `repeat(5, 1fr)` | 1.5rem |
| `.guardrail-grid` | `1fr 1fr` | 1.5rem |
| `.compare-grid` | `1fr 1fr` | 1.5rem |
| `.antipatron` | `1fr auto 1fr` | 1.5rem |
| `.metrics-row` | `repeat(4, 1fr)` | 1.25rem |
| `.semaforo-grid` | `repeat(4, 1fr)` | 1.25rem |
| `.testimonial-grid` | `repeat(auto-fit, minmax(300px, 1fr))` | 1.5rem |

### 4.6 Colored Border Variants

**Border-left** (4px solid):
- `.problem-card`: `--sofka-critical` (default, can override inline)
- `.callout`: semantic color
- `.rec-card`: `--sofka-info`
- `.semaforo-card`: varies (verde, blanco, amarillo, rojo)

**Border-top** (4px solid):
- `.antipatron-col.bad`: `--sofka-critical`
- `.antipatron-col.good`: `--sofka-green`
- `.guardrail-col.si`: `--sofka-green`
- `.guardrail-col.no`: `--sofka-critical`
- `.testimonial`: `--sofka-orange`

**Border-bottom** (thick):
- `.hero`: `8px solid var(--sofka-orange)`
- `nav.toc`: `2px solid var(--sofka-gray-300)`

**Border-top** (thick):
- `footer.site-footer`: `8px solid var(--sofka-orange)`

### 4.7 Icon/Badge Agent Color Map

| Agent | Icon Class | BG | Text | Border |
|-------|-----------|-----|------|--------|
| LaReu | `.lareu` | `--sofka-info-dim` | `--sofka-info` | `--sofka-info-border` |
| LaVuelta | `.lavuelta` | `--sofka-orange-dim` | `--sofka-orange` | `rgba(255,126,8,.25)` |
| ElRepo | `.elrepo` | `rgba(66,211,111,.1)` | `#16A34A` | `rgba(66,211,111,.25)` |
| LaInfo | `.lainfo` | `rgba(151,71,255,.08)` | `--sofka-violet` | `rgba(151,71,255,.2)` |
| LaForja | `.laforja` | `--sofka-critical-dim` | `--sofka-critical` | `--sofka-critical-border` |

Tag equivalents use matching colors: `.t-lareu`, `.t-lavuelta`, `.t-elrepo`, `.t-lainfo`, `.t-laforja`

---

## 5. Responsive Breakpoints

### 5.1 Tablet (max-width: 768px)

| Component | Change |
|-----------|--------|
| `.hero` | padding: 3rem 1rem |
| `.hero-kpis` | 2-column grid (overrides 5-col and 3-col) |
| `.hero-kpi-value` | font-size: 1.6rem (from 2rem) |
| `main.container` | padding: 2rem 1rem |
| `.antipatron` | single column, arrow rotated 90deg |
| `.compare-grid` | single column |
| `.jarvis-cards` | single column |
| `.cycle-arrow` | hidden |
| `.cycle-step` | max-width: none (full width) |
| `.semaforo-grid` | 2-column grid |
| `.metrics-row` | 2-column grid |
| `nav.toc .toc-inner` | padding: 0 1rem |

### 5.2 Small Mobile (max-width: 480px)

| Component | Change |
|-----------|--------|
| `.hero-kpis` | 2-column grid |
| `.semaforo-grid` | single column |
| `.metrics-row` | 2-column grid |

---

## 6. Print Rules (@media print)

```css
* { background: transparent !important; color: #000 !important; box-shadow: none !important }
html { font-size: 11pt }
body { margin: 0; padding: 1cm }
.hero { border-bottom: 2px solid #000; page-break-after: always; padding: 2rem 0 }
.hero::before { display: none }
nav.toc, .skip-link { display: none }
main.container { padding: 0; max-width: none }
/* Cards get: page-break-inside: avoid; border: 1px solid #000; padding: .75rem; margin: .5cm 0 */
footer.site-footer { border-top: 2px solid #000; page-break-before: always }
```

---

## 7. Accessibility

### 7.1 Skip Link

```css
.skip-link { position: absolute; top: -100px; left: 0; background: var(--sofka-orange); color: #fff; padding: .5rem 1rem; z-index: 999 }
.skip-link:focus { top: 0 }
```

HTML: `<a href="#main" class="skip-link">Ir al contenido</a>`

### 7.2 Focus Visible

```css
:focus-visible { outline: 2px solid var(--sofka-orange); outline-offset: 2px }
```

Applies globally to all focusable elements. Uses `var(--sofka-orange)` for brand-consistent focus rings.

### 7.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important }
}
```

Disables all animations and transitions for users who prefer reduced motion.

### 7.4 Semantic Considerations

- `<html lang="es">` sets document language
- Bilingual system uses `body.lang-es .en { display: none }` / `body.lang-en .es { display: none }` toggle
- All tables use `<thead>` / `<tbody>` for screen reader parsing
- Heading hierarchy: h1 (hero) > h2 (sections) > h3 (subsections) > h4 (card titles)
- `aria` attributes are not used in the current reference -- agents should add them where appropriate

---

## 8. Extended Components (Katas Document Additions)

The katas document introduces these additional components using the same design tokens:

| Component | CSS Class | Key Feature |
|-----------|----------|-------------|
| Tip card / Tooltip | `.tip-card` + `data-tip` | CSS-only tooltip via `::after { content: attr(data-tip) }` |
| Reveal/Expand | `.reveal-trigger` + `.reveal-box` | Pure CSS collapsible (checkbox hack) |
| Pulse animation | `.pulse` | `@keyframes pulse-glow` with orange box-shadow |
| Platform badge | `.platform-badge`, `.pb-icon`, `.pb-name`, `.pb-desc` | Tool presentation cards |
| Language toggle | `.lang-btn` | Button in nav for ES/EN switching |
| Bilingual spans | `.es` / `.en` | Paired spans for bilingual content |

---

## 9. Complete CSS Class Registry (117+ classes)

### By Category

**Layout**: `container`, `section-header`, `section-divider`, `skip-link`
**Nav**: `toc`, `toc-inner`, `toc-logo`
**Hero**: `hero`, `hero-inner`, `hero-logo`, `hero-badges`, `hero-badge`, `hero-sub`, `hero-kpis`, `hero-kpi`, `hero-kpi-icon`, `hero-kpi-value`, `hero-kpi-label`
**Problem**: `problem-grid`, `problem-card`
**Antipatron**: `antipatron`, `antipatron-col`, `antipatron-arrow`, `bad`, `good`
**Cycle**: `cycle-visual`, `cycle-step`, `cycle-arrow`, `step-num`, `step-label`, `step-jarvis`, `step-artifact`
**Map Table**: `map-table`, `jarvis-name`
**Jarvis Cards**: `jarvis-cards`, `jarvis-card`, `jarvis-card-header`, `jarvis-card-body`, `jarvis-icon`, `lareu`, `lavuelta`, `elrepo`, `lainfo`, `laforja`
**Jarvis Fields**: `jf`, `jf-label`, `jf-value`, `jf-prompt`, `jf-antiuse`
**Timeline**: `timeline`, `timeline-item`, `timeline-dot`, `timeline-content`, `wk`, `week-obj`
**Tags**: `jtags`, `jtag`, `t-lareu`, `t-lavuelta`, `t-elrepo`, `t-lainfo`, `t-laforja`
**Timeline Extras**: `tl-deliverable`, `gate-box`
**Compare**: `compare-grid`, `compare-col`, `before`, `after`
**Metrics**: `metrics-row`, `metric-card`, `mv`, `ml`
**Semaforo**: `semaforo-grid`, `semaforo-card`, `verde`, `blanco`, `amarillo`, `rojo`
**VR-AID**: `vraid-box`, `vraid-letters`, `vraid-letter`, `letter`, `meaning`, `feeds`, `vraid-note`
**Gem**: `gem-link`, `gem-bar`, `gem-bar-title`
**Callouts**: `callout`, `callout-warning`, `callout-info`, `callout-orange`
**Decision Table**: `decision-table`
**Guardrail**: `guardrail-grid`, `guardrail-col`, `si`, `no`
**Acceptance**: `acceptance-list`
**Testimonials**: `testimonial-grid`, `testimonial`, `testimonial-quote`, `testimonial-author`, `testimonial-role`
**Case**: `case-highlight`, `case-metric`, `big`, `unit`, `case-detail`
**Recommendations**: `recommendations`, `rec-card`
**Footer**: `site-footer`, `footer-inner`, `footer-row`, `footer-logo`, `footer-badges`, `footer-badge`, `footer-bottom`
**Katas-only**: `tip-card`, `reveal-box`, `reveal-trigger`, `reveal-label`, `pulse`, `platform-badge`, `pb-icon`, `pb-name`, `pb-desc`, `lang-btn`
