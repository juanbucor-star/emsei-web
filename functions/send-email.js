export async function onRequestPost(context) {
  const SENDGRID_API_KEY = context.env.SENDGRID_API_KEY;

  try {
    const body = await context.request.json();
    const { name, email, phone, message, attachments = [] } = body;

    const emailBody = {
      personalizations: [{ to: [{ email: "contacto@tuempresa.com" }] }],
      from: { email: "no-reply@tuempresa.com", name: "Formulario EMSEI" },
      subject: `Nueva consulta de ${name}`,
      content: [{
        type: "text/html",
        value: `
          <h2>Nueva consulta</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Mensaje:</strong><br>${message}</p>
        `
      }],
      attachments: attachments.map(att => ({
        content: att.content,
        filename: att.filename,
        type: att.type,
        disposition: "attachment"
      }))
    };

    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailBody)
    });

    if (!res.ok) return new Response("Failed to send email", { status: 500 });

    return new Response("Email sent", { status: 200 });
  } catch {
    return new Response("Error in request", { status: 500 });
  }
}
