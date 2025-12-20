### Documentación del Componente

#### `<c-section>`

Un contenedor de sección semántico y flexible que maneja espaciado, anchos máximos y temas de color automáticamente.

**API Pública**

| Atributo / Propiedad | Tipo | Valores Válidos | Default | Descripción |
| --- | --- | --- | --- | --- |
| `variant` | `string` | `default`, `primary`, `secondary`, `accent` | `default` | Define el tema de color (fondo y texto). |
| `padding` | `string` | `none`, `small`, `normal`, `large` | `normal` | Define el espaciado interno (padding) de la sección. |

**Slots**

| Nombre | Descripción |
| --- | --- |
| `title` | Encabezado principal de la sección. Se recomienda usar `h2` o `h3`. |
| `subtitle` | Texto secundario o bajada. |
| `(default)` | El contenido principal de la sección. |

**CSS Shadow Parts**

Permite estilizar partes internas desde el CSS global.

```css
c-section::part(section) {
  /* Estiliza el contenedor <section> interno */
  border-bottom: 1px solid #ccc;
}

c-section::part(header) {
  /* Estiliza el contenedor del título/subtítulo */
  text-align: left; /* Sobrescribir alineación */
}

```

**Notas de Accesibilidad y Rendimiento**

1. **Rendering:** Este componente utiliza *Constructable Stylesheets*. El cambio de variantes tiene un costo de CPU cercano a cero ya que no hay re-renderizado de DOM, solo invalidación de estilo CSS nativa.
2. **Encabezados:** El componente no impone el nivel del encabezado (`<h1>`-`<h6>`). Es responsabilidad del desarrollador proporcionar la etiqueta semántica correcta dentro del `slot="title"` para mantener una estructura de documento lógica.
3. **Contraste:** Al usar la variante `accent`, el componente intenta usar `--color-text-inverse`. Asegúrese de que sus variables CSS globales cumplan con los ratios de contraste WCAG AA.

---

### Ejemplos Prácticos

Aquí tienes cómo usar el componente en diferentes escenarios.

#### Uso Básico (Default)

```html
<c-section>
  <h2 slot="title">Sección Estándar</h2>
  <p slot="subtitle">Subtítulo explicativo opcional</p>
  <p>Contenido principal de la sección. Hereda la tipografía base.</p>
</c-section>

```

#### Configuración Avanzada (Variantes y Padding)

```html
<c-section variant="accent" padding="large">
  <h2 slot="title">Llamada a la Acción</h2>
  <p>
    Este bloque usa el color de acento y texto inverso automáticamente.
  </p>
  <button>Click aquí</button>
</c-section>

<c-section variant="secondary" padding="none">
  <img src="banner.jpg" style="width:100%; display:block;" alt="Banner full width">
</c-section>

```

#### Interacción con JavaScript

Gracias a los getters/setters implementados, ahora la DX es fluida:

```javascript
const section = document.querySelector('c-section');

// Cambiar propiedades directamente
section.variant = 'primary'; 
section.padding = 'small';

// Verificar estado
console.log(section.variant); // "primary"

```

---
