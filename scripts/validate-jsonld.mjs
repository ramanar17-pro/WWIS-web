#!/usr/bin/env node
// Structural validation of every JSON-LD block in the built site.
// Catches malformed JSON, missing @type, and escaping regressions
// (e.g. an unescaped "</script>" breaking a block into two) before
// deploy — a content edit that quietly breaks structured data should
// fail the build, not ship silently. Complements (does not replace)
// PLANNING.md's manual Google Rich Results Test / validator.schema.org
// checks, which require an external service this script doesn't call.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST_DIR = process.argv[2] ?? 'dist';
const SCRIPT_TAG_RE = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;

function findHtmlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...findHtmlFiles(fullPath));
    } else if (entry.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function validateBlock(json, index) {
  const errors = [];
  let data;
  try {
    data = JSON.parse(json);
  } catch (err) {
    errors.push(`block ${index}: invalid JSON — ${err.message}`);
    return errors;
  }
  if (json.includes('</script')) {
    errors.push(`block ${index}: contains unescaped "</script" — will break the page HTML`);
  }
  if (!data['@type'] && !data['@id']) {
    errors.push(`block ${index}: missing both "@type" and "@id" — not a valid schema.org node`);
  }
  return errors;
}

let htmlFiles;
try {
  htmlFiles = findHtmlFiles(DIST_DIR);
} catch (err) {
  console.error(`Cannot read build output at "${DIST_DIR}" — did the build run first? (${err.message})`);
  process.exit(1);
}

let totalBlocks = 0;
let failed = false;

for (const filePath of htmlFiles) {
  const html = readFileSync(filePath, 'utf-8');
  const matches = [...html.matchAll(SCRIPT_TAG_RE)];
  matches.forEach((match, index) => {
    totalBlocks += 1;
    const errors = validateBlock(match[1], index);
    if (errors.length > 0) {
      failed = true;
      console.error(`\n${filePath}:`);
      errors.forEach((e) => console.error(`  - ${e}`));
    }
  });
}

if (failed) {
  console.error(`\nJSON-LD validation FAILED (${totalBlocks} block(s) checked).`);
  process.exit(1);
}

console.log(`JSON-LD validation passed (${totalBlocks} block(s) checked across ${htmlFiles.length} page(s)).`);
