# Brief — Terapias La Palmilla

> Armado por Claude el 2026-11-22 a partir del sitio actual, el trabajo hecho (ver `.ia/PLAN.md`) y una revisión técnica. Lo que no se sabe va a "Preguntas abiertas".

## Negocio
- Tinajas de agua caliente, masajes, terapias y cabañas en Rauco, Región del Maule.
- Sitio actual: https://terapiaslapalmilla.cl (WordPress + WooCommerce, hosting Apache en misitio.cl).
- Público: personas en celular, principalmente.

## Objetivo del proyecto
- Reemplazar el WordPress por un sitio moderno, rápido y fácil de mantener.
- Que reservar sea simple: la reserva se arma en el sitio y se envía por WhatsApp (sin pagos en línea).
- Éxito = más consultas/reservas por WhatsApp, sitio rápido en celular, sin perder posicionamiento en Google.

## Estado (2026-11-22)
- Demo terminada y publicada: https://jrobin64.github.io/terapiaslapalmilla-demo/
- Lighthouse móvil: 100 en rendimiento, accesibilidad, buenas prácticas y SEO (LCP 1,1 s).
- Falta pasarla al dominio real reemplazando el WordPress.

## Alcance
- Incluido: sitio de una página (servicios, precios, alojamiento, galería, políticas, contacto), reserva por WhatsApp, SEO básico, redirecciones desde las páginas antiguas, publicación en el dominio.
- Fuera de alcance (por ahora): pagos en línea, tienda, panel para editar contenido.

## Técnico
- Dominio: terapiaslapalmilla.cl (DNS en misitio: dnsmisitio.net).
- Hosting: el actual (Apache, misitio) sirve para el sitio nuevo: es estático y admite `.htaccess` para redirecciones 301.
- El WordPress tiene ~40 URLs indexadas (páginas, productos WooCommerce, categorías) → redirigirlas a las secciones del sitio nuevo.

## Preguntas abiertas (para el cliente)
- [ ] ¿Aprueba la demo tal como está, o quiere cambios antes de publicar?
- [ ] ¿Quién administra el hosting y el dominio (misitio)? Necesitamos acceso (cPanel o FTP/SSH) o que nos lo gestionen.
- [ ] ¿Hasta cuándo está pagado el hosting? ¿Lo renovamos ahí o cambiamos?
- [ ] ¿Se vende algo hoy por la tienda del WordPress (pagos en línea)? Si sí, ¿se puede dejar solo por WhatsApp?
- [ ] ¿Tienen correo con el dominio (ej. contacto@terapiaslapalmilla.cl)? No debe cortarse al cambiar el sitio.
- [ ] ¿Quieren estadísticas de visitas (Google Analytics)?
- [ ] ¿Tienen acceso a Google Search Console o a la ficha de Google Maps del negocio?
