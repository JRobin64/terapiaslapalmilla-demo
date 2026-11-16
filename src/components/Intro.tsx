import { ResponsiveImage } from './ui/ResponsiveImage';
import { Droplets, Leaf, Users } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const FACTS = [
  { icon: Leaf, title: 'Entorno natural', text: 'Un espacio rodeado de vegetación, a solo 5 km de Rauco.' },
  { icon: Droplets, title: 'Tinajas con hidrojet', text: 'Agua caliente al aire libre, en un espacio privado.' },
  { icon: Users, title: 'Para compartir', text: 'Masajes simultáneos y tinajas de 2 a 5 personas.' },
];

export function Intro() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="esencia" ref={ref} className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6 reveal">
          <p className="eyebrow text-bark">Nuestra esencia</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.05] tracking-tight text-forest">
            Un centro de relajación y reflexión,{' '}
            <span className="italic text-clay">en medio de la naturaleza.</span>
          </h2>
          <div className="mt-6 space-y-4 text-[15px] sm:text-base leading-relaxed text-muted max-w-xl">
            <p>
              Terapias Naturales La Palmilla es un espacio creado en un entorno natural, pensado
              para la relajación, la tranquilidad y el descanso, con servicios de masajes,
              tinajas de agua caliente y alojamiento en cabañas.
            </p>
            <p>
              Nuestro equipo está dispuesto a entregar toda su experiencia, amabilidad y
              dedicación para que tu visita sea positiva e inolvidable.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {FACTS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="reveal" style={{ ['--reveal-delay' as string]: `${120 + i * 90}ms` }}>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sand text-forest">
                  <Icon className="w-5 h-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-3 font-sans text-sm font-semibold text-forest">{title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 reveal" style={{ ['--reveal-delay' as string]: '150ms' }}>
          <div className="relative grid grid-cols-5 grid-rows-6 gap-3 sm:gap-4 h-[420px] sm:h-[540px]">
            <ResponsiveImage
              src="./images/jardin.webp"
              sizes="(min-width: 1280px) 339.2px, (min-width: 1024px) calc(30vw - 44.8px), (min-width: 640px) calc(60vw - 44.8px), calc(60vw - 28.8px)"
              alt="Jardín y áreas verdes del recinto"
              loading="lazy"
              decoding="async"
              className="col-span-3 row-span-6 h-full w-full rounded-[1.75rem] object-cover"
            />
            <ResponsiveImage
              src="./images/espacio-descanso.webp"
              sizes="(min-width: 1280px) 220.8px, (min-width: 1024px) calc(20vw - 35.2px), (min-width: 640px) calc(40vw - 35.2px), calc(40vw - 23.2px)"
              alt="Espacio de descanso"
              loading="lazy"
              decoding="async"
              className="col-span-2 row-span-3 h-full w-full rounded-[1.75rem] object-cover"
            />
            <ResponsiveImage
              src="./images/estero.webp"
              sizes="(min-width: 1280px) 220.8px, (min-width: 1024px) calc(20vw - 35.2px), (min-width: 640px) calc(40vw - 35.2px), calc(40vw - 23.2px)"
              alt="Estero en los alrededores"
              loading="lazy"
              decoding="async"
              className="col-span-2 row-span-3 h-full w-full rounded-[1.75rem] object-cover"
            />
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-forest px-5 py-4 text-cream shadow-xl">
              <p className="font-display text-3xl font-medium leading-none">5 km</p>
              <p className="mt-1 text-xs text-sage">de Rauco · Región del Maule</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
