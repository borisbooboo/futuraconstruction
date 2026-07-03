import { createFileRoute } from "@tanstack/react-router";
import { Building2, PencilRuler, Hammer, HardHat, ClipboardCheck, Check, MessageCircle, FileText, Cog, Truck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { getSiteServices } from "@/lib/services";
import { PageHero, CTABanner } from "./about";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import servicesBg from "@/assets/project-2.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTag } from "@/components/SectionTag";

export const Route = createFileRoute("/services")({
  loader: () => getSiteServices(),
  head: () => ({
    meta: [
      { title: "futuraconstructionsarl" },
      { name: "description", content: "Cinq expertises : construction métallique, conception, fabrication, pose et maîtrise d'œuvre." },
    ],
  }),
  component: ServicesPage,
});

const ICONS = { Building2, PencilRuler, Hammer, HardHat, ClipboardCheck };

function ServicesPage() {
  const { t, lang } = useI18n();
  const services = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    setGalleryIndex(0);
    if (!services[active]?.gallery.length) return;

    const interval = window.setInterval(() => {
      setGalleryIndex((current) => {
        const images = services[active].gallery;
        return (current + 1) % images.length;
      });
    }, 3200);

    return () => window.clearInterval(interval);
  }, [active, services]);

  useEffect(() => {
    if (active >= services.length) setActive(0);
  }, [active, services.length]);

  const ActiveIcon = (iconName: string) => {
    const Icon = ICONS[iconName as keyof typeof ICONS];
    return <Icon className="h-8 w-8 text-accent" />;
  };

  return (
    <>
      <PageHero title={t("services.page.title")} sub={t("services.page.sub")} crumb={t("nav.services")} bgImage={servicesBg} />

      <section className="py-20">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Left: services list (sticky) */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <SectionTag>{t("services.tag")}</SectionTag>
                <h2 className="font-display font-black text-3xl sm:text-4xl leading-tight">{t("services.title")}</h2>
                <p className="text-muted-foreground mt-4 max-w-lg leading-7">{t("services.sub")}</p>
                <div className="mt-6 rounded-3xl border border-border bg-accent/5 p-6 shadow-sm text-sm leading-7 text-muted-foreground">
                  <p className="font-semibold text-accent mb-3">Des services complets, conçus pour faire de votre projet une réussite claire, rapide et rentable.</p>
                  <p>Nous accompagnons chaque étape : étude technique, fabrication maîtrisée, installation sûre. Votre chantier avance plus vite, plus propre et sans mauvaise surprise.</p>
                </div>

                <div className="mt-6 space-y-3">
                  {services.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setActive(i)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 ${i === active ? "bg-accent/10 border-accent shadow-md" : "bg-card border-border hover:border-accent/40"}`}
                    >
                      <div className="h-12 w-12 grid place-items-center rounded-lg bg-accent/10 text-accent">
                        {ActiveIcon(s.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="font-display font-bold">{s.title[lang]}</div>
                        <div className="text-sm text-muted-foreground mt-1">{s.short[lang]}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right: active service detail */}
            <div className="lg:col-span-8">
              <div className="rounded-[2rem] overflow-hidden border border-border bg-card shadow-[0_24px_90px_-40px_rgba(0,0,0,0.18)]">
                <div className="bg-accent/5 p-8">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="h-20 w-20 grid place-items-center rounded-3xl bg-accent/10 text-accent">
                        {ActiveIcon(services[active].icon)}
                      </div>
                      <div>
                        <h3 className="font-display font-black text-3xl sm:text-4xl leading-tight">{services[active].title[lang]}</h3>
                        <p className="text-base text-muted-foreground mt-3 max-w-2xl leading-7">{services[active].long[lang]}</p>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground shadow-sm transition hover:shadow-md">{t("cta.quote")}</a>
                    </div>
                  </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] p-8">
                  <div className="space-y-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button type="button" className="group relative block overflow-hidden rounded-[2rem] border border-border bg-muted shadow-inner focus:outline-none focus:ring-2 focus:ring-accent/50">
                          <img
                            src={services[active].gallery[galleryIndex]}
                            alt={`${services[active].title[lang]} ${galleryIndex + 1}`}
                            className="h-[460px] w-full object-cover transition duration-700 ease-in-out group-hover:scale-105"
                          />
                          <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/35 to-transparent px-4 pb-4">
                            <span className="rounded-full bg-black/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">Cliquez pour agrandir</span>
                          </div>
                        </button>
                      </DialogTrigger>

                      <DialogContent className="max-w-[90vw] p-0 overflow-hidden bg-transparent shadow-none sm:rounded-none">
                        <img
                          src={services[active].gallery[galleryIndex]}
                          alt={`${services[active].title[lang]} ${galleryIndex + 1}`}
                          className="max-h-[85vh] w-full object-contain bg-black"
                        />
                      </DialogContent>
                    </Dialog>

                    <div className="flex items-center justify-between text-sm uppercase tracking-[0.24em] text-muted-foreground">
                      <span>Visuel du service</span>
                      <span>{galleryIndex + 1}/{services[active].gallery.length}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {services[active].gallery.map((src, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setGalleryIndex(index)}
                          className={`overflow-hidden rounded-3xl border transition duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 ${galleryIndex === index ? "border-accent shadow-lg" : "border-border"}`}
                        >
                          <img
                            src={src}
                            alt={`Miniature ${index + 1} de ${services[active].title[lang]}`}
                            className="h-24 w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-3xl border border-border bg-accent/5 p-6 text-sm leading-7 text-muted-foreground">
                      <p className="font-semibold text-accent">Une approche orientée résultats et sérénité.</p>
                      <p>Chaque service est structuré pour optimiser les coûts et réduire les délais : étude précise, fabrication traçable, pose maîtrisée. Le tout avec un seul interlocuteur technique.</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-4">Ce que nous livrons</h4>
                      <ul className="space-y-3">
                        {services[active].bullets[lang].map((b: string) => (
                          <li key={b} className="flex items-start gap-3">
                            <Check className="mt-1 h-5 w-5 text-accent" />
                            <span className="text-sm text-muted-foreground">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                      <p className="text-sm font-semibold">Pourquoi choisir Futura ?</p>
                      <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                        <li>+120 projets livrés avec une qualité béton.</li>
                        <li>Démarches techniques et suivi de chantier sans stress.</li>
                        <li>Solutions sur mesure pour l’industrie, le commerce et l’agroalimentaire.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-secondary/40">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionTag>{t("services.process.tag")}</SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl">{t("services.process.title")}</h2>
            <p className="mt-3 text-muted-foreground">{t("services.process.sub")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: MessageCircle, t: "Échange", b: "Compréhension de votre besoin et de vos contraintes." },
              { Icon: FileText, t: "Étude", b: "Conception, plans techniques et devis détaillé." },
              { Icon: Cog, t: "Fabrication", b: "Production en atelier avec contrôle qualité." },
              { Icon: Truck, t: "Livraison", b: "Pose sur site et réception de l'ouvrage." },
            ].map((p, i) => (
              <div key={p.t} className="relative bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors">
                <div className="absolute -top-3 -right-3 h-10 w-10 grid place-items-center rounded-full bg-accent text-accent-foreground font-display font-black text-sm">0{i + 1}</div>
                <p.Icon className="h-8 w-8 text-accent mb-3" />
                <h3 className="font-display font-bold text-lg">{p.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container-x max-w-3xl">
          <div className="text-center mb-10">
            <SectionTag>{t("services.faq.tag")}</SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl">{t("services.faq.title")}</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Quels types de bâtiments réalisez-vous ?", a: "Hangars industriels, entrepôts, bâtiments à étages, ateliers, passerelles et ouvrages spéciaux sur mesure." },
              { q: "Quel est le délai moyen d'un projet ?", a: "De 6 à 16 semaines selon la complexité, incluant la conception, la fabrication et la pose." },
              { q: "Travaillez-vous en dehors de Douala ?", a: "Oui, nous intervenons sur l'ensemble du territoire camerounais et dans la sous-région CEMAC." },
              { q: "Proposez-vous un service après-vente ?", a: "Oui, nous assurons un suivi technique et des prestations de maintenance après livraison." },
            ].map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-display font-bold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
