// components/my-input.js

const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: var(--font-family, sans-serif);
    }

    label {
      display: block;
      margin-bottom: 0.25rem;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: var(--border-radius, 0.375rem);
      font-size: 1rem;
    }

    input:invalid {
      border-color: red;
    }

    .error {
      color: red;
      font-size: 0.875rem;
      display: none;
    }

    :host([invalid]) .error {
      display: block;
    }
  </style>

  <label part="label"><slot name="label">Label</slot></label>
  <input part="input" />
  <span class="error" part="error">Campo inválido</span>
`

class MyInput extends HTMLElement {
  static formAssociated = true

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._input = this.shadowRoot.querySelector('input')
    this._error = this.shadowRoot.querySelector('.error')

    this._internals = this.attachInternals()
  }

  connectedCallback() {
    if (this.hasAttribute('type')) {
      this._input.type = this.getAttribute('type')
    }

    if (this.hasAttribute('placeholder')) {
      this._input.placeholder = this.getAttribute('placeholder')
    }

    if (this.hasAttribute('value')) {
      this._input.value = this.getAttribute('value')
    }

    this._input.addEventListener('input', () => this._onInput())
  }

  _onInput() {
    const value = this._input.value
    this._internals.setFormValue(value)
    this.dispatchEvent(new CustomEvent('value-change', {
      detail: { value },
      bubbles: true,
      composed: true
    }))
    this.validate()
  }

  validate() {
    const valid = this._input.checkValidity()
    this.toggleAttribute('invalid', !valid)
    return valid
  }

  get value() {
    return this._input.value
  }

  set value(val) {
    this._input.value = val
    this._internals.setFormValue(val)
  }
}

customElements.define('my-input', MyInput)
