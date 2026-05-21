const { Client, LocalAuth } = require('whatsapp-web.js');
const path = require('path');

const authPath = path.join(__dirname, '.wwebjs_auth');

console.log('Initializing client...');
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
  console.log('Client is ready! Fetching chats...');
  try {
    const chats = await client.getChats();
    console.log(`Total chats found: ${chats.length}`);
    
    const searchName = 'nanjing';
    const matchedChats = chats.filter(chat => 
      (chat.name && chat.name.toLowerCase().includes(searchName)) ||
      chat.id.user.includes('5219841408335') || 
      chat.id.user.includes('525585562805')
    );
    
    if (matchedChats.length === 0) {
      console.log('No specific chats matched "Nanjing" or the clinic number directly.');
      console.log('Listing the top 20 recent chats so you can verify the names:');
      chats.slice(0, 20).forEach((c, idx) => {
        console.log(`[${idx}] "${c.name}" (ID: ${c.id.user}) - Unread: ${c.unreadCount}`);
      });
      process.exit(0);
    }
    
    for (const chat of matchedChats) {
      console.log(`\n========================================`);
      console.log(`FOUND CHAT: ${chat.name} (${chat.id.user})`);
      console.log(`========================================`);
      
      const messages = await chat.fetchMessages({ limit: 20 });
      console.log(`Fetched ${messages.length} messages:`);
      
      messages.forEach((msg, idx) => {
        const time = new Date(msg.timestamp * 1000).toLocaleString();
        console.log(`[${idx + 1}] ${time} - ${msg.fromMe ? 'Me' : msg.author || msg.from}:`);
        console.log(`    Body: ${msg.body || '[Media/Attachment]'}`);
      });
    }
    
  } catch (err) {
    console.error('Error occurred:', err);
  }
  process.exit(0);
});

client.on('auth_failure', (msg) => {
  console.error('Auth failure:', msg);
  process.exit(1);
});

client.initialize().catch(err => {
  console.error('Init error:', err);
  process.exit(1);
});
