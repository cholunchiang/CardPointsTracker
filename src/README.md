# 📦 CardPointsTracker Source Code

This directory contains the source code for CardPointsTracker.

## Structure

```
src/
├── index.html                # HTML template
├── js/
│   └── main.js               # ALL application logic (~48KB)
└── styles/
    └── components.css        # UI styles (~21KB)
```

## Files

### index.html
HTML template that defines the page structure:
- Modal dialogs (Add Card, Card Detail, Backup)
- Tab navigation (Cards, Miles, Coupons)
- Form elements (inputs, dropdowns, buttons)
- Card containers and filter controls

The build script inlines styles and JavaScript into this template.

### js/main.js
Complete application logic in vanilla JavaScript (~48KB):

**State Management:**
- `app` object — Global state (cards array, current filters, current view)
- `editingCardId` — Tracks when editing vs. creating new card
- `currentSort`, `currentCategoryFilter`, `currentOwnerFilter`, `currentPartnerFilter` — UI state

**Key Functions:**
- `renderAll()` — Main re-render function, called after any state change
- `renderCards()`, `renderMiles()`, `renderCoupons()` — Render each tab
- `openDetail()` — Open card detail modal with all card info
- `openAddModal()`, `openEditModal()` — Card creation/editing
- `saveCard()` — Persist card to state and localStorage
- `deleteCard()` — Remove card from state
- `addTestCard()` — For testing

**Helper Functions:**
- Category system: `extractCategory()`, `normalizeCategory()`, `getCategoryColor()`
- Card sorting: `sortCards()`, `setSortOrder()`
- Filtering: `filterByCategory()`, `filterByPartner()`, `filterByOwner()`
- DOM: `click()`, `fill()`, `getText()`, `getElement()`, etc.
- Storage: `saveCards()`, `loadCards()`, `backupToFile()`, `restoreFromFile()`

**Event Listeners:**
- Button clicks (Add, Edit, Delete, Save, Cancel)
- Tab switches (Cards, Miles, Coupons)
- Filter changes (Owner, Category, Partner, Sort)
- Form input (Card name, points, perks, partners, coupons)
- Modal open/close

### styles/components.css
Styling for the entire app (~21KB):

**CSS Classes:**
- `.card-tile` — Card in list view
- `.modal` — Modal dialog container
- `.form-group` — Form field wrapper
- `.button` — Button styling
- `.tag`, `.tag-green`, `.tag-blue`, etc. — Category tags with colors
- `.owner-chip`, `.bank-chip` — Owner and bank badges
- `.redeem-row` — Transfer partner row
- `.tab-content` — Tab panel content

**Theme:**
- Light and dark mode support
- Color system for categories (green, blue, purple, red, etc.)
- Responsive layout for mobile and desktop

## Development

### Adding a Feature

1. **Understand the current flow:**
   ```bash
   # Find where feature fits
   grep -n "PATTERN" /Users/cholunchiang/Desktop/CardPointsTracker/src/js/main.js
   ```

2. **Implement in main.js:**
   - Add state variables if needed
   - Add functions to handle logic
   - Add event listeners for user interaction
   - Update `renderAll()` if UI needs to change

3. **Add styles if needed:**
   - Edit `styles/components.css`
   - Follow existing class naming conventions
   - Test in both light and dark mode

4. **Update HTML if needed:**
   - Add new elements to `index.html`
   - Use semantic class names for styling

5. **Build and test:**
   ```bash
   bash /Users/cholunchiang/Desktop/CardPointsTracker/build/build.sh
   open /Users/cholunchiang/Desktop/CardPointsTracker/dist/CardPointsTracker.html
   ```

### Code Patterns

**Creating a new function:**
```javascript
// State variable
let myNewFeature = null;

// Initialize/reset function
function initMyFeature() {
  myNewFeature = null;
  renderAll(); // Re-render UI
}

// Action function
function doMyFeature(value) {
  myNewFeature = value;
  saveCards(); // If persisting
  renderAll(); // Update UI
}

// Render function
function renderMyFeature() {
  const container = document.getElementById('my-feature-container');
  if (!myNewFeature) {
    container.innerHTML = '<p>No data</p>';
    return;
  }
  container.innerHTML = `<p>${myNewFeature}</p>`;
}

// Event listener
document.getElementById('my-feature-btn').addEventListener('click', () => {
  doMyFeature('new value');
});
```

**Adding to renderAll():**
```javascript
function renderAll() {
  const view = getCurrentView(); // 'cards', 'miles', 'coupons'
  
  if (view === 'cards') {
    renderCards();
    renderMyFeature(); // Add here
  } else if (view === 'miles') {
    renderMiles();
  } else if (view === 'coupons') {
    renderCoupons();
  }
}
```

## Build Process

The build script (`build/build.sh`) combines these files into a single HTML output:

```bash
bash /Users/cholunchiang/Desktop/CardPointsTracker/build/build.sh
```

This creates: `dist/CardPointsTracker.html` (~87KB)

The output file contains:
- All HTML (inlined from index.html)
- All CSS (inlined from styles/components.css)
- All JavaScript (inlined from js/main.js)
- No external dependencies

## Testing

Test files can reference the source or built output:

```bash
# DOM tests (test against embedded app)
open tests/dom-tests.html

# Unit tests
open tests/test-runner.html

# E2E tests
open tests/e2e-tests.html
```

## Tips

- **Don't edit dist/CardPointsTracker.html directly** — It's generated. Edit src/ files instead.
- **Always rebuild after changes** — `bash build/build.sh`
- **Check main.js for similar code** — Before writing new functions, search for similar patterns
- **Keep CSS classes consistent** — Follow existing naming conventions
- **Use const and let, not var** — Modern JavaScript practices
- **Test with localStorage cleared** — `localStorage.clear()` in DevTools console

---

See [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) for detailed technical documentation.
