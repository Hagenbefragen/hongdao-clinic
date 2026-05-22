---
name: Skill Forge
description: Self-learning organizational skill. When something new is discovered or invented the hard way, immediately capture it as a new skill or update an existing one. Ensures OHM is a Self-Learning, Self-Improving Sovereign Organization.
group: smart.docs
---

# 🔥 Skill Forge — Self-Learning Organization Loop

## Purpose

Every time the agent (or user) **discovers something new** — a hard-won technique, a workaround, a pattern, a tool integration — it MUST be captured as a skill immediately. This prevents knowledge decay and ensures the organization continuously improves.

## Trigger Conditions

The Skill Forge activates **automatically** when ANY of these happen:

| # | Trigger | Example |
|---|---------|---------|
| 1 | **Hard-won solution** | "I spent 3 attempts to figure out how to make X work" |
| 2 | **New pattern discovered** | "This approach to Y is reusable across the ecosystem" |
| 3 | **External knowledge applied** | "I found this technique from a forum/docs that solved our problem" |
| 4 | **Workaround invented** | "The standard way doesn't work, but this hack does" |
| 5 | **Self-heal in Ship Engine** | Phase 2 self-healed a problem → capture the fix pattern |
| 6 | **User teaches something** | User explains a workflow/concept the agent didn't know |
| 7 | **Audit reveals gap** | BPC audit finds a missing capability → create skill to fill it |

## Decision Tree

```
Discovery happens during work
    │
    ├── Is there an existing skill that covers this?
    │   ├── YES → UPDATE the existing SKILL.md
    │   │         Add new section, example, or pattern
    │   │         Bump version note at bottom
    │   │
    │   └── NO → Does this warrant a full new skill?
    │       ├── YES (reusable, complex) → CREATE new skill
    │       │   └── Follow New Skill Template below
    │       │
    │       └── NO (small tip) → Add to nearest related skill
    │           as a "Tips & Gotchas" entry
    │
    └── Log the learning in Ship Report (Phase 5)
        under "🔥 Skill Forge Captures" section
```

## New Skill Template

When creating a NEW skill, use this structure:

```markdown
---
name: [Skill Name]
description: [One-line purpose]
---

# [Emoji] [Skill Name]

## Purpose
[WHY this skill exists — what problem it solves]

## When to Use
[Trigger conditions — when should the agent invoke this]

## Process
[Step-by-step instructions]

## Examples
[At least one concrete example]

## Anti-Patterns
[What NOT to do]

## Integration Points
[Which other skills or workflows this connects to]
```

## Update Protocol

When UPDATING an existing skill:

1. **Read** the current SKILL.md fully
2. **Identify** the right section to add/modify
3. **Add** the new knowledge with a clear heading
4. **Add** a version note: `<!-- Skill Forge Update: YYYY-MM-DD — [what was added] -->`
5. **Verify** the skill still reads coherently

## Integration with Ship Engine

The Skill Forge is embedded in the Ship Engine pipeline at TWO points:

### Point 1: Phase 2 (Self-Heal) — Capture Fix Patterns

When Phase 2 auto-fixes something, check:
- Was this fix non-obvious?
- Could this problem recur in other contexts?
- If YES → Forge a skill entry

### Point 2: Phase 5 (Report) — Retrospective Capture

The Ship Report template includes a mandatory section:

```markdown
## 🔥 Skill Forge Captures

| Discovery | Action | Skill Updated/Created |
|-----------|--------|-----------------------|
| [what was learned] | [created/updated] | [skill name + link] |
```

If the table is empty, the agent must actively reflect:
"Did I learn anything new during this PDD execution?"

### Point 3: Phase 6 (Feedback Loop) — User Insights

When user feedback contains teachable moments:
- Extract the learning
- Create or update the relevant skill
- Link back to the feedback source

## Quality Standards

- **Actionable**: Every skill entry must be actionable (not just "I learned X")
- **Reproducible**: Include enough context that a future agent can apply it
- **Linked**: Reference the PDD or conversation where the learning originated
- **Concise**: Skills are reference docs, not novels

## Anti-Patterns

| ❌ Don't | ✅ Do |
|----------|-------|
| Skip capturing because "it's obvious" | Capture it — obvious to you, novel to future context |
| Create a skill for every tiny thing | Use judgment — merge small learnings into existing skills |
| Write vague descriptions | Include concrete code, commands, or steps |
| Forget to link to source | Always reference the PDD or conversation ID |

## Metrics

Track these to measure organizational learning:

| Metric | Target |
|--------|--------|
| Skills created per sprint | ≥ 2 |
| Skills updated per sprint | ≥ 5 |
| Average skill age before update | < 30 days |
| Orphan skills (never referenced) | < 10% |

## Orchestra Position

```
Ship Engine Phase 2 ──→ Skill Forge (capture fix)
Ship Engine Phase 5 ──→ Skill Forge (retrospective)
Ship Engine Phase 6 ──→ Skill Forge (user insights)
Need Detective ────────→ Skill Forge (market knowledge)
Any Agent Work ────────→ Skill Forge (ad-hoc discovery)
         │
         └──→ Updated Skills feed back into ALL future work
              (Self-Improving Sovereign Loop)
```
