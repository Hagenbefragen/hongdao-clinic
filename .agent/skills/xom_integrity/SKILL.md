---
name: XOM Integrity Checker
description: Autonomous audit skill that verifies XOM amounts flow correctly through the entire invite/payment pipeline. Ensures guests receive exactly what admins specify — no silent capping, no rounding, no fee erosion.
group: smart.backend
---

# 💎 XOM Integrity Checker — Sovereign Economy Audit Skill

> "Every XOM must be accounted for. No silent modifications. No hidden fees. No rounding errors."

## Overview

This skill performs an end-to-end audit of XOM flows across the OHM ecosystem. It traces the lifecycle of every XOM transfer from admin configuration through backend processing to guest wallet credit, ensuring **exact amount fidelity**.

---

## When to Invoke

- After any change to invite, payment, or XOM-related code
- During `/bestpractice` or `/audit_BP` audits
- When a user reports a balance discrepancy
- During `/featurerequest` for any feature touching XOM/payments
- Part of the Ship Engine pre-deployment checklist

---

## Audit Checklist

### Phase 1: Frontend Configuration Audit

- [ ] **Find all XOM configuration UIs** — search for `xomBonus`, `bonusAmount`, `xom`, `balance` in frontend components
- [ ] **Verify NO mock/fake API calls** — search for `setTimeout` + `Math.random` in invite/payment handlers
- [ ] **Check cap alignment**: Frontend max limits MUST match backend caps exactly:

| Role           | Frontend Max | Backend Max |
| -------------- | ------------ | ----------- |
| GenesisCreator | 10,000       | 10,000      |
| admin          | 100          | 100         |
| guardian       | 50           | 50          |
| standard       | 10           | 10          |

- [ ] **Verify response consumption**: Frontend MUST use `data.xomBonus` (the actual granted amount) not the UI input value

### Phase 2: Backend Service Audit

- [ ] **Trace the generate flow**: `Controller → Service.generateInvite() → DB save`
- [ ] **Check for silent capping**: Any `if (xomBonus > X) xomBonus = X` MUST be reported back in the response
- [ ] **Verify the response includes the actual capped amount**: `return { xomBonus: invite.xomBonus }`
- [ ] **Check redemption arithmetic**:
  ```
  newBalance = parseFloat(String(user.xomBalance || 0)) + invite.xomBonus
  ```
  - Must use `parseFloat` + `String()` wrapping to handle DB nulls
  - Must not use `Math.round()` or `toFixed()` on the sum
- [ ] **Verify vesting**: `lockedXomBalance += invite.xomBonus` must match `xomBalance +=`

### Phase 3: End-to-End Amount Tracing

For any given XOM amount X specified by admin:

```
Frontend UI:    User sets X
API Request:    POST body contains { xomBonus: X }
Backend Cap:    If X > roleMax → cappedX = roleMax (MUST return cappedX in response)
DB Save:        invite.xomBonus = cappedX
Redeem:         user.xomBalance += cappedX
Response:       { newBalance: oldBalance + cappedX, message: "Welcome Bonus of {cappedX} XOM" }
Frontend Show:  Display cappedX (with warning if cappedX ≠ X)
```

### Phase 4: Cross-Module Consistency

There are TWO invite modules in the backend — audit BOTH:

1. **`backend/src/invites/`** — Team/session invites (`InvitesService`, `TeamInvite` entity)

   - Used by: `InviteConfigurationModal`, `StreamInvitePlugin`
   - Caps: Role-based (Genesis=10K, Admin=100, Guardian=50, Standard=10)

2. **`backend/src/invite/`** — Trust invites (`InviteService`, `TrustInvite` entity)
   - Used by: `TrustInviteCreator`
   - Caps: Trust score capped at creator's own score
   - XOM: Default 0 (trust-focused, not XOM-focused)

**Both must be audited** — they use different entities and different capping logic.

### Phase 5: Real-Time Billing Splitter Audit

Verify per-minute XOM billing flows correctly through the OHM Splitter:

- [ ] **Controller arithmetic**: The billing controller MUST pass the full per-minute rate to the service. Do NOT divide by 60 — the frontend calls once per minute.

  - File: `backend/src/streaming/billing/stream-billing.controller.ts`
  - Check: `processBillingTick(guestId, hostId, roomId, dto.effectiveRate)` — no division

- [ ] **Platform fee split**: `StreamBillingService.processBillingTick()` must:
  ```
  platformFee = amount * 0.07
  hostEarnings = amount - platformFee
  ```
- [ ] **Host credit is atomic**: `userRepo.increment({ id: hostId }, 'xomBalance', hostEarnings)` — NOT `userRepo.save()`

- [ ] **Response completeness**: `BillingTickResult` must return ALL split fields:

  - `deducted`: full amount deducted from guest
  - `hostEarnings`: amount credited to host (after fee)
  - `platformFee`: platform fee amount
  - `guestNewBalance`: guest's remaining balance

- [ ] **Frontend consistency**: Guest payments passed to `HostPricingWidget` as `totalGuestPayments` must be the GROSS amount (before fee). The widget applies the 7% split itself via `calculateHostCost()`. Do NOT pre-deduct the fee in `useVCBilling.ts`.

- [ ] **Display equation must hold**:

  ```
  Guest Payments (gross) = Net Earnings (to host) + Platform Fee (7%)
  Guest Spend (total session) = Sum of all billing ticks
  ```

- [ ] **`syncEarnings` endpoint**: Currently Memory Mode (no-op). When production-ready, must sync actual credited amounts from `StreamBillingService`, not local frontend calculations.

### Phase 6: Webhook Billing Adapter Audit

Verify LiveKit webhook events correctly route to billing adapters:

- [ ] **Partner ID passthrough**: `VcWebhookController.handleRoomFinished()` must pass `partnerId` to `BillingFactory.getAdapter()`. Check for dead-code ternaries like `partnerId ? undefined : undefined` that silently swallow the value.
- [ ] **Dynamic cost calculation**: `totalCost` in webhook handlers must use the room's configured rate, NOT hardcode `durationMinutes * 0.1`.
- [ ] **Adapter resolution**: `BillingFactory.getAdapter(partnerId)` must return `WebhookBillingAdapter` when partnerId is truthy, `XomBillingAdapter` when falsy.
- [ ] **XomBillingAdapter stubs**: Check that `creditTokens()` and `onSessionFinished()` are not no-ops if billing should be active.

### Phase 7: Plugin Registry Completeness Audit

Verify ALL frontend plugins are actually wired into the system:

- [ ] **Import ≠ Registration**: Search `plugins/index.ts` for all `import` statements. Every imported plugin MUST have a corresponding `vcPluginRegistry.register()` call. Imported-but-never-registered plugins are invisible.
- [ ] **Log count matches actual**: The console log count (e.g., "All 40 plugins registered") must match the actual number of `.register()` calls.
- [ ] **Core vs Lazy**: Core plugins (chat, hand raise, auction) should be registered synchronously. Feature plugins can be lazy-loaded via `await import()`.
- [ ] **Visibility filter check**: Plugins must set `showForHost`, `showForGuest`, `showInStream`, `showInVC` correctly or they won't appear in the Tools sidebar.
- [ ] **EXCLUDED_PLUGIN_IDS alignment**: Check `usePluginFiltering.tsx` — excluded IDs must match plugins that are genuinely handled elsewhere (privacy group, audio settings, etc.).

---

## Known Historical Bugs

| Bug ID   | Issue                                      | Root Cause                            | Status              |
| -------- | ------------------------------------------ | ------------------------------------- | ------------------- |
| BUG-170  | Guests got 666 XOM instead of 7777         | Legacy 1000 XOM cap in InvitesService | ✅ Fixed            |
| BUG-289  | Invite XOM discrepancy                     | Unknown balance mismatch              | ✅ Archived         |
| BUG-291  | Invite XOM inconsistency                   | Duplicate invite paths                | ✅ Archived         |
| MOCK-001 | InviteConfigurationModal was 100% mock     | setTimeout fake, never hit API        | ✅ Fixed 2026-02-17 |
| CAP-001  | Frontend Genesis cap 1000 ≠ Backend 10000  | Hardcoded mismatch                    | ✅ Fixed 2026-02-17 |
| CAP-002  | Silent backend capping, no user warning    | No `adjustedWarning` in response      | ✅ Fixed 2026-02-17 |
| BILL-001 | Controller divided effectiveRate by 60     | Guests under-charged by 98.3%         | ✅ Fixed 2026-02-17 |
| BILL-002 | Frontend ignored billing tick split data   | No audit trail of platformFee/host    | ✅ Fixed 2026-02-17 |
| BILL-003 | `syncEarnings` endpoint is Memory Mode     | Returns stub data, no persistence     | ⚠️ Known Debt       |
| HOOK-001 | Partner webhook ternary dead code          | `partnerId ? undefined : undefined`   | ✅ Fixed 2026-02-17 |
| PLUG-001 | `chatPlugin` imported but never registered | Fire Chat invisible in Tools sidebar  | ✅ Fixed 2026-02-17 |
| PLUG-002 | `handRaisePlugin` imported not registered  | Hand Raise invisible in Tools sidebar | ✅ Fixed 2026-02-17 |

---

## Integration Points

This skill should be triggered as part of:

- **Ship Engine** (`/ship`): Pre-deployment XOM sanity check
- **Best Practice Audit** (`/audit_BP`): Economy dimension scoring
- **Feature Request** (`/featurerequest`): If feature touches XOM/payment/invite
- **Bug Bounty** (`/bugbounty`): When economy bugs are reported
- **Funnel Orchestrator**: Stage 7 (Payment) verification

---

## Quick Command

```
/xom_integrity
```

Runs the full 7-phase audit and outputs a report with:

- ✅ Passing checks
- ⚠️ Warnings (silent caps, mismatches)
- 🚨 Critical failures (mock code, missing API calls, arithmetic errors, dead-code ternaries, unregistered plugins)

---

_Skill created: 2026-02-17 | Version 1.0 | Created via Skill Forge_

<!-- Skill Forge Update: 2026-02-17 — Added Phase 6 (Webhook Billing Adapter Audit) and Phase 7 (Plugin Registry Completeness Audit) based on live audit findings. Added HOOK-001, PLUG-001, PLUG-002 to bug table. -->
