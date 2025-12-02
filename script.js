// ===============================
// Grupo EMSEI – Frontend lógica
// ===============================

// URL del Cloudflare Worker o API
const API_URL = "https://contact.juanbucor.workers.dev/contact"; // MANTENER O CAMBIAR SEGÚN TU CONFIGURACIÓN

// Scroll suave
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  // Ajuste para el sticky header (80px)
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}
window.scrollToId = scrollToId;

// Toggle menú móvil
const btnMenu = document.getElementById("btn-menu");
const mobileMenu = document.getElementById("mobile-menu");
if (btnMenu && mobileMenu) {
  btnMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Cierra el menú móvil al hacer clic en un enlace
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// Año en footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===============================
// Lógica del Formulario
// ===============================

const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const btnEnviar = document.getElementById("btn-enviar");
const btnTexto = document.getElementById("btn-texto");
const btnSpinner = document.getElementById("btn-spinner");

// Campos del formulario
const nombreEl = document.getElementById("nombre");
const telEl = document.getElementById("telefono");
const emailEl = document.getElementById("email");
const tipoClienteEl = document.getElementById("tipoCliente"); // NUEVO
const servicioEl = document.getElementById("servicio");
const urgenciaEl = document.getElementById("urgencia");
const detalleEl = document.getElementById("detalle");
const honeypotEl = document.getElementById("honeypot"); // NUEVO

// Modal
const modalExito = document.getElementById("modal-exito");
function abrirModalExito() {
  if (modalExito) modalExito.classList.remove("hidden");
}
function cerrarModalExito() {
  if (modalExito) modalExito.classList.add("hidden");
}
window.cerrarModalExito = cerrarModalExito;

// Muestra el estado del envío
function mostrarStatus(tipo, mensaje) {
  formStatus.textContent = mensaje;
  formStatus.classList.remove("hidden", "text-red-500", "text-green-600");
  if (tipo === "error") {
    formStatus.classList.add("text-red-500");
  } else {
    formStatus.classList.add("text-green-600");
  }
}

// Control de carga del botón
function setFormLoading(isLoading) {
  if (isLoading) {
    btnEnviar.disabled = true;
    btnTexto.textContent = "Enviando...";
    btnSpinner.classList.remove("hidden");
  } else {
    btnEnviar.disabled = false;
    btnTexto.textContent = "Enviar Consulta Técnica";
    btnSpinner.classList.add("hidden");
  }
}

// Handler de envío de formulario
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Resetear status
    formStatus.classList.add("hidden");

    const payload = {
      nombre: nombreEl.value.trim(),
      telefono: telEl.value.trim(),
      email: emailEl.value.trim(),
      tipoCliente: tipoClienteEl.value.trim(), // <-- AÑADIDO
      servicio: servicioEl.value.trim(),
      urgencia: urgenciaEl.value.trim(),
      detalle: detalleEl.value.trim(),
      honeypot: honeypotEl.value.trim(), // <-- AÑADIDO (Spam trap)
      origen: "Web Grupo EMSEI",
    };

    // 1. CHEQUEO HONEYPOT (Protección de frontend)
    if (payload.honeypot) {
      // Si el campo honeypot está lleno, es un bot. Simular éxito y salir.
      mostrarStatus("ok", "Tu consulta fue enviada correctamente.");
      form.reset();
      abrirModalExito();
      return; 
    }

    try {
      setFormLoading(true);
      mostrarStatus("ok", "Enviando tu consulta, por favor esperá...");

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data || data.ok !== true) {
        throw new Error("Respuesta no válida del servidor");
      }

      mostrarStatus("ok", "Tu consulta fue enviada correctamente.");
      form.reset();
      abrirModalExito();
    } catch (err) {
      console.error(err);
      mostrarStatus(
        "error",
        "Hubo un problema al enviar la consulta. Probá de nuevo o escribinos por WhatsApp."
      );
    } finally {
      setFormLoading(false);
    }
  });
}
