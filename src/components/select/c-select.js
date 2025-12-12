// Sanitizador robusto para atributos
function sanitize(value) {
  if (!value) return "";
  return value.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[char];
  });
}

export class CSelect extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.open = false;
    this.selected = null;
    this.render();
  }

  connectedCallback() {
    this.shadowRoot.addEventListener("click", (e) => this.handleClick(e));
    this.shadowRoot.addEventListener("keydown", (e) => this.handleKey(e));

    // Aplicamos placeholder seguro aquí
    const label = this.shadowRoot.querySelector(".selected-label");
    const ph = sanitize(this.getAttribute("placeholder") || "Select…");
    label.textContent = ph;
  }

  toggle() {
    this.open = !this.open;
    this.update();
  }

  close() {
    this.open = false;
    this.update();
  }

  handleClick(e) {
    if (e.target.hasAttribute("data-option")) {
      this.selected = e.target.getAttribute("data-option");
      this.dispatchEvent(new CustomEvent("change", { detail: this.selected }));
      this.close();
    }
  }

  handleKey(e) {
    const items = [...this.shadowRoot.querySelectorAll("[data-option]")];

    if (!this.open && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      return this.toggle();
    }

    if (this.open) {
      const currentIndex = items.findIndex(el => el.dataset.option === this.selected);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = items[currentIndex + 1] || items[0];
        this.selected = next.dataset.option;
        this.update();
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = items[currentIndex - 1] || items[items.length - 1];
        this.selected = prev.dataset.option;
        this.update();
      }

      if (e.key === "Enter") {
        this.dispatchEvent(new CustomEvent("change", { detail: this.selected }));
        this.close();
      }

      if (e.key === "Escape") this.close();
    }
  }

  update() {
    this.shadowRoot.querySelector(".options").style.display =
      this.open ? "block" : "none";

    this.shadowRoot.querySelector(".selected-label").textContent =
      sanitize(this.selected ?? this.getAttribute("placeholder") ?? "Select…");
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; position: relative; font-family: var(--font-sans); }
        .select { border: 1px solid var(--border-color); padding: var(--space-3);
          background: var(--color-bg); color: var(--color-text);
          border-radius: var(--radius-md); cursor: pointer; transition: border var(--motion-fast);
        }
        .select:hover { border-color: var(--color-accent); }
        .options { display: none; position: absolute; top: calc(100% + 4px); left: 0; right: 0;
          background: var(--color-surface); border-radius: var(--radius-md);
          box-shadow: var(--shadow-md); max-height: 240px; overflow-y: auto; z-index: 1000;
          padding: var(--space-2) 0;
        }
        .option { padding: var(--space-3) var(--space-4); cursor: pointer; user-select: none; }
        .option:hover, .option[selected] { background: var(--color-surface-alt); }
      </style>

      <div class="select" tabindex="0">
        <span class="selected-label"></span>
      </div>

      <div class="options">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("c-select", CSelect);
