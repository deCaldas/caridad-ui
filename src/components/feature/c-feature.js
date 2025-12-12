// Función de sanitización básica para atributos
function sanitizeAttribute(value) {
  if (!value) return "";
  return value.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

export class CFeature extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["layout", "icon-style"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    // Leer atributos
    const rawLayout = this.getAttribute("layout") || "vertical";
    const rawIconStyle = this.getAttribute("icon-style") || "circle";

    // Sanitizar atributos
    const layout = sanitizeAttribute(rawLayout);
    const iconStyle = sanitizeAttribute(rawIconStyle);

    // Validar atributos contra lista blanca
    const VALID_LAYOUTS = ["vertical", "horizontal"];
    const VALID_ICON_STYLES = ["circle", "square", "none"];

    const safeLayout =
      VALID_LAYOUTS.includes(layout) ? layout : "vertical";

    const safeIconStyle =
      VALID_ICON_STYLES.includes(iconStyle) ? iconStyle : "circle";

    // Render seguro
    this.shadowRoot.innerHTML = `
      <style>
        @import "/src/styles/tokens.css";

        :host {
          display: block;
          font-family: var(--font-sans);
          color: var(--color-text);
        }

        .feature {
          display: flex;
          flex-direction: ${safeLayout === "horizontal" ? "row" : "column"};
          gap: var(--space-5);
          align-items: ${safeLayout === "horizontal" ? "flex-start" : "center"};
          text-align: ${safeLayout === "horizontal" ? "left" : "center"};
        }

        .icon-wrapper {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;

          width: var(--space-8);
          height: var(--space-8);

          background: var(--color-accent);
          color: var(--color-text);

          font-size: var(--font-size-xl);
          box-shadow: var(--shadow-sm);
          transition: background var(--motion-fast), color var(--motion-fast);
        }

        .icon-wrapper.circle {
          border-radius: var(--radius-lg);
        }

        .icon-wrapper.square {
          border-radius: var(--radius-sm);
        }

        .icon-wrapper.none {
          background: transparent;
          color: var(--color-accent);
          box-shadow: none;
        }

        .content {
          flex: 1;
        }

        ::slotted([slot="title"]) {
          font-family: var(--font-mono);
          font-size: var(--font-size-lg);
          line-height: var(--line-height-tight);
          margin: 0 0 var(--space-2) 0;
          color: var(--color-text);
          font-weight: 600;
        }

        ::slotted([slot="description"]) {
          font-family: var(--font-sans);
          font-size: var(--font-size-md);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-muted);
          margin: 0;
        }
      </style>

      <div class="feature" part="feature">
        <div class="icon-wrapper ${safeIconStyle}">
          <slot name="icon">✨</slot>
        </div>

        <div class="content">
          <slot name="title"></slot>
          <slot name="description"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("c-feature", CFeature);
