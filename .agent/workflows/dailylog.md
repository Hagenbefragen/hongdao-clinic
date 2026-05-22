# /dailylog - Daily Performance Log Workflow

// turbo-all

## Overview

This workflow adds a new daily entry to the Collaboration Dashboard at the end of each workday. It tracks KPIs like hours worked, lines of code, features, bugs, and prompts.

## Steps

### 1. Get Today's Stats

Collect the following information from the user or calculate from git:

```bash
# Get lines of code changed today
git log --since="00:00:00" --until="23:59:59" --format="" --numstat | awk '{added+=$1; deleted+=$2} END {print "Added:", added, "Deleted:", deleted, "Net:", added-deleted}'

# Get number of commits today
git log --since="00:00:00" --until="23:59:59" --oneline | wc -l

# Get feature commits (feat: prefix)
git log --since="00:00:00" --until="23:59:59" --oneline --grep="feat"

# Get bugfix commits (fix: prefix)
git log --since="00:00:00" --until="23:59:59" --oneline --grep="fix"
```

### 2. Ask User for Manual KPIs

Prompt the user for:

- **Hours worked today**: Total hours (e.g., "8")
- **Autonomous hours**: Hours where Antigravity worked independently (e.g., "3")
- **Number of prompts**: Approximate message count (e.g., "45")
- **Daily notes**: Short summary of accomplishments (e.g., "Platform Bridge + Event Scout")

### 3. Update the Dashboard

Open the file:

```
Documentation/Performance/CollaborationDashboard.html
```

Find the `collaborationData` array in the JavaScript section and add a new entry:

```javascript
{ date: "YYYY-MM-DD", hours: X, autonomousHours: Y, linesOfCode: Z, prompts: N, features: F, bugs: B, notes: "Summary" },
```

### 4. Commit the Update

```bash
git add Documentation/Performance/CollaborationDashboard.html
git commit -m "docs: daily log update YYYY-MM-DD"
```

## KPI Definitions

| KPI                    | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| **Hours**              | Total hours of active collaboration                          |
| **Autonomous Hours**   | Hours where Antigravity worked with minimal supervision      |
| **Lines of Code**      | Net lines added (from git diff)                              |
| **Prompts**            | Number of user messages/requests                             |
| **Features**           | Number of `feat:` commits                                    |
| **Bugs**               | Number of `fix:` commits                                     |
| **Productivity Badge** | Calculated: LOC/Hours > 300 = High, > 150 = Medium, else Low |

## Example Entry

```javascript
{ date: "2026-02-04", hours: 8, autonomousHours: 3, linesOfCode: 1029, prompts: 42, features: 2, bugs: 1, notes: "Platform Bridge UX + Event Scout + AHK v5.2" },
```

## Quick Update Template

When the user says `/dailylog`, respond with:

---

**📊 Daily Log für [DATUM]**

Ich habe folgende Stats berechnet:

- **Lines of Code**: [aus git]
- **Commits**: [Anzahl]
- **Features**: [feat: commits]
- **Bugfixes**: [fix: commits]

Bitte ergänze:

1. Stunden gearbeitet heute?
2. Davon autonom (ich ohne Supervision)?
3. ~Anzahl Prompts/Messages?
4. Kurze Notiz für den Tag?

---

Then update the HTML file with the data.
