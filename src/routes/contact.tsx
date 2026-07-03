import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send, Award, Users, Zap, Shield, Navigation } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { COMPANY } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionTag } from "@/components/SectionTag";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import contactBg from "@/assets/project-4.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "futuraconstructionsarl" },
      { name: "description", content: "Contactez Futura Construction à Douala, Ndokoti. Tél : +237 692 821 339." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  subject: z.string().trim().min(2, "Objet requis").max(150),
  message: z.string().trim().min(5, "Message requis").max(2000),
});

const COMPANY_COORDS = { lat: 4.0571, lng: 9.7223 };

const MARKETING_LINES = [
  "Conception, fabrication et pose de structures métalliques sur mesure.",
  "Des chantiers livrés dans les délais, partout au Cameroun.",
  "Plus de 10 ans d'expertise au service de vos projets.",
  "Devis gratuit sous 48h, sans engagement.",
  "Hangars, charpentes, ossatures : notre savoir-faire à votre service.",
];

function useTypewriter(text: string, opts?: { typeSpeed?: number; eraseSpeed?: number; pauseTime?: number }) {
  const { typeSpeed = 45, eraseSpeed = 25, pauseTime = 1800 } = opts || {};
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;
    let erasing = false;

    const tick = () => {
      if (!erasing) {
        i++;
        setDisplay(text.slice(0, i));
        if (i >= text.length) {
          erasing = true;
          timeout = setTimeout(tick, pauseTime);
          return;
        }
        timeout = setTimeout(tick, typeSpeed);
      } else {
        i--;
        setDisplay(text.slice(0, i));
        if (i <= 0) {
          erasing = false;
          timeout = setTimeout(tick, 400);
          return;
        }
        timeout = setTimeout(tick, eraseSpeed);
      }
    };

    timeout = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timeout);
  }, [text, typeSpeed, eraseSpeed, pauseTime]);

  return display;
}

function useTypewriterCycle(lines: string[], opts?: { typeSpeed?: number; eraseSpeed?: number; pauseTime?: number }) {
  const { typeSpeed = 45, eraseSpeed = 25, pauseTime = 1800 } = opts || {};
  const [display, setDisplay] = useState("");
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lines.length === 0) return;

    const text = lines[lineIndex % lines.length];
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;
    let erasing = false;

    const tick = () => {
      if (!erasing) {
        i++;
        setDisplay(text.slice(0, i));
        if (i >= text.length) {
          erasing = true;
          timeout = setTimeout(tick, pauseTime);
          return;
        }
        timeout = setTimeout(tick, typeSpeed);
      } else {
        i--;
        setDisplay(text.slice(0, i));
        if (i <= 0) {
          timeout = setTimeout(() => setLineIndex((idx) => idx + 1), 400);
          return;
        }
        timeout = setTimeout(tick, eraseSpeed);
      }
    };

    timeout = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timeout);
  }, [lineIndex, lines, typeSpeed, eraseSpeed, pauseTime]);

  return display;
}

function ContactPage() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const animatedSub = useTypewriter(t("contact.page.sub"));
  const animatedMarketing = useTypewriterCycle(MARKETING_LINES, {
    typeSpeed: 40,
    eraseSpeed: 20,
    pauseTime: 2200,
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const res = schema.safeParse(form);

    if (!res.success) {
      const errs: typeof errors = {};
      res.error.issues.forEach((i) => {
        errs[i.path[0] as keyof typeof form] = i.message;
      });
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const whatsappText = [
      `*${res.data.subject}*`,
      "",
      `Nom: ${res.data.name}`,
      `Email: ${res.data.email}`,
      "",
      res.data.message,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${COMPANY.phoneRaw}?text=${encodeURIComponent(whatsappText)}`;

    toast.success(t("contact.toast.title"), {
      description: t("contact.toast.desc"),
    });

    setForm({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);

    window.open(whatsappUrl, "_blank");
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const openDirections = () => {
    const destination = `${COMPANY_COORDS.lat},${COMPANY_COORDS.lng}`;
    const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const origin = `${pos.coords.latitude},${pos.coords.longitude}`;
          window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`, "_blank");
        },
        () => {
          window.open(fallbackUrl, "_blank");
        }
      );
    } else {
      window.open(fallbackUrl, "_blank");
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${contactBg})` }}>
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/80" />
        <div className="container-x relative z-10 py-28 sm:py-36 text-center text-white">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">{t("nav.contact")}</div>

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mb-6 min-h-[1.2em]">
            {animatedSub}
            <span className="inline-block w-[3px] sm:w-1 h-[0.9em] bg-accent align-middle ml-1 animate-pulse" />
          </h1>

          <div className="max-w-2xl mx-auto min-h-[3rem] flex items-center justify-center">
            <p className="text-sm sm:text-base text-white/80 font-medium">
              {animatedMarketing}
              <span className="inline-block w-[2px] h-[1em] bg-accent align-middle ml-1 animate-pulse" />
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="container-x grid lg:grid-cols-5 gap-8 relative z-10">
          <div className="lg:col-span-2">
            <SectionTag>{t("contact.page.title")}</SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl mb-3 text-balance">{t("contact.page.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{t("contact.page.sub")}</p>

            <div className="space-y-4">
              {[
                { Icon: MapPin, t: t("contact.info.address"), v: COMPANY.address },
                { Icon: Phone, t: t("contact.info.phone"), v: COMPANY.phone, href: `tel:${COMPANY.phoneRaw}` },
                { Icon: Mail, t: t("contact.info.email"), v: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { Icon: Clock, t: t("contact.info.hours"), v: t("contact.info.hoursVal") },
              ].map(({ Icon, t: tt, v, href }) => (
                <div
                  key={tt}
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-accent hover:bg-accent/5 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-12 w-12 grid place-items-center rounded-xl bg-accent text-accent-foreground shrink-0 shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-0.5">
                      {tt}
                    </div>
                    {href ? (
                      <a href={href} className="font-bold text-foreground hover:text-accent break-all transition-colors">
                        {v}
                      </a>
                    ) : (
                      <div className="font-bold text-foreground">{v}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 p-5 rounded-2xl bg-linear-to-r from-accent to-accent/80 text-accent-foreground shadow-xl shadow-accent/20">
              <div className="h-10 w-10 grid place-items-center rounded-full bg-white/20 shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display font-black text-sm">Réponse garantie sous 48h</div>
                <div className="text-xs opacity-90">Devis gratuit & sans engagement</div>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 relative overflow-hidden rounded-[2rem] p-1">
            <div className="absolute inset-0 bg-linear-to-br from-accent via-accent/40 to-transparent rounded-[2rem]" />
            <div className="relative bg-card rounded-[1.9rem] p-8 sm:p-10 space-y-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-display font-black text-2xl mb-1">Envoyez-nous un message</h3>
                  <p className="text-sm text-muted-foreground">Décrivez votre projet, on s'occupe du reste.</p>
                </div>
                <div className="h-12 w-12 grid place-items-center rounded-2xl bg-accent/10 text-accent shrink-0">
                  <Send className="h-5 w-5" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("contact.form.name")} *
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Jean Dupont"
                    className="mt-2 h-12 rounded-xl border-2 focus-visible:border-accent focus-visible:ring-accent/20 transition-colors"
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1.5">{errors.name}</p>}
                </div>

                <div className="relative">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("contact.form.email")} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="contact@exemple.com"
                    className="mt-2 h-12 rounded-xl border-2 focus-visible:border-accent focus-visible:ring-accent/20 transition-colors"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1.5">{errors.email}</p>}
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("contact.form.subject")} *
                </Label>
                <Input
                  id="subject"
                  value={form.subject}
                  onChange={set("subject")}
                  placeholder="Devis pour projet hangar"
                  className="mt-2 h-12 rounded-xl border-2 focus-visible:border-accent focus-visible:ring-accent/20 transition-colors"
                />
                {errors.subject && <p className="text-xs text-destructive mt-1.5">{errors.subject}</p>}
              </div>

              <div className="relative">
                <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("contact.form.message")} *
                </Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Décrivez votre projet, vos besoins et contraintes..."
                  className="mt-2 rounded-xl border-2 resize-none focus-visible:border-accent focus-visible:ring-accent/20 transition-colors"
                />
                {errors.message && <p className="text-xs text-destructive mt-1.5">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-black rounded-xl h-14 text-base shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/40 hover:scale-[1.01] transition-all duration-300"
              >
                <Send className="mr-2 h-5 w-5" /> {submitting ? "Ouverture WhatsApp..." : t("contact.form.submit")}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                En envoyant ce formulaire, vous serez redirigé vers WhatsApp.
              </p>
            </div>
          </form>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <div className="rounded-[1.75rem] overflow-hidden border border-border shadow-[0_24px_80px_-30px_rgba(0,0,0,0.15)] relative">
            <div className="aspect-16/10">
              <iframe
                title="Futura Construction — Douala Ndokoti"
                src="https://www.google.com/maps?q=Douala+Ndokoti+CNPS&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <button
              onClick={openDirections}
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold rounded-full px-5 h-12 shadow-xl shadow-accent/30 hover:bg-accent/90 hover:scale-[1.03] transition-all duration-300"
            >
              <Navigation className="h-4 w-4" />
              Itinéraire
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-linear-to-b from-secondary/40 to-background">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionTag>{t("contact.why.tag")}</SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-balance">{t("contact.why.title")}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Award, t: "10+ ans d'expérience", b: "Une expertise reconnue dans la construction métallique." },
              { Icon: Users, t: "Équipe dédiée", b: "Un interlocuteur unique pour suivre votre projet de A à Z." },
              { Icon: Zap, t: "Réponse rapide", b: "Devis sous 48h ouvrées et réactivité au quotidien." },
              { Icon: Shield, t: "Garantie qualité", b: "Engagement de résultat et suivi après livraison." },
            ].map((w) => (
              <div
                key={w.t}
                className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-card via-white/5 to-card border border-border p-7 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.1)] hover:border-accent/40 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.15)] transition-all duration-300"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-br from-accent/5 to-transparent transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="h-14 w-14 grid place-items-center rounded-full bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    <w.Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">{w.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{w.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x max-w-3xl">
          <div className="text-center mb-14">
            <SectionTag>{t("contact.faq.tag")}</SectionTag>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-balance">{t("contact.faq.title")}</h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {[
              { q: "Sous quel délai recevrai-je une réponse ?", a: "Nous répondons à toutes les demandes sous 48h ouvrées maximum." },
              { q: "Le devis est-il gratuit ?", a: "Oui, toutes nos études de devis sont entièrement gratuites et sans engagement." },
              { q: "Comment se déroule un premier rendez-vous ?", a: "Nous échangeons sur votre projet, vos contraintes et besoins, puis proposons une étude technique adaptée." },
              { q: "Puis-je visiter vos chantiers en cours ?", a: "Oui, sur rendez-vous et avec l'accord du maître d'ouvrage concerné." },
            ].map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border rounded-lg px-6 py-1 bg-linear-to-r from-card via-white/2 to-card data-[state=open]:border-accent/30 data-[state=open]:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-display font-bold hover:text-accent transition-colors py-4">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}