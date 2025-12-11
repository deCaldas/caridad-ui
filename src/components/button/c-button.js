export class CButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['variant', 'size', 'disabled'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'md';
    const disabled = this.hasAttribute('disabled');

    this.shadowRoot.innerHTML = `
      <style>
        @import "/src/styles/tokens.css";

        :host {
          display: inline-block;
        }

        button {
          font-family: var(--font-mono);
          font-weight: 600;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: background var(--motion-fast), 
                      color var(--motion-fast),
                      box-shadow var(--motion-fast),
                      transform var(--motion-fast);

          border: var(--border-width) solid transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          line-height: 1;
          background: transparent;
          color: var(--color-text);
        }

        button:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 2px;
        }

        /* ------------------------- */
        /* Sizes (Caridad UI scale) */
        /* ------------------------- */

        button.sm {
          padding: var(--space-2) var(--space-4);
          font-size: var(--font-size-sm);
        }

        button.md {
          padding: var(--space-3) var(--space-5);
          font-size: var(--font-size-md);
        }

        button.lg {
          padding: var(--space-4) var(--space-6);
          font-size: var(--font-size-lg);
        }

        /* ------------------------- */
        /* Variants                  */
        /* ------------------------- */

        /* PRIMARY → Usa color-accent */
        button.primary {
          background: var(--color-accent);
          color: var(--color-text);
          border-color: var(--color-accent);
        }

        button.primary:hover:not(:disabled) {
          background: var(--color-accent-dark);
          border-color: var(--color-accent-dark);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        /* SECONDARY → beige / surface contrast */
        button.secondary {
          background: var(--color-neutral-beige);
          color: var(--color-bg);
          border-color: var(--color-neutral-beige);
        }

        button.secondary:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        /* OUTLINE */
        button.outline {
          background: transparent;
          color: var(--color-accent);
          border-color: var(--color-accent);
        }

        button.outline:hover:not(:disabled) {
          background: var(--color-accent);
          color: var(--color-text);
        }

        /* GHOST */
        button.ghost {
          background: transparent;
          color: var(--color-text-muted);
          border-color: transparent;
        }

        button.ghost:hover:not(:disabled) {
          background: var(--color-surface-alt);
        }

        /* DISABLED */
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        button:active:not(:disabled) {
          transform: translateY(0);
        }
      </style>

      <button 
        class="${variant} ${size}"
        ${disabled ? 'disabled' : ''}
        part="button"
      >
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('c-button', CButton);
