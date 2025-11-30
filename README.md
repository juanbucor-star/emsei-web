# Grupo EMSEI — Sitio completo

Sitio estático inspirado y ampliado a partir de la presencia oficial de Grupo EMSEI en la web. Incluye:

- Landing de inicio con hero principal.
- Sección de servicios / segmentos (consorcios, countries, obras, distribución de materiales).
- Sección “Nuestros clientes” con emprendimientos destacados.
- Sección “Tarjetas y contacto QR”.
- Sección “¿Quiénes somos?” con misión, visión y valores.
- Sección de contacto con datos completos de EMSEI.

Todo el contenido editable se centraliza en:

- `site_data/informacion.json`

Y puede editarse visualmente con **Netlify CMS** accediendo a:

- `/admin`

## Estructura de archivos

- `index.html` — Página principal con todas las secciones.
- `script.js` — Carga dinámica de `site_data/informacion.json` y comportamiento del menú móvil.
- `site_data/informacion.json` — Contenido del sitio (hero, servicios, clientes, tarjetas, quiénes somos, contacto).
- `admin/index.html` — Panel de Netlify CMS.
- `config.yml` — Configuración de Netlify CMS (backend git-gateway, colección única de contenido).
- `README.md` — Este archivo.

## Deploy recomendado (Netlify)

1. Subir este código a un repositorio en GitHub.
2. En Netlify, crear un **New site from Git** apuntando a ese repositorio.
3. Build command: *(vacío)* — es un sitio estático puro.
4. Publish directory: raíz del repo.
5. Activar **Identity** + **Git Gateway** en Netlify para poder loguearse en `/admin`.

Una vez desplegado:

- `/` mostrará el sitio completo de Grupo EMSEI.
- `/admin` permitirá editar los textos, clientes, tarjetas y datos de contacto.
