---
name: Large File Operations (Anti-Hang)
description: Safe operations on large HTML/JS/CSS files without terminal hanging. Uses view_file tool exclusively instead of Python/Node terminal commands which hang on files >50KB with special characters.
---

# Large File Operations — Anti-Hang Skill

> **Problem:** Running `python -c` or `node -e` commands on large files (>50KB) with special characters (emojis, HTML entities, Unicode) causes PowerShell terminal to hang indefinitely. This has been confirmed repeatedly on this Windows machine.

## ⛔ NEVER DO (Terminal Commands on Large Files)

```bash
# ALL OF THESE WILL HANG:
python -c "c=open('large-file.html','r').read(); print(c.count('{'))"
node -e "const c=require('fs').readFileSync('file.html','utf8'); console.log(c.length)"
type large-file.html | findstr "pattern"
Get-Content large-file.html | Select-String "pattern"
```

## ✅ ALWAYS DO (Safe Alternatives)

### 1. Counting Lines / Checking File Size
Use `list_dir` tool on the parent directory — it shows file sizes.
Or use `view_file` with specific line ranges.

### 2. Searching for Content
Use `grep_search` tool (ripgrep) — it handles special characters safely.
If grep fails on the file, use `view_file` with estimated line ranges.

### 3. Brace Counting / Syntax Verification
Write a **standalone script file** first, then run the script:
```
1. write_to_file → /tmp/check.js (write a Node.js script)
2. run_command → node /tmp/check.js (run it — script files don't hang)
```

**Key Rule:** The script must write OUTPUT TO A FILE, not to stdout:
```javascript
// /tmp/check_braces.js
const fs = require('fs');
const c = fs.readFileSync('path/to/file.html', 'utf8');
const result = { open: (c.match(/{/g)||[]).length, close: (c.match(/}/g)||[]).length };
fs.writeFileSync('/tmp/result.txt', JSON.stringify(result));
```
Then use `view_file` on `/tmp/result.txt` to read the result.

### 4. Extracting Code Sections
Use `view_file` with StartLine/EndLine to read sections.
Never pipe file content through terminal.

### 5. Modifying Large Files
Use `replace_file_content` or `multi_replace_file_content` tools directly.
For complex transformations, write a script file:
```
1. write_to_file → /tmp/transform.js
2. run_command → node /tmp/transform.js  (short timeout, output to file)
3. view_file → /tmp/result.txt
```

## Script Template (Safe)

```javascript
// /tmp/safe_check.js — writes result to file, never hangs
const fs = require('fs');
try {
  const content = fs.readFileSync(process.argv[2], 'utf8');
  const result = {
    lines: content.split('\n').length,
    size: content.length,
    openBraces: (content.match(/{/g) || []).length,
    closeBraces: (content.match(/}/g) || []).length,
  };
  fs.writeFileSync('/tmp/result.json', JSON.stringify(result, null, 2));
  process.exit(0);  // Force exit
} catch (e) {
  fs.writeFileSync('/tmp/result.json', JSON.stringify({ error: e.message }));
  process.exit(1);
}
```

Run: `node /tmp/safe_check.js "path/to/file.html"`
Read: `view_file /tmp/result.json`

## Why This Matters

- Large files with emojis/HTML crash PowerShell's output buffering
- The terminal never returns, blocking all further work
- The user has to manually cancel, losing context
- This has happened **8+ times** in a single refactoring session
- Writing to files instead of stdout completely avoids the issue
