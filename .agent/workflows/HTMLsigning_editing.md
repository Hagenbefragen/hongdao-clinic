---
description: Make HTML documents editable with signature canvas pads (click-to-edit fields, auto-save, print-ready). Also enforces deep-linked sources and abbreviation tooltips with one-sentence explanations.
---

# /HTMLsigning_editing — Editable Fields + Digital Signature Pads for HTML Documents

## When to Use

Use this workflow when:

- A new HTML document needs editable form fields (names, dates, addresses, etc.)
- A document needs one or more digital signature canvas pads (touchpad/stylus/mouse)
- You want print-ready output (fields clean up, signatures render as images)
- You need to batch-process multiple HTML files at once

---

## Reusable Assets

| Asset                         | Path                                                                     | Purpose                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **Batch Editable Injector**   | `scripts/make-patents-editable.mjs`                                      | Processes all `USPTO_*.html` files — injects toolbar, editable fields, signature pad, auto-save JS |
| **Signature Pad Injector**    | `scripts/add-signature-pad.mjs`                                          | Adds only the signature canvas to files that already have editable fields                          |
| **Switzerland Fixer**         | `scripts/fix-switzerland.mjs`                                            | Makes hardcoded country names editable                                                             |
| **Patent Example (1 sig)**    | `Documentation/Patents/USPTO_QFVC_Provisional_Application.html`          | Reference: single signature pad                                                                    |
| **Vereinsstatuten (2 sigs)**  | `Documentation/OHM_LEGAL_Structure/OHM-Vereinsstatuten.html`             | Reference: dual signature pads (Präsident + Vizepräsident)                                         |
| **Generalvollmacht (3 sigs)** | `Documentation/OHM_LEGAL_Structure/OHM-Generalvollmacht-SideLetter.html` | Reference: triple signature pads + bilingual DE/EN                                                 |

---

## Feature Checklist

Every editable HTML document MUST include:

- [ ] **Editable Fields** — `<span class="editable" contenteditable="true" data-field="fieldName" data-placeholder="Placeholder Text">Placeholder Text</span>`
- [ ] **Signature Canvas** — One or more `<canvas id="sigCanvasN">` pads with draw/save/clear/load logic
- [ ] **Auto-Save** — All field values + signatures saved to `localStorage` with a document-specific key
- [ ] **Progress Banner** — Fixed bottom bar showing `X / Y fields filled` status
- [ ] **Toolbar** — Fixed top bar with Print, Clear All buttons (hidden on print)
- [ ] **Print Styles** — Yellow highlights removed, toolbar/banner hidden, signature renders as `<img>` on print
- [ ] **Synced Fields** — Fields with the same `data-field` value auto-sync (e.g. name appears in header AND signature line)
- [ ] **Deep-Linked Sources** — Every source/citation/standard is a clickable `<a class="src-link">` linking to the original document (see Best Practice section below)
- [ ] **Abbreviation Tooltips** — Every abbreviation/acronym is wrapped in `<abbr title="Full Name — one sentence explanation">` (see Best Practice section below)

---

## Best Practice: Deep-Linked Sources (Mandatory for ALL HTML Documents)

Every source, citation, standard reference, or external organisation mentioned in an OHM HTML document **MUST** be a clickable deep link to the original source.

### Rules

1. **Use `a.src-link` class** for all source links — styled with teal color, subtle underline, and ↗ arrow on hover
2. **Always deep link** — link to the specific article, section, or page, NOT the homepage
3. **Use `target="_blank" rel="noopener"`** on all external links
4. **Never leave a source as plain text** — if you mention "Gartner 2025", it MUST link to the actual Gartner report

### CSS (inject before `</style>`)

```css
/* ══════════ SOURCE LINKS ══════════ */
a.src-link {
  color: var(--teal, #14b8a6);
  text-decoration: none;
  border-bottom: 1px solid rgba(20, 184, 166, 0.3);
  transition: all 0.2s;
  font-weight: 600;
}
a.src-link:hover {
  color: #5eead4;
  border-bottom-color: #5eead4;
  text-shadow: 0 0 8px rgba(20, 184, 166, 0.3);
}
a.src-link::after {
  content: " ↗";
  font-size: 0.55rem;
  opacity: 0.5;
}
a.src-link:hover::after {
  opacity: 1;
}
```

### HTML Example

**Before (BAD — plain text source):**

```html
<td>Gartner 2025</td>
```

**After (GOOD — clickable deep link):**

```html
<td>
  <a
    class="src-link"
    href="https://www.gartner.com/en/articles/intelligent-agent-in-ai"
    target="_blank"
    rel="noopener"
    >Gartner 2025</a
  >
</td>
```

### Reference File

- `Documentation/VC-EXIT/target-pitches/SUMMIT/AAQA_Standardisation_Proposal.html` — full example with 15+ deep-linked sources

---

## Best Practice: Abbreviation Tooltips (Mandatory for ALL HTML Documents)

Every abbreviation/acronym in an OHM HTML document **MUST** be wrapped in an `<abbr>` tag with a `title` attribute containing a one-sentence explanation.

### Rules

1. **Wrap every abbreviation on first use** with `<abbr title="Full Name — one sentence explanation">ABBR</abbr>`
2. **Title format**: `"Full Expansion — one sentence explaining what it is/does"` (em-dash separator)
3. **Pure CSS tooltips** — no JavaScript needed, hover reveals the explanation
4. **Repeat in each section** if the document is long (readers may jump to a section)

### CSS (inject before `</style>`)

```css
/* ══════════ ABBREVIATION TOOLTIPS ══════════ */
abbr[title] {
  text-decoration: none;
  border-bottom: 1px dotted rgba(20, 184, 166, 0.5);
  cursor: help;
  position: relative;
  color: inherit;
}
abbr[title]:hover {
  border-bottom-color: var(--teal, #14b8a6);
  color: var(--teal, #14b8a6);
}
abbr[title]:hover::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: #f0f4ff;
  border: 1px solid rgba(20, 184, 166, 0.4);
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 0.6rem;
  font-style: normal;
  font-weight: 400;
  max-width: 400px;
  white-space: normal;
  z-index: 999;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  pointer-events: none;
  line-height: 1.4;
}
```

### HTML Example

**Before (BAD — raw abbreviation):**

```html
<td>NIST AI RMF 1.0</td>
```

**After (GOOD — tooltip with explanation):**

```html
<td>
  <abbr
    title="National Institute of Standards and Technology — US federal agency for measurement standards"
    >NIST</abbr
  >
  AI
  <abbr
    title="Risk Management Framework — systematic approach to managing AI risks"
    >RMF</abbr
  >
  1.0
</td>
```

### Common OHM Abbreviations Reference

| Abbreviation  | Title Attribute                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `AAQA`        | `Autonomous Agent Quality Assurance — proposed standard for runtime verification of AI agent task execution`     |
| `POAW`        | `Proof of Agent Work — OHM's reference implementation of the AAQA standard`                                 |
| `NIST`        | `National Institute of Standards and Technology — US federal agency for measurement standards`                   |
| `NWIP`        | `New Work Item Proposal — the formal ISO/IEC submission form to start a new international standard`              |
| `ISO/IEC`     | `International Organization for Standardization / International Electrotechnical Commission`                     |
| `FRAND`       | `Fair, Reasonable, And Non-Discriminatory — licensing commitment for standard-essential patents`                 |
| `CSPRNG`      | `Cryptographically Secure Pseudo-Random Number Generator — software-based randomness meeting security standards` |
| `QRNG`        | `Quantum Random Number Generator — hardware-based true randomness from quantum phenomena`                        |
| `SHA-256`     | `Secure Hash Algorithm 256-bit — a cryptographic hash function producing a fixed 256-bit digest`                 |
| `USPTO`       | `United States Patent and Trademark Office — the federal agency granting US patents`                             |
| `EU AI Act`   | `European Union Artificial Intelligence Act — the world's first comprehensive AI regulation`                     |
| `IEEE`        | `Institute of Electrical and Electronics Engineers — global standards body for technology`                       |
| `CBOR`        | `Concise Binary Object Representation — binary-encoded serialization format based on JSON`                       |
| `SOC 2`       | `Service Organization Control Type 2 — an auditing standard for service providers managing data`                 |
| `SDG`         | `Sustainable Development Goal — one of 17 UN global goals for 2030`                                              |
| `CEN/CENELEC` | `European Committee for Standardization / European Committee for Electrotechnical Standardization`               |
| `NI Stack`    | `Natural Intelligence Stack — OHM's sovereign AI safety architecture`                                            |
| `OMB`         | `Office of Management and Budget — executive office that oversees federal agency performance`                    |
| `AISIC`       | `AI Safety Institute Consortium — NIST-led public-private partnership for AI safety`                             |

### Reference File

- `Documentation/VC-EXIT/target-pitches/SUMMIT/AAQA_Standardisation_Proposal.html` — full example with 20+ abbreviation tooltips

---

## Step 1: Identify Target Fields

// turbo

Open the target HTML file and identify:

1. **Bracket placeholders** — `[Name]`, `[Date]`, `[Address]`, etc.
2. **Hardcoded values** that should be editable — city names, country names, dates
3. **Signature blocks** — lines like `_____________` or `sig-placeholder` divs
4. **How many signers** — 1 (patent), 2 (Vereinsstatuten), 3 (Generalvollmacht), etc.

---

## Step 2: Add CSS

// turbo

Inject the following CSS block before `</style>`:

```css
/* ══════════ EDITABLE FIELDS ══════════ */
.editable {
  background: #fffde7;
  border-bottom: 2px dashed #f59e0b;
  padding: 1px 6px;
  cursor: text;
  transition: all 0.2s;
  border-radius: 2px;
  min-width: 60px;
  display: inline-block;
}
.editable:hover {
  background: #fef3c7;
  border-bottom-color: #d97706;
}
.editable:focus {
  background: #fef9c3;
  border-bottom-color: #b45309;
  outline: none;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.3);
}
.editable.filled {
  background: #ecfdf5;
  border-bottom-color: #10b981;
}

/* ══════════ SIGNATURE PAD ══════════ */
.sig-pad-section {
  margin-top: 16px;
  padding: 16px;
  border: 2px solid #1e293b;
  border-radius: 8px;
  background: #f8fafc;
}
.sig-pad-section h4 {
  margin: 0 0 8px 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e293b;
}
.sig-pad-wrap {
  position: relative;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  background: #fff;
  cursor: crosshair;
  touch-action: none;
  margin-bottom: 8px;
}
.sig-pad-wrap canvas {
  display: block;
  width: 100%;
  border-radius: 4px;
}
.sig-pad-wrap .sig-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #bbb;
  font-size: 14px;
  pointer-events: none;
  user-select: none;
}
.sig-pad-actions {
  display: flex;
  gap: 8px;
}
.sig-pad-actions button {
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  border: 1px solid #e2e8f0;
  background: #fff;
}
.sig-pad-actions button:hover {
  background: #f1f5f9;
}
.sig-pad-status {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 4px;
}
.sig-pad-status.done {
  color: #059669;
  font-weight: 600;
}
.sig-print-img {
  display: none;
  max-width: 300px;
}

/* ══════════ EDIT BANNER ══════════ */
.edit-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: #000;
  padding: 8px 20px;
  font-family: system-ui, sans-serif;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.2);
}
.edit-banner .progress {
  font-weight: 700;
}

/* ══════════ PRINT ══════════ */
@media print {
  .edit-banner {
    display: none !important;
  }
  .editable {
    background: none !important;
    border-bottom: none !important;
    padding: 0 !important;
    box-shadow: none !important;
  }
  .sig-pad-section {
    border: none;
    padding: 0;
    background: none;
  }
  .sig-pad-section h4 {
    display: none;
  }
  .sig-pad-wrap {
    border: none;
    background: none;
  }
  .sig-pad-wrap .sig-hint {
    display: none;
  }
  .sig-pad-actions {
    display: none !important;
  }
  .sig-pad-status {
    display: none !important;
  }
  .sig-print-img {
    display: block !important;
  }
}
```

---

## Step 3: Replace Placeholders with Editable Spans

// turbo

Convert bracket placeholders to editable spans:

**Before:**

```html
<strong>[Name des Gründers]</strong>
```

**After:**

```html
<strong
  ><span
    class="editable"
    contenteditable="true"
    data-field="founderName"
    data-placeholder="Name des Gründers"
    >Name des Gründers</span
  ></strong
>
```

### Field Naming Convention

| Field                   | data-field                      | data-placeholder              |
| ----------------------- | ------------------------------- | ----------------------------- |
| Inventor / Founder Name | `founderName` or `inventorName` | `Your Full Legal Name`        |
| Email                   | `email`                         | `your@email.com`              |
| Phone                   | `phone`                         | `+1 (555) 000-0000`           |
| Street Address          | `streetAddress`                 | `Your Street Address`         |
| City / Postal           | `cityPostal`                    | `City, Postal Code`           |
| Country                 | `country`                       | `Switzerland` or `Österreich` |
| Citizenship             | `citizenship`                   | `Your Citizenship`            |
| Date                    | `sigDatum`                      | `__.__.2026`                  |
| Place                   | `sigOrt`                        | `Graz`                        |
| ZVR Number              | `zvrNr`                         | `[Pending]`                   |
| Präsident Name          | `praesident`                    | `Vor- und Nachname`           |
| Vizepräsident Name      | `vizepraesident`                | `Vor- und Nachname`           |

> 💡 Fields with the **same `data-field`** value auto-sync across the document (e.g. `founderName` appears in the header AND signature block).

---

## Step 4: Add Signature Pad HTML

// turbo

For each signer, add a signature canvas block. Replace existing `sig-placeholder` or `sig-line` divs:

```html
<div class="sig-pad-section">
  <h4>✍️ [Role Label, e.g. Präsident/in]</h4>
  <p style="font-size:0.8rem;color:#64748b;margin:0 0 8px;">
    Name:
    <span
      class="editable"
      contenteditable="true"
      data-field="praesident"
      data-placeholder="Vor- und Nachname"
      >Vor- und Nachname</span
    >
  </p>
  <div class="sig-pad-wrap">
    <canvas id="sigCanvas1"></canvas>
    <div class="sig-hint" id="sigHint1">Hier unterschreiben ✍️</div>
  </div>
  <img class="sig-print-img" id="sigPrint1" alt="Unterschrift" />
  <div class="sig-pad-actions">
    <button onclick="clearSig(1)" style="color:#dc2626;">🗑️ Löschen</button>
  </div>
  <div class="sig-pad-status" id="sigStatus1">Noch nicht unterschrieben</div>
</div>
```

> 🔢 Increment the number for each signer: `sigCanvas1`, `sigCanvas2`, `sigCanvas3`...

---

## Step 5: Add Progress Banner + Toolbar Buttons

// turbo

Add to the toolbar/nav area:

```html
<button onclick="clearAllFields()" style="background:#dc2626;color:#fff;">
  🗑️ Clear All
</button>
```

Add before `</body>`:

```html
<div class="edit-banner" id="editBanner">
  <span
    >✏️ <strong>Gelbe Felder anklicken</strong> um Daten einzutragen. Unten
    unterschreiben. Dann drucken.</span
  >
  <span class="progress" id="editProgress">0 / 0</span>
</div>
```

---

## Step 6: Add Auto-Save JavaScript

// turbo

Inject the full JS block before `</body>`. The JS template handles:

- Loading/saving editable fields to localStorage
- Drawing on canvas with mouse/touch/stylus
- Saving/loading/clearing signatures
- Progress counter
- Global clear function

**Key variables to customize per document:**

```javascript
var SK = "unique_document_key_fields"; // localStorage key for fields
var SIG_KEYS = ["unique_doc_sig1", "unique_doc_sig2"]; // one per signer
var SIG_COUNT = 2; // number of signature pads
```

> 📋 Copy the full JS implementation from any reference file (see Reusable Assets table above).

---

## Step 7: Verify + Commit

// turbo

1. **Open the file in a browser** — check yellow fields appear, signature pad draws
2. **Fill a field** — reload page, verify auto-save works
3. **Print preview** — verify clean output with signature image visible
4. **Commit:**

```powershell
git add [modified files]
git commit -m "docs: Add editable fields + signature pads to [document name]"
```

---

## Batch Processing (Multiple Files)

If processing many files at once, follow the pattern from `scripts/make-patents-editable.mjs`:

1. **Read the file** with `fs.readFileSync(path, 'utf-8')`
2. **Skip if already processed** — check `content.includes('sigCanvas')`
3. **Inject CSS** before `</style>`
4. **Replace bracket placeholders** with editable spans using regex
5. **Add signature HTML + JS** before `</body>`
6. **Write back** with `fs.writeFileSync(path, content, 'utf-8')`

> ⚠️ Always use **Node.js** (`*.mjs`) for batch processing, NOT PowerShell. PowerShell has encoding issues with em-dashes and UTF-8 HTML.

---

## Language Support (Bilingual Documents)

For DE/EN documents like the Generalvollmacht:

- Wrap editable spans inside both `<span class="lang-de">` and `<span class="lang-en">` blocks
- Use the **same `data-field`** value in both languages so the value syncs
- The CSS `body.lang-de .lang-en { display: none; }` handles visibility

---

_"Every document deserves a proper signature."_ ✍️
