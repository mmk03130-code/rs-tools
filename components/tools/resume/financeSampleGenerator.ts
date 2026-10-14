import { ExtendedFinanceResumeData } from './CaAccaTemplateRenderer';

const SAMPLE_AVATAR_OPTIONS = [
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' rx='80' fill='%230f172a'/%3E%3Ccircle cx='80' cy='60' r='28' fill='%23cbd5e1'/%3E%3Cpath d='M30 138 c0 -28 22 -50 50 -50 s50 22 50 50' fill='%23cbd5e1'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' rx='80' fill='%23021b3a'/%3E%3Ccircle cx='80' cy='60' r='28' fill='%2394a3b8'/%3E%3Cpath d='M30 138 c0 -28 22 -50 50 -50 s50 22 50 50' fill='%2394a3b8'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' rx='80' fill='%2318181b'/%3E%3Ccircle cx='80' cy='60' r='28' fill='%23e4e4e7'/%3E%3Cpath d='M30 138 c0 -28 22 -50 50 -50 s50 22 50 50' fill='%23e4e4e7'/%3E%3C/svg%3E",
];

const CANDIDATE_NAMES = [
  { first: 'Aarav', last: 'Mehta', mid: 'K.' },
  { first: 'Devon', last: 'Hawthorne', mid: 'S.' },
  { first: 'Kavya', last: 'Nambiar', mid: 'S.' },
  { first: 'Marcus', last: 'Chen', mid: 'A.' },
  { first: 'Elena', last: 'Vance', mid: 'R.' },
  { first: 'Zaid', last: 'Hashmi', mid: 'M.' },
  { first: 'Claire', last: 'Beauchamp', mid: 'D.' },
  { first: 'Rohan', last: 'Singhania', mid: 'P.' },
  { first: 'Julian', last: 'Thorne', mid: 'B.' },
  { first: 'Priya', last: 'Patel', mid: 'M.' },
  { first: 'Siddharth', last: 'Iyer', mid: 'R.' },
  { first: 'Amina', last: 'Siddiqui', mid: 'T.' },
];

const JOB_PROFILES = [
  {
    title: 'Senior Audit & Assurance Associate',
    fts: 'Batch 71',
    regPrefix: 'FCA',
    summary: 'Diligent Chartered Accountant with extensive Big-4 assurance experience auditing multinational manufacturing, financial services, and retail conglomerates. Proven track record leading statutory year-end closures, designing substantive audit programs under ISA, evaluating internal controls over financial reporting (ICFR), and resolving complex revenue recognition matters under IFRS 15.'
  },
  {
    title: 'ACCA Qualified Financial Reporting Manager',
    fts: 'Session 2023-B',
    regPrefix: 'ACCA',
    summary: 'Results-driven ACCA professional specializing in multi-entity consolidation, cross-border corporate reporting under IFRS & UK GAAP, and financial planning. Adept at accelerating month-end closes, reducing reconciliation turnaround by 45%, and architecting automated Power BI executive reporting dashboards.'
  },
  {
    title: 'Corporate Tax & Regulatory Counsel',
    fts: 'Batch 68',
    regPrefix: 'ACA',
    summary: 'Analytical tax specialist and Chartered Accountant with deep expertise in corporate income tax planning, transfer pricing documentation, GST/VAT compliance, and appellate representation. Successfully defended statutory tax deductions across multiple appellate tribunals resulting in substantial tax dispute mitigation.'
  },
  {
    title: 'Financial Controller & IFRS Advisory Specialist',
    fts: 'Senior Fellow',
    regPrefix: 'CPA',
    summary: 'Strategic finance leader with comprehensive oversight of $180M+ operational budgets, enterprise working capital management, and statutory audit readiness. Spearheaded enterprise ERP migration, optimized treasury cash allocation, and formulated financial models supporting strategic M&A acquisitions.'
  },
  {
    title: 'Internal Audit & Risk Governance Specialist',
    fts: 'Batch 74',
    regPrefix: 'ICAI-M',
    summary: 'Governance, risk, and compliance professional with expertise in Sarbanes-Oxley (SOX 404) key control evaluation, enterprise risk management (ERM), and forensic fraud investigations. Designed automated continuous control monitoring protocols that minimized operational compliance variance.'
  }
];

const LOCATIONS = [
  { city: 'London', country: 'United Kingdom', phonePrefix: '+44 20 7946', domain: 'co.uk' },
  { city: 'New York, NY', country: 'United States', phonePrefix: '+1 212 555', domain: 'com' },
  { city: 'Toronto, ON', country: 'Canada', phonePrefix: '+1 416 555', domain: 'ca' },
  { city: 'Mumbai', country: 'India', phonePrefix: '+91 98200', domain: 'in' },
  { city: 'Dubai', country: 'United Arab Emirates', phonePrefix: '+971 50 123', domain: 'ae' },
  { city: 'Singapore', country: 'Singapore', phonePrefix: '+65 6789', domain: 'sg' },
  { city: 'Sydney, NSW', country: 'Australia', phonePrefix: '+61 2 9876', domain: 'com.au' }
];

const UNIVERSITIES = [
  { name: 'London School of Economics and Political Science (LSE)', degree: 'B.Sc. (Hons) Accounting & Finance', gpa: 'First Class Honours (Distinction)' },
  { name: 'Shri Ram College of Commerce (SRCC), University of Delhi', degree: 'Bachelor of Commerce (Honours)', gpa: 'CGPA: 9.4 / 10.0 (Merit Scholar)' },
  { name: 'University of Toronto - Rotman School of Management', degree: 'Bachelor of Commerce (Specialist in Finance)', gpa: 'GPA: 3.91 / 4.00 (High Distinction)' },
  { name: 'St. Xavier’s College (Autonomous)', degree: 'B.Com in Financial Accounting & Auditing', gpa: 'Grade: A+ (Top 2% of Cohort)' },
  { name: 'National University of Singapore (NUS)', degree: 'B.B.A. (Honours) in Professional Accountancy', gpa: 'CAP: 4.82 / 5.00' },
  { name: 'Narsee Monjee College of Commerce & Economics', degree: 'Bachelor of Financial Markets (BFM)', gpa: '89.6% Marks Aggregate' },
  { name: 'University of Manchester - Alliance Manchester Business School', degree: 'B.Sc. in International Business, Finance & Economics', gpa: 'Upper Second Class Honours (2:1)' }
];

const SECONDARY_SCHOOLS = [
  { name: 'The Winchester Academy of Higher Studies', degree: 'Higher Secondary School Certificate (HSSC)', field: 'Commerce & Advanced Mathematics', gpa: '91.4% Marks (Grade A*)' },
  { name: 'Cathedral & John Connon High School', degree: 'Indian School Certificate (ISC / Grade 12)', field: 'Commerce, Economics & Accountancy', gpa: '95.2% Aggregate' },
  { name: 'St. Columba’s Senior Secondary School', degree: 'CBSE Senior Secondary (Class XII)', field: 'Business Studies, Accountancy & Mathematics', gpa: '94.8% Aggregate' },
  { name: 'St. Paul’s Grammar & Collegiate School', degree: 'General Certificate of Education (A-Levels)', field: 'Accounting (A*), Economics (A), Mathematics (A)', gpa: 'Straight A* Grades' }
];

const AUDIT_FIRMS = [
  {
    firmName: 'Kearney & Sterling LLP Chartered Accountants',
    role: 'Senior Audit & Assurance Associate',
    department: 'Statutory Audit & Assurance Advisory',
    industries: 'Energy, Heavy Manufacturing, FMCG, Commercial Banking',
    highlights: [
      'Led on-site statutory audit engagements for 12 public and mid-market commercial clients with cumulative turnover exceeding $420M.',
      'Audited complex IFRS 9 expected credit loss (ECL) impairment modeling and evaluated IFRS 16 lease liability capitalization schedules.',
      'Designed and executed substantive analytical procedures over revenue recognition (IFRS 15), verifying sales completeness and cut-off tests.',
      'Supervised a team of 4 audit trainees, reviewing working paper files, trial balance reconciliations, and audit findings memoranda.'
    ]
  },
  {
    firmName: 'Apex Global Partners & Co. Chartered Accountants',
    role: 'Audit Associate / Articleship Trainee',
    department: 'Assurance & Regulatory Advisory',
    industries: 'Pharmaceuticals, Retail Chains, Tech Startups',
    highlights: [
      'Performed physical inventory count verifications across 6 warehouse distribution hubs, investigating stock reconciliation variances.',
      'Conducted circularization of trade debtors and creditors, reconciling 98% of material third-party confirmations.',
      'Prepared detailed direct tax schedules, corporate tax returns, and computed statutory withholding tax obligations.',
      'Automated recurring trial balance mapping templates in Excel Power Query, saving approximately 35 staff hours per engagement.'
    ]
  },
  {
    firmName: 'Deloitte Touche Tohmatsu / Member Firm',
    role: 'Assurance Associate - Financial Services',
    department: 'Financial Services Assurance (FSA)',
    industries: 'Asset Management, Fintech, Private Equity',
    highlights: [
      'Verified fair value measurement models (Level 1, 2, and 3 assets under IFRS 13) for structured investment portfolios.',
      'Tested operational design and effectiveness of Key Automated Controls (ITAC) and business process controls under SOX 404.',
      'Drafted client management letters communicating internal control deficiencies and recommending actionable remediation protocols.'
    ]
  },
  {
    firmName: 'Vanguard Corporate Advisory & Tax Partners',
    role: 'Corporate Tax & Transfer Pricing Analyst',
    department: 'Taxation & Legal Structuring',
    industries: 'Cross-Border Logistics, Telecommunications, Real Estate',
    highlights: [
      'Prepared Local Files and Master Files for cross-border related party transactions complying with OECD Transfer Pricing Guidelines.',
      'Formulated corporate advance tax computations, input GST reconciliation statements, and quarterly statutory filings.',
      'Assisted Senior Partners in drafting grounds of appeal before the Commissioner of Inland Revenue (Appeals).'
    ]
  }
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomFinanceResume(selectedTemplateId?: string): ExtendedFinanceResumeData {
  const nameObj = getRandomItem(CANDIDATE_NAMES);
  const fullName = `${nameObj.first} ${nameObj.mid} ${nameObj.last}`;
  const profile = getRandomItem(JOB_PROFILES);
  const locationObj = getRandomItem(LOCATIONS);
  const university = getRandomItem(UNIVERSITIES);
  const secondarySchool = getRandomItem(SECONDARY_SCHOOLS);

  const regNum = `${profile.regPrefix}-${getRandomNumber(100000, 999999)}`;
  const crnNum = `CRN-${getRandomNumber(40000, 99999)}`;
  const phone = `${locationObj.phonePrefix} ${getRandomNumber(100, 999)} ${getRandomNumber(1000, 9999)}`;
  const email = `${nameObj.first.toLowerCase()}.${nameObj.last.toLowerCase()}@${getRandomItem(['auditpartners', 'finadvisory', 'chartered-cpa', 'globalfinance'])}.${locationObj.domain}`;
  const linkedin = `linkedin.com/in/${nameObj.first.toLowerCase()}-${nameObj.last.toLowerCase()}-${getRandomNumber(10, 99)}`;
  const website = `${nameObj.first.toLowerCase()}${nameObj.last.toLowerCase()}.fca-credentials.${locationObj.domain}`;

  // Pick 2 distinct firms
  const shuffledFirms = [...AUDIT_FIRMS].sort(() => 0.5 - Math.random());
  const firm1 = shuffledFirms[0] || AUDIT_FIRMS[0];
  const firm2 = shuffledFirms[1] || AUDIT_FIRMS[1] || AUDIT_FIRMS[0];
  const templateId = selectedTemplateId || getRandomItem([
    'audit-exec',
    'tax-advisory',
    'corp-controller',
    'acca-analyst',
    'ma-treasury',
    'risk-assurance',
    'clean-ats',
    'cfo-partner'
  ]);

  const currentYear = 2026;
  const startYear1 = currentYear - getRandomNumber(1, 2);
  const startYear2 = startYear1 - getRandomNumber(2, 3);
  const uniGradYear = startYear2;
  const schoolGradYear = uniGradYear - 2;

  return {
    ftsBatch: profile.fts,
    crn: crnNum,
    address: `${getRandomNumber(12, 180)} ${getRandomItem(['Mayfair Crescent', 'Wall Street Suite', 'Bandra Kurla Complex', 'Financial Centre Blvd', 'Bay Street Executive Tower'])}, ${locationObj.city}`,
    objective: profile.summary,
    avatarUrl: getRandomItem(SAMPLE_AVATAR_OPTIONS),
    personalInfo: {
      fullName,
      jobTitle: profile.title,
      regNumber: regNum,
      email,
      phone,
      location: `${locationObj.city}, ${locationObj.country}`,
      linkedin,
      website,
      summary: profile.summary,
    },
    qualifications: [
      {
        id: `qual-${Date.now()}-1`,
        course: getRandomItem([
          'Certified Chartered Accountant (FCA / Fellow Member)',
          'Chartered Accountant - Final Level (All Papers Cleared)',
          'ACCA Strategic Professional Qualification',
          'Chartered Professional Accountant (CPA Canada)'
        ]),
        body: getRandomItem(['ICAI / Institute of Chartered Accountants', 'ACCA Global (United Kingdom)', 'ICAEW (England & Wales)', 'AICPA']),
        year: `${currentYear - 1}`,
        attempt: 'Passed on 1st Attempt',
        marks: 'All Core Strategic Modules Cleared'
      },
      {
        id: `qual-${Date.now()}-2`,
        course: getRandomItem([
          'Intermediate / Applied Skills Stage',
          'Chartered Accounting Intermediate Stage',
          'ACCA Applied Knowledge & Applied Skills',
          'Professional Competence Examination (PCE)'
        ]),
        body: getRandomItem(['Chartered Institute Board', 'ACCA UK Exam Board', 'National Accounting Council']),
        year: `${currentYear - 3}`,
        attempt: 'Exemptions & First Attempt Merit',
        marks: 'High Distinction in Financial Reporting'
      }
    ],
    education: [
      {
        id: `edu-${Date.now()}-1`,
        institution: university.name,
        degree: university.degree,
        field: 'Accountancy, Corporate Finance & Auditing',
        location: locationObj.city,
        startDate: `${uniGradYear - 3}`,
        endDate: `${uniGradYear}`,
        gpa: university.gpa
      },
      {
        id: `edu-${Date.now()}-2`,
        institution: secondarySchool.name,
        degree: secondarySchool.degree,
        field: secondarySchool.field,
        location: locationObj.city,
        startDate: `${schoolGradYear - 2}`,
        endDate: `${schoolGradYear}`,
        gpa: secondarySchool.gpa
      }
    ],
    articleship: [
      {
        id: `art-${Date.now()}-1`,
        firmName: firm1.firmName,
        role: firm1.role,
        location: locationObj.city,
        startDate: `${startYear1}`,
        endDate: 'Present',
        current: true,
        department: firm1.department,
        industriesAudited: firm1.industries,
        highlights: [...firm1.highlights]
      },
      {
        id: `art-${Date.now()}-2`,
        firmName: firm2.firmName,
        role: firm2.role,
        location: locationObj.city,
        startDate: `${startYear2}`,
        endDate: `${startYear1}`,
        current: false,
        department: firm2.department,
        industriesAudited: firm2.industries,
        highlights: [...firm2.highlights]
      }
    ],
    experiences: [],
    standards: [
      'Financial Accounting Standards (IFRS / IAS / US GAAP)',
      'International Standards on Auditing (ISA 200 - 700 series)',
      'Revenue Recognition (IFRS 15) & Leases (IFRS 16)',
      'Financial Instruments (IFRS 9 Expected Credit Loss)',
      'Sarbanes-Oxley Act (SOX 404) & ICFR Frameworks',
      'Corporate Taxation & Transfer Pricing (OECD Guidelines)',
      'Anti-Money Laundering (AML) & Due Diligence'
    ],
    software: [
      'Advanced MS Excel (Power Query, DAX, VBA Macros)',
      'Power BI & Tableau Financial Dashboards',
      'SAP S/4HANA Finance (FI/CO)',
      'Oracle Financials Cloud ERP',
      'AuditBoard & CaseWare Working Papers',
      'QuickBooks Online & Xero Accounting'
    ],
    coreCompetencies: [
      'Statutory & Regulatory Audit',
      'Consolidated Financial Reporting',
      'Internal Controls & Risk Assessment',
      'Working Capital & Cash Flow Modeling',
      'Corporate Tax Planning & Returns',
      'Professional Skepticism & Data Ethics',
      'Audit Team Leadership & Mentorship'
    ],
    courses: [
      { id: `c-${Date.now()}-1`, name: 'Financial Modeling & Valuation Analyst (FMVA®)', institute: 'Corporate Finance Institute (CFI)' },
      { id: `c-${Date.now()}-2`, name: 'Advanced IFRS & Technical Accounting Masterclass', institute: 'PwC / EY Academy' },
      { id: `c-${Date.now()}-3`, name: 'Data Analytics & Power BI for Auditing Professionals', institute: 'Chartered Institute IT Forum' },
      { id: `c-${Date.now()}-4`, name: 'Executive Business Communication & Board Presentation', institute: 'Institute Leadership Center' }
    ],
    achievements: [
      { id: `a-${Date.now()}-1`, title: 'Rank Holder / Merit Certificate for Outstanding Audit & Assurance Score' },
      { id: `a-${Date.now()}-2`, title: 'Commended by Audit Partner for Zero-Deficiency Quality Review on Statutory File' },
      { id: `a-${Date.now()}-3`, title: 'Academic Excellence Scholarship Awarded by University Senate' }
    ],
    references: [
      {
        id: `r-${Date.now()}-1`,
        name: `${getRandomItem(['David R. Sterling', 'Alistair Finch', 'Rajesh K. Singhal', 'Victoria Vance'])}, FCA`,
        role: `Senior Assurance Partner, ${firm1.firmName}`,
        email: `partner.assurance@${firm1.firmName.toLowerCase().replace(/[^a-z]/g, '').slice(0, 10)}.com`,
        phone: `${locationObj.phonePrefix} ${getRandomNumber(100, 999)} 8899`
      }
    ],
    activities: 'Captain, University Inter-Collegiate Chess Team • Volunteer Financial Literacy Mentor for Non-Profit Startups',
    languages: [
      { id: `l-${Date.now()}-1`, language: 'English', proficiency: 'Native / Fluent' },
      { id: `l-${Date.now()}-2`, language: getRandomItem(['French', 'German', 'Hindi', 'Mandarin', 'Arabic', 'Spanish']), proficiency: 'Professional Working Proficiency' }
    ],
    certifications: [],
    styling: {
      templateId,
      colorTheme: getRandomItem(['navy', 'slate', 'burgundy', 'emerald', 'corporate', 'minimal']),
      fontFamily: getRandomItem(['sans', 'serif']),
      spacing: 'standard',
      paperSize: 'a4',
      fontSize: 'base'
    }
  };
}

export function createBlankFinanceResume(selectedTemplateId: string = 'audit-exec'): ExtendedFinanceResumeData {
  return {
    ftsBatch: '',
    crn: '',
    address: '',
    objective: '',
    avatarUrl: SAMPLE_AVATAR_OPTIONS[0],
    personalInfo: {
      fullName: '',
      jobTitle: '',
      regNumber: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: ''
    },
    qualifications: [],
    education: [],
    articleship: [],
    experiences: [],
    standards: [],
    software: [],
    coreCompetencies: [],
    courses: [],
    achievements: [],
    references: [],
    activities: '',
    languages: [],
    certifications: [],
    styling: {
      templateId: selectedTemplateId,
      colorTheme: 'navy',
      fontFamily: 'sans',
      spacing: 'standard',
      paperSize: 'a4',
      fontSize: 'base'
    }
  };
}
