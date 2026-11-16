import { SITE_INFO } from '../data/services';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './ui/BrandIcons';

export function Footer({ onBook }: { onBook: () => void }) {
  return (
    <footer className="bg-forest-deep text-sage">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 py-14 md:flex-row md:items-center">
          <h2 className="max-w-xl font-display text-4xl sm:text-5xl font-medium leading-tight text-cream">
            Tu pausa te está <span className="italic text-gold-soft">esperando.</span>
          </h2>
          <button onClick={onBook} className="btn-gold !px-8 !py-4">Reservar ahora</button>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <div className="lg:col-span-2">
            <img src={SITE_INFO.logo} alt={SITE_INFO.name} className="h-14 w-auto rounded-lg bg-cream p-1.5" />
            <p className="mt-4 max-w-sm leading-relaxed">
              Centro de relajación y reflexión a 5 km de Rauco. Tinajas, masajes y alojamiento en
              un entorno natural.
            </p>
            <div className="mt-5 flex gap-2.5">
              {[
                { href: `https://wa.me/${SITE_INFO.whatsappRaw}`, label: 'WhatsApp', Icon: WhatsAppIcon },
                { href: SITE_INFO.instagram, label: 'Instagram', Icon: InstagramIcon },
                { href: SITE_INFO.facebook, label: 'Facebook', Icon: FacebookIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/15 text-cream transition hover:bg-gold hover:text-forest-deep hover:ring-gold"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow text-gold">Navegación</p>
            <ul className="mt-4 space-y-2">
              {[
                ['#experiencias', 'Experiencias y precios'],
                ['#alojamiento', 'Cabañas'],
                ['#galeria', 'Galería'],
                ['#politicas', 'Políticas'],
                ['#contacto', 'Contacto'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="hover:text-cream transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-gold">Contacto</p>
            <ul className="mt-4 space-y-2">
              <li>{SITE_INFO.phone}</li>
              <li>
                <a href={`mailto:${SITE_INFO.email}`} className="hover:text-cream transition-colors break-all">{SITE_INFO.email}</a>
              </li>
              <li>{SITE_INFO.shortLocation}</li>
              <li>{SITE_INFO.schedule}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-sage/70 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {SITE_INFO.tagline}</span>
          <span>Rauco · Región del Maule · Chile</span>
        </div>
      </div>
    </footer>
  );
}
