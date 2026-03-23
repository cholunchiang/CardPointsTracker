# 🧪 CardPointsTracker Test Suite

## Overview

CardPointsTracker includes a comprehensive test suite with **148 tests** covering UI, workflows, and logic. All tests run in the browser with zero external dependencies — using a custom vanilla JavaScript testing framework.

## Test Suites

| File | Tests | Type | Description |
|------|-------|------|-------------|
| **dom-tests.html** | 24 | DOM/UI | Real browser DOM interactions, button clicks, form filling |
| **e2e-tests.html** | 30 | E2E | End-to-end user workflows (add → edit → delete) |
| **test-runner.html** | 94 | Unit | Logic & data operations, sorting, filtering, validation |

**Total: 148 tests**

## Quick Start

### Option 1: Browser (Recommended) 🌐

Open any test file directly in your browser:

```bash
# Most comprehensive - start here!
open tests/dom-tests.html

# Unit tests for logic
open tests/test-runner.html

# End-to-end workflows
open tests/e2e-tests.html
```

Each page shows:
- ✅ Passed tests (green)
- ❌ Failed tests (red with error details)
- ⏱️ Execution time
- 📊 Summary (X/Y tests passed)

### Option 2: Script

```bash
bash tests/run-tests.sh
```

This opens `dom-tests.html` in your default browser.

## Test Coverage

| Area | Coverage | Status |
|------|----------|--------|
| App Initialization | ✅ 100% | Stable |
| Navigation (tabs/views) | ✅ 100% | Stable |
| Card CRUD (Create/Read/Update/Delete) | ✅ 90% | Stable |
| Modal dialogs (open/close) | ✅ 85% | Stable |
| Filtering & Sorting | ✅ 85% | Enhanced |
| Search functionality | ✅ 90% | Enhanced in v2.2.2 |
| Point history tracking | ✅ 90% | Enhanced in v2.2.2 |
| Data validation | ✅ 90% | Enhanced in v2.2.2 |
| Backup/restore operations | ✅ 90% | Enhanced in v2.2.2 |
| Edge cases & error handling | ✅ 90% | Enhanced in v2.2.2 |

## Critical Regression Tests

These tests prevent known bugs from returning:

✅ **"Add new card creates one entry (not duplicate)"**
- Prevents: Card appearing twice after save
- Location: dom-tests.html

✅ **"Edit card updates existing, does NOT duplicate"**
- Prevents: Duplicating cards when editing
- Location: dom-tests.html

✅ **"Card ID preserved after edit"**
- Prevents: Lost ID references after edits
- Location: dom-tests.html

✅ **"Point history preserved during edit"**
- Prevents: Losing transaction history on update
- Location: dom-tests.html

✅ **"Filter by category works correctly"**
- Prevents: Incorrect filtering logic
- Location: dom-tests.html

## Test Results

### DOM Tests (24 tests)
```
✅ App renders without errors
✅ Add Card button opens modal
✅ Card form validates input
✅ Saving card updates DOM
✅ Edit Card button appears on card tiles
✅ Delete button removes card
✅ Navigation tabs switch views
✅ ... and 16 more
```

### Unit Tests (~105 tests)
```
✅ Category normalization (5 tests)
✅ Color assignment (8 tests)
✅ Sorting algorithms (12 tests)
✅ Filter logic (15 tests)
✅ Data validation (10 tests)
✅ Search functionality (18 tests)
✅ Point history operations (6 tests)
✅ Backup/restore workflow (6 tests)
✅ Edge cases & error handling (10 tests)
✅ ... and more
```

### E2E Tests (30 tests)
```
✅ Add card → verify in list
✅ Edit card → verify updates
✅ Delete card → verify removal
✅ Filter by owner (Me/Wife/Shared)
✅ Filter by category
✅ Sort by points/name/due date
✅ Backup → restore workflow
✅ ... and more
```

## Writing New Tests

### Basic Test Structure

```javascript
{
  name: 'Descriptive test name',
  fn: async () => {
    // Setup
    await resetApp();
    
    // Action
    click('#addBtn');
    fill('#cardName', 'Test Card');
    click('#saveBtn');
    
    // Assert
    assertEqual(getCardCount(), 1, 'Should have 1 card');
    assertTrue(exists('.card-tile'), 'Card should render');
  }
}
```

### Helper Functions

#### DOM Helpers
```javascript
click(selector)              // Click an element
fill(selector, value)        // Fill input field
getText(selector)            // Get text content
exists(selector)             // Check element exists
getValue(selector)           // Get input value
waitFor(ms)                  // Wait async
getElement(selector)         // Get DOM element
```

#### App Helpers
```javascript
resetApp()                   // Clear state, reset UI
addTestCard(data)            // Add card programmatically
getCardCount()               // Count rendered cards
getCards()                   // Get all cards
findCard(name)               // Find card by name
deleteCard(id)               // Delete card by ID
```

#### Assertions
```javascript
assertEqual(actual, expected, msg)
assertTrue(condition, msg)
assertFalse(condition, msg)
assertContains(str, substr, msg)
assertNotContains(str, substr, msg)
```

### Example: Add Card Test

```javascript
{
  name: 'Add new card and verify in list',
  fn: async () => {
    await resetApp();
    
    // Open add dialog
    click('#addCardBtn');
    
    // Fill form
    fill('#cardName', 'Chase Sapphire Reserve');
    fill('#points', '85000');
    fill('#dueDate', '2025-09-15');
    
    // Save
    click('#saveBtn');
    
    // Verify
    assertEqual(getCardCount(), 1);
    assertTrue(
      getText('.card-tile').includes('Chase Sapphire Reserve'),
      'Card should appear in list'
    );
  }
}
```

## Running Tests During Development

### Development Workflow

```bash
# 1. Make code changes
# 2. Rebuild
bash build/build.sh

# 3. Run tests
open tests/dom-tests.html

# 4. Check for regressions
# 5. Repeat
```

### Debug Mode

Open browser DevTools (F12) while running tests to:
- See console logs and errors
- Inspect app state
- Pause/step through tests
- Modify test parameters

## Continuous Integration

Tests can be automated in CI/CD pipelines using headless browser runners:

```bash
# Example with Playwright
npx playwright test tests/dom-tests.html --headless
```

Currently running locally during development.

## Known Issues

- ⚠️ iCloud backup tests sometimes timeout
- ⚠️ localStorage tests may fail if browser data is cleared
- ⚠️ E2E tests require app to load completely first

## Adding to CI

To integrate tests into GitHub Actions or similar:

1. Use headless browser (Playwright, Puppeteer, etc.)
2. Run: `open tests/dom-tests.html` → capture results
3. Fail build if any test fails
4. Report test metrics

See [docs/TESTING.md](../docs/TESTING.md) for more details.

---

**Need help?** Check [docs/TESTING.md](../docs/TESTING.md) for the test framework architecture and advanced topics.
