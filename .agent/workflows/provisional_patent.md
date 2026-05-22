---
description: File a USPTO provisional patent application — fully compliant with Title 35 USC (July 2025)
---

# /provisional_patent — File a Compliant USPTO Provisional Patent

> **Legal Basis:** 35 U.S.C. § 111(b), § 112(a), § 113, § 119(e), § 123, 37 CFR § 1.51(c), § 1.53(c), § 1.76
> **Source:** USPTO Appendix L — Consolidated Patent Laws, July 2025 Update
> **Last Verified:** 2026-02-27

// turbo-all

---

## What This Workflow Does

Files a **provisional patent application** with the United States Patent and Trademark Office (USPTO).
A provisional establishes your **priority date** — the date from which your invention is legally protected.
You then have **12 months** to file the full non-provisional application.

---

## 🚫 THE "NO BLIND INJECTIONS" MANDATE (MANDATORY)

> ⚠️ **Origin:** In March 2026, programmatic string injections caused catastrophic claim numbering fragmentation (duplicate IDs, non-contiguous sequences) in the V6 Master Provisional.
> 
> **THE RULE:** You must **NEVER AGAIN** inject content into a patent document blindly using simple regex or string append operations. 
> 
> BEFORE injecting new claims, sections, or paragraphs, you MUST **ANALYZE THE FILE LINE BY LINE** (or use a deterministic DOM/Node.js parser script) to:
> 1. Find the exact, correct insertion context.
> 2. Ensure all surrounding claim indices and paragraph numbers are structurally preserved and sequentially recalculated if necessary.
> **Failure to do this will cause massive filing regressions.**

---

## What a Provisional REQUIRES (Title 35 USC § 111(b))

| #   | Element                                     | Law                        | Status        |
| --- | ------------------------------------------- | -------------------------- | ------------- |
| 1   | Written specification meeting § 112(a)      | § 111(b)(1)(A)             | **MANDATORY** |
| 2   | Drawings (when necessary for understanding) | § 111(b)(1)(B), § 113      | **MANDATORY** |
| 3   | Cover Sheet identifying as provisional      | 37 CFR § 1.51(c)           | **MANDATORY** |
| 4   | Filing Fee                                  | § 111(b)(3), § 41(a)(1)(D) | **MANDATORY** |
| 5   | Inventor name(s) and residence(s)           | 37 CFR § 1.51(c)           | **MANDATORY** |

## What a Provisional does NOT Require (and must NOT include)

| #   | Element                                    | Law                            | Note                                      |
| --- | ------------------------------------------ | ------------------------------ | ----------------------------------------- |
| 1   | **Claims**                                 | § 111(b)(2)                    | Optional. Recommended only if ready.      |
| 2   | **Oath or Declaration**                    | § 111(b) by omission           | Not required for provisionals             |
| 3   | **Information Disclosure Statement (IDS)** | USPTO practice                 | **NOT PERMITTED — USPTO will destroy it** |
| 4   | **Formal patent-quality drawings**         | 37 CFR § 1.84 exemption        | Informal sketches/diagrams are fine       |
| 5   | **Examination**                            | § 111(b)(8); exempt from § 131 | Provisionals are never examined           |

---

## Step 0: Patent Law Freshness Check ⚖️

**MANDATORY FIRST.** Before ANY patent work, check patent law research freshness:

1. Read: `c:\ohm\.agent\skills\patent_filing\resources\PATENT_LAW_RESEARCH_CHECKLIST.md`
2. Check the `Last Researched` date
3. If more than **90 days** have passed since last research:
   - Execute ALL 10 search queries from the checklist using `search_web`
   - Update the `Last Researched` date after completion
4. If research is fresh (<90 days), proceed directly to Step 1

> ⚠️ Patent law changes. Never rely on cached knowledge. The checklist covers §101 Alice/Mayo,
> §112 enablement, claim formatting, fee schedules, IDS requirements, and filing procedures.

---

## Step 1: Prior Art Landscape Research 🔍

**MANDATORY.** Before drafting the specification, understand what already exists.

1. **Read the skill:** `c:\ohm\.agent\skills\prior_art_research\SKILL.md`

2. **Extract key concepts** from the innovation idea:

   - Primary noun phrases (what is being built)
   - Action verbs (what it does)
   - Technical qualifiers (algorithms, protocols)
   - Measurable outcomes (latency, accuracy)

3. **Execute multi-domain search** across all 5 domains:

   - **Domain A:** USPTO PatFT + AppFT (US patents & published applications)
   - **Domain B:** EPO Espacenet + WIPO PATENTSCOPE + JPO J-PlatPat
   - **Domain C:** Google Scholar + arXiv + IEEE Xplore + NIST
   - **Domain D:** Competitor products & services documentation
   - **Domain E:** OHM internal cross-references (avoid self-collision)

4. **Save Landscape Report** to:

   ```
   Documentation/Patents/PriorArt/LANDSCAPE_[PATENT-CODE].md
   ```

5. **Assess landscape:**
   - If blocking prior art found → modify specification before drafting
   - If no blocking art → proceed with confidence, note closest art for differentiation
   - If partial overlap → target TRIZ whitespace for novel dissolution

> 📌 This is a LANDSCAPE search, NOT an IDS. IDS is not permitted for provisionals.
> Retain this research — it will become the basis for the IDS when filing the non-provisional.

---

## Step 2: Identify the Innovation

Run through these novelty gatekeeping questions:

- [ ] Is this truly novel? (Not found in prior art landscape)
- [ ] Is this non-obvious? (Not a trivial combination of existing techniques)
- [ ] Is this useful? (Has practical application — not just theoretical)
- [ ] Which domain does it belong to?

| Domain                     | Prefix   | Example  |
| -------------------------- | -------- | -------- |
| QFVC (Video Compression)   | QFVC-XXX | QFVC-009 |
| Natural Intelligence       | NI-XXX   | NI-005   |
| Content Protection         | CP-XXX   | CP-007   |
| Trust/Identity             | TI-XXX   | TI-005   |
| Resonance/Communication    | RC-XXX   | RC-003   |
| Economic (Blissconomy)     | EC-XXX   | EC-003   |
| Display (Fibonacci Planck) | FPD-XXX  | FPD-001  |
| Tesla Heritage             | TH-XXX   | TH-001   |
| Grid Harmonization         | GH-XXX   | GH-001   |
| New Earth Device           | NED-XXX  | NED-001  |

---

## Step 3: Write the Specification (§ 112(a) Compliant)

The specification is the **HEART** of your provisional. It is what establishes your priority date.
Everything you want to claim later in the non-provisional MUST be described here.

### 3.1 Specification Template

Create or update the specification document:

```markdown
# [PATENT-CODE]: [TITLE OF INVENTION]

## TITLE OF THE INVENTION

[Brief, technically accurate title, 2-7 words preferred, max 500 characters]

## CROSS-REFERENCE TO RELATED APPLICATIONS

[Reference any related OHM provisionals by application number, if filed]
[If none: "None."]

## BACKGROUND OF THE INVENTION

### Field of the Invention

[Technical field — e.g., "video compression," "network security," "biometric authentication"]

### Description of Related Art

[What exists today? What problems remain unsolved? Reference prior art from Step 1]

## BRIEF SUMMARY OF THE INVENTION

[1-2 paragraph summary of what the invention does and WHY it's better than prior art]

## DETAILED DESCRIPTION OF THE INVENTION

### System Architecture

[Overall system design with component descriptions]

### Component 1: [Name]

[Detailed description including algorithms, formulas, parameters, thresholds]

### Component 2: [Name]

[Continue for all components]

### Implementation Example

[Pseudocode, TypeScript, or detailed algorithmic description]
[Include ALL parameters, constants, and configurable values]

### Advantage Over Prior Art

[Specific, measurable improvements — latency, accuracy, bandwidth, security]

## BRIEF DESCRIPTION OF DRAWINGS

[If drawings are included, describe each figure:]

- FIG. 1: [System architecture overview]
- FIG. 2: [Data flow diagram]
- FIG. 3: [Algorithm flowchart]

## ABSTRACT

[Single paragraph, max 150 words. Summarize the technical contribution.]
```

### 3.2 Enablement Checklist (§ 112(a) Compliance)

Before proceeding, verify the specification passes the enablement test:

- [ ] Can a **Person of Ordinary Skill in the Art (POSITA)** reproduce this invention from the specification alone, without undue experimentation?
- [ ] Are ALL parameters, thresholds, constants, and configurable values disclosed?
- [ ] Are alternative embodiments / variations described?
- [ ] Is the **best mode** (preferred implementation) indicated?
- [ ] Are system requirements and dependencies listed?
- [ ] Are performance benchmarks or expected results included?
- [ ] Would a skilled software engineer understand HOW to implement this, not just WHAT it does?

> ⚠️ **WHY THIS MATTERS:** If the specification doesn't enable the claimed invention,
> the non-provisional claims will NOT get the benefit of the provisional's priority date.
> Under § 119(e)(1), the non-provisional must disclose the invention "in the manner provided by § 112(a)."

### 3.3 MASTER Document / Filing Copy Architecture (MANDATORY) 📐

**CRITICAL: Dual-Document Architecture** — Maintain TWO HTML documents:

| Document | Purpose | Contains | Claims? |
|----------|---------|----------|:-------:|
| **MASTER** (`NI_V5_1_SLIM_PROVISIONAL.html`) | THE filing document | Specs + Pseudocode + ALL Claims | ✅ Yes |
| **FILING COPY** (`NI_V5_1_FILING_COPY.html`) | Clean reference copy | Specs + Pseudocode only | ❌ No |

#### Rules (V6.2 Standard):

1. **MASTER is the SINGLE SOURCE OF TRUTH.** File THIS document as the provisional.
2. **FILING COPY is for internal reference.** Use it for sharing specs/pseudocode without exposing claim strategy.
3. **Broadening actions apply to BOTH.** When broadening descriptions, update the FILING COPY first, then propagate to the MASTER.
4. **Claims exist ONLY in MASTER.** Never put claim divs in the FILING COPY.
5. **Section = Petal = Feature:** Every single feature MUST be its own section.
6. **Section ordering in MASTER:** Each feature section MUST contain: (1) Description → (2) Enablement (Pseudocode) → (3) Claims for this specific feature. Claims must NOT be aggregated at the bottom of the document.

#### Sync Verification Script:

```powershell
# Verify MASTER has claims, FILING COPY does not
$master = Get-Content "NI_V5_1_SLIM_PROVISIONAL.html" -Raw
$copy = Get-Content "NI_V5_1_FILING_COPY.html" -Raw
$masterClaims = ([regex]::Matches($master, 'class="claim"')).Count
$copyClaims = ([regex]::Matches($copy, 'class="claim"')).Count
Write-Host "MASTER: $masterClaims claims | COPY: $copyClaims claims"
if ($copyClaims -gt 0) { Write-Host "❌ FILING COPY has claims — remove them!" }
else { Write-Host "✅ Architecture correct" }
```

### 3.4 Claims (OPTIONAL — Strategic Decision)

**Claims are NOT required for a provisional** (§ 111(b)(2)).

#### When to INCLUDE claims:

- You have a clear understanding of your claim scope
- The claims are already drafted from prior analysis
- You want to define boundaries for licensing discussions during the 12-month window

#### When to SKIP claims:

- Speed is priority — file NOW, perfect claims later
- You're still exploring the full scope of the invention
- You want to avoid premature narrowing of your protection scope

#### If including claims, use this structure per Feature Section:

**Rule:** Claims must be placed directly beneath the Pseudocode/Enablement block for the specific feature they protect. Do NOT aggregate all claims at the end of the document.

**Independent Claim:**

```
A [method/system/apparatus] for [DOING SOMETHING] comprising:
   a) [first element/step];
   b) [second element/step];
   c) [third element/step]; and
   d) [final element/step].
```

**Dependent Claim:**

```
The [method/system] of claim [N] wherein [specific limitation].
```

**Claim Writing Rules (37 CFR § 1.75):**

- Use "comprising" (open-ended) not "consisting of" (closed)
- Each claim begins with capital letter, ends with period
- Method steps lettered (a), (b), (c)
- Dependent claims MUST reference a prior claim by number
- "A" for first mention, "the/said" for subsequent references
- **Claims go ONLY in the MASTER document** (see § 3.3 above)

### 3.5 §112(a) Claim-to-Specification Mapping Audit 🔍

**MANDATORY when claims are included.** Every single claim MUST have backing specification text.

> ⚠️ **WHY:** A claim without specification support will be rejected under §112(a) during prosecution.
> This audit must happen BEFORE filing, not after.

#### Procedure

1. **List every claim** in the MASTER document (independent + dependent)
2. **For each claim**, identify which specification Component/paragraph provides the technical description
3. **Build a mapping table:**

```
| Claim # | Type        | Spec Component      | Para # | Has Spec? |
|---------|-------------|----------------------|--------|:---------:|
| 1       | Independent | Component 1 [0010]   | p0010  | ✅        |
| 2       | Dependent   | Component 1 [0011]   | p0011  | ✅        |
| 15      | Dependent   | ???                  | ???    | ❌ FAIL   |
```

4. **If ANY claim shows ❌ FAIL:**

   - STOP — do NOT proceed to Step 4
   - Write a specification paragraph (with `[XXXX]` para number) for the unsupported claim
   - Add it to BOTH the FILING COPY and the MASTER document
   - Re-run the mapping audit until ALL claims show ✅

5. **Verify no orphan components:**
   - Every specification Component should be referenced by at least one claim
   - Remove or note unused Components

> 📌 **Common failure:** Adding design-around defense claims (dependent claims covering
> alternative embodiments) without adding corresponding specification paragraphs.
> ALWAYS add spec text when adding new claims. Add to FILING COPY first, then MASTER.

---

### 3.6 D5 Design-Around Vulnerability Audit 🏰

**MANDATORY when claims are included.** Adversarial analysis from a competitor's perspective.

> ⚠️ **WHY:** If a competitor (Google, Anthropic, OpenAI) can trivially design around your claims,
> the patent is worthless. This audit catches that BEFORE filing.

#### Procedure

1. **Read the skill:** `c:\ohm\.agent\skills\patent_fortress_auditor\SKILL.md` (D5 dimension)
2. **Read the skill:** `c:\ohm\.agent\skills\patent_invent_around\SKILL.md`

3. **For EACH independent claim:**
   a. Decompose into elements (a, b, c, d...)
   b. Classify each element: BROAD / ESSENTIAL / LIMITING
   c. Identify design-around attack vectors per element
   d. Score the claim D5 (1-10)
   e. Check Doctrine of Equivalents for each attack vector

4. **Generate remediation queue:**

   - List ALL fixes needed, ranked by Priority (P0 = critical, P5 = minor)
   - Each fix should specify: which claim, what change, estimated effort

5. **IMPLEMENT ALL FIXES before proceeding:**

   - Add dependent claims to cover design-around alternatives
   - Broaden overly-narrow elements in independent claims
   - Add new independent claims for minimal uncircumventable cores
   - **For EVERY new claim added → go back to Step 3.4** (§112(a) mapping)

6. **Update all forms** after claim count changes (see Step 5.8)

7. **Minimum passing score: D5 ≥ 8/10 overall**
   - If below 8/10, continue adding defense claims until threshold is met

> 📌 **The test:** Imagine you are Google's patent lawyer. Can you build a competing
> product without infringing? If yes → the claim needs hardening.

---

### 3.7 Token Budget Guard — Large Document Protection (FEAT-163) 🛡️

> ⚠️ **CRITICAL: Prevents wasted token burns when generating large patent documents.**
> Estimated $200-$322 wasted since Nov 2025 from output token limit hits.

Before generating ANY patent HTML or large specification, apply this pre-flight check:

#### Pre-Flight Token Estimation

| Factor                  | Threshold  | Action                                         |
| ----------------------- | ---------- | ---------------------------------------------- |
| Source markdown > 30KB  | 🔴 ALWAYS  | Use script-based generation (`generate-*.cjs`) |
| Claims count > 30       | 🔴 ALWAYS  | Use script-based generation                    |
| Template HTML > 50KB    | 🔴 ALWAYS  | Use script-based generation                    |
| Source markdown 10-30KB | 🟡 CAUTION | Consider chunking into 2-3 phases              |
| Source markdown < 10KB  | 🟢 OK      | Inline generation is safe                      |

#### Mandatory Script Pattern for Large Documents

When estimated output exceeds 10,000 tokens (~30KB text):

```
❌ NEVER: Generate 4000 lines of HTML inline (WILL burn tokens)
✅ ALWAYS: Write a 200-line Node.js script that generates the HTML
```

Script template:

```powershell
# 1. Write the generator script (small output, always within budget)
write_to_file → scripts/generate-[patent-name]-html.cjs

# 2. Run the script (Node.js has no token limit)
node scripts/generate-[patent-name]-html.cjs

# 3. Verify the output
Get-Content [output.html] | Measure-Object -Line
```

#### Proven Pattern (NI Extension, 2026-03-04)

- Source: `NI_Extension_Provisional.md` (1436 lines, ~50KB)
- First attempt: Inline HTML generation → **TOKEN BURN** ($3.22 wasted)
- Solution: `generate-ni-extension-html.cjs` (250 lines) → **86KB HTML generated successfully**
- Savings: $3.22 per avoided burn × estimated 100+ historical burns = **$322 saved**

> 📌 **Rule of thumb:** If the task is "generate a complete HTML document," ALWAYS use a script.
> The script IS the output — small enough to never exceed token limits.

---

### 3.8 Patent Term Verifier — Anti-Hallucination Gate (MANDATORY) 🔒

> ⚠️ **NON-NEGOTIABLE. Zero tolerance. BLOCKS FILING if any mismatch is found.**
>
> **Origin:** On 2026-03-17, FOUR different hallucinated expansions of the acronym "POAW" were discovered in V5.1 patent filings:
> - "Proof of Authentic Work" (14 instances)
> - "Proof of Actual Work" (16 instances)
> - "Proof of Autonomous Work" (2 instances)
> - "Proof of Audit Work" (3 instances)
>
> The CORRECT expansion is "**Proof of Agent Work**" (from `backend/src/poaw/README.md`).
> This is legally catastrophic — wrong terminology in a patent filing can cause §112(b) indefiniteness rejections.

#### Procedure

1. **Read the skill:** `c:\ohm\.agent\skills\patent_term_verifier\SKILL.md`

2. **Extract ALL acronym expansions** from the patent document:

```powershell
$content = Get-Content $PATENT_FILE -Raw
$matches = [regex]::Matches($content, '([A-Z]{2,}[-]?[A-Z]*)\s*\(([^)]{5,80})\)')
foreach ($m in $matches) {
    Write-Host "$($m.Groups[1].Value) = $($m.Groups[2].Value)"
}
```

3. **Cross-check EVERY expansion** against the authoritative dictionary in the skill.

4. **Search for known hallucination targets:**

```powershell
$wrongPatterns = @(
    'Proof of Actual Work', 'Proof of Authentic Work',
    'Proof of Autonomous Work', 'Proof of Audit Work',
    'Proof of Automated Work'
)
foreach ($wrong in $wrongPatterns) {
    $count = ([regex]::Matches($content, [regex]::Escape($wrong))).Count
    if ($count -gt 0) { Write-Host "❌ HALLUCINATION: '$wrong' x $count" }
}
```

5. **Verify against codebase source files** for any term not in the dictionary.

6. **Generate verification certificate:**
   - Total acronyms checked
   - Mismatches found and fixed
   - **PASS/FAIL** status

**A FAIL result BLOCKS the filing. Fix all mismatches before proceeding.**

> 📌 **This step exists because AI agents hallucinate technical terminology.**
> Never trust the agent's memory for acronym expansions. Always verify against source code.

---

### 3.9 UTF-8 Encoding Guard — Anti-Mojibake Gate (MANDATORY) 🔤

> ⚠️ **NON-NEGOTIABLE. BLOCKS FILING if mojibake characters are detected.**
>
> **Origin:** On 2026-03-19, the NI V6 MASTER provisional was found to contain **697 mojibake characters** —
> em-dashes (—) rendered as `â€"`, box-drawing (═) rendered as `â•`, Greek letters (φ, ρ) as `Ï†`, `Ï`,
> and superscripts (⁻⁴) as `â»â´`. Root cause: content was pasted or generated with UTF-8 encoding,
> then decoded as Windows-1252 (cp1252) and re-encoded as UTF-8, producing triple-encoded garbage.
> This is **legally dangerous** — examiners reading garbled text may reject under §112(a) for lack of enablement.

#### When This Happens

- Copy-pasting from terminal output or benchmark logs into HTML
- AI agents generating content from mixed-encoding source files
- Script output piped into HTML without explicit encoding declaration
- Content copied from PowerShell (which defaults to cp1252 on Windows)

#### Prevention Rules

1. **ALL patent HTML files MUST declare** `<meta charset="UTF-8"/>` in the `<head>` section
2. **NEVER paste raw terminal output** into patent HTML — always sanitize first
3. **When using Node.js scripts** to generate HTML, always write with explicit UTF-8:
   ```javascript
   fs.writeFileSync(path, content, { encoding: 'utf-8' });
   ```
4. **When using PowerShell** to read/write files, use `-Encoding UTF8`:
   ```powershell
   Get-Content file.html -Raw -Encoding UTF8
   Set-Content file.html -Value $content -Encoding UTF8
   ```
5. **For pseudocode sections** containing special characters (Greek letters, math symbols),
   use HTML entities instead of raw Unicode: `&phi;` not φ, `&mdash;` not —, `&asymp;` not ≈

#### Mandatory Post-Generation Verification

```powershell
# Run AFTER generating or editing ANY patent HTML
$file = "[PATENT_HTML_FILE]"
$hits = (Select-String -Path $file -Pattern "â" -AllMatches).Count
if ($hits -gt 0) {
    Write-Host "❌ MOJIBAKE DETECTED: $hits lines with garbled characters"
    Write-Host "   Run: python c:\ohm\scripts\fix-mojibake.py"
    Write-Host "   Then: python c:\ohm\scripts\fix-mojibake-round2.py"
} else {
    Write-Host "✅ Encoding clean — no mojibake detected"
}
```

#### If Mojibake Is Found

1. Run `python c:\ohm\scripts\fix-mojibake.py` (cp1252→UTF-8 reversal)
2. Run `python c:\ohm\scripts\fix-mojibake-round2.py` (residual pattern cleanup)
3. Re-verify with the script above
4. **Do NOT file until the count is 0**

> 📌 **This step exists because Windows defaults to cp1252 encoding, and AI agents generate
> mixed-encoding content. UTF-8 ↔ cp1252 double-encoding is the #1 cause of garbled patent text.**

---

## Step 4: Prepare Drawings / Figures (§ 113)

Include drawings **where necessary for understanding the invention**.
For provisionals, informal drawings are acceptable.

### Acceptable drawing types:

- System architecture diagrams (boxes and arrows)
- Data flow diagrams
- Algorithm flowcharts
- UI screenshots (if the UI is part of the invention)
- Before/after performance comparisons
- Mathematical formula illustrations
- Hardware block diagrams

### Drawing guidelines for provisionals:

- Clear and legible (no formal patent drawing rules required)
- Label all components with reference numerals
- Use consistent numbering across figures
- Each figure should be referenced in the specification (e.g., "as shown in FIG. 1...")
- Export as PDF or high-resolution PNG

> 📌 Formal drawings per 37 CFR § 1.84 are NOT required for provisionals.
> Save formal drawing work for the non-provisional conversion.

---

## Step 5: Prepare Filing Documents

### 5.0 Generate All Forms Automatically (Skill: `provisional_forms`)

**Read the skill first:** `c:\ohm\.agent\skills\provisional_forms\SKILL.md`

Generate all filing documents for ALL patents at once:

```powershell
node c:\ohm\scripts\generate-provisional-forms.cjs
```

Or for a single patent:

```powershell
node c:\ohm\scripts\generate-provisional-forms.cjs --patent=AEGIS
```

This creates a **per-patent folder** in `Documentation/Patents/provisionalPatent/` containing:

| File                              | Form       | Description                             | Required?                   |
| --------------------------------- | ---------- | --------------------------------------- | --------------------------- |
| `cover_sheet_SB16.html`           | PTO/SB/16  | Provisional cover sheet — pre-filled    | ✅ MANDATORY                |
| `micro_entity_SB15A.html`         | PTO/SB/15A | Micro entity certification — pre-filled | ✅ MANDATORY (for $65 rate) |
| `application_data_sheet_ADS.html` | PTO/AIA/14 | Bibliographic data — pre-filled         | 📎 RECOMMENDED              |
| `specification.html`              | —          | Full provisional application            | ✅ MANDATORY                |
| `FILING_CHECKLIST.md`             | —          | Per-patent filing instructions          | 📋 Tracking                 |

All forms have **🟡 editable fields** — click to modify, auto-saves to localStorage.

### 5.1 Cover Sheet (Form SB/16) — MANDATORY

Every provisional MUST include a cover sheet. Without it, the USPTO may treat
your submission as a **non-provisional application** (different fees, triggers examination).

The generated `cover_sheet_SB16.html` is pre-filled with:

| Field                  | Pre-Filled Value                     | Editable? |
| ---------------------- | ------------------------------------ | --------- |
| Application Type       | "Provisional Application for Patent" | No        |
| Title of Invention     | From patent database                 | No        |
| Inventor Name          | Hagen Schmidt                        | 🟡 Yes    |
| Inventor Residence     | Wiener Neustadt, Lower Austria, AT   | 🟡 Yes    |
| Correspondence Address | Pre-filled (needs postal code)       | 🟡 Yes    |
| Docket Number          | OHM-[CODE]-PROV                      | No        |
| Entity Status          | Micro Entity                         | No        |

### 5.2 Micro Entity Certification (Form SB/15A) — MANDATORY for $65 Rate

The generated `micro_entity_SB15A.html` certifies all 4 requirements under § 123:

1. ☑ Qualifies as small entity (independent inventor)
2. ☑ Named on ≤4 prior non-provisional applications (provisionals DON'T count)
3. ☑ Gross income < 3× median household (~$229,500)
4. ☑ No assignment to non-qualifying entity

> ⚠️ **WARNING (§ 123(f)):** False certification = fine of not less than 3× the unpaid amount.

### 5.3 Application Data Sheet (ADS) — RECOMMENDED

**Form:** PTO/AIA/14 — generated as `application_data_sheet_ADS.html`

Pre-filled with inventor data, correspondence address, and application details.
Helps the USPTO capture bibliographic data electronically.

### 5.4 Review and Complete Editable Fields

Before filing, open each HTML form and fill in the yellow-highlighted fields:

- [ ] Street address (all forms)
- [ ] Postal code (all forms)
- [ ] Phone number (SB/16 + SB/15A)
- [ ] Email address (SB/16 + SB/15A)
- [ ] Specification page count (SB/16)
- [ ] Drawing count (SB/16 + ADS)

### 5.5 Print to PDF

Convert each HTML to PDF for Patent Center upload:

1. Open the HTML file in Chrome/Edge
2. Press `Ctrl+P`
3. Set "Destination" to "Save as PDF"
4. Ensure "Background graphics" is checked
5. Save to the same patent folder

### 5.6 Application Size Check

If your specification + drawings exceed **100 pages**:

- Additional fee: **$270 per 50 extra pages** (micro: ~$67.50)
- Consider splitting unrelated inventions into separate provisionals

### 5.7 Cross-Document Consistency Verification ✅

**MANDATORY.** After generating or updating ANY filing document, verify consistency across ALL documents.

> ⚠️ **WHY:** Inconsistent claim counts, inventor names, or fee amounts between the specification,
> cover sheet, ADS, and checklist will cause USPTO processing delays or rejections.
> This was previously caught only when the user manually checked. It must be automatic.

#### Consistency Matrix — All Values MUST Match

| Field                       | Check In                                               | How To Verify                                              |
| --------------------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| **Inventor Name**           | Spec footer, SB/16, SB/15A, ADS, IDS, FILING_CHECKLIST | `Select-String -Path *.html -Pattern "inventor\|Inventor"` |
| **Total Claim Count**       | Spec cross-reference, Spec footer, SB/16, ADS          | `Select-String -Path *.html -Pattern "claim"`              |
| **Independent Claim Count** | Spec footer, SB/16, ADS                                | Must match actual count of "Independent Claim" in spec     |
| **Dependent Claim Count**   | Spec footer, SB/16, ADS                                | Must equal Total - Independent                             |
| **Claim Range**             | Spec cross-reference, Spec footer, ADS                 | First claim # to last claim #                              |
| **Filing Fee**              | SB/16, FILING_CHECKLIST                                | Must match current USPTO fee schedule for entity status    |
| **Related Applications**    | Spec cross-reference, ADS, SB/16                       | Same app numbers everywhere                                |
| **Title of Invention**      | Spec, SB/16, ADS, SB/15A                               | Exact same wording                                         |
| **Docket Number**           | SB/16, ADS                                             | Same docket code                                           |

#### Automated Verification Script

```powershell
# Run from the patent folder
$folder = "[patent-folder-path]"

# Count actual claims in specification
$indClaims = (Select-String -Path "$folder\*.html" -Pattern "Independent Claim" | Measure-Object).Count
$depClaims = (Select-String -Path "$folder\*.html" -Pattern "Dependent Claim" | Measure-Object).Count
$totalClaims = $indClaims + $depClaims
Write-Host "Actual: $totalClaims claims ($indClaims ind + $depClaims dep)"

# Check inventor name consistency
$wrongName = Select-String -Path "$folder\*.html" -Pattern "Böttner|Bottner|INSERT|ENTER.*NAME" -CaseSensitive
if ($wrongName) { Write-Host "❌ WRONG INVENTOR NAME FOUND:" ; $wrongName }
else { Write-Host "✅ Inventor name consistent" }
```

#### If ANY Inconsistency Found:

1. **Fix the source of truth** (the specification HTML) first
2. **Propagate** the correct values to ALL forms (SB/16, SB/15A, ADS, CHECKLIST)
3. **Re-run verification** to confirm all documents match
4. **Commit** with message describing the consistency fix

---

### 5.8 HTML Generation — Token Budget Guard (MANDATORY) 🛡️

When converting the specification to filing-ready HTML:

**Step 1: Estimate output size**

```powershell
$src = Get-Item "[source.md]"
if ($src.Length -gt 30KB) { Write-Host "🔴 USE SCRIPT" }
elseif ($src.Length -gt 10KB) { Write-Host "🟡 CONSIDER CHUNKING" }
else { Write-Host "🟢 INLINE OK" }
```

**Step 2: If 🔴 or 🟡 → Generate via script**

```powershell
# Write a generator script (see scripts/generate-ni-extension-html.cjs for template)
# The script reads the source markdown + template format and outputs complete HTML
node scripts/generate-[patent-name]-html.cjs
```

**Step 3: Verify output**

```powershell
$html = Get-Item "[output.html]"
Write-Host "Size: $([math]::Round($html.Length/1KB))KB"
Write-Host "Lines: $((Get-Content $html | Measure-Object -Line).Lines)"
Select-String -Path $html -Pattern "claim-num" | Measure-Object -Line
```

> 🔥 **WHY:** Each token burn costs ~$3.22 (input context + wasted output + retry).
> At 100+ burns since Nov 2025, this guard saves **$322+** in wasted API costs.
> Reference: FEAT-163 Token Burn Protection, "Agents of Chaos" (Shapira et al., 2026)

---

### 5.9 Meisterprüfung (§112(a) Enablement & Parity Guard) 🔍

// turbo

**MANDATORY AFTER HTML GENERATION. BLOCKS FILING.**

> ⚠️ **Origin:** On 2026-03-26, it was discovered that 16 new patent sections in the Filing Copy lacked algorithmic pseudocode, making them dangerously susceptible to §112(a) indefiniteness or Alice rejections. Also, the Master document and Filing Copy had lost parity during programmatic injections.
> 
> **How to check:**
> 1. Run the `meisterpruefung` skill against the Master and Filing Copy BEFORE calling the task done.
> 2. Assure exactly 100% TOC-to-Body section parity between the two files.
> 3. Verify that *every single independent claim or novel component* section contains an `<h3>Algorithmic Enablement & Pseudocode</h3><pre><code>...</code></pre>` block demonstrating *how* it works, not just *what* it does.
> 4. Ensure no elements are orphaned.
> **Failure to do this guarantees an office action rejection.**

---

## Step 6: Add to Portfolio

1. **Open the master document:**

   ```
   c:\OHM\Documentation\Patents\OHM_PATENT_PORTFOLIO_MASTER.md
   ```

2. **Determine target provisional:**

   - If related to existing domain → Add to existing provisional
   - If entirely new domain → Create new provisional

3. **Update the patent count and add to relevant section**

4. **Update the relevant provisional application file:**
   - `USPTO_QFVC_Provisional_Application.md`
   - `USPTO_NI_Framework_Provisional_Application.md`
   - `USPTO_FORTRESS_Protection_Provisional_Application.md`
   - `USPTO_Trust_Identity_Provisional_Application.md`
   - Or create new: `USPTO_[DOMAIN]_Provisional_Application.md`

---

## Step 7: Make HTML Filing-Ready + Add Signature Pad

All patent HTML files (`Documentation/Patents/USPTO_*.html`) include:

- **🟡 Editable Fields** — Click yellow-highlighted fields to enter personal details
- **💾 Auto-Save** — All values persist in localStorage
- **✍️ Digital Signature Canvas** — For printed/mailed copies and WIPO submissions
- **🖨️ Print-Ready** — Yellow highlights and toolbar hide on print

> ⚠️ **No oath or declaration is required for provisional applications.**
> The signature pad is for optional printed/mailed copies only.
> For Patent Center (online) filing, electronic submission is sufficient.

### To add editable fields to a NEW patent HTML:

```powershell
node c:\ohm\scripts\make-patents-editable.mjs
```

### To add signature pad:

```powershell
node c:\ohm\scripts\add-signature-pad.mjs
```

### USPTO Signature Rules (Reference Only):

| Filing Method              | Signature Type            | Needed for Provisional?        |
| -------------------------- | ------------------------- | ------------------------------ |
| **Patent Center (Online)** | Electronic submission     | ❌ No separate signature       |
| **Mailed / Printed**       | Handwritten signature     | ✅ Yes, on cover sheet         |
| **WIPO/PCT**               | Handwritten or electronic | N/A (provisionals are US-only) |

---

## Step 8: File via Patent Center 🚀

### 8.1 Prerequisites

- USPTO.gov account (create at [patentcenter.uspto.gov](https://patentcenter.uspto.gov))
- All documents prepared as PDF
- Payment method ready (credit card, deposit account, or EFT)

### 8.2 Filing Steps

1. Log in to **patentcenter.uspto.gov**
2. Select **"New Submission"** → **"Utility Provisional"**
3. Upload documents:
   - ✅ Specification (PDF)
   - ✅ Drawings (PDF, if applicable)
   - ✅ Cover Sheet (SB/16) — if not filling in online
   - ✅ ADS (PTO/AIA/14) — recommended
   - ✅ Micro Entity Certification (SB/15A) — if applicable
4. Enter application information:
   - Title of invention
   - Inventor name(s) and address(es)
   - Correspondence address
5. Select **Entity Status** (Micro / Small / Large)
6. **Pay filing fee** ($65 micro / $130 small / $325 large)
7. **Review and Submit**
8. **Receive acknowledgment** with:
   - 📋 Application Number
   - 📅 Filing Date = **YOUR PRIORITY DATE**
   - 🔢 Confirmation Number

> 📌 For guided browser navigation, run the skill:
> `c:\ohm\.agent\skills\patent_filing\SKILL.md`

### 8.3 Post-Filing Checklist

- [ ] Save the filing receipt PDF
- [ ] Record the application number in `OHM_PATENT_PORTFOLIO_MASTER.md`
- [ ] Record the filing date (priority date)
- [ ] Set deadline reminders (see Step 10)

---

## Step 9: Commit Changes

```powershell
git add -A
git commit -m "patent: File [PATENT-CODE] [Title] provisional

- Filed provisional application via Patent Center
- Application number: [NUMBER]
- Filing date (priority): [DATE]
- Entity status: [MICRO/SMALL/LARGE]
- Claims included: [YES/NO]
- Total specification pages: [X]"
```

---

## Step 10: Set Conversion Deadline Reminders ⏰

**IMMEDIATELY after filing**, set the following mandatory reminders:

### Critical Deadlines

| Deadline                   | Date               | Action                                                                       |
| -------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| **Filing Date**            | Day 0              | Priority date established ✅                                                 |
| **9-Month Warning**        | Filing + 9 months  | Begin non-provisional preparation                                            |
| **11-Month Warning**       | Filing + 11 months | File non-provisional NOW                                                     |
| **12-Month HARD Deadline** | Filing + 12 months | **LAST DAY — NO EXTENSION**                                                  |
| **14-Month Emergency**     | Filing + 14 months | Extension possible ONLY with petition + $1,700 fee + "unintentional" showing |

### Track in Portfolio Master

Add to `OHM_PATENT_PORTFOLIO_MASTER.md`:

```markdown
| Code     | Title                | Filed      | App #      | Non-Prov Deadline | Status         |
| -------- | -------------------- | ---------- | ---------- | ----------------- | -------------- |
| QFVC-001 | Quantum Fibonacci VC | 2026-03-01 | 63/XXX,XXX | 2027-03-01        | ⏳ Provisional |
```

> ⚠️ **35 U.S.C. § 111(b)(5):** "the provisional application shall be regarded as abandoned
> 12 months after the filing date... and shall **not be subject to revival** after such 12-month period."
>
> This is a HARD deadline. Miss it = lose the priority date forever.

---

## Step 11: Prepare IDS Materials (Deferred to Non-Provisional)

**DO NOT file an IDS with the provisional.** The USPTO will destroy it.

However, **prepare IDS materials now** for the non-provisional conversion:

1. **Retain** the prior art landscape research from Step 1
2. **Continue monitoring** for new prior art during the 12-month window
3. **At the 9-month mark**, run the `prior_art_research` skill in **IDS mode**:
   - Generate formal IDS document (Form SB/08 format)
   - Populate 3 tables: US Patents, Foreign Patents, Non-Patent Literature
   - Produce Novelty Assessment per claim
4. **File the IDS** with the non-provisional application

> 📋 Under 37 CFR § 1.56 (Duty of Candor), you MUST disclose ALL known material prior art
> when filing the non-provisional. Missing or incomplete IDS can render the entire patent UNENFORCEABLE.

---

## Key Legal Limitations of Provisional Applications

### What provisionals CANNOT do (§ 111(b)(7)):

- ❌ Cannot claim priority from any earlier application
- ❌ Cannot claim benefit of a foreign filing date
- ❌ Cannot claim benefit under § 119, § 120, § 121, § 365, § 386
- ❌ Are NOT examined for patentability (exempt from § 131)
- ❌ Will NEVER issue as a patent by themselves

### What provisionals CAN do:

- ✅ Establish a priority date for US filing purposes
- ✅ Grant "Patent Pending" status for 12 months
- ✅ Support a later non-provisional application under § 119(e)
- ✅ Support a later international (PCT) application
- ✅ Be converted to a non-provisional (with request and conditions)

---

## Claims Strategy Decision Matrix

| Situation                                             | Include Claims? | Rationale                          |
| ----------------------------------------------------- | --------------- | ---------------------------------- |
| Speed is critical, filing today                       | ❌ Skip         | Priority date > perfect claims     |
| Claims already drafted from prior work                | ✅ Include      | No speed penalty, helps scope      |
| Invention scope still evolving                        | ❌ Skip         | Avoid premature narrowing          |
| Licensing discussions expected during 12-month window | ✅ Include      | Shows claim coverage to licensees  |
| Multiple related innovations in one provisional       | ❌ Skip         | Focus on thorough spec             |
| Filing pro se (no attorney)                           | ❌ Skip         | Poorly drafted claims can hurt you |

---

## Filing Fee Quick Reference (2026)

| Fee Type                       | Micro   | Small | Large  |
| ------------------------------ | ------- | ----- | ------ |
| Provisional filing             | $65     | $130  | $325   |
| Size fee (>100 pages, per 50)  | ~$67.50 | ~$135 | $270   |
| Revival (if deadline missed)   | ~$425   | ~$850 | $1,700 |
| Non-provisional filing (later) | ~$82.50 | ~$165 | $330   |
| Non-provisional search fee     | ~$135   | ~$270 | $540   |
| Non-provisional exam fee       | ~$55    | ~$110 | $220   |

---

## Quick Reference Files

| File                                                                          | Purpose                                              |
| ----------------------------------------------------------------------------- | ---------------------------------------------------- |
| `OHM_PATENT_PORTFOLIO_MASTER.md`                                              | Overview of all patents + deadline tracking          |
| `NI_V5_1_SLIM_PROVISIONAL.html` (**MASTER**)                                  | THE filing document: Specs + Pseudocode + ALL Claims |
| `NI_V5_1_FILING_COPY.html` (Clean Reference)                                 | Specs + Pseudocode only (0 claims)                   |
| `Documentation/Patents/provisionalPatent/`                                    | Per-patent filing folders with all forms             |
| `Documentation/DESTILL_IP_PLAYBOOK/CLAIM_CHARTS/`                             | EoU claim charts + licensing evidence                |
| `scripts/generate-provisional-forms.cjs`                                      | Generate all filing forms + folders                  |
| `Documentation/Patents/PriorArt/LANDSCAPE_*.md`                               | Prior art research (for later IDS)                   |
| `scripts/make-patents-editable.mjs`                                           | Batch: make HTML editable                            |
| `scripts/add-signature-pad.mjs`                                               | Batch: add signature canvas                          |
| `USPTO_PRO_SE_FILING_GUIDE.md`                                                | How to file without attorney                         |

---

## Workflow Relationships

| Workflow / Skill                | Relationship                                                  |
| ------------------------------- | ------------------------------------------------------------- |
| `/patent`                       | Parent workflow — innovation discovery + portfolio management |
| `/provisional_patent`           | **THIS WORKFLOW** — legal filing of provisional               |
| `/ipFortress`                   | Deep IP analysis, FTO, adversarial testing                    |
| `/patentproof`                  | Maps patent claims to source code evidence                    |
| `provisional_forms` skill       | **Generate all filing forms + per-patent folders**            |
| `patent_filing` skill           | Guided Patent Center browser navigation                       |
| `prior_art_research` skill      | Multi-jurisdiction prior art search                           |
| `patent_claim_generator` skill  | Auto-generates USPTO-format claims                            |
| `patent_fortress_auditor` skill | 12-dimension claim audit                                      |
| `patent_term_verifier` skill    | **MANDATORY anti-hallucination gate — cross-checks all acronyms against codebase** |

---

_"File fast, file right, file first."_
