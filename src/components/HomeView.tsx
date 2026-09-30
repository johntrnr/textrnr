import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ViewTab } from '../types';

interface HomeViewProps {
  onSelectProject: (projectId: string) => void;
  onNavigateTab: (tab: ViewTab) => void;
}

interface ProjectLink {
  id: string;
  num: string;
  title: string;
  sub: string;
  stat: string;
  year: string;
}

interface ToolLink {
  id: string;
  name: string;
  category: string;
  specs: string;
  url: string;
}

const PROJECTS_LIST: ProjectLink[] = [
  { id: '01-compose', num: '01', title: 'compose', sub: 'burn 80 credits', stat: '80 units · 1,526 max', year: '2025–2026' },
  { id: '02-overprint', num: '02', title: 'overprint', sub: 'combine statements', stat: '3 layers · 40 ed.', year: '2025' },
  { id: '03-metadata', num: '03', title: 'the running ledger', sub: 'a running balance', stat: '1,446 burned', year: '2025' },
  { id: '04-chromatics', num: '04', title: 'chromatic permutations', sub: '80-tone frequency variation', stat: '8 unique', year: '2024–2025' },
  { id: '05-binary', num: '05', title: '1-bit reduction', sub: 'high-density monochrome bitfield', stat: '100 leporellos', year: '2024' },
  { id: '06-topology', num: '06', title: 'vector tension', sub: 'axonometric distortion field', stat: '25 plotter sheets', year: '2024' },
];

const TOOLS_LIST: ToolLink[] = [
  { id: 'phasr', name: 'phasr', category: 'multi-effects', specs: 'shader · halftone · grain', url: 'https://phasr.textrnr.com' },
  { id: 'framr', name: 'framr', category: 'photoshop killer', specs: 'parametric matting · impressum', url: 'https://framr.textrnr.com' },
  { id: 'gradr', name: 'gradr', category: 'gradients maker', specs: 'spectral mesh · dither', url: 'https://gradr.textrnr.com' },
];

export const HomeView: React.FC<HomeViewProps> = ({ onSelectProject, onNavigateTab }) => {
  return (
    <div className="w-full space-y-12 sm:space-y-16 text-[9px] font-mono lowercase tracking-normal">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER STATS BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="border border-neutral-200 p-6 sm:p-8 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-neutral-900 font-bold">textrnr</span>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-500">systematic art & autonomous tools</span>
        </div>

        <div className="flex items-center gap-4 text-neutral-400">
          <span>06 projects</span>
          <span>·</span>
          <span>03 tools</span>
          <span>·</span>
          <span>2024–2026</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. PROJECTS LIST
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-200 text-neutral-400">
          <span className="text-neutral-900">projects</span>
          <button
            onClick={() => onNavigateTab('exhibition')}
            className="hover:text-neutral-900 transition-colors"
          >
            exhibition grid →
          </button>
        </div>

        <div className="border border-neutral-200 divide-y divide-neutral-200 bg-white">
          {PROJECTS_LIST.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-baseline gap-4 sm:gap-6 min-w-[280px]">
                <span className="text-neutral-400">{project.num}</span>
                <span className="text-neutral-900 font-normal group-hover:underline">
                  {project.title}
                </span>
                <span className="text-neutral-400 hidden sm:inline">{project.sub}</span>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 text-neutral-400">
                <span>{project.stat}</span>
                <span className="tabular-nums">{project.year}</span>
                <span className="text-neutral-900 group-hover:underline whitespace-nowrap">
                  view →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. TOOLS LIST
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-200 text-neutral-400">
          <span className="text-neutral-900">tools</span>
          <button
            onClick={() => onNavigateTab('tools')}
            className="hover:text-neutral-900 transition-colors"
          >
            all tools →
          </button>
        </div>

        <div className="border border-neutral-200 divide-y divide-neutral-200 bg-white">
          {TOOLS_LIST.map((tool) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noreferrer"
              className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors group block"
            >
              <div className="flex items-baseline gap-4 sm:gap-6 min-w-[280px]">
                <span className="text-neutral-900 font-normal group-hover:underline">
                  {tool.name}
                </span>
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-500">{tool.category}</span>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 text-neutral-400">
                <span>{tool.specs}</span>
                <div className="flex items-center gap-1.5 text-neutral-900 group-hover:underline">
                  <span>open</span>
                  <ArrowUpRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
