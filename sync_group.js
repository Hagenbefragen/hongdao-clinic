const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

const authPath = path.join(__dirname, '.wwebjs_auth');
const IMPORTS_DIR = path.join(__dirname, 'images', 'whatsapp_imports');
const INBOX_PATH = path.join(__dirname, 'whatsapp_inbox.json');

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: authPath }),
  puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

client.on('ready', async () => {
  console.log('Client is ready!');
  const chat = await client.getChatById('120363418303207840@g.us');
  const messages = await chat.fetchMessages({ limit: 50 });
  
  let inbox = [];
  try { inbox = JSON.parse(fs.readFileSync(INBOX_PATH, 'utf8')); } catch(e){}
  
  let count = 0;
  for (const msg of messages) {
    if (msg.hasMedia) {
      const media = await msg.downloadMedia();
      if (media) {
        const ext = media.mimetype.split('/')[1] || 'bin';
        const filename = `wa_${msg.timestamp}_${Math.random().toString(36).substring(2, 7)}.${ext.split(';')[0]}`;
        fs.writeFileSync(path.join(IMPORTS_DIR, filename), Buffer.from(media.data, 'base64'));
        
        inbox.push({
          id: msg.id.id,
          timestamp: new Date(msg.timestamp * 1000).toISOString(),
          author: msg.author,
          body: msg.body || '',
          hasMedia: true,
          media: { filename, localPath: `images/whatsapp_imports/${filename}` }
        });
        console.log(`Saved media for: ${msg.body}`);
        count++;
      }
    } else if (msg.body) {
        inbox.push({
          id: msg.id.id,
          timestamp: new Date(msg.timestamp * 1000).toISOString(),
          author: msg.author,
          body: msg.body || '',
          hasMedia: false
        });
        console.log(`Saved text: ${msg.body}`);
        count++;
    }
  }
  
  fs.writeFileSync(INBOX_PATH, JSON.stringify(inbox, null, 2));
  console.log(`Done syncing ${count} messages from group.`);
  process.exit(0);
});
client.initialize();
