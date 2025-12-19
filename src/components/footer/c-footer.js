/**
 * @element c-footer
 * @description Pie de página accesible y configurable
 * @slot logo - Logo o marca del sitio
 * @slot about - Información "Acerca de"
 * @slot links - Enlaces de navegación
 * @slot social - Enlaces a redes sociales
 * @slot copyright - Información de copyright
 * 
 * @attr {string} variant - Variante visual (default | minimal)
 * @attr {boolean} condensed - Modo compacto para móviles
 * @attr {string} year - Año de copyright automático
 * 
 * @csspart footer - Contenedor principal del footer
 * @csspart container - Contenedor con ancho máximo
 * @csspart content - Área de contenido principal
 * @csspart section - Cada sección del footer
 * @csspart bottom - Área inferior con copyright
 * 
 * @event footer-ready - Se dispara cuando el componente está listo
 * @event link-click - Se dispara cuando se hace clic en un enlace slotado
 */
export class CFooter extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'condensed', 'year'];
  }

  constructor() {
    super();

    // Shadow DOM con delegate focus para mejor accesibilidad
    this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    });

    this._styles = this._createStyles();
    this._template = this._createTemplate();

    // Estado interno
    this._isCondensed = false;
    this._variant = 'default';
    this._currentYear = new Date().getFullYear();

    // Bind handlers
    this._handleSlotChange = this._handleSlotChange.bind(this);
    this._handleLinkClick = this._handleLinkClick.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.appendChild(this._styles.cloneNode(true));
    this.shadowRoot.appendChild(this._template.content.cloneNode(true));

    // Referencias a elementos importantes
    this._footer = this.shadowRoot.querySelector('footer');
    this._copyrightSlot = this.shadowRoot.querySelector('slot[name="copyright"]');
    this._linkSlots = this.shadowRoot.querySelectorAll('slot[name="links"], slot[name="social"]');

    // Configurar listeners
    this._setupEventListeners();

    // Aplicar atributos iniciales
    this._updateFromAttributes();

    // Disparar evento de ready
    this.dispatchEvent(new CustomEvent('footer-ready', {
      bubbles: true,
      detail: { component: this }
    }));
  }

  disconnectedCallback() {
    this._cleanupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'variant':
        this._variant = newValue || 'default';
        this._updateVariant();
        break;
      case 'condensed':
        this._isCondensed = newValue !== null;
        this._updateLayout();
        break;
      case 'year':
        this._updateCopyright();
        break;
    }
  }

  // Propiedades públicas
  get variant() {
    return this._variant;
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  get condensed() {
    return this._isCondensed;
  }

  set condensed(value) {
    if (value) {
      this.setAttribute('condensed', '');
    } else {
      this.removeAttribute('condensed');
    }
  }

  get year() {
    return this.getAttribute('year') || this._currentYear.toString();
  }

  set year(value) {
    this.setAttribute('year', value);
  }

  // Métodos privados
  _createStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
        color: var(--color-text, #333);
        --footer-bg: var(--color-bg, #fff);
        --footer-text: var(--color-text, #333);
        --footer-text-muted: var(--color-text-muted, #666);
        --footer-border: var(--color-border, rgba(0, 0, 0, 0.1));
        --space-2: 0.5rem;
        --space-4: 1rem;
        --space-6: 1.5rem;
        --space-7: 2rem;
        --font-size-sm: 0.875rem;
        --font-size-xl: 1.5rem;
        --line-height-normal: 1.5;
        --motion-fast: 150ms ease;
      }

      :host([variant="minimal"]) {
        --footer-bg: transparent;
        --footer-border: transparent;
      }

      footer {
        background: var(--footer-bg);
        color: var(--footer-text);
        padding: var(--space-7) var(--space-6) var(--space-6);
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        box-sizing: border-box;
      }

      .footer-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-7);
        margin-bottom: var(--space-7);
      }

      :host([condensed]) .footer-content {
        gap: var(--space-4);
        margin-bottom: var(--space-4);
      }

      .footer-section {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
      }

      /* Slot styling con mayor especificidad */
      slot[name="logo"]::slotted(*) {
        font-family: var(--font-mono, monospace);
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--footer-text);
        margin-bottom: var(--space-2);
      }

      /* Mejor soporte para enlaces slotados */
      ::slotted(a) {
        color: var(--footer-text-muted);
        text-decoration: none;
        transition: color var(--motion-fast);
        font-size: var(--font-size-sm);
        line-height: var(--line-height-normal);
        outline: none;
      }

      ::slotted(a:hover),
      ::slotted(a:focus) {
        color: var(--footer-text);
        text-decoration: underline;
      }

      ::slotted(a:focus-visible) {
        outline: 2px solid var(--color-primary, #007bff);
        outline-offset: 2px;
        border-radius: 2px;
      }

      .footer-bottom {
        padding-top: var(--space-6);
        border-top: 1px solid var(--footer-border);
        text-align: center;
        font-size: var(--font-size-sm);
        opacity: 0.75;
        line-height: var(--line-height-normal);
      }

      :host([condensed]) .footer-bottom {
        padding-top: var(--space-4);
      }

      /* Responsive */
      @media (max-width: 768px) {
        .footer-content {
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }

        :host([condensed]) .footer-content {
          gap: var(--space-4);
        }
      }

      /* Screen reader only */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `;
    return style;
  }

  _createTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <footer part="footer" role="contentinfo" aria-label="Pie de página">
        <div class="container" part="container">
          <div class="footer-content" part="content">
            <div class="footer-section" part="section">
              <slot name="logo">
                <span class="logo-placeholder">Logo</span>
              </slot>
              <slot name="about">
                <p class="about-placeholder">Información sobre la compañía</p>
              </slot>
            </div>
            <div class="footer-section" part="section">
              <h3 class="sr-only">Enlaces rápidos</h3>
              <slot name="links"></slot>
            </div>
            <div class="footer-section" part="section">
              <h3 class="sr-only">Redes sociales</h3>
              <slot name="social"></slot>
            </div>
          </div>
          <div class="footer-bottom" part="bottom">
            <slot name="copyright">
              © ${this._currentYear} Todos los derechos reservados
            </slot>
          </div>
        </div>
      </footer>
    `;
    return template;
  }

  _setupEventListeners() {
    // Observar cambios en slots
    this.shadowRoot.addEventListener('slotchange', this._handleSlotChange);

    // Capturar clicks en enlaces slotados
    this._linkSlots.forEach(slot => {
      slot.addEventListener('click', this._handleLinkClick);
    });
  }

  _cleanupEventListeners() {
    this.shadowRoot.removeEventListener('slotchange', this._handleSlotChange);
    this._linkSlots.forEach(slot => {
      slot.removeEventListener('click', this._handleLinkClick);
    });
  }

  _handleSlotChange(event) {
    const slot = event.target;
    const nodes = slot.assignedNodes();

    // Actualizar ARIA labels basado en contenido
    if (slot.name === 'social' && nodes.length > 0) {
      const socialLabel = `Redes sociales (${nodes.length} enlaces)`;
      this.shadowRoot.querySelector('h3[class="sr-only"]:last-of-type').textContent = socialLabel;
    }
  }

  _handleLinkClick(event) {
    const target = event.target;
    if (target.tagName === 'A' && target.href) {
      this.dispatchEvent(new CustomEvent('link-click', {
        bubbles: true,
        composed: true,
        detail: {
          href: target.href,
          text: target.textContent,
          slot: target.getAttribute('slot')
        }
      }));
    }
  }

  _updateFromAttributes() {
    this._variant = this.getAttribute('variant') || 'default';
    this._isCondensed = this.hasAttribute('condensed');

    this._updateVariant();
    this._updateLayout();
    this._updateCopyright();
  }

  _updateVariant() {
    if (this._footer) {
      this._footer.setAttribute('data-variant', this._variant);
    }
  }

  _updateLayout() {
    if (this._footer) {
      this._footer.classList.toggle('condensed', this._isCondensed);
    }
  }

  _updateCopyright() {
    if (this._copyrightSlot) {
      const year = this.getAttribute('year') || this._currentYear;
      const defaultContent = `© ${year} Todos los derechos reservados`;

      // Solo actualizar si está usando el contenido por defecto
      const assignedNodes = this._copyrightSlot.assignedNodes();
      if (assignedNodes.length === 0) {
        this._copyrightSlot.innerHTML = defaultContent;
      }
    }
  }

  // Método público para resetear
  reset() {
    this.removeAttribute('variant');
    this.removeAttribute('condensed');
    this.removeAttribute('year');
    this._updateFromAttributes();
  }
}

// Definición del componente
if (!customElements.get('c-footer')) {
  customElements.define('c-footer', CFooter);
}