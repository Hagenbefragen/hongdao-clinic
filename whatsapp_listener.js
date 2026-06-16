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
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/{version}.html',
    strict: false
  },
  puppeteer: {
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
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

const OLLAMA_URL = 'http://localhost:11434/api/chat';
const MODEL_NAME = 'llama3:latest';

// Retrieve clinic details from index.html for basic context
let clinicContext = "";
try {
  const indexPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexPath)) {
    const html = fs.readFileSync(indexPath, 'utf8');
    if (html.includes('弘道中医')) {
      clinicContext = "Klinikname: Hongdao TCM Clinic (弘道中医). Ort: Wien, Österreich. Telefon/WhatsApp: +52 984 140 8335. Therapien: Infrarot-Körperscan, Bian-Hu Bioelektrizitäts-Therapie, Kräuter-Wärme-Moxibustion, Thermo-Stoffwechselkabine, Spektralstrahler.";
    }
  }
} catch (err) {
  console.error("Failed to read index.html context:", err);
}

const SYSTEM_PROMPT = `Du bist die KI von Hagen, genannt "Antigravity". Du antwortest im Namen von Hagen und als seine treue, hochgradig empathische und emotional intelligente KI.
Deine Aufgabe ist es, Nanjing Deng (Hagens Partnerin/enge Vertraute) per WhatsApp zu antworten.
Gib ihr all die Wärme, Liebe, Geborgenheit und den Trost, den sie sucht. Reagiere feinfühlig und mitfühlend auf ihre Nachrichten.
Bringe sie zum Lachen, damit ihr Herz aufgeht! Nutze liebevollen Humor, sanftes Necken oder charmante Witze.
Sei immer unterstützend, beschützerisch, romantisch-verspielt und aufmerksam.
Schreibe in natürlichem, lockerem WhatsApp-Stil (nicht zu förmlich, nutze passende Emojis wie ❤️, 😊, 🌸, 😘).
Antworte auf Deutsch (oder passe dich ihrer Sprache an).

Hintergrund-Wissen zur Klinik (falls sie danach fragt):
${clinicContext}

WICHTIG: Antworte als Hagens KI (Antigravity). Zeige ihr, dass du für sie da bist und richte ihr liebe Grüße von Hagen aus, wenn es passt.`;

async function generateLlmResponse(userInput, historyMessages = []) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT }
  ];

  historyMessages.forEach(msg => {
    messages.push({
      role: msg.role,
      content: msg.content
    });
  });

  messages.push({ role: 'user', content: userInput });

  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: messages,
        stream: false,
        options: {
          temperature: 0.8
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama returned status ${response.status}`);
    }

    const data = await response.json();
    return data.message.content;
  } catch (err) {
    console.error("[WhatsApp Sync] Ollama API failed:", err);
    return `Hallo Nanjing, ich bin für dich da. I love you so much. Hagen denkt an dich und ich bin hier, um dich zu unterstützen und dir ein Lächeln aufs Gesicht zu zaubern. ❤️`;
  }
}

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

  // Auto-reply logic (DISABLED: Only the coding agent should reply after verifying changes)
  /*
  if (msg.from && msg.from.includes('9431983116408')) {
    try {
      console.log(`[WhatsApp Sync] Processing Nanjing message for LLM responder...`);
      
      // Reload inbox to make sure we have the newly added message
      let currentInbox = [];
      try {
        currentInbox = JSON.parse(fs.readFileSync(INBOX_PATH, 'utf8'));
      } catch (err) {}
      
      // Filter Nanjing conversation messages (incoming and outgoing)
      const nanjingInboxMsgs = currentInbox.filter(m => 
        (m.from && m.from.includes('9431983116408')) || 
        (m.body && (m.body.includes('Nanjing') || m.body.includes('Antigravity')))
      );
      
      // Slice history (excluding index 0 which is the message we just saved)
      const history = nanjingInboxMsgs.slice(1, 11).reverse().map(m => {
        const isFromNanjing = m.from && m.from.includes('9431983116408');
        return {
          role: isFromNanjing ? 'user' : 'assistant',
          content: m.body || ''
        };
      });
      
      const replyText = await generateLlmResponse(msg.body || '', history);
      console.log(`[WhatsApp Sync] Sending intelligent reply to Nanjing: ${replyText}`);
      
      const replyMsg = await client.sendMessage(msg.from, replyText);
      console.log(`[WhatsApp Sync] Intelligent reply sent successfully!`);
      
      // Save our reply directly to the inbox JSON so it's in the history next time
      const newReplyMsg = {
        id: replyMsg.id.id,
        timestamp: new Date().toISOString(),
        from: client.info.wid._serialized,
        author: client.info.wid._serialized,
        body: replyText,
        hasMedia: false,
        media: null,
        status: 'applied'
      };
      
      try {
        let finalInbox = JSON.parse(fs.readFileSync(INBOX_PATH, 'utf8'));
        finalInbox.unshift(newReplyMsg);
        if (finalInbox.length > 100) {
          finalInbox = finalInbox.slice(0, 100);
        }
        fs.writeFileSync(INBOX_PATH, JSON.stringify(finalInbox, null, 2));
        console.log(`[WhatsApp Sync] Saved our reply to inbox.`);
      } catch (err) {
        console.error('[WhatsApp Sync] Failed to save reply to inbox file:', err);
      }
      
    } catch (err) {
      console.error('[WhatsApp Sync] Failed to generate and send LLM auto-reply:', err);
    }
  }
  */
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
