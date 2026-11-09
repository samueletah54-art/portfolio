// All editable text for the site lives here, in English and French.
// Change it and redeploy; no component edits needed. A value of `null` hides that item.

export type Lang = "en" | "fr";
export const langs: Lang[] = ["en", "fr"];

type Text = Record<Lang, string>;

export type Project = {
  name: string;
  kind: Text;
  description: Text;
  imageAlt: Text;
  stack: string[];
  image: string;
  live: string | null;
  github: string | null;
  year: string;
};

export const site = {
  url: "https://samuel-etah-dev.vercel.app",
  name: "Samuel Etah",
  location: "Yaoundé, Cameroon",
  cv: "https://the-line-eight.vercel.app/cv/",
  // Paste a YouTube link to your best 20–40 second reel here; the player appears automatically.
  reel: null as string | null,

  title: {
    en: "Engineer & writer",
    fr: "Ingénieur web & rédacteur",
  } as Text,
  pitch: {
    en: "I build fast, secure websites for businesses, schools and organisations, and I write the words that make people read them.",
    fr: "Je crée des sites web rapides et sécurisés pour les entreprises, les écoles et les organisations, et j'écris les textes qui donnent envie de les lire.",
  } as Text,
  alsoLine: {
    en: "Also available for video editing and ghostwriting.",
    fr: "Également disponible pour le montage vidéo et la rédaction en prête-plume.",
  } as Text,

  projects: [
    {
      name: "Examina Global",
      kind: { en: "Education platform", fr: "Plateforme éducative" },
      year: "2026",
      description: {
        en: "Exam preparation for Cameroon's GCE O/A Level, Baccalauréat and IELTS: 109 worked questions, timed mock exams, a revision planner and an IELTS band calculator, in English and French.",
        fr: "Préparation aux examens camerounais (GCE O/A Level, Baccalauréat) et à l'IELTS : 109 questions corrigées, examens blancs chronométrés, un planning de révision et un calculateur de score IELTS, en anglais et en français.",
      },
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      image: "/projects/examina.webp",
      imageAlt: {
        en: "Examina Global home page: Prepare for the GCE, the Bac and IELTS.",
        fr: "Page d'accueil d'Examina Global : préparez le GCE, le Bac et l'IELTS.",
      },
      live: "https://examina-global.vercel.app",
      github: "https://github.com/samueletah54-art/examina-global",
    },
    {
      name: "Mboa Phones",
      kind: { en: "E-commerce storefront", fr: "Boutique en ligne" },
      year: "2026",
      description: {
        en: "A bilingual storefront for a smartphone shop in Yaoundé: catalogue with search and filters, product pages, favourites, and ordering through WhatsApp with the model and price pre-filled.",
        fr: "Une boutique bilingue pour un vendeur de smartphones à Yaoundé : catalogue avec recherche et filtres, fiches produits, favoris et commande par WhatsApp avec le modèle et le prix déjà remplis.",
      },
      stack: ["HTML", "CSS", "JavaScript", "i18n (FR/EN)"],
      image: "/projects/mboa-phones.webp",
      imageAlt: {
        en: "Mboa Phones home page: Votre prochain téléphone. Un choix plus malin.",
        fr: "Page d'accueil de Mboa Phones : Votre prochain téléphone. Un choix plus malin.",
      },
      live: null,
      github: null,
    },
    {
      name: "The Line",
      kind: { en: "Digital humanities archive", fr: "Archive numérique d'histoire" },
      year: "2026",
      description: {
        en: "A digital archive on Cameroon's partition, reunification and colonial memory: nine referenced chapters, scroll-driven maps, a searchable timeline and an oral-history strand.",
        fr: "Une archive numérique sur la partition, la réunification et la mémoire coloniale du Cameroun : neuf chapitres sourcés, des cartes animées au défilement, une frise chronologique consultable et un volet d'histoire orale.",
      },
      stack: ["HTML", "CSS", "JavaScript", "Node.js", "SVG"],
      image: "/projects/the-line.webp",
      imageAlt: {
        en: "The Line home page: 1884 Germany claims Kamerun, 1916 Britain and France draw a line across it.",
        fr: "Page d'accueil de The Line : 1884, l'Allemagne revendique le Kamerun ; 1916, la Grande-Bretagne et la France y tracent une ligne.",
      },
      live: "https://the-line-eight.vercel.app",
      github: "https://github.com/samueletah54-art/The-line-",
    },
  ] satisfies Project[],

  contact: {
    email: "samueletah54@gmail.com",
    whatsapp: "+237671857479" as string | null,
    github: "https://github.com/samueletah54-art",
    linkedin: null as string | null, // e.g. "https://www.linkedin.com/in/your-name"
    instagram: "https://www.instagram.com/samuelisco22/" as string | null, // e.g. "https://www.instagram.com/your-handle"
    x: "https://x.com/samuel_izko" as string | null, // e.g. "https://x.com/your-handle"
    threads: null as string | null, // e.g. "https://www.threads.net/@your-handle"
  },
};

// Blog posts. Add a new object to publish a post; the newest goes first.
export type Post = { slug: string; date: string; title: Text; summary: Text; body: Record<Lang, string[]> };

export const posts: Post[] = [
  {
    slug: "my-story",
    date: "2026-11-09",
    title: {
      en: "From International Relations to building the web",
      fr: "Des relations internationales au développement web",
    },
    summary: {
      en: "How a degree about diplomacy, a year of ghostwriting and a lot of late nights turned into a career in code.",
      fr: "Comment une licence en diplomatie, une année comme prête-plume et beaucoup de nuits blanches sont devenues un métier dans le code.",
    },
    body: {
      en: [
        "I studied International Relations at the University of Yaoundé I. It was not a computer science degree, but it taught me two things I use every day: how to research a question properly, and how to explain it clearly to someone who was not in the room.",
        "In 2025 I started working as a ghostwriter. Clients would give me an idea and a deadline, and I would turn it into writing they could publish under their own name. Ghostwriting teaches you to listen first, to match someone else's voice, and to deliver on time.",
        "Around the same time I started teaching myself to code. I did not learn from a single course. I learned by building things people could use: Examina Global, an exam-prep platform for Cameroonian students in English and French; a bilingual storefront for a phone shop in Yaoundé; and The Line, an interactive history of Cameroon's partition with maps and a timeline.",
        "Building for Cameroon changes how you build. Most visitors are on low-cost Android phones and pay for every megabyte, so a fast, light page is not a nice extra: it decides whether someone sees your site at all. Many readers switch between English and French, so bilingual is the default. And because clients trust you with their business, security has to be built in from the start, which is why I am now deepening my skills in web security.",
        "Today I build websites for businesses, schools and organisations, and I still write. The two jobs turn out to be the same job: understand what people need, then make it clear and easy for them. If you have a project, I would like to hear about it.",
      ],
      fr: [
        "J'ai étudié les relations internationales à l'Université de Yaoundé I. Ce n'était pas une formation en informatique, mais elle m'a appris deux choses que j'utilise tous les jours : chercher sérieusement la réponse à une question, et l'expliquer clairement à quelqu'un qui n'était pas là.",
        "En 2025, j'ai commencé à travailler comme prête-plume. Des clients me confiaient une idée et une échéance, et j'en faisais un texte qu'ils pouvaient publier sous leur propre nom. Ce métier apprend à écouter d'abord, à épouser la voix de quelqu'un d'autre et à livrer à temps.",
        "À la même période, j'ai appris à coder seul. Pas avec un seul cours, mais en construisant des choses utiles : Examina Global, une plateforme de préparation aux examens pour les élèves camerounais, en anglais et en français ; une boutique bilingue pour un vendeur de téléphones à Yaoundé ; et The Line, une histoire interactive de la partition du Cameroun, avec des cartes et une frise chronologique.",
        "Construire pour le Cameroun change la façon de construire. La plupart des visiteurs utilisent des téléphones Android bon marché et paient chaque mégaoctet : une page rapide et légère n'est pas un bonus, elle décide si votre site sera vu ou non. Beaucoup de lecteurs passent de l'anglais au français, donc le bilinguisme est la norme. Et comme les clients vous confient leur activité, la sécurité doit être pensée dès le départ ; c'est pourquoi je renforce aujourd'hui mes compétences en sécurité web.",
        "Aujourd'hui, je crée des sites pour des entreprises, des écoles et des organisations, et j'écris toujours. Les deux métiers se rejoignent : comprendre ce dont les gens ont besoin, puis le rendre clair et simple. Si vous avez un projet, j'aimerais en parler.",
      ],
    },
  },
];

// Interface and section text, per language.
export const copy = {
  en: {
    nav: { about: "About", experience: "Experience", work: "Projects", craft: "Motion & writing", skills: "Skills", services: "Services", writing: "Writing", contact: "Contact", cv: "CV" },
    availability: "Available for new projects",
    viewWork: "View work",
    contactBtn: "Contact",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langLabel: "Language",

    aboutTitle: ["From International Relations to ", "building the web."],
    about: [
      "I'm Samuel, an engineer and writer based in Yaoundé, Cameroon. I build websites that load fast on the phones people actually use, and I write: articles, long-form pieces and the words on the sites I make.",
      "I didn't start in tech. I studied International Relations at the University of Yaoundé I, where I learned to research carefully and write clearly. In 2025 I put that to work as a ghostwriter, writing for clients under their own names.",
      "Then I taught myself to code by shipping real things: an exam-prep platform for Cameroonian students, a storefront for a phone shop in Yaoundé and an interactive history of my country's partition. Today I build for businesses, schools and organisations, and I'm deepening my security skills so every site I hand over can be trusted.",
      "When I'm not coding or writing, I edit Vox-style explainer videos.",
    ],
    facts: [
      { label: "Based in", value: "Yaoundé, Cameroon" },
      { label: "Background", value: "BA International Relations, University of Yaoundé I" },
      { label: "Languages", value: "English · French · German (A2)" },
      { label: "Focus", value: "Business websites, web apps, security" },
    ],
    proof: [
      { n: "2", label: "Live platforms" },
      { n: "3", label: "Languages spoken" },
      { n: "7.0", label: "IELTS band" },
      { n: "109", label: "Exam questions built" },
    ],
    experienceTitle: "Experience",
    craft: {
      motionTitle: "Vox-style motion",
      motionIntro: "Explainer videos that make a complex story easy to follow: a clear script, then kinetic text, animated maps and archive footage cut to the voice-over.",
      motionMakes: ["YouTube explainers", "Short-form videos for social media", "Animated maps and timelines", "Kinetic typography"],
      reelLabel: "Showreel",
      reelPlay: "Play the reel",
      writingTitle: "Ghostwriting",
      writingIntro: "Writing published under my clients' names: researched properly, written in their voice and delivered on deadline, in English or French.",
      writingMakes: ["Articles and opinion pieces", "Speeches", "Memoirs", "Editing and French–English translation"],
      confidential: "Client work stays confidential. Samples are available on request, and my own writing is in the Writing section.",
      processLabel: "How I work",
      motionSteps: ["Script", "Storyboard", "Motion", "Sound & export"],
      writingSteps: ["Interview", "Outline", "Draft in your voice", "Revise together"],
      ask: "Ask for a sample",
    },
    experience: [
      { year: "2026", role: "Freelance web developer", org: "Clients & independent projects" },
      { year: "2025", role: "Ghostwriter", org: "Independent" },
      { year: "Degree", role: "Licence (BA), International Relations", org: "University of Yaoundé I" },
    ],

    workTitle: ["Selected projects, ", "live", " and in use."],
    liveSite: "Live site",
    opens: "opens {name} in a new tab",
    source: "source code of {name}",
    soon: "Launching soon",
    stack: "Stack",

    skillsTitle: ["The tools I ", "ship", " with."],
    skills: [
      { group: "Languages", items: ["HTML", "CSS", "JavaScript", "TypeScript", "SQL"] },
      { group: "Frameworks", items: ["React", "Next.js", "Tailwind CSS", "Node.js"] },
      { group: "Tools", items: ["Git & GitHub", "Vercel", "Supabase", "VS Code"] },
      { group: "Security", items: ["HTTPS & security headers", "Input validation", "Privacy-first analytics"] },
      { group: "Video", items: ["CapCut", "Kinetic typography", "Map animation", "Script to edit"] },
    ],

    servicesTitle: ["What I can ", "build", " for you."],
    services: [
      {
        title: "Business websites",
        description:
          "A complete site for your shop, school or organisation: fast on mobile data, bilingual if you need it, easy for customers to contact you.",
      },
      {
        title: "Landing pages",
        description:
          "One focused page for a product, an event or a campaign, built to load instantly and turn visits into WhatsApp messages or sign-ups.",
      },
      {
        title: "Maintenance & security",
        description: "Updates, backups, security headers and fixes after launch, so your site stays online, safe and current.",
      },
    ],
    alsoTitle: "Also available",
    also: [
      {
        title: "Video editing",
        description:
          "Vox-style explainer videos: kinetic text, animated maps and archive footage cut to a script, for YouTube channels, brands and documentaries.",
      },
      {
        title: "Ghostwriting",
        description:
          "Articles and long-form writing published under your name: researched properly, written in your voice, delivered on deadline. English or French.",
      },
    ],

    contactTitle: ["Have a project? ", "Let's talk."],
    contactIntro: "Tell me what you need. WhatsApp is the fastest way to reach me; email and the form below work too.",
    form: {
      name: "Name",
      email: "Email",
      details: "Project details",
      placeholder: "What do you need, and by when?",
      send: "Send message",
      sending: "Sending…",
      sent: "Thanks, your message is on its way. I'll reply soon.",
      sentMail: "Your email app should open with the message ready to send.",
      error: "Something went wrong. Please email",
      subject: "Website enquiry from",
      cvFull: "View full CV",
    },
    writingIntro: "Notes on building for the web, writing, and working from Cameroon.",
    readPost: "Read",
    allPosts: "Back to home",
    minRead: "min read",
    nowLabel: "Now",
    now: "Launching the Mboa Phones storefront, deepening my web security skills and editing explainer videos.",
    copy: "Copy",
    whatsappCta: "Chat on WhatsApp",
    sound: { on: "Turn sounds on", off: "Turn sounds off" },
    search: { button: "Search", placeholder: "Search sections, projects, posts…", none: "Nothing found", sections: "Sections", projects: "Projects", writing: "Writing", links: "Contact & links" },
    copied: "Email copied ✓",
    builtWith: "Built with Next.js, Tailwind CSS & Framer Motion",
    toTop: "Back to top",
  },

  fr: {
    nav: { about: "Profil", experience: "Expérience", work: "Projets", craft: "Vidéo & écriture", skills: "Compétences", services: "Services", writing: "Écrits", contact: "Contact", cv: "CV" },
    availability: "Disponible pour de nouveaux projets",
    viewWork: "Voir les projets",
    contactBtn: "Contact",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    langLabel: "Langue",

    aboutTitle: ["Des relations internationales ", "au développement web."],
    about: [
      "Je suis Samuel, ingénieur web et rédacteur à Yaoundé, au Cameroun. Je crée des sites qui se chargent vite sur les téléphones que les gens utilisent vraiment, et j'écris : des articles, des textes longs et les mots des sites que je construis.",
      "Je ne viens pas de la tech. J'ai étudié les relations internationales à l'Université de Yaoundé I, où j'ai appris à chercher avec rigueur et à écrire clairement. En 2025, j'ai mis cela à profit comme prête-plume, en écrivant pour des clients sous leur propre nom.",
      "Puis j'ai appris à coder en réalisant de vrais projets : une plateforme de préparation aux examens pour les élèves camerounais, une boutique en ligne pour un vendeur de téléphones à Yaoundé et une histoire interactive de la partition de mon pays. Aujourd'hui, je crée pour des entreprises, des écoles et des organisations, et je renforce mes compétences en sécurité pour que chaque site livré soit digne de confiance.",
      "Quand je ne code pas et n'écris pas, je monte des vidéos explicatives dans le style Vox.",
    ],
    facts: [
      { label: "Basé à", value: "Yaoundé, Cameroun" },
      { label: "Formation", value: "Licence en relations internationales, Université de Yaoundé I" },
      { label: "Langues", value: "Anglais · Français · Allemand (A2)" },
      { label: "Spécialité", value: "Sites d'entreprise, applications web, sécurité" },
    ],
    proof: [
      { n: "2", label: "Plateformes en ligne" },
      { n: "3", label: "Langues parlées" },
      { n: "7.0", label: "Score IELTS" },
      { n: "109", label: "Questions d'examen créées" },
    ],
    experienceTitle: "Expérience",
    craft: {
      motionTitle: "Motion design style Vox",
      motionIntro: "Des vidéos explicatives qui rendent une histoire complexe facile à suivre : un script clair, puis du texte animé, des cartes animées et des images d'archives montées sur la voix off.",
      motionMakes: ["Vidéos explicatives YouTube", "Vidéos courtes pour les réseaux sociaux", "Cartes et frises animées", "Typographie animée"],
      reelLabel: "Bande démo",
      reelPlay: "Lire la bande démo",
      writingTitle: "Prête-plume",
      writingIntro: "Des textes publiés sous le nom de mes clients : bien documentés, écrits dans leur voix et livrés dans les délais, en anglais ou en français.",
      writingMakes: ["Articles et tribunes", "Discours", "Mémoires", "Relecture et traduction anglais–français"],
      confidential: "Le travail des clients reste confidentiel. Des extraits sont disponibles sur demande, et mes propres textes sont dans la rubrique Écrits.",
      processLabel: "Ma méthode",
      motionSteps: ["Script", "Storyboard", "Animation", "Son et export"],
      writingSteps: ["Entretien", "Plan", "Rédaction dans votre voix", "Révision ensemble"],
      ask: "Demander un extrait",
    },
    experience: [
      { year: "2026", role: "Développeur web freelance", org: "Clients et projets indépendants" },
      { year: "2025", role: "Prête-plume", org: "Indépendant" },
      { year: "Diplôme", role: "Licence en relations internationales", org: "Université de Yaoundé I" },
    ],

    workTitle: ["Des projets ", "en ligne", " et utilisés."],
    liveSite: "Voir le site",
    opens: "ouvre {name} dans un nouvel onglet",
    source: "code source de {name}",
    soon: "Bientôt en ligne",
    stack: "Technologies",

    skillsTitle: ["Les outils avec lesquels je ", "livre", "."],
    skills: [
      { group: "Langages", items: ["HTML", "CSS", "JavaScript", "TypeScript", "SQL"] },
      { group: "Frameworks", items: ["React", "Next.js", "Tailwind CSS", "Node.js"] },
      { group: "Outils", items: ["Git & GitHub", "Vercel", "Supabase", "VS Code"] },
      { group: "Sécurité", items: ["HTTPS et en-têtes de sécurité", "Validation des entrées", "Statistiques respectueuses de la vie privée"] },
      { group: "Vidéo", items: ["CapCut", "Typographie animée", "Cartes animées", "Du script au montage"] },
    ],

    servicesTitle: ["Ce que je peux ", "créer", " pour vous."],
    services: [
      {
        title: "Sites d'entreprise",
        description:
          "Un site complet pour votre boutique, école ou organisation : rapide sur les données mobiles, bilingue si besoin, et facile à contacter pour vos clients.",
      },
      {
        title: "Pages de présentation",
        description:
          "Une page ciblée pour un produit, un événement ou une campagne, qui se charge instantanément et transforme les visites en messages WhatsApp ou en inscriptions.",
      },
      {
        title: "Maintenance et sécurité",
        description:
          "Mises à jour, sauvegardes, en-têtes de sécurité et corrections après la mise en ligne, pour que votre site reste disponible, sûr et à jour.",
      },
    ],
    alsoTitle: "Également disponible",
    also: [
      {
        title: "Montage vidéo",
        description:
          "Vidéos explicatives dans le style Vox : texte animé, cartes animées et images d'archives montées sur un script, pour des chaînes YouTube, des marques et des documentaires.",
      },
      {
        title: "Prête-plume",
        description:
          "Articles et textes longs publiés sous votre nom : bien documentés, écrits dans votre voix, livrés dans les délais. En anglais ou en français.",
      },
    ],

    contactTitle: ["Un projet ? ", "Parlons-en."],
    contactIntro: "Dites-moi ce dont vous avez besoin. WhatsApp est le moyen le plus rapide de me joindre ; l'e-mail et le formulaire ci-dessous fonctionnent aussi.",
    form: {
      name: "Nom",
      email: "E-mail",
      details: "Votre projet",
      placeholder: "De quoi avez-vous besoin, et pour quand ?",
      send: "Envoyer",
      sending: "Envoi…",
      sent: "Merci, votre message est envoyé. Je vous réponds rapidement.",
      sentMail: "Votre messagerie devrait s'ouvrir avec le message prêt à envoyer.",
      error: "Une erreur est survenue. Écrivez-moi à",
      subject: "Demande via le site de",
      cvFull: "Voir le CV complet",
    },
    writingIntro: "Des notes sur le web, l'écriture et le travail depuis le Cameroun.",
    readPost: "Lire",
    allPosts: "Retour à l'accueil",
    minRead: "min de lecture",
    nowLabel: "En ce moment",
    now: "Je lance la boutique Mboa Phones, je renforce mes compétences en sécurité web et je monte des vidéos explicatives.",
    copy: "Copier",
    whatsappCta: "Discuter sur WhatsApp",
    sound: { on: "Activer les sons", off: "Couper les sons" },
    search: { button: "Rechercher", placeholder: "Rechercher une section, un projet, un article…", none: "Aucun résultat", sections: "Sections", projects: "Projets", writing: "Écrits", links: "Contact et liens" },
    copied: "E-mail copié ✓",
    builtWith: "Réalisé avec Next.js, Tailwind CSS et Framer Motion",
    toTop: "Haut de page",
  },
};

export type Copy = (typeof copy)["en"];
