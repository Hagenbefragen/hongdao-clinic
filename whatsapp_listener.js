const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const qr = require('qr-image');
const fs = require('fs');
const path = require('path');

// Ensure directories exist
const IMPORTS_DIR = path.join(__dirname, 'images', 'whatsapp_imports');
if (!fs.existsSync(IMPORTS_DIR)) {
  fs.mkdirSync(IMPORTS_DIR, { recursive: true });
}

const INBOX_PATH = path.join(__dirname, 'whatsapp_inbox.json');
const STATUS_PATH = path.join(__dirname, 'whatsapp_status.json');

// Initialize inbox and status if they don't exist
if (!fs.existsSync(INBOX_PATH)) {
  fs.writeFileSync(INBOX_PATH, JSON.stringify([], null, 2));
}

function updateStatus(status, extra = {}) {
  const data = {
    status,
    updatedAt: new Date().toISOString(),
    ...extra
  };
  fs.writeFileSync(STATUS_PATH, JSON.stringify(data, null, 2));
  console.log(`[WhatsApp Sync] Status changed: ${status}`);
}

updateStatus('disconnected', { message: 'Initializing client...' });

// Initialize client
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: path.join(__dirname, '.wwebjs_auth')
  }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', (qrText) => {
  // 1. Output to terminal
  qrcode.generate(qrText, { small: true });
  
  // 2. Save as PNG image in workspace
  try {
    const qrPng = qr.image(qrText, { type: 'png' });
    qrPng.pipe(fs.createWriteStream(path.join(__dirname, 'whatsapp_qr.png')));
    updateStatus('qr', { message: 'Scan the QR code in the console or dashboard.' });
  } catch (err) {
    console.error('Error generating QR image:', err);
  }
});

client.on('ready', async () => {
  updateStatus('ready', { 
    message: 'Connected successfully!', 
    phoneNumber: client.info.wid.user 
  });
  
  // Delete QR image if it exists
  const qrFile = path.join(__dirname, 'whatsapp_qr.png');
  if (fs.existsSync(qrFile)) {
    try {
      fs.unlinkSync(qrFile);
    } catch (err) {
      // Ignore
    }
  }

  // Sync recent message history
  await syncHistory();
});

client.on('authenticated', () => {
  console.log('[WhatsApp Sync] Authenticated!');
});

client.on('auth_failure', (msg) => {
  updateStatus('disconnected', { message: `Authentication failure: ${msg}` });
});

client.on('disconnected', (reason) => {
  updateStatus('disconnected', { message: `Disconnected: ${reason}` });
});

client.on('message', async (msg) => {
  console.log(`[WhatsApp Sync] New message from ${msg.from}: ${msg.body}`);
  
  let mediaInfo = null;
  if (msg.hasMedia) {
    try {
      const media = await msg.downloadMedia();
      if (media) {
        // Determine file extension from mimetype
        const ext = media.mimetype.split('/')[1] || 'bin';
        const safeExt = ext.split(';')[0];
        const filename = `wa_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${safeExt}`;
        const filePath = path.join(IMPORTS_DIR, filename);
        
        fs.writeFileSync(filePath, Buffer.from(media.data, 'base64'));
        mediaInfo = {
          filename,
          localPath: `images/whatsapp_imports/${filename}`,
          mimetype: media.mimetype
        };
        console.log(`[WhatsApp Sync] Saved media to ${filePath}`);
      }
    } catch (err) {
      console.error('[WhatsApp Sync] Failed to download media:', err);
    }
  }
  
  // Read existing inbox
  let inbox = [];
  try {
    inbox = JSON.parse(fs.readFileSync(INBOX_PATH, 'utf8'));
  } catch (err) {
    inbox = [];
  }
  
  // Add new message
  const newMsg = {
    id: msg.id.id,
    timestamp: new Date(msg.timestamp * 1000).toISOString(),
    from: msg.from,
    author: msg.author || msg.from,
    body: msg.body || '',
    hasMedia: msg.hasMedia,
    media: mediaInfo,
    status: 'pending' // pending, applied, ignored
  };
  
  inbox.unshift(newMsg); // Newest first
  
  // Keep last 100 messages
  if (inbox.length > 100) {
    inbox = inbox.slice(0, 100);
  }
  
  fs.writeFileSync(INBOX_PATH, JSON.stringify(inbox, null, 2));
  console.log(`[WhatsApp Sync] Saved message to inbox.`);
});

async function syncHistory() {
  console.log('[WhatsApp Sync] Fetching recent chats to sync history...');
  try {
    const chats = await client.getChats();
    console.log(`[WhatsApp Sync] Found ${chats.length} chats.`);
    
    // Scan the most recent 10 chats
    let chatsToSync = chats.slice(0, 10);
    
    // Read existing inbox
    let inbox = [];
    try {
      inbox = JSON.parse(fs.readFileSync(INBOX_PATH, 'utf8'));
    } catch (err) {
      inbox = [];
    }
    
    const inboxIds = new Set(inbox.map(msg => msg.id));
    let newMessagesAdded = 0;
    
    for (const chat of chatsToSync) {
      console.log(`[WhatsApp Sync] Syncing history for chat: ${chat.name || chat.id.user}`);
      
      const messages = await chat.fetchMessages({ limit: 30 });
      for (const msg of messages) {
        // Skip structural system messages
        if (!msg.body && !msg.hasMedia) {
          continue;
        }
        
        if (inboxIds.has(msg.id.id)) {
          continue; // Already processed
        }
        
        let mediaInfo = null;
        if (msg.hasMedia) {
          try {
            const media = await msg.downloadMedia();
            if (media) {
              const ext = media.mimetype.split('/')[1] || 'bin';
              const safeExt = ext.split(';')[0];
              const filename = `wa_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${safeExt}`;
              const filePath = path.join(IMPORTS_DIR, filename);
              
              fs.writeFileSync(filePath, Buffer.from(media.data, 'base64'));
              mediaInfo = {
                filename,
                localPath: `images/whatsapp_imports/${filename}`,
                mimetype: media.mimetype
              };
              console.log(`[WhatsApp Sync] Saved history media to ${filePath}`);
            }
          } catch (err) {
            console.error('[WhatsApp Sync] Failed to download history media:', err);
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
        newMessagesAdded++;
      }
    }
    
    if (newMessagesAdded > 0) {
      // Sort inbox by timestamp descending
      inbox.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      // Keep last 100
      if (inbox.length > 100) {
        inbox = inbox.slice(0, 100);
      }
      
      fs.writeFileSync(INBOX_PATH, JSON.stringify(inbox, null, 2));
      console.log(`[WhatsApp Sync] Synced history. Added ${newMessagesAdded} messages.`);
    } else {
      console.log('[WhatsApp Sync] History synced. No new messages found.');
    }
    
  } catch (err) {
    console.error('[WhatsApp Sync] Error syncing history:', err);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('[WhatsApp Sync] Shutting down...');
  updateStatus('disconnected', { message: 'Process terminated.' });
  try {
    await client.destroy();
  } catch (err) {}
  process.exit(0);
});

client.initialize().catch(err => {
  console.error('[WhatsApp Sync] Initialization error:', err);
  updateStatus('disconnected', { message: `Initialization error: ${err.message}` });
});
