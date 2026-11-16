## Resumen

Implementado el cierre con atrás/Escape, la coordinación entre overlays y la navegación por anclas. Los campos de reserva usan 16 px y los horarios se desplazan dentro del modal cuando quedan ocultos, respetando movimiento reducido.

## Archivos cambiados

- [useScrollLock.ts](/home/jrobin/proyectos/terapiaslapalmilla/.ia/wt/T003/src/hooks/useScrollLock.ts)
- [BookingModal.tsx](/home/jrobin/proyectos/terapiaslapalmilla/.ia/wt/T003/src/components/BookingModal.tsx)
- [Navbar.tsx](/home/jrobin/proyectos/terapiaslapalmilla/.ia/wt/T003/src/components/Navbar.tsx)

## Verificación (comandos y resultado)

- `npx tsc -b`: código 0, sin salida ni errores.
- `npm run build`: código 0. Salida: `✓ 1601 modules transformed.` y `✓ built in 1.12s`.
- `git diff --check`: código 0, sin errores.
- Simulaciones ejecutadas en Node: 10 comprobaciones del historial y 6 del desplazamiento aprobadas.

## Dudas o pendientes

Pendiente revisión de agy y prueba real a 360/390 px e iOS. Vite no pudo iniciar por `listen EPERM: operation not permitted 127.0.0.1:5173`; Chromium tampoco arrancó.

Sin commits, push, cambios de rama ni modificaciones en `.ia/`.