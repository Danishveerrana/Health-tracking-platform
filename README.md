# Health Tracker

A full-featured daily health tracking app with dark/light mode, aurora transition effect, habit management, analytics dashboard, and GitHub-style activity grid.

##  Features
- Dark / Light mode with flowing aurora animation on toggle
- Dashboard carousel — Overview + Analytics slides
- Habit tick boxes: Done / Not Done / Empty
- Add & delete custom habits with SVG icon picker
- Month heatmap activity grid
- Sparkline + bar charts for trends
- Full month data table (read-only)
- Streak, avg score, days logged stats
- Data persists via localStorage

---

##  Deploy to Vercel via GitHub (step by step)

### Step 1 — Create GitHub repository
1. Go to [github.com](https://github.com) → Sign in
2. Click **"New"** (green button, top left)
3. Name it `health-tracker` → Click **"Create repository"**

### Step 2 — Upload these files
On the new empty repo page, click **"uploading an existing file"**

Drag and drop the **entire contents** of this folder:
```
health-tracker/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .gitignore
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    └── App.jsx
```
Click **"Commit changes"**

### Step 3 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click **"Add New Project"**
3. Import your `health-tracker` repository
4. Vercel auto-detects Vite — click **"Deploy"**
5. Done! Your app is live in ~60 seconds

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for production

```bash
npm run build
npm run preview
```
