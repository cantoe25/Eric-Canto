import React from 'react';
import { Terminal, Mail, Download, FileText, Workflow } from 'lucide-react';

interface NavbarProps {
  onOpenCvModal: () => void;
  onOpenFunnelModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCvModal, onOpenFunnelModal }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 backdrop-blur-md bg-[#ebedf0]/90 border-b border-white/50 no-print">
      <div className="max-w-[1140px] mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo / Product Name */}
        <a 
          href="#inicio" 
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-black group"
          id="nav-brand-logo"
        >
          <span className="w-8 h-8 rounded-lg bg-[#ebedf0] shadow-neu-sm flex items-center justify-center text-black group-hover:shadow-neu-inset transition-all duration-200 border border-white/70">
            <Terminal className="w-4 h-4" />
          </span>
          <span className="font-['Space_Grotesk'] tracking-wider">PORTFOLIO // CV</span>
        </a>

        {/* Navigation Links Desktop */}
        <nav className="hidden lg:flex items-center gap-6 bg-[#ebedf0] px-5 py-1.5 rounded-full shadow-neu-pill border border-white/70 text-sm font-['JetBrains_Mono']">
          <a 
            href="#inicio" 
            className="text-black font-semibold border-b-2 border-black pb-0.5 text-xs transition-all duration-200"
          >
            Inicio
          </a>
          <a 
            href="#perfil" 
            className="text-[#5e5e5e] hover:text-black transition-colors text-xs"
          >
            Perfil
          </a>
          <a 
            href="#experiencia" 
            className="text-[#5e5e5e] hover:text-black transition-colors text-xs"
          >
            Experiencia
          </a>
          <a 
            href="#proyectos" 
            className="text-[#5e5e5e] hover:text-black transition-colors text-xs"
          >
            Proyectos
          </a>
          <a 
            href="#contacto" 
            className="text-[#5e5e5e] hover:text-black transition-colors text-xs"
          >
            Contacto
          </a>
          <button
            onClick={onOpenFunnelModal}
            className="text-[#5e5e5e] hover:text-black transition-colors text-xs flex items-center gap-1 pl-1 border-l border-black/10 cursor-pointer"
            title="Ver diagrama de arquitectura del proceso de reclutamiento"
            id="nav-funnel-btn"
          >
            <Workflow className="w-3 h-3" />
            <span>Diagrama Funnel</span>
          </button>
        </nav>

        {/* Trailing Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CV Document View */}
          <button
            onClick={onOpenCvModal}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#ebedf0] text-black px-3.5 py-2 rounded-xl shadow-neu-sm font-['JetBrains_Mono'] text-xs hover:shadow-neu-inset transition-all duration-150 border border-white/80 cursor-pointer"
            title="Ver formato documento formal de Curriculum Vitae"
            id="nav-view-cv-btn"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ver CV Doc</span>
          </button>

          <a 
            href="#contacto" 
            className="hidden md:inline-flex items-center gap-1.5 bg-[#ebedf0] text-black px-3.5 py-2 rounded-xl shadow-neu-sm font-['JetBrains_Mono'] text-xs hover:shadow-neu-inset transition-all duration-150 border border-white/80"
            id="nav-contact-btn"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contacto</span>
          </a>

          <button 
            onClick={onOpenCvModal}
            className="inline-flex items-center gap-1.5 bg-black text-white px-3.5 sm:px-4 py-2 rounded-xl shadow-neu-dark font-['JetBrains_Mono'] text-xs hover:bg-neutral-800 active:scale-95 transition-all duration-150 cursor-pointer"
            id="nav-download-cv-btn"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar CV</span>
          </button>
        </div>
      </div>
    </header>
  );
};
