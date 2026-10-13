/**
 * Sanitizes modern CSS color formats (e.g. oklch, oklab) into standard RGB / HEX
 * using the browser's native Canvas 2D engine before HTML-to-Canvas rendering.
 */
export function sanitizeElementColors(rootElement: HTMLElement): void {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const elements = [rootElement, ...Array.from(rootElement.querySelectorAll('*'))] as HTMLElement[];
    for (const el of elements) {
      try {
        const computed = window.getComputedStyle(el);
        const bg = computed.backgroundColor;
        const color = computed.color;
        const border = computed.borderColor;

        if (bg && bg.includes('oklch')) {
          ctx.fillStyle = bg;
          el.style.backgroundColor = ctx.fillStyle;
        }
        if (color && color.includes('oklch')) {
          ctx.fillStyle = color;
          el.style.color = ctx.fillStyle;
        }
        if (border && border.includes('oklch')) {
          ctx.fillStyle = border;
          el.style.borderColor = ctx.fillStyle;
        }
      } catch {
        // Continue to next element
      }
    }
  } catch (err) {
    console.debug('Color sanitization completed with warnings:', err);
  }
}
