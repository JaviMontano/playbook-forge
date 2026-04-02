# Component Inventory -- Playbook Workflows Agenticos Gestion Sofka

> Source: `/Users/deonto/Documents/workspace/outputs/tasks/playbook_workflows_agenticos_gestion_sofka.html`
> Generated: 2026-04-02
> Total lines: 904

---

## Summary Counts

| Metric | Count |
|--------|-------|
| Total lines in file | 904 |
| CSS lines (style block, L11-L333) | 323 |
| HTML body lines (L335-L904) | 570 |
| Unique CSS classes defined | 117 |
| Unique component types | 22 |
| Section anchors (id attributes) | 9 |
| Media query blocks | 4 |
| Custom properties (:root) | 40 |

---

## 1. Document-Level Elements

### DOCTYPE + html (L1-L2)
- **Tag**: `<!DOCTYPE html>` + `<html lang="es">`
- **Classes**: none
- **Data slots**: `lang` attribute (currently "es")

### head (L3-L334)
- **Tag**: `<head>` containing meta, title, links, style
- **Children**:

#### meta charset (L4)
- `<meta charset="UTF-8">`

#### meta viewport (L5)
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

#### title (L6)
- `<title>Playbook Corporativo -- Workflows Agenticos para Roles de Gestion | Sofka Technologies</title>`
- **Data slots**: Full title text is parameterizable

#### link preconnect #1 (L7)
- `<link rel="preconnect" href="https://fonts.googleapis.com">`

#### link preconnect #2 (L8)
- `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`

#### Google Fonts link -- Inter (L9)
- `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">`
- Weights: 300, 400, 500, 600, 700, 800, 900

#### Fontshare link -- Clash Grotesk (L10)
- `<link href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&display=swap" rel="stylesheet">`
- Weights: 400, 500, 600, 700

#### style block (L11-L333)
- Contains all CSS. Described in sections below.

---

## 2. CSS Custom Properties -- :root (L13-L54)

| Line | Property | Value | Category |
|------|----------|-------|----------|
| 14 | `--sofka-orange` | `#FF7E08` | Brand primary |
| 15 | `--sofka-orange-light` | `#FF9E42` | Brand primary light |
| 16 | `--sofka-orange-dark` | `#CC6506` | Brand primary dark |
| 17 | `--sofka-orange-dim` | `rgba(255,126,8,.10)` | Brand primary dim |
| 18 | `--sofka-black` | `#000000` | Neutral |
| 19 | `--sofka-white` | `#FFFFFF` | Neutral |
| 20 | `--sofka-light` | `#EFEAE4` | Neutral warm |
| 21 | `--sofka-positive` | `#FFD700` | Semantic - positive |
| 22 | `--sofka-positive-dim` | `rgba(255,215,0,.12)` | Semantic - positive dim |
| 23 | `--sofka-positive-text` | `#B8860B` | Semantic - positive text |
| 24 | `--sofka-warning` | `#D97706` | Semantic - warning |
| 25 | `--sofka-warning-dim` | `rgba(217,119,6,.08)` | Semantic - warning dim |
| 26 | `--sofka-warning-border` | `rgba(217,119,6,.3)` | Semantic - warning border |
| 27 | `--sofka-critical` | `#DC2626` | Semantic - critical |
| 28 | `--sofka-critical-dim` | `rgba(220,38,38,.07)` | Semantic - critical dim |
| 29 | `--sofka-critical-border` | `rgba(220,38,38,.25)` | Semantic - critical border |
| 30 | `--sofka-info` | `#2563EB` | Semantic - info |
| 31 | `--sofka-info-dim` | `rgba(37,99,235,.07)` | Semantic - info dim |
| 32 | `--sofka-info-border` | `rgba(37,99,235,.25)` | Semantic - info border |
| 33 | `--sofka-green` | `#42D36F` | Accent green |
| 34 | `--sofka-teal` | `#06C8C8` | Accent teal |
| 35 | `--sofka-violet` | `#9747FF` | Accent violet |
| 36 | `--sofka-gray-50` | `#FAF8F6` | Gray scale |
| 37 | `--sofka-gray-100` | `#F4F0EC` | Gray scale |
| 38 | `--sofka-gray-200` | `#E4DED7` | Gray scale |
| 39 | `--sofka-gray-300` | `#D1C9BE` | Gray scale |
| 40 | `--sofka-gray-500` | `#6B6560` | Gray scale |
| 41 | `--sofka-gray-700` | `#333130` | Gray scale |
| 42 | `--sofka-gray-900` | `#111110` | Gray scale |
| 43 | `--font-display` | `'Clash Grotesk', 'Inter', sans-serif` | Typography |
| 44 | `--font-body` | `'Inter', system-ui, sans-serif` | Typography |
| 45 | `--radius-sm` | `6px` | Radius |
| 46 | `--radius-md` | `12px` | Radius |
| 47 | `--radius-lg` | `16px` | Radius |
| 48 | `--radius-xl` | `24px` | Radius |
| 49 | `--shadow-sm` | `0 1px 2px rgba(0,0,0,.05)` | Shadow |
| 50 | `--shadow-md` | `0 4px 12px rgba(0,0,0,.08)` | Shadow |
| 51 | `--shadow-lg` | `0 12px 40px rgba(0,0,0,0.12)` | Shadow |
| 52 | `--shadow-card` | `0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.06)` | Shadow |
| 53 | `--max-w` | `1100px` | Layout |

**Total custom properties: 40**

---

## 3. CSS Component Styles -- Every Class and Rule

### Global Reset (L55-L61)

| Line | Selector | Rules |
|------|----------|-------|
| 55 | `*, *::before, *::after` | `box-sizing: border-box; margin: 0; padding: 0` |
| 56 | `html` | `scroll-behavior: smooth; -webkit-font-smoothing: antialiased` |
| 57 | `body` | `font-family: var(--font-body); background: var(--sofka-white); color: var(--sofka-gray-900); line-height: 1.65; font-size: 16px` |
| 58 | `h1,h2,h3,h4,h5` | `font-family: var(--font-display); font-weight: 700; line-height: 1.2` |
| 59 | `a` | `color: var(--sofka-orange-dark); text-decoration: none; font-weight: 600` |
| 60 | `a:hover` | `text-decoration: underline; color: var(--sofka-orange)` |
| 61 | `strong` | `color: var(--sofka-black); font-weight: 700` |

### Accessibility (L62-L64)

| Line | Class/Selector | Rules |
|------|----------------|-------|
| 62 | `.skip-link` | `position: absolute; top: -100px; left: 0; background: var(--sofka-orange); color: #fff; padding: .5rem 1rem; z-index: 999` |
| 63 | `.skip-link:focus` | `top: 0` |
| 64 | `:focus-visible` | `outline: 2px solid var(--sofka-orange); outline-offset: 2px` |

### NAV (L66-L72)

| Line | Class | Rules |
|------|-------|-------|
| 67 | `nav.toc` | `background: var(--sofka-gray-50); position: sticky; top: 0; z-index: 100; border-bottom: 2px solid var(--sofka-gray-300); box-shadow: var(--shadow-sm)` |
| 68 | `nav.toc .toc-inner` | `max-width: var(--max-w); margin: 0 auto; display: flex; overflow-x: auto; scrollbar-width: none; padding: 0 2rem; align-items: center` |
| 69 | `nav.toc .toc-inner::-webkit-scrollbar` | `display: none` |
| 70 | `nav.toc .toc-logo` | `font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--sofka-orange); padding: .75rem 1rem .75rem 0; white-space: nowrap; border-right: 1px solid var(--sofka-gray-300); margin-right: .5rem` |
| 71 | `nav.toc a` | `display: block; padding: .85rem 1rem; font-size: .72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: var(--sofka-gray-500); white-space: nowrap; text-decoration: none; border-bottom: 3px solid transparent; transition: all .2s` |
| 72 | `nav.toc a:hover` | `color: var(--sofka-orange); border-bottom-color: var(--sofka-orange); text-decoration: none` |

### HERO (L74-L88)

| Line | Class | Rules |
|------|-------|-------|
| 75 | `.hero` | `background: var(--sofka-black); position: relative; overflow: hidden; padding: 5rem 2rem 4rem; border-bottom: 8px solid var(--sofka-orange)` |
| 76 | `.hero::before` | `content: ''; position: absolute; top: 0; right: -20%; width: 60%; height: 100%; background: radial-gradient(ellipse at 100% 50%, rgba(255,126,8,0.15) 0%, transparent 70%); pointer-events: none` |
| 77 | `.hero-inner` | `position: relative; z-index: 2; max-width: var(--max-w); margin: 0 auto; color: var(--sofka-white)` |
| 78 | `.hero-logo` | `font-family: var(--font-display); font-size: 1.6rem; font-weight: 700; color: var(--sofka-orange); margin-bottom: 1.5rem; letter-spacing: -1px` |
| 79 | `.hero-badges` | `display: flex; gap: .75rem; flex-wrap: wrap; margin-bottom: 1.5rem` |
| 80 | `.hero-badge` | `background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); color: rgba(255,255,255,.85); padding: .35rem .9rem; border-radius: var(--radius-sm); font-size: .75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px` |
| 81 | `.hero h1` | `font-size: clamp(2rem, 5vw, 3.2rem); color: var(--sofka-white); margin-bottom: 1rem` |
| 82 | `.hero h1 span` | `color: var(--sofka-orange)` |
| 83 | `.hero-sub` | `font-size: 1.1rem; color: rgba(255,255,255,.8); margin-bottom: 2rem; line-height: 1.7; max-width: 750px` |
| 84 | `.hero-kpis` | `display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.5rem` |
| 85 | `.hero-kpi` | `text-align: center` |
| 86 | `.hero-kpi-icon` | `font-size: 1.6rem; margin-bottom: .4rem` |
| 87 | `.hero-kpi-value` | `font-family: var(--font-display); font-size: 2rem; font-weight: 700; line-height: 1; color: var(--sofka-orange)` |
| 88 | `.hero-kpi-label` | `font-size: .72rem; color: rgba(255,255,255,.55); margin-top: .3rem; font-weight: 500; letter-spacing: .5px` |

### MAIN / Section Layout (L90-L97)

| Line | Class | Rules |
|------|-------|-------|
| 91 | `main.container` | `max-width: var(--max-w); margin: 0 auto; padding: 3rem 2rem` |
| 92 | `main.container > section` | `margin-bottom: 3.5rem` |
| 93 | `.section-header` | `margin-bottom: 2rem` |
| 94 | `.section-header h2` | `font-size: 2rem; color: var(--sofka-black); margin-bottom: .5rem` |
| 95 | `.section-header h2 span` | `color: var(--sofka-orange)` |
| 96 | `.section-header p` | `color: var(--sofka-gray-500); font-size: 1.05rem; line-height: 1.7; max-width: 780px` |
| 97 | `.section-divider` | `border: none; border-top: 2px solid var(--sofka-gray-300); margin: 3rem 0` |

### Problem Cards (L99-L104)

| Line | Class | Rules |
|------|-------|-------|
| 100 | `.problem-grid` | `display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 1.25rem; margin-top: 1.5rem` |
| 101 | `.problem-card` | `background: var(--sofka-gray-50); border-radius: var(--radius-md); padding: 1.5rem; border-left: 4px solid var(--sofka-critical); box-shadow: var(--shadow-card); transition: transform .2s, box-shadow .2s` |
| 102 | `.problem-card:hover` | `transform: translateY(-2px); box-shadow: var(--shadow-md)` |
| 103 | `.problem-card h4` | `font-size: .95rem; color: var(--sofka-critical); margin-bottom: .5rem` |
| 104 | `.problem-card p` | `font-size: .88rem; color: var(--sofka-gray-500); margin: 0; line-height: 1.6` |

### Antipatron (L106-L118)

| Line | Class | Rules |
|------|-------|-------|
| 107 | `.antipatron` | `display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5rem; align-items: stretch; margin-top: 2rem` |
| 108 | `.antipatron-col` | `background: var(--sofka-gray-50); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm)` |
| 109 | `.antipatron-col.bad` | `border-top: 4px solid var(--sofka-critical)` |
| 110 | `.antipatron-col.good` | `border-top: 4px solid var(--sofka-green)` |
| 111 | `.antipatron-col h4` | `font-size: .9rem; margin-bottom: .75rem` |
| 112 | `.antipatron-col.bad h4` | `color: var(--sofka-critical)` |
| 113 | `.antipatron-col.good h4` | `color: #16A34A` |
| 114 | `.antipatron-col ul` | `list-style: none; padding: 0; margin: 0` |
| 115 | `.antipatron-col li` | `font-size: .85rem; color: var(--sofka-gray-700); padding: .35rem 0 .35rem 1.4rem; position: relative` |
| 116 | `.antipatron-col.bad li::before` | `content: "\2717"; position: absolute; left: 0; color: var(--sofka-critical); font-weight: 700` |
| 117 | `.antipatron-col.good li::before` | `content: "\2713"; position: absolute; left: 0; color: #16A34A; font-weight: 700` |
| 118 | `.antipatron-arrow` | `display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: var(--sofka-orange); font-weight: 700` |

### Cycle (L120-L128)

| Line | Class | Rules |
|------|-------|-------|
| 121 | `.cycle-visual` | `display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: 2.5rem 0` |
| 122 | `.cycle-step` | `background: var(--sofka-gray-50); border: 2px solid var(--sofka-gray-200); border-radius: var(--radius-md); padding: 1.25rem 1rem; text-align: center; min-width: 150px; flex: 1; max-width: 190px; transition: border-color .2s, box-shadow .2s` |
| 123 | `.cycle-step:hover` | `border-color: var(--sofka-orange); box-shadow: 0 4px 16px rgba(255,126,8,.12)` |
| 124 | `.cycle-step .step-num` | `width: 32px; height: 32px; border-radius: 50%; background: var(--sofka-orange); color: var(--sofka-white); font-weight: 800; font-size: .85rem; display: inline-flex; align-items: center; justify-content: center; margin-bottom: .6rem` |
| 125 | `.cycle-step .step-label` | `font-family: var(--font-display); font-size: .85rem; font-weight: 600; color: var(--sofka-gray-900); margin-bottom: .25rem` |
| 126 | `.cycle-step .step-jarvis` | `font-size: .75rem; color: var(--sofka-orange); font-weight: 700` |
| 127 | `.cycle-step .step-artifact` | `font-size: .72rem; color: var(--sofka-gray-500); margin-top: .25rem` |
| 128 | `.cycle-arrow` | `display: flex; align-items: center; color: var(--sofka-orange); font-size: 1.4rem; font-weight: 700` |

### Map Table (L130-L135)

| Line | Class | Rules |
|------|-------|-------|
| 131 | `.map-table` | `width: 100%; border-collapse: collapse; margin-top: 1.5rem; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--sofka-gray-300)` |
| 132 | `.map-table th` | `background: var(--sofka-gray-900); color: var(--sofka-white); padding: .875rem 1.25rem; text-align: left; font-size: .78rem; font-weight: 600; text-transform: uppercase; letter-spacing: .5px` |
| 133 | `.map-table td` | `padding: .875rem 1.25rem; border-bottom: 1px solid var(--sofka-gray-200); background: var(--sofka-gray-50); color: var(--sofka-gray-900); font-size: .88rem; vertical-align: top` |
| 134 | `.map-table tr:hover td` | `background: var(--sofka-gray-100)` |
| 135 | `.map-table .jarvis-name` | `color: var(--sofka-orange); font-weight: 700` |

### Jarvis Cards (L137-L155)

| Line | Class | Rules |
|------|-------|-------|
| 138 | `.jarvis-cards` | `display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-top: 2rem` |
| 139 | `.jarvis-card` | `background: var(--sofka-gray-50); border: 1px solid var(--sofka-gray-200); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-card); transition: box-shadow .2s, transform .2s` |
| 140 | `.jarvis-card:hover` | `box-shadow: var(--shadow-md); transform: translateY(-2px)` |
| 141 | `.jarvis-card-header` | `padding: 1.25rem 1.5rem 1rem; border-bottom: 1px solid var(--sofka-gray-200); display: flex; align-items: center; gap: .75rem` |
| 142 | `.jarvis-icon` | `width: 44px; height: 44px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; flex-shrink: 0` |
| 143 | `.jarvis-icon.lareu` | `background: var(--sofka-info-dim); color: var(--sofka-info); border: 1px solid var(--sofka-info-border)` |
| 144 | `.jarvis-icon.lavuelta` | `background: var(--sofka-orange-dim); color: var(--sofka-orange); border: 1px solid rgba(255,126,8,.25)` |
| 145 | `.jarvis-icon.elrepo` | `background: rgba(66,211,111,.1); color: #16A34A; border: 1px solid rgba(66,211,111,.25)` |
| 146 | `.jarvis-icon.lainfo` | `background: rgba(151,71,255,.08); color: var(--sofka-violet); border: 1px solid rgba(151,71,255,.2)` |
| 147 | `.jarvis-icon.laforja` | `background: var(--sofka-critical-dim); color: var(--sofka-critical); border: 1px solid var(--sofka-critical-border)` |
| 148 | `.jarvis-card-header h3` | `font-size: 1rem; font-weight: 700; color: var(--sofka-gray-900)` |
| 149 | `.jarvis-card-header h3 small` | `display: block; font-size: .75rem; font-weight: 400; color: var(--sofka-gray-500); margin-top: .15rem` |
| 150 | `.jarvis-card-body` | `padding: 1.25rem 1.5rem` |
| 151 | `.jarvis-card-body > p` | `font-size: .88rem; color: var(--sofka-gray-500); margin-bottom: 1rem; line-height: 1.65` |
| 152 | `.jf` | `margin-bottom: 1rem` |
| 153 | `.jf-label` | `font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .8px; color: var(--sofka-orange); margin-bottom: .2rem` |
| 154 | `.jf-value` | `font-size: .85rem; color: var(--sofka-gray-900); line-height: 1.55` |
| 155 | `.jf-prompt` | `background: var(--sofka-gray-100); border: 1px solid var(--sofka-gray-200); border-radius: var(--radius-sm); padding: .75rem 1rem; font-size: .82rem; color: var(--sofka-gray-700); font-style: italic; line-height: 1.5` |

### Timeline (L157-L178)

| Line | Class | Rules |
|------|-------|-------|
| 158 | `.timeline` | `margin-top: 2rem; position: relative; padding-left: 2.5rem` |
| 159 | `.timeline::before` | `content: ''; position: absolute; left: .7rem; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, var(--sofka-orange), var(--sofka-info), var(--sofka-green), var(--sofka-violet)); border-radius: 2px` |
| 160 | `.timeline-item` | `position: relative; margin-bottom: 2rem` |
| 161 | `.timeline-dot` | `position: absolute; left: -2.5rem; top: .25rem; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .65rem; font-weight: 800; color: var(--sofka-white); z-index: 2` |
| 162 | `.timeline-item:nth-child(1) .timeline-dot` | `background: var(--sofka-orange)` |
| 163 | `.timeline-item:nth-child(2) .timeline-dot` | `background: var(--sofka-info)` |
| 164 | `.timeline-item:nth-child(3) .timeline-dot` | `background: #16A34A` |
| 165 | `.timeline-item:nth-child(4) .timeline-dot` | `background: var(--sofka-violet)` |
| 166 | `.timeline-content` | `background: var(--sofka-gray-50); border: 1px solid var(--sofka-gray-200); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm)` |
| 167 | `.timeline-content h3` | `font-size: 1rem; margin-bottom: .4rem; color: var(--sofka-gray-900)` |
| 168 | `.timeline-content h3 .wk` | `color: var(--sofka-orange)` |
| 169 | `.timeline-content .week-obj` | `font-size: .88rem; color: var(--sofka-gray-500); margin-bottom: 1rem; line-height: 1.6` |
| 170 | `.jtags` | `display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: .75rem` |
| 171 | `.jtag` | `display: inline-block; padding: .25rem .75rem; border-radius: 16px; font-size: .7rem; font-weight: 600; border: 1px solid` |
| 172 | `.jtag.t-lareu` | `background: var(--sofka-info-dim); border-color: var(--sofka-info-border); color: var(--sofka-info)` |
| 173 | `.jtag.t-lavuelta` | `background: var(--sofka-orange-dim); border-color: rgba(255,126,8,.25); color: var(--sofka-orange)` |
| 174 | `.jtag.t-elrepo` | `background: rgba(66,211,111,.08); border-color: rgba(66,211,111,.2); color: #16A34A` |
| 175 | `.jtag.t-lainfo` | `background: rgba(151,71,255,.06); border-color: rgba(151,71,255,.18); color: var(--sofka-violet)` |
| 176 | `.jtag.t-laforja` | `background: var(--sofka-critical-dim); border-color: var(--sofka-critical-border); color: var(--sofka-critical)` |
| 177 | `.tl-deliverable` | `background: var(--sofka-orange-dim); border: 1px solid rgba(255,126,8,.2); border-radius: var(--radius-sm); padding: .75rem 1rem; font-size: .82rem; color: var(--sofka-gray-700)` |
| 178 | `.tl-deliverable strong` | `color: var(--sofka-orange-dark)` |

### Compare (L180-L196)

| Line | Class | Rules |
|------|-------|-------|
| 181 | `.compare-grid` | `display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem` |
| 182 | `.compare-col` | `border-radius: var(--radius-md); padding: 1.75rem` |
| 183 | `.compare-col.before` | `background: var(--sofka-critical-dim); border: 1px solid var(--sofka-critical-border)` |
| 184 | `.compare-col.after` | `background: rgba(66,211,111,.06); border: 1px solid rgba(66,211,111,.2)` |
| 185 | `.compare-col h3` | `font-size: 1.1rem; margin-bottom: 1rem` |
| 186 | `.compare-col.before h3` | `color: var(--sofka-critical)` |
| 187 | `.compare-col.after h3` | `color: #16A34A` |
| 188 | `.compare-col ul` | `list-style: none; padding: 0; margin: 0` |
| 189 | `.compare-col li` | `padding: .5rem 0 .5rem 1.5rem; position: relative; font-size: .88rem; color: var(--sofka-gray-700); border-bottom: 1px solid rgba(0,0,0,.04)` |
| 190 | `.compare-col.before li::before` | `content: "\2717"; position: absolute; left: 0; color: var(--sofka-critical); font-weight: 700` |
| 191 | `.compare-col.after li::before` | `content: "\2713"; position: absolute; left: 0; color: #16A34A; font-weight: 700` |
| 193 | `.metrics-row` | `display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-top: 2rem` |
| 194 | `.metric-card` | `background: var(--sofka-gray-50); border: 1px solid var(--sofka-gray-200); border-radius: var(--radius-md); padding: 1.5rem; text-align: center; box-shadow: var(--shadow-sm)` |
| 195 | `.metric-card .mv` | `font-family: var(--font-display); font-size: 2rem; font-weight: 700; color: var(--sofka-orange); line-height: 1` |
| 196 | `.metric-card .ml` | `font-size: .78rem; color: var(--sofka-gray-500); margin-top: .35rem` |

### Semaforo (L198-L210)

| Line | Class | Rules |
|------|-------|-------|
| 199 | `.semaforo-grid` | `display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-top: 1.5rem` |
| 200 | `.semaforo-card` | `border-radius: var(--radius-md); padding: 1.25rem; border-left: 5px solid; background: var(--sofka-gray-50); box-shadow: var(--shadow-sm)` |
| 201 | `.semaforo-card.verde` | `border-left-color: var(--sofka-green)` |
| 202 | `.semaforo-card.blanco` | `border-left-color: var(--sofka-gray-300)` |
| 203 | `.semaforo-card.amarillo` | `border-left-color: var(--sofka-warning)` |
| 204 | `.semaforo-card.rojo` | `border-left-color: var(--sofka-critical)` |
| 205 | `.semaforo-card h4` | `font-size: .9rem; margin-bottom: .35rem` |
| 206 | `.semaforo-card.verde h4` | `color: #16A34A` |
| 207 | `.semaforo-card.blanco h4` | `color: var(--sofka-gray-700)` |
| 208 | `.semaforo-card.amarillo h4` | `color: var(--sofka-warning)` |
| 209 | `.semaforo-card.rojo h4` | `color: var(--sofka-critical)` |
| 210 | `.semaforo-card p` | `font-size: .82rem; color: var(--sofka-gray-500); margin: 0; line-height: 1.5` |

### VR-AID Box (L212-L221)

| Line | Class | Rules |
|------|-------|-------|
| 213 | `.vraid-box` | `margin-top: 2rem; background: var(--sofka-gray-50); border: 2px solid var(--sofka-orange); border-radius: var(--radius-lg); padding: 2rem; box-shadow: var(--shadow-md)` |
| 214 | `.vraid-box h3` | `font-family: var(--font-display); font-size: 1.3rem; color: var(--sofka-orange-dark); margin-bottom: 1rem` |
| 215 | `.vraid-letters` | `display: flex; flex-wrap: wrap; gap: .75rem; margin-bottom: 1.5rem` |
| 216 | `.vraid-letter` | `background: var(--sofka-orange-dim); border: 1px solid rgba(255,126,8,.2); border-radius: var(--radius-md); padding: 1rem; flex: 1; min-width: 150px` |
| 217 | `.vraid-letter .letter` | `font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: var(--sofka-orange)` |
| 218 | `.vraid-letter .meaning` | `font-size: .8rem; color: var(--sofka-gray-700)` |
| 219 | `.vraid-letter .feeds` | `font-size: .72rem; color: var(--sofka-info); margin-top: .25rem; font-weight: 600` |
| 220 | `.vraid-note` | `font-size: .88rem; color: var(--sofka-gray-700); line-height: 1.65; margin-top: .75rem` |
| 221 | `.vraid-note strong` | `color: var(--sofka-orange-dark)` |

### Gem Links (L223-L228)

| Line | Class | Rules |
|------|-------|-------|
| 224 | `.gem-link` | `display: inline-flex; align-items: center; gap: .4rem; background: var(--sofka-orange); color: var(--sofka-white); padding: .45rem 1rem; border-radius: var(--radius-sm); font-size: .78rem; font-weight: 700; text-decoration: none; transition: background .2s, transform .15s; letter-spacing: .3px` |
| 225 | `.gem-link:hover` | `background: var(--sofka-orange-dark); transform: translateY(-1px); text-decoration: none; color: var(--sofka-white)` |
| 226 | `.gem-link::before` | `content: "\2B50"; font-size: .85rem` |
| 227 | `.gem-bar` | `display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem; padding: 1.5rem; background: var(--sofka-black); border-radius: var(--radius-lg); justify-content: center` |
| 228 | `.gem-bar-title` | `width: 100%; text-align: center; font-family: var(--font-display); font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,.5); margin-bottom: .25rem` |

### Callouts (L230-L238)

| Line | Class | Rules |
|------|-------|-------|
| 231 | `.callout` | `padding: 1.25rem 1.5rem; border-radius: var(--radius-md); margin: 1.5rem 0; border-left: 4px solid` |
| 232 | `.callout-warning` | `background: var(--sofka-warning-dim); border-color: var(--sofka-warning)` |
| 233 | `.callout-info` | `background: var(--sofka-info-dim); border-color: var(--sofka-info)` |
| 234 | `.callout-orange` | `background: var(--sofka-orange-dim); border-color: var(--sofka-orange)` |
| 235 | `.callout strong` | `display: block; margin-bottom: .35rem; font-size: .88rem` |
| 236 | `.callout p, .callout li` | `font-size: .85rem; color: var(--sofka-gray-700); margin: 0; line-height: 1.55` |
| 237 | `.callout ul` | `list-style: disc; padding-left: 1.2rem; margin-top: .5rem` |
| 238 | `.callout li` | `margin-bottom: .25rem` |

### Decision Table (L240-L244)

| Line | Class | Rules |
|------|-------|-------|
| 241 | `.decision-table` | `width: 100%; border-collapse: collapse; margin-top: 1.5rem; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--sofka-gray-300); font-size: .85rem` |
| 242 | `.decision-table th` | `background: var(--sofka-gray-900); color: var(--sofka-white); padding: .75rem 1rem; text-align: left; font-size: .72rem; font-weight: 600; text-transform: uppercase; letter-spacing: .5px` |
| 243 | `.decision-table td` | `padding: .7rem 1rem; border-bottom: 1px solid var(--sofka-gray-200); background: var(--sofka-gray-50); color: var(--sofka-gray-900); vertical-align: top` |
| 244 | `.decision-table tr:hover td` | `background: var(--sofka-gray-100)` |

### Guardrail (L246-L257)

| Line | Class | Rules |
|------|-------|-------|
| 247 | `.guardrail-grid` | `display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem` |
| 248 | `.guardrail-col` | `background: var(--sofka-gray-50); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm)` |
| 249 | `.guardrail-col.si` | `border-top: 4px solid var(--sofka-green)` |
| 250 | `.guardrail-col.no` | `border-top: 4px solid var(--sofka-critical)` |
| 251 | `.guardrail-col h4` | `font-size: .9rem; margin-bottom: .75rem` |
| 252 | `.guardrail-col.si h4` | `color: #16A34A` |
| 253 | `.guardrail-col.no h4` | `color: var(--sofka-critical)` |
| 254 | `.guardrail-col ul` | `list-style: none; padding: 0; margin: 0` |
| 255 | `.guardrail-col li` | `font-size: .82rem; color: var(--sofka-gray-700); padding: .3rem 0 .3rem 1.4rem; position: relative` |
| 256 | `.guardrail-col.si li::before` | `content: "\2713"; position: absolute; left: 0; color: #16A34A; font-weight: 700` |
| 257 | `.guardrail-col.no li::before` | `content: "\2717"; position: absolute; left: 0; color: var(--sofka-critical); font-weight: 700` |

### Gate Box (L259-L260)

| Line | Class | Rules |
|------|-------|-------|
| 260 | `.gate-box` | `background: var(--sofka-black); border: 1px solid var(--sofka-positive); border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-top: 1rem; font-family: 'Menlo','Monaco',monospace; font-size: .78rem; color: var(--sofka-positive); line-height: 1.5; white-space: pre-wrap` |

### Anti-Use (L262-L264)

| Line | Class | Rules |
|------|-------|-------|
| 263 | `.jf-antiuse` | `background: var(--sofka-critical-dim); border: 1px solid var(--sofka-critical-border); border-radius: var(--radius-sm); padding: .6rem .85rem; font-size: .78rem; color: var(--sofka-gray-700); margin-top: .5rem` |
| 264 | `.jf-antiuse strong` | `color: var(--sofka-critical); font-size: .72rem; text-transform: uppercase; letter-spacing: .5px` |

### Acceptance List (L266-L269)

| Line | Class | Rules |
|------|-------|-------|
| 267 | `.acceptance-list` | `list-style: none; padding: 0; margin: 1.5rem 0; counter-reset: acc` |
| 268 | `.acceptance-list li` | `padding: .75rem 1rem .75rem 3rem; position: relative; background: var(--sofka-gray-50); border: 1px solid var(--sofka-gray-200); border-radius: var(--radius-sm); margin-bottom: .5rem; font-size: .85rem; color: var(--sofka-gray-700); counter-increment: acc` |
| 269 | `.acceptance-list li::before` | `content: "CA-" counter(acc); position: absolute; left: .75rem; top: .75rem; font-family: var(--font-display); font-size: .7rem; font-weight: 700; color: var(--sofka-orange)` |

### Testimonials (L271-L286)

| Line | Class | Rules |
|------|-------|-------|
| 272 | `.testimonial-grid` | `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 2rem` |
| 273 | `.testimonial` | `background: var(--sofka-gray-50); border: 1px solid var(--sofka-gray-200); border-radius: var(--radius-lg); padding: 1.75rem; box-shadow: var(--shadow-card); border-top: 4px solid var(--sofka-orange)` |
| 274 | `.testimonial-quote` | `font-size: .95rem; color: var(--sofka-gray-700); line-height: 1.7; font-style: italic; margin-bottom: 1rem` |
| 275 | `.testimonial-author` | `font-size: .82rem; font-weight: 700; color: var(--sofka-orange-dark)` |
| 276 | `.testimonial-role` | `font-size: .72rem; color: var(--sofka-gray-500)` |
| 277 | `.case-highlight` | `background: var(--sofka-orange-dim); border: 2px solid var(--sofka-orange); border-radius: var(--radius-lg); padding: 2rem; margin-top: 2rem; display: grid; grid-template-columns: auto 1fr; gap: 1.5rem; align-items: center` |
| 278 | `.case-metric` | `text-align: center` |
| 279 | `.case-metric .big` | `font-family: var(--font-display); font-size: 3rem; font-weight: 800; color: var(--sofka-orange); line-height: 1` |
| 280 | `.case-metric .unit` | `font-size: .8rem; color: var(--sofka-orange-dark); font-weight: 600` |
| 281 | `.case-detail h4` | `font-size: 1.1rem; color: var(--sofka-gray-900); margin-bottom: .5rem` |
| 282 | `.case-detail p` | `font-size: .9rem; color: var(--sofka-gray-700); margin: 0; line-height: 1.65` |
| 283 | `.recommendations` | `margin-top: 2rem` |
| 284 | `.rec-card` | `background: var(--sofka-gray-50); border-left: 4px solid var(--sofka-info); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1rem; box-shadow: var(--shadow-sm)` |
| 285 | `.rec-card h4` | `font-size: .9rem; color: var(--sofka-info); margin-bottom: .35rem` |
| 286 | `.rec-card p` | `font-size: .85rem; color: var(--sofka-gray-700); margin: 0; line-height: 1.55` |

### Footer (L288-L295)

| Line | Class | Rules |
|------|-------|-------|
| 289 | `footer.site-footer` | `background: var(--sofka-black); border-top: 8px solid var(--sofka-orange); color: var(--sofka-white); padding: 2.5rem 2rem 2rem` |
| 290 | `footer.site-footer .footer-inner` | `max-width: var(--max-w); margin: 0 auto` |
| 291 | `.footer-row` | `display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem` |
| 292 | `.footer-logo` | `font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: var(--sofka-orange)` |
| 293 | `.footer-badges` | `display: flex; gap: .75rem; flex-wrap: wrap` |
| 294 | `.footer-badge` | `background: rgba(255,126,8,.15); color: var(--sofka-orange); padding: .3rem .75rem; border-radius: var(--radius-sm); font-size: .72rem; font-weight: 600` |
| 295 | `.footer-bottom` | `margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,.1); font-size: .75rem; color: rgba(255,255,255,.45)` |

### Media Queries (L297-L332)

#### @media (max-width: 768px) -- L298-L313

| Line | Selector override | Change |
|------|-------------------|--------|
| 299 | `.hero` | `padding: 3rem 1rem` |
| 300 | `.hero-kpis` | `grid-template-columns: repeat(3, 1fr); gap: 1rem` |
| 301 | `.hero-kpi-value` | `font-size: 1.6rem` |
| 302 | `main.container` | `padding: 2rem 1rem` |
| 303 | `.antipatron` | `grid-template-columns: 1fr` |
| 304 | `.antipatron-arrow` | `transform: rotate(90deg); justify-self: center` |
| 305 | `.compare-grid` | `grid-template-columns: 1fr` |
| 306 | `.jarvis-cards` | `grid-template-columns: 1fr` |
| 307 | `.cycle-arrow` | `display: none` |
| 308 | `.cycle-step` | `max-width: none` |
| 309 | `.semaforo-grid` | `grid-template-columns: repeat(2, 1fr)` |
| 310 | `.metrics-row` | `grid-template-columns: repeat(2, 1fr)` |
| 311 | `nav.toc .toc-inner` | `padding: 0 1rem` |
| 312 | `.hero-kpis` | `grid-template-columns: repeat(2, 1fr)` (overrides L300) |

#### @media (max-width: 480px) -- L314-L318

| Line | Selector override | Change |
|------|-------------------|--------|
| 315 | `.hero-kpis` | `grid-template-columns: 1fr 1fr` |
| 316 | `.semaforo-grid` | `grid-template-columns: 1fr` |
| 317 | `.metrics-row` | `grid-template-columns: 1fr 1fr` |

#### @media print -- L321-L331

| Line | Selector | Change |
|------|----------|--------|
| 322 | `*` | `background: transparent !important; color: #000 !important; box-shadow: none !important` |
| 323 | `html` | `font-size: 11pt` |
| 324 | `body` | `margin: 0; padding: 1cm` |
| 325 | `.hero` | `border-bottom: 2px solid #000; page-break-after: always; padding: 2rem 0` |
| 326 | `.hero::before` | `display: none` |
| 327 | `nav.toc, .skip-link` | `display: none` |
| 328 | `main.container` | `padding: 0; max-width: none` |
| 329 | multiple card components | `page-break-inside: avoid; border: 1px solid #000; padding: .75rem; margin: .5cm 0` |
| 330 | `footer.site-footer` | `border-top: 2px solid #000; page-break-before: always` |

#### @media (prefers-reduced-motion: reduce) -- L332

| Line | Selector | Change |
|------|----------|--------|
| 332 | `*` | `animation-duration: 0.01ms !important; transition-duration: 0.01ms !important` |

---

## 4. HTML Body Components

### Skip Link (L336)
- **Tag**: `<a href="#main" class="skip-link">`
- **Classes**: `skip-link`
- **Data slots**: Link text ("Ir al contenido"), href target
- **Dependencies**: Requires `id="main"` on main element

---

### NAV Component (L339-L351)

- **Tag structure**: `nav.toc > div.toc-inner > [ div.toc-logo, a*8 ]`
- **Lines**: 339-351
- **Classes**: `toc`, `toc-inner`, `toc-logo`

| Line | Element | Class | Data slot |
|------|---------|-------|-----------|
| 339 | `<nav>` | `toc` | -- |
| 340 | `<div>` | `toc-inner` | -- |
| 341 | `<div>` | `toc-logo` | Logo text ("Sofka") |
| 342 | `<a href="#oportunidad">` | (nav.toc a) | Label + anchor |
| 343 | `<a href="#ciclo">` | (nav.toc a) | Label + anchor |
| 344 | `<a href="#jarvis">` | (nav.toc a) | Label + anchor |
| 345 | `<a href="#adopcion">` | (nav.toc a) | Label + anchor |
| 346 | `<a href="#decision">` | (nav.toc a) | Label + anchor |
| 347 | `<a href="#semaforo">` | (nav.toc a) | Label + anchor |
| 348 | `<a href="#agradecimiento">` | (nav.toc a) | Label + anchor |
| 349 | `<a href="#cierre">` | (nav.toc a) | Label + anchor |

**Data slots**: 8 nav links (label text + href anchor), logo text
**Dependencies**: Each href must match a section id

---

### HERO Component (L354-L392)

- **Tag structure**: `header.hero > div.hero-inner > [ div.hero-logo, div.hero-badges > span.hero-badge*3, h1 > span, p.hero-sub, div.hero-kpis > div.hero-kpi*5 ]`
- **Lines**: 354-392
- **Classes**: `hero`, `hero-inner`, `hero-logo`, `hero-badges`, `hero-badge`, `hero-sub`, `hero-kpis`, `hero-kpi`, `hero-kpi-icon`, `hero-kpi-value`, `hero-kpi-label`
- **Pseudo**: `::before` (radial gradient glow)

| Line | Element | Data slot |
|------|---------|-----------|
| 356 | `div.hero-logo` | Company name ("Sofka Technologies") |
| 358-361 | `span.hero-badge` x3 | Badge text (3 items) |
| 362 | `h1 > span` | Title text; span for orange highlight |
| 363 | `p.hero-sub` | Subtitle paragraph |
| 365-389 | `div.hero-kpi` x5 | Each: icon (HTML entity), value text, label text |

**KPI data slots per item**: icon entity, value text, label text
**Variants**: 5 KPI items, each identical structure

---

### MAIN Container (L394)
- **Tag**: `<main class="container" id="main">`
- **Classes**: `container`
- **Data slots**: id="main" for skip-link target

---

### S1: OPORTUNIDAD (L397-L485)

- **Anchor**: `id="oportunidad"`
- **Lines**: 397-485

#### Section Header (L398-L401)
- **Structure**: `div.section-header > [ h2 > span, p ]`
- **Classes**: `section-header`
- **Data slots**: h2 text (span for orange keyword), paragraph text

#### Problem Grid (L402-L419)
- **Structure**: `div.problem-grid > div.problem-card*4`
- **Classes**: `problem-grid`, `problem-card`
- **Each card data slots**: h4 title, p description with `<strong>` cost note
- **Variants**: 4 cards, each with inline `style` overriding border-left-color and h4 color:
  - Card 1: `var(--sofka-orange)` (L403-406)
  - Card 2: `var(--sofka-info)` (L407-409)
  - Card 3: `var(--sofka-violet)` (L411-413)
  - Card 4: `#16A34A` (L415-418)

#### Inline h3 (L421)
- **Tag**: `<h3>` with inline style
- **Data slot**: Subheading text

#### Map Table -- Roles (L422-L432)
- **Structure**: `div[overflow-x:auto] > table.map-table > thead > tr > th*4 + tbody > tr*4`
- **Classes**: `map-table`, `jarvis-name`
- **Columns**: Rol, Reto principal, Jarvis prioritario, Workflow tipico
- **Data slots**: 4 rows x 4 columns (16 cells); `jarvis-name` class on Jarvis column
- **Dependencies**: References Jarvis names (LaReu, LaVuelta, ElRepo, LaForja, LaInfo)

#### Guardrail Grid (L434-L458)
- **Structure**: `div.guardrail-grid > [ div.guardrail-col.si, div.guardrail-col.no ]`
- **Classes**: `guardrail-grid`, `guardrail-col`, `si`, `no`
- **Each column**: h4 + ul > li*6
- **Data slots**: h4 title, 6 list items per column (12 total)

#### Callout -- Supuestos (L460-L468)
- **Structure**: `div.callout.callout-warning > [ strong, ul > li*4 ]`
- **Classes**: `callout`, `callout-warning`
- **Data slots**: Title (strong), 4 list items

#### Inline h3 -- Capacidad (L470)
- **Tag**: `<h3>` with inline style

#### Decision Table -- Capacidad (L471-L479)
- **Structure**: `div[overflow-x:auto] > table.decision-table > thead + tbody > tr*2`
- **Classes**: `decision-table`
- **Columns**: Periodo, Horas/semana, Desglose, Implicacion
- **Data slots**: 2 rows x 4 columns (8 cells)

#### Callout -- Ritmo (L481-L484)
- **Structure**: `div.callout.callout-orange > [ strong, p ]`
- **Classes**: `callout`, `callout-orange`
- **Data slots**: Title, paragraph

---

### Section Divider (L487)
- **Tag**: `<hr class="section-divider">`
- **Classes**: `section-divider`
- **Instances**: 7 total (L487, L575, L668, L733, L765, L810, L854)

---

### S2: CICLO (L490-L573)

- **Anchor**: `id="ciclo"`
- **Lines**: 490-573

#### Section Header (L491-L494)
- **Structure**: `div.section-header > [ h2 > span, p ]`
- **Data slots**: Title, subtitle

#### Cycle Visual (L495-L530)
- **Structure**: `div.cycle-visual > [ (div.cycle-step, div.cycle-arrow)*5 ]` (5 steps, 4 arrows)
- **Classes**: `cycle-visual`, `cycle-step`, `cycle-arrow`, `step-num`, `step-label`, `step-jarvis`, `step-artifact`
- **Each step data slots**: step number, label text, jarvis name, artifact description
- **5 steps**:
  - Step 1 (L496-L501): "Hablar mejor con IA" / "Jarvis LaForja"
  - Step 2 (L503-L508): "Preparar + Evaluar" / "Jarvis LaReu"
  - Step 3 (L510-L515): "Capitalizar" / "Jarvis LaVuelta"
  - Step 4 (L517-L522): "Reportar" / "Jarvis ElRepo"
  - Step 5 (L524-L529): "Visibilizar" / "Jarvis LaInfo"

#### Map Table -- Jarvis Entregables (L532-L544)
- **Structure**: `table.map-table > thead > tr > th*4 + tbody > tr*5`
- **Classes**: `map-table`, `jarvis-name`
- **Columns**: Jarvis, Artefacto, Que resuelve, Frecuencia
- **Data slots**: 5 rows x 4 columns (20 cells)

#### Gem Bar (L546-L553)
- **Structure**: `div.gem-bar > [ div.gem-bar-title, a.gem-link*5 ]`
- **Classes**: `gem-bar`, `gem-bar-title`, `gem-link`
- **Data slots**: Title text, 5 links (text + href each with Gemini URL)
- **External links**: 5 Gemini gem URLs

#### Inline h3 -- Entregables (L555)
- **Tag**: `<h3>` with inline style

#### Decision Table -- Entregables (L556-L567)
- **Structure**: `table.decision-table > thead > tr > th*5 + tbody > tr*5`
- **Columns**: #, Entregable, Alcance, Frecuencia, Jarvis que lo produce
- **Data slots**: 5 rows x 5 columns (25 cells)

#### Callout -- Etiquetas Jira (L569-L572)
- **Structure**: `div.callout.callout-info > [ strong, p > code*8 ]`
- **Classes**: `callout`, `callout-info`
- **Data slots**: Title, 8 Jira tag names in `<code>` elements

---

### S3: JARVIS Fichas (L578-L666)

- **Anchor**: `id="jarvis"`
- **Lines**: 578-666

#### Section Header (L579-L582)
- **Structure**: `div.section-header > [ h2 > span, p ]`

#### Jarvis Cards Container (L583-L665)
- **Structure**: `div.jarvis-cards > div.jarvis-card*5`
- **Classes**: `jarvis-cards`, `jarvis-card`, `jarvis-card-header`, `jarvis-card-body`, `jarvis-icon`, `jf`, `jf-label`, `jf-value`, `jf-prompt`, `jf-antiuse`, `gem-link`

**Each jarvis-card structure**:
```
div.jarvis-card
  div.jarvis-card-header
    div.jarvis-icon.{variant}  (2-char abbreviation)
    h3
      text (name)
      small (subtitle)
  div.jarvis-card-body
    p (description)
    div.jf (Artefacto principal)
      div.jf-label
      div.jf-value
    div.jf (Cuando usarlo)
      div.jf-label
      div.jf-value
    div.jf (Ejemplo de prompt)
      div.jf-label
      div.jf-prompt
    div.jf (Conexion VR-AID)
      div.jf-label
      div.jf-value
    div.jf-antiuse
      strong + text
    a.gem-link (Gemini URL)
```

**5 card variants (icon modifier class)**:

| # | Lines | Icon class | Abbrev | Name | Subtitle |
|---|-------|-----------|--------|------|----------|
| 1 | 585-599 | `.laforja` | LF | Jarvis LaForja | Generador de Prompts -- El Habilitador |
| 2 | 601-615 | `.lareu` | LR | Jarvis LaReu | Analista Forense de Reuniones |
| 3 | 617-631 | `.lavuelta` | LV | Jarvis LaVuelta | Multiplicador de Claridad Operativa |
| 4 | 633-647 | `.elrepo` | ER | Jarvis ElRepo | Asistente de Reporting con Evidencia |
| 5 | 649-663 | `.lainfo` | LI | Jarvis LaInfo | Arquitecto de Infografias HTML |

**Data slots per card (7)**: icon abbreviation, name, subtitle, description paragraph, 4 jf blocks (label+value each), antiuse text, gem-link href+text

---

### S4: ADOPCION (L671-L731)

- **Anchor**: `id="adopcion"`
- **Lines**: 671-731

#### Section Header (L672-L675)

#### Timeline (L676-L717)
- **Structure**: `div.timeline > div.timeline-item*4`
- **Classes**: `timeline`, `timeline-item`, `timeline-dot`, `timeline-content`, `wk`, `week-obj`, `jtags`, `jtag`, `t-laforja`, `t-lavuelta`, `t-elrepo`, `t-lareu`, `t-lainfo`, `tl-deliverable`, `gate-box`

**Each timeline-item structure**:
```
div.timeline-item
  div.timeline-dot (number)
  div.timeline-content
    h3 > span.wk + text
    p.week-obj
    div.jtags > span.jtag.t-{variant}*N
    div.tl-deliverable > strong + text
    div.gate-box (gate criteria text)
```

**4 timeline items**:

| # | Lines | Week | Jarvis tags | Gate |
|---|-------|------|-------------|------|
| 1 | 677-686 | Semana 1 | t-laforja, t-lavuelta, t-elrepo (3) | GATE S1 |
| 2 | 687-695 | Semana 2 | t-laforja, t-lavuelta, t-elrepo (3) | GATE S2 |
| 3 | 697-705 | Semana 3 | t-laforja, t-lareu, t-lavuelta, t-elrepo, t-lainfo (5) | GATE S3 |
| 4 | 707-716 | Semana 4 | t-laforja, t-lareu, t-lavuelta, t-elrepo, t-lainfo (5) | GATE S4 |

**Data slots per item (5)**: week label, title text, objective paragraph, deliverable text, gate criteria text
**Jtag variants**: 5 (`t-laforja`, `t-lareu`, `t-lavuelta`, `t-elrepo`, `t-lainfo`)

#### Callouts -- Caso borde x3 (L719-L730)
- **Structure**: 3x `div.callout.callout-orange > [ strong, p ]`
- **Lines**: L719-L722, L723-L726, L727-L730
- **Data slots**: 3 titles + 3 paragraphs

---

### S5: DECISION RAPIDA (L736-L763)

- **Anchor**: `id="decision"`
- **Lines**: 736-763

#### Section Header (L737-L740)

#### Decision Table (L741-L755)
- **Structure**: `table.decision-table > thead > tr > th*5 + tbody > tr*8`
- **Columns**: Situacion, Jarvis, Input minimo, Output esperado, Tiempo
- **Data slots**: 8 rows x 5 columns (40 cells)
- **Inline styles**: Jarvis column has per-row color + font-weight:700

#### Metrics Row (L757-L762)
- **Structure**: `div.metrics-row > div.metric-card*4`
- **Classes**: `metrics-row`, `metric-card`, `mv`, `ml`
- **Each card**: `div.mv` (value) + `div.ml` (label)
- **4 metrics**:
  - "-50%" / "Tiempo en OKRs (benchmark inicial)"
  - "100%" / "Semanas con semaforo de valor (meta)"
  - "16 h/sem" / "Inversion S1-S3 (20h S4)"
  - "<48h" / "Regla de escalamiento VR-AID"

---

### S6: SEMAFORO + VR-AID (L768-L808)

- **Anchor**: `id="semaforo"`
- **Lines**: 768-808

#### Section Header (L769-L772)

#### Semaforo Grid (L773-L778)
- **Structure**: `div.semaforo-grid > div.semaforo-card*4`
- **Classes**: `semaforo-grid`, `semaforo-card`, `verde`, `blanco`, `amarillo`, `rojo`
- **Each card**: `h4` + `p`
- **4 variants**:

| Line | Modifier | Color meaning |
|------|----------|---------------|
| 774 | `.verde` | Green -- visible value |
| 775 | `.blanco` | White -- enabling value |
| 776 | `.amarillo` | Yellow -- 1 week no value |
| 777 | `.rojo` | Red -- 2+ weeks no value |

#### VR-AID Box (L779-L789)
- **Structure**: `div.vraid-box > [ h3, div.vraid-letters > div.vraid-letter*5, p.vraid-note ]`
- **Classes**: `vraid-box`, `vraid-letters`, `vraid-letter`, `letter`, `meaning`, `feeds`, `vraid-note`
- **5 letters (V, R, A, I, D)**:

| Line | Letter | Meaning | Feeds |
|------|--------|---------|-------|
| 782 | V | Valor entregado o habilitado | ElRepo + LaVuelta |
| 783 | R | Riesgos al valor | LaVuelta + LaReu |
| 784 | A | Assumptions / Supuestos a validar | LaVuelta + ElRepo |
| 785 | I | Issues / Incidentes activos | LaReu + LaVuelta |
| 786 | D | Dependencies fuera del equipo | LaReu + ElRepo |

- **Data slots per letter (3)**: letter char, meaning text, feeds text

#### Inline h3 -- Plantilla (L791)

#### Decision Table -- Plantilla VR-AID (L792-L805)
- **Structure**: `table.decision-table > thead > tr > th*3 + tbody > tr*6`
- **Columns**: Campo, Contenido, Ejemplo
- **Data slots**: 6 rows x 3 columns (18 cells)
- **Fields**: ID, V, R, A, I, D, Decision

---

### S7: AGRADECIMIENTO (L813-L852)

- **Anchor**: `id="agradecimiento"`
- **Lines**: 813-852

#### Section Header (L814-L817)

#### Case Highlight (L819-L828)
- **Structure**: `div.case-highlight > [ div.case-metric > (div.big + div.unit), div.case-detail > (h4 + p) ]`
- **Classes**: `case-highlight`, `case-metric`, `big`, `unit`, `case-detail`
- **Data slots**: Metric value (inline style override font-size), unit text, detail h4, detail paragraph

#### Testimonial Grid (L830-L846)
- **Structure**: `div.testimonial-grid > div.testimonial*3`
- **Classes**: `testimonial-grid`, `testimonial`, `testimonial-quote`, `testimonial-author`, `testimonial-role`
- **Each testimonial**: quote div + author div + role div
- **3 testimonials**:
  - L831-L835: Equipo DeUna (inline style: font-style:normal)
  - L836-L840: Andres Felipe Sanchez Garcia
  - L841-L845: Ivan Dario Rojas Gallego
- **Data slots per testimonial (3)**: quote text (may contain `<strong>`), author text, role text

#### Callout -- Soporte (L848-L851)
- **Structure**: `div.callout.callout-orange > [ strong, p ]`

---

### S8: CIERRE (L857-L884)

- **Anchor**: `id="cierre"`
- **Lines**: 857-884

#### Section Header (L858-L861)

#### Decision Table -- Acciones dia 1 (L862-L873)
- **Structure**: `table.decision-table > thead > tr > th*5 + tbody > tr*5`
- **Columns**: #, Accion, Responsable, Herramienta, Evidencia
- **Data slots**: 5 rows x 5 columns (25 cells)
- **Contains**: `<a>` links to Gemini gems inside Herramienta column (rows 1, 5)

#### Inline h3 -- Criterios (L875)

#### Inline p (L876)

#### Acceptance List (L877-L883)
- **Structure**: `ol.acceptance-list > li*5`
- **Classes**: `acceptance-list`
- **CSS counter**: auto-prefixes "CA-1" through "CA-5"
- **Data slots**: 5 acceptance criteria text items

---

### Closing main (L886)
- `</main>`

---

### FOOTER Component (L889-L901)

- **Tag structure**: `footer.site-footer > div.footer-inner > [ div.footer-row > (div.footer-logo + div.footer-badges > span.footer-badge*3), div.footer-bottom ]`
- **Lines**: 889-901
- **Classes**: `site-footer`, `footer-inner`, `footer-row`, `footer-logo`, `footer-badges`, `footer-badge`, `footer-bottom`

| Line | Element | Class | Data slot |
|------|---------|-------|-----------|
| 889 | `<footer>` | `site-footer` | -- |
| 890 | `<div>` | `footer-inner` | -- |
| 891 | `<div>` | `footer-row` | -- |
| 892 | `<div>` | `footer-logo` | Logo text ("Sofka Technologies") |
| 894 | `<span>` | `footer-badge` | Badge #1 text ("Playbook Corporativo v1.0") |
| 895 | `<span>` | `footer-badge` | Badge #2 text ("Sofka Technologies") |
| 896 | `<span>` | `footer-badge` | Badge #3 text ("5 Jarvis") |
| 899 | `<div>` | `footer-bottom` | Copyright text with year |

---

## 5. Complete Section Anchors

| # | id | Label in nav | Line |
|---|-----|-------------|------|
| 1 | `main` | (skip-link target) | 394 |
| 2 | `oportunidad` | Oportunidad | 397 |
| 3 | `ciclo` | Ciclo | 490 |
| 4 | `jarvis` | Jarvis | 578 |
| 5 | `adopcion` | Adopcion | 671 |
| 6 | `decision` | Decision | 736 |
| 7 | `semaforo` | VR-AID | 768 |
| 8 | `agradecimiento` | Equipo | 813 |
| 9 | `cierre` | Dia 1 | 857 |

---

## 6. Complete Unique CSS Class List (117 classes)

### Layout/structural
`container`, `section-header`, `section-divider`, `skip-link`

### NAV
`toc`, `toc-inner`, `toc-logo`

### Hero
`hero`, `hero-inner`, `hero-logo`, `hero-badges`, `hero-badge`, `hero-sub`, `hero-kpis`, `hero-kpi`, `hero-kpi-icon`, `hero-kpi-value`, `hero-kpi-label`

### Problem
`problem-grid`, `problem-card`

### Antipatron
`antipatron`, `antipatron-col`, `antipatron-arrow`, `bad`, `good`

### Cycle
`cycle-visual`, `cycle-step`, `cycle-arrow`, `step-num`, `step-label`, `step-jarvis`, `step-artifact`

### Map Table
`map-table`, `jarvis-name`

### Jarvis Cards
`jarvis-cards`, `jarvis-card`, `jarvis-card-header`, `jarvis-card-body`, `jarvis-icon`, `lareu`, `lavuelta`, `elrepo`, `lainfo`, `laforja`

### Jarvis Fields
`jf`, `jf-label`, `jf-value`, `jf-prompt`, `jf-antiuse`

### Timeline
`timeline`, `timeline-item`, `timeline-dot`, `timeline-content`, `wk`, `week-obj`

### Jarvis Tags
`jtags`, `jtag`, `t-lareu`, `t-lavuelta`, `t-elrepo`, `t-lainfo`, `t-laforja`

### Timeline extras
`tl-deliverable`, `gate-box`

### Compare
`compare-grid`, `compare-col`, `before`, `after`

### Metrics
`metrics-row`, `metric-card`, `mv`, `ml`

### Semaforo
`semaforo-grid`, `semaforo-card`, `verde`, `blanco`, `amarillo`, `rojo`

### VR-AID
`vraid-box`, `vraid-letters`, `vraid-letter`, `letter`, `meaning`, `feeds`, `vraid-note`

### Gem
`gem-link`, `gem-bar`, `gem-bar-title`

### Callouts
`callout`, `callout-warning`, `callout-info`, `callout-orange`

### Decision Table
`decision-table`

### Guardrail
`guardrail-grid`, `guardrail-col`, `si`, `no`

### Acceptance
`acceptance-list`

### Testimonials
`testimonial-grid`, `testimonial`, `testimonial-quote`, `testimonial-author`, `testimonial-role`

### Case
`case-highlight`, `case-metric`, `big`, `unit`, `case-detail`

### Recommendations
`recommendations`, `rec-card`

### Footer
`site-footer`, `footer-inner`, `footer-row`, `footer-logo`, `footer-badges`, `footer-badge`, `footer-bottom`

---

## 7. Unique Component Types (22)

| # | Component | Primary class | Instances |
|---|-----------|--------------|-----------|
| 1 | Skip Link | `skip-link` | 1 |
| 2 | Nav TOC | `toc` | 1 |
| 3 | Hero | `hero` | 1 |
| 4 | Section Header | `section-header` | 8 |
| 5 | Section Divider | `section-divider` | 7 |
| 6 | Problem Card | `problem-card` | 4 |
| 7 | Antipatron | `antipatron` | 0 (defined in CSS, not used in HTML) |
| 8 | Cycle Visual | `cycle-visual` | 1 |
| 9 | Map Table | `map-table` | 2 |
| 10 | Decision Table | `decision-table` | 5 |
| 11 | Jarvis Card | `jarvis-card` | 5 |
| 12 | Timeline | `timeline` | 1 (4 items) |
| 13 | Guardrail Grid | `guardrail-grid` | 1 |
| 14 | Gate Box | `gate-box` | 4 |
| 15 | Callout | `callout` | 7 |
| 16 | Gem Bar | `gem-bar` | 1 |
| 17 | Gem Link | `gem-link` | 10 |
| 18 | Semaforo Card | `semaforo-card` | 4 |
| 19 | VR-AID Box | `vraid-box` | 1 |
| 20 | Metrics Row | `metrics-row` | 1 (4 cards) |
| 21 | Testimonial | `testimonial` | 3 |
| 22 | Case Highlight | `case-highlight` | 1 |
| 23 | Acceptance List | `acceptance-list` | 1 (5 items) |
| 24 | Footer | `site-footer` | 1 |

---

## 8. External Dependencies

| Resource | URL | Type |
|----------|-----|------|
| Google Fonts - Inter | `https://fonts.googleapis.com/css2?family=Inter...` | Font |
| Fontshare - Clash Grotesk | `https://api.fontshare.com/v2/css?f[]=clash-grotesk...` | Font |
| Gemini Gem - LaForja | `https://gemini.google.com/gem/1n0GlVXpCmItHWLBM2e17ChV7ceFW6Teq` | External link |
| Gemini Gem - LaReu | `https://gemini.google.com/gem/1dxbSKPGyDZR1iPtjDReRThZS86gEPmqB` | External link |
| Gemini Gem - LaVuelta | `https://gemini.google.com/gem/1uXB-whRTHB1OcaLo7yLA0rVeKVyY3kbp` | External link |
| Gemini Gem - ElRepo | `https://gemini.google.com/gem/1ZK3CMeM7Yw-cNgzJeRsV2BRDyXNV_81S` | External link |
| Gemini Gem - LaInfo | `https://gemini.google.com/gem/1YwjJ7X72zAaVHfSrycpEbW2u3xr1z39a` | External link |

Each Gemini gem link appears twice: once in `gem-bar` (S2) and once per jarvis-card (S3). Total external link instances: 10 gem-links + 2 in S8 action table = 12.

---

## 9. CSS-Only Components (defined but not used in HTML body)

| Class | CSS Line | Note |
|-------|----------|------|
| `.antipatron` | 107 | Full antipatron grid -- not instantiated in HTML |
| `.antipatron-col` / `.bad` / `.good` | 108-117 | Not instantiated |
| `.antipatron-arrow` | 118 | Not instantiated |
| `.compare-grid` / `.compare-col` / `.before` / `.after` | 181-191 | Not instantiated |
| `.recommendations` / `.rec-card` | 283-286 | Not instantiated |

These CSS components are available as templates but have no HTML instances in this file.

---

*End of inventory.*
