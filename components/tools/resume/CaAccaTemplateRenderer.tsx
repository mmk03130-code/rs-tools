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
    regNumber: 'CRN-98421',
    email: 'mr.r.audit@example.com',
    phone: '+92 300 1234567',
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
          className="text-[11px] font-bold uppercase tracking-wider text-white px-2.5 py-0.5 rounded-sm mb-2 shadow-xs"
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
            className="w-2.5 h-2.5 rounded-full inline-block"
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
              <li>75% Merit Scholarship for Intermediate</li>
              <li>All AFC/PRC papers qualified in 1st attempt</li>
              <li>Merit Certificate in Financial Accounting</li>
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
  // TEMPLATE 1: T-01 Classic Corporate (Traditional Masthead with Dark Double Bars)
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
          <div className="text-[10px] font-sans text-zinc-600 flex justify-center flex-wrap gap-x-4 gap-y-1 mt-1.5">
            {contactSubParts.map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
          </div>
        </div>

        <div className="space-y-3 font-sans">
          <div>
            {renderHeader('Career Objective', 'serif')}
            <p className="text-[10px] text-zinc-800 text-justify leading-relaxed">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('Professional Qualifications (ICAP / ACCA)', 'serif')}
            {renderQualifications('table')}
          </div>
          <div>
            {renderHeader('Articleship & Audit Engagements', 'serif')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Academic Background', 'serif')}
            {renderEducation()}
          </div>
          <div>
            {renderHeader('Key Competencies & Technical Skills', 'serif')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-02, T-03, T-25, T-31 (Two-Column Sidebars)
  // =========================================================================
  if (['T-02', 'T-03', 'T-25', 'T-31'].includes(templateId)) {
    const isDarkLeft = templateId === 'T-03';
    const isCompact = templateId === 'T-25';
    const isAsymmetric = templateId === 'T-31';

    return (
      <div className="w-full bg-white text-zinc-900 text-[11px] leading-relaxed min-h-[1050px] font-sans grid grid-cols-12">
        {/* Left Sidebar */}
        <div
          className={`${
            isAsymmetric ? 'col-span-4' : 'col-span-4'
          } p-5 sm:p-6 space-y-4 text-[10px] ${
            isDarkLeft
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100/90 text-zinc-800 border-r border-slate-200'
          }`}
          style={!isDarkLeft ? { borderRightColor: pColor } : {}}
        >
          {/* Avatar if exists */}
          {resume.avatarUrl && (
            <div className="flex justify-center mb-2">
              <img
                src={resume.avatarUrl}
                alt={fullName}
                className="w-20 h-20 rounded-full border-2 border-white object-cover shadow-md"
              />
            </div>
          )}

          <div>
            <h1 className={`text-xl font-black uppercase tracking-tight ${isDarkLeft ? 'text-white' : 'text-zinc-950'}`}>
              {fullName}
            </h1>
            <p
              className={`text-[10.5px] font-bold uppercase tracking-wider mt-0.5 ${
                isDarkLeft ? 'text-emerald-400' : 'text-blue-700'
              }`}
            >
              {personalInfo.jobTitle || 'Articleship Trainee'}
            </p>
            {resume.ftsBatch && (
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9.5px] font-mono bg-white/20 font-bold">
                FTS - {resume.ftsBatch}
              </span>
            )}
          </div>

          <div>
            <h3 className={`font-bold uppercase tracking-wider mb-1.5 border-b pb-1 ${isDarkLeft ? 'text-emerald-400 border-white/20' : 'text-zinc-900 border-zinc-300'}`}>
              Contact
            </h3>
            <div className="space-y-1 text-[10px] break-words">
              {contactSubParts.map((c, i) => (
                <div key={i}>{c}</div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`font-bold uppercase tracking-wider mb-1.5 border-b pb-1 ${isDarkLeft ? 'text-emerald-400 border-white/20' : 'text-zinc-900 border-zinc-300'}`}>
              Core Competencies
            </h3>
            <div className="flex flex-wrap gap-1">
              {allSkills.slice(0, 10).map((skill, i) => (
                <span
                  key={i}
                  className={`px-2 py-0.5 rounded text-[9px] font-medium ${
                    isDarkLeft
                      ? 'bg-white/10 text-white'
                      : 'bg-white border border-zinc-300 text-zinc-800'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`font-bold uppercase tracking-wider mb-1.5 border-b pb-1 ${isDarkLeft ? 'text-emerald-400 border-white/20' : 'text-zinc-900 border-zinc-300'}`}>
              Languages
            </h3>
            <p>{languages?.map(l => l.language).join(', ') || 'English, Urdu, Punjabi'}</p>
          </div>

          {resume.references?.[0] && (
            <div>
              <h3 className={`font-bold uppercase tracking-wider mb-1.5 border-b pb-1 ${isDarkLeft ? 'text-emerald-400 border-white/20' : 'text-zinc-900 border-zinc-300'}`}>
                Reference
              </h3>
              <p className="font-semibold">{resume.references[0].name}</p>
              <p>{resume.references[0].role}</p>
            </div>
          )}
        </div>

        {/* Right Main Body */}
        <div className="col-span-8 p-6 sm:p-8 space-y-4 text-[10.5px]">
          <div>
            {renderHeader('Career Profile & Objective', 'boxed')}
            <p className="text-zinc-800 leading-relaxed text-justify">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('Professional Qualifications (ICAP / ACCA)', 'boxed')}
            {renderQualifications(isCompact ? 'badges' : 'standard')}
          </div>
          <div>
            {renderHeader('Articleship & Audit Engagements', 'boxed')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Academic Background', 'boxed')}
            {renderEducation()}
          </div>
          {renderBottomGrid()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 4: T-04 Right Sidebar
  // =========================================================================
  if (templateId === 'T-04') {
    return (
      <div className="w-full bg-white text-zinc-900 text-[11px] leading-relaxed min-h-[1050px] font-sans grid grid-cols-12">
        {/* Left Main Body */}
        <div className="col-span-8 p-6 sm:p-8 space-y-4 text-[10.5px]">
          <div className="border-b-2 pb-3 mb-2" style={{ borderColor: pColor }}>
            <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
            <p className="text-xs font-semibold text-zinc-700">{contactParts.join('  |  ')}</p>
          </div>

          <div>
            {renderHeader('Executive Profile', 'bar')}
            <p className="text-zinc-800 leading-relaxed text-justify">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('Qualifications Record', 'bar')}
            {renderQualifications('standard')}
          </div>
          <div>
            {renderHeader('Practical Articleship & Experience', 'bar')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Academic Background', 'bar')}
            {renderEducation()}
          </div>
          {renderBottomGrid()}
        </div>

        {/* Right Sidebar */}
        <div
          className="col-span-4 p-5 sm:p-6 space-y-4 text-[10px] bg-slate-50 border-l border-slate-200"
          style={{ borderLeftColor: pColor }}
        >
          {resume.avatarUrl && (
            <div className="flex justify-center mb-2">
              <img
                src={resume.avatarUrl}
                alt={fullName}
                className="w-20 h-20 rounded-full border-2 border-zinc-300 object-cover"
              />
            </div>
          )}

          <div>
            <h3 className="font-bold uppercase tracking-wider mb-1.5 text-zinc-900 border-b border-zinc-300 pb-1">
              Contact Matrix
            </h3>
            <div className="space-y-1 text-[10px] break-words">
              {contactSubParts.map((c, i) => (
                <div key={i}>{c}</div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider mb-1.5 text-zinc-900 border-b border-zinc-300 pb-1">
              Standards & Tools
            </h3>
            <div className="flex flex-wrap gap-1">
              {allSkills.map((s, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-white border border-zinc-300 text-zinc-800 text-[9px]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider mb-1.5 text-zinc-900 border-b border-zinc-300 pb-1">
              Languages
            </h3>
            <p>{languages?.map(l => l.language).join(', ') || 'English, Urdu'}</p>
          </div>

          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-05 Minimal ATS & T-35 Modern Minimal
  // =========================================================================
  if (['T-05', 'T-35'].includes(templateId)) {
    return (
      <div className="w-full bg-white text-zinc-900 text-[10.5px] leading-relaxed p-8 sm:p-12 min-h-[1050px] font-sans">
        <div className="text-center pb-4 mb-4">
          <h1 className="text-3xl font-light uppercase tracking-widest text-zinc-900">{fullName}</h1>
          <p className="text-xs font-medium text-zinc-600 tracking-wider mt-1">{contactParts.join('  •  ')}</p>
          <div className="text-[10px] text-zinc-500 flex justify-center flex-wrap gap-x-4 gap-y-0.5 mt-1">
            {contactSubParts.map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
          </div>
          <div className="w-16 h-0.5 bg-zinc-300 mx-auto mt-3" />
        </div>

        <div className="space-y-3.5">
          <div>
            {renderHeader('Career Objective', 'minimal')}
            <p className="text-zinc-700 leading-relaxed text-justify">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('Professional Qualifications', 'minimal')}
            {renderQualifications('standard')}
          </div>
          <div>
            {renderHeader('Practical Experience', 'minimal')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Education', 'minimal')}
            {renderEducation()}
          </div>
          <div>
            {renderHeader('Skills & Competencies', 'minimal')}
            <p className="text-zinc-700">{allSkills.join('  •  ')}</p>
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-07 Executive, T-08 Finance Executive, T-39 Senior Finance
  // =========================================================================
  if (['T-07', 'T-08', 'T-39'].includes(templateId)) {
    return (
      <div className="w-full bg-white text-zinc-900 text-[11px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-serif">
        <div className="text-center pb-4 mb-4 border-b-2" style={{ borderColor: pColor }}>
          <span className="text-[10px] font-sans uppercase font-bold tracking-widest" style={{ color: pColor }}>
            Executive Leadership & Assurance Profile
          </span>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-zinc-950 mt-1">{fullName}</h1>
          <div className="text-xs font-sans font-semibold tracking-wider uppercase mt-1 text-zinc-700">
            {contactParts.join('  •  ')}
          </div>
          <div className="text-[10px] font-sans text-zinc-600 flex justify-center flex-wrap gap-x-4 gap-y-1 mt-1.5">
            {contactSubParts.map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
          </div>
        </div>

        {/* Executive Callout Quote */}
        <div
          className="bg-zinc-50 border-l-4 p-3.5 mb-4 italic text-zinc-800 text-[10.5px] rounded-r shadow-2xs font-sans"
          style={{ borderColor: pColor }}
        >
          "{objectiveText}"
        </div>

        {/* KPI Mini-Cards if T-08 or T-39 */}
        {(templateId === 'T-08' || templateId === 'T-39') && (
          <div className="grid grid-cols-3 gap-3 mb-4 font-sans text-center">
            <div className="p-2 rounded bg-zinc-50 border border-zinc-200">
              <span className="text-xs font-bold text-zinc-900">CA Articleship</span>
              <p className="text-[9.5px] text-zinc-600">3.5-Yr Induction Ready</p>
            </div>
            <div className="p-2 rounded bg-zinc-50 border border-zinc-200">
              <span className="text-xs font-bold text-zinc-900">IFRS & ISA</span>
              <p className="text-[9.5px] text-zinc-600">Technical Rigor</p>
            </div>
            <div className="p-2 rounded bg-zinc-50 border border-zinc-200">
              <span className="text-xs font-bold text-zinc-900">Corporate Tax</span>
              <p className="text-[9.5px] text-zinc-600">ITO 2001 & Sales Tax</p>
            </div>
          </div>
        )}

        <div className="space-y-4 font-sans">
          <div>
            {renderHeader('Executive Credentials & Professional Qualifications', 'accent')}
            {renderQualifications('badges')}
          </div>
          <div>
            {renderHeader('Articleship & Assurance Engagements', 'accent')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Academic Background', 'accent')}
            {renderEducation()}
          </div>
          <div>
            {renderHeader('Regulatory Frameworks, Systems & Standards', 'accent')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-09 Accounting Professional, T-10 Audit Professional, T-11 Tax Professional
  // =========================================================================
  if (['T-09', 'T-10', 'T-11'].includes(templateId)) {
    const isAudit = templateId === 'T-10';
    const isTax = templateId === 'T-11';

    return (
      <div className="w-full bg-white text-zinc-900 text-[10.5px] leading-relaxed p-7 sm:p-9 min-h-[1050px] font-sans">
        {/* Top Professional Ribbon */}
        <div
          className="rounded-xl p-4 mb-4 text-white flex justify-between items-center shadow-sm"
          style={{ backgroundColor: pColor }}
        >
          <div>
            <span className="text-[9.5px] font-mono tracking-widest uppercase text-emerald-300 font-bold">
              {isTax ? 'TAXATION & CORPORATE COMPLIANCE' : isAudit ? 'STATUTORY AUDIT & ASSURANCE' : 'CHARTERED ACCOUNTING'}
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">{fullName}</h1>
            <p className="text-xs font-medium text-zinc-200 mt-0.5">{contactParts.join('  |  ')}</p>
          </div>
          <div className="text-right text-[10px] text-zinc-300">
            {contactSubParts.map((c, i) => (
              <div key={i}>{c}</div>
            ))}
          </div>
        </div>

        {/* Specialized Assertion / Domain Callout */}
        <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 mb-3 flex items-center justify-between text-[10px]">
          <span className="font-bold text-blue-900">
            {isTax
              ? 'Key Expertise: Direct & Indirect Tax, Withholding Audits, FBR IRIS Filings'
              : isAudit
              ? 'ISA Core Assertions: Completeness, Accuracy, Cut-off, Rights & Valuation'
              : 'Reporting Standard: IFRS, IAS, Companies Act 2017 & Financial Modeling'}
          </span>
          <span className="px-2 py-0.5 rounded font-mono font-bold bg-white text-blue-800 border border-blue-300">
            {resume.crn ? `CRN: ${resume.crn}` : 'ICAP Qualified'}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            {renderHeader('Career Objective', 'bar')}
            <p className="text-zinc-800 leading-relaxed text-justify">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('Examination Record & Papers Status', 'bar')}
            {renderQualifications('table')}
          </div>
          <div>
            {renderHeader('Practical Experience & Engagements', 'bar')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Academic Background', 'bar')}
            {renderEducation()}
          </div>
          <div>
            {renderHeader('Technical Competencies', 'bar')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-12 Big Four Style, T-13 Management Consulting, T-15 Investment Banking
  // =========================================================================
  if (['T-12', 'T-13', 'T-15'].includes(templateId)) {
    const isIB = templateId === 'T-15';
    return (
      <div className="w-full bg-white text-zinc-950 text-[10px] leading-normal p-6 sm:p-8 min-h-[1050px] font-sans">
        <div className="text-center pb-2.5 mb-3 border-b-2 border-zinc-900">
          <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
          <p className="text-[11px] font-bold text-zinc-800 uppercase tracking-wide mt-0.5">
            {contactParts.join('  |  ')}
          </p>
          <div className="text-[9.5px] text-zinc-600 flex justify-center flex-wrap gap-x-3 mt-1">
            {contactSubParts.map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <div>
            <h2 className="text-[10.5px] font-black uppercase tracking-wider text-zinc-950 border-b border-zinc-400 pb-0.5 mb-1">
              {isIB ? 'EXECUTIVE PROFILE & TRANSACTION CAPACITY' : 'EXECUTIVE SUMMARY & CAREER OBJECTIVE'}
            </h2>
            <p className="text-[9.5px] text-zinc-800 leading-relaxed text-justify">{objectiveText}</p>
          </div>

          <div>
            <h2 className="text-[10.5px] font-black uppercase tracking-wider text-zinc-950 border-b border-zinc-400 pb-0.5 mb-1">
              PROFESSIONAL CREDENTIALS & PAPERS PASSED
            </h2>
            {renderQualifications('standard')}
          </div>

          <div>
            <h2 className="text-[10.5px] font-black uppercase tracking-wider text-zinc-950 border-b border-zinc-400 pb-0.5 mb-1">
              {isIB ? 'FINANCIAL MODELING & AUDIT ENGAGEMENTS' : 'ARTICLESHIP & CLIENT ENGAGEMENTS'}
            </h2>
            {renderExperienceList(false)}
          </div>

          <div>
            <h2 className="text-[10.5px] font-black uppercase tracking-wider text-zinc-950 border-b border-zinc-400 pb-0.5 mb-1">
              ACADEMIC MERIT & EDUCATION
            </h2>
            {renderEducation()}
          </div>

          <div>
            <h2 className="text-[10.5px] font-black uppercase tracking-wider text-zinc-950 border-b border-zinc-400 pb-0.5 mb-1">
              SKILLS, FRAMEWORKS & SOFTWARE
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
  // TEMPLATES: T-16 Graduate, T-17 CA Student (ICAP), T-18 ACCA Student, T-19 Internship
  // =========================================================================
  if (['T-16', 'T-17', 'T-18', 'T-19'].includes(templateId)) {
    const isIcap = templateId === 'T-17';
    const isAcca = templateId === 'T-18';

    return (
      <div className="w-full bg-white text-zinc-900 text-[10.5px] leading-relaxed p-7 sm:p-9 min-h-[1050px] font-sans">
        {/* Top Badges Bar */}
        <div className="flex justify-between items-center border-b-2 pb-3 mb-3" style={{ borderColor: pColor }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-100 text-blue-900">
                {isIcap ? 'ICAP STUDENT' : isAcca ? 'ACCA STUDENT' : 'GRADUATE CANDIDATE'}
              </span>
              {resume.ftsBatch && (
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100 text-emerald-900">
                  FTS - {resume.ftsBatch}
                </span>
              )}
              {resume.crn && (
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-zinc-100 text-zinc-800 border">
                  CRN: {resume.crn}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
            <p className="text-xs font-semibold text-zinc-700">{contactParts.join('  •  ')}</p>
          </div>
          <div className="text-right text-[10px] text-zinc-600">
            {contactSubParts.map((c, i) => (
              <div key={i}>{c}</div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            {renderHeader('Career Objective (3.5-Yr Articleship Induction)', 'tag')}
            <p className="text-zinc-800 leading-relaxed text-justify">{objectiveText}</p>
          </div>

          {/* Education First if Fresh Graduate T-16 */}
          {templateId === 'T-16' && (
            <div>
              {renderHeader('Academic Honors & High School Merit', 'tag')}
              {renderEducation()}
            </div>
          )}

          <div>
            {renderHeader(isIcap ? 'ICAP PRC / CAF Papers Status' : isAcca ? 'ACCA Papers Status' : 'Qualifications', 'tag')}
            {renderQualifications('badges')}
          </div>

          <div>
            {renderHeader('Practical Experience & Articleship Intent', 'tag')}
            {renderExperienceList()}
          </div>

          {templateId !== 'T-16' && (
            <div>
              {renderHeader('Academic Background', 'tag')}
              {renderEducation()}
            </div>
          )}

          <div>
            {renderHeader('Core Competencies & Tools', 'tag')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>

          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 21: T-21 Timeline Architecture
  // =========================================================================
  if (templateId === 'T-21') {
    return (
      <div className="w-full bg-white text-zinc-900 text-[11px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-sans">
        <div className="border-b-2 pb-4 mb-4 flex justify-between items-baseline" style={{ borderColor: pColor }}>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
            <p className="text-xs font-semibold text-zinc-700">{contactParts.join('  •  ')}</p>
          </div>
          <div className="text-right text-[10px] text-zinc-600">
            {contactSubParts.map((c, i) => (
              <div key={i}>{c}</div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          {renderHeader('Career Path & Objective', 'line')}
          <p className="text-[10.5px] text-zinc-800 leading-relaxed">{objectiveText}</p>
        </div>

        {/* Timeline spine */}
        <div className="border-l-2 pl-4 ml-2 space-y-4 my-4" style={{ borderColor: pColor }}>
          <div className="relative">
            <div className="w-3 h-3 rounded-full absolute -left-[22px] top-1" style={{ backgroundColor: pColor }} />
            <h3 className="text-xs font-bold uppercase text-zinc-900">Milestone 1: Professional Qualifications</h3>
            {renderQualifications('standard')}
          </div>

          <div className="relative">
            <div className="w-3 h-3 rounded-full absolute -left-[22px] top-1" style={{ backgroundColor: pColor }} />
            <h3 className="text-xs font-bold uppercase text-zinc-900">Milestone 2: Articleship & Audit Engagements</h3>
            {renderExperienceList()}
          </div>

          <div className="relative">
            <div className="w-3 h-3 rounded-full absolute -left-[22px] top-1" style={{ backgroundColor: pColor }} />
            <h3 className="text-xs font-bold uppercase text-zinc-900">Milestone 3: Academic Foundations</h3>
            {renderEducation()}
          </div>
        </div>

        {renderBottomGrid()}
        {renderFooterRow()}
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-22 Split Header, T-27 Color Block, T-28 Top Band Banner
  // =========================================================================
  if (['T-22', 'T-27', 'T-28'].includes(templateId)) {
    return (
      <div className="w-full bg-white text-zinc-900 text-[10.5px] leading-relaxed p-6 sm:p-8 min-h-[1050px] font-sans">
        {/* Large Header Banner */}
        <div
          className="rounded-2xl p-6 mb-5 text-white flex flex-wrap justify-between items-center gap-4 shadow-md"
          style={{ backgroundColor: pColor }}
        >
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">
              CHARTERED ACCOUNTANCY & AUDIT ASSURANCE
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white mt-1">{fullName}</h1>
            <p className="text-xs font-semibold text-zinc-200 mt-0.5">{contactParts.join('  •  ')}</p>
            <div className="text-[10px] text-zinc-300 flex flex-wrap gap-x-3 gap-y-0.5 mt-2">
              {contactSubParts.map((part, i) => (
                <span key={i}>{part}</span>
              ))}
            </div>
          </div>
          {resume.avatarUrl && (
            <img
              src={resume.avatarUrl}
              alt={fullName}
              className="w-16 h-16 rounded-full border-2 border-white object-cover shadow-lg"
            />
          )}
        </div>

        <div className="space-y-3.5">
          <div>
            {renderHeader('Career Objective', 'tag')}
            <p className="text-zinc-800 leading-relaxed text-justify">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('Professional Qualifications (ICAP / ACCA)', 'tag')}
            {renderQualifications('badges')}
          </div>
          <div>
            {renderHeader('Practical Experience & Articleship', 'tag')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Academic Background', 'tag')}
            {renderEducation()}
          </div>
          <div>
            {renderHeader('Technical Competencies & Systems', 'tag')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATES: T-29 Card Based, T-30 Grid Matrix 2x2, T-32 Creative, T-42 Portfolio
  // =========================================================================
  if (['T-29', 'T-30', 'T-32', 'T-42'].includes(templateId)) {
    return (
      <div className="w-full bg-white text-zinc-900 text-[10.5px] leading-relaxed p-6 sm:p-8 min-h-[1050px] font-sans">
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
              Professional Finance & Audit Portfolio
            </span>
            <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
            <p className="text-xs text-zinc-600 mt-0.5">{contactParts.join('  |  ')}</p>
          </div>
          <div className="text-right text-[10px] text-zinc-500">
            {contactSubParts.map((c, i) => (
              <div key={i}>{c}</div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 mb-3">
          <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-zinc-900 mb-0.5">Career Objective</h2>
          <p className="text-[10px] text-zinc-700 leading-relaxed">{objectiveText}</p>
        </div>

        {/* 2x2 Card Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 rounded-xl border border-zinc-200 bg-white shadow-2xs">
            <h3 className="text-[10.5px] font-bold uppercase text-zinc-900 border-b pb-1 mb-2" style={{ color: pColor }}>
              Qualifications Record
            </h3>
            {renderQualifications('standard')}
          </div>

          <div className="p-3 rounded-xl border border-zinc-200 bg-white shadow-2xs">
            <h3 className="text-[10.5px] font-bold uppercase text-zinc-900 border-b pb-1 mb-2" style={{ color: pColor }}>
              Academic Background
            </h3>
            {renderEducation()}
          </div>

          <div className="p-3 rounded-xl border border-zinc-200 bg-white shadow-2xs col-span-2">
            <h3 className="text-[10.5px] font-bold uppercase text-zinc-900 border-b pb-1 mb-2" style={{ color: pColor }}>
              Articleship & Practical Experience
            </h3>
            {renderExperienceList()}
          </div>
        </div>

        {renderBottomGrid()}
        {renderFooterRow()}
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 26: T-26 Premium Swiss Monochrome (Pure Black & White)
  // =========================================================================
  if (templateId === 'T-26') {
    return (
      <div className="w-full bg-white text-black text-[10.5px] leading-relaxed p-8 sm:p-10 min-h-[1050px] font-sans">
        <div className="border-b-4 border-black pb-3 mb-4 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-black">{fullName}</h1>
            <p className="text-xs font-bold uppercase tracking-wider mt-0.5">{contactParts.join('  •  ')}</p>
          </div>
          <div className="text-right text-[10px] text-zinc-800">
            {contactSubParts.map((c, i) => (
              <div key={i}>{c}</div>
            ))}
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-wider text-black border-b-2 border-black pb-0.5 mb-1.5">
              CAREER OBJECTIVE
            </h2>
            <p className="text-zinc-900 leading-relaxed text-justify">{objectiveText}</p>
          </div>
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-wider text-black border-b-2 border-black pb-0.5 mb-1.5">
              PROFESSIONAL QUALIFICATIONS
            </h2>
            {renderQualifications('standard')}
          </div>
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-wider text-black border-b-2 border-black pb-0.5 mb-1.5">
              PRACTICAL EXPERIENCE & ARTICLESHIP
            </h2>
            {renderExperienceList()}
          </div>
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-wider text-black border-b-2 border-black pb-0.5 mb-1.5">
              ACADEMIC BACKGROUND
            </h2>
            {renderEducation()}
          </div>
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-wider text-black border-b-2 border-black pb-0.5 mb-1.5">
              COMPETENCIES
            </h2>
            <p>{allSkills.join('  •  ')}</p>
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 34: T-34 European Europass Style
  // =========================================================================
  if (templateId === 'T-34') {
    return (
      <div className="w-full bg-white text-zinc-900 text-[10.5px] leading-relaxed p-7 sm:p-9 min-h-[1050px] font-sans">
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 mb-4 flex justify-between items-center">
          <div>
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-blue-700">Curriculum Vitae</span>
            <h1 className="text-2xl font-black uppercase text-zinc-950 mt-0.5">{fullName}</h1>
            <p className="text-xs text-zinc-700 font-semibold">{contactParts.join('  |  ')}</p>
          </div>
          <div className="text-right text-[10px] text-zinc-600">
            {contactSubParts.map((c, i) => (
              <div key={i}>{c}</div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            {renderHeader('Personal Statement', 'boxed')}
            <p className="text-zinc-800 text-justify leading-relaxed">{objectiveText}</p>
          </div>
          <div>
            {renderHeader('Education & Training (ICAP / ACCA)', 'boxed')}
            {renderQualifications('standard')}
          </div>
          <div>
            {renderHeader('Work Experience & Articleship', 'boxed')}
            {renderExperienceList()}
          </div>
          <div>
            {renderHeader('Formal Academic Background', 'boxed')}
            {renderEducation()}
          </div>
          <div>
            {renderHeader('Personal Skills & Competencies (CEFR Standards)', 'boxed')}
            <p className="text-[10px] text-zinc-800">{allSkills.join('  •  ')}</p>
          </div>
          {renderBottomGrid()}
          {renderFooterRow()}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 36: T-36 Data & Financial Analytics
  // =========================================================================
  if (templateId === 'T-36') {
    return (
      <div className="w-full bg-white text-zinc-900 text-[10.5px] leading-relaxed p-7 sm:p-9 min-h-[1050px] font-sans">
        <div className="border-b-2 pb-3 mb-3" style={{ borderColor: pColor }}>
          <div className="flex justify-between items-baseline">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-700">
                Data-Driven Audit & Financial Analytics
              </span>
              <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-950">{fullName}</h1>
              <p className="text-xs font-semibold text-zinc-700">{contactParts.join('  •  ')}</p>
            </div>
            <div className="text-right text-[10px] text-zinc-600">
              {contactSubParts.map((c, i) => (
                <div key={i}>{c}</div>
              ))}
            </div>
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
  // TEMPLATES: T-43 American Standard, T-44 ATS Advanced, T-45 ATS Executive, T-46 ATS Finance, T-47 ATS CA/ACCA
  // AND DEFAULT ATS ARCHITECTURE
  // =========================================================================
  return (
    <div className="w-full bg-white text-zinc-950 text-[10.5px] leading-relaxed p-7 sm:p-9 min-h-[1050px] font-sans">
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
            <span key={idx}>{item}</span>
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
