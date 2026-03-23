# 🎨 CardPointsTracker Design System v1.0

> **Reference this document when adding new features to maintain visual consistency.**

## Overview

CardPointsTracker follows **Apple iOS Human Interface Guidelines** with a clean, modern aesthetic. The design system uses CSS custom properties (variables) for consistent theming and automatic dark mode support.

---

## 🎯 Quick Reference

### Colors (use these, not hex codes!)

| Purpose | Light Mode | Dark Mode | CSS Variable |
|---------|------------|-----------|--------------|
| Primary (buttons, links) | `#007AFF` | `#0A84FF` | `var(--color-primary)` |
| Success (positive states) | `#34C759` | `#30D158` | `var(--color-success)` |
| Warning (caution states) | `#FF9500` | `#FF9F0A` | `var(--color-warning)` |
| Danger (errors, delete) | `#FF3B30` | `#FF453A` | `var(--color-danger)` |
| Background | `#F2F2F7` | `#000000` | `var(--color-bg-primary)` |
| Cards/Modals | `#FFFFFF` | `#1C1C1E` | `var(--color-bg-secondary)` |
| Elevated surfaces | `#E5E5EA` | `#2C2C2E` | `var(--color-bg-tertiary)` |
| Primary text | `#1C1C1E` | `#FFFFFF` | `var(--color-text-primary)` |
| Secondary text | `#8E8E93` | `#8E8E93` | `var(--color-text-secondary)` |
| Borders | `#C6C6C8` | `#38383A` | `var(--color-border)` |

### Category Tag Colors

| Category | Color | CSS Variable |
|----------|-------|--------------|
| Dining | Green | `var(--color-tag-dining)` |
| Travel | Blue | `var(--color-tag-travel)` |
| Groceries | Orange | `var(--color-tag-groceries)` |
| Gas | Red | `var(--color-tag-gas)` |
| Streaming | Purple | `var(--color-tag-streaming)` |
| Hotels | Indigo | `var(--color-tag-hotels)` |
| Default | Gray | `var(--color-tag-default)` |

---

## 📐 Spacing Scale

Use these consistent spacing values:

| Token | Value | Use Case |
|-------|-------|----------|
| `--space-xs` | 4px | Tight gaps, inline elements |
| `--space-sm` | 8px | Small gaps, tag padding |
| `--space-md` | 12px | Default padding, gaps |
| `--space-lg` | 16px | Card padding, section gaps |
| `--space-xl` | 20px | Large section padding |
| `--space-2xl` | 24px | Modal padding |
| `--space-3xl` | 32px | Page margins |

**Example:**
```css
.my-component {
  padding: var(--space-md);
  margin-bottom: var(--space-lg);
  gap: var(--space-sm);
}
```

---

## 🔘 Border Radius

| Token | Value | Use Case |
|-------|-------|----------|
| `--radius-sm` | 6px | Tags, small chips |
| `--radius-md` | 10px | Buttons, inputs |
| `--radius-lg` | 14px | Cards, tiles |
| `--radius-xl` | 20px | Modals, large cards |
| `--radius-full` | 9999px | Pills, circular elements |

---

## 🔤 Typography

### Font Family
```css
font-family: var(--font-family);
/* -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif */
```

### Font Sizes

| Token | Value | Use Case |
|-------|-------|----------|
| `--font-size-xs` | 11px | Labels, badges |
| `--font-size-sm` | 13px | Secondary text, captions |
| `--font-size-base` | 15px | Body text |
| `--font-size-md` | 17px | Emphasized body |
| `--font-size-lg` | 20px | Subheadings |
| `--font-size-xl` | 24px | Card titles |
| `--font-size-2xl` | 28px | Section headers |
| `--font-size-3xl` | 34px | Page titles |

### Font Weights

| Token | Value | Use Case |
|-------|-------|----------|
| `--font-weight-normal` | 400 | Body text |
| `--font-weight-medium` | 500 | Emphasized text |
| `--font-weight-semibold` | 600 | Buttons, labels |
| `--font-weight-bold` | 700 | Headings |

---

## 🌑 Shadows

| Token | Use Case |
|-------|----------|
| `--shadow-sm` | Subtle elevation (cards) |
| `--shadow-md` | Medium elevation (dropdowns) |
| `--shadow-lg` | High elevation (popovers) |
| `--shadow-modal` | Modal dialogs |

---

## ⏱ Transitions

| Token | Duration | Use Case |
|-------|----------|----------|
| `--transition-fast` | 0.15s | Hover states, quick feedback |
| `--transition-normal` | 0.2s | Most interactions |
| `--transition-slow` | 0.3s | Modal animations |

---

## 📚 Z-Index Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `--z-dropdown` | 100 | Dropdowns, sticky headers |
| `--z-sticky` | 200 | Sticky elements |
| `--z-modal-backdrop` | 999 | Modal overlay |
| `--z-modal` | 1000 | Modal content |
| `--z-toast` | 1100 | Toast notifications |

---

## 🧩 Component Patterns

### Card Tile
```css
.card-tile {
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  background: var(--color-bg-secondary);
  transition: transform var(--transition-fast);
}
```

### Button (Primary)
```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-xl);
  font-weight: var(--font-weight-semibold);
  transition: background var(--transition-fast);
}
```

### Form Input
```css
.form-input {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
}
```

### Category Tag
```css
.tag {
  background: var(--color-tag-dining-bg);
  color: var(--color-tag-dining);
  border-radius: var(--radius-sm);
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}
```

---

## ✅ Do's and Don'ts

### ✅ DO
- Use CSS variables for all colors, spacing, and sizing
- Test in both light and dark mode
- Follow the spacing scale (4, 8, 12, 16, 20, 24, 32)
- Use semantic color names (primary, success, danger)
- Keep border-radius consistent (sm, md, lg, xl)

### ❌ DON'T
- Hardcode hex colors (use `var(--color-xxx)`)
- Use arbitrary spacing values (stick to the scale)
- Create new color variables without updating this doc
- Forget dark mode compatibility
- Use `z-index` values outside the scale

---

## 🔄 Dark Mode

Dark mode is **automatic** via CSS media query:

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Variables auto-switch */
  }
}
```

**You don't need separate dark mode styles!** Just use the CSS variables and colors will adapt automatically.

---

## 📁 File Structure

```
src/styles/
├── base.css        # CSS variables, resets, typography (START HERE)
├── components.css  # Component styles using variables
└── themes.css      # Theme-specific overrides (minimal)
```

---

## 🆕 Adding New Components

1. **Check existing patterns** — Reuse styles when possible
2. **Use variables only** — No hardcoded values
3. **Test both themes** — Light and dark mode
4. **Document if new** — Update this file for significant additions

---

*Last updated: March 2025 (v3.2)*