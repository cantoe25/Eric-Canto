import React, { useState } from 'react';
import { ArrowUpRight, Code2, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onSelectRepo: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject, onSelectRepo }) => {
  const [activeFilter, setActiveFilter] = useState<string>('Todos');

  const filterCategories = ['Todos', 'IA & Gemini', 'Full-Stack & Web', 'Finanzas & SaaS', 'E-Commerce'];

  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeFilter === 'Todos') return true;
    if (activeFilter === 'IA & Gemini') {
      return proj.techStack.some(t => t.includes('Gemini') || t.includes('IA')) || proj.tag.includes('IA') || proj.description.includes('IA');
    }
    if (activeFilter === 'Full-Stack & Web') {
      return proj.techStack.includes('React') || proj.techStack.includes('Firebase') || proj.techStack.includes('Node.js');
    }
    if (activeFilter === 'Finanzas & SaaS') {
      return proj.category.includes('SAAS') || proj.tag.includes('SaaS') || proj.id === 'proj-2';
    }
    if (activeFilter === 'E-Commerce') {
      return proj.category.includes('MARKETPLACE') || proj.category.includes('CHECKOUT') || proj.category.includes('RESTAURANTE') || proj.id === 'proj-3';
    }
    return true;
  });

  return (
    <section className="max-w-[1140px] mx-auto px-6 mb-16 md:mb-24" id="proyectos">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-['JetBrains_Mono'] text-xs text-[#5e5e5e] font-semibold tracking-widest uppercase">
          [ 03. CASOS DE ESTUDIO & PROYECTOS DE DESARROLLO ]
        </span>
        <div className="h-px bg-slate-300/60 flex-1" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-black">
            Proyectos de Desarrollo Independientes
          </h2>
          <p className="text-sm sm:text-base font-['Manrope'] text-[#5e5e5e] mt-1 max-w-xl">
            Aplicaciones web en producción construidas con React, Firebase, Node.js y la API de Google Gemini.
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-2">
          <span className="font-['JetBrains_Mono'] text-xs text-[#5e5e5e]">
            Mostrando {filteredProjects.length} de {PROJECTS.length} aplicaciones activas
          </span>

          {/* Interactive filter pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {filterCategories.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-2.5 py-1 rounded-lg font-['JetBrains_Mono'] text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#ebedf0] shadow-neu-inset font-bold text-black border border-white/40'
                      : 'bg-[#ebedf0] shadow-neu-sm text-[#5e5e5e] hover:text-black border border-white/80'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Projects Grid (Asymmetric Tactile Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <article 
            key={project.id}
            className="bg-[#ebedf0] rounded-3xl p-6 shadow-neu-raised border border-white/90 flex flex-col justify-between group hover:shadow-neu-flat transition-all"
            id={`project-card-${project.id}`}
          >
            <div>
              {/* Monochromatic Preview Frame with Inset Well */}
              <div 
                className="w-full h-52 sm:h-56 rounded-2xl bg-[#ebedf0] shadow-neu-inset p-3 mb-6 overflow-hidden flex items-center justify-center relative cursor-pointer"
                onClick={() => onSelectProject(project)}
                title="Haz clic para ver detalles y caso de estudio"
              >
                <img 
                  src={project.image} 
                  alt={project.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl grayscale contrast-125 brightness-95 opacity-90 transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-5 left-5 bg-[#ebedf0]/95 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-neu-sm font-['JetBrains_Mono'] text-xs font-semibold text-black border border-white/80">
                  {project.tag}
                </span>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-5 right-5 bg-black/80 hover:bg-black text-white p-2 rounded-lg text-xs font-['JetBrains_Mono'] flex items-center gap-1 shadow-neu-dark transition-all"
                    title={`Abrir ${project.title} en vivo en nueva pestaña`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Metadata & Title */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#5e5e5e] tracking-wider uppercase">
                  {project.category}
                </span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#5e5e5e]">
                  {project.year}
                </span>
              </div>

              <h3 
                className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-black mb-2 hover:underline cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                {project.title}
              </h3>

              <p className="text-sm font-['Manrope'] text-[#5e5e5e] mb-5 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech, tIdx) => (
                  <span 
                    key={tIdx}
                    className="font-['JetBrains_Mono'] text-xs text-black bg-[#ebedf0] px-2.5 py-1 rounded-md shadow-neu-sm border border-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Dual Tactile Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-300/40">
              <button 
                onClick={() => onSelectProject(project)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-black text-white py-2.5 px-4 rounded-xl font-['Space_Grotesk'] text-xs font-semibold shadow-neu-dark hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer"
                id={`btn-view-${project.id}`}
              >
                <span>Ver caso de estudio</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button 
                onClick={() => onSelectRepo(project)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#ebedf0] text-black py-2.5 px-4 rounded-xl font-['JetBrains_Mono'] text-xs shadow-neu-sm border border-white/80 hover:shadow-neu-inset neu-pressed transition-all cursor-pointer"
                id={`btn-repo-${project.id}`}
              >
                <Code2 className="w-4 h-4" />
                <span>Código (repo)</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
