import { useCallback, useEffect, useRef } from 'react';

let locks = 0;
let historyEntryId = 0;
const HISTORY_KEY = '__lpOverlay';
type Overlay = { current: (() => void) | undefined };
const overlays: Overlay[] = [];
const historyEntries: string[] = [];
const afterCloseActions: (() => void)[] = [];
let syncing = false;
let consumingEntry = false;
let listening = false;

// Agrupar los efectos permite reutilizar la entrada al encadenar overlays y
// evita agregar/quitar entradas durante el montaje doble de StrictMode.
function scheduleHistorySync() {
  if (syncing) return;
  syncing = true;
  queueMicrotask(() => {
    syncing = false;
    syncHistory();
  });
}

function syncHistory() {
  // history.back() es asíncrono: no agregar entradas hasta recibir popstate.
  if (consumingEntry) return;

  if (historyEntries.length > overlays.length) {
    if (window.history.state?.[HISTORY_KEY] === historyEntries.at(-1)) {
      consumingEntry = true;
      window.history.back();
      return;
    }
    // Nunca retroceder sobre una entrada que no nos pertenece.
    historyEntries.length = 0;
  }

  while (historyEntries.length < overlays.length) {
    const id = String(++historyEntryId);
    window.history.pushState({ ...window.history.state, [HISTORY_KEY]: id }, '');
    historyEntries.push(id);
  }

  if (overlays.length === 0 && historyEntries.length === 0) {
    window.removeEventListener('popstate', onPopState);
    window.removeEventListener('keydown', onKeyDown);
    listening = false;
    // Esperar también la restauración de scroll del navegador tras popstate.
    for (const action of afterCloseActions.splice(0)) window.setTimeout(action, 0);
  }
}

function onPopState(event: PopStateEvent) {
  const remaining = historyEntries.indexOf(event.state?.[HISTORY_KEY]) + 1;
  if (remaining === historyEntries.length) return;
  historyEntries.length = remaining;

  if (consumingEntry) {
    consumingEntry = false;
  } else {
    // Quitar antes de avisar a React para no volver a consumir estas entradas.
    const closed = overlays.splice(remaining);
    for (const overlay of closed.reverse()) overlay.current?.();
  }
  scheduleHistorySync();
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') overlays.at(-1)?.current?.();
}

/** Bloquea el scroll y cierra con atrás/Escape. Devuelve un cierre con acción diferida. */
export function useOverlay(active: boolean, onClose?: () => void) {
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!active) return;
    overlays.push(closeRef);
    if (!listening) {
      window.addEventListener('popstate', onPopState);
      window.addEventListener('keydown', onKeyDown);
      listening = true;
    }
    scheduleHistorySync();

    locks += 1;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    return () => {
      const index = overlays.indexOf(closeRef);
      if (index !== -1) overlays.splice(index, 1);
      scheduleHistorySync();
      locks -= 1;
      if (locks === 0) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, [active]);

  return useCallback((afterClose: () => void) => {
    afterCloseActions.push(afterClose);
    closeRef.current?.();
    scheduleHistorySync();
  }, []);
}
