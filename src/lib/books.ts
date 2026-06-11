export type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  /** Prix en magasin — absent si le tarif n'a pas encore été communiqué */
  price?: number;
  currency?: string;
  category: string;
  cover?: string;
  coverPalette: [string, string];
  languages: string[];
  summary: string;
  description: string[];
  isHouseEdition: boolean;
  pages?: number;
  year?: number;
  isbn?: string;
  isPlaceholder?: boolean;
};

/**
 * Ouvrages publiés par Les Éditions Deeqsan — repris du catalogue réel
 * du site d'origine (deeqsan.com), traduits/complétés où l'information
 * était partielle.
 */
const houseEditions: Book[] = [
  {
    slug: "butti",
    title: "Butti",
    subtitle: "Butidii dad-cunka ahayd ee waagii hore",
    author: "Cumar Yuusuf Cali",
    price: 1800,
    currency: "FDJ",
    category: "Album & BD",
    cover: "/images/livres/butti.jpg",
    coverPalette: ["#5fb6c4", "#f3b65f"],
    languages: ["Somali", "Afar"],
    summary:
      "Il était une fois Butti, une créature redoutée qui terrorisait les femmes et les enfants — un conte traditionnel transmis de génération en génération dans toute la région.",
    description: [
      "Beri waxaa jiray Buti, oo cabsi weyn laga qabay oo weerari jirtay dumarka iyo carruurta. Butidaasi waxay ahayd mid sheekadeeda laga hadal-hayo gobolka oo dhan. Marka magaceeda la maqlo, carruurtu waxay ku carari jireen gosha hooyadood.",
      "Ceel-biyoodka markay reer guuraagu waraabinayaan xoolahooda, marar badan baa la maqlaa in Buti ay cuntay wiil ama gabadh yar oo adhi jir ahayd. Buti waxaa looga cabsi badnaa xayawaanka kale ee duurjoogta ah sida libaaxa, waraabaha ama dacawada — waxayna isu beddeli kartaa qof bini'aadam ah si ay u sirto cida raadinaysa.",
      "Un conte traditionnel somali et afar, restitué avec soin pour préserver la musicalité de l'oralité d'origine et la transmettre aux jeunes lecteurs d'aujourd'hui.",
    ],
    isHouseEdition: true,
    pages: 32,
    year: 2024,
  },
  {
    slug: "mon-frere-au-cerveau-colore",
    title: "Mon frère au cerveau coloré",
    subtitle: "Walaalkaygii maskaxda midabaysnaa",
    author: "Sahara Abdi",
    price: 1800,
    currency: "FDJ",
    category: "Album & BD",
    cover: "/images/livres/mon-frere-cerveau-colore.jpg",
    coverPalette: ["#f2785a", "#27b892"],
    languages: ["Somali", "Afar", "Français"],
    summary:
      "Une histoire tendre et lumineuse sur la neurodivergence, racontée à hauteur d'enfant — pour mieux comprendre, accueillir et aimer les différences.",
    description: [
      "Cette histoire est basée sur les expériences que j'ai vécues avec mon enfant, les nombreuses visites à l'hôpital auxquelles nous allions et la question incontournable de ma fille : « Qu'est-ce qui ne va pas avec mon frère ? »",
      "La société, tout comme celle de ma fille, était également pleine de questions, dont une grande partie était constituée d'incompréhensions sur les conditions des enfants neurodivergents, de mythes et d'informations erronées.",
      "Un album disponible en trois langues pour ouvrir le dialogue sur la différence dès le plus jeune âge, à la maison comme à l'école.",
    ],
    isHouseEdition: true,
    pages: 28,
    year: 2021,
  },
  {
    slug: "habsamidii-wacays",
    title: "Habsamidii Wacays",
    subtitle: "La finesse de Waïs",
    author: "Collection patrimoine oral",
    price: 1900,
    currency: "FDJ",
    category: "Album & BD",
    cover: "/images/livres/habsamidii-wacays.jpg",
    coverPalette: ["#134a55", "#f3b65f"],
    languages: ["Somali", "Afar", "Français"],
    summary:
      "Un conte de sagesse pastorale : un jeune berger ramène de ses voyages bien plus que du miel — une leçon de finesse et de générosité offerte à des voyageurs venus de loin.",
    description: [
      "« Père et mère, je pais notre troupeau vers les terres des autruches et les plaines de Galayax ; j'en ai ramené deux pots de miel que j'ai donnés à deux corbeaux voyageurs venus de régions lointaines allant vers Sanbari. »",
      "Aabo iyo hooyo, maanta adhigeena waxaan la soo joognay buulashii gorayo iyo bankii Galayax ; waxaan ka soo qaaday laba qunboo malaba oo aan isaga dhiibay laba tukkoo safara oo socdaal dheera leh.",
      "Un texte trilingue qui fait dialoguer la tradition pastorale et la transmission intergénérationnelle, magnifiquement illustré.",
    ],
    isHouseEdition: true,
    pages: 36,
    year: 2021,
  },
  {
    slug: "hummaagyada-naxariista",
    title: "Hummaagyada naxariista leh",
    subtitle: "ee ku jira heesaha kalgacalka",
    author: "Collection patrimoine oral",
    price: 1800,
    currency: "FDJ",
    category: "Album & BD",
    cover: "/images/livres/hummaagyada-naxariista.jpg",
    coverPalette: ["#27b892", "#f2785a"],
    languages: ["Somali"],
    summary:
      "Un recueil illustré qui revisite les berceuses et chants d'amour traditionnels, porteurs de tendresse et de bienveillance, pour les faire (re)découvrir aux nouvelles générations.",
    description: [
      "Les berceuses et chants traditionnels somalis sont bien plus que des mélodies : ils transmettent des valeurs de douceur, de compassion et de lien familial.",
      "Cet ouvrage rassemble une sélection de ces textes, accompagnés d'illustrations originales, pour que parents et enfants puissent les redécouvrir et se les transmettre ensemble.",
    ],
    isHouseEdition: true,
    pages: 24,
    year: 2024,
  },
  {
    slug: "la-sagesse-na-pas-dage",
    title: "La sagesse n'a pas d'âge",
    subtitle: "Garaadku da' ma leh — Kas karmah waam mali — العقل لا علاقة له بالعمر",
    author: "Collection patrimoine oral",
    price: 1400,
    currency: "FDJ",
    category: "Album & BD",
    cover: "/images/livres/la-sagesse-na-pas-dage.jpg",
    coverPalette: ["#f3b65f", "#134a55"],
    languages: ["Somali", "Afar", "Arabe", "Français"],
    summary:
      "Un conte quadrilingue qui célèbre la sagesse populaire et son universalité — la même leçon racontée dans quatre langues de la région, comme un pont entre les cultures.",
    description: [
      "Un même récit, quatre langues : somali, afar, arabe et français se répondent pour montrer que la sagesse circule sans frontières.",
      "Pensé comme un outil pédagogique autant que comme un objet de plaisir de lecture, ce conte invite les jeunes lecteurs multilingues à naviguer entre les langues qui les entourent au quotidien.",
    ],
    isHouseEdition: true,
    pages: 28,
    year: 2023,
  },
  {
    slug: "les-vacances-de-habib",
    title: "Les vacances de Habib",
    subtitle: "Fasaxii Xabiib — Cabib oftoyu",
    author: "Collection Jeunesse Deeqsan",
    price: 1900,
    currency: "FDJ",
    category: "Album & BD",
    cover: "/images/livres/les-vacances-de-habib.jpg",
    coverPalette: ["#5fb6c4", "#27b892"],
    languages: ["Somali", "Afar", "Français"],
    summary:
      "Habib part en vacances chez ses grands-parents : entre jeux, découvertes et petites aventures, un album plein de tendresse sur l'enfance et les liens familiaux.",
    description: [
      "Chaque été, Habib retrouve ses grands-parents au village. Entre les histoires du soir, les jeux avec les cousins et les odeurs de la cuisine de sa grand-mère, ses vacances deviennent le terrain d'une foule de petites aventures.",
      "Un album chaleureux, trilingue, qui célèbre la richesse des liens intergénérationnels.",
    ],
    isHouseEdition: true,
    pages: 32,
    year: 2024,
  },
  {
    slug: "tookiyo-waxaan-kala-imid",
    title: "Tookiyo waxaan kala imid",
    author: "Collection Éveil Deeqsan",
    price: 3500,
    currency: "FDJ",
    category: "Loisirs",
    cover: "/images/livres/tookiyo-waxaan-kala-imid.jpg",
    coverPalette: ["#f2785a", "#f3b65f"],
    languages: ["Somali"],
    summary:
      "Un ouvrage d'éveil et de découverte conçu pour accompagner les tout-petits dans l'exploration du monde qui les entoure, à travers le jeu et l'observation.",
    description: [
      "Conçu avec des pédagogues, cet ouvrage propose des activités simples et ludiques pour stimuler la curiosité et le langage des plus jeunes.",
      "Une collection pensée pour le tout premier âge, dans la langue maternelle des enfants.",
    ],
    isHouseEdition: true,
    pages: 40,
    year: 2024,
  },
  {
    slug: "buuggii-ri-baa-cuntay",
    title: "Buuggii Ri' Baa Cuntay !",
    subtitle: "iyo Sheekooyin kale",
    author: "Collection Nouvelles Deeqsan",
    price: 1400,
    currency: "FDJ",
    category: "Nouvelles",
    cover: "/images/livres/buuggii-ri-baa-cuntay.jpg",
    coverPalette: ["#134a55", "#27b892"],
    languages: ["Somali"],
    summary:
      "Un recueil de nouvelles facétieuses et de récits courts, à savourer en famille — l'art du conte somali revisité avec malice pour les jeunes lecteurs.",
    description: [
      "« Le livre que la chèvre a mangé ! » donne le ton d'un recueil plein d'humour et de surprises, où chaque récit court est une invitation à imaginer la suite.",
      "Une porte d'entrée idéale vers la lecture pour les enfants qui découvrent les joies du récit court.",
    ],
    isHouseEdition: true,
    pages: 48,
    year: 2022,
  },
  {
    slug: "maan-filanayn",
    title: "Maan Filanayn",
    author: "Sakariye Khayre",
    category: "Littérature",
    cover: "/images/livres/maan-filanayn.jpg",
    coverPalette: ["#c9a876", "#3d2f1f"],
    languages: ["Somali"],
    isbn: "9782487618114",
    summary:
      "Une œuvre littéraire en somali signée Sakariye Khayre, publiée par Les Éditions Deeqsan — passez en librairie pour la découvrir.",
    description: [
      "« Maan Filanayn » — « Je ne m'y attendais pas » — est une œuvre en langue somali de Sakariye Khayre, parue aux Éditions Deeqsan.",
      "La fiche détaillée de cet ouvrage (résumé, extrait, prix) sera complétée prochainement. En attendant, notre équipe se fera un plaisir de vous le présenter en librairie, à Djibouti.",
    ],
    isHouseEdition: true,
  },
];

/**
 * Exemples de titres pour étoffer le rayon « Librairie » en attendant
 * que le client transmette son catalogue complet (romans, essais,
 * beaux livres, etc. au-delà de ses propres éditions).
 * → Marqués isPlaceholder: true, à remplacer par les références réelles.
 */
const libraryExamples: Book[] = [
  {
    slug: "les-sables-du-temps",
    title: "Les Sables du Temps",
    author: "Amina Robleh",
    price: 2400,
    currency: "FDJ",
    category: "Roman",
    coverPalette: ["#f3b65f", "#134a55"],
    languages: ["Français"],
    summary:
      "Une saga familiale qui traverse trois générations, du port de Djibouti aux rives de la mer Rouge — exemple de référence à remplacer par le catalogue du client.",
    description: [
      
      "Sur fond de mutations économiques et de mémoire familiale, ce roman suit le destin de trois femmes que tout semblait séparer, mais que les sables du temps finissent par réunir.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 312,
    year: 2023,
  },
  {
    slug: "petit-traite-de-lenteur",
    title: "Petit traité de lenteur",
    author: "Nadia Farah",
    price: 1900,
    currency: "FDJ",
    category: "Essai",
    coverPalette: ["#27b892", "#e9dcc3"],
    languages: ["Français"],
    summary:
      "Un essai vivifiant sur l'art de ralentir dans un monde pressé — exemple de référence à remplacer par le catalogue du client.",
    description: [
      
      "À mi-chemin entre le carnet de réflexions et l'essai documenté, cet ouvrage invite à reconsidérer notre rapport au temps, au travail et au repos.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 168,
    year: 2022,
  },
  {
    slug: "cornes-et-embruns",
    title: "Cornes et Embruns",
    author: "Yusuf Warsame",
    price: 1500,
    currency: "FDJ",
    category: "Poésie",
    coverPalette: ["#5fb6c4", "#f2785a"],
    languages: ["Français", "Somali"],
    summary:
      "Un recueil de poèmes bilingues qui chantent la Corne de l'Afrique, ses vents, ses côtes et ses silences — exemple de référence à remplacer par le catalogue du client.",
    description: [
       
      "Une voix singulière qui fait dialoguer le français et le somali dans une poésie sensorielle, ancrée dans les paysages du littoral.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 96,
    year: 2021,
  },
  {
    slug: "djibouti-memoires-mer-rouge",
    title: "Djibouti, mémoires de la mer Rouge",
    author: "Hassan Egueh",
    price: 3200,
    currency: "FDJ",
    category: "Beau livre",
    coverPalette: ["#134a55", "#f3b65f"],
    languages: ["Français"],
    summary:
      "Un beau livre richement illustré qui retrace l'histoire du pays à travers ses ports, ses caravanes et ses peuples — exemple de référence à remplacer par le catalogue du client.",
    description: [
       
      "Photographies d'archives, cartes anciennes et récits croisés composent un ouvrage de référence sur l'histoire de la région.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 224,
    year: 2020,
  },
  {
    slug: "recettes-de-la-corne",
    title: "Recettes de la Corne",
    author: "Collectif",
    price: 2800,
    currency: "FDJ",
    category: "Cuisine",
    coverPalette: ["#f2785a", "#27b892"],
    languages: ["Français"],
    summary:
      "Un tour culinaire de la région à travers 60 recettes transmises de famille en famille — exemple de référence à remplacer par le catalogue du client.",
    description: [
       
      "Épices, street-food, plats de fête : un ouvrage gourmand qui célèbre les cuisines de la Corne de l'Afrique, illustré de photographies en couleur.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 184,
    year: 2023,
  },
  {
    slug: "larbre-a-palabres",
    title: "L'Arbre à Palabres",
    author: "Idil Moussa",
    price: 1700,
    currency: "FDJ",
    category: "Roman jeunesse",
    coverPalette: ["#f3b65f", "#5fb6c4"],
    languages: ["Français"],
    summary:
      "Un roman pour adolescents sur l'amitié, la transmission et le courage de défendre ses convictions — exemple de référence à remplacer par le catalogue du client.",
    description: [
       
      "Sous l'arbre du village où se règlent les différends depuis des générations, une bande d'adolescents va devoir apprendre à faire entendre sa voix.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 208,
    year: 2024,
  },
  {
    slug: "le-souffle-du-khamsin",
    title: "Le Souffle du Khamsin",
    author: "Omar Aden",
    price: 2600,
    currency: "FDJ",
    category: "Roman",
    coverPalette: ["#134a55", "#27b892"],
    languages: ["Français"],
    summary:
      "Un thriller psychologique porté par les vents chauds du désert — exemple de référence à remplacer par le catalogue du client.",
    description: [
       
      "Quand un vent de sable s'abat sur la ville, un homme se retrouve confronté à un secret qu'il croyait enterré pour toujours.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 288,
    year: 2022,
  },
  {
    slug: "voix-de-la-diaspora",
    title: "Voix de la diaspora",
    author: "Collectif",
    price: 2000,
    currency: "FDJ",
    category: "Nouvelles",
    coverPalette: ["#f2785a", "#134a55"],
    languages: ["Français"],
    summary:
      "Un recueil de nouvelles signées par des auteurs de la diaspora, entre exil, attache et réinvention de soi — exemple de référence à remplacer par le catalogue du client.",
    description: [
       
      "Onze voix, onze trajectoires : ce recueil dresse le portrait sensible d'une génération entre deux rives.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 176,
    year: 2023,
  },
  {
    slug: "le-murmure-des-acacias",
    title: "Le Murmure des Acacias",
    author: "Hassan Idriss",
    price: 2200,
    currency: "FDJ",
    category: "Roman",
    coverPalette: ["#6fae6a", "#0f3d2d"],
    languages: ["Français", "Somali"],
    summary:
      "Dans un village au pied des collines, un jeune berger apprend à écouter ce que les arbres et les anciens ont à transmettre — exemple de référence à remplacer par le catalogue du client.",
    description: [
       
      "Un roman d'apprentissage tout en douceur, où la nature et la tradition orale tissent le fil d'une transmission entre générations.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 248,
    year: 2024,
  },
  {
    slug: "geographies-intimes",
    title: "Géographies Intimes",
    subtitle: "Carnets de voyage entre deux rives",
    author: "Sara Boukhari",
    price: 2600,
    currency: "FDJ",
    category: "Voyage",
    coverPalette: ["#f6b73c", "#27b892"],
    languages: ["Français"],
    summary:
      "Des carnets de voyage illustrés qui relient les paysages de la Corne de l'Afrique aux escales d'une vie en mouvement — exemple de référence à remplacer par le catalogue du client.",
    description: [
       
      "Entre récit intime et guide sensoriel, cet ouvrage emmène le lecteur des marchés de Djibouti aux criques secrètes du littoral.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 204,
    year: 2022,
  },
  {
    slug: "lalmanach-du-corsaire-rouge",
    title: "L'Almanach du Corsaire Rouge",
    author: "Karim Robleh",
    price: 1700,
    currency: "FDJ",
    category: "Jeunesse",
    coverPalette: ["#ef7d54", "#f6b73c"],
    languages: ["Français", "Arabe"],
    summary:
      "Une aventure trépidante sur les flots de la mer Rouge, pour les lecteurs et lectrices en quête de frissons et de trésors cachés — exemple de référence à remplacer par le catalogue du client.",
    description: [
       
      "Cap sur les îles oubliées : une fresque d'aventures pensée pour donner aux plus jeunes le goût des longues lectures.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 156,
    year: 2023,
  },
  {
    slug: "frontieres-de-sel",
    title: "Frontières de Sel",
    author: "Leyla Osman",
    price: 2300,
    currency: "FDJ",
    category: "Polar",
    coverPalette: ["#0f3d2d", "#5eecc2"],
    languages: ["Français"],
    summary:
      "Une enquête haletante dans les salines du désert, où une journaliste tire le fil d'un secret que beaucoup préféreraient enterrer — exemple de référence à remplacer par le catalogue du client.",
    description: [
       
      "Un polar âpre et lumineux à la fois, porté par une héroïne tenace et des paysages qui ne pardonnent rien.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 288,
    year: 2024,
  },
  {
    slug: "memoires-dun-pecheur-du-golfe",
    title: "Mémoires d'un Pêcheur du Golfe",
    author: "Ibrahim Souleiman",
    price: 1950,
    currency: "FDJ",
    category: "Biographie",
    coverPalette: ["#5fb6c4", "#0f3d2d"],
    languages: ["Français", "Afar"],
    summary:
      "Le récit d'une vie passée au large, recueilli auprès d'un ancien pêcheur du golfe de Tadjourah — exemple de référence à remplacer par le catalogue du client.",
    description: [
       
      "Une mémoire vivante du littoral, entre gestes ancestraux, récits de tempêtes et sagesse glanée au fil des marées.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 192,
    year: 2021,
  },
  {
    slug: "constellations-somaliennes",
    title: "Constellations Somaliennes",
    subtitle: "Le ciel comme calendrier",
    author: "Dr Faiza Ahmed",
    price: 2500,
    currency: "FDJ",
    category: "Sciences",
    coverPalette: ["#11876a", "#f6b73c"],
    languages: ["Français", "Somali"],
    summary:
      "Une exploration accessible de l'astronomie traditionnelle de la Corne de l'Afrique et de son usage dans l'agriculture et la navigation — exemple de référence à remplacer par le catalogue du client.",
    description: [
       
      "Un pont entre savoirs anciens et vulgarisation scientifique, illustré de cartes du ciel et de récits d'observation.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 220,
    year: 2023,
  },
  {
    slug: "les-voix-du-marche",
    title: "Les Voix du Marché",
    author: "Aïcha Moussa",
    price: 1600,
    currency: "FDJ",
    category: "Théâtre",
    coverPalette: ["#f2785a", "#6fae6a"],
    languages: ["Français", "Somali", "Arabe"],
    summary:
      "Une pièce chorale qui donne voix aux marchandes, porteurs et passants d'un grand marché — un théâtre du quotidien, vif et savoureux — exemple de référence à remplacer par le catalogue du client.",
    description: [
       
      "Conçue pour la scène comme pour la lecture à voix haute, cette pièce trilingue célèbre la verve populaire et l'art de la réplique.",
    ],
    isHouseEdition: false,
    isPlaceholder: true,
    pages: 112,
    year: 2022,
  },
];

export const books: Book[] = [...houseEditions, ...libraryExamples];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getHouseEditions(): Book[] {
  return books.filter((book) => book.isHouseEdition);
}

export function getCategories(): string[] {
  return Array.from(new Set(books.map((book) => book.category))).sort();
}

export function formatPrice(price: number, currency: string = "FDJ"): string {
  return `${price.toLocaleString("fr-FR")} ${currency}`;
}
