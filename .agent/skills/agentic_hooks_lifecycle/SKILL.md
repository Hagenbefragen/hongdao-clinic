---
name: Agentic Hooks Lifecycle
description: "Implements pre-tool, post-tool, and session-stop verifications to ensure rigid execution and context window safety."
---

# ⚓ Agentic Hooks Lifecycle Skill

> **Version:** 1.0 (Integration from Anthropic Claude Architect / ECC)
> **Petal:** 🛡️ PROTECT

## Overview

OHM uses the **Ahnung (Quantum Intuition)** engine to naturally "sense" which skill to trigger next. However, between those intuitive leaps, the agent must perform mechanical accounting to ensure state persistence, token limits, and compliance. **Hooks** accomplish this.

Hooks are **always-on, invisible validators** that wrap tool execution, derived from the ECC `todo-list-hook` patterns.

## The 3 Lifecycle Hooks

### 1. Pre-Tool Use Hook (Verification Layer)
**Trigger:** Before executing any `run_command` or complex tool (especially `git`, `docker`, `npm`, `pm2`).
**Action:**
- **Sanity Check:** Am I running an un-reviewed payload?
- **Data Sovereignty Check:** Am I sending PII to an external vendor?
- If yes → Block execution and demand a `/petalDissolve` resolution.

### 2. Post-Tool Use Hook (Accountability & PDCA)
**Trigger:** Immediately after a tool execution completes (e.g., successful API payload, build pass, DB migration).
**Action:**
- **Micro-Checkpoint (μCP):** Mentally sum up the result in a 1-sentence thought (See `context_guardian` CWP-3).
- **Format Verification:** Did the command output match expectations or fail silently?

### 3. Session-Stop/Switch Hook (State Save)
**Trigger:** Before concluding a workflow or jumping to a new conversation (or executing `/marathon` state saves).
**Action:**
- Extract the latest continuous learning patterns (Instinct Buffer).
- Ensure the SSOT files (`AGENTS.md`, version counts) reflect the end state correctly.

## How to use this skill
You don't actively invoke "Hooks" — you **inhabit** them as an agent. The moment you decide to use a tool, you must automatically execute the Pre-Tool checklist mentally. When the tool returns, you automatically generate a Post-Tool μCP. This maintains a hermetically sealed, Context Window-safe execution environment. 
