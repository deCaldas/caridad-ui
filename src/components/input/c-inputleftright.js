export class CInputLeftRight extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const VALID_TYPES = ["text", "email", "password", "search", "number", "tel", "url"];

    const rawType = this.getAttribute("type");
    const type = VALID_TYPES.includes(rawType) ? rawType : "text";

    const placeholder = sanitize(this.getAttribute("placeholder"));

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: var(--color-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0 var(--space-4);
          transition: border var(--motion-fast);
        }
        .wrapper:focus-within { border-color: var(--color-accent); }
        input {
          flex: 1;
          background: transparent;
          border: none;
          padding: var(--space-3) 0;
          font-size: var(--font-size-md);
          color: var(--color-text);
          outline: none;
          font-family: var(--font-sans);
        }
        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted);
          margin-right: var(--space-3);
          margin-left: var(--space-3);
        }
      </style>

      <div class="wrapper">
        <slot name="icon-left" class="icon"></slot>
        <slot name="icon-right" class="icon"></slot>
      </div>
    `;

    const wrapper = this.shadowRoot.querySelector(".wrapper");

    // Crear input vía DOM (seguro)
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;

    // Insertar input en medio de los dos slots
    const rightSlot = wrapper.querySelector('slot[name="icon-right"]');
    wrapper.insertBefore(input, rightSlot);
  }
}

function sanitize(value) {
  if (!value) return "";
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

customElements.define("c-input-left-right", CInputLeftRight);
