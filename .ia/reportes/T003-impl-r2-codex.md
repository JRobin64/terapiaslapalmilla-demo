## Resumen

Reemplazado `crypto.randomUUID()` por un contador incremental para identificar entradas del historial sin depender de esa API en Safari antiguo o HTTP local.

## Archivos cambiados

- [src/hooks/useScrollLock.ts](/home/jrobin/proyectos/terapiaslapalmilla/.ia/wt/T003/src/hooks/useScrollLock.ts)

## Verificación (comandos y resultado)

- `npx tsc -b`: código 0, sin errores.
- `npm run build`: código 0; `1601 modules transformed`, `built in 1.12s`.
- `git diff --check`: código 0, sin errores.
- `git status --short`: únicamente el hook modificado.

## Dudas o pendientes

No ejecuté pruebas en Safari/iOS real. Pendiente revisión de agy de esta corrección.

Sin commits, push, cambios de rama ni modificaciones en `.ia/`.