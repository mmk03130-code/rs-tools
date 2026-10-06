import React, { useState } from 'react';
import { ExternalLink, X, Sparkles } from 'lucide-react';

interface AdSlotProps {
  slotType?: 'banner' | 'sidebar' | 'in-tool';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slotType = 'banner', className = '' }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (slotType === 'banner') {
    return (
      <div className={`relative overflow-hidden rounded-xl border border-slate-800 light:border-slate-200 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 light:from-slate-50 light:to-blue-50 p-4 transition-all ${className}`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Sponsor
                </span>
                <span className="text-xs font-semibold text-slate-200 light:text-slate-800">
                  Deploy Lightning Fast with Zero Server Config
                </span>
              </div>
              <p className="text-[11px] text-slate-400 light:text-slate-600">
                Host client-side static apps, Vite apps, and Next.js instantly on Vercel or Netlify free tiers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 light:bg-white text-slate-200 light:text-slate-800 hover:text-white hover:bg-slate-700 light:hover:bg-slate-100 border border-slate-700 light:border-slate-300 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Learn More</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss ad"
              className="p-1 rounded-md text-slate-500 hover:text-slate-400 hover:bg-slate-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // in-tool / sidebar variant
  return (
    <div className={`p-3.5 rounded-lg border border-dashed border-slate-800 light:border-slate-200 text-center ${className}`}>
      <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">
        Affiliate Space
      </span>
      <p className="text-xs text-slate-400 mb-2">
        Need secure cloud storage or developer API credits?
      </p>
      <a
        href="https://github.com/sponsors"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-xs text-blue-400 hover:underline font-medium"
      >
        Become a project sponsor →
      </a>
    </div>
  );
};
