### Documentación del Componente

#### `<c-hero>`

Un componente de "Héroe" (sección principal) flexible y de alto rendimiento, diseñado para encabezar páginas o secciones importantes. Soporta layouts centrados y divididos, con gestión automática de espaciado y contraste.

**API Pública**

| Atributo | Propiedad | Tipo | Default | Descripción |
| --- | --- | --- | --- | --- |
| `layout` | `layout` | `string` | `'centered'` | Define la distribución del contenido. Valores: `'centered'` |

**Slots Disponibles**

* `title`: Encabezado principal (Recomendado: `<h1>` o `<h2>`).
* `subtitle`: Texto auxiliar sobre el título o subtítulo.
* `description`: Párrafo principal de contenido.
* `cta`: Call to Action (Botones, enlaces).
* `media`: Imagen, video o gráfico. En modo `centered` se oculta por defecto (según implementación CSS), en `split` ocupa el 50% del ancho.

**Estilos (CSS Custom Properties)**

El componente es agnóstico al diseño, expone variables para el sistema de diseño:

| Variable | Descripción | Valor por defecto |
| --- | --- | --- |
| `--hero-bg-start` | Color inicial del gradiente | `#E53935` |
| `--hero-bg-end` | Color final del gradiente | `#B71C1C` |
| `--color-text` | Color del texto | `#fff` |
| `--space-[4-7]` | Variables de espaciado interno | `1.5rem` - `4rem` |

**Notas de Accesibilidad**

1. **Jerarquía de Encabezados:** El componente no impone etiquetas `h1`-`h6`. Es responsabilidad del desarrollador inyectar el nivel de encabezado correcto dentro de `slot="title"` para mantener el esquema del documento lógico.
2. **Contraste:** Si sobrescribe los colores de fondo (`--hero-bg-*`), asegúrese de ajustar `--color-text` para cumplir con el ratio de contraste WCAG AA (4.5:1).
3. **Reducción de Movimiento:** El componente respeta las transiciones suaves. Considere usar `@media (prefers-reduced-motion)` globalmente si desea desactivarlas.

---

### Ejemplos Prácticos

#### Ejemplo 1: Básico (Centrado por defecto)

Ideal para landing pages sencillas o introducciones de sección.

```html
<c-hero>
  <h1 slot="title">Bienvenidos a la Arquitectura Web</h1>
  <p slot="description">
    Descubre cómo construir componentes escalables, rápidos y accesibles usando estándares modernos.
  </p>
  <button slot="cta">Empezar ahora</button>
</c-hero>

```

#### Ejemplo 2: Layout Split con Multimedia

Uso clásico de SaaS: texto a la izquierda, imagen del producto a la derecha.

```html
<style>
  /* Personalización externa sencilla */
  .hero-marketing {
    --hero-bg-start: #2563eb; /* Azul corporativo */
    --hero-bg-end: #1e40af;
  }
  
  .btn-primary {
    padding: 0.75rem 1.5rem;
    background: white;
    color: #1e40af;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  }
</style>

<c-hero layout="split" class="hero-marketing">
  <span slot="subtitle" style="text-transform: uppercase; letter-spacing: 1px;">Nueva Versión 2.0</span>
  <h1 slot="title">Potencia tu flujo de trabajo</h1>
  <p slot="description">
    Nuestra herramienta automatiza el 80% de tus tareas diarias.
    Integra, despliega y escala sin fricción.
  </p>
  
  <button slot="cta" class="btn-primary">Prueba Gratis</button>
  <a slot="cta" href="#" style="color: white; text-decoration: underline;">Ver Demo</a>

  <img slot="media" 
       src="https://via.placeholder.com/600x400" 
       alt="Dashboard de la aplicación mostrando métricas"
       loading="lazy">
</c-hero>

```

#### Ejemplo 3: Interacción con JavaScript

Demostración de la mejora de DX con la propiedad `layout`.

```html
<c-hero id="dynamicHero" layout="centered">
  <h1 slot="title">Layout Dinámico</h1>
  <img slot="media" src="https://via.placeholder.com/400" alt="Demo">
  <button slot="cta" onclick="toggleLayout()">Cambiar Layout</button>
</c-hero>

<script>
  function toggleLayout() {
    const hero = document.getElementById('dynamicHero');
    // Gracias al getter/setter, esto actualiza el atributo y la vista automáticamente
    hero.layout = hero.layout === 'centered' ? 'split' : 'centered';
    console.log(`Nuevo layout: ${hero.layout}`);
  }
</script>

```

---
