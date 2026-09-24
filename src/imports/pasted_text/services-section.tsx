import React from "react";
import {
  Globe,
  Code2,
  Database,
  Bot,
  Megaphone,
  Palette,
} from "lucide-react";

const services = [
  {
    id: "01",
    icon: Globe,
    title: "Diseño Web",
    desc: "Sitios y landing pages que convierten visitantes en clientes.",
    tech: ["UX/UI", "Responsive", "SEO"],
  },
  {
    id: "02",
    icon: Code2,
    title: "Desarrollo",
    desc: "Aplicaciones web y plataformas funcionales construidas para escalar.",
    tech: ["Frontend", "Backend", "APIs"],
  },
  {
    id: "03",
    icon: Database,
    title: "CRMs",
    desc: "Implementamos y automatizamos tu CRM para vender más y mejor.",
    tech: ["Setup", "Automatización", "Migración"],
  },
  {
    id: "04",
    icon: Bot,
    title: "Chatbots & IA",
    desc: "Asistentes inteligentes que atienden a tus clientes 24/7.",
    tech: ["WhatsApp", "Web", "Integración"],
  },
  {
    id: "05",
    icon: Megaphone,
    title: "Community",
    desc: "Gestión de redes sociales con contenido que conecta y vende.",
    tech: ["Contenido", "Diseño", "Reportes"],
  },
  {
    id: "06",
    icon: Palette,
    title: "Branding",
    desc: "Identidad visual memorable que diferencia tu marca del resto.",
    tech: ["Logo", "Manual", "Identidad"],
  },
];

export default function Services() {
  return (
    <section id="servicios" className="relative bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.25em] text-[#A020F0] uppercase mb-4">
            Nuestros servicios
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-[#1A1A1A] tracking-tight">
            Seis pilares. <span className="text-gradient">Un motor.</span>
          </h2>
          <p className="text-[#666] mt-4 max-w-xl mx-auto">
            Hover sobre cada pilar para explorar su stack completo.
          </p>
        </div>

        {/* Pillar layout — desktop/tablet */}
        <div className="hidden md:flex h-[56vh] gap-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="group flex-1 relative rounded-3xl border border-black/5 bg-[#FAFAFA] overflow-hidden transition-[flex] duration-500 ease-out hover:flex-[4] hover:bg-aeon-gradient hover:shadow-soft-lg"
              >
                {/* Collapsed view */}
                <div className="absolute inset-0 flex flex-col items-center justify-between py-10 px-4 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="font-mono text-xs tracking-[0.2em] text-[#00C2DA] font-semibold">
                    {s.id}
                  </span>
                  <span
                    className="font-heading text-base font-bold tracking-wide uppercase text-[#1A1A1A]"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    {s.title}
                  </span>
                  <Icon size={20} className="text-[#A020F0]" />
                </div>

                {/* Expanded view */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 flex flex-col justify-center px-8 text-white">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                      <Icon size={22} className="text-white" />
                    </div>
                    <span className="font-mono text-xs tracking-[0.2em] text-white/80">
                      {s.id}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-extrabold mb-3">
                    {s.title}
                  </h3>
                  <p className="text-white/85 text-sm leading-relaxed mb-6">
                    {s.desc}
                  </p>
                  <div className="font-mono text-[11px] tracking-[0.15em] uppercase">
                    <p className="text-[#00F2FE] mb-2">// stack</p>
                    <ul className="space-y-1 text-white/80">
                      {s.tech.map((t) => (
                        <li key={t}>— {t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile grid */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="rounded-3xl border border-black/5 bg-[#FAFAFA] p-6 flex items-start gap-4 shadow-soft"
              >
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-aeon-gradient flex items-center justify-center">
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-[#00C2DA] font-semibold">
                      {s.id}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-[#1A1A1A]">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-[#666] text-sm">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}