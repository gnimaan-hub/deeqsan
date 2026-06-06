import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import BookCover from "@/components/BookCover";
import { formatPrice, getHouseEditions } from "@/lib/books";

export const metadata: Metadata = {
  title: "Maison d'édition — Les Éditions Deeqsan",
  description:
    "Découvrez Les Éditions Deeqsan : la première maison d'édition à compte d'éditeur de Djibouti — sa mission, ses valeurs, son processus éditorial et ses ouvrages publiés.",
};

const pillars = [
  {
    title: "Véracité",
    tone: "jade" as const,
    text: "Nous défendons une parole juste et documentée, qui respecte les faits autant que les voix qui les portent.",
  },
  {
    title: "Bienfaisance",
    tone: "coral" as const,
    text: "Chaque ouvrage que nous publions doit servir le lecteur — l'éclairer, l'émouvoir ou l'outiller pour mieux comprendre le monde.",
  },
  {
    title: "Pertinence",
    tone: "mango" as const,
    text: "Nous choisissons des textes qui parlent à notre époque et à notre région, et qui font avancer la réflexion collective.",
  },
];

const process = [
  {
    step: "01",
    title: "Soumission du manuscrit",
    text: "L'auteur nous transmet son texte accompagné d'une présentation de son projet. Chaque soumission est lue avec attention, dans la langue d'origine du manuscrit.",
  },
  {
    step: "02",
    title: "Comité de lecture",
    text: "Notre comité évalue la pertinence, la qualité d'écriture et la cohérence du projet avec notre ligne éditoriale, avant de proposer un retour détaillé à l'auteur.",
  },
  {
    step: "03",
    title: "Accompagnement & réécriture",
    text: "Un travail de fond avec l'auteur : structure, style, traduction le cas échéant — pour que le texte atteigne son plein potentiel sans jamais perdre sa voix.",
  },
  {
    step: "04",
    title: "Conception graphique & illustration",
    text: "Couverture, mise en page, illustrations originales : nous donnons une identité visuelle forte à chaque ouvrage, en veillant à l'image que nous renvoyons de nos auteurs.",
  },
  {
    step: "05",
    title: "Impression & contrôle qualité",
    text: "Sélection des matériaux, suivi d'impression, relectures finales : chaque exemplaire est vérifié avant de rejoindre nos rayons et ceux de nos partenaires.",
  },
  {
    step: "06",
    title: "Diffusion & lancement",
    text: "Mise en avant en librairie, événements de lancement, rencontres avec les lecteurs : nous accompagnons chaque ouvrage bien au-delà de son impression.",
  },
];

const editions = getHouseEditions();

export default function MaisonEditionPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-grain bg-canopy-motif pb-16 pt-16 lg:pt-24">
        <div aria-hidden className="bg-aura absolute inset-0 -z-10">
          <span className="absolute -left-28 -top-28 h-96 w-96 bg-lagoon/15" />
          <span className="absolute -right-16 top-20 h-72 w-72 bg-mango/20" />
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <Eyebrow tone="lagoon" className="mx-auto">La maison d&rsquo;édition</Eyebrow>
            <div className="mt-6 flex items-center justify-center gap-4">
              
              <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl text-balance">
                La <span className="text-shimmer">première </span> maison d&rsquo;édition à compte d&rsquo;éditeur officielle de Djibouti
              </h1>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Fondée en 2024, notre maison d&rsquo;édition indépendante se positionne
              comme une sentinelle des valeurs humaines cardinales telles que la
              véracité, la bienfaisance et la pertinence. Animée par une vocation
              inextinguible de soutenir la recherche et de favoriser une métamorphose
              sociale profonde, notre ambition s&rsquo;articule autour de la diffusion
              des savoirs et du soutien aux voix des auteurs de la Corne de l&rsquo;Afrique,
              ainsi que, plus largement, du continent africain et d&rsquo;ailleurs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <Eyebrow tone="jade">Notre engagement</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl text-balance">
              Un phare de la connaissance et de la culture
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Notre engagement inébranlable oriente inlassablement nos choix
                éditoriaux, dessinant une ligne directrice empreinte de rigueur et
                d&rsquo;ardeur pour les lettres et les sciences humaines. Les Éditions
                Deeqsan se singularisent par leur dévouement à l&rsquo;épanouissement
                d&rsquo;une pensée critique et innovante, offrant une tribune prestigieuse
                aux écrivains prometteurs et aux chercheurs visionnaires.
              </p>
              <p>
                Dans une quête perpétuelle d&rsquo;excellence et d&rsquo;accomplissement
                intellectuel, nous nous attachons à enrichir le panorama littéraire et
                académique par des œuvres marquantes, vectrices de changement et de
                réflexion.
              </p>
              <p>
                En somme, Les Éditions Deeqsan ne sont pas seulement une maison
                d&rsquo;édition, mais un phare de la connaissance et de la culture,
                dédié à l&rsquo;élévation de la pensée humaine et à l&rsquo;avènement
                d&rsquo;une société éclairée et équitable. Notre mission transcende les
                simples publications, aspirant à catalyser un impact sociétal durable.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="grid gap-5">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="surface-textured group relative overflow-hidden rounded-2xl border border-sand bg-surface/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-jade/30 hover:shadow-[0_24px_50px_-30px_rgba(19,74,85,0.4)]"
              >
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-jade/10 blur-2xl transition-transform duration-500 group-hover:scale-125"
                />
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-gradient-to-b from-jade to-mango transition-transform duration-500 ease-out group-hover:scale-y-100"
                />
                <Eyebrow tone={pillar.tone}>{pillar.title}</Eyebrow>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{pillar.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROCESSUS EDITORIAL */}
      <section className="relative overflow-hidden bg-lagoon bg-canopy-motif py-20 text-ink">
        <div aria-hidden className="animate-glow-pulse pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-jade/15 blur-3xl" />
        <div aria-hidden className="animate-glow-pulse pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-coral/15 blur-3xl" style={{ animationDelay: "2.4s" }} />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="mango" className="mx-auto">Notre démarche</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl text-balance">
              Du manuscrit aux mains des lecteurs : notre processus éditorial
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/75">
              Chaque ouvrage que nous publions traverse un parcours rigoureux,
              pensé pour révéler le meilleur de chaque texte tout en accompagnant
              ses auteurs avec attention.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {process.map((item, i) => (
              <Reveal key={item.step} delay={i * 70}>
                <div className="group h-full rounded-2xl border border-ink/15 bg-surface/5 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-jade/30 hover:bg-surface/10">
                  <span className="font-display text-3xl font-semibold text-jade-pale transition-transform duration-500 group-hover:scale-110 group-hover:text-jade-bright">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12 text-center">
            <p className="mx-auto max-w-xl text-sm text-ink/65">
              Vous êtes auteur et souhaitez soumettre un manuscrit ? Nous serions
              ravis d&rsquo;échanger avec vous.
            </p>
            <Link
              href="/contact"
              className="shine-sweep mt-5 inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
            >
              Proposer un manuscrit
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* OUVRAGES PUBLIES */}
      <section id="ouvrages" className="scroll-mt-24 bg-paper-deep bg-dot-grid py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="coral" className="mx-auto">Mis en lumière</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl text-balance">
              Les ouvrages que nous avons eu la fierté de publier
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Albums jeunesse multilingues, contes du patrimoine oral, recueils de
              nouvelles : un aperçu de notre catalogue d&rsquo;éditions, pensé pour
              faire dialoguer les langues et les générations.
            </p>
          </Reveal>

          <div className="mt-16 space-y-16">
            {editions.map((book, i) => (
              <Reveal key={book.slug}>
                <div
                  className={`surface-textured grid gap-10 rounded-[2rem] border border-sand bg-surface/70 p-8 shadow-[0_30px_70px_-45px_rgba(19,74,85,0.45)] sm:p-10 lg:grid-cols-[0.6fr_1fr] lg:items-center ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="group/cover relative flex justify-center">
                    <span
                      aria-hidden
                      className="animate-glow-pulse absolute inset-6 -z-10 rounded-[2rem] blur-2xl"
                      style={{ background: `linear-gradient(135deg, ${book.coverPalette[0]}45, ${book.coverPalette[1]}30)`, animationDelay: `${i * 0.6}s` }}
                    />
                    <div className="transition-transform duration-700 ease-out group-hover/cover:-translate-y-2">
                      <BookCover title={book.title} author={book.author} cover={book.cover} palette={book.coverPalette} size="md" />
                    </div>
                  </div>
                  <div>
                    <Eyebrow tone="jade">{book.category}</Eyebrow>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-ink text-balance">
                      {book.title}
                    </h3>
                    {book.subtitle && (
                      <p className="mt-1 font-display italic text-ink-soft">{book.subtitle}</p>
                    )}
                    <p className="mt-2 text-sm text-ink-soft">
                      Texte : <span className="font-medium text-ink">{book.author}</span>
                      {book.year ? ` · ${book.year}` : ""}
                    </p>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
                      {book.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-jade-pale px-3 py-1 text-xs font-semibold text-jade-deep">
                        {formatPrice(book.price, book.currency)}
                      </span>
                      {book.languages.map((lang) => (
                        <span
                          key={lang}
                          className="rounded-full bg-sand/70 px-3 py-1 text-xs font-medium text-ink-soft"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/librairie/${book.slug}`}
                      className="link-underline mt-6 text-sm font-semibold text-jade-bright transition-colors hover:text-coral"
                    >
                      Consulter la fiche complète
                      <span aria-hidden>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-sand bg-grain px-8 py-14 text-center sm:px-16">
            <div aria-hidden className="bg-aura absolute inset-0 -z-10">
              <span className="absolute -left-16 -top-20 h-72 w-72 bg-jade/20" />
              <span className="absolute -right-20 bottom-[-4rem] h-72 w-72 bg-coral/15" />
            </div>
            <Eyebrow tone="lagoon" className="mx-auto">Auteurs, chercheurs, curieux</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl text-balance">
              Et si votre texte devenait notre prochaine publication ?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink-soft">
              Nous sommes toujours à l&rsquo;écoute de nouvelles voix. Parlons de
              votre projet — où qu&rsquo;il en soit.
            </p>
            <Link
              href="/contact"
              className="shine-sweep mt-7 inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_-12px_rgba(39,184,146,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
            >
              Échanger avec l&rsquo;équipe éditoriale
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
