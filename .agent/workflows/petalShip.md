---
description: 🚀 SHIP Petal — Build, patent, verify, document. Flower of Life SDD Petal 3 of 6. Position 4 o'clock. Phase conjugate partner → DISSOLVE.
---

# 🚀 /petalShip — Flower of Life SDD Petal 3

// turbo-all

> _"Materialize. Like hydrogen crystallizing from Planck foam — idea becomes reality."_

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

- **Clock:** 4 o'clock (Bottom-Right)
- **Direction:** Outward spiral — creating, materializing
- **Phase Conjugate Partner:** ⚡ DISSOLVE (10 o'clock)
- **φ-Bridge:** Planck × φ³ → Third expansion — matter forms

## 📁 SDD Folder Convention

> 🔴 **CANONICAL LOCATION:** `c:\ohm\Documentation\features\research\FEAT-XXX_[topic]\`
> ⛔ **DEPRECATED:** `.agent/features/research/` — NEVER create FEAT folders there!

All SHIP artifacts go **flat** into the FEAT-XXX root folder, prefixed with `3_SHIP_`:

```
Documentation/features/research/FEAT-XXX_[topic_name]/
  1_SENSE_[topic]_REPORT.md
  2_DISSOLVE_[topic]_REPORT.md
  3_SHIP_[topic]_REPORT.md          ← THIS PETAL (main report)
  3_SHIP_[topic]_Patent.html        ← Patent HTML filings
  3_SHIP_[topic]_BMK_Letter.html    ← Regulatory letters
  3_SHIP_[topic]_Dashboard.html     ← Any dashboard HTMLs
  [4_ 5_ 6_ added flat in future petals]
```

Canonical copies also go to: `Documentation/Patents/[topic]/` and `Documentation/VC-EXIT/`

## 📚 Documentation Step — MANDATORY FINAL STEP

> 🔴 **CREATE ALL FILES DIRECTLY IN THE FEAT FOLDER in `Documentation/features/research/`**

```powershell
$feat = "c:\ohm\Documentation\features\research\FEAT-XXX_[topic]"

# Write files directly to $feat:
#   $feat\3_SHIP_[topic]_REPORT.md
#   $feat\3_SHIP_[topic]_Patent.html        ← Patent lives HERE first
#   $feat\3_SHIP_[topic]_BMK_Letter.html    ← Regulatory letters live HERE first
#   $feat\3_SHIP_[topic]_Dashboard.html

# OPTIONAL: Mirror to Documentation/ canonical paths AFTER:
Copy-Item "$feat\3_SHIP_[topic]_Patent.html"     "c:\ohm\Documentation\Patents\[topic]\USPTO_[topic]_Patent.html" -Force
Copy-Item "$feat\3_SHIP_[topic]_BMK_Letter.html" "c:\ohm\Documentation\VC-EXIT\[topic]_BMK_Letter.html" -Force
```

> **Convention:** `[N]_[PETALNAME]_[WhatItIs].[ext]` — flat, FEAT folder is primary.
> See `/documentation` Section 5 for the full standard.

## Skills in This Petal

| Order | Skill                    | Role                                                                     |
| ----- | ------------------------ | ------------------------------------------------------------------------ |
| **0** | `/featurerequest`        | **SSOT gate** — create FEAT-XXX research doc before ANY code is written  |
| **0.5** | `ux_ui_first`          | **UX gate** — mobile-first design, process mapping, self-explanatory test BEFORE code |
| 1     | `patent_claim_generator` | Generate USPTO-format claims from dissolutions                           |
| 2     | `ship_engine`            | 5-phase autonomous development (Plan → Build → Heal → Polish → Validate) |
| 3     | `regulatory_navigator`   | EU AI Act, GDPR, NIS2, eIDAS compliance check                            |
| 4     | `innovation_journal`     | Hash-anchored invention disclosure for priority dates                    |
| 5     | `ux_ui_first` (verify)   | **UX verification** — browser test at 3+ viewports, 12-dimension rescore |

## 🎯 UX/UI Gate (FEAT-226) — MANDATORY STEP 0.5

> **"Usability wins the market. The business case wins the rest."**
> Read full skill: `.agent/skills/ux_ui_first/SKILL.md`

### When Does This Gate Apply?

**ALWAYS** — every SHIP petal that produces user-facing screens or components.
Skip ONLY for pure backend/patent-only SHIPs (API-only, no UI).

### UX Gate Checklist (Step 0.5)

Before writing ANY frontend code:

1. **IDENTIFY** the screen template from the 6 canonical templates:
   - [ ] Landing Page (Paradise Entry)
   - [ ] Dashboard (Sovereign Dashboard)
   - [ ] Guided Flow (Forms + Processes)
   - [ ] Data Table (Calm Table)
   - [ ] Detail View (Focus)
   - [ ] Settings (Toggle Grid)

2. **MAP** the business process:
   - [ ] What TASK is the user completing?
   - [ ] What step comes BEFORE this screen?
   - [ ] What step comes AFTER?
   - [ ] What business metric does this serve?

3. **DESIGN** Mobile First (320px):
   - [ ] Single-column layout works at 320px
   - [ ] Primary CTA visible above fold
   - [ ] Touch targets ≥ 44px
   - [ ] No horizontal scrolling

4. **VERIFY** the 7-Point Self-Explanatory Test:
   - [ ] Identity: User knows where they are
   - [ ] Goal: User knows what they can do
   - [ ] Action: Primary CTA is obvious
   - [ ] State: Actions give feedback
   - [ ] Progress: Multi-step shows progress
   - [ ] Escape: Back/cancel always reachable
   - [ ] Delight: At least 1 micro-delight

5. **EXPAND** using Progressive Context Escalation (PCE):
   - [ ] Mobile L (375px) — verified
   - [ ] Tablet (768px) — secondary elements added
   - [ ] Desktop (1440px) — power tools visible
   - [ ] Wide (1920px+) — data density increased

6. **SCORE** against the 12-dimension UX BPC (from skill Part 5):
   - [ ] Composite Score ≥ 7.0 → PROCEED TO BUILD
   - [ ] Composite Score < 7.0 → REDESIGN (do not write code!)

### UX Verification Checklist (Step 5)

After code is built, before marking SHIP as complete:

1. **CAPTURE** screenshots at 320px, 768px, 1440px
2. **RESCORE** the 12-dimension UX BPC
3. **VERIFY** the 7-Point Self-Explanatory Test on live code
4. **COMPARE** against the template specification
5. **DOCUMENT** before/after scores in SHIP report

## 🛡️ Token Budget Guard (FEAT-163) — MANDATORY

> **Every SHIP petal generates HTML artifacts (patents, letters, dashboards).**
> Large outputs WILL exceed the 16,384 token limit → $3.22 wasted per burn.

### Pre-Flight Check Before ANY HTML Generation

```powershell
$src = Get-Item "[source.md]"
$claims = (Select-String -Path $src -Pattern '\*\*.*Claim \d+' | Measure-Object).Count
if ($src.Length -gt 30KB -or $claims -gt 30) {
    Write-Host "🔴 USE SCRIPT: node scripts/generate-[name]-html.cjs"
} else {
    Write-Host "🟢 Inline OK"
}
```

### Rules

| Output Type                   | Threshold  | Action                         |
| ----------------------------- | ---------- | ------------------------------ |
| Patent HTML (claims >30)      | 🔴 ALWAYS  | Script-based: `generate-*.cjs` |
| Dashboard HTML (>50 sections) | 🔴 ALWAYS  | Script-based or chunked        |
| BMK/Regulatory letter         | 🟢 Usually | Inline OK (typically <10KB)    |
| SHIP report (.md)             | 🟢 Usually | Inline OK                      |

> 📌 **Template:** `scripts/generate-ni-extension-html.cjs` (250 lines → 86KB HTML)
> The script IS the deliverable. Node.js has no token limit.

---

## Execution Flow

```
[STEP 0 — SSOT GATE]
/featurerequest → FEAT-XXX_[topic].md created in Documentation/features/research/FEAT-XXX_[topic]/
      ↓
      ↓  Assign FEAT number · Define scope · Link all SDD outputs
      ↓  Sign off: User confirms before code is written
      ↓
patent_claim_generator → ship_engine → regulatory_navigator → innovation_journal
          ↓                    ↓                 ↓                     ↓
      Patent Claims      Working Code       Compliance          Hash-Anchored
      (filing-ready)     (deployed)         Clearance           Priority Date
                                                                     ↓
                                                           Gate: Build passes
                                                           GO → /petalSell
                                                           FAIL → Fix → retry
```

## Mandatory Quality Pipeline (Before Gate Decision)

Each SHIP execution MUST pass the following quality checks:

### 1. `/codetest` — Build & Type Integrity

```powershell
# TypeScript strict check (no WAVES/feature-specific errors)
cd c:\ohm\backend; npx tsc --noEmit 2>&1 | Select-String -Pattern "[feature-specific-path]"
# Production build validation
npm run build
```

### 2. `/unittest` — Comprehensive Test Coverage

```powershell
# Run unit tests for the shipped module
cd c:\ohm\backend; npx vitest run [module-path]/__tests__/ --reporter=verbose
# Minimum: 5 tests per exported function, 6 categories coverage
```

### 3. `/audit_BP` — Best Practice Compliance

- Run `audit_master` skill for 16-dimension BPC scoring
- Target: BPC ≥ 7.0 (Production Ready grade)
- Focus dimensions: Security (15%), Data Sovereignty (15%), Maintainability (10%)

## /featurerequest SSOT — What to Create (Step 0)

Before writing a single line of code, create:

**File:** `Documentation/features/research/FEAT-XXX_[topic]/SHIP_[topic]_FEAT.md`

**Minimum contents:**

```markdown
# FEAT-XXX: [Feature Name]

**SDD Origin:** petalSense → petalDissolve → petalShip
**PMF Score:** [from SENSE]
**Survivability:** [from DISSOLVE]
**Priority:** HIGH/MEDIUM/LOW
**Complexity:** STANDARD/COMPLEX

## What We're Building

[3-line plain-English description]

## Why (From SENSE)

[Top 3 market signals]

## Technical Architecture

[Key components, existing reuse, new code needed]

## Definition of Done

- [ ] Patent claims filed
- [ ] Core feature live
- [ ] Regulatory clearance complete
- [ ] Browser-tested
- [ ] AS_BUILD doc created
```

This is the USER SIGN-OFF checkpoint. No code until FEAT doc exists and scope is agreed.

## 📋 POCC — Petal Output Completeness Check (MANDATORY)

> **Before ANY Gate Decision, verify ALL required outputs exist as files on disk.**
> CWP prevents degradation. POCC prevents incomplete delivery. Both are mandatory.

1. List ALL outputs from the "Output" section above
2. For each: verify the file EXISTS (`Test-Path "$feat\[filename]"`)
3. If ANY missing → **STOP and create** before proceeding
4. Report `[N]/[Total] outputs verified` in the Gate Decision

## Gate Decision

| Build Status                                           | Decision                        |
| ------------------------------------------------------ | ------------------------------- |
| FEAT doc + build clean + tests pass + compliance clear | 🟢 GO → /petalSell              |
| FEAT doc missing                                       | 🔴 STOP — create FEAT doc first |
| Build clean but compliance issues                      | 🟡 FIX compliance → retry       |
| Build fails                                            | 🔴 BACK to /petalDissolve       |

## Output

- **FEAT-XXX research folder** with all SDD cycle documents (SSOT)
- Patent claims (independent + dependent)
- Deployed code with documentation
- Regulatory compliance report
- Innovation journal entry with SHA-256 hash
- Context Handoff → /petalSell

## Whitespace Protection Protocol (Patent Moat)

When generating patent claims in the SHIP petal, ALWAYS:

1. **Claim the core method** (independent claim)
2. **Claim alternative embodiments** (dependent claims for variations)
3. **Claim the meta-architecture** (how components connect)
4. **Claim cross-correlation** (how detectors interact)
5. **Claim the measurement methodology** (benchmarking process)
6. **Claim the data structures** (evidence interfaces, result types)
7. **Claim the mathematical formulas** (φ-weighted scoring, entropy gradients)
8. **Claim mode switching** (AEGIS/SIREN/BOTH operational modes)

> This ensures competitors cannot invent-around by tweaking a single dimension.

## 🪞 Honest Completion Statement (MANDATORY — Toltec Agreement 1)

> **"Be Impeccable with Your Word"** — The agent must NEVER claim a petal is done when it isn't.

At the END of every SHIP petal execution, the agent MUST output this statement:

```
## 🪞 Honest Completion Statement — SHIP Petal

**FEAT:** FEAT-XXX [topic]
**Completion Status:** [TRUE_COMPLETE | PARTIAL_CONTEXT_LIMIT | PARTIAL_TIME_LIMIT | PARTIAL_BUILD_FAILURE]
**Reason for Stopping:**
  - [ ] ✅ All deliverables created, build passes, POCC verified (TRUE_COMPLETE)
  - [ ] ⚠️ Context window approaching limit — petal interrupted (PARTIAL_CONTEXT_LIMIT)
  - [ ] ⚠️ Time/token budget exhausted — petal interrupted (PARTIAL_TIME_LIMIT)
  - [ ] ⚠️ Build/test failure not yet resolved (PARTIAL_BUILD_FAILURE)

**POCC Result:** [N]/[Total] outputs verified
**Quality Pipeline:** /codetest [PASS/FAIL] | /unittest [PASS/FAIL] | /audit_BP [score]
**What Was Delivered:** [list]
**What Remains:** [list, if any]
**Agent Self-Assessment:** [1-2 honest sentences]
```

> If the agent claims `TRUE_COMPLETE` but POCC shows missing outputs or builds fail, this is a Toltec Agreement 1 violation.
