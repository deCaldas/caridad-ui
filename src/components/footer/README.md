### Ejemplos Prácticos

### 1 Uso Básico
```html
<c-footer></c-footer>

<script>
  // El componente se renderiza con contenido por defecto
</script>
```

### 2 Uso Completo con Slots
```html
<c-footer variant="default" condensed>
  <span slot="logo">MiEmpresa</span>
  
  <div slot="about">
    <p>Lideres en soluciones digitales innovadoras desde 2010.</p>
    <address>
      Calle Principal 123<br>
      Ciudad, País
    </address>
  </div>
  
  <nav slot="links" aria-label="Enlaces del pie de página">
    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem;">
      <li><a href="/inicio">Inicio</a></li>
      <li><a href="/nosotros">Nosotros</a></li>
      <li><a href="/servicios">Servicios</a></li>
      <li><a href="/contacto">Contacto</a></li>
    </ul>
  </nav>
  
  <div slot="social" style="display: flex; gap: 1rem;">
    <a href="https://twitter.com" aria-label="Twitter">
      <svg width="24" height="24" fill="currentColor">...</svg>
    </a>
    <a href="https://facebook.com" aria-label="Facebook">
      <svg width="24" height="24" fill="currentColor">...</svg>
    </a>
    <a href="https://linkedin.com" aria-label="LinkedIn">
      <svg width="24" height="24" fill="currentColor">...</svg>
    </a>
  </div>
  
  <div slot="copyright">
    © 2024 MiEmpresa. Todos los derechos reservados.
    <a href="/privacidad">Política de privacidad</a> |
    <a href="/terminos">Términos de servicio</a>
  </div>
</c-footer>
```

### 3 Configuración Dinámica con JavaScript
```html
<c-footer id="myFooter"></c-footer>

<script>
  const footer = document.getElementById('myFooter');
  
  // Configurar propiedades
  footer.variant = 'minimal';
  footer.year = '2024';
  footer.condensed = true;
  
  // Escuchar eventos
  footer.addEventListener('footer-ready', (e) => {
    console.log('Footer listo:', e.detail.component);
  });
  
  footer.addEventListener('link-click', (e) => {
    console.log('Enlace clickeado:', e.detail);
    // Analytics tracking
  });
  
  // Métodos públicos
  setTimeout(() => {
    footer.reset(); // Vuelve a estado inicial
  }, 5000);
</script>
```

### 4 Integración con CSS Custom Properties
```html
<style>
  :root {
    --color-bg: #1a1a1a;
    --color-text: #ffffff;
    --color-text-muted: #b3b3b3;
    --color-border: rgba(255, 255, 255, 0.1);
    --color-primary: #4dabf7;
    --font-sans: 'Inter', system-ui;
    --font-mono: 'SF Mono', monospace;
    --space-6: 2rem;
    --space-7: 3rem;
  }
  
  c-footer {
    margin-top: auto; /* Para sticky footer */
  }
</style>

<c-footer></c-footer>
```

### 5 Variante Minimalista
```html
<c-footer variant="minimal">
  <div slot="copyright" style="font-size: 0.75rem;">
    <p>© 2024 Compañía. Todos los derechos reservados.</p>
    <p style="opacity: 0.6; margin-top: 0.25rem;">
      <small>Versión 2.1.0</small>
    </p>
  </div>
</c-footer>
```

### Documentación del Componente

#### Propósito
El componente `c-footer` es un pie de página accesible y configurable para aplicaciones web. Proporciona una estructura semántica, soporte para landmarks ARIA, y una API flexible para integrarse con sistemas de diseño.

#### API Pública

#### Atributos
- **variant**: `string` - Variante visual (`default` | `minimal`)
- **condensed**: `boolean` - Modo compacto para vistas móviles
- **year**: `string` - Año para el copyright (default: año actual)

#### Propiedades (reflect to attributes)
- `variant` (get/set)
- `condensed` (get/set) 
- `year` (get/set)

#### Métodos
- `reset()`: Vuelve al estado inicial por defecto

#### Eventos
- `footer-ready`: Disparado cuando el componente está completamente inicializado
- `link-click`: Disparado cuando se hace clic en cualquier enlace dentro de los slots

#### Partes CSS
- `footer` - Elemento footer principal
- `container` - Contenedor con ancho máximo
- `content` - Contenido principal con grid
- `section` - Cada sección individual
- `bottom` - Área inferior con copyright

### Accesibilidad
✅ **Landmark role**: `role="contentinfo"`
✅ **ARIA labels**: Labels descriptivos para secciones
✅ **Focus management**: Outline visible para teclado
✅ **Screen reader only**: Texto oculto para contexto
✅ **Semantic slots**: Encabezados apropiados para secciones

### Rendimiento
✅ **CSS eficiente**: Estilos compilados, sin @import
✅ **Event delegation**: Listeners optimizados
✅ **Lifecycle management**: Cleanup apropiado
✅ **Shadow DOM**: Encapsulación sin penalty de rendimiento

### Compatibilidad
- ✅ Chrome 54+
- ✅ Firefox 63+ 
- ✅ Safari 10.1+
- ✅ Edge 79+
- ✅ Safari iOS 10.3+

### Notas de Uso
1. **Tokens CSS**: El componente usa CSS Custom Properties. Define las variables necesarias en `:root` o en un ancestro.
2. **Contenido slotado**: Los estilos para contenido slotado tienen limitaciones. Considera usar partes CSS para estilos avanzados.
3. **Responsive**: El componente es responsive por defecto. Usa `condensed` para control más fino.
4. **Accesibilidad**: Añade `aria-label` personalizado si el footer tiene múltiples instancias con diferente propósito.

---
