---
description: Add a new payment integration or payment-enabled product using the reusable PaymentMethodSelector component
---

# /payment — Add Payment to Any Product

// turbo-all

## Overview

The `PaymentMethodSelector` component (`frontend/components/payment/PaymentMethodSelector.tsx`) provides a drop-in Stripe/PayPal/USDC payment UI. To add payment to a new product, you only need to pass `priceUSDC` and `productLabel`.

---

## Step 1: Import the Component

```tsx
import { PaymentMethodSelector } from '../payment/PaymentMethodSelector';
```

## Step 2: Drop Into Your Modal/Page

```tsx
<PaymentMethodSelector
    priceUSDC={49}                    // Price in USDC (required)
    productLabel="Room 'zen'"          // Human-readable label (required)
    onPaymentInitiated={(method) => {  // Optional callback
        console.log('Payment started via', method);
    }}
    onError={(msg) => setError(msg)}   // Optional error handler
/>
```

## Step 3: Use Constants (If Needed)

```tsx
import {
    OHM_TREASURY_ADDRESS,
    USDC_CONTRACT_POLYGON,
    PROCESSING_FEE_PERCENT,
    XOM_PER_USDC,
    calcWithFee,
    usdcToXom,
} from '../payment/payment-constants';
```

---

## Files

| File | Purpose |
|------|---------|
| `frontend/components/payment/PaymentMethodSelector.tsx` | Reusable UI: method selector + Stripe/PayPal/USDC flows |
| `frontend/components/payment/payment-constants.ts` | SSOT for treasury address, fee %, XOM rate, chain IDs |

## Currently Integrated In

| Product | File | Price Source |
|---------|------|-------------|
| Room Claim | `RoomClaimModal.tsx` | `checkResult.priceXom` (backend) |
| Buy XOM | `BuyXOMModal.tsx` | User input amount |
| Treasury | `TreasuryDashboard.tsx` | Dashboard display |

---

## Adding a New Payment Product

1. **Determine the price** in USDC (can be static or dynamic from backend)
2. **Import** `PaymentMethodSelector` into your component
3. **Render** with `priceUSDC={yourPrice}` and `productLabel="Your Product"`
4. **Handle callbacks** — `onPaymentInitiated` for analytics, `onError` for UI feedback
5. **No backend changes needed** — Stripe/PayPal endpoints are product-agnostic

## Changing Fees or Treasury Address

Edit `frontend/components/payment/payment-constants.ts` — it's the **single source of truth**.
