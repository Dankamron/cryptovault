const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// File to store global user data
const DATA_FILE = path.join(__dirname, 'vault_data.json');

// Initialize data file if it doesn't exist
function initializeDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
      users: [
        { email: 'demo@example.com', password: 'demo123', name: 'John Doe' },
        { email: 'admin@gmail.com', password: '123@admin', name: 'Admin', isAdmin: true }
      ],
      balances: {}
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Load data from file
function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (err) {
    return { users: [], balances: {} };
  }
}

// Save data to file
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // Handle API requests
  if (pathname === '/api/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const data = loadData();
    res.end(JSON.stringify(data.users));
    return;
  }
  
  if (pathname === '/api/balances' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const data = loadData();
    res.end(JSON.stringify(data.balances));
    return;
  }
  
  if (pathname === '/api/update-user' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const data = loadData();
        
        if (payload.action === 'update-balance') {
          if (!data.balances[payload.email]) {
            data.balances[payload.email] = { total: 0, interest: 0, BTC: { amount: 0, value: 0 }, ETH: { amount: 0, value: 0 }, USDT: { amount: 0, value: 0 }, XRP: { amount: 0, value: 0 }, ADA: { amount: 0, value: 0 }, SOL: { amount: 0, value: 0 }, DOGE: { amount: 0, value: 0 } };
          }
          data.balances[payload.email].total = payload.balance;
          data.balances[payload.email].interest = payload.interest;
          saveData(data);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }
  
  // Handle static files
  let filePath = pathname === '/' ? 'index.html' : pathname.slice(1);
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

initializeDataFile();

server.listen(3000, '0.0.0.0', () => {
  console.log('✅ CryptoVault LIVE at http://localhost:3000');
});
