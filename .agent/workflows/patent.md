---
description: Process for documenting and filing new patent ideas
---

# /patent - New Patent Documentation Workflow

## When to Use

Use this workflow when:

- A new patentable idea is discovered during research
- An innovation emerges from feature development
- External inspiration (like Dan Winter) leads to novel claims
- User explicitly requests patent documentation

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

## Step -1: Patent Law Awareness Check ⚖️

// turbo

**MANDATORY FIRST.** Before ANY patent work, check patent law research freshness:

1. Read: `c:\ohm\.agent\skills\patent_filing\resources\PATENT_LAW_RESEARCH_CHECKLIST.md`
2. Check the `Last Researched` date
3. If more than **90 days** have passed since last research:
   - Execute ALL 10 search queries from the checklist using `search_web`
   - Topics: § 101 Alice/Mayo, § 112(a) enablement, § 112(b) definiteness, 37 CFR 1.75 claim format, MPEP 608.01 spec format, fee schedule, IDS requirements, provisional vs non-provisional, e-filing, Alice survival strategies
   - Update the `Last Researched` date in the checklist after completion
4. If research is fresh (<90 days), proceed directly to Step 0

> ⚠️ **WHY:** Patent law guidance changes (e.g., USPTO 2025 Alice memo, fee updates, new precedential decisions).
> Drafting claims based on stale legal knowledge risks prosecution failure, § 101 rejection, or fee miscalculation.

---

## Step 0: Prior Art PRE-SEARCH (Landscape Mode) 🔍

// turbo

**MANDATORY.** Before drafting any claims, run the `prior_art_research` skill in **landscape mode**.

1. **Read the skill:** `c:\ohm\.agent\skills\prior_art_research\SKILL.md`

2. **Extract key concepts** from the innovation idea:

   - Primary noun phrases (what is being built)
   - Action verbs (what it does)
   - Technical qualifiers (algorithms, protocols)
   - Measurable outcomes (latency, accuracy)

3. **Execute multi-domain search** across all 5 domains:

   - **Domain A:** USPTO PatFT + AppFT (US patents & published applications)
   - **Domain B:** EPO Espacenet + WIPO PATENTSCOPE + JPO J-PlatPat (foreign patents)
   - **Domain C:** Google Scholar + arXiv + IEEE Xplore + NIST (non-patent literature)
   - **Domain D:** Competitor products & services documentation
   - **Domain E:** OHM internal cross-references (avoid self-collision)

4. **Generate IDS Pre-Search Report** saved to:

   ```
   Documentation/Patents/IDS/IDS_[PATENT-CODE]_PRESEARCH.md
   ```

5. **Assess landscape:**
   - If blocking prior art found → modify claims before drafting
   - If no blocking art → proceed with confidence, note closest art for differentiation
   - If partial overlap → target TRIZ whitespace for novel dissolution

> ⚠️ **Skipping this step risks prosecution failure and inequitable conduct.**
> Under 37 CFR § 1.56, the inventor has a Duty of Candor to disclose all known material prior art.

---

## Step 1: Identify the Innovation

Ask yourself:

- [ ] Is this truly novel? (Not in prior art)
- [ ] Is this non-obvious? (Not a trivial combination)
- [ ] Is this useful? (Has practical application)
- [ ] Which domain does it belong to?
  - QFVC (Video Compression)
  - NI (Natural Intelligence)
  - FORTRESS (Content Protection)
  - Trust/Identity
  - Resonance/Communication
  - Economic (Blissconomy)

---

## Step 2: Document the Innovation

Create or update a research document:

```markdown
# Patent Opportunity: [TITLE]

## Innovation Summary

[1-2 sentence description]

## Problem Statement

[What problem does this solve?]

## Prior Art Analysis

[What exists? Why is this different?]

## Technical Implementation

[Pseudocode or TypeScript implementation]

## Key Claims

1. [Independent claim 1]
2. [Dependent claim]
   ...

## Source/Inspiration

[Dan Winter, Burkhard Heim, Original OHM, etc.]
```

---

## Step 3: Add to Portfolio

// turbo

1. **Open the master document:**

   ```
   c:\OHM\Documentation\Patents\OHM_PATENT_PORTFOLIO_MASTER.md
   ```

2. **Determine target provisional:**

   - If related to existing domain → Add to existing provisional
   - If entirely new domain → Consider new provisional

3. **Update the patent count and add to relevant section**

---

## Step 4: Update Provisional Application

// turbo

1. **Open the relevant provisional:**

   - `USPTO_QFVC_Provisional_Application.md`
   - `USPTO_NI_Framework_Provisional_Application.md`
   - `USPTO_FORTRESS_Protection_Provisional_Application.md`
   - `USPTO_Trust_Identity_Provisional_Application.md`

2. **Add to DETAILED DESCRIPTION section:**

   - Add new component with pseudocode
   - Explain "Advantage over Prior Art"

3. **Add new CLAIMS:**

   - At least 1 independent claim
   - 1-3 dependent claims
   - Follow claim numbering sequence

4. **Update ABSTRACT if major addition**

5. **⚠️ Token Budget Guard Check (FEAT-163):**

   If the provisional markdown exceeds **30KB** or contains **>30 claims**:

   - **DO NOT** generate filing HTML inline (will exceed output token limit = $3.22 wasted)
   - **ALWAYS** write a `generate-*.cjs` script that reads the markdown and outputs HTML
   - See `scripts/generate-ni-extension-html.cjs` for the proven template
   - Run: `node scripts/generate-[patent-name]-html.cjs`

---

## Step 4.5: Make HTML Editable + Add Signature Pad

// turbo

All patent HTML files (`Documentation/Patents/USPTO_*.html`) include:

- **🟡 Editable Fields** — Click yellow-highlighted fields to enter your personal details (name, email, citizenship, etc.)
- **💾 Auto-Save** — All field values persist in localStorage (survive page reload)
- **✍️ Digital Signature Canvas** — Touch/stylus/mouse drawing pad at bottom of each document. Signature auto-saves and appears during print.
- **🖨️ Print-Ready** — Yellow highlights and toolbar hide on print. Only clean text + signature remain.
- **📊 Progress Banner** — Bottom banner shows "X / Y fields filled" status.

### Features per file:

| Feature          | Behavior                                                    |
| ---------------- | ----------------------------------------------------------- |
| Yellow fields    | Click to type your name, email, citizenship, etc.           |
| Green fields     | Auto-highlighted when filled                                |
| Synced fields    | Inventor name auto-syncs to signature line                  |
| Signature canvas | Draw with touchpad/stylus/mouse. Saved to localStorage.     |
| Print            | Toolbar + banner hidden. Clean output with signature image. |
| Clear All        | Button in toolbar resets all fields + signature             |

### To add editable fields to a NEW patent HTML:

```powershell
# Run the batch processor (processes all USPTO_*.html that aren't yet editable):
node c:\ohm\scripts\make-patents-editable.mjs
```

### To add only a signature pad to files already made editable:

```powershell
# Edit scripts/add-signature-pad.mjs to specify the file paths, then:
node c:\ohm\scripts\add-signature-pad.mjs
```

### USPTO Signature Rules:

| Filing Method              | Signature Type                     |
| -------------------------- | ---------------------------------- |
| **Patent Center (Online)** | S-signature: `/Your Name/` (typed) |
| **Mailed / Printed**       | Handwritten signature required     |
| **WIPO/PCT**               | Handwritten or electronic accepted |

> 💡 For online filing, you just type `/Your Name/` in Patent Center. The canvas pad is for printed/mailed copies and WIPO.

---

## Step 4.9: Prior Art POST-SEARCH (IDS Mode) 🔍

// turbo

**MANDATORY.** After claims are finalized, run the `prior_art_research` skill in **IDS mode** to prepare the formal Information Disclosure Statement.

1. **Read the skill:** `c:\ohm\.agent\skills\prior_art_research\SKILL.md`

2. **Re-execute all 5 domain searches** using the FINAL claim language:

   - Extract exact phrases from each independent claim
   - Search for matching/conflicting art using claim-specific queries
   - Follow citation chains from any matches found in pre-search

3. **Generate formal IDS document** in USPTO Form SB/08 format:

   ```
   Documentation/Patents/IDS/IDS_[PATENT-CODE]_POSTSEARCH.md
   ```

4. **Populate 3 tables:**

   - **Table A:** U.S. Patents & Published Applications (Column A of Form SB/08)
   - **Table B:** Foreign Patent Documents — EPO, WIPO, JPO, etc. (Column B)
   - **Table C:** Non-Patent Literature — papers, standards, products (Column C)

5. **Produce Novelty Assessment:**

   - List claims CLEARED (no blocking art)
   - List claims requiring ATTENTION (partial overlap)
   - Recommend specific modifications if needed

6. **Embed IDS summary** into the patent HTML filing document as a new section

7. **Log to Innovation Journal** with hash anchor for priority date evidence

> 📋 **This IDS travels with the patent.** When converting provisional → non-provisional,
> the IDS is submitted with the application to satisfy the Duty of Candor.
> Missing or incomplete IDS can result in the ENTIRE patent being held UNENFORCEABLE.

---

## Step 4.95: Token Budget Guard — HTML Generation 🛡️

// turbo

> **FEAT-163 finding:** ~$322 wasted since Nov 2025 from output token limit burns.
> "Agents of Chaos" (Shapira et al., 2026) identifies uncontrolled resource consumption
> as the #1 risk in autonomous AI agent deployments.

### Pre-Flight Check (MANDATORY before any HTML generation)

```powershell
$src = Get-Item "Documentation/Patents/provisionalPatent/[FOLDER]/[SOURCE].md"
$claims = (Select-String -Path $src -Pattern '\*\*.*Claim \d+' | Measure-Object).Count
Write-Host "Source: $([math]::Round($src.Length/1KB))KB | Claims: $claims"
if ($src.Length -gt 30KB -or $claims -gt 30) {
    Write-Host "🔴 MANDATORY: Use script-based generation"
} elseif ($src.Length -gt 10KB) {
    Write-Host "🟡 CAUTION: Consider chunking"
} else {
    Write-Host "🟢 Inline generation OK"
}
```

### Decision Matrix

| Source Size | Claims | Action                                                  |
| ----------- | ------ | ------------------------------------------------------- |
| >30KB       | Any    | 🔴 Generate `scripts/generate-*.cjs` → run with Node.js |
| Any         | >30    | 🔴 Generate `scripts/generate-*.cjs` → run with Node.js |
| 10-30KB     | <30    | 🟡 Chunk into 2-3 phases (scaffold → fill → verify)     |
| <10KB       | <30    | 🟢 Direct inline generation is safe                     |

### Script Template Reference

```
scripts/generate-ni-extension-html.cjs  ← 250 lines, generated 86KB HTML
scripts/generate-provisional-forms.cjs  ← existing form generator
```

> 📌 **The script IS the deliverable.** Writing a 250-line script is well within token budget.
> The script then generates unlimited HTML via Node.js (no token limits).

---

## Step 4.96: Meisterprüfung (§112(a) Enablement & Parity Guard) 🔍

// turbo

> ⚠️ **MANDATORY after ANY HTML generation or editing.**
>
> **Origin:** On 2026-03-26, it was discovered that 16 new patent sections in the Filing Copy lacked algorithmic pseudocode, making them dangerously susceptible to §112(a) indefiniteness or Alice rejections. Also, the Master document and Filing Copy had lost parity during programmatic injections.
> 
> **How to check:**
> 1. Run the `meisterpruefung` skill against the Master and Filing Copy.
> 2. Assure exactly 100% TOC-to-Body section parity between the two files.
> 3. Verify that *every single independent claim or novel component* section contains an `<h3>Algorithmic Enablement & Pseudocode</h3><pre><code>...</code></pre>` block demonstrating *how* it works, not just *what* it does.
> 4. Ensure no elements are orphaned.
> **Failure to do this guarantees an office action rejection.**

---

## Step 4.97: UTF-8 Encoding Guard — Anti-Mojibake Gate 🔤

// turbo

> ⚠️ **MANDATORY after ANY HTML generation or editing.**
>
> **Origin:** On 2026-03-19, NI V6 MASTER had 697 mojibake characters (â€" instead of —, â• instead of ═).
> Root cause: UTF-8 content decoded as Windows-1252 (cp1252) then re-encoded as UTF-8.

#### Quick Check

```powershell
$file = "[PATENT_HTML_FILE]"
$hits = (Select-String -Path $file -Pattern "â" -AllMatches).Count
if ($hits -gt 0) {
    Write-Host "❌ MOJIBAKE: $hits lines — run fix-mojibake.py"
} else {
    Write-Host "✅ Encoding clean"
}
```

#### Prevention

- Declare `<meta charset="UTF-8"/>` in every patent HTML
- Use `-Encoding UTF8` on all PowerShell file operations
- Use `{ encoding: 'utf-8' }` in Node.js `fs.writeFileSync`
- Prefer HTML entities (`&mdash;`, `&phi;`) over raw Unicode in pseudocode

#### Fixing

```powershell
python c:\ohm\scripts\fix-mojibake.py       # Round 1: cp1252 reversal
python c:\ohm\scripts\fix-mojibake-round2.py # Round 2: residual patterns
```

> See `/provisional_patent` Step 3.9 for full details.

---

## Step 5: Commit Changes

// turbo

```powershell
git add -A
git commit -m "patent: Add [PATENT-ID] [Title]

- Added [description]
- Updated [provisional file]
- Total claims now: [X]"
```

---

## Patent Naming Convention

| Domain               | Prefix   | Example  |
| -------------------- | -------- | -------- |
| QFVC                 | QFVC-XXX | QFVC-009 |
| Natural Intelligence | NI-XXX   | NI-005   |
| Content Protection   | CP-XXX   | CP-007   |
| Trust/Identity       | TI-XXX   | TI-005   |
| Resonance/Comm       | RC-XXX   | RC-003   |
| Economic             | EC-XXX   | EC-003   |

---

## Claim Writing Rules

### Independent Claim Structure:

```
A method for [DOING SOMETHING] comprising:
a) [first step];
b) [second step];
c) [third step]; and
d) [final step].
```

### Dependent Claim Structure:

```
The method of claim [N] wherein [specific limitation].
```

### Tips:

- Start broad (independent), get specific (dependent)
- Use "comprising" (open-ended) not "consisting of" (closed)
- Each step in a method claim is lettered (a, b, c...)
- Reference prior claims by number

---

## Filing Reminders

⚠️ **BEFORE PUBLIC DISCLOSURE:**

- File provisional within 12 months (US)
- File BEFORE disclosure for international rights

⚠️ **PROVISIONAL → NON-PROVISIONAL:**

- Must file non-provisional within 12 months
- Or lose priority date

⚠️ **MAINTENANCE FEES:**

- Due at 3.5, 7.5, and 11.5 years after grant
- Miss = patent expires

---

## Quick Reference Files

| File                                 | Purpose                      |
| ------------------------------------ | ---------------------------- |
| `OHM_PATENT_PORTFOLIO_MASTER.md`     | Overview of all patents      |
| `OHM_PATENT_PORTFOLIO_COMPLETE.md`   | Detailed breakdown           |
| `USPTO_PRO_SE_FILING_GUIDE.md`       | How to file without attorney |
| `USPTO_*_Provisional_Application.md` | Ready-to-file documents      |
| `scripts/make-patents-editable.mjs`  | Batch: make HTML editable    |
| `scripts/add-signature-pad.mjs`      | Batch: add signature canvas  |

---

## Example: Adding a New QFVC Patent

1. **Discovery:** Found new compression technique using Platonic solids

2. **Document:**

   ```markdown
   # Patent Opportunity: Platonic Solid Frame Interpolation

   ## Innovation Summary

   Use 5 Platonic solids to encode frame transition types...
   ```

3. **Add to `OHM_PATENT_PORTFOLIO_MASTER.md`:**

   ```markdown
   | 9 | QFVC-009 | **Platonic Solid Frame Interpolation** | Original OHM |
   ```

4. **Add to `USPTO_QFVC_Provisional_Application.md`:**

   - Component 8: Platonic Solid Frame Interpolation
   - Claim 19: Independent claim
   - Claims 20-21: Dependent claims

5. **Commit:**
   ```
   patent: Add QFVC-009 Platonic Solid Frame Interpolation
   ```

---

_"Every Innovation Deserves Protection"_
