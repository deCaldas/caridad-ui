# Guía visual (`GUIDE.md`)

# 📐 Caridad UI — Web Components Design System

> Un sistema de diseño basado en Web Components, inspirado en la identidad de Diego "de Caldas" Toro Cárdenas y el poder del desarrollo nativo.

---

## 🎨 Principios Visuales

| Token       | Valor     | Uso             |
|-------------|-----------|-----------------|
| `--color-primary` | `#0077cc` | Enlaces, botones primarios |
| `--color-bg`      | `#f4f4f4` | Fondos neutros |
| `--radius-sm`     | `4px`     | Bordes suaves |
| `--spacing-md`    | `1rem`    | Padding y márgenes |

> Todos los tokens están definidos en `/src/styles/tokens.css`.

---

## 🧱 Componentes Disponibles

| Nombre      | Tag            | Descripción                  |
|-------------|----------------|------------------------------|
| Header      | `<e-header>`   | Cabecera con slots y nav     |
| ...         | *(próximamente)* |                            |

---

## 🧪 Testing

Utilizamos [Web Test Runner](https://modern-web.dev/docs/test-runner/) para pruebas unitarias.

```bash
npm run test
```

---

## 🛠️ Instalación y Uso

```bash
npm install caridadui
```

Importa el componente en tu proyecto:

```js
import 'caridadui/e-header';
```

---

## 🌐 Créditos

Creado con pasión por **Diego Toro Cárdenas**
GitHub: [@deCaldas](https://github.com/deCaldas)

---
