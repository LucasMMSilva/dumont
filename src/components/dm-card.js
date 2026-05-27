/**
 * Dumont Card component.
 * Slots:
 * - default slot for card content
 * Accessibility:
 * - semantic container for grouped content
 */
class DmCard extends HTMLElement {
  static get observedAttributes() {
    return ['image-src', 'image-alt'];
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

  get imageSrc() {
    return this.getAttribute('image-src');
  }

  get imageAlt() {
    return this.getAttribute('image-alt') || '';
  }

  render() {
    const imageMarkup = this.imageSrc
      ? `
        <div class="dm-card__image">
          <img src="${this.imageSrc}" alt="${this.imageAlt}">
        </div>
      `
      : '';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .dm-card { background: white; border-radius: 3px; box-shadow: 0 4px 8px rgba(15, 23, 42, 0.12); border: 1px solid rgba(15, 23, 42, 0.06); padding: 1.5rem; }
        .dm-card__image { margin: calc(-1 * 1.5rem) calc(-1 * 1.5rem) 1rem; overflow: hidden; border-top-left-radius: 3px; border-top-right-radius: 3px; }
        .dm-card__image img { width: 100%; height: auto; display: block; object-fit: contain; }
      </style>
      <section class="dm-card" role="region">
        ${imageMarkup}
        <slot></slot>
      </section>
    `;
  }
}

customElements.define('dm-card', DmCard);
