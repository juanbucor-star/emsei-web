/**
 * Grupo EMSEI – API de contacto con adjuntos
 * Cloudflare Pages Function (Node-like Standard)
 * Compatible 100% con script.js del frontend
 */

export async function onRequestPost(context) {
  try {
    const SENDGRID_API_KEY = context.env.SENDGRID_API_KEY;

    if (!SENDGRID_API_KEY) {
      return jsonError("Falta la variable SENDGRID_API_KEY", 500);
    }

    // Parsear JSON de forma segura
    const body = await context.request.json().catch(() => null);
    if (!body) return jsonError("El cuerpo debe ser JSON válido.", 400);

    const {
      nombre,
      telefono,
      email,
      servicio,
      urgencia,
      detalle,
      origen,
      attachments = [],
    } = body;

    // Validación mínima
    if (!nombre || !telefono || !email || !detalle) {
      return jsonError("Faltan campos obligatorios.", 400);
    }

    // Validar adjuntos y formatearlos para SendGrid
    const safeAttachments = (attachments || []).map((att) => ({
      filename: att.filename || "adjunto",
      type: att.type || "application/octet-stream",
      content: att.content || "", // Base64 limpio
      disposition: "attachment",
    }));

    // Construcción del HTML del email
    const html = `
      <h2>Nueva consulta desde la Web</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Servicio:</strong> ${servicio || "-"}</p>
      <p><strong>Urgencia:</strong> ${urgencia || "-"}</p>
      <p><strong>Detalle:</strong><br>${detalle}</p>
      <hr>
      <p><strong>Origen:</strong> ${origen || "Web Grupo EMSEI"}</p>
    `;

    // Enviar email usando SendGrid
    const sgRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "contacto@grupoemsei.com" }], // ← CAMBIAR AL MAIL REAL
          },
        ],
        from: {
          email: "no-reply@grupoemsei.com",
          name: "Formulario Web EMSEI",
        },
        subject: `Nueva consulta de ${nombre}`,
        content: [
          {
            type: "text/html",
            value: html,
          },
        ],
        attachments: safeAttachments,
      }),
    });

    if (!sgRes.ok) {
      const errText = await sgRes.text();
      return jsonError("Error enviando email: " + errText, 500);
    }

    // Respuesta correcta PARA EL FRONTEND
    return jsonOK();
  } catch (err) {
    return jsonError("Error interno: " + err.message, 500);
  }
}

/********************
 * Helpers JSON
 ********************/

function jsonOK() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function jsonError(msg, status = 400) {
  return new Response(JSON.stringify({ ok: false, error: msg }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
