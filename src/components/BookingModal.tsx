import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { SERVICES, ServiceItem, SITE_INFO } from '../data/services';
import { formatClp, trackGAEvent } from '../utils/analytics';

interface BookingModalProps {
  isOpen: boolean;
  initialService: ServiceItem | null;
  onClose: () => void;
}

const AVAILABLE_DAYS = ['Jueves', 'Viernes', 'Sábado'];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  initialService,
  onClose,
}) => {
  const bookableServices = SERVICES.filter((s) => !s.temporarilyUnavailable);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem>(
    initialService && !initialService.temporarilyUnavailable
      ? initialService
      : bookableServices[0]
  );
  const [tierIndex, setTierIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState('Sábado');
  const [preferredTime, setPreferredTime] = useState('17:00');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isOpen) {
      const target =
        initialService && !initialService.temporarilyUnavailable
          ? initialService
          : bookableServices[0];
      setSelectedService(target);
      setTierIndex(0);
      setStep(1);
      trackGAEvent('begin_checkout', {
        item_name: target.name,
        currency: 'CLP',
        value: target.tiers[0].price,
      });
    }
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  const isCabin = selectedService.id.startsWith('alojamiento');
  const activeTier = selectedService.tiers[tierIndex] || selectedService.tiers[0];
  const totalClp = activeTier.price;

  const handleGoToStep3 = () => {
    trackGAEvent('select_schedule', {
      day: selectedDay,
      time_slot: isCabin ? '18:00 hrs' : `${preferredTime} hrs`,
    });
    setStep(3);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const timeLabel = isCabin ? '18:00 hrs (Check-in)' : `${preferredTime} hrs`;
    trackGAEvent('generate_lead', {
      item_name: selectedService.name,
      tier: activeTier.label,
      schedule: `${selectedDay} ${timeLabel}`,
      currency: 'CLP',
      value: totalClp,
    });
    setStep(4);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Terapias La Palmilla! Quisiera consultar disponibilidad y reservar:\n` +
      `• Servicio: ${selectedService.name}\n` +
      `• Modalidad: ${activeTier.label}\n` +
      `• Día y hora preferida: ${selectedDay} a las ${
        isCabin ? '18:00 hrs (Check-in)' : `${preferredTime} hrs`
      }\n` +
      `• Valor de referencia: ${formatClp(totalClp)}\n` +
      `• Nombre: ${guestName || 'Por confirmar'}\n` +
      `• Teléfono: ${guestPhone || 'Por confirmar'}` +
      (notes ? `\n• Notas: ${notes}` : '')
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14221B]/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#F7F4EE] text-[#1C2822] shadow-2xl border border-[#DED8CC]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E4DEC9] bg-[#F7F4EE]/95 backdrop-blur-md px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#7D6E5D]">
              Solicitud de Reserva · Rauco
            </p>
            <h3 className="font-display text-2xl font-semibold text-[#1E352B]">
              Selecciona tu servicio
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar reserva"
            className="rounded-full p-2 text-[#5B665F] hover:bg-[#EAE4D7] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step < 4 && (
          <div className="flex items-center gap-2 px-6 pt-4 text-xs font-medium text-[#6B756E]">
            <span className={step === 1 ? 'text-[#1E352B] font-semibold' : ''}>
              1. Servicio
            </span>
            <span>/</span>
            <span className={step === 2 ? 'text-[#1E352B] font-semibold' : ''}>
              2. Día y Horario
            </span>
            <span>/</span>
            <span className={step === 3 ? 'text-[#1E352B] font-semibold' : ''}>
              3. Datos y WhatsApp
            </span>
          </div>
        )}

        <div className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5B665F] mb-2">
                  Servicio
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {bookableServices.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => {
                        setSelectedService(srv);
                        setTierIndex(0);
                      }}
                      className={`text-left p-3.5 rounded-2xl border transition ${
                        selectedService.id === srv.id
                          ? 'border-[#1E352B] bg-[#1E352B] text-[#F7F4EE]'
                          : 'border-[#DED8CC] bg-white hover:border-[#9CA89F]'
                      }`}
                    >
                      <div className="text-sm font-semibold">{srv.name}</div>
                      <div
                        className={`text-xs mt-0.5 ${
                          selectedService.id === srv.id ? 'text-[#D3DDD6]' : 'text-[#6B756E]'
                        }`}
                      >
                        Desde {formatClp(srv.tiers[0].price)} · {srv.duration}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5B665F] mb-2">
                  <Users className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
                  Cantidad de personas / modalidad
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedService.tiers.map((tier, idx) => (
                    <button
                      key={tier.label}
                      type="button"
                      onClick={() => setTierIndex(idx)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition ${
                        tierIndex === idx
                          ? 'border-[#B87A56] bg-[#B87A56] text-white'
                          : 'border-[#DED8CC] bg-white text-[#1C2822] hover:border-[#B87A56]'
                      }`}
                    >
                      {tier.label} — {formatClp(tier.price)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E4DEC9]">
                <div>
                  <span className="text-xs text-[#6B756E] block">Valor del servicio</span>
                  <span className="font-display text-3xl font-semibold text-[#1E352B]">
                    {formatClp(totalClp)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1E352B] px-6 py-3 text-sm font-semibold text-[#F7F4EE] hover:bg-[#2B4B3D] transition"
                >
                  Elegir día <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-[#EAE4D7]/60 p-4 text-xs text-[#4C5851]">
                Horario de atención habitual: <strong>{SITE_INFO.schedule}</strong> ({SITE_INFO.closedDays}).
                Se admiten únicamente personas mayores de 15 años.
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5B665F] mb-2">
                  <Calendar className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
                  Día preferido
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {AVAILABLE_DAYS.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={`py-3 rounded-xl border text-sm font-semibold transition ${
                        selectedDay === day
                          ? 'border-[#1E352B] bg-[#1E352B] text-white'
                          : 'border-[#DED8CC] bg-white hover:border-[#1E352B]'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5B665F] mb-2">
                  <Clock className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
                  Horario
                </label>
                {isCabin ? (
                  <div className="p-4 rounded-xl border border-[#1E352B] bg-[#EDF2EE] text-sm font-medium text-[#1E352B]">
                    Ingreso (Check-in): <strong>18:00 hrs</strong> · Check-out día siguiente:{' '}
                    <strong>12:00 hrs</strong> (desayuno incluido)
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="time"
                      min="15:00"
                      max="20:00"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full sm:w-48 rounded-xl border border-[#DED8CC] bg-white px-4 py-2.5 text-sm font-semibold text-[#1E352B] focus:border-[#1E352B] focus:outline-none"
                    />
                    <p className="text-xs text-[#6B756E]">
                      Indica tu hora de llegada estimada (atención entre 15:00 y 21:00 hrs;
                      sujeto a confirmación vía WhatsApp).
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E4DEC9]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5B665F] hover:text-[#1C2822]"
                >
                  <ArrowLeft className="w-4 h-4" /> Volver
                </button>
                <button
                  type="button"
                  onClick={handleGoToStep3}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1E352B] px-6 py-3 text-sm font-semibold text-[#F7F4EE] hover:bg-[#2B4B3D] transition"
                >
                  Continuar <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleConfirm} className="space-y-4">
              <div className="rounded-2xl bg-white border border-[#DED8CC] p-4 space-y-1.5">
                <div className="text-xs uppercase tracking-wider text-[#7D6E5D]">Resumen</div>
                <div className="font-semibold text-[#1E352B]">
                  {selectedService.name} — {activeTier.label}
                </div>
                <div className="text-sm text-[#4C5851]">
                  {selectedDay} · {isCabin ? '18:00 hrs (Check-in)' : `${preferredTime} hrs`}
                </div>
                <div className="text-lg font-bold text-[#B87A56] pt-1">
                  Valor: {formatClp(totalClp)}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#5B665F] mb-1">
                    Nombre completo *
                  </label>
                  <input
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Ej. Camila Rojas"
                    className="w-full rounded-xl border border-[#DED8CC] bg-white px-3.5 py-2.5 text-sm focus:border-[#1E352B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5B665F] mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+56 9 ..."
                    className="w-full rounded-xl border border-[#DED8CC] bg-white px-3.5 py-2.5 text-sm focus:border-[#1E352B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5B665F] mb-1">
                  Comentarios (opcional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Consultas adicionales..."
                  className="w-full rounded-xl border border-[#DED8CC] bg-white px-3.5 py-2 text-sm focus:border-[#1E352B] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E4DEC9]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5B665F] hover:text-[#1C2822]"
                >
                  <ArrowLeft className="w-4 h-4" /> Volver
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1E352B] px-6 py-3 text-sm font-semibold text-[#F7F4EE] hover:bg-[#2B4B3D] transition"
                >
                  Preparar WhatsApp <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto w-14 h-14 rounded-full bg-[#1E352B]/10 flex items-center justify-center text-[#1E352B]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-3xl font-semibold text-[#1E352B]">
                Resumen listo para enviar
              </h4>
              <p className="text-sm text-[#4C5851] max-w-md mx-auto">
                Para confirmar disponibilidad real y coordinar el abono o reserva, envía este
                mensaje directo al WhatsApp oficial de Terapias La Palmilla.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${SITE_INFO.whatsappRaw}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackGAEvent('contact_whatsapp', {
                      source: 'booking_modal',
                      item_name: selectedService.name,
                    });
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:brightness-95 transition"
                >
                  <MessageCircle className="w-4 h-4" /> Enviar por WhatsApp
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-[#DED8CC] bg-white px-6 py-3 text-sm font-medium text-[#1C2822] hover:bg-[#EAE4D7] transition"
                >
                  Volver al sitio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
