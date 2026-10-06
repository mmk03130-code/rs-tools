import React, { useState } from 'react';
import { X, Copy, Check, Rocket, Globe, Terminal, Shield, ArrowRight } from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-slate-100 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Deploy RS Tools 100% Free</h3>
            <p className="text-xs text-slate-400">
              Zero hosting cost, zero backend maintenance, and global edge CDN delivery.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 mb-6 text-xs text-slate-300 leading-relaxed">
          Because <strong>RS Tools</strong> performs all file compression, PDF encryption, image processing, and code transformations strictly on the client side inside the user's browser, you can host this entire web suite on free static hosting tiers without paying any cloud server bills!
        </div>

        {/* Option 1: Vercel */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-black text-white flex items-center justify-center text-xs font-bold border border-slate-700">
              ▲
            </div>
            <h4 className="font-semibold text-sm text-white">Option 1: Deploy on Vercel (Recommended)</h4>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
              Free Tier
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="font-medium text-slate-200 mb-1">Step 1: Push repository to GitHub or GitLab</div>
              <div className="flex items-center justify-between font-mono bg-slate-900 p-2 rounded text-[11px] text-slate-400">
                <code>git push origin main</code>
                <button
                  onClick={() => copyToClipboard('git push origin main', 1)}
                  className="hover:text-white"
                >
                  {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="font-medium text-slate-200 mb-1">Step 2: Import into Vercel</div>
              <p className="text-slate-400 leading-relaxed">
                Log in to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">vercel.com</a>, click <strong>"Add New Project"</strong>, and select your repository. Vercel automatically detects the Vite framework.
              </p>
              <div className="mt-2 text-[11px] text-slate-400 font-mono">
                Build Command: <code className="text-blue-300">npm run build</code> | Output Directory: <code className="text-blue-300">dist</code>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="font-medium text-slate-200 mb-1">Step 3: CLI 1-Line Deploy (Alternative)</div>
              <div className="flex items-center justify-between font-mono bg-slate-900 p-2 rounded text-[11px] text-slate-400">
                <code>npx vercel --prod</code>
                <button
                  onClick={() => copyToClipboard('npx vercel --prod', 2)}
                  className="hover:text-white"
                >
                  {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Option 2: Netlify */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
              N
            </div>
            <h4 className="font-semibold text-sm text-white">Option 2: Deploy on Netlify</h4>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
              Free Tier
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <p className="text-slate-400 leading-relaxed">
                Connect your repository on <a href="https://app.netlify.com" target="_blank" rel="noreferrer" className="text-teal-400 underline">netlify.com</a>. Set the publish directory to <code>dist</code> and build command to <code>npm run build</code>. Netlify provides free SSL, automated preview branches, and custom domains.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
