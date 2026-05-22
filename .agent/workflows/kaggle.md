---
description: Master workflow for Kaggle competition participation. READ FIRST, EXECUTE SECOND. No assumptions, no trial-and-error.
---

# /kaggle — Kaggle Competition Master Workflow

**"READ First. EXECUTE Second. No Assumptions. No Trial-and-Error."**

> **Toltec Foundation:** This workflow is built on the Five Toltec Agreements.
> Every step enforces: Be Impeccable (accuracy), Don't Assume (research), Don't Take It Personally (stay objective), Always Do Your Best (one clean version), Be Skeptical but Listen (trust the source code over your assumptions).

---

## 🏛️ The Toltec Mandate

> **It is FORBIDDEN to push a single version to Kaggle before completing Phase 1 (Deep Research).**
> Trial-and-error is the symptom of broken assumptions. Assumptions are the enemy.

### The AIMO Lesson (FEAT-267, 2026-03-20)

11 versions were wasted because of 4 unresearched assumptions:
1. Output format assumed `.csv` — competition required `.parquet`
2. Function signature assumed `(str, str)` — API sends `(pl.Series, pl.Series)`
3. Notebook format assumed `kernelspec` was optional — `papermill` crashes without it
4. Function name assumed flexible — gRPC server requires exact `__name__` match

**Every one of these was documented in files we had access to but didn't read.**

---

## Phase 1: Deep Research (MANDATORY — No Code Allowed)

> **Gate:** You may NOT write or modify any submission code until this phase produces the SSOT document.

### Step 1.1: Read the Competition Overview Page

```
kaggle competitions list  # Verify competition slug
```

- Read the **full competition description** on the Kaggle website
- Extract: evaluation metric, submission format, time limits, hardware constraints
- Extract: number of problems, answer format, answer range
- Extract: daily submission limits, total submission limits
- Extract: competition timeline (start, end, evaluation phases)

### Step 1.2: Download and Analyze ALL Competition Data

```
kaggle competitions download -c <competition-slug> -p <local-dir>
```

- Extract all files (CSV, Parquet, PDFs, ZIPs)
- Use `/pdf_reader` skill for any PDF documents (reference problems, rules, etc.)
- Read `sample_submission.csv` or `sample_submission.parquet` — note the EXACT format
- Read `test.csv` — understand the input schema (column names, types)
- Read `train.csv` if available — understand data distribution

### Step 1.3: Analyze the Competition API Source Code

> **CRITICAL:** For Code Competitions with `kaggle_evaluation`, you MUST read the source.

- Download and extract the `kaggle_evaluation` package files
- Read `__init__.py` — understand the top-level API
- Read the competition-specific gateway (e.g., `aimo_3_gateway.py`)
- Read `core/templates.py` — understand `InferenceServer` and `Gateway` base classes
- Read `core/relay.py` — understand gRPC serialization and endpoint registration
- Read `core/base_gateway.py` — understand `write_submission()` output format

**Document these answers explicitly:**

| Question | Answer |
|----------|--------|
| What format does `write_submission()` produce? | `.parquet` / `.csv` / other |
| What does `predict()` receive as arguments? | Types (str, pl.Series, pd.DataFrame, etc.) |
| What must `predict()` return? | Type (int, pd.DataFrame, pl.DataFrame, etc.) |
| How are endpoints registered? | `func.__name__` matching |
| What is `STARTUP_LIMIT_SECONDS`? | Exact value |
| What is the response timeout? | Exact value |
| Is `KAGGLE_IS_COMPETITION_RERUN` used? | How exactly? |

### Step 1.4: Study Top-Scoring Public Notebooks

- Search Kaggle for public notebooks in this competition
- Read at least 3 high-scoring submissions
- Note their: model choice, inference strategy, submission format, API usage
- Compare their `predict()` signature with what the API source code expects

### Step 1.5: Verify Hardware Constraints

- Check available GPU (P100, T4, etc.), RAM, disk space
- Check if internet is disabled during evaluation
- Check maximum runtime (typically 9 hours for AIMO)
- Model must fit in available VRAM — verify before choosing

### Step 1.6: Produce the SSOT Document

> **Gate:** This document must exist and be reviewed before ANY code is written.

Create: `Documentation/features/research/FEAT-XXX/KAGGLE_<COMPETITION>_SSOT.md`

Template:

```markdown
# Kaggle Competition SSOT: <Competition Name>

## Competition Identity
- **Slug:** <slug>
- **URL:** <url>
- **Deadline:** <date>
- **Daily Submissions:** <count>

## Evaluation
- **Metric:** <metric name and formula>
- **Public/Private Split:** <ratio>
- **Scoring Timeline:** <phases>

## Submission Format
- **File:** submission.parquet / submission.csv
- **Columns:** id (str), answer (int) / etc.
- **Answer Range:** 0-99999 / etc.

## API Contract (for Code Competitions)
- **Server Class:** AIMO3InferenceServer / etc.
- **predict() Input Types:** pl.Series / pd.DataFrame / str
- **predict() Return Type:** int / pd.DataFrame
- **Endpoint Registration:** func.__name__ must match
- **Output File:** written by gateway, format is .parquet

## Hardware
- **GPU:** P100 / T4
- **VRAM:** 16GB
- **RAM:** 16GB
- **Disk:** 20GB
- **Internet:** disabled during rerun
- **Max Runtime:** 9 hours

## Data Schema
- **test.csv columns:** id, problem
- **reference.csv columns:** id, problem, answer
- **Problem Count:** 50 public + 50 private = 110 total

## Notebook Requirements
- **Format:** .ipynb with kernelspec metadata
- **kernelspec:** {"display_name": "Python 3", "language": "python", "name": "python3"}
- **Single cell or multi-cell:** document requirement

## Known Pitfalls (from research)
1. <pitfall 1>
2. <pitfall 2>
```

---

## Phase 2: Implementation (One Clean Version)

> **Toltec Agreement 1: Be Impeccable with Your Word** — Every line of code must match the SSOT. No guessing.

### Step 2.1: Write the Submission Script

- Reference the SSOT document for EVERY API decision
- Use exact types from the API source code
- Use exact output format from `write_submission()` analysis
- Include proper `kernelspec` in notebook metadata

### Step 2.2: Local Validation

Before pushing to Kaggle:

- [ ] Python syntax valid (`ast.parse()`)
- [ ] No non-ASCII characters (prevents charmap errors)
- [ ] Import dependencies match Kaggle's container environment
- [ ] `predict()` signature matches API contract from SSOT
- [ ] Output format matches competition requirements from SSOT
- [ ] Model fits in available VRAM (check from SSOT)
- [ ] Notebook has proper `kernelspec` metadata

### Step 2.3: Push and Monitor

```powershell
# Push (first and hopefully ONLY version)
kaggle kernels push -p <path>

# Monitor
kaggle kernels status <username>/<kernel-slug>

# Download output and logs
kaggle kernels output <username>/<kernel-slug> -p <output-dir>
```

### Step 2.4: Submit

For Code Competitions:
```powershell
kaggle competitions submit -c <slug> -f submission.parquet -k <username>/<kernel> -v <version> -m "<message>"
```

Or use the GUI "Submit to Competition" button on the notebook's Output tab.

---

## Phase 3: Post-Submission

### Step 3.1: Monitor Scoring

```powershell
kaggle competitions submissions -c <slug>
```

### Step 3.2: Document Results

Update the SSOT document with:
- Final score (public and private)
- Rank / percentile
- What worked, what didn't
- Lessons learned for next competition

---

## 🚫 Forbidden Actions

- ❌ **NEVER** push code to Kaggle before completing Phase 1 SSOT
- ❌ **NEVER** assume the submission file format — READ the API source
- ❌ **NEVER** assume the predict() signature — READ the gateway code
- ❌ **NEVER** assume environment packages are available — CHECK the Kaggle container
- ❌ **NEVER** use trial-and-error to discover API requirements
- ❌ **NEVER** skip reading PDFs, reference docs, or sample notebooks

---

## 🐜 The Ant Principle (from AEGIS)

Just as our 114-agent AEGIS cascade reads every prompt before acting, the Kaggle workflow reads every document before coding. **No shortcuts. No assumptions. Full Nachvollziehbarkeit.**

---

## 📋 Integration

- `/pdf_reader` — Extract text from competition PDFs
- `/bestpractice` — Diamond Standard applies to submission code
- `/petalSense` — Research phase for novel approaches
- `/petalShip` — Implementation phase
- `/petalMeasure` — Post-submission analysis

---

**"READ the battlefield before you fire a single shot."** 🎯
