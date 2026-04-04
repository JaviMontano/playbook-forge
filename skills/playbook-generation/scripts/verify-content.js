#!/usr/bin/env node
/**
 * verify-content.js — Content Density Validator
 *
 * Validates CONTENT DENSITY of a playbook manifest — not structure
 * (that's validate-manifest.js) but whether there's enough actual text content.
 *
 * Usage: node verify-content.js <manifest.json>
 * Output: JSON report with { passed, score, checks, generateFieldsRemaining }
 *
 * No external dependencies — uses only fs and path. Node 18+.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ── CLI ─────────────────────────────────────────────────────────────────────

const manifestPath = process.argv[2];
if (!manifestPath) {
  process.stderr.write('Usage: node verify-content.js <manifest.json>\n');
  process.exit(1);
}

const resolvedPath = path.resolve(manifestPath);

if (!fs.existsSync(resolvedPath)) {
  process.stderr.write('[verify-content] ERROR: File not found: ' + resolvedPath + '\n');
  process.exit(1);
}

// ── Load manifest ───────────────────────────────────────────────────────────

var manifest;
try {
  manifest = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
} catch (e) {
  var failReport = {
    passed: false,
    score: '0/10',
    checks: [{ id: 'PARSE', name: 'JSON Parse', passed: false, actual: 0, required: 'valid JSON', note: e.message }],
    generateFieldsRemaining: -1
  };
  process.stdout.write(JSON.stringify(failReport, null, 2) + '\n');
  process.exit(1);
}

// ── Check functions ─────────────────────────────────────────────────────────

var checks = [];
var passCount = 0;

function addCheck(id, name, passed, actual, required, note) {
  checks.push({
    id: id,
    name: name,
    passed: !!passed,
    actual: actual,
    required: required,
    note: note || null
  });
  if (passed) passCount++;
}

// ── 1. Section count ────────────────────────────────────────────────────────

var sectionCount = Array.isArray(manifest.sections) ? manifest.sections.length : 0;
addCheck('C1', 'Section count', sectionCount >= 10, sectionCount, '>=10',
  sectionCount >= 10 ? null : 'Need at least 10 sections, got ' + sectionCount);

// ── 2. Flow count ───────────────────────────────────────────────────────────

var flowCount = Array.isArray(manifest.flows) ? manifest.flows.length : 0;
addCheck('C2', 'Flow count', flowCount >= 13, flowCount, '>=13',
  flowCount >= 13 ? null : 'Need at least 13 flows, got ' + flowCount);

// ── 3. Kata count ───────────────────────────────────────────────────────────

var kataCount = Array.isArray(manifest.katas) ? manifest.katas.length : 0;
addCheck('C3', 'Kata count', kataCount >= 3, kataCount, '>=3 (target 5)',
  kataCount >= 3 ? (kataCount >= 5 ? 'Target 5 met' : 'Minimum met, target is 5') : 'Need at least 3 katas');

// ── 4. Glossary count ───────────────────────────────────────────────────────

var glossaryCount = Array.isArray(manifest.glossary) ? manifest.glossary.length : 0;
addCheck('C4', 'Glossary count', glossaryCount >= 10, glossaryCount, '>=10',
  glossaryCount >= 10 ? null : 'Need at least 10 glossary terms');

// ── 5. Anti-pattern count ───────────────────────────────────────────────────

var apCount = Array.isArray(manifest.antiPatterns) ? manifest.antiPatterns.length : 0;
addCheck('C5', 'Anti-pattern count', apCount >= 5, apCount, '>=5',
  apCount >= 5 ? null : 'Need at least 5 anti-patterns');

// ── 6. Bilingual balance ────────────────────────────────────────────────────

var bilingualImbalance = 0;
var bilingualTotal = 0;

function checkBilingualBalance(obj, basePath) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    obj.forEach(function(item, i) { checkBilingualBalance(item, basePath + '[' + i + ']'); });
    return;
  }
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key.endsWith('Es') && typeof obj[key] === 'string' && obj[key] !== '_generate' && obj[key].trim().length > 0) {
      var enKey = key.slice(0, -2) + 'En';
      bilingualTotal++;
      if (!obj[enKey] || typeof obj[enKey] !== 'string' || obj[enKey].trim().length === 0 || obj[enKey] === '_generate') {
        bilingualImbalance++;
      }
    }
    if (typeof obj[key] === 'object' && obj[key] !== null && key !== '_blockData') {
      checkBilingualBalance(obj[key], basePath + '.' + key);
    }
  }
}

checkBilingualBalance(manifest, 'root');

addCheck('C6', 'Bilingual balance', bilingualImbalance === 0, bilingualImbalance + ' imbalanced of ' + bilingualTotal, '0 imbalances',
  bilingualImbalance === 0 ? 'All Es fields have En counterparts' : bilingualImbalance + ' Es fields missing En counterpart');

// ── 7. Content length (prose fields) ────────────────────────────────────────

var shortProseCount = 0;
var proseFieldsChecked = 0;
var proseFieldNames = ['descEs', 'descEn', 'conceptEs', 'conceptEn', 'purposeEs', 'purposeEn',
  'subtitleEs', 'subtitleEn', 'bodyEs', 'bodyEn', 'symptomEs', 'symptomEn'];

function checkProseLength(obj, basePath) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    obj.forEach(function(item, i) { checkProseLength(item, basePath + '[' + i + ']'); });
    return;
  }
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (proseFieldNames.indexOf(key) > -1 && typeof obj[key] === 'string') {
      var val = obj[key].trim();
      if (val && val !== '_generate' && val.length > 0) {
        proseFieldsChecked++;
        if (val.length < 20) {
          shortProseCount++;
        }
      }
    }
    if (typeof obj[key] === 'object' && obj[key] !== null && key !== '_blockData') {
      checkProseLength(obj[key], basePath + '.' + key);
    }
  }
}

checkProseLength(manifest, 'root');

addCheck('C7', 'Content length (prose >=20 chars)', shortProseCount === 0, shortProseCount + ' short of ' + proseFieldsChecked + ' checked', '0 short fields',
  shortProseCount === 0 ? 'All prose fields have adequate length' : shortProseCount + ' prose fields under 20 characters');

// ── 8. _generate coverage ───────────────────────────────────────────────────

var generateFieldCount = 0;

function countGenerateFields(obj) {
  if (typeof obj === 'string' && obj === '_generate') {
    generateFieldCount++;
  } else if (Array.isArray(obj)) {
    obj.forEach(countGenerateFields);
  } else if (obj !== null && typeof obj === 'object') {
    Object.keys(obj).forEach(function(k) {
      if (k !== '_blockData') countGenerateFields(obj[k]);
    });
  }
}

countGenerateFields(manifest);

// Also count _generate: true boolean flags on objects
var generateObjectCount = 0;
function countGenerateObjects(obj) {
  if (obj !== null && typeof obj === 'object' && !Array.isArray(obj)) {
    if (obj._generate === true) generateObjectCount++;
    Object.keys(obj).forEach(function(k) {
      if (typeof obj[k] === 'object' && obj[k] !== null && k !== '_blockData') {
        countGenerateObjects(obj[k]);
      }
    });
  }
  if (Array.isArray(obj)) {
    obj.forEach(countGenerateObjects);
  }
}
countGenerateObjects(manifest);

// After LLM enrichment, generate fields should be 0. Before LLM, just report count.
var isPostLLM = generateFieldCount === 0;
addCheck('C8', '_generate field coverage', isPostLLM, generateFieldCount + ' _generate fields, ' + generateObjectCount + ' _generate objects',
  '0 after LLM enrichment',
  isPostLLM ? 'All _generate fields have been filled' : generateFieldCount + ' fields still need LLM completion');

// ── 9. Empty fields ─────────────────────────────────────────────────────────

var emptyFieldCount = 0;
var emptyFieldPaths = [];

function countEmptyFields(obj, basePath) {
  if (obj === null || obj === undefined) return;
  if (typeof obj === 'string' && obj.trim() === '' && basePath.indexOf('_') !== 0) {
    emptyFieldCount++;
    if (emptyFieldPaths.length < 10) emptyFieldPaths.push(basePath);
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach(function(item, i) { countEmptyFields(item, basePath + '[' + i + ']'); });
    return;
  }
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(function(k) {
      // Skip internal/meta fields
      if (k.startsWith('_')) return;
      if (k === 'blockData') return;
      countEmptyFields(obj[k], basePath + '.' + k);
    });
  }
}

countEmptyFields(manifest, 'root');

addCheck('C9', 'Empty fields', emptyFieldCount === 0, emptyFieldCount, '0 after LLM enrichment',
  emptyFieldCount === 0 ? 'No empty fields' : emptyFieldCount + ' empty string fields found' +
    (emptyFieldPaths.length > 0 ? ' (first: ' + emptyFieldPaths.slice(0, 3).join(', ') + ')' : ''));

// ── 10. Modal readiness ─────────────────────────────────────────────────────

var modalReadyCount = 0;
var modalMissingFields = 0;
var requiredModalFields = ['purposeEs', 'dodEs', 'progressionEs'];

if (Array.isArray(manifest.flows)) {
  manifest.flows.forEach(function(flow, i) {
    var missingForThisFlow = 0;
    requiredModalFields.forEach(function(field) {
      if (!flow[field] || (typeof flow[field] === 'string' && (flow[field].trim() === '' || flow[field] === '_generate'))) {
        // Field is missing or still needs generation
      } else {
        // Field is present and populated
      }
      if (!flow[field]) {
        missingForThisFlow++;
      }
    });

    // Check steps array exists
    if (!Array.isArray(flow.steps) || flow.steps.length === 0) {
      missingForThisFlow++;
    }

    if (missingForThisFlow === 0) {
      modalReadyCount++;
    } else {
      modalMissingFields += missingForThisFlow;
    }
  });
}

var allModalsReady = modalReadyCount === flowCount && flowCount > 0;
addCheck('C10', 'Modal readiness (flows)', allModalsReady, modalReadyCount + '/' + flowCount + ' flows modal-ready',
  'all flows have modal fields',
  allModalsReady ? 'All flow modals have required fields' : (flowCount - modalReadyCount) + ' flows missing modal fields');

// ── Final report ────────────────────────────────────────────────────────────

var totalChecks = checks.length;
var passed = passCount === totalChecks;

var report = {
  passed: passed,
  score: passCount + '/' + totalChecks,
  checks: checks,
  generateFieldsRemaining: generateFieldCount,
  generateObjectsRemaining: generateObjectCount,
  summary: {
    sections: sectionCount,
    flows: flowCount,
    katas: kataCount,
    glossary: glossaryCount,
    antiPatterns: apCount,
    bilingualImbalance: bilingualImbalance,
    shortProseFields: shortProseCount,
    emptyFields: emptyFieldCount,
    modalReadyFlows: modalReadyCount
  }
};

process.stdout.write(JSON.stringify(report, null, 2) + '\n');

// Log summary to stderr
process.stderr.write('[verify-content] Score: ' + passCount + '/' + totalChecks + (passed ? ' PASS' : ' NEEDS WORK') + '\n');
checks.forEach(function(c) {
  var status = c.passed ? 'PASS' : 'FAIL';
  process.stderr.write('  [' + status + '] ' + c.id + ' ' + c.name + ': ' + c.actual + ' (req: ' + c.required + ')' + (c.note ? ' — ' + c.note : '') + '\n');
});

if (generateFieldCount > 0) {
  process.stderr.write('[verify-content] LLM enrichment needed: ' + generateFieldCount + ' _generate fields remaining\n');
}

process.exit(passed ? 0 : 1);
