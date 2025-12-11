export class CInput extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        @import "/src/styles/tokens.css";

        :host {
          display: block;
          font-family: var(--font-sans);
        }

        label {
          display: block;
          margin-bottom: var(--space-2);
          font-weight: 600;
          color: var(--color-text);
          font-size: var(--font-size-sm);
          line-height: var(--line-height-normal);
        }

        .input-wrapper {
          position: relative;
        }

        input {
          width: 100%;
          padding: var(--space-3) var(--space-4);
          border: var(--border-width) solid var(--border-color);
          border-radius: var(--radius-md);

          font-size: var(--font-size-md);
          font-family: var(--font-sans);

          transition:
            border-color var(--motion-fast),
            box-shadow var(--motion-fast),
            background var(--motion-fast),
            color var(--motion-fast);

          background: var(--color-surface);
          color: var(--color-text);
          box-sizing: border-box;
        }

        input::placeholder {
          color: var(--color-text-muted);
        }

        /* Focus: borde acento + glow sutil */
        input:focus {
          outline: none;
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.2);
        }

        /* Estado inválido */
        input:invalid,
        :host([invalid]) input {
          border-color: var(--color-accent);
        }

        :host([invalid]) input:focus {
          box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.25);
        }

        .error {
          color: var(--color-accent);
          font-size: var(--font-size-sm);
          margin-top: var(--space-2);
          display: none;
        }

        :host([invalid]) .error {
          display: block;
        }
      </style>

      <label part="label"><slot name="label">Label</slot></label>

      <div class="input-wrapper">
        <input part="input" />
      </div>

      <span class="error" part="error">Campo inválido</span>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._input = this.shadowRoot.querySelector('input');
    this._error = this.shadowRoot.querySelector('.error');
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    if (this.hasAttribute('type')) {
      this._input.type = this.getAttribute('type');
    }

    if (this.hasAttribute('placeholder')) {
      this._input.placeholder = this.getAttribute('placeholder');
    }

    if (this.hasAttribute('value')) {
      this._input.value = this.getAttribute('value');
    }

    if (this.hasAttribute('required')) {
      this._input.required = true;
    }

    this._input.addEventListener('input', () => this._onInput());
  }

  _onInput() {
    const value = this._input.value;
    this._internals.setFormValue(value);
    this.dispatchEvent(new CustomEvent('value-change', {
      detail: { value },
      bubbles: true,
      composed: true
    }));
    this.validate();
  }

  validate() {
    const valid = this._input.checkValidity();
    this.toggleAttribute('invalid', !valid);
    return valid;
  }

  get value() {
    return this._input.value;
  }

  set value(val) {
    this._input.value = val;
    this._internals.setFormValue(val);
  }
}

customElements.define('c-input', CInput);
