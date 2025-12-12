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
      background: rgba(110, 231, 183, 0.08);
      color: #6ee7b7;
      border-color: #6ee7b7;
    }

    .msg.error {
      background: rgba(252, 165, 165, 0.08);
      color: #fca5a5;
      border-color: #fca5a5;
    }

    :host([state="success"]) .msg.success { display: block; }
    :host([state="error"])   .msg.error   { display: block; }

    .actions {
      display: flex;
      justify-content: center;
      padding-top: var(--space-3);
    }

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

    // Rate limiting interno (3s)
    this._lastSubmit = 0;
    this._submitThrottle = 3000;

    this._internals = this.attachInternals();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector('form');
    this.form.addEventListener('submit', this._onSubmit.bind(this));

    // Blindar slots contra XSS
    this._protectSlots();
  }

  // -------------------------
  // 🔰 Protección Anti-XSS para Slots
  // -------------------------
  _sanitizeNode(node) {
    if (!node) return null;

    // Elementos prohibidos
    const forbiddenTags = ['script', 'iframe', 'object', 'embed', 'link'];
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (forbiddenTags.includes(node.tagName.toLowerCase())) {
        node.remove();
        return null;
      }

      // Remover atributos on*
      [...node.attributes].forEach(attr => {
        if (attr.name.startsWith('on')) node.removeAttribute(attr.name);
      });
    }

    // Sanitizar hijos recursivamente
    [...node.childNodes].forEach(child => this._sanitizeNode(child));

    return node;
  }

  _protectSlots() {
    const slots = this.shadowRoot.querySelectorAll('slot');
    slots.forEach(slot => {
      slot.addEventListener('slotchange', () => {
        slot.assignedNodes().forEach(n => this._sanitizeNode(n));
      });
    });
  }

  // -------------------------
  // Observación de atributos
  // -------------------------
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

  // -------------------------
  // API del formulario
  // -------------------------
  get value() {
    return Object.fromEntries(new FormData(this.form));
  }

  reset() {
    this.form.reset();
    this.removeAttribute('state');
  }

  // -------------------------
  // Submit + Rate Limiting
  // -------------------------
  _onSubmit(e) {
    e.preventDefault();

    // Rate limiting
    const now = Date.now();
    if (now - this._lastSubmit < this._submitThrottle) {
      this.setAttribute('state', 'error');
      return;
    }
    this._lastSubmit = now;

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
