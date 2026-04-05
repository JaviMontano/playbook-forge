#!/usr/bin/env node
/**
 * compose-manifest.js — Deterministic Manifest Composer
 *
 * Composes a playbook manifest JSON from:
 *   1. brief.json (user input)
 *   2. section-block templates (templates/section-blocks/*.json)
 *   3. flow-modal template (templates/modal-templates/flow-modal.json)
 *   4. golden-manifest.json (structural reference)
 *
 * The composed manifest is ~90% template-based. Fields marked _generate: true
 * require LLM completion (~10% of total fields).
 *
 * Usage: node compose-manifest.js <brief.json> [output-manifest.json]
 *
 * No external dependencies — uses only fs and path. Node 18+.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ── CLI ─────────────────────────────────────────────────────────────────────

const briefPath = process.argv[2];
if (!briefPath) {
  process.stderr.write('Usage: node compose-manifest.js <brief.json> [output-manifest.json]\n');
  process.exit(1);
}

const resolvedBrief = path.resolve(briefPath);
const outputPath = process.argv[3]
  ? path.resolve(process.argv[3])
  : path.resolve(__dirname, '..', '..', '..', '..', 'outputs', '.playbook-manifest.json');

// ── Paths ───────────────────────────────────────────────────────────────────

const templatesDir = path.resolve(__dirname, '..', '..', '..', '..', 'templates');
const sectionBlocksDir = path.join(templatesDir, 'section-blocks');
const goldenPath = path.join(templatesDir, 'golden-manifest.json');
const flowModalPath = path.join(templatesDir, 'modal-templates', 'flow-modal.json');

// ── Load inputs ─────────────────────────────────────────────────────────────

function loadJSON(filePath, label) {
  if (!fs.existsSync(filePath)) {
    process.stderr.write('[compose] ERROR: ' + label + ' not found: ' + filePath + '\n');
    process.exit(1);
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    process.stderr.write('[compose] ERROR: Invalid JSON in ' + label + ': ' + e.message + '\n');
    process.exit(1);
  }
}

var brief = loadJSON(resolvedBrief, 'brief.json');
var golden = loadJSON(goldenPath, 'golden-manifest.json');
var flowModal = loadJSON(flowModalPath, 'flow-modal.json');

// Load all section-block templates
var sectionBlocks = {};
if (fs.existsSync(sectionBlocksDir)) {
  var blockFiles = fs.readdirSync(sectionBlocksDir).filter(function(f) { return f.endsWith('.json'); });
  blockFiles.forEach(function(f) {
    var block = loadJSON(path.join(sectionBlocksDir, f), 'section-block/' + f);
    sectionBlocks[block.sectionId || f.replace('.json', '')] = block;
  });
}

// ── Brief defaults ──────────────────────────────────────────────────────────

var b = {
  topic: brief.topic || brief.topicEs || 'Playbook',
  topicEs: brief.topicEs || brief.topic || 'Playbook',
  topicEn: brief.topicEn || brief.topic || 'Playbook',
  roles: brief.roles || ['Manager'],
  tools: brief.tools || [],
  problems: brief.problems || [],
  dataStack: brief.dataStack || { data: 'Google Drive', middleware: 'NotebookLM', front: 'Gemini' },
  language: brief.language || 'es',
  author: brief.author || 'Javier Montano — Sofka Technologies',
  team: brief.team || 'Presales Transversal Sofka',
  initiative: brief.initiative || 'Big Rocks Scale Up 2026',
  version: brief.version || 'v1.0'
};

var primaryTool = b.tools[0] || b.topicEs;
var primaryRole = b.roles[0] || 'Manager';

// ── Placeholder resolution ──────────────────────────────────────────────────

function replacePlaceholders(obj) {
  if (typeof obj === 'string') {
    return obj
      .replace(/\{\{TOOL_NAME\}\}/g, primaryTool)
      .replace(/\{\{TOPIC_ES\}\}/g, b.topicEs)
      .replace(/\{\{TOPIC_EN\}\}/g, b.topicEn)
      .replace(/\{\{AUTHOR\}\}/g, b.author)
      .replace(/\{\{TEAM\}\}/g, b.team)
      .replace(/\{\{VERSION\}\}/g, b.version)
      .replace(/\{\{INITIATIVE\}\}/g, b.initiative)
      .replace(/\{\{ROLE\}\}/g, primaryRole)
      .replace(/\{\{LANGUAGE\}\}/g, b.language)
      .replace(/\{\{PRECISION_TOOL\}\}/g, b.dataStack.middleware || 'NotebookLM')
      .replace(/\{\{EXPLORATION_TOOL\}\}/g, b.dataStack.front || 'Gemini')
      .replace(/\{\{STRUCTURED_TOOL\}\}/g, b.tools[0] || 'Gems')
      .replace(/\{\{DAY_NAME\}\}/g, 'lunes/Monday')
      .replace(/\{\{KATA_COUNT\}\}/g, '5')
      .replace(/\{\{AUDIENCE\}\}/g, b.roles.join(', '))
      .replace(/\{\{PILOT_NAME\}\}/g, '')
      .replace(/\{\{PILOT_RESULTS\}\}/g, '')
      .replace(/\{\{PILOT_METRIC_STATEMENT\}\}/g, '')
      .replace(/\{\{ACKNOWLEDGMENTS_ES\}\}/g, 'Analisis forense, conversacional y multidimensional — Sofka Technologies · ' + b.initiative + '.')
      .replace(/\{\{ACKNOWLEDGMENTS_EN\}\}/g, 'Forensic, conversational and multidimensional analysis — Sofka Technologies · ' + b.initiative + '.')
      .replace(/\{\{OUTPUT_TYPE\}\}/g, 'infografia')
      .replace(/\{\{DELIVERABLE_LIST\}\}/g, 'artefactos semanales')
      .replace(/\{\{USE_CASES\}\}/g, 'casos de uso');
  }
  if (Array.isArray(obj)) {
    return obj.map(replacePlaceholders);
  }
  if (obj !== null && typeof obj === 'object') {
    var result = {};
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      result[keys[i]] = replacePlaceholders(obj[keys[i]]);
    }
    return result;
  }
  return obj;
}

// Resolve flow-specific placeholders for katas
function resolveFlowPlaceholders(str, flows) {
  if (typeof str !== 'string') return str;
  var coreFlows = flows.slice(0, 4).map(function(f) { return 'F' + f.num; }).join(', ');
  var extendedFlows = flows.slice(4, 9).map(function(f) { return 'F' + f.num; }).join(', ');
  var allStandard = flows.slice(0, 12).map(function(f) { return 'F' + f.num; }).join(', ');
  var masterFlow = flows.length > 12 ? 'F' + flows[12].num : 'F13';

  return str
    .replace(/\{\{CORE_FLOWS\}\}/g, coreFlows)
    .replace(/\{\{EXTENDED_FLOWS\}\}/g, extendedFlows)
    .replace(/\{\{ALL_STANDARD_FLOWS\}\}/g, allStandard)
    .replace(/\{\{MASTER_FLOW\}\}/g, masterFlow)
    .replace(/\{\{MASTER_FLOW_NUM\}\}/g, flows.length > 12 ? String(flows[12].num) : '13')
    .replace(/\{\{CORE_FLOW_1\}\}/g, flows.length > 0 ? 'F' + flows[0].num : 'F1')
    .replace(/\{\{CORE_FLOW_2\}\}/g, flows.length > 1 ? 'F' + flows[1].num : 'F2')
    .replace(/\{\{CORE_FLOW_3\}\}/g, flows.length > 2 ? 'F' + flows[2].num : 'F3')
    .replace(/\{\{CORE_FLOW_1_NUM\}\}/g, flows.length > 0 ? String(flows[0].num) : '1')
    .replace(/\{\{CORE_FLOW_3_NUM\}\}/g, flows.length > 2 ? String(flows[2].num) : '3')
    .replace(/\{\{INFRA_FLOWS\}\}/g, flows.slice(6, 10).map(function(f) { return 'F' + f.num; }).join(', '));
}

// ── Tag origin of fields ────────────────────────────────────────────────────

function tagOrigin(obj, origin) {
  if (obj !== null && typeof obj === 'object' && !Array.isArray(obj)) {
    obj._origin = origin;
  }
  return obj;
}

// ── Compose meta ────────────────────────────────────────────────────────────

function composeMeta() {
  var dimCount = (b.dimensions && b.dimensions.length) || 13;
  var meta = {
    title: b.topicEs + ' — Analisis Forense Multidimensional | Sofka Technologies',
    company: 'Sofka Technologies',
    logoUrl: 'https://github.com/ejemplo-deo-repo/mao-brand-assets/blob/main/sofka_logo_full.jpg?raw=true',
    logoAlt: 'Sofka Technologies',
    badges: [
      b.team,
      dimCount + ' Dimensiones de Analisis',
      'Forensic · Conversacional · Multidimensional',
      b.topicEs + ' · ' + b.initiative
    ],
    language: b.language,
    bilingual: true,
    version: b.version,
    team: b.team,
    initiative: b.initiative,
    designSystem: 'Sofka DS v5.1',
    copyright: '&copy; 2026 Sofka Technologies. Todos los derechos reservados. Autor: ' + b.author + '.',
    _brief: true
  };
  return meta;
}

// ── Compose hero ────────────────────────────────────────────────────────────

function composeHero() {
  var dimCount = (b.dimensions && b.dimensions.length) || 13;
  var findingsCount = (b.findings && b.findings.length) || 0;
  return {
    logoText: 'Sofka Technologies',
    logoUrl: 'https://github.com/ejemplo-deo-repo/mao-brand-assets/blob/main/sofka_logo_full.jpg?raw=true',
    h1Es: b.topicEs + ' — <span>Analisis Forense</span> Multidimensional',
    h1En: b.topicEn + ' — Multidimensional <span>Forensic Analysis</span>',
    h1Plain: b.topicEs + ' —',
    h1Highlight: 'Analisis Forense',
    subtitle: '_generate',
    subtitleEs: '_generate',
    subtitleEn: '_generate',
    _generate: true,
    kpis: [
      { icon: '&#128269;', value: String(dimCount), labelEs: 'Dimensiones analizadas', labelEn: 'Dimensions assessed', label: 'Dimensiones analizadas' },
      { icon: '&#128200;', value: String(findingsCount || '—'), labelEs: 'Hallazgos documentados', labelEn: 'Documented findings', label: 'Hallazgos documentados' },
      { icon: '&#128101;', value: String((b.stakeholders && b.stakeholders.length) || '—'), labelEs: 'Stakeholders entrevistados', labelEn: 'Stakeholders interviewed', label: 'Stakeholders entrevistados' },
      { icon: '&#128736;', value: '3 capas', labelEs: 'Forense + Conversacional + Multidimensional', labelEn: 'Forensic + Conversational + Multidimensional', label: 'Metodologia 3 capas' },
      { icon: '&#128203;', value: '—', labelEs: 'Recomendaciones accionables', labelEn: 'Actionable recommendations', label: 'Recomendaciones' },
      { icon: '&#9989;', value: 'Evidencia', labelEs: 'Cada hallazgo trazable a su fuente', labelEn: 'Every finding traceable to its source', label: 'Evidencia trazable' }
    ],
    _brief: true
  };
}

// ── Compose flows ───────────────────────────────────────────────────────────

function composeFlows() {
  // Use golden flows as structural base, adapt tool references
  var goldenFlows = golden.flows || [];
  var flows = goldenFlows.map(function(gf) {
    var flow = {
      num: gf.num,
      nameEs: gf.nameEs,
      nameEn: gf.nameEn,
      tool: gf.tool || primaryTool,
      whenEs: gf.whenEs || '_generate',
      whenEn: gf.whenEn || '_generate',
      outputEs: gf.outputEs || '_generate',
      outputEn: gf.outputEn || '_generate',
      kata: gf.kata || 'KA-2',
      duration: gf.duration || '30 min',
      modalId: gf.modalId || 'modal-f' + gf.num,
      color: gf.color || 'var(--sofka-info)',
      _template: true,
      // Modal content fields that need LLM generation
      purposeEs: '_generate',
      purposeEn: '_generate',
      steps: [],
      dodEs: '_generate',
      dodEn: '_generate',
      progressionEs: '_generate',
      progressionEn: '_generate',
      _generate: true
    };
    if (gf.gemLinks) { flow.gemLinks = gf.gemLinks; }
    if (gf.iconClass) { flow.iconClass = gf.iconClass; }
    if (gf.frequency) { flow.frequency = gf.frequency; }
    if (gf.highlight) { flow.highlight = gf.highlight; }
    return flow;
  });

  // Validate modal template structure for each flow
  if (flowModal && flowModal.sections) {
    var requiredModalFields = flowModal.sections
      .filter(function(s) { return s._generate === true; })
      .map(function(s) { return s.field; })
      .filter(Boolean);
    // Ensure each flow has all modal fields
    flows.forEach(function(flow) {
      requiredModalFields.forEach(function(field) {
        var esField = field.replace('/En', 'Es').replace('/en', 'Es');
        var enField = field.replace('/Es', 'En').replace('/es', 'En');
        if (esField.indexOf('Es') > -1 && !flow[esField]) {
          flow[esField] = '_generate';
          flow._generate = true;
        }
        if (enField.indexOf('En') > -1 && !flow[enField]) {
          flow[enField] = '_generate';
          flow._generate = true;
        }
      });
    });
  }

  return flows;
}

// ── Compose glossary from template ──────────────────────────────────────────

function composeGlossary() {
  var glosarioBlock = sectionBlocks.glosario;
  if (!glosarioBlock || !glosarioBlock.terms) {
    process.stderr.write('[compose] WARN: glosario.json template not found, using empty glossary\n');
    return [];
  }
  return glosarioBlock.terms.map(function(term) {
    return {
      id: term.id,
      name: term.nameEs + ' / ' + term.nameEn,
      nameEs: term.nameEs,
      nameEn: term.nameEn,
      shortEs: term.shortEs,
      shortEn: term.shortEn,
      color: term.color || 'var(--sofka-info)',
      conceptEs: '_generate',
      conceptEn: '_generate',
      whyEs: '_generate',
      whyEn: '_generate',
      _template: true,
      _generate: true
    };
  });
}

// ── Compose anti-patterns from template ─────────────────────────────────────

function composeAntiPatterns() {
  var apBlock = sectionBlocks.antipatrones;
  if (!apBlock || !apBlock.genericAntiPatterns) {
    process.stderr.write('[compose] WARN: antipatrones.json template not found, using empty array\n');
    return [];
  }
  return apBlock.genericAntiPatterns.map(function(ap) {
    return {
      num: ap.num,
      id: ap.id,
      nameEs: ap.nameEs,
      nameEn: ap.nameEn,
      subtitleEs: ap.subtitleEs,
      subtitleEn: ap.subtitleEn,
      symptomEs: ap.symptomEs,
      symptomEn: ap.symptomEn,
      steps: ap.steps,
      accountabilityEs: ap.accountabilityEs,
      accountabilityEn: ap.accountabilityEn,
      conceptEs: '_generate',
      conceptEn: '_generate',
      whyEs: '_generate',
      whyEn: '_generate',
      _template: true,
      _generate: true
    };
  });
}

// ── Compose katas from golden + template ────────────────────────────────────

function composeKatas() {
  var katasBlock = sectionBlocks.katas;
  var goldenKatas = golden.katas || [];
  var levels = katasBlock ? katasBlock.levels : [];

  return goldenKatas.map(function(gk, i) {
    var tpl = levels[i] || {};
    return {
      id: gk.id || 'ka' + (i + 1),
      number: gk.num || (i + 1),
      num: gk.num || (i + 1),
      name: gk.nameEs,
      nameEs: gk.nameEs,
      nameEn: gk.nameEn,
      objective: gk.practiceEs || '_generate',
      jarvisAgent: primaryTool,
      shuHaRiLevel: (gk.phase || tpl.phase || 'shu').toLowerCase(),
      phase: gk.phase || tpl.phase || 'Shu',
      duration: gk.duration || tpl.duration || '30 min',
      color: gk.color || tpl.color || 'var(--sofka-orange)',
      activeFlows: gk.activeFlows || '_generate',
      practiceEs: gk.practiceEs || tpl.practiceEs || '_generate',
      practiceEn: gk.practiceEn || tpl.practiceEn || '_generate',
      advanceSignalEs: gk.advanceSignalEs || tpl.criterionEs || '_generate',
      advanceSignalEn: gk.advanceSignalEn || tpl.criterionEn || '_generate',
      steps: [
        { stepNumber: 1, instruction: gk.practiceEs || '_generate' },
        { stepNumber: 2, instruction: '_generate' },
        { stepNumber: 3, instruction: '_generate' }
      ],
      successCriteria: [gk.advanceSignalEs || '_generate'],
      checkpoint: '_generate',
      _template: true,
      _generate: true
    };
  });
}

// ── Compose sections from golden + section-blocks ───────────────────────────

function composeSections() {
  var goldenSections = golden.sections || [];
  return goldenSections.map(function(gs) {
    var block = sectionBlocks[gs.id];
    var section = {
      id: gs.id,
      order: gs.order,
      headerTitle: gs.h2Es ? gs.h2Es.replace(/<[^>]+>/g, '') : gs.id,
      headerHighlight: '',
      headerDescription: gs.descEs || '',
      h2Es: gs.h2Es || '',
      h2En: gs.h2En || '',
      descEs: gs.descEs || (block ? block.descEs : '') || '',
      descEn: gs.descEn || (block ? block.descEn : '') || '',
      components: (gs.components || []).map(function(c) {
        if (typeof c === 'string') {
          return { type: c.replace(/^(flow-cards|glossary-cards|antipatterns).*/, function(m) {
            if (m.indexOf('glossary') > -1) return 'glossary-grid';
            if (m.indexOf('antipattern') > -1) return 'antipattern-table';
            if (m.indexOf('flow-card') > -1) return 'problem-grid';
            return m;
          }), data: null };
        }
        return c;
      }),
      _template: true
    };

    // Extract highlight from h2
    var hlMatch = (gs.h2Es || '').match(/<span>(.*?)<\/span>/);
    if (hlMatch) {
      section.headerHighlight = hlMatch[1];
    }

    // Merge section-block specific data
    if (block) {
      section._blockData = block;
      section._template = true;
    }

    return section;
  });
}

// ── Compose empezar cards from template + flows ─────────────────────────────

function composeEmpezarCards(flows) {
  var empezarBlock = sectionBlocks.empezar;
  if (!empezarBlock || !empezarBlock.empathyCards) return [];

  return empezarBlock.empathyCards.map(function(card, i) {
    var flow = flows[i];
    var composed = {
      slot: card.slot,
      color: card.color,
      _template: true
    };

    if (card.isStatic) {
      composed.titleEs = card.titleEs;
      composed.titleEn = card.titleEn;
      composed.descEs = replacePlaceholders(card.descEs);
      composed.descEn = replacePlaceholders(card.descEn);
      composed.isStatic = true;
    } else {
      composed.titleEs = '_generate';
      composed.titleEn = '_generate';
      composed.descEs = '_generate';
      composed.descEn = '_generate';
      composed.flowNum = flow ? flow.num : (i + 1);
      composed.flowRef = flow ? 'F' + flow.num : 'F' + (i + 1);
      composed._generate = true;
    }

    return composed;
  });
}

// ── Compose manager profiles from golden ────────────────────────────────────

function composeManagerProfiles() {
  var profiles = golden.managerProfiles;
  if (profiles) return profiles;
  // Default 3 profiles
  return [
    { level: 'novato', shuHaRi: 'shu', nameEs: 'Novato', nameEn: 'Novice', descEs: '_generate', descEn: '_generate', _generate: true },
    { level: 'practicante', shuHaRi: 'ha', nameEs: 'Practicante', nameEn: 'Practitioner', descEs: '_generate', descEn: '_generate', _generate: true },
    { level: 'autonomo', shuHaRi: 'ri', nameEs: 'Autonomo', nameEn: 'Autonomous', descEs: '_generate', descEn: '_generate', _generate: true }
  ];
}

// ── Compose architecture layers ─────────────────────────────────────────────

function composeArchLayers() {
  if (golden.architectureLayers) return golden.architectureLayers;
  var ds = b.dataStack;
  return [
    {
      name: 'Data',
      description: ds.data || 'Google Drive',
      icon: '&#128193;',
      items: [{ name: ds.data || 'Google Drive' }]
    },
    {
      name: 'Middleware',
      description: ds.middleware || 'NotebookLM',
      icon: '&#128218;',
      items: [{ name: ds.middleware || 'NotebookLM' }]
    },
    {
      name: 'Front',
      description: ds.front || 'Gemini',
      icon: '&#129302;',
      items: [{ name: ds.front || 'Gemini' }]
    }
  ];
}

// ── Compose nav ─────────────────────────────────────────────────────────────

function composeNav(sections, flowCount) {
  var links = sections.map(function(s) {
    return {
      href: '#' + s.id,
      labelEs: s.h2Es ? s.h2Es.replace(/<[^>]+>/g, '').substring(0, 20) : s.id,
      labelEn: s.h2En ? s.h2En.replace(/<[^>]+>/g, '').substring(0, 20) : s.id,
      label: s.h2Es ? s.h2Es.replace(/<[^>]+>/g, '').substring(0, 20) : s.id
    };
  });
  return {
    logoText: 'Sofka',
    logoUrl: 'https://github.com/ejemplo-deo-repo/mao-brand-assets/blob/main/sofka_logo_full.jpg?raw=true',
    links: links,
    _template: true
  };
}

// ── Compose footer ──────────────────────────────────────────────────────────

function composeFooter() {
  return {
    logoText: 'Sofka Technologies',
    logoUrl: 'https://github.com/ejemplo-deo-repo/mao-brand-assets/blob/main/sofka_logo_full.jpg?raw=true',
    copyright: '&copy; 2026 Sofka Technologies. Todos los derechos reservados. Autor: ' + b.author + '.',
    badges: [b.team, b.initiative, b.version],
    _template: true
  };
}

// ── MAIN: Compose full manifest ─────────────────────────────────────────────

function compose() {
  process.stderr.write('[compose] Reading brief: ' + resolvedBrief + '\n');
  process.stderr.write('[compose] Golden manifest: ' + goldenPath + '\n');
  process.stderr.write('[compose] Section blocks: ' + Object.keys(sectionBlocks).join(', ') + '\n');

  var flows = composeFlows();
  var sections = composeSections();
  var glossary = composeGlossary();
  var antiPatterns = composeAntiPatterns();
  var katas = composeKatas();
  var empezarCards = composeEmpezarCards(flows);

  var manifest = {
    schemaVersion: '2.0',
    _composedAt: new Date().toISOString(),
    _briefSource: resolvedBrief,
    _pipeline: {
      step: 'compose',
      templatePercent: 90,
      generatePercent: 10,
      note: 'Fields with _generate: true need LLM completion'
    },
    meta: composeMeta(),
    hero: composeHero(),
    nav: composeNav(sections, flows.length),
    sections: sections,
    flows: flows,
    katas: katas,
    glossary: glossary,
    antiPatterns: antiPatterns,
    managerProfiles: composeManagerProfiles(),
    architectureLayers: composeArchLayers(),
    empezarCards: empezarCards,
    footer: composeFooter()
  };

  // Resolve all placeholders recursively
  manifest = replacePlaceholders(manifest);

  // Second pass: resolve flow-specific placeholders in katas and sections
  function resolveFlowPlaceholdersDeep(obj) {
    if (typeof obj === 'string') {
      return resolveFlowPlaceholders(obj, flows);
    }
    if (Array.isArray(obj)) {
      return obj.map(resolveFlowPlaceholdersDeep);
    }
    if (obj !== null && typeof obj === 'object') {
      var result = {};
      var keys = Object.keys(obj);
      for (var idx = 0; idx < keys.length; idx++) {
        result[keys[idx]] = resolveFlowPlaceholdersDeep(obj[keys[idx]]);
      }
      return result;
    }
    return obj;
  }
  manifest = resolveFlowPlaceholdersDeep(manifest);

  // ── Statistics ──────────────────────────────────────────────────────────

  var generateCount = 0;
  var templateCount = 0;
  var briefCount = 0;

  function countFlags(obj) {
    if (obj !== null && typeof obj === 'object') {
      if (obj._generate === true) generateCount++;
      if (obj._template === true) templateCount++;
      if (obj._brief === true) briefCount++;
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        if (typeof obj[keys[i]] === 'object' && obj[keys[i]] !== null) {
          countFlags(obj[keys[i]]);
        }
      }
      if (Array.isArray(obj)) {
        obj.forEach(countFlags);
      }
    }
  }
  countFlags(manifest);

  // Count _generate string fields (fields whose value is literally '_generate')
  var generateFieldCount = 0;
  function countGenerateStrings(obj) {
    if (typeof obj === 'string' && obj === '_generate') {
      generateFieldCount++;
    } else if (Array.isArray(obj)) {
      obj.forEach(countGenerateStrings);
    } else if (obj !== null && typeof obj === 'object') {
      Object.keys(obj).forEach(function(k) { countGenerateStrings(obj[k]); });
    }
  }
  countGenerateStrings(manifest);

  manifest._stats = {
    totalSections: sections.length,
    totalFlows: flows.length,
    totalKatas: katas.length,
    totalGlossary: glossary.length,
    totalAntiPatterns: antiPatterns.length,
    generateObjects: generateCount,
    generateFields: generateFieldCount,
    templateObjects: templateCount,
    briefObjects: briefCount
  };

  // ── Write output ────────────────────────────────────────────────────────

  var outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  var json = JSON.stringify(manifest, null, 2);
  fs.writeFileSync(outputPath, json, 'utf8');

  process.stderr.write('[compose] Manifest written: ' + outputPath + '\n');
  process.stderr.write('[compose] Sections: ' + sections.length + ' | Flows: ' + flows.length + ' | Katas: ' + katas.length + '\n');
  process.stderr.write('[compose] Glossary: ' + glossary.length + ' | Anti-patterns: ' + antiPatterns.length + '\n');
  process.stderr.write('[compose] _generate fields (LLM needed): ' + generateFieldCount + '\n');
  process.stderr.write('[compose] Template objects: ' + templateCount + ' | Brief objects: ' + briefCount + '\n');

  // Output summary to stdout as JSON
  process.stdout.write(JSON.stringify({
    status: 'composed',
    output: outputPath,
    stats: manifest._stats
  }, null, 2) + '\n');
}

compose();
