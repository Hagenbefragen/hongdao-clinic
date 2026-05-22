---
description: Generate & Update the FEAT-077 Ecosystem Process Map
---

# /processMAP

This workflow regenerates the **OHM Ecosystem Process Map** HTML from the mermaid source file.

1.  **Requirement**: `.agent/knowledge/process_map_data.mmd` exists.
2.  **Output**: `.agent/artifacts/ecosystem_process_map.html` (Interactive HTML with pan/zoom).

// turbo
```powershell
powershell -ExecutionPolicy Bypass -File "./generate_process_map.ps1"
```

Use `Start-Process ".agent/artifacts/ecosystem_process_map.html"` to view the map in your default browser.
