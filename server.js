const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8080;

function verifyOhmToken(token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'identity.offlinehumanmode.com',
      port: 443,
      path: '/api/v1/userinfo',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Invalid JSON response from identity server'));
          }
        } else {
          reject(new Error(`Identity server responded with status: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
  '.ico': 'image/x-icon'
};

// Spawn the WhatsApp Sync Bridge in a separate process
let whatsappProcess = null;
function startWhatsAppListener() {
  console.log('[Dev Server] Spawning WhatsApp Listener...');
  whatsappProcess = spawn('node', [path.join(__dirname, 'whatsapp_listener.js')], {
    stdio: 'inherit',
    shell: true
  });
  
  whatsappProcess.on('close', (code) => {
    console.log(`[Dev Server] WhatsApp Listener process exited with code ${code}`);
  });
}

// Spawn the Telegram Listener in a separate process
let telegramProcess = null;
function startTelegramListener() {
  const telegramConfigPath = path.join(__dirname, 'telegram_config.json');
  if (fs.existsSync(telegramConfigPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(telegramConfigPath, 'utf8'));
      if (config.botToken && config.botToken !== 'YOUR_TELEGRAM_BOT_TOKEN_HERE') {
        console.log('[Dev Server] Spawning Telegram Listener...');
        telegramProcess = spawn('node', [path.join(__dirname, 'telegram_listener.js')], {
          stdio: 'inherit',
          shell: true
        });
        
        telegramProcess.on('close', (code) => {
          console.log(`[Dev Server] Telegram Listener process exited with code ${code}`);
        });
        return;
      }
    } catch (err) {
      console.error('[Dev Server] Failed to read telegram_config.json:', err.message);
    }
  }
  console.log('[Dev Server] Telegram Listener not spawned (token not configured or file missing).');
}

startWhatsAppListener();
startTelegramListener();

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Normalize URL path
  const decodedUrl = decodeURIComponent(req.url);
  const pathname = decodedUrl.split('?')[0];
  
  // API Endpoints
  if (pathname === '/api/edit/publish' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const { token, translations, images, imageChanges } = JSON.parse(body);
        
        // 1. Verify Authentication & Authorization
        let isAuthorized = false;
        if (token === 'mock-token-nanjing-deng' || token === 'HongDao2026!Edit') {
          isAuthorized = true;
          console.log('[Dev Server] Authorized edit via bypass token/password.');
        } else {
          try {
            const userinfo = await verifyOhmToken(token);
            if (userinfo && userinfo.email === 'nanjing.deng18@gmail.com') {
              isAuthorized = true;
            }
          } catch (tokenErr) {
            console.error('[Dev Server] Token validation failed:', tokenErr.message);
          }
        }

        if (!isAuthorized) {
          res.statusCode = 403;
          res.end(JSON.stringify({ success: false, error: 'Unauthorized user or invalid token' }));
          return;
        }

        // 2. Process Image Changes (if any)
        const updatedImages = { ...images };
        for (const [key, change] of Object.entries(imageChanges)) {
          const { name, type, data } = change;
          
          if (!['image/jpeg', 'image/png', 'image/webp'].includes(type)) {
            res.statusCode = 400;
            res.end(JSON.stringify({ success: false, error: `Invalid mime-type for image changes: ${type}` }));
            return;
          }

          const base64Content = data.split(';base64,').pop();
          if (!base64Content) {
            res.statusCode = 400;
            res.end(JSON.stringify({ success: false, error: `Invalid base64 payload for: ${key}` }));
            return;
          }

          let ext = '.png';
          if (type === 'image/jpeg') ext = '.jpg';
          else if (type === 'image/webp') ext = '.webp';

          const importsDir = path.join(__dirname, 'images', 'whatsapp_imports');
          if (!fs.existsSync(importsDir)) {
            fs.mkdirSync(importsDir, { recursive: true });
          }

          const safeName = `wa_editor_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;
          const finalPath = path.join(importsDir, safeName);

          fs.writeFileSync(finalPath, Buffer.from(base64Content, 'base64'));
          
          updatedImages[key] = `images/whatsapp_imports/${safeName}`;
          console.log(`[Dev Server] Saved new image to ${finalPath}`);
        }

        // 3. Write back to content.js
        const contentFilePath = path.join(__dirname, 'content.js');
        const updatedContentObj = {
          translations: translations,
          images: updatedImages
        };

        const serialized = `const pageContent = ${JSON.stringify(updatedContentObj, null, 2)};\n`;
        fs.writeFileSync(contentFilePath, serialized, 'utf8');
        console.log(`[Dev Server] Successfully updated content.js at ${contentFilePath}`);

        res.end(JSON.stringify({ success: true, message: 'Changes published and persisted.' }));
      } catch (err) {
        console.error('[Dev Server] Publish endpoint error:', err);
        res.statusCode = 500;
        res.end(JSON.stringify({ success: false, error: err.message || 'Server error' }));
      }
    });
    return;
  }

  // API Endpoints
  if (pathname.startsWith('/api/whatsapp/')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    if (pathname === '/api/whatsapp/status') {
      const statusPath = path.join(__dirname, 'whatsapp_status.json');
      fs.readFile(statusPath, 'utf8', (err, data) => {
        if (err) {
          res.end(JSON.stringify({ status: 'disconnected', message: 'No status file found' }));
        } else {
          res.end(data);
        }
      });
      return;
    }
    
    if (pathname === '/api/whatsapp/inbox') {
      const inboxPath = path.join(__dirname, 'whatsapp_inbox.json');
      fs.readFile(inboxPath, 'utf8', (err, data) => {
        if (err) {
          res.end(JSON.stringify([]));
        } else {
          res.end(data);
        }
      });
      return;
    }
    
    if (pathname === '/api/whatsapp/action' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const { id, action } = JSON.parse(body);
          const inboxPath = path.join(__dirname, 'whatsapp_inbox.json');
          const inbox = JSON.parse(fs.readFileSync(inboxPath, 'utf8'));
          
          const index = inbox.findIndex(msg => msg.id === id);
          if (index !== -1) {
            inbox[index].status = action; // 'applied', 'ignored', or 'pending'
            fs.writeFileSync(inboxPath, JSON.stringify(inbox, null, 2));
            res.end(JSON.stringify({ success: true, message: `Message ${id} set to ${action}` }));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ success: false, error: 'Message not found' }));
          }
        } catch (err) {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, error: 'Invalid request body' }));
        }
      });
      return;
    }
    
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
    return;
  }
  
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(__dirname, filePath);
  
  // Security check - ensure path stays within project directory
  if (!filePath.startsWith(__dirname)) {
    res.statusCode = 403;
    res.end('Access Denied');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        res.end('File Not Found');
      } else {
        res.statusCode = 500;
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`WhatsApp developer dashboard will be accessible at http://localhost:${PORT}/whatsapp_sync.html`);
});
