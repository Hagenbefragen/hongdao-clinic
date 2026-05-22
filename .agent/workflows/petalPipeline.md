---
description: SDD Petal Pipeline — Structured output enforcement for every petal execution. Produces typed PETAL_HANDOFF.json files. Self-eating-dogfood for FEAT-240.
---

# 📋 /petalPipeline — Structured Petal Output Enforcement

// turbo-all

> **PURPOSE:** Every petal execution MUST produce a structured `PETAL_HANDOFF.json` in the FEAT folder.
> This workflow ensures agents eat their own dogfood (FEAT-240) by creating typed outputs, not just prose.
> **Created:** 2026-03-16 (FEAT-240)

## When to Use

**ALWAYS.** Every time `/petalSense`, `/petalDissolve`, `/petalShip`, `/petalSell`, `/petalProtect`, or `/petalMeasure` executes, the agent MUST update the `PETAL_HANDOFF.json` in the FEAT folder.

## PETAL_HANDOFF.json Schema

After completing ANY petal, update or create `PETAL_HANDOFF.json` in the FEAT folder:

```
Documentation/features/research/FEAT-XXX_[topic]/
  1_SENSE_[topic]_REPORT.md
  2_DISSOLVE_[topic]_REPORT.md
  ...
  PETAL_HANDOFF.json    ← THIS FILE (machine-readable state)
```

### Required Fields Per Petal

| Petal | Required Output Fields |
|-------|----------------------|
| **SENSE** | `pmfScore`, `decision`, `rejected[]`, `contradictions[]` |
| **DISSOLVE** | `survivability`, `contradictionsFound`, `contradictionsDissolved`, `keyInnovations[]`, `devilsAdvocate.scores{}` |
| **SHIP** | `agentsMdEntries[]`, `patentClaims{}`, `interfaces[]` |
| **SELL** | `tiers{}`, `projections{}`, `tcoSavings`, `blendedConversion` |
| **PROTECT** | `complianceChecks[]`, `securityScore`, `vulnerabilitiesFound`, `vulnerabilitiesFixed` |
| **MEASURE** | `metrics{}`, `pdcaCycle`, `healthScore` |

## Rule: No Prose Without Data

> 🔴 **FORBIDDEN:** Writing a petal report without updating `PETAL_HANDOFF.json`.
> The JSON file IS the structured output. The markdown report IS the human narrative.
> Both MUST be created in the SAME operation.

## Integration with VS Code Agent Flow

The `PETAL_HANDOFF.json` can be read by:
1. **Other agents** — Any Antigravity session can read the JSON to understand where a FEAT stands
2. **Knowledge items** — KI generation can extract structured data from JSON
3. **Future pipeline** — When Activepieces + Temporal are wired, the JSON becomes the actual IPC payload
4. **Dashboard** — The NI Dashboard can render FEAT progress from these files

## 🪞 Honest Completion Statement (MANDATORY — Toltec Agreement 1)

> **"Be Impeccable with Your Word"** — Every PETAL_HANDOFF.json MUST include an `honestCompletionStatus` field.

Add this to the PETAL_HANDOFF.json schema for EVERY petal:

```json
{
  "honestCompletionStatus": "TRUE_COMPLETE | PARTIAL_CONTEXT_LIMIT | PARTIAL_TIME_LIMIT | PARTIAL_*",
  "reasonForStopping": "Human-readable explanation",
  "poccResult": "N/Total outputs verified",
  "agentSelfAssessment": "1-2 honest sentences"
}
```

> The agent MUST output this field honestly. `TRUE_COMPLETE` with incomplete POCC = Toltec Agreement 1 violation.
