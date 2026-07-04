import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useRouterState, O as Outlet, H as HeadContent, S as Scripts, d as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { S as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { G as Globe, S as Sun, M as Moon, A as ArrowRight, X, a as Menu, C as Clock, F as Facebook, I as Instagram, L as Linkedin, b as MapPin, P as Phone, c as Mail } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
const appCss = "/assets/styles-Co3rhK1t.css";
const logoFutura = "/assets/logo-futura-B3yDqd-d.jpg";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Ctx = reactExports.createContext({ theme: "light", toggle: () => {
} });
function ThemeProvider({ children }) {
  const [theme, setTheme] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("theme") || "light";
    setTheme(saved);
  }, []);
  reactExports.useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value: { theme, toggle: () => setTheme((t) => t === "light" ? "dark" : "light") }, children });
}
const useTheme = () => reactExports.useContext(Ctx);
const dict = {
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.articles": "Actualités",
    "nav.contact": "Contact",
    "nav.admin": "Admin",
    "cta.quote": "Demander un devis",
    "cta.services": "Nos Services",
    "cta.contact": "Nous Contacter",
    "cta.readMore": "Lire la suite",
    "cta.allProjects": "Voir nos réalisations",
    "cta.allArticles": "Toutes les actualités",
    "hero.tag": "Construction métallique",
    "hero.title.1": "Concevoir",
    "hero.title.2": "Fabriquer",
    "hero.title.3": "Construire l'avenir",
    "hero.sub": "Futura Construction est votre partenaire de confiance pour tous vos projets en construction métallique, de la conception à la maîtrise d'œuvre.",
    "intro.tag": "Qui sommes-nous",
    "intro.title": "Un partenaire de confiance pour vos projets industriels",
    "intro.body": "Spécialiste en construction métallique, conception, fabrication, pose et maîtrise d'œuvre, Futura Construction allie expertise technique et innovation pour livrer des structures durables et performantes.",
    "intro.mission.t": "Notre mission",
    "intro.mission.b": "Offrir des solutions métalliques innovantes, durables et adaptées à chaque projet.",
    "intro.vision.t": "Notre vision",
    "intro.vision.b": "Être la référence en construction métallique dans la région et au-delà.",
    "intro.values.t": "Nos valeurs",
    "intro.values.b": "Qualité, Sécurité, Engagement, Innovation.",
    "services.tag": "Nos expertises",
    "services.title": "Cinq domaines d'expertise",
    "services.sub": "Une chaîne de valeur complète, du premier croquis à la livraison finale.",
    "projects.tag": "Nos réalisations",
    "projects.title": "Des projets qui prennent forme",
    "projects.sub": "Découvrez quelques-unes de nos réalisations en construction métallique.",
    "articles.tag": "Actualités",
    "articles.title": "Nos dernières publications",
    "articles.sub": "Conseils, actualités et études de cas.",
    "cta.global.title": "Un projet en tête ?",
    "cta.global.sub": "Parlons de votre projet de construction métallique. Notre équipe vous accompagne de A à Z.",
    "stats.years": "Années d'expérience",
    "stats.projects": "Projets réalisés",
    "stats.clients": "Clients satisfaits",
    "stats.team": "Collaborateurs",
    "about.page.title": "À propos de Futura Construction",
    "about.page.sub": "L'histoire, la mission et les valeurs d'une entreprise tournée vers l'avenir.",
    "about.history.t": "Notre histoire",
    "about.history.b": "Depuis sa création, Futura Construction s'est imposée comme un acteur majeur de la construction métallique. Avec des années d'expérience cumulée, nous avons mené à bien des dizaines de projets industriels, du hangar aux structures complexes.",
    "about.commit.t": "Nos engagements",
    "about.commit.b": "Sécurité, qualité, respect des délais et accompagnement personnalisé sont au cœur de notre démarche professionnelle.",
    "services.page.title": "Nos services",
    "services.page.sub": "De l'étude à la livraison, une expertise complète au service de vos projets.",
    "articles.page.title": "Articles & Actualités",
    "articles.page.sub": "L'actualité de Futura Construction et du secteur de la construction métallique.",
    "contact.page.title": "Contactez-nous",
    "contact.page.sub": "Nous sommes à votre écoute. Envoyez-nous un message et nous vous recontactons rapidement.",
    "contact.form.name": "Nom complet",
    "contact.form.email": "E-mail",
    "contact.form.subject": "Objet",
    "contact.form.message": "Message",
    "contact.form.submit": "Envoyer via WhatsApp",
    "contact.toast.title": "Message envoyé",
    "contact.toast.desc": "Vous êtes redirigé vers WhatsApp.",
    "contact.info.address": "Adresse",
    "contact.info.phone": "Téléphone",
    "contact.info.email": "E-mail",
    "contact.info.hours": "Horaires",
    "contact.info.hoursVal": "Lun - Ven : 8h - 18h",
    "footer.tagline": "Spécialiste en construction métallique, conception, fabrication, pose et maîtrise d'œuvre.",
    "footer.links": "Liens rapides",
    "footer.services": "Nos services",
    "footer.contact": "Nous contacter",
    "footer.rights": "Tous droits réservés.",
    "back": "Retour aux articles",
    "published": "Publié le",
    "team.tag": "Notre équipe",
    "team.title": "Les visages de Futura Construction",
    "team.sub": "Une équipe pluridisciplinaire passionnée et qualifiée à votre service.",
    "about.values.tag": "Nos valeurs",
    "about.values.title": "Ce qui nous anime au quotidien",
    "about.timeline.tag": "Notre parcours",
    "about.timeline.title": "Les grandes étapes",
    "about.testi.tag": "Témoignages",
    "about.testi.title": "Ils nous font confiance",
    "services.process.tag": "Notre méthode",
    "services.process.title": "Un processus éprouvé en 4 étapes",
    "services.process.sub": "De la première rencontre à la livraison finale, un suivi rigoureux.",
    "services.faq.tag": "FAQ",
    "services.faq.title": "Questions fréquentes",
    "articles.cats.tag": "Thématiques",
    "articles.cats.title": "Explorez par catégorie",
    "articles.news.tag": "Newsletter",
    "articles.news.title": "Restez informé",
    "articles.news.sub": "Recevez nos actualités et études de cas directement par e-mail.",
    "articles.news.btn": "S'abonner",
    "contact.why.tag": "Pourquoi nous",
    "contact.why.title": "Une équipe à votre écoute",
    "contact.faq.tag": "FAQ",
    "contact.faq.title": "Vos questions, nos réponses"
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.articles": "News",
    "nav.contact": "Contact",
    "nav.admin": "Admin",
    "cta.quote": "Request a quote",
    "cta.services": "Our Services",
    "cta.contact": "Contact us",
    "cta.readMore": "Read more",
    "cta.allProjects": "See our projects",
    "cta.allArticles": "All news",
    "hero.tag": "Steel construction",
    "hero.title.1": "Design",
    "hero.title.2": "Fabricate",
    "hero.title.3": "Build the future",
    "hero.sub": "Futura Construction is your trusted partner for all your steel construction projects, from design to project management.",
    "intro.tag": "Who we are",
    "intro.title": "A trusted partner for your industrial projects",
    "intro.body": "Specialist in steel construction, design, fabrication, installation and project management, Futura Construction combines technical expertise and innovation to deliver durable, high-performance structures.",
    "intro.mission.t": "Our mission",
    "intro.mission.b": "Deliver innovative, durable steel solutions tailored to every project.",
    "intro.vision.t": "Our vision",
    "intro.vision.b": "Be the reference in steel construction in our region and beyond.",
    "intro.values.t": "Our values",
    "intro.values.b": "Quality, Safety, Commitment, Innovation.",
    "services.tag": "Our expertise",
    "services.title": "Five areas of expertise",
    "services.sub": "A complete value chain, from the first sketch to final delivery.",
    "projects.tag": "Our work",
    "projects.title": "Projects that take shape",
    "projects.sub": "Discover some of our steel construction achievements.",
    "articles.tag": "News",
    "articles.title": "Our latest publications",
    "articles.sub": "Advice, news and case studies.",
    "cta.global.title": "Got a project in mind?",
    "cta.global.sub": "Let's talk about your steel construction project. Our team supports you from A to Z.",
    "stats.years": "Years of experience",
    "stats.projects": "Completed projects",
    "stats.clients": "Happy clients",
    "stats.team": "Team members",
    "about.page.title": "About Futura Construction",
    "about.page.sub": "The history, mission and values of a company turned toward the future.",
    "about.history.t": "Our story",
    "about.history.b": "Since its founding, Futura Construction has become a major player in steel construction. With years of combined experience, we have successfully delivered dozens of industrial projects, from hangars to complex structures.",
    "about.commit.t": "Our commitments",
    "about.commit.b": "Safety, quality, deadlines and personalised support are at the heart of our professional approach.",
    "services.page.title": "Our services",
    "services.page.sub": "From study to delivery, full expertise for your projects.",
    "articles.page.title": "Articles & News",
    "articles.page.sub": "News from Futura Construction and the steel construction sector.",
    "contact.page.title": "Contact us",
    "contact.page.sub": "We're listening. Send us a message and we'll get back to you soon.",
    "contact.form.name": "Full name",
    "contact.form.email": "Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.submit": "Send via WhatsApp",
    "contact.toast.title": "Message sent",
    "contact.toast.desc": "You're being redirected to WhatsApp.",
    "contact.info.address": "Address",
    "contact.info.phone": "Phone",
    "contact.info.email": "Email",
    "contact.info.hours": "Hours",
    "contact.info.hoursVal": "Mon - Fri: 8am - 6pm",
    "footer.tagline": "Specialist in steel construction, design, fabrication, installation and project management.",
    "footer.links": "Quick links",
    "footer.services": "Our services",
    "footer.contact": "Get in touch",
    "footer.rights": "All rights reserved.",
    "back": "Back to articles",
    "published": "Published on",
    "team.tag": "Our team",
    "team.title": "The faces of Futura Construction",
    "team.sub": "A multidisciplinary, passionate and qualified team at your service.",
    "about.values.tag": "Our values",
    "about.values.title": "What drives us every day",
    "about.timeline.tag": "Our journey",
    "about.timeline.title": "Key milestones",
    "about.testi.tag": "Testimonials",
    "about.testi.title": "They trust us",
    "services.process.tag": "Our method",
    "services.process.title": "A proven 4-step process",
    "services.process.sub": "From the first meeting to final delivery, rigorous follow-up.",
    "services.faq.tag": "FAQ",
    "services.faq.title": "Frequently asked questions",
    "articles.cats.tag": "Topics",
    "articles.cats.title": "Browse by category",
    "articles.news.tag": "Newsletter",
    "articles.news.title": "Stay informed",
    "articles.news.sub": "Get our news and case studies straight to your inbox.",
    "articles.news.btn": "Subscribe",
    "contact.why.tag": "Why us",
    "contact.why.title": "A team that listens",
    "contact.faq.tag": "FAQ",
    "contact.faq.title": "Your questions, our answers"
  }
};
const I18nCtx = reactExports.createContext({
  lang: "fr",
  setLang: () => {
  },
  t: (k) => k
});
function I18nProvider({ children }) {
  const [lang, setLangState] = reactExports.useState("fr");
  reactExports.useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("lang") || "fr";
    setLangState(saved);
  }, []);
  const setLang = (l) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };
  const t = (k) => dict[lang][k] ?? k;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(I18nCtx.Provider, { value: { lang, setLang, t }, children });
}
const useI18n = () => reactExports.useContext(I18nCtx);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const navLinks = [
  { to: "/", k: "nav.home" },
  { to: "/about", k: "nav.about" },
  { to: "/services", k: "nav.services" },
  { to: "/articles", k: "nav.articles" },
  { to: "/contact", k: "nav.contact" },
  { to: "/admin", k: "nav.admin" }
];
function Header() {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const { location } = useRouterState();
  reactExports.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  reactExports.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-[0_8px_30px_-15px_rgba(0,0,0,0.2)]" : "bg-background/30 backdrop-blur-md"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x flex items-center justify-between h-16 md:h-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 shrink-0 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoFutura, alt: "Futura Construction", className: "h-10 md:h-12 w-auto rounded-lg bg-white p-0.5 shadow-sm group-hover:shadow-md transition-shadow duration-300" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:flex flex-col leading-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-extrabold text-[15px] tracking-tight text-primary", children: "FUTURA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-[11px] text-accent tracking-[0.2em]", children: "CONSTRUCTION" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-1 p-1 rounded-full border border-border/60 bg-card/40 backdrop-blur-sm", children: navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: l.to,
              activeOptions: { exact: l.to === "/" },
              className: "relative px-4 py-2 text-sm font-semibold text-foreground/70 hover:text-foreground rounded-full transition-colors data-[status=active]:text-accent-foreground group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full bg-accent scale-90 opacity-0 group-data-[status=active]:scale-100 group-data-[status=active]:opacity-100 transition-all duration-300 -z-10" }),
                t(l.k)
              ]
            },
            l.to
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setLang(lang === "fr" ? "en" : "fr"),
                className: "hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-full border border-border text-xs font-bold uppercase hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300",
                "aria-label": "Change language",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3.5 w-3.5" }),
                  lang.toUpperCase()
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: toggle,
                className: "h-9 w-9 grid place-items-center rounded-full border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300",
                "aria-label": "Toggle theme",
                children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wide rounded-full shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.03] transition-all duration-300 group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", children: [
              t("cta.quote"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setOpen((o) => !o),
                className: "lg:hidden h-9 w-9 grid place-items-center rounded-full border border-border hover:border-accent hover:text-accent transition-colors",
                "aria-label": "Menu",
                children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-background/95 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x py-4 flex flex-col gap-1", children: [
              navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: l.to,
                  activeOptions: { exact: l.to === "/" },
                  className: "py-3 px-4 text-sm font-semibold rounded-xl data-[status=active]:bg-accent data-[status=active]:text-accent-foreground hover:bg-accent/5 transition-colors",
                  children: t(l.k)
                },
                l.to
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => setLang(lang === "fr" ? "en" : "fr"),
                    className: "flex items-center gap-1.5 h-10 px-4 rounded-full border border-border text-xs font-bold uppercase hover:border-accent hover:text-accent transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3.5 w-3.5" }),
                      " ",
                      lang.toUpperCase()
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full h-10 shadow-lg shadow-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", children: [
                  t("cta.quote"),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1.5 h-3.5 w-3.5" })
                ] }) })
              ] })
            ] }) })
          }
        )
      ]
    }
  );
}
const article1 = "/assets/article-1-5l-QM4O_.jpg";
const article2 = "/assets/article-2-CGGH2jO7.jpg";
const articlesBg = "/assets/article-3-CoVhY9ma.jpg";
const article4 = "/assets/article-4-C9U_JRN-.jpg";
const projectImg = "/assets/project-1-B_AJasgp.jpg";
const project2 = "/assets/project-2-D6Iuwm7m.jpg";
const project3 = "/assets/project-3-CqVv4C-x.jpg";
const project4 = "/assets/project-4-beyfmfXE.jpg";
const aboutTeam = "/assets/about-team-Bwhnhnu_.jpg";
const heroImg = "/assets/hero-steel-BFNhGlk7.jpg";
const tabaski = "/assets/tabaski-BIeJlVJU.jpg";
const un = "/assets/un-BfiVCArm.jpg";
const deux = "/assets/deux-BlL2ArD-.jpg";
const trois = "/assets/trois-DcVbcDyb.jpg";
const quatre = "/assets/quatre-71dJ3PFH.jpg";
const cinq = "/assets/cinq-CcehLeCU.jpg";
const team1 = "/assets/team-1-Cjw6gPWM.jpg";
const team2 = "/assets/team-2-BMY4C5Jj.jpg";
const team3 = "/assets/team-3-COmLONwg.jpg";
const services = [
  {
    id: "construction",
    icon: "Building2",
    title: { fr: "Construction métallique", en: "Steel construction" },
    short: {
      fr: "Structures, charpentes et hangars industriels durables.",
      en: "Durable structures, frameworks and industrial hangars."
    },
    long: {
      fr: "Réalisation de structures métalliques industrielles : charpentes, hangars, ossatures, passerelles. Nous concevons des ouvrages durables et performants, adaptés à votre activité.",
      en: "We deliver industrial steel structures: frameworks, hangars, skeletons, walkways. Durable, high-performance works tailored to your business."
    },
    bullets: {
      fr: ["Charpentes métalliques sur mesure", "Hangars industriels", "Bâtiments à étages", "Passerelles & ouvrages spéciaux"],
      en: ["Custom steel frameworks", "Industrial hangars", "Multi-storey buildings", "Walkways & special works"]
    },
    gallery: [projectImg, project2, project3]
  },
  {
    id: "conception",
    icon: "PencilRuler",
    title: { fr: "Conception", en: "Design" },
    short: { fr: "Études techniques, plans et modélisations.", en: "Technical studies, plans and modelling." },
    long: {
      fr: "Notre bureau d'études conçoit chaque projet avec rigueur : études techniques, dimensionnement, modélisations 3D et plans d'exécution.",
      en: "Our design office handles every project with rigour: technical studies, sizing, 3D modelling and execution drawings."
    },
    bullets: {
      fr: ["Études techniques", "Plans 2D / 3D", "Notes de calcul", "Dossiers d'exécution"],
      en: ["Technical studies", "2D / 3D plans", "Calculation notes", "Execution files"]
    },
    gallery: [project4, un, deux]
  },
  {
    id: "fabrication",
    icon: "Hammer",
    title: { fr: "Fabrication", en: "Fabrication" },
    short: { fr: "Fabrication sur mesure et assemblage métallique.", en: "Custom fabrication and steel assembly." },
    long: {
      fr: "Fabrication en atelier avec un contrôle qualité strict à chaque étape, garantissant des éléments précis et conformes.",
      en: "Workshop fabrication with strict quality control at every step, ensuring precise, compliant parts."
    },
    bullets: {
      fr: ["Atelier équipé", "Soudage qualifié", "Contrôle qualité", "Traitement de surface"],
      en: ["Equipped workshop", "Qualified welding", "Quality control", "Surface treatment"]
    },
    gallery: [trois, quatre, cinq]
  },
  {
    id: "pose",
    icon: "HardHat",
    title: { fr: "Pose", en: "Installation" },
    short: { fr: "Installation sur chantier et suivi technique.", en: "On-site installation and technical follow-up." },
    long: {
      fr: "Nos équipes qualifiées assurent la pose sur site dans le respect des délais et des normes de sécurité.",
      en: "Our qualified teams handle on-site installation, respecting deadlines and safety standards."
    },
    bullets: {
      fr: ["Équipes qualifiées", "Sécurité chantier", "Respect des délais", "Suivi technique"],
      en: ["Qualified teams", "Site safety", "Deadline focus", "Technical follow-up"]
    },
    gallery: [aboutTeam, heroImg, tabaski]
  },
  {
    id: "maitrise",
    icon: "ClipboardCheck",
    title: { fr: "Maîtrise d'œuvre", en: "Project management" },
    short: { fr: "Gestion de projet, coordination et contrôle qualité.", en: "Project management, coordination and quality control." },
    long: {
      fr: "Gestion complète de vos projets, de la planification à la réception, avec coordination des intervenants et contrôle qualité.",
      en: "Full project management, from planning to handover, with coordination and quality control."
    },
    bullets: {
      fr: ["Planification", "Coordination", "Contrôle qualité", "Réception des ouvrages"],
      en: ["Planning", "Coordination", "Quality control", "Project handover"]
    },
    gallery: [team1, team2, team3]
  }
];
const projects = [
  { id: 1, image: projectImg, title: { fr: "Hangar industriel — Douala", en: "Industrial hangar — Douala" }, type: { fr: "Charpente métallique", en: "Steel framework" } },
  { id: 2, image: project2, title: { fr: "Bâtiment logistique", en: "Logistics building" }, type: { fr: "Bardage & couverture", en: "Cladding & roofing" } },
  { id: 3, image: project3, title: { fr: "Entrepôt grande portée", en: "Wide-span warehouse" }, type: { fr: "Structure métallique", en: "Steel structure" } },
  { id: 4, image: project4, title: { fr: "Atelier de fabrication", en: "Fabrication workshop" }, type: { fr: "Fabrication & pose", en: "Fabrication & install" } }
];
const articles = [
  {
    slug: "importance-conception-projet-metallique",
    image: article1,
    date: "2025-05-18",
    category: { fr: "Conseils", en: "Advice" },
    title: { fr: "L'importance de la conception dans un projet métallique", en: "Why design matters in a steel project" },
    excerpt: {
      fr: "Une bonne conception garantit la sécurité, la durabilité et l'optimisation des coûts.",
      en: "Good design ensures safety, durability and cost optimisation."
    },
    content: {
      fr: "La phase de conception est le socle de tout projet de construction métallique réussi. Elle conditionne la sécurité de la structure, sa durabilité dans le temps et la maîtrise des coûts. Chez Futura Construction, nos ingénieurs travaillent main dans la main avec vous pour proposer des solutions techniques sur mesure, étayées par des modélisations 3D et des notes de calcul rigoureuses. Cette approche permet d'anticiper les contraintes du chantier et de livrer un ouvrage performant.",
      en: "Design is the foundation of any successful steel construction project. It conditions the safety of the structure, its long-term durability and cost control. At Futura Construction, our engineers work hand in hand with you to propose tailored technical solutions, supported by 3D modelling and rigorous calculation notes. This approach anticipates site constraints and delivers a high-performance work."
    }
  },
  {
    slug: "projet-industriel-hangar-metallique",
    image: article2,
    date: "2025-05-02",
    category: { fr: "Projets", en: "Projects" },
    title: { fr: "Projet industriel : construction d'un hangar métallique", en: "Industrial project: building a steel hangar" },
    excerpt: {
      fr: "Retour sur les étapes clés d'un projet industriel mené pour un de nos clients.",
      en: "A look back at the key stages of an industrial project for one of our clients."
    },
    content: {
      fr: "De l'étude initiale à la livraison, ce projet de hangar de 1200m² illustre notre savoir-faire. Conception en bureau d'études, fabrication en atelier sous contrôle qualité, puis pose sur site en trois semaines avec une équipe dédiée. Le client a apprécié notre réactivité et la qualité des finitions.",
      en: "From the initial study to delivery, this 1200m² hangar project illustrates our expertise. Design in our office, fabrication in our workshop under quality control, then on-site installation in three weeks with a dedicated team. The client appreciated our responsiveness and finish quality."
    }
  },
  {
    slug: "avantages-structures-metalliques",
    image: articlesBg,
    date: "2025-04-20",
    category: { fr: "Actualités", en: "News" },
    title: { fr: "Les avantages des structures métalliques", en: "The benefits of steel structures" },
    excerpt: {
      fr: "Pourquoi opter pour la construction métallique ? Voici les principaux avantages.",
      en: "Why choose steel construction? Here are the main benefits."
    },
    content: {
      fr: "Rapidité de mise en œuvre, légèreté, recyclabilité, grandes portées sans appuis intermédiaires : la construction métallique offre des avantages décisifs pour les bâtiments industriels et commerciaux. Elle permet aussi une grande flexibilité d'aménagement et d'extension future.",
      en: "Speed of execution, light weight, recyclability, wide spans without intermediate supports: steel construction offers decisive advantages for industrial and commercial buildings. It also allows great flexibility in layout and future expansion."
    }
  },
  {
    slug: "qualite-securite-chantier",
    image: article4,
    date: "2025-04-05",
    category: { fr: "Actualités", en: "News" },
    title: { fr: "Qualité et sécurité sur nos chantiers", en: "Quality and safety on our sites" },
    excerpt: {
      fr: "La sécurité et la qualité sont au cœur de notre démarche professionnelle.",
      en: "Safety and quality are at the heart of our professional approach."
    },
    content: {
      fr: "Chaque chantier Futura Construction fait l'objet d'un plan qualité et sécurité strict. Formation continue, EPI adaptés, contrôles réguliers et procédures écrites : autant de garanties pour vous livrer un ouvrage conforme dans des conditions optimales.",
      en: "Every Futura Construction site follows a strict quality and safety plan. Continuous training, suitable PPE, regular checks and written procedures: as many guarantees of a compliant delivery under optimal conditions."
    }
  }
];
const COMPANY = {
  name: "Futura Construction",
  phone: "+237 692 821 339",
  phoneRaw: "237692821339",
  email: "futuraconstructionsarl@gmail.com",
  address: "Douala, Ndokoti, rue CNPS"
};
const socialLinks = [
  { Icon: Facebook, href: "https://www.facebook.com/share/1Cam2Xiq9c/?mibextid=wwXIfr", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/futura.construction.sarl?igsh=MXRudW8zbDNsd2tmdw==", label: "Instagram" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" }
];
function Footer() {
  const { t, lang } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative mt-24 bg-brand-blue-deep text-white overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.04] pointer-events-none",
        style: {
          backgroundImage: "repeating-linear-gradient(135deg, white 0px, white 1px, transparent 1px, transparent 14px)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-12 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoFutura, alt: "", className: "h-12 w-auto bg-white rounded-sm p-0.5 border border-white/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-extrabold tracking-[0.08em]", children: "FUTURA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-[10px] text-accent tracking-[0.25em]", children: "CONSTRUCTION" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/60 leading-relaxed mb-5", children: t("footer.tagline") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-white/70 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-accent shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("contact.info.hoursVal") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2.5 mt-5", children: socialLinks.map(({ Icon, href, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": label,
            className: "h-10 w-10 grid place-items-center rounded-sm border border-white/15 bg-white/5 text-white/70 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-200 hover:-translate-y-0.5",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
          },
          label
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-[0.2em] text-accent mb-5 pb-2 border-b border-white/10", children: t("footer.links") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-0.5 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-accent shrink-0" }),
            t("nav.home")
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/about", className: "flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-0.5 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-accent shrink-0" }),
            t("nav.about")
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", className: "flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-0.5 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-accent shrink-0" }),
            t("nav.services")
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/articles", className: "flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-0.5 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-accent shrink-0" }),
            t("nav.articles")
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-0.5 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-accent shrink-0" }),
            t("nav.contact")
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-[0.2em] text-accent mb-5 pb-2 border-b border-white/10", children: t("footer.services") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 text-sm", children: services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", hash: s.id, className: "flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-0.5 transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-accent shrink-0" }),
          s.title[lang]
        ] }) }, s.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-[0.2em] text-accent mb-5 pb-2 border-b border-white/10", children: t("footer.contact") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 items-start p-3 rounded-sm bg-white/5 border border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 mt-0.5 text-accent shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70", children: COMPANY.address })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 items-center p-3 rounded-sm bg-white/5 border border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-accent shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${COMPANY.phoneRaw}`, className: "text-white/70 hover:text-white transition-colors font-semibold", children: COMPANY.phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 items-center p-3 rounded-sm bg-white/5 border border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-accent shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${COMPANY.email}`, className: "text-white/70 hover:text-white transition-colors break-all font-semibold", children: COMPANY.email })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative border-t border-white/10 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        COMPANY.name,
        ". ",
        t("footer.rights")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display tracking-[0.25em] text-accent/60", children: "FUTURA CONSTRUCTION SARL" })
    ] }) })
  ] });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "futuraconstructionsarl" },
      {
        name: "description",
        content: "Futura Construction : conception, fabrication, pose et maîtrise d'œuvre de structures métalliques à Douala."
      },
      { name: "author", content: "Futura Construction" },
      { property: "og:title", content: "Futura Construction" },
      { property: "og:description", content: "Concevoir, fabriquer, construire l'avenir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: logoFutura, type: "image/jpeg" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "fr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isAdminRoute = pathname.startsWith("/admin");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(I18nProvider, { children: [
    isAdminRoute ? /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-right", richColors: true })
  ] }) }) });
}
const supabaseUrl = "https://elaftkbsztilogtnpwtw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsYWZ0a2JzenRpbG9ndG5wd3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MjA0MTYsImV4cCI6MjA5NTk5NjQxNn0.4xTK1tjfBFxat7NY--Tb0NMnG39hO83S2qCXARkhoic";
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true
  }
});
const fallbackGallery = services[0]?.gallery ?? [];
function normalizeIcon(icon) {
  const allowedIcons = /* @__PURE__ */ new Set(["Building2", "PencilRuler", "Hammer", "HardHat", "ClipboardCheck"]);
  return icon && allowedIcons.has(icon) ? icon : "Building2";
}
function rowToService(row, images) {
  const titleFr = row.title?.fr || row.slug;
  const shortFr = row.short_description?.fr || "";
  const longFr = row.long_description?.fr || shortFr;
  const bulletsFr = row.metadata?.bullets?.fr?.filter(Boolean) ?? [];
  const bulletsEn = row.metadata?.bullets?.en?.filter(Boolean) ?? [];
  return {
    id: row.slug,
    icon: normalizeIcon(row.icon),
    title: {
      fr: titleFr,
      en: row.title?.en || titleFr
    },
    short: {
      fr: shortFr,
      en: row.short_description?.en || shortFr
    },
    long: {
      fr: longFr,
      en: row.long_description?.en || longFr
    },
    bullets: {
      fr: bulletsFr.length > 0 ? bulletsFr : ["Service personnalise selon votre projet"],
      en: bulletsEn.length > 0 ? bulletsEn : bulletsFr
    },
    gallery: images.length > 0 ? images : fallbackGallery
  };
}
async function getSiteServices() {
  const { data, error } = await supabase.from("services").select("id, slug, title, short_description, long_description, icon, metadata").eq("is_active", true).eq("status", "published").order("created_at", { ascending: true });
  if (error || !data) {
    return services;
  }
  const serviceIds = data.map((service) => service.id);
  const imagesByService = /* @__PURE__ */ new Map();
  if (serviceIds.length > 0) {
    const { data: mediaLinks } = await supabase.from("service_media").select("service_id, display_order, media:media_id(url)").in("service_id", serviceIds).order("display_order", { ascending: true });
    for (const link of mediaLinks ?? []) {
      const media = Array.isArray(link.media) ? link.media[0] : link.media;
      if (!media?.url) continue;
      const images = imagesByService.get(link.service_id) ?? [];
      images.push(media.url);
      imagesByService.set(link.service_id, images);
    }
  }
  const adminServices = data.map((row) => rowToService(row, imagesByService.get(row.id) ?? []));
  return [...services, ...adminServices];
}
const $$splitComponentImporter$6 = () => import("./services-CmGNSJLo.mjs");
const Route$6 = createFileRoute("/services")({
  loader: () => getSiteServices(),
  head: () => ({
    meta: [{
      title: "futuraconstructionsarl"
    }, {
      name: "description",
      content: "Cinq expertises : construction métallique, conception, fabrication, pose et maîtrise d'œuvre."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./contact-CZYvkd5f.mjs");
const Route$5 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "futuraconstructionsarl"
    }, {
      name: "description",
      content: "Contactez Futura Construction à Douala, Ndokoti. Tél : +237 692 821 339."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
function rowToArticle(row, images = []) {
  return {
    slug: row.slug,
    image: images[0] || articles[0]?.image || "",
    gallery: images.slice(1),
    date: (row.published_at || row.created_at || (/* @__PURE__ */ new Date()).toISOString()).slice(0, 10),
    category: {
      fr: "Actualites",
      en: "News"
    },
    title: {
      fr: row.title?.fr || row.slug,
      en: row.title?.en || row.title?.fr || row.slug
    },
    excerpt: {
      fr: row.excerpt?.fr || "",
      en: row.excerpt?.en || row.excerpt?.fr || ""
    },
    content: {
      fr: row.content?.fr || "",
      en: row.content?.en || row.content?.fr || ""
    }
  };
}
async function getSiteArticles() {
  const { data, error } = await supabase.from("articles").select("id, slug, title, excerpt, content, published_at, created_at").eq("is_active", true).eq("status", "published").order("published_at", { ascending: false });
  if (error) {
    return articles;
  }
  const articleIds = data.map((article) => article.id);
  const imagesByArticle = /* @__PURE__ */ new Map();
  if (articleIds.length > 0) {
    const { data: mediaLinks } = await supabase.from("article_media").select("article_id, display_order, media:media_id(id, url, file_name)").in("article_id", articleIds).order("display_order", { ascending: true });
    for (const link of mediaLinks ?? []) {
      const media = Array.isArray(link.media) ? link.media[0] : link.media;
      if (!media?.url) continue;
      const images = imagesByArticle.get(link.article_id) ?? [];
      images.push(media.url);
      imagesByArticle.set(link.article_id, images);
    }
  }
  return data.map((row) => rowToArticle(row, imagesByArticle.get(row.id) ?? []));
}
async function getSiteArticle(slug) {
  const articles2 = await getSiteArticles();
  return articles2.find((article) => article.slug === slug);
}
const $$splitComponentImporter$4 = () => import("./articles-Sr9-aYvh.mjs");
const Route$4 = createFileRoute("/articles")({
  loader: () => getSiteArticles(),
  head: () => ({
    meta: [{
      title: "futuraconstructionsarl"
    }, {
      name: "description",
      content: "Articles, actualités et études de cas en construction métallique."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root.displayName;
const $$splitComponentImporter$3 = () => import("./admin-VONxEo1T.mjs");
const Route$3 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Administration - Futura Construction"
    }, {
      name: "description",
      content: "Tableau de bord d'administration Futura Construction."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./about-DdrurBEG.mjs");
const Route$2 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "futuraconstructionsarl"
    }, {
      name: "description",
      content: "Découvrez l'histoire, la mission, la vision et les valeurs de Futura Construction."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
function PageHero({
  title,
  sub,
  crumb,
  bgImage = heroImg
}) {
  const {
    t
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative text-white py-28 md:py-36 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: bgImage, alt: "", className: "w-full h-full object-cover scale-105" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-brand-blue-deep/98 via-brand-blue-deep/88 to-brand-blue-deep/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "absolute inset-0 w-full h-full opacity-5", viewBox: "0 0 900 400", preserveAspectRatio: "xMidYMid slice", children: Array.from({
        length: 10
      }).map((_, r) => Array.from({
        length: 14
      }).map((_2, c) => /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: c * 68 - 10, y: r * 52 - 10, width: "58", height: "44", fill: "none", stroke: "white", strokeWidth: "0.4" }, `${r}-${c}`))) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-bold mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-accent" }),
        t("nav.home"),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "/" }),
        crumb
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-4xl sm:text-6xl text-balance max-w-3xl leading-tight animate-fade-up", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-white/75 max-w-2xl font-sans leading-relaxed", children: sub }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-0.5 w-16 bg-accent rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-0.5 w-8 bg-white/20 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-0.5 w-4 bg-white/10 rounded-full" })
      ] })
    ] })
  ] });
}
function CTABanner() {
  const {
    t
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-20 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 brand-gradient" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "100%", height: "100%", viewBox: "0 0 800 200", preserveAspectRatio: "xMidYMid slice", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "100", r: "200", fill: "none", stroke: "white", strokeWidth: "0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "700", cy: "100", r: "200", fill: "none", stroke: "white", strokeWidth: "0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "400", cy: "250", r: "250", fill: "none", stroke: "white", strokeWidth: "0.5" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x relative flex flex-col md:flex-row items-center justify-between gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-accent" }),
          t("nav.contact")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-black text-2xl sm:text-3xl", children: t("cta.global.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-white/75 font-sans", children: t("cta.global.sub") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-sm h-12 px-8 shrink-0 group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", children: [
        t("cta.quote"),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" })
      ] }) })
    ] })
  ] });
}
const $$splitComponentImporter$1 = () => import("./index-BX31KQ9u.mjs");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "futuraconstructionsarl"
    }, {
      name: "description",
      content: "Spécialiste en construction métallique : conception, fabrication, pose et maîtrise d'œuvre. Demandez un devis."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./articles._slug-DzKr5mja.mjs");
const Route = createFileRoute("/articles/$slug")({
  loader: async ({
    params
  }) => {
    const article = await getSiteArticle(params.slug);
    if (!article) throw notFound();
    return {
      article
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: loaderData ? [{
      title: "futuraconstructionsarl"
    }, {
      name: "description",
      content: loaderData.article.excerpt.fr
    }, {
      property: "og:image",
      content: loaderData.article.image
    }] : [{
      title: "futuraconstructionsarl"
    }, {
      name: "description",
      content: "Retrouvez nos articles et actualités sur les projets Futura Construction."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ServicesRoute = Route$6.update({
  id: "/services",
  path: "/services",
  getParentRoute: () => Route$7
});
const ContactRoute = Route$5.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$7
});
const ArticlesRoute = Route$4.update({
  id: "/articles",
  path: "/articles",
  getParentRoute: () => Route$7
});
const AdminRoute = Route$3.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$7
});
const AboutRoute = Route$2.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const ArticlesSlugRoute = Route.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => ArticlesRoute
});
const ArticlesRouteChildren = {
  ArticlesSlugRoute
};
const ArticlesRouteWithChildren = ArticlesRoute._addFileChildren(
  ArticlesRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute,
  ArticlesRoute: ArticlesRouteWithChildren,
  ContactRoute,
  ServicesRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  CTABanner as C,
  Label as L,
  PageHero as P,
  Route$6 as R,
  project4 as a,
  COMPANY as b,
  cn as c,
  Route$4 as d,
  articlesBg as e,
  useTheme as f,
  projectImg as g,
  heroImg as h,
  project3 as i,
  services as j,
  projects as k,
  logoFutura as l,
  articles as m,
  Route as n,
  project2 as p,
  router as r,
  supabase as s,
  useI18n as u
};
