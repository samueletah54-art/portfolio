// All editable text for the site lives here. Change it and redeploy; no component edits needed.
// A value of `null` hides that item until you fill it in.

export type Project = {
  name: string;
  kind: string;
  description: string;
  stack: string[];
  image: string;
  imageAlt: string;
  live: string | null;
  github: string | null;
  year: string;
};

export const site = {
  url: "https://samuel-etah-dev.vercel.app",
  name: "Samuel Etah",
  title: "Web Developer & Security Enthusiast",
  location: "Yaoundé, Cameroon",
  pitch:
    "I build fast, secure websites for businesses, schools and organisations, designed for the phones your customers actually use.",
  availability: "Available for new projects",

  about: [
    "I studied International Relations at the University of Yaoundé I, then taught myself web development by shipping real products: a storefront for a phone shop, a bilingual exam-prep platform and a digital history archive.",
    "Today I build websites for clients who need something that loads quickly on mobile data, works in English and French, and is secure by default. I'm deepening my cybersecurity skills so every site I hand over is built to be trusted.",
  ],
  facts: [
    { label: "Based in", value: "Yaoundé, Cameroon" },
    { label: "Background", value: "BA International Relations, University of Yaoundé I" },
    { label: "Languages", value: "English · French · German (A2)" },
    { label: "Focus", value: "Business websites, web apps, security" },
  ],

  projects: [
    {
      name: "Examina Global",
      kind: "Education platform",
      year: "2026",
      description:
        "Exam preparation for Cameroon's GCE O/A Level, Baccalauréat and IELTS: 109 worked questions, timed mock exams, a revision planner and an IELTS band calculator, in English and French.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      image: "/projects/examina.webp",
      imageAlt: "Examina Global home page: Prepare for the GCE, the Bac and IELTS.",
      live: "https://examina-global.vercel.app",
      github: "https://github.com/samueletah54-art/examina-global",
    },
    {
      name: "Mboa Phones",
      kind: "E-commerce storefront",
      year: "2026",
      description:
        "A bilingual storefront for a smartphone shop in Yaoundé: catalogue with search and filters, product pages, favourites, and ordering through WhatsApp with the model and price pre-filled.",
      stack: ["HTML", "CSS", "JavaScript", "i18n (FR/EN)"],
      image: "/projects/mboa-phones.webp",
      imageAlt: "Mboa Phones home page: Votre prochain téléphone. Un choix plus malin.",
      live: null,
      github: null,
    },
    {
      name: "The Line",
      kind: "Digital humanities archive",
      year: "2026",
      description:
        "A digital archive on Cameroon's partition, reunification and colonial memory: nine referenced chapters, scroll-driven maps, a searchable timeline and an oral-history strand.",
      stack: ["HTML", "CSS", "JavaScript", "Node.js", "SVG"],
      image: "/projects/the-line.webp",
      imageAlt: "The Line home page: 1884 Germany claims Kamerun, 1916 Britain and France draw a line across it.",
      live: "https://the-line-eight.vercel.app",
      github: "https://github.com/samueletah54-art/The-line-",
    },
  ] satisfies Project[],

  skills: [
    { group: "Languages", items: ["HTML", "CSS", "JavaScript", "TypeScript", "SQL"] },
    { group: "Frameworks", items: ["React", "Next.js", "Tailwind CSS", "Node.js"] },
    { group: "Tools", items: ["Git & GitHub", "Vercel", "Supabase", "VS Code"] },
    { group: "Security", items: ["HTTPS & security headers", "Input validation", "Privacy-first analytics"] },
  ],

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
      description:
        "Updates, backups, security headers and fixes after launch, so your site stays online, safe and current.",
    },
  ],

  contact: {
    email: "samueletah54@gmail.com",
    whatsapp: null as string | null, // e.g. "+2376XXXXXXXX"
    github: "https://github.com/samueletah54-art",
    linkedin: null as string | null, // e.g. "https://www.linkedin.com/in/your-name"
  },
};
