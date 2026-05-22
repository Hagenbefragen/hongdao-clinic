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

## Remember
- The user's system uses **PowerShell 5.x**
- Always use `;` as command separator
- Or run commands in separate `run_command` calls
