import React from 'react';
import { X, ArrowUpRight, Code2, CheckCircle2, Cpu, BarChart3, Layers } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenRepo: (project: ProjectItem) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenRepo }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#ebedf0] rounded-3xl max-w-3xl w-full shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/60 bg-[#ebedf0]">
          <div className="flex items-center gap-2">
            <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#5e5e5e] uppercase">
              {project.category} · {project.year}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#ebedf0] shadow-neu-sm border border-white flex items-center justify-center text-black hover:shadow-neu-inset transition-all cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Hero Banner with Inset Frame */}
          <div className="w-full h-56 sm:h-72 rounded-2xl bg-[#ebedf0] shadow-neu-inset p-3 overflow-hidden relative">
            <img 
              src={project.image} 
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl grayscale contrast-125 brightness-95"
            />
            <span className="absolute top-5 left-5 bg-[#ebedf0]/95 px-3 py-1 rounded-md shadow-neu-sm font-['JetBrains_Mono'] text-xs font-semibold text-black border border-white/80">
              {project.tag}
            </span>
          </div>

          {/* Title & Overview */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-black mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base font-['Manrope'] text-[#5e5e5e] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#5e5e5e] font-semibold block mb-2.5">
              TECNOLOGÍAS IMPLEMENTADAS
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="font-['JetBrains_Mono'] text-xs text-black bg-[#ebedf0] px-3 py-1 rounded-md shadow-neu-sm border border-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Case Study Details */}
          {project.caseStudyDetails && (
            <div className="space-y-5 pt-2 border-t border-slate-300/50">
              {/* Challenge */}
              <div className="bg-[#ebedf0] p-4 sm:p-5 rounded-2xl shadow-neu-flat border border-white/80">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-black" />
                  <h3 className="font-['Space_Grotesk'] font-bold text-sm text-black">
                    El Desafío Técnico
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-['Manrope'] text-[#5e5e5e] leading-relaxed">
                  {project.caseStudyDetails.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="bg-[#ebedf0] p-4 sm:p-5 rounded-2xl shadow-neu-flat border border-white/80">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-black" />
                  <h3 className="font-['Space_Grotesk'] font-bold text-sm text-black">
                    Arquitectura y Solución
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-['Manrope'] text-[#5e5e5e] leading-relaxed mb-3">
                  {project.caseStudyDetails.solution}
                </p>
                <ul className="space-y-1.5 text-xs font-['Manrope'] text-[#5e5e5e]">
                  {project.caseStudyDetails.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div className="bg-[#ebedf0] p-4 sm:p-5 rounded-2xl shadow-neu-inset border border-white/40">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-black" />
                  <h3 className="font-['Space_Grotesk'] font-bold text-sm text-black">
                    Impacto Cuantitativo
                  </h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm font-['Manrope'] text-black/90">
                  {project.caseStudyDetails.results.map((res, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="font-medium">{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-300/50">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 bg-black text-white py-3 px-5 rounded-xl font-['Space_Grotesk'] text-xs font-semibold shadow-neu-dark hover:bg-neutral-800 active:scale-95 transition-all"
            >
              <span>Abrir Proyecto en Vivo</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => onOpenRepo(project)}
              className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 bg-[#ebedf0] text-black py-3 px-5 rounded-xl font-['JetBrains_Mono'] text-xs shadow-neu-sm border border-white/80 hover:shadow-neu-inset neu-pressed transition-all cursor-pointer"
            >
              <Code2 className="w-4 h-4" />
              <span>Explorar Repositorio Git</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
