---
description: Auto-accept all run command prompts (turbo mode)
---

// turbo-all

# Turbo Mode Workflow

When this workflow is invoked with `/turbo`, ALL `run_command` tool calls will be auto-approved without user confirmation.

## Usage
Simply type `/turbo` before your request to enable auto-run mode for that session.

## Example
```
/turbo restart all services
/turbo npm install in all projects
/turbo clean and rebuild everything
```

## Safety Note
This mode trusts the AI to make safe command decisions. Use when you want fast execution without confirmations.

## ZERO-CLICK Global Policy (Auto-Accept)
As defined in `autoaccept.md`, the user has granted **full, pre-approved permission** to execute ALL terminal commands.
The Agent should default to `SafeToAutoRun: true` for ALL commands unless there is a specific reason to doubt safety.
**"Pushes ALT+ENTER" behavior:** This effectively means the Agent runs commands immediately, mimicking a user hitting Run.
