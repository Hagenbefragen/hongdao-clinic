---
name: Prior Art Research
description: Deep multi-jurisdiction prior art research for patent applications. Searches US Patents, EPO, WIPO, JPO, and Non-Patent Literature (NPL). Produces IDS-ready Form SB/08 data to satisfy the USPTO Duty of Candor (37 CFR § 1.56). Run BEFORE drafting claims and AFTER finalizing claims.
group: smart.docs
---

# 🔍 Prior Art Research — "Know What Exists Before You Claim"

> "The Duty of Candor is not optional. It is the price of admission to the patent system." — MPEP § 2001

## Purpose

Performs **comprehensive, multi-jurisdiction prior art research** across all relevant databases and literature sources. Produces a structured **Information Disclosure Statement (IDS)** document compatible with **USPTO Form SB/08** format.

This skill satisfies the **Duty of Candor and Good Faith** requirement under **37 CFR § 1.56**, which mandates that every inventor, applicant, and attorney disclose all known prior art material to patentability.

## When to Trigger

- **BEFORE drafting patent claims** — to understand the landscape and avoid drafting claims that overlap existing art
- **AFTER finalizing patent claims** — to verify no material prior art was missed and to prepare the IDS for filing
- **Before converting provisional → non-provisional** — IDS is legally required at non-provisional filing
- **When expanding claims** (CIP, continuation) — new claims require updated prior art search
- **Periodically** — new publications and patents appear daily; refresh before any filing action

## 🚨 MANDATORY: Sequential Execution Discipline (ONE PATENT AT A TIME)

> **This section is LEGALLY CRITICAL. Violating it constitutes Inequitable Conduct under 37 CFR § 1.56.** > **Fabricating, inventing, or hallucinating patent numbers is VORSATZ (willful intent) and STRAFBAR (punishable).**

### The Iron Rule

**Process exactly ONE patent at a time, in strict sequential order. NEVER batch-process, parallelize, or skip steps — even when the user asks to do 10, 20, or 50 patents "in a row."**

### The 7-Step Pipeline (per patent)

Execute these steps IN ORDER for each patent. Do NOT proceed to the next patent until all 7 steps are complete for the current one.

```
┌─────────────────────────────────────────────────────────────────┐
│  PATENT N (e.g., SP6B Sovereign Mesh)                          │
│                                                                 │
│  Step 1: READ the patent Description.html file                  │
│          → Extract ALL independent claims                       │
│          → Identify key technical terms, algorithms, protocols  │
│                                                                 │
│  Step 2: SEARCH Domain A (US Patents)                           │
│          → Execute 3-5 targeted web searches                    │
│          → Verify EVERY patent number via patents.google.com    │
│          → Read abstract/claims chunks for HIGH-relevance hits  │
│          → Follow citation chains (forward + backward)          │
│                                                                 │
│  Step 3: SEARCH Domain B (Foreign Patents)                      │
│          → Check EP/WO equivalents of US hits                   │
│          → Search Espacenet/PATENTSCOPE for additional art      │
│                                                                 │
│  Step 4: SEARCH Domain C (NPL)                                  │
│          → Google Scholar for academic papers + DOIs            │
│          → arXiv/IEEE/ACM for technical publications            │
│          → Standards (W3C, NIST, ISO) if applicable             │
│          → Open-source projects (GitHub, product docs)          │
│                                                                 │
│  Step 5: SEARCH Domain E (OHM Internal)                         │
│          → Cross-reference against all OHM patent families  │
│          → Verify no self-collision with sibling patents        │
│                                                                 │
│  Step 5.5: ADVERSARIAL FTO REVIEW (adversarial_patent_counsel) │
│          → For each HIGH-relevance reference from Steps 2-4:    │
│            (a) Role-switch: become the counterparty's lawyer    │
│            (b) Apply BRI to THEIR claims (broad, not narrow)    │
│            (c) Construct infringement theory against OHM        │
│            (d) Check Doctrine of Equivalents (Function-Way-     │
│                Result test from Graver Tank v. Linde Air)       │
│            (e) Check for pending continuations                  │
│            (f) Downgrade FTO from GREEN → YELLOW/RED if needed  │
│          → Output: Adversarial FTO table (embedded in IDS)      │
│          → If ANY claim goes 🔴 RED: STOP and alert user       │
│                                                                 │
│  Step 6: WRITE the IDS HTML file                                │
│          → Only after Steps 1-5.5 are complete                  │
│          → Use ONLY verified references with real numbers       │
│          → Include search methodology with actual queries used  │
│          → Include Adversarial FTO section from Step 5.5        │
│                                                                 │
│  Step 6.2: QUALITY GATE — Deep-Link & Deliverable Verification  │
│          → Ensure all deliverables are fully complete           │
│          → Verify ALL deep-links in the output document         │
│          → NO 404s, NO outdated pages, NO dead links allowed    │
│          → Do NOT proceed if a deep link gives a 404 error      │
│                                                                 │
│  Step 6.5: §112(a) CLAIM-TO-SPEC MAPPING AUDIT                 │
│          → List EVERY claim (independent + dependent)            │
│          → For each claim, identify the spec Component/para     │
│            that provides technical description                   │
│          → Build a mapping table: Claim → Spec → ✅/❌          │
│          → If ANY claim has ❌:                                  │
│            (a) STOP — do NOT proceed                            │
│            (b) Write spec paragraphs for unsupported claims     │
│            (c) Re-run audit until ALL claims show ✅            │
│          → Common failure: adding design-around defense claims   │
│            without adding corresponding specification text.      │
│            ALWAYS add spec when adding claims.                   │
│                                                                 │
│  Step 6.6: D5 DESIGN-AROUND HARDENING (patent_fortress_auditor) │
│          → For EACH independent claim:                           │
│            (a) Decompose into elements (a, b, c, d...)          │
│            (b) Classify: BROAD / ESSENTIAL / LIMITING            │
│            (c) Identify invent-around attack vectors (adversary) │
│            (d) Score D5 (1-10)                                   │
│            (e) Check Doctrine of Equivalents per attack          │
│          → Generate remediation queue (P0-P5)                    │
│          → IMPLEMENT ALL FIXES:                                  │
│            - Add dependent claims for design-around alternatives │
│            - Broaden overly-narrow independent claim elements    │
│            - Add new independent claims for minimal cores        │
│          → For EVERY new claim → re-run Step 6.5 (§112a)        │
│          → Update ALL forms (cover sheet, ADS) with new counts   │
│          → Minimum passing score: D5 ≥ 8/10 overall             │
│                                                                 │
│  Step 7: CONFIRM completion to user                             │
│          → Report: "SP6B IDS ✅ DONE — N US, M Foreign, P NPL" │
│          → Report: FTO status (how many GREEN/YELLOW/RED)       │
│          → Report: §112(a) mapping: all claims backed ✅/❌     │
│          → Report: D5 score: X/10 (overall)                     │
│          → Ask: "Ready for next patent?"                        │
│                                                                 │
│  ───── BARRIER: Do NOT start Patent N+1 until Step 7 ─────     │
└─────────────────────────────────────────────────────────────────┘
```

### What "Real Research" Means (Minimum Bar)

Each patent research session MUST include at minimum:

| Activity                                                     | Minimum Count             | Verification                           |
| ------------------------------------------------------------ | ------------------------- | -------------------------------------- |
| Web searches (search_web)                                    | ≥ 4 distinct queries      | Queries logged in Search Methodology   |
| US patents verified (read_url_content on patents.google.com) | ≥ 2 direct URL lookups    | Title confirmed on Google Patents      |
| Patent content read (view_content_chunk)                     | ≥ 1 abstract/claims chunk | Understand what it actually claims     |
| NPL with DOI or URL                                          | ≥ 3 verified sources      | DOI resolves OR URL is real            |
| Citation chain followed                                      | ≥ 1 (forward or backward) | "Cited by" or "Citations" section read |

### What is FORBIDDEN

❌ **NEVER invent a patent number** (e.g., "US 11,263,295 B2" without verifying it exists)
❌ **NEVER guess a patent's title** — read it from patents.google.com
❌ **NEVER fabricate an author name** for NPL — use real names from real publications
❌ **NEVER copy patent numbers from a previous IDS** into a new IDS without re-verifying relevance
❌ **NEVER skip research steps** because the user says "do them all quickly"
❌ **NEVER write an IDS before completing the search** — Steps 2-5 MUST precede Step 6
❌ **NEVER parallelize IDS creation** for multiple patents — one at a time, always
❌ **NEVER omit the source link** — every reference MUST have a clickable hyperlink

### 🔗 MANDATORY: Clickable Source Links for Every Reference

> **Every single prior art reference in the IDS HTML MUST include a clickable hyperlink to the verified source.**

| Reference Type            | Required Link Format                                | Example                                                         |
| ------------------------- | --------------------------------------------------- | --------------------------------------------------------------- |
| US Patent (granted)       | `https://patents.google.com/patent/USXXXXXXXX`      | `https://patents.google.com/patent/US8150416B2`                 |
| US Patent (published app) | `https://patents.google.com/patent/USXXXXXXXXXXXA1` | `https://patents.google.com/patent/US20250209208A1`             |
| Foreign Patent (EP)       | `https://patents.google.com/patent/EPXXXXXXX`       | `https://patents.google.com/patent/EP2817651B1`                 |
| Foreign Patent (WO)       | `https://patents.google.com/patent/WOXXXXXXXXXX`    | `https://patents.google.com/patent/WO2021061699A1`              |
| NPL with DOI              | `https://doi.org/XXXX`                              | `https://doi.org/10.18653/v1/D19-1410`                          |
| NPL on arXiv              | `https://arxiv.org/abs/XXXX.XXXXX`                  | `https://arxiv.org/abs/2410.22284`                              |
| NPL (other)               | Direct URL to source                                | `https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2` |

**In the IDS HTML**, the Document Number column for patents MUST wrap the number in an `<a>` tag:

```html
<td>
  <a href="https://patents.google.com/patent/US8150416B2" target="_blank"
    >US 8,150,416 B2</a
  >
</td>
```

**For NPL**, the DOI/URL MUST be a clickable link in the citation text:

```html
<td>
  Reimers & Gurevych, "Sentence-BERT," EMNLP 2019.
  <a href="https://doi.org/10.18653/v1/D19-1410" target="_blank"
    >DOI: 10.18653/v1/D19-1410</a
  >
</td>
```

**WHY:** This allows the examiner (and the inventor) to immediately verify every reference with one click. No link = no verifiability = potential STRAFE.

### Batch Mode Behavior

When user requests IDS generation for multiple patents (e.g., "generate IDS for SP6, SP6B, and SP6C"):

1. **Acknowledge the batch** — "I'll process these one at a time: SP6B first, then SP6C, then SP6."
2. **Execute the 7-step pipeline for Patent 1** — full research + IDS
3. **Report completion** — "SP6B IDS ✅ DONE"
4. **Execute the 7-step pipeline for Patent 2** — full fresh research + IDS
5. **Report completion** — "SP6C IDS ✅ DONE"
6. **Continue until all patents processed**
7. **Final summary** — report all completed IDS files

## Integration with /patent Workflow

```
/patent workflow:
  Step 0 (NEW) → PRIOR ART PRE-SEARCH ← this skill (landscape mode)
  Step 1       → Identify the Innovation
  Step 2       → Document the Innovation
  Step 3       → Add to Portfolio
  Step 4       → Update Provisional Application
  Step 4.5     → Make HTML Editable + Signature
  Step 4.9 (NEW) → PRIOR ART POST-SEARCH ← this skill (IDS mode)
  Step 5       → Commit Changes
```

## The 5 Search Domains

### Domain A: U.S. Patents & Published Applications (Form SB/08 Column A)

**Sources:**

- **USPTO Full-Text (PatFT)**: https://patft.uspto.gov/netahtml/PTO/search-bool.html
- **USPTO AppFT (Published Applications)**: https://appft.uspto.gov/netahtml/PTO/search-bool.html
- **Google Patents**: https://patents.google.com/ (superior search, covers US + international)
- **USPTO Patent Center**: https://patentcenter.uspto.gov/

**Search Strategy:**

1. **Title/Abstract search**: Key terms from each independent claim
2. **Classification search**: Identify CPC/IPC classes relevant to the invention
3. **Inventor/Assignee search**: Known competitors and their filing patterns
4. **Citation chain**: Follow forward/backward citations from closest matches

**Output per result:**

```
- Patent/Pub Number: US XX,XXX,XXX or US 20XX/XXXXXXX A1
- Inventor(s): [Names]
- Assignee: [Company]
- Title: [Full title]
- Filing Date: [YYYY-MM-DD]
- Issue/Pub Date: [YYYY-MM-DD]
- Relevance: HIGH | MEDIUM | LOW
- Overlap Analysis: [Which claims are affected, how NI-SHIELD differs]
- CPC Classification: [e.g., G06F 21/56]
```

### Domain B: Foreign Patent Documents (Form SB/08 Column B)

**Sources:**

- **EPO Espacenet**: https://worldwide.espacenet.com/ (100+ countries)
- **WIPO PATENTSCOPE**: https://patentscope.wipo.int/ (PCT applications)
- **JPO J-PlatPat**: https://www.j-platpat.inpit.go.jp/ (Japan)
- **CNIPA**: https://english.cnipa.gov.cn/ (China)
- **KIPO K-PION**: https://kpat.kipris.or.kr/ (South Korea)
- **DPMA DEPATISnet**: https://depatisnet.dpma.de/ (Germany/EU)
- **Google Patents** (covers many international jurisdictions)

**Search Strategy:**

1. **PCT/WO search**: International applications often filed before national phase
2. **EPO equivalent search**: Many US patents have EPO family members with different claims
3. **Regional focus**: Prioritize jurisdictions where OHM will seek protection (US, EU, JP, KR, CN)
4. **Translation**: Use Google Translate for non-English abstracts; flag for professional review

**Output per result:**

```
- Document Number: EP XXXXXXX / WO 20XX/XXXXXX / JP 20XX-XXXXXX
- Country: [ISO code]
- Inventor(s): [Names]
- Applicant: [Company]
- Title (English): [Translated if needed]
- Filing Date: [YYYY-MM-DD]
- Publication Date: [YYYY-MM-DD]
- Relevance: HIGH | MEDIUM | LOW
- Overlap Analysis: [Specific claim overlap]
- Language: [Original language if not English]
```

### Domain C: Non-Patent Literature — NPL (Form SB/08 Column C)

**Sources:**

- **Google Scholar**: https://scholar.google.com/
- **arXiv**: https://arxiv.org/ (AI/ML/CS preprints)
- **IEEE Xplore**: https://ieeexplore.ieee.org/
- **ACM Digital Library**: https://dl.acm.org/
- **Semantic Scholar**: https://www.semanticscholar.org/
- **NIST Publications**: https://www.nist.gov/publications
- **ISO Standards Store**: https://www.iso.org/
- **EU Official Journal**: https://eur-lex.europa.eu/

**Categories to search:**

1. **Academic papers**: Peer-reviewed publications on the core technology
2. **Standards**: ISO, NIST, IEEE standards that define related frameworks
3. **Regulations**: EU AI Act, PLD, GDPR provisions that the invention implements
4. **Whitepapers**: Industry reports from competitors or analysts
5. **Product documentation**: Technical docs from competing products
6. **Conference proceedings**: Presentations at relevant conferences
7. **Textbooks**: Foundational references for underlying mathematics

**Output per result:**

```
- Authors: [Names]
- Title: "Full Paper Title"
- Publication: [Journal/Conference/Publisher]
- Date: [YYYY-MM-DD or YYYY]
- DOI/URL: [persistent link]
- Relevance: HIGH | MEDIUM | LOW
- Overlap Analysis: [Which concepts overlap, what's different]
- Category: Academic | Standard | Regulation | Whitepaper | Product | Textbook
```

### Domain D: Commercial Products & Services

**Sources:**

- Company websites, product pages, API documentation
- Crunchbase / PitchBook for startup intelligence
- GitHub repositories (open-source implementations)
- App stores (Google Play, Apple App Store)
- Product Hunt, Hacker News launches

**Note:** Products are listed as NPL in Column C, with documentation URLs as evidence.

### Domain E: OHM Internal Cross-References

**Sources:**

- `c:\ohm\Documentation\Patents\` — all OHM provisional filings
- `c:\ohm\.agent\features\research\` — feature research documents
- `c:\ohm\backend\src\` — implemented code as evidence of conception

**Purpose:** Ensure claims don't overlap with OTHER OHM patents (self-collision check).

## Search Query Generation Process

### Step 1: Extract Key Concepts from Claims

For each independent claim, extract:

- **Primary noun phrases**: the system/method/apparatus being claimed
- **Action verbs**: what the system does (computes, generates, intercepts)
- **Technical qualifiers**: specific algorithms, protocols, data structures
- **Measurable outcomes**: latency, accuracy, error rates

### Step 2: Generate Multi-Strategy Queries

For each concept, generate queries in 4 strategies:

| Strategy           | Query Type              | Example                                           |
| ------------------ | ----------------------- | ------------------------------------------------- |
| **Broad**          | Core concept only       | "AI insurance scoring"                            |
| **Narrow**         | Full technical detail   | "per-inference actuarial risk token middleware"   |
| **Synonym**        | Alternative terminology | "machine learning safety certification real-time" |
| **Classification** | CPC/IPC codes           | G06Q 40/08 (insurance), G06F 21/56 (security)     |

### Step 3: Execute Searches

For each query × each source = search matrix. Record:

- Total results found
- Top 5-10 most relevant results examined in detail
- Reasons for relevance/irrelevance

## Output: IDS-Ready Document

### Format

```markdown
# INFORMATION DISCLOSURE STATEMENT (IDS)

# Patent Application: [TITLE]

# Application Code: [CODE]

# IDS Date: [YYYY-MM-DD]

# IDS Type: PRE-SEARCH | POST-SEARCH

## Duty of Candor Declaration

The undersigned hereby declares that all information contained herein is
material to the patentability of the above-identified application and is
disclosed in compliance with 37 CFR § 1.56 (Duty of Candor and Good Faith).

---

## TABLE A: U.S. PATENTS AND U.S. PATENT APPLICATION PUBLICATIONS

| #   | Document Number | Inventor(s) | Issue/Pub Date | Title | Relevance    | Overlap Analysis |
| --- | --------------- | ----------- | -------------- | ----- | ------------ | ---------------- |
| A1  | US XX,XXX,XXX   | ...         | YYYY-MM-DD     | ...   | HIGH/MED/LOW | ...              |

---

## TABLE B: FOREIGN PATENT DOCUMENTS

| #   | Document Number | Country | Pub Date   | Title (English) | Relevance    | Overlap Analysis |
| --- | --------------- | ------- | ---------- | --------------- | ------------ | ---------------- |
| B1  | EP XXXXXXX      | EP      | YYYY-MM-DD | ...             | HIGH/MED/LOW | ...              |

---

## TABLE C: NON-PATENT LITERATURE (NPL)

| #   | Authors | Title | Publication/Source | Date | DOI/URL | Relevance    | Overlap Analysis |
| --- | ------- | ----- | ------------------ | ---- | ------- | ------------ | ---------------- |
| C1  | ...     | "..." | ...                | YYYY | ...     | HIGH/MED/LOW | ...              |

---

## NOVELTY ASSESSMENT

### Claims Cleared (No Blocking Prior Art Found):

- Claim X: [reason]
- Claim Y: [reason]

### Claims Requiring Attention (Partial Overlap Found):

- Claim Z: [prior art reference], [how to distinguish]

### Recommended Claim Modifications:

- [Specific modifications to strengthen novelty]

---

## SEARCH METHODOLOGY

### Databases Searched:

- [ ] USPTO PatFT (US granted patents)
- [ ] USPTO AppFT (US published applications)
- [ ] Google Patents (multi-jurisdiction)
- [ ] EPO Espacenet (European/worldwide)
- [ ] WIPO PATENTSCOPE (PCT international)
- [ ] JPO J-PlatPat (Japan)
- [ ] Google Scholar (academic)
- [ ] arXiv (preprints)
- [ ] IEEE Xplore (engineering)
- [ ] NIST Publications (standards)

### Search Queries Used:

1. "[query 1]" → [X results, Y examined]
2. "[query 2]" → [X results, Y examined]

### CPC Classifications Searched:

- G06Q 40/08 — Insurance
- G06F 21/56 — Computer security
- [additional classes]

### Date Range: [start] to [end]

### Search Conducted By: [name]

### Search Date: [YYYY-MM-DD]
```

## Scoring Rubric

| Dimension         | Score | Criteria                                                  |
| ----------------- | ----- | --------------------------------------------------------- |
| **Coverage**      | /10   | All 5 domains searched? All jurisdictions covered?        |
| **Depth**         | /10   | Top results examined in detail? Citation chains followed? |
| **Honesty**       | /10   | All material art disclosed, even if unfavorable?          |
| **Analysis**      | /10   | Overlap clearly explained? Differentiation articulated?   |
| **Actionability** | /10   | Clear recommendations for claim modification?             |
| **IDS Readiness** | /10   | Output formatted for Form SB/08? All fields complete?     |

**Minimum passing score: 48/60 (80%)**

## Integration Chain

```
prior_art_research (PRE-SEARCH, landscape mode)
        ↓
patent_claim_generator (draft claims informed by landscape)
        ↓
triz_whitespot (find whitespace in the landscape)
        ↓
patent_claim_generator (refine claims)
        ↓
prior_art_research (POST-SEARCH, IDS mode)
        ↓
█ GENERATE HTML IDS FORM (USPTO_IDS_[PATENT].html) ← MANDATORY
        ↓
█ §112(a) CLAIM-TO-SPEC MAPPING AUDIT ← MANDATORY (Step 6.5)
  → Every claim must map to a specification paragraph
  → If ANY claim lacks spec text → STOP and write it
        ↓
█ D5 DESIGN-AROUND HARDENING ← MANDATORY (Step 6.6)
  → Adversarial decomposition of every independent claim
  → Implement ALL fixes (add defense claims, broaden elements)
  → Re-run §112(a) for every new claim added
  → Update ALL forms with new claim counts
  → Minimum D5 ≥ 8/10
        ↓
█ CROSS-DOCUMENT CONSISTENCY CHECK ← MANDATORY
  → Inventor name, claim counts, fees match in ALL documents
        ↓
innovation_journal (log disclosure with hash anchor)
        ↓
patent_fortress_auditor (full 12-dimension audit)
        ↓
Filing document (HTML with IDS section embedded)
```

## MANDATORY: HTML IDS Form Generation (Form SB/08)

> **Every IDS MUST produce an HTML form conforming to USPTO Form SB/08.**
> This is the filing-ready output. The markdown IDS is the working document;
> the HTML IDS is what goes to the USPTO.

### When to Generate

- **Always** — after completing either PRE-SEARCH or POST-SEARCH
- Output file: `Documentation/Patents/IDS/USPTO_IDS_[PATENT_NAME].html`
- Example: `USPTO_IDS_NISHIELD.html`, `USPTO_IDS_AEGIS.html`

### Required HTML Structure

The HTML IDS form MUST include all of the following (per `/HTMLsigning_editing` workflow):

1. **Form Header** — "UNITED STATES PATENT AND TRADEMARK OFFICE" + "INFORMATION DISCLOSURE STATEMENT BY APPLICANT" + PTO/SB/08a reference number
2. **Application Metadata** — Editable fields for:
   - Application Number
   - Filing Date
   - First Named Inventor
   - Art Unit
   - Examiner Name
   - Attorney Docket Number
   - Title of Invention
3. **Certification Statement** — 37 CFR § 1.97(e)(1) and (e)(2) checkboxes
4. **Table A: U.S. Patent Documents** — Cite No., Document Number, Pub Date, Patentee, Relevant Passages, Examiner Initials (editable)
5. **Table B: Foreign Patent Documents** — Cite No., Document Number, Country, Pub Date, Patentee, Translation Y/N, Relevant Passages, Examiner Initials (editable)
6. **Table C: Non-Patent Literature** — Cite No., Author/Title/Date/Publisher, Examiner Initials (editable)
7. **Novelty Assessment Banner** — GREEN/YELLOW/RED status with first-in-class claims highlighted
8. **Signature Pad** — Canvas-based digital signature with auto-save to localStorage
9. **Progress Banner** — Shows editable field completion status
10. **Print Styles** — Clean output with no yellow highlights, signature renders as image

### Editable Fields (data-field names)

| Field                       | data-field                                   | data-placeholder              |
| --------------------------- | -------------------------------------------- | ----------------------------- |
| Application Number          | `appNumber`                                  | `Enter Application Number`    |
| Filing Date                 | `filingDate`                                 | `YYYY-MM-DD`                  |
| Inventor Name               | `inventorName`                               | `Your Full Legal Name`        |
| Art Unit                    | `artUnit`                                    | `Art Unit Number`             |
| Examiner Name               | `examinerName`                               | `Examiner Name (if assigned)` |
| Docket Number               | `docketNo`                                   | `Docket Number`               |
| Signature Name              | `sigName`                                    | `Full Legal Name`             |
| Signature Date              | `sigDate`                                    | `YYYY-MM-DD`                  |
| Registration No.            | `regNo`                                      | `Registration Number`         |
| Examiner Initials (per row) | `examA1`, `examA2`, `examB1`, `examC1`, etc. | `—`                           |

### localStorage Keys

Use patent-specific keys to avoid cross-contamination:

- Fields: `ohm-ids-[patent-lowercase]-fields`
- Signature: `ohm-ids-[patent-lowercase]-sig1`

### HIGH-Relevance Highlighting

Rows with `Relevance: HIGH` should use CSS class `.ref-high` with background `#fff3cd` (amber highlight) to draw examiner attention.

### Reference Implementation

See these files as templates:

- `Documentation/Patents/IDS/USPTO_IDS_NISHIELD.html` — NI-SHIELD IDS (5 US, 3 Foreign, 20 NPL)
- `Documentation/Patents/IDS/USPTO_IDS_AEGIS.html` — AEGIS IDS (5 US, 2 Foreign, 15 NPL)

## Failure Modes & Mitigations

| Failure                    | Risk                | Mitigation                                    |
| -------------------------- | ------------------- | --------------------------------------------- |
| **Missed blocking patent** | Patent invalidated  | Use 4 search strategies × 5+ databases        |
| **Language barrier**       | Miss JPO/CNIPA art  | Use Google Translate + flag for review        |
| **Recency gap**            | Miss recent filings | Search published applications (18-month lag!) |
| **NPL blind spot**         | Miss academic paper | Search Google Scholar + arXiv + IEEE          |
| **Self-collision**         | Own patents overlap | Cross-reference entire OHM portfolio          |
| **Dishonest omission**     | Inequitable conduct | Disclose ALL material art, even unfavorable   |

## Legal Warning

⚠️ **37 CFR § 1.56 — Duty of Candor and Good Faith**

> Each individual associated with the filing and prosecution of a patent application
> has a duty of candor and good faith in dealing with the Office, which includes a
> duty to disclose to the Office all information known to that individual to be
> material to patentability.

**Failure to comply can result in the entire patent being held unenforceable.**

This skill does NOT replace professional legal counsel. The output should be reviewed
by a qualified patent attorney before filing. However, it provides a thorough foundation
that satisfies the inventor's personal duty of disclosure.

## 🔒 Verification Integrity Rules

> **Every reference in an IDS is a legal declaration to the USPTO.**
> **A single fabricated reference can render the ENTIRE patent unenforceable via Inequitable Conduct.**

> [!CAUTION]
> ### March 2026 Audit Results
> A portfolio-wide audit (2026-03-10/11) discovered **7 fabricated references** across 6 IDS files:
> - **CN 115222791 B** cited in AEGIS #1 and NI-Shield #3 as "QRNG control methods" — actual title: "目标关联方法" (Target association)
> - **arXiv:2601.00000** cited in NIMWA #10 as "CourtGuard" — returns HTTP 404, paper does not exist
> - **arXiv:2309.12345** cited in NFIA #8 as "Design of Reversible Computing" by Aaronson — actual paper is about diffusion model bias
> - **arXiv:2301.13320** cited in POAW #13 as "Proof of Useful Work" — actual paper is about cellular automata
> - **arXiv:2006.09648** cited in XOM #23 as "Circles UBI" — actual paper is about convex polyhedra (pure math)
> - **US 11,425,250 B1** title in NFIA #8 embellished with "Golden ratio" — actual patent has no golden ratio connection
>
> All fabrications were corrected with audit notices. The rules below were hardened to prevent recurrence.

### 🚨 MANDATORY: Machine-Verification Gate (Step 5.7)

**NO reference may appear in an IDS unless it has passed machine verification.**

This step MUST execute between Step 5.5 (Adversarial FTO) and Step 6 (Write IDS HTML). It is NOT optional.

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 5.7: MACHINE-VERIFICATION GATE                            │
│                                                                 │
│  For EVERY reference collected in Steps 2-4:                    │
│                                                                 │
│  IF reference is a US Patent:                                   │
│    1. read_url_content("https://patents.google.com/patent/      │
│       US{NUMBER}B2") or A1 variant                              │
│    2. Read the OG Description or position 0-1                   │
│    3. Compare returned title with YOUR intended title            │
│    4. If title MISMATCH → correct YOUR title to match reality   │
│    5. If 404 or redirect → REMOVE reference (number is fake)   │
│    6. Record verified title in verification log                 │
│                                                                 │
│  IF reference is a Foreign Patent (CN/EP/WO):                   │
│    1. read_url_content("https://patents.google.com/patent/      │
│       {COUNTRY}{NUMBER}B") — try A1/B1 variants                │
│    2. Read the English-translated title from Google Patents      │
│    3. CN patents: ALWAYS verify — they are the #1 fabrication   │
│       vector because English speakers cannot easily check them  │
│    4. If 404 → REMOVE reference                                 │
│                                                                 │
│  IF reference is an arXiv paper:                                │
│    1. read_url_content("https://arxiv.org/abs/{ID}")            │
│    2. Read the OG Description (title + abstract)                │
│    3. Verify: title matches, authors match, topic is relevant   │
│    4. RED FLAGS for fabricated arXiv IDs:                        │
│       - Round numbers (2601.00000) → almost certainly fake      │
│       - Sequential patterns (2309.12345) → suspicious           │
│       - Title/author mismatch from what you expected → WRONG    │
│       - Domain mismatch (math paper cited for CS topic) → WRONG │
│    5. If ANY red flag → REMOVE reference                        │
│                                                                 │
│  IF reference is a DOI:                                         │
│    1. read_url_content("https://doi.org/{DOI}")                 │
│    2. Verify title and journal match                            │
│                                                                 │
│  IF reference is a website/product:                             │
│    1. read_url_content(URL) — verify it resolves                │
│    2. Confirm content matches what you intend to cite           │
│                                                                 │
│  GATE CHECK:                                                    │
│    - Every reference must have a ✅ verification status          │
│    - Any reference without ✅ → MUST NOT appear in the IDS      │
│    - A reference that was "close but wrong" is WORSE than no    │
│      reference at all (Inequitable Conduct risk)                │
│                                                                 │
│  OUTPUT: Verification log with:                                 │
│    - Reference ID                                               │
│    - URL fetched                                                │
│    - Expected title                                             │
│    - Actual title returned                                      │
│    - ✅ PASS / ❌ FAIL / ⚠️ TITLE CORRECTED                    │
│                                                                 │
│  ───── BARRIER: Do NOT start Step 6 until ALL refs verified ─── │
└─────────────────────────────────────────────────────────────────┘
```

### Known Fabrication Patterns (Blacklist)

The following patterns have been observed in AI-generated IDS references. If you detect ANY of these patterns in your output, STOP and re-verify:

| Pattern | Example | Risk |
|---------|---------|------|
| **Round arXiv IDs** | `2601.00000`, `2400.00000` | Almost certainly fabricated |
| **Sequential arXiv IDs** | `2309.12345`, `2401.11111` | Suspiciously clean numbers |
| **Title substitution** | Real patent number + invented title | Passes number check but content is wrong |
| **CN patent exploitation** | CN patents described in English without verification | Hardest to verify, #1 fabrication vector |
| **Author fabrication** | "Pax, J. et al." for a non-existent paper | Invented credibility |
| **Domain mismatch** | Math paper cited for CS security topic | arXiv ID exists but content is unrelated |
| **Plausible abstraction** | "QRNG control methods" for a target-tracking patent | Sounds right but is completely wrong |

### How to Verify a US Patent Number

```
1. Construct URL: https://patents.google.com/patent/US{NUMBER}B2
2. Use read_url_content to fetch the page
3. Read the OG Description — it contains the REAL title
4. Compare with YOUR listed title — they MUST match in substance
5. If the title is DIFFERENT → correct YOUR title or REMOVE the reference
6. If the page returns 404 or redirects → THE NUMBER IS FAKE — REMOVE IT
7. For published applications (A1), use: US{YEAR}{NUMBER}A1 format
```

### How to Verify arXiv References

```
1. Construct URL: https://arxiv.org/abs/{ID}
2. Use read_url_content to fetch the page
3. Read the OG Description — it contains the REAL title and abstract
4. Verify ALL of:
   a. Title matches what you intend to cite
   b. Authors match (if you cited specific authors)
   c. Subject area is relevant (not a math paper for a CS topic)
   d. Publication date is plausible
5. If ANY mismatch → DO NOT USE IT
6. If 404 → THE PAPER DOES NOT EXIST — REMOVE IT
7. NEVER cite an arXiv paper without running read_url_content on it first
```

### How to Verify Other NPL

```
1. Academic paper with DOI: read_url_content("https://doi.org/{DOI}")
   → Verify title and journal match your citation
2. Standards: Must reference official URL (e.g., w3.org/TR/did-core/)
   → Verify the standard exists and is current
3. Products/Projects: Must reference official docs (e.g., yjs.dev, docs.libp2p.io)
   → Verify the URL resolves and content matches
4. Blog posts: Must cite author name + blog name + full URL
   → Verify the URL resolves
5. If you cannot provide a verified DOI or URL → DO NOT CITE IT
```

### Audit Trail

Every IDS HTML file MUST include in the Search Methodology section:

- **Actual search queries used** (not generic placeholders)
- **Number of results screened** vs. number selected
- **Citation chain depth** (e.g., "US 10,756,906 has 98 citing families — reviewed top 10")
- **Databases actually searched** (only check ✅ for databases you actually queried)
- **Verification log** (list of references with ✅ PASS / ❌ FAIL status from Step 5.7)

### Self-Test Before Filing

Before marking an IDS as complete, verify:

- [ ] Every US patent number returns a real Google Patents page (verified via read_url_content)
- [ ] Every foreign patent has a verified title from Google Patents (especially CN patents)
- [ ] Every arXiv paper has been verified via read_url_content (title + authors + domain match)
- [ ] Every NPL has a DOI or stable URL that resolves and matches the citation
- [ ] No reference was copied from another OHM IDS without re-verification
- [ ] No arXiv ID has suspiciously round or sequential numbers (e.g., XXXX.00000, XXXX.12345)
- [ ] The differentiation analysis references specific claims by number
- [ ] The search date is accurate (today's date, not a future date)
- [ ] The Machine-Verification Gate (Step 5.7) log is complete with all ✅
