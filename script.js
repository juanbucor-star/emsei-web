// Carga dinámica del contenido de site_data/informacion.json
fetch('/site_data/informacion.json')
  .then((r) => {
    if (!r.ok) throw new Error('No se pudo cargar informacion.json');
    return r.json();
  })
  .then((data) => {
    // Hero
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle && data.hero_title) {
      heroTitle.textContent = data.hero_title;
    }

    const heroSubtitle = document.getElementById('hero-subtitle');
    if (heroSubtitle && data.hero_subtitle) {
      heroSubtitle.textContent = data.hero_subtitle;
    }

    const introText = document.getElementById('intro-text');
    if (introText && data.intro_text) {
      introText.textContent = data.intro_text;
    }

    // Título sección clientes
    const clientsTitle = document.getElementById('clients-title');
    if (clientsTitle && data.clients_title) {
      clientsTitle.textContent = data.clients_title;
    }

    // Clientes
    const clientsGrid = document.getElementById('clients-grid');
    if (clientsGrid && Array.isArray(data.clients)) {
      clientsGrid.innerHTML = '';
      data.clients.forEach((client) => {
        const card = document.createElement('article');
        card.className =
          'bg-white rounded-xl border border-slate-200/80 shadow-sm px-4 py-3 flex flex-col justify-between hover:shadow-md transition-shadow';
        card.innerHTML = `
          <div>
            <h3 class="text-sm font-semibold text-slate-900 mb-0.5">${client.name || ''}</h3>
            <p class="text-xs text-slate-500">${client.location || ''}</p>
          </div>
        `;
        clientsGrid.appendChild(card);
      });
    }

    // Contacto
    const contact = data.contact || {};

    const phoneMain = document.getElementById('phone-main');
    if (phoneMain && contact.phone_main) {
      phoneMain.textContent = contact.phone_main;
      phoneMain.href = 'tel:' + contact.phone_main.replace(/\s+/g, '');
    }

    const phoneSecondary = document.getElementById('phone-secondary');
    if (phoneSecondary && contact.phone_secondary) {
      phoneSecondary.textContent = contact.phone_secondary;
      phoneSecondary.href = 'tel:' + contact.phone_secondary.replace(/\s+/g, '');
    }

    const emailContact = document.getElementById('email-contact');
    if (emailContact && contact.email) {
      emailContact.textContent = contact.email;
      emailContact.href = 'mailto:' + contact.email;
    }

    const addressContact = document.getElementById('address-contact');
    if (addressContact && contact.address) {
      addressContact.textContent = contact.address;
    }

    // Bloques contacto inferiores
    const phoneMainInline = document.getElementById('contact-phone-main-inline');
    if (phoneMainInline && contact.phone_main) {
      phoneMainInline.textContent = contact.phone_main;
    }

    const phoneSecondaryInline = document.getElementById('contact-phone-secondary-inline');
    if (phoneSecondaryInline && contact.phone_secondary) {
      phoneSecondaryInline.textContent = contact.phone_secondary;
    }

    const emailInline = document.getElementById('contact-email-inline');
    if (emailInline && contact.email) {
      emailInline.textContent = contact.email;
    }

    const addressInline = document.getElementById('contact-address-inline');
    if (addressInline && contact.address) {
      addressInline.textContent = contact.address;
    }

    const footerPhoneMain = document.getElementById('footer-phone-main');
    if (footerPhoneMain && contact.phone_main) {
      footerPhoneMain.textContent = contact.phone_main;
    }

    const footerPhoneSecondary = document.getElementById('footer-phone-secondary');
    if (footerPhoneSecondary && contact.phone_secondary) {
      footerPhoneSecondary.textContent = contact.phone_secondary;
    }
  })
  .catch((err) => {
    console.error('Error cargando informacion del sitio:', err);
  });

// Año del footer
(function () {
  const span = document.getElementById('footer-year');
  if (span) {
    span.textContent = String(new Date().getFullYear());
  }
})();
