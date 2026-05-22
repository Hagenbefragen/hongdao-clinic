---
description: Checklist for adding new portals/pages with SeamlessLogin integration
---

# New Portal/Page Authentication Checklist

When creating a new portal, page, or feature that requires user authentication (e.g., XPollination, Social Fund, Paradise Project), follow this checklist to ensure proper SeamlessLogin integration.

> ⚠️ **REQUIRED COMPANION WORKFLOW**: When adding a new portal, you MUST also follow **`@[/sso_seamless]`** for SSO implementation (SparkSyncBridge, cross-portal navigation, CORS configuration).

> 📚 **REQUIRED READING**: Before implementing, study these two core features:
>
> - **FEAT-065**: `.agent/knowledge/.../FEAT-065_cross_domain_sso_cookies.md` — Cross-domain httpOnly cookies
> - **FEAT-075**: `.agent/features/research/FEAT-075_Unified_SSO_Login.md` — `usePortalLogin` + `UnifiedPortalWrapper`

## 🌐 Step 0: Infrastructure Setup (DNS + SSL + Nginx)

### 0a. DNS A Record

- [ ] Add `A` record for `newportal.offlinehumanmode.com → 78.46.219.101` (TTL: 3600)

### 0b. Nginx Configuration

- [ ] Add `newportal.offlinehumanmode.com` to the App server block in `/etc/nginx/sites-available/ohm.conf` (line ~46)
- [ ] Add to BOTH the SSL (443) and HTTP redirect (80) server blocks
- [ ] Test config: `nginx -t`
- [ ] Reload: `systemctl reload nginx`

### 0c. SSL Certificate Expansion

> [!CAUTION] > **NEVER** run certbot with `--cert-name` and only a SINGLE `-d` flag!
> This REPLACES the entire cert with ONLY that one domain, destroying ALL other subdomains!
> **Incidents: Feb 18 + Feb 20, 2026** — ALL portals ERR_CERT_COMMON_NAME_INVALID

- [ ] **Step 1**: Get the current domain list first:

  ```bash
  certbot certificates --cert-name offlinehumanmode.com-0002 | grep Domains:
  ```

- [ ] **Step 2**: Run with `--expand` and list **ALL existing domains + new one**:

  ```bash
  # ✅ CORRECT — --expand + ALL existing + new domain
  certbot --nginx --cert-name offlinehumanmode.com-0002 --expand \
    -d offlinehumanmode.com -d www.offlinehumanmode.com \
    -d app.offlinehumanmode.com -d stream.offlinehumanmode.com \
    -d [... COPY ALL DOMAINS FROM STEP 1 ...] \
    -d newportal.offlinehumanmode.com \
    --non-interactive

  # ❌ FATAL — REPLACES cert with ONLY this domain!
  # certbot --nginx --cert-name offlinehumanmode.com-0002 -d newportal.offlinehumanmode.com

  # ❌ FATAL — creates NEW cert path, breaks symlinks!
  # certbot --nginx -d newportal.offlinehumanmode.com
  ```

- [ ] Verify from local Windows (no SSH needed):
  ```powershell
  $tcp = New-Object System.Net.Sockets.TcpClient
  $tcp.Connect('newportal.offlinehumanmode.com', 443)
  $ssl = New-Object System.Net.Security.SslStream($tcp.GetStream(), $false, {$true})
  $ssl.AuthenticateAsClient('newportal.offlinehumanmode.com')
  Write-Host "Subject: $($ssl.RemoteCertificate.Subject)"  # Must show CN=offlinehumanmode.com
  $ssl.Close(); $tcp.Close()
  ```

### 0d. Portal Registry

- [ ] Add entry to `frontend/config/portalRegistry.ts` (`OHM_PORTALS` array)
- [ ] Add lazy import in `frontend/App.tsx` for the landing page component
- [ ] Add `case` in `DomainHomeRouter.renderLandingPage()` switch statement

## 🔐 Authentication Requirements

> ⚠️ **INFRASTRUCTURE CHECK**: If this portal requires a new dedicated service or port, YOU MUST REGISTER IT IN `Documentation/INFRASTRUCTURE/PORTS.md` FIRST. Never assign arbitrary ports.

### 0. Backend: Register Portal Domain (CORS)

Every new portal domain (e.g., `new.offlinehumanmode.com`) MUST be whitelisted in the backend CORS configuration.

**File:** `backend/src/main.ts`

```typescript
// Add your regex pattern to allowedPatterns
const allowedPatterns = [
  /^https:\/\/([a-z0-9-]+\.)*offlinehumanmode\.com$/,
  /^https:\/\/([a-z0-9-]+\.)*ohmretreat\.com$/,
  // Add your new domain here if it doesn't match the above wildcards
];
```

### 1. Frontend: API Service Setup

When creating a new API service file (e.g., `frontend/services/new-feature-api.ts`):

```typescript
// Copy this pattern from retreat-api.ts

// Get user's wallet address from localStorage (SeamlessLogin stores it)
const getWalletAddress = (): string | null => {
  try {
    const vault = localStorage.getItem("ohm_identity_vault");
    if (vault) {
      const parsed = JSON.parse(vault);
      if (parsed.address) return parsed.address;
    }
  } catch (e) {}

  const userStr = localStorage.getItem("ohm_current_user");
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.walletAddress) return user.walletAddress;
    } catch (e) {}
  }
  return null;
};

// Get auth headers (for JWT if available)
const getAuthHeaders = (): HeadersInit => {
  const token =
    localStorage.getItem("ohm_token") || localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
```

### 2. Frontend: Dual-Mode Endpoints

For any authenticated API call, support BOTH JWT and wallet-based auth:

```typescript
export async function createFeatureItem(data: any) {
  const token =
    localStorage.getItem("ohm_token") || localStorage.getItem("authToken");
  const walletAddress = getWalletAddress();

  // Wallet-based endpoint (SeamlessLogin users)
  if (!token && walletAddress) {
    return fetch(`${API_BASE}/api/v1/feature/items/wallet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, walletAddress }),
    });
  }

  // JWT-based endpoint (legacy/OAuth users)
  return fetch(`${API_BASE}/api/v1/feature/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
}
```

### 3. Backend: Controller Endpoints

Create BOTH JWT-guarded and wallet-based endpoints:

```typescript
// backend/src/feature/feature.controller.ts

// JWT-authenticated (legacy)
@UseGuards(JwtAuthGuard)
@Post('items')
async createItem(@Request() req, @Body() body: any) {
    return this.service.createItem(req.user.userId, body);
}

// Wallet-authenticated (SeamlessLogin)
@Post('items/wallet')
async createItemByWallet(@Body() body: any) {
    if (!body.walletAddress) {
        return { error: 'walletAddress is required' };
    }
    return this.service.createItemByWallet(body.walletAddress, body);
}
```

### 4. Backend: Service Methods

Implement wallet-based service methods:

```typescript
// backend/src/feature/feature.service.ts

async createItemByWallet(walletAddress: string, data: any) {
    // Find or create user by wallet
    let user = await this.userRepo.findOne({ where: { walletAddress } });

    if (!user) {
        // Auto-create user for this wallet
        user = this.userRepo.create({
            email: `${walletAddress.slice(0, 8)}@wallet.ohm`,
            walletAddress,
            password: '',
        });
        user = await this.userRepo.save(user);
    }

    // Create item with user as owner
    const { walletAddress: _, ...itemData } = data;
    return this.itemRepo.save({ ...itemData, userId: user.id });
}
```

### 6. Wallet-Based Ownership (CRITICAL for .ohm file support)

When creating resources that have an "owner," always store the wallet address for future-proof lookup:

```typescript
// backend/src/feature/feature.entity.ts
@Entity()
export class FeatureItem {
    @Column({ nullable: true })
    ownerId: number;                    // Legacy: integer user ID

    @Column({ nullable: true })
    ownerWalletAddress: string;         // Future-proof: wallet address lookup
}

// backend/src/feature/feature.service.ts
async createItemByWallet(walletAddress: string, data: any) {
    let user = await this.userRepo.findOne({ where: { walletAddress } });
    // ... find or create user ...

    const item = this.itemRepo.create({
        ...data,
        ownerId: user.id,
        ownerWalletAddress: walletAddress  // ← ALWAYS STORE THIS
    });
    return this.itemRepo.save(item);
}

// Query by BOTH when fetching "my items"
async getItemsByWallet(walletAddress: string) {
    const user = await this.userRepo.findOne({ where: { walletAddress } });
    return this.itemRepo.find({
        where: user
            ? [{ ownerId: user.id }, { ownerWalletAddress: walletAddress }]
            : { ownerWalletAddress: walletAddress }
    });
}
```

**Why:** .ohm files contain wallet addresses but NOT backend user IDs. If we only store `ownerId`, users with .ohm files cannot find their resources.

### 5. Backend: User Entity Check

Ensure the User entity has `walletAddress`:

```typescript
// backend/src/user/user.entity.ts
@Column({ nullable: true, unique: true })
walletAddress: string;
```

---

## ✅ Verification Checklist

Before deploying a new authenticated feature:

- [ ] Backend `main.ts` CORS list updated (if new domain)
- [ ] Frontend API service includes `getWalletAddress()` helper
- [ ] Frontend API calls support both JWT and wallet modes
- [ ] Backend has `/wallet` variant endpoints
- [ ] Backend service has `*ByWallet` methods
- [ ] Backend finds user by `walletAddress`
- [ ] CORS includes new frontend URLs (if different domain)
- [ ] Tested with a SeamlessLogin user (no JWT)
- [ ] Tested with a JWT user (email/OAuth login)

---

## 📚 Reference Files

- **Frontend Pattern**: `frontend/services/retreat-api.ts`
- **Backend Controller Pattern**: `backend/src/marketplace/marketplace.controller.ts`
- **Backend Service Pattern**: `backend/src/marketplace/marketplace.service.ts`
- **Full Documentation**: `docs/SEAMLESS_LOGIN_SYSTEM.md`

---

## 🚨 Common Mistakes

1. **Forgetting wallet endpoints** → SeamlessLogin users get 401 errors
2. **Not checking both localStorage keys** → Some users have `ohm_token`, others don't
3. **Hardcoding userId** → Wallet users don't have traditional userId initially
4. **Missing CORS for subdomains** → API calls blocked from new portals
5. **Forgetting DNS A record** → Subdomain doesn't resolve
6. **Forgetting SSL cert expansion** → `ERR_CERT_COMMON_NAME_INVALID` in browser
7. **Forgetting Nginx server_name** → Default server block handles request incorrectly
8. **Forgetting portalRegistry entry** → `DomainHomeRouter` renders `MainLayout` instead of landing page
9. **Using `sameSite: 'strict'`** → Breaks FEAT-065 cross-domain cookies (must be `'lax'`)

---

_Last Updated: 2026-02-11 | Added FEAT-065/FEAT-075 references, DNS/SSL/Nginx/portalRegistry steps_
