customElements.define("c-switch", class extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Styles
    const style = document.createElement("style");
    style.textContent = `
      .switch {
        width: 42px;
        height: 22px;
        background: var(--color-surface);
        border-radius: 50px;
        position: relative;
        cursor: pointer;
      }

      .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 18px;
        height: 18px;
        background: var(--color-text);
        border-radius: 50%;
        transition: transform var(--motion-fast);
      }

      :host([checked]) .thumb {
        transform: translateX(20px);
      }
    `;

    // Structure
    const wrapper = document.createElement("div");
    wrapper.classList.add("switch");

    const thumb = document.createElement("div");
    thumb.classList.add("thumb");

    wrapper.appendChild(thumb);
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".switch")
      .addEventListener("click", () => this.toggle());
  }

  toggle() {
    if (this.hasAttribute("checked")) {
      this.removeAttribute("checked");
    } else {
      this.setAttribute("checked", "");
    }
    this.dispatchEvent(new Event("change"));
  }
});
