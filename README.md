# Caridad UI ✨

## Librería de componentes web para un sistema de diseño

![npm](https://img.shields.io/npm/v/caridad-ui)
![license](https://img.shields.io/npm/l/caridad-ui)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/caridad-ui)

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
│       └── contact-form/
│           └── c-contact-form.js
│       └── footer/
│           └── c-footer.js
│       └── header/
│           └── c-header.js
│       └── hero/
│           └── c-hero.js
│       └── section/
│           └── c-section.js
│   └── tokens/
│       ├── colors.css  
│       ├── spacing.css
│       └── typography.css
│   └── index.js        <!-- registra todos los componentes -->
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
npm run test    # Ejecuta pruebas
```

Luego usa un servidor local como `npx serve .` o `npx http-server .`.

---

## 🛠️ Tecnologías utilizadas

* Web Components (Custom Elements, Shadow DOM)
* Babel (`@babel/preset-env`)
* Webpack 5 (ES Modules, outputModule)
* HTML5 + CSS encapsulado
* Jest para pruebas

---

## 🌐 Sitio oficial:

[https://caridad-ui.js.org](https://caridad-ui.js.org)

---

## 🤝 Contribuye

¿Quieres aportar un componente? ¿Traducir? ¿Documentar? ¡Abre un PR o crea un issue!

---

## 👤 Autor

Hecho con ❤️ por **Armando Toro Cárdenas**

GitHub: [@deCaldas](https://github.com/deCaldas).
