---
description: Restart the AEGIS benchmark server (tsx fast-compile mode)
---

# /restart - AEGIS Benchmark Server Restart

## CRITICAL: Use `tsx` NOT `ts-node`!

`ts-node` takes 30-45 minutes to compile `run_live_websocket_test.ts` (5200 lines).
`tsx` (esbuild-based) compiles in **under 15 seconds**.

// turbo-all

## Step 1: Kill all Node processes

```powershell
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3
```

## Step 2: Start Ollama (if not running)

```powershell
$ollama = Get-Process -Name "ollama" -ErrorAction SilentlyContinue
if (-not $ollama) {
  Start-Process -FilePath "ollama" -ArgumentList "serve" -WindowStyle Hidden
  Start-Sleep -Seconds 5
}
```

## Step 3: Start the AEGIS benchmark server

```powershell
cd c:\ohm\backend; npx -y tsx src/run_live_websocket_test.ts
```

Wait for the output showing:

```
🚀 http://localhost:8081  (Benchmark: 495 prompts)
```

## Step 4: Verify server is up

```powershell
$tcp = New-Object System.Net.Sockets.TcpClient
try { $tcp.Connect("localhost", 8081); "✅ Server running on port 8081"; $tcp.Close() } catch { "❌ Server not ready" }
```

## Step 5: Open dashboard

Navigate to http://localhost:8081 in browser.

## Notes

- **tsx vs ts-node**: `tsx` uses esbuild internally (Go-based compiler). Compilation: ~200ms vs ~45min.
- **Port**: 8081 (benchmark server)
- **Ollama**: Port 11434. If offline, cascade runs in CPU-only mode (simulated LLM responses).
- **NPU Bridge**: Port 11435. Optional — for ONNX Runtime DirectML hardware acceleration.
