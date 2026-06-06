"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!data.get("name") || !data.get("email") || !data.get("message")) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    // NOTE : envoi simulé côté client — à brancher sur un service d'envoi
    // réel (API route + service email) avant la mise en production.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("sent");
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">Nom</span>
          <input
            type="text"
            name="name"
            required
            className="mt-1.5 w-full rounded-xl border border-sand bg-paper-deep/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-jade focus:ring-2 focus:ring-jade/20"
            placeholder="Votre nom"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Email</span>
          <input
            type="email"
            name="email"
            required
            className="mt-1.5 w-full rounded-xl border border-sand bg-paper-deep/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-jade focus:ring-2 focus:ring-jade/20"
            placeholder="vous@exemple.com"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ink">Sujet</span>
        <select
          name="subject"
          className="mt-1.5 w-full rounded-xl border border-sand bg-paper-deep/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-jade focus:ring-2 focus:ring-jade/20"
          defaultValue="general"
        >
          <option value="general">Question générale</option>
          <option value="librairie">Disponibilité d&apos;un ouvrage</option>
          <option value="manuscrit">Soumission d&apos;un manuscrit</option>
          <option value="evenement">Évènements &amp; partenariats</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full resize-none rounded-xl border border-sand bg-paper-deep/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-jade focus:ring-2 focus:ring-jade/20"
          placeholder="Comment pouvons-nous vous aider ?"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_-12px_rgba(39,184,146,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-jade-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
        {status !== "sending" && <span aria-hidden>&rarr;</span>}
      </button>

      {status === "sent" && (
        <p className="rounded-xl bg-jade-pale px-4 py-3 text-sm font-medium text-jade-deep" role="status">
          Merci ! Votre message a bien été pris en compte — notre équipe vous répondra rapidement.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-xl bg-coral/15 px-4 py-3 text-sm font-medium text-coral" role="alert">
          Merci de renseigner votre nom, votre email et votre message avant l&apos;envoi.
        </p>
      )}
    </form>
  );
}
