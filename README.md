# 💳 CardPointsTracker

A PWA for tracking US credit card rewards, points, and miles across multiple cards and owners.

## 🌐 Live Demo

**[📱 Try the App Now!](https://cholunchiang.github.io/CardPointsTracker/dist/CardPointsTracker.html)** — Works on iPhone, iPad, and Desktop!

👉 **Bookmark this on your iPhone** to add it to your home screen as a native app!

See [docs/IPHONE_SETUP.md](docs/IPHONE_SETUP.md) for complete setup instructions.

## 🚀 Quick Start

```bash
# Build the app
bash build/build.sh

# Open in browser
open dist/CardPointsTracker.html

# Run tests (all 226 tests)
open tests/dom-tests.html
```

## 📁 Project Structure

```
CardPointsTracker/
├── README.md              # This file
├── CLAUDE.md              # AI assistant handoff doc
├── build/                 # Build automation
│   └── build.sh
├── dist/                  # Built app (single HTML file)
│   ├── CardPointsTracker.html
│   └── CardPointsTracker.eml
├── src/                   # Source code
│   ├── index.html
│   ├── js/main.js
│   └── styles/
├── docs/                  # Documentation
│   ├── ARCHITECTURE.md    # Technical architecture & design
│   ├── DEV_LOG.md         # Version history & roadmap
│   └── TESTING.md         # Test suite documentation
├── tests/                 # Test suites (~226 tests total)
│   ├── README.md
│   ├── dom-tests.html     # DOM/UI tests (24 tests)
│   ├── e2e-tests.html     # End-to-end tests (30 tests)
│   ├── test-runner.html   # Unit tests (~172 tests including v3.5)
│   └── run-tests.sh
└── releases/              # Version archives
    └── archive/           # Old releases
```

## ✨ Features

- **Multi-card tracking** — Track unlimited credit cards with points/miles balances
- **Multi-owner support** — Track for yourself, partner, or shared accounts
- **Annual fee tracking** — Monitor annual fees with totals by owner
- **Transfer partner ratios** — Custom redemption ratios per card per partner
- **Earning categories** — Color-coded categories with earning rates (3x Dining, 2x Travel, etc.)
- **Point history** — Log point earnings and track trends
- **iCloud backup/restore** — Persist data across devices
- **Smart filtering** — Filter by owner, category, or transfer partner
- **Sorting** — Sort by points balance, name, or due date
- **Bank branding** — 15+ bank logos and colors
- **Smart benefit notifications** — 7-day expiring benefit reminders with tab badge
- **Auto-reset benefits** — Automatic period boundary resets for recurring benefits

## 📊 Current Version

**v3.5** — See [docs/DEV_LOG.md](docs/DEV_LOG.md) for complete version history.

### Recent Updates
- v3.5: Smart benefit expiration reminders (7-day warning), auto-reset at period boundaries, tab badge for expiring benefits
- v3.4: Perk/benefit tracking with recurrence (monthly, quarterly, semi-annual, annual)
- v3.3: Backup freshness tracking with 30-day reminder
- v2.1: Per-partner transfer ratios
- v2.0: Multi-owner support (Me/Wife/Shared)
- v1.8: Card CRUD with localStorage persistence
- v1.7: iCloud backup/restore

## 🧪 Testing

CardPointsTracker includes a comprehensive test suite with **226 tests**:

| Suite | Tests | Focus |
|-------|-------|-------|
| **dom-tests.html** | 24 | Real DOM interactions & UI |
| **e2e-tests.html** | 30 | Complete user workflows |
| **test-runner.html** | 172 | Logic & data operations (including 18 v3.5 tests) |

**Run tests:**
```bash
open tests/dom-tests.html
```

See [tests/README.md](tests/README.md) for detailed testing information.

## 🛠️ Development

### Build Process

The app is compiled into a single HTML file using a custom build script:

```bash
bash build/build.sh
```

Output: `dist/CardPointsTracker.html` (~87KB)

### Project Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for:
- Data model & card schema
- Component structure
- Key functions & APIs
- CSS class reference
- Development patterns

### Version History & Roadmap

See [docs/DEV_LOG.md](docs/DEV_LOG.md) for:
- Complete version history
- Feature changelog
- Next features (v2.3 roadmap)
- Known issues & technical debt

## 📝 Documentation

- **CLAUDE.md** — AI assistant handoff & project context
- **docs/ARCHITECTURE.md** — Technical design & code patterns
- **docs/DEV_LOG.md** — Version history & roadmap
- **docs/TESTING.md** — Test framework & writing new tests
- **tests/README.md** — How to run the test suite
- **src/README.md** — Source code structure

## 🔗 Quick Links

- [View App](https://cholunchiang.github.io/CardPointsTracker/dist/CardPointsTracker.html) 🚀
- [iPhone Setup Guide](docs/IPHONE_SETUP.md) 📱
- [GitHub Repository](https://github.com/cholunchiang/CardPointsTracker)
- [Architecture](docs/ARCHITECTURE.md)
- [Test Suite](tests/README.md)
- [Version History](docs/DEV_LOG.md)
- [For AI Assistants](CLAUDE.md)

---

Made with ❤️ for tracking credit card rewards.
