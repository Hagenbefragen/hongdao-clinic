const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

const authPath = path.join(__dirname, '.wwebjs_auth');
const IMPORTS_DIR = path.join(__dirname, 'images', 'whatsapp_imports');
const INBOX_PATH = path.join(__dirname, 'whatsapp_inbox.json');

if (!fs.existsSync(IMPORTS_DIR)) {
  fs.mkdirSync(IMPORTS_DIR, { recursive: true });
}

console.log('Initializing client to sync Nanjing chat...');
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: authPath
  }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('ready', async () => {
  console.log('Client is ready!');
  try {
    const chats = await client.getChats();
    const chat = chats.find(c => c.name && c.name.toLowerCase().includes('nanjing'));
    
    if (!chat) {
      console.error('Nanjing chat not found!');
      process.exit(1);
    }
    
    console.log(`Found chat: ${chat.name} (${chat.id.user}). Fetching last 150 messages...`);
    const messages = await chat.fetchMessages({ limit: 150 });
    console.log(`Fetched ${messages.length} messages. Processing...`);
    
    // Read existing inbox
    let inbox = [];
    try {
      inbox = JSON.parse(fs.readFileSync(INBOX_PATH, 'utf8'));
    } catch (err) {
      inbox = [];
    }
    
    const inboxIds = new Set(inbox.map(msg => msg.id));
    let newCount = 0;
    
    for (const msg of messages) {
      if (!msg.body && !msg.hasMedia) {
        continue;
      }
      
      // If already in inbox, skip
      if (inboxIds.has(msg.id.id)) {
        console.log(`Message ${msg.id.id} already in inbox.`);
        continue;
      }
      
      let mediaInfo = null;
      if (msg.hasMedia) {
        try {
          console.log(`Downloading media for message: ${msg.body || '[Media]'}`);
          const media = await msg.downloadMedia();
          if (media) {
            const ext = media.mimetype.split('/')[1] || 'bin';
            const safeExt = ext.split(';')[0];
            const filename = `wa_${msg.timestamp}_${Math.random().toString(36).substring(2, 7)}.${safeExt}`;
            const filePath = path.join(IMPORTS_DIR, filename);
            
            fs.writeFileSync(filePath, Buffer.from(media.data, 'base64'));
            mediaInfo = {
              filename,
              localPath: `images/whatsapp_imports/${filename}`,
              mimetype: media.mimetype
            };
            console.log(`Saved media: ${filename}`);
          }
        } catch (err) {
          console.error('Failed to download media:', err);
        }
      }
      
      const newMsg = {
        id: msg.id.id,
        timestamp: new Date(msg.timestamp * 1000).toISOString(),
        from: msg.from,
        author: msg.author || msg.from,
        body: msg.body || '',
        hasMedia: msg.hasMedia,
        media: mediaInfo,
        status: 'pending'
      };
      
      inbox.push(newMsg);
      inboxIds.add(msg.id.id);
      newCount++;
    }
    
    if (newCount > 0) {
      // Sort inbox by timestamp descending
      inbox.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      // Keep last 200
      if (inbox.length > 200) {
        inbox = inbox.slice(0, 200);
      }
      
      fs.writeFileSync(INBOX_PATH, JSON.stringify(inbox, null, 2));
      console.log(`Successfully synced ${newCount} messages from Nanjing chat.`);
    } else {
      console.log('No new messages to sync.');
    }
    
  } catch (err) {
    console.error('Sync failed:', err);
  }
  process.exit(0);
});

client.initialize().catch(err => {
  console.error('Initialization error:', err);
  process.exit(1);
});
