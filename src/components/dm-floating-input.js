/**
 * Dumont Floating Label Input component.
 * Attributes:
 * - label: text shown as floating label
 * - type: text, email, password, tel, number, url
 * - value: initial input value
 * - name: input name
 * - placeholder: visible placeholder text when empty
 * - disabled: boolean
 * - required: boolean
 * - readonly: boolean
 * Events:
 * - dm:input when the text changes
 * - dm:change when the input loses focus after a change
 */
class DmFloatingInput extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'type', 'value', 'name', 'placeholder', 'disabled', 'required', 'readonly'];
  }

  static get idCounter() {
    if (!this._idCounter) this._idCounter = 0;
    return this._idCounter;
  }

  static set idCounter(value) {
    this._idCounter = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._inputId = `dm-floating-input-${DmFloatingInput.idCounter++}`;
    this._currentValue = this.getAttribute('value') || '';
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name) {
    if (name === 'value') {
      this._currentValue = this.getAttribute('value') || '';
      const input = this.shadowRoot.querySelector('input');
      if (input) {
        input.value = this._currentValue;
      }
      return;
    }

    this.render();
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  get type() {
    return this.getAttribute('type') || 'text';
  }

  get value() {
    return this._currentValue;
  }

  set value(value) {
    if (value === null || value === undefined) {
      this._currentValue = '';
      this.removeAttribute('value');
    } else {
      this._currentValue = String(value);
      this.setAttribute('value', this._currentValue);
    }
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  get placeholder() {
    return this.getAttribute('placeholder') || ' ';
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get required() {
    return this.hasAttribute('required');
  }

  get readonly() {
    return this.hasAttribute('readonly');
  }

  render() {
    const disabledAttr = this.disabled ? 'disabled' : '';
    const requiredAttr = this.required ? 'required' : '';
    const readonlyAttr = this.readonly ? 'readonly' : '';
    const inputValue = this.value.replace(/"/g, '&quot;');
    const type = ['text', 'email', 'password', 'tel', 'number', 'url', 'search'].includes(this.type)
      ? this.type
      : 'text';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: inherit; }
        .dm-floating-input {
          position: relative;
          width: 100%;
          font: inherit;
        }

        .dm-floating-input__field {
          width: 100%;
          padding: 1.2rem 0.85rem 0.4rem;
          border: 1px solid #cbd5e1;
          border-radius: 0.75rem;
          background: #ffffff;
          color: #0f172a;
          font: inherit;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .dm-floating-input__field:focus {
          outline: none;
          border-color: #2c7be5;
          box-shadow: 0 0 0 3px rgba(44, 123, 229, 0.14);
        }

        .dm-floating-input__field:disabled {
          background: #f8fafc;
          cursor: not-allowed;
          opacity: 0.8;
        }

        .dm-floating-input__label {
          position: absolute;
          left: 0.85rem;
          top: 1.05rem;
          pointer-events: none;
          color: #64748b;
          font-size: 1rem;
          line-height: 1;
          transform-origin: left top;
          transition: transform 0.2s ease, color 0.2s ease, top 0.2s ease;
          background: transparent;
          padding: 0 0.25rem;
        }

        .dm-floating-input__field:not(:placeholder-shown) + .dm-floating-input__label,
        .dm-floating-input__field:focus + .dm-floating-input__label {
          transform: translateY(-0.75rem) scale(0.85);
          top: 0.45rem;
          color: #2c7be5;
        }

        .dm-floating-input__label::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 0.25rem;
          top: 50%;
          transform: translateY(-50%);
          background: #ffffff;
          z-index: -1;
        }
      </style>

      <div class="dm-floating-input">
        <input
          id="${this._inputId}"
          class="dm-floating-input__field"
          type="${type}"
          name="${this.name}"
          value="${inputValue}"
          placeholder="${this.placeholder}"
          ${disabledAttr}
          ${requiredAttr}
          ${readonlyAttr}
          aria-label="${this.label || this.name}"
        />
        <label class="dm-floating-input__label" for="${this._inputId}">${this.label || ' '}</label>
      </div>
    `;

    const input = this.shadowRoot.querySelector('input');

    input.addEventListener('input', () => {
      this._currentValue = input.value;
      this.dispatchEvent(new CustomEvent('dm:input', {
        detail: { value: input.value },
        bubbles: true,
        composed: true,
      }));
    });

    input.addEventListener('change', () => {
      this.dispatchEvent(new CustomEvent('dm:change', {
        detail: { value: input.value },
        bubbles: true,
        composed: true,
      }));
    });
  }
}

customElements.define('dm-floating-input', DmFloatingInput);
