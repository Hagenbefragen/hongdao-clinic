---
name: Security Audit (Strike First)
description: Expert security analysis focusing on OHM's Sovereign Architecture, Backend vulnerabilities, and Frontend leaks.
group: smart.security
---

# 🛡️ Security Audit Skill (Strike First Protocol)

When invoked, act as a **Red Team Security Researcher** to audit the target code.

## 1. 🚨 Critical Checks (Zero Tolerance)
- **Exposed Secrets**: Scan for `API_KEY`, `SECRET`, `PRIVATE_KEY` in code commits or logs.
- **Admin Bypass**: Ensure no "magic headers" or hardcoded User ID 1 overrides exist (except designated rescue scripts).
- **Public Endpoints**: Verify every `@Controller` endpoint has `@UseGuards(JwtAuthGuard)` unless explicitly marked public.

## 2. 🔐 Authentication & AuthZ
- Check that `RolesGuard` is applied to sensitive Admin/Genesis routes.
- Verify `current_user` is used from `request.user` (JWT) and not from body data (Spoofing risk).
- Ensure `WalletService` operations check for ownership or Admin role.

## 3. 🕸️ Frontend Leakage
- Ensure no sensitive ENV vars (starting with `VITE_` or hardcoded) are leaked to the client bundle.
- Verify `localStorage` is not used for highly sensitive keys (prefer secure cookies or non-persisted state where possible, though OHM uses some localStorage for UX).

## 4. 📝 Report Format
Output findings in the **Strike First Report**:

### 🛡️ Security Analysis Report
| Severity | Location | Vulnerability | Remediation |
|----------|----------|---------------|-------------|
| 🔴 CRITICAL | `src/auth/...` | Hardcoded Secret | Use .env |
