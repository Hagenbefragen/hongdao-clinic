const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');
const IMPORTS_DIR = path.join(__dirname, 'images', 'whatsapp_imports', 'nanjing_mexico');
if(!fs.existsSync(IMPORTS_DIR)) fs.mkdirSync(IMPORTS_DIR, {recursive:true});

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: '.wwebjs_auth' }),
  puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

client.on('ready', async () => {
  const chats = await client.getChats();
  const chat = chats.find(c => c.id._serialized.includes('5219841408335') || c.id._serialized.includes('529841408335') || (c.name && c.name.includes('Nanjing') && c.name.includes('🇲🇽')));
  if(chat) {
    const msgs = await chat.fetchMessages({ limit: 100 });
    let count = 0;
    for(const m of msgs) {
      if(m.hasMedia) {
        try {
          const media = await m.downloadMedia();
          if(media && media.data) {
            const ext = media.mimetype ? media.mimetype.split('/')[1].split(';')[0] : 'jpeg';
            let ext2 = ext;
            if (ext === 'jpeg' || ext === 'jpg') ext2 = 'jpg';
            if (ext === 'png') ext2 = 'png';
            const filename = m.timestamp + '.' + ext2;
            fs.writeFileSync(path.join(IMPORTS_DIR, filename), Buffer.from(media.data, 'base64'));
            console.log("Downloaded", filename);
            count++;
          }
        } catch(e) {
          console.log("Error downloading media:", e.message);
        }
      }
    }
    console.log(`Downloaded ${count} media files`);
  }
  process.exit(0);
});
client.initialize();
