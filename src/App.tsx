/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProfileSkillsSection } from './components/ProfileSkillsSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CvDocumentModal } from './components/CvDocumentModal';
import { RecruiterFunnelModal } from './components/RecruiterFunnelModal';
import { ProjectModal } from './components/ProjectModal';
import { RepoCodeModal } from './components/RepoCodeModal';
import { ScheduleModal } from './components/ScheduleModal';
import { ProjectItem } from './types';
import { FileText, Globe, Workflow } from 'lucide-react';

export default function App() {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isFunnelModalOpen, setIsFunnelModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedRepoProject, setSelectedRepoProject] = useState<ProjectItem | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [activeScreenTab, setActiveScreenTab] = useState<'portfolio' | 'cv'>('portfolio');

  return (
    <div className="min-h-screen bg-[#ebedf0] text-[#191c1e] font-['Manrope'] selection:bg-black selection:text-white relative">
      {/* Top Fixed Navigation */}
      <Navbar 
        onOpenCvModal={() => setIsCvModalOpen(true)}
        onOpenFunnelModal={() => setIsFunnelModalOpen(true)}
      />

      {/* Floating View Mode Switcher Pill */}
      <aside aria-label="Selector de pantalla" className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#ebedf0]/90 backdrop-blur-md shadow-neu-pill border border-white/70 text-xs font-['JetBrains_Mono'] no-print">
        <button
          onClick={() => setActiveScreenTab('portfolio')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeScreenTab === 'portfolio'
              ? 'bg-[#ebedf0] shadow-neu-inset text-black font-bold border border-white/40'
              : 'text-[#5e5e5e] hover:text-black'
          }`}
          id="tab-btn-portfolio"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Portafolio Web</span>
        </button>

        <button
          onClick={() => {
            setActiveScreenTab('cv');
            setIsCvModalOpen(true);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeScreenTab === 'cv'
              ? 'bg-[#ebedf0] shadow-neu-inset text-black font-bold border border-white/40'
              : 'text-[#5e5e5e] hover:text-black'
          }`}
          id="tab-btn-cv"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>CV Documento</span>
        </button>

        <button
          onClick={() => setIsFunnelModalOpen(true)}
          className="flex items-center gap-1 px-2.5 py-1.5 text-[#5e5e5e] hover:text-black transition-colors border-l border-black/10 cursor-pointer"
          title="Ver flujo Reclutador → CV → Portafolio (Diagrama)"
          id="tab-btn-funnel"
        >
          <Workflow className="w-3.5 h-3.5" />
          <span>Funnel</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="pt-28 md:pt-36">
        {/* 1. Hero / Encabezado */}
        <HeroSection 
          onOpenCvModal={() => setIsCvModalOpen(true)}
          onOpenFunnelModal={() => setIsFunnelModalOpen(true)}
        />

        {/* 2. Capacidades & Visión (Perfil y skills) */}
        <ProfileSkillsSection />

        {/* 3. Trayectoria Profesional & Formación (Experiencia y Educación) */}
        <ExperienceEducationSection />

        {/* 4. Casos de Estudio & Proyectos (Tarjetas con Ver proyecto y Código) */}
        <ProjectsSection 
          onSelectProject={(proj) => setSelectedProject(proj)}
          onSelectRepo={(proj) => setSelectedRepoProject(proj)}
        />

        {/* 5. Conversación & Contacto (Redes y Email) */}
        <ContactSection 
          onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Auxiliary Screens */}
      <CvDocumentModal 
        isOpen={isCvModalOpen}
        onClose={() => {
          setIsCvModalOpen(false);
          setActiveScreenTab('portfolio');
        }}
      />

      <RecruiterFunnelModal
        isOpen={isFunnelModalOpen}
        onClose={() => setIsFunnelModalOpen(false)}
        onOpenCvModal={() => {
          setIsFunnelModalOpen(false);
          setIsCvModalOpen(true);
        }}
      />

      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenRepo={(proj) => {
          setSelectedProject(null);
          setSelectedRepoProject(proj);
        }}
      />

      <RepoCodeModal
        project={selectedRepoProject}
        onClose={() => setSelectedRepoProject(null)}
      />

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </div>
  );
}
