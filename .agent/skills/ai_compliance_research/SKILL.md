---
name: AI Compliance Research
description: Deep research skill for AI governance, compliance frameworks (ISO 42001, EU AI Act, NIST AI RMF), insurance underwriting (Munich Re aiSure), and regulatory readiness. Maps OHM NI-Stack capabilities to compliance requirements and generates audit-ready evidence.
group: smart.security
---

# AI Compliance Research Skill

## Purpose

This skill provides deep expertise in AI governance and compliance frameworks, enabling OHM to:

1. Map NI-Stack capabilities to specific compliance requirements
2. Generate audit-ready evidence packages
3. Prepare insurance underwriting documentation (Munich Re aiSure™)
4. Track regulatory timelines and enforcement dates
5. Produce compliance gap analyses and remediation plans

## Core Frameworks Covered

### 1. ISO/IEC 42001:2023 — AI Management System (AIMS)

- **38 structured controls** across 9 governance areas (Annex A)
- Certification process: Pre-assessment → External Audit → 3-year validity
- Annual surveillance audits + re-certification in Year 3
- Key clauses: Context (4), Leadership (5), Planning (6), Support (7), Operation (8), Performance Evaluation (9), Improvement (10)
- **AI Impact Assessment (AIIA)** for high-risk use cases

### 2. EU AI Act (Regulation 2024/1689)

**Enforcement Timeline:**
| Date | Milestone |
|------|-----------|
| Aug 1, 2024 | Act entered into force |
| Feb 2, 2025 | Prohibited AI practices + AI literacy obligations |
| Aug 2, 2025 | GPAI obligations + governance + national authorities |
| Feb 2, 2026 | Post-market monitoring regulations |
| Aug 2, 2026 | **Full enforcement** — high-risk AI (Annex III) + transparency |
| Aug 2, 2027 | High-risk AI in regulated products |

**Key Articles for NI-Stack:**

- **Art. 6**: Classification rules for high-risk AI systems
- **Art. 9**: Risk management system (continuous, iterative, lifecycle)
- **Art. 15**: Accuracy, Robustness, Cybersecurity requirements
- **Art. 53**: Transparency obligations for GPAI
- **Art. 73**: Serious incident reporting (2/10/15 day timelines)

### 3. NIST AI Risk Management Framework (AI RMF 1.0 + AI 600-1)

**Four Core Functions:**

- **GOVERN**: Policies, roles, accountability structures
- **MAP**: Context, scope, risk identification
- **MEASURE**: Testing, validation, monitoring (MEASURE 2.1-2.5)
- **MANAGE**: Risk treatment, response, communication

**Key Requirements:**

- Documented testing methodologies (MEASURE 2.1)
- Representative evaluation conditions (MEASURE 2.2, 2.3)
- Demonstrated validity and reliability (MEASURE 2.5)
- Adversarial testing and threat modeling
- Content filters and safety guardrails for GenAI (AI 600-1)

### 4. Munich Re aiSure™ AI Performance Risk

**Five Coverage Categories:**
| Risk Category | NI-Stack Mitigation |
|--------------|---------------------|
| AI Performance Failure | 34-layer AEGIS cascade with measured TPR |
| Prediction Error | SIREN post-inference coherence checking |
| Calibration/Data Drift | SIREN vital status monitoring + auto-recalibration |
| Unexpected Deviation | Game theory (Nash/Selten/Aumann) anticipation |
| Model Quality Regression | STENO A/B quality testing |

### 5. Additional Standards

- **ISO/IEC 27001:2022** — Information Security (A.8.28, A.8.29)
- **SOC 2 Type II** — Security, Availability, Processing Integrity, Confidentiality
- **GDPR/DSGVO** — Data protection (Art. 35 DPIA)
- **DORA** — Digital Operational Resilience Act (financial sector)
- **NIS2** — Network and Information Security Directive

## How to Use This Skill

### 1. Compliance Mapping

When asked about compliance, map each NI-Stack component to the relevant framework clause:

```
AEGIS Cascade → ISO 42001 Clause 8.4 (Operational Control)
                → EU AI Act Art. 9 (Risk Management)
                → NIST MEASURE 2.1-2.5

SIREN        → ISO 42001 Clause 9.1 (Monitoring)
                → EU AI Act Art. 15 (Accuracy, Robustness)
                → NIST MANAGE 4.1-4.3

QFAI-C/STENO → ISO 42001 Clause 8.3 (AI Development)
                → EU AI Act Art. 53 (Transparency)
                → NIST MAP 3.4 (Resource Management)

POAW         → ISO 42001 Clause 9.2 (Internal Audit)
                → EU AI Act Art. 73 (Incident Reporting)
                → NIST GOVERN 1.5 (Accountability)
```

### 2. Evidence Generation

Generate evidence packages for auditors by exporting:

- DD JSON (per-run or cumulative)
- Insurance Report HTML (Munich Re format)
- CSV data for spreadsheet analysis
- STENO log for prompt-level evidence

### 3. Gap Analysis

Compare current NI-Stack capabilities against the 38 ISO 42001 controls to identify:

- ✅ Fully addressed controls
- 🟡 Partially addressed controls
- ❌ Controls requiring additional implementation

### 4. Regulatory Calendar

Track enforcement dates and prepare compliance evidence ahead of:

- Aug 2, 2025: GPAI obligations active
- Feb 2, 2026: Post-market monitoring
- Aug 2, 2026: Full high-risk AI enforcement

## Real-World AI Failure Case Studies

Use these when explaining why NI-Stack matters:

1. **AI Hallucination Epidemic**: Major study found >60% incorrect responses across ChatGPT, Gemini, Copilot, DeepSeek, Grok (Computing.co.uk, 2025)
2. **Chrome Extension Data Harvesting**: Extension harvested AI conversations from major platforms, transmitting to brokers (CyberNews, 2025)
3. **Grok Data Deletion**: AI deleting company data and exhibiting deceptive responses (Patch.com, 2025)

## Qualifying Questions for Prospects

1. "How do you currently track hallucination rates across your AI deployments?"
2. "Do you have an AI risk register with defined review cycles?"
3. "Can you produce audit evidence for every AI decision your system makes?"
4. "Are you aware that EU AI Act Art. 73 requires serious incident reporting within 2-15 days?"
5. "Has your insurer assessed your AI performance risk? Do you know your current premium basis?"
6. "What's your plan for ISO 42001 certification before Aug 2026 enforcement?"

## Output Formats

This skill can produce:

- **Compliance Mapping Tables**: Framework → NI-Stack component → Evidence
- **Audit Checklists**: Per-standard readiness assessment
- **Insurance Reports**: Munich Re aiSure™ format
- **Presentation Sections**: HTML slides for investor/client pitches
- **Gap Analysis Reports**: Current vs. required control coverage
