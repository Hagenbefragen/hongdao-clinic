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
ssh -i C:\ohm\ohm_deploy_key -o ConnectTimeout=5 root@78.46.219.101 "pm2 list && pm2 logs ohm-backend --lines 50 --nostream"
```

**What to look for:**

- `MODULE_NOT_FOUND` -> Incorrect `cwd` or missing node_modules.
- `ECONNREFUSED 127.0.0.1` -> DB/Redis is down or ENV is wrong.
- `Invalid API Key` -> `.env` file not loaded or corrupt.
- `exports is not defined in ES module scope` -> **ESM/CJS conflict.** Jump to Step 1.5.
- `This file is being treated as an ES module` -> **ESM/CJS conflict.** Jump to Step 1.5.

---

## 🧬 Step 1.5: ESM/CJS Module Resolution Diagnostic (BUG-336)

**Symptom:** `ReferenceError: exports is not defined in ES module scope` or `This file is being treated as an ES module... use the '.cjs' file extension`.

**Root Cause:** Node.js walks UP the directory tree looking for the nearest `package.json` with a `"type"` field. In a monorepo, the **root** `package.json` may have `"type": "module"` (for frontend/Vite apps), which poisons ALL subdirectories including the backend's compiled `dist/` output and any `shared/` code.

**Diagnostic:**
// turbo

```powershell
# Check ALL package.json type fields in the directory chain
ssh -i C:\ohm\ohm_deploy_key -o ConnectTimeout=5 root@78.46.219.101 "grep -r '\"type\"' /root/ohm-live/package.json /root/ohm-live/backend/package.json /root/ohm-live/shared/package.json 2>/dev/null"
```

**Expected:** Backend and shared should both have `"type": "commonjs"`. Root may have `"type": "module"` (for Vite frontend).

**Fix (if backend/shared are missing `type: commonjs`):**
// turbo

```powershell
# Add type=commonjs to any subdir that compiles to CJS but lacks it
ssh -i C:\ohm\ohm_deploy_key root@78.46.219.101 "cd /root/ohm-live && for dir in backend shared; do if ! grep -q commonjs $dir/package.json 2>/dev/null; then echo 'MISSING type:commonjs in '$dir; fi; done"
```

**⚠️ IMPORTANT:** Fix in the REPO, not on the server. Server fixes get overwritten by GitOps.

---

## 🛠️ Step 2: Health & Environment Check

**Objective**: Verify the process sees what you think it sees.

// turbo

```powershell
# 1. Check if the process is running from the right folder (cwd)
# 2. Check if specific ENV vars are actually loaded (grep)
# 3. Verify Ports against PORTS.md (netstat)
ssh -i C:\ohm\ohm_deploy_key -o ConnectTimeout=5 root@78.46.219.101 "pm2 show ohm-backend | grep 'cwd' && grep 'LIVEKIT' /root/ohm-main/backend/.env && netstat -tulpn | grep LISTEN"
```

**Common Pitfall (The Windows Curse):**
If logs show default values (e.g., localhost) but `.env` looks correct, the file likely has **Windows Line Endings (`CRLF`)**. Linux shells fail to parse these.

**The Fix (Strip CRLF):**
// turbo

```powershell
ssh -i C:\ohm\ohm_deploy_key root@78.46.219.101 "cd /root/ohm-main/backend && sed -i 's/\r$//' .env"
```

---

## 🚀 Step 3: Smart Restart (The "Pro" Reload)

**Objective**: Force the application to reload configuration WITHOUT a rebuild.

**Method A: Standard Config Reload**
Use `--update-env` to force PM2 to re-read the `.env` file.
// turbo

```powershell
ssh -i C:\ohm\ohm_deploy_key root@78.46.219.101 "pm2 restart ohm-backend --update-env"
```

**Method B: Hard Reset (If CWD is wrong)**
Force the working directory and environment reload.
// turbo

```powershell
ssh -i C:\ohm\ohm_deploy_key root@78.46.219.101 "cd /root/ohm-main/backend && pm2 restart ohm-backend --cwd /root/ohm-main/backend --update-env"
```

---

## 🚑 Emergency: Service Recovery

If DB or Redis is down:

```powershell
# Check Docker Containers
ssh -i C:\ohm\ohm_deploy_key root@78.46.219.101 "docker ps"

# Restart Infrastructure
ssh -i C:\ohm\ohm_deploy_key root@78.46.219.101 "cd /root/ohm-main && docker-compose up -d"
```

---

## 🔍 Step 4: Git HEAD/Branch Alignment (BUG-263)

**Symptom:** Files are committed and pushed but don't appear on server.

**Objective**: Verify the bare repo's HEAD matches the branch you're pushing to.

// turbo

```powershell
# Check what HEAD points to vs what refs/heads/main has
ssh -i C:\ohm\ohm_deploy_key -o ConnectTimeout=5 root@78.46.219.101 "echo 'HEAD:' && cat /root/git/ohm.git/HEAD && echo 'main:' && cat /root/git/ohm.git/refs/heads/main"
```

**If HEAD says `ref: refs/heads/master` but you push to `main`:**
// turbo

```powershell
# Fix HEAD to point to main
ssh -i C:\ohm\ohm_deploy_key root@78.46.219.101 "git --git-dir=/root/git/ohm.git symbolic-ref HEAD refs/heads/main && git --work-tree=/root/ohm-live --git-dir=/root/git/ohm.git checkout -f"
```

---

## 🔐 Step 5: SSL Certificate Verification (Post-Deploy)

**Symptom:** Page loads blank, browser console shows `ERR_CERT_COMMON_NAME_INVALID` for all assets.

**Objective**: Verify SSL certs are valid and correctly mapped in Nginx.

**⚠️ CRITICAL: Do NOT use Windows SSH (`ssh.exe`). Use Git Bash SSH instead:**

```powershell
# Write your commands in a bash script, then execute via Git Bash:
& "C:\Program Files\Git\bin\bash.exe" /c/ohm/scripts/your-fix.sh
# Inside the bash script, use heredoc pattern:
# ssh -T -i /c/ohm/ohm_deploy_key -o ConnectTimeout=15 -o BatchMode=yes -o StrictHostKeyChecking=no root@78.46.219.101 << 'ENDSSH'
# ... commands ...
# ENDSSH
```

**Method A: Browser Health Check** (preferred)
Open `https://app.offlinehumanmode.com/api/health` in browser. If cert error → SSL issue.

**Method B: OpenSSL from PowerShell**

```powershell
# Check which cert the server is serving for a specific subdomain
echo | openssl s_client -servername stream.offlinehumanmode.com -connect 78.46.219.101:443 2>$null | openssl x509 -noout -subject -dates
```

**Common causes:**

- Certbot renewal didn't include all subdomains in SAN
- Nginx server block missing `ssl_certificate` directive
- Nginx serving wrong cert (e.g., `offlinehumanmode.com` cert instead of `offlinehumanmode.com-0002`)

**Fix via deploy.ps1** (add cert renewal to the script):

```bash
# On server (via deploy.ps1 script, NOT direct SSH):
certbot certonly --nginx -d offlinehumanmode.com -d app.offlinehumanmode.com -d stream.offlinehumanmode.com -d twin.offlinehumanmode.com -d www.offlinehumanmode.com --non-interactive
nginx -t && systemctl reload nginx
```

---

## 📝 Success Criteria

1.  Logs show correct initialization (e.g., `Initializing EgressClient with URL: https://...`).
2.  No errors in `pm2 logs`.
3.  Feature works on frontend (refresh browser).
4.  **SSL certs valid** — no `ERR_CERT_COMMON_NAME_INVALID` on any subdomain.

---

## 📚 Lessons Learned Log

| Date       | Bug     | Lesson                                                                                                                                                                                         |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-02-17 | SSL-001 | `stream.offlinehumanmode.com` returned `ERR_CERT_COMMON_NAME_INVALID` after deployment. Cert existed but Nginx may serve wrong cert. **Always verify SSL after deploy, not just API health.**  |
| 2026-02-17 | SSH-001 | Direct SSH commands from Windows PowerShell HANG indefinitely. **NEVER use direct SSH.** Use `deploy.ps1`, `openssl`, or browser-based health checks instead.                                  |
| 2026-02-17 | SSH-002 | **Git Bash SSH WORKS** where Windows SSH hangs! Use `& "C:\Program Files\Git\bin\bash.exe" /path/to/script.sh` with heredoc SSH inside. Start-Job pattern still hangs — run bash.exe directly. |
| 2026-02-17 | SSL-002 | Stream served wrong cert (`-0001` = dream-only) instead of `-0002` (stream,app,twin,www). Fix: `sed -i 's/-0001/-0002/g'` in Nginx config for the stream server block.                         |
| 2026-02-03 | BUG-263 | Server's bare repo HEAD pointed to `master` while pushing to `main`. The `git checkout -f` in post-receive uses HEAD, so old code was deployed. **Always verify HEAD matches target branch.**  |
| 2026-01-29 | BUG-148 | LiveKit in `--dev` mode has different behavior. Check container args with `docker inspect`.                                                                                                    |

| 2026-02-18 | SSL-003 | Repo `nginx_offlinehumanmode.conf` had wrong cert path (`-0001`). Post-receive hook copies this file to `/etc/nginx/sites-enabled/default` on EVERY deploy, overwriting server-side `sed` fixes. **ALWAYS fix the REPO file, not the server.** The repo nginx config IS the Single Source of Truth for SSL cert paths. |
| 2026-03-09 | BUG-336 | **ESM/CJS Poisoning.** Root `package.json` had `"type": "module"` (for Vite frontend), which made Node treat ALL `.js` files in subdirs as ESM — including backend `dist/` and `shared/`. Fix: add `"type": "commonjs"` to both `backend/package.json` and `shared/package.json`. **Wasted 90 min because: (1) chased `@babel/code-frame` as root cause instead of checking module resolution first, (2) SSH output truncation hid the real file path, (3) should have used `/serverfix` Step 1 immediately.** |

<!-- Skill Forge Update: 2026-03-09 — Added BUG-336: ESM/CJS module resolution poisoning from root package.json type:module. Added Step 1.5 diagnostic. -->
<!-- Skill Forge Update: 2026-02-18 — Added SSL-003: repo nginx config is SSOT for cert paths, server fixes get overwritten by GitOps -->
<!-- Skill Forge Update: 2026-02-17 — Added Git Bash SSH escape hatch (SSH-002), SSL cert mismatch fix (SSL-002), and updated Step 5 with working SSH pattern -->
