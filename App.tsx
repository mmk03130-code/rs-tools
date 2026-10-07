import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search, Star, Sparkles, ShieldCheck, Zap, ArrowLeft,
  SlidersHorizontal, CheckCircle2, Heart, ExternalLink,
  Flame, LayoutGrid, Cpu, FileText, Image as ImageIcon, Coffee,
  Share2, Check, ChevronDown, Lock, Terminal, HelpCircle, Layers, BookOpen
} from 'lucide-react';
import { ToolCategory, ToolItem } from './types/tools';
import { TOOLS_LIST } from './data/toolsList';
import { IMAGE_SEO_CONTENT, PDF_SEO_CONTENT, DEV_RESUME_SEO_CONTENT } from './data/seoContent';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToolCard } from './components/ToolCard';
import { CommandPalette } from './components/CommandPalette';
import { AdSlot } from './components/AdSlot';

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
    <div className="w-9 h-9 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
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
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all' | 'favorites'>('all');
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

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [complianceTab, setComplianceTab] = useState<ComplianceTab>('privacy');
  const [linkCopied, setLinkCopied] = useState(false);

  // FAQ accordion state
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

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

  // Sync Hash with active tool for direct URL routing & SEO canonical links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash) {
        const found = TOOLS_LIST.find(t => t.id === hash);
        if (found) {
          setActiveTool(found);
          return;
        }
      }
      setActiveTool(null);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
        canonicalTag.setAttribute('href', 'https://rsutilitytools.netlify.app/');
      }
      window.location.hash = `#/${activeTool.id}`;
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

  // Filtered tools list
  const filteredTools = useMemo(() => {
    return TOOLS_LIST.filter(tool => {
      // Category filter
      if (activeCategory === 'favorites') {
        if (!favorites.includes(tool.id)) return false;
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
  }, [activeCategory, searchQuery, favorites]);

  // Featured tools for top row
  const featuredTools = useMemo(() => {
    return TOOLS_LIST.filter(t => t.featured);
  }, []);

  // Copy canonical share link
  const copyShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 flex flex-col font-sans transition-colors duration-200">
      {/* Accessible Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Top Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveTool(null);
          window.location.hash = '';
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(prev => !prev)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onOpenSitemap={() => setIsSitemapOpen(true)}
        favoritesCount={favorites.length}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* VIEW 1: ACTIVE TOOL RUNNER */}
        {activeTool ? (
          <div className="space-y-6">
            {/* Breadcrumb & Navigation Back */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800/80 light:border-slate-200">
              <button
                onClick={() => {
                  setActiveTool(null);
                  window.location.hash = '';
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white light:hover:text-slate-900 transition-colors p-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All 50+ Utilities</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={copyShareLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-800 transition-colors"
                >
                  {linkCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{linkCopied ? 'Link Copied!' : 'Share Tool'}</span>
                </button>

                <button
                  onClick={(e) => toggleFavorite(e, activeTool.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    favorites.includes(activeTool.id)
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-slate-900 light:bg-white border-slate-800 light:border-slate-200 text-slate-400'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${favorites.includes(activeTool.id) ? 'fill-current' : ''}`} />
                  <span>{favorites.includes(activeTool.id) ? 'Favorited' : 'Favorite'}</span>
                </button>
              </div>
            </div>

            {/* Render Category Engine Hub with Lazy Suspense */}
            <React.Suspense fallback={<WorkstationFallback />}>
              {activeTool.category === 'image' && <ImageToolsHub tool={activeTool} />}
              {activeTool.category === 'pdf' && <PdfToolsHub tool={activeTool} />}
              {activeTool.category === 'developer' && <DevToolsHub tool={activeTool} />}
              {activeTool.category === 'resume' && <ResumeBuilder />}
            </React.Suspense>

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
                  className="mt-10 relative overflow-hidden rounded-2xl p-6 sm:p-9 bg-slate-900/70 light:bg-white border border-slate-800/90 light:border-slate-200/90 text-slate-100 light:text-slate-900 shadow-xl transition-all"
                >
                  {/* Premium top subtle gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-purple-500/0 pointer-events-none" />

                  {/* Header row with badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-800/80 light:border-slate-200/80">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
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
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium">
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
                    <div className="mb-8 p-5 sm:p-6 rounded-xl bg-slate-950/80 light:bg-slate-50 border border-slate-800/90 light:border-slate-200/90 shadow-inner">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-md bg-blue-500/15 text-blue-400">
                            <Cpu className="w-4 h-4" />
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-400">
                            Under the Hood: Technical Mechanics
                          </h3>
                        </div>
                        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-slate-900 light:bg-slate-200 border border-slate-800 light:border-slate-300 text-slate-400 light:text-slate-600">
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
                    <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800/80 light:border-slate-200/80">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                        <h3 className="text-sm sm:text-base font-semibold text-slate-100 light:text-slate-900">
                          Frequently Asked Questions
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 light:bg-slate-200 text-slate-300 light:text-slate-700 font-mono">
                          {faqsList.length}
                        </span>
                      </div>

                      {faqsList.length > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleAllFaqs(faqsList.length)}
                          className="text-xs font-medium text-blue-400 hover:text-blue-300 light:text-blue-600 light:hover:text-blue-700 transition-colors px-2 py-1 rounded hover:bg-slate-800/50 light:hover:bg-slate-100"
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
                                ? 'border-blue-500/40 bg-slate-950/60 light:bg-blue-50/30'
                                : 'border-slate-800/80 light:border-slate-200 bg-slate-950/30 light:bg-slate-50/60 hover:border-slate-700 light:hover:border-slate-300'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => toggleFaq(idx)}
                              aria-expanded={isOpen}
                              className="w-full flex items-center justify-between p-4 text-left gap-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-xs font-mono font-bold text-blue-400/80 mt-0.5">
                                  0{idx + 1}
                                </span>
                                <span className="text-xs sm:text-sm font-medium text-slate-200 light:text-slate-800 font-sans">
                                  {faq.question}
                                </span>
                              </div>
                              <ChevronDown
                                className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                                  isOpen ? 'rotate-180 text-blue-400' : ''
                                }`}
                              />
                            </button>
                            {isOpen && (
                              <div
                                role="region"
                                className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed border-t border-slate-800/40 light:border-slate-200/60 font-sans pl-10"
                              >
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              );
            })()}

            {/* Subtle Ad / Sponsorship Slot */}
            <div className="pt-6">
              <AdSlot slotType="banner" />
            </div>
          </div>
        ) : (
          /* VIEW 2: DASHBOARD & TOOL DIRECTORY */
          <div className="space-y-10">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800/80 light:from-white light:to-blue-50 light:border-slate-200 text-center shadow-xl">
              <div className="max-w-3xl mx-auto space-y-4">
                {/* Clean unboxed metadata separator */}
                <div className="flex items-center justify-center gap-2 text-xs text-blue-400 font-semibold tracking-wide">
                  <span>50+ FREE ONLINE UTILITIES</span>
                  <span aria-hidden="true">·</span>
                  <span>100% PRIVATE CLIENT-SIDE</span>
                  <span aria-hidden="true">·</span>
                  <span>ZERO SERVER UPLOADS</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white light:text-slate-900">
                  The Fast, Modern Web Utility Suite
                </h1>

                <p className="text-sm sm:text-base text-slate-400 light:text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Compress images, merge & protect PDFs, build 100% ATS-compliant resumes with 150+ templates, and format code with zero latency.
                </p>

                {/* Instant Live Search Input */}
                <div className="pt-2 max-w-xl mx-auto">
                  <div className="relative flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search 50+ tools (e.g. compress, merge pdf, resume, json, regex)..."
                      className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-950/80 light:bg-white border border-slate-700/80 light:border-slate-300 text-sm text-white light:text-slate-900 placeholder-slate-500 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 text-xs text-slate-400 hover:text-white"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Category Segmented Tabs (Functional Buttons) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800/80 light:border-slate-200">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-200 overflow-x-auto max-w-full">
                {[
                  { id: 'all', label: `All Tools (${TOOLS_LIST.length})` },
                  { id: 'image', label: `Image (${TOOLS_LIST.filter(t => t.category === 'image').length})` },
                  { id: 'pdf', label: `PDF & Docs (${TOOLS_LIST.filter(t => t.category === 'pdf').length})` },
                  { id: 'resume', label: `Resume & CV (150+ Designs)` },
                  { id: 'developer', label: `Developer (${TOOLS_LIST.filter(t => t.category === 'developer').length})` },
                  { id: 'favorites', label: `Favorites (${favorites.length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id as any)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                      activeCategory === tab.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 light:text-slate-600 hover:text-slate-100 light:hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-500 light:text-slate-400 font-medium">
                Showing {filteredTools.length} of {TOOLS_LIST.length} utilities
              </div>
            </div>

            {/* Popular / Featured Row (when viewing 'all' and no search) */}
            {activeCategory === 'all' && !searchQuery && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Featured & Most Popular Utilities
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {featuredTools.slice(0, 4).map(tool => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onClick={(t) => setActiveTool(t)}
                      isFavorite={favorites.includes(tool.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Subtle Sponsor Ad Slot */}
            <AdSlot slotType="banner" />

            {/* Main Tools Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <h2 className="text-sm font-bold text-slate-200 light:text-slate-800">
                  {activeCategory === 'all' ? 'All Web Utilities & Online Workstations' : `${activeCategory.toUpperCase()} Tools`}
                </h2>
                <span>{filteredTools.length} utilities</span>
              </div>

              {filteredTools.length === 0 ? (
                <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-2">
                  <p className="text-sm text-slate-300 font-semibold">No tools match your search criteria</p>
                  <p className="text-xs text-slate-500">Try searching for keywords like "compress", "pdf", "image", or "token".</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="mt-3 px-4 py-1.5 text-xs font-medium rounded-lg bg-blue-600 text-white"
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
                      onClick={(t) => setActiveTool(t)}
                      isFavorite={favorites.includes(tool.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Comprehensive Technical Overview & Architecture Guide (High Word Count & SEO Architecture) */}
            <section
              aria-labelledby="platform-architecture-guide"
              className="mt-16 pt-12 border-t border-slate-800/80 light:border-slate-200 space-y-12 text-slate-300 light:text-slate-700"
            >
              {/* Primary Architectural Header */}
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Technical Documentation & Architecture</span>
                </div>
                <h2
                  id="platform-architecture-guide"
                  className="text-2xl sm:text-3xl font-extrabold text-slate-100 light:text-slate-900 tracking-tight"
                >
                  Why Client-Side Computing Represents the Future of Web Utilities
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-slate-400 light:text-slate-600">
                  Traditional web conversion platforms force users to transmit private files, financial records, medical documents, and proprietary source code across third-party remote cloud servers. RS Tools was engineered from the ground up on a zero-upload client-side architecture. Every transformation, compression routine, vector extraction, and cryptographic verification runs directly inside your web browser sandbox using modern WebAssembly, HTML5 Canvas 2D, and Web Cryptography standards.
                </p>
              </div>

              {/* Grid Breakdown of 4 Core Engineering Workstations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Workstation 1: Image Processing */}
                <div className="p-6 rounded-2xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 light:text-slate-900">
                      High-Fidelity Raster & Vector Graphics Engine
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-400 light:text-slate-600">
                    Our suite of 15 image processing utilities leverages browser-accelerated HTML5 Canvas contexts and typed memory arrays. The Image Compressor uses bicubic downsampling with non-linear quantization curves, achieving up to 85% filesize reductions while preserving perceptual edge clarity. The Background Remover employs a weighted Redmean perceptual color distance algorithm coupled with 2D spatial Gaussian edge feathering, allowing instant transparent PNG cutouts without sending imagery to external AI servers. Complete multi-scale favicon packaging, EXIF privacy sanitization, and QR code vectorization execute with zero network roundtrips.
                  </p>
                </div>

                {/* Workstation 2: PDF & Document Processing */}
                <div className="p-6 rounded-2xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 light:text-slate-900">
                      Binary Stream Document & PDF Manipulation
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-400 light:text-slate-600">
                    Document management across our 15 PDF tools is powered by direct in-memory binary parsing. When merging, splitting, rotating, or encrypting files, our engine traverses PDF cross-reference tables and content dictionaries directly in browser ArrayBuffers. The PDF to Images converter renders vector page snapshots at crisp 150, 300, and 450 DPI densities using HTML5 Canvas contexts. Our Text Extractor uses an asynchronous stream decoder that navigates raw text operators (Tj and TJ arrays) to assemble clean, structured paragraphs without cloud dependencies.
                  </p>
                </div>

                {/* Workstation 3: ATS Resume Engine */}
                <div className="p-6 rounded-2xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 light:text-slate-900">
                      100% Parser-Compliant ATS Resume & CV Builder
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-400 light:text-slate-600">
                    Applicant Tracking Systems (Taleo, Workday, Greenhouse, Lever) reject millions of job applications annually due to unparseable graphical tables, multi-column CSS floats, and unreadable font envelopes. Our ATS Resume Builder enforces single-stream linear document hierarchies with semantic headings and standardized typographic metadata. Featuring 150+ design and color variants, real-time keyword scoring, and instantaneous single-page vector PDF compiling, candidates create interview-winning resumes completely free of subscriptions and data tracking.
                  </p>
                </div>

                {/* Workstation 4: Developer Suite */}
                <div className="p-6 rounded-2xl bg-slate-900/60 light:bg-white border border-slate-800 light:border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 light:text-slate-900">
                      Developer Encoding, Minification & Cryptography Suite
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-400 light:text-slate-600">
                    Engineered for daily software development workflows, our 20+ developer utilities handle data formatting, syntax inspection, and security calculations. The JSON Formatter provides deep tree traversal and instant lint error pinpointing. The Cryptographic Hash Generator leverages the hardware-accelerated Web Cryptography API (SubtleCrypto) to calculate SHA-256, SHA-512, and MD5 digests offline. With JWT inspection, regular expression live matching, side-by-side code diffing, and CSS/JS minification, engineers enjoy instant productivity without telemetry.
                  </p>
                </div>
              </div>

              {/* Security Standards & Compliance Accordion/Box */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/20 via-slate-900 to-indigo-950/20 border border-slate-800 light:border-slate-200 space-y-4">
                <h3 className="text-lg font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-400" />
                  <span>Enterprise Security, Zero Persistence, and Compliance Standards</span>
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-400 light:text-slate-600">
                  Because files never leave your device, RS Tools naturally satisfies the strictest regulatory compliance frameworks, including the European Union General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and Health Insurance Portability and Accountability Act (HIPAA) requirements. In-memory data buffers are instantly garbage collected when you refresh or close the browser tab. All open-source utilities are licensed under the permissive MIT license, ensuring transparent, unrestricted access for individuals, universities, and enterprise organizations worldwide.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1.5 text-blue-400">
                    <CheckCircle2 className="w-4 h-4" /> 100% In-Browser Execution
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-400">
                    <CheckCircle2 className="w-4 h-4" /> Zero Server Caching
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-400">
                    <CheckCircle2 className="w-4 h-4" /> Complete Air-Gap Support
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-400">
                    <CheckCircle2 className="w-4 h-4" /> Free & Open-Source (MIT)
                  </span>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTool={(tool) => setActiveTool(tool)}
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
        onSelectTool={(tool) => setActiveTool(tool)}
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
