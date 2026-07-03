import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Target, Eye, Heart, Shield, Zap, Quote, ArrowRight, CheckCircle2 } from "lucide-react";
import aboutImg from "@/assets/hh.jpg";
import projectImg from "@/assets/project-1.jpg";
import heroBg from "@/assets/hero-steel.jpg";
import { useI18n } from "@/lib/i18n";
import { SectionTag } from "@/components/SectionTag";
import { Button } from "@/components/ui/button";
import { TeamSection } from "@/components/TeamSection";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "futuraconstructionsarl" },
      { name: "description", content: "Découvrez l'histoire, la mission, la vision et les valeurs de Futura Construction." },
    ],
  }),
  component: About,
});

/* ── Styles globaux injectés une seule fois ── */
function AboutStyles() {
  useEffect(() => {
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

/* ── Hook fade au scroll ── */
function useFade(attr = "data-fade") {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute(attr, "");
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [attr]);
  return ref;
}

function FadeIn({ children, delay = 0, dir = "up", className = "" }: {
  children: React.ReactNode; delay?: number; dir?: "up" | "left" | "right"; className?: string;
}) {
  const attr = dir === "left" ? "data-fade-left" : dir === "right" ? "data-fade-right" : "data-fade";
  const ref = useFade(attr);
  return (
    <div ref={ref} className={className} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════
   PAGE HERO
════════════════════════════════════════ */
export function PageHero({
  title, sub, crumb, bgImage = heroBg,
}: { title: string; sub: string; crumb: string; bgImage?: string }) {
  const { t } = useI18n();
  return (
    <section className="relative text-white py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img src={bgImage} alt="" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-deep/98 via-brand-blue-deep/88 to-brand-blue-deep/50" />
        {/* Motif géométrique */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 900 400" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 10 }).map((_, r) =>
            Array.from({ length: 14 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={c * 68 - 10} y={r * 52 - 10} width="58" height="44"
                fill="none" stroke="white" strokeWidth="0.4" />
            ))
          )}
        </svg>
      </div>
      <div className="container-x relative z-10">
        {/* Fil d'Ariane */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-bold mb-5">
          <span className="h-px w-8 bg-accent" />
          {t("nav.home")}
          <span className="text-white/40">/</span>
          {crumb}
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-balance max-w-3xl leading-tight animate-fade-up">
          {title}
        </h1>
        <p className="mt-5 text-white/75 max-w-2xl font-sans leading-relaxed">{sub}</p>
        {/* Ligne déco */}
        <div className="mt-8 flex items-center gap-3">
          <span className="h-0.5 w-16 bg-accent rounded-full" />
          <span className="h-0.5 w-8 bg-white/20 rounded-full" />
          <span className="h-0.5 w-4 bg-white/10 rounded-full" />
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   CTA BANNER
════════════════════════════════════════ */
export function CTABanner() {
  const { t } = useI18n();
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 brand-gradient" />
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid slice">
          <circle cx="100" cy="100" r="200" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="700" cy="100" r="200" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="400" cy="250" r="250" fill="none" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="container-x relative flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-white max-w-xl">
          <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <span className="h-px w-8 bg-accent" />
            {t("nav.contact")}
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl">{t("cta.global.title")}</h3>
          <p className="mt-2 text-white/75 font-sans">{t("cta.global.sub")}</p>
        </div>
        <Button asChild size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-sm h-12 px-8 shrink-0 group">
          <Link to="/contact">
            {t("cta.quote")}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   COMPOSANT PRINCIPAL
════════════════════════════════════════ */
function About() {
  const { t, lang } = useI18n();

  return (
    <>
      <AboutStyles />
      <PageHero title={t("about.page.title")} sub={t("about.page.sub")} crumb={t("nav.about")} />

      {/* ── HISTOIRE ── */}
      <section className="py-28">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn dir="left" className="relative img-zoom">
            <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={aboutImg} alt="" loading="lazy" className="w-full h-full object-cover" />
              {/* Overlay dégradé subtil */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-deep/30 to-transparent" />
            </div>
            {/* Badge flottant */}
            <div className="absolute -bottom-5 -right-5 bg-accent text-accent-foreground px-6 py-5 rounded-xl shadow-xl hidden sm:block hero-float">
              <div className="font-display font-black text-3xl">2012</div>
              <div className="text-xs uppercase tracking-widest font-sans mt-0.5">
                {lang === "fr" ? "Fondée" : "Founded"}
              </div>
            </div>
            {/* Angle décoratif */}
            <div className="absolute -top-4 -left-4 h-16 w-16 border-t-2 border-l-2 border-accent rounded-tl-lg hidden sm:block" />
          </FadeIn>

          <FadeIn dir="right" delay={120}>
            <SectionTag>{t("about.history.t")}</SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-balance">{t("about.history.t")}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed font-sans">{t("about.history.b")}</p>
            {/* Chiffres rapides */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { v: "14+", l: lang === "fr" ? "Années" : "Years" },
                { v: "250+", l: lang === "fr" ? "Projets" : "Projects" },
                { v: "120+", l: lang === "fr" ? "Clients" : "Clients" },
              ].map((s) => (
                <div key={s.l} className="text-center p-4 bg-secondary/60 rounded-lg border border-border">
                  <div className="font-display font-black text-2xl text-accent">{s.v}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1 font-sans">{s.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MISSION / VISION / VALEURS ── */}
      <section className="py-24 bg-secondary/40">
        <div className="container-x">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <SectionTag>{t("about.values.tag")}</SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl">{t("about.values.title")}</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: Target, label: t("intro.mission.t"), body: t("intro.mission.b"), delay: 0 },
              { Icon: Eye,    label: t("intro.vision.t"),  body: t("intro.vision.b"),  delay: 100 },
              { Icon: Heart,  label: t("intro.values.t"),  body: t("intro.values.b"),  delay: 200 },
            ].map(({ Icon, label, body, delay }) => (
              <FadeIn key={label} delay={delay}>
                <div className="value-card group bg-card border border-border rounded-xl p-8 hover:border-accent/50 h-full flex flex-col">
                  <div className="h-14 w-14 grid place-items-center rounded-xl bg-primary/8 text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans flex-1">{body}</p>
                  <div className="mt-5 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-500 rounded-full" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENTS ── */}
      <section className="py-28">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn dir="left" delay={120} className="order-2 lg:order-1">
            <SectionTag>{t("about.commit.t")}</SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl">{t("about.commit.t")}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed font-sans">{t("about.commit.b")}</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { Icon: Shield, label: lang === "fr" ? "Sécurité" : "Safety",     color: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
                { Icon: Award,  label: lang === "fr" ? "Qualité" : "Quality",     color: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
                { Icon: Zap,    label: lang === "fr" ? "Innovation" : "Innovation", color: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300" },
                { Icon: Heart,  label: lang === "fr" ? "Engagement" : "Commitment", color: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300" },
              ].map(({ Icon, label, color }) => (
                <div key={label}
                  className={`commit-pill flex items-center gap-3 p-4 rounded-xl border border-border hover:border-accent/40 bg-card`}>
                  <div className={`h-10 w-10 grid place-items-center rounded-lg ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-display font-bold text-sm">{label}</span>
                  <CheckCircle2 className="h-4 w-4 text-accent ml-auto opacity-60" />
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn dir="right" className="order-1 lg:order-2 relative img-zoom">
            <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={projectImg} alt="" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tl from-brand-blue-deep/30 to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 h-16 w-16 border-t-2 border-r-2 border-accent rounded-tr-lg hidden sm:block" />
          </FadeIn>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-24 bg-secondary/40 overflow-hidden">
        <div className="container-x">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <SectionTag>{t("about.timeline.tag")}</SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl">{t("about.timeline.title")}</h2>
          </FadeIn>

          <div className="relative max-w-3xl mx-auto">
            {/* Ligne centrale */}
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

            {[
              { y: "2012", t: lang === "fr" ? "Création de Futura Construction" : "Futura Construction founded",      b: lang === "fr" ? "Démarrage de nos activités à Douala." : "Starting our activities in Douala." },
              { y: "2017", t: lang === "fr" ? "Premier hangar >1 000 m²" : "First hangar >1,000 m²",                  b: lang === "fr" ? "Étape majeure dans notre montée en compétence." : "A major milestone in our growth." },
              { y: "2020", t: lang === "fr" ? "Ouverture de l'atelier" : "Workshop opening",                           b: lang === "fr" ? "Internalisation de la chaîne de production." : "Bringing production in-house." },
              { y: "2024", t: lang === "fr" ? "Plus de 200 projets livrés" : "250+ projects delivered",                b: lang === "fr" ? "Une référence en construction métallique au Cameroun." : "A benchmark in steel construction in Cameroon." },
              { y: "2026", t: lang === "fr" ? "Plus de 250 projets livrés" : "250+ projects delivered",                b: lang === "fr" ? "Une référence en construction métallique au Cameroun." : "A benchmark in steel construction in Cameroon." },

            ].map((item, i) => {
              const isRight = i % 2 === 1;
              return (
                <FadeIn key={item.y} delay={i * 120} className="relative pl-16 md:pl-0 mb-12 last:mb-0 md:grid md:grid-cols-2 md:gap-10 items-center">
                  {/* Dot */}
                  <TimelineDot />

                  {/* Année */}
                  <div className={`${isRight ? "md:order-2 md:text-left" : "md:text-right"}`}>
                    <div className="inline-flex flex-col items-start md:items-end">
                      <div className="font-display font-black text-4xl text-accent leading-none">{item.y}</div>
                      <div className="h-0.5 w-12 bg-accent mt-1 rounded-full" />
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className={`mt-3 md:mt-0 ${isRight ? "md:order-1" : ""}`}>
                    <div className="bg-card border border-border rounded-xl p-5 hover:border-accent/50 hover:shadow-lg transition-all">
                      <h3 className="font-display font-bold text-lg">{item.t}</h3>
                      <p className="text-sm text-muted-foreground mt-1 font-sans">{item.b}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ÉQUIPE ── */}
      <TeamSection />

      {/* ── TÉMOIGNAGES ── */}
      <section className="py-24 bg-secondary/40">
        <div className="container-x">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <SectionTag>{t("about.testi.tag")}</SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl">{t("about.testi.title")}</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "M. Tchoumi", r: lang === "fr" ? "Directeur logistique" : "Logistics Director",   q: lang === "fr" ? "Un travail soigné, livré dans les délais. Une équipe vraiment professionnelle." : "Careful work, delivered on time. A truly professional team." },
              { n: "Mme Kana",   r: lang === "fr" ? "Responsable projet" : "Project Manager",         q: lang === "fr" ? "Très bonne communication tout au long du chantier. Je recommande vivement." : "Great communication throughout the project. Highly recommended." },
              { n: "M. Ndong",   r: lang === "fr" ? "Industriel" : "Industrialist",                   q: lang === "fr" ? "Qualité de fabrication impeccable et finitions à la hauteur de nos exigences." : "Impeccable fabrication quality and finishes that met our high standards." },
            ].map((item, i) => (
              <FadeIn key={item.n} delay={i * 100}>
                <div className="testi-card group bg-card border border-border rounded-xl p-7 hover:border-accent/50 h-full flex flex-col">
                  {/* Guillemets décoratifs */}
                  <div className="h-10 w-10 grid place-items-center rounded-lg bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Quote className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic font-sans flex-1">
                    "{item.q}"
                  </p>
                  <div className="mt-5 pt-5 border-t border-border flex items-center gap-3">
                    {/* Avatar initiales */}
                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary grid place-items-center font-display font-bold text-sm shrink-0">
                      {item.n.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm">{item.n}</div>
                      <div className="text-xs text-muted-foreground font-sans">{item.r}</div>
                    </div>
                    {/* Étoiles */}
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="h-3.5 w-3.5 fill-accent" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

/* ── Dot timeline animé ── */
function TimelineDot() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="timeline-dot absolute left-5 md:left-1/2 top-4 -translate-x-1/2 h-5 w-5 rounded-full bg-accent border-4 border-background shadow-md z-10"
    />
  );
}