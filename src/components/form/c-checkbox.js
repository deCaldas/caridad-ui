customElements.define("c-checkbox", class extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // <style>
    const style = document.createElement("style");
    style.textContent = `
      label {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        cursor: pointer;
      }

      input[type="checkbox"] {
        width: 18px;
        height: 18px;
        accent-color: var(--color-accent);
      }
    `;

    const label = document.createElement("label");

    const input = document.createElement("input");
    input.type = "checkbox";

    const slot = document.createElement("slot");

    label.appendChild(input);
    label.appendChild(slot);

    shadow.appendChild(style);
    shadow.appendChild(label);
  }
});
