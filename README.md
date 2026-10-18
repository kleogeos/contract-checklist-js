# contract-checklist-js

[![test](https://github.com/kleogeos/contract-checklist-js/actions/workflows/test.yml/badge.svg)](https://github.com/kleogeos/contract-checklist-js/actions/workflows/test.yml)

Scan a freelance contract (plain text or Markdown) for commonly-missing
clauses — payment terms, late fees, IP ownership, termination, liability,
and more. A 2-second sanity check before you sign or send. Zero
dependencies — a direct Node.js port of
[contract-checklist-cli](https://github.com/kleogeos/contract-checklist-cli)
(Python), for people who reach for `npx` instead of `pip`.

Output is cross-checked byte-for-byte against the Python version (same
input → identical result) — see `test.js`.

## Run without installing

```bash
npx github:kleogeos/contract-checklist-js my-contract.md
```

No npm account, no registry publish, no global install — `npx` clones the
repo and runs it directly.

```
Checked my-contract.md — 3/10 common clauses detected.

Found:
  [x] payment terms / due date
  [x] scope of work / deliverables
  [x] revision limit

Possibly missing — worth double-checking:
  [ ] late payment fee / interest
  [ ] intellectual property / ownership
  [ ] termination clause
  ...
```

Exits non-zero if anything looks missing, so you can wire it into a
pre-send checklist or CI step.

## Install locally (optional)

```bash
git clone https://github.com/kleogeos/contract-checklist-js.git
cd contract-checklist-js
npm link   # makes `contract-checklist` available globally
```

## Tests

```bash
npm test
```

## What it checks

Payment terms, late fees, scope of work, revision limits, IP/ownership,
termination, confidentiality, deposit/kill fee, liability, governing law.

**This is a keyword heuristic, not legal advice.** It won't catch clauses
phrased unusually, and finding a keyword doesn't mean the clause is
actually good — read your contract. Not sure what "good" looks like for
each clause, not just whether a keyword is present? See [How to Write a
Freelance Contract](https://kleogeos.github.io/freelancer-tools/how-to-write-a-freelance-contract.html?src=cli-contractchecklist-js-howto).

## Where this fits

Prefer Python, a pre-commit hook, or a GitHub Action instead?
[contract-checklist-cli](https://github.com/kleogeos/contract-checklist-cli)
has the same checks plus those integrations. Other `npx`-runnable ports:
[freelance-rate-js](https://github.com/kleogeos/freelance-rate-js) ·
[freelance-invoice-js](https://github.com/kleogeos/freelance-invoice-js).

Free web form version: [contract checklist](https://kleogeos.github.io/freelancer-tools/contract-checklist.html) · [invoice generator](https://kleogeos.github.io/freelancer-tools/invoice.html) · [rate calculator](https://kleogeos.github.io/freelancer-tools/rate-calculator.html)

Full paperwork kit — a ready-to-use contract plus proposal, invoice, and client scripts: [Freelancer Starter Kit ($15, Telegram Stars or crypto, no KYC)](https://kleogeos.github.io/freelancer-tools/kit.html?src=cli-contractchecklist-js)

Free and will stay free. If it saved you time: [tip with crypto](https://kleogeos.github.io/freelancer-tools/donate.html).

## License

MIT — do whatever you want with it.
