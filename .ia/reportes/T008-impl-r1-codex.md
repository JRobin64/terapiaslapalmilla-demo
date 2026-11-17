## Resumen

Eliminados el servicio, su categoría y sus fotos. Conservado `temporarilyUnavailable` y documentado su uso.

## Archivos cambiados

- `src/data/services.ts`
- `src/components/ui/imageMetadata.ts` (regenerado)
- `AGENTS.md`
- Borrados `public/images/gemoterapia.webp` y `public/images/gemoterapia-640.webp`.

## Verificación

- `python3 scripts/imagenes.py`: 12 fotos; 23 variantes; 0 WebP escritos; metadatos actualizados.
- `npx tsc -b`: correcto, sin errores.
- `npm run build`: correcto, incluido prerenderizado.
- `grep -rniE "energ|gemoterapia|reiki|cuenco|chakra" src index.html public`: sin coincidencias (código 1 esperado).
- HTML generado: Todas 8, Tinajas 1, Packs y alojamiento 3, Masajes 4; ocho tarjetas.
- `git diff --check`: correcto.
- `python3 -m unittest discover -s tests`: falló con `ImportError: Start directory is not importable: 'tests'`; no existe carpeta `tests`.

## Dudas o pendientes

Pendiente revisión de agy y comprobación visual a 390 px. Sin commits, push ni cambios en `.ia/`.