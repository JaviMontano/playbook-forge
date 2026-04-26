# AUTHORITY-PATTERNS v1.0 — Component Library for Paginated Documents

> Catalogo de 10 patrones de autoridad extraidos de MTIA-PROLIPA v4.
> Cada patron es un componente CSS/HTML reutilizable que comunica autoridad
> visual: jerarquia, evidencia, progresion, comparacion.

---

## 1. Minto Block

**Nombre**: Bloque Minto / Minto Block
**Cuando usar**: Executive summary, conclusion principal con soportes
**Formats**: `proposal` (page resumen), `qa` (page tldr), `preview` (intro)

**HTML**:
```html
<div class="minto-block">
  <div class="minto-block-label">MINTO COMPLETO · MetodologIA</div>
  <div class="minto-block-conclusion">
    Claim principal en negrita navy.
  </div>
  <ol class="minto-soportes">
    <li>Soporte 1 con evidencia <span class="minto-pilar-tag">P1</span> <span class="minto-ev-tag">dato</span></li>
    <li>Soporte 2 que refuerza el claim <span class="minto-pilar-tag">P2</span></li>
    <li>Soporte 3 con cita o numero <span class="minto-pilar-tag">P3</span></li>
  </ol>
</div>
```

**CSS classes**: `.minto-block`, `.minto-block-label`, `.minto-block-conclusion`, `.minto-soportes`, `.minto-pilar-tag`, `.minto-ev-tag`

**Visual purpose**: Organiza informacion top-down. La conclusion va primero (3-5 lineas) y luego los pilares de soporte. Patron clasico Barbara Minto. Border-left gold-dark 3px hace evidente la estructura piramidal.

**Ejemplo**: MTIA-PROLIPA-OFERTA page-resumen, MTIA-PROLIPA-RESPUESTA page-tldr

---

## 2. Funnel Authority

**Nombre**: Embudo de autoridad / Funnel Authority
**Cuando usar**: Storytelling progresivo (problema → insight → solucion → CTA)
**Formats**: `preview` (page hero), `proposal` (page hook), `ask` (page contexto)

**HTML**:
```html
<div class="funnel-authority">
  <div class="funnel-stage" data-tier="1">
    <strong>El problema</strong>: descripcion amplia.
  </div>
  <div class="funnel-stage" data-tier="2">
    <strong>El reto especifico</strong>: descripcion focalizada.
  </div>
  <div class="funnel-stage" data-tier="3">
    <strong>La oportunidad</strong>: insight clave.
  </div>
  <div class="funnel-stage" data-tier="4">
    <strong>La accion</strong>: call-to-action concreto.
  </div>
</div>
```

**CSS classes**: `.funnel-authority`, `.funnel-stage[data-tier="1-4"]`

**Visual purpose**: 4 stages en embudo invertido (100% → 85% → 65% → 48% width). Tier 4 con gradient gold de fondo (highlight de la accion). Cada stage tiene `::after` con chevron `▼` para flow visual entre stages. Usa `print-color-adjust:exact`.

**Ejemplo**: MTIA-PROLIPA-PREVIEW page-hero-pricing

---

## 3. Bridge (Pillars)

**Nombre**: Puente / Bridge
**Cuando usar**: Comparacion lado-a-lado: Antes/Despues, Pregunta/Respuesta, Problema/Solucion
**Formats**: `qa` (page bloque-N — Q vs A), `proposal` (page arquitectura — left vs right), `ask` (necesidad vs pregunta)

**HTML**:
```html
<div class="bridge">
  <div class="bridge-pillar left">
    <div class="bridge-label">Pregunta</div>
    <h3>¿Como abordan X?</h3>
    <p>Contexto adicional de la pregunta.</p>
  </div>
  <div class="bridge-span">
    <span class="bridge-span-label">evidencia</span>
  </div>
  <div class="bridge-pillar right">
    <div class="bridge-label">Respuesta</div>
    <h3>Mediante Y, con Z</h3>
    <p>Detalle con <span class="evbadge sup">sup</span> evidencia documentada.</p>
  </div>
</div>
```

**CSS classes**: `.bridge`, `.bridge-pillar.left`, `.bridge-pillar.right`, `.bridge-span`, `.bridge-span-label`, `.evbadge.sup|.inf|.doc`

**Visual purpose**: Grid de 3 columnas (1fr / auto / 1fr). El span central tiene linea con gradient navy→gold→navy que conecta los pilares. Comunica relacion causal o equivalencia. Evidence tags al final de cada lado refuerzan autoridad.

**Ejemplo**: MTIA-PROLIPA-RESPUESTA page-bloque-1 a page-bloque-5, MTIA-PROLIPA-O3-TAILOR page-arquitectura

---

## 4. Stairway

**Nombre**: Escalera / Stairway
**Cuando usar**: Progresion temporal o de complejidad (semana 1 → semana 4, basico → avanzado)
**Formats**: `proposal` (page cronograma), `preview` (page proceso), `ask` (page pasos)

**HTML**:
```html
<div class="stairway">
  <div class="stair-step" data-step="1">
    <div class="stair-num">01</div>
    <div class="stair-title">Discovery</div>
    <p class="stair-desc">Semana 1 · USD 2K</p>
  </div>
  <div class="stair-step" data-step="2">
    <div class="stair-num">02</div>
    <div class="stair-title">Plugins</div>
    <p class="stair-desc">Semanas 2-4 · USD 8K</p>
  </div>
  <div class="stair-step" data-step="3">
    <div class="stair-num">03</div>
    <div class="stair-title">Tailor</div>
    <p class="stair-desc">Semanas 5-8 · USD 14K</p>
  </div>
  <div class="stair-step" data-step="4">
    <div class="stair-num">04</div>
    <div class="stair-title">Custom</div>
    <p class="stair-desc">Semanas 9-12 · USD 40K</p>
  </div>
</div>
```

**CSS classes**: `.stairway`, `.stair-step[data-step="1-4"]`, `.stair-num`, `.stair-title`, `.stair-desc`

**Visual purpose**: 4 steps con altura progresiva (data-step 1 = 60px, 2 = 90px, 3 = 120px, 4 = 150px). Cada step tiene border-top 3px gold. Genera sensacion de momentum y crecimiento. Numero grande gold en esquina superior izquierda.

**Ejemplo**: MTIA-PROLIPA-O1-DISCOVERY page-cta, MTIA-PROLIPA-OFERTA page-timeline

---

## 5. Stamp Box

**Nombre**: Sello / Stamp Box
**Cuando usar**: Highlight de precio, garantia, certificacion, accent visual
**Formats**: `proposal` (page inversion), `ask` (page contexto)

**HTML**:
```html
<div class="stamp-box">
  <div class="stamp-human">
    <div class="stamp-amount">USD 2K</div>
    <div class="stamp-label">Discovery</div>
  </div>
</div>
```

**CSS classes**: `.stamp-box`, `.stamp-human`

**Visual purpose**: Forma circular rotada (-8deg) con border doble navy. El stamp parece "estampado" sobre el documento, llamando la atencion al numero/precio. Usa transform y filter para efecto de tinta. Efecto: autoridad oficial.

**Ejemplo**: MTIA-PROLIPA-O1-DISCOVERY page-inversion (USD 2K stamp)

---

## 6. GO-Signal

**Nombre**: Semaforo / GO-Signal
**Cuando usar**: Decision rapida, criterios de aceptacion, status (go/caution/no-go)
**Formats**: `proposal` (page criterios), `ask` (page decision), `qa` (page disclaimer)

**HTML**:
```html
<div class="go-signal">
  <div class="go-light" data-state="go">
    <div class="go-lamp"></div>
    <div class="go-label">GO</div>
    <p class="go-criteria">Criterios cumplidos para avanzar</p>
  </div>
  <div class="go-light" data-state="caution">
    <div class="go-lamp"></div>
    <div class="go-label">CAUTION</div>
    <p class="go-criteria">Revisar antes de proceder</p>
  </div>
  <div class="go-light" data-state="no-go">
    <div class="go-lamp"></div>
    <div class="go-label">NO-GO</div>
    <p class="go-criteria">Bloqueante critico</p>
  </div>
</div>
```

**CSS classes**: `.go-signal`, `.go-light[data-state="go|caution|no-go"]`, `.go-lamp`, `.go-label`, `.go-criteria`

**Visual purpose**: 3 lamparas con radial-gradient (verde/amarillo/rojo). data-state activa la lampara correspondiente con `print-color-adjust:exact` para que el color se preserve en print. Patron familiar (semaforo) elimina ambiguedad sobre el estado.

**Ejemplo**: MTIA-PROLIPA-O1-DISCOVERY page-inversion (3 criterios GO)

---

## 7. ATOC (Auto Table of Contents)

**Nombre**: Indice automatico / Auto Table of Contents
**Cuando usar**: Documentos con >10 paginas. Navegacion rapida con anchors.
**Formats**: `proposal` (page-toc), `annex` (page-toc), `qa` (opcional si pages>10)

**HTML**:
```html
<ol class="atoc">
  <li>
    <a href="#page-resumen">
      <span class="ttl">Resumen ejecutivo</span>
      <span class="dots"></span>
      <span class="pg">03</span>
    </a>
  </li>
  <li>
    <a href="#page-contexto">
      <span class="ttl">Contexto y antecedentes</span>
      <span class="dots"></span>
      <span class="pg">05</span>
    </a>
  </li>
</ol>
```

**CSS classes**: `ol.atoc`, `.ttl`, `.dots`, `.pg`

**Visual purpose**: Counter automatico (counter-increment: atoc) prefija "01.", "02.", etc. en gold. `.dots` rellena el espacio con border-bottom dotted. Numero de pagina en font-caption. Hover effect: padding-left increment + gold accent.

**Ejemplo**: MTIA-PROLIPA-OFERTA page-mapa, MTIA-PROLIPA-BUNDLE page-principio

---

## 8. XREF Strip

**Nombre**: Banda de referencias cruzadas / XREF Strip
**Cuando usar**: Vincular a otros documentos del mismo proyecto (multi-doc)
**Formats**: TODOS (al final de cada doc, links a sibling docs)

**HTML**:
```html
<div class="xref-strip">
  <a class="xref-chip" href="MTIA-PROLIPA-O1-DISCOVERY-2026-04.html">O1: Discovery</a>
  <a class="xref-chip" href="MTIA-PROLIPA-O2-PLUGINS-2026-04.html">O2: Plugins</a>
  <a class="xref-chip" href="MTIA-PROLIPA-O3-TAILOR-2026-04.html">O3: Tailor</a>
  <a class="xref-chip" href="MTIA-PROLIPA-O4-CUSTOM-2026-04.html">O4: Custom</a>
  <a class="xref-chip" href="MTIA-PROLIPA-BUNDLE-2026-04.html">Bundle</a>
</div>
```

**CSS classes**: `.xref-strip`, `.xref-chip`

**Visual purpose**: Border-left 3px solid gold sobre bg-soft. Chips white con border 1px navy. Hover lift -1px. Auto-prefijo "Ver tambien" via `::before`. Permite navegar entre documentos del mismo proyecto sin index central.

**Ejemplo**: Todos los MTIA-PROLIPA al final de cada doc

---

## 9. Callout Box

**Nombre**: Caja de aviso / Callout Box
**Cuando usar**: Context, warning, tip, key insight aislado
**Formats**: TODOS (cualquier page con contexto adicional)

**HTML**:
```html
<div class="callout">
  <div class="callout-kicker">CONTEXTO IMPORTANTE</div>
  <p class="body">El usuario debe tener acceso administrativo para configurar este flujo.</p>
</div>
```

**CSS classes**: `.callout`, `.callout-kicker`

**Visual purpose**: Background bg-cream. Kicker en gold-dark uppercase 0.66rem letter-spacing 1.5. Body charcoal. Border-left 3px gold para diferenciar de texto normal. Reduce ruido visual mientras eleva la informacion clave.

**Ejemplo**: MTIA-PROLIPA-RESPUESTA page-disclaimer, MTIA-PROLIPA-OFERTA multiples paginas

---

## 10. Pricing Table

**Nombre**: Tabla de precios / Pricing Table
**Cuando usar**: Listado de productos con costo, duracion, descuento, total
**Formats**: `proposal` (page inversion, page bundle), `preview` (page hero-pricing)

**HTML**:
```html
<table class="pricing-table">
  <thead>
    <tr>
      <th>Componente</th>
      <th>Precio</th>
      <th>Duracion</th>
      <th>Descuento</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Discovery</td>
      <td>USD 2,000</td>
      <td>Semana 1</td>
      <td>— (obligatorio)</td>
    </tr>
    <tr>
      <td>Oferta 2</td>
      <td>USD 8,000</td>
      <td>Semanas 2-4</td>
      <td>-USD 2,000</td>
    </tr>
    <tr class="total">
      <td><strong>Total</strong></td>
      <td><strong>USD 8,000</strong></td>
      <td>4 semanas</td>
      <td><strong>-20%</strong></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4" class="pricing-note">
        Descuento aplica al combinar Discovery con cualquier oferta.
      </td>
    </tr>
  </tfoot>
</table>
```

**CSS classes**: `.pricing-table`, `.total`, `.pricing-note`

**Visual purpose**: Tabla limpia con thead navy bg, total row en bold con gold border-top. Footer con explicacion de descuento. Usa font-mono para precios para alinear visualmente. Comunica precision y transparencia.

**Ejemplo**: MTIA-PROLIPA-BUNDLE page-catalogo, page-combinacion-1 a 5

---

## Composicion por Format

Que patterns usar segun el formato:

| Format | Patterns recomendados |
|--------|----------------------|
| **ask** (4p) | Funnel (page contexto), Bridge (page pregunta), Callout (page detalle), CTA |
| **preview** (7p) | Funnel (page hero), Stairway (page proceso), Stamp (page pricing teaser), Callout, ATOC opcional |
| **qa** (10p) | Minto (page tldr), Bridge (cada bloque Q-A), Callout (page disclaimer), Evidence tags |
| **proposal** (30-42p) | ATOC, Minto (resumen), Funnel (hook), Stairway (timeline), Pricing Table, Stamp, GO-Signal, XREF |
| **annex** (101p) | ATOC extendido, Minto, Tabla pricing, Bridge (architectura), Callout, technical sections |

---

## Reglas de Composicion

1. **Cada page debe tener UN patron primario** (no mezclar Funnel con Bridge en misma page)
2. **Patterns secundarios** (Callout, Evidence tags) pueden complementar
3. **ATOC se genera automaticamente** desde los IDs de page (no se compone manual)
4. **XREF Strip va siempre en page final** (excepto cover y last-page)
5. **Stamp Box max 1 por page** (perderia impacto si se repite)
6. **GO-Signal solo cuando hay decision binaria** (no usar para listas regulares)
