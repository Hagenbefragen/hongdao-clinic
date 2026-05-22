# SSH Commander Skill

This skill provides safe, reliable SSH command execution for the OHM production server.

## 🚨 CRITICAL RULES

1. **NEVER use direct SSH** - It WILL hang on Windows PowerShell
2. **ALWAYS use deploy.ps1** for deployments
3. **Use curl for health checks** instead of SSH

## Safe Patterns

### Deployment

```powershell
# ✅ CORRECT
powershell -ExecutionPolicy Bypass -File .\deploy.ps1
```

### Health Check

```powershell
# ✅ Use browser or curl, NOT SSH
curl -s https://app.offlinehumanmode.com/api/health
```

### If SSH is Absolutely Required

```powershell
# Use the deploy key from C:/ohm/ohm_deploy_key
# Use -tt for TTY allocation
# ALWAYS add ; exit at the end
ssh -i C:/ohm/ohm_deploy_key -tt -o ConnectTimeout=10 root@188.245.235.51 "command; exit"
```

## Server Details

- **Host**: 188.245.235.51
- **User**: root
- **Deploy Key**: C:/ohm/ohm_deploy_key
- **PM2 Apps**: ohm-backend, ohm-vc

## Workflow Integration

This skill is triggered automatically when:

- Running server commands
- Checking PM2 status
- Viewing server logs
- Any SSH-related operation
