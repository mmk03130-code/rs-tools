import React from 'react';
import { motion } from 'motion/react';
import { Search, Sun, Moon, Coffee } from 'lucide-react';
import { ToolCategory } from '../types/tools';
import { Logo } from './Logo';

interface NavbarProps {
  activeCategory: ToolCategory | 'all' | 'favorites';
  onSelectCategory: (cat: ToolCategory | 'all' | 'favorites') => void;
  onOpenSearch: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenDeployGuide?: () => void;
  onOpenSitemap?: () => void;
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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0b0c10]/90 dark:bg-[#0b0c10]/92 light:bg-white/95 border-b border-[#1e232d]/80 dark:border-white/8 light:border-zinc-200/90 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand - Zone 1 */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectCategory('all')}
            className="flex items-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 rounded-xl p-1 transition-transform hover:scale-[1.02]"
            aria-label="RS Tools Home"
          >
            <Logo size="md" showText={true} showBadge={false} />
          </button>
        </div>

        {/* Global Search Bar (Trigger - Zone 2) */}
        <div className="flex-1 max-w-lg lg:max-w-xl hidden md:block mx-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs rounded-xl bg-[#13161e]/90 dark:bg-[#13161e]/90 light:bg-zinc-100 border border-[#232935] dark:border-white/8 light:border-zinc-200 text-zinc-400 light:text-zinc-500 hover:border-amber-500/40 dark:hover:border-amber-500/40 light:hover:border-amber-500/40 hover:text-zinc-200 light:hover:text-zinc-900 transition-all shadow-inner group"
          >
            <div className="flex items-center gap-2.5 truncate">
              <Search className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 transition-colors shrink-0" />
              <span className="truncate">Search 52 utilities (e.g. compress, merge PDF, resume, JSON)...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 font-mono text-[10px] bg-[#1a1f2a] dark:bg-[#1a1f2a] light:bg-zinc-200 text-zinc-300 light:text-zinc-700 px-2 py-0.5 rounded border border-[#2b3342] dark:border-white/10 light:border-zinc-300 shrink-0">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Desktop Quick Category Links with Motion Layout Indicator */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-zinc-400 light:text-zinc-600 relative">
          {(['image', 'pdf', 'resume', 'developer'] as const).map((cat) => {
            const isActive = activeCategory === cat;
            const labels = {
              image: { label: 'Image', color: 'text-amber-400' },
              pdf: { label: 'PDF', color: 'text-rose-400' },
              resume: { label: 'Resume', color: 'text-yellow-400' },
              developer: { label: 'Developer', color: 'text-emerald-400' },
            };
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`relative px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap z-10 ${
                  isActive ? 'text-white light:text-zinc-950 font-bold' : 'hover:text-zinc-200 light:hover:text-zinc-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navCategoryActivePill"
                    className="absolute inset-0 bg-[#1b202a] dark:bg-[#1b202a] light:bg-zinc-200 rounded-lg -z-10 shadow-sm border border-[#2c3444] dark:border-white/10 light:border-zinc-300"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className={isActive ? labels[cat].color : ''}>{labels[cat].label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Navigation & Utility Actions - Zone 3 */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Mobile search trigger */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={onOpenSearch}
            aria-label="Search tools"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 md:hidden rounded-xl bg-[#13161e] dark:bg-[#13161e] light:bg-zinc-100 border border-[#232935] dark:border-white/10 light:border-zinc-200 text-zinc-400 hover:text-white light:hover:text-zinc-900 transition-colors"
          >
            <Search className="w-4 h-4" />
          </motion.button>

          {/* Buy Me a Coffee */}
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Support project on Buy Me a Coffee"
            className="min-h-[40px] inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/25 transition-all"
          >
            <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Support</span>
          </motion.a>

          {/* Dark / Light Toggle */}
          <motion.button
            whileTap={{ scale: 0.85, rotate: 45 }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle dark/light theme"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 rounded-xl bg-[#13161e] dark:bg-[#13161e] light:bg-zinc-100 border border-[#232935] dark:border-white/10 light:border-zinc-200 text-zinc-400 hover:text-white light:hover:text-zinc-900 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </motion.button>
        </div>
      </div>
    </header>
  );
};
