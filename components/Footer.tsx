import React from 'react';
import { ShieldCheck, Heart, Rocket, Globe, FileCode2 } from 'lucide-react';
import { ToolCategory, ToolItem } from '../types/tools';
import { TOOLS_LIST } from '../data/toolsList';

interface FooterProps {
  onSelectTool: (tool: ToolItem) => void;
  onOpenDeployGuide: () => void;
  onOpenSitemap: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTool,
  onOpenDeployGuide,
  onOpenSitemap,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const imageTools = TOOLS_LIST.filter(t => t.category === 'image').slice(0, 6);
  const pdfTools = TOOLS_LIST.filter(t => t.category === 'pdf').slice(0, 6);
  const devTools = TOOLS_LIST.filter(t => t.category === 'developer').slice(0, 6);

  return (
    <footer className="mt-20 border-t border-slate-800 light:border-slate-200 bg-slate-950/60 light:bg-slate-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Privacy Pledge Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/20 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-100 text-sm mb-1">
                Zero-Upload Client-Side Architecture
              </h4>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                All files, images, PDFs, and data formats are processed 100% locally in your web browser utilizing Web Workers, Canvas 2D, and WebAssembly. Your documents never touch any remote server, ensuring absolute privacy and zero latency.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenDeployGuide}
            className="flex-shrink-0 px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <Rocket className="w-4 h-4" />
            <span>Deploy Your Own Free Copy</span>
          </button>
        </div>

        {/* Directory Links Grid (SEO Optimized Internal Links) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                RS
              </div>
              <span className="font-bold text-base text-slate-100 light:text-slate-900">
                RS tools
              </span>
            </div>
            <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed mb-4">
              A comprehensive open-source suite of 50+ free utilities for developers, designers, and professionals. Fast, private, and serverless.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <button
                onClick={onOpenSitemap}
                className="hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>XML Sitemap</span>
              </button>
              <span>·</span>
              <button
                onClick={onOpenDeployGuide}
                className="hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Hosting</span>
              </button>
            </div>
          </div>

          {/* Image Utilities */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300 light:text-slate-700 mb-3">
              Image Tools
            </h5>
            <ul className="space-y-2 text-xs text-slate-400 light:text-slate-600">
              {imageTools.map(tool => (
                <li key={tool.id}>
                  <button
                    onClick={() => onSelectTool(tool)}
                    className="hover:text-blue-400 text-left transition-colors"
                  >
                    {tool.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* PDF Utilities */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300 light:text-slate-700 mb-3">
              PDF & Docs
            </h5>
            <ul className="space-y-2 text-xs text-slate-400 light:text-slate-600">
              {pdfTools.map(tool => (
                <li key={tool.id}>
                  <button
                    onClick={() => onSelectTool(tool)}
                    className="hover:text-blue-400 text-left transition-colors"
                  >
                    {tool.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Tools */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300 light:text-slate-700 mb-3">
              Developer Suite
            </h5>
            <ul className="space-y-2 text-xs text-slate-400 light:text-slate-600">
              {devTools.map(tool => (
                <li key={tool.id}>
                  <button
                    onClick={() => onSelectTool(tool)}
                    className="hover:text-blue-400 text-left transition-colors"
                  >
                    {tool.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    const r = TOOLS_LIST.find(t => t.id === 'resume-builder');
                    if (r) onSelectTool(r);
                  }}
                  className="text-blue-400 hover:text-blue-300 font-medium text-left transition-colors"
                >
                  ATS Resume & CV Engine →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 light:border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} RS tools. Free, MIT Licensed, 100% Client-Side.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-slate-500">
            <span>Engineered for 100/100 Lighthouse performance & privacy</span>
            <span className="text-slate-700 light:text-slate-300">·</span>
            <button
              onClick={onOpenPrivacy}
              className="text-slate-400 hover:text-blue-400 light:text-slate-600 light:hover:text-blue-600 transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Compliance Privacy
            </button>
            <span className="text-slate-700 light:text-slate-300">·</span>
            <button
              onClick={onOpenTerms}
              className="text-slate-400 hover:text-blue-400 light:text-slate-600 light:hover:text-blue-600 transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
