import { WEEK_SCHEDULE } from '../data/services';

const TZ = 'America/Santiago';

/** Fecha/hora actual en Chile (día de la semana y minutos desde medianoche). */
function nowInChile() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const dayIdx = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return {
    day: dayIdx,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
    // Mediodía de la fecha actual en Chile, como Date local (evita desfases de zona horaria)
    date: new Date(Number(get('year')), Number(get('month')) - 1, Number(get('day')), 12),
  };
}

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export const fromMinutes = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;

export interface OpenStatus {
  isOpen: boolean;
  today: number;
  label: string;
}

export function getOpenStatus(): OpenStatus {
  const { day, minutes } = nowInChile();
  const today = WEEK_SCHEDULE[day];
  if (today.open && today.close) {
    const o = toMinutes(today.open);
    const c = toMinutes(today.close);
    if (minutes >= o && minutes < c) {
      return { isOpen: true, today: day, label: `Abierto ahora · hasta las ${today.close}` };
    }
    if (minutes < o) {
      return { isOpen: false, today: day, label: `Hoy abrimos a las ${today.open}` };
    }
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const s = WEEK_SCHEDULE[d];
    if (s.open) {
      const when = i === 1 ? 'mañana' : `el ${s.day.toLowerCase()}`;
      return { isOpen: false, today: day, label: `Cerrado · abrimos ${when} a las ${s.open}` };
    }
  }
  return { isOpen: false, today: day, label: 'Cerrado' };
}

/** Minutos transcurridos desde medianoche en Chile. */
export function nowMinutesInChile(): number {
  return nowInChile().minutes;
}

export interface BookableDate {
  iso: string;
  isToday: boolean;
  weekday: string;
  dayNum: number;
  month: string;
  long: string;
}

/** Próximas fechas en que el centro atiende (jueves, viernes y sábado), incluido hoy si corresponde.
 *  Si quedan horas disponibles hoy lo decide quien llama, según el servicio (ver BookingModal). */
export function getUpcomingDates(count = 12): BookableDate[] {
  const { day, minutes, date: base } = nowInChile();
  const out: BookableDate[] = [];
  const monthFmt = new Intl.DateTimeFormat('es-CL', { month: 'short' });
  const longFmt = new Intl.DateTimeFormat('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });

  for (let i = 0; out.length < count && i < 60; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const wd = (day + i) % 7;
    const s = WEEK_SCHEDULE[wd];
    if (!s.open || !s.close) continue;
    if (i === 0 && minutes >= toMinutes(s.close)) continue;
    out.push({
      iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      isToday: i === 0,
      weekday: i === 0 ? 'Hoy' : s.short,
      dayNum: d.getDate(),
      month: monthFmt.format(d).replace('.', ''),
      long: longFmt.format(d),
    });
  }
  return out;
}

/** Horarios de inicio cada 30 min, que permitan terminar antes del cierre. */
export function getTimeSlots(
  durationMin: number,
  open = '15:00',
  close = '21:00',
  earliest = 0
): string[] {
  const slots: string[] = [];
  const last = toMinutes(close) - durationMin;
  for (let m = toMinutes(open); m <= last; m += 30) if (m >= earliest) slots.push(fromMinutes(m));
  return slots;
}

/** Anticipación mínima (min) para reservar algo que empieza hoy. */
export const SAME_DAY_NOTICE = 30;
/** Hora de check-in del alojamiento. */
export const CHECK_IN = '18:00';

/** Horarios disponibles para un servicio en una fecha (vacío si ese día ya no se puede reservar). */
export function slotsForDate(minutesNeeded: number | null, date: BookableDate, nowMin: number): string[] {
  const earliest = date.isToday ? nowMin + SAME_DAY_NOTICE : 0;
  if (minutesNeeded === null) return toMinutes(CHECK_IN) >= earliest ? [CHECK_IN] : [];
  return getTimeSlots(minutesNeeded, '15:00', '21:00', earliest);
}
