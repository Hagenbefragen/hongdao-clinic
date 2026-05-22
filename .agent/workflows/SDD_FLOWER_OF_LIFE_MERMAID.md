# 🌸 Flower of Life — Skill-Driven Development (SDD) Process

> The complete Mermaid reference for the OHM SDD 6-Petal Cycle.
> Each petal lists its skills, outputs, and gate criteria.

---

## 🌸 Master Flow — The Breathing Flower

```mermaid
graph TD
    START((○ AHNUNG<br/>φ-Intuition<br/>Quantum Seed))

    START -->|"12 o'clock · Outward"| SENSE

    subgraph PETAL1["🔭 SENSE — Scan the Field"]
        direction TB
        SENSE["🔭 SENSE PETAL<br/>Position: 12 o'clock<br/>Direction: Outward spiral"]
        S1["horizon_scanner<br/>Technology foresight"]
        S2["disruption_scout<br/>Innovation whitespace"]
        S3["need_detective<br/>Problem discovery"]
        S4["market_fit_validator<br/>PMF scoring"]
        S5["competitive_radar<br/>Competitor monitoring"]
        S6["blind_spot_detector<br/>What are we NOT seeing?"]

        SENSE --> S1 & S2 & S3 & S4 & S5 & S6

        S_OUT["📦 OUTPUTS<br/>━━━━━━━━━━━━━━━<br/>• 1_SENSE_[topic]_REPORT.md<br/>• Market landscape analysis<br/>• Competitor patent scan<br/>• PMF score (1-10)<br/>• Innovation whitespace map<br/>• Blind spot registry"]

        S1 & S2 & S3 & S4 & S5 & S6 --> S_OUT
    end

    S_OUT -->|"PMF ≥ 6 → GO"| DISSOLVE
    S_OUT -.->|"PMF < 6 → PIVOT"| START

    subgraph PETAL2["⚡ DISSOLVE — Break Contradictions"]
        direction TB
        DISSOLVE["⚡ DISSOLVE PETAL<br/>Position: 10 o'clock<br/>Direction: Outward spiral"]
        D1["triz_whitespot<br/>40 Inventive Principles"]
        D2["prior_art_research<br/>USPTO/EPO/WIPO search"]
        D3["devils_advocate<br/>Adversarial stress test"]
        D4["blind_spot_detector<br/>What did we miss?"]

        DISSOLVE --> D1 & D2 & D3 & D4

        D_OUT["📦 OUTPUTS<br/>━━━━━━━━━━━━━━━<br/>• 2_DISSOLVE_[topic]_REPORT.md<br/>• Contradiction matrix<br/>• TRIZ dissolution candidates<br/>• Prior art assessment<br/>• Survivability score (0-100)<br/>• Devil's Advocate verdict"]

        D1 & D2 & D3 & D4 --> D_OUT
    end

    D_OUT -->|"Survivability ≥ 70 → GO"| SHIP
    D_OUT -.->|"Survivability < 70 → FIX"| DISSOLVE

    subgraph PETAL3["🚀 SHIP — Build & Patent"]
        direction TB
        SHIP["🚀 SHIP PETAL<br/>Position: 4 o'clock<br/>Direction: Outward spiral"]
        H1["patent_claim_generator<br/>USPTO-format claims"]
        H2["ship_engine<br/>Autonomous build pipeline"]
        H3["innovation_journal<br/>Timestamped disclosure"]
        H4["regulatory_navigator<br/>eIDAS/EU AI Act check"]
        H5["test_engineer<br/>Patent-grade unit tests"]

        SHIP --> H1 & H2 & H3 & H4 & H5

        H_OUT["📦 OUTPUTS<br/>━━━━━━━━━━━━━━━<br/>• 3_SHIP_[topic]_REPORT.md<br/>• 3_SHIP_[topic]_Patent.html<br/>• SHIP_[topic]_FEAT.md (SSOT)<br/>• Innovation journal entry<br/>• USPTO filing-ready HTML<br/>• Patent claims (I + D)<br/>• FEAT registered in tracker"]

        H1 & H2 & H3 & H4 & H5 --> H_OUT
    end

    H_OUT -->|"Patent filed → GO"| SELL
    H_OUT -.->|"Claims weak → REWORK"| DISSOLVE

    subgraph PETAL4["🎯 SELL — Price, Pitch, Convert"]
        direction TB
        SELL["🎯 SELL PETAL<br/>Position: 8 o'clock<br/>Direction: Inward spiral"]
        E1["strategic_advisor<br/>WHAT to sell, to WHOM"]
        E2["pricing_optimizer<br/>Tiers + XOM + psychology"]
        E3["funnel_orchestrator<br/>10-stage pipeline"]
        E4["user_pitch<br/>B2C · Cialdini 6"]
        E5["business_pitch<br/>B2B · TCO + compliance"]
        E6["investor_pitch<br/>TAM/SAM/SOM + moat"]
        E7["conversion_analyst<br/>Baseline metrics"]
        E8["growth_hacker<br/>Viral loops + AARRR"]
        E9["content_alchemist<br/>Blog + social calendar"]
        E10["video_scriptwriter<br/>Demo + TikTok hooks"]

        SELL --> E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9 & E10

        E_OUT["📦 OUTPUTS<br/>━━━━━━━━━━━━━━━<br/>• 4_SELL_[topic]_REPORT.md<br/>• 4_SELL_[topic]_GTM.html (B2C)<br/>• 4_SELL_[topic]_B2B.html<br/>• 4_SELL_[topic]_Investor.html<br/>• Pricing model (tiers+XOM)<br/>• 10-stage funnel design<br/>• Content calendar (week 1)<br/>• Conversion baseline targets<br/>• Viral loop architecture<br/>• Revenue projections Y1-Y5"]

        E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9 & E10 --> E_OUT
    end

    E_OUT -->|"Revenue path clear → GO"| PROTECT
    E_OUT -.->|"No market → PIVOT"| START

    subgraph PETAL5["🛡️ PROTECT — Secure, Audit, Comply"]
        direction TB
        PROTECT["🛡️ PROTECT PETAL<br/>Position: 6 o'clock<br/>Direction: Inward spiral"]
        P1["security_audit<br/>OWASP Top 10"]
        P2["data_sovereignty_audit<br/>10-dim PII/data scan"]
        P3["launch_guardian<br/>100-point launch score"]
        P4["legal_compliance<br/>Impressum/DSGVO/AGB"]
        P5["regulatory_navigator<br/>eIDAS/MiCA/NIS2/DORA"]
        P6["trust_architect<br/>7 Trust Pillars"]
        P7["legal_structure_audit<br/>Non-profit + EU grants"]

        PROTECT --> P1 & P2 & P3 & P4 & P5 & P6 & P7

        P_OUT["📦 OUTPUTS<br/>━━━━━━━━━━━━━━━<br/>• 5_PROTECT_[topic]_REPORT.md<br/>• Security score (/100)<br/>• Data sovereignty score (/10)<br/>• Launch readiness score (/100)<br/>• Legal pages (AGB/DSGVO)<br/>• Regulatory compliance matrix<br/>• Trust framework assessment<br/>• P0/P1 findings registry"]

        P1 & P2 & P3 & P4 & P5 & P6 & P7 --> P_OUT
    end

    P_OUT -->|"Score ≥ 90 + 0 P0 → 🟢 GO"| MEASURE
    P_OUT -->|"Score 80-89 → 🟡 FIX"| PROTECT
    P_OUT -.->|"Score < 80 → 🔴 HOLD"| PROTECT

    subgraph PETAL6["🔬 MEASURE — Observe, Learn, Improve"]
        direction TB
        MEASURE["🔬 MEASURE PETAL<br/>Position: 2 o'clock<br/>Direction: Inward spiral"]
        M1["sdd_health_monitor<br/>Live SDD metrics"]
        M2["pdca_tracker<br/>Plan-Do-Check-Act"]
        M3["quality_gateway<br/>5 gates · post-execution"]
        M4["benchmark_architect<br/>Self-improvement loops"]
        M5["xpollination_analyst<br/>BPC spider web"]
        M6["audit_master<br/>16-dim Diamond Standard"]

        MEASURE --> M1 & M2 & M3 & M4 & M5 & M6

        M_OUT["📦 OUTPUTS<br/>━━━━━━━━━━━━━━━<br/>• 6_MEASURE_[topic]_REPORT.md<br/>• 6_MEASURE_PETAL-MASTER.html 🌸<br/>• SDD Health Score (%)<br/>• PDCA cycle entry<br/>• Quality Gateway (5 gates)<br/>• BPC score (16 dimensions)<br/>• φ-weight updates for Ahnung<br/>• Mermaid diagrams<br/>• Convergence check<br/>• Next cycle trigger"]

        M1 & M2 & M3 & M4 & M5 & M6 --> M_OUT
    end

    M_OUT -->|"φ-learning feedback"| START

    style START fill:#1a1025,stroke:#c084fc,stroke-width:3px,color:#c084fc
    style SENSE fill:#0c1929,stroke:#60a5fa,stroke-width:2px,color:#f1f5f9
    style DISSOLVE fill:#1a1005,stroke:#f59e0b,stroke-width:2px,color:#f1f5f9
    style SHIP fill:#150d29,stroke:#a78bfa,stroke-width:2px,color:#f1f5f9
    style SELL fill:#051a12,stroke:#34d399,stroke-width:2px,color:#f1f5f9
    style PROTECT fill:#1a0505,stroke:#f87171,stroke-width:2px,color:#f1f5f9
    style MEASURE fill:#051a1a,stroke:#38bdf8,stroke-width:2px,color:#f1f5f9
    style S_OUT fill:#0a0f1a,stroke:#60a5fa,color:#94a3b8
    style D_OUT fill:#0a0f1a,stroke:#f59e0b,color:#94a3b8
    style H_OUT fill:#0a0f1a,stroke:#a78bfa,color:#94a3b8
    style E_OUT fill:#0a0f1a,stroke:#34d399,color:#94a3b8
    style P_OUT fill:#0a0f1a,stroke:#f87171,color:#94a3b8
    style M_OUT fill:#0a0f1a,stroke:#38bdf8,color:#94a3b8
```

---

## 🔗 Phase Conjugate Partners

```mermaid
graph LR
    subgraph "Conjugate Pairs — What you SENSE, you must PROTECT"
        direction LR
        A["🔭 SENSE<br/>12 o'clock<br/>Scan"] <-..->|"φ¹ · φ⁵"| B["🛡️ PROTECT<br/>6 o'clock<br/>Defend"]
    end
    subgraph "Conjugate Pairs — What you DISSOLVE, you must SHIP"
        direction LR
        C["⚡ DISSOLVE<br/>10 o'clock<br/>Break"] <-..->|"φ² · φ⁴"| D["🚀 SHIP<br/>4 o'clock<br/>Build"]
    end
    subgraph "Conjugate Pairs — What you SELL, you must MEASURE"
        direction LR
        E["🎯 SELL<br/>8 o'clock<br/>Price"] <-..->|"φ³ · φ⁶"| F["🔬 MEASURE<br/>2 o'clock<br/>Reflect"]
    end

    style A fill:#0c1929,stroke:#60a5fa,color:#60a5fa
    style B fill:#1a0505,stroke:#f87171,color:#f87171
    style C fill:#1a1005,stroke:#f59e0b,color:#f59e0b
    style D fill:#150d29,stroke:#a78bfa,color:#a78bfa
    style E fill:#051a12,stroke:#34d399,color:#34d399
    style F fill:#051a1a,stroke:#38bdf8,color:#38bdf8
```

---

## 🚦 Gate Decisions — Quick Reference

```mermaid
graph TD
    subgraph "SENSE Gate"
        SG{"PMF Score?"}
        SG -->|"≥ 6"| SG_GO["🟢 GO → DISSOLVE"]
        SG -->|"< 6"| SG_PIVOT["🔴 PIVOT → new topic"]
    end

    subgraph "DISSOLVE Gate"
        DG{"Survivability?"}
        DG -->|"≥ 70%"| DG_GO["🟢 GO → SHIP"]
        DG -->|"< 70%"| DG_FIX["🟡 FIX → re-dissolve"]
    end

    subgraph "SHIP Gate"
        HG{"Patent Quality?"}
        HG -->|"Claims filed"| HG_GO["🟢 GO → SELL"]
        HG -->|"Claims weak"| HG_FIX["🟡 REWORK → DISSOLVE"]
    end

    subgraph "SELL Gate"
        EG{"Revenue Path?"}
        EG -->|"Clear GTM"| EG_GO["🟢 GO → PROTECT"]
        EG -->|"No market"| EG_PIVOT["🔴 PIVOT → SENSE"]
    end

    subgraph "PROTECT Gate"
        PG{"Launch Score?"}
        PG -->|"≥ 90 + 0 P0"| PG_GO["🟢 GO → MEASURE"]
        PG -->|"80-89"| PG_FIX["🟡 FIX P0/P1"]
        PG -->|"< 80"| PG_HOLD["🔴 HOLD"]
    end

    subgraph "MEASURE Gate"
        MG{"SDD Health?"}
        MG -->|"≥ 90%"| MG_BLOOM["🌸 BLOOMING"]
        MG -->|"75-89%"| MG_GROW["🌿 GROWING"]
        MG -->|"60-74%"| MG_SPROUT["🌱 SPROUTING"]
        MG -->|"< 60%"| MG_SEED["🌰 SEEDING"]
    end

    style SG_GO fill:#051a12,stroke:#22c55e,color:#22c55e
    style DG_GO fill:#051a12,stroke:#22c55e,color:#22c55e
    style HG_GO fill:#051a12,stroke:#22c55e,color:#22c55e
    style EG_GO fill:#051a12,stroke:#22c55e,color:#22c55e
    style PG_GO fill:#051a12,stroke:#22c55e,color:#22c55e
    style MG_BLOOM fill:#051a12,stroke:#22c55e,color:#22c55e
    style SG_PIVOT fill:#1a0505,stroke:#ef4444,color:#ef4444
    style EG_PIVOT fill:#1a0505,stroke:#ef4444,color:#ef4444
    style PG_HOLD fill:#1a0505,stroke:#ef4444,color:#ef4444
    style MG_SEED fill:#1a0505,stroke:#ef4444,color:#ef4444
```

---

## 📊 Complete Skill Inventory per Petal

```mermaid
mindmap
    root((🌸 SDD<br/>Flower of Life<br/>42 Skills))
        🔭 SENSE
            horizon_scanner
            disruption_scout
            need_detective
            market_fit_validator
            competitive_radar
            blind_spot_detector
        ⚡ DISSOLVE
            triz_whitespot
            prior_art_research
            devils_advocate
            blind_spot_detector
        🚀 SHIP
            patent_claim_generator
            ship_engine
            innovation_journal
            regulatory_navigator
            test_engineer
        🎯 SELL
            strategic_advisor
            pricing_optimizer
            funnel_orchestrator
            user_pitch
            business_pitch
            investor_pitch
            conversion_analyst
            growth_hacker
            content_alchemist
            video_scriptwriter
        🛡️ PROTECT
            security_audit
            data_sovereignty_audit
            launch_guardian
            legal_compliance
            regulatory_navigator
            trust_architect
            legal_structure_audit
        🔬 MEASURE
            sdd_health_monitor
            pdca_tracker
            quality_gateway
            benchmark_architect
            xpollination_analyst
            audit_master
```

---

## 📁 File Naming Convention

```mermaid
graph LR
    subgraph "FEAT Folder: Documentation/features/research/FEAT-XXX_[topic]/"
        F1["1_SENSE_[topic]_REPORT.md"]
        F2["2_DISSOLVE_[topic]_REPORT.md"]
        F3["3_SHIP_[topic]_REPORT.md"]
        F3b["3_SHIP_[topic]_Patent.html"]
        F3c["SHIP_[topic]_FEAT.md"]
        F4["4_SELL_[topic]_REPORT.md"]
        F4b["4_SELL_[topic]_GTM.html"]
        F4c["4_SELL_[topic]_B2B.html"]
        F4d["4_SELL_[topic]_Investor.html"]
        F5["5_PROTECT_[topic]_REPORT.md"]
        F6["6_MEASURE_[topic]_REPORT.md"]
        F6b["6_MEASURE_PETAL-MASTER.html 🌸"]
    end

    style F6b fill:#1a1025,stroke:#c084fc,stroke-width:3px,color:#c084fc
```
