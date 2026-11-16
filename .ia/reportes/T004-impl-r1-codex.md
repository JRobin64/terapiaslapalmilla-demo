## Resumen

Implementadas imágenes responsivas con `srcSet`, `sizes` y dimensiones reales. Generadas 24 variantes WebP para 13 fotos, sin ampliaciones. Miniaturas con variante de 640 como `src`.

## Archivos cambiados

- Nuevo `scripts/imagenes.py`.
- Nuevos `ResponsiveImage.tsx` e `imageMetadata.ts` en `src/components/ui/`.
- 24 imágenes en `public/images/`.
- Intro, ServiceCard, ServiceDrawer, Stay, Gallery y BookingModal.
- Footer/Navbar: únicamente dimensiones del logo.

## Verificación (comandos y resultado)

- `python3 scripts/imagenes.py`: 24 variantes generadas; segunda ejecución: **0 archivos escritos**.
- Comprobaciones Python: dimensiones, rutas, idempotencia y copia de variantes a `dist/images` correctas.
- `npx tsc -b`: salida vacía, código **0**.
- `npm run build`: código **0**, **1603 módulos**, `built in 1.09s`.
- `git diff --check`: sin errores.

No existe suite Python. Hero, preload, originales y `.ia/` permanecen intactos. Sin commit ni push.

## Dudas o pendientes

Pendientes la revisión de agy y las pruebas visuales a 360/390 px y Lighthouse del coordinador. No ejecuté navegador.