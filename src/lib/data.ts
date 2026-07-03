import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";
import article4 from "@/assets/article-4.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import aboutTeam from "@/assets/about-team.jpg";
import heroSteel from "@/assets/hero-steel.jpg";
import tabaski from "@/assets/tabaski.jpg";
import un from "@/assets/un.jpg";
import deux from "@/assets/deux.jpg";
import trois from "@/assets/trois.jpg";
import quatre from "@/assets/quatre.jpg";
import cinq from "@/assets/cinq.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

export type Service = {
  id: string;
  icon: string;
  title: { fr: string; en: string };
  short: { fr: string; en: string };
  long: { fr: string; en: string };
  bullets: { fr: string[]; en: string[] };
  gallery: string[];
};

export const services: Service[] = [
  {
    id: "construction",
    icon: "Building2",
    title: { fr: "Construction métallique", en: "Steel construction" },
    short: {
      fr: "Structures, charpentes et hangars industriels durables.",
      en: "Durable structures, frameworks and industrial hangars.",
    },
    long: {
      fr: "Réalisation de structures métalliques industrielles : charpentes, hangars, ossatures, passerelles. Nous concevons des ouvrages durables et performants, adaptés à votre activité.",
      en: "We deliver industrial steel structures: frameworks, hangars, skeletons, walkways. Durable, high-performance works tailored to your business.",
    },
    bullets: {
      fr: ["Charpentes métalliques sur mesure", "Hangars industriels", "Bâtiments à étages", "Passerelles & ouvrages spéciaux"],
      en: ["Custom steel frameworks", "Industrial hangars", "Multi-storey buildings", "Walkways & special works"],
    },
    gallery: [project1, project2, project3],
  },
  {
    id: "conception",
    icon: "PencilRuler",
    title: { fr: "Conception", en: "Design" },
    short: { fr: "Études techniques, plans et modélisations.", en: "Technical studies, plans and modelling." },
    long: {
      fr: "Notre bureau d'études conçoit chaque projet avec rigueur : études techniques, dimensionnement, modélisations 3D et plans d'exécution.",
      en: "Our design office handles every project with rigour: technical studies, sizing, 3D modelling and execution drawings.",
    },
    bullets: {
      fr: ["Études techniques", "Plans 2D / 3D", "Notes de calcul", "Dossiers d'exécution"],
      en: ["Technical studies", "2D / 3D plans", "Calculation notes", "Execution files"],
    },
    gallery: [project4, un, deux],
  },
  {
    id: "fabrication",
    icon: "Hammer",
    title: { fr: "Fabrication", en: "Fabrication" },
    short: { fr: "Fabrication sur mesure et assemblage métallique.", en: "Custom fabrication and steel assembly." },
    long: {
      fr: "Fabrication en atelier avec un contrôle qualité strict à chaque étape, garantissant des éléments précis et conformes.",
      en: "Workshop fabrication with strict quality control at every step, ensuring precise, compliant parts.",
    },
    bullets: {
      fr: ["Atelier équipé", "Soudage qualifié", "Contrôle qualité", "Traitement de surface"],
      en: ["Equipped workshop", "Qualified welding", "Quality control", "Surface treatment"],
    },
    gallery: [trois, quatre, cinq],
  },
  {
    id: "pose",
    icon: "HardHat",
    title: { fr: "Pose", en: "Installation" },
    short: { fr: "Installation sur chantier et suivi technique.", en: "On-site installation and technical follow-up." },
    long: {
      fr: "Nos équipes qualifiées assurent la pose sur site dans le respect des délais et des normes de sécurité.",
      en: "Our qualified teams handle on-site installation, respecting deadlines and safety standards.",
    },
    bullets: {
      fr: ["Équipes qualifiées", "Sécurité chantier", "Respect des délais", "Suivi technique"],
      en: ["Qualified teams", "Site safety", "Deadline focus", "Technical follow-up"],
    },
    gallery: [aboutTeam, heroSteel, tabaski],
  },
  {
    id: "maitrise",
    icon: "ClipboardCheck",
    title: { fr: "Maîtrise d'œuvre", en: "Project management" },
    short: { fr: "Gestion de projet, coordination et contrôle qualité.", en: "Project management, coordination and quality control." },
    long: {
      fr: "Gestion complète de vos projets, de la planification à la réception, avec coordination des intervenants et contrôle qualité.",
      en: "Full project management, from planning to handover, with coordination and quality control.",
    },
    bullets: {
      fr: ["Planification", "Coordination", "Contrôle qualité", "Réception des ouvrages"],
      en: ["Planning", "Coordination", "Quality control", "Project handover"],
    },
    gallery: [team1, team2, team3],
  },
];

export const projects = [
  { id: 1, image: project1, title: { fr: "Hangar industriel — Douala", en: "Industrial hangar — Douala" }, type: { fr: "Charpente métallique", en: "Steel framework" } },
  { id: 2, image: project2, title: { fr: "Bâtiment logistique", en: "Logistics building" }, type: { fr: "Bardage & couverture", en: "Cladding & roofing" } },
  { id: 3, image: project3, title: { fr: "Entrepôt grande portée", en: "Wide-span warehouse" }, type: { fr: "Structure métallique", en: "Steel structure" } },
  { id: 4, image: project4, title: { fr: "Atelier de fabrication", en: "Fabrication workshop" }, type: { fr: "Fabrication & pose", en: "Fabrication & install" } },
];

export type Article = {
  slug: string;
  image: string;
  gallery?: string[];
  date: string;
  category: { fr: string; en: string };
  title: { fr: string; en: string };
  excerpt: { fr: string; en: string };
  content: { fr: string; en: string };
};

export const articles: Article[] = [
  {
    slug: "importance-conception-projet-metallique",
    image: article1,
    date: "2025-05-18",
    category: { fr: "Conseils", en: "Advice" },
    title: { fr: "L'importance de la conception dans un projet métallique", en: "Why design matters in a steel project" },
    excerpt: {
      fr: "Une bonne conception garantit la sécurité, la durabilité et l'optimisation des coûts.",
      en: "Good design ensures safety, durability and cost optimisation.",
    },
    content: {
      fr: "La phase de conception est le socle de tout projet de construction métallique réussi. Elle conditionne la sécurité de la structure, sa durabilité dans le temps et la maîtrise des coûts. Chez Futura Construction, nos ingénieurs travaillent main dans la main avec vous pour proposer des solutions techniques sur mesure, étayées par des modélisations 3D et des notes de calcul rigoureuses. Cette approche permet d'anticiper les contraintes du chantier et de livrer un ouvrage performant.",
      en: "Design is the foundation of any successful steel construction project. It conditions the safety of the structure, its long-term durability and cost control. At Futura Construction, our engineers work hand in hand with you to propose tailored technical solutions, supported by 3D modelling and rigorous calculation notes. This approach anticipates site constraints and delivers a high-performance work.",
    },
  },
  {
    slug: "projet-industriel-hangar-metallique",
    image: article2,
    date: "2025-05-02",
    category: { fr: "Projets", en: "Projects" },
    title: { fr: "Projet industriel : construction d'un hangar métallique", en: "Industrial project: building a steel hangar" },
    excerpt: {
      fr: "Retour sur les étapes clés d'un projet industriel mené pour un de nos clients.",
      en: "A look back at the key stages of an industrial project for one of our clients.",
    },
    content: {
      fr: "De l'étude initiale à la livraison, ce projet de hangar de 1200m² illustre notre savoir-faire. Conception en bureau d'études, fabrication en atelier sous contrôle qualité, puis pose sur site en trois semaines avec une équipe dédiée. Le client a apprécié notre réactivité et la qualité des finitions.",
      en: "From the initial study to delivery, this 1200m² hangar project illustrates our expertise. Design in our office, fabrication in our workshop under quality control, then on-site installation in three weeks with a dedicated team. The client appreciated our responsiveness and finish quality.",
    },
  },
  {
    slug: "avantages-structures-metalliques",
    image: article3,
    date: "2025-04-20",
    category: { fr: "Actualités", en: "News" },
    title: { fr: "Les avantages des structures métalliques", en: "The benefits of steel structures" },
    excerpt: {
      fr: "Pourquoi opter pour la construction métallique ? Voici les principaux avantages.",
      en: "Why choose steel construction? Here are the main benefits.",
    },
    content: {
      fr: "Rapidité de mise en œuvre, légèreté, recyclabilité, grandes portées sans appuis intermédiaires : la construction métallique offre des avantages décisifs pour les bâtiments industriels et commerciaux. Elle permet aussi une grande flexibilité d'aménagement et d'extension future.",
      en: "Speed of execution, light weight, recyclability, wide spans without intermediate supports: steel construction offers decisive advantages for industrial and commercial buildings. It also allows great flexibility in layout and future expansion.",
    },
  },
  {
    slug: "qualite-securite-chantier",
    image: article4,
    date: "2025-04-05",
    category: { fr: "Actualités", en: "News" },
    title: { fr: "Qualité et sécurité sur nos chantiers", en: "Quality and safety on our sites" },
    excerpt: {
      fr: "La sécurité et la qualité sont au cœur de notre démarche professionnelle.",
      en: "Safety and quality are at the heart of our professional approach.",
    },
    content: {
      fr: "Chaque chantier Futura Construction fait l'objet d'un plan qualité et sécurité strict. Formation continue, EPI adaptés, contrôles réguliers et procédures écrites : autant de garanties pour vous livrer un ouvrage conforme dans des conditions optimales.",
      en: "Every Futura Construction site follows a strict quality and safety plan. Continuous training, suitable PPE, regular checks and written procedures: as many guarantees of a compliant delivery under optimal conditions.",
    },
  },
];

export const COMPANY = {
  name: "Futura Construction",
  phone: "+237 692 821 339",
  phoneRaw: "237692821339",
  email: "futuraconstructionsarl@gmail.com",
  address: "Douala, Ndokoti, rue CNPS",
};
