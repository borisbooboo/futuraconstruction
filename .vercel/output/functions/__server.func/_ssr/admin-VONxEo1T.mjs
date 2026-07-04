import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-5v6yjfX_.mjs";
import { u as useI18n, s as supabase, B as Button, l as logoFutura, h as heroImg, L as Label, c as cn, f as useTheme, g as projectImg, p as project2, i as project3, a as project4 } from "./router-CYmLkTqG.mjs";
import { I as Input } from "./input-BM2oBcaX.mjs";
import { T as Textarea } from "./textarea-BrBIY8b8.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { r as ShieldCheck, s as CircleAlert, E as EyeOff, t as Eye, u as LogIn, v as House, f as FileText, w as Layers, x as GalleryHorizontalEnd, c as Mail, q as ChevronRight, U as Users, y as Settings, z as LogOut, a as Menu, D as Search, J as Bell, S as Sun, M as Moon, K as Plus, O as BookOpenText, Q as CalendarDays, R as PenLine, W as Wrench, V as ImagePlus, Y as CircleCheck } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
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
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const createSubAdminSchema = objectType({
  accessToken: stringType().min(1),
  displayName: stringType().trim().min(1, "Le nom de l'utilisateur est requis."),
  email: stringType().trim().email("Adresse email invalide."),
  password: stringType().min(6, "Le mot de passe doit contenir au moins 6 caracteres."),
  passwordConfirm: stringType().min(6)
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Les deux mots de passe ne correspondent pas.",
  path: ["passwordConfirm"]
});
const adminAccessSchema = objectType({
  accessToken: stringType().min(1)
});
const createSubAdmin = createServerFn({
  method: "POST"
}).inputValidator(createSubAdminSchema).handler(createSsrRpc("2a8afe031ca75d25e2799e09b7326e92a1d0f1ac2c77ac16859754cda234eb21"));
const listAdminUsers = createServerFn({
  method: "POST"
}).inputValidator(adminAccessSchema).handler(createSsrRpc("86628a94b42888b5664ae10848c339ca06d4b41efae621120d5729f04d48a653"));
function AdminLogin({ onSubmit, loading = false, error }) {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [emailError, setEmailError] = reactExports.useState("");
  const [passwordError, setPasswordError] = reactExports.useState("");
  const [validationTouched, setValidationTouched] = reactExports.useState(false);
  const validateEmail = (value) => {
    if (!value) {
      setEmailError("L'email est requis");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Veuillez entrer un email valide");
      return false;
    }
    setEmailError("");
    return true;
  };
  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Le mot de passe est requis");
      return false;
    }
    if (value.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caracteres");
      return false;
    }
    setPasswordError("");
    return true;
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (validationTouched) validateEmail(value);
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (validationTouched) validatePassword(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationTouched(true);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (!isEmailValid || !isPasswordValid) return;
    try {
      await onSubmit(email, password);
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-screen overflow-hidden bg-[#02070d] px-4 py-4 text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: heroImg,
          alt: "",
          className: "h-full w-full object-cover opacity-50 animate-[slowZoom_22s_ease-in-out_infinite_alternate]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(115deg,rgba(2,7,13,0.98)_0%,rgba(4,24,38,0.94)_38%,rgba(87,10,22,0.86)_100%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(38, 111, 220, 0.35),transparent_24%),radial-gradient(circle_at_78%_72%,rgba(8,145,178,0.26),transparent_30%)]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-[0.11] bg-[linear-gradient(rgba(255,255,255,.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.75)_1px,transparent_1px)] bg-[size:56px_56px] animate-[gridMove_18s_linear_infinite]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[7%] top-[-12%] h-[130%] w-24 -skew-x-12 bg-red-700/20 blur-sm animate-[beamOne_8s_ease-in-out_infinite]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-[10%] top-[-12%] h-[130%] w-12 skew-x-12 bg-white/10 blur-sm animate-[beamTwo_10s_ease-in-out_infinite]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-10 bottom-12 h-36 w-36 rounded-full border border-red-300/20 animate-ping" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-10 top-10 h-44 w-44 rounded-full border border-white/10 animate-pulse" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex min-h-[calc(100vh-2rem)] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.25fr_390px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block animate-[fadeInLeft_0.9s_ease-out_both]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoFutura, alt: "", className: "h-9 w-9 rounded-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black uppercase tracking-[0.24em] text-white/85", children: "Futura Construction" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-[0.34em] text-red-300", children: "Espace administrateur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 font-display text-5xl font-black leading-[0.95] tracking-tight xl:text-6xl", children: [
          "Contrôle.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-red-300", children: "Sécurité." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-white/80", children: "Performance." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-md text-sm font-medium leading-7 text-white/70", children: "Accédez au tableau de bord pour gérer les contenus, les médias, les actualités et les messages du site." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-9 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-[3px] w-44 overflow-hidden rounded-full bg-white/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 w-20 rounded-full bg-red-400 animate-[lineRun_2.6s_ease-in-out_infinite]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-[0.22em] text-white/45", children: "Secure access" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-full max-w-[390px] animate-[fadeInUp_0.85s_ease-out_both]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-3 rounded-[34px] bg-gradient-to-br from-red-600/55 via-cyan-300/20 to-white/10 blur-2xl animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[34px] border border-white/20 bg-white/10 p-[1px] shadow-2xl shadow-black/60 backdrop-blur-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-20 -top-20 h-44 w-44 rounded-full bg-red-600/20 blur-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-cyan-400/20 blur-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-[33px] bg-[#f8fafc]/95 px-6 py-6 text-slate-950", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-2 rounded-2xl bg-red-500/25 blur-md animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative grid h-16 w-16 place-items-center rounded-2xl bg-slate-950 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: logoFutura,
                    alt: "Futura Construction",
                    className: "h-11 w-11 rounded-full object-cover"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-red-700", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3" }),
                  "Sécurisé"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-2xl font-black leading-none text-slate-950", children: "Connexion" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-5 text-xs font-medium leading-5 text-slate-500", children: "Accédez à l’espace de gestion du site." }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 animate-[shake_0.35s_ease-in-out_both]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-red-700", children: error })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "email",
                    className: "text-[11px] font-black uppercase tracking-[0.16em] text-slate-500",
                    children: "Adresse email"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-gradient-to-r from-slate-200 via-white to-slate-200 p-[1px] transition-all duration-300 focus-within:from-red-500 focus-within:via-red-300 focus-within:to-cyan-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "email",
                    type: "email",
                    value: email,
                    onChange: handleEmailChange,
                    onBlur: () => {
                      setValidationTouched(true);
                      validateEmail(email);
                    },
                    placeholder: "admin@futuraconstruction.com",
                    disabled: loading,
                    className: `h-11 rounded-2xl border-0 bg-white px-4 text-sm font-semibold shadow-none placeholder:text-slate-400 focus-visible:ring-0 ${emailError ? "bg-red-50" : ""}`
                  }
                ) }),
                emailError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-red-600", children: emailError })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "password",
                    className: "text-[11px] font-black uppercase tracking-[0.16em] text-slate-500",
                    children: "Mot de passe"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl bg-gradient-to-r from-slate-200 via-white to-slate-200 p-[1px] transition-all duration-300 focus-within:from-red-500 focus-within:via-red-300 focus-within:to-cyan-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "password",
                      type: showPassword ? "text" : "password",
                      value: password,
                      onChange: handlePasswordChange,
                      onBlur: () => {
                        setValidationTouched(true);
                        validatePassword(password);
                      },
                      placeholder: "••••••••",
                      disabled: loading,
                      className: `h-11 rounded-2xl border-0 bg-white px-4 pr-11 text-sm font-semibold shadow-none placeholder:text-slate-400 focus-visible:ring-0 ${passwordError ? "bg-red-50" : ""}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowPassword(!showPassword),
                      disabled: loading,
                      className: "absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-950 disabled:opacity-50",
                      "aria-label": showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe",
                      children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                passwordError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-red-600", children: passwordError })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  disabled: loading || !email || !password,
                  className: "group relative h-11 w-full overflow-hidden rounded-2xl bg-slate-950 text-sm font-black text-white shadow-xl shadow-slate-950/25 transition-all duration-300 hover:bg-slate-900 disabled:opacity-60",
                  size: "lg",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-gradient-to-r from-red-700 via-red-500 to-red-700 opacity-90" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 -left-20 w-16 rotate-12 bg-white/25 blur-sm transition-all duration-700 group-hover:left-[120%]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex items-center justify-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
                      loading ? "Connexion..." : "Se connecter"
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" }),
              "Accès réservé aux administrateurs."
            ] })
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slowZoom {
          from { transform: scale(1.08); }
          to { transform: scale(1.18); }
        }

        @keyframes gridMove {
          from { background-position: 0 0; }
          to { background-position: 56px 56px; }
        }

        @keyframes beamOne {
          0%, 100% { transform: translateY(0) skewX(-12deg); opacity: 0.22; }
          50% { transform: translateY(28px) skewX(-12deg); opacity: 0.42; }
        }

        @keyframes beamTwo {
          0%, 100% { transform: translateY(0) skewX(12deg); opacity: 0.18; }
          50% { transform: translateY(-30px) skewX(12deg); opacity: 0.34; }
        }

        @keyframes lineRun {
          0% { transform: translateX(-90px); opacity: 0; }
          35% { opacity: 1; }
          100% { transform: translateX(190px); opacity: 0; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      ` })
  ] });
}
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const ARTICLE_IMAGE_BUCKET = "article-images";
const MAX_ARTICLE_IMAGES = 3;
const MAX_SERVICE_IMAGES = 3;
const initialArticle = {
  title_fr: "",
  title_en: "",
  excerpt_fr: "",
  excerpt_en: "",
  content_fr: "",
  content_en: "",
  slug: "",
  status: "draft",
  is_active: false,
  published_at: ""
};
const initialService = {
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
  slug: ""
};
const initialContent = {
  section_key: "home_hero",
  locale: "fr",
  title: "",
  subtitle: "",
  body: ""
};
const initialNewAdminUser = {
  display_name: "",
  email: "",
  password: "",
  password_confirm: ""
};
const initialProfileSettings = {
  display_name: "",
  email: "",
  password: "",
  password_confirm: ""
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
    welcomeText: "Gere le contenu du site Futura Construction depuis votre espace d'administration.",
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
    saveSettings: "Enregistrer les modifications"
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
    saveSettings: "Save changes"
  }
};
function getAdminCopy(lang) {
  return (key) => adminCopy[lang][key] ?? adminCopy.fr[key];
}
function normalizeAdminSearch(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
function includesAdminSearch(query, values) {
  if (!query) return true;
  return values.some((value) => normalizeAdminSearch(String(value ?? "")).includes(query));
}
function createSafeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function sanitizeFileName(fileName, index = 0) {
  const extension = fileName.split(".").pop()?.toLowerCase() || "jpg";
  const baseName = fileName.replace(/\.[^/.]+$/, "");
  const safeBaseName = baseName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9-]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
  return `${safeBaseName || "article"}-${Date.now()}-${index + 1}-${createSafeId()}.${extension}`;
}
function createSlug(value) {
  const slug = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
  return slug || `article-${Date.now()}`;
}
function createExcerpt(value) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= 180) return normalized;
  return `${normalized.slice(0, 177).trim()}...`;
}
function getUniqueArticleSlug(title, records, currentRecordId) {
  const baseSlug = createSlug(title);
  const usedSlugs = new Set(records.filter((record) => record.id !== currentRecordId).map((record) => record.slug));
  let slug = baseSlug;
  let suffix = 2;
  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  return slug;
}
async function uploadArticlePhotos(articleId, files, startOrder = 0) {
  for (const [index, file] of files.entries()) {
    if (!file.type.startsWith("image/")) {
      throw new Error(`Le fichier "${file.name}" n'est pas une image.`);
    }
    const fileName = sanitizeFileName(file.name, index);
    const storagePath = `${articleId}/${fileName}`;
    const uploadResult = await supabase.storage.from(ARTICLE_IMAGE_BUCKET).upload(storagePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type
    });
    if (uploadResult.error) {
      throw new Error(`Upload de "${file.name}" impossible: ${uploadResult.error.message}`);
    }
    const {
      data: {
        publicUrl
      }
    } = supabase.storage.from(ARTICLE_IMAGE_BUCKET).getPublicUrl(storagePath);
    const mediaResult = await supabase.from("media").insert({
      folder: "articles",
      file_name: file.name,
      url: publicUrl,
      mime_type: file.type,
      size: file.size,
      is_public: true,
      status: "active"
    }).select("id").single();
    if (mediaResult.error) {
      throw new Error(`Enregistrement de "${file.name}" impossible: ${mediaResult.error.message}`);
    }
    const linkResult = await supabase.from("article_media").insert({
      article_id: articleId,
      media_id: mediaResult.data.id,
      display_order: startOrder + index
    });
    if (linkResult.error) {
      throw new Error(`Liaison de "${file.name}" impossible: ${linkResult.error.message}`);
    }
  }
}
async function uploadServicePhotos(serviceId, files, startOrder = 0) {
  for (const [index, file] of files.entries()) {
    if (!file.type.startsWith("image/")) {
      throw new Error(`Le fichier "${file.name}" n'est pas une image.`);
    }
    const fileName = sanitizeFileName(file.name, index);
    const storagePath = `services/${serviceId}/${fileName}`;
    const uploadResult = await supabase.storage.from(ARTICLE_IMAGE_BUCKET).upload(storagePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type
    });
    if (uploadResult.error) {
      throw new Error(`Upload de "${file.name}" impossible: ${uploadResult.error.message}`);
    }
    const {
      data: {
        publicUrl
      }
    } = supabase.storage.from(ARTICLE_IMAGE_BUCKET).getPublicUrl(storagePath);
    const mediaResult = await supabase.from("media").insert({
      folder: "services",
      file_name: file.name,
      url: publicUrl,
      mime_type: file.type,
      size: file.size,
      is_public: true,
      status: "active"
    }).select("id").single();
    if (mediaResult.error) {
      throw new Error(`Enregistrement de "${file.name}" impossible: ${mediaResult.error.message}`);
    }
    const linkResult = await supabase.from("service_media").insert({
      service_id: serviceId,
      media_id: mediaResult.data.id,
      display_order: startOrder + index
    });
    if (linkResult.error) {
      throw new Error(`Liaison de "${file.name}" impossible: ${linkResult.error.message}`);
    }
  }
}
function AdminPage() {
  const {
    lang,
    setLang
  } = useI18n();
  const tr = reactExports.useMemo(() => getAdminCopy(lang), [lang]);
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [checkingAdmin, setCheckingAdmin] = reactExports.useState(false);
  const [authError, setAuthError] = reactExports.useState(null);
  const [view, setView] = reactExports.useState("overview");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [metrics, setMetrics] = reactExports.useState(null);
  const [articles, setArticles] = reactExports.useState([]);
  const [services, setServices] = reactExports.useState([]);
  const [contents, setContents] = reactExports.useState([]);
  const [media, setMedia] = reactExports.useState([]);
  const [messages, setMessages] = reactExports.useState([]);
  const [adminProfiles, setAdminProfiles] = reactExports.useState([]);
  const [adminUsers, setAdminUsers] = reactExports.useState([]);
  const [currentAdminProfile, setCurrentAdminProfile] = reactExports.useState(null);
  const [selectedArticle, setSelectedArticle] = reactExports.useState(initialArticle);
  const [selectedArticleFiles, setSelectedArticleFiles] = reactExports.useState([]);
  const [selectedService, setSelectedService] = reactExports.useState(initialService);
  const [selectedServiceFiles, setSelectedServiceFiles] = reactExports.useState([]);
  const [selectedContent, setSelectedContent] = reactExports.useState(initialContent);
  const [newAdminUser, setNewAdminUser] = reactExports.useState(initialNewAdminUser);
  const [profileSettings, setProfileSettings] = reactExports.useState(initialProfileSettings);
  const [mediaUploadUrl, setMediaUploadUrl] = reactExports.useState("");
  const [messageFilter, setMessageFilter] = reactExports.useState("all");
  const [saving, setSaving] = reactExports.useState(false);
  const [confirmation, setConfirmation] = reactExports.useState(null);
  const [successDialog, setSuccessDialog] = reactExports.useState(null);
  const loadDashboard = reactExports.useCallback(async () => {
    setLoading(true);
    const [articlesRes, articleMediaRes, servicesRes, serviceMediaRes, mediaRes, messagesRes, contentsRes, adminProfilesRes] = await Promise.all([supabase.from("articles").select("id, slug, title, excerpt, content, is_active, status, published_at, created_at").order("created_at", {
      ascending: false
    }), supabase.from("article_media").select("id, article_id, display_order, media:media_id(id, url, file_name)").order("display_order", {
      ascending: true
    }), supabase.from("services").select("id, slug, title, short_description, long_description, icon, metadata, is_active, status, created_at").order("created_at", {
      ascending: false
    }), supabase.from("service_media").select("id, service_id, display_order, media:media_id(id, url, file_name)").order("display_order", {
      ascending: true
    }), supabase.from("media").select("id, file_name, url, mime_type, size, folder, created_at").order("created_at", {
      ascending: false
    }), supabase.from("messages").select("id, full_name, email, subject, message, status, is_read, received_at").order("received_at", {
      ascending: false
    }), supabase.from("site_contents").select("id, section_key, locale, title, subtitle, body, is_active, updated_at").order("updated_at", {
      ascending: false
    }), supabase.from("admin_profiles").select("id, user_id, role, display_name, email, is_active, created_at").order("created_at", {
      ascending: false
    })]);
    if (articlesRes.error || articleMediaRes.error || servicesRes.error || serviceMediaRes.error || mediaRes.error || messagesRes.error || contentsRes.error || adminProfilesRes.error) {
      setAuthError("Impossible de charger les donnees administratives.");
      setLoading(false);
      return;
    }
    const photosByArticle = /* @__PURE__ */ new Map();
    for (const link of articleMediaRes.data ?? []) {
      const media2 = Array.isArray(link.media) ? link.media[0] : link.media;
      if (!media2?.url || !media2?.id) continue;
      const articlePhotos = photosByArticle.get(link.article_id) ?? [];
      articlePhotos.push({
        link_id: link.id,
        media_id: media2.id,
        url: media2.url,
        file_name: media2.file_name || "image-article"
      });
      photosByArticle.set(link.article_id, articlePhotos);
    }
    const databaseArticles = (articlesRes.data ?? []).map((article) => ({
      ...article,
      photos: photosByArticle.get(article.id) ?? []
    }));
    const photosByService = /* @__PURE__ */ new Map();
    for (const link of serviceMediaRes.data ?? []) {
      const media2 = Array.isArray(link.media) ? link.media[0] : link.media;
      if (!media2?.url || !media2?.id) continue;
      const servicePhotos = photosByService.get(link.service_id) ?? [];
      servicePhotos.push({
        link_id: link.id,
        media_id: media2.id,
        url: media2.url,
        file_name: media2.file_name || "image-service"
      });
      photosByService.set(link.service_id, servicePhotos);
    }
    const databaseServices = (servicesRes.data ?? []).map((service) => ({
      ...service,
      photos: photosByService.get(service.id) ?? []
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
      messagesReceived: messagesRes.data?.length ?? 0
    });
    setLoading(false);
  }, []);
  const loadAdminUsers = reactExports.useCallback(async () => {
    if (!session?.access_token) {
      setAdminUsers([]);
      return;
    }
    try {
      const users = await listAdminUsers({
        data: {
          accessToken: session.access_token
        }
      });
      setAdminUsers(users);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Impossible de charger la liste des utilisateurs.");
    }
  }, [session?.access_token]);
  const verifyAdminAndLoad = reactExports.useCallback(async () => {
    if (!session?.user?.id) return;
    setCheckingAdmin(true);
    setAuthError(null);
    const {
      data: adminProfile,
      error
    } = await supabase.from("admin_profiles").select("id, user_id, role, display_name, email, is_active, created_at").eq("user_id", session.user.id).eq("is_active", true).maybeSingle();
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
  reactExports.useEffect(() => {
    const init = async () => {
      const {
        data: {
          session: session2
        }
      } = await supabase.auth.getSession();
      setSession(session2);
      setLoading(false);
    };
    init();
    const {
      data: authListener
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  reactExports.useEffect(() => {
    if (!session) return;
    verifyAdminAndLoad();
  }, [session, verifyAdminAndLoad]);
  reactExports.useEffect(() => {
    if (!session) return;
    const channel = supabase.channel("admin-messages").on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "messages"
    }, () => {
      void loadDashboard();
    }).subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [loadDashboard, session]);
  reactExports.useEffect(() => {
    if (!session?.user) return;
    setProfileSettings({
      display_name: currentAdminProfile?.display_name || "",
      email: currentAdminProfile?.email || session.user.email || "",
      password: "",
      password_confirm: ""
    });
  }, [currentAdminProfile, session?.user]);
  const signIn = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
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
    const currentPhotos = selectedArticle.id ? articles.find((article) => article.id === selectedArticle.id)?.photos ?? [] : [];
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
    const slug = selectedArticle.id && selectedArticle.slug.trim() ? selectedArticle.slug.trim() : getUniqueArticleSlug(title, articles, selectedArticle.id);
    const excerpt = createExcerpt(description);
    const payload = {
      slug,
      title: {
        fr: title,
        en: selectedArticle.title_en.trim() || title
      },
      excerpt: {
        fr: excerpt,
        en: createExcerpt(selectedArticle.content_en.trim() || description)
      },
      content: {
        fr: description,
        en: selectedArticle.content_en.trim() || description
      },
      status: "published",
      is_active: true,
      published_at: selectedArticle.published_at ? new Date(selectedArticle.published_at).toISOString() : (/* @__PURE__ */ new Date()).toISOString()
    };
    const articleResult = selectedArticle.id ? await supabase.from("articles").update(payload).eq("id", selectedArticle.id).select("id").single() : await supabase.from("articles").insert(payload).select("id").single();
    if (articleResult.error) {
      setAuthError(articleResult.error.message);
    } else {
      if (selectedArticleFiles.length > 0) {
        const {
          count,
          error: countError
        } = await supabase.from("article_media").select("id", {
          count: "exact",
          head: true
        }).eq("article_id", articleResult.data.id);
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
        description: isEditingArticle ? "Les modifications de l'article ont bien ete enregistrees." : "Le nouvel article est maintenant disponible dans l'administration."
      });
    }
    setSaving(false);
  };
  const deleteArticle = async (id) => {
    const {
      error
    } = await supabase.from("articles").delete().eq("id", id);
    if (error) setAuthError(error.message);
    else {
      if (selectedArticle.id === id) {
        setSelectedArticle(initialArticle);
        setSelectedArticleFiles([]);
      }
      await loadDashboard();
    }
  };
  const deleteArticlePhoto = async (linkId) => {
    const parentArticle = articles.find((article) => article.photos?.some((photo) => photo.link_id === linkId));
    if (parentArticle && (parentArticle.photos?.length ?? 0) <= 1) {
      setAuthError("Un article doit garder au moins une image.");
      return;
    }
    const {
      error
    } = await supabase.from("article_media").delete().eq("id", linkId);
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
    const currentPhotos = selectedService.id ? services.find((service) => service.id === selectedService.id)?.photos ?? [] : [];
    const totalPhotos = currentPhotos.length + selectedServiceFiles.length;
    const bullets = selectedService.bullets_fr.split("\n").map((item) => item.trim()).filter(Boolean);
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
    const slug = selectedService.id && selectedService.slug.trim() ? selectedService.slug.trim() : getUniqueArticleSlug(title, services, selectedService.id);
    const englishBullets = selectedService.bullets_en.split("\n").map((item) => item.trim()).filter(Boolean);
    const payload = {
      slug,
      title: {
        fr: title,
        en: selectedService.title_en.trim() || title
      },
      short_description: {
        fr: shortDescription,
        en: selectedService.short_description_en.trim() || shortDescription
      },
      long_description: {
        fr: longDescription,
        en: selectedService.long_description_en.trim() || longDescription
      },
      icon: selectedService.icon,
      status: "published",
      is_active: true,
      metadata: {
        bullets: {
          fr: bullets,
          en: englishBullets.length > 0 ? englishBullets : bullets
        }
      }
    };
    const serviceResult = selectedService.id ? await supabase.from("services").update(payload).eq("id", selectedService.id).select("id").single() : await supabase.from("services").insert(payload).select("id").single();
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
        description: isEditingService ? "Les modifications du service ont bien ete enregistrees." : "Le nouveau service a bien ete ajoute au catalogue."
      });
    }
    setSaving(false);
  };
  const deleteService = async (id) => {
    const {
      error
    } = await supabase.from("services").delete().eq("id", id);
    if (error) setAuthError(error.message);
    else {
      if (selectedService.id === id) {
        setSelectedService(initialService);
        setSelectedServiceFiles([]);
      }
      await loadDashboard();
    }
  };
  const deleteServicePhoto = async (linkId) => {
    const parentService = services.find((service) => service.photos?.some((photo) => photo.link_id === linkId));
    if (parentService && (parentService.photos?.length ?? 0) <= 1) {
      setAuthError("Un service doit garder au moins une image.");
      return;
    }
    const {
      error
    } = await supabase.from("service_media").delete().eq("id", linkId);
    if (error) setAuthError(error.message);
    else {
      await loadDashboard();
      setAuthError(null);
    }
  };
  const addSubAdmin = async () => {
    const email = newAdminUser.email.trim().replace(/[\u200B-\u200D\uFEFF]/g, "").toLowerCase();
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
          passwordConfirm
        }
      });
      await loadDashboard();
      await loadAdminUsers();
      setNewAdminUser(initialNewAdminUser);
      setAuthError(null);
      setSuccessDialog({
        title: "Utilisateur ajoute avec succes",
        description: `${displayName} peut maintenant se connecter a l'administration.`
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
    const email = profileSettings.email.trim().replace(/[\u200B-\u200D\uFEFF]/g, "").toLowerCase();
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
    const authPayload = {
      data: {
        display_name: displayName
      }
    };
    if (email !== (session.user.email ?? "").toLowerCase()) {
      authPayload.email = email;
    }
    if (password) {
      authPayload.password = password;
    }
    const {
      error: authUpdateError
    } = await supabase.auth.updateUser(authPayload);
    if (authUpdateError) {
      setAuthError(authUpdateError.message);
      setSaving(false);
      return;
    }
    const {
      error: profileError
    } = await supabase.from("admin_profiles").update({
      display_name: displayName,
      email
    }).eq("user_id", session.user.id);
    if (profileError) {
      setAuthError(profileError.message);
      setSaving(false);
      return;
    }
    const {
      data: {
        session: refreshedSession
      }
    } = await supabase.auth.getSession();
    setSession(refreshedSession ?? session);
    setCurrentAdminProfile({
      ...currentAdminProfile,
      display_name: displayName,
      email
    });
    setProfileSettings({
      display_name: displayName,
      email,
      password: "",
      password_confirm: ""
    });
    await loadDashboard();
    if (currentAdminProfile.role !== "sub_admin") {
      await loadAdminUsers();
    }
    setAuthError(null);
    setSuccessDialog({
      title: "Parametres mis a jour",
      description: password ? "Vos informations et votre mot de passe ont bien ete modifies." : "Vos informations de compte ont bien ete modifiees."
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
      is_active: true
    };
    const {
      error
    } = selectedContent.id ? await supabase.from("site_contents").update(payload).eq("id", selectedContent.id) : await supabase.from("site_contents").insert(payload);
    if (error) setAuthError(error.message);
    else {
      await loadDashboard();
      setSelectedContent(initialContent);
      setAuthError(null);
    }
    setSaving(false);
  };
  const deleteContent = async (id) => {
    const {
      error
    } = await supabase.from("site_contents").delete().eq("id", id);
    if (error) setAuthError(error.message);
    else await loadDashboard();
  };
  const markMessage = async (id, isRead) => {
    const {
      error
    } = await supabase.from("messages").update({
      is_read: isRead,
      status: isRead ? "read" : "new"
    }).eq("id", id);
    if (error) setAuthError(error.message);
    else await loadDashboard();
  };
  const deleteMessage = async (id) => {
    const {
      error
    } = await supabase.from("messages").delete().eq("id", id);
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
      is_public: true
    };
    const {
      error
    } = await supabase.from("media").insert(payload);
    if (error) setAuthError(error.message);
    else {
      await loadDashboard();
      setMediaUploadUrl("");
      setAuthError(null);
    }
    setSaving(false);
  };
  const normalizedSearch = reactExports.useMemo(() => normalizeAdminSearch(searchQuery), [searchQuery]);
  const filteredArticles = reactExports.useMemo(() => articles.filter((article) => includesAdminSearch(normalizedSearch, [article.slug, article.title?.fr, article.title?.en, article.excerpt?.fr, article.excerpt?.en, article.content?.fr, article.content?.en, article.status])), [articles, normalizedSearch]);
  const filteredServices = reactExports.useMemo(() => services.filter((service) => includesAdminSearch(normalizedSearch, [service.slug, service.title?.fr, service.title?.en, service.short_description?.fr, service.short_description?.en, service.long_description?.fr, service.long_description?.en, service.metadata?.bullets?.fr?.join(" "), service.metadata?.bullets?.en?.join(" "), service.status])), [normalizedSearch, services]);
  const filteredContents = reactExports.useMemo(() => contents.filter((content) => includesAdminSearch(normalizedSearch, [content.section_key, content.locale, content.title, content.subtitle, content.body])), [contents, normalizedSearch]);
  const filteredMedia = reactExports.useMemo(() => media.filter((item) => includesAdminSearch(normalizedSearch, [item.file_name, item.url, item.mime_type, item.folder])), [media, normalizedSearch]);
  const filteredMessages = reactExports.useMemo(() => {
    const byStatus = messageFilter === "unread" ? messages.filter((item) => !item.is_read) : messageFilter === "read" ? messages.filter((item) => item.is_read) : messages;
    return byStatus.filter((message) => includesAdminSearch(normalizedSearch, [message.full_name, message.email, message.subject, message.message, message.status]));
  }, [messages, messageFilter, normalizedSearch]);
  const filteredAdminProfiles = reactExports.useMemo(() => adminProfiles.filter((profile) => includesAdminSearch(normalizedSearch, [profile.display_name, profile.email, profile.role, profile.is_active])), [adminProfiles, normalizedSearch]);
  const filteredAdminUsers = reactExports.useMemo(() => adminUsers.filter((user) => includesAdminSearch(normalizedSearch, [user.displayName, user.email, user.role, user.isActive, user.createdAt, user.lastSignInAt])), [adminUsers, normalizedSearch]);
  const unreadMessages = messages.filter((message) => !message.is_read).length;
  const canManageUsers = Boolean(currentAdminProfile && currentAdminProfile.role !== "sub_admin");
  const openUnreadMessages = reactExports.useCallback(() => {
    setMessageFilter("unread");
    setView("messages");
  }, []);
  reactExports.useEffect(() => {
    if (view === "users" && !canManageUsers) {
      setView("overview");
    }
  }, [canManageUsers, view]);
  if (loading && !session || checkingAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPreloader, {});
  }
  if (!session) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLogin, { onSubmit: signIn, loading, error: authError });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-shell min-h-screen bg-[#f4f7fb] text-slate-950", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-screen lg:h-screen lg:grid-cols-[300px_1fr] lg:overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSidebar, { view, unreadMessages, canManageUsers, tr, onNavigate: setView, onSignOut: signOut }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 lg:overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { session, unreadMessages, adminProfile: currentAdminProfile, searchQuery, lang, tr, onSearchChange: setSearchQuery, onLanguageToggle: () => setLang(lang === "fr" ? "en" : "fr"), onNotificationsClick: openUnreadMessages }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-5 px-4 pb-8 pt-4 sm:px-6 xl:px-8", children: [
          authError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700", children: authError }),
          normalizedSearch && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-900 sm:flex-row sm:items-center sm:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              tr("searchActive"),
              ": ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: searchQuery })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "secondary", size: "sm", onClick: () => setSearchQuery(""), children: tr("searchClear") })
          ] }),
          view === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewPanel, { metrics, articles: filteredArticles, services: filteredServices, contents: filteredContents, media: filteredMedia, messages: filteredMessages, unreadMessages, tr, onNavigate: setView }),
          view === "articles" && /* @__PURE__ */ jsxRuntimeExports.jsx(ArticlePanel, { articles: filteredArticles, allArticles: articles, selectedArticle, selectedArticleFiles, saving, tr, onSelect: setSelectedArticle, onFilesChange: setSelectedArticleFiles, onSave: saveArticle, onDelete: (id) => setConfirmation({
            title: "Supprimer cet article ?",
            description: "Cette action supprimera l'article et ses liaisons d'images. Elle ne pourra pas etre annulee depuis l'administration.",
            confirmLabel: "Supprimer l'article",
            onConfirm: () => deleteArticle(id)
          }), onDeletePhoto: deleteArticlePhoto, onReset: () => {
            setSelectedArticle(initialArticle);
            setSelectedArticleFiles([]);
          } }),
          view === "services" && /* @__PURE__ */ jsxRuntimeExports.jsx(ServicePanel, { services: filteredServices, allServices: services, selectedService, selectedServiceFiles, saving, tr, onSelect: setSelectedService, onFilesChange: setSelectedServiceFiles, onSave: saveService, onDelete: (id) => setConfirmation({
            title: "Supprimer ce service ?",
            description: "Le service ajoute depuis l'administration sera retire de la page Services. Les services historiques du site ne sont pas touches.",
            confirmLabel: "Supprimer le service",
            onConfirm: () => deleteService(id)
          }), onDeletePhoto: deleteServicePhoto, onReset: () => {
            setSelectedService(initialService);
            setSelectedServiceFiles([]);
          } }),
          view === "contents" && /* @__PURE__ */ jsxRuntimeExports.jsx(ContentPanel, { contents: filteredContents, selectedContent, saving, tr, onSelect: setSelectedContent, onSave: saveContent, onDelete: deleteContent, onReset: () => setSelectedContent(initialContent) }),
          view === "media" && /* @__PURE__ */ jsxRuntimeExports.jsx(MediaPanel, { media: filteredMedia, mediaUploadUrl, saving, tr, onUrlChange: setMediaUploadUrl, onUpload: uploadMedia }),
          view === "messages" && /* @__PURE__ */ jsxRuntimeExports.jsx(MessagePanel, { messages: filteredMessages, filter: messageFilter, tr, onFilterChange: setMessageFilter, onMark: markMessage, onDelete: deleteMessage }),
          view === "users" && canManageUsers && /* @__PURE__ */ jsxRuntimeExports.jsx(UsersPanel, { profiles: filteredAdminProfiles, users: filteredAdminUsers, newAdminUser, saving, tr, onChange: setNewAdminUser, onAdd: addSubAdmin }),
          view === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsPanel, { profile: profileSettings, saving, tr, onChange: setProfileSettings, onSave: saveProfileSettings })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmActionDialog, { action: confirmation, onClose: () => setConfirmation(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessDialog, { action: successDialog, onClose: () => setSuccessDialog(null) })
  ] });
}
function AdminPreloader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center bg-[#f4f7fb] px-4 text-slate-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid h-28 w-28 place-items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full border border-slate-200 bg-white shadow-xl shadow-slate-200/70" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full border-4 border-transparent border-r-blue-700 border-t-red-600 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoFutura, alt: "Futura Construction", className: "relative h-16 w-16 rounded-full object-cover" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-black uppercase tracking-[0.24em] text-red-600", children: "Futura Construction" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-black text-slate-950", children: "Préparation de l'espace admin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-500", children: "Vérification sécurisée de votre session" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-2", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-8 rounded-full bg-red-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-blue-700" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-slate-300" })
    ] })
  ] }) });
}
function AdminSidebar({
  view,
  unreadMessages,
  canManageUsers,
  tr,
  onNavigate,
  onSignOut
}) {
  const navItems = [{
    id: "overview",
    label: tr("dashboard"),
    Icon: House
  }, {
    id: "articles",
    label: tr("articles"),
    Icon: FileText
  }, {
    id: "services",
    label: tr("services"),
    Icon: Layers
  }, {
    id: "media",
    label: tr("media"),
    Icon: GalleryHorizontalEnd
  }, {
    id: "messages",
    label: tr("messages"),
    Icon: Mail,
    badge: unreadMessages
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "sticky top-0 hidden h-screen overflow-hidden bg-[#06275b] text-white lg:block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,0,28,0.24),transparent_38%),linear-gradient(180deg,rgba(2,14,38,0.05),rgba(2,14,38,0.86))]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "", className: "absolute inset-x-0 bottom-0 h-72 w-full object-cover opacity-20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex h-screen flex-col overflow-y-auto p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-7 flex items-center gap-3 px-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoFutura, alt: "Futura Construction", className: "h-16 w-16 rounded-lg object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black leading-none tracking-tight", children: "FUTURA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold tracking-[0.24em]", children: "CONSTRUCTION" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-blue-100", children: "Administration" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1.5", children: navItems.map(({
        id,
        label,
        Icon,
        badge
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onNavigate(id), className: cn("flex h-12 w-full items-center gap-3 rounded-lg px-4 text-left text-sm font-bold transition", view === id ? "bg-red-600 text-white shadow-lg shadow-red-950/25" : "text-blue-50 hover:bg-white/10"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: label }),
        badge ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-6 min-w-6 place-items-center rounded-full bg-red-600 px-2 text-xs text-white", children: badge }) : null,
        id === "services" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 opacity-80" }) : null
      ] }, id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-1.5", children: [...canManageUsers ? [{
        id: "users",
        label: tr("users"),
        Icon: Users
      }] : [], {
        id: "settings",
        label: tr("settings"),
        Icon: Settings
      }].map(({
        id,
        label,
        Icon
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onNavigate(id), className: "flex h-11 w-full items-center gap-3 rounded-lg px-4 text-left text-sm font-semibold text-blue-100 transition hover:bg-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }),
        label
      ] }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", onClick: onSignOut, className: "h-12 w-full justify-start gap-3 rounded-lg bg-red-600 font-bold text-white hover:bg-red-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-5 w-5" }),
        tr("logout")
      ] }) })
    ] })
  ] });
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
  onNotificationsClick
}) {
  const {
    theme,
    toggle
  } = useTheme();
  const displayName = adminProfile?.display_name || "Administrateur";
  const roleLabel = adminProfile?.role === "sub_admin" ? tr("subAdmin") : tr("adminMain");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 px-4 py-3 shadow-sm backdrop-blur sm:px-6 xl:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700 lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-xl flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: searchQuery, onChange: (event) => onSearchChange(event.target.value), className: "h-11 rounded-lg border-slate-200 bg-slate-50 pl-11 pr-11 text-sm", placeholder: tr("searchPlaceholder") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-900" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-4 md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onNotificationsClick, className: "relative grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600", "aria-label": "Voir les messages non lus", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }),
        unreadMessages ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white", children: unreadMessages }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onLanguageToggle, className: "flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-black transition hover:border-red-200 hover:bg-red-50 hover:text-red-600", "aria-label": tr("language"), children: lang.toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: toggle, className: "grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600", "aria-label": tr("theme"), children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-l border-slate-200 pl-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-black text-white", children: displayName.slice(0, 1).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-black", children: displayName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-slate-500", children: session.user.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-wide text-red-600", children: roleLabel })
        ] })
      ] })
    ] })
  ] }) });
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
  onNavigate
}) {
  const recentProjects = [{
    title: "Hangar Industriel",
    city: "Douala, Cameroun",
    image: projectImg
  }, {
    title: "Entrepot Metallique",
    city: "Yaounde, Cameroun",
    image: project2
  }, {
    title: "Charpente Metallique",
    city: "Kribi, Cameroun",
    image: project3
  }, {
    title: "Batiment Commercial",
    city: "Douala, Cameroun",
    image: project4
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden rounded-lg bg-[#06275b] p-6 text-white shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "", className: "absolute inset-0 h-full w-full object-cover opacity-45" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-r from-[#06275b] via-[#06275b]/85 to-[#06275b]/25" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black sm:text-3xl", children: tr("welcome") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm font-medium text-blue-50 sm:text-base", children: tr("welcomeText") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", onClick: () => onNavigate("articles"), className: "h-12 gap-2 rounded-lg bg-red-600 px-5 font-bold text-white hover:bg-red-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }),
          tr("newContent")
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "Articles", value: metrics?.totalArticles ?? 0, note: `${metrics?.activeArticles ?? 0} publies`, Icon: FileText, tone: "blue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "Services", value: metrics?.totalServices ?? 0, note: "Catalogue actif", Icon: Layers, tone: "red" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "Messages", value: metrics?.messagesReceived ?? 0, note: `${unreadMessages} non lus`, Icon: Mail, tone: "green" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "Medias", value: metrics?.totalMedia ?? 0, note: "Bibliotheque", Icon: GalleryHorizontalEnd, tone: "violet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "Contenus", value: contents.length, note: "Blocs du site", Icon: BookOpenText, tone: "orange" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 xl:grid-cols-[1.5fr_0.9fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PanelCard, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black", children: tr("statsTitle") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: tr("statsSub") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-2 rounded-lg px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
            "30 derniers jours"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-[170px_1fr]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LegendItem, { color: "bg-blue-600", label: "Visiteurs", value: "2.540" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LegendItem, { color: "bg-red-600", label: "Pages vues", value: "6.890" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LegendItem, { color: "bg-green-600", label: "Messages", value: messages.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LegendItem, { color: "bg-orange-500", label: "Articles publies", value: articles.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LegendItem, { color: "bg-violet-600", label: "Services modifies", value: services.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LineStats, {})
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PanelCard, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black", children: tr("recentMessages") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "rounded-full bg-red-600 text-white", children: unreadMessages })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          messages.slice(0, 5).map((message) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onNavigate("messages"), className: "flex w-full items-center gap-3 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-900 text-xs font-black text-white", children: message.full_name.slice(0, 1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-black", children: message.full_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-slate-500", children: message.subject || "Sans objet" })
            ] }),
            !message.is_read ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-red-600" }) : null
          ] }, message.id)),
          !messages.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-slate-50 p-4 text-sm text-slate-500", children: "Aucun message pour le moment." }) : null
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 xl:grid-cols-[0.9fr_1.5fr_0.9fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PanelCard, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-lg font-black", children: "Activites recentes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityItem, { Icon: PenLine, title: "Nouvel article publie", text: articles[0]?.slug ?? "Actualite du site" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityItem, { Icon: Mail, title: "Nouveau message recu", text: messages[0]?.full_name ?? "Boite de reception" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityItem, { Icon: Wrench, title: "Service modifie", text: services[0]?.slug ?? "Catalogue services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityItem, { Icon: ImagePlus, title: "Media ajoute", text: media[0]?.file_name ?? "Galerie" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PanelCard, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black", children: tr("recentProjects") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "text-sm font-bold text-red-600", children: "Voir tous" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: recentProjects.map((project) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-200 bg-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: project.image, alt: project.title, className: "h-28 w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black", children: project.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: project.city })
          ] })
        ] }, project.title)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PanelCard, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-lg font-black", children: tr("quickActions") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { Icon: PenLine, label: tr("newArticle"), onClick: () => onNavigate("articles") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { Icon: Layers, label: tr("newService"), onClick: () => onNavigate("services") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { Icon: ImagePlus, label: tr("addMedia"), onClick: () => onNavigate("media") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { Icon: Mail, label: tr("viewMessages"), onClick: () => onNavigate("messages") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuickAction, { Icon: Settings, label: tr("settings"), onClick: () => onNavigate("settings") })
        ] })
      ] })
    ] })
  ] });
}
function ArticlePanel(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ManagementShell, { title: props.tr("articleTitle"), description: props.tr("articleDesc"), listTitle: props.tr("existingArticles"), formTitle: props.selectedArticle.id ? props.tr("editArticle") : props.tr("addArticle"), list: props.articles.length ? props.articles.map((article) => /* @__PURE__ */ jsxRuntimeExports.jsx(RecordRow, { title: article.title?.fr || article.slug, meta: `${article.photos?.length ?? 0} image${(article.photos?.length ?? 0) > 1 ? "s" : ""} - ${article.is_active ? "Publie" : "Masque"}`, viewHref: `/articles/${encodeURIComponent(article.slug)}`, onEdit: () => {
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
      content_en: article.content?.en || article.content?.fr || article.excerpt?.fr || ""
    });
  }, onDelete: () => props.onDelete(article.id) }, article.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptySearchState, { text: props.tr("noResult") }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Titre", value: props.selectedArticle.title_fr, onChange: (value) => props.onSelect({
      ...props.selectedArticle,
      title_fr: value,
      title_en: value
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description", textarea: true, value: props.selectedArticle.content_fr, onChange: (value) => props.onSelect({
      ...props.selectedArticle,
      content_fr: value,
      content_en: value,
      excerpt_fr: createExcerpt(value),
      excerpt_en: createExcerpt(value)
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArticlePhotoPicker, { currentPhotos: props.selectedArticle.id ? props.allArticles.find((article) => article.id === props.selectedArticle.id)?.photos ?? [] : [], selectedFiles: props.selectedArticleFiles, onFilesChange: props.onFilesChange, onDeletePhoto: props.onDeletePhoto }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormActions, { saving: props.saving, onSave: props.onSave, onReset: props.onReset })
  ] });
}
function ArticlePhotoPicker({
  currentPhotos,
  selectedFiles,
  onFilesChange,
  onDeletePhoto
}) {
  const remainingSlots = Math.max(MAX_ARTICLE_IMAGES - currentPhotos.length - selectedFiles.length, 0);
  const selectedPreviews = reactExports.useMemo(() => selectedFiles.map((file) => ({
    file,
    url: URL.createObjectURL(file)
  })), [selectedFiles]);
  reactExports.useEffect(() => {
    return () => {
      selectedPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [selectedPreviews]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        "Images de l'article (",
        currentPhotos.length + selectedFiles.length,
        "/",
        MAX_ARTICLE_IMAGES,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "file", accept: "image/*", multiple: true, disabled: remainingSlots === 0, className: "bg-white", onChange: (event) => {
        const nextFiles = Array.from(event.target.files ?? []).filter((file) => file.type.startsWith("image/"));
        const existingKeys = new Set(selectedFiles.map((file) => `${file.name}-${file.size}-${file.lastModified}`));
        const uniqueNextFiles = nextFiles.filter((file) => {
          const key = `${file.name}-${file.size}-${file.lastModified}`;
          if (existingKeys.has(key)) return false;
          existingKeys.add(key);
          return true;
        });
        onFilesChange([...selectedFiles, ...uniqueNextFiles].slice(0, MAX_ARTICLE_IMAGES - currentPhotos.length));
        event.currentTarget.value = "";
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-slate-500", children: [
        "Minimum 1 image, maximum ",
        MAX_ARTICLE_IMAGES,
        ". La premiere image devient la couverture."
      ] })
    ] }),
    currentPhotos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-sm font-black text-slate-700", children: "Photos deja publiees" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: currentPhotos.map((photo) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-200 bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: photo.url, alt: photo.file_name, className: "h-32 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-xs font-bold text-slate-600", children: photo.file_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "destructive", size: "sm", onClick: () => onDeletePhoto(photo.link_id), children: "Retirer" })
        ] })
      ] }, photo.link_id)) })
    ] }),
    selectedPreviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-sm font-black text-slate-700", children: "Nouvelles photos a envoyer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: selectedPreviews.map((preview) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-lg border border-dashed border-red-200 bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview.url, alt: preview.file.name, className: "h-32 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs font-bold text-slate-600", children: preview.file.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "secondary", size: "sm", onClick: () => onFilesChange(selectedFiles.filter((file) => file !== preview.file)), children: "Retirer" })
        ] })
      ] }, `${preview.file.name}-${preview.file.lastModified}`)) })
    ] })
  ] });
}
function ServicePanel(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ManagementShell, { title: props.tr("serviceTitle"), description: props.tr("serviceDesc"), listTitle: props.tr("serviceListTitle"), formTitle: props.selectedService.id ? props.tr("editService") : props.tr("addService"), list: props.services.length ? props.services.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsx(RecordRow, { title: service.title?.fr || service.slug, meta: `${service.photos?.length ?? 0} image${(service.photos?.length ?? 0) > 1 ? "s" : ""} - ajoute depuis Supabase`, onEdit: () => {
    props.onFilesChange([]);
    props.onSelect({
      id: service.id,
      slug: service.slug,
      title_fr: service.title?.fr ?? "",
      title_en: service.title?.en ?? "",
      short_description_fr: service.short_description?.fr ?? "",
      short_description_en: service.short_description?.en ?? service.short_description?.fr ?? "",
      long_description_fr: service.long_description?.fr ?? "",
      long_description_en: service.long_description?.en ?? service.long_description?.fr ?? "",
      bullets_fr: service.metadata?.bullets?.fr?.join("\n") ?? "",
      bullets_en: service.metadata?.bullets?.en?.join("\n") ?? service.metadata?.bullets?.fr?.join("\n") ?? "",
      icon: service.icon || "Building2",
      status: service.status,
      is_active: service.is_active
    });
  }, onDelete: () => props.onDelete(service.id) }, service.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptySearchState, { text: props.tr("noResult") }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-medium text-blue-900", children: "Les services historiques du site restent intacts. Ce formulaire ajoute uniquement un nouveau service qui apparaitra apres les services deja presents." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Icone du service" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: props.selectedService.icon, onChange: (event) => props.onSelect({
        ...props.selectedService,
        icon: event.target.value
      }), className: "h-10 w-full rounded-md border border-input bg-white px-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Building2", children: "Batiment / Construction" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "PencilRuler", children: "Conception / Etudes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Hammer", children: "Fabrication" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "HardHat", children: "Pose / Chantier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ClipboardCheck", children: "Suivi / Controle" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Titre du service", value: props.selectedService.title_fr, onChange: (value) => props.onSelect({
      ...props.selectedService,
      title_fr: value,
      title_en: value
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Courte description", value: props.selectedService.short_description_fr, onChange: (value) => props.onSelect({
      ...props.selectedService,
      short_description_fr: value,
      short_description_en: value
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description detaillee", textarea: true, value: props.selectedService.long_description_fr, onChange: (value) => props.onSelect({
      ...props.selectedService,
      long_description_fr: value,
      long_description_en: value
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Ce que nous livrons (une ligne par element)", textarea: true, value: props.selectedService.bullets_fr, onChange: (value) => props.onSelect({
      ...props.selectedService,
      bullets_fr: value,
      bullets_en: value
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ServicePhotoPicker, { currentPhotos: props.selectedService.id ? props.allServices.find((service) => service.id === props.selectedService.id)?.photos ?? [] : [], selectedFiles: props.selectedServiceFiles, onFilesChange: props.onFilesChange, onDeletePhoto: props.onDeletePhoto }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormActions, { saving: props.saving, onSave: props.onSave, onReset: props.onReset })
  ] });
}
function ServicePhotoPicker({
  currentPhotos,
  selectedFiles,
  onFilesChange,
  onDeletePhoto
}) {
  const remainingSlots = Math.max(MAX_SERVICE_IMAGES - currentPhotos.length - selectedFiles.length, 0);
  const selectedPreviews = reactExports.useMemo(() => selectedFiles.map((file) => ({
    file,
    url: URL.createObjectURL(file)
  })), [selectedFiles]);
  reactExports.useEffect(() => {
    return () => {
      selectedPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [selectedPreviews]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        "Images du service (",
        currentPhotos.length + selectedFiles.length,
        "/",
        MAX_SERVICE_IMAGES,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "file", accept: "image/*", multiple: true, disabled: remainingSlots === 0, className: "bg-white", onChange: (event) => {
        const nextFiles = Array.from(event.target.files ?? []).filter((file) => file.type.startsWith("image/"));
        const existingKeys = new Set(selectedFiles.map((file) => `${file.name}-${file.size}-${file.lastModified}`));
        const uniqueNextFiles = nextFiles.filter((file) => {
          const key = `${file.name}-${file.size}-${file.lastModified}`;
          if (existingKeys.has(key)) return false;
          existingKeys.add(key);
          return true;
        });
        onFilesChange([...selectedFiles, ...uniqueNextFiles].slice(0, MAX_SERVICE_IMAGES - currentPhotos.length));
        event.currentTarget.value = "";
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-slate-500", children: [
        "Minimum 1 image, maximum ",
        MAX_SERVICE_IMAGES,
        ". Ces images seront affichees dans la galerie du service."
      ] })
    ] }),
    currentPhotos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-sm font-black text-slate-700", children: "Photos deja publiees" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: currentPhotos.map((photo) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-200 bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: photo.url, alt: photo.file_name, className: "h-32 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-xs font-bold text-slate-600", children: photo.file_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "destructive", size: "sm", onClick: () => onDeletePhoto(photo.link_id), children: "Retirer" })
        ] })
      ] }, photo.link_id)) })
    ] }),
    selectedPreviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-sm font-black text-slate-700", children: "Nouvelles photos a envoyer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: selectedPreviews.map((preview) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-lg border border-dashed border-red-200 bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview.url, alt: preview.file.name, className: "h-32 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs font-bold text-slate-600", children: preview.file.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "secondary", size: "sm", onClick: () => onFilesChange(selectedFiles.filter((file) => file !== preview.file)), children: "Retirer" })
        ] })
      ] }, `${preview.file.name}-${preview.file.lastModified}`)) })
    ] })
  ] });
}
function ContentPanel(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ManagementShell, { title: props.tr("contentTitle"), description: props.tr("contentDesc"), listTitle: props.tr("activeContent"), formTitle: props.selectedContent.id ? "Modifier le contenu" : "Nouveau contenu", list: props.contents.length ? props.contents.map((content) => /* @__PURE__ */ jsxRuntimeExports.jsx(RecordRow, { title: `${content.section_key} (${content.locale})`, meta: content.title || "Bloc sans titre", onEdit: () => props.onSelect({
    id: content.id,
    section_key: content.section_key,
    locale: content.locale,
    title: content.title ?? "",
    subtitle: content.subtitle ?? "",
    body: content.body ?? ""
  }), onDelete: () => props.onDelete(content.id) }, content.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptySearchState, { text: props.tr("noResult") }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cle de section", value: props.selectedContent.section_key, onChange: (value) => props.onSelect({
        ...props.selectedContent,
        section_key: value
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Langue", value: props.selectedContent.locale, onChange: (value) => props.onSelect({
        ...props.selectedContent,
        locale: value
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Titre", value: props.selectedContent.title, onChange: (value) => props.onSelect({
      ...props.selectedContent,
      title: value
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Sous-titre", value: props.selectedContent.subtitle, onChange: (value) => props.onSelect({
      ...props.selectedContent,
      subtitle: value
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Texte", textarea: true, value: props.selectedContent.body, onChange: (value) => props.onSelect({
      ...props.selectedContent,
      body: value
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormActions, { saving: props.saving, onSave: props.onSave, onReset: props.onReset })
  ] });
}
function MediaPanel({
  media,
  mediaUploadUrl,
  saving,
  tr,
  onUrlChange,
  onUpload
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PanelCard, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black", children: tr("mediaTitle") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: tr("mediaDesc") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-[minmax(260px,1fr)_auto]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: mediaUploadUrl, onChange: (event) => onUrlChange(event.target.value), placeholder: "URL de l'image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onUpload, disabled: saving, className: "gap-2 bg-red-600 text-white hover:bg-red-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-4 w-4" }),
          saving ? "Ajout..." : "Ajouter"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: [
      media.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-lg border border-slate-200 bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.url, alt: item.file_name, className: "h-40 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-black", children: item.file_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: item.folder || "uploads" })
        ] })
      ] }, item.id)),
      !media.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptySearchState, { text: tr("noResult") }) : null
    ] })
  ] });
}
function MessagePanel({
  messages,
  filter,
  tr,
  onFilterChange,
  onMark,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PanelCard, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black", children: tr("messages") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: tr("messagesDesc") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [{
        id: "all",
        label: tr("all")
      }, {
        id: "unread",
        label: tr("unread")
      }, {
        id: "read",
        label: tr("read")
      }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onFilterChange(item.id), className: cn("rounded-lg border px-4 py-2 text-sm font-bold", filter === item.id ? "border-red-600 bg-red-600 text-white" : "border-slate-200 bg-white"), children: item.label }, item.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      messages.map((message) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-slate-200 bg-white p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black", children: message.subject || "Sans objet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-slate-600", children: [
            message.full_name,
            " - ",
            message.email
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-6 text-slate-600", children: message.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "sm", onClick: () => onMark(message.id, !message.is_read), children: message.is_read ? "Non lu" : "Lu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", size: "sm", onClick: () => onDelete(message.id), children: "Supprimer" })
        ] })
      ] }) }, message.id)),
      !messages.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptySearchState, { text: tr("noResult") }) : null
    ] })
  ] });
}
function SettingsPanel({
  profile,
  saving,
  tr,
  onChange,
  onSave
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black", children: tr("settingsTitle") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: tr("settingsDesc") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelCard, { className: "max-w-3xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nom", value: profile.display_name, onChange: (value) => onChange({
        ...profile,
        display_name: value
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Adresse mail", type: "email", value: profile.email, onChange: (value) => onChange({
        ...profile,
        email: value
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-slate-200 bg-slate-50 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-black text-slate-800", children: "Changer le mot de passe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs font-medium text-slate-500", children: "Laissez ces champs vides si vous ne souhaitez pas changer votre mot de passe." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nouveau mot de passe", type: "password", value: profile.password, onChange: (value) => onChange({
            ...profile,
            password: value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Confirmer le mot de passe", type: "password", value: profile.password_confirm, onChange: (value) => onChange({
            ...profile,
            password_confirm: value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", onClick: onSave, disabled: saving, className: "h-11 gap-2 rounded-lg bg-red-600 font-bold text-white hover:bg-red-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }),
        saving ? "Enregistrement..." : tr("saveSettings")
      ] })
    ] }) })
  ] });
}
function formatAdminDate(value) {
  if (!value) return "date inconnue";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(value));
}
function UsersPanel({
  profiles,
  users,
  newAdminUser,
  saving,
  tr,
  onChange,
  onAdd
}) {
  const displayedUsers = users.length > 0 ? users : profiles.map((profile) => ({
    id: profile.user_id,
    email: profile.email,
    displayName: profile.display_name || "",
    role: profile.role,
    isActive: profile.is_active,
    createdAt: profile.created_at,
    lastSignInAt: null
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black", children: tr("usersTitle") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: tr("usersDesc") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 xl:grid-cols-[1fr_520px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PanelCard, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black", children: tr("usersList") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "w-fit rounded-full", children: [
            displayedUsers.length,
            " compte",
            displayedUsers.length > 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          displayedUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-black", children: user.displayName || user.email || "Utilisateur sans email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm text-slate-500", children: user.email || "Email absent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs font-medium text-slate-400", children: [
                "Cree le ",
                formatAdminDate(user.createdAt),
                user.lastSignInAt ? ` - Derniere connexion ${formatAdminDate(user.lastSignInAt)}` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: cn("rounded-full", user.role === "sub_admin" ? "bg-blue-100 text-blue-800" : user.role === "utilisateur" ? "bg-slate-100 text-slate-700" : "bg-red-100 text-red-800"), children: user.role === "sub_admin" ? tr("subAdmin") : user.role === "utilisateur" ? "Utilisateur" : tr("adminMain") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: cn("rounded-full", user.isActive ? "border-emerald-200 text-emerald-700" : "text-slate-500"), children: user.isActive ? "Actif" : "Non admin" })
            ] })
          ] }, user.id)),
          !displayedUsers.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-slate-50 p-4 text-sm text-slate-500", children: "Aucun utilisateur trouve." }) : null
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PanelCard, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-black", children: tr("addSubAdmin") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-medium text-blue-900", children: "Le compte sera cree directement avec ces informations. Le sous-admin pourra gerer le contenu, mais il ne verra pas la gestion des utilisateurs." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nom de l'utilisateur", value: newAdminUser.display_name, onChange: (value) => onChange({
            ...newAdminUser,
            display_name: value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email du compte", type: "email", value: newAdminUser.email, onChange: (value) => onChange({
            ...newAdminUser,
            email: value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Mot de passe", type: "password", value: newAdminUser.password, onChange: (value) => onChange({
            ...newAdminUser,
            password: value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Confirmer le mot de passe", type: "password", value: newAdminUser.password_confirm, onChange: (value) => onChange({
            ...newAdminUser,
            password_confirm: value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", onClick: onAdd, disabled: saving, className: "h-11 w-full gap-2 rounded-lg bg-red-600 font-bold text-white hover:bg-red-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            saving ? "Ajout..." : "Ajouter le sous-admin"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function SuccessDialog({
  action,
  onClose
}) {
  if (!action) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-lg border border-emerald-100 bg-white p-5 shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-slate-950", children: action.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-slate-600", children: action.description })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: onClose, className: "bg-emerald-600 font-bold text-white hover:bg-emerald-700", children: "OK" }) })
  ] }) });
}
function ConfirmActionDialog({
  action,
  onClose
}) {
  const [confirming, setConfirming] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!action) setConfirming(false);
  }, [action]);
  if (!action) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-slate-950", children: action.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-slate-600", children: action.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "secondary", onClick: onClose, disabled: confirming, children: "Annuler" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "destructive", disabled: confirming, onClick: async () => {
        setConfirming(true);
        await action.onConfirm();
        setConfirming(false);
        onClose();
      }, children: confirming ? "Suppression..." : action.confirmLabel })
    ] })
  ] }) });
}
function ManagementShell({
  title,
  description,
  listTitle,
  formTitle,
  list,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 xl:grid-cols-[1fr_520px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PanelCard, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-black", children: listTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: list })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PanelCard, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-black", children: formTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children })
      ] })
    ] })
  ] });
}
function RecordRow({
  title,
  meta,
  viewHref,
  onEdit,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-black", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: meta })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      viewHref && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: viewHref, target: "_blank", rel: "noreferrer", children: "Voir" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "sm", onClick: onEdit, children: "Modifier" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", size: "sm", onClick: onDelete, children: "Supprimer" })
    ] })
  ] });
}
function PanelCard({
  className,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: cn("rounded-lg border border-slate-200 bg-white shadow-sm", className), children });
}
function EmptySearchState({
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-full rounded-lg bg-slate-50 p-4 text-sm font-medium text-slate-500", children: text });
}
function KpiCard({
  label,
  value,
  note,
  Icon,
  tone
}) {
  const tones = {
    blue: "from-blue-600 to-blue-800",
    red: "from-red-600 to-red-800",
    green: "from-emerald-500 to-emerald-700",
    violet: "from-violet-600 to-purple-700",
    orange: "from-orange-500 to-orange-700"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PanelCard, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-14 w-14 place-items-center rounded-full bg-linear-to-br text-white", tones[tone]), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-7 w-7" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-600", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-black", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs font-bold text-emerald-600", children: note })
    ] })
  ] }) });
}
function LegendItem({
  color,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 font-semibold text-slate-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("h-2.5 w-2.5 rounded-full", color) }),
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black", children: value })
  ] });
}
function LineStats() {
  const bars = [38, 54, 51, 60, 44, 48, 72, 63, 66, 84, 91, 70, 78, 73, 95, 82];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-56 overflow-hidden rounded-lg border border-slate-200 bg-linear-to-b from-slate-50 to-white p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-4 bottom-10 top-5 grid grid-rows-4", children: [0, 1, 2, 3].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "border-t border-dashed border-slate-200" }, item)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex h-full items-end gap-2 pb-8 pt-4", children: bars.map((height, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex flex-1 items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block w-full rounded-t bg-linear-to-t from-blue-100 to-blue-600", style: {
      height: `${height}%`
    } }) }, index)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-4 right-4 flex justify-between text-xs font-semibold text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "05 Juin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "15 Juin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "25 Juin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "30 Juin" })
    ] })
  ] });
}
function ActivityItem({
  Icon,
  title,
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-600 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-black", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: text })
    ] })
  ] });
}
function QuickAction({
  Icon,
  label,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, className: "flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-center text-xs font-black transition hover:border-red-200 hover:bg-red-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-7 w-7 text-red-600" }),
    label
  ] });
}
function FormActions({
  saving,
  onSave,
  onReset
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 pt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onSave, disabled: saving, className: "bg-red-600 text-white hover:bg-red-700", children: saving ? "Enregistrement..." : "Enregistrer" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", onClick: onReset, children: "Reinitialiser" })
  ] });
}
function Field({
  label,
  value,
  onChange,
  textarea,
  type = "text"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    textarea ? /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value, onChange: (event) => onChange(event.target.value), className: "min-h-28 bg-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type, value, onChange: (event) => onChange(event.target.value), className: "bg-white" })
  ] });
}
export {
  AdminPage as component
};
