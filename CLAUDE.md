# 🤖 CLAUDE.md - AI Assistant Handoff Document

> **Read this file first when starting a new conversation about CardPointsTracker!**
>
> 📌 **Current Status:** v3.5 with Smart Benefit Notifications & Auto-Reset — Ready for UI/UX overhaul!

## 🌐 GitHub Deployment

**Live App:** https://cholunchiang.github.io/CardPointsTracker/dist/CardPointsTracker.html

**Repository:** https://github.com/cholunchiang/CardPointsTracker

**Backup Location:** User's iCloud: `~/Library/Mobile Documents/com~apple~CloudDocs/Card Tracker/`

### Updating the App (GitHub Pages Auto-Deploy)
1. Make changes to source files
2. Run build: `bash build/build.sh`
3. Test locally with `open dist/CardPointsTracker.html`
4. Commit and push:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
5. Wait 1-2 minutes for GitHub Pages to deploy
6. Refresh on iPhone (data persists!)

## Project Overview

**CardPointsTracker** is a PWA for tracking US credit card rewards, points, and miles.

- **Location:** `/Users/cholunchiang/Desktop/CardPointsTracker`
- **Current Version:** v3.5
- **Stack:** Vanilla HTML/CSS/JS, localStorage, single-file PWA
- **Tests:** 226 tests (24 DOM + 30 E2E + 172 unit including 18 v3.5) — all passing ✅

## 🌐 GitHub Deployment

**Live App:** https://cholunchiang.github.io/CardPointsTracker/dist/CardPointsTracker.html

**Repository:** https://github.com/cholunchiang/CardPointsTracker

**Backup Location:** User's iCloud Drive: `~/Library/Mobile Documents/com~apple~CloudDocs/Card Tracker/`

### Updating the App
1. Make changes to source files
2. Run build: `bash build/build.sh`
3. Test locally
4. Commit and push:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
5. Wait 1-2 minutes for GitHub Pages to deploy
6. Refresh on iPhone (data persists!)

## Quick Commands

```bash
# Build the app
bash /Users/cholunchiang/Desktop/CardPointsTracker/build/build.sh

# Run tests (all ~226 tests)
open /Users/cholunchiang/Desktop/CardPointsTracker/tests/dom-tests.html

# Check current roadmap
cat /Users/cholunchiang/Desktop/CardPointsTracker/docs/DEV_LOG.md

# Find specific code
grep -n "PATTERN" /Users/cholunchiang/Desktop/CardPointsTracker/src/js/main.js
```

## File Map

| File | What It Does |
|------|--------------|
| `README.md` | Project overview & quick start |
| `docs/IPHONE_SETUP.md` | How to use on iPhone (with backup & import guide) |
| `docs/ARCHITECTURE.md` | Technical architecture |
| `docs/TESTING.md` | Test framework & patterns |
| `docs/DEV_LOG.md` | Version history + roadmap |
| `src/js/main.js` | **ALL** application logic (~48KB) |
| `src/styles/components.css` | UI styling (~21KB) |
| `src/index.html` | HTML template |
| `dist/CardPointsTracker.html` | Production build (~87KB) — deployed to GitHub Pages |
| `tests/README.md` | How to run tests |
| `tests/dom-tests.html` | 24 DOM/UI tests |
| `tests/e2e-tests.html` | 30 E2E workflow tests |
| `tests/test-runner.html` | 172 unit tests |

## Current Roadmap (v3.5+)

- [x] Perk/benefit tracking with recurrence
- [x] Smart benefit expiration reminders (7-day warning)
- [x] Auto-reset benefits at period boundaries
- [x] Tab badge for expiring benefits count
- [x] Pulsing animation on expiring period boxes
- [ ] **Enhanced card database & smart autofill (v3.6)** ⬅️ NEXT
- [ ] Points Value Calculator (v3.7)
- [ ] Push notifications for expiring benefits (v3.8)
- [ ] Spending Tracker analytics (v3.9)
- [ ] Multi-device sync (v3.10)

## Development Workflow

### ALWAYS use sub-agents for:
1. **Exploring code** — Don't read entire main.js into context
2. **Implementing features** — Keeps main conversation clean
3. **Multi-file changes** — JS + CSS + HTML together

### Example sub-agent prompts:
```
"Explore CardPointsTracker to find how [X] is implemented"

"Implement [feature] in CardPointsTracker:
- Modify src/js/main.js for logic
- Add styles to src/styles/components.css
- Run build script when done"
```

## Post-Implementation Checklist

**ALWAYS do these steps after implementing a feature:**

1. ✅ **Run build** — `bash build/build.sh`
2. ✅ **Run tests** — Open `tests/test-runner.html` in browser
3. ✅ **Update DEV_LOG.md** — Document what was done
4. ✅ **Update CLAUDE.md** — Update version, roadmap if needed
5. ✅ **Update skill** — If patterns changed, update `~/.agents/skills/cardpointstracker-dev/`
6. ✅ **Test both themes** — Verify light AND dark mode work

## Key Code Patterns

### Category System
- `CATEGORY_COLORS` — Maps category → color name
- `CATEGORY_ALIASES` — Normalizes variations ("Dining worldwide" → "Dining")
- `getCategoryColor(perk)` — Returns color for a perk
- `normalizeCategory(cat)` — Normalizes category name

### Transfer Partners
- Each partner has own ratio: `{name: 'EVA Air', ratio: '2:1.5', est: 63750}`
- `renderRedeemRows()` — Renders editable partner rows
- `getRedeemRows()` — Collects partner data from form

### Benefit/Perk Tracking (v3.4-3.5)
- `getPeriodLabels(recurrence)` — Returns period labels for benefit type (["Jan"...] for monthly)
- `getPeriodKey(recurrence, idx)` — Returns unique period key for tracking used status
- `initializeBenefitPeriods(benefit)` — Creates periods tracking object for new benefit
- `getBenefitUsedTotal(benefit)` — Returns {used, total} for current period cycle
- `toggleBenefitPeriod(cardId, benefitIdx, periodKey)` — Marks period as used/unused
- `renderBenefitRows()` — Renders editable benefit rows in Add Card form
- `addBenefitRow()` — Adds new benefit input row
- `removeBenefitRow(idx)` — Removes benefit row
- `getBenefits()` — Collects benefit data from form

### Benefit Expiration & Auto-Reset (v3.5)
- `getCurrentPeriodIndex()` — Returns index of current period for benefit recurrence
- `getCurrentPeriodEndDate()` — Returns Date when current period ends for auto-reset
- `getExpiringBenefits()` — Returns benefits expiring within 7 days with days-remaining
- `getExpiringBenefitCount()` — Returns count of expiring benefits for tab badge
- `ensureCurrentPeriodExists()` — Creates new period box when period boundary crossed
- `checkAndResetBenefits()` — Auto-resets all benefits when period boundaries reached
- `renderExpiringBanner()` — Renders reminder banner showing expiring benefits
- `updateTabBadge()` — Updates Coupons tab badge with expiring count

### Card Object Structure
```javascript
{
  id, name, bank, icon, color, points, due, owner, annualFee, openDate,
  perks: ['3x Dining', ...],
  redeem: [{name, ratio, est}, ...],
  coupons: [{text, expiry, done}, ...],
  history: [{type, amount, date, note}, ...]
}
```

## Tips

1. **Build after every change** — `bash build/build.sh`
2. **Use file_edit, not file_write** — Surgical changes are safer
3. **Check DEV_LOG.md** — Know what's done and what's planned
4. **Update DEV_LOG.md** — After completing features
5. **Test in browser** — Open dist/CardPointsTracker.html

## Skill Available

There's a skill installed at `~/.agents/skills/cardpointstracker-dev/` with:
- `SKILL.md` — Full development guide
- `CODE_PATTERNS.md` — Common code modifications

Load it with:
```
agent_skills operation="get" skill_name="cardpointstracker-dev"
```

---

*Last updated: 2025-03-24 (v3.5 complete, roadmap updated)*

## 🧪 Test Suite

**226 passing tests** in 3 suites:

| Suite | Tests | Type | Command |
|-------|-------|------|---------|
| **DOM Tests** | 24 | UI/interaction | `open tests/dom-tests.html` |
| **E2E Tests** | 30 | User workflows | `open tests/e2e-tests.html` |
| **Unit Tests** | 172 | Logic/data/design system (18 v3.5 tests) | `open tests/test-runner.html` |

See [tests/README.md](tests/README.md) for how to run and write tests.
See [docs/TESTING.md](docs/TESTING.md) for test framework details.
