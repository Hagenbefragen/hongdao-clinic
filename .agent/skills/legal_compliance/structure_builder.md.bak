# 🏗️ OHM Structure Builder (LLC-Verein-EWIV)

> **Purpose:** Automates the drafting of the complete "OHM Structure" (Verein + Wyoming LLC + EWIV) for clients. This skill ingests raw client data and outputs a comprehensive legal package ready for review.

## 1. Input Data Requirements

To start the process, gather the following data from the client (or CRM):

- **Founder:** Role (President/Manager), Name, Address, DOB.
- **Partner:** Role (Vice/Co-Founder), Name, Address, DOB.
- **Verein:** Proposed Name, Seat (City), Key Purpose (e.g., "Research into X").
- **LLC:** Proposed Name (e.g., "Project X LLC"), State (Wyoming default).
- **EWIV:** Proposed Name (e.g., "Project X EWIV"), Seat (City).

## 2. Process Flow

### Phase 1: Verein (The Anchor)

1.  **Generate Statutes:** Use `OHM-Vereinsstatuten.html` template.
    - _Inject:_ Founder/Partner names, Seat, Purpose.
    - _Streamline:_ Set Board to Pres/Vice only.
2.  **Generate Side Letters:** Use `side_letter_generator.md` logic.
    - _Create:_ Generalvollmacht for Founder.
    - _Create:_ Treuhand Agreement.

### Phase 2: LLC (The Commercial Arm)

1.  **Generate Operating Agreement:** Wyoming Standard.
    - _Member:_ The Verein (100% owner).
    - _Manager:_ The Founder (personally).
2.  **Generate Resolution:** Board resolution authorizing the Verein to establish the LLC.

### Phase 3: EWIV (The Bridge)

1.  **Generate Convention:** EWIV Formation Contract.
    - _Members:_ Verein + LLC.
    - _Managers:_ Founder + Partner.
    - _Seat:_ Same as Verein (typically).

## 3. Automation Logic (Prompt Template)

To execute a build, use this prompt structure:

```markdown
**BUILD-STRUCTURE**
**Client:** [Name]
**Verein:** [Name] @ [City]
**LLC:** [Name] (Wyoming)
**EWIV:** [Name]
**Founder:** [Name, Address]
**Partner:** [Name, Address]
**Output:** Generate full HTML package with "Living Lab" purpose clauses.
```

## 4. Integration with CRM & Funnels

- **Landing Page:** Use `/landingpagecreation` for `start.ohm.group` (hypothetical).
- **Funnel:**
  - _Lead Magnet:_ "Free Sovereign Structure Audit" (PDF).
  - _Tripwire:_ "Verein Draft" (€99).
  - _Core Offer:_ "Full OHM Structure Setup" (€2999).
- **CRM Tagging:** Tag contacts with `Structure:Interested`, `Structure:InProgress`, `Structure:Complete`.

## 5. Output Artifacts

The Agent will generate:

1.  `[Client]_Vereinsstatuten.html`
2.  `[Client]_SideLetter_Founder.html`
3.  `[Client]_LLC_OperatingAgreement.html`
4.  `[Client]_EWIV_Convention.html`
5.  `[Client]_Roadmap.md` (Step-by-step filing guide)

## 6. Liability Disclaimer

> ⚠️ **Draft Only:** The AI generates _drafts_ based on standard templates. These must be reviewed by a human lawyer/notary before filing. The Agent is not a legal counsel.
