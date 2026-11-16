import { ArrowUpRight, Clock, Mail, MapPin, Navigation } from 'lucide-react';
import { SITE_INFO, WEEK_SCHEDULE, whatsappLink } from '../data/services';
import { getOpenStatus } from '../lib/time';
import { trackGAEvent } from '../utils/analytics';
import { SectionHeading } from './ui/Section';
import { WhatsAppIcon } from './ui/BrandIcons';

// Orden lunes → domingo
const ORDER = [1, 2, 3, 4, 5, 6, 0];

export function Contact() {
  const status = getOpenStatus();
  return (
    <section id="contacto" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Cómo llegar"
          title={
            <>
              Te esperamos en <span className="italic text-clay">La Palmilla</span>
            </>
          }
          intro={`${SITE_INFO.location}. ${SITE_INFO.distance}.`}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-line lg:col-span-7 min-h-[320px] bg-sand">
            <iframe
              title="Ubicación de Terapias La Palmilla en Google Maps"
              src={SITE_INFO.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
            />
            <a
              href={SITE_INFO.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary absolute bottom-4 left-4 !py-2.5 !text-[13px] shadow-lg"
            >
              <Navigation className="w-4 h-4" /> Cómo llegar
            </a>
          </div>

          <div className="grid gap-4 lg:col-span-5">
            <a
              href={whatsappLink('Hola Terapias La Palmilla, quisiera consultar disponibilidad.')}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackGAEvent('contact_whatsapp', { source: 'contact_card' })}
              className="group flex items-center gap-4 rounded-[1.75rem] bg-forest p-6 text-cream transition hover:bg-moss"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-whatsapp text-white">
                <WhatsAppIcon className="w-6 h-6" />
              </span>
              <span className="flex-1">
                <span className="block text-xs text-sage">WhatsApp y teléfono</span>
                <span className="block text-lg font-semibold">{SITE_INFO.phone}</span>
              </span>
              <ArrowUpRight className="w-5 h-5 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <a
              href={`mailto:${SITE_INFO.email}`}
              className="group flex items-center gap-4 rounded-[1.75rem] bg-white p-6 ring-1 ring-line transition hover:ring-forest/40"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sand text-forest">
                <Mail className="w-5 h-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-muted">Correo de reservas</span>
                <span className="block truncate font-semibold text-forest">{SITE_INFO.email}</span>
              </span>
            </a>

            <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-line">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-forest">
                  <Clock className="w-4 h-4" /> Horario de atención
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    status.isOpen ? 'bg-emerald-50 text-emerald-700' : 'bg-sand text-bark'
                  }`}
                >
                  {status.isOpen ? 'Abierto ahora' : 'Cerrado ahora'}
                </span>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm">
                {ORDER.map((d) => {
                  const s = WEEK_SCHEDULE[d];
                  const today = d === status.today;
                  return (
                    <li
                      key={s.day}
                      className={`flex justify-between rounded-lg px-2.5 py-1 ${today ? 'bg-sand font-semibold text-forest' : 'text-muted'}`}
                    >
                      <span>
                        {s.day}
                        {today && <span className="ml-1.5 text-[11px] font-medium text-bark">(hoy)</span>}
                      </span>
                      <span className="tabular-nums">{s.open ? `${s.open} – ${s.close}` : 'Cerrado'}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex items-start gap-3 rounded-[1.75rem] bg-white p-6 ring-1 ring-line text-sm text-muted">
              <MapPin className="mt-0.5 w-4 h-4 shrink-0 text-clay" />
              <span>{SITE_INFO.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
