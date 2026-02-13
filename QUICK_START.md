# 🚀 Quick Setup Guide - Valentine's Day Page

## ⚡ 3-Minute Setup

### 1️⃣ Add Your Files (2 minutes)

**Photo:**
- Replace `c:\SVLTIN\valentine\public\photo.jpg` with your photo
- Recommended: Square image, 400x400px or larger

**Music:**
- Replace `c:\SVLTIN\valentine\public\music.mp3` with your romantic song
- Format: MP3 (most compatible)

### 2️⃣ Configure Supabase (1 minute)

**Create Project:**
1. Go to [supabase.com](https://supabase.com) → Sign up (free)
2. New Project → Name it "valentine" → Create

**Setup Database:**
1. SQL Editor → New Query
2. Copy content from `supabase-setup.sql`
3. Paste and Run

**Get Credentials:**
1. Settings → API
2. Copy **Project URL** and **anon public key**
3. Edit `main.js` lines 5-6 with your credentials

### 3️⃣ Test It!

```bash
cd c:\SVLTIN\valentine
npm run dev
```

Open: `http://localhost:5173`

---

## ✅ Quick Test Checklist

- [ ] Hearts/arrows falling in background
- [ ] Click heart seal → letter opens
- [ ] Music plays
- [ ] Click "No" 3 times → "Yes" grows
- [ ] Click "Yes" → hearts explode
- [ ] Check Supabase → new row in `valentine_responses`

---

## 🎨 Quick Customizations

**Change message** → Edit `index.html` line 30
**Adjust volume** → Edit `main.js` line 9 (0.0 to 1.0)
**Change colors** → Edit `style.css` lines 2-8

---

## 🌐 Deploy (Optional)

```bash
npm run build
```

Upload `dist/` folder to:
- [Netlify](https://netlify.com) (drag & drop)
- [Vercel](https://vercel.com) (import from GitHub)
- [GitHub Pages](https://pages.github.com)

---

**Need help?** Check the full [README.md](file:///c:/SVLTIN/valentine/README.md) or [walkthrough.md](file:///C:/Users/mendo/.gemini/antigravity/brain/70f54450-417d-4b88-9cd1-d863719f4495/walkthrough.md)
