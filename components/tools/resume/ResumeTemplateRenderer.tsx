import React from 'react';
import { ResumeData } from '../../../types/tools';
import {
  Mail, Phone, MapPin, Globe,
  Calendar, Award, ExternalLink, Briefcase, GraduationCap, CheckCircle
} from 'lucide-react';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.4a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
  </svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

interface ResumeTemplateRendererProps {
  resume: ResumeData;
  currentTheme: {
    id: string;
    name: string;
    primary: string;
    accent: string;
    bgHeader: string;
  };
}

export const ResumeTemplateRenderer: React.FC<ResumeTemplateRendererProps> = ({
  resume,
  currentTheme,
}) => {
  const { personalInfo, experiences, education, skills, projects, certifications, languages, styling } = resume;
  const templateId = styling.templateId || 'clean-ats';
  const showSkillBars = styling.showSkillBars;
  const showIcons = styling.showIcons;

  // Font family class
  const getFontFamily = () => {
    if (styling.fontFamily === 'serif') return 'font-serif';
    if (styling.fontFamily === 'mono') return 'font-mono';
    return 'font-sans';
  };

  // Spacing adjustments
  const getSpacingClass = () => {
    if (styling.spacing === 'compact') return 'space-y-3';
    if (styling.spacing === 'spacious') return 'space-y-6';
    return 'space-y-4';
  };

  const getSectionMargin = () => {
    if (styling.spacing === 'compact') return 'mb-3';
    if (styling.spacing === 'spacious') return 'mb-6';
    return 'mb-4';
  };

  // Font size adjustments
  const getFontSizeClass = () => {
    if (styling.fontSize === 'sm') return 'text-[10.5px] leading-relaxed';
    if (styling.fontSize === 'lg') return 'text-[12px] leading-relaxed';
    return 'text-[11px] leading-relaxed';
  };

  // Helper for icons if enabled
  const renderContactItem = (icon: React.ReactNode, text: string, link?: string) => {
    if (!text) return null;
    return (
      <span className="inline-flex items-center gap-1">
        {showIcons && <span className="opacity-75">{icon}</span>}
        {link ? (
          <a href={link.startsWith('http') ? link : `https://${link}`} target="_blank" rel="noreferrer" className="hover:underline">
            {text}
          </a>
        ) : (
          <span>{text}</span>
        )}
      </span>
    );
  };

  // RENDERER 1: CLEAN SINGLE-COLUMN ATS (Gold Standard for Taleo, Workday, Greenhouse)
  const renderCleanAts = () => (
    <div className={`p-8 sm:p-10 text-slate-900 ${getFontSizeClass()} ${getFontFamily()}`}>
      {/* Header */}
      <div className={`text-center pb-4 ${getSectionMargin()} border-b`} style={{ borderColor: currentTheme.primary }}>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider mb-1" style={{ color: currentTheme.primary }}>
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-700 tracking-wide uppercase mb-2">
          {personalInfo.jobTitle}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[11px] text-slate-600">
          {renderContactItem(<Mail className="w-3 h-3" />, personalInfo.email)}
          {personalInfo.phone && <span>•</span>}
          {renderContactItem(<Phone className="w-3 h-3" />, personalInfo.phone)}
          {personalInfo.location && <span>•</span>}
          {renderContactItem(<MapPin className="w-3 h-3" />, personalInfo.location)}
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              {renderContactItem(<LinkedinIcon className="w-3 h-3" />, personalInfo.linkedin, personalInfo.linkedin)}
            </>
          )}
          {personalInfo.github && (
            <>
              <span>•</span>
              {renderContactItem(<GithubIcon className="w-3 h-3" />, personalInfo.github, personalInfo.github)}
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

      {/* Summary */}
      {personalInfo.summary && (
        <div className={getSectionMargin()}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b" style={{ borderColor: currentTheme.accent, color: currentTheme.primary }}>
            Professional Summary
          </h2>
          <p className="text-slate-700 leading-normal">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className={getSectionMargin()}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ borderColor: currentTheme.accent, color: currentTheme.primary }}>
            Work Experience
          </h2>
          <div className={getSpacingClass()}>
            {experiences.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-xs">{exp.role}</span>
                  <span className="text-[10.5px] text-slate-600 font-medium">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-700 mb-1">
                  {exp.company} {exp.location && `· ${exp.location}`}
                </div>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700">
                    {exp.highlights.filter(Boolean).map((h, i) => (
                      <li key={i} className="leading-snug">{h}</li>
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
        <div className={getSectionMargin()}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ borderColor: currentTheme.accent, color: currentTheme.primary }}>
            Education
          </h2>
          <div className={getSpacingClass()}>
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree} {edu.field && `in ${edu.field}`}</span>
                  <div className="text-slate-600 text-[10.5px]">{edu.institution} {edu.location && `· ${edu.location}`}</div>
                  {edu.gpa && <div className="text-slate-500 text-[10px]">Honors/GPA: {edu.gpa}</div>}
                </div>
                <div className="text-slate-600 text-[10.5px] font-medium">{edu.endDate}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className={getSectionMargin()}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ borderColor: currentTheme.accent, color: currentTheme.primary }}>
            Core Competencies & Technical Skills
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-slate-800">
            {skills.map((skill, i) => (
              <span key={i} className="inline-flex items-center gap-1 font-medium">
                <span className="text-slate-400">•</span> {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className={getSectionMargin()}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b" style={{ borderColor: currentTheme.accent, color: currentTheme.primary }}>
            Key Projects
          </h2>
          <div className={getSpacingClass()}>
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{proj.title}</span>
                  {proj.link && <span className="text-blue-600 text-[10.5px]">{proj.link}</span>}
                </div>
                {proj.technologies && (
                  <div className="text-[10px] font-semibold text-slate-500 mb-0.5">Stack: {proj.technologies}</div>
                )}
                <p className="text-slate-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b" style={{ borderColor: currentTheme.accent, color: currentTheme.primary }}>
              Certifications
            </h2>
            <div className="space-y-1">
              {certifications.map(c => (
                <div key={c.id} className="text-[10.5px]">
                  <span className="font-semibold text-slate-900">{c.name}</span>
                  <span className="text-slate-500"> — {c.issuer} ({c.year})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages && languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-0.5 border-b" style={{ borderColor: currentTheme.accent, color: currentTheme.primary }}>
              Languages
            </h2>
            <div className="flex flex-wrap gap-2 text-[10.5px]">
              {languages.map(l => (
                <span key={l.id} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                  {l.language} ({l.proficiency})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // RENDERER 2: MODERN DUAL-COLUMN SPLIT
  const renderModernSplit = () => (
    <div className={`grid grid-cols-12 min-h-full ${getFontSizeClass()} ${getFontFamily()}`}>
      {/* Left Sidebar (35% on desktop) */}
      <div className="col-span-12 sm:col-span-4 p-6 sm:p-7 text-white space-y-5" style={{ backgroundColor: currentTheme.primary }}>
        {/* Contact Information */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/80 pb-1 mb-2.5 border-b border-white/20">
            Contact
          </h2>
          <div className="space-y-2 text-[10.5px] text-white/90">
            {personalInfo.email && (
              <div className="flex items-center gap-2 break-all">
                {showIcons && <Mail className="w-3 h-3 text-white/70 flex-shrink-0" />}
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                {showIcons && <Phone className="w-3 h-3 text-white/70 flex-shrink-0" />}
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                {showIcons && <MapPin className="w-3 h-3 text-white/70 flex-shrink-0" />}
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2 break-all">
                {showIcons && <LinkedinIcon className="w-3 h-3 text-white/70 flex-shrink-0" />}
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2 break-all">
                {showIcons && <GithubIcon className="w-3 h-3 text-white/70 flex-shrink-0" />}
                <span>{personalInfo.github}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2 break-all">
                {showIcons && <Globe className="w-3 h-3 text-white/70 flex-shrink-0" />}
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education in sidebar */}
        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/80 pb-1 mb-2.5 border-b border-white/20">
              Education
            </h2>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id} className="text-[10.5px]">
                  <div className="font-bold text-white leading-snug">{edu.degree}</div>
                  <div className="text-white/80 text-[10px]">{edu.institution}</div>
                  <div className="text-white/60 text-[9.5px]">{edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills in sidebar */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/80 pb-1 mb-2.5 border-b border-white/20">
              Skills
            </h2>
            <div className="space-y-2">
              {skills.map((skill, i) => (
                <div key={i} className="text-[10.5px]">
                  <div className="flex justify-between items-center text-white/95 mb-0.5">
                    <span>{skill.name}</span>
                  </div>
                  {showSkillBars && (
                    <div className="w-full h-1.5 bg-black/25 rounded-full overflow-hidden">
                      <div className="h-full bg-white/90 rounded-full" style={{ width: `${skill.level}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications in sidebar */}
        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/80 pb-1 mb-2.5 border-b border-white/20">
              Certifications
            </h2>
            <div className="space-y-2 text-[10px] text-white/85">
              {certifications.map(c => (
                <div key={c.id}>
                  <div className="font-semibold text-white">{c.name}</div>
                  <div className="text-white/70">{c.issuer} · {c.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages in sidebar */}
        {languages && languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/80 pb-1 mb-2.5 border-b border-white/20">
              Languages
            </h2>
            <div className="space-y-1 text-[10px] text-white/90">
              {languages.map(l => (
                <div key={l.id} className="flex justify-between">
                  <span>{l.language}</span>
                  <span className="text-white/70">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column (65% on desktop) */}
      <div className="col-span-12 sm:col-span-8 p-6 sm:p-8 bg-white text-slate-900 space-y-5">
        {/* Header */}
        <div className="border-b pb-4" style={{ borderColor: currentTheme.primary }}>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: currentTheme.primary }}>
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          <p className="text-sm font-semibold text-slate-700 mt-0.5">
            {personalInfo.jobTitle}
          </p>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: currentTheme.primary }}>
              <span>Profile Summary</span>
            </h2>
            <p className="text-slate-700 leading-normal text-[11px]">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: currentTheme.primary }}>
              Professional Experience
            </h2>
            <div className={getSpacingClass()}>
              {experiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-xs">{exp.role}</span>
                    <span className="text-[10.5px] text-slate-500 font-medium">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700 mb-1">
                    {exp.company} {exp.location && `· ${exp.location}`}
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 text-[10.5px]">
                      {exp.highlights.filter(Boolean).map((h, i) => (
                        <li key={i} className="leading-snug">{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: currentTheme.primary }}>
              Featured Projects
            </h2>
            <div className={getSpacingClass()}>
              {projects.map(proj => (
                <div key={proj.id} className="text-[10.5px]">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{proj.title}</span>
                    {proj.link && <span className="text-blue-600 font-normal text-[10px]">{proj.link}</span>}
                  </div>
                  {proj.technologies && <div className="text-[9.5px] text-slate-500 mb-0.5">Stack: {proj.technologies}</div>}
                  <p className="text-slate-700">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // RENDERER 3: EXECUTIVE BANNER (Prominent corporate header banner with contrast)
  const renderExecutive = () => (
    <div className={`bg-white text-slate-900 ${getFontSizeClass()} ${getFontFamily()}`}>
      {/* Top Banner */}
      <div className="p-8 text-white" style={{ backgroundColor: currentTheme.bgHeader || currentTheme.primary }}>
        <h1 className="text-3xl font-black tracking-tight mb-1 text-white">
          {personalInfo.fullName}
        </h1>
        <p className="text-sm font-medium tracking-wide uppercase text-white/90 mb-3">
          {personalInfo.jobTitle}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/80 border-t border-white/20 pt-2.5">
          {renderContactItem(<Mail className="w-3 h-3" />, personalInfo.email)}
          {renderContactItem(<Phone className="w-3 h-3" />, personalInfo.phone)}
          {renderContactItem(<MapPin className="w-3 h-3" />, personalInfo.location)}
          {renderContactItem(<LinkedinIcon className="w-3 h-3" />, personalInfo.linkedin)}
          {renderContactItem(<Globe className="w-3 h-3" />, personalInfo.website)}
        </div>
      </div>

      <div className="p-8 sm:p-10 space-y-5">
        {/* Executive Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-1.5 pb-1 border-b-2" style={{ borderColor: currentTheme.primary }}>
              Executive Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-[11.5px]">{personalInfo.summary}</p>
          </div>
        )}

        {/* Competencies */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2 pb-1 border-b-2" style={{ borderColor: currentTheme.primary }}>
              Core Leadership & Technical Competencies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {skills.map((s, i) => (
                <div key={i} className="p-2 rounded bg-slate-50 border border-slate-200 text-[10.5px] font-semibold text-slate-800">
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2 pb-1 border-b-2" style={{ borderColor: currentTheme.primary }}>
              Career History & Leadership Experience
            </h2>
            <div className={getSpacingClass()}>
              {experiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-black text-slate-900 text-xs">{exp.role}</span>
                    <span className="text-[10.5px] font-bold text-slate-600">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 mb-1">
                    {exp.company} | {exp.location}
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 text-[11px]">
                    {exp.highlights.filter(Boolean).map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2 pb-1 border-b-2" style={{ borderColor: currentTheme.primary }}>
                Education & Credentials
              </h2>
              {education.map(edu => (
                <div key={edu.id} className="text-[11px]">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600">{edu.institution} · {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2 pb-1 border-b-2" style={{ borderColor: currentTheme.primary }}>
                Board & Professional Certifications
              </h2>
              {certifications.map(c => (
                <div key={c.id} className="text-[11px]">
                  <span className="font-bold text-slate-900">{c.name}</span>
                  <div className="text-slate-600">{c.issuer} ({c.year})</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // RENDERER 4: TIMELINE CAREER FOCUS
  const renderTimeline = () => (
    <div className={`p-8 sm:p-10 bg-white text-slate-900 ${getFontSizeClass()} ${getFontFamily()}`}>
      {/* Header */}
      <div className="pb-4 mb-5 border-b" style={{ borderColor: currentTheme.primary }}>
        <h1 className="text-2xl font-bold tracking-tight mb-1" style={{ color: currentTheme.primary }}>
          {personalInfo.fullName}
        </h1>
        <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
          {personalInfo.jobTitle}
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
          {renderContactItem(<Mail className="w-3 h-3" />, personalInfo.email)}
          <span>•</span>
          {renderContactItem(<Phone className="w-3 h-3" />, personalInfo.phone)}
          <span>•</span>
          {renderContactItem(<MapPin className="w-3 h-3" />, personalInfo.location)}
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              {renderContactItem(<LinkedinIcon className="w-3 h-3" />, personalInfo.linkedin)}
            </>
          )}
        </div>
      </div>

      {personalInfo.summary && (
        <div className={getSectionMargin()}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: currentTheme.primary }}>
            Career Overview
          </h2>
          <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Timeline Experience */}
      {experiences.length > 0 && (
        <div className={getSectionMargin()}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: currentTheme.primary }}>
            Career Progression Timeline
          </h2>
          <div className="relative pl-6 space-y-4 border-l-2" style={{ borderColor: currentTheme.accent }}>
            {experiences.map(exp => (
              <div key={exp.id} className="relative">
                {/* Timeline node */}
                <div
                  className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: currentTheme.primary }}
                />
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-xs">{exp.role}</span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <div className="text-[11px] font-medium text-slate-700 mb-1">
                  {exp.company} · {exp.location}
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700">
                  {exp.highlights.filter(Boolean).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Education Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3">
        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: currentTheme.primary }}>
              Education
            </h2>
            {education.map(edu => (
              <div key={edu.id} className="text-[11px] mb-2">
                <div className="font-bold text-slate-900">{edu.degree}</div>
                <div className="text-slate-600">{edu.institution} ({edu.endDate})</div>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: currentTheme.primary }}>
              Technical Stack
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, i) => (
                <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // RENDERER 5: DEVELOPER MONOSPACE & TECH PROFILE
  const renderDeveloper = () => (
    <div className={`p-8 sm:p-10 bg-slate-50 text-slate-900 font-mono ${getFontSizeClass()}`}>
      <div className="p-4 rounded border-l-4 bg-white shadow-sm mb-5" style={{ borderColor: currentTheme.primary }}>
        <div className="text-[10px] text-slate-500 mb-0.5">// Developer Resume Profile</div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
          {personalInfo.fullName}
        </h1>
        <div className="text-xs font-bold text-slate-700 mt-0.5">
          {personalInfo.jobTitle}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10.5px] text-slate-600 mt-2 font-mono">
          <span>{personalInfo.email}</span>
          <span>::</span>
          <span>{personalInfo.phone}</span>
          <span>::</span>
          <span>{personalInfo.location}</span>
          {personalInfo.github && (
            <>
              <span>::</span>
              <span className="text-blue-600">{personalInfo.github}</span>
            </>
          )}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="p-3 bg-white rounded border border-slate-200 mb-4">
          <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">const bio =</div>
          <p className="text-slate-700 font-sans text-[11px] leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {skills.length > 0 && (
        <div className="p-3 bg-white rounded border border-slate-200 mb-4">
          <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">const tech_stack = [</div>
          <div className="flex flex-wrap gap-1.5 pl-3">
            {skills.map((s, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-800 border border-slate-300">
                '{s.name}'{i < skills.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
          <div className="text-[10px] uppercase font-bold text-slate-500 mt-2">];</div>
        </div>
      )}

      {experiences.length > 0 && (
        <div className="space-y-3 mb-4">
          <div className="text-[11px] uppercase font-bold tracking-wider text-slate-700">
            ## Experience
          </div>
          {experiences.map(exp => (
            <div key={exp.id} className="p-3.5 bg-white rounded border border-slate-200 space-y-1.5">
              <div className="flex justify-between items-baseline font-sans">
                <span className="font-bold text-xs text-slate-900">{exp.role}</span>
                <span className="text-[10px] font-mono text-slate-500">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="text-[10.5px] font-mono text-slate-600">
                @{exp.company} ({exp.location})
              </div>
              <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 font-sans text-[11px]">
                {exp.highlights.filter(Boolean).map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="space-y-2 mb-4">
          <div className="text-[11px] uppercase font-bold tracking-wider text-slate-700">
            ## Featured Repos & Projects
          </div>
          {projects.map(p => (
            <div key={p.id} className="p-3 bg-white rounded border border-slate-200">
              <div className="flex justify-between font-mono text-[11px] font-bold text-slate-900">
                <span>{p.title}</span>
                <span className="text-blue-600 font-normal">{p.link}</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono mb-1">stack: {p.technologies}</div>
              <p className="text-slate-700 font-sans text-[11px]">{p.description}</p>
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="p-3 bg-white rounded border border-slate-200">
          <div className="text-[11px] uppercase font-bold tracking-wider text-slate-700 mb-1">
            ## Education
          </div>
          {education.map(e => (
            <div key={e.id} className="font-mono text-[10.5px]">
              <span className="font-bold text-slate-900">{e.degree}</span> @ {e.institution} ({e.endDate})
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // RENDERER 6: SWISS MINIMALIST (Understated typography, ample whitespace)
  const renderMinimalist = () => (
    <div className={`p-8 sm:p-12 bg-white text-slate-900 font-sans ${getFontSizeClass()}`}>
      <div className="border-b pb-6 mb-6">
        <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-1">
          {personalInfo.fullName}
        </h1>
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
          {personalInfo.jobTitle}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10.5px] text-slate-500">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-6">
          <p className="text-slate-700 text-[11.5px] leading-relaxed max-w-2xl">{personalInfo.summary}</p>
        </div>
      )}

      {experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
            Experience
          </h2>
          <div className="space-y-5">
            {experiences.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-semibold text-slate-900 text-xs">{exp.role}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{exp.startDate} — {exp.endDate}</span>
                </div>
                <div className="text-[11px] text-slate-500 mb-1.5">{exp.company}, {exp.location}</div>
                <ul className="space-y-1 text-slate-600 pl-2 border-l border-slate-200 text-[11px]">
                  {exp.highlights.filter(Boolean).map((h, i) => (
                    <li key={i} className="leading-relaxed">{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        {education.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              Education
            </h2>
            {education.map(edu => (
              <div key={edu.id} className="text-[11px]">
                <div className="font-medium text-slate-900">{edu.degree}</div>
                <div className="text-slate-500 text-[10.5px]">{edu.institution} ({edu.endDate})</div>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              Expertise
            </h2>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-600">
              {skills.map((s, i) => (
                <span key={i}>{s.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // RENDER ROUTING: Switch between distinctive layout architectures
  switch (templateId) {
    case 'modern-split':
    case 'metro-sidebar':
    case 'nordic-clean':
      return renderModernSplit();

    case 'executive':
    case 'bold-accent':
    case 'corporate-slate':
      return renderExecutive();

    case 'timeline-focus':
      return renderTimeline();

    case 'developer-code':
      return renderDeveloper();

    case 'minimalist':
    case 'compact-grid':
      return renderMinimalist();

    case 'clean-ats':
    case 'hybrid-ats':
    case 'academic':
    case 'classic-serif':
    case 'creative-tag':
    default:
      return renderCleanAts();
  }
};
