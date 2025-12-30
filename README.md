# Perf Tracker by OJ Consulting

A professional Core Web Vitals monitoring dashboard built with Next.js, connected to your Google Sheets data.

![Perf Tracker](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## Features

✅ Real-time Core Web Vitals monitoring  
✅ LCP, INP, CLS, TTFB metrics  
✅ Mobile & Desktop tracking  
✅ Interactive charts with Recharts  
✅ Color-coded status indicators  
✅ Connected to Google Sheets via API  
✅ Fully responsive design  
✅ Professional OJ Consulting branding  

## Prerequisites

- Node.js 18+ installed
- Your Google Sheet with CWV data (from the automation script)
- Google Sheets API enabled
- Vercel account (free)

## Setup Instructions

### 1. Clone or Download

Download all the files to a folder on your computer.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Google Sheets API

**Enable the API:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable "Google Sheets API"
4. Create credentials → API Key
5. Copy your API key

**Make your Sheet accessible:**
1. Open your Google Sheet
2. Click "Share" → "Anyone with the link" → "Viewer"
3. Copy the Sheet ID from URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GOOGLE_SHEET_ID=your_google_sheet_id_here
GOOGLE_SHEETS_API_KEY=your_google_api_key_here
```

Replace with your actual values.

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

## Deploy to Vercel (Free)

### Option 1: Deploy via GitHub

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/perf-tracker.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_GOOGLE_SHEET_ID`
     - `GOOGLE_SHEETS_API_KEY`
   - Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts and add your environment variables when asked.

### Option 3: Deploy via Vercel Dashboard (without GitHub)

1. Install Vercel CLI: `npm i -g vercel`
2. In your project folder: `vercel`
3. Follow prompts
4. Add environment variables in Vercel dashboard

## Environment Variables on Vercel

After deployment, add these in your Vercel project settings:

**Settings → Environment Variables:**
- `NEXT_PUBLIC_GOOGLE_SHEET_ID` → Your Sheet ID
- `GOOGLE_SHEETS_API_KEY` → Your API Key

Redeploy after adding variables.

## Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#1a73e8', // Your brand color
  success: '#34a853',
  warning: '#fbbc04',
  danger: '#ea4335',
}
```

### Update Branding

Edit `app/page.tsx`:
- Line 152: Change "Perf Tracker"
- Line 153: Change "OJ Consulting"

### Add Logo

1. Add your logo to `/public/logo.png`
2. Update `app/page.tsx`:

```tsx
<img src="/logo.png" alt="OJ Consulting" className="h-12" />
<h1>Perf Tracker</h1>
```

## Connecting to Real Data

The dashboard currently uses mock data for demonstration. To connect to your real Google Sheet:

1. Ensure your Sheet is shared (Anyone with link can view)
2. Set the environment variables correctly
3. The API route at `/api/cwv-data` will fetch real data
4. Update `app/page.tsx` line 60-65 to fetch from `/api/cwv-data`:

```tsx
useEffect(() => {
  fetch('/api/cwv-data')
    .then(res => res.json())
    .then(data => {
      setData(data)
      setLoading(false)
    })
    .catch(err => {
      console.error('Error:', err)
      setLoading(false)
    })
}, [])
```

## Troubleshooting

**"Missing configuration" error:**
- Check that environment variables are set correctly
- Verify Sheet ID is correct (no extra characters)
- Ensure API key is valid

**"Failed to fetch" error:**
- Check that your Sheet is shared publicly
- Verify Google Sheets API is enabled
- Check API key permissions

**Charts not showing:**
- Ensure you have data in your Google Sheet
- Check data format matches expected structure
- Open browser console for detailed errors

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Charts and graphs
- **Google Sheets API** - Data source
- **Vercel** - Hosting

## Support

For issues or questions:
- Check the troubleshooting section
- Review environment variable setup
- Verify Google Sheets API is enabled

## License

MIT License - Feel free to use and customize

---

**Built with ❤️ by OJ Consulting**
