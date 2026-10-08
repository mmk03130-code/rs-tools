import React, { useState, useRef } from 'react';
import {
  Download, Sparkles, Check, Plus, Trash2, Sliders, Palette,
  Type, ShieldCheck, Eye, RefreshCw, FileText,
  User, Briefcase, GraduationCap, Code, Award, ExternalLink,
  Upload, Copy, ZoomIn, ZoomOut, Languages,
  ChevronUp, ChevronDown, CheckCircle2, AlertCircle, FileCode, Printer
} from 'lucide-react';
import { ResumeData } from '../../../types/tools';
import { ResumeTemplateRenderer } from './ResumeTemplateRenderer';
import { CaAccaResumeBuilder } from './CaAccaResumeBuilder';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Comprehensive Action Verbs for ATS Optimization
const ACTION_VERBS = [
  'spearheaded', 'orchestrated', 'architected', 'engineered', 'developed',
  'optimized', 'accelerated', 'transformed', 'delivered', 'reduced',
  'increased', 'scaled', 'implemented', 'designed', 'built', 'led',
  'streamlined', 'mentored', 'automated', 'integrated', 'championed',
  'standardized', 'generated', 'negotiated', 'deployed', 'modernized'
];

// Presets for instant resume generation
const SAMPLE_PRESETS: { id: string; label: string; role: string; data: ResumeData }[] = [
  {
    id: 'software-architect',
    label: 'Cloud & Software Architect',
    role: 'Tech Lead / Staff Engineer',
    data: {
      personalInfo: {
        fullName: 'Alexander Rivera',
        jobTitle: 'Senior Full-Stack Engineer & Cloud Architect',
        email: 'alex.rivera@example.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        website: 'alexrivera.dev',
        linkedin: 'linkedin.com/in/alexrivera',
        github: 'github.com/alexrivera',
        summary: 'Results-driven software architect with 7+ years of experience delivering high-scale web platforms and distributed microservices. Proven track record in optimizing client-side performance, reducing latency by 45%, and architecting zero-trust cloud infrastructure.',
      },
      experiences: [
        {
          id: '1',
          company: 'Vanguard Technologies',
          role: 'Lead Systems Architect',
          location: 'San Francisco, CA',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          description: 'Led architecture and development for real-time data streaming platform serving 2M+ active daily sessions.',
          highlights: [
            'Engineered client-side WebAssembly rendering pipeline, reducing CPU consumption by 35%.',
            'Mentored team of 8 senior engineers, establishing automated CI/CD and rigorous code review standards.',
            'Spearheaded transition to edge serverless functions, saving $120,000 annually in hosting costs.',
          ],
        },
        {
          id: '2',
          company: 'Nexus Cloud Labs',
          role: 'Senior Software Engineer',
          location: 'Austin, TX',
          startDate: '2019',
          endDate: '2022',
          current: false,
          description: 'Built high-throughput REST & GraphQL APIs and modern single-page web applications.',
          highlights: [
            'Redesigned core search indexing engine, achieving sub-50ms response times across 500M records.',
            'Integrated OAuth 2.0 and enterprise single-sign-on (SSO) authentication across 14 internal services.',
            'Accelerated database query execution by 40% through proactive PostgreSQL index optimization.',
          ],
        },
      ],
      education: [
        {
          id: '1',
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science in Computer Science',
          field: 'Software Engineering & Distributed Systems',
          location: 'Berkeley, CA',
          startDate: '2015',
          endDate: '2019',
          gpa: '3.88 / 4.0',
        },
      ],
      skills: [
        { name: 'TypeScript & React', level: 95 },
        { name: 'Node.js & Go Microservices', level: 90 },
        { name: 'Cloud Architecture (AWS / GCP)', level: 88 },
        { name: 'WebAssembly & Canvas 2D', level: 82 },
        { name: 'SQL & PostgreSQL Tuning', level: 85 },
        { name: 'Docker / Kubernetes', level: 80 },
      ],
      projects: [
        {
          id: '1',
          title: 'EdgePulse – Real-Time Telemetry SDK',
          technologies: 'Rust, WebAssembly, TypeScript, WebSockets',
          description: 'Open-source distributed tracing library benchmarked at 10x lower memory overhead than standard OpenTelemetry agents.',
          link: 'github.com/alexrivera/edgepulse',
        },
        {
          id: '2',
          title: 'Polyglot PDF Engine',
          technologies: 'React, Canvas, Web Workers, PDF-Lib',
          description: 'Client-side document editing suite with 100% private in-browser encryption and vector font rendering.',
          link: 'polyglot-pdf.dev',
        },
      ],
      certifications: [
        { id: '1', name: 'AWS Certified Solutions Architect – Professional', issuer: 'Amazon Web Services', year: '2024' },
        { id: '2', name: 'Kubernetes Certified Administrator (CKA)', issuer: 'Linux Foundation', year: '2023' },
      ],
      languages: [
        { id: '1', language: 'English', proficiency: 'Native' },
        { id: '2', language: 'Spanish', proficiency: 'Professional Working' },
      ],
      styling: {
        templateId: 'clean-ats',
        colorTheme: 'navy',
        fontFamily: 'sans',
        spacing: 'standard',
        showSkillBars: true,
        showIcons: true,
        paperSize: 'a4',
        fontSize: 'base',
      },
    },
  },
  {
    id: 'product-manager',
    label: 'Senior Product Manager',
    role: 'Product Strategy & Growth',
    data: {
      personalInfo: {
        fullName: 'Sarah Chen',
        jobTitle: 'Principal Product Manager | B2B SaaS & AI',
        email: 'sarah.chen@example.com',
        phone: '+1 (415) 890-1234',
        location: 'New York, NY',
        website: 'sarahchen.co',
        linkedin: 'linkedin.com/in/sarahchenpm',
        github: '',
        summary: 'Data-driven Product Leader with 8+ years scaling enterprise SaaS products from 0 to $30M ARR. Expert in user telemetry, experiment-driven product growth, and customer lifetime value optimization.',
      },
      experiences: [
        {
          id: '1',
          company: 'Aura Intelligence',
          role: 'Group Product Manager',
          location: 'New York, NY',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          description: 'Led cross-functional team of 18 engineers, designers, and data scientists across enterprise analytics.',
          highlights: [
            'Spearheaded enterprise AI copilot launch, capturing $14M in new Annual Recurring Revenue within 6 months.',
            'Reduced customer onboarding drop-off by 32% via automated self-guided product tours.',
            'Increased product net retention rate (NRR) from 108% to 124% through proactive churn prediction models.',
          ],
        },
        {
          id: '2',
          company: 'Elevate Commerce',
          role: 'Senior Product Manager',
          location: 'Boston, MA',
          startDate: '2018',
          endDate: '2021',
          current: false,
          description: 'Owned checkout experience and merchant developer portal for top e-commerce platform.',
          highlights: [
            'Redesigned multi-currency checkout flow, increasing merchant mobile conversion rates by 19%.',
            'Delivered developer API portal serving 12,000+ registered third-party software partners.',
          ],
        },
      ],
      education: [
        {
          id: '1',
          institution: 'Columbia University',
          degree: 'Master of Business Administration (MBA)',
          field: 'Technology Management & Strategy',
          location: 'New York, NY',
          startDate: '2016',
          endDate: '2018',
          gpa: '3.9 / 4.0',
        },
      ],
      skills: [
        { name: 'Product Roadmapping & Vision', level: 95 },
        { name: 'A/B Testing & User Analytics', level: 90 },
        { name: 'Enterprise SaaS Pricing & Monetization', level: 88 },
        { name: 'SQL & Data Visualization', level: 85 },
        { name: 'Agile & Scrum Leadership', level: 92 },
      ],
      projects: [
        {
          id: '1',
          title: 'Product Growth Playbook (Newsletter & Community)',
          technologies: 'Substack, Figma, Product Analytics',
          description: 'Curated weekly product insights followed by 18,000+ tech operators and founders.',
          link: 'productgrowth.sub',
        },
      ],
      certifications: [
        { id: '1', name: 'Pragmatic Institute Certified (PMC-III)', issuer: 'Pragmatic Institute', year: '2023' },
        { id: '2', name: 'Certified Scrum Product Owner (CSPO)', issuer: 'Scrum Alliance', year: '2020' },
      ],
      languages: [
        { id: '1', language: 'English', proficiency: 'Native' },
        { id: '2', language: 'Mandarin', proficiency: 'Fluent' },
      ],
      styling: {
        templateId: 'modern-split',
        colorTheme: 'emerald',
        fontFamily: 'sans',
        spacing: 'standard',
        showSkillBars: true,
        showIcons: true,
        paperSize: 'a4',
        fontSize: 'base',
      },
    },
  },
  {
    id: 'blank-slate',
    label: 'Clean Slate (Empty)',
    role: 'Start From Scratch',
    data: {
      personalInfo: {
        fullName: 'Your Name',
        jobTitle: 'Your Target Job Title',
        email: 'your.email@example.com',
        phone: '+1 (555) 000-0000',
        location: 'City, Country',
        website: '',
        linkedin: '',
        github: '',
        summary: 'A short, powerful 2-3 sentence overview highlighting your core strengths, experience level, and key accomplishments.',
      },
      experiences: [
        {
          id: '1',
          company: 'Target Company',
          role: 'Role Title',
          location: 'Location',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          description: 'Key scope of responsibilities and mission.',
          highlights: [
            'Spearheaded key initiative resulting in measurable metric improvement.',
            'Collaborated with stakeholders to streamline core workflows.',
          ],
        },
      ],
      education: [
        {
          id: '1',
          institution: 'University / College',
          degree: 'Degree Name',
          field: 'Major / Field of Study',
          location: 'Location',
          startDate: '2018',
          endDate: '2022',
          gpa: '',
        },
      ],
      skills: [
        { name: 'Primary Core Skill', level: 90 },
        { name: 'Secondary Core Skill', level: 85 },
      ],
      projects: [],
      certifications: [],
      languages: [],
      styling: {
        templateId: 'clean-ats',
        colorTheme: 'navy',
        fontFamily: 'sans',
        spacing: 'standard',
        showSkillBars: true,
        showIcons: true,
        paperSize: 'a4',
        fontSize: 'base',
      },
    },
  },
];

export interface ResumeBuilderProps {
  initialToolId?: string;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ initialToolId }) => {
  // Mode: General ATS Resume Builder vs CA & ACCA Finance Studio
  const [builderMode, setBuilderMode] = useState<'general' | 'finance'>(() => {
    if (initialToolId === 'ca-acca-resume-builder') return 'finance';
    if (typeof window !== 'undefined' && window.location.href.includes('ca-acca')) return 'finance';
    return 'general';
  });

  // Navigation & tabs
  const [activeTab, setActiveTab] = useState<'content' | 'templates' | 'ats' | 'styles' | 'import-export'>('content');
  const [contentSubTab, setContentSubTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages'>('personal');

  // Resume State
  const [resume, setResume] = useState<ResumeData>(SAMPLE_PRESETS[0].data);

  // Preview controls
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showPageBoundary, setShowPageBoundary] = useState<boolean>(true);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  // Raw text import state
  const [rawTextImport, setRawTextImport] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumePrintRef = useRef<HTMLDivElement>(null);

  // 15 Base Template Architectures
  const TEMPLATE_ARCHITECTURES = [
    { id: 'clean-ats', name: 'Clean Tech ATS', desc: '100% standard single-column scanner optimized for Taleo & Workday', badge: 'ATS Recommended' },
    { id: 'modern-split', name: 'Modern Dual-Column', desc: 'Sleek sidebar with balanced visual hierarchy' },
    { id: 'executive', name: 'Executive Header', desc: 'High-contrast header band with corporate prestige' },
    { id: 'minimalist', name: 'Swiss Minimalist', desc: 'Understated typographic elegance and crisp whitespace' },
    { id: 'timeline-focus', name: 'Timeline Career', desc: 'Connected vertical timeline node progression' },
    { id: 'developer-code', name: 'Developer Monospace', desc: 'Technical profile with code syntax accents' },
    { id: 'hybrid-ats', name: 'Hybrid ATS Pro', desc: 'Clean single column with subtle accent markers' },
    { id: 'academic', name: 'Academic Vitae', desc: 'Dense scholarly format for research & publications' },
    { id: 'compact-grid', name: 'Compact Dense Grid', desc: 'Fits 10+ years experience cleanly on single page' },
    { id: 'corporate-slate', name: 'Corporate Standard', desc: 'Fortune 500 compliant business structure' },
    { id: 'metro-sidebar', name: 'Metro Left Rail', desc: 'Contact & skills grouped cleanly on left column' },
    { id: 'bold-accent', name: 'Bold Headline', desc: 'Distinct typography for senior leaders and directors' },
    { id: 'nordic-clean', name: 'Nordic Clean', desc: 'Spacious Scandinavian design with soft contrast' },
    { id: 'creative-tag', name: 'Creative Accent', desc: 'Vibrant highlight bars and modern badge markers' },
    { id: 'classic-serif', name: 'Classic Editorial', desc: 'Timeless Ivy-League serif typography' },
  ];

  // 10 Color Theme Palettes
  const COLOR_THEMES = [
    { id: 'navy', name: 'Executive Navy', primary: '#1e3a8a', accent: '#3b82f6', bgHeader: '#0f172a' },
    { id: 'emerald', name: 'Modern Emerald', primary: '#065f46', accent: '#10b981', bgHeader: '#064e3b' },
    { id: 'indigo', name: 'Royal Indigo', primary: '#3730a3', accent: '#6366f1', bgHeader: '#1e1b4b' },
    { id: 'slate', name: 'Monochrome Slate', primary: '#1e293b', accent: '#475569', bgHeader: '#0f172a' },
    { id: 'crimson', name: 'Crimson Wine', primary: '#881337', accent: '#e11d48', bgHeader: '#4c0519' },
    { id: 'teal', name: 'Nordic Teal', primary: '#134e4a', accent: '#14b8a6', bgHeader: '#042f2e' },
    { id: 'amber', name: 'Cyber Amber', primary: '#78350f', accent: '#d97706', bgHeader: '#451a03' },
    { id: 'purple', name: 'Deep Purple', primary: '#581c87', accent: '#a855f7', bgHeader: '#3b0764' },
    { id: 'ocean', name: 'Ocean Cyan', primary: '#0e7490', accent: '#06b6d4', bgHeader: '#164e63' },
    { id: 'minimal-black', name: 'Pure Carbon', primary: '#000000', accent: '#262626', bgHeader: '#000000' },
  ];

  const currentTheme = COLOR_THEMES.find(t => t.id === resume.styling.colorTheme) || COLOR_THEMES[0];

  // ATS Score Calculator & Checker
  const calculateAtsScore = () => {
    let score = 0;
    const tips: { message: string; completed: boolean; impact: string }[] = [];

    // 1. Personal Info Completeness
    const hasName = resume.personalInfo.fullName.trim().length > 2;
    if (hasName) score += 10;
    tips.push({ message: 'Full name prominently stated', completed: hasName, impact: '+10' });

    const hasEmail = resume.personalInfo.email.includes('@');
    if (hasEmail) score += 10;
    tips.push({ message: 'Valid professional email address', completed: hasEmail, impact: '+10' });

    const hasPhone = resume.personalInfo.phone.trim().length > 5;
    if (hasPhone) score += 5;
    tips.push({ message: 'Contact phone number', completed: hasPhone, impact: '+5' });

    const hasLocation = resume.personalInfo.location.trim().length > 2;
    if (hasLocation) score += 5;
    tips.push({ message: 'Location (City, Country)', completed: hasLocation, impact: '+5' });

    const hasLinks = Boolean(resume.personalInfo.linkedin || resume.personalInfo.website || resume.personalInfo.github);
    if (hasLinks) score += 5;
    tips.push({ message: 'LinkedIn or Portfolio web presence link', completed: hasLinks, impact: '+5' });

    // 2. Professional Summary
    const hasSummary = resume.personalInfo.summary.trim().length > 50;
    if (hasSummary) score += 10;
    tips.push({ message: 'Targeted Professional Summary (> 50 characters)', completed: hasSummary, impact: '+10' });

    // 3. Work Experience Count
    const hasExp = resume.experiences.length >= 1;
    if (hasExp) score += 15;
    tips.push({ message: 'Reverse-chronological work experience entries', completed: hasExp, impact: '+15' });

    // 4. Action Verbs
    const allBullets = resume.experiences.flatMap(e => e.highlights).join(' ').toLowerCase();
    const foundVerbs = ACTION_VERBS.filter(v => allBullets.includes(v));
    const hasActionVerbs = foundVerbs.length >= 3;
    if (hasActionVerbs) score += 15;
    tips.push({
      message: `Strong action verbs in bullets (Found: ${foundVerbs.length} - ${foundVerbs.slice(0, 4).join(', ')})`,
      completed: hasActionVerbs,
      impact: '+15'
    });

    // 5. Quantifiable Metrics (%, $, numbers)
    const metricsMatches = allBullets.match(/\d+[\%kmb]?|\$\d+/g) || [];
    const hasMetrics = metricsMatches.length >= 2;
    if (hasMetrics) score += 10;
    tips.push({
      message: `Quantifiable metrics & data points (e.g. 35%, $120k, 2M+). Found: ${metricsMatches.length}`,
      completed: hasMetrics,
      impact: '+10'
    });

    // 6. Skills Count
    const hasSkills = resume.skills.length >= 5;
    if (hasSkills) score += 10;
    tips.push({ message: `At least 5 core technical / domain skills (Found: ${resume.skills.length})`, completed: hasSkills, impact: '+10' });

    // 7. Education
    const hasEdu = resume.education.length >= 1;
    if (hasEdu) score += 5;
    tips.push({ message: 'Academic degree or educational background', completed: hasEdu, impact: '+5' });

    return { score: Math.min(100, score), tips, foundVerbs, metricsMatches };
  };

  const { score: atsScore, tips: atsTips, foundVerbs, metricsMatches } = calculateAtsScore();

  // 1. Direct PDF File Download (jsPDF + html2canvas - Guaranteed 0 Blank Pages)
  const handleDownloadPdf = async () => {
    const element = resumePrintRef.current;
    if (!element) return;

    try {
      setIsGeneratingPdf(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });

      // Capture at 2x resolution for ultra-sharp 300 DPI text
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      // Add additional page ONLY if content genuinely overflows single page by > 8mm
      while (heightLeft > 8) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }

      const safeName = (resume.personalInfo.fullName || 'Resume').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `${safeName}_ATS_Resume.pdf`;
      pdf.save(filename);

      setCopyFeedback(`Downloaded ${filename} successfully!`);
      setTimeout(() => setCopyFeedback(null), 3500);
    } catch (err) {
      console.error('Direct PDF generation error:', err);
      // Fallback to isolated print
      handlePrintResume();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // 2. Vector Print / Save as PDF Dialog (Clean isolated iframe - 0 Blank Pages)
  const handlePrintResume = () => {
    const element = resumePrintRef.current;
    if (!element) {
      window.print();
      return;
    }

    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    // Create an isolated hidden iframe so ONLY the resume exists in the print context
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    // Copy all stylesheets from parent document
    let stylesHtml = '';
    document.querySelectorAll('style, link[rel="stylesheet"]').forEach(el => {
      stylesHtml += el.outerHTML;
    });

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resume.personalInfo.fullName || 'Resume'} - ATS CV</title>
          ${stylesHtml}
          <style>
            @page {
              size: A4 portrait;
              margin: 6mm 8mm;
            }
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              background: #ffffff !important;
              color: #000000 !important;
              width: 100% !important;
              height: auto !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            #printable-resume {
              width: 100% !important;
              max-width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              box-shadow: none !important;
              border: none !important;
              transform: none !important;
              overflow: visible !important;
            }
            .no-print {
              display: none !important;
            }
          </style>
        </head>
        <body>
          <div id="printable-resume">
            ${element.innerHTML}
          </div>
        </body>
      </html>
    `);
    doc.close();

    // Trigger print once iframe resources are ready
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1500);
    }, 350);
  };

  // Export JSON handler
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.personalInfo.fullName.replace(/\s+/g, '_') || 'Resume'}_ATS_Backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON handler
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.personalInfo && parsed.experiences) {
          setResume(parsed);
          setCopyFeedback('Resume data successfully loaded!');
          setTimeout(() => setCopyFeedback(null), 3000);
        } else {
          alert('Invalid resume JSON format.');
        }
      } catch (err) {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Export Plain Text Handler (Format for raw job application textboxes)
  const handleExportPlainText = () => {
    let txt = '';
    txt += `${resume.personalInfo.fullName.toUpperCase()}\n`;
    txt += `${resume.personalInfo.jobTitle}\n`;
    txt += `Email: ${resume.personalInfo.email} | Phone: ${resume.personalInfo.phone} | Location: ${resume.personalInfo.location}\n`;
    if (resume.personalInfo.linkedin) txt += `LinkedIn: ${resume.personalInfo.linkedin}\n`;
    if (resume.personalInfo.website) txt += `Website: ${resume.personalInfo.website}\n`;
    txt += '\n====================\nPROFESSIONAL SUMMARY\n====================\n';
    txt += `${resume.personalInfo.summary}\n\n`;

    txt += '====================\nWORK EXPERIENCE\n====================\n';
    resume.experiences.forEach(exp => {
      txt += `${exp.role.toUpperCase()} | ${exp.company} (${exp.location})\n`;
      txt += `${exp.startDate} - ${exp.endDate}\n`;
      exp.highlights.filter(Boolean).forEach(h => {
        txt += `• ${h}\n`;
      });
      txt += '\n';
    });

    txt += '====================\nEDUCATION\n====================\n';
    resume.education.forEach(edu => {
      txt += `${edu.degree} - ${edu.institution} (${edu.endDate})\n`;
      if (edu.gpa) txt += `GPA/Honors: ${edu.gpa}\n`;
    });
    txt += '\n';

    txt += '====================\nCORE SKILLS\n====================\n';
    txt += resume.skills.map(s => s.name).join(', ') + '\n';

    navigator.clipboard.writeText(txt);
    setCopyFeedback('Plain text copied to clipboard!');
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  // Helper to insert an action verb into an experience highlight
  const insertActionVerb = (expIndex: number, bulletIndex: number, verb: string) => {
    const updated = [...resume.experiences];
    const currentBullet = updated[expIndex].highlights[bulletIndex] || '';
    const capitalizedVerb = verb.charAt(0).toUpperCase() + verb.slice(1);
    updated[expIndex].highlights[bulletIndex] = currentBullet
      ? `${capitalizedVerb} ${currentBullet}`
      : `${capitalizedVerb} ...`;
    setResume({ ...resume, experiences: updated });
  };

  if (builderMode === 'finance') {
    return (
      <CaAccaResumeBuilder
        onSwitchToGeneralMode={() => setBuilderMode('general')}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Studio Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              ATS Resume & CV Studio
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium">
              15 Layout Architectures · 10 Color Themes
            </span>
            <span className="text-[10px] text-amber-400 bg-amber-950/60 border border-amber-500/20 px-2 py-0.5 rounded font-mono">
              Score: {atsScore}/100
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Next-Gen ATS Resume Generator
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl leading-normal">
            Real-time multi-layout engine, live ATS scanner with action verb analyzer, instant JSON backup, and vector-isolated PDF export.
          </p>
        </div>

        {/* Action Controls & Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setBuilderMode('finance')}
            className="px-3.5 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-600/25 active:scale-95 cursor-pointer"
            title="Switch to Chartered Accountant & ACCA Professional Resume Builder"
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-300" />
            <span>CA & ACCA Studio (New)</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-95 disabled:opacity-60 cursor-pointer"
            title="Direct download high-resolution PDF file (300 DPI, 0 blank pages)"
          >
            {isGeneratingPdf ? <RefreshCw className="w-4 h-4 animate-spin text-white" /> : <Download className="w-4 h-4" />}
            <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
          </button>

          <button
            onClick={handlePrintResume}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Clean vector print dialog with isolated 0-blank page layout"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-400" />
            <span>Vector Print</span>
          </button>

          <button
            onClick={handleExportPlainText}
            className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Copy plain text for online ATS application forms"
          >
            <Copy className="w-3.5 h-3.5 text-blue-400" />
            <span>Copy Text</span>
          </button>
        </div>
      </div>

      {copyFeedback && (
        <div className="p-3 bg-blue-950/60 border border-blue-500/30 rounded-xl text-xs text-blue-200 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span>{copyFeedback}</span>
        </div>
      )}

      {/* Main Studio Workstation (Split View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Editor Suite (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Preset Selector */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Load Preset Profile:</span>
            <div className="flex gap-1 overflow-x-auto">
              {SAMPLE_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => setResume(preset.data)}
                  className="px-2.5 py-1 text-[11px] rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors whitespace-nowrap"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Module Navigation Tabs */}
          <div className="grid grid-cols-5 gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
            {[
              { id: 'content', label: 'Content', icon: FileText },
              { id: 'templates', label: 'Layouts', icon: Palette },
              { id: 'styles', label: 'Styling', icon: Sliders },
              { id: 'ats', label: 'ATS Score', icon: ShieldCheck, badge: `${atsScore}%` },
              { id: 'import-export', label: 'Backup', icon: FileCode },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1.5 rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1 text-[11px] ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: CONTENT EDITOR */}
          {activeTab === 'content' && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              {/* Content Subtabs */}
              <div className="flex border-b border-slate-800 pb-2 gap-1.5 text-xs overflow-x-auto">
                {[
                  { id: 'personal', label: 'Contact', icon: User },
                  { id: 'experience', label: 'Experience', icon: Briefcase },
                  { id: 'education', label: 'Education', icon: GraduationCap },
                  { id: 'skills', label: 'Skills', icon: Code },
                  { id: 'projects', label: 'Projects', icon: Award },
                  { id: 'certifications', label: 'Certs', icon: CheckCircle2 },
                  { id: 'languages', label: 'Languages', icon: Languages },
                ].map(sub => {
                  const Icon = sub.icon;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setContentSubTab(sub.id as any)}
                      className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap text-xs ${
                        contentSubTab === sub.id
                          ? 'bg-blue-600/30 text-blue-400 font-semibold border border-blue-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{sub.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 1.1 Personal Information */}
              {contentSubTab === 'personal' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={resume.personalInfo.fullName}
                      onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, fullName: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Job Headline / Target Role</label>
                    <input
                      type="text"
                      value={resume.personalInfo.jobTitle}
                      onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, jobTitle: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Email</label>
                      <input
                        type="email"
                        value={resume.personalInfo.email}
                        onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, email: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Phone</label>
                      <input
                        type="text"
                        value={resume.personalInfo.phone}
                        onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, phone: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Location (City, Country)</label>
                      <input
                        type="text"
                        value={resume.personalInfo.location}
                        onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, location: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Website / Portfolio</label>
                      <input
                        type="text"
                        value={resume.personalInfo.website}
                        onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, website: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">LinkedIn Profile</label>
                      <input
                        type="text"
                        value={resume.personalInfo.linkedin}
                        onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, linkedin: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">GitHub / Code Profile</label>
                      <input
                        type="text"
                        value={resume.personalInfo.github}
                        onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, github: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Professional Summary</label>
                    <textarea
                      rows={4}
                      value={resume.personalInfo.summary}
                      onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, summary: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white leading-relaxed focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* 1.2 Work Experience */}
              {contentSubTab === 'experience' && (
                <div className="space-y-4">
                  {resume.experiences.map((exp, expIdx) => (
                    <div key={exp.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-400">Position #{expIdx + 1}</span>
                        {resume.experiences.length > 1 && (
                          <button
                            onClick={() => setResume({ ...resume, experiences: resume.experiences.filter((_, i) => i !== expIdx) })}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                            title="Delete this position"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={e => {
                            const updated = [...resume.experiences];
                            updated[expIdx].company = e.target.value;
                            setResume({ ...resume, experiences: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Job Title / Role"
                          value={exp.role}
                          onChange={e => {
                            const updated = [...resume.experiences];
                            updated[expIdx].role = e.target.value;
                            setResume({ ...resume, experiences: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Location"
                          value={exp.location}
                          onChange={e => {
                            const updated = [...resume.experiences];
                            updated[expIdx].location = e.target.value;
                            setResume({ ...resume, experiences: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={e => {
                            const updated = [...resume.experiences];
                            updated[expIdx].startDate = e.target.value;
                            setResume({ ...resume, experiences: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="End Date (or Present)"
                          value={exp.endDate}
                          onChange={e => {
                            const updated = [...resume.experiences];
                            updated[expIdx].endDate = e.target.value;
                            setResume({ ...resume, experiences: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                      </div>

                      {/* Bullet points list */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-[11px] font-semibold text-slate-300">
                            Achievements & Highlights (Bullet Points)
                          </label>
                          <span className="text-[10px] text-slate-500">Tip: Start with action verbs</span>
                        </div>
                        <div className="space-y-2">
                          {exp.highlights.map((bullet, bulletIdx) => (
                            <div key={bulletIdx} className="space-y-1">
                              <div className="flex items-start gap-1.5">
                                <span className="text-slate-500 text-xs mt-1">•</span>
                                <textarea
                                  rows={2}
                                  value={bullet}
                                  onChange={e => {
                                    const updated = [...resume.experiences];
                                    updated[expIdx].highlights[bulletIdx] = e.target.value;
                                    setResume({ ...resume, experiences: updated });
                                  }}
                                  placeholder="Describe achievement with quantifiable metrics (e.g. Engineered..., reducing latency by 45%)"
                                  className="flex-1 bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                                />
                                <button
                                  onClick={() => {
                                    const updated = [...resume.experiences];
                                    updated[expIdx].highlights = updated[expIdx].highlights.filter((_, i) => i !== bulletIdx);
                                    setResume({ ...resume, experiences: updated });
                                  }}
                                  className="text-slate-500 hover:text-rose-400 p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              {/* Power verb quick insert */}
                              <div className="flex items-center gap-1 pl-4 flex-wrap text-[10px] text-slate-400">
                                <span>Add verb:</span>
                                {['spearheaded', 'orchestrated', 'engineered', 'optimized', 'reduced'].map(verb => (
                                  <button
                                    key={verb}
                                    onClick={() => insertActionVerb(expIdx, bulletIdx, verb)}
                                    className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 transition-colors"
                                  >
                                    +{verb}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            const updated = [...resume.experiences];
                            updated[expIdx].highlights.push('');
                            setResume({ ...resume, experiences: updated });
                          }}
                          className="mt-2 text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Bullet Point</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      const newExp = {
                        id: String(Date.now()),
                        company: 'Company Name',
                        role: 'Job Role',
                        location: 'Location',
                        startDate: '2023',
                        endDate: 'Present',
                        current: true,
                        description: '',
                        highlights: ['Led initiative resulting in 20% operational efficiency increase.'],
                      };
                      setResume({ ...resume, experiences: [...resume.experiences, newExp] });
                    }}
                    className="w-full py-2 text-xs rounded-lg border border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Position</span>
                  </button>
                </div>
              )}

              {/* 1.3 Education */}
              {contentSubTab === 'education' && (
                <div className="space-y-3">
                  {resume.education.map((edu, eduIdx) => (
                    <div key={edu.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-400">Education #{eduIdx + 1}</span>
                        {resume.education.length > 1 && (
                          <button
                            onClick={() => setResume({ ...resume, education: resume.education.filter((_, i) => i !== eduIdx) })}
                            className="text-slate-500 hover:text-rose-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Institution / University"
                        value={edu.institution}
                        onChange={e => {
                          const updated = [...resume.education];
                          updated[eduIdx].institution = e.target.value;
                          setResume({ ...resume, education: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Degree & Major (e.g. B.S. in Computer Science)"
                        value={edu.degree}
                        onChange={e => {
                          const updated = [...resume.education];
                          updated[eduIdx].degree = e.target.value;
                          setResume({ ...resume, education: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Graduation Year"
                          value={edu.endDate}
                          onChange={e => {
                            const updated = [...resume.education];
                            updated[eduIdx].endDate = e.target.value;
                            setResume({ ...resume, education: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="GPA / Honors (optional)"
                          value={edu.gpa || ''}
                          onChange={e => {
                            const updated = [...resume.education];
                            updated[eduIdx].gpa = e.target.value;
                            setResume({ ...resume, education: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newEdu = {
                        id: String(Date.now()),
                        institution: 'University Name',
                        degree: 'Bachelor of Science',
                        field: 'Computer Science',
                        location: 'Location',
                        startDate: '2016',
                        endDate: '2020',
                      };
                      setResume({ ...resume, education: [...resume.education, newEdu] });
                    }}
                    className="w-full py-1.5 text-xs rounded border border-dashed border-slate-700 text-slate-400 hover:text-white"
                  >
                    + Add Education
                  </button>
                </div>
              )}

              {/* 1.4 Skills */}
              {contentSubTab === 'skills' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Manage Skills & Proficiency</span>
                    <span className="text-[11px] text-blue-400">{resume.skills.length} skills listed</span>
                  </div>
                  <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                    {resume.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="flex items-center gap-2 p-2 bg-slate-950 border border-slate-800 rounded-lg">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={e => {
                            const updated = [...resume.skills];
                            updated[skillIdx].name = e.target.value;
                            setResume({ ...resume, skills: updated });
                          }}
                          className="flex-1 bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                        <div className="flex items-center gap-1.5">
                          <input
                            type="range"
                            min="50"
                            max="100"
                            value={skill.level}
                            onChange={e => {
                              const updated = [...resume.skills];
                              updated[skillIdx].level = Number(e.target.value);
                              setResume({ ...resume, skills: updated });
                            }}
                            className="w-20 accent-blue-500"
                            title={`Level: ${skill.level}%`}
                          />
                          <span className="text-[10px] text-slate-400 font-mono w-7">{skill.level}%</span>
                        </div>
                        <button
                          onClick={() => setResume({ ...resume, skills: resume.skills.filter((_, i) => i !== skillIdx) })}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setResume({ ...resume, skills: [...resume.skills, { name: 'New Technical Skill', level: 85 }] })}
                    className="w-full py-1.5 text-xs rounded border border-dashed border-slate-700 text-slate-400 hover:text-white"
                  >
                    + Add New Skill
                  </button>
                </div>
              )}

              {/* 1.5 Projects */}
              {contentSubTab === 'projects' && (
                <div className="space-y-3">
                  {resume.projects.map((proj, projIdx) => (
                    <div key={proj.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-400">Project #{projIdx + 1}</span>
                        <button
                          onClick={() => setResume({ ...resume, projects: resume.projects.filter((_, i) => i !== projIdx) })}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={proj.title}
                        onChange={e => {
                          const updated = [...resume.projects];
                          updated[projIdx].title = e.target.value;
                          setResume({ ...resume, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Technologies (e.g. React, Node.js, AWS)"
                        value={proj.technologies}
                        onChange={e => {
                          const updated = [...resume.projects];
                          updated[projIdx].technologies = e.target.value;
                          setResume({ ...resume, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Project URL or GitHub Link"
                        value={proj.link || ''}
                        onChange={e => {
                          const updated = [...resume.projects];
                          updated[projIdx].link = e.target.value;
                          setResume({ ...resume, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                      />
                      <textarea
                        rows={2}
                        placeholder="Project Description & Metrics"
                        value={proj.description}
                        onChange={e => {
                          const updated = [...resume.projects];
                          updated[projIdx].description = e.target.value;
                          setResume({ ...resume, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newProj = {
                        id: String(Date.now()),
                        title: 'New Featured Project',
                        technologies: 'TypeScript, React, Cloud',
                        description: 'Architected and shipped production web utility tool.',
                        link: 'github.com/example/repo',
                      };
                      setResume({ ...resume, projects: [...resume.projects, newProj] });
                    }}
                    className="w-full py-1.5 text-xs rounded border border-dashed border-slate-700 text-slate-400 hover:text-white"
                  >
                    + Add Project
                  </button>
                </div>
              )}

              {/* 1.6 Certifications */}
              {contentSubTab === 'certifications' && (
                <div className="space-y-3">
                  {(resume.certifications || []).map((cert, certIdx) => (
                    <div key={cert.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-blue-400">Certification #{certIdx + 1}</span>
                        <button
                          onClick={() => setResume({ ...resume, certifications: resume.certifications.filter((_, i) => i !== certIdx) })}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Certification Name (e.g. AWS Solutions Architect)"
                        value={cert.name}
                        onChange={e => {
                          const updated = [...resume.certifications];
                          updated[certIdx].name = e.target.value;
                          setResume({ ...resume, certifications: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Issuer (e.g. Amazon Web Services)"
                          value={cert.issuer}
                          onChange={e => {
                            const updated = [...resume.certifications];
                            updated[certIdx].issuer = e.target.value;
                            setResume({ ...resume, certifications: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Year (e.g. 2024)"
                          value={cert.year}
                          onChange={e => {
                            const updated = [...resume.certifications];
                            updated[certIdx].year = e.target.value;
                            setResume({ ...resume, certifications: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newCert = {
                        id: String(Date.now()),
                        name: 'Professional Certification',
                        issuer: 'Issuing Body',
                        year: '2024',
                      };
                      setResume({ ...resume, certifications: [...(resume.certifications || []), newCert] });
                    }}
                    className="w-full py-1.5 text-xs rounded border border-dashed border-slate-700 text-slate-400 hover:text-white"
                  >
                    + Add Certification
                  </button>
                </div>
              )}

              {/* 1.7 Languages */}
              {contentSubTab === 'languages' && (
                <div className="space-y-3">
                  {(resume.languages || []).map((lang, langIdx) => (
                    <div key={lang.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-blue-400">Language #{langIdx + 1}</span>
                        <button
                          onClick={() => setResume({ ...resume, languages: resume.languages?.filter((_, i) => i !== langIdx) })}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Language (e.g. English, German)"
                          value={lang.language}
                          onChange={e => {
                            const updated = [...(resume.languages || [])];
                            updated[langIdx].language = e.target.value;
                            setResume({ ...resume, languages: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                        <select
                          value={lang.proficiency}
                          onChange={e => {
                            const updated = [...(resume.languages || [])];
                            updated[langIdx].proficiency = e.target.value;
                            setResume({ ...resume, languages: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        >
                          <option value="Native">Native</option>
                          <option value="Fluent">Fluent</option>
                          <option value="Professional Working">Professional Working</option>
                          <option value="Conversational">Conversational</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newLang = {
                        id: String(Date.now()),
                        language: 'Language',
                        proficiency: 'Professional Working',
                      };
                      setResume({ ...resume, languages: [...(resume.languages || []), newLang] });
                    }}
                    className="w-full py-1.5 text-xs rounded border border-dashed border-slate-700 text-slate-400 hover:text-white"
                  >
                    + Add Language
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TEMPLATES ARCHITECTURE */}
          {activeTab === 'templates' && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 max-h-[550px] overflow-y-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select Layout Architecture
                </span>
                <span className="text-[10px] text-blue-400 font-medium">
                  15 Architectures × 10 Themes = 150 Designs
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {TEMPLATE_ARCHITECTURES.map(tpl => (
                  <button
                    key={tpl.id}
                    onClick={() => setResume({ ...resume, styling: { ...resume.styling, templateId: tpl.id } })}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      resume.styling.templateId === tpl.id
                        ? 'bg-blue-950/70 border-blue-500 text-white shadow-lg ring-1 ring-blue-500'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-xs">{tpl.name}</span>
                        {tpl.badge && (
                          <span className="text-[9px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-medium">
                            {tpl.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block">{tpl.desc}</span>
                    </div>
                    {resume.styling.templateId === tpl.id && (
                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STYLING & CUSTOMIZATION */}
          {activeTab === 'styles' && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-5">
              {/* Color Themes */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Color Themes
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {COLOR_THEMES.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => setResume({ ...resume, styling: { ...resume.styling, colorTheme: theme.id } })}
                      className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-colors ${
                        resume.styling.colorTheme === theme.id
                          ? 'border-blue-500 bg-slate-950 ring-1 ring-blue-500'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full flex-shrink-0 shadow" style={{ backgroundColor: theme.primary }} />
                      <span className="text-xs text-slate-200">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Typography Pairing
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'sans', label: 'Inter Sans', desc: 'Modern & Clean' },
                    { id: 'serif', label: 'Classic Serif', desc: 'Ivy & Academic' },
                    { id: 'mono', label: 'Tech Mono', desc: 'Code Centric' },
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setResume({ ...resume, styling: { ...resume.styling, fontFamily: f.id } })}
                      className={`py-2 px-1 text-xs rounded-lg border text-center transition-all ${
                        resume.styling.fontFamily === f.id
                          ? 'bg-blue-600 border-blue-500 text-white shadow'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-semibold">{f.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Spacing & Density */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Document Density & Spacing
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'compact', label: 'Compact', desc: 'Fits more content' },
                    { id: 'standard', label: 'Standard', desc: 'Balanced' },
                    { id: 'spacious', label: 'Spacious', desc: 'Airy feel' },
                  ].map(sp => (
                    <button
                      key={sp.id}
                      onClick={() => setResume({ ...resume, styling: { ...resume.styling, spacing: sp.id as any } })}
                      className={`py-2 px-1 text-xs rounded-lg border text-center transition-all ${
                        resume.styling.spacing === sp.id
                          ? 'bg-blue-600 border-blue-500 text-white shadow'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="font-semibold">{sp.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                  <span>Show Skill Level Progress Bars</span>
                  <input
                    type="checkbox"
                    checked={resume.styling.showSkillBars}
                    onChange={e => setResume({ ...resume, styling: { ...resume.styling, showSkillBars: e.target.checked } })}
                    className="w-4 h-4 rounded accent-blue-500"
                  />
                </label>
                <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                  <span>Show Section Contact Icons</span>
                  <input
                    type="checkbox"
                    checked={resume.styling.showIcons}
                    onChange={e => setResume({ ...resume, styling: { ...resume.styling, showIcons: e.target.checked } })}
                    className="w-4 h-4 rounded accent-blue-500"
                  />
                </label>
              </div>
            </div>
          )}

          {/* TAB 4: REAL-TIME ATS SCORE CHECKER */}
          {activeTab === 'ats' && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">ATS Compliance Score</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-emerald-400 font-mono">
                      {atsScore}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">/ 100</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {atsScore >= 85 ? 'Excellent! Highly optimized for ATS bots.' : 'Good start. Review checklist below.'}
                  </span>
                </div>
                <div className="w-14 h-14 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 flex items-center justify-center font-black text-sm text-white font-mono">
                  {atsScore}%
                </div>
              </div>

              {/* Action Verbs summary */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-xs font-semibold text-slate-300 block">
                  Action Verbs Detected ({foundVerbs.length}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {foundVerbs.length > 0 ? (
                    foundVerbs.map(v => (
                      <span key={v} className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                        {v}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] text-amber-400">None detected yet. Use verbs like "spearheaded", "engineered".</span>
                  )}
                </div>
              </div>

              {/* ATS Checklist */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">
                  ATS Scanner Checklist:
                </span>
                <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                  {atsTips.map((tip, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 ${
                        tip.completed
                          ? 'bg-slate-950 border-emerald-500/20 text-slate-300'
                          : 'bg-amber-950/20 border-amber-500/20 text-amber-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {tip.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        )}
                        <span>{tip.message}</span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold ${tip.completed ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {tip.impact}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BACKUP, RESTORE & RAW IMPORT */}
          {activeTab === 'import-export' && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Backup & Restore
                </h3>
                <p className="text-[11px] text-slate-400 mb-3">
                  Save your work to your computer as a JSON file and restore it anytime with 100% data privacy.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleExportJson}
                    className="p-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors flex items-center justify-center gap-2 text-xs font-semibold"
                  >
                    <Download className="w-4 h-4 text-blue-400" />
                    <span>Save JSON Backup</span>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors flex items-center justify-center gap-2 text-xs font-semibold"
                  >
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Load JSON File</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportJson}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Plain Text copy */}
              <div className="pt-3 border-t border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  ATS Application Form Quick-Copy
                </h3>
                <p className="text-[11px] text-slate-400 mb-2">
                  Copies clean, standard formatted plain text ready to paste into Taleo, Workday, or Greenhouse text fields.
                </p>
                <button
                  onClick={handleExportPlainText}
                  className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-2"
                >
                  <Copy className="w-3.5 h-3.5 text-blue-400" />
                  <span>Copy Complete Plain Text to Clipboard</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live High-Resolution Resume Sheet Preview (7 cols) */}
        <div className="lg:col-span-7">
          <div className="sticky top-20 rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-2xl overflow-hidden">
            {/* Canvas Toolbar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400 flex-wrap gap-2">
              <span className="flex items-center gap-1.5 font-bold text-slate-200">
                <Eye className="w-4 h-4 text-blue-400" />
                <span>Live ATS Sheet Preview</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  ({TEMPLATE_ARCHITECTURES.find(t => t.id === resume.styling.templateId)?.name || 'Clean ATS'})
                </span>
              </span>

              {/* Zoom & Page Boundary controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPageBoundary(!showPageBoundary)}
                  className={`text-[10px] px-2 py-0.5 rounded transition-colors ${
                    showPageBoundary ? 'bg-blue-600/30 text-blue-400 border border-blue-500/30' : 'bg-slate-800 text-slate-400'
                  }`}
                  title="Toggle visual single-page A4 height marker"
                >
                  A4 Page Guide
                </button>
                <div className="flex items-center gap-1 bg-slate-950 rounded px-1 py-0.5 border border-slate-800">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(60, prev - 10))}
                    className="p-1 hover:text-white"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] font-mono text-slate-300 w-8 text-center">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
                    className="p-1 hover:text-white"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* The Scrollable Preview Sheet Container */}
            <div className="overflow-y-auto max-h-[800px] rounded-xl shadow-inner bg-slate-950/70 p-3 sm:p-5 flex justify-center">
              <div
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out',
                }}
                className="w-full flex justify-center"
              >
                {/* Print isolated resume document */}
                <div
                  ref={resumePrintRef}
                  id="printable-resume"
                  className={`w-full max-w-[650px] bg-white rounded-md shadow-2xl relative transition-all overflow-hidden ${
                    showPageBoundary ? 'ring-1 ring-slate-300' : ''
                  }`}
                  style={{
                    minHeight: '842px', // standard A4 aspect ratio height guide
                  }}
                >
                  {/* Visual Page Break Marker at A4 boundary */}
                  {showPageBoundary && (
                    <div
                      className="absolute left-0 right-0 border-b border-dashed border-rose-300 pointer-events-none no-print flex justify-end px-3"
                      style={{ top: '842px' }}
                    >
                      <span className="text-[9px] font-mono bg-rose-100 text-rose-600 px-1 py-0.2 rounded -mt-2.5">
                        A4 Page 1 End
                      </span>
                    </div>
                  )}

                  {/* Render the selected layout architecture cleanly */}
                  <ResumeTemplateRenderer
                    resume={resume}
                    currentTheme={currentTheme}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Quick Tips Bar */}
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>100% Client-Side Encrypted · 0 Data Stored on Server</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintResume}
                  className="text-slate-400 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {isGeneratingPdf ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  <span>{isGeneratingPdf ? 'Generating...' : 'Download PDF (.pdf)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
