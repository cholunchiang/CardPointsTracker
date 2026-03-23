# CardPointsTracker 💳

A modern PWA for tracking US credit card rewards, points, and miles across multiple cards and owners.

## 🚀 Try It Now!

**[📱 Open CardPointsTracker](https://cholunchiang.github.io/CardPointsTracker/dist/CardPointsTracker.html)**

Works on:
- ✅ iPhone (add to home screen for native app experience)
- ✅ iPad
- ✅ Mac/Desktop (Chrome, Safari, Firefox)

## ✨ Features

- **Multi-card tracking** — Track unlimited credit cards with points/miles balances
- **Multi-owner support** — Track for yourself, partner, or shared accounts
- **Annual fee tracking** — Monitor annual fees with totals by owner
- **Transfer partner ratios** — Custom redemption ratios per card per partner
- **Earning categories** — Color-coded categories with earning rates (3x Dining, 2x Travel, etc.)
- **Point history** — Log point earnings and track trends
- **Perk/benefit tracking** — Track recurring benefits with recurrence (monthly, quarterly, annual)
- **Smart benefit notifications** — 7-day expiring benefit reminders
- **iCloud backup/restore** — Persist data across devices
- **Smart filtering** — Filter by owner, category, or transfer partner
- **Sorting** — Sort by points balance, name, or due date
- **Bank branding** — 15+ bank logos and colors
- **Dark mode** — Auto-detects system theme preference

## 📁 Repository Structure

```
CardPointsTracker/
├── dist/                  # Production build (single HTML file)
├── src/                   # Source code (HTML, JS, CSS)
├── docs/                  # Documentation
│   ├── ARCHITECTURE.md    # Technical design
│   ├── DEV_LOG.md         # Version history & roadmap
│   ├── IPHONE_SETUP.md    # iPhone setup guide
│   └── TESTING.md         # Test framework
├── tests/                 # Test suites (~226 tests)
├── build/                 # Build automation
└── releases/              # Version archives
```

## 🧪 Testing

226 passing tests covering:
- **24 DOM Tests** — UI interactions
- **30 E2E Tests** — Complete user workflows
- **172 Unit Tests** — Logic, data, design system

Run tests locally:
```bash
open tests/test-runner.html
```

## 🛠️ Development

### Build
```bash
bash build/build.sh
```

### Run Tests
```bash
open tests/dom-tests.html        # DOM tests
open tests/e2e-tests.html        # E2E tests  
open tests/test-runner.html      # Unit tests
```

## 📚 Documentation

- **[README.md](README.md)** — Project overview
- **[CLAUDE.md](CLAUDE.md)** — AI assistant handoff document
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — Technical architecture
- **[docs/DEV_LOG.md](docs/DEV_LOG.md)** — Complete version history & roadmap
- **[docs/IPHONE_SETUP.md](docs/IPHONE_SETUP.md)** — How to use on iPhone
- **[docs/TESTING.md](docs/TESTING.md)** — Test framework guide
- **[tests/README.md](tests/README.md)** — How to run tests

## 🔐 Privacy & Security

- ✅ **Data stored locally** — All data stays on your device (localStorage)
- ✅ **No cloud sync** — Backup to iCloud is optional
- ✅ **No tracking** — No analytics or telemetry
- ✅ **No ads** — Completely ad-free
- ✅ **Open source** — Full source code available on GitHub

## 🌐 GitHub Pages Deployment

The app is automatically deployed to GitHub Pages at every push:

```
https://cholunchiang.github.io/CardPointsTracker/dist/CardPointsTracker.html
```

**Automatic deployment:** Just push to `main` branch and wait 1-2 minutes!

## 📱 iPhone Setup

1. Open Safari on your iPhone
2. Go to: https://cholunchiang.github.io/CardPointsTracker/dist/CardPointsTracker.html
3. Tap **Share** → **Add to Home Screen**
4. Done! You now have a native app on your home screen! 🎉

See [docs/IPHONE_SETUP.md](docs/IPHONE_SETUP.md) for detailed guide.

## 🚀 Quick Start

```bash
# Clone repo
git clone https://github.com/cholunchiang/CardPointsTracker.git
cd CardPointsTracker

# Build the app
bash build/build.sh

# Open in browser
open dist/CardPointsTracker.html

# Run tests
open tests/test-runner.html
```

## 📊 Current Version

**v3.5** — Smart benefit expiration reminders & auto-reset

### Recent Features
- v3.5: Smart benefit notifications (7-day warning), auto-reset at period boundaries
- v3.4: Perk/benefit tracking with recurrence (monthly, quarterly, annual)
- v3.3: Backup freshness tracking with 30-day reminder
- v3.2: Design system with CSS variables & auto dark mode
- v3.1: Card open date & 5/24 status tracker
- v3.0: Annual fee tracking

See [docs/DEV_LOG.md](docs/DEV_LOG.md) for complete version history.

## 🛣️ Roadmap

- [ ] Points Value Calculator (v3.6) — Calculate redemption value
- [ ] Push Notifications (v3.7) — Browser notifications for expiring benefits
- [ ] Spending Tracker (v3.8) — Track spending by category
- [ ] Multi-Device Sync (v3.9) — Real cloud sync across devices

## 🤝 Contributing

This is a personal project, but feel free to use it, fork it, or suggest improvements!

## 📝 License

Personal project - use freely for your own purposes.

---

**Made with ❤️ for tracking credit card rewards** 💳✨
