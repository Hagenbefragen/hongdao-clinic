---
description: Deploy the Digital Twin Stack to Hetzner (Independent of OHM Core)
---
# 🧠 Deploy: Digital Twin

This workflow deploys the Digital Twin AI stack:
- **Frontend** (`twin.offlinehumanmode.com`)
- **Backend** (API)
- **Vector DB / Ollama / Piper**

**Target Server:** `78.46.219.101`
**Reference:** `Documentation/INFRASTRUCTURE/PORTS.md` (Verify DT service ports: 8003, 5434, 6381, 11434, 6333, 5000, 5060)

// turbo-all
```powershell
./deploy_dt.ps1
```
