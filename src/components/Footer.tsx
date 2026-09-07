import React, { useState } from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#ebedf0] shadow-[inset_3px_3px_6px_rgba(175,181,193,0.35),inset_-3px_-3px_6px_rgba(255,255,255,0.95)] border-t border-white/50 no-print">
      <div className="max-w-[1140px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <a 
            href="#inicio" 
            className="text-base font-bold font-['Space_Grotesk'] text-black tracking-wider"
          >
            PORTFOLIO // CV
          </a>
          <p className="text-xs font-['Manrope'] text-[#5e5e5e]">
            © {new Date().getFullYear()} Eric Fernando Canto Caballero · Todos los derechos reservados.
          </p>
        </div>

        {/* Navigation Secondary Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-['JetBrains_Mono'] text-xs">
          <a href="#inicio" className="text-[#5e5e5e] hover:text-black transition-colors">
            Inicio
          </a>
          <a href="#perfil" className="text-[#5e5e5e] hover:text-black transition-colors">
            Perfil
          </a>
          <a href="#experiencia" className="text-[#5e5e5e] hover:text-black transition-colors">
            Experiencia
          </a>
          <a href="#proyectos" className="text-[#5e5e5e] hover:text-black transition-colors">
            Proyectos
          </a>
          <a href="#contacto" className="text-black font-semibold">
            Contacto
          </a>
          <button 
            onClick={() => setShowPrivacy(!showPrivacy)}
            className="text-[#5e5e5e] hover:text-black transition-colors cursor-pointer"
          >
            Privacidad
          </button>
        </div>

        {/* Back to Top Button */}
        <button 
          onClick={scrollToTop}
          aria-label="Volver al inicio" 
          className="w-10 h-10 rounded-xl bg-[#ebedf0] shadow-neu-sm border border-white/80 flex items-center justify-center text-black hover:shadow-neu-inset neu-pressed transition-all cursor-pointer"
          id="back-to-top-btn"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {showPrivacy && (
        <div className="max-w-[1140px] mx-auto px-6 pb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ebedf0] shadow-neu-inset border border-white/40 text-xs font-['JetBrains_Mono'] text-[#5e5e5e]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Privacidad garantizada: Cero cookies invasivas, cero telemetría de terceros, diseño 100% estático y seguro.</span>
          </div>
        </div>
      )}
    </footer>
  );
};
