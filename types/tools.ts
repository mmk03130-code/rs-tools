export type ToolCategory = 'image' | 'pdf' | 'resume' | 'developer';

export interface ToolItem {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  category: ToolCategory;
  tags: string[];
  icon: string;
  badge?: 'Popular' | 'Pro' | 'New' | 'Fast';
  featured?: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  longOverview?: string;
  underTheHood?: string;
  faqs?: { question: string; answer: string }[];
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    summary: string;
    avatarUrl?: string;
  };
  experiences: {
    id: string;
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    highlights: string[];
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }[];
  skills: {
    name: string;
    level: number; // 1-5 or 0-100
    category?: string;
  }[];
  projects: {
    id: string;
    title: string;
    description: string;
    technologies: string;
    link?: string;
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    year: string;
  }[];
  languages?: {
    id: string;
    language: string;
    proficiency: string;
  }[];
  sectionOrder?: string[];
  styling: {
    templateId: string;
    colorTheme: string;
    fontFamily: string;
    spacing: 'compact' | 'standard' | 'spacious';
    showSkillBars: boolean;
    showIcons: boolean;
    paperSize?: 'a4' | 'letter';
    fontSize?: 'sm' | 'base' | 'lg';
  };
}

export interface AccountingExam {
  id: string;
  course: string;
  body: string;
  year: string;
  attempt: string;
  marks: string;
  exemptions?: string;
}

export interface ArticleshipTraining {
  id: string;
  firmName: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  department: string;
  industriesAudited: string;
  partnerOrMentor?: string;
  highlights: string[];
}

export interface FinanceResumeData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    regNumber?: string; // ICAI / ACCA / CPA / CMA Reg No.
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website?: string;
    summary: string;
    perStatus?: string; // ACCA PER Status
    epsmCompleted?: boolean; // ACCA Ethics Module
  };
  qualifications: AccountingExam[];
  articleship: ArticleshipTraining[];
  experiences: {
    id: string;
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    highlights: string[];
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }[];
  standards: string[]; // e.g., IFRS, Ind AS, US GAAP, ISA, SOX 404, CARO 2020
  software: string[]; // e.g., SAP S/4HANA, Tally Prime, Oracle NetSuite, Advanced Excel
  coreCompetencies: string[]; // e.g., Statutory Audit, Transfer Pricing, Financial Modeling
  certifications: {
    id: string;
    name: string;
    issuer: string;
    year: string;
  }[];
  languages?: {
    id: string;
    language: string;
    proficiency: string;
  }[];
  styling: {
    templateId: string; // 'big4-assurance' | 'wso-finance' | 'acca-global' | 'articleship-fresher' | 'cfo-executive'
    colorTheme: string;
    fontFamily: string;
    spacing: 'compact' | 'standard' | 'spacious';
    paperSize?: 'a4' | 'letter';
    fontSize?: 'sm' | 'base' | 'lg';
  };
}
