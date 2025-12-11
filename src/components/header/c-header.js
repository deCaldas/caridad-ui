export class CHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        @import "/src/styles/tokens.css";

        :host {
          display: block;
          width: 100%;
          background: var(--color-bg);
          color: var(--color-text);
        }

        header {
          padding: var(--space-6) var(--space-5);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        hgroup {
          margin: 0;
        }

        ::slotted([slot="title"]) {
          font-family: var(--font-mono);
          font-size: var(--font-size-xl);
          line-height: var(--line-height-tight);
          margin: 0;
          color: var(--color-text);
        }

        ::slotted([slot="subtitle"]) {
          font-family: var(--font-sans);
          font-size: var(--font-size-md);
          line-height: var(--line-height-normal);
          color: var(--color-text-muted);
          margin: 0;
        }

        nav {
          display: flex;
          gap: var(--space-4);
        }

        ::slotted([slot="nav"] a),
        nav a {
          color: var(--color-accent);
          font-family: var(--font-sans);
          font-size: var(--font-size-sm);
          text-decoration: none;
          transition: color var(--motion-fast);
        }

        ::slotted([slot="nav"] a:hover),
        nav a:hover {
          color: var(--color-accent-dark);
        }
      </style>

      <header>
        <hgroup>
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
        </hgroup>
        <nav>
          <slot name="nav"></slot>
        </nav>
      </header>
    `;
  }
}

customElements.define('c-header', CHeader);
