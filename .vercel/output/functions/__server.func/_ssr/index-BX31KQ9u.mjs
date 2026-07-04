import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useI18n, j as services, B as Button, k as projects, m as articles, h as heroImg } from "./router-CYmLkTqG.mjs";
import { a as aboutImg, T as TeamSection } from "./TeamSection-k9BjJ274.mjs";
import { S as SectionTag } from "./SectionTag-07in7XpB.mjs";
import "../_libs/sonner.mjs";
import { h as ClipboardCheck, H as HardHat, i as Hammer, j as PencilRuler, B as Building2, A as ArrowRight, Y as CircleCheck, p as ChevronLeft, q as ChevronRight } from "../_libs/lucide-react.mjs";
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
const futuraVideo = "/assets/futuravideo-CHBvWgly.mp4";
function CountUp({ to, suffix = "", duration = 1800 }) {
  const [val, setVal] = reactExports.useState(0);
  const ref = reactExports.useRef(null);
  const started = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, children: [
    val,
    suffix
  ] });
}
const ICONS = {
  Building2,
  PencilRuler,
  Hammer,
  HardHat,
  ClipboardCheck
};
function useFadeInOnScroll() {
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
      threshold: 0.12
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
function FadeIn({
  children,
  delay = 0,
  className = ""
}) {
  const ref = useFadeInOnScroll();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className, style: {
    opacity: 0,
    transform: "translateY(28px)",
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
  }, "data-fade": true, children });
}
function GlobalStyles() {
  reactExports.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      [data-fade].is-visible { opacity: 1 !important; transform: translateY(0) !important; }

      @keyframes ticker {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      .ticker-track { animation: ticker 28s linear infinite; }
      .ticker-track:hover { animation-play-state: paused; }

      @keyframes hero-float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }

      .hero-badge { animation: hero-float 4s ease-in-out infinite; }

      @keyframes pulse-ring {
        0% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(1.6); opacity: 0; }
      }

      .pulse-ring { animation: pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite; }

      .project-card img { transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); }
      .project-card:hover img { transform: scale(1.08); }
      .project-card .overlay { transition: opacity 0.4s; }
      .project-card:hover .overlay { opacity: 1 !important; }

      .service-card { transition: transform 0.25s, box-shadow 0.25s; }
      .service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px -8px rgba(0,0,0,0.12); }

      @keyframes slide-in-left {
        from { opacity:0; transform:translateX(-30px); }
        to { opacity:1; transform:translateX(0); }
      }

      @keyframes slide-in-right {
        from { opacity:0; transform:translateX(30px); }
        to { opacity:1; transform:translateX(0); }
      }

      .hero-anim-left { animation: slide-in-left 0.9s cubic-bezier(0.16,1,0.3,1) both; }
      .hero-anim-right { animation: slide-in-right 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both; }

      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }

      .stat-number {
        background: linear-gradient(90deg, oklch(0.70 0.20 25) 0%, oklch(0.85 0.15 45) 40%, oklch(0.70 0.20 25) 80%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 3s linear infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return null;
}
function ProjectCarousel({
  lang
}) {
  const [current, setCurrent] = reactExports.useState(0);
  const [isTransitioning, setIsTransitioning] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  const total = projects.length;
  const goTo = reactExports.useCallback((idx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((idx + total) % total);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, total]);
  reactExports.useEffect(() => {
    timerRef.current = setTimeout(() => goTo(current + 1), 4e3);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, goTo]);
  const prev = (current - 1 + total) % total;
  const cur = current;
  const next = (current + 1) % total;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project-card relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer opacity-50 hover:opacity-70 transition-opacity hidden sm:block", onClick: () => goTo(current - 1), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: projects[prev].image, alt: "", className: "absolute inset-0 w-full h-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/40 to-transparent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project-card relative overflow-hidden rounded-xl aspect-[3/4] cursor-pointer ring-2 ring-accent ring-offset-2 ring-offset-background sm:scale-105 sm:z-10", style: {
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: projects[cur].image, alt: "", className: "absolute inset-0 w-full h-full object-cover", style: {
          transition: "opacity 0.4s",
          opacity: isTransitioning ? 0.7 : 1
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/30 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overlay absolute inset-0 bg-accent/10", style: {
          opacity: 0
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-accent font-bold mb-1 font-sans", children: projects[cur].type[lang] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-xl leading-snug", children: projects[cur].title[lang] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 flex gap-1.5", children: projects.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
          e.stopPropagation();
          goTo(i);
        }, className: "rounded-full transition-all", style: {
          width: i === current ? "20px" : "6px",
          height: "6px",
          background: i === current ? "oklch(0.50 0.20 25)" : "rgba(255,255,255,0.4)"
        } }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project-card relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer opacity-50 hover:opacity-70 transition-opacity hidden sm:block", onClick: () => goTo(current + 1), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: projects[next].image, alt: "", className: "absolute inset-0 w-full h-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/40 to-transparent" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => goTo(current - 1), className: "absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 grid place-items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-accent hover:border-accent transition-colors", "aria-label": "Précédent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => goTo(current + 1), className: "absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 grid place-items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-accent hover:border-accent transition-colors", "aria-label": "Suivant", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" }) })
  ] });
}
function Ticker({
  lang
}) {
  const items = [{
    fr: "Construction métallique",
    en: "Steel construction"
  }, {
    fr: "Conception & ingénierie",
    en: "Design & engineering"
  }, {
    fr: "Fabrication sur mesure",
    en: "Custom fabrication"
  }, {
    fr: "Maîtrise d'œuvre",
    en: "Project management"
  }, {
    fr: "10+ ans d'expérience",
    en: "10+ years of experience"
  }, {
    fr: "250+ projets livrés",
    en: "250+ projects delivered"
  }, {
    fr: "Douala, Cameroun",
    en: "Douala, Cameroon"
  }, {
    fr: "Qualité & sécurité",
    en: "Quality & safety"
  }];
  const doubled = [...items, ...items];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden border-y border-border py-3 bg-secondary/60 select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ticker-track flex gap-0 whitespace-nowrap", style: {
    width: "max-content"
  }, children: doubled.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-3 px-6 text-sm font-bold text-muted-foreground uppercase tracking-widest", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-accent inline-block" }),
    item[lang]
  ] }, i)) }) });
}
function HeroSection({
  t,
  lang
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-[92vh] flex items-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "", className: "w-full h-full object-cover scale-105", style: {
        transition: "transform 8s ease-out"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-brand-blue-deep/98 via-brand-blue-deep/85 to-brand-blue-deep/20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "absolute inset-0 w-full h-full opacity-5", viewBox: "0 0 800 600", preserveAspectRatio: "xMidYMid slice", children: Array.from({
        length: 8
      }).map((_, row) => Array.from({
        length: 12
      }).map((_2, col) => /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: col * 70 - 10, y: row * 80 - 10, width: "60", height: "70", fill: "none", stroke: "white", strokeWidth: "0.5" }, `${row}-${col}`))) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-x relative z-10 py-24 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-anim-left max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[0.25em] mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-accent" }),
          t("hero.tag"),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.93] tracking-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-white/90", children: t("hero.title.1") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-white/90", children: t("hero.title.2") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-accent relative", children: [
            t("hero.title.3"),
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "absolute -bottom-2 left-0 w-full", height: "4", viewBox: "0 0 300 4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 2 Q150 0 300 2", stroke: "currentColor", strokeWidth: "2", fill: "none", strokeLinecap: "round" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-base sm:text-lg text-white/75 max-w-lg leading-relaxed font-sans", children: t("hero.sub") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-sm h-12 px-7 group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", children: [
            t("cta.services"),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "bg-white/5 border-white/30 text-white hover:bg-white hover:text-brand-blue-deep font-bold rounded-sm h-12 px-7 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: t("cta.contact") }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-anim-right hidden lg:flex flex-col gap-4", children: [{
        v: "14+",
        k: "stats.years"
      }, {
        v: "250+",
        k: "stats.projects"
      }, {
        v: "120+",
        k: "stats.clients"
      }].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-badge flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/15 rounded-lg px-6 py-4", style: {
        animationDelay: `${i * 0.3}s`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-black text-3xl text-accent", children: s.v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/70 uppercase tracking-widest font-sans", children: t(s.k) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative ml-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pulse-ring absolute inset-0 rounded-full bg-accent/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-full bg-accent" })
        ] })
      ] }, s.k)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-gradient-to-b from-transparent to-white/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "8", viewBox: "0 0 14 8", fill: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M1 1l6 6 6-6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
    ] })
  ] });
}
function CompanyVideoSection({
  lang
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 bg-brand-blue-deep text-white relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 opacity-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x relative grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: lang === "fr" ? "Nos activités en vidéo" : "Our work in video" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-5xl leading-tight text-balance", children: lang === "fr" ? "Découvrez notre savoir-faire en construction métallique" : "Discover our expertise in steel construction" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-white/75 leading-relaxed font-sans", children: lang === "fr" ? "De la conception à la fabrication, jusqu’à la pose sur chantier, cette vidéo présente les activités et l’engagement de Futura Construction SARL pour des ouvrages solides, modernes et durables." : "From design and fabrication to on-site installation, this video presents Futura Construction SARL’s activities and commitment to strong, modern, and durable structures." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-28 rounded-full bg-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-accent/50 blur-sm animate-pulse" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-full bg-accent animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-16 bg-white/20" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { delay: 150, className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-3 rounded-2xl bg-accent/25 blur-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("video", { className: "w-full aspect-video object-cover", src: futuraVideo, controls: true, muted: true, playsInline: true, preload: "metadata", poster: heroImg }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 bg-brand-blue-deep/80 backdrop-blur-sm border border-white/15 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full", children: "Futura Construction SARL" })
        ] })
      ] })
    ] })
  ] });
}
function Home() {
  const {
    t,
    lang
  } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalStyles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, { t, lang }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Ticker, { lang }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CompanyVideoSection, { lang }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { className: "text-center max-w-2xl mx-auto mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("services.tag") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl text-balance", children: t("services.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground font-sans", children: t("services.sub") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-5 gap-4", children: services.map((s, i) => {
        const Icon = ICONS[s.icon];
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FadeIn, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", hash: s.id, className: "service-card group bg-card border border-border p-7 text-center rounded-xl hover:border-accent/40 hover:bg-accent/5 transition-colors flex flex-col items-center h-full block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-14 w-14 grid place-items-center rounded-full bg-primary/8 text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 mb-4 group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm uppercase tracking-wider text-primary mb-2", children: s.title[lang] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed font-sans flex-1", children: s.short[lang] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-bold text-accent", children: [
            lang === "fr" ? "Voir" : "View",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
          ] }) })
        ] }) }, s.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: aboutImg, alt: "", loading: "lazy", className: "rounded-xl w-full aspect-[4/3] object-cover shadow-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-5 -right-5 bg-accent text-accent-foreground p-6 rounded-xl shadow-xl hidden sm:block hero-badge", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-black text-4xl", children: "14+" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest font-sans mt-1", children: t("stats.years") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 -left-4 h-20 w-20 border-t-2 border-l-2 border-accent rounded-tl-lg hidden sm:block" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { delay: 150, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("intro.tag") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl text-balance", children: t("intro.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed font-sans", children: t("intro.body") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-5", children: [{
          t: t("intro.mission.t"),
          b: t("intro.mission.b")
        }, {
          t: t("intro.vision.t"),
          b: t("intro.vision.b")
        }, {
          t: t("intro.values.t"),
          b: t("intro.values.b")
        }].map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 h-8 w-8 grid place-items-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-sm", children: it.t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground font-sans mt-0.5", children: it.b })
          ] })
        ] }, it.t)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-sm h-11 px-7 group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/about", children: [
          lang === "fr" ? "En savoir plus" : "Learn more",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" })
        ] }) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "brand-gradient text-white py-16 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "100%", height: "100%", viewBox: "0 0 400 120", preserveAspectRatio: "xMidYMid slice", children: Array.from({
        length: 20
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: i * 22, cy: 60, r: "40", fill: "none", stroke: "white", strokeWidth: "0.5" }, i)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-x relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center", children: [{
        v: 14,
        suffix: "+",
        k: "stats.years"
      }, {
        v: 250,
        suffix: "+",
        k: "stats.projects"
      }, {
        v: 120,
        suffix: "+",
        k: "stats.clients"
      }, {
        v: 50,
        suffix: "+",
        k: "stats.team"
      }].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeIn, { delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-black text-4xl sm:text-5xl stat-number", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { to: s.v, suffix: s.suffix }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest mt-2 text-white/70 font-sans", children: t(s.k) })
      ] }) }, s.k)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-28 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { className: "flex items-end justify-between flex-wrap gap-4 mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("projects.tag") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl text-balance", children: t("projects.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground font-sans", children: t("projects.sub") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "rounded-sm border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", children: [
          t("cta.allProjects"),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FadeIn, { delay: 100, className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCarousel, { lang }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6", children: projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeIn, { delay: i * 60, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project-card relative overflow-hidden rounded-lg aspect-video cursor-pointer group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: "", loading: "lazy", className: "absolute inset-0 w-full h-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-brand-blue-deep/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-white text-xs text-center px-2", children: p.title[lang] }) })
      ] }) }, p.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { className: "text-center max-w-2xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("articles.tag") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl text-balance", children: t("articles.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground font-sans", children: t("articles.sub") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: articles.slice(0, 3).map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeIn, { delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/articles/$slug", params: {
        slug: a.slug
      }, className: "group bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[16/10] overflow-hidden relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: a.image, alt: "", loading: "lazy", className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full font-sans", children: a.category[lang] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-3 font-sans", children: new Date(a.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg leading-snug group-hover:text-accent transition-colors flex-1", children: a.title[lang] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground line-clamp-2 font-sans", children: a.excerpt[lang] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent group-hover:gap-3 transition-all", children: [
            t("cta.readMore"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ] })
        ] })
      ] }) }, a.slug)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FadeIn, { className: "text-center mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "rounded-sm border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/articles", children: t("cta.allArticles") }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TeamSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-24 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 brand-gradient" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "100%", height: "100%", viewBox: "0 0 800 300", preserveAspectRatio: "xMidYMid slice", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "150", r: "200", fill: "none", stroke: "white", strokeWidth: "0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "700", cy: "150", r: "200", fill: "none", stroke: "white", strokeWidth: "0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "400", cy: "300", r: "250", fill: "none", stroke: "white", strokeWidth: "0.5" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-x relative text-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeIn, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-accent" }),
          lang === "fr" ? "Démarrons ensemble" : "Let's start together",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-5xl text-balance max-w-3xl mx-auto leading-tight", children: t("cta.global.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-white/75 max-w-xl mx-auto font-sans leading-relaxed", children: t("cta.global.sub") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap gap-4 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-sm h-12 px-8 group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", children: [
            t("cta.quote"),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "bg-white/5 border-white/30 text-white hover:bg-white hover:text-brand-blue-deep font-bold rounded-sm h-12 px-8 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", children: t("cta.services") }) })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Home as component
};
