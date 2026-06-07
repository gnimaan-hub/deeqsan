import Link from "next/link";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import BookCover from "@/components/BookCover";
import BookCard from "@/components/BookCard";
import T from "@/components/T";
import { books, getHouseEditions } from "@/lib/books";

const featuredCatalog = books.filter((b) => !b.isHouseEdition).slice(0, 3);
const featuredEditions = getHouseEditions().slice(0, 3);

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-grain bg-canopy-motif">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="animate-glow-pulse absolute -left-16 -top-16 h-72 w-72 rounded-full bg-jade/20 blur-3xl" />
          <span className="animate-glow-pulse absolute -right-16 top-20 h-64 w-64 rounded-full bg-mango/18 blur-3xl" style={{ animationDelay: "2s" }} />
          <span className="animate-glow-pulse absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-coral/12 blur-3xl" style={{ animationDelay: "4s" }} />
        </div>

        <svg aria-hidden className="pointer-events-none absolute right-[28%] top-[12%] hidden h-24 w-24 text-jade/20 sm:block" viewBox="0 0 100 100" fill="none">
          <circle cx="10" cy="14" r="2" fill="currentColor" />
          <circle cx="34" cy="6" r="1.4" fill="currentColor" />
          <circle cx="58" cy="22" r="2.4" fill="currentColor" />
          <circle cx="20" cy="44" r="1.6" fill="currentColor" />
          <circle cx="76" cy="50" r="1.8" fill="currentColor" />
          <path d="M10 14 34 6 58 22 20 44 76 50" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" />
        </svg>

        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-10 lg:pb-28 lg:pt-24">
          <Reveal aboveFold>
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow tone="jade">
                <T fr="Librairie & maison d'édition à Djibouti" en="Bookstore & publisher in Djibouti" />
              </Eyebrow>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/55 px-3 py-1 text-[0.65rem] font-medium text-ink-soft">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-live-pulse rounded-full" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-jade" />
                </span>
                <T fr="Ouvert aujourd'hui à Djibouti" en="Open today in Djibouti" />
              </span>
            </div>
            <h1 className="mt-10 max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl lg:text-[3.4rem]">
              <T
                fr={<>Des histoires qui voyagent entre les langues de la{" "}<span className="text-shimmer">Corne de l&rsquo;Afrique</span></>}
                en={<>Stories that travel between the languages of the{" "}<span className="text-shimmer">Horn of Africa</span></>}
              />
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              <T
                fr="Journées culturelles, lancements d'ouvrages, ateliers d'écriture : Les Éditions Deeqsan animent la vie littéraire de Djibouti tout au long de l'année. Venez choisir vos prochaines lectures, et découvrez les voix que nous accompagnons depuis Djibouti."
                en="Cultural events, book launches, writing workshops: Les Éditions Deeqsan bring literary life to Djibouti year-round. Come choose your next reads, and discover the voices we support from Djibouti."
              />
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/librairie"
                className="shine-sweep inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_-12px_rgba(39,184,146,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
              >
                <T fr="Parcourir la librairie" en="Browse the library" />
                <span aria-hidden>&rarr;</span>
              </Link>
              <Link
                href="/maison-edition"
                className="link-underline inline-flex items-center gap-2 rounded-full border border-lagoon/25 bg-surface/60 px-7 py-3.5 text-sm font-semibold text-jade-bright transition-colors hover:bg-surface"
              >
                <T fr="Découvrir la maison d'édition" en="Discover the publishing house" />
              </Link>
            </div>

          </Reveal>

          <Reveal aboveFold delay={80} className="relative mx-auto w-full">
            <div aria-hidden className="absolute inset-0 -z-10">
              <span className="animate-glow-pulse absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-jade/20 blur-3xl" />
            </div>
            <div className="relative flex items-end justify-center gap-5 sm:gap-10">
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
                  size="md"
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
          </Reveal>
        </div>
      </section>

      {/* PRESENTATION RAPIDE — DEUX VISAGES DE DEEQSAN */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="lagoon" className="mx-auto">
            <T fr="Une maison, deux vocations" en="One house, two vocations" />
          </Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            <T
              fr="Une librairie pour lire, une maison d'édition pour faire entendre"
              en="A bookstore to read, a publisher to give voice"
            />
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            <T
              fr="Deux pôles, une même exigence : faire circuler les histoires, dans toutes les langues qui composent notre région."
              en="Two divisions, one shared commitment: circulating stories in all the languages of our region."
            />
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal delay={80}>
            <div className="surface-textured group relative h-full overflow-hidden rounded-[2rem] border border-sand bg-surface/70 p-9 shadow-[0_30px_70px_-40px_rgba(19,74,85,0.5)] transition-shadow hover:shadow-[0_40px_90px_-35px_rgba(39,184,146,0.4)]">
              <div aria-hidden className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-jade/15 blur-2xl transition-transform duration-500 group-hover:scale-125" />
              <Eyebrow tone="jade"><T fr="La librairie" en="The bookstore" /></Eyebrow>
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                <T fr="Un catalogue choisi, une invitation à venir flâner en magasin" en="A curated catalogue, an invitation to browse in-store" />
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                <T
                  fr="Romans, essais, albums jeunesse, beaux livres et bandes dessinées : parcourez nos rayons en ligne, consultez les prix, puis venez les feuilleter pour de vrai — notre équipe vous accueille avec plaisir à Djibouti."
                  en="Novels, essays, children's picture books, coffee table books and comics: browse our shelves online, check prices, then come leaf through them in person — our team welcomes you in Djibouti."
                />
              </p>
              <Link href="/librairie" className="link-underline mt-6 text-sm font-semibold text-jade-bright transition-colors hover:text-coral">
                <T fr="Voir le catalogue" en="View catalogue" />
                <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="bg-canopy-motif group relative h-full overflow-hidden rounded-[2rem] border border-sand bg-lagoon p-9 text-ink shadow-[0_30px_70px_-40px_rgba(12,50,57,0.6)]">
              <div aria-hidden className="absolute -left-10 -bottom-16 h-48 w-48 rounded-full bg-coral/25 blur-3xl transition-transform duration-500 group-hover:scale-125" />
              <Eyebrow tone="mango"><T fr="La maison d'édition" en="The publishing house" /></Eyebrow>
              <h3 className="mt-4 font-display text-2xl font-semibold">
                <T fr="La première maison d'édition à compte d'éditeur de Djibouti" en="Djibouti's first independent publishing house" />
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">
                <T
                  fr="Fondées en 2024, Les Éditions Deeqsan défendent la véracité, la bienfaisance et la pertinence — et soutiennent les voix d'auteurs de la Corne de l'Afrique, du continent et d'ailleurs."
                  en="Founded in 2024, Les Éditions Deeqsan champion truthfulness, benevolence and relevance — supporting the voices of authors from the Horn of Africa, the continent and beyond."
                />
              </p>
              <Link href="/maison-edition" className="link-underline mt-6 text-sm font-semibold text-jade-pale transition-colors hover:text-mango">
                <T fr="Notre mission & nos ouvrages" en="Our mission & publications" />
                <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APERCU LIBRAIRIE */}
      <section className="relative overflow-hidden bg-paper-deep bg-dot-grid py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow tone="coral"><T fr="À découvrir en magasin" en="Available in-store" /></Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                <T fr="Quelques titres de notre rayon librairie" en="A selection from our shelves" />
              </h2>
            </div>
            <Link
              href="/librairie"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/10"
            >
              <T fr="Tout le catalogue" en="Full catalogue" />
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
            <T
              fr="Tous nos ouvrages sont disponibles à l'achat directement en librairie, à Djibouti. Venez les découvrir, les feuilleter et repartir avec votre prochaine lecture."
              en="All our books are available for purchase directly in our bookstore in Djibouti. Come discover them, leaf through them, and leave with your next read."
            />
          </Reveal>
        </div>
      </section>

      {/* APERCU MAISON D'EDITION */}
      <section className="mx-auto max-w-7xl overflow-hidden px-5 py-20 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="relative flex justify-center gap-6 py-6">
              <div aria-hidden className="absolute inset-0 -z-10">
                <span className="animate-glow-pulse absolute left-10 top-6 h-48 w-48 rounded-full bg-lagoon/20 blur-3xl" />
                <span className="animate-glow-pulse absolute bottom-0 right-6 h-44 w-44 rounded-full bg-coral/20 blur-3xl" style={{ animationDelay: "2s" }} />
              </div>
              {/* Only show one book on mobile to avoid overflow */}
              <div className="sm:-rotate-6 sm:translate-y-6">
                <BookCover
                  title={featuredEditions[1]?.title ?? ""}
                  author={featuredEditions[1]?.author}
                  cover={featuredEditions[1]?.cover}
                  palette={featuredEditions[1]?.coverPalette ?? ["#134a55", "#27b892"]}
                  size="md"
                />
              </div>
              <div className="hidden rotate-[10deg] -translate-y-4 sm:block">
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
            <Eyebrow tone="lagoon"><T fr="Notre mission" en="Our mission" /></Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl text-balance">
              <T fr="Une sentinelle des voix de la Corne de l'Afrique" en="A guardian of the Horn of Africa's voices" />
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              <T
                fr="Notre maison d'édition indépendante se positionne comme une sentinelle des valeurs humaines cardinales — la véracité, la bienfaisance et la pertinence. Nous soutenons la recherche et œuvrons à une métamorphose sociale profonde."
                en="Our independent publishing house stands as a guardian of cardinal human values — truthfulness, benevolence and relevance. We support research and work towards deep social transformation."
              />
            </p>
            <ul className="mt-7 space-y-3">
              {[
                { fr: "Un accompagnement éditorial exigeant, du manuscrit à l'impression", en: "Rigorous editorial support, from manuscript to print" },
                { fr: "Des ouvrages multilingues — somali, afar, arabe, français", en: "Multilingual books — Somali, Afar, Arabic, French" },
                { fr: "Une tribune offerte aux écrivains prometteurs et chercheurs visionnaires", en: "A platform for promising writers and visionary researchers" },
              ].map((item) => (
                <li key={item.fr} className="flex items-start gap-3 text-sm text-ink-soft">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-jade-pale text-jade-deep">✓</span>
                  <T fr={item.fr} en={item.en} />
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/maison-edition"
                className="inline-flex items-center gap-2 rounded-full bg-lagoon px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:bg-lagoon-deep"
              >
                <T fr="Découvrir notre démarche" en="Discover our approach" />
                <span aria-hidden>&rarr;</span>
              </Link>
              <Link
                href="/maison-edition#ouvrages"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/10"
              >
                <T fr="Voir nos ouvrages publiés" en="See our publications" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APERCU EVENEMENTS */}
      <section className="relative overflow-hidden bg-lagoon bg-canopy-motif py-20 text-ink">
        <div aria-hidden className="animate-glow-pulse pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-jade/20 blur-3xl" />
        <div aria-hidden className="animate-glow-pulse pointer-events-none absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-mango/15 blur-3xl" style={{ animationDelay: "2.6s" }} />
        <svg aria-hidden className="pointer-events-none absolute left-[6%] bottom-10 hidden h-20 w-20 text-ink/10 sm:block" viewBox="0 0 100 100" fill="none">
          <circle cx="10" cy="14" r="2" fill="currentColor" />
          <circle cx="34" cy="6" r="1.4" fill="currentColor" />
          <circle cx="58" cy="22" r="2.4" fill="currentColor" />
          <circle cx="20" cy="44" r="1.6" fill="currentColor" />
          <path d="M10 14 34 6 58 22 20 44" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" />
        </svg>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal>
              <Eyebrow tone="mango"><T fr="Vie de la maison" en="Events & news" /></Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl text-balance">
                <T fr="Rencontres, dédicaces et célébrations littéraires" en="Signings, meet-the-author events and literary celebrations" />
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/75">
                <T
                  fr="Suivez nos prochains rendez-vous et revivez les temps forts de nos événements passés."
                  en="Follow our upcoming events and relive the highlights of our past events."
                />
              </p>
              <Link
                href="/evenements"
                className="shine-sweep mt-7 inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
              >
                <T fr="Voir les évènements" en="See events" />
                <span aria-hidden>&rarr;</span>
              </Link>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-[1.75rem] border border-ink/15 bg-surface/5 p-7 backdrop-blur-sm">
                <Eyebrow tone="jade" className="bg-jade/20 text-jade-pale">
                  <T fr="À la une" en="Featured" />
                </Eyebrow>
                <h3 className="mt-4 font-display text-xl font-semibold text-balance">
                  <T fr="La Journée de la Culture Multilingue" en="The Multilingual Culture Day" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  <T
                    fr="Retour sur un évènement réussi : lectures, ateliers et rencontres autour des langues somali, afar, arabe et français ont rassemblé notre communauté de lecteurs autour d'un même amour des mots."
                    en="Looking back at a successful event: readings, workshops and encounters around Somali, Afar, Arabic and French gathered our community of readers around a shared love of words."
                  />
                </p>
                <Link href="/evenements" className="link-underline mt-5 text-sm font-semibold text-jade-pale transition-colors hover:text-mango">
                  <T fr="Lire la suite" en="Read more" />
                  <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* APERCU CONTACT / VISITE */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-sand bg-grain px-8 py-14 text-center shadow-[0_40px_90px_-50px_rgba(19,74,85,0.5)] sm:px-16">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <span className="animate-glow-pulse absolute -left-20 -top-24 h-72 w-72 rounded-full bg-coral/20 blur-3xl" />
              <span className="animate-glow-pulse absolute -right-16 bottom-[-4rem] h-72 w-72 rounded-full bg-jade/25 blur-3xl" style={{ animationDelay: "2s" }} />
            </div>
            <Eyebrow tone="coral" className="mx-auto">
              <T fr="Venez nous voir" en="Come visit us" />
            </Eyebrow>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl text-balance">
              <T
                fr="Une question, une commande, une envie de discuter littérature ?"
                en="A question, an order, or just want to talk books?"
              />
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              <T
                fr="Notre équipe est à Djibouti, prête à vous accueillir en magasin ou à vous répondre par téléphone et par email."
                en="Our team is in Djibouti, ready to welcome you in-store or respond by phone and email."
              />
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="shine-sweep inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_-12px_rgba(39,184,146,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
              >
                <T fr="Nous contacter" en="Contact us" />
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
