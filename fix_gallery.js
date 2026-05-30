const fs = require('fs');
let html = fs.readFileSync('c:/Clinic/index.html', 'utf8');

let firstItemStart = html.indexOf('<!-- Item 1 (Group Photo) -->');
if (firstItemStart === -1) {
    firstItemStart = html.indexOf('<div class="gallery-item"');
}
let firstItemEnd = html.indexOf('</div>', firstItemStart);
firstItemEnd = html.indexOf('</div>', firstItemEnd + 1); // <div class=overlay>
firstItemEnd = html.indexOf('</div>', firstItemEnd + 1) + 6; // <div class=gallery-item>

let nextSectionIndex = html.indexOf('<!-- More Button -->');

let beforeGallery = html.substring(0, firstItemEnd);
let afterGallery = html.substring(nextSectionIndex);

const dir = 'c:/Clinic/images/whatsapp_imports/nanjing';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpeg') && !['1779966728.jpeg', '1779966729.jpeg', '1779966444.jpeg', '1779965952.jpeg'].includes(f));

let newGalleryHtml = '';
files.forEach((f, i) => {
    let imgPath = 'images/whatsapp_imports/nanjing/' + f;
    newGalleryHtml += `
        <div class="gallery-item hidden-item" style="display: none;" data-img="${imgPath}">
            <img src="${imgPath}" alt="Retreat Image ${i+2}">
            <div class="gallery-item-overlay">
              <span class="gallery-item-subtitle">Nanjing Retreat</span>
              <h4 class="gallery-item-title">Impression ${i+2}</h4>
            </div>
        </div>
`;
});

fs.writeFileSync('c:/Clinic/index.html', beforeGallery + newGalleryHtml + '\n        </div>\n\n        ' + afterGallery);
console.log('Fixed gallery items');
