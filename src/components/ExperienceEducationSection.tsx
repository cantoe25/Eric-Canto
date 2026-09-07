import React from 'react';
import { Briefcase, GraduationCap, CheckCircle2, HeartHandshake } from 'lucide-react';
import { WORK_EXPERIENCES, EDUCATION_ITEMS, TECHNICAL_VALIDATIONS, VOLUNTEER_ITEMS } from '../data/portfolioData';

export const ExperienceEducationSection: React.FC = () => {
  return (
    <section className="max-w-[1140px] mx-auto px-6 mb-16 md:mb-24" id="experiencia">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-['JetBrains_Mono'] text-xs text-[#5e5e5e] font-semibold tracking-widest uppercase">
          [ 02. HISTORIAL LABORAL, FORMACIÓN & VOLUNTARIADO ]
        </span>
        <div className="h-px bg-slate-300/60 flex-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Work Experience Timeline (7 cols) */}
        <div className="lg:col-span-7">
          <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-black mb-8 flex items-center gap-2.5">
            <Briefcase className="w-5 h-5" />
            <span>Historial Laboral</span>
          </h3>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-300/70 space-y-8">
            {WORK_EXPERIENCES.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Tactile Node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#ebedf0] shadow-neu-flat border-2 border-white flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-black group-hover:scale-125 transition-transform" />
                </div>

                {/* Card Content */}
                <div className="bg-[#ebedf0] p-5 sm:p-6 rounded-2xl shadow-neu-raised border border-white/80 transition-all hover:shadow-neu-flat">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-black">
                      {exp.role}
                    </h4>
                    <span className="font-['JetBrains_Mono'] text-xs px-2.5 py-1 rounded bg-[#ebedf0] shadow-neu-inset text-[#5e5e5e] border border-white/40">
                      {exp.period}
                    </span>
                  </div>

                  <span className="font-['Manrope'] text-sm text-[#5e5e5e] block mb-3 font-semibold">
                    {exp.company} · {exp.location}
                  </span>

                  <p className="text-sm font-['Manrope'] text-[#5e5e5e] mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="text-[11px] font-['JetBrains_Mono'] text-[#5e5e5e] bg-[#ebedf0] px-2.5 py-0.5 rounded shadow-neu-sm border border-white/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Volunteer / Community Section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold font-['Space_Grotesk'] text-black mb-6 flex items-center gap-2.5">
              <HeartHandshake className="w-5 h-5 text-black" />
              <span>Experiencia de Voluntariado & Impacto Social</span>
            </h3>

            <div className="space-y-4">
              {VOLUNTEER_ITEMS.map((vol) => (
                <div 
                  key={vol.id}
                  className="bg-[#ebedf0] p-5 rounded-2xl shadow-neu-flat border border-white/80"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h4 className="text-base font-bold font-['Space_Grotesk'] text-black">
                      {vol.role}
                    </h4>
                    <span className="font-['JetBrains_Mono'] text-xs px-2.5 py-0.5 rounded bg-[#ebedf0] shadow-neu-inset text-[#5e5e5e] border border-white/40">
                      {vol.period}
                    </span>
                  </div>
                  <span className="text-xs font-['Manrope'] text-[#5e5e5e] font-semibold block mb-2">
                    {vol.organization}
                  </span>
                  <p className="text-xs sm:text-sm font-['Manrope'] text-[#5e5e5e] leading-relaxed">
                    {vol.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education & Certifications (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-black mb-8 flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5" />
              <span>Educación & Formación</span>
            </h3>

            <div className="space-y-4">
              {EDUCATION_ITEMS.map((edu) => (
                <div 
                  key={edu.id}
                  className="bg-[#ebedf0] p-5 rounded-2xl shadow-neu-flat border border-white/80"
                >
                  <span className="font-['JetBrains_Mono'] text-xs text-[#5e5e5e] block mb-1">
                    {edu.period}
                  </span>
                  <h4 className="text-base font-bold font-['Space_Grotesk'] text-black mb-0.5">
                    {edu.degree}
                  </h4>
                  <p className="text-xs sm:text-sm font-['Manrope'] text-[#5e5e5e]">
                    {edu.institution}
                  </p>
                  {edu.highlight && (
                    <p className="text-xs font-['JetBrains_Mono'] text-neutral-600 mt-2 pt-2 border-t border-slate-300/40">
                      {edu.highlight}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Validations Card */}
          <div className="bg-[#ebedf0] p-5 rounded-2xl shadow-neu-inset border border-white/60">
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#5e5e5e] font-semibold tracking-wider block mb-3 uppercase">
              VALIDACIONES TÉCNICAS & METRICAS
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm font-['Manrope'] text-[#5e5e5e]">
              {TECHNICAL_VALIDATIONS.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <span className="font-medium text-black/80">{cert.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
