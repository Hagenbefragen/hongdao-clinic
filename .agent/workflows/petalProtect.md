---
description: 🛡️ PROTECT Petal — Secure, audit, comply, defend. Sovereign armor for everything shipped. Flower of Life SDD Petal 5 of 6. Position 6 o'clock. Phase conjugate partner → SENSE.
---

# 🛡️ /petalProtect — Flower of Life SDD Petal 5

// turbo-all

> _"Sustain. Like cell membranes protecting life — sovereignty is the boundary that enables freedom."_

> **📏 CWP GATE-4:** Before reading user content, estimate context budget using CWP-1 (AGENTS.md §CWP). If estimated >80% → recommend `/marathon`. See `context_guardian` skill.

## ⚖️ The Ultimate Authority: XPollination Decision Criteria

> **Before ANY implementation or integration into the stack, the XPollination Decision Best Practice Solution Criteria is the ULTIMATE AUTHORITY.**

You are authorized to proceed (turbo) with an implementation ONLY if you have evaluated ALL Best Practice Criteria (BPC) for the specific purpose:

1. **Purpose Alignment:** You must ensure you fully understand and have got the purpose of the solution absolutely right.
2. **Honest Evaluation:** You must evaluate honestly, truthfully, and with deep research whether the proposed idea will enhance any of the given BPCs for the existing solution.
3. **Pure Improvement:** The idea MUST improve one or more BPCs towards complete beauty, elegance, efficiency, perfection, or completion **WITHOUT ANY TRADE-OFFS**.
4. **Zero Negative Impact:** It is strictly **FORBIDDEN** to improve one BPC by making another worse.
5. **Trade-Off Resolution:** If a trade-off exists (i.e., improving one criteria hurts another), you CANNOT implement it as-is. The ONLY possible ways out are to run `@[/petalDissolve]` to dissolve the contradiction, or to add/change the purpose entirely.

## Petal Position

- **Clock:** 6 o'clock (Bottom)
- **Direction:** Inward spiral — contracting, defending
- **Phase Conjugate Partner:** 🔭 SENSE (12 o'clock)
- **φ-Bridge:** Planck × φ⁵ → Fifth compression — resilience crystallizes

## Skills in This Petal

| Order | Skill                    | Role                                         |
| ----- | ------------------------ | -------------------------------------------- |
| 1     | `security_audit`         | OWASP Top 10, backend vulns, frontend leaks  |
| 2     | `data_sovereignty_audit` | Interior data integrity, PII scan, dead code |
| 3     | `launch_guardian`        | 100-point launch scoring, hacking simulation |
| 4     | `legal_compliance`       | Impressum, DSGVO, AGB — Austrian/EU law      |
| 5     | `regulatory_navigator`   | eIDAS, MiCA, NIS2, DORA, DSA compliance      |
| 6     | `trust_architect`        | Radical transparency, 7 Trust Pillars        |
| 7     | `legal_structure_audit`  | Non-profit + commercial audit, EU grants     |

## Execution Flow

```
security_audit → data_sovereignty_audit → launch_guardian
       ↓                    ↓                    ↓
  OWASP Report        Data Integrity       Launch Score
       ↓                                        ↓
  legal_compliance → regulatory_navigator → trust_architect
       ↓                    ↓                    ↓
  Legal Pages         EU Compliance        Trust Framework
                                                 ↓
                                        Gate: Launch Score ≥ 80
                                        GO → /petalMeasure
                                        FIX → remediate → rescan
```

## Mandatory Quality Checks (Before Gate)

### Pre-Protect Checklist

Before running PROTECT skills, verify:

- [ ] `/codetest` build passes (from SHIP petal)
- [ ] `/unittest` all tests green (from SHIP petal)
- [ ] No critical vulnerabilities in `npm audit`

### Security Deep Scan

```powershell
# 1. npm audit for critical vulnerabilities
cd c:\ohm\backend; npm audit --audit-level=critical

# 2. Secret scanning (no hardcoded keys)
Select-String -Path "src/**/*.ts" -Pattern "(password|secret|apikey)\s*=" -Recurse

# 3. Auth guard verification
Select-String -Path "src/**/*.controller.ts" -Pattern "@UseGuards" -Recurse | Measure-Object
```

### Patent Protection Verification

When PROTECT follows SHIP with patent claims:

- [ ] All claims have matching specification descriptions
- [ ] Whitespace claims block invent-around vectors
- [ ] Innovation journal entry exists with SHA-256 hash
- [ ] Prior art landscape is documented

## 📋 POCC — Petal Output Completeness Check (MANDATORY)

> **Before ANY Gate Decision, verify ALL required outputs exist as files on disk.**
> CWP prevents degradation. POCC prevents incomplete delivery. Both are mandatory.

1. List ALL outputs from the "Output" section below
2. For each: verify the file EXISTS (`Test-Path "$feat\[filename]"`)
3. If ANY missing → **STOP and create** before proceeding
4. Report `[N]/[Total] outputs verified` in the Gate Decision

## Gate Decision

| Launch Score           | Decision                           |
| ---------------------- | ---------------------------------- |
| ≥90 + zero P0 findings | 🟢 GO → /petalMeasure              |
| 80-89                  | 🟡 FIX P0/P1 issues → rescan       |
| <80                    | 🔴 HOLD — do not ship until secure |

## 📁 SDD Folder Convention

> 🔴 **CANONICAL LOCATION:** `c:\ohm\Documentation\features\research\FEAT-XXX_[topic]\`
> ⛔ **DEPRECATED:** `.agent/features/research/` — NEVER create FEAT folders there!

All PROTECT artifacts go **flat** into the FEAT-XXX root folder, prefixed with `5_PROTECT_`:

```
Documentation/features/research/FEAT-XXX_[topic_name]/
  1_ ... 4_SELL_[topic]_GTM.html    ← already complete
  5_PROTECT_[topic]_REPORT.md       ← THIS PETAL (security + compliance)
  5_PROTECT_[topic]_SecurityAudit.html
  5_PROTECT_[topic]_LegalPages.html
  [6_MEASURE_ added in final petal]
```

## Output

- `5_PROTECT_[topic]_REPORT.md` — security + compliance full report
- Security audit HTML (OWASP Top 10)
- Data sovereignty score (10 dimensions)
- Launch readiness score (100-point)
- Legal pages (Impressum, DSGVO, AGB)
- Regulatory compliance matrix
- Context Handoff → /petalMeasure

## 📚 Documentation Step — MANDATORY FINAL STEP

> 🔴 **CREATE ALL FILES DIRECTLY IN THE FEAT FOLDER in `Documentation/features/research/`**

All PROTECT artifacts are written directly to the FEAT-XXX folder with `5_PROTECT_` prefix:

```powershell
$feat = "c:\ohm\Documentation\features\research\FEAT-XXX_[topic]"

# Write files directly to $feat:
#   $feat\5_PROTECT_[topic]_REPORT.md
#   $feat\5_PROTECT_[topic]_SecurityAudit.html
#   $feat\5_PROTECT_[topic]_AGB.html
#   $feat\5_PROTECT_[topic]_DPA_AVV.html

# OPTIONAL: Mirror to Documentation/ for public canonical path AFTER:
Copy-Item "$feat\5_PROTECT_[topic]_AGB.html"     "c:\ohm\Documentation\Legal\[topic]_AGB.html" -Force
Copy-Item "$feat\5_PROTECT_[topic]_DPA_AVV.html" "c:\ohm\Documentation\Legal\[topic]_DPA.html" -Force
```

> **Convention:** `[N]_[PETALNAME]_[WhatItIs].[ext]` — flat, no subfolders, FEAT folder is primary.
> See `/documentation` Section 5 for the full standard.

## IP Fortress Integration

When PROTECT runs after a patent-heavy SHIP petal:

1. **Verify claim coverage** — every implemented feature has a matching claim
2. **Run adversarial patent counsel** — stress-test claims from opponent's perspective
3. **Check whitespace claims** — ensure invent-around vectors are blocked
4. **Validate enablement** — §112(a) compliance for all specifications
5. **Cross-reference prior art** — ensure no undisclosed blocking references

## 🪞 Honest Completion Statement (MANDATORY — Toltec Agreement 1)

> **"Be Impeccable with Your Word"** — The agent must NEVER claim a petal is done when it isn't.

At the END of every PROTECT petal execution, the agent MUST output this statement:

```
## 🪞 Honest Completion Statement — PROTECT Petal

**FEAT:** FEAT-XXX [topic]
**Completion Status:** [TRUE_COMPLETE | PARTIAL_CONTEXT_LIMIT | PARTIAL_TIME_LIMIT | PARTIAL_SECURITY_FINDING]
**Reason for Stopping:**
  - [ ] ✅ All audits complete, POCC verified, launch score ≥80 (TRUE_COMPLETE)
  - [ ] ⚠️ Context window approaching limit — petal interrupted (PARTIAL_CONTEXT_LIMIT)
  - [ ] ⚠️ Time/token budget exhausted — petal interrupted (PARTIAL_TIME_LIMIT)
  - [ ] ⚠️ Unresolved P0/P1 security findings — remediation pending (PARTIAL_SECURITY_FINDING)

**POCC Result:** [N]/[Total] outputs verified
**Launch Score:** [X]/100
**What Was Delivered:** [list]
**What Remains:** [list, if any]
**Agent Self-Assessment:** [1-2 honest sentences]
```

> If the agent claims `TRUE_COMPLETE` but POCC shows missing outputs or launch score <80, this is a Toltec Agreement 1 violation.
