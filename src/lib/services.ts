import { services as staticServices, type Service } from "@/lib/data";
import { supabase } from "@/lib/supabase";

type LocalizedText = {
  fr?: string;
  en?: string;
};

type SupabaseServiceRow = {
  id: string;
  slug: string;
  title?: LocalizedText | null;
  short_description?: LocalizedText | null;
  long_description?: LocalizedText | null;
  icon?: string | null;
  metadata?: {
    bullets?: {
      fr?: string[];
      en?: string[];
    };
  } | null;
};

type ServiceMediaRow = {
  service_id: string;
  display_order?: number | null;
  media?:
    | {
        url?: string | null;
      }
    | {
        url?: string | null;
      }[]
    | null;
};

const fallbackGallery = staticServices[0]?.gallery ?? [];

function normalizeIcon(icon?: string | null) {
  const allowedIcons = new Set(["Building2", "PencilRuler", "Hammer", "HardHat", "ClipboardCheck"]);
  return icon && allowedIcons.has(icon) ? icon : "Building2";
}

function rowToService(row: SupabaseServiceRow, images: string[]): Service {
  const titleFr = row.title?.fr || row.slug;
  const shortFr = row.short_description?.fr || "";
  const longFr = row.long_description?.fr || shortFr;
  const bulletsFr = row.metadata?.bullets?.fr?.filter(Boolean) ?? [];
  const bulletsEn = row.metadata?.bullets?.en?.filter(Boolean) ?? [];

  return {
    id: row.slug,
    icon: normalizeIcon(row.icon),
    title: {
      fr: titleFr,
      en: row.title?.en || titleFr,
    },
    short: {
      fr: shortFr,
      en: row.short_description?.en || shortFr,
    },
    long: {
      fr: longFr,
      en: row.long_description?.en || longFr,
    },
    bullets: {
      fr: bulletsFr.length > 0 ? bulletsFr : ["Service personnalise selon votre projet"],
      en: bulletsEn.length > 0 ? bulletsEn : bulletsFr,
    },
    gallery: images.length > 0 ? images : fallbackGallery,
  };
}

export async function getSiteServices() {
  const { data, error } = await supabase
    .from("services")
    .select("id, slug, title, short_description, long_description, icon, metadata")
    .eq("is_active", true)
    .eq("status", "published")
    .order("created_at", { ascending: true });

  if (error || !data) {
    return staticServices;
  }

  const serviceIds = data.map((service) => service.id);
  const imagesByService = new Map<string, string[]>();

  if (serviceIds.length > 0) {
    const { data: mediaLinks } = await supabase
      .from("service_media")
      .select("service_id, display_order, media:media_id(url)")
      .in("service_id", serviceIds)
      .order("display_order", { ascending: true });

    for (const link of (mediaLinks ?? []) as ServiceMediaRow[]) {
      const media = Array.isArray(link.media) ? link.media[0] : link.media;
      if (!media?.url) continue;

      const images = imagesByService.get(link.service_id) ?? [];
      images.push(media.url);
      imagesByService.set(link.service_id, images);
    }
  }

  const adminServices = data.map((row) => rowToService(row, imagesByService.get(row.id) ?? []));
  return [...staticServices, ...adminServices];
}
