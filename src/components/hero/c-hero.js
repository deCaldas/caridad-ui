export class CHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["layout"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const layout = this.getAttribute("layout") || "centered";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
        }

        /* Hero Section */
        section {
          padding: var(--space-7, 64px) var(--space-5, 24px);

          /* Gradiente con tokens (editable por el consumidor) */
          background: linear-gradient(
            135deg,
            var(--hero-bg-start, var(--color-accent, #E53935)) 0%,
            var(--hero-bg-end, var(--color-accent-dark, #B71C1C)) 100%
          );

          color: var(--color-text, #fff);
          min-height: 500px;

          display: flex;
          align-items: center;
          justify-content: center;

          transition: background var(--motion-normal, 200ms ease);
        }

        .container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        /* Layouts */
        .content.centered {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-6, 32px);
        }

        .content.split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-7, 48px);
          align-items: center;
        }

        @media (max-width: 768px) {
          .content.split {
            grid-template-columns: 1fr;
            gap: var(--space-5, 24px);
          }
        }

        /* Text block */
        .text-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-5, 24px);
        }

        ::slotted([slot="title"]) {
          font-family: var(--font-mono, monospace);
          font-size: var(--font-size-4xl, 2.5rem);
          font-weight: 800;
          line-height: var(--line-height-tight, 1.2);
          margin: 0;
        }

        ::slotted([slot="subtitle"]) {
          font-size: var(--font-size-xl, 1.25rem);
          font-weight: 600;
          opacity: 0.95;
          margin: 0;
        }

        ::slotted([slot="description"]) {
          font-size: var(--font-size-lg, 1.125rem);
          line-height: var(--line-height-relaxed, 1.6);
          opacity: 0.9;
          margin: 0;
        }

        /* CTA zone */
        .cta-buttons {
          display: flex;
          gap: var(--space-4, 16px);
          flex-wrap: wrap;
        }

        .content.centered .cta-buttons {
          justify-content: center;
        }

        /* Media slot */
        .media-content {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        ::slotted([slot="media"]) {
          max-width: 100%;
          height: auto;

          border-radius: var(--radius-lg, 12px);
          box-shadow: var(--shadow-lg, 0 8px 20px rgba(0,0,0,0.5));

          transition: transform var(--motion-normal, 200ms ease),
                      box-shadow var(--motion-normal, 200ms ease);
        }

        ::slotted([slot="media"]:hover) {
          transform: scale(1.02);
        }
      </style>

      <section part="hero">
        <div class="container">
          <div class="content ${layout}">
            <div class="text-content">
              <slot name="title"></slot>
              <slot name="subtitle"></slot>
              <slot name="description"></slot>
              <div class="cta-buttons">
                <slot name="cta"></slot>
              </div>
            </div>
            ${layout === "split"
        ? '<div class="media-content"><slot name="media"></slot></div>'
        : ""
      }
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("c-hero", CHero);
