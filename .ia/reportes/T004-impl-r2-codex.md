## Resumen

Añadido `w-auto` a la imagen principal del lightbox para mantener proporcional su caja cuando se limita la altura, corrigiendo los márgenes de sombra y el área de clic.

## Archivos cambiados

- `src/components/Gallery.tsx`: únicamente la clase indicada en la revisión.

## Verificación (comandos y resultado)

- `npx tsc -b`: código 0, sin salida.
- `npm run build`: código 0; 1603 módulos transformados; `built in 1.10s`.
- `git diff --check`: código 0, sin errores.

## Dudas o pendientes

Pendiente validación visual en navegador y revisión de agy. Sin commit, push ni cambios en `.ia/`.