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

export interface BookableDate {
  iso: string;
  weekday: string;
  dayNum: number;
  month: string;
  long: string;
}

/** Próximas fechas en que el centro atiende (jueves, viernes y sábado). */
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
    // Hoy solo si aún queda tiempo razonable antes del cierre
    if (i === 0 && minutes > toMinutes(s.close) - 90) continue;
    out.push({
      iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      weekday: i === 0 ? 'Hoy' : s.short,
      dayNum: d.getDate(),
      month: monthFmt.format(d).replace('.', ''),
      long: longFmt.format(d),
    });
  }
  return out;
}

/** Horarios de inicio cada 30 min, que permitan terminar antes del cierre. */
export function getTimeSlots(durationMin: number, open = '15:00', close = '21:00'): string[] {
  const slots: string[] = [];
  const last = toMinutes(close) - durationMin;
  for (let m = toMinutes(open); m <= last; m += 30) slots.push(fromMinutes(m));
  return slots;
}
