# SSH Commands Best Practice

// turbo-all

## 🚨 CRITICAL: SSH COMMANDS HANG ON WINDOWS

**NEVER use direct SSH commands like:**

```powershell
# ❌ BAD - WILL HANG FOREVER
ssh root@188.245.235.51 "pm2 restart ohm-backend"
ssh root@188.245.235.51 "docker exec..."
```

**These commands hang because:**

1. Windows PowerShell SSH has TTY allocation issues
2. No timeout configured
3. PM2/Docker wait for interactive confirmation

### 🔑 ALWAYS USE THE DEPLOY KEY

When using SSH directly, **ALWAYS specify the deploy key**:

```powershell
# ✅ WITH DEPLOY KEY
ssh -i ~/.ssh/ohm_deploy_key root@188.245.235.51 "command"
```

Without the key, BatchMode will fail with "Permission denied (publickey,password)".

## ✅ CORRECT APPROACHES

### Option 1: Use deploy.ps1 (PREFERRED)

```powershell
# Handles everything correctly
powershell -ExecutionPolicy Bypass -File .\deploy.ps1
```

### Option 2: Use SSH with timeout and batch mode

```powershell
# Add -o options to prevent hanging
ssh -o BatchMode=yes -o ConnectTimeout=10 -o ServerAliveInterval=5 root@188.245.235.51 "pm2 restart ohm-backend --no-daemon"
```

### Option 3: Use Invoke-Command with timeout (PowerShell native)

```powershell
# Run with timeout
$job = Start-Job { ssh root@188.245.235.51 "pm2 list" }
Wait-Job $job -Timeout 30
Receive-Job $job
```

### Option 4: For PM2 specifically - use --update-env --force

```powershell
# Force non-interactive
ssh -tt root@188.245.235.51 "pm2 restart ohm-backend --update-env --force; exit"
```

---

## PM2 Commands (Server-Side)

If you need to run PM2 commands, SSH first then run:

```bash
# On server (after SSH)
pm2 list
pm2 restart ohm-backend --update-env
pm2 logs ohm-backend --lines 50
```

---

## Quick Server Health Check (Safe)

Use curl instead of SSH for basic checks:

```powershell
# ✅ SAFE - Check if backend is running
curl -s https://app.offlinehumanmode.com/api/health

# ✅ SAFE - Check specific endpoint
curl -s https://app.offlinehumanmode.com/api/stream/features
```

---

## Summary

| Approach          | Safety   | Speed  |
| ----------------- | -------- | ------ |
| `deploy.ps1`      | ✅ Safe  | Medium |
| SSH + timeout     | ⚠️ Risky | Fast   |
| curl health check | ✅ Safe  | Fast   |
| Direct SSH        | ❌ HANGS | Never  |
