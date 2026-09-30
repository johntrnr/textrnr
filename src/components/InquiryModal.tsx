import React, { useState } from 'react';
import { X, Check, Copy, Send } from 'lucide-react';
import { PROJECTS, ARTIST_INFO } from '../data/projectsData';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultWorkTitle?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultWorkTitle = ''
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [work, setWork] = useState(defaultWorkTitle || '01 compose (the 80-statement matrix)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(ARTIST_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setInstitution('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/25 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 animate-fade-in text-[9px] font-mono lowercase tracking-normal">
      <div className="relative w-full max-w-lg bg-white border border-neutral-200 shadow-xl p-6 sm:p-8">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <span className="text-neutral-900 font-normal">studio inquiry // textrnr</span>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label="close modal"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-4 tracking-[0.18em]">
            <div className="w-8 h-8 rounded-full border border-neutral-900 mx-auto flex items-center justify-center">
              <Check className="w-4 h-4 text-neutral-900" />
            </div>
            <div className="text-neutral-900 font-normal">
              inquiry inscribed
            </div>
            <p className="text-neutral-500 max-w-xs mx-auto font-sans leading-relaxed">
              thank you. the studio archive will reply to <span className="text-neutral-900">{email}</span> directly.
            </p>
            <div className="pt-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-neutral-900 text-white tracking-[0.2em]"
              >
                close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Quick Email Copy Callout */}
            <div className="p-3 bg-neutral-50 border border-neutral-200 flex items-center justify-between tracking-[0.16em]">
              <span className="text-neutral-400">studio email:</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 text-neutral-900 hover:underline"
              >
                <span>{ARTIST_INFO.email}</span>
                {copiedEmail ? <Check className="w-2.5 h-2.5 text-emerald-600" /> : <Copy className="w-2.5 h-2.5 text-neutral-400" />}
              </button>
            </div>

            <div>
              <label className="block tracking-[0.18em] text-neutral-400 mb-1.5">
                name / curator *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
                className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none bg-white text-neutral-900 font-mono text-[9px] lowercase"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block tracking-[0.18em] text-neutral-400 mb-1.5">
                  email address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none bg-white text-neutral-900 font-mono text-[9px] lowercase"
                />
              </div>

              <div>
                <label className="block tracking-[0.18em] text-neutral-400 mb-1.5">
                  institution / collector
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="collection"
                  className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none bg-white text-neutral-900 font-mono text-[9px] lowercase"
                />
              </div>
            </div>

            <div>
              <label className="block tracking-[0.18em] text-neutral-400 mb-1.5">
                work of interest
              </label>
              <select
                value={work}
                onChange={(e) => setWork(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none bg-white text-neutral-900 font-mono text-[9px] lowercase"
              >
                {PROJECTS.map((p) => (
                  <option key={p.id} value={`${p.number} ${p.title}`}>
                    {p.number} {p.title}
                  </option>
                ))}
                <option value="general commission / monograph">general commission / monograph</option>
              </select>
            </div>

            <div>
              <label className="block tracking-[0.18em] text-neutral-400 mb-1.5">
                message / inscription
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="inquire regarding edition availability, loan, or acquisition..."
                className="w-full px-3 py-2 border border-neutral-200 focus:border-neutral-900 focus:outline-none bg-white text-neutral-900 font-mono text-[9px] resize-none lowercase"
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-neutral-400 tracking-[0.18em] hover:text-neutral-900 transition-colors"
              >
                cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white tracking-[0.2em] hover:bg-neutral-800 transition-colors"
              >
                <Send className="w-2.5 h-2.5" />
                transmit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
