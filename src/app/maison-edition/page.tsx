import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import BookCover from "@/components/BookCover";
import T from "@/components/T";
import { formatPrice, getHouseEditions } from "@/lib/books";

export const metadata: Metadata = {
  title: "Maison d'édition — Les Éditions Deeqsan",
  description:
    "Découvrez Les Éditions Deeqsan : la première maison d'édition à compte d'éditeur de Djibouti — sa mission, ses valeurs, son processus éditorial et ses ouvrages publiés.",
  openGraph: {
    title: "Maison d'édition — Les Éditions Deeqsan",
    description: "Première maison d'édition indépendante de Djibouti. Ouvrages multilingues : somali, afar, arabe, français.",
    url: "https://www.deeqsan.net/maison-edition",
  },
  twitter: {
    title: "Maison d'édition — Les Éditions Deeqsan",
    description: "Première maison d'édition indépendante de Djibouti. Ouvrages multilingues : somali, afar, arabe, français.",
  },
};

const pillars = [
  {
    id: "veracite",
    title: "Véracité",
    titleEn: "Truthfulness",
    tone: "jade" as const,
    accentColor: "#27b892",
    illustration: (
      /* Balance scale — equilibre entre les faits et les voix */
      <svg viewBox="0 0 320 96" fill="none" aria-hidden className="h-24 w-full">
        {/* Background guide rings */}
        <circle cx="160" cy="52" r="50" stroke="#27b892" strokeWidth="0.6" opacity="0.12"/>
        <circle cx="160" cy="52" r="35" stroke="#27b892" strokeWidth="0.5" opacity="0.08"/>
        {/* Vertical stand */}
        <line x1="160" y1="30" x2="160" y2="84" stroke="#27b892" strokeWidth="2.2" strokeLinecap="round"/>
        {/* Base */}
        <path d="M136 84 Q160 80 184 84" stroke="#27b892" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        {/* Base feet */}
        <line x1="132" y1="84" x2="128" y2="90" stroke="#27b892" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="188" y1="84" x2="192" y2="90" stroke="#27b892" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Pivot dot */}
        <circle cx="160" cy="33" r="4" fill="#27b892"/>
        {/* Beam — balanced, horizontal */}
        <line x1="92" y1="33" x2="228" y2="33" stroke="#27b892" strokeWidth="2.4" strokeLinecap="round"/>
        {/* Left suspension strings */}
        <line x1="92" y1="33" x2="83" y2="57" stroke="#27b892" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="92" y1="33" x2="106" y2="57" stroke="#27b892" strokeWidth="1.4" strokeLinecap="round"/>
        {/* Right suspension strings */}
        <line x1="228" y1="33" x2="214" y2="57" stroke="#27b892" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="228" y1="33" x2="237" y2="57" stroke="#27b892" strokeWidth="1.4" strokeLinecap="round"/>
        {/* Left pan arc */}
        <path d="M79 57 Q94 68 109 57" stroke="#27b892" strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* Right pan arc */}
        <path d="M211 57 Q226 68 241 57" stroke="#27b892" strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* Left pan: quill — symbole de l'écrit honnête */}
        <path d="M87 60 C86 51 95 48 97 54 C95 62 87 64 87 60Z" stroke="#27b892" strokeWidth="1.2" fill="#27b892" fillOpacity="0.18"/>
        <line x1="92" y1="53" x2="89" y2="63" stroke="#27b892" strokeWidth="0.9" strokeLinecap="round"/>
        <line x1="90" y1="58" x2="95" y2="56" stroke="#27b892" strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
        {/* Right pan: open book — symbole du savoir documenté */}
        <path d="M218 60 Q226 56 234 60 L234 68 Q226 64 218 68 Z" stroke="#27b892" strokeWidth="1.2" fill="#27b892" fillOpacity="0.1"/>
        <path d="M226 60 Q226 56 226 60 L226 68" stroke="#27b892" strokeWidth="0.9" strokeLinecap="round"/>
        <line x1="220" y1="63" x2="225" y2="63" stroke="#27b892" strokeWidth="0.7" opacity="0.6"/>
        <line x1="220" y1="65" x2="225" y2="65" stroke="#27b892" strokeWidth="0.7" opacity="0.6"/>
        <line x1="227" y1="63" x2="232" y2="63" stroke="#27b892" strokeWidth="0.7" opacity="0.6"/>
        <line x1="227" y1="65" x2="232" y2="65" stroke="#27b892" strokeWidth="0.7" opacity="0.6"/>
      </svg>
    ),
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
        <path d="M20 4 L20 10 M8 12 L32 12 M8 12 C8 12 4 24 14 28 M32 12 C32 12 36 24 26 28 M14 28 C14 28 16 36 20 36 M26 28 C26 28 24 36 20 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 20 L17 25 L26 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: "Nous défendons une parole juste et documentée, qui respecte les faits autant que les voix qui les portent.",
    textEn: "We champion honest, documented expression that respects facts as much as the voices that carry them.",
    quote: "« La vérité est le fondement de toute œuvre durable. »",
    quoteEn: "« Truth is the foundation of every lasting work. »",
  },
  {
    id: "bienfaisance",
    title: "Bienfaisance",
    titleEn: "Benevolence",
    tone: "coral" as const,
    accentColor: "#ef7d54",
    illustration: (
      /* Arbre aux racines et branches — don, croissance, partage */
      <svg viewBox="0 0 320 96" fill="none" aria-hidden className="h-24 w-full">
        {/* Background halo */}
        <circle cx="160" cy="68" r="44" stroke="#ef7d54" strokeWidth="0.6" opacity="0.14"/>
        {/* Roots */}
        <path d="M158 88 Q144 93 128 90" stroke="#ef7d54" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        <path d="M162 89 Q176 95 192 91" stroke="#ef7d54" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        <path d="M157 90 Q150 98 140 99" stroke="#ef7d54" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
        <path d="M163 90 Q170 98 180 99" stroke="#ef7d54" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
        {/* Trunk */}
        <path d="M160 90 Q158 72 160 58 Q162 48 160 38" stroke="#ef7d54" strokeWidth="2.8" strokeLinecap="round"/>
        {/* Main left branch */}
        <path d="M159 62 Q140 52 118 58" stroke="#ef7d54" strokeWidth="2.2" strokeLinecap="round"/>
        {/* Main right branch */}
        <path d="M161 58 Q180 48 202 54" stroke="#ef7d54" strokeWidth="2.2" strokeLinecap="round"/>
        {/* Center-top branch */}
        <path d="M160 45 Q160 30 160 18" stroke="#ef7d54" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Sub-branches left */}
        <path d="M120 58 Q108 48 98 43" stroke="#ef7d54" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M120 58 Q116 46 118 36" stroke="#ef7d54" strokeWidth="1.4" strokeLinecap="round"/>
        {/* Sub-branches right */}
        <path d="M200 54 Q212 44 220 40" stroke="#ef7d54" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M200 54 Q204 42 200 33" stroke="#ef7d54" strokeWidth="1.4" strokeLinecap="round"/>
        {/* Center sub-branches */}
        <path d="M160 30 Q150 22 144 15" stroke="#ef7d54" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M160 30 Q170 22 176 15" stroke="#ef7d54" strokeWidth="1.4" strokeLinecap="round"/>
        {/* Leaf nodes — fruits lumineux */}
        <circle cx="97" cy="41" r="3.5" fill="#ef7d54" opacity="0.75"/>
        <circle cx="118" cy="34" r="3" fill="#ef7d54" opacity="0.65"/>
        <circle cx="143" cy="13" r="3" fill="#ef7d54" opacity="0.65"/>
        <circle cx="160" cy="15" r="4" fill="#ef7d54" opacity="0.85"/>
        <circle cx="177" cy="13" r="3" fill="#ef7d54" opacity="0.65"/>
        <circle cx="201" cy="31" r="3" fill="#ef7d54" opacity="0.65"/>
        <circle cx="221" cy="38" r="3.5" fill="#ef7d54" opacity="0.75"/>
        {/* Secondary dots */}
        <circle cx="106" cy="47" r="2" fill="#ef7d54" opacity="0.4"/>
        <circle cx="214" cy="44" r="2" fill="#ef7d54" opacity="0.4"/>
        <circle cx="160" cy="22" r="2" fill="#ef7d54" opacity="0.4"/>
      </svg>
    ),
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
        <path d="M20 34 C20 34 6 26 6 16 C6 11 10 7 15 7 C17.5 7 19.5 8.2 20 10 C20.5 8.2 22.5 7 25 7 C30 7 34 11 34 16 C34 26 20 34 20 34Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 18 L18 22 L26 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: "Chaque ouvrage que nous publions doit servir le lecteur — l'éclairer, l'émouvoir ou l'outiller pour mieux comprendre le monde.",
    textEn: "Every book we publish must serve the reader — enlightening, moving them, or giving them tools to better understand the world.",
    quote: "« Publier, c'est offrir. »",
    quoteEn: "« To publish is to give. »",
  },
  {
    id: "pertinence",
    title: "Pertinence",
    titleEn: "Relevance",
    tone: "mango" as const,
    accentColor: "#f6b73c",
    illustration: (
      /* Rose des vents — direction, cap, sens du mouvement */
      <svg viewBox="0 0 320 96" fill="none" aria-hidden className="h-24 w-full">
        {/* Outer circle */}
        <circle cx="160" cy="48" r="42" stroke="#f6b73c" strokeWidth="1.3"/>
        {/* Mid dashed ring */}
        <circle cx="160" cy="48" r="28" stroke="#f6b73c" strokeWidth="0.7" strokeDasharray="3 5" opacity="0.5"/>
        {/* Inner hub */}
        <circle cx="160" cy="48" r="5.5" stroke="#f6b73c" strokeWidth="1.5"/>
        <circle cx="160" cy="48" r="2" fill="#f6b73c"/>
        {/* N needle — filled, dominant */}
        <path d="M160 6 L155.5 48 L160 41 L164.5 48 Z" fill="#f6b73c"/>
        {/* S needle — lighter */}
        <path d="M160 90 L164.5 48 L160 55 L155.5 48 Z" fill="#f6b73c" fillOpacity="0.3"/>
        {/* E needle */}
        <path d="M202 48 L160 43.5 L167 48 L160 52.5 Z" fill="#f6b73c" fillOpacity="0.3"/>
        {/* W needle */}
        <path d="M118 48 L160 52.5 L153 48 L160 43.5 Z" fill="#f6b73c" fillOpacity="0.3"/>
        {/* Cardinal tick marks */}
        <line x1="160" y1="6" x2="160" y2="11" stroke="#f6b73c" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="202" y1="48" x2="197" y2="48" stroke="#f6b73c" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="160" y1="90" x2="160" y2="85" stroke="#f6b73c" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="118" y1="48" x2="123" y2="48" stroke="#f6b73c" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Ordinal tick marks (45°) */}
        <line x1="189.7" y1="18.3" x2="186.2" y2="21.8" stroke="#f6b73c" strokeWidth="1" strokeLinecap="round" opacity="0.55"/>
        <line x1="189.7" y1="77.7" x2="186.2" y2="74.2" stroke="#f6b73c" strokeWidth="1" strokeLinecap="round" opacity="0.55"/>
        <line x1="130.3" y1="77.7" x2="133.8" y2="74.2" stroke="#f6b73c" strokeWidth="1" strokeLinecap="round" opacity="0.55"/>
        <line x1="130.3" y1="18.3" x2="133.8" y2="21.8" stroke="#f6b73c" strokeWidth="1" strokeLinecap="round" opacity="0.55"/>
        {/* N label — three small dots */}
        <circle cx="156" cy="3.5" r="1.2" fill="#f6b73c" opacity="0.7"/>
        <circle cx="160" cy="2.5" r="1.5" fill="#f6b73c"/>
        <circle cx="164" cy="3.5" r="1.2" fill="#f6b73c" opacity="0.7"/>
      </svg>
    ),
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2"/>
        <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
        <circle cx="20" cy="20" r="3" fill="currentColor"/>
        <path d="M20 4 L20 8 M20 32 L20 36 M4 20 L8 20 M32 20 L36 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    text: "Nous choisissons des textes qui parlent à notre époque et à notre région, et qui font avancer la réflexion collective.",
    textEn: "We choose texts that speak to our time and our region, and that advance collective thinking.",
    quote: "« Chaque livre doit être une réponse à une question vivante. »",
    quoteEn: "« Every book must answer a living question. »",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Soumission du manuscrit",
    titleEn: "Manuscript submission",
    text: "L'auteur nous transmet son texte accompagné d'une présentation de son projet. Chaque soumission est lue avec attention, dans la langue d'origine du manuscrit.",
    textEn: "The author submits their text with a project overview. Every submission is read carefully, in the original language of the manuscript.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/>
      </svg>
    ),
  },
  {
    step: "02",
    title: "Comité de lecture",
    titleEn: "Reading committee",
    text: "Notre comité évalue la pertinence, la qualité d'écriture et la cohérence du projet avec notre ligne éditoriale, avant de proposer un retour détaillé à l'auteur.",
    textEn: "Our committee evaluates relevance, writing quality and fit with our editorial direction, then provides detailed feedback to the author.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    step: "03",
    title: "Accompagnement & réécriture",
    titleEn: "Editorial accompaniment",
    text: "Un travail de fond avec l'auteur : structure, style, traduction le cas échéant — pour que le texte atteigne son plein potentiel sans jamais perdre sa voix.",
    textEn: "In-depth work with the author: structure, style, translation if needed — so the text reaches its full potential without ever losing its voice.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    step: "04",
    title: "Conception graphique & illustration",
    titleEn: "Graphic design & illustration",
    text: "Couverture, mise en page, illustrations originales : nous donnons une identité visuelle forte à chaque ouvrage, en veillant à l'image que nous renvoyons de nos auteurs.",
    textEn: "Cover, layout, original illustrations: we give each book a strong visual identity, reflecting the image we project of our authors.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    ),
  },
  {
    step: "05",
    title: "Impression & contrôle qualité",
    titleEn: "Printing & quality control",
    text: "Sélection des matériaux, suivi d'impression, relectures finales : chaque exemplaire est vérifié avant de rejoindre nos rayons et ceux de nos partenaires.",
    textEn: "Material selection, print monitoring, final proofreading: every copy is verified before joining our shelves and those of our partners.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
  {
    step: "06",
    title: "Diffusion & lancement",
    titleEn: "Distribution & launch",
    text: "Mise en avant en librairie, événements de lancement, rencontres avec les lecteurs : nous accompagnons chaque ouvrage bien au-delà de son impression.",
    textEn: "In-store promotion, launch events, reader meet-and-greets: we support each book well beyond its printing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.9 12.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.81 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z"/>
      </svg>
    ),
  },
];

const editions = getHouseEditions();

export default function MaisonEditionPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-grain bg-canopy-motif pb-16 pt-16 lg:pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="animate-glow-pulse absolute -left-28 -top-20 h-80 w-80 rounded-full bg-lagoon/25 blur-3xl" />
          <span className="animate-glow-pulse absolute -right-16 top-20 h-72 w-72 rounded-full bg-mango/20 blur-3xl" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-10">
          <Reveal>
            <Eyebrow tone="lagoon" className="mx-auto">
              <T fr="La maison d'édition" en="The publishing house" />
            </Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl text-balance">
              <T
                fr={<>La <span className="text-shimmer">première</span> maison d&rsquo;édition à compte d&rsquo;éditeur officielle de Djibouti</>}
                en={<>Djibouti&apos;s <span className="text-shimmer">first</span> official independent publishing house</>}
              />
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              <T
                fr="Fondée en 2024, notre maison d'édition indépendante se positionne comme une sentinelle des valeurs humaines cardinales telles que la véracité, la bienfaisance et la pertinence. Animée par une vocation inextinguible de soutenir la recherche et de favoriser une métamorphose sociale profonde."
                en="Founded in 2024, our independent publishing house stands as a guardian of cardinal human values: truthfulness, benevolence and relevance. Driven by an unwavering vocation to support research and foster deep social transformation."
              />
            </p>
          </Reveal>
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <Eyebrow tone="jade">
              <T fr="Notre engagement" en="Our commitment" />
            </Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl text-balance">
              <T fr="Un phare de la connaissance et de la culture" en="A beacon of knowledge and culture" />
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                <T
                  fr="Notre engagement inébranlable oriente inlassablement nos choix éditoriaux, dessinant une ligne directrice empreinte de rigueur et d'ardeur pour les lettres et les sciences humaines."
                  en="Our unwavering commitment continuously guides our editorial choices, drawing a line defined by rigour and passion for literature and the humanities."
                />
              </p>
              <p>
                <T
                  fr="Les Éditions Deeqsan se singularisent par leur dévouement à l'épanouissement d'une pensée critique et innovante, offrant une tribune prestigieuse aux écrivains prometteurs et aux chercheurs visionnaires."
                  en="Les Éditions Deeqsan stand apart through their dedication to fostering critical and innovative thinking, offering a prestigious platform to promising writers and visionary researchers."
                />
              </p>
              <p>
                <T
                  fr="En somme, Les Éditions Deeqsan ne sont pas seulement une maison d'édition, mais un phare de la connaissance et de la culture, dédié à l'élévation de la pensée humaine et à l'avènement d'une société éclairée et équitable."
                  en="In short, Les Éditions Deeqsan are not merely a publisher, but a beacon of knowledge and culture, dedicated to elevating human thought and building an enlightened, equitable society."
                />
              </p>
            </div>
          </Reveal>

          {/* PILIERS REDESIGNÉS */}
          <Reveal delay={100} className="grid gap-5">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="surface-textured group relative overflow-hidden rounded-2xl border border-sand bg-surface/70 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-30px_rgba(19,74,85,0.45)]"
              >
                {/* Animated left border */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 z-10 w-1 origin-top scale-y-0 rounded-r-full transition-transform duration-500 ease-out group-hover:scale-y-100"
                  style={{ background: `linear-gradient(to bottom, ${pillar.accentColor}, transparent)` }}
                />

                {/* Illustration panel */}
                <div
                  className="relative overflow-hidden border-b border-sand/60 px-8 py-5"
                  style={{ background: `linear-gradient(135deg, ${pillar.accentColor}0c, transparent 70%)` }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-125"
                    style={{ background: `${pillar.accentColor}1a` }}
                  />
                  <div className="relative">
                    {pillar.illustration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="relative flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                      style={{ background: `${pillar.accentColor}15`, borderColor: `${pillar.accentColor}30`, color: pillar.accentColor }}
                    >
                      {pillar.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-semibold text-ink">
                        <T fr={pillar.title} en={pillar.titleEn} />
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        <T fr={pillar.text} en={pillar.textEn} />
                      </p>
                    </div>
                  </div>
                  <div className="relative mt-5 border-t border-sand pt-4">
                    <p className="text-xs italic text-ink-soft/60">
                      <T fr={pillar.quote} en={pillar.quoteEn} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PROCESSUS EDITORIAL — TIMELINE MODERNE */}
      <section className="relative overflow-hidden bg-lagoon bg-canopy-motif py-24 text-ink-dark">
        <div aria-hidden className="animate-glow-pulse pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-jade/15 blur-3xl" />
        <div aria-hidden className="animate-glow-pulse pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-coral/15 blur-3xl" style={{ animationDelay: "2.4s" }} />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="mango" className="mx-auto">
              <T fr="Notre démarche" en="Our approach" />
            </Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl text-balance">
              <T
                fr="Du manuscrit aux mains des lecteurs : notre processus éditorial"
                en="From manuscript to readers' hands: our editorial process"
              />
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-dark/80">
              <T
                fr="Chaque ouvrage que nous publions traverse un parcours rigoureux, pensé pour révéler le meilleur de chaque texte tout en accompagnant ses auteurs avec attention."
                en="Every book we publish goes through a rigorous journey, designed to reveal the best in each text while carefully supporting its authors."
              />
            </p>
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((item, i) => (
              <Reveal key={item.step} delay={i * 60}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/12 bg-surface/6 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-jade/35 hover:bg-surface/12 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)]">
                  {/* Large watermark number */}
                  <span aria-hidden className="pointer-events-none absolute -right-1 -top-5 select-none font-display text-[7rem] font-bold leading-none text-ink/[0.04] transition-colors duration-500 group-hover:text-jade/[0.07]">
                    {item.step}
                  </span>
                  {/* Top row: icon + step badge */}
                  <div className="relative mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-jade/12 text-jade-bright ring-1 ring-jade/20 transition-all duration-300 group-hover:bg-jade/20 group-hover:ring-jade/40">
                      {item.icon}
                    </div>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-jade text-[0.65rem] font-bold text-paper">
                      {parseInt(item.step)}
                    </span>
                  </div>
                  <h3 className="relative font-display text-lg font-semibold text-ink-dark leading-snug">
                    <T fr={item.title} en={item.titleEn} />
                  </h3>
                  <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-dark/80">
                    <T fr={item.text} en={item.textEn} />
                  </p>
                  {/* Bottom accent line */}
                  <div className="relative mt-5 h-0.5 w-12 rounded-full bg-jade/25 transition-all duration-500 group-hover:w-20 group-hover:bg-jade/60" />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-14 text-center">
            <p className="mx-auto max-w-xl text-sm text-ink-dark/80">
              <T
                fr="Vous êtes auteur et souhaitez soumettre un manuscrit ? Nous serions ravis d'échanger avec vous."
                en="Are you an author looking to submit a manuscript? We'd love to hear from you."
              />
            </p>
            <Link
              href="/contact"
              className="shine-sweep mt-5 inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
            >
              <T fr="Proposer un manuscrit" en="Submit a manuscript" />
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* OUVRAGES PUBLIES */}
      <section id="ouvrages" className="scroll-mt-24 bg-paper-deep bg-dot-grid py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="coral" className="mx-auto">
              <T fr="Mis en lumière" en="In the spotlight" />
            </Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl text-balance">
              <T
                fr="Les ouvrages que nous avons eu la fierté de publier"
                en="The books we have been proud to publish"
              />
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              <T
                fr="Albums jeunesse multilingues, contes du patrimoine oral, recueils de nouvelles : un aperçu de notre catalogue d'éditions, pensé pour faire dialoguer les langues et les générations."
                en="Multilingual picture books, oral heritage tales, short story collections: a glimpse at our publishing catalogue, designed to connect languages and generations."
              />
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
                    <h3 className="mt-3 font-display text-2xl font-semibold text-ink text-balance">{book.title}</h3>
                    {book.subtitle && <p className="mt-1 font-display italic text-ink-soft">{book.subtitle}</p>}
                    <p className="mt-2 text-sm text-ink-soft">
                      <T fr="Texte" en="Text" /> :{" "}
                      <span className="font-medium text-ink">{book.author}</span>
                      {book.year ? ` · ${book.year}` : ""}
                    </p>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">{book.summary}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-jade-pale px-3 py-1 text-xs font-semibold text-jade-deep">
                        {book.price != null ? (
                          formatPrice(book.price, book.currency)
                        ) : (
                          <T fr="Prix en librairie" en="Price in-store" />
                        )}
                      </span>
                      {book.languages.map((lang) => (
                        <span key={lang} className="rounded-full bg-sand/70 px-3 py-1 text-xs font-medium text-ink-soft">
                          {lang}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/librairie/${book.slug}`}
                      className="link-underline mt-6 text-sm font-semibold text-jade-bright transition-colors hover:text-coral"
                    >
                      <T fr="Consulter la fiche complète" en="View full details" />
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
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-sand bg-grain px-8 py-14 text-center sm:px-16">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <span className="animate-glow-pulse absolute -left-16 -top-20 h-72 w-72 rounded-full bg-jade/20 blur-3xl" />
              <span className="animate-glow-pulse absolute -right-20 bottom-[-4rem] h-72 w-72 rounded-full bg-coral/15 blur-3xl" style={{ animationDelay: "2s" }} />
            </div>
            <Eyebrow tone="lagoon" className="mx-auto">
              <T fr="Auteurs, chercheurs, curieux" en="Authors, researchers, curious minds" />
            </Eyebrow>
            <h2 className="mx-auto mt-5 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl text-balance">
              <T
                fr="Et si votre texte devenait notre prochaine publication ?"
                en="What if your text became our next publication?"
              />
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink-soft">
              <T
                fr="Nous sommes toujours à l'écoute de nouvelles voix. Parlons de votre projet — où qu'il en soit."
                en="We are always listening for new voices. Let's talk about your project — wherever it stands."
              />
            </p>
            <Link
              href="/contact"
              className="shine-sweep mt-7 inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_-12px_rgba(39,184,146,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
            >
              <T fr="Échanger avec l'équipe éditoriale" en="Connect with the editorial team" />
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
