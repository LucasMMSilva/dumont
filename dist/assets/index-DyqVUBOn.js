(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();class i extends HTMLElement{static get observedAttributes(){return["variant","size","disabled"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}get variant(){return this.getAttribute("variant")||"primary"}get size(){return this.getAttribute("size")||"medium"}get disabled(){return this.hasAttribute("disabled")}render(){const r=this.disabled?"disabled":"",o=`dm-btn dm-btn--${this.variant}`,s=this.size!=="medium"?`dm-btn--${this.size}`:"";this.shadowRoot.innerHTML=`
      <style>
        :host { display: inline-block; }
        .dm-btn { all: unset; display: inline-flex; align-items: center; justify-content: center; padding: 0.75rem 1rem; border-radius: 0.75rem; cursor: pointer; font: inherit; border: 1px solid transparent; transition: transform 0.2s ease, background-color 0.2s ease; }
        .dm-btn:hover { transform: translateY(-1px); }
        .dm-btn:focus-visible { outline: 3px solid rgba(44, 123, 229, 0.35); outline-offset: 2px; }
        .dm-btn--primary { background: #2c7be5; color: white; }
        .dm-btn--secondary { background: #6f42c1; color: white; }
        .dm-btn--success { background: #2f855a; color: white; }
        .dm-btn--danger { background: #e53e3e; color: white; }
        .dm-btn--warning { background: #d69e2e; color: #0f172a; }
        .dm-btn--info { background: #0ea5e9; color: white; }
        .dm-btn--small { padding: 0.5rem 0.75rem; font-size: 0.875rem; }
        .dm-btn--large { padding: 1rem 1.25rem; font-size: 1.125rem; }
        .dm-btn[disabled] { opacity: 0.5; cursor: not-allowed; transform: none; }
      </style>
      <button class="${o} ${s}" ${r}>
        <slot></slot>
      </button>
    `,this.shadowRoot.querySelector("button").addEventListener("click",e=>{if(this.disabled){e.preventDefault();return}this.dispatchEvent(new CustomEvent("dm:click",{bubbles:!0,composed:!0}))})}}customElements.define("dm-button",i);class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; }
        .dm-card { background: white; border-radius: 1rem; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.12); border: 1px solid rgba(15, 23, 42, 0.06); padding: 1.5rem; }
      </style>
      <section class="dm-card" role="region">
        <slot></slot>
      </section>
    `}}customElements.define("dm-card",d);class l extends HTMLElement{static get observedAttributes(){return["variant"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}get variant(){return this.getAttribute("variant")||"info"}render(){const r=`dm-alert dm-alert--${this.variant}`;this.shadowRoot.innerHTML=`
      <style>
        .dm-alert { border-radius: 0.75rem; padding: 1rem 1.25rem; border: 1px solid transparent; background: #f8fafc; color: #0f172a; }
        .dm-alert--success { background: rgba(47, 133, 90, 0.12); border-color: #2f855a; }
        .dm-alert--warning { background: rgba(214, 158, 46, 0.14); border-color: #d69e2e; }
        .dm-alert--danger { background: rgba(229, 62, 62, 0.12); border-color: #e53e3e; }
        .dm-alert--info { background: rgba(14, 165, 233, 0.14); border-color: #0ea5e9; }
      </style>
      <div class="${r}" role="status">
        <slot></slot>
      </div>
    `}}customElements.define("dm-alert",l);class c extends HTMLElement{static get observedAttributes(){return["brand"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}get brand(){return this.getAttribute("brand")||"Dumont"}render(){this.shadowRoot.innerHTML=`
      <style>
        :host { display: block; }
        nav { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.25rem; background: white; border-radius: 1rem; border: 1px solid rgba(15, 23, 42, 0.08); box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08); }
        .brand { font-weight: 700; color: #0f172a; text-decoration: none; }
        .links { display: flex; gap: 1rem; flex-wrap: wrap; }
        .links ::slotted(a) { color: #334155; text-decoration: none; font-size: 0.95rem; }
        .links ::slotted(a:hover), .links ::slotted(a:focus-visible) { color: #2c7be5; }
      </style>
      <nav aria-label="Primary navigation">
        <div class="brand">${this.brand}</div>
        <div class="links"><slot></slot></div>
      </nav>
    `}}customElements.define("dm-navbar",c);
