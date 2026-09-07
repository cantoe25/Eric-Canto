import React, { useState } from 'react';
import { X, Code2, Copy, Check, GitBranch, Star, Terminal, FileCode, Folder } from 'lucide-react';
import { ProjectItem } from '../types';

interface RepoCodeModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const RepoCodeModal: React.FC<RepoCodeModalProps> = ({ project, onClose }) => {
  const [copiedClone, setCopiedClone] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('README.md');

  if (!project) return null;

  const cloneCommand = `git clone ${project.repoUrl}.git`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCommand).then(() => {
      setCopiedClone(true);
      setTimeout(() => setCopiedClone(false), 2000);
    });
  };

  const fileSnippets: Record<string, string> = {
    'README.md': `# ${project.title}
> ${project.category} · ${project.year}

${project.description}

## Tech Stack
${project.techStack.map(t => `- ${t}`).join('\n')}

## Quickstart
\`\`\`bash
# 1. Clone repo
${cloneCommand}

# 2. Install dependencies
pnpm install

# 3. Launch dev environment
pnpm run dev
\`\`\`

## Key Metrics
${project.metrics || 'SLA 99.9% · Zero downtime'}

## Architecture Highlights
${project.caseStudyDetails?.architecture.map(a => `- ${a}`).join('\n') || '- Production-grade system design'}
`,
    'package.json': `{
  "name": "${project.id}",
  "version": "2.4.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host",
    "build": "tsc && vite build",
    "test": "vitest run --coverage"
  },
  "dependencies": {
    "typescript": "^5.8.0",
    "react": "^19.0.0"
  }
}`,
    'src/index.ts': `/**
 * Core engine initialization for ${project.title}
 * @author Eric Fernando Canto Caballero
 */

import { configureEngine } from './engine/core';

export async function bootstrap() {
  console.log('[System] Initializing ${project.title}...');
  const engine = await configureEngine({
    mode: 'production',
    telemetry: false,
    workers: navigator.hardwareConcurrency || 4
  });
  
  return engine.start();
}
`
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#ebedf0] rounded-3xl max-w-3xl w-full shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300/60 bg-[#ebedf0]">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-black" />
            <span className="font-['JetBrains_Mono'] text-xs sm:text-sm font-bold text-black">
              ecantoc25 / {project.id}
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] bg-slate-200 px-2 py-0.5 rounded text-[#5e5e5e] hidden sm:inline-block">
              public
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

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#ebedf0] shadow-neu-inset text-xs font-['JetBrains_Mono'] text-[#5e5e5e]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5 text-black" />
                <span>main</span>
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-black" />
                <span>2.4k stars</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <code className="text-black bg-white/70 px-2 py-1 rounded text-[11px] select-all">
                {cloneCommand}
              </code>
              <button
                onClick={handleCopy}
                className="p-1 rounded bg-[#ebedf0] shadow-neu-sm hover:shadow-neu-inset transition-all"
                title="Copiar comando clone"
              >
                {copiedClone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* File selector tabs */}
          <div className="flex items-center gap-2 border-b border-slate-300/60 pb-2">
            {Object.keys(fileSnippets).map((filename) => (
              <button
                key={filename}
                onClick={() => setSelectedFile(filename)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-['JetBrains_Mono'] transition-all cursor-pointer ${
                  selectedFile === filename
                    ? 'bg-black text-white font-semibold'
                    : 'bg-[#ebedf0] text-[#5e5e5e] hover:text-black shadow-neu-sm'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{filename}</span>
              </button>
            ))}
          </div>

          {/* Code Viewer Frame */}
          <div className="rounded-2xl bg-neutral-900 text-neutral-200 p-4 sm:p-5 shadow-neu-inset font-['JetBrains_Mono'] text-xs overflow-x-auto">
            <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-neutral-800 text-[11px] text-neutral-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>{selectedFile}</span>
            </div>
            <pre className="whitespace-pre font-['JetBrains_Mono'] leading-relaxed">
              {fileSnippets[selectedFile]}
            </pre>
          </div>

          {/* External GitHub link */}
          <div className="flex justify-end pt-2">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-['JetBrains_Mono'] text-xs font-semibold shadow-neu-dark hover:bg-neutral-800 transition-all"
            >
              <Code2 className="w-4 h-4" />
              <span>Ver en GitHub Oficial</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
