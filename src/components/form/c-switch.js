customElements.define("c-switch", class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        .switch {
          width: 42px;
          height: 22px;
          background: var(--color-surface);
          border-radius: 50px;
          position: relative;
          cursor: pointer;
        }

        .thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          background: var(--color-text);
          border-radius: 50%;
          transition: transform var(--motion-fast);
        }

        :host([checked]) .thumb {
          transform: translateX(20px);
        }
      </style>

      <div class="switch">
        <div class="thumb"></div>
      </div>
    `;
    }
});
