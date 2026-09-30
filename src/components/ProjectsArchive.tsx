import React, { useState } from 'react';
import { LayoutMode } from '../types';
import { PROJECTS } from '../data/projectsData';
import { CreditMatrix } from './CreditMatrix';
import { OverprintComposite } from './OverprintComposite';

interface ProjectsArchiveProps {
  onSelectProject: (projectId: string) => void;
}

export const ProjectsArchive: React.FC<ProjectsArchiveProps> = ({ onSelectProject }) => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('grid');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'all (06)' },
    { id: 'generative', label: 'generative' },
    { id: 'print', label: 'print' },
    { id: 'ledger', label: 'ledger' },
    { id: '1-bit', label: '1-bit' },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.tags.includes(activeFilter);
  });

  return (
    <div className="w-full space-y-10">
      {/* Minimal Filter & View Switcher with generous spacing */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 text-[9px] font-mono lowercase tracking-normal">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`transition-colors whitespace-nowrap pb-1 ${
                activeFilter === f.id
                  ? 'text-neutral-900 border-b border-neutral-900'
                  : 'text-neutral-400 hover:text-neutral-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-neutral-400">
          <button
            onClick={() => setLayoutMode('grid')}
            className={`transition-colors ${
              layoutMode === 'grid' ? 'text-neutral-900' : 'hover:text-neutral-900'
            }`}
          >
            grid
          </button>
          <span>/</span>
          <button
            onClick={() => setLayoutMode('index')}
            className={`transition-colors ${
              layoutMode === 'index' ? 'text-neutral-900' : 'hover:text-neutral-900'
            }`}
          >
            index
          </button>
        </div>
      </div>

      {/* Grid Mode with generous gap and internal card padding */}
      {layoutMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="group border border-neutral-200 hover:border-neutral-900 bg-white transition-colors cursor-pointer flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between text-[9px] font-mono lowercase tracking-normal text-neutral-500">
                <span className="text-neutral-900">{project.number} {project.title}</span>
                <span className="text-neutral-400">{project.year}</span>
              </div>

              {/* Artwork Box with ample breathing padding */}
              <div className="p-10 sm:p-14 bg-white flex items-center justify-center min-h-[260px]">
                {project.id === '01-compose' ? (
                  <div className="w-32 pointer-events-none border border-neutral-200 p-2 shadow-xs">
                    <CreditMatrix seed={88} interactive={false} cols={6} rows={6} />
                  </div>
                ) : project.id === '02-overprint' ? (
                  <div className="w-32 pointer-events-none border border-neutral-200 p-2 shadow-xs">
                    <OverprintComposite seed={12} />
                  </div>
                ) : project.id === '05-binary' ? (
                  <div className="w-32 aspect-square border border-neutral-200 p-3 grid grid-cols-8 gap-0.5 bg-white">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square ${
                          (i * 17) % 3 === 0 ? 'bg-black' : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                ) : project.id === '06-topology' ? (
                  <div className="w-32 aspect-square border border-neutral-200 p-3 bg-white flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full stroke-neutral-800" fill="none">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <path
                          key={i}
                          d={`M 10 ${15 + i * 8} Q 50 ${22 + i * 6} 90 ${15 + i * 8}`}
                          strokeWidth="1"
                        />
                      ))}
                    </svg>
                  </div>
                ) : (
                  <div className="w-32 aspect-square border border-neutral-200 p-3 flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-1.5 w-full">
                      {project.palette.slice(0, 16).map((color, idx) => (
                        <div key={idx} className="aspect-square" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Minimal Footer with generous padding */}
              <div className="p-4 sm:p-5 border-t border-neutral-200 flex items-center justify-between text-[9px] font-mono lowercase tracking-normal text-neutral-400">
                <span>{project.subtitle}</span>
                <span className="text-neutral-900 group-hover:underline">view →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Index Mode */}
      {layoutMode === 'index' && (
        <div className="border border-neutral-200 overflow-x-auto bg-white">
          <table className="w-full text-left border-collapse text-[9px] font-mono lowercase tracking-normal">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/50 text-neutral-400">
                <th className="p-4 pl-6">no.</th>
                <th className="p-4">title</th>
                <th className="p-4 hidden md:table-cell">medium</th>
                <th className="p-4 hidden sm:table-cell">edition</th>
                <th className="p-4">year</th>
                <th className="p-4 text-right pr-6">action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  onClick={() => onSelectProject(project.id)}
                  className="hover:bg-neutral-50 transition-colors cursor-pointer group"
                >
                  <td className="p-4 pl-6 text-neutral-900">{project.number}</td>
                  <td className="p-4 text-neutral-900 group-hover:underline">
                    {project.title}
                  </td>
                  <td className="p-4 text-neutral-500 hidden md:table-cell">{project.medium}</td>
                  <td className="p-4 text-neutral-500 hidden sm:table-cell">{project.editions}</td>
                  <td className="p-4 text-neutral-400 tabular-nums">{project.year}</td>
                  <td className="p-4 text-right pr-6 text-neutral-900">
                    <span className="text-neutral-400 group-hover:text-neutral-900">
                      open →
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
