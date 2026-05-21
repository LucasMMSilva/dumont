# Dumont CSS Framework

Dumont is a minimalist CSS framework built from scratch with SCSS and native Web Components. It is intentionally lightweight, accessible, and framework-agnostic.

## Overview

- SCSS-based design tokens, spacing scale, and responsive utilities
- Native Web Components with Shadow DOM for buttons, cards, alerts, and navbar
- No Bootstrap, Tailwind, or external UI framework dependency
- Mobile-first responsive grid and utility system

## Installation

```bash
npm install
npm run dev
```

## Quick Start

Open `index.html` in the browser via Vite and explore the example page.

### Main entry points

- `index.html` — example usage and component preview
- `src/main.js` — imports framework styles and component modules
- `src/styles/scss/dumont.scss` — framework entry stylesheet
- `src/components/*.js` — Web Component implementations

## Available Components

### `<dm-button>`

Attributes:
- `variant`: `primary`, `secondary`, `success`, `danger`, `warning`, `info`
- `size`: `small`, `medium`, `large`
- `disabled`

Events:
- `dm:click`

Example:

```html
<dm-button variant="primary">Primary</dm-button>
```

### `<dm-card>`

A simple card wrapper with built-in surface styling.

Example:

```html
<dm-card>
  <h2>Card title</h2>
  <p>Card content</p>
</dm-card>
```

### `<dm-alert>`

Attributes:
- `variant`: `success`, `warning`, `danger`, `info`

Example:

```html
<dm-alert variant="warning">This is a warning alert.</dm-alert>
```

### `<dm-navbar>`

Attributes:
- `brand`

Example:

```html
<dm-navbar brand="Dumont">
  <a href="#">Home</a>
  <a href="#">Docs</a>
</dm-navbar>
```

## SCSS Structure

```
src/styles/scss/
├── abstracts/
│   ├── _variables.scss
│   ├── _tokens.scss
│   ├── _mixins.scss
│   └── _functions.scss
├── base/
│   ├── _reset.scss
│   └── _typography.scss
├── components/
│   ├── _buttons.scss
│   ├── _cards.scss
│   ├── _alerts.scss
│   ├── _navbar.scss
│   ├── _badge.scss
│   └── _typography.scss
├── layout/
│   └── _grid.scss
├── utilities/
│   └── _utilities.scss
└── dumont.scss
```

## Build

Use Vite to run the development server or build production assets:

```bash
npm run dev
npm run build
npm run preview
```

## Notes

- All styles use the `dm-` prefix.
- Web Components use Shadow DOM and inline component styles.
- Design tokens are declared in `src/styles/scss/abstracts/_variables.scss`.
