/**
 * Dumont Carousel component.
 * Attributes:
 * - interval: autoplay interval in milliseconds (default: 5000)
 * - autoplay: boolean, enable/disable autoplay (default: true)
 * Slots:
 * - default slot for carousel slides
 * Events:
 * - dm:slide-change when slide changes
 * Accessibility:
 * - uses role="region" and aria-live for announcements
 */
class DmCarousel extends HTMLElement {
  static get observedAttributes() {
    return ['interval', 'autoplay'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._currentIndex = 0;
    this._slides = [];
    this._autoplayTimeout = null;
    this._onPrevClick = this._onPrevClick.bind(this);
    this._onNextClick = this._onNextClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this._updateSlides();
    this._startAutoplay();
  }

  disconnectedCallback() {
    this._stopAutoplay();
  }

  attributeChangedCallback(name) {
    if (name === 'interval' || name === 'autoplay') {
      this._stopAutoplay();
      this.render();
      this._startAutoplay();
    }
  }

  get interval() {
    return Number(this.getAttribute('interval')) || 5000;
  }

  get autoplay() {
    const attr = this.getAttribute('autoplay');
    if (attr === null) return true;
    return attr !== 'false';
  }

  _updateSlides() {
    const slot = this.shadowRoot.querySelector('slot');
    if (!slot) return;

    this._slides = slot
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName === 'DM-CAROUSEL-SLIDE');

    if (this._slides.length > 0) {
      this._currentIndex = Math.max(0, Math.min(this._currentIndex, this._slides.length - 1));
      this._updateSlideVisibility();
    }
  }

  _updateSlideVisibility() {
    this._slides.forEach((slide, index) => {
      if (index === this._currentIndex) {
        slide.setAttribute('active', '');
        slide.style.display = 'block';
      } else {
        slide.removeAttribute('active');
        slide.style.display = 'none';
      }
    });

    this.dispatchEvent(
      new CustomEvent('dm:slide-change', {
        detail: { index: this._currentIndex, total: this._slides.length },
        bubbles: true,
        composed: true,
      })
    );
  }

  _goToSlide(index, resetAutoplay = true) {
    if (this._slides.length === 0) return;
    this._currentIndex = (index + this._slides.length) % this._slides.length;
    this._updateSlideVisibility();
    if (resetAutoplay) {
      this._stopAutoplay();
      this._startAutoplay();
    }
  }

  _nextSlide() {
    this._goToSlide(this._currentIndex + 1, false);
  }

  _prevSlide() {
    this._goToSlide(this._currentIndex - 1, false);
  }

  _onNextClick() {
    this._nextSlide();
  }

  _onPrevClick() {
    this._prevSlide();
  }

  _startAutoplay() {
    if (!this.autoplay || this._slides.length === 0) return;

    this._autoplayTimeout = setInterval(() => {
      this._nextSlide();
    }, this.interval);
  }

  _stopAutoplay() {
    if (this._autoplayTimeout) {
      clearInterval(this._autoplayTimeout);
      this._autoplayTimeout = null;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .dm-carousel {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 3px;
          background: #000;
        }
        .dm-carousel__slides {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 300px;
        }
        ::slotted(dm-carousel-slide) {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        ::slotted(dm-carousel-slide[active]) {
          opacity: 1;
          z-index: 1;
        }
        .dm-carousel__button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(255, 255, 255, 0.7);
          border: none;
          width: 1.75rem;
          height: 1.75rem;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          transition: background-color 0.2s ease;
          color: #0f172a;
        }
        .dm-carousel__button:hover {
          background: rgba(255, 255, 255, 0.95);
        }
        .dm-carousel__prev {
          left: 0.5rem;
        }
        .dm-carousel__next {
          right: 0.5rem;
        }
        .dm-carousel__indicators {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          gap: 0.5rem;
        }
        .dm-carousel__dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .dm-carousel__dot:hover {
          background: rgba(255, 255, 255, 0.8);
        }
        .dm-carousel__dot.active {
          background: rgba(255, 255, 255, 1);
        }
      </style>
      <div class="dm-carousel" role="region" aria-live="polite" aria-label="Carousel">
        <div class="dm-carousel__slides">
          <slot></slot>
        </div>
        <button class="dm-carousel__button dm-carousel__prev" aria-label="Previous slide">‹</button>
        <button class="dm-carousel__button dm-carousel__next" aria-label="Next slide">›</button>
        <div class="dm-carousel__indicators" id="indicators"></div>
      </div>
    `;

    const prevBtn = this.shadowRoot.querySelector('.dm-carousel__prev');
    const nextBtn = this.shadowRoot.querySelector('.dm-carousel__next');

    prevBtn?.removeEventListener('click', this._onPrevClick);
    nextBtn?.removeEventListener('click', this._onNextClick);

    prevBtn?.addEventListener('click', this._onPrevClick);
    nextBtn?.addEventListener('click', this._onNextClick);

    this._renderIndicators();
  }

  _renderIndicators() {
    const indicatorsContainer = this.shadowRoot.getElementById('indicators');
    if (!indicatorsContainer || this._slides.length === 0) return;

    indicatorsContainer.innerHTML = '';

    for (let i = 0; i < this._slides.length; i++) {
      const dot = document.createElement('button');
      dot.className = `dm-carousel__dot ${i === this._currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => this._goToSlide(i));
      indicatorsContainer.appendChild(dot);
    }
  }
}

class DmCarouselSlide extends HTMLElement {
  static get observedAttributes() {
    return ['image', 'title', 'description'];
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

  get image() {
    return this.getAttribute('image') || '';
  }

  get title() {
    return this.getAttribute('title') || '';
  }

  get description() {
    return this.getAttribute('description') || '';
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; width: 100%; height: 100%; }
        .dm-carousel-slide {
          width: 100%;
          height: 100%;
          background-image: url('${this.image}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 2rem;
        }
        .dm-carousel-slide::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
        }
        .dm-carousel-slide__content {
          position: relative;
          z-index: 2;
          color: white;
          max-width: min(600px, calc(100% - 4rem));
          width: 100%;
          margin-left: 12px;
        }
        .dm-carousel-slide__title {
          margin: 0 0 0.5rem 0;
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 1.3;
        }
        .dm-carousel-slide__description {
          margin: 0;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          opacity: 0.95;
        }
      </style>
      <div class="dm-carousel-slide">
        ${
          this.title || this.description
            ? `
          <div class="dm-carousel-slide__content">
            ${this.title ? `<h2 class="dm-carousel-slide__title">${this.title}</h2>` : ''}
            ${this.description ? `<p class="dm-carousel-slide__description">${this.description}</p>` : ''}
          </div>
        `
            : ''
        }
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('dm-carousel', DmCarousel);
customElements.define('dm-carousel-slide', DmCarouselSlide);
