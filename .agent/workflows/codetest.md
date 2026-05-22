---
description: Run comprehensive holistic code integrity checks (Security, Lint, Build, Test)
---

# /codetest - Holistic Code Integrity & Best Practice Check

// turbo-all

## 1. 🛡️ Security & Dependencies
1.  **Audit**: Check for vulnerabilities (Quick scan, don't block unless critical).
    ```bash
    npm audit --audit-level=critical
    ```

## 2. 🏗️ Frontend Integrity (frontend/)
1.  **Type Check**: Ensure no TypeScript errors.
    ```bash
    cd frontend
    npx tsc --noEmit
    ```
2.  **Build**: Verify production build succeeds.
    ```bash
    npm run build
    ```
3.  **Unit Tests**: Run Vitest (Ensure environment is configured).
    ```bash
    npx vitest run
    ```

## 3. ⚙️ Backend Integrity (DigitalTwin/backend/)
1.  **Type Check & Build**:
    ```bash
    cd DigitalTwin/backend
    npm run build
    ```
2.  **Smoke Tests**: Verify core logic scripts.
    ```bash
    npx ts-node src/scripts/test_phase5.ts
    ```

## 4. 🚦 Decision Gate
*   ✅ **ALL GREEN**: You are permitted to run Browser Automation.
*   ❌ **ANY RED**: STOP. Fix the code. **Zero Tolerance** for build errors.
