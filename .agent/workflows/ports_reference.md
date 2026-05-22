---
description: Port Configuration Reference - SINGLE SOURCE OF TRUTH
---

# ⚠️ PORT CONFIGURATION REFERENCE

**THIS FILE IS READ-ONLY. DO NOT EDIT PORTS HERE.**

For all port configurations, see: **`Documentation/INFRASTRUCTURE/PORTS.md`**

## Quick Reference (Per PORTS.md)

### Core Backend Ecosystem

- **Backend API**: `3000` (localhost & production)
- **Postgres (Core)**: `5433` (host) → `5432` (container)
- **Redis (Core)**: `6380` (host) → `6379` (container) ⚠️ **NOT 6379 on host!**

### LiveKit (WebRTC) - 🚨 FIREWALL CRITICAL!

**🔴 BUG-148 HALLELUJA (2026-01-29):**

- Container runs in `--network host` mode
- Nginx proxies to `7880` directly (NOT `8880`)
- Redis is on `6380` (NOT `6379`)
- Backend .env is at `/root/ohm-live/backend/` (NOT `/root/ohm-main/backend/`)

| Port   | Protocol | Purpose            | Firewall Required       |
| ------ | -------- | ------------------ | ----------------------- |
| `7880` | TCP      | Signaling (direct) | Via Nginx → 7880        |
| `7881` | TCP      | RTC TCP fallback   | ✅ `ufw allow 7881/tcp` |
| `7882` | **UDP**  | RTC media          | ✅ `ufw allow 7882/udp` |
| `3478` | **UDP**  | TURN NAT traversal | ✅ `ufw allow 3478/udp` |
| `5349` | TCP      | TURN TLS           | ✅ `ufw allow 5349/tcp` |

**🔴 BUG-148 Lessons:**

1. If "could not establish pc connection" → Check LiveKit container is NOT in --dev mode
2. If "invalid API key: devkey" → Check `/root/ohm-live/backend/.env` has correct keys
3. If "Failed to fetch" → Check Nginx proxies to `7880` not `8880`

### Antigravity IDE (Remote Development)

- **Antigravity Web**: `8443` (localhost, behind Nginx)
- **Public URL**: `https://ide.offlinehumanmode.com` (password-protected)
- **Service**: `systemctl status antigravity-web`

### Digital Twin Stack

- **DT API**: `8003`
- **DT Postgres**: `5434` → `5432`
- **DT Redis**: `6381` → `6379`
- **Ollama**: `11434`

### Frontend Dev

- **App (Vite)**: `5173` → Proxies `/api` to `:3000`
- **Twin (Vite)**: `5174`
- **Website (Vite)**: `5175`

## Usage in Workflows

When referencing ports in ANY workflow or documentation:

1. **Always check PORTS.md first**
2. **Link to PORTS.md** in your workflow
3. **Never hardcode** port assumptions

### Example Reference

```markdown
**Ports:** Verified against `Documentation/INFRASTRUCTURE/PORTS.md`
```

### Example Health Checks

```powershell
# Backend health (per PORTS.md: 3000)
curl localhost:3000/api/health

# LiveKit health (per PORTS.md: 7880 direct in host mode)
curl localhost:7880
# Via Nginx:
curl https://app.offlinehumanmode.com/livekit
```

## ⚠️ If Ports Don't Match

If you find a port mismatch:

1. **PORTS.md is the authority**
2. Update the code/config to match PORTS.md
3. Update PORTS.md ONLY if there's a valid architectural reason
4. Document the change with date and reason

## 🔥 WebRTC Troubleshooting (BUG-148 HALLELUJA)

If video calls fail with "could not establish pc connection":

```bash
# 1. Check LiveKit container is NOT in --dev mode
docker inspect ohm-livekit --format '{{.Args}}'
# Should show: [--config /livekit.yaml ...]
# NOT: [--dev --bind 0.0.0.0]

# 2. Check Nginx proxies to correct port
grep -A5 '/livekit/' /etc/nginx/sites-enabled/*
# Should show: proxy_pass http://127.0.0.1:7880/;

# 3. Check Redis port in livekit.yaml
cat /root/ohm-main/livekit-docker/livekit.yaml | grep redis -A2
# Should show: address: 127.0.0.1:6380

# 4. Check API keys in backend .env
cat /root/ohm-live/backend/.env | grep LIVEKIT
# Should show production keys, NOT 'devkey'

# 5. Restart if needed
docker restart ohm-livekit
pm2 restart ohm-backend --update-env
nginx -t && systemctl reload nginx
```

---

**Last Updated**: 2026-02-11 (Added Antigravity IDE port 8443)  
**Maintained By**: Infrastructure Team
