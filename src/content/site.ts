// Everything about you lives here. Edit and redeploy; no component changes needed.
// Text fields come in English (en) and French (fr).

export type Lang = "en" | "fr";
export const langs: Lang[] = ["en", "fr"];
export type Text = Record<Lang, string>;
export type TextList = Record<Lang, string[]>;

export const site = {
  url: "https://samuel-etah-dev.vercel.app",
  name: "Samuel ETAH",
  fullName: "Samuel Praise ETAH",
  location: "Yaoundé, Cameroon",
  // Switch the green "Available for work" badge on or off here.
  availableForWork: true,
  contact: {
    email: "samueletah54@gmail.com",
    whatsapp: "+237671857479",
    whatsapp2: "+237656147565", // second WhatsApp number
    github: "https://github.com/samueletah54-art",
    instagram: "https://www.instagram.com/samuelisco22/",
    x: "https://x.com/samuel_izko",
    linkedin: null as string | null, // add your LinkedIn URL when you have one
  },
};

export const whatsappLink = (text?: string, number: string = site.contact.whatsapp) =>
  `https://wa.me/${number.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/* ---------- Blog categories ---------- */
export const categories: { slug: string; name: Text; blurb: Text }[] = [
  { slug: "web-development", name: { en: "Web Development", fr: "Développement web" }, blurb: { en: "Building fast, useful websites.", fr: "Créer des sites rapides et utiles." } },
  { slug: "react", name: { en: "React", fr: "React" }, blurb: { en: "Components, hooks and Next.js.", fr: "Composants, hooks et Next.js." } },
  { slug: "javascript", name: { en: "JavaScript", fr: "JavaScript" }, blurb: { en: "The language of the web, explained simply.", fr: "Le langage du web, expliqué simplement." } },
  { slug: "css", name: { en: "CSS", fr: "CSS" }, blurb: { en: "Layout, colour and motion.", fr: "Mise en page, couleur et animation." } },
  { slug: "cybersecurity", name: { en: "Cybersecurity", fr: "Cybersécurité" }, blurb: { en: "Keeping sites and people safe.", fr: "Protéger les sites et les gens." } },
  { slug: "video-editing", name: { en: "Video Editing", fr: "Montage vidéo" }, blurb: { en: "Vox-style explainers and motion.", fr: "Vidéos explicatives et motion design." } },
  { slug: "writing", name: { en: "Writing", fr: "Écriture" }, blurb: { en: "Clear words, ghostwriting, copy.", fr: "Des mots clairs, prête-plume, rédaction." } },
  { slug: "career", name: { en: "Career", fr: "Carrière" }, blurb: { en: "Freelancing and learning from Cameroon.", fr: "Freelance et apprentissage depuis le Cameroun." } },
  { slug: "general", name: { en: "General", fr: "Général" }, blurb: { en: "Everything else.", fr: "Tout le reste." } },
];

/* ---------- Projects and case studies ---------- */
export type Project = {
  slug: string;
  name: string;
  kind: Text;
  year: string;
  summary: Text;
  stack: string[];
  image: string;
  imageAlt: Text;
  live: string | null;
  github: string | null;
  problem: Text;
  built: TextList;
  result: Text;
  screenshots?: string[];
  beforeAfter?: { before: string; after: string };
};

export const projects: Project[] = [
  {
    slug: "examina-global",
    name: "Examina Global",
    kind: { en: "Education platform", fr: "Plateforme éducative" },
    year: "2026",
    summary: {
      en: "Bilingual exam preparation for Cameroon's GCE O/A Level, Baccalauréat and IELTS.",
      fr: "Préparation bilingue aux examens camerounais (GCE O/A Level, Baccalauréat) et à l'IELTS.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    image: "/projects/examina.webp",
    imageAlt: { en: "Examina Global home page", fr: "Page d'accueil d'Examina Global" },
    live: "https://examina-global.vercel.app",
    github: "https://github.com/samueletah54-art/examina-global",
    problem: {
      en: "Students preparing for national exams in Cameroon had few practice resources online that work in both English and French and load on a cheap phone.",
      fr: "Les élèves qui préparent les examens nationaux au Cameroun avaient peu de ressources en ligne, en anglais et en français, utilisables sur un téléphone bon marché.",
    },
    built: {
      en: ["109 worked exam questions with explanations", "Timed mock exams and a revision planner", "An IELTS band calculator", "Full English and French versions"],
      fr: ["109 questions d'examen corrigées et expliquées", "Des examens blancs chronométrés et un planning de révision", "Un calculateur de score IELTS", "Des versions complètes en anglais et en français"],
    },
    result: {
      en: "A live platform students can use today, with 109 questions and 28 curated lesson videos.",
      fr: "Une plateforme en ligne utilisable dès aujourd'hui, avec 109 questions et 28 vidéos de cours sélectionnées.",
    },
    screenshots: ["/projects/examina.webp"],
  },
  {
    slug: "bw-barbershop",
    name: "BW Barber Shop",
    kind: { en: "Business website & booking", fr: "Site vitrine et réservation" },
    year: "2026",
    summary: {
      en: "A bilingual website for a new barbershop in Emombo, Yaoundé, with prices on show and booking in four steps.",
      fr: "Un site bilingue pour un nouveau salon de coiffure à Emombo, Yaoundé, avec les prix affichés et une réservation en quatre étapes.",
    },
    stack: ["HTML", "CSS", "JavaScript", "Vercel Functions", "i18n (FR/EN)"],
    image: "/projects/bw-barbershop.webp",
    imageAlt: { en: "BW Barber Shop home page", fr: "Page d'accueil de BW Barber Shop" },
    live: "https://bw-barbershop.vercel.app",
    github: "https://github.com/samueletah54-art/bw-barbershop",
    problem: {
      en: "A new shop opening in a busy neighbourhood needed customers to find it, see the prices and book a chair before the first day, without a booking app or extra staff.",
      fr: "Un nouveau salon dans un quartier animé devait se faire connaître, afficher ses prix et prendre des réservations avant le premier jour, sans application ni personnel en plus.",
    },
    built: {
      en: ["A price list where every row books that cut", "Booking in four steps that ends in a ready-written WhatsApp message", "French and English, a dark design and a sticky call / WhatsApp bar on phones", "Google-ready business details (hours, prices, phone) and fast, cached images"],
      fr: ["Une grille de tarifs où chaque ligne réserve la coupe", "Une réservation en quatre étapes qui se termine par un message WhatsApp déjà rédigé", "Français et anglais, un design sombre et une barre d'appel / WhatsApp fixe sur téléphone", "Des informations prêtes pour Google (horaires, prix, téléphone) et des images rapides"],
    },
    result: {
      en: "Live before opening day, so customers can choose a cut and book in under a minute from their phone.",
      fr: "En ligne avant l'ouverture : les clients choisissent une coupe et réservent en moins d'une minute depuis leur téléphone.",
    },
    screenshots: ["/projects/bw-barbershop.webp"],
  },
  {
    slug: "mboa-phones",
    name: "Mboa Phones",
    kind: { en: "E-commerce storefront", fr: "Boutique en ligne" },
    year: "2026",
    summary: {
      en: "A bilingual storefront for a smartphone shop in Yaoundé, with ordering through WhatsApp.",
      fr: "Une boutique bilingue pour un vendeur de smartphones à Yaoundé, avec commande par WhatsApp.",
    },
    stack: ["HTML", "CSS", "JavaScript", "i18n (FR/EN)"],
    image: "/projects/mboa-phones.webp",
    imageAlt: { en: "Mboa Phones home page", fr: "Page d'accueil de Mboa Phones" },
    live: null,
    github: null,
    problem: {
      en: "The shop sold mostly through WhatsApp chats and walk-ins, with no catalogue customers could browse on their own.",
      fr: "La boutique vendait surtout par WhatsApp et en magasin, sans catalogue que les clients pouvaient consulter seuls.",
    },
    built: {
      en: ["A searchable catalogue with filters", "Product pages and favourites", "Ordering through WhatsApp with the model and price pre-filled", "French and English"],
      fr: ["Un catalogue avec recherche et filtres", "Des fiches produits et des favoris", "La commande par WhatsApp avec le modèle et le prix déjà remplis", "Français et anglais"],
    },
    result: {
      en: "Launching soon. Customers will be able to choose a phone and order in one tap.",
      fr: "Lancement imminent. Les clients pourront choisir un téléphone et commander en un geste.",
    },
    screenshots: ["/projects/mboa-phones.webp"],
  },
  {
    slug: "the-line",
    name: "The Line",
    kind: { en: "Interactive history website", fr: "Site d'histoire interactif" },
    year: "2026",
    summary: {
      en: "A digital history of Cameroon's partition and reunification, with maps and a timeline.",
      fr: "Une histoire numérique de la partition et de la réunification du Cameroun, avec cartes et frise.",
    },
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "SVG"],
    image: "/projects/the-line.webp",
    imageAlt: { en: "The Line home page", fr: "Page d'accueil de The Line" },
    live: "https://the-line-eight.vercel.app",
    github: "https://github.com/samueletah54-art/The-line-",
    problem: {
      en: "The story of how Cameroon was divided in 1916 and reunified is scattered across archives that are hard to find and harder to read.",
      fr: "L'histoire de la division du Cameroun en 1916 et de sa réunification est dispersée dans des archives difficiles à trouver et à lire.",
    },
    built: {
      en: ["Nine referenced chapters", "Scroll-driven maps and a searchable timeline", "24 historical profiles and 50+ licence-checked images", "An oral-history strand with a consent process"],
      fr: ["Neuf chapitres sourcés", "Des cartes animées au défilement et une frise consultable", "24 portraits historiques et plus de 50 images aux licences vérifiées", "Un volet d'histoire orale avec un protocole de consentement"],
    },
    result: {
      en: "A live, fast, static site that reads well on a phone and cites every source.",
      fr: "Un site statique rapide, en ligne, lisible sur téléphone et qui cite chaque source.",
    },
    screenshots: ["/projects/the-line.webp"],
  },
];

/* ---------- Services ---------- */
export const services: { slug: string; icon: string; title: Text; text: Text; included: TextList; timeline: Text }[] = [
  {
    slug: "web-development",
    icon: "code",
    title: { en: "Web development", fr: "Développement web" },
    text: {
      en: "A complete website for your business, school or organisation, built to load fast on mobile data.",
      fr: "Un site complet pour votre entreprise, école ou organisation, pensé pour se charger vite sur les données mobiles.",
    },
    included: {
      en: ["Design and build, mobile first", "English and French if you need it", "WhatsApp and contact buttons", "Basic SEO and analytics", "Hosting set-up and handover"],
      fr: ["Conception et réalisation, mobile d'abord", "Anglais et français si besoin", "Boutons WhatsApp et contact", "Référencement de base et statistiques", "Mise en ligne et passation"],
    },
    timeline: { en: "2–4 weeks", fr: "2 à 4 semaines" },
  },
  {
    slug: "website-redesign",
    icon: "refresh",
    title: { en: "Website redesign", fr: "Refonte de site" },
    text: {
      en: "Your current site, faster, clearer and easier to use, without losing what already works.",
      fr: "Votre site actuel, plus rapide, plus clair et plus simple, sans perdre ce qui fonctionne déjà.",
    },
    included: {
      en: ["Audit of speed, content and design", "New design and cleaner structure", "Content moved over carefully", "Before/after report"],
      fr: ["Audit de vitesse, contenu et design", "Nouveau design et structure plus claire", "Migration soignée du contenu", "Rapport avant/après"],
    },
    timeline: { en: "2–3 weeks", fr: "2 à 3 semaines" },
  },
  {
    slug: "security-audit",
    icon: "shield",
    title: { en: "Security audits", fr: "Audits de sécurité" },
    text: {
      en: "A practical check of your website's security basics, with a clear list of fixes in plain language.",
      fr: "Une vérification concrète des bases de sécurité de votre site, avec une liste claire de corrections.",
    },
    included: {
      en: ["HTTPS and security headers check", "Forms, logins and spam protection", "Outdated software and plugins", "Written report with priorities"],
      fr: ["Vérification HTTPS et en-têtes de sécurité", "Formulaires, connexions et anti-spam", "Logiciels et extensions obsolètes", "Rapport écrit avec priorités"],
    },
    timeline: { en: "3–5 days", fr: "3 à 5 jours" },
  },
  {
    slug: "video-editing",
    icon: "video",
    title: { en: "Video editing", fr: "Montage vidéo" },
    text: {
      en: "Vox-style explainer videos: a clear script, kinetic text, animated maps and archive footage.",
      fr: "Des vidéos explicatives dans le style Vox : un script clair, du texte animé, des cartes et des archives.",
    },
    included: {
      en: ["Script review", "Storyboard", "Motion graphics and edit", "Sound, subtitles and export for YouTube or social media"],
      fr: ["Relecture du script", "Storyboard", "Animation et montage", "Son, sous-titres et export pour YouTube ou les réseaux"],
    },
    timeline: { en: "1–2 weeks per video", fr: "1 à 2 semaines par vidéo" },
  },
];

/* ---------- Courses (placeholders until launch) ---------- */
export type Course = {
  slug: string;
  title: Text;
  promise: Text;
  level: Text;
  status: "soon" | "open";
  colors: [string, string];
  icon: string;
  learn: TextList;
  forWho: TextList;
  notFor: TextList;
  modules: { title: Text; lessons: TextList }[];
};

export const courses: Course[] = [
  {
    slug: "html-css-from-zero",
    title: { en: "HTML & CSS from Zero", fr: "HTML et CSS de zéro" },
    promise: { en: "Build and publish your first real website, even if you've never written code.", fr: "Créez et publiez votre premier vrai site, même sans avoir jamais codé." },
    level: { en: "Beginner", fr: "Débutant" },
    status: "soon",
    colors: ["#16a34a", "#2dd4bf"],
    icon: "</>",
    learn: { en: ["How web pages are built", "Layout with Flexbox and Grid", "Responsive design for phones", "Publishing your site for free"], fr: ["Comment une page web est construite", "La mise en page avec Flexbox et Grid", "Le design adapté aux téléphones", "Publier votre site gratuitement"] },
    forWho: { en: ["Complete beginners", "Students and career changers"], fr: ["Les grands débutants", "Les étudiants et les personnes en reconversion"] },
    notFor: { en: ["People who already build sites"], fr: ["Ceux qui créent déjà des sites"] },
    modules: [
      { title: { en: "Getting started", fr: "Premiers pas" }, lessons: { en: ["Your tools", "Your first page"], fr: ["Vos outils", "Votre première page"] } },
      { title: { en: "Styling with CSS", fr: "Le style avec CSS" }, lessons: { en: ["Colours and fonts", "Flexbox", "Grid"], fr: ["Couleurs et polices", "Flexbox", "Grid"] } },
      { title: { en: "Going live", fr: "Mise en ligne" }, lessons: { en: ["Responsive design", "Publishing"], fr: ["Design adaptatif", "Publication"] } },
    ],
  },
  {
    slug: "javascript-for-real-projects",
    title: { en: "JavaScript for Real Projects", fr: "JavaScript pour de vrais projets" },
    promise: { en: "Go from copying snippets to building interactive features you understand.", fr: "Passez du copier-coller à des fonctionnalités interactives que vous comprenez." },
    level: { en: "Beginner–intermediate", fr: "Débutant à intermédiaire" },
    status: "soon",
    colors: ["#ca8a04", "#ffe14d"],
    icon: "JS",
    learn: { en: ["Variables, functions and the DOM", "Fetching data from APIs", "Building a small app", "Debugging with confidence"], fr: ["Variables, fonctions et DOM", "Récupérer des données d'API", "Créer une petite application", "Déboguer avec assurance"] },
    forWho: { en: ["People who know some HTML and CSS"], fr: ["Ceux qui connaissent un peu HTML et CSS"] },
    notFor: { en: ["Experienced JavaScript developers"], fr: ["Les développeurs JavaScript expérimentés"] },
    modules: [
      { title: { en: "The basics", fr: "Les bases" }, lessons: { en: ["Values and variables", "Functions"], fr: ["Valeurs et variables", "Fonctions"] } },
      { title: { en: "The browser", fr: "Le navigateur" }, lessons: { en: ["The DOM", "Events", "Fetch"], fr: ["Le DOM", "Les événements", "Fetch"] } },
      { title: { en: "Project", fr: "Projet" }, lessons: { en: ["Build a WhatsApp order form"], fr: ["Créer un formulaire de commande WhatsApp"] } },
    ],
  },
  {
    slug: "web-security-basics",
    title: { en: "Web Security Basics for Developers", fr: "Les bases de la sécurité web pour développeurs" },
    promise: { en: "Ship websites that don't get hacked by the most common attacks.", fr: "Livrez des sites qui résistent aux attaques les plus courantes." },
    level: { en: "Intermediate", fr: "Intermédiaire" },
    status: "soon",
    colors: ["#0f766e", "#4ade80"],
    icon: "🛡",
    learn: { en: ["HTTPS and security headers", "XSS, CSRF and injection, explained", "Safe forms and logins", "A security checklist for every launch"], fr: ["HTTPS et en-têtes de sécurité", "XSS, CSRF et injections, expliqués", "Formulaires et connexions sûrs", "Une checklist sécurité pour chaque lancement"] },
    forWho: { en: ["Developers who build sites for clients"], fr: ["Les développeurs qui créent des sites pour des clients"] },
    notFor: { en: ["Complete beginners to code"], fr: ["Les grands débutants en code"] },
    modules: [
      { title: { en: "Foundations", fr: "Fondations" }, lessons: { en: ["How attacks happen", "HTTPS and headers"], fr: ["Comment les attaques arrivent", "HTTPS et en-têtes"] } },
      { title: { en: "Common attacks", fr: "Attaques courantes" }, lessons: { en: ["XSS", "CSRF", "Injection"], fr: ["XSS", "CSRF", "Injection"] } },
      { title: { en: "Launch checklist", fr: "Checklist de lancement" }, lessons: { en: ["Audit your own site"], fr: ["Auditer votre propre site"] } },
    ],
  },
  {
    slug: "vox-style-video-editing",
    title: { en: "Vox-Style Video Editing", fr: "Montage vidéo style Vox" },
    promise: { en: "Turn a script into a clear, engaging explainer video with free tools.", fr: "Transformez un script en vidéo explicative claire et captivante avec des outils gratuits." },
    level: { en: "Beginner–intermediate", fr: "Débutant à intermédiaire" },
    status: "soon",
    colors: ["#2b6cb0", "#4fa3e0"],
    icon: "▶",
    learn: { en: ["Writing a script that holds attention", "Kinetic typography", "Animated maps and archive footage", "Sound and export for YouTube"], fr: ["Écrire un script qui retient l'attention", "La typographie animée", "Cartes animées et images d'archives", "Son et export pour YouTube"] },
    forWho: { en: ["YouTubers and storytellers", "Anyone curious about motion design"], fr: ["Les YouTubeurs et les conteurs", "Les curieux du motion design"] },
    notFor: { en: ["Professional motion designers"], fr: ["Les motion designers professionnels"] },
    modules: [
      { title: { en: "Story first", fr: "L'histoire d'abord" }, lessons: { en: ["Script", "Storyboard"], fr: ["Script", "Storyboard"] } },
      { title: { en: "Motion", fr: "Animation" }, lessons: { en: ["Kinetic text", "Maps"], fr: ["Texte animé", "Cartes"] } },
      { title: { en: "Finish", fr: "Finition" }, lessons: { en: ["Sound", "Export"], fr: ["Son", "Export"] } },
    ],
  },
];

/* ---------- About ---------- */
export const about = {
  bio: {
    en: [
      "I'm Samuel, a web developer based in Yaoundé, Cameroon. I build websites that load fast on the phones people actually use, work in English and French, and are secure by default.",
      "I didn't start in tech. I studied International Relations at the University of Yaoundé I, then worked as a ghostwriter in 2025 before teaching myself to code by shipping real projects.",
      "Today I build for businesses, schools and organisations, I'm deepening my cybersecurity skills, and I edit Vox-style explainer videos.",
    ],
    fr: [
      "Je suis Samuel, développeur web à Yaoundé, au Cameroun. Je crée des sites qui se chargent vite sur les téléphones que les gens utilisent vraiment, en anglais et en français, et sécurisés par défaut.",
      "Je ne viens pas de la tech. J'ai étudié les relations internationales à l'Université de Yaoundé I, puis j'ai travaillé comme prête-plume en 2025 avant d'apprendre à coder en réalisant de vrais projets.",
      "Aujourd'hui, je crée pour des entreprises, des écoles et des organisations, je renforce mes compétences en cybersécurité et je monte des vidéos explicatives dans le style Vox.",
    ],
  } as TextList,
  skills: [
    { group: { en: "Front-end", fr: "Front-end" } as Text, items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
    { group: { en: "Back-end & tools", fr: "Back-end et outils" } as Text, items: ["Node.js", "Supabase", "SQL", "Git & GitHub", "Vercel"] },
    { group: { en: "Security", fr: "Sécurité" } as Text, items: ["HTTPS & headers", "Input validation", "Privacy-first analytics"] },
    { group: { en: "Video & writing", fr: "Vidéo et écriture" } as Text, items: ["CapCut", "Kinetic typography", "Ghostwriting", "EN ↔ FR translation"] },
  ],
  timeline: [
    { year: "2026", title: { en: "Freelance web developer", fr: "Développeur web freelance" } as Text, text: { en: "Examina Global, Mboa Phones and The Line.", fr: "Examina Global, Mboa Phones et The Line." } as Text },
    { year: "2025", title: { en: "Ghostwriter", fr: "Prête-plume" } as Text, text: { en: "Articles, speeches and memoirs published under clients' names.", fr: "Articles, discours et mémoires publiés sous le nom des clients." } as Text },
    { year: "UY1", title: { en: "Licence (BA) in International Relations", fr: "Licence en relations internationales" } as Text, text: { en: "University of Yaoundé I.", fr: "Université de Yaoundé I." } as Text },
    { year: "2018", title: { en: "GCE Advanced Level", fr: "GCE Advanced Level" } as Text, text: { en: "Cameroon.", fr: "Cameroun." } as Text },
  ],
  languages: { en: "English (first language, IELTS 7) · French (fluent) · German (A2) · Pidgin", fr: "Anglais (langue maternelle, IELTS 7) · Français (courant) · Allemand (A2) · Pidgin" } as Text,
};

/* ---------- /uses ---------- */
export const uses: { group: Text; items: { name: string; note: Text }[] }[] = [
  {
    group: { en: "Hardware", fr: "Matériel" },
    items: [
      { name: "Windows PC", note: { en: "Main machine for code and editing", fr: "Machine principale pour le code et le montage" } },
      { name: "iMac", note: { en: "Second machine", fr: "Deuxième machine" } },
      { name: "Android phone", note: { en: "I test every site on it", fr: "Je teste chaque site dessus" } },
    ],
  },
  {
    group: { en: "Code", fr: "Code" },
    items: [
      { name: "VS Code", note: { en: "Editor", fr: "Éditeur" } },
      { name: "Next.js + Tailwind CSS", note: { en: "My default stack", fr: "Ma stack par défaut" } },
      { name: "Git & GitHub", note: { en: "Version control", fr: "Gestion de versions" } },
      { name: "Vercel", note: { en: "Hosting", fr: "Hébergement" } },
      { name: "Supabase", note: { en: "Database and auth", fr: "Base de données et authentification" } },
      { name: "Claude", note: { en: "AI pair-programmer and editor", fr: "Assistant IA pour coder et relire" } },
    ],
  },
  {
    group: { en: "Video & writing", fr: "Vidéo et écriture" },
    items: [
      { name: "CapCut", note: { en: "Editing and motion", fr: "Montage et animation" } },
      { name: "Google Docs", note: { en: "Drafts and client writing", fr: "Brouillons et rédaction client" } },
    ],
  },
];

/* ---------- /now ---------- */
export const now = {
  updated: "2026-11-09",
  items: {
    en: [
      "Launching the Mboa Phones storefront.",
      "Deepening my web security skills.",
      "Recording my first course: HTML & CSS from Zero.",
      "Writing a new blog post every two weeks.",
      "Editing Vox-style explainer videos.",
    ],
    fr: [
      "Je lance la boutique Mboa Phones.",
      "Je renforce mes compétences en sécurité web.",
      "J'enregistre mon premier cours : HTML et CSS de zéro.",
      "J'écris un nouvel article toutes les deux semaines.",
      "Je monte des vidéos explicatives dans le style Vox.",
    ],
  } as TextList,
};

// "+237671857479" -> "+237 671 857 479"
export const prettyPhone = (n: string) => n.replace(/^(\+\d{3})(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4");
