---
description: Pro-level server debugging and hot-fixing protocol (Shortcut methodology)
---

# ⚡ ServerFix: Pro Debug & Hot-Fix Protocol

**PHILOSOPHY:** Stop redeploying. Fix the metal.
**TRIGGER:** Use this when you suspect a configuration, environment, or runtime issue on the live server.
**GOAL:** Diagnose and fix in < 60 seconds.
**REFERENCES:**

- `Documentation/INFRASTRUCTURE/PORTS.md` (Single Source of Truth)
- `Documentation/AS_BUILD/02_Deployment/Overall_Production_Strategy.md` (Risk Mitigation)

## ⚠️ PRO RULES (The "Shortcuts")

1.  **NEVER Redeploy for Config**: If it's an ENV variable or small tweak, edit it on the server.
2.  **ALWAYS Check Logs First**: Don't guess. Read the `pm2 logs`.
3.  **STRICT Timeouts**: Never let SSH hang. Use `-o ConnectTimeout=5`.
4.  **In-Place Fixes**: Use `sed` to patch files instantly.

---

## 🔍 Step 1: Instant Diagnosis / Log Tailing

**Objective**: Find the exact error message immediately.

// turbo

```powershell
# Check status and last 50 lines of logs instantly
ssh -i C:\ohm\ohm_deploy_key -o ConnectTimeout=5 root@188.245.235.51 "pm2 list && pm2 logs ohm-backend --lines 50 --nostream"
```

**What to look for:**

- `MODULE_NOT_FOUND` -> Incorrect `cwd` or missing node_modules.
- `ECONNREFUSED 127.0.0.1` -> DB/Redis is down or ENV is wrong.
- `Invalid API Key` -> `.env` file not loaded or corrupt.

---

## 🛠️ Step 2: Health & Environment Check

**Objective**: Verify the process sees what you think it sees.

// turbo

```powershell
# 1. Check if the process is running from the right folder (cwd)
# 2. Check if specific ENV vars are actually loaded (grep)
# 3. Verify Ports against PORTS.md (netstat)
ssh -i C:\ohm\ohm_deploy_key -o ConnectTimeout=5 root@188.245.235.51 "pm2 show ohm-backend | grep 'cwd' && grep 'LIVEKIT' /root/ohm-main/backend/.env && netstat -tulpn | grep LISTEN"
```

**Common Pitfall (The Windows Curse):**
If logs show default values (e.g., localhost) but `.env` looks correct, the file likely has **Windows Line Endings (`CRLF`)**. Linux shells fail to parse these.

**The Fix (Strip CRLF):**
// turbo

```powershell
ssh -i C:\ohm\ohm_deploy_key root@188.245.235.51 "cd /root/ohm-main/backend && sed -i 's/\r$//' .env"
```

---

## 🚀 Step 3: Smart Restart (The "Pro" Reload)

**Objective**: Force the application to reload configuration WITHOUT a rebuild.

**Method A: Standard Config Reload**
Use `--update-env` to force PM2 to re-read the `.env` file.
// turbo

```powershell
ssh -i C:\ohm\ohm_deploy_key root@188.245.235.51 "pm2 restart ohm-backend --update-env"
```

**Method B: Hard Reset (If CWD is wrong)**
Force the working directory and environment reload.
// turbo

```powershell
ssh -i C:\ohm\ohm_deploy_key root@188.245.235.51 "cd /root/ohm-main/backend && pm2 restart ohm-backend --cwd /root/ohm-main/backend --update-env"
```

---

## 🚑 Emergency: Service Recovery

If DB or Redis is down:

```powershell
# Check Docker Containers
ssh -i C:\ohm\ohm_deploy_key root@188.245.235.51 "docker ps"

# Restart Infrastructure
ssh -i C:\ohm\ohm_deploy_key root@188.245.235.51 "cd /root/ohm-main && docker-compose up -d"
```

---

## 🔍 Step 4: Git HEAD/Branch Alignment (BUG-263)

**Symptom:** Files are committed and pushed but don't appear on server.

**Objective**: Verify the bare repo's HEAD matches the branch you're pushing to.

// turbo

```powershell
# Check what HEAD points to vs what refs/heads/main has
ssh -i C:\ohm\ohm_deploy_key -o ConnectTimeout=5 root@188.245.235.51 "echo 'HEAD:' && cat /root/git/ohm.git/HEAD && echo 'main:' && cat /root/git/ohm.git/refs/heads/main"
```

**If HEAD says `ref: refs/heads/master` but you push to `main`:**
// turbo

```powershell
# Fix HEAD to point to main
ssh -i C:\ohm\ohm_deploy_key root@188.245.235.51 "git --git-dir=/root/git/ohm.git symbolic-ref HEAD refs/heads/main && git --work-tree=/root/ohm-live --git-dir=/root/git/ohm.git checkout -f"
```

---

## 📝 Success Criteria

1.  Logs show correct initialization (e.g., `Initializing EgressClient with URL: https://...`).
2.  No errors in `pm2 logs`.
3.  Feature works on frontend (refresh browser).

---

## 📚 Lessons Learned Log

| Date       | Bug     | Lesson                                                                                                                                                                                        |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-02-03 | BUG-263 | Server's bare repo HEAD pointed to `master` while pushing to `main`. The `git checkout -f` in post-receive uses HEAD, so old code was deployed. **Always verify HEAD matches target branch.** |
| 2026-01-29 | BUG-148 | LiveKit in `--dev` mode has different behavior. Check container args with `docker inspect`.                                                                                                   |
