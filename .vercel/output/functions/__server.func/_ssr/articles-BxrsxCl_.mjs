import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { r as reactDomExports } from "../_libs/react-dom.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useI18n, d as Route$4, P as PageHero, e as articlesBg, B as Button } from "./router-CaVb9e73.mjs";
import { S as SectionTag } from "./SectionTag-07in7XpB.mjs";
import { I as Input } from "./input-C4j4rZRy.mjs";
import { f as FileText, A as ArrowRight, o as FolderOpen, c as Mail, X, p as ChevronLeft, q as ChevronRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
function ArticlesPage() {
  const {
    t,
    lang
  } = useI18n();
  const articles = Route$4.useLoaderData();
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const featured = sorted[0];
  const rest = sorted.slice(1);
  const cats = Array.from(new Set(sorted.map((a) => a.category[lang])));
  const [carouselTick, setCarouselTick] = reactExports.useState(0);
  const [lightbox, setLightbox] = reactExports.useState(null);
  const [email, setEmail] = reactExports.useState("");
  const closeLightbox = reactExports.useCallback(() => setLightbox(null), []);
  reactExports.useEffect(() => {
    if (sorted.length === 0 || lightbox) return;
    const timer = window.setInterval(() => {
      setCarouselTick((current) => current + 1);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [lightbox, sorted.length]);
  const subscribe = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("E-mail invalide");
      return;
    }
    toast.success("Inscription confirmée", {
      description: email
    });
    setEmail("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { title: t("articles.page.title"), sub: t("articles.page.sub"), crumb: t("nav.articles"), bgImage: articlesBg }),
    sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-x", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl rounded-lg border border-border bg-card p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mx-auto mb-4 h-10 w-10 text-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-black", children: "Aucun article publie" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Les nouvelles actualites ajoutees et publiees depuis l'administration apparaitront ici." })
    ] }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-x", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group grid lg:grid-cols-2 gap-8 items-center bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCardImages, { article: featured, carouselTick, onOpenImage: setLightbox, priority: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-accent font-bold", children: "À la une" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/articles/$slug", params: {
            slug: featured.slug
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-2xl sm:text-3xl mt-3 hover:text-accent transition-colors", children: featured.title[lang] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: featured.excerpt[lang] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/articles/$slug", params: {
            slug: featured.slug
          }, className: "mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent", children: [
            t("cta.readMore"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-x grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: rest.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCardImages, { article: a, carouselTick, onOpenImage: setLightbox }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-bold uppercase tracking-widest", children: a.category[lang] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(a.date).toLocaleDateString(lang) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/articles/$slug", params: {
            slug: a.slug
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg leading-snug hover:text-accent transition-colors", children: a.title[lang] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground line-clamp-2", children: a.excerpt[lang] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/articles/$slug", params: {
            slug: a.slug
          }, className: "mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent", children: [
            t("cta.readMore"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ] })
        ] })
      ] }, a.slug)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-x", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("articles.cats.tag") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl", children: t("articles.cats.title") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto", children: cats.map((c) => {
          const count = sorted.filter((a) => a.category[lang] === c).length;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-8 w-8 text-accent mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg group-hover:text-accent transition-colors", children: c }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              count,
              " article",
              count > 1 ? "s" : ""
            ] })
          ] }, c);
        }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-x", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "brand-gradient text-white rounded-lg p-10 md:p-14 text-center max-w-3xl mx-auto relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-10 w-10 text-accent mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTag, { children: t("articles.news.tag") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl sm:text-4xl", children: t("articles.news.title") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-white/80", children: t("articles.news.sub") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: subscribe, className: "mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", placeholder: "votre@email.com", value: email, onChange: (e) => setEmail(e.target.value), className: "bg-white/10 border-white/30 text-white placeholder:text-white/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-sm shrink-0", children: t("articles.news.btn") })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleLightbox, { lightbox, onClose: closeLightbox })
  ] });
}
function getArticleImages(article) {
  return Array.from(new Set([article.image, ...article.gallery ?? []].filter(Boolean)));
}
function ArticleCardImages({
  article,
  carouselTick,
  onOpenImage,
  priority = false
}) {
  const images = reactExports.useMemo(() => getArticleImages(article), [article.gallery, article.image]);
  const cardIndex = images.length > 0 ? carouselTick % images.length : 0;
  const hasMultipleImages = images.length > 1;
  const cardImage = images[cardIndex] ?? images[0];
  reactExports.useEffect(() => {
    images.forEach((image) => {
      const preloadedImage = new Image();
      preloadedImage.src = image;
    });
  }, [images]);
  if (!cardImage) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onOpenImage({
    images,
    index: cardIndex,
    title: article.title.fr
  }), className: "relative block aspect-[16/10] w-full overflow-hidden bg-secondary text-left", "aria-label": "Agrandir les images de l'article", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: cardImage, alt: "", loading: priority ? "eager" : "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-black/0 transition group-hover:bg-black/10" }),
    hasMultipleImages && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-bold text-white", children: [
        cardIndex + 1,
        "/",
        images.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2", children: images.map((image, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 rounded-full transition ${cardIndex === index ? "w-6 bg-white" : "w-2 bg-white/55"}` }, `${article.slug}-${image}-dot`)) })
    ] })
  ] });
}
function ArticleLightbox({
  lightbox,
  onClose
}) {
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!lightbox) return;
    setActiveIndex(lightbox.index);
  }, [lightbox]);
  reactExports.useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + lightbox.images.length) % lightbox.images.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % lightbox.images.length);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox, onClose]);
  if (!lightbox) return null;
  const hasMultipleImages = lightbox.images.length > 1;
  const activeImage = lightbox.images[activeIndex] ?? lightbox.images[0];
  const previousImage = () => setActiveIndex((current) => (current - 1 + lightbox.images.length) % lightbox.images.length);
  const nextImage = () => setActiveIndex((current) => (current + 1) % lightbox.images.length);
  return reactDomExports.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4", role: "dialog", "aria-modal": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20", "aria-label": "Fermer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) }),
    hasMultipleImages && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: previousImage, className: "absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20", "aria-label": "Image precedente", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-7 w-7" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: activeImage, alt: lightbox.title, className: "max-h-[86vh] max-w-[92vw] rounded-lg object-contain" }),
    hasMultipleImages && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: nextImage, className: "absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20", "aria-label": "Image suivante", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-7 w-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white", children: [
        activeIndex + 1,
        "/",
        lightbox.images.length
      ] })
    ] })
  ] }), document.body);
}
export {
  ArticlesPage as component
};
