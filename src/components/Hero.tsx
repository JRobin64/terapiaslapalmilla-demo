import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import { SITE_INFO } from '../data/services';
import { getOpenStatus } from '../lib/time';

export function Hero({ onBook }: { onBook: () => void }) {
  const [status, setStatus] = useState(getOpenStatus);

  useEffect(() => {
    const t = window.setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest-deep">
      <img
        src="./images/tinaja-terraza.webp"
        alt="Tinaja de agua caliente en una terraza de madera rodeada de árboles"
        fetchPriority="high"
        decoding="async"
        width={1200}
        height={801}
        className="absolute inset-0 h-full w-full object-cover object-[50%_60%] animate-slow-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/50 to-forest-deep/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/60 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 pb-10 sm:pb-16 pt-32">
        <div className="max-w-3xl">
          <div className="animate-hero-up inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
            <span
              className={`h-2 w-2 rounded-full ${
                status.isOpen ? 'bg-emerald-400 animate-pulse-dot' : 'bg-gold'
              }`}
            />
            {status.label}
          </div>

          <h1 className="animate-hero-up delay-1 mt-6 font-display text-[3.25rem] leading-[0.95] sm:text-7xl lg:text-[6.5rem] font-medium tracking-tight text-white">
            Haz una pausa
            <br />
            <span className="italic text-gold-soft">en tu agitada vida.</span>
          </h1>

          <p className="animate-hero-up delay-2 mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-white/80">
            Tinajas de agua caliente al aire libre, masajes en sala termorregulada y cabañas
            con tinaja privada. Un refugio natural a 5 km de Rauco.
          </p>

          <div className="animate-hero-up delay-3 mt-9 flex flex-col sm:flex-row gap-3">
            <button onClick={onBook} className="btn-gold !px-8 !py-4 text-[15px] group">
              Reservar experiencia
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a href="#experiencias" className="btn-ghost-light !px-8 !py-4 text-[15px]">
              Ver experiencias y precios
            </a>
          </div>
        </div>

        <div className="animate-hero-up delay-3 mt-14 sm:mt-20 flex items-end justify-between gap-6 border-t border-white/15 pt-6">
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-4 text-white">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-white/60">Horario</dt>
              <dd className="mt-1 text-sm font-medium">Jue a Sáb · 15–21 h</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-white/60">Tinajas</dt>
              <dd className="mt-1 text-sm font-medium">Desde $44.000</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-xs uppercase tracking-[0.2em] text-white/60">Ubicación</dt>
              <dd className="mt-1 text-sm font-medium">
                <a href={SITE_INFO.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 min-w-11 items-center gap-1.5 hover:text-gold-soft transition-colors">
                  <MapPin className="w-3.5 h-3.5" /> La Palmilla, Rauco
                </a>
              </dd>
            </div>
          </dl>
          <a
            href="#esencia"
            aria-label="Bajar"
            className="hidden sm:grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/25 text-white/80 hover:bg-white/10 transition"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
