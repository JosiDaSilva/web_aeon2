import { useState } from 'react'
import logoImg from '@/imports/logo_colores.png'
import logoWhiteImg from '@/imports/logo_colores_blanco.png'

const ORANGE = '#f95006'

const objectives = [
  { value: 'Escalar', desc: 'Acelerar el crecimiento digital' },
  { value: 'Construir', desc: 'Crear algo desde cero' },
  { value: 'Automatizar', desc: 'Optimizar procesos y CRM' },
  { value: 'Branding', desc: 'Renovar la identidad de marca' },
]

const timelines = ['Urgente', '1-3 meses', '3-6 meses', 'Solo explorando']

function ContactSection({ dark }: { dark: boolean }) {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [data, setData] = useState({ objective: '', timeline: '', name: '', email: '', company: '', message: '' })

  const set = (k: string, v: string) => setData(d => ({ ...d, [k]: v }))

  const canNext =
    (step === 0 && data.objective) ||
    (step === 1 && data.timeline) ||
    step === 2

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (loading) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setDone(true)
  }

  const reset = () => {
    setDone(false)
    setStep(0)
    setData({ objective: '', timeline: '', name: '', email: '', company: '', message: '' })
  }

  const inputBg = dark ? '#1A1F28' : '#FAFAFA'
  const inputBorder = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  const inputColor = dark ? '#F0EFEE' : '#1A1A1A'
  const inputClass = `w-full border rounded-xl px-4 py-3 placeholder-[#888] focus:outline-none focus:ring-2 transition-all text-sm`

  return (
    <section id="contacto" className="relative py-24 overflow-hidden" style={{ backgroundColor: dark ? '#0D1117' : '#FAFAFA' }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.25em] uppercase mb-4 font-semibold" style={{ color: ORANGE, fontFamily: 'JetBrains Mono, monospace' }}>
            Aeon Forge
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ fontFamily: 'Sora, sans-serif', color: 'var(--foreground)' }}>
            Configuremos tu <span className="text-gradient">proyecto</span>
          </h2>
          <p style={{ color: dark ? '#8B949E' : '#666' }}>Un proceso guiado, no un formulario eterno.</p>
        </div>

        {!done && (
          <div className="flex items-center justify-center gap-3 mb-12">
            {[0, 1, 2].map(i => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold transition-colors"
                  style={{
                    background: i === step ? `linear-gradient(135deg,${ORANGE},#ff7a1a)` : i < step ? 'rgba(249,80,6,0.18)' : dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
                    color: i === step ? '#fff' : i < step ? ORANGE : dark ? '#666' : '#999',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {i + 1}
                </span>
                {i < 2 && <span className="w-8 h-px inline-block" style={{ backgroundColor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />}
              </div>
            ))}
          </div>
        )}

        <div
          className="rounded-3xl p-8 md:p-10 shadow-soft"
          style={{ backgroundColor: dark ? '#161B22' : '#fff', border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)' }}
        >
          {done ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 shadow-soft bg-aeon-gradient">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14l6 6 10-12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold mb-3" style={{ fontFamily: 'Sora, sans-serif', color: 'var(--foreground)' }}>¡Aeon iniciada!</h3>
              <p className="mb-8" style={{ color: dark ? '#8B949E' : '#666' }}>Solicitud recibida. Te contactaremos a la brevedad.</p>
              <button
                onClick={reset}
                className="text-sm font-semibold px-6 py-3 rounded-full border transition-colors"
                style={{ borderColor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: 'var(--foreground)', fontFamily: 'Manrope, sans-serif' }}
              >
                Nueva solicitud
              </button>
            </div>
          ) : (
            <div className="min-h-[280px] flex flex-col">
              <div className="flex-1">
                {step === 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-8" style={{ fontFamily: 'Sora, sans-serif', color: 'var(--foreground)' }}>¿Cuál es tu objetivo?</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {objectives.map(o => (
                        <button
                          key={o.value}
                          onClick={() => set('objective', o.value)}
                          className="text-left p-5 rounded-2xl border transition-all"
                          style={{
                            borderColor: data.objective === o.value ? ORANGE : dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
                            backgroundColor: data.objective === o.value ? 'rgba(249,80,6,0.09)' : dark ? 'rgba(255,255,255,0.03)' : '#fff',
                            boxShadow: data.objective === o.value ? '0 18px 50px -18px rgba(249,80,6,0.35)' : 'none',
                          }}
                        >
                          <div className="text-lg font-bold" style={{ fontFamily: 'Sora, sans-serif', color: 'var(--foreground)' }}>{o.value}</div>
                          <div className="text-sm mt-1" style={{ color: dark ? '#8B949E' : '#666' }}>{o.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h3 className="text-xl font-bold mb-8" style={{ fontFamily: 'Sora, sans-serif', color: 'var(--foreground)' }}>¿Cuál es tu timeline?</h3>
                    <div className="flex flex-wrap gap-3">
                      {timelines.map(t => (
                        <button
                          key={t}
                          onClick={() => set('timeline', t)}
                          className="px-6 py-3 rounded-full border text-sm font-medium transition-all"
                          style={{
                            background: data.timeline === t ? `linear-gradient(135deg,${ORANGE},#ff7a1a)` : dark ? 'rgba(255,255,255,0.04)' : '#fff',
                            borderColor: data.timeline === t ? 'transparent' : dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
                            color: data.timeline === t ? '#fff' : 'var(--foreground)',
                            boxShadow: data.timeline === t ? '0 18px 50px -18px rgba(249,80,6,0.35)' : 'none',
                            fontFamily: 'Manrope, sans-serif',
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Sora, sans-serif', color: 'var(--foreground)' }}>Datos de contacto</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {[
                        { key: 'name', label: 'Nombre *', placeholder: 'Tu nombre', type: 'text', required: true },
                        { key: 'email', label: 'Email *', placeholder: 'tu@email.com', type: 'email', required: true },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: dark ? '#8B949E' : '#666', fontFamily: 'Manrope, sans-serif' }}>{f.label}</label>
                          <input
                            type={f.type} required={f.required} placeholder={f.placeholder}
                            value={data[f.key as keyof typeof data]} onChange={e => set(f.key, e.target.value)}
                            className={inputClass}
                            style={{ backgroundColor: inputBg, borderColor: inputBorder, color: inputColor }}
                            onFocus={e => e.target.style.borderColor = ORANGE}
                            onBlur={e => e.target.style.borderColor = inputBorder}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: dark ? '#8B949E' : '#666', fontFamily: 'Manrope, sans-serif' }}>Empresa</label>
                      <input placeholder="Nombre del negocio" value={data.company} onChange={e => set('company', e.target.value)}
                        className={inputClass}
                        style={{ backgroundColor: inputBg, borderColor: inputBorder, color: inputColor }}
                        onFocus={e => e.target.style.borderColor = ORANGE}
                        onBlur={e => e.target.style.borderColor = inputBorder}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide mb-2 block" style={{ color: dark ? '#8B949E' : '#666', fontFamily: 'Manrope, sans-serif' }}>Mensaje *</label>
                      <textarea required rows={3} placeholder="Contanos sobre tu proyecto..." value={data.message} onChange={e => set('message', e.target.value)}
                        className={inputClass + ' resize-none'}
                        style={{ backgroundColor: inputBg, borderColor: inputBorder, color: inputColor }}
                        onFocus={e => e.target.style.borderColor = ORANGE}
                        onBlur={e => e.target.style.borderColor = inputBorder}
                      />
                    </div>
                  </form>
                )}
              </div>

              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={() => setStep(s => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  style={{ color: dark ? '#8B949E' : '#666', fontFamily: 'Manrope, sans-serif' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Atrás
                </button>

                {step < 2 ? (
                  <button
                    onClick={() => canNext && setStep(s => s + 1)}
                    disabled={!canNext}
                    className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full text-white shadow-soft hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none transition-opacity bg-aeon-gradient"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Continuar
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full text-white shadow-soft hover:opacity-90 disabled:opacity-60 transition-opacity bg-aeon-gradient"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                        Procesando...
                      </>
                    ) : (
                      <>
                        Iniciar Aeon
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
  )
}

const services = [
  {
    id: '01', title: 'Diseño Web',
    desc: 'Sitios y landing pages que convierten visitantes en clientes.',
    tech: ['UX/UI', 'Responsive', 'SEO'],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    id: '02', title: 'Desarrollo',
    desc: 'Aplicaciones web y plataformas funcionales construidas para escalar.',
    tech: ['Frontend', 'Backend', 'APIs'],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    id: '03', title: 'CRMs',
    desc: 'Implementamos y automatizamos tu CRM para vender más y mejor.',
    tech: ['Setup', 'Automatización', 'Migración'],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  },
  {
    id: '04', title: 'Chatbots & IA',
    desc: 'Asistentes inteligentes que atienden a tus clientes 24/7.',
    tech: ['WhatsApp', 'Web', 'Integración'],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 15h.01M12 15h.01M16 15h.01"/></svg>,
  },
  {
    id: '05', title: 'Community',
    desc: 'Gestión de redes sociales con contenido que conecta y vende.',
    tech: ['Contenido', 'Diseño', 'Reportes'],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
  },
  {
    id: '06', title: 'Branding',
    desc: 'Identidad visual memorable que diferencia tu marca del resto.',
    tech: ['Logo', 'Manual', 'Identidad'],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 20c-4.41 0-8-1.79-8-4 0-1.12 1.06-2.13 2.75-2.87"/><path d="M12 20c4.41 0 8-1.79 8-4 0-1.12-1.06-2.13-2.75-2.87"/></svg>,
  },
]

const process = [
  { phase: 'Descubrir', desc: 'Entendemos tu negocio, competencia y audiencia en profundidad.' },
  { phase: 'Diseñar', desc: 'Creamos la estrategia y los activos visuales con intención.' },
  { phase: 'Construir', desc: 'Ejecutamos con precisión, iterando sobre datos reales.' },
  { phase: 'Crecer', desc: 'Optimizamos continuamente para maximizar resultados.' },
]

const plans = [
  {
    name: 'Esencial',
    price: '89',
    period: '/mo',
    description: 'Para negocios que dan sus primeros pasos digitales.',
    features: ['Estrategia inicial', 'Sitio web 5 páginas', 'SEO básico', 'Soporte mensual'],
    cta: 'Comenzar',
  },
  {
    name: 'Aeon',
    price: '189',
    period: '/mo',
    description: 'El plan completo para negocios que buscan acelerar su crecimiento.',
    features: ['Todo lo Esencial', 'Branding completo', 'Contenido semanal', 'Ads management', 'Reportes bimensuales', 'Soporte prioritario'],
    cta: 'Iniciar Aeon',
    badge: '✦ Más popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Soluciones a medida para empresas con necesidades avanzadas.',
    features: ['Todo lo Aeon', 'Equipo dedicado', 'Integraciones', 'SLA garantizado'],
    cta: 'Contactar',
  },
]

const stats = [
  { num: '+120', label: 'Proyectos completados' },
  { num: '94%', label: 'Clientes satisfechos' },
  { num: '3x', label: 'ROI promedio' },
  { num: '8 años', label: 'De experiencia' },
]

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('Aeon')

  const navLinks = [
    ['#servicios', 'Servicios'],
    ['#aeon', 'Aeon'],
    ['#proceso', 'Proceso'],
    ['#contacto', 'Contacto'],
  ]

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>

        {/* NAV */}
        <nav
          className="nav-blur fixed top-0 left-0 right-0 z-50 border-b"
          style={{
            backgroundColor: dark ? 'rgba(13,17,23,0.88)' : 'rgba(255,255,255,0.88)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#" className="flex items-center">
              <img src={dark ? logoWhiteImg : logoImg} alt="Aeon Design / Development" className="h-10 w-auto" />
            </a>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
              {navLinks.map(([href, label]) => (
                <a key={href} href={href} className="hover:text-foreground transition-colors" style={{ color: 'inherit' }}>
                  {label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {/* Dark mode toggle */}
              <button
                onClick={() => setDark(d => !d)}
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:opacity-80"
                style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)', backgroundColor: 'var(--muted)' }}
                aria-label="Cambiar modo"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all hover:opacity-90 shadow-soft bg-aeon-gradient"
                style={{ color: '#fff', fontFamily: 'Sora, sans-serif' }}
              >
                Iniciar Aeon
              </a>
            </div>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setDark(d => !d)}
                className="w-8 h-8 rounded-full flex items-center justify-center border"
                style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)', backgroundColor: 'var(--muted)' }}
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
              <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}>
                <div className="w-5 h-4 flex flex-col justify-between">
                  {[menuOpen ? 'rotate-45 translate-y-2' : '', menuOpen ? 'opacity-0' : '', menuOpen ? '-rotate-45 -translate-y-2' : ''].map((cls, i) => (
                    <span key={i} className={`block h-px transition-all ${cls}`} style={{ backgroundColor: 'var(--foreground)' }} />
                  ))}
                </div>
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4 text-sm font-medium" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
              {navLinks.map(([href, label]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ color: 'var(--muted-foreground)' }}>{label}</a>
              ))}
            </div>
          )}
        </nav>

        {/* HERO */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 animate-float-slow"
              style={{ background: 'radial-gradient(circle, #f95006 0%, transparent 70%)' }}
            />
            <div
              className="absolute bottom-0 -left-48 w-[500px] h-[500px] rounded-full opacity-15"
              style={{ background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)' }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5"
              style={{ background: 'radial-gradient(ellipse, #ff7a1a 0%, transparent 60%)' }}
            />
          </div>

          <div className="max-w-6xl mx-auto relative">
            <div className="max-w-4xl">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-10 border"
                style={{ borderColor: 'rgba(249,80,6,0.35)', color: ORANGE, backgroundColor: 'rgba(249,80,6,0.07)', fontFamily: 'JetBrains Mono, monospace' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: ORANGE }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: ORANGE }} />
                </span>
                Agencia Digital · Resultados reales
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-8" style={{ fontFamily: 'Sora, sans-serif', letterSpacing: '-0.03em' }}>
                Evolución digital{' '}
                <span className="text-gradient">sin límites</span>
                <br className="hidden md:block" />
                {' '}para tu negocio
              </h1>

              <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-2xl font-medium" style={{ color: 'var(--muted-foreground)' }}>
                Transformamos empresas a través de estrategia digital, identidad de marca y tecnología. Somos el equipo que convierte tu visión en crecimiento medible.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-bold transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-soft-lg bg-aeon-gradient"
                  style={{ color: '#fff', fontFamily: 'Sora, sans-serif' }}
                >
                  Comenzar ahora
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a
                  href="#servicios"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold border transition-all hover:opacity-80"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)', fontFamily: 'Sora, sans-serif' }}
                >
                  Ver servicios
                </a>
              </div>

              <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map(({ num, label }) => (
                  <div key={label} className="p-5 rounded-2xl border bg-aeon-gradient-soft" style={{ borderColor: 'rgba(249,80,6,0.18)' }}>
                    <div className="text-3xl font-bold mb-1 text-gradient" style={{ fontFamily: 'Sora, sans-serif' }}>{num}</div>
                    <div className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="relative py-24 overflow-hidden" style={{ backgroundColor: 'var(--muted)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: ORANGE, fontFamily: 'JetBrains Mono, monospace' }}>
                Nuestros servicios
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                Seis pilares. <span className="text-gradient">Un motor.</span>
              </h2>
              <p className="max-w-xl mx-auto text-base" style={{ color: 'var(--muted-foreground)' }}>
                Hover sobre cada pilar para explorar su stack completo.
              </p>
            </div>

            {/* Desktop pillar layout */}
            <div className="hidden md:flex h-[56vh] gap-3">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="group flex-1 relative rounded-3xl overflow-hidden transition-[flex] duration-500 ease-out hover:flex-[4] hover:shadow-soft-lg"
                  style={{
                    border: dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(249,80,6,0.18)',
                    backgroundColor: dark ? '#161B22' : '#FFF4EF',
                  }}
                >
                  {/* Collapsed */}
                  <div className="absolute inset-0 flex flex-col items-center justify-between py-10 px-4 group-hover:opacity-0 transition-opacity duration-300">
                    <span className="text-xs font-semibold tracking-[0.2em]" style={{ color: '#00C2DA', fontFamily: 'JetBrains Mono, monospace' }}>{s.id}</span>
                    <span className="text-base font-bold tracking-wide uppercase" style={{ writingMode: 'vertical-rl', fontFamily: 'Sora, sans-serif', color: 'var(--foreground)' }}>{s.title}</span>
                    <div style={{ color: ORANGE }}>{s.icon}</div>
                  </div>
                  {/* Expanded */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 flex flex-col justify-center px-8 text-white bg-aeon-gradient">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                        {s.icon}
                      </div>
                      <span className="text-xs tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'JetBrains Mono, monospace' }}>{s.id}</span>
                    </div>
                    <h3 className="text-2xl font-extrabold mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>{s.desc}</p>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      <p className="mb-2" style={{ color: '#00F2FE' }}>// stack</p>
                      <ul className="space-y-1" style={{ color: 'rgba(255,255,255,0.8)' }}>
                        {s.tech.map(t => <li key={t}>— {t}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile grid */}
            <div className="md:hidden grid grid-cols-1 gap-4">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="rounded-3xl p-6 flex items-start gap-4 shadow-soft"
                  style={{
                    border: dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(249,80,6,0.18)',
                    backgroundColor: dark ? '#161B22' : '#FFF4EF',
                  }}
                >
                  <div className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-white bg-aeon-gradient">{s.icon}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold tracking-[0.2em]" style={{ color: '#00C2DA', fontFamily: 'JetBrains Mono, monospace' }}>{s.id}</span>
                      <h3 className="text-lg font-bold" style={{ fontFamily: 'Sora, sans-serif', color: 'var(--foreground)' }}>{s.title}</h3>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESO */}
        <section id="proceso" className="py-24 md:py-32 px-6 relative overflow-hidden" style={{ backgroundColor: '#0D1117' }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #f95006 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)' }} />
          </div>
          <div className="max-w-6xl mx-auto relative">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#00F5FF', fontFamily: 'JetBrains Mono, monospace' }}>// Proceso</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-16" style={{ fontFamily: 'Sora, sans-serif', color: '#fff', letterSpacing: '-0.02em' }}>
              Un proceso claro,<br />resultados medibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {process.map((p, i) => (
                <div key={p.phase} className="relative p-6 rounded-2xl border" style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.04)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold mb-5 bg-aeon-gradient" style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Sora, sans-serif', color: '#fff' }}>{p.phase}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AEON / PRICING */}
        <section id="aeon" className="py-24 md:py-36 px-6" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ORANGE, fontFamily: 'JetBrains Mono, monospace' }}>// Planes</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif', letterSpacing: '-0.02em' }}>
                Elige tu plan <span className="text-gradient">Aeon</span>
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
                Precios en USD, sin sorpresas. Cancela cuando quieras.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map(plan => {
                const isSelected = selectedPlan === plan.name
                const isHighlight = plan.name === 'Aeon'
                return (
                  <div
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan.name)}
                    className="relative rounded-2xl p-8 border flex flex-col cursor-pointer transition-all duration-300"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, #f95006, #ff7a1a)'
                        : 'var(--card)',
                      borderColor: isSelected ? 'transparent' : isHighlight ? `rgba(249,80,6,0.4)` : 'var(--border)',
                      color: isSelected ? '#fff' : 'var(--foreground)',
                      boxShadow: isSelected ? '0 30px 70px -20px rgba(249,80,6,0.45)' : isHighlight ? '0 4px 20px rgba(249,80,6,0.12)' : 'none',
                      transform: isSelected ? 'translateY(-4px)' : 'none',
                    }}
                  >
                    {isHighlight && !isSelected && (
                      <div
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold"
                        style={{ backgroundColor: ORANGE, color: '#fff', fontFamily: 'Sora, sans-serif' }}
                      >
                        ✦ Más popular
                      </div>
                    )}
                    {isSelected && (
                      <div
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold"
                        style={{ backgroundColor: '#00F5FF', color: '#0D1117', fontFamily: 'Sora, sans-serif' }}
                      >
                        ✓ Seleccionado
                      </div>
                    )}

                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{plan.name}</h3>
                      <p className="text-sm mb-6" style={{ color: isSelected ? 'rgba(255,255,255,0.75)' : 'var(--muted-foreground)' }}>
                        {plan.description}
                      </p>
                      <div className="flex items-baseline gap-1">
                        {plan.price !== 'Custom' && (
                          <span className="text-lg font-semibold" style={{ color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--muted-foreground)' }}>$</span>
                        )}
                        <span className="text-4xl font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>{plan.price}</span>
                        {plan.period && <span style={{ color: isSelected ? 'rgba(255,255,255,0.75)' : 'var(--muted-foreground)' }}>{plan.period}</span>}
                      </div>
                    </div>

                    <ul className="flex-1 space-y-3 mb-8">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-center gap-3 text-sm font-medium">
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: isSelected ? 'rgba(255,255,255,0.22)' : 'var(--muted)' }}
                          >
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path d="M1.5 4l2 2 3-3" stroke={isSelected ? '#fff' : ORANGE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contacto"
                      onClick={e => e.stopPropagation()}
                      className="block text-center py-3.5 rounded-full text-sm font-bold transition-all hover:opacity-90"
                      style={{
                        fontFamily: 'Sora, sans-serif',
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : 'var(--muted)',
                        color: isSelected ? '#fff' : ORANGE,
                        border: isSelected ? '1px solid rgba(255,255,255,0.35)' : 'none',
                      }}
                    >
                      {plan.cta}
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <ContactSection dark={dark} />

        {/* WHATSAPP FLOATING BUTTON */}
        <a
          href="https://wa.me/543755394393"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 hover:shadow-xl"
          style={{ backgroundColor: '#25D366' }}
          aria-label="Contactar por WhatsApp"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>

        {/* FOOTER */}
        <footer className="py-10 px-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <img src={logoImg} alt="Aeon" className="h-10 w-auto" />
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              © 2026 Aeon Design / Development · Todos los derechos reservados
            </p>
            <div className="flex gap-6 text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
              <a href="#" className="hover:text-foreground transition-colors">Privacidad</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
              <a href="#" className="hover:text-foreground transition-colors">Legal</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
