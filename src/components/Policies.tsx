import { useState } from 'react';
import { Plus } from 'lucide-react';
import { POLICIES } from '../data/services';
import { SectionHeading } from './ui/Section';

export function Policies() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="politicas" className="bg-sand/60 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Antes de venir"
            title="Políticas de visita y reserva"
            intro="Para que todos disfruten de un espacio tranquilo, te pedimos tener en cuenta lo siguiente."
          />
        </div>
        <div className="lg:col-span-7 divide-y divide-line border-y border-line">
          {POLICIES.map((p, i) => {
            const isOpen = open === i;
            return (
              <div key={p.title}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-xl sm:text-2xl font-semibold text-forest">{p.title}</span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                      isOpen ? 'rotate-45 bg-forest text-cream' : 'bg-white text-forest ring-1 ring-line'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-soft)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 text-[15px] leading-relaxed text-muted">{p.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
