import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Les Éditions Deeqsan",
  description:
    "Contactez Les Éditions Deeqsan à Djibouti-Ville : adresse, téléphone, emails et formulaire de contact pour vos questions, commandes et projets éditoriaux.",
};

const infoCards = [
  {
    title: "Nous trouver",
    tone: "jade" as const,
    lines: ["Djibouti, Djibouti Ville"],
  },
  {
    title: "Téléphone",
    tone: "coral" as const,
    lines: ["+253 77 81 11 01"],
    href: "tel:+253778111101",
  },
  {
    title: "Email",
    tone: "mango" as const,
    lines: ["contact@deeqsan.net", "idyelmi@deeqsan.net"],
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-grain pb-12 pt-16 lg:pt-24">
        <div aria-hidden className="bg-aura absolute inset-0 -z-10">
          <span className="absolute -left-28 -top-28 h-96 w-96 bg-coral/15" />
          <span className="absolute -right-16 top-16 h-72 w-72 bg-jade/20" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <Reveal>
            <Eyebrow tone="coral" className="mx-auto">Contactez-nous</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl text-balance">
              Parlons lecture, édition ou tout simplement de <span className="text-shimmer">votre prochaine visite</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Une question sur un ouvrage, une envie de soumettre un manuscrit, un
              projet d&rsquo;évènement ? Notre équipe à Djibouti-Ville se fera un
              plaisir de vous répondre.
            </p>
            <p className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-surface/55 px-4 py-1.5 text-xs font-medium text-ink-soft">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-live-pulse rounded-full" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-coral" />
              </span>
              Réponse sous 48h ouvrées · équipe basée à Djibouti-Ville
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <Reveal className="space-y-5">
            {infoCards.map((card, i) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-2xl border border-sand bg-surface/70 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_55px_-35px_rgba(19,74,85,0.4)]"
              >
                <span
                  aria-hidden
                  className="animate-glow-pulse absolute -right-10 -top-10 h-28 w-28 rounded-full bg-jade/10 blur-2xl transition-transform duration-500 group-hover:scale-125"
                  style={{ animationDelay: `${i * 0.7}s` }}
                />
                <Eyebrow tone={card.tone}>{card.title}</Eyebrow>
                <div className="mt-3 space-y-1">
                  {card.lines.map((line) =>
                    card.href ? (
                      <a
                        key={line}
                        href={card.href}
                        className="block text-lg font-medium text-ink transition-colors hover:text-jade-bright"
                      >
                        {line}
                      </a>
                    ) : card.title === "Email" ? (
                      <a
                        key={line}
                        href={`mailto:${line}`}
                        className="block text-base font-medium text-ink transition-colors hover:text-jade-bright"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="text-lg font-medium text-ink">
                        {line}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}

            <div className="group relative overflow-hidden rounded-2xl border border-dashed border-jade/35 bg-jade-pale/40 p-6 text-sm leading-relaxed text-ink-soft transition-colors hover:border-jade/60 hover:bg-jade-pale/60">
              <span className="font-semibold text-jade-bright">De passage à Djibouti-Ville ?</span>{" "}
              Notre équipe vous accueille avec plaisir en magasin pour vous conseiller,
              vous faire découvrir nos parutions et organiser dédicaces ou ateliers.
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative overflow-hidden rounded-[2rem] border border-sand bg-surface/70 p-8 shadow-[0_30px_70px_-45px_rgba(19,74,85,0.4)] sm:p-10">
              <span aria-hidden className="animate-glow-pulse pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-coral/10 blur-3xl" />
              <Eyebrow tone="jade" className="relative">Envoyer un message</Eyebrow>
              <h2 className="relative mt-3 font-display text-2xl font-semibold text-ink">
                Écrivez-nous, nous vous répondrons rapidement
              </h2>
              <p className="relative mt-2 text-sm text-ink-soft">
                Tous les champs marqués sont nécessaires pour que nous puissions
                traiter votre demande dans les meilleures conditions.
              </p>
              <div className="relative mt-7">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
