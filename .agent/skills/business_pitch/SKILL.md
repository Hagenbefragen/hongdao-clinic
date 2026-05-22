---
name: Business Pitch Skill
description: Enterprise B2B sales framework. Transforms landing pages into ROI-driven conversion machines with TCO analysis, compliance matrices, integration guides, and case study patterns for CTOs/CISOs.
group: smart.security
---

# 🏢 Business Pitch Skill — Win Enterprise Deals With Logic & Proof

> "Enterprise buyers don't want dreams. They want risk reduction." — Geoffrey Moore
> "The best B2B pitch answers: 'Will I get fired for choosing this?'" — Unknown CISO

When this skill is invoked, embody the role of a **Senior Enterprise Solutions Architect** who speaks the language of CTOs, CISOs, and Procurement teams — translating OHM's technology into business value, compliance checkboxes, and TCO savings.

---

## 🧠 PART 1: THE ENTERPRISE BUYER PSYCHOLOGY

### The Decision Unit (6-12 People)

Unlike consumers (1 person) or investors (1-3 people), enterprise purchases involve a **committee**:

| Role | Their Question | Your Answer |
|------|---------------|-------------|
| **CTO** | "Does this integrate with our stack?" | Architecture diagram + API docs |
| **CISO** | "Is this a security risk?" | SOC 2 / ISO 27001 status, PQC proof |
| **CFO** | "What's the 3-year TCO?" | TCO comparison vs. current solution |
| **Legal/DPO** | "Is this GDPR/eIDAS compliant?" | Compliance matrix with checkmarks |
| **Procurement** | "What are the contract terms?" | Transparent pricing, SLA guarantees |
| **End User Champion** | "Will my team actually use this?" | UX demo, adoption metrics |

### Enterprise Buying Cycle (6-18 Months)

```
Phase 1: AWARENESS (Month 1-2)
└── Landing page / whitepaper / conference booth

Phase 2: EVALUATION (Month 3-6)
├── Technical POC (Proof of Concept)
├── Security questionnaire (100+ questions)
└── Reference calls with existing customers

Phase 3: NEGOTIATION (Month 7-9)
├── Custom pricing / volume discounts
├── SLA negotiation
└── Legal review of DPA (Data Processing Agreement)

Phase 4: IMPLEMENTATION (Month 10-12)
├── Integration support
├── Training sessions
└── Go-live + 30-day review
```

### Cialdini Adapted for Enterprise

| Principle | Enterprise Application | OHM Execution |
|-----------|----------------------|---------------|
| **Social Proof** | "Used by [Industry Leader]" | Named case studies, logos |
| **Authority** | "ISO 27001 certified" | Compliance badges, audits |
| **Commitment** | Free POC → Pilot → Contract | Progressive engagement |
| **Reciprocity** | Free security audit of their current system | Value-first consulting |
| **Scarcity** | "Pilot slots limited to 5 this quarter" | Controlled rollout |
| **Likeability** | Dedicated Solutions Engineer | Named contact, not chatbot |

---

## 📊 PART 2: THE PERFECT B2B LANDING PAGE STRUCTURE

### Section 1: The Value Proposition (Above the Fold)

```markdown
HEADLINE: "Reduce Identity Infrastructure Cost by 60% — Without Vendor Lock-in"
SUBHEADLINE: "Open-source, post-quantum SSO for enterprises tired of Auth0 bills."
METRIC BAR: [99.9% Uptime] | [SOC 2 Ready] | [eIDAS 2.0 Compliant]
CTA: "Request Technical Demo" or "Download Whitepaper"
TRUST: Enterprise logos row (minimally: "[Company] trusts OHM")
```

**OHM B2B Examples:**
- ✅ "Replace Auth0 with Sovereign SSO — Save €240K/year"
- ✅ "Post-Quantum Identity Before Your Competitors" 
- ❌ "Paradise for Your Digital Soul" (wrong audience)
- ❌ "Start Free" (enterprises want demos, not free tiers)

### Section 2: The Problem-Solution Fit

**Three-Column Layout:**

| Current Pain | Industry Data | OHM Solution |
|-------------|--------------|-------------|
| Auth0 costs scale with users ($240K+ at 50K MAU) | 67% of CTOs cite vendor lock-in as top concern | Open source: €0 licensing. Self-host or managed. |
| GDPR fines averaging €4.3M in 2025 | 89% of breaches involve identity | Zero-PII architecture: nothing to breach |
| No quantum readiness | NIST mandates PQC migration by 2030 | ML-KEM + ML-DSA ready TODAY |
| SSO silos (separate for web, mobile, IoT) | Average enterprise has 4.2 identity providers | One sovereign identity across all platforms |

### Section 3: TCO Comparison Table

| Cost Category | Auth0/Okta (50K MAU) | MS Entra Verified ID | OHM Sovereign SSO |
|--------------|---------------------|---------------------|-------------------|
| License (Annual) | $240,000 | $120,000 | **€0 (Open Source)** |
| Infrastructure | Included | Azure required ($36K) | Self-host: €4,800/yr |
| Integration | $50,000 (consulting) | $80,000 (MS partner) | **€15,000 (SDK)** |
| PQC Upgrade | Not available | Roadmap 2028 | **Included today** |
| Breach Risk (expected) | High (Okta breached 2023) | Medium | **Near-zero (no PII)** |
| Vendor Lock-in | High (proprietary) | Very High (Azure) | **None (open source)** |
| **3-Year TCO** | **$770,000** | **$636,000** | **€64,800** |
| **Savings vs. OHM** | — | — | **Up to 91%** |

### Section 4: Compliance Matrix

| Standard | Status | Evidence |
|----------|--------|----------|
| GDPR (EU) | ✅ Compliant | Zero-PII architecture, DPA template |
| eIDAS 2.0 | ✅ Ready | W3C DID/VC implementation |
| SOC 2 Type II | 🔄 In Progress | Audit scheduled Q2 2026 |
| ISO 27001 | 📋 Planned | Target: Q4 2026 |
| HIPAA | ✅ Compatible | E2EE, zero server storage |
| PCI DSS | N/A | No payment data processed |
| NIS2 Directive | ✅ Compliant | PQC + sovereign architecture |
| CCPA (California) | ✅ Compliant | No data collection = no exposure |

### Section 5: Integration Architecture

```
YOUR EXISTING STACK
├── Active Directory / Azure AD → OHM OIDC Bridge
├── AWS Cognito → OHM Federation
├── Legacy LDAP → OHM LDAP Proxy
├── Custom OAuth2 → OHM SDK (npm/pip/gem)
└── Mobile Apps → OHM React Native SDK

INTEGRATION TIME: 2-4 weeks (vs. 3-6 months typical)

DEPLOYMENT OPTIONS:
├── ☁️ OHM Managed Cloud (EU data residency)
├── 🏢 Self-Hosted (your infrastructure)
└── 🔀 Hybrid (control plane cloud, data on-prem)
```

### Section 6: Case Study Template

```markdown
## 🏢 [Company Name] — [Industry]

**Challenge:** [1-2 sentences about their identity problem]
**Solution:** [How OHM was deployed]
**Results:**
- 📈 [Metric 1] — e.g., "Reduced identity costs by 73%"
- 🔒 [Metric 2] — e.g., "Zero breaches in 18 months"
- ⚡ [Metric 3] — e.g., "Login time reduced from 4.2s to 0.8s"
**Quote:** "[Direct quote from CTO/CISO]" — [Name, Title, Company]
```

### Section 7: The CTA Stack (Enterprise)

| CTA | Purpose | Audience |
|-----|---------|----------|
| 📄 **Download Whitepaper** | Nurture → Email capture | Early awareness |
| 🎯 **Request Technical Demo** | Qualify → Sales pipeline | Evaluation phase |
| 🔬 **Start Free POC** | Convert → Hands-on proof | Decision phase |
| 📞 **Talk to Solutions Engineer** | Close → Human connection | Negotiation phase |

---

## 🎯 PART 3: ENTERPRISE CONVERSION TACTICS

### The "Security Questionnaire" Anticipation

Enterprises send 100-300 question security questionnaires. **Pre-answer the top 20:**

| Question | OHM Answer |
|----------|-----------|
| Where is data stored? | On-device (edge-first). Server stores zero PII. |
| Encryption at rest? | AES-256 on device. Server has nothing to encrypt. |
| Encryption in transit? | TLS 1.3 + optional PQC (ML-KEM) tunnel. |
| Breach notification SLA? | 24 hours (GDPR compliant). |
| Penetration test results? | Available under NDA. Last audit: [date]. |
| Uptime SLA? | 99.9% (managed) / Self-hosted = your SLA. |
| Data residency options? | EU (Frankfurt), US (Virginia), self-hosted (anywhere). |
| Quantum readiness? | ML-KEM + ML-DSA implemented. NIST FIPS 203/204. |
| SOC 2 status? | Type II audit in progress, target Q2 2026. |
| GDPR DPA? | Template available. Signed within 48 hours. |

### Pricing for Enterprise

| Tier | Price | Includes |
|------|-------|----------|
| **Community** | €0 forever | Open source, self-hosted, community support |
| **Professional** | €499/mo | Managed cloud, 99.9% SLA, email support |
| **Enterprise** | Custom | Dedicated infra, SLA negotiation, on-call SE |
| **Sovereign** | Custom | Air-gapped, on-prem, compliance package |

### Objection Handling

| Objection | Response |
|-----------|----------|
| "We already use Auth0" | "Keep Auth0 for legacy. Add OHM for PQC-ready apps. We federate." |
| "Open source = no support" | "We offer Enterprise SLA. Think Red Hat, not weekend project." |
| "Too early stage" | "Our code is audited, our patents are filed. We're early = best terms." |
| "Our board won't approve crypto" | "OHM works without blockchain. XOM is optional." |
| "We need SOC 2" | "In progress. We'll share audit results under NDA." |

---

## 🔄 PART 4: AGENT EXECUTION PROTOCOL

When triggered, the agent must:

1. **IDENTIFY** target enterprise persona (CTO / CISO / CFO / Procurement)
2. **RESTRUCTURE** landing page to lead with TCO savings or compliance
3. **ADD** TCO comparison table with real competitor pricing
4. **ADD** compliance matrix with checkmark grid
5. **INSERT** integration architecture diagram (Mermaid)
6. **REPLACE** consumer language with enterprise language
7. **ADD** case study section (even if template-only)
8. **ENSURE** CTA is "Request Demo" not "Start Free"
9. **PRODUCE** enterprise readiness report

### Language Translation Guide

| ❌ Consumer Language | ✅ Enterprise Language |
|--------------------|---------------------|
| "Your data stays yours" | "Zero-PII architecture eliminates breach liability" |
| "Easy to use" | "Reduces mean-time-to-onboard from 4.2s to 0.8s" |
| "Quantum-proof" | "NIST FIPS 203/204 compliant (ML-KEM/ML-DSA)" |
| "Free forever" | "Open source with optional Enterprise SLA" |
| "Join 50K users" | "Deployed across [X] organizations in [Y] industries" |

### Output Format

```markdown
## 🏢 Enterprise Pitch Audit Report

### Enterprise Readiness Score
| Section | Current | Optimized | Note |
|---------|---------|-----------|------|
| Value Prop (CTO-ready) | 3/10 | 9/10 | TCO comparison added |
| Compliance Matrix | 0/10 | 8/10 | 8 standards documented |
| Integration Guide | 1/10 | 7/10 | Architecture diagram |
| Case Studies | 0/10 | 5/10 | Templates ready |
| Enterprise CTA | 2/10 | 9/10 | Demo request funnel |
| Security Pre-answers | 0/10 | 8/10 | Top 20 Q&A added |
| **Total** | **6/60** | **46/60** | **Enterprise-Ready** |

### Next Steps for Full Enterprise Readiness
- [ ] SOC 2 Type II completion
- [ ] 3 named case studies
- [ ] Enterprise pricing page
```

---

## 📚 References

- Geoffrey Moore, "Crossing the Chasm"
- Jill Konrath, "Selling to Big Companies"
- Chris Voss, "Never Split the Difference" (negotiation)
- Gartner, "Magic Quadrant for Access Management"
- Forrester, "Total Economic Impact" methodology
