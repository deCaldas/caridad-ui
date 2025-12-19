# Caridad UI ✨

## Librería de componentes web para un sistema de diseño

![npm](https://img.shields.io/npm/v/caridad-ui)
![license](https://img.shields.io/npm/l/caridad-ui)

**Web Components modernos, accesibles y sin dependencias.**  
Diseñado para proyectos artísticos, independientes y open source.

---

## 🚀 ¿Qué es Caridad UI?

**Caridad UI** es una librería de _Web Components_ que puedes usar en cualquier aplicación web — sin importar si usas frameworks como React, Vue o solo HTML plano.

Todo se construye con tecnologías estándar:
- JavaScript nativo (`class extends HTMLElement`)
- Shadow DOM encapsulado
- Estilos integrados por componente
- Distribución en formato **ESM** para importar desde un **CDN** o **npm**

---

## 📦 Instalación

### Opción 1: vía CDN (Unpkg, Skypack, jsDelivr)
```html
<script type="module" src="https://unpkg.com/caridad-ui@2.0.1/dist/index.js"></script>
````

> Asegúrate de que tu servidor acepte el tipo MIME adecuado (`application/javascript`) o usa un CDN que lo entregue correctamente (como jsDelivr o Skypack).

### Opción 2: npm

```bash
npm install caridad-ui
```

Luego en tu código:

```js
import 'caridad-ui';
```

---


## Ejemplos de uso

### 🌟 Componente `<c-header>`

Encabezado reutilizable con slots para título, subtítulo y navegación.

```html
<c-header 
  logo="https://placehold.co/32x32/3b82f6/ffffff.png" 
  href="/" 
  title="MiApp" 
  variant="solid"
  position="sticky" 
  theme="auto"
>
  <!-- Navegación principal -->
  <nav slot="nav">
    <a href="/inicio">Inicio</a>
    <a href="/productos">Productos</a>
    <a href="/servicios">Servicios</a>
    <a href="/contacto">Contacto</a>
  </nav>
</c-header>
```

---

## 📁 Estructura del proyecto

```plaintext
caridad-ui/
├── src/
│   ├── components/
│       └── __securitytest__/
│           ├── helpers.js
│           ├── xss.attribute.test.js
│           ├── xss.slots.test.js
│           └── xss.text-content.test.js
│       └── button/
│           └── c-button.js
│       └── card/
│           └── c-card.js
│       └── contact-form/
│           └── c-contact-form.js
│       └── cta/
│           └── c-cta.js
│       └── feature/
│           └── c-feature.js
│       └── footer/
│           └── c-footer.js
│       └── form/
│           ├── c-checkbox.js
│           ├── c-fields.js
│           ├── c-label.js
│           ├── c-switch.js
│           └── c-textarea.js
│       └── grid/
│           └── c-grid.js
│       └── header/
│           └── c-header.js
│       └── hero/
│           └── c-hero.js
│       └── input/
│           └── c-input.js
│       └── navbar/
│           └── c-navbar.js
│       └── section/
│           └── c-section.js
│       └── select/
│           └── c-select.js
│   └── tokens/
│       ├── colors.css  
│       ├── spacing.css
│       └── typography.css
│   └─ styles/
│      └─ base.css
│   └── index.js        <!-- registra todos los componentes -->
├── tests/
|    └── test.html      <!-- demo local -->
├── .babelrc            <!-- babel para transpilar JS moderno -->
├── .gitignore
├── jest.config.js
├── jest.setup.js
├── packagc-lock.json
├── package.json
├── README.md
└── webpack.config.mjs  <!-- Webpack config (ESM) -->
```

---

## 🧪 Desarrollo local

```bash
git clone https://github.com/deCaldas/caridad-ui.git
cd caridad-ui
npm install
npm run dev     # Compila en modo desarrollo
npm run build   # Empaqueta para producción
```

Luego usa un servidor local como `npx serve .` o `npx http-server .`.

---

## 🛠️ Tecnologías utilizadas

* Web Components (Custom Elements, Shadow DOM)
* Babel (`@babel/preset-env`)
* Webpack 5 (ES Modules, outputModule)
* HTML5 + CSS encapsulado

---

## 🌐 Sitio oficial:

[https://caridad-ui.js.org](https://caridad-ui.js.org) _(próximamente)_

---

## 🤝 Contribuye

¿Quieres aportar un componente? ¿Traducir? ¿Documentar? ¡Abre un PR o crea un issue!

---

## 👤 Autor

Hecho con ❤️ por **Armando Toro Cárdenas**

GitHub: [@deCaldas](https://github.com/deCaldas).
