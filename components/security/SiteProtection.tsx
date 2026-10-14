import React, { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastState {
  show: boolean;
  message: string;
}

export const SiteProtection: React.FC = () => {
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' });

  const showSecurityNotice = (msg: string) => {
    setToast({ show: true, message: msg });
  };

  useEffect(() => {
    if (!toast.show) return;
    const timer = setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast.show]);

  useEffect(() => {
    // 1. Console Security Warning
    try {
      console.clear();
      console.log(
        '%c⛔ STOP & NOTICE: RS Tools Proprietary Application',
        'color: #ef4444; font-size: 22px; font-weight: 800; padding: 4px 8px; background: #1e1b4b; border-radius: 4px;'
      );
      console.log(
        '%cThis platform, its interactive interfaces, algorithms, and stylesheets are protected by copyright.\nUnauthorized scraping, copying, reverse-engineering, or redistributing of this code is strictly prohibited.',
        'color: #94a3b8; font-size: 13px; line-height: 1.5;'
      );
    } catch {
      // Ignore in restricted environments
    }

    // 2. Disable Right-Click Context Menu (except inside form inputs/textareas)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const tagName = target.tagName?.toLowerCase();
      const isInput = tagName === 'input' || tagName === 'textarea';
      const isEditable = target.isContentEditable || target.getAttribute('contenteditable') === 'true';
      const isAllowed = target.closest('[data-allow-context="true"]');

      if (!isInput && !isEditable && !isAllowed) {
        e.preventDefault();
        showSecurityNotice('Right-click inspection is disabled on this site.');
      }
    };

    // 3. Disable Developer Tools & Source Inspection Hotkeys
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      const key = e.key.toLowerCase();

      // F12 -> Open DevTools
      if (e.key === 'F12') {
        e.preventDefault();
        showSecurityNotice('Developer tools inspection shortcut is disabled.');
        return;
      }

      // Ctrl + U (or Cmd + Option + U) -> View Page Source
      if (cmdOrCtrl && key === 'u') {
        e.preventDefault();
        showSecurityNotice('Viewing source code is disabled.');
        return;
      }

      // Ctrl + Shift + I or Cmd + Option + I -> Inspect Element
      if (cmdOrCtrl && e.shiftKey && key === 'i') {
        e.preventDefault();
        showSecurityNotice('Inspect Element is restricted.');
        return;
      }

      // Ctrl + Shift + J or Cmd + Option + J -> Console
      if (cmdOrCtrl && e.shiftKey && key === 'j') {
        e.preventDefault();
        showSecurityNotice('Console access is restricted.');
        return;
      }

      // Ctrl + Shift + C -> Inspect element target
      if (cmdOrCtrl && e.shiftKey && key === 'c') {
        // Only block if not focused in an input
        const target = e.target as HTMLElement | null;
        const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
        if (!isInput) {
          e.preventDefault();
          showSecurityNotice('Inspector tool is disabled.');
          return;
        }
      }

      // Ctrl + S -> Save complete webpage to disk
      if (cmdOrCtrl && key === 's') {
        e.preventDefault();
        showSecurityNotice('Saving complete webpage is disabled.');
        return;
      }
    };

    // 4. Prevent Dragging Images & Assets to Desktop
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tagName = target.tagName?.toLowerCase();
      if (tagName === 'img' || tagName === 'svg' || target.closest('svg') || target.classList.contains('no-drag')) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-[99999] pointer-events-none select-none max-w-sm"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 dark:bg-black/95 text-slate-100 border border-amber-500/30 shadow-2xl shadow-amber-500/10 backdrop-blur-md">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Protected Content
              </p>
              <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                {toast.message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
