export class EHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background: var(--color-bg, #f4f4f4);
          padding: 1rem;
        }
        h1, h2 {
          margin: 0;
          color: var(--color-heading, #333);
        }
        nav a {
          color: var(--color-link, #0077cc);
          text-decoration: none;
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
customElements.define('e-header', EHeader);
