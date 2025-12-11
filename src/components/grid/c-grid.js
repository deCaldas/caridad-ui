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

  render() {
    const cols = this.getAttribute("cols") || "3";
    const gap = this.getAttribute("gap") || "var(--space-6)";

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
