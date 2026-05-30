
const fs = require('fs');
let html = fs.readFileSync('c:/Clinic/index.html', 'utf8');

html = html.replace(
  '<img src="images/bodhisattva_head.png" alt="Bodhisattva Sculpture representing Lineage & Wisdom" class="bodhisattva-img">',
  '<img src="images/whatsapp_imports/nanjing/1779965952.jpeg" alt="Group Photo" style="border-radius: 8px; width: 100%; max-width: 400px; height: auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1); display: block; margin: 0 auto;">'
);
html = html.replace('<div class="halo-effect"></div>', '');
html = html.replace('<option value="yunnan3">3-tägiges Yunnan Natur-Retreat</option>', '');

const lines = html.split('\n');
let newLines = [];
let skip = false;
let depth = 0;
for(let i=0; i<lines.length; i++) {
  if(!skip && lines[i].includes('data-i18n="yunnan-title"')) {
    let j = newLines.length - 1;
    while(j >= 0) {
      if(newLines[j].includes('<div class="grid-2"')) {
        skip = true;
        depth = 1;
        newLines.splice(j);
        break;
      }
      j--;
    }
  }
  if(skip) {
    if(lines[i].includes('<div')) depth++;
    if(lines[i].includes('</div')) depth--;
    if(depth <= 0) skip = false;
    continue;
  }
  newLines.push(lines[i]);
}

fs.writeFileSync('c:/Clinic/index.html', newLines.join('\n'));
console.log('Fixed index.html');

let app = fs.readFileSync('c:/Clinic/app.v2.js', 'utf8');
app = app.replace('<li><strong>Termine</strong>: 18. April um 10:00 Uhr & 19. April um 15:00 Uhr</li>', '');
fs.writeFileSync('c:/Clinic/app.v2.js', app);
console.log('Fixed app.v2.js Termine');

