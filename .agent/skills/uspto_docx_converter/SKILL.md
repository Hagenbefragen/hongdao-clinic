---
name: USPTO DOCX Converter
description: Convert patent HTML specifications to USPTO-compliant DOCX format for filing. Handles formatting requirements (margins, fonts, spacing) per 37 CFR § 1.52 and Patent Center DOCX guidelines.
group: smart.docs
---

# USPTO DOCX Converter Skill

## Purpose

Converts patent HTML specification documents to **USPTO-compliant DOCX format** for Patent Center filing.

## When To Use

- Converting provisional or non-provisional patent specifications from HTML to DOCX
- Preparing for non-provisional filing (DOCX required to avoid $400/$160/$80 surcharge)
- Creating DOCX versions of provisional applications (optional but recommended)

## USPTO DOCX Format Requirements (37 CFR § 1.52)

All DOCX files filed via Patent Center must comply:

| Requirement                  | Value                                                      |
| ---------------------------- | ---------------------------------------------------------- |
| **Paper size**               | Letter (8.5" × 11") or A4                                  |
| **Left margin**              | ≥ 2.5 cm (1 inch)                                          |
| **Top/Bottom/Right margins** | ≥ 2 cm (3/4 inch)                                          |
| **Font**                     | Arial, Courier New, or Times New Roman                     |
| **Font size**                | 12pt preferred                                             |
| **Line spacing**             | 1.5 or double-spaced                                       |
| **Columns**                  | Single column only                                         |
| **Page numbers**             | Consecutive, centered at bottom                            |
| **Section starts**           | Specification, Claims, and Abstract each start on new page |
| **No macros**                | Document must not contain macros                           |
| **Tables**                   | Must maintain column/row alignment                         |

## Surcharge Applicability

| Application Type            | DOCX Required?   | Non-DOCX Surcharge                  |
| --------------------------- | ---------------- | ----------------------------------- |
| **Provisional**             | ❌ No (exempt)   | $0                                  |
| **Non-provisional utility** | ✅ Yes           | $430 large / $172 small / $86 micro |
| **Continuation**            | ✅ Yes           | $430 large / $172 small / $86 micro |
| **Divisional**              | ✅ Yes           | $430 large / $172 small / $86 micro |
| **PCT National Stage**      | ❌ No (exempt)   | $0                                  |
| **Design**                  | ❌ No (exempt\*) | $0                                  |

\*Design DOCX filing is newly available as of Feb 2026 but not required.

## How To Use

### Step 1: Install dependencies

```powershell
cd C:\ohm\Documentation\Patents
npm install html-to-docx
```

### Step 2: Run the conversion script

```powershell
node C:\ohm\.agent\skills\uspto_docx_converter\scripts\convert-patent-to-docx.cjs --input "path/to/patent.html" --output "path/to/patent.docx"
```

### Step 3: Verify output

Open the DOCX in Word/Google Docs to verify:

- [ ] All sections present (Title, Background, Summary, Detailed Description, Claims, Abstract)
- [ ] Page numbers present and centered
- [ ] Margins correct (1" left, 3/4" top/bottom/right)
- [ ] Font is Times New Roman 12pt
- [ ] Line spacing is 1.5x or double
- [ ] No macros
- [ ] Tables properly aligned

### Step 4: Upload auxiliary PDF

When filing via Patent Center, also upload a PDF version alongside the DOCX as backup.

## Script Location

`C:\ohm\.agent\skills\uspto_docx_converter\scripts\convert-patent-to-docx.cjs`

## Notes

- Provisional applications do NOT require DOCX format; however, having DOCX ready accelerates non-provisional conversion
- The 12-month conversion deadline from provisional priority date is a HARD deadline (§ 111(b)(5))
- When filing the non-provisional, the specification MUST be in DOCX to avoid the surcharge
