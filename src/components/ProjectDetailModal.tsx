import React, { useState } from 'react';
import { Project } from '../types';
import { X, RefreshCw, Check, Copy } from 'lucide-react';
import { CreditMatrix } from './CreditMatrix';
import { IsometricLayers } from './IsometricLayers';
import { OverprintComposite } from './OverprintComposite';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onInquireWork: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onInquireWork
}) => {
  const [modalSeed, setModalSeed] = useState<number>(5544);
  const [copiedHash, setCopiedHash] = useState(false);

  if (!project) return null;

  const handleCopyHash = () => {
    if (project.contractAddress) {
      navigator.clipboard.writeText(project.contractAddress);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/25 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 animate-fade-in text-[9px] font-mono lowercase tracking-normal">
      <div className="relative w-full max-w-4xl bg-white border border-neutral-200 shadow-xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <span className="text-neutral-900 font-normal">{project.number} {project.title}</span>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-400">{project.subtitle}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label="close dialog"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-12 space-y-10">
          {/* Main Visual Display with generous breathing room */}
          <div className="border border-neutral-200 p-8 sm:p-14 bg-white flex flex-col items-center justify-center">
            <div className="w-full max-w-sm bg-white border border-neutral-200 p-6 sm:p-8">
              {project.id === '01-compose' ? (
                <CreditMatrix seed={modalSeed} interactive={true} cols={8} rows={10} />
              ) : project.id === '02-overprint' ? (
                <div className="space-y-6">
                  <IsometricLayers interactive={true} />
                  <OverprintComposite seed={modalSeed} />
                </div>
              ) : project.id === '05-binary' ? (
                <div className="grid grid-cols-16 gap-0.5 p-4 bg-white border border-neutral-200">
                  {Array.from({ length: 128 }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square ${
                        (i * (modalSeed % 17 + 3)) % 2 === 0 ? 'bg-black' : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  <CreditMatrix seed={modalSeed} cols={8} rows={8} interactive={false} />
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center gap-3 text-neutral-400">
              <button
                onClick={() => setModalSeed(Math.floor(Math.random() * 99999))}
                className="hover:text-neutral-900 transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                randomize entropy (#{modalSeed})
              </button>
            </div>
          </div>

          {/* Description & Curatorial Statement with generous spacing */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-7 space-y-4">
              <div className="tracking-[0.24em] text-neutral-400">
                conceptual premise
              </div>
              <p className="text-neutral-700 leading-relaxed font-sans">
                {project.description}
              </p>

              <div className="tracking-[0.24em] text-neutral-400 pt-3">
                curatorial note
              </div>
              <p className="text-neutral-500 leading-relaxed border-l border-neutral-900 pl-4 italic font-sans">
                "{project.curatorialNote}"
              </p>
            </div>

            {/* Technical Specifications */}
            <div className="md:col-span-5 space-y-3 bg-neutral-50/50 p-6 border border-neutral-200">
              <div className="tracking-[0.22em] text-neutral-900 font-normal pb-2 border-b border-neutral-200">
                system specs
              </div>
              <dl className="divide-y divide-neutral-200/60 text-[9px] font-mono tracking-[0.16em]">
                <div className="py-2 flex justify-between">
                  <dt className="text-neutral-400">year</dt>
                  <dd className="text-neutral-900">{project.year}</dd>
                </div>
                <div className="py-2 flex justify-between">
                  <dt className="text-neutral-400">medium</dt>
                  <dd className="text-neutral-900 text-right max-w-[180px]">{project.medium}</dd>
                </div>
                <div className="py-2 flex justify-between">
                  <dt className="text-neutral-400">edition</dt>
                  <dd className="text-neutral-900">{project.editions}</dd>
                </div>
                {project.contractAddress && (
                  <div className="py-2 flex justify-between items-center">
                    <dt className="text-neutral-400">contract</dt>
                    <dd className="flex items-center gap-1.5 text-neutral-900">
                      <span>{project.contractAddress}</span>
                      <button onClick={handleCopyHash} className="text-neutral-400 hover:text-neutral-900">
                        {copiedHash ? <Check className="w-2.5 h-2.5 text-emerald-600" /> : <Copy className="w-2.5 h-2.5" />}
                      </button>
                    </dd>
                  </div>
                )}
                {project.specs.map((s, idx) => (
                  <div key={idx} className="py-2 flex justify-between">
                    <dt className="text-neutral-400">{s.label}</dt>
                    <dd className="text-neutral-900 text-right max-w-[180px]">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-5 sm:p-6 border-t border-neutral-200 flex items-center justify-between bg-white">
          <div className="text-neutral-400">
            status: <span className="text-neutral-900">{project.status.toLowerCase()}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onInquireWork(`${project.number} ${project.title}`);
            }}
            className="px-5 py-2.5 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
          >
            acquisition inquiry
          </button>
        </div>
      </div>
    </div>
  );
};
