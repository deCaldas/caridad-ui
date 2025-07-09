# Caridad UI ✨

## Librería de componentes web para un sistema de diseño

![npm](https://img.shields.io/npm/v/caridad-ui)
![license](https://img.shields.io/npm/l/caridad-ui)

**Web Components modernos, accesibles y sin dependencias.**  
Diseñado para proyectos artísticos, independientes y open source.  
Hecho con ❤️ por Diego Toro (aka @deCaldas).

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

## 🌟 Componentes disponibles

### `<e-header>`

Encabezado reutilizable con slots para título, subtítulo y navegación.

```html
<e-header>
  <span slot="title">AiTe de Caldas</span>
  <span slot="subtitle">Caridad UI Demo</span>
  <a href="/" slot="nav">Inicio</a>
</e-header>
```

Más componentes próximamente:

* `<e-button>`
* `<e-card>`
* `<e-dialog>`

---

## 📁 Estructura del proyecto

```plaintext
design-system/
├── src/
│   ├── components/
│       └── e-header/   <!-- Cada componente tiene su propia carpeta -->
│           ├── e-header.js
│           ├── e-header.css
│           └── e-header.test.js
│   ├── styles/
│       ├── tokens.css
│       └── global.css
│   ├── utils/
│   └── index.js        <!-- Punto de entrada (registra todos los componentes) -->
├── public/
│   └── assets/
├── tests/
|    └── index.html     <!-- Demo local -->
├── .babelrc            <!-- Babel para transpilar JS moderno -->
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── webpack.config.mjs  <!-- Webpack config (ESM) -->
```

---

## 🧪 Desarrollo local

```bash
git clone https://github.com/tuusuario/caridad-ui.git
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

**Diego Toro Cárdenas**
[@deCaldas](https://github.com/deCaldas).
