---
description: Update NI Flythrough visualization with latest layer wiring status
---

# /FlywheelUpdate — NI Flythrough Wiring Sync

// turbo-all

## 1. Scan All Detectors in `backend/src/aegis/intention-field/`

```powershell
(Get-ChildItem -File c:\ohm\backend\src\aegis\intention-field\*.ts | Where-Object { $_.Name -notlike '*.d.ts' -and $_.Name -notlike '*.spec.ts' }).Name | Out-File c:\tmp\all_detectors.txt -Encoding utf8
```

## 2. Scan All Imports in `aegis.service.ts`

```powershell
Select-String -Path c:\ohm\backend\src\aegis\aegis.service.ts -Pattern 'import.*from' | ForEach-Object { $_.Line } | Out-File c:\tmp\wired_imports.txt -Encoding utf8
```

## 3. Scan V2 Cascade Layers

```powershell
Select-String -Path c:\ohm\shared\aegis-v2\cascade-coordinator.ts -Pattern 'import.*from' | ForEach-Object { $_.Line } | Out-File c:\tmp\v2_imports.txt -Encoding utf8
```

## 4. Cross-Reference: Find UNWIRED (dead) modules

Compare `all_detectors.txt` against `wired_imports.txt`. Any file NOT imported = UNWIRED.

## 5. Update `ni-flythrough.html`

For each layer in the flythrough's `ALL_LAYERS` array:

- If the layer's source file IS imported in aegis.service.ts → set `wired: true`
- If the layer's source file is NOT imported → set `wired: false` (shows 💀 at 20%)
- Add any NEW detectors found that aren't in the flythrough yet

## 6. Verify Layer Count

The total count shown in the flythrough header must match:

- `WIRED_COUNT` = layers where wired === true
- `DEAD_COUNT` = layers where wired === false
- `TOTAL` = WIRED_COUNT + DEAD_COUNT

## 7. Check Latest Stellschrauben Version

```powershell
Get-ChildItem c:\ohm\Documentation\VC-EXIT\live-NI-Dashboard\data\v*_stellschrauben.json | Sort-Object Name | Select-Object -Last 1 -ExpandProperty Name
```

Read the latest version and check for any new layers or threshold changes.

## 8. Serve & Verify

```powershell
# Server should already be running, but if not:
cd c:\ohm\Documentation\VC-EXIT\live-NI-Dashboard; python -m http.server 8765
```

Open `http://localhost:8765/ni-flythrough.html` and verify:

- [ ] Total layer count matches audit
- [ ] Dead layers show 💀 at 20% contrast
- [ ] Knowledge Domain groups have consistent colors
- [ ] Phase tabs filter correctly
