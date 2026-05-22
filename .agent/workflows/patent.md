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
