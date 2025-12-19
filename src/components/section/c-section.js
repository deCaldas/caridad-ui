/**
 * Definición de estilos compartidos (Constructable Stylesheet).
 * Se parsean una sola vez por el navegador, no por instancia.
 */
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  :host {
    display: block;
    font-family: var(--font-sans, system-ui, sans-serif);
    color: var(--color-text, #333);
    /* Valores por defecto */
    --_bg: var(--color-bg, #fff);
    --_padding: var(--space-7, 3rem) var(--space-5, 1.5rem);
    --_text-color: var(--color-text, #333);
  }

  /* --- VARIANTES (Manejadas vía selectores de atributo) --- */
  
  :host([variant="primary"]) {
    --_bg: var(--color-surface, #f5f5f5);
  }

  :host([variant="secondary"]) {
    --_bg: var(--color-surface-alt, #e0e0e0);
  }

  :host([variant="accent"]) {
    --_bg: var(--color-accent, #007bff);
    --_text-color: var(--color-text-inverse, #fff);
  }

  /* --- PADDINGS --- */

  :host([padding="none"]) {
    --_padding: 0;
  }

  :host([padding="small"]) {
    --_padding: var(--space-5, 1.5rem) var(--space-4, 1rem);
  }

  :host([padding="large"]) {
    --_padding: var(--space-9, 5rem) var(--space-6, 2rem);
  }

  /* --- ESTRUCTURA --- */

  section {
    background: var(--_bg);
    padding: var(--_padding);
    color: var(--_text-color);
    transition: background 0.3s ease, color 0.3s ease, padding 0.3s ease;
  }

  .container {
    max-width: 1200px;
    margin-inline: auto;
    width: 100%;
  }

  header {
    text-align: center;
    margin-bottom: var(--space-7, 3rem);
  }

  /* Ocultar header si no hay título ni subtítulo (opcional, vía JS o CSS :has si soporte permite) */
  header:empty {
    display: none;
  }

  /* Styling de Slots */
  ::slotted([slot="title"]) {
    font-family: var(--font-mono, monospace);
    font-size: var(--font-size-2xl, 2rem);
    line-height: 1.2;
    margin: 0 0 var(--space-3, 1rem) 0;
    color: inherit;
  }

  ::slotted([slot="subtitle"]) {
    font-size: var(--font-size-lg, 1.25rem);
    opacity: 0.85;
    margin: 0;
    color: inherit;
  }

  .content {
    font-size: var(--font-size-md, 1rem);
    line-height: 1.6;
  }
`);

/**
 * Plantilla HTML estática.
 */
const template = document.createElement('template');
template.innerHTML = `
  <section part="section">
    <div class="container">
      <header part="header">
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
      </header>
      <div class="content" part="content">
        <slot></slot>
      </div>
    </div>
  </section>
`;

export class CSection extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'padding'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // --- API PÚBLICA (Reflejo de Propiedades) ---

  get variant() {
    return this.getAttribute('variant') || 'default';
  }

  set variant(value) {
    if (value) {
      this.setAttribute('variant', value);
    } else {
      this.removeAttribute('variant');
    }
  }

  get padding() {
    return this.getAttribute('padding') || 'normal';
  }

  set padding(value) {
    if (value) {
      this.setAttribute('padding', value);
    } else {
      this.removeAttribute('padding');
    }
  }

  // --- CICLO DE VIDA ---

  attributeChangedCallback(name, oldValue, newValue) {
    // Gracias a los selectores :host([attr="val"]) en CSS,
    // NO necesitamos renderizar nada aquí. El navegador actualiza
    // el estilo automáticamente cuando cambia el atributo.
    // Esto es "Zero-Cost Update".
  }
}

customElements.define('c-section', CSection);