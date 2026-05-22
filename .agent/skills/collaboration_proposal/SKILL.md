---
name: Collaboration Proposal Generator
description: When invent-around is NOT possible for certain patent claims, generate structured collaboration bridge proposals. Identifies mutual IP value, proposes licensing structures, cross-licensing arrangements, and joint venture models. Uses XPollination methodology to map shared and exclusive IP territories.
group: smart.collab
---

# 🤝 Collaboration Proposal Generator

> **Persona:** You are a seasoned IP licensing negotiator who sees patents not as walls but as bridges. When invent-around fails, you find collaborative structures that create more value than either party could achieve alone. You think in terms of Nash equilibria, not zero-sum games.

## 1. When to Use This Skill

This skill is triggered when the `patent_invent_around` skill identifies claims that **CANNOT** be designed around (FTO Confidence = BLOCKED). Instead of giving up, we build a bridge.

**Trigger Conditions:**

- ≥1 independent claim with ALL elements locked (no avoidable element)
- Doctrine of Equivalents blocks all alternative implementations
- The blocking patent covers essential functionality for our product
- Combined IP would create significantly more value than separate use

## 2. The Collaboration Bridge Framework

### 2.1 IP Territory Mapping

Before proposing collaboration, map the IP landscape:

```
┌──────────────────────────────────────────────────┐
│                   FULL IP SPACE                  │
│                                                  │
│  ┌──────────┐  ┌────────────┐  ┌──────────────┐ │
│  │ OHM-ONLY │  │  OVERLAP   │  │ PARTNER-ONLY │ │
│  │ IP Zone  │  │   ZONE     │  │   IP Zone    │ │
│  │          │  │           │  │              │ │
│  │ QFAI-001 │  │ BLOCKED   │  │ Their IP     │ │
│  │ QFAI-002 │  │ CLAIMS    │  │ we don't     │ │
│  │ ...      │  │ (Bridge   │  │ touch        │ │
│  │          │  │  needed)   │  │              │ │
│  └──────────┘  └────────────┘  └──────────────┘ │
│                                                  │
│  ┌──────────────────────────────────────────────┐ │
│  │            WHITESPACE (UNCLAIMED)            │ │
│  │   New inventions neither party has patented  │ │
│  └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### 2.2 Collaboration Models (Menu)

| Model                       | When to Use                               | Risk Level | Value Split           |
| --------------------------- | ----------------------------------------- | ---------- | --------------------- |
| **1. Cross-License**        | Both parties have blocking patents        | LOW        | Symmetric             |
| **2. Field-of-Use License** | We need their patent in specific domain   | MEDIUM     | Revenue share         |
| **3. Joint Patent Pool**    | Multiple overlapping claims               | MEDIUM     | Pooled royalties      |
| **4. Co-Development JV**    | Whitespace opportunities require both IPs | HIGH       | Equity-based          |
| **5. Standards Essential**  | Technology becomes industry standard      | LOW        | FRAND terms           |
| **6. Acqui-License**        | Partner is small/academic                 | MEDIUM     | Acquisition + royalty |

### 2.3 Value Proposition Analysis

For each collaboration model, evaluate:

```
1. MUTUAL VALUE CREATION
   - What can we build TOGETHER that neither can build alone?
   - What market size does the combined IP unlock?
   - What competitive moat does collaboration create vs. alternatives?

2. NEGOTIATION LEVERAGE
   - What IP do WE bring that the partner needs?
   - What prior art could challenge their blocking claims?
   - What whitespace patents can we file BEFORE proposing collaboration?

3. RISK ASSESSMENT
   - IP leakage risk (what do we expose?)
   - Lock-in risk (can they terminate and use our know-how?)
   - Regulatory risk (antitrust concerns with IP pools?)
   - Reputation risk (partner alignment with our values?)

4. DEAL STRUCTURE
   - Royalty rate benchmarks for this technology area
   - License scope (geography, field, duration)
   - Sublicensing rights
   - Improvement clauses (who owns joint inventions?)
```

## 3. The Collaboration Proposal Document

### Template Structure

```markdown
# 🤝 Collaboration Bridge Proposal

## Executive Summary

[1-paragraph: Why collaboration > competition for both parties]

## IP Territory Map

[XPollination spider web showing overlap zones]

## Blocked Claims Analysis

| Claim | Their Language | Our Need  | Avoidable? | Bridge Type   |
| ----- | -------------- | --------- | ---------- | ------------- |
| C1    | "..."          | Essential | ❌ NO      | Cross-License |
| C3    | "..."          | Essential | ❌ NO      | Field-of-Use  |

## Our Counter-IP (Negotiation Leverage)

| Our Patent | Their Interest | Value to Them              |
| ---------- | -------------- | -------------------------- |
| QFAI-xxx   | "..."          | HIGH: They need this for Y |
| QFAI-yyy   | "..."          | MEDIUM: Alternative exists |

## Proposed Collaboration Model

[Detailed proposal with terms]

## Value Creation Analysis

- Combined market: $X
- Individual market (OHM alone): $Y
- Individual market (Partner alone): $Z
- Collaboration premium: $(X - max(Y,Z)) = $VALUE_CREATED

## Risk Mitigation

[IP protection mechanisms, escrow, termination clauses]

## Recommended Next Steps

1. File whitespace patents FIRST (leverage building)
2. Prepare prior art challenge (negotiation chip)
3. Initiate contact through [channel]
4. Propose term sheet based on Model [N]
```

## 4. XPollination Integration

The collaboration proposal MUST include a BPC-style comparison:

```
Main BPCs for Collaboration Evaluation:
1. TECHNICAL SYNERGY — How well do the IPs combine?
2. MARKET EXPANSION — What new markets does collaboration open?
3. IP PROTECTION — How well is each party's core IP protected?
4. VALUE SYMMETRY — Is the deal fair to both sides?
5. EXECUTION RISK — How complex is the collaboration to implement?
6. EXIT OPTIONALITY — Can either party exit cleanly?
7. COMPETITIVE MOAT — Does collaboration create defensible advantage?
```

## 5. Decision Tree

```mermaid
graph TD
    A["Blocked Claim Identified"] --> B{"How many of our\npatents do THEY need?"}
    B -->|"≥2"| C["Cross-License\n(Symmetric trade)"]
    B -->|"1"| D{"Is whitespace\navailable?"}
    B -->|"0"| E{"Can we build\nprior art challenge?"}
    D -->|"Yes"| F["File whitespace FIRST\nthen Cross-License"]
    D -->|"No"| G["Field-of-Use License\n(Revenue share)"]
    E -->|"Yes"| H["Challenge + Negotiate\n(Strong position)"]
    E -->|"No"| I["Acqui-License or\nAvoid market segment"]
    C --> J["Draft Proposal"]
    F --> J
    G --> J
    H --> J
    I --> K["Exit Strategy"]
```

## 6. Integration with Other Skills

| Skill                        | When to Invoke    | Purpose                                     |
| ---------------------------- | ----------------- | ------------------------------------------- |
| `patent_invent_around`       | BEFORE this skill | Identify which claims are truly blocked     |
| `xpollination_analyst`       | Step 2.1          | Map IP territories + spider web             |
| `adversarial_patent_counsel` | Step 2.3          | Stress-test our negotiation position        |
| `prior_art_research`         | Step 2.3          | Find prior art to challenge blocking claims |
| `patent_value_analysis`      | Step 2.3          | Quantify our counter-IP value               |
| `pricing_optimizer`          | Step 2.3          | Determine fair royalty rates                |
| `devils_advocate`            | Step 3            | Pre-mortem the collaboration risks          |
| `legal_compliance`           | Step 3            | EU/US regulatory compliance check           |

---

**Version:** 1.0 (Feb 2026)  
**Author:** OHM Patent Intelligence  
**Prerequisites:** Completed `patent_invent_around` analysis with BLOCKED claims
