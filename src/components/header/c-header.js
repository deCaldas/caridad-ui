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

export class CHeader extends HTMLElement {
  static get observedAttributes() {
    return ["logo", "href", "title", "variant", "position", "theme"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleAvatarToggle = this.handleAvatarToggle.bind(this);
  }

  connectedCallback() {
    this.render();
    document.addEventListener("click", this.handleClickOutside);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  attributeChangedCallback() {
    this.render();
  }

  handleMenuToggle() {
    const nav = this.shadowRoot.querySelector(".mobile-nav");
    const btn = this.shadowRoot.querySelector(".burger");
    nav.classList.toggle("open");
    btn.classList.toggle("open");
  }

  handleAvatarToggle(e) {
    e.stopPropagation();
    const menu = this.shadowRoot.querySelector(".user-dropdown");
    menu.classList.toggle("open");
  }

  handleClickOutside(e) {
    if (!this.contains(e.target)) {
      const menu = this.shadowRoot.querySelector(".user-dropdown");
      if (menu) menu.classList.remove("open");
    }
  }

  render() {
    const logo = sanitizeAttr(this.getAttribute("logo") || "");
    const href = sanitizeAttr(this.getAttribute("href") || "/");
    const title = sanitizeAttr(this.getAttribute("title") || "");
    const variant = sanitizeAttr(this.getAttribute("variant") || "solid");
    const position = sanitizeAttr(this.getAttribute("position") || "static");
    const theme = sanitizeAttr(this.getAttribute("theme") || "auto");

    this.shadowRoot.innerHTML = `
      <style>
        @import "/src/styles/tokens.css";

        :host {
          display: block;
          width: 100%;

          /* POSITION */
          position: ${position === "sticky" ? "sticky"
        : position === "fixed" ? "fixed"
          : "static"};
          top: 0;
          z-index: 1000;

          /* FLOATING */
          ${position === "floating" ? `
            position: fixed;
            top: var(--space-4);
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - var(--space-8));
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-lg);
          ` : ""}
        }

        /* THEMES */
        :host([theme="dark"]),
        :host(:not([theme])) @media (prefers-color-scheme: dark) {
          --header-bg: var(--color-bg-dark);
          --header-text: var(--color-text-dark);
        }

        :host([theme="light"]),
        :host(:not([theme])) @media (prefers-color-scheme: light) {
          --header-bg: var(--color-bg);
          --header-text: var(--color-text);
        }

        /* VARIANTS */
        header {
          background: ${variant === "transparent" ? "transparent"
        : "var(--header-bg)"};
          backdrop-filter: ${variant === "transparent" ? "blur(12px)" : "none"
      };
          border-bottom: ${variant === "transparent" ? "1px solid transparent"
        : "1px solid var(--color-border)"
      };
        }

        header {
          padding: var(--space-4) var(--space-6);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* BRAND */
        .brand {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          text-decoration: none;
          color: var(--header-text);
        }

        .brand img {
          width: 32px;
          height: 32px;
        }

        .brand span {
          font-family: var(--font-mono);
          font-size: var(--font-size-lg);
        }

        /* NAV */
        nav, .actions {
          display: flex;
          align-items: center;
          gap: var(--space-5);
        }

        ::slotted([slot="nav"] a),
        nav a {
          color: var(--color-accent);
          text-decoration: none;
          font-size: var(--font-size-sm);
        }

        /* BURGER */
        .burger {
          display: none;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
        }

        .burger span {
          width: 24px;
          height: 3px;
          background: var(--header-text);
          transition: all 0.3s;
        }

        .burger.open span:nth-child(1) {
          transform: rotate(45deg) translateY(7px);
        }
        .burger.open span:nth-child(2) {
          opacity: 0;
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
        }
        .mobile-nav.open {
          display: flex;
        }

        /* USER MENU */
        .user-menu {
          position: relative;
        }
        .user-dropdown {
          position: absolute;
          top: 120%;
          right: 0;
          background: var(--header-bg);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
          padding: var(--space-3);
          border-radius: var(--radius-lg);
          display: none;
          flex-direction: column;
          min-width: 180px;
        }
        .user-dropdown.open {
          display: flex;
        }
        .user-dropdown ::slotted(*) {
          padding: var(--space-2) var(--space-3);
          cursor: pointer;
        }

        @media (max-width: 720px) {
          nav { display: none; }
          .actions { display: none; }
          .burger { display: flex; }
        }
      </style>

      <header>
        <!-- BRAND -->
        <a class="brand" href="${href}">
          ${logo ? `<img src="${logo}" alt="${title}">` : ""}
          ${title ? `<span>${title}</span>` : ""}
          <slot name="brand"></slot>
        </a>

        <!-- DESKTOP NAV -->
        <nav>
          <slot name="nav"></slot>
        </nav>

        <!-- ACTIONS -->
        <div class="actions">
          <slot name="actions"></slot>

          <div class="user-menu">
            <div class="avatar" part="avatar" style="cursor:pointer;">
              <slot name="avatar"></slot>
            </div>
            <div class="user-dropdown">
              <slot name="user-menu"></slot>
            </div>
          </div>
        </div>

        <!-- BURGER -->
        <div class="burger">
          <span></span><span></span><span></span>
        </div>
      </header>

      <!-- MOBILE NAV -->
      <div class="mobile-nav">
        <slot name="nav"></slot>
        <slot name="actions"></slot>
      </div>
    `;

    // EVENTOS
    this.shadowRoot.querySelector(".burger")
      .addEventListener("click", this.handleMenuToggle);

    const avatar = this.shadowRoot.querySelector(".avatar");
    if (avatar) avatar.addEventListener("click", this.handleAvatarToggle);
  }
}

customElements.define("c-header", CHeader);
