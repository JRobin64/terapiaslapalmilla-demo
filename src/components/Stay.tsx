import { ArrowRight, Check } from 'lucide-react';
import { SERVICES, STAY_AMENITIES, type ServiceItem } from '../data/services';
import { useReveal } from '../hooks/useReveal';
import { formatClp } from '../utils/analytics';

const TIMELINE = [
  { time: '18:00', text: 'Check-in y llegada a tu cabaña' },
  { time: 'Tarde', text: 'Masajes simultáneos de relajación (opcional)' },
  { time: 'Noche', text: 'Tinaja exclusiva en tu terraza, bajo el anochecer' },
  { time: 'Mañana', text: 'Desayuno incluido' },
  { time: '12:00', text: 'Check-out' },
];

const stays = SERVICES.filter((s) => s.id.startsWith('alojamiento'));

export function Stay({ onBook }: { onBook: (s: ServiceItem) => void }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="alojamiento" ref={ref} className="relative overflow-hidden bg-forest text-cream py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-moss/60 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="reveal">
          <p className="eyebrow text-gold">Escapada de una noche</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.05] tracking-tight">
            Cabañas con tinaja <span className="italic text-gold-soft">privada en la terraza</span>
          </h2>
          <p className="mt-5 max-w-lg text-[15px] sm:text-base leading-relaxed text-sage">
            Llega al atardecer, relájate con masajes y termina el día en tu propia tinaja,
            contemplando la vegetación. Al despertar, te espera el desayuno.
          </p>

          <ol className="mt-10 space-y-0">
            {TIMELINE.map((t, i) => (
              <li key={t.text} className="reveal relative flex gap-5 pb-6 last:pb-0" style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}>
                {i < TIMELINE.length - 1 && <span className="absolute left-[7px] top-5 h-full w-px bg-white/15" />}
                <span className="relative mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-2 border-gold bg-forest" />
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <span className="w-16 shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-gold pt-1">{t.time}</span>
                  <span className="text-[15px] text-cream/90">{t.text}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="reveal space-y-5" style={{ ['--reveal-delay' as string]: '150ms' }}>
          <div className="relative overflow-hidden rounded-[1.75rem]">
            <img
              src="./images/cabana-interior.webp"
              alt="Interior de la cabaña"
              loading="lazy"
              decoding="async"
              className="h-64 sm:h-80 w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-black/70 to-transparent p-5 pt-14">
              {STAY_AMENITIES.map((a) => (
                <span key={a} className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-md">
                  <Check className="w-3 h-3 text-gold-soft" strokeWidth={3} /> {a}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stays.map((s) => (
              <button
                key={s.id}
                onClick={() => onBook(s)}
                className="group flex flex-col rounded-[1.5rem] bg-white/[0.06] p-5 text-left ring-1 ring-white/12 transition-all duration-300 hover:bg-white/[0.1] hover:ring-gold/50"
              >
                <span className="text-xs text-sage">Para 2 personas</span>
                <span className="mt-1 font-display text-2xl font-semibold leading-tight">{s.name}</span>
                <span className="mt-auto pt-4 flex items-end justify-between">
                  <span className="font-display text-3xl font-semibold text-gold-soft">{formatClp(s.tiers[0].price)}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-forest-deep transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
