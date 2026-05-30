const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: '.wwebjs_auth' }),
  puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});
client.on('ready', async () => {
  const chats = await client.getChats();
  const chat = chats.find(c => c.id._serialized.includes('5219841408335') || c.id._serialized.includes('529841408335') || (c.name && c.name.includes('Nanjing') && c.name.includes('🇲🇽')));
  if(chat) {
    console.log("Found chat:", chat.name, chat.id._serialized);
    const msgs = await chat.fetchMessages({ limit: 100 });
    msgs.forEach(m => console.log(new Date(m.timestamp*1000).toISOString(), m.hasMedia ? '[MEDIA]' : '', m.body));
  } else {
    console.log("Chat not found!");
  }
  process.exit(0);
});
client.initialize();
