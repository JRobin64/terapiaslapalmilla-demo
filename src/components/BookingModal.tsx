import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Info, X } from 'lucide-react';
import { CATEGORIES, SERVICES, SITE_INFO, whatsappLink, type ServiceItem } from '../data/services';
import { useOverlay } from '../hooks/useScrollLock';
import { getUpcomingDates, nowMinutesInChile, slotsForDate } from '../lib/time';
import { formatClp, trackGAEvent } from '../utils/analytics';
import { WhatsAppIcon } from './ui/BrandIcons';

interface BookingModalProps {
  isOpen: boolean;
  initialService: ServiceItem | null;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4;

const STEP_TITLES: Record<Step, string> = {
  1: '¿Qué te gustaría vivir?',
  2: '¿Cuándo vienes?',
  3: 'Tus datos',
  4: '¡Solicitud lista!',
};

const BOOKABLE = SERVICES.filter((s) => !s.temporarilyUnavailable);
const STORAGE_KEY = 'lp-booking-contact';

function loadContact(): { name: string; phone: string } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* sin almacenamiento disponible */
  }
  return { name: '', phone: '' };
}

function saveContact(name: string, phone: string) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, phone }));
  } catch {
    /* ignorar */
  }
}

export function BookingModal({ isOpen, initialService, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [service, setService] = useState<ServiceItem | null>(null);
  const [pickerOpen, setPickerOpen] = useState(true);
  const [tierIndex, setTierIndex] = useState(0);
  const [dateIso, setDateIso] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  useOverlay(isOpen, onClose);

  const allDates = useMemo(() => (isOpen ? getUpcomingDates(13) : []), [isOpen]);
  const nowMin = useMemo(() => nowMinutesInChile(), [isOpen, step]);
  // Solo fechas en que el servicio elegido todavía tiene horarios disponibles
  const dates = useMemo(
    () =>
      allDates
        .filter((d) => !service || slotsForDate(service.minutes, d, nowMin).length > 0)
        .slice(0, 12),
    [allDates, service, nowMin]
  );

  // Reiniciar al abrir
  useEffect(() => {
    if (!isOpen) return;
    const target = initialService && !initialService.temporarilyUnavailable ? initialService : null;
    const contact = loadContact();
    setService(target);
    setPickerOpen(!target);
    setTierIndex(0);
    setDateIso(null);
    setTime(null);
    setNotes('');
    setName(contact.name);
    setPhone(contact.phone);
    setStep(1);
    trackGAEvent('begin_checkout', {
      item_name: target?.name ?? 'sin_seleccion',
      currency: 'CLP',
      value: target?.tiers[0].price ?? 0,
    });
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  const isStay = service?.minutes === null;
  const tier = service ? service.tiers[tierIndex] ?? service.tiers[0] : null;
  const date = dates.find((d) => d.iso === dateIso) ?? null;
  const slots = service && date ? slotsForDate(service.minutes, date, nowMin) : [];
  const validTime = isStay || (!!time && slots.includes(time));
  const timeLabel = isStay ? '18:00 hrs (check-in)' : time ? `${time} hrs` : '';

  const canNext =
    (step === 1 && !!service && !!tier) ||
    (step === 2 && !!date && validTime) ||
    (step === 3 && !!date && validTime && name.trim().length > 1 && phone.replace(/\D/g, '').length >= 8);

  const selectService = (s: ServiceItem) => {
    if (s.id !== service?.id) {
      setTierIndex(0);
      setDateIso(null);
      setTime(null);
    }
    setService(s);
    setPickerOpen(false);
    trackGAEvent('view_item', { item_name: s.name, currency: 'CLP', value: s.tiers[0].price });
  };

  const message = () =>
    [
      'Hola Terapias La Palmilla! Quisiera reservar:',
      `• Servicio: ${service?.name}`,
      `• Modalidad: ${tier?.label}`,
      `• Fecha: ${date?.long}`,
      `• Hora: ${timeLabel}`,
      `• Valor: ${tier ? formatClp(tier.price) : ''}`,
      `• Nombre: ${name.trim()}`,
      `• Teléfono: ${phone.trim()}`,
      notes.trim() ? `• Comentarios: ${notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

  const next = (e?: FormEvent) => {
    e?.preventDefault();
    if (!canNext) return;
    if (step === 1) setStep(2);
    else if (step === 2) {
      trackGAEvent('select_schedule', { day: date?.iso ?? '', time_slot: timeLabel });
      setStep(3);
    } else if (step === 3) {
      saveContact(name.trim(), phone.trim());
      trackGAEvent('generate_lead', {
        item_name: service?.name ?? '',
        tier: tier?.label ?? '',
        schedule: `${date?.iso} ${timeLabel}`,
        currency: 'CLP',
        value: tier?.price ?? 0,
      });
      trackGAEvent('contact_whatsapp', { source: 'booking_modal', item_name: service?.name ?? '' });
      window.open(whatsappLink(message()), '_blank', 'noopener');
      setStep(4);
    }
  };

  const back = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <div className="absolute inset-0 bg-forest-deep/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <form
        onSubmit={next}
        className="animate-panel relative flex max-h-[94svh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-cream shadow-2xl sm:max-h-[88vh] sm:max-w-xl sm:rounded-[2rem]"
      >
        {/* Encabezado */}
        <div className="shrink-0 px-5 sm:px-7 pt-3 sm:pt-6">
          <span className="mx-auto mb-3 block h-1 w-10 rounded-full bg-line sm:hidden" />
          <div className="flex items-center gap-3">
            {step > 1 && step < 4 ? (
              <button type="button" onClick={back} className="grid h-10 w-10 shrink-0 place-items-center rounded-full ring-1 ring-line text-forest hover:bg-sand transition" aria-label="Volver">
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : null}
            <div className="min-w-0 flex-1">
              {step < 4 && <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bark">Paso {step} de 3</p>}
              <h2 id="booking-title" className="font-display text-[1.9rem] font-semibold leading-tight text-forest">
                {STEP_TITLES[step]}
              </h2>
            </div>
            <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted hover:bg-sand transition" aria-label="Cerrar reserva">
              <X className="w-5 h-5" />
            </button>
          </div>
          {step < 4 && (
            <div className="mt-4 grid grid-cols-3 gap-1.5">
              {[1, 2, 3].map((n) => (
                <span key={n} className="h-1 overflow-hidden rounded-full bg-line">
                  <span className={`block h-full rounded-full bg-forest transition-all duration-500 ${n <= step ? 'w-full' : 'w-0'}`} />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-7 py-6">
          <div key={step} className="animate-step">
            {step === 1 && (
              <div className="space-y-7">
                {/* Servicio seleccionado / selector */}
                {service && !pickerOpen ? (
                  <button
                    type="button"
                    onClick={() => setPickerOpen(true)}
                    className="flex w-full items-center gap-4 rounded-2xl bg-white p-3 pr-4 text-left ring-2 ring-forest"
                  >
                    <img src={service.image} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-forest">{service.name}</span>
                      <span className="block text-xs text-muted">{service.duration}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-bark">
                      Cambiar <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ) : (
                  <div className="space-y-5">
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => {
                      const items = BOOKABLE.filter((s) => s.category === c.id);
                      if (!items.length) return null;
                      return (
                        <div key={c.id}>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-bark">{c.label}</p>
                          <div className="space-y-2">
                            {items.map((s) => {
                              const sel = s.id === service?.id;
                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  onClick={() => selectService(s)}
                                  className={`flex w-full items-center gap-3.5 rounded-2xl bg-white p-2.5 pr-4 text-left transition ring-1 ${
                                    sel ? 'ring-2 ring-forest' : 'ring-line hover:ring-forest/40'
                                  }`}
                                >
                                  <img src={s.image} alt="" loading="lazy" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-semibold text-forest">{s.name}</span>
                                    <span className="block text-xs text-muted">{s.duration}</span>
                                  </span>
                                  <span className="text-right text-xs text-muted">
                                    {s.tiers.length > 1 ? 'desde' : s.tiers[0].label}
                                    <span className="block text-sm font-semibold text-forest tabular-nums">{formatClp(s.tiers[0].price)}</span>
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {service && !pickerOpen && (
                  <div className="animate-step">
                    <p className="mb-3 text-sm font-semibold text-forest">¿Para cuántas personas?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {service.tiers.map((t, i) => {
                        const sel = i === tierIndex;
                        return (
                          <button
                            key={t.label}
                            type="button"
                            onClick={() => setTierIndex(i)}
                            className={`relative rounded-2xl p-3.5 text-left transition ${
                              sel ? 'bg-forest text-cream' : 'bg-white ring-1 ring-line hover:ring-forest/40'
                            }`}
                          >
                            <span className={`block text-[13px] ${sel ? 'text-sage' : 'text-muted'}`}>{t.label}</span>
                            <span className="block text-base font-semibold tabular-nums">{formatClp(t.price)}</span>
                            {sel && <Check className="absolute right-3 top-3 w-4 h-4 text-gold" strokeWidth={3} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 2 && service && (
              <div className="space-y-7">
                <div>
                  <p className="mb-3 text-sm font-semibold text-forest">Elige una fecha</p>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {dates.map((d) => {
                      const sel = d.iso === dateIso;
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          onClick={() => {
                            setDateIso(d.iso);
                            if (time && service && !slotsForDate(service.minutes, d, nowMin).includes(time)) setTime(null);
                          }}
                          className={`flex flex-col items-center rounded-2xl py-2.5 transition ${
                            sel ? 'bg-forest text-cream' : 'bg-white ring-1 ring-line hover:ring-forest/40 text-ink'
                          }`}
                          aria-label={d.long}
                          aria-pressed={sel}
                        >
                          <span className={`text-[11px] font-medium uppercase ${sel ? 'text-gold-soft' : 'text-bark'}`}>{d.weekday}</span>
                          <span className="font-display text-2xl font-semibold leading-tight">{d.dayNum}</span>
                          <span className={`text-[11px] ${sel ? 'text-sage' : 'text-muted'}`}>{d.month}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold text-forest">{isStay ? 'Horario de la estadía' : 'Hora de inicio'}</p>
                  {isStay ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
                        <span className="block text-xs text-muted">Check-in</span>
                        <span className="font-display text-2xl font-semibold text-forest">18:00</span>
                      </div>
                      <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
                        <span className="block text-xs text-muted">Check-out (día siguiente)</span>
                        <span className="font-display text-2xl font-semibold text-forest">12:00</span>
                      </div>
                    </div>
                  ) : !date ? (
                    <p className="rounded-2xl bg-white p-4 text-sm text-muted ring-1 ring-line">Elige primero una fecha para ver los horarios.</p>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {slots.map((t) => {
                        const sel = t === time;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTime(t)}
                            aria-pressed={sel}
                            className={`rounded-xl py-2.5 text-sm font-semibold tabular-nums transition ${
                              sel ? 'bg-forest text-cream' : 'bg-white ring-1 ring-line hover:ring-forest/40 text-ink'
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <p className="flex gap-2.5 rounded-2xl bg-sand p-4 text-xs leading-relaxed text-muted">
                  <Info className="mt-0.5 w-4 h-4 shrink-0 text-bark" />
                  <span>
                    Atendemos {SITE_INFO.schedule.toLowerCase()}. La disponibilidad final te la
                    confirmamos por WhatsApp. Solo mayores de 15 años.
                  </span>
                </p>
              </div>
            )}

            {step === 3 && service && tier && (
              <div className="space-y-5">
                <dl className="divide-y divide-line rounded-2xl bg-white text-sm ring-1 ring-line">
                  {[
                    ['Experiencia', service.name],
                    ['Modalidad', tier.label],
                    ['Fecha', date?.long ?? ''],
                    ['Hora', timeLabel],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 px-4 py-3">
                      <dt className="text-muted">{k}</dt>
                      <dd className="text-right font-medium text-forest first-letter:uppercase">{v}</dd>
                    </div>
                  ))}
                </dl>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-forest">Nombre</span>
                  <input
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre y apellido"
                    className="w-full rounded-xl bg-white px-4 py-3.5 text-[15px] ring-1 ring-line outline-none transition focus:ring-2 focus:ring-forest"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-forest">Teléfono / WhatsApp</span>
                  <input
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+56 9 1234 5678"
                    className="w-full rounded-xl bg-white px-4 py-3.5 text-[15px] ring-1 ring-line outline-none transition focus:ring-2 focus:ring-forest"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-forest">
                    Comentarios <span className="font-normal text-muted">(opcional)</span>
                  </span>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej: es una celebración, tengo una Gift Card…"
                    className="w-full resize-none rounded-xl bg-white px-4 py-3 text-[15px] ring-1 ring-line outline-none transition focus:ring-2 focus:ring-forest"
                  />
                </label>
              </div>
            )}

            {step === 4 && (
              <div className="py-4 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-whatsapp/15 text-whatsapp">
                  <WhatsAppIcon className="w-8 h-8" />
                </span>
                <p className="mx-auto mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
                  Abrimos WhatsApp con tu solicitud. Solo tienes que <strong className="text-forest">enviar el mensaje</strong> y te
                  responderemos con la disponibilidad y los datos para el abono.
                </p>
                <a
                  href={whatsappLink(message())}
                  target="_blank"
                  rel="noreferrer"
                  className="btn mt-6 bg-whatsapp text-white hover:brightness-95"
                >
                  <WhatsAppIcon className="w-4 h-4" /> ¿No se abrió? Toca aquí
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Pie con total y acción */}
        <div className="shrink-0 border-t border-line bg-cream px-5 sm:px-7 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {step < 4 ? (
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="block text-xs text-muted truncate">{tier ? `Total · ${tier.label}` : 'Elige una experiencia'}</span>
                <span className="font-display text-[1.9rem] font-semibold leading-none text-forest tabular-nums">
                  {tier ? formatClp(tier.price) : '—'}
                </span>
              </div>
              <button type="submit" disabled={!canNext} className={`shrink-0 !px-6 !py-3.5 ${step === 3 ? 'btn bg-whatsapp text-white hover:brightness-95' : 'btn-primary'}`}>
                {step === 3 ? (
                  <>
                    <WhatsAppIcon className="w-4 h-4" /> Enviar solicitud
                  </>
                ) : (
                  <>
                    Continuar <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <button type="button" onClick={onClose} className="btn-outline w-full !py-3.5">
              Volver al sitio
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
