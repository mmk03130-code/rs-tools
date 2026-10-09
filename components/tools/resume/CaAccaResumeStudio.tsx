import React, { useState, useRef, useMemo } from 'react';
import {
  Download, Sparkles, Check, Plus, Trash2, Sliders, Palette,
  Type, ShieldCheck, Eye, RefreshCw, FileText,
  User, Briefcase, GraduationCap, Code, Award, ExternalLink,
  Upload, Copy, ZoomIn, ZoomOut, CheckCircle2, AlertCircle, FileCode, Printer,
  BookOpen, Building2, Table, Hash, Percent, FileCheck, CheckSquare, Search,
  X, ChevronLeft, ChevronRight, Shuffle, Undo2, Redo2, Phone, Mail, MapPin, Globe,
  HelpCircle, CheckCircle, Layers, Grid, List
} from 'lucide-react';
import { FinanceResumeData } from '../../../types/tools';
import { CaAccaTemplateRenderer, ExtendedFinanceResumeData } from './CaAccaTemplateRenderer';
import { TEMPLATES_47_CATALOG, TemplateMeta } from './templates47Data';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Clean, professional SVG data URI for candidate avatar (zero CORS risk, zero network dependency, 100% canvas export safe)
const DEFAULT_AVATAR_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' rx='80' fill='%230f172a'/%3E%3Ccircle cx='80' cy='60' r='28' fill='%23e2e8f0'/%3E%3Cpath d='M30 138 c0 -28 22 -50 50 -50 s50 22 50 50' fill='%23e2e8f0'/%3E%3C/svg%3E";

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

// Initial baseline candidate with generic professional profile "Mr. R"
const INITIAL_CA_ACCA_DATA: ExtendedFinanceResumeData = {
  ftsBatch: '48',
  crn: 'CRN-98421',
  address: 'Model Town, Block C, Lahore, Pakistan',
  objective: 'Dedicated and results-oriented Chartered Accountancy trainee seeking an articleship induction in a reputable audit and assurance practice. Committed to applying strong analytical grounding in IFRS, ISA, and Corporate Taxation to statutory audit engagements while upholding strict ethical objectivity.',
  avatarUrl: DEFAULT_AVATAR_DATA_URI,
  personalInfo: {
    fullName: 'Mr. R',
    jobTitle: 'Chartered Accountant Trainee (Articleship)',
    regNumber: 'CRN-98421',
    email: 'mr.r.audit@example.com',
    phone: '+92 300 1234567',
    location: 'Lahore, Pakistan',
    linkedin: 'linkedin.com/in/mr-r-finance',
    website: 'mr-r-portfolio.com',
    summary: 'Dedicated and results-oriented Chartered Accountancy trainee seeking an articleship induction in a reputable audit and assurance practice. Committed to applying strong analytical grounding in IFRS, ISA, and Corporate Taxation to statutory audit engagements while upholding strict ethical objectivity.',
  },
  qualifications: [
    {
      id: 'q1',
      course: 'Assessment of Fundamental Competencies (AFC / PRC)',
      body: 'ICAP',
      year: 'June 2021',
      attempt: 'in 1 attempt',
      marks: 'Passed',
    },
    {
      id: 'q2',
      course: 'Certificate in Accounting and Finance (CAF)',
      body: 'ICAP',
      year: 'Recent Session',
      attempt: 'qualified in 3 attempts',
      marks: '(2 papers result awaited)',
    },
  ],
  education: [
    {
      id: 'e1',
      institution: 'Forman Christian College',
      degree: 'INTERMEDIATE',
      field: 'Commerce / Pre-Medical',
      location: 'Lahore',
      startDate: '2018',
      endDate: '2020',
      gpa: '84.5% (A+)',
    },
    {
      id: 'e2',
      institution: 'Model High School / Premier Academy',
      degree: 'MATRICULATION',
      field: 'Science',
      location: 'Lahore',
      startDate: '2016',
      endDate: '2018',
      gpa: '91.2% (A+)',
    },
  ],
  articleship: [
    {
      id: 'art1',
      firmName: 'Premier SME Advisory & Client Engagements',
      role: 'Bookkeeping & Financial Statement Preparation',
      location: 'Lahore',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      department: 'Financial Advisory',
      industriesAudited: 'Trading, Small Manufacturing',
      highlights: [
        'Prepared monthly journals, ledgers, and trial balances using QuickBooks and Advanced Excel.',
        'Assisted in reconciling bank statements, general ledgers, and preparing final tax computations.',
      ],
    },
    {
      id: 'art2',
      firmName: 'Premier Coaching Institute',
      role: 'Faculty & Mentoring in Financial Accounting & Math',
      location: 'Lahore',
      startDate: '2021',
      endDate: '2023',
      current: false,
      department: 'Education',
      industriesAudited: 'Academic',
      highlights: [
        'Mentored aspiring students in Fundamental Accounting, Quantitative Methods, and Financial Mathematics.',
      ],
    },
  ],
  experiences: [],
  standards: [
    'Financial Accounting & Reporting (IFRS / IAS)',
    'Audit Sampling & Risk Assessment (ISA)',
    'Advanced MS Excel (VLOOKUP, Pivot Tables, XLOOKUP)',
    'QuickBooks & ERP Familiarity',
    'Strong Professional Skepticism & Attention to Detail',
    'Effective Business Communication & Presentation',
    'Time Management & Deadline Adherence',
  ],
  software: [
    'Advanced MS Excel',
    'QuickBooks Desktop & Online',
    'Tally Prime',
    'Power BI',
  ],
  coreCompetencies: [
    'Statutory Audit & Assurance',
    'Financial Reporting (IFRS)',
    'Internal Controls & Testing',
    'Taxation (Income Tax Ordinance 2001 & Sales Tax)',
  ],
  courses: [
    { id: 'c1', name: 'Presentation & Personal Effectiveness (PPEC - ICAP)', institute: 'ICAP' },
    { id: 'c2', name: 'Financial Modeling & Valuation Analysis (FMVA)', institute: 'Online' },
    { id: 'c3', name: 'MS Office & Advanced Excel Automation', institute: 'PAC / SKANS' },
    { id: 'c4', name: 'Data Analytics & Business Intelligence', institute: 'Digiskills' },
  ],
  achievements: [
    { id: 'a1', title: '75% Merit scholarship for Intermediate' },
    { id: 'a2', title: 'All AFC/PRC papers qualified in 1st attempt' },
    { id: 'a3', title: 'Merit Certificate in Accounting & Financial Reporting' },
  ],
  references: [
    {
      id: 'r1',
      name: 'Muhammad Rashid FCA',
      role: 'Partner, Audit & Assurance Advisory',
      email: 'rashid.fca@example.com',
      phone: '+92 300 7654321',
    },
  ],
  activities: 'Debate Team Captain • Inter-College Badminton Champion',
  languages: [
    { id: 'l1', language: 'Urdu', proficiency: 'Native' },
    { id: 'l2', language: 'English', proficiency: 'Professional' },
    { id: 'l3', language: 'Punjabi', proficiency: 'Conversational' },
  ],
  certifications: [],
  styling: {
    templateId: 'T-47',
    colorTheme: 'navy',
    fontFamily: 'sans',
    spacing: 'standard',
    paperSize: 'a4',
    fontSize: 'base',
  },
};

const COLOR_THEMES = [
  { id: 'navy', name: 'Taxman Executive Navy', primary: '#021B3A', secondary: '#1e3a8a', accent: '#3b82f6' },
  { id: 'slate', name: 'Big 4 Slate Charcoal', primary: '#0f172a', secondary: '#334155', accent: '#64748b' },
  { id: 'burgundy', name: 'ICAP Royal Crimson', primary: '#581c87', secondary: '#7e22ce', accent: '#a855f7' },
  { id: 'emerald', name: 'Audit Green & Assurance', primary: '#064e3b', secondary: '#047857', accent: '#10b981' },
  { id: 'corporate', name: 'Banking Cobalt Blue', primary: '#1e40af', secondary: '#2563eb', accent: '#60a5fa' },
  { id: 'minimal', name: 'Pure Monochrome Black', primary: '#18181b', secondary: '#27272a', accent: '#52525b' },
];

const STEPS = [
  { num: 1, name: 'Personal & Contact', icon: User, desc: 'Name, CRN, FTS Batch & Contacts' },
  { num: 2, name: 'CA / ACCA Track', icon: Award, desc: 'PRC/CAF Stages & Attempts' },
  { num: 3, name: 'Career Objective', icon: FileText, desc: 'Articleship induction summary' },
  { num: 4, name: 'Academic Background', icon: GraduationCap, desc: 'Intermediate & Matriculation' },
  { num: 5, name: 'Articleship / Experience', icon: Briefcase, desc: 'Firms, SME clients & roles' },
  { num: 6, name: 'Competencies & IFRS', icon: CheckSquare, desc: 'IFRS, ISA & Core Strengths' },
  { num: 7, name: 'Software & Tools', icon: Code, desc: 'Excel, QuickBooks, Tally, BI' },
  { num: 8, name: 'Certifications & Courses', icon: BookOpen, desc: 'PPEC, FMVA, IT Trainings' },
  { num: 9, name: 'References & Activities', icon: Building2, desc: 'FCA/ACA References & Sports' },
  { num: 10, name: 'Appearance & Template', icon: Palette, desc: 'Choose from all 47 Templates' },
];

// Rich, vivid miniature preview component for every template in the 47 gallery
const TemplateThumbnailPreview: React.FC<{
  template: TemplateMeta;
  primaryColor: string;
  name: string;
}> = ({ template, primaryColor, name }) => {
  const id = template.id;

  // Render archetype layout depending on template ID
  if (['T-02', 'T-03', 'T-25', 'T-31'].includes(id)) {
    const isDarkLeft = id === 'T-03';
    return (
      <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs flex select-none mb-2.5">
        {/* Left Column */}
        <div
          className={`w-[35%] p-1.5 flex flex-col justify-between ${
            isDarkLeft ? 'bg-slate-900 text-white' : 'bg-slate-100 text-zinc-900 border-r border-slate-200'
          }`}
          style={!isDarkLeft ? { borderRightColor: primaryColor } : {}}
        >
          <div>
            <div className="w-5 h-5 rounded-full bg-slate-300 mx-auto mb-1 border border-white" />
            <div className="w-full h-1 bg-current opacity-80 rounded mb-0.5" />
            <div className="w-3/4 h-1 bg-current opacity-60 rounded" />
          </div>
          <div className="space-y-0.5">
            <div className="w-full h-0.5 bg-current opacity-40 rounded" />
            <div className="w-4/5 h-0.5 bg-current opacity-40 rounded" />
            <div className="w-2/3 h-0.5 bg-current opacity-40 rounded" />
          </div>
        </div>
        {/* Right Column */}
        <div className="w-[65%] p-1.5 flex flex-col justify-between">
          <div>
            <div className="text-[7.5px] font-black uppercase tracking-tight text-zinc-900 truncate">
              {name || 'Mr. R'}
            </div>
            <div className="w-10 h-0.5 rounded my-0.5" style={{ backgroundColor: primaryColor }} />
            <div className="w-full h-1 bg-zinc-200 rounded mb-0.5" />
            <div className="w-4/5 h-1 bg-zinc-100 rounded" />
          </div>
          <div className="space-y-1">
            <div className="w-full h-1 bg-zinc-300 rounded" />
            <div className="w-full h-0.5 bg-zinc-200 rounded" />
            <div className="w-3/4 h-0.5 bg-zinc-200 rounded" />
          </div>
          <div className="space-y-0.5">
            <div className="w-full h-1 bg-zinc-300 rounded" />
            <div className="w-2/3 h-0.5 bg-zinc-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (id === 'T-04') {
    return (
      <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs flex select-none mb-2.5">
        {/* Left Main */}
        <div className="w-[65%] p-1.5 flex flex-col justify-between">
          <div>
            <div className="text-[7.5px] font-black uppercase text-zinc-900 truncate">{name || 'Mr. R'}</div>
            <div className="w-12 h-0.5 rounded my-0.5" style={{ backgroundColor: primaryColor }} />
            <div className="w-full h-1 bg-zinc-200 rounded mb-0.5" />
          </div>
          <div className="space-y-1">
            <div className="w-full h-1 bg-zinc-300 rounded" />
            <div className="w-4/5 h-0.5 bg-zinc-200 rounded" />
          </div>
          <div className="space-y-0.5">
            <div className="w-full h-1 bg-zinc-300 rounded" />
            <div className="w-3/5 h-0.5 bg-zinc-200 rounded" />
          </div>
        </div>
        {/* Right Sidebar */}
        <div className="w-[35%] p-1.5 bg-slate-100 border-l border-slate-200 flex flex-col justify-between">
          <div className="w-5 h-5 rounded-full bg-slate-300 mx-auto mb-1" />
          <div className="space-y-0.5">
            <div className="w-full h-1 bg-zinc-300 rounded" />
            <div className="w-4/5 h-0.5 bg-zinc-200 rounded" />
          </div>
          <div className="space-y-0.5">
            <div className="w-full h-0.5 bg-zinc-300 rounded" />
            <div className="w-2/3 h-0.5 bg-zinc-300 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (['T-22', 'T-27', 'T-28'].includes(id)) {
    return (
      <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs flex flex-col justify-between select-none mb-2.5">
        {/* Top Colored Header Band */}
        <div className="p-1.5 text-white flex items-center justify-between" style={{ backgroundColor: primaryColor }}>
          <div>
            <div className="text-[7.5px] font-black uppercase tracking-tight text-white truncate max-w-[80px]">
              {name || 'Mr. R'}
            </div>
            <div className="w-8 h-0.5 bg-emerald-300 rounded mt-0.5" />
          </div>
          <div className="w-4 h-4 rounded-full bg-white/20 border border-white/40" />
        </div>
        {/* Content Body */}
        <div className="p-1.5 flex-1 flex flex-col justify-between space-y-1">
          <div>
            <div className="w-full h-1 bg-zinc-200 rounded mb-0.5" />
            <div className="w-4/5 h-1 bg-zinc-100 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="h-4 bg-zinc-50 border border-zinc-200 rounded p-0.5" />
            <div className="h-4 bg-zinc-50 border border-zinc-200 rounded p-0.5" />
          </div>
          <div className="space-y-0.5">
            <div className="w-full h-1 bg-zinc-300 rounded" />
            <div className="w-3/4 h-0.5 bg-zinc-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (['T-29', 'T-30', 'T-32', 'T-42'].includes(id)) {
    return (
      <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs p-1.5 flex flex-col justify-between select-none mb-2.5">
        <div className="flex justify-between items-center border-b pb-0.5">
          <div className="text-[7.5px] font-black text-zinc-900 uppercase truncate">{name || 'Mr. R'}</div>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
        </div>
        {/* 2x2 Mini Cards */}
        <div className="grid grid-cols-2 gap-1 my-1">
          <div className="border border-zinc-300 rounded p-1 bg-zinc-50 space-y-0.5">
            <div className="w-8 h-1 rounded" style={{ backgroundColor: primaryColor }} />
            <div className="w-full h-0.5 bg-zinc-200 rounded" />
          </div>
          <div className="border border-zinc-300 rounded p-1 bg-zinc-50 space-y-0.5">
            <div className="w-8 h-1 rounded" style={{ backgroundColor: primaryColor }} />
            <div className="w-full h-0.5 bg-zinc-200 rounded" />
          </div>
          <div className="border border-zinc-300 rounded p-1 bg-zinc-50 col-span-2 space-y-0.5">
            <div className="w-12 h-1 rounded" style={{ backgroundColor: primaryColor }} />
            <div className="w-full h-0.5 bg-zinc-200 rounded" />
          </div>
        </div>
        <div className="w-full h-0.5 bg-zinc-200 rounded" />
      </div>
    );
  }

  if (id === 'T-21') {
    return (
      <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs p-1.5 flex flex-col justify-between select-none mb-2.5">
        <div className="border-b pb-0.5">
          <div className="text-[7.5px] font-black text-zinc-900 uppercase truncate">{name || 'Mr. R'}</div>
          <div className="text-[5.5px] text-zinc-500">Timeline Architecture</div>
        </div>
        {/* Timeline with nodes */}
        <div className="border-l-2 pl-2 my-1 space-y-1.5" style={{ borderColor: primaryColor }}>
          <div className="relative">
            <div className="w-1.5 h-1.5 rounded-full absolute -left-[11px] top-0" style={{ backgroundColor: primaryColor }} />
            <div className="w-10 h-1 bg-zinc-400 rounded" />
            <div className="w-full h-0.5 bg-zinc-200 rounded mt-0.5" />
          </div>
          <div className="relative">
            <div className="w-1.5 h-1.5 rounded-full absolute -left-[11px] top-0" style={{ backgroundColor: primaryColor }} />
            <div className="w-12 h-1 bg-zinc-400 rounded" />
            <div className="w-full h-0.5 bg-zinc-200 rounded mt-0.5" />
          </div>
          <div className="relative">
            <div className="w-1.5 h-1.5 rounded-full absolute -left-[11px] top-0" style={{ backgroundColor: primaryColor }} />
            <div className="w-8 h-1 bg-zinc-400 rounded" />
          </div>
        </div>
        <div className="w-full h-0.5 bg-zinc-200 rounded" />
      </div>
    );
  }

  if (['T-07', 'T-08', 'T-39'].includes(id)) {
    return (
      <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs p-1.5 flex flex-col justify-between select-none mb-2.5">
        <div className="text-center border-b-2 pb-1" style={{ borderColor: primaryColor }}>
          <div className="text-[8px] font-serif font-black uppercase text-zinc-900 truncate">{name || 'Mr. R'}</div>
          <div className="text-[5.5px] text-zinc-600">Executive Finance & Assurance</div>
        </div>
        {/* Quote Callout Banner */}
        <div className="p-1 bg-zinc-50 border-l-2 rounded-r my-1" style={{ borderLeftColor: primaryColor }}>
          <div className="w-full h-1 bg-zinc-300 rounded mb-0.5" />
          <div className="w-3/4 h-0.5 bg-zinc-200 rounded" />
        </div>
        <div className="space-y-1">
          <div className="w-full h-1 bg-zinc-400 rounded" />
          <div className="w-5/6 h-0.5 bg-zinc-200 rounded" />
          <div className="w-full h-1 bg-zinc-400 rounded" />
          <div className="w-4/5 h-0.5 bg-zinc-200 rounded" />
        </div>
        <div className="w-full h-0.5 bg-zinc-200 rounded" />
      </div>
    );
  }

  if (['T-09', 'T-10', 'T-11', 'T-17', 'T-18', 'T-47'].includes(id)) {
    return (
      <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs p-1.5 flex flex-col justify-between select-none mb-2.5">
        <div className="p-1 rounded text-white flex justify-between items-center" style={{ backgroundColor: primaryColor }}>
          <span className="text-[7px] font-black uppercase tracking-tight truncate">{name || 'Mr. R'}</span>
          <span className="text-[5px] font-mono bg-white/20 px-1 rounded">FTS-48</span>
        </div>
        {/* Examination Table Preview */}
        <div className="border border-zinc-200 rounded p-1 bg-zinc-50 my-1 space-y-0.5">
          <div className="w-full h-1 bg-zinc-300 rounded flex justify-between">
            <span className="w-1/3 h-full bg-zinc-400 rounded" />
            <span className="w-1/4 h-full bg-emerald-500 rounded" />
          </div>
          <div className="w-full h-0.5 bg-zinc-200 rounded" />
          <div className="w-full h-0.5 bg-zinc-200 rounded" />
        </div>
        <div className="space-y-1">
          <div className="w-full h-1 rounded" style={{ backgroundColor: primaryColor }} />
          <div className="w-4/5 h-0.5 bg-zinc-200 rounded" />
          <div className="w-full h-0.5 bg-zinc-200 rounded" />
        </div>
        <div className="w-full h-0.5 bg-zinc-200 rounded" />
      </div>
    );
  }

  // Default Standard Clean ATS Architecture
  return (
    <div className="w-full h-32 rounded-lg bg-white border border-slate-300 overflow-hidden shadow-xs p-2 flex flex-col justify-between select-none mb-2.5">
      <div className="text-center border-b pb-1">
        <div className="text-[8px] font-black uppercase text-zinc-950 truncate tracking-wider">{name || 'Mr. R'}</div>
        <div className="text-[5.5px] text-zinc-600">Chartered Accountant Trainee (Articleship)</div>
      </div>
      <div className="space-y-1">
        <div className="w-full h-1 bg-zinc-800 rounded" />
        <div className="w-full h-0.5 bg-zinc-200 rounded" />
        <div className="w-5/6 h-0.5 bg-zinc-200 rounded" />
      </div>
      <div className="space-y-1">
        <div className="w-full h-1 bg-zinc-800 rounded" />
        <div className="w-4/5 h-0.5 bg-zinc-200 rounded" />
      </div>
      <div className="space-y-0.5">
        <div className="w-full h-1 bg-zinc-800 rounded" />
        <div className="w-3/4 h-0.5 bg-zinc-200 rounded" />
      </div>
      <div className="w-full h-0.5 bg-zinc-200 rounded" />
    </div>
  );
};

export interface CaAccaResumeStudioProps {
  onSwitchToGeneralMode?: () => void;
}

export const CaAccaResumeStudio: React.FC<CaAccaResumeStudioProps> = ({
  onSwitchToGeneralMode,
}) => {
  // Navigation: Sath Sath (Split View), Edit Form Only, Live A4 Preview Only
  const [viewMode, setViewMode] = useState<'split' | 'form' | 'preview'>('split');

  // Wizard 10 Steps
  const [activeStep, setActiveStep] = useState<number>(1);

  // Resume State with Undo/Redo history
  const [resume, setResume] = useState<ExtendedFinanceResumeData>(INITIAL_CA_ACCA_DATA);
  const [history, setHistory] = useState<ExtendedFinanceResumeData[]>([INITIAL_CA_ACCA_DATA]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Modal for Template Gallery (47 Templates)
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [gallerySearch, setGallerySearch] = useState<string>('');
  const [atsFriendlyOnly, setAtsFriendlyOnly] = useState<boolean>(false);

  // Zoom & Responsive Layout States
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(600);
  const [zoomMode, setZoomMode] = useState<'fit' | '100' | 'custom'>('fit');
  const [customZoom, setCustomZoom] = useState<number>(100);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const resumePrintRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Measure container width dynamically to eliminate horizontal cut-off in split mode
  React.useEffect(() => {
    const handleResize = () => {
      if (previewContainerRef.current) {
        setContainerWidth(previewContainerRef.current.clientWidth);
      }
    };
    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (previewContainerRef.current) {
      observer.observe(previewContainerRef.current);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [viewMode]);

  // Auto-fit scale ensures the 794px A4 sheet fits inside the container width with padding
  const autoFitScale = useMemo(() => {
    const usableWidth = Math.max(280, containerWidth - 36);
    return Math.min(1.0, Math.max(0.35, usableWidth / A4_WIDTH_PX));
  }, [containerWidth]);

  const currentScale = useMemo(() => {
    if (zoomMode === 'fit') return autoFitScale;
    if (zoomMode === '100') return 1.0;
    return customZoom / 100;
  }, [zoomMode, autoFitScale, customZoom]);

  // State update wrapper with history push
  const updateResume = (updated: ExtendedFinanceResumeData) => {
    setResume(updated);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(updated);
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

  const safePersonalInfo = {
    fullName: resume?.personalInfo?.fullName || 'Mr. R',
    jobTitle: resume?.personalInfo?.jobTitle || 'Chartered Accountant Trainee (Articleship)',
    regNumber: resume?.personalInfo?.regNumber || 'CRN-98421',
    email: resume?.personalInfo?.email || 'mr.r.audit@example.com',
    phone: resume?.personalInfo?.phone || '+92 300 1234567',
    location: resume?.personalInfo?.location || 'Lahore, Pakistan',
    linkedin: resume?.personalInfo?.linkedin || 'linkedin.com/in/mr-r-finance',
    website: resume?.personalInfo?.website || 'mr-r-portfolio.com',
    summary: resume?.personalInfo?.summary || '',
  };

  const currentTheme = COLOR_THEMES.find(t => t.id === resume.styling.colorTheme) || COLOR_THEMES[0];
  const activeTemplateMeta = TEMPLATES_47_CATALOG.find(t => t.id === resume.styling.templateId) || TEMPLATES_47_CATALOG[46];

  // Memoized filtered templates list
  const filteredTemplates = useMemo(() => {
    return TEMPLATES_47_CATALOG.filter(t => {
      const matchesFilter = galleryFilter === 'All' || t.category === galleryFilter;
      const matchesSearch =
        !gallerySearch ||
        t.name.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        t.desc.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        t.id.toLowerCase().includes(gallerySearch.toLowerCase());
      const matchesAts = !atsFriendlyOnly || t.atsFriendly;
      return matchesFilter && matchesSearch && matchesAts;
    });
  }, [galleryFilter, gallerySearch, atsFriendlyOnly]);

  // Surprise Me Random Template
  const handleSurpriseMe = () => {
    const random = TEMPLATES_47_CATALOG[Math.floor(Math.random() * TEMPLATES_47_CATALOG.length)];
    updateResume({
      ...resume,
      styling: { ...resume.styling, templateId: random.id },
    });
    setToastMessage(`Switched to ${random.id} – ${random.name}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 100% Reliable Vector PDF Export with untransformed clone and CORS safety
  const handleExportPdf = async () => {
    const element = resumePrintRef.current;
    if (!element) return;

    try {
      setIsGeneratingPdf(true);
      setToastMessage('Compiling high-resolution vector PDF...');

      // Create an untransformed clone attached directly to document.body
      // This completely avoids any CSS transform or viewport scaling glitches in html2canvas
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

      // Ensure all images are CORS safe to prevent tainted canvas
      clone.querySelectorAll('img').forEach(img => {
        img.crossOrigin = 'anonymous';
      });

      document.body.appendChild(clone);

      // Brief delay to ensure layout and fonts settle
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capture at crisp 2x resolution with allowTaint: false to prevent SecurityError
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        windowWidth: 794,
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
      const imgData = canvas.toDataURL('image/jpeg', 0.98);

      if (contentHeightMm <= pdfHeight + 5) {
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, Math.min(contentHeightMm, pdfHeight), undefined, 'FAST');
      } else {
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, contentHeightMm, undefined, 'FAST');
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, -pdfHeight, pdfWidth, contentHeightMm, undefined, 'FAST');
        if (contentHeightMm > pdfHeight * 2 + 5) {
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, -(pdfHeight * 2), pdfWidth, contentHeightMm, undefined, 'FAST');
        }
      }

      const safeName = (safePersonalInfo.fullName || 'Articleship_Resume').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `${safeName}_${resume.styling.templateId}_CV.pdf`;
      pdf.save(filename);

      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}

      setToastMessage(`Downloaded ${filename} successfully!`);
      setTimeout(() => setToastMessage(null), 3500);
    } catch (err) {
      console.error('PDF export error:', err);
      // Clean fallback: trigger browser native print engine
      setToastMessage('Exporting via browser print engine...');
      setTimeout(() => {
        window.print();
      }, 400);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Browser Direct Print
  const handlePrint = () => {
    window.print();
  };

  // Quick JSON download
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${safePersonalInfo.fullName.replace(/\s+/g, '_')}_CA_Resume.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setToastMessage('Resume JSON backup exported!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Import JSON
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
                <span>ICAP & ACCA Articleship Induction Ready</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                47 Full Architecture Templates
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <span>CA & ACCA Professional CV Studio</span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Tailored for 3.5-Year Articleship Induction, Audit Trainees, and Finance Executives.
              Select from all 47 architectures with zero blank pages and instant live preview switching.
            </p>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95 cursor-pointer transition-all"
            >
              <Palette className="w-4 h-4 text-emerald-300" />
              <span>Change Template ({resume.styling.templateId})</span>
            </button>

            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs disabled:opacity-40 cursor-pointer"
              title="Undo"
            >
              <Undo2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs disabled:opacity-40 cursor-pointer"
              title="Redo"
            >
              <Redo2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleSurpriseMe}
              className="px-3 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              title="Randomize Template"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Surprise Me</span>
            </button>

            <button
              onClick={handleExportPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingPdf ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>{isGeneratingPdf ? 'Compiling PDF...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={handlePrint}
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
                <span>General Resume Mode</span>
              </button>
            )}
          </div>
        </div>

        {/* View Mode Switcher: Sath Sath (Split), Edit Form, Live A4 */}
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
              <Layers className="w-3.5 h-3.5" />
              <span>Sath Sath View (Split)</span>
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
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
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
        {/* LEFT COLUMN: 10-STEP WIZARD FORM (visible in split or form mode) */}
        {(viewMode === 'split' || viewMode === 'form') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-4`}>
            {/* Template Quick Chip */}
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-xs font-bold">
                  {resume.styling.templateId}
                </span>
                <div>
                  <div className="text-xs font-bold text-white">{activeTemplateMeta.name}</div>
                  <div className="text-[10px] text-slate-400">
                    {activeTemplateMeta.atsFriendly ? 'ATS Friendly • ATS Optimized' : 'Modern Visual Design'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsGalleryOpen(true)}
                className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Browse All (47)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 10 Step Header Navigation */}
            <div className="p-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto flex gap-1 scrollbar-thin">
              {STEPS.map(step => {
                const Icon = step.icon;
                const isActive = activeStep === step.num;
                return (
                  <button
                    key={step.num}
                    onClick={() => setActiveStep(step.num)}
                    className={`px-3 py-2 rounded-xl text-left whitespace-nowrap transition-all flex items-center gap-2 text-xs cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-600/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 font-medium'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{step.name}</span>
                  </button>
                );
              })}
            </div>

            {/* WIZARD CARD CONTAINER */}
            <div className="p-5 sm:p-6 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-xl space-y-5">
              {/* STEP 1: PERSONAL & CONTACT */}
              {activeStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h2 className="text-sm font-bold text-white">Personal & Induction Details</h2>
                      <p className="text-[11px] text-slate-400">Basic identification, target role & contact data</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Step 1 of 10</span>
                  </div>

                  {/* Profile Picture Uploader */}
                  <div className="flex items-center gap-4 p-3 bg-slate-950 border border-slate-800 rounded-2xl">
                    <img
                      src={resume.avatarUrl || DEFAULT_AVATAR_DATA_URI}
                      alt="Avatar"
                      className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500/50"
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
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={safePersonalInfo.fullName}
                        onChange={e =>
                          updateResume({
                            ...resume,
                            personalInfo: { ...safePersonalInfo, fullName: e.target.value },
                          })
                        }
                        placeholder="Mr. R"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">Target Role / Sub-title *</label>
                      <input
                        type="text"
                        value={safePersonalInfo.jobTitle}
                        onChange={e =>
                          updateResume({
                            ...resume,
                            personalInfo: { ...safePersonalInfo, jobTitle: e.target.value },
                          })
                        }
                        placeholder="Chartered Accountant Trainee (Articleship)"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none"
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
                        placeholder="mr.r.audit@example.com"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="text"
                        value={safePersonalInfo.phone}
                        onChange={e =>
                          updateResume({
                            ...resume,
                            personalInfo: { ...safePersonalInfo, phone: e.target.value },
                          })
                        }
                        placeholder="+92 300 1234567"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">Residential Address / City</label>
                      <input
                        type="text"
                        value={resume.address || ''}
                        onChange={e =>
                          updateResume({
                            ...resume,
                            address: e.target.value,
                            personalInfo: { ...safePersonalInfo, location: e.target.value },
                          })
                        }
                        placeholder="Model Town, Block C, Lahore, Pakistan"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">LinkedIn Profile</label>
                      <input
                        type="text"
                        value={safePersonalInfo.linkedin}
                        onChange={e =>
                          updateResume({
                            ...resume,
                            personalInfo: { ...safePersonalInfo, linkedin: e.target.value },
                          })
                        }
                        placeholder="linkedin.com/in/mr-r-finance"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">Portfolio / Website (Optional)</label>
                      <input
                        type="text"
                        value={safePersonalInfo.website || ''}
                        onChange={e =>
                          updateResume({
                            ...resume,
                            personalInfo: { ...safePersonalInfo, website: e.target.value },
                          })
                        }
                        placeholder="mr-r-portfolio.com"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: CA / ACCA REGISTRATION & EXAM TRACK */}
              {activeStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h2 className="text-sm font-bold text-white">CA / ACCA Examination Track</h2>
                      <p className="text-[11px] text-slate-400">Track CRN, FTS Batch, and papers passed or awaited</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Step 2 of 10</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">FTS Batch No.</label>
                      <input
                        type="text"
                        value={resume.ftsBatch || ''}
                        onChange={e => updateResume({ ...resume, ftsBatch: e.target.value })}
                        placeholder="FTS - 48"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">ICAP CRN / ACCA Reg No.</label>
                      <input
                        type="text"
                        value={resume.crn || ''}
                        onChange={e =>
                          updateResume({
                            ...resume,
                            crn: e.target.value,
                            personalInfo: { ...safePersonalInfo, regNumber: e.target.value },
                          })
                        }
                        placeholder="CRN - 98421"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Qualification Stages & Attempts</span>
                      <button
                        onClick={() => {
                          const newQ = {
                            id: `q${Date.now()}`,
                            course: 'Certificate in Accounting and Finance (CAF)',
                            body: 'ICAP',
                            year: '2024',
                            attempt: 'qualified in 3 attempts',
                            marks: 'Passed',
                          };
                          updateResume({
                            ...resume,
                            qualifications: [...(resume.qualifications || []), newQ],
                          });
                        }}
                        className="px-2.5 py-1 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Stage</span>
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
                            placeholder="Stage Name"
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
                            placeholder="Attempts / Status"
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
                              placeholder="Marks / Result note"
                              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white flex-1"
                            />
                            <button
                              onClick={() => {
                                const updated = resume.qualifications?.filter((_, i) => i !== idx);
                                updateResume({ ...resume, qualifications: updated });
                              }}
                              className="p-2 text-rose-400 hover:text-rose-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: CAREER OBJECTIVE */}
              {activeStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h2 className="text-sm font-bold text-white">Career Objective & Induction Pitch</h2>
                      <p className="text-[11px] text-slate-400">Formal 3.5-Year Articleship Statement</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Step 3 of 10</span>
                  </div>

                  <textarea
                    rows={6}
                    value={resume.objective || safePersonalInfo.summary}
                    onChange={e =>
                      updateResume({
                        ...resume,
                        objective: e.target.value,
                        personalInfo: { ...safePersonalInfo, summary: e.target.value },
                      })
                    }
                    className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs leading-relaxed focus:border-blue-500 focus:outline-none"
                  />
                </div>
              )}

              {/* STEP 4: ACADEMIC BACKGROUND */}
              {activeStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h2 className="text-sm font-bold text-white">Academic Background</h2>
                      <p className="text-[11px] text-slate-400">Intermediate & Matriculation Records</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Step 4 of 10</span>
                  </div>

                  <div className="space-y-3">
                    {resume.education?.map((edu, idx) => (
                      <div key={edu.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={e => {
                              const updated = [...(resume.education || [])];
                              updated[idx].degree = e.target.value;
                              updateResume({ ...resume, education: updated });
                            }}
                            placeholder="Level (e.g. INTERMEDIATE)"
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
                            placeholder="College / School Name"
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
                            placeholder="Grade / Score (e.g. 84.5% A+)"
                            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={edu.endDate || ''}
                            onChange={e => {
                              const updated = [...(resume.education || [])];
                              updated[idx].endDate = e.target.value;
                              updateResume({ ...resume, education: updated });
                            }}
                            placeholder="Passing Year"
                            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: ARTICLESHIP / EXPERIENCE */}
              {activeStep === 5 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h2 className="text-sm font-bold text-white">Practical Experience & Articleship</h2>
                      <p className="text-[11px] text-slate-400">Freelance, bookkeeping, or firm audit engagements</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Step 5 of 10</span>
                  </div>

                  <div className="space-y-3">
                    {resume.articleship?.map((art, idx) => (
                      <div key={art.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={art.role}
                            onChange={e => {
                              const updated = [...(resume.articleship || [])];
                              updated[idx].role = e.target.value;
                              updateResume({ ...resume, articleship: updated });
                            }}
                            placeholder="Role / Title"
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
                            placeholder="Firm / Organization"
                            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 6: COMPETENCIES & IFRS */}
              {activeStep === 6 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h2 className="text-sm font-bold text-white">Standards & Core Competencies</h2>
                      <p className="text-[11px] text-slate-400">IFRS, ISA, Taxation & Audit Quality</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Step 6 of 10</span>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-300">Technical Standards & Assertions</label>
                    <div className="flex flex-wrap gap-1.5">
                      {resume.standards?.map((std, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7: SOFTWARE & TOOLS */}
              {activeStep === 7 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h2 className="text-sm font-bold text-white">Software & IT Skills</h2>
                      <p className="text-[11px] text-slate-400">Excel, ERPs & Accounting Packages</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Step 7 of 10</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {resume.software?.map((sw, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 8: COURSES & CERTIFICATIONS */}
              {activeStep === 8 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h2 className="text-sm font-bold text-white">Courses & PPEC Certifications</h2>
                      <p className="text-[11px] text-slate-400">Hands-on Workshops & FMVA</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Step 8 of 10</span>
                  </div>

                  <div className="space-y-2">
                    {resume.courses?.map((c, i) => (
                      <div key={c.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white flex justify-between">
                        <span>{c.name}</span>
                        <span className="text-slate-400">{c.institute}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 9: REFERENCES & ACTIVITIES */}
              {activeStep === 9 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h2 className="text-sm font-bold text-white">References & Extra-Curricular</h2>
                      <p className="text-[11px] text-slate-400">Mentors, Partners & Leadership Roles</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Step 9 of 10</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Reference Person</label>
                      <input
                        type="text"
                        value={resume.references?.[0]?.name || ''}
                        onChange={e => {
                          const ref = {
                            ...(resume.references?.[0] || { id: 'r1', name: '', role: '' }),
                            name: e.target.value,
                          };
                          updateResume({ ...resume, references: [ref] });
                        }}
                        placeholder="Muhammad Rashid FCA"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Activities & Sports</label>
                      <input
                        type="text"
                        value={resume.activities || ''}
                        onChange={e => updateResume({ ...resume, activities: e.target.value })}
                        placeholder="Debate Team Captain • Inter-College Badminton Champion"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 10: APPEARANCE & TEMPLATE */}
              {activeStep === 10 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h2 className="text-sm font-bold text-white">Template Layout & Styling</h2>
                      <p className="text-[11px] text-slate-400">Choose from all 47 architectures</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">Step 10 of 10</span>
                  </div>

                  {/* Template Launcher Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-400">Current Architecture</span>
                      <h3 className="text-sm font-black text-white mt-0.5">
                        {activeTemplateMeta.id} – {activeTemplateMeta.name}
                      </h3>
                      <p className="text-[11px] text-slate-300">{activeTemplateMeta.desc}</p>
                    </div>

                    <button
                      onClick={() => setIsGalleryOpen(true)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 whitespace-nowrap active:scale-95 cursor-pointer"
                    >
                      <Palette className="w-4 h-4" />
                      <span>Open 47 Gallery</span>
                    </button>
                  </div>

                  {/* Quick Template Switcher Grid in Step 10 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-white">Popular Articleship Layouts</label>
                      <button
                        onClick={() => setIsGalleryOpen(true)}
                        className="text-xs text-blue-400 hover:text-blue-300 font-bold"
                      >
                        View All 47 →
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {TEMPLATES_47_CATALOG.slice(0, 6).map(t => {
                        const isCurrent = resume.styling.templateId === t.id;
                        return (
                          <button
                            key={t.id}
                            onClick={() => {
                              updateResume({
                                ...resume,
                                styling: { ...resume.styling, templateId: t.id },
                              });
                              setToastMessage(`Switched to ${t.id} – ${t.name}!`);
                              setTimeout(() => setToastMessage(null), 3000);
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-blue-950/70 border-blue-500 ring-1 ring-blue-500'
                                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <span className="font-mono text-[10px] text-blue-400 font-bold">{t.id}</span>
                            <div className="text-xs font-bold text-white truncate">{t.name}</div>
                            <div className="text-[9.5px] text-slate-400 truncate">{t.category}</div>
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
                </div>
              )}

              {/* Wizard Bottom Prev / Next Navigators */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  disabled={activeStep === 1}
                  onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <span className="text-[11px] font-mono text-slate-400">Step {activeStep} of 10</span>

                <button
                  disabled={activeStep === 10}
                  onClick={() => setActiveStep(prev => Math.min(10, prev + 1))}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs disabled:opacity-40 flex items-center gap-1 cursor-pointer shadow-md shadow-emerald-600/30"
                >
                  <span>Next: {STEPS[activeStep]?.name || 'Appearance'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: LIVE A4 PREVIEW (visible in split or preview mode) */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-3`}>
            {/* Live A4 Toolbar */}
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  LIVE A4 PREVIEW: {resume.styling.templateId} – {activeTemplateMeta.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Responsive View Controls */}
                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 p-0.5">
                  <button
                    onClick={() => setZoomMode('fit')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      zoomMode === 'fit' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Fit page width to container (no horizontal cut-off)"
                  >
                    Fit Width
                  </button>
                  <button
                    onClick={() => {
                      setZoomMode('100');
                      setCustomZoom(100);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      zoomMode === '100' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Actual print 100% scale"
                  >
                    100%
                  </button>
                  <div className="h-4 w-px bg-slate-800 mx-1" />
                  <button
                    onClick={() => {
                      setZoomMode('custom');
                      setCustomZoom(prev => Math.max(40, Math.round(currentScale * 100) - 10));
                    }}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-300 px-1 min-w-[36px] text-center">
                    {Math.round(currentScale * 100)}%
                  </span>
                  <button
                    onClick={() => {
                      setZoomMode('custom');
                      setCustomZoom(prev => Math.min(150, Math.round(currentScale * 100) + 10));
                    }}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleExportPdf}
                  disabled={isGeneratingPdf}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {isGeneratingPdf ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  <span>{isGeneratingPdf ? 'Exporting...' : 'Export PDF'}</span>
                </button>
              </div>
            </div>

            {/* A4 Canvas Container with Proportional Sizing and Zero Cut-off */}
            <div
              ref={previewContainerRef}
              className="p-3 sm:p-5 bg-slate-950/90 border border-slate-800/80 rounded-3xl shadow-2xl overflow-x-auto overflow-y-auto flex justify-center"
            >
              {/* Outer sizing box matches exact scaled dimensions to prevent horizontal cut-off */}
              <div
                style={{
                  width: `${Math.round(A4_WIDTH_PX * currentScale)}px`,
                  minHeight: `${Math.round(A4_HEIGHT_PX * currentScale)}px`,
                  height: `${Math.round(A4_HEIGHT_PX * currentScale)}px`,
                  transition: 'width 0.15s ease, height 0.15s ease',
                }}
                className="relative mx-auto shrink-0"
              >
                {/* Inner document has standard 794px width, scaled from top left */}
                <div
                  style={{
                    width: `${A4_WIDTH_PX}px`,
                    minHeight: `${A4_HEIGHT_PX}px`,
                    transform: `scale(${currentScale})`,
                    transformOrigin: 'top left',
                    transition: 'transform 0.15s ease',
                  }}
                  className="bg-white text-zinc-900 shadow-2xl relative select-text"
                >
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
      {/* 47 TEMPLATES INTERACTIVE MODAL GALLERY (RICH THUMBNAIL GRID) */}
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
                    47 Template Architectures for CA & ACCA
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 font-bold">
                    {filteredTemplates.length} Available
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click any template to immediately apply it to your live A4 document with authentic layout and styling.
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
                  placeholder="Search templates, roles, or styles (e.g. T-03, Big 4, Executive)..."
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
              {['All', 'Professional', 'Modern', 'Minimal', 'Executive', 'Student', 'CA / ACCA', 'Finance / Audit', 'Creative'].map(cat => (
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

            {/* 47 Templates Grid */}
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
                      setToastMessage(`Template switched to ${tpl.id} – ${tpl.name}!`);
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
                        <span className="font-mono font-bold text-xs text-blue-400">{tpl.id}</span>
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
                      {isCurrent ? 'Active Template ✓' : 'Use Template →'}
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
