#!/usr/bin/env node
/**
 * assemble-paginated.js
 *
 * Builds a print-first A4 paginated HTML document from a manifest + brand tokens.
 * Used for: ask, preview, qa, proposal, annex formats.
 *
 * Usage:
 *   node assemble-paginated.js <manifest.json> [output.html] [--brand=metodologia]
 */

const fs = require('fs');
const path = require('path');

// ════ CLI ════
var args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node assemble-paginated.js <manifest.json> [output.html] [--brand=name]');
  process.exit(1);
}

var manifestPath = args[0];
var outputPath = null;
var brandName = 'metodologia';

for (var i = 1; i < args.length; i++) {
  if (args[i].startsWith('--brand=')) {
    brandName = args[i].split('=')[1];
  } else if (!args[i].startsWith('--')) {
    outputPath = args[i];
  }
}

if (!fs.existsSync(manifestPath)) {
  console.error('Manifest not found: ' + manifestPath);
  process.exit(1);
}

// ════ LOAD ════
var manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

var pluginRoot = path.resolve(__dirname, '../../..');
var brandTokensPath = path.join(pluginRoot, 'references', 'brand-tokens-' + brandName + '.json');
if (!fs.existsSync(brandTokensPath)) {
  console.error('Brand tokens not found: ' + brandTokensPath);
  process.exit(1);
}
var brandTokens = JSON.parse(fs.readFileSync(brandTokensPath, 'utf8'));

var snippetsDir = path.join(pluginRoot, 'skills/playbook-generation/snippets/paginated');

function readSnippet(name) {
  var p = path.join(snippetsDir, name);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
}

// ════ HELPERS ════
function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function fillPlaceholders(template, data) {
  var result = template;
  Object.keys(data || {}).forEach(function(key) {
    var pattern = new RegExp('\\{\\{' + key + '\\}\\}', 'g');
    result = result.replace(pattern, data[key] != null ? String(data[key]) : '');
  });
  return result;
}

function renderCSSTokens(tokens) {
  var lines = [];
  Object.keys(tokens || {}).forEach(function(key) {
    lines.push('  ' + key + ': ' + tokens[key] + ';');
  });
  return lines.join('\n');
}

function renderBrandLockup() {
  var company = brandTokens.meta.company || 'Brand';
  var ia = '';
  if (company.toLowerCase().indexOf('ia') !== -1) {
    var idx = company.toLowerCase().lastIndexOf('ia');
    var pre = company.substring(0, idx);
    var post = company.substring(idx);
    ia = escapeHtml(pre) + '<span class="ia">' + escapeHtml(post) + '</span>';
  } else {
    ia = escapeHtml(company);
  }
  return '<svg width="20" height="20" viewBox="0 0 20 20" fill="' + brandTokens.colors.primary + '" aria-hidden="true"><circle cx="10" cy="10" r="8"/></svg> <span>' + ia + '</span>';
}

// ════ PAGE RENDERERS ════
function renderCoverPage(page, totalPages) {
  var d = page.data || {};
  var template = readSnippet('page-cover.html');
  return fillPlaceholders(template, {
    BRAND_LOCKUP_HTML: renderBrandLockup(),
    DOC_ID: manifest.docId || 'DOC-001',
    COVER_TITLE_PRE: escapeHtml(d.titlePreEs || d.title_pre || manifest.title || ''),
    COVER_TITLE_HIGHLIGHT: escapeHtml(d.titleHighlightEs || d.title_highlight || manifest.titleHighlight || ''),
    COVER_SUBTITLE: escapeHtml(d.subtitleEs || d.subtitle || ''),
    COVER_VERSION: escapeHtml(d.version || manifest.version || 'v1.0'),
    COVER_DATE: escapeHtml(d.date || manifest.date || new Date().toISOString().slice(0,10)),
    COVER_CLIENT: escapeHtml(d.client || manifest.client || ''),
    COMPANY_NAME: escapeHtml(brandTokens.meta.company),
    COMPANY_URL: escapeHtml(brandTokens.meta.primaryUrl || ''),
    COMPANY_COPYRIGHT: escapeHtml(brandTokens.meta.copyright || '')
  });
}

function renderFunnel(stages) {
  var template = readSnippet('funnel-authority.html');
  var data = {};
  for (var i = 1; i <= 4; i++) {
    var s = (stages && stages[i-1]) || {};
    data['TIER_' + i + '_LABEL'] = escapeHtml(s.label || s.labelEs || 'Tier ' + i);
    data['TIER_' + i + '_BODY'] = escapeHtml(s.body || s.bodyEs || '');
  }
  return fillPlaceholders(template, data);
}

function renderBridge(b) {
  var template = readSnippet('bridge.html');
  return fillPlaceholders(template, {
    LEFT_LABEL: escapeHtml(b.leftLabel || 'Pregunta'),
    LEFT_TITLE: escapeHtml(b.leftTitle || ''),
    LEFT_BODY: escapeHtml(b.leftBody || ''),
    SPAN_LABEL: escapeHtml(b.spanLabel || 'evidencia'),
    RIGHT_LABEL: escapeHtml(b.rightLabel || 'Respuesta'),
    RIGHT_TITLE: escapeHtml(b.rightTitle || ''),
    RIGHT_BODY: escapeHtml(b.rightBody || ''),
    EVIDENCE_TAGS: b.evidenceTags ? b.evidenceTags.map(function(t) { return '<span class="evbadge ' + (t.type || 'sup') + '">' + escapeHtml(t.label || '') + '</span>'; }).join('') : ''
  });
}

function renderMinto(m) {
  var template = readSnippet('minto-block.html');
  var supports = (m.supports || []).map(function(s) {
    return '<li>' + escapeHtml(s.text || s.textEs || '') +
      (s.pillarTag ? ' <span class="minto-pilar-tag">' + escapeHtml(s.pillarTag) + '</span>' : '') +
      (s.evTag ? ' <span class="minto-ev-tag">' + escapeHtml(s.evTag) + '</span>' : '') +
      '</li>';
  }).join('\n');
  return fillPlaceholders(template, {
    MINTO_LABEL: escapeHtml(m.label || 'MINTO · ' + brandTokens.meta.company),
    MINTO_CONCLUSION: escapeHtml(m.conclusion || m.conclusionEs || ''),
    MINTO_SUPPORTS: supports
  });
}

function renderStairway(steps) {
  var template = readSnippet('stairway.html');
  var data = {};
  for (var i = 1; i <= 4; i++) {
    var s = (steps && steps[i-1]) || {};
    data['STEP_' + i + '_TITLE'] = escapeHtml(s.title || s.titleEs || 'Step ' + i);
    data['STEP_' + i + '_DESC'] = escapeHtml(s.desc || s.descEs || '');
  }
  return fillPlaceholders(template, data);
}

function renderStamp(s) {
  var template = readSnippet('stamp-box.html');
  return fillPlaceholders(template, {
    STAMP_AMOUNT: escapeHtml(s.amount || ''),
    STAMP_LABEL: escapeHtml(s.label || s.labelEs || '')
  });
}

function renderGoSignal(g) {
  var template = readSnippet('go-signal.html');
  return fillPlaceholders(template, {
    GO_CRITERIA: escapeHtml(g.go || ''),
    CAUTION_CRITERIA: escapeHtml(g.caution || ''),
    NO_GO_CRITERIA: escapeHtml(g.noGo || g.no_go || '')
  });
}

function renderCallout(c) {
  var template = readSnippet('callout.html');
  return fillPlaceholders(template, {
    CALLOUT_VARIANT: c.variant || '',
    CALLOUT_KICKER: escapeHtml(c.kicker || c.kickerEs || 'NOTA'),
    CALLOUT_BODY: escapeHtml(c.body || c.bodyEs || '')
  });
}

function renderPricingTable(t) {
  var template = readSnippet('pricing-table.html');
  var rows = (t.rows || []).map(function(r) {
    return '<tr><td>' + escapeHtml(r.col1 || '') + '</td><td>' + escapeHtml(r.col2 || '') + '</td><td>' + escapeHtml(r.col3 || '') + '</td><td>' + escapeHtml(r.col4 || '') + '</td></tr>';
  }).join('\n    ');
  return fillPlaceholders(template, {
    COL_1: escapeHtml(t.col1 || 'Componente'),
    COL_2: escapeHtml(t.col2 || 'Precio'),
    COL_3: escapeHtml(t.col3 || 'Duracion'),
    COL_4: escapeHtml(t.col4 || 'Descuento'),
    PRICING_ROWS: rows,
    TOTAL_LABEL: escapeHtml(t.totalLabel || 'Total'),
    TOTAL_PRICE: escapeHtml(t.totalPrice || ''),
    TOTAL_DURATION: escapeHtml(t.totalDuration || ''),
    TOTAL_DISCOUNT: escapeHtml(t.totalDiscount || ''),
    PRICING_NOTE: escapeHtml(t.note || '')
  });
}

function renderATOC(items) {
  var liItems = (items || []).map(function(item, idx) {
    return '<li><a href="#' + escapeHtml(item.pageId) + '"><span class="ttl">' + escapeHtml(item.title) + '</span><span class="dots"></span><span class="pg">' + String(item.pageNum || idx + 1).padStart(2, '0') + '</span></a></li>';
  }).join('\n  ');
  return '<ol class="atoc">\n  ' + liItems + '\n</ol>';
}

function renderXrefStrip(items) {
  var chips = (items || []).map(function(item) {
    return '<a class="xref-chip" href="' + escapeHtml(item.href) + '">' + escapeHtml(item.label) + '</a>';
  }).join('\n  ');
  return '<div class="xref-strip">\n  ' + chips + '\n</div>';
}

// ════ PAGE BODY RENDERER ════
function renderPageBody(page) {
  var d = page.data || {};
  var pattern = page.primaryPattern || page.type;
  var html = '';

  if (d.h1Es || d.h1) {
    html += '<h1>' + escapeHtml(d.h1Es || d.h1) + '</h1>\n';
  }
  if (d.subtitleEs || d.subtitle) {
    html += '<p class="subtitle">' + escapeHtml(d.subtitleEs || d.subtitle) + '</p>\n';
  }

  switch (pattern) {
    case 'minto':
      html += renderMinto({
        label: d.mintoLabel,
        conclusion: d.mintoConclusionEs || d.mintoConclusion,
        supports: d.mintoSupports || []
      });
      break;
    case 'funnel':
      html += renderFunnel(d.funnelStages || []);
      break;
    case 'bridge':
      if (d.questions) {
        d.questions.forEach(function(q) {
          html += renderBridge({
            leftLabel: q.leftLabel || 'Pregunta',
            leftTitle: q.questionTitle || q.questionTitleEs || '',
            leftBody: q.questionBody || q.questionEs || '',
            spanLabel: q.spanLabel || 'evidencia',
            rightLabel: q.rightLabel || 'Respuesta',
            rightTitle: q.answerTitle || q.answerTitleEs || '',
            rightBody: q.answerBody || q.answerEs || '',
            evidenceTags: q.evidenceTags || []
          });
        });
      } else if (d.bridges) {
        d.bridges.forEach(function(b) { html += renderBridge(b); });
      }
      break;
    case 'stairway':
      html += renderStairway(d.steps || []);
      break;
    case 'stamp':
      html += renderStamp({ amount: d.stampAmount, label: d.stampLabel });
      if (d.calloutEs) {
        html += renderCallout({ kicker: 'NOTA', body: d.calloutEs });
      }
      break;
    case 'go-signal':
      html += renderGoSignal(d.goSignal || {});
      break;
    case 'callout':
      if (d.callouts) {
        d.callouts.forEach(function(c) { html += renderCallout(c); });
      } else if (d.painPoints) {
        d.painPoints.forEach(function(p) {
          html += renderCallout({ variant: 'warning', kicker: 'DOLOR', body: p.bodyEs || p.body || '' });
        });
      } else if (d.calloutBodyEs) {
        html += renderCallout({ kicker: d.calloutKickerEs || 'NOTA', body: d.calloutBodyEs });
      }
      break;
    case 'pricing-table':
      html += renderPricingTable(d.pricingTable || d);
      break;
    case 'atoc':
      html += renderATOC(d.atocItems || []);
      break;
    case 'xref':
      html += renderXrefStrip(d.xrefItems || []);
      break;
    default:
      // Generic content with body paragraphs
      if (d.bodyEs || d.body) {
        html += '<p>' + escapeHtml(d.bodyEs || d.body) + '</p>\n';
      }
      if (d.bullets) {
        html += '<ul>\n';
        d.bullets.forEach(function(b) {
          html += '  <li>' + escapeHtml(typeof b === 'string' ? b : (b.textEs || b.text || '')) + '</li>\n';
        });
        html += '</ul>\n';
      }
  }

  // Optional CTA at end of page
  if (d.contactName) {
    html += '<div class="callout positive">';
    html += '<div class="callout-kicker">CONTACTO</div>';
    html += '<p class="body">' + escapeHtml(d.contactName);
    if (d.contactEmail) html += ' · <a href="mailto:' + escapeHtml(d.contactEmail) + '">' + escapeHtml(d.contactEmail) + '</a>';
    if (d.contactPhone) html += ' · ' + escapeHtml(d.contactPhone);
    html += '</p></div>';
  }

  return html;
}

function renderPage(page, pageNum, pageTotal) {
  if (page.type === 'cover' || page.id === 'page-cover') {
    return renderCoverPage(page, pageTotal);
  }

  var template = readSnippet('page.html');
  return fillPlaceholders(template, {
    PAGE_ID: page.id,
    PAGE_CLASSES: page.class ? page.class.replace('page', '').trim() : '',
    BRAND_LOCKUP_HTML: renderBrandLockup(),
    DOC_ID: manifest.docId || 'DOC-001',
    PAGE_CONTENT: renderPageBody(page),
    COMPANY_NAME: escapeHtml(brandTokens.meta.company),
    PAGE_NUMBER: String(pageNum).padStart(2, '0'),
    PAGE_TOTAL: String(pageTotal).padStart(2, '0')
  });
}

// ════ MAIN ASSEMBLY ════
process.stderr.write('[assemble-paginated] Building ' + (manifest.format || 'paginated') + ' document...\n');

var head = readSnippet('head.html');
var foot = readSnippet('footer.html');

var lang = (manifest.language || brandTokens.meta.language || 'es');
var bodyLangClass = manifest.bilingual ? ' class="lang-' + lang + '"' : '';

head = fillPlaceholders(head, {
  LANG: lang,
  DOC_TITLE: escapeHtml(manifest.title || manifest.docId || 'Documento'),
  COMPANY_NAME: escapeHtml(brandTokens.meta.company),
  GOOGLE_FONTS_URL: brandTokens.typography.googleFontsUrl || '',
  CSS_TOKENS: renderCSSTokens(brandTokens.cssCustomPropertyMap),
  BODY_LANG_CLASS: bodyLangClass
});

var pages = manifest.pages || [];
var totalPages = pages.length;

var pagesHtml = pages.map(function(page, idx) {
  return renderPage(page, idx + 1, totalPages);
}).join('\n\n');

var output = head + '\n' + pagesHtml + '\n' + foot;

// ════ WRITE ════
if (!outputPath) {
  var slug = (manifest.docId || 'documento').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  outputPath = path.resolve(process.cwd(), 'outputs', slug + '.html');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

fs.writeFileSync(outputPath, output);

var stats = fs.statSync(outputPath);
process.stderr.write('[assemble-paginated] Wrote ' + outputPath + ' (' + Math.round(stats.size / 1024) + 'KB, ' + totalPages + ' pages)\n');
console.log(outputPath);
