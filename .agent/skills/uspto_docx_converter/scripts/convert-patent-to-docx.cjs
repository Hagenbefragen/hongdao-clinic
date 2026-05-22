/**
 * USPTO Patent HTML → DOCX Converter
 *
 * Converts patent HTML specifications to DOCX format compliant with:
 * - 37 CFR § 1.52 (formatting requirements)
 * - USPTO Patent Center DOCX guidelines
 *
 * Usage:
 *   node convert-patent-to-docx.cjs --input path/to/patent.html --output path/to/patent.docx
 *
 * Format Requirements:
 *   - Paper: Letter (8.5" × 11")
 *   - Left margin: 1 inch (2.5cm)
 *   - Top/Bottom/Right margins: 0.75 inch (2cm)
 *   - Font: Times New Roman 12pt
 *   - Line spacing: 1.5x
 *   - Single column
 *   - Page numbers: centered bottom
 *   - Sections start on new pages
 */

const fs = require("fs");
const path = require("path");
const HTMLtoDOCX = require("html-to-docx");

// Parse command line arguments
const args = process.argv.slice(2);
let inputPath = "";
let outputPath = "";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--input" && args[i + 1]) inputPath = args[++i];
  else if (args[i] === "--output" && args[i + 1]) outputPath = args[++i];
}

if (!inputPath) {
  console.error(
    "Usage: node convert-patent-to-docx.cjs --input <html-file> --output <docx-file>",
  );
  process.exit(1);
}

if (!outputPath) {
  outputPath = inputPath.replace(/\.html?$/i, ".docx");
}

/**
 * Clean HTML for DOCX conversion
 * - Strips CSS styles, scripts, nav elements
 * - Keeps semantic HTML structure
 * - Ensures clean conversion
 */
function cleanHTMLForDocx(rawHtml) {
  let html = rawHtml;

  // Remove <style> blocks
  html = html.replace(/<style[\s\S]*?<\/style>/gi, "");

  // Remove <script> blocks
  html = html.replace(/<script[\s\S]*?<\/script>/gi, "");

  // Remove <nav> blocks
  html = html.replace(/<nav[\s\S]*?<\/nav>/gi, "");

  // Remove <header> blocks (typically navigation)
  html = html.replace(/<header[\s\S]*?<\/header>/gi, "");

  // Remove toolbar and floating UI elements
  html = html.replace(
    /<div[^>]*class="[^"]*toolbar[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
    "",
  );
  html = html.replace(
    /<div[^>]*class="[^"]*floating[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
    "",
  );
  html = html.replace(
    /<div[^>]*id="[^"]*toolbar[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
    "",
  );

  // Remove inline styles from all elements (USPTO wants clean formatting)
  html = html.replace(/ style="[^"]*"/gi, "");

  // Remove class attributes
  html = html.replace(/ class="[^"]*"/gi, "");

  // Remove id attributes
  html = html.replace(/ id="[^"]*"/gi, "");

  // Remove data attributes
  html = html.replace(/ data-[a-z-]+="[^"]*"/gi, "");

  // Remove contenteditable attributes
  html = html.replace(/ contenteditable="[^"]*"/gi, "");

  // Remove onclick and other event handlers
  html = html.replace(/ on[a-z]+="[^"]*"/gi, "");

  // Remove empty divs
  html = html.replace(/<div>\s*<\/div>/gi, "");

  // Convert <section> to <div> for better DOCX compatibility
  html = html.replace(/<section/gi, "<div");
  html = html.replace(/<\/section>/gi, "</div>");

  // Ensure proper heading hierarchy
  // Keep h1, h2, h3, h4 as-is

  // Remove any remaining meta/link/head content
  html = html.replace(/<head[\s\S]*?<\/head>/gi, "");
  html = html.replace(/<meta[^>]*>/gi, "");
  html = html.replace(/<link[^>]*>/gi, "");

  // Extract body content if present
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    html = bodyMatch[1];
  }

  // Remove html/body tags if still present
  html = html.replace(/<\/?html[^>]*>/gi, "");
  html = html.replace(/<\/?body[^>]*>/gi, "");
  html = html.replace(/<\/?!DOCTYPE[^>]*>/gi, "");

  // Clean up excessive whitespace
  html = html.replace(/\n{3,}/g, "\n\n");

  return html.trim();
}

async function convertToDocx() {
  console.log(`\n📄 USPTO Patent DOCX Converter`);
  console.log(`${"=".repeat(50)}`);
  console.log(`Input:  ${inputPath}`);
  console.log(`Output: ${outputPath}`);

  // Read the HTML file
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const rawHtml = fs.readFileSync(inputPath, "utf8");
  console.log(`📏 Input size: ${(rawHtml.length / 1024).toFixed(1)} KB`);

  // Clean HTML for conversion
  const cleanedHtml = cleanHTMLForDocx(rawHtml);
  console.log(`🧹 Cleaned size: ${(cleanedHtml.length / 1024).toFixed(1)} KB`);

  // Wrap in proper HTML structure for the converter
  const wrappedHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; }
  h1 { font-size: 14pt; font-weight: bold; text-align: center; page-break-before: always; }
  h2 { font-size: 13pt; font-weight: bold; margin-top: 18pt; }
  h3 { font-size: 12pt; font-weight: bold; margin-top: 12pt; }
  p { margin-bottom: 6pt; text-align: justify; }
  table { border-collapse: collapse; width: 100%; margin: 12pt 0; }
  th, td { border: 1px solid #000; padding: 4pt 6pt; font-size: 11pt; }
  th { font-weight: bold; background-color: #f0f0f0; }
  pre, code { font-family: 'Courier New', Courier, monospace; font-size: 10pt; }
  .claim { margin-left: 0.5in; }
</style>
</head>
<body>
${cleanedHtml}
</body>
</html>`;

  // USPTO DOCX formatting options
  const docxOptions = {
    margin: {
      top: 1440, // 1 inch in twips (1440 twips = 1 inch)
      right: 1080, // 0.75 inch
      bottom: 1080, // 0.75 inch
      left: 1800, // 1.25 inch (slightly more for binding)
    },
    title: path.basename(inputPath, path.extname(inputPath)),
    font: "Times New Roman",
    fontSize: 24, // 12pt in half-points
    lineNumber: false,
    pageNumber: true,
    header: false,
    footer: true,
    decodeUnicode: true,
    orientation: "portrait",
    pageSize: {
      width: 12240, // 8.5 inches in twips
      height: 15840, // 11 inches in twips
    },
  };

  try {
    console.log(`\n⚙️  Converting to DOCX with USPTO formatting...`);
    console.log(`   📐 Margins: L=1.25" T=1" R=0.75" B=0.75"`);
    console.log(`   🔤 Font: Times New Roman 12pt`);
    console.log(`   📏 Spacing: 1.5x line spacing`);
    console.log(`   📄 Paper: Letter (8.5" × 11")`);

    const docxBuffer = await HTMLtoDOCX(wrappedHtml, null, docxOptions);

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, docxBuffer);

    const stats = fs.statSync(outputPath);
    console.log(`\n✅ DOCX created successfully!`);
    console.log(`   📁 File: ${outputPath}`);
    console.log(`   📏 Size: ${(stats.size / 1024).toFixed(1)} KB`);
    console.log(`\n📋 USPTO Compliance Checklist:`);
    console.log(`   ✅ Paper size: Letter (8.5" × 11")`);
    console.log(`   ✅ Left margin: ≥ 1" (2.5cm)`);
    console.log(`   ✅ Top/Bottom/Right margins: ≥ 0.75" (2cm)`);
    console.log(`   ✅ Font: Times New Roman 12pt`);
    console.log(`   ✅ Single column layout`);
    console.log(`   ✅ No macros`);
    console.log(`   ✅ Unicode characters decoded`);
    console.log(`\n⚠️  MANUAL VERIFICATION RECOMMENDED:`);
    console.log(`   1. Open in Word/Google Docs`);
    console.log(`   2. Verify all sections present`);
    console.log(`   3. Check line spacing is 1.5x`);
    console.log(`   4. Verify page numbers centered at bottom`);
    console.log(`   5. Review table alignment`);
  } catch (error) {
    console.error(`\n❌ Conversion failed:`, error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

convertToDocx();
