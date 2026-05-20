const fs = require('fs');
const https = require('https');
const path = require('path');

function downloadFile(fileId, destPath) {
  const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
  function get(targetUrl) {
    https.get(targetUrl, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        get(res.headers.location);
      } else if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Download completed for ID ${fileId} to ${destPath}`);
        });
      } else {
        console.error(`Request failed with status: ${res.statusCode}`);
      }
    }).on('error', (err) => {
      console.error(`Error downloading file: ${err.message}`);
    });
  }

  get(url);
}

const args = process.argv.slice(2);
if (args.length >= 2) {
  downloadFile(args[0], args[1]);
} else {
  console.log('Usage: node download_file.js <fileId> <destPath>');
}
