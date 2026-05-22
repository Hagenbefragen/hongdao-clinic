---
name: BPC Spider Web Generator
description: Generate interactive BPC XPollination Spider Web charts with Trade-Off Detection, TRIZ Dissolution, Formal Verification, Vergleichende Werbung Legal Compliance (FEAT-293), and Quality Gates. The complete engine for comparing solutions against Best Practice Criteria with legally defensible competitor comparisons.
group: smart.analysis
---

# 🕸️ BPC Spider Web Generator — XPollination + Trade-Off Detection + Legal Compliance

> **Version:** 3.0 — 2026-03-24
> **Patent Claims:** Section AB (1868–1891) — 24 claims
> **Hardened via:** FEAT-239 (Z3 Verification, NPU Fallback, Poisoned Matrix Guard) + FEAT-293 (Vergleichende Werbung Legal Compliance)
> **Survivability:** 99/100

## Purpose

Generate an interactive BPC Spider Web chart with integrated Trade-Off Detection — identifying codependent BPC pairs that cannot both reach 10/10, visualizing them as conflict arcs, and autonomously dissolving contradictions via formally verified code modifications. When the chart **names or identifies competitors**, it must pass the VWCS (Vergleichende Werbung Compliance Shield) 6-gate verification before publication.

## When to Trigger

- When the user invokes `/bpcxpollinationspiderweb`
- When a comparative evaluation of multiple solutions is needed
- When the user wants to visually compare competitors against OHM/FORTRESS/Destill
- When `/xpollination` is invoked (this skill supersedes the basic version)
- When a BPC audit or competitive analysis is requested

## Integration Chain

```
SENSE (scan) → This Skill (DISSOLVE) → SHIP (deploy) → SELL → PROTECT → MEASURE
     ↑                                                                        |
     └─────────────── PDCA feedback (metrics only, not re-execution) ──────────┘
```

## Companion Skills

| Skill | Role | Read Before Executing? |
|-------|------|----------------------|
| `xpollination_analyst` | BPC design, scoring rubrics, radar chart architecture | ✅ YES |
| `triz_whitespot` | Contradiction detection, 40 Inventive Principles, BPC mode | ✅ YES |
| `test_engineer` | Z3 formal verification of dissolution scripts | Only if code dissolutions |
| `pdca_tracker` | Post-deployment telemetry, Poisoned Matrix Guard | Only post-deployment |

---

## Phase 1: Framework Design 🧩

### 1.1 Define BPC Dimensions

- Define **5–9 Main BPCs** with mandatory coverage of: Sustainability, Health, Justice, Longevity, Freedom
- Define **2–6 Sub BPCs** per Main BPC
- Assign weights (equal default, or stakeholder-weighted)
- Each BPC gets a **one-sentence definition (max 20 words)**

> **⚖️ VWCS-G2 (§ 6 Abs. 2 Nr. 2 UWG):** Every BPC dimension MUST reference a **measurable property** — NO subjective labels like "Innovation" or "Quality." Use instead: "Latency (ms)," "PQC Key Exchange (yes/no)," "GDPR Compliance Certificates held."

### 1.2 Identify Solutions

- Search **Open Source** alternatives first (GitHub/GitLab)
- Add **sovereign/decentralized** alternatives second
- Add **commercial** solutions last
- Select **4–9 solutions** total
- Verify availability, pricing, license compatibility

> **⚖️ VWCS-G1 (§ 6 Abs. 2 Nr. 1 UWG):** ALL solutions MUST serve the **same market purpose** (gleiche Zweckbestimmung). E.g., "B2B Content Protection APIs" — no mixing content protection with CDN providers or general cloud storage.

### 1.3 Score All Solutions

- Score each Sub BPC on **0–10 scale** for EACH solution
- Calculate Main BPC averages
- Calculate weighted composite scores
- Back every score with **evidence** (URL, screenshot, benchmark)
- Apply **bias prevention**: score OWN solution FIRST

> **⚖️ VWCS-G2 (Nachprüfbarkeit):** Every score MUST have a **publicly accessible evidence URL** (no paywalled references).

> **⚖️ VWCS-G5 (§ 6 Abs. 2 Nr. 5 — Herabsetzung):** Every score **< 4/10** MUST include:
> 1. A **neutral factual explanation** (e.g., "As of March 2026, Company X's docs do not reference PQC")
> 2. An **evidence URL** proving the absence
> 3. An **improvement path** ("Score will be updated when Company X releases this — email hello@destill.ai")

**Output:** `Scored Matrix`

---

## Phase 2: Trade-Off Detection ⚡

### 2.1 Build Coupling Matrix

Build an N×N matrix of all BPC pairs:
- `++` = strongly synergistic
- `+` = mildly synergistic
- `0` = independent
- `-` = mildly antagonistic
- `--` = **TRADE-OFF** (strongly antagonistic)

### 2.2 Extract & Classify Trade-Offs

- Extract all `--` pairs
- Classify severity:
  - 🔴 Critical: Both BPC are Tier 1 (weight ≥ 3.0)
  - 🟠 Significant: One BPC is Tier 1
  - 🟡 Notable: Measurable impact but lower weight

### 2.3 TRIZ Dissolution

For EACH trade-off pair:
1. Explain the **coupling mechanism** (WHY they conflict)
2. Select the most applicable **TRIZ inventive principle** (from the 40 principles)
3. Propose a **specific dissolution** (not a compromise!)
4. Predict **post-dissolution scores** for both BPCs
5. Classify: **Implementation Effort** (S/M/L) + **Innovation Type** (incremental/architectural/disruptive)

**Rule:** At least ONE dissolution must be classified as "disruptive."

### 2.4 Formally Verify Dissolution Scripts (FEAT-239)

> **MANDATORY GATE** — No dissolution proceeds to SHIP without passing.

For each dissolution that generates a code modification:
- Run **Property-Based Testing** to verify boundary conditions
- Run **Z3 Theorem Proving** to verify security bounds are preserved
- Verify the dissolution does NOT regress any previously passing test
- Generate a **Verification Certificate** (SHA-256 hash of test results)

If verification FAILS → REJECT the dissolution, log to `pdca_tracker`, select alternative TRIZ principle.

**NPU Offline Fallback:** If LLM API unavailable, route the contradiction matrix to the local 4-bit SLM running on hardware NPU (trained on 40 TRIZ principles + previous OHM dissolutions).

**Output:** `VerifiedDissolutionPlan`

---

## Phase 3: Chart Generation 🕸️

### 3.1 Spider Web Chart (Chart.js Radar)

- Create Chart.js radar chart with axes = Main BPCs
- Add Toggle: **"Simplified Data View ↔ Interactive Analysis"** (Dual-Mode per FEAT-293 D-3)
- Add tooltips: axis hover (definition + score) + data point hover (solution name, price)
- Add legend with Open Source highlighting
- Add PNG download button

### 3.2 Trade-Off Visual Enhancements

- Register the `tradeOffArcs` Chart.js plugin
- Highlight conflicting axes with severity colors (🔴 Red pulsing / 🟠 Orange dashed / 🟡 Yellow dotted)
- Draw conflict arcs (curved dashed lines) between trade-off BPC pairs
- Place ⚡ icon at the midpoint of each conflict arc
- Extend legend with "⚡ Trade-Off Detected (N)" entry
- Tooltip on arc hover: Show coupling mechanism + dissolution proposal

### 3.3 FEAT-293 Legal Compliance Elements (MANDATORY)

Every chart MUST include these elements:

#### 📅 Creation Date Stamp

```html
<footer class="bpc-metadata">
  <p>Data accurate as of: <time datetime="YYYY-MM-DD">YYYY-MM-DD</time></p>
</footer>
```

Rendered as a visible footer below the chart AND as a machine-readable `<time>` element. Satisfies the BGH "Aktualitätsgebot" (currency requirement).

#### 📧 "Request Update" Button

```html
<a href="mailto:hello@destill.ai?subject=BPC%20Data%20Update%20Request%20-%20[TOPIC]&body=Dear%20Destill%20Team%2C%0A%0AI%20would%20like%20to%20request%20an%20update%20to%20the%20BPC%20comparison%20chart%20for%20[TOPIC].%0A%0ASpecific%20data%20point(s)%20to%20review%3A%0A-%20%0A%0ABest%20regards"
   class="request-update-btn"
   style="display:inline-flex;align-items:center;gap:8px;padding:10px 20px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;transition:all 0.3s;box-shadow:0 2px 8px rgba(99,102,241,0.3);">
  📧 Request Data Update
</a>
```

**Legal rationale:** Implements the open correction mechanism required by § 6 Abs. 2 Nr. 2 UWG (Nachprüfbarkeit). Competitors and customers can request score updates with evidence.

#### 🏷️ BPC Purpose Statement

A single sentence at the top of every chart defining the comparison scope. E.g., *"This comparison evaluates B2B Enterprise Content Protection APIs as of March 2026."*

#### ⚖️ Legal Disclaimer Footer

Every chart includes:
1. The data timestamp
2. Link to the full methodology (open XPollination rubric)
3. Link to the correction mechanism (email or GitHub PR)
4. Statement: *"Scores reflect publicly available information. Vendors: submit corrections to hello@destill.ai with evidence URL."*

#### 🔒 Competitor Trademark Rules

- Names used ONLY for identification
- NO logos, NO slogans, NO competitor brand colors
- Per Art. 4(f) Directive 2006/114/EC and CJEU C-533/06 (O2 v Hutchison)

#### ⚖️ Client-Side Weight Sliders

Default weights MUST be **equal** across all BPC dimensions. The buyer adjusts via UI sliders. This shifts the subjective judgment from OHM to the buyer's browser, providing bulletproof defense against § 6 Abs. 2 Nr. 2 claims of manipulated weighting.

**Output:** Interactive Spider Web HTML

---

## Phase 4: Trade-Off Explanation Section 📝

Below the spider web chart, generate a **Trade-Off Analysis** section:

- Header: "⚡ Trade-Off Analysis — {N} Codependent BPC Pairs Detected"
- Subtitle: "These dimensions cannot both reach 10/10 without disruptive innovation."

For EACH trade-off (collapsible `<details>` cards):
- Severity badge (🔴 / 🟠 / 🟡)
- Pair names: **BPC-A ↔ BPC-B**
- "Why They Conflict" section (mechanism)
- Scores table: Current | Weight | Sacrifice
- "💡 Disruptive Dissolution" section with TRIZ Principle, proposal, predicted scores, effort badge, innovation type badge

Summary Table at the end:
```
| # | Trade-Off | Severity | TRIZ Principle | Effort | Innovation |
|---|-----------|----------|----------------|--------|------------|
```

---

## Phase 5: Awards & Labels 🏆

- Calculate final composite scores
- Apply label criteria (overall ≥ 7.0, no BPC below 4.0, Security ≥ 7.0)
- Award **Gold** (≥9) / **Silver** (≥8) / **Bronze** (≥7) label
- Add **"⚡ Innovation" badge** for successful trade-off dissolutions
- Add **"🔬 Verified" badge** if all dissolutions passed Z3 formal verification

---

## Phase 6: VWCS Legal Compliance Gate ⚖️

> **MANDATORY GATE** — No chart is published without passing ALL 6 VWCS gates.

| Gate | § 6 UWG Nr. | Check | Verification |
|------|------------|-------|-------------|
| G1 | Nr. 1 — Zweckbestimmung | All compared products serve the same market purpose | Manual: BPC Purpose Statement |
| G2 | Nr. 2 — Nachprüfbarkeit | Every score has a verifiable evidence URL | Automated: `jq '.scores[] \| select(.evidence_url == null)'` returns empty |
| G3 | Nr. 3 — Verwechslungsgefahr | No brand confusion possible | Visual: competitors clearly labeled, distinct colors |
| G4 | Nr. 4 — Rufausnutzung | No free-riding on competitor prestige | Review: no "as trusted as [Competitor]" phrasing |
| G5 | Nr. 5 — Herabsetzung | All scores <4 have neutral explanation + correction path | Automated: `jq '.scores[] \| select(.value < 4 and .explanation == null)'` |
| G6 | Nr. 6 — Nachahmung | Product presented as original, not imitation | Review: no "equivalent to" or "replica of" language |

**Additional Checks:**
- [ ] 📅 Creation Date present (human + machine-readable)
- [ ] 📧 Request Update Button present (`mailto:hello@destill.ai`)
- [ ] ⚖️ Legal Disclaimer Footer present
- [ ] 🔒 No competitor logos/slogans/brand colors
- [ ] ⚖️ Default weights equal (no pre-bias)
- [ ] 📐 No `score_date` older than 180 days

**Rule:** ALL gates PASS → Publish. **ANY** gate FAIL → Block until fixed.

**Legal Basis:**
- EU: Directive 2006/114/EC Art. 4
- DE: § 6 UWG Abs. 2 Nr. 1–6
- AT: § 2a UWG (mirrors EU, cross-refs §§ 1, 1a, 2, 7, 9)
- Case Law: BGH BGHZ 65,325 (1975), BGH I ZR 48/10, BGH I ZR 98/23 (2024), BGH I ZR 143/23 (2024), CJEU C-697/23 (2025), LG Frankfurt (2023)

---

## Phase 7: Poisoned Matrix Guard (Post-Deployment)

> Activates AFTER deployment to production.

- Monitor production telemetry for 72 hours
- If `pdca_tracker` detects regression:
  1. Auto-revert Git commit
  2. Reinstate `--` trade-off tag
  3. Generate Poison Hash: SHA-256(contradiction_coordinates + TRIZ_principle_used)
  4. Inject into `quantum_intuition` memory to permanently block that pathway
- If no regression after 72h: mark as **CONFIRMED ✅**

---

## Phase 8: Compile Final Report 📄

Assemble outputs into a single deliverable:

```markdown
# 🕸️ XPollination Report: [Topic]

## 1. BPC Framework
## 2. Solutions Compared
## 3. Detailed Scores
## 4. Spider Web Chart
## 5. ⚡ Trade-Off Analysis
## 6. Coupling Matrix
## 7. Formal Verification Certificates
## 8. Rankings & Labels
## 9. Poisoned Matrix Registry
## 10. Key Insights & Recommendations
## 11. Legal Compliance (VWCS)
## 12. Publication Metadata
- **Data Accurate As Of:** [YYYY-MM-DD]
- **Request Update:** [mailto:hello@destill.ai link]
- **Methodology:** [URL to XPollination rubric]
- **Correction Mechanism:** Email hello@destill.ai with evidence URL
```

Save to: `Documentation/XPollination/XPOLL_[TOPIC]_[DATE].md`

---

## 🔬 Phase 9: Quality Gates (MANDATORY FINAL STEP)

> **Delegates to:** `.agent/skills/quality_gateway/SKILL.md` — **Loop 12: Technical Integrity Gates (TIG-1 through TIG-5)**
> Every BPC Spider Web execution MUST pass ALL quality gates before being reported to the user as complete.

### Step 1: Run BPC-Specific Deliverables Check (TIG-1 Specialization)

Verify ALL required outputs exist on disk:

| # | Deliverable | Required? | Verification |
|---|------------|-----------|-------------|
| 1 | BPC Framework Table | ✅ YES | File exists with ≥5 Main BPCs defined |
| 2 | Solution List | ✅ YES | ≥4 solutions identified with availability verified |
| 3 | Scored Matrix | ✅ YES | All cells filled, no NaN/null scores |
| 4 | Coupling Matrix | ✅ YES | N×N matrix complete, ≥1 trade-off detected |
| 5 | Spider Web HTML | ✅ YES | File renders without JS errors, Chart.js loads |
| 6 | Trade-Off Explanation Section | ✅ YES | ≥1 trade-off card with TRIZ dissolution |
| 7 | XPollination Label | ✅ YES | Gold/Silver/Bronze awarded |
| 8 | VWCS Compliance Report | ✅ (if competitors named) | 6/6 gates PASS |
| 9 | Creation Date + Request Update Button | ✅ YES | Visible in HTML output, `mailto:hello@destill.ai` |
| 10 | Final Report (.md) | ✅ YES | All 12 sections populated |

**Gate Verdict:** `[N]/10 deliverables verified` — MUST be **10/10** to pass.

### Step 2: Run Universal Technical Integrity Gates (Quality Gateway)

Execute ALL 5 TIG gates from `.agent/skills/quality_gateway/SKILL.md` §Loop 12:

| Gate | Name | What It Catches |
|------|------|----------------|
| **TIG-1** | Deliverables Completeness | Missing files, stub content, TODO markers |
| **TIG-2** | Anti-Hallucination | Fake URLs, invented companies, hallucinated case law, fabricated statistics |
| **TIG-3** | Context Window Health | Agent degradation from context saturation (CWP Dual-Channel) |
| **TIG-4** | Truncation Guard | Silently truncated output, skipped phases, incomplete JSON |
| **TIG-5** | Cross-File Consistency | Score drift between matrix ↔ chart, date mismatches, SSOT violations |

### Step 3: Run 5-Point Quality Check (Quality Gateway)

Execute the standard 5-point check from `.agent/skills/quality_gateway/SKILL.md`:
- 🧭 OHM Alignment (×0.20)
- ✅ Consistency (×0.15)
- 🔍 Plausibility (×0.20)
- 🪟 Transparency (×0.10)
- 💎 Quality/Persuasiveness (×0.10)
- 🔬 Technical Integrity (×0.25)

### Step 4: Produce Quality Gate Summary Report

```markdown
## 🔬 Quality Gate Summary

| Gate | Name | Status | Details |
|------|------|--------|---------|
| BPC-1 | BPC Deliverables | [✅/🔴] | [N]/10 delivered |
| TIG-1 | Completeness | [✅/🔴] | All files > 100 bytes, no TODOs |
| TIG-2 | Anti-Hallucination | [✅/🔴] | [N] URLs verified, [N] entities confirmed |
| TIG-3 | Context Health | [🟢/🟡/🟠/🔴] | Channel A: [N]/4, Channel B: [PASS/FAIL] |
| TIG-4 | Truncation Guard | [✅/🟠] | [N] phases complete |
| TIG-5 | Cross-File Consistency | [✅/🔴] | [N]/5 checks passed |
| QG | 5-Point Quality Score | [score]/100 | [PASS ≥80 / FAIL <80] |

**Overall:** [PASS ✅ / PARTIAL 🟠 / FAIL 🔴]
```

**Non-Negotiable Rule:** If ANY TIG gate is 🔴 FAIL, the agent MUST NOT report the task as complete — regardless of how high the Quality Score is. A beautifully crafted report with hallucinated data is WORSE than an incomplete report with real data.

---

## Appendix: Chart.js Configuration Template

```javascript
const config = {
  type: "radar",
  data: { /* standard radar data */ },
  options: { /* standard radar options */ },
  plugins: [tradeOffPlugin],
};

const tradeOffPluginOptions = {
  tradeOffs: [
    {
      fromAxis: 0,
      toAxis: 3,
      color: "#ef4444",
      label: "Security ↔ Performance",
      tooltip: "Encryption overhead reduces response speed",
    },
  ],
};
```

---

_This skill combines XPollination (holistic evaluation) + Trade-Off Detection (TRIZ contradiction analysis) + Vergleichende Werbung Legal Compliance + Quality Gates into a single visual deliverable with actionable innovation proposals._
