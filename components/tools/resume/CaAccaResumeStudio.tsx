import React, { useState, useRef, useMemo } from 'react';
import {
  Download, Sparkles, Check, Plus, Trash2, Sliders, Palette,
  Type, ShieldCheck, Eye, RefreshCw, FileText,
  User, Briefcase, GraduationCap, Code, Award, ExternalLink,
  Upload, Copy, ZoomIn, ZoomOut, CheckCircle2, AlertCircle, FileCode, Printer,
  BookOpen, Building2, Table, Hash, Percent, FileCheck, CheckSquare, Search,
  X, ChevronLeft, ChevronRight, Shuffle, Undo2, Redo2, Phone, Mail, MapPin, Globe,
  HelpCircle, CheckCircle, Layers, Grid, List, Columns, Sparkle, ArrowRight
} from 'lucide-react';
import { FinanceResumeData } from '../../../types/tools';
import { CaAccaTemplateRenderer, ExtendedFinanceResumeData } from './CaAccaTemplateRenderer';
import { TEMPLATES_47_CATALOG, TemplateMeta } from './templates47Data';
import { generateRandomFinanceResume, createBlankFinanceResume } from './financeSampleGenerator';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import { sanitizeElementColors } from '../../../utils/sanitizeColors';

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

// Initial baseline candidate: dynamically randomized with global credentials
const INITIAL_CA_ACCA_DATA: ExtendedFinanceResumeData = generateRandomFinanceResume('audit-exec');

const COLOR_THEMES = [
  { id: 'navy', name: 'Executive Navy', primary: '#021B3A', secondary: '#1e3a8a', accent: '#3b82f6' },
  { id: 'slate', name: 'Charcoal Slate', primary: '#0f172a', secondary: '#334155', accent: '#64748b' },
  { id: 'burgundy', name: 'Regal Crimson & Plum', primary: '#581c87', secondary: '#7e22ce', accent: '#a855f7' },
  { id: 'emerald', name: 'Assurance Forest Green', primary: '#064e3b', secondary: '#047857', accent: '#10b981' },
  { id: 'corporate', name: 'Cobalt Banking Blue', primary: '#1e40af', secondary: '#2563eb', accent: '#60a5fa' },
  { id: 'minimal', name: 'Monochrome Onyx', primary: '#18181b', secondary: '#27272a', accent: '#52525b' },
];

// 4 Core Master Sections
const CORE_SECTIONS = [
  { id: 'identity', name: 'Identity & Objective', icon: User, desc: 'Name, Role, Contacts & Pitch' },
  { id: 'credentials', name: 'Registry & Academics', icon: Award, desc: 'Accounting Exams & Degrees' },
  { id: 'experience', name: 'Assurance & Tech', icon: Briefcase, desc: 'Articleship, Standards & Tools' },
  { id: 'styling', name: 'Design & Presentation', icon: Palette, desc: '8 Architectures & Color Themes' },
] as const;

type CoreSectionId = typeof CORE_SECTIONS[number]['id'];

// Suggested standards for 1-click addition
const SUGGESTED_STANDARDS = [
  'IFRS 15 (Revenue)', 'IFRS 16 (Leases)', 'IFRS 9 (Financial Instruments)',
  'ISA 315 (Risk Assessment)', 'ISA 240 (Fraud in Audit)', 'ISA 700 (Audit Reports)',
  'SOX 404 (ICFR Testing)', 'COSO Framework', 'US GAAP', 'Ind AS', 'CARO 2020'
];

// Suggested software for 1-click addition
const SUGGESTED_SOFTWARE = [
  'Advanced Excel (VBA/Power Query)', 'Power BI Dashboards', 'SAP S/4HANA Finance',
  'Oracle NetSuite ERP', 'QuickBooks Online', 'CaseWare Working Papers', 'TallyPrime', 'Xero Accounting'
];

// Suggested action verbs for summary
const SUMMARY_VERBS = [
  'Spearheaded', 'Architected', 'Reconciled', 'Optimized',
  'Audited', 'Formulated', 'Streamlined', 'Engineered'
];

// Rich miniature preview component for the 8 specialized architectures
const TemplateThumbnailPreview: React.FC<{
  template: TemplateMeta;
  primaryColor: string;
  name: string;
}> = ({ template, primaryColor, name }) => {
  const id = template.id;
  const displayName = name || 'Candidate Name';

  // 1. Audit Executive
  if (id === 'audit-exec' || id === 'T-01') {
    return (
      <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs p-1.5 flex flex-col justify-between select-none mb-2.5">
        <div className="border-b-2 pb-1" style={{ borderColor: primaryColor }}>
          <div className="flex justify-between items-baseline">
            <span className="text-[8px] font-black uppercase tracking-tight text-zinc-950 truncate">{displayName}</span>
            <span className="text-[5px] font-bold px-1 rounded text-white" style={{ backgroundColor: primaryColor }}>AUDIT</span>
          </div>
          <div className="w-full h-0.5 bg-zinc-200 mt-0.5 rounded" />
        </div>
        <div className="space-y-1 my-1">
          <div className="w-full h-1 bg-zinc-700 rounded" />
          <div className="w-4/5 h-0.5 bg-zinc-300 rounded" />
          <div className="flex gap-0.5">
            <span className="text-[4px] bg-blue-50 text-blue-700 px-0.5 rounded">ISA 315</span>
            <span className="text-[4px] bg-blue-50 text-blue-700 px-0.5 rounded">IFRS 15</span>
            <span className="text-[4px] bg-blue-50 text-blue-700 px-0.5 rounded">SOX</span>
          </div>
        </div>
        <div className="w-full h-0.5 bg-zinc-200 rounded" />
      </div>
    );
  }

  // 2. Tax Advisory
  if (id === 'tax-advisory' || id === 'T-02') {
    return (
      <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs flex flex-col justify-between select-none mb-2.5">
        <div className="p-1.5 text-white flex justify-between items-center" style={{ backgroundColor: primaryColor }}>
          <span className="text-[8px] font-black uppercase truncate">{displayName}</span>
          <span className="text-[5px] bg-amber-400 text-slate-950 font-bold px-1 rounded">TAX</span>
        </div>
        <div className="p-1.5 space-y-1 flex-1">
          <div className="w-full h-1 bg-zinc-700 rounded" />
          <div className="grid grid-cols-2 gap-1">
            <div className="h-6 bg-slate-50 border border-slate-200 rounded p-0.5" />
            <div className="h-6 bg-slate-50 border border-slate-200 rounded p-0.5" />
          </div>
        </div>
        <div className="p-1 bg-slate-100 border-t border-slate-200 text-[5px] text-zinc-600 font-mono">Tax Counsel • Registry</div>
      </div>
    );
  }

  // 3. Corporate Controller (Dual Column)
  if (id === 'corp-controller' || id === 'T-03') {
    return (
      <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs flex select-none mb-2.5">
        <div className="w-[36%] p-1.5 bg-slate-900 text-white flex flex-col justify-between">
          <div>
            <div className="w-4 h-4 rounded-full bg-slate-400 mx-auto mb-1 border border-white" />
            <div className="w-full h-0.5 bg-blue-400 rounded mb-0.5" />
            <div className="w-3/4 h-0.5 bg-slate-400 rounded" />
          </div>
          <div className="space-y-0.5">
            <div className="w-full h-0.5 bg-slate-500 rounded" />
            <div className="w-2/3 h-0.5 bg-slate-500 rounded" />
          </div>
        </div>
        <div className="w-[64%] p-1.5 flex flex-col justify-between">
          <div>
            <div className="text-[7.5px] font-black uppercase text-zinc-900 truncate">{displayName}</div>
            <div className="w-8 h-0.5 rounded my-0.5" style={{ backgroundColor: primaryColor }} />
            <div className="w-full h-1 bg-zinc-300 rounded mb-0.5" />
          </div>
          <div className="space-y-0.5">
            <div className="w-full h-1 bg-zinc-400 rounded" />
            <div className="w-3/4 h-0.5 bg-zinc-200 rounded" />
          </div>
          <div className="w-full h-0.5 bg-zinc-200 rounded" />
        </div>
      </div>
    );
  }

  // 4. ACCA Global Analyst
  if (id === 'acca-analyst' || id === 'T-04') {
    return (
      <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs flex flex-col justify-between select-none mb-2.5">
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-700 via-teal-600 to-indigo-700" />
        <div className="p-1.5 flex-1 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[8px] font-black uppercase text-zinc-950 truncate">{displayName}</div>
              <div className="text-[5px] text-zinc-600">ACCA Global Analyst</div>
            </div>
            <span className="text-[5px] bg-teal-100 text-teal-800 font-bold px-1 rounded">GLOBAL</span>
          </div>
          <div className="grid grid-cols-3 gap-0.5 my-1">
            <div className="bg-slate-100 h-3 rounded" />
            <div className="bg-slate-100 h-3 rounded" />
            <div className="bg-slate-100 h-3 rounded" />
          </div>
          <div className="space-y-0.5">
            <div className="w-full h-0.5 bg-zinc-400 rounded" />
            <div className="w-4/5 h-0.5 bg-zinc-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // 5. M&A Treasury Advisory (Serif)
  if (id === 'ma-treasury' || id === 'T-05') {
    return (
      <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs p-1.5 flex flex-col justify-between select-none mb-2.5 font-serif text-center">
        <div className="border-b pb-1">
          <div className="text-[8px] font-bold uppercase tracking-widest text-zinc-950 truncate">{displayName}</div>
          <div className="text-[5px] italic text-zinc-600">Investment Banking & M&A Advisory</div>
        </div>
        <div className="my-1 space-y-0.5 text-left">
          <div className="w-12 h-0.5 bg-zinc-400 mx-auto" />
          <div className="w-full h-1 bg-zinc-300 rounded" />
          <div className="w-full h-0.5 bg-zinc-200 rounded" />
        </div>
        <div className="border-t pt-0.5 flex justify-between text-[5px] font-mono text-zinc-500">
          <span>DCF & Valuation</span>
          <span>Capital Advisory</span>
        </div>
      </div>
    );
  }

  // 6. Risk Governance & SOX
  if (id === 'risk-assurance' || id === 'T-06') {
    return (
      <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs p-1.5 flex flex-col justify-between select-none mb-2.5">
        <div className="border-l-4 pl-1.5 py-0.5 bg-zinc-50 border-emerald-600">
          <div className="text-[7.5px] font-black uppercase text-zinc-950 truncate">{displayName}</div>
          <div className="text-[5px] text-zinc-600 font-bold">SOX 404 • Risk Assurance</div>
        </div>
        <div className="grid grid-cols-4 gap-0.5 my-1 text-center">
          <div className="p-0.5 bg-slate-100 rounded text-[4px] font-bold">SOX</div>
          <div className="p-0.5 bg-slate-100 rounded text-[4px] font-bold">COSO</div>
          <div className="p-0.5 bg-slate-100 rounded text-[4px] font-bold">ICFR</div>
          <div className="p-0.5 bg-slate-100 rounded text-[4px] font-bold">ISA</div>
        </div>
        <div className="space-y-0.5">
          <div className="w-full h-0.5 bg-zinc-400 rounded" />
          <div className="w-3/4 h-0.5 bg-zinc-200 rounded" />
        </div>
      </div>
    );
  }

  // 7. Clean Minimalist ATS
  if (id === 'clean-ats' || id === 'T-07') {
    return (
      <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs p-1.5 flex flex-col justify-between select-none mb-2.5 text-center">
        <div className="border-b pb-0.5">
          <div className="text-[8px] font-black uppercase tracking-wider text-zinc-950 truncate">{displayName}</div>
          <div className="text-[5px] text-zinc-600">Chartered Professional • 100% ATS Safe</div>
        </div>
        <div className="space-y-0.5 my-1 text-left">
          <div className="w-16 h-1 bg-zinc-800 rounded mb-0.5" />
          <div className="w-full h-0.5 bg-zinc-300 rounded" />
          <div className="w-5/6 h-0.5 bg-zinc-200 rounded" />
        </div>
        <div className="w-full h-0.5 bg-zinc-200 rounded" />
      </div>
    );
  }

  // 8. Executive CFO & Partner
  return (
    <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs flex flex-col justify-between select-none mb-2.5">
      <div className="p-1.5 text-white flex justify-between items-center" style={{ backgroundColor: primaryColor }}>
        <div>
          <div className="text-[8px] font-black uppercase truncate">{displayName}</div>
          <div className="text-[5px] text-amber-300 font-bold uppercase">Chief Financial Officer</div>
        </div>
        <span className="text-[5px] bg-white/20 text-white font-bold px-1 rounded">CFO</span>
      </div>
      <div className="p-1.5 space-y-1 flex-1">
        <div className="w-full h-1 bg-zinc-700 rounded" />
        <div className="w-4/5 h-0.5 bg-zinc-300 rounded" />
      </div>
      <div className="p-1 bg-slate-50 border-t border-slate-200 text-[5px] text-zinc-500">Board Advisory • Executive Practice</div>
    </div>
  );
};

export interface CaAccaResumeStudioProps {
  onSwitchToGeneralMode?: () => void;
}

export const CaAccaResumeStudio: React.FC<CaAccaResumeStudioProps> = ({
  onSwitchToGeneralMode,
}) => {
  // Main Resume Data State with initial dynamic randomized data
  const [resume, setResume] = useState<ExtendedFinanceResumeData>(() =>
    generateRandomFinanceResume('audit-exec')
  );

  // Undo / Redo History
  const [history, setHistory] = useState<ExtendedFinanceResumeData[]>([resume]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Active Core Section ('identity' | 'credentials' | 'experience' | 'styling')
  const [activeSection, setActiveSection] = useState<CoreSectionId>('identity');

  // Fill Layout Mode: 'tabs' (focused section) vs 'continuous' (scroll all sections)
  const [fillLayoutMode, setFillLayoutMode] = useState<'tabs' | 'continuous'>('tabs');

  // View Mode: 'split' (side by side), 'form' (edit only), 'preview' (preview only)
  const [viewMode, setViewMode] = useState<'split' | 'form' | 'preview'>('split');

  // Zoom scale for live A4 preview
  const [zoomScale, setZoomScale] = useState<number>(0.84);

  // Modal for Template Gallery
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [gallerySearch, setGallerySearch] = useState<string>('');
  const [atsFriendlyOnly, setAtsFriendlyOnly] = useState<boolean>(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  // DOM Refs
  const resumePrintRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update resume with history capture
  const updateResume = (newResume: ExtendedFinanceResumeData) => {
    setResume(newResume);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newResume);
    if (newHistory.length > 25) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setResume(prev);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setResume(next);
    }
  };

  // Completely Randomize Candidate Profile
  const handleRandomizeEverything = () => {
    const randomized = generateRandomFinanceResume(resume.styling.templateId);
    updateResume(randomized);
    setToastMessage(`Generated fresh candidate: ${randomized.personalInfo?.fullName || 'Profile'}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Clear all fields to start with a blank document
  const handleClearAllFields = () => {
    const blank = createBlankFinanceResume(resume.styling.templateId);
    updateResume(blank);
    setToastMessage('All fields cleared. Ready for manual typing!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Current Theme Object
  const currentTheme = useMemo(() => {
    return COLOR_THEMES.find(t => t.id === resume.styling.colorTheme) || COLOR_THEMES[0];
  }, [resume.styling.colorTheme]);

  // Active Template Meta
  const activeTemplateMeta = useMemo(() => {
    return (
      TEMPLATES_47_CATALOG.find(t => t.id === resume.styling.templateId) ||
      TEMPLATES_47_CATALOG[0]
    );
  }, [resume.styling.templateId]);

  // Safe personal info fallback
  const safePersonalInfo = resume.personalInfo || {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    regNumber: '',
    linkedin: '',
    website: '',
  };

  // Calculate live resume completeness score
  const completeness = useMemo(() => {
    let score = 0;
    if (safePersonalInfo.fullName.trim()) score += 15;
    if (safePersonalInfo.jobTitle.trim()) score += 10;
    if (safePersonalInfo.email.trim()) score += 10;
    if (safePersonalInfo.phone.trim()) score += 10;
    if (resume.objective?.trim() || safePersonalInfo.summary.trim()) score += 15;
    if (resume.qualifications && resume.qualifications.length > 0) score += 15;
    if (resume.education && resume.education.length > 0) score += 10;
    if (resume.articleship && resume.articleship.length > 0) score += 15;
    return Math.min(100, score);
  }, [safePersonalInfo, resume.objective, resume.qualifications, resume.education, resume.articleship]);

  // Filtered templates for modal
  const filteredTemplates = useMemo(() => {
    return TEMPLATES_47_CATALOG.filter(t => {
      const matchesFilter = galleryFilter === 'All' || t.category === galleryFilter;
      const matchesSearch =
        !gallerySearch ||
        t.name.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        t.desc.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        t.code.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        t.id.toLowerCase().includes(gallerySearch.toLowerCase());
      const matchesAts = !atsFriendlyOnly || t.atsFriendly;
      return matchesFilter && matchesSearch && matchesAts;
    });
  }, [galleryFilter, gallerySearch, atsFriendlyOnly]);

  // Vector Print Engine
  const handlePrintResume = () => {
    const element = resumePrintRef.current;
    if (!element) {
      window.print();
      return;
    }

    const existing = document.getElementById('resume-print-mount');
    if (existing) existing.remove();

    const mount = document.createElement('div');
    mount.id = 'resume-print-mount';

    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.transform = 'none';
    clone.style.maxWidth = '100%';
    clone.style.width = '100%';
    clone.style.boxShadow = 'none';
    clone.style.border = 'none';
    clone.querySelectorAll('.no-print').forEach(el => el.remove());
    mount.appendChild(clone);

    document.body.appendChild(mount);
    document.body.classList.add('is-printing-resume');

    setToastMessage('Opening print engine... (Choose "Save as PDF" for crisp vector output)');
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove('is-printing-resume');
        mount.remove();
        setToastMessage(null);
      }, 500);
    }, 150);
  };

  // Direct In-Browser High-Res PDF Export
  const handleExportPdf = async () => {
    const element = resumePrintRef.current;
    if (!element) {
      handlePrintResume();
      return;
    }

    try {
      setIsGeneratingPdf(true);
      setToastMessage('Compiling high-resolution PDF...');
      await new Promise(resolve => setTimeout(resolve, 80));

      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = '794px';
      clone.style.maxWidth = '794px';
      clone.style.minHeight = '1123px';
      clone.style.height = 'auto';
      clone.style.transform = 'none';
      clone.style.margin = '0';
      clone.style.padding = '0';
      clone.style.boxShadow = 'none';
      clone.style.border = 'none';
      clone.style.background = '#ffffff';
      clone.style.zIndex = '-9999';

      clone.querySelectorAll('.no-print').forEach(el => el.remove());
      clone.querySelectorAll('img').forEach(img => {
        img.crossOrigin = 'anonymous';
      });

      document.body.appendChild(clone);
      await new Promise(resolve => setTimeout(resolve, 80));
      sanitizeElementColors(clone);

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        windowWidth: 794,
        scrollX: 0,
        scrollY: 0,
      });

      document.body.removeChild(clone);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = 210;
      const pdfHeight = 297;
      const contentHeightMm = (canvas.height * pdfWidth) / canvas.width;
      
      let imgData: string;
      try {
        imgData = canvas.toDataURL('image/jpeg', 0.98);
      } catch (dataErr) {
        imgData = canvas.toDataURL();
      }

      if (contentHeightMm <= pdfHeight + 5) {
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, Math.min(contentHeightMm, pdfHeight), undefined, 'FAST');
      } else {
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, contentHeightMm, undefined, 'FAST');
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, -pdfHeight, pdfWidth, contentHeightMm, undefined, 'FAST');
      }

      const safeName = (safePersonalInfo.fullName || 'Finance_Candidate').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `${safeName}_${activeTemplateMeta.code}_CV.pdf`;
      pdf.save(filename);

      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}

      setToastMessage(`Downloaded ${filename} successfully!`);
      setTimeout(() => setToastMessage(null), 3500);
    } catch (err) {
      console.error('PDF export error, falling back to Vector Print:', err);
      setToastMessage('Switching to Vector Print engine for crisp PDF export...');
      handlePrintResume();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Export & Import JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${safePersonalInfo.fullName.replace(/\s+/g, '_')}_Finance_Resume.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setToastMessage('Resume JSON backup exported!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        updateResume({ ...INITIAL_CA_ACCA_DATA, ...parsed });
        setToastMessage('Data imported successfully!');
        setTimeout(() => setToastMessage(null), 3000);
      } catch (err) {
        setToastMessage('Invalid JSON file format');
        setTimeout(() => setToastMessage(null), 3000);
      }
    };
    reader.readAsText(file);
  };

  // RENDER FORM SECTIONS
  const renderIdentitySection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-amber-400" />
            <span>Candidate Identity & Career Pitch</span>
          </h2>
          <p className="text-[11px] text-slate-400">Personal identification, primary contacts, and executive summary</p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">Section 1</span>
      </div>

      {/* Headshot Photo */}
      <div className="flex items-center gap-4 p-3 bg-slate-950/80 border border-slate-800 rounded-2xl">
        <img
          src={resume.avatarUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' rx='80' fill='%230f172a'/%3E%3Ccircle cx='80' cy='60' r='28' fill='%23cbd5e1'/%3E%3Cpath d='M30 138 c0 -28 22 -50 50 -50 s50 22 50 50' fill='%23cbd5e1'/%3E%3C/svg%3E"}
          alt="Avatar"
          className="w-13 h-13 rounded-full object-cover border-2 border-amber-500/50 shrink-0"
        />
        <div className="space-y-1">
          <div className="text-xs font-bold text-white">Candidate Headshot Photo</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold cursor-pointer"
            >
              Upload Photo
            </button>
            <button
              type="button"
              onClick={() => updateResume({ ...resume, avatarUrl: undefined })}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] cursor-pointer"
            >
              Remove
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = ev => {
                  updateResume({ ...resume, avatarUrl: ev.target?.result as string });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-300 mb-1">Full Legal Name *</label>
          <input
            type="text"
            value={safePersonalInfo.fullName}
            onChange={e =>
              updateResume({
                ...resume,
                personalInfo: { ...safePersonalInfo, fullName: e.target.value },
              })
            }
            placeholder="e.g. Devon S. Hawthorne"
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-300 mb-1">Target Professional Role *</label>
          <input
            type="text"
            value={safePersonalInfo.jobTitle}
            onChange={e =>
              updateResume({
                ...resume,
                personalInfo: { ...safePersonalInfo, jobTitle: e.target.value },
              })
            }
            placeholder="e.g. Senior Audit & Assurance Associate"
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-300 mb-1">Email Address *</label>
          <input
            type="email"
            value={safePersonalInfo.email}
            onChange={e =>
              updateResume({
                ...resume,
                personalInfo: { ...safePersonalInfo, email: e.target.value },
              })
            }
            placeholder="candidate.audit@firmpartners.com"
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-300 mb-1">Contact Phone / International *</label>
          <input
            type="text"
            value={safePersonalInfo.phone}
            onChange={e =>
              updateResume({
                ...resume,
                personalInfo: { ...safePersonalInfo, phone: e.target.value },
              })
            }
            placeholder="+44 20 7946 0912 / +1 212 555 0192"
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold text-slate-300 mb-1">Location / Residential City & Country</label>
          <input
            type="text"
            value={resume.address || safePersonalInfo.location || ''}
            onChange={e =>
              updateResume({
                ...resume,
                address: e.target.value,
                personalInfo: { ...safePersonalInfo, location: e.target.value },
              })
            }
            placeholder="e.g. London, United Kingdom / New York, NY"
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-300 mb-1">LinkedIn Profile Handle</label>
          <input
            type="text"
            value={safePersonalInfo.linkedin}
            onChange={e =>
              updateResume({
                ...resume,
                personalInfo: { ...safePersonalInfo, linkedin: e.target.value },
              })
            }
            placeholder="linkedin.com/in/candidate-finance"
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-300 mb-1">Professional Portfolio / Credential Link</label>
          <input
            type="text"
            value={safePersonalInfo.website || ''}
            onChange={e =>
              updateResume({
                ...resume,
                personalInfo: { ...safePersonalInfo, website: e.target.value },
              })
            }
            placeholder="candidate.credentials.org"
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Career Vision / Executive Summary */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-[11px] font-bold text-slate-300">Executive Profile & Career Vision</label>
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <span>Power verbs:</span>
            {SUMMARY_VERBS.slice(0, 4).map(v => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  const curr = resume.objective || safePersonalInfo.summary || '';
                  const updated = curr ? `${curr} ${v}` : `${v}`;
                  updateResume({
                    ...resume,
                    objective: updated,
                    personalInfo: { ...safePersonalInfo, summary: updated },
                  });
                }}
                className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[9px] cursor-pointer"
              >
                +{v}
              </button>
            ))}
          </div>
        </div>
        <textarea
          rows={4}
          value={resume.objective || safePersonalInfo.summary || ''}
          onChange={e =>
            updateResume({
              ...resume,
              objective: e.target.value,
              personalInfo: { ...safePersonalInfo, summary: e.target.value },
            })
          }
          placeholder="Articulate your accounting mandate, assurance exposure, audit leadership, or controllership philosophy..."
          className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs leading-relaxed focus:border-amber-500 focus:outline-none"
        />
      </div>
    </div>
  );

  const renderCredentialsSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Professional Registry & Education</span>
          </h2>
          <p className="text-[11px] text-slate-400">Accounting registration, examination track, and university degrees</p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Section 2</span>
      </div>

      {/* Accounting Registry ID / Roll No */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-300 mb-1">Candidate Roll / Registration Number</label>
          <input
            type="text"
            value={resume.crn || safePersonalInfo.regNumber || ''}
            onChange={e =>
              updateResume({
                ...resume,
                crn: e.target.value,
                personalInfo: { ...safePersonalInfo, regNumber: e.target.value },
              })
            }
            placeholder="e.g. ACA-94821 / ACCA-2849102 / CPA-58210"
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-300 mb-1">Batch / Cohort / Session Reference</label>
          <input
            type="text"
            value={resume.ftsBatch || ''}
            onChange={e => updateResume({ ...resume, ftsBatch: e.target.value })}
            placeholder="e.g. Senior Professional Cohort 2025"
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Accounting Exam Stages */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white text-xs">Professional Examination Stages & Modules</span>
          <button
            type="button"
            onClick={() => {
              const newQ = {
                id: `qual-${Date.now()}`,
                course: 'Advanced Strategic Professional Stage',
                body: 'Chartered Accounting Institute',
                year: '2025',
                attempt: 'Passed on 1st Attempt',
                marks: 'High Distinction',
              };
              updateResume({
                ...resume,
                qualifications: [...(resume.qualifications || []), newQ],
              });
            }}
            className="px-2.5 py-1 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Exam Stage</span>
          </button>
        </div>

        {resume.qualifications?.map((q, idx) => (
          <div key={q.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={q.course}
                onChange={e => {
                  const updated = [...(resume.qualifications || [])];
                  updated[idx].course = e.target.value;
                  updateResume({ ...resume, qualifications: updated });
                }}
                placeholder="Stage Name (e.g. Applied Skills / Final Stage)"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
              <input
                type="text"
                value={q.attempt || ''}
                onChange={e => {
                  const updated = [...(resume.qualifications || [])];
                  updated[idx].attempt = e.target.value;
                  updateResume({ ...resume, qualifications: updated });
                }}
                placeholder="Status (e.g. First Attempt Pass)"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={q.marks || ''}
                  onChange={e => {
                    const updated = [...(resume.qualifications || [])];
                    updated[idx].marks = e.target.value;
                    updateResume({ ...resume, qualifications: updated });
                  }}
                  placeholder="Honors / Result Note"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white flex-1"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updated = resume.qualifications?.filter((_, i) => i !== idx);
                    updateResume({ ...resume, qualifications: updated });
                  }}
                  className="p-1.5 text-rose-400 hover:text-rose-300 cursor-pointer"
                  title="Remove stage"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* University & School Background */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white text-xs">Academic Degrees & Higher Education</span>
          <button
            type="button"
            onClick={() => {
              const newEdu = {
                id: `edu-${Date.now()}`,
                institution: 'School of Economics & Finance',
                degree: 'B.Sc. (Hons) in Accounting & Finance',
                field: 'Accountancy',
                location: 'London',
                startDate: '2020',
                endDate: '2023',
                gpa: 'First Class Honours',
              };
              updateResume({
                ...resume,
                education: [...(resume.education || []), newEdu],
              });
            }}
            className="px-2.5 py-1 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Degree</span>
          </button>
        </div>

        {resume.education?.map((edu, idx) => (
          <div key={edu.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={edu.degree}
                onChange={e => {
                  const updated = [...(resume.education || [])];
                  updated[idx].degree = e.target.value;
                  updateResume({ ...resume, education: updated });
                }}
                placeholder="Degree (e.g. B.Sc. in Accounting & Finance)"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
              <input
                type="text"
                value={edu.institution}
                onChange={e => {
                  const updated = [...(resume.education || [])];
                  updated[idx].institution = e.target.value;
                  updateResume({ ...resume, education: updated });
                }}
                placeholder="University / College Name"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
              <input
                type="text"
                value={edu.gpa || ''}
                onChange={e => {
                  const updated = [...(resume.education || [])];
                  updated[idx].gpa = e.target.value;
                  updateResume({ ...resume, education: updated });
                }}
                placeholder="Grade / GPA / Honors (e.g. 3.92 / 4.00)"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={edu.endDate || ''}
                  onChange={e => {
                    const updated = [...(resume.education || [])];
                    updated[idx].endDate = e.target.value;
                    updateResume({ ...resume, education: updated });
                  }}
                  placeholder="Graduation Year (e.g. 2024)"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white flex-1"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updated = resume.education?.filter((_, i) => i !== idx);
                    updateResume({ ...resume, education: updated });
                  }}
                  className="p-1.5 text-rose-400 hover:text-rose-300 cursor-pointer"
                  title="Remove degree"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExperienceSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-sky-400" />
            <span>Assurance Engagements & Tech Skills</span>
          </h2>
          <p className="text-[11px] text-slate-400">Articleship, firm audits, accounting standards, and financial software</p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">Section 3</span>
      </div>

      {/* Articleship & Audit Experience */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white text-xs">Articleship & Firm Engagements</span>
          <button
            type="button"
            onClick={() => {
              const newArt = {
                id: `art-${Date.now()}`,
                role: 'Audit & Assurance Associate',
                firmName: 'Kearney & Sterling LLP',
                location: 'London / New York',
                department: 'Statutory Assurance & Risk Advisory',
                startDate: '2023',
                endDate: 'Present',
                current: true,
                industriesAudited: 'Energy, Manufacturing, Commercial Banking',
                highlights: [
                  'Conducted statutory year-end audit closures for 8 commercial clients with collective revenue over $350M.',
                  'Executed substantive testing on revenue recognition under IFRS 15 and audited IFRS 16 lease schedules.',
                  'Evaluated internal control deficiencies over financial reporting (ICFR) under ISA 315.'
                ]
              };
              updateResume({
                ...resume,
                articleship: [...(resume.articleship || []), newArt],
              });
            }}
            className="px-2.5 py-1 bg-sky-600/30 hover:bg-sky-600/50 text-sky-300 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Engagement</span>
          </button>
        </div>

        {resume.articleship?.map((art, idx) => (
          <div key={art.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={art.role}
                onChange={e => {
                  const updated = [...(resume.articleship || [])];
                  updated[idx].role = e.target.value;
                  updateResume({ ...resume, articleship: updated });
                }}
                placeholder="Role / Title (e.g. Audit Trainee / Associate)"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
              <input
                type="text"
                value={art.firmName}
                onChange={e => {
                  const updated = [...(resume.articleship || [])];
                  updated[idx].firmName = e.target.value;
                  updateResume({ ...resume, articleship: updated });
                }}
                placeholder="Firm Name (e.g. Kearney & Sterling LLP / PwC)"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
              <input
                type="text"
                value={art.department || ''}
                onChange={e => {
                  const updated = [...(resume.articleship || [])];
                  updated[idx].department = e.target.value;
                  updateResume({ ...resume, articleship: updated });
                }}
                placeholder="Department (e.g. Statutory Audit & Assurance)"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={art.industriesAudited || ''}
                  onChange={e => {
                    const updated = [...(resume.articleship || [])];
                    updated[idx].industriesAudited = e.target.value;
                    updateResume({ ...resume, articleship: updated });
                  }}
                  placeholder="Industries Audited (e.g. Banking, FMCG, Energy)"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white flex-1"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updated = resume.articleship?.filter((_, i) => i !== idx);
                    updateResume({ ...resume, articleship: updated });
                  }}
                  className="p-1.5 text-rose-400 hover:text-rose-300 cursor-pointer"
                  title="Remove engagement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Highlights bullet points */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Key Engagements & Quantified Metrics</label>
              <textarea
                rows={3}
                value={art.highlights?.join('\n') || ''}
                onChange={e => {
                  const updated = [...(resume.articleship || [])];
                  updated[idx].highlights = e.target.value.split('\n');
                  updateResume({ ...resume, articleship: updated });
                }}
                placeholder="Enter 1 key accomplishment per line..."
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white leading-relaxed focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Accounting Standards & Assertions */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-bold text-slate-300">Technical Standards & Assertions (IFRS, ISA, SOX)</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {SUGGESTED_STANDARDS.map(std => {
            const isAdded = resume.standards?.includes(std);
            return (
              <button
                key={std}
                type="button"
                onClick={() => {
                  const current = resume.standards || [];
                  const updated = isAdded ? current.filter(s => s !== std) : [...current, std];
                  updateResume({ ...resume, standards: updated });
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {isAdded ? `✓ ${std}` : `+ ${std}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Software & IT Systems */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-bold text-slate-300">Software & Financial ERP Tools</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {SUGGESTED_SOFTWARE.map(sw => {
            const isAdded = resume.software?.includes(sw);
            return (
              <button
                key={sw}
                type="button"
                onClick={() => {
                  const current = resume.software || [];
                  const updated = isAdded ? current.filter(s => s !== sw) : [...current, sw];
                  updateResume({ ...resume, software: updated });
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {isAdded ? `✓ ${sw}` : `+ ${sw}`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderStylingSection = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-purple-400" />
            <span>Architecture Design & Presentation</span>
          </h2>
          <p className="text-[11px] text-slate-400">Select your specialized architecture, corporate palette, and extra credentials</p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">Section 4</span>
      </div>

      {/* Current Architecture Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-blue-400">Active Layout Architecture</span>
          <h3 className="text-sm font-black text-white mt-0.5">
            [{activeTemplateMeta.code}] – {activeTemplateMeta.name}
          </h3>
          <p className="text-[11px] text-slate-300">{activeTemplateMeta.desc}</p>
        </div>

        <button
          type="button"
          onClick={() => setIsGalleryOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 whitespace-nowrap active:scale-95 cursor-pointer"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Browse 8 Architectures</span>
        </button>
      </div>

      {/* 8 Specialized Architectures Grid */}
      <div>
        <label className="block text-xs font-bold text-white mb-2">8 Curated Architecture Presets</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TEMPLATES_47_CATALOG.map(t => {
            const isCurrent = resume.styling.templateId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  updateResume({
                    ...resume,
                    styling: { ...resume.styling, templateId: t.id },
                  });
                  setToastMessage(`Switched to [${t.code}] – ${t.name}!`);
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-blue-950/70 border-blue-500 ring-1 ring-blue-500 shadow-lg'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                    {t.code}
                  </span>
                  {t.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                      {t.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-white">{t.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{t.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Palette Switcher */}
      <div>
        <label className="block text-xs font-bold text-white mb-2">Executive Color Scheme</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {COLOR_THEMES.map(theme => (
            <button
              key={theme.id}
              type="button"
              onClick={() => updateResume({ ...resume, styling: { ...resume.styling, colorTheme: theme.id } })}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                resume.styling.colorTheme === theme.id
                  ? 'bg-slate-950 border-blue-500 ring-1 ring-blue-500'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-4 h-4 rounded-full shadow" style={{ backgroundColor: theme.primary }} />
              <span className="text-xs text-white font-medium truncate">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Typography Toggle */}
      <div>
        <label className="block text-xs font-bold text-white mb-2">Typography Family</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => updateResume({ ...resume, styling: { ...resume.styling, fontFamily: 'sans' } })}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              resume.styling.fontFamily === 'sans'
                ? 'bg-blue-950/60 border-blue-500 text-white font-bold'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <div className="text-xs font-sans">Modern Clean Sans-Serif</div>
            <div className="text-[10px] text-slate-400">High clarity, Big-4 digital consulting</div>
          </button>
          <button
            type="button"
            onClick={() => updateResume({ ...resume, styling: { ...resume.styling, fontFamily: 'serif' } })}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              resume.styling.fontFamily === 'serif'
                ? 'bg-blue-950/60 border-blue-500 text-white font-bold'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <div className="text-xs font-serif font-bold">Prestigious Wall-Street Serif</div>
            <div className="text-[10px] text-slate-400">Classic investment banking & legal advisory</div>
          </button>
        </div>
      </div>

      {/* Additional Activities & References */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <label className="block text-xs font-bold text-white">Leadership, Governance & Extra-Curricular</label>
        <input
          type="text"
          value={resume.activities || ''}
          onChange={e => updateResume({ ...resume, activities: e.target.value })}
          placeholder="e.g. Student Council President • University Debating Champion • Corporate Governance Fellow"
          className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
        />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 py-6 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER & STUDIO TITLE */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Professional Audit & Corporate Finance Standard</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                8 Specialized Architectures
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Chartered & Finance Executive CV Studio</span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Precision workstation for Audit Associates, ACCA Candidates, Corporate Controllers, and CFOs.
              Select from 8 specialized architectures with instant live rendering and 100% vector PDF export.
            </p>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Randomize Everything Button */}
            <button
              onClick={handleRandomizeEverything}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-600/30 active:scale-95 cursor-pointer transition-all"
              title="Generate a completely random realistic profile with names, credentials, and schools"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-200" />
              <span>🎲 Randomize Profile</span>
            </button>

            {/* Clear All Fields Button */}
            <button
              onClick={handleClearAllFields}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:border-rose-500/50 border border-slate-700 text-slate-300 hover:text-rose-200 text-xs font-semibold flex items-center gap-1.5 active:scale-95 cursor-pointer transition-all"
              title="Clear all fields to type a completely blank resume"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>🧹 Clear All</span>
            </button>

            <button
              onClick={() => setIsGalleryOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95 cursor-pointer transition-all"
            >
              <Palette className="w-4 h-4 text-emerald-300" />
              <span>Architecture ({activeTemplateMeta.code})</span>
            </button>

            <button
              onClick={handleExportPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95 cursor-pointer transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Compiling PDF...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={handlePrintResume}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs cursor-pointer"
              title="Print via Browser"
            >
              <Printer className="w-4 h-4" />
            </button>

            {onSwitchToGeneralMode && (
              <button
                onClick={onSwitchToGeneralMode}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                title="Switch to General ATS Resume Mode"
              >
                <span>General ATS Mode</span>
              </button>
            )}
          </div>
        </div>

        {/* View Mode Switcher: Split View, Edit Form, Live A4 */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Split View (Side-by-Side)</span>
            </button>

            <button
              onClick={() => setViewMode('form')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'form'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Edit Form Only</span>
            </button>

            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live A4 Preview Only</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportJson}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup JSON</span>
            </button>

            <label className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Restore JSON</span>
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* WORKSPACE MAIN BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: THE USER-FRIENDLY FILLING AREA */}
        {(viewMode === 'split' || viewMode === 'form') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'} min-w-0 space-y-4`}>
            {/* Header Hub Card: Active Architecture & Readiness Score */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-mono text-xs font-black border border-blue-500/30">
                  {activeTemplateMeta.code}
                </span>
                <div>
                  <div className="text-xs font-black text-white">{activeTemplateMeta.name}</div>
                  <div className="text-[10px] text-slate-400">
                    {activeTemplateMeta.atsFriendly ? '100% Parser Compliant • ATS Safe' : 'Executive Visual Architecture'}
                  </div>
                </div>
              </div>

              {/* Progress & Completeness */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400">Readiness Score</div>
                  <div className="text-xs font-black text-emerald-400">{completeness}% Complete</div>
                </div>
                <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${completeness}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Layout Mode Selector: Section Tabs vs Continuous Single-Page */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="text-xs font-bold text-slate-300">Resume Filling Mode:</div>
              <div className="flex items-center gap-1 p-0.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
                <button
                  type="button"
                  onClick={() => setFillLayoutMode('tabs')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    fillLayoutMode === 'tabs' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Focused Sections
                </button>
                <button
                  type="button"
                  onClick={() => setFillLayoutMode('continuous')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    fillLayoutMode === 'continuous' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Continuous Scroll (All)
                </button>
              </div>
            </div>

            {/* Section Tab Navigation Pills (When in focused tabs mode) */}
            {fillLayoutMode === 'tabs' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CORE_SECTIONS.map(sec => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setActiveSection(sec.id)}
                      className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'bg-gradient-to-br from-blue-950/80 to-slate-900 border-blue-500 text-white shadow-lg ring-1 ring-blue-500'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                        <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-slate-300">
                          {sec.id === 'identity' ? '1' : sec.id === 'credentials' ? '2' : sec.id === 'experience' ? '3' : '4'}
                        </span>
                      </div>
                      <div className="text-xs font-bold leading-tight truncate">{sec.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{sec.desc}</div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* MAIN FORM CARD CONTAINER */}
            <div className="p-5 sm:p-6 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-xl space-y-6">
              {fillLayoutMode === 'tabs' ? (
                <>
                  {activeSection === 'identity' && renderIdentitySection()}
                  {activeSection === 'credentials' && renderCredentialsSection()}
                  {activeSection === 'experience' && renderExperienceSection()}
                  {activeSection === 'styling' && renderStylingSection()}

                  {/* Wizard Bottom Prev / Next Navigators */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                      disabled={activeSection === 'identity'}
                      onClick={() => {
                        const idx = CORE_SECTIONS.findIndex(s => s.id === activeSection);
                        if (idx > 0) setActiveSection(CORE_SECTIONS[idx - 1].id);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>

                    <span className="text-[11px] font-mono text-slate-400">
                      Section {CORE_SECTIONS.findIndex(s => s.id === activeSection) + 1} of 4
                    </span>

                    <button
                      disabled={activeSection === 'styling'}
                      onClick={() => {
                        const idx = CORE_SECTIONS.findIndex(s => s.id === activeSection);
                        if (idx < CORE_SECTIONS.length - 1) setActiveSection(CORE_SECTIONS[idx + 1].id);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs disabled:opacity-40 flex items-center gap-1 cursor-pointer shadow-md shadow-emerald-600/30"
                    >
                      <span>Next Section</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                /* Continuous Scroll Mode */
                <div className="space-y-8 divide-y divide-slate-800">
                  <div className="pt-2">{renderIdentitySection()}</div>
                  <div className="pt-6">{renderCredentialsSection()}</div>
                  <div className="pt-6">{renderExperienceSection()}</div>
                  <div className="pt-6">{renderStylingSection()}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: LIVE A4 PREVIEW (visible in split or preview mode) */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'} min-w-0 space-y-3`}>
            {/* Live Preview Control Bar */}
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white">Live A4 Canvas Preview</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 font-semibold">
                  [{activeTemplateMeta.code}]
                </span>
              </div>

              {/* Zoom and PDF Actions */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-slate-300 text-xs">
                  <button
                    onClick={() => setZoomScale(prev => Math.max(0.5, prev - 0.05))}
                    className="p-1 hover:text-white cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[11px] w-10 text-center">{Math.round(zoomScale * 100)}%</span>
                  <button
                    onClick={() => setZoomScale(prev => Math.min(1.25, prev + 0.05))}
                    className="p-1 hover:text-white cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setZoomScale(0.84)}
                    className="text-[10px] text-blue-400 hover:text-blue-300 ml-1 px-1 cursor-pointer"
                    title="Reset Zoom"
                  >
                    Fit
                  </button>
                </div>

                <button
                  onClick={handleExportPdf}
                  disabled={isGeneratingPdf}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isGeneratingPdf ? 'Compiling...' : 'PDF'}</span>
                </button>
              </div>
            </div>

            {/* A4 Canvas Container with Zoom Transform */}
            <div className="w-full bg-slate-950 border border-slate-800/90 rounded-3xl p-3 sm:p-6 overflow-x-auto flex justify-center shadow-inner min-h-[850px]">
              <div
                style={{
                  width: `${A4_WIDTH_PX * zoomScale}px`,
                  minHeight: `${A4_HEIGHT_PX * zoomScale}px`,
                  transition: 'all 0.15s ease-out',
                }}
                className="relative shrink-0 flex justify-center"
              >
                <div
                  style={{
                    width: `${A4_WIDTH_PX}px`,
                    minHeight: `${A4_HEIGHT_PX}px`,
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'top center',
                  }}
                  className="bg-white shadow-2xl rounded-sm border border-slate-300 overflow-hidden shrink-0 select-text"
                >
                  {/* Print Target */}
                  <div id="printable-resume" ref={resumePrintRef} className="w-full h-full bg-white text-zinc-900">
                    <CaAccaTemplateRenderer
                      resume={resume}
                      currentTheme={currentTheme}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 8 SPECIALIZED ARCHITECTURES INTERACTIVE MODAL GALLERY */}
      {/* ========================================================================= */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-6xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-black text-white">
                    8 Specialized Architectures for CA, ACCA & Finance
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 font-bold">
                    {filteredTemplates.length} Available
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click any architecture to immediately apply it to your live document with authentic styling.
                </p>
              </div>

              <button
                onClick={() => setIsGalleryOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={gallerySearch}
                  onChange={e => setGallerySearch(e.target.value)}
                  placeholder="Search architecture styles, roles, or sectors (e.g. Audit, Tax, Controller, Treasury)..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAtsFriendlyOnly(prev => !prev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    atsFriendlyOnly
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  ATS Optimized Only
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="px-5 py-2.5 bg-slate-950 border-b border-slate-800 flex gap-2 overflow-x-auto scrollbar-thin">
              {['All', 'Finance / Audit', 'CA / ACCA', 'Executive', 'Modern', 'Minimal'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    galleryFilter === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 8 Architectures Grid */}
            <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredTemplates.map(tpl => {
                const isCurrent = resume.styling.templateId === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => {
                      updateResume({
                        ...resume,
                        styling: { ...resume.styling, templateId: tpl.id },
                      });
                      setIsGalleryOpen(false);
                      setToastMessage(`Architecture switched to [${tpl.code}] – ${tpl.name}!`);
                      setTimeout(() => setToastMessage(null), 3000);
                    }}
                    className={`rounded-2xl border p-3.5 flex flex-col justify-between transition-all cursor-pointer relative group ${
                      isCurrent
                        ? 'bg-blue-950/70 border-blue-500 ring-2 ring-blue-500 shadow-xl'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div>
                      {/* Header Row */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="font-mono font-bold text-xs text-blue-400">[{tpl.code}]</span>
                        <div className="flex items-center gap-1">
                          {tpl.atsFriendly && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                              ATS
                            </span>
                          )}
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-slate-300 font-medium">
                            {tpl.category}
                          </span>
                        </div>
                      </div>

                      {/* Rich miniature preview card */}
                      <TemplateThumbnailPreview
                        template={tpl}
                        primaryColor={currentTheme.primary}
                        name={safePersonalInfo.fullName}
                      />

                      <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                        {tpl.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {tpl.desc}
                      </p>
                    </div>

                    <button
                      className={`w-full mt-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-300 group-hover:bg-blue-600 group-hover:text-white'
                      }`}
                    >
                      {isCurrent ? 'Active Architecture ✓' : 'Use Architecture →'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
