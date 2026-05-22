---
description: Deploy Avatar Service to Production (Stub Mode)
---

# Deploy Avatar Service

// turbo-all

This workflow deploys the `ohm-avatar-service` to production following SSH best practices from `.agent/workflows/ssh_commands.md`.

## Prerequisites

- Code pushed to GitHub (OHMAvatar branch)
- deploy.ps1 already ran (frontend/backend deployed)
- Docker Desktop running on server

## Steps

### 1. Verify Frontend/Backend Deployed

Check that the main deployment completed:

```powershell
# ✅ SAFE - Use curl, not SSH
curl -s https://stream.offlinehumanmode.com/ | Select-String -Pattern "OHM"
curl -s https://app.offlinehumanmode.com/api/health
```

Expected: Both return valid responses.

### 2. Create Avatar Service Deployment Script

The server has a post-receive hook that handles frontend/backend, but avatar service needs manual deployment.

Create `deploy-avatar.ps1` in root:

```powershell
# This script will be created automatically
# It handles avatar service deployment safely
```

### 3. Run Avatar Deployment

// turbo

```powershell
powershell -ExecutionPolicy Bypass -File ".\deploy-avatar.ps1"
```

This script:

- Extracts DB password from existing .env
- Creates avatar service .env
- Builds Docker images
- Starts containers
- Configures Nginx
- Tests health endpoint

### 4. Verify Avatar Service Running

// turbo

```powershell
# ✅ SAFE - Use curl, not SSH
curl -s https://app.offlinehumanmode.com/avatar/health
```

Expected: `{"status":"healthy","version":"1.0.0"}`

### 5. Test Avatar Upload (Manual)

Open browser:

1. Go to https://stream.offlinehumanmode.com
2. Login with Genesis
3. Join room
4. Click 🤖 Avatar Studio button
5. Upload test video
6. Watch progress

## Troubleshooting

### Avatar service not starting

```powershell
# Check logs via deploy script (not direct SSH!)
# The deploy-avatar.ps1 script includes log checking
```

### Nginx not configured

```powershell
# The deploy-avatar.ps1 script handles Nginx config
# If issues, check the script output
```

## Important Notes

**🚨 NEVER use direct SSH commands like:**

```powershell
# ❌ BAD - WILL HANG
ssh root@78.46.219.101 "docker-compose up -d"
```

**✅ ALWAYS use:**

- `deploy.ps1` for main deployments
- `deploy-avatar.ps1` for avatar service
- `curl` for health checks
- Deployment scripts handle all SSH internally with proper timeouts

## Success Criteria

- [ ] Avatar health endpoint returns 200
- [ ] 🤖 button visible in stream
- [ ] Can upload video
- [ ] Progress updates work
- [ ] Thumbnail extracted
- [ ] Avatar marked "ready"

## References

- `.agent/workflows/ssh_commands.md` - SSH best practices
- `Documentation/INFRASTRUCTURE/Avatar_Deployment_Guide.md` - Detailed manual steps
- `deploy.ps1` - Main deployment script (reference example)
