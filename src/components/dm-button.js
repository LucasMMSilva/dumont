/**
 * Dumont Button component.
 * Attributes:
 * - variant: primary, secondary, success, danger, warning, info
 * - size: small, medium, large
 * - disabled: boolean
 * Slots:
 * - default slot for button label content
 * Events:
 * - dm:click when the button is activated
 * Accessibility:
 * - uses native <button> inside shadow DOM
 */
class DmButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled'];
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

  get variant() {
    return this.getAttribute('variant') || 'primary';
  }

  get size() {
    return this.getAttribute('size') || 'medium';
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  render() {
    const disabled = this.disabled ? 'disabled' : '';
    const variantClass = `dm-btn dm-btn--${this.variant}`;
    const sizeClass = this.size !== 'medium' ? `dm-btn--${this.size}` : '';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; }
        .dm-btn { all: unset; display: inline-flex; align-items: center; justify-content: center; padding: 0.75rem 1rem; border-radius: 3px; cursor: pointer; font: inherit; font-size: 1rem; border: 1px solid transparent; transition: transform 0.2s ease, background-color 0.2s ease; }
        .dm-btn:hover { transform: translateY(-1px); }
        .dm-btn:focus-visible { outline: 3px solid rgba(44, 123, 229, 0.35); outline-offset: 2px; }
        .dm-btn--primary { background: #2c7be5; color: white; }
        .dm-btn--secondary { background: #6f42c1; color: white; }
        .dm-btn--success { background: #2f855a; color: white; }
        .dm-btn--danger { background: #e53e3e; color: white; }
        .dm-btn--warning { background: #d69e2e; color: #0f172a; }
        .dm-btn--info { background: #0ea5e9; color: white; }
        .dm-btn--small,
        .dm-btn--large { padding: 0.75rem 1rem; font-size: 1rem; }
        .dm-btn[disabled] { opacity: 0.5; cursor: not-allowed; transform: none; }
      </style>
      <button class="${variantClass} ${sizeClass}" ${disabled}>
        <slot></slot>
      </button>
    `;

    this.shadowRoot.querySelector('button').addEventListener('click', (event) => {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      this.dispatchEvent(new CustomEvent('dm:click', { bubbles: true, composed: true }));
    });
  }
}

customElements.define('dm-button', DmButton);
