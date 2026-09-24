import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

const objectives = [
  { value: "Escalar", desc: "Acelerar el crecimiento digital" },
  { value: "Construir", desc: "Crear algo desde cero" },
  { value: "Automatizar", desc: "Optimizar procesos y CRM" },
  { value: "Branding", desc: "Renovar la identidad de marca" },
];

const timelines = ["Urgente", "1-3 meses", "3-6 meses", "Solo explorando"];

export default function Contact() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    objective: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const canNext =
    (step === 0 && data.objective) ||
    (step === 1 && data.timeline) ||
    step === 2;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await base44.functions.invoke("submitContactForm", {
        name: data.name,
        email: data.email,
        company: data.company,
        service: data.objective,
        message: `${data.message}\n\n[Timeline: ${data.timeline}]`,
      });
      setDone(true);
      toast({
        title: "Synergy iniciada",
        description: "Te contactaremos a la brevedad.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Intenta nuevamente en unos minutos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setDone(false);
    setStep(0);
    setData({
      objective: "",
      timeline: "",
      name: "",
      email: "",
      company: "",
      message: "",
    });
  };

  const inputClass =
    "w-full bg-[#FAFAFA] border border-black/10 rounded-xl px-4 py-3 text-[#1A1A1A] placeholder-[#999] focus:outline-none focus:border-[#A020F0] focus:ring-2 focus:ring-[#A020F0]/20 transition-all";

  return (
    <section id="contacto" className="relative bg-[#FAFAFA] py-24 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-mono text-xs tracking-[0.25em] text-[#A020F0] uppercase mb-4">
            Synergy Forge
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-[#1A1A1A] tracking-tight">
            Configuremos tu <span className="text-gradient">proyecto</span>
          </h2>
          <p className="text-[#666] mt-4">
            Un proceso guiado, no un formulario eterno.
          </p>
        </div>

        {/* Step indicator */}
        {!done && (
          <div className="flex items-center justify-center gap-3 mb-12 font-mono text-xs tracking-[0.2em]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold transition-colors ${
                    i === step
                      ? "bg-aeon-gradient text-white"
                      : i < step
                      ? "bg-[#A020F0]/15 text-[#A020F0]"
                      : "bg-black/5 text-[#999]"
                  }`}
                >
                  {i + 1}
                </span>
                {i < 2 && <span className="w-8 h-px bg-black/10 inline-block" />}
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-3xl border border-black/5 shadow-soft p-8 md:p-10">
          {done ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-aeon-gradient flex items-center justify-center mb-6 shadow-soft">
                <Check size={28} className="text-white" />
              </div>
              <h3 className="font-heading text-2xl font-extrabold text-[#1A1A1A] mb-3">
                ¡Synergy iniciada!
              </h3>
              <p className="text-[#666] mb-8">
                Solicitud recibida. Te contactaremos a la brevedad.
              </p>
              <button
                onClick={reset}
                className="font-body text-sm font-semibold px-6 py-3 rounded-full border border-black/10 text-[#1A1A1A] hover:border-[#A020F0] hover:text-[#A020F0] transition-colors"
              >
                Nueva solicitud
              </button>
            </div>
          ) : (
            <div className="min-h-[280px]">
              {step === 0 && (
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#1A1A1A] mb-8">
                    ¿Cuál es tu objetivo?
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {objectives.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => set("objective", o.value)}
                        className={`text-left p-5 rounded-2xl border transition-all ${
                          data.objective === o.value
                            ? "border-[#A020F0] bg-aeon-gradient-soft shadow-soft"
                            : "border-black/10 hover:border-[#A020F0]/40 bg-white"
                        }`}
                      >
                        <div className="font-heading text-lg font-bold text-[#1A1A1A]">
                          {o.value}
                        </div>
                        <div className="text-sm text-[#666] mt-1">{o.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#1A1A1A] mb-8">
                    ¿Cuál es tu timeline?
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {timelines.map((t) => (
                      <button
                        key={t}
                        onClick={() => set("timeline", t)}
                        className={`px-6 py-3 rounded-full border font-body text-sm font-medium transition-all ${
                          data.timeline === t
                            ? "border-transparent bg-aeon-gradient text-white shadow-soft"
                            : "border-black/10 text-[#1A1A1A] bg-white hover:border-[#A020F0]/40"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-heading text-xl font-bold text-[#1A1A1A] mb-2">
                    Datos de contacto
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-body text-xs font-semibold text-[#666] uppercase tracking-wide mb-2 block">
                        Nombre *
                      </label>
                      <input
                        value={data.name}
                        onChange={(e) => set("name", e.target.value)}
                        required
                        className={inputClass}
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold text-[#666] uppercase tracking-wide mb-2 block">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => set("email", e.target.value)}
                        required
                        className={inputClass}
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-[#666] uppercase tracking-wide mb-2 block">
                      Empresa
                    </label>
                    <input
                      value={data.company}
                      onChange={(e) => set("company", e.target.value)}
                      className={inputClass}
                      placeholder="Nombre del negocio"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-[#666] uppercase tracking-wide mb-2 block">
                      Mensaje *
                    </label>
                    <textarea
                      value={data.message}
                      onChange={(e) => set("message", e.target.value)}
                      required
                      rows={3}
                      className={inputClass + " resize-none"}
                      placeholder="Contanos sobre tu proyecto..."
                    />
                  </div>
                </form>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 font-body text-sm font-medium text-[#666] hover:text-[#1A1A1A] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ArrowLeft size={16} />
                  Atrás
                </button>

                {step < 2 ? (
                  <button
                    onClick={() => canNext && setStep((s) => s + 1)}
                    disabled={!canNext}
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold px-7 py-3.5 rounded-full bg-aeon-gradient text-white shadow-soft hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none transition-opacity"
                  >
                    Continuar
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold px-7 py-3.5 rounded-full bg-aeon-gradient text-white shadow-soft hover:opacity-90 disabled:opacity-60 transition-opacity"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        Iniciar Synergy
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}