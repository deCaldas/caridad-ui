customElements.define("c-textarea", class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        textarea {
          width: 100%;
          min-height: 120px;
          background: var(--color-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: var(--space-4);
          font-family: var(--font-sans);
          font-size: var(--font-size-md);
          color: var(--color-text);
        }

        textarea:focus {
          border-color: var(--color-accent);
          outline: none;
        }
      </style>
      <textarea></textarea>
    `;
  }
});
