class DmToast extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'duration'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._timeout = null;
  }

  connectedCallback() {
    this.render();
    const duration = Number(this.getAttribute('duration')) || 4000;
    this._timeout = window.setTimeout(() => this.dismiss(), duration);
  }

  attributeChangedCallback() {
    this.render();
  }

  disconnectedCallback() {
    window.clearTimeout(this._timeout);
  }

  get variant() {
    return this.getAttribute('variant') || 'info';
  }

  render() {
    const variantClass = `dm-toast dm-toast--${this.variant}`;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; animation: dm-toast-enter 0.2s ease-out both; }

        .dm-toast {
          border-radius: 3px;
          padding: 0.8rem 1.25rem;
          border: 1px solid transparent;
          background: rgba(27, 78, 129, 0.92);
          color: white;
          box-shadow: 0 16px 20px rgba(15, 23, 42, 0.12);
          backdrop-filter: blur(8px);
          min-width: 280px;
          max-width: 360px;
          overflow-wrap: break-word;
        }

        .dm-toast--success { background: #2f855a; }
        .dm-toast--warning { background: #d69e2e; }
        .dm-toast--danger { background: #e53e3e; }
        .dm-toast--info { background: #0ea5e9; }

        @keyframes dm-toast-enter {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
      <div class="${variantClass}" role="status" aria-live="polite">
        <slot></slot>
      </div>
    `;
  }

  dismiss() {
    this.remove();
  }
}

customElements.define('dm-toast', DmToast);

class DmToastContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 1rem;
          right: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: min(360px, calc(100% - 2rem));
          z-index: 9999;
          pointer-events: none;
        }

        ::slotted(dm-toast) {
          pointer-events: auto;
        }
      </style>
      <slot></slot>
    `;
  }

  show(message, variant = 'info', duration = 4000) {
    const toast = document.createElement('dm-toast');
    toast.setAttribute('variant', variant);
    toast.setAttribute('duration', String(duration));
    toast.textContent = message;
    this.appendChild(toast);
    return toast;
  }
}

customElements.define('dm-toast-container', DmToastContainer);
