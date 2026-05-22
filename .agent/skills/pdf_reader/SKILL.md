---
name: PDF Research Reader
description: Extract text from PDF files for research and analysis. Uses Python pdfplumber or pdftotext to convert PDFs to readable text for study and comparison.
group: smart.docs
---

# 📄 PDF Research Reader Skill

> Extract text content from PDF documents for research, study, and comparison analysis.

## Prerequisites

- Python 3.x with `pdfplumber` package (preferred) OR
- `pdftotext` CLI tool (poppler-utils)

## Installation (One-Time)

```powershell
pip install pdfplumber
```

## Usage

### Extract Full PDF to Text

```powershell
python -c "
import pdfplumber
import sys

pdf_path = sys.argv[1]
output_path = sys.argv[2] if len(sys.argv) > 2 else pdf_path.replace('.pdf', '.txt')

with pdfplumber.open(pdf_path) as pdf:
    text = ''
    for i, page in enumerate(pdf.pages):
        page_text = page.extract_text()
        if page_text:
            text += f'\n\n=== PAGE {i+1} ===\n\n{page_text}'

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(text)

    print(f'Extracted {len(pdf.pages)} pages to {output_path}')
" "INPUT.pdf" "OUTPUT.txt"
```

### Extract Specific Page Range

```powershell
python -c "
import pdfplumber
import sys

pdf_path = sys.argv[1]
start = int(sys.argv[2])
end = int(sys.argv[3])
output_path = sys.argv[4] if len(sys.argv) > 4 else pdf_path.replace('.pdf', f'_p{start}-{end}.txt')

with pdfplumber.open(pdf_path) as pdf:
    text = ''
    for i in range(start-1, min(end, len(pdf.pages))):
        page_text = pdf.pages[i].extract_text()
        if page_text:
            text += f'\n\n=== PAGE {i+1} ===\n\n{page_text}'

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(text)

    print(f'Extracted pages {start}-{end} to {output_path}')
" "INPUT.pdf" START_PAGE END_PAGE "OUTPUT.txt"
```

### Get PDF Metadata & Table of Contents

```powershell
python -c "
import pdfplumber
import sys

pdf_path = sys.argv[1]
with pdfplumber.open(pdf_path) as pdf:
    print(f'Pages: {len(pdf.pages)}')
    print(f'Metadata: {pdf.metadata}')
    # Print first 500 chars of each page as preview
    for i, page in enumerate(pdf.pages[:10]):
        text = page.extract_text()
        if text:
            preview = text[:200].replace('\n', ' ')
            print(f'  Page {i+1}: {preview}...')
" "INPUT.pdf"
```

## Notes

- Mathematical formulas in PDFs may not extract perfectly — special symbols and equations may appear garbled
- For Heim's works specifically: German umlauts (ä, ö, ü, ß) should be preserved
- Tables may lose formatting — use `page.extract_tables()` for structured table data
- Scanned PDFs (images) require OCR — use `pytesseract` as fallback

## Workflow Integration

1. Extract PDF to .txt
2. Read .txt with `view_file` tool
3. Analyze content
4. Compare against codebase implementations
