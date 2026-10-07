import React from 'react';
import { Rocket, Globe } from 'lucide-react';
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
        {/* Directory Links Grid (SEO Optimized Internal Links) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-blue-500/30">
                RS
              </div>
              <span className="font-bold text-base text-slate-100 light:text-slate-900">
                RS tools
              </span>
            </div>
            <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed mb-4">
              A comprehensive open-source suite of 50+ free utilities for developers, designers, and professionals. Fast, private, and serverless.
            </p>
            {/* Developer Links */}
            <div className="space-y-2 text-xs">
              <button
                onClick={onOpenSitemap}
                className="group flex items-center gap-2 text-slate-400 hover:text-blue-400 light:text-slate-600 light:hover:text-blue-600 transition-colors cursor-pointer text-left"
              >
                <Globe className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>XML Sitemap & SEO Specs</span>
              </button>
              <button
                onClick={onOpenDeployGuide}
                className="group flex items-center gap-2 text-slate-400 hover:text-blue-400 light:text-slate-600 light:hover:text-blue-600 transition-colors cursor-pointer text-left"
              >
                <Rocket className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>Deploy Project Source</span>
              </button>
            </div>
          </div>

          {/* Image Utilities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 light:text-slate-700 mb-3">
              Image Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 light:text-slate-600">
              {imageTools.map(tool => (
                <li key={tool.id}>
                  <a
                    href={`#/${tool.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectTool(tool);
                    }}
                    className="hover:text-blue-400 text-left transition-colors block"
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* PDF Utilities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 light:text-slate-700 mb-3">
              PDF & Docs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 light:text-slate-600">
              {pdfTools.map(tool => (
                <li key={tool.id}>
                  <a
                    href={`#/${tool.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectTool(tool);
                    }}
                    className="hover:text-blue-400 text-left transition-colors block"
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 light:text-slate-700 mb-3">
              Developer Suite
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 light:text-slate-600">
              {devTools.map(tool => (
                <li key={tool.id}>
                  <a
                    href={`#/${tool.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectTool(tool);
                    }}
                    className="hover:text-blue-400 text-left transition-colors block"
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#/resume-builder"
                  onClick={(e) => {
                    e.preventDefault();
                    const r = TOOLS_LIST.find(t => t.id === 'resume-builder');
                    if (r) onSelectTool(r);
                  }}
                  className="text-blue-400 hover:text-blue-300 font-medium text-left transition-colors block"
                >
                  ATS Resume & CV Engine →
                </a>
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
            <a
              href="#/privacy"
              onClick={(e) => {
                e.preventDefault();
                onOpenPrivacy?.();
              }}
              className="text-slate-400 hover:text-blue-400 light:text-slate-600 light:hover:text-blue-600 transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Privacy Policy
            </a>
            <span className="text-slate-700 light:text-slate-300">·</span>
            <a
              href="#/terms"
              onClick={(e) => {
                e.preventDefault();
                onOpenTerms?.();
              }}
              className="text-slate-400 hover:text-blue-400 light:text-slate-600 light:hover:text-blue-600 transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Terms of Service
            </a>
            <span className="text-slate-700 light:text-slate-300">·</span>
            <a
              href="mailto:support@rsutilitytools.netlify.app"
              className="text-slate-400 hover:text-blue-400 light:text-slate-600 light:hover:text-blue-600 transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
