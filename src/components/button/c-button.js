export class CButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'icon-left', 'icon-right'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const VALID_VARIANTS = ['primary', 'secondary', 'outline', 'ghost'];
    const VALID_SIZES = ['sm', 'md', 'lg'];
    const VALID_ICONS = [
      'search', 'arrow-right', 'arrow-left',
      'plus', 'check', 'x', 'star',
      'heart', 'download', 'upload'
    ];

    const variant = VALID_VARIANTS.includes(this.getAttribute('variant'))
      ? this.getAttribute('variant')
      : 'primary';

    const size = VALID_SIZES.includes(this.getAttribute('size'))
      ? this.getAttribute('size')
      : 'md';

    const disabled = this.hasAttribute('disabled');

    this.shadowRoot.innerHTML = `
      <style>@import "/src/styles/tokens.css";</style>
      <button part="button"></button>
    `;

    const button = this.shadowRoot.querySelector('button');
    button.classList.add(variant, size);
    if (disabled) button.disabled = true;

    // LEFT ICON
    const iconLeft = this.getAttribute('icon-left');
    if (VALID_ICONS.includes(iconLeft)) {
      const span = document.createElement('span');
      span.className = 'icon icon-left';
      span.part = 'icon-left';
      span.textContent = this.iconChar(iconLeft);
      button.appendChild(span);
    }

    // SLOT
    const slot = document.createElement('slot');
    button.appendChild(slot);

    // RIGHT ICON
    const iconRight = this.getAttribute('icon-right');
    if (VALID_ICONS.includes(iconRight)) {
      const span = document.createElement('span');
      span.className = 'icon icon-right';
      span.part = 'icon-right';
      span.textContent = this.iconChar(iconRight);
      button.appendChild(span);
    }
  }

  iconChar(name) {
    return {
      search: '🔍',
      'arrow-right': '→',
      'arrow-left': '←',
      plus: '+',
      check: '✓',
      x: '✕',
      star: '★',
      heart: '❤',
      download: '↓',
      upload: '↑'
    }[name];
  }
}

customElements.define('c-button', CButton);
