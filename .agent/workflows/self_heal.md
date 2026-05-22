---
description: 
---

# /self_heal — Autonomous Code Repair Workflow

## Purpose
Automates the detection, diagnosis, and repair of failing tests, lint errors, and runtime crashes. Designed to run "overnight" or on-demand to harden the codebase without human intervention.

## When to Use
- When tests are failing and you want the agent to attempt a fix.
- When you want to run a deep scan and repair technical debt (TODOs).
- When initializing a new repository to establish baseline quality.

## Input
- Optional: specific file path or directory to target.
- Default: Runs full project scan.

## Workflow Steps

// turbo-all

### Phase 1: Diagnostics (The "Checkup")

1.  **Run Full Test Suite**:
    ```bash
    npm run test
    ```
2.  **Parse Failures**: Identify failing test files and specific test cases.
3.  **Lint Check**:
    ```bash
    npx eslint . --fix
    ```
    (If eslint is installed)
4.  **Type Check**:
    ```bash
    npx tsc --noEmit
    ```

### Phase 2: Autonomous Repair (The "Hospital")

For each identified failure:

5.  **Analyze Context**: Read source code + test code.
6.  **Hypothesize Fix**:
    - Is it a null reference? -> Add `?.` or default value.
    - Is it a type error? -> Fix interface or cast safely.
    - Is it logic? -> Adjust algorithm based on expected vs actual.
7.  **Apply Patch**: Modify the source code.
8.  **Verify**: Re-run specific test.
    ```bash
    npx vitest run [path/to/test.ts]
    ```
9.  **Iterate**: If failed, try alternative fix (max 3 attempts).

### Phase 3: Hardening (The "Vaccine")

10. **Refactor Code**:
    - Wrap risky operations in `trySafe()` from `utils/self-healing.ts`.
    - Add explicit return types to functions.
    - Remove unused imports.

### Phase 4: Commit & Report (The "Discharge")

11. **Commit Fixes**:
    ```bash
    git commit -am "fix(auto): self-healing repair session [timestamp]"
    ```
12. **Generate Report**: Create `Documentation/Audits/SelfHealing/REPORT_[DATE].md`.

---

## Example Usage

Input: `/self_heal frontend/components/vc`

Result:
- Runs tests for VC components.
- Fixes null pointer in `FaceMasks.ts`.
- Adds error boundaries to `VideoEmbed.tsx`.
- Commits changes.
