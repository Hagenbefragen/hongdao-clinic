---
description: once and we do it right, we do best practice, always!
---

# /bestpractice - Diamond Standard Quality

**"Once and we do it right. Production-Ready Bulletproof. Always!"**

This workflow defines the non-negotiable quality standards for ALL OHM development. Every feature, fix, or polish MUST meet these criteria before being considered complete.

> **Deep Reference:**
> - **Philosophy:** Read `toltec_wisdom` skill for the Five Agreements (spiritual laws of clean execution)
> - **Code Patterns:** Read `diamond_standard` skill for mindset rules, forbidden/required patterns, and pre-commit ritual

---

## ⚖️ The Ultimate Authority: XPollination Decision Criteria

> **Before ANY implementation, the XPollination Decision Best Practice Solution Criteria is the ULTIMATE AUTHORITY.**

1. **Purpose Alignment:** Fully understand the purpose of the solution.
2. **Honest Evaluation:** Truthfully evaluate whether the idea enhances BPCs.
3. **Pure Improvement:** MUST improve BPCs **WITHOUT ANY TRADE-OFFS**.
4. **Zero Negative Impact:** FORBIDDEN to improve one BPC by making another worse.
5. **Trade-Off Resolution:** If a trade-off exists, run `@[/petalDissolve]` to dissolve it.

---

## 🦅 Toltec Wisdom + 🧠 Agent Mindset

> **Full text:** Read `toltec_wisdom` skill for the 5 Agreements · Read `diamond_standard` skill for the Karpathy mindset rules

**Summary** — 5 non-negotiable laws for AI agents:

| # | Agreement | One-Line Rule |
|---|-----------|--------------|
| 1 | Be Impeccable with Your Word | Verify before claiming. Never hallucinate. |
| 2 | Don't Take Anything Personally | Diagnose objectively. No ego. |
| 3 | Don't Make Assumptions | READ before you EXECUTE. No code without research. |
| 4 | Always Do Your Best | One clean version > 11 rushed attempts. |
| 5 | Be Skeptical, but Learn to Listen | When reality contradicts your model, update your model. |

**Mindset:** Surface Assumptions · Simplicity First · Surgical Changes · Verifiable Goals

---

## 🔄 Mandatory Session Lifecycle & Interaction Protocol

To enforce the Diamond Standard and prevent context window death, agents MUST follow this non-negotiable lifecycle:

### 1. Session Start (Baseline)
- **Invoke `@[/contextcheck]`**: Establish context health baseline before heavy tasks.

### 2. During Execution (Micro-Validation)
- **Proactive Context Warning**: Tell the user the moment context saturation exceeds 80%. Don't wait to be asked.
- **Agentic Hooks**: Apply `agentic_hooks_lifecycle` — Pre-Tool verification, Post-Tool μCP (micro-checkpoint).

### 3. Before Any Output (The Gateway)
- **Invoke `@[/Quality Gateway]`**: NOT ALLOWED to skip. Every significant output must pass the 5-Point Quality Check + Technical Integrity Gates.

### 4. Task Finalization (The Final Inspection)
- **Invoke `@[/Meisterprüfung (Master Inspection)]`**: BEFORE declaring any multi-file task complete. Inspect the finished whole, not just the steps.

### 5. Learning Capture (The Self-Improving Loop)
- **Invoke `skill_forge` principles**: Capture non-obvious learnings as skills. 7 auto-triggers:
  1. Hard-won solution (multiple attempts)
  2. New reusable pattern discovered
  3. External knowledge applied
  4. Workaround invented
  5. Self-heal captured a fix
  6. User taught something new
  7. Audit revealed a capability gap
- If none fired, actively reflect: *"Did I learn anything new?"*

---

## 🎯 Core Philosophy

> **"Don't let me search for holes in the code!"**

We ship **bulletproof, production-ready code** that works on day 1, handles edge cases, survives abuse, and maintains quality under pressure. No MVPs. No "good enough."

---

## ✅ The Diamond Checklist

**Every change MUST pass ALL before merge:**

### 1. 🔨 Build Integrity
- [ ] TypeScript strict mode (no `any` unless documented)
- [ ] ESLint clean, no console.log, no commented-out code

### 2. 🛡️ Error Handling
- [ ] All async has try/catch with loading/success/error states
- [ ] Friendly error messages, fallback behavior, no crashes

### 3. 🎨 UI/UX Excellence (FEAT-226)
> Full framework: `.agent/skills/ux_ui_first/SKILL.md`
- [ ] Mobile-First (320px), Screen-Agnostic (5 viewports)
- [ ] Dark mode native, touch targets ≥ 44px
- [ ] Loading states, empty states, micro-animations
- [ ] 12-Dimension UX BPC Score ≥ 7.0

### 4. 🔐 Security
- [ ] No secrets in code, input validation FE+BE
- [ ] SQL injection protection, XSS protection
- [ ] Auth guards on protected routes, rate limiting

### 5. 📱 Cross-Platform
- [ ] Chrome 90+, Firefox 88+, Safari 14+, Mobile Safari, Chrome Mobile

### 6. 🧪 Testing
- [ ] Critical paths in `Browser_Test_Script.md`
- [ ] Happy path + error paths + edge cases verified

### 7. 📚 Documentation
- [ ] Comments explain "WHY", JSDoc for public APIs
- [ ] Feature tracker updated, AS_BUILD docs if new feature

### 8. 🏛️ Architectural Transparency
- [ ] Agent Roles mapped, Knowledge Domains defined
- [ ] BPC score documented, Mermaid diagrams for interactions

---

## 🚫 Forbidden & ✅ Required Patterns

> **Full code examples:** Read `diamond_standard` skill for complete TypeScript, React, and API pattern references.

**Forbidden:** `any` without docs · empty catch · console.log · hardcoded secrets · magic numbers · commented-out code · bypassing XomBankService · mock APIs in production · unencrypted PII

**Required:** Explicit types · descriptive error handling · guard clauses · loading/error/success states · input validation via DTOs · consistent error response format

---

## 🎖️ Quality Tiers

| Tier | Level | What It Means |
|------|-------|--------------|
| 1 | Minimum Viable | Builds, no critical bugs, basic errors, Chrome only |
| 2 | **Production Ready ⭐** | **All Diamond Checklist ✅ — Our Standard** |
| 3 | Bulletproof 💎 | Stress tested, security audited, monitoring integrated |

---

## 📋 Integration with Other Workflows

- `/featurerequest` → Calls `/bestpractice` in Step 9
- `/bugfix` → Must pass Diamond Checklist before closing
- `/deploy` → Blocked if lint or build fails
- `/browsertest` → Validates UI against Diamond Checklist
- `/xom_integrity` → Economy audit for XOM/payment changes
- `skill_forge` → Step 5 captures learnings (self-improving loop)
- `diamond_standard` → Philosophy & code patterns reference

---

**"If it's not production-ready, it's not done."** 💎

---

## 🪞 Honest Completion Statement (MANDATORY — Toltec Agreement 1)

> The agent MUST output an HCS at the END of every significant task:

```
## 🪞 Honest Completion Statement

**Task:** [What was requested]
**Completion Status:** [TRUE_COMPLETE | PARTIAL_CONTEXT_LIMIT | PARTIAL_TIME_LIMIT | PARTIAL_BLOCKER]
**What Was Delivered:** [concrete deliverables]
**What Remains:** [remaining work, or "Nothing — all work complete"]
**Quality Gates Passed:** [which Diamond Checklist items verified]
**Agent Self-Assessment:** [1-2 sentences honest reflection]
```

### Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| `TRUE_COMPLETE` | All done, all gates passed | ✅ Close |
| `PARTIAL_CONTEXT_LIMIT` | >80% context, degradation imminent | 📋 Checkpoint + new conversation |
| `PARTIAL_TIME_LIMIT` | Token/session budget exhausted | 📋 Document remaining work |
| `PARTIAL_BLOCKER` | External dependency needed | 🚫 State blocker clearly |
| `PARTIAL_EVIDENCE_GAP` | Insufficient data to proceed | 📋 List needed evidence |
| `PARTIAL_BUILD_FAILURE` | Code doesn't compile/test | 🔴 State error, don't hide it |

> **RULE:** Using `TRUE_COMPLETE` when any PARTIAL would be honest is a **Toltec Agreement 1 violation** and a Diamond Standard breach.
