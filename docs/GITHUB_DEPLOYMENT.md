# 🚀 GitHub Pages Deployment Guide for CardPointsTracker

> **Complete step-by-step guide to host CardPointsTracker on GitHub Pages**
> 
> **Goal:** Access your card tracker from anywhere (iPhone, iPad, Mac) via a stable URL

---

## 📋 **What This Achieves**

✅ **Always accessible** — Works on any device with a browser  
✅ **No Mac required** — Hosted in the cloud for free  
✅ **Add to home screen** — Full PWA experience on iPhone  
✅ **Your data is safe** — Stored locally on each device (not on GitHub)  
✅ **Easy updates** — Push code changes without affecting your data  

---

## 🛡️ **Important: Your Data Privacy**

### **How Data Storage Works:**

| What's on GitHub | What's on Your iPhone |
|------------------|----------------------|
| ✅ App code (HTML/CSS/JS) | ✅ Your card data (localStorage) |
| ✅ Tests | ✅ Your points balances |
| ✅ Documentation | ✅ Your benefit usage |
| ❌ NO card data | ❌ Nothing on GitHub |
| ❌ NO personal info | |

**Key Point:** GitHub only hosts the **app code**. Your actual card data lives in your iPhone's browser storage (localStorage), **never uploaded to GitHub**.

### **What Happens When You Update Code:**

```
You: Edit code → Build → Git push
  ↓
GitHub: Updates app code
  ↓
iPhone: Downloads new code, KEEPS existing localStorage data
  ↓
Result: New features work, your cards/points/history stay intact! ✅
```

**Your data is safe because:**
1. localStorage is tied to the **domain** (e.g., `username.github.io`)
2. As long as the domain doesn't change, data persists
3. Code updates don't touch localStorage

---

## 📝 **Prerequisites**

### **1. GitHub Account**
- Go to https://github.com
- Sign up (free) or log in if you have an account
- Remember your username

### **2. Git Installed on Mac**
Check if installed:
```bash
git --version
```
If not installed, run:
```bash
xcode-select --install
```

### **3. GitHub CLI (Optional but Recommended)**
Makes authentication easier:
```bash
brew install gh
gh auth login
```

---

## 🏗️ **Step-by-Step Deployment Process**

### **Phase 1: Prepare Repository** 📁

#### **Step 1.1: Initialize Git Repository**
```bash
cd /Users/cholunchiang/Desktop/CardPointsTracker
git init
```

#### **Step 1.2: Create .gitignore File**
This tells Git what NOT to upload (backup files, temp files, etc.):

```bash
cat > .gitignore << 'EOF'
# Backup files (don't upload personal data!)
*.json
!package.json

# Temp files
*.log
*.tmp
.DS_Store

# Personal backups
*_Backup.json
*_MyCards_*.json

# Node modules (if any)
node_modules/

# OS files
.DS_Store
Thumbs.db
EOF
```

#### **Step 1.3: Create README for GitHub**
```bash
cat > .github-README.md << 'EOF'
# 💳 CardPointsTracker

A Progressive Web App (PWA) for tracking US credit card rewards, points, and miles.

## 🌐 Live App

**[Open CardPointsTracker](https://YOUR-USERNAME.github.io/CardPointsTracker/dist/CardPointsTracker.html)**

> Replace YOUR-USERNAME with your GitHub username

## ✨ Features

- Track multiple cards across owners (Me/Wife/Shared)
- Point history tracking with notes
- Smart benefit expiration reminders (7-day warning)
- Auto-reset benefits at period boundaries
- Transfer partner ratio calculator
- iCloud backup/restore
- 5/24 status tracking
- Dark mode (auto-detects system preference)

## 📱 Install on iPhone

1. Open the live app link above in Safari
2. Tap Share button → "Add to Home Screen"
3. Enjoy full-screen PWA experience!

## 🔒 Privacy

All your card data is stored locally in your browser (localStorage). Nothing is uploaded to GitHub or any server. Your data stays on your device.

## 🧪 Tests

- 226 comprehensive tests
- Run tests: Open `tests/test-runner.html` in browser

## 📖 Documentation

See `/docs` folder for complete documentation.

---

**Version:** 3.5  
**Last Updated:** March 2025
EOF
```

#### **Step 1.4: Stage All Files**
```bash
git add .
git status  # Review what will be committed
```

#### **Step 1.5: First Commit**
```bash
git commit -m "Initial commit - CardPointsTracker v3.5 with smart benefit tracking"
```

---

### **Phase 2: Create GitHub Repository** 🌐

#### **Step 2.1: Create Repository on GitHub**

**Option A: Using GitHub CLI (Easier)**
```bash
gh repo create CardPointsTracker --public --source=. --remote=origin --push
```

**Option B: Manual via Website**
1. Go to https://github.com/new
2. Repository name: `CardPointsTracker`
3. Description: "PWA for tracking credit card points and miles"
4. Set to **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README (we already have files)
6. Click "Create repository"

#### **Step 2.2: Connect Local Repo to GitHub**
If you used Option B (manual), run:
```bash
git remote add origin https://github.com/YOUR-USERNAME/CardPointsTracker.git
git branch -M main
git push -u origin main
```

---

### **Phase 3: Enable GitHub Pages** 🚀

#### **Step 3.1: Configure GitHub Pages**
1. Go to your repo: `https://github.com/YOUR-USERNAME/CardPointsTracker`
2. Click **Settings** tab
3. Click **Pages** in left sidebar
4. Under "Source":
   - Select branch: `main`
   - Select folder: `/ (root)`
5. Click **Save**

#### **Step 3.2: Wait for Deployment**
- GitHub will build your site (takes 1-2 minutes)
- You'll see: "Your site is live at `https://YOUR-USERNAME.github.io/CardPointsTracker/`"

#### **Step 3.3: Test the URL**
Your app will be at:
```
https://YOUR-USERNAME.github.io/CardPointsTracker/dist/CardPointsTracker.html
```

---

### **Phase 4: Set Up on iPhone** 📱

#### **Step 4.1: Open in Safari**
1. On iPhone, open Safari
2. Go to: `https://YOUR-USERNAME.github.io/CardPointsTracker/dist/CardPointsTracker.html`
3. App loads! 🎉

#### **Step 4.2: Import Your Cards**
1. First, get the backup file to iPhone:
   - **Via AirDrop:** Send `CardPointsTracker_MyCards_Backup.json` from Mac
   - **Via iCloud:** Copy to iCloud Drive, access from Files app
2. In the app: Tap "📊 Summary"
3. Scroll to "☁️ Backup Status"
4. Tap "Import Backup"
5. Select the JSON file
6. Your 3 cards appear! ✅

#### **Step 4.3: Add to Home Screen**
1. While viewing the app in Safari
2. Tap the **Share** button (bottom middle)
3. Scroll down → Tap **"Add to Home Screen"**
4. Name it: "CardPoints" (or whatever you like)
5. Tap **"Add"**
6. Now you have a home screen icon! 🎉

---

## 🔄 **Future Updates Workflow**

### **When You Add Features:**

```bash
# 1. Make changes to source files
code src/js/main.js  # or whatever you're editing

# 2. Build the app
bash build/build.sh

# 3. Test locally
open dist/CardPointsTracker.html

# 4. Commit and push
git add .
git commit -m "Add feature X"
git push origin main

# 5. Wait 1-2 minutes for GitHub to deploy

# 6. On iPhone: 
#    - Force refresh Safari (pull down)
#    - Your data is SAFE — only code updated!
```

**Your card data will NOT be affected** because:
- localStorage is domain-specific
- Code updates don't reset localStorage
- Your data stays on your iPhone

---

## 🛡️ **Data Safety Guarantees**

### **What's Safe:**
✅ Pushing code updates to GitHub  
✅ Adding new features  
✅ Fixing bugs  
✅ Updating CSS/design  
✅ Adding new test files  

### **What Could Wipe Data:**
❌ Changing the GitHub Pages URL/domain  
❌ Clearing Safari data on iPhone  
❌ Clicking "Reset to Defaults" in the app  
❌ Using Safari Private Mode  

### **Best Practice:**
📦 **Export backup regularly** (weekly or after adding cards)
- Tap Summary → Export Backup
- Save to iCloud Drive
- Now you can restore anytime!

---

## 🧪 **Testing Strategy**

### **Before Deploying New Features:**

1. **Test locally first:**
   ```bash
   # Make changes
   bash build/build.sh
   open dist/CardPointsTracker.html
   # Test in browser
   ```

2. **Run test suite:**
   ```bash
   open tests/test-runner.html
   # Verify all 226 tests pass
   ```

3. **Test on iPhone BEFORE importing real data:**
   - Deploy to GitHub
   - Open on iPhone
   - Test with dummy data first
   - Once stable, import your real cards

---

## 📁 **Repository Structure**

```
CardPointsTracker/
├── .git/                    # Git metadata (auto-generated)
├── .gitignore              # Files to exclude from Git
├── README.md               # Project documentation
├── CLAUDE.md               # AI handoff doc
├── build/                  # Build scripts
├── dist/                   # Production build (THIS GETS SERVED)
│   └── CardPointsTracker.html  # Your app (132KB)
├── docs/                   # Documentation
├── src/                    # Source files
├── tests/                  # Test suites (226 tests)
└── releases/               # Version archives
```

**What users see:** Only the `dist/CardPointsTracker.html` file via the URL

---

## 🔗 **Your Final URLs**

After setup, you'll have:

- **App:** `https://YOUR-USERNAME.github.io/CardPointsTracker/dist/CardPointsTracker.html`
- **Tests:** `https://YOUR-USERNAME.github.io/CardPointsTracker/tests/test-runner.html`
- **Repo:** `https://github.com/YOUR-USERNAME/CardPointsTracker`

Bookmark the app URL on your iPhone! 📱

---

## ❓ **FAQ**

### **Q: Will my cards be public on GitHub?**
**A:** NO! The backup JSON files are in `.gitignore` and never uploaded. Only the app code is public.

### **Q: Can other people see my points?**
**A:** NO! Your data is only in your iPhone's localStorage, never sent to GitHub.

### **Q: What if I accidentally push a backup file?**
**A:** The `.gitignore` prevents this. But if it happens, you can delete it from the repo and your iPhone data is still safe.

### **Q: Will updates break my data?**
**A:** NO! As long as the domain stays the same and we test properly, updates are safe.

### **Q: How do I back up my iPhone data?**
**A:** In the app: Summary → Export Backup → Save to iCloud Drive or email yourself

### **Q: Can I use this on multiple devices?**
**A:** YES! Each device has its own localStorage. Use Import/Export to sync manually.

---

## 🎯 **Ready to Start?**

If you're ready to proceed, I'll help you with:
1. Creating the GitHub repository
2. Pushing the code
3. Enabling GitHub Pages
4. Testing on your iPhone
5. Importing your 3 cards

**Should we begin?** 🚀

---

**Document Version:** 1.0  
**Created:** 2025-03-24  
**For:** CardPointsTracker v3.5 deployment
