````
---
description: Master Deployment Workflow for the entire OHM Ecosystem
---

# Master Deployment Protocol

**Purpose**: Full-stack deployment orchestration.
**Use When**: Major releases, multi-component updates.

**⚠️ SSH Best Practices**: See `.agent/workflows/ssh_commands.md` - Never use direct SSH commands!
**Risk Level**: 🔴 MAXIMUM

// turbo-all

## ⚠️ WARNING
This will restart ALL services. Use only for major releases.
For smaller updates, use:
- `/deploy_stream` - VC/Stream UI only (Safe)
- `/deploy_core` - Backend + App + Website (High Risk)
- `/deploy_dt` - Digital Twin Stack only

## Pre-Flight Checklist
- [ ] All builds pass locally
- [ ] Database migrations tested
- [ ] Team notified of downtime window
- [ ] Backup verified

## Steps

### 1. Run Master Deployment
```powershell
powershell -ExecutionPolicy Bypass -File ".\deploy_master.ps1"
````

### 2. Monitor Logs

```powershell
ssh -i C:\OHM\ohm_deploy_key root@188.245.235.51 "pm2 logs --lines 50"
```

### 3. Verify All Services

```powershell
curl https://app.offlinehumanmode.com/api/health
curl https://offlinehumanmode.com
curl https://twin.offlinehumanmode.com/api/health
curl https://stream.offlinehumanmode.com
```

### 4. Commit

```powershell
git add -A ; git commit -m "deploy(master): v[X.Y.Z] - [description]"
```

## What Gets Deployed

- ✅ Backend API (NestJS)
- ✅ Frontend App (React/Vite)
- ✅ Marketing Website
- ✅ Digital Twin Stack

## Deployment Order

1. Backend (Source of Truth)
2. App Frontend
3. Website
4. Digital Twin

**Target Server:** `188.245.235.51`
