import React from 'react';
import { X, ArrowDown, ExternalLink, FileText, Globe, Code2, Eye, UserCheck } from 'lucide-react';

interface RecruiterFunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCvModal: () => void;
}

export const RecruiterFunnelModal: React.FC<RecruiterFunnelModalProps> = ({
  isOpen,
  onClose,
  onOpenCvModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#ebedf0] rounded-3xl max-w-4xl w-full shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/60 bg-[#ebedf0]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
            <h2 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-black tracking-wide">
              DIAGRAMA DE ARQUITECTURA // FUNNEL DE RECLUTAMIENTO
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

        {/* Diagram Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
          <p className="text-sm font-['Manrope'] text-[#5e5e5e] leading-relaxed max-w-2xl mx-auto text-center">
            Este diagrama ilustra la estructura estratégica de dos pantallas conectadas: el <strong>CV formal (documento)</strong> para el filtrado inicial del reclutador, y el <strong>Portafolio web táctil</strong> para validar la maestría técnica y el código.
          </p>

          {/* Funnel Flowchart Canvas matching Image 1.png */}
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            {/* Step 1: Reclutador */}
            <div className="w-48 bg-[#f5f3ef] border border-amber-200/80 rounded-2xl py-3 px-4 text-center shadow-neu-sm">
              <div className="flex items-center justify-center gap-1.5 font-['Space_Grotesk'] font-bold text-neutral-800 text-sm">
                <UserCheck className="w-4 h-4 text-neutral-700" />
                <span>Reclutador</span>
              </div>
            </div>

            {/* Down arrow */}
            <div className="my-2 text-neutral-500">
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>

            {/* Step 2: CV (documento) */}
            <div className="w-full bg-[#edf4fb] border border-blue-200/80 rounded-3xl p-5 sm:p-6 shadow-neu-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-700" />
                  <span className="font-['Space_Grotesk'] font-bold text-blue-950 text-base">
                    CV (documento)
                  </span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenCvModal();
                  }}
                  className="text-xs font-['JetBrains_Mono'] bg-white px-3 py-1 rounded-lg text-blue-800 font-semibold border border-blue-200 shadow-sm hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  Abrir vista CV
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-xl p-3 text-center border border-blue-100 shadow-sm">
                  <span className="font-['Space_Grotesk'] font-bold text-sm text-blue-900 block mb-1">
                    Encabezado
                  </span>
                  <span className="text-xs text-blue-600 font-['Manrope']">
                    Contacto y link
                  </span>
                </div>

                <div className="bg-white rounded-xl p-3 text-center border border-blue-100 shadow-sm">
                  <span className="font-['Space_Grotesk'] font-bold text-sm text-blue-900 block mb-1">
                    Perfil y skills
                  </span>
                  <span className="text-xs text-blue-600 font-['Manrope']">
                    Resumen y stack
                  </span>
                </div>

                <div className="bg-white rounded-xl p-3 text-center border border-blue-100 shadow-sm">
                  <span className="font-['Space_Grotesk'] font-bold text-sm text-blue-900 block mb-1">
                    Experiencia
                  </span>
                  <span className="text-xs text-blue-600 font-['Manrope']">
                    Historial y educación
                  </span>
                </div>
              </div>
            </div>

            {/* Down arrow */}
            <div className="my-2 text-neutral-500">
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>

            {/* Step 3: Portafolio web (tu link) */}
            <div className="w-full bg-[#eef7f2] border border-emerald-200/80 rounded-3xl p-5 sm:p-6 shadow-neu-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-800" />
                  <span className="font-['Space_Grotesk'] font-bold text-emerald-950 text-base">
                    Portafolio web (tu link)
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-xs font-['JetBrains_Mono'] bg-white px-3 py-1 rounded-lg text-emerald-800 font-semibold border border-emerald-200 shadow-sm hover:bg-emerald-50 transition-colors cursor-pointer"
                >
                  Ver en pantalla
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-xl p-3 text-center border border-emerald-100 shadow-sm">
                  <span className="font-['Space_Grotesk'] font-bold text-sm text-emerald-900 block mb-1">
                    Hero
                  </span>
                  <span className="text-xs text-emerald-600 font-['Manrope']">
                    Nombre y rol
                  </span>
                </div>

                <div className="bg-white rounded-xl p-3 text-center border-2 border-emerald-500 shadow-sm relative">
                  <span className="font-['Space_Grotesk'] font-bold text-sm text-emerald-950 block mb-1">
                    Proyectos
                  </span>
                  <span className="text-xs text-emerald-700 font-['Manrope'] font-medium">
                    Tarjetas con botones
                  </span>
                </div>

                <div className="bg-white rounded-xl p-3 text-center border border-emerald-100 shadow-sm">
                  <span className="font-['Space_Grotesk'] font-bold text-sm text-emerald-900 block mb-1">
                    Contacto
                  </span>
                  <span className="text-xs text-emerald-600 font-['Manrope']">
                    Redes y email
                  </span>
                </div>
              </div>
            </div>

            {/* Split arrows to Project Actions */}
            <div className="w-full flex justify-around px-8 my-2 text-neutral-500">
              <ArrowDown className="w-5 h-5 -rotate-12" />
              <ArrowDown className="w-5 h-5 rotate-12" />
            </div>

            {/* Step 4: Proyectos Dual Action Buttons */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#f5f3ef] border border-stone-300 rounded-2xl py-3 px-4 text-center shadow-neu-sm flex items-center justify-center gap-2">
                <Eye className="w-4 h-4 text-stone-700" />
                <span className="font-['Space_Grotesk'] font-bold text-stone-900 text-sm">
                  Ver proyecto
                </span>
              </div>

              <div className="bg-[#f5f3ef] border border-stone-300 rounded-2xl py-3 px-4 text-center shadow-neu-sm flex items-center justify-center gap-2">
                <Code2 className="w-4 h-4 text-stone-700" />
                <span className="font-['Space_Grotesk'] font-bold text-stone-900 text-sm">
                  Código (repo)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
