## Resumen

Implementado el prerenderizado con Vite SSR y `renderToString`, e hidratación con `hydrateRoot` conservando `StrictMode`. El horario se calcula tras montar; el HTML inicial muestra un estado neutro. El bundle SSR temporal se elimina.

## Archivos cambiados

- `src/main.tsx`, nuevo `src/entry-server.tsx`.
- Nuevo `scripts/prerender.mjs`, `package.json`, `index.html`, `.gitignore`.
- `Hero.tsx`, `Contact.tsx`, `QuickActions.tsx`.
- `Footer.tsx`: año calculado al montar para evitar discrepancias entre build y visita.

Sin commits, push ni cambios en `.ia/`.

## Verificación (comandos y resultado)

- `npx tsc -b`: correcto, sin errores.
- `npm run build`: correcto; cliente y SSR compilados, HTML insertado.
- `grep -c "Haz una pausa" dist/index.html`: **2**.
- Comprobación del HTML: `h1` dentro de `#root`, ocho secciones, estado neutro, recursos relativos existentes y ausencia del bundle SSR.
- `git diff --check`: correcto.
- `npm ci && npm run build`: falló durante `npm ci` por `spawnSync …/esbuild EPERM`.
- `npm run preview -- --host 127.0.0.1`: bloqueado por `listen EPERM`.
- `python3 -m unittest discover -s tests`: falló porque no existe `tests/`.

## Dudas o pendientes

Pendiente verificar hidratación en navegador y ancho de 390 px: Chromium también quedó bloqueado por permisos del entorno. Repetir instalación limpia y preview fuera del sandbox. Revisión asignada a agy.