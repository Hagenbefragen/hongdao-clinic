---
name: Cascade Optimizer — Multi-Layer Defense Analysis & Auto-Improvement
description: Deep analysis skill for interconnected multi-layer defense systems (AEGIS, QFAI-C, SIREN, POAW, NI-Shield). Detects architectural inefficiencies, wasted computation, miscounted metrics, dead layers, and suboptimal sequencing. Produces actionable fixes and re-tests.
group: smart.ai
---

# Cascade Optimizer — Multi-Layer Defense Analysis & Auto-Improvement

## Academic & Industry Foundations

This skill applies **6 proven optimization paradigms** from computer science,
machine learning, and cybersecurity research to multi-layer LLM defense cascades:

### 1. Viola-Jones Cascade Pattern (2001, Viola & Jones)

**Source**: "Rapid Object Detection using a Boosted Cascade of Simple Features" (CVPR 2001)  
**Principle**: Arrange classifiers in a cascade where:

- **Cheapest, most discriminative** classifiers run **first**
- If a stage **rejects** an input, immediately **short-circuit** — do NOT process further stages
- Only **ambiguous** inputs proceed to expensive later stages
- **Key metric**: Reject rate per stage × cost per stage = total efficiency

**Application to AEGIS**: ICS (cheap regex) should block DECEPTIVE prompts immediately.
Downstream dissolutions (D1-D25) should NOT scan already-blocked prompts.

### 2. MITRE ATT&CK Choke Point Analysis (2024, Center for Threat-Informed Defense)

**Source**: MITRE ATT&CK Top Techniques Methodology  
**Principle**: Score each detection layer by:

```
ChokepointScore = prevalence × actionability × position_weight
```

- **Prevalence**: How often does this attack type appear?
- **Actionability**: Can the layer actually block it (vs. just flag)?
- **Position weight**: Is it at a critical junction in the kill chain?

Layers with ChokepointScore ≈ 0 are candidates for removal or reconfiguration.

### 3. Dead Neuron Detection (2024, neptune.ai / DemP)

**Source**: "Demon Pruning: Structured Pruning via Dead Neuron Elimination" (arxiv 2024)  
**Principle**: In deep neural networks, neurons that consistently produce near-zero
activations are "dead" — they consume computation but contribute nothing.

**Detection method**: Activation Monitoring

```
For each layer L:
  dead_ratio = count(activation == 0) / total_inputs
  if dead_ratio > 0.95:
    MARK AS DEAD → candidate for pruning
```

**Application to AEGIS**: Defense layers with 0 flags AND 0 blocks across 100+ prompts
are "dead neurons" — they waste computation without contributing to defense.

### 4. Control Flow Graph (CFG) Reachability Analysis

**Source**: Compiler optimization theory (Aho, Sethi, Ullman — Dragon Book)  
**Principle**: Dead Code Elimination (DCE) in compilers identifies code that can never
be reached and removes it. Similarly, in a defense cascade:

```
IF prompt is BLOCKED at stage N:
  ALL stages N+1, N+2, ... are UNREACHABLE for this prompt
  → Any scan counts from these stages are PHANTOM SCANS
  → They inflate metrics and waste CPU
```

**Application to AEGIS**: The scan count of 100 for ALL layers when 24 were blocked
in Stage 1 means there are 24 × (N-1 layers) = 24 × 25+ = 600+ phantom scans.

### 5. OWASP LLM Four-Checkpoint Framework (2025)

**Source**: OWASP Top 10 for LLM Applications 2025  
**Principle**: Organize safety along two axes:

- **Processing stage**: Input vs. Output
- **Detection level**: Literal (regex, pattern) vs. Intent (semantic, behavioral)

```
           | Literal          | Intent
-----------+------------------+------------------
Input      | Regex/FSA scan   | ICS Intention
Output     | PII/SIREN check  | Drift/Coherence
```

**Application**: Ensures each quadrant has coverage. Dead layers may indicate
a quadrant that's over-covered while another is under-covered.

### 6. LLM Cascade Architecture (2024, arxiv)

**Source**: "Privacy-Aware LLM Cascades" (arxiv 2024)  
**Principle**: Use a hierarchy of models:

- **Cheap guard model** handles easy cases (benign clearly benign)
- **Expensive deep model** handles ambiguous cases only
- **Result**: 60-80% of inputs resolved by cheap model, saving cost

**Application to AEGIS**: GENUINE prompts (ICS > 0.85) should skip ALL defensive
layers and go directly to QFAI-C → LLM → SIREN. Only AMBIGUOUS prompts need
the full 25+ layer cascade.

---

## Analysis Framework (7 Phases)

### Phase 1: Scan Flow Integrity Audit

**Goal**: Detect phantom scans — layers scanning prompts already blocked upstream.

```
RULE: If Stage N blocks K prompts, Stage N+1 should scan (Total - K) prompts.
VIOLATION: Stage N+1 scans Total prompts despite K blocks.
METRIC: phantom_scans = sum(layer.scans - expected_scans for each layer)
```

**Severity**: 🚨 CRITICAL — Inflates all downstream metrics, wastes CPU,
misleads dashboard, increases SCI carbon intensity.

**Fix Pattern** (from Viola-Jones short-circuit):

```typescript
// AFTER setting finalDecision = 'BLOCK':
if (finalDecision === "BLOCK") {
  // Short-circuit: skip ALL remaining analysis
  // Only track the blocking layer, emit result, continue to next prompt
  break; // or continue; depending on structure
}
```

### Phase 2: Dead Layer Detection (DemP Method)

**Goal**: Identify layers with zero contribution across the test corpus.

```
For each layer L in CASCADE:
  activation_ratio = (L.flags + L.blocks) / L.scans

  Classification:
    activation_ratio == 0.0     → DEAD (prune candidate)
    activation_ratio < 0.01    → DORMANT (threshold review)
    activation_ratio < 0.10    → LOW_ACTIVATION (may need recalibration)
    activation_ratio >= 0.10   → ACTIVE (contributing)
```

**Output**: Ranked list of layers by activation ratio.

### Phase 3: Layer Effectiveness Score (LES)

**Goal**: Rank layers by their unique contribution to defense.

```
LES(layer) = unique_blocks(layer) / total_adversarial_prompts

Where unique_blocks = prompts ONLY this layer caught
      (not caught by any prior layer in the cascade)
```

**Additional metrics**:

```
Redundancy(layer) = overlap_blocks / total_blocks
  Where overlap_blocks = prompts this layer blocks that were ALREADY blocked upstream

Efficiency(layer) = blocks / computation_cost_ns
```

### Phase 4: Choke Point Mapping (MITRE Method)

**Goal**: Identify which layers sit at critical decision junctions.

```
For each layer L:
  chokepoint_score =
    (L.blocks / total_blocks) ×           // Prevalence
    (L.blocks / L.flags) ×                // Actionability (can it block, not just flag?)
    position_weight(L.stage_number) ×      // Earlier = higher weight
    diversity(L.caught_categories)         // Catches diverse attack types?
```

Layers with high chokepoint_score should be promoted to earlier stages.
Layers with chokepoint_score ≈ 0 should be demoted or removed.

### Phase 5: Parallelization Analysis (CFG Independence Check)

**Goal**: Identify layers that can run concurrently.

```
Two layers A and B can run in parallel IFF:
  1. A does not read any state written by B (no data dependency)
  2. B does not read any state written by A (no data dependency)
  3. Neither modifies shared state (no side effects)
  4. Order of A, B does not affect final decision (commutative)
```

**AEGIS-specific parallel groups**:

```
Group 1 (Pure Analyzers — no shared state):
  analyzeHarmIntent(), analyzeCredentialStacking(), analyzeFictionHarmGate(),
  analyzeMetaLearning(), analyzeUrgencyExploitation(), analyzeSocialProof(),
  analyzeEscalationBridge(), analyzeHonestSignals()
  → Run with Promise.all()

Group 2 (Session-dependent — need sessionId):
  analyzeEchoChamberSegmentation(), analyzePredatorPrey(), analyzeMycorrhizalNetwork()
  → Sequential within group, but parallel with Group 1

Group 3 (Post-block only — conditional):
  v2.scan(), globalPMB.scan()
  → Only if finalDecision !== 'BLOCK' after Groups 1+2
```

### Phase 6: Threshold Calibration (φ-Harmonic Tuning)

**Goal**: Optimize detection thresholds using Golden Ratio boundaries.

```
For each layer L with threshold T:
  If L.flags > 0 AND L.blocks == 0:
    → T is too high — layer flags but never blocks
    → Recommendation: Lower T by φ⁻¹ × (T - min_score)

  If L.false_positives > 0:
    → T is too low — layer blocks legitimate prompts
    → Recommendation: Raise T by φ⁻² × (max_score - T)

  If L.flags == 0 AND L.blocks == 0:
    → Either T is way too high, or the layer simply doesn't match this attack type
    → Check: Does the layer match ANY attack type in the full corpus?
    → If no: DEAD layer → prune
    → If yes: DORMANT for this scenario → acceptable
```

### Phase 7: Conditional Short-Circuit Paths

**Goal**: Based on ICS zone, skip unnecessary layers.

```
DECEPTIVE Path (ICS < 0.4):
  → BLOCK immediately
  → Skip: V1, FSA, D1-D25, V2, SIREN, Ollama
  → Cost: 1 computation (ICS only)

GENUINE Path (ICS > 0.85):
  → Skip: V1, FSA, D1-D11 (all dissolutions)
  → Continue: QFAI-C compression → Ollama → SIREN verification
  → Cost: ~3 computations (ICS + QFAI-C + SIREN)

AMBIGUOUS Path (0.4 ≤ ICS ≤ 0.85):
  → Run FULL cascade (all layers needed for uncertain prompts)
  → Cost: ~30 computations (all layers)
```

**Expected speedup**: If 40% GENUINE + 25% DECEPTIVE:
65% of prompts take cheap path → ~4x overall throughput improvement

---

## Execution Protocol

1. **Ingest**: Read Layer Activity table from test results
2. **Phase 1**: Scan Flow Integrity → flag phantom scans
3. **Phase 2**: Dead Layer Detection → flag dead/dormant layers
4. **Phase 3**: Layer Effectiveness Score → rank all layers
5. **Phase 4**: Choke Point Mapping → identify promotion/demotion candidates
6. **Phase 5**: Parallelization → identify concurrent groups
7. **Phase 6**: Threshold Calibration → adjust φ-harmonic thresholds
8. **Phase 7**: Conditional Paths → design short-circuit routes
9. **Generate**: Specific code changes for each finding
10. **Apply**: Implement fixes
11. **Re-test**: Run same scenario, compare before/after metrics

## Output Format

```markdown
## CASCADE OPTIMIZER REPORT v2.0

### Test: [Scenario Name] — [N prompts]

### 🚨 CRITICAL FINDINGS

| # | Issue | Paradigm | Phantom Scans | Fix |

### ⚠️ DEAD LAYERS (DemP Analysis)

| Layer | Activation Ratio | Classification | Recommendation |

### 📊 LAYER EFFECTIVENESS RANKING (LES)

| Rank | Layer | LES | Unique Blocks | Chokepoint | Action |

### 🔀 PARALLELIZATION OPPORTUNITIES

| Group | Layers | Dependencies | Speedup |

### 🎯 THRESHOLD CALIBRATIONS

| Layer | Current T | New T | Rationale |

### ⚡ SHORT-CIRCUIT PATHS

| Path | Condition | Layers Skipped | Cost Reduction |

### 📈 BEFORE/AFTER COMPARISON

| Metric | Before | After | Δ |
```

## References

1. Viola, P. & Jones, M.J. (2001). "Rapid Object Detection using a Boosted Cascade" — CVPR
2. MITRE Center for Threat-Informed Defense (2024). "Top ATT&CK Techniques Methodology"
3. neptune.ai (2024). "Dead Neurons in Neural Networks: Detection and Impact"
4. arxiv (2024). "Demon Pruning: Structured Pruning via Dead Neuron Elimination"
5. OWASP (2025). "Top 10 for LLM Applications — Four-Checkpoint Framework"
6. arxiv (2024). "Privacy-Aware LLM Cascades for Multi-Objective Optimization"
7. Aho, Sethi, Ullman. "Compilers: Principles, Techniques, and Tools" (Dragon Book)
8. NIST SP 800-53 Rev 5 — Security and Privacy Controls, Defense in Depth
9. CardinalOps (2024). "Security Layers: Measuring Depth of Detection Coverage"
