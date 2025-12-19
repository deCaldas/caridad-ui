// 1. Estilos compartidos optimizados (Constructable Stylesheets)
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  :host {
    display: block;
    --_bg: var(--color-surface, #ffffff);
    --_radius: var(--radius-lg, 8px);
    --_shadow: var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    --_spacing: var(--space-6, 1.5rem);
    font-family: system-ui, sans-serif;
  }

  /* Contenedor principal actúa como el form visual */
  .form-container {
    background: var(--_bg);
    border-radius: var(--_radius);
    box-shadow: var(--_shadow);
    padding: var(--_spacing);
    display: flex;
    flex-direction: column;
    gap: var(--space-5, 1rem);
  }

  /* Grid layout para campos agrupados */
  .grid-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-5, 1rem);
  }

  /* Mensajes de estado (Alertas) */
  .status-msg {
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
    display: none; /* Oculto por defecto */
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

  /* Estados controlados por atributo del host */
  :host([state="success"]) .status-msg.success { display: block; }
  :host([state="error"]) .status-msg.error { display: block; }
  
  /* Loading state: Deshabilitar interacción visualmente */
  :host([state="loading"]) .form-container { opacity: 0.7; pointer-events: none; }

  .status-msg.success {
    background-color: #ecfdf5;
    color: #047857;
    border: 1px solid #a7f3d0;
  }

  .status-msg.error {
    background-color: #fef2f2;
    color: #b91c1c;
    border: 1px solid #fca5a5;
  }

  .actions {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }
`);

const template = document.createElement('template');
template.innerHTML = `
  <div class="form-container" part="container">
    <div aria-live="polite" aria-atomic="true">
      <div class="status-msg success" part="msg-success">¡Enviado correctamente!</div>
      <div class="status-msg error" part="msg-error">Error al enviar. Verifica los datos.</div>
    </div>

    <form id="internal-form" novalidate>
      <div class="grid-row">
        <slot name="name"></slot>
        <slot name="email"></slot>
      </div>
      <slot name="subject"></slot>
      <slot name="message"></slot>
      <slot></slot> <div class="actions">
        <slot name="submit">
          <button type="submit">Enviar</button>
        </slot>
      </div>
    </form>
  </div>
`;

export class CContactForm extends HTMLElement {
  static get observedAttributes() {
    return ['state'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._form = this.shadowRoot.getElementById('internal-form');
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  connectedCallback() {
    this._form.addEventListener('submit', this._handleSubmit);
  }

  disconnectedCallback() {
    this._form.removeEventListener('submit', this._handleSubmit);
  }

  // API Pública: Estado
  get state() { return this.getAttribute('state') || 'idle'; }
  set state(val) {
    if (val) this.setAttribute('state', val);
    else this.removeAttribute('state');
  }

  /**
   * Recolecta datos de los inputs en el Light DOM (slots)
   */
  get value() {
    const data = {};
    // Buscamos inputs, selects y textareas dentro del host (Light DOM)
    const inputs = this.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      if (input.name && !input.disabled) {
        if (input.type === 'checkbox' || input.type === 'radio') {
          if (input.checked) data[input.name] = input.value;
        } else {
          data[input.name] = input.value;
        }
      }
    });
    return data;
  }

  /**
   * Resetea el formulario y el estado
   */
  reset() {
    this.removeAttribute('state');
    const inputs = this.querySelectorAll('input, textarea, select');
    inputs.forEach(input => input.value = ''); // Reset manual simple
  }

  _handleSubmit(e) {
    e.preventDefault();
    if (this.state === 'loading') return;

    // 1. Validación de inputs en Light DOM
    const inputs = this.querySelectorAll('input, textarea, select');
    let isValid = true;

    // Usar la validación nativa del navegador en cada input distribuido
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
        input.reportValidity(); // Muestra el popup nativo en el input correcto
      }
    });

    if (!isValid) {
      // Opcional: Podríamos poner state="error" aquí, pero el navegador ya mostró feedback
      return;
    }

    // 2. Transición a Loading
    this.state = 'loading';

    // 3. Emitir evento con los datos
    this.dispatchEvent(new CustomEvent('c-submit', {
      detail: {
        data: this.value,
        // Callbacks para que el padre controle el UI del componente
        success: () => {
          this.state = 'success';
          setTimeout(() => this.reset(), 3000); // Auto-reset opcional
        },
        error: (msg) => {
          this.state = 'error';
          if (msg) {
            // Lógica avanzada: inyectar mensaje de error específico si fuera necesario
            const errDiv = this.shadowRoot.querySelector('.status-msg.error');
            if (errDiv) errDiv.textContent = msg;
          }
        }
      },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('c-contact-form', CContactForm);