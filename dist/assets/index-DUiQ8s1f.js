(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();class d extends HTMLElement{static get observedAttributes(){return["variant","size","disabled"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}get variant(){return this.getAttribute("variant")||"primary"}get size(){return this.getAttribute("size")||"medium"}get disabled(){return this.hasAttribute("disabled")}render(){const e=this.disabled?"disabled":"",s=`dm-btn dm-btn--${this.variant}`,r=this.size!=="medium"?`dm-btn--${this.size}`:"";this.shadowRoot.innerHTML=`
      <style>
        :host { display: inline-block; }
        .dm-btn { all: unset; display: inline-flex; align-items: center; justify-content: center; padding: 0.3rem 1rem; border-radius: 3px; cursor: pointer; font: inherit; font-size: 1rem; border: 1px solid transparent; transition: transform 0.2s ease, background-color 0.2s ease; }
        .dm-btn:focus-visible { outline: 3px solid rgba(44, 123, 229, 0.35); outline-offset: 2px; }
        .dm-btn--primary { background: #2c7be5; color: white; border: 1px solid #2c7be5; }
        .dm-btn--secondary { background: #6f42c1; color: white; border: 1px solid #6f42c1; }
        .dm-btn--success { background: #2f855a; color: white; border: 1px solid #2f855a; }
        .dm-btn--danger { background: #e53e3e; color: white; border: 1px solid #e53e3e; }
        .dm-btn--warning { background: #d69e2e; color: #0f172a; border: 1px solid #d69e2e; }
        .dm-btn--info { background: #0ea5e9; color: white; border: 1px solid #0ea5e9; }

        .dm-btn--primary:not([disabled]):hover { background: white; color: #2c7be5; }
        .dm-btn--secondary:not([disabled]):hover { background: white; color: #6f42c1; }
        .dm-btn--success:not([disabled]):hover { background: white; color: #2f855a; }
        .dm-btn--danger:not([disabled]):hover { background: white; color: #e53e3e; }
        .dm-btn--warning:not([disabled]):hover { background: white; color: #0f172a; }
        .dm-btn--info:not([disabled]):hover { background: white; color: #0ea5e9; }

        .dm-btn--small,
        .dm-btn--large { padding: 0.75rem 1rem; font-size: 1rem; }

        .dm-btn[disabled] { opacity: 0.5; cursor: not-allowed; transform: none; pointer: none; }
      </style>

      <button class="${s} ${r}" ${e}>
        <slot></slot>
      </button>
    `,this.shadowRoot.querySelector("button").addEventListener("click",t=>{if(this.disabled){t.preventDefault();return}this.dispatchEvent(new CustomEvent("dm:click",{bubbles:!0,composed:!0}))})}}customElements.define("dm-button",d);class l extends HTMLElement{static get observedAttributes(){return["image-src","image-alt"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}get imageSrc(){return this.getAttribute("image-src")}get imageAlt(){return this.getAttribute("image-alt")||""}render(){const e=this.imageSrc?`
        <div class="dm-card__image">
          <img src="${this.imageSrc}" alt="${this.imageAlt}">
        </div>
      `:"";this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; }
        .dm-card { background: white; border-radius: 3px; box-shadow: 0 4px 8px rgba(15, 23, 42, 0.12); border: 1px solid rgba(15, 23, 42, 0.06); padding: 1.5rem; }
        .dm-card__image { margin: calc(-1 * 1.5rem) calc(-1 * 1.5rem) 1rem; overflow: hidden; border-top-left-radius: 3px; border-top-right-radius: 3px; }
        .dm-card__image img { width: 100%; height: auto; display: block; object-fit: contain; }
      </style>
      <section class="dm-card" role="region">
        ${e}
        <slot></slot>
      </section>
    `}}customElements.define("dm-card",l);class c extends HTMLElement{static get observedAttributes(){return["variant"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}get variant(){return this.getAttribute("variant")||"info"}render(){const e=`dm-alert dm-alert--${this.variant}`;this.shadowRoot.innerHTML=`
      <style>
        .dm-alert { border-radius: 3px; padding: 0.4rem 1.25rem; border: 1px solid transparent; background: #f8fafc; color: #0f172a; font-size: 0.9rem; }
        .dm-alert--success { background: rgba(47, 133, 90, 0.12); border-color: #2f855a; }
        .dm-alert--warning { background: rgba(214, 158, 46, 0.14); border-color: #d69e2e; }
        .dm-alert--danger { background: rgba(229, 62, 62, 0.12); border-color: #e53e3e; }
        .dm-alert--info { background: rgba(14, 165, 233, 0.14); border-color: #0ea5e9; }
      </style>
      <div class="${e}" role="status">
        <slot></slot>
      </div>
    `}}customElements.define("dm-alert",c);class m extends HTMLElement{static get observedAttributes(){return["variant","duration"]}constructor(){super(),this.attachShadow({mode:"open"}),this._timeout=null}connectedCallback(){this.render();const e=Number(this.getAttribute("duration"))||4e3;this._timeout=window.setTimeout(()=>this.dismiss(),e)}attributeChangedCallback(){this.render()}disconnectedCallback(){window.clearTimeout(this._timeout)}get variant(){return this.getAttribute("variant")||"info"}render(){const e=`dm-toast dm-toast--${this.variant}`;this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; animation: dm-toast-enter 0.2s ease-out both; }

        .dm-toast {
          border-radius: 3px;
          padding: 0.8rem 1.25rem;
          border: 1px solid transparent;
          background: rgba(27, 78, 129, 0.92);
          color: white;
          box-shadow: 0 16px 20px rgba(15, 23, 42, 0.12);
          backdrop-filter: blur(8px);
          min-width: 280px;
          max-width: 360px;
          overflow-wrap: break-word;
        }

        .dm-toast--success { background: #2f855a; }
        .dm-toast--warning { background: #d69e2e; }
        .dm-toast--danger { background: #e53e3e; }
        .dm-toast--info { background: #0ea5e9; }

        @keyframes dm-toast-enter {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
      <div class="${e}" role="status" aria-live="polite">
        <slot></slot>
      </div>
    `}dismiss(){this.remove()}}customElements.define("dm-toast",m);class u extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          position: fixed;
          top: 1rem;
          right: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: min(360px, calc(100% - 2rem));
          z-index: 9999;
          pointer-events: none;
        }

        ::slotted(dm-toast) {
          pointer-events: auto;
        }
      </style>
      <slot></slot>
    `}show(e,s="info",r=4e3){const t=document.createElement("dm-toast");return t.setAttribute("variant",s),t.setAttribute("duration",String(r)),t.textContent=e,this.appendChild(t),t}}customElements.define("dm-toast-container",u);class b extends HTMLElement{static get observedAttributes(){return["open","title"]}constructor(){super(),this.attachShadow({mode:"open"}),this._onKeydown=this._onKeydown.bind(this),this._onOverlayClick=this._onOverlayClick.bind(this)}connectedCallback(){this.render(),this.open&&this._trapFocus()}attributeChangedCallback(e){e==="open"?(this.render(),this.open?this._trapFocus():this._releaseFocus()):e==="title"&&this.render()}get open(){return this.hasAttribute("open")}set open(e){e?this.setAttribute("open",""):this.removeAttribute("open")}get title(){return this.getAttribute("title")||this.dataset.title||""}show(){this.open=!0,this.render();const e=this.shadowRoot.querySelector(".dm-modal__dialog");e&&e.focus()}close(){this.open=!1,this.render(),this.dispatchEvent(new CustomEvent("dm:close",{bubbles:!0,composed:!0}))}_trapFocus(){document.addEventListener("keydown",this._onKeydown),document.body.style.overflow="hidden"}_releaseFocus(){document.removeEventListener("keydown",this._onKeydown),document.body.style.overflow=""}_onKeydown(e){e.key==="Escape"&&this.close()}_onOverlayClick(e){e.target.classList.contains("dm-modal__overlay")&&this.close()}render(){var s,r;this.open;const e=this.title;this.shadowRoot.innerHTML=`
      <style>
        :host { position: fixed; inset: 0; display: ${this.open?"flex":"none"}; align-items: center; justify-content: center; z-index: 10000; }
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
          <h2 class="dm-modal__title" id="modal-title">${e}</h2>
          <button class="dm-modal__close" type="button" aria-label="Close modal">×</button>
        </div>
        <div class="dm-modal__body">
          <slot></slot>
        </div>
      </div>
    `,(s=this.shadowRoot.querySelector(".dm-modal__overlay"))==null||s.addEventListener("click",this._onOverlayClick),(r=this.shadowRoot.querySelector(".dm-modal__close"))==null||r.addEventListener("click",()=>this.close())}}customElements.define("dm-modal",b);class h extends HTMLElement{static get observedAttributes(){return["brand"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}get brand(){return this.getAttribute("brand")||"Dumont"}render(){this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; }
        nav { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.25rem; background: white; border-radius: 3px; border: 1px solid rgba(15, 23, 42, 0.08); box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08); }
        .brand { font-weight: 700; color: #0f172a; text-decoration: none; }
        .links { display: flex; gap: 1rem; flex-wrap: wrap; }
        .links ::slotted(a) { color: #334155; text-decoration: none; font-size: 0.95rem; }
        .links ::slotted(a:hover), .links ::slotted(a:focus-visible) { color: #2c7be5; }
      </style>
      <nav aria-label="Primary navigation">
        <div class="brand">${this.brand}</div>
        <div class="links"><slot></slot></div>
      </nav>
    `}}customElements.define("dm-navbar",h);const n=document.querySelector("dm-toast-container"),p=document.querySelectorAll("[data-toast-message]");p.forEach(o=>{o.addEventListener("dm:click",()=>{const e=o.dataset.toastMessage,s=o.dataset.toastVariant||"info",r=Number(o.dataset.toastDuration)||4e3;n&&n.show(e,s,r)})});const g=document.querySelector("dm-modal"),f=document.querySelectorAll("[data-modal-title]");f.forEach(o=>{o.addEventListener("dm:click",()=>{const e=o.dataset.modalTitle||"Modal Dialog",s=o.dataset.modalContent||"This is a simple modal dialog.",r=g;r&&(r.setAttribute("title",e),r.innerHTML=`<p>${s}</p>`,r.show())})});
