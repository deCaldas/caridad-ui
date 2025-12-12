const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import url("/src/styles/tokens.css");

    :host {
      display: block;
      font-family: var(--font-sans);
    }

    section {
      padding: var(--space-7) var(--space-5);
      background: linear-gradient(
        135deg,
        var(--color-accent-dark) 0%,
        var(--color-accent) 100%
      );
      border-radius: var(--radius-lg);
      text-align: center;
      color: var(--color-text);
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
      align-items: center;
    }

    ::slotted([slot="heading"]) {
      font-family: var(--font-mono);
      font-size: var(--font-size-2xl);
      font-weight: 800;
      margin: 0;
      line-height: var(--line-height-tight);
      color: var(--color-text);
    }

    ::slotted([slot="description"]) {
      font-family: var(--font-sans);
      font-size: var(--font-size-md);
      line-height: var(--line-height-relaxed);
      opacity: 0.95;
      margin: 0;
      color: var(--color-text-muted);
    }

    .cta-buttons {
      display: flex;
      gap: var(--space-4);
      flex-wrap: wrap;
      justify-content: center;
    }
  </style>

  <section part="cta">
    <div class="container">
      <slot name="heading"></slot>
      <slot name="description"></slot>
      <div class="cta-buttons">
        <slot name="buttons"></slot>
      </div>
    </div>
  </section>
`;

export class CCta extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('c-cta', CCta);
