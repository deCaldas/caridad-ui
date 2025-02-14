/**
 * Header es un componente personalizado que muestra un header con tres slots.
 * 
 * Uso:
 * <e-header>
 *   <span slot="slot-h1">Título principal</span>
 *   <span slot="slot-h2">Subtítulo</span>
 *   <span slot="slot-nav">Enlace adicional</span>
 * </e-header>
 * 
 * Atributos:
 * - t-attribute: Un atributo personalizado que puede ser utilizado para modificar el comportamiento del componente.
 */
export default class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  getTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <header>
        <hgroup>
          <h1></h1>
          <h2></h2>
        </hgroup>
          <nav>
            <a href="#"></a>
          </nav>
      </header>
    `;
    template.content.appendChild(this.getStyle());
    return template;
  }

  static get observedAttributes() {
    return ['t-attribute'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 't-attribute' && oldValue !== newValue) {
      console.log(`El atributo t-attribute ha cambiado de ${oldValue} a ${newValue}`);
      // Aquí puedes añadir lógica para manejar el cambio de atributo
    }
  }

  getStyle() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        width: 80%;
        max-width: 900px;
        min-width: 280px;
        margin: 0 auto;
      }
      header {
        background-color: #f4f4f4;
        padding: 1rem;
        }
        h1, h2 {
          margin: 0;
          color: #333;
          }
          nav {
        margin-top: 1rem;
      }
      a {
        color: #0077cc;
        text-decoration: none;
      }
    `;
    return style;
  }
}

customElements.define("e-header", Header);