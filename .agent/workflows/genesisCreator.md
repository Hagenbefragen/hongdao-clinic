---
description: Genesis Creator identity verification and profile data
---

# /genesisCreator - Master Identity Workflow

## 🔑 Genesis Creator Profile (AUTHORITATIVE SOURCE)

| Field | Value |
|:---|:---|
| **Wallet Address** | `0xbf71847cD1cdEad2E0b27aAbb6F47ebE4417163F` |
| **Username** | `@Hagenbefragen` |
| **Display Name** | `SoulHagen` / `Hagen` |
| **Email** | `Hagenbefragen@gmail.com` |
| **Role** | `GenesisCreator` (Admin) |
| **XOM Balance** | 100,000 XOM |
| **Trust Score** | 100 |

## ⚠️ Identity Verification Rules

**ALWAYS verify against these identifiers:**

| Identifier | Value |
|:---|:---|
| Wallet (lowercase) | `0xbf71847cd1cdead2e0b27aabb6f47ebe4417163f` |
| Email | `Hagenbefragen@gmail.com` |
| Username | `@Hagenbefragen` or `Hagenbefragen` |
| Display Names | `SoulHagen`, `Hagen`, `Hagen GA` |

## 🐛 Bug Detection Patterns

If you see ANY of these, it's a **BUG**:

| Symptom | Bug Type | Action |
|:---|:---|:---|
| "Unknown User" with this wallet | Profile name not synced | Sync name to backend |
| 401 errors after OHM file login | Token race condition | Clear stale token first |
| Wrong wallet with assets | Identity mismatch | CRITICAL - investigate |
| Assets missing | Data loss | Check backend DB |
| "Unknown User" in Admin dropdown | Ghost user bug | Clear localStorage |

## 💾 Database Fix Commands

```bash
# SSH into production
ssh -i "C:\ohm\ohm_deploy_key" root@78.46.219.101

# Fix Genesis Creator in PostgreSQL
docker exec ohm-postgres psql -U postgres -d ohm_db -c "
-- Update user role and email
UPDATE \"user\" SET 
  role = 'GenesisCreator',
  email = 'Hagenbefragen@gmail.com'
WHERE LOWER(\"walletAddress\") = LOWER('0xbf71847cD1cdEad2E0b27aAbb6F47ebE4417163F');

-- Update profile name
UPDATE profiles SET 
  name = 'SoulHagen'
WHERE \"userId\" = (
  SELECT id FROM \"user\" 
  WHERE LOWER(\"walletAddress\") = LOWER('0xbf71847cD1cdEad2E0b27aAbb6F47ebE4417163F')
);
"
```

## 🏷️ Owned Assets (Stream Names)

The Genesis Creator owns these premium stream names:
- **DIAMOND**: Fancci (€33,000)
- **PLATINUM**: Sexy, Liebe, Freiheit, Paradies, Freedom, Paradise
- **GOLD**: EXIT, DAO, OHM, Hagen, LOVE, SEX, X, NOW

## 📋 Quick Reference
```
GENESIS CREATOR WALLET = 0xbf71847cD1cdEad2E0b27aAbb6F47ebE4417163F
```
