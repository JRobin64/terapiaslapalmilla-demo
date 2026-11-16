import { useEffect, useState } from 'react';
import { whatsappLink } from '../data/services';
import { useScrolled } from '../hooks/useScrolled';
import { trackGAEvent } from '../utils/analytics';
import { WhatsAppIcon } from './ui/BrandIcons';

const WA_MSG = 'Hola Terapias La Palmilla, quisiera consultar disponibilidad para reservar.';

/** Barra inferior en móvil y botón flotante de WhatsApp en escritorio. */
export function QuickActions({ onBook, hidden }: { onBook: () => void; hidden: boolean }) {
  const [offset, setOffset] = useState(500);
  useEffect(() => {
    const onResize = () => setOffset(window.innerHeight * 0.7);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const pastHero = useScrolled(offset);
  const show = pastHero && !hidden;

  return (
    <>
      {/* Móvil */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 md:hidden px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-cream via-cream/95 to-cream/0 transition-transform duration-500 ${
          show ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex gap-2.5">
          <a
            href={whatsappLink(WA_MSG)}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackGAEvent('contact_whatsapp', { source: 'mobile_bar' })}
            className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-whatsapp text-white shadow-lg"
            aria-label="Escribir por WhatsApp"
          >
            <WhatsAppIcon className="w-6 h-6" />
          </a>
          <button onClick={onBook} className="btn-primary flex-1 !py-0 h-[52px] text-[15px] shadow-lg">
            Reservar experiencia
          </button>
        </div>
      </div>

      {/* Escritorio */}
      <a
        href={whatsappLink(WA_MSG)}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackGAEvent('contact_whatsapp', { source: 'floating_button' })}
        aria-label="Escribir por WhatsApp"
        className={`group fixed bottom-6 right-6 z-40 hidden md:inline-flex items-center gap-2 rounded-full bg-whatsapp p-3.5 text-white shadow-[0_12px_30px_-10px_rgba(37,211,102,0.7)] transition-all duration-500 hover:pr-5 ${
          hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <WhatsAppIcon className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-500 group-hover:max-w-[160px]">
          Escríbenos
        </span>
      </a>
    </>
  );
}
