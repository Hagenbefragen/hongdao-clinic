---
description: Generate comprehensive unit tests for any TypeScript module — patent-grade coverage with mathematical verification
---

# /unittest — Comprehensive Unit Test Generator

> **🧠 SKILL REQUIRED:** Before executing this workflow, read the **Test Engineer** skill at `.agent/skills/test_engineer/SKILL.md` for the 6-category test design framework (Boundary, Happy, Mathematical, Roundtrip, Comparative, Property-Based), floating point precision rules, and synthetic data factory patterns.

## Purpose
Generates a complete, production-grade unit test suite for any TypeScript module. Covers every exported function with edge cases, roundtrip verification, mathematical formula checks, and range validation. Inspired by the QFVC Patent Test Suite methodology.

## When to Use
- When you want to add test coverage to any `.ts` module
- When preparing code for audit, patent, or compliance review
- When refactoring and needing safety nets
- When you say: "test this", "unit tests for X", "cover this module"

## Input
The user provides ONE of:
1. A **file path** to a `.ts` module (e.g., `frontend/lib/qfvc/negentropy.ts`)
2. A **function name** (agent will locate the file)
3. A **feature description** (agent will find related files)

If no input is given, use the **currently active file** in the editor.

## Workflow Steps

// turbo-all

### Phase 1: Module Analysis (DO NOT SKIP)

1. **Read the target file outline** using `view_file_outline` to understand structure
2. **Identify all exported symbols**: functions, interfaces, types, constants
3. **Read each exported function** using `view_code_item` to understand:
   - Input parameters and their types
   - Return type and structure
   - Mathematical formulas or algorithms used
   - Edge cases mentioned in comments/docs
   - Dependencies on other modules
4. **Check existing tests**: Search for `*.test.ts` files in the same directory
5. **Check test infrastructure**: Verify vitest is configured (`vitest.config.ts`, `package.json` scripts)

### Phase 2: Test Design (THINK BEFORE WRITING)

For **each exported function**, design tests in these categories:

#### Category A: Boundary & Edge Cases
- Empty/null/undefined inputs
- Minimum valid inputs (smallest array, zero values)
- Maximum/overflow inputs
- Single-element inputs
- Type boundary values (0, -1, MAX_SAFE_INTEGER)

#### Category B: Happy Path
- Typical inputs with known expected outputs
- Multiple valid input variations
- Synthetic data with predictable results

#### Category C: Mathematical Verification
- If the function implements a formula, verify the formula independently
- Parseval's theorem, conservation laws, identity checks
- Verify constants (φ, π, e) are used correctly
- Check that output ranges match documented ranges ([0,1], positive, etc.)

#### Category D: Roundtrip / Inverse
- If encode/decode pairs exist, test encode→decode roundtrip
- If serialize/deserialize pairs exist, test both directions
- Verify lossless (or bounded-loss) round-trips

#### Category E: Comparative
- Compare related functions (fast vs. accurate variants)
- Verify ordering properties (sorted output, monotonic growth)
- Compare against known baselines or reference implementations

#### Category F: Property-Based
- Output type is always correct
- Output is always within documented range
- Deterministic (same input → same output)
- Required fields are never missing

### Phase 3: Test Implementation

6. **Create the test file** at `[module-name].test.ts` in the same directory as the source
7. **Structure the test file** following this template:

```typescript
/**
 * [Module Name] — Unit Test Suite
 * 
 * Tests [brief description of what's tested]
 * 
 * @module [module-path].test
 */

import { describe, it, expect } from 'vitest';
import { /* all exported symbols */ } from './[module]';

// ============================================================================
// HELPERS (if needed)
// ============================================================================

// Create synthetic test data factories here

// ============================================================================
// [FUNCTION 1 NAME]
// ============================================================================

describe('[FunctionName]()', () => {
  // A: Edge cases
  it('should handle empty input', () => { ... });
  it('should handle single element', () => { ... });
  
  // B: Happy path
  it('should compute correct result for typical input', () => { ... });
  
  // C: Mathematical verification  
  it('should satisfy [formula/property]', () => { ... });
  
  // D: Roundtrip (if applicable)
  it('should roundtrip through encode/decode', () => { ... });
  
  // E: Comparative
  it('should produce monotonically increasing output', () => { ... });
  
  // F: Property-based
  it('should always return value in [0, 1]', () => { ... });
});

// Repeat for each exported function...
```

8. **Use `toBeCloseTo()` for floating point** — NEVER use `toBe()` for float comparisons
9. **Create helper factories** for complex input types (ImageData, regions, etc.)
10. **Group related tests** with `describe()` blocks matching the source code sections

### Phase 4: Execution & Fix

11. **Run the tests**:
```
cd c:\OHM\frontend ; npx vitest run [path/to/test.ts] 2>&1 > c:\OHM\test-output-temp.txt ; Get-Content c:\OHM\test-output-temp.txt -Raw
```

12. **If tests fail**: 
    - Read the failure output carefully
    - Determine if it's a **test bug** (wrong expectation) or a **code bug** (real issue)
    - Fix test expectations if the code behavior is correct but the test assumed wrong
    - Report code bugs to the user if the code itself is incorrect
    - Re-run until ALL tests pass

13. **Run all QFVC tests together** to ensure no regressions:
```
cd c:\OHM\frontend ; npx vitest run lib/qfvc/ 2>&1 > c:\OHM\test-output-temp.txt ; Get-Content c:\OHM\test-output-temp.txt -Raw
```

14. **Clean up temp files**:
```
Remove-Item c:\OHM\test-output-temp.txt -Force -ErrorAction SilentlyContinue
```

### Phase 5: Commit & Report

15. **Commit the test file**:
```
cd c:\OHM ; git add [test-file-path] ; git commit -m "test([scope]): add unit tests for [module] - [N] tests covering [summary]"
```

16. **Report results** to user in this format:

```
## ✅ Unit Test Suite — [Module Name]

| Metric | Value |
|--------|-------|
| Test File | `path/to/module.test.ts` |
| Total Tests | N |
| Passed | N ✅ |
| Failed | 0 |
| Functions Covered | X / Y exported |
| Categories | Edge, Happy, Math, Roundtrip, Comparative, Property |

### Functions Tested
- `functionA()` — N tests (edge, happy, math)
- `functionB()` — N tests (roundtrip, property)
- ...

### Key Verifications
- ✅ [Formula X] mathematically verified
- ✅ [Roundtrip Y] lossless confirmed  
- ✅ All outputs in documented range [0, 1]
```

### Phase 6: Audit Documentation (MANDATORY)

After every successful test run, create or update audit documentation:

17. **Create individual test audit document** at:
```
Documentation/Audits/Unittest/UNITTEST_[MODULE_NAME]_[YYYY-MM-DD].md
```

Use this template structure:
```markdown
# 🧪 Unit Test Audit: [Module Name]

> **Module**: [Brief description]
> **Date**: [YYYY-MM-DD]
> **Author**: Antigravity Agent
> **Status**: ✅ ALL PASS (N/N)

## 📋 Summary
| Metric | Value |
|---|---|
| **Test File** | `path/to/test.ts` |
| **Source File** | `path/to/source.ts` |
| **Total Tests** | N |
| **Passed** | N ✅ |
| **Failed** | 0 |

## 🎯 Functions Tested
[Table of functions with test counts and categories]

## 🔑 Key Design Decisions
[Non-obvious findings and architectural notes]

## 📝 Commit
[Commit message used]
```

18. **Update the master index** at `Documentation/Audits/Unittest/UNITTEST_INDEX.md`:
- Add a new row to the **Test Suite Registry** table
- Update the **Ecosystem Test Summary** totals
- Link to the new audit document

19. **Commit the audit docs**:
```
cd c:\OHM ; git add Documentation/Audits/Unittest/ ; git commit -m "docs(unittest): add [module] test audit - [N] tests documented"
```

---

## Quality Standards

- **Minimum 5 tests per exported function** (aim for 8-12)
- **Every `describe()` block must have at least one edge case test**
- **No `any` types in test code** — use proper typing
- **No random seeds** — tests must be deterministic (use fixed seeds or deterministic data)
- **Use `toBeCloseTo()` for ALL floating point comparisons** (never `toBe()`)
- **Synthetic data must be self-documenting** — add comments explaining WHY each value was chosen
- **Test names must be descriptive** — reading test names alone should explain the module's contract

## Common Patterns

### Testing without DOM (Node environment)
```typescript
// Create synthetic ImageData without needing canvas
function createImageData(w: number, h: number, fill: (x: number, y: number) => [number, number, number, number]): ImageData {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const [r, g, b, a] = fill(x, y);
      data[idx] = r; data[idx+1] = g; data[idx+2] = b; data[idx+3] = a;
    }
  return { data, width: w, height: h, colorSpace: 'srgb' as PredefinedColorSpace };
}
```

### Testing Fibonacci/Golden Ratio properties
```typescript
// Verify φ identity: φ² = φ + 1
expect(PHI * PHI).toBeCloseTo(PHI + 1, 10);

// Verify consecutive ratio → φ
expect(arr[i+1] / arr[i]).toBeCloseTo(PHI, 5);
```

### Testing serialization roundtrips
```typescript
const original = createParams();
const serialized = serialize(original);
const deserialized = deserialize(serialized);
expect(deserialized.field).toBeCloseTo(original.field, 1); // quantization tolerance
```
