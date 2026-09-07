import React from 'react';
import { X, Printer, Mail, Globe, MapPin, Phone, Linkedin, ExternalLink, Award } from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES, WORK_EXPERIENCES, EDUCATION_ITEMS, VOLUNTEER_ITEMS, PROJECTS, LANGUAGES } from '../data/portfolioData';

interface CvDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvDocumentModal: React.FC<CvDocumentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#ebedf0] rounded-3xl max-w-4xl w-full shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/60 bg-[#ebedf0] no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
            <h2 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-black tracking-wide">
              DOCUMENTO OFICIAL // CURRICULUM VITAE
            </h2>
            <span className="text-[10px] font-['JetBrains_Mono'] bg-[#ebedf0] px-2 py-0.5 rounded shadow-neu-inset text-[#5e5e5e] hidden sm:inline-block">
              FORMATO OFICIAL RECLUTADOR
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-black text-white px-3.5 py-1.5 rounded-xl text-xs font-['JetBrains_Mono'] font-medium hover:bg-neutral-800 transition-all cursor-pointer"
              title="Imprimir o guardar como PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-[#ebedf0] shadow-neu-sm border border-white flex items-center justify-center text-black hover:shadow-neu-inset transition-all cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable CV Sheet */}
        <div className="p-6 sm:p-12 overflow-y-auto bg-white text-[#191c1e] font-['Manrope']" id="printable-cv">
          {/* 1. ENCABEZADO */}
          <header className="border-b-2 border-black pb-6 mb-7">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-black tracking-tight mb-1 uppercase">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm sm:text-base font-['Space_Grotesk'] font-semibold text-neutral-700">
                  {PERSONAL_INFO.role}
                </p>
              </div>

              {/* Contact Data */}
              <div className="space-y-1.5 text-xs font-['JetBrains_Mono'] text-neutral-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-black shrink-0" />
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-black font-medium hover:underline">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-black shrink-0" />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-black font-medium hover:underline">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-black shrink-0" />
                  <a href={PERSONAL_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
                    linkedin.com/in/eric-canto-b31056372
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* 2. PERFIL PROFESIONAL */}
          <section className="mb-7">
            <h2 className="text-xs font-bold font-['JetBrains_Mono'] tracking-widest text-black uppercase mb-2.5 border-b border-slate-200 pb-1">
              01. PERFIL PROFESIONAL
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-800 text-justify">
              {PERSONAL_INFO.bio}
            </p>
          </section>

          {/* 3. HABILIDADES PRINCIPALES & IDIOMAS */}
          <section className="mb-7">
            <h2 className="text-xs font-bold font-['JetBrains_Mono'] tracking-widest text-black uppercase mb-3 border-b border-slate-200 pb-1">
              02. HABILIDADES PRINCIPALES & IDIOMAS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              {SKILL_CATEGORIES.map((cat, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-['JetBrains_Mono'] font-bold text-black block mb-1 uppercase">
                    {cat.category}
                  </span>
                  <p className="text-xs text-neutral-700 leading-snug">
                    {cat.skills.join(' · ')}
                  </p>
                </div>
              ))}
            </div>

            {/* Languages Bar */}
            <div className="bg-neutral-900 text-white p-3 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs font-['JetBrains_Mono']">
              <span className="font-bold text-neutral-300">IDIOMAS:</span>
              {LANGUAGES.map((l, idx) => (
                <span key={idx} className="text-neutral-200">
                  <strong>{l.language}:</strong> {l.level}
                </span>
              ))}
            </div>
          </section>

          {/* 4. HISTORIAL DE EXPERIENCIA LABORAL */}
          <section className="mb-7">
            <h2 className="text-xs font-bold font-['JetBrains_Mono'] tracking-widest text-black uppercase mb-4 border-b border-slate-200 pb-1">
              03. HISTORIAL DE EXPERIENCIA LABORAL
            </h2>

            <div className="space-y-4">
              {WORK_EXPERIENCES.map((exp) => (
                <div key={exp.id} className="pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-0.5">
                    <h3 className="text-sm sm:text-base font-bold font-['Space_Grotesk'] text-black">
                      {exp.role} <span className="font-normal text-neutral-600">· {exp.company}</span>
                    </h3>
                    <span className="font-['JetBrains_Mono'] text-xs text-neutral-600 font-semibold">
                      {exp.period}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-500 block mb-1.5">
                    {exp.location}
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-2">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((s, idx) => (
                      <span key={idx} className="text-[10px] font-['JetBrains_Mono'] bg-slate-100 px-2 py-0.5 rounded text-neutral-700 border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. PROYECTOS DE DESARROLLO INDEPENDIENTES */}
          <section className="mb-7">
            <h2 className="text-xs font-bold font-['JetBrains_Mono'] tracking-widest text-black uppercase mb-4 border-b border-slate-200 pb-1">
              04. PROYECTOS DE DESARROLLO INDEPENDIENTES
            </h2>

            <div className="space-y-3.5">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm font-bold font-['Space_Grotesk'] text-black">
                        {proj.title}
                      </h3>
                      <span className="text-[10px] font-['JetBrains_Mono'] bg-white px-2 py-0.5 rounded text-neutral-700 border border-slate-300">
                        {proj.tag}
                      </span>
                    </div>

                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-700 hover:underline inline-flex items-center gap-1 font-['JetBrains_Mono']"
                      >
                        <span>{proj.liveUrl.replace('https://', '')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-neutral-700 leading-relaxed mb-2">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {proj.techStack.map((tech, idx) => (
                      <span key={idx} className="text-[10px] font-['JetBrains_Mono'] text-neutral-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. EDUCACIÓN & VOLUNTARIADO */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xs font-bold font-['JetBrains_Mono'] tracking-widest text-black uppercase mb-3 border-b border-slate-200 pb-1">
                05. EDUCACIÓN Y CERTIFICACIONES
              </h2>
              <div className="space-y-3">
                {EDUCATION_ITEMS.map((edu) => (
                  <div key={edu.id}>
                    <span className="text-[10px] font-['JetBrains_Mono'] text-neutral-500 block">
                      {edu.period}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-black font-['Space_Grotesk']">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-neutral-600">{edu.institution}</p>
                    {edu.highlight && (
                      <p className="text-[11px] text-neutral-500 italic mt-0.5">{edu.highlight}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold font-['JetBrains_Mono'] tracking-widest text-black uppercase mb-3 border-b border-slate-200 pb-1">
                06. EXPERIENCIA DE VOLUNTARIADO
              </h2>
              <div className="space-y-3">
                {VOLUNTEER_ITEMS.map((vol) => (
                  <div key={vol.id}>
                    <span className="text-[10px] font-['JetBrains_Mono'] text-neutral-500 block">
                      {vol.period}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-black font-['Space_Grotesk']">
                      {vol.role}
                    </h4>
                    <p className="text-xs text-neutral-600 font-medium">{vol.organization}</p>
                    <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">{vol.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
