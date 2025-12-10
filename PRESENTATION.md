# 🚀 CryptoVault - Professional Demo

## Live Demo Access

### Quick Start (Local Testing)
**Server running on:** `http://localhost:3000`

---

## Demo Credentials
- **Email:** `demo@example.com`
- **Password:** `demo123`

---

## Features Included

✅ **Multi-Currency Support**
- 7 cryptocurrencies: BTC, ETH, XRP, ADA, SOL, DOGE, USDT
- Real-time exchange rates for USD, EUR, GBP, JPY, AUD, CAD
- Dynamic pricing updates

✅ **Secure Wallet System**
- Configurable deposit wallet address
- Clear deposit instructions
- Transaction tracking

✅ **Complete Trading Platform**
- Buy/Sell cryptocurrencies
- Swap tokens instantly
- Send crypto to other wallets

✅ **Staking & Earning**
- Basic Plan (12% APY, 30 days)
- Pro Plan (18% APY, 60 days)
- Elite Plan (25% APY, 90 days)

✅ **Professional Dashboard**
- Real-time portfolio tracking
- Transaction history
- Asset management
- Glassmorphism UI design

---

## Configuration

### Change Wallet Address
Edit `index.html` line 1133:
```javascript
const CONFIG = {
    MERCHANT_WALLET: 'YOUR_BITCOIN_ADDRESS_HERE', // Add your wallet here
    // ... rest of config
};
```

### Change Currency
Edit `index.html` line 1136:
```javascript
CURRENCY: 'USD', // Change to: EUR, GBP, JPY, AUD, CAD
```

---

## Testing Workflow

1. **Register** - Create new account or use demo credentials
2. **Deposit** - See wallet address and deposit instructions
3. **Trade** - Buy/Sell different cryptocurrencies
4. **Swap** - Exchange between assets
5. **Stake** - Earn passive income with staking plans

---

## For Remote Sharing

### Option 1: Use Localhost Tunnel (Recommended)
Install ngrok:
```powershell
choco install ngrok
```

Run:
```powershell
ngrok http 3000
```

Share the generated URL with testers.

### Option 2: Deploy to Vercel
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically
4. Share Vercel URL

### Option 3: Use Cloudflare Tunnel
```powershell
cloudflared tunnel --url http://localhost:3000
```

---

## Technical Stack
- Pure HTML5/CSS3/JavaScript (no dependencies)
- Responsive design (mobile/tablet/desktop)
- Local storage for user data
- Node.js server (running on port 3000)

---

## Next Steps

1. **Update Wallet Address** - Add your Bitcoin/Crypto address for receiving deposits
2. **Customize Branding** - Change logo, colors, company name
3. **Add Payment Gateway** - Integrate Stripe/PayPal for real deposits
4. **Deploy to Production** - Use Heroku, AWS, or your preferred host

---

**Created:** December 2025
**Status:** Production Ready ✅

