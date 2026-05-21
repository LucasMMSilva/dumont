/**
 * Dumont Card component.
 * Slots:
 * - default slot for card content
 * Accessibility:
 * - semantic container for grouped content
 */
class DmCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .dm-card { background: white; border-radius: 3px; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.12); border: 1px solid rgba(15, 23, 42, 0.06); padding: 1.5rem; }
      </style>
      <section class="dm-card" role="region">
        <slot></slot>
      </section>
    `;
  }
}

customElements.define('dm-card', DmCard);
