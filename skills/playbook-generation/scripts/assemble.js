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
    return `<div class="vraid-letter">
        <div class="letter">${escapeHtml(l.letter)}</div>
        <div class="meaning">${escapeHtml(l.meaning)}</div>
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
  let content = '';
  if (data.items && Array.isArray(data.items)) {
    content = `<ul>${data.items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
  } else {
    content = escapeHtml(data.body || '');
  }
  return snippet
    .replace('{{CALLOUT_VARIANT}}', variant.replace('callout-', ''))
    .replace('{{CALLOUT_TITLE}}', escapeHtml(title))
    .replace('{{CALLOUT_CONTENT}}', content);
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

  const steps = (kata.steps || []).map(s => {
    const toolBadge = s.tool ? ` <span style="color:var(--sofka-info);font-size:.75rem;">[${escapeHtml(s.tool)}]</span>` : '';
    const tip = s.tip ? ` <em style="font-size:.78rem;color:var(--sofka-gray-500);">Tip: ${escapeHtml(s.tip)}</em>` : '';
    return `<li>${escapeHtml(s.instruction)}${toolBadge}${tip}</li>`;
  }).join('\n          ');

  const criteria = (kata.successCriteria || []).map(c => `&#10003; ${escapeHtml(c)}`).join('<br>');

  const antiPatterns = (kata.antiPatterns || []).map(a => `&#10007; ${escapeHtml(a)}`).join('<br>');
  const bestPractice = antiPatterns || 'Sigue las instrucciones paso a paso.';

  return snippet
    .replace('{{KATA_ICON_CLASS}}', icon.cls)
    .replace('{{KATA_ICON_TEXT}}', icon.lbl)
    .replace('{{KATA_GEM_NAME}}', `Kata ${kata.number}: ${escapeHtml(kata.name)}`)
    .replace('{{KATA_GEM_SUBTITLE}}', escapeHtml(kata.objective || ''))
    .replace('{{KATA_WHY_LABEL}}', 'Objetivo')
    .replace('{{KATA_WHY_VALUE}}', escapeHtml(kata.objective || ''))
    .replace('{{KATA_EXERCISE_LABEL}}', 'Ejercicio')
    .replace('{{KATA_EXERCISE_STEPS}}', steps)
    .replace('{{KATA_SUCCESS_LABEL}}', 'Criterios de Exito')
    .replace('{{KATA_SUCCESS_VALUE}}', criteria)
    .replace('{{KATA_BEST_PRACTICE_LABEL}}', 'Buenas Practicas')
    .replace('{{KATA_BEST_PRACTICE_VALUE}}', bestPractice)
    .replace('{{KATA_CHECKPOINT}}', escapeHtml(kata.checkpoint || `Gate Kata ${kata.number}: Todos los criterios cumplidos.`));
}

function renderFlowCard(flow) {
  const snippet = readSnippet('flow-card.html');

  // Build Jarvis sequence as step items
  const seq = (flow.jarvisSequence || []);
  const steps = seq.map((j, i) => `<li>${escapeHtml(j)}</li>`).join('\n          ');

  const iconNum = flow.number < 10 ? `0${flow.number}` : `${flow.number}`;

  return snippet
    .replace('{{FLOW_ICON_CLASS}}', '')
    .replace('{{FLOW_ICON_STYLE}}', 'background:var(--sofka-orange-dim);color:var(--sofka-orange);border:1px solid rgba(255,126,8,.25);')
    .replace('{{FLOW_ICON_TEXT}}', iconNum)
    .replace('{{FLOW_NAME}}', `Flow ${flow.number}: ${escapeHtml(flow.name)}`)
    .replace('{{FLOW_SUBTITLE}}', escapeHtml(flow.trigger || ''))
    .replace('{{FLOW_WHY_LABEL}}', 'Cuando')
    .replace('{{FLOW_WHY_VALUE}}', escapeHtml(flow.trigger || ''))
    .replace('{{FLOW_EXERCISE_LABEL}}', 'Secuencia Jarvis')
    .replace('{{FLOW_EXERCISE_STEPS}}', steps)
    .replace('{{FLOW_SUCCESS_LABEL}}', 'Salida')
    .replace('{{FLOW_SUCCESS_VALUE}}', escapeHtml(flow.output || ''));
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
        .replace('{{VRAID_NOTE}}', data.note || '');
    }
    case 'gem-bar': {
      const links = (data.gems || []).map(g =>
        `<a class="gem-link" href="${escapeHtml(g.url)}" target="_blank">${escapeHtml(g.label)}</a>`
      ).join('\n      ');
      return `<div class="gem-bar">
      <div class="gem-bar-title">${escapeHtml(data.title)}</div>
      ${links}
    </div>`;
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
    default:
      process.stderr.write(`WARN: Unknown component type "${comp.type}", skipping.\n`);
      return `<!-- unknown component: ${escapeHtml(comp.type)} -->`;
  }
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
  process.stderr.write('[assemble] Building <head>...\n');
  let head = readSnippet('head.html');
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

  // ── 2. Nav ───────────────────────────────────────────────────────────────
  process.stderr.write('[assemble] Building <nav>...\n');
  let nav = readSnippet('nav.html');
  const navLogo = (manifest.nav && manifest.nav.logoText) || manifest.meta.company || '';
  nav = nav
    .replace('{{META_COMPANY}}', escapeHtml(navLogo))
    .replace('{{NAV_ITEMS}}', renderNavItems(manifest));
  parts.push(nav);

  // ── 3. Hero ──────────────────────────────────────────────────────────────
  process.stderr.write('[assemble] Building <header.hero>...\n');
  let hero = readSnippet('hero.html');
  hero = hero
    .replace('{{META_COMPANY}}', escapeHtml(manifest.hero.logoText || manifest.meta.company || ''))
    .replace('{{HERO_BADGES}}', renderBadges(manifest.meta.badges, 'hero-badge'))
    .replace('{{HERO_H1_PLAIN}}', escapeHtml(manifest.hero.h1Plain || ''))
    .replace('{{HERO_H1_HIGHLIGHT}}', escapeHtml(manifest.hero.h1Highlight || ''))
    .replace('{{HERO_SUBTITLE}}', escapeHtml(manifest.hero.subtitle || ''))
    .replace('{{HERO_KPIS}}', renderKpis(manifest.hero.kpis));
  parts.push(hero);

  // ── 4. Sections ──────────────────────────────────────────────────────────
  const sections = manifest.sections || [];
  process.stderr.write(`[assemble] Building ${sections.length} sections...\n`);

  for (const section of sections) {
    // Section header
    let sectionHeader = readSnippet('section-header.html');
    const h2Plain = section.headerTitle || '';
    const h2Highlight = section.headerHighlight || '';
    sectionHeader = sectionHeader
      .replace('{{SECTION_ID}}', escapeHtml(section.id || ''))
      .replace('{{SECTION_H2_PLAIN}}', escapeHtml(h2Plain))
      .replace('{{SECTION_H2_HIGHLIGHT}}', escapeHtml(h2Highlight))
      .replace('{{SECTION_DESC}}', escapeHtml(section.headerDescription || ''));
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

  // ── 7. Footer ────────────────────────────────────────────────────────────
  process.stderr.write('[assemble] Building <footer>...\n');
  let footer = readSnippet('footer.html');
  const footerBadges = manifest.footer.badges || manifest.meta.badges || [];
  footer = footer
    .replace('{{FOOTER_LOGO}}', escapeHtml(manifest.footer.logoText || manifest.meta.company || ''))
    .replace('{{FOOTER_BADGES}}', renderBadges(footerBadges, 'footer-badge'))
    .replace('{{FOOTER_COPYRIGHT}}', manifest.footer.copyright || '');
  parts.push(footer);

  // ── Write output ─────────────────────────────────────────────────────────
  const html = parts.join('\n');

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
