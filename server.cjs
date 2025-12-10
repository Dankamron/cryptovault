const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? 'index.html' : req.url.slice(1);
  filePath = path.join(__dirname, filePath);
  
  try {
    const content = fs.readFileSync(filePath);
    const ext = path.extname(filePath);
    let type = 'text/html';
    if (ext === '.js') type = 'application/javascript';
    if (ext === '.css') type = 'text/css';
    
    res.writeHead(200, { 
      'Content-Type': type,
      'ngrok-skip-browser-warning': 'true'
    });
    res.end(content);
  } catch (err) {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, '0.0.0.0', () => {
  console.log('✅ CryptoVault LIVE at http://localhost:3000');
});
