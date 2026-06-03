/**
 * Dumont Navbar component.
 * Attributes:
 * - brand: text shown as the brand label
 * - variant: default, dark, primary, minimal
 * Slots:
 * - default slot for navigation links
 * Accessibility:
 * - uses <nav> landmark with aria-label and button controls
 */
class DmNavbar extends HTMLElement {
  static get observedAttributes() {
    return ['brand', 'variant'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._menuOpen = false;
    this._onToggle = this._onToggle.bind(this);
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

  get variant() {
    const value = this.getAttribute('variant');
    return ['default', 'dark', 'primary', 'minimal'].includes(value) ? value : 'default';
  }

  get menuLabel() {
    return this._menuOpen ? 'Fechar menu' : 'Abrir menu';
  }

  _onToggle() {
    this._menuOpen = !this._menuOpen;
    const links = this.shadowRoot.querySelector('.links');
    const toggle = this.shadowRoot.querySelector('.nav-toggle');
    if (links) links.classList.toggle('open', this._menuOpen);
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(this._menuOpen));
      toggle.setAttribute('aria-label', this.menuLabel);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; width: 100%; }
        nav { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.25rem; transition: background-color 0.2s ease, color 0.2s ease; position: relative; }
        nav.default { background: #fff; color: #0f172a; border: 1px solid rgba(15, 23, 42, 0.08); box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08); }
        nav.dark { background: #0f172a; color: #f8fafc; border: 1px solid rgba(255, 255, 255, 0.12); }
        nav.primary { background: #2563eb; color: #f8fafc; border: 1px solid rgba(255, 255, 255, 0.12); }
        nav.minimal { background: transparent; color: #0f172a; border: 1px solid rgba(15, 23, 42, 0.08); }

        .brand { font-weight: 700; color: inherit; text-decoration: none; font-size: 1.05rem; letter-spacing: 0.01em; }
        .links { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
        .links ::slotted(a) { color: inherit; text-decoration: none; font-size: 0.95rem; padding: 0.35rem 0.75rem; border-radius: 999px; transition: background-color 0.2s ease, color 0.2s ease; }
        .links ::slotted(a:hover), .links ::slotted(a:focus-visible) { color: ${this.variant === 'dark' || this.variant === 'primary' ? '#fff' : '#2563eb'}; background: rgba(255, 255, 255, 0.12); }
        .nav-toggle { display: none; align-items: center; justify-content: center; width: 2.4rem; height: 2.4rem; border-radius: 50%; border: none; background: rgba(255, 255, 255, 0.9); color: #0f172a; cursor: pointer; }
        .nav-toggle:hover { background: rgba(255, 255, 255, 1); }
        .nav-toggle svg { width: 1rem; height: 1rem; }

        @media (max-width: 768px) {
          .nav-toggle { display: inline-flex; }
          .links { position: absolute; top: 100%; left: 0; right: 0; display: none; flex-direction: column; gap: 0.75rem; padding: 1rem 1.25rem 1.25rem; margin-top: 0.75rem; background: inherit; border-radius: 0 0 0.75rem 0.75rem; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.14); }
          .links.open { display: flex; }
          .links ::slotted(a) { width: 100%; }
        }
      </style>
      <nav class="${this.variant}" aria-label="Primary navigation">
        <a class="brand" href="#">${this.brand}</a>
        <button type="button" class="nav-toggle" aria-expanded="false" aria-label="${this.menuLabel}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>
        </button>
        <div class="links" role="menu">
          <slot></slot>
        </div>
      </nav>
    `;

    const toggle = this.shadowRoot.querySelector('.nav-toggle');
    toggle?.removeEventListener('click', this._onToggle);
    toggle?.addEventListener('click', this._onToggle);
  }
}

customElements.define('dm-navbar', DmNavbar);
