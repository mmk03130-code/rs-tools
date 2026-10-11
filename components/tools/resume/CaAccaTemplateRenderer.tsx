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
    fullName: 'Mr. R',
    jobTitle: 'Chartered Accountant Trainee (Articleship)',
    regNumber: 'CRN-88492',
    email: 'mr.r.audit@example.com',
    phone: '+92 300 0000000',
    location: 'Lahore, Pakistan',
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
    styling = { templateId: 'T-47', colorTheme: 'navy', fontFamily: 'sans', spacing: 'standard' },
  } = resume || {};

  const templateId = styling?.templateId || 'T-47';
  const pColor = currentTheme?.primary || '#021B3A';
  const sColor = currentTheme?.secondary || '#1e3a8a';
  const aColor = currentTheme?.accent || '#3b82f6';

  const fullName = personalInfo.fullName || 'Mr. R';

  // Contact line elements
  const contactParts: string[] = [];
  if (resume.ftsBatch) contactParts.push(`FTS - ${resume.ftsBatch}`);
  if (resume.crn || personalInfo.regNumber) contactParts.push(`CRN: ${resume.crn || personalInfo.regNumber}`);
  if (personalInfo.jobTitle) contactParts.push(personalInfo.jobTitle);

  const contactSubParts: string[] = [];
  if (personalInfo.phone) contactSubParts.push(`Phone: ${personalInfo.phone}`);
  if (personalInfo.email) contactSubParts.push(`Email: ${personalInfo.email}`);
  if (resume.address || personalInfo.location) contactSubParts.push(`Address: ${resume.address || personalInfo.location}`);
  if (personalInfo.linkedin) contactSubParts.push(`LinkedIn: ${personalInfo.linkedin}`);

  const objectiveText =
    resume.objective ||
    personalInfo.summary ||
    'Dedicated and ambitious Chartered Accountancy student seeking a 3.5-year Articleship induction in a reputable audit and assurance practice. Committed to applying strong analytical grounding in IFRS, ISA, and Corporate Taxation to statutory audit engagements while upholding the highest standards of professional ethics and objectivity.';

  // Standard Section Header Renderer
  const renderHeader = (
    title: string,
    styleType: 'line' | 'bar' | 'boxed' | 'minimal' | 'serif' | 'tag' | 'accent' = 'line'
  ) => {
    if (styleType === 'bar') {
      return (
        <div
          className="text-[11px] font-bold uppercase tracking-wider text-white px-2.5 py-0.5 rounded-xs mb-2 shadow-xs"
          style={{ backgroundColor: pColor }}
        >
          {title}
        </div>
      );
    }
    if (styleType === 'boxed') {
      return (
        <div className="border-l-4 pl-2.5 mb-2" style={{ borderColor: pColor }}>
          <h2 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: pColor }}>
            {title}
          </h2>
        </div>
      );
    }
    if (styleType === 'minimal') {
      return (
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 mb-1.5 border-b border-zinc-200 pb-0.5">
          {title}
        </h2>
      );
    }
    if (styleType === 'serif') {
      return (
        <h2 className="text-[12px] font-serif font-bold uppercase tracking-widest text-zinc-950 border-b-2 border-zinc-900 pb-1 mb-2">
          {title}
        </h2>
      );
    }
    if (styleType === 'tag') {
      return (
        <div className="flex items-center gap-2 mb-2">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
            style={{ backgroundColor: pColor }}
          />
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900">
            {title}
          </h2>
          <div className="flex-1 h-px bg-zinc-200" />
        </div>
      );
    }
    if (styleType === 'accent') {
      return (
        <h2
          className="text-[11px] font-bold uppercase tracking-wider pb-1 mb-2 flex items-center justify-between border-b-2"
          style={{ borderColor: pColor, color: pColor }}
        >
          <span>{title}</span>
        </h2>
      );
    }
    return (
      <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5 mb-2 flex items-center justify-between">
        <span>{title}</span>
      </h2>
    );
  };

  // Qualifications list/table
  const renderQualifications = (variant: 'table' | 'cards' | 'badges' | 'standard' = 'standard') => {
    if (!qualifications || qualifications.length === 0) return null;

    if (variant === 'table') {
      return (
        <div className="border border-zinc-200 rounded-md overflow-hidden text-[10px] mb-2">
          <table className="w-full text-left">
            <thead className="bg-zinc-100 text-zinc-800 font-semibold border-b border-zinc-200">
              <tr>
                <th className="p-1.5">Examination Stage</th>
                <th className="p-1.5">Institute</th>
                <th className="p-1.5">Attempt Status</th>
                <th className="p-1.5 text-right">Result / Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {qualifications.map(q => (
                <tr key={q.id} className="hover:bg-zinc-50">
                  <td className="p-1.5 font-bold text-zinc-900">{q.course}</td>
                  <td className="p-1.5 text-zinc-600">{q.body}</td>
                  <td className="p-1.5 text-zinc-700 font-mono text-[9.5px]">
                    {q.attempt || '1st Attempt'}
                  </td>
                  <td className="p-1.5 text-right font-semibold text-emerald-700">
                    {q.marks || 'Qualified'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (variant === 'badges') {
      return (
        <div className="space-y-1.5 text-[10.5px]">
          {qualifications.map(q => (
            <div
              key={q.id}
              className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 flex justify-between items-center"
            >
              <div>
                <span className="font-bold text-zinc-900">{q.course}</span>
                <span className="text-zinc-600 ml-1.5 text-[10px]">({q.body})</span>
                {q.attempt && (
                  <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] bg-blue-50 text-blue-700 font-semibold">
                    {q.attempt}
                  </span>
                )}
              </div>
              <div className="text-right text-[10px]">
                <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-emerald-100 text-emerald-800">
                  {q.marks || 'Passed'}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-1.5 text-[10.5px]">
        {qualifications.map(q => (
          <div key={q.id} className="flex justify-between items-baseline">
            <div>
              <strong className="text-zinc-950 font-semibold">{q.course}</strong>
              <span className="text-zinc-600 ml-1.5">({q.body})</span>
              {q.attempt && (
                <span className="text-zinc-500 ml-2 font-mono text-[10px]">
                  — {q.attempt}
                </span>
              )}
            </div>
            <div className="text-right text-[10px] text-zinc-600">
              {q.year && <span className="italic mr-2">{q.year}</span>}
              {q.marks && (
                <span className="font-semibold text-zinc-800">[{q.marks}]</span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Education list
  const renderEducation = () => {
    if (!education || education.length === 0) return null;
    return (
      <div className="space-y-1.5 text-[10.5px]">
        {education.map(e => (
          <div key={e.id} className="flex justify-between items-baseline">
            <div>
              <strong className="text-zinc-950 font-semibold">{e.degree}</strong>
              {e.field && <span className="text-zinc-700">, {e.field}</span>}
              <span className="text-zinc-600 ml-1.5">— {e.institution}</span>
            </div>
            <div className="text-right text-[10px] text-zinc-600">
              <span className="font-medium mr-1.5">({e.endDate || e.startDate})</span>
              {e.gpa && <span className="font-semibold text-zinc-800">{e.gpa}</span>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Practical Experience / Articleship
  const renderExperienceList = (showDepartmentTag = true) => {
    const list = articleship?.length
      ? articleship
      : experiences?.length
      ? experiences.map(exp => ({
          id: exp.id,
          firmName: exp.company,
          role: exp.role,
          location: exp.location,
          startDate: exp.startDate,
          endDate: exp.endDate,
          department: 'Audit & Assurance',
          highlights: exp.highlights || [exp.description],
        }))
      : [];

    if (list.length === 0) return null;

    return (
      <div className="space-y-2.5 text-[10.5px]">
        {list.map((item: any) => (
          <div key={item.id} className="space-y-0.5">
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-zinc-900">{item.role || 'Audit Trainee'}</span>
              <span className="text-[10px] text-zinc-600 font-mono">
                {item.startDate} – {item.endDate || 'Present'}
              </span>
            </div>
            <div className="text-[10px] font-semibold text-zinc-700 flex items-center gap-1.5">
              <span>{item.firmName}</span>
              {item.location && <span className="text-zinc-500 font-normal">({item.location})</span>}
              {showDepartmentTag && item.department && (
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-zinc-100 text-zinc-700 border border-zinc-200">
                  {item.department}
                </span>
              )}
            </div>
            {item.highlights && item.highlights.length > 0 && (
              <ul className="list-disc pl-4 space-y-0.5 text-zinc-700 text-[10px]">
                {item.highlights.filter(Boolean).map((h: string, idx: number) => (
                  <li key={idx} className="leading-relaxed">
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Technical Competencies
  const allSkills = [
    ...(coreCompetencies || []),
    ...(standards || []),
    ...(software || []),
  ];

  // Helper for 2-column bottom metadata
  const renderBottomGrid = () => (
    <div className="grid grid-cols-2 gap-4 text-[10.5px] pt-1 border-t border-zinc-200">
      <div>
        <h3 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-0.5 mb-1">
          Certifications & Technical Training
        </h3>
        <ul className="list-disc pl-4 space-y-0.5 text-zinc-700 text-[10px]">
          {certifications?.map(c => (
            <li key={c.id}>
              <strong>{c.name}</strong> ({c.issuer})
            </li>
          ))}
          {resume.courses?.map(c => (
            <li key={c.id}>
              {c.name} {c.institute && `(${c.institute})`}
            </li>
          ))}
          {!certifications?.length && !resume.courses?.length && (
            <>
              <li>Hands-on Presentation & Personal Effectiveness (PPEC - ICAP)</li>
              <li>Financial Modeling & Valuations (FMVA)</li>
              <li>MS Office Advanced Automation (VLOOKUP, Pivot Tables)</li>
            </>
          )}
        </ul>
      </div>

      <div>
        <h3 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-0.5 mb-1">
          Honors & Extra-Curricular
        </h3>
        <ul className="list-disc pl-4 space-y-0.5 text-zinc-700 text-[10px]">
          {resume.achievements?.map(a => (
            <li key={a.id}>{a.title}</li>
          ))}
          {!resume.achievements?.length && (
            <>
              <li>Merit Scholarship for Academic Excellence</li>
              <li>All PRC / AFC papers qualified in 1st attempt</li>
              <li>Certificate of Merit in Financial Accounting</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );

  // Footer Row
  const renderFooterRow = () => (
    <div className="border-t border-zinc-200 pt-2 mt-3 text-[10px] text-zinc-700 flex flex-wrap justify-between items-center gap-2">
      <div>
        <span className="font-bold text-zinc-900">Languages: </span>
        <span>{languages?.map(l => l.language).join(', ') || 'English (Professional), Urdu (Native)'}</span>
      </div>
      <div>
        <span className="font-bold text-zinc-900">Activities: </span>
        <span>{resume.activities || 'Captain of Cricket Team, Debate Society'}</span>
      </div>
      <div>
        <span className="font-bold text-zinc-900">Reference: </span>
        <span>
          {resume.references?.[0]?.name
            ? `${resume.references[0].name} (${resume.references[0].role})`
            : 'Available upon request'}
        </span>
      </div>
    </div>
  );

  // =========================================================================
  // TEMPLATE 1: T-01 Classic Corporate (Traditional Masthead with Double Bars)
  // =========================================================================
  if (templateId === 'T-01') {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-serif">
        <div className="text-center pb-3 mb-4 border-b-4 border-double border-zinc-900">
          <h1 className="text-3xl font-extrabold uppercase tracking-widest text-zinc-950">
            {fullName}
          </h1>
          <p className="text-xs font-sans font-bold tracking-wider uppercase text-zinc-700 mt-1">
            {contactParts.join('  •  ')}
          </p>
          <div className="text-[10px] font-sans text-zinc-600 flex justify-center flex-wrap gap-x-3 mt-1.5">
            {contactSubParts.map((item, idx) => (
              <span key={idx} className="break-words">{item}</span>
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            {renderHeader('Career Objective', 'serif')}
            <p className="text-zinc-800 text-justify leading-relaxed">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('CA / ACCA Examination Track', 'serif')}
            {renderQualifications('table')}
          </div>
          <div>
            {renderHeader('Articleship & Work Experience', 'serif')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Academic Education', 'serif')}
            {renderEducation()}
          </div>
          <div>
            {renderHeader('Core Technical Standards', 'serif')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-02 Modern Two Column & T-03 Left Sidebar Dark & T-25 High Contrast & T-31 Asymmetric Split
  // =========================================================================
  if (['T-02', 'T-03', 'T-25', 'T-31'].includes(templateId)) {
    const isDarkLeft = templateId === 'T-03' || templateId === 'T-25';
    const isAsymmetric = templateId === 'T-31';
    const sidebarWidthClass = isAsymmetric ? 'w-[28%]' : 'w-[34%]';
    const mainWidthClass = isAsymmetric ? 'w-[72%]' : 'w-[66%]';

    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed min-h-[1050px] flex font-sans">
        {/* Left Column */}
        <div
          className={`${sidebarWidthClass} p-6 flex flex-col justify-between shrink-0 ${
            isDarkLeft ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 border-r border-slate-200 text-zinc-900'
          }`}
          style={!isDarkLeft ? { borderRightColor: pColor } : {}}
        >
          <div className="space-y-4">
            {/* Avatar & Name */}
            <div className="text-center pb-2">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-2.5 overflow-hidden border-2 shadow-sm"
                style={{ borderColor: pColor }}
              >
                <img
                  src={resume.avatarUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' rx='80' fill='%230f172a'/%3E%3Ccircle cx='80' cy='60' r='28' fill='%23e2e8f0'/%3E%3Cpath d='M30 138 c0 -28 22 -50 50 -50 s50 22 50 50' fill='%23e2e8f0'/%3E%3C/svg%3E"}
                  alt={fullName}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <h1 className="text-lg font-black uppercase tracking-tight">{fullName}</h1>
              <p
                className="text-[10px] font-bold uppercase tracking-wider mt-0.5"
                style={{ color: isDarkLeft ? '#93c5fd' : pColor }}
              >
                {personalInfo.jobTitle || 'CA Trainee'}
              </p>
              {resume.ftsBatch && (
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-mono bg-blue-500/20 text-blue-300 font-bold">
                  FTS Batch {resume.ftsBatch}
                </span>
              )}
            </div>

            {/* Contact Details */}
            <div className="space-y-1.5 text-[9.5px] border-t border-b py-2.5 border-current/20">
              <div className="font-bold uppercase tracking-wider text-[10px] mb-1 opacity-80">
                Contact Details
              </div>
              {contactSubParts.map((item, idx) => (
                <div key={idx} className="break-words leading-tight">{item}</div>
              ))}
              {resume.crn && <div>CRN: {resume.crn}</div>}
            </div>

            {/* Core Competencies & Software */}
            <div>
              <div
                className="font-bold uppercase tracking-wider text-[10px] mb-1.5 border-b pb-0.5"
                style={{ borderColor: pColor }}
              >
                Accounting & ERP Tools
              </div>
              <div className="flex flex-wrap gap-1">
                {software?.map((s, i) => (
                  <span
                    key={i}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                      isDarkLeft ? 'bg-slate-800 text-slate-200' : 'bg-white border border-slate-300 text-zinc-800'
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Standards */}
            <div>
              <div
                className="font-bold uppercase tracking-wider text-[10px] mb-1.5 border-b pb-0.5"
                style={{ borderColor: pColor }}
              >
                Standards & Frameworks
              </div>
              <ul className="list-disc pl-3.5 space-y-0.5 text-[9px] opacity-90">
                {standards?.map((std, i) => (
                  <li key={i}>{std}</li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div>
              <div className="font-bold uppercase tracking-wider text-[10px] mb-1 opacity-80">Languages</div>
              <div className="text-[9.5px]">
                {languages?.map(l => `${l.language} (${l.proficiency})`).join(', ') || 'English, Urdu'}
              </div>
            </div>
          </div>

          {/* Reference bottom tag */}
          <div className="pt-2 border-t border-current/20 text-[9px] opacity-80">
            <strong>Mentor Reference:</strong>
            <div>{resume.references?.[0]?.name || 'Available on request'}</div>
          </div>
        </div>

        {/* Right Main Body */}
        <div className={`${mainWidthClass} p-7 space-y-3.5 flex flex-col justify-between`}>
          <div className="space-y-3.5">
            {/* Header Objective */}
            <div>
              {renderHeader('Career Objective', 'bar')}
              <p className="text-zinc-800 leading-relaxed text-justify">{objectiveText}</p>
            </div>

            {/* Qualifications / Examinations */}
            <div>
              {renderHeader('CA / ACCA Examination Track & Results', 'bar')}
              {renderQualifications('badges')}
            </div>

            {/* Articleship & Professional Experience */}
            <div>
              {renderHeader('Articleship & Professional Engagements', 'bar')}
              {renderExperienceList()}
            </div>

            {/* Academic Background */}
            <div>
              {renderHeader('Academic Education', 'bar')}
              {renderEducation()}
            </div>

            {/* Certifications & Training */}
            <div>
              {renderHeader('Certifications & Technical Training', 'bar')}
              <div className="grid grid-cols-2 gap-2 text-[9.5px]">
                {certifications?.map(c => (
                  <div key={c.id} className="p-1.5 rounded bg-zinc-50 border border-zinc-200">
                    <strong>{c.name}</strong>
                    <div className="text-zinc-500">{c.issuer}</div>
                  </div>
                ))}
                {resume.courses?.map(c => (
                  <div key={c.id} className="p-1.5 rounded bg-zinc-50 border border-zinc-200">
                    <strong>{c.name}</strong>
                    <div className="text-zinc-500">{c.institute}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Activities row */}
          <div className="pt-2 border-t border-zinc-200 text-[10px] text-zinc-600 flex justify-between items-center">
            <span>Extra-Curricular: {resume.activities || 'Debates, Sports, Financial Modeling Club'}</span>
            <span className="font-mono text-[9px] text-zinc-400">Template: {templateId}</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 4: T-04 Right Sidebar
  // =========================================================================
  if (templateId === 'T-04') {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed min-h-[1050px] flex font-sans">
        {/* Left Main (66%) */}
        <div className="w-[66%] p-7 space-y-3.5 border-r border-zinc-200">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight" style={{ color: pColor }}>
              {fullName}
            </h1>
            <p className="text-xs font-bold text-zinc-700 uppercase tracking-wider mt-0.5">
              {contactParts.join('  •  ')}
            </p>
          </div>

          <div>
            {renderHeader('Executive Objective', 'boxed')}
            <p className="text-zinc-800 text-justify leading-relaxed">{objectiveText}</p>
          </div>

          <div>
            {renderHeader('CA / ACCA Examination Track', 'boxed')}
            {renderQualifications('table')}
          </div>

          <div>
            {renderHeader('Articleship & Audit Engagements', 'boxed')}
            {renderExperienceList()}
          </div>

          <div>
            {renderHeader('Academic Education', 'boxed')}
            {renderEducation()}
          </div>

          {renderBottomGrid()}
        </div>

        {/* Right Sidebar (34%) */}
        <div className="w-[34%] bg-slate-50 p-6 space-y-4">
          <div className="space-y-1 text-[10px]">
            <h3 className="font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1">
              Contact Details
            </h3>
            {contactSubParts.map((item, idx) => (
              <div key={idx} className="break-words text-zinc-700">{item}</div>
            ))}
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-1.5">
              Accounting Tools
            </h3>
            <div className="flex flex-wrap gap-1">
              {software?.map((s, i) => (
                <span key={i} className="px-2 py-0.5 rounded text-[9px] bg-white border border-zinc-200 text-zinc-800 font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-1.5">
              Frameworks & Standards
            </h3>
            <ul className="list-disc pl-4 space-y-0.5 text-zinc-700 text-[9.5px]">
              {standards?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-1">
              Core Competencies
            </h3>
            <div className="space-y-1 text-zinc-700 text-[10px]">
              {coreCompetencies?.map((c, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pColor }} />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-200 text-[9.5px] text-zinc-600">
            <strong>Mentor Reference:</strong>
            <div>{resume.references?.[0]?.name || 'Available on request'}</div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-05 Minimal ATS & T-35 Simple ATS Classic & T-21 Minimalist Clean
  // =========================================================================
  if (['T-05', 'T-21', 'T-35'].includes(templateId)) {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-sans">
        <div className="text-center pb-2 mb-3 border-b border-zinc-400">
          <h1 className="text-2xl font-bold uppercase tracking-wider text-zinc-950">{fullName}</h1>
          <p className="text-[11px] text-zinc-700 uppercase tracking-wide mt-0.5">
            {contactParts.join(' | ')}
          </p>
          <div className="text-[10px] text-zinc-600 flex justify-center flex-wrap gap-x-2 mt-1">
            {contactSubParts.map((item, idx) => (
              <span key={idx} className="break-words">{item} {idx < contactSubParts.length - 1 ? '•' : ''}</span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1">
              Professional Objective
            </h2>
            <p className="text-zinc-800 text-justify leading-relaxed">{objectiveText}</p>
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1">
              Examination Matrix & Credentials
            </h2>
            {renderQualifications('standard')}
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1">
              Articleship & Practical Experience
            </h2>
            {renderExperienceList(false)}
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1">
              Academic Background
            </h2>
            {renderEducation()}
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1">
              Technical Standards & Tools
            </h2>
            <p className="text-zinc-700">{allSkills.join('  •  ')}</p>
          </div>

          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-06 Modern ATS & T-43 American Standard ATS
  // =========================================================================
  if (['T-06', 'T-43'].includes(templateId)) {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-sans">
        <div className="pb-3 mb-4 border-b-2" style={{ borderColor: pColor }}>
          <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
          <div className="text-[11px] font-bold uppercase tracking-wide mt-0.5" style={{ color: pColor }}>
            {contactParts.join('  |  ')}
          </div>
          <div className="text-[10px] text-zinc-600 flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
            {contactSubParts.map((item, idx) => (
              <span key={idx} className="break-words font-mono text-[9.5px]">{item}</span>
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            {renderHeader('Career Objective', 'accent')}
            <p className="text-zinc-800 text-justify leading-relaxed">{objectiveText}</p>
          </div>

          <div>
            {renderHeader('CA / ACCA Examination Track', 'accent')}
            {renderQualifications('standard')}
          </div>

          <div>
            {renderHeader('Articleship & Audit Engagements', 'accent')}
            {renderExperienceList()}
          </div>

          <div>
            {renderHeader('Academic Education', 'accent')}
            {renderEducation()}
          </div>

          <div>
            {renderHeader('Competencies & Software', 'accent')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>

          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-07 Executive & T-08 Finance Executive & T-39 CFO & Director
  // =========================================================================
  if (['T-07', 'T-08', 'T-39'].includes(templateId)) {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-serif">
        <div className="text-center pb-4 mb-4 border-b-2 border-zinc-900">
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-zinc-500">
            Executive Financial Profile
          </span>
          <h1 className="text-3xl font-black uppercase tracking-wider text-zinc-950 mt-1">{fullName}</h1>
          <div className="text-xs font-sans font-semibold text-zinc-700 mt-1">
            {contactParts.join('  •  ')}
          </div>
          <div className="text-[10px] font-sans text-zinc-600 flex justify-center flex-wrap gap-x-3 mt-1.5">
            {contactSubParts.map((item, idx) => (
              <span key={idx} className="break-words">{item}</span>
            ))}
          </div>
        </div>

        {/* KPI Summary Stat Cards */}
        <div className="grid grid-cols-4 gap-2 text-center font-sans mb-4">
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <span className="text-[9px] uppercase font-bold text-zinc-500 block">Exams Passed</span>
            <span className="text-sm font-black text-zinc-900">100% Track</span>
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <span className="text-[9px] uppercase font-bold text-zinc-500 block">FTS Batch</span>
            <span className="text-sm font-black" style={{ color: pColor }}>{resume.ftsBatch || '49'}</span>
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <span className="text-[9px] uppercase font-bold text-zinc-500 block">Standards</span>
            <span className="text-sm font-black text-zinc-900">IFRS / ISA</span>
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <span className="text-[9px] uppercase font-bold text-zinc-500 block">Articleship</span>
            <span className="text-sm font-black text-emerald-700">Audit Ready</span>
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            {renderHeader('Executive Career Summary', 'serif')}
            <p className="text-zinc-800 text-justify leading-relaxed italic">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('Professional Qualifications & Papers Cleared', 'serif')}
            {renderQualifications('table')}
          </div>
          <div>
            {renderHeader('Articleship & Audit Experience', 'serif')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Academic Education', 'serif')}
            {renderEducation()}
          </div>
          <div>
            {renderHeader('Technical Competencies & Standards', 'serif')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-09 Accounting Professional & T-10 Audit & T-11 Tax & T-38 Forensic
  // =========================================================================
  if (['T-09', 'T-10', 'T-11', 'T-38'].includes(templateId)) {
    const isAudit = templateId === 'T-10' || templateId === 'T-38';
    const isTax = templateId === 'T-11';

    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-sans">
        {/* Distinctive Accounting Banner Masthead */}
        <div className="p-4 rounded-xl text-white mb-4 shadow-sm" style={{ backgroundColor: pColor }}>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-blue-200">
                {isAudit ? 'Audit & Assurance Specialization' : isTax ? 'Direct & Indirect Tax Specialization' : 'Chartered Accountancy Track'}
              </span>
              <h1 className="text-2xl font-black uppercase tracking-tight">{fullName}</h1>
              <p className="text-xs font-medium text-slate-200">{contactParts.join('  •  ')}</p>
            </div>
            <div className="text-right text-[10px] text-slate-200 font-mono">
              <div>CRN: {resume.crn || 'CRN-88492'}</div>
              <div>FTS: Batch {resume.ftsBatch || '49'}</div>
              <div className="text-emerald-300 font-bold">QCR Audit Firm Track</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-zinc-600 mb-3 pb-2 border-b border-zinc-200">
          {contactSubParts.map((item, idx) => (
            <span key={idx} className="break-words">{item}</span>
          ))}
        </div>

        <div className="space-y-3.5">
          <div>
            {renderHeader('Career Objective & Articleship Induction', 'bar')}
            <p className="text-zinc-800 text-justify leading-relaxed">{objectiveText}</p>
          </div>

          <div>
            {renderHeader('CA / ACCA Examination Track Record', 'bar')}
            {renderQualifications('table')}
          </div>

          <div>
            {renderHeader('Practical Articleship & Client Engagements', 'bar')}
            {renderExperienceList()}
          </div>

          <div>
            {renderHeader('Academic Background', 'bar')}
            {renderEducation()}
          </div>

          <div>
            {renderHeader('Technical Competencies (IFRS, ISA & ERP)', 'bar')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>

          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-12 Big Four Style & T-13 Consulting & T-15 Investment Banking
  // =========================================================================
  if (['T-12', 'T-13', 'T-15'].includes(templateId)) {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-sans">
        {/* Crisp Consulting Masthead */}
        <div className="border-b-2 border-zinc-900 pb-2 mb-3 flex justify-between items-baseline">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
            <p className="text-xs font-semibold text-zinc-700">{contactParts.join('  |  ')}</p>
          </div>
          <div className="text-right text-[10px] text-zinc-600">
            {contactSubParts.map((item, idx) => (
              <div key={idx} className="break-words">{item}</div>
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1.5">
              Engagement Objective & Scope
            </h2>
            <p className="text-zinc-800 leading-relaxed text-justify">{objectiveText}</p>
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1.5">
              Examination Credentials & Professional Stages
            </h2>
            {renderQualifications('table')}
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1.5">
              Articleship & Advisory Engagements
            </h2>
            {renderExperienceList()}
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1.5">
              Academic Background
            </h2>
            {renderEducation()}
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1.5">
              Financial Standards & Technical Stack
            </h2>
            <p className="text-[9.5px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>

          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-14 Corporate Banking & T-37 Treasury & Capital
  // =========================================================================
  if (['T-14', 'T-37'].includes(templateId)) {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-sans">
        <div className="border-b-4 pb-3 mb-4" style={{ borderColor: pColor }}>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-blue-700">Corporate Banking & Treasury Advisory</span>
              <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
              <p className="text-xs font-semibold text-zinc-700">{contactParts.join('  •  ')}</p>
            </div>
            <div className="text-right text-[10px] text-zinc-600">
              {contactSubParts.map((item, idx) => (
                <div key={idx} className="break-words">{item}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            {renderHeader('Career Objective', 'accent')}
            <p className="text-zinc-800 text-justify leading-relaxed">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('Financial Credentials & Examinations', 'accent')}
            {renderQualifications('table')}
          </div>
          <div>
            {renderHeader('Practical Experience & Articleship', 'accent')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Academic Background', 'accent')}
            {renderEducation()}
          </div>
          <div>
            {renderHeader('Core Financial Competencies', 'accent')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-16 Equity Research & T-23 Technical Finance & T-36 Financial Analytics
  // =========================================================================
  if (['T-16', 'T-23', 'T-36'].includes(templateId)) {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-sans">
        <div className="border-b-2 border-purple-900 pb-3 mb-3 flex justify-between items-baseline">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-700">
              Quantitative Audit & Financial Analytics
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
            <p className="text-xs font-semibold text-zinc-700">{contactParts.join('  •  ')}</p>
          </div>
          <div className="text-right text-[10px] text-zinc-600">
            {contactSubParts.map((c, i) => (
              <div key={i} className="break-words">{c}</div>
            ))}
          </div>
        </div>

        {/* Analytics Software Badges */}
        <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-200 mb-3">
          <span className="text-[9.5px] font-bold uppercase text-purple-900 block mb-1">
            Data Stack & Financial Analytics:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {['Power BI', 'Advanced Excel (Power Query, DAX)', 'Python for Audit', 'QuickBooks ERP', 'SQL Fundamentals'].map((tool, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-[9px] font-mono bg-white border border-purple-300 text-purple-900 font-semibold">
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            {renderHeader('Career Objective', 'tag')}
            <p className="text-zinc-800 leading-relaxed text-justify">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('Examination Record', 'tag')}
            {renderQualifications('standard')}
          </div>
          <div>
            {renderHeader('Practical Experience', 'tag')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Education', 'tag')}
            {renderEducation()}
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-17 ICAP Articleship Standard & T-18 ACCA Practical & T-19 CIMA & T-20 CPA
  // =========================================================================
  if (['T-17', 'T-18', 'T-19', 'T-20'].includes(templateId)) {
    const isAcca = templateId === 'T-18';
    const isCpa = templateId === 'T-20';
    const headerTitle = isAcca
      ? 'ACCA (UK) Practical Experience Requirement (PER) Format'
      : isCpa
      ? 'CPA / US GAAP Certified Accounting Format'
      : 'Official ICAP Articleship Induction Curriculum Vitae';

    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-sans">
        <div className="border border-zinc-900 p-3 mb-3 bg-zinc-50 flex justify-between items-center">
          <div>
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-zinc-700 block">
              {headerTitle}
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
            <p className="text-xs font-semibold text-zinc-800">{contactParts.join('  |  ')}</p>
          </div>
          <div className="text-right text-[10px] font-mono">
            <div>CRN: {resume.crn || 'CRN-88492'}</div>
            <div>FTS: Batch {resume.ftsBatch || '49'}</div>
            <div className="text-emerald-700 font-bold">1st Attempt Pass Record</div>
          </div>
        </div>

        <div className="text-[10px] text-zinc-600 flex flex-wrap gap-x-3 gap-y-0.5 mb-3">
          {contactSubParts.map((item, idx) => (
            <span key={idx} className="break-words">{item}</span>
          ))}
        </div>

        <div className="space-y-3.5">
          <div>
            {renderHeader('Career Objective', 'bar')}
            <p className="text-zinc-800 text-justify leading-relaxed">{objectiveText}</p>
          </div>

          <div>
            {renderHeader('Examination Track & Papers Cleared', 'bar')}
            {renderQualifications('table')}
          </div>

          <div>
            {renderHeader('Articleship & Work Experience', 'bar')}
            {renderExperienceList()}
          </div>

          <div>
            {renderHeader('Academic Education', 'bar')}
            {renderEducation()}
          </div>

          <div>
            {renderHeader('Technical Competencies & Standards', 'bar')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>

          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-22 Compact One Page & T-24 Risk & Controls & T-34 Dense Articleship Log
  // =========================================================================
  if (['T-22', 'T-24', 'T-34'].includes(templateId)) {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10px] leading-tight p-6 sm:p-7 min-h-[1050px] font-sans">
        <div className="border-b-2 border-zinc-900 pb-2 mb-2 flex justify-between items-baseline">
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
            <p className="text-[11px] font-bold text-zinc-700">{contactParts.join('  •  ')}</p>
          </div>
          <div className="text-right text-[9.5px] text-zinc-600">
            {contactSubParts.map((item, idx) => (
              <span key={idx} className="inline-block break-words ml-2">{item}</span>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <div>
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1">
              Career Objective
            </h2>
            <p className="text-zinc-800 leading-snug">{objectiveText}</p>
          </div>

          <div>
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1">
              CA / ACCA Examination Track
            </h2>
            {renderQualifications('table')}
          </div>

          <div>
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1">
              Articleship & Practical Experience
            </h2>
            {renderExperienceList()}
          </div>

          <div>
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1">
              Education
            </h2>
            {renderEducation()}
          </div>

          <div>
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-0.5 mb-1">
              Technical Standards & Tools
            </h2>
            <p className="text-[9.5px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>

          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-26 Header Banner Modern
  // =========================================================================
  if (templateId === 'T-26') {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed min-h-[1050px] font-sans">
        <div className="p-8 text-white shadow-md" style={{ backgroundColor: pColor }}>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-200">
                Chartered Accountant Articleship Candidate
              </span>
              <h1 className="text-3xl font-black uppercase tracking-tight text-white mt-1">{fullName}</h1>
              <p className="text-xs font-semibold text-slate-200 mt-0.5">{contactParts.join('  •  ')}</p>
            </div>
            <div className="text-right text-[10.5px] text-slate-200 font-mono">
              <div>CRN: {resume.crn || 'CRN-88492'}</div>
              <div>FTS: Batch {resume.ftsBatch || '49'}</div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-white/20 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-200">
            {contactSubParts.map((item, idx) => (
              <span key={idx} className="break-words">{item}</span>
            ))}
          </div>
        </div>

        <div className="p-8 space-y-3.5">
          <div>
            {renderHeader('Career Objective', 'boxed')}
            <p className="text-zinc-800 text-justify leading-relaxed">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('CA / ACCA Examination Track', 'boxed')}
            {renderQualifications('table')}
          </div>
          <div>
            {renderHeader('Articleship Experience', 'boxed')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Education', 'boxed')}
            {renderEducation()}
          </div>
          <div>
            {renderHeader('Technical Standards', 'boxed')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-27 Timeline Progression
  // =========================================================================
  if (templateId === 'T-27') {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-sans">
        <div className="text-center pb-3 mb-4 border-b-2" style={{ borderColor: pColor }}>
          <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-700 mt-0.5">{contactParts.join('  •  ')}</p>
          <div className="text-[10px] text-zinc-600 flex justify-center flex-wrap gap-x-3 mt-1.5">
            {contactSubParts.map((item, idx) => (
              <span key={idx} className="break-words">{item}</span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            {renderHeader('Career Progression Objective', 'tag')}
            <p className="text-zinc-800 leading-relaxed text-justify">{objectiveText}</p>
          </div>

          <div>
            {renderHeader('Timeline Milestones: Examinations Cleared', 'tag')}
            <div className="border-l-2 pl-4 space-y-3 ml-2" style={{ borderColor: pColor }}>
              {qualifications.map(q => (
                <div key={q.id} className="relative">
                  <span className="w-2.5 h-2.5 rounded-full absolute -left-[21px] top-1" style={{ backgroundColor: pColor }} />
                  <div className="font-bold text-zinc-900">{q.course} ({q.body})</div>
                  <div className="text-[10px] text-zinc-600 font-mono">{q.attempt || '1st Attempt'} • {q.marks || 'Qualified'}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {renderHeader('Articleship Milestones', 'tag')}
            <div className="border-l-2 pl-4 space-y-3 ml-2" style={{ borderColor: pColor }}>
              {renderExperienceList()}
            </div>
          </div>

          <div>
            {renderHeader('Academic Education', 'tag')}
            {renderEducation()}
          </div>

          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-28 Elegant Serif & T-42 Bordered Classic
  // =========================================================================
  if (['T-28', 'T-42'].includes(templateId)) {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-serif border-4 border-double border-zinc-900">
        <div className="text-center pb-3 mb-3 border-b border-zinc-300">
          <h1 className="text-3xl font-extrabold uppercase tracking-widest text-zinc-950">{fullName}</h1>
          <p className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-700 mt-1">{contactParts.join('  •  ')}</p>
          <div className="text-[10px] font-sans text-zinc-600 flex justify-center flex-wrap gap-x-3 mt-1.5">
            {contactSubParts.map((item, idx) => (
              <span key={idx} className="break-words">{item}</span>
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            {renderHeader('Career Objective', 'serif')}
            <p className="text-zinc-800 text-justify leading-relaxed">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('Examination Track Record', 'serif')}
            {renderQualifications('table')}
          </div>
          <div>
            {renderHeader('Practical Experience', 'serif')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Education', 'serif')}
            {renderEducation()}
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-29 Clean Grid Two-Column & T-30 Executive Bordered
  // =========================================================================
  if (['T-29', 'T-30'].includes(templateId)) {
    return (
      <div className={`w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-sans ${templateId === 'T-30' ? 'border-2 border-zinc-800' : ''}`}>
        <div className="text-center pb-3 mb-4 border-b-2" style={{ borderColor: pColor }}>
          <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
          <div className="text-xs font-bold text-zinc-700 uppercase mt-0.5">{contactParts.join('  •  ')}</div>
          <div className="text-[10px] text-zinc-600 flex justify-center flex-wrap gap-x-3 mt-1.5">
            {contactSubParts.map((item, idx) => (
              <span key={idx} className="break-words">{item}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3.5">
            <div>
              {renderHeader('Objective', 'boxed')}
              <p className="text-zinc-800 text-justify leading-relaxed">{objectiveText}</p>
            </div>
            <div>
              {renderHeader('Examinations Passed', 'boxed')}
              {renderQualifications('table')}
            </div>
            <div>
              {renderHeader('Academic Education', 'boxed')}
              {renderEducation()}
            </div>
          </div>

          <div className="space-y-3.5">
            <div>
              {renderHeader('Articleship Experience', 'boxed')}
              {renderExperienceList()}
            </div>
            <div>
              {renderHeader('Technical Competencies', 'boxed')}
              <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
            </div>
            {renderBottomGrid()}
          </div>
        </div>
        {renderFooterRow()}
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-32 Monochrome Precision
  // =========================================================================
  if (templateId === 'T-32') {
    return (
      <div className="w-full bg-white text-black text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-mono">
        <div className="border-b-2 border-black pb-3 mb-3">
          <h1 className="text-2xl font-black uppercase tracking-wider">{fullName}</h1>
          <div className="text-xs font-bold uppercase mt-1">{contactParts.join(' // ')}</div>
          <div className="text-[10px] text-zinc-700 flex flex-wrap gap-x-3 mt-1">
            {contactSubParts.map((item, idx) => (
              <span key={idx} className="break-words">{item}</span>
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-black pb-0.5 mb-1.5">[ CAREER OBJECTIVE ]</h2>
            <p className="text-zinc-900 leading-relaxed text-justify">{objectiveText}</p>
          </div>
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-black pb-0.5 mb-1.5">[ EXAMINATION TRACK ]</h2>
            {renderQualifications('table')}
          </div>
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-black pb-0.5 mb-1.5">[ PRACTICAL EXPERIENCE ]</h2>
            {renderExperienceList(false)}
          </div>
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-widest border-b border-black pb-0.5 mb-1.5">[ ACADEMIC EDUCATION ]</h2>
            {renderEducation()}
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-33 Soft Pastel Accent & T-40 Junior Trainee & T-41 Semi-Senior
  // =========================================================================
  if (['T-33', 'T-40', 'T-41'].includes(templateId)) {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-sans">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">CA Articleship Trainee Induction</span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950 mt-0.5">{fullName}</h1>
            <p className="text-xs font-semibold text-zinc-700">{contactParts.join('  •  ')}</p>
          </div>
          <div className="text-right text-[10px] font-mono text-zinc-600">
            <div>CRN: {resume.crn || 'CRN-88492'}</div>
            <div>FTS: Batch {resume.ftsBatch || '49'}</div>
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            {renderHeader('Career Objective', 'tag')}
            <p className="text-zinc-800 text-justify leading-relaxed">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('Examinations Cleared', 'tag')}
            {renderQualifications('table')}
          </div>
          <div>
            {renderHeader('Articleship Experience', 'tag')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Academic Education', 'tag')}
            {renderEducation()}
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-44 European Europass Style
  // =========================================================================
  if (templateId === 'T-44') {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-sans">
        <div className="border-b-2 border-blue-900 pb-3 mb-4 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-800">EUROPASS CURRICULUM VITAE</span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
            <p className="text-xs font-semibold text-zinc-700">{contactParts.join('  •  ')}</p>
          </div>
          <div className="text-right text-[10px] text-zinc-600">
            {contactSubParts.map((item, idx) => (
              <div key={idx} className="break-words">{item}</div>
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            {renderHeader('Work Experience & Practical Training', 'bar')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Education & Training (CA / ACCA)', 'bar')}
            {renderQualifications('table')}
          </div>
          <div>
            {renderHeader('Academic Degrees', 'bar')}
            {renderEducation()}
          </div>
          <div>
            {renderHeader('Personal Skills & Competencies', 'bar')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-45 Middle East / Gulf Corporate & T-46 International Assurance
  // =========================================================================
  if (['T-45', 'T-46'].includes(templateId)) {
    return (
      <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-sans">
        <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white mb-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">
                {templateId === 'T-45' ? 'Middle East & Gulf Corporate Format' : 'International Cross-Border Assurance'}
              </span>
              <h1 className="text-2xl font-black uppercase tracking-tight mt-0.5">{fullName}</h1>
              <p className="text-xs font-medium text-slate-200">{contactParts.join('  •  ')}</p>
            </div>
            <div className="text-right text-[10px] text-slate-200 font-mono">
              <div>CRN: {resume.crn || 'CRN-88492'}</div>
              <div>FTS: Batch {resume.ftsBatch || '49'}</div>
              <div className="text-amber-300 font-semibold">IFRS & ISA Proficient</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-zinc-600 mb-3 pb-2 border-b border-zinc-200">
          {contactSubParts.map((item, idx) => (
            <span key={idx} className="break-words">{item}</span>
          ))}
        </div>

        <div className="space-y-3.5">
          <div>
            {renderHeader('Career Objective', 'accent')}
            <p className="text-zinc-800 text-justify leading-relaxed">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('Examination Track & Professional Qualifications', 'accent')}
            {renderQualifications('table')}
          </div>
          <div>
            {renderHeader('Articleship & Audit Engagements', 'accent')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Academic Education', 'accent')}
            {renderEducation()}
          </div>
          <div>
            {renderHeader('Core Technical Standards & Software', 'accent')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 47: T-47 Ultimate CA & ACCA ATS Pro (The Flagship Layout)
  // Default architecture for any unspecified ID
  // =========================================================================
  return (
    <div className="w-full max-w-[794px] mx-auto box-border bg-white text-zinc-950 text-[10.5px] leading-relaxed p-6 sm:p-8 min-h-[1050px] font-sans">
      {/* ATS Compliant Header */}
      <div className="text-center pb-3 mb-3 border-b-2 border-zinc-900">
        <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">
          {fullName}
        </h1>
        <div className="text-[11px] font-semibold text-zinc-800 uppercase tracking-wide mt-0.5">
          {contactParts.join('  |  ')}
        </div>
        <div className="text-[10px] text-zinc-600 flex justify-center flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
          {contactSubParts.map((item, idx) => (
            <span key={idx} className="inline-block break-words">{item}</span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {/* CAREER OBJECTIVE */}
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5 mb-1">
            Career Objective
          </h2>
          <p className="text-[10px] text-zinc-800 leading-relaxed text-justify">
            {objectiveText}
          </p>
        </div>

        {/* CA / ACCA EXAMINATION RECORD & PAPERS PASSED */}
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5 mb-1 flex justify-between">
            <span>CA / ACCA Examination Record & Papers Passed</span>
          </h2>
          {renderQualifications('standard')}
        </div>

        {/* ACADEMIC BACKGROUND */}
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5 mb-1">
            Academic Background
          </h2>
          {renderEducation()}
        </div>

        {/* TECHNICAL COMPETENCIES */}
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5 mb-1">
            Technical Competencies (IFRS, ISA, Advanced Excel)
          </h2>
          <p className="text-[10px] text-zinc-800 leading-normal">
            {allSkills.join('  •  ') ||
              'Financial Accounting & Reporting (IFRS / IAS) • Audit Sampling & Risk Assessment • Advanced MS Excel (VLOOKUP, Pivot Tables, XLOOKUP) • QuickBooks & ERP Familiarity • Strong Professional Skepticism & Attention to Detail • Effective Business Communication & Presentation • Time Management & Deadline Adherence'}
          </p>
        </div>

        {/* ARTICLESHIP & PRACTICAL EXPERIENCE */}
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5 mb-1">
            Articleship & Practical Experience
          </h2>
          {renderExperienceList()}
        </div>

        {/* CERTIFICATIONS & HONORS 2-COLUMN */}
        {renderBottomGrid()}

        {/* FOOTER BAR */}
        {renderFooterRow()}
      </div>
    </div>
  );
};
