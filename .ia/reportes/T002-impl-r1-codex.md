## Resumen

Implementado T002: los textos de portada animan solo `transform`, permaneciendo visibles durante la entrada. Google Fonts carga sin bloquear, con respaldo `noscript`, mismas familias/pesos y `display=swap`.

Se mantienen el preload de imagen, `fetchPriority="high"` y movimiento reducido.

## Archivos cambiados

- `index.html`
- `src/index.css`
- `src/components/Hero.tsx`

## Verificación (comandos y resultado)

- `npx tsc -b`: código 0, sin salida ni errores.
- `npm run build`: código 0; `✓ 1601 modules transformed.`, `✓ built in 1.12s`.
- `git diff --check`: código 0, sin errores.

## Dudas o pendientes

Pendientes la revisión de agy y las pruebas del coordinador en navegador a 360/390 px y Lighthouse. No se midió el nuevo LCP.

Sin commits, push, cambios de rama ni modificaciones en `.ia/`.