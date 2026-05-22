---
name: Patent Fortress Auditor
description: 12-dimension deep audit of patent claims — bulletproofs claims before filing (pre-prosecution hardening) and after filing (prosecution defense preparation). Identifies objection vectors, design-around vulnerabilities, whitespace gaps, and Alice/§101 risks. Produces a scored audit report with specific remediation instructions per claim.
group: smart.design
---

# Patent Fortress Auditor

## Purpose

Make patent claims **rock solid** across 12 dimensions before filing. Every weakness found NOW saves months of prosecution argument LATER. This skill audits individual claims AND the portfolio as a whole.

## When to Use

- **Before filing** any provisional or non-provisional application
- **Before converting** a provisional to a non-provisional (within the 12-month window)
- **After receiving** an Office Action (to prepare arguments/amendments)
- **Periodically** to identify portfolio gaps competitors could exploit

## The 12 Audit Dimensions

### PRE-FILING DIMENSIONS (Fix before filing)

| #   | Dimension                          | What It Catches                                                    | Severity     |
| --- | ---------------------------------- | ------------------------------------------------------------------ | ------------ |
| D1  | **§101 Eligibility (Alice Test)**  | Abstract idea risk, mental process risk, "significantly more" test | 🔴 FATAL     |
| D2  | **§102 Novelty**                   | Anticipated by single prior art reference                          | 🔴 FATAL     |
| D3  | **§103 Non-Obviousness**           | Obvious combination of references                                  | 🔴 FATAL     |
| D4  | **§112 Enablement & Definiteness** | Claims lack spec support, vague terms, indefinite scope            | 🔴 FATAL     |
| D5  | **Design-Around Vulnerability**    | Can competitor achieve same result without infringing?             | 🟠 CRITICAL  |
| D6  | **Whitespace Gaps**                | Unclaimed adjacent territory competitors can occupy                | 🟠 CRITICAL  |
| D7  | **Claim Breadth Optimization**     | Independent claims too narrow or too broad                         | 🟡 IMPORTANT |
| D8  | **Dependent Claim Depth**          | Insufficient fallback positions if independent claim fails         | 🟡 IMPORTANT |

### POST-FILING DIMENSIONS (Prepare for prosecution)

| #   | Dimension                            | What It Catches                                                | Severity     |
| --- | ------------------------------------ | -------------------------------------------------------------- | ------------ |
| D9  | **Continuation/Divisional Strategy** | Missing CIP opportunities, restriction requirement preparation | 🟡 IMPORTANT |
| D10 | **Prosecution History Estoppel**     | Claim language that will force narrowing amendments            | 🟠 CRITICAL  |
| D11 | **International Filing Readiness**   | PCT/EPO compatibility, translation issues, grace period risks  | 🟡 IMPORTANT |
| D12 | **Enforcement Practicality**         | Can infringement actually be detected/proven in production?    | 🟠 CRITICAL  |

## Scoring

Each dimension is scored 0-10:

| Score | Meaning                                           | Action             |
| ----- | ------------------------------------------------- | ------------------ |
| 0-3   | 🔴 **Critical** — Do NOT file until fixed         | MUST remediate     |
| 4-5   | 🟠 **Weak** — High risk of rejection/invalidation | SHOULD remediate   |
| 6-7   | 🟡 **Adequate** — Passable but improvable         | Consider improving |
| 8-9   | 🟢 **Strong** — Minor improvements possible       | Low priority       |
| 10    | 💎 **Diamond** — Bulletproof                      | No action needed   |

**Portfolio Score** = Weighted geometric mean of all 12 dimensions  
**Weights**: D1-D4 (×3 critical), D5-D6 (×2 important), D7-D12 (×1 standard)

## Execution Protocol

### Phase 1: Claim-Level Audit

For EACH independent claim in the portfolio:

#### D1 — §101 Eligibility (Alice Test)

**Two-Step Analysis:**

1. **Step 1: Is the claim directed to an abstract idea?**

   - Check for: mathematical formulas/algorithms used as the core invention
   - Check for: "organizing human activity" (commercial transactions, legal obligations)
   - Check for: "mental processes" (concepts performable in the human mind)
   - ⚠️ **OHM-SPECIFIC RISK**: Fibonacci/φ/golden ratio mathematics → could be classified as "mathematical relationships" (abstract idea)
   - ⚠️ **OHM-SPECIFIC RISK**: Trust scoring, reputation systems → could be "organizing human activity"

2. **Step 2: Is there "significantly more"?**
   - Check claim recites: specific hardware (GPU, WebGPU, NFC/BLE)
   - Check claim recites: specific technical improvement (compression ratio improvement, latency reduction)
   - Check claim recites: unconventional combination of steps
   - Check claim AVOIDS: "apply it on a generic computer" language
   - ✅ **OHM STRENGTH**: Many claims involve specific hardware (accelerometers, NFC, WebGPU shaders)

**Remediation Template:**

```
BEFORE (weak):
"A method of compressing video using Fibonacci sequence ratios..."

AFTER (strong):
"A method of compressing video frames using a hardware-accelerated
GPU pipeline, wherein the pipeline applies quantization levels
derived from a Fibonacci sequence to motion vector magnitudes,
resulting in a measurably reduced bitrate compared to fixed
quantization while maintaining visual quality above a threshold
measured by [specific metric], the method executable on a
WebGPU-compatible computing device..."
```

**Key: Always tie abstract math to SPECIFIC TECHNICAL IMPROVEMENT + SPECIFIC HARDWARE.**

#### D2 — §102 Novelty

For each claim element:

1. Can ALL elements be found in a single prior art reference?
2. Search terms: [claim's technical terms] in USPTO, Google Patents, arXiv, IEEE
3. If yes → claim is anticipated → MUST modify

**OHM-Specific Search Strategy:**

- "Fibonacci" + "video compression" → search for academic papers
- "golden ratio" + "motion vectors" → search for patents
- "negentropy" + "bitrate allocation" → highly novel, low risk
- "stellated dodecahedron" + "encoding" → extremely novel, almost zero prior art
- "phase conjugate" + "frame prediction" → check Dan Winter's published work (is it prior art?)

⚠️ **CRITICAL**: Dan Winter's published research papers, YouTube lectures, and books may constitute prior art. If Dan Winter published the Fibonacci compression concept before OHM's filing date, claims may be anticipated. **Remediation**: Reference Dan Winter as prior art in the specification and claim the SPECIFIC IMPLEMENTATION (software architecture, GPU pipeline, WebCodecs integration) as the novel contribution.

#### D3 — §103 Non-Obviousness

For each claim:

1. Would a person of ordinary skill combine 2+ references to arrive at this invention?
2. **Graham v. John Deere factors:**
   - Scope of prior art
   - Differences between claim and prior art
   - Level of ordinary skill
   - Secondary considerations (commercial success, long-felt need, failure of others)

**OHM Non-Obviousness Arguments:**

- "Nobody has applied Fibonacci mathematics to video compression in 40+ years of video codec development" → long-felt need
- "Dan Winter's physics remained theoretical; OHM implemented it in production WebGPU code" → failure of others to implement
- "QFVC achieves measurable compression improvements over H.265" → unexpected results

#### D4 — §112 Enablement & Definiteness

Check each claim for:

1. **Enablement**: Could someone skilled in the art build it from the spec alone?

   - Does the spec include: algorithms, pseudocode, architecture diagrams?
   - Does the spec include: test results, benchmark data?
   - ⚠️ **OHM RISK**: Are TypeScript code listings included as enablement?

2. **Definiteness**: Are claim terms clear?
   - 🔴 Vague terms to AVOID: "substantially", "approximately", "optimally"
   - 🔴 Indefinite terms: "phi-harmonic" (needs explicit definition in spec)
   - 🟢 Definite terms: "Fibonacci sequence (1,1,2,3,5,8,13,21...)"

**Remediation**: Add a "Definitions" section to each provisional that explicitly defines ALL coined terms:

```
"phi-harmonic" = relating to frequency components whose ratios
approximate the golden ratio φ (1.6180339887...) within ±0.01%

"negentropy" = a measure of order/coherence in a signal, computed as
the negative of Shannon entropy for the signal's frequency distribution

"phase conjugate" = a signal transformation where the phase of each
frequency component is reversed (multiplied by -1)
```

#### D5 — Design-Around Vulnerability

For each independent claim, ask:

1. **Can a competitor achieve the same technical result by substituting ONE element?**

   - Replace "Fibonacci sequence" with "Lucas sequence" → infringing? (No, if claim says "Fibonacci")
   - Replace "golden ratio φ" with "silver ratio δ (1+√2)" → infringing? (No)
   - Replace "stellated dodecahedron" with "icosahedron" → infringing? (No)

2. **Mitigation**: Use functional claiming where possible:

```
BEFORE (narrow, easy to design around):
"...quantized to values in the Fibonacci sequence (1,1,2,3,5,8,13...)..."

AFTER (broad, hard to design around):
"...quantized to values in a mathematical sequence exhibiting
self-similar scaling properties, including but not limited to
Fibonacci numbers, Lucas numbers, or Pell numbers..."
```

3. **Alternative embodiment coverage**: For each core element, list 3+ alternative implementations and ensure at least one dependent claim covers each.

#### D6 — Whitespace Gaps

Between each pair of adjacent claims, check:

1. Is there unclaimed territory a competitor could occupy?
2. Are there obvious extensions/applications not covered?

**Common whitespace patterns:**

- Claim covers video but not audio (audio Fibonacci compression?)
- Claim covers encoding but not decoding (decompression pipeline?)
- Claim covers real-time but not offline batch processing
- Claim covers GPU but not CPU/TPU/NPU implementation
- Claim covers browser but not mobile native/desktop native

#### D7 — Claim Breadth Optimization

For each independent claim:

1. **Too narrow?** Does it specify unnecessary implementation details?
   - Remove specific pixel dimensions (640×360)
   - Remove specific model names (Real-ESRGAN, RIFE)
   - Keep these ONLY in dependent claims
2. **Too broad?** Will examiner reject as lacking novelty?
   - "A method of compressing video" → too broad
   - "A method of compressing video by applying quantization derived from properties of the golden ratio" → well-scoped

**Rule**: Independent claims should define the WHAT (result) and WHY (novel). Dependent claims should define the HOW (specific implementation).

#### D8 — Dependent Claim Depth

For each independent claim:

- **Minimum**: 3 dependent claims per independent claim
- **Ideal**: 5-8 dependent claims per independent claim
- **Purpose**: Each dependent claim is a "fallback position"

**Dependent claim strategy:**

```
Independent: The broad concept
├── Dep 1: Specific data structure / format
├── Dep 2: Specific algorithm step
├── Dep 3: Specific hardware acceleration
├── Dep 4: Specific quality metric / threshold
├── Dep 5: Specific application domain
├── Dep 6: Specific performance guarantee
└── Dep 7: Specific combination with another invention
```

If the independent claim is invalidated, each dependent claim independently protects a narrower but more defensible scope.

### Phase 2: Portfolio-Level Audit

#### D9 — Continuation/Divisional Strategy

1. Can the specification support ADDITIONAL claims not yet filed?
2. Are there restriction requirement risks (multiple inventions in one filing)?
3. Plan: File continuation applications after initial examination to capture competitor designs

**OHM Strategy:**

- SP2 (Quantum Visual Processing) contains QFVC + FPD → examiner may require restriction
- Prepare divisional response: QFVC claims separate from FPD claims
- Plan continuation: After seeing competitor video codecs, file continuation with claims targeting their specific architecture

#### D10 — Prosecution History Estoppel

Claims language that WILL force narrowing:

- "comprising" (open-ended, good) vs "consisting of" (closed, dangerous)
- "at least one" (good) vs "a" (ambiguous)
- "configured to" (good) vs "adapted to" (weaker)

**Remediation**: Audit ALL claim language for estoppel-prone terms BEFORE filing.

#### D11 — International Filing Readiness

- **PCT window**: 12 months from provisional filing date
- **EPO considerations**: European Patent Convention has different §101 equivalent (no Alice test, but "technical effect" requirement)
- **Software patentability**: EPO requires "further technical effect" — same claims that pass Alice should pass EPO
- **Translation**: Claims in English are accepted for PCT; national phase requires translation

#### D12 — Enforcement Practicality

For each claim, ask: **How would we PROVE infringement?**

| Evidence Type            | Detectability | Example                                             |
| ------------------------ | ------------- | --------------------------------------------------- |
| Product inspection       | 🟢 Easy       | Can see Fibonacci tiers in competitor's UI          |
| Network traffic analysis | 🟡 Medium     | Can detect resolution tiers in API calls            |
| Reverse engineering      | 🟠 Hard       | Need to decompile to see motion vector quantization |
| Internal process         | 🔴 Impossible | Cannot prove competitor uses PHQM internally        |

**Rule**: At least one independent claim per patent should be **easily detectable** by product inspection. Method claims that occur entirely inside a server are hard to enforce.

---

## Output Format

```markdown
# 🏰 PATENT FORTRESS AUDIT REPORT

## Portfolio: [Name]

## Date: [ISO 8601]

### Dimension Scores

| #   | Dimension        | Score | Status | Critical Finding   |
| --- | ---------------- | ----- | ------ | ------------------ |
| D1  | §101 Eligibility | X/10  | 🔴/🟢  | [one-line summary] |
| D2  | §102 Novelty     | X/10  | 🔴/🟢  | [one-line summary] |
| ... | ...              | ...   | ...    | ...                |

### Portfolio Score: X.X/10 [STATUS]

### Per-Claim Audit

#### Claim [N] — [Title]

- D1: [score] — [finding]
- D5: [score] — [design-around risk]
- ...
- **Remediation**: [specific change]

### Remediation Priority Queue

| Priority | Claim   | Dimension | Action                             | Effort  |
| -------- | ------- | --------- | ---------------------------------- | ------- |
| P0       | [claim] | D1        | [fix Alice risk]                   | [hours] |
| P1       | [claim] | D5        | [broaden to prevent design-around] | [hours] |
| ...      | ...     | ...       | ...                                | ...     |
```

---

## Examiner Objection Playbook

### If you receive a §101 rejection:

1. **Identify the abstract idea cited** by the examiner
2. **Argue Step 2A Prong Two**: The claim integrates the abstract idea into a practical application
   - Point to: specific hardware (GPU, WebGPU, NFC/BLE)
   - Point to: specific technical improvement (compression ratio, latency)
   - Point to: transformation of data (raw video → compressed bitstream)
3. **If argument fails**: Amend claim to add hardware limitation (e.g., "executed on a GPU having WebGPU API support")
4. **File SMED (Subject Matter Eligibility Declaration)**: Provide benchmark data showing technical improvement

### If you receive a §102 rejection:

1. **Analyze the cited reference**: Does it truly anticipate EVERY element?
2. **Find distinguishing element**: Usually the φ/Fibonacci mathematics + specific application
3. **Argue**: The reference does not teach [specific element]
4. **If argument fails**: Amend to add the distinguishing element as a limitation

### If you receive a §103 rejection:

1. **Challenge the combination**: Would a person of ordinary skill ACTUALLY combine these references?
2. **Argue teaching away**: Prior art teaches AGAINST this combination
3. **Argue unexpected results**: Fibonacci compression achieves results the prior art would not predict
4. **Submit declaration**: Under 37 CFR 1.132, submit inventor declaration with benchmark data

### If you receive a §112 rejection:

1. **Add definitions**: Define all coined terms in the specification
2. **Add examples**: Include at least 3 working examples with code
3. **Fix indefinite terms**: Replace "approximately" with "within ±X%"

---

## OHM-Specific Risk Matrix

| Domain             | Highest Risk Dimension        | Why                                                                            |
| ------------------ | ----------------------------- | ------------------------------------------------------------------------------ |
| QFVC               | D1 (§101), D5 (Design-Around) | Fibonacci math = abstract idea risk; competitors can use other sequences       |
| NI                 | D1 (§101), D12 (Enforcement)  | "Consciousness" claims are extremely abstract; internal process hard to detect |
| Trust/Identity     | D3 (§103), D5 (Design-Around) | Trust scoring has extensive prior art; many alternative implementations        |
| FORTRESS           | D3 (§103), D12 (Enforcement)  | Content protection is crowded field; DRM detection is internal                 |
| Tesla Heritage     | D2 (§102), D1 (§101)          | Tesla's original patents may anticipate; EMF protection is physics             |
| FPD                | D1 (§101), D2 (§102)          | Fibonacci display math → abstract; Dan Winter published concepts               |
| Economy/XOM        | D1 (§101)                     | Cryptocurrency/token economics → abstract financial methods                    |
| Resonance          | D1 (§101), D12 (Enforcement)  | Scalar waves, bio-resonance → natural phenomena; hard to detect                |
| Grid Harmonization | D1 (§101), D2 (§102)          | Schumann resonance → natural phenomenon; published science                     |
| New Earth Device   | D1 (§101), D2 (§102)          | Longitudinal waves → physics; healing claims → natural phenomena               |

---

## Claim Language Cheatsheet

### Words to USE (prosecution-friendly):

- "comprising" (open-ended, allows additional elements)
- "configured to" (functional, tied to structure)
- "at least one" (minimum without ceiling)
- "operatively coupled" (allows various connection types)
- "a processor executing instructions stored in memory" (ties to hardware)
- "a non-transitory computer-readable medium" (standard for software)

### Words to AVOID (prosecution-hostile):

- "consisting of" (closed-ended, limits to listed elements only)
- "adapted to" (weaker than "configured to", may imply intended use)
- "optimal" / "optimally" (indefinite)
- "substantially" (indefinite unless defined in spec)
- "approximately" (indefinite unless defined with tolerance)
- "means for" (invokes §112(f) means-plus-function, very narrow interpretation)
- "algorithm" (triggers abstract idea flag)

### OHM Coined Terms (MUST define in spec):

- phi-harmonic → explicit mathematical definition
- negentropy → explicit formula
- phase conjugate → explicit transformation
- stellated dodecahedral → explicit geometry
- coherence → explicit measurement method
- bio-resonance → explicit frequency ranges
- scalar wave → explicit physical description
- golden spiral trajectory → explicit parametric equation

---

## Integration with Other Skills

| When                              | Then                                                                    |
| --------------------------------- | ----------------------------------------------------------------------- |
| Audit finds D1 risk               | Feed to `patent_claim_generator` → rewrite with hardware tie-in         |
| Audit finds D5 design-around      | Feed to `triz_whitespot` → find broader covering concepts               |
| Audit finds D6 whitespace         | Feed to `disruption_scout` → identify adjacent inventions               |
| Audit finds D8 shallow dependents | Feed to `patent_claim_generator` → generate additional dependent claims |
| Audit produces remediation        | Feed to `innovation_journal` → log changes with timestamps              |
| Claims pass all 12 dimensions     | Ready for filing → `legal_compliance` for final check                   |
