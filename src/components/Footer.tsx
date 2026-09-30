import React from 'react';
import { ARTIST_INFO } from '../data/projectsData';
import { ViewTab } from '../types';

interface FooterProps {
  onOpenInquiry: () => void;
  onOpenLedger: () => void;
  onSelectTab?: (tab: ViewTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry, onOpenLedger, onSelectTab }) => {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white mt-20 text-[9px] font-mono lowercase tracking-normal text-neutral-400">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 py-8 sm:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Artist Identification */}
        <div className="flex items-center gap-3 text-neutral-700">
          <span>{ARTIST_INFO.alias}</span>
          <span className="text-neutral-300">·</span>
          <span className="text-neutral-400">systematic art & computational editions</span>
        </div>

        {/* Center/Right: Micro Links with generous gap */}
        <div className="flex flex-wrap items-center gap-6 text-neutral-500">
          {onSelectTab && (
            <>
              <button onClick={() => onSelectTab('home')} className="hover:text-neutral-900 transition-colors">
                home
              </button>
              <span>/</span>
              <button onClick={() => onSelectTab('tools')} className="hover:text-neutral-900 transition-colors">
                tools
              </button>
              <span>/</span>
            </>
          )}
          <button onClick={onOpenInquiry} className="hover:text-neutral-900 transition-colors">
            inquiry
          </button>
          <span>/</span>
          <button onClick={onOpenLedger} className="hover:text-neutral-900 transition-colors">
            ledger
          </button>
          <span>/</span>
          <a href="mailto:textrnr@gmail.com" className="hover:text-neutral-900 transition-colors">
            email
          </a>
          <span>/</span>
          <span className="text-neutral-300">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
