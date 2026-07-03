import { articles as staticArticles, type Article } from "@/lib/data";
import { supabase } from "@/lib/supabase";

type LocalizedText = {
  fr?: string;
  en?: string;
};

type SupabaseArticleRow = {
  id: string;
  slug: string;
  title?: LocalizedText | null;
  excerpt?: LocalizedText | null;
  content?: LocalizedText | null;
  published_at?: string | null;
  created_at?: string | null;
};

type ArticleMediaRow = {
  article_id: string;
  display_order?: number | null;
  media?:
    | {
        id?: string | null;
        url?: string | null;
        file_name?: string | null;
      }
    | {
        id?: string | null;
        url?: string | null;
        file_name?: string | null;
      }[]
    | null;
};

function rowToArticle(row: SupabaseArticleRow, images: string[] = []): Article {
  return {
    slug: row.slug,
    image: images[0] || staticArticles[0]?.image || "",
    gallery: images.slice(1),
    date: (row.published_at || row.created_at || new Date().toISOString()).slice(0, 10),
    category: {
      fr: "Actualites",
      en: "News",
    },
    title: {
      fr: row.title?.fr || row.slug,
      en: row.title?.en || row.title?.fr || row.slug,
    },
    excerpt: {
      fr: row.excerpt?.fr || "",
      en: row.excerpt?.en || row.excerpt?.fr || "",
    },
    content: {
      fr: row.content?.fr || "",
      en: row.content?.en || row.content?.fr || "",
    },
  };
}

export async function getSiteArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, title, excerpt, content, published_at, created_at")
    .eq("is_active", true)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    return staticArticles;
  }

  const articleIds = data.map((article) => article.id);
  const imagesByArticle = new Map<string, string[]>();

  if (articleIds.length > 0) {
    const { data: mediaLinks } = await supabase
      .from("article_media")
      .select("article_id, display_order, media:media_id(id, url, file_name)")
      .in("article_id", articleIds)
      .order("display_order", { ascending: true });

    for (const link of (mediaLinks ?? []) as ArticleMediaRow[]) {
      const media = Array.isArray(link.media) ? link.media[0] : link.media;
      if (!media?.url) continue;

      const images = imagesByArticle.get(link.article_id) ?? [];
      images.push(media.url);
      imagesByArticle.set(link.article_id, images);
    }
  }

  return data.map((row) => rowToArticle(row, imagesByArticle.get(row.id) ?? []));
}

export async function getSiteArticle(slug: string) {
  const articles = await getSiteArticles();
  return articles.find((article) => article.slug === slug);
}
