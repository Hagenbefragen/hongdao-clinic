---
name: Stream Room E2E Flow
description: End-to-end skill to claim a stream room, invite friends with XOM/Trust, and verify the complete join flow.
group: smart.frontend
---

# Stream Room E2E Flow Skill

## Overview

This skill automates the full stream room lifecycle:

1. **Claim** a new room as host
2. **Invite** friends with XOM + Trust rewards
3. **Verify** friends can join via invite link
4. **Test** seamless portal switching (App ↔ Stream ↔ IDE)

---

## Prerequisites

- Host must be logged into `app.offlinehumanmode.com` or `stream.offlinehumanmode.com`
- Host must have GenesisCreator or Admin role
- Backend must be running with valid LiveKit keys

---

## Step 1: Claim a Stream Room

### 1.1 Navigate to Stream Landing

```
URL: https://stream.offlinehumanmode.com
```

### 1.2 Enter Room Name

- Click "Claim Your Room" / enter desired room name (e.g., `paradise-lounge`)
- Room names are case-insensitive and must be unique
- The `RoomClaimModal` opens with steps: check → auth → confirm → payment

### 1.3 Complete Claim

- If unauthenticated: SeamlessLogin modal appears — signup/login ON the stream domain (no redirect)
- After auth: `handleAuthSuccess` hydrates user into AppContext via `setCurrentUser()` (BUG-345 fix)
- Confirm step: Accept room ownership
- Payment step: XOM deduction (if applicable)
- On success: `sessionStorage.setItem('host_room_id', name)` + `window.location.reload()`

### 1.4 Verify Owner Dashboard

After reload, the routing plugin `streamDomainAuthPlugin` should detect `currentUser` and render the Stream Studio Dashboard with the claimed room.

**Expected:** Host sees Stream Studio Dashboard with room controls, NOT the landing page.

**If landing page shows instead:** This is BUG-345 (redirect loop). Check:

- `RoomClaimModal.tsx` — `handleAuthSuccess` must call `setCurrentUser()`
- `StreamLandingPageBig.tsx` — `onSuccess` must use `window.location.reload()` not `window.location.href = '/'`

---

## Step 2: Invite Friends

### 2.1 Generate Invite Links

From the Stream Studio Dashboard or App, create invitations:

```
API: POST /api/v1/invites/generate
Headers: { Authorization: Bearer <token> }
Body: {
  "channel": "link"
}
Response: {
  "code": "ABC123",
  "url": "https://app.offlinehumanmode.com/invite/ABC123",
  "channel": "link",
  "expiresAt": "2026-02-19T08:00:00.000Z"
}
```

Then share the invite link with the room URL appended with `?ref=<code>`:

```
https://stream.offlinehumanmode.com/paradise-lounge?ref=ABC123
```

### 2.2 Verify Reward Configuration

- **XOM Reward**: 777 XOM credited to invitee upon joining
- **Trust Reward**: 60 Trust Points added to invitee's trust score
- **Referral Bonus**: Host earns trust lineage from each invitee

---

## Step 3: Friend Joins via Invite Link

### 3.1 Friend Opens Invite URL

```
URL: https://stream.offlinehumanmode.com/paradise-lounge?invite=ABC123
```

### 3.2 Guest Flow

1. Friend sees Stream Landing Page with the room name pre-filled
2. If not logged in: SeamlessLogin modal opens for signup
3. After signup: Friend's account is created with:
   - 777 XOM welcome bonus
   - 60 Trust Points
   - Referral link back to the host
4. Friend is automatically redirected to the VC room

### 3.3 Verify Join

**Expected:**

- Friend sees the VC room with host's video
- Both host and friend can toggle mic/camera
- Guest control bar appears (BUG-339 fix: auto-hide delay + permanent Leave button)
- XOM and Trust rewards visible in friend's wallet

---

## Step 4: Test Seamless Portal Switching

### 4.1 App → Stream

```
From: https://app.offlinehumanmode.com
Click: Stream Studio link in sidebar/header
Expected: Opens https://stream.offlinehumanmode.com with user already logged in
Auth: Cross-domain SSO cookie (FEAT-065) OR auth_token query param
```

### 4.2 Stream → App

```
From: https://stream.offlinehumanmode.com
Click: OHM App link / logo
Expected: Opens https://app.offlinehumanmode.com with user already logged in
Auth: Same cross-domain cookie
```

### 4.3 App → IDE

```
From: https://app.offlinehumanmode.com
Click: IDE link (if added to navigation)
Expected: Opens https://ide.offlinehumanmode.com
Auth: HTTP Basic Auth prompt (username: ohm, password: configured)
Note: IDE uses separate auth (not SSO)
```

---

## Step 5: Automated Browser Test

Use `/browsertest` to verify the full flow:

```markdown
### TC-XXX: Stream Room E2E Flow

1. Navigate to stream.offlinehumanmode.com
2. Click "Claim Your Room"
3. Enter room name "test-room-{timestamp}"
4. Complete signup via SeamlessLogin
5. Verify: Stream Studio Dashboard loads (not landing page)
6. Generate invite link with 777 XOM + 60 Trust
7. Open invite link in incognito window
8. Sign up as new user via invite
9. Verify: VC room loads with host video visible
10. Verify: XOM balance shows 777
11. Verify: Trust score shows 60
12. Navigate to app.offlinehumanmode.com — verify logged in
13. Navigate back to stream.offlinehumanmode.com — verify logged in
```

---

## Known Issues & Fixes

| Issue                                     | Status      | Fix Location                                         |
| ----------------------------------------- | ----------- | ---------------------------------------------------- |
| BUG-345: Room claim redirect loop         | ✅ Fixed    | `StreamLandingPageBig.tsx` + `RoomClaimModal.tsx`    |
| BUG-339: Guest control bar missing        | ✅ Fixed    | `ControlBar.tsx` — auto-hide delay + permanent Leave |
| BUG-340: RoomClaimModal no user hydration | ✅ Fixed    | `RoomClaimModal.tsx` — `setCurrentUser()` after auth |
| IDE shows "VS Code" branding              | ℹ️ Cosmetic | Web server limitation — Gemini agent still works     |

---

## Troubleshooting

### Room claim shows landing page after reload

- Check `stream-domain.plugin.tsx` — `streamDomainAuthPlugin.shouldHandle` needs `!!ctx.currentUser`
- Check `RoomClaimModal.tsx` — `handleAuthSuccess` must set `setCurrentUser()` before proceeding
- Check `StreamLandingPageBig.tsx` — `onSuccess` must set `sessionStorage('host_room_id')` before reload

### Invite link doesn't pre-fill room name

- Check URL parsing in `StreamLandingPageBig.tsx` or routing plugin
- The invite code should be extracted from `?invite=` query param

### Cross-domain SSO not working

- Check backend CORS whitelist includes both `app.` and `stream.` subdomains
- Check cookie `domain: '.offlinehumanmode.com'` is set in auth controller
- Check `sameSite: 'lax'` (not `'strict'`)

### XOM/Trust not credited after invite join

- Check invitation API endpoint validates and credits rewards
- Check XomBankService handles the reward transaction
- Check Trust Graph service processes the referral link

---

## Reference Files

| File                                                                      | Purpose                                  |
| ------------------------------------------------------------------------- | ---------------------------------------- |
| `frontend/components/stream/RoomClaimModal.tsx`                           | Room claim + auth flow                   |
| `frontend/components/streaming/StreamLandingPageBig.tsx`                  | Landing page + onSuccess handler         |
| `frontend/components/MainLayout/routing/plugins/stream-domain.plugin.tsx` | Auth/unauth routing                      |
| `frontend/hooks/usePortalLogin.ts`                                        | SSO in-memory hydration (PQC Phase 4)    |
| `frontend/config/portalRegistry.ts`                                       | Portal registry (GalaxyHeader switching) |
| `frontend/components/marketing/quantum/layout/GalaxyHeader.tsx`           | Portal Switcher with auth_token SSO      |
| `frontend/components/marketing/quantum/layout/ParadisePortalsGrid.tsx`    | Portal grid in footers with auth_token   |
| `backend/src/auth/auth.controller.ts`                                     | Cookie setting (.offlinehumanmode.com)   |
| `backend/src/invites/invite.controller.ts`                                | Invite generation + redeem endpoints     |
| `backend/src/streaming/stream-room-name.controller.ts`                    | Room claim + purchase + meetings         |
| `scripts/ide.nginx.conf`                                                  | Antigravity IDE Nginx config             |

---

_Skill created: 2026-02-11 | Updated: 2026-02-12 | Version 1.1_
