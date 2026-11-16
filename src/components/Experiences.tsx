import { useMemo, useState } from 'react';
import { CATEGORIES, SERVICES, type ServiceCategory, type ServiceItem } from '../data/services';
import { trackGAEvent } from '../utils/analytics';
import { SectionHeading } from './ui/Section';
import { ServiceCard } from './ServiceCard';

interface Props {
  onOpen: (s: ServiceItem) => void;
  onBook: (s: ServiceItem) => void;
}

export function Experiences({ onOpen, onBook }: Props) {
  const [cat, setCat] = useState<'all' | ServiceCategory>('all');
  const list = useMemo(
    () => (cat === 'all' ? SERVICES : SERVICES.filter((s) => s.category === cat)),
    [cat]
  );

  const change = (c: 'all' | ServiceCategory) => {
    setCat(c);
    trackGAEvent('select_content', { content_type: 'category', item_id: c });
  };

  return (
    <section id="experiencias" className="bg-sand/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experiencias y precios"
          title={
            <>
              Elige tu forma de <span className="italic text-clay">desconectar</span>
            </>
          }
          intro="Tinajas, masajes y packs con valores claros. Toca cualquier experiencia para ver el detalle."
        />

        <div className="sticky top-16 md:top-[72px] z-20 -mx-5 sm:mx-0 mt-10 bg-sand/0 py-3">
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 sm:px-0" role="tablist" aria-label="Filtrar experiencias">
            {CATEGORIES.map((c) => {
              const count = c.id === 'all' ? SERVICES.length : SERVICES.filter((s) => s.category === c.id).length;
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => change(c.id)}
                  className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold shadow-sm transition-all duration-300 ${
                    active
                      ? 'bg-forest text-cream'
                      : 'bg-white/90 backdrop-blur text-muted ring-1 ring-line hover:text-forest hover:ring-forest/40'
                  }`}
                >
                  {c.label}
                  <span
                    className={`rounded-full px-1.5 text-[10px] tabular-nums ${
                      active ? 'bg-white/15 text-cream' : 'bg-sand text-bark'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div key={cat} className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <div key={s.id} className="animate-step" style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}>
              <ServiceCard service={s} onOpen={onOpen} onBook={onBook} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
