import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import T from "@/components/T";

export const metadata: Metadata = {
  title: "Évènements — Les Éditions Deeqsan",
  description:
    "Suivez la vie littéraire des Éditions Deeqsan à Djibouti : rencontres d'auteurs, ateliers d'écriture, lancements d'ouvrages et journées culturelles.",
  openGraph: {
    title: "Évènements — Les Éditions Deeqsan",
    description: "Rencontres d'auteurs, ateliers d'écriture et journées culturelles à Djibouti.",
    url: "https://www.deeqsan.net/evenements",
  },
  twitter: {
    title: "Évènements — Les Éditions Deeqsan",
    description: "Rencontres d'auteurs, ateliers d'écriture et journées culturelles à Djibouti.",
  },
};

/**
 * Exemples de rendez-vous à venir — à ajuster avec le calendrier réel
 * transmis par le client (dates, lieux, intervenants).
 */
const upcoming = [
  {
    title: "Lancement de « Les vacances de Habib »",
    titleEn: "Launch of “Les vacances de Habib”",
    date: "À confirmer — prochainement",
    dateEn: "To be confirmed — coming soon",
    place: "Librairie Deeqsan, Djibouti",
    placeEn: "Deeqsan bookstore, Djibouti",
    tone: "jade" as const,
    text: "Une après-midi de lecture, de dédicaces et de rencontre avec l'équipe éditoriale autour de notre dernier album jeunesse trilingue.",
    textEn: "An afternoon of reading, signings and conversation with the editorial team around our latest trilingual children's picture book.",
    isPlaceholder: true,
  },
  {
    title: "Atelier d'écriture jeunesse (8-12 ans)",
    titleEn: "Children's writing workshop (ages 8-12)",
    date: "À confirmer — prochainement",
    dateEn: "To be confirmed — coming soon",
    place: "Espace lecture Deeqsan",
    placeEn: "Deeqsan reading space",
    tone: "coral" as const,
    text: "Un atelier ludique pour initier les plus jeunes au plaisir d'écrire et d'illustrer leurs propres histoires, encadré par notre équipe éditoriale.",
    textEn: "A playful workshop introducing children to the joy of writing and illustrating their own stories, guided by our editorial team.",
    isPlaceholder: true,
  },
  {
    title: "Rencontre avec les auteurs de la maison",
    titleEn: "Meet our authors",
    date: "À confirmer — prochainement",
    dateEn: "To be confirmed — coming soon",
    place: "Librairie Deeqsan, Djibouti",
    placeEn: "Deeqsan bookstore, Djibouti",
    tone: "mango" as const,
    text: "Un moment d'échange convivial autour d'un café : nos auteurs présentent leurs ouvrages, leur parcours et répondent aux questions des lecteurs.",
    textEn: "A friendly exchange over coffee: our authors present their books, their journeys and answer readers' questions.",
    isPlaceholder: true,
  },
];

export default function EvenementsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-grain bg-canopy-motif pb-16 pt-16 lg:pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="animate-glow-pulse absolute -left-16 -top-16 h-72 w-72 rounded-full bg-mango/20 blur-3xl" />
          <span className="animate-glow-pulse absolute -right-16 top-16 h-64 w-64 rounded-full bg-jade/15 blur-3xl" style={{ animationDelay: "2s" }} />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <Reveal>
            <Eyebrow tone="mango" className="mx-auto"><T fr="Vie de la maison" en="Events & news" /></Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl text-balance">
              <T
                fr={<>Rencontres, dédicaces et <span className="text-shimmer">célébrations littéraires</span></>}
                en={<>Meet-ups, signings and <span className="text-shimmer">literary celebrations</span></>}
              />
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              <T
                fr="Les Éditions Deeqsan animent la vie culturelle de Djibouti : ateliers, lancements d'ouvrages, journées thématiques. Voici nos prochains rendez-vous, et un retour sur les temps forts passés."
                en="Les Éditions Deeqsan bring Djibouti's cultural life to light: workshops, book launches, themed days. Here are our upcoming events, and a look back at past highlights."
              />
            </p>
            <p className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-surface/55 px-4 py-1.5 text-xs font-medium text-ink-soft">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-live-pulse rounded-full" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mango" />
              </span>
              {upcoming.length} <T fr="rendez-vous à venir · calendrier mis à jour régulièrement" en="upcoming events · calendar updated regularly" />
            </p>
          </Reveal>
        </div>
      </section>

      {/* A VENIR */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <Reveal className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            <T fr="Prochains rendez-vous" en="Upcoming events" />
          </h2>
        </Reveal>
        <Reveal delay={60} className="mt-2 max-w-2xl text-sm text-ink-soft">
          <T
            fr="Le calendrier ci-dessous donne le ton de ce que nous aimons organiser — les dates et lieux définitifs seront annoncés ici et sur nos réseaux dès qu'ils seront confirmés."
            en="The calendar below sets the tone for what we love to organise — final dates and venues will be announced here and on our social channels as soon as they are confirmed."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {upcoming.map((event, i) => (
            <Reveal key={event.title} delay={i * 90}>
              <div className="surface-textured group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sand bg-surface/70 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-35px_rgba(19,74,85,0.4)]">
                <span
                  aria-hidden
                  className="animate-glow-pulse pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      event.tone === "jade" ? "rgba(39,184,146,0.18)" : event.tone === "coral" ? "rgba(239,125,84,0.18)" : "rgba(246,183,60,0.18)",
                    animationDelay: `${i * 0.6}s`,
                  }}
                />
                <Eyebrow tone={event.tone}><T fr={event.date} en={event.dateEn} /></Eyebrow>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink text-balance">
                  <T fr={event.title} en={event.titleEn} />
                </h3>
                <p className="mt-1 text-sm font-medium text-ink-soft"><T fr={event.place} en={event.placeEn} /></p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft"><T fr={event.text} en={event.textEn} /></p>
                {event.isPlaceholder && (
                  <p className="mt-4 text-xs italic text-ink-soft/70">
                    <T fr="Exemple de rendez-vous — date à confirmer avec la maison." en="Sample event — date to be confirmed with the publisher." />
                  </p>
                )}
                <Link
                  href="/contact"
                  className="link-underline mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-jade-bright transition-colors hover:text-coral"
                >
                  <T fr="Être informé·e de la date" en="Get notified of the date" />
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TEMPS FORTS / REPLAY */}
      <section className="relative overflow-hidden bg-paper-deep bg-dot-grid py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal className="text-center">
            <Eyebrow tone="jade" className="mx-auto"><T fr="Retour en images" en="Looking back" /></Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl text-balance">
              <T fr="Les temps forts de nos évènements passés" en="Highlights from our past events" />
            </h2>
          </Reveal>

          <Reveal delay={80} className="mt-12">
            <article className="surface-textured group overflow-hidden rounded-[2rem] border border-sand bg-surface/80 shadow-[0_30px_70px_-45px_rgba(19,74,85,0.4)] transition-shadow duration-500 hover:shadow-[0_40px_90px_-40px_rgba(19,74,85,0.5)]">
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-jade via-lagoon to-coral sm:h-56">
                <div aria-hidden className="absolute inset-0 opacity-90 transition-transform duration-700 ease-out group-hover:scale-110" style={{
                  backgroundImage:
                    "radial-gradient(circle at 18% 30%, rgba(255,255,255,0.35), transparent 40%), radial-gradient(circle at 82% 70%, rgba(255,255,255,0.2), transparent 45%)",
                }} />
                <div className="absolute inset-0 flex items-end p-6 sm:p-8">
                  <Eyebrow tone="mango" className="bg-surface/85"><T fr="Évènement passé" en="Past event" /></Eyebrow>
                </div>
              </div>
              <div className="p-7 sm:p-10">
                <h3 className="font-display text-2xl font-semibold text-ink text-balance">
                  <T
                    fr="Retour sur notre évènement réussi : la Journée de la Culture Multilingue"
                    en="Looking back on a successful event: the Multilingual Culture Day"
                  />
                </h3>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
                  <p>
                    <T
                      fr="Nous sommes ravis de revenir sur les moments forts de notre Journée de la Culture Multilingue, organisée à Djibouti. Cet évènement a réuni notre communauté de lecteurs autour d'un même amour des mots — somali, afar, arabe et français se sont répondus le temps d'un après-midi de lectures, d'ateliers et de rencontres."
                      en="We are delighted to look back on the highlights of our Multilingual Culture Day, held in Djibouti. The event brought our community of readers together around a shared love of words — Somali, Afar, Arabic and French echoed one another through an afternoon of readings, workshops and encounters."
                    />
                  </p>
                  <p>
                    <T
                      fr="Petits et grands ont pu découvrir des extraits de nos ouvrages lus à voix haute dans plusieurs langues, échanger avec nos auteurs et illustrateurs, et repartir avec de nouvelles découvertes de lecture. Un véritable succès, rendu possible par la participation enthousiaste de notre communauté et le soutien précieux de nos partenaires."
                      en="Young and old discovered excerpts from our books read aloud in several languages, talked with our authors and illustrators, and left with new reading discoveries. A real success, made possible by our community's enthusiastic participation and the precious support of our partners."
                    />
                  </p>
                  <p>
                    <T
                      fr="Nous préparons déjà la prochaine édition — suivez cette page pour ne pas la manquer !"
                      en="We are already preparing the next edition — keep an eye on this page so you don't miss it!"
                    />
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-sand bg-lagoon bg-canopy-motif px-8 py-12 text-center text-ink-dark sm:px-16">
            <span aria-hidden className="animate-glow-pulse pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-jade/20 blur-3xl" />
            <span aria-hidden className="animate-glow-pulse pointer-events-none absolute -right-10 bottom-[-3rem] h-64 w-64 rounded-full bg-mango/15 blur-3xl" style={{ animationDelay: "2.2s" }} />
            <Eyebrow tone="mango" className="relative mx-auto"><T fr="Restons en contact" en="Stay in touch" /></Eyebrow>
            <h2 className="relative mx-auto mt-4 max-w-lg font-display text-2xl font-semibold sm:text-3xl text-balance text-ink-dark">
              <T fr="Envie d'être averti·e de nos prochains rendez-vous ?" en="Want to hear about our upcoming events?" />
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-sm text-ink-dark/80">
              <T
                fr="Laissez-nous vos coordonnées ou passez nous voir en librairie — nous vous tiendrons informé·e de chaque nouvel évènement."
                en="Leave us your contact details or drop by the bookstore — we will keep you informed of every new event."
              />
            </p>
            <Link
              href="/contact"
              className="shine-sweep relative mt-6 inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
            >
              <T fr="Nous contacter" en="Contact us" />
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
