import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useI18n, B as Button, h as heroImg, g as projectImg } from "./router-CYmLkTqG.mjs";
import { S as SectionTag } from "./SectionTag-07in7XpB.mjs";
import { T as TeamSection } from "./TeamSection-k9BjJ274.mjs";
import "../_libs/sonner.mjs";
import { A as ArrowRight, _ as Target, t as Eye, $ as Heart, m as Shield, l as Award, Z as Zap, Y as CircleCheck, a0 as Quote } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
const aboutImg = "/assets/hh-D4erLO_e.jpg";
function AboutStyles() {
  reactExports.useEffect(() => {
    const id = "about-styles";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      [data-fade] { opacity: 0; transform: translateY(28px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
      [data-fade].is-visible { opacity: 1 !important; transform: translateY(0) !important; }
      [data-fade-left] { opacity: 0; transform: translateX(-32px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
      [data-fade-left].is-visible { opacity: 1 !important; transform: translateX(0) !important; }
      [data-fade-right] { opacity: 0; transform: translateX(32px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
      [data-fade-right].is-visible { opacity: 1 !important; transform: translateX(0) !important; }

      .value-card { transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s; }
      .value-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px -12px rgba(0,0,0,0.15); }

      .commit-pill { transition: background 0.2s, color 0.2s, transform 0.2s; }
      .commit-pill:hover { transform: scale(1.04); }

      .testi-card { transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s; }
      .testi-card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px -8px rgba(0,0,0,0.12); }

      @keyframes timeline-dot-pop {
        0%   { transform: translate(-50%, 0) scale(0); opacity: 0; }
        60%  { transform: translate(-50%, 0) scale(1.3); }
        100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
      }
      .timeline-dot.is-visible { animation: timeline-dot-pop 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }
      .timeline-dot { opacity: 0; }

      @keyframes hero-float {
        0%, 100% { transform: translateY(0); }
        50%       { transform: translateY(-8px); }
      }
      .hero-float { animation: hero-float 4s ease-in-out infinite; }

      .img-zoom img { transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); }
      .img-zoom:hover img { transform: scale(1.04); }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}
function useFade(attr = "data-fade") {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute(attr, "");
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("is-visible");
        io.disconnect();
      }
    }, {
      threshold: 0.1
    });
    io.observe(el);
    return () => io.disconnect();
  }, [attr]);
  return ref;
}
function FadeIn({
  children,
  delay = 0,
  dir = "up",
  className = ""
}) {
  const attr = dir === "left" ? "data-fade-left" : dir === "right" ? "data-fade-right" : "data-fade";
  const ref = useFade(attr);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className, style: {
    transitionDelay: `${delay}ms`
  }, children });
}
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
function About() {
  const {
    t,
    lang
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AboutStyles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { title: t("about.page.title"), sub: t("about.page.sub"), crumb: t("nav.about") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { dir: "left", className: "relative img-zoom", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden shadow-2xl aspect-[4/3]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: aboutImg, alt: "", loading: "lazy", className: "w-full h-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-brand-blue-deep/30 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-5 -right-5 bg-accent text-accent-foreground px-6 py-5 rounded-xl shadow-xl hidden sm:block hero-float", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-black text-3xl", children: "2012" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest font-sans mt-0.5", children: lang === "fr" ? "Fondée" : "Founded" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 -left-4 h-16 w-16 border-t-2 border-l-2 border-accent rounded-tl-lg hidden sm:block" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { dir: "right", delay: 120, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("about.history.t") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl text-balance", children: t("about.history.t") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-muted-foreground leading-relaxed font-sans", children: t("about.history.b") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-3 gap-4", children: [{
          v: "14+",
          l: lang === "fr" ? "Années" : "Years"
        }, {
          v: "250+",
          l: lang === "fr" ? "Projets" : "Projects"
        }, {
          v: "120+",
          l: lang === "fr" ? "Clients" : "Clients"
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-4 bg-secondary/60 rounded-lg border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-black text-2xl text-accent", children: s.v }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-widest mt-1 font-sans", children: s.l })
        ] }, s.l)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { className: "text-center max-w-2xl mx-auto mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("about.values.tag") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl", children: t("about.values.title") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
        Icon: Target,
        label: t("intro.mission.t"),
        body: t("intro.mission.b"),
        delay: 0
      }, {
        Icon: Eye,
        label: t("intro.vision.t"),
        body: t("intro.vision.b"),
        delay: 100
      }, {
        Icon: Heart,
        label: t("intro.values.t"),
        body: t("intro.values.b"),
        delay: 200
      }].map(({
        Icon,
        label,
        body,
        delay
      }) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeIn, { delay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "value-card group bg-card border border-border rounded-xl p-8 hover:border-accent/50 h-full flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 grid place-items-center rounded-xl bg-primary/8 text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl mb-3", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed font-sans flex-1", children: body }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-500 rounded-full" })
      ] }) }, label)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { dir: "left", delay: 120, className: "order-2 lg:order-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("about.commit.t") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl", children: t("about.commit.t") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed font-sans", children: t("about.commit.b") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid sm:grid-cols-2 gap-4", children: [{
          Icon: Shield,
          label: lang === "fr" ? "Sécurité" : "Safety",
          color: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
        }, {
          Icon: Award,
          label: lang === "fr" ? "Qualité" : "Quality",
          color: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
        }, {
          Icon: Zap,
          label: lang === "fr" ? "Innovation" : "Innovation",
          color: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
        }, {
          Icon: Heart,
          label: lang === "fr" ? "Engagement" : "Commitment",
          color: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
        }].map(({
          Icon,
          label,
          color
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `commit-pill flex items-center gap-3 p-4 rounded-xl border border-border hover:border-accent/40 bg-card`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-10 w-10 grid place-items-center rounded-lg ${color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-accent ml-auto opacity-60" })
        ] }, label)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { dir: "right", className: "order-1 lg:order-2 relative img-zoom", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden shadow-2xl aspect-[4/3]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: projectImg, alt: "", loading: "lazy", className: "w-full h-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-tl from-brand-blue-deep/30 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 -right-4 h-16 w-16 border-t-2 border-r-2 border-accent rounded-tr-lg hidden sm:block" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-secondary/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { className: "text-center max-w-2xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("about.timeline.tag") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl", children: t("about.timeline.title") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" }),
        [{
          y: "2012",
          t: lang === "fr" ? "Création de Futura Construction" : "Futura Construction founded",
          b: lang === "fr" ? "Démarrage de nos activités à Douala." : "Starting our activities in Douala."
        }, {
          y: "2017",
          t: lang === "fr" ? "Premier hangar >1 000 m²" : "First hangar >1,000 m²",
          b: lang === "fr" ? "Étape majeure dans notre montée en compétence." : "A major milestone in our growth."
        }, {
          y: "2020",
          t: lang === "fr" ? "Ouverture de l'atelier" : "Workshop opening",
          b: lang === "fr" ? "Internalisation de la chaîne de production." : "Bringing production in-house."
        }, {
          y: "2024",
          t: lang === "fr" ? "Plus de 200 projets livrés" : "250+ projects delivered",
          b: lang === "fr" ? "Une référence en construction métallique au Cameroun." : "A benchmark in steel construction in Cameroon."
        }, {
          y: "2026",
          t: lang === "fr" ? "Plus de 250 projets livrés" : "250+ projects delivered",
          b: lang === "fr" ? "Une référence en construction métallique au Cameroun." : "A benchmark in steel construction in Cameroon."
        }].map((item, i) => {
          const isRight = i % 2 === 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { delay: i * 120, className: "relative pl-16 md:pl-0 mb-12 last:mb-0 md:grid md:grid-cols-2 md:gap-10 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineDot, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${isRight ? "md:order-2 md:text-left" : "md:text-right"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex flex-col items-start md:items-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-black text-4xl text-accent leading-none", children: item.y }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 w-12 bg-accent mt-1 rounded-full" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-3 md:mt-0 ${isRight ? "md:order-1" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 hover:border-accent/50 hover:shadow-lg transition-all", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: item.t }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 font-sans", children: item.b })
            ] }) })
          ] }, item.y);
        })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TeamSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { className: "text-center max-w-2xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("about.testi.tag") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl", children: t("about.testi.title") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
        n: "M. Tchoumi",
        r: lang === "fr" ? "Directeur logistique" : "Logistics Director",
        q: lang === "fr" ? "Un travail soigné, livré dans les délais. Une équipe vraiment professionnelle." : "Careful work, delivered on time. A truly professional team."
      }, {
        n: "Mme Kana",
        r: lang === "fr" ? "Responsable projet" : "Project Manager",
        q: lang === "fr" ? "Très bonne communication tout au long du chantier. Je recommande vivement." : "Great communication throughout the project. Highly recommended."
      }, {
        n: "M. Ndong",
        r: lang === "fr" ? "Industriel" : "Industrialist",
        q: lang === "fr" ? "Qualité de fabrication impeccable et finitions à la hauteur de nos exigences." : "Impeccable fabrication quality and finishes that met our high standards."
      }].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeIn, { delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "testi-card group bg-card border border-border rounded-xl p-7 hover:border-accent/50 h-full flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 grid place-items-center rounded-lg bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed italic font-sans flex-1", children: [
          '"',
          item.q,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-5 border-t border-border flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-primary/10 text-primary grid place-items-center font-display font-bold text-sm shrink-0", children: item.n.split(" ").map((w) => w[0]).join("").slice(0, 2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-sm", children: item.n }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-sans", children: item.r })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex gap-0.5", children: Array.from({
            length: 5
          }).map((_, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-3.5 w-3.5 fill-accent", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }, i2)) })
        ] })
      ] }) }, item.n)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CTABanner, {})
  ] });
}
function TimelineDot() {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("is-visible");
        io.disconnect();
      }
    }, {
      threshold: 0.5
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: "timeline-dot absolute left-5 md:left-1/2 top-4 -translate-x-1/2 h-5 w-5 rounded-full bg-accent border-4 border-background shadow-md z-10" });
}
export {
  CTABanner,
  PageHero,
  About as component
};
