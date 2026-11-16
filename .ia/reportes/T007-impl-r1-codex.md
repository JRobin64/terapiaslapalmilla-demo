## Resumen

Fuentes locales configuradas con las mismas familias y pesos, `font-display: swap` y dos preloads. Eliminadas las referencias externas a Google Fonts. El prerender sigue funcionando.

## Archivos cambiados

- `index.html`: preloads de Cormorant normal y Plus Jakarta Sans.
- `src/index.css`: tres reglas `@font-face` con subconjunto latin.
- `public/fonts/`: incluidos los tres WOFF2 y ambas licencias preparados por el coordinador; eliminado `google.css`.

## Verificación

- `npx tsc -b`: código 0, sin errores.
- `npm run build`: código 0. Salida: `Prerenderizado: contenido de la página insertado en dist/index.html.`
- `grep -c "fonts.googleapis" dist/index.html`: **0** coincidencias; código 1 esperado.
- `git diff --check`: sin errores.
- Comprobación del build: tres fuentes, dos preloads, licencias y rutas relativas `../fonts/…` compatibles con `/terapiaslapalmilla-demo/`.
- `python3 -m unittest discover -s tests`: falló con `ImportError: Start directory is not importable: 'tests'`; no existe esa carpeta.

## Dudas o pendientes

Pendiente revisión de agy y comparación visual a 390 px: Chromium no arrancó por un error de confinamiento de Snap. No se midió nuevamente el LCP.

Sin commits, push ni cambios de rama.