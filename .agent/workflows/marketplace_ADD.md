# /marketplace_ADD - Adding New Assets to OHM Bazaar
**Trigger:** `/marketplace_ADD`
**Purpose:** Standardized process for adding new distinct asset classes (e.g. Retreat Tickets, Memberships, Physical Goods) to the Sovereign Bazaar plugin.

---

## 🏗️ 1. Architecture Check (Pre-Flight)

**Is this a new ASSET CLASS?**
*   **YES (e.g. "Magic Potions"):** Use this workflow. You need to modify the `MarketplacePlugin` code.
*   **NO (Just a new item):** If you are just adding a *specific* instance (e.g. "Bali Retreat 2026" vs "Costa Rica 2026"), do NOT modify code. Use the **Admin Panel** or Database to insert the new item row.

---

## 📁 2. Frontend Implementation

### Step 2.1: Define the Asset Type
Navigate to `frontend/plugins/marketplace/types/Asset.ts` (create if missing).
Add your new type to the Union Type or Enum.

```typescript
export type MarketplaceAssetType = 'stream_name' | 'retreat_ticket' | 'membership' | 'bounty_task' | 'YOUR_NEW_TYPE';
```

### Step 2.2: Create the Card Component
Create `frontend/plugins/marketplace/components/assets/YourAssetCard.tsx`.
*   **Style:** match existing `AssetCard` styles (rounded-2xl, shadow-sm).
*   **Props:** Ensure it accepts `price`, `title`, and `description`.

### Step 2.3: Register in MarketplaceView
Update `frontend/plugins/marketplace/components/MarketplaceView.tsx`.
Add a new block in the `<ShopSection />`.

```tsx
{/* Your New Asset Section */}
<div className="bg-white dark:bg-gray-800 ...">
    <div className="text-4xl">🔮</div>
    <h3>Magic Potions</h3>
    <button onClick={...}>Browse</button>
</div>
```

---

## 🗄️ 3. Backend Implementation

### Step 3.1: Database Schema
*   **Generic Assets:** Can this use the `UserAssets` table? (Best Practice: Yes, if simple property bag).
*   **Complex Assets:** Does it need a dedicated table? (e.g. `Retreats` needs dates, location).
*   **Action:** Create migration or update `backend/src/marketplace/entities`.

### Step 3.2: Purchase Logic
*   Update `MarketplaceController` and `Service`.
*   **CRITICAL:** Implement the `buy` endpoint.
*   **Security:** Verify Payment (Stripe/XOM) -> Database Transaction -> Grant Asset.

---

## 🧪 4. Verification

1.  **Build:** Run `npm run build` in frontend to ensure no type errors.
2.  **Visual Test:** Open `/marketplace` (Bazaar) and verify the new card aligns with others.
3.  **Flow Test:** Click "Buy" and ensure the mock/real flow triggers.
4.  **Inventory Check:** Ensure the purchased item appears in the "My Assets" tab.

---

## 📝 5. Documentation
*   Update `docs/RFC_MARKETPLACE.md` if the architecture changes.
