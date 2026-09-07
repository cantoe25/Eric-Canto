import React from 'react';
import { Layers, Award, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES, LANGUAGES } from '../data/portfolioData';

export const ProfileSkillsSection: React.FC = () => {
  return (
    <section className="max-w-[1140px] mx-auto px-6 mb-16 md:mb-24" id="perfil">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-['JetBrains_Mono'] text-xs text-[#5e5e5e] font-semibold tracking-widest uppercase">
          [ 01. PERFIL PROFESIONAL & CAPACIDADES ]
        </span>
        <div className="h-px bg-slate-300/60 flex-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Narrative Profile & Metrics */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="bg-[#ebedf0] rounded-2xl p-6 sm:p-8 shadow-neu-raised border border-white/80 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebedf0] shadow-neu-inset mb-4 border border-white/40">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span className="font-['JetBrains_Mono'] text-[11px] text-black font-semibold">
                Soporte Help-Desk Bilingüe + Desarrollo Full-Stack con IA
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-black mb-4 leading-snug">
              Atención orientada a resultados y resolución técnica basada en datos
            </h2>
            <p className="text-sm sm:text-base font-['Manrope'] text-[#5e5e5e] mb-4 leading-relaxed">
              Estudiante de <strong>Negocios Internacionales (USMA)</strong> con experiencia práctica en atención al cliente, soporte técnico bilingüe y cumplimiento estricto de KPIs en entornos BPO de alto volumen. Domino tanto el trato humano empático como la resolución sistemática de tickets y CRM.
            </p>
            <p className="text-sm sm:text-base font-['Manrope'] text-[#5e5e5e] leading-relaxed mb-5">
              Como <strong>desarrollador autodidacta</strong>, he construido y puesto en producción aplicaciones web reales con React, Firebase, Node.js e integraciones de la <strong>API de Google Gemini</strong>. Esta sinergia me permite entender la raíz técnica de los problemas de software, comunicarme con fluidez con equipos técnicos y adoptar rápidamente cualquier herramienta corporativa.
            </p>

            {/* Languages Matrix */}
            <div className="pt-4 border-t border-slate-300/50">
              <span className="font-['JetBrains_Mono'] text-xs text-black font-bold flex items-center gap-2 mb-3">
                <Globe2 className="w-4 h-4 text-black" />
                <span>COMPETENCIA EN IDIOMAS</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {LANGUAGES.map((lang, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#ebedf0] p-2.5 rounded-xl shadow-neu-inset border border-white/40 text-center"
                  >
                    <span className="font-['Space_Grotesk'] font-bold text-xs text-black block">
                      {lang.language}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#5e5e5e]">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Metrics / Stats with Debossed (Inset) Neumorphism */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-[#ebedf0] rounded-2xl p-4 sm:p-5 shadow-neu-inset text-center border border-white/40">
              <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-black block leading-none mb-1">
                4
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] sm:text-xs text-[#5e5e5e]">
                Idiomas Bilingüe
              </span>
            </div>

            <div className="bg-[#ebedf0] rounded-2xl p-4 sm:p-5 shadow-neu-inset text-center border border-white/40">
              <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-black block leading-none mb-1">
                5+
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] sm:text-xs text-[#5e5e5e]">
                Proyectos Web en Vercel
              </span>
            </div>

            <div className="bg-[#ebedf0] rounded-2xl p-4 sm:p-5 shadow-neu-inset text-center border border-white/40">
              <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-black block leading-none mb-1">
                100%
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] sm:text-xs text-[#5e5e5e]">
                Cumplimiento KPIs
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Tech Stack Panels & Extruded Badges */}
        <div className="lg:col-span-5 bg-[#ebedf0] rounded-2xl p-6 sm:p-8 shadow-neu-raised border border-white/80 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold font-['Space_Grotesk'] text-black mb-6 flex items-center justify-between">
              <span>Habilidades y Tecnologías</span>
              <Layers className="w-5 h-5 text-[#5e5e5e]" />
            </h3>

            {/* Categorized Skills */}
            <div className="space-y-6">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx}>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#5e5e5e] font-semibold tracking-wider block mb-2.5">
                    {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="bg-[#ebedf0] px-3 py-1.5 rounded-lg font-['JetBrains_Mono'] text-xs text-black shadow-neu-sm border border-white/80 hover:shadow-neu-inset transition-all cursor-default select-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3.5 rounded-xl bg-[#ebedf0] shadow-neu-inset text-center border border-white/40 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
            <span className="font-['JetBrains_Mono'] text-xs text-[#5e5e5e] font-medium">
              Licenciatura en Negocios Internacionales (USMA) en curso
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
