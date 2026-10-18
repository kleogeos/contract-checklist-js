const { check, CHECKS } = require("./index.js");

// Reference behavior cross-checked byte-for-byte against the Python
// implementation (kleogeos/contract-checklist-cli, check.py) on the same
// sample contract text, to confirm parity, not invented independently.

let failures = 0;
function assertEq(name, got, want) {
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    failures++;
    console.error(`FAIL: ${name}\n  got:  ${JSON.stringify(got)}\n  want: ${JSON.stringify(want)}`);
  }
}

const sample = `# Services Agreement

This agreement is between Jane Doe ("Contractor") and Acme Corp ("Client").

## Scope of Work
Contractor will design and build a 5-page marketing website, in scope as described in Exhibit A.

## Payment
Client agrees to pay $3,000, due net 15 upon invoice receipt.

## Revisions
Up to 2 rounds of revisions are included.
`;

const { found, missing } = check(sample);
assertEq("found count", found.length, 3);
assertEq("found clauses", found, [
  "payment terms / due date",
  "scope of work / deliverables",
  "revision limit",
]);
assertEq("missing count", missing.length, CHECKS.length - 3);

const full = `Payment due net 30 via invoice. Late payment accrues interest. Scope and deliverables in Exhibit A.
Up to 2 revisions included. All intellectual property and copyright transfers to Client upon payment.
Either party may terminate with 30 days notice. This agreement is confidential (NDA).
A deposit of 50% is required upfront. Liability is limited and Contractor does not warrant uptime.
Governed by the laws and jurisdiction of California.`;

const fullResult = check(full);
assertEq("all 10 clauses found in full contract", fullResult.found.length, CHECKS.length);
assertEq("nothing missing in full contract", fullResult.missing.length, 0);

const empty = check("");
assertEq("empty text: nothing found", empty.found.length, 0);
assertEq("empty text: everything missing", empty.missing.length, CHECKS.length);

if (failures > 0) {
  console.error(`\n${failures} assertion(s) failed`);
  process.exit(1);
}
console.log("All contract-checklist parity checks passed.");
