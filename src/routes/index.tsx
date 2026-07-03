import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  PencilRuler,
  Hammer,
  HardHat,
  ClipboardCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import heroImg from "@/assets/hero-steel.jpg";
import aboutImg from "@/assets/boris.jpg";
import futuraVideo from "@/assets/futuravideo.mp4";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { services, projects, articles } from "@/lib/data";
import { SectionTag } from "@/components/SectionTag";
import { CountUp } from "@/components/CountUp";
import { TeamSection } from "@/components/TeamSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "futuraconstructionsarl" },
      {
        name: "description",
        content:
          "Spécialiste en construction métallique : conception, fabrication, pose et maîtrise d'œuvre. Demandez un devis.",
      },
    ],
  }),
  component: Home,
});

const ICONS = { Building2, PencilRuler, Hammer, HardHat, ClipboardCheck };

function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useFadeInOnScroll();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
      data-fade
    >
      {children}
    </div>
  );
}

function GlobalStyles() {
  useEffect(() => {
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

function ProjectCarousel({ lang }: { lang: "fr" | "en" }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = projects.length;

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setCurrent((idx + total) % total);

      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, total]
  );

  useEffect(() => {
    timerRef.current = setTimeout(() => goTo(current + 1), 4000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, goTo]);

  const prev = (current - 1 + total) % total;
  const cur = current;
  const next = (current + 1) % total;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <div
          className="project-card relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer opacity-50 hover:opacity-70 transition-opacity hidden sm:block"
          onClick={() => goTo(current - 1)}
        >
          <img
            src={projects[prev].image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/40 to-transparent" />
        </div>

        <div
          className="project-card relative overflow-hidden rounded-xl aspect-[3/4] cursor-pointer ring-2 ring-accent ring-offset-2 ring-offset-background sm:scale-105 sm:z-10"
          style={{ transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <img
            src={projects[cur].image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transition: "opacity 0.4s", opacity: isTransitioning ? 0.7 : 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/30 to-transparent" />
          <div className="overlay absolute inset-0 bg-accent/10" style={{ opacity: 0 }} />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="text-xs uppercase tracking-widest text-accent font-bold mb-1 font-sans">
              {projects[cur].type[lang]}
            </div>
            <div className="font-display font-bold text-xl leading-snug">
              {projects[cur].title[lang]}
            </div>
          </div>

          <div className="absolute top-4 right-4 flex gap-1.5">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                }}
                className="rounded-full transition-all"
                style={{
                  width: i === current ? "20px" : "6px",
                  height: "6px",
                  background:
                    i === current ? "oklch(0.50 0.20 25)" : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
        </div>

        <div
          className="project-card relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer opacity-50 hover:opacity-70 transition-opacity hidden sm:block"
          onClick={() => goTo(current + 1)}
        >
          <img
            src={projects[next].image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/40 to-transparent" />
        </div>
      </div>

      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 grid place-items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-accent hover:border-accent transition-colors"
        aria-label="Précédent"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 grid place-items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-accent hover:border-accent transition-colors"
        aria-label="Suivant"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function Ticker({ lang }: { lang: "fr" | "en" }) {
  const items = [
    { fr: "Construction métallique", en: "Steel construction" },
    { fr: "Conception & ingénierie", en: "Design & engineering" },
    { fr: "Fabrication sur mesure", en: "Custom fabrication" },
    { fr: "Maîtrise d'œuvre", en: "Project management" },
    { fr: "10+ ans d'expérience", en: "10+ years of experience" },
    { fr: "250+ projets livrés", en: "250+ projects delivered" },
    { fr: "Douala, Cameroun", en: "Douala, Cameroon" },
    { fr: "Qualité & sécurité", en: "Quality & safety" },
  ];

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border py-3 bg-secondary/60 select-none">
      <div className="ticker-track flex gap-0 whitespace-nowrap" style={{ width: "max-content" }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-6 text-sm font-bold text-muted-foreground uppercase tracking-widest"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
            {item[lang]}
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroSection({ t, lang }: { t: (k: any) => string; lang: "fr" | "en" }) {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          className="w-full h-full object-cover scale-105"
          style={{ transition: "transform 8s ease-out" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-deep/98 via-brand-blue-deep/85 to-brand-blue-deep/20" />

        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 12 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={col * 70 - 10}
                y={row * 80 - 10}
                width="60"
                height="70"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            ))
          )}
        </svg>
      </div>

      <div className="container-x relative z-10 py-24 text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="hero-anim-left max-w-xl">
            <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[0.25em] mb-6">
              <span className="h-px w-10 bg-accent" />
              {t("hero.tag")}
              <span className="h-px w-10 bg-accent" />
            </div>

            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.93] tracking-tight">
              <span className="block text-white/90">{t("hero.title.1")}</span>
              <span className="block text-white/90">{t("hero.title.2")}</span>
              <span className="block text-accent relative">
                {t("hero.title.3")}
                <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 300 4">
                  <path
                    d="M0 2 Q150 0 300 2"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-8 text-base sm:text-lg text-white/75 max-w-lg leading-relaxed font-sans">
              {t("hero.sub")}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-sm h-12 px-7 group"
              >
                <Link to="/services">
                  {t("cta.services")}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/5 border-white/30 text-white hover:bg-white hover:text-brand-blue-deep font-bold rounded-sm h-12 px-7 backdrop-blur-sm"
              >
                <Link to="/contact">{t("cta.contact")}</Link>
              </Button>
            </div>
          </div>

          <div className="hero-anim-right hidden lg:flex flex-col gap-4">
            {[
              { v: "14+", k: "stats.years" },
              { v: "250+", k: "stats.projects" },
              { v: "120+", k: "stats.clients" },
            ].map((s, i) => (
              <div
                key={s.k}
                className="hero-badge flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/15 rounded-lg px-6 py-4"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="font-display font-black text-3xl text-accent">{s.v}</div>
                <div className="text-sm text-white/70 uppercase tracking-widest font-sans">
                  {t(s.k as never)}
                </div>

                <div className="relative ml-auto">
                  <div className="pulse-ring absolute inset-0 rounded-full bg-accent/30" />
                  <div className="h-3 w-3 rounded-full bg-accent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <div className="h-8 w-px bg-gradient-to-b from-transparent to-white/40" />
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
          <path
            d="M1 1l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}

function CompanyVideoSection({ lang }: { lang: "fr" | "en" }) {
  return (
    <section className="py-24 bg-brand-blue-deep text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white blur-3xl" />
      </div>

      <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
        <FadeIn>
          <SectionTag>
            {lang === "fr" ? "Nos activités en vidéo" : "Our work in video"}
          </SectionTag>

          <h2 className="font-display font-black text-3xl sm:text-5xl leading-tight text-balance">
            {lang === "fr"
              ? "Découvrez notre savoir-faire en construction métallique"
              : "Discover our expertise in steel construction"}
          </h2>

          <p className="mt-5 text-white/75 leading-relaxed font-sans">
            {lang === "fr"
              ? "De la conception à la fabrication, jusqu’à la pose sur chantier, cette vidéo présente les activités et l’engagement de Futura Construction SARL pour des ouvrages solides, modernes et durables."
              : "From design and fabrication to on-site installation, this video presents Futura Construction SARL’s activities and commitment to strong, modern, and durable structures."}
          </p>

          
      <div className="mt-10 flex items-center gap-4">
          <div className="relative">
           <div className="h-1.5 w-28 rounded-full bg-accent" />

           <div className="absolute inset-0 rounded-full bg-accent/50 blur-sm animate-pulse" />
          </div>

          <div className="h-3 w-3 rounded-full bg-accent animate-pulse" />

          <div className="h-px w-16 bg-white/20" />
      </div>
        </FadeIn>

        <FadeIn delay={150} className="relative">
          <div className="absolute -inset-3 rounded-2xl bg-accent/25 blur-xl" />

          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl">
            <video
              className="w-full aspect-video object-cover"
              src={futuraVideo}
              controls
              muted
              playsInline
              preload="metadata"
              poster={heroImg}
            />

            <div className="absolute top-4 left-4 bg-brand-blue-deep/80 backdrop-blur-sm border border-white/15 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              Futura Construction SARL
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Home() {
  const { t, lang } = useI18n();

  return (
    <>
      <GlobalStyles />

      <HeroSection t={t} lang={lang} />

      <Ticker lang={lang} />

      <CompanyVideoSection lang={lang} />

      <section className="py-24 bg-secondary/40">
        <div className="container-x">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <SectionTag>{t("services.tag")}</SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-balance">
              {t("services.title")}
            </h2>
            <p className="mt-3 text-muted-foreground font-sans">{t("services.sub")}</p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((s, i) => {
              const Icon = ICONS[s.icon as keyof typeof ICONS];

              return (
                <FadeIn key={s.id} delay={i * 80}>
                  <Link
                    to="/services"
                    hash={s.id}
                    className="service-card group bg-card border border-border p-7 text-center rounded-xl hover:border-accent/40 hover:bg-accent/5 transition-colors flex flex-col items-center h-full block"
                  >
                    <div className="mx-auto h-14 w-14 grid place-items-center rounded-full bg-primary/8 text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 mb-4 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-primary mb-2">
                      {s.title[lang]}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed font-sans flex-1">
                      {s.short[lang]}
                    </p>

                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-accent">
                        {lang === "fr" ? "Voir" : "View"} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn className="relative">
            <img
              src={aboutImg}
              alt=""
              loading="lazy"
              className="rounded-xl w-full aspect-[4/3] object-cover shadow-2xl"
            />

            <div className="absolute -bottom-5 -right-5 bg-accent text-accent-foreground p-6 rounded-xl shadow-xl hidden sm:block hero-badge">
              <div className="font-display font-black text-4xl">14+</div>
              <div className="text-xs uppercase tracking-widest font-sans mt-1">
                {t("stats.years")}
              </div>
            </div>

            <div className="absolute -top-4 -left-4 h-20 w-20 border-t-2 border-l-2 border-accent rounded-tl-lg hidden sm:block" />
          </FadeIn>

          <FadeIn delay={150}>
            <SectionTag>{t("intro.tag")}</SectionTag>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-balance">
              {t("intro.title")}
            </h2>

            <p className="mt-4 text-muted-foreground leading-relaxed font-sans">
              {t("intro.body")}
            </p>

            <div className="mt-8 space-y-5">
              {[
                { t: t("intro.mission.t"), b: t("intro.mission.b") },
                { t: t("intro.vision.t"), b: t("intro.vision.b") },
                { t: t("intro.values.t"), b: t("intro.values.b") },
              ].map((it) => (
                <div key={it.t} className="flex gap-4 group">
                  <div className="flex-shrink-0 h-8 w-8 grid place-items-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="font-display font-bold text-sm">{it.t}</div>
                    <div className="text-sm text-muted-foreground font-sans mt-0.5">
                      {it.b}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-sm h-11 px-7 group"
              >
                <Link to="/about">
                  {lang === "fr" ? "En savoir plus" : "Learn more"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="brand-gradient text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 20 }).map((_, i) => (
              <circle
                key={i}
                cx={i * 22}
                cy={60}
                r="40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            ))}
          </svg>
        </div>

        <div className="container-x relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { v: 14, suffix: "+", k: "stats.years" },
            { v: 250, suffix: "+", k: "stats.projects" },
            { v: 120, suffix: "+", k: "stats.clients" },
            { v: 50, suffix: "+", k: "stats.team" },
          ].map((s, i) => (
            <FadeIn key={s.k} delay={i * 100}>
              <div className="py-2">
                <div className="font-display font-black text-4xl sm:text-5xl stat-number">
                  <CountUp to={s.v} suffix={s.suffix} />
                </div>
                <div className="text-xs uppercase tracking-widest mt-2 text-white/70 font-sans">
                  {t(s.k as never)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-28 overflow-hidden">
        <div className="container-x">
          <FadeIn className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div className="max-w-xl">
              <SectionTag>{t("projects.tag")}</SectionTag>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-balance">
                {t("projects.title")}
              </h2>
              <p className="mt-3 text-muted-foreground font-sans">{t("projects.sub")}</p>
            </div>

            <Button
              asChild
              variant="outline"
              className="rounded-sm border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold group"
            >
              <Link to="/services">
                {t("cta.allProjects")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </FadeIn>

          <FadeIn delay={100} className="relative">
            <ProjectCarousel lang={lang} />
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {projects.map((p, i) => (
              <FadeIn key={p.id} delay={i * 60}>
                <div className="project-card relative overflow-hidden rounded-lg aspect-video cursor-pointer group">
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-blue-deep/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="font-display font-bold text-white text-xs text-center px-2">
                      {p.title[lang]}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/40">
        <div className="container-x">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <SectionTag>{t("articles.tag")}</SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-balance">
              {t("articles.title")}
            </h2>
            <p className="mt-3 text-muted-foreground font-sans">{t("articles.sub")}</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((a, i) => (
              <FadeIn key={a.slug} delay={i * 100}>
                <Link
                  to="/articles/$slug"
                  params={{ slug: a.slug }}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={a.image}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute top-3 left-3">
                      <span className="bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full font-sans">
                        {a.category[lang]}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs text-muted-foreground mb-3 font-sans">
                      {new Date(a.date).toLocaleDateString(
                        lang === "fr" ? "fr-FR" : "en-GB",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>

                    <h3 className="font-display font-bold text-lg leading-snug group-hover:text-accent transition-colors flex-1">
                      {a.title[lang]}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 font-sans">
                      {a.excerpt[lang]}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent group-hover:gap-3 transition-all">
                      {t("cta.readMore")} <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              className="rounded-sm border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold"
            >
              <Link to="/articles">{t("cta.allArticles")}</Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      <TeamSection />

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 brand-gradient" />

        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice">
            <circle cx="100" cy="150" r="200" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="700" cy="150" r="200" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="400" cy="300" r="250" fill="none" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="container-x relative text-center text-white">
          <FadeIn>
            <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="h-px w-8 bg-accent" />
              {lang === "fr" ? "Démarrons ensemble" : "Let's start together"}
              <span className="h-px w-8 bg-accent" />
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-balance max-w-3xl mx-auto leading-tight">
              {t("cta.global.title")}
            </h2>

            <p className="mt-5 text-white/75 max-w-xl mx-auto font-sans leading-relaxed">
              {t("cta.global.sub")}
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-sm h-12 px-8 group"
              >
                <Link to="/contact">
                  {t("cta.quote")}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/5 border-white/30 text-white hover:bg-white hover:text-brand-blue-deep font-bold rounded-sm h-12 px-8 backdrop-blur-sm"
              >
                <Link to="/services">{t("cta.services")}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}