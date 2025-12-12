customElements.define("c-label", class extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      label {
        font-family: var(--font-sans);
        color: var(--color-text);
        font-size: var(--font-size-sm);
        margin-bottom: var(--space-2);
        display: block;
      }
    `;

    const label = document.createElement("label");
    label.appendChild(document.createElement("slot"));

    shadow.append(style, label);
  }
});
