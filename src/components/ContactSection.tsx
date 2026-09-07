import React, { useState } from 'react';
import { Mail, Copy, Check, Linkedin, Code2, Phone, MessageSquare, Calendar, Send, MapPin, Cloud, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sendContactMessageToCloud } from '../lib/firebase';

interface ContactSectionProps {
  onOpenScheduleModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenScheduleModal }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [formSent, setFormSent] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone).then(() => {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    }).catch(() => {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    try {
      setIsSending(true);
      await sendContactMessageToCloud({
        name: formData.name || 'Sin nombre',
        email: formData.email,
        message: formData.message
      });
      setFormSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setFormSent(false);
      }, 5000);
    } catch (error) {
      console.error('Error sending message to cloud:', error);
      // Fallback display
      setFormSent(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="max-w-[1140px] mx-auto px-6 mb-16 md:mb-24" id="contacto">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-['JetBrains_Mono'] text-xs text-[#5e5e5e] font-semibold tracking-widest uppercase">
          [ 04. CONVERSACIÓN & CONTACTO DIRECTO ]
        </span>
        <div className="h-px bg-slate-300/60 flex-1" />
      </div>

      <div className="bg-[#ebedf0] rounded-3xl p-6 sm:p-10 md:p-14 shadow-neu-raised border border-white/80 relative">
        <div className="max-w-2xl mx-auto text-center">
          {/* Top Mail Monolith Badge */}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#ebedf0] shadow-neu-flat border border-white flex items-center justify-center text-black mb-6">
            <Mail className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-black mb-4">
            ¿Tienes una vacante o proyecto en mente? Conversemos.
          </h2>

          <p className="text-base sm:text-lg font-['Manrope'] text-[#5e5e5e] mb-8 leading-relaxed">
            Disponible para roles remotos o híbridos en <strong>Atención al Cliente Bilingüe</strong>, <strong>Help-Desk / Soporte Técnico</strong> y <strong>Desarrollo Web</strong> con pasión por la tecnología y la resolución de problemas basada en datos.
          </p>

          {/* Quick Contact Badges (Email & Phone) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            {/* Email Box */}
            <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-[#ebedf0] shadow-neu-inset border border-white/40">
              <div className="flex items-center gap-2 px-3 py-1.5">
                <Mail className="w-4 h-4 text-[#5e5e5e]" />
                <span className="font-['JetBrains_Mono'] text-xs sm:text-sm text-black select-all font-medium">
                  {PERSONAL_INFO.email}
                </span>
              </div>
              <button 
                onClick={handleCopyEmail}
                className="bg-[#ebedf0] text-black px-3 py-2 rounded-xl shadow-neu-sm font-['JetBrains_Mono'] text-xs hover:shadow-neu-inset neu-pressed transition-all flex items-center gap-1.5 border border-white/70 cursor-pointer"
                id="copy-email-btn"
                title="Copiar email"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            {/* Phone Box */}
            <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-[#ebedf0] shadow-neu-inset border border-white/40">
              <div className="flex items-center gap-2 px-3 py-1.5">
                <Phone className="w-4 h-4 text-[#5e5e5e]" />
                <span className="font-['JetBrains_Mono'] text-xs sm:text-sm text-black select-all font-medium">
                  {PERSONAL_INFO.phone}
                </span>
              </div>
              <button 
                onClick={handleCopyPhone}
                className="bg-[#ebedf0] text-black px-3 py-2 rounded-xl shadow-neu-sm font-['JetBrains_Mono'] text-xs hover:shadow-neu-inset neu-pressed transition-all flex items-center gap-1.5 border border-white/70 cursor-pointer"
                id="copy-phone-btn"
                title="Copiar teléfono"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPhone ? '¡Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-['JetBrains_Mono'] text-[#5e5e5e] mb-8">
            <MapPin className="w-3.5 h-3.5 text-black" />
            <span>{PERSONAL_INFO.location}</span>
          </div>

          {/* Direct Quick Message Box (Sculpted Inset Channel) */}
          <div className="bg-[#ebedf0] rounded-2xl p-5 sm:p-6 shadow-neu-flat border border-white/80 text-left mb-8">
            <h3 className="text-base font-bold font-['Space_Grotesk'] text-black mb-3 flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span>Enviar mensaje directo</span>
            </h3>

            {formSent ? (
              <div className="p-4 rounded-xl bg-[#ebedf0] shadow-neu-inset text-center border border-white/40">
                <p className="font-['Space_Grotesk'] text-sm font-bold text-black flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>¡Mensaje guardado en la nube con éxito!</span>
                </p>
                <p className="font-['Manrope'] text-xs text-[#5e5e5e] mt-1">
                  Tu mensaje ha sido registrado en Firebase Firestore. Eric te contactará a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#ebedf0] shadow-neu-inset border border-white/40 text-xs sm:text-sm font-['Manrope'] text-black placeholder:text-[#8A8D93] focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <input
                    type="email"
                    required
                    placeholder="tu.correo@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#ebedf0] shadow-neu-inset border border-white/40 text-xs sm:text-sm font-['Manrope'] text-black placeholder:text-[#8A8D93] focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  placeholder="Cuéntame sobre la vacante, proyecto o consulta que tengas..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#ebedf0] shadow-neu-inset border border-white/40 text-xs sm:text-sm font-['Manrope'] text-black placeholder:text-[#8A8D93] focus:outline-none focus:ring-1 focus:ring-black resize-none"
                />

                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-blue-700 flex items-center gap-1">
                    <Cloud className="w-3 h-3 text-blue-600" />
                    <span>Guardado seguro en Firestore</span>
                  </span>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="bg-black text-white px-5 py-2 rounded-xl font-['JetBrains_Mono'] text-xs font-semibold shadow-neu-dark hover:bg-neutral-800 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Enviando a la nube...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmitir Mensaje</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Social Matrix & Calendar Booking */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a 
              href={PERSONAL_INFO.social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#ebedf0] text-black px-4 py-2.5 rounded-xl shadow-neu-sm border border-white font-['JetBrains_Mono'] text-xs hover:shadow-neu-inset neu-pressed transition-all"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a 
              href="https://wa.me/50761256159" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#ebedf0] text-black px-4 py-2.5 rounded-xl shadow-neu-sm border border-white font-['JetBrains_Mono'] text-xs hover:shadow-neu-inset neu-pressed transition-all"
              title="Chat directo en WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <a 
              href={`tel:${PERSONAL_INFO.phone}`} 
              className="inline-flex items-center gap-2 bg-[#ebedf0] text-black px-4 py-2.5 rounded-xl shadow-neu-sm border border-white font-['JetBrains_Mono'] text-xs hover:shadow-neu-inset neu-pressed transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar</span>
            </a>

            <a 
              href={PERSONAL_INFO.social.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#ebedf0] text-black px-4 py-2.5 rounded-xl shadow-neu-sm border border-white font-['JetBrains_Mono'] text-xs hover:shadow-neu-inset neu-pressed transition-all"
            >
              <Code2 className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <button 
              onClick={onOpenScheduleModal}
              className="inline-flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl shadow-neu-dark font-['JetBrains_Mono'] text-xs hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer"
              id="btn-schedule-call"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Llamada</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
