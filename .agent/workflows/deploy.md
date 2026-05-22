---
description: Deploy the OHM Ecosystem (Website, App, Backend) to Production (Hetzner)
---

# 🚀 Full Ecosystem Deployment

This workflow triggers the **Master Deployment Protocol**, which sequentially updates:

1.  **Backend** (NestJS API)
2.  **App Frontend** (React)
3.  **Websites** (Marketing)
4.  **Digital Twin** (AI Stack)

**Target Server:** `188.245.235.51`

**⚠️ Important**: This uses `deploy.ps1` which handles SSH correctly.  
**Reference**: `.agent/workflows/ssh_commands.md` for SSH best practices.  
**Never**: Use direct SSH commands - they WILL hang on Windows!

// turbo-all

```powershell
# ✅ CORRECT - Uses deployment script with proper SSH handling
powershell -ExecutionPolicy Bypass -File ".\deploy.ps1"
```

**Health Check After Deployment**:

```powershell
# ✅ SAFE - Use curl, not SSH
curl -s https://app.offlinehumanmode.com/api/health
curl -s https://stream.offlinehumanmode.com/
```

---

## 🔴 LESSON LEARNED: BUG-263 (2026-02-03)

### The "Ghost Module" Problem

**Symptom:** New files are committed and "pushed successfully" but never appear on the server.

**Root Cause (Discovered):** The server's bare repo HEAD pointed to `master` while we push to `main`.

```bash
# On server, the bare repo was:
/root/git/ohm.git/HEAD → refs/heads/master  # OLD!
# But we push to:
git push sovereign main                      # Goes to refs/heads/main
```

The post-receive hook runs `git checkout -f` which uses HEAD, so it checks out `master` (old code) instead of `main` (new code).

### Verification Command

```bash
# Check server's HEAD
ssh root@188.245.235.51 "cat /root/git/ohm.git/HEAD"
# Should say: ref: refs/heads/main
# If it says: ref: refs/heads/master → PROBLEM!
```

### The Fix

```bash
ssh root@188.245.235.51 "git --git-dir=/root/git/ohm.git symbolic-ref HEAD refs/heads/main"
```

### Key Learnings

1. **Branch naming matters for deployment!** When GitHub switched `master` to `main`, the server's bare repo wasn't updated.
2. **@/serverfix is the right call** - direct SSH inspection finds these issues immediately.
3. **If code is correct but not appearing in production**, check the deployment pipeline, not the code.
