const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 8080;

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

startWhatsAppListener();

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Normalize URL path
  const decodedUrl = decodeURIComponent(req.url);
  const pathname = decodedUrl.split('?')[0];
  
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
