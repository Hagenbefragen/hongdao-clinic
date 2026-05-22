---
name: TRIZ Whitespot Detector
description: TRIZ-based innovation whitespace detection. Finds contradictions between goals, applies the 40 Inventive Principles to dissolve trade-offs, and maps patentable whitespace. Combines with blind_spot_detector and disruption_scout.
group: smart.security
---

# ⚡ TRIZ Whitespot Detector — "Dissolve, Don't Compromise"

## Purpose

Uses the **TRIZ (Theory of Inventive Problem Solving)** framework to find innovation whitespace — areas where two goals appear mutually exclusive, but a disruptive dissolution exists that nobody has discovered yet.

> "A trade-off is not a law of physics. It's a failure of imagination." — Genrich Altshuller

## When to Trigger

- After `/bpcxpollinationspiderweb` identifies trade-offs between BPC dimensions
- After `blind_spot_detector` finds gaps that require innovation (not just fixes)
- When a feature request creates a contradiction ("we need X but it breaks Y")
- Before patent filing — validate novelty via TRIZ analysis
- During strategic planning — identify disruptive moves

## Integration Chain

```
blind_spot_detector → finds GAPS
        ↓
triz_whitespot → finds DISSOLUTIONS for those gaps
        ↓
disruption_scout → researches MARKET + PATENT landscape for dissolutions
        ↓
strategic_advisor → PRIORITIZES which dissolutions to build
        ↓
ship_engine → BUILDS them
```

## The TRIZ Process (5 Steps)

### Step 1: Extract the Contradiction

Every hard problem has a **Technical Contradiction (TC)**:

> "Improving Parameter A degrades Parameter B"

**Sources of contradictions:**

- BPC Spider Web: any dimension pair where both are below target
- Feature requests: "We want feature X but it conflicts with Y"
- Audit findings: "Fixing this security issue breaks performance"
- Customer feedback: "I love X but hate Y" (they're linked)

**Template:**

```
TC-[N]: Improving [PARAMETER A] degrades [PARAMETER B]
  Current A: [score]  Target A: [target]
  Current B: [score]  Target B: [target]
  Severity: 🔴 Critical | 🟠 Significant | 🟡 Notable
```

### Step 2: Classify Using TRIZ Parameters

Map your contradiction to the standard 39 TRIZ Engineering Parameters:

| #   | Parameter           | Software Equivalent               |
| --- | ------------------- | --------------------------------- |
| 9   | Speed               | Latency, throughput, tok/s        |
| 10  | Force               | Processing power, compute         |
| 12  | Shape               | Architecture, topology            |
| 13  | Stability           | Drift resistance, uptime          |
| 14  | Strength            | Security, resilience              |
| 21  | Power               | Energy consumption, watts         |
| 25  | Loss of time        | TTFT, cold start delay            |
| 27  | Reliability         | Failure rate, coherence %         |
| 30  | Harmful factors     | Privacy leakage, data exposure    |
| 32  | Ease of manufacture | Developer experience, CI/CD speed |
| 33  | Ease of operation   | UX simplicity, onboarding time    |
| 36  | Device complexity   | Codebase complexity, dependencies |
| 39  | Productivity        | Queries/sec, batch throughput     |

### Step 3: Look Up the Contradiction Matrix

Cross-reference Improving Parameter × Worsening Parameter in the TRIZ matrix to find recommended Inventive Principles.

**Top 15 Principles for AI/Software Innovation:**

| #   | Principle                   | Mechanism                           | AI/Software Application                                 |
| --- | --------------------------- | ----------------------------------- | ------------------------------------------------------- |
| 1   | **Segmentation**            | Divide into parts                   | Microservices, model sharding, speculative decoding     |
| 2   | **Taking Out**              | Extract the disturbing part         | Separate concerns, extract tokens before inference      |
| 5   | **Merging**                 | Combine in space/time               | API aggregation, pipeline fusion, batch processing      |
| 9   | **Prior Counteraction**     | Pre-compensate                      | Pre-compiled regex (Aho-Corasick), pre-warmed caches    |
| 10  | **Prior Action**            | Do the work ahead of time           | Materialized views, ahead-of-time compilation           |
| 12  | **Equipotentiality**        | Change conditions so no work needed | Edge/NPU inference (same quality, no cloud needed)      |
| 13  | **The Other Way Round**     | Invert the process                  | Pull vs push, recipient proves trust (not sender)       |
| 15  | **Dynamics**                | Make rigid things flexible          | Dynamic model routing, adaptive temperature             |
| 17  | **Another Dimension**       | Move to higher dimension            | 12D Heim alignment space, multi-modal fusion            |
| 22  | **Convert Harm to Benefit** | Use harmful factor positively       | Misalignment as training signal, errors as features     |
| 25  | **Self-Service**            | Object serves itself                | Auto-healing, PDCA self-loop, self-improving benchmarks |
| 28  | **Mechanics Substitution**  | Replace mechanical with field       | Software-defined security, zero-hardware auth           |
| 35  | **Parameter Change**        | Change a property                   | Dynamic quantization, Fibonacci-weighted scoring        |
| 37  | **Thermal Expansion**       | Phase change                        | Hot-swap models, progressive loading                    |
| 40  | **Composite Materials**     | Combine different materials         | Hybrid local+cloud, multi-model ensemble                |

### Step 4: Generate Dissolution Candidates

For each contradiction, generate **3 dissolution candidates** using the recommended principles:

```markdown
## DISSOLUTION: [Name]

**Contradiction:** [A] ↔ [B]
**TRIZ Principle:** #[N] — [Name]

### Mechanism

[HOW does this principle dissolve the trade-off? Be specific.]

### Implementation

[WHAT code/system changes are needed?]

### Predicted Impact

| Dimension | Current | After | Change |
| --------- | ------- | ----- | ------ |
| [A]       | [x.x]   | [y.y] | +[Δ]   |
| [B]       | [x.x]   | [y.y] | +[Δ]   |
| Composite | [x.x]   | [y.y] | +[Δ]   |

### Validation

[How to PROVE this works: benchmark, PoC, A/B test]

### Novelty Assessment

- **Prior art search:** [Results from USPTO/arXiv]
- **Novelty:** 🟢 Novel | 🟡 Incremental | 🔴 Known
- **Patent potential:** 🟢 Strong | 🟡 Possible | 🔴 Unlikely
- **Filing priority:** [1-10]

### Effort & Timeline

- **Complexity:** S / M / L / XL
- **Dependencies:** [What's needed first]
- **Estimated timeline:** [days/weeks/months]
```

### Step 5: Rank & Prioritize

Score each dissolution on the **Innovation Impact Matrix**:

```
Score = (Impact × Novelty × Confidence) / Effort

Where:
  Impact = Composite BPC improvement (0-3 points)
  Novelty = 3 (novel), 2 (incremental), 1 (known)
  Confidence = 0.3 (theory), 0.6 (PoC exists), 1.0 (proven)
  Effort = 1 (S), 2 (M), 3 (L), 4 (XL)
```

**Priority Tiers:**
| Tier | Score | Action |
|------|-------|--------|
| 🥇 Build Now | > 1.0 | File patent + implement immediately |
| 🥈 Research | 0.5–1.0 | Run PoC to increase confidence |
| 🥉 Backlog | 0.2–0.5 | Document for future consideration |
| ❌ Park | < 0.2 | Too risky or too much effort for impact |

## Output Report Format

```markdown
# TRIZ WHITESPACE ANALYSIS

Date: [date]
System: [analyzed system/feature]
Contradictions: [N found]

## Contradiction Map

[Table of all TCs with severity]

## Top Dissolutions (Ranked)

[Each dissolution with full template above]

## Innovation Radar

[2D plot: Impact vs Effort, colored by Novelty]

## Patent Filing Queue

[Ordered list of what to file first]

## Recommended Next Steps

1. [Specific action]
2. [Specific action]
3. [Specific action]
```

## Example: ONE NI TRIZ Analysis (2026-02-22)

| TC  | Contradiction      | TRIZ #               | Dissolution            | Score | Status      |
| --- | ------------------ | -------------------- | ---------------------- | ----- | ----------- |
| TC1 | Privacy↔Speed      | #12 Phase Transition | NPU hardware inference | 1.5   | 🥇 Research |
| TC2 | Security↔Speed     | #9 Prior Action      | Aho-Corasick FSA       | 2.0   | ✅ DONE     |
| TC3 | Quality↔Energy     | #1 Segmentation      | Speculative decoding   | 1.2   | 🥇 Research |
| TC4 | Sovereignty↔Speed  | #28 Mechanics Sub    | WASM inference runtime | 0.8   | 🥈 Backlog  |
| TC5 | Auditability↔Speed | #25 Self-Service     | Async AVR chain        | 0.6   | 🥈 Backlog  |

**Proof of concept:** TC2 (Aho-Corasick) was our first TRIZ dissolution to reach production. Security went from 8.3→9.0 AND Speed improved from 5.3→6.5. The trade-off was **dissolved, not compromised.**

---

## APPENDIX A: BPC Trade-Off Mode (Merged from `trade_off_detection`)

> This appendix covers BPC-specific trade-off detection for spider web charts. Triggered by `/bpcxpollinationspiderweb` workflow.

### A.1 Types of BPC Trade-Offs

| Type               | Definition                                         | Example                                              |
| ------------------ | -------------------------------------------------- | ---------------------------------------------------- |
| **Physical**       | A property must be both X and NOT-X                | High friction (safety) ↔ low friction (fuel economy) |
| **Technical**      | Improving Feature A degrades Feature B             | Security (encryption) ↔ Performance (speed)          |
| **Organizational** | One stakeholder's win is another's loss            | Privacy (user) ↔ Compliance (regulator)              |
| **Temporal**       | Short-term benefit conflicts with long-term health | Speed to market ↔ Technical debt                     |

### A.2 BPC Coupling Matrix

For N BPC dimensions, build an N×N matrix:

```
Legend: ++ synergistic, + mild synergy, 0 independent, - mild antagonism, -- TRADE-OFF
```

### A.3 BPC Severity Scoring

| Severity         | Condition                                   | Chart Indicator    |
| ---------------- | ------------------------------------------- | ------------------ |
| 🔴 Critical      | Both BPC are Tier 1 (weight ≥ 3.0) AND `--` | Red pulsing axis   |
| 🟠 Significant   | One BPC is Tier 1 AND `--`                  | Orange dashed axis |
| 🟡 Notable       | Coupling is `-` with measurable impact      | Yellow dotted axis |
| ⚪ Informational | Suspected but unverified                    | Grey annotation    |

### A.4 The 12 BPC Dissolution Principles

| #   | Principle        | BPC Application                                                                |
| --- | ---------------- | ------------------------------------------------------------------------------ |
| 1   | Segmentation     | Separate conflicting aspects in SPACE (e.g., encrypt only sensitive fields)    |
| 2   | Taking Out       | Remove conflicting component (e.g., HSM offloads encryption from CPU)          |
| 3   | Local Quality    | Each part optimized differently (e.g., AES-256 for vault, ChaCha20 for stream) |
| 4   | Asymmetry        | Break symmetry (e.g., encrypt uploads, serve pre-encrypted CDN)                |
| 5   | Merging          | Combine opposing functions (e.g., AES-GCM = encrypt + integrity in ONE pass)   |
| 6   | Universality     | One component serves both (e.g., WebCrypto API = no library overhead)          |
| 7   | Nesting          | Fast thing inside slow thing (e.g., memory cache inside encrypted store)       |
| 8   | Counterweight    | Convert weakness to strength (e.g., blocking trackers = LESS traffic = faster) |
| 9   | Prior Action     | Pre-compute before conflict arises (e.g., trust scores on install)             |
| 10  | Copying          | Lightweight copy instead of real thing (e.g., checksum vs re-decrypt)          |
| 11  | Cheap Disposable | Session keys instead of permanent keys                                         |
| 12  | Phase Transition | Change medium entirely (e.g., software → hardware AES-NI)                      |

### A.5 Spider Web Chart.js Plugin

Use the `tradeOffArcs` Chart.js plugin to draw curved connecting lines between conflicting BPC axes. See `/bpcxpollinationspiderweb` workflow for full integration steps.

### A.6 Dissolution Template

```markdown
### ⚡ Trade-Off: [BPC-A] ↔ [BPC-B]

**Contradiction:** Improving [A] requires [mechanism], which degrades [B] because [reason].
**Current:** A=[X/10], B=[Y/10], Sacrifice=[-Z on B]
**TRIZ Principle:** #[N] — [Name]
**Dissolution:** [Specific proposal for BOTH to improve]
**Post-Dissolution:** A=[X'/10] (+ΔA), B=[Y'/10] (+ΔB)
**Effort:** S/M/L | **Innovation:** Incremental/Architectural/Disruptive
```

---

_Formerly `trade_off_detection` skill — merged into `triz_whitespot` on 2026-02-22._
