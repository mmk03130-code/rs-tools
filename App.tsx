import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Star, Sparkles, ShieldCheck, Zap, ArrowLeft,
  SlidersHorizontal, CheckCircle2, Heart, ExternalLink,
  Flame, LayoutGrid, Cpu, FileText, Image as ImageIcon, Coffee,
  Share2, Check, ChevronDown, Lock, Terminal, HelpCircle, Layers, BookOpen,
  Clock, ArrowRight, Palette, Code, Briefcase, Scale, Shield, CheckCircle, XCircle, Activity
} from 'lucide-react';
import { ToolCategory, ToolItem } from './types/tools';
import { TOOLS_LIST } from './data/toolsList';
import { IMAGE_SEO_CONTENT, PDF_SEO_CONTENT, DEV_RESUME_SEO_CONTENT } from './data/seoContent';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToolCard } from './components/ToolCard';
import { CommandPalette } from './components/CommandPalette';
import { Logo } from './components/Logo';
import { IconRenderer } from './components/IconRenderer';
import { AmbientMotionBackdrop } from './components/AmbientMotionBackdrop';
import { SiteProtection } from './components/security/SiteProtection';
import { triggerConfetti } from './utils/confetti';

// Category visual themes for inner pages
const TOOL_CATEGORY_THEMES: Record<string, {
  badgeColor: string;
  badgeBg: string;
  badgeBorder: string;
  glowBg: string;
  iconBg: string;
  iconColor: string;
}> = {
  image: {
    badgeColor: 'text-amber-400 dark:text-amber-300 light:text-amber-700',
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/25',
    glowBg: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
  },
  pdf: {
    badgeColor: 'text-rose-400 dark:text-rose-400 light:text-rose-700',
    badgeBg: 'bg-rose-500/10',
    badgeBorder: 'border-rose-500/25',
    glowBg: 'from-rose-500/20 via-pink-500/10 to-transparent',
    iconBg: 'bg-rose-500/15',
    iconColor: 'text-rose-400',
  },
  resume: {
    badgeColor: 'text-yellow-400 dark:text-yellow-300 light:text-yellow-700',
    badgeBg: 'bg-yellow-500/10',
    badgeBorder: 'border-yellow-500/25',
    glowBg: 'from-yellow-500/20 via-amber-500/10 to-transparent',
    iconBg: 'bg-yellow-500/15',
    iconColor: 'text-yellow-400',
  },
  developer: {
    badgeColor: 'text-emerald-400 dark:text-emerald-400 light:text-emerald-700',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/25',
    glowBg: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
  },
};

// Code-split heavy tool workstations and modals for optimal mobile & desktop performance
const ImageToolsHub = React.lazy(() =>
  import('./components/tools/image/ImageToolsHub').then(m => ({ default: m.ImageToolsHub }))
);
const PdfToolsHub = React.lazy(() =>
  import('./components/tools/pdf/PdfToolsHub').then(m => ({ default: m.PdfToolsHub }))
);
const DevToolsHub = React.lazy(() =>
  import('./components/tools/developer/DevToolsHub').then(m => ({ default: m.DevToolsHub }))
);
const ResumeBuilder = React.lazy(() =>
  import('./components/tools/resume/ResumeBuilder').then(m => ({ default: m.ResumeBuilder }))
);
const DeployGuideModal = React.lazy(() =>
  import('./components/DeployGuideModal').then(m => ({ default: m.DeployGuideModal }))
);
const SitemapModal = React.lazy(() =>
  import('./components/SitemapModal').then(m => ({ default: m.SitemapModal }))
);
const CompliancePages = React.lazy(() =>
  import('./components/legal/CompliancePages').then(m => ({ default: m.CompliancePages }))
);
import { ComplianceTab } from './components/legal/CompliancePages';

const WorkstationFallback = () => (
  <div className="py-24 flex flex-col items-center justify-center space-y-3">
    <div className="w-9 h-9 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
    <p className="text-xs font-semibold text-slate-400">Loading workstation engine...</p>
  </div>
);

export const App: React.FC = () => {
  // Theme state (dark by default)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('rstools_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  // Active navigation state
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all' | 'favorites' | 'recent'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rstools_favorites');
      return saved ? JSON.parse(saved) : ['image-compressor', 'merge-pdf', 'resume-builder', 'json-formatter'];
    } catch {
      return ['image-compressor', 'merge-pdf', 'resume-builder', 'json-formatter'];
    }
  });

  // Recently used tools state
  const [recentToolIds, setRecentToolIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rstools_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [complianceTab, setComplianceTab] = useState<ComplianceTab>('privacy');
  const [linkCopied, setLinkCopied] = useState(false);

  // FAQ accordion state
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Workflow role tab state for landing page
  const [activeWorkflowRole, setActiveWorkflowRole] = useState<'designers' | 'engineers' | 'jobseekers' | 'finance'>('designers');

  // Homepage FAQ state
  const [homeFaqIndices, setHomeFaqIndices] = useState<number[]>([0, 1]);
  const toggleHomeFaq = useCallback((idx: number) => {
    setHomeFaqIndices(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  }, []);

  // Record a visited tool to recent tools list
  const recordRecentTool = useCallback((toolId: string) => {
    setRecentToolIds(prev => {
      const filtered = prev.filter(id => id !== toolId);
      const next = [toolId, ...filtered].slice(0, 6);
      try {
        localStorage.setItem('rstools_recent', JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  // Clean Navigation Handlers (support clean URLs without reloads)
  const selectTool = useCallback((tool: ToolItem) => {
    setActiveTool(tool);
    recordRecentTool(tool.id);
    window.history.pushState(null, '', `/${tool.id}`);
  }, [recordRecentTool]);

  const clearActiveTool = useCallback(() => {
    setActiveTool(null);
    window.history.pushState(null, '', '/');
    window.location.hash = '';
  }, []);

  const clearRecentTools = useCallback(() => {
    setRecentToolIds([]);
    try {
      localStorage.removeItem('rstools_recent');
    } catch {}
  }, []);

  // Reset open FAQ when tool changes
  useEffect(() => {
    setOpenFaqIndices([0]);
  }, [activeTool?.id]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleAllFaqs = (count: number) => {
    setOpenFaqIndices(prev =>
      prev.length === count ? [] : Array.from({ length: count }, (_, i) => i)
    );
  };

  // Sync theme with HTML class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('rstools_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('rstools_theme', 'light');
    }
  }, [isDarkMode]);

  // Sync URL route (supporting both clean pathname and legacy hash) with active tool
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const pathname = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
      const toolSlug = hash || pathname;
      if (toolSlug) {
        const found = TOOLS_LIST.find(t => t.id === toolSlug);
        if (found) {
          setActiveTool(found);
          recordRecentTool(found.id);
          return;
        }
      }
      setActiveTool(null);
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Update SEO Document Title, Meta, and JSON-LD on Active Tool Change
  useEffect(() => {
    let toolLdJson = document.getElementById('tool-schema-jsonld') as HTMLScriptElement | null;

    const currentOrigin = typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')
      ? window.location.origin
      : 'https://rsutilitytools.netlify.app';
    const canonicalTag = document.querySelector('link[rel="canonical"]');

    if (activeTool) {
      document.title = `${activeTool.seo.title} – RS tools`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', activeTool.seo.description);
      }
      if (canonicalTag) {
        canonicalTag.setAttribute('href', `https://rsutilitytools.netlify.app/${activeTool.id}`);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Dynamic JSON-LD structured data injection for Google search indexing
      if (!toolLdJson) {
        toolLdJson = document.createElement('script');
        toolLdJson.id = 'tool-schema-jsonld';
        toolLdJson.type = 'application/ld+json';
        document.head.appendChild(toolLdJson);
      }
      const faqsList = activeTool.faqs || [];
      toolLdJson.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'SoftwareApplication',
            'name': activeTool.name,
            'applicationCategory': 'UtilitiesApplication',
            'operatingSystem': 'All',
            'browserRequirements': 'HTML5 Canvas, WebAssembly, Web Cryptography API',
            'description': activeTool.seo.description,
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            }
          },
          ...(faqsList.length > 0
            ? [
                {
                  '@type': 'FAQPage',
                  'mainEntity': faqsList.map(faq => ({
                    '@type': 'Question',
                    'name': faq.question,
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': faq.answer
                    }
                  }))
                }
              ]
            : [])
        ]
      });
    } else {
      document.title = 'RS tools – 50+ Free Online Developer, PDF & Image Utilities';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', '50+ free online web utilities: Client-side Image Processing, PDF Tools, ATS Resume Builder, and Developer Tools with zero server uploads.');
      }
      if (canonicalTag) {
        canonicalTag.setAttribute('href', `${currentOrigin}/`);
      }
      if (toolLdJson) {
        toolLdJson.remove();
      }
    }
  }, [activeTool]);

  // Global Keyboard Shortcut for Command Palette (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle favorite
  const toggleFavorite = useCallback((e: React.MouseEvent, toolId: string) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId];
      localStorage.setItem('rstools_favorites', JSON.stringify(next));
      return next;
    });
  }, []);

  // Recent tools list resolved from IDs
  const recentTools = useMemo(() => {
    return recentToolIds
      .map(id => TOOLS_LIST.find(t => t.id === id))
      .filter((t): t is ToolItem => Boolean(t));
  }, [recentToolIds]);

  // Filtered tools list
  const filteredTools = useMemo(() => {
    return TOOLS_LIST.filter(tool => {
      // Category filter
      if (activeCategory === 'favorites') {
        if (!favorites.includes(tool.id)) return false;
      } else if (activeCategory === 'recent') {
        if (!recentToolIds.includes(tool.id)) return false;
      } else if (activeCategory !== 'all') {
        if (tool.category !== activeCategory) return false;
      }

      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          tool.name.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          tool.category.toLowerCase().includes(q) ||
          tool.tags.some(tag => tag.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [activeCategory, searchQuery, favorites, recentToolIds]);

  // Featured tools for top row
  const featuredTools = useMemo(() => {
    return TOOLS_LIST.filter(t => t.featured);
  }, []);

  // Sibling tools in the same category for quick-switching in the tool header
  const siblingTools = useMemo(() => {
    if (!activeTool) return [];
    return TOOLS_LIST.filter(t => t.category === activeTool.category && t.id !== activeTool.id).slice(0, 6);
  }, [activeTool]);

  // Related tools for the bottom recommendation shelf on inner pages
  const relatedTools = useMemo(() => {
    if (!activeTool) return [];
    return TOOLS_LIST.filter(t => t.category === activeTool.category && t.id !== activeTool.id).slice(0, 4);
  }, [activeTool]);

  // Copy canonical share link
  const copyShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    triggerConfetti({ particleCount: 45, spread: 65 });
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] light:bg-[#faf8f5] text-slate-100 light:text-slate-900 flex flex-col font-sans transition-colors duration-200">
      {/* Anti-copy & Developer Inspection Protection */}
      <SiteProtection />

      {/* Accessible Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-stone-950 focus:font-bold focus:rounded-lg focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Top Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          clearActiveTool();
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(prev => !prev)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onOpenSitemap={() => setIsSitemapOpen(true)}
        favoritesCount={favorites.length}
      />

      {/* GPU-Accelerated Ambient Fluid Motion Backdrop with reactive mouse spotlight */}
      <AmbientMotionBackdrop isDarkMode={isDarkMode} />

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {/* VIEW 1: ACTIVE TOOL RUNNER (INNER PAGE) */}
          {activeTool ? (
            <motion.div
              key={`tool-view-${activeTool.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
            {/* Breadcrumb & Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#202531]/80 dark:border-white/8 light:border-zinc-200">
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={clearActiveTool}
                  className="min-h-[38px] inline-flex items-center gap-2 font-semibold text-slate-400 hover:text-white light:hover:text-slate-900 transition-all hover:-translate-x-0.5 px-3 py-1.5 rounded-xl bg-[#13161e]/80 dark:bg-[#13161e]/80 light:bg-white border border-[#222733] dark:border-white/10 light:border-zinc-200 group tactile-btn"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>All Utilities</span>
                </button>
                <span className="text-slate-600 dark:text-slate-600 light:text-slate-300">/</span>
                <button
                  onClick={() => {
                    setActiveCategory(activeTool.category);
                    clearActiveTool();
                  }}
                  className="font-medium text-slate-400 hover:text-amber-400 transition-colors uppercase tracking-wider text-[11px]"
                >
                  {activeTool.category}
                </button>
                <span className="text-slate-600 dark:text-slate-600 light:text-slate-300">/</span>
                <span className="font-semibold text-white light:text-slate-900 truncate max-w-[180px] sm:max-w-none">
                  {activeTool.name}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Live Sandbox Status Beacon */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Local Sandbox · 0ms</span>
                </div>

                <button
                  onClick={copyShareLink}
                  className="min-h-[38px] inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl bg-[#13161e]/80 light:bg-white border border-[#222733] dark:border-white/10 light:border-zinc-200 text-slate-300 light:text-slate-700 hover:bg-[#1c212c] hover:border-[#2f3647] transition-all tactile-btn"
                >
                  {linkCopied ? <Check className="w-3.5 h-3.5 text-emerald-400 animate-bounce" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{linkCopied ? 'Link Copied!' : 'Share'}</span>
                </button>

                <button
                  onClick={(e) => toggleFavorite(e, activeTool.id)}
                  className={`min-h-[38px] inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl border transition-all tactile-btn ${
                    favorites.includes(activeTool.id)
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-[#13161e]/80 light:bg-white border-[#222733] dark:border-white/10 light:border-zinc-200 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${favorites.includes(activeTool.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                  <span>{favorites.includes(activeTool.id) ? 'Favorited' : 'Favorite'}</span>
                </button>
              </div>
            </div>

            {/* Bespoke Inner Page Tool Header Card with Sibling Quick Switcher */}
            {(() => {
              const theme = TOOL_CATEGORY_THEMES[activeTool.category] || TOOL_CATEGORY_THEMES.image;
              return (
                <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-[#12151c]/85 dark:bg-[#12151c]/85 light:bg-white border border-[#222734]/80 dark:border-white/10 light:border-zinc-200 shadow-xl bg-grid-subtle">
                  {/* Ambient category glow */}
                  <div className={`pointer-events-none absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br ${theme.glowBg} rounded-full blur-3xl opacity-60`} />

                  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} ${theme.iconColor} flex items-center justify-center border border-white/10 shadow-lg shrink-0 group`}>
                        <IconRenderer name={activeTool.icon} className="w-7 h-7 group-hover:scale-110 transition-transform duration-200" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.badgeColor} ${theme.badgeBg} border ${theme.badgeBorder} rounded-md px-2 py-0.5 font-mono`}>
                            {activeTool.category.toUpperCase()} WORKSTATION
                          </span>
                          {activeTool.badge && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/70 border border-amber-500/30 rounded-md px-2 py-0.5 font-mono">
                              {activeTool.badge}
                            </span>
                          )}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white light:text-slate-950 tracking-tight">
                          {activeTool.name}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400 light:text-slate-600 max-w-2xl leading-relaxed">
                          {activeTool.description}
                        </p>
                      </div>
                    </div>

                    {/* Security & Performance Specs Mini Box */}
                    <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 p-3.5 rounded-2xl bg-[#0c0e13]/80 dark:bg-[#0c0e13]/80 light:bg-stone-50 border border-[#222734]/80 dark:border-white/5 light:border-zinc-200 text-xs">
                      <div className="flex items-center gap-2 text-slate-300 light:text-slate-700">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-semibold">Zero Server Transmission</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 light:text-slate-700">
                        <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="font-semibold">Local Wasm Acceleration</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 light:text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="font-semibold">Uncapped File Size (In-RAM)</span>
                      </div>
                    </div>
                  </div>

                  {/* Sibling Quick Switcher Ribbon */}
                  {siblingTools.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-[#222734]/80 dark:border-white/5 light:border-zinc-200/80 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400 light:text-slate-500 uppercase tracking-wider mr-1">
                        More {activeTool.category} tools:
                      </span>
                      {siblingTools.map((sibling) => (
                        <button
                          key={sibling.id}
                          onClick={() => selectTool(sibling)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0d1015]/80 hover:bg-[#181d27] light:bg-stone-100 light:hover:bg-stone-200 border border-[#222734]/80 dark:border-white/5 light:border-zinc-300 text-xs font-medium text-slate-300 light:text-slate-700 hover:text-white light:hover:text-slate-900 transition-all hover:scale-[1.02] tactile-btn"
                        >
                          <span>{sibling.name}</span>
                          <ArrowRight className="w-3 h-3 text-slate-500" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Render Category Engine Hub with Lazy Suspense */}
            <div className="rounded-3xl overflow-hidden border border-[#222734]/80 dark:border-white/10 light:border-zinc-200 bg-[#101319]/70 dark:bg-[#101319]/70 light:bg-white shadow-xl p-4 sm:p-6 lg:p-8">
              <React.Suspense fallback={<WorkstationFallback />}>
                {activeTool.category === 'image' && <ImageToolsHub tool={activeTool} />}
                {activeTool.category === 'pdf' && <PdfToolsHub tool={activeTool} />}
                {activeTool.category === 'developer' && <DevToolsHub tool={activeTool} />}
                {activeTool.category === 'resume' && <ResumeBuilder initialToolId={activeTool.id} />}
              </React.Suspense>
            </div>

            {/* Semantic Tool Overview & FAQ Accordion Section */}
            {(() => {
              const seoContent = activeTool ? (IMAGE_SEO_CONTENT[activeTool.id] || PDF_SEO_CONTENT[activeTool.id] || DEV_RESUME_SEO_CONTENT[activeTool.id]) : undefined;
              const overviewText = seoContent?.longOverview || activeTool.longOverview || `The ${activeTool.name} utility is a high-speed, 100% private client-side tool designed to streamline your daily workflow without uploading files to remote servers. All computations run in-browser using modern Web APIs for complete confidentiality and zero wait time.`;
              const underTheHoodText = seoContent?.underTheHood || activeTool.underTheHood;
              const faqsList = seoContent?.faqs || (activeTool.faqs && activeTool.faqs.length > 0 ? activeTool.faqs : [
                {
                  question: `How does ${activeTool.name} process my data?`,
                  answer: `All computations, conversions, and transformations occur 100% locally on your machine using modern web standards such as Web Workers, Canvas 2D, and WebAssembly. No data or files are sent to remote servers.`
                },
                {
                  question: `Is ${activeTool.name} completely free to use?`,
                  answer: `Yes, completely free with no daily limits, subscriptions, or account registrations required.`
                },
                {
                  question: `What browsers and devices are supported?`,
                  answer: `Our utilities run on all modern desktop, tablet, and mobile browsers supporting HTML5 standards including Chrome, Firefox, Safari, Edge, and Brave.`
                }
              ]);

              return (
                <section
                  aria-labelledby="tool-documentation-heading"
                  className="mt-10 relative overflow-hidden rounded-2xl p-6 sm:p-9 bg-[#12151c]/80 light:bg-white border border-[#222734]/90 light:border-zinc-200/90 text-slate-100 light:text-slate-900 shadow-xl transition-all"
                >
                  {/* Premium top subtle gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-400/60 to-yellow-500/0 pointer-events-none" />

                  {/* Header row with badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[#222734]/80 light:border-zinc-200/80">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <h2
                        id="tool-documentation-heading"
                        className="text-base sm:text-lg font-bold text-slate-100 light:text-slate-900 tracking-tight"
                      >
                        About {activeTool.name}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>100% Client-Side</span>
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
                        <Lock className="w-3 h-3" />
                        <span>Zero Cloud Storage</span>
                      </span>
                    </div>
                  </div>

                  {/* "About the Tool" text block */}
                  <div className="mb-8">
                    <p className="text-xs sm:text-sm text-slate-300 light:text-slate-700 leading-relaxed font-sans text-justify sm:text-left">
                      {overviewText}
                    </p>
                  </div>

                  {/* Under the Hood Technical Mechanics Segment */}
                  {underTheHoodText && (
                    <div className="mb-8 p-5 sm:p-6 rounded-xl bg-[#0c0e13]/85 light:bg-stone-50 border border-[#222734]/90 light:border-zinc-200/90 shadow-inner">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-md bg-amber-500/15 text-amber-400">
                            <Cpu className="w-4 h-4" />
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400">
                            Under the Hood: Technical Mechanics
                          </h3>
                        </div>
                        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-[#151922] light:bg-zinc-200 border border-[#282f3f] light:border-zinc-300 text-slate-400 light:text-slate-600">
                          In-Browser Execution
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300/90 light:text-slate-700 leading-relaxed font-sans">
                        {underTheHoodText}
                      </p>
                    </div>
                  )}

                  {/* FAQ Interactive Accordion Segment */}
                  <div>
                    <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-[#222734]/80 light:border-zinc-200/80">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                        <h3 className="text-sm sm:text-base font-semibold text-slate-100 light:text-slate-900">
                          Frequently Asked Questions
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#161a22] light:bg-zinc-200 text-slate-300 light:text-slate-700 font-mono">
                          {faqsList.length}
                        </span>
                      </div>

                      {faqsList.length > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleAllFaqs(faqsList.length)}
                          className="text-xs font-medium text-amber-400 hover:text-amber-300 light:text-amber-700 light:hover:text-amber-800 transition-colors px-2 py-1 rounded hover:bg-[#1a1f29] light:hover:bg-zinc-100"
                        >
                          {openFaqIndices.length === faqsList.length ? 'Collapse All' : 'Expand All'}
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      {faqsList.map((faq, idx) => {
                        const isOpen = openFaqIndices.includes(idx);
                        return (
                          <div
                            key={idx}
                            className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                              isOpen
                                ? 'border-amber-500/40 bg-[#0c0e13]/90 light:bg-amber-50/30'
                                : 'border-[#222734]/80 light:border-zinc-200 bg-[#0c0e13]/40 light:bg-white hover:border-[#2f3647] light:hover:border-zinc-300'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => toggleFaq(idx)}
                              aria-expanded={isOpen}
                              className="w-full flex items-center justify-between p-4 text-left gap-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl"
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-xs font-mono font-bold text-amber-400/90 mt-0.5">
                                  0{idx + 1}
                                </span>
                                <span className="text-xs sm:text-sm font-medium text-slate-200 light:text-slate-800 font-sans">
                                  {faq.question}
                                </span>
                              </div>
                              <ChevronDown
                                className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                                  isOpen ? 'rotate-180 text-amber-400' : ''
                                }`}
                              />
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                  className="overflow-hidden"
                                >
                                  <div
                                    role="region"
                                    className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed border-t border-[#222734]/60 light:border-zinc-200/60 font-sans pl-10"
                                  >
                                    {faq.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              );
            })()}

            {/* Related Tools Recommendation Shelf */}
            {relatedTools.length > 0 && (
              <div className="mt-12 space-y-4 pt-8 border-t border-[#202531]/80 dark:border-white/8 light:border-zinc-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 light:text-slate-800">
                      Related {activeTool.category.toUpperCase()} Utilities
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setActiveCategory(activeTool.category);
                      clearActiveTool();
                    }}
                    className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>View all {activeTool.category} tools</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {relatedTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onClick={(t) => selectTool(t)}
                      isFavorite={favorites.includes(tool.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        ) : (
          /* VIEW 2: DASHBOARD & TOOL DIRECTORY */
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            {/* Upgraded Glassmorphic Hero Section */}
            <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-14 backdrop-blur-2xl bg-gradient-to-b from-[#13161e]/90 via-[#0f1117]/85 to-[#090b0e]/95 border border-[#252b39]/80 dark:border-white/10 light:from-white light:via-stone-50 light:to-amber-50/20 light:border-zinc-200/90 shadow-2xl bg-grid-subtle">
              {/* Subtle Warm Champagne & Titanium Ambient Glow Elements */}
              <div className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-amber-500/15 via-yellow-400/10 to-amber-200/5 rounded-full blur-3xl opacity-80" />
              <div className="pointer-events-none absolute -bottom-24 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl opacity-60" />
              <div className="pointer-events-none absolute top-1/2 left-10 w-72 h-72 bg-yellow-500/8 rounded-full blur-3xl opacity-40" />

              <div className="relative max-w-4xl mx-auto text-center space-y-7">
                {/* Centered Brand Monogram Emblem with Prominent Continuous Rotating Orbital Circle */}
                <div className="flex justify-center py-2">
                  <Logo size="hero" showText={false} enableMotion={true} />
                </div>

                {/* Clean unboxed metadata kicker */}
                <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs text-amber-400 dark:text-amber-300 light:text-amber-700 font-bold tracking-wider uppercase font-mono">
                  <span>52+ Client-Side Utilities</span>
                  <span aria-hidden="true" className="text-zinc-600 dark:text-zinc-600 light:text-zinc-300">·</span>
                  <span>WebAssembly Engine</span>
                  <span aria-hidden="true" className="text-zinc-600 dark:text-zinc-600 light:text-zinc-300">·</span>
                  <span>100% In-Browser Privacy</span>
                </div>

                {/* Live Kinetic Sandbox Heartbeat Bar */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0c0e14]/90 dark:bg-[#0c0e14]/90 light:bg-white border border-[#222734]/80 dark:border-white/10 light:border-zinc-200/90 shadow-md text-[11px] font-mono text-zinc-300 light:text-zinc-700 mx-auto">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold text-emerald-400">SANDBOX ACTIVE</span>
                  <span className="text-zinc-600 dark:text-zinc-600 light:text-zinc-300">·</span>
                  <span className="text-zinc-400 light:text-zinc-600 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>0 Network Requests</span>
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-600 light:text-zinc-300 hidden sm:inline">·</span>
                  <span className="text-zinc-400 light:text-zinc-600 hidden sm:inline">
                    100% In-Memory
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white light:text-zinc-950 text-balance leading-[1.12]">
                  Free, Private Web Tools That <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">Never Touch a Server</span>
                </h1>

                <p className="text-sm sm:text-base text-zinc-300 dark:text-zinc-400 light:text-zinc-600 max-w-2xl mx-auto leading-relaxed text-balance">
                  Process confidential PDFs, compress high-res images, architect 150+ ATS-compliant resumes with CA & ACCA layouts, and inspect code—entirely in your browser's private memory with zero latency.
                </p>

                {/* Instant Live Search Input */}
                <div className="pt-1 max-w-xl mx-auto">
                  <div className="relative flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-zinc-400 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search 52 utilities (e.g. compress, merge PDF, resume, JSON, regex)..."
                      className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-[#0c0e14]/90 dark:bg-[#0c0e14]/90 light:bg-white border border-[#272e3d]/80 dark:border-white/10 light:border-zinc-300 text-sm text-white light:text-zinc-900 placeholder-zinc-500 shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 text-xs font-semibold text-zinc-400 hover:text-white light:hover:text-zinc-900 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Popular Quick-Launch Shortcut Chips with Motion Springs */}
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
                    <span className="text-[11px] text-zinc-500 light:text-zinc-400 font-medium mr-1">Quick Launch:</span>
                    {[
                      { id: 'image-compressor', label: 'Compress Image' },
                      { id: 'merge-pdf', label: 'Merge PDF' },
                      { id: 'resume-builder', label: 'ATS Resume Studio' },
                      { id: 'remove-background', label: 'Remove BG' },
                      { id: 'protect-pdf', label: 'Lock PDF' },
                      { id: 'json-formatter', label: 'JSON Formatter' },
                    ].map((chip) => {
                      const targetTool = TOOLS_LIST.find(t => t.id === chip.id);
                      if (!targetTool) return null;
                      return (
                        <motion.button
                          key={chip.id}
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          onClick={() => selectTool(targetTool)}
                          className="px-2.5 py-1 rounded-lg bg-[#141822]/90 hover:bg-[#1e2330] light:bg-zinc-100 light:hover:bg-zinc-200 border border-[#272e3d] light:border-zinc-300 text-[11px] font-medium text-zinc-300 light:text-zinc-700 hover:text-white light:hover:text-zinc-900 transition-colors"
                        >
                          {chip.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* 4-Pillar Workstation Bento Grid with Motion Springs */}
                <div className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
                  {/* Pillar 1: Image Studio */}
                  <motion.button
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    onClick={() => setActiveCategory('image')}
                    className="p-4 sm:p-5 rounded-2xl backdrop-blur-md bg-[#12151d]/75 dark:bg-[#12151d]/75 light:bg-white border border-[#222735]/80 hover:border-amber-500/50 light:border-zinc-200 hover:bg-[#161a24] transition-colors group shadow-lg hover:shadow-xl hover:shadow-amber-500/10 text-left"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white light:text-zinc-900 flex items-center justify-between">
                      <span>Image Studio</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="text-[11px] text-zinc-400 light:text-zinc-500 mt-1">
                      15 Tools · WebP, AVIF & Cutout
                    </div>
                  </motion.button>

                  {/* Pillar 2: PDF Suite */}
                  <motion.button
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    onClick={() => setActiveCategory('pdf')}
                    className="p-4 sm:p-5 rounded-2xl backdrop-blur-md bg-[#12151d]/75 dark:bg-[#12151d]/75 light:bg-white border border-[#222735]/80 hover:border-rose-500/50 light:border-zinc-200 hover:bg-[#161a24] transition-colors group shadow-lg hover:shadow-xl hover:shadow-rose-500/10 text-left"
                  >
                    <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white light:text-zinc-900 flex items-center justify-between">
                      <span>PDF Suite</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="text-[11px] text-zinc-400 light:text-zinc-500 mt-1">
                      16 Tools · Merge, Split & Lock
                    </div>
                  </motion.button>

                  {/* Pillar 3: Resume Studio */}
                  <motion.button
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    onClick={() => setActiveCategory('resume')}
                    className="p-4 sm:p-5 rounded-2xl backdrop-blur-md bg-[#12151d]/75 dark:bg-[#12151d]/75 light:bg-white border border-[#222735]/80 hover:border-yellow-500/50 light:border-zinc-200 hover:bg-[#161a24] transition-colors group shadow-lg hover:shadow-xl hover:shadow-yellow-500/10 text-left"
                  >
                    <div className="w-9 h-9 rounded-xl bg-yellow-500/15 text-yellow-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white light:text-zinc-900 flex items-center justify-between">
                      <span>Resume Studio</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="text-[11px] text-zinc-400 light:text-zinc-500 mt-1">
                      150+ ATS Designs · CA & ACCA
                    </div>
                  </motion.button>

                  {/* Pillar 4: Developer Hub */}
                  <motion.button
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    onClick={() => setActiveCategory('developer')}
                    className="p-4 sm:p-5 rounded-2xl backdrop-blur-md bg-[#12151d]/75 dark:bg-[#12151d]/75 light:bg-white border border-[#222735]/80 hover:border-emerald-500/50 light:border-zinc-200 hover:bg-[#161a24] transition-colors group shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 text-left"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white light:text-zinc-900 flex items-center justify-between">
                      <span>Developer Hub</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="text-[11px] text-zinc-400 light:text-zinc-500 mt-1">
                      17 Tools · JSON, Crypto & Diff
                    </div>
                  </motion.button>
                </div>

                {/* Privacy & Security Trust Markers */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-4 sm:gap-x-6 text-[11px] sm:text-xs text-zinc-400 light:text-zinc-500 border-t border-[#222735]/60 dark:border-white/5 light:border-zinc-200/80 pt-4">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Zero Cloud Storage</span>
                  </div>
                  <span aria-hidden="true" className="text-zinc-700 dark:text-zinc-700 light:text-zinc-300">·</span>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Hardware WebAssembly</span>
                  </div>
                  <span aria-hidden="true" className="text-zinc-700 dark:text-zinc-700 light:text-zinc-300">·</span>
                  <div className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Unlimited Local Memory</span>
                  </div>
                  <span aria-hidden="true" className="text-zinc-700 dark:text-zinc-700 light:text-zinc-300">·</span>
                  <span className="font-semibold text-emerald-400/90 light:text-emerald-700">100% Free Forever</span>
                </div>
              </div>
            </div>

            {/* Recently Used Utilities Shelf */}
            {recentTools.length > 0 && !searchQuery && activeCategory === 'all' && (
              <div className="p-4 sm:p-5 rounded-2xl backdrop-blur-md bg-[#11141c]/60 dark:bg-[#11141c]/60 light:bg-stone-100/80 border border-[#222734]/80 dark:border-[#222734]/80 light:border-zinc-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 light:text-slate-700">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Recently Visited Utilities</span>
                  </div>
                  <button
                    onClick={clearRecentTools}
                    className="text-[11px] text-zinc-500 hover:text-zinc-300 light:hover:text-zinc-800 transition-colors font-medium"
                  >
                    Clear history
                  </button>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                  {recentTools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => selectTool(tool)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161a24]/80 hover:bg-[#1f2432] light:bg-white light:hover:bg-zinc-50 border border-[#272e3d] light:border-zinc-200 text-xs font-medium text-slate-200 light:text-slate-800 whitespace-nowrap transition-all hover:scale-[1.02] shadow-sm"
                    >
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{tool.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Workflow Roles ("Built For Your Workflow") */}
            {!searchQuery && activeCategory === 'all' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#11141c]/80 dark:bg-[#11141c]/80 light:bg-stone-50 border border-[#222734]/80 dark:border-white/10 light:border-zinc-200 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 dark:text-amber-300 light:text-amber-700">
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>Curated Workflows</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900 mt-1">
                      Engineered For Your Daily Workflow
                    </h2>
                  </div>

                  {/* Role Selector Tabs with Motion Slider */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0c0e14]/90 light:bg-zinc-200/80 border border-[#222734] light:border-zinc-300 overflow-x-auto relative">
                    {[
                      { id: 'designers', label: 'Designers', icon: Palette },
                      { id: 'engineers', label: 'Developers', icon: Code },
                      { id: 'jobseekers', label: 'Job Seekers', icon: Briefcase },
                      { id: 'finance', label: 'Finance & CA', icon: Scale },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeWorkflowRole === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveWorkflowRole(tab.id as any)}
                          className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors z-10 ${
                            isActive
                              ? 'text-white font-bold'
                              : 'text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeWorkflowRolePill"
                              className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg -z-10 shadow-md shadow-amber-500/25"
                              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                            />
                          )}
                          <Icon className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Workflow Cards Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(() => {
                    const roleTools: Record<string, Array<{ id: string; perk: string; badge: string }>> = {
                      designers: [
                        { id: 'image-compressor', perk: 'Lossless downsampling up to 85%', badge: 'Lossless' },
                        { id: 'remove-background', perk: 'Perceptual Redmean transparent cutout', badge: 'Cutout' },
                        { id: 'favicon-generator', perk: 'Multi-scale 16px–512px ICO packaging', badge: 'Favicon' },
                        { id: 'image-converter', perk: 'Batch WebP, AVIF, PNG and SVG export', badge: 'Converter' },
                      ],
                      engineers: [
                        { id: 'json-formatter', perk: 'Deep schema validation & line linter', badge: 'JSON' },
                        { id: 'hash-generator', perk: 'Hardware SubtleCrypto SHA-256 & SHA-512', badge: 'Crypto' },
                        { id: 'diff-checker', perk: 'Side-by-side Git comparison view', badge: 'Diff' },
                        { id: 'regex-tester', perk: 'Real-time group capture sandbox', badge: 'Regex' },
                      ],
                      jobseekers: [
                        { id: 'resume-builder', perk: '150+ ATS templates & score checker', badge: 'ATS-Proof' },
                        { id: 'merge-pdf', perk: 'Combine CV, certificates & portfolio', badge: 'Combine' },
                        { id: 'sign-pdf', perk: 'Draw & place vector e-signatures', badge: 'E-Sign' },
                        { id: 'word-counter', perk: 'Character, token & keyword density tool', badge: 'Word Count' },
                      ],
                      finance: [
                        { id: 'resume-builder', perk: 'Specialized CA & ACCA layout models', badge: 'CA / ACCA' },
                        { id: 'protect-pdf', perk: '128/256-bit AES encryption password', badge: 'Encryption' },
                        { id: 'exif-remover', perk: 'Scrub GPS, camera & timestamp data', badge: 'Privacy' },
                        { id: 'split-pdf', perk: 'Extract audit schedules & statements', badge: 'Split' },
                      ],
                    };

                    const currentTools = roleTools[activeWorkflowRole] || [];
                    return currentTools.map((item) => {
                      const tool = TOOLS_LIST.find(t => t.id === item.id);
                      if (!tool) return null;
                      return (
                        <motion.div
                          key={tool.id}
                          whileHover={{ y: -4, scale: 1.015 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                          onClick={() => selectTool(tool)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              selectTool(tool);
                            }
                          }}
                          className="p-4 rounded-2xl bg-[#0c0e14]/80 dark:bg-[#0c0e14]/80 light:bg-white border border-[#222734]/80 dark:border-white/10 light:border-zinc-200 hover:border-amber-500/60 transition-colors shadow-md hover:shadow-xl cursor-pointer group flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 rounded px-1.5 py-0.5">
                                {item.badge}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-sm font-bold text-white light:text-slate-900 group-hover:text-amber-400 transition-colors">
                              {tool.name}
                            </h3>
                            <p className="text-xs text-slate-400 light:text-slate-600 mt-1.5 leading-relaxed">
                              {item.perk}
                            </p>
                          </div>
                          <div className="mt-3 pt-2 border-t border-[#222734]/70 light:border-zinc-100 text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                            <span>Open Utility</span>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </motion.div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}

            {/* Performance & Privacy Comparison Matrix */}
            {!searchQuery && activeCategory === 'all' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#11141c]/70 dark:bg-[#11141c]/70 light:bg-white border border-[#222734]/80 dark:border-white/10 light:border-zinc-200 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Architecture Comparison</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900 mt-1">
                    RS Tools vs Traditional Cloud Services
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 mt-1">
                    See why browser-native execution provides superior confidentiality and speed.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#222734] dark:border-white/10 light:border-zinc-200 text-slate-400 light:text-slate-500">
                        <th className="pb-3 font-semibold">Capability</th>
                        <th className="pb-3 font-bold text-amber-400">RS Tools (In-Browser)</th>
                        <th className="pb-3 font-semibold text-slate-500">Legacy Cloud Converters</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 dark:divide-white/5 light:divide-slate-100">
                      <tr>
                        <td className="py-3 font-medium text-slate-200 light:text-slate-800">Data Confidentiality</td>
                        <td className="py-3 text-emerald-400 font-semibold flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 shrink-0" />
                          <span>100% In-RAM (Files Never Leave Device)</span>
                        </td>
                        <td className="py-3 text-slate-400 light:text-slate-500 flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          <span>Uploaded to unknown remote disks</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-slate-200 light:text-slate-800">Processing Latency</td>
                        <td className="py-3 text-emerald-400 font-semibold flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 shrink-0" />
                          <span>Instant 0ms (Local CPU/GPU WebAssembly)</span>
                        </td>
                        <td className="py-3 text-slate-400 light:text-slate-500 flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          <span>Slow 15s–60s upload queues</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-slate-200 light:text-slate-800">File Size Limits</td>
                        <td className="py-3 text-emerald-400 font-semibold flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 shrink-0" />
                          <span>Unlimited (Only bounded by your RAM)</span>
                        </td>
                        <td className="py-3 text-slate-400 light:text-slate-500 flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          <span>Strict 5MB / 10MB paywalled caps</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-slate-200 light:text-slate-800">Data Persistence</td>
                        <td className="py-3 text-emerald-400 font-semibold flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 shrink-0" />
                          <span>Garbage-collected upon tab refresh</span>
                        </td>
                        <td className="py-3 text-slate-400 light:text-slate-500 flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          <span>Kept on servers for 1–24 hours</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-slate-200 light:text-slate-800">Price & Watermarks</td>
                        <td className="py-3 text-emerald-400 font-semibold flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 shrink-0" />
                          <span>100% Free Forever, Zero Watermarks</span>
                        </td>
                        <td className="py-3 text-slate-400 light:text-slate-500 flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          <span>$15/mo subscriptions or watermarks</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Category Segmented Tabs (Functional Buttons) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#222734]/80 light:border-zinc-200">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0c0e14]/90 light:bg-zinc-100 border border-[#222734] light:border-zinc-200 overflow-x-auto max-w-full relative">
                {[
                  { id: 'all', label: `All Tools (${TOOLS_LIST.length})` },
                  { id: 'image', label: `Image (${TOOLS_LIST.filter(t => t.category === 'image').length})` },
                  { id: 'pdf', label: `PDF & Docs (${TOOLS_LIST.filter(t => t.category === 'pdf').length})` },
                  { id: 'resume', label: `Resume & CV (150+ Designs)` },
                  { id: 'developer', label: `Developer (${TOOLS_LIST.filter(t => t.category === 'developer').length})` },
                  { id: 'favorites', label: `Favorites (${favorites.length})` },
                  ...(recentToolIds.length > 0 ? [{ id: 'recent', label: `Recent (${recentTools.length})` }] : []),
                ].map((tab) => {
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategory(tab.id as any)}
                      className={`relative min-h-[38px] px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center justify-center z-10 ${
                        isActive
                          ? 'text-stone-950 font-bold'
                          : 'text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-zinc-900'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="catalogCategoryIndicatorPill"
                          className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 rounded-lg -z-10 shadow-md shadow-amber-500/20"
                          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                        />
                      )}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="text-xs text-zinc-500 light:text-zinc-400 font-medium">
                Showing {filteredTools.length} of {TOOLS_LIST.length} utilities
              </div>
            </div>

            {/* Popular / Featured Row (when viewing 'all' and no search) */}
            {activeCategory === 'all' && !searchQuery && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Featured & Most Popular Utilities
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {featuredTools.slice(0, 4).map(tool => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onClick={(t) => selectTool(t)}
                      isFavorite={favorites.includes(tool.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Main Tools Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
                <h2 className="text-sm font-bold text-zinc-200 light:text-zinc-800">
                  {activeCategory === 'all' ? 'All Web Utilities & Online Workstations' : `${activeCategory.toUpperCase()} Tools`}
                </h2>
                <span>{filteredTools.length} utilities</span>
              </div>

              {filteredTools.length === 0 ? (
                <div className="p-12 rounded-2xl bg-[#11141c]/50 border border-[#222734] text-center space-y-2">
                  <p className="text-sm text-zinc-300 font-semibold">No tools match your search criteria</p>
                  <p className="text-xs text-zinc-500">Try searching for keywords like "compress", "pdf", "image", or "token".</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="mt-3 px-4 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 transition-all shadow-md shadow-amber-500/20"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredTools.map(tool => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onClick={(t) => selectTool(t)}
                      isFavorite={favorites.includes(tool.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Homepage FAQ Section */}
            {!searchQuery && activeCategory === 'all' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#11141c]/70 dark:bg-[#11141c]/70 light:bg-white border border-[#222734]/80 dark:border-white/10 light:border-zinc-200 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Frequently Asked Questions</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white light:text-zinc-900 mt-1">
                    Frequently Asked Questions About RS Tools
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 light:text-zinc-600 mt-1">
                    Clear answers regarding our client-side architecture, confidentiality guarantees, and capabilities.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      q: 'Do any of my files or sensitive data ever touch an external server?',
                      a: 'No. Every compression routine, PDF merge, format conversion, and cryptographic hash executes 100% locally inside your web browser sandbox. Zero file buffers are ever transmitted across a network or stored on remote cloud servers.',
                    },
                    {
                      q: 'How can client-side tools run with zero latency without installing any software?',
                      a: 'RS Tools leverages modern web standards including WebAssembly, typed memory ArrayBuffers, HTML5 Canvas 2D contexts, and hardware-accelerated SubtleCrypto APIs. Your device handles the calculations directly without upload queues.',
                    },
                    {
                      q: 'Are the ATS resume templates genuinely parsed by Taleo, Workday, and Greenhouse?',
                      a: 'Yes. Our ATS resume generator enforces single-stream linear document hierarchies with semantic headings, compliant font packaging, and clean vector text streams. It purposefully eliminates broken graphical tables that trip up corporate scanners.',
                    },
                    {
                      q: 'Can I process confidential legal documents, medical files, or tax returns safely?',
                      a: 'Absolutely. Because your files never leave your device, RS Tools naturally satisfies the strictest GDPR, HIPAA, and corporate NDA requirements. Once you refresh or close the tab, all memory buffers are instantly wiped.',
                    },
                    {
                      q: 'Are there hidden usage limits, token caps, or paywalls?',
                      a: 'None whatsoever. RS Tools is completely free with no subscriptions, credit balances, or file size limits (other than your device RAM). There are no watermarks placed on any generated images or PDF files.',
                    },
                    {
                      q: 'Does RS Tools work offline or in air-gapped environments?',
                      a: 'Yes. Once loaded into your browser cache, the WebAssembly binaries and utility scripts operate fully offline without an internet connection, making it suitable for secure, air-gapped workflows.',
                    },
                  ].map((faq, idx) => {
                    const isOpen = homeFaqIndices.includes(idx);
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-[#222734] dark:border-white/5 light:border-zinc-200 overflow-hidden bg-[#0c0e14]/60 dark:bg-[#0c0e14]/60 light:bg-stone-50 transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => toggleHomeFaq(idx)}
                          className="w-full flex items-center justify-between p-4 text-left gap-4 transition-colors"
                        >
                          <span className="text-xs sm:text-sm font-semibold text-zinc-200 light:text-zinc-800">
                            {faq.q}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                              isOpen ? 'rotate-180 text-amber-400' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-zinc-300 light:text-zinc-600 leading-relaxed border-t border-[#222734]/50 light:border-zinc-200/60">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Comprehensive Technical Overview & Architecture Guide (High Word Count & SEO Architecture) */}
            <section
              aria-labelledby="platform-architecture-guide"
              className="mt-16 pt-12 border-t border-[#222734]/80 light:border-zinc-200 space-y-12 text-zinc-300 light:text-zinc-700"
            >
              {/* Primary Architectural Header */}
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Technical Documentation & Architecture</span>
                </div>
                <h2
                  id="platform-architecture-guide"
                  className="text-2xl sm:text-3xl font-extrabold text-zinc-100 light:text-zinc-900 tracking-tight"
                >
                  Why Client-Side Computing Represents the Future of Web Utilities
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-400 light:text-zinc-600">
                  Traditional web conversion platforms force users to transmit private files, financial records, medical documents, and proprietary source code across third-party remote cloud servers. RS Tools was engineered from the ground up on a zero-upload client-side architecture. Every transformation, compression routine, vector extraction, and cryptographic verification runs directly inside your web browser sandbox using modern WebAssembly, HTML5 Canvas 2D, and Web Cryptography standards.
                </p>
              </div>

              {/* Grid Breakdown of 4 Core Engineering Workstations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Workstation 1: Image Processing */}
                <div className="p-6 rounded-2xl bg-[#11141c]/70 light:bg-white border border-[#222734] light:border-zinc-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100 light:text-zinc-900">
                      High-Fidelity Raster & Vector Graphics Engine
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 light:text-zinc-600">
                    Our suite of 15 image processing utilities leverages browser-accelerated HTML5 Canvas contexts and typed memory arrays. The Image Compressor uses bicubic downsampling with non-linear quantization curves, achieving up to 85% filesize reductions while preserving perceptual edge clarity. The Background Remover employs a weighted Redmean perceptual color distance algorithm coupled with 2D spatial Gaussian edge feathering, allowing instant transparent PNG cutouts without sending imagery to external AI servers. Complete multi-scale favicon packaging, EXIF privacy sanitization, and QR code vectorization execute with zero network roundtrips.
                  </p>
                </div>

                {/* Workstation 2: PDF & Document Processing */}
                <div className="p-6 rounded-2xl bg-[#11141c]/70 light:bg-white border border-[#222734] light:border-zinc-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100 light:text-zinc-900">
                      Binary Stream Document & PDF Manipulation
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 light:text-zinc-600">
                    Document management across our 15 PDF tools is powered by direct in-memory binary parsing. When merging, splitting, rotating, or encrypting files, our engine traverses PDF cross-reference tables and content dictionaries directly in browser ArrayBuffers. The PDF to Images converter renders vector page snapshots at crisp 150, 300, and 450 DPI densities using HTML5 Canvas contexts. Our Text Extractor uses an asynchronous stream decoder that navigates raw text operators (Tj and TJ arrays) to assemble clean, structured paragraphs without cloud dependencies.
                  </p>
                </div>

                {/* Workstation 3: ATS Resume Engine */}
                <div className="p-6 rounded-2xl bg-[#11141c]/70 light:bg-white border border-[#222734] light:border-zinc-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100 light:text-zinc-900">
                      100% Parser-Compliant ATS Resume & CV Builder
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 light:text-zinc-600">
                    Applicant Tracking Systems (Taleo, Workday, Greenhouse, Lever) reject millions of job applications annually due to unparseable graphical tables, multi-column CSS floats, and unreadable font envelopes. Our ATS Resume Builder enforces single-stream linear document hierarchies with semantic headings and standardized typographic metadata. Featuring 150+ design and color variants, real-time keyword scoring, and instantaneous single-page vector PDF compiling, candidates create interview-winning resumes completely free of subscriptions and data tracking.
                  </p>
                </div>

                {/* Workstation 4: Developer Suite */}
                <div className="p-6 rounded-2xl bg-[#11141c]/70 light:bg-white border border-[#222734] light:border-zinc-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100 light:text-zinc-900">
                      Developer Encoding, Minification & Cryptography Suite
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 light:text-zinc-600">
                    Engineered for daily software development workflows, our 20+ developer utilities handle data formatting, syntax inspection, and security calculations. The JSON Formatter provides deep tree traversal and instant lint error pinpointing. The Cryptographic Hash Generator leverages the hardware-accelerated Web Cryptography API (SubtleCrypto) to calculate SHA-256, SHA-512, and MD5 digests offline. With JWT inspection, regular expression live matching, side-by-side code diffing, and CSS/JS minification, engineers enjoy instant productivity without telemetry.
                  </p>
                </div>
              </div>

              {/* Security Standards & Compliance Accordion/Box */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-950/15 via-[#11141c] to-yellow-950/10 border border-[#222734] light:border-zinc-200 space-y-4">
                <h3 className="text-lg font-bold text-zinc-100 light:text-zinc-900 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Enterprise Security, Zero Persistence, and Compliance Standards</span>
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 light:text-zinc-600">
                  Because files never leave your device, RS Tools naturally satisfies the strictest regulatory compliance frameworks, including the European Union General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and Health Insurance Portability and Accountability Act (HIPAA) requirements. In-memory data buffers are instantly garbage collected when you refresh or close the browser tab. All open-source utilities are licensed under the permissive MIT license, ensuring transparent, unrestricted access for individuals, universities, and enterprise organizations worldwide.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> 100% In-Browser Execution
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Zero Server Caching
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Complete Air-Gap Support
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Free & Open-Source (MIT)
                  </span>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>

      {/* Footer */}
      <Footer
        onSelectTool={(tool) => selectTool(tool)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onOpenSitemap={() => setIsSitemapOpen(true)}
        onOpenPrivacy={() => {
          setComplianceTab('privacy');
          setIsComplianceOpen(true);
        }}
        onOpenTerms={() => {
          setComplianceTab('terms');
          setIsComplianceOpen(true);
        }}
      />

      {/* Modals with Lazy Suspense */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tools={TOOLS_LIST}
        onSelectTool={(tool) => selectTool(tool)}
      />

      <React.Suspense fallback={null}>
        {isDeployGuideOpen && (
          <DeployGuideModal
            isOpen={isDeployGuideOpen}
            onClose={() => setIsDeployGuideOpen(false)}
          />
        )}

        {isSitemapOpen && (
          <SitemapModal
            isOpen={isSitemapOpen}
            onClose={() => setIsSitemapOpen(false)}
          />
        )}

        {isComplianceOpen && (
          <CompliancePages
            isOpen={isComplianceOpen}
            onClose={() => setIsComplianceOpen(false)}
            initialTab={complianceTab}
          />
        )}
      </React.Suspense>
    </div>
  );
};
export default App;
