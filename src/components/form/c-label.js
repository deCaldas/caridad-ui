customElements.define("c-label", class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        label {
          font-family: var(--font-sans);
          color: var(--color-text);
          font-size: var(--font-size-sm);
          margin-bottom: var(--space-2);
          display: block;
        }
      </style>
      <label><slot></slot></label>
    `;
    }
});
