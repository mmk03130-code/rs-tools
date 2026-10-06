import React from 'react';
import { Search, Sun, Moon, Coffee, Rocket, Globe, Wrench, ShieldCheck } from 'lucide-react';
import { ToolCategory } from '../types/tools';

interface NavbarProps {
  activeCategory: ToolCategory | 'all' | 'favorites';
  onSelectCategory: (cat: ToolCategory | 'all' | 'favorites') => void;
  onOpenSearch: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenDeployGuide: () => void;
  onOpenSitemap: () => void;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenSearch,
  isDarkMode,
  onToggleTheme,
  onOpenDeployGuide,
  onOpenSitemap,
  favoritesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 light:bg-white/85 border-b border-slate-800/80 light:border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-bold text-lg tracking-tight">
              RS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-100 light:text-slate-900">
                  RS tools
                </span>
                <span className="text-[10px] font-semibold text-blue-400 bg-blue-950/80 light:bg-blue-50 border border-blue-500/20 rounded px-1.5 py-0.2">
                  50+ Tools
                </span>
              </div>
              <div className="text-[11px] text-slate-400 light:text-slate-500 hidden sm:block">
                100% Private Client-Side Utilities
              </div>
            </div>
          </button>
        </div>

        {/* Global Search Bar (Trigger) */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs rounded-lg bg-slate-900/80 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-slate-400 light:text-slate-500 hover:border-slate-700 light:hover:border-slate-300 hover:text-slate-200 light:hover:text-slate-800 transition-colors shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search any tool (e.g., PDF merge, compress, resume, JSON)...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 font-mono text-[10px] bg-slate-800 light:bg-slate-200 text-slate-300 light:text-slate-700 px-1.5 py-0.5 rounded border border-slate-700/60 light:border-slate-300">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Navigation & Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Mobile search trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search tools"
            className="p-2 md:hidden rounded-lg bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-slate-400 hover:text-slate-100 light:hover:text-slate-900"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Sitemap / SEO */}
          <button
            type="button"
            onClick={onOpenSitemap}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-850 hover:border-slate-700 transition-colors"
            title="View XML Sitemap & SEO Specs"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>SEO & Sitemap</span>
          </button>

          {/* Deploy Free Guide */}
          <button
            type="button"
            onClick={onOpenDeployGuide}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-500/30 transition-colors"
          >
            <Rocket className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Deploy Free</span>
          </button>

          {/* Buy Me a Coffee */}
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/20 transition-colors"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Support</span>
          </a>

          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle dark/light theme"
            className="p-2 rounded-lg bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-slate-400 hover:text-slate-100 light:hover:text-slate-900 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
