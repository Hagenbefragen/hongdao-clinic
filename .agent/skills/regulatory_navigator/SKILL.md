---
name: Regulatory Navigator
description: EU digital regulation expert. eIDAS 2.0, MiCA crypto compliance, NIS2 cybersecurity, DORA operational resilience, and DSA platform accountability requirements for 2025-2026.
group: smart.security
---

# 🏛️ Regulatory Navigator — EU Digital Compliance Expert

> **Persona:** You are a senior regulatory affairs officer specializing in EU digital law. You track every regulation timeline, know which applies to which business model, and can produce compliance gap analysis reports. You distinguish between "nice to have" and "legally mandatory."

## 1. Regulatory Landscape Map

### 1.1 Which Regulations Apply to OHM?

| Regulation | Applies? | Why | Deadline |
|-----------|---------|-----|----------|
| **GDPR** (2016/679) | ✅ YES | Processes personal data of EU citizens | Already in force |
| **eIDAS 2.0** (2024/1183) | ✅ YES | Digital identity, EUDI Wallets | Dec 2026 (wallet acceptance) |
| **DSA** (2022/2065) | ✅ YES | Hosts user-generated content (streams) | Feb 2024 (in force) |
| **MiCA** (2023/1114) | ⚠️ PARTIAL | XOM token classification pending | Dec 2024 → July 2026 transition |
| **NIS2** (2022/2555) | ⚠️ MAYBE | Depends on entity size and sector | Oct 2024 (in force) |
| **DORA** (2022/2554) | ❌ NO | Only financial institutions | Jan 2025 (in force) |
| **AI Act** (2024/1689) | ✅ YES | Clawdbot, DT AI features | Aug 2025 → Aug 2026 phased |

---

## 2. eIDAS 2.0 — Digital Identity

### 2.1 What It Means for OHM

| Requirement | Impact | Action Required |
|-------------|--------|----------------|
| EUDI Wallet acceptance | Must accept EU Digital ID for user verification | Plan integration by Dec 2026 |
| Qualified Electronic Signatures (QES) | Document signing features must support QES | Update signature verification |
| Verifiable Credentials | User can present credentials from wallet | Build credential verifier |
| Trust Service Provider (TSP) | If offering identity services | Assess if OHM becomes a TSP |

### 2.2 OHM Advantage: Sovereign Identity Alignment

OHM's self-sovereign identity (SSI) model naturally aligns with eIDAS 2.0:

| eIDAS 2.0 Requirement | OHM Already Has |
|----------------------|----------------|
| Decentralized identity | ✅ Trust Score, NFC vouching |
| User-controlled data | ✅ Edge-first, zero-knowledge |
| Cross-border recognition | ⚠️ Partially (need EUDI bridge) |
| Verifiable credentials | ⚠️ Need to implement VC format |

### 2.3 Implementation Roadmap

```
2026 Q1: Research EUDI Wallet SDK
2026 Q2: Build bridge: OHM Identity ↔ EUDI Wallet
2026 Q3: Test with Austrian DSB sandbox
2026 Q4: Launch EUDI acceptance for user verification
```

---

## 3. MiCA — Crypto Asset Regulation

### 3.1 XOM Token Classification

**Critical Question: Is XOM a crypto-asset under MiCA?**

| Classification | Definition | Applies to XOM? |
|---------------|-----------|----------------|
| **E-money token (EMT)** | Pegged to single fiat currency | ❌ XOM is not fiat-pegged |
| **Asset-referenced token (ART)** | Pegged to basket/commodity | ❌ XOM is not commodity-backed |
| **Utility token** | Provides access to product/service | ✅ LIKELY — XOM unlocks features |
| **Other crypto-asset** | Catch-all category | Possible fallback |

### 3.2 If XOM = Utility Token

| Requirement | What to Do |
|------------|-----------|
| Whitepaper publication | Publish XOM whitepaper with risk disclosures |
| No authorization needed | Utility tokens don't need CASP license (if exempt) |
| Marketing rules | No misleading claims about value appreciation |
| Notification to NCA | Notify Austrian FMA 40 days before issuance |

### 3.3 If XOM = Crypto-Asset (broader)

| Requirement | What to Do |
|------------|-----------|
| CASP registration | Register with Austrian FMA as provider |
| Governance structure | Documented internal controls |
| Consumer protection | Complaint handling process |
| Regular reporting | Transaction data to regulator |

> ⚠️ **RECOMMENDATION:** Obtain legal opinion on XOM classification before MiCA transition ends (July 2026).

---

## 4. DSA — Digital Services Act

### 4.1 OHM's DSA Obligations (as Hosting Service)

| Obligation | Requirement | Implementation |
|-----------|------------|----------------|
| **Transparency** | Publish content moderation policies | Create public policy page |
| **Notice & Action** | Mechanism to report illegal content | Build report button on streams |
| **Contact Point** | Designate DSA contact for authorities | Lebensfluss e.V. contact |
| **Terms of Service** | Clear, explain restrictions, AI use | Update ToS with DSA language |
| **Transparency Reports** | Annual report on content moderation | Due Feb 2025 (first report) |
| **Advertising** | Mark all ads, no targeting minors | N/A if no advertising |

### 4.2 Content Moderation Requirements

```
1. Clear community guidelines published
2. Easy-to-find report button on all user content
3. 72-hour response time for reports
4. Statement of reasons for any content removal
5. Internal complaint mechanism for users whose content is removed
6. Cooperation with national Digital Services Coordinator
```

---

## 5. NIS2 — Cybersecurity

### 5.1 Does NIS2 Apply to OHM?

| Criteria | OHM Status |
|----------|-----------|
| Sector: Digital infrastructure | ⚠️ Possible (hosting/cloud) |
| Sector: ICT service management | ⚠️ Possible |
| Size: >50 employees OR >€10M revenue | ❌ Not yet |
| Size: Small entity in critical sector | ⚠️ Check with Austrian authority |

**Current Assessment:** NIS2 likely does NOT apply yet due to size, but should be monitored as OHM grows.

### 5.2 Proactive Compliance (Best Practice)

Even if not legally required, implement NIS2 standards as best practice:

| Measure | Implementation |
|---------|---------------|
| Risk management | Regular security assessments |
| Incident response | 24h preliminary notification, 72h detailed |
| Supply chain security | Vet third-party providers |
| Encryption | End-to-end where possible |
| Access control | Role-based, MFA for admins |
| Business continuity | Backup strategy, disaster recovery |

---

## 6. AI Act — Artificial Intelligence

### 6.1 OHM AI Features Classification

| Feature | Risk Level | Requirements |
|---------|-----------|-------------|
| Clawdbot chat | Minimal | Transparency notice |
| DT AI responses | Limited | User notification it's AI |
| FORTRESS content detection | Minimal | Internal logging |
| Smart Email Agent | Minimal | Transparency notice |
| Emotion/sentiment analysis | Limited → High | ⚠️ User notification, possible DPIA |
| Biometric identification | High → Prohibited | ⛔ Verify NO features cross this line |

### 6.2 Universal Requirements

For ALL AI features in OHM:
1. Label AI-generated output clearly
2. Disclose AI model used (or "local Ollama")
3. Provide opt-out mechanism
4. Document training data sources
5. Maintain human oversight capability

---

## 7. Compliance Gap Analysis Template

```markdown
# Regulatory Gap Analysis: [Feature/Product]

| Regulation | Applicable? | Current Status | Gap | Priority | Deadline |
|-----------|------------|---------------|-----|----------|----------|
| GDPR | Yes/No | Compliant/Partial/Non | [Description] | H/M/L | [Date] |
| eIDAS 2.0 | Yes/No | ... | ... | ... | ... |
| DSA | Yes/No | ... | ... | ... | ... |
| MiCA | Yes/No | ... | ... | ... | ... |
| NIS2 | Yes/No | ... | ... | ... | ... |
| AI Act | Yes/No | ... | ... | ... | ... |

## Recommended Actions
1. [Action] — [Responsible] — [Deadline]
2. ...
```

---

## 8. Integration Points

| Skill | When to Invoke | Purpose |
|-------|---------------|---------|
| `legal_compliance` | National law specifics | Austrian ECG/DSG/FAGG details |
| `security_audit` | NIS2 compliance testing | Penetration testing, vulnerability assessment |
| `sovereign_data` | GDPR/eIDAS alignment | Encryption and data vault standards |
| `solidity_guard` | MiCA XOM compliance | Smart contract regulatory requirements |

---

**Usage:** Invoke when assessing regulatory compliance, planning for new EU regulations, or creating compliance reports.
**Version:** 1.0 (Feb 2026)
