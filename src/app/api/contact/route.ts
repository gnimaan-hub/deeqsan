const MAX_LENGTHS = { name: 200, email: 254, subject: 50, message: 5000 } as const;

const SUBJECTS = new Set(["general", "librairie", "manuscrit", "evenement"]);

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // honeypot — toujours vide pour un humain
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, MAX_LENGTHS.name);
  const email = (body.email ?? "").trim().slice(0, MAX_LENGTHS.email);
  const subject = SUBJECTS.has(body.subject) ? body.subject : "general";
  const message = (body.message ?? "").trim().slice(0, MAX_LENGTHS.message);

  // Honeypot rempli → robot. On répond comme si tout allait bien.
  if (body.website) {
    return Response.json({ ok: true });
  }

  if (!name || !message || !isValidEmail(email)) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_FORM_TO ?? "contact@deeqsan.net";
  // L'adresse d'expédition doit appartenir à un domaine vérifié dans Resend
  const from = process.env.CONTACT_FORM_FROM ?? "Site Deeqsan <contact@deeqsan.net>";

  if (!apiKey) {
    // Service d'envoi non configuré (RESEND_API_KEY manquant) : on le dit
    // franchement au client plutôt que de simuler un succès.
    console.error("Formulaire de contact : RESEND_API_KEY n'est pas configurée.");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const subjectLabels: Record<string, string> = {
    general: "Question générale",
    librairie: "Disponibilité d'un ouvrage",
    manuscrit: "Soumission d'un manuscrit",
    evenement: "Évènements & partenariats",
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[Site] ${subjectLabels[subject]} — ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\nSujet : ${subjectLabels[subject]}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error("Formulaire de contact : échec d'envoi", res.status, await res.text());
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
