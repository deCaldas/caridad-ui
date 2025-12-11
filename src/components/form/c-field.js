customElements.define("c-field", class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        .field {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
        }
      </style>

      <div class="field">
        <slot name="label"></slot>
        <slot name="control"></slot>
        <slot name="hint"></slot>
      </div>
    `;
    }
});
