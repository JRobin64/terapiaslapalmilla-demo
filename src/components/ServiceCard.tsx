import { ResponsiveImage } from './ui/ResponsiveImage';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { ServiceItem } from '../data/services';
import { formatClp } from '../utils/analytics';

interface Props {
  service: ServiceItem;
  onOpen: (s: ServiceItem) => void;
  onBook: (s: ServiceItem) => void;
}

export function ServiceCard({ service, onOpen, onBook }: Props) {
  const off = service.temporarilyUnavailable;
  const from = service.tiers[0];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-line/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(18,32,26,0.45)]">
      <button
        type="button"
        onClick={() => onOpen(service)}
        className="relative block aspect-[4/3] overflow-hidden bg-sand text-left"
      >
        <ResponsiveImage
          src={service.image}
          sizes="(min-width: 1280px) 389.33px, (min-width: 1024px) calc((100vw - 112px) / 3), (min-width: 640px) calc((100vw - 88px) / 2), calc(100vw - 40px)"
          alt={service.name}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06] ${
            off ? 'grayscale-[60%]' : ''
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        {service.badge && (
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md ${
              off ? 'bg-ink/75 text-cream' : 'bg-cream/90 text-forest'
            }`}
          >
            {service.badge}
          </span>
        )}
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-xs font-medium text-white">
          <Clock className="w-3.5 h-3.5" /> {service.duration}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.65rem] font-semibold leading-tight text-forest">
          <button type="button" onClick={() => onOpen(service)} className="min-h-11 min-w-11 text-left hover:text-moss transition-colors">
            {service.name}
          </button>
        </h3>
        <p className="mt-1 text-[13px] text-muted">{service.subtitle}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <div>
            <span className="block text-xs uppercase tracking-[0.16em] text-bark">
              {service.tiers.length > 1 ? 'Desde' : from.label}
            </span>
            <span className="font-display text-[1.75rem] font-semibold leading-none text-forest">
              {formatClp(from.price)}
            </span>
          </div>

          {off ? (
            <button type="button" onClick={() => onOpen(service)} className="btn-outline min-h-11 min-w-11 shrink-0 !px-4 !py-2.5 !text-xs">
              Más info
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onBook(service)}
              className="btn-primary min-h-11 min-w-11 shrink-0 !px-4 !py-2.5 !text-xs group/btn"
              aria-label={`Reservar ${service.name}`}
            >
              Reservar
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
