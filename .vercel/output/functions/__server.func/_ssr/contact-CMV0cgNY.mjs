import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useI18n, a as project4, b as COMPANY, L as Label, B as Button } from "./router-CaVb9e73.mjs";
import { I as Input } from "./input-C4j4rZRy.mjs";
import { T as Textarea } from "./textarea-D3e0hZD0.mjs";
import { S as SectionTag } from "./SectionTag-07in7XpB.mjs";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-CB0F8L07.mjs";
import { b as MapPin, P as Phone, c as Mail, C as Clock, Z as Zap, l as Send, N as Navigation, m as Award, U as Users, n as Shield } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
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
import "../_libs/radix-ui__react-accordion.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-direction.mjs";
const schema = objectType({
  name: stringType().trim().min(2, "Nom requis").max(100),
  email: stringType().trim().email("Email invalide").max(255),
  subject: stringType().trim().min(2, "Objet requis").max(150),
  message: stringType().trim().min(5, "Message requis").max(2e3)
});
const COMPANY_COORDS = {
  lat: 4.0571,
  lng: 9.7223
};
const MARKETING_LINES = ["Conception, fabrication et pose de structures métalliques sur mesure.", "Des chantiers livrés dans les délais, partout au Cameroun.", "Plus de 10 ans d'expertise au service de vos projets.", "Devis gratuit sous 48h, sans engagement.", "Hangars, charpentes, ossatures : notre savoir-faire à votre service."];
function useTypewriter(text, opts) {
  const {
    typeSpeed = 45,
    eraseSpeed = 25,
    pauseTime = 1800
  } = {};
  const [display, setDisplay] = reactExports.useState("");
  reactExports.useEffect(() => {
    let i = 0;
    let timeout;
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
function useTypewriterCycle(lines, opts) {
  const {
    typeSpeed = 45,
    eraseSpeed = 25,
    pauseTime = 1800
  } = opts || {};
  const [display, setDisplay] = reactExports.useState("");
  const [lineIndex, setLineIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (lines.length === 0) return;
    const text = lines[lineIndex % lines.length];
    let i = 0;
    let timeout;
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
  const {
    t
  } = useI18n();
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [submitting, setSubmitting] = reactExports.useState(false);
  const animatedSub = useTypewriter(t("contact.page.sub"));
  const animatedMarketing = useTypewriterCycle(MARKETING_LINES, {
    typeSpeed: 40,
    eraseSpeed: 20,
    pauseTime: 2200
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;
    const res = schema.safeParse(form);
    if (!res.success) {
      const errs = {};
      res.error.issues.forEach((i) => {
        errs[i.path[0]] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const whatsappText = [`*${res.data.subject}*`, "", `Nom: ${res.data.name}`, `Email: ${res.data.email}`, "", res.data.message].join("\n");
    const whatsappUrl = `https://wa.me/${COMPANY.phoneRaw}?text=${encodeURIComponent(whatsappText)}`;
    toast.success(t("contact.toast.title"), {
      description: t("contact.toast.desc")
    });
    setForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    setSubmitting(false);
    window.open(whatsappUrl, "_blank");
  };
  const set = (k) => (e) => setForm((f) => ({
    ...f,
    [k]: e.target.value
  }));
  const openDirections = () => {
    const destination = `${COMPANY_COORDS.lat},${COMPANY_COORDS.lng}`;
    const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const origin = `${pos.coords.latitude},${pos.coords.longitude}`;
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`, "_blank");
      }, () => {
        window.open(fallbackUrl, "_blank");
      });
    } else {
      window.open(fallbackUrl, "_blank");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-cover bg-center", style: {
      backgroundImage: `url(${project4})`
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x relative z-10 py-28 sm:py-36 text-center text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4", children: t("nav.contact") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-black text-4xl sm:text-5xl lg:text-6xl mb-6 min-h-[1.2em]", children: [
          animatedSub,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-[3px] sm:w-1 h-[0.9em] bg-accent align-middle ml-1 animate-pulse" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto min-h-[3rem] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm sm:text-base text-white/80 font-medium", children: [
          animatedMarketing,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-[2px] h-[1em] bg-accent align-middle ml-1 animate-pulse" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x grid lg:grid-cols-5 gap-8 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("contact.page.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl mb-3 text-balance", children: t("contact.page.title") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-8", children: t("contact.page.sub") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [{
            Icon: MapPin,
            t: t("contact.info.address"),
            v: COMPANY.address
          }, {
            Icon: Phone,
            t: t("contact.info.phone"),
            v: COMPANY.phone,
            href: `tel:${COMPANY.phoneRaw}`
          }, {
            Icon: Mail,
            t: t("contact.info.email"),
            v: COMPANY.email,
            href: `mailto:${COMPANY.email}`
          }, {
            Icon: Clock,
            t: t("contact.info.hours"),
            v: t("contact.info.hoursVal")
          }].map(({
            Icon,
            t: tt,
            v,
            href
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-accent hover:bg-accent/5 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 grid place-items-center rounded-xl bg-accent text-accent-foreground shrink-0 shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-0.5", children: tt }),
              href ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, className: "font-bold text-foreground hover:text-accent break-all transition-colors", children: v }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-foreground", children: v })
            ] })
          ] }, tt)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-3 p-5 rounded-2xl bg-linear-to-r from-accent to-accent/80 text-accent-foreground shadow-xl shadow-accent/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 grid place-items-center rounded-full bg-white/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-black text-sm", children: "Réponse garantie sous 48h" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-90", children: "Devis gratuit & sans engagement" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "lg:col-span-3 relative overflow-hidden rounded-[2rem] p-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-br from-accent via-accent/40 to-transparent rounded-[2rem]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card rounded-[1.9rem] p-8 sm:p-10 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-black text-2xl mb-1", children: "Envoyez-nous un message" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Décrivez votre projet, on s'occupe du reste." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 grid place-items-center rounded-2xl bg-accent/10 text-accent shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-5 w-5" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "name", className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: [
                  t("contact.form.name"),
                  " *"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", value: form.name, onChange: set("name"), placeholder: "Jean Dupont", className: "mt-2 h-12 rounded-xl border-2 focus-visible:border-accent focus-visible:ring-accent/20 transition-colors" }),
                errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1.5", children: errors.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "email", className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: [
                  t("contact.form.email"),
                  " *"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: form.email, onChange: set("email"), placeholder: "contact@exemple.com", className: "mt-2 h-12 rounded-xl border-2 focus-visible:border-accent focus-visible:ring-accent/20 transition-colors" }),
                errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1.5", children: errors.email })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "subject", className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: [
                t("contact.form.subject"),
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "subject", value: form.subject, onChange: set("subject"), placeholder: "Devis pour projet hangar", className: "mt-2 h-12 rounded-xl border-2 focus-visible:border-accent focus-visible:ring-accent/20 transition-colors" }),
              errors.subject && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1.5", children: errors.subject })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "message", className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: [
                t("contact.form.message"),
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "message", rows: 5, value: form.message, onChange: set("message"), placeholder: "Décrivez votre projet, vos besoins et contraintes...", className: "mt-2 rounded-xl border-2 resize-none focus-visible:border-accent focus-visible:ring-accent/20 transition-colors" }),
              errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1.5", children: errors.message })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", size: "lg", disabled: submitting, className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground font-black rounded-xl h-14 text-base shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/40 hover:scale-[1.01] transition-all duration-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "mr-2 h-5 w-5" }),
              " ",
              submitting ? "Ouverture WhatsApp..." : t("contact.form.submit")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "En envoyant ce formulaire, vous serez redirigé vers WhatsApp." })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-x", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.75rem] overflow-hidden border border-border shadow-[0_24px_80px_-30px_rgba(0,0,0,0.15)] relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-16/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: "Futura Construction — Douala Ndokoti", src: "https://www.google.com/maps?q=Douala+Ndokoti+CNPS&output=embed", className: "w-full h-full border-0", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openDirections, className: "absolute bottom-4 right-4 sm:bottom-6 sm:right-6 inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold rounded-full px-5 h-12 shadow-xl shadow-accent/30 hover:bg-accent/90 hover:scale-[1.03] transition-all duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-4 w-4" }),
        "Itinéraire"
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-linear-to-b from-secondary/40 to-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("contact.why.tag") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl text-balance", children: t("contact.why.title") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [{
        Icon: Award,
        t: "10+ ans d'expérience",
        b: "Une expertise reconnue dans la construction métallique."
      }, {
        Icon: Users,
        t: "Équipe dédiée",
        b: "Un interlocuteur unique pour suivre votre projet de A à Z."
      }, {
        Icon: Zap,
        t: "Réponse rapide",
        b: "Devis sous 48h ouvrées et réactivité au quotidien."
      }, {
        Icon: Shield,
        t: "Garantie qualité",
        b: "Engagement de résultat et suivi après livraison."
      }].map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-3xl bg-linear-to-br from-card via-white/5 to-card border border-border p-7 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.1)] hover:border-accent/40 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.15)] transition-all duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-br from-accent/5 to-transparent transition-opacity duration-300" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 grid place-items-center rounded-full bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(w.Icon, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg mb-3", children: w.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: w.b })
        ] })
      ] }, w.t)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("contact.faq.tag") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl text-balance", children: t("contact.faq.title") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "w-full space-y-3", children: [{
        q: "Sous quel délai recevrai-je une réponse ?",
        a: "Nous répondons à toutes les demandes sous 48h ouvrées maximum."
      }, {
        q: "Le devis est-il gratuit ?",
        a: "Oui, toutes nos études de devis sont entièrement gratuites et sans engagement."
      }, {
        q: "Comment se déroule un premier rendez-vous ?",
        a: "Nous échangeons sur votre projet, vos contraintes et besoins, puis proposons une étude technique adaptée."
      }, {
        q: "Puis-je visiter vos chantiers en cours ?",
        a: "Oui, sur rendez-vous et avec l'accord du maître d'ouvrage concerné."
      }].map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `item-${i}`, className: "border border-border rounded-lg px-6 py-1 bg-linear-to-r from-card via-white/2 to-card data-[state=open]:border-accent/30 data-[state=open]:shadow-[0_12px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-left font-display font-bold hover:text-accent transition-colors py-4", children: f.q }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-muted-foreground pb-4 leading-relaxed", children: f.a })
      ] }, i)) })
    ] }) })
  ] });
}
export {
  ContactPage as component
};
