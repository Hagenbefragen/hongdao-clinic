---
description: Unified Best Practice Audit (Combines Holistic & Grok into one modular workflow)
---

# /audit_BP - Unified Best Practice Audit

> **🧠 SKILL REQUIRED:** Before executing this workflow, read the **Audit Master** skill at `.agent/skills/audit_master/SKILL.md` for the 17-dimension BPC scoring framework, weighted metrics, and evaluation methodology.

## 1. 🎯 Overview

**Name**: Unified Best Practice Audit  
**Version**: 3.0 (Quantum-Ready 2026)  
**Last Updated**: 2026-02-05  
**Description**: The single source of truth for Ecosystem Audits. Combines architectural review, automated scanning, Post-Quantum Cryptography (PQC) readiness, AI/SBOM supply chain security, accessibility compliance, and carbon footprint analysis. Aligned with NIST FIPS 203/204/205, OWASP 2025, WCAG 2.2, and Green Software Foundation standards.

---

## 2. ⚙️ Inputs & Configuration

| Parameter         | Type        | Description                                                                       |
| ----------------- | ----------- | --------------------------------------------------------------------------------- |
| **Audit Profile** | `[enum]`    | `Standard`, `Sovereign_Deep` (Browser 4-in-1), `Launch_Ready`, `Legal_Compliance` |
| **Select Skills** | `[array]`   | Manually select Agent Skills to run (see list below). Default: based on Profile.  |
| **Target**        | `[string]`  | Path to file/folder or "Entire Ecosystem"                                         |
| **Deep Scan**     | `[boolean]` | Run time-consuming tools (Slither, OWASP ZAP, Carbon Profiler)                    |
| **Publish**       | `[boolean]` | Update Admin Dashboard with results                                               |

---

## 3. 🧠 Integrated Agent Skills (The 'Brain' Layer)

Instead of just running static analysis, this workflow orchestrates specialized AI auditing agents.

| Skill Name                        | Path                     | Profile   | Description                                                                       |
| :-------------------------------- | :----------------------- | :-------- | :-------------------------------------------------------------------------------- |
| **Audit Master**                  | `audit_master`           | ALL       | The conductor. Evaluates 17-dim BPC scores.                                       |
| **Security Audit (Strike First)** | `security_audit`         | Sovereign | Offensive pentesting, backdoor checks, hardcoded secrets.                         |
| **Data Sovereignty Audit**        | `data_sovereignty_audit` | Sovereign | **(Browser Audit Core)** PII scanning, encryption verification, data leak checks. |
| **Test Engineer**                 | `test_engineer`          | Sovereign | **(Browser Audit Core)** 6-category test generation & coverage analysis.          |
| **Launch Guardian**               | `launch_guardian`        | Launch    | Production readiness, security headers, rollback checks.                          |
| **App Production Validator**      | `app_production`         | Launch    | Mobile/Desktop cross-platform validation.                                         |
| **XOM Integrity Checker**         | `xom_integrity`          | Economy   | Financial logic audit, fees, rounding errors.                                     |
| **Legal Structure Audit**         | `legal_structure_audit`  | Legal     | Compliance with terms, privacy, funding requirements.                             |

---

## 4. 🚀 Execution Stages

### Stage 1: Scope & Skill Resolution

- [ ] **Select Profile**:
  - `Sovereign_Deep` (Browser 4-in-1): **Audit Master + Security + Data Sov + Test Engineer**
  - `Launch_Ready`: Launch Guardian + App Validator + Security
  - `Legal`: Legal Structure + Data Sov
- [ ] **Load Context**: Read KB `ohm_fault_registry` for known issues.

### Stage 2: Architecture & Domain Audit (Static)

- [ ] **Monorepo Check**: Verify `frontend` / `backend` / `website` separation
- [ ] **Plugin Compliance**: Ensure `appRegistry` usage in `MainLayout.tsx`
- [ ] **File Size**: Flag files > 500 lines as "God Components"

---

### Stage 3: Security Deep Scan (Agentic + Static)

#### 3.1 🤖 Trigger Skill: `Security Audit (Strike First)`

_Target: Backend / Sensitive Logic_

- [ ] **Backdoor Detection**: Scan for `admin@`, `userId=1`, `clearanceLevel` bypasses.
- [ ] **Secret Scanning**: Detect hardcoded keys (`electron-store`), API keys in config.
- [ ] **Privilege Escalation**: Verify auth guards on critical routes.

#### 3.2 🔐 Post-Quantum Cryptography (PQC) Check

- [ ] **Inventory**: Catalog RSA/ECC usage.
- [ ] **ML-KEM Check**: Verify hybrid key exchange patches.
- [ ] **Quantum Shield UI**: Ensure encryption status is visible.

---

### Stage 4: Data Sovereignty & Privacy (Agentic)

#### 4.1 🤖 Trigger Skill: `Data Sovereignty Audit`

_Target: Database / Storage / Logs_

- [ ] **Interior Integrity**: Scan DB for plaintext PII.
- [ ] **Encryption Reality**: Verify "End-to-End" claims (verify 0 server-side leakage).
- [ ] **Third-Party Leaks**: Check analytics, CDNs, error loggers.
- [ ] **Wiring Verification**: Ensure `quantumSafeHash` is used over standard sha256.

---

### Stage 5: Supply Chain & Economy (Agentic)

#### 5.1 🤖 Trigger Skill: `XOM Integrity Checker` (If Economy Scope)

- [ ] **Flow Audit**: Verify Invite -> Reward -> Wallet flow.
- [ ] **Precision Check**: Scan for floating point math errors (use integer math).

#### 5.2 SBOM & AI-BOM

- [ ] **SBOM**: Generate `npm sbom`.
- [ ] **AI-BOM**: Inventory active models (Ollama/OpenAI) and vector stores.

---

### Stage 6: Reliability & Testing (Agentic)

#### 6.1 🤖 Trigger Skill: `Test Engineer`

_Target: Core Logic / New Features_

- [ ] **Coverage Gap Analysis**: Identify critical paths with 0 tests.
- [ ] **Test Generation**: Generate Boundary, Happy Path, and Mathematical checks.
- [ ] **Unit Test Run**: Execute `vitest` / `jest` and report pass/fail.

#### 6.2 🤖 Trigger Skill: `App Production Validator` (If Launch Scope)

- [ ] **Cross-Platform**: Check PWA/TWA/Desktop manifest integrity.
- [ ] **Asset Check**: Verify icons, splash screens, offline fallback.

---

### Stage 7: Planetary & Legal (Agentic)

#### 7.1 Sustainability (GreenOps)

- [ ] **SCI Spec**: Calculate Carbon Intensity (Bundle size, Network load).
- [ ] **Tracker Block**: Verify `shield-handler.js` blocks standard trackers.

#### 7.2 🤖 Trigger Skill: `Legal Structure Audit` (If Legal Scope)

- [ ] **Compliance**: Check Impressum, Privacy Policy, Terms integration.
- [ ] **Consent**: Verify no "Cookie Consent" needed (Native/Local app).

---

### Stage 8: Accessibility & Presentation

- [ ] **WCAG 2.2 AA**: axe-core scan.
- [ ] **Visual Regression**: Baseline comparison.
- [ ] **Presentation Test**: Verify UI rendering on Mobile/Desktop.

---

### Stage 9: Scoring & Synthesis (The Audit Master)

#### 9.1 🤖 Trigger Skill: `Audit Master`

_Action: Synthesize all agent outputs into final BPC Score_

Calculate 0-10 per BPC dimension:

| Dimension        | Weight | Score Formula                                   |
| :--------------- | :----- | :---------------------------------------------- |
| Security         | 15%    | (100 - critical_vulns \* 20) / 10               |
| Data Sovereignty | 15%    | (encryption_verified && no_pii_leaks) ? 10 : <5 |
| AI Governance    | 10%    | (byok_enabled && local_fallback) ? 10 : <5      |
| Testing          | 10%    | (coverage > 80%) ? 10 : coverage/10             |
| ...others...     | ...    | ...                                             |

#### 9.2 Architectural Transparency Mapping (MANDATORY)

- **Agent Topology**: List all active agents involved in the scope.
- **Knowledge Domains**: Define the operational expertise area for every agent.
- **Roles**: Assign strict roles (e.g., Blocker, Flagger, Orchestrator).
- **Visualization**: Generate a Mermaid sequence or component diagram showing the exact flow.

#### 9.3 Overall Score & Grading

- **Sovereign Grade (9-10)**
- **Production Ready (7-8.9)**
- **Needs Attention (5-6.9)**
- **Critical Issues (<5)**

---

### Stage 10: Reporting & Publication

- [ ] **Generate Report**: `Documentation/Audits/AUDIT_REPORT_[SCOPE]_[DATE].md`
- [ ] **Dashboard Update**: Update `HolisticAuditPage.tsx`.
- [ ] **Archive**: Store raw skill outputs in artifacts.

---

## 5. 📋 BPC Reference (The 17 Dimensions - 2026 Edition)

| #   | Dimension                     | Key Checks                                 |
| --- | ----------------------------- | ------------------------------------------ |
| 1   | **Planetary Sustainability**  | Carbon footprint, green coding, SCI score  |
| 2   | **Development Manufacturing** | Clean CI/CD, reproducible builds           |
| 3   | **Health Compatibility**      | Reduced screen time, wellness features     |
| 4   | **Social Justice**            | Fair algorithmic treatment, bias checks    |
| 5   | **Maintainability**           | Type safety, test coverage, docs           |
| 6   | **Repairability**             | Error recovery, graceful degradation       |
| 7   | **Modularity**                | Plugin architecture, clean separation      |
| 8   | **Ease of Use**               | UX quality, onboarding, help system        |
| 9   | **Security**                  | OWASP compliance, backdoor detection       |
| 10  | **Performance**               | Core Web Vitals, bundle optimization       |
| 11  | **Compliance**                | GDPR, CCPA, EU CRA, SOC2                   |
| 12  | **Openness**                  | Open source, API documentation             |
| 13  | **AI Ethics**                 | Bias detection, model transparency, AI-BOM |
| 14  | **Data Sovereignty**          | E2E encryption, user data ownership        |
| 15  | 🆕 **Quantum Readiness**      | PQC compliance, HNDL protection            |
| 16  | 🆕 **Accessibility**          | WCAG 2.2 AA, inclusive design              |
| 17  | 🆕 **CWP Compliance**         | Context Window Protocol adherence (FEAT-278). Score <7 = FAIL (CWP-GATE-1) |

---

## 6. 🔄 Version History

| Version | Date       | Changes                                                                         |
| ------- | ---------- | ------------------------------------------------------------------------------- |
| 3.1     | 2026-03-22 | Added CWP Compliance as dimension 17 (FEAT-278 CWP-GATE-1)                      |
| 3.0     | 2026-02-05 | Added PQC/Quantum audit, SBOM/AI-BOM, WCAG 2.2, SCI metrics, Presentation tests |
| 2.0     | 2025-01-15 | Unified Holistic + Grok workflows                                               |
| 1.0     | 2024-06-01 | Initial 14-dimension framework                                                  |

---

_Audit workflow aligned with NIST, OWASP 2025, Green Software Foundation, and W3C WCAG 2.2 standards._
