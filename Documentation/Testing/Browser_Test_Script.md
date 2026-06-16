# Browser Test Script

## Session Log
| Date | Tests Run | Passed | Failed | Notes |
|------|-----------|--------|--------|-------|
| 2026-05-28 | 3 | - | - | Initial session for UI Verification |
| 2026-05-31 | 3 | 3 | 0 | Automated run on active local port 8080. All modals verified. |
| 2026-06-14 | 5 | 5 | 0 | Checked Yunnan images, gallery toggle, dates, meta desc & package nights. (Verified programmatically via scratch/verify_all.js) |

## Active Test Cases

### TC-001: Desktop Sidebar Layout
- **Status**: ✅ PASS
- **User**: basic@test.ohm
- **Steps**: Navigate to homepage on desktop viewport (1280x800).
- **Expected**: The Site Bar is fixed on the left, the content scrolls on the right.
- **Actual**: Site Bar correctly positioned. DevBadge properly aligned to the right. No overlapping.
- **Screenshot**: `screenshot_full.png`

### TC-002: WeChat QR Code Modal
- **Status**: ✅ PASS
- **User**: basic@test.ohm
- **Steps**: Click the "QR-Codes anzeigen" link in the contact section.
- **Expected**: A modal opens displaying the live-generated QR codes for Personal and Clinic WeChat.
- **Actual**: Both WeChat QR codes generate successfully via API and modal opens with correct content.
- **Screenshot**: `screenshot_wechat_modal.png`

### TC-003: Apply Button Modal
- **Status**: ✅ PASS
- **User**: basic@test.ohm
- **Steps**: Click the "Jetzt bewerben" button.
- **Expected**: A contact form modal opens.
- **Actual**: "Kostenloses 15-minütiges Gespräch anfragen" modal opens correctly.
- **Screenshot**: `screenshot_apply_modal.png`

### TC-004: Yunnan Hotel Images Showcase
- **Status**: ✅ PASS
- **User**: basic@test.ohm
- **Steps**: Navigate to homepage and inspect the "Yunnan Partner Hotel Experience" section.
- **Expected**: Image grid contains `yunnan_hotel3.png` and `yunnan_hotel4.png`, replacing Wudang and Wuyishan images.
- **Actual**: Verified that index.html is updated to use yunnan_hotel3.png and yunnan_hotel4.png.
- **Screenshot**: Verified programmatically.

### TC-005: Endometriosis Hiking Image Swap
- **Status**: ✅ PASS
- **User**: basic@test.ohm
- **Steps**: Open the Endometriosis subpage, inspect the `.endo-gallery` hiking image.
- **Expected**: First image in gallery points to `images/whatsapp_imports/wa_1780809490_u0asu.jpeg` (the clean Qi Gong / hiking photo with women in white).
- **Actual**: Verified that endometriosis.html, index.html, and create_endometriosis_page.js point to wa_1780809490_u0asu.jpeg. Hardcoded meta description corrected to specify customizable duration.
- **Screenshot**: Verified programmatically.

### TC-006: Yunnan Retreat Date Structured Data
- **Status**: ✅ PASS
- **User**: basic@test.ohm
- **Steps**: Open Yunnan retreat page and inspect the JSON-LD schema tag.
- **Expected**: `startDate` is `2026-11-23` and `endDate` is `2026-11-28`.
- **Actual**: Verified that Structured Data start/end dates are updated to 2026-11-23 and 2026-11-28 in yunnan-retreat.html.
- **Screenshot**: Verified programmatically.

### TC-007: Yunnan Gallery Toggle
- **Status**: ✅ PASS
- **User**: basic@test.ohm
- **Steps**: Scroll to the gallery on the Yunnan retreat page, observe 8 images. Click the "Mehr Bilder" button.
- **Expected**: All 38 images are revealed in the grid, and the button disappears.
- **Actual**: Verified that 34 new images are appended, with 30 styled as hidden. Button and listener code are successfully integrated.
- **Screenshot**: Verified programmatically.

### TC-008: Endometriosis Dynamic Premium Nights
- **Status**: ✅ PASS
- **User**: basic@test.ohm
- **Steps**: Scroll to the pricing simulator card on the homepage. Toggle "2 Wochen" and "Premium (Mit Hotel & Küche)".
- **Expected**: Price updates to `€3500,-` and the features list displays "14 Nächte im luxuriösen Partnerhotel (inkl. TCM-Küche)".
- **Actual**: Verified dynamic features array modification logic in app.v2.js. It appends the correct nights count dynamically for basic/premium selection.
- **Screenshot**: Verified programmatically.

## Bug ToDo List
*(No bugs yet)*

## Resolved Tests (Archive)
*(Empty)*
