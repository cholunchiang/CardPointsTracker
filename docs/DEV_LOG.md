# 💳 Card Points Tracker — Development Log

> **Project:** US Credit Card Points & Miles Tracker  
> **Owner:** Personal (Me + Wife)  
> **Started:** 2025-07  
> **Stack:** Vanilla HTML/CSS/JS · PWA · LocalStorage + JSON backup

---

## ✅ Completed Features

### v3.5 — Enhanced Benefit Notifications & Auto-Reset 🔔
**Smart benefit expiration reminders and automatic period reset!**
**Smart benefit expiration reminders and automatic period reset!**

**Features:**
- 🔔 **Smart benefit expiration reminders** — Displays banner when benefits expiring within 7 days
  - Shows card name + benefit + days remaining
  - Orange gradient banner for high visibility
  - Only shows unused benefits (ignores marked-as-used)
  - Auto-updates as you use benefits
- 🔄 **Auto-reset benefits at period boundaries** — Creates new period box automatically
  - Monthly: Jan 1, Feb 1, Mar 1, etc.
  - Quarterly: Apr 1, Jul 1, Oct 1, Jan 1
  - Semi-annual: Jul 1, Jan 1
  - Annual: Jan 1
  - No manual action needed — seamless experience
- ⏱️ **Period-aware expiration tracking** — Tracks benefit expiration dates per period
  - Calculates days until period end
  - Compares against 7-day warning threshold
- 🏷️ **Tab badge for expiring benefits** — Shows count of benefits expiring soon
  - Red badge on Coupons tab: 🎁 Coupons 2
  - Auto-hides when all benefits are safe
  - Helps at a glance see if you have urgent benefits to use
- ✨ **Pulsing period box animation** — Orange pulsing border on expiring period boxes
  - Visual indicator for period ending soon
  - Draws attention to urgent benefits
  - Smooth CSS animation for elegance

**New Functions:**
- `getCurrentPeriodIndex()` — Returns index of current period based on recurrence type
- `getCurrentPeriodEndDate()` — Returns Date when current period ends for reset timing
- `getExpiringBenefits()` — Returns {benefit, card, daysRemaining} for benefits < 7 days to expiration
- `ensureCurrentPeriodExists()` — Creates new period box when period boundary crossed
- `checkAndResetBenefits()` — Automatically resets all benefits when period boundaries reached

**UI Updates:**
- Coupons view shows reminder banner at top with expiring benefits
- Period boxes include pulsing animation for period expiring within 7 days
- Tab badge shows count of expiring benefits (displays only if > 0)
- Auto-refresh on period boundary (runs checkAndResetBenefits on init)

**Files changed:**
- `src/js/main.js` — Added all new functions, updated renderCouponsView(), initApp(), loadCards()
- `src/styles/components.css` — Added .expiring-banner, .period-expiring-soon animation, .tab-badge styles

### v3.4 — Perk/Benefit Tracking 🎁
- Card tiles, miles view, coupon book, summary dashboard
- Add/delete card, LocalStorage, search, dark mode

### v1.1 — US Cards + English UI
- US card database (15 cards), full English UI
- Owner tags (Me/Wife/Shared) + filter tabs
- Auto-fill card data, localStorage corruption fixes

### v1.2 — Point History & Notes
- Log earned/spent points with date + note
- History timeline in card detail, running balance update

### v1.3 — iCloud Backup
- Export JSON → iPhone Share Sheet → iCloud Drive
- Import JSON restore with validation

### v1.4 — Bank Badges
- Inline bank badges (15 banks, real brand colors)
- Bank picker grid in Add Card form

### v1.5 — Data Fix
- Stricter localStorage validation (wipes bad/old data)

### v1.6 — Project Restructure 🏗️
**Major refactor to modular architecture!**

**New directory structure:**
```
src/
├── index.html        # HTML structure only (with emojis ✅)
├── styles/
│   ├── base.css      # Core typography, layout
│   ├── components.css # Cards, modals, forms, nav
│   └── themes.css    # Light/dark mode colors
├── data/
│   ├── banks.js      # BANK_BRANDS, BANK_LIST
│   ├── cards.js      # CARD_DB (autofill data)
│   └── defaults.js   # EMOJIS, COLORS, DEFAULTS
└── js/
    ├── app.js        # Main state & init
    ├── storage.js    # localStorage, backup/restore
    ├── render.js     # UI rendering functions
    └── modals.js     # Modal handlers
```

**Benefits:**
- 🔧 Edit CSS without touching JS
- 🔧 Update card database without breaking UI
- 🔧 Fix emoji encoding in one place
- 🔧 Build script combines all → single HTML for distribution

**Files created:**
- `build/build.sh` — Combines src/ into dist/CardPointsTracker.html
- `docs/ARCHITECTURE.md` — Full documentation
- Multiple README.md files in each directory

### v3.3 — Sync & Freshness Tracking 🔄
**Backup timestamp tracking and reminder system!**

**Features:**
- 📅 **Last backup timestamp** stored in localStorage (`cpLastBackup`)
- 🕐 **"X days since backup"** displayed in Summary view
- ⚠️ **30-day reminder** — Shows warning if no backup in 30+ days
- 📊 **Enhanced JSON export** with metadata for AI analysis:
  - `version`, `appVersion`, `exported`, `lastBackup`
  - `metadata`: totalCards, totalPoints, totalAnnualFees, owners, banks, dateRange
- 🗓️ **Per-card timestamps**: `createdAt` and `updatedAt` fields
- ✅ **Import preserves backup timestamp** from v3+ backups

**New Functions:**
- `getLastBackupDate()` — Returns ISO timestamp from localStorage
- `getDaysSinceBackup()` — Calculates days since last backup
- `shouldShowBackupReminder()` — Returns true if >= 30 days or never backed up
- `formatLastBackup()` — Human-readable format ("Today", "Yesterday", "X days ago")

**UI Changes:**
- Summary view shows "☁️ Backup Status" section with:
  - Last backup date (green ✅ if recent, orange ⚠️ if stale)
  - Export/Import buttons
  - "Backup recommended!" warning when needed

**Files changed:**
- `src/js/main.js` — Added backup tracking functions, enhanced exportBackup(), updated renderSummary()

### v3.4 — Perk/Benefit Tracking 🎁
**Period-based benefit tracking with recurring benefits!**

**Features:**
- 🎁 **Add benefits to cards** with amount and recurrence type (monthly, quarterly, semi-annual, annual)
- 📊 **Period-based tracking** — Click period boxes to mark as used (green) or unused
- 🗓️ **Period labels** — Jan-Dec for monthly, Q1-Q4 for quarterly, H1/H2 for semi-annual, Year for annual
- 💰 **$used/$total summary** — Shows how much of benefit has been used in current cycle
- 🔄 **Auto-recurrence** — Benefits track usage per period automatically
- ➕ **Add/Edit benefits** in card form with amount and recurrence dropdown
- 🔁 **Reset to Defaults button** in Summary view to clear all benefit usage
- 🔄 **Auto-migration** from old coupon format to new benefits system
- ✅ **35 new tests** covering all benefit functionality

**New Functions:**
- `getPeriodLabels(recurrence)` — Returns labels for recurrence type (monthly, quarterly, etc.)
- `getPeriodKey(recurrence, idx)` — Returns unique key for period (e.g., "month_0" for Jan)
- `initializeBenefitPeriods(benefit)` — Creates periods object for new benefit
- `getBenefitUsedTotal(benefit)` — Returns {used: X, total: Y} for current period
- `toggleBenefitPeriod(cardId, benefitIdx, periodKey)` — Marks period as used/unused
- `renderBenefitRows()` — Renders benefit input rows in Add Card form
- `addBenefitRow()` — Adds new benefit row dynamically
- `removeBenefitRow(idx)` — Removes benefit row
- `getBenefits()` — Collects benefit data from form

**Data Model Update:**
```javascript
benefits: [
  {
    name: "$300 Travel Credit",
    amount: 300,
    recurrence: "annual",
    periods: {
      "year_0": { used: true, claimed: 300 },
      "year_1": { used: false, claimed: 0 }
    }
  }
]
```

**UI Changes:**
- Card form includes benefit section with rows showing: [Amount $] [Recurrence ▼] [Delete]
- Card detail modal shows benefit summary: "💰 Benefits: $1,500 claimed / $2,000 total"
- Coupons view displays clickable period boxes for each benefit
- Click period to toggle used/unused (visual indicator: green = used, gray = unused)
- Summary view "Reset to Defaults" button clears all benefit usage periods

**Files changed:**
- `src/js/main.js` — Added benefit functions, updated card model, saveCard(), renderCards(), openDetail()
- `src/styles/components.css` — Added benefit input styles, period box styles
- `src/index.html` — Added benefit section to form

**Migration:**
- Existing coupons automatically converted to benefits on import/load
- Preserves backward compatibility with older card backups

### v3.2 — Design System & Auto Dark Mode 🎨
**Comprehensive CSS variables system with automatic dark mode!**

**Features:**
- 🎨 **50+ CSS variables** for colors, spacing, typography, shadows, transitions
- 🌙 **Auto dark mode** via `prefers-color-scheme` — follows system preference
- 📐 **Standardized spacing** — 7-step scale (4px → 32px)
- 🔘 **Consistent border-radius** — 5 tokens (sm, md, lg, xl, full)
- 🔤 **Typography scale** — 8 font sizes, 4 weights
- 📚 **Design System docs** — `docs/DESIGN_SYSTEM.md` for future reference

**CSS Reduction:**
- `themes.css`: 8.5KB → 4.3KB (49% smaller)
- `base.css`: 1.2KB → 6.5KB (expanded with variables)
- `components.css`: Refactored to use variables
- **Total build**: 112KB → 108KB (4KB saved)

**Files changed:**
- `src/styles/base.css` — Complete rewrite with design tokens
- `src/styles/themes.css` — Simplified, uses variables
- `src/styles/components.css` — Refactored with variables
- `docs/DESIGN_SYSTEM.md` — NEW comprehensive documentation

### v3.1 — Card Open Date & 5/24 Tracking 📅
**Track when cards were opened and monitor Chase 5/24 status!**

**Features:**
- 📅 Added `openDate` field to card data model (ISO date string, optional)
- 📝 Open Date input in Add/Edit Card form (date picker)
- 📊 Card age calculation (years/months since opened)
- 🎂 Next anniversary tracking for each card
- 📈 **5/24 Tracker** on Summary dashboard:
  - Shows cards opened in last 24 months per owner
  - Green checkmark (✅) if under 5/24
  - Red warning (⚠️) if at 5/24 or over
  - Combined status across all owners
- 📋 Detailed list of recent cards (opened in 24 months) in 5/24 section
- 💳 Card Detail Modal shows card age and next anniversary
- 🔄 Backwards compatible — existing cards work without openDate
- ✅ Import/export handles openDate field

**Helper Functions Added:**
- `getCardAge(openDate)` — Returns {years, months} object
- `formatCardAge(openDate)` — Returns human-readable age string (e.g., "1y 3m")
- `getNextAnniversaryDate(openDate)` — Returns next anniversary Date
- `get524Status(cardList, owner)` — Returns {count, cards, under524} for owner
- `render524Section()` — Renders 5/24 status section in Summary

**Visual Design:**
```
📊 5/24 Status
┌─────────────────────────────────────────┐
│ 3/24 ✅  │  2/24 ✅  │  5/24 Combined  │
│   Me     │   Wife    │    (5/24) ✅    │
└─────────────────────────────────────────┘
📋 Cards opened in last 24 months:
  • Chase Sapphire (Mar 2024)
  • Amex Gold (Jan 2024)
```

**Files changed:**
- `src/index.html` — Added Open Date input field to form
- `src/js/main.js` — Data model, helper functions, renderSummary(), openEditModal(), saveCard()
- Build successful (112KB)

### v3.0 — Annual Fee Tracking 💰
**Track annual fees for each card and see totals by owner!**

**Features:**
- 💳 Added `annualFee` field to card data model (default 0 for no fee)
- 📝 Annual Fee input in Add/Edit Card form (number input with $ prefix)
- 📊 Annual Fees section on Summary dashboard
- 🎯 Helper functions for calculating fees by owner
- 💳 Card Detail Modal shows annual fee
- 🔄 Backwards compatible — existing cards default to $0 fee
- ✅ Import/export handles annualFee field

---

## 🔄 Next Up (v3.6+)

### v3.6 — Points Value Calculator 💰
- [ ] Calculate redemption value (points × cents-per-point)
- [ ] Track best-use scenarios for each card
- [ ] Point valuation database (United = 1.2cpp, Hyatt = 1.8cpp, etc.)
- [ ] "Should I use this card?" recommendations based on category
- [ ] Estimated total portfolio value across all cards

### v3.7 — Push Notifications & Smart Reminders 📱
- [ ] Browser push notifications for expiring benefits
- [ ] Notification scheduling based on days-remaining
- [ ] Configurable notification preferences (which benefits, how many days notice)
- [ ] Snooze/dismiss functionality for individual benefits
- [ ] Daily digest notifications

### v3.8 — Spending Tracker 📊
- [ ] Log spending by category per month
- [ ] Monthly spending analytics and trends
- [ ] See which cards give most value based on actual spending
- [ ] Budget insights and recommendations
- [ ] "You should use [Card X] for [Category]" suggestions

### v3.9 — Multi-Device Sync ☁️
- [ ] Real cloud sync (not just backup/restore)
- [ ] Automatic conflict resolution
- [ ] Works across iPhone, iPad, Mac
- [ ] Real-time updates across devices

### Future Ideas 💡
- [ ] Referral bonus tracker
- [ ] Card application timeline & reminder
- [ ] Retention offer tracker
- [ ] Authorized user management

---

## 🐛 Known Bugs

- [x] ~~**CRITICAL**: Edit card creates new card instead of updating (v2.0 regression)~~ **FIXED v2.2.1**
  - Root cause: `openEditModal()` set `editingCardId` before calling `openAddModal()`, which reset it to null
  - Fix: Move `editingCardId = id` assignment AFTER `openAddModal()` call

---

## ✅ Recently Completed

### v3.0 — Annual Fee Tracking 💰
**Track annual fees for each card and see totals by owner!**

**Features:**
- 💳 Added `annualFee` field to card data model (default 0 for no fee)
- 📝 Annual Fee input in Add/Edit Card form (number input with $ prefix)
- 📊 Annual Fees section on Summary dashboard showing:
  - Total annual fees across all cards (large display, orange formatting)
  - My fees vs Wife's fees side-by-side (black text)
  - Optional: Shared card fees breakdown
  - Currency formatting with commas ($1,550 for large amounts)
- 🎯 Helper functions:
  - `getTotalAnnualFees(cards, owner)` — Calculate fees by owner
  - `getMyAnnualFees()` — Shortcut for Me
  - `getWifeAnnualFees()` — Shortcut for Wife
  - `getSharedAnnualFees()` — Shortcut for Shared
- 💳 Card Detail Modal shows annual fee:
  - Green "No fee" for $0 annual fees
  - Orange/neutral for cards with fees
- 🔄 Backwards compatible — existing cards default to $0 fee
- ✅ Updated DEFAULTS with realistic annual fees
- ✅ Import/export handles annualFee field

**Visual Design:**
```
💳 Annual Fees
┌─────────────────────────────────┐
│ $1,495 │ $550 │ $945 │ $0      │
│  Total │ Mine │ Wife │ Shared  │
└─────────────────────────────────┘
```

**Files changed:**
- `src/index.html` — Added Annual Fee input field to form
- `src/js/main.js` — Updated data model, saveCard(), openEditModal(), loadCards(), importBackup(), helper functions, renderSummary()
- Build successful, no CSS changes needed (inline styles used for summary)

---

### v2.2.3 — Comprehensive Test Suite Expansion 🧪
**Added 50+ new unit tests and added Perk Tracking to roadmap!**

**New Unit Tests (39 new tests):**
- **Search Functionality** (18 tests) — Search by name, bank, perks, partners, coupons
- **Point History** (6 tests) — Earned/spent tracking, timestamps, ordering
- **Data Validation** (10 tests) — Required fields, invalid data, edge cases
- **Backup/Restore** (6 tests) — JSON export/import, data integrity
- **Edge Cases** (10 tests) — Zero points, large values, special characters, emoji

**Test Fixes:**
- Fixed 3 test assertions with incorrect expectations
- All 148 tests now passing (94 unit + 24 DOM + 30 E2E)

**Roadmap Addition:**
- Added **v3.3 — Perk/Benefit Tracking** to roadmap
- Supports recurring perks (monthly, quarterly, semi-annual, annual)
- Track used/unused perks with auto-reset

---

### v2.2.2 — Project Reorganization & Documentation Overhaul 📚✨
**Clean project structure with comprehensive documentation and test suite improvements!**

**Changes Made:**

**📁 Directory Cleanup:**
- Removed obsolete files: `CODE_CHANGES.md`, `DEPLOY_READY.md`, empty `backups/` folder
- Cleaned up test directory (removed 7 redundant docs files)
- Renamed `tests/run-dom-tests.sh` → `tests/run-tests.sh`
- Archived old releases to `releases/archive/`

**📝 New Documentation:**
- **README.md** (root) — Project overview, quick start, features summary
- **tests/README.md** — How to run tests, coverage matrix, critical regression tests
- **docs/TESTING.md** — Complete testing guide with framework architecture and patterns

**📚 Updated Documentation:**
- **CLAUDE.md** — Updated version to v2.2.1, added test suite info, expanded roadmap
- **docs/DEV_LOG.md** — This file (v2.2.2 entry)

**✨ Structure Improvements:**
- Single README at root for orientation
- Organized docs/ folder with ARCHITECTURE, DEV_LOG, TESTING
- Clean tests/ folder with own README
- All obsolete files removed

**Test Suite Summary:**
- ✅ 24 DOM tests (UI interactions)
- ✅ 30 E2E tests (user workflows)
- ✅ 55 unit tests (logic & data)
- ✅ Total: 109 passing tests

**Project Status:**
- ✅ Clean, well-organized structure
- ✅ Comprehensive documentation for developers and AI assistants
- ✅ Robust test coverage prevents regressions
- ✅ Ready for feature development (v2.3+)

**Files changed:**
- Deleted: CODE_CHANGES.md, DEPLOY_READY.md, 7 test doc files
- Created: README.md, tests/README.md, docs/TESTING.md
- Updated: CLAUDE.md, DEV_LOG.md
- Renamed: run-dom-tests.sh → run-tests.sh
- Moved: Old releases to archive/

---

### v2.2.1 — E2E Test Suite & Bug Fixes 🧪🐛
**Comprehensive end-to-end tests + critical bug fix!**

**E2E Test Suite (`tests/e2e-tests.html`):**
- 35+ E2E tests covering complete workflows
- Tests organized by category:
  - **Card CRUD** (6 tests): Create, read, update, delete
  - **Edit Flow** (4 tests): Critical regression tests for edit bug
  - **Data Persistence** (3 tests): Save/load from storage
  - **Backup & Restore** (5 tests): Export/import roundtrip
  - **Filtering & Sorting** (7 tests): All filter combinations
  - **Partner Emoji** (2 tests): Airline vs hotel detection
  - **Validation** (4 tests): Card validation rules
  - **Perk Handling** (3 tests): Category extraction, chip parsing

**Bug Fixed:**
- **CRITICAL**: Edit card was creating new cards instead of updating
- Root cause: `editingCardId` was set before `openAddModal()` which reset it
- Fix: Reordered to set `editingCardId` AFTER `openAddModal()`

**Files changed:**
- `src/js/main.js` — Fixed `openEditModal()` function order
- `tests/e2e-tests.html` — NEW comprehensive E2E test suite

**Run E2E tests:**
```bash
open tests/e2e-tests.html
```

---

### v2.2 — Miles View Partner Filter ✈️ & Perk Tags Bug Fix 🐛
**Filter cards by transfer partner on the Miles page!**

**Features:**
- Dropdown filter on Miles view shows all transfer partners
- Select a partner (e.g., "United") to see only cards that transfer to that partner
- Shows each card's transfer ratio and estimated miles for that partner
- Filter switches automatically between Category (Cards view) and Partner (Miles view)
- "All Partners" option to show all cards
- ✈️ emoji for airline partners, 🏨 emoji for hotel partners

**Key Functions Added:**
- `currentPartnerFilter` — State variable for partner filter
- `filterByPartner(partner)` — Sets partner filter and re-renders
- `populatePartnerFilter()` — Populates dropdown with all transfer partners
- `getCardsFilteredByPartner(list)` — Filters cards by selected partner
- `updateFilterDropdownHandler(type)` — Switches dropdown handler based on view
- `getPartnerEmoji(partnerName)` — Returns ✈️ for airlines, 🏨 for hotels
- `HOTEL_PARTNERS` — Array of hotel keywords for detection

**UI Improvements:**
- Filter dropdowns now stacked vertically (full width each row)
- Better layout that fits within app boundaries

**Bug Fixed - Perk Tags:**
- Fixed bug where "×" from remove button was being saved with perk text
- `renderPerkTags()` now stores perk in `data-perk` attribute
- `getPerks()` now reads from `dataset.perk` instead of `textContent`

**Files changed:**
- `src/js/main.js` — Added partner filter state, functions, emoji detection, modified renderAll()
- `tests/test-runner.html` — Added 6 partner filter tests + 2 emoji detection tests

**Tests added (6):**
- Filter by United returns cards with United partner
- Filter by Delta returns cards with Delta partner
- Filter by empty string returns ALL cards
- Filter by null returns ALL cards
- Filter by non-existent partner returns empty
- Get all unique partners from cards

---

### v2.1.1 — Bug Fix + Test Suite 🐛🧪
**Fixed category filter reset bug + added automated tests!**

**Bug Fixed:**
- Category filter "All Categories" now correctly resets the view
- Root cause: `populateCategoryFilter()` rebuilt the dropdown but didn't restore the selected value
- Fix: Added `select.value = currentCategoryFilter;` after rebuilding

**Test Suite Added:**
- New `tests/test-runner.html` — browser-based test runner
- 22 automated tests covering:
  - Category filter (6 tests)
  - Card sorting (5 tests)
  - Owner filter (3 tests)
  - Category extraction (4 tests)
  - Category normalization (4 tests)
  - Combined filters (3 tests)

**Files changed:**
- `src/js/main.js` — Fixed `populateCategoryFilter()` to restore selected value
- `tests/test-runner.html` — NEW test suite

**To run tests:**
```bash
open tests/test-runner.html
```

---

### v2.1 — Card Sorting 🔢
**Sort your cards by different criteria!**

**Features:**
- Sort dropdown next to category filter
- Four sort options:
  - **Recently Added** (default) — newest cards first
  - **Points (High→Low)** — highest balances first
  - **Due Date (Soon→Later)** — upcoming statements first
  - **Name (A→Z)** — alphabetical order
- Works with category filter and owner tabs
- Selection persists until changed

**Key Functions Added:**
- `currentSort` — State variable for sort order
- `setSortOrder(order)` — Sets sort and re-renders
- `sortCards(list)` — Sorts card array by current criteria
- `populateSortFilter()` — Populates sort dropdown

**Files changed:**
- `src/index.html` — Added sort dropdown next to category filter
- `src/js/main.js` — Added sort state, functions, integrated into renderAll()

---

### v2.0 — Edit Existing Cards ✏️
**Full edit support for updating card details!**

**Features:**
- ✏️ Edit button in card detail modal (next to delete)
- Reuses existing Add Card modal (no duplication)
- Modal title changes to "Edit Card" when editing
- All fields pre-populated with existing card data
- Preserves card history (point log entries don't get wiped)
- Custom banks work seamlessly in edit mode
- Updates existing card ID instead of creating duplicate

**How it works:**
1. Open any card detail → tap ✏️ Edit button
2. All fields populate with current data (perks, partners, coupons, etc.)
3. Make changes as needed
4. Tap "Save Card" to update (existing card is updated in place)
5. History preserved, ID unchanged

**Key Implementation:**
- Added global `editingCardId` variable to track edit mode
- `openEditModal(id)` function loads card data and opens Add modal in edit mode
- Modified `openAddModal()` to reset edit mode and modal title
- Modified `saveCard()` to check `editingCardId`:
  - If set: update existing card (preserve history)
  - If null: create new card (existing behavior)
- Edit button added to detail modal header alongside delete button

**Edge cases handled:**
- Custom banks: Detects if bank is in predefined list or custom, populates correctly
- Perks: Uses `renderPerkTags()` to load existing perks as editable chips
- Partners: Uses `renderRedeemRows()` to load existing transfer partners
- Coupons: Joins array back to comma-separated format for form input
- Point history: Explicitly NOT overwritten during edit

**Files changed:**
- `src/js/main.js` — Added editingCardId variable, openEditModal() function, updated openAddModal() and saveCard()
- Detail modal header updated with edit button

---

### v1.9 — Custom Banks & Editable Categories 🏦🏷️
**Flexibility for any card and any earning structure!**

**Custom Bank Name:**
- Added "Other" option to bank picker grid (gray "..." badge)
- When selected, shows text input for custom bank name
- Custom banks display with neutral gray styling in card tiles
- Works seamlessly with autofill system

**Editable Earning Categories:**
- Replaced read-only perks textarea with interactive chip system
- Each perk displays as a colored, removable chip (e.g., `[3x Dining ×]`)
- Add new categories via input field + "Add" button (or Enter key)
- Autofill still works — populates editable chips that user can modify
- Chips use existing category color system (green=dining, blue=travel, etc.)

**Key Functions Added:**
- `selectBank(name)` — Handles bank selection including "Other"
- `updateCustomBank()` — Syncs custom bank input with form
- `renderPerkTags(perks)` — Renders editable perk chips
- `addPerk()` — Adds new perk from input
- `removePerk(idx)` — Removes perk by index
- `getPerks()` — Collects all perks from chips

**Files changed:**
- `src/index.html` — Added custom bank input wrapper, perk chips container + input
- `src/js/main.js` — Bank selection logic, perk chip functions, updated autofillCard() and saveCard()
- `src/styles/components.css` — Added .perk-chip styles with color variants and remove button

**Visual:**
```
Bank Picker:
┌──────┐ ┌──────┐ ┌──────┐ ┌──────────┐
│ Chase│ │ Amex │ │ Citi │ │ ... Other│ ← NEW
└──────┘ └──────┘ └──────┘ └──────────┘
[Custom Bank Name: _______________]    ← Shows when Other selected

Reward Categories:
┌─────────────────────────────────────────────────────┐
│ [🟢 3x Dining ×] [🔵 3x Travel ×] [⚪ 1.5x Everything ×] │
│ [_______________] [+ Add]                            │
└─────────────────────────────────────────────────────┘
```

---

### v1.8 — Category-Based Tag Colors & Filter 🎨
**Color-coded earning categories + smart category filtering!**

**Features:**
- Tags colored by category (Dining=green, Travel=blue, Hotels=purple, etc.)
- Dynamic color assignment for new/unknown categories using DYNAMIC_COLORS array
- Category filter dropdown to find cards by earning category
- Cards sorted by earning rate when filtered (highest first)
- Category aliases normalize variations (e.g., "Dining worldwide" = "Dining")
- Tags sorted by earning rate (highest first) on card tiles and detail view
- Earning rates displayed on card tiles, other perks in detail view

**Key Constants & Functions:**
- `CATEGORY_COLORS` — Maps category keywords to color names (green, blue, purple, etc.)
- `CATEGORY_ALIASES` — Normalizes category variations to standard names
- `DYNAMIC_COLORS` — Fallback colors for unknown categories (rotated)
- `extractCategory(perk)` — Extracts category from "3x Dining" format
- `normalizeCategory(cat)` — Converts raw category to standard name
- `getCategoryColor(perk)` — Returns color for a perk's category
- `filterByCategory(category)` — Sets filter and re-renders
- `getCardsFilteredByCategory(list)` — Filters and sorts by rate
- `getEarningRateForCategory(card, category)` — Gets rate for specific category
- `populateCategoryFilter()` — Populates dropdown with available categories

**Visual:**
```
┌─────────────────────────────────────────┐
│ 💳 Chase Sapphire Reserve               │
│ Chase · Me                              │
│ 🟢 3x Dining  🔵 3x Travel  🟣 1.5x     │ ← Color-coded!
│                               85,000 pts│
│ [Category Filter ▼ All Categories]      │ ← NEW!
└─────────────────────────────────────────┘
```

**Files changed:**
- `src/js/main.js` — Added CATEGORY_COLORS, CATEGORY_ALIASES, extract/normalize/getCategoryColor functions, category filter functions, updated renderCards() and openDetail()
- `src/styles/components.css` — Added .tag-{color} styles for green, blue, purple, red, pink, teal, gray

---

### v1.7 — Per-Partner Transfer Ratios 🎯
**Each transfer partner now has its own ratio!**

**Features:**
- Dynamic editable partner rows in Add Card modal
- Individual ratio per partner (e.g., EVA Air 2:1.5, Marriott 1:1)
- Supports decimal ratios: 1:0.75, 2:1.5, 5:3, etc.
- Estimated miles calculated per partner's own ratio
- Add/remove partners when creating or editing cards

**Capital One partners updated with accurate ratios:**
- 1:1: Aeromexico, Air Canada, Avianca, British Airways, Cathay Pacific, Etihad, Finnair, Flying Blue, Qantas, Qatar, Singapore, TAP, Turkish, Virgin Red
- 2:1.5: Emirates, EVA Air, JAL
- 5:3: JetBlue
- Hotels: Choice/Wyndham 1:1, I Prefer 1:2, Accor 2:1

**Files changed:**
- `src/index.html` — New dynamic partner container
- `src/styles/components.css` — Redeem row grid styles
- `src/js/main.js` — New functions: renderRedeemRows(), addRedeemRow(), removeRedeemRow(), getRedeemRows() + updated CARD_DB

---

## 📁 File Locations

| Purpose | Path |
|---------|------|
| Source files | `~/Desktop/CardPointsTracker/src/` |
| Build script | `~/Desktop/CardPointsTracker/build/build.sh` |
| Built output | `~/Desktop/CardPointsTracker/dist/` |
| Old releases | `~/Desktop/CardPointsTracker/releases/` |

## 🛠️ Development Workflow

```bash
# Edit source files in src/
# Then build:
./build/build.sh

# Output: dist/CardPointsTracker.html
# Open in browser to test!
```
