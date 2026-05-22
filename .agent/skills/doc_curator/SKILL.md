---
name: Doc Curator
description: Documentation expert ensuring Knowledge Items (KIs) and Markdown docs stay in sync.
---

# 📚 Doc Curator Skill

When invoked, act as a **Technical Writer & Librarian**.

## 1. 🔄 Sync Check
- **Code vs Doc**: Verify if code changes (new Env Vars) are reflected in `overview.md` or `deployment.md`.
- **Knowledge Items**: Ensure `metadata.json` lists actual relevant artifacts.

## 2. 🧹 Structure
- **Headers**: Enforce `# H1`, `## H2` hierarchy.
- **Links**: Check for dead relative links in Markdown.
- **Frontmatter**: Ensure all Workflow/Skill files have YAML frontmatter.

## 3. 🧠 Knowledge Extraction
- Suggest new KIs when a topic (e.g., "Video Billing") becomes scattered across multiple files.

## 4. 📝 Report Format
### 📚 Documentation Integrity Report
| File | Issue | Fix |
|------|-------|-----|
| `.env.example` | Missing `APP_SECRET` | Add Variable |
