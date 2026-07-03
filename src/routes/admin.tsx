import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  BarChart3,
  Bell,
  BookOpenText,
  Building2,
  CalendarDays,
  ChevronRight,
  CheckCircle2,
  FileText,
  FolderKanban,
  GalleryHorizontalEnd,
  Home,
  ImagePlus,
  Layers3,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Moon,
  PenLine,
  Plus,
  Search,
  Settings,
  Sun,
  Users,
  Wrench,
} from "lucide-react";
import { createSubAdmin, listAdminUsers } from "@/lib/api/admin.functions";
import { supabase } from "@/lib/supabase";
import { useI18n, type Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { AdminLogin } from "@/components/AdminLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import logoFutura from "@/assets/logo-futura.jpg";
import heroSteel from "@/assets/hero-steel.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administration - Futura Construction" },
      { name: "description", content: "Tableau de bord d'administration Futura Construction." },
    ],
  }),
  component: AdminPage,
});

type DashboardView =
  | "overview"
  | "articles"
  | "services"
  | "contents"
  | "media"
  | "messages"
  | "users"
  | "settings";

type Metrics = {
  totalArticles: number;
  activeArticles: number;
  inactiveArticles: number;
  totalServices: number;
  totalMedia: number;
  messagesReceived: number;
};

type AdminArticleForm = {
  id?: string;
  slug: string;
  title_fr: string;
  title_en: string;
  excerpt_fr: string;
  excerpt_en: string;
  content_fr: string;
  content_en: string;
  status: string;
  is_active: boolean;
  published_at: string;
};

type AdminArticlePhoto = {
  link_id: string;
  media_id: string;
  url: string;
  file_name: string;
};

type AdminServiceForm = {
  id?: string;
  slug: string;
  title_fr: string;
  title_en: string;
  short_description_fr: string;
  short_description_en: string;
  long_description_fr: string;
  long_description_en: string;
  bullets_fr: string;
  bullets_en: string;
  icon: string;
  status: string;
  is_active: boolean;
};

type AdminContentForm = {
  id?: string;
  section_key: string;
  locale: string;
  title: string;
  subtitle: string;
  body: string;
};

type LocalizedText = {
  fr?: string;
  en?: string;
};

type AdminArticle = {
  id: string;
  slug: string;
  title?: LocalizedText | null;
  excerpt?: LocalizedText | null;
  content?: LocalizedText | null;
  is_active: boolean;
  status: string;
  published_at?: string | null;
  created_at: string;
  photos?: AdminArticlePhoto[];
};

type AdminService = {
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
  is_active: boolean;
  status: string;
  created_at: string;
  photos?: AdminServicePhoto[];
};

type AdminServicePhoto = {
  link_id: string;
  media_id: string;
  url: string;
  file_name: string;
};

type AdminContent = {
  id: string;
  section_key: string;
  locale: string;
  title?: string | null;
  subtitle?: string | null;
  body?: string | null;
  is_active: boolean;
  updated_at: string;
};

type AdminMedia = {
  id: string;
  file_name: string;
  url: string;
  mime_type?: string | null;
  size?: number | null;
  folder?: string | null;
  created_at: string;
};

type AdminMessage = {
  id: string;
  full_name: string;
  email: string;
  subject?: string | null;
  message: string;
  status: string;
  is_read: boolean;
  received_at: string;
};

type AdminProfile = {
  id: string;
  user_id: string;
  role: string;
  display_name?: string | null;
  email: string;
  is_active: boolean;
  created_at: string;
};

type NewAdminUserForm = {
  display_name: string;
  email: string;
  password: string;
  password_confirm: string;
};

type ProfileSettingsForm = {
  display_name: string;
  email: string;
  password: string;
  password_confirm: string;
};

type AdminUserListItem = {
  id: string;
  email: string;
  displayName: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
  lastSignInAt?: string | null;
};

type ConfirmationState = {
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => Promise<void> | void;
};

type SuccessState = {
  title: string;
  description: string;
};

type IconType = React.ComponentType<{ className?: string }>;

const ARTICLE_IMAGE_BUCKET = "article-images";
const MAX_ARTICLE_IMAGES = 3;
const MAX_SERVICE_IMAGES = 3;

const initialArticle: AdminArticleForm = {
  title_fr: "",
  title_en: "",
  excerpt_fr: "",
  excerpt_en: "",
  content_fr: "",
  content_en: "",
  slug: "",
  status: "draft",
  is_active: false,
  published_at: "",
};

const initialService: AdminServiceForm = {
  title_fr: "",
  title_en: "",
  short_description_fr: "",
  short_description_en: "",
  long_description_fr: "",
  long_description_en: "",
  bullets_fr: "",
  bullets_en: "",
  icon: "Building2",
  status: "published",
  is_active: true,
  slug: "",
};

const initialContent: AdminContentForm = {
  section_key: "home_hero",
  locale: "fr",
  title: "",
  subtitle: "",
  body: "",
};

const initialNewAdminUser: NewAdminUserForm = {
  display_name: "",
  email: "",
  password: "",
  password_confirm: "",
};

const initialProfileSettings: ProfileSettingsForm = {
  display_name: "",
  email: "",
  password: "",
  password_confirm: "",
};

const adminCopy = {
  fr: {
    dashboard: "Tableau de bord",
    articles: "Articles / Actualites",
    services: "Services",
    media: "Medias / Galerie",
    messages: "Messages",
    users: "Utilisateurs",
    settings: "Parametres",
    logout: "Deconnexion",
    searchPlaceholder: "Rechercher articles, services, messages, utilisateurs...",
    searchActive: "Recherche active",
    searchClear: "Effacer la recherche",
    noResult: "Aucun resultat ne correspond a votre recherche.",
    language: "Langue",
    theme: "Changer le theme",
    adminMain: "Admin principal",
    subAdmin: "Sous-admin",
    welcome: "Bienvenue, Administrateur !",
    welcomeText:
      "Gere le contenu du site Futura Construction depuis votre espace d'administration.",
    newContent: "Nouveau contenu",
    statsTitle: "Apercu des statistiques",
    statsSub: "Suivi editorial et activite du site",
    recentMessages: "Messages recents",
    recentProjects: "Projets recents",
    quickActions: "Actions rapides",
    newArticle: "Nouvel article",
    newService: "Nouveau service",
    addMedia: "Ajouter media",
    viewMessages: "Voir messages",
    articleTitle: "Articles / Actualites",
    articleDesc: "Ajout et mise a jour des publications visibles sur la page Actualites.",
    existingArticles: "Articles existants",
    editArticle: "Modifier l'article",
    addArticle: "Ajouter un article",
    serviceTitle: "Services",
    serviceDesc: "Ajout de nouveaux services sans modifier les services existants du site.",
    serviceListTitle: "Services ajoutes depuis l'administration",
    editService: "Modifier le service",
    addService: "Ajouter un nouveau service",
    contentTitle: "Contenu du site",
    contentDesc: "Blocs de texte, titres et sections editables.",
    activeContent: "Contenus actifs",
    mediaTitle: "Medias / Galerie",
    mediaDesc: "Bibliotheque visuelle utilisee par le site.",
    messagesDesc: "Demandes entrantes et prises de contact.",
    all: "Tous",
    unread: "Non lus",
    read: "Lus",
    usersTitle: "Utilisateurs",
    usersDesc: "Liste complete des comptes visibles par l'admin principal et ajout de sous-admins.",
    usersList: "Liste des utilisateurs",
    addSubAdmin: "Ajouter un sous-admin",
    settingsTitle: "Parametres du compte",
    settingsDesc: "Modifiez vos informations personnelles, votre adresse mail et votre mot de passe.",
    saveSettings: "Enregistrer les modifications",
  },
  en: {
    dashboard: "Dashboard",
    articles: "Articles / News",
    services: "Services",
    media: "Media / Gallery",
    messages: "Messages",
    users: "Users",
    settings: "Settings",
    logout: "Sign out",
    searchPlaceholder: "Search articles, services, messages, users...",
    searchActive: "Search active",
    searchClear: "Clear search",
    noResult: "No result matches your search.",
    language: "Language",
    theme: "Change theme",
    adminMain: "Main admin",
    subAdmin: "Sub-admin",
    welcome: "Welcome, Administrator!",
    welcomeText: "Manage Futura Construction website content from your admin dashboard.",
    newContent: "New content",
    statsTitle: "Statistics overview",
    statsSub: "Editorial and website activity tracking",
    recentMessages: "Recent messages",
    recentProjects: "Recent projects",
    quickActions: "Quick actions",
    newArticle: "New article",
    newService: "New service",
    addMedia: "Add media",
    viewMessages: "View messages",
    articleTitle: "Articles / News",
    articleDesc: "Add and update publications visible on the News page.",
    existingArticles: "Existing articles",
    editArticle: "Edit article",
    addArticle: "Add article",
    serviceTitle: "Services",
    serviceDesc: "Add new services without changing the existing website services.",
    serviceListTitle: "Services added from the admin",
    editService: "Edit service",
    addService: "Add a new service",
    contentTitle: "Website content",
    contentDesc: "Editable text blocks, titles and sections.",
    activeContent: "Active content",
    mediaTitle: "Media / Gallery",
    mediaDesc: "Visual library used by the website.",
    messagesDesc: "Incoming requests and contact messages.",
    all: "All",
    unread: "Unread",
    read: "Read",
    usersTitle: "Users",
    usersDesc: "Full account list visible to the main admin and sub-admin creation.",
    usersList: "User list",
    addSubAdmin: "Add a sub-admin",
    settingsTitle: "Account settings",
    settingsDesc: "Edit your personal information, email address and password.",
    saveSettings: "Save changes",
  },
} as const;

type AdminCopyKey = keyof typeof adminCopy.fr;
type AdminTranslate = (key: AdminCopyKey) => string;

function getAdminCopy(lang: Lang): AdminTranslate {
  return (key) => adminCopy[lang][key] ?? adminCopy.fr[key];
}

function normalizeAdminSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function includesAdminSearch(query: string, values: Array<string | number | boolean | null | undefined>) {
  if (!query) return true;

  return values.some((value) => normalizeAdminSearch(String(value ?? "")).includes(query));
}

function createSafeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function sanitizeFileName(fileName: string, index = 0) {
  const extension = fileName.split(".").pop()?.toLowerCase() || "jpg";
  const baseName = fileName.replace(/\.[^/.]+$/, "");
  const safeBaseName = baseName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return `${safeBaseName || "article"}-${Date.now()}-${index + 1}-${createSafeId()}.${extension}`;
}

function createSlug(value: string) {
  const slug = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return slug || `article-${Date.now()}`;
}

function createExcerpt(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= 180) return normalized;
  return `${normalized.slice(0, 177).trim()}...`;
}

function getUniqueArticleSlug(
  title: string,
  records: Array<{ id?: string; slug: string }>,
  currentRecordId?: string,
) {
  const baseSlug = createSlug(title);
  const usedSlugs = new Set(
    records
      .filter((record) => record.id !== currentRecordId)
      .map((record) => record.slug),
  );

  let slug = baseSlug;
  let suffix = 2;
  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

async function uploadArticlePhotos(articleId: string, files: File[], startOrder = 0) {
  for (const [index, file] of files.entries()) {
    if (!file.type.startsWith("image/")) {
      throw new Error(`Le fichier "${file.name}" n'est pas une image.`);
    }

    const fileName = sanitizeFileName(file.name, index);
    const storagePath = `${articleId}/${fileName}`;
    const uploadResult = await supabase.storage
      .from(ARTICLE_IMAGE_BUCKET)
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadResult.error) {
      throw new Error(`Upload de "${file.name}" impossible: ${uploadResult.error.message}`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(ARTICLE_IMAGE_BUCKET).getPublicUrl(storagePath);

    const mediaResult = await supabase
      .from("media")
      .insert({
        folder: "articles",
        file_name: file.name,
        url: publicUrl,
        mime_type: file.type,
        size: file.size,
        is_public: true,
        status: "active",
      })
      .select("id")
      .single();

    if (mediaResult.error) {
      throw new Error(`Enregistrement de "${file.name}" impossible: ${mediaResult.error.message}`);
    }

    const linkResult = await supabase.from("article_media").insert({
      article_id: articleId,
      media_id: mediaResult.data.id,
      display_order: startOrder + index,
    });

    if (linkResult.error) {
      throw new Error(`Liaison de "${file.name}" impossible: ${linkResult.error.message}`);
    }
  }
}

async function uploadServicePhotos(serviceId: string, files: File[], startOrder = 0) {
  for (const [index, file] of files.entries()) {
    if (!file.type.startsWith("image/")) {
      throw new Error(`Le fichier "${file.name}" n'est pas une image.`);
    }

    const fileName = sanitizeFileName(file.name, index);
    const storagePath = `services/${serviceId}/${fileName}`;
    const uploadResult = await supabase.storage
      .from(ARTICLE_IMAGE_BUCKET)
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadResult.error) {
      throw new Error(`Upload de "${file.name}" impossible: ${uploadResult.error.message}`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(ARTICLE_IMAGE_BUCKET).getPublicUrl(storagePath);

    const mediaResult = await supabase
      .from("media")
      .insert({
        folder: "services",
        file_name: file.name,
        url: publicUrl,
        mime_type: file.type,
        size: file.size,
        is_public: true,
        status: "active",
      })
      .select("id")
      .single();

    if (mediaResult.error) {
      throw new Error(`Enregistrement de "${file.name}" impossible: ${mediaResult.error.message}`);
    }

    const linkResult = await supabase.from("service_media").insert({
      service_id: serviceId,
      media_id: mediaResult.data.id,
      display_order: startOrder + index,
    });

    if (linkResult.error) {
      throw new Error(`Liaison de "${file.name}" impossible: ${linkResult.error.message}`);
    }
  }
}

function AdminPage() {
  const { lang, setLang } = useI18n();
  const tr = useMemo(() => getAdminCopy(lang), [lang]);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingAdmin, setCheckingAdmin] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [view, setView] = useState<DashboardView>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [services, setServices] = useState<AdminService[]>([]);
  const [contents, setContents] = useState<AdminContent[]>([]);
  const [media, setMedia] = useState<AdminMedia[]>([]);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [adminProfiles, setAdminProfiles] = useState<AdminProfile[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUserListItem[]>([]);
  const [currentAdminProfile, setCurrentAdminProfile] = useState<AdminProfile | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<AdminArticleForm>(initialArticle);
  const [selectedArticleFiles, setSelectedArticleFiles] = useState<File[]>([]);
  const [selectedService, setSelectedService] = useState<AdminServiceForm>(initialService);
  const [selectedServiceFiles, setSelectedServiceFiles] = useState<File[]>([]);
  const [selectedContent, setSelectedContent] = useState<AdminContentForm>(initialContent);
  const [newAdminUser, setNewAdminUser] = useState<NewAdminUserForm>(initialNewAdminUser);
  const [profileSettings, setProfileSettings] =
    useState<ProfileSettingsForm>(initialProfileSettings);
  const [mediaUploadUrl, setMediaUploadUrl] = useState("");
  const [messageFilter, setMessageFilter] = useState("all");
  const [saving, setSaving] = useState(false);
  const [confirmation, setConfirmation] = useState<ConfirmationState | null>(null);
  const [successDialog, setSuccessDialog] = useState<SuccessState | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    const [
      articlesRes,
      articleMediaRes,
      servicesRes,
      serviceMediaRes,
      mediaRes,
      messagesRes,
      contentsRes,
      adminProfilesRes,
    ] =
      await Promise.all([
        supabase
          .from("articles")
          .select("id, slug, title, excerpt, content, is_active, status, published_at, created_at")
          .order("created_at", { ascending: false }),
        supabase
          .from("article_media")
          .select("id, article_id, display_order, media:media_id(id, url, file_name)")
          .order("display_order", { ascending: true }),
        supabase
          .from("services")
          .select(
            "id, slug, title, short_description, long_description, icon, metadata, is_active, status, created_at",
          )
          .order("created_at", { ascending: false }),
        supabase
          .from("service_media")
          .select("id, service_id, display_order, media:media_id(id, url, file_name)")
          .order("display_order", { ascending: true }),
        supabase
          .from("media")
          .select("id, file_name, url, mime_type, size, folder, created_at")
          .order("created_at", { ascending: false }),
        supabase
          .from("messages")
          .select("id, full_name, email, subject, message, status, is_read, received_at")
          .order("received_at", { ascending: false }),
        supabase
          .from("site_contents")
          .select("id, section_key, locale, title, subtitle, body, is_active, updated_at")
          .order("updated_at", { ascending: false }),
        supabase
          .from("admin_profiles")
          .select("id, user_id, role, display_name, email, is_active, created_at")
          .order("created_at", { ascending: false }),
      ]);

    if (
      articlesRes.error ||
      articleMediaRes.error ||
      servicesRes.error ||
      serviceMediaRes.error ||
      mediaRes.error ||
      messagesRes.error ||
      contentsRes.error ||
      adminProfilesRes.error
    ) {
      setAuthError("Impossible de charger les donnees administratives.");
      setLoading(false);
      return;
    }

    const photosByArticle = new Map<string, AdminArticlePhoto[]>();
    for (const link of articleMediaRes.data ?? []) {
      const media = Array.isArray(link.media) ? link.media[0] : link.media;
      if (!media?.url || !media?.id) continue;

      const articlePhotos = photosByArticle.get(link.article_id) ?? [];
      articlePhotos.push({
        link_id: link.id,
        media_id: media.id,
        url: media.url,
        file_name: media.file_name || "image-article",
      });
      photosByArticle.set(link.article_id, articlePhotos);
    }

    const databaseArticles = (articlesRes.data ?? []).map((article) => ({
      ...article,
      photos: photosByArticle.get(article.id) ?? [],
    }));

    const photosByService = new Map<string, AdminServicePhoto[]>();
    for (const link of serviceMediaRes.data ?? []) {
      const media = Array.isArray(link.media) ? link.media[0] : link.media;
      if (!media?.url || !media?.id) continue;

      const servicePhotos = photosByService.get(link.service_id) ?? [];
      servicePhotos.push({
        link_id: link.id,
        media_id: media.id,
        url: media.url,
        file_name: media.file_name || "image-service",
      });
      photosByService.set(link.service_id, servicePhotos);
    }

    const databaseServices = (servicesRes.data ?? []).map((service) => ({
      ...service,
      photos: photosByService.get(service.id) ?? [],
    }));

    setArticles(databaseArticles);
    setServices(databaseServices);
    setMedia(mediaRes.data ?? []);
    setMessages(messagesRes.data ?? []);
    setContents(contentsRes.data ?? []);
    setAdminProfiles(adminProfilesRes.data ?? []);
    setMetrics({
      totalArticles: articlesRes.data?.length ?? 0,
      activeArticles: (articlesRes.data ?? []).filter((item) => item.is_active).length,
      inactiveArticles: (articlesRes.data ?? []).filter((item) => !item.is_active).length,
      totalServices: servicesRes.data?.length ?? 0,
      totalMedia: mediaRes.data?.length ?? 0,
      messagesReceived: messagesRes.data?.length ?? 0,
    });
    setLoading(false);
  }, []);

  const loadAdminUsers = useCallback(async () => {
    if (!session?.access_token) {
      setAdminUsers([]);
      return;
    }

    try {
      const users = await listAdminUsers({
        data: {
          accessToken: session.access_token,
        },
      });
      setAdminUsers(users);
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : "Impossible de charger la liste des utilisateurs.",
      );
    }
  }, [session?.access_token]);

  const verifyAdminAndLoad = useCallback(async () => {
    if (!session?.user?.id) return;

    setCheckingAdmin(true);
    setAuthError(null);

    const { data: adminProfile, error } = await supabase
      .from("admin_profiles")
      .select("id, user_id, role, display_name, email, is_active, created_at")
      .eq("user_id", session.user.id)
      .eq("is_active", true)
      .maybeSingle();

    if (error || !adminProfile) {
      await supabase.auth.signOut();
      setSession(null);
      setAuthError("Compte connecte, mais non autorise comme administrateur.");
      setCheckingAdmin(false);
      setLoading(false);
      return;
    }

    setCurrentAdminProfile(adminProfile);
    await loadDashboard();
    if (adminProfile.role !== "sub_admin") {
      await loadAdminUsers();
    } else {
      setAdminUsers([]);
    }
    setCheckingAdmin(false);
  }, [loadAdminUsers, loadDashboard, session]);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    init();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) return;
    verifyAdminAndLoad();
  }, [session, verifyAdminAndLoad]);

  useEffect(() => {
    if (!session) return;

    const channel = supabase
      .channel("admin-messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => {
          void loadDashboard();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [loadDashboard, session]);

  useEffect(() => {
    if (!session?.user) return;

    setProfileSettings({
      display_name: currentAdminProfile?.display_name || "",
      email: currentAdminProfile?.email || session.user.email || "",
      password: "",
      password_confirm: "",
    });
  }, [currentAdminProfile, session?.user]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setAuthError(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
      setLoading(false);
      return;
    }
    setSession(data.session);
    setAuthError(null);
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setView("overview");
    setCurrentAdminProfile(null);
  };

  const saveArticle = async () => {
    const title = selectedArticle.title_fr.trim();
    const description = selectedArticle.content_fr.trim();
    const currentPhotos = selectedArticle.id
      ? (articles.find((article) => article.id === selectedArticle.id)?.photos ?? [])
      : [];
    const totalPhotos = currentPhotos.length + selectedArticleFiles.length;

    if (!title || !description) {
      setAuthError("Le titre et la description sont requis.");
      return;
    }

    if (totalPhotos < 1) {
      setAuthError("Ajoutez au moins une image pour publier l'article.");
      return;
    }

    if (totalPhotos > MAX_ARTICLE_IMAGES) {
      setAuthError(`Un article peut contenir ${MAX_ARTICLE_IMAGES} images maximum.`);
      return;
    }

    const invalidFile = selectedArticleFiles.find((file) => !file.type.startsWith("image/"));
    if (invalidFile) {
      setAuthError(`Le fichier "${invalidFile.name}" n'est pas une image.`);
      return;
    }

    setSaving(true);
    const isEditingArticle = Boolean(selectedArticle.id);
    const slug =
      selectedArticle.id && selectedArticle.slug.trim()
        ? selectedArticle.slug.trim()
        : getUniqueArticleSlug(title, articles, selectedArticle.id);
    const excerpt = createExcerpt(description);
    const payload = {
      slug,
      title: { fr: title, en: selectedArticle.title_en.trim() || title },
      excerpt: { fr: excerpt, en: createExcerpt(selectedArticle.content_en.trim() || description) },
      content: { fr: description, en: selectedArticle.content_en.trim() || description },
      status: "published",
      is_active: true,
      published_at: selectedArticle.published_at
        ? new Date(selectedArticle.published_at).toISOString()
        : new Date().toISOString(),
    };
    const articleResult = selectedArticle.id
      ? await supabase
          .from("articles")
          .update(payload)
          .eq("id", selectedArticle.id)
          .select("id")
          .single()
      : await supabase.from("articles").insert(payload).select("id").single();

    if (articleResult.error) {
      setAuthError(articleResult.error.message);
    } else {
      if (selectedArticleFiles.length > 0) {
        const { count, error: countError } = await supabase
          .from("article_media")
          .select("id", { count: "exact", head: true })
          .eq("article_id", articleResult.data.id);

        if (countError) {
          setAuthError(countError.message);
          setSaving(false);
          return;
        }

        try {
          await uploadArticlePhotos(articleResult.data.id, selectedArticleFiles, count ?? 0);
        } catch (error) {
          setAuthError(error instanceof Error ? error.message : "Impossible d'ajouter les photos.");
          setSaving(false);
          return;
        }
      }

      await loadDashboard();
      setSelectedArticle(initialArticle);
      setSelectedArticleFiles([]);
      setAuthError(null);
      setSuccessDialog({
        title: isEditingArticle ? "Article modifie avec succes" : "Article ajoute avec succes",
        description: isEditingArticle
          ? "Les modifications de l'article ont bien ete enregistrees."
          : "Le nouvel article est maintenant disponible dans l'administration.",
      });
    }
    setSaving(false);
  };

  const deleteArticle = async (id: string) => {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) setAuthError(error.message);
    else {
      if (selectedArticle.id === id) {
        setSelectedArticle(initialArticle);
        setSelectedArticleFiles([]);
      }
      await loadDashboard();
    }
  };

  const deleteArticlePhoto = async (linkId: string) => {
    const parentArticle = articles.find((article) =>
      article.photos?.some((photo) => photo.link_id === linkId),
    );

    if (parentArticle && (parentArticle.photos?.length ?? 0) <= 1) {
      setAuthError("Un article doit garder au moins une image.");
      return;
    }

    const { error } = await supabase.from("article_media").delete().eq("id", linkId);
    if (error) setAuthError(error.message);
    else {
      await loadDashboard();
      setAuthError(null);
    }
  };

  const saveService = async () => {
    const title = selectedService.title_fr.trim();
    const shortDescription = selectedService.short_description_fr.trim();
    const longDescription = selectedService.long_description_fr.trim();
    const currentPhotos = selectedService.id
      ? (services.find((service) => service.id === selectedService.id)?.photos ?? [])
      : [];
    const totalPhotos = currentPhotos.length + selectedServiceFiles.length;
    const bullets = selectedService.bullets_fr
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!title || !shortDescription || !longDescription || bullets.length === 0) {
      setAuthError("Le titre, les descriptions et au moins un element livre sont requis.");
      return;
    }

    if (totalPhotos < 1) {
      setAuthError("Ajoutez au moins une image pour le service.");
      return;
    }

    if (totalPhotos > MAX_SERVICE_IMAGES) {
      setAuthError(`Un service peut contenir ${MAX_SERVICE_IMAGES} images maximum.`);
      return;
    }

    const invalidFile = selectedServiceFiles.find((file) => !file.type.startsWith("image/"));
    if (invalidFile) {
      setAuthError(`Le fichier "${invalidFile.name}" n'est pas une image.`);
      return;
    }

    setSaving(true);
    const isEditingService = Boolean(selectedService.id);
    const slug =
      selectedService.id && selectedService.slug.trim()
        ? selectedService.slug.trim()
        : getUniqueArticleSlug(title, services, selectedService.id);
    const englishBullets = selectedService.bullets_en
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    const payload = {
      slug,
      title: { fr: title, en: selectedService.title_en.trim() || title },
      short_description: {
        fr: shortDescription,
        en: selectedService.short_description_en.trim() || shortDescription,
      },
      long_description: {
        fr: longDescription,
        en: selectedService.long_description_en.trim() || longDescription,
      },
      icon: selectedService.icon,
      status: "published",
      is_active: true,
      metadata: {
        bullets: {
          fr: bullets,
          en: englishBullets.length > 0 ? englishBullets : bullets,
        },
      },
    };

    const serviceResult = selectedService.id
      ? await supabase
          .from("services")
          .update(payload)
          .eq("id", selectedService.id)
          .select("id")
          .single()
      : await supabase.from("services").insert(payload).select("id").single();

    if (serviceResult.error) setAuthError(serviceResult.error.message);
    else {
      if (selectedServiceFiles.length > 0) {
        try {
          await uploadServicePhotos(serviceResult.data.id, selectedServiceFiles, currentPhotos.length);
        } catch (error) {
          if (!selectedService.id) {
            await supabase.from("services").delete().eq("id", serviceResult.data.id);
          }
          setAuthError(error instanceof Error ? error.message : "Impossible d'ajouter les images.");
          setSaving(false);
          return;
        }
      }

      await loadDashboard();
      setSelectedService(initialService);
      setSelectedServiceFiles([]);
      setAuthError(null);
      setSuccessDialog({
        title: isEditingService ? "Service modifie avec succes" : "Service ajoute avec succes",
        description: isEditingService
          ? "Les modifications du service ont bien ete enregistrees."
          : "Le nouveau service a bien ete ajoute au catalogue.",
      });
    }
    setSaving(false);
  };

  const deleteService = async (id: string) => {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) setAuthError(error.message);
    else {
      if (selectedService.id === id) {
        setSelectedService(initialService);
        setSelectedServiceFiles([]);
      }
      await loadDashboard();
    }
  };

  const deleteServicePhoto = async (linkId: string) => {
    const parentService = services.find((service) =>
      service.photos?.some((photo) => photo.link_id === linkId),
    );

    if (parentService && (parentService.photos?.length ?? 0) <= 1) {
      setAuthError("Un service doit garder au moins une image.");
      return;
    }

    const { error } = await supabase.from("service_media").delete().eq("id", linkId);
    if (error) setAuthError(error.message);
    else {
      await loadDashboard();
      setAuthError(null);
    }
  };

  const addSubAdmin = async () => {
    const email = newAdminUser.email
      .trim()
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .toLowerCase();
    const displayName = newAdminUser.display_name.trim();
    const password = newAdminUser.password;
    const passwordConfirm = newAdminUser.password_confirm;

    if (!displayName || !email || !password || !passwordConfirm) {
      setAuthError("Le nom, l'email, le mot de passe et la confirmation sont requis.");
      return;
    }

    if (password.length < 6) {
      setAuthError("Le mot de passe doit contenir au moins 6 caracteres.");
      return;
    }

    if (password !== passwordConfirm) {
      setAuthError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAuthError("Adresse email invalide.");
      return;
    }

    if (!session?.access_token) {
      setAuthError("Session administrateur introuvable. Reconnectez-vous puis reessayez.");
      return;
    }

    setSaving(true);

    try {
      await createSubAdmin({
        data: {
          accessToken: session.access_token,
          displayName,
          email,
          password,
          passwordConfirm,
        },
      });
      await loadDashboard();
      await loadAdminUsers();
      setNewAdminUser(initialNewAdminUser);
      setAuthError(null);
      setSuccessDialog({
        title: "Utilisateur ajoute avec succes",
        description: `${displayName} peut maintenant se connecter a l'administration.`,
      });
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Impossible de creer le sous-admin.");
    }

    setSaving(false);
  };

  const saveProfileSettings = async () => {
    if (!session?.user?.id || !currentAdminProfile) {
      setAuthError("Session administrateur introuvable. Reconnectez-vous puis reessayez.");
      return;
    }

    const displayName = profileSettings.display_name.trim();
    const email = profileSettings.email
      .trim()
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .toLowerCase();
    const password = profileSettings.password;
    const passwordConfirm = profileSettings.password_confirm;

    if (!displayName || !email) {
      setAuthError("Le nom et l'adresse mail sont requis.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAuthError("Adresse mail invalide.");
      return;
    }

    if ((password || passwordConfirm) && password !== passwordConfirm) {
      setAuthError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    if (password && password.length < 6) {
      setAuthError("Le mot de passe doit contenir au moins 6 caracteres.");
      return;
    }

    setSaving(true);

    const authPayload: {
      email?: string;
      password?: string;
      data: { display_name: string };
    } = {
      data: {
        display_name: displayName,
      },
    };

    if (email !== (session.user.email ?? "").toLowerCase()) {
      authPayload.email = email;
    }

    if (password) {
      authPayload.password = password;
    }

    const { error: authUpdateError } = await supabase.auth.updateUser(authPayload);

    if (authUpdateError) {
      setAuthError(authUpdateError.message);
      setSaving(false);
      return;
    }

    const { error: profileError } = await supabase
      .from("admin_profiles")
      .update({
        display_name: displayName,
        email,
      })
      .eq("user_id", session.user.id);

    if (profileError) {
      setAuthError(profileError.message);
      setSaving(false);
      return;
    }

    const {
      data: { session: refreshedSession },
    } = await supabase.auth.getSession();

    setSession(refreshedSession ?? session);
    setCurrentAdminProfile({
      ...currentAdminProfile,
      display_name: displayName,
      email,
    });
    setProfileSettings({
      display_name: displayName,
      email,
      password: "",
      password_confirm: "",
    });
    await loadDashboard();
    if (currentAdminProfile.role !== "sub_admin") {
      await loadAdminUsers();
    }
    setAuthError(null);
    setSuccessDialog({
      title: "Parametres mis a jour",
      description: password
        ? "Vos informations et votre mot de passe ont bien ete modifies."
        : "Vos informations de compte ont bien ete modifiees.",
    });
    setSaving(false);
  };

  const saveContent = async () => {
    if (!selectedContent.section_key.trim() || !selectedContent.locale.trim()) {
      setAuthError("La cle de section et la langue sont requises.");
      return;
    }
    setSaving(true);
    const payload = {
      section_key: selectedContent.section_key,
      locale: selectedContent.locale,
      title: selectedContent.title,
      subtitle: selectedContent.subtitle,
      body: selectedContent.body,
      is_active: true,
    };
    const { error } = selectedContent.id
      ? await supabase.from("site_contents").update(payload).eq("id", selectedContent.id)
      : await supabase.from("site_contents").insert(payload);
    if (error) setAuthError(error.message);
    else {
      await loadDashboard();
      setSelectedContent(initialContent);
      setAuthError(null);
    }
    setSaving(false);
  };

  const deleteContent = async (id: string) => {
    const { error } = await supabase.from("site_contents").delete().eq("id", id);
    if (error) setAuthError(error.message);
    else await loadDashboard();
  };

  const markMessage = async (id: string, isRead: boolean) => {
    const { error } = await supabase
      .from("messages")
      .update({ is_read: isRead, status: isRead ? "read" : "new" })
      .eq("id", id);
    if (error) setAuthError(error.message);
    else await loadDashboard();
  };

  const deleteMessage = async (id: string) => {
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) setAuthError(error.message);
    else await loadDashboard();
  };

  const uploadMedia = async () => {
    if (!mediaUploadUrl.trim()) {
      setAuthError("L'URL du media est requise.");
      return;
    }
    setSaving(true);
    const payload = {
      file_name: mediaUploadUrl.split("/").pop() ?? "imported-image",
      url: mediaUploadUrl,
      mime_type: "image/jpeg",
      folder: "uploads",
      size: 0,
      is_public: true,
    };
    const { error } = await supabase.from("media").insert(payload);
    if (error) setAuthError(error.message);
    else {
      await loadDashboard();
      setMediaUploadUrl("");
      setAuthError(null);
    }
    setSaving(false);
  };

  const normalizedSearch = useMemo(() => normalizeAdminSearch(searchQuery), [searchQuery]);

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) =>
        includesAdminSearch(normalizedSearch, [
          article.slug,
          article.title?.fr,
          article.title?.en,
          article.excerpt?.fr,
          article.excerpt?.en,
          article.content?.fr,
          article.content?.en,
          article.status,
        ]),
      ),
    [articles, normalizedSearch],
  );

  const filteredServices = useMemo(
    () =>
      services.filter((service) =>
        includesAdminSearch(normalizedSearch, [
          service.slug,
          service.title?.fr,
          service.title?.en,
          service.short_description?.fr,
          service.short_description?.en,
          service.long_description?.fr,
          service.long_description?.en,
          service.metadata?.bullets?.fr?.join(" "),
          service.metadata?.bullets?.en?.join(" "),
          service.status,
        ]),
      ),
    [normalizedSearch, services],
  );

  const filteredContents = useMemo(
    () =>
      contents.filter((content) =>
        includesAdminSearch(normalizedSearch, [
          content.section_key,
          content.locale,
          content.title,
          content.subtitle,
          content.body,
        ]),
      ),
    [contents, normalizedSearch],
  );

  const filteredMedia = useMemo(
    () =>
      media.filter((item) =>
        includesAdminSearch(normalizedSearch, [
          item.file_name,
          item.url,
          item.mime_type,
          item.folder,
        ]),
      ),
    [media, normalizedSearch],
  );

  const filteredMessages = useMemo(() => {
    const byStatus =
      messageFilter === "unread"
        ? messages.filter((item) => !item.is_read)
        : messageFilter === "read"
          ? messages.filter((item) => item.is_read)
          : messages;

    return byStatus.filter((message) =>
      includesAdminSearch(normalizedSearch, [
        message.full_name,
        message.email,
        message.subject,
        message.message,
        message.status,
      ]),
    );
  }, [messages, messageFilter, normalizedSearch]);

  const filteredAdminProfiles = useMemo(
    () =>
      adminProfiles.filter((profile) =>
        includesAdminSearch(normalizedSearch, [
          profile.display_name,
          profile.email,
          profile.role,
          profile.is_active,
        ]),
      ),
    [adminProfiles, normalizedSearch],
  );

  const filteredAdminUsers = useMemo(
    () =>
      adminUsers.filter((user) =>
        includesAdminSearch(normalizedSearch, [
          user.displayName,
          user.email,
          user.role,
          user.isActive,
          user.createdAt,
          user.lastSignInAt,
        ]),
      ),
    [adminUsers, normalizedSearch],
  );

  const unreadMessages = messages.filter((message) => !message.is_read).length;
  const canManageUsers = Boolean(currentAdminProfile && currentAdminProfile.role !== "sub_admin");
  const openUnreadMessages = useCallback(() => {
    setMessageFilter("unread");
    setView("messages");
  }, []);

  useEffect(() => {
    if (view === "users" && !canManageUsers) {
      setView("overview");
    }
  }, [canManageUsers, view]);

  if ((loading && !session) || checkingAdmin) {
    return <AdminPreloader />;
  }

  if (!session) {
    return <AdminLogin onSubmit={signIn} loading={loading} error={authError} />;
  }

  return (
    <div className="admin-shell min-h-screen bg-[#f4f7fb] text-slate-950">
      <div className="grid min-h-screen lg:h-screen lg:grid-cols-[300px_1fr] lg:overflow-hidden">
        <AdminSidebar
          view={view}
          unreadMessages={unreadMessages}
          canManageUsers={canManageUsers}
          tr={tr}
          onNavigate={setView}
          onSignOut={signOut}
        />

        <div className="min-w-0 lg:overflow-y-auto">
          <AdminTopbar
            session={session}
            unreadMessages={unreadMessages}
            adminProfile={currentAdminProfile}
            searchQuery={searchQuery}
            lang={lang}
            tr={tr}
            onSearchChange={setSearchQuery}
            onLanguageToggle={() => setLang(lang === "fr" ? "en" : "fr")}
            onNotificationsClick={openUnreadMessages}
          />

          <main className="space-y-5 px-4 pb-8 pt-4 sm:px-6 xl:px-8">
            {authError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {authError}
              </div>
            )}

            {normalizedSearch && (
              <div className="flex flex-col gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-900 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  {tr("searchActive")}: <strong>{searchQuery}</strong>
                </span>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                >
                  {tr("searchClear")}
                </Button>
              </div>
            )}

            {view === "overview" && (
              <OverviewPanel
                metrics={metrics}
                articles={filteredArticles}
                services={filteredServices}
                contents={filteredContents}
                media={filteredMedia}
                messages={filteredMessages}
                unreadMessages={unreadMessages}
                tr={tr}
                onNavigate={setView}
              />
            )}

            {view === "articles" && (
              <ArticlePanel
                articles={filteredArticles}
                allArticles={articles}
                selectedArticle={selectedArticle}
                selectedArticleFiles={selectedArticleFiles}
                saving={saving}
                tr={tr}
                onSelect={setSelectedArticle}
                onFilesChange={setSelectedArticleFiles}
                onSave={saveArticle}
                onDelete={(id) =>
                  setConfirmation({
                    title: "Supprimer cet article ?",
                    description:
                      "Cette action supprimera l'article et ses liaisons d'images. Elle ne pourra pas etre annulee depuis l'administration.",
                    confirmLabel: "Supprimer l'article",
                    onConfirm: () => deleteArticle(id),
                  })
                }
                onDeletePhoto={deleteArticlePhoto}
                onReset={() => {
                  setSelectedArticle(initialArticle);
                  setSelectedArticleFiles([]);
                }}
              />
            )}

            {view === "services" && (
              <ServicePanel
                services={filteredServices}
                allServices={services}
                selectedService={selectedService}
                selectedServiceFiles={selectedServiceFiles}
                saving={saving}
                tr={tr}
                onSelect={setSelectedService}
                onFilesChange={setSelectedServiceFiles}
                onSave={saveService}
                onDelete={(id) =>
                  setConfirmation({
                    title: "Supprimer ce service ?",
                    description:
                      "Le service ajoute depuis l'administration sera retire de la page Services. Les services historiques du site ne sont pas touches.",
                    confirmLabel: "Supprimer le service",
                    onConfirm: () => deleteService(id),
                  })
                }
                onDeletePhoto={deleteServicePhoto}
                onReset={() => {
                  setSelectedService(initialService);
                  setSelectedServiceFiles([]);
                }}
              />
            )}

            {view === "contents" && (
              <ContentPanel
                contents={filteredContents}
                selectedContent={selectedContent}
                saving={saving}
                tr={tr}
                onSelect={setSelectedContent}
                onSave={saveContent}
                onDelete={deleteContent}
                onReset={() => setSelectedContent(initialContent)}
              />
            )}

            {view === "media" && (
              <MediaPanel
                media={filteredMedia}
                mediaUploadUrl={mediaUploadUrl}
                saving={saving}
                tr={tr}
                onUrlChange={setMediaUploadUrl}
                onUpload={uploadMedia}
              />
            )}

            {view === "messages" && (
              <MessagePanel
                messages={filteredMessages}
                filter={messageFilter}
                tr={tr}
                onFilterChange={setMessageFilter}
                onMark={markMessage}
                onDelete={deleteMessage}
              />
            )}

            {view === "users" && canManageUsers && (
              <UsersPanel
                profiles={filteredAdminProfiles}
                users={filteredAdminUsers}
                newAdminUser={newAdminUser}
                saving={saving}
                tr={tr}
                onChange={setNewAdminUser}
                onAdd={addSubAdmin}
              />
            )}

            {view === "settings" && (
              <SettingsPanel
                profile={profileSettings}
                saving={saving}
                tr={tr}
                onChange={setProfileSettings}
                onSave={saveProfileSettings}
              />
            )}
          </main>
        </div>
      </div>
      <ConfirmActionDialog
        action={confirmation}
        onClose={() => setConfirmation(null)}
      />
      <SuccessDialog action={successDialog} onClose={() => setSuccessDialog(null)} />
    </div>
  );
}

function AdminPreloader() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f4f7fb] px-4 text-slate-900">
      <div className="flex flex-col items-center text-center">
        <div className="relative grid h-28 w-28 place-items-center">
          <span className="absolute inset-0 rounded-full border border-slate-200 bg-white shadow-xl shadow-slate-200/70" />
          <span className="absolute inset-0 rounded-full border-4 border-transparent border-r-blue-700 border-t-red-600 animate-spin" />
          <img
            src={logoFutura}
            alt="Futura Construction"
            className="relative h-16 w-16 rounded-full object-cover"
          />
        </div>
        <div className="mt-6 space-y-2">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-red-600">
            Futura Construction
          </p>
          <h1 className="text-xl font-black text-slate-950">Préparation de l'espace admin</h1>
          <p className="text-sm font-medium text-slate-500">
            Vérification sécurisée de votre session
          </p>
        </div>
        <div className="mt-6 flex gap-2" aria-hidden="true">
          <span className="h-2 w-8 rounded-full bg-red-600" />
          <span className="h-2 w-2 rounded-full bg-blue-700" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
        </div>
      </div>
    </div>
  );
}

function AdminSidebar({
  view,
  unreadMessages,
  canManageUsers,
  tr,
  onNavigate,
  onSignOut,
}: {
  view: DashboardView;
  unreadMessages: number;
  canManageUsers: boolean;
  tr: AdminTranslate;
  onNavigate: (view: DashboardView) => void;
  onSignOut: () => void;
}) {
  const navItems: Array<{ id: DashboardView; label: string; Icon: IconType; badge?: number }> = [
    { id: "overview", label: tr("dashboard"), Icon: Home },
    { id: "articles", label: tr("articles"), Icon: FileText },
    { id: "services", label: tr("services"), Icon: Layers3 },
    { id: "media", label: tr("media"), Icon: GalleryHorizontalEnd },
    { id: "messages", label: tr("messages"), Icon: Mail, badge: unreadMessages },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen overflow-hidden bg-[#06275b] text-white lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,0,28,0.24),transparent_38%),linear-gradient(180deg,rgba(2,14,38,0.05),rgba(2,14,38,0.86))]" />
      <img
        src={heroSteel}
        alt=""
        className="absolute inset-x-0 bottom-0 h-72 w-full object-cover opacity-20"
      />
      <div className="relative z-10 flex h-screen flex-col overflow-y-auto p-5">
        <div className="mb-7 flex items-center gap-3 px-2">
          <img
            src={logoFutura}
            alt="Futura Construction"
            className="h-16 w-16 rounded-lg object-cover"
          />
          <div>
            <p className="text-2xl font-black leading-none tracking-tight">FUTURA</p>
            <p className="text-sm font-bold tracking-[0.24em]">CONSTRUCTION</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-blue-100">
              Administration
            </p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {navItems.map(({ id, label, Icon, badge }) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={cn(
                "flex h-12 w-full items-center gap-3 rounded-lg px-4 text-left text-sm font-bold transition",
                view === id
                  ? "bg-red-600 text-white shadow-lg shadow-red-950/25"
                  : "text-blue-50 hover:bg-white/10",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1">{label}</span>
              {badge ? (
                <span className="grid h-6 min-w-6 place-items-center rounded-full bg-red-600 px-2 text-xs text-white">
                  {badge}
                </span>
              ) : null}
              {id === "services" ? <ChevronRight className="h-4 w-4 opacity-80" /> : null}
            </button>
          ))}
        </nav>

        <div className="mt-6 space-y-1.5">
          {[
            ...(canManageUsers
              ? [{ id: "users" as DashboardView, label: tr("users"), Icon: Users }]
              : []),
            { id: "settings" as DashboardView, label: tr("settings"), Icon: Settings },
          ].map(({ id, label, Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => onNavigate(id)}
              className="flex h-11 w-full items-center gap-3 rounded-lg px-4 text-left text-sm font-semibold text-blue-100 transition hover:bg-white/10"
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-auto space-y-4">
          <Button
            type="button"
            onClick={onSignOut}
            className="h-12 w-full justify-start gap-3 rounded-lg bg-red-600 font-bold text-white hover:bg-red-700"
          >
            <LogOut className="h-5 w-5" />
            {tr("logout")}
          </Button>
        </div>
      </div>
    </aside>
  );
}

function AdminTopbar({
  session,
  unreadMessages,
  adminProfile,
  searchQuery,
  lang,
  tr,
  onSearchChange,
  onLanguageToggle,
  onNotificationsClick,
}: {
  session: Session;
  unreadMessages: number;
  adminProfile: AdminProfile | null;
  searchQuery: string;
  lang: Lang;
  tr: AdminTranslate;
  onSearchChange: (value: string) => void;
  onLanguageToggle: () => void;
  onNotificationsClick: () => void;
}) {
  const { theme, toggle } = useTheme();
  const displayName = adminProfile?.display_name || "Administrateur";
  const roleLabel = adminProfile?.role === "sub_admin" ? tr("subAdmin") : tr("adminMain");

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 px-4 py-3 shadow-sm backdrop-blur sm:px-6 xl:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative max-w-xl flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-11 rounded-lg border-slate-200 bg-slate-50 pl-11 pr-11 text-sm"
            placeholder={tr("searchPlaceholder")}
          />
          <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-900" />
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={onNotificationsClick}
            className="relative grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            aria-label="Voir les messages non lus"
          >
            <Bell className="h-5 w-5" />
            {unreadMessages ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                {unreadMessages}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={onLanguageToggle}
            className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-black transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            aria-label={tr("language")}
          >
            {lang.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={toggle}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            aria-label={tr("theme")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-black text-white">
              {displayName.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-black">{displayName}</p>
              <p className="text-xs font-medium text-slate-500">{session.user.email}</p>
              <p className="text-[11px] font-bold uppercase tracking-wide text-red-600">
                {roleLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function OverviewPanel({
  metrics,
  articles,
  services,
  contents,
  media,
  messages,
  unreadMessages,
  tr,
  onNavigate,
}: {
  metrics: Metrics | null;
  articles: AdminArticle[];
  services: AdminService[];
  contents: AdminContent[];
  media: AdminMedia[];
  messages: AdminMessage[];
  unreadMessages: number;
  tr: AdminTranslate;
  onNavigate: (view: DashboardView) => void;
}) {
  const recentProjects = [
    { title: "Hangar Industriel", city: "Douala, Cameroun", image: project1 },
    { title: "Entrepot Metallique", city: "Yaounde, Cameroun", image: project2 },
    { title: "Charpente Metallique", city: "Kribi, Cameroun", image: project3 },
    { title: "Batiment Commercial", city: "Douala, Cameroun", image: project4 },
  ];

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-lg bg-[#06275b] p-6 text-white shadow-sm">
        <img
          src={heroSteel}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#06275b] via-[#06275b]/85 to-[#06275b]/25" />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black sm:text-3xl">{tr("welcome")}</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-blue-50 sm:text-base">
              {tr("welcomeText")}
            </p>
          </div>
          <Button
            type="button"
            onClick={() => onNavigate("articles")}
            className="h-12 gap-2 rounded-lg bg-red-600 px-5 font-bold text-white hover:bg-red-700"
          >
            <Plus className="h-5 w-5" />
            {tr("newContent")}
          </Button>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <KpiCard
          label="Articles"
          value={metrics?.totalArticles ?? 0}
          note={`${metrics?.activeArticles ?? 0} publies`}
          Icon={FileText}
          tone="blue"
        />
        <KpiCard
          label="Services"
          value={metrics?.totalServices ?? 0}
          note="Catalogue actif"
          Icon={Layers3}
          tone="red"
        />
        <KpiCard
          label="Messages"
          value={metrics?.messagesReceived ?? 0}
          note={`${unreadMessages} non lus`}
          Icon={Mail}
          tone="green"
        />
        <KpiCard
          label="Medias"
          value={metrics?.totalMedia ?? 0}
          note="Bibliotheque"
          Icon={GalleryHorizontalEnd}
          tone="violet"
        />
        <KpiCard
          label="Contenus"
          value={contents.length}
          note="Blocs du site"
          Icon={BookOpenText}
          tone="orange"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.5fr_0.9fr]">
        <PanelCard className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black">{tr("statsTitle")}</h2>
              <p className="text-sm text-slate-500">{tr("statsSub")}</p>
            </div>
            <Badge variant="outline" className="gap-2 rounded-lg px-3 py-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              30 derniers jours
            </Badge>
          </div>
          <div className="grid gap-5 md:grid-cols-[170px_1fr]">
            <div className="space-y-4 text-sm">
              <LegendItem color="bg-blue-600" label="Visiteurs" value="2.540" />
              <LegendItem color="bg-red-600" label="Pages vues" value="6.890" />
              <LegendItem color="bg-green-600" label="Messages" value={messages.length} />
              <LegendItem color="bg-orange-500" label="Articles publies" value={articles.length} />
              <LegendItem color="bg-violet-600" label="Services modifies" value={services.length} />
            </div>
            <LineStats />
          </div>
        </PanelCard>

        <PanelCard className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-black">{tr("recentMessages")}</h2>
            <Badge className="rounded-full bg-red-600 text-white">{unreadMessages}</Badge>
          </div>
          <div className="space-y-4">
            {messages.slice(0, 5).map((message) => (
              <button
                key={message.id}
                type="button"
                onClick={() => onNavigate("messages")}
                className="flex w-full items-center gap-3 text-left"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-900 text-xs font-black text-white">
                  {message.full_name.slice(0, 1)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black">{message.full_name}</p>
                  <p className="truncate text-xs text-slate-500">
                    {message.subject || "Sans objet"}
                  </p>
                </div>
                {!message.is_read ? <span className="h-2 w-2 rounded-full bg-red-600" /> : null}
              </button>
            ))}
            {!messages.length ? (
              <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                Aucun message pour le moment.
              </p>
            ) : null}
          </div>
        </PanelCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.5fr_0.9fr]">
        <PanelCard className="p-5">
          <h2 className="mb-5 text-lg font-black">Activites recentes</h2>
          <div className="space-y-4">
            <ActivityItem
              Icon={PenLine}
              title="Nouvel article publie"
              text={articles[0]?.slug ?? "Actualite du site"}
            />
            <ActivityItem
              Icon={Mail}
              title="Nouveau message recu"
              text={messages[0]?.full_name ?? "Boite de reception"}
            />
            <ActivityItem
              Icon={Wrench}
              title="Service modifie"
              text={services[0]?.slug ?? "Catalogue services"}
            />
            <ActivityItem
              Icon={ImagePlus}
              title="Media ajoute"
              text={media[0]?.file_name ?? "Galerie"}
            />
          </div>
        </PanelCard>

        <PanelCard className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black">{tr("recentProjects")}</h2>
            <button type="button" className="text-sm font-bold text-red-600">
              Voir tous
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {recentProjects.map((project) => (
              <div
                key={project.title}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <img src={project.image} alt={project.title} className="h-28 w-full object-cover" />
                <div className="p-3">
                  <p className="font-black">{project.title}</p>
                  <p className="text-xs text-slate-500">{project.city}</p>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard className="p-5">
          <h2 className="mb-5 text-lg font-black">{tr("quickActions")}</h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickAction
              Icon={PenLine}
              label={tr("newArticle")}
              onClick={() => onNavigate("articles")}
            />
            <QuickAction
              Icon={Layers3}
              label={tr("newService")}
              onClick={() => onNavigate("services")}
            />
            <QuickAction
              Icon={ImagePlus}
              label={tr("addMedia")}
              onClick={() => onNavigate("media")}
            />
            <QuickAction Icon={Mail} label={tr("viewMessages")} onClick={() => onNavigate("messages")} />
            <QuickAction
              Icon={Settings}
              label={tr("settings")}
              onClick={() => onNavigate("settings")}
            />
          </div>
        </PanelCard>
      </div>
    </div>
  );
}

function ArticlePanel(props: {
  articles: AdminArticle[];
  allArticles: AdminArticle[];
  selectedArticle: AdminArticleForm;
  selectedArticleFiles: File[];
  saving: boolean;
  tr: AdminTranslate;
  onSelect: (article: AdminArticleForm) => void;
  onFilesChange: (files: File[]) => void;
  onSave: () => void;
  onDelete: (id: string) => void;
  onDeletePhoto: (linkId: string) => void;
  onReset: () => void;
}) {
  return (
    <ManagementShell
      title={props.tr("articleTitle")}
      description={props.tr("articleDesc")}
      listTitle={props.tr("existingArticles")}
      formTitle={props.selectedArticle.id ? props.tr("editArticle") : props.tr("addArticle")}
      list={
        props.articles.length ? (
          props.articles.map((article) => (
            <RecordRow
              key={article.id}
              title={article.title?.fr || article.slug}
              meta={`${article.photos?.length ?? 0} image${
                (article.photos?.length ?? 0) > 1 ? "s" : ""
              } - ${article.is_active ? "Publie" : "Masque"}`}
              viewHref={`/articles/${encodeURIComponent(article.slug)}`}
              onEdit={() => {
                props.onFilesChange([]);
                props.onSelect({
                  id: article.id,
                  slug: article.slug,
                  status: article.status,
                  is_active: article.is_active,
                  published_at: article.published_at ? article.published_at.slice(0, 10) : "",
                  title_fr: article.title?.fr ?? "",
                  title_en: article.title?.en ?? "",
                  excerpt_fr: article.excerpt?.fr ?? "",
                  excerpt_en: article.excerpt?.en ?? "",
                  content_fr: article.content?.fr || article.excerpt?.fr || "",
                  content_en:
                    article.content?.en || article.content?.fr || article.excerpt?.fr || "",
                });
              }}
              onDelete={() => props.onDelete(article.id)}
            />
          ))
        ) : (
          <EmptySearchState text={props.tr("noResult")} />
        )
      }
    >
      <Field
        label="Titre"
        value={props.selectedArticle.title_fr}
        onChange={(value) =>
          props.onSelect({
            ...props.selectedArticle,
            title_fr: value,
            title_en: value,
          })
        }
      />
      <Field
        label="Description"
        textarea
        value={props.selectedArticle.content_fr}
        onChange={(value) =>
          props.onSelect({
            ...props.selectedArticle,
            content_fr: value,
            content_en: value,
            excerpt_fr: createExcerpt(value),
            excerpt_en: createExcerpt(value),
          })
        }
      />
      <ArticlePhotoPicker
        currentPhotos={
          props.selectedArticle.id
            ? (props.allArticles.find((article) => article.id === props.selectedArticle.id)
                ?.photos ?? [])
            : []
        }
        selectedFiles={props.selectedArticleFiles}
        onFilesChange={props.onFilesChange}
        onDeletePhoto={props.onDeletePhoto}
      />
      <FormActions saving={props.saving} onSave={props.onSave} onReset={props.onReset} />
    </ManagementShell>
  );
}

function ArticlePhotoPicker({
  currentPhotos,
  selectedFiles,
  onFilesChange,
  onDeletePhoto,
}: {
  currentPhotos: AdminArticlePhoto[];
  selectedFiles: File[];
  onFilesChange: (files: File[]) => void;
  onDeletePhoto: (linkId: string) => void;
}) {
  const remainingSlots = Math.max(
    MAX_ARTICLE_IMAGES - currentPhotos.length - selectedFiles.length,
    0,
  );
  const selectedPreviews = React.useMemo(
    () =>
      selectedFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    [selectedFiles],
  );

  useEffect(() => {
    return () => {
      selectedPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [selectedPreviews]);

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="space-y-2">
        <Label>
          Images de l'article ({currentPhotos.length + selectedFiles.length}/{MAX_ARTICLE_IMAGES})
        </Label>
        <Input
          type="file"
          accept="image/*"
          multiple
          disabled={remainingSlots === 0}
          className="bg-white"
          onChange={(event) => {
            const nextFiles = Array.from(event.target.files ?? []).filter((file) =>
              file.type.startsWith("image/"),
            );
            const existingKeys = new Set(
              selectedFiles.map((file) => `${file.name}-${file.size}-${file.lastModified}`),
            );
            const uniqueNextFiles = nextFiles.filter((file) => {
              const key = `${file.name}-${file.size}-${file.lastModified}`;
              if (existingKeys.has(key)) return false;
              existingKeys.add(key);
              return true;
            });

            onFilesChange([...selectedFiles, ...uniqueNextFiles].slice(0, MAX_ARTICLE_IMAGES - currentPhotos.length));
            event.currentTarget.value = "";
          }}
        />
        <p className="text-xs font-medium text-slate-500">
          Minimum 1 image, maximum {MAX_ARTICLE_IMAGES}. La premiere image devient la couverture.
        </p>
      </div>

      {currentPhotos.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-black text-slate-700">Photos deja publiees</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {currentPhotos.map((photo) => (
              <div
                key={photo.link_id}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <img src={photo.url} alt={photo.file_name} className="h-32 w-full object-cover" />
                <div className="flex items-center justify-between gap-2 p-3">
                  <span className="truncate text-xs font-bold text-slate-600">
                    {photo.file_name}
                  </span>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeletePhoto(photo.link_id)}
                  >
                    Retirer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPreviews.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-black text-slate-700">Nouvelles photos a envoyer</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {selectedPreviews.map((preview) => (
              <div
                key={`${preview.file.name}-${preview.file.lastModified}`}
                className="overflow-hidden rounded-lg border border-dashed border-red-200 bg-white"
              >
                <img
                  src={preview.url}
                  alt={preview.file.name}
                  className="h-32 w-full object-cover"
                />
                <div className="flex items-center justify-between gap-2 p-3">
                  <p className="truncate text-xs font-bold text-slate-600">{preview.file.name}</p>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      onFilesChange(
                        selectedFiles.filter((file) => file !== preview.file),
                      )
                    }
                  >
                    Retirer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ServicePanel(props: {
  services: AdminService[];
  allServices: AdminService[];
  selectedService: AdminServiceForm;
  selectedServiceFiles: File[];
  saving: boolean;
  tr: AdminTranslate;
  onSelect: (service: AdminServiceForm) => void;
  onFilesChange: (files: File[]) => void;
  onSave: () => void;
  onDelete: (id: string) => void;
  onDeletePhoto: (linkId: string) => void;
  onReset: () => void;
}) {
  return (
    <ManagementShell
      title={props.tr("serviceTitle")}
      description={props.tr("serviceDesc")}
      listTitle={props.tr("serviceListTitle")}
      formTitle={props.selectedService.id ? props.tr("editService") : props.tr("addService")}
      list={
        props.services.length ? (
          props.services.map((service) => (
            <RecordRow
              key={service.id}
              title={service.title?.fr || service.slug}
              meta={`${service.photos?.length ?? 0} image${
                (service.photos?.length ?? 0) > 1 ? "s" : ""
              } - ajoute depuis Supabase`}
              onEdit={() => {
                props.onFilesChange([]);
                props.onSelect({
                  id: service.id,
                  slug: service.slug,
                  title_fr: service.title?.fr ?? "",
                  title_en: service.title?.en ?? "",
                  short_description_fr: service.short_description?.fr ?? "",
                  short_description_en:
                    service.short_description?.en ?? service.short_description?.fr ?? "",
                  long_description_fr: service.long_description?.fr ?? "",
                  long_description_en:
                    service.long_description?.en ?? service.long_description?.fr ?? "",
                  bullets_fr: service.metadata?.bullets?.fr?.join("\n") ?? "",
                  bullets_en:
                    service.metadata?.bullets?.en?.join("\n") ??
                    service.metadata?.bullets?.fr?.join("\n") ??
                    "",
                  icon: service.icon || "Building2",
                  status: service.status,
                  is_active: service.is_active,
                });
              }}
              onDelete={() => props.onDelete(service.id)}
            />
          ))
        ) : (
          <EmptySearchState text={props.tr("noResult")} />
        )
      }
    >
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-medium text-blue-900">
        Les services historiques du site restent intacts. Ce formulaire ajoute uniquement un nouveau
        service qui apparaitra apres les services deja presents.
      </div>

      <div className="space-y-2">
        <Label>Icone du service</Label>
        <select
          value={props.selectedService.icon}
          onChange={(event) =>
            props.onSelect({ ...props.selectedService, icon: event.target.value })
          }
          className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
        >
          <option value="Building2">Batiment / Construction</option>
          <option value="PencilRuler">Conception / Etudes</option>
          <option value="Hammer">Fabrication</option>
          <option value="HardHat">Pose / Chantier</option>
          <option value="ClipboardCheck">Suivi / Controle</option>
        </select>
      </div>

      <Field
        label="Titre du service"
        value={props.selectedService.title_fr}
        onChange={(value) =>
          props.onSelect({ ...props.selectedService, title_fr: value, title_en: value })
        }
      />
      <Field
        label="Courte description"
        value={props.selectedService.short_description_fr}
        onChange={(value) =>
          props.onSelect({
            ...props.selectedService,
            short_description_fr: value,
            short_description_en: value,
          })
        }
      />
      <Field
        label="Description detaillee"
        textarea
        value={props.selectedService.long_description_fr}
        onChange={(value) =>
          props.onSelect({
            ...props.selectedService,
            long_description_fr: value,
            long_description_en: value,
          })
        }
      />
      <Field
        label="Ce que nous livrons (une ligne par element)"
        textarea
        value={props.selectedService.bullets_fr}
        onChange={(value) =>
          props.onSelect({ ...props.selectedService, bullets_fr: value, bullets_en: value })
        }
      />
      <ServicePhotoPicker
        currentPhotos={
          props.selectedService.id
            ? (props.allServices.find((service) => service.id === props.selectedService.id)
                ?.photos ?? [])
            : []
        }
        selectedFiles={props.selectedServiceFiles}
        onFilesChange={props.onFilesChange}
        onDeletePhoto={props.onDeletePhoto}
      />
      <FormActions saving={props.saving} onSave={props.onSave} onReset={props.onReset} />
    </ManagementShell>
  );
}

function ServicePhotoPicker({
  currentPhotos,
  selectedFiles,
  onFilesChange,
  onDeletePhoto,
}: {
  currentPhotos: AdminServicePhoto[];
  selectedFiles: File[];
  onFilesChange: (files: File[]) => void;
  onDeletePhoto: (linkId: string) => void;
}) {
  const remainingSlots = Math.max(
    MAX_SERVICE_IMAGES - currentPhotos.length - selectedFiles.length,
    0,
  );
  const selectedPreviews = React.useMemo(
    () =>
      selectedFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    [selectedFiles],
  );

  useEffect(() => {
    return () => {
      selectedPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [selectedPreviews]);

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="space-y-2">
        <Label>
          Images du service ({currentPhotos.length + selectedFiles.length}/{MAX_SERVICE_IMAGES})
        </Label>
        <Input
          type="file"
          accept="image/*"
          multiple
          disabled={remainingSlots === 0}
          className="bg-white"
          onChange={(event) => {
            const nextFiles = Array.from(event.target.files ?? []).filter((file) =>
              file.type.startsWith("image/"),
            );
            const existingKeys = new Set(
              selectedFiles.map((file) => `${file.name}-${file.size}-${file.lastModified}`),
            );
            const uniqueNextFiles = nextFiles.filter((file) => {
              const key = `${file.name}-${file.size}-${file.lastModified}`;
              if (existingKeys.has(key)) return false;
              existingKeys.add(key);
              return true;
            });

            onFilesChange(
              [...selectedFiles, ...uniqueNextFiles].slice(
                0,
                MAX_SERVICE_IMAGES - currentPhotos.length,
              ),
            );
            event.currentTarget.value = "";
          }}
        />
        <p className="text-xs font-medium text-slate-500">
          Minimum 1 image, maximum {MAX_SERVICE_IMAGES}. Ces images seront affichees dans la
          galerie du service.
        </p>
      </div>

      {currentPhotos.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-black text-slate-700">Photos deja publiees</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {currentPhotos.map((photo) => (
              <div
                key={photo.link_id}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <img src={photo.url} alt={photo.file_name} className="h-32 w-full object-cover" />
                <div className="flex items-center justify-between gap-2 p-3">
                  <span className="truncate text-xs font-bold text-slate-600">
                    {photo.file_name}
                  </span>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeletePhoto(photo.link_id)}
                  >
                    Retirer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPreviews.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-black text-slate-700">Nouvelles photos a envoyer</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {selectedPreviews.map((preview) => (
              <div
                key={`${preview.file.name}-${preview.file.lastModified}`}
                className="overflow-hidden rounded-lg border border-dashed border-red-200 bg-white"
              >
                <img
                  src={preview.url}
                  alt={preview.file.name}
                  className="h-32 w-full object-cover"
                />
                <div className="flex items-center justify-between gap-2 p-3">
                  <p className="truncate text-xs font-bold text-slate-600">{preview.file.name}</p>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      onFilesChange(selectedFiles.filter((file) => file !== preview.file))
                    }
                  >
                    Retirer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ContentPanel(props: {
  contents: AdminContent[];
  selectedContent: AdminContentForm;
  saving: boolean;
  tr: AdminTranslate;
  onSelect: (content: AdminContentForm) => void;
  onSave: () => void;
  onDelete: (id: string) => void;
  onReset: () => void;
}) {
  return (
    <ManagementShell
      title={props.tr("contentTitle")}
      description={props.tr("contentDesc")}
      listTitle={props.tr("activeContent")}
      formTitle={props.selectedContent.id ? "Modifier le contenu" : "Nouveau contenu"}
      list={
        props.contents.length ? (
          props.contents.map((content) => (
            <RecordRow
              key={content.id}
              title={`${content.section_key} (${content.locale})`}
              meta={content.title || "Bloc sans titre"}
              onEdit={() =>
                props.onSelect({
                  id: content.id,
                  section_key: content.section_key,
                  locale: content.locale,
                  title: content.title ?? "",
                  subtitle: content.subtitle ?? "",
                  body: content.body ?? "",
                })
              }
              onDelete={() => props.onDelete(content.id)}
            />
          ))
        ) : (
          <EmptySearchState text={props.tr("noResult")} />
        )
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Cle de section"
          value={props.selectedContent.section_key}
          onChange={(value) => props.onSelect({ ...props.selectedContent, section_key: value })}
        />
        <Field
          label="Langue"
          value={props.selectedContent.locale}
          onChange={(value) => props.onSelect({ ...props.selectedContent, locale: value })}
        />
      </div>
      <Field
        label="Titre"
        value={props.selectedContent.title}
        onChange={(value) => props.onSelect({ ...props.selectedContent, title: value })}
      />
      <Field
        label="Sous-titre"
        value={props.selectedContent.subtitle}
        onChange={(value) => props.onSelect({ ...props.selectedContent, subtitle: value })}
      />
      <Field
        label="Texte"
        textarea
        value={props.selectedContent.body}
        onChange={(value) => props.onSelect({ ...props.selectedContent, body: value })}
      />
      <FormActions saving={props.saving} onSave={props.onSave} onReset={props.onReset} />
    </ManagementShell>
  );
}

function MediaPanel({
  media,
  mediaUploadUrl,
  saving,
  tr,
  onUrlChange,
  onUpload,
}: {
  media: AdminMedia[];
  mediaUploadUrl: string;
  saving: boolean;
  tr: AdminTranslate;
  onUrlChange: (value: string) => void;
  onUpload: () => void;
}) {
  return (
    <PanelCard className="p-5">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-black">{tr("mediaTitle")}</h1>
          <p className="text-sm text-slate-500">{tr("mediaDesc")}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[minmax(260px,1fr)_auto]">
          <Input
            value={mediaUploadUrl}
            onChange={(event) => onUrlChange(event.target.value)}
            placeholder="URL de l'image"
          />
          <Button
            onClick={onUpload}
            disabled={saving}
            className="gap-2 bg-red-600 text-white hover:bg-red-700"
          >
            <ImagePlus className="h-4 w-4" />
            {saving ? "Ajout..." : "Ajouter"}
          </Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {media.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white"
          >
            <img src={item.url} alt={item.file_name} className="h-40 w-full object-cover" />
            <div className="p-4">
              <p className="truncate font-black">{item.file_name}</p>
              <p className="text-sm text-slate-500">{item.folder || "uploads"}</p>
            </div>
          </div>
        ))}
        {!media.length ? <EmptySearchState text={tr("noResult")} /> : null}
      </div>
    </PanelCard>
  );
}

function MessagePanel({
  messages,
  filter,
  tr,
  onFilterChange,
  onMark,
  onDelete,
}: {
  messages: AdminMessage[];
  filter: string;
  tr: AdminTranslate;
  onFilterChange: (filter: string) => void;
  onMark: (id: string, isRead: boolean) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <PanelCard className="p-5">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black">{tr("messages")}</h1>
          <p className="text-sm text-slate-500">{tr("messagesDesc")}</p>
        </div>
        <div className="flex gap-2">
          {[
            { id: "all", label: tr("all") },
            { id: "unread", label: tr("unread") },
            { id: "read", label: tr("read") },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onFilterChange(item.id)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-bold",
                filter === item.id
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-slate-200 bg-white",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="font-black">{message.subject || "Sans objet"}</p>
                <p className="text-sm font-medium text-slate-600">
                  {message.full_name} - {message.email}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{message.message}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onMark(message.id, !message.is_read)}
                >
                  {message.is_read ? "Non lu" : "Lu"}
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(message.id)}>
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        ))}
        {!messages.length ? <EmptySearchState text={tr("noResult")} /> : null}
      </div>
    </PanelCard>
  );
}

function SettingsPanel({
  profile,
  saving,
  tr,
  onChange,
  onSave,
}: {
  profile: ProfileSettingsForm;
  saving: boolean;
  tr: AdminTranslate;
  onChange: (value: ProfileSettingsForm) => void;
  onSave: () => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black">{tr("settingsTitle")}</h1>
        <p className="text-sm text-slate-500">
          {tr("settingsDesc")}
        </p>
      </div>

      <PanelCard className="max-w-3xl p-5">
        <div className="space-y-4">
          <Field
            label="Nom"
            value={profile.display_name}
            onChange={(value) => onChange({ ...profile, display_name: value })}
          />
          <Field
            label="Adresse mail"
            type="email"
            value={profile.email}
            onChange={(value) => onChange({ ...profile, email: value })}
          />
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-sm font-black text-slate-800">Changer le mot de passe</h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Laissez ces champs vides si vous ne souhaitez pas changer votre mot de passe.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field
                label="Nouveau mot de passe"
                type="password"
                value={profile.password}
                onChange={(value) => onChange({ ...profile, password: value })}
              />
              <Field
                label="Confirmer le mot de passe"
                type="password"
                value={profile.password_confirm}
                onChange={(value) => onChange({ ...profile, password_confirm: value })}
              />
            </div>
          </div>
          <Button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="h-11 gap-2 rounded-lg bg-red-600 font-bold text-white hover:bg-red-700"
          >
            <Settings className="h-4 w-4" />
            {saving ? "Enregistrement..." : tr("saveSettings")}
          </Button>
        </div>
      </PanelCard>
    </div>
  );
}

function formatAdminDate(value?: string | null) {
  if (!value) return "date inconnue";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function UsersPanel({
  profiles,
  users,
  newAdminUser,
  saving,
  tr,
  onChange,
  onAdd,
}: {
  profiles: AdminProfile[];
  users: AdminUserListItem[];
  newAdminUser: NewAdminUserForm;
  saving: boolean;
  tr: AdminTranslate;
  onChange: (value: NewAdminUserForm) => void;
  onAdd: () => void;
}) {
  const displayedUsers =
    users.length > 0
      ? users
      : profiles.map((profile) => ({
          id: profile.user_id,
          email: profile.email,
          displayName: profile.display_name || "",
          role: profile.role,
          isActive: profile.is_active,
          createdAt: profile.created_at,
          lastSignInAt: null,
        }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black">{tr("usersTitle")}</h1>
        <p className="text-sm text-slate-500">
          {tr("usersDesc")}
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_520px]">
        <PanelCard className="p-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-black">{tr("usersList")}</h2>
            <Badge variant="outline" className="w-fit rounded-full">
              {displayedUsers.length} compte{displayedUsers.length > 1 ? "s" : ""}
            </Badge>
          </div>
          <div className="space-y-3">
            {displayedUsers.map((user) => (
              <div
                key={user.id}
                className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate font-black">
                    {user.displayName || user.email || "Utilisateur sans email"}
                  </p>
                  <p className="truncate text-sm text-slate-500">{user.email || "Email absent"}</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    Cree le {formatAdminDate(user.createdAt)}
                    {user.lastSignInAt ? ` - Derniere connexion ${formatAdminDate(user.lastSignInAt)}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    className={cn(
                      "rounded-full",
                      user.role === "sub_admin"
                        ? "bg-blue-100 text-blue-800"
                        : user.role === "utilisateur"
                          ? "bg-slate-100 text-slate-700"
                        : "bg-red-100 text-red-800",
                    )}
                  >
                    {user.role === "sub_admin"
                      ? tr("subAdmin")
                      : user.role === "utilisateur"
                        ? "Utilisateur"
                        : tr("adminMain")}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full",
                      user.isActive ? "border-emerald-200 text-emerald-700" : "text-slate-500",
                    )}
                  >
                    {user.isActive ? "Actif" : "Non admin"}
                  </Badge>
                </div>
              </div>
            ))}
            {!displayedUsers.length ? (
              <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                Aucun utilisateur trouve.
              </p>
            ) : null}
          </div>
        </PanelCard>

        <PanelCard className="p-5">
          <h2 className="mb-4 text-lg font-black">{tr("addSubAdmin")}</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-medium text-blue-900">
              Le compte sera cree directement avec ces informations. Le sous-admin pourra gerer le
              contenu, mais il ne verra pas la gestion des utilisateurs.
            </div>
            <Field
              label="Nom de l'utilisateur"
              value={newAdminUser.display_name}
              onChange={(value) => onChange({ ...newAdminUser, display_name: value })}
            />
            <Field
              label="Email du compte"
              type="email"
              value={newAdminUser.email}
              onChange={(value) => onChange({ ...newAdminUser, email: value })}
            />
            <Field
              label="Mot de passe"
              type="password"
              value={newAdminUser.password}
              onChange={(value) => onChange({ ...newAdminUser, password: value })}
            />
            <Field
              label="Confirmer le mot de passe"
              type="password"
              value={newAdminUser.password_confirm}
              onChange={(value) => onChange({ ...newAdminUser, password_confirm: value })}
            />
            <Button
              type="button"
              onClick={onAdd}
              disabled={saving}
              className="h-11 w-full gap-2 rounded-lg bg-red-600 font-bold text-white hover:bg-red-700"
            >
              <Plus className="h-4 w-4" />
              {saving ? "Ajout..." : "Ajouter le sous-admin"}
            </Button>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}

function SuccessDialog({
  action,
  onClose,
}: {
  action: SuccessState | null;
  onClose: () => void;
}) {
  if (!action) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-emerald-100 bg-white p-5 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-950">{action.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{action.description}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            onClick={onClose}
            className="bg-emerald-600 font-bold text-white hover:bg-emerald-700"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}

function ConfirmActionDialog({
  action,
  onClose,
}: {
  action: ConfirmationState | null;
  onClose: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!action) setConfirming(false);
  }, [action]);

  if (!action) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-2xl">
        <h2 className="text-xl font-black text-slate-950">{action.title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{action.description}</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={onClose} disabled={confirming}>
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={confirming}
            onClick={async () => {
              setConfirming(true);
              await action.onConfirm();
              setConfirming(false);
              onClose();
            }}
          >
            {confirming ? "Suppression..." : action.confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ManagementShell({
  title,
  description,
  listTitle,
  formTitle,
  list,
  children,
}: {
  title: string;
  description: string;
  listTitle: string;
  formTitle: string;
  list: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black">{title}</h1>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_520px]">
        <PanelCard className="p-5">
          <h2 className="mb-4 text-lg font-black">{listTitle}</h2>
          <div className="space-y-3">{list}</div>
        </PanelCard>
        <PanelCard className="p-5">
          <h2 className="mb-4 text-lg font-black">{formTitle}</h2>
          <div className="space-y-4">{children}</div>
        </PanelCard>
      </div>
    </div>
  );
}

function RecordRow({
  title,
  meta,
  viewHref,
  onEdit,
  onDelete,
}: {
  title: string;
  meta: string;
  viewHref?: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate font-black">{title}</p>
        <p className="text-sm text-slate-500">{meta}</p>
      </div>
      <div className="flex gap-2">
        {viewHref && (
          <Button variant="outline" size="sm" asChild>
            <a href={viewHref} target="_blank" rel="noreferrer">
              Voir
            </a>
          </Button>
        )}
        <Button variant="secondary" size="sm" onClick={onEdit}>
          Modifier
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          Supprimer
        </Button>
      </div>
    </div>
  );
}

function PanelCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <section className={cn("rounded-lg border border-slate-200 bg-white shadow-sm", className)}>
      {children}
    </section>
  );
}

function EmptySearchState({ text }: { text: string }) {
  return (
    <p className="col-span-full rounded-lg bg-slate-50 p-4 text-sm font-medium text-slate-500">
      {text}
    </p>
  );
}

function KpiCard({
  label,
  value,
  note,
  Icon,
  tone,
}: {
  label: string;
  value: number;
  note: string;
  Icon: IconType;
  tone: "blue" | "red" | "green" | "violet" | "orange";
}) {
  const tones = {
    blue: "from-blue-600 to-blue-800",
    red: "from-red-600 to-red-800",
    green: "from-emerald-500 to-emerald-700",
    violet: "from-violet-600 to-purple-700",
    orange: "from-orange-500 to-orange-700",
  };
  return (
    <PanelCard className="p-5">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "grid h-14 w-14 place-items-center rounded-full bg-linear-to-br text-white",
            tones[tone],
          )}
        >
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-600">{label}</p>
          <p className="text-3xl font-black">{value}</p>
          <p className="mt-1 text-xs font-bold text-emerald-600">{note}</p>
        </div>
      </div>
    </PanelCard>
  );
}

function LegendItem({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2 font-semibold text-slate-600">
        <span className={cn("h-2.5 w-2.5 rounded-full", color)} />
        {label}
      </span>
      <span className="font-black">{value}</span>
    </div>
  );
}

function LineStats() {
  const bars = [38, 54, 51, 60, 44, 48, 72, 63, 66, 84, 91, 70, 78, 73, 95, 82];
  return (
    <div className="relative h-56 overflow-hidden rounded-lg border border-slate-200 bg-linear-to-b from-slate-50 to-white p-4">
      <div className="absolute inset-x-4 bottom-10 top-5 grid grid-rows-4">
        {[0, 1, 2, 3].map((item) => (
          <span key={item} className="border-t border-dashed border-slate-200" />
        ))}
      </div>
      <div className="relative flex h-full items-end gap-2 pb-8 pt-4">
        {bars.map((height, index) => (
          <span key={index} className="flex flex-1 items-end">
            <span
              className="block w-full rounded-t bg-linear-to-t from-blue-100 to-blue-600"
              style={{ height: `${height}%` }}
            />
          </span>
        ))}
      </div>
      <div className="absolute bottom-3 left-4 right-4 flex justify-between text-xs font-semibold text-slate-400">
        <span>05 Juin</span>
        <span>15 Juin</span>
        <span>25 Juin</span>
        <span>30 Juin</span>
      </div>
    </div>
  );
}

function ActivityItem({ Icon, title, text }: { Icon: IconType; title: string; text: string }) {
  return (
    <div className="flex gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-black">{title}</p>
        <p className="text-xs text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function QuickAction({
  Icon,
  label,
  onClick,
}: {
  Icon: IconType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-center text-xs font-black transition hover:border-red-200 hover:bg-red-50"
    >
      <Icon className="h-7 w-7 text-red-600" />
      {label}
    </button>
  );
}

function StatusControls({
  status,
  active,
  onStatus,
  onActive,
}: {
  status: string;
  active: boolean;
  onStatus: (value: string) => void;
  onActive: (value: boolean) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label>Statut</Label>
        <select
          value={status}
          onChange={(event) => onStatus(event.target.value)}
          className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
        >
          <option value="draft">Brouillon</option>
          <option value="published">Publie</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label>Visible</Label>
        <select
          value={String(active)}
          onChange={(event) => onActive(event.target.value === "true")}
          className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
        >
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </div>
    </div>
  );
}

function FormActions({
  saving,
  onSave,
  onReset,
}: {
  saving: boolean;
  onSave: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <Button onClick={onSave} disabled={saving} className="bg-red-600 text-white hover:bg-red-700">
        {saving ? "Enregistrement..." : "Enregistrer"}
      </Button>
      <Button variant="secondary" onClick={onReset}>
        Reinitialiser
      </Button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {textarea ? (
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-28 bg-white"
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="bg-white"
        />
      )}
    </div>
  );
}
