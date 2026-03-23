#!/usr/bin/env bash

# CardPointsTracker Test Suite - Quick Launcher
# Usage: bash run-tests.sh [option]
# Options: dom (default), e2e, unit

set -e

PROJECT_DIR="/Users/cholunchiang/Desktop/CardPointsTracker"
TEST_TYPE="${1:-dom}"  # Default to DOM tests

case "$TEST_TYPE" in
  dom)
    TEST_FILE="$PROJECT_DIR/tests/dom-tests.html"
    TEST_NAME="DOM Tests (24 tests)"
    ;;
  e2e)
    TEST_FILE="$PROJECT_DIR/tests/e2e-tests.html"
    TEST_NAME="E2E Tests (30 tests)"
    ;;
  unit)
    TEST_FILE="$PROJECT_DIR/tests/test-runner.html"
    TEST_NAME="Unit Tests (55 tests)"
    ;;
  all)
    echo "🧪 Opening all test suites..."
    open "$PROJECT_DIR/tests/dom-tests.html"
    open "$PROJECT_DIR/tests/e2e-tests.html"
    open "$PROJECT_DIR/tests/test-runner.html"
    exit 0
    ;;
  *)
    echo "Usage: bash run-tests.sh [dom|e2e|unit|all]"
    echo ""
    echo "  dom   - Open DOM/UI tests (24 tests) — default"
    echo "  e2e   - Open E2E workflow tests (30 tests)"
    echo "  unit  - Open unit tests (55 tests)"
    echo "  all   - Open all three test suites"
    echo ""
    echo "Total: 109 tests"
    exit 1
    ;;
esac

# Check if test file exists
if [ ! -f "$TEST_FILE" ]; then
    echo "❌ Test file not found: $TEST_FILE"
    exit 1
fi

echo "🧪 Opening $TEST_NAME..."
echo "   $TEST_FILE"
echo ""

open "$TEST_FILE"

echo "✅ Test suite opened in browser"
echo ""
echo "💡 Tip: Open browser DevTools (F12) to see console logs and debug"
