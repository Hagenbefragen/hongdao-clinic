---
description: PowerShell command syntax rules - NEVER use && operator
---

# PowerShell Command Syntax Rules

## ⚠️ CRITICAL: NEVER USE `&&` IN POWERSHELL

The user is running **PowerShell 5.x** (Windows built-in), which does **NOT** support the `&&` operator.

### ❌ WRONG (will fail):
```powershell
cd frontend && npm run dev
npm install && npm run build
```

### ✅ CORRECT (use semicolon `;`):
```powershell
cd frontend; npm run dev
npm install; npm run build
```

### ✅ ALTERNATIVE (separate commands):
Run each command separately in its own `run_command` call.

## Summary Table

| Bash/PowerShell 7+ | PowerShell 5.x (Windows) |
|-------------------|-------------------------|
| `cmd1 && cmd2`    | `cmd1; cmd2`            |
| `cmd1 || cmd2`    | Use `if` statements     |

---

## 🔧 Node.js / npm — Reliable Execution

Node.js is at `C:\Program Files\nodejs` but PS5 may block `.ps1` wrappers due to `ExecutionPolicy`.

### Quick Build (Frontend Only)

// turbo
```powershell
cmd /c "set PATH=C:\Program Files\nodejs;%PATH% && cd /d c:\ohm\frontend && npx vite build"
```

### Quick Build (Frontend + Backend)

// turbo
```powershell
cmd /c "set PATH=C:\Program Files\nodejs;%PATH% && cd /d c:\ohm\frontend && npx vite build && cd ..\backend && npm run build"
```

### TypeScript Check (No Emit)

// turbo
```powershell
cmd /c "set PATH=C:\Program Files\nodejs;%PATH% && cd /d c:\ohm\frontend && npx tsc --noEmit"
```

### Dev Server

// turbo
```powershell
cmd /c "set PATH=C:\Program Files\nodejs;%PATH% && cd /d c:\ohm\frontend && npm run dev"
```

### Install Dependencies

// turbo
```powershell
cmd /c "set PATH=C:\Program Files\nodejs;%PATH% && cd /d c:\ohm\frontend && npm install --legacy-peer-deps"
```

## Why `cmd /c`?

PowerShell 5.x blocks `.ps1` wrappers (npm.ps1, npx.ps1) when `ExecutionPolicy` is Restricted.  
Using `cmd /c` bypasses this entirely by running through `cmd.exe` which uses `.cmd` wrappers instead.

## Remember
- The user's system uses **PowerShell 5.x**
- Always use `;` as command separator in PS
- For npm/node commands: use `cmd /c "set PATH=C:\Program Files\nodejs;%PATH% && ..."` pattern
- Or run commands in separate `run_command` calls
