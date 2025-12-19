// 1. Definimos los estilos fuera para aprovechar Constructable Stylesheets (Rendimiento y Caché)
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  :host {
    display: block;
    font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
    contain: content; /* Optimización de renderizado */
  }

  section {
    padding: var(--space-7, 4rem) var(--space-5, 1.5rem);
    background: linear-gradient(
      135deg,
      var(--hero-bg-start, var(--color-accent, #E53935)) 0%,
      var(--hero-bg-end, var(--color-accent-dark, #B71C1C)) 100%
    );
    color: var(--color-text, #fff);
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
  }

  .container {
    max-width: 1200px;
    width: 100%;
    margin-inline: auto; /* Lógica moderna de propiedades lógicas */
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-6, 2rem);
    transition: all 0.3s ease;
  }

  /* LAYOUT: Centered (Default) */
  .content:not(.is-split) {
    text-align: center;
  }

  /* LAYOUT: Split */
  .content.is-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-7, 3rem);
    align-items: center;
    text-align: left;
  }

  /* Responsive para layout split */
  @media (max-width: 768px) {
    .content.is-split {
      grid-template-columns: 1fr;
      gap: var(--space-5, 1.5rem);
      text-align: center; /* Fallback elegante en móvil */
    }
    
    /* En móvil, cambiamos el orden visual si es necesario */
    .content.is-split .media-wrapper {
        order: -1; 
    }
  }

  .text-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-4, 1.5rem);
  }
  
  /* Alineación de botones según layout */
  .cta-wrapper {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .content:not(.is-split) .cta-wrapper {
    justify-content: center;
  }

  .media-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    /* Si no es split, ocultamos el media wrapper visualmente pero lo mantenemos en el DOM */
    /* Opcional: display: none si queremos removerlo del flujo completamente */
  }
  
  .content:not(.is-split) .media-wrapper {
    display: none; 
  }

  /* Styling de Slots por defecto (Opcional, con menor especificidad) */
  ::slotted([slot="title"]) {
    margin: 0;
    font-size: var(--fs-4xl, 2.5rem);
    line-height: 1.1;
    font-weight: 800;
  }
  
  ::slotted([slot="media"]) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-lg, 12px);
    box-shadow: var(--shadow-lg, 0 10px 25px -5px rgba(0, 0, 0, 0.3));
  }
`);

// 2. Definimos el template HTML estático una sola vez
const template = document.createElement('template');
template.innerHTML = `
  <section part="base">
    <div class="container">
      <div class="content" id="layout-target">
        
        <div class="text-wrapper">
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
          <slot name="description"></slot>
          <div class="cta-wrapper">
            <slot name="cta"></slot>
          </div>
        </div>

        <div class="media-wrapper">
          <slot name="media"></slot>
        </div>

      </div>
    </div>
  </section>
`;

export class CHero extends HTMLElement {
  static get observedAttributes() {
    return ["layout"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // Adoptar estilos compartidos (Rendimiento +++)
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  connectedCallback() {
    // Clonar template y añadir al Shadow DOM (Solo una vez)
    if (!this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // Inicializar estado basado en atributos presentes
    this._updateLayout();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === "layout") {
      this._updateLayout();
    }
  }

  // 3. Sincronización de Propiedades (DX +++)
  get layout() {
    return this.getAttribute("layout") || "centered";
  }

  set layout(value) {
    if (value) {
      this.setAttribute("layout", value);
    } else {
      this.removeAttribute("layout");
    }
  }

  // 4. Lógica de UI separada y no destructiva
  _updateLayout() {
    const layoutTarget = this.shadowRoot.getElementById('layout-target');
    if (!layoutTarget) return;

    const currentLayout = this.layout;
    const isValid = ["centered", "split"].includes(currentLayout);
    const finalLayout = isValid ? currentLayout : "centered";

    // Manipulación de clases mediante ClassList (Rápido y limpio)
    if (finalLayout === 'split') {
      layoutTarget.classList.add('is-split');
    } else {
      layoutTarget.classList.remove('is-split');
    }
  }
}

customElements.define("c-hero", CHero);