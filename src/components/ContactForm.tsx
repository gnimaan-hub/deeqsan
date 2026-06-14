"use client";

import { useState, type FormEvent } from "react";
import T from "./T";
import { useLanguage } from "@/contexts/LanguageContext";

type Status = "idle" | "sending" | "sent" | "error" | "unavailable";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const { lang } = useLanguage();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!data.get("name") || !data.get("email") || !data.get("message")) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else if (res.status === 503) {
        setStatus("unavailable");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink"><T fr="Nom" en="Name" /></span>
          <input
            type="text"
            name="name"
            required
            className="mt-1.5 w-full rounded-xl border border-sand bg-paper-deep/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-jade focus:ring-2 focus:ring-jade/20"
            placeholder={lang === "en" ? "Your name" : "Votre nom"}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">Email</span>
          <input
            type="email"
            name="email"
            required
            className="mt-1.5 w-full rounded-xl border border-sand bg-paper-deep/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-jade focus:ring-2 focus:ring-jade/20"
            placeholder={lang === "en" ? "you@example.com" : "vous@exemple.com"}
          />
        </label>
      </div>

      {/* Honeypot anti-spam : invisible pour les humains, rempli par les robots */}
      <label className="sr-only" aria-hidden="true">
        Ne pas remplir ce champ
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink"><T fr="Sujet" en="Subject" /></span>
        <select
          name="subject"
          className="mt-1.5 w-full rounded-xl border border-sand bg-paper-deep/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-jade focus:ring-2 focus:ring-jade/20"
          defaultValue="general"
        >
          <option value="general">{lang === "en" ? "General question" : "Question générale"}</option>
          <option value="librairie">{lang === "en" ? "Book availability" : "Disponibilité d'un ouvrage"}</option>
          <option value="manuscrit">{lang === "en" ? "Manuscript submission" : "Soumission d'un manuscrit"}</option>
          <option value="evenement">{lang === "en" ? "Events & partnerships" : "Évènements & partenariats"}</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full resize-none rounded-xl border border-sand bg-paper-deep/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-jade focus:ring-2 focus:ring-jade/20"
          placeholder={lang === "en" ? "How can we help you?" : "Comment pouvons-nous vous aider ?"}
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_-12px_rgba(39,184,146,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-jade-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? (
          <T fr="Envoi en cours…" en="Sending…" />
        ) : (
          <>
            <T fr="Envoyer le message" en="Send message" />
            <span aria-hidden>&rarr;</span>
          </>
        )}
      </button>

      {status === "sent" && (
        <p className="rounded-xl bg-jade-pale px-4 py-3 text-sm font-medium text-jade-deep" role="status">
          <T
            fr="Merci ! Votre message a bien été envoyé — notre équipe vous répondra rapidement."
            en="Thank you! Your message has been sent — our team will get back to you shortly."
          />
        </p>
      )}
      {status === "error" && (
        <p className="rounded-xl bg-coral/15 px-4 py-3 text-sm font-medium text-coral" role="alert">
          <T
            fr="L'envoi a échoué. Vérifiez que votre nom, votre email et votre message sont bien renseignés, puis réessayez."
            en="Sending failed. Please check that your name, email and message are filled in, then try again."
          />
        </p>
      )}
      {status === "unavailable" && (
        <p className="rounded-xl bg-coral/15 px-4 py-3 text-sm font-medium text-coral" role="alert">
          <T
            fr={<>Le formulaire est momentanément indisponible. Écrivez-nous directement à{" "}<a className="underline" href="mailto:contact@deeqsan.net">contact@deeqsan.net</a>.</>}
            en={<>The form is temporarily unavailable. Please email us directly at{" "}<a className="underline" href="mailto:contact@deeqsan.net">contact@deeqsan.net</a>.</>}
          />
        </p>
      )}
    </form>
  );
}
