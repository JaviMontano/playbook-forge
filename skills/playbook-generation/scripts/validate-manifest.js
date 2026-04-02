#!/usr/bin/env node
/**
 * Manifest Validator
 * Validates a playbook content manifest against the JSON schema
 * Reports errors, warnings, and a pass/fail summary
 *
 * Usage: node validate-manifest.js <manifest.json>
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ── CLI ──────────────────────────────────────────────────────────────────────
const manifestPath = process.argv[2];
if (!manifestPath) {
  process.stderr.write('Usage: node validate-manifest.js <manifest.json>\n');
  process.exit(1);
}

const resolvedPath = path.resolve(manifestPath);

// ── Validation context ───────────────────────────────────────────────────────
const errors = [];
const warnings = [];

function err(path, msg) {
  errors.push({ path, message: msg });
}
function warn(path, msg) {
  warnings.push({ path, message: msg });
}

function exists(obj, key) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, key) && obj[key] != null;
}

function isNonEmptyString(val) {
  return typeof val === 'string' && val.trim().length > 0;
}

function isNonEmptyArray(val) {
  return Array.isArray(val) && val.length > 0;
}

function checkRequired(obj, fields, basePath) {
  for (const f of fields) {
    if (!exists(obj, f)) {
      err(`${basePath}.${f}`, `Required field "${f}" is missing.`);
    }
  }
}

function checkString(obj, field, basePath, required) {
  if (required && !isNonEmptyString(obj[field])) {
    err(`${basePath}.${field}`, `Must be a non-empty string.`);
  } else if (exists(obj, field) && typeof obj[field] !== 'string') {
    err(`${basePath}.${field}`, `Must be a string, got ${typeof obj[field]}.`);
  }
}

function checkArray(obj, field, basePath, required, minItems, maxItems) {
  const val = obj[field];
  if (required && !isNonEmptyArray(val)) {
    err(`${basePath}.${field}`, `Required non-empty array is missing or empty.`);
    return false;
  }
  if (val != null && !Array.isArray(val)) {
    err(`${basePath}.${field}`, `Must be an array, got ${typeof val}.`);
    return false;
  }
  if (Array.isArray(val)) {
    if (minItems != null && val.length < minItems) {
      err(`${basePath}.${field}`, `Must have at least ${minItems} items, got ${val.length}.`);
    }
    if (maxItems != null && val.length > maxItems) {
      err(`${basePath}.${field}`, `Must have at most ${maxItems} items, got ${val.length}.`);
    }
  }
  return Array.isArray(val);
}

// ── Validator functions ──────────────────────────────────────────────────────

function validateMeta(meta) {
  const p = 'meta';
  if (!meta || typeof meta !== 'object') {
    err(p, 'Missing or invalid "meta" object.');
    return;
  }
  checkRequired(meta, ['title', 'company', 'badges', 'language'], p);
  checkString(meta, 'title', p, true);
  checkString(meta, 'company', p, true);
  checkArray(meta, 'badges', p, true, 1, 5);

  if (exists(meta, 'language')) {
    if (!['es', 'en'].includes(meta.language)) {
      err(`${p}.language`, `Must be "es" or "en", got "${meta.language}".`);
    }
  }

  // Optional fields
  if (exists(meta, 'version') && !isNonEmptyString(meta.version)) {
    warn(`${p}.version`, 'Version is present but empty.');
  }
  if (!exists(meta, 'version')) {
    warn(`${p}.version`, 'Optional field "version" not provided.');
  }
  if (!exists(meta, 'designSystem')) {
    warn(`${p}.designSystem`, 'Optional field "designSystem" not provided.');
  }
}

function validateHero(hero) {
  const p = 'hero';
  if (!hero || typeof hero !== 'object') {
    err(p, 'Missing or invalid "hero" object.');
    return;
  }
  checkRequired(hero, ['h1Plain', 'h1Highlight', 'subtitle', 'kpis'], p);
  checkString(hero, 'h1Plain', p, true);
  checkString(hero, 'h1Highlight', p, true);
  checkString(hero, 'subtitle', p, true);

  if (checkArray(hero, 'kpis', p, true, 3, 6)) {
    for (let i = 0; i < hero.kpis.length; i++) {
      const kpi = hero.kpis[i];
      const kp = `${p}.kpis[${i}]`;
      if (!kpi || typeof kpi !== 'object') {
        err(kp, 'KPI must be an object.');
        continue;
      }
      checkRequired(kpi, ['icon', 'value', 'label'], kp);
      checkString(kpi, 'icon', kp, true);
      checkString(kpi, 'value', kp, true);
      checkString(kpi, 'label', kp, true);
    }
  }
}

function validateSection(section, index) {
  const p = `sections[${index}]`;
  if (!section || typeof section !== 'object') {
    err(p, 'Section must be an object.');
    return;
  }
  checkRequired(section, ['id', 'headerTitle', 'components'], p);
  checkString(section, 'id', p, true);
  checkString(section, 'headerTitle', p, true);

  // Validate ID pattern
  if (isNonEmptyString(section.id) && !/^[a-z][a-z0-9-]*$/.test(section.id)) {
    err(`${p}.id`, `ID must match pattern ^[a-z][a-z0-9-]*$, got "${section.id}".`);
  }

  if (!exists(section, 'headerHighlight')) {
    warn(`${p}.headerHighlight`, 'No highlight text for section header.');
  }
  if (!exists(section, 'headerDescription')) {
    warn(`${p}.headerDescription`, 'No description for section header.');
  }

  const validTypes = [
    'problem-grid', 'antipatron', 'cycle-visual', 'map-table',
    'jarvis-cards', 'timeline', 'compare-grid', 'metrics-row',
    'semaforo-grid', 'vraid-box', 'gem-bar', 'callout',
    'decision-table', 'guardrail-grid', 'gate-box', 'acceptance-list',
    'testimonial-grid', 'case-highlight', 'recommendations',
    'inline-heading', 'inline-table', 'inline-paragraph'
  ];

  if (checkArray(section, 'components', p, true, 1)) {
    for (let j = 0; j < section.components.length; j++) {
      const comp = section.components[j];
      const cp = `${p}.components[${j}]`;
      if (!comp || typeof comp !== 'object') {
        err(cp, 'Component must be an object.');
        continue;
      }
      if (!exists(comp, 'type')) {
        err(`${cp}.type`, 'Component type is required.');
      } else if (!validTypes.includes(comp.type)) {
        err(`${cp}.type`, `Unknown component type "${comp.type}". Valid: ${validTypes.join(', ')}.`);
      }
      // Check data exists for types that need it
      if (comp.type && comp.type !== 'gate-box' && !exists(comp, 'data')) {
        warn(`${cp}.data`, `Component type "${comp.type}" has no data payload.`);
      }
    }
  }
}

function validateKata(kata, index) {
  const p = `katas[${index}]`;
  if (!kata || typeof kata !== 'object') {
    err(p, 'Kata must be an object.');
    return;
  }
  checkRequired(kata, ['id', 'number', 'name', 'objective', 'jarvisAgent', 'steps', 'successCriteria'], p);
  checkString(kata, 'id', p, true);
  checkString(kata, 'name', p, true);
  checkString(kata, 'objective', p, true);
  checkString(kata, 'jarvisAgent', p, true);

  // Validate id pattern
  if (isNonEmptyString(kata.id) && !/^kata[1-4]$/.test(kata.id)) {
    err(`${p}.id`, `Kata ID must match pattern ^kata[1-4]$, got "${kata.id}".`);
  }

  // Validate number
  if (exists(kata, 'number')) {
    if (typeof kata.number !== 'number' || kata.number < 1 || kata.number > 4) {
      err(`${p}.number`, `Kata number must be 1-4, got ${kata.number}.`);
    }
  }

  // Steps
  if (checkArray(kata, 'steps', p, true, 1)) {
    for (let i = 0; i < kata.steps.length; i++) {
      const step = kata.steps[i];
      const sp = `${p}.steps[${i}]`;
      if (!step || typeof step !== 'object') {
        err(sp, 'Step must be an object.');
        continue;
      }
      checkRequired(step, ['stepNumber', 'instruction'], sp);
      if (exists(step, 'stepNumber') && typeof step.stepNumber !== 'number') {
        err(`${sp}.stepNumber`, 'stepNumber must be an integer.');
      }
      checkString(step, 'instruction', sp, true);
    }
  }

  // Success criteria
  checkArray(kata, 'successCriteria', p, true, 1);

  // Optional checkpoint
  if (!exists(kata, 'checkpoint')) {
    warn(`${p}.checkpoint`, 'No checkpoint/gate text provided.');
  }
}

function validateFlow(flow, index) {
  const p = `flows[${index}]`;
  if (!flow || typeof flow !== 'object') {
    err(p, 'Flow must be an object.');
    return;
  }
  checkRequired(flow, ['number', 'name', 'trigger', 'jarvisSequence', 'output'], p);

  if (exists(flow, 'number')) {
    if (typeof flow.number !== 'number' || flow.number < 1 || flow.number > 20) {
      err(`${p}.number`, `Flow number must be 1-20, got ${flow.number}.`);
    }
  }

  checkString(flow, 'name', p, true);
  checkString(flow, 'trigger', p, true);
  checkString(flow, 'output', p, true);
  checkArray(flow, 'jarvisSequence', p, true, 1);

  // Optional fields
  if (!exists(flow, 'estimatedTime')) {
    warn(`${p}.estimatedTime`, 'No estimated time provided.');
  }
  if (!exists(flow, 'frequency')) {
    warn(`${p}.frequency`, 'No frequency provided.');
  }
}

function validateArchLayers(layers) {
  const p = 'architectureLayers';
  if (!Array.isArray(layers)) {
    err(p, 'Must be an array.');
    return;
  }
  if (layers.length < 1) {
    err(p, 'Must have at least 1 architecture layer.');
  }
  if (layers.length > 5) {
    err(p, `Must have at most 5 layers, got ${layers.length}.`);
  }

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const lp = `${p}[${i}]`;
    if (!layer || typeof layer !== 'object') {
      err(lp, 'Layer must be an object.');
      continue;
    }
    checkRequired(layer, ['name', 'description', 'items'], lp);
    checkString(layer, 'name', lp, true);
    checkString(layer, 'description', lp, true);

    if (!exists(layer, 'icon')) {
      warn(`${lp}.icon`, 'No icon provided for layer.');
    }

    if (checkArray(layer, 'items', lp, true, 1)) {
      for (let j = 0; j < layer.items.length; j++) {
        const item = layer.items[j];
        const ip = `${lp}.items[${j}]`;
        if (!item || typeof item !== 'object') {
          err(ip, 'Item must be an object.');
          continue;
        }
        checkRequired(item, ['name'], ip);
      }
    }
  }
}

function validateFooter(footer) {
  const p = 'footer';
  if (!footer || typeof footer !== 'object') {
    err(p, 'Missing or invalid "footer" object.');
    return;
  }
  checkRequired(footer, ['logoText', 'copyright'], p);
  checkString(footer, 'logoText', p, true);
  checkString(footer, 'copyright', p, true);

  if (!exists(footer, 'badges')) {
    warn(`${p}.badges`, 'No footer badges provided.');
  } else {
    checkArray(footer, 'badges', p, false, 1, 5);
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

function validate() {
  // 1. JSON parse check
  let manifest;
  try {
    const raw = fs.readFileSync(resolvedPath, 'utf8');
    manifest = JSON.parse(raw);
  } catch (parseErr) {
    const report = {
      valid: false,
      errors: [{ path: 'root', message: `JSON parse error: ${parseErr.message}` }],
      warnings: [],
      summary: 'FAIL: Invalid JSON.'
    };
    process.stdout.write(JSON.stringify(report, null, 2) + '\n');
    process.exit(1);
  }

  // 2. Top-level required fields
  const topRequired = ['meta', 'hero', 'sections', 'katas', 'flows', 'architectureLayers', 'footer'];
  for (const field of topRequired) {
    if (!exists(manifest, field)) {
      err('root', `Required top-level field "${field}" is missing.`);
    }
  }

  // 3. Validate each section
  if (manifest.meta) validateMeta(manifest.meta);
  if (manifest.hero) validateHero(manifest.hero);

  if (Array.isArray(manifest.sections)) {
    if (manifest.sections.length < 1) {
      err('sections', 'Must have at least 1 section.');
    }
    for (let i = 0; i < manifest.sections.length; i++) {
      validateSection(manifest.sections[i], i);
    }
  }

  if (Array.isArray(manifest.katas)) {
    if (manifest.katas.length !== 4) {
      err('katas', `Must have exactly 4 katas, got ${manifest.katas.length}.`);
    }
    for (let i = 0; i < manifest.katas.length; i++) {
      validateKata(manifest.katas[i], i);
    }
  }

  if (Array.isArray(manifest.flows)) {
    if (manifest.flows.length < 1) {
      err('flows', 'Must have at least 1 flow.');
    }
    for (let i = 0; i < manifest.flows.length; i++) {
      validateFlow(manifest.flows[i], i);
    }
  }

  if (manifest.architectureLayers) {
    validateArchLayers(manifest.architectureLayers);
  }

  if (manifest.footer) validateFooter(manifest.footer);

  // ── Report ───────────────────────────────────────────────────────────────
  const valid = errors.length === 0;
  const summary = valid
    ? `PASS: Manifest is valid. ${warnings.length} warning(s).`
    : `FAIL: ${errors.length} error(s), ${warnings.length} warning(s).`;

  const report = { valid, errors, warnings, summary };
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');

  if (valid) {
    process.stderr.write(`[validate] ${summary}\n`);
    process.exit(0);
  } else {
    process.stderr.write(`[validate] ${summary}\n`);
    for (const e of errors) {
      process.stderr.write(`  ERROR  ${e.path}: ${e.message}\n`);
    }
    process.exit(1);
  }
}

validate();
