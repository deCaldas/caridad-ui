export class CFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        @import "/src/styles/tokens.css";

        :host {
          display: block;
          font-family: var(--font-sans);
          color: var(--color-text);
        }

        footer {
          background: var(--color-bg);
          color: var(--color-text);
          padding: var(--space-7) var(--space-6) var(--space-6);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-7);
          margin-bottom: var(--space-7);
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        /* ---------------------------- */
        /*  SLOTS                       */
        /* ---------------------------- */

        ::slotted([slot="logo"]) {
          font-family: var(--font-mono);
          font-size: var(--font-size-xl);
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: var(--space-2);
        }

        ::slotted(a) {
          color: var(--color-text-muted);
          text-decoration: none;
          transition: color var(--motion-fast);
          font-size: var(--font-size-sm);
          line-height: var(--line-height-normal);
        }

        ::slotted(a:hover) {
          color: var(--color-text);
        }

        /* ---------------------------- */
        /*  FOOTER BOTTOM               */
        /* ---------------------------- */

        .footer-bottom {
          padding-top: var(--space-6);
          border-top: 1px solid rgba(255, 255, 255, 0.1); /* puedes tokenizarlo si deseas */
          text-align: center;
          font-size: var(--font-size-sm);
          opacity: 0.75;
          line-height: var(--line-height-normal);
        }

        /* ---------------------------- */
        /*  RESPONSIVE                  */
        /* ---------------------------- */

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }
        }
      </style>

      <footer part="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <slot name="logo"></slot>
              <slot name="about"></slot>
            </div>
            <div class="footer-section">
              <slot name="links"></slot>
            </div>
            <div class="footer-section">
              <slot name="social"></slot>
            </div>
          </div>
          <div class="footer-bottom">
            <slot name="copyright"></slot>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("c-footer", CFooter);
