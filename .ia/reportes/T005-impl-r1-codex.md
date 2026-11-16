## Resumen

Ampliadas las áreas táctiles dentro del alcance, añadida llamada a `tel:+56998252628` en Contacto y pie, y corregidos nombres accesibles de tarjetas y descripciones duplicadas de galería. Textos pequeños autorizados elevados a 12 px.

## Archivos cambiados

- `src/components/`: ServiceCard, Experiences, Footer, Navbar, Contact, Gallery y Hero.
- `src/data/services.ts`: añadido `phoneRaw`.
- `src/index.css`: `eyebrow` a 12 px.

## Verificación (comandos y resultado)

- `npx tsc -b`: código 0, sin salida ni errores.
- `npm run build`: código 0; 1603 módulos transformados, `✓ built in 1.10s`.
- `git diff --check`: código 0, sin errores.
- No existe suite de tests Python.
- Chromium no pudo arrancar por un error de confinamiento de Snap.

## Dudas o pendientes

- Validación a 360/390 px y Lighthouse pendiente del coordinador.
- Hero conserva tres etiquetas de 11 px: su alcance permite únicamente modificar el enlace; ampliación consultada sin respuesta.
- Fuera del alcance quedan controles de 40 px en BookingModal y ServiceDrawer, y textos de 11 px en BookingModal.
- Sin commits, push ni modificaciones de `.ia/`.