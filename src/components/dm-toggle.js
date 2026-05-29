/**
 * Dumont Toggle (Switch) component.
 * Attributes:
 * - checked: boolean
 * - disabled: boolean
 * - name: form name
 * - value: value when checked
 * - label: optional accessible label
 * Events:
 * - dm:change when toggled
 */
class DmToggle extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'disabled', 'name', 'value', 'label'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._onClick = this._onClick.bind(this);
    this._onKey = this._onKey.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(val) {
    if (val) this.setAttribute('checked', '');
    else this.removeAttribute('checked');
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

  get label() {
    return this.getAttribute('label') || '';
  }

  _emitChange() {
    this.dispatchEvent(new CustomEvent('dm:change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true,
    }));
  }

  _onClick(e) {
    if (this.disabled) return;
    this.checked = !this.checked;
    this._emitChange();
  }

  _onKey(e) {
    if (this.disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.checked = !this.checked;
      this._emitChange();
    }
  }

  render() {
    const checked = this.checked;
    const disabled = this.disabled ? 'disabled' : '';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; }
        .dm-toggle {
          --w: 42px;
          --h: 24px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }
        .dm-toggle[aria-disabled="true"] { cursor: not-allowed; opacity: 0.6; }
        .dm-switch {
          width: var(--w);
          height: var(--h);
          background: #e6edf3;
          border-radius: calc(var(--h) / 2);
          position: relative;
          transition: background 0.15s ease;
          box-sizing: border-box;
          border: 1px solid rgba(15,23,42,0.06);
        }
        .dm-thumb {
          width: calc(var(--h) - 4px);
          height: calc(var(--h) - 4px);
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform 0.15s ease;
          box-shadow: 0 1px 2px rgba(2,6,23,0.08);
        }
        .dm-toggle[aria-checked="true"] .dm-switch {
          background: #2c7be5;
          border-color: #2c7be5;
        }
        .dm-toggle[aria-checked="true"] .dm-thumb {
          transform: translateX(calc(var(--w) - var(--h)));
        }
        .dm-label {
          margin: 0;
          display: inline-flex;
          align-items: center;
          color: #0f172a;
          font: inherit;
        }
      </style>

      <div class="dm-toggle" role="switch" tabindex="0" aria-checked="${checked}" aria-disabled="${this.disabled}">
        <div class="dm-switch" ${disabled}>
          <div class="dm-thumb"></div>
        </div>
        ${this.label ? `<div class="dm-label">${this.label}</div>` : ''}
      </div>
    `;

    const root = this.shadowRoot.querySelector('.dm-toggle');
    root.removeEventListener('click', this._onClick);
    root.removeEventListener('keydown', this._onKey);
    root.addEventListener('click', this._onClick);
    root.addEventListener('keydown', this._onKey);

    // reflect a hidden input for forms when inside a form
    if (!this._hiddenInput && this.name) {
      this._hiddenInput = document.createElement('input');
      this._hiddenInput.type = 'hidden';
      this._hiddenInput.name = this.name;
      this.appendChild(this._hiddenInput);
    }
    if (this._hiddenInput) {
      this._hiddenInput.value = this.checked ? this.value : '';
    }
  }
}

customElements.define('dm-toggle', DmToggle);
