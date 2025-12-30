# Quick Start Guide - Perf Tracker

## 5-Minute Deployment to Vercel

### Step 1: Get Your Google Sheet Ready (2 min)

1. Open your Google Sheet with CWV data
2. Click **Share** → **Anyone with the link** → **Viewer**
3. Copy the **Sheet ID** from URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
   ```

### Step 2: Get Google Sheets API Key (2 min)

1. Go to: https://console.cloud.google.com
2. **APIs & Services** → **Enable APIs** → Search "Google Sheets API" → Enable
3. **Credentials** → **Create Credentials** → **API Key**
4. Copy your API key

### Step 3: Deploy to Vercel (1 min)

**Option A: Via GitHub (Recommended)**

```bash
# Upload to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/perf-tracker.git
git push -u origin main

# Then on vercel.com:
# - Click "New Project"
# - Import from GitHub
# - Add env variables (see below)
# - Deploy
```

**Option B: Direct Deploy**

```bash
npm i -g vercel
vercel login
vercel
# Follow prompts, add env variables when asked
```

### Step 4: Add Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_GOOGLE_SHEET_ID = your_sheet_id
GOOGLE_SHEETS_API_KEY = your_api_key
```

Click **Redeploy** after adding variables.

### Done! 🎉

Your dashboard is now live at: `https://your-project.vercel.app`

## Local Development

```bash
npm install
# Create .env.local with your variables
npm run dev
# Open http://localhost:3000
```

## Need Help?

Check the full README.md for detailed instructions and troubleshooting.
