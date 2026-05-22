---
name: Meisterprüfung (Master Inspection)
description: "Final-pass quality inspection skill that catches inconsistencies, structural defects, and SSOT violations AFTER the agent believes work is complete. Use this skill EVERY TIME you finish a multi-file operation, patent injection, HTML generation, document synchronization, or any task involving multiple dependent files. This is NOT a context health check — this inspects the WORK PRODUCT, not the agent's mental state. Triggers on: 'polishing', 'final check', 'verify consistency', 'ready to ship', 'ready to file', 'are we done', 'Meisterprüfung', or ANY completion of a multi-step task. Run this BEFORE declaring work complete. CRITICAL: This skill exists because /contextcheck only checks if the AGENT is healthy — it does NOT check if the OUTPUT is correct, consistent, and complete. The Meisterprüfung fills this gap."
---

# 🔍 Meisterprüfung — Master Inspection Skill

## Philosophy: How Humans Catch What AI Misses

### The Human Expert Pattern

Master craftsmen don't just verify their individual steps — they step back and inspect the **finished whole** as a **consumer would experience it**. This is fundamentally different from checking that each step executed correctly.

The key cognitive patterns humans use:

1. **Gestalt Perception** — "Does the whole feel right?" Humans scan the final output as a unified artifact, not as individual components. A table of contents that doesn't match the body JUMPS OUT at a human reader because they're reading it as a document, not as "injection step 4 of 7."

2. **Cross-Referencing Reflex** — When humans see a number, name, or reference, they instinctively ask "does this match what I know?" A human reading "Hagen Gundlach" would immediately check: "Wait, is that the right name?" AI agents don't have this reflex — they generate and move on.

3. **Invariant Awareness** — Experts carry mental invariants: "Section letters must be unique", "Claim numbers must be contiguous", "The inventor name is always X." When an invariant is violated, the violation is immediately apparent. AI agents must be explicitly taught these invariants.

4. **Reading as the Consumer** — The most powerful check: read the output as someone who has NEVER seen the work process. Open the file fresh, start from the top, and ask: "Does this make sense? Is anything missing? Does anything contradict itself?"

5. **The Smell Test** — Something "smells wrong" when patterns break. A human notices when a list jumps from AV to AX without AW. When a 300KB file suddenly becomes 500KB. When a section title in the TOC doesn't match the section title in the body.

6. **SSOT Triangulation** — Experts automatically check facts against known trustworthy sources. Not "did I write it correctly?" but "does what I wrote match the source of truth?"

### Why /contextcheck Misses This

`/contextcheck` (CWP-4/CWP-5) verifies:
- ✅ Is the AGENT still thinking clearly? 
- ✅ Can the agent recall the original request?
- ✅ Is the agent following rules?

But it does NOT verify:
- ❌ Is the OUTPUT internally consistent?
- ❌ Does the output match ALL sources of truth?
- ❌ Are there pre-existing defects that interact with new changes?
- ❌ Would a human reader notice anything wrong?

**The Meisterprüfung closes this gap.**

---

## When to Trigger (MANDATORY)

Run the Meisterprüfung **BEFORE declaring any multi-file task complete**. Specifically:

1. After injecting content into HTML/patent documents
2. After synchronizing content between multiple files (e.g., Filing Copy ↔ Master)
3. After updating any SSOT-dependent value (version numbers, counts, names)
4. After generating any filing/legal/official document
5. After any `/petalShip` completion
6. When the user says "is everything done?" or "ready to file?"
7. After ANY task where you said "All checks passed ✅"

**If you skip this step and the user catches a defect, that is a SKILL FAILURE.**

---

## The 7-Point Meisterprüfung Protocol

### Point 1: 📋 Table of Contents ↔ Body Parity

**What humans do:** Open the document, read the TOC, then scroll through the body. Every TOC entry must have a matching body section. Every body section must appear in the TOC.

**How to check:**
```
FOR EACH entry in TOC:
   VERIFY: matching section exists in body
   VERIFY: title matches EXACTLY (case, FEAT number, wording)
FOR EACH section in body:
   VERIFY: matching entry exists in TOC
FLAG: duplicate letters, missing entries, mismatched titles
```

### Point 2: 🔢 Sequential Integrity

**What humans do:** Scan numbering for gaps, duplicates, or out-of-order sequences.

**Check:**
- Paragraph numbers: contiguous within sections (gaps between sections OK)
- Claim numbers: strictly contiguous (no gaps allowed)
- Section letters: alphabetically sequential (no gaps, no duplicates, no collisions)
- Figure/table numbers: sequential within scope

### Point 3: 🔗 Cross-Reference Validity

**What humans do:** When they see "as described in Section X" or "the method of Claim Y", they flip to verify it exists.

**Check:**
- Every dependent claim references an existing independent claim
- Every cross-reference to a section points to a real section
- Every reference to an equation, figure, or table points to something real

### Point 4: 🧑 Identity & Proper Noun Verification

**What humans do:** They know the inventor's name. They know their company name. They notice when it's wrong.

**Check:**
- Inventor name matches the SSOT (existing patent docs, not agent's training data)
- Company/entity names match SSOT
- Patent application numbers match SSOT (parent, CIP, extensions)
- Filing dates match SSOT
- Product names, technology names match codebase naming

**CRITICAL RULE:** NEVER generate a person's name, company name, or application number from training data or context. ALWAYS read it from an existing document in the repository first.

### Point 5: 📐 SSOT Triangulation

**What humans do:** They verify facts against the authoritative source — not their memory of it, but the actual source document.

**Check against these SSOTs:**
- `AGENTS.md` — agent counts, version numbers, DR-xxx decisions
- `ABBREVIATIONS.md` — term expansions
- Existing patent documents — inventor info, filing numbers, dates
- `backend/src/` — technical terms, function names, service names
- `.agent/workflows/ports_reference.md` — port numbers

**METHOD:** For EVERY proper noun, number, or technical reference in your output, trace it back to a source file. If you cannot find the source file, mark it as UNVERIFIABLE.

### Point 6: 📄 Multi-File Synchronization

**What humans do:** They open BOTH files side by side and compare.

**When you modify related files, verify:**
- Spec content identical in Filing Copy and Master (minus claims)
- Counts, totals, and summaries match between files
- If File A references File B's content, File B actually has that content
- No accidental leftovers from previous injections
- HTML comments match the actual HTML content

### Point 7: 👁️ Fresh Eyes Reading

**What humans do:** They close all their work, take a coffee break, come back, and read the document from the top as if they've never seen it.

**AI equivalent:** After completing all work, generate a summary of the document by reading it section-by-section (not from memory). Compare this summary against what you THINK the document contains. Any discrepancy is a defect.

**Specifically:**
- Read the first 200 lines (header, abstract, TOC)
- Read the last 200 lines (final sections, appendix)
- Read a random middle section
- Does the abstract accurately describe what's in the document?
- Does the claims line match actual claim counts?
- Does the filing metadata match reality?

---

## Output Format

```
🔍 MEISTERPRÜFUNG — Final Inspection Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Point 1 — TOC↔Body: [✅ PASS / ❌ N issues]
🔢 Point 2 — Sequential: [✅ PASS / ❌ N issues]
🔗 Point 3 — Cross-Refs: [✅ PASS / ❌ N issues]
🧑 Point 4 — Identity: [✅ PASS / ❌ N issues]
📐 Point 5 — SSOT: [✅ PASS / ❌ N issues]
📄 Point 6 — Sync: [✅ PASS / ❌ N issues]
👁️ Point 7 — Fresh Eyes: [✅ PASS / ❌ N issues]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERDICT: [🟢 Ship / 🟡 Minor Polish / 🔴 Rework]

[List each finding with severity and fix]
```

---

## Anti-Patterns to Prevent

These are the specific failure modes this skill prevents:

| Anti-Pattern | What Happened | Prevention |
|-------------|--------------|-----------|
| **"Done" Blindness** | Agent declares "all checks passed" because all STEPS succeeded, but doesn't check the RESULT | Point 7: Fresh Eyes Reading |
| **Training Data Leakage** | Agent generates names/numbers from training data instead of reading them from files | Point 4: Identity Verification |
| **Injection Amnesia** | Agent injects content but forgets to update TOC/abstract/summary | Point 1: TOC↔Body Parity |
| **Collision Ignorance** | New content collides with pre-existing content (duplicate section letters) | Point 2: Sequential Integrity |
| **Hallucinated Standards** | Agent references standards that don't exist or misattributes them | Point 5: SSOT Triangulation |
| **Partial Sync** | Two files that should be synchronized have diverged | Point 6: Multi-File Sync |

---

## Integration with Existing Skills

The Meisterprüfung should be the LAST step before any of these:
- `/petalShip` → Run Meisterprüfung before declaring SHIP complete
- `/provisional_patent` → Run before filing
- `/deploy` → Run before deploying
- `/audit_BP` → The Meisterprüfung IS the missing audit dimension

It complements but does NOT replace:
- `/contextcheck` — Agent health (keep running this too)
- `/ipFortress` — Patent-specific legal audit
- Quality Gateway — Skill output quality

**The Meisterprüfung is about the WORK PRODUCT, not the AGENT or the PROCESS.**

---

## Example: What Would Have Been Caught

If this skill had been run after the FEAT-294 patent injection:

1. **Point 1** would have caught: "FEAT-294 sections BG-BT are NOT in the TOC"
2. **Point 2** would have caught: "Section AT appears 4 times, Section AV has 2 different FEATs"
3. **Point 4** would have caught: "Inventor name not verified against existing docs"
4. **Point 5** would have caught: "ISO 19439 is not an insurance data standard"
5. **Point 7** would have caught: "Claims line still says 93 instead of 103"

Total time cost: ~2 minutes of automated checking. 
Total credibility saved: immeasurable.
