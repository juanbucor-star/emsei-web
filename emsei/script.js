// ============================
// EMSEI — script.js PRO CMS
// ============================

// Helper: crear elemento desde HTML string
function createElementFromHTML(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

// Render HERO, Quiénes somos y QR
function renderBasico(info) {
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const heroImage = document.getElementById("hero-image");
  const nosotros = document.getElementById("nosotros-texto");
  const qrImg = document.getElementById("qr-image");

  if (heroTitle && info.hero_title) heroTitle.textContent = info.hero_title;
  if (heroSubtitle && info.hero_subtitle) heroSubtitle.textContent = info.hero_subtitle;

  if (nosotros && info.nosotros_texto) {
    try {
      nosotros.innerHTML = marked.parse(info.nosotros_texto);
    } catch (e) {
      console.error("Error renderizando markdown de nosotros_texto:", e);
      nosotros.textContent = info.nosotros_texto;
    }
  }

  if (heroImage && info.hero_image) {
    heroImage.src = info.hero_image;
  }

  if (qrImg && info.qr_contacto) {
    qrImg.src = info.qr_contacto;
  }
}

// Render SERVICIOS
function renderServicios(info) {
  const cont = document.getElementById("servicios-container");
  if (!cont) return;

  const servicios = Array.isArray(info.servicios) ? info.servicios : [];
  if (!servicios.length) {
    cont.innerHTML = "<p>No hay servicios cargados todavía.</p>";
    return;
  }

  servicios.sort((a, b) => {
    const ao = typeof a.orden === "number" ? a.orden : 0;
    const bo = typeof b.orden === "number" ? b.orden : 0;
    return ao - bo;
  });

  cont.innerHTML = "";
  servicios.forEach((s) => {
    if (s.activo === false) return;

    const imgHtml = s.imagen
      ? `<div class="card-image-wrap"><img src="${s.imagen}" alt="${s.titulo || ""}" /></div>`
      : "";

    const catHtml = s.categoria
      ? `<p class="card-tag">${s.categoria}</p>`
      : "";

    const el = createElementFromHTML(`
      <article class="card servicio-card">
        ${imgHtml}
        ${catHtml}
        <h3>${s.titulo || ""}</h3>
        <p>${s.descripcion || ""}</p>
      </article>
    `);
    cont.appendChild(el);
  });
}

// Render CLIENTES
function renderClientes(info) {
  const cont = document.getElementById("clientes-container");
  if (!cont) return;

  const clientes = Array.isArray(info.clientes) ? info.clientes : [];
  if (!clientes.length) {
    cont.innerHTML = "<p>No hay clientes cargados todavía.</p>";
    return;
  }

  cont.innerHTML = "";
  clientes.forEach((c) => {
    const logoHtml = c.logo
      ? `<div class="client-logo-wrap"><img src="${c.logo}" alt="${c.nombre || ""}" /></div>`
      : "";

    const el = createElementFromHTML(`
      <article class="client-card">
        ${logoHtml}
        <h3>${c.nombre || ""}</h3>
        <p>${c.ubicacion || ""}</p>
      </article>
    `);
    cont.appendChild(el);
  });
}

// Render EQUIPO
function renderEquipo(info) {
  const cont = document.getElementById("equipo-container");
  if (!cont) return;

  const equipo = Array.isArray(info.equipo) ? info.equipo : [];
  if (!equipo.length) {
    cont.innerHTML = "";
    return;
  }

  equipo.sort((a, b) => {
    const ao = typeof a.orden === "number" ? a.orden : 0;
    const bo = typeof b.orden === "number" ? b.orden : 0;
    return ao - bo;
  });

  cont.innerHTML = "";
  equipo.forEach((m) => {
    const fotoHtml = m.foto
      ? `<div class="equipo-foto-wrap"><img src="${m.foto}" alt="${m.nombre || ""}" /></div>`
      : "";

    let descHtml = "";
    if (m.descripcion) {
      try {
        descHtml = marked.parse(m.descripcion);
      } catch (e) {
        descHtml = `<p>${m.descripcion}</p>`;
      }
    }

    const el = createElementFromHTML(`
      <article class="equipo-card">
        ${fotoHtml}
        <div class="equipo-body">
          <h3>${m.nombre || ""}</h3>
          <p class="equipo-cargo">${m.cargo || ""}</p>
          <div class="equipo-descripcion">${descHtml}</div>
        </div>
      </article>
    `);
    cont.appendChild(el);
  });
}

// Render PROYECTOS / OBRAS
function renderProyectos(info) {
  const cont = document.getElementById("proyectos-container");
  if (!cont) return;

  const proyectos = Array.isArray(info.proyectos) ? info.proyectos : [];
  if (!proyectos.length) {
    cont.innerHTML = "";
    return;
  }

  cont.innerHTML = "";
  proyectos.forEach((p) => {
    if (p.activo === false) return;

    let galeriaHtml = "";
    if (Array.isArray(p.galeria) && p.galeria.length) {
      galeriaHtml = `
        <div class="proyecto-galeria">
          ${p.galeria
            .map(
              (g) =>
                g.imagen
                  ? `<div class="proyecto-thumb"><img src="${g.imagen}" alt="${p.titulo || ""}" /></div>`
                  : ""
            )
            .join("")}
        </div>
      `;
    }

    let descHtml = "";
    if (p.descripcion) {
      try {
        descHtml = marked.parse(p.descripcion);
      } catch (e) {
        descHtml = `<p>${p.descripcion}</p>`;
      }
    }

    const fechaTexto = p.fecha ? new Date(p.fecha).toLocaleDateString("es-AR") : "";

    const el = createElementFromHTML(`
      <article class="proyecto-card">
        <div class="proyecto-header">
          <h3>${p.titulo || ""}</h3>
          <p class="proyecto-lugar">${p.lugar || ""}</p>
          ${
            fechaTexto
              ? `<p class="proyecto-fecha"><i class="fa-regular fa-calendar"></i> ${fechaTexto}</p>`
              : ""
          }
        </div>
        <div class="proyecto-descripcion">${descHtml}</div>
        ${galeriaHtml}
      </article>
    `);
    cont.appendChild(el);
  });
}

// Render GALERÍA GENERAL
function renderGaleria(info) {
  const cont = document.getElementById("galeria-container");
  if (!cont) return;

  const gal = Array.isArray(info.galeria) ? info.galeria : [];
  if (!gal.length) {
    cont.innerHTML = "";
    return;
  }

  cont.innerHTML = "";
  gal.forEach((g) => {
    if (!g.imagen) return;
    const el = createElementFromHTML(`
      <div class="galeria-item">
        <img src="${g.imagen}" alt="Imagen de galería" />
      </div>
    `);
    cont.appendChild(el);
  });
}

// Render DOCUMENTOS
function renderDocumentos(info) {
  const cont = document.getElementById("documentos-list");
  if (!cont) return;

  const docs = Array.isArray(info.documentos) ? info.documentos : [];
  if (!docs.length) {
    cont.innerHTML = "";
    return;
  }

  cont.innerHTML = "";
  docs.forEach((d) => {
    if (!d.archivo) return;
    const el = createElementFromHTML(`
      <li class="documento-item">
        <a href="${d.archivo}" target="_blank" rel="noopener">
          <i class="fa-regular fa-file-pdf"></i> ${d.titulo || "Documento"}
        </a>
      </li>
    `);
    cont.appendChild(el);
  });
}

// Cargar todo desde informacion.json
async function loadSiteData() {
  try {
    const res = await fetch("/site_data/informacion.json", { cache: "no-store" });
    if (!res.ok) throw new Error("No se pudo cargar informacion.json");
    const info = await res.json();

    renderBasico(info);
    renderServicios(info);
    renderClientes(info);
    renderEquipo(info);
    renderProyectos(info);
    renderGaleria(info);
    renderDocumentos(info);
  } catch (err) {
    console.error("Error cargando datos del sitio:", err);
  }
}

// Navegación móvil + scroll suave + año footer + formulario
function initUIHelpers() {
  const nav = document.getElementById("main-nav");
  const toggle = document.querySelector(".nav-toggle");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const yOffset = -80;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const telefono = form.telefono.value.trim();
      const mensaje = form.mensaje.value.trim();

      if (!nombre || !email || !telefono || !mensaje) {
        alert("Por favor completá todos los campos obligatorios.");
        return;
      }

      const subject = encodeURIComponent(`Consulta desde la web — ${nombre}`);
      const bodyLines = [
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        `Teléfono / WhatsApp: ${telefono}`,
        "",
        "Mensaje:",
        mensaje,
      ];
      const body = encodeURIComponent(bodyLines.join("\n"));

      window.location.href = `mailto:contacto@grupoemsei.com?subject=${subject}&body=${body}`;
    });
  }
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  initUIHelpers();
  loadSiteData();
});
