# Sitio EMSEI — Edición de Contenido (Cliente)

Este sitio está construido con:

- HTML + CSS + JavaScript
- Netlify CMS (panel de administración)
- Hosting en Netlify

## 1. Acceso al panel de administración

1. Abrir la URL pública del sitio, por ejemplo:
   - https://TU-SITIO.netlify.app

2. Para entrar al panel de administración:
   - https://TU-SITIO.netlify.app/admin

3. Iniciar sesión con el correo que recibiste por invitación de Netlify (el desarrollador te la envía).

Desde este panel vas a poder cambiar textos, imágenes, servicios, clientes, equipo, proyectos, galería y documentos PDFs sin tocar código.

---

## 2. Secciones que podés editar

En el panel verás una colección llamada:

### 🔵 Contenido del Sitio (informacion)

Al entrar vas a encontrar varios grupos de campos:

### 2.1. Hero y “Quiénes somos”

- **Título del Hero** → Título grande de la portada.
- **Subtítulo del Hero** → Texto debajo del título principal.
- **Texto — Quiénes somos** → Texto de la sección. Podés usar negritas, listas, etc. (es Markdown).
- **Imagen del Hero** → Foto que aparece en la tarjeta del Hero.
- **Imagen QR de Contacto** → Código QR que aparece en la sección de contacto.

---

### 2.2. Servicios

Lista de servicios que se muestran en la sección “Servicios principales”.

Cada servicio tiene:

- Título
- Descripción
- Imagen (opcional)
- Categoría (opcional)
- Orden (número; los más chicos aparecen primero)
- Activo (sí/no — podés desactivar un servicio sin borrarlo)

Podés:

- Agregar servicios nuevos
- Editar los existentes
- Desactivar servicios sin perderlos

---

### 2.3. Clientes

Lista de clientes que se muestran en la sección “Nuestros clientes”.

Cada cliente tiene:

- Nombre
- Ubicación
- Logo (opcional)

---

### 2.4. Equipo

Lista del equipo interno, que se muestra en “Nuestro equipo”.

Cada miembro tiene:

- Nombre
- Cargo
- Descripción (breve bio, en Markdown)
- Foto
- Orden (para decidir el orden en que aparece)

---

### 2.5. Proyectos / Obras

Lista de obras o proyectos realizados, que se muestra en “Proyectos y obras”.

Cada proyecto tiene:

- Título
- Lugar
- Descripción (Markdown)
- Galería de imágenes (podés cargar varias fotos)
- Fecha (opcional)
- Activo (sí/no)

---

### 2.6. Galería General

Lista simple de imágenes que aparece en la sección “Galería”.

Cada ítem es una sola imagen.

---

### 2.7. Documentos

Acá podés subir:

- Folletos
- Tarifarios
- Presentaciones
- Certificados

Cada documento tiene:

- Título
- Archivo (generalmente PDF)

Se muestran en la sección “Documentos y fichas técnicas”, como links descargables.

---

## 3. Cómo guardar cambios

1. Hacer los cambios que quieras en el panel.
2. Hacer clic en **Save** (Guardar).
3. Luego hacer clic en **Publish** (Publicar) o “Publicar cambios”.
4. Netlify va a generar automáticamente una nueva versión del sitio.
5. En unos segundos los cambios se van a ver en la web pública.

Si no ves los cambios:

- probá recargar con **Ctrl + F5**
- o abrí el sitio en una ventana de incógnito.

---

## 4. Recomendaciones para imágenes

- Formato recomendado: **JPG** o **PNG**.
- Peso recomendado: menos de **1 MB** por imagen (para que la web cargue rápido).
- Resoluciones sugeridas:
  - Imagen del Hero: 1200×700 (aprox.)
  - Fotos de equipo: 400×400
  - Imágenes generales: 800×600

---

## 5. Qué NO deberías tocar

Como cliente, NO necesitás editar directamente:

- index.html
- styles.css
- script.js
- admin/config.yml

Estos archivos son responsabilidad del desarrollador.

Vos manejás todo el contenido desde:

> `/admin` → colección **Contenido del Sitio (informacion)**

---

## 6. Resumen rápido

1. Entrar a `/admin`.
2. Iniciar sesión.
3. Abrir **Contenido del Sitio (informacion)**.
4. Editar textos, imágenes, servicios, clientes, equipo, proyectos, galería y documentos.
5. Guardar y publicar.
6. Ver los cambios en la web.

Listo. No necesitás tocar código ni archivos.

