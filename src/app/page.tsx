import Link from "next/link";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import BookCover from "@/components/BookCover";
import BookCard from "@/components/BookCard";
import { books, getHouseEditions } from "@/lib/books";

const featuredCatalog = books.filter((b) => !b.isHouseEdition).slice(0, 3);
const featuredEditions = getHouseEditions().slice(0, 3);

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-grain bg-canopy-motif">
        <div aria-hidden className="bg-aura absolute inset-0 -z-10">
          <span className="absolute -left-32 -top-40 h-[28rem] w-[28rem] bg-jade/25" />
          <span className="absolute -right-24 top-32 h-80 w-80 bg-mango/25" />
          <span className="absolute bottom-[-6rem] left-1/3 h-72 w-72 bg-coral/15" />
        </div>

        {/* Pointillés organiques — constellation de graines, fixe */}
        <svg aria-hidden className="pointer-events-none absolute right-[28%] top-[12%] hidden h-24 w-24 text-jade/20 sm:block" viewBox="0 0 100 100" fill="none">
          <circle cx="10" cy="14" r="2" fill="currentColor" />
          <circle cx="34" cy="6" r="1.4" fill="currentColor" />
          <circle cx="58" cy="22" r="2.4" fill="currentColor" />
          <circle cx="20" cy="44" r="1.6" fill="currentColor" />
          <circle cx="76" cy="50" r="1.8" fill="currentColor" />
          <path d="M10 14 34 6 58 22 20 44 76 50" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" />
        </svg>

        <div className="mx-auto grid max-w-7xl gap-16 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-10 lg:pb-28 lg:pt-24">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow tone="jade">Librairie &amp; maison d&rsquo;édition à Djibouti</Eyebrow>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/55 px-3 py-1 text-[0.65rem] font-medium text-ink-soft">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-live-pulse rounded-full" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-jade" />
                </span>
                Ouvert aujourd&rsquo;hui à Djibouti-Ville
              </span>
            </div>
            <h1 className="mt-6 max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl lg:text-[3.4rem]">
              Des histoires qui voyagent entre les langues de la{" "}
              <span className="text-shimmer">Corne de l&rsquo;Afrique</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              Les Éditions Deeqsan réunissent une librairie de quartier accueillante
              et la première maison d&rsquo;édition à compte d&rsquo;éditeur de Djibouti.
              Venez choisir vos prochaines lectures, et découvrez les voix que nous
              accompagnons depuis Djibouti-Ville.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/librairie"
                className="shine-sweep inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_-12px_rgba(39,184,146,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
              >
                Parcourir la librairie
                <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
              <Link
                href="/maison-edition"
                className="link-underline inline-flex items-center gap-2 rounded-full border border-lagoon/25 bg-surface/60 px-7 py-3.5 text-sm font-semibold text-jade-bright transition-colors hover:bg-surface"
              >
                Découvrir la maison d&rsquo;édition
              </Link>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-sand pt-8">
              <div className="group flex items-center gap-3">
                
                <div>
                  <dt className="font-display text-2xl font-semibold text-jade-bright transition-transform duration-300 group-hover:-translate-y-0.5">2024</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-soft">
                    Fondation des éditions
                  </dd>
                </div>
              </div>
              <div className="group">
                <dt className="font-display text-2xl font-semibold text-coral transition-transform duration-300 group-hover:-translate-y-0.5">{books.length}+</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-soft">
                  Ouvrages au catalogue
                </dd>
              </div>
              <div className="group">
                <dt className="font-display text-2xl font-semibold text-mango transition-transform duration-300 group-hover:-translate-y-0.5">4</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-soft">
                  Langues éditées
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={120} className="relative mx-auto">
            <div aria-hidden className="absolute inset-0 -z-10">
              <span className="animate-glow-pulse absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-jade/20 blur-3xl" />
            </div>
            <div className="relative flex items-end justify-center gap-6 sm:gap-10">
              <div className="hidden -rotate-6 translate-y-10 opacity-90 sm:block">
                <BookCover
                  title={featuredEditions[1]?.title ?? ""}
                  author={featuredEditions[1]?.author}
                  cover={featuredEditions[1]?.cover}
                  palette={featuredEditions[1]?.coverPalette ?? ["#27b892", "#f3b65f"]}
                  size="sm"
                />
              </div>
              <div className="z-10 -translate-y-4">
                <BookCover
                  title={featuredEditions[0]?.title ?? ""}
                  author={featuredEditions[0]?.author}
                  cover={featuredEditions[0]?.cover}
                  palette={featuredEditions[0]?.coverPalette ?? ["#27b892", "#f3b65f"]}
                  size="lg"
                  priority
                />
              </div>
              <div className="hidden rotate-6 translate-y-16 opacity-90 sm:block">
                <BookCover
                  title={featuredEditions[2]?.title ?? ""}
                  author={featuredEditions[2]?.author}
                  cover={featuredEditions[2]?.cover}
                  palette={featuredEditions[2]?.coverPalette ?? ["#27b892", "#f3b65f"]}
                  size="sm"
                />
              </div>
            </div>
            <p className="relative z-10 mx-auto mt-10 max-w-xs text-center text-sm text-ink-soft">
              <span className="font-semibold text-ink">Trois parutions, une voix</span> — chaque
              ouvrage de notre catalogue dispose de sa propre fiche détaillée.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRESENTATION RAPIDE — DEUX VISAGES DE DEEQSAN */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="lagoon" className="mx-auto">Une maison, deux vocations</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Une librairie pour lire, une maison d&rsquo;édition pour faire entendre
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Deux pôles, une même exigence : faire circuler les histoires, dans toutes
            les langues qui composent notre région.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal delay={80}>
            <div className="surface-textured group relative h-full overflow-hidden rounded-[2rem] border border-sand bg-surface/70 p-9 shadow-[0_30px_70px_-40px_rgba(19,74,85,0.5)] transition-shadow hover:shadow-[0_40px_90px_-35px_rgba(39,184,146,0.4)]">
              <div
                aria-hidden
                className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-jade/15 blur-2xl transition-transform duration-500 group-hover:scale-125"
              />
              <Eyebrow tone="jade">La librairie</Eyebrow>
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                Un catalogue choisi, une invitation à venir flâner en magasin
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Romans, essais, albums jeunesse, beaux livres et bandes dessinées :
                parcourez nos rayons en ligne, consultez les prix, puis venez les
                feuilleter pour de vrai — notre équipe vous accueille avec plaisir
                à Djibouti-Ville.
              </p>
              <Link
                href="/librairie"
                className="link-underline mt-6 text-sm font-semibold text-jade-bright transition-colors hover:text-coral"
              >
                Voir le catalogue
                <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="bg-canopy-motif group relative h-full overflow-hidden rounded-[2rem] border border-sand bg-lagoon p-9 text-ink shadow-[0_30px_70px_-40px_rgba(12,50,57,0.6)]">
              <div
                aria-hidden
                className="absolute -left-10 -bottom-16 h-48 w-48 rounded-full bg-coral/25 blur-3xl transition-transform duration-500 group-hover:scale-125"
              />
              <Eyebrow tone="mango">La maison d&rsquo;édition</Eyebrow>
              <h3 className="mt-4 font-display text-2xl font-semibold">
                La première maison d&rsquo;édition à compte d&rsquo;éditeur de Djibouti
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">
                Fondées en 2024, Les Éditions Deeqsan défendent la véracité, la
                bienfaisance et la pertinence — et soutiennent les voix d&rsquo;auteurs
                de la Corne de l&rsquo;Afrique, du continent et d&rsquo;ailleurs.
              </p>
              <Link
                href="/maison-edition"
                className="link-underline mt-6 text-sm font-semibold text-jade-pale transition-colors hover:text-mango"
              >
                Notre mission &amp; nos ouvrages
                <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APERCU LIBRAIRIE */}
      <section className="relative overflow-hidden bg-paper-deep bg-dot-grid py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow tone="coral">À découvrir en magasin</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Quelques titres de notre rayon librairie
              </h2>
            </div>
            <Link
              href="/librairie"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-ink"
            >
              Tout le catalogue
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCatalog.map((book, i) => (
              <Reveal key={book.slug} delay={i * 90}>
                <BookCard book={book} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={260} className="mt-10 rounded-2xl border border-dashed border-jade/35 bg-jade-pale/40 px-6 py-5 text-center text-sm text-ink-soft">
            Tous nos ouvrages sont disponibles à l&rsquo;achat directement en librairie,
            à Djibouti-Ville. Venez les découvrir, les feuilleter et repartir avec
            votre prochaine lecture.
          </Reveal>
        </div>
      </section>

      {/* APERCU MAISON D'EDITION */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="relative flex justify-center gap-6 py-6">
              <div aria-hidden className="absolute inset-0 -z-10">
                <span className="animate-glow-pulse absolute left-10 top-6 h-48 w-48 rounded-full bg-lagoon/20 blur-3xl" />
                <span className="animate-glow-pulse absolute bottom-0 right-6 h-44 w-44 rounded-full bg-coral/20 blur-3xl" style={{ animationDelay: "2s" }} />
              </div>
              <div className="-rotate-6 translate-y-6">
                <BookCover
                  title={featuredEditions[1]?.title ?? ""}
                  author={featuredEditions[1]?.author}
                  cover={featuredEditions[1]?.cover}
                  palette={featuredEditions[1]?.coverPalette ?? ["#134a55", "#27b892"]}
                  size="md"
                />
              </div>
              <div className="rotate-[10deg] -translate-y-4">
                <BookCover
                  title={featuredEditions[2]?.title ?? ""}
                  author={featuredEditions[2]?.author}
                  cover={featuredEditions[2]?.cover}
                  palette={featuredEditions[2]?.coverPalette ?? ["#f2785a", "#f3b65f"]}
                  size="md"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="order-1 lg:order-2">
            <Eyebrow tone="lagoon">Notre mission</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl text-balance">
              Une sentinelle des voix de la Corne de l&rsquo;Afrique
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              Fondée en 2024, notre maison d&rsquo;édition indépendante se positionne
              comme une sentinelle des valeurs humaines cardinales — la véracité,
              la bienfaisance et la pertinence. Nous soutenons la recherche et
              œuvrons à une métamorphose sociale profonde, en donnant à lire les
              auteurs d&rsquo;ici et d&rsquo;ailleurs.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Un accompagnement éditorial exigeant, du manuscrit à l'impression",
                "Des ouvrages multilingues — somali, afar, arabe, français",
                "Une tribune offerte aux écrivains prometteurs et chercheurs visionnaires",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-jade-pale text-jade-deep">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/maison-edition"
                className="inline-flex items-center gap-2 rounded-full bg-lagoon px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:bg-lagoon-deep"
              >
                Découvrir notre démarche
                <span aria-hidden>&rarr;</span>
              </Link>
              <Link
                href="/maison-edition#ouvrages"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-ink"
              >
                Voir nos ouvrages publiés
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APERCU EVENEMENTS */}
      <section className="relative overflow-hidden bg-lagoon bg-canopy-motif py-20 text-ink">
        <div
          aria-hidden
          className="animate-glow-pulse pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-jade/20 blur-3xl"
        />
        <div
          aria-hidden
          className="animate-glow-pulse pointer-events-none absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-mango/15 blur-3xl"
          style={{ animationDelay: "2.6s" }}
        />
        <svg aria-hidden className="pointer-events-none absolute left-[6%] bottom-10 hidden h-20 w-20 text-ink/10 sm:block" viewBox="0 0 100 100" fill="none">
          <circle cx="10" cy="14" r="2" fill="currentColor" />
          <circle cx="34" cy="6" r="1.4" fill="currentColor" />
          <circle cx="58" cy="22" r="2.4" fill="currentColor" />
          <circle cx="20" cy="44" r="1.6" fill="currentColor" />
          <path d="M10 14 34 6 58 22 20 44" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" />
        </svg>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal>
              <Eyebrow tone="mango">Vie de la maison</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl text-balance">
                Rencontres, dédicaces et célébrations littéraires
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/75">
                Journées culturelles, lancements d&rsquo;ouvrages, ateliers d&rsquo;écriture :
                Les Éditions Deeqsan animent la vie littéraire de Djibouti-Ville
                tout au long de l&rsquo;année. Suivez nos prochains rendez-vous et
                revivez les temps forts de nos événements passés.
              </p>
              <Link
                href="/evenements"
                className="shine-sweep mt-7 inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
              >
                Voir les évènements
                <span aria-hidden>&rarr;</span>
              </Link>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-[1.75rem] border border-ink/15 bg-surface/5 p-7 backdrop-blur-sm">
                <Eyebrow tone="jade" className="bg-jade/20 text-jade-pale">À la une</Eyebrow>
                <h3 className="mt-4 font-display text-xl font-semibold text-balance">
                  La Journée de la Culture Multilingue
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  Retour sur un évènement réussi : lectures, ateliers et rencontres
                  autour des langues somali, afar, arabe et français ont rassemblé
                  notre communauté de lecteurs autour d&rsquo;un même amour des mots.
                </p>
                <Link
                  href="/evenements"
                  className="link-underline mt-5 text-sm font-semibold text-jade-pale transition-colors hover:text-mango"
                >
                  Lire la suite
                  <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* APERCU CONTACT / VISITE */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-sand bg-grain px-8 py-14 text-center shadow-[0_40px_90px_-50px_rgba(19,74,85,0.5)] sm:px-16">
            <div aria-hidden className="bg-aura absolute inset-0 -z-10">
              <span className="absolute -left-20 -top-24 h-72 w-72 bg-coral/20" />
              <span className="absolute -right-16 bottom-[-4rem] h-72 w-72 bg-jade/25" />
            </div>
            <Eyebrow tone="coral" className="mx-auto">Venez nous voir</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl text-balance">
              Une question, une commande, une envie de discuter littérature ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              Notre équipe est à Djibouti-Ville, prête à vous accueillir en
              magasin ou à vous répondre par téléphone et par email.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="shine-sweep inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_-12px_rgba(39,184,146,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
              >
                Nous contacter
                <span aria-hidden>&rarr;</span>
              </Link>
              <a
                href="tel:+253778111101"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface/70 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-surface"
              >
                +253 77 81 11 01
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
