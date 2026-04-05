#!/usr/bin/env node
/**
 * verify-spec.js — PLAYBOOK-SPEC v1.0 Gate Validator
 *
 * Validates any HTML playbook file against the Entrusted Playbook Specification.
 * Runs Gates G0-G5 (38 automated blocking checks) + G6 (soft). Reports pass/fail per
 * check with actual vs required counts.
 *
 * Usage: node verify-spec.js <playbook.html>
 * Output: JSON report to stdout
 *
 * No external dependencies — uses only Node.js built-ins.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function countMatches(html, pattern) {
  const matches = html.match(pattern);
  return matches ? matches.length : 0;
}

function hasMatch(html, pattern) {
  return pattern.test(html);
}

function check(id, name, passed, actual, required, note) {
  return { id, name, passed: !!passed, actual, required, note: note || null };
}

// ---------------------------------------------------------------------------
// Gate definitions
// ---------------------------------------------------------------------------

function gateG0(html, fileSize) {
  const checks = [];

  // G0.1: 10+ <section tags with id attributes
  const sectionIds = countMatches(html, /<section[^>]*\sid=["'][^"']+["']/gi);
  checks.push(check('G0.1', 'Sections with id', sectionIds >= 10, sectionIds, '>=10'));

  // G0.2: 30+ modal-overlay elements
  const modals = countMatches(html, /class=["'][^"']*modal-overlay[^"']*["']/gi);
  checks.push(check('G0.2', 'Modal overlays', modals >= 30, modals, '>=30'));

  // G0.3: body has class containing lang-es
  const bodyLangEs = hasMatch(html, /<body[^>]*class=["'][^"']*lang-es[^"']*["']/i);
  checks.push(check('G0.3', 'body.lang-es', bodyLangEs, bodyLangEs ? 'present' : 'missing', 'present'));

  // G0.4: JS script block with toggleLang, openModal, closeModal
  const hasToggleLang = hasMatch(html, /toggleLang/);
  const hasOpenModal = hasMatch(html, /openModal/);
  const hasCloseModal = hasMatch(html, /closeModal/);
  const jsComplete = hasToggleLang && hasOpenModal && hasCloseModal;
  const jsMissing = [];
  if (!hasToggleLang) jsMissing.push('toggleLang');
  if (!hasOpenModal) jsMissing.push('openModal');
  if (!hasCloseModal) jsMissing.push('closeModal');
  checks.push(check('G0.4', 'JS runtime functions', jsComplete,
    jsComplete ? 'all present' : 'missing: ' + jsMissing.join(', '), 'toggleLang + openModal + closeModal'));

  // G0.5: 0 unreplaced placeholders
  const placeholders = countMatches(html, /\{\{[A-Z_]+\}\}/g);
  const swarmMarkers = countMatches(html, /<!--\s*SWARM:/g);
  const totalPlaceholders = placeholders + swarmMarkers;
  checks.push(check('G0.5', 'Unreplaced placeholders', totalPlaceholders === 0, totalPlaceholders, '0'));

  // G0.6: File size > 150KB
  const sizeKB = Math.round(fileSize / 1024);
  checks.push(check('G0.6', 'File size > 150KB', fileSize > 153600, sizeKB + 'KB', '>150KB'));

  return { gate: 'G0', name: 'Structure', checks };
}

function gateG1(html) {
  const checks = [];

  // G1.1: 40+ timeline-item
  const timelineItems = countMatches(html, /class=["'][^"']*timeline-item[^"']*["']/gi);
  checks.push(check('G1.1', 'timeline-item', timelineItems >= 40, timelineItems, '>=40'));

  // G1.2: 30+ callout
  const callouts = countMatches(html, /class=["']callout[\s"']/gi);
  checks.push(check('G1.2', 'callout', callouts >= 30, callouts, '>=30'));

  // G1.3: 15+ problem-card
  const problemCards = countMatches(html, /class=["'][^"']*problem-card[^"']*["']/gi);
  checks.push(check('G1.3', 'problem-card', problemCards >= 15, problemCards, '>=15'));

  // G1.4: 8+ jarvis-card
  const jarvisCards = countMatches(html, /class=["'][^"']*jarvis-card[^"']*["']/gi);
  checks.push(check('G1.4', 'jarvis-card', jarvisCards >= 8, jarvisCards, '>=8'));

  // G1.5: 20+ clickable-card
  const clickableCards = countMatches(html, /class=["'][^"']*clickable-card[^"']*["']/gi);
  checks.push(check('G1.5', 'clickable-card', clickableCards >= 20, clickableCards, '>=20'));

  // G1.6: 5+ gem-link
  const gemLinks = countMatches(html, /class=["'][^"']*gem-link[^"']*["']/gi);
  checks.push(check('G1.6', 'gem-link', gemLinks >= 5, gemLinks, '>=5'));

  return { gate: 'G1', name: 'Content Density', checks };
}

function gateG2(html) {
  const checks = [];

  // G2.1: span.es count ~= span.en count (+-5)
  const spanEs = countMatches(html, /class=["']es["']/gi);
  const spanEn = countMatches(html, /class=["']en["']/gi);
  const diff = Math.abs(spanEs - spanEn);
  checks.push(check('G2.1', 'Bilingual span balance',
    diff <= 5, 'es=' + spanEs + ' en=' + spanEn + ' diff=' + diff, 'diff<=5'));

  // G2.2: h2 elements come in bilingual pairs
  // Pattern A: paired h2 tags with class="es" and class="en" (golden reference)
  // Pattern B: single h2 containing both span.es and span.en
  const h2Es = countMatches(html, /<h2[^>]*class=["'][^"']*\bes\b[^"']*["'][^>]*>/gi);
  const h2En = countMatches(html, /<h2[^>]*class=["'][^"']*\ben\b[^"']*["'][^>]*>/gi);
  const h2Blocks = html.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi) || [];
  let h2InternalBilingual = 0;
  for (const block of h2Blocks) {
    if (/class=["']es["']/i.test(block) && /class=["']en["']/i.test(block)) {
      h2InternalBilingual++;
    }
  }
  // Pass if: paired h2.es/h2.en counts match (within 2), OR >=80% have internal bilingual
  const h2Paired = h2Es > 0 && h2En > 0 && Math.abs(h2Es - h2En) <= 2;
  const h2InternalRatio = h2Blocks.length > 0 ? h2InternalBilingual / h2Blocks.length : 0;
  const h2Ok = h2Paired || h2InternalRatio >= 0.8;
  checks.push(check('G2.2', 'h2 bilingual pairs', h2Ok,
    'paired:' + h2Es + 'es/' + h2En + 'en internal:' + h2InternalBilingual + '/' + h2Blocks.length,
    'paired OR >=80% internal'));

  // G2.3: modal-header h3 elements have bilingual pairs
  const modalHeaders = html.match(/<div class=["']modal-header["']>[\s\S]*?<\/div>/gi) || [];
  const mhTotal = modalHeaders.length;
  let mhBilingual = 0;
  for (const mh of modalHeaders) {
    const h3Match = mh.match(/<h3[^>]*>[\s\S]*?<\/h3>/i);
    if (h3Match) {
      const hasEs = /class=["']es["']/i.test(h3Match[0]);
      const hasEn = /class=["']en["']/i.test(h3Match[0]);
      if (hasEs && hasEn) mhBilingual++;
    }
  }
  const mhRatio = mhTotal > 0 ? mhBilingual / mhTotal : 0;
  checks.push(check('G2.3', 'Modal h3 bilingual pairs',
    mhRatio >= 0.8, mhBilingual + '/' + mhTotal + ' (' + Math.round(mhRatio * 100) + '%)', '>=80%'));

  // G2.4: Language toggle button in nav
  const hasLangToggle = hasMatch(html, /toggleLang\(\)/i) && hasMatch(html, /<nav[^>]*class=["'][^"']*toc/i);
  checks.push(check('G2.4', 'Language toggle in nav', hasLangToggle,
    hasLangToggle ? 'present' : 'missing', 'present'));

  return { gate: 'G2', name: 'Bilingual Completeness', checks };
}

function gateG3(html) {
  const checks = [];

  // G3.1: 20+ role="button"
  const roleButtons = countMatches(html, /role=["']button["']/gi);
  checks.push(check('G3.1', 'role="button" elements', roleButtons >= 20, roleButtons, '>=20'));

  // G3.2: All modal-close buttons have aria-label
  const modalCloseAll = html.match(/<button[^>]*class=["'][^"']*modal-close[^"']*["'][^>]*>/gi) || [];
  const modalCloseWithAria = modalCloseAll.filter(btn => /aria-label/i.test(btn));
  const closeTotal = modalCloseAll.length;
  const closeWithAria = modalCloseWithAria.length;
  checks.push(check('G3.2', 'modal-close aria-label',
    closeTotal > 0 && closeTotal === closeWithAria,
    closeWithAria + '/' + closeTotal, 'all'));

  // G3.3: Skip link present
  const hasSkipLink = hasMatch(html, /class=["'][^"']*skip-link[^"']*["']/i);
  checks.push(check('G3.3', 'Skip link', hasSkipLink,
    hasSkipLink ? 'present' : 'missing', 'present'));

  // G3.4: :focus-visible rule in CSS
  const hasFocusVisible = hasMatch(html, /:focus-visible/);
  checks.push(check('G3.4', ':focus-visible CSS rule', hasFocusVisible,
    hasFocusVisible ? 'present' : 'missing', 'present'));

  return { gate: 'G3', name: 'Accessibility', checks };
}

function gateG4(html) {
  const checks = [];

  // G4.1: section#glosario present
  const hasGlosario = hasMatch(html, /<section[^>]*id=["']glosario["']/i);
  checks.push(check('G4.1', 'section#glosario', hasGlosario,
    hasGlosario ? 'present' : 'missing', 'present'));

  // G4.2: section with kata content
  const hasKatas = hasMatch(html, /<section[^>]*id=["'][^"']*kata[^"']*["']/i);
  checks.push(check('G4.2', 'Katas section', hasKatas,
    hasKatas ? 'present' : 'missing', 'present'));

  // G4.3: antipattern section with 5+ clickable rows
  const hasAntipatrones = hasMatch(html, /<section[^>]*id=["'][^"']*antipatr[^"']*["']/i);
  const antipatternModals = countMatches(html, /id=["']modal-fap\d+["']/gi);
  const apOk = hasAntipatrones && antipatternModals >= 5;
  checks.push(check('G4.3', 'Anti-patterns section + 5+ modals', apOk,
    (hasAntipatrones ? 'section:yes' : 'section:no') + ' modals:' + antipatternModals, 'section + >=5 modals'));

  // G4.4: rhythm/adoption section
  const hasRitmo = hasMatch(html, /<section[^>]*id=["'][^"']*ritmo[^"']*["']/i) ||
                   hasMatch(html, /<section[^>]*id=["'][^"']*rhythm[^"']*["']/i);
  checks.push(check('G4.4', 'Rhythm section', hasRitmo,
    hasRitmo ? 'present' : 'missing', 'present'));

  // G4.5: section#empezar with 4+ card elements
  const empezarMatch = html.match(/<section[^>]*id=["']empezar["'][^>]*>[\s\S]*?<\/section>/i);
  let empezarCards = 0;
  if (empezarMatch) {
    empezarCards = countMatches(empezarMatch[0], /class=["'][^"']*(?:problem-card|clickable-card|tip-card|jarvis-card)[^"']*["']/gi);
  }
  const empezarOk = empezarMatch && empezarCards >= 4;
  checks.push(check('G4.5', 'section#empezar + 4+ cards', empezarOk,
    (empezarMatch ? 'section:yes' : 'section:no') + ' cards:' + empezarCards, 'section + >=4 cards'));

  // G4.6: section#cierre with metadata table
  const cierreMatch = html.match(/<section[^>]*id=["']cierre["'][^>]*>[\s\S]*?<\/section>/i);
  let cierreHasTable = false;
  if (cierreMatch) {
    cierreHasTable = /class=["'][^"']*decision-table[^"']*["']/i.test(cierreMatch[0]) ||
                     /<table/i.test(cierreMatch[0]);
  }
  checks.push(check('G4.6', 'section#cierre + metadata', !!cierreMatch && cierreHasTable,
    (cierreMatch ? 'section:yes' : 'section:no') + ' table:' + (cierreHasTable ? 'yes' : 'no'),
    'section + table'));

  return { gate: 'G4', name: 'Mandatory Sections', checks };
}

function gateG5(html) {
  // ═══ GATE G5: V5 Production Bug Prevention ═══
  var g5Checks = [];

  // G5.1: No broken bilingual CSS (.es,.en{display:none} hides everything)
  var hasBrokenBilingual = /\.es\s*,\s*\.en\s*\{\s*display\s*:\s*none/i.test(html);
  g5Checks.push(check('G5.1', 'No broken bilingual CSS', !hasBrokenBilingual,
    hasBrokenBilingual ? 'FOUND .es,.en{display:none} — hides all text!' : 'clean', 'absent'));

  // G5.2: body has class="lang-es" (not just html[lang])
  var hasBodyLangEs = /class=["'][^"']*lang-es[^"']*["']/i.test((html.match(/<body[^>]*>/i) || [''])[0]);
  g5Checks.push(check('G5.2', 'body.lang-es class', hasBodyLangEs,
    hasBodyLangEs ? 'present' : 'missing', 'present'));

  // G5.3: toggleLang without syntax error (no }else{ on same line without space)
  var toggleBlock = (html.match(/function\s+toggleLang[^}]*\}[^}]*\}/s) || [''])[0];
  var hasBadElse = /\}else\{/.test(toggleBlock) && !/\}\s*else\s*\{/.test(toggleBlock);
  g5Checks.push(check('G5.3', 'toggleLang no syntax error', !hasBadElse,
    hasBadElse ? 'FOUND }else{ without space' : 'clean', 'no syntax errors'));

  // G5.4: modal-box has max-height AND overflow-y
  var modalBoxCSS = (html.match(/\.modal-box\s*\{[^}]*\}/i) || [''])[0];
  var hasMaxH = /max-height/.test(modalBoxCSS);
  var hasOverY = /overflow-y/.test(modalBoxCSS);
  g5Checks.push(check('G5.4', 'modal-box scrollable', hasMaxH && hasOverY,
    'max-height:' + hasMaxH + ' overflow-y:' + hasOverY, 'both present'));

  // G5.5: Nav link count matches section count (±3)
  var navBlock = (html.match(/<nav[^>]*>[\s\S]*?<\/nav>/i) || [''])[0];
  var navLinks2 = countMatches(navBlock, /<a\s+href="#[^"]+"/gi);
  var sectionCount2 = countMatches(html, /<section[^>]+id=/gi);
  var navDiff2 = Math.abs(navLinks2 - sectionCount2);
  g5Checks.push(check('G5.5', 'Nav matches sections', navDiff2 <= 3,
    'nav:' + navLinks2 + ' sections:' + sectionCount2 + ' diff:' + navDiff2, 'diff<=3'));

  // G5.6: JS functions exported to window
  var hasWindowToggle = /window\.toggleLang/i.test(html);
  var hasWindowOpen = /window\.openModal/i.test(html);
  var hasWindowClose = /window\.closeModal/i.test(html);
  g5Checks.push(check('G5.6', 'JS window exports', hasWindowToggle && hasWindowOpen && hasWindowClose,
    'toggle:' + hasWindowToggle + ' open:' + hasWindowOpen + ' close:' + hasWindowClose, 'all 3 present'));

  // G5.7: Anti-pattern modals use fap prefix (not ap-)
  var badApModals = countMatches(html, /id=["']modal-ap-\d/gi);
  g5Checks.push(check('G5.7', 'AP modal IDs use fap prefix', badApModals === 0,
    badApModals > 0 ? badApModals + ' modal-ap-N found' : 'all fapN', '0 modal-ap-N'));

  // G5.8: At least 1 prompt-copyable element
  var promptCopyCount = countMatches(html, /class=["'][^"']*prompt-copyable[^"']*["']/gi);
  g5Checks.push(check('G5.8', 'prompt-copyable present', promptCopyCount >= 1,
    promptCopyCount, '>=1'));

  // G5.9: EXITO criteria in at least 1 prompt
  var exitoCount = countMatches(html, /EXITO\s*:/gi);
  g5Checks.push(check('G5.9', 'EXITO criteria present', exitoCount >= 1,
    exitoCount, '>=1'));

  // G5.10: copyPrompt function present
  var hasCopyPrompt = /function\s+copyPrompt|window\.copyPrompt/i.test(html);
  g5Checks.push(check('G5.10', 'copyPrompt function', hasCopyPrompt,
    hasCopyPrompt ? 'present' : 'missing', 'present'));

  return { gate: 'G5', name: 'V5 Bug Prevention', checks: g5Checks };
}

// ---------------------------------------------------------------------------
// Soft gates (informational, not blocking)
// ---------------------------------------------------------------------------

function gateG6(html, fileSize) {
  const checks = [];

  const sizeKB = Math.round(fileSize / 1024);
  const sizeOk = fileSize >= 153600 && fileSize <= 614400;
  checks.push(check('G6.1', 'File size 150-600KB', sizeOk, sizeKB + 'KB', '150-600KB',
    'soft target'));

  const spanEs = countMatches(html, /class=["']es["']/gi);
  checks.push(check('G6.2', '200+ bilingual pairs', spanEs >= 200, spanEs, '>=200',
    'soft target'));

  return { gate: 'G6', name: 'Size Target (soft)', checks };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.error('Usage: node verify-spec.js <playbook.html>');
    console.error('Output: JSON report with gates G0-G5 (38 blocking checks) + G6 (soft)');
    process.exit(1);
  }

  const filePath = path.resolve(args[0]);

  if (!fs.existsSync(filePath)) {
    console.error('Error: File not found: ' + filePath);
    process.exit(1);
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const html = fs.readFileSync(filePath, 'utf-8');

  // Run all gates
  const g0 = gateG0(html, fileSize);
  const g1 = gateG1(html);
  const g2 = gateG2(html);
  const g3 = gateG3(html);
  const g4 = gateG4(html);
  const g5 = gateG5(html);
  const g6 = gateG6(html, fileSize);

  const blockingGates = [g0, g1, g2, g3, g4, g5];
  const allGates = [...blockingGates, g6];

  // Compute results
  let totalChecks = 0;
  let passedChecks = 0;
  const failures = [];

  for (const gate of allGates) {
    for (const c of gate.checks) {
      totalChecks++;
      if (c.passed) {
        passedChecks++;
      } else {
        failures.push(gate.gate + '.' + c.id.split('.')[1] + ' ' + c.name +
          ' (actual: ' + c.actual + ', required: ' + c.required + ')' +
          (c.note ? ' [' + c.note + ']' : ''));
      }
    }
  }

  // Blocking pass = all G0-G4 pass
  let blockingPassed = true;
  for (const gate of blockingGates) {
    for (const c of gate.checks) {
      if (!c.passed) {
        blockingPassed = false;
        break;
      }
    }
    if (!blockingPassed) break;
  }

  // Build report
  const report = {
    file: filePath,
    fileSize: fileSize,
    fileSizeKB: Math.round(fileSize / 1024),
    gates: {},
    passed: blockingPassed,
    score: passedChecks + '/' + totalChecks,
    failures: failures
  };

  for (const gate of allGates) {
    const gatePassed = gate.checks.every(c => c.passed);
    report.gates[gate.gate] = {
      name: gate.name,
      passed: gatePassed,
      checks: {}
    };
    for (const c of gate.checks) {
      report.gates[gate.gate].checks[c.id] = {
        name: c.name,
        passed: c.passed,
        actual: c.actual,
        required: c.required
      };
      if (c.note) report.gates[gate.gate].checks[c.id].note = c.note;
    }
  }

  // Output
  const json = JSON.stringify(report, null, 2);
  console.log(json);

  // Exit code: 0 = pass, 1 = fail
  process.exit(blockingPassed ? 0 : 1);
}

main();
