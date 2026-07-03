import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Facebook, Linkedin, Instagram, Clock } from "lucide-react";
import logo from "@/assets/logo-futura.jpg";
import { useI18n } from "@/lib/i18n";
import { COMPANY, services } from "@/lib/data";

const socialLinks = [
  { Icon: Facebook, href: "https://www.facebook.com/share/1Cam2Xiq9c/?mibextid=wwXIfr", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/futura.construction.sarl?igsh=MXRudW8zbDNsd2tmdw==", label: "Instagram" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  const { t, lang } = useI18n();
  return (
    <footer className="relative mt-24 bg-brand-blue-deep text-white overflow-hidden">
      {/* decorative background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, white 0px, white 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="container-x py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-12 relative">
        {/* Brand + socials */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="" className="h-12 w-auto bg-white rounded-sm p-0.5 border border-white/10" />
            <div className="leading-tight">
              <div className="font-display font-extrabold tracking-[0.08em]">FUTURA</div>
              <div className="font-display text-[10px] text-accent tracking-[0.25em]">CONSTRUCTION</div>
            </div>
          </div>
          <p className="text-sm text-white/60 leading-relaxed mb-5">{t("footer.tagline")}</p>

          <div className="flex items-center gap-3 text-sm text-white/70 mb-2">
            <Clock className="h-4 w-4 text-accent shrink-0" />
            <span>{t("contact.info.hoursVal")}</span>
          </div>

          <div className="flex gap-2.5 mt-5">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-10 w-10 grid place-items-center rounded-sm border border-white/15 bg-white/5 text-white/70 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-200 hover:-translate-y-0.5"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-5 pb-2 border-b border-white/10">{t("footer.links")}</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-0.5 transition-all"><span className="h-1 w-1 rounded-full bg-accent shrink-0" />{t("nav.home")}</Link></li>
            <li><Link to="/about" className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-0.5 transition-all"><span className="h-1 w-1 rounded-full bg-accent shrink-0" />{t("nav.about")}</Link></li>
            <li><Link to="/services" className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-0.5 transition-all"><span className="h-1 w-1 rounded-full bg-accent shrink-0" />{t("nav.services")}</Link></li>
            <li><Link to="/articles" className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-0.5 transition-all"><span className="h-1 w-1 rounded-full bg-accent shrink-0" />{t("nav.articles")}</Link></li>
            <li><Link to="/contact" className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-0.5 transition-all"><span className="h-1 w-1 rounded-full bg-accent shrink-0" />{t("nav.contact")}</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="lg:col-span-3">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-5 pb-2 border-b border-white/10">{t("footer.services")}</h4>
          <ul className="space-y-2.5 text-sm">
            {services.map(s => (
              <li key={s.id}>
                <Link to="/services" hash={s.id} className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-0.5 transition-all">
                  <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
                  {s.title[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact card */}
        <div className="lg:col-span-3">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-5 pb-2 border-b border-white/10">{t("footer.contact")}</h4>
          <ul className="space-y-3.5 text-sm">
            <li className="flex gap-3 items-start p-3 rounded-sm bg-white/5 border border-white/10">
              <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
              <span className="text-white/70">{COMPANY.address}</span>
            </li>
            <li className="flex gap-3 items-center p-3 rounded-sm bg-white/5 border border-white/10">
              <Phone className="h-4 w-4 text-accent shrink-0" />
              <a href={`tel:${COMPANY.phoneRaw}`} className="text-white/70 hover:text-white transition-colors font-semibold">{COMPANY.phone}</a>
            </li>
            <li className="flex gap-3 items-center p-3 rounded-sm bg-white/5 border border-white/10">
              <Mail className="h-4 w-4 text-accent shrink-0" />
              <a href={`mailto:${COMPANY.email}`} className="text-white/70 hover:text-white transition-colors break-all font-semibold">{COMPANY.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-5">
        <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>© {new Date().getFullYear()} {COMPANY.name}. {t("footer.rights")}</span>
          <span className="font-display tracking-[0.25em] text-accent/60">FUTURA CONSTRUCTION SARL</span>
        </div>
      </div>
    </footer>
  );
}