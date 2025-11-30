// Carga dinámica del contenido desde site_data/informacion.json
fetch('./site_data/informacion.json')
  .then((r) => {
    if (!r.ok) throw new Error('No se pudo cargar site_data/informacion.json');
    return r.json();
  })
  .then((data) => {
    // =========================
    // BRANDING / LOGO
    // =========================
    if (data.branding) {
      const logoText = document.getElementById('logo-text');
      const logoSubtitle = document.getElementById('logo-subtitle');
      const logoImg = document.getElementById('logo-image');
      const logoInitials = document.getElementById('logo-initials');

      if (logoText && data.branding.logo_text) {
        logoText.textContent = data.branding.logo_text;
      }
      if (logoSubtitle && data.branding.logo_subtitle) {
        logoSubtitle.textContent = data.branding.logo_subtitle;
      }
      if (logoImg && data.branding.logo_image) {
        logoImg.src = data.branding.logo_image;
        logoImg.alt = data.branding.logo_alt || 'Logo Grupo EMSEI';
        logoImg.classList.remove('hidden');
        if (logoInitials) logoInitials.classList.add('hidden');
      }
    }

    // =========================
    // HERO
    // =========================
    if (data.hero) {
      const heroTitle = document.getElementById('hero-title');
      if (heroTitle && data.hero.title) heroTitle.textContent = data.hero.title;

      const heroSubtitle = document.getElementById('hero-subtitle');
      if (heroSubtitle && data.hero.subtitle) heroSubtitle.textContent = data.hero.subtitle;

      const heroText = document.getElementById('hero-text');
      if (heroText && data.hero.text) heroText.textContent = data.hero.text;

      // Imagen opcional en panel lateral
      const heroImgContainer = document.getElementById('hero-image-container');
      const heroImg = document.getElementById('hero-image');
      if (heroImgContainer && heroImg && data.hero.image) {
        heroImg.src = data.hero.image;
        heroImg.alt = data.hero.image_alt || '';
        heroImgContainer.classList.remove('hidden');
      }
    }

    // =========================
    // SEGMENTOS / SERVICIOS
    // =========================
    const segmentsGrid = document.getElementById('segments-grid');
    if (segmentsGrid && Array.isArray(data.segments)) {
      segmentsGrid.innerHTML = '';
      data.segments.forEach((seg) => {
        const card = document.createElement('article');
        card.className =
          'bg-white rounded-2xl border border-slate-200/80 shadow-sm px-4 py-3 flex flex-col justify-between hover:shadow-md transition-shadow';
        card.innerHTML = `
          <div>
            <h3 class="text-sm font-semibold text-slate-900 mb-1">${seg.title || ''}</h3>
            <p class="text-[11px] text-slate-500 mb-2">${seg.tagline || ''}</p>
            <p class="text-xs text-slate-600">${seg.description || ''}</p>
          </div>
        `;
        segmentsGrid.appendChild(card);
      });
    }

    // =========================
    // TRABAJOS REALES
    // =========================
    const projectsSection = document.getElementById('trabajos');
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsSection && projectsGrid && Array.isArray(data.projects) && data.projects.length > 0) {
      projectsSection.classList.remove('hidden');
      projectsGrid.innerHTML = '';
      data.projects.forEach((proj) => {
        const card = document.createElement('article');
        card.className =
          'bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow';
        let imgBlock = '';
        if (proj.image) {
          imgBlock = `
            <div class="h-32 sm:h-36 w-full overflow-hidden">
              <img src="${proj.image}" alt="${proj.image_alt || ''}" class="w-full h-full object-cover" />
            </div>
          `;
        }
        card.innerHTML = `
          ${imgBlock}
          <div class="px-4 py-3 flex-1 flex flex-col gap-2">
            <div>
              <h3 class="text-sm font-semibold text-slate-900 mb-0.5">${proj.title || ''}</h3>
              <p class="text-[11px] text-slate-500">${proj.location || ''}</p>
            </div>
            <p class="text-xs text-slate-600 flex-1">${proj.description || ''}</p>
          </div>
        `;
        projectsGrid.appendChild(card);
      });
    }

    // =========================
    // CLIENTES
    // =========================
    const clientsTitle = document.getElementById('clients-title');
    if (clientsTitle && data.clients_title) {
      clientsTitle.textContent = data.clients_title;
    }

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

    // =========================
    // TARJETAS / CONTACTO QR
    // =========================
    if (data.cards) {
      const cardsTitle = document.getElementById('cards-title');
      if (cardsTitle && data.cards.title) cardsTitle.textContent = data.cards.title;

      const cardsIntro = document.getElementById('cards-intro');
      if (cardsIntro && data.cards.intro) cardsIntro.textContent = data.cards.intro;

      const cardsList = document.getElementById('cards-list');
      if (cardsList && Array.isArray(data.cards.items)) {
        cardsList.innerHTML = '';
        data.cards.items.forEach((item) => {
          const li = document.createElement('li');
          li.innerHTML = `<span class="font-semibold">${item.title}:</span> ${item.text}`;
          cardsList.appendChild(li);
        });
      }
    }

    // =========================
    // QUIÉNES SOMOS
    // =========================
    if (data.about) {
      const mission = document.getElementById('about-mission');
      if (mission && data.about.mission) mission.textContent = data.about.mission;

      const vision = document.getElementById('about-vision');
      if (vision && data.about.vision) vision.textContent = data.about.vision;

      const values = document.getElementById('about-values');
      if (values && data.about.values) values.textContent = data.about.values;
    }

    // =========================
    // CONTACTO GENERAL
    // =========================
    const contact = data.contact || {};
    const phoneMain = contact.phone_main || '351 2035158';
    const phoneSecondary = contact.phone_secondary || '351 3482841';
    const email = contact.email || 'contacto@grupoemsei.com';
    const address = contact.address || 'Av. Sagrada Familia 1171';

    // Top strip
    const topPhoneMain = document.getElementById('top-phone-main');
    if (topPhoneMain) topPhoneMain.textContent = phoneMain;

    const topPhoneSecondary = document.getElementById('top-phone-secondary');
    if (topPhoneSecondary) topPhoneSecondary.textContent = phoneSecondary;

    const topEmail = document.getElementById('top-email');
    if (topEmail) topEmail.textContent = email;

    const topAddress = document.getElementById('top-address');
    if (topAddress) topAddress.textContent = address;

    // Hero panel
    const phoneMainEl = document.getElementById('phone-main');
    if (phoneMainEl) {
      phoneMainEl.textContent = phoneMain;
      phoneMainEl.href = 'tel:' + phoneMain.replace(/\s+/g, '');
    }

    const phoneSecondaryEl = document.getElementById('phone-secondary');
    if (phoneSecondaryEl) {
      phoneSecondaryEl.textContent = phoneSecondary;
      phoneSecondaryEl.href = 'tel:' + phoneSecondary.replace(/\s+/g, '');
    }

    const emailContact = document.getElementById('email-contact');
    if (emailContact) {
      emailContact.textContent = email;
      emailContact.href = 'mailto:' + email;
    }

    const addressContact = document.getElementById('address-contact');
    if (addressContact) {
      addressContact.textContent = address;
    }

    // Tarjetas / QR
    const cardsPhoneMain = document.getElementById('cards-phone-main');
    if (cardsPhoneMain) cardsPhoneMain.textContent = phoneMain;

    const cardsPhoneSecondary = document.getElementById('cards-phone-secondary');
    if (cardsPhoneSecondary) cardsPhoneSecondary.textContent = phoneSecondary;

    // Contacto sección
    const phoneMainInline = document.getElementById('contact-phone-main-inline');
    if (phoneMainInline) phoneMainInline.textContent = phoneMain;

    const phoneSecondaryInline = document.getElementById('contact-phone-secondary-inline');
    if (phoneSecondaryInline) phoneSecondaryInline.textContent = phoneSecondary;

    const emailInline = document.getElementById('contact-email-inline');
    if (emailInline) emailInline.textContent = email;

    const addressInline = document.getElementById('contact-address-inline');
    if (addressInline) addressInline.textContent = address;

    const ctaPhoneMain = document.getElementById('cta-phone-main');
    if (ctaPhoneMain) {
      ctaPhoneMain.href = 'tel:' + phoneMain.replace(/\s+/g, '');
    }

    const ctaEmail = document.getElementById('cta-email');
    if (ctaEmail) {
      ctaEmail.href = 'mailto:' + email;
    }

    // Footer
    const footerPhoneMain = document.getElementById('footer-phone-main');
    if (footerPhoneMain) footerPhoneMain.textContent = phoneMain;

    const footerPhoneSecondary = document.getElementById('footer-phone-secondary');
    if (footerPhoneSecondary) footerPhoneSecondary.textContent = phoneSecondary;

    const footerEmail = document.getElementById('footer-email');
    if (footerEmail) footerEmail.textContent = email;
  })
  .catch((err) => {
    console.error('Error cargando información del sitio:', err);
  });

// Año del footer
(function () {
  const span = document.getElementById('footer-year');
  if (span) span.textContent = String(new Date().getFullYear());
})();

// Menú mobile
(function () {
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });

  mobileNav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
  });
})();
