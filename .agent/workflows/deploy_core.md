---
description: Deploy Core systems (Backend, App, Website) - High risk, restarts services
---

# /deploy_core - Core System Deployment

**Purpose**: Deploy Backend API, Main App, and Marketing Website.
**Risk Level**: 🟠 HIGH
**Use When**: Auth changes, DB schema updates, New backend modules.

**⚠️ SSH Best Practices**: See `.agent/workflows/ssh_commands.md` - Never use direct SSH!

// turbo-all

## Pre-Flight Checklist

- [ ] Backend builds locally: `npm run build:api`
- [ ] No TypeScript errors
- [ ] Database migrations ready (if any)
- [ ] **Ports:** Verified against `Documentation/INFRASTRUCTURE/PORTS.md`

## Steps

### 1. Build All Core Components

```powershell
npm run build:api
npm run build:app
npm run build:website
```

### 2. Deploy Core Systems

```powershell
# ✅ CORRECT - Uses deployment script
powershell -ExecutionPolicy Bypass -File ".\deploy_core.ps1"
```

### 3. Verify Backend Health

```powershell
# ✅ SAFE - Use curl, NOT SSH (SSH will hang on Windows!)
curl -s https://app.offlinehumanmode.com/api/health
```

### 4. Verify Frontend

Open browser:

- https://app.offlinehumanmode.com
- https://offlinehumanmode.com

### 5. Commit

```powershell
git add -A ; git commit -m "deploy(core): [description]"
```

## What Gets Deployed

- ✅ Backend API (NestJS)
- ✅ Frontend App (React/Vite)
- ✅ Marketing Website
- ❌ Digital Twin Stack (use `/deploy_dt`)
- ❌ Stream-specific configs

## ⚠️ Warning

This WILL restart the Backend. All active sessions may be interrupted.
Consider running during low-traffic hours.
