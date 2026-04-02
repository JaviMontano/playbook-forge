#!/usr/bin/env node
/**
 * Placeholder Map
 * Documents all {{PLACEHOLDER}} tokens and their sources in the manifest
 * Can check a manifest for completeness against expected placeholders
 *
 * Usage:
 *   node placeholder-map.js              # Print all placeholders
 *   node placeholder-map.js --check m.json  # Check manifest coverage
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ── Placeholder Registry ─────────────────────────────────────────────────────
// Each entry: { name, source, type, required, default }
// source = JSONPath-like reference into the content manifest

const PLACEHOLDERS = [
  // ── 1. Document-Level ────────────────────────────────────────────────────
  { name: 'META_LANG', source: 'meta.language', type: 'string', required: true, default: 'es' },
  { name: 'META_TITLE', source: 'meta.title', type: 'string', required: true, default: null },
  { name: 'META_COMPANY', source: 'meta.company', type: 'string', required: true, default: null },
  { name: 'META_VERSION', source: 'meta.version', type: 'string', required: false, default: 'v1.0' },
  { name: 'META_DESIGN_SYSTEM', source: 'meta.designSystem', type: 'string', required: false, default: null },
  { name: 'GOOGLE_FONTS_URL', source: 'brand-tokens.typography.googleFontsUrl', type: 'url', required: true, default: null },
  { name: 'FONTSHARE_URL', source: 'brand-tokens.typography.fontshareUrl', type: 'url', required: true, default: null },

  // ── 2. CSS Tokens (from brand-tokens) ────────────────────────────────────
  { name: 'TOKEN_PRIMARY', source: 'brand-tokens.colors.primary', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_PRIMARY_LIGHT', source: 'brand-tokens.colors.primaryLight', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_PRIMARY_DARK', source: 'brand-tokens.colors.primaryDark', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_PRIMARY_DIM', source: 'brand-tokens.colors.primaryDim', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_BLACK', source: 'brand-tokens.colors.black', type: 'css-color', required: true, default: '#000000' },
  { name: 'TOKEN_WHITE', source: 'brand-tokens.colors.white', type: 'css-color', required: true, default: '#FFFFFF' },
  { name: 'TOKEN_LIGHT', source: 'brand-tokens.colors.light', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_POSITIVE', source: 'brand-tokens.colors.positive', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_POSITIVE_DIM', source: 'brand-tokens.colors.positiveDim', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_POSITIVE_TEXT', source: 'brand-tokens.colors.positiveText', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_WARNING', source: 'brand-tokens.colors.warning', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_WARNING_DIM', source: 'brand-tokens.colors.warningDim', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_WARNING_BORDER', source: 'brand-tokens.colors.warningBorder', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_CRITICAL', source: 'brand-tokens.colors.critical', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_CRITICAL_DIM', source: 'brand-tokens.colors.criticalDim', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_CRITICAL_BORDER', source: 'brand-tokens.colors.criticalBorder', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_INFO', source: 'brand-tokens.colors.info', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_INFO_DIM', source: 'brand-tokens.colors.infoDim', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_INFO_BORDER', source: 'brand-tokens.colors.infoBorder', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_GREEN', source: 'brand-tokens.colors.green', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_TEAL', source: 'brand-tokens.colors.teal', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_VIOLET', source: 'brand-tokens.colors.violet', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_GRAY_50', source: 'brand-tokens.colors.gray50', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_GRAY_100', source: 'brand-tokens.colors.gray100', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_GRAY_200', source: 'brand-tokens.colors.gray200', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_GRAY_300', source: 'brand-tokens.colors.gray300', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_GRAY_500', source: 'brand-tokens.colors.gray500', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_GRAY_700', source: 'brand-tokens.colors.gray700', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_GRAY_900', source: 'brand-tokens.colors.gray900', type: 'css-color', required: true, default: null },
  { name: 'TOKEN_FONT_DISPLAY', source: 'brand-tokens.typography.fontDisplay', type: 'css-font', required: true, default: null },
  { name: 'TOKEN_FONT_BODY', source: 'brand-tokens.typography.fontBody', type: 'css-font', required: true, default: null },
  { name: 'TOKEN_RADIUS_SM', source: 'brand-tokens.radius.sm', type: 'css-length', required: true, default: null },
  { name: 'TOKEN_RADIUS_MD', source: 'brand-tokens.radius.md', type: 'css-length', required: true, default: null },
  { name: 'TOKEN_RADIUS_LG', source: 'brand-tokens.radius.lg', type: 'css-length', required: true, default: null },
  { name: 'TOKEN_RADIUS_XL', source: 'brand-tokens.radius.xl', type: 'css-length', required: true, default: null },
  { name: 'TOKEN_SHADOW_SM', source: 'brand-tokens.shadows.sm', type: 'css-shadow', required: true, default: null },
  { name: 'TOKEN_SHADOW_MD', source: 'brand-tokens.shadows.md', type: 'css-shadow', required: true, default: null },
  { name: 'TOKEN_SHADOW_LG', source: 'brand-tokens.shadows.lg', type: 'css-shadow', required: true, default: null },
  { name: 'TOKEN_SHADOW_CARD', source: 'brand-tokens.shadows.card', type: 'css-shadow', required: true, default: null },
  { name: 'TOKEN_MAX_W', source: 'brand-tokens.layout.maxWidth', type: 'css-length', required: true, default: null },

  // ── 3. Nav ───────────────────────────────────────────────────────────────
  { name: 'NAV_LOGO_TEXT', source: 'nav.logoText || meta.company', type: 'string', required: true, default: null },
  { name: 'NAV_ITEMS', source: 'nav.links[] || auto from sections', type: 'array', required: true, default: 'auto-generated' },
  { name: 'NAV_LINK_HREF', source: 'nav.links[n].href', type: 'string', required: true, default: null },
  { name: 'NAV_LINK_LABEL', source: 'nav.links[n].label', type: 'string', required: true, default: null },

  // ── 4. Hero ──────────────────────────────────────────────────────────────
  { name: 'HERO_LOGO_TEXT', source: 'hero.logoText || meta.company', type: 'string', required: false, default: 'meta.company' },
  { name: 'HERO_BADGES', source: 'meta.badges[]', type: 'array', required: true, default: null },
  { name: 'HERO_BADGE_TEXT', source: 'meta.badges[n]', type: 'string', required: true, default: null },
  { name: 'HERO_H1_PLAIN', source: 'hero.h1Plain', type: 'string', required: true, default: null },
  { name: 'HERO_H1_HIGHLIGHT', source: 'hero.h1Highlight', type: 'string', required: true, default: null },
  { name: 'HERO_SUBTITLE', source: 'hero.subtitle', type: 'string', required: true, default: null },
  { name: 'HERO_KPIS', source: 'hero.kpis[]', type: 'array', required: true, default: null },
  { name: 'HERO_KPI_ICON', source: 'hero.kpis[n].icon', type: 'string', required: true, default: null },
  { name: 'HERO_KPI_VALUE', source: 'hero.kpis[n].value', type: 'string', required: true, default: null },
  { name: 'HERO_KPI_LABEL', source: 'hero.kpis[n].label', type: 'string', required: true, default: null },

  // ── 5. Section ───────────────────────────────────────────────────────────
  { name: 'SECTION_ID', source: 'sections[n].id', type: 'string', required: true, default: null },
  { name: 'SECTION_H2_PLAIN', source: 'sections[n].headerTitle', type: 'string', required: true, default: null },
  { name: 'SECTION_H2_HIGHLIGHT', source: 'sections[n].headerHighlight', type: 'string', required: true, default: null },
  { name: 'SECTION_DESC', source: 'sections[n].headerDescription', type: 'string', required: false, default: '' },
  { name: 'SECTION_SHOW_DIVIDER', source: 'sections[n].showDivider', type: 'boolean', required: false, default: true },

  // ── 6. Components ────────────────────────────────────────────────────────
  // 6.1 problem-grid
  { name: 'PROBLEM_CARDS', source: 'component.data.cards[]', type: 'array', required: true, default: null },
  { name: 'PROBLEM_CARD_TITLE', source: 'component.data.cards[n].title', type: 'string', required: true, default: null },
  { name: 'PROBLEM_CARD_BODY', source: 'component.data.cards[n].body', type: 'string', required: true, default: null },
  { name: 'PROBLEM_CARD_BORDER_COLOR', source: 'component.data.cards[n].borderColor', type: 'css-color', required: false, default: 'var(--sofka-critical)' },
  { name: 'PROBLEM_CARD_TITLE_COLOR', source: 'component.data.cards[n].titleColor', type: 'css-color', required: false, default: null },

  // 6.2 antipatron
  { name: 'ANTIPATRON_BAD_TITLE', source: 'component.data.bad.title', type: 'string', required: true, default: null },
  { name: 'ANTIPATRON_BAD_ITEMS', source: 'component.data.bad.items[]', type: 'array', required: true, default: null },
  { name: 'ANTIPATRON_GOOD_TITLE', source: 'component.data.good.title', type: 'string', required: true, default: null },
  { name: 'ANTIPATRON_GOOD_ITEMS', source: 'component.data.good.items[]', type: 'array', required: true, default: null },

  // 6.3 cycle-visual
  { name: 'CYCLE_STEPS', source: 'component.data.steps[]', type: 'array', required: true, default: null },
  { name: 'CYCLE_STEP_NUM', source: 'component.data.steps[n].num', type: 'integer', required: true, default: null },
  { name: 'CYCLE_STEP_LABEL', source: 'component.data.steps[n].label', type: 'string', required: true, default: null },
  { name: 'CYCLE_STEP_JARVIS', source: 'component.data.steps[n].jarvis', type: 'string', required: true, default: null },
  { name: 'CYCLE_STEP_ARTIFACT', source: 'component.data.steps[n].artifact', type: 'string', required: true, default: null },

  // 6.4 map-table
  { name: 'MAP_TABLE_HEADERS', source: 'component.data.headers[]', type: 'array', required: true, default: null },
  { name: 'MAP_TABLE_ROWS', source: 'component.data.rows[]', type: 'array', required: true, default: null },
  { name: 'MAP_TABLE_CELL_TEXT', source: 'component.data.rows[n].cells[m].text', type: 'string', required: true, default: null },
  { name: 'MAP_TABLE_CELL_BOLD', source: 'component.data.rows[n].cells[m].bold', type: 'boolean', required: false, default: false },
  { name: 'MAP_TABLE_CELL_JARVIS', source: 'component.data.rows[n].cells[m].jarvisName', type: 'boolean', required: false, default: false },

  // 6.5 jarvis-cards
  { name: 'JARVIS_CARDS', source: 'component.data.cards[]', type: 'array', required: true, default: null },
  { name: 'JARVIS_ICON_CLASS', source: 'component.data.cards[n].iconClass', type: 'string', required: true, default: null },
  { name: 'JARVIS_ICON_LABEL', source: 'component.data.cards[n].iconLabel', type: 'string', required: true, default: null },
  { name: 'JARVIS_NAME', source: 'component.data.cards[n].name', type: 'string', required: true, default: null },
  { name: 'JARVIS_SUBTITLE', source: 'component.data.cards[n].subtitle', type: 'string', required: true, default: null },
  { name: 'JARVIS_DESCRIPTION', source: 'component.data.cards[n].description', type: 'string', required: true, default: null },
  { name: 'JARVIS_FIELDS', source: 'component.data.cards[n].fields[]', type: 'array', required: true, default: null },
  { name: 'JARVIS_FIELD_LABEL', source: 'component.data.cards[n].fields[m].label', type: 'string', required: true, default: null },
  { name: 'JARVIS_FIELD_VALUE', source: 'component.data.cards[n].fields[m].value', type: 'string', required: true, default: null },
  { name: 'JARVIS_FIELD_IS_PROMPT', source: 'component.data.cards[n].fields[m].isPrompt', type: 'boolean', required: false, default: false },
  { name: 'JARVIS_ANTIUSE', source: 'component.data.cards[n].antiUse', type: 'string', required: false, default: null },
  { name: 'JARVIS_GEM_URL', source: 'component.data.cards[n].gemLink.url', type: 'url', required: false, default: null },
  { name: 'JARVIS_GEM_LABEL', source: 'component.data.cards[n].gemLink.label', type: 'string', required: false, default: null },

  // 6.6 timeline
  { name: 'TIMELINE_ITEMS', source: 'component.data.items[]', type: 'array', required: true, default: null },
  { name: 'TIMELINE_DOT_NUM', source: 'component.data.items[n].dotNum', type: 'integer', required: true, default: null },
  { name: 'TIMELINE_WEEK_LABEL', source: 'component.data.items[n].weekLabel', type: 'string', required: true, default: null },
  { name: 'TIMELINE_TITLE_SUFFIX', source: 'component.data.items[n].titleSuffix', type: 'string', required: true, default: null },
  { name: 'TIMELINE_OBJECTIVE', source: 'component.data.items[n].objective', type: 'string', required: true, default: null },
  { name: 'TIMELINE_TAGS', source: 'component.data.items[n].tags[]', type: 'array', required: false, default: '[]' },
  { name: 'TIMELINE_TAG_LABEL', source: 'component.data.items[n].tags[m].label', type: 'string', required: true, default: null },
  { name: 'TIMELINE_TAG_VARIANT', source: 'component.data.items[n].tags[m].variant', type: 'string', required: true, default: null },
  { name: 'TIMELINE_DELIVERABLE_LABEL', source: 'component.data.items[n].deliverable.label', type: 'string', required: false, default: null },
  { name: 'TIMELINE_DELIVERABLE_TEXT', source: 'component.data.items[n].deliverable.text', type: 'string', required: false, default: null },
  { name: 'TIMELINE_GATE', source: 'component.data.items[n].gate', type: 'string', required: false, default: null },

  // 6.7 compare-grid
  { name: 'COMPARE_BEFORE_TITLE', source: 'component.data.before.title', type: 'string', required: true, default: null },
  { name: 'COMPARE_BEFORE_ITEMS', source: 'component.data.before.items[]', type: 'array', required: true, default: null },
  { name: 'COMPARE_AFTER_TITLE', source: 'component.data.after.title', type: 'string', required: true, default: null },
  { name: 'COMPARE_AFTER_ITEMS', source: 'component.data.after.items[]', type: 'array', required: true, default: null },

  // 6.8 metrics-row
  { name: 'METRICS', source: 'component.data.metrics[]', type: 'array', required: true, default: null },
  { name: 'METRIC_VALUE', source: 'component.data.metrics[n].value', type: 'string', required: true, default: null },
  { name: 'METRIC_LABEL', source: 'component.data.metrics[n].label', type: 'string', required: true, default: null },

  // 6.9 semaforo-grid
  { name: 'SEMAFORO_CARDS', source: 'component.data.cards[]', type: 'array', required: true, default: null },
  { name: 'SEMAFORO_VARIANT', source: 'component.data.cards[n].variant', type: 'string', required: true, default: null },
  { name: 'SEMAFORO_TITLE', source: 'component.data.cards[n].title', type: 'string', required: true, default: null },
  { name: 'SEMAFORO_DESCRIPTION', source: 'component.data.cards[n].description', type: 'string', required: true, default: null },

  // 6.10 vraid-box
  { name: 'VRAID_TITLE', source: 'component.data.title', type: 'string', required: true, default: null },
  { name: 'VRAID_LETTERS', source: 'component.data.letters[]', type: 'array', required: true, default: null },
  { name: 'VRAID_LETTER', source: 'component.data.letters[n].letter', type: 'string', required: true, default: null },
  { name: 'VRAID_MEANING', source: 'component.data.letters[n].meaning', type: 'string', required: true, default: null },
  { name: 'VRAID_FEEDS', source: 'component.data.letters[n].feeds', type: 'string', required: false, default: null },
  { name: 'VRAID_NOTE', source: 'component.data.note', type: 'string', required: false, default: '' },

  // 6.11 gem-bar
  { name: 'GEM_BAR_TITLE', source: 'component.data.title', type: 'string', required: true, default: null },
  { name: 'GEM_LINKS', source: 'component.data.gems[]', type: 'array', required: true, default: null },
  { name: 'GEM_LINK_LABEL', source: 'component.data.gems[n].label', type: 'string', required: true, default: null },
  { name: 'GEM_LINK_URL', source: 'component.data.gems[n].url', type: 'url', required: true, default: null },

  // 6.12 callout
  { name: 'CALLOUT_VARIANT', source: 'component.data.variant', type: 'string', required: true, default: null },
  { name: 'CALLOUT_TITLE', source: 'component.data.title', type: 'string', required: true, default: null },
  { name: 'CALLOUT_CONTENT', source: 'component.data.body', type: 'string', required: false, default: null },
  { name: 'CALLOUT_ITEMS', source: 'component.data.items[]', type: 'array', required: false, default: null },

  // 6.13 decision-table
  { name: 'DECISION_TABLE_HEADERS', source: 'component.data.headers[]', type: 'array', required: true, default: null },
  { name: 'DECISION_TABLE_ROWS', source: 'component.data.rows[]', type: 'array', required: true, default: null },
  { name: 'DECISION_CELL_TEXT', source: 'component.data.rows[n].cells[m].text', type: 'string', required: true, default: null },
  { name: 'DECISION_CELL_BOLD', source: 'component.data.rows[n].cells[m].bold', type: 'boolean', required: false, default: false },
  { name: 'DECISION_CELL_COLOR', source: 'component.data.rows[n].cells[m].color', type: 'css-color', required: false, default: null },
  { name: 'DECISION_CELL_IS_LINK', source: 'component.data.rows[n].cells[m].isLink', type: 'boolean', required: false, default: false },
  { name: 'DECISION_CELL_HREF', source: 'component.data.rows[n].cells[m].href', type: 'url', required: false, default: null },

  // 6.14 guardrail-grid
  { name: 'GUARDRAIL_SI_TITLE', source: 'component.data.doColumn.title', type: 'string', required: true, default: null },
  { name: 'GUARDRAIL_SI_ITEMS', source: 'component.data.doColumn.items[]', type: 'array', required: true, default: null },
  { name: 'GUARDRAIL_NO_TITLE', source: 'component.data.dontColumn.title', type: 'string', required: true, default: null },
  { name: 'GUARDRAIL_NO_ITEMS', source: 'component.data.dontColumn.items[]', type: 'array', required: true, default: null },

  // 6.15 gate-box
  { name: 'GATE_TEXT', source: 'component.data.text', type: 'string', required: true, default: null },

  // 6.16 acceptance-list
  { name: 'ACCEPTANCE_PREAMBLE', source: 'component.data.preamble', type: 'string', required: false, default: '' },
  { name: 'ACCEPTANCE_ITEMS', source: 'component.data.items[]', type: 'array', required: true, default: null },

  // 6.17 testimonial-grid
  { name: 'TESTIMONIALS', source: 'component.data.testimonials[]', type: 'array', required: true, default: null },
  { name: 'TESTIMONIAL_QUOTE', source: 'component.data.testimonials[n].quote', type: 'string', required: true, default: null },
  { name: 'TESTIMONIAL_AUTHOR', source: 'component.data.testimonials[n].author', type: 'string', required: true, default: null },
  { name: 'TESTIMONIAL_ROLE', source: 'component.data.testimonials[n].role', type: 'string', required: false, default: null },

  // 6.18 case-highlight
  { name: 'CASE_METRIC_VALUE', source: 'component.data.metricValue', type: 'string', required: true, default: null },
  { name: 'CASE_METRIC_UNIT', source: 'component.data.metricUnit', type: 'string', required: true, default: null },
  { name: 'CASE_TITLE', source: 'component.data.title', type: 'string', required: true, default: null },
  { name: 'CASE_DESCRIPTION', source: 'component.data.description', type: 'string', required: true, default: null },

  // 6.19 recommendations
  { name: 'REC_CARDS', source: 'component.data.cards[]', type: 'array', required: true, default: null },
  { name: 'REC_CARD_TITLE', source: 'component.data.cards[n].title', type: 'string', required: true, default: null },
  { name: 'REC_CARD_BODY', source: 'component.data.cards[n].body', type: 'string', required: true, default: null },

  // 6.20 inline-heading
  { name: 'INLINE_HEADING_TEXT', source: 'component.data.text', type: 'string', required: true, default: null },
  { name: 'INLINE_HEADING_LEVEL', source: 'component.data.level', type: 'integer', required: false, default: 3 },

  // 6.21 inline-table
  { name: 'INLINE_TABLE_HEADERS', source: 'component.data.headers[]', type: 'array', required: true, default: null },
  { name: 'INLINE_TABLE_ROWS', source: 'component.data.rows[]', type: 'array', required: true, default: null },

  // 6.22 inline-paragraph
  { name: 'INLINE_PARA_TEXT', source: 'component.data.text', type: 'string', required: true, default: null },
  { name: 'INLINE_PARA_IS_CODE', source: 'component.data.isCode', type: 'boolean', required: false, default: false },

  // ── 7. Kata ──────────────────────────────────────────────────────────────
  { name: 'KATA_ID', source: 'katas[n].id', type: 'string', required: true, default: null },
  { name: 'KATA_NUMBER', source: 'katas[n].number', type: 'integer', required: true, default: null },
  { name: 'KATA_NAME', source: 'katas[n].name', type: 'string', required: true, default: null },
  { name: 'KATA_OBJECTIVE', source: 'katas[n].objective', type: 'string', required: true, default: null },
  { name: 'KATA_JARVIS_AGENT', source: 'katas[n].jarvisAgent', type: 'string', required: true, default: null },
  { name: 'KATA_DURATION', source: 'katas[n].duration', type: 'string', required: false, default: null },
  { name: 'KATA_STEPS', source: 'katas[n].steps[]', type: 'array', required: true, default: null },
  { name: 'KATA_STEP_NUM', source: 'katas[n].steps[m].stepNumber', type: 'integer', required: true, default: null },
  { name: 'KATA_STEP_INSTRUCTION', source: 'katas[n].steps[m].instruction', type: 'string', required: true, default: null },
  { name: 'KATA_STEP_TOOL', source: 'katas[n].steps[m].tool', type: 'string', required: false, default: null },
  { name: 'KATA_STEP_OUTPUT', source: 'katas[n].steps[m].output', type: 'string', required: false, default: null },
  { name: 'KATA_STEP_TIP', source: 'katas[n].steps[m].tip', type: 'string', required: false, default: null },
  { name: 'KATA_SUCCESS_CRITERIA', source: 'katas[n].successCriteria[]', type: 'array', required: true, default: null },
  { name: 'KATA_CHECKPOINT', source: 'katas[n].checkpoint', type: 'string', required: false, default: null },
  { name: 'KATA_ANTIPATTERNS', source: 'katas[n].antiPatterns[]', type: 'array', required: false, default: '[]' },
  { name: 'KATA_PLATFORMS', source: 'katas[n].platforms[]', type: 'array', required: false, default: '[]' },

  // ── 8. Flow ──────────────────────────────────────────────────────────────
  { name: 'FLOW_NUMBER', source: 'flows[n].number', type: 'integer', required: true, default: null },
  { name: 'FLOW_NAME', source: 'flows[n].name', type: 'string', required: true, default: null },
  { name: 'FLOW_TRIGGER', source: 'flows[n].trigger', type: 'string', required: true, default: null },
  { name: 'FLOW_JARVIS_SEQUENCE', source: 'flows[n].jarvisSequence[]', type: 'array', required: true, default: null },
  { name: 'FLOW_INPUT', source: 'flows[n].input', type: 'string', required: false, default: null },
  { name: 'FLOW_OUTPUT', source: 'flows[n].output', type: 'string', required: true, default: null },
  { name: 'FLOW_TIME', source: 'flows[n].estimatedTime', type: 'string', required: false, default: null },
  { name: 'FLOW_FREQUENCY', source: 'flows[n].frequency', type: 'string', required: false, default: null },

  // ── 9. Architecture Layers ───────────────────────────────────────────────
  { name: 'ARCH_LAYER_NAME', source: 'architectureLayers[n].name', type: 'string', required: true, default: null },
  { name: 'ARCH_LAYER_DESCRIPTION', source: 'architectureLayers[n].description', type: 'string', required: true, default: null },
  { name: 'ARCH_LAYER_ICON', source: 'architectureLayers[n].icon', type: 'string', required: false, default: null },
  { name: 'ARCH_LAYER_ITEMS', source: 'architectureLayers[n].items[]', type: 'array', required: true, default: null },
  { name: 'ARCH_ITEM_NAME', source: 'architectureLayers[n].items[m].name', type: 'string', required: true, default: null },
  { name: 'ARCH_ITEM_DESCRIPTION', source: 'architectureLayers[n].items[m].description', type: 'string', required: false, default: null },
  { name: 'ARCH_ITEM_JARVIS', source: 'architectureLayers[n].items[m].jarvis', type: 'string', required: false, default: null },
  { name: 'ARCH_ITEM_FREQUENCY', source: 'architectureLayers[n].items[m].frequency', type: 'string', required: false, default: null },

  // ── 10. Footer ───────────────────────────────────────────────────────────
  { name: 'FOOTER_LOGO', source: 'footer.logoText', type: 'string', required: true, default: null },
  { name: 'FOOTER_BADGES', source: 'footer.badges[]', type: 'array', required: true, default: null },
  { name: 'FOOTER_BADGE_TEXT', source: 'footer.badges[n]', type: 'string', required: true, default: null },
  { name: 'FOOTER_COPYRIGHT', source: 'footer.copyright', type: 'string', required: true, default: null },
];

// ── Helper: resolve a dotted path in an object ──────────────────────────────
function resolvePath(obj, dotPath) {
  // Strip array indices and brand-tokens prefix for manifest lookups
  const cleanPath = dotPath
    .replace(/\[n\]/g, '[0]')
    .replace(/\[m\]/g, '[0]')
    .replace(/^brand-tokens\./, '__brand__.');

  if (cleanPath.startsWith('__brand__')) return undefined; // brand tokens, not in manifest

  const parts = cleanPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null) return undefined;
    // Handle [0] array access
    const arrMatch = part.match(/^(.+)\[(\d+)\]$/);
    if (arrMatch) {
      current = current[arrMatch[1]];
      if (Array.isArray(current)) {
        current = current[parseInt(arrMatch[2])];
      } else {
        return undefined;
      }
    } else {
      current = current[part];
    }
  }
  return current;
}

// ── CLI Parsing ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
let checkManifest = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--check' && args[i + 1]) {
    checkManifest = path.resolve(args[i + 1]);
    i++;
  }
}

// ── Mode 1: Print all placeholders ──────────────────────────────────────────
function printMap() {
  const categories = {};
  for (const p of PLACEHOLDERS) {
    const cat = p.source.split('.')[0].replace(/\[.*\]/, '');
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(p);
  }

  const output = {
    totalPlaceholders: PLACEHOLDERS.length,
    requiredCount: PLACEHOLDERS.filter(p => p.required).length,
    optionalCount: PLACEHOLDERS.filter(p => !p.required).length,
    categories: {}
  };

  for (const [cat, items] of Object.entries(categories)) {
    output.categories[cat] = items.map(p => ({
      name: `{{${p.name}}}`,
      source: p.source,
      type: p.type,
      required: p.required,
      default: p.default
    }));
  }

  process.stdout.write(JSON.stringify(output, null, 2) + '\n');
  process.stderr.write(`[placeholder-map] Total: ${PLACEHOLDERS.length} placeholders (${output.requiredCount} required, ${output.optionalCount} optional)\n`);
}

// ── Mode 2: Check manifest coverage ─────────────────────────────────────────
function checkCoverage() {
  let manifest;
  try {
    const raw = fs.readFileSync(checkManifest, 'utf8');
    manifest = JSON.parse(raw);
  } catch (parseErr) {
    process.stderr.write(`ERROR: Cannot read manifest: ${parseErr.message}\n`);
    process.exit(1);
  }

  // Filter to manifest-sourced placeholders only (exclude brand-tokens)
  const manifestPlaceholders = PLACEHOLDERS.filter(p => !p.source.startsWith('brand-tokens'));

  // Also exclude per-item placeholders that repeat inside arrays
  // We only check "top-level" resolvable paths
  const checkable = manifestPlaceholders.filter(p => {
    // Skip paths with [n] or [m] that refer to array items
    // unless we can check the parent array
    return true;
  });

  const missing = [];
  const present = [];
  const optional = [];

  for (const p of checkable) {
    const sourcePath = p.source
      .replace(/ \|\|.*$/, '') // strip fallback hints
      .replace(/ or .*$/, '');

    const val = resolvePath(manifest, sourcePath);

    if (val === undefined || val === null || val === '') {
      if (p.required) {
        missing.push({
          name: `{{${p.name}}}`,
          source: p.source,
          type: p.type
        });
      } else {
        optional.push({
          name: `{{${p.name}}}`,
          source: p.source,
          type: p.type,
          default: p.default,
          suggestion: `Could be enriched with ${p.type} data.`
        });
      }
    } else {
      present.push({
        name: `{{${p.name}}}`,
        source: p.source,
        hasValue: true
      });
    }
  }

  const brandTokenCount = PLACEHOLDERS.filter(p => p.source.startsWith('brand-tokens')).length;

  const report = {
    manifestPath: checkManifest,
    totalPlaceholders: PLACEHOLDERS.length,
    brandTokenPlaceholders: brandTokenCount,
    manifestPlaceholders: manifestPlaceholders.length,
    coverage: {
      present: present.length,
      missingRequired: missing.length,
      optionalEmpty: optional.length
    },
    missingRequired: missing,
    enrichmentOpportunities: optional
  };

  process.stdout.write(JSON.stringify(report, null, 2) + '\n');

  if (missing.length > 0) {
    process.stderr.write(`[placeholder-map] INCOMPLETE: ${missing.length} required placeholders missing data.\n`);
    for (const m of missing) {
      process.stderr.write(`  MISSING  {{${m.name.replace(/\{\{|\}\}/g, '')}}} <- ${m.source}\n`);
    }
    process.exit(1);
  } else {
    process.stderr.write(`[placeholder-map] OK: All required manifest placeholders have data. ${optional.length} optional fields could be enriched.\n`);
    process.exit(0);
  }
}

// ── Dispatch ─────────────────────────────────────────────────────────────────
if (checkManifest) {
  checkCoverage();
} else {
  printMap();
}
