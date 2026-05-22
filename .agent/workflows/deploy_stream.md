---
description: Deploy Stream/VC changes only (Frontend App) - Safe, no Backend restart
---

# /deploy_stream - Stream/VC Deployment

**Purpose**: Deploy ONLY the Frontend (VC Views) without restarting the Backend.
**Risk Level**: 🟢 LOW
**Use When**: CSS tweaks, Button fixes, Plugin updates, VC UI changes.

**⚠️ SSH Best Practices**: See `.agent/workflows/ssh_commands.md` - Use curl for checks!

// turbo-all

## Steps

- **Infrastructure Check**: If you changed WebSocket URLs or LiveKit endpoints, verify against `Documentation/INFRASTRUCTURE/PORTS.md`.

### 1. Build Frontend Locally

```powershell
npm run build:app
```

### 2. Deploy Stream/VC

```powershell
# ✅ CORRECT - Uses deployment script
powershell -ExecutionPolicy Bypass -File ".\deploy_stream.ps1"
```

### 3. Verify Deployment

```powershell
# ✅ SAFE - Use curl to verify
curl -s https://stream.offlinehumanmode.com/ | Select-String -Pattern "OHM"
curl -s https://app.offlinehumanmode.com/api/health
```

Or open browser to test:

- https://app.offlinehumanmode.com/vc/room/test
- https://stream.offlinehumanmode.com

### 4. Commit (if not already)

```powershell
git add -A ; git commit -m "deploy(stream): [description]"
```

## What Gets Deployed

- ✅ Frontend App (React/Vite)
- ✅ VC Views & Plugins
- ✅ Stream Landing Pages
- ❌ Backend API (NOT touched)
- ❌ Database Schema (NOT touched)

## When NOT to Use

- If you changed Backend code (`backend/src/*`)
- If you modified Database entities
- If you updated Auth logic
  → Use `/deploy_core` instead.
