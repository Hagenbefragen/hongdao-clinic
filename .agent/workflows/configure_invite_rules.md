---
description: INVITE
---

# /configure_invite_rules - Unified Invite Configuration & Audit

**Use this workflow to implement or audit the exact Unified Invite parameters for the OHM ecosystem.**

This workflow enforces the "Genesis Creator" privileges, checks the 1000 XOM limit, ensures the vesting period configuration, and verifies "Gas-less" internal XOM usage.

// turbo
## 1. 🔍 Audit Invite Logic

Run this check to confirm:
- [ ] Genesis Creators can issue up to 1000 XOM bonuses.
- [ ] Standard Users are capped at 10 (or 100 for Admins).
- [ ] Bonuses are "Internal XOM" (database only, off-chain).
- [ ] Trust Links are established before funding.

```bash
grep -C 5 "GenesisCreator" backend/src/invites/invites.service.ts
grep -C 5 "xomBonus" backend/src/invites/invites.service.ts
```

## 2. 🛡️ Implement "Vesting & Gas-less" Rules

To ensure 360-day vesting and "Internal Only" usage (cannot withdraw), we must verify the `WalletService` and `XomBankService` logic.

### Rule 1: Gas-less Minting (Database Only)
- **Status**: ✅ IMPLEMENTED
- The `redeemInvite` function updates `user.xomBalance` in the PostgreSQL database.
- NO transactions are sent to the Polygon blockchain during invite redemption.
- **Verification**: Review `invites.service.ts` line 131 (`this.userRepo.update`).

### Rule 2: 360-Day Vesting on Welcome Bonus
- **Feature**: Prevent withdrawal of the specific "Welcome Bonus" amount for 360 days.
- **Implementation**:
    1.  We need a `vestingSchedule` or `lockedBalance` field in the User entity.
    2.  The `Withdraw` endpoint must check `availableBalance = xomBalance - lockedBalance`.
    3.  Transfers *within* the network (P2P, Marketplace) are allowed (ignore lock).

**Action**: If the user confirms, we will create/update the `lockedBalance` logic.

## 3. ⚙️ Configure Genesis Creator Limits

If you are a Genesis Creator and want to change the limits (e.g. increase from 1000 to something else, or change the vesting period), update the constants in `invites.service.ts`.

**Current Config (Hardcoded):**
- Genesis Cap: **1000 XOM**
- Admin Cap: **100 XOM**
- Guardian Cap: **50 XOM**
- Standard Cap: **10 XOM**

## 4. 🚀 Trigger Unified Invite Setup for New Room

To "implement this exact invite" for a new context (like a new Stream Room or Portal), follow this standard:

1.  **Frontend**: Import `UnifiedInviteModal`.
2.  **Logic**: Use `StreamGuestEntryModal` pattern (check for `?ref=`, `?invite=`).
3.  **Backend**: Ensure the room's Creator ID is passed to `generateInvite` if you want dynamic codes.

```tsx
// Example Usage
import { UnifiedInviteModal } from '../connect/UnifiedInviteModal';

const MyNewRoom = () => {
   // ... check for guest ...
   if (isGuest) return <UnifiedInviteModal onComplete={enterRoom} />;
}
```

## 5. 📄 Summary of Economic Rules

| Parameter | Value | Logic Location |
| :--- | :--- | :--- |
| **Genesis Bonus** | Up to **1000 XOM** | `InvitesService.generateInvite` |
| **Standard Bonus** | **10 XOM** (or 100 RP eq) | `InvitesService.generateInvite` |
| **Gas Policy** | **0 Gas** (Off-chain DB) | `InvitesService.redeemInvite` |
| **Vesting** | **360 Days** (Withdraw Lock) | *Pending Implementation in WalletService* |
| **Ecosystem Safety** | **RP Exchange Only** | *Pending Implementation in ExchangeService* |

---

**Next Steps:**
1.  Run the audit commands above.
2.  CONFIRM if you want me to implement the **360-Day Vesting Lock** logic in the backend `WalletService` now. (This requires schema migration to add `lockedUntil` or `vestingEntries`).
