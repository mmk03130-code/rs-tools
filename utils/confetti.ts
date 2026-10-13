import confetti from 'canvas-confetti';

/**
 * Triggers a crisp, delightful celebratory particle burst
 * Useful when tools finish exporting PDFs, compressing images, or formatting files
 */
export const triggerConfetti = (options?: { particleCount?: number; spread?: number; origin?: { x: number; y: number } }) => {
  try {
    confetti({
      particleCount: options?.particleCount ?? 60,
      spread: options?.spread ?? 70,
      origin: options?.origin ?? { y: 0.65 },
      colors: ['#38bdf8', '#818cf8', '#c084fc', '#34d399', '#f59e0b'],
      disableForReducedMotion: true,
    });
  } catch (err) {
    // Graceful fallback if window or canvas isn't available
    console.debug('Confetti animation skipped', err);
  }
};
