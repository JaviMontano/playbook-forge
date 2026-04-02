# Placeholder Dictionary

> Complete dictionary of ALL placeholders used across the 22 snippet templates
> in the playbook-forge HTML generation pipeline.
>
> Source of truth: component-inventory.md + katas-inventory.md + reference HTML
> Generated: 2026-04-02

---

## Notation

- `{{PLACEHOLDER}}` -- Mustache-style double-brace placeholder
- **Type** -- Expected data type
- **Required** -- Whether the placeholder MUST be provided (yes) or has a default/is optional (no)
- **Source** -- JSONPath-like reference into the content manifest
- **Renders to** -- What HTML element or attribute receives the value

---

## 1. Document-Level Placeholders

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{META_LANG}}` | string (`es`\|`en`) | yes | `manifest.meta.language` | `<html lang="...">` attribute |
| `{{META_TITLE}}` | string | yes | `manifest.meta.title` | `<title>` tag content |
| `{{META_COMPANY}}` | string | yes | `manifest.meta.company` | Hero logo, footer logo, copyright references |
| `{{META_VERSION}}` | string | no | `manifest.meta.version` | Footer badge text |
| `{{META_DESIGN_SYSTEM}}` | string | no | `manifest.meta.designSystem` | CSS comment header |
| `{{GOOGLE_FONTS_URL}}` | string (URL) | yes | `brand-tokens.typography.googleFontsUrl` | `<link href="...">` for Inter font |
| `{{FONTSHARE_URL}}` | string (URL) | yes | `brand-tokens.typography.fontshareUrl` | `<link href="...">` for Clash Grotesk font |

---

## 2. CSS Token Placeholders

Used in the `:root` block of the `<style>` tag. One placeholder per CSS custom property.

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{TOKEN_PRIMARY}}` | CSS color | yes | `brand-tokens.colors.primary` | `--sofka-orange` |
| `{{TOKEN_PRIMARY_LIGHT}}` | CSS color | yes | `brand-tokens.colors.primaryLight` | `--sofka-orange-light` |
| `{{TOKEN_PRIMARY_DARK}}` | CSS color | yes | `brand-tokens.colors.primaryDark` | `--sofka-orange-dark` |
| `{{TOKEN_PRIMARY_DIM}}` | CSS color | yes | `brand-tokens.colors.primaryDim` | `--sofka-orange-dim` |
| `{{TOKEN_BLACK}}` | CSS color | yes | `brand-tokens.colors.black` | `--sofka-black` |
| `{{TOKEN_WHITE}}` | CSS color | yes | `brand-tokens.colors.white` | `--sofka-white` |
| `{{TOKEN_LIGHT}}` | CSS color | yes | `brand-tokens.colors.light` | `--sofka-light` |
| `{{TOKEN_POSITIVE}}` | CSS color | yes | `brand-tokens.colors.positive` | `--sofka-positive` |
| `{{TOKEN_POSITIVE_DIM}}` | CSS color | yes | `brand-tokens.colors.positiveDim` | `--sofka-positive-dim` |
| `{{TOKEN_POSITIVE_TEXT}}` | CSS color | yes | `brand-tokens.colors.positiveText` | `--sofka-positive-text` |
| `{{TOKEN_WARNING}}` | CSS color | yes | `brand-tokens.colors.warning` | `--sofka-warning` |
| `{{TOKEN_WARNING_DIM}}` | CSS color | yes | `brand-tokens.colors.warningDim` | `--sofka-warning-dim` |
| `{{TOKEN_WARNING_BORDER}}` | CSS color | yes | `brand-tokens.colors.warningBorder` | `--sofka-warning-border` |
| `{{TOKEN_CRITICAL}}` | CSS color | yes | `brand-tokens.colors.critical` | `--sofka-critical` |
| `{{TOKEN_CRITICAL_DIM}}` | CSS color | yes | `brand-tokens.colors.criticalDim` | `--sofka-critical-dim` |
| `{{TOKEN_CRITICAL_BORDER}}` | CSS color | yes | `brand-tokens.colors.criticalBorder` | `--sofka-critical-border` |
| `{{TOKEN_INFO}}` | CSS color | yes | `brand-tokens.colors.info` | `--sofka-info` |
| `{{TOKEN_INFO_DIM}}` | CSS color | yes | `brand-tokens.colors.infoDim` | `--sofka-info-dim` |
| `{{TOKEN_INFO_BORDER}}` | CSS color | yes | `brand-tokens.colors.infoBorder` | `--sofka-info-border` |
| `{{TOKEN_GREEN}}` | CSS color | yes | `brand-tokens.colors.green` | `--sofka-green` |
| `{{TOKEN_TEAL}}` | CSS color | yes | `brand-tokens.colors.teal` | `--sofka-teal` |
| `{{TOKEN_VIOLET}}` | CSS color | yes | `brand-tokens.colors.violet` | `--sofka-violet` |
| `{{TOKEN_GRAY_50}}` | CSS color | yes | `brand-tokens.colors.gray50` | `--sofka-gray-50` |
| `{{TOKEN_GRAY_100}}` | CSS color | yes | `brand-tokens.colors.gray100` | `--sofka-gray-100` |
| `{{TOKEN_GRAY_200}}` | CSS color | yes | `brand-tokens.colors.gray200` | `--sofka-gray-200` |
| `{{TOKEN_GRAY_300}}` | CSS color | yes | `brand-tokens.colors.gray300` | `--sofka-gray-300` |
| `{{TOKEN_GRAY_500}}` | CSS color | yes | `brand-tokens.colors.gray500` | `--sofka-gray-500` |
| `{{TOKEN_GRAY_700}}` | CSS color | yes | `brand-tokens.colors.gray700` | `--sofka-gray-700` |
| `{{TOKEN_GRAY_900}}` | CSS color | yes | `brand-tokens.colors.gray900` | `--sofka-gray-900` |
| `{{TOKEN_FONT_DISPLAY}}` | CSS font-family | yes | `brand-tokens.typography.fontDisplay` | `--font-display` |
| `{{TOKEN_FONT_BODY}}` | CSS font-family | yes | `brand-tokens.typography.fontBody` | `--font-body` |
| `{{TOKEN_RADIUS_SM}}` | CSS length | yes | `brand-tokens.radius.sm` | `--radius-sm` |
| `{{TOKEN_RADIUS_MD}}` | CSS length | yes | `brand-tokens.radius.md` | `--radius-md` |
| `{{TOKEN_RADIUS_LG}}` | CSS length | yes | `brand-tokens.radius.lg` | `--radius-lg` |
| `{{TOKEN_RADIUS_XL}}` | CSS length | yes | `brand-tokens.radius.xl` | `--radius-xl` |
| `{{TOKEN_SHADOW_SM}}` | CSS shadow | yes | `brand-tokens.shadows.sm` | `--shadow-sm` |
| `{{TOKEN_SHADOW_MD}}` | CSS shadow | yes | `brand-tokens.shadows.md` | `--shadow-md` |
| `{{TOKEN_SHADOW_LG}}` | CSS shadow | yes | `brand-tokens.shadows.lg` | `--shadow-lg` |
| `{{TOKEN_SHADOW_CARD}}` | CSS shadow | yes | `brand-tokens.shadows.card` | `--shadow-card` |
| `{{TOKEN_MAX_W}}` | CSS length | yes | `brand-tokens.layout.maxWidth` | `--max-w` |

---

## 3. Nav Placeholders

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{NAV_LOGO_TEXT}}` | string | yes | `manifest.nav.logoText` or fallback to short company name | `.toc-logo` text content |
| `{{NAV_ITEMS}}` | array | yes | `manifest.nav.items[]` or auto-generated from `manifest.sections[].id` | `<a href="...">` elements inside `.toc-inner` |
| `{{NAV_LINK_HREF}}` | string | yes (per link) | `manifest.nav.links[n].href` | `<a href="#...">` anchor |
| `{{NAV_LINK_LABEL}}` | string | yes (per link) | `manifest.nav.links[n].label` | `<a>` text content |

---

## 4. Hero Placeholders

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{HERO_LOGO_TEXT}}` | string | no | `manifest.hero.logoText` (defaults to `{{META_COMPANY}}`) | `.hero-logo` text |
| `{{HERO_BADGES}}` | array | yes | `manifest.meta.badges[]` | `<span class="hero-badge">` elements inside `.hero-badges` |
| `{{HERO_BADGE_TEXT}}` | string | yes (per badge) | `manifest.meta.badges[n]` | Badge text content |
| `{{HERO_H1_PLAIN}}` | string | yes | `manifest.hero.h1Plain` | Non-highlighted text in `<h1>` |
| `{{HERO_H1_HIGHLIGHT}}` | string | yes | `manifest.hero.h1Highlight` | `<h1> <span>` text (orange) |
| `{{HERO_SUBTITLE}}` | string | yes | `manifest.hero.subtitle` | `.hero-sub` paragraph |
| `{{HERO_KPIS}}` | array | yes | `manifest.hero.kpis[]` | `.hero-kpis` grid children |
| `{{HERO_KPI_ICON}}` | string (HTML entity/emoji) | yes (per KPI) | `manifest.hero.kpis[n].icon` | `.hero-kpi-icon` content |
| `{{HERO_KPI_VALUE}}` | string | yes (per KPI) | `manifest.hero.kpis[n].value` | `.hero-kpi-value` content |
| `{{HERO_KPI_LABEL}}` | string | yes (per KPI) | `manifest.hero.kpis[n].label` | `.hero-kpi-label` content |

---

## 5. Section Placeholders

Used for each `<section>` block inside `<main>`.

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{SECTION_ID}}` | string | yes | `manifest.sections[n].id` | `<section id="...">` attribute |
| `{{SECTION_H2_PLAIN}}` | string | yes | `manifest.sections[n].headerTitle` | Non-highlighted text in `<h2>` |
| `{{SECTION_H2_HIGHLIGHT}}` | string | yes | `manifest.sections[n].headerHighlight` | `<h2> <span>` text (orange) |
| `{{SECTION_DESC}}` | string | no | `manifest.sections[n].headerDescription` | `.section-header p` content |
| `{{SECTION_SHOW_DIVIDER}}` | boolean | no | `manifest.sections[n].showDivider` | `<hr class="section-divider">` presence |

---

## 6. Component Placeholders (per component type)

### 6.1 problem-grid

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{PROBLEM_CARDS}}` | array | yes | `component.data.cards[]` | `.problem-card` elements in `.problem-grid` |
| `{{PROBLEM_CARD_TITLE}}` | string | yes (per card) | `component.data.cards[n].title` | `.problem-card h4` |
| `{{PROBLEM_CARD_BODY}}` | string | yes (per card) | `component.data.cards[n].body` | `.problem-card p` |
| `{{PROBLEM_CARD_BORDER_COLOR}}` | CSS color | no | `component.data.cards[n].borderColor` | `style="border-left-color:..."` |
| `{{PROBLEM_CARD_TITLE_COLOR}}` | CSS color | no | `component.data.cards[n].titleColor` | `h4 style="color:..."` |

### 6.2 antipatron

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{ANTIPATRON_BAD_TITLE}}` | string | yes | `component.data.bad.title` | `.antipatron-col.bad h4` |
| `{{ANTIPATRON_BAD_ITEMS}}` | array of string | yes | `component.data.bad.items[]` | `<li>` elements in bad column |
| `{{ANTIPATRON_GOOD_TITLE}}` | string | yes | `component.data.good.title` | `.antipatron-col.good h4` |
| `{{ANTIPATRON_GOOD_ITEMS}}` | array of string | yes | `component.data.good.items[]` | `<li>` elements in good column |

### 6.3 cycle-visual

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{CYCLE_STEPS}}` | array | yes | `component.data.steps[]` | `.cycle-step` + `.cycle-arrow` sequence |
| `{{CYCLE_STEP_NUM}}` | integer | yes (per step) | `component.data.steps[n].num` | `.step-num` circle number |
| `{{CYCLE_STEP_LABEL}}` | string | yes (per step) | `component.data.steps[n].label` | `.step-label` text |
| `{{CYCLE_STEP_JARVIS}}` | string | yes (per step) | `component.data.steps[n].jarvis` | `.step-jarvis` text |
| `{{CYCLE_STEP_ARTIFACT}}` | string | yes (per step) | `component.data.steps[n].artifact` | `.step-artifact` text |

### 6.4 map-table

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{MAP_TABLE_HEADERS}}` | array of string | yes | `component.data.headers[]` | `<th>` elements in `<thead>` |
| `{{MAP_TABLE_ROWS}}` | array of row objects | yes | `component.data.rows[]` | `<tr>` elements in `<tbody>` |
| `{{MAP_TABLE_CELL_TEXT}}` | string | yes (per cell) | `component.data.rows[n].cells[m].text` | `<td>` text content |
| `{{MAP_TABLE_CELL_BOLD}}` | boolean | no (per cell) | `component.data.rows[n].cells[m].bold` | `style="font-weight:700"` |
| `{{MAP_TABLE_CELL_JARVIS}}` | boolean | no (per cell) | `component.data.rows[n].cells[m].jarvisName` | `class="jarvis-name"` |

### 6.5 jarvis-cards

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{JARVIS_CARDS}}` | array | yes | `component.data.cards[]` | `.jarvis-card` elements |
| `{{JARVIS_ICON_CLASS}}` | string | yes (per card) | `component.data.cards[n].iconClass` | `.jarvis-icon.{class}` modifier |
| `{{JARVIS_ICON_LABEL}}` | string | yes (per card) | `component.data.cards[n].iconLabel` | `.jarvis-icon` text (e.g., "LF") |
| `{{JARVIS_NAME}}` | string | yes (per card) | `component.data.cards[n].name` | `.jarvis-card-header h3` text |
| `{{JARVIS_SUBTITLE}}` | string | yes (per card) | `component.data.cards[n].subtitle` | `h3 > small` text |
| `{{JARVIS_DESCRIPTION}}` | string | yes (per card) | `component.data.cards[n].description` | `.jarvis-card-body > p` |
| `{{JARVIS_FIELDS}}` | array | yes (per card) | `component.data.cards[n].fields[]` | `.jf` blocks |
| `{{JARVIS_FIELD_LABEL}}` | string | yes (per field) | `...fields[m].label` | `.jf-label` text |
| `{{JARVIS_FIELD_VALUE}}` | string | yes (per field) | `...fields[m].value` | `.jf-value` or `.jf-prompt` text |
| `{{JARVIS_FIELD_IS_PROMPT}}` | boolean | no (per field) | `...fields[m].isPrompt` | Switches from `.jf-value` to `.jf-prompt` |
| `{{JARVIS_ANTIUSE}}` | string | no (per card) | `component.data.cards[n].antiUse` | `.jf-antiuse` content |
| `{{JARVIS_GEM_URL}}` | string (URL) | no (per card) | `component.data.cards[n].gemLink.url` | `.gem-link` href |
| `{{JARVIS_GEM_LABEL}}` | string | no (per card) | `component.data.cards[n].gemLink.label` | `.gem-link` text |

### 6.6 timeline

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{TIMELINE_ITEMS}}` | array | yes | `component.data.items[]` | `.timeline-item` elements |
| `{{TIMELINE_DOT_NUM}}` | integer | yes (per item) | `component.data.items[n].dotNum` | `.timeline-dot` number |
| `{{TIMELINE_WEEK_LABEL}}` | string | yes (per item) | `component.data.items[n].weekLabel` | `<span class="wk">` text |
| `{{TIMELINE_TITLE_SUFFIX}}` | string | yes (per item) | `component.data.items[n].titleSuffix` | Text after `.wk` span in `h3` |
| `{{TIMELINE_OBJECTIVE}}` | string | yes (per item) | `component.data.items[n].objective` | `.week-obj` paragraph |
| `{{TIMELINE_TAGS}}` | array | no (per item) | `component.data.items[n].tags[]` | `.jtag` elements in `.jtags` |
| `{{TIMELINE_TAG_LABEL}}` | string | yes (per tag) | `...tags[m].label` | `.jtag` text |
| `{{TIMELINE_TAG_VARIANT}}` | string | yes (per tag) | `...tags[m].variant` | `.jtag.{variant}` class |
| `{{TIMELINE_DELIVERABLE_LABEL}}` | string | no (per item) | `component.data.items[n].deliverable.label` | `.tl-deliverable strong` text |
| `{{TIMELINE_DELIVERABLE_TEXT}}` | string | no (per item) | `component.data.items[n].deliverable.text` | `.tl-deliverable` content after `<strong>` |
| `{{TIMELINE_GATE}}` | string | no (per item) | `component.data.items[n].gate` | `.gate-box` text content |

### 6.7 compare-grid

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{COMPARE_BEFORE_TITLE}}` | string | yes | `component.data.before.title` | `.compare-col.before h3` |
| `{{COMPARE_BEFORE_ITEMS}}` | array of string | yes | `component.data.before.items[]` | `<li>` in before column |
| `{{COMPARE_AFTER_TITLE}}` | string | yes | `component.data.after.title` | `.compare-col.after h3` |
| `{{COMPARE_AFTER_ITEMS}}` | array of string | yes | `component.data.after.items[]` | `<li>` in after column |

### 6.8 metrics-row

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{METRICS}}` | array | yes | `component.data.metrics[]` | `.metric-card` elements |
| `{{METRIC_VALUE}}` | string | yes (per metric) | `component.data.metrics[n].value` | `.mv` text |
| `{{METRIC_LABEL}}` | string | yes (per metric) | `component.data.metrics[n].label` | `.ml` text |

### 6.9 semaforo-grid

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{SEMAFORO_CARDS}}` | array | yes | `component.data.cards[]` | `.semaforo-card` elements |
| `{{SEMAFORO_VARIANT}}` | string | yes (per card) | `component.data.cards[n].variant` | `.semaforo-card.{variant}` class |
| `{{SEMAFORO_TITLE}}` | string | yes (per card) | `component.data.cards[n].title` | `.semaforo-card h4` |
| `{{SEMAFORO_DESCRIPTION}}` | string | yes (per card) | `component.data.cards[n].description` | `.semaforo-card p` |

### 6.10 vraid-box

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{VRAID_TITLE}}` | string | yes | `component.data.title` | `.vraid-box h3` |
| `{{VRAID_LETTERS}}` | array | yes | `component.data.letters[]` | `.vraid-letter` elements |
| `{{VRAID_LETTER}}` | string | yes (per letter) | `component.data.letters[n].letter` | `.letter` text |
| `{{VRAID_MEANING}}` | string | yes (per letter) | `component.data.letters[n].meaning` | `.meaning` text |
| `{{VRAID_FEEDS}}` | string | no (per letter) | `component.data.letters[n].feeds` | `.feeds` text |
| `{{VRAID_NOTE}}` | string | no | `component.data.note` | `.vraid-note` paragraph |

### 6.11 gem-bar

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{GEM_BAR_TITLE}}` | string | yes | `component.data.title` | `.gem-bar-title` text |
| `{{GEM_LINKS}}` | array | yes | `component.data.gems[]` | `.gem-link` elements |
| `{{GEM_LINK_LABEL}}` | string | yes (per gem) | `component.data.gems[n].label` | `.gem-link` text |
| `{{GEM_LINK_URL}}` | string (URL) | yes (per gem) | `component.data.gems[n].url` | `.gem-link` href |

### 6.12 callout

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{CALLOUT_VARIANT}}` | string | yes | `component.data.variant` | `.callout.{variant}` class |
| `{{CALLOUT_TITLE}}` | string | yes | `component.data.title` | `.callout strong` text |
| `{{CALLOUT_CONTENT}}` | string | conditional | `component.data.content` | `.callout p` text (when no items) |
| `{{CALLOUT_ITEMS}}` | array of string | conditional | `component.data.items[]` | `<li>` elements in `.callout ul` |

### 6.13 decision-table

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{DECISION_TABLE_HEADERS}}` | array of string | yes | `component.data.headers[]` | `<th>` elements |
| `{{DECISION_TABLE_ROWS}}` | array of row objects | yes | `component.data.rows[]` | `<tr>` elements |
| `{{DECISION_CELL_TEXT}}` | string | yes (per cell) | `component.data.rows[n].cells[m].text` | `<td>` text |
| `{{DECISION_CELL_BOLD}}` | boolean | no (per cell) | `component.data.rows[n].cells[m].bold` | `style="font-weight:700"` |
| `{{DECISION_CELL_COLOR}}` | CSS color | no (per cell) | `component.data.rows[n].cells[m].color` | `style="color:..."` |
| `{{DECISION_CELL_IS_LINK}}` | boolean | no (per cell) | `component.data.rows[n].cells[m].isLink` | Wraps in `<a>` tag |
| `{{DECISION_CELL_HREF}}` | string (URL) | conditional | `component.data.rows[n].cells[m].href` | `<a href="...">` |

### 6.14 guardrail-grid

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{GUARDRAIL_SI_TITLE}}` | string | yes | `component.data.siColumn.title` | `.guardrail-col.si h4` |
| `{{GUARDRAIL_SI_ITEMS}}` | array of string | yes | `component.data.siColumn.items[]` | `<li>` in .si column |
| `{{GUARDRAIL_NO_TITLE}}` | string | yes | `component.data.noColumn.title` | `.guardrail-col.no h4` |
| `{{GUARDRAIL_NO_ITEMS}}` | array of string | yes | `component.data.noColumn.items[]` | `<li>` in .no column |

### 6.15 gate-box

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{GATE_TEXT}}` | string | yes | `component.data.text` | `.gate-box` text content |

### 6.16 acceptance-list

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{ACCEPTANCE_PREAMBLE}}` | string | no | `component.data.preamble` | Paragraph before the `<ol>` |
| `{{ACCEPTANCE_ITEMS}}` | array of string | yes | `component.data.items[]` | `<li>` with auto-generated `CA-N` prefix |

### 6.17 testimonial-grid

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{TESTIMONIALS}}` | array | yes | `component.data.testimonials[]` | `.testimonial` elements |
| `{{TESTIMONIAL_QUOTE}}` | string | yes (per item) | `component.data.testimonials[n].quote` | `.testimonial-quote` text |
| `{{TESTIMONIAL_AUTHOR}}` | string | yes (per item) | `component.data.testimonials[n].author` | `.testimonial-author` text |
| `{{TESTIMONIAL_ROLE}}` | string | no (per item) | `component.data.testimonials[n].role` | `.testimonial-role` text |

### 6.18 case-highlight

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{CASE_METRIC_VALUE}}` | string | yes | `component.data.metricValue` | `.case-metric .big` text |
| `{{CASE_METRIC_UNIT}}` | string | yes | `component.data.metricUnit` | `.case-metric .unit` text |
| `{{CASE_TITLE}}` | string | yes | `component.data.title` | `.case-detail h4` text |
| `{{CASE_DESCRIPTION}}` | string | yes | `component.data.description` | `.case-detail p` text |

### 6.19 recommendations

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{REC_CARDS}}` | array | yes | `component.data.cards[]` | `.rec-card` elements |
| `{{REC_CARD_TITLE}}` | string | yes (per card) | `component.data.cards[n].title` | `.rec-card h4` text |
| `{{REC_CARD_BODY}}` | string | yes (per card) | `component.data.cards[n].body` | `.rec-card p` text |

### 6.20 inline-heading

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{INLINE_HEADING_TEXT}}` | string | yes | `component.data.text` | `<h3>` (or h4/h5) text content |
| `{{INLINE_HEADING_LEVEL}}` | integer (3-5) | no | `component.data.level` | Tag name (`h3`, `h4`, `h5`) |

### 6.21 inline-table

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{INLINE_TABLE_HEADERS}}` | array of string | yes | `component.data.headers[]` | `<th>` elements |
| `{{INLINE_TABLE_ROWS}}` | array of string arrays | yes | `component.data.rows[]` | `<tr>` with `<td>` elements |

### 6.22 inline-paragraph

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{INLINE_PARA_TEXT}}` | string | yes | `component.data.text` | `<p>` text or `<code>` if isCode |
| `{{INLINE_PARA_IS_CODE}}` | boolean | no | `component.data.isCode` | Wraps in `<code>` tag |

---

## 7. Kata Placeholders

Used in kata section templates (Kata 1-4).

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{KATA_ID}}` | string | yes | `manifest.katas[n].id` | `<section id="kata1">` |
| `{{KATA_NUMBER}}` | integer | yes | `manifest.katas[n].number` | Kata section heading number |
| `{{KATA_NAME}}` | string | yes | `manifest.katas[n].name` | Kata name (e.g., "Preparar") in heading |
| `{{KATA_OBJECTIVE}}` | string | yes | `manifest.katas[n].objective` | Section header description |
| `{{KATA_JARVIS_AGENT}}` | string | yes | `manifest.katas[n].jarvisAgent` | Primary Jarvis referenced |
| `{{KATA_DURATION}}` | string | no | `manifest.katas[n].duration` | Duration badge/label |
| `{{KATA_STEPS}}` | array | yes | `manifest.katas[n].steps[]` | Step cards or numbered list |
| `{{KATA_STEP_NUM}}` | integer | yes (per step) | `manifest.katas[n].steps[m].stepNumber` | Step number circle |
| `{{KATA_STEP_INSTRUCTION}}` | string | yes (per step) | `manifest.katas[n].steps[m].instruction` | Step instruction text |
| `{{KATA_STEP_TOOL}}` | string | no (per step) | `manifest.katas[n].steps[m].tool` | Tool badge (e.g., "Gemini") |
| `{{KATA_STEP_OUTPUT}}` | string | no (per step) | `manifest.katas[n].steps[m].output` | Expected output text |
| `{{KATA_STEP_TIP}}` | string | no (per step) | `manifest.katas[n].steps[m].tip` | Tip card or callout text |
| `{{KATA_SUCCESS_CRITERIA}}` | array of string | yes | `manifest.katas[n].successCriteria[]` | Success criteria checklist |
| `{{KATA_CHECKPOINT}}` | string | no | `manifest.katas[n].checkpoint` | `.gate-box` text |
| `{{KATA_ANTIPATTERNS}}` | array of string | no | `manifest.katas[n].antiPatterns[]` | Anti-pattern warnings |
| `{{KATA_PLATFORMS}}` | array of string | no | `manifest.katas[n].platforms[]` | Platform badge cards |

---

## 8. Flow Placeholders

Used in the flows section (13 workflow flows).

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{FLOW_NUMBER}}` | integer | yes | `manifest.flows[n].number` | Flow number in heading/table |
| `{{FLOW_NAME}}` | string | yes | `manifest.flows[n].name` | Flow name |
| `{{FLOW_TRIGGER}}` | string | yes | `manifest.flows[n].trigger` | Trigger/situation description |
| `{{FLOW_JARVIS_SEQUENCE}}` | array of string | yes | `manifest.flows[n].jarvisSequence[]` | Arrow-separated Jarvis names |
| `{{FLOW_INPUT}}` | string | no | `manifest.flows[n].input` | Minimum input description |
| `{{FLOW_OUTPUT}}` | string | yes | `manifest.flows[n].output` | Expected output artifacts |
| `{{FLOW_TIME}}` | string | no | `manifest.flows[n].estimatedTime` | Time estimate |
| `{{FLOW_FREQUENCY}}` | string | no | `manifest.flows[n].frequency` | How often executed |

---

## 9. Architecture Layer Placeholders

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{ARCH_LAYER_NAME}}` | string | yes | `manifest.architectureLayers[n].name` | Layer heading |
| `{{ARCH_LAYER_DESCRIPTION}}` | string | yes | `manifest.architectureLayers[n].description` | Layer description |
| `{{ARCH_LAYER_ICON}}` | string | no | `manifest.architectureLayers[n].icon` | Layer icon/emoji |
| `{{ARCH_LAYER_ITEMS}}` | array | yes | `manifest.architectureLayers[n].items[]` | Layer items list |
| `{{ARCH_ITEM_NAME}}` | string | yes (per item) | `...items[m].name` | Item name |
| `{{ARCH_ITEM_DESCRIPTION}}` | string | no (per item) | `...items[m].description` | Item description |
| `{{ARCH_ITEM_JARVIS}}` | string | no (per item) | `...items[m].jarvis` | Related Jarvis agent |
| `{{ARCH_ITEM_FREQUENCY}}` | string | no (per item) | `...items[m].frequency` | Execution frequency |

---

## 10. Footer Placeholders

| Placeholder | Type | Required | Source | Renders to |
|------------|------|----------|--------|------------|
| `{{FOOTER_LOGO}}` | string | yes | `manifest.footer.logo` | `.footer-logo` text |
| `{{FOOTER_BADGES}}` | array | yes | `manifest.footer.badges[]` | `<span class="footer-badge">` elements |
| `{{FOOTER_BADGE_TEXT}}` | string | yes (per badge) | `manifest.footer.badges[n]` | Badge text content |
| `{{FOOTER_COPYRIGHT}}` | string | yes | `manifest.footer.copyright` | `.footer-bottom` text (supports HTML entities) |

---

## Summary Statistics

| Category | Unique Placeholders |
|----------|-------------------|
| Document-level | 7 |
| CSS Tokens | 40 |
| Nav | 4 |
| Hero | 10 |
| Section | 5 |
| Component types (22) | 98 |
| Kata | 16 |
| Flow | 8 |
| Architecture Layer | 8 |
| Footer | 4 |
| **Total** | **200** |
