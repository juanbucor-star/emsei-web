// script.js — Grupo EMSEI
// Carga de contenido dinámico desde archivos JSON en /site_data

const DATA_BASE_PATH = './site_data';

async function loadJSON(fileName) {
  const url = `${DATA_BASE_PATH}/${fileName}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`No se pudo cargar ${url} (status ${res.status})`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error(`Error al cargar ${url}`, err);
    return null;
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && typeof value === 'string' && value.trim() !== '') {
    el.textContent = value;
  }
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (el && typeof href === 'string' && href.trim() !== '') {
    el.setAttribute('href', href);
  }
}

async function loadBranding() {
  const data = await loadJSON('branding.json');
  if (!data) return;

  setText('branding-logo-text', data.logo_text || 'Grupo EMSEI');
  setText('branding-logo-subtitle', data.logo_subtitle || 'Soluciones Eléctricas Integrales');
  setText('branding-tagline', data.tagline || '');
  setText('footer-branding-title', data.logo_text || 'Grupo EMSEI');
  setText('footer-branding-text', data.footer_text || '');
}

async function loadHero() {
  const data = await loadJSON('hero.json');
  if (!data) return;

  setText('hero-title', data.title || '');
  setText('hero-subtitle', data.subtitle || '');
  setText('hero-badge', data.badge || '');

  if (data.cta_text) {
    setText('hero-cta', data.cta_text);
  }
  if (data.cta_link) {
    setHref('hero-cta', data.cta_link);
  }

  if (data.background_image) {
    const hero = document.getElementById('hero');
    if (hero) {
      hero.style.backgroundImage = `url('${data.background_image}')`;
      hero.style.backgroundSize = 'cover';
      hero.style.backgroundPosition = 'center';
    }
  }
}

async function loadServicios() {
  const container = document.getElementById('services-list');
  if (!container) return;

  const data = await loadJSON('servicios.json');
  if (!Array.isArray(data)) return;

  container.innerHTML = '';

  data.forEach((servicio) => {
    const card = document.createElement('article');
    card.className = 'card';

    const tag = servicio.tipo ? `<div class="card-tag">${servicio.tipo}</div>` : '';
    const img = servicio.imagen
      ? `<div class="card-image"><img src="${servicio.imagen}" alt="${servicio.titulo || ''}"></div>`
      : '';

    card.innerHTML = `
      ${tag}
      <h3 class="card-title">${servicio.titulo || ''}</h3>
      <p class="card-text">${servicio.descripcion || ''}</p>
      ${img}
      <div class="card-meta">${servicio.detalle || ''}</div>
    `;

    container.appendChild(card);
  });
}

async function loadClientes() {
  const container = document.getElementById('clients-list');
  if (!container) return;

  const data = await loadJSON('clientes.json');
  if (!Array.isArray(data)) return;

  container.innerHTML = '';

  data.forEach((cliente) => {
    const card = document.createElement('article');
    card.className = 'client-card';

    const hasLogo = !!cliente.logo;
    const logoHTML = hasLogo
      ? `<img src="${cliente.logo}" alt="${cliente.nombre || 'Cliente'}">`
      : `<span class="client-name">${cliente.nombre || 'Cliente'}</span>`;

    card.innerHTML = `
      <div class="client-logo-wrapper">
        ${logoHTML}
      </div>
      <div class="client-name">${cliente.nombre || ''}</div>
      <div class="client-type">${cliente.segmento || ''}</div>
    `;

    if (cliente.url) {
      const wrapper = document.createElement('a');
      wrapper.href = cliente.url;
      wrapper.target = '_blank';
      wrapper.rel = 'noopener';
      wrapper.appendChild(card);
      container.appendChild(wrapper);
    } else {
      container.appendChild(card);
    }
  });
}

async function loadTrabajos() {
  const container = document.getElementById('works-list');
  if (!container) return;

  const data = await loadJSON('trabajos.json');
  if (!Array.isArray(data)) return;

  container.innerHTML = '';

  data.forEach((trabajo) => {
    const card = document.createElement('article');
    card.className = 'card';

    const img = trabajo.imagen
      ? `<div class="card-image"><img src="${trabajo.imagen}" alt="${trabajo.titulo || ''}"></div>`
      : '';

    card.innerHTML = `
      <h3 class="card-title">${trabajo.titulo || ''}</h3>
      <p class="card-text">${trabajo.descripcion || ''}</p>
      ${img}
      <div class="card-meta">${trabajo.detalle || ''}</div>
    `;

    container.appendChild(card);
  });
}

async function loadContacto() {
  const data = await loadJSON('contacto.json');
  if (!data) return;

  setText('contact-intro', data.intro || '');
  setText('contact-phone', data.telefono_visible || data.telefono || '');
  setText('contact-email', data.email || '');
  setText('contact-address', data.direccion || '');
  setText('contact-hours', data.horario || '');

  // Teléfono / WhatsApp link
  const phoneLink = document.getElementById('contact-phone');
  if (phoneLink && data.telefono) {
    phoneLink.href = `tel:${data.telefono}`;
  }

  const emailLink = document.getElementById('contact-email');
  if (emailLink && data.email) {
    emailLink.href = `mailto:${data.email}`;
  }

  // WhatsApp predefinido
  const waBtn = document.getElementById('contact-whatsapp-btn');
  if (waBtn && data.whatsapp) {
    const encoded = encodeURIComponent(
      data.whatsapp_mensaje ||
      'Hola, quiero más información sobre soluciones eléctricas para mi proyecto.'
    );
    waBtn.href = `https://wa.me/${data.whatsapp}?text=${encoded}`;
  }

  // Mapa
  const mapLink = document.getElementById('contact-map-link');
  if (mapLink && data.mapa_url) {
    mapLink.href = data.mapa_url;
  } else if (mapLink) {
    mapLink.style.display = 'none';
  }
}

function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) {
    el.textContent = new Date().getFullYear().toString();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();

  // Cargar todas las secciones en paralelo
  Promise.all([
    loadBranding(),
    loadHero(),
    loadServicios(),
    loadClientes(),
    loadTrabajos(),
    loadContacto()
  ]).catch((err) => {
    console.error('Error al cargar contenido dinámico', err);
  });
});
