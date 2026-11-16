import { useEffect } from 'react';

let locks = 0;

/** Bloquea el scroll del body mientras `active` sea true y cierra con Escape. */
export function useOverlay(active: boolean, onClose?: () => void) {
  useEffect(() => {
    if (!active) return;
    locks += 1;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      locks -= 1;
      if (locks === 0) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, [active, onClose]);
}
