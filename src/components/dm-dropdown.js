class DmDropdown extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'variant', 'size', 'open'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._toggle = this._toggle.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._onTriggerKeyDown = this._onTriggerKeyDown.bind(this);
    this._onSlotChange = this._onSlotChange.bind(this);
    this._triggerId = `dm-dropdown-trigger-${Math.random().toString(36).slice(2, 9)}`;
    this._menuId = `dm-dropdown-menu-${Math.random().toString(36).slice(2, 9)}`;
  }

  connectedCallback() {
    this.render();
    document.addEventListener('click', this._onDocumentClick);
    document.addEventListener('keydown', this._onDocumentKeyDown);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._onDocumentClick);
    document.removeEventListener('keydown', this._onDocumentKeyDown);
  }

  attributeChangedCallback() {
    this.render();
  }

  get label() {
    return this.getAttribute('label') || 'Menu';
  }

  get variant() {
    return this.getAttribute('variant') || 'primary';
  }

  get size() {
    return this.getAttribute('size') || 'medium';
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(value) {
    if (value) this.setAttribute('open', '');
    else this.removeAttribute('open');
  }

  _toggle() {
    this.open = !this.open;
    this.render();
    if (this.open) {
      this._focusFirstMenuItem();
    }
  }

  _close() {
    this.open = false;
    this.render();
  }

  _getMenuItems() {
    const slot = this.shadowRoot.querySelector('slot');
    if (!slot) return [];
    return slot.assignedElements({ flatten: true }).filter((element) => {
      return element instanceof HTMLElement && ['A', 'BUTTON'].includes(element.tagName);
    });
  }

  _focusFirstMenuItem() {
    const items = this._getMenuItems();
    if (items.length) {
      items[0].focus();
    }
  }

  _focusLastMenuItem() {
    const items = this._getMenuItems();
    if (items.length) {
      items[items.length - 1].focus();
    }
  }

  _moveFocus(direction) {
    const items = this._getMenuItems();
    if (!items.length) return;

    const activeIndex = items.findIndex((item) => item === document.activeElement);
    let nextIndex = 0;

    if (activeIndex === -1) {
      nextIndex = direction > 0 ? 0 : items.length - 1;
    } else {
      nextIndex = (activeIndex + direction + items.length) % items.length;
    }

    items[nextIndex].focus();
  }

  _syncMenuItems() {
    const items = this._getMenuItems();
    items.forEach((item) => {
      if (!item.hasAttribute('role')) item.setAttribute('role', 'menuitem');
      item.setAttribute('tabindex', '-1');
    });
  }

  _onSlotChange() {
    this._syncMenuItems();
  }

  _onDocumentClick(event) {
    if (event.composedPath().includes(this)) return;
    if (this.open) {
      this._close();
    }
  }

  _onDocumentKeyDown(event) {
    if (!this.open || !event.composedPath().includes(this)) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this._close();
        this.shadowRoot.querySelector('.dm-dropdown__trigger')?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (event.target.classList.contains('dm-dropdown__trigger')) {
          this._focusFirstMenuItem();
        } else {
          this._moveFocus(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (event.target.classList.contains('dm-dropdown__trigger')) {
          this._focusLastMenuItem();
        } else {
          this._moveFocus(-1);
        }
        break;
      case 'Home':
        event.preventDefault();
        this._focusFirstMenuItem();
        break;
      case 'End':
        event.preventDefault();
        this._focusLastMenuItem();
        break;
    }
  }

  _onTriggerKeyDown(event) {
    if (event.target.classList.contains('dm-dropdown__trigger')) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this._toggle();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (!this.open) {
          this.open = true;
          this.render();
        }
        this._focusFirstMenuItem();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (!this.open) {
          this.open = true;
          this.render();
        }
        this._focusLastMenuItem();
      }
    }
  }

  render() {
    const variantClass = `dm-btn dm-btn--${this.variant}`;
    const sizeClass = this.size !== 'medium' ? `dm-btn--${this.size}` : '';
    const open = this.open;
    const display = open ? 'block' : 'none';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; font-family: inherit; }
        .dm-dropdown { position: relative; display: inline-block; }
        .dm-dropdown__trigger { all: unset; display: inline-flex; align-items: center; justify-content: space-between; gap: 0.75rem; width: auto; padding: 0.5rem 1rem; border-radius: 3px; cursor: pointer; font: inherit; font-size: 1rem; border: 1px solid transparent; transition: background-color 0.2s ease, color 0.2s ease; }
        .dm-dropdown__trigger:focus-visible { outline: 3px solid rgba(44, 123, 229, 0.35); outline-offset: 2px; }
        .dm-dropdown__label { display: inline-flex; align-items: center; gap: 0.5rem; }
        .dm-dropdown__icon { display: inline-flex; align-items: center; justify-content: center; width: 1em; height: 1em; stroke: currentColor; }
        .dm-dropdown__menu { position: absolute; top: calc(100% + 0.5rem); left: 0; min-width: 12rem; background: white; border: 1px solid rgba(15, 23, 42, 0.12); border-radius: 0.75rem; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12); padding: 0.5rem 0; display: ${display}; z-index: 10; }
        .dm-dropdown__menu ::slotted(a),
        .dm-dropdown__menu ::slotted(button) {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          border: none;
          background: transparent;
          color: #0f172a;
          text-align: left;
          font: inherit;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .dm-dropdown__menu ::slotted(a:hover),
        .dm-dropdown__menu ::slotted(button:hover) {
          background: #f1f5f9;
        }
        .dm-dropdown__menu ::slotted(a:focus),
        .dm-dropdown__menu ::slotted(button:focus) {
          outline: none;
          background: #e2e8f0;
        }
        .dm-dropdown--primary .dm-dropdown__trigger { background: #2c7be5; color: white; border-color: #2c7be5; }
        .dm-dropdown--secondary .dm-dropdown__trigger { background: #6f42c1; color: white; border-color: #6f42c1; }
        .dm-dropdown__trigger:hover { opacity: 0.95; }
      </style>
      <div class="dm-dropdown dm-dropdown--${this.variant}">
        <button id="${this._triggerId}" class="dm-dropdown__trigger ${variantClass} ${sizeClass}" type="button" aria-haspopup="menu" aria-expanded="${open}" aria-controls="${this._menuId}" aria-label="${this.label}">
          <span class="dm-dropdown__label">${this.label}</span>
          <span class="dm-dropdown__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>
        </button>
        <div id="${this._menuId}" class="dm-dropdown__menu" role="menu" aria-labelledby="${this._triggerId}">
          <slot></slot>
        </div>
      </div>
    `;

    const trigger = this.shadowRoot.querySelector('.dm-dropdown__trigger');
    const slot = this.shadowRoot.querySelector('slot');

    trigger.removeEventListener('click', this._toggle);
    trigger.removeEventListener('keydown', this._onTriggerKeyDown);
    trigger.addEventListener('click', this._toggle);
    trigger.addEventListener('keydown', this._onTriggerKeyDown);

    slot.removeEventListener('slotchange', this._onSlotChange);
    slot.addEventListener('slotchange', this._onSlotChange);
    this._syncMenuItems();
  }
}

customElements.define('dm-dropdown', DmDropdown);
