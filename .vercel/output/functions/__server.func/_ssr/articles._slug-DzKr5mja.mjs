import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { n as Route, u as useI18n, C as CTABanner } from "./router-CYmLkTqG.mjs";
import "../_libs/sonner.mjs";
import { a1 as ArrowLeft, p as ChevronLeft, q as ChevronRight, X } from "../_libs/lucide-react.mjs";
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
function ArticlePage() {
  const {
    article
  } = Route.useLoaderData();
  const {
    t,
    lang
  } = useI18n();
  const excerpt = article.excerpt[lang]?.trim() ?? "";
  const content = article.content[lang]?.trim() ?? "";
  const showExcerpt = excerpt.length > 0 && !content.startsWith(excerpt);
  const images = reactExports.useMemo(() => Array.from(new Set([article.image, ...article.gallery ?? []].filter(Boolean))), [article.gallery, article.image]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "pt-10 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/articles", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " ",
        t("back")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-accent font-bold mb-3", children: article.category[lang] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-3xl sm:text-5xl leading-tight text-balance", children: article.title[lang] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-sm text-muted-foreground", children: [
        t("published"),
        " ",
        new Date(article.date).toLocaleDateString(lang, {
          year: "numeric",
          month: "long",
          day: "numeric"
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleImageCarousel, { images, title: article.title[lang] }),
      showExcerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-lg text-muted-foreground leading-relaxed", children: excerpt }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-base leading-relaxed whitespace-pre-line", children: content })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CTABanner, {})
  ] });
}
function ArticleImageCarousel({
  images,
  title
}) {
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  const [lightboxOpen, setLightboxOpen] = reactExports.useState(false);
  const hasMultipleImages = images.length > 1;
  const activeImage = images[activeIndex] ?? images[0];
  reactExports.useEffect(() => {
    setActiveIndex(0);
  }, [images]);
  reactExports.useEffect(() => {
    if (!hasMultipleImages || lightboxOpen) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [hasMultipleImages, images.length, lightboxOpen]);
  reactExports.useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % images.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [images.length, lightboxOpen]);
  if (!activeImage) return null;
  const previousImage = () => setActiveIndex((current) => (current - 1 + images.length) % images.length);
  const nextImage = () => setActiveIndex((current) => (current + 1) % images.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-lg bg-secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setLightboxOpen(true), className: "block w-full", "aria-label": "Agrandir l'image", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: activeImage, alt: title, className: "aspect-[16/9] w-full object-cover transition-opacity duration-500" }) }),
        hasMultipleImages && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: previousImage, className: "absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white transition hover:bg-black/75", "aria-label": "Image precedente", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: nextImage, className: "absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white transition hover:bg-black/75", "aria-label": "Image suivante", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2", children: images.map((image, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActiveIndex(index), className: `h-2.5 rounded-full transition ${activeIndex === index ? "w-7 bg-white" : "w-2.5 bg-white/55 hover:bg-white"}`, "aria-label": `Afficher l'image ${index + 1}` }, `${image}-dot`)) })
        ] })
      ] }),
      hasMultipleImages && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: images.map((image, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActiveIndex(index), className: `overflow-hidden rounded-lg border transition ${activeIndex === index ? "border-accent" : "border-border hover:border-accent/70"}`, "aria-label": `Afficher l'image ${index + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image, alt: "", className: "aspect-[4/3] w-full object-cover" }) }, `${image}-thumb`)) })
    ] }),
    lightboxOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setLightboxOpen(false), className: "absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20", "aria-label": "Fermer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) }),
      hasMultipleImages && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: previousImage, className: "absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20", "aria-label": "Image precedente", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-7 w-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: activeImage, alt: title, className: "max-h-[86vh] max-w-[92vw] rounded-lg object-contain" }),
      hasMultipleImages && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: nextImage, className: "absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20", "aria-label": "Image suivante", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-7 w-7" }) })
    ] })
  ] });
}
export {
  ArticlePage as component
};
