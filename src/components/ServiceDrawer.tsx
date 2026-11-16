import { ResponsiveImage } from './ui/ResponsiveImage';
import { Check, Clock, X } from 'lucide-react';
import type { ServiceItem } from '../data/services';
import { whatsappLink } from '../data/services';
import { useOverlay } from '../hooks/useScrollLock';
import { formatClp, trackGAEvent } from '../utils/analytics';
import { WhatsAppIcon } from './ui/BrandIcons';

interface Props {
  service: ServiceItem | null;
  onClose: () => void;
  onBook: (s: ServiceItem) => void;
}

export function ServiceDrawer({ service, onClose, onBook }: Props) {
  useOverlay(!!service, onClose);
  if (!service) return null;
  const off = service.temporarilyUnavailable;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-stretch md:justify-end" role="dialog" aria-modal="true" aria-label={service.name}>
      <div className="absolute inset-0 bg-forest-deep/55 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="animate-drawer relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-cream md:max-h-none md:h-full md:max-w-[520px] md:rounded-none md:rounded-l-[2rem]">
        <div className="relative h-56 sm:h-72 shrink-0">
          <ResponsiveImage src={service.image} sizes="(min-width: 768px) 520px, 100vw" alt={service.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 rounded-full bg-white/70 md:hidden" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream/90 text-forest backdrop-blur hover:bg-white transition"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="absolute bottom-4 left-6 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-forest">
            <Clock className="w-3.5 h-3.5" /> {service.duration}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-7">
          <p className="eyebrow text-bark">{service.subtitle}</p>
          <h3 className="mt-2 font-display text-4xl font-semibold leading-tight text-forest">{service.name}</h3>
          {off && (
            <p className="mt-4 rounded-2xl bg-sand px-4 py-3 text-sm text-ink">
              Este servicio está <strong>pausado temporalmente</strong>. Escríbenos por WhatsApp para saber cuándo vuelve.
            </p>
          )}
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{service.description}</p>

          <ul className="mt-6 space-y-2.5">
            {service.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-ink">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-forest text-cream">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="eyebrow text-bark">Valores</p>
            <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl bg-white ring-1 ring-line">
              {service.tiers.map((t) => (
                <li key={t.label} className="flex items-center justify-between px-4 py-3.5 text-sm">
                  <span className="text-ink">{t.label}</span>
                  <span className="font-semibold text-forest tabular-nums">{formatClp(t.price)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="shrink-0 border-t border-line bg-cream/95 px-6 sm:px-8 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {off ? (
            <a
              href={whatsappLink(`Hola, quisiera saber cuándo vuelve a estar disponible: ${service.name}`)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackGAEvent('contact_whatsapp', { source: 'unavailable_service', item_name: service.name })}
              className="btn w-full !py-4 bg-whatsapp text-white hover:brightness-95"
            >
              <WhatsAppIcon className="w-5 h-5" /> Consultar por WhatsApp
            </a>
          ) : (
            <button onClick={() => onBook(service)} className="btn-primary w-full !py-4 text-[15px]">
              Reservar · desde {formatClp(service.tiers[0].price)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
