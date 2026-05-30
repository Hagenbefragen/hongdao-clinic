const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: '.wwebjs_auth' }),
  puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});
client.on('ready', async () => {
  const chats = await client.getChats();
  const chat = chats.find(c => c.name && c.name.toLowerCase().includes('nanjing'));
  if(chat) {
    const msgs = await chat.fetchMessages({ limit: 1000 });
    msgs.forEach(m => console.log(new Date(m.timestamp*1000).toISOString(), m.hasMedia ? '[MEDIA]' : '', m.body));
  }
  process.exit(0);
});
client.initialize();
