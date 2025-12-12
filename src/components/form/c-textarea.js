customElements.define("c-textarea", class extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return []; // opcional, manejaré todo en connectedCallback
  }

  connectedCallback() {
    this.render();
  }

  // Sanitiza atributos para prevenir XSS
  sanitize(value) {
    if (typeof value !== "string") return "";
    return value.replace(/[&<>"']/g, char => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      return map[char];
    });
  }

  // Construir textarea con todos los atributos permitidos
  render() {
    // Clonamos todos los atributos del custom element
    const attrs = [...this.attributes]
      .map(attr => `${attr.name}="${this.sanitize(attr.value)}"`)
      .join(" ");

    this.shadow.innerHTML = `
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

      <textarea ${attrs}></textarea>
    `;
  }

  attributeChangedCallback() {
    this.render();
  }
});
