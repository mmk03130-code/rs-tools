import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface AmbientMotionBackdropProps {
  isDarkMode?: boolean;
}

export const AmbientMotionBackdrop: React.FC<AmbientMotionBackdropProps> = ({ isDarkMode = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking with smooth spring damping
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Bespoke Fine Champagne Spotlight Tracking Cursor */}
      {isMounted && (
        <motion.div
          className="absolute w-[640px] h-[640px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-25 dark:opacity-20 light:opacity-10 blur-3xl pointer-events-none"
          style={{
            left: smoothX,
            top: smoothY,
            background: isDarkMode
              ? 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(212, 175, 55, 0.06) 35%, transparent 70%)'
              : 'radial-gradient(circle, rgba(217, 119, 6, 0.08) 0%, rgba(180, 83, 9, 0.04) 35%, transparent 70%)',
          }}
        />
      )}

      {/* Floating Warm Champagne Halo Orb (Top Center/Left) */}
      <motion.div
        animate={{
          x: [0, 30, -25, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-36 left-1/4 w-[540px] h-[540px] rounded-full blur-[130px] pointer-events-none opacity-20 dark:opacity-25 light:opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(180, 83, 9, 0.1) 50%, transparent 75%)',
        }}
      />

      {/* Floating Warm Titanium Atmospheric Mist (Top Right) */}
      <motion.div
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 50, -20, 0],
          scale: [1, 1.05, 0.92, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="absolute top-1/3 -right-32 w-[520px] h-[520px] rounded-full blur-[140px] pointer-events-none opacity-15 dark:opacity-20 light:opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.14) 0%, rgba(148, 163, 184, 0.08) 55%, transparent 80%)',
        }}
      />

      {/* Deep Grounding Mineral Mist (Bottom Left) */}
      <motion.div
        animate={{
          x: [0, 35, -30, 0],
          y: [0, -30, 25, 0],
          scale: [1, 0.95, 1.08, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
        className="absolute -bottom-40 left-10 w-[580px] h-[580px] rounded-full blur-[140px] pointer-events-none opacity-15 dark:opacity-18 light:opacity-8"
        style={{
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.12) 0%, rgba(71, 85, 105, 0.06) 55%, transparent 80%)',
        }}
      />
    </div>
  );
};
