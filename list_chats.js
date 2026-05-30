const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: '.wwebjs_auth' }),
  puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});
client.on('ready', async () => {
  const chats = await client.getChats();
  chats.forEach(c => console.log(c.name, c.id._serialized, new Date(c.timestamp*1000).toISOString()));
  process.exit(0);
});
client.initialize();
