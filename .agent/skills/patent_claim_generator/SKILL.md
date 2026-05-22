---
name: Patent Claim Generator
description: Auto-generates USPTO-format independent and dependent patent claims from TRIZ dissolution candidates, technical descriptions, or feature specifications. Produces filing-ready claim sets with proper legal structure.
group: smart.frontend
---

# 📜 Patent Claim Generator — "From Invention to Filing in Minutes"

## Purpose

Transforms technical innovations into **legally structured patent claims** in USPTO format. Takes input from `triz_whitespot` dissolutions, feature specs, or technical descriptions and outputs filing-ready independent + dependent claim sets.

## When to Trigger

- After `triz_whitespot` identifies a novel dissolution (Novelty: 🟢)
- When a new feature is implemented that has no prior art
- Before filing a provisional patent application
- When expanding existing patent claims with new embodiments

## Step 0: Patent Law Awareness Check ⚖️

**MANDATORY.** Before generating ANY claims, verify patent law research freshness:

1. Read: `c:\ohm\.agent\skills\patent_filing\resources\PATENT_LAW_RESEARCH_CHECKLIST.md`
2. If `Last Researched` date >90 days old → execute all 10 search queries first
3. Key focus for claim writing: § 101 Alice/Mayo survival (frame as technical improvement), § 112(b) definiteness (antecedent basis), 37 CFR 1.75 formatting, fee schedule (claim count limits)
4. Apply § 101 survival strategies to EVERY independent claim drafted

## Claim Structure Rules

### Independent Claims (Broadest)

```
1. A [system/method/apparatus] for [solving what problem], comprising:
   [a] a first [component] configured to [function];
   [b] a second [component] operatively coupled to [first], wherein [relationship];
   [c] a [processor/module] that [key novel step];
   wherein [the novel result/advantage].
```

### Dependent Claims (Narrow, add specificity)

```
2. The [system/method] of claim 1, wherein [component a] further comprises [specific detail].
3. The [system/method] of claim 1, wherein [the step] is performed using [specific technique].
4. The [system/method] of claim 2, wherein [further narrowing].
```

## Claim Generation Process

### Step 1: Extract the Invention Core

From the input (TRIZ dissolution, feature spec, or description), identify:

- **Problem:** What couldn't be done before?
- **Solution:** What's the novel approach?
- **Components:** What are the key parts?
- **Result:** What measurable improvement does it produce?

### Step 2: Draft Independent Claims (3 types)

**System Claim (Claim 1):**

> A system for [problem], comprising [components] that [novel solution]

**Method Claim (Claim N):**

> A method for [problem], comprising the steps of: [step a]; [step b]; [step c]

**Computer-Readable Medium Claim (Claim M):**

> A non-transitory computer-readable medium storing instructions that, when executed, cause a processor to: [steps]

### Step 3: Generate Dependent Claims

For each independent claim, generate 3-8 dependent claims covering:

- **Specific algorithms:** "wherein the compression uses Fibonacci-weighted token reduction"
- **Specific thresholds:** "wherein the coherence threshold is φ⁻¹ (0.618)"
- **Specific hardware:** "wherein the inference runs on a neural processing unit (NPU)"
- **Specific integrations:** "wherein the alignment verification is stored in a tamper-evident hash chain"
- **Specific use cases:** "wherein the system processes natural language queries"
- **Fallback modes:** "wherein the system operates in an offline mode when network connectivity is unavailable"

### Step 4: Anti-Prior-Art Check

For each claim, verify:

- [ ] Is this claim novel? (not found in USPTO/EPO search)
- [ ] Is this claim non-obvious? (not a trivial combination of known techniques)
- [ ] Is this claim useful? (produces a concrete, measurable result)
- [ ] Is the claim properly supported by the specification?

### Step 5: Output Format

```markdown
# PATENT CLAIM SET: [Invention Name]

Filing type: Provisional / Non-Provisional
Technology domain: [e.g., AI/ML, Security, Compression]
Priority date: [date]

## Abstract

[150-word summary of the invention]

## Independent Claims

### Claim 1 (System)

A system for..., comprising:
(a) ...
(b) ...
wherein...

### Claim [N] (Method)

A method for..., comprising:
(a) ...
(b) ...

### Claim [M] (Medium)

A non-transitory computer-readable medium...

## Dependent Claims

[Numbered sequentially, referencing parent claims]

## Claim Tree

Claim 1 (System - Independent)
├── Claim 2 (specific algorithm)
├── Claim 3 (specific threshold)
├── Claim 4 (specific hardware)
│ └── Claim 5 (further narrows Claim 4)
├── Claim 6 (offline mode)
└── Claim 7 (specific use case)

## Prior Art Notes

[Any known references and how claims differ]
```

## Integration

- **Receives from:** `triz_whitespot` (dissolution candidates with novelty scores)
- **Receives from:** `disruption_scout` (market/patent landscape data)
- **Feeds into:** Legal filing workflow (`/patent`)
- **Cross-references:** Existing OHM patent portfolio (45 inventions, 5 families)

## OHM-Specific Conventions

- Always include φ (phi) thresholds as dependent claims
- Always include "sovereign/offline" embodiment claims
- Always include "12-dimensional alignment space" claims for NI patents
- Reference Dan Winter's phase conjugation for QFVC patents
- Reference Burkhard Heim's 12D theory for alignment patents

---

## Patent Domain Prefixes

| Domain                   | Prefix   | Example  | Provisional File                                       |
| ------------------------ | -------- | -------- | ------------------------------------------------------ |
| QFVC (Video Compression) | QFVC-XXX | QFVC-009 | `USPTO_QFVC_Provisional_Application.md`                |
| Natural Intelligence     | NI-XXX   | NI-005   | `USPTO_NI_Framework_Provisional_Application.md`        |
| Content Protection       | CP-XXX   | CP-007   | `USPTO_FORTRESS_Protection_Provisional_Application.md` |
| Trust/Identity           | TI-XXX   | TI-005   | `USPTO_Trust_Identity_Provisional_Application.md`      |
| Resonance/Comm           | RC-XXX   | RC-003   | _(new provisional if needed)_                          |
| Economic                 | EC-XXX   | EC-003   | _(new provisional if needed)_                          |
| Tesla/EMF                | TE-XXX   | TE-001   | `USPTO_Tesla_Heritage_Provisional_Application.md`      |
| New Earth Device         | NE-XXX   | NE-001   | _(new provisional if needed)_                          |

## Portfolio Files (Single Source of Truth)

| File               | Path                                                     | Purpose                      |
| ------------------ | -------------------------------------------------------- | ---------------------------- |
| Master Portfolio   | `Documentation/Patents/OHM_PATENT_PORTFOLIO_MASTER.md`   | All patents overview         |
| Complete Portfolio | `Documentation/Patents/OHM_PATENT_PORTFOLIO_COMPLETE.md` | Detailed breakdown           |
| Pro Se Guide       | `Documentation/Patents/USPTO_PRO_SE_FILING_GUIDE.md`     | Self-filing without attorney |
| Innovation Journal | `Documentation/Patents/INNOVATION_JOURNAL.md`            | Timestamped disclosures      |

## After Generating Claims: Full Filing Pipeline

### 1. Add to Portfolio

Open `OHM_PATENT_PORTFOLIO_MASTER.md` → add entry with domain prefix + title.

### 2. Update Provisional Application

Open the relevant `USPTO_*_Provisional_Application.md`:

- Add to **DETAILED DESCRIPTION** section with pseudocode
- Add new **CLAIMS** (independent + dependent, follow numbering)
- Update **ABSTRACT** if major addition

### 3. Generate HTML for Self-Filing

Use `/HTMLsigning_editing` workflow to make the provisional filing-ready:

- Add **editable fields** (inventor name, email, citizenship, address, date)
- Add **signature canvas pad** (touch/stylus/mouse drawing)
- Add **auto-save** (localStorage persistence)
- Add **print styles** (clean output with signature image)

**Batch processing:** `node scripts/make-patents-editable.mjs` (processes all `USPTO_*.html`)
**Signature only:** `node scripts/add-signature-pad.mjs`

### 4. USPTO Signature Rules

| Filing Method          | Signature Type                         |
| ---------------------- | -------------------------------------- |
| Patent Center (Online) | S-signature: `/Your Name/` (typed)     |
| Mailed / Printed       | Handwritten signature (use canvas pad) |
| WIPO/PCT               | Handwritten or electronic accepted     |

### 5. Filing Reminders

⚠️ File provisional BEFORE public disclosure for international rights.
⚠️ Non-provisional must be filed within 12 months or priority date is lost.
⚠️ Maintenance fees due at 3.5, 7.5, and 11.5 years after grant.

## Claim Writing Tips (from /patent workflow)

- Use **"comprising"** (open-ended) NOT "consisting of" (closed)
- Independent claims: start BROAD, get specific in dependents
- Method claims: letter each step (a, b, c...)
- Reference prior claims by number in dependents
- Always ask: Novel? Non-obvious? Useful?

---

**Usage:** Generate patent claims from TRIZ dissolutions or feature specs.
**Trigger:** After `triz_whitespot` produces a 🟢 Novel dissolution, or when the user says "draft claims for [X]".
**Version:** 2.0 (Feb 2026) — Updated with /patent + /HTMLsigning_editing integration
