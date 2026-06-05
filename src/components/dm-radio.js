class DmRadio extends HTMLElement {
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

  attributeChangedCallback(name) {
    if (name === 'checked' && this.checked) {
      this._updateGroup();
    }
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

  _updateGroup() {
    if (!this.name) return;

    const radios = document.querySelectorAll(`dm-radio[name="${this.name}"]`);
    radios.forEach((radio) => {
      if (radio !== this) {
        radio.checked = false;
        radio._reflectHiddenInput();
      }
    });
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
      detail: { checked: this.checked, value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  _onClick() {
    if (this.disabled) return;
    if (this.checked) return;

    this.checked = true;
    this._updateGroup();
    this._reflectHiddenInput();
    this._emitChange();
  }

  _onKeyDown(event) {
    if (this.disabled) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (this.checked) return;

      this.checked = true;
      this._updateGroup();
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
        .dm-radio {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          color: #0f172a;
          font: inherit;
          user-select: none;
          outline: none;
        }

        .dm-radio[aria-disabled="true"] {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .dm-radio__circle {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          display: grid;
          place-items: center;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .dm-radio[aria-checked="true"] .dm-radio__circle {
          background: #2c7be5;
          border-color: #2c7be5;
        }

        .dm-radio__dot {
          width: 0.55rem;
          height: 0.55rem;
          border-radius: 50%;
          background: transparent;
          transition: background 0.2s ease, transform 0.2s ease;
          transform: scale(0);
        }

        .dm-radio[aria-checked="true"] .dm-radio__dot {
          background: #ffffff;
          transform: scale(1);
        }

        .dm-radio__label {
          display: inline-block;
          line-height: 1.4;
        }
      </style>

      <div class="dm-radio" role="radio" tabindex="0" aria-checked="${checked}" aria-disabled="${disabled}" ${required}>
        <span class="dm-radio__circle"><span class="dm-radio__dot"></span></span>
        <span class="dm-radio__label">${label}</span>
      </div>
    `;

    const root = this.shadowRoot.querySelector('.dm-radio');
    root.removeEventListener('click', this._onClick);
    root.removeEventListener('keydown', this._onKeyDown);
    root.addEventListener('click', this._onClick);
    root.addEventListener('keydown', this._onKeyDown);

    this._reflectHiddenInput();
  }
}

customElements.define('dm-radio', DmRadio);
