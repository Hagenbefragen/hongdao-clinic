const fs = require('fs');
const https = require('https');
const path = require('path');

const BASE_URL = 'https://destill.ai/Vault/eyegazing/';
const targetDir = path.join(__dirname, '..', 'eyegazing_vault');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = [
  'Eyegazing_Hub.html',
  'eye_gazing_audio_and_marketing.html',
  'eye_gazing_digital_product_strategy.html',
  'eye_gazing_email_sequence.html',
  'eye_gazing_option_a_implementation.html',
  'eye_gazing_option_a_phase2_3.html',
  'eye_gazing_option_a_scripts.html',
  'eye_gazing_option_b_ebook.html',
  'eye_gazing_option_b_phase2_3.html',
  'eye_gazing_sales_page_copy.html',
  'eye_gazing_video_production_guide.html',
  'eye_gazing_viral_growth_engine.html',
  'Fruchtgenuss_Vertrag_Kroatien.html'
];

function download(file) {
  const url = `${BASE_URL}${file}`;
  const dest = path.join(targetDir, file);

  https.get(url, (res) => {
    if (res.statusCode === 200) {
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Successfully downloaded: ${file}`);
      });
    } else {
      console.error(`Failed to download ${file}: HTTP Status ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${file}: ${err.message}`);
  });
}

files.forEach(file => download(file));
