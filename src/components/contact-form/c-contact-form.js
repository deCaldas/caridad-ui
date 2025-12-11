export const template = document.createElement('template');

template.innerHTML = `
  <style>
    @import url('/src/styles/tokens.css');

    :host {
      display: block;
      font-family: var(--font-sans);
      color: var(--color-text);
    }

    form {
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
      padding: var(--space-6) var(--space-5);
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
    }

    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-5);
    }

    @media (max-width: 768px) {
      .row {
        grid-template-columns: 1fr;
      }
    }

    /* ---------------------------- */
    /* Mensajes de estado           */
    /* ---------------------------- */
    .msg {
      padding: var(--space-4);
      border-radius: var(--radius-md);
      text-align: center;
      display: none;
      font-size: var(--font-size-sm);
      font-family: var(--font-mono);
      border: var(--border-width) solid transparent;
    }

    .msg.success {
      background: rgba(110, 231, 183, 0.08); /* success soft surface */
      color: #6ee7b7; /* success text (puedes tokenizar luego) */
      border-color: #6ee7b7;
    }

    .msg.error {
      background: rgba(252, 165, 165, 0.08); /* error soft surface */
      color: #fca5a5;
      border-color: #fca5a5;
    }

    :host([state="success"]) .msg.success { display: block; }
    :host([state="error"])   .msg.error   { display: block; }

    /* ---------------------------- */
    /* Acciones                     */
    /* ---------------------------- */
    .actions {
      display: flex;
      justify-content: center;
      padding-top: var(--space-3);
    }

    /* Animación suave del formulario */
    form,
    .msg {
      transition: all var(--motion-normal);
    }
  </style>

  <form novalidate>
      <div class="msg success" role="status">¡Mensaje enviado exitosamente!</div>
      <div class="msg error" role="alert">Error al enviar el mensaje. Intenta nuevamente.</div>

      <div class="row">
        <slot name="name"></slot>
        <slot name="email"></slot>
      </div>

      <slot name="subject"></slot>
      <slot name="message"></slot>

      <div class="actions">
        <slot name="submit"></slot>
      </div>
  </form>
`;

export class CContactForm extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector('form');
    this.form.addEventListener('submit', this._onSubmit.bind(this));
  }

  static get observedAttributes() {
    return ['state'];
  }

  attributeChangedCallback(name, _, value) {
    if (name === 'state') {
      this._announceStatus(value);
    }
  }

  _announceStatus(state) {
    if (state === 'success') {
      this._internals.setValidity({});
    }

    if (state === 'error') {
      this._internals.setValidity(
        { customError: true },
        "Hubo un error enviando el formulario."
      );
    }
  }

  get value() {
    return Object.fromEntries(new FormData(this.form));
  }

  reset() {
    this.form.reset();
    this.removeAttribute('state');
  }

  _onSubmit(e) {
    e.preventDefault();

    if (!this.form.checkValidity()) {
      this.form.reportValidity();
      return;
    }

    const data = this.value;

    this.dispatchEvent(new CustomEvent('form-submit', {
      detail: data,
      bubbles: true,
      composed: true
    }));

    this.setAttribute('state', 'success');

    setTimeout(() => this.reset(), 3000);
  }
}

customElements.define('c-contact-form', CContactForm);
