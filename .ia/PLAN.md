# Plan del proyecto

## Objetivo
Versión final del sitio de Terapias La Palmilla: moderna, limpia y fluida, con todo el contenido del sitio
original (terapiaslapalmilla.cl) y del prototipo previo, y un flujo de reserva por WhatsApp sin fricción.
Terminado cuando: build sin errores, revisión aprobada, se ve bien en celular y escritorio, y el usuario da el OK para main.

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

Estados: pendiente → en-curso → revision → aprobada → integrada (o bloqueada)

## Registro
- 2026-11-16 — Proyecto incorporado a agentdeck. T001 implementada por Claude antes de incorporar el proyecto; pasa a revisión cruzada con codex.
- 2026-11-16 — T001 r1 codex: CAMBIOS (precios faciales calculados; horarios pasados de hoy). Corregido por claude. r2 codex: APROBADO. Integrada en desarrollo.
