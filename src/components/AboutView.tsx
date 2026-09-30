import React, { useState } from 'react';
import { ARTIST_INFO } from '../data/projectsData';
import { Copy, Check, Mail } from 'lucide-react';

interface AboutViewProps {
  onOpenInquiry: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenInquiry }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(ARTIST_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="w-full space-y-16 sm:space-y-20 text-[9px] font-mono lowercase tracking-[0.2em]">
      {/* ─────────────────────────────────────────────────────────────
          1. ARTIST PROFILE with generous padding
      ───────────────────────────────────────────────────────────── */}
      <section className="border border-neutral-200 p-8 sm:p-12 md:p-16 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="tracking-[0.25em] text-neutral-400">
              artist profile
            </span>
            <h1 className="text-[9px] font-mono tracking-[0.26em] text-neutral-900 font-normal">
              {ARTIST_INFO.name}
            </h1>
            <p className="tracking-[0.2em] text-neutral-500">
              {ARTIST_INFO.role} · {ARTIST_INFO.location}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3 py-2 border border-neutral-200 hover:border-neutral-900 text-neutral-800 transition-colors"
              >
                <Mail className="w-2.5 h-2.5" />
                <span>{ARTIST_INFO.email}</span>
                {copiedEmail ? (
                  <Check className="w-2.5 h-2.5 text-emerald-600 ml-1" />
                ) : (
                  <Copy className="w-2.5 h-2.5 text-neutral-400 ml-1" />
                )}
              </button>

              <button
                onClick={onOpenInquiry}
                className="px-4 py-2 border border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
              >
                inquire
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 text-neutral-600 leading-relaxed border-t lg:border-t-0 lg:border-l border-neutral-200 lg:pl-10 pt-8 lg:pt-0">
            <p>
              textrnr is a computational artist working at the intersection of post-minimalism,
              swiss concrete art, and algorithmic consensus systems.
            </p>
            <p>
              influenced by the systematic methodologies of sol lewitt, karl gerstner, and conceptual
              ledger art, textrnr constructs generative frameworks wherein geometric rules, physical
              overprinting tolerances, and balance sheets synthesize into quiet, disciplined artifacts.
            </p>
            <p>
              rather than viewing code as a tool for visual ornament, textrnr treats data structures,
              smart contracts, and risographic registration as primary plastic matter—reducing noise
              to celebrate the absolute purity of the structural coordinate.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. STUDIO PRINCIPLES (4 Minimal Columns with generous padding)
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <h2 className="tracking-[0.24em] text-neutral-900 font-normal">
            systematic principles & manifesto
          </h2>
          <span className="tracking-[0.2em] text-neutral-400">axioms 01–04</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-neutral-200 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 bg-white">
          {ARTIST_INFO.manifesto.map((item) => (
            <div key={item.rule} className="p-6 sm:p-8 space-y-3">
              <span className="text-neutral-300 font-light">
                {item.rule}
              </span>
              <h3 className="tracking-[0.2em] text-neutral-900 font-normal">
                {item.title}
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. EXHIBITIONS & COLLECTIONS
      ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
        {/* Exhibitions */}
        <div className="md:col-span-7 space-y-4">
          <div className="pb-3 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="tracking-[0.24em] text-neutral-900 font-normal">
              selected exhibitions
            </h2>
            <span className="tracking-[0.2em] text-neutral-400">2024–2025</span>
          </div>

          <div className="border border-neutral-200 divide-y divide-neutral-200 bg-white">
            {ARTIST_INFO.exhibitions.map((ex, i) => (
              <div key={i} className="p-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-[9px]">
                <div>
                  <div className="text-neutral-900">{ex.title}</div>
                  <div className="text-neutral-400 pt-0.5">{ex.venue}, {ex.city}</div>
                </div>
                <div className="text-neutral-400 whitespace-nowrap pt-1 sm:pt-0">
                  {ex.year} · [{ex.type}]
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div className="md:col-span-5 space-y-4">
          <div className="pb-3 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="tracking-[0.24em] text-neutral-900 font-normal">
              institutional collections
            </h2>
            <span className="tracking-[0.2em] text-neutral-400">archive</span>
          </div>

          <div className="border border-neutral-200 p-6 bg-white space-y-3.5 text-neutral-600">
            {ARTIST_INFO.collections.map((col, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="text-neutral-300">/</span>
                <span>{col}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. INQUIRY ROW
      ───────────────────────────────────────────────────────────── */}
      <section className="border border-neutral-200 p-6 sm:p-10 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <h3 className="tracking-[0.22em] text-neutral-900 font-normal">
            institutional & private acquisition
          </h3>
          <p className="text-neutral-400 tracking-[0.18em]">
            all editions accompanied by signed impressum certification and on-chain provenance.
          </p>
        </div>

        <button
          onClick={onOpenInquiry}
          className="px-5 py-2.5 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors whitespace-nowrap self-start sm:self-center"
        >
          initiate inquiry
        </button>
      </section>
    </div>
  );
};
