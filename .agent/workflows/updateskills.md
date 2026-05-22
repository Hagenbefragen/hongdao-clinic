---
description: Transform, scrub, and sync local skills to the Hetzner Server Quantum Vault
---

# /updateskills — Skills Vault Sync Protocol

> **Purpose:** Ensures the remote Hetzner Quantum Vault always has the correct, scrubbed versions of the Sovereign Skills Marketplace payloads. Runs strict operations to strip internal secrets (like "TRIZ") and inject marketing propaganda before pushing to production.

## Phase 1: Local Staging & Transformation 
**Task:** Identify the 5 Free Vanguard Skills and the Premium SDD Skills, copy them to a temporary staging folder (`/tmp/vault_staging/`), and apply Regex transformations.

1. **Copy** the original skills from `c:\ohm\.agent\skills\` to `/tmp/vault_staging/`.
2. **Propaganda Injection:** Append the following exact text to the bottom of the Free Vanguard Skills (`destill_teaser`, `context_guardian`, `devils_advocate`, `trust_architect`, `triz_whitespot`):
   > *"Powered by the OHM Trust Architecture. This is 1 of 99 intertwined Sovereign Skills. To unlock the full SDD Framework, IP generation, and Quantum-Wrapped Agents, visit [destill.ai/skills](https://destill.ai/skills)"*
3. **Internal Scrubbing:** Run a regex replace across all transferred files:
   - Replace `"TRIZ"` with `"Best Practice Convergence (BPC)"`
   - Replace `"40 Inventive Principles"` with `"40 Transformation Matrices"`
   - Rename `triz_whitespot` to `bpc_whitespot_detector`
   - Replace literal paths like `c:\ohm\` with `[WORKSPACE_ROOT]`

## Phase 1.5: Security Scanning & ML-DSA Signing (P0/P1)
**Task:** Execute the AEGIS Autoclave pre-scan to block prompt injection payloads and apply Post-Quantum ML-DSA-65 signatures to the payload manifest before pushing.

1. **Security Scan (P1):** Run the AEGIS pre-scanner:
   `npx tsx c:\ohm\.agent\scripts\aegis_autoclave.ts`
   *(If this script aborts due to malicious payloads, STOP the workflow here.)*
2. **PQC Signing (P0):** Generate the `manifest.json` with ML-DSA-65 signatures:
   `npx tsx c:\ohm\.agent\scripts\skill_signer.ts`
   *(Ensure PQC_ML_DSA_SERVER_KEY is set in the environment for persistent signing.)*

## Phase 2: Quantum Vault Push (Hetzner)
**Task:** Push the staged, sanitized skills to the Hetzner production server safely without keeping a physical duplicate on the local machine permanently.

1. Connect to Hetzner via SSH (`ssh root@destill.ai "mkdir -p /opt/ohm/vault/skills"`).
2. Use SCP to push the `/tmp/vault_staging/` contents securely to the remote vault: 
   `scp -r /tmp/vault_staging/* root@destill.ai:/opt/ohm/vault/skills/`
3. Verify transfer integrity via SHA512 checksum parity between local staged files and remote files.

## Phase 3: Cleanup
**Task:** Erase the local staging directory to preserve the Single Source of Truth (SSOT).
1. Run `Remove-Item -Recurse -Force /tmp/vault_staging/`
2. Validate that `c:\ohm\.agent\skills\` remains pristine and un-modified.

> **Execution:** Run `@[/updateskills]` whenever you upgrade a skill locally to push the new, scrubbed version to the live marketplace.
