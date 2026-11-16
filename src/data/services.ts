export type ServiceCategory = 'tinajas' | 'masajes' | 'packs' | 'energeticas';

export interface PriceTier {
  label: string;
  people: number;
  price: number;
}

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  name: string;
  subtitle: string;
  duration: string;
  /** Duración total en minutos (para calcular horarios disponibles). null = alojamiento con check-in fijo. */
  minutes: number | null;
  description: string;
  highlights: string[];
  image: string;
  tiers: PriceTier[];
  badge?: string;
  featured?: boolean;
  temporarilyUnavailable?: boolean;
}

export const SITE_INFO = {
  name: 'Terapias La Palmilla',
  tagline: 'Terapias Naturales La Palmilla',
  location: 'Ruta J-470, N° 1525, Sector La Palmilla, Rauco, Región del Maule',
  shortLocation: 'Ruta J-470, La Palmilla, Rauco',
  distance: 'A 5 km de Rauco',
  phone: '+56 9 9825 2628',
  phoneRaw: '+56998252628',
  whatsappRaw: '56998252628',
  email: 'terapia.reservas@gmail.com',
  schedule: 'Jueves a sábado, 15:00 a 21:00 hrs',
  closedDays: 'Lunes, martes, miércoles y domingo cerrado',
  logo: './images/logo.webp',
  instagram: 'https://www.instagram.com/terapiaslapalmilla/',
  facebook: 'https://www.facebook.com/Terapias-Naturales-La-Palmilla-1608120932842694/',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=-34.88939215562386,-71.29309503715432',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=-34.88939215562386,-71.29309503715432&t=m&z=14&output=embed&iwloc=near',
};

/** Horario semanal. Índice = Date.getDay() (0 = domingo). */
export const WEEK_SCHEDULE: { day: string; short: string; open: string | null; close: string | null }[] = [
  { day: 'Domingo', short: 'Dom', open: null, close: null },
  { day: 'Lunes', short: 'Lun', open: null, close: null },
  { day: 'Martes', short: 'Mar', open: null, close: null },
  { day: 'Miércoles', short: 'Mié', open: null, close: null },
  { day: 'Jueves', short: 'Jue', open: '15:00', close: '21:00' },
  { day: 'Viernes', short: 'Vie', open: '15:00', close: '21:00' },
  { day: 'Sábado', short: 'Sáb', open: '15:00', close: '21:00' },
];

export const CATEGORIES: { id: 'all' | ServiceCategory; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'tinajas', label: 'Tinajas' },
  { id: 'packs', label: 'Packs y alojamiento' },
  { id: 'masajes', label: 'Masajes' },
  { id: 'energeticas', label: 'Terapias energéticas' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'tinajas-agua-caliente',
    category: 'tinajas',
    name: 'Tinajas de agua caliente',
    subtitle: 'Baño de inmersión en un espacio privado',
    duration: 'Hasta 2 horas',
    minutes: 120,
    badge: '2 a 5 personas',
    description:
      'Baño de inmersión de hasta dos horas en tinaja de agua caliente, con dos hidrojet que brindan una gran relajación muscular a través de la temperatura y movimiento del agua. Todo esto en un espacio privado y en contacto con la naturaleza.',
    highlights: [
      'Espacio privado en contacto con la naturaleza',
      'Equipada con dos hidrojet',
      'Para 2, 3, 4 o 5 personas',
    ],
    image: './images/tinaja-pareja.webp',
    tiers: [
      { label: '2 personas', people: 2, price: 44000 },
      { label: '3 personas', people: 3, price: 66000 },
      { label: '4 personas', people: 4, price: 88000 },
      { label: '5 personas', people: 5, price: 110000 },
    ],
  },
  {
    id: 'pack-masajes-tinaja',
    category: 'packs',
    name: 'Pack masajes y tinaja',
    subtitle: 'Masajes simultáneos de relajación + tinaja al aire libre',
    duration: '45 min de masaje + 2 h de tinaja',
    minutes: 165,
    badge: '2 a 5 personas',
    featured: true,
    description:
      'Masajes simultáneos de relajación de 45 minutos en sala termorregulada con aromaterapia y música de relajación, para luego pasar a la tina de agua caliente, al aire libre entre la vegetación, por 2 horas.',
    highlights: [
      'Masajes simultáneos de relajación (45 min)',
      'Sala termorregulada con aromaterapia y música',
      '2 horas de tinaja al aire libre',
    ],
    image: './images/sala-parejas.webp',
    tiers: [
      { label: '2 personas', people: 2, price: 77500 },
      { label: '3 personas', people: 3, price: 115500 },
      { label: '4 personas', people: 4, price: 148500 },
      { label: '5 personas', people: 5, price: 176000 },
    ],
  },
  {
    id: 'alojamiento-masaje-tina',
    category: 'packs',
    name: 'Alojamiento, masaje y tinaja',
    subtitle: 'Una noche para 2 personas, con desayuno',
    duration: 'Check-in 18:00 · Check-out 12:00',
    minutes: null,
    badge: 'Desayuno incluido',
    description:
      'Ingreso a las 18:00 hrs para ubicarse en el lugar y prepararse para masajes de relajación simultáneos. Luego de los masajes, se regresa a la cabaña para disfrutar de la tinaja exclusiva en la terraza. Desayuno incluido y check-out a las 12:00 hrs del día siguiente.',
    highlights: [
      'Masajes simultáneos + tinaja exclusiva en terraza',
      'Cabaña con A/C, frigobar, horno eléctrico y hervidor',
      'Incluye batas, toallas y desayuno',
    ],
    image: './images/cabana-interior.webp',
    tiers: [{ label: '2 personas', people: 2, price: 140000 }],
  },
  {
    id: 'alojamiento-tina',
    category: 'packs',
    name: 'Alojamiento y tinaja',
    subtitle: 'Una noche para 2 personas, con desayuno',
    duration: 'Check-in 18:00 · Check-out 12:00',
    minutes: null,
    badge: 'Desayuno incluido',
    description:
      'Ingreso a las 18:00 hrs al recinto para luego hacer uso de la tinaja exclusiva en la terraza de la cabaña, contemplando la vegetación y el anochecer. Desayuno incluido y check-out a las 12:00 hrs del día siguiente.',
    highlights: [
      'Tinaja exclusiva en la terraza de la cabaña',
      'Cabaña con A/C, frigobar, horno eléctrico y hervidor',
      'Incluye batas, toallas y desayuno',
    ],
    image: './images/tinaja-terraza.webp',
    tiers: [{ label: '2 personas', people: 2, price: 125000 }],
  },
  {
    id: 'masaje-relajacion',
    category: 'masajes',
    name: 'Masaje de relajación',
    subtitle: 'Cabeza, espalda y extremidades',
    duration: '45 minutos',
    minutes: 45,
    badge: '1 a 3 simultáneos',
    description:
      'Sala termorregulada, aromaterapia, música relajante y luz tenue. Se realizan 45 minutos de suave masaje en cabeza, espalda y extremidades, lo que proporciona una profunda y agradable relajación.',
    highlights: [
      'Hasta 3 masajes simultáneos',
      'Sala termorregulada con aromaterapia y luz tenue',
      '$22.000 por persona',
    ],
    image: './images/masaje-relajacion.webp',
    tiers: [
      { label: '1 persona', people: 1, price: 22000 },
      { label: '2 personas', people: 2, price: 44000 },
      { label: '3 personas', people: 3, price: 66000 },
    ],
  },
  {
    id: 'masaje-descontracturante',
    category: 'masajes',
    name: 'Masaje descontracturante',
    subtitle: 'Mayor presión en zonas contracturadas',
    duration: '45 minutos',
    minutes: 45,
    badge: '1 a 3 simultáneos',
    description:
      'Masaje de mayor presión realizado en zonas contracturadas a nivel muscular, produciendo un efecto terapéutico sobre el dolor. Duración de 45 minutos.',
    highlights: [
      'Hasta 3 masajes simultáneos',
      'Efecto terapéutico de alivio muscular',
      '$24.200 por persona',
    ],
    image: './images/masaje-descontracturante.webp',
    tiers: [
      { label: '1 persona', people: 1, price: 24200 },
      { label: '2 personas', people: 2, price: 48400 },
      { label: '3 personas', people: 3, price: 72600 },
    ],
  },
  {
    id: 'masaje-piedras-calientes',
    category: 'masajes',
    name: 'Masaje con piedras calientes',
    subtitle: 'Calor y presión por ambos lados del cuerpo',
    duration: '1 hora',
    minutes: 60,
    badge: '1 a 3 simultáneos',
    description:
      'Masaje de 1 hora en sala termorregulada, con aromaterapia, música relajante y luz tenue. Se realiza por ambos lados del cuerpo utilizando las piedras de forma estática y en movimiento. Alivia el dolor muscular, disminuye el estrés, elimina toxinas, estimula la circulación sanguínea y mejora la calidad del sueño.',
    highlights: [
      'Sesión de 1 hora en sala termorregulada',
      'Alivia el dolor muscular y mejora el sueño',
      '$32.000 por persona',
    ],
    image: './images/masaje-piedras.webp',
    tiers: [
      { label: '1 persona', people: 1, price: 32000 },
      { label: '2 personas', people: 2, price: 64000 },
      { label: '3 personas', people: 3, price: 96000 },
    ],
  },
  {
    id: 'masaje-medio-cuerpo-facial',
    category: 'masajes',
    name: 'Masaje medio cuerpo y facial',
    subtitle: 'Espalda, brazos, cráneo, cuello y rostro',
    duration: '45 minutos',
    minutes: 45,
    badge: '1 a 3 personas',
    description:
      'Masaje de 45 minutos que comienza con mayor presión en la espalda, luego extremidades superiores y cráneo, para terminar con un suave masaje de cuello y facial.',
    highlights: [
      'En versión relajación o descontracturante',
      'Zona dorsal, craneal, cuello y rostro',
      'Para 3 personas, consulta por WhatsApp',
    ],
    image: './images/masaje-facial.webp',
    tiers: [
      { label: '1 persona · Relajación', people: 1, price: 22000 },
      { label: '1 persona · Descontracturante', people: 1, price: 24200 },
      { label: '2 personas · Relajación', people: 2, price: 44000 },
      { label: '2 personas · Descontracturante', people: 2, price: 48400 },
    ],
  },
  {
    id: 'terapia-gemoterapia-reiki',
    category: 'energeticas',
    name: 'Terapias energéticas',
    subtitle: 'Gemoterapia, reiki y cuencos',
    duration: '45 minutos',
    minutes: 45,
    temporarilyUnavailable: true,
    badge: 'Pausado temporalmente',
    description:
      'Terapia de 45 minutos en la que se utilizan cuarzos o piedras energéticas, reiki (canalización de energía a través de las manos) y el sonido de los cuencos para recuperar el equilibrio físico, emocional y mental. También disponible como alineación de chakras con cuarzos.',
    highlights: [
      'Cuarzos, reiki y vibración de cuencos',
      'Alineación de chakras con cuarzos',
      'Escríbenos para saber cuándo vuelve',
    ],
    image: './images/gemoterapia.webp',
    tiers: [{ label: '1 persona', people: 1, price: 19000 }],
  },
];

export const STAY_AMENITIES = [
  'Aire acondicionado',
  'Frigobar',
  'Horno eléctrico',
  'Hervidor',
  'Batas y toallas',
  'Desayuno incluido',
];

export const GALLERY_IMAGES = [
  { src: './images/tinaja-terraza.webp', caption: 'Tinaja de agua caliente en la terraza' },
  { src: './images/hero.webp', caption: 'Mirador entre los pinos' },
  { src: './images/jardin.webp', caption: 'Áreas verdes y entorno campestre' },
  { src: './images/sala-parejas.webp', caption: 'Sala termorregulada para masajes simultáneos' },
  { src: './images/espacio-descanso.webp', caption: 'Espacios para el descanso y la reflexión' },
  { src: './images/cabana-interior.webp', caption: 'Cabaña equipada con salida a terraza' },
  { src: './images/tinaja-pareja.webp', caption: 'Tinaja rodeada de vegetación' },
  { src: './images/estero.webp', caption: 'Naturaleza en los alrededores de La Palmilla' },
];

export const POLICIES = [
  {
    title: 'Edad mínima y mascotas',
    body: 'Se admiten solamente personas mayores de 15 años. Nuestro recinto no se encuentra habilitado para recibir mascotas.',
  },
  {
    title: 'Alimentos y bebestibles',
    body: 'No se admite el ingreso de bebestibles ni alimentos a ninguno de nuestros servicios, con excepción de las reservas que incluyen alojamiento.',
  },
  {
    title: 'Cancelaciones y reagendamiento',
    body: 'Las cancelaciones deben realizarse a más tardar 24 horas antes de la reserva agendada, con la alternativa de reagendar (permitido una sola vez) o pedir la devolución del dinero. Si el cliente no asiste sin avisar antes de las 24 horas, el abono o pago total será tomado como garantía del centro.',
  },
  {
    title: 'Puntualidad',
    body: 'En caso de retraso, existe un límite máximo de espera de 30 minutos desde la hora de reserva, acortando la duración del servicio requerido.',
  },
  {
    title: 'Gift Cards',
    body: 'Si el servicio es mediante Gift Card, es obligación mostrar el documento electrónico o la tarjeta física al ingresar.',
  },
];

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE_INFO.whatsappRaw}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
