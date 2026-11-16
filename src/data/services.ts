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
  description: string;
  highlights: string[];
  image: string;
  tiers: PriceTier[];
  badge?: string;
  temporarilyUnavailable?: boolean;
}

export const SITE_INFO = {
  name: 'Terapias La Palmilla',
  tagline: 'Terapias Naturales La Palmilla',
  location: 'Ruta J-470, N° 1525, Sector La Palmilla, Rauco, Región del Maule',
  distance: 'A 5 km de Rauco',
  phone: '+56 9 9825 2628',
  whatsappRaw: '56998252628',
  email: 'terapia.reservas@gmail.com',
  schedule: 'Jueves, Viernes y Sábados de 15:00 a 21:00 hrs',
  closedDays: 'Lunes, Martes, Miércoles y Domingos cerrado',
  logo: './images/logo.webp',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=-34.88939215562386,-71.29309503715432',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=-34.88939215562386,-71.29309503715432&t=m&z=15&output=embed&iwloc=near',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'tinajas-agua-caliente',
    category: 'tinajas',
    name: 'Tinajas de Agua Caliente',
    subtitle: 'Baño de inmersión en espacio privado',
    duration: 'Hasta 2 horas',
    badge: '2 a 5 personas',
    description:
      'Baño de inmersión de hasta dos horas en tinaja de agua caliente, con dos hidrojet que brindan una gran relajación muscular a través de la temperatura y movimiento del agua. Todo esto en un espacio privado y en contacto con la naturaleza.',
    highlights: [
      'Espacio privado en contacto con la naturaleza',
      'Equipada con dos hidrojet',
      'Disponible para 2, 3, 4 o 5 personas',
    ],
    image: './images/tinaja-pareja.webp',
    tiers: [
      { label: '2 Personas', people: 2, price: 44000 },
      { label: '3 Personas', people: 3, price: 66000 },
      { label: '4 Personas', people: 4, price: 88000 },
      { label: '5 Personas', people: 5, price: 110000 },
    ],
  },
  {
    id: 'pack-masajes-tinaja',
    category: 'packs',
    name: 'Pack Masajes y Tinaja de Agua Caliente',
    subtitle: 'Masajes simultáneos de relajación + tinaja al aire libre',
    duration: '45 min masaje + 2 hrs tinaja',
    badge: '2 a 5 personas',
    description:
      'Masajes simultáneos de Relajación de 45 minutos en sala termorregulada con Aromaterapia y Música de Relajación, para luego pasar a la tina de agua caliente, al aire libre entre la vegetación por 2 horas.',
    highlights: [
      'Masajes simultáneos de relajación (45 min)',
      'Sala termorregulada con aromaterapia y música',
      '2 horas de tina de agua caliente al aire libre',
    ],
    image: './images/sala-parejas.webp',
    tiers: [
      { label: '2 Personas', people: 2, price: 77500 },
      { label: '3 Personas', people: 3, price: 115500 },
      { label: '4 Personas', people: 4, price: 148500 },
      { label: '5 Personas', people: 5, price: 176000 },
    ],
  },
  {
    id: 'alojamiento-masaje-tina',
    category: 'packs',
    name: 'Alojamiento, Masaje y Tina de Agua Caliente',
    subtitle: 'Estadía para 2 personas con desayuno incluido',
    duration: 'Check-in 18:00 · Check-out 12:00',
    badge: '2 personas · Desayuno incluido',
    description:
      'Ingreso a las 18:00 hrs para ubicarse en el lugar y prepararse para masajes de Relajación simultáneos. Luego de los masajes, se regresa a la cabaña para disfrutar de la tinaja exclusiva en terraza. Desayuno incluido y Check out a las 12:00 hrs del día siguiente.',
    highlights: [
      'Cabaña con A/C, frigobar, horno eléctrico y hervidor',
      'Incluye batas, toallas y desayuno',
      'Masajes simultáneos + tinaja exclusiva en terraza',
    ],
    image: './images/cabana-interior.webp',
    tiers: [{ label: '2 Personas', people: 2, price: 140000 }],
  },
  {
    id: 'alojamiento-tina',
    category: 'packs',
    name: 'Alojamiento y Tina de Agua Caliente',
    subtitle: 'Estadía para 2 personas con desayuno incluido',
    duration: 'Check-in 18:00 · Check-out 12:00',
    badge: '2 personas · Desayuno incluido',
    description:
      'Ingreso a las 18:00 hrs al recinto y luego hacer uso de tinaja exclusiva en la terraza de la cabaña, contemplando la vegetación y el anochecer. Desayuno incluido y Check Out a las 12:00 hrs (medio día) del día siguiente.',
    highlights: [
      'Tinaja exclusiva en la terraza de la cabaña',
      'Cabaña con A/C, frigobar, horno eléctrico y hervidor',
      'Incluye batas, toallas y desayuno',
    ],
    image: './images/tinaja-terraza.webp',
    tiers: [{ label: '2 Personas', people: 2, price: 125000 }],
  },
  {
    id: 'masaje-relajacion',
    category: 'masajes',
    name: 'Masajes de Relajación',
    subtitle: 'Cabeza, espalda y extremidades',
    duration: '45 minutos',
    badge: '1, 2 o 3 simultáneos',
    description:
      'Sala Termorregulada, Aromaterapia, Música Relajante y Luz Tenue. Se realizan 45 minutos de suave Masaje en Cabeza, espalda y extremidades, lo que proporciona una profunda y agradable relajación.',
    highlights: [
      'Reserva de 1, 2 o 3 masajes simultáneos',
      'Sala termorregulada con aromaterapia y luz tenue',
      'Valor individual: $22.000 c/u',
    ],
    image: './images/masaje-relajacion.webp',
    tiers: [
      { label: '1 Persona', people: 1, price: 22000 },
      { label: '2 Personas (simultáneos)', people: 2, price: 44000 },
      { label: '3 Personas (simultáneos)', people: 3, price: 66000 },
    ],
  },
  {
    id: 'masaje-descontracturante',
    category: 'masajes',
    name: 'Masaje Descontracturante',
    subtitle: 'Mayor presión en zonas contracturadas',
    duration: '45 minutos',
    badge: '1, 2 o 3 simultáneos',
    description:
      'Masaje de mayor presión realizado en zonas contracturadas a nivel muscular, produciendo un efecto terapéutico del dolor. Duración 45 minutos.',
    highlights: [
      'Reserva de 1, 2 o 3 masajes simultáneos',
      'Efecto terapéutico de alivio muscular',
      'Valor individual: $24.200 c/u',
    ],
    image: './images/masaje-descontracturante.webp',
    tiers: [
      { label: '1 Persona', people: 1, price: 24200 },
      { label: '2 Personas (simultáneos)', people: 2, price: 48400 },
      { label: '3 Personas (simultáneos)', people: 3, price: 72600 },
    ],
  },
  {
    id: 'masaje-piedras-calientes',
    category: 'masajes',
    name: 'Masaje con Piedras Calientes',
    subtitle: 'Calor y presión por ambos lados del cuerpo',
    duration: '1 hora',
    badge: '1, 2 o 3 simultáneos',
    description:
      'Masaje de 1 hora en sala termorregulada, aromaterapia, música relajante y luz tenue. Se realiza por ambos lados del cuerpo utilizando las piedras de forma estática y con movimiento. Alivia el dolor muscular, disminuye estrés, elimina toxinas, estimula la circulación sanguínea y mejora la calidad del sueño.',
    highlights: [
      'Sesión de 1 hora en sala termorregulada',
      'Reserva de 1, 2 o 3 masajes',
      'Valor individual: $32.000 c/u',
    ],
    image: './images/masaje-piedras.webp',
    tiers: [
      { label: '1 Persona', people: 1, price: 32000 },
      { label: '2 Personas (simultáneos)', people: 2, price: 64000 },
      { label: '3 Personas (simultáneos)', people: 3, price: 96000 },
    ],
  },
  {
    id: 'masaje-medio-cuerpo-facial',
    category: 'masajes',
    name: 'Masaje Medio Cuerpo y Facial',
    subtitle: 'Espalda, extremidades superiores, cráneo, cuello y rostro',
    duration: '45 minutos',
    badge: '1, 2 o 3 personas',
    description:
      'Masaje de 45 minutos, donde se comienza con mayor presión en la espalda, luego extremidades superiores y cráneo, para terminar con suave masaje de cuello y Facial.',
    highlights: [
      'Disponible en Relajación ($22.000) o Descontracturante ($24.200)',
      'Incluye zona dorsal, craneal, cuello y facial',
      'Para 1, 2 o 3 personas',
    ],
    image: './images/masaje-facial.webp',
    tiers: [
      { label: '1 Persona · Relajación', people: 1, price: 22000 },
      { label: '1 Persona · Descontracturante', people: 1, price: 24200 },
      { label: '2 Personas · Relajación', people: 2, price: 44000 },
      { label: '2 Personas · Descontracturante', people: 2, price: 48400 },
    ],
  },
  {
    id: 'terapia-gemoterapia-reiki',
    category: 'energeticas',
    name: 'Terapias Energéticas (Gemoterapia, Reiki y Cuencos)',
    subtitle: 'Alineación de Chakras con cuarzos y vibración sonora',
    duration: '45 minutos',
    temporarilyUnavailable: true,
    badge: 'No disponible temporalmente',
    description:
      'Terapia de 45 minutos en la que se utilizan cuarzos o piedras energéticas, reiki (canalización de energía a través de las manos) y el sonido de los cuencos para recuperar el equilibrio físico, emocional y mental. También disponible como Alineación de Chakras con cuarzos.',
    highlights: [
      'Aviso del sitio: este servicio no se encuentra disponible temporalmente',
      'Valor de referencia: $19.000',
      'Consultar reapertura vía WhatsApp',
    ],
    image: './images/gemoterapia.webp',
    tiers: [{ label: '1 Persona (45 min)', people: 1, price: 19000 }],
  },
];

export const GALLERY_IMAGES = [
  { src: './images/hero.webp', caption: 'Entorno natural en Sector La Palmilla, Rauco' },
  { src: './images/tinaja-terraza.webp', caption: 'Tinaja de agua caliente al aire libre' },
  { src: './images/jardin.webp', caption: 'Áreas verdes y entorno campestre del recinto' },
  { src: './images/espacio-descanso.webp', caption: 'Espacios para el descanso y la reflexión' },
  { src: './images/sala-parejas.webp', caption: 'Sala termorregulada para masajes simultáneos' },
  { src: './images/cabana-interior.webp', caption: 'Cabaña equipada con salida a terraza' },
  { src: './images/tinaja-pareja.webp', caption: 'Tinaja exclusiva rodeada de vegetación' },
  { src: './images/estero.webp', caption: 'Naturaleza en los alrededores de La Palmilla' },
];

export const POLICIES = [
  {
    title: 'Edad mínima y mascotas',
    body: 'Se admiten personas solamente mayores de 15 años. Nuestro recinto no se encuentra habilitado para recibir mascotas.',
  },
  {
    title: 'Alimentos y bebestibles',
    body: 'No se admite el ingreso de bebestibles ni alimentos a ninguno de nuestros servicios, con excepción de reservas que incluyan alojamiento.',
  },
  {
    title: 'Cancelaciones y reagendamiento',
    body: 'Las cancelaciones deben realizarse a más tardar 24 horas antes de la reserva agendada, con la alternativa de reagendar (permitido una sola vez) o pedir la devolución del dinero. Si el cliente no asiste sin avisar antes de las 24 horas, dicho abono o pago total será tomado como garantía del centro.',
  },
  {
    title: 'Puntualidad y Gift Cards',
    body: 'En caso de retraso de parte del cliente, existe un límite máximo de espera de 30 minutos desde la hora de reserva, acortando la duración del servicio requerido. Si el servicio es mediante Gift Card, es obligación mostrar su documento electrónico o tarjeta física al ingresar.',
  },
];
