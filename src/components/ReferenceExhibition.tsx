import React, { useState } from 'react';
import { CreditMatrix } from './CreditMatrix';
import { IsometricLayers } from './IsometricLayers';
import { OverprintComposite } from './OverprintComposite';
import { MatrixCell } from '../types';
import { RefreshCw, Download, ArrowUpRight } from 'lucide-react';

interface ReferenceExhibitionProps {
  onOpenProjectDetail: (projectId: string) => void;
  onOpenLedger: () => void;
}

export const ReferenceExhibition: React.FC<ReferenceExhibitionProps> = ({
  onOpenProjectDetail,
  onOpenLedger
}) => {
  const [seed, setSeed] = useState<number>(1042);
  const [selectedCell, setSelectedCell] = useState<MatrixCell | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const handleRegenerate = () => {
    setSeed(Math.floor(Math.random() * 100000));
  };

  const handleExportSVG = () => {
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000" style="background:#ffffff">
        <rect width="800" height="1000" fill="#ffffff" />
        <text x="40" y="50" font-family="monospace" font-size="9" fill="#111111">credit statements // seed #${seed}</text>
        <text x="40" y="70" font-family="monospace" font-size="9" fill="#737373">a work by textrnr · maximum 1,526 · minimum 1</text>
        <line x1="40" y1="90" x2="760" y2="90" stroke="#e5e5e5" stroke-width="1" />
      </svg>
    `.trim();

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `textrnr_statement_${seed}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCopiedNotification('exported');
    setTimeout(() => setCopiedNotification(null), 2000);
  };

  return (
    <section className="w-full bg-white border border-neutral-200 text-[9px] font-mono lowercase tracking-normal">
      {/* ─────────────────────────────────────────────────────────────
          HEADER ROW (Reference layout: 3 segments, generous padding)
          credit statements | maximum 1,526 · minimum 1 | a work by textrnr
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-neutral-200 text-neutral-700">
        {/* Segment 1 */}
        <div className="md:col-span-4 p-5 sm:p-7 md:p-8 flex items-center border-b md:border-b-0 md:border-r border-neutral-200">
          <span>credit statements</span>
        </div>

        {/* Segment 2 */}
        <div className="md:col-span-4 p-5 sm:p-7 md:p-8 flex items-center justify-start md:justify-center border-b md:border-b-0 md:border-r border-neutral-200 text-neutral-400">
          <span>maximum 1,526 · minimum 1</span>
        </div>

        {/* Segment 3 */}
        <div className="md:col-span-4 p-5 sm:p-7 md:p-8 flex items-center justify-between md:justify-end gap-3 text-neutral-500">
          <span>a work by textrnr</span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ROW 01: 01 compose / burn 80 credits
          Left: Pure minimal lowercase typography with normal tracking
          Right: Framed Chromatic Matrix Canvas with generous breathing room
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-neutral-200">
        {/* Left Column: Generous breathing room */}
        <div className="md:col-span-4 p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-neutral-200 bg-white">
          <div className="space-y-1.5">
            <h2 className="text-[9px] font-mono lowercase text-neutral-900 font-normal">
              01 compose
            </h2>
            <p className="text-[9px] font-mono text-neutral-400 lowercase">
              burn 80 credits
            </p>
          </div>

          {/* Understated micro-controls with normal tracking */}
          <div className="pt-8 sm:pt-12 flex flex-wrap items-center gap-4 text-[9px] font-mono lowercase text-neutral-400">
            <button
              onClick={handleRegenerate}
              className="hover:text-neutral-900 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              cycle #{seed}
            </button>
            <span>/</span>
            <button
              onClick={handleExportSVG}
              className="hover:text-neutral-900 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-2.5 h-2.5" />
              {copiedNotification || 'svg'}
            </button>
            <span>/</span>
            <button
              onClick={() => onOpenProjectDetail('01-compose')}
              className="hover:text-neutral-900 transition-colors flex items-center gap-1"
            >
              info
              <ArrowUpRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Expansive whitespace framing artwork */}
        <div className="md:col-span-8 p-8 sm:p-14 md:p-20 lg:p-24 flex items-center justify-center bg-white min-h-[380px] sm:min-h-[480px]">
          <div className="w-full max-w-[400px] border border-neutral-200 p-5 sm:p-8 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
            <CreditMatrix
              seed={seed}
              interactive={true}
              cols={8}
              rows={10}
              onSelectCell={setSelectedCell}
              selectedCellId={selectedCell?.id}
            />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ROW 02: 02 overprint / combine statements
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-neutral-200">
        {/* Left Column */}
        <div className="md:col-span-4 p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-neutral-200 bg-white">
          <div className="space-y-1.5">
            <h2 className="text-[9px] font-mono lowercase text-neutral-900 font-normal">
              02 overprint
            </h2>
            <p className="text-[9px] font-mono text-neutral-400 lowercase">
              combine statements
            </p>
          </div>

          <div className="pt-8 sm:pt-12 flex items-center gap-3 text-[9px] font-mono lowercase text-neutral-400">
            <button
              onClick={() => onOpenProjectDetail('02-overprint')}
              className="hover:text-neutral-900 transition-colors flex items-center gap-1"
            >
              explore impressum
              <ArrowUpRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Right Area: Split between 3D isometric stack and framed composite */}
        <div className="md:col-span-8 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200 bg-white">
          {/* Sub-Column 1: 3D Isometric Exploded View */}
          <div className="p-6 sm:p-10 md:p-12 flex flex-col items-center justify-center min-h-[340px] bg-white">
            <IsometricLayers interactive={true} />
          </div>

          {/* Sub-Column 2: Framed Resulting Overprint Print */}
          <div className="p-8 sm:p-12 md:p-14 flex flex-col items-center justify-center bg-white min-h-[340px]">
            <div className="w-full max-w-[280px]">
              <OverprintComposite seed={seed} />
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ROW 03: 03 metadata (4-Column Split, Lowercase, Normal Tracking)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 bg-white">
        {/* Cell 1 */}
        <button
          onClick={onOpenLedger}
          className="p-6 sm:p-8 md:p-10 text-left hover:bg-neutral-50/50 transition-colors group"
        >
          <div className="text-[9px] font-mono lowercase text-neutral-900 font-normal flex items-center justify-between">
            <span>03 metadata</span>
            <span className="text-neutral-400 group-hover:text-neutral-900">→</span>
          </div>
          <div className="mt-1.5 text-[9px] font-mono lowercase text-neutral-400">
            a running balance
          </div>
        </button>

        {/* Cell 2 */}
        <div className="p-6 sm:p-8 md:p-10">
          <div className="text-[9px] font-mono lowercase text-neutral-900 font-normal">
            credits
          </div>
          <div className="mt-1.5 text-[9px] font-mono lowercase text-neutral-400">
            credits burned in
          </div>
        </div>

        {/* Cell 3 */}
        <div className="p-6 sm:p-8 md:p-10">
          <div className="text-[9px] font-mono lowercase text-neutral-900 font-normal">
            overprints
          </div>
          <div className="mt-1.5 text-[9px] font-mono lowercase text-neutral-400">
            statements on top
          </div>
        </div>

        {/* Cell 4 */}
        <div className="p-6 sm:p-8 md:p-10">
          <div className="text-[9px] font-mono lowercase text-neutral-900 font-normal">
            credit rating
          </div>
          <div className="mt-1.5 text-[9px] font-mono lowercase text-neutral-400">
            ratings added up
          </div>
        </div>
      </div>
    </section>
  );
};
