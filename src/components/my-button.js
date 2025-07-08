const template = document.createElement('template')
template.innerHTML = `
  <style>
    button {
      background-color: var(--primary-color, #6200ea);
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.375rem;
      font-weight: bold;
      cursor: pointer;
    }
    button:hover {
      opacity: 0.9;
    }
  </style>
  <button part="button"><slot></slot></button>
`

class MyButton extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('my-button', MyButton)
