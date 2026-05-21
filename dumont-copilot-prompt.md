# GitHub Copilot Prompt — Dumont CSS Framework

## Project Overview

You are helping develop **Dumont**, an independent, minimalist CSS framework built from scratch with SCSS and Web Components. It is **not** a Bootstrap fork or extension — it is a fully original framework inspired by modern design principles, with a clean and minimal aesthetic.

The name is a tribute to **Alberto Santos Dumont**, the Brazilian aviation pioneer.

---

## Tech Stack

- **Styling**: Sass/SCSS (no Bootstrap dependency whatsoever)
- **JavaScript**: Native Web Components (Custom Elements v1 + Shadow DOM)
- **Build**: To be defined (Vite or Webpack recommended)
- **Browser support**: Broad — targets the last 4+ versions of major browsers; avoid bleeding-edge-only CSS features without fallbacks
- **No JavaScript framework dependency** (framework-agnostic)

---

## Naming Conventions

All CSS classes must use the `dm-` prefix:

```
dm-grid, dm-col, dm-btn, dm-card, dm-navbar, dm-badge, dm-alert, etc.
```

Web Component tag names must also use the `dm-` prefix:

```html
<dm-button>, <dm-card>, <dm-modal>, <dm-tooltip>, etc.
```

SCSS variables, mixins, and functions must use `$dm-` or `dm-` namespacing:

```scss
$dm-primary, $dm-spacing-4, @mixin dm-flex-center, @function dm-rem()
```

---

## Design Principles

- **Minimalist and clean**: no decorative noise, strong use of whitespace
- **Consistent spacing scale**: use a base-8 or base-4 spacing system
- **CSS custom properties (variables)** for all design tokens (colors, spacing, typography, radius, shadows), generated from SCSS variables
- **Accessible by default**: follow WCAG 2.1 AA — focus states, contrast ratios, ARIA in Web Components
- **Responsive-first**: mobile-first breakpoints using SCSS mixins

---

## MVP Scope

The initial milestone must include:

### 1. Design Tokens (`_tokens.scss`)
- Color palette (primary, secondary, neutral, semantic: success, warning, danger, info)
- Typography scale (font sizes, weights, line heights)
- Spacing scale
- Border radius
- Shadow levels
- Breakpoints

### 2. Grid System (`_grid.scss`)
- 12-column CSS Grid-based layout
- Classes: `dm-grid`, `dm-col-{1..12}`, `dm-col-{breakpoint}-{1..12}`
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`
- Utility helpers: `dm-offset-*`, `dm-order-*`

### 3. Base Components (SCSS + Web Components)

| Component     | SCSS class     | Web Component   |
|---------------|----------------|-----------------|
| Button        | `dm-btn`       | `<dm-button>`   |
| Card          | `dm-card`      | `<dm-card>`     |
| Badge         | `dm-badge`     | —               |
| Alert         | `dm-alert`     | `<dm-alert>`    |
| Navbar        | `dm-navbar`    | `<dm-navbar>`   |
| Typography    | `dm-heading`, `dm-text` | —    |

### 4. Utilities (`_utilities.scss`)
- Display, flex, spacing, text alignment, color, visibility helpers
- Follow a `dm-{property}-{value}` pattern (e.g., `dm-flex`, `dm-mt-4`, `dm-text-center`)

---

## SCSS Architecture

Follow a structure inspired by the 7-1 pattern:

```
scss/
├── abstracts/
│   ├── _variables.scss     # All $dm-* variables
│   ├── _mixins.scss        # dm-* mixins (responsive, flex, etc.)
│   └── _functions.scss     # dm-rem(), dm-color(), etc.
├── base/
│   ├── _reset.scss         # Modern CSS reset
│   └── _typography.scss    # Base type styles
├── components/
│   ├── _buttons.scss
│   ├── _cards.scss
│   └── ...
├── layout/
│   └── _grid.scss
├── utilities/
│   └── _utilities.scss
└── dumont.scss             # Main entry point — imports everything
```

---

## Web Components Guidelines

- Each component is a standalone ES module: `src/components/dm-button.js`
- Use Shadow DOM with `mode: 'open'`
- Inject styles via `adoptedStyleSheets` or `<style>` inside shadow root
- Expose attributes as properties: e.g., `variant`, `size`, `disabled`
- Dispatch custom events with `dm:` prefix: `dm:click`, `dm:open`, `dm:close`
- Ensure slots are used for flexible content projection

Example skeleton:

```js
class DmButton extends HTMLElement {
  static get observedAttributes() { return ['variant', 'size', 'disabled']; }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>/* component styles */</style>
      <button class="dm-btn dm-btn--${this.getAttribute('variant') || 'primary'}">
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('dm-button', DmButton);
```

---

## Documentation

- All documentation is written in **English**
- Each component must have a JSDoc comment block explaining: purpose, attributes/props, slots, custom events, and accessibility notes
- The `README.md` must include: project overview, installation, quick start, and component reference

---

## What to Avoid

- No dependency on Bootstrap, Tailwind, or any other CSS framework
- No jQuery or legacy JS patterns
- No inline styles in Web Components output (use Shadow DOM styles or adoptedStyleSheets)
- No hardcoded color or spacing values outside of `_variables.scss`
- No classes without the `dm-` prefix
- No CSS features that lack broad browser support without a fallback (e.g., `:has()`, `@layer` without fallback)

---

## Copilot Behavior Instructions

When generating code for this project:

1. Always use the `dm-` prefix for all classes, variables, and Web Component tag names
2. Always write SCSS, never plain CSS (unless inside a Shadow DOM `<style>` tag)
3. Follow the 7-1 SCSS architecture described above
4. Keep components minimal: no visual noise, generous whitespace, clean typography
5. All Web Components must use Shadow DOM with `mode: 'open'`
6. Reference design tokens from `_variables.scss` — never hardcode values
7. Write accessible markup by default: proper roles, ARIA attributes, focus management
8. All code comments and documentation must be in **English**
9. When creating a new component, always generate: the SCSS partial, the Web Component JS file, and a usage example in HTML
10. Mobile-first responsive styles using SCSS breakpoint mixins
