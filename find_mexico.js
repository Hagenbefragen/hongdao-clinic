const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');
const IMPORTS_DIR = path.join(__dirname, 'images', 'whatsapp_imports');

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: '.wwebjs_auth' }),
  puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});
client.on('ready', async () => {
  const chats = await client.getChats();
  const target = chats.find(c => c.id.user === '5219841408335');
  if(target) {
    console.log('Found it:', target.name);
    const msgs = await target.fetchMessages({ limit: 50 });
    for(let m of msgs) {
      if(m.hasMedia) {
          const media = await m.downloadMedia();
          if (media) {
            const ext = media.mimetype.split('/')[1] || 'bin';
            const filename = `wa_${m.timestamp}_${Math.random().toString(36).substring(2, 7)}.${ext.split(';')[0]}`;
            fs.writeFileSync(path.join(IMPORTS_DIR, filename), Buffer.from(media.data, 'base64'));
            console.log('Saved media for:', m.body, 'File:', filename);
          }
      }
      console.log(new Date(m.timestamp*1000).toISOString(), m.hasMedia, m.body);
    }
  } else {
    console.log('Not found');
  }
  process.exit(0);
});
client.initialize();
