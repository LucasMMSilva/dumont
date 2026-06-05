class DmJumbotron extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'subtitle', 'variant', 'background', 'layout', 'image', 'image-position'];
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

  get title() {
    return this.getAttribute('title') || '';
  }

  get subtitle() {
    return this.getAttribute('subtitle') || '';
  }

  get variant() {
    const value = this.getAttribute('variant');
    return ['default', 'primary', 'dark', 'light'].includes(value) ? value : 'default';
  }

  get background() {
    return this.getAttribute('background') || '';
  }

  get layout() {
    const value = this.getAttribute('layout');
    return ['default', 'split'].includes(value) ? value : 'default';
  }

  get image() {
    return this.getAttribute('image') || '';
  }

  get imagePosition() {
    const value = this.getAttribute('image-position');
    return ['left', 'right'].includes(value) ? value : 'left';
  }

  render() {
    const isSplit = this.layout === 'split';
    const isSplitRight = isSplit && this.imagePosition === 'right';
    const style = !isSplit && this.background ? `background-image: url('${this.background}');` : '';
    const imageStyle = isSplit && this.image ? `background-image: url('${this.image}');` : '';
    const overlayOpacity = isSplit ? '0' : this.background ? '1' : '0';
    const regionLabel = this.title ? `${this.title} - Jumbotron` : 'Jumbotron';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; width: 100%; }

        .dm-jumbotron {
          position: relative;
          overflow: hidden;
          border-radius: 3px;
          padding: 2.5rem 2rem;
          min-height: 260px;
          display: flex;
          align-items: center;
          background-color: #eff6ff;
          background-size: cover;
          background-position: center;
          color: #0f172a;
        }

        .dm-jumbotron--split {
          display: grid;
          grid-template-columns: minmax(220px, 40%) minmax(320px, 60%);
          align-items: stretch;
          min-height: 320px;
          padding: 0;
        }

        .dm-jumbotron--split-right {
          grid-template-columns: minmax(320px, 60%) minmax(220px, 40%);
        }

        .dm-jumbotron__image {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          min-height: 100%;
          width: 100%;
        }

        .dm-jumbotron--primary { background-color: #2c7be5; color: #f8fafc; }
        .dm-jumbotron--dark { background-color: #0f172a; color: #f8fafc; }
        .dm-jumbotron--light { background-color: #f8fafc; color: #0f172a; }

        .dm-jumbotron__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.18), rgba(15, 23, 42, 0.18));
          opacity: ${overlayOpacity};
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        .dm-jumbotron__content {
          position: relative;
          z-index: 1;
          max-width: 760px;
        }

        .dm-jumbotron__content--split {
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .dm-jumbotron__content h2 {
          margin: 0 0 0.75rem;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.05;
        }

        .dm-jumbotron__content p {
          margin: 0 0 1.25rem;
          max-width: 44rem;
          font-size: 1rem;
          line-height: 1.6;
          opacity: 0.92;
        }

        .dm-jumbotron__slot {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        @media (max-width: 768px) {
          .dm-jumbotron,
          .dm-jumbotron--split {
            display: block;
            padding: 2rem 1.25rem;
            min-height: auto;
          }

          .dm-jumbotron__image {
            min-height: 220px;
          }

          .dm-jumbotron__content--split {
            padding: 1.5rem 0 0;
          }
        }
      </style>
      <section class="dm-jumbotron dm-jumbotron--${this.variant}${isSplit ? ' dm-jumbotron--split' : ''}${isSplitRight ? ' dm-jumbotron--split-right' : ''}" role="banner" aria-label="${regionLabel}" style="${style}">
        ${isSplit && !isSplitRight && this.image ? `<div class="dm-jumbotron__image" style="${imageStyle}"></div>` : ''}
        <div class="dm-jumbotron__overlay"></div>
        <div class="dm-jumbotron__content${isSplit ? ' dm-jumbotron__content--split' : ''}">
          ${this.title ? `<h2>${this.title}</h2>` : ''}
          ${this.subtitle ? `<p>${this.subtitle}</p>` : ''}
          <div class="dm-jumbotron__slot"><slot></slot></div>
        </div>
        ${isSplit && isSplitRight && this.image ? `<div class="dm-jumbotron__image" style="${imageStyle}"></div>` : ''}
      </section>
    `;
  }
}

customElements.define('dm-jumbotron', DmJumbotron);
