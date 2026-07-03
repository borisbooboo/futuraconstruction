import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Mail,
  FolderOpen,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { getSiteArticles } from "@/lib/articles";
import type { Article } from "@/lib/data";
import { PageHero } from "./about";
import { SectionTag } from "@/components/SectionTag";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import articlesBg from "@/assets/article-3.jpg";

export const Route = createFileRoute("/articles")({
  loader: () => getSiteArticles(),
  head: () => ({
    meta: [
      { title: "futuraconstructionsarl" },
      {
        name: "description",
        content: "Articles, actualités et études de cas en construction métallique.",
      },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const { t, lang } = useI18n();
  const articles = Route.useLoaderData();
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const featured = sorted[0];
  const rest = sorted.slice(1);

  const cats = Array.from(new Set(sorted.map((a) => a.category[lang])));

  const [carouselTick, setCarouselTick] = useState(0);
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
    title: string;
  } | null>(null);
  const [email, setEmail] = useState("");
  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (sorted.length === 0 || lightbox) return;

    const timer = window.setInterval(() => {
      setCarouselTick((current) => current + 1);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [lightbox, sorted.length]);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("E-mail invalide");
      return;
    }
    toast.success("Inscription confirmée", { description: email });
    setEmail("");
  };

  return (
    <>
      <PageHero
        title={t("articles.page.title")}
        sub={t("articles.page.sub")}
        crumb={t("nav.articles")}
        bgImage={articlesBg}
      />

      {sorted.length === 0 ? (
        <section className="py-20">
          <div className="container-x">
            <div className="mx-auto max-w-xl rounded-lg border border-border bg-card p-8 text-center">
              <FileText className="mx-auto mb-4 h-10 w-10 text-accent" />
              <h2 className="font-display text-2xl font-black">Aucun article publie</h2>
              <p className="mt-3 text-muted-foreground">
                Les nouvelles actualites ajoutees et publiees depuis l'administration apparaitront
                ici.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* FEATURED */}
          <section className="py-16">
            <div className="container-x">
              <div
                className="group grid lg:grid-cols-2 gap-8 items-center bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <ArticleCardImages
                  article={featured}
                  carouselTick={carouselTick}
                  onOpenImage={setLightbox}
                  priority
                />
                <div className="p-8">
                  <span className="text-xs uppercase tracking-widest text-accent font-bold">
                    À la une
                  </span>
                  <Link to="/articles/$slug" params={{ slug: featured.slug }}>
                    <h2 className="font-display font-black text-2xl sm:text-3xl mt-3 hover:text-accent transition-colors">
                      {featured.title[lang]}
                    </h2>
                  </Link>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {featured.excerpt[lang]}
                  </p>
                  <Link
                    to="/articles/$slug"
                    params={{ slug: featured.slug }}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-accent"
                  >
                    {t("cta.readMore")} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* GRID */}
          <section className="pb-16">
            <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((a) => (
                <article
                  key={a.slug}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <ArticleCardImages
                    article={a}
                    carouselTick={carouselTick}
                    onOpenImage={setLightbox}
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="text-accent font-bold uppercase tracking-widest">
                        {a.category[lang]}
                      </span>
                      <span>{new Date(a.date).toLocaleDateString(lang)}</span>
                    </div>
                    <Link to="/articles/$slug" params={{ slug: a.slug }}>
                      <h3 className="font-display font-bold text-lg leading-snug hover:text-accent transition-colors">
                        {a.title[lang]}
                      </h3>
                    </Link>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {a.excerpt[lang]}
                    </p>
                    <Link
                      to="/articles/$slug"
                      params={{ slug: a.slug }}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent"
                    >
                      {t("cta.readMore")} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CATEGORIES */}
          <section className="py-20 bg-secondary/40">
            <div className="container-x">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <SectionTag>{t("articles.cats.tag")}</SectionTag>
                <h2 className="font-display font-black text-3xl sm:text-4xl">
                  {t("articles.cats.title")}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {cats.map((c) => {
                  const count = sorted.filter((a) => a.category[lang] === c).length;
                  return (
                    <div
                      key={c}
                      className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group cursor-pointer"
                    >
                      <FolderOpen className="h-8 w-8 text-accent mb-3" />
                      <h3 className="font-display font-bold text-lg group-hover:text-accent transition-colors">
                        {c}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {count} article{count > 1 ? "s" : ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* NEWSLETTER */}
          <section className="py-20">
            <div className="container-x">
              <div className="brand-gradient text-white rounded-lg p-10 md:p-14 text-center max-w-3xl mx-auto relative overflow-hidden">
                <Mail className="h-10 w-10 text-accent mx-auto mb-4" />
                <SectionTag>{t("articles.news.tag")}</SectionTag>
                <h2 className="font-display font-black text-3xl sm:text-4xl">
                  {t("articles.news.title")}
                </h2>
                <p className="mt-3 text-white/80">{t("articles.news.sub")}</p>
                <form
                  onSubmit={subscribe}
                  className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                  />
                  <Button
                    type="submit"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-sm shrink-0"
                  >
                    {t("articles.news.btn")}
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </>
      )}
      <ArticleLightbox lightbox={lightbox} onClose={closeLightbox} />
    </>
  );
}

function getArticleImages(article: Article) {
  return Array.from(new Set([article.image, ...(article.gallery ?? [])].filter(Boolean)));
}

function ArticleCardImages({
  article,
  carouselTick,
  onOpenImage,
  priority = false,
}: {
  article: Article;
  carouselTick: number;
  onOpenImage: (lightbox: { images: string[]; index: number; title: string }) => void;
  priority?: boolean;
}) {
  const images = useMemo(
    () => getArticleImages(article),
    [article.gallery, article.image],
  );
  const cardIndex = images.length > 0 ? carouselTick % images.length : 0;
  const hasMultipleImages = images.length > 1;
  const cardImage = images[cardIndex] ?? images[0];

  useEffect(() => {
    images.forEach((image) => {
      const preloadedImage = new Image();
      preloadedImage.src = image;
    });
  }, [images]);

  if (!cardImage) return null;

  return (
    <button
      type="button"
      onClick={() => onOpenImage({ images, index: cardIndex, title: article.title.fr })}
      className="relative block aspect-[16/10] w-full overflow-hidden bg-secondary text-left"
      aria-label="Agrandir les images de l'article"
    >
      <img
        src={cardImage}
        alt=""
        loading={priority ? "eager" : "lazy"}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

      {hasMultipleImages && (
        <>
          <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-bold text-white">
            {cardIndex + 1}/{images.length}
          </span>
          <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((image, index) => (
              <span
                key={`${article.slug}-${image}-dot`}
                className={`h-2 rounded-full transition ${
                  cardIndex === index ? "w-6 bg-white" : "w-2 bg-white/55"
                }`}
              />
            ))}
          </span>
        </>
      )}
    </button>
  );
}

function ArticleLightbox({
  lightbox,
  onClose,
}: {
  lightbox: { images: string[]; index: number; title: string } | null;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!lightbox) return;
    setActiveIndex(lightbox.index);
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox) return;

    const onKeyDown = (event: KeyboardEvent) => {
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
  const previousImage = () =>
    setActiveIndex((current) => (current - 1 + lightbox.images.length) % lightbox.images.length);
  const nextImage = () =>
    setActiveIndex((current) => (current + 1) % lightbox.images.length);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
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
        alt={lightbox.title}
        className="max-h-[86vh] max-w-[92vw] rounded-lg object-contain"
      />

      {hasMultipleImages && (
        <>
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Image suivante"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white">
            {activeIndex + 1}/{lightbox.images.length}
          </div>
        </>
      )}
    </div>,
    document.body,
  );
}
