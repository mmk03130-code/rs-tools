import React from 'react';
import { FinanceResumeData } from '../../../types/tools';

export interface ExtendedFinanceResumeData extends FinanceResumeData {
  ftsBatch?: string;
  crn?: string;
  avatarUrl?: string;
  address?: string;
  objective?: string;
  courses?: { id: string; name: string; institute?: string; year?: string }[];
  achievements?: { id: string; title: string; year?: string }[];
  references?: { id: string; name: string; role: string; email?: string; phone?: string; org?: string }[];
  activities?: string;
}

export interface CaAccaTemplateRendererProps {
  resume: ExtendedFinanceResumeData;
  currentTheme: {
    id: string;
    name: string;
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const CaAccaTemplateRenderer: React.FC<CaAccaTemplateRendererProps> = ({
  resume,
  currentTheme,
}) => {
  // Always safe fallback for personalInfo
  const personalInfo = resume?.personalInfo || {
    fullName: '',
    jobTitle: '',
    regNumber: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  };

  const {
    qualifications = [],
    articleship = [],
    experiences = [],
    education = [],
    standards = [],
    software = [],
    coreCompetencies = [],
    certifications = [],
    languages = [],
    courses = [],
    achievements = [],
    references = [],
    activities = '',
    styling = { templateId: 'audit-exec', colorTheme: 'navy', fontFamily: 'sans', spacing: 'standard' },
  } = resume || {};

  // Normalize templateId to one of our 8 curated architectures
  let templateId = styling?.templateId || 'audit-exec';
  if (['audit-exec', 'T-01', 'audit', 'T-47', 'T-12', 'T-10'].includes(templateId)) templateId = 'audit-exec';
  else if (['tax-advisory', 'T-02', 'tax', 'T-11', 'T-09'].includes(templateId)) templateId = 'tax-advisory';
  else if (['corp-controller', 'T-03', 'corp', 'T-25'].includes(templateId)) templateId = 'corp-controller';
  else if (['acca-analyst', 'T-04', 'acca', 'global-acca', 'T-18', 'T-17'].includes(templateId)) templateId = 'acca-analyst';
  else if (['ma-treasury', 'T-05', 'ma', 'treasury-advisory', 'T-07', 'T-08'].includes(templateId)) templateId = 'ma-treasury';
  else if (['risk-assurance', 'T-06', 'risk', 'risk-governance', 'T-14', 'T-37'].includes(templateId)) templateId = 'risk-assurance';
  else if (['clean-ats', 'T-07', 'ats', 'minimalist-ats', 'T-05', 'T-06', 'T-21', 'T-35'].includes(templateId)) templateId = 'clean-ats';
  else if (['cfo-partner', 'T-08', 'cfo', 'executive-cfo'].includes(templateId)) templateId = 'cfo-partner';
  else templateId = 'audit-exec';

  const pColor = currentTheme?.primary || '#021B3A';
  const sColor = currentTheme?.secondary || '#1e3a8a';
  const aColor = currentTheme?.accent || '#3b82f6';

  const fullName = personalInfo.fullName || 'Candidate Name';
  const fontClass = styling?.fontFamily === 'serif' ? 'font-serif' : 'font-sans';

  // Contact line elements
  const contactParts: string[] = [];
  if (resume.ftsBatch) contactParts.push(`${resume.ftsBatch}`);
  if (resume.crn || personalInfo.regNumber) contactParts.push(`Reg / CRN: ${resume.crn || personalInfo.regNumber}`);
  if (personalInfo.phone) contactParts.push(personalInfo.phone);
  if (personalInfo.email) contactParts.push(personalInfo.email);
  if (resume.address || personalInfo.location) contactParts.push(resume.address || personalInfo.location);
  if (personalInfo.linkedin) contactParts.push(personalInfo.linkedin);

  const objectiveText = resume.objective || personalInfo.summary || '';

  // Combines articleship and regular experiences seamlessly
  const allExperiences = [
    ...articleship.map(art => ({
      id: art.id,
      title: art.role,
      firm: art.firmName,
      location: art.location,
      startDate: art.startDate,
      endDate: art.endDate,
      current: art.current,
      department: art.department,
      industries: art.industriesAudited,
      highlights: art.highlights || [],
      isArticleship: true
    })),
    ...experiences.map(exp => ({
      id: exp.id,
      title: exp.role,
      firm: exp.company,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      department: '',
      industries: '',
      highlights: exp.highlights || [],
      isArticleship: false
    }))
  ];

  // =========================================================================
  // TEMPLATE 1: THE BIG-4 AUDIT EXECUTIVE (AUDIT)
  // =========================================================================
  if (templateId === 'audit-exec' || templateId === 'T-01') {
    return (
      <div className={`w-full bg-white text-zinc-900 text-[11px] leading-relaxed p-8 sm:p-11 min-h-[1050px] ${fontClass}`}>
        {/* Header */}
        <div className="border-b-2 pb-4 mb-5" style={{ borderColor: pColor }}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pColor }}>
              {fullName}
            </h1>
            <div className="text-xs font-bold tracking-wide uppercase px-2.5 py-0.5 rounded text-white inline-block sm:inline" style={{ backgroundColor: pColor }}>
              {personalInfo.jobTitle || 'Audit & Assurance Specialist'}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[10px] text-zinc-600 font-medium">
            {contactParts.map((part, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span>{part}</span>
                {idx < contactParts.length - 1 && <span className="text-zinc-300">•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Executive Summary */}
        {objectiveText && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b border-zinc-200" style={{ color: sColor }}>
              Professional Profile & Assurance Focus
            </h2>
            <p className="text-zinc-700 leading-normal text-justify">
              {objectiveText}
            </p>
          </div>
        )}

        {/* CA/ACCA Qualifications */}
        {qualifications.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b border-zinc-200" style={{ color: sColor }}>
              Professional Qualifications & Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {qualifications.map(q => (
                <div key={q.id} className="p-2.5 rounded bg-zinc-50 border border-zinc-200">
                  <div className="flex justify-between items-baseline font-bold text-zinc-900">
                    <span>{q.course}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">{q.year}</span>
                  </div>
                  <div className="text-zinc-600 text-[10px] mt-0.5 flex justify-between">
                    <span>{q.body}</span>
                    <span className="font-semibold text-emerald-700">{q.attempt}</span>
                  </div>
                  {q.marks && <div className="text-[9.5px] text-zinc-500 mt-0.5 italic">{q.marks}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Articleship & Audit Experience */}
        {allExperiences.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b border-zinc-200" style={{ color: sColor }}>
              Articleship & Audit Engagements
            </h2>
            <div className="space-y-4">
              {allExperiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <span className="font-bold text-zinc-900 text-[11.5px]">{exp.title}</span>
                      <span className="text-zinc-500 mx-1.5">|</span>
                      <span className="font-semibold" style={{ color: pColor }}>{exp.firm}</span>
                      {exp.department && <span className="text-zinc-500 text-[10px] ml-1.5 font-normal">({exp.department})</span>}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-medium whitespace-nowrap">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} {exp.location && `• ${exp.location}`}
                    </div>
                  </div>

                  {exp.industries && (
                    <div className="mt-0.5 text-[9.5px] text-zinc-600">
                      <span className="font-semibold text-zinc-700">Client Sectors:</span> {exp.industries}
                    </div>
                  )}

                  {exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-700">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="pl-0.5 leading-snug">{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b border-zinc-200" style={{ color: sColor }}>
              Academic Education
            </h2>
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-zinc-900">{edu.degree}</span>
                    {edu.field && <span className="text-zinc-600 text-[10px]"> — {edu.field}</span>}
                    <div className="text-[10px] text-zinc-600">{edu.institution} {edu.location && `• ${edu.location}`}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-zinc-500">{edu.startDate} – {edu.endDate}</div>
                    {edu.gpa && <div className="text-[10px] font-semibold text-zinc-700">{edu.gpa}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Competencies, Standards & Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {standards.length > 0 && (
            <div>
              <h3 className="text-[10.5px] font-bold uppercase tracking-wider mb-1" style={{ color: sColor }}>
                Technical Standards & Regulations
              </h3>
              <ul className="space-y-0.5 text-[10px] text-zinc-700">
                {standards.map((std, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: aColor }} />
                    <span>{std}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {software.length > 0 && (
            <div>
              <h3 className="text-[10.5px] font-bold uppercase tracking-wider mb-1" style={{ color: sColor }}>
                Audit Software & Financial ERPs
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {software.map((sw, i) => (
                  <span key={i} className="px-2 py-0.5 text-[9.5px] bg-zinc-100 border border-zinc-200 rounded text-zinc-800 font-medium">
                    {sw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 2: CHARTERED TAX & FISCAL COUNSEL (TAX)
  // =========================================================================
  if (templateId === 'tax-advisory' || templateId === 'T-02') {
    return (
      <div className={`w-full bg-white text-zinc-900 text-[11px] leading-relaxed p-8 sm:p-11 min-h-[1050px] ${fontClass}`}>
        {/* Top Official Banner */}
        <div className="p-4 rounded-t border-t-4 mb-4 text-center" style={{ borderTopColor: pColor, backgroundColor: '#f8fafc' }}>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider" style={{ color: pColor }}>
            {fullName}
          </h1>
          <div className="text-xs font-bold text-zinc-700 mt-0.5 tracking-wide uppercase">
            {personalInfo.jobTitle || 'Chartered Tax Practitioner & Corporate Counsel'}
          </div>
          <div className="mt-2 inline-flex flex-wrap justify-center items-center gap-2 text-[10px] text-zinc-600 font-mono bg-white px-3 py-1 rounded border border-zinc-200 shadow-sm">
            {contactParts.map((part, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>{part}</span>
                {i < contactParts.length - 1 && <span className="text-zinc-300">|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Practice Statement */}
        {objectiveText && (
          <div className="mb-4 p-3 border-l-2 bg-zinc-50 text-zinc-800" style={{ borderColor: pColor }}>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-1 text-zinc-500">Practice Overview</div>
            <p className="text-[10.5px] leading-snug">{objectiveText}</p>
          </div>
        )}

        {/* Dual Grid: Statutory Qualifications & Core Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="sm:col-span-2">
            <h2 className="text-xs font-black uppercase tracking-wider pb-1 mb-2 border-b-2" style={{ borderColor: pColor, color: pColor }}>
              Statutory Accounting & Tax Qualifications
            </h2>
            <div className="space-y-2">
              {qualifications.map(q => (
                <div key={q.id} className="border-b border-zinc-100 pb-1.5">
                  <div className="flex justify-between font-bold text-zinc-900">
                    <span>{q.course}</span>
                    <span className="font-mono text-[10px] text-zinc-500">{q.year}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-600">
                    <span>{q.body}</span>
                    <span className="font-semibold text-emerald-800">{q.attempt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-black uppercase tracking-wider pb-1 mb-2 border-b-2" style={{ borderColor: pColor, color: pColor }}>
              Statutory Domains
            </h2>
            <ul className="space-y-1 text-[10px] text-zinc-700">
              {(standards.length > 0 ? standards : [
                'Direct Tax & Corporate Withholding',
                'GST / VAT Assessment & Filings',
                'Transfer Pricing Local & Master Files',
                'Tax Appellate Tribunal Practice'
              ]).slice(0, 5).map((std, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-zinc-400 font-bold">›</span>
                  <span>{std}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Experience & Tax Advisory Engagements */}
        {allExperiences.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-black uppercase tracking-wider pb-1 mb-2 border-b-2" style={{ borderColor: pColor, color: pColor }}>
              Tax Engagements & Professional Experience
            </h2>
            <div className="space-y-3.5">
              {allExperiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-zinc-900">
                    <div className="text-[11.5px]">
                      <span>{exp.title}</span> — <span style={{ color: sColor }}>{exp.firm}</span>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500 font-normal">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  {exp.industries && (
                    <div className="text-[9.5px] text-zinc-500 italic mt-0.5">Focus Industries: {exp.industries}</div>
                  )}
                  {exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-700 text-[10.5px]">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Technical Systems */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-200">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: pColor }}>
              Academic Foundation
            </h3>
            {education.map(edu => (
              <div key={edu.id} className="mb-2 text-[10px]">
                <div className="font-bold text-zinc-900">{edu.degree}</div>
                <div className="text-zinc-600">{edu.institution} ({edu.startDate} - {edu.endDate})</div>
                {edu.gpa && <div className="text-zinc-700 font-semibold">{edu.gpa}</div>}
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: pColor }}>
              Compliance & Reporting Software
            </h3>
            <div className="flex flex-wrap gap-1 text-[9.5px]">
              {(software.length > 0 ? software : ['SAP FI/CO', 'Excel Power Query', 'IRIS Tax System', 'Tally Prime']).map((sw, i) => (
                <span key={i} className="px-2 py-0.5 bg-zinc-100 border border-zinc-300 rounded font-mono text-zinc-800">
                  {sw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 3: CORPORATE FINANCIAL CONTROLLER (CORP)
  // =========================================================================
  if (templateId === 'corp-controller' || templateId === 'T-03') {
    return (
      <div className={`w-full bg-white text-zinc-900 text-[11px] leading-relaxed min-h-[1050px] flex flex-col sm:flex-row ${fontClass}`}>
        {/* Left Dark Sidebar */}
        <div className="w-full sm:w-[32%] p-6 sm:p-7 text-white" style={{ backgroundColor: pColor }}>
          <div className="text-center sm:text-left mb-6">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              {fullName}
            </h1>
            <div className="text-xs font-semibold mt-1 text-amber-300 tracking-wide">
              {personalInfo.jobTitle || 'Financial Controller'}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 mb-6 text-[10px] text-zinc-300">
            <div className="text-[11px] font-bold uppercase tracking-wider text-white border-b border-white/20 pb-1 mb-2">
              Contact & Credentials
            </div>
            {resume.crn && <div><span className="text-white/60">CRN:</span> {resume.crn}</div>}
            {personalInfo.regNumber && <div><span className="text-white/60">Reg No:</span> {personalInfo.regNumber}</div>}
            {personalInfo.email && <div className="break-all"><span className="text-white/60">Email:</span> {personalInfo.email}</div>}
            {personalInfo.phone && <div><span className="text-white/60">Phone:</span> {personalInfo.phone}</div>}
            {personalInfo.location && <div><span className="text-white/60">Location:</span> {personalInfo.location}</div>}
            {personalInfo.linkedin && <div className="break-all"><span className="text-white/60">LinkedIn:</span> {personalInfo.linkedin}</div>}
          </div>

          {/* IFRS & Accounting Standards */}
          {standards.length > 0 && (
            <div className="mb-6">
              <div className="text-[11px] font-bold uppercase tracking-wider text-white border-b border-white/20 pb-1 mb-2">
                Accounting Standards
              </div>
              <ul className="space-y-1 text-[10px] text-zinc-300">
                {standards.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400">▪</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Financial ERP & Software */}
          {software.length > 0 && (
            <div className="mb-6">
              <div className="text-[11px] font-bold uppercase tracking-wider text-white border-b border-white/20 pb-1 mb-2">
                Systems & Tools
              </div>
              <div className="flex flex-wrap gap-1.5">
                {software.map((sw, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-[9.5px] bg-white/10 rounded border border-white/20 text-zinc-200">
                    {sw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-white border-b border-white/20 pb-1 mb-2">
                Languages
              </div>
              <div className="space-y-1 text-[10px] text-zinc-300">
                {languages.map(l => (
                  <div key={l.id} className="flex justify-between">
                    <span>{l.language}</span>
                    <span className="text-zinc-400">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Column */}
        <div className="w-full sm:w-[68%] p-6 sm:p-8">
          {/* Executive Overview */}
          {objectiveText && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-zinc-200" style={{ color: pColor }}>
                Executive Leadership Overview
              </h2>
              <p className="text-zinc-700 leading-relaxed text-justify text-[10.5px]">
                {objectiveText}
              </p>
            </div>
          )}

          {/* Professional Qualifications */}
          {qualifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-zinc-200" style={{ color: pColor }}>
                Chartered Qualifications
              </h2>
              <div className="space-y-2">
                {qualifications.map(q => (
                  <div key={q.id} className="flex justify-between items-baseline bg-zinc-50 p-2 rounded border border-zinc-200">
                    <div>
                      <div className="font-bold text-zinc-900 text-[11px]">{q.course}</div>
                      <div className="text-[10px] text-zinc-600">{q.body} • {q.attempt}</div>
                    </div>
                    <div className="font-mono text-[10px] font-bold text-zinc-700">{q.year}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience / Articleship */}
          {allExperiences.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-zinc-200" style={{ color: pColor }}>
                Professional Experience & Leadership
              </h2>
              <div className="space-y-4">
                {allExperiences.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-zinc-900 text-[11.5px]">{exp.title}</span>
                      <span className="font-mono text-[10px] text-zinc-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="text-[10.5px] font-semibold text-zinc-700 mb-1">
                      {exp.firm} {exp.location && `• ${exp.location}`}
                    </div>
                    {exp.highlights.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-1 text-zinc-700 text-[10.5px]">
                        {exp.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-zinc-200" style={{ color: pColor }}>
                Education
              </h2>
              <div className="space-y-2">
                {education.map(edu => (
                  <div key={edu.id} className="flex justify-between items-baseline">
                    <div>
                      <div className="font-bold text-zinc-900 text-[11px]">{edu.degree}</div>
                      <div className="text-[10px] text-zinc-600">{edu.institution} {edu.location && `• ${edu.location}`}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[10px] text-zinc-500">{edu.startDate} – {edu.endDate}</div>
                      {edu.gpa && <div className="text-[10px] font-semibold text-emerald-800">{edu.gpa}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 4: ACCA GLOBAL FINANCIAL ANALYST (ACCA)
  // =========================================================================
  if (templateId === 'acca-analyst' || templateId === 'T-04') {
    return (
      <div className={`w-full bg-white text-zinc-900 text-[11px] leading-relaxed p-8 sm:p-11 min-h-[1050px] ${fontClass}`}>
        {/* Global Accent Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b-2" style={{ borderColor: sColor }}>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight" style={{ color: pColor }}>
              {fullName}
            </h1>
            <div className="text-xs font-bold tracking-wider uppercase text-zinc-700 mt-0.5">
              {personalInfo.jobTitle || 'ACCA Qualified Global Reporting Analyst'}
            </div>
          </div>
          <div className="mt-2 sm:mt-0 text-right">
            <span className="px-3 py-1 text-xs font-bold uppercase rounded text-white inline-block shadow-sm" style={{ backgroundColor: sColor }}>
              ACCA Global Member
            </span>
          </div>
        </div>

        {/* Contact Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 p-2 bg-zinc-50 rounded border border-zinc-200 text-[10px] text-zinc-600 font-medium mb-5">
          {contactParts.map((part, i) => (
            <span key={i} className="flex items-center gap-2">
              <span>{part}</span>
              {i < contactParts.length - 1 && <span className="text-zinc-300">•</span>}
            </span>
          ))}
        </div>

        {/* Executive Profile */}
        {objectiveText && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: sColor }} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Executive Profile & Cross-Border Expertise
              </h2>
            </div>
            <p className="text-zinc-700 leading-normal pl-4 text-justify">
              {objectiveText}
            </p>
          </div>
        )}

        {/* Professional Qualifications Grid */}
        {qualifications.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: sColor }} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                ACCA & Professional Examination Records
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
              {qualifications.map(q => (
                <div key={q.id} className="p-2.5 rounded border border-zinc-200 bg-white shadow-xs">
                  <div className="flex justify-between items-baseline font-bold text-zinc-900">
                    <span>{q.course}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{q.year}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-600 mt-0.5">
                    <span>{q.body}</span>
                    <span className="font-semibold text-emerald-700">{q.attempt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {allExperiences.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: sColor }} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Employment History & Engagement Portfolio
              </h2>
            </div>
            <div className="space-y-4 pl-4">
              {allExperiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-zinc-900 text-[11.5px]">{exp.title}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="text-zinc-700 font-semibold text-[10.5px]">
                    {exp.firm} {exp.location && `• ${exp.location}`}
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-700">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Core Competencies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 pl-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-zinc-900">
              Education & Degrees
            </h3>
            {education.map(edu => (
              <div key={edu.id} className="mb-2 text-[10.5px]">
                <div className="font-bold text-zinc-900">{edu.degree}</div>
                <div className="text-zinc-600">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
                {edu.gpa && <div className="text-zinc-700 font-semibold">{edu.gpa}</div>}
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-zinc-900">
              Technical Standards & Tools
            </h3>
            <div className="flex flex-wrap gap-1.5 text-[9.5px]">
              {[...standards, ...software].slice(0, 8).map((item, i) => (
                <span key={i} className="px-2 py-0.5 bg-zinc-100 border border-zinc-200 rounded text-zinc-800 font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 5: INVESTMENT BANKING & TREASURY ADVISORY (M&A)
  // =========================================================================
  if (templateId === 'ma-treasury' || templateId === 'T-05') {
    return (
      <div className={`w-full bg-white text-zinc-950 text-[11px] leading-relaxed p-8 sm:p-12 min-h-[1050px] font-serif`}>
        {/* Wall Street Classic Centered Header */}
        <div className="text-center pb-4 mb-4 border-b border-zinc-900">
          <h1 className="text-2xl sm:text-3xl font-normal tracking-wide uppercase">
            {fullName}
          </h1>
          <div className="text-xs italic text-zinc-700 mt-1">
            {personalInfo.jobTitle || 'Treasury & M&A Advisory Associate'}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5 mt-2 text-[10px] text-zinc-600 font-sans">
            {contactParts.map((part, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>{part}</span>
                {i < contactParts.length - 1 && <span>|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Career Statement */}
        {objectiveText && (
          <div className="mb-4 text-justify text-[10.5px] leading-relaxed text-zinc-800">
            {objectiveText}
          </div>
        )}

        {/* Education & Academic Honors */}
        {education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest pb-0.5 mb-2 border-b border-zinc-400">
              Education & Academic Honors
            </h2>
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-zinc-900">{edu.institution}</span>
                    <span className="text-zinc-600 italic"> — {edu.degree}</span>
                  </div>
                  <div className="text-right text-[10px] font-sans">
                    <span>{edu.startDate} – {edu.endDate}</span>
                    {edu.gpa && <span className="ml-2 font-semibold">({edu.gpa})</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chartered Credentials & Examinations */}
        {qualifications.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest pb-0.5 mb-2 border-b border-zinc-400">
              Professional Credentials & Certifications
            </h2>
            <div className="space-y-1.5">
              {qualifications.map(q => (
                <div key={q.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-semibold text-zinc-900">{q.course}</span>
                    <span className="text-zinc-600 italic">, {q.body}</span>
                  </div>
                  <div className="text-right text-[10px] font-sans text-zinc-700">
                    <span>{q.attempt}</span> • <span className="font-mono">{q.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience & Deal Advisory */}
        {allExperiences.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest pb-0.5 mb-2 border-b border-zinc-400">
              Transaction Experience & Corporate Engagements
            </h2>
            <div className="space-y-3.5">
              {allExperiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-zinc-900">{exp.firm}</span>
                    <span className="text-[10px] font-sans text-zinc-600">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="italic text-zinc-700 text-[10.5px]">
                    {exp.title} {exp.department && `— ${exp.department}`}
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-800 text-[10.5px]">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Skills & Financial Modeling */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest pb-0.5 mb-1.5 border-b border-zinc-400">
            Valuation Modeling & Technical Capabilities
          </h2>
          <div className="text-[10.5px] text-zinc-800 space-y-1 font-sans">
            {standards.length > 0 && (
              <div>
                <span className="font-bold font-serif">Standards & Frameworks: </span>
                {standards.join(' • ')}
              </div>
            )}
            {software.length > 0 && (
              <div>
                <span className="font-bold font-serif">Financial Modeling & ERP: </span>
                {software.join(' • ')}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // TEMPLATE 6: RISK GOVERNANCE, SOX & INTERNAL AUDIT (RISK)
  // =========================================================================
  if (templateId === 'risk-assurance' || templateId === 'T-06') {
    return (
      <div className={`w-full bg-white text-zinc-900 text-[11px] leading-relaxed p-8 sm:p-11 min-h-[1050px] ${fontClass}`}>
        {/* Header with Risk Matrix Style */}
        <div className="p-4 rounded border-l-4 mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-50" style={{ borderLeftColor: pColor }}>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pColor }}>
              {fullName}
            </h1>
            <div className="text-xs font-bold text-zinc-700 tracking-wide uppercase mt-0.5">
              {personalInfo.jobTitle || 'Internal Audit, SOX & Risk Governance Specialist'}
            </div>
          </div>
          <div className="mt-2 sm:mt-0 text-[10px] font-mono text-zinc-600 text-left sm:text-right">
            {personalInfo.regNumber && <div>Reg ID: {personalInfo.regNumber}</div>}
            {resume.crn && <div>CRN: {resume.crn}</div>}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-zinc-600 mb-4 pb-2 border-b border-zinc-200">
          {contactParts.map((part, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span>{part}</span>
              {i < contactParts.length - 1 && <span className="text-zinc-300">/</span>}
            </span>
          ))}
        </div>

        {/* Governance & Control Summary */}
        {objectiveText && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-1 text-zinc-900">
              Risk Governance & Assurance Mandate
            </h2>
            <p className="text-zinc-700 text-justify text-[10.5px]">
              {objectiveText}
            </p>
          </div>
        )}

        {/* Experience / Internal Audits */}
        {allExperiences.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2 text-zinc-900 pb-1 border-b-2" style={{ borderColor: pColor }}>
              Internal Audit, SOX 404 & Operational Engagements
            </h2>
            <div className="space-y-4">
              {allExperiences.map(exp => (
                <div key={exp.id} className="border-l-2 pl-3" style={{ borderColor: sColor }}>
                  <div className="flex justify-between items-baseline font-bold text-zinc-900">
                    <span className="text-[11.5px]">{exp.title}</span>
                    <span className="text-[10px] font-mono text-zinc-500 font-normal">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="text-[10.5px] font-semibold text-zinc-700">
                    {exp.firm} {exp.department && `(${exp.department})`}
                  </div>
                  {exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-700 text-[10.5px]">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dual Column: Qualifications & Governance Frameworks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-zinc-900 pb-1 border-b border-zinc-200">
              Certifications & Qualifications
            </h3>
            <div className="space-y-2">
              {qualifications.map(q => (
                <div key={q.id} className="text-[10.5px]">
                  <div className="font-bold text-zinc-900">{q.course}</div>
                  <div className="text-zinc-600 text-[10px]">{q.body} • {q.attempt} ({q.year})</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-zinc-900 pb-1 border-b border-zinc-200">
              Audit Standards & Internal Controls
            </h3>
            <div className="flex flex-wrap gap-1 text-[9.5px]">
              {(standards.length > 0 ? standards : ['SOX 404', 'COSO Framework', 'ISA 315 Risk Assessment', 'ICFR Testing']).map((std, i) => (
                <span key={i} className="px-2 py-0.5 bg-zinc-100 rounded border border-zinc-300 font-medium text-zinc-800">
                  {std}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TEMPLATE 7: PRISTINE MINIMALIST LINEAR ATS (ATS)
  // =========================================================================
  if (templateId === 'clean-ats' || templateId === 'T-07') {
    return (
      <div className={`w-full bg-white text-zinc-900 text-[11px] leading-relaxed p-8 sm:p-12 min-h-[1050px] font-sans`}>
        {/* ATS Machine Header */}
        <div className="text-center pb-3 mb-4 border-b border-zinc-300">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 uppercase">
            {fullName}
          </h1>
          <div className="text-xs font-semibold text-zinc-700 mt-0.5">
            {personalInfo.jobTitle || 'Chartered Accountant / Financial Analyst'}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5 mt-1 text-[10px] text-zinc-600">
            {contactParts.map((part, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span>{part}</span>
                {i < contactParts.length - 1 && <span>•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* ATS Section: Professional Summary */}
        {objectiveText && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 pb-0.5 mb-1.5 border-b border-zinc-300">
              Professional Summary
            </h2>
            <p className="text-zinc-800 text-[10.5px] leading-normal text-justify">
              {objectiveText}
            </p>
          </div>
        )}

        {/* ATS Section: Core Competencies */}
        {coreCompetencies.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 pb-0.5 mb-1.5 border-b border-zinc-300">
              Core Competencies & Keywords
            </h2>
            <div className="text-[10px] text-zinc-800">
              {coreCompetencies.join(' • ')}
            </div>
          </div>
        )}

        {/* ATS Section: Professional Experience */}
        {allExperiences.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 pb-0.5 mb-1.5 border-b border-zinc-300">
              Professional Experience
            </h2>
            <div className="space-y-3.5">
              {allExperiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-bold text-zinc-900 text-[11px]">
                    <span>{exp.title} — {exp.firm}</span>
                    <span className="text-[10px] font-normal text-zinc-600">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.location && <div className="text-[10px] text-zinc-600 italic">{exp.location}</div>}
                  {exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-800 text-[10.5px]">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ATS Section: Education */}
        {education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 pb-0.5 mb-1.5 border-b border-zinc-300">
              Education
            </h2>
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between items-baseline text-[10.5px]">
                  <div>
                    <span className="font-bold text-zinc-900">{edu.degree}</span>
                    <span className="text-zinc-700">, {edu.institution}</span>
                  </div>
                  <div className="text-[10px] text-zinc-600">
                    {edu.startDate} – {edu.endDate} {edu.gpa && `| ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ATS Section: Certifications & Technical Skills */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 pb-0.5 mb-1.5 border-b border-zinc-300">
            Professional Certifications & Systems
          </h2>
          <div className="text-[10px] text-zinc-800 space-y-1">
            {qualifications.length > 0 && (
              <div>
                <span className="font-bold">Certifications: </span>
                {qualifications.map(q => `${q.course} (${q.body}, ${q.year})`).join('; ')}
              </div>
            )}
            {standards.length > 0 && (
              <div>
                <span className="font-bold">Standards: </span>
                {standards.join(', ')}
              </div>
            )}
            {software.length > 0 && (
              <div>
                <span className="font-bold">Software & Tools: </span>
                {software.join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 8: T-08 - EXECUTIVE CFO & PRACTICE PARTNER
  // =========================================================================
  return (
    <div className={`w-full bg-white text-zinc-900 text-[11px] leading-relaxed p-8 sm:p-11 min-h-[1050px] ${fontClass}`}>
      {/* High-Level Executive Banner */}
      <div className="p-5 rounded-lg mb-5 text-white" style={{ backgroundColor: pColor }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {fullName}
            </h1>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-300 mt-0.5">
              {personalInfo.jobTitle || 'Chief Financial Officer & Practice Partner'}
            </div>
          </div>
          <div className="text-right text-[10px] font-mono text-zinc-300">
            {resume.crn && <div>Fellow Member | {resume.crn}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
          </div>
        </div>

        {/* Contact Links */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 pt-3 border-t border-white/15 text-[10px] text-zinc-300 font-sans">
          {contactParts.map((part, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span>{part}</span>
              {i < contactParts.length - 1 && <span className="text-white/30">•</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Strategic CFO Statement */}
      {objectiveText && (
        <div className="mb-5 p-3.5 rounded bg-zinc-50 border border-zinc-200">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
            Executive Leadership Statement
          </div>
          <p className="text-zinc-800 text-[10.5px] leading-relaxed text-justify">
            {objectiveText}
          </p>
        </div>
      )}

      {/* Experience & Board Advisory */}
      {allExperiences.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ borderColor: pColor, color: pColor }}>
            Executive Experience & Practice Stewardship
          </h2>
          <div className="space-y-4">
            {allExperiences.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-zinc-900">
                  <span className="text-[12px]">{exp.title} — {exp.firm}</span>
                  <span className="text-[10px] font-mono text-zinc-500 font-normal">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-700 text-[10.5px]">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Qualifications & Academic Record */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b border-zinc-200" style={{ color: pColor }}>
            Chartered Credentials & Fellowships
          </h3>
          <div className="space-y-2">
            {qualifications.map(q => (
              <div key={q.id} className="text-[10.5px]">
                <div className="font-bold text-zinc-900">{q.course}</div>
                <div className="text-zinc-600 text-[10px]">{q.body} • {q.attempt} ({q.year})</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b border-zinc-200" style={{ color: pColor }}>
            Education & Executive Programs
          </h3>
          <div className="space-y-2">
            {education.map(edu => (
              <div key={edu.id} className="text-[10.5px]">
                <div className="font-bold text-zinc-900">{edu.degree}</div>
                <div className="text-zinc-600 text-[10px]">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
                {edu.gpa && <div className="text-emerald-800 font-semibold text-[10px]">{edu.gpa}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
