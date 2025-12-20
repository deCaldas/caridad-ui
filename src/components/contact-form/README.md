## Documentación del Componente

### `<c-contact-form>`

Un componente de formulario de contacto agnóstico ("headless-ish") que gestiona el layout, el estado de la UI (carga, éxito, error) y la recolección de datos, pero delega la lógica de negocio al consumidor.

#### API Pública

| Atributo / Propiedad | Tipo | Valores | Default | Descripción |
| --- | --- | --- | --- | --- |
| `state` | `string` | `idle`, `loading`, `success`, `error` | `idle` | Estado visual actual del formulario. Reflejado como atributo. |
| `value` (readonly) | `object` | `{ name: val, ... }` | `{}` | Objeto clave-valor con los datos de los inputs del formulario. |
| `reset()` | `method` | - | - | Limpia los inputs y restablece el estado a `idle`. |

#### Eventos

| Evento | Detalle (`e.detail`) | Descripción |
| --- | --- | --- |
| `c-submit` | `{ data, success(), error(msg) }` | Se dispara cuando el usuario envía un formulario válido. Contiene los datos y callbacks para controlar el feedback visual. |

#### Slots

El componente utiliza un sistema de Grid.

| Slot | Descripción |
| --- | --- |
* `name` / `email`: Se ubican en la primera fila (50% ancho cada uno en desktop).
* `subject`: Ancho completo.
* `message`: Ancho completo.
* `submit`: Zona de acciones (alineado a la derecha).
* `(default)`: Cualquier otro campo se apila en el flujo normal.

#### Recomendaciones de Seguridad

1. **Validación Backend:** Este componente realiza validación HTML5 en el cliente (`required`, `type="email"`). **Siempre** valide y sanitice los datos en su servidor/API.
2. **CSP:** Configure su Content Security Policy para permitir estilos si decide no usar la hoja de estilos constructible en entornos antiguos (polyfill), aunque esta implementación es segura por defecto.

---

### Ejemplos Prácticos

#### Uso Básico (HTML Puro)

El componente actúa como contenedor. Observa cómo los inputs son elementos nativos estándar, lo que garantiza accesibilidad y compatibilidad.

```html
<c-contact-form>
  <input slot="name" type="text" name="fullName" placeholder="Tu Nombre" required>
  <input slot="email" type="email" name="email" placeholder="tucorreo@ejemplo.com" required>
  
  <input slot="subject" type="text" name="subject" placeholder="Asunto" required>
  <textarea slot="message" name="message" rows="4" placeholder="Escribe tu mensaje..." required></textarea>

  <button slot="submit" type="submit">Enviar Mensaje</button>
</c-contact-form>

```

#### Integración con JavaScript (Manejo de API)

Este patrón permite que la aplicación controle el ciclo de vida, no el componente.

```javascript
const contactForm = document.querySelector('c-contact-form');

contactForm.addEventListener('c-submit', async (e) => {
  const { data, success, error } = e.detail;

  console.log('Enviando datos...', data);

  try {
    // Simulación de llamada a API
    await fakeApiCall(data);
    success(); // Notifica al componente que muestre éxito
  } catch (err) {
    console.error(err);
    error('El servidor no responde. Intenta más tarde.'); // Notifica error
  }
});

function fakeApiCall(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.3 ? resolve() : reject();
    }, 1500);
  });
}

```

#### Estilizado Personalizado (Design System)

Gracias a `part`, podemos adaptar el componente sin tocar su código interno.

```css
c-contact-form::part(container) {
  background-color: #1a1a1a; /* Tema oscuro */
  border: 1px solid #333;
}

c-contact-form::part(msg-success) {
  background-color: #064e3b;
  color: #a7f3d0;
  border: none;
}

/* Estilar los inputs del Light DOM es CSS estándar */
c-contact-form input,
c-contact-form textarea {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box; /* Importante para que no desborden */
}

```

---
