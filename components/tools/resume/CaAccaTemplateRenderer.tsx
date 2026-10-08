import React from 'react';
import { FinanceResumeData } from '../../../types/tools';
import {
  Mail, Phone, MapPin, Globe,
  Calendar, Award, ExternalLink, Briefcase, GraduationCap, CheckCircle2, ShieldCheck, FileCheck
} from 'lucide-react';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

interface CaAccaTemplateRendererProps {
  resume: FinanceResumeData;
  currentTheme: {
    primary: string;
    secondary: string;
    accent: string;
    bgHeader?: string;
    textHeader?: string;
  };
}

export const CaAccaTemplateRenderer: React.FC<CaAccaTemplateRendererProps> = ({
  resume,
  currentTheme,
}) => {
  const {
    personalInfo,
    qualifications,
    articleship,
    experiences,
    education,
    standards,
    software,
    coreCompetencies,
    certifications,
    languages,
    styling,
  } = resume;

  // Font family class mapper
  const getFontFamily = () => {
    switch (styling.fontFamily) {
      case 'serif':
        return 'font-serif';
      case 'mono':
        return 'font-mono';
      case 'sans':
      default:
        return 'font-sans';
    }
  };

  // Spacing class mapper
  const getSpacingClass = () => {
    switch (styling.spacing) {
      case 'compact':
        return 'space-y-3';
      case 'spacious':
        return 'space-y-6';
      case 'standard':
      default:
        return 'space-y-4';
    }
  };

  const getFontSizeClass = () => {
    switch (styling.fontSize) {
      case 'sm':
        return 'text-xs';
      case 'lg':
        return 'text-sm';
      case 'base':
      default:
        return 'text-[13px]';
    }
  };

  // Helper for rendering contact details
  const renderContactItem = (icon: React.ReactNode, text: string, href?: string) => {
    if (!text) return null;
    return (
      <span className="inline-flex items-center gap-1.5 text-slate-700">
        <span className="text-slate-500">{icon}</span>
        {href ? (
          <a
            href={href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') ? href : `https://${href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-inherit"
          >
            {text}
          </a>
        ) : (
          <span>{text}</span>
        )}
      </span>
    );
  };

  // Helper: Examination Attempt & Qualifications Table
  const renderQualificationsTable = (themeColor: string) => {
    if (!qualifications || qualifications.length === 0) return null;
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-slate-300 text-[12px]">
          <thead>
            <tr className="bg-slate-100 text-slate-800 font-semibold" style={{ borderBottom: `2px solid ${themeColor}` }}>
              <th className="border border-slate-300 px-2.5 py-1.5">Qualification / Level</th>
              <th className="border border-slate-300 px-2.5 py-1.5">Institute / Board</th>
              <th className="border border-slate-300 px-2.5 py-1.5 text-center">Passing Year</th>
              <th className="border border-slate-300 px-2.5 py-1.5 text-center">Attempt / Status</th>
              <th className="border border-slate-300 px-2.5 py-1.5 text-center">Marks / Rank</th>
              <th className="border border-slate-300 px-2.5 py-1.5">Exemptions / Honors</th>
            </tr>
          </thead>
          <tbody>
            {qualifications.map((q, idx) => (
              <tr key={q.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                <td className="border border-slate-300 px-2.5 py-1.5 font-medium text-slate-900">{q.course}</td>
                <td className="border border-slate-300 px-2.5 py-1.5 text-slate-700">{q.body}</td>
                <td className="border border-slate-300 px-2.5 py-1.5 text-center text-slate-700">{q.year}</td>
                <td className="border border-slate-300 px-2.5 py-1.5 text-center font-medium text-slate-800">
                  <span className="px-1.5 py-0.5 rounded bg-slate-200/80 text-[11px] font-medium">{q.attempt}</span>
                </td>
                <td className="border border-slate-300 px-2.5 py-1.5 text-center font-semibold text-slate-900">{q.marks}</td>
                <td className="border border-slate-300 px-2.5 py-1.5 text-slate-600 italic text-[11px]">{q.exemptions || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Helper: Articleship & Practical Training Section
  const renderArticleshipSection = (titleStyle?: string) => {
    if (!articleship || articleship.length === 0) return null;
    return (
      <div className="space-y-3">
        {articleship.map((art) => (
          <div key={art.id} className="space-y-1.5 pb-2 border-b border-slate-100 last:border-b-0">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <div>
                <span className="font-bold text-slate-900 text-[13.5px]">{art.firmName}</span>
                <span className="text-slate-500 text-xs"> — {art.role}</span>
              </div>
              <div className="text-xs font-medium text-slate-600">
                {art.startDate} – {art.current ? 'Present' : art.endDate} {art.location && `| ${art.location}`}
              </div>
            </div>

            {/* Department & Major Industries Audited */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-700 bg-slate-50 p-2 rounded border border-slate-200/80">
              {art.department && (
                <div>
                  <strong className="text-slate-900">Service Area:</strong> {art.department}
                </div>
              )}
              {art.industriesAudited && (
                <div>
                  <strong className="text-slate-900">Industries & Client Portfolio:</strong> {art.industriesAudited}
                </div>
              )}
              {art.partnerOrMentor && (
                <div>
                  <strong className="text-slate-900">Principal/Partner:</strong> {art.partnerOrMentor}
                </div>
              )}
            </div>

            {/* Responsibilities & Achievements */}
            {art.highlights && art.highlights.length > 0 && (
              <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 text-[12.5px] leading-relaxed">
                {art.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Helper: Post-Qualification Work Experience
  const renderExperiences = () => {
    if (!experiences || experiences.length === 0) return null;
    return (
      <div className="space-y-3">
        {experiences.map((exp) => (
          <div key={exp.id} className="space-y-1 pb-2 border-b border-slate-100 last:border-b-0">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <div>
                <span className="font-bold text-slate-900 text-[13.5px]">{exp.company}</span>
                <span className="text-slate-600 text-xs"> — {exp.role}</span>
              </div>
              <div className="text-xs font-medium text-slate-600">
                {exp.startDate} – {exp.current ? 'Present' : exp.endDate} {exp.location && `| ${exp.location}`}
              </div>
            </div>
            {exp.description && (
              <p className="text-xs text-slate-600 italic">{exp.description}</p>
            )}
            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 text-[12.5px] leading-relaxed">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  // ================= TEMPLATE 1: BIG 4 ASSURANCE STANDARD =================
  if (styling.templateId === 'big4-assurance') {
    return (
      <div className={`p-8 sm:p-10 bg-white text-slate-900 leading-normal ${getFontFamily()} ${getFontSizeClass()}`}>
        {/* Header Block with Formal Candidate Profile */}
        <div className="text-center pb-4 border-b-2" style={{ borderColor: currentTheme.primary }}>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900">
            {personalInfo.fullName}
          </h1>
          <p className="text-sm font-semibold mt-1 tracking-wide" style={{ color: currentTheme.primary }}>
            {personalInfo.jobTitle}
          </p>

          {/* Registration / Membership Badge */}
          {personalInfo.regNumber && (
            <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-medium text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>{personalInfo.regNumber}</span>
              {personalInfo.perStatus && <span>• {personalInfo.perStatus}</span>}
            </div>
          )}

          {/* Contact Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2.5 text-xs text-slate-600">
            {personalInfo.email && renderContactItem(<Mail className="w-3 h-3" />, personalInfo.email, `mailto:${personalInfo.email}`)}
            {personalInfo.phone && (
              <>
                <span>•</span>
                {renderContactItem(<Phone className="w-3 h-3" />, personalInfo.phone, `tel:${personalInfo.phone}`)}
              </>
            )}
            {personalInfo.location && (
              <>
                <span>•</span>
                {renderContactItem(<MapPin className="w-3 h-3" />, personalInfo.location)}
              </>
            )}
            {personalInfo.linkedin && (
              <>
                <span>•</span>
                {renderContactItem(<LinkedinIcon className="w-3 h-3" />, personalInfo.linkedin, personalInfo.linkedin)}
              </>
            )}
            {personalInfo.website && (
              <>
                <span>•</span>
                {renderContactItem(<Globe className="w-3 h-3" />, personalInfo.website, personalInfo.website)}
              </>
            )}
          </div>
        </div>

        <div className={`mt-4 ${getSpacingClass()}`}>
          {/* Professional Profile / Career Objective */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Professional Profile
              </h2>
              <p className="text-slate-700 leading-relaxed text-justify">{personalInfo.summary}</p>
            </div>
          )}

          {/* Academic & Professional Qualifications (Table Matrix) */}
          {qualifications && qualifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Professional Qualifications & Examination Record
              </h2>
              {renderQualificationsTable(currentTheme.primary)}
            </div>
          )}

          {/* Articleship & Practical Training */}
          {articleship && articleship.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Articleship & Practical Training (Audit & Assurance)
              </h2>
              {renderArticleshipSection()}
            </div>
          )}

          {/* Post-Qualification Work Experience */}
          {experiences && experiences.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Corporate Experience & Financial Leadership
              </h2>
              {renderExperiences()}
            </div>
          )}

          {/* Accounting Standards & Software Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {standards && standards.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                  Technical Standards & Regulatory Frameworks
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {standards.map((std, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[11.5px] bg-slate-100 text-slate-800 border border-slate-200 font-medium">
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {software && software.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                  ERP, Financial Systems & Analytics
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {software.map((sw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[11.5px] bg-slate-100 text-slate-800 border border-slate-200 font-medium">
                      {sw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Core Competencies */}
          {coreCompetencies && coreCompetencies.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Core Domain Competencies
              </h2>
              <p className="text-slate-700 text-xs">
                {coreCompetencies.join(' • ')}
              </p>
            </div>
          )}

          {/* Academic Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {education && education.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                  Academic Background
                </h2>
                <div className="space-y-1.5">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="font-semibold text-slate-900">{edu.degree} in {edu.field}</div>
                      <div className="text-slate-600">{edu.institution} ({edu.startDate} – {edu.endDate}) {edu.gpa && `• GPA: ${edu.gpa}`}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications && certifications.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                  Additional Certifications & Memberships
                </h2>
                <div className="space-y-1.5">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-xs">
                      <div className="font-semibold text-slate-900">{cert.name}</div>
                      <div className="text-slate-600">{cert.issuer} • {cert.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ================= TEMPLATE 2: CORPORATE FINANCE & INVESTMENT BANKING (WSO / HARVARD) =================
  if (styling.templateId === 'wso-finance') {
    return (
      <div className={`p-8 sm:p-10 bg-white text-slate-950 leading-tight font-serif ${getFontSizeClass()}`}>
        {/* Crisp Wall Street Style Header */}
        <div className="text-center pb-2 border-b border-slate-950">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase">
            {personalInfo.fullName}
          </h1>
          <p className="text-xs font-semibold tracking-widest uppercase mt-0.5 text-slate-700">
            {personalInfo.jobTitle} {personalInfo.regNumber && `| ${personalInfo.regNumber}`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 mt-1 text-[11px] text-slate-700">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.email && <span>• {personalInfo.email}</span>}
            {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          </div>
        </div>

        <div className={`mt-3 ${getSpacingClass()}`}>
          {/* Summary / Objective */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-slate-950 pb-0.5 mb-1.5">
                Executive Profile
              </h2>
              <p className="text-slate-800 text-[12px] leading-relaxed text-justify">{personalInfo.summary}</p>
            </div>
          )}

          {/* Education & Qualifications */}
          {qualifications && qualifications.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-slate-950 pb-0.5 mb-1.5">
                Professional Qualifications & Examinations
              </h2>
              {renderQualificationsTable('#0f172a')}
            </div>
          )}

          {/* Articleship / Practical Training */}
          {articleship && articleship.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-slate-950 pb-0.5 mb-1.5">
                Articleship Training Experience
              </h2>
              {renderArticleshipSection()}
            </div>
          )}

          {/* Work Experience */}
          {experiences && experiences.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-slate-950 pb-0.5 mb-1.5">
                Professional Work Experience
              </h2>
              {renderExperiences()}
            </div>
          )}

          {/* Technical Skills & Standards */}
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-slate-950 pb-0.5 mb-1.5">
              Technical Proficiencies & Industry Standards
            </h2>
            <div className="space-y-1 text-[11.5px] text-slate-800">
              {standards && standards.length > 0 && (
                <div>
                  <strong>Accounting Frameworks:</strong> {standards.join(', ')}
                </div>
              )}
              {software && software.length > 0 && (
                <div>
                  <strong>Financial Systems & ERP:</strong> {software.join(', ')}
                </div>
              )}
              {coreCompetencies && coreCompetencies.length > 0 && (
                <div>
                  <strong>Core Competencies:</strong> {coreCompetencies.join(', ')}
                </div>
              )}
            </div>
          </div>

          {/* Academic Degrees */}
          {education && education.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-slate-950 pb-0.5 mb-1.5">
                Academic Background
              </h2>
              <div className="space-y-1">
                {education.map(edu => (
                  <div key={edu.id} className="flex justify-between text-[12px]">
                    <div>
                      <span className="font-bold">{edu.institution}</span> — {edu.degree} in {edu.field}
                    </div>
                    <div className="text-slate-600">
                      {edu.startDate} – {edu.endDate} {edu.gpa && `(GPA: ${edu.gpa})`}
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

  // ================= TEMPLATE 3: ACCA GLOBAL MODERN (DUAL-COLUMN UK FORMAT) =================
  if (styling.templateId === 'acca-global') {
    return (
      <div className={`bg-white text-slate-800 leading-normal flex flex-col md:flex-row min-h-full ${getFontFamily()} ${getFontSizeClass()}`}>
        {/* Left Sidebar */}
        <div className="w-full md:w-1/3 p-6 text-white" style={{ backgroundColor: currentTheme.primary }}>
          <div className="space-y-5">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
                {personalInfo.fullName}
              </h1>
              <p className="text-xs font-semibold text-white/90 mt-1">
                {personalInfo.jobTitle}
              </p>
              {personalInfo.regNumber && (
                <div className="mt-2 text-[11px] font-mono bg-white/10 px-2 py-1 rounded inline-block">
                  {personalInfo.regNumber}
                </div>
              )}
            </div>

            {/* ACCA Status Card */}
            {(personalInfo.perStatus || personalInfo.epsmCompleted) && (
              <div className="bg-white/10 p-2.5 rounded-lg border border-white/20 space-y-1 text-xs">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>ACCA Accreditation</span>
                </div>
                {personalInfo.perStatus && (
                  <p className="text-white/80 text-[11px]">PER: {personalInfo.perStatus}</p>
                )}
                {personalInfo.epsmCompleted && (
                  <p className="text-emerald-300 text-[11px] font-medium">✓ EPSM Module Completed</p>
                )}
              </div>
            )}

            {/* Contact Details */}
            <div className="space-y-2 text-xs text-white/90">
              <h3 className="font-bold uppercase tracking-wider text-[11px] text-white/70 border-b border-white/20 pb-1">
                Contact Details
              </h3>
              {personalInfo.email && (
                <div className="flex items-center gap-2 break-all">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0 text-white/70" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0 text-white/70" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-white/70" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2 break-all">
                  <LinkedinIcon className="w-3.5 h-3.5 flex-shrink-0 text-white/70" />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
            </div>

            {/* Accounting Standards */}
            {standards && standards.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-bold uppercase tracking-wider text-[11px] text-white/70 border-b border-white/20 pb-1">
                  Regulatory Standards
                </h3>
                <div className="flex flex-wrap gap-1">
                  {standards.map((s, i) => (
                    <span key={i} className="bg-white/15 px-2 py-0.5 rounded text-[11px] text-white font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Financial Software */}
            {software && software.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-bold uppercase tracking-wider text-[11px] text-white/70 border-b border-white/20 pb-1">
                  Financial Systems
                </h3>
                <div className="flex flex-wrap gap-1">
                  {software.map((sw, i) => (
                    <span key={i} className="bg-white/15 px-2 py-0.5 rounded text-[11px] text-white font-medium">
                      {sw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div className="space-y-1.5 text-xs text-white/90">
                <h3 className="font-bold uppercase tracking-wider text-[11px] text-white/70 border-b border-white/20 pb-1">
                  Languages
                </h3>
                {languages.map(l => (
                  <div key={l.id} className="flex justify-between">
                    <span>{l.language}</span>
                    <span className="text-white/70">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Main Column */}
        <div className="w-full md:w-2/3 p-6 sm:p-8 space-y-4">
          {/* Career Summary */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Executive Profile
              </h2>
              <p className="text-slate-700 leading-relaxed text-justify">{personalInfo.summary}</p>
            </div>
          )}

          {/* Qualifications Matrix */}
          {qualifications && qualifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Qualifications & Exam Progress
              </h2>
              {renderQualificationsTable(currentTheme.primary)}
            </div>
          )}

          {/* Practical Training & Articleship */}
          {articleship && articleship.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Practical Training & Audit Engagements
              </h2>
              {renderArticleshipSection()}
            </div>
          )}

          {/* Work Experience */}
          {experiences && experiences.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Employment History
              </h2>
              {renderExperiences()}
            </div>
          )}

          {/* Academic Degrees */}
          {education && education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Education & Honors
              </h2>
              <div className="space-y-1.5">
                {education.map(edu => (
                  <div key={edu.id} className="text-xs">
                    <span className="font-semibold text-slate-900">{edu.degree} in {edu.field}</span>
                    <span className="text-slate-600"> — {edu.institution} ({edu.startDate} – {edu.endDate})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ================= TEMPLATE 4: ARTICLESHIP TRAINEE & FRESHER SPECIALIST =================
  if (styling.templateId === 'articleship-fresher') {
    return (
      <div className={`p-8 sm:p-10 bg-white text-slate-900 leading-normal ${getFontFamily()} ${getFontSizeClass()}`}>
        {/* Header tailored for Articleship Applicant */}
        <div className="border-b-2 pb-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3" style={{ borderColor: currentTheme.primary }}>
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
              {personalInfo.fullName}
            </h1>
            <p className="text-sm font-semibold mt-0.5" style={{ color: currentTheme.primary }}>
              {personalInfo.jobTitle}
            </p>
            {personalInfo.regNumber && (
              <p className="text-xs font-mono text-slate-600 mt-0.5">
                Reg No: {personalInfo.regNumber}
              </p>
            )}
          </div>
          <div className="text-xs text-slate-600 space-y-0.5 sm:text-right">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          </div>
        </div>

        <div className={`mt-4 ${getSpacingClass()}`}>
          {/* Career Objective */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-1.5 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Career Objective
              </h2>
              <p className="text-slate-700 leading-relaxed text-justify">{personalInfo.summary}</p>
            </div>
          )}

          {/* Academic & Professional Examinations Matrix (Placed TOP for articleship recruiters) */}
          {qualifications && qualifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Academic & Professional Exam Track Record
              </h2>
              {renderQualificationsTable(currentTheme.primary)}
            </div>
          )}

          {/* Practical Exposure / Articleship If Any */}
          {articleship && articleship.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Articleship / Industrial Training Experience
              </h2>
              {renderArticleshipSection()}
            </div>
          )}

          {/* Technical Skills & IT Trainings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Accounting Software & IT Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {software && software.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-800 border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Standards & Familiarity
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {standards && standards.map((st, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-800 border border-slate-200">
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Formal Education & Orientations */}
          {education && education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Graduation & Schooling
              </h2>
              <div className="space-y-1.5">
                {education.map(edu => (
                  <div key={edu.id} className="text-xs flex justify-between">
                    <div>
                      <span className="font-semibold text-slate-900">{edu.degree} in {edu.field}</span> — {edu.institution}
                    </div>
                    <div className="text-slate-600">{edu.startDate} – {edu.endDate} {edu.gpa && `(${edu.gpa})`}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications & Orientation modules */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Training Modules & Certifications (ICITSS / ITT)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {certifications.map(c => (
                  <div key={c.id} className="bg-slate-50 p-2 rounded border border-slate-200">
                    <div className="font-semibold text-slate-900">{c.name}</div>
                    <div className="text-slate-600">{c.issuer} ({c.year})</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ================= TEMPLATE 5: CFO & EXECUTIVE FINANCIAL CONTROLLER =================
  return (
    <div className={`p-8 sm:p-10 bg-white text-slate-900 leading-normal ${getFontFamily()} ${getFontSizeClass()}`}>
      {/* Executive Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {personalInfo.fullName}
            </h1>
            <p className="text-sm font-semibold text-amber-300 mt-1">
              {personalInfo.jobTitle}
            </p>
            {personalInfo.regNumber && (
              <p className="text-xs font-mono text-slate-300 mt-0.5">
                Credentials: {personalInfo.regNumber}
              </p>
            )}
          </div>
          <div className="text-xs text-slate-300 space-y-1 sm:text-right">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
          </div>
        </div>
      </div>

      <div className={getSpacingClass()}>
        {/* Executive Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
              Executive Career Synopsis
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">{personalInfo.summary}</p>
          </div>
        )}

        {/* Corporate Leadership & Work History */}
        {experiences && experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
              Financial Leadership & Corporate Experience
            </h2>
            {renderExperiences()}
          </div>
        )}

        {/* Qualifications Matrix */}
        {qualifications && qualifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
              Professional Qualifications & Memberships
            </h2>
            {renderQualificationsTable(currentTheme.primary)}
          </div>
        )}

        {/* Articleship & Foundational Training */}
        {articleship && articleship.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
              Foundational Articleship & Audit Engagements
            </h2>
            {renderArticleshipSection()}
          </div>
        )}

        {/* Strategic Competencies */}
        {coreCompetencies && coreCompetencies.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b-2" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
              Strategic Core Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {coreCompetencies.map((comp, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200">
                  {comp}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Standards & Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {standards && standards.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider pb-1 mb-1.5 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Regulatory Standards
              </h3>
              <p className="text-xs text-slate-700">{standards.join(' • ')}</p>
            </div>
          )}

          {software && software.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider pb-1 mb-1.5 border-b" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>
                Enterprise ERP & Systems
              </h3>
              <p className="text-xs text-slate-700">{software.join(' • ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
