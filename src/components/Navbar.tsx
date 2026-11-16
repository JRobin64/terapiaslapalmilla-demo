import { useEffect, useState, type MouseEvent } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { SITE_INFO } from '../data/services';
import { useActiveSection, useScrolled } from '../hooks/useScrolled';
import { useOverlay } from '../hooks/useScrollLock';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './ui/BrandIcons';

const LINKS = [
  { id: 'experiencias', label: 'Experiencias' },
  { id: 'alojamiento', label: 'Cabañas' },
  { id: 'galeria', label: 'Galería' },
  { id: 'politicas', label: 'Políticas' },
  { id: 'contacto', label: 'Contacto' },
];
const IDS = LINKS.map((l) => l.id);

export function Navbar({ onBook }: { onBook: () => void }) {
  const scrolled = useScrolled(40);
  const active = useActiveSection(IDS);
  const [open, setOpen] = useState(false);
  const closeMenuThen = useOverlay(open, () => setOpen(false));

  const onSectionClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!open || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const hash = event.currentTarget.hash;
    closeMenuThen(() => {
      if (window.location.hash !== hash) window.location.hash = hash;
      else {
        document.getElementById(hash.slice(1))?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        });
      }
    });
  };

  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          solid
            ? 'bg-cream/85 backdrop-blur-xl border-b border-line/70 shadow-[0_1px_20px_-12px_rgba(18,32,26,0.25)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 h-16 md:h-[72px]">
          <a href="#inicio" onClick={onSectionClick} className="flex items-center gap-3 group" aria-label="Ir al inicio">
            <span
              className={`grid place-items-center rounded-xl transition-all duration-500 ${
                solid ? 'bg-transparent' : 'bg-cream/90 px-2 py-1 shadow-sm'
              }`}
            >
              <img src={SITE_INFO.logo} alt="" className="h-9 md:h-10 w-auto" width={180} height={109} />
            </span>
            <span
              className={`hidden lg:block font-display text-xl font-semibold tracking-tight transition-colors duration-500 ${
                solid ? 'text-forest' : 'text-white'
              }`}
            >
              Terapias La Palmilla
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Principal">
            {LINKS.map((l) => {
              const isActive = active === l.id;
              return (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    solid
                      ? isActive
                        ? 'text-forest'
                        : 'text-muted hover:text-forest'
                      : 'text-white/85 hover:text-white'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 bottom-0.5 h-[3px] w-[3px] rounded-full bg-gold transition-all duration-300 ${
                      isActive && solid ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onBook}
              className={`hidden sm:inline-flex !px-5 !py-2.5 !text-[13px] ${solid ? 'btn-primary' : 'btn-gold'}`}
            >
              Reservar
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className={`md:hidden grid place-items-center h-10 w-10 rounded-full transition-colors ${
                solid ? 'text-forest hover:bg-sand' : 'text-white bg-white/10 backdrop-blur-md'
              }`}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil a pantalla completa */}
      {open && (
        <div className="fixed inset-0 z-30 md:hidden bg-cream animate-fade-in pt-16">
          <nav className="flex h-full flex-col px-6 pb-8 pt-6" aria-label="Menú móvil">
            <ul className="flex-1 space-y-1">
              {LINKS.map((l, i) => (
                <li key={l.id} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <a
                    href={`#${l.id}`}
                    onClick={onSectionClick}
                    className="flex items-center justify-between border-b border-line py-4 font-display text-[2rem] font-medium text-forest"
                  >
                    {l.label}
                    <ArrowUpRight className="w-5 h-5 text-bark" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="space-y-4 animate-fade-up delay-2">
              <button
                onClick={() => {
                  setOpen(false);
                  onBook();
                }}
                className="btn-primary w-full !py-4 text-base"
              >
                Reservar experiencia
              </button>
              <div className="flex items-center justify-center gap-3 text-forest">
                <a href={`https://wa.me/${SITE_INFO.whatsappRaw}`} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-line" aria-label="WhatsApp">
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
                <a href={SITE_INFO.instagram} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-line" aria-label="Instagram">
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a href={SITE_INFO.facebook} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-line" aria-label="Facebook">
                  <FacebookIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
