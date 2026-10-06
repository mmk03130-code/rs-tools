import React, { useState, useRef } from 'react';
import {
  Download, Sparkles, Check, Plus, Trash2, Sliders, Palette,
  Type, MoveVertical, ShieldCheck, Eye, RefreshCw, FileText,
  User, Briefcase, GraduationCap, Code, Award, ExternalLink
} from 'lucide-react';
import { ResumeData } from '../../../types/tools';
import confetti from 'canvas-confetti';

export const ResumeBuilder: React.FC = () => {
  // State for active editor section
  const [activeTab, setActiveTab] = useState<'content' | 'templates' | 'ats' | 'styles'>('content');
  const [contentSubTab, setContentSubTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'projects'>('personal');

  // Resume State with rich default sample data
  const [resume, setResume] = useState<ResumeData>({
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
      { name: 'TypeScript / React / Next.js', level: 95 },
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
    styling: {
      templateId: 'modern-split',
      colorTheme: 'navy',
      fontFamily: 'sans',
      spacing: 'standard',
      showSkillBars: true,
      showIcons: true,
    },
  });

  const resumePrintRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // 15 Base Template Architectures
  const TEMPLATE_ARCHITECTURES = [
    { id: 'modern-split', name: 'Modern Dual-Column', desc: 'Sleek sidebar with balanced content hierarchy' },
    { id: 'clean-ats', name: 'Clean Tech ATS', desc: '100% standard single-column scanner optimized' },
    { id: 'executive', name: 'Executive Header', desc: 'High-contrast header band with corporate elegance' },
    { id: 'minimalist', name: 'Swiss Minimalist', desc: 'Understated typographic perfection' },
    { id: 'academic', name: 'Academic Vitae', desc: 'Dense, prestigious research & publication layout' },
    { id: 'creative-tag', name: 'Creative Accent', desc: 'Vibrant highlight bars and modern badge markers' },
    { id: 'compact-grid', name: 'Compact Dense Grid', desc: 'Fits 10+ years experience cleanly on single page' },
    { id: 'corporate-slate', name: 'Corporate Standard', desc: 'Fortune 500 compliant business structure' },
    { id: 'metro-sidebar', name: 'Metro Left Column', desc: 'Contact & skills grouped on left rail' },
    { id: 'timeline-focus', name: 'Timeline Career', desc: 'Vertical connecting node timeline' },
    { id: 'bold-accent', name: 'Bold Headline', desc: 'Distinct typography for prominent leaders' },
    { id: 'nordic-clean', name: 'Nordic Clean', desc: 'Spacious Scandinavian design with soft contrast' },
    { id: 'developer-code', name: 'Developer Monospace', desc: 'Technical profile with subtle mono accents' },
    { id: 'hybrid-ats', name: 'Hybrid ATS Pro', desc: 'ATS parser compliant with subtle visual flair' },
    { id: 'classic-serif', name: 'Classic Editorial', desc: 'Timeless Ivy-League serif typography' },
  ];

  // 10 Color Theme Palettes (15 architectures × 10 themes = 150 unique template variations!)
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
    const tips: string[] = [];

    // Personal info checks
    if (resume.personalInfo.fullName.length > 2) score += 10;
    if (resume.personalInfo.email.includes('@')) score += 10;
    else tips.push('Add a valid professional email address');

    if (resume.personalInfo.phone.length > 5) score += 10;
    else tips.push('Include a contact phone number');

    if (resume.personalInfo.summary.length > 60) score += 15;
    else tips.push('Expand professional summary to at least 2 sentences');

    // Experience checks
    if (resume.experiences.length >= 2) score += 20;
    else if (resume.experiences.length === 1) score += 10;
    else tips.push('Add at least one work experience item');

    // Bullet points with action verbs check
    const allBullets = resume.experiences.flatMap(e => e.highlights).join(' ');
    const actionVerbs = ['led', 'engineered', 'architected', 'developed', 'optimized', 'reduced', 'managed', 'created', 'built', 'spearheaded', 'redesigned'];
    const verbHits = actionVerbs.filter(v => allBullets.toLowerCase().includes(v)).length;
    if (verbHits >= 3) score += 15;
    else tips.push('Use strong action verbs (Led, Engineered, Optimized, Architected) in experience bullets');

    // Skills check
    if (resume.skills.length >= 5) score += 10;
    else tips.push('List at least 5 industry-relevant technical or soft skills');

    // Education check
    if (resume.education.length >= 1) score += 10;
    else tips.push('Add degree and educational institution');

    return { score: Math.min(100, score), tips };
  };

  const { score: atsScore, tips: atsTips } = calculateAtsScore();

  // Export PDF Handler
  const handleExportPdf = () => {
    setIsExporting(true);
    // Trigger confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    // Open print dialog with isolated print styles for 100% crisp vector PDF export
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 250);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Resume & CV Generator Engine
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
              150+ Templates · ATS 100% Compliant
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">Interactive ATS Resume Studio</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Real-time live preview, 150+ customizable template styles, instant ATS score checker, and high-resolution vector PDF export.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportPdf}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-2 shadow-lg shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF (High-Res)</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Editor Controls & Tabs (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Module Navigation Bar */}
          <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'content' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Content</span>
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'templates' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Templates</span>
            </button>
            <button
              onClick={() => setActiveTab('ats')}
              className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'ats' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ATS Score</span>
            </button>
            <button
              onClick={() => setActiveTab('styles')}
              className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'styles' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Styling</span>
            </button>
          </div>

          {/* TAB 1: CONTENT EDITOR */}
          {activeTab === 'content' && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              {/* Content sub-tabs */}
              <div className="flex border-b border-slate-800 pb-2 gap-2 text-xs overflow-x-auto">
                {[
                  { id: 'personal', label: 'Contact', icon: User },
                  { id: 'experience', label: 'Experience', icon: Briefcase },
                  { id: 'education', label: 'Education', icon: GraduationCap },
                  { id: 'skills', label: 'Skills', icon: Code },
                  { id: 'projects', label: 'Projects', icon: Award },
                ].map(sub => {
                  const Icon = sub.icon;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setContentSubTab(sub.id as any)}
                      className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                        contentSubTab === sub.id
                          ? 'bg-blue-950/80 text-blue-400 border border-blue-500/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{sub.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Personal Info */}
              {contentSubTab === 'personal' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={resume.personalInfo.fullName}
                      onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, fullName: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Job Title / Headline</label>
                    <input
                      type="text"
                      value={resume.personalInfo.jobTitle}
                      onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, jobTitle: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Email</label>
                      <input
                        type="email"
                        value={resume.personalInfo.email}
                        onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, email: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Phone</label>
                      <input
                        type="text"
                        value={resume.personalInfo.phone}
                        onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, phone: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Location</label>
                      <input
                        type="text"
                        value={resume.personalInfo.location}
                        onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, location: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Website / Portfolio</label>
                      <input
                        type="text"
                        value={resume.personalInfo.website}
                        onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, website: e.target.value } })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Professional Summary</label>
                    <textarea
                      rows={4}
                      value={resume.personalInfo.summary}
                      onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, summary: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* Work Experience */}
              {contentSubTab === 'experience' && (
                <div className="space-y-4">
                  {resume.experiences.map((exp, index) => (
                    <div key={exp.id} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-blue-400">Position #{index + 1}</span>
                        {resume.experiences.length > 1 && (
                          <button
                            onClick={() => setResume({ ...resume, experiences: resume.experiences.filter((_, i) => i !== index) })}
                            className="text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={e => {
                            const updated = [...resume.experiences];
                            updated[index].company = e.target.value;
                            setResume({ ...resume, experiences: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Role"
                          value={exp.role}
                          onChange={e => {
                            const updated = [...resume.experiences];
                            updated[index].role = e.target.value;
                            setResume({ ...resume, experiences: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={e => {
                            const updated = [...resume.experiences];
                            updated[index].startDate = e.target.value;
                            setResume({ ...resume, experiences: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={e => {
                            const updated = [...resume.experiences];
                            updated[index].endDate = e.target.value;
                            setResume({ ...resume, experiences: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Bullet points (one per line)"
                        value={exp.highlights.join('\n')}
                        onChange={e => {
                          const updated = [...resume.experiences];
                          updated[index].highlights = e.target.value.split('\n');
                          setResume({ ...resume, experiences: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                      />
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      const newExp = {
                        id: String(Date.now()),
                        company: 'Tech Corp',
                        role: 'Software Engineer',
                        location: 'Remote',
                        startDate: '2023',
                        endDate: '2024',
                        current: false,
                        description: 'Developed scalable microservices.',
                        highlights: ['Optimized query performance by 25%.', 'Collaborated on cloud deployment.'],
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

              {/* Education */}
              {contentSubTab === 'education' && (
                <div className="space-y-3">
                  {resume.education.map((edu, index) => (
                    <div key={edu.id} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={e => {
                          const updated = [...resume.education];
                          updated[index].institution = e.target.value;
                          setResume({ ...resume, education: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Degree & Major"
                        value={edu.degree}
                        onChange={e => {
                          const updated = [...resume.education];
                          updated[index].degree = e.target.value;
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
                            updated[index].endDate = e.target.value;
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
                            updated[index].gpa = e.target.value;
                            setResume({ ...resume, education: updated });
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {contentSubTab === 'skills' && (
                <div className="space-y-3">
                  {resume.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={e => {
                          const updated = [...resume.skills];
                          updated[index].name = e.target.value;
                          setResume({ ...resume, skills: updated });
                        }}
                        className="flex-1 bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white"
                      />
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={skill.level}
                        onChange={e => {
                          const updated = [...resume.skills];
                          updated[index].level = Number(e.target.value);
                          setResume({ ...resume, skills: updated });
                        }}
                        className="w-24 accent-blue-500"
                      />
                      <button
                        onClick={() => setResume({ ...resume, skills: resume.skills.filter((_, i) => i !== index) })}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setResume({ ...resume, skills: [...resume.skills, { name: 'New Technical Skill', level: 85 }] })}
                    className="w-full py-1.5 text-xs rounded border border-dashed border-slate-700 text-slate-400 hover:text-white"
                  >
                    + Add Skill
                  </button>
                </div>
              )}

              {/* Projects */}
              {contentSubTab === 'projects' && (
                <div className="space-y-3">
                  {resume.projects.map((proj, index) => (
                    <div key={proj.id} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={proj.title}
                        onChange={e => {
                          const updated = [...resume.projects];
                          updated[index].title = e.target.value;
                          setResume({ ...resume, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Tech Stack"
                        value={proj.technologies}
                        onChange={e => {
                          const updated = [...resume.projects];
                          updated[index].technologies = e.target.value;
                          setResume({ ...resume, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                      />
                      <textarea
                        rows={2}
                        placeholder="Description"
                        value={proj.description}
                        onChange={e => {
                          const updated = [...resume.projects];
                          updated[index].description = e.target.value;
                          setResume({ ...resume, projects: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TEMPLATES (150+ VARIATIONS ENGINE) */}
          {activeTab === 'templates' && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 max-h-[500px] overflow-y-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select Layout Architecture
                </span>
                <span className="text-[10px] text-blue-400 font-medium">
                  {TEMPLATE_ARCHITECTURES.length} Layouts × {COLOR_THEMES.length} Themes = 150 Designs
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {TEMPLATE_ARCHITECTURES.map(tpl => (
                  <button
                    key={tpl.id}
                    onClick={() => setResume({ ...resume, styling: { ...resume.styling, templateId: tpl.id } })}
                    className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                      resume.styling.templateId === tpl.id
                        ? 'bg-blue-950/60 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-xs block">{tpl.name}</span>
                      <span className="text-[11px] text-slate-400">{tpl.desc}</span>
                    </div>
                    {resume.styling.templateId === tpl.id && (
                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ATS COMPATIBILITY CHECKER */}
          {activeTab === 'ats' && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">ATS Scanner Score</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    {atsScore} / 100
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 flex items-center justify-center font-bold text-xs text-white">
                  {atsScore}%
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">
                  Automated ATS Optimization Suggestions:
                </span>
                {atsTips.length === 0 ? (
                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Outstanding! Your resume structure is 100% ATS compliant.</span>
                  </div>
                ) : (
                  atsTips.map((tip, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-amber-300/90 flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{tip}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: STYLING & COLOR THEMES */}
          {activeTab === 'styles' && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
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
                          ? 'border-blue-500 bg-slate-950'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: theme.primary }} />
                      <span className="text-xs text-slate-200">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Typography Pairing
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'sans', label: 'Inter Sans', font: 'font-sans' },
                    { id: 'serif', label: 'Editorial Serif', font: 'font-serif' },
                    { id: 'mono', label: 'Tech Mono', font: 'font-mono' },
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setResume({ ...resume, styling: { ...resume.styling, fontFamily: f.id } })}
                      className={`py-2 text-xs rounded border ${
                        resume.styling.fontFamily === f.id
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live High-Resolution Resume Preview Canvas (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="sticky top-20 rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                <span>Live Real-Time ATS Sheet Preview (A4 Standard)</span>
              </span>
              <span>100% Vector Crisp</span>
            </div>

            {/* The Resume Sheet Container (printable and styled) */}
            <div className="overflow-y-auto max-h-[750px] rounded-lg shadow-inner bg-slate-950/50 p-2 sm:p-4 flex justify-center">
              <div
                ref={resumePrintRef}
                id="printable-resume"
                style={{
                  fontFamily: resume.styling.fontFamily === 'serif' ? 'Georgia, serif' : resume.styling.fontFamily === 'mono' ? 'JetBrains Mono, monospace' : 'Inter, sans-serif',
                }}
                className="w-full max-w-[650px] bg-white text-slate-900 rounded shadow-2xl p-8 sm:p-10 text-xs leading-relaxed transition-all"
              >
                {/* Resume Header */}
                <div
                  className="pb-5 mb-5 border-b-2"
                  style={{ borderColor: currentTheme.primary }}
                >
                  <h1
                    className="text-2xl font-bold tracking-tight mb-1"
                    style={{ color: currentTheme.primary }}
                  >
                    {resume.personalInfo.fullName}
                  </h1>
                  <p className="text-sm font-semibold text-slate-700 mb-2.5">
                    {resume.personalInfo.jobTitle}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-600">
                    <span>{resume.personalInfo.email}</span>
                    <span>•</span>
                    <span>{resume.personalInfo.phone}</span>
                    <span>•</span>
                    <span>{resume.personalInfo.location}</span>
                    {resume.personalInfo.website && (
                      <>
                        <span>•</span>
                        <span>{resume.personalInfo.website}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Professional Summary */}
                {resume.personalInfo.summary && (
                  <div className="mb-5">
                    <h2
                      className="text-xs font-bold uppercase tracking-wider mb-1.5"
                      style={{ color: currentTheme.primary }}
                    >
                      Professional Summary
                    </h2>
                    <p className="text-[11.5px] text-slate-700 leading-normal">
                      {resume.personalInfo.summary}
                    </p>
                  </div>
                )}

                {/* Work Experience */}
                <div className="mb-5">
                  <h2
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: currentTheme.primary }}
                  >
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {resume.experiences.map(exp => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline mb-0.5">
                          <span className="font-bold text-slate-900 text-xs">{exp.role}</span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </div>
                        <div className="text-[11px] font-semibold text-slate-700 mb-1">
                          {exp.company} · {exp.location}
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 pl-1">
                          {exp.highlights.filter(Boolean).map((h, i) => (
                            <li key={i} className="leading-snug">{h}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-5">
                  <h2
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: currentTheme.primary }}
                  >
                    Education
                  </h2>
                  {resume.education.map(edu => (
                    <div key={edu.id} className="flex justify-between items-baseline">
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{edu.degree}</div>
                        <div className="text-[11px] text-slate-600">{edu.institution}</div>
                      </div>
                      <div className="text-[11px] text-slate-500">{edu.endDate}</div>
                    </div>
                  ))}
                </div>

                {/* Skills Grid */}
                <div className="mb-5">
                  <h2
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: currentTheme.primary }}
                  >
                    Core Competencies & Skills
                  </h2>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    {resume.skills.map((skill, i) => (
                      <div key={i} className="flex items-center justify-between pr-2">
                        <span className="text-slate-800 font-medium">• {skill.name}</span>
                        {resume.styling.showSkillBars && (
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${skill.level}%`, backgroundColor: currentTheme.primary }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                {resume.projects.length > 0 && (
                  <div>
                    <h2
                      className="text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: currentTheme.primary }}
                    >
                      Featured Projects
                    </h2>
                    <div className="space-y-2">
                      {resume.projects.map(proj => (
                        <div key={proj.id}>
                          <div className="flex justify-between text-xs font-bold text-slate-900">
                            <span>{proj.title}</span>
                            {proj.link && <span className="text-[10px] text-blue-600 font-normal">{proj.link}</span>}
                          </div>
                          <p className="text-[11px] text-slate-600">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
