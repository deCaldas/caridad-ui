// --- Utilidad anti-XSS --- //
function sanitizeAttr(value) {
  if (!value) return "";
  return value.replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return map[char];
  });
}

// --- Constantes y validaciones --- //
const VARIANTS = ['solid', 'transparent'];
const POSITIONS = ['static', 'sticky', 'fixed', 'floating'];
const THEMES = ['auto', 'light', 'dark'];

export class CHeader extends HTMLElement {
  static get observedAttributes() {
    return ["logo", "href", "title", "variant", "position", "theme"];
  }

  static get styles() {
    return `
      @import "/src/styles/tokens.css";

      :host {
        display: block;
        width: 100%;
        box-sizing: border-box;
      }

      /* POSITION */
      :host([position="sticky"]) {
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      :host([position="fixed"]) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: var(--header-bg);
      }

      :host([position="floating"]) {
        position: fixed;
        top: var(--space-4);
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - var(--space-8));
        max-width: 1200px;
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
      }

      /* THEMES */
      :host([theme="dark"]) header {
        --header-bg: var(--color-bg-dark);
        --header-text: var(--color-text-dark);
      }

      :host([theme="light"]) header {
        --header-bg: var(--color-bg);
        --header-text: var(--color-text);
      }

      :host(:not([theme])) header {
        --header-bg: var(--color-bg);
        --header-text: var(--color-text);
      }

      @media (prefers-color-scheme: dark) {
        :host(:not([theme])) header {
          --header-bg: var(--color-bg-dark);
          --header-text: var(--color-text-dark);
        }
      }

      /* HEADER */
      header {
        padding: var(--space-4) var(--space-6);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--header-bg);
        color: var(--header-text);
        transition: background-color 0.3s ease, border-color 0.3s ease;
      }

      :host([variant="transparent"]) header {
        background: transparent;
        backdrop-filter: blur(12px);
        border-bottom: 1px solid transparent;
      }

      :host([variant="solid"]) header {
        border-bottom: 1px solid var(--color-border);
      }

      /* BRAND */
      .brand {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        text-decoration: none;
        color: inherit;
        outline: none;
      }

      .brand:focus-visible {
        outline: 2px solid var(--color-accent);
        outline-offset: 2px;
        border-radius: var(--radius-sm);
      }

      .brand img {
        width: 32px;
        height: 32px;
        object-fit: contain;
      }

      .brand span {
        font-family: var(--font-mono);
        font-size: var(--font-size-lg);
        font-weight: 600;
      }

      /* NAV */
      nav, .actions {
        display: flex;
        align-items: center;
        gap: var(--space-5);
      }

      ::slotted([slot="nav"] a),
      ::slotted([slot="nav"] button) {
        color: var(--color-accent);
        text-decoration: none;
        font-size: var(--font-size-sm);
        background: none;
        border: none;
        cursor: pointer;
        font-family: inherit;
      }

      ::slotted([slot="nav"] a:hover),
      ::slotted([slot="nav"] a:focus),
      ::slotted([slot="nav"] button:hover),
      ::slotted([slot="nav"] button:focus) {
        text-decoration: underline;
        outline: none;
      }

      /* BURGER BUTTON */
      .burger {
        display: none;
        flex-direction: column;
        gap: 4px;
        cursor: pointer;
        background: none;
        border: none;
        padding: var(--space-2);
        border-radius: var(--radius-sm);
        transition: background-color 0.2s;
      }

      .burger:hover {
        background: var(--color-bg-subtle);
      }

      .burger:focus-visible {
        outline: 2px solid var(--color-accent);
        outline-offset: 2px;
      }

      .burger span {
        width: 24px;
        height: 3px;
        background: currentColor;
        border-radius: 2px;
        transition: all 0.3s ease;
      }

      .burger.open span:nth-child(1) {
        transform: rotate(45deg) translateY(7px);
      }

      .burger.open span:nth-child(2) {
        opacity: 0;
        transform: translateX(-10px);
      }

      .burger.open span:nth-child(3) {
        transform: rotate(-45deg) translateY(-7px);
      }

      /* MOBILE NAV */
      .mobile-nav {
        display: none;
        flex-direction: column;
        padding: var(--space-4);
        background: var(--header-bg);
        border-top: 1px solid var(--color-border);
      }

      .mobile-nav.open {
        display: flex;
        animation: slideDown 0.3s ease;
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* USER MENU */
      .user-menu {
        position: relative;
      }

      .avatar {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        width: 40px;
        height: 40px;
        border: 2px solid transparent;
        transition: border-color 0.2s;
      }

      .avatar:hover,
      .avatar:focus-visible {
        border-color: var(--color-accent);
        outline: none;
      }

      .user-dropdown {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        background: var(--header-bg);
        border: 1px solid var(--color-border);
        box-shadow: var(--shadow-lg);
        padding: var(--space-2);
        border-radius: var(--radius-lg);
        display: none;
        flex-direction: column;
        min-width: 200px;
        z-index: 1001;
        animation: fadeIn 0.2s ease;
      }

      .user-dropdown.open {
        display: flex;
      }

      .user-dropdown ::slotted(*) {
        padding: var(--space-3) var(--space-4);
        cursor: pointer;
        background: none;
        border: none;
        text-align: left;
        color: inherit;
        font-family: inherit;
        font-size: var(--font-size-sm);
        border-radius: var(--radius-sm);
        transition: background-color 0.2s;
      }

      .user-dropdown ::slotted(*:hover),
      .user-dropdown ::slotted(*:focus) {
        background: var(--color-bg-subtle);
        outline: none;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* MEDIA QUERIES */
      @media (max-width: 720px) {
        nav { 
          display: none; 
        }
        
        .actions { 
          display: none; 
        }
        
        .burger { 
          display: flex; 
        }
      }

      /* FOCUS VISIBLE FOR ALL INTERACTIVE ELEMENTS */
      :focus-visible {
        outline: 2px solid var(--color-accent);
        outline-offset: 2px;
        border-radius: var(--radius-sm);
      }

      /* SKIP TO CONTENT */
      .skip-to-content {
        position: absolute;
        top: -40px;
        left: var(--space-4);
        background: var(--color-accent);
        color: white;
        padding: var(--space-3) var(--space-4);
        border-radius: var(--radius-sm);
        text-decoration: none;
        z-index: 1002;
        transition: top 0.3s;
      }

      .skip-to-content:focus {
        top: var(--space-4);
      }
    `;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._isMobileMenuOpen = false;
    this._isUserMenuOpen = false;

    // Bind handlers
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleAvatarToggle = this.handleAvatarToggle.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  // --- PROPERTIES GETTERS/SETTERS --- //
  get logo() { return this.getAttribute('logo'); }
  set logo(value) {
    if (value) {
      this.setAttribute('logo', value);
    } else {
      this.removeAttribute('logo');
    }
  }

  get href() { return this.getAttribute('href') || '/'; }
  set href(value) { this.setAttribute('href', value || '/'); }

  get title() { return this.getAttribute('title') || ''; }
  set title(value) {
    if (value) {
      this.setAttribute('title', value);
    } else {
      this.removeAttribute('title');
    }
  }

  get variant() {
    const variant = this.getAttribute('variant') || 'solid';
    return VARIANTS.includes(variant) ? variant : 'solid';
  }
  set variant(value) {
    if (VARIANTS.includes(value)) {
      this.setAttribute('variant', value);
    } else {
      console.warn(`CHeader: Variant "${value}" is not valid. Allowed: ${VARIANTS.join(', ')}`);
    }
  }

  get position() {
    const position = this.getAttribute('position') || 'static';
    return POSITIONS.includes(position) ? position : 'static';
  }
  set position(value) {
    if (POSITIONS.includes(value)) {
      this.setAttribute('position', value);
    } else {
      console.warn(`CHeader: Position "${value}" is not valid. Allowed: ${POSITIONS.join(', ')}`);
    }
  }

  get theme() {
    const theme = this.getAttribute('theme') || 'auto';
    return THEMES.includes(theme) ? theme : 'auto';
  }
  set theme(value) {
    if (THEMES.includes(value)) {
      this.setAttribute('theme', value);
    } else {
      console.warn(`CHeader: Theme "${value}" is not valid. Allowed: ${THEMES.join(', ')}`);
    }
  }

  get isMobileMenuOpen() { return this._isMobileMenuOpen; }
  get isUserMenuOpen() { return this._isUserMenuOpen; }

  // --- LIFECYCLE --- //
  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.observeThemeChanges();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'variant' && !VARIANTS.includes(newValue)) {
        console.warn(`CHeader: Invalid variant "${newValue}". Defaulting to "solid".`);
        this.setAttribute('variant', 'solid');
      }
      if (name === 'position' && !POSITIONS.includes(newValue)) {
        console.warn(`CHeader: Invalid position "${newValue}". Defaulting to "static".`);
        this.setAttribute('position', 'static');
      }
      if (name === 'theme' && !THEMES.includes(newValue)) {
        console.warn(`CHeader: Invalid theme "${newValue}". Defaulting to "auto".`);
        this.setAttribute('theme', 'auto');
      }
      this.updateAttribute(name, newValue);
    }
  }

  // --- EVENT HANDLERS --- //
  handleMenuToggle() {
    this._isMobileMenuOpen = !this._isMobileMenuOpen;
    const nav = this.shadowRoot.querySelector(".mobile-nav");
    const btn = this.shadowRoot.querySelector(".burger");

    if (nav) {
      nav.classList.toggle("open");
      nav.setAttribute('aria-hidden', !this._isMobileMenuOpen);
    }

    if (btn) {
      btn.classList.toggle("open");
      btn.setAttribute('aria-expanded', this._isMobileMenuOpen);
    }

    this.dispatchEvent(new CustomEvent('menu-toggle', {
      detail: { open: this._isMobileMenuOpen },
      bubbles: true,
      composed: true
    }));
  }

  handleAvatarToggle(e) {
    e.stopPropagation();
    this._isUserMenuOpen = !this._isUserMenuOpen;
    const menu = this.shadowRoot.querySelector(".user-dropdown");
    const avatar = this.shadowRoot.querySelector(".avatar");

    if (menu) {
      menu.classList.toggle("open");
      menu.setAttribute('aria-hidden', !this._isUserMenuOpen);
    }

    if (avatar) {
      avatar.setAttribute('aria-expanded', this._isUserMenuOpen);
    }
  }

  handleClickOutside(e) {
    if (!this.contains(e.target)) {
      this.closeAllMenus();
    }
  }

  handleKeyDown(e) {
    // Close menus on Escape
    if (e.key === 'Escape') {
      this.closeAllMenus();
    }

    // Trap focus in mobile menu when open
    if (e.key === 'Tab' && this._isMobileMenuOpen) {
      this.trapFocus(e);
    }
  }

  handleThemeChange(e) {
    if (this.theme === 'auto') {
      this.updateTheme();
    }
  }

  // --- HELPER METHODS --- //
  closeAllMenus() {
    this._isMobileMenuOpen = false;
    this._isUserMenuOpen = false;

    const mobileNav = this.shadowRoot.querySelector(".mobile-nav");
    const burger = this.shadowRoot.querySelector(".burger");
    const userMenu = this.shadowRoot.querySelector(".user-dropdown");
    const avatar = this.shadowRoot.querySelector(".avatar");

    if (mobileNav) mobileNav.classList.remove("open");
    if (burger) {
      burger.classList.remove("open");
      burger.setAttribute('aria-expanded', 'false');
    }
    if (userMenu) {
      userMenu.classList.remove("open");
      userMenu.setAttribute('aria-hidden', 'true');
    }
    if (avatar) avatar.setAttribute('aria-expanded', 'false');
  }

  trapFocus(e) {
    const mobileNav = this.shadowRoot.querySelector(".mobile-nav");
    if (!mobileNav || !mobileNav.classList.contains('open')) return;

    const focusableElements = mobileNav.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }

  updateAttribute(name, value) {
    // Optimización: actualizar solo lo necesario
    if (['logo', 'href', 'title'].includes(name)) {
      this.updateBrand();
    } else if (['variant', 'position', 'theme'].includes(name)) {
      this.updateStyles();
    }
  }

  updateBrand() {
    const logo = sanitizeAttr(this.getAttribute("logo") || "");
    const href = sanitizeAttr(this.getAttribute("href") || "/");
    const title = sanitizeAttr(this.getAttribute("title") || "");
    const brand = this.shadowRoot.querySelector(".brand");

    if (brand) {
      brand.href = href;
      brand.innerHTML = `
        ${logo ? `<img src="${logo}" alt="${title}" loading="lazy">` : ""}
        ${title ? `<span>${title}</span>` : ""}
        <slot name="brand"></slot>
      `;
    }
  }

  updateStyles() {
    // Actualizar estilos CSS personalizados
    const styleElement = this.shadowRoot.querySelector('style');
    if (styleElement) {
      styleElement.textContent = this.constructor.styles;
    }
  }

  updateTheme() {
    // Forzar actualización de estilos basados en tema
    this.updateStyles();
  }

  observeThemeChanges() {
    if (this.theme === 'auto') {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQuery.addEventListener('change', this.handleThemeChange);
    }
  }

  setupEventListeners() {
    document.addEventListener("click", this.handleClickOutside);
    document.addEventListener("keydown", this.handleKeyDown);

    const burger = this.shadowRoot.querySelector(".burger");
    if (burger) {
      burger.addEventListener("click", this.handleMenuToggle);
      burger.setAttribute('aria-label', 'Toggle navigation menu');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-controls', 'mobile-nav');
    }

    const avatar = this.shadowRoot.querySelector(".avatar");
    if (avatar) {
      avatar.addEventListener("click", this.handleAvatarToggle);
      avatar.setAttribute('role', 'button');
      avatar.setAttribute('aria-label', 'User menu');
      avatar.setAttribute('aria-expanded', 'false');
      avatar.setAttribute('aria-haspopup', 'true');
      avatar.setAttribute('tabindex', '0');

      // Permitir abrir con Enter/Space
      avatar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleAvatarToggle(e);
        }
      });
    }

    // Configurar accesibilidad para menús
    const mobileNav = this.shadowRoot.querySelector(".mobile-nav");
    const userDropdown = this.shadowRoot.querySelector(".user-dropdown");

    if (mobileNav) {
      mobileNav.id = 'mobile-nav';
      mobileNav.setAttribute('role', 'navigation');
      mobileNav.setAttribute('aria-label', 'Mobile navigation');
      mobileNav.setAttribute('aria-hidden', 'true');
    }

    if (userDropdown) {
      userDropdown.setAttribute('role', 'menu');
      userDropdown.setAttribute('aria-label', 'User options');
      userDropdown.setAttribute('aria-hidden', 'true');
    }
  }

  removeEventListeners() {
    document.removeEventListener("click", this.handleClickOutside);
    document.removeEventListener("keydown", this.handleKeyDown);

    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener('change', this.handleThemeChange);
    }
  }

  // --- RENDER --- //
  render() {
    const logo = sanitizeAttr(this.getAttribute("logo") || "");
    const href = sanitizeAttr(this.getAttribute("href") || "/");
    const title = sanitizeAttr(this.getAttribute("title") || "");

    this.shadowRoot.innerHTML = `
      <style>${this.constructor.styles}</style>
      
      <!-- Skip to content for accessibility -->
      <a href="#main-content" class="skip-to-content">
        Skip to main content
      </a>

      <header part="header">
        <!-- BRAND -->
        <a class="brand" href="${href}" part="brand">
          ${logo ? `<img src="${logo}" alt="${title}" loading="lazy">` : ""}
          ${title ? `<span part="title">${title}</span>` : ""}
          <slot name="brand"></slot>
        </a>

        <!-- DESKTOP NAV -->
        <nav role="navigation" aria-label="Main navigation" part="nav">
          <slot name="nav"></slot>
        </nav>

        <!-- ACTIONS -->
        <div class="actions" part="actions">
          <slot name="actions"></slot>

          <div class="user-menu" part="user-menu">
            <div class="avatar" part="avatar">
              <slot name="avatar"></slot>
            </div>
            <div class="user-dropdown" part="user-dropdown">
              <slot name="user-menu"></slot>
            </div>
          </div>
        </div>

        <!-- BURGER BUTTON -->
        <button class="burger" part="burger">
          <span></span><span></span><span></span>
        </button>
      </header>

      <!-- MOBILE NAV -->
      <div class="mobile-nav" id="mobile-nav" part="mobile-nav">
        <slot name="nav"></slot>
        <slot name="actions"></slot>
      </div>
    `;

    // Configurar eventos y accesibilidad
    this.setupEventListeners();
  }
}

// Registrar componente
if (!customElements.get("c-header")) {
  customElements.define("c-header", CHeader);
}

// Exportar para uso modular
export default CHeader;