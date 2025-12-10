# CryptoVault - Quick Reference Card

## 🚀 Launch Command
```powershell
cd "c:\Users\DAVID\Desktop\crypto stuff"
node -e "const http = require('http'); const fs = require('fs'); const path = require('path'); const server = http.createServer((req, res) => { let file = req.url === '/' ? 'index.html' : req.url.slice(1); let filePath = path.join('.', file); try { const content = fs.readFileSync(filePath); const type = file.endsWith('.js') ? 'application/javascript' : file.endsWith('.css') ? 'text/css' : 'text/html'; res.writeHead(200, {'Content-Type': type}); res.end(content); } catch (e) { res.writeHead(404); res.end('Not found'); } }); server.listen(3000, () => console.log('🚀 CryptoVault running at http://localhost:3000')); "
```

## 🎯 Quick URLs

| Purpose | URL |
|---------|-----|
| **Main App** | http://localhost:3000 |
| **Share/QR** | http://localhost:3000/share.html |
| **Demo Email** | demo@example.com |
| **Demo Pass** | demo123 |

## ⚙️ Configuration Locations

| Item | File | Line | Action |
|------|------|------|--------|
| **Wallet Address** | index.html | 1133 | Add your Bitcoin/crypto address |
| **Currency** | index.html | 1136 | Change USD to EUR/GBP/JPY/AUD/CAD |
| **Crypto Prices** | index.html | 1137-1143 | Update for live prices |
| **Staking Plans** | index.html | 1157-1159 | Modify APY and minimums |

## 🔄 Supported Cryptocurrencies

```
BTC  - Bitcoin      ($95,000)
ETH  - Ethereum     ($3,500)
XRP  - Ripple       ($2.15)
ADA  - Cardano      ($0.95)
SOL  - Solana       ($180)
DOGE - Dogecoin     ($0.38)
USDT - Tether       ($1)
```

## 💱 Supported Currencies

```
USD - US Dollar     (1.0)
EUR - Euro          (0.92)
GBP - British Pound (0.79)
JPY - Japanese Yen  (150)
AUD - Australian $  (1.55)
CAD - Canadian $    (1.39)
```

## 📊 Staking Plans

| Plan | Min | APY | Duration |
|------|-----|-----|----------|
| **Basic** | $100 | 12% | 30 days |
| **Pro** | $500 | 18% | 60 days |
| **Elite** | $1000 | 25% | 90 days |

## ✨ Available Features

- ✅ Multi-currency buy/sell
- ✅ Instant token swaps
- ✅ Deposit/withdraw funds
- ✅ Send crypto to wallets
- ✅ Staking & earning
- ✅ Transaction history
- ✅ Portfolio tracking
- ✅ Real-time balance

## 🌐 Share With Ngrok (Fastest)

```powershell
# Download from: https://ngrok.com/download
ngrok http 3000

# Share the generated URL like:
# https://abc-xyz-123.ngrok.io
```

## 🎨 Customization Quick Edits

**Logo:** Line 600
```html
<div class="logo-icon">💎</div>  <!-- Change emoji -->
```

**Colors:** Top of CSS
```css
#667eea  ← Primary
#764ba2  ← Secondary
```

**Text:** Search and replace
- "CryptoVault" → Your name
- "demo@example.com" → Your email
- Add company logo/name

## 📋 Pre-Launch Checklist

- [ ] Update wallet address (CONFIG.MERCHANT_WALLET)
- [ ] Set correct currency (CONFIG.CURRENCY)
- [ ] Test demo login (demo@example.com / demo123)
- [ ] Try buying crypto
- [ ] Check staking
- [ ] Verify deposit instructions
- [ ] Test withdrawal
- [ ] Generate QR code
- [ ] Share with test users

## 🔗 Deployment Options

1. **Ngrok** - Instant tunnel (free)
2. **Vercel** - GitHub deployment (free)
3. **Heroku** - Easy app hosting (free tier)
4. **AWS EC2** - Scalable cloud (paid)
5. **Digital Ocean** - Simple VPS (paid)

## 💡 Pro Tips

- 💾 All user data stored locally in browser
- 🔐 Passwords are validated on login
- 📱 Fully responsive on mobile devices
- 🎨 Professional glassmorphism design
- ⚡ No external dependencies
- 📦 Single HTML file (easy to deploy)

## 🆘 Quick Fixes

**Port 3000 already in use?**
```powershell
Get-Process node | Stop-Process -Force
```

**Need to change port?**
Change `3000` to `3001` (or any unused port)

**Reset user data?**
- Press F12 → Application → LocalStorage → Clear all

---

**Version:** 1.0.0 | **Status:** ✅ Production Ready | **Updated:** December 2025
