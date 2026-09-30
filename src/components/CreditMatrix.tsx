import React, { useMemo, useState } from 'react';
import { MatrixCell } from '../types';

interface CreditMatrixProps {
  seed?: number;
  interactive?: boolean;
  cols?: number;
  rows?: number;
  onSelectCell?: (cell: MatrixCell) => void;
  selectedCellId?: number | null;
  className?: string;
  isOverprinted?: boolean;
}

const PALETTE = [
  '#00a8e8',
  '#003459',
  '#007ea7',
  '#d62828',
  '#f77f00',
  '#fcbf49',
  '#eae2b7',
  '#7209b7',
  '#4361ee',
  '#4cc9f0',
  '#2a9d8f',
  '#e76f51',
  '#111111',
  '#3a0ca3',
  '#b5179e',
  '#70e000',
  '#38b000',
];

function pseudoRandom(s: number) {
  const x = Math.sin(s++) * 10000;
  return x - Math.floor(x);
}

export const CreditMatrix: React.FC<CreditMatrixProps> = ({
  seed = 42,
  interactive = true,
  cols = 8,
  rows = 10,
  onSelectCell,
  selectedCellId = null,
  className = '',
  isOverprinted = false
}) => {
  const [hoveredCell, setHoveredCell] = useState<MatrixCell | null>(null);

  const cells = useMemo(() => {
    const list: MatrixCell[] = [];
    const count = cols * rows;

    for (let i = 0; i < count; i++) {
      const cellSeed = seed * 1337 + i * 47;
      const r1 = pseudoRandom(cellSeed);
      const r2 = pseudoRandom(cellSeed + 1);
      const r3 = pseudoRandom(cellSeed + 2);
      const r4 = pseudoRandom(cellSeed + 3);

      const color1 = PALETTE[Math.floor(r1 * PALETTE.length)];
      const color2 = PALETTE[Math.floor(r2 * PALETTE.length)];
      const color3 = PALETTE[Math.floor(r3 * PALETTE.length)];

      const glyphTypes: MatrixCell['glyphType'][] = ['check', 'pixel', 'cluster', 'cross', 'halftone'];
      const glyphType = glyphTypes[Math.floor(r4 * glyphTypes.length)];

      list.push({
        id: i + 1,
        x: i % cols,
        y: Math.floor(i / cols),
        huePrimary: isOverprinted ? (r1 > 0.4 ? '#111111' : color1) : color1,
        hueSecondary: isOverprinted ? (r2 > 0.5 ? '#111111' : color2) : color2,
        accentColor: color3,
        density: Math.floor(r1 * 4) + 2,
        glyphType,
        opacity: isOverprinted ? 0.95 : 0.85 + r3 * 0.15
      });
    }

    return list;
  }, [cols, rows, seed, isOverprinted]);

  const renderCellGlyph = (cell: MatrixCell) => {
    const isSelected = selectedCellId === cell.id;
    const isHovered = hoveredCell?.id === cell.id;

    return (
      <svg
        viewBox="0 0 24 24"
        className={`w-full h-full transition-transform duration-150 ${
          isHovered ? 'scale-110' : ''
        }`}
        fill="none"
      >
        {!isOverprinted && (
          <circle cx="12" cy="12" r="0.75" fill="#f0f0f0" />
        )}

        {cell.glyphType === 'check' && (
          <g>
            <rect x="4" y="11" width="3" height="3" fill={cell.huePrimary} />
            <rect x="7" y="14" width="3" height="3" fill={cell.hueSecondary} />
            <rect x="10" y="17" width="3" height="3" fill={cell.accentColor} />
            <rect x="13" y="14" width="3" height="3" fill={cell.huePrimary} />
            <rect x="16" y="11" width="3" height="3" fill={cell.hueSecondary} />
            <rect x="19" y="8" width="3" height="3" fill={cell.accentColor} />
            {isOverprinted && (
              <path
                d="M 5 12 L 11 18 L 20 9"
                stroke="#111111"
                strokeWidth="2.5"
                strokeLinecap="square"
                opacity="0.9"
              />
            )}
          </g>
        )}

        {cell.glyphType === 'pixel' && (
          <g>
            <rect x="6" y="6" width="3.5" height="3.5" fill={cell.huePrimary} />
            <rect x="14" y="6" width="3.5" height="3.5" fill={cell.hueSecondary} />
            <rect x="10" y="10" width="4" height="4" fill={isOverprinted ? '#111111' : cell.accentColor} />
            <rect x="6" y="14" width="3.5" height="3.5" fill={cell.hueSecondary} />
            <rect x="14" y="14" width="3.5" height="3.5" fill={cell.huePrimary} />
            {isOverprinted && (
              <rect x="7" y="7" width="10" height="10" fill="#111111" opacity="0.6" />
            )}
          </g>
        )}

        {cell.glyphType === 'cluster' && (
          <g>
            <circle cx="8" cy="8" r="2" fill={cell.huePrimary} />
            <circle cx="16" cy="8" r="2" fill={cell.hueSecondary} />
            <circle cx="12" cy="12" r="3" fill={isOverprinted ? '#111111' : cell.accentColor} />
            <circle cx="8" cy="16" r="2" fill={cell.accentColor} />
            <circle cx="16" cy="16" r="2" fill={cell.huePrimary} />
            {isOverprinted && (
              <circle cx="12" cy="12" r="4.5" fill="#111111" opacity="0.7" />
            )}
          </g>
        )}

        {cell.glyphType === 'cross' && (
          <g>
            <rect x="10" y="5" width="4" height="14" fill={cell.huePrimary} />
            <rect x="5" y="10" width="14" height="4" fill={cell.hueSecondary} />
            <rect x="10" y="10" width="4" height="4" fill={isOverprinted ? '#111111' : cell.accentColor} />
            {isOverprinted && (
              <path
                d="M 12 4 V 20 M 4 12 H 20"
                stroke="#111111"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
            )}
          </g>
        )}

        {cell.glyphType === 'halftone' && (
          <g>
            <rect x="5" y="5" width="4" height="4" fill={cell.huePrimary} />
            <rect x="15" y="5" width="4" height="4" fill={cell.hueSecondary} />
            <rect x="10" y="10" width="4" height="4" fill={isOverprinted ? '#111111' : '#000000'} />
            <rect x="5" y="15" width="4" height="4" fill={cell.hueSecondary} />
            <rect x="15" y="15" width="4" height="4" fill={cell.accentColor} />
          </g>
        )}

        {isSelected && (
          <rect
            x="1"
            y="1"
            width="22"
            height="22"
            fill="none"
            stroke="#111111"
            strokeWidth="1.5"
          />
        )}
      </svg>
    );
  };

  return (
    <div className="relative w-full ${className}">
      <div
        className="grid gap-[3px] sm:gap-[4px] md:gap-[5px] p-2 sm:p-4 bg-white select-none"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
        }}
      >
        {cells.map((cell) => {
          const isSelected = selectedCellId === cell.id;
          return (
            <div
              key={cell.id}
              onClick={() => {
                if (interactive && onSelectCell) {
                  onSelectCell(cell);
                }
              }}
              onMouseEnter={() => interactive && setHoveredCell(cell)}
              onMouseLeave={() => interactive && setHoveredCell(null)}
              className={`aspect-square p-0.5 sm:p-1 flex items-center justify-center transition-colors duration-150 ${
                interactive ? 'cursor-pointer hover:bg-neutral-50' : ''
              } ${isSelected ? 'bg-neutral-100 ring-1 ring-neutral-900' : ''}`}
            >
              {renderCellGlyph(cell)}
            </div>
          );
        })}
      </div>

      {/* Micro Telemetry HUD in 9px lowercase */}
      {interactive && hoveredCell && (
        <div className="pointer-events-none absolute bottom-1 right-2 px-2 py-0.5 bg-neutral-900 text-white text-[9px] font-mono tracking-widest lowercase opacity-95">
          stmt #{String(hoveredCell.id).padStart(2, '0')} · [{hoveredCell.x},{hoveredCell.y}] · {hoveredCell.glyphType}
        </div>
      )}
    </div>
  );
};
