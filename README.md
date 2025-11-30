# EMSEI — Nuestros clientes

Sitio estático inspirado en la página “Nuestros clientes” de Grupo EMSEI (Google Sites), preparado para deploy en GitHub Pages / Netlify y editable con Static CMS.

## Estructura

- `index.html` — Landing principal “Nuestros clientes” con diseño moderno (Tailwind CDN).
- `script.js` — Carga dinámica de `site_data/informacion.json` para:
  - Título y textos de cabecera.
  - Listado de clientes.
  - Datos de contacto (teléfonos, mail, dirección).
- `site_data/informacion.json` — Contenido editable del sitio.
- `config.yml` — Configuración de Static CMS, apuntando a `site_data/informacion.json`.
- `admin/index.html` — Panel de Static CMS. Entrar a `/admin` y loguearse con GitHub para editar contenido.

## Cómo editar contenido

1. Hacer deploy de este repositorio (GitHub + Netlify recomendado).
2. Entrar a `/admin` en el sitio deployado.
3. Loguearse con GitHub.
4. Editar la colección **Contenido del Sitio**:
   - Hero (títulos y textos).
   - Listado de clientes (nombre + barrio / zona).
   - Datos de contacto.

Al guardar, Static CMS actualizará `site_data/informacion.json` y el sitio mostrará los cambios al recargar la página.

## Deploy rápido en Netlify

- Crear un nuevo sitio desde GitHub apuntando a este repositorio.
- Build command: *no build* (sitio estático puro).
- Publish directory: raíz del repo.

Listo: la landing `/` será la página de clientes y `/admin` el panel de contenido.
