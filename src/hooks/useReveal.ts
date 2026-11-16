import { useEffect, useRef } from 'react';

/** Agrega la clase `is-visible` a los elementos `.reveal` dentro del contenedor cuando entran en pantalla. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.classList.contains('reveal')
      ? [root, ...root.querySelectorAll<HTMLElement>('.reveal')]
      : [...root.querySelectorAll<HTMLElement>('.reveal')];

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  return ref;
}
