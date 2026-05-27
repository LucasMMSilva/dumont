class DmModal extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'title'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._onKeydown = this._onKeydown.bind(this);
    this._onOverlayClick = this._onOverlayClick.bind(this);
  }

  connectedCallback() {
    this.render();
    if (this.open) {
      this._trapFocus();
    }
  }

  attributeChangedCallback(name) {
    if (name === 'open') {
      this.render();
      if (this.open) {
        this._trapFocus();
      } else {
        this._releaseFocus();
      }
    } else if (name === 'title') {
      this.render();
    }
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(value) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  get title() {
    return this.getAttribute('title') || this.dataset.title || '';
  }

  show() {
    this.open = true;
    this.render();
    const dialog = this.shadowRoot.querySelector('.dm-modal__dialog');
    if (dialog) {
      dialog.focus();
    }
  }

  close() {
    this.open = false;
    this.render();
    this.dispatchEvent(new CustomEvent('dm:close', { bubbles: true, composed: true }));
  }

  _trapFocus() {
    document.addEventListener('keydown', this._onKeydown);
    document.body.style.overflow = 'hidden';
  }

  _releaseFocus() {
    document.removeEventListener('keydown', this._onKeydown);
    document.body.style.overflow = '';
  }

  _onKeydown(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _onOverlayClick(event) {
    if (event.target.classList.contains('dm-modal__overlay')) {
      this.close();
    }
  }

  render() {
    const hidden = this.open ? '' : 'hidden';
    const titleText = this.title;

    this.shadowRoot.innerHTML = `
      <style>
        :host { position: fixed; inset: 0; display: ${this.open ? 'flex' : 'none'}; align-items: center; justify-content: center; z-index: 10000; }
        .dm-modal__overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(3px);
        }
        .dm-modal__dialog {
          position: relative;
          z-index: 1;
          width: min(100%, 520px);
          max-height: min(100vh, 90vh);
          background: #ffffff;
          border-radius: 3px;
          box-shadow: 0 24px 32px rgba(15, 23, 42, 0.2);
          padding: 1.5rem;
          overflow: auto;
          outline: none;
        }
        .dm-modal__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .dm-modal__title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #0f172a;
        }
        .dm-modal__close {
          all: unset;
          position: absolute;
          top: calc(1.5rem - 22px);
          right: calc(1.5rem - 22px);
          width: 2rem;
          height: 2rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 2;
          cursor: pointer;
          color: #334155;
          transition: background-color 0.2s ease;
        }
        .dm-modal__close:hover {
          background-color: rgba(15, 23, 42, 0.04);
        }
        .dm-modal__body {
          color: #334155;
          line-height: 1.75;
        }
      </style>
      <div class="dm-modal__overlay" part="overlay"></div>
      <div class="dm-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
        <div class="dm-modal__header">
          <h2 class="dm-modal__title" id="modal-title">${titleText}</h2>
          <button class="dm-modal__close" type="button" aria-label="Close modal">×</button>
        </div>
        <div class="dm-modal__body">
          <slot></slot>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.dm-modal__overlay')?.addEventListener('click', this._onOverlayClick);
    this.shadowRoot.querySelector('.dm-modal__close')?.addEventListener('click', () => this.close());
  }
}

customElements.define('dm-modal', DmModal);
