---
name: DOCX Reviewer
description: Skill for programmatically enabling track changes (Review Mode) and inserting revisions in Microsoft Word DOCX files using Python.
---

# 📝 DOCX Reviewer (REVISION-01)

> "What is changed must be seen. What is seen must be traceable." — Nachvollziehbarkeit

## Purpose

The `docx_reviewer` skill enables the programmatic management of "Track Changes" (Review Mode) in Microsoft Word `.docx` documents. Since standard libraries like `python-docx` do not support this natively, this skill uses a combination of `python-docx` and deep XML manipulation of the `WordprocessingML` structure.

## Capabilities

1.  **Global Toggle:** Enable or disable "Track Changes" for the entire document (any subsequent manual edits in Word will be tracked).
2.  **Revision Injection (Advanced):** Programmatically insert `<w:ins>` (insertion) and `<w:del>` (deletion) tags to simulate a human reviewer's edits.
3.  **Audit Trail:** Metadata injection for "Author" and "Timestamp" of revisions.

## Prerequisites

-   Python 3.x
-   `python-docx` library (`pip install python-docx`)
-   `lxml` library (`pip install lxml`)

## Implementation: Global Toggle (Track Changes)

To enable "Track Changes" in a document, the `<w:trackRevisions />` element must be present in `word/settings.xml`.

### Shared Command Line (Python)

```python
import os
from docx import Document
from docx.oxml.shared import qn
from docx.oxml import OxmlElement

def enable_track_changes(doc_path, output_path=None):
    """
    Enables 'Track Changes' in a DOCX file.
    Note: This sets the global flag in settings.xml.
    """
    doc = Document(doc_path)
    
    # Access the settings XML
    settings_root = doc.settings.element
    
    # Find or create <w:trackRevisions />
    track_revisions = settings_root.find(qn('w:trackRevisions'))
    if track_revisions is None:
        track_revisions = OxmlElement('w:trackRevisions')
        settings_root.append(track_revisions)
    
    if output_path:
        doc.save(output_path)
    else:
        doc.save(doc_path)
    return True
```

## Implementation: Redlining (Tracked Edits)

To record a programmatic edit as a "Tracked Change" (redline), you cannot simply replace text. You must wrap the new text in a `<w:ins>` element and the removed text in a `<w:del>` element.

### XML Structure for Insertion
```xml
<w:ins w:id="0" w:author="Antigravity" w:date="2026-03-26T14:45:00Z">
  <w:r>
    <w:t>New text content</w:t>
  </w:r>
</w:ins>
```

### Guidance for the Agent
1.  **Enable Review Mode first** by modifying `settings.xml`.
2.  **Compare versions** using `Python-Redlines` or by iterating through paragraphs and swapping `w:t` for `w:ins`/`w:del` blocks.
3.  **Always set the Author** to `Antigravity` or requested Persona for traceability.

## Usage Scenarios
-   **LOI/Contract Review:** Proposing changes while keeping the original visible.
-   **Patent Editing:** Tracking claim updates for examiner review.
-   **Collaboration:** Working with a USER who needs to see exactly WHAT was changed.

## References
-   ECMA-376 (Open XML Standard)
-   `python-docx` documentation
-   FEAT-307: LOI FANCCI Refinement workflow
