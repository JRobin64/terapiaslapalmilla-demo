import { CalendarCheck, MessageCircle, Sparkles } from 'lucide-react';
import { SectionHeading } from './ui/Section';
import { useReveal } from '../hooks/useReveal';

const STEPS = [
  { icon: Sparkles, title: 'Elige tu experiencia', text: 'Tinaja, masaje, pack o alojamiento, y cuántas personas vienen.' },
  { icon: CalendarCheck, title: 'Escoge día y hora', text: 'Atendemos jueves, viernes y sábado, de 15:00 a 21:00 hrs.' },
  { icon: MessageCircle, title: 'Confirma por WhatsApp', text: 'Te enviamos disponibilidad y los datos para el abono.' },
];

export function HowItWorks({ onBook }: { onBook: () => void }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Reservar es simple"
          title="Tres pasos y listo"
          align="center"
        />
        <div ref={ref} className="mt-12 grid gap-4 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="reveal relative rounded-[1.75rem] bg-white p-7 ring-1 ring-line"
              style={{ ['--reveal-delay' as string]: `${i * 100}ms` }}
            >
              <span className="absolute right-6 top-5 font-display text-6xl font-medium text-sand">{i + 1}</span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest text-gold-soft">
                <Icon className="w-5 h-5" strokeWidth={1.7} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-forest">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button onClick={onBook} className="btn-primary !px-8 !py-4">Comenzar mi reserva</button>
        </div>
      </div>
    </section>
  );
}
