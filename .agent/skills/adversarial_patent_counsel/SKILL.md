---
name: Adversarial Patent Counsel
description: Simulates a counterparty patent lawyer defending their patent's priority and claim space against OHM's claims. Stress-tests Freedom to Operate analysis by applying Broadest Reasonable Interpretation (BRI) from the OPPOSING side. Identifies infringement vectors, claim overlap risks, and prosecution arguments a competitor would use. Ensures FTO assessments are honest and battle-tested.
group: smart.design
---

# ⚔️ Adversarial Patent Counsel — "The Red Team for Your Freedom to Operate"

> "If your FTO analysis always comes back 20/20 green, you're not looking hard enough."
> — Every honest patent attorney, ever.

## Purpose

This skill **role-plays as the opposing patent holder's attorney** to stress-test OHM's Freedom to Operate (FTO) conclusions. It answers the question:

**"If the owner of [PRIOR ART PATENT X] hired a top patent litigation firm, how would they argue that OHM's claims infringe?"**

The skill is the adversarial counterpart to the Prior Art Research skill's Novelty Assessment. While Prior Art Research asks "are we free to operate?", this skill asks **"how would someone argue we're NOT free to operate?"**

## Why This Exists

### The Problem: Confirmation Bias in FTO

When the same agent conducts the prior art search AND the FTO analysis, there is an inherent bias toward finding "freedom to operate" — because the agent _wants_ the claims to be clear. This leads to:

- **Overconfident FTO:** 20/20 green on every assessment
- **Charitable interpretation:** Reading the prior art narrowly ("it's about X, not Y")
- **Ignoring the Doctrine of Equivalents:** Only checking literal claim overlap, not equivalent functions
- **Missing continuation risk:** Not checking if the prior art patent has pending continuations with broader claims

### The Solution: Adversarial Role Switch

By explicitly switching to the **opposing counsel's perspective**, the agent must:

1. Read the prior art patent's claims under **Broadest Reasonable Interpretation (BRI)**
2. Argue FOR infringement, not against it
3. Identify every possible reading that could create overlap
4. Flag risks that a litigation firm would exploit

## When to Trigger

- **After completing the Prior Art Research** (Step 5.5 in the 7-Step Pipeline)
- **For every HIGH-relevance reference** in the IDS
- **Before finalizing the Novelty Assessment** section
- **When FTO comes back as "all green"** — mandatory adversarial review

## The Adversarial Analysis Framework

### Phase 1: Assume the Counterparty's Identity

For each HIGH-relevance prior art patent, answer these questions AS THE OPPOSING COUNSEL:

```
┌──────────────────────────────────────────────────────────────────┐
│  I represent [PATENTEE NAME], holder of US [X,XXX,XXX].         │
│  My client's patent covers [THEIR CLAIMED INVENTION].           │
│                                                                  │
│  I believe OHM's application for [OHM PATENT TITLE]             │
│  infringes my client's claims because:                           │
│                                                                  │
│  1. LITERAL INFRINGEMENT: [specific claim elements that match]   │
│  2. DOCTRINE OF EQUIVALENTS: [functionally equivalent elements]  │
│  3. MEANS-PLUS-FUNCTION: [if their claims use means-plus]        │
│  4. DEPENDENT CLAIM TRAP: [their dependent claims that narrow    │
│     into our space]                                              │
│  5. CONTINUATION THREAT: [pending continuations that could       │
│     add broader claims]                                          │
└──────────────────────────────────────────────────────────────────┘
```

### Phase 2: Apply Broadest Reasonable Interpretation (BRI)

For each claim element in the prior art patent:

| Their Claim Element   | Narrow Reading (Favorable to OHM)   | BRI Reading (Unfavorable to OHM)                    | Risk Level |
| --------------------- | ----------------------------------- | --------------------------------------------------- | ---------- |
| "computing device"    | Desktop server                      | Any device including mobile phone, browser, IoT     | 🔴 HIGH    |
| "social network"      | Server-based platform like Facebook | Any system connecting users socially, including P2P | 🔴 HIGH    |
| "identity credential" | Username/password                   | DID, .ohm file, W3C VC, encrypted identity blob     | 🟡 MEDIUM  |
| "proximity detection" | GPS-based location                  | BLE, NFC, WiFi, accelerometer, any proximity signal | 🔴 HIGH    |

### Phase 3: Construct the Infringement Theory

For each HIGH-relevance prior art patent, construct a complete infringement theory:

```markdown
## Infringement Theory: US [X,XXX,XXX] vs. OHM SP6C

### Claim-by-Claim Mapping

| Their Claim Element        | OHM's Corresponding Element | Match?  |
| -------------------------- | --------------------------- | ------- |
| "a method for..."          | OHM's system performs...    | PARTIAL |
| "comprising a device..."   | OHM's mobile app runs on... | YES     |
| "storing identity data..." | OHM's .ohm file contains... | PARTIAL |

### Strongest Infringement Arguments

1. [Their broadest claim] could be read to cover [our specific implementation]
2. Under Doctrine of Equivalents, [their mechanism X] and [our mechanism Y]
   perform the same function, in substantially the same way, to achieve
   the same result (Function-Way-Result test)
3. [Their continuation application] has not yet issued; broader claims
   could be added during prosecution

### Weakest Points (Where OHM Would Win)

1. Their claim requires [specific limitation] that OHM does NOT implement
2. Their patent's specification narrows the claim scope via [prosecution history estoppel]
3. OHM's approach is fundamentally different because [technical distinction]

### Risk Assessment

- Literal Infringement Risk: HIGH / MEDIUM / LOW / NONE
- Doctrine of Equivalents Risk: HIGH / MEDIUM / LOW / NONE
- Overall FTO Risk: 🟢 GREEN / 🟡 YELLOW / 🔴 RED
```

### Phase 4: Downgrade FTO if Warranted

After the adversarial analysis, update the Novelty Assessment:

| Original FTO | After Adversarial Review | Action Required                                         |
| ------------ | ------------------------ | ------------------------------------------------------- |
| 🟢 GREEN     | 🟢 GREEN (confirmed)     | No change — adversarial review found no credible threat |
| 🟢 GREEN     | 🟡 YELLOW (downgraded)   | Add specific differentiation language to claims         |
| 🟢 GREEN     | 🔴 RED (downgraded)      | STOP — rewrite claims to avoid infringement             |
| 🟡 YELLOW    | 🟡 YELLOW (confirmed)    | Document design-around options                          |
| 🟡 YELLOW    | 🔴 RED (downgraded)      | STOP — critical risk, may need to abandon claim         |

## The 5 Prosecution Attack Vectors

A good counterparty lawyer will explore ALL of these:

### 1. Literal Infringement (35 U.S.C. § 271(a))

Does OHM's implementation match every element of at least one claim, word for word?

### 2. Doctrine of Equivalents (Graver Tank v. Linde Air Products, 1950)

Even if not literally matching, does OHM's element perform the **same function**, in **substantially the same way**, to achieve **substantially the same result**?

**This is the most dangerous vector for OHM.** Our "different CRDT architecture" or "different encryption" may be considered equivalent under this doctrine.

### 3. Means-Plus-Function (35 U.S.C. § 112(f))

If their claims use "means for [function]" language, the scope includes the disclosed structure in their specification AND equivalents thereof. Check their specification for disclosed structures that overlap with OHM's implementation.

### 4. Dependent Claim Narrowing

Their independent claim may be broad enough to cover our invention, but they narrowed it in dependent claims. Check if their narrowing dependent claims describe exactly what OHM does — this is a trap that shows the patentee contemplated our exact implementation.

### 5. Continuation Prosecution Risk

- Does the counterparty have pending continuation applications?
- Could they add new claims that specifically target OHM's implementation?
- **File wrapper estoppel:** Did they narrow their claims during prosecution in ways that exclude our approach?

## Output Format

The adversarial analysis is embedded in the IDS as a new section after the Novelty Assessment:

```html
<h2>Adversarial FTO Analysis (Counterparty Counsel Perspective)</h2>
<table>
  <tr>
    <th>Prior Art</th>
    <th>Counterparty Argument</th>
    <th>OHM Defense</th>
    <th>Risk</th>
  </tr>
  <tr>
    <td>US X,XXX,XXX (Smith)</td>
    <td>
      Their Claim 1 "a method for connecting users via proximity" under BRI
      covers OHM's BLE mesh discovery...
    </td>
    <td>
      OHM's system is fundamentally P2P with CRDT state; their patent requires
      central server processing (Col. 4, lines 15-22)...
    </td>
    <td>🟡 MEDIUM</td>
  </tr>
</table>
```

## Scoring Rubric

| Dimension              | Score | Criteria                                                       |
| ---------------------- | ----- | -------------------------------------------------------------- |
| **Role Commitment**    | /10   | Did the agent genuinely argue FOR infringement?                |
| **BRI Application**    | /10   | Were claim terms interpreted broadly, not charitably?          |
| **DoE Analysis**       | /10   | Was Function-Way-Result test applied?                          |
| **Continuation Check** | /10   | Were pending continuations investigated?                       |
| **Honest Downgrade**   | /10   | Was FTO downgraded when warranted?                             |
| **Specificity**        | /10   | Were specific claim elements and column/line references cited? |

**Minimum passing score: 42/60 (70%)**

## Integration with Prior Art Research

This skill is invoked as **Step 5.5** in the 7-Step Pipeline:

```
Step 1: READ patent claims
Step 2: SEARCH US Patents
Step 3: SEARCH Foreign Patents
Step 4: SEARCH NPL
Step 5: SEARCH OHM Internal
Step 5.5: ADVERSARIAL FTO REVIEW ← THIS SKILL
         → For each HIGH-relevance reference:
           - Construct infringement theory
           - Apply BRI to their claims
           - Check Doctrine of Equivalents
           - Assess continuation risk
           - Downgrade FTO if warranted
Step 6: WRITE IDS (with adversarial section)
Step 7: CONFIRM
```

## Example: How This Changes the Analysis

### Without Adversarial Review (BEFORE):

> "US 10,911,103 (Proximity Social Discovery) — MEDIUM relevance.
> Differs from SP6C: uses NFC not browser extension. ✅ CLEARED."

### With Adversarial Review (AFTER):

> "US 10,911,103 — Counterparty counsel argues:
> (1) Claim 1 recites 'a first portable electronic device' — under BRI, a laptop running
> a browser extension IS a portable electronic device.
> (2) 'Facilitating proximity based interaction' — SP6C's trust score overlay IS a
> proximity-based interaction, just with a different proximity metric (web co-occurrence
> vs. physical NFC).
> (3) DoE: Same function (connect users), same way (electronic device detects user),
> same result (social interaction triggered).
>
> **OHM Defense:** SP6C operates entirely in browser context with website reputation
> scoring and BYOK AI, not physical device proximity. Their specification (Col. 3, lines
> 8-15) explicitly limits to 'physical proximity' via NFC/BLE hardware signals. SP6C
> uses no hardware proximity — it evaluates website trust metadata.
>
> **FTO: 🟡 YELLOW** (was GREEN). Recommend adding explicit limitation: 'wherein
> the trust score is computed from website metadata, not physical device proximity.'"

## Legal Basis

This skill implements the best practices recommended in:

- **MPEP § 2111** — Broadest Reasonable Interpretation standard
- **Graver Tank & Mfg. Co. v. Linde Air Products Co.**, 339 U.S. 605 (1950) — Doctrine of Equivalents
- **Phillips v. AWH Corp.**, 415 F.3d 1303 (Fed. Cir. 2005) — Claim construction methodology
- **Warner-Jenkinson Co. v. Hilton Davis Chemical Co.**, 520 U.S. 17 (1997) — Element-by-element DoE
- **Festo Corp. v. Shoketsu Kinzoku Kogyo Kabushiki Co.**, 535 U.S. 722 (2002) — Prosecution history estoppel
