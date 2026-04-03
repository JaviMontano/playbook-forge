# V3 Delta Analysis: playbook_bu2_agile_pm_excellence

> **Compared files:**
> - V2: `playbook_bu2_agile_pm_excellence_v2.html` (485KB, 2562 lines, 60 modals)
> - V3: `playbook_bu2_agile_pm_excellence_v3 (4).html` (555KB, 2820 lines, 69 modals)
> - **Net delta:** +70KB, +258 lines, +9 modals

---

## 1. CSS TOKEN RENAMES

### 1.1 Custom Property Renames (`:root` block)

| V2 Token | V3 Token | Value (unchanged) |
|-----------|-----------|-------------------|
| `--sofka-green` | `--sofka-accent-a` | `#D97706` |
| `--sofka-teal` | `--sofka-accent-b` | `#CC6506` |
| `--sofka-violet` | `--sofka-accent-c` | `#D97706` |

**Important:** The old tokens `--sofka-green`, `--sofka-teal`, `--sofka-violet` do NOT exist in v3 at all. Every reference has been replaced.

### 1.2 Token Usage in CSS Rules

All CSS rules that referenced the old tokens were updated:

| CSS Selector | Property | V2 Token | V3 Token |
|---|---|---|---|
| `.antipatrón-col.good` | `border-top` | `var(--sofka-green)` | `var(--sofka-accent-a)` |
| `.jarvis-icon.lainfo` | `color` | `var(--sofka-violet)` | `var(--sofka-accent-c)` |
| `.timeline::before` | `background` gradient | `var(--sofka-green), var(--sofka-violet)` | `var(--sofka-accent-a), var(--sofka-accent-c)` |
| `.timeline-item:nth-child(4) .timeline-dot` | `background` | `var(--sofka-violet)` | `var(--sofka-accent-c)` |
| `.jtag.t-lainfo` | `color` | `var(--sofka-violet)` | `var(--sofka-accent-c)` |
| `.semáforo-card.verde` | `border-left-color` | `var(--sofka-green)` | `var(--sofka-accent-a)` |
| `.guardrail-col.si` | `border-top` | `var(--sofka-green)` | `var(--sofka-accent-a)` |

### 1.3 Token Usage in Inline Styles (HTML)

All inline `style=` attributes referencing old tokens were also renamed:
- `var(--sofka-violet)` -> `var(--sofka-accent-c)` (e.g., flow table row #4, LaInfo references, VR-AID D dimension)
- `var(--sofka-teal)` -> `var(--sofka-accent-b)` (e.g., NotebookLM glossary card)
- `var(--sofka-green)` -> `var(--sofka-accent-a)` (e.g., "Mes 3" timeline card in empezar section)

**Total occurrences:**
- V2: 17 references to old tokens (green/teal/violet)
- V3: 19 references to new tokens (accent-a/b/c) -- net +2 from new content

---

## 2. NEW CSS CLASSES

### 2.1 Added in V3

| Class | Line | Purpose |
|-------|------|---------|
| `.clickable-row` | 126 | `cursor: pointer;` -- extracted from inline styles on table rows |

### 2.2 Removed from V3

| Class | Line (V2) | Purpose |
|-------|-----------|---------|
| `.cycle-step .step-jarvis` | 126 | `font-size: .75rem; color: var(--sofka-orange); font-weight: 700;` -- removed, not used in v3 HTML |

**Note:** The `.step-jarvis` class was present in v2 CSS (line 126) but NOT in v3. V3 replaces line 126 with `.clickable-row`.

---

## 3. CSS RESPONSIVE CHANGES

### 3.1 `@media (max-width: 480px)` -- Line 331

| Property | V2 | V3 |
|----------|-----|-----|
| `.hero-kpis` grid | `1fr 1fr` | `1fr` (single column) |

This change makes the hero KPIs stack to a single column on mobile, reflecting the addition of a 6th KPI.

### 3.2 No Changes To

- `@media (max-width: 768px)` -- identical
- `@media print` -- identical
- `@media (prefers-reduced-motion)` -- identical

---

## 4. NO CHANGES TO

The following CSS sections are **byte-identical** between v2 and v3:

- All font imports (Google Fonts, Fontshare)
- All shadow tokens
- All radius tokens
- NAV rules
- HERO rules
- MAIN rules
- PROBLEM CARDS rules
- ANTI-PATRON rules (except token rename)
- CYCLE rules (except `.step-jarvis` removal)
- MAP TABLE rules
- JARVIS CARDS rules (except token rename)
- TIMELINE rules (except token rename)
- COMPARE rules
- METRICS ROW rules
- VR-AID BOX rules
- GEM LINKS rules
- CALLOUTS rules
- DECISION MATRIX rules
- GUARDRAIL rules (except token rename)
- GATE rules
- ANTI-USE rules
- ACCEPTANCE rules
- TESTIMONIALS rules
- FOOTER rules
- MICRO-INTERACTIONS rules
- MODAL rules
- BILINGUAL TOGGLE rules
- AGILE PM EQUATION rules

---

## 5. STRUCTURAL CHANGES

### 5.1 Section IDs -- IDENTICAL

Both v2 and v3 have the same 13 section IDs in the same order:

```
glosario, agile-pm, flujos, katas, nucleo, investigacion, infra, avanzado, antipatrones, ritmo, empezar, cierre, main
```

### 5.2 Nav Items -- IDENTICAL

Same 12 nav links + language toggle button. No new nav items added.

---

## 6. NEW MODALS (9 added, 0 removed)

V2: 60 modals. V3: 69 modals.

### 6.1 New Glossary Modals (2)

| Modal ID | Category | Content |
|----------|----------|---------|
| `modal-fg-accountability` | Glossary term | **Accountability Cascade** -- new concept: every output needs owner + date + success criteria. Links to anti-patterns AP-11, AP-12, AP-13. |
| `modal-fg-shuhari` | Glossary term | **Shu-Ha-Ri** -- Japanese mastery model. Three stages: follow the form, break the form, transcend the form. Links to katas and Flow 13. |

### 6.2 New Metric Modals (4)

| Modal ID | Category | Content |
|----------|----------|---------|
| `modal-fm-tiempo` | Metric detail | **-50% Operational Time** -- flow-by-flow breakdown (F1-F4): prep -33%, decisions -94%, report -50%, infographic -63%. Net ~1.75h/week recovered. |
| `modal-fm-precision` | Metric detail | **100% Verifiable Outputs** -- 3 pillars: Quad-Doc 4/4, VR-AID 5/5, NotebookLM anti-hallucination. |
| `modal-fm-entregables` | Metric detail | **3/3 Deliverables Assured** -- accountability triad: named owner, committed date, success criteria. Links to AP-11/12/13. |
| `modal-fm-okr` | Metric detail | **-50% Quarterly OKR Improvement** -- compound effect of 13 flows over 8 weeks. DeUna pilot reference with Andres Felipe Sanchez Garcia. |

### 6.3 New Role Variant Modals (3)

| Modal ID | Category | Content |
|----------|----------|---------|
| `modal-frv-process` | Role variant | **Process Lead** -- area governance, knowledge that survives rotation. Core: F2-F3, Extended: F4, F7-F10. |
| `modal-frv-futuro` | Role variant | **El Futuro Lider / The Future Leader** -- not yet leading projects. Core: F1-F2, Extended: F7-F8, F9. |
| `modal-frv-autonomo` | Role variant | **El Piloto Autonomo / The Self-Pilot** -- personal excellence. Core: F2, F9, Extended: F7-F8, F11, F13. |

---

## 7. NEW GLOSSARY CARDS (2 added in HTML)

Added to the glossary grid (section `#glosario`):

1. **Accountability Cascade** -- `border-left-color:#DC2626` -- explains owner + date + success criteria principle. Opens `modal-fg-accountability`.
2. **Shu-Ha-Ri** -- `border-left-color:#7C3AED` -- three-stage mastery model. Opens `modal-fg-shuhari`.

---

## 8. NEW ROLE VARIANT CARDS (3 added in HTML)

Added to the `#agile-pm` section role variants grid:

1. **Process Lead** -- `border-left-color:#0EA5E9` -- opens `modal-frv-process`
2. **El Futuro Lider** -- `border-left-color:#7C3AED` -- opens `modal-frv-futuro`
3. **El Piloto Autonomo** -- `border-left-color:#10B981` -- opens `modal-frv-autonomo`

---

## 9. HERO KPI CHANGES

### V2 Hero KPIs (5 items):

1. 13 -- AI-Native flows
2. 5 -- Learning katas
3. 5 -- AI Gems (Gemini)
4. **3h/sem** -- "3h / semana (con 3+ reuniones clave). Adaptable: ver variantes por rol."
5. Solo Google -- Google Workspace ecosystem only

### V3 Hero KPIs (6 items):

1. 13 -- AI-Native flows (unchanged)
2. 5 -- Learning katas (unchanged)
3. 5 -- AI Gems (Gemini) (unchanged)
4. **-50%** -- "Tiempo operativo (prep + reporte + infografia)" [NEW content]
5. **~4h/sem** -- "Tiempo recuperado (F1-F4 combinados)" [NEW content, replaces old "3h/sem"]
6. Solo Google -- Google Workspace ecosystem only (unchanged)

**Key change:** KPIs 4 and 5 were completely rewritten. V2 had a single "3h/sem" KPI about time investment. V3 replaces it with two KPIs: the "-50%" efficiency gain and "~4h/sem" time recovered. Also added a 6th KPI slot (money bag icon) for time recovered.

---

## 10. METRIC CARDS CHANGES

The metrics section (inside `#cierre` or adjacent) gained clickable behavior:

### V2 metric cards:
- Static `<div class="metric-card">` -- not clickable, no modals

### V3 metric cards:
- `<div class="metric-card clickable-card" onclick="openModal('m-tiempo')" role="button" tabindex="0">`
- 4 metric cards now open detailed modals (fm-tiempo, fm-precision, fm-entregables, fm-okr)
- Each modal contains a full flow-by-flow breakdown with timeline components

---

## 11. ACCESSIBILITY IMPROVEMENTS (MAJOR)

### 11.1 `role="button"` + `tabindex="0"` Added

- V2: 0 instances of `role="button"` or `tabindex="0"`
- V3: **137** instances of `role="button"`, all paired with `tabindex="0"`

Every clickable card and clickable table row in v3 now has proper ARIA semantics:
- Glossary cards
- Role variant cards
- Flow table rows
- Kata table rows
- Anti-pattern cards
- Decision matrix rows
- Metric cards

### 11.2 `aria-label` on Modal Close Buttons

- V2: 1 instance of `aria-label` (only on the language toggle button)
- V3: **70** instances of `aria-label`

Every modal close button in v3 has `aria-label="Cerrar / Close"` added.

### 11.3 Keyboard Navigation for Clickable Cards

V3 JS adds an Enter/Space handler for `role="button"` elements (see JS section below).

---

## 12. TABLE ROW CHANGES

### V2 pattern:
```html
<tr onclick="openModal('2')" style="cursor:pointer;">
```

### V3 pattern:
```html
<tr role="button" tabindex="0" onclick="openModal('2')" class="clickable-row">
```

**Changes:**
1. Added `role="button"` attribute
2. Added `tabindex="0"` attribute
3. Replaced inline `style="cursor:pointer;"` with class `clickable-row`
4. Inline `cursor:pointer` count dropped from 104 (v2) to 40 (v3) -- the remaining 40 are on non-table elements where inline styles were kept

---

## 13. JAVASCRIPT CHANGES

### V2 Script (Lines 2554-2560) -- Global Functions

```javascript
function toggleLang(){...}
function openModal(id){...}
function closeModal(){...}
document.addEventListener('click', ...); // overlay click
document.addEventListener('keydown', ...); // Escape key
```

### V3 Script (Lines 2798-2817) -- IIFE with Enhancements

```javascript
(function(){
  // NEW: Restore language preference from localStorage
  try{var s=localStorage.getItem('wr-lang');
  if(s==='en'){...}}catch(e){}

  function toggleLang(){
    // CHANGED: Now persists choice to localStorage
    try{localStorage.setItem('wr-lang','en');}catch(e){}
    // ... (or 'es')
  }
  function openModal(id){...} // unchanged logic
  function closeModal(){...} // unchanged logic

  document.addEventListener('click', ...); // unchanged
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape')closeModal();
    // NEW: Enter/Space triggers click on role="button" elements
    if((e.key==='Enter'||e.key===' ')&&e.target.getAttribute('role')==='button'){
      e.preventDefault();
      e.target.click();
    }
  });

  // NEW: Expose functions to global scope from IIFE
  window.toggleLang=toggleLang;
  window.openModal=openModal;
  window.closeModal=closeModal;
})();
```

### Summary of JS Differences:

| Feature | V2 | V3 |
|---------|----|----|
| Scope | Global functions | IIFE with `window.*` exports |
| Language persistence | None | `localStorage` read/write (`wr-lang` key) |
| Keyboard support for cards | None | Enter/Space triggers click on `role="button"` |
| Modal close `aria-label` | Not present | Added to all modals |

---

## 14. CONTENT EXPANSION SUMMARY

### New content blocks in v3:

1. **2 new glossary cards** (Accountability Cascade, Shu-Ha-Ri) with full modal detail
2. **3 new role variant cards** (Process Lead, Future Leader, Self-Pilot) with full modal detail
3. **4 new metric modals** (tiempo, precision, entregables, OKR) -- each contains timeline breakdowns, callouts, and verification criteria
4. **Hero KPI rewrite** -- 5 KPIs became 6 KPIs with new value-oriented messaging

### Changed content:

1. **Hero KPI #4** completely rewritten (time commitment -> efficiency gain)
2. **Hero KPI #5** is new (time recovered metric)
3. **Metric cards** in the cierre section gained clickable behavior and modal targets
4. **All clickable elements** gained ARIA semantics

---

## 15. MIGRATION CHECKLIST FOR PLUGIN UPGRADE

### CSS Token Migration (BREAKING)

- [ ] Replace `--sofka-green` -> `--sofka-accent-a` in `:root`
- [ ] Replace `--sofka-teal` -> `--sofka-accent-b` in `:root`
- [ ] Replace `--sofka-violet` -> `--sofka-accent-c` in `:root`
- [ ] Find/replace all `var(--sofka-green)` -> `var(--sofka-accent-a)` in CSS
- [ ] Find/replace all `var(--sofka-teal)` -> `var(--sofka-accent-b)` in CSS
- [ ] Find/replace all `var(--sofka-violet)` -> `var(--sofka-accent-c)` in CSS
- [ ] Find/replace all `var(--sofka-green)` -> `var(--sofka-accent-a)` in inline styles
- [ ] Find/replace all `var(--sofka-teal)` -> `var(--sofka-accent-b)` in inline styles
- [ ] Find/replace all `var(--sofka-violet)` -> `var(--sofka-accent-c)` in inline styles

### CSS Class Migration

- [ ] Remove `.cycle-step .step-jarvis` rule
- [ ] Add `.clickable-row { cursor: pointer; }` rule
- [ ] Change 480px breakpoint `.hero-kpis` from `1fr 1fr` to `1fr`

### Accessibility Migration

- [ ] Add `role="button" tabindex="0"` to all clickable cards (glossary, role variants, flows, katas, anti-patterns, decision matrix, metrics)
- [ ] Replace inline `style="cursor:pointer"` on table rows with `class="clickable-row"`
- [ ] Add `aria-label="Cerrar / Close"` to all `.modal-close` buttons

### JS Migration

- [ ] Wrap all functions in IIFE
- [ ] Add `localStorage` persistence for language toggle (key: `wr-lang`)
- [ ] Add language restoration on page load
- [ ] Add Enter/Space keyboard handler for `role="button"` elements
- [ ] Export functions via `window.*` assignments

### Content Templates

- [ ] Support 6 hero KPIs (was 5)
- [ ] Support metric cards as clickable (with `onclick` + `role="button"`)
- [ ] Add metric modal template (fm-* pattern)
- [ ] Add glossary modal template for concepts (fg-* pattern) -- 2 new
- [ ] Add role variant modal template (frv-* pattern) -- 3 new
- [ ] Update hero KPI content to value-oriented messaging

---

## 16. FILE STRUCTURE COMPARISON

```
v2 (2562 lines)                    v3 (2820 lines)
---------------------------        ---------------------------
L1-10    Head/meta                 L1-10    Head/meta         (identical)
L11-413  <style> block             L11-413  <style> block     (+1 class, -1 class, 3 token renames, 1 breakpoint change)
L414     <body>                    L414     <body>            (identical)
L415-434 Nav                       L415-434 Nav               (identical)
L436-458 Hero                      L436-459 Hero              (+1 KPI, changed 2 KPIs = +1 line)
L460-493 Glossary cards            L461-496 Glossary cards    (+2 cards = +3 lines)
L494-640 Sections                  L497-656 Sections          (+3 role variant cards, +metric card changes)
L641-2553 Modals                   L657-2797 Modals           (+9 modals = ~240 lines)
L2554-2560 Script                  L2798-2817 Script          (IIFE, localStorage, a11y keyboard)
L2561-2562 Close tags              L2818-2820 Close tags      (identical)
```
