import React from 'react';
import { ArrowDown, FileText, Code2, Linkedin, Mail, Workflow, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { HeroVideoCard } from './HeroVideoCard';

interface HeroSectionProps {
  onOpenCvModal: () => void;
  onOpenFunnelModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCvModal, onOpenFunnelModal }) => {
  return (
    <section className="max-w-[1140px] mx-auto px-6 mb-16 md:mb-24" id="inicio">
      <div className="bg-[#ebedf0] rounded-3xl p-6 sm:p-10 md:p-12 shadow-neu-raised border border-white/80 relative overflow-hidden">
        {/* Background Monogram Watermark */}
        <div 
          aria-hidden="true"
          className="absolute right-4 -bottom-10 pointer-events-none select-none opacity-[0.05] font-['Space_Grotesk'] text-[180px] sm:text-[240px] md:text-[280px] font-bold text-black leading-none"
        >
          EC
        </div>

        {/* 2-Column Grid: Name & Info on Left, Vertical 9:16 Video Box on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center relative z-10">
          {/* Left Column: Personal info & action triggers */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              {/* Availability Pill (Inset Neumorphism) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ebedf0] shadow-neu-inset mb-5 border border-white/40">
                <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
                <span className="font-['JetBrains_Mono'] text-[11px] sm:text-xs text-black tracking-wide font-medium">
                  {PERSONAL_INFO.availability}
                </span>
              </div>

              {/* Hero Name & Title */}
              <h1 className="text-3xl sm:text-4xl md:text-[46px] md:leading-[54px] font-bold font-['Space_Grotesk'] text-black tracking-tight mb-2">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-semibold font-['Space_Grotesk'] text-[#5e5e5e] mb-5">
                {PERSONAL_INFO.role}
              </p>

              {/* Short Narrative Hook */}
              <p className="text-sm sm:text-base md:text-lg font-['Manrope'] text-[#5e5e5e] mb-8 leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* Tactile Action Triggers & Quick Socials */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <a 
                href="#proyectos"
                className="bg-black text-white px-5 sm:px-6 py-3 rounded-xl shadow-neu-dark font-['Space_Grotesk'] text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-2 hover:bg-neutral-800 transition-all neu-pressed"
                id="hero-explore-projects-btn"
              >
                <span>Explorar Proyectos</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button 
                onClick={onOpenCvModal}
                className="bg-[#ebedf0] text-black px-5 sm:px-6 py-3 rounded-xl shadow-neu-flat font-['Space_Grotesk'] text-xs sm:text-sm font-semibold border border-white/80 inline-flex items-center gap-2 hover:shadow-neu-raised transition-all neu-pressed cursor-pointer"
                id="hero-download-cv-btn"
              >
                <FileText className="w-4 h-4" />
                <span>Descargar CV (PDF)</span>
              </button>

              {/* Social Icon Matrix Tiles */}
              <div className="flex items-center gap-2 sm:ml-1">
                <a 
                  href={PERSONAL_INFO.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn de Eric Fernando Canto Caballero"
                  title="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-[#ebedf0] shadow-neu-flat border border-white/80 flex items-center justify-center text-black hover:shadow-neu-inset transition-all neu-pressed"
                  id="hero-social-linkedin"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a 
                  href={`mailto:${PERSONAL_INFO.email}`} 
                  aria-label="Email de Eric Fernando Canto Caballero"
                  title={`Enviar correo (${PERSONAL_INFO.email})`}
                  className="w-10 h-10 rounded-xl bg-[#ebedf0] shadow-neu-flat border border-white/80 flex items-center justify-center text-black hover:shadow-neu-inset transition-all neu-pressed"
                  id="hero-social-email"
                >
                  <Mail className="w-4 h-4" />
                </a>

                <a 
                  href={`tel:${PERSONAL_INFO.phone}`} 
                  aria-label="Llamar a Eric Fernando Canto Caballero"
                  title={`Llamar a Eric (${PERSONAL_INFO.phone})`}
                  className="w-10 h-10 rounded-xl bg-[#ebedf0] shadow-neu-flat border border-white/80 flex items-center justify-center text-black hover:shadow-neu-inset transition-all neu-pressed"
                  id="hero-social-phone"
                >
                  <Phone className="w-4 h-4" />
                </a>

                <a 
                  href={PERSONAL_INFO.social.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub de Eric Canto"
                  title="GitHub"
                  className="w-10 h-10 rounded-xl bg-[#ebedf0] shadow-neu-flat border border-white/80 flex items-center justify-center text-black hover:shadow-neu-inset transition-all neu-pressed"
                  id="hero-social-github"
                >
                  <Code2 className="w-4 h-4" />
                </a>

                <button
                  onClick={onOpenFunnelModal}
                  aria-label="Ver Diagrama de Arquitectura de Reclutamiento"
                  title="Ver arquitectura del flujo de reclutamiento (Diagrama)"
                  className="w-10 h-10 rounded-xl bg-[#ebedf0] shadow-neu-flat border border-white/80 flex items-center justify-center text-black hover:shadow-neu-inset transition-all neu-pressed cursor-pointer"
                  id="hero-social-funnel"
                >
                  <Workflow className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Recuadro para agregar video en formato 9:16 vertical */}
          <div className="lg:col-span-4 w-full flex justify-center lg:justify-end">
            <HeroVideoCard />
          </div>
        </div>
      </div>
    </section>
  );
};
