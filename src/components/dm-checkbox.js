class DmCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'checked', 'disabled', 'name', 'value', 'required'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(value) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  get value() {
    return this.getAttribute('value') || 'on';
  }

  get required() {
    return this.hasAttribute('required');
  }

  _reflectHiddenInput() {
    if (!this.name) return;

    if (!this._hiddenInput) {
      this._hiddenInput = document.createElement('input');
      this._hiddenInput.type = 'hidden';
      this._hiddenInput.name = this.name;
      this.appendChild(this._hiddenInput);
    }

    this._hiddenInput.value = this.checked ? this.value : '';
  }

  _emitChange() {
    this.dispatchEvent(new CustomEvent('dm:change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true,
    }));
  }

  _onClick() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this._reflectHiddenInput();
    this._emitChange();
  }

  _onKeyDown(event) {
    if (this.disabled) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.checked = !this.checked;
      this._reflectHiddenInput();
      this._emitChange();
    }
  }

  render() {
    const checked = this.checked;
    const disabled = this.disabled;
    const required = this.required ? 'aria-required="true"' : '';
    const label = this.label;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; font-family: inherit; }
        .dm-checkbox {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          color: #0f172a;
          font: inherit;
          user-select: none;
          outline: none;
        }

        .dm-checkbox[aria-disabled="true"] {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .dm-checkbox__box {
          width: 1.25rem;
          height: 1.25rem;
          min-width: 1.25rem;
          border-radius: 0.45rem;
          border: 2px solid #cbd5e1;
          background: #ffffff;
          box-sizing: border-box;
          display: grid;
          place-items: center;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .dm-checkbox[aria-checked="true"] .dm-checkbox__box {
          background: #2c7be5;
          border-color: #2c7be5;
        }

        .dm-checkbox__box::before {
          content: '';
          width: 0.55rem;
          height: 0.9rem;
          border: solid transparent;
          border-width: 0 0.2rem 0.2rem 0;
          transform: rotate(45deg) scale(0);
          transition: transform 0.15s ease;
          box-sizing: border-box;
        }

        .dm-checkbox[aria-checked="true"] .dm-checkbox__box::before {
          border-color: #ffffff;
          transform: rotate(45deg) scale(1);
        }

        .dm-checkbox__label {
          display: inline-block;
          line-height: 1.4;
          color: inherit;
        }
      </style>

      <div class="dm-checkbox" role="checkbox" tabindex="0" aria-checked="${checked}" aria-disabled="${disabled}" ${required}>
        <span class="dm-checkbox__box"></span>
        <span class="dm-checkbox__label">${label}</span>
      </div>
    `;

    const root = this.shadowRoot.querySelector('.dm-checkbox');
    root.removeEventListener('click', this._onClick);
    root.removeEventListener('keydown', this._onKeyDown);
    root.addEventListener('click', this._onClick);
    root.addEventListener('keydown', this._onKeyDown);

    this._reflectHiddenInput();
  }
}

customElements.define('dm-checkbox', DmCheckbox);
