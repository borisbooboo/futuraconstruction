import { Linkedin, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionTag } from "./SectionTag";
import team1 from "@/assets/boris.jpg";
import team2 from "@/assets/boris.jpg";
import team3 from "@/assets/boris.jpg";
import team4 from "@/assets/boris.jpg";

const TEAM = [
  { img: team1, name: "tendjou boris", role: { fr: "Directeur Général", en: "Managing Director" } },
  { img: team2, name: "tendjou boris", role: { fr: "Architecte en chef", en: "Chief Architect" } },
  { img: team3, name: "tendjou boris", role: { fr: "Chef d'atelier", en: "Workshop Foreman" } },
  { img: team4, name: "tendjou boris", role: { fr: "Cheffe de projet", en: "Project Manager" } },
];

export function TeamSection() {
  const { t, lang } = useI18n();
  return (
    <section className="py-20 bg-secondary/40">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionTag>{t("team.tag")}</SectionTag>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-balance">{t("team.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("team.sub")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((m) => (
            <div key={m.name} className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="aspect-[4/5] overflow-hidden bg-secondary relative">
                <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center gap-3 pb-5">
                  <a href="#" aria-label="LinkedIn" className="h-9 w-9 grid place-items-center rounded-full bg-white text-brand-blue-deep hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href="#" aria-label="Email" className="h-9 w-9 grid place-items-center rounded-full bg-white text-brand-blue-deep hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="p-5 text-center">
                <h3 className="font-display font-bold text-lg">{m.name}</h3>
                <p className="text-xs uppercase tracking-widest text-accent font-bold mt-1">{m.role[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
