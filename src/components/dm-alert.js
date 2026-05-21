/**
 * Dumont Alert component.
 * Attributes:
 * - variant: success, warning, danger, info
 * Slots:
 * - default slot for alert content
 * Accessibility:
 * - uses role="status" for assistive announcements
 */
class DmAlert extends HTMLElement {
  static get observedAttributes() {
    return ['variant'];
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
    return this.getAttribute('variant') || 'info';
  }

  render() {
    const variantClass = `dm-alert dm-alert--${this.variant}`;

    this.shadowRoot.innerHTML = `
      <style>
        .dm-alert { border-radius: 3px; padding: 1rem 1.25rem; border: 1px solid transparent; background: #f8fafc; color: #0f172a; }
        .dm-alert--success { background: rgba(47, 133, 90, 0.12); border-color: #2f855a; }
        .dm-alert--warning { background: rgba(214, 158, 46, 0.14); border-color: #d69e2e; }
        .dm-alert--danger { background: rgba(229, 62, 62, 0.12); border-color: #e53e3e; }
        .dm-alert--info { background: rgba(14, 165, 233, 0.14); border-color: #0ea5e9; }
      </style>
      <div class="${variantClass}" role="status">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('dm-alert', DmAlert);
