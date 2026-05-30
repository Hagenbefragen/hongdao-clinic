const fs = require('fs');
let html = fs.readFileSync('c:\\Clinic\\index.html', 'utf8');

// --- FIX 1: Button text - directly in HTML (fallback text in data-i18n element) ---
html = html.replace(
  /(<a href="endometriosis\.html" class="btn btn-outline"[^>]*>)Mehr Details(<\/a>)/,
  '$1Details ansehen$2'
);
console.log('Fix 1 (button text):', html.includes('Details ansehen') ? '✅' : '❌ not found');

// --- FIX 2: Equal card heights ---
html = html.replace(
  '<div class="grid-2" style="margin-bottom: 5rem;">',
  '<div class="grid-2" style="margin-bottom: 5rem; align-items: stretch;">'
);
console.log('Fix 2 (align-items stretch):', html.includes('align-items: stretch') ? '✅' : '❌ not found');

// --- FIX 3: Replace empty endo-card with full Endometriose card ---
// Use CRLF line endings to match file
const oldEndoCard = '<!-- Endometriosis Healing Program Simulator -->\r\n      <div class="endo-card">\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>';

const newEndoCard = `<!-- Endometriosis Program Card (Full Width) -->
      <div style="background: linear-gradient(135deg, #4a2c2a 0%, #7a3c35 50%, #a85848 100%); border-radius: var(--border-radius); overflow: hidden; margin-bottom: 2rem; box-shadow: var(--shadow-card);">
        <div style="display: flex; align-items: stretch; min-height: 260px;">
          <div style="flex: 1; padding: 3rem 3.5rem; display: flex; flex-direction: column; justify-content: space-between; color: white;">
            <div>
              <span style="font-family: var(--font-serif); font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.7); display: block; margin-bottom: 0.75rem;">Ganzheitliches Heilprogramm f&#252;r Frauen</span>
              <h3 style="font-family: var(--font-serif); font-size: 1.8rem; font-weight: 400; color: white; margin: 0 0 1rem 0; line-height: 1.3;">Endometriose-Programm &nbsp;&mdash;&nbsp; <span style="font-size: 1.15rem; opacity: 0.85;">Eine Reise zur&#252;ck zu deinem Ursprung</span></h3>
              <p style="color: rgba(255,255,255,0.85); font-size: 0.95rem; line-height: 1.7; max-width: 650px;">
                10 Tage in China: 1 Woche intensive TCM-Diagnostik &amp; individuelle Therapie in Shenzhen, gefolgt von 1 Woche tiefer Regeneration in den Nebelbergen Yunnans. Mit individuellen Kr&#228;uterrezepturen, Womb-Massage, Qi Gong, Klangarbeit &amp; 3-monatigem Online-Begleitprogramm inklusive.
              </p>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-top: 2rem;">
              <span style="font-weight: 600; color: rgba(255,255,255,0.9); font-size: 0.95rem;">Kostenbeitrag auf Anfrage</span>
              <a href="endometriosis.html" class="btn" style="background: white; color: #7a3c35; border: none; padding: 0.65rem 1.5rem; font-weight: 600; font-size: 0.9rem;">Mehr erfahren &#8594;</a>
              <a href="#contact" class="btn btn-outline apply-trigger" style="border-color: rgba(255,255,255,0.6); color: white; padding: 0.65rem 1.5rem; font-size: 0.9rem;">Beratung anfragen</a>
            </div>
          </div>
        </div>
      </div>

      </div>
    </div>
  </section>`;

if (html.includes(oldEndoCard)) {
  html = html.replace(oldEndoCard, newEndoCard);
  console.log('Fix 3 (endo card): ✅');
} else {
  console.log('Fix 3 (endo card): ❌ placeholder not found, trying regex...');
  // Try with flexible whitespace
  const fixed = html.replace(
    /<!--\s*Endometriosis Healing Program Simulator\s*-->\s*<div class="endo-card">\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/,
    newEndoCard
  );
  if (fixed !== html) {
    html = fixed;
    console.log('Fix 3 (endo card via regex): ✅');
  } else {
    console.log('Fix 3 (endo card): ❌ FAILED');
  }
}

// --- FIX 4: Make all Nanjing gallery images VISIBLE ---
let beforeCount = (html.match(/hidden-item/g) || []).length;
html = html.replace(/class="gallery-item hidden-item" style="display: none;"/g, 'class="gallery-item"');
let afterCount = (html.match(/hidden-item/g) || []).length;
console.log(`Fix 4 (visible images): ${beforeCount - afterCount} items made visible ${beforeCount > afterCount ? '✅' : '❌'}`);

fs.writeFileSync('c:\\Clinic\\index.html', html, 'utf8');
console.log('✅ Done! Total size:', html.length, 'bytes');
