#!/usr/bin/env node
"use strict";

const fs = require("fs");

const CHECKS = [
  ["payment terms / due date", ["payment", "due", "net 15", "net 30", "invoice"]],
  ["late payment fee / interest", ["late fee", "late payment", "interest", "overdue"]],
  ["scope of work / deliverables", ["scope", "deliverable", "in scope", "out of scope"]],
  ["revision limit", ["revision", "round of feedback", "revisions included"]],
  ["intellectual property / ownership", ["intellectual property", "copyright", "ownership", "license"]],
  ["termination clause", ["terminat", "cancel"]],
  ["confidentiality / NDA", ["confidential", "non-disclosure", "nda"]],
  ["kill fee / deposit", ["deposit", "kill fee", "upfront", "down payment"]],
  ["liability limitation", ["liability", "indemnif", "warrant"]],
  ["governing law / jurisdiction", ["governing law", "jurisdiction", "venue"]],
];

function check(text) {
  const low = text.toLowerCase();
  const found = [];
  const missing = [];
  for (const [label, keywords] of CHECKS) {
    if (keywords.some((k) => low.includes(k))) {
      found.push(label);
    } else {
      missing.push(label);
    }
  }
  return { found, missing };
}

function printHelp() {
  console.log(`contract-checklist-js - scan a freelance contract for commonly-missing clauses

Usage: contract-checklist <file> [file...]

Run without installing:
  npx github:kleogeos/contract-checklist-js my-contract.md

Keyword heuristic only, not legal advice.
`);
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    printHelp();
    process.exit(argv.length === 0 ? 1 : 0);
  }

  let anyMissing = false;
  argv.forEach((path, i) => {
    if (i) console.log("");
    const text = fs.readFileSync(path, "utf8");
    const { found, missing } = check(text);
    if (missing.length) anyMissing = true;

    console.log(`Checked ${path} — ${found.length}/${CHECKS.length} common clauses detected.\n`);
    if (found.length) {
      console.log("Found:");
      for (const label of found) console.log(`  [x] ${label}`);
    }
    if (missing.length) {
      console.log("\nPossibly missing — worth double-checking:");
      for (const label of missing) console.log(`  [ ] ${label}`);
    }
  });

  console.log("\nKeyword heuristic only, not legal advice — read your contract yourself.");
  process.exit(anyMissing ? 1 : 0);
}

module.exports = { check, CHECKS };

if (require.main === module) {
  main();
}
