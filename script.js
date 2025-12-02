// ================================
// Grupo EMSEI – Frontend lógica
// ================================

const API_URL = "https://contact.juanbucor.workers.dev/contact";

// Scroll suave
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
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

  mobileMenu.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// Año en footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Formulario
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const btnEnviar = document.getElementById("btn-enviar");
const btnTexto = document.getElementById("btn-texto");
const btnSpinner = document.getElementById("btn-spinner");

const nombreEl = document.getElementById("nombre");
const telEl = document.getElementById("telefono");
const emailEl = document.getElementById("email");
const servicioEl = document.getElementById("servicio");
const urgenciaEl = document.getElementById("urgencia");
const detalleEl = document.getElementById("detalle");

const errorNombre = document.getElementById("error-nombre");
const errorTel = document.getElementById("error-telefono");
const errorEmail = document.getElementById("error-email");
const errorDetalle = document.getElementById("error-detalle");

function setError(input, msgEl, hasError) {
  if (!input || !msgEl) return;
  if (hasError) {
    input.classList.add("error");
    msgEl.classList.remove("hidden");
  } else {
    input.classList.remove("error");
    msgEl.classList.add("hidden");
  }
}

function validarEmail(valor) {
  if (!valor) return true;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(valor);
}

function validarFormulario() {
  let ok = true;
  const nombre = nombreEl.value.trim();
  const tel = telEl.value.trim();
  const email = emailEl.value.trim();
  const detalle = detalleEl.value.trim();

  setError(nombreEl, errorNombre, !nombre);
  if (!nombre) ok = false;

  setError(telEl, errorTel, tel.length < 6);
  if (tel.length < 6) ok = false;

  const emailValido = validarEmail(email);
  setError(emailEl, errorEmail, !emailValido);
  if (!emailValido) ok = false;

  setError(detalleEl, errorDetalle, detalle.length < 10);
  if (detalle.length < 10) ok = false;

  return ok;
}

function setFormLoading(isLoading) {
  if (!btnEnviar) return;
  btnEnviar.disabled = isLoading;
  if (btnTexto && btnSpinner) {
    btnTexto.textContent = isLoading ? "Enviando..." : "Enviar consulta";
    btnSpinner.classList.toggle("hidden", !isLoading);
  }
}

function mostrarStatus(tipo, mensaje) {
  if (!formStatus) return;
  formStatus.textContent = mensaje;
  formStatus.className = "text-[11px] rounded-md px-3 py-2 mb-1";

  if (tipo === "error") {
    formStatus.classList.add(
      "bg-red-50",
      "border",
      "border-red-200",
      "text-red-700"
    );
  } else {
    formStatus.classList.add(
      "bg-emerald-50",
      "border",
      "border-emerald-200",
      "text-emerald-700"
    );
  }
  formStatus.classList.remove("hidden");
}

function abrirModalExito() {
  const modal = document.getElementById("modal-exito");
  if (modal) modal.classList.remove("hidden");
}

function cerrarModalExito() {
  const modal = document.getElementById("modal-exito");
  if (modal) modal.classList.add("hidden");
}
window.cerrarModalExito = cerrarModalExito;

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      mostrarStatus("error", "Revisá los campos marcados en rojo.");
      return;
    }

    if (!API_URL || !API_URL.startsWith("http")) {
      mostrarStatus("error", "La URL de la API no está configurada.");
      return;
    }

    const payload = {
      nombre: nombreEl.value.trim(),
      telefono: telEl.value.trim(),
      email: emailEl.value.trim(),
      servicio: servicioEl.value.trim(),
      urgencia: urgenciaEl.value.trim(),
      detalle: detalleEl.value.trim(),
      origen: "Web Grupo EMSEI",
    };

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

// Scroll suave para enlaces de navegación
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const el = document.querySelector(targetId);
    if (!el) return;
    e.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  });
});
