#!/usr/bin/env node
/**
 * Playbook HTML Assembler
 * Reads a content manifest JSON + brand tokens + HTML snippets
 * Assembles a complete self-contained HTML playbook
 *
 * Usage: node assemble.js <manifest.json> [output.html] [--brand=sofka]
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ── Paths ────────────────────────────────────────────────────────────────────
const SKILL_DIR = path.resolve(__dirname, '..');
const SNIPPETS_DIR = path.join(SKILL_DIR, 'snippets');
const REFS_DIR = path.resolve(SKILL_DIR, '..', '..', 'references');

// ── CLI ──────────────────────────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  let manifestPath = null;
  let outputPath = null;
  let brand = 'sofka';

  for (const arg of args) {
    if (arg.startsWith('--brand=')) {
      brand = arg.split('=')[1];
    } else if (!manifestPath) {
      manifestPath = arg;
    } else if (!outputPath) {
      outputPath = arg;
    }
  }

  if (!manifestPath) {
    process.stderr.write('Usage: node assemble.js <manifest.json> [output.html] [--brand=sofka]\n');
    process.exit(1);
  }

  if (!outputPath) {
    const base = path.basename(manifestPath, path.extname(manifestPath));
    outputPath = path.join(path.dirname(manifestPath), `${base}.html`);
  }

  return { manifestPath: path.resolve(manifestPath), outputPath: path.resolve(outputPath), brand };
}

// ── File helpers ─────────────────────────────────────────────────────────────
function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    process.stderr.write(`ERROR: Cannot read JSON "${filePath}": ${err.message}\n`);
    process.exit(1);
  }
}

function readSnippet(name) {
  const p = path.join(SNIPPETS_DIR, name);
  try {
    return fs.readFileSync(p, 'utf8');
  } catch (err) {
    process.stderr.write(`WARN: Snippet not found "${name}", skipping.\n`);
    return '';
  }
}

// ── Utilities ────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Render logo HTML: if logoUrl is present, renders an <img>; otherwise falls back to <span> text.
 */
function renderLogoHtml(logoUrl, altText, fallbackText) {
  if (logoUrl) {
    return '<img src="' + escapeHtml(logoUrl) + '" alt="' + escapeHtml(altText || fallbackText || '') + '" loading="lazy">';
  }
  return '<span>' + escapeHtml(fallbackText || '') + '</span>';
}

/**
 * Generic placeholder replacer: replaces {{KEY}} with data[KEY].
 * Supports nested lookups via dot notation: {{a.b}} → data.a.b
 */
// Note: Only matches UPPERCASE placeholders (A-Z0-9_.)
function replacePlaceholders(template, data) {
  if (!template || !data) return template || '';
  return template.replace(/\{\{([A-Z0-9_.]+)\}\}/g, (match, key) => {
    const parts = key.split('.');
    let val = data;
    for (const p of parts) {
      if (val == null) return match;
      val = val[p];
    }
    return val != null ? String(val) : match;
  });
}

// ── Render helpers ───────────────────────────────────────────────────────────

function renderBadges(badges, cssClass) {
  if (!Array.isArray(badges) || badges.length === 0) return '';
  const cls = cssClass || 'hero-badge';
  return badges.map(b => `<span class="${cls}">${escapeHtml(b)}</span>`).join('\n      ');
}

function renderKpis(kpis) {
  if (!Array.isArray(kpis)) return '';
  return kpis.map(k => `
      <div class="hero-kpi">
        <div class="hero-kpi-icon">${k.icon || ''}</div>
        <div class="hero-kpi-value">${escapeHtml(k.value)}</div>
        <div class="hero-kpi-label">${escapeHtml(k.label)}</div>
      </div>`).join('');
}

function renderNavItems(manifest) {
  // Use explicit nav.links if provided, otherwise auto-generate from sections
  let links = [];
  if (manifest.nav && Array.isArray(manifest.nav.links)) {
    links = manifest.nav.links;
  } else if (Array.isArray(manifest.sections)) {
    links = manifest.sections.map(s => ({
      href: `#${s.id}`,
      label: s.headerTitle ? s.headerTitle.replace(/<[^>]*>/g, '').substring(0, 30) : s.id
    }));
    // Add katas anchor
    if (Array.isArray(manifest.katas) && manifest.katas.length > 0) {
      links.push({ href: '#katas', label: 'Katas' });
    }
    // Add flows anchor
    if (Array.isArray(manifest.flows) && manifest.flows.length > 0) {
      links.push({ href: '#flujos', label: 'Flujos' });
    }
  }
  return links.map(l =>
    `<a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a>`
  ).join('\n    ');
}

function renderTableHeaders(columns) {
  if (!Array.isArray(columns)) return '';
  return columns.map(c => `<th>${escapeHtml(c)}</th>`).join('');
}

function renderTableRows(rows, columns) {
  if (!Array.isArray(rows)) return '';
  return rows.map(row => {
    // Support both { cells: [...] } objects and plain string arrays
    if (row.cells) {
      const tds = row.cells.map(cell => {
        let style = '';
        let cls = '';
        let content = escapeHtml(cell.text || '');
        if (cell.bold) style += 'font-weight:700;';
        if (cell.color) style += `color:${cell.color};`;
        if (cell.jarvisName) cls = ' class="jarvis-name"';
        if (cell.isLink && cell.href) {
          content = `<a href="${escapeHtml(cell.href)}">${content}</a>`;
        }
        const styleAttr = style ? ` style="${style}"` : '';
        return `<td${cls}${styleAttr}>${content}</td>`;
      }).join('');
      return `<tr>${tds}</tr>`;
    }
    // Plain string array
    if (Array.isArray(row)) {
      const tds = row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('');
      return `<tr>${tds}</tr>`;
    }
    return '';
  }).join('\n');
}

function renderProblemCards(cards) {
  if (!Array.isArray(cards)) return '';
  return cards.map(c => {
    const borderStyle = c.borderColor ? ` style="border-left-color:${c.borderColor}"` : '';
    const titleStyle = c.titleColor ? ` style="color:${c.titleColor}"` : '';
    return `<div class="problem-card"${borderStyle}>
        <h4${titleStyle}>${escapeHtml(c.title)}</h4>
        <p>${c.body || ''}</p>
      </div>`;
  }).join('\n    ');
}

function renderCycleSteps(steps) {
  if (!Array.isArray(steps)) return '';
  const parts = [];
  steps.forEach((s, i) => {
    parts.push(`<div class="cycle-step">
        <div class="step-num">${s.num || i + 1}</div>
        <div class="step-label">${escapeHtml(s.label)}</div>
        <div class="step-jarvis">${escapeHtml(s.jarvis)}</div>
        <div class="step-artifact">${escapeHtml(s.artifact)}</div>
      </div>`);
    if (i < steps.length - 1) {
      parts.push('<div class="cycle-arrow">&#10140;</div>');
    }
  });
  return parts.join('\n    ');
}

function renderToolCards(cards) {
  if (!Array.isArray(cards)) return '';
  return cards.map(c => {
    const fields = (c.fields || []).map(f => {
      const valueClass = f.isPrompt ? 'jf-prompt' : 'jf-value';
      return `<div class="jf">
          <div class="jf-label">${escapeHtml(f.label)}</div>
          <div class="${valueClass}">${f.value || ''}</div>
        </div>`;
    }).join('\n      ');

    const antiUse = c.antiUse
      ? `<div class="jf-antiuse"><strong>Anti-uso:</strong> ${escapeHtml(c.antiUse)}</div>`
      : '';

    const gemLink = c.gemLink
      ? `<a class="gem-link" href="${escapeHtml(c.gemLink.url)}" target="_blank">${escapeHtml(c.gemLink.label)}</a>`
      : '';

    return `<div class="jarvis-card">
      <div class="jarvis-card-header">
        <div class="jarvis-icon ${c.iconClass || ''}">${escapeHtml(c.iconLabel || '')}</div>
        <h3>${escapeHtml(c.name)}<small>${escapeHtml(c.subtitle || '')}</small></h3>
      </div>
      <div class="jarvis-card-body">
        <p>${escapeHtml(c.description || '')}</p>
        ${fields}
        ${antiUse}
        ${gemLink}
      </div>
    </div>`;
  }).join('\n    ');
}

function renderTimelineItems(items) {
  if (!Array.isArray(items)) return '';
  return items.map(w => {
    const tags = (w.tags || []).map(t =>
      `<span class="jtag ${t.variant || ''}">${escapeHtml(t.label)}</span>`
    ).join('\n          ');

    const tagsHtml = tags ? `<div class="jtags">${tags}</div>` : '';

    const deliverable = w.deliverable
      ? `<div class="tl-deliverable"><strong>${escapeHtml(w.deliverable.label)}</strong> ${escapeHtml(w.deliverable.text)}</div>`
      : '';

    const gate = w.gate
      ? `<div class="gate-box" style="margin-top:1rem;">${escapeHtml(w.gate)}</div>`
      : '';

    return `<div class="timeline-item">
        <div class="timeline-dot">${w.dotNum || ''}</div>
        <div class="timeline-content">
          <h3><span class="wk">${escapeHtml(w.weekLabel || '')}</span> ${escapeHtml(w.titleSuffix || '')}</h3>
          <p class="week-obj">${escapeHtml(w.objective || '')}</p>
          ${tagsHtml}
          ${deliverable}
          ${gate}
        </div>
      </div>`;
  }).join('\n    ');
}

function renderMetricCards(metrics) {
  if (!Array.isArray(metrics)) return '';
  return metrics.map(m =>
    `<div class="metric-card">
        <div class="mv">${escapeHtml(m.value)}</div>
        <div class="ml">${escapeHtml(m.label)}</div>
      </div>`
  ).join('\n    ');
}

function renderSemaforoCards(cards) {
  if (!Array.isArray(cards)) return '';
  return cards.map(c =>
    `<div class="semaforo-card ${c.variant || ''}">
        <h4>${escapeHtml(c.title)}</h4>
        <p>${escapeHtml(c.description)}</p>
      </div>`
  ).join('\n    ');
}

function renderVraidLetters(letters) {
  if (!Array.isArray(letters)) return '';
  return letters.map(l => {
    const feeds = l.feeds ? `<div class="feeds">${escapeHtml(l.feeds)}</div>` : '';
    const meaningHtml = (l.meaningEs || l.meaningEn)
      ? `<div class="meaning"><span class="es">${escapeHtml(l.meaningEs || l.meaning || '')}</span><span class="en">${escapeHtml(l.meaningEn || '')}</span></div>`
      : `<div class="meaning">${escapeHtml(l.meaning || '')}</div>`;
    return `<div class="vraid-letter">
        <div class="letter">${escapeHtml(l.letter)}</div>
        ${meaningHtml}
        ${feeds}
      </div>`;
  }).join('\n    ');
}

function renderArchLayers(layers) {
  if (!Array.isArray(layers)) return '';
  return layers.map(l => {
    const items = (l.items || []).map(it => {
      const desc = it.description ? ` &mdash; ${escapeHtml(it.description)}` : '';
      const jarvis = it.jarvis ? ` <span class="jarvis-name">${escapeHtml(it.jarvis)}</span>` : '';
      const freq = it.frequency ? ` <em style="font-size:.75rem;color:var(--sofka-gray-500);">(${escapeHtml(it.frequency)})</em>` : '';
      return `<li><strong>${escapeHtml(it.name)}</strong>${desc}${jarvis}${freq}</li>`;
    }).join('\n        ');

    return `<div class="vraid-letter" style="min-width:250px;">
        <div class="letter">${l.icon || ''}</div>
        <div class="meaning"><strong>${escapeHtml(l.name)}</strong></div>
        <div class="feeds">${escapeHtml(l.description)}</div>
        <ul style="list-style:disc;padding-left:1.2rem;margin-top:.5rem;font-size:.82rem;">
          ${items}
        </ul>
      </div>`;
  }).join('\n    ');
}

function renderCompareItems(items, type) {
  if (!Array.isArray(items)) return '';
  return items.map(i => `<li>${escapeHtml(i)}</li>`).join('\n      ');
}

function renderTestimonials(testimonials) {
  if (!Array.isArray(testimonials)) return '';
  return testimonials.map(t => {
    const role = t.role ? `<div class="testimonial-role">${escapeHtml(t.role)}</div>` : '';
    return `<div class="testimonial">
        <div class="testimonial-quote">${escapeHtml(t.quote)}</div>
        <div class="testimonial-author">${escapeHtml(t.author)}</div>
        ${role}
      </div>`;
  }).join('\n    ');
}

function renderAcceptanceItems(items) {
  if (!Array.isArray(items)) return '';
  return items.map(i => `<li>${escapeHtml(i)}</li>`).join('\n  ');
}

// ═══ V2 RENDER FUNCTIONS ═══

function renderBilingual(es, en) {
  if (!en) return escapeHtml(es || '');
  return '<span class="es">' + escapeHtml(es) + '</span><span class="en">' + escapeHtml(en) + '</span>';
}

function renderBilingualRaw(es, en) {
  if (!en) return es || '';
  return '<span class="es">' + es + '</span><span class="en">' + en + '</span>';
}

function renderModalOverlay(id, titleEs, titleEn, subtitleEs, subtitleEn, bodyHtml) {
  return '<div class="modal-overlay" id="modal-' + id + '"><div class="modal-box">' +
    '<button class="modal-close" onclick="closeModal()">&times;</button>' +
    '<div class="modal-header"><h3>' + renderBilingual(titleEs, titleEn) + '</h3>' +
    '<small>' + renderBilingual(subtitleEs, subtitleEn) + '</small></div>' +
    '<div class="modal-body">' + bodyHtml + '</div></div></div>\n';
}

function renderFlowModalBody(flow) {
  var body = '';
  body += '<div class="callout callout-warning">';
  body += '<strong class="es">&#10067; ¿Para qué lo usas?</strong><strong class="en">&#10067; What is it for?</strong>';
  body += '<p class="es">' + (flow.purposeEs || '') + '</p><p class="en">' + (flow.purposeEn || '') + '</p></div>';
  body += '<h4 class="es">Cómo funciona</h4><h4 class="en">How it works</h4>';
  body += '<div class="timeline">';
  (flow.steps || []).forEach(function(s, i) {
    body += '<div class="timeline-item"><div class="timeline-dot">' + (i + 1) + '</div>';
    body += '<div class="timeline-content"><h3><span class="wk">' + (s.time || '') + '</span></h3>';
    body += '<p class="es">' + (s.descEs || '') + '</p><p class="en">' + (s.descEn || '') + '</p></div></div>';
  });
  body += '</div>';
  body += '<h4 class="es">Qué obtienes al final</h4><h4 class="en">What you get at the end</h4>';
  body += '<p class="es">' + (flow.outputEs || '') + '</p><p class="en">' + (flow.outputEn || '') + '</p>';
  body += '<div class="callout" style="border-color:var(--sofka-orange);background:var(--sofka-orange-dim);">';
  body += '<strong class="es">Cómo sabes que lo hiciste bien</strong><strong class="en">How you know you did it right</strong>';
  body += '<p class="es">' + (flow.dodEs || '') + '</p><p class="en">' + (flow.dodEn || '') + '</p></div>';
  if (flow.progressionEs) {
    body += '<h4 class="es">Cuándo vas a notar la diferencia</h4><h4 class="en">When you\'ll notice the difference</h4>';
    body += '<p class="es">' + flow.progressionEs + '</p><p class="en">' + (flow.progressionEn || '') + '</p>';
  }
  body += renderCtaBlock(flow.cta || []);
  return body;
}

function renderAntiPatternModalBody(ap) {
  var body = '';
  body += '<div class="callout callout-warning">';
  body += '<strong class="es">&#10067; Qué es</strong><strong class="en">&#10067; What it is</strong>';
  body += '<p class="es">' + (ap.conceptEs || '') + '</p><p class="en">' + (ap.conceptEn || '') + '</p></div>';
  body += '<h4 class="es">Por qué pasa</h4><h4 class="en">Why it happens</h4>';
  body += '<p class="es">' + (ap.whyEs || '') + '</p><p class="en">' + (ap.whyEn || '') + '</p>';
  body += '<h4 class="es">Cómo detectarlo</h4><h4 class="en">How to detect it</h4>';
  body += '<p class="es">' + (ap.detectEs || '') + '</p><p class="en">' + (ap.detectEn || '') + '</p>';
  body += '<h4 class="es">Cómo resolverlo</h4><h4 class="en">How to fix it</h4>';
  body += '<div class="timeline">';
  (ap.steps || []).forEach(function(s, i) {
    body += '<div class="timeline-item"><div class="timeline-dot">' + (i + 1) + '</div>';
    body += '<div class="timeline-content"><h3>' + renderBilingual(s.titleEs || '', s.titleEn || '') + '</h3>';
    body += '<p class="es">' + (s.descEs || '') + '</p><p class="en">' + (s.descEn || '') + '</p></div></div>';
  });
  body += '</div>';
  body += '<div class="callout" style="border-color:var(--sofka-critical);background:var(--sofka-critical-dim);">';
  body += '<strong>Accountability</strong>';
  body += '<p class="es">' + (ap.accountabilityEs || '') + '</p><p class="en">' + (ap.accountabilityEn || '') + '</p></div>';
  return body;
}

function renderGlossaryModalBody(term) {
  var body = '';
  body += '<div class="callout callout-info">';
  body += '<strong class="es">&#10067; Concepto</strong><strong class="en">&#10067; Concept</strong>';
  body += '<p class="es">' + (term.conceptEs || '') + '</p><p class="en">' + (term.conceptEn || '') + '</p></div>';
  body += '<h4 class="es">Para qué te sirve</h4><h4 class="en">Why it matters to you</h4>';
  body += '<div class="callout" style="border-color:var(--sofka-orange);background:var(--sofka-orange-dim);">';
  body += '<p class="es">' + (term.whyEs || '') + '</p><p class="en">' + (term.whyEn || '') + '</p></div>';
  if (term.exampleEs) {
    body += '<h4 class="es">Ejemplo práctico</h4><h4 class="en">Practical example</h4>';
    body += '<p class="es">' + term.exampleEs + '</p><p class="en">' + (term.exampleEn || '') + '</p>';
  }
  return body;
}

function renderKataModalBody(kata) {
  var body = '';
  body += '<div class="callout callout-warning">';
  body += '<strong class="es">&#10067; Qué significa</strong><strong class="en">&#10067; What it means</strong>';
  body += '<p class="es">' + (kata.conceptEs || '') + '</p><p class="en">' + (kata.conceptEn || '') + '</p></div>';
  body += '<h4 class="es">Práctica</h4><h4 class="en">Practice</h4>';
  body += '<div class="timeline">';
  (kata.practiceSteps || []).forEach(function(s, i) {
    body += '<div class="timeline-item"><div class="timeline-dot">' + (i + 1) + '</div>';
    body += '<div class="timeline-content"><h3>' + renderBilingual(s.titleEs || '', s.titleEn || '') + '</h3>';
    body += '<p class="es">' + (s.descEs || '') + '</p><p class="en">' + (s.descEn || '') + '</p></div></div>';
  });
  body += '</div>';
  body += '<div class="callout" style="border-color:var(--sofka-orange);background:var(--sofka-orange-dim);">';
  body += '<strong class="es">Criterio de superación</strong><strong class="en">Advancement criterion</strong>';
  body += '<p class="es">' + (kata.criterionEs || '') + '</p><p class="en">' + (kata.criterionEn || '') + '</p></div>';
  return body;
}

function renderCtaBlock(ctas) {
  if (!ctas || !ctas.length) return '';
  var html = '<div class="modal-cta">';
  ctas.forEach(function(c) {
    if (c.type === 'cross-modal') {
      html += '<a class="gem-link pulse" onclick="closeModal();openModal(\'' + c.modalId + '\');" style="cursor:pointer;">';
      html += renderBilingual(c.labelEs || '', c.labelEn || '') + '</a>';
    } else {
      html += '<a class="gem-link' + (c.pulse ? ' pulse' : '') + '" href="' + (c.url || '#') + '" target="_blank">' + (c.label || '') + '</a>';
    }
  });
  html += '</div>';
  return html;
}

function renderEmpezarGrid(cards) {
  var html = '<div class="problem-grid">';
  (cards || []).forEach(function(c) {
    if (c.isStatic) {
      html += '<div class="problem-card tip-card" style="border-left-color:' + (c.color || 'var(--sofka-warning)') + ';">';
    } else {
      html += '<div class="problem-card tip-card clickable-card" style="border-left-color:' + (c.color || 'var(--sofka-info)') + ';cursor:pointer;" onclick="openModal(\'' + c.flowNum + '\')" role="button" tabindex="0">';
    }
    html += '<h4 class="es" style="color:' + (c.color || 'var(--sofka-info)') + ';">' + (c.emoji || '') + ' ' + escapeHtml(c.titleEs || '') + '</h4>';
    html += '<h4 class="en" style="color:' + (c.color || 'var(--sofka-info)') + ';">' + (c.emoji || '') + ' ' + escapeHtml(c.titleEn || '') + '</h4>';
    html += '<p class="es">' + (c.descEs || '') + '</p>';
    html += '<p class="en">' + (c.descEn || '') + '</p>';
    html += '</div>';
  });
  html += '</div>';
  return html;
}

function renderMetadataTable(metadata) {
  var html = '<div style="overflow-x:auto;"><table class="decision-table"><tbody>';
  (metadata.rows || []).forEach(function(r) {
    html += '<tr><td style="font-weight:700;width:160px;">' + renderBilingual(r.labelEs || '', r.labelEn || '') + '</td>';
    html += '<td>' + renderBilingualRaw(r.valueEs || '', r.valueEn || '') + '</td></tr>';
  });
  html += '</tbody></table></div>';
  return html;
}

function renderRoleVariantModals(variants) {
  var html = '';
  (variants || []).forEach(function(v) {
    var body = '<div class="callout callout-info">';
    body += '<strong class="es">&#10067; Concepto</strong><strong class="en">&#10067; Concept</strong>';
    body += '<p class="es">' + (v.conceptEs || '') + '</p><p class="en">' + (v.conceptEn || '') + '</p></div>';
    body += '<h4 class="es">Flujos recomendados</h4><h4 class="en">Recommended flows</h4>';
    body += '<p class="es">' + (v.flowsEs || '') + '</p><p class="en">' + (v.flowsEn || '') + '</p>';
    if (v.calloutEs) {
      body += '<div class="callout" style="border-color:var(--sofka-orange);background:var(--sofka-orange-dim);">';
      body += '<p class="es">' + v.calloutEs + '</p><p class="en">' + (v.calloutEn || '') + '</p></div>';
    }
    html += renderModalOverlay('frv-' + v.id, v.nameEs || '', v.nameEn || '', v.subtitleEs || '', v.subtitleEn || '', body);
  });
  return html;
}

function renderMetricModals(metrics) {
  var html = '';
  (metrics || []).forEach(function(m) {
    var body = '<div class="callout callout-info">';
    body += '<p class="es">' + (m.detailEs || '') + '</p><p class="en">' + (m.detailEn || '') + '</p></div>';
    if (m.evidenceEs) {
      body += '<div class="callout" style="border-color:var(--sofka-orange);background:var(--sofka-orange-dim);">';
      body += '<strong class="es">Evidencia del piloto</strong><strong class="en">Pilot evidence</strong>';
      body += '<p class="es">' + m.evidenceEs + '</p><p class="en">' + (m.evidenceEn || '') + '</p></div>';
    }
    html += renderModalOverlay('fm-' + m.id, m.titleEs || '', m.titleEn || '', m.subtitleEs || '', m.subtitleEn || '', body);
  });
  return html;
}

function renderImpactModal(impact) {
  if (!impact) return '';
  var body = '<div class="timeline">';
  (impact.weeks || []).forEach(function(w, i) {
    body += '<div class="timeline-item"><div class="timeline-dot">' + (i + 1) + '</div>';
    body += '<div class="timeline-content"><h3><span class="wk">' + renderBilingual(w.labelEs || '', w.labelEn || '') + '</span></h3>';
    body += '<p class="es">' + (w.descEs || '') + '</p><p class="en">' + (w.descEn || '') + '</p></div></div>';
  });
  body += '</div>';
  return renderModalOverlay('fimpacto', impact.titleEs || '', impact.titleEn || '', impact.subtitleEs || '', impact.subtitleEn || '', body);
}

function renderAllModals(manifest) {
  var html = '\n<!-- MODALS -->\n';
  // Flow modals (id="modal-f{num}")
  (manifest.flows || []).forEach(function(f) {
    html += renderModalOverlay('f' + f.num, f.nameEs || f.name, f.nameEn || '', f.subtitleEs || '', f.subtitleEn || '', renderFlowModalBody(f));
  });
  // Anti-pattern modals (id="modal-fap{num}")
  (manifest.antiPatterns || []).forEach(function(ap) {
    html += renderModalOverlay('fap' + ap.num, ap.nameEs || '', ap.nameEn || '', ap.subtitleEs || '', ap.subtitleEn || '', renderAntiPatternModalBody(ap));
  });
  // Glossary modals (id="modal-fg-{id}")
  (manifest.glossary || []).forEach(function(t) {
    html += renderModalOverlay('fg-' + t.id, t.name || '', '', t.subtitleEs || '', t.subtitleEn || '', renderGlossaryModalBody(t));
  });
  // Kata modals (id="modal-fka{num}")
  (manifest.katas || []).forEach(function(k) {
    html += renderModalOverlay('fka' + k.number, k.nameEs || k.name, k.nameEn || '', k.subtitleEs || '', k.subtitleEn || '', renderKataModalBody(k));
  });
  // Decision-matrix modals (id="modal-fdm{num}") — rendered via modals.decisionMatrix if present
  if (manifest.modals && Array.isArray(manifest.modals.decisionMatrix)) {
    manifest.modals.decisionMatrix.forEach(function(dm) {
      html += renderModalOverlay('fdm' + dm.num, dm.titleEs || '', dm.titleEn || '', dm.subtitleEs || '', dm.subtitleEn || '', dm.bodyHtml || '');
    });
  }
  // Learning-layer modals (id="modal-fl-{id}") — rendered via modals.learningLayers if present
  if (manifest.modals && Array.isArray(manifest.modals.learningLayers)) {
    manifest.modals.learningLayers.forEach(function(ll) {
      html += renderModalOverlay('fl-' + ll.id, ll.titleEs || '', ll.titleEn || '', ll.subtitleEs || '', ll.subtitleEn || '', ll.bodyHtml || '');
    });
  }
  // Manager modals (id="modal-fm-{level}") — rendered via modals.managerProfiles if present
  if (manifest.modals && Array.isArray(manifest.modals.managerProfiles)) {
    manifest.modals.managerProfiles.forEach(function(mp) {
      html += renderModalOverlay('fm-' + mp.level, mp.nameEs || '', mp.nameEn || '', mp.subtitleEs || '', mp.subtitleEn || '', mp.bodyHtml || '');
    });
  }
  // Role variant modals (id="modal-frv-{variant}")
  html += renderRoleVariantModals(manifest.roleVariants || []);
  // Metric detail modals (id="modal-fm-{metric}")
  html += renderMetricModals(manifest.metricModals || []);
  // Impact modal (id="modal-fimpacto")
  html += renderImpactModal(manifest.impactModal);
  return html;
}

function renderGlossaryGrid(terms) {
  var colors = ['var(--sofka-orange)', 'var(--sofka-info)', 'var(--sofka-accent-c)', '#16A34A', 'var(--sofka-critical)', 'var(--sofka-accent-b)'];
  var html = '<div class="problem-grid" style="margin-top:1.5rem;">';
  (terms || []).forEach(function(t, i) {
    var c = colors[i % colors.length];
    html += '<div class="problem-card tip-card clickable-card" style="border-left-color:' + c + ';" onclick="openModal(\'fg-' + t.id + '\')" role="button" tabindex="0">';
    html += '<h4 style="color:' + c + ';">' + escapeHtml(t.name || '') + '</h4>';
    html += '<p>' + renderBilingual(t.subtitleEs || '', t.subtitleEn || '') + '</p></div>';
  });
  html += '</div>';
  return html;
}

function renderAntiPatternTable(patterns) {
  var html = '<div style="overflow-x:auto;"><table class="decision-table"><thead><tr>';
  html += '<th>' + renderBilingual('Síntoma', 'Symptom') + '</th>';
  html += '<th>' + renderBilingual('Anti-patrón', 'Anti-pattern') + '</th>';
  html += '<th>' + renderBilingual('Remediación', 'Remediation') + '</th></tr></thead><tbody>';
  (patterns || []).forEach(function(ap) {
    html += '<tr onclick="openModal(\'fap' + ap.num + '\')" role="button" tabindex="0" class="clickable-row">';
    html += '<td>' + renderBilingual(ap.symptomEs || '', ap.symptomEn || '') + '</td>';
    html += '<td style="font-weight:700;color:var(--sofka-critical);">' + renderBilingual(ap.nameEs || '', ap.nameEn || '') + '</td>';
    html += '<td>' + renderBilingual(ap.remedyEs || '', ap.remedyEn || '') + '</td></tr>';
  });
  html += '</tbody></table></div>';
  return html;
}

function renderProfileSection(profiles) {
  var colorMap = { novato: { color: 'var(--sofka-orange)', dim: 'var(--sofka-orange-dim)', border: 'rgba(255,126,8,.25)', icon: 'N' }, practicante: { color: 'var(--sofka-info)', dim: 'var(--sofka-info-dim)', border: 'var(--sofka-info-border)', icon: 'P' }, autonomo: { color: '#16A34A', dim: 'rgba(66,211,111,.1)', border: 'rgba(66,211,111,.25)', icon: 'A' } };
  var html = '<div class="jarvis-cards" style="grid-template-columns:repeat(3,1fr);">';
  (profiles || []).forEach(function(p) {
    var cm = colorMap[p.level] || colorMap.novato;
    html += '<div class="jarvis-card clickable-card" onclick="openModal(\'fm-' + p.level + '\')">';
    html += '<div class="jarvis-card-header"><div class="jarvis-icon" style="background:' + cm.dim + ';color:' + cm.color + ';border:1px solid ' + cm.border + ';">' + cm.icon + '</div>';
    html += '<h3>' + renderBilingual(p.nameEs || '', p.nameEn || '') + '<small>' + (p.shuHaRi || '') + '</small></h3></div>';
    html += '<div class="jarvis-card-body"><p>' + renderBilingual(p.descEs || '', p.descEn || '') + '</p></div></div>';
  });
  html += '</div>';
  return html;
}

function renderApmEquation(eq) {
  if (!eq) return '';
  var html = '<div class="apm-equation">';
  html += '<div class="apm-col"><div class="apm-col-title">' + renderBilingual(eq.term1TitleEs || '', eq.term1TitleEn || '') + '</div>';
  html += '<p style="font-size:.85rem;color:var(--sofka-gray-500);line-height:1.6;">' + renderBilingual(eq.term1DescEs || '', eq.term1DescEn || '') + '</p></div>';
  html += '<div class="apm-op">' + (eq.op1 || '+') + '</div>';
  html += '<div class="apm-col"><div class="apm-col-title">' + renderBilingual(eq.term2TitleEs || '', eq.term2TitleEn || '') + '</div>';
  html += '<p style="font-size:.85rem;color:var(--sofka-gray-500);line-height:1.6;">' + renderBilingual(eq.term2DescEs || '', eq.term2DescEn || '') + '</p></div>';
  html += '<div class="apm-op">' + (eq.op2 || '=') + '</div>';
  html += '<div class="apm-col" style="border-top:4px solid var(--sofka-orange);"><div class="apm-col-title">' + renderBilingual(eq.resultTitleEs || '', eq.resultTitleEn || '') + '</div>';
  html += '<p style="font-size:.85rem;color:var(--sofka-gray-500);line-height:1.6;">' + renderBilingual(eq.resultDescEs || '', eq.resultDescEn || '') + '</p></div>';
  html += '</div>';
  return html;
}

function renderGemBar(gems) {
  if (!gems || !gems.length) return '';
  var html = '<div class="gem-bar"><div class="gem-bar-title">' + renderBilingual('Acceso directo a las Gemas', 'Direct access to Gems') + '</div>';
  gems.forEach(function(g) {
    html += '<a href="' + (g.url || '#') + '" target="_blank" class="gem-link' + (g.pulse ? ' pulse' : '') + '">' + escapeHtml(g.name || '') + '</a>';
  });
  html += '</div>';
  return html;
}

// ═══ V5 RENDER FUNCTIONS ═══

function renderPromptCopyable(prompt) {
  if (!prompt) return '';
  var text = (prompt.text || '').replace(/\{([A-Z_]+)\}/g, '<span class="param">{$1}</span>');
  var exito = prompt.exito ? '\n\nEXITO: ' + prompt.exito : '';
  return '<h4 class="es">Prompt listo para copiar</h4><h4 class="en">Ready-to-copy prompt</h4>\n' +
    '<div class="prompt-copyable">\n' +
    '  <button class="copy-btn" onclick="copyPrompt(this)">Copiar</button>\n' +
    '  <div class="prompt-text">' + text + exito + '</div>\n</div>\n';
}

function renderCalendarLink(link) {
  if (!link) return '';
  var url = 'https://calendar.google.com/calendar/u/0/r/eventedit?text=' +
    encodeURIComponent(link.title || '') + '&details=' + encodeURIComponent(link.details || '') +
    '&recur=RRULE:FREQ=WEEKLY;COUNT=' + (link.weeks || 8);
  return '<a class="gem-link" style="text-align:center;padding:.75rem 1rem;font-size:.82rem;line-height:1.4;" href="' +
    url + '" target="_blank" role="button" tabindex="0">' + (link.emoji || '') + ' ' +
    renderBilingual(link.labelEs || '', link.labelEn || '') + '</a>';
}

function renderCalendarGrid(links) {
  if (!links || !links.length) return '';
  return '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.75rem;margin-top:1.5rem;">\n' +
    links.map(renderCalendarLink).join('\n') + '\n</div>';
}

function renderCta(ctas) {
  // Backward-compat alias for renderCtaBlock
  return renderCtaBlock(ctas);
}

function renderGuardrails(doCol, dontCol) {
  const siItems = renderCompareItems(doCol.items);
  const noItems = renderCompareItems(dontCol.items);
  const snippet = readSnippet('guardrails-grid.html');
  return snippet
    .replace('{{GUARDRAIL_SI_TITLE}}', escapeHtml(doCol.title))
    .replace('{{GUARDRAIL_SI_ITEMS}}', siItems)
    .replace('{{GUARDRAIL_NO_TITLE}}', escapeHtml(dontCol.title))
    .replace('{{GUARDRAIL_NO_ITEMS}}', noItems);
}

function renderCallout(variant, title, data) {
  const snippet = readSnippet('callout.html');
  let contentEs = '';
  let contentEn = '';
  if (data.items && Array.isArray(data.items)) {
    contentEs = `<ul>${data.items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
    contentEn = contentEs; // items are shared unless bilingual
  } else {
    contentEs = escapeHtml(data.bodyEs || data.body || '');
    contentEn = escapeHtml(data.bodyEn || '');
  }
  const titleEs = escapeHtml(data.titleEs || title || '');
  const titleEn = escapeHtml(data.titleEn || '');
  const attrs = data.attrs || '';
  return snippet
    .replace('{{CALLOUT_VARIANT}}', (variant || '').replace('callout-', ''))
    .replace('{{CALLOUT_ATTRS}}', attrs)
    .replace('{{CALLOUT_TITLE_ES}}', titleEs)
    .replace('{{CALLOUT_TITLE_EN}}', titleEn)
    .replace('{{CALLOUT_CONTENT_ES}}', contentEs)
    .replace('{{CALLOUT_CONTENT_EN}}', contentEn);
}

function renderKataCard(kata) {
  const snippet = readSnippet('kata-card.html');
  const iconMap = {
    LaForja: { cls: 'laforja', lbl: 'LF' },
    LaReu: { cls: 'lareu', lbl: 'LR' },
    LaVuelta: { cls: 'lavuelta', lbl: 'LV' },
    ElRepo: { cls: 'elrepo', lbl: 'ER' },
    LaInfo: { cls: 'lainfo', lbl: 'LI' }
  };
  const agent = kata.jarvisAgent || '';
  const icon = iconMap[agent] || { cls: 'laforja', lbl: 'K' + kata.number };

  // Shu-Ha-Ri phase colors
  const phaseColors = {
    shu: { color: 'var(--sofka-orange)', dim: 'var(--sofka-orange-dim)', border: 'rgba(255,126,8,.25)' },
    ha: { color: 'var(--sofka-info)', dim: 'var(--sofka-info-dim)', border: 'var(--sofka-info-border)' },
    ri: { color: '#16A34A', dim: 'rgba(66,211,111,.1)', border: 'rgba(66,211,111,.25)' }
  };
  const phase = kata.shuHaRiLevel || 'shu';
  const pc = phaseColors[phase] || phaseColors.shu;

  // Build timeline exercise steps
  const steps = (kata.steps || []).map((s, i) => {
    const toolBadge = s.tool ? ` <span style="color:var(--sofka-info);font-size:.75rem;">[${escapeHtml(s.tool)}]</span>` : '';
    const tip = s.tip ? ` <em style="font-size:.78rem;color:var(--sofka-gray-500);">Tip: ${escapeHtml(s.tip)}</em>` : '';
    return `<div class="timeline-item"><div class="timeline-dot">${i + 1}</div><div class="timeline-content"><p>${escapeHtml(s.instruction)}${toolBadge}${tip}</p></div></div>`;
  }).join('\n          ');

  const criteria = (kata.successCriteria || []).map(c => `&#10003; ${escapeHtml(c)}`).join('<br>');

  const antiPatterns = (kata.antiPatterns || []).map(a => `&#10007; ${escapeHtml(a)}`).join('<br>');
  const bestPractice = antiPatterns || 'Sigue las instrucciones paso a paso.';

  return snippet
    .replace('{{KATA_NUM}}', String(kata.number || ''))
    .replace('{{KATA_ICON_CLASS}}', icon.cls)
    .replace('{{KATA_ICON_TEXT}}', icon.lbl)
    .replace('{{KATA_GEM_NAME_ES}}', `Kata ${kata.number}: ${escapeHtml(kata.nameEs || kata.name || '')}`)
    .replace('{{KATA_GEM_NAME_EN}}', `Kata ${kata.number}: ${escapeHtml(kata.nameEn || '')}`)
    .replace('{{KATA_GEM_SUBTITLE_ES}}', escapeHtml(kata.objectiveEs || kata.objective || ''))
    .replace('{{KATA_GEM_SUBTITLE_EN}}', escapeHtml(kata.objectiveEn || ''))
    .replace('{{KATA_PHASE_COLOR_DIM}}', pc.dim)
    .replace('{{KATA_PHASE_COLOR_BORDER}}', pc.border)
    .replace('{{KATA_PHASE_COLOR}}', pc.color)
    .replace('{{KATA_PHASE}}', phase.charAt(0).toUpperCase() + phase.slice(1))
    .replace('{{KATA_WHY_VALUE_ES}}', escapeHtml(kata.objectiveEs || kata.objective || ''))
    .replace('{{KATA_WHY_VALUE_EN}}', escapeHtml(kata.objectiveEn || ''))
    .replace('{{KATA_EXERCISE_STEPS}}', steps)
    .replace('{{KATA_SUCCESS_VALUE}}', criteria)
    .replace('{{KATA_BEST_PRACTICE_VALUE}}', bestPractice)
    .replace('{{KATA_CHECKPOINT}}', escapeHtml(kata.checkpoint || `Gate Kata ${kata.number}: Todos los criterios cumplidos.`));
}

function renderFlowCard(flow) {
  const snippet = readSnippet('flow-card.html');

  // Build Jarvis sequence as step items
  const seq = (flow.jarvisSequence || []);
  const steps = seq.map((j, i) => `<li>${escapeHtml(j)}</li>`).join('\n          ');

  const iconNum = flow.number < 10 ? `0${flow.number}` : `${flow.number}`;

  // Build CTA links
  const ctaLinks = (flow.cta || []).map(c => {
    if (c.type === 'cross-modal') {
      return `<a class="gem-link pulse" onclick="closeModal();openModal('${escapeHtml(c.modalId || '')}');" style="cursor:pointer;">${renderBilingual(c.labelEs || '', c.labelEn || '')}</a>`;
    }
    const pulseClass = c.pulse ? ' pulse' : '';
    return `<a class="gem-link${pulseClass}" href="${escapeHtml(c.url || '#')}" target="_blank">${escapeHtml(c.label || '')}</a>`;
  }).join('\n      ');

  return snippet
    .replace('{{FLOW_NUM}}', String(flow.number || ''))
    .replace('{{FLOW_ICON_CLASS}}', '')
    .replace('{{FLOW_ICON_STYLE}}', 'background:var(--sofka-orange-dim);color:var(--sofka-orange);border:1px solid rgba(255,126,8,.25);')
    .replace('{{FLOW_ICON_TEXT}}', iconNum)
    .replace('{{FLOW_NAME_ES}}', `Flow ${flow.number}: ${escapeHtml(flow.nameEs || flow.name || '')}`)
    .replace('{{FLOW_NAME_EN}}', `Flow ${flow.number}: ${escapeHtml(flow.nameEn || '')}`)
    .replace('{{FLOW_SUBTITLE_ES}}', escapeHtml(flow.triggerEs || flow.trigger || ''))
    .replace('{{FLOW_SUBTITLE_EN}}', escapeHtml(flow.triggerEn || ''))
    .replace('{{FLOW_WHY_VALUE_ES}}', escapeHtml(flow.triggerEs || flow.trigger || ''))
    .replace('{{FLOW_WHY_VALUE_EN}}', escapeHtml(flow.triggerEn || ''))
    .replace('{{FLOW_EXERCISE_STEPS}}', steps)
    .replace('{{FLOW_SUCCESS_VALUE_ES}}', escapeHtml(flow.outputEs || flow.output || ''))
    .replace('{{FLOW_SUCCESS_VALUE_EN}}', escapeHtml(flow.outputEn || ''))
    .replace('{{FLOW_CTA_LINKS}}', ctaLinks);
}

// ── Component dispatcher ─────────────────────────────────────────────────────
function renderComponent(comp) {
  const data = comp.data || {};
  switch (comp.type) {
    case 'problem-grid': {
      const snippet = readSnippet('problem-grid.html');
      return snippet.replace('{{PROBLEM_CARDS}}', renderProblemCards(data.cards));
    }
    case 'antipatron': {
      const badItems = (data.bad.items || []).map(i => `<li>${escapeHtml(i)}</li>`).join('\n        ');
      const goodItems = (data.good.items || []).map(i => `<li>${escapeHtml(i)}</li>`).join('\n        ');
      return `<div class="antipatron">
      <div class="antipatron-col bad">
        <h4>${escapeHtml(data.bad.title)}</h4>
        <ul>${badItems}</ul>
      </div>
      <div class="antipatron-arrow">&#10140;</div>
      <div class="antipatron-col good">
        <h4>${escapeHtml(data.good.title)}</h4>
        <ul>${goodItems}</ul>
      </div>
    </div>`;
    }
    case 'cycle-visual': {
      const snippet = readSnippet('cycle-visual.html');
      return snippet.replace('{{CYCLE_STEPS}}', renderCycleSteps(data.steps));
    }
    case 'map-table': {
      const snippet = readSnippet('map-table.html');
      return snippet
        .replace('{{TABLE_HEADERS}}', renderTableHeaders(data.headers))
        .replace('{{TABLE_ROWS}}', renderTableRows(data.rows, data.headers));
    }
    case 'jarvis-cards': {
      const snippet = readSnippet('tool-card.html');
      return snippet.replace('{{TOOL_CARDS}}', renderToolCards(data.cards));
    }
    case 'timeline': {
      const snippet = readSnippet('timeline.html');
      return snippet.replace('{{TIMELINE_ITEMS}}', renderTimelineItems(data.items));
    }
    case 'compare-grid': {
      const snippet = readSnippet('compare-grid.html');
      return snippet
        .replace('{{COMPARE_BEFORE_TITLE}}', escapeHtml(data.before.title))
        .replace('{{COMPARE_BEFORE_ITEMS}}', renderCompareItems(data.before.items))
        .replace('{{COMPARE_AFTER_TITLE}}', escapeHtml(data.after.title))
        .replace('{{COMPARE_AFTER_ITEMS}}', renderCompareItems(data.after.items));
    }
    case 'metrics-row': {
      const snippet = readSnippet('metrics-row.html');
      return snippet.replace('{{METRIC_CARDS}}', renderMetricCards(data.metrics));
    }
    case 'semaforo-grid': {
      const snippet = readSnippet('semaforo-grid.html');
      return snippet.replace('{{SEMAFORO_CARDS}}', renderSemaforoCards(data.cards));
    }
    case 'vraid-box': {
      const snippet = readSnippet('vraid-box.html');
      return snippet
        .replace('{{VRAID_TITLE}}', escapeHtml(data.title))
        .replace('{{VRAID_LETTERS}}', renderVraidLetters(data.letters))
        .replace('{{VRAID_NOTE}}', data.note || '')
        .replace('{{VRAID_3X3_RULE_ES}}', escapeHtml(data.verificationRuleEs || ''))
        .replace('{{VRAID_3X3_RULE_EN}}', escapeHtml(data.verificationRuleEn || ''))
        .replace('{{VRAID_SIGNATURE_TEST_ES}}', escapeHtml(data.signatureTestEs || ''))
        .replace('{{VRAID_SIGNATURE_TEST_EN}}', escapeHtml(data.signatureTestEn || ''));
    }
    case 'callout': {
      return renderCallout(data.variant, data.title, data);
    }
    case 'decision-table': {
      const snippet = readSnippet('decision-table.html');
      return snippet
        .replace('{{TABLE_HEADERS}}', renderTableHeaders(data.headers))
        .replace('{{TABLE_ROWS}}', renderTableRows(data.rows, data.headers));
    }
    case 'guardrail-grid': {
      return renderGuardrails(data.doColumn, data.dontColumn);
    }
    case 'gate-box': {
      return `<div class="gate-box">${escapeHtml(data.text)}</div>`;
    }
    case 'acceptance-list': {
      const snippet = readSnippet('acceptance-list.html');
      const preamble = data.preamble ? `<p style="margin-bottom:1rem;">${escapeHtml(data.preamble)}</p>` : '';
      return preamble + snippet.replace('{{ACCEPTANCE_ITEMS}}', renderAcceptanceItems(data.items));
    }
    case 'testimonial-grid': {
      const snippet = readSnippet('testimonial-grid.html');
      return snippet.replace('{{TESTIMONIAL_CARDS}}', renderTestimonials(data.testimonials));
    }
    case 'case-highlight': {
      return `<div class="case-highlight">
      <div class="case-metric">
        <div class="big">${escapeHtml(data.metricValue)}</div>
        <div class="unit">${escapeHtml(data.metricUnit)}</div>
      </div>
      <div class="case-detail">
        <h4>${escapeHtml(data.title)}</h4>
        <p>${escapeHtml(data.description)}</p>
      </div>
    </div>`;
    }
    case 'recommendations': {
      const cards = (data.cards || []).map(c =>
        `<div class="rec-card">
        <h4>${escapeHtml(c.title)}</h4>
        <p>${escapeHtml(c.body)}</p>
      </div>`
      ).join('\n    ');
      return `<div class="recommendations">${cards}</div>`;
    }
    case 'inline-heading': {
      const level = data.level || 3;
      const tag = `h${level}`;
      return `<${tag}>${escapeHtml(data.text)}</${tag}>`;
    }
    case 'inline-table': {
      const snippet = readSnippet('decision-table.html');
      return snippet
        .replace('{{TABLE_HEADERS}}', renderTableHeaders(data.headers))
        .replace('{{TABLE_ROWS}}', renderTableRows(data.rows, data.headers));
    }
    case 'inline-paragraph': {
      if (data.isCode) {
        return `<pre style="margin:1rem 0;"><code>${escapeHtml(data.text)}</code></pre>`;
      }
      return `<p>${escapeHtml(data.text)}</p>`;
    }
    // ── v2 component types ────────────────────────────────────────────────
    case 'glossary-grid': {
      return renderGlossaryGrid(data.terms || data.cards || []);
    }
    case 'antipattern-table': {
      return renderAntiPatternTable(data.patterns || data.rows || []);
    }
    case 'profile-section': {
      return renderProfileSection(data.profiles || data.cards || []);
    }
    case 'apm-equation': {
      return renderApmEquation(data);
    }
    case 'gem-bar': {
      // v2 gem-bar: supports isPrimary/pulse via renderGemBar
      if (Array.isArray(data.gems) && data.gems.length > 0 && data.gems[0].isPrimary !== undefined) {
        return renderGemBar(data.gems);
      }
      // v1 fallback
      const links = (data.gems || []).map(g =>
        `<a class="gem-link" href="${escapeHtml(g.url)}" target="_blank">${escapeHtml(g.label)}</a>`
      ).join('\n      ');
      return `<div class="gem-bar">
      <div class="gem-bar-title">${escapeHtml(data.title)}</div>
      ${links}
    </div>`;
    }
    // ── v3 component types ────────────────────────────────────────────────
    case 'empezar-grid': {
      return renderEmpezarGrid(data.cards || data);
    }
    case 'metadata-table': {
      return renderMetadataTable(data);
    }
    // ── v5 component types ────────────────────────────────────────────────
    case 'prompt-copyable': {
      return renderPromptCopyable(data);
    }
    case 'calendar-grid': {
      return renderCalendarGrid(data.links || data);
    }
    default:
      process.stderr.write(`WARN: Unknown component type "${comp.type}", skipping.\n`);
      return `<!-- unknown component: ${escapeHtml(comp.type)} -->`;
  }
}

// ── Ruta Section (14-playbook roadmap) ─────────────────────────────────────
function renderRutaSection(manifest) {
  if (!manifest.crosslinks || !manifest.crosslinks.currentId) return '';
  var currentId = manifest.crosslinks.currentId;
  var registryPath = path.join(REFS_DIR, 'ecosystem-playbooks.json');
  var registry;
  try { registry = JSON.parse(fs.readFileSync(registryPath, 'utf8')); } catch(e) { return ''; }
  if (!Array.isArray(registry) || registry.length === 0) return '';

  var snippet = '';
  try { snippet = readSnippet('ruta-section.html'); } catch(e) {
    snippet = '<section id="ruta"><div class="section-header"><h2>' +
      renderBilingual('Mapa de <span>Ruta</span>', 'Route <span>Map</span>') +
      '</h2></div><div class="ruta-grid">{{RUTA_PLAYBOOKS}}</div></section>';
  }

  var cards = registry.map(function(pb) {
    var isCurrent = pb.id === currentId;
    var cls = 'ruta-card' + (isCurrent ? ' current' : '');
    var layerCls = 'ruta-layer ' + (pb.layer || 'foundation');
    return '<div class="' + cls + '">' +
      '<div class="ruta-id">' + escapeHtml(pb.id) + '</div>' +
      '<div class="ruta-name">' + renderBilingual(pb.nameEs || '', pb.nameEn || '') + '</div>' +
      '<span class="' + layerCls + '">' + escapeHtml(pb.layer || '') + '</span>' +
      '</div>';
  }).join('\n    ');

  return snippet.replace('{{RUTA_PLAYBOOKS}}', cards);
}

function renderEcosystemGemBar(manifest) {
  if (!manifest.crosslinks) return '';
  var registryPath = path.join(REFS_DIR, 'ecosystem-playbooks.json');
  var registry;
  try { registry = JSON.parse(fs.readFileSync(registryPath, 'utf8')); } catch(e) { return ''; }
  if (!Array.isArray(registry)) return '';

  var siblings = (manifest.crosslinks.siblings || []);
  var items = registry.filter(function(pb) {
    return siblings.indexOf(pb.id) >= 0 || siblings.length === 0;
  });
  if (items.length === 0) items = registry.slice(0, 5);

  var links = items.map(function(pb) {
    return '<a class="gem-link" href="#ruta">' + escapeHtml(pb.id + ' ' + (pb.gem || pb.slug || '')) + '</a>';
  }).join('\n  ');

  var snippet = '';
  try { snippet = readSnippet('gem-bar-ecosystem.html'); } catch(e) {
    snippet = '<div class="gem-bar"><div class="gem-bar-title">' +
      renderBilingual('Ecosistema Jarvis', 'Jarvis Ecosystem') +
      '</div>{{GEM_BAR_LINKS}}</div>';
  }
  return snippet.replace('{{GEM_BAR_LINKS}}', links);
}

// ── Main assembly ────────────────────────────────────────────────────────────
function assemble() {
  const { manifestPath, outputPath, brand } = parseArgs();
  process.stderr.write(`[assemble] Manifest : ${manifestPath}\n`);
  process.stderr.write(`[assemble] Output   : ${outputPath}\n`);
  process.stderr.write(`[assemble] Brand    : ${brand}\n`);

  const manifest = readJSON(manifestPath);
  const brandTokensPath = path.join(REFS_DIR, `brand-tokens-${brand}.json`);
  const tokens = readJSON(brandTokensPath);

  let componentCount = 0;
  const parts = [];

  // ── 1. Head ──────────────────────────────────────────────────────────────
  const isElRepo = manifest.mode === 'elrepo';
  process.stderr.write('[assemble] Building <head>... (mode: ' + (manifest.mode || 'ecosystem') + ')\n');
  let head = readSnippet(isElRepo ? 'elrepo-head.html' : 'head.html');
  // Replace META placeholders
  head = head
    .replace(/\{\{META_LANG\}\}/g, manifest.meta.language || 'es')
    .replace(/\{\{META_TITLE\}\}/g, escapeHtml(manifest.meta.title || ''))
    .replace(/\{\{META_COMPANY\}\}/g, escapeHtml(manifest.meta.company || ''));

  // Replace CSS token values from brand tokens
  if (tokens.cssCustomPropertyMap) {
    for (const [prop, value] of Object.entries(tokens.cssCustomPropertyMap)) {
      // The head.html has hardcoded token values — for non-sofka brands,
      // replace them with brand-specific values.
      // Match patterns like: --sofka-orange: #FF7E08;
      const escapedProp = prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`(${escapedProp}:\\s*)([^;]+)(;)`, 'g');
      head = head.replace(re, `$1${value}$3`);
    }
  }

  // Replace font URLs if brand has different fonts
  if (tokens.typography) {
    if (tokens.typography.googleFontsUrl) {
      head = head.replace(
        /https:\/\/fonts\.googleapis\.com\/css2[^"]+/g,
        tokens.typography.googleFontsUrl
      );
    }
    if (tokens.typography.fontshareUrl) {
      head = head.replace(
        /https:\/\/api\.fontshare\.com\/v2\/css[^"]+/g,
        tokens.typography.fontshareUrl
      );
    }
  }

  parts.push(head);

  // ── ELREPO MODE: alternative assembly path ───────────────────────────────
  if (isElRepo) {
    process.stderr.write('[assemble] ElRepo mode — assembling dark-palette artifact...\n');
    var elrepoArtifact = (manifest.artifact && manifest.artifact.primary) || 'repo-doc';
    var bodySnippetName = (elrepoArtifact === 'analyst-report') ? 'elrepo-analyst-report.html' : 'elrepo-radar.html';
    var body = '';
    try { body = readSnippet(bodySnippetName); } catch(e) {
      process.stderr.write('[assemble] WARNING: ' + bodySnippetName + ' not found, using elrepo-radar.html\n');
      body = readSnippet('elrepo-radar.html');
    }
    var logoUrl = (manifest.meta && manifest.meta.logoUrl) || '';
    var logoAlt = (manifest.meta && manifest.meta.logoAlt) || 'Sofka Technologies';
    var logoHtml = logoUrl ? '<img src="' + escapeHtml(logoUrl) + '" alt="' + escapeHtml(logoAlt) + '">' : '<span>' + escapeHtml(logoAlt) + '</span>';

    // Replace all HEADER placeholders
    body = body
      .replace(/\{\{HEADER_LOGO_HTML\}\}/g, logoHtml)
      .replace(/\{\{HEADER_TITLE\}\}/g, escapeHtml(manifest.meta.title || 'Jarvis ElRepo'))
      .replace(/\{\{HEADER_SUBTITLE\}\}/g, escapeHtml(manifest.meta.subtitle || 'Sofka Technologies · Release 1.0.1'));

    // Replace preamble chips
    var chips = '';
    if (manifest.preamble) {
      var p = manifest.preamble;
      if (p.type) chips += '<span class="jer-chip tipo">' + escapeHtml(p.type) + '</span>';
      if (p.subtype) chips += '<span class="jer-chip subtipo">' + escapeHtml(p.subtype) + '</span>';
      if (p.confidence) chips += '<span class="jer-chip confianza">Confianza: ' + escapeHtml(p.confidence) + '</span>';
      if (p.coverage) chips += '<span class="jer-chip cobertura">' + escapeHtml(p.coverage) + '</span>';
    }
    body = body.replace(/\{\{PREAMBLE_CHIPS\}\}/g, chips);

    // ElRepo nav (dark sticky nav with lang toggle)
    var elrepoNav = '';
    try { elrepoNav = readSnippet('elrepo-nav.html'); } catch(e) { elrepoNav = ''; }
    var navLogoText = manifest.meta.logoText || manifest.meta.title || 'Jarvis ElRepo';
    var navItems = '';
    if (manifest.nav && Array.isArray(manifest.nav.items)) {
      navItems = manifest.nav.items.map(function(item) {
        return '<a href="#' + (item.id || '') + '">' +
          '<span class="es">' + escapeHtml(item.labelEs || item.label || '') + '</span>' +
          '<span class="en">' + escapeHtml(item.labelEn || item.label || '') + '</span></a>';
      }).join('');
    }
    elrepoNav = elrepoNav
      .replace(/\{\{NAV_LOGO_TEXT\}\}/g, escapeHtml(navLogoText))
      .replace(/\{\{NAV_ITEMS\}\}/g, navItems);
    body = body.replace(/\{\{ELREPO_NAV\}\}/g, elrepoNav);

    // Ecosystem CTA links from brand tokens
    var eco = tokens.ecosystem || {};
    var gems = eco.gems || {};
    body = body
      .replace(/\{\{CTA_LAFORJA_URL\}\}/g, (gems.laforja && gems.laforja.url) || eco.gemini || 'https://gemini.google.com')
      .replace(/\{\{CTA_LAREU_URL\}\}/g, (gems.lareu && gems.lareu.url) || eco.gemini || 'https://gemini.google.com')
      .replace(/\{\{CTA_LAVUELTA_URL\}\}/g, (gems.lavuelta && gems.lavuelta.url) || eco.gemini || 'https://gemini.google.com')
      .replace(/\{\{CTA_ELREPO_URL\}\}/g, (gems.elrepo && gems.elrepo.url) || eco.gemini || 'https://gemini.google.com')
      .replace(/\{\{CTA_LAINFO_URL\}\}/g, (gems.lainfo && gems.lainfo.url) || eco.gemini || 'https://gemini.google.com')
      .replace(/\{\{CTA_NANO_URL\}\}/g, (tokens.infographic && tokens.infographic.nanoBananaUrl) || 'https://imagen.sofka.com.co');

    // Dashboard, Prompt Library, Ghost Menu snippets
    var dashSnippet = ''; try { dashSnippet = readSnippet('elrepo-dashboard.html'); } catch(e) {}
    var promptLibSnippet = ''; try { promptLibSnippet = readSnippet('elrepo-prompt-library.html'); } catch(e) {}
    var ghostSnippet = ''; try { ghostSnippet = readSnippet('elrepo-ghost-menu-trailer.html'); } catch(e) {}
    ghostSnippet = ghostSnippet
      .replace(/\{\{GHOST_MENU_VERSION\}\}/g, (tokens.ghostMenu && tokens.ghostMenu.version) || 'v1.0.1')
      .replace(/\{\{GHOST_MENU_SURFACE\}\}/g, 'auto');
    body = body
      .replace(/\{\{DASHBOARD_SECTION\}\}/g, dashSnippet)
      .replace(/\{\{PROMPT_LIBRARY_SECTION\}\}/g, promptLibSnippet)
      .replace(/\{\{GHOST_MENU_TRAILER\}\}/g, ghostSnippet);

    // Replace ecosystem CTA placeholders in prompt library snippets
    body = body
      .replace(/\{\{CTA_LAFORJA_URL\}\}/g, (gems.laforja && gems.laforja.url) || '')
      .replace(/\{\{CTA_LAREU_URL\}\}/g, (gems.lareu && gems.lareu.url) || '')
      .replace(/\{\{CTA_LAVUELTA_URL\}\}/g, (gems.lavuelta && gems.lavuelta.url) || '')
      .replace(/\{\{CTA_ELREPO_URL\}\}/g, (gems.elrepo && gems.elrepo.url) || '')
      .replace(/\{\{CTA_LAINFO_URL\}\}/g, (gems.lainfo && gems.lainfo.url) || '')
      .replace(/\{\{CTA_NANO_URL\}\}/g, (tokens.infographic && tokens.infographic.nanoBananaUrl) || '');

    // Replace all remaining section placeholders with manifest content or empty string
    body = body.replace(/\{\{([A-Z_]+)\}\}/g, function(match, key) {
      // Try to find content in manifest.sections or manifest directly
      var lowerKey = key.toLowerCase();
      if (manifest.content && manifest.content[lowerKey]) return manifest.content[lowerKey];
      if (manifest[lowerKey]) return typeof manifest[lowerKey] === 'string' ? manifest[lowerKey] : '';
      return '';
    });

    parts.push(body);

    // ElRepo footer
    var elrepoFooter = '';
    try { elrepoFooter = readSnippet('elrepo-footer.html'); } catch(e) { elrepoFooter = '</body></html>'; }
    elrepoFooter = elrepoFooter
      .replace(/\{\{FOOTER_COMPANY\}\}/g, escapeHtml(manifest.meta.company || 'Sofka Technologies'))
      .replace(/\{\{FOOTER_COPYRIGHT\}\}/g, escapeHtml(manifest.footer && manifest.footer.copyright || 'Jarvis ElRepo de Sofka Technologies. Release 1.0.1'))
      .replace(/\{\{FOOTER_COVERAGE\}\}/g, escapeHtml(manifest.footer && manifest.footer.coverage || ''))
      .replace(/\{\{FOOTER_OPENNESS\}\}/g, escapeHtml(manifest.footer && manifest.footer.openness || ''));
    parts.push(elrepoFooter);

    // Write elrepo output
    var elrepoHtml = parts.join('\n');
    try {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, elrepoHtml, 'utf8');
    } catch (err) {
      process.stderr.write('ERROR: Cannot write output "' + outputPath + '": ' + err.message + '\n');
      process.exit(1);
    }
    var elrepoStats = fs.statSync(outputPath);
    var elrepoSizeKB = (elrepoStats.size / 1024).toFixed(1);
    process.stderr.write('\n[assemble] ElRepo done.\n');
    process.stderr.write('[assemble] File size : ' + elrepoSizeKB + ' KB\n');
    process.stderr.write('[assemble] Artifact  : ' + elrepoArtifact + '\n');
    var elrepoSummary = { output: outputPath, sizeKB: parseFloat(elrepoSizeKB), mode: 'elrepo', artifact: elrepoArtifact };
    process.stdout.write(JSON.stringify(elrepoSummary, null, 2) + '\n');
    return;
  }

  // ── 2. Nav ───────────────────────────────────────────────────────────────
  process.stderr.write('[assemble] Building <nav>...\n');
  let nav = readSnippet('nav.html');
  const navLogoUrl = (manifest.nav && manifest.nav.logoUrl) || (manifest.meta && manifest.meta.logoUrl) || '';
  const navLogoText = (manifest.nav && manifest.nav.logoText) || manifest.meta.company || '';
  const navLogoAlt = (manifest.meta && manifest.meta.logoAlt) || navLogoText;
  nav = nav
    .replace('{{NAV_LOGO_HTML}}', renderLogoHtml(navLogoUrl, navLogoAlt, navLogoText))
    .replace('{{NAV_ITEMS}}', renderNavItems(manifest));
  parts.push(nav);

  // ── 3. Hero ──────────────────────────────────────────────────────────────
  process.stderr.write('[assemble] Building <header.hero>...\n');
  let hero = readSnippet('hero.html');
  const heroLogoUrl = (manifest.hero && manifest.hero.logoUrl) || (manifest.meta && manifest.meta.logoUrl) || '';
  const heroLogoText = (manifest.hero && manifest.hero.logoText) || manifest.meta.company || '';
  const heroLogoAlt = (manifest.meta && manifest.meta.logoAlt) || heroLogoText;
  hero = hero
    .replace('{{HERO_LOGO_HTML}}', renderLogoHtml(heroLogoUrl, heroLogoAlt, heroLogoText))
    .replace('{{HERO_BADGES}}', renderBadges(manifest.meta.badges, 'hero-badge'))
    .replace('{{HERO_H1_PLAIN}}', escapeHtml(manifest.hero.h1Plain || ''))
    .replace('{{HERO_H1_HIGHLIGHT}}', escapeHtml(manifest.hero.h1Highlight || ''))
    .replace('{{HERO_SUBTITLE}}', escapeHtml(manifest.hero.subtitle || ''))
    .replace('{{HERO_METHOD_BADGES}}', (function() {
      var mb = manifest.hero.methodBadges || manifest.meta.methodBadges || [];
      if (!Array.isArray(mb) || mb.length === 0) return '';
      return mb.map(function(b) {
        return '<span class="method-badge ' + (b.variant || '') + '">' + escapeHtml(b.label || '') + '</span>';
      }).join(' ');
    })())
    .replace('{{HERO_KPIS}}', renderKpis(manifest.hero.kpis));
  parts.push(hero);

  // ── 4. Sections ──────────────────────────────────────────────────────────
  const sections = manifest.sections || [];
  process.stderr.write(`[assemble] Building ${sections.length} sections...\n`);

  for (const section of sections) {
    // Section header — bilingual support for v2
    let sectionHeader = readSnippet('section-header.html');
    const hasBilingualH2 = section.headerTitleEs || section.headerTitleEn;
    const h2Plain = hasBilingualH2
      ? renderBilingual(section.headerTitleEs || section.headerTitle || '', section.headerTitleEn || '')
      : escapeHtml(section.headerTitle || '');
    const h2Highlight = section.headerHighlightEs
      ? renderBilingual(section.headerHighlightEs || '', section.headerHighlightEn || '')
      : escapeHtml(section.headerHighlight || '');
    const descHtml = section.headerDescriptionEs
      ? renderBilingual(section.headerDescriptionEs || '', section.headerDescriptionEn || '')
      : escapeHtml(section.headerDescription || '');
    sectionHeader = sectionHeader
      .replace('{{SECTION_ID}}', escapeHtml(section.id || ''))
      .replace('{{SECTION_H2_PLAIN}}', h2Plain)
      .replace('{{SECTION_H2_HIGHLIGHT}}', h2Highlight)
      .replace('{{SECTION_DESC}}', descHtml);
    parts.push(sectionHeader);

    // Components
    for (const comp of (section.components || [])) {
      parts.push(renderComponent(comp));
      componentCount++;
    }

    // Close section
    parts.push('</section>');

    // Divider
    const showDivider = section.showDivider !== false;
    if (showDivider) {
      parts.push('<hr class="section-divider">');
    }
  }

  // ── 5. Katas ─────────────────────────────────────────────────────────────
  const katas = manifest.katas || [];
  if (katas.length > 0) {
    process.stderr.write(`[assemble] Building ${katas.length} katas...\n`);
    parts.push(`<section id="katas">
  <div class="section-header">
    <h2>Katas de <span>Adopcion</span></h2>
    <p>Ejercicios practicos para dominar cada fase del ciclo.</p>
  </div>`);

    for (const kata of katas) {
      parts.push(renderKataCard(kata));
      componentCount++;
    }

    parts.push('</section>');
    parts.push('<hr class="section-divider">');
  }

  // ── 6. Flows ─────────────────────────────────────────────────────────────
  const flows = manifest.flows || [];
  if (flows.length > 0) {
    process.stderr.write(`[assemble] Building ${flows.length} flows...\n`);

    // Architecture box
    const archLayers = manifest.architectureLayers || [];
    if (archLayers.length > 0) {
      let archSnippet = readSnippet('architecture-box.html');
      archSnippet = archSnippet
        .replace('{{ARCH_TITLE}}', 'Arquitectura de Operacion')
        .replace('{{ARCH_LAYERS}}', renderArchLayers(archLayers));
      parts.push(`<section id="flujos">
  <div class="section-header">
    <h2>Flujos de <span>Trabajo</span></h2>
    <p>Los ${flows.length} flujos que automatizan las ceremonias del equipo.</p>
  </div>`);
      parts.push(archSnippet);
    } else {
      parts.push(`<section id="flujos">
  <div class="section-header">
    <h2>Flujos de <span>Trabajo</span></h2>
    <p>Los ${flows.length} flujos que automatizan las ceremonias del equipo.</p>
  </div>`);
    }

    // Flow map table
    const flowTableHeaders = ['#', 'Nombre', 'Cuando', 'Secuencia Jarvis', 'Salida'];
    const flowTableRows = flows.map(f => ({
      cells: [
        { text: String(f.number), bold: true },
        { text: f.name, bold: true },
        { text: f.trigger },
        { text: (f.jarvisSequence || []).join(' → '), jarvisName: true },
        { text: f.output }
      ]
    }));

    const flowTableSnippet = readSnippet('map-table.html');
    parts.push(flowTableSnippet
      .replace('{{TABLE_HEADERS}}', renderTableHeaders(flowTableHeaders))
      .replace('{{TABLE_ROWS}}', renderTableRows(flowTableRows, flowTableHeaders)));

    // Individual flow cards
    for (const flow of flows) {
      parts.push(renderFlowCard(flow));
      componentCount++;
    }

    parts.push('</section>');
  }

  // ── 6b. Ruta Section (ecosystem crosslinks) ──────────────────────────────
  const rutaHtml = renderRutaSection(manifest);
  if (rutaHtml) {
    process.stderr.write('[assemble] Injecting ruta section (ecosystem crosslinks)...\n');
    parts.push(rutaHtml);
  }

  // ── 6c. Ecosystem Gem Bar ───────────────────────────────────────────────
  const gemBarHtml = renderEcosystemGemBar(manifest);
  if (gemBarHtml) {
    process.stderr.write('[assemble] Injecting ecosystem gem-bar...\n');
    parts.push(gemBarHtml);
  }

  // ── 7. Footer ────────────────────────────────────────────────────────────
  process.stderr.write('[assemble] Building <footer>...\n');
  let footer = readSnippet('footer.html');
  const footerBadges = manifest.footer.badges || manifest.meta.badges || [];
  const footerLogoUrl = (manifest.footer && manifest.footer.logoUrl) || (manifest.meta && manifest.meta.logoUrl) || '';
  const footerLogoText = (manifest.footer && manifest.footer.logoText) || manifest.meta.company || '';
  const footerLogoAlt = (manifest.meta && manifest.meta.logoAlt) || footerLogoText;
  footer = footer
    .replace('{{FOOTER_LOGO_HTML}}', renderLogoHtml(footerLogoUrl, footerLogoAlt, footerLogoText))
    .replace('{{FOOTER_BADGES}}', renderBadges(footerBadges, 'footer-badge'))
    .replace('{{FOOTER_COPYRIGHT}}', manifest.footer.copyright || '');
  parts.push(footer);

  // ── 8. Modals (v2) ──────────────────────────────────────────────────────
  const allModalsHtml = renderAllModals(manifest);
  if (allModalsHtml) {
    process.stderr.write(`[assemble] Injecting modal overlays...\n`);
    // Insert modals before footer (last part)
    parts.splice(parts.length - 1, 0, allModalsHtml);
  }

  // ── Write output ─────────────────────────────────────────────────────────
  let html = parts.join('\n');
  // Replace {{MODALS}} placeholder if present in any snippet
  html = html.replace(/\{\{MODALS\}\}/g, allModalsHtml);

  try {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html, 'utf8');
  } catch (err) {
    process.stderr.write(`ERROR: Cannot write output "${outputPath}": ${err.message}\n`);
    process.exit(1);
  }

  const stats = fs.statSync(outputPath);
  const sizeKB = (stats.size / 1024).toFixed(1);

  process.stderr.write(`\n[assemble] Done.\n`);
  process.stderr.write(`[assemble] File size     : ${sizeKB} KB\n`);
  process.stderr.write(`[assemble] Sections      : ${sections.length}\n`);
  process.stderr.write(`[assemble] Components    : ${componentCount}\n`);
  process.stderr.write(`[assemble] Katas         : ${katas.length}\n`);
  process.stderr.write(`[assemble] Flows         : ${flows.length}\n`);

  // stdout: machine-readable summary
  const summary = {
    output: outputPath,
    sizeKB: parseFloat(sizeKB),
    sections: sections.length,
    components: componentCount,
    katas: katas.length,
    flows: flows.length
  };
  process.stdout.write(JSON.stringify(summary, null, 2) + '\n');
  process.exit(0);
}

assemble();
