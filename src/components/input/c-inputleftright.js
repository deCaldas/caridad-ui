export class CInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }

        .wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: var(--color-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0 var(--space-4);
          transition: border var(--motion-fast);
        }

        .wrapper:focus-within {
          border-color: var(--color-accent);
        }

        input {
          flex: 1;
          background: transparent;
          border: none;
          padding: var(--space-3) 0;
          font-size: var(--font-size-md);
          color: var(--color-text);
          outline: none;
          font-family: var(--font-sans);
        }

        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted);
          margin-right: var(--space-3);
          margin-left: var(--space-3);
        }
      </style>

      <div class="wrapper">
        <slot name="icon-left" class="icon"></slot>
        <input type="${this.getAttribute("type") || "text"}"
               placeholder="${this.getAttribute("placeholder") || ""}"/>
        <slot name="icon-right" class="icon"></slot>
      </div>
    `;
    }
}

customElements.define("c-input", CInput);
