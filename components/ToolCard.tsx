import React from 'react';
import { ToolItem } from '../types/tools';
import { IconRenderer } from './IconRenderer';
import { ArrowUpRight, Star } from 'lucide-react';

interface ToolCardProps {
  tool: ToolItem;
  onClick: (tool: ToolItem) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent, toolId: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  onClick,
  isFavorite = false,
  onToggleFavorite,
}) => {
  return (
    <div
      onClick={() => onClick(tool)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(tool);
        }
      }}
      className="group relative flex flex-col justify-between p-5 rounded-xl bg-slate-900/60 dark:bg-slate-900/70 light:bg-white border border-slate-800 hover:border-blue-500/50 light:border-slate-200 light:hover:border-blue-400 transition-all duration-200 cursor-pointer hover:shadow-xl hover:shadow-blue-500/5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div>
        {/* Top bar with icon and favorite star */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 text-blue-500 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 group-hover:scale-105 group-hover:bg-blue-500/20 transition-transform">
            <IconRenderer name={tool.icon} className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-1.5">
            {tool.badge && (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400 dark:text-blue-400 light:text-blue-600 bg-blue-950/60 light:bg-blue-50 px-2 py-0.5 rounded border border-blue-500/20">
                {tool.badge}
              </span>
            )}
            {onToggleFavorite && (
              <button
                type="button"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                onClick={(e) => onToggleFavorite(e, tool.id)}
                className={`p-1.5 rounded-md hover:bg-slate-800 light:hover:bg-slate-100 transition-colors ${
                  isFavorite ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Star className="w-4 h-4 fill-current" />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-slate-100 light:text-slate-900 text-base mb-1.5 flex items-center gap-1.5 group-hover:text-blue-400 light:group-hover:text-blue-600 transition-colors">
          <span>{tool.name}</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-blue-400" />
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 light:text-slate-600 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Footer metadata: Zero-pill discipline (clean text with typographic dot separators) */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 light:border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 light:text-slate-400">
        <span className="capitalize">{tool.category}</span>
        <span aria-hidden="true">·</span>
        <span>Client-side</span>
        <span aria-hidden="true">·</span>
        <span className="text-emerald-400/90 font-medium">100% Free</span>
      </div>
    </div>
  );
};
