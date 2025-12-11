customElements.define("c-checkbox", class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        label {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          cursor: pointer;
        }

        input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: var(--color-accent);
        }
      </style>

      <label>
        <input type="checkbox"/>
        <slot></slot>
      </label>
    `;
  }
});
