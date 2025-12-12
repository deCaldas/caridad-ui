export class CSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['variant', 'padding'];
  }

  attributeChangedCallback() {
    this.render();
  }

  // Sanitización genérica (fallback)
  sanitize(value) {
    if (!value) return '';
    return value.replace(/[&<>"']/g, (char) => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return entities[char];
    });
  }

  render() {
    /* LISTAS BLANCAS: defensa primaria */
    const VALID_VARIANTS = ['default', 'primary', 'secondary', 'accent'];
    const VALID_PADDINGS = ['none', 'small', 'normal', 'large'];

    const rawVariant = this.getAttribute('variant');
    const rawPadding = this.getAttribute('padding');

    const variant = VALID_VARIANTS.includes(rawVariant)
      ? rawVariant
      : 'default';

    const padding = VALID_PADDINGS.includes(rawPadding)
      ? rawPadding
      : 'normal';

    /* Mapas seguros */
    const backgrounds = {
      default: 'var(--color-bg)',
      primary: 'var(--color-surface)',
      secondary: 'var(--color-surface-alt)',
      accent: 'var(--color-accent)'
    };

    const paddings = {
      none: '0',
      small: 'var(--space-5) var(--space-4)',
      normal: 'var(--space-7) var(--space-5)',
      large: 'var(--space-9) var(--space-6)'
    };

    const textColor =
      variant === 'accent'
        ? 'var(--color-text)'
        : 'var(--color-text)';

    // IMPORTANTE: acá ya no hay riesgo porque variant/padding
    // jamás pueden contener contenido ejecutable.
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-sans);
          color: var(--color-text);
        }

        section {
          background: ${backgrounds[variant]};
          padding: ${paddings[padding]};
          color: ${textColor};
          transition: background var(--motion-normal), color var(--motion-normal);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--space-7);
        }

        ::slotted([slot="title"]) {
          font-family: var(--font-mono);
          font-size: var(--font-size-2xl);
          line-height: var(--line-height-tight);
          margin: 0 0 var(--space-3) 0;
          color: ${textColor};
        }

        ::slotted([slot="subtitle"]) {
          font-family: var(--font-sans);
          font-size: var(--font-size-lg);
          line-height: var(--line-height-relaxed);
          opacity: 0.85;
          margin: 0;
          color: ${textColor};
        }

        .section-content {
          color: ${textColor};
          font-size: var(--font-size-md);
          line-height: var(--line-height-normal);
        }
      </style>

      <section part="section">
        <div class="container">
          <div class="section-header">
            <slot name="title"></slot>
            <slot name="subtitle"></slot>
          </div>
          <div class="section-content">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('c-section', CSection);
