import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useI18n, R as Route$6, P as PageHero, p as project2, C as CTABanner, c as cn } from "./router-CaVb9e73.mjs";
import { D as Dialog$1, a as DialogTrigger$1, b as DialogPortal$1, c as DialogContent$1, d as DialogClose, e as DialogOverlay$1, f as DialogTitle$1, g as DialogDescription$1 } from "../_libs/radix-ui__react-dialog.mjs";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-CB0F8L07.mjs";
import { S as SectionTag } from "./SectionTag-07in7XpB.mjs";
import "../_libs/sonner.mjs";
import { d as Check, e as MessageCircle, f as FileText, g as Cog, T as Truck, h as ClipboardCheck, H as HardHat, i as Hammer, j as PencilRuler, B as Building2, X } from "../_libs/lucide-react.mjs";
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
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-accordion.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-direction.mjs";
const Dialog = Dialog$1;
const DialogTrigger = DialogTrigger$1;
const DialogPortal = DialogPortal$1;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay$1,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogOverlay$1.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent$1,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogContent$1.displayName;
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle$1,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogTitle$1.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription$1,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogDescription$1.displayName;
const ICONS = {
  Building2,
  PencilRuler,
  Hammer,
  HardHat,
  ClipboardCheck
};
function ServicesPage() {
  const {
    t,
    lang
  } = useI18n();
  const services = Route$6.useLoaderData();
  const [active, setActive] = reactExports.useState(0);
  const [galleryIndex, setGalleryIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
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
  reactExports.useEffect(() => {
    if (active >= services.length) setActive(0);
  }, [active, services.length]);
  const ActiveIcon = (iconName) => {
    const Icon = ICONS[iconName];
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 text-accent" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { title: t("services.page.title"), sub: t("services.page.sub"), crumb: t("nav.services"), bgImage: project2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-x", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("services.tag") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl leading-tight", children: t("services.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-4 max-w-lg leading-7", children: t("services.sub") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-3xl border border-border bg-accent/5 p-6 shadow-sm text-sm leading-7 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-accent mb-3", children: "Des services complets, conçus pour faire de votre projet une réussite claire, rapide et rentable." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nous accompagnons chaque étape : étude technique, fabrication maîtrisée, installation sûre. Votre chantier avance plus vite, plus propre et sans mauvaise surprise." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-3", children: services.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActive(i), className: `w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 ${i === active ? "bg-accent/10 border-accent shadow-md" : "bg-card border-border hover:border-accent/40"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 grid place-items-center rounded-lg bg-accent/10 text-accent", children: ActiveIcon(s.icon) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold", children: s.title[lang] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: s.short[lang] })
          ] })
        ] }, s.id)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] overflow-hidden border border-border bg-card shadow-[0_24px_90px_-40px_rgba(0,0,0,0.18)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-accent/5 p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 grid place-items-center rounded-3xl bg-accent/10 text-accent", children: ActiveIcon(services[active].icon) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-black text-3xl sm:text-4xl leading-tight", children: services[active].title[lang] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground mt-3 max-w-2xl leading-7", children: services[active].long[lang] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 lg:mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", className: "inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground shadow-sm transition hover:shadow-md", children: t("cta.quote") }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[1.2fr_0.8fr] p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "group relative block overflow-hidden rounded-[2rem] border border-border bg-muted shadow-inner focus:outline-none focus:ring-2 focus:ring-accent/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: services[active].gallery[galleryIndex], alt: `${services[active].title[lang]} ${galleryIndex + 1}`, className: "h-[460px] w-full object-cover transition duration-700 ease-in-out group-hover:scale-105" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/35 to-transparent px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-black/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white", children: "Cliquez pour agrandir" }) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-[90vw] p-0 overflow-hidden bg-transparent shadow-none sm:rounded-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: services[active].gallery[galleryIndex], alt: `${services[active].title[lang]} ${galleryIndex + 1}`, className: "max-h-[85vh] w-full object-contain bg-black" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm uppercase tracking-[0.24em] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Visuel du service" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                galleryIndex + 1,
                "/",
                services[active].gallery.length
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: services[active].gallery.map((src, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setGalleryIndex(index), className: `overflow-hidden rounded-3xl border transition duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 ${galleryIndex === index ? "border-accent shadow-lg" : "border-border"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: `Miniature ${index + 1} de ${services[active].title[lang]}`, className: "h-24 w-full object-cover" }) }, index)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-accent/5 p-6 text-sm leading-7 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-accent", children: "Une approche orientée résultats et sérénité." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Chaque service est structuré pour optimiser les coûts et réduire les délais : étude précise, fabrication traçable, pose maîtrisée. Le tout avec un seul interlocuteur technique." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold mb-4", children: "Ce que nous livrons" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: services[active].bullets[lang].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-1 h-5 w-5 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: b })
              ] }, b)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card p-6 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Pourquoi choisir Futura ?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-3 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "+120 projets livrés avec une qualité béton." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Démarches techniques et suivi de chantier sans stress." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Solutions sur mesure pour l’industrie, le commerce et l’agroalimentaire." })
              ] })
            ] })
          ] })
        ] })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("services.process.tag") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl", children: t("services.process.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: t("services.process.sub") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [{
        Icon: MessageCircle,
        t: "Échange",
        b: "Compréhension de votre besoin et de vos contraintes."
      }, {
        Icon: FileText,
        t: "Étude",
        b: "Conception, plans techniques et devis détaillé."
      }, {
        Icon: Cog,
        t: "Fabrication",
        b: "Production en atelier avec contrôle qualité."
      }, {
        Icon: Truck,
        t: "Livraison",
        b: "Pose sur site et réception de l'ouvrage."
      }].map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -top-3 -right-3 h-10 w-10 grid place-items-center rounded-full bg-accent text-accent-foreground font-display font-black text-sm", children: [
          "0",
          i + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(p.Icon, { className: "h-8 w-8 text-accent mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: p.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: p.b })
      ] }, p.t)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("services.faq.tag") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl", children: t("services.faq.title") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: [{
        q: "Quels types de bâtiments réalisez-vous ?",
        a: "Hangars industriels, entrepôts, bâtiments à étages, ateliers, passerelles et ouvrages spéciaux sur mesure."
      }, {
        q: "Quel est le délai moyen d'un projet ?",
        a: "De 6 à 16 semaines selon la complexité, incluant la conception, la fabrication et la pose."
      }, {
        q: "Travaillez-vous en dehors de Douala ?",
        a: "Oui, nous intervenons sur l'ensemble du territoire camerounais et dans la sous-région CEMAC."
      }, {
        q: "Proposez-vous un service après-vente ?",
        a: "Oui, nous assurons un suivi technique et des prestations de maintenance après livraison."
      }].map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `item-${i}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-left font-display font-bold", children: f.q }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-muted-foreground", children: f.a })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CTABanner, {})
  ] });
}
export {
  ServicesPage as component
};
