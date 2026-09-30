import React, { useState } from 'react';

interface IsometricLayersProps {
  interactive?: boolean;
}

export const IsometricLayers: React.FC<IsometricLayersProps> = ({ interactive = true }) => {
  const [separation, setSeparation] = useState<number>(44);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [tiltAngle, setTiltAngle] = useState<{ x: number; y: number }>({ x: 58, y: -28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

    setTiltAngle({
      x: 58 + yRatio * 10,
      y: -28 + xRatio * 14
    });
  };

  const handleResetTilt = () => {
    setTiltAngle({ x: 58, y: -28 });
  };

  const renderLayerContent = (layerIndex: number) => {
    const isBase = layerIndex === 0;
    const isMid = layerIndex === 1;
    const isTop = layerIndex === 2;

    return (
      <div className="w-full h-full p-2.5 sm:p-3 grid grid-cols-8 grid-rows-6 gap-1 bg-white/95 border border-neutral-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        {Array.from({ length: 48 }).map((_, i) => {
          let color = '#00a8e8';
          if (isBase) {
            color = (i % 3 === 0) ? '#fcbf49' : (i % 2 === 0 ? '#4cc9f0' : '#2a9d8f');
          } else if (isMid) {
            color = (i % 4 === 0) ? '#ff0055' : (i % 3 === 0 ? '#b5179e' : '#f77f00');
          } else if (isTop) {
            color = (i % 2 === 0) ? '#111111' : (i % 3 === 0 ? '#003459' : '#111111');
          }

          return (
            <div key={i} className="flex items-center justify-center p-[1px] aspect-square">
              <svg viewBox="0 0 16 16" className="w-full h-full">
                {isBase && <circle cx="8" cy="8" r="2.5" fill={color} opacity="0.8" />}
                {isMid && (
                  <g>
                    <rect x="4" y="4" width="3.5" height="3.5" fill={color} />
                    <rect x="9" y="9" width="3.5" height="3.5" fill="#e76f51" />
                  </g>
                )}
                {isTop && (
                  <path
                    d="M 3 8 L 7 12 L 13 4"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="square"
                    fill="none"
                  />
                )}
              </svg>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-6 select-none overflow-hidden text-[9px] font-mono lowercase tracking-[0.18em]">
      {/* 3D Perspective Stage */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleResetTilt}
        className="relative w-full flex-1 min-h-[220px] sm:min-h-[260px] flex items-center justify-center cursor-grab active:cursor-grabbing my-4"
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative w-[190px] h-[135px] sm:w-[230px] sm:h-[160px] transition-transform duration-300 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tiltAngle.x}deg) rotateZ(${tiltAngle.y}deg)`,
          }}
        >
          {/* Layer 0: Bottom Plane */}
          <div
            onClick={() => setActiveLayer(activeLayer === 0 ? null : 0)}
            className={`absolute inset-0 transition-all duration-300 ${
              activeLayer !== null && activeLayer !== 0 ? 'opacity-25' : 'opacity-100'
            }`}
            style={{ transform: `translateZ(${-separation}px)` }}
          >
            {renderLayerContent(0)}
          </div>

          {/* Layer 1: Middle Plane */}
          <div
            onClick={() => setActiveLayer(activeLayer === 1 ? null : 1)}
            className={`absolute inset-0 transition-all duration-300 ${
              activeLayer !== null && activeLayer !== 1 ? 'opacity-25' : 'opacity-100'
            }`}
            style={{ transform: `translateZ(0px)` }}
          >
            {renderLayerContent(1)}
          </div>

          {/* Layer 2: Top Plane */}
          <div
            onClick={() => setActiveLayer(activeLayer === 2 ? null : 2)}
            className={`absolute inset-0 transition-all duration-300 ${
              activeLayer !== null && activeLayer !== 2 ? 'opacity-25' : 'opacity-100'
            }`}
            style={{ transform: `translateZ(${separation}px)` }}
          >
            {renderLayerContent(2)}
          </div>
        </div>
      </div>

      {/* Micro Interactive Controls Bar with generous spacing */}
      {interactive && (
        <div className="pt-4 flex items-center justify-between text-[9px] font-mono tracking-[0.18em] text-neutral-400">
          <div className="flex items-center gap-3">
            <span>separation</span>
            <input
              type="range"
              min="0"
              max="70"
              value={separation}
              onChange={(e) => setSeparation(Number(e.target.value))}
              aria-label="layer explosion distance"
              className="w-16 accent-neutral-800 cursor-pointer h-0.5 bg-neutral-200"
            />
            <span className="text-neutral-600">{separation}px</span>
          </div>

          <button
            onClick={() => setSeparation(separation > 10 ? 0 : 44)}
            className="hover:text-neutral-900 transition-colors"
          >
            {separation === 0 ? '[ explode ]' : '[ compact ]'}
          </button>
        </div>
      )}
    </div>
  );
};
