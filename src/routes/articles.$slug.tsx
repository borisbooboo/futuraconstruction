import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { getSiteArticle } from "@/lib/articles";
import { CTABanner } from "./about";

export const Route = createFileRoute("/articles/$slug")({
  loader: async ({ params }) => {
    const article = await getSiteArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: "futuraconstructionsarl" },
          { name: "description", content: loaderData.article.excerpt.fr },
          { property: "og:image", content: loaderData.article.image },
        ]
      : [
          { title: "futuraconstructionsarl" },
          { name: "description", content: "Retrouvez nos articles et actualités sur les projets Futura Construction." },
        ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const excerpt = article.excerpt[lang]?.trim() ?? "";
  const content = article.content[lang]?.trim() ?? "";
  const showExcerpt = excerpt.length > 0 && !content.startsWith(excerpt);
  const images = useMemo(
    () => Array.from(new Set([article.image, ...(article.gallery ?? [])].filter(Boolean))),
    [article.gallery, article.image],
  );

  return (
    <>
      <article className="pt-10 pb-20">
        <div className="container-x max-w-3xl">
          <Link to="/articles" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-6">
            <ArrowLeft className="h-4 w-4" /> {t("back")}
          </Link>
          <div className="text-xs uppercase tracking-widest text-accent font-bold mb-3">{article.category[lang]}</div>
          <h1 className="font-display font-black text-3xl sm:text-5xl leading-tight text-balance">{article.title[lang]}</h1>
          <div className="mt-4 text-sm text-muted-foreground">
            {t("published")} {new Date(article.date).toLocaleDateString(lang, { year: "numeric", month: "long", day: "numeric" })}
          </div>
          <ArticleImageCarousel images={images} title={article.title[lang]} />
          {showExcerpt && (
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">{excerpt}</p>
          )}
          <div className="mt-8 text-base leading-relaxed whitespace-pre-line">{content}</div>
        </div>
      </article>
      <CTABanner />
    </>
  );
}

function ArticleImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasMultipleImages = images.length > 1;
  const activeImage = images[activeIndex] ?? images[0];

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  useEffect(() => {
    if (!hasMultipleImages || lightboxOpen) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [hasMultipleImages, images.length, lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
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

  const previousImage = () =>
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  const nextImage = () => setActiveIndex((current) => (current + 1) % images.length);

  return (
    <>
      <div className="mt-8 space-y-3">
        <div className="relative overflow-hidden rounded-lg bg-secondary">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="block w-full"
            aria-label="Agrandir l'image"
          >
            <img
              src={activeImage}
              alt={title}
              className="aspect-[16/9] w-full object-cover transition-opacity duration-500"
            />
          </button>

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={previousImage}
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white transition hover:bg-black/75"
                aria-label="Image precedente"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white transition hover:bg-black/75"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((image, index) => (
                  <button
                    key={`${image}-dot`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition ${
                      activeIndex === index ? "w-7 bg-white" : "w-2.5 bg-white/55 hover:bg-white"
                    }`}
                    aria-label={`Afficher l'image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {hasMultipleImages && (
          <div className="grid grid-cols-3 gap-3">
            {images.map((image, index) => (
              <button
                key={`${image}-thumb`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`overflow-hidden rounded-lg border transition ${
                  activeIndex === index ? "border-accent" : "border-border hover:border-accent/70"
                }`}
                aria-label={`Afficher l'image ${index + 1}`}
              >
                <img src={image} alt="" className="aspect-[4/3] w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>

          {hasMultipleImages && (
            <button
              type="button"
              onClick={previousImage}
              className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Image precedente"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}

          <img
            src={activeImage}
            alt={title}
            className="max-h-[86vh] max-w-[92vw] rounded-lg object-contain"
          />

          {hasMultipleImages && (
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Image suivante"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
