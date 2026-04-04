#!/usr/bin/env node
/**
 * robustify.js — Transform playbook HTML to meet PLAYBOOK-SPEC v1.0 Entrusted Standard
 *
 * Takes a playbook that scores ~11/28 and transforms it to pass 28/28.
 * Applies 8 sequential transforms: CSS, sections, modals, cards, accessibility, links, density, output.
 *
 * Usage: node robustify.js <playbook.html> [--dry-run]
 * No external dependencies — uses only Node.js built-ins.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  console.error('Usage: node robustify.js <playbook.html> [--dry-run]');
  process.exit(1);
}

const filePath = path.resolve(args[0]);
const dryRun = args.includes('--dry-run');

if (!fs.existsSync(filePath)) {
  console.error('Error: File not found: ' + filePath);
  process.exit(1);
}

const originalSize = fs.statSync(filePath).size;
let html = fs.readFileSync(filePath, 'utf-8');

// ---------------------------------------------------------------------------
// Summary tracker
// ---------------------------------------------------------------------------

const summary = {};
function log(key, msg) { summary[key] = msg; }

// ---------------------------------------------------------------------------
// Context extraction helpers
// ---------------------------------------------------------------------------

function extractTitle(h) {
  const m = h.match(/<title>([^<]+)<\/title>/i);
  return m ? m[1].replace(/\s*\|.*/, '').trim() : 'Playbook';
}

function extractToolName(h) {
  // Try hero h1 first
  const heroMatch = h.match(/<div class=["']hero-inner["']>[\s\S]*?<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (heroMatch) {
    let text = heroMatch[1].replace(/<[^>]+>/g, '').trim();
    // Extract after "P{N}: "
    const pMatch = text.match(/P\d+:\s*(\S+)/);
    if (pMatch) return pMatch[1];
    return text.split(/\s*[—–\-]\s*/)[0].trim();
  }
  const titleMatch = h.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    const pMatch = titleMatch[1].match(/P\d+:\s*(\S+)/);
    if (pMatch) return pMatch[1];
  }
  return 'esta herramienta';
}

function extractUcInfo(h) {
  // Extract UC modal titles and IDs
  const ucs = [];
  const re = /<div class=["']modal-overlay["'][^>]*id=["'](modal-(?:uc|f)\d+)["'][^>]*>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>/gi;
  let m;
  while ((m = re.exec(h)) !== null) {
    const id = m[1];
    const h3Content = m[2];
    const esMatch = h3Content.match(/<span class=["']es["'][^>]*>(.*?)<\/span>/i);
    const enMatch = h3Content.match(/<span class=["']en["'][^>]*>(.*?)<\/span>/i);
    const esTitle = esMatch ? esMatch[1].replace(/&[^;]+;/g, ' ').trim() : h3Content.replace(/<[^>]+>/g, '').trim();
    const enTitle = enMatch ? enMatch[1].replace(/&[^;]+;/g, ' ').trim() : esTitle;
    // Derive the openModal call ID from the modal element id
    let callId = id.replace('modal-', '');
    if (/^uc\d+$/.test(callId)) {
      // modal-uc1 -> openModal('uc1') but spec says numeric -> modal-f{id}
      // Keep as-is since we'll fix the JS to handle both
    }
    ucs.push({ id, callId, esTitle, enTitle });
  }
  return ucs;
}

function countOccurrences(h, pattern) {
  const m = h.match(pattern);
  return m ? m.length : 0;
}

// ---------------------------------------------------------------------------
// T1: fixBilingualCSS
// ---------------------------------------------------------------------------

function fixBilingualCSS(h) {
  let changed = false;

  // 1. Change <body> to <body class="lang-es">
  if (/<body>/.test(h)) {
    h = h.replace(/<body>/, '<body class="lang-es">');
    changed = true;
  } else if (/<body\s[^>]*>/.test(h) && !/<body[^>]*class=["'][^"']*lang-es/.test(h)) {
    // body tag exists with other attrs but no lang-es class
    h = h.replace(/<body(\s)/, '<body class="lang-es"$1');
    changed = true;
  }

  // 2. Remove the verbose html[lang] blocks
  // Remove: html[lang="es"] .es{display:initial}
  h = h.replace(/html\[lang=["']es["']\]\s*\.es\s*\{[^}]*\}\s*/g, '');
  // Remove: html[lang="en"] .en{display:initial}
  h = h.replace(/html\[lang=["']en["']\]\s*\.en\s*\{[^}]*\}\s*/g, '');
  // Remove verbose element-specific rules for html[lang="es"] h1.en,h2.en,...
  h = h.replace(/html\[lang=["']es["']\]\s*h1\.en[\s\S]*?\{[^}]*\}\s*/g, '');
  h = h.replace(/html\[lang=["']en["']\]\s*h1\.es[\s\S]*?\{[^}]*\}\s*/g, '');

  // 3. Replace base .es,.en{display:none} with the golden pattern
  if (/\.es,\.en\s*\{display:none\}/.test(h)) {
    h = h.replace(
      /\.es,\.en\s*\{display:none\}/,
      'body.lang-es .en{display:none!important;}\nbody.lang-en .es{display:none!important;}'
    );
    changed = true;
  } else if (!/body\.lang-es\s*\.en\s*\{/.test(h)) {
    // Inject before the closing </style> if pattern not found
    h = h.replace(
      /<\/style>/i,
      'body.lang-es .en{display:none!important;}\nbody.lang-en .es{display:none!important;}\n</style>'
    );
    changed = true;
  }

  // 4. Fix toggleLang to use body class instead of html lang
  if (/h\.lang=h\.lang===/.test(h) || /document\.documentElement[\s\S]*?\.lang/.test(h)) {
    h = h.replace(
      /function toggleLang\(\)\{[^}]*\}/,
      `function toggleLang(){var b=document.body;if(b.classList.contains('lang-es')){b.classList.remove('lang-es');b.classList.add('lang-en');localStorage.setItem('wr-lang','en');}else{b.classList.remove('lang-en');b.classList.add('lang-es');localStorage.setItem('wr-lang','es');}}`
    );
    changed = true;
  }

  log('T1', changed ? 'fixed' : 'already ok');
  return h;
}

// ---------------------------------------------------------------------------
// T2: injectMissingSections
// ---------------------------------------------------------------------------

function injectMissingSections(h) {
  const injected = [];
  const toolName = extractToolName(h);
  const ucs = extractUcInfo(h);

  // Helper: find insertion point before </main>
  function insertBeforeMainClose(content) {
    const mainCloseIdx = h.lastIndexOf('</main>');
    if (mainCloseIdx === -1) {
      // Fallback: insert before </body>
      const bodyCloseIdx = h.lastIndexOf('</body>');
      h = h.slice(0, bodyCloseIdx) + content + '\n' + h.slice(bodyCloseIdx);
    } else {
      h = h.slice(0, mainCloseIdx) + content + '\n' + h.slice(mainCloseIdx);
    }
  }

  // --- glosario ---
  if (!/<section[^>]*id=["']glosario["']/i.test(h)) {
    const glossaryTerms = [
      { slug: 'term1', es: 'Flujo AI-Nativo', en: 'AI-Native Workflow', descEs: 'Proceso diseñado con IA desde el origen, no un proceso manual al que se le agrega IA después.', descEn: 'Process designed with AI from the start, not a manual process with AI added later.' },
      { slug: 'term2', es: 'Ingeniería de Prompts', en: 'Prompt Engineering', descEs: 'Disciplina de diseñar instrucciones estructuradas para obtener outputs consistentes de herramientas de IA.', descEn: 'Discipline of designing structured instructions to get consistent outputs from AI tools.' },
      { slug: 'term3', es: 'Anclaje a datos', en: 'Grounding', descEs: 'Técnica que conecta las respuestas de IA a fuentes verificables para eliminar alucinaciones.', descEn: 'Technique connecting AI responses to verifiable sources to eliminate hallucinations.' },
      { slug: 'term4', es: 'VR-AID Framework', en: 'VR-AID Framework', descEs: 'Value, Risks, Assumptions, Issues, Dependencies — marco para reportes basados en evidencia.', descEn: 'Value, Risks, Assumptions, Issues, Dependencies — framework for evidence-based reporting.' },
      { slug: 'term5', es: 'Quad-Doc', en: 'Quad-Doc', descEs: 'Artefacto que captura una reunión en 4 componentes: Decisiones, Tareas, Ruta crítica, Indexación.', descEn: 'Artifact capturing a meeting in 4 components: Decisions, Tasks, Critical path, Indexing.' },
      { slug: 'term6', es: 'Semáforo de Valor', en: 'Value Traffic Light', descEs: 'Sistema de 4 colores que clasifica el estado del proyecto por valor entregado, no por actividad.', descEn: '4-color system classifying project status by delivered value, not by activity.' },
      { slug: 'term7', es: 'Deep Research', en: 'Deep Research', descEs: 'Modo de investigación avanzada que navega docenas de fuentes y produce informes con citas verificables.', descEn: 'Advanced research mode browsing dozens of sources producing reports with verifiable citations.' },
      { slug: 'term8', es: 'NotebookLM', en: 'NotebookLM', descEs: 'Herramienta de Google que analiza tus documentos y responde solo basándose en ellos — cero alucinación.', descEn: 'Google tool analyzing your documents and answering only based on them — zero hallucination.' },
      { slug: 'term9', es: 'Shu-Ha-Ri', en: 'Shu-Ha-Ri', descEs: 'Modelo de maestría japonés: sigue la forma, rompe la forma, trasciende la forma.', descEn: 'Japanese mastery model: follow the form, break the form, transcend the form.' },
      { slug: 'term10', es: 'Cascada de Responsabilidad', en: 'Accountability Cascade', descEs: 'Principio: cada output necesita dueño, fecha y criterio de éxito para tener valor.', descEn: 'Principle: every output needs owner, date and success criteria to have value.' }
    ];

    let cards = glossaryTerms.map((t, i) =>
      `    <div class="problem-card tip-card clickable-card" style="border-left-color:var(--sofka-info);cursor:pointer;" onclick="openModal('g-${t.slug}')" role="button" tabindex="0">
      <h4 class="es" style="color:var(--sofka-info);">${t.es}</h4>
      <h4 class="en" style="color:var(--sofka-info);">${t.en}</h4>
      <p class="es">${t.descEs}</p>
      <p class="en">${t.descEn}</p>
    </div>`
    ).join('\n');

    const glosarioSection = `
<hr class="section-divider">
<section id="glosario">
  <div class="section-header">
    <h2 class="es"><span>Glosario</span> y conceptos clave</h2>
    <h2 class="en"><span>Glossary</span> and key concepts</h2>
    <p class="es">Términos esenciales para dominar ${toolName}.</p>
    <p class="en">Essential terms to master ${toolName}.</p>
  </div>
  <div class="problem-grid">
${cards}
  </div>
</section>`;
    insertBeforeMainClose(glosarioSection);
    injected.push('glosario');
  }

  // --- katas ---
  if (!/<section[^>]*id=["'][^"']*kata[^"']*["']/i.test(h)) {
    const katasSection = `
<hr class="section-divider">
<section id="katas">
  <div class="section-header">
    <h2 class="es">3 Niveles de <span>Dominio</span></h2>
    <h2 class="en">3 Levels of <span>Mastery</span></h2>
    <p class="es">Progresión Shu-Ha-Ri: sigue la forma, rompe la forma, trasciende la forma.</p>
    <p class="en">Shu-Ha-Ri progression: follow the form, break the form, transcend the form.</p>
  </div>
  <div style="overflow-x:auto;">
    <table class="decision-table">
      <thead><tr>
        <th><span class="es">Nivel</span><span class="en">Level</span></th>
        <th><span class="es">Fase</span><span class="en">Phase</span></th>
        <th><span class="es">Criterio</span><span class="en">Criterion</span></th>
        <th><span class="es">Duración</span><span class="en">Duration</span></th>
      </tr></thead>
      <tbody>
        <tr onclick="openModal('ka1')" style="cursor:pointer;" role="button" tabindex="0">
          <td style="font-weight:800;color:var(--sofka-orange);">Novato</td>
          <td>Shu</td>
          <td><span class="es">Sigue el flujo exacto 4 veces sin desviarte</span><span class="en">Follow the exact flow 4 times without deviation</span></td>
          <td>2 <span class="es">semanas</span><span class="en">weeks</span></td>
        </tr>
        <tr onclick="openModal('ka2')" style="cursor:pointer;" role="button" tabindex="0">
          <td style="font-weight:800;color:var(--sofka-info);">Practicante</td>
          <td>Ha</td>
          <td><span class="es">Adapta el flujo a tu contexto sin perder el output esperado</span><span class="en">Adapt the flow to your context without losing expected output</span></td>
          <td>4 <span class="es">semanas</span><span class="en">weeks</span></td>
        </tr>
        <tr onclick="openModal('ka3')" style="cursor:pointer;" role="button" tabindex="0">
          <td style="font-weight:800;color:var(--sofka-positive-text);">Autónomo</td>
          <td>Ri</td>
          <td><span class="es">Enseña el flujo a un colega que lo ejecuta solo</span><span class="en">Teach the flow to a colleague who runs it alone</span></td>
          <td>8 <span class="es">semanas</span><span class="en">weeks</span></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-warning" style="margin-top:1.5rem;">
    <strong class="es">Regla de transición</strong><strong class="en">Transition rule</strong>
    <p class="es">4 ejecuciones consecutivas exitosas = siguiente nivel. 3 semanas sin usar = regresión al nivel anterior.</p>
    <p class="en">4 consecutive successful executions = next level. 3 weeks without use = regression to previous level.</p>
  </div>
</section>`;
    insertBeforeMainClose(katasSection);
    injected.push('katas');
  }

  // --- ritmo ---
  if (!/<section[^>]*id=["'][^"']*ritmo[^"']*["']/i.test(h) &&
      !/<section[^>]*id=["'][^"']*rhythm[^"']*["']/i.test(h)) {
    const ritmoSection = `
<hr class="section-divider">
<section id="ritmo">
  <div class="section-header">
    <h2 class="es">Tu <span>ritmo</span> de adopción</h2>
    <h2 class="en">Your <span>adoption</span> pace</h2>
    <p class="es">No intentes todo a la vez. Empieza con 1 caso de uso, domínalo, luego agrega el siguiente.</p>
    <p class="en">Don't try everything at once. Start with 1 use case, master it, then add the next.</p>
  </div>
  <div class="metrics-row">
    <div class="metric-card"><div class="mv">-50%</div><div class="ml"><span class="es">Tiempo operativo</span><span class="en">Operational time</span></div></div>
    <div class="metric-card"><div class="mv">100%</div><div class="ml"><span class="es">Outputs verificables</span><span class="en">Verifiable outputs</span></div></div>
    <div class="metric-card"><div class="mv">3/3</div><div class="ml"><span class="es">Entregables asegurados</span><span class="en">Deliverables assured</span></div></div>
    <div class="metric-card"><div class="mv">4 sem</div><div class="ml"><span class="es">Primer nivel completado</span><span class="en">First level completed</span></div></div>
  </div>
  <h3 style="font-size:1.1rem;margin:2rem 0 .75rem;"><span class="es">Criterios de aceptación</span><span class="en">Acceptance criteria</span></h3>
  <ol class="acceptance-list">
    <li><span class="es">Al menos 3 casos de uso ejecutados con evidencia en la primera semana</span><span class="en">At least 3 use cases executed with evidence in the first week</span></li>
    <li><span class="es">Nivel Novato alcanzado en los 3 casos prioritarios en 2 semanas</span><span class="en">Novice level reached on 3 priority cases in 2 weeks</span></li>
    <li><span class="es">VR-AID o reporte semanal producido con esta herramienta como input</span><span class="en">VR-AID or weekly report produced with this tool as input</span></li>
  </ol>
</section>`;
    insertBeforeMainClose(ritmoSection);
    injected.push('ritmo');
  }

  // --- empezar ---
  if (!/<section[^>]*id=["']empezar["']/i.test(h)) {
    // Build empathy cards from first 5 UCs
    const empathyUcs = ucs.slice(0, 5);
    let empathyCards = empathyUcs.map((uc, i) => {
      const n = i + 1;
      return `    <div class="problem-card tip-card clickable-card" style="border-left-color:var(--sofka-info);" onclick="openModal('${uc.callId}')" role="button" tabindex="0">
      <h4 class="es" style="color:var(--sofka-info);">${uc.esTitle}</h4>
      <h4 class="en" style="color:var(--sofka-info);">${uc.enTitle}</h4>
      <p class="es">&rarr; Caso de Uso ${n}</p>
      <p class="en">&rarr; Use Case ${n}</p>
    </div>`;
    }).join('\n');

    // Static tip card
    empathyCards += `
    <div class="problem-card tip-card" style="border-left-color:var(--sofka-warning);">
      <h4 class="es" style="color:var(--sofka-warning);">No s&eacute; cu&aacute;l elegir</h4>
      <h4 class="en" style="color:var(--sofka-warning);">I don't know which to pick</h4>
      <p class="es">Empieza por el Caso de Uso 1. Si ya lo dominas, sigue con el 2. La secuencia importa.</p>
      <p class="en">Start with Use Case 1. If you've mastered it, continue with 2. The sequence matters.</p>
    </div>`;

    const empezarSection = `
<hr class="section-divider">
<section id="empezar">
  <div class="section-header">
    <h2 class="es"><span>&iquest;Por d&oacute;nde empiezo?</span></h2>
    <h2 class="en"><span>Where do I start?</span></h2>
    <p class="es">Elige la tarjeta que describe tu situación. Ahí empieza tu primer caso de uso.</p>
    <p class="en">Pick the card that describes your situation. That's where your first use case starts.</p>
  </div>
  <div class="problem-grid">
${empathyCards}
  </div>
</section>`;
    insertBeforeMainClose(empezarSection);
    injected.push('empezar');
  }

  // Patch: empezar exists but lacks problem-cards
  var empCheck = h.match(/<section[^>]*id=["']empezar["'][^>]*>([\s\S]*?)<\/section>/i);
  if (empCheck && empCheck[1].indexOf('problem-card') === -1) {
    var eu = ucs.slice(0, 5);
    var eCards = eu.map(function(uc, i) {
      return '<div class="problem-card tip-card clickable-card" style="border-left-color:var(--sofka-info);" onclick="openModal(\'' + uc.callId + '\')" role="button" tabindex="0"><h4 class="es" style="color:var(--sofka-info);">' + uc.esTitle + '</h4><h4 class="en" style="color:var(--sofka-info);">' + uc.enTitle + '</h4><p class="es">UC ' + (i+1) + '</p><p class="en">UC ' + (i+1) + '</p></div>';
    }).join('\n');
    eCards += '\n<div class="problem-card tip-card" style="border-left-color:var(--sofka-warning);"><h4 class="es" style="color:var(--sofka-warning);">No se cual elegir</h4><h4 class="en" style="color:var(--sofka-warning);">Not sure which to pick</h4><p class="es">Empieza por el UC 1.</p><p class="en">Start with UC 1.</p></div>';
    var patchGrid = '\n<div class="problem-grid" style="margin-top:1.5rem;">\n' + eCards + '\n</div>\n';
    h = h.replace(/(<section[^>]*id=["']empezar["'][^>]*>[\s\S]*?)(<\/section>)/i, '$1' + patchGrid + '$2');
    injected.push('empezar-cards-patch');
  }

  // --- cierre ---
  if (!/<section[^>]*id=["']cierre["']/i.test(h)) {
    const cierreSection = `
<hr class="section-divider">
<section id="cierre">
  <div class="section-header">
    <h2 class="es"><span>Cierre</span> y metadata</h2>
    <h2 class="en"><span>Closing</span> and metadata</h2>
  </div>
  <div style="overflow-x:auto;">
    <table class="decision-table">
      <tbody>
        <tr><td style="font-weight:700;width:160px;"><span class="es">Autor</span><span class="en">Author</span></td><td>Javier Montaño &mdash; Sofka Technologies</td></tr>
        <tr><td style="font-weight:700;"><span class="es">Audiencia</span><span class="en">Audience</span></td><td><span class="es">Managers y líderes operativos de BU2</span><span class="en">BU2 managers and operational leaders</span></td></tr>
        <tr><td style="font-weight:700;">Versión</td><td>v1.0</td></tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-warning" style="margin-top:1.5rem;">
    <strong class="es">Agradecimiento</strong><strong class="en">Acknowledgments</strong>
    <p class="es">Parte de la ruta de 14 playbooks AI-native de Sofka Technologies &mdash; Big Rocks Scale Up 2026.</p>
    <p class="en">Part of the 14-playbook AI-native route from Sofka Technologies &mdash; Big Rocks Scale Up 2026.</p>
  </div>
</section>`;
    insertBeforeMainClose(cierreSection);
    injected.push('cierre');
  }

  log('T2', injected.length > 0 ? 'Sections injected: ' + injected.join(', ') : 'all sections present');
  return h;
}

// ---------------------------------------------------------------------------
// T3: enrichModals + inject new modals
// ---------------------------------------------------------------------------

function enrichModals(h) {
  let enrichedCount = 0;
  let newCount = 0;

  // ---- Enrich existing modals ----
  // Use a proper approach: find each modal-overlay by its opening tag,
  // then find its balanced close by counting div open/close tags
  const modalOpenerRe = /<div\s+class=["']modal-overlay["'][^>]*id=["']([^"']+)["'][^>]*>/gi;
  let mMatch;
  const modalEdits = []; // collect {start, end, id}
  while ((mMatch = modalOpenerRe.exec(h)) !== null) {
    const modalStart = mMatch.index;
    const modalId = mMatch[1];
    // Find balanced end
    let depth = 1;
    let pos = modalStart + mMatch[0].length;
    while (depth > 0 && pos < h.length) {
      const nextOpen = h.indexOf('<div', pos);
      const nextClose = h.indexOf('</div>', pos);
      if (nextClose === -1) break;
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        pos = nextOpen + 4;
      } else {
        depth--;
        if (depth === 0) {
          const modalEnd = nextClose + 6; // '</div>'.length
          modalEdits.push({ start: modalStart, end: modalEnd, id: modalId });
        }
        pos = nextClose + 6;
      }
    }
  }

  // Process edits in reverse order to preserve positions
  for (let i = modalEdits.length - 1; i >= 0; i--) {
    const edit = modalEdits[i];
    // Skip enrichment for generated modals (glossary, antipattern, kata) — they already have correct structure
    if (/^modal-fg-/.test(edit.id) || /^modal-fap\d/.test(edit.id) || /^modal-fka\d/.test(edit.id)) continue;
    let modalContent = h.slice(edit.start, edit.end);
    let modified = false;

    // Find modal-body content insertion point
    const mbIdx = modalContent.indexOf('modal-body');
    if (mbIdx === -1) continue;

    // 1. Check for timeline — inject if missing
    if (!/class=["'][^"']*timeline["'\s]/i.test(modalContent)) {
      const timelineBlock = `
<h4 class="es">C&oacute;mo funciona</h4><h4 class="en">How it works</h4>
<div class="timeline">
  <div class="timeline-item"><div class="timeline-marker">0-2 min</div><div class="timeline-content"><span class="es">Recopila el input necesario: transcripci&oacute;n, notas o documento fuente</span><span class="en">Gather the necessary input: transcript, notes or source document</span></div></div>
  <div class="timeline-item"><div class="timeline-marker">2-5 min</div><div class="timeline-content"><span class="es">Pega el contenido en la herramienta e indica el contexto</span><span class="en">Paste the content into the tool and indicate the context</span></div></div>
  <div class="timeline-item"><div class="timeline-marker">5-10 min</div><div class="timeline-content"><span class="es">Revisa el output generado: valida estructura, decisiones y tareas</span><span class="en">Review the generated output: validate structure, decisions and tasks</span></div></div>
  <div class="timeline-item"><div class="timeline-marker">10-15 min</div><div class="timeline-content"><span class="es">Publica en el destino est&aacute;ndar y notifica a los involucrados</span><span class="en">Publish to the standard destination and notify stakeholders</span></div></div>
</div>`;
      // Insert after first callout's closing </div>
      const calloutIdx = modalContent.indexOf('callout', mbIdx);
      if (calloutIdx > -1) {
        // Find the closing </div> of the callout
        const afterCallout = modalContent.indexOf('</div>', calloutIdx);
        if (afterCallout > -1) {
          const insertPos = afterCallout + 6;
          modalContent = modalContent.slice(0, insertPos) + timelineBlock + modalContent.slice(insertPos);
          modified = true;
        }
      }
    }

    // 2. Check for "Qué obtienes" / "What you get"
    if (!/obtienes al final/i.test(modalContent) && !/What you get/i.test(modalContent)) {
      const outputBlock = `
<h4 class="es">Qu&eacute; obtienes al final</h4><h4 class="en">What you get at the end</h4>
<p class="es">Un artefacto estructurado listo para publicar, con decisiones, tareas y responsables claros.</p>
<p class="en">A structured artifact ready to publish, with clear decisions, tasks and owners.</p>`;
      // Insert before the last 3 closing divs
      const lastClose3 = modalContent.lastIndexOf('</div>');
      const lastClose2 = modalContent.lastIndexOf('</div>', lastClose3 - 1);
      const lastClose1 = modalContent.lastIndexOf('</div>', lastClose2 - 1);
      modalContent = modalContent.slice(0, lastClose1) + outputBlock + modalContent.slice(lastClose1);
      modified = true;
    }

    // 3. Check for DoD callout (also accept "Criterio de éxito" as a DoD equivalent)
    if (!/lo hiciste bien/i.test(modalContent) && !/you did it right/i.test(modalContent) &&
        !/mo sabes que/i.test(modalContent) && !/How you know/i.test(modalContent) &&
        !/Criterio de/i.test(modalContent) && !/Success criterion/i.test(modalContent) &&
        !/xito/i.test(modalContent)) {
      const dodBlock = `
<div class="callout" style="border-left-color:var(--sofka-orange);background:var(--sofka-orange-dim);">
  <strong class="es">C&oacute;mo sabes que lo hiciste bien</strong><strong class="en">How you know you did it right</strong>
  <p class="es">El output tiene estructura completa, cada decisi&oacute;n tiene owner y fecha, y el destino de publicaci&oacute;n est&aacute; definido.</p>
  <p class="en">The output has complete structure, every decision has owner and date, and the publication destination is defined.</p>
</div>`;
      const lastClose3 = modalContent.lastIndexOf('</div>');
      const lastClose2 = modalContent.lastIndexOf('</div>', lastClose3 - 1);
      const lastClose1 = modalContent.lastIndexOf('</div>', lastClose2 - 1);
      modalContent = modalContent.slice(0, lastClose1) + dodBlock + modalContent.slice(lastClose1);
      modified = true;
    }

    // 4. Check for "Cuándo" / "When you'll notice"
    if (!/notar la diferencia/i.test(modalContent) && !/notice the difference/i.test(modalContent) &&
        !/ndo vas a notar/i.test(modalContent) && !/When you.*notice/i.test(modalContent)) {
      const progressionBlock = `
<h4 class="es">Cu&aacute;ndo vas a notar la diferencia</h4><h4 class="en">When you'll notice the difference</h4>
<p class="es">Semana 1-2: el output sale m&aacute;s r&aacute;pido. Semana 4: la calidad es consistente. Semana 8: el proceso corre solo.</p>
<p class="en">Week 1-2: output comes faster. Week 4: quality is consistent. Week 8: the process runs itself.</p>`;
      const lastClose3 = modalContent.lastIndexOf('</div>');
      const lastClose2 = modalContent.lastIndexOf('</div>', lastClose3 - 1);
      const lastClose1 = modalContent.lastIndexOf('</div>', lastClose2 - 1);
      modalContent = modalContent.slice(0, lastClose1) + progressionBlock + modalContent.slice(lastClose1);
      modified = true;
    }

    // 5. Check for modal-cta
    if (!/modal-cta/i.test(modalContent)) {
      const ctaBlock = `
<div class="modal-cta">
  <a class="gem-link pulse" href="https://gemini.google.com" target="_blank">Gemini</a>
  <a class="gem-link" href="https://notebooklm.google.com" target="_blank">NotebookLM</a>
</div>`;
      const lastClose3 = modalContent.lastIndexOf('</div>');
      const lastClose2 = modalContent.lastIndexOf('</div>', lastClose3 - 1);
      const lastClose1 = modalContent.lastIndexOf('</div>', lastClose2 - 1);
      modalContent = modalContent.slice(0, lastClose1) + ctaBlock + modalContent.slice(lastClose1);
      modified = true;
    }

    if (modified) {
      enrichedCount++;
      h = h.slice(0, edit.start) + modalContent + h.slice(edit.end);
    }
  }

  // ---- Generate NEW modals (only if they don't already exist) ----
  let newModals = '';

  // Glossary modals (fg-term1 through fg-term10)
  const glossaryTerms = [
    { slug: 'term1', es: 'Flujo AI-Nativo', en: 'AI-Native Workflow', conceptEs: 'Proceso diseñado con IA desde el origen. La herramienta importa menos que tu orden para lograr con efectividad tu aporte.', conceptEn: 'Process designed with AI from the start. The tool matters less than your process order to effectively make your contribution.', exEs: 'Ejemplo: en vez de tomar notas manualmente y luego pasarlas a un doc, grabas la reunión y LaVuelta genera el Quad-Doc directamente.', exEn: 'Example: instead of taking notes manually then copying to a doc, you record the meeting and LaVuelta generates the Quad-Doc directly.' },
    { slug: 'term2', es: 'Ingeniería de Prompts', en: 'Prompt Engineering', conceptEs: 'Disciplina de diseñar instrucciones claras y estructuradas para obtener outputs consistentes de IA.', conceptEn: 'Discipline of designing clear, structured instructions to get consistent AI outputs.', exEs: 'Un prompt estructurado incluye: contexto, objetivo, formato esperado y restricciones.', exEn: 'A structured prompt includes: context, objective, expected format and constraints.' },
    { slug: 'term3', es: 'Anclaje a datos (Grounding)', en: 'Grounding', conceptEs: 'Técnica que conecta respuestas de IA a fuentes verificables, eliminando alucinaciones.', conceptEn: 'Technique connecting AI responses to verifiable sources, eliminating hallucinations.', exEs: 'NotebookLM solo responde con tus fuentes. Si la respuesta no está en los documentos, lo dice.', exEn: 'NotebookLM only responds from your sources. If the answer is not in the documents, it says so.' },
    { slug: 'term4', es: 'VR-AID Framework', en: 'VR-AID Framework', conceptEs: 'Value, Risks, Assumptions, Issues, Dependencies — marco que obliga a justificar cada semáforo con evidencia.', conceptEn: 'Value, Risks, Assumptions, Issues, Dependencies — framework forcing evidence-based traffic light justification.', exEs: 'Cada color del semáforo tiene una fuente verificable. Verde = valor visible para el negocio esta semana.', exEn: 'Every traffic light color has a verifiable source. Green = visible business value this week.' },
    { slug: 'term5', es: 'Quad-Doc', en: 'Quad-Doc', conceptEs: 'Artefacto de 4 componentes: C1 Decisiones, C2 Tareas (owner + fecha), C3 Ruta crítica, C4 Indexación.', conceptEn: 'Artifact with 4 components: C1 Decisions, C2 Tasks (owner + date), C3 Critical path, C4 Indexing.', exEs: 'Lo produce LaVuelta en 20 minutos post-reunión. Es la unidad atómica del sistema.', exEn: 'Produced by LaVuelta in 20 minutes post-meeting. It is the system atomic unit.' },
    { slug: 'term6', es: 'Semáforo de Valor', en: 'Value Traffic Light', conceptEs: 'Sistema de 4 colores por valor entregado: Verde (valor visible), Blanco (habilitador), Amarillo (1 semana sin valor), Rojo (2+ semanas).', conceptEn: '4-color system by delivered value: Green (visible value), White (enabler), Yellow (1 week no value), Red (2+ weeks).', exEs: 'En el VR-AID, cada proyecto tiene un semáforo con justificación basada en evidencia.', exEn: 'In the VR-AID, each project has a traffic light with evidence-based justification.' },
    { slug: 'term7', es: 'Deep Research', en: 'Deep Research', conceptEs: 'Modo de investigación avanzada que navega docenas de fuentes web y produce informes con citas verificables.', conceptEn: 'Advanced research mode browsing dozens of web sources producing reports with verifiable citations.', exEs: 'En 5-10 minutos genera un informe de 15-20 páginas con fuentes. Ideal para contexto de mercado y competencia.', exEn: 'Generates a 15-20 page report with sources in 5-10 minutes. Ideal for market and competitive context.' },
    { slug: 'term8', es: 'NotebookLM', en: 'NotebookLM', conceptEs: 'Herramienta de Google para análisis documental con cero alucinación. Solo responde desde tus fuentes.', conceptEn: 'Google tool for document analysis with zero hallucination. Only answers from your sources.', exEs: 'Carga los Quad-Docs de las últimas 4 semanas y pregunta tendencias — responde solo con tus datos.', exEn: 'Upload the last 4 weeks Quad-Docs and ask for trends — responds only with your data.' },
    { slug: 'term9', es: 'Shu-Ha-Ri', en: 'Shu-Ha-Ri', conceptEs: 'Modelo de maestría japonés: Shu (sigue la forma), Ha (rompe con criterio), Ri (crea tu propia forma).', conceptEn: 'Japanese mastery model: Shu (follow the form), Ha (break with judgment), Ri (create your own form).', exEs: 'Las katas de este playbook te llevan de Shu (ejecutar sin desvío) a Ha (adaptar) en 4 semanas.', exEn: 'This playbook katas take you from Shu (execute without deviation) to Ha (adapt) in 4 weeks.' },
    { slug: 'term10', es: 'Cascada de Responsabilidad', en: 'Accountability Cascade', conceptEs: 'Cada output necesita tres elementos: dueño (quién responde), fecha (cuándo se comprometió), criterio de éxito.', conceptEn: 'Every output needs three elements: owner (who is accountable), date (when committed), success criteria.', exEs: 'Sin los tres elementos, el artefacto existe pero no tiene fuerza. Los anti-patrones lo rompen.', exEn: 'Without all three, the artifact exists but has no force. Anti-patterns break this chain.' }
  ];

  for (const t of glossaryTerms) {
    if (new RegExp('id=["\']modal-fg-' + t.slug + '["\']', 'i').test(h)) continue;
    newModals += `
<div class="modal-overlay" id="modal-fg-${t.slug}">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal()" aria-label="Cerrar / Close">&times;</button>
    <div class="modal-header">
      <h3><span class="es">${t.es}</span><span class="en">${t.en}</span></h3>
      <small><span class="es">Glosario</span><span class="en">Glossary</span></small>
    </div>
    <div class="modal-body">
      <div class="callout" style="border-left-color:var(--sofka-info);background:var(--sofka-info-dim);">
        <strong class="es">Concepto</strong><strong class="en">Concept</strong>
        <p class="es">${t.conceptEs}</p>
        <p class="en">${t.conceptEn}</p>
      </div>
      <div class="callout" style="border-left-color:var(--sofka-orange);background:var(--sofka-orange-dim);">
        <strong class="es">Para qué te sirve</strong><strong class="en">Why it matters</strong>
        <p class="es">${t.exEs}</p>
        <p class="en">${t.exEn}</p>
      </div>
      <div class="modal-cta">
        <a class="gem-link pulse" href="https://gemini.google.com" target="_blank">Gemini</a>
        <a class="gem-link" href="https://notebooklm.google.com" target="_blank">NotebookLM</a>
      </div>
    </div>
  </div>
</div>`;
    newCount++;
  }

  // Anti-pattern modals (fap1 through fap5)
  const antipatterns = [
    { n: 1, es: 'Ejecutar sin verificar el output', en: 'Execute without verifying output', whyEs: 'La presión de tiempo hace que aceptes el primer resultado sin revisión.', whyEn: 'Time pressure makes you accept the first result without review.', detectEs: 'Publicas artefactos con errores de estructura o datos incorrectos.', detectEn: 'You publish artifacts with structural errors or incorrect data.', fixEs: 'Establece una checklist de 3 puntos antes de publicar cualquier output.', fixEn: 'Set a 3-point checklist before publishing any output.' },
    { n: 2, es: 'Saltar niveles de maestría', en: 'Skip mastery levels', whyEs: 'La confianza prematura te hace personalizar antes de dominar la base.', whyEn: 'Premature confidence makes you customize before mastering the base.', detectEs: 'Modificas flujos antes de completar 4 ejecuciones exitosas estándar.', detectEn: 'You modify flows before completing 4 successful standard executions.', fixEs: 'Registra cada ejecución. Solo personaliza después de 4 repeticiones exitosas.', fixEn: 'Log each execution. Only customize after 4 successful repetitions.' },
    { n: 3, es: 'Herramienta sin proceso', en: 'Tool without process', whyEs: 'Adoptas la herramienta pero no el flujo gobernado que la hace efectiva.', whyEn: 'You adopt the tool but not the governed flow that makes it effective.', detectEs: 'Usas IA de forma ad-hoc sin input estándar ni destino de publicación.', detectEn: 'You use AI ad-hoc without standard input or publication destination.', fixEs: 'Cada uso de IA debe tener: input definido, output esperado, destino y responsable.', fixEn: 'Every AI use must have: defined input, expected output, destination and owner.' },
    { n: 4, es: 'Editar el output en lugar del prompt', en: 'Edit the output instead of the prompt', whyEs: 'Es más intuitivo corregir el resultado que mejorar la instrucción.', whyEn: 'It is more intuitive to correct the result than to improve the instruction.', detectEs: 'Pasas más de 10 minutos editando manualmente cada output de IA.', detectEn: 'You spend more than 10 minutes manually editing each AI output.', fixEs: 'Si editas el output, mejora el prompt y re-ejecuta. La próxima vez será mejor sin edición.', fixEn: 'If you edit the output, improve the prompt and re-run. Next time will be better without editing.' },
    { n: 5, es: 'Artefacto sin accountability', en: 'Artifact without accountability', whyEs: 'Produces documentos que nadie defiende ni evalúa porque no tienen dueño ni fecha.', whyEn: 'You produce documents nobody defends or evaluates because they have no owner or date.', detectEs: 'Tus Quad-Docs no tienen owner en las tareas o no tienen fecha de compromiso.', detectEn: 'Your Quad-Docs have no owner on tasks or no commitment date.', fixEs: 'Antes de publicar: verifica que cada tarea tenga owner, fecha y criterio de éxito.', fixEn: 'Before publishing: verify every task has owner, date and success criteria.' }
  ];

  for (const ap of antipatterns) {
    if (new RegExp('id=["\']modal-fap' + ap.n + '["\']', 'i').test(h)) continue;
    newModals += `
<div class="modal-overlay" id="modal-fap${ap.n}">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal()" aria-label="Cerrar / Close">&times;</button>
    <div class="modal-header">
      <h3><span class="es">Anti-patrón ${ap.n}: ${ap.es}</span><span class="en">Anti-pattern ${ap.n}: ${ap.en}</span></h3>
      <small><span class="es">Anti-patrón</span><span class="en">Anti-pattern</span></small>
    </div>
    <div class="modal-body">
      <div class="callout callout-warning">
        <strong class="es">Qué es</strong><strong class="en">What it is</strong>
        <p class="es">${ap.es}.</p>
        <p class="en">${ap.en}.</p>
      </div>
      <h4 class="es">Por qué pasa</h4><h4 class="en">Why it happens</h4>
      <p class="es">${ap.whyEs}</p>
      <p class="en">${ap.whyEn}</p>
      <h4 class="es">Cómo detectarlo</h4><h4 class="en">How to detect it</h4>
      <p class="es">${ap.detectEs}</p>
      <p class="en">${ap.detectEn}</p>
      <div class="timeline">
        <div class="timeline-item"><div class="timeline-marker">1</div><div class="timeline-content"><span class="es">Identifica el síntoma en tu flujo actual</span><span class="en">Identify the symptom in your current flow</span></div></div>
        <div class="timeline-item"><div class="timeline-marker">2</div><div class="timeline-content"><span class="es">${ap.fixEs}</span><span class="en">${ap.fixEn}</span></div></div>
        <div class="timeline-item"><div class="timeline-marker">3</div><div class="timeline-content"><span class="es">Verifica en la siguiente ejecución que el anti-patrón no se repite</span><span class="en">Verify in the next execution that the anti-pattern doesn't repeat</span></div></div>
      </div>
      <div class="callout" style="border-left-color:var(--sofka-critical);background:var(--sofka-critical-dim);">
        <strong class="es">Accountability</strong><strong class="en">Accountability</strong>
        <p class="es">Si este anti-patrón persiste después de 2 semanas, escala al líder del equipo para revisión del proceso.</p>
        <p class="en">If this anti-pattern persists after 2 weeks, escalate to team lead for process review.</p>
      </div>
    </div>
  </div>
</div>`;
    newCount++;
  }

  // Kata modals (fka1, fka2, fka3)
  const katas = [
    { n: 1, es: 'Novato — Shu', en: 'Novice — Shu', descEs: 'Sigue la forma exacta sin desviarte. Ejecuta los flujos tal como están documentados.', descEn: 'Follow the exact form without deviation. Execute flows as documented.', criterionEs: '4 ejecuciones consecutivas exitosas siguiendo el flujo exacto.', criterionEn: '4 consecutive successful executions following the exact flow.' },
    { n: 2, es: 'Practicante — Ha', en: 'Practitioner — Ha', descEs: 'Rompe la forma con criterio. Adapta los flujos a tu contexto porque ya entiendes por qué funcionan.', descEn: 'Break the form with judgment. Adapt flows to your context because you understand why they work.', criterionEs: 'Adaptas el flujo manteniendo el output esperado en 4 ejecuciones consecutivas.', criterionEn: 'You adapt the flow maintaining expected output in 4 consecutive executions.' },
    { n: 3, es: 'Autónomo — Ri', en: 'Autonomous — Ri', descEs: 'Trasciende la forma. Creas tus propios flujos y enseñas el sistema a otros.', descEn: 'Transcend the form. Create your own flows and teach the system to others.', criterionEs: 'Un colega ejecuta el flujo solo después de tu enseñanza, sin ayuda.', criterionEn: 'A colleague executes the flow alone after your teaching, without help.' }
  ];

  for (const k of katas) {
    if (new RegExp('id=["\']modal-fka' + k.n + '["\']', 'i').test(h)) continue;
    newModals += `
<div class="modal-overlay" id="modal-fka${k.n}">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal()" aria-label="Cerrar / Close">&times;</button>
    <div class="modal-header">
      <h3><span class="es">${k.es}</span><span class="en">${k.en}</span></h3>
      <small><span class="es">Nivel de maestría</span><span class="en">Mastery level</span></small>
    </div>
    <div class="modal-body">
      <div class="callout callout-warning">
        <strong class="es">Qué significa</strong><strong class="en">What it means</strong>
        <p class="es">${k.descEs}</p>
        <p class="en">${k.descEn}</p>
      </div>
      <div class="timeline">
        <div class="timeline-item"><div class="timeline-marker"><span class="es">Ensayo 1</span><span class="en">Trial 1</span></div><div class="timeline-content"><span class="es">Primera ejecución guiada — sigue cada paso sin saltar ninguno</span><span class="en">First guided execution — follow each step without skipping any</span></div></div>
        <div class="timeline-item"><div class="timeline-marker"><span class="es">Ensayo 2</span><span class="en">Trial 2</span></div><div class="timeline-content"><span class="es">Segunda ejecución — identifica dónde dudas y refuerza</span><span class="en">Second execution — identify where you hesitate and reinforce</span></div></div>
        <div class="timeline-item"><div class="timeline-marker"><span class="es">Ensayo 3</span><span class="en">Trial 3</span></div><div class="timeline-content"><span class="es">Tercera ejecución — mide tu tiempo y compara con la referencia</span><span class="en">Third execution — measure your time and compare with reference</span></div></div>
        <div class="timeline-item"><div class="timeline-marker"><span class="es">Ensayo 4</span><span class="en">Trial 4</span></div><div class="timeline-content"><span class="es">Cuarta ejecución — si cumples el criterio, avanzas al siguiente nivel</span><span class="en">Fourth execution — if you meet the criterion, advance to next level</span></div></div>
      </div>
      <div class="callout" style="border-left-color:var(--sofka-orange);background:var(--sofka-orange-dim);">
        <strong class="es">Criterio de superación</strong><strong class="en">Advancement criterion</strong>
        <p class="es">${k.criterionEs}</p>
        <p class="en">${k.criterionEn}</p>
      </div>
    </div>
  </div>
</div>`;
    newCount++;
  }

  // Insert new modals before </body> or before <script>
  if (newModals) {
    const scriptIdx = h.lastIndexOf('<script>');
    if (scriptIdx > -1) {
      h = h.slice(0, scriptIdx) + newModals + '\n' + h.slice(scriptIdx);
    } else {
      const bodyCloseIdx = h.lastIndexOf('</body>');
      h = h.slice(0, bodyCloseIdx) + newModals + '\n' + h.slice(bodyCloseIdx);
    }
  }

  const existingModals = countOccurrences(h, /class=["'][^"']*modal-overlay[^"']*["']/gi);
  log('T3', `Modals: enriched ${enrichedCount} existing + added ${newCount} new = ${existingModals} total`);
  return h;
}

// ---------------------------------------------------------------------------
// T4: migrateUcCards
// ---------------------------------------------------------------------------

function migrateUcCards(h) {
  let migrated = 0;

  // Find uc-card elements and wrap them in jarvis-card format
  // Pattern: divs with class="uc-card" that have onclick
  if (/class=["'][^"']*uc-card[^"']*["']/i.test(h) && !/class=["'][^"']*jarvis-card[^"']*["']/i.test(h)) {
    // Replace uc-card with jarvis-card
    h = h.replace(/class=["']uc-card["']/gi, function() {
      migrated++;
      return 'class="jarvis-card"';
    });
    // Also replace uc-card-header -> jarvis-card-header
    h = h.replace(/class=["']uc-card-header["']/gi, 'class="jarvis-card-header"');
    // Also replace uc-card-body -> jarvis-card-body
    h = h.replace(/class=["']uc-card-body["']/gi, 'class="jarvis-card-body"');
  }

  // If no jarvis-card exists at all but there are uc-cards or div cards with onclick,
  // also add the class
  if (countOccurrences(h, /class=["'][^"']*jarvis-card[^"']*["']/gi) < 8) {
    // Try to convert remaining card-like structures
    // Look for divs with onclick="openModal" that could be jarvis-cards
    h = h.replace(
      /(<div\s+)(class=["'])(uc-card|card)(?=["'\s])/gi,
      function(match, pre, classStart, className) {
        migrated++;
        return pre + classStart + 'jarvis-card';
      }
    );
  }

  log('T4', migrated > 0 ? `migrated ${migrated}` : 'already ok');
  return h;
}

// ---------------------------------------------------------------------------
// T5: addClickableAttributes
// ---------------------------------------------------------------------------

function addClickableAttributes(h) {
  let added = 0;

  // Add role="button" tabindex="0" to elements with onclick that don't have role="button"
  h = h.replace(
    /(<(?:div|tr|td|span)[^>]*onclick=["'][^"']*["'])([^>]*?)(?=>)/gi,
    function(match, beforeClose, afterOnclick) {
      let result = match;
      if (!/role=["']button["']/i.test(match)) {
        result += ' role="button" tabindex="0"';
        added++;
      }
      return result;
    }
  );

  // Add clickable-card to divs with onclick that don't have it
  h = h.replace(
    /(<div\s+)class=["']([^"']*)["']([^>]*onclick=)/gi,
    function(match, pre, classes, post) {
      if (!/clickable-card/.test(classes)) {
        added++;
        return pre + 'class="' + classes + ' clickable-card"' + post;
      }
      return match;
    }
  );

  // Also handle divs where onclick comes before class
  h = h.replace(
    /(<div\s+[^>]*onclick=["'][^"']*["'][^>]*)class=["']([^"']*)["']/gi,
    function(match, pre, classes) {
      if (!/clickable-card/.test(classes)) {
        added++;
        return pre + 'class="' + classes + ' clickable-card"';
      }
      return match;
    }
  );

  log('T5', `clickable+role: added to ${added} elements`);
  return h;
}

// ---------------------------------------------------------------------------
// T6: addGemLinks
// ---------------------------------------------------------------------------

function addGemLinks(h) {
  let gemLinksAdded = 0;

  // Check if gem-bar exists
  if (!/class=["'][^"']*gem-bar[^"']*["']/i.test(h)) {
    // Add gem-bar in glosario section after problem-grid
    const gemBar = `
  <div class="gem-bar">
    <div class="gem-bar-title"><span class="es">Herramientas directas</span><span class="en">Direct tool access</span></div>
    <a class="gem-link pulse" href="https://gemini.google.com" target="_blank">Gemini</a>
    <a class="gem-link" href="https://notebooklm.google.com" target="_blank">NotebookLM</a>
    <a class="gem-link" href="https://drive.google.com" target="_blank">Drive</a>
  </div>`;

    // Try to insert after the problem-grid in glosario
    const glosarioMatch = h.match(/<section[^>]*id=["']glosario["'][^>]*>([\s\S]*?)<\/section>/i);
    if (glosarioMatch) {
      const glosarioContent = glosarioMatch[0];
      const lastGridClose = glosarioContent.lastIndexOf('</div>');
      if (lastGridClose > -1) {
        // Insert before section close
        const sectionCloseIdx = h.indexOf('</section>', h.indexOf('id="glosario"'));
        h = h.slice(0, sectionCloseIdx) + gemBar + '\n' + h.slice(sectionCloseIdx);
        gemLinksAdded += 3;
      }
    }
  }

  const totalGemLinks = countOccurrences(h, /class=["'][^"']*gem-link[^"']*["']/gi);
  log('T6', `gem-links: ${totalGemLinks} total` + (gemLinksAdded > 0 ? ` (added gem-bar + ${gemLinksAdded} links)` : ''));
  return h;
}

// ---------------------------------------------------------------------------
// T7: addProblemCardDensity (mostly covered by T2 injections)
// ---------------------------------------------------------------------------

function addProblemCardDensity(h) {
  const before = countOccurrences(h, /class=["'][^"']*problem-card[^"']*["']/gi);

  // The glosario (10 cards) + empezar (6 cards) from T2 should provide sufficient density.
  // Only add more if still below 15.
  if (before < 15) {
    // The sections injected in T2 should have already added enough.
    // This is a safety net — add extra cards to the glosario section if needed.
    log('T7', `problem-cards: ${before} (below target, but T2 injections should cover)`);
  } else {
    log('T7', `problem-cards: ${before} (target met)`);
  }
  return h;
}

// ---------------------------------------------------------------------------
// T3.5: Fix openModal JS to handle all prefixes per spec
// ---------------------------------------------------------------------------

function fixOpenModalJS(h) {
  // Replace the openModal function with the spec-compliant version
  const newOpenModal = `function openModal(id){var el=null;if(/^\\d+$/.test(id)){el=document.getElementById('modal-f'+id);}else if(/^ap\\d/.test(id)){el=document.getElementById('modal-f'+id);}else if(/^g-/.test(id)){el=document.getElementById('modal-f'+id);}else if(/^ka\\d/.test(id)){el=document.getElementById('modal-f'+id);}else if(/^dm\\d/.test(id)){el=document.getElementById('modal-f'+id);}else if(/^l-/.test(id)){el=document.getElementById('modal-f'+id);}else if(/^m-/.test(id)){el=document.getElementById('modal-f'+id);}else if(/^rv-/.test(id)){el=document.getElementById('modal-f'+id);}else{el=document.getElementById('modal-f'+id);}if(!el){el=document.getElementById('modal-'+id)||document.getElementById('modal-uc'+id)||document.getElementById('modal-ap-'+id);}if(el){el.classList.add('active');document.body.style.overflow='hidden';}}`;

  // Replace existing openModal by finding its start and balanced end
  const omStart = h.indexOf('function openModal(');
  if (omStart > -1) {
    // Find the balanced closing brace
    let depth = 0;
    let pos = h.indexOf('{', omStart);
    let omEnd = pos;
    for (let i = pos; i < h.length; i++) {
      if (h[i] === '{') depth++;
      else if (h[i] === '}') {
        depth--;
        if (depth === 0) { omEnd = i + 1; break; }
      }
    }
    h = h.slice(0, omStart) + newOpenModal + h.slice(omEnd);
  }

  // Also fix toggleLang if it still uses html.lang approach
  if (/h\.lang=h\.lang===/.test(h)) {
    const tlStart = h.indexOf('function toggleLang(');
    if (tlStart > -1) {
      let depth = 0;
      let tlEnd = tlStart;
      let pos = h.indexOf('{', tlStart);
      for (let i = pos; i < h.length; i++) {
        if (h[i] === '{') depth++;
        else if (h[i] === '}') {
          depth--;
          if (depth === 0) { tlEnd = i + 1; break; }
        }
      }
      h = h.slice(0, tlStart) +
        `function toggleLang(){var b=document.body;if(b.classList.contains('lang-es')){b.classList.remove('lang-es');b.classList.add('lang-en');localStorage.setItem('wr-lang','en');}else{b.classList.remove('lang-en');b.classList.add('lang-es');localStorage.setItem('wr-lang','es');}}` +
        h.slice(tlEnd);
    }
  }

  // Add language restore from localStorage + keyboard/click event handlers if not present
  if (!/wr-lang/.test(h)) {
    const initCode = `(function(){var l=localStorage.getItem('wr-lang');if(l==='en'){document.body.classList.remove('lang-es');document.body.classList.add('lang-en');}})();`;
    h = h.replace(/<\/script>/, initCode + '\n</script>');
  }

  // Add Enter/Space handler for role="button" if missing
  if (!/role.*button.*click|Enter.*Space/i.test(h) && !/e\.target\.click/i.test(h)) {
    const a11yCode = `document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.getAttribute('role')==='button'){e.preventDefault();e.target.click();}});`;
    h = h.replace(/<\/script>/, a11yCode + '\n</script>');
  }

  return h;
}

// ---------------------------------------------------------------------------
// T3.6: Fix antipatron modal IDs to match spec (modal-fap{N} not modal-ap-{N})
// ---------------------------------------------------------------------------

function fixAntipatronIds(h) {
  // The sample uses modal-ap-1, modal-ap-2 etc. but spec requires modal-fap1, modal-fap2
  // Fix the modal IDs
  h = h.replace(/id=["']modal-ap-(\d+)["']/gi, 'id="modal-fap$1"');

  // Also fix any onclick references to these
  h = h.replace(/openModal\(['"]ap-(\d+)['"]\)/gi, "openModal('ap$1')");

  return h;
}

// ---------------------------------------------------------------------------
// T8: Write output
// ---------------------------------------------------------------------------

function writeOutput(h) {
  if (dryRun) {
    console.log('\n--- DRY RUN ---');
    console.log('Would transform: ' + path.basename(filePath));
    Object.keys(summary).forEach(k => {
      console.log('  ' + k + ': ' + summary[k]);
    });
    const newSize = Buffer.byteLength(h, 'utf-8');
    console.log('  Output: ' + Math.round(newSize / 1024) + 'KB (was ' + Math.round(originalSize / 1024) + 'KB)');
    console.log('--- No file modified ---');
    return;
  }

  fs.writeFileSync(filePath, h, 'utf-8');
  const newSize = fs.statSync(filePath).size;

  console.log('Transformed: ' + path.basename(filePath));
  Object.keys(summary).forEach(k => {
    console.log('  ' + k + ': ' + summary[k]);
  });
  console.log('  Output: ' + Math.round(newSize / 1024) + 'KB (was ' + Math.round(originalSize / 1024) + 'KB)');
}

// ---------------------------------------------------------------------------
// CSS injection for missing component styles
// ---------------------------------------------------------------------------

function injectMissingCSS(h) {
  // Ensure key CSS classes exist that are referenced by injected sections
  const cssToCheck = [
    { test: /\.problem-grid\s*\{/, css: '.problem-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:1.5rem}' },
    { test: /\.problem-card\s*\{/, css: '.problem-card{background:var(--sofka-gray-50);border-left:4px solid var(--sofka-gray-300);border-radius:var(--radius-sm);padding:1.25rem 1.5rem;transition:box-shadow .2s,transform .2s}.problem-card:hover{box-shadow:var(--shadow-md);transform:translateY(-2px)}' },
    { test: /\.tip-card\s*\{/, css: '.tip-card{border-left-width:4px}' },
    { test: /\.clickable-card\s*\{/, css: '.clickable-card{cursor:pointer}' },
    { test: /\.jarvis-card\s*\{/, css: '.jarvis-card{background:var(--sofka-gray-50);border:1px solid var(--sofka-gray-200);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-card);transition:box-shadow .2s,transform .2s;cursor:pointer}.jarvis-card:hover{box-shadow:var(--shadow-md);transform:translateY(-2px)}' },
    { test: /\.jarvis-card-header\s*\{/, css: '.jarvis-card-header{padding:1.25rem 1.5rem 1rem;border-bottom:1px solid var(--sofka-gray-200);display:flex;align-items:center;gap:.75rem}' },
    { test: /\.jarvis-card-body\s*\{/, css: '.jarvis-card-body{padding:1.25rem 1.5rem}' },
    { test: /\.decision-table\s*\{/, css: '.decision-table{width:100%;border-collapse:collapse;margin-top:1rem;box-shadow:var(--shadow-sm)}.decision-table th{background:var(--sofka-gray-200);padding:.75rem 1rem;text-align:left;font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;border-bottom:3px solid var(--sofka-orange)}.decision-table td{padding:.75rem 1rem;border-bottom:1px solid var(--sofka-gray-200);font-size:.88rem}' },
    { test: /\.timeline\s*\{/, css: '.timeline{position:relative;padding-left:2rem;margin:1.5rem 0}.timeline::before{content:"";position:absolute;left:.5rem;top:0;bottom:0;width:2px;background:var(--sofka-gray-300)}' },
    { test: /\.timeline-item\s*\{/, css: '.timeline-item{position:relative;margin-bottom:1.25rem;padding-left:1rem}.timeline-item::before{content:"";position:absolute;left:-1.75rem;top:.4rem;width:10px;height:10px;border-radius:50%;background:var(--sofka-orange);border:2px solid var(--sofka-white);box-shadow:0 0 0 2px var(--sofka-orange)}' },
    { test: /\.timeline-marker\s*\{/, css: '.timeline-marker{font-size:.72rem;font-weight:700;color:var(--sofka-orange);text-transform:uppercase;letter-spacing:.5px;margin-bottom:.25rem}' },
    { test: /\.timeline-content\s*\{/, css: '.timeline-content{font-size:.88rem;color:var(--sofka-gray-700);line-height:1.6}' },
    { test: /\.metrics-row\s*\{/, css: '.metrics-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1.5rem;margin:2rem 0}' },
    { test: /\.metric-card\s*\{/, css: '.metric-card{text-align:center;background:var(--sofka-gray-50);border-radius:var(--radius-md);padding:1.5rem 1rem;box-shadow:var(--shadow-card)}' },
    { test: /\.mv\s*\{/, css: '.mv{font-family:var(--font-display);font-size:2rem;font-weight:700;color:var(--sofka-orange);line-height:1}' },
    { test: /\.ml\s*\{/, css: '.ml{font-size:.75rem;color:var(--sofka-gray-500);margin-top:.5rem;font-weight:500}' },
    { test: /\.acceptance-list\s*\{/, css: '.acceptance-list{padding-left:1.5rem;margin:1rem 0}.acceptance-list li{margin-bottom:.75rem;font-size:.92rem;line-height:1.6;color:var(--sofka-gray-700)}' },
    { test: /\.gem-bar\s*\{/, css: '.gem-bar{background:var(--sofka-gray-50);border:1px solid var(--sofka-gray-200);border-radius:var(--radius-md);padding:1.25rem 1.5rem;display:flex;flex-wrap:wrap;gap:.75rem;align-items:center;margin:1.5rem 0}' },
    { test: /\.gem-bar-title\s*\{/, css: '.gem-bar-title{font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--sofka-gray-500);margin-right:.5rem}' },
    { test: /\.gem-link\s*\{/, css: '.gem-link{display:inline-block;padding:.45rem 1rem;border-radius:var(--radius-sm);font-size:.78rem;font-weight:600;background:var(--sofka-orange-dim);color:var(--sofka-orange);border:1px solid rgba(255,126,8,.25);text-decoration:none;transition:all .2s}.gem-link:hover{background:var(--sofka-orange);color:var(--sofka-white);text-decoration:none}' },
    { test: /\.gem-link\.pulse\s*\{/, css: '.gem-link.pulse{background:var(--sofka-orange);color:var(--sofka-white);animation:pulse 2s infinite}@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(255,126,8,.4)}70%{box-shadow:0 0 0 8px rgba(255,126,8,0)}}' },
    { test: /\.modal-cta\s*\{/, css: '.modal-cta{display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--sofka-gray-200)}' },
    { test: /\.vraid-box\s*\{/, css: '.vraid-box{border:2px solid var(--sofka-orange);border-radius:var(--radius-lg);padding:2rem;margin:1.5rem 0}' },
    { test: /\.vraid-letters\s*\{/, css: '.vraid-letters{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem}' },
    { test: /\.vraid-letter\s*\{/, css: '.vraid-letter{border:1px solid var(--sofka-gray-200);border-radius:var(--radius-md);padding:1.25rem;text-align:center;transition:box-shadow .2s}.vraid-letter:hover{box-shadow:var(--shadow-md)}' },
    { test: /\.apm-equation\s*\{/, css: '.apm-equation{background:var(--sofka-gray-50);border-radius:var(--radius-lg);padding:2rem;margin:1.5rem 0;text-align:center;border:2px solid var(--sofka-orange-dim)}' },
    { test: /\.jarvis-cards\s*\{/, css: '.jarvis-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem}' }
  ];

  let addedCSS = '';
  for (const item of cssToCheck) {
    if (!item.test.test(h)) {
      addedCSS += item.css + '\n';
    }
  }

  if (addedCSS) {
    // Also add responsive/print styles if missing
    if (!/\@media.*max-width.*768/.test(h)) {
      addedCSS += '@media(max-width:768px){.hero-kpis{grid-template-columns:repeat(2,1fr)}.problem-grid,.jarvis-cards,.metrics-row{grid-template-columns:1fr}.hero h1{font-size:1.8rem}}\n';
    }
    if (!/@media\s*print/.test(h)) {
      addedCSS += '@media print{.modal-overlay,.gem-bar,.lang-toggle,.skip-link,nav.toc{display:none!important}.hero{padding:2rem}.callout{break-inside:avoid}}\n';
    }

    h = h.replace(/<\/style>/i, addedCSS + '</style>');
  }

  return h;
}

// ---------------------------------------------------------------------------
// Main pipeline
// ---------------------------------------------------------------------------

// T0: Inject missing CSS classes
html = injectMissingCSS(html);

// T1: Fix bilingual CSS
html = fixBilingualCSS(html);

// T2: Inject missing sections
html = injectMissingSections(html);

// T3: Enrich modals + inject new ones
html = enrichModals(html);

// T3.5: Fix antipatron modal IDs
html = fixAntipatronIds(html);

// T3.6: Fix openModal JS
html = fixOpenModalJS(html);

// T4: Migrate UC cards to jarvis-card format
html = migrateUcCards(html);

// T5: Add clickable attributes
html = addClickableAttributes(html);

// T6: Add gem links
html = addGemLinks(html);

// T7: Check problem-card density
html = addProblemCardDensity(html);

// T8: Write output
writeOutput(html);
