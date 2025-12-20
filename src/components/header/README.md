# Snippets HTML para usar `<c-header>`

## **Opción 1: Básico con logo y título**

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

  <!-- Acciones (botones, búsqueda, etc.) -->
  <div slot="actions">
    <button class="btn-icon">
      <svg width="20" height="20" fill="currentColor">
        <use href="#icon-search" />
      </svg>
    </button>
    <button class="btn-icon">
      <svg width="20" height="20" fill="currentColor">
        <use href="#icon-notification" />
      </svg>
    </button>
  </div>

  <!-- Avatar del usuario -->
  <div slot="avatar" class="avatar">
    <img src="https://placehold.co/40x40/8b5cf6/ffffff.png" alt="Usuario">
  </div>

  <!-- Menú desplegable del usuario -->
  <div slot="user-menu">
    <button onclick="console.log('Perfil')">👤 Mi Perfil</button>
    <button onclick="console.log('Configuración')">⚙️ Configuración</button>
    <button onclick="console.log('Cerrar sesión')">🚪 Cerrar Sesión</button>
  </div>

  <!-- Slots adicionales -->
  <div slot="brand">
    <span style="color: var(--color-accent); font-size: 0.8em;">Pro</span>
  </div>
</c-header>

<!-- Para los iconos SVG (añadir en tu HTML) -->
<svg style="display: none;">
  <symbol id="icon-search" viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </symbol>
  <symbol id="icon-notification" viewBox="0 0 24 24">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </symbol>
</svg>
```

## **Opción 2: Transparente con navegación flotante**

```html
<c-header
  title="Portfolio"
  variant="transparent"
  position="floating"
  theme="dark"
>
  <nav slot="nav">
    <a href="#inicio">Inicio</a>
    <a href="#proyectos">Proyectos</a>
    <a href="#sobre-mi">Sobre mí</a>
    <a href="#blog">Blog</a>
    <a href="#contacto" style="color: #ff6b6b;">Contacto</a>
  </nav>

  <button slot="actions" class="btn-primary">
    Descargar CV
  </button>
</c-header>

<style>
  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 500;
  }
</style>
```

## **Opción 3: E-commerce minimalista**

```html
<c-header
  logo="/assets/logo.svg"
  href="/"
  title="TiendaOnline"
  variant="solid"
  position="sticky"
  theme="light"
>
  <!-- Navegación de categorías -->
  <nav slot="nav" style="gap: 2rem;">
    <a href="/hombre">👕 Hombre</a>
    <a href="/mujer">👚 Mujer</a>
    <a href="/ninos">👶 Niños</a>
    <a href="/ofertas" style="color: #ef4444; font-weight: bold;">🔥 Ofertas</a>
  </nav>

  <!-- Iconos de acciones -->
  <div slot="actions" style="display: flex; gap: 1rem; align-items: center;">
    <button aria-label="Buscar" style="background: none; border: none; cursor: pointer;">
      🔍
    </button>
    <button aria-label="Carrito" style="background: none; border: none; cursor: pointer; position: relative;">
      🛒
      <span style="
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ef4444;
        color: white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">3</span>
    </button>
    <button aria-label="Favoritos" style="background: none; border: none; cursor: pointer;">
      ♥️
    </button>
  </div>

  <!-- Menú de usuario -->
  <div slot="user-menu">
    <a href="/mi-cuenta">Mi Cuenta</a>
    <a href="/pedidos">Mis Pedidos</a>
    <a href="/favoritos">Favoritos</a>
    <a href="/configuracion">Configuración</a>
    <hr style="margin: 8px 0; border: none; border-top: 1px solid #e5e7eb;">
    <a href="/cerrar-sesion" style="color: #ef4444;">Cerrar Sesión</a>
  </div>
</c-header>
```

## **Opción 4: Dashboard administrativo**

```html
<c-header
  logo="/admin/logo.png"
  href="/admin"
  title="AdminPanel"
  position="fixed"
  theme="dark"
>
  <!-- Menú de navegación del dashboard -->
  <nav slot="nav">
    <a href="/admin/dashboard">📊 Dashboard</a>
    <a href="/admin/usuarios">👥 Usuarios</a>
    <a href="/admin/productos">📦 Productos</a>
    <a href="/admin/pedidos">📋 Pedidos</a>
    <a href="/admin/analitica">📈 Analítica</a>
  </nav>

  <!-- Barra de búsqueda y notificaciones -->
  <div slot="actions">
    <div style="position: relative;">
      <input type="search" placeholder="Buscar..." style="
        padding: 8px 32px 8px 12px;
        border-radius: 20px;
        border: 1px solid #4b5563;
        background: #1f2937;
        color: white;
        font-size: 14px;
        width: 200px;
      ">
      <span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%);">🔍</span>
    </div>

    <button style="background: none; border: none; color: white; cursor: pointer; position: relative;">
      🔔
      <span style="
        position: absolute;
        top: -5px;
        right: -5px;
        background: #3b82f6;
        color: white;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">5</span>
    </button>
  </div>

  <!-- Menú de administrador -->
  <div slot="user-menu" style="min-width: 220px;">
    <div style="padding: 12px; border-bottom: 1px solid #374151;">
      <div style="font-weight: bold;">Admin User</div>
      <div style="font-size: 12px; color: #9ca3af;">admin@ejemplo.com</div>
    </div>
    <a href="/admin/perfil">👤 Mi Perfil</a>
    <a href="/admin/configuracion">⚙️ Configuración</a>
    <a href="/admin/ajustes">🔧 Ajustes Avanzados</a>
    <hr style="margin: 8px 0;">
    <a href="/admin/registros">📝 Registros del Sistema</a>
    <a href="/admin/backup">💾 Backup</a>
    <hr style="margin: 8px 0;">
    <a href="/" style="color: #60a5fa;">🏠 Ir al Sitio Principal</a>
    <a href="/logout" style="color: #f87171;">🚪 Cerrar Sesión</a>
  </div>
</c-header>
```

## **Ejemplo de uso con contenido de página:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Sitio Web</title>
  <style>
    /* Estilos básicos para la página */
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8fafc;
    }
    
    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .content {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin-top: 2rem;
    }
    
    /* Estilos para enlaces dentro del header */
    c-header a {
      text-decoration: none;
      color: inherit;
      padding: 0.5rem 0;
      position: relative;
    }
    
    c-header a:hover::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: currentColor;
    }
  </style>
</head>
<body>
  <!-- Header personalizado -->
  <c-header
    logo="https://via.placeholder.com/32"
    href="/"
    title="MiSitio"
    position="sticky"
  >
    <nav slot="nav">
      <a href="/inicio">🏠 Inicio</a>
      <a href="/nosotros">👥 Nosotros</a>
      <a href="/servicios">🛠️ Servicios</a>
      <a href="/contacto">📞 Contacto</a>
    </nav>
    
    <button slot="actions" onclick="alert('Hola!')" style="
      background: #3b82f6;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
    ">
      Acción
    </button>
  </c-header>

  <!-- Contenido principal -->
  <main id="main-content">
    <div class="content">
      <h1>Bienvenido a Mi Sitio</h1>
      <p>Este es un ejemplo de contenido. El header permanece fijo en la parte superior.</p>
      <p>En dispositivos móviles, el menú se convierte en un menú hamburguesa.</p>
    </div>
  </main>

  <!-- Importar el componente (ajustar la ruta según tu estructura) -->
  <script type="module">
    import { CHeader } from './path/to/c-header.js';
    // O si está en un CDN:
    // import { CHeader } from 'https://cdn.tu-dominio.com/c-header.js';
  </script>
</body>
</html>
```

## **Propiedades disponibles para personalizar:**

```html
<!-- Todos los atributos opcionales -->
<c-header
  logo="URL del logo"                     <!-- Opcional -->
  href="/"                                <!-- Opcional, default: "/" -->
  title="Título del sitio"                <!-- Opcional -->
  variant="solid|transparent"             <!-- Opcional, default: "solid" -->
  position="static|sticky|fixed|floating" <!-- Opcional, default: "static" -->
  theme="auto|light|dark"                 <!-- Opcional, default: "auto" -->
>
  <!-- Slots disponibles -->
  <div slot="nav">...</div>       <!-- Navegación principal -->
  <div slot="actions">...</div>    <!-- Botones/acciones -->
  <div slot="avatar">...</div>     <!-- Avatar del usuario -->
  <div slot="user-menu">...</div>  <!-- Menú desplegable -->
  <div slot="brand">...</div>      <!-- Contenido adicional en la marca -->
</c-header>
```

Estos ejemplos son copiables y funcionarán una vez que tengas el componente importado en tu proyecto.
