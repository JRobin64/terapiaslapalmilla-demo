# Plan del proyecto

## Objetivo
Versión final del sitio de Terapias La Palmilla: moderna, limpia y fluida, con todo el contenido del sitio
original (terapiaslapalmilla.cl) y del prototipo previo, y un flujo de reserva por WhatsApp sin fricción.
Terminado cuando: build sin errores, revisión aprobada, se ve bien en celular y escritorio, y el usuario da el OK para main.

## Fase 2 — mejoras para celular (auditoría 2026-11-16)
Lighthouse móvil: rendimiento 84 (LCP 4,3 s), resto 100. 34 elementos tocables < 44 px, inputs de 15 px (zoom iOS),
botón atrás sale del sitio con overlays abiertos, 760 KiB de imágenes sobredimensionadas.
Reparto pedido por el usuario: implementa codex, revisa agy. Fuera de alcance: caché de GitHub Pages (depende del hosting).

## Arquitectura / decisiones
- Se mantiene el stack del prototipo (React 19 + Vite + Tailwind v4); una sola página con secciones ancladas.
- Contenido centralizado en `src/data/services.ts`.
- Reserva en 3 pasos (servicio y personas → fecha y hora → datos) que abre WhatsApp con el mensaje armado.
  Fechas: próximos jueves, viernes y sábados; horas cada 30 min que terminen antes de las 21:00 según la duración del servicio.
- Hora calculada en zona America/Santiago (estado abierto/cerrado y fechas).
- `package-lock.json` regenerado en Linux (el del Mac rompía `npm ci` en Ubuntu).
- `gemoterapia.webp` recortada para quitar el texto rojo «No Disponible».

## Tareas
| ID | Título | Depende de | Implementa | Revisa | Estado |
|----|--------|------------|------------|---------|--------|
| T001 | Rediseño completo del sitio | — | claude | codex | integrada |
| T002 | Portada más rápida (LCP y fuentes) | — | codex | agy | integrada |
| T003 | Overlays: botón atrás, zoom iOS y salto a horarios | — | codex | agy | integrada |
| T004 | Imágenes responsivas para celular | T002 | codex | agy | integrada |
| T005 | Botones táctiles, llamada y accesibilidad | T003, T004 | codex | agy | en-curso |
| T006 | Prerenderizado del HTML en el build | T005 | codex | agy | pendiente |

Estados: pendiente → en-curso → revision → aprobada → integrada (o bloqueada)

## Registro
- 2026-11-16 — Proyecto incorporado a agentdeck. T001 implementada por Claude antes de incorporar el proyecto; pasa a revisión cruzada con codex.
- 2026-11-16 — T001 r1 codex: CAMBIOS (precios faciales calculados; horarios pasados de hoy). Corregido por claude. r2 codex: APROBADO. Integrada en desarrollo.
- 2026-11-16 — T002 r1: codex implementó, agy APROBADO. Integrada.
- 2026-11-16 — T003 r1: codex, agy APROBADO; el coordinador detectó crypto.randomUUID (iOS < 15.4) → r2 codex (contador) + coordinador (prefijo por carga); agy APROBADO. Integrada.
- 2026-11-16 — Medición tras T004 (local): imágenes sobredimensionadas 760 → 184 KiB; LCP sigue en 4,2 s por render delay del JS (el HTML llega vacío). Se añade T006 (prerender).
- 2026-11-16 — T004 r1 codex, agy CAMBIOS (w-auto en visor); r2 codex, agy APROBADO. Integrada.
