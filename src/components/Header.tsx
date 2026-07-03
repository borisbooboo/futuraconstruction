import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, Globe, ArrowRight } from "lucide-react";
import logo from "@/assets/logo-futura.jpg";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", k: "nav.home" as const },
  { to: "/about", k: "nav.about" as const },
  { to: "/services", k: "nav.services" as const },
  { to: "/articles", k: "nav.articles" as const },
  { to: "/contact", k: "nav.contact" as const },
  { to: "/admin", k: "nav.admin" as const },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-[0_8px_30px_-15px_rgba(0,0,0,0.2)]"
          : "bg-background/30 backdrop-blur-md"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative">
            <img src={logo} alt="Futura Construction" className="h-10 md:h-12 w-auto rounded-lg bg-white p-0.5 shadow-sm group-hover:shadow-md transition-shadow duration-300" />
          </div>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display font-extrabold text-[15px] tracking-tight text-primary">FUTURA</span>
            <span className="font-display font-bold text-[11px] text-accent tracking-[0.2em]">CONSTRUCTION</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full border border-border/60 bg-card/40 backdrop-blur-sm">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="relative px-4 py-2 text-sm font-semibold text-foreground/70 hover:text-foreground rounded-full transition-colors data-[status=active]:text-accent-foreground group"
            >
              <span className="absolute inset-0 rounded-full bg-accent scale-90 opacity-0 group-data-[status=active]:scale-100 group-data-[status=active]:opacity-100 transition-all duration-300 -z-10" />
              {t(l.k)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-full border border-border text-xs font-bold uppercase hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300"
            aria-label="Change language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang.toUpperCase()}
          </button>
          <button
            onClick={toggle}
            className="h-9 w-9 grid place-items-center rounded-full border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Button asChild className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground font-bold tracking-wide rounded-full shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.03] transition-all duration-300 group">
            <Link to="/contact">
              {t("cta.quote")}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
          <button
            onClick={() => setOpen(o => !o)}
            className="lg:hidden h-9 w-9 grid place-items-center rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container-x py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="py-3 px-4 text-sm font-semibold rounded-xl data-[status=active]:bg-accent data-[status=active]:text-accent-foreground hover:bg-accent/5 transition-colors"
              >
                {t(l.k)}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-3">
              <button onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                className="flex items-center gap-1.5 h-10 px-4 rounded-full border border-border text-xs font-bold uppercase hover:border-accent hover:text-accent transition-colors">
                <Globe className="h-3.5 w-3.5" /> {lang.toUpperCase()}
              </button>
              <Button asChild className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full h-10 shadow-lg shadow-accent/20">
                <Link to="/contact">
                  {t("cta.quote")}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}