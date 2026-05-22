---
description: Dark mode contrast and accessibility best practices
---

# Dark Mode Contrast Best Practice

When working on any UI component or page, ALWAYS ensure proper text contrast in dark mode.

## Critical Rules

### 1. NEVER Use Dark Text on Dark Backgrounds
- ❌ `text-black` on `dark:bg-gray-900` 
- ❌ `text-gray-800` on `dark:bg-gray-800`
- ❌ `text-slate-900` on `dark:bg-slate-900`

### 2. ALWAYS Add Dark Mode Text Variants
Every text element needs a dark mode variant:

```css
/* Good Examples */
text-gray-900 dark:text-white          /* Headings */
text-gray-700 dark:text-gray-300       /* Body text */
text-gray-600 dark:text-gray-400       /* Secondary text */
text-gray-500 dark:text-gray-500       /* Muted text (already okay) */
text-slate-800 dark:text-slate-200     /* Alternative dark variant */
```

### 3. Check These Common Problem Areas
1. **Headings** - `h1`, `h2`, `h3` often use dark colors
2. **Card titles** - Especially in grid layouts
3. **Badge/tag text** - Small labels often forgotten
4. **Table headers** - Often use `text-slate-900`
5. **Form labels** - Input labels need contrast
6. **Timeline/roadmap items** - Step descriptions

### 4. Background/Text Pairs That Work
| Light Mode | Dark Mode |
|------------|-----------|
| bg-white text-gray-900 | dark:bg-gray-800 dark:text-white |
| bg-gray-50 text-gray-800 | dark:bg-gray-900 dark:text-gray-200 |
| bg-slate-100 text-slate-900 | dark:bg-slate-800 dark:text-slate-100 |

### 5. Checking for Issues
When reviewing a page, search for these patterns WITHOUT dark mode variants:
- `text-black` (should have `dark:text-white`)
- `text-gray-900` (should have `dark:text-gray-100` or `dark:text-white`)
- `text-gray-800` (should have `dark:text-gray-200`)
- `text-gray-700` (should have `dark:text-gray-300`)
- `text-slate-900` (should have `dark:text-slate-100`)
- `text-slate-800` (should have `dark:text-slate-200`)

### 6. Quick Fix Pattern
```tsx
// Before (BAD - no dark mode)
<h2 className="text-2xl font-bold text-gray-900">Title</h2>

// After (GOOD - has dark mode)
<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Title</h2>
```

## Verification Checklist
- [ ] Toggle dark mode in browser
- [ ] Check ALL text is readable
- [ ] Verify headings, body text, and muted text
- [ ] Test interactive states (hover, focus)
- [ ] Check badges, tags, and small text
