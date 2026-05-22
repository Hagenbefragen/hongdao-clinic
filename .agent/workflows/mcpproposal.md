---
description: Submit MCP specification security enhancement proposals to the MCP GitHub repository
---

# /mcpproposal — MCP Spec Security Enhancement Proposals

## Context
On March 11, 2026, Hagen sent a responsible disclosure email to security@anthropic.com documenting 11 MCP specification-level security gaps. The email promised constructive spec enhancement proposals via the MCP GitHub repository in ~2 weeks.

**Patent Protection:** All innovations are protected by US Provisional #64/002,237 (March 11, 2026).
**Repo:** https://github.com/modelcontextprotocol/modelcontextprotocol
**Contributing Guide:** See CONTRIBUTING.md — proposals must follow 3 stages: Define → Prototype → Write

## Pre-Submission Checklist
- [ ] Anthropic has had ≥2 weeks to review (email sent March 11, 2026)
- [ ] No response from Anthropic blocking publication
- [ ] All proposals reviewed by Hagen
- [ ] AI disclosure statement prepared (required by MCP CONTRIBUTING.md)

## Proposal Strategy

### What to Submit (Constructive, Non-Patent-Prohibitive)
Submit as **GitHub Issues** (not PRs) using the "Specification Proposal" format.
Focus on PROBLEM DEFINITION + backwards-compatible spec field suggestions.
Do NOT share full implementation details — keep those sovereign.

### What NOT to Submit
- Full pseudocode or implementation
- AEGIS-specific architecture details 
- Attack exploit specifics
- Anything that could enable attackers

## The 5 Proposals (One Issue Each)

> Pre-drafted proposals are in: `c:\ohm\Documentation\MCPProposal\`

### Proposal 1: Tool Manifest Integrity Verification
**File:** `01_manifest_hash.md`
**Covers:** Gaps 1 (Rug Pull)
**Spec Enhancement:** Add optional `manifest_hash` field to `ServerCapabilities`
**Backwards Compatible:** Yes — servers that don't provide it behave as today

### Proposal 2: Response Sanitization Hook  
**File:** `02_sanitize_output.md`
**Covers:** Gaps 3 (Indirect Prompt Injection) + 7 (Credential Extraction)
**Spec Enhancement:** Add optional `sanitize_output` capability and `content_policy` response field
**Backwards Compatible:** Yes — opt-in per server

### Proposal 3: Agent Identity Isolation
**File:** `03_agent_identity.md`
**Covers:** Gaps 4 (Multi-Agent Lateral Movement) + 5 (Confused Deputy)
**Spec Enhancement:** Add `agent_id` to request metadata and `session_isolation` capability
**Backwards Compatible:** Yes — ignored by servers that don't implement it

### Proposal 4: Graduated Trust Model
**File:** `04_trust_orbit.md`  
**Covers:** Gaps 9 (New-Server Exploitation) + 6 (Rate DoS)
**Spec Enhancement:** Add `trust_level` to server registration and `rate_policy` capability
**Backwards Compatible:** Yes — defaults to current behavior (fully trusted)

### Proposal 5: Binary Parameter Screening
**File:** `05_binary_screen.md`
**Covers:** Gaps 8 (Steganographic Payloads) + 10 (RAG Poisoning) + 11 (Audit Erasure)
**Spec Enhancement:** Add `binary_screen` capability and `audit_chain` session field
**Backwards Compatible:** Yes — opt-in screening for binary tool parameters

## Execution Steps

// turbo-all

1. Review the pre-drafted proposals in `c:\ohm\Documentation\features\research\FEAT-192_Agent_Rules_And_MCP_Servers\github_proposals\`

2. Open each proposal file and confirm content with USER

3. For each proposal, open a GitHub Issue at https://github.com/modelcontextprotocol/modelcontextprotocol/issues/new using the browser:
   - Title: `[Spec Proposal] {title}`
   - Body: Copy from the pre-drafted markdown
   - Add AI disclosure at bottom: "AI assistance (Antigravity) was used to help format this proposal. The security research, gap analysis, and proposed mitigations were conducted by the human author (Hagen Schmidt, Destill.ai)."

4. After all 5 issues are created, record the issue numbers in `c:\ohm\Documentation\features\research\FEAT-192_Agent_Rules_And_MCP_Servers\GITHUB_ISSUES_LOG.md`

5. Update the outreach email log with a note that proposals were submitted

## Tone Guidelines
- **Constructive:** "We noticed X gap and suggest Y improvement"
- **Non-commercial:** No pitch language, no "buy our product"
- **Non-patent-threatening:** Don't mention patents in GitHub issues
- **Evidence-based:** Link to CVEs, OWASP, and real attack patterns
- **Respectful:** Acknowledge the MCP team's excellent work on the protocol
