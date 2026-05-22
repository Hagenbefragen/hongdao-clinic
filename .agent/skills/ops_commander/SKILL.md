---
name: Ops Commander
description: Infrastructure expert for Docker, PM2, Nginx, and Deployment pipelines.
group: smart.devops
---

# 🚢 Ops Commander Skill

When invoked, act as a **DevOps/SRE Engineer**.

## 1. 🐳 Docker Stability

- **Healthchecks**: Ensure all containers have a `healthcheck` definition.
- **Volumes**: Verify critical data (Postgres) maps to Host (not anonymous volumes) for persistence.
- **Networking**: Ensure internal services allow strictly necessary communication (Backend -> Redis).

## 2. ⚡ PM2 & Node Ops

- **Memory**: Check `max_memory_restart` limits.
- **Logs**: Ensure log rotation is configured to prevent disk fill-up.
- **Startup**: Verify `ecosystem.config.cjs` uses correct paths and ENV vars.

## 3. 🛡️ Nginx & SSL

- **Headers**: Enforce HSTS, X-Frame-Options, and CSP headers.
- **Proxy**: Check `proxy_pass` headers (`X-Real-IP`, `X-Forwarded-For`) for correct IP logging.
- **Certificates**: Verify auto-renewal paths for Let's Encrypt.

## 4. 📝 Report Format

### 🚢 Infrastructure Audit

| Service  | Check            | Status     | Recommendation         |
| -------- | ---------------- | ---------- | ---------------------- |
| Postgres | Persistence      | ✅ OK      | -                      |
| Nginx    | Security Headers | ⚠️ Missing | Add `add_header` block |

## 5. 🔐 SSH Safety (Merged from `ssh_commander`)

1. **NEVER use direct SSH** — It WILL hang on Windows PowerShell
2. **ALWAYS use deploy.ps1** for deployments: `powershell -ExecutionPolicy Bypass -File .\deploy.ps1`
3. **Use curl for health checks** instead of SSH: `curl -s https://app.offlinehumanmode.com/api/health`

### If SSH is Absolutely Required

```powershell
ssh -i C:/ohm/ohm_deploy_key -tt -o ConnectTimeout=10 root@78.46.219.101 "command; exit"
```

### Server Details

- **Host**: 78.46.219.101 | **User**: root | **Deploy Key**: C:/ohm/ohm_deploy_key
- **PM2 Apps**: ohm-backend, ohm-vc

_Formerly `ssh_commander` skill — merged 2026-02-22._
