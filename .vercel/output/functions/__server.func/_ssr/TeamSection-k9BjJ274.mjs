import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useI18n } from "./router-CYmLkTqG.mjs";
import { S as SectionTag } from "./SectionTag-07in7XpB.mjs";
import { L as Linkedin, c as Mail } from "../_libs/lucide-react.mjs";
const aboutImg = "/assets/boris-DI9ueCB-.jpg";
const TEAM = [
  { img: aboutImg, name: "tendjou boris", role: { fr: "Directeur Général", en: "Managing Director" } },
  { img: aboutImg, name: "tendjou boris", role: { fr: "Architecte en chef", en: "Chief Architect" } },
  { img: aboutImg, name: "tendjou boris", role: { fr: "Chef d'atelier", en: "Workshop Foreman" } },
  { img: aboutImg, name: "tendjou boris", role: { fr: "Cheffe de projet", en: "Project Manager" } }
];
function TeamSection() {
  const { t, lang } = useI18n();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("team.tag") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl text-balance", children: t("team.title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: t("team.sub") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: TEAM.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/5] overflow-hidden bg-secondary relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: m.img, alt: m.name, loading: "lazy", className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-brand-blue-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center gap-3 pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "LinkedIn", className: "h-9 w-9 grid place-items-center rounded-full bg-white text-brand-blue-deep hover:bg-accent hover:text-accent-foreground transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "Email", className: "h-9 w-9 grid place-items-center rounded-full bg-white text-brand-blue-deep hover:bg-accent hover:text-accent-foreground transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: m.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-accent font-bold mt-1", children: m.role[lang] })
      ] })
    ] }, m.name)) })
  ] }) });
}
export {
  TeamSection as T,
  aboutImg as a
};
