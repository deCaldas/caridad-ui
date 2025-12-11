export class CCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        @import "/src/styles/tokens.css";

        :host {
          display: block;
          font-family: var(--font-sans);
          color: var(--color-text);
        }

        article {
          background: var(--color-surface);
          border: var(--border-width) solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;

          transition: transform var(--motion-fast), 
                      box-shadow var(--motion-normal), 
                      border-color var(--motion-fast);

          box-shadow: var(--shadow-sm);

          height: 100%;
          display: flex;
          flex-direction: column;
        }

        article:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-accent);
        }

        /* ---------------------- HEADER ---------------------- */
        .card-header {
          padding: var(--space-5);
          border-bottom: var(--border-width) solid var(--border-color);
        }

        /* ---------------------- IMAGE ----------------------- */
        .card-image::slotted(*) {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        /* ---------------------- CONTENT ---------------------- */
        .card-content {
          padding: var(--space-5);
          flex: 1;
          color: var(--color-text);
        }

        /* ---------------------- FOOTER ----------------------- */
        .card-footer {
          padding: var(--space-5);
          border-top: var(--border-width) solid var(--border-color);
          background: var(--color-surface-alt);
        }

        /* ---------------------- TITLE SLOT ------------------- */
        ::slotted([slot="title"]) {
          font-family: var(--font-mono);
          font-size: var(--font-size-lg);
          line-height: var(--line-height-tight);
          margin: 0 0 var(--space-3) 0;
          color: var(--color-text);
        }

        /* ------------------- DESCRIPTION SLOT ------------------ */
        ::slotted([slot="description"]) {
          font-family: var(--font-sans);
          font-size: var(--font-size-md);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-muted);
          margin: 0;
        }
      </style>

      <article part="card">
        <slot name="image" class="card-image"></slot>

        <div class="card-header">
          <slot name="header"></slot>
        </div>

        <div class="card-content">
          <slot></slot>
        </div>

        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
      </article>
    `;
  }
}

customElements.define('c-card', CCard);
