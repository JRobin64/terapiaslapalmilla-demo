import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_IMAGES, SITE_INFO } from '../data/services';
import { useOverlay } from '../hooks/useScrollLock';
import { useReveal } from '../hooks/useReveal';
import { SectionHeading } from './ui/Section';
import { InstagramIcon } from './ui/BrandIcons';


export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="galeria" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Galería"
          title={
            <>
              Rincones pensados <span className="italic text-clay">para el silencio</span>
            </>
          }
          action={
            <a
              href={SITE_INFO.instagram}
              target="_blank"
              rel="noreferrer"
              className="btn-outline self-start md:self-auto !py-2.5"
            >
              <InstagramIcon className="w-4 h-4" /> @terapiaslapalmilla
            </a>
          }
        />

        <div ref={ref} className="mt-10 grid grid-cols-2 auto-rows-[150px] sm:auto-rows-[200px] md:grid-cols-4 md:auto-rows-[190px] lg:auto-rows-[220px] gap-3 sm:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setIndex(i)}
              className={`reveal group relative overflow-hidden rounded-2xl sm:rounded-[1.5rem] bg-sand ${
                i === 0 ? 'col-span-2 row-span-2' : i === 5 ? 'col-span-2' : ''
              }`}
              style={{ ['--reveal-delay' as string]: `${(i % 4) * 70}ms` }}
              aria-label={`Ver foto: ${img.caption}`}
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/60 via-black/0 to-transparent p-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-xs font-medium text-white">{img.caption}</span>
                <Expand className="w-4 h-4 shrink-0 text-white" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {index !== null && <Lightbox index={index} setIndex={setIndex} />}
    </section>
  );
}

function Lightbox({ index, setIndex }: { index: number; setIndex: (i: number | null) => void }) {
  const total = GALLERY_IMAGES.length;
  const close = useCallback(() => setIndex(null), [setIndex]);
  const go = useCallback((d: number) => setIndex((index + d + total) % total), [index, total, setIndex]);
  const touchX = useRef<number | null>(null);
  useOverlay(true, close);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const img = GALLERY_IMAGES[index];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-forest-deep/95 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Galería de imágenes"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 text-cream">
        <span className="text-sm tabular-nums text-sage">
          {index + 1} / {total}
        </span>
        <button onClick={close} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition" aria-label="Cerrar">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 sm:px-20 min-h-0" onClick={close}>
        <img
          key={img.src}
          src={img.src}
          alt={img.caption}
          onClick={(e) => e.stopPropagation()}
          className="animate-fade-in max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
        />
        <button
          onClick={(e) => { e.stopPropagation(); go(-1); }}
          className="absolute left-3 sm:left-6 hidden sm:grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); go(1); }}
          className="absolute right-3 sm:right-6 hidden sm:grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center">
        <p className="text-sm text-cream/90">{img.caption}</p>
        <div className="no-scrollbar mx-auto mt-4 flex max-w-full justify-start sm:justify-center gap-2 overflow-x-auto">
          {GALLERY_IMAGES.map((g, i) => (
            <button
              key={g.src}
              onClick={() => setIndex(i)}
              className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg transition-all ${
                i === index ? 'ring-2 ring-gold opacity-100' : 'opacity-40 hover:opacity-80'
              }`}
              aria-label={`Ir a la foto ${i + 1}`}
            >
              <img src={g.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
