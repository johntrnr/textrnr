import React, { useMemo } from 'react';

interface OverprintCompositeProps {
  seed?: number;
  className?: string;
}

export const OverprintComposite: React.FC<OverprintCompositeProps> = ({
  seed = 99,
  className = ''
}) => {
  // 8 cols x 10 rows matching the reference image's overprinted frame
  const glyphs = useMemo(() => {
    const list = [];
    for (let i = 0; i < 80; i++) {
      const s = seed * 31 + i * 19;
      const r1 = Math.sin(s) * 10000;
      const rand1 = r1 - Math.floor(r1);
      const r2 = Math.sin(s + 2) * 10000;
      const rand2 = r2 - Math.floor(r2);

      // Micro chromatic fringe color peeking under the black overprint
      const colors = ['#00a8e8', '#ff0055', '#ffcc00', '#10b981', '#7209b7', '#f77f00'];
      const fringe1 = colors[Math.floor(rand1 * colors.length)];
      const fringe2 = colors[Math.floor(rand2 * colors.length)];

      list.push({
        id: i,
        fringe1,
        fringe2,
        density: 0.7 + rand1 * 0.3,
        offset: (rand2 - 0.5) * 1.5
      });
    }
    return list;
  }, [seed]);

  return (
    <div className={`w-full bg-white select-none ${className}`}>
      {/* Framed White Mat with Thin Border */}
      <div className="border border-neutral-300 p-2 sm:p-4 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div
          className="grid grid-cols-8 gap-[3px] sm:gap-[5px]"
          style={{ gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }}
        >
          {glyphs.map((item) => (
            <div
              key={item.id}
              className="aspect-square flex items-center justify-center p-0.5 relative group hover:bg-neutral-50 transition-colors"
            >
              <svg viewBox="0 0 20 20" className="w-full h-full">
                {/* Layer 1: Chromatic under-print fringe */}
                <rect
                  x={4.5 + item.offset}
                  y={4.5 + item.offset}
                  width="11"
                  height="11"
                  fill={item.fringe1}
                  opacity="0.8"
                />
                <circle
                  cx={15 - item.offset}
                  cy={15 - item.offset}
                  r="1.2"
                  fill={item.fringe2}
                />

                {/* Layer 2: Heavy Key Black overprint with square aperture */}
                <rect
                  x="4"
                  y="4"
                  width="12"
                  height="12"
                  fill="#0f0f10"
                  opacity="0.95"
                />

                {/* Layer 3: Central micro aperture / cross cut revealing chromatic center */}
                <rect
                  x="8"
                  y="8"
                  width="4"
                  height="4"
                  fill={item.fringe2}
                  opacity="0.9"
                />

                {/* Layer 4: Micro checkmark or cross in dense overprint */}
                <path
                  d="M 6 10 L 9 13 L 14 7"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeLinecap="square"
                  fill="none"
                  opacity="0.85"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
