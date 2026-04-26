# PAGINATED-SPEC v1.0 — Entrusted Standard for Paginated Documents

> Fuente de verdad para el modo `paginated` de playbook-forge. Aplica a documentos
> print-first A4 (NO SPA): propuestas, preguntas, previews, respuestas, anexos.
> Un documento que falle CUALQUIER gate P0-P3 esta BLOQUEADO de entrega.

---

## 1. Estructura Mandatoria

### 1.1 Document Shell

| Requisito | Detalle |
|-----------|---------|
| DOCTYPE | `<!DOCTYPE html>` |
| html lang | `<html lang="es">` (o `"en"`) |
| body class | `class="lang-es"` solo si bilingue, sino sin clase |
| charset | `<meta charset="UTF-8">` |
| viewport | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |
| Fonts | Brand-specific (MetodologIA: Poppins+Montserrat, Sofka: Clash Grotesk+Inter) |
| CSS | `<style>` inline con @page + .page + page-break + brand tokens |
| Body content | SOLO `<section class="page">` divs (sin wrapper, sin overflow) |
| Scripts | **0 `<script>` tags** (paginated es print-first) |
| onclick | **0 onclick handlers** (anchors only) |

### 1.2 Page Anatomy (cada `.page` = A4 = 210mm x 297mm)

```html
<section id="page-{slug}" class="page [dark]">
  <div class="page-header">
    <div class="brand-lockup">...</div>
    <span class="page-meta">DOC-ID-VERSION</span>
  </div>
  <!-- Content body (flex column) -->
  <div class="page-footer">
    <span>MetodologIA · DOC-ID</span>
    <span>Page X / Total</span>
  </div>
</section>
```

- `.page` con `width: 210mm`, `min-height: 297mm`, `page-break-after: always`
- `.page.dark` variante para cover (navy bg, white text)
- `.page-header` con border-bottom 1px
- `.page-footer` con border-top 1px, justified flex

### 1.3 Print CSS Requirements

```css
@page {
  size: A4;
  margin: 0;
}

.page {
  width: 210mm;
  min-height: 297mm;
  page-break-after: always;
}

.page:last-child {
  page-break-after: auto;
}

@media print {
  .page { margin: 0; box-shadow: none; }
  h1, h2, h3 { page-break-after: avoid; break-after: avoid; }
  .minto-block, .funnel-authority, .stairway, .stamp-box, .callout {
    page-break-inside: avoid; break-inside: avoid;
  }
  .funnel-stage, .stair-step, .xref-strip {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

---

## 2. Format Page Targets

| Format | ID | Pages | Story arc |
|--------|-----|-------|-----------|
| **Ask** | `ask` | **4** | cover + N preguntas (2-3 pages) + cta |
| **Preview** | `preview` | **7** | cover + ATOC opcional + 4-5 content + cta |
| **QA Response** | `qa` | **10** | cover + tldr + 5-6 thematic blocks + disclaimer + contacto |
| **Proposal** | `proposal` | **30-42** | cover + ATOC + ejecutivo + contexto + N opciones + pricing + ROI + annex summary + CTA |
| **Annex** | `annex` | **101** | cover + ATOC + technical sections + extended FAQs + appendices + legal |

---

## 3. Quality Gates (P0-P3 BLOCKING + P4 SOFT)

### Gate P0: Estructura (BLOQUEANTE)

| Check | Validacion | Required |
|-------|-----------|----------|
| **P0.1** | @page rule presente en `<style>` | Yes |
| **P0.2** | `.page` class definida con `width:210mm` y `page-break-after` | Yes |
| **P0.3** | Body contiene SOLO `.page` sections (no wrappers extra) | Yes |
| **P0.4** | 0 `<script>` tags | Yes |
| **P0.5** | 0 `modal-overlay` elements | Yes |
| **P0.6** | Page count matches target (±1 vs format spec) | Yes |
| **P0.7** | DOCTYPE html, html[lang], head, body presentes | Yes |

### Gate P1: Content Mandatorio (BLOQUEANTE)

| Check | Validacion | Required |
|-------|-----------|----------|
| **P1.1** | Cover page existe (.page.dark o id="page-cover") | Yes |
| **P1.2** | Si pages>10, ATOC (table of contents) presente | Yes |
| **P1.3** | Footer en cada page (page-footer class) | Yes |
| **P1.4** | Brand lockup en page-header | Yes |
| **P1.5** | CTA o page-final en ultima page | Yes |

### Gate P2: Print CSS (BLOQUEANTE)

| Check | Validacion | Required |
|-------|-----------|----------|
| **P2.1** | `page-break-after:always` on .page | Yes |
| **P2.2** | `page-break-inside:avoid` on h1/h2/h3 + key blocks | Yes |
| **P2.3** | `print-color-adjust:exact` on color-sensitive elements | Yes |
| **P2.4** | `@media print` rule presente | Yes |
| **P2.5** | `@page { size: A4 }` rule | Yes |

### Gate P3: Brand Compliance (BLOQUEANTE)

| Check | Validacion | Required |
|-------|-----------|----------|
| **P3.1** | Brand tokens (CSS custom properties) presentes en :root | Yes |
| **P3.2** | 0 colores hardcoded en body (solo via `var(--token)`) | Yes |
| **P3.3** | Logo renderizado (SVG inline o `<img>`) | Yes |
| **P3.4** | Brand name presente en page-header y page-footer | Yes |

### Gate P4: Bilingue (SOFT)

| Check | Validacion | Required |
|-------|-----------|----------|
| **P4.1** | Si bilingual=true, span.es count ≈ span.en count (±5) | Soft |
| **P4.2** | Si bilingual=true, lang toggle presente (con script unico permitido) | Soft |
| **P4.3** | Cross-doc xref-strips funcionales (si multi-doc) | Soft |

---

## 4. Authority Patterns (referencia rapida)

Ver `AUTHORITY-PATTERNS.md` para el catalogo completo de 10 patterns:

1. **Minto Block** — Executive summary con claim + 3 supports
2. **Funnel Authority** — 4-tier inverted funnel (storytelling)
3. **Bridge** — Question→Answer o Before→After (3-col grid)
4. **Stairway** — 4-step progressive heights
5. **Stamp Box** — Rotated circular accent (price/seal)
6. **GO-Signal** — Traffic lights (go/caution/no-go)
7. **ATOC** — Auto-numbered table of contents
8. **XREF Strip** — Cross-document chip navigation
9. **Callout Box** — Context/warning con kicker
10. **Pricing Table** — Structured pricing rows + total

---

## 5. Diferencias vs Modo SPA

| Aspecto | SPA mode (modo eco/forensic/elrepo) | Paginated mode (modo NEW) |
|---------|-------------------------------------|--------------------------|
| Architecture | Single-page con modales JS | Multi-page A4 print-first |
| Page concept | Scroll continuo + modales | `.page` divs explicitos |
| JavaScript | toggleLang, openModal, copyPrompt | 0 JS (excepto opcional lang toggle) |
| CSS | display/flex, no print rules | @page, page-break-*, print-color-adjust |
| Output | Browser-first (responsive) | PDF-first (A4 fixed) |
| Use case | Adopcion progresiva, training | Propuestas, preguntas, previews, anexos |
| Verification | 38 SPA gates | 20 paginated gates (P0-P4) |

---

## 6. Pipeline Paginated

```
INTAKE (--format=paginated --use-case=ask|preview|qa|proposal|annex --brand=metodologia)
  ↓
INGEST (opcional: brief, RFP, preguntas del cliente)
  ↓
CLARIFY (5-8 preguntas use-case-specific)
  ↓
COMPOSE (compose-manifest-paginated.js)
  ↓ Lee brand-tokens-{slug}.json + page-templates + format-template
  ↓ Compone manifest con N pages marcadas {generate: true} en huecos
ENRICH (content-strategist llena solo huecos)
  ↓
ASSEMBLE (assemble-paginated.js)
  ↓ Genera <section class="page"> A4 (no SPA scrolling)
  ↓ Inyecta @page rules, page-break, print-color-adjust
ROBUSTIFY (--mode=paginated)
  ↓ Skip transforms SPA (T11, T13, T14)
  ↓ Run T15-T17: page count, footer numbers, page-break consistency
VERIFY (verify-spec.js --format=paginated)
  ↓ 20 gates P0-P3 blocking + P4 soft
DELIVER → PDF-ready HTML
```

---

## 7. Formato de Naming

| Convencion | Ejemplo |
|-----------|---------|
| **File name** | `{client}_{format}_{slug}_v{version}.html` |
| **Section IDs** | `page-{slug}` (lowercase, hyphenated) |
| **Section ID examples** | `page-cover`, `page-toc`, `page-resumen`, `page-cta` |
| **Document ID en footer** | `MTIA-{CLIENT}-{TYPE}-{VERSION}` |
