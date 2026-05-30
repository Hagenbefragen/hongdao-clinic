
const fs = require('fs');

let css = fs.readFileSync('c:/Clinic/style.v2.css', 'utf8');
css = css.replace('.gallery-item img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;', '.gallery-item img {\n    width: 100%;\n    height: 100%;\n    object-fit: contain;\n    background-color: var(--bg-cream-dark);');
fs.writeFileSync('c:/Clinic/style.v2.css', css);

let html = fs.readFileSync('c:/Clinic/index.html', 'utf8');
html = html.replace('<h2 class="title-medium" data-i18n="programs-title">Heilungsprogramme & Kurse</h2>', '<h2 class="title-medium" data-i18n="programs-title" style="padding: 0 10px;">Heilungsprogramme & Kurse</h2>');
fs.writeFileSync('c:/Clinic/index.html', html);
console.log('Fixed CSS & HTML padding');

