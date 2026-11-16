import React, { useEffect, useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  MessageCircle,
  ChevronDown,
  Check,
  X,
  ArrowUpRight,
  Menu,
} from 'lucide-react';
import {
  SERVICES,
  SITE_INFO,
  GALLERY_IMAGES,
  POLICIES,
  ServiceCategory,
  ServiceItem,
} from './data/services';
import { formatClp, initGA, trackGAEvent } from './utils/analytics';
import { BookingModal } from './components/BookingModal';

const CATEGORIES: { id: 'all' | ServiceCategory; label: string }[] = [
  { id: 'all', label: 'Todas las Experiencias' },
  { id: 'tinajas', label: 'Tinajas de Agua Caliente' },
  { id: 'packs', label: 'Packs & Alojamiento' },
  { id: 'masajes', label: 'Masajes' },
  { id: 'energeticas', label: 'Terapias Energéticas' },
];

export function App() {
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategory>('all');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [openPolicy, setOpenPolicy] = useState<number | null>(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption: string } | null>(
    null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    initGA();
  }, []);

  const handleCategoryChange = (cat: 'all' | ServiceCategory) => {
    setActiveCategory(cat);
    trackGAEvent('select_content', { content_type: 'category', item_id: cat });
  };

  const handleOpenBooking = (service: ServiceItem | null) => {
    if (service) {
      trackGAEvent('view_item', {
        item_name: service.name,
        currency: 'CLP',
        value: service.tiers[0].price,
      });
    }
    setSelectedService(service);
    setBookingOpen(true);
  };

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#1C2822]">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#E5DFD2]/80 bg-[#F7F4EE]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 py-3.5">
          <a href="#inicio" className="flex items-center gap-3">
            <img
              src={SITE_INFO.logo}
              alt={SITE_INFO.name}
              className="h-11 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <span className="font-display text-xl font-semibold tracking-tight text-[#1E352B] block leading-none">
                Terapias La Palmilla
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#7D6E5D]">
                Rauco · Región del Maule
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#3A4740]">
            <a href="#experiencias" className="hover:text-[#1E352B] transition">
              Experiencias
            </a>
            <a href="#alojamiento" className="hover:text-[#1E352B] transition">
              Cabañas
            </a>
            <a href="#galeria" className="hover:text-[#1E352B] transition">
              Galería
            </a>
            <a href="#politicas" className="hover:text-[#1E352B] transition">
              Políticas
            </a>
            <a href="#contacto" className="hover:text-[#1E352B] transition">
              Ubicación
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleOpenBooking(null)}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#1E352B] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F7F4EE] hover:bg-[#2C4D3F] transition"
            >
              Reservar
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#1E352B] hover:bg-[#EAE4D7]"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E5DFD2] bg-[#F7F4EE] px-6 py-4 space-y-3 text-sm font-medium">
            <a href="#experiencias" onClick={() => setMobileMenuOpen(false)} className="block">
              Experiencias
            </a>
            <a href="#alojamiento" onClick={() => setMobileMenuOpen(false)} className="block">
              Cabañas & Alojamiento
            </a>
            <a href="#galeria" onClick={() => setMobileMenuOpen(false)} className="block">
              Galería
            </a>
            <a href="#politicas" onClick={() => setMobileMenuOpen(false)} className="block">
              Políticas
            </a>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="block">
              Ubicación
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenBooking(null);
              }}
              className="w-full rounded-full bg-[#1E352B] py-2.5 text-white font-semibold"
            >
              Reservar Experiencia
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-[82vh] flex items-end overflow-hidden">
        <img
          src="./images/hero.webp"
          alt="Terapias La Palmilla en Rauco"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121F19]/90 via-[#121F19]/45 to-[#121F19]/25" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 pb-16 pt-28 text-[#F7F4EE]">
          <div className="max-w-2xl space-y-5 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#EAE4D7]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
              {SITE_INFO.distance} · Entorno Campestre Privado
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.03] tracking-tight">
              Haz una pausa en el corazón del Maule.
            </h1>

            <p className="text-base sm:text-lg text-[#E5DFD2] leading-relaxed max-w-xl font-light">
              Tinajas de agua caliente con hidrojet al aire libre, masajes simultáneos en
              salas termorreguladas y cabañas privadas para desconectarte del ritmo diario.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleOpenBooking(SERVICES[1])}
                className="inline-flex items-center gap-2 rounded-full bg-[#C9A96E] px-7 py-3.5 text-sm font-semibold text-[#14221B] hover:bg-[#D8BC88] transition shadow-lg"
              >
                Arma tu Reserva
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href="#experiencias"
                className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 backdrop-blur-sm px-6 py-3.5 text-sm font-medium text-white hover:bg-white/20 transition"
              >
                Explorar Tarifas
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-xs text-[#D3DDD6]">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                {SITE_INFO.schedule}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
                Ruta J-470, Sector La Palmilla, Rauco
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros / Esencia */}
      <section className="border-b border-[#E5DFD2] bg-[#EFEAE0]/60 py-14">
        <div className="mx-auto max-w-5xl px-6 text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8A6D53]">
            Nuestra Esencia
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#1E352B]">
            Un refugio natural diseñado para tu descanso y bienestar
          </h2>
          <p className="text-sm sm:text-base text-[#4C5851] leading-relaxed max-w-3xl mx-auto">
            Terapias Naturales La Palmilla es un espacio creado en medio de la vegetación de
            Rauco, pensado para entregar relajación, tranquilidad y armonía a través de
            nuestros servicios de tinajas calientes, masajes terapéuticos y estadías en
            cabaña, con atención cálida y dedicada.
          </p>
        </div>
      </section>

      {/* Experiencias & Tarifas */}
      <section id="experiencias" className="mx-auto w-full max-w-7xl px-6 sm:px-10 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8A6D53]">
              Rituales & Servicios
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium text-[#1E352B] mt-1">
              Elige tu experiencia
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeCategory === cat.id
                    ? 'bg-[#1E352B] text-[#F7F4EE]'
                    : 'bg-white text-[#4C5851] border border-[#DED8CC] hover:border-[#1E352B]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[#E2DCCE] bg-white shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-60 overflow-hidden bg-[#EAE4D7]">
                <img
                  src={service.image}
                  alt={service.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {service.badge && (
                  <span
                    className={`absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur-md ${
                      service.temporarilyUnavailable
                        ? 'bg-[#3D352E]/85 text-[#F7F4EE]'
                        : 'bg-[#1E352B]/85 text-[#F7F4EE]'
                    }`}
                  >
                    {service.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-[#1C2822]">
                  {service.duration}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-semibold text-[#1E352B]">
                  {service.name}
                </h3>
                <p className="text-xs font-medium text-[#8A6D53] mt-0.5">
                  {service.subtitle}
                </p>
                <p className="mt-3 text-sm text-[#4C5851] leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                <ul className="mt-4 space-y-1.5 border-t border-[#F0ECE2] pt-4">
                  {service.highlights.map((hl) => (
                    <li key={hl} className="flex items-start gap-2 text-xs text-[#3A4740]">
                      <Check className="w-3.5 h-3.5 text-[#1E352B] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5 flex items-end justify-between border-t border-[#F0ECE2] mt-5">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#7D6E5D] block">
                      Desde
                    </span>
                    <span className="font-display text-2xl font-bold text-[#1E352B]">
                      {formatClp(service.tiers[0].price)}
                    </span>
                  </div>

                  {service.temporarilyUnavailable ? (
                    <a
                      href={`https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(
                        `Hola, quisiera consultar cuándo vuelve a estar disponible: ${service.name}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => {
                        trackGAEvent('contact_whatsapp', {
                          source: 'unavailable_service',
                          item_name: service.name,
                        });
                      }}
                      className="rounded-full border border-[#DED8CC] px-4 py-2 text-xs font-semibold text-[#5B665F] hover:border-[#1E352B] hover:text-[#1E352B] transition"
                    >
                      Consultar reapertura
                    </a>
                  ) : (
                    <button
                      onClick={() => handleOpenBooking(service)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#1E352B] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#B87A56] transition"
                    >
                      Reservar <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Alojamiento Destacado */}
      <section id="alojamiento" className="bg-[#1E352B] text-[#F7F4EE] py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="./images/cabana-interior.webp"
              alt="Cabaña y tinaja exclusiva en terraza"
              loading="lazy"
              decoding="async"
              className="rounded-3xl shadow-2xl object-cover w-full h-[420px]"
            />
            <div className="absolute -bottom-5 left-6 right-6 sm:left-8 sm:right-auto sm:w-80 rounded-2xl bg-[#F7F4EE] text-[#1C2822] p-4 shadow-xl">
              <p className="text-[11px] uppercase tracking-widest text-[#8A6D53] font-semibold">
                Estadía para 2 Personas
              </p>
              <p className="font-display text-xl font-semibold text-[#1E352B] mt-0.5">
                Desde $125.000 · Con Masajes $140.000
              </p>
              <p className="text-xs text-[#5B665F] mt-1">
                Check-in 18:00 hrs · Check-out 12:00 hrs · Desayuno incluido
              </p>
            </div>
          </div>

          <div className="space-y-6 pt-6 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C9A96E]">
              Escapada Nocturna
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium leading-tight">
              Cabañas privadas con tinaja exclusiva en la terraza
            </h2>
            <p className="text-sm sm:text-base text-[#D3DDD6] leading-relaxed">
              Ingresa a las 18:00 hrs, relájate con masajes simultáneos (opcional) y
              disfruta tu tinaja privada contemplando la vegetación y el anochecer en Rauco.
              Al despertar, te espera un desayuno incluido antes del check-out al mediodía.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm text-[#EAE4D7]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C9A96E]" /> Aire Acondicionado
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C9A96E]" /> Frigobar y Horno Eléctrico
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C9A96E]" /> Batas y Toallas
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C9A96E]" /> Desayuno Incluido
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => handleOpenBooking(SERVICES[2])}
                className="inline-flex items-center gap-2 rounded-full bg-[#C9A96E] px-7 py-3.5 text-sm font-semibold text-[#14221B] hover:bg-[#D8BC88] transition"
              >
                Reservar Alojamiento <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="mx-auto w-full max-w-7xl px-6 sm:px-10 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8A6D53]">
            Galería del Recinto
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-[#1E352B]">
            Rincones pensados para el silencio
          </h2>
          <p className="text-sm text-[#5B665F]">
            Haz clic en cualquier fotografía para verla en detalle.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((item, idx) => (
            <button
              key={item.src}
              onClick={() => setLightboxImage(item)}
              className={`group relative overflow-hidden rounded-2xl bg-[#EAE4D7] ${
                idx === 0 || idx === 5 ? 'md:col-span-2 h-64' : 'h-64'
              }`}
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-left">
                <span className="text-xs font-medium text-white">{item.caption}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Políticas y Contacto */}
      <section id="politicas" className="border-t border-[#E5DFD2] bg-[#EFEAE0]/70 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Políticas */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8A6D53]">
                Información Importante
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#1E352B] mt-1">
                Políticas de visita y reservas
              </h2>
            </div>

            <div className="space-y-3">
              {POLICIES.map((pol, idx) => {
                const isOpen = openPolicy === idx;
                return (
                  <div
                    key={pol.title}
                    className="rounded-2xl border border-[#DED8CC] bg-white overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenPolicy(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-sm text-[#1E352B]"
                    >
                      <span>{pol.title}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-[#4C5851] leading-relaxed border-t border-[#F4F0E8] pt-3">
                        {pol.body}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ubicación y Contacto */}
          <div id="contacto" className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8A6D53]">
                Cómo Llegar
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#1E352B] mt-1">
                Contacto y ubicación
              </h2>
            </div>

            <div className="rounded-3xl border border-[#DED8CC] bg-white p-6 sm:p-8 space-y-5">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#B87A56] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm text-[#1E352B]">Dirección</div>
                  <div className="text-sm text-[#4C5851]">{SITE_INFO.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#B87A56] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm text-[#1E352B]">
                    Horarios de atención
                  </div>
                  <div className="text-sm text-[#4C5851]">{SITE_INFO.schedule}</div>
                  <div className="text-xs text-[#8C8478] mt-0.5">
                    {SITE_INFO.closedDays}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#B87A56] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm text-[#1E352B]">
                    Teléfono / WhatsApp
                  </div>
                  <a
                    href={`https://wa.me/${SITE_INFO.whatsappRaw}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[#1E352B] underline decoration-[#C9A96E]"
                  >
                    {SITE_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#B87A56] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm text-[#1E352B]">
                    Correo de reservas
                  </div>
                  <a
                    href={`mailto:${SITE_INFO.email}`}
                    className="text-sm text-[#4C5851] hover:text-[#1E352B]"
                  >
                    {SITE_INFO.email}
                  </a>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#E4DEC9] h-52">
                <iframe
                  title="Ubicación Terapias Naturales La Palmilla en Google Maps"
                  src={SITE_INFO.mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>

              <div className="pt-1 flex flex-wrap gap-3">
                <a
                  href={SITE_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#1E352B] px-5 py-2.5 text-xs font-semibold text-[#1E352B] hover:bg-[#1E352B] hover:text-white transition"
                >
                  Abrir en Google Maps <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleOpenBooking(null)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1E352B] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#2C4D3F] transition"
                >
                  Reservar ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#14221B] text-[#D3DDD6] py-10 px-6 text-center text-xs">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>
            © {new Date().getFullYear()} {SITE_INFO.name} · Rauco, Región del Maule.
          </span>
          <span className="text-[#8C9E93]">
            Ruta J-470, Sector La Palmilla · Jueves a Sábados 15:00 a 21:00 hrs
          </span>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${SITE_INFO.whatsappRaw}?text=${encodeURIComponent(
          'Hola Terapias La Palmilla, quisiera consultar disponibilidad para reservar.'
        )}`}
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          trackGAEvent('contact_whatsapp', { source: 'floating_button' });
        }}
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-xs font-semibold text-white shadow-xl hover:scale-105 transition"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp Reservas</span>
      </a>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-5 right-5 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
            aria-label="Cerrar imagen"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl text-center space-y-3" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.caption}
              className="max-h-[80vh] rounded-2xl object-contain mx-auto"
            />
            <p className="text-sm text-[#EAE4D7]">{lightboxImage.caption}</p>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        initialService={selectedService}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}

export default App;
