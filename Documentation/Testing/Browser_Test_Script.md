# Browser Test Script

## Session Log
| Date | Tests Run | Passed | Failed | Notes |
|------|-----------|--------|--------|-------|
| 2026-05-28 | 3 | - | - | Initial session for UI Verification |

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

## Bug ToDo List
*(No bugs yet)*

## Resolved Tests (Archive)
*(Empty)*
