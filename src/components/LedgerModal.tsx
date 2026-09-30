import React, { useState } from 'react';
import { X, Check, Copy } from 'lucide-react';

interface LedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRANSACTIONS = [
  { id: 'tx-8041', type: 'burn & compose', count: '80 credits', hash: '0x8f2a...c019', timestamp: '12m ago', status: 'confirmed' },
  { id: 'tx-8040', type: 'overprint composite', count: '3 layers', hash: '0x3e11...9b42', timestamp: '1h ago', status: 'confirmed' },
  { id: 'tx-8039', type: 'edition mint #09', count: '1 statement', hash: '0x7a89...11c4', timestamp: '4h ago', status: 'confirmed' },
  { id: 'tx-8038', type: 'running balance offset', count: '40 credits', hash: '0x10b7...d32a', timestamp: '1d ago', status: 'confirmed' },
  { id: 'tx-8037', type: 'initial genesis', count: '1,526 statements', hash: '0x0001...dead', timestamp: 'epoch 0', status: 'genesis' },
];

export const LedgerModal: React.FC<LedgerModalProps> = ({ isOpen, onClose }) => {
  const [copiedTx, setCopiedTx] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedTx(hash);
    setTimeout(() => setCopiedTx(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/25 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 animate-fade-in text-[9px] font-mono lowercase tracking-normal">
      <div className="relative w-full max-w-2xl bg-white border border-neutral-200 shadow-xl p-6 sm:p-8 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <span className="text-neutral-900 font-normal">the running ledger // 03 metadata</span>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label="close ledger"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stats Grid with generous padding */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[9px] font-mono tracking-[0.16em]">
          <div className="p-4 border border-neutral-200 bg-neutral-50/50">
            <div className="text-neutral-400">max supply</div>
            <div className="text-neutral-900 mt-1">1,526</div>
          </div>
          <div className="p-4 border border-neutral-200 bg-neutral-50/50">
            <div className="text-neutral-400">burned</div>
            <div className="text-neutral-900 mt-1">1,446</div>
          </div>
          <div className="p-4 border border-neutral-200 bg-neutral-50/50">
            <div className="text-neutral-400">balance</div>
            <div className="text-neutral-900 mt-1">80 units</div>
          </div>
          <div className="p-4 border border-neutral-200 bg-neutral-50/50">
            <div className="text-neutral-400">rating</div>
            <div className="text-neutral-900 mt-1">aaa // 99.9%</div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="border border-neutral-200 overflow-x-auto">
          <table className="w-full text-left text-[9px] font-mono tracking-[0.16em]">
            <thead>
              <tr className="bg-neutral-50/50 border-b border-neutral-200 text-neutral-400">
                <th className="p-3.5 pl-4">id</th>
                <th className="p-3.5">type</th>
                <th className="p-3.5">units</th>
                <th className="p-3.5">hash</th>
                <th className="p-3.5 text-right pr-4">status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-neutral-50/50">
                  <td className="p-3.5 pl-4 text-neutral-900">{tx.id}</td>
                  <td className="p-3.5 text-neutral-600">{tx.type}</td>
                  <td className="p-3.5 text-neutral-900">{tx.count}</td>
                  <td className="p-3.5 text-neutral-400">
                    <button
                      onClick={() => handleCopy(tx.hash)}
                      className="inline-flex items-center gap-1 hover:text-neutral-900"
                    >
                      <span>{tx.hash}</span>
                      {copiedTx === tx.hash ? <Check className="w-2.5 h-2.5 text-emerald-600" /> : <Copy className="w-2.5 h-2.5" />}
                    </button>
                  </td>
                  <td className="p-3.5 text-right pr-4 text-neutral-700">
                    {tx.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="pt-3 flex items-center justify-between text-neutral-400">
          <span>on-chain synchronized</span>
          <button
            onClick={onClose}
            className="hover:text-neutral-900"
          >
            [ close ]
          </button>
        </div>
      </div>
    </div>
  );
};
