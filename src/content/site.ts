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

  title: {
    en: "Web Developer & Security Enthusiast",
    fr: "Développeur web & passionné de sécurité",
  } as Text,
  pitch: {
    en: "I build fast, secure websites for businesses, schools and organisations, designed for the phones your customers actually use.",
    fr: "Je crée des sites web rapides et sécurisés pour les entreprises, les écoles et les organisations, pensés pour les téléphones que vos clients utilisent vraiment.",
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
    whatsapp: null as string | null, // e.g. "+2376XXXXXXXX"
    github: "https://github.com/samueletah54-art",
    linkedin: null as string | null, // e.g. "https://www.linkedin.com/in/your-name"
  },
};

// Interface and section text, per language.
export const copy = {
  en: {
    nav: { about: "About", work: "Work", skills: "Skills", services: "Services", contact: "Contact", cv: "CV" },
    availability: "Available for new projects",
    viewWork: "View work",
    contactBtn: "Contact",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langLabel: "Language",

    aboutTitle: ["From International Relations to ", "building the web."],
    about: [
      "I studied International Relations at the University of Yaoundé I, then taught myself web development by shipping real products: a storefront for a phone shop, a bilingual exam-prep platform and a digital history archive.",
      "Today I build websites for clients who need something that loads quickly on mobile data, works in English and French, and is secure by default. I'm deepening my cybersecurity skills so every site I hand over is built to be trusted.",
      "Alongside the web, I edit Vox-style explainer videos and work as a ghostwriter. The same habits carry across all three: careful research, clear structure and on-time delivery.",
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
    contactIntro: "Tell me what you need. I usually reply by email; for quick questions, use any channel below.",
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
    },
    builtWith: "Built with Next.js, Tailwind CSS & Framer Motion",
    toTop: "Back to top",
  },

  fr: {
    nav: { about: "Profil", work: "Projets", skills: "Compétences", services: "Services", contact: "Contact", cv: "CV" },
    availability: "Disponible pour de nouveaux projets",
    viewWork: "Voir les projets",
    contactBtn: "Contact",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    langLabel: "Langue",

    aboutTitle: ["Des relations internationales ", "au développement web."],
    about: [
      "J'ai étudié les relations internationales à l'Université de Yaoundé I, puis j'ai appris le développement web en réalisant de vrais produits : une boutique en ligne pour un vendeur de téléphones, une plateforme bilingue de préparation aux examens et une archive d'histoire numérique.",
      "Aujourd'hui, je crée des sites pour des clients qui ont besoin d'un site rapide sur les données mobiles, en anglais et en français, et sécurisé par défaut. Je renforce mes compétences en cybersécurité pour que chaque site livré soit digne de confiance.",
      "En parallèle, je monte des vidéos explicatives dans le style Vox et je travaille comme prête-plume. Les mêmes habitudes valent pour les trois : une recherche rigoureuse, une structure claire et des délais tenus.",
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
    contactIntro: "Dites-moi ce dont vous avez besoin. Je réponds en général par e-mail ; pour une question rapide, utilisez l'un des canaux ci-dessous.",
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
    },
    builtWith: "Réalisé avec Next.js, Tailwind CSS et Framer Motion",
    toTop: "Haut de page",
  },
};

export type Copy = (typeof copy)["en"];
