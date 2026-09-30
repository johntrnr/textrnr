import React, { useState } from 'react';
import { ViewTab } from '../types';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onOpenInquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenInquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; tab: ViewTab }[] = [
    { label: 'home', tab: 'home' },
    { label: 'exhibition', tab: 'exhibition' },
    { label: 'archive', tab: 'works' },
    { label: 'tools', tab: 'tools' },
    { label: 'about', tab: 'about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xs border-b border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 h-14 flex items-center justify-between">
        {/* Zone 1: Single Text Element Wordmark */}
        <button
          onClick={() => {
            onSelectTab('home');
            setMobileMenuOpen(false);
          }}
          className="text-[9px] font-mono tracking-normal text-neutral-900 lowercase hover:opacity-50 transition-opacity font-bold"
        >
          textrnr
        </button>

        {/* Zone 2: Navigation Links (9px font size, lowercase, normal tracking) */}
        <nav className="hidden md:flex items-center gap-10 text-[9px] font-mono lowercase tracking-normal text-neutral-400">
          {navLinks.map((link) => {
            const isActive = currentTab === link.tab;
            return (
              <button
                key={link.tab}
                onClick={() => onSelectTab(link.tab)}
                className={`transition-colors py-1 ${
                  isActive
                    ? 'text-neutral-900 border-b border-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={onOpenInquiry}
            className="text-[9px] font-mono lowercase tracking-normal text-neutral-500 hover:text-neutral-900 transition-colors border-b border-transparent hover:border-neutral-900 pb-0.5"
          >
            inquire
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            aria-label="toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-[9px] font-mono lowercase tracking-normal">
            {navLinks.map((link) => (
              <button
                key={link.tab}
                onClick={() => {
                  onSelectTab(link.tab);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-neutral-100 flex items-center justify-between ${
                  currentTab === link.tab ? 'text-neutral-900 font-medium' : 'text-neutral-400'
                }`}
              >
                <span>{link.label}</span>
                {currentTab === link.tab && <span>·</span>}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="text-left py-2 text-neutral-900"
            >
              inquire
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
