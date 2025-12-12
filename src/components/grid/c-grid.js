export class CGrid extends HTMLElement {
  static get observedAttributes() {
    return ["cols", "gap"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  // --- Seguridad ---
  sanitizeCols(value) {
    // Solo acepta números entre 1 y 12
    const num = parseInt(value, 10);
    if (Number.isInteger(num) && num >= 1 && num <= 12) return num;
    return 3;
  }

  sanitizeGap(value) {
    // Lista blanca basada en tokens de spacing de tu design system
    const allowed = [
      "var(--space-1)",
      "var(--space-2)",
      "var(--space-3)",
      "var(--space-4)",
      "var(--space-5)",
      "var(--space-6)",
      "0",
      "4px",
      "8px",
      "12px",
      "16px",
    ];
    return allowed.includes(value) ? value : "var(--space-6)";
  }

  render() {
    const rawCols = this.getAttribute("cols");
    const rawGap = this.getAttribute("gap");

    const cols = this.sanitizeCols(rawCols || "3");
    const gap = this.sanitizeGap(rawGap || "var(--space-6)");

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }

        .grid {
          display: grid;
          grid-template-columns: repeat(${cols}, minmax(0, 1fr));
          gap: ${gap};
        }

        @media (max-width: 768px) {
          .grid { grid-template-columns: 1fr; }
        }
      </style>

      <div class="grid">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("c-grid", CGrid);
