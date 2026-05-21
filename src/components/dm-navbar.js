/**
 * Dumont Navbar component.
 * Attributes:
 * - brand: text shown as the brand label
 * Slots:
 * - default slot for navigation links
 * Accessibility:
 * - uses <nav> landmark with aria-label
 */
class DmNavbar extends HTMLElement {
  static get observedAttributes() {
    return ['brand'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  get brand() {
    return this.getAttribute('brand') || 'Dumont';
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        nav { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.25rem; background: white; border-radius: 3px; border: 1px solid rgba(15, 23, 42, 0.08); box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08); }
        .brand { font-weight: 700; color: #0f172a; text-decoration: none; }
        .links { display: flex; gap: 1rem; flex-wrap: wrap; }
        .links ::slotted(a) { color: #334155; text-decoration: none; font-size: 0.95rem; }
        .links ::slotted(a:hover), .links ::slotted(a:focus-visible) { color: #2c7be5; }
      </style>
      <nav aria-label="Primary navigation">
        <div class="brand">${this.brand}</div>
        <div class="links"><slot></slot></div>
      </nav>
    `;
  }
}

customElements.define('dm-navbar', DmNavbar);
