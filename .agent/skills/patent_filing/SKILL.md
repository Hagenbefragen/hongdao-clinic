---
name: USPTO Patent Filing (AI-Enhanced Browser Navigation)
description: File a provisional patent application on USPTO Patent Center with AI-guided browser navigation. Human-in-the-loop for credentials, payments, and final submission.
group: smart.docs
---

# USPTO Patent Filing — AI-Enhanced Browser Navigation

AI-guided filing of provisional patent applications on the USPTO Patent Center.
The agent handles navigation, form-filling, and document uploads while the user handles:

- Login / authentication (credentials)
- Payment (credit card)
- Final submission (submit button click)

## Prerequisites

- **⚖️ Patent Law Research:** Check `resources/PATENT_LAW_RESEARCH_CHECKLIST.md` — if `Last Researched` date is >90 days old, execute all 10 research queries via `search_web` before proceeding. Covers § 101 Alice/Mayo, § 112 enablement, claim formatting, fees, IDS, and filing procedures.
- A **filing-ready patent HTML** in `Documentation/Patents/*/FILING/` (printed to PDF)
- A **USPTO.gov account** (create at https://account.uspto.gov if needed)
- A **credit card** for the filing fee (~$80 micro entity provisional, ~$455 micro entity non-provisional)
- The patent HTML must be exported to PDF before filing

## IMPORTANT SAFETY RULES

1. **NEVER click "Submit" or "File" or any final submission button** — always ask the user to review and click themselves
2. **NEVER enter credentials** — always pause and ask the user to log in
3. **NEVER enter payment information** — always pause and ask the user to enter card details
4. **Always screenshot the current state** before and after each major step
5. **Always wait for user confirmation** before proceeding to the next phase

## Phase 0: Pre-Flight — Export Patent to PDF

Before filing, the patent HTML must be exported to a PDF for upload:

1. Open the patent HTML file in Chrome
2. Ask the user to:
   - Fill in all editable fields (inventor name, address, etc.)
   - Sign the signature canvas
   - Type their S-Signature in the `/Name/` field
3. Once all fields are filled, use Print → Save as PDF
4. Save the PDF to `Documentation/Patents/*/FILING/` alongside the HTML

**PAUSE: Ask user to confirm the PDF looks correct before proceeding.**

## Phase 1: Navigate to USPTO Patent Center

1. Open browser to: `https://patentcenter.uspto.gov/`
2. Screenshot the page
3. **HUMAN ACTION REQUIRED:**
   - Tell the user: "🔐 Please log in to your USPTO.gov account. Click in the browser and enter your credentials. Tell me when you're logged in and see the Patent Center dashboard."
   - Wait for user confirmation

## Phase 2: Start New Submission

Once logged in to the Patent Center dashboard:

1. Screenshot the dashboard
2. Look for and click: **"New submission"** or **"File a new patent application"** button
3. Select application type: **"Provisional"** (under Utility)
4. Screenshot the selection page
5. Click to proceed to the next step

## Phase 3: Application Data — Web-ADS

Fill in the Web Application Data Sheet (Web-ADS):

### 3a. Application Type

- Select: **Utility — Provisional**
- Entity Status: **Micro Entity**

### 3b. Inventor Information

- Given Name: (from patent HTML `inventor-given` field)
- Family Name: (from patent HTML `inventor-family` field)
- Residence: City, State/Province, Country
- Mailing Address: from patent data

### 3c. Correspondence Address

- Use the inventor's address (for Pro Se filers)

### 3d. Title of Invention

- Enter the exact title from the patent:
  `RESONANCE-BASED ADVERSARIAL PROMPT DETECTION USING MULTI-DIMENSIONAL SEMANTIC COHERENCE ANALYSIS WITH QUANTUM-RANDOMIZED THRESHOLD MODULATION`

### 3e. Entity Status

- Select: **Micro Entity**
- Check the box: "Applicant certifies micro entity status under 37 CFR 1.29"

**PAUSE: Screenshot the completed form. Ask user to review all fields before proceeding.**

## Phase 4: Upload Documents

Upload the following documents to the Patent Center:

### Required Documents:

| Document                                | File Type                                             | Category to Select |
| --------------------------------------- | ----------------------------------------------------- | ------------------ |
| Patent Specification (PDF from Phase 0) | PDF                                                   | **Specification**  |
| Micro Entity Certification              | Built-in checkbox (no upload needed if using Web-ADS) | —                  |

### Optional but Recommended:

| Document                                        | File Type | Category to Select                   |
| ----------------------------------------------- | --------- | ------------------------------------ |
| IDS Form SB/08 (if filing with non-provisional) | PDF       | **Information Disclosure Statement** |

> **NOTE:** For provisional applications, IDS is NOT required and NOT recommended.
> The IDS is filed later with the non-provisional conversion.

### Upload Steps:

1. Click "Add Document" or "Upload"
2. Select category: "Specification"
3. Browse to the PDF file location
4. Upload the file
5. Verify the uploaded document appears in the file list
6. Screenshot the upload confirmation

**PAUSE: Ask user to verify the uploaded document is correct.**

## Phase 5: Review Application

1. Click "Review" or "Continue to Review"
2. Screenshot the full review page
3. Verify all information:
   - Inventor name and address correct
   - Title matches exactly
   - Entity status = Micro Entity
   - Document uploaded and listed
4. Report any discrepancies to the user

**PAUSE: Ask user to carefully review all information on screen.**

## Phase 6: Pay Filing Fee

1. Click "Pay" or "Proceed to Payment"
2. Verify the fee amount:
   - Micro Entity Provisional Filing Fee: **$80** (as of 2025/2026 fee schedule)
   - Total should be approximately $80 for micro entity
3. **HUMAN ACTION REQUIRED:**
   - Tell the user: "💳 Please enter your payment information (credit card). I cannot see or enter payment details. Tell me when payment is complete."
   - Wait for user confirmation

> **NOTE:** The fee previously stated as $320 was for a non-provisional.
> Provisional micro entity fee is currently ~$80 (verify on screen).

## Phase 7: Final Submission

1. Screenshot the final submission page
2. **CRITICAL — HUMAN ACTION REQUIRED:**
   - Tell the user: "⚠️ FINAL STEP: Please review everything one last time. When you are satisfied, YOU must click the 'Submit' button. I will NOT click it for you. This is your patent — you control the filing."
   - Wait for user confirmation that they clicked Submit

## Phase 8: Confirmation & Receipt

After submission:

1. Screenshot the confirmation page
2. Record the following information:
   - **Application Number** (format: 63/xxx,xxx for provisional)
   - **Filing Date** (the official USPTO filing date)
   - **Confirmation Number**
3. Save a screenshot of the receipt
4. Download the filing receipt PDF if available

## Phase 9: Post-Filing Documentation

After successful filing, update the following files:

### 9a. Update Innovation Journal

Add filing confirmation with application number:

```markdown
### Filing Confirmation

- **Application Number:** [from receipt]
- **Filing Date:** [from receipt]
- **Confirmation Number:** [from receipt]
- **Entity Status:** Micro Entity
- **Fee Paid:** $[amount]
```

### 9b. Update IP Fortress Report

Update the filing timeline and status:

```markdown
| Provisional filed | [date] | USPTO Application No. [number] |
```

### 9c. Update Patent Portfolio Master

Add the filing confirmation to the master portfolio document.

## Error Handling

### Common Issues:

- **"Session expired"**: Ask user to log in again, resume from last completed phase
- **"File upload failed"**: Retry upload; ensure PDF is under 25MB
- **"Entity status error"**: Verify micro entity qualification (< 4 prior patents, income < 3× median)
- **"Payment declined"**: Ask user to try a different payment method
- **"System maintenance"**: Note the time, try again later

### Recovery:

- The agent should track which phase was last completed
- On retry, skip completed phases and resume from the last incomplete one
- Always screenshot before and after each action for audit trail

## Filing Fee Reference (2025/2026)

| Fee Type                | Large   | Small   | Micro   |
| ----------------------- | ------- | ------- | ------- |
| Provisional Filing      | $320    | $160    | $80     |
| Non-Provisional Filing  | $1,820  | $910    | $455    |
| Excess Claims (>20)     | $100/ea | $50/ea  | $25/ea  |
| Excess Independent (>3) | $480/ea | $240/ea | $120/ea |

## Related Files

- Patent HTML: `Documentation/Patents/*/FILING/*.html`
- IDS HTML: `Documentation/Patents/IDS/*.html`
- Innovation Journal: `Documentation/Patents/NI-SHIELD/INNOVATION_JOURNAL.md`
- IP Fortress Reports: `Documentation/Patents/IP_FORTRESS_REPORT_*.md`
- Portfolio Master: `Documentation/Patents/OHM_PATENT_PORTFOLIO_MASTER.md`
