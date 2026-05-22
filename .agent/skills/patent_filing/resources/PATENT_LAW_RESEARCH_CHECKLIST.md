# Patent Law Research Checklist — MANDATORY PRE-DRAFT RESEARCH

> **This is NOT a reference document.** This is a checklist of topics that MUST be researched
> via LIVE WEB SEARCH (`search_web`) before drafting any patent claims, specifications, or
> filing documents. Patent law changes frequently — never rely on cached knowledge.

## When to Execute This Checklist

**Freshness Rule: At least once every 3 months.** Check the `Last Researched` date below.
If more than 90 days have passed, execute ALL searches before proceeding.

- When `/patent` workflow is triggered AND research is stale (>90 days)
- When `/ipFortress` workflow is triggered AND research is stale (>90 days)
- When `patent_filing` skill is triggered AND research is stale (>90 days)
- When `patent_claim_generator` skill is triggered AND research is stale (>90 days)
- When the user explicitly requests fresh patent law research

### Last Researched: 2026-02-24

> **Update this date** after completing all 10 research topics below.
> Next mandatory refresh: **2026-05-24** (90 days)

## Research Topics (execute ALL searches before writing)

### 1. 35 U.S.C. § 101 — Patent Eligibility (Alice/Mayo)

**Search query template:**

```
USPTO 35 USC 101 patent eligibility Alice Mayo test software AI inventions [CURRENT_YEAR] guidance step 2A 2B practical application
```

**What to extract:**

- Current Alice/Mayo two-step test requirements
- Step 2A Prong 1: Is the claim directed to an abstract idea?
- Step 2A Prong 2: Does it integrate into a practical application?
- Step 2B: Does it have an inventive concept?
- Latest USPTO guidance on AI/ML patent eligibility
- Recent precedential decisions (e.g., Ex parte Desjardins)
- Mental process grouping exclusions for AI claims
- What counts as "improvement to technology" vs "abstract idea on a computer"

**WHY THIS MATTERS:**
Software/AI patents are the #1 rejection category under § 101. If claims read as
"apply math on a generic computer," they will be rejected. Claims MUST articulate
a specific technical improvement, not just an abstract algorithm.

**OHM-SPECIFIC RISK:** AEGIS, NI-SHIELD, QFVC all involve mathematical formulas
(φ, Fibonacci, coherence scores). These MUST be framed as technical improvements
to computer security/compression/intelligence — NOT as math performed on a computer.

---

### 2. 35 U.S.C. § 112(a) — Written Description, Enablement, Best Mode

**Search query template:**

```
35 USC 112(a) enablement written description best mode requirements patent specification MPEP 2164 Wands factors [CURRENT_YEAR]
```

**What to extract:**

- Written Description: Does the spec show the inventor possessed the invention?
- Enablement: Can a POSITA (Person of Ordinary Skill in the Art) make and use it?
- Best Mode: Is the preferred embodiment disclosed? (still required but no longer invalidating per AIA)
- Wands factors for undue experimentation assessment
- Pseudocode/algorithm sufficiency for software patents
- How many embodiments are recommended for robust enablement

**WHY THIS MATTERS:**
If the specification doesn't enable the claims, the entire patent is unenforceable.
Every claim element must have corresponding support in the detailed description.

---

### 3. 35 U.S.C. § 112(b) — Claim Definiteness

**Search query template:**

```
35 USC 112(b) patent claim definiteness requirements antecedent basis means plus function MPEP 2173 [CURRENT_YEAR]
```

**What to extract:**

- Antecedent basis rules ("a" first mention, "the/said" subsequent)
- Means-plus-function claiming under § 112(f)
- Indefiniteness standards (Nautilus v. Biosig)
- Common indefiniteness traps in software claims
- Proper use of "configured to" vs "adapted to" vs "operable to"

---

### 4. 37 CFR § 1.75 — Claim Formatting Rules

**Search query template:**

```
37 CFR 1.75 patent claim formatting rules comprising consisting of MPEP 608.01 claim writing structure [CURRENT_YEAR]
```

**What to extract:**

- "Comprising" (open-ended) vs "consisting of" (closed) vs "consisting essentially of"
- Each claim begins with capital letter, ends with period
- Claims on separate sheet from specification
- Numbered consecutively in Arabic numerals
- Method steps lettered (a), (b), (c)
- Independent claim structure: preamble + transitional phrase + body
- Dependent claims must reference a prior claim by number

---

### 5. MPEP 608.01 — Specification Format and Order

**Search query template:**

```
MPEP 608.01 patent specification format order arrangement title abstract background summary detailed description claims [CURRENT_YEAR]
```

**What to extract:**

- Required order: Title → Cross-References → Background → Summary → Brief Description of Drawings → Detailed Description → Claims → Abstract
- Paragraph numbering convention [0001], [0002]...
- Paper size and margin requirements
- Abstract: 150 words max, single paragraph preferred
- No code blocks in claims (inline formulas only)

---

### 6. USPTO Fee Schedule — Current Year

**Search query template:**

```
USPTO fee schedule [CURRENT_YEAR] provisional patent micro entity filing fee excess claims independent claims threshold
```

**What to extract:**

- Provisional filing fee (micro entity)
- Excess claim threshold: >20 total claims OR >3 independent claims
- Excess claim fee per additional claim (micro entity rate)
- Micro entity qualification requirements (income, prior filings)
- Form SB/15A (Micro Entity Certification)

---

### 7. 37 CFR § 1.56 — Duty of Candor (IDS Requirements)

**Search query template:**

```
37 CFR 1.56 duty of candor IDS information disclosure statement patent inequitable conduct [CURRENT_YEAR]
```

**What to extract:**

- What must be disclosed (all known material prior art)
- When IDS must be filed
- Consequences of non-disclosure (inequitable conduct = patent unenforceable)
- Form SB/08 requirements (3 tables: US patents, foreign, NPL)
- IDS is separate from specification

---

### 8. Provisional vs Non-Provisional Requirements

**Search query template:**

```
USPTO provisional patent application requirements vs non-provisional 35 USC 111(b) 12 month deadline priority date [CURRENT_YEAR]
```

**What to extract:**

- Provisional: no formal claims required, no examination, establishes priority date
- 12-month conversion deadline (HARD deadline, no extensions)
- What provisionals DO need: written description meeting § 112(a)
- Cover sheet requirements (37 CFR 1.51)
- Application Data Sheet (37 CFR 1.76)
- Declaration requirements

---

### 9. S-Signature & Electronic Filing (Patent Center)

**Search query template:**

```
USPTO Patent Center electronic filing S-signature format EFS-Web provisional patent application [CURRENT_YEAR]
```

**What to extract:**

- S-signature format: /Full Legal Name/
- Patent Center filing steps
- Accepted file formats (PDF preferred)
- Entity status certification during filing
- Correspondence address requirements

---

### 10. Alice § 101 Survival Strategies for Software/AI Patents

**Search query template:**

```
how to survive Alice 101 rejection software AI patent claims technical improvement practical application strategies [CURRENT_YEAR]
```

**What to extract:**

- Frame claims around TECHNICAL IMPROVEMENT, not abstract math
- Claim specific hardware/system components
- Include performance metrics (latency, accuracy, throughput)
- Describe improvement over prior art in specification
- Use "configured to" language with specific technical detail
- Include system architecture claims (not just method)
- Reference specific data structures, not generic "processing"

**OHM-SPECIFIC STRATEGIES:**

- AEGIS: Frame as "security system that improves AI model defense" not "math for detecting prompts"
- QFVC: Frame as "compression system that reduces bandwidth" not "Fibonacci math on video"
- NI-SHIELD: Frame as "deepfake detection system" not "coherence scoring algorithm"

---

## Post-Research Validation Checklist

After completing ALL searches above, verify before writing ANY claims:

- [ ] I know the current Alice/Mayo framework and latest guidance
- [ ] I know the current fee structure and claim limits
- [ ] I know the specification format requirements (MPEP 608.01)
- [ ] I know the claim formatting rules (37 CFR 1.75)
- [ ] I know the IDS requirements (37 CFR 1.56)
- [ ] I have identified the specific § 101 risks for THIS invention
- [ ] I have a strategy to frame claims as technical improvements, not abstract ideas
- [ ] I know the filing method requirements (Patent Center / S-signature)

---

## Version History

| Date       | Change                                                               |
| ---------- | -------------------------------------------------------------------- |
| 2026-02-24 | Initial creation — anchored into /patent, /ipFortress, patent_filing |
