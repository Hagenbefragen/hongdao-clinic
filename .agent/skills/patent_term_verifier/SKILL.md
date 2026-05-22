---
name: Patent Term Verifier
description: MANDATORY pre-filing verification skill that cross-checks ALL acronyms, technical terms, and expansions in patent documents against the actual codebase source of truth. Prevents hallucinated terminology from entering legal filings. Must be run BEFORE any /provisional_patent filing. Zero tolerance for mismatches.
---

# Patent Term Verifier — Anti-Hallucination Guard for Patent Filings

> **MANDATORY:** This skill MUST be executed before ANY patent filing operation.
> **Trigger:** Automatically invoked by `/provisional_patent`, `/patent`, `/ipFortress`, and `/petalShip` when claims are involved.
> **Created:** 2026-03-17 after discovering 4 hallucinated POAW expansions in V5.1 filing documents.

## Background — Why This Exists

On 2026-03-17, a routine patent filing review discovered that the AI agent had hallucinated FOUR different wrong expansions for the same acronym POAW:

| Hallucinated Term | Occurrences | Correct Term |
|---|---|---|
| Proof of **Authentic** Work | 14 | Proof of **Agent** Work |
| Proof of **Actual** Work | 16 | Proof of **Agent** Work |
| Proof of **Autonomous** Work | 2 | Proof of **Agent** Work |
| Proof of **Audit** Work | 3 | Proof of **Agent** Work |

This is unacceptable in a legal filing. Patent documents become PERMANENT public records. Wrong terminology can invalidate claims, create prosecution history estoppel, or give examiners grounds for rejection under 35 USC § 112(b) (indefiniteness).

## Authoritative Acronym Dictionary

The following is the SINGLE SOURCE OF TRUTH for all OHM/Destill.ai acronyms. Sources are actual codebase files.

| Acronym | Full Expansion | Source File | SSOT |
|---------|---------------|-------------|------|
| **POAW** | Proof of Agent Work | `backend/src/poaw/README.md:1` | ✅ |
| **AEGIS** | Adversarial Evaluation Guard & Intelligence System | `backend/src/destill-wrapper/wolf-guard.ts` | ✅ |
| **SIREN** | Self-Improving Recursive Evaluation Network | `backend/src/destill-wrapper/scythe-inoculation.service.ts` | ✅ |
| **QFAI-C** | Quantum-Fibonacci AI Coherence | `backend/src/destill-wrapper/aegis.service.ts` | ✅ |
| **AAQA** | Autonomous Agent Quality Assurance | `backend/src/aaqa/` module | ✅ |
| **ODA** | Oracle Defense Architecture | Patent Section D | ✅ |
| **STENO-LLM** | Stenographic LLM Compression | Patent Section H | ✅ |
| **PMB** | Pattern Memory Bank | `backend/src/destill-wrapper/` | ✅ |
| **GTO** | Ground Truth Oracle | `Documentation/features/research/FEAT-228_*` | ✅ |
| **PAAL** | Piece API Abstraction Layer | `AGENTS.md` DR-082 | ✅ |
| **BPC** | Best Practice Compliance | `AGENTS.md` | ✅ |
| **ML-DSA** | Module-Lattice Digital Signature Algorithm | NIST FIPS 204 | ✅ |
| **ML-KEM** | Module-Lattice Key Encapsulation Mechanism | NIST FIPS 203 | ✅ |
| **PQC** | Post-Quantum Cryptography | NIST standards | ✅ |
| **NI** | Nachvollziehbare Intelligenz (Traceable Intelligence) | Project name | ✅ |
| **SSOTA** | Sovereign Secure Over-The-Air | Patent Section O | ✅ |
| **DCIA** | Dual Constitutional Invariant Architecture | Patent Sections | ✅ |
| **CMIOB** | Cross-Modal Input-Output Bridge | Patent Section Q | ✅ |
| **OMA** | Output Modality Adapter | Patent Section Q | ✅ |
| **HSM** | Hardware Security Module | Industry standard | ✅ |
| **BYOJ** | Bring Your Own Jailbreaks | FEAT-243 | ✅ |
| **SDD** | Skill-Driven Development | `.agent/skills/` | ✅ |
| **PDCA** | Plan-Do-Check-Act | Deming Cycle | ✅ |
| **XOM** | OHM Token | `backend/src/` | ✅ |
| **TRIZ** | Theory of Inventive Problem Solving (Russian) | Altshuller | ✅ |
| **FTO** | Freedom to Operate | Patent law | ✅ |
| **IDS** | Information Disclosure Statement | USPTO Form SB/08 | ✅ |
| **TPR** | True Positive Rate | Statistics | ✅ |
| **FPR** | False Positive Rate | Statistics | ✅ |
| **SYARA** | Semantic YARA Rule Engine | `backend/src/aegis/aegis.service.ts` (FEAT-185) | ✅ |
| **UVID** | Ultrasonic Verb Inversion Detector | `backend/src/aegis/intention-field/ultrasonic-verb-inversion.ts` (D-30b) | ✅ |
| **HCG** | Harmonic Coherence Gate | `backend/src/aegis/intention-field/harmonic-coherence-gate.ts` (D-23) | ✅ |
| **HSD** | Honest Signal Detector | `backend/src/aegis/intention-field/honest-signal-detector.ts` (D-24) | ✅ |
| **ICS** | Intention Coherence Score | `backend/src/aegis/aegis.service.ts` | ✅ |
| **CRI** | Cascaded Response Isolation | Patent Section C | ✅ |
| **UMA** | Universal Modality Adapter | Patent Section Q | ✅ |
| **AIBOM** | AI Bill of Materials | Patent Sections | ✅ |
| **NI-HB** | NI Holographic Blackboard | Patent Section Y (Wheeler Oracle) | ✅ |
| **NI-AIBOM** | NI AI Bill of Materials | Patent Sections | ✅ |
| **SIREN-LITE** | SIREN Lightweight (physics-law-based variant) | Patent Section R | ✅ |
| **FORTRESS** | FORTRESS Content Protection | Application No. 64/004,392 | ✅ |
| **CTD** | Canonical Terminology Dictionary | Patent Section AG | ✅ |
| **CRVE** | Cross-Reference Verification Engine | Patent Section AG | ✅ |
| **IDCA** | Intra-Document Coherence Analyzer | Patent Section AG | ✅ |
| **ICC** | International Criminal Court | International law reference | ✅ |

## Execution Protocol

### Step 1: Extract All Acronym Expansions from Patent Document

```powershell
# Extract all "ACRONYM (Expansion)" patterns from the patent file
$content = Get-Content $PATENT_FILE -Raw
$matches = [regex]::Matches($content, '([A-Z]{2,}[-]?[A-Z]*)\s*\(([^)]{5,80})\)')
foreach ($m in $matches) {
    Write-Host "$($m.Groups[1].Value) = $($m.Groups[2].Value)"
}
```

### Step 2: Cross-Check Against This Dictionary

For EVERY expansion found in Step 1, verify it matches the dictionary above. Report ALL mismatches.

### Step 3: Search for Known Hallucination Patterns

```powershell
# These are KNOWN hallucination targets — check for them specifically
$wrongPatterns = @(
    'Proof of Actual Work',
    'Proof of Authentic Work',
    'Proof of Autonomous Work',
    'Proof of Audit Work',
    'Proof of Automated Work'
)
foreach ($wrong in $wrongPatterns) {
    $count = ([regex]::Matches($content, [regex]::Escape($wrong))).Count
    if ($count -gt 0) { Write-Host "HALLUCINATION FOUND: '$wrong' x $count" }
}
```

### Step 4: Verify Against Codebase

```powershell
# For any acronym not in the dictionary, search the codebase
$tsFiles = Get-ChildItem "c:\ohm\backend\src" -Recurse -Include "*.ts"
$expansion = $tsFiles | Select-String -Pattern "$ACRONYM" -List
```

### Step 5: Generate Verification Certificate

Output a verification report listing:
- Total acronyms checked
- Total mismatches found
- Total hallucinations fixed
- PASS/FAIL status

**A FAIL blocks the filing. No exceptions.**

## Integration Points

This skill is called by:
- `/provisional_patent` workflow (Step: Pre-Filing Verification)
- `/patent` workflow (Step: Quality Gate)
- `/petalShip` workflow (when claims are being drafted)
- `/ipFortress` workflow (Step: Claim Hardening)

## Update Protocol

When a NEW acronym is introduced:
1. Add it to the dictionary table above
2. Specify the source file
3. Mark as ✅ SSOT verified
