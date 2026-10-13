import React, { useState } from 'react';
import { X, Copy, Check, Rocket, Globe, Terminal, Shield, ArrowRight, Cloud, ExternalLink } from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<'cloudflare' | 'vercel' | 'netlify'>('cloudflare');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e1117] border border-[#232936] p-6 sm:p-8 text-zinc-100 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-[#181d28] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-yellow-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-lg">
            <Cloud className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">Deploy & Transfer to Cloudflare</h3>
              <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                Cloudflare Pages
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Zero server cost, 300+ global edge cities, unlimited bandwidth, and instant client-side execution.
            </p>
          </div>
        </div>

        {/* Why Cloudflare is Ideal */}
        <div className="p-4 rounded-2xl bg-[#141822] border border-[#262d3c] mb-6 text-xs text-zinc-300 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-semibold text-amber-300">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Pre-Configured for Cloudflare Edge Architecture</span>
          </div>
          <p className="text-zinc-400">
            Because <strong>RS Tools</strong> executes all image compression, PDF manipulations, ATS resume compiling, and cryptographic hashing in-browser via WebAssembly, hosting on <strong>Cloudflare Pages</strong> is 100% free with 0ms backend delay.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-[#1c2230] text-emerald-400 border border-emerald-500/20">✓ wrangler.toml ready</span>
            <span className="px-2 py-0.5 rounded bg-[#1c2230] text-amber-400 border border-amber-500/20">✓ public/_headers configured</span>
            <span className="px-2 py-0.5 rounded bg-[#1c2230] text-sky-400 border border-sky-500/20">✓ public/_redirects SPA routing</span>
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090b0f] border border-[#212634] mb-6">
          <button
            onClick={() => setSelectedPlatform('cloudflare')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
              selectedPlatform === 'cloudflare'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Cloudflare Pages (Recommended)</span>
          </button>
          <button
            onClick={() => setSelectedPlatform('vercel')}
            className={`py-2 px-4 rounded-lg text-xs font-semibold transition-all ${
              selectedPlatform === 'vercel'
                ? 'bg-[#1a1f2c] text-white border border-[#2e3648]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Vercel
          </button>
          <button
            onClick={() => setSelectedPlatform('netlify')}
            className={`py-2 px-4 rounded-lg text-xs font-semibold transition-all ${
              selectedPlatform === 'netlify'
                ? 'bg-[#1a1f2c] text-white border border-[#2e3648]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Netlify
          </button>
        </div>

        {/* CLOUDFLARE INSTRUCTIONS */}
        {selectedPlatform === 'cloudflare' && (
          <div className="space-y-4 mb-6 text-xs">
            {/* Method A: 1-Command CLI Deploy with Wrangler */}
            <div className="p-4 rounded-2xl bg-[#121620] border border-[#222836]">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-orange-400" />
                  <span>Method 1: Direct 1-Line Deploy (Wrangler CLI)</span>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
                  Fastest
                </span>
              </div>
              <p className="text-zinc-400 mb-3 leading-relaxed">
                Build the project locally and push directly to Cloudflare Pages without leaving your terminal:
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono bg-[#090b0f] px-3 py-2 rounded-xl border border-[#1e2330] text-[11px] text-zinc-300">
                  <code>npm run build && npx wrangler pages deploy dist</code>
                  <button
                    onClick={() => copyToClipboard('npm run build && npx wrangler pages deploy dist', 1)}
                    className="p-1 hover:text-white text-zinc-400 transition-colors"
                    title="Copy command"
                  >
                    {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between font-mono bg-[#090b0f] px-3 py-2 rounded-xl border border-[#1e2330] text-[11px] text-zinc-300">
                  <code>npm run deploy:cloudflare</code>
                  <button
                    onClick={() => copyToClipboard('npm run deploy:cloudflare', 2)}
                    className="p-1 hover:text-white text-zinc-400 transition-colors"
                    title="Copy shortcut"
                  >
                    {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Method B: Git Integration on Cloudflare Dashboard */}
            <div className="p-4 rounded-2xl bg-[#121620] border border-[#222836] space-y-3">
              <div className="font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>Method 2: Cloudflare Dashboard (Continuous Git CI/CD)</span>
              </div>

              <ol className="space-y-2.5 text-zinc-300 list-decimal list-inside pl-1">
                <li className="leading-relaxed">
                  Log in to the <a href="https://dash.cloudflare.com" target="_blank" rel="noreferrer" className="text-orange-400 underline font-semibold inline-flex items-center gap-0.5">Cloudflare Dashboard <ExternalLink className="w-3 h-3" /></a> and navigate to <strong>Workers & Pages</strong> &gt; <strong>Create application</strong> &gt; <strong>Pages</strong> &gt; <strong>Connect to Git</strong>.
                </li>
                <li className="leading-relaxed">
                  Select your repository (GitHub or GitLab) containing this codebase.
                </li>
                <li className="leading-relaxed">
                  Configure Build Settings:
                  <div className="mt-2 p-3 rounded-xl bg-[#090b0f] border border-[#1e2330] font-mono text-[11px] space-y-1 text-zinc-400">
                    <div>Framework preset: <span className="text-amber-300 font-bold">Vite</span></div>
                    <div>Build command: <span className="text-amber-300 font-bold">npm run build</span></div>
                    <div>Build output directory: <span className="text-amber-300 font-bold">dist</span></div>
                    <div>Package manager: <span className="text-emerald-400 font-bold">npm (package-lock.json)</span></div>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-2">
                    💡 <strong>Tip</strong>: We configured <code className="text-amber-300">package-lock.json</code> for seamless Node 20 / npm CI compatibility in Cloudflare Pages.
                  </p>
                </li>
                <li className="leading-relaxed">
                  Click <strong>"Save and Deploy"</strong>. Cloudflare's global edge network will build and publish your site in seconds at a free <code className="text-orange-300">*.pages.dev</code> URL with free Universal SSL.
                </li>
              </ol>
            </div>

            {/* Custom Domain Setup on Cloudflare */}
            <div className="p-4 rounded-2xl bg-[#121620] border border-[#222836]">
              <div className="font-bold text-white mb-1.5 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Custom Domain & DNS Setup</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                In your Cloudflare Pages project settings, go to <strong>Custom domains</strong> &gt; <strong>Set up a custom domain</strong> (e.g. <code>tools.yourdomain.com</code>). If your domain is already managed on Cloudflare DNS, the CNAME record is provisioned automatically with zero downtime.
              </p>
            </div>
          </div>
        )}

        {/* VERCEL INSTRUCTIONS */}
        {selectedPlatform === 'vercel' && (
          <div className="space-y-3 mb-6 text-xs text-zinc-300">
            <div className="p-4 rounded-2xl bg-[#121620] border border-[#222836]">
              <div className="font-bold text-white mb-2">Deploy with Vercel CLI</div>
              <div className="flex items-center justify-between font-mono bg-[#090b0f] px-3 py-2 rounded-xl border border-[#1e2330] text-[11px] text-zinc-300">
                <code>npx vercel --prod</code>
                <button
                  onClick={() => copyToClipboard('npx vercel --prod', 3)}
                  className="hover:text-white text-zinc-400"
                >
                  {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-zinc-400 mt-3">
                Or import directly on <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-amber-400 underline">vercel.com</a> with output directory <code>dist</code> and build command <code>npm run build</code>.
              </p>
            </div>
          </div>
        )}

        {/* NETLIFY INSTRUCTIONS */}
        {selectedPlatform === 'netlify' && (
          <div className="space-y-3 mb-6 text-xs text-zinc-300">
            <div className="p-4 rounded-2xl bg-[#121620] border border-[#222836]">
              <div className="font-bold text-white mb-2">Deploy with Netlify CLI</div>
              <div className="flex items-center justify-between font-mono bg-[#090b0f] px-3 py-2 rounded-xl border border-[#1e2330] text-[11px] text-zinc-300">
                <code>npx netlify deploy --prod --dir=dist</code>
                <button
                  onClick={() => copyToClipboard('npx netlify deploy --prod --dir=dist', 4)}
                  className="hover:text-white text-zinc-400"
                >
                  {copiedIndex === 4 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-zinc-400 mt-3">
                Pre-configured with root <code>netlify.toml</code>. Connect your repo on <a href="https://app.netlify.com" target="_blank" rel="noreferrer" className="text-amber-400 underline">netlify.com</a>.
              </p>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#222836] flex items-center justify-between">
          <div className="text-[11px] text-zinc-500 font-mono">
            Configuration: wrangler.toml · _headers · _redirects
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 transition-all shadow-md shadow-amber-500/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
