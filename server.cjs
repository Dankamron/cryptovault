const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { MongoClient } = require('mongodb');

// MongoDB Connection String
const MONGO_URI = 'mongodb+srv://dankjunior6_db_user:Dank4000@cryptovault.wmj1c6g.mongodb.net/?appName=cryptovault';
const client = new MongoClient(MONGO_URI);
let db = null;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    db = client.db('cryptovault');
    console.log('✅ Connected to MongoDB');
    
    // Initialize collections if needed
    const usersCollection = db.collection('users');
    const balancesCollection = db.collection('balances');
    
    // Ensure default admin account exists
    const adminExists = await usersCollection.findOne({ email: 'admin@gmail.com' });
    if (!adminExists) {
      await usersCollection.insertOne({ 
        email: 'admin@gmail.com', 
        password: '123@admin', 
        name: 'Admin', 
        isAdmin: true 
      });
      console.log('✅ Admin account created');
    }
    
    const demoExists = await usersCollection.findOne({ email: 'demo@example.com' });
    if (!demoExists) {
      await usersCollection.insertOne({ 
        email: 'demo@example.com', 
        password: 'demo123', 
        name: 'John Doe' 
      });
      console.log('✅ Demo account created');
    }
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // Handle API requests
  if (pathname === '/api/users' && req.method === 'GET') {
    try {
      const usersCollection = db.collection('users');
      const users = await usersCollection.find({}).toArray();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }
  
  if (pathname === '/api/balances' && req.method === 'GET') {
    try {
      const balancesCollection = db.collection('balances');
      const balances = await balancesCollection.find({}).toArray();
      const balancesObj = {};
      balances.forEach(doc => {
        balancesObj[doc.email] = {
          total: doc.total,
          interest: doc.interest,
          BTC: doc.BTC || { amount: 0, value: 0 },
          ETH: doc.ETH || { amount: 0, value: 0 },
          USDT: doc.USDT || { amount: 0, value: 0 },
          XRP: doc.XRP || { amount: 0, value: 0 },
          ADA: doc.ADA || { amount: 0, value: 0 },
          SOL: doc.SOL || { amount: 0, value: 0 },
          DOGE: doc.DOGE || { amount: 0, value: 0 }
        };
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(balancesObj));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }
  
  if (pathname === '/api/update-user' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        
        if (payload.action === 'update-balance') {
          const balancesCollection = db.collection('balances');
          
          const balanceData = {
            email: payload.email,
            total: payload.balance,
            interest: payload.interest,
            BTC: { amount: 0, value: 0 },
            ETH: { amount: 0, value: 0 },
            USDT: { amount: 0, value: 0 },
            XRP: { amount: 0, value: 0 },
            ADA: { amount: 0, value: 0 },
            SOL: { amount: 0, value: 0 },
            DOGE: { amount: 0, value: 0 }
          };
          
          await balancesCollection.updateOne(
            { email: payload.email },
            { $set: balanceData },
            { upsert: true }
          );
          
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
  
  if (pathname === '/api/signup' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        const usersCollection = db.collection('users');
        
        // Check if user exists
        const existing = await usersCollection.findOne({ email: payload.email });
        if (existing) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Email already registered' }));
          return;
        }
        
        // Create new user
        await usersCollection.insertOne({
          email: payload.email,
          password: payload.password,
          name: payload.name
        });
        
        // Initialize balance
        const balancesCollection = db.collection('balances');
        await balancesCollection.insertOne({
          email: payload.email,
          total: 0,
          interest: 0,
          BTC: { amount: 0, value: 0 },
          ETH: { amount: 0, value: 0 },
          USDT: { amount: 0, value: 0 },
          XRP: { amount: 0, value: 0 },
          ADA: { amount: 0, value: 0 },
          SOL: { amount: 0, value: 0 },
          DOGE: { amount: 0, value: 0 }
        });
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
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

// Start server after connecting to DB
connectDB().then(() => {
  server.listen(3000, '0.0.0.0', () => {
    console.log('✅ CryptoVault LIVE at http://localhost:3000');
  });
});
