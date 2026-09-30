# GETO // TELEGRAM SYSTEM (GETO Hub)

Official Telegram bot ecosystem, SUDO utility fleet, and community directory for **GETO** ([@ll_DARK_GETO_ll](https://t.me/ll_DARK_GETO_ll)).

---

## 🚀 GitHub Pages par Host Kaise Karein (Step-by-Step)

Aapki website GitHub Pages ke liye 100% ready kar di gayi hai:
- `base: './'` configure ho chuka hai (images/assets path break nahi honge).
- Hash router use ho raha hai (`#/bots`, `#/communities`), isliye GitHub Pages par 404 error nahi aayega.
- Automated GitHub Actions workflow (`.github/workflows/deploy.yml`) already added hai.

### Option 1: Automated GitHub Actions (Sabse Easy Tarika)

1. **GitHub par naya Repository banayein** (e.g. `geto-system` ya `geto-hub`).
2. Yeh saara code apne GitHub repository me push karein:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for GETO Hub"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```
3. GitHub repository me **Settings** tab par jayein:
   - Left menu me **Pages** par click karein.
   - **Build and deployment** section ke andar:
     - **Source**: Select karein **GitHub Actions**.
4. Bas! GitHub automatically website build karke deploy kar dega.
   - Aapki live website ka link: `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

### Option 2: Manual Build & Push (dist folder)

Agar aap bina GitHub Actions ke directly build host karna chahte hain:
1. Terminal me run karein:
   ```bash
   npm install
   npm run build
   ```
2. `./dist` folder ke andar saari ready static files ban jayengi jo kisi bhi static hosting (GitHub Pages, Vercel, Netlify, Cloudflare Pages) par chalengi.

---

## ⚙️ Configuration (src/config.js)

Sabhi future changes sirf `src/config.js` me karne hain:
- **Bot Status**: `status: "active"` ya `"deactivated"`
- **New Bots**: `CONFIG.detailedBots` ya `CONFIG.botDatabase` me naya object add karein.
- **Communities**: `CONFIG.communities` me naya group add karein.
- **Social Links**: `CONFIG.socials` me username/URL update karein.
- **Music**: `CONFIG.musicEnabled: true` karke player on karein.
