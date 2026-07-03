import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react";
import logoFutura from "@/assets/logo-futura.jpg";
import heroImg from "@/assets/hero-steel.jpg";

interface AdminLoginProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export function AdminLogin({ onSubmit, loading = false, error }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [validationTouched, setValidationTouched] = useState(false);

  const validateEmail = (value: string): boolean => {
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

  const validatePassword = (value: string): boolean => {
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (validationTouched) validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (validationTouched) validatePassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#02070d] px-4 py-4 text-white">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          className="h-full w-full object-cover opacity-50 animate-[slowZoom_22s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(2,7,13,0.98)_0%,rgba(4,24,38,0.94)_38%,rgba(87,10,22,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(38, 111, 220, 0.35),transparent_24%),radial-gradient(circle_at_78%_72%,rgba(8,145,178,0.26),transparent_30%)]" />
      </div>

      <div className="absolute inset-0 opacity-[0.11] bg-[linear-gradient(rgba(255,255,255,.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.75)_1px,transparent_1px)] bg-[size:56px_56px] animate-[gridMove_18s_linear_infinite]" />

      <div className="absolute left-[7%] top-[-12%] h-[130%] w-24 -skew-x-12 bg-red-700/20 blur-sm animate-[beamOne_8s_ease-in-out_infinite]" />
      <div className="absolute right-[10%] top-[-12%] h-[130%] w-12 skew-x-12 bg-white/10 blur-sm animate-[beamTwo_10s_ease-in-out_infinite]" />

      <div className="absolute left-10 bottom-12 h-36 w-36 rounded-full border border-red-300/20 animate-ping" />
      <div className="absolute right-10 top-10 h-44 w-44 rounded-full border border-white/10 animate-pulse" />

      <div className="relative z-10 flex min-h-[calc(100vh-2rem)] items-center justify-center">
        <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.25fr_390px]">
          <div className="hidden lg:block animate-[fadeInLeft_0.9s_ease-out_both]">
            <div className="max-w-xl">
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-xl">
                <img src={logoFutura} alt="" className="h-9 w-9 rounded-full object-cover" />
                <span className="text-xs font-black uppercase tracking-[0.24em] text-white/85">
                  Futura Construction
                </span>
              </div>

              <p className="text-xs font-black uppercase tracking-[0.34em] text-red-300">
                Espace administrateur
              </p>

              <h1 className="mt-5 font-display text-5xl font-black leading-[0.95] tracking-tight xl:text-6xl">
                Contrôle.
                <span className="block text-red-300">Sécurité.</span>
                <span className="block text-white/80">Performance.</span>
              </h1>

              <p className="mt-6 max-w-md text-sm font-medium leading-7 text-white/70">
                Accédez au tableau de bord pour gérer les contenus, les médias,
                les actualités et les messages du site.
              </p>

              <div className="mt-9 flex items-center gap-4">
                <div className="relative h-[3px] w-44 overflow-hidden rounded-full bg-white/15">
                  <div className="absolute inset-y-0 left-0 w-20 rounded-full bg-red-400 animate-[lineRun_2.6s_ease-in-out_infinite]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
                  Secure access
                </span>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[390px] animate-[fadeInUp_0.85s_ease-out_both]">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[34px] bg-gradient-to-br from-red-600/55 via-cyan-300/20 to-white/10 blur-2xl animate-pulse" />

              <div className="relative overflow-hidden rounded-[34px] border border-white/20 bg-white/10 p-[1px] shadow-2xl shadow-black/60 backdrop-blur-2xl">
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
                <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-red-600/20 blur-2xl" />
                <div className="absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-cyan-400/20 blur-2xl" />

                <div className="relative rounded-[33px] bg-[#f8fafc]/95 px-6 py-6 text-slate-950">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute -inset-2 rounded-2xl bg-red-500/25 blur-md animate-pulse" />
                      <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-slate-950 shadow-xl">
                        <img
                          src={logoFutura}
                          alt="Futura Construction"
                          className="h-11 w-11 rounded-full object-cover"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-red-700">
                        <ShieldCheck className="h-3 w-3" />
                        Sécurisé
                      </div>

                      <h2 className="mt-2 font-display text-2xl font-black leading-none text-slate-950">
                        Connexion
                      </h2>
                    </div>
                  </div>

                  <p className="mb-5 text-xs font-medium leading-5 text-slate-500">
                    Accédez à l’espace de gestion du site.
                  </p>

                  {error && (
                    <div className="mb-4 flex gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 animate-[shake_0.35s_ease-in-out_both]">
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                      <p className="text-xs font-semibold text-red-700">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500"
                      >
                        Adresse email
                      </Label>

                      <div className="rounded-2xl bg-gradient-to-r from-slate-200 via-white to-slate-200 p-[1px] transition-all duration-300 focus-within:from-red-500 focus-within:via-red-300 focus-within:to-cyan-400">
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                          onBlur={() => {
                            setValidationTouched(true);
                            validateEmail(email);
                          }}
                          placeholder="admin@futuraconstruction.com"
                          disabled={loading}
                          className={`h-11 rounded-2xl border-0 bg-white px-4 text-sm font-semibold shadow-none placeholder:text-slate-400 focus-visible:ring-0 ${
                            emailError ? "bg-red-50" : ""
                          }`}
                        />
                      </div>

                      {emailError && (
                        <p className="text-[11px] font-semibold text-red-600">{emailError}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="password"
                        className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500"
                      >
                        Mot de passe
                      </Label>

                      <div className="relative rounded-2xl bg-gradient-to-r from-slate-200 via-white to-slate-200 p-[1px] transition-all duration-300 focus-within:from-red-500 focus-within:via-red-300 focus-within:to-cyan-400">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={handlePasswordChange}
                          onBlur={() => {
                            setValidationTouched(true);
                            validatePassword(password);
                          }}
                          placeholder="••••••••"
                          disabled={loading}
                          className={`h-11 rounded-2xl border-0 bg-white px-4 pr-11 text-sm font-semibold shadow-none placeholder:text-slate-400 focus-visible:ring-0 ${
                            passwordError ? "bg-red-50" : ""
                          }`}
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={loading}
                          className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-950 disabled:opacity-50"
                          aria-label={
                            showPassword
                              ? "Masquer le mot de passe"
                              : "Afficher le mot de passe"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      {passwordError && (
                        <p className="text-[11px] font-semibold text-red-600">{passwordError}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={loading || !email || !password}
                      className="group relative h-11 w-full overflow-hidden rounded-2xl bg-slate-950 text-sm font-black text-white shadow-xl shadow-slate-950/25 transition-all duration-300 hover:bg-slate-900 disabled:opacity-60"
                      size="lg"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-500 to-red-700 opacity-90" />
                      <span className="absolute inset-y-0 -left-20 w-16 rotate-12 bg-white/25 blur-sm transition-all duration-700 group-hover:left-[120%]" />

                      <span className="relative flex items-center justify-center gap-2">
                        <LogIn className="h-4 w-4" />
                        {loading ? "Connexion..." : "Se connecter"}
                      </span>
                    </Button>
                  </form>

                  <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                    Accès réservé aux administrateurs.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </section>
  );
}