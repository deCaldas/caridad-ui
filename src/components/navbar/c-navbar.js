export class CNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        nav {
          width: 100%;
          background: var(--color-bg);
          padding: var(--space-4) var(--space-6);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .left,
        .right {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }
      </style>

      <nav part="nav">
        <div class="left">
          <slot name="logo"></slot>
          <slot name="links"></slot>
        </div>
        <div class="right">
          <slot name="actions"></slot>
        </div>
      </nav>
    `;
    }
}

customElements.define("c-navbar", CNavbar);
