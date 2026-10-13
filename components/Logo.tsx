import React, { useId } from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  showBadge?: boolean;
  className?: string;
  enableMotion?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  showBadge = false,
  className = '',
  enableMotion = true,
}) => {
  // Unique ID prefix to avoid SVG filter/gradient collisions across multiple instances
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');

  // Container dimensions
  const dimensions = {
    sm: { box: 'w-9 h-9', size: 36, medallion: 'w-[72%] h-[72%]' },
    md: { box: 'w-11 h-11', size: 44, medallion: 'w-[72%] h-[72%]' },
    lg: { box: 'w-16 h-16', size: 64, medallion: 'w-[70%] h-[70%]' },
    xl: { box: 'w-20 h-20', size: 80, medallion: 'w-[68%] h-[68%]' },
    hero: { box: 'w-28 h-28 sm:w-36 sm:h-36', size: 144, medallion: 'w-[68%] h-[68%]' },
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
    hero: 'text-3xl',
  };

  const currentDim = dimensions[size] || dimensions.md;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Emblem with Prominent Continuous Rotating Orbital Ring */}
      <motion.div
        whileHover={enableMotion ? { scale: 1.06 } : undefined}
        whileTap={enableMotion ? { scale: 0.94 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={`relative ${currentDim.box} flex items-center justify-center shrink-0 group cursor-pointer`}
      >
        {/* Ambient Warm Golden Champagne Halo Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/30 via-yellow-400/20 to-amber-200/10 blur-[12px] group-hover:blur-[18px] group-hover:opacity-100 opacity-75 transition-all duration-300 pointer-events-none" />

        {/* 1. PRIMARY PROMINENT ROTATING ORBITAL CIRCLE (Clockwise 360° Continuous Orbit) */}
        <motion.div
          animate={
            enableMotion
              ? {
                  rotate: [0, 360],
                }
              : undefined
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -inset-1 sm:-inset-1.5 w-[calc(100%+8px)] h-[calc(100%+8px)] sm:w-[calc(100%+12px)] sm:h-[calc(100%+12px)] pointer-events-none animate-orbit-spin"
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
          >
            <defs>
              <linearGradient id={`orbit-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.75" />
                <stop offset="70%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
              </linearGradient>
              <filter id={`node-glow-${id}`} x="-100%" y="-100%" width="300%" height="300%">
                <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#fbbf24" floodOpacity="0.9" />
              </filter>
            </defs>

            {/* Fine architectural outer dashed orbit guide */}
            <circle
              cx="50"
              cy="50"
              r="47"
              stroke={`url(#orbit-grad-${id})`}
              strokeWidth="1.5"
              strokeDasharray="5 7"
              strokeOpacity="0.85"
            />

            {/* Quad compass ticks at 0, 90, 180, 270 degrees */}
            <line x1="50" y1="0.5" x2="50" y2="5.5" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="50" y1="94.5" x2="50" y2="99.5" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0.5" y1="50" x2="5.5" y2="50" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="94.5" y1="50" x2="99.5" y2="50" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />

            {/* Luminous Orbiting Satellite Photon Node #1 */}
            <circle
              cx="83.2"
              cy="16.8"
              r="3.5"
              fill="#ffffff"
              stroke="#f59e0b"
              strokeWidth="1.5"
              filter={`url(#node-glow-${id})`}
            />

            {/* Minor Orbiting Satellite Node #2 (Opposite hemisphere for harmonic visual balance) */}
            <circle
              cx="16.8"
              cy="83.2"
              r="2"
              fill="#fbbf24"
              opacity="0.85"
            />
          </svg>
        </motion.div>

        {/* 2. SECONDARY CONCENTRIC INNER ORBIT RING (Counter-Clockwise Micro-Orbit) */}
        <motion.div
          animate={
            enableMotion
              ? {
                  rotate: [360, 0],
                }
              : undefined
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-[4%] w-[92%] h-[92%] pointer-events-none animate-orbit-reverse"
        >
          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Concentric inner dotted guide */}
            <circle
              cx="40"
              cy="40"
              r="38"
              stroke="#fbbf24"
              strokeWidth="0.8"
              strokeDasharray="2 10"
              strokeOpacity="0.45"
            />
            {/* Diamond micro-pip on inner orbit */}
            <polygon
              points="40,2 41.5,4 40,6 38.5,4"
              fill="#fbbf24"
              opacity="0.9"
            />
          </svg>
        </motion.div>

        {/* 3. CORE OBSIDIAN & CHAMPAGNE TITANIUM MEDALLION */}
        <div className={`relative ${currentDim.medallion} rounded-full shadow-2xl flex items-center justify-center overflow-hidden border border-amber-400/35 bg-[#0e1117]`}>
          <svg
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              {/* Deep Obsidian Basalt gradient */}
              <radialGradient id={`rs-core-bg-${id}`} cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#1e222b" />
                <stop offset="60%" stopColor="#12151b" />
                <stop offset="100%" stopColor="#080a0d" />
              </radialGradient>

              {/* Champagne Gold & Platinum Monogram Gradient */}
              <linearGradient id={`rs-gold-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="35%" stopColor="#fbbf24" />
                <stop offset="70%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>

              {/* Platinum Silver Ribbon for Letter S */}
              <linearGradient id={`rs-silver-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              {/* Specular Rim Stroke */}
              <linearGradient id={`rs-rim-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Medallion Base */}
            <circle
              cx="30"
              cy="30"
              r="29"
              fill={`url(#rs-core-bg-${id})`}
              stroke={`url(#rs-rim-grad-${id})`}
              strokeWidth="1.25"
            />

            {/* Precision Micro Geometric Grid lines */}
            <circle cx="30" cy="30" r="22" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.08" />
            <line x1="30" y1="8" x2="30" y2="52" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.06" />
            <line x1="8" y1="30" x2="52" y2="30" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.06" />

            {/* ARCHITECTURAL "R" MONOGRAM RIBBON (Warm Champagne Gold) */}
            {/* Stem */}
            <path
              d="M 16 17 L 16 43"
              stroke={`url(#rs-gold-grad-${id})`}
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Upper Loop */}
            <path
              d="M 16 17 H 26 C 30.5 17 33.5 19.8 33.5 24 C 33.5 28.2 30.5 31 26 31 H 16"
              stroke={`url(#rs-gold-grad-${id})`}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dynamic Angled Strut */}
            <path
              d="M 25 31 L 34.5 43"
              stroke={`url(#rs-gold-grad-${id})`}
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* ARCHITECTURAL "S" MONOGRAM RIBBON (Brushed Platinum Silver with Gold Accent) */}
            <path
              d="M 45 21 C 43.5 18 40.5 17 37 17 C 32.5 17 30 19.5 30 23.5 C 30 28.5 44 28 44 35.5 C 44 40.5 40 43 35.5 43 C 31 43 28 40 27.5 37"
              stroke={`url(#rs-silver-grad-${id})`}
              strokeWidth="3.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Precision Diamond Apex Reflection */}
            <polygon
              points="45,15 47,17 45,19 43,17"
              fill="#ffffff"
              opacity="0.95"
            />
          </svg>
        </div>
      </motion.div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-2">
            <span
              className={`font-black tracking-tight text-white dark:text-white light:text-zinc-900 font-sans ${textSizes[size]}`}
            >
              RS<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 font-extrabold tracking-normal">TOOLS</span>
            </span>
            {showBadge && (
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded px-1.5 py-0.5 tracking-wider uppercase font-mono shadow-sm">
                52 Suite
              </span>
            )}
          </div>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-400 light:text-zinc-500 font-medium tracking-wide mt-0.5">
            Precision Client-Side Utilities
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
