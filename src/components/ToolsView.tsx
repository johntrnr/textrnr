import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ToolItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  url: string;
  status: string;
}

const TOOLS: ToolItem[] = [
  {
    id: 'phasr',
    name: 'phasr',
    subtitle: 'multi-effects',
    description:
      'browser-native multi-pass shader engine applying chromatic phase drift, optical halftoning, and risograph grain simulation directly onto vector and canvas assets.',
    url: 'https://phasr.textrnr.com',
    status: 'online'
  },
  {
    id: 'framr',
    name: 'framr',
    subtitle: 'photoshop killer',
    description:
      'ultra-lightweight parametric framing utility calculating gallery mats, hairline registration marks, dynamic impressum typography, and lossless export.',
    url: 'https://framr.textrnr.com',
    status: 'online'
  },
  {
    id: 'gradr',
    name: 'gradr',
    subtitle: 'gradients maker',
    description:
      'computational spectral gradient generator synthesizing uncompressed color transitions with perceptual okklab curves and anti-banding blue-noise dither.',
    url: 'https://gradr.textrnr.com',
    status: 'online'
  }
];

export const ToolsView: React.FC = () => {
  return (
    <div className="w-full space-y-12 text-[9px] font-mono lowercase tracking-normal">
      {/* Overview header */}


      {/* Minimal Tools Links List */}
      <div className="border border-neutral-200 divide-y divide-neutral-200 bg-white">
        {TOOLS.map((tool) => (
          <a
            key={tool.id}
            href={tool.url}
            target="_blank"
            rel="noreferrer"
            className="p-8 sm:p-12 flex flex-col md:flex-row md:items-baseline justify-between gap-6 hover:bg-neutral-50/50 transition-colors group block"
          >
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="text-neutral-900 font-normal group-hover:underline">
                  {tool.name}
                </span>
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-500">{tool.subtitle}</span>
              </div>
              <p className="text-neutral-500 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-neutral-400 group-hover:text-neutral-900 whitespace-nowrap self-start md:self-auto">
              <span>open {tool.name}</span>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
