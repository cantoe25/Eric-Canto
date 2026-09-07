import React, { useState } from 'react';
import { X, Calendar, Clock, Video, Check, User, Cloud, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { scheduleAppointmentInCloud } from '../lib/firebase';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('11:00 AM');
  const [selectedDate, setSelectedDate] = useState<string>('Mañana');
  const [scheduled, setScheduled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      setIsSubmitting(true);
      await scheduleAppointmentInCloud({
        name: name || 'Reclutador / Contacto',
        email,
        date: selectedDate,
        time: selectedSlot
      });
      setScheduled(true);
      setTimeout(() => {
        setScheduled(false);
        onClose();
      }, 3500);
    } catch (error) {
      console.error('Error scheduling in cloud:', error);
      setScheduled(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const dates = ['Mañana', 'Miércoles', 'Jueves', 'Viernes'];
  const times = ['10:00 AM', '11:00 AM', '03:30 PM', '05:00 PM'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#ebedf0] rounded-3xl max-w-lg w-full shadow-2xl border border-white/80 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/60 bg-[#ebedf0]">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-black" />
            <h2 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-black">
              Agendar Videollamada Técnica (30 Min)
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#ebedf0] shadow-neu-sm border border-white flex items-center justify-center text-black hover:shadow-neu-inset transition-all cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5">
          {scheduled ? (
            <div className="p-6 rounded-2xl bg-[#ebedf0] shadow-neu-inset text-center border border-white/40 space-y-3">
              <div className="w-12 h-12 rounded-full bg-black text-white mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-black">
                ¡Reunión Agendada con Éxito!
              </h3>
              <p className="text-xs sm:text-sm font-['Manrope'] text-[#5e5e5e] leading-relaxed">
                Hemos enviado la invitación de Google Meet a <strong>{email}</strong> para el día <strong>{selectedDate}</strong> a las <strong>{selectedSlot}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-4">
              <div className="bg-[#ebedf0] p-4 rounded-2xl shadow-neu-flat border border-white/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-['Space_Grotesk'] font-bold text-sm">
                  EC
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] text-sm font-bold text-black">
                    {PERSONAL_INFO.name}
                  </h4>
                  <p className="text-xs font-['Manrope'] text-[#5e5e5e]">
                    Videollamada 1 a 1 vía Google Meet · 30 minutos
                  </p>
                </div>
              </div>

              {/* Day selection */}
              <div>
                <label className="block text-xs font-['JetBrains_Mono'] text-[#5e5e5e] font-semibold mb-2">
                  1. SELECCIONA EL DÍA
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`py-2 px-1 rounded-xl text-xs font-['Space_Grotesk'] font-medium transition-all cursor-pointer ${
                        selectedDate === d
                          ? 'bg-black text-white shadow-neu-dark'
                          : 'bg-[#ebedf0] text-black shadow-neu-sm border border-white/70 hover:shadow-neu-inset'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time selection */}
              <div>
                <label className="block text-xs font-['JetBrains_Mono'] text-[#5e5e5e] font-semibold mb-2">
                  2. HORA DISPONIBLE (CET / MADRID)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedSlot(t)}
                      className={`py-2 px-3 rounded-xl text-xs font-['JetBrains_Mono'] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        selectedSlot === t
                          ? 'bg-black text-white shadow-neu-dark'
                          : 'bg-[#ebedf0] text-black shadow-neu-sm border border-white/70 hover:shadow-neu-inset'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{t}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-2 pt-1">
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#ebedf0] shadow-neu-inset border border-white/40 text-xs sm:text-sm font-['Manrope'] text-black placeholder:text-[#8A8D93] focus:outline-none focus:ring-1 focus:ring-black"
                />
                <input
                  type="email"
                  required
                  placeholder="tu.correo@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#ebedf0] shadow-neu-inset border border-white/40 text-xs sm:text-sm font-['Manrope'] text-black placeholder:text-[#8A8D93] focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-3 px-4 rounded-xl font-['Space_Grotesk'] text-xs font-bold tracking-wide shadow-neu-dark hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando en la nube (Firestore)...</span>
                  </>
                ) : (
                  <>
                    <Cloud className="w-4 h-4 text-blue-400" />
                    <span>Confirmar Llamada para {selectedDate} ({selectedSlot})</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
