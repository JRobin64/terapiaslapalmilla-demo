# Instrucciones del proyecto (leídas por Claude Code, Codex y agy)

## Qué es este proyecto
Sitio web de una sola página de Terapias La Palmilla (tinajas, masajes y cabañas en Rauco, Maule, Chile).
Reemplaza al sitio WordPress https://terapiaslapalmilla.cl. Las reservas se envían por WhatsApp (no hay backend).
Público: personas en celular principalmente; todo el contenido en español de Chile.

## Stack y estructura
- React 19 + TypeScript + Vite 6 + Tailwind CSS v4 (plugin `@tailwindcss/vite`), iconos `lucide-react`.
- `src/data/services.ts`: TODO el contenido (servicios, precios, horario, políticas, galería, contacto). Los textos y precios se cambian solo aquí.
- `src/components/`: una sección por archivo (Navbar, Hero, Intro, Experiences, ServiceCard, ServiceDrawer, Stay, HowItWorks, Gallery, Policies, Contact, Footer, QuickActions, BookingModal); `ui/` con piezas compartidas.
- `src/hooks/`: useReveal (animación al hacer scroll), useOverlay (bloqueo de scroll + Escape), useScrolled/useActiveSection.
- `src/lib/time.ts`: hora de Chile (America/Santiago), estado abierto/cerrado, próximas fechas y horarios reservables.
- `src/utils/analytics.ts`: GA4 opcional (`VITE_GA_MEASUREMENT_ID`) y `formatClp`.
- `src/index.css`: tokens de color/tipografía en `@theme` (forest, cream, sand, gold, clay, bark…), utilidades `btn-*`, `eyebrow`, animaciones.
- `public/images/`: fotos .webp. Deploy: GitHub Pages vía `.github/workflows/deploy.yml` (`base: './'`).

## Comandos
- Instalar dependencias: `npm ci`
- Tests: no hay suite; la verificación es `npx tsc -b` + `npm run build` sin errores.
- Lint/formato: `npx tsc -b` (TypeScript estricto).
- Build/ejecutar: `npm run build` (sale en `dist/`), `npm run dev` para desarrollo, `npm run preview` para probar el build.

## Convenciones
- Código en inglés/español según lo existente; textos visibles y comentarios en español de Chile.
- Colores solo con los tokens de `@theme` (no hex sueltos en componentes). Tipografía: Cormorant Garamond (títulos, `font-display`) y Plus Jakarta Sans (texto).
- Mobile-first: probar a 390 px de ancho; nada de scroll horizontal; respetar `prefers-reduced-motion`.
- Nunca inventar datos del negocio (precios, reseñas, cifras): solo lo que está en `services.ts` o en el sitio original.
- Para pausar un servicio sin borrarlo: `temporarilyUnavailable: true` y `badge` en `services.ts` (se muestra en gris, sin reserva, con consulta por WhatsApp).
- No añadir dependencias nuevas sin que la tarea lo indique.
- `package-lock.json` debe generarse en Linux (el deploy corre en Ubuntu).

## Flujo de trabajo
- Una tarea = un issue de GitHub = una rama `issue-<N>-<slug>` = un Pull Request a `main`. El PR cierra el issue (`Cierra #N`).
- El CI (`tsc -b` + build) debe pasar antes de integrar. Integra Claude tras el OK del usuario.
- `main` se publica automáticamente (hoy en GitHub Pages; al lanzar, en el hosting del dominio).
- Brief y preguntas al cliente: `docs/brief.md`. Lanzamiento: `docs/entrega.md`. Tablero: GitHub Project "Clientes".

## Historial
- `.ia/PLAN.md`, `.ia/tareas/` y `.ia/reportes/` guardan el registro de las tareas hechas antes con el equipo de IAs (agentdeck, ya retirado). Solo consulta; el desarrollo ahora lo hace Claude Code directamente.
