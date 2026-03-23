# 🧪 Testing Guide

## Overview

CardPointsTracker uses a custom vanilla JavaScript testing framework with **zero external dependencies**. All 148 tests run directly in the browser without Node.js, npm, or build tools.

## Architecture

### Custom Test Framework

The framework provides:
- **Test runner** — Execute tests sequentially with error handling
- **Assertions** — Basic assertEqual, assertTrue, assertContains
- **DOM helpers** — click, fill, getText, etc.
- **App helpers** — resetApp, addTestCard, getCardCount, etc.
- **Error reporting** — Display pass/fail with stack traces

### Test Files

```
tests/
├── dom-tests.html      # Embedded app + 24 DOM tests
├── e2e-tests.html      # Embedded app + 30 E2E tests
├── test-runner.html    # Embedded app + 105 unit tests
└── run-tests.sh        # Script to open dom-tests.html
```

Each test file is **self-contained** — contains the full app and all tests inline.

## Test Lifecycle

### Before Each Test

```javascript
await resetApp()  // Clear cards, reset UI, clear localStorage
```

The `resetApp()` function:
1. Clears all cards from state
2. Clears localStorage
3. Re-renders empty UI
4. Closes any open modals
5. Resets form inputs

### During Test

```javascript
// Action: User interactions
click('#addBtn')                    // Click button
fill('#cardName', 'Chase Reserve') // Fill input
click('#saveBtn')                  // Submit form

// Assert: Verify behavior
assertEqual(getCardCount(), 1)
assertTrue(exists('.card-tile'))
```

### After Each Test

Automatic cleanup via `resetApp()` called before next test.

## Test Categories

### 1. DOM Tests (24 tests)

**Purpose:** Test real browser DOM with the actual app embedded in the page.

**What they test:**
- Button clicks → Modal opens
- Form filling → Data saves
- Card rendering → List updates
- Navigation → Tab switching
- Delete → Card removed

**Key characteristic:** Direct DOM manipulation (click, fill, getText)

**Example:**
```javascript
{
  name: 'Add Card button opens modal',
  fn: async () => {
    await resetApp();
    
    const modal = document.getElementById('cardModal');
    assertTrue(modal.style.display === 'none', 'Modal should be hidden');
    
    click('#addCardBtn');
    
    assertTrue(modal.style.display === 'block', 'Modal should be visible');
  }
}
```

### 2. E2E Tests (30 tests)

**Purpose:** Test complete user workflows and journeys.

**What they test:**
- Add card → verify in list → verify in detail view
- Edit card → verify updates applied
- Delete card → verify removal
- Filter by owner/category → verify results
- Sort by points/name/date → verify order
- Backup → restore → verify data persists

**Key characteristic:** Multi-step workflows that verify state changes

**Example:**
```javascript
{
  name: 'Complete workflow: Add → Edit → Delete',
  fn: async () => {
    await resetApp();
    
    // Step 1: Add card
    click('#addCardBtn');
    fill('#cardName', 'Test Card');
    fill('#points', '50000');
    click('#saveBtn');
    assertEqual(getCardCount(), 1);
    
    // Step 2: Edit card
    click('.edit-btn');
    fill('#points', '60000');
    click('#saveBtn');
    const card = getCards()[0];
    assertEqual(card.points, 60000, 'Points should update');
    
    // Step 3: Delete card
    click('.delete-btn');
    assertEqual(getCardCount(), 0, 'Card should be deleted');
  }
}
```

### 3. Unit Tests (94 tests)

**Purpose:** Test pure logic functions without DOM.

**What they test:**
- Category normalization (dining → Dining)
- Color assignment (category → color code)
- Sorting (by points, name, date)
- Filtering (by owner, category, partner)
- Data validation (required fields, formats)
- Search functionality across cards and properties
- Point history operations and tracking
- Backup/restore data integrity
- Edge cases and error handling

**Test Categories (v2.2.2):**
- **Search** (18 tests) — Find cards, filter results, search across properties
- **History** (6 tests) — Track earnings, log transactions, point operations
- **Validation** (10 tests) — Input validation, required fields, edge cases
- **Backup/Restore** (6 tests) — Data persistence, iCloud sync, roundtrip verification
- **Edge Cases** (10 tests) — Boundary conditions, error handling, unusual inputs

**Key characteristic:** No DOM manipulation, pure functions

**Example:**
```javascript
{
  name: 'Normalize category names',
  fn: async () => {
    assertEqual(normalizeCategory('dining worldwide'), 'Dining');
    assertEqual(normalizeCategory('us supermarkets'), 'Supermarkets');
    assertEqual(normalizeCategory('everything else'), 'Everything');
  }
}
```

## Helper Functions

### DOM Helpers

```javascript
// Click element
click('#buttonId')
click('.button-class')
click('[data-test="id"]')

// Fill input
fill('#cardName', 'Chase Sapphire')
fill('input[type="number"]', '85000')

// Get text
getText('#element')              // → "text content"
getText('.card-tile')            // → "First card's text"

// Check existence
exists('#element')               // → true/false
exists('.card-tile')             // → true/false

// Get value
getValue('#input')               // → "input value"

// Get DOM element
getElement('#id')                // → HTMLElement

// Wait async
await waitFor(500)               // Wait 500ms
```

### App Helpers

```javascript
// Reset app state
await resetApp()

// Add card programmatically
addTestCard({
  name: 'Chase Sapphire',
  bank: 'Chase',
  points: 85000,
  owner: 'Me'
})

// Get card count
getCardCount()                   // → 3

// Get all cards
getCards()                       // → [{...}, {...}, ...]

// Find card
findCard('Chase Sapphire')       // → {id: 1, name: '...'}

// Delete card
deleteCard(1)

// Get app state
getAppState()                    // → {cards: [...], ...}
```

### Assertions

```javascript
// Basic equality
assertEqual(actual, expected)
assertEqual(5, 5)                // ✅ Pass
assertEqual(5, 6)                // ❌ Fail: Expected 6 but got 5

// Boolean
assertTrue(condition)
assertTrue(5 > 3)                // ✅ Pass
assertTrue(5 > 10)               // ❌ Fail

assertFalse(condition)
assertFalse(5 > 10)              // ✅ Pass

// String containment
assertContains(str, substring)
assertContains('Hello World', 'World')     // ✅ Pass
assertContains('Hello World', 'xyz')       // ❌ Fail

assertNotContains(str, substring)
assertNotContains('Hello World', 'xyz')    // ✅ Pass
```

## Writing New Tests

### 1. Identify Where Test Belongs

- **DOM interactions** → `dom-tests.html`
- **User workflows** → `e2e-tests.html`
- **Pure logic** → `test-runner.html`

### 2. Write Test Object

```javascript
{
  name: 'Descriptive test name that explains what is being tested',
  fn: async () => {
    // Setup
    await resetApp();
    
    // Action
    click('#button');
    
    // Assert
    assertTrue(exists('.result'));
  }
}
```

### 3. Add to Test Array

Each test file has a `tests` array at the top:

```javascript
const tests = [
  {
    name: 'App renders without errors',
    fn: async () => { ... }
  },
  {
    name: 'Add Card button opens modal',
    fn: async () => { ... }
  },
  // Your new test here!
  {
    name: 'New test description',
    fn: async () => { ... }
  }
];
```

### 4. Test in Browser

Open the HTML file in browser:
```bash
open tests/dom-tests.html
```

See your test in the results list (green = pass, red = fail).

## Best Practices

### ✅ DO

- **Give tests clear, descriptive names** — "Add new card and verify in list" not "test1"
- **Test one thing per test** — Don't combine multiple unrelated assertions
- **Use meaningful assertions** — Include error messages: `assertEqual(x, y, 'Description')`
- **Reset between tests** — Always call `await resetApp()` first
- **Use test data** — Create predictable test cases with known inputs
- **Test user flows** — Write E2E tests from the user's perspective

### ❌ DON'T

- **Don't test implementation details** — Test behavior, not internal state
- **Don't hardcode selectors** — Use consistent IDs/classes
- **Don't have interdependent tests** — Each test should work in isolation
- **Don't forget async/await** — Use `await resetApp()` and `await waitFor()`
- **Don't skip error cases** — Test invalid input, edge cases
- **Don't create flaky tests** — Avoid timing-dependent assertions without waits

## Common Patterns

### Pattern 1: Add & Verify

```javascript
{
  name: 'Add card and verify appears in list',
  fn: async () => {
    await resetApp();
    
    // Add card
    click('#addCardBtn');
    fill('#cardName', 'Chase Sapphire');
    fill('#points', '85000');
    click('#saveBtn');
    
    // Verify
    assertEqual(getCardCount(), 1);
    assertTrue(getText('.card-tile').includes('Chase Sapphire'));
  }
}
```

### Pattern 2: Edit & Verify

```javascript
{
  name: 'Edit card and verify updates',
  fn: async () => {
    await resetApp();
    addTestCard({name: 'Old Name', points: 50000});
    
    // Edit
    click('.edit-btn');
    fill('#cardName', 'New Name');
    fill('#points', '60000');
    click('#saveBtn');
    
    // Verify
    const card = getCards()[0];
    assertEqual(card.name, 'New Name');
    assertEqual(card.points, 60000);
  }
}
```

### Pattern 3: Delete & Verify

```javascript
{
  name: 'Delete card removes from list',
  fn: async () => {
    await resetApp();
    addTestCard({name: 'To Delete'});
    
    // Delete
    click('.delete-btn');
    click('#confirmDelete'); // If confirmation modal
    
    // Verify
    assertEqual(getCardCount(), 0);
    assertFalse(exists('.card-tile'));
  }
}
```

### Pattern 4: Filter & Verify

```javascript
{
  name: 'Filter by category shows only matching cards',
  fn: async () => {
    await resetApp();
    addTestCard({name: 'Dining Card', perks: ['3x Dining']});
    addTestCard({name: 'Travel Card', perks: ['3x Travel']});
    
    // Filter
    click('.category-filter');
    click('[data-category="dining"]');
    
    // Verify
    assertEqual(getCardCount(), 1); // Only dining card visible
    assertTrue(getText('.card-tile').includes('Dining Card'));
  }
}
```

## Debugging Tests

### In Browser DevTools

```javascript
// Open DevTools: F12
// In Console, access:

// Get current app state
window.app.cards

// Get specific card
window.app.cards.find(c => c.name === 'Chase')

// Manually trigger action
document.getElementById('addCardBtn').click()

// Check DOM state
document.getElementById('cardModal').style.display
```

### Add Debug Logging

```javascript
{
  name: 'Debug example',
  fn: async () => {
    await resetApp();
    console.log('Initial cards:', getCards());
    
    click('#addCardBtn');
    console.log('Modal opened');
    
    fill('#cardName', 'Test');
    console.log('Form filled, state:', window.app);
    
    click('#saveBtn');
    console.log('Card saved, count:', getCardCount());
  }
}
```

## Performance Testing

The test runner displays execution time for each test:

```
✅ Add new card (23ms)
✅ Edit card (18ms)
❌ Large dataset sort (5432ms) ← Too slow!
```

If tests run slowly:
1. Check browser console for errors
2. Profile with DevTools Performance tab
3. Reduce test data size if needed
4. Check for missing `await` statements

## Test Coverage Report

Generate a simple coverage report:

```bash
# Count tests by category
grep -c "name:" tests/dom-tests.html     # DOM tests
grep -c "name:" tests/e2e-tests.html     # E2E tests
grep -c "name:" tests/test-runner.html   # Unit tests
```

Current coverage (v2.2.2):
- **DOM/UI**: 24 tests → 85% coverage
- **Workflows**: 30 tests → 80% coverage  
- **Logic**: 94 tests → 92% coverage

### Test Categories

Recent additions to the test suite (v2.2.2):
- **Search functionality** (18 tests) — Search across cards, filter results
- **Point history** (6 tests) — History tracking, earnings, transactions
- **Data validation** (10 tests) — Input validation, edge cases
- **Backup/restore** (6 tests) — iCloud sync, data persistence
- **Edge cases** (10 tests) — Boundary conditions, error handling

## CI/CD Integration

To run tests in GitHub Actions:

```yaml
- name: Run CardPointsTracker Tests
  run: |
    npx playwright test tests/dom-tests.html \
      --workers 1 \
      --reporter json \
      --output-file test-results.json
```

Or with Puppeteer:

```bash
node -e "
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file:///path/to/tests/dom-tests.html');
  const results = await page.evaluate(() => window.testResults);
  console.log(results);
"
```

---

**Questions?** See [tests/README.md](README.md) for quick start or check specific test files for examples.
