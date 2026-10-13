import React from 'react';
import { motion } from 'motion/react';
import { ToolItem } from '../types/tools';
import { IconRenderer } from './IconRenderer';
import { ArrowUpRight, Star } from 'lucide-react';

interface ToolCardProps {
  tool: ToolItem;
  onClick: (tool: ToolItem) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent, toolId: string) => void;
  layoutId?: string;
}

// Category visual accents mapping (Warm, professional, anti-AI palette)
const CATEGORY_STYLES: Record<string, { iconBg: string; iconColor: string; hoverBorder: string; glow: string }> = {
  image: {
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/15',
    iconColor: 'text-amber-400 dark:text-amber-300',
    hoverBorder: 'hover:border-amber-500/40',
    glow: 'group-hover:shadow-amber-500/10',
  },
  pdf: {
    iconBg: 'bg-rose-500/10 dark:bg-rose-500/15',
    iconColor: 'text-rose-400 dark:text-rose-300',
    hoverBorder: 'hover:border-rose-500/40',
    glow: 'group-hover:shadow-rose-500/10',
  },
  resume: {
    iconBg: 'bg-yellow-500/10 dark:bg-yellow-500/15',
    iconColor: 'text-yellow-400 dark:text-yellow-300',
    hoverBorder: 'hover:border-yellow-500/40',
    glow: 'group-hover:shadow-yellow-500/10',
  },
  developer: {
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    iconColor: 'text-emerald-400 dark:text-emerald-300',
    hoverBorder: 'hover:border-emerald-500/40',
    glow: 'group-hover:shadow-emerald-500/10',
  },
};

export const ToolCard: React.FC<ToolCardProps> = React.memo(({
  tool,
  onClick,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const catStyle = CATEGORY_STYLES[tool.category] || CATEGORY_STYLES.image;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      onClick={() => onClick(tool)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(tool);
        }
      }}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl backdrop-blur-md bg-[#101319]/90 dark:bg-[#101319]/90 light:bg-white border border-[#212631]/80 dark:border-white/8 light:border-zinc-200/90 ${catStyle.hoverBorder} light:hover:border-zinc-400 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-2xl ${catStyle.glow} text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50`}
    >
      <div>
        {/* Top bar with icon and favorite star */}
        <div className="flex items-center justify-between mb-3.5">
          <div className={`w-11 h-11 rounded-xl ${catStyle.iconBg} ${catStyle.iconColor} flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform duration-200`}>
            <IconRenderer name={tool.icon} className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-1.5">
            {tool.badge && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 dark:text-amber-300 light:text-amber-700 bg-amber-500/10 dark:bg-amber-500/10 light:bg-amber-50 px-2 py-0.5 rounded-md border border-amber-500/25">
                {tool.badge}
              </span>
            )}
            {onToggleFavorite && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.7, rotate: -15 }}
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                onClick={(e) => onToggleFavorite(e, tool.id)}
                className={`p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg hover:bg-zinc-800/80 dark:hover:bg-zinc-800/80 light:hover:bg-zinc-100 transition-colors ${
                  isFavorite ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300 light:hover:text-zinc-700'
                }`}
              >
                <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </motion.button>
            )}
          </div>
        </div>

        {/* Title with clean crawlable anchor link (Google SEO compliant) */}
        <h3 className="font-bold text-zinc-100 dark:text-zinc-100 light:text-zinc-900 text-sm sm:text-base mb-1.5 flex items-center gap-1.5 group-hover:text-amber-300 light:group-hover:text-amber-600 transition-colors">
          <a
            href={`/${tool.id}`}
            onClick={(e) => {
              e.preventDefault();
              onClick(tool);
            }}
            className="focus:outline-none flex items-center gap-1.5 text-inherit"
          >
            <span>{tool.name}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-amber-400" />
          </a>
        </h3>

        {/* Description */}
        <p className="text-xs text-zinc-400 light:text-zinc-600 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Footer metadata: Zero-pill discipline (clean text with typographic dot separators) */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 light:text-slate-500">
        <span className="capitalize font-medium">{tool.category}</span>
        <span aria-hidden="true">·</span>
        <span>Client-side</span>
        <span aria-hidden="true">·</span>
        <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-600 font-semibold">Free</span>
      </div>
    </motion.div>
  );
});
