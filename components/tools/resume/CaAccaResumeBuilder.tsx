import React, { useState, useRef } from 'react';
import {
  Download, Sparkles, Check, Plus, Trash2, Sliders, Palette,
  Type, ShieldCheck, Eye, RefreshCw, FileText,
  User, Briefcase, GraduationCap, Code, Award, ExternalLink,
  Upload, Copy, ZoomIn, ZoomOut, CheckCircle2, AlertCircle, FileCode, Printer,
  Layers, BookOpen, Building2, Table, Hash, Percent, FileCheck, CheckSquare
} from 'lucide-react';
import { FinanceResumeData, AccountingExam, ArticleshipTraining } from '../../../types/tools';
import { CaAccaTemplateRenderer } from './CaAccaTemplateRenderer';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Accounting-specific action verbs for real-time audit
const ACCOUNTING_ACTION_VERBS = [
  'audited', 'reconciled', 'consolidated', 'spearheaded', 'formulated',
  'reviewed', 'evaluated', 'streamlined', 'analyzed', 'computed',
  'implemented', 'standardized', 'verified', 'remediated', 'automated',
  'engineered', 'negotiated', 'forecasted', 'benchmarked', 'administered'
];

// Curated Bullet Point Library for Accounting & Finance
const CURATED_BULLETS_LIBRARY = [
  {
    category: 'Statutory Audit & Assurance (Big 4 / Top 10)',
    bullets: [
      'Led statutory audit engagements for 6+ listed entities with combined turnover exceeding $450M, ensuring zero material misstatements across balance sheets.',
      'Audited revenue recognition under IFRS 15 / Ind AS 115, testing multi-element contracts and deferred revenue schedules amounting to $120M+.',
      'Executed audit procedures on lease accounting under IFRS 16 / Ind AS 116, evaluating right-of-use asset amortizations and lease liability present value schedules.',
      'Designed and executed substantive testing and test of controls (TOC) covering procure-to-pay, order-to-cash, and fixed asset registers with zero compliance deficiencies.',
      'Drafted comprehensive audit reports, management representation letters, and CARO 2020 reporting checklists for board audit committee presentations.'
    ]
  },
  {
    category: 'Internal Audit, SOX 404 & IFC',
    bullets: [
      'Evaluated internal financial controls over financial reporting (IFC / SOX 404) across 15 business cycles, identifying 8 critical control gaps and driving remediations.',
      'Formulated risk-control matrices (RCM) and standard operating procedures (SOPs) reducing operational inventory leakage by 18% across 4 manufacturing plants.',
      'Conducted forensic and concurrent audits of high-value treasury transactions, reviewing bank guarantees and letter of credit limits worth $65M+.',
      'Presented internal audit observations and root-cause analyses directly to the CFO and Chairman of the Audit Committee.'
    ]
  },
  {
    category: 'Direct & Indirect Taxation / GST / Transfer Pricing',
    bullets: [
      'Prepared corporate tax returns and tax audit reports under Section 44AB, computing deferred tax assets/liabilities under IAS 12 / Ind AS 12.',
      'Spearheaded monthly and annual GST reconciliations (GSTR-2B vs. books), identifying $1.2M in unclaimed input tax credits (ITC).',
      'Assisted in drafting Transfer Pricing study reports (Form 3CEB) and benchmarking international transactions utilizing databases (Capitaline, Prowess).',
      'Handled scrutiny assessments, prepared submissions for income tax notices, and computed advance tax installments with 99.4% precision.'
    ]
  },
  {
    category: 'Financial Reporting & IFRS Consolidation',
    bullets: [
      'Spearheaded quarterly financial closing and consolidation of 12 domestic and foreign subsidiaries in compliance with IFRS 10 / Ind AS 110.',
      'Automated multi-currency inter-company reconciliation schedules, reducing financial close cycle from 12 days to 5 days.',
      'Modeled impairment tests for goodwill and intangible assets under IAS 36, calculating value-in-use cash flows and discount rates (WACC).',
      'Structured financial statement disclosures, notes to accounts, and cash flow statements in full compliance with revised Schedule III.'
    ]
  },
  {
    category: 'Corporate Finance, FP&A & Valuation',
    bullets: [
      'Constructed dynamic 3-statement financial models, discounted cash flow (DCF), and trading comparables for M&A target evaluated at $38M.',
      'Prepared annual operational budgets, rolling monthly forecasts, and variance analyses (Actuals vs Budget) with detailed EBITDA bridge explanations.',
      'Formulated working capital optimization strategy, improving Days Sales Outstanding (DSO) by 14 days and freeing up $4.5M in liquid operating cash.'
    ]
  },
  {
    category: 'Articleship & Practical Training Highlights',
    bullets: [
      'Successfully completed 3 years of rigorous articleship under the Institute of Chartered Accountants guidelines, covering Statutory, Tax, and Internal Audits.',
      'Independently verified physical inventory counts at manufacturing facilities with warehouse stock valuations exceeding $25M.',
      'Verified bank reconciliation statements (BRS), statutory challans (TDS/PF/ESI), and trade receivables agings for quarterly review engagements.'
    ]
  }
];

// Pre-filled Presets for CA, ACCA, and Finance professionals
const CA_ACCA_PRESETS: { id: string; label: string; role: string; data: FinanceResumeData }[] = [
  {
    id: 'qualified-ca-big4',
    label: 'Qualified CA (Big 4 Statutory Audit Senior)',
    role: 'Audit Senior / Assurance Associate',
    data: {
      personalInfo: {
        fullName: 'Rohan Sharma, ACA',
        jobTitle: 'Chartered Accountant | Senior Associate – Statutory Audit',
        regNumber: 'ICAI Membership No: 539821',
        email: 'rohan.sharma.ca@gmail.com',
        phone: '+91 98765 43210',
        location: 'Mumbai, India',
        linkedin: 'linkedin.com/in/rohansharma-ca',
        website: '',
        summary: 'Qualified Chartered Accountant (cleared in 1st attempt) with 3.5+ years of extensive experience in Statutory Audit, Financial Reporting, and Internal Controls (IFC/SOX) at a Big 4 firm. Demonstrated expertise in auditing listed manufacturing and FMCG entities under Ind AS / IFRS, leading engagement teams, and advising executive management on complex regulatory compliance.',
      },
      qualifications: [
        {
          id: 'q1',
          course: 'Chartered Accountancy (Final)',
          body: 'ICAI',
          year: 'May 2023',
          attempt: '1st Attempt',
          marks: '482/800 (60.25%)',
          exemptions: 'Exemptions in Financial Reporting (74) & SFM (68)',
        },
        {
          id: 'q2',
          course: 'CA Intermediate (IPCC)',
          body: 'ICAI',
          year: 'Nov 2020',
          attempt: 'Both Groups - 1st Attempt',
          marks: '512/800 (64.00%)',
          exemptions: 'Exemption in Accounting & Taxation',
        },
        {
          id: 'q3',
          course: 'CA Foundation (CPT)',
          body: 'ICAI',
          year: 'June 2019',
          attempt: '1st Attempt',
          marks: '162/200 (81.00%)',
          exemptions: 'Distinction in Mercantile Law & Economics',
        },
        {
          id: 'q4',
          course: 'Bachelor of Commerce (B.Com Hons)',
          body: 'University of Mumbai',
          year: '2019 – 2022',
          attempt: 'First Class',
          marks: '8.8 / 10 CGPA',
          exemptions: 'Specialization in Financial Accounting & Auditing',
        },
      ],
      articleship: [
        {
          id: 'art1',
          firmName: 'B S R & Co. LLP (KPMG Affiliated)',
          role: 'Articleship Assistant – Statutory Audit & Assurance',
          location: 'Mumbai, India',
          startDate: 'Aug 2020',
          endDate: 'Aug 2023',
          current: false,
          department: 'Audit & Assurance (Consumer Markets & Industrial Manufacturing)',
          industriesAudited: 'Listed FMCG ($650M turnover), Automotive Parts ($320M turnover), Chemicals & Packaging',
          partnerOrMentor: 'Audit Partner – Assurance Division',
          highlights: [
            'Led end-to-end statutory audit fieldwork for a leading listed FMCG conglomerate with annual revenue of $650M+, managing a team of 3 junior trainees.',
            'Audited revenue recognition under Ind AS 115 / IFRS 15, identifying adjustments worth $2.4M related to customer rebates and variable consideration.',
            'Tested Internal Financial Controls over Financial Reporting (IFC/SOX 404), identifying control gaps in procurement and remediating inventory cut-off procedures.',
            'Prepared CARO 2020 reporting schedules, consolidated cash flow statements, and statutory audit notes to accounts for quarterly board reviews.',
            'Conducted physical inventory verification across 4 regional central warehouses, addressing valuation discrepancies under Ind AS 2.'
          ],
        },
      ],
      experiences: [
        {
          id: 'exp1',
          company: 'B S R & Co. LLP (KPMG)',
          role: 'Senior Associate – Statutory Audit',
          location: 'Mumbai, India',
          startDate: 'Sep 2023',
          endDate: 'Present',
          current: true,
          description: 'Managing statutory audit engagements for multinational and listed clients under Ind AS and IFRS.',
          highlights: [
            'Spearheading audit engagements for 4 listed corporate clients, managing audit timelines, budget allocation, and client liaison with CFOs and controllers.',
            'Reviewed deferred tax calculations (Ind AS 12) and lease liabilities (Ind AS 116), ensuring 100% adherence to technical accounting bulletins.',
            'Mentored 6 articleship assistants in audit documentation on eAudIT and Caseware platforms, boosting team productivity by 25%.'
          ],
        },
      ],
      education: [
        {
          id: 'edu1',
          institution: 'H.R. College of Commerce & Economics',
          degree: 'Bachelor of Commerce (B.Com)',
          field: 'Accounting & Finance',
          location: 'Mumbai, India',
          startDate: '2019',
          endDate: '2022',
          gpa: '8.8 CGPA',
        },
      ],
      standards: [
        'IFRS / Ind AS',
        'Standards on Auditing (ISA)',
        'Internal Financial Controls (IFC / SOX)',
        'CARO 2020',
        'Companies Act 2013',
        'Income Tax Act & GST',
        'Schedule III Disclosures'
      ],
      software: [
        'SAP S/4HANA (FICO)',
        'Advanced Excel (Financial Modeling)',
        'Caseware / eAudIT',
        'Tally Prime',
        'Power BI',
        'Alteryx'
      ],
      coreCompetencies: [
        'Statutory Audit & Assurance',
        'Financial Reporting & Disclosures',
        'SOX 404 & IFC Testing',
        'Revenue Recognition (IFRS 15)',
        'Lease Accounting (IFRS 16)',
        'Management Representation Letters'
      ],
      certifications: [
        {
          id: 'cert1',
          name: 'Certificate Course on Ind AS',
          issuer: 'ICAI',
          year: '2023',
        },
        {
          id: 'cert2',
          name: 'Financial Modeling & Valuation Analyst (FMVA)',
          issuer: 'Corporate Finance Institute (CFI)',
          year: '2022',
        },
      ],
      languages: [
        { id: 'l1', language: 'English', proficiency: 'Fluent / Professional' },
        { id: 'l2', language: 'Hindi', proficiency: 'Native' },
      ],
      styling: {
        templateId: 'big4-assurance',
        colorTheme: 'navy',
        fontFamily: 'serif',
        spacing: 'standard',
        paperSize: 'a4',
        fontSize: 'base',
      },
    },
  },
  {
    id: 'acca-affiliate',
    label: 'ACCA Affiliate (IFRS & Financial Reporting)',
    role: 'Financial Analyst / Reporting Specialist',
    data: {
      personalInfo: {
        fullName: 'Sarah Jenkins, ACCA',
        jobTitle: 'ACCA Affiliate | Financial Reporting & IFRS Specialist',
        regNumber: 'ACCA Reg ID: 4129845',
        email: 'sarah.jenkins.acca@outlook.com',
        phone: '+44 7700 900123',
        location: 'London, United Kingdom',
        linkedin: 'linkedin.com/in/sarahjenkins-acca',
        website: '',
        summary: 'ACCA Affiliate with all 13 exams cleared on first attempt and 36 months Practical Experience Requirement (PER) completed with an ACCA Approved Employer. Highly proficient in multi-entity consolidation, IFRS financial statement preparation, and FP&A variance analysis. Adept at leveraging SAP ERP and Power BI to automate monthly reporting cycles.',
        perStatus: '36 Months PER Completed (Approved Employer)',
        epsmCompleted: true,
      },
      qualifications: [
        {
          id: 'q1',
          course: 'Strategic Professional Level (SBR, SBL, AFM, AAA)',
          body: 'ACCA Global',
          year: 'Dec 2023',
          attempt: '1st Attempt',
          marks: 'Average 72%',
          exemptions: 'Strategic Business Reporting (78%), Advanced Audit (74%)',
        },
        {
          id: 'q2',
          course: 'Applied Skills Level (PM, TX, FR, AA, FM)',
          body: 'ACCA Global',
          year: '2022',
          attempt: '1st Attempt',
          marks: 'Average 76%',
          exemptions: 'Financial Reporting (82%)',
        },
        {
          id: 'q3',
          course: 'BSc (Hons) in Applied Accounting',
          body: 'Oxford Brookes University',
          year: '2023',
          attempt: 'First Class Honours',
          marks: 'First Class',
          exemptions: 'Research and Analysis Project on Energy Sector',
        },
      ],
      articleship: [
        {
          id: 'art1',
          firmName: 'Grant Thornton UK LLP',
          role: 'Audit Associate (ACCA Trainee)',
          location: 'London, UK',
          startDate: 'Sep 2021',
          endDate: 'Sep 2024',
          current: false,
          department: 'Audit & Financial Advisory',
          industriesAudited: 'Tech SaaS, Retail & Hospitality, Financial Services',
          partnerOrMentor: 'Senior Audit Director',
          highlights: [
            'Logged 36 months of verified practical experience across all 9 ACCA performance objectives under direct supervisor sign-off.',
            'Prepared statutory financial statements for 8 international subsidiaries under IFRS and UK GAAP (FRS 102).',
            'Conducted analytical reviews on gross profit margins, operating expenses, and balance sheet variance thresholds exceeding £100K.',
            'Collaborated with tax specialists to compute corporate tax provisions and deferred tax assets under IAS 12.',
            'Streamlined client audit PBC (Provided by Client) list workflows, shortening audit delivery lead time by 18%.'
          ],
        },
      ],
      experiences: [
        {
          id: 'exp1',
          company: 'Astraea Global Capital Ltd',
          role: 'Senior Financial Reporting Analyst',
          location: 'London, UK',
          startDate: 'Oct 2024',
          endDate: 'Present',
          current: true,
          description: 'Overseeing group consolidation and monthly board reporting packs under IFRS.',
          highlights: [
            'Spearheading monthly financial close and consolidation of 6 legal entities across EMEA and APAC regions.',
            'Implemented automated Power BI dashboards connecting to SAP S/4HANA, providing executive visibility into EBITDA trends.',
            'Coordinated with external Big 4 auditors during year-end statutory audit with zero audit adjustments.'
          ],
        },
      ],
      education: [
        {
          id: 'edu1',
          institution: 'Oxford Brookes University',
          degree: 'BSc (Hons)',
          field: 'Applied Accounting',
          location: 'Oxford, UK',
          startDate: '2020',
          endDate: '2023',
          gpa: 'First Class Honours',
        },
      ],
      standards: [
        'IFRS / IAS',
        'UK GAAP (FRS 102)',
        'IFRS 15 (Revenue)',
        'IFRS 16 (Leases)',
        'IFRS 9 (Financial Instruments)',
        'ISA (Audit Standards)'
      ],
      software: [
        'SAP S/4HANA',
        'Oracle NetSuite',
        'Advanced Excel (Financial Modeling)',
        'Power BI',
        'Xero & QuickBooks'
      ],
      coreCompetencies: [
        'Group Financial Consolidation',
        'IFRS Conversion & Disclosures',
        'FP&A & Variance Analysis',
        'Statutory Audit Management',
        'Working Capital Management'
      ],
      certifications: [
        {
          id: 'cert1',
          name: 'Certificate in International Financial Reporting (CertIFR)',
          issuer: 'ACCA',
          year: '2023',
        },
      ],
      languages: [
        { id: 'l1', language: 'English', proficiency: 'Native' },
        { id: 'l2', language: 'French', proficiency: 'Intermediate' },
      ],
      styling: {
        templateId: 'acca-global',
        colorTheme: 'navy',
        fontFamily: 'sans',
        spacing: 'standard',
        paperSize: 'a4',
        fontSize: 'base',
      },
    },
  },
  {
    id: 'ca-inter-articleship-fresher',
    label: 'CA Inter / Semi-Qualified (Seeking Articleship)',
    role: 'Articleship Trainee Applicant',
    data: {
      personalInfo: {
        fullName: 'Aayush Verma',
        jobTitle: 'CA Intermediate (Both Groups Cleared) | Seeking Articleship',
        regNumber: 'ICAI Student Reg No: CRO0684129',
        email: 'aayush.verma.ca@gmail.com',
        phone: '+91 99887 76655',
        location: 'Delhi NCR, India',
        linkedin: 'linkedin.com/in/aayush-verma-ca',
        website: '',
        summary: 'Enthusiastic and detail-oriented CA Intermediate candidate who cleared Both Groups in May 2024. Successfully completed ICAI mandatory orientation and ITT training modules. Possesses strong fundamentals in Ind AS, Auditing Standards, Income Tax, and Advanced Excel financial modeling. Seeking a 3-year articleship position in Statutory Audit / Taxation at a reputed CA firm.',
      },
      qualifications: [
        {
          id: 'q1',
          course: 'CA Intermediate (Both Groups)',
          body: 'ICAI',
          year: 'May 2024',
          attempt: 'Both Groups - 1st Attempt',
          marks: '494/800 (61.75%)',
          exemptions: 'Exemptions in Advanced Accounting (76) & Taxation (68)',
        },
        {
          id: 'q2',
          course: 'CA Foundation',
          body: 'ICAI',
          year: 'Dec 2022',
          attempt: '1st Attempt',
          marks: '168/200 (84.00%)',
          exemptions: 'Distinction in Mathematics & Accounts',
        },
        {
          id: 'q3',
          course: 'Bachelor of Commerce (B.Com)',
          body: 'Delhi University (SRCC)',
          year: '2022 – Present',
          attempt: 'Pursuing (3rd Year)',
          marks: '8.6 CGPA',
          exemptions: 'Major in Commerce & Accountancy',
        },
        {
          id: 'q4',
          course: 'Class XII (CBSE Board)',
          body: 'Delhi Public School',
          year: '2022',
          attempt: '1st Attempt',
          marks: '96.4%',
          exemptions: 'Commerce Stream (100/100 in Accountancy)',
        },
      ],
      articleship: [],
      experiences: [],
      education: [
        {
          id: 'edu1',
          institution: 'Shri Ram College of Commerce (SRCC), Delhi University',
          degree: 'Bachelor of Commerce (Hons)',
          field: 'Accounting & Commerce',
          location: 'New Delhi, India',
          startDate: '2022',
          endDate: 'Present',
          gpa: '8.6 CGPA',
        },
      ],
      standards: [
        'Ind AS / Accounting Standards (AS)',
        'Standards on Auditing (SAs)',
        'Income Tax Act 1961',
        'GST Laws & Filing',
        'Companies Act 2013'
      ],
      software: [
        'Tally Prime',
        'Advanced Microsoft Excel (VLOOKUP, INDEX/MATCH, Pivot, What-If)',
        'QuickBooks Online',
        'ICITSS Information Technology'
      ],
      coreCompetencies: [
        'Voucher Verification & Substantive Auditing',
        'Bank Reconciliation & Ledger Scrutiny',
        'Income Tax Computation & TDS',
        'GST Return Preparation (GSTR-1, 3B)',
        'Ratio Analysis & Financial Statements'
      ],
      certifications: [
        {
          id: 'cert1',
          name: 'ICITSS (Orientation Course)',
          issuer: 'ICAI Delhi Chapter',
          year: '2024',
        },
        {
          id: 'cert2',
          name: 'ICITSS (Information Technology Training)',
          issuer: 'ICAI Delhi Chapter',
          year: '2024',
        },
      ],
      languages: [
        { id: 'l1', language: 'English', proficiency: 'Fluent' },
        { id: 'l2', language: 'Hindi', proficiency: 'Native' },
      ],
      styling: {
        templateId: 'articleship-fresher',
        colorTheme: 'navy',
        fontFamily: 'serif',
        spacing: 'standard',
        paperSize: 'a4',
        fontSize: 'base',
      },
    },
  },
  {
    id: 'corporate-tax-specialist',
    label: 'Corporate Tax & GST Advisory Consultant',
    role: 'Tax Consultant / Manager',
    data: {
      personalInfo: {
        fullName: 'Kavita Iyer, FCA',
        jobTitle: 'Chartered Accountant | Manager – Direct Tax & Transfer Pricing',
        regNumber: 'ICAI Reg: 412093',
        email: 'kavita.iyer.tax@gmail.com',
        phone: '+91 98200 11223',
        location: 'Bengaluru, India',
        linkedin: 'linkedin.com/in/kavitaiyer-tax',
        summary: 'Fellow Chartered Accountant with 6+ years of dedicated expertise in Corporate Tax Planning, Transfer Pricing benchmarking, and GST advisory for Fortune 500 tech and healthcare enterprises. Extensive experience representing corporate clients before tax authorities, drafting appellate submissions, and structuring cross-border transactions.',
      },
      qualifications: [
        {
          id: 'q1',
          course: 'Chartered Accountancy (Final)',
          body: 'ICAI',
          year: 'Nov 2018',
          attempt: '1st Attempt',
          marks: '498/800',
          exemptions: 'Exemption in Direct Tax Laws (78)',
        },
        {
          id: 'q2',
          course: 'CA Intermediate',
          body: 'ICAI',
          year: 'May 2016',
          attempt: '1st Attempt',
          marks: '520/800',
          exemptions: 'AIR 38 (All India Rank)',
        },
      ],
      articleship: [
        {
          id: 'art1',
          firmName: 'Deloitte Touche Tohmatsu India LLP',
          role: 'Articleship Assistant – Corporate Tax & Regulatory',
          location: 'Bengaluru, India',
          startDate: 'Aug 2015',
          endDate: 'Aug 2018',
          current: false,
          department: 'Direct Tax & International Tax Services',
          industriesAudited: 'Information Technology, E-commerce, Pharmaceuticals',
          highlights: [
            'Prepared corporate tax returns and compute deferred tax schedules for 10+ multinational tech subsidiaries.',
            'Conducted Transfer Pricing documentation and economic benchmarking studies using TP databases.',
            'Prepared submissions for scrutiny assessments and penalty proceedings under the Income Tax Act.'
          ],
        },
      ],
      experiences: [
        {
          id: 'exp1',
          company: 'PwC India',
          role: 'Manager – International Tax & Transfer Pricing',
          location: 'Bengaluru, India',
          startDate: 'Jan 2021',
          endDate: 'Present',
          current: true,
          description: 'Advising tech clients on cross-border tax structures and OECD Pillar Two preparedness.',
          highlights: [
            'Spearheaded tax optimization advisory for cross-border software licensing transactions, saving clients $3.2M in withholding taxes.',
            'Managed Form 3CEB filings and country-by-country reporting (CbCR) for 8 conglomerate groups.',
            'Conducted GST annual audits and resolved refund claims amounting to $4.8M with zero department penalties.'
          ],
        },
      ],
      education: [
        {
          id: 'edu1',
          institution: 'St. Joseph’s College of Commerce',
          degree: 'Bachelor of Commerce',
          field: 'Taxation & Finance',
          location: 'Bengaluru, India',
          startDate: '2014',
          endDate: '2017',
        },
      ],
      standards: [
        'Income Tax Act 1961',
        'Transfer Pricing Regulations',
        'OECD Guidelines & BEPS Action Plans',
        'GST Laws & Litigation',
        'DTAA & International Tax Treaties',
        'Ind AS 12 (Income Taxes)'
      ],
      software: ['SAP ERP', 'Computax', 'Tally Prime', 'Bloomberg Tax', 'Advanced Excel'],
      coreCompetencies: [
        'Corporate Tax Structuring',
        'Transfer Pricing Documentation',
        'Tax Dispute Resolution',
        'M&A Tax Due Diligence',
        'GST Refund Optimization'
      ],
      certifications: [
        {
          id: 'c1',
          name: 'Diploma in International Taxation (DIIT)',
          issuer: 'ICAI',
          year: '2021',
        },
      ],
      styling: {
        templateId: 'big4-assurance',
        colorTheme: 'charcoal',
        fontFamily: 'serif',
        spacing: 'compact',
        paperSize: 'a4',
        fontSize: 'base',
      },
    },
  },
  {
    id: 'fpa-valuation-analyst',
    label: 'FP&A & Valuation Analyst (Corporate Finance)',
    role: 'Financial Analyst / Modeler',
    data: {
      personalInfo: {
        fullName: 'Marcus Vance, CFA, ACCA',
        jobTitle: 'Lead Financial Analyst | Corporate Finance & M&A Valuation',
        regNumber: 'ACCA: 3918471 | CFA Charterholder',
        email: 'marcus.vance.finance@gmail.com',
        phone: '+1 (415) 890-3344',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/marcus-vance-valuation',
        summary: 'Quantitative finance professional combining ACCA accounting rigor and CFA investment valuation depth. 5+ years building 3-statement financial models, DCF valuations, and board-level FP&A dashboards for private equity portfolio companies and mid-market M&A transactions.',
      },
      qualifications: [
        {
          id: 'q1',
          course: 'CFA Charterholder (Level I, II, III Passed)',
          body: 'CFA Institute',
          year: '2023',
          attempt: '1st Attempt',
          marks: 'Top 10th Percentile',
          exemptions: 'Financial Statement Analysis & Equity Valuation',
        },
        {
          id: 'q2',
          course: 'ACCA Member',
          body: 'ACCA Global',
          year: '2021',
          attempt: 'Completed',
          marks: 'Strategic Professional Cleared',
          exemptions: 'Advanced Financial Management (AFM)',
        },
      ],
      articleship: [],
      experiences: [
        {
          id: 'exp1',
          company: 'Beacon Hill Capital Advisory',
          role: 'Senior Financial Analyst – M&A & FP&A',
          location: 'New York, NY',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          description: 'Executing valuation models and corporate finance advisory for healthcare & SaaS clients.',
          highlights: [
            'Built 3-statement financial models, DCF, and LBO models supporting 4 acquisitions valued between $25M and $110M.',
            'Developed weekly cash flow forecasting tools in Power BI, enabling leadership to optimize treasury allocations and reduce interest costs by 12%.',
            'Prepared comprehensive confidential information memorandums (CIM) and management presentations for institutional investors.'
          ],
        },
      ],
      education: [
        {
          id: 'edu1',
          institution: 'New York University (Stern)',
          degree: 'BSc in Finance',
          field: 'Corporate Finance',
          location: 'New York, NY',
          startDate: '2017',
          endDate: '2021',
        },
      ],
      standards: ['US GAAP & IFRS', 'ASC 606 (Revenue)', 'DCF & LBO Modeling', 'SEC Reporting'],
      software: ['Advanced Excel / VBA', 'Power BI & Tableau', 'Capital IQ & FactSet', 'Oracle Cloud ERP'],
      coreCompetencies: ['Financial Modeling', 'DCF & Trading Comps', 'EBITDA Bridge Analysis', 'Working Capital Management'],
      certifications: [
        { id: 'c1', name: 'FMVA Certification', issuer: 'CFI', year: '2021' },
      ],
      styling: {
        templateId: 'wso-finance',
        colorTheme: 'navy',
        fontFamily: 'serif',
        spacing: 'compact',
        paperSize: 'letter',
        fontSize: 'base',
      },
    },
  },
  {
    id: 'clean-blank-slate',
    label: 'Clean Blank Slate (Start Fresh)',
    role: 'Empty Template',
    data: {
      personalInfo: {
        fullName: 'Your Full Name',
        jobTitle: 'Chartered Accountant / ACCA / Finance Professional',
        regNumber: 'Reg / Roll / Membership No.',
        email: 'your.email@example.com',
        phone: '+00 00000 00000',
        location: 'City, Country',
        linkedin: '',
        website: '',
        summary: 'A compelling 2-3 sentence overview highlighting your credentials, attempts, articleship experience, and key accounting competencies.',
      },
      qualifications: [
        {
          id: 'q1',
          course: 'CA Final / ACCA Strategic / CPA',
          body: 'ICAI / ACCA',
          year: '2024',
          attempt: '1st Attempt',
          marks: '60%+',
          exemptions: 'Exemptions in Key Subjects',
        },
      ],
      articleship: [
        {
          id: 'art1',
          firmName: 'Articleship Training Firm Name',
          role: 'Articleship Assistant – Statutory Audit',
          location: 'City',
          startDate: '2021',
          endDate: '2024',
          current: false,
          department: 'Statutory Audit / Taxation',
          industriesAudited: 'Manufacturing, Banking, FMCG',
          highlights: [
            'Led statutory audit fieldwork for corporate clients with verified revenue figures.',
            'Tested Internal Financial Controls over financial reporting with zero deficiencies.',
          ],
        },
      ],
      experiences: [],
      education: [
        {
          id: 'edu1',
          institution: 'University / College',
          degree: 'Bachelor of Commerce (B.Com)',
          field: 'Accounting & Finance',
          location: 'City',
          startDate: '2019',
          endDate: '2022',
        },
      ],
      standards: ['IFRS / Ind AS', 'ISA (Standards on Auditing)', 'Companies Act 2013', 'Income Tax & GST'],
      software: ['SAP S/4HANA', 'Tally Prime', 'Advanced Excel', 'Caseware'],
      coreCompetencies: ['Statutory Audit', 'Financial Reporting', 'Tax Compliance', 'Internal Controls'],
      certifications: [],
      styling: {
        templateId: 'big4-assurance',
        colorTheme: 'navy',
        fontFamily: 'serif',
        spacing: 'standard',
        paperSize: 'a4',
        fontSize: 'base',
      },
    },
  },
];

interface CaAccaResumeBuilderProps {
  onSwitchToGeneralMode?: () => void;
}

export const CaAccaResumeBuilder: React.FC<CaAccaResumeBuilderProps> = ({
  onSwitchToGeneralMode,
}) => {
  // Navigation & tabs
  const [activeTab, setActiveTab] = useState<'content' | 'templates' | 'ats' | 'styles' | 'bullet-library' | 'import-export'>('content');
  const [contentSubTab, setContentSubTab] = useState<'personal' | 'qualifications' | 'articleship' | 'experience' | 'competencies' | 'education'>('personal');

  // Resume State
  const [resume, setResume] = useState<FinanceResumeData>(CA_ACCA_PRESETS[0].data);

  // Preview controls
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showPageBoundary, setShowPageBoundary] = useState<boolean>(true);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  // Raw text import state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumePrintRef = useRef<HTMLDivElement>(null);

  // 5 Accounting Architectures
  const TEMPLATE_ARCHITECTURES = [
    { id: 'big4-assurance', name: 'Big 4 Assurance Standard', desc: 'Authoritative single-column layout trusted by Deloitte, PwC, EY & KPMG', badge: 'Big 4 Approved' },
    { id: 'wso-finance', name: 'Corporate Finance & Valuation (WSO)', desc: 'High-density metrics format ideal for FP&A, M&A and Controller roles' },
    { id: 'acca-global', name: 'ACCA Global Modern', desc: 'Dual-column UK/International standard with prominent PER badge' },
    { id: 'articleship-fresher', name: 'Articleship & Trainee Specialist', desc: 'Highlights exam attempts, ranks, and ITT modules for vacancy applications' },
    { id: 'cfo-executive', name: 'Executive CFO & Controller', desc: 'Executive banner with strategic corporate governance & financial leadership' },
  ];

  // 6 Executive Color Themes
  const COLOR_THEMES = [
    { id: 'navy', name: 'Corporate Navy (Big 4)', primary: '#1e3a8a', secondary: '#3b82f6', accent: '#dbeafe' },
    { id: 'charcoal', name: 'Wall Street Charcoal', primary: '#0f172a', secondary: '#475569', accent: '#f1f5f9' },
    { id: 'emerald', name: 'Accounting Emerald', primary: '#065f46', secondary: '#10b981', accent: '#d1fae5' },
    { id: 'sapphire', name: 'Royal Sapphire', primary: '#1e40af', secondary: '#60a5fa', accent: '#eff6ff' },
    { id: 'burgundy', name: 'Executive Burgundy', primary: '#831843', secondary: '#db2777', accent: '#fce7f3' },
    { id: 'slate', name: 'Modern Minimalist Slate', primary: '#334155', secondary: '#64748b', accent: '#f8fafc' },
  ];

  const currentTheme = COLOR_THEMES.find(t => t.id === resume.styling.colorTheme) || COLOR_THEMES[0];

  // Calculate Real-Time Accounting ATS Score (0 - 100)
  const calculateFinanceAtsScore = () => {
    let score = 0;
    const checks: { label: string; passed: boolean; tip: string; points: number }[] = [];

    // Check 1: Qualifications table populated
    const hasQualifications = resume.qualifications && resume.qualifications.length > 0;
    score += hasQualifications ? 15 : 0;
    checks.push({
      label: 'Professional Qualifications Matrix',
      passed: hasQualifications,
      tip: 'Big 4 & finance recruiters screen the qualification table first for passing year and attempts.',
      points: 15,
    });

    // Check 2: Passing attempts disclosed
    const hasAttempts = resume.qualifications?.some(q => q.attempt && q.attempt.trim().length > 0);
    score += hasAttempts ? 15 : 0;
    checks.push({
      label: 'Exam Passing Attempts / Ranks Disclosed',
      passed: !!hasAttempts,
      tip: 'Disclose "1st Attempt" or "Both Groups Cleared" to highlight academic distinction.',
      points: 15,
    });

    // Check 3: Articleship or Practical Training details
    const hasArticleship = (resume.articleship && resume.articleship.length > 0) || (resume.experiences && resume.experiences.length > 0);
    score += hasArticleship ? 20 : 0;
    checks.push({
      label: 'Articleship & Audit Engagements Disclosed',
      passed: !!hasArticleship,
      tip: 'Add your articleship firm, service lines, and major client industries audited.',
      points: 20,
    });

    // Check 4: Accounting Standards included (IFRS, Ind AS, ISA, SOX)
    const hasStandards = resume.standards && resume.standards.length >= 3;
    score += hasStandards ? 15 : 0;
    checks.push({
      label: 'Regulatory Standards (IFRS / Ind AS / ISA / SOX)',
      passed: !!hasStandards,
      tip: 'Include at least 3 accounting frameworks (e.g., IFRS 15, Ind AS 116, CARO 2020, ISA 315).',
      points: 15,
    });

    // Check 5: Financial ERP & Systems included (SAP, Tally, Excel, Oracle)
    const hasSoftware = resume.software && resume.software.length >= 2;
    score += hasSoftware ? 15 : 0;
    checks.push({
      label: 'Financial Systems & ERP (SAP, Tally, Advanced Excel)',
      passed: !!hasSoftware,
      tip: 'List ERP systems and analytical tools to pass recruiter software filter keywords.',
      points: 15,
    });

    // Check 6: Quantitative Financial Metrics
    const allText = JSON.stringify(resume);
    const hasQuantMetrics = /\$|₹|£|%|\bcrore\b|\blakh\b|\bturnover\b|\bmillion\b|\bebitda\b/i.test(allText);
    score += hasQuantMetrics ? 10 : 0;
    checks.push({
      label: 'Quantified Financial Impact ($ / ₹ / % / Turnover)',
      passed: hasQuantMetrics,
      tip: 'Quantify your audit scope (e.g. "$500M turnover client", "18% variance identified").',
      points: 10,
    });

    // Check 7: ICAI / ACCA / Reg Number or Student Roll Number
    const hasReg = !!resume.personalInfo.regNumber && resume.personalInfo.regNumber.trim().length > 3;
    score += hasReg ? 10 : 0;
    checks.push({
      label: 'ICAI / ACCA Membership or Student Reg ID',
      passed: hasReg,
      tip: 'Include your professional registration or student roll number to verify legitimacy.',
      points: 10,
    });

    return { score: Math.min(score, 100), checks };
  };

  const { score: atsScore, checks: atsChecks } = calculateFinanceAtsScore();

  // 1. Direct PDF Download (.pdf file via html2canvas & jsPDF - 0 Blank Pages)
  const handleDownloadPdf = async () => {
    const element = resumePrintRef.current;
    if (!element) return;

    try {
      setIsGeneratingPdf(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });

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
        format: resume.styling.paperSize === 'letter' ? 'letter' : 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      while (heightLeft > 8) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }

      const safeName = (resume.personalInfo.fullName || 'CA_ACCA_Resume').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `${safeName}_Professional_Resume.pdf`;
      pdf.save(filename);

      setCopyFeedback(`Downloaded ${filename} successfully!`);
      setTimeout(() => setCopyFeedback(null), 3500);
    } catch (err) {
      console.error('PDF export error:', err);
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

    let stylesHtml = '';
    document.querySelectorAll('style, link[rel="stylesheet"]').forEach(el => {
      stylesHtml += el.outerHTML;
    });

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resume.personalInfo.fullName || 'Resume'} - Accounting & Finance CV</title>
          ${stylesHtml}
          <style>
            @page {
              size: ${resume.styling.paperSize === 'letter' ? 'letter' : 'A4'} portrait;
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

  // Export Plain Text ATS Format
  const handleCopyPlainText = () => {
    const p = resume.personalInfo;
    let txt = `========================================================\n`;
    txt += `${p.fullName.toUpperCase()}\n`;
    txt += `${p.jobTitle}\n`;
    if (p.regNumber) txt += `Credentials: ${p.regNumber}\n`;
    txt += `Email: ${p.email} | Phone: ${p.phone} | Location: ${p.location}\n`;
    if (p.linkedin) txt += `LinkedIn: ${p.linkedin}\n`;
    txt += `========================================================\n\n`;

    if (p.summary) {
      txt += `EXECUTIVE SUMMARY\n`;
      txt += `--------------------------------------------------------\n`;
      txt += `${p.summary}\n\n`;
    }

    if (resume.qualifications && resume.qualifications.length > 0) {
      txt += `PROFESSIONAL QUALIFICATIONS & EXAM TRACK\n`;
      txt += `--------------------------------------------------------\n`;
      resume.qualifications.forEach(q => {
        txt += `• ${q.course} (${q.body}, ${q.year}) | Attempt: ${q.attempt} | Marks: ${q.marks}\n`;
        if (q.exemptions) txt += `  Honors/Exemptions: ${q.exemptions}\n`;
      });
      txt += `\n`;
    }

    if (resume.articleship && resume.articleship.length > 0) {
      txt += `ARTICLESHIP & PRACTICAL TRAINING\n`;
      txt += `--------------------------------------------------------\n`;
      resume.articleship.forEach(a => {
        txt += `${a.firmName} — ${a.role} (${a.startDate} - ${a.endDate})\n`;
        if (a.department) txt += `Service Line: ${a.department}\n`;
        if (a.industriesAudited) txt += `Client Portfolio: ${a.industriesAudited}\n`;
        a.highlights.forEach(h => {
          txt += `  - ${h}\n`;
        });
        txt += `\n`;
      });
    }

    if (resume.experiences && resume.experiences.length > 0) {
      txt += `WORK EXPERIENCE\n`;
      txt += `--------------------------------------------------------\n`;
      resume.experiences.forEach(e => {
        txt += `${e.company} — ${e.role} (${e.startDate} - ${e.endDate})\n`;
        e.highlights.forEach(h => {
          txt += `  - ${h}\n`;
        });
        txt += `\n`;
      });
    }

    if (resume.standards && resume.standards.length > 0) {
      txt += `REGULATORY STANDARDS: ${resume.standards.join(', ')}\n`;
    }
    if (resume.software && resume.software.length > 0) {
      txt += `FINANCIAL SOFTWARE & ERP: ${resume.software.join(', ')}\n`;
    }

    navigator.clipboard.writeText(txt);
    setCopyFeedback('Plain Text ATS copied to clipboard!');
    setTimeout(() => setCopyFeedback(null), 3500);
  };

  // JSON Export & Import
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_CA_ACCA_Resume.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.personalInfo) {
          setResume(parsed);
          setCopyFeedback('CA/ACCA Resume imported successfully!');
          setTimeout(() => setCopyFeedback(null), 3000);
        }
      } catch {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  // Preset switch
  const handleLoadPreset = (presetId: string) => {
    const found = CA_ACCA_PRESETS.find(p => p.id === presetId);
    if (found) {
      setResume(JSON.parse(JSON.stringify(found.data)));
      setCopyFeedback(`Loaded preset: ${found.label}`);
      setTimeout(() => setCopyFeedback(null), 2500);
    }
  };

  // Add Examination Row
  const handleAddQualification = () => {
    const newExam: AccountingExam = {
      id: Date.now().toString(),
      course: 'New Qualification / Level',
      body: 'ICAI / ACCA',
      year: '2024',
      attempt: '1st Attempt',
      marks: '60%',
      exemptions: '',
    };
    setResume(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, newExam],
    }));
  };

  // Delete Qualification Row
  const handleDeleteQualification = (id: string) => {
    setResume(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter(q => q.id !== id),
    }));
  };

  // Add Articleship Item
  const handleAddArticleship = () => {
    const newArt: ArticleshipTraining = {
      id: Date.now().toString(),
      firmName: 'Chartered Accountants Firm LLP',
      role: 'Articleship Assistant – Statutory Audit',
      location: 'City',
      startDate: '2021',
      endDate: '2024',
      current: false,
      department: 'Statutory Audit & IFC',
      industriesAudited: 'Manufacturing ($150M turnover), Retail, Banking',
      partnerOrMentor: 'Audit Partner',
      highlights: [
        'Executed audit procedures on revenue recognition and trade receivables with zero audit differences.',
        'Verified compliance with Schedule III disclosure requirements and CARO 2020 checklists.'
      ],
    };
    setResume(prev => ({
      ...prev,
      articleship: [...(prev.articleship || []), newArt],
    }));
  };

  // Add Experience Item
  const handleAddExperience = () => {
    setResume(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: Date.now().toString(),
          company: 'Corporate Organization / Audit Firm',
          role: 'Role Title',
          location: 'Location',
          startDate: '2023',
          endDate: 'Present',
          current: true,
          description: 'Key scope of responsibilities and financial portfolio.',
          highlights: ['Quantified financial contribution or audit accomplishment.'],
        },
      ],
    }));
  };

  // Insert Curated Bullet into Active Articleship or Experience
  const handleInsertCuratedBullet = (bullet: string) => {
    if (resume.articleship && resume.articleship.length > 0) {
      const updated = [...resume.articleship];
      updated[0].highlights.push(bullet);
      setResume(prev => ({ ...prev, articleship: updated }));
      setCopyFeedback('Bullet point added to your active Articleship experience!');
    } else if (resume.experiences && resume.experiences.length > 0) {
      const updated = [...resume.experiences];
      updated[0].highlights.push(bullet);
      setResume(prev => ({ ...prev, experiences: updated }));
      setCopyFeedback('Bullet point added to your active Work experience!');
    } else {
      navigator.clipboard.writeText(bullet);
      setCopyFeedback('Bullet point copied to clipboard!');
    }
    setTimeout(() => setCopyFeedback(null), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4">
      {/* Top Banner & Mode Switcher */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-500/30 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Specialized Accounting & Finance Edition
            </span>
            <span className="text-xs text-slate-400">• Big 4, ICAI & ACCA Global Standard</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            Chartered & ACCA Pro Resume Studio
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Engineered specifically for Chartered Accountants (CA), ACCA Affiliates, CFAs, CPAs & Articleship Trainees. Complete with Examination Attempt Matrix, Articleship Logs, Big 4 layouts, and instant vector PDF export.
          </p>
        </div>

        {/* Action Controls & Mode Switch */}
        <div className="flex flex-wrap items-center gap-2">
          {onSwitchToGeneralMode && (
            <button
              onClick={onSwitchToGeneralMode}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Switch to General Tech ATS Builder</span>
            </button>
          )}

          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-60 cursor-pointer"
            title="Download crisp PDF file directly"
          >
            {isGeneratingPdf ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
          </button>

          <button
            onClick={handlePrintResume}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Vector Print or Save as PDF (Clean 0-blank page isolation)"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Vector Print</span>
          </button>
        </div>
      </div>

      {/* Preset Quick Selection Bar */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Quick Professional Presets:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {CA_ACCA_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleLoadPreset(preset.id)}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Alert toast */}
      {copyFeedback && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-medium flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{copyFeedback}</span>
          </div>
          <button onClick={() => setCopyFeedback(null)} className="text-emerald-400 hover:text-emerald-200">✕</button>
        </div>
      )}

      {/* Main Studio Grid: Left Controls (5 cols) & Right Live Preview (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side: Editor Panels */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Tabs */}
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800 overflow-x-auto gap-1">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 min-w-[70px] py-2 px-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'content' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Content</span>
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 min-w-[70px] py-2 px-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'templates' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Layouts</span>
            </button>
            <button
              onClick={() => setActiveTab('bullet-library')}
              className={`flex-1 min-w-[70px] py-2 px-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'bullet-library' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Bullets</span>
            </button>
            <button
              onClick={() => setActiveTab('ats')}
              className={`flex-1 min-w-[70px] py-2 px-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'ats' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ATS {atsScore}%</span>
            </button>
            <button
              onClick={() => setActiveTab('styles')}
              className={`flex-1 min-w-[70px] py-2 px-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'styles' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Styling</span>
            </button>
            <button
              onClick={() => setActiveTab('import-export')}
              className={`flex-1 min-w-[70px] py-2 px-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'import-export' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>

          {/* TAB 1: CONTENT EDITOR */}
          {activeTab === 'content' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              {/* Content Sub-Tabs */}
              <div className="flex border-b border-slate-800 pb-2 gap-1 overflow-x-auto text-xs">
                <button
                  onClick={() => setContentSubTab('personal')}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
                    contentSubTab === 'personal' ? 'bg-slate-800 text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Credentials
                </button>
                <button
                  onClick={() => setContentSubTab('qualifications')}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
                    contentSubTab === 'qualifications' ? 'bg-slate-800 text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Exam Table ({resume.qualifications?.length || 0})
                </button>
                <button
                  onClick={() => setContentSubTab('articleship')}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
                    contentSubTab === 'articleship' ? 'bg-slate-800 text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Articleship ({resume.articleship?.length || 0})
                </button>
                <button
                  onClick={() => setContentSubTab('experience')}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
                    contentSubTab === 'experience' ? 'bg-slate-800 text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Work History
                </button>
                <button
                  onClick={() => setContentSubTab('competencies')}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
                    contentSubTab === 'competencies' ? 'bg-slate-800 text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Standards & ERP
                </button>
                <button
                  onClick={() => setContentSubTab('education')}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
                    contentSubTab === 'education' ? 'bg-slate-800 text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Education
                </button>
              </div>

              {/* Sub-tab 1: Personal & Registration Credentials */}
              {contentSubTab === 'personal' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={resume.personalInfo.fullName}
                        onChange={e => setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, fullName: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-blue-500"
                        placeholder="e.g. Rohan Sharma, ACA"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Professional Title / Role</label>
                      <input
                        type="text"
                        value={resume.personalInfo.jobTitle}
                        onChange={e => setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, jobTitle: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-blue-500"
                        placeholder="e.g. Chartered Accountant | Senior Associate"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        ICAI / ACCA Reg or Membership No.
                      </label>
                      <input
                        type="text"
                        value={resume.personalInfo.regNumber || ''}
                        onChange={e => setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, regNumber: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-blue-500 font-mono"
                        placeholder="e.g. ICAI Mem: 549182 / ACCA ID: 394821"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">ACCA PER Status (if applicable)</label>
                      <input
                        type="text"
                        value={resume.personalInfo.perStatus || ''}
                        onChange={e => setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, perStatus: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-blue-500"
                        placeholder="e.g. 36 Months PER Completed (Approved Employer)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={resume.personalInfo.email}
                        onChange={e => setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, email: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={resume.personalInfo.phone}
                        onChange={e => setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, phone: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">City, Country</label>
                      <input
                        type="text"
                        value={resume.personalInfo.location}
                        onChange={e => setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, location: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">LinkedIn URL</label>
                      <input
                        type="text"
                        value={resume.personalInfo.linkedin}
                        onChange={e => setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, linkedin: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-blue-500"
                        placeholder="linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Portfolio / Website</label>
                      <input
                        type="text"
                        value={resume.personalInfo.website || ''}
                        onChange={e => setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, website: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-blue-500"
                        placeholder="myfinanceportfolio.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Professional Summary / Career Objective
                    </label>
                    <textarea
                      rows={4}
                      value={resume.personalInfo.summary}
                      onChange={e => setResume({
                        ...resume,
                        personalInfo: { ...resume.personalInfo, summary: e.target.value }
                      })}
                      className="w-full p-2.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-blue-500 leading-relaxed"
                      placeholder="Concise overview highlighting qualifications, exam attempts, articleship exposure, and regulatory proficiencies..."
                    />
                  </div>
                </div>
              )}

              {/* Sub-tab 2: Professional Qualifications & Attempt Matrix */}
              {contentSubTab === 'qualifications' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Qualifications & Exam Track</h4>
                      <p className="text-[11px] text-slate-400">Manage rows in your examination matrix table</p>
                    </div>
                    <button
                      onClick={handleAddQualification}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Exam</span>
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {resume.qualifications.map((q, index) => (
                      <div key={q.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-400">Row #{index + 1}: {q.course}</span>
                          <button
                            onClick={() => handleDeleteQualification(q.id)}
                            className="text-slate-500 hover:text-rose-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Course / Level (e.g. CA Final, ACCA SBR)"
                            value={q.course}
                            onChange={e => {
                              const updated = [...resume.qualifications];
                              updated[index].course = e.target.value;
                              setResume({ ...resume, qualifications: updated });
                            }}
                            className="px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                          />
                          <input
                            type="text"
                            placeholder="Institute / Board (e.g. ICAI, ACCA)"
                            value={q.body}
                            onChange={e => {
                              const updated = [...resume.qualifications];
                              updated[index].body = e.target.value;
                              setResume({ ...resume, qualifications: updated });
                            }}
                            className="px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="Year (e.g. May 2023)"
                            value={q.year}
                            onChange={e => {
                              const updated = [...resume.qualifications];
                              updated[index].year = e.target.value;
                              setResume({ ...resume, qualifications: updated });
                            }}
                            className="px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                          />
                          <input
                            type="text"
                            placeholder="Attempt (e.g. 1st Attempt, Both Groups)"
                            value={q.attempt}
                            onChange={e => {
                              const updated = [...resume.qualifications];
                              updated[index].attempt = e.target.value;
                              setResume({ ...resume, qualifications: updated });
                            }}
                            className="px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white font-medium text-amber-300"
                          />
                          <input
                            type="text"
                            placeholder="Marks / Rank (e.g. 61%, AIR 14)"
                            value={q.marks}
                            onChange={e => {
                              const updated = [...resume.qualifications];
                              updated[index].marks = e.target.value;
                              setResume({ ...resume, qualifications: updated });
                            }}
                            className="px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                          />
                        </div>

                        <input
                          type="text"
                          placeholder="Exemptions / Honors (e.g. Exemption in FR (74), SFM (68))"
                          value={q.exemptions || ''}
                          onChange={e => {
                            const updated = [...resume.qualifications];
                            updated[index].exemptions = e.target.value;
                            setResume({ ...resume, qualifications: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-slate-300 italic"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-tab 3: Articleship & Practical Training */}
              {contentSubTab === 'articleship' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Articleship & Practical Training</h4>
                      <p className="text-[11px] text-slate-400">Mandatory 3-year audit & accounting training records</p>
                    </div>
                    <button
                      onClick={handleAddArticleship}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Articleship</span>
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                    {resume.articleship && resume.articleship.map((art, index) => (
                      <div key={art.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-400">Firm #{index + 1}: {art.firmName}</span>
                          <button
                            onClick={() => {
                              setResume({
                                ...resume,
                                articleship: resume.articleship.filter(a => a.id !== art.id),
                              });
                            }}
                            className="text-slate-500 hover:text-rose-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">Firm Name</label>
                            <input
                              type="text"
                              value={art.firmName}
                              onChange={e => {
                                const updated = [...resume.articleship];
                                updated[index].firmName = e.target.value;
                                setResume({ ...resume, articleship: updated });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">Designation / Role</label>
                            <input
                              type="text"
                              value={art.role}
                              onChange={e => {
                                const updated = [...resume.articleship];
                                updated[index].role = e.target.value;
                                setResume({ ...resume, articleship: updated });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">Start Date</label>
                            <input
                              type="text"
                              value={art.startDate}
                              onChange={e => {
                                const updated = [...resume.articleship];
                                updated[index].startDate = e.target.value;
                                setResume({ ...resume, articleship: updated });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">End Date</label>
                            <input
                              type="text"
                              value={art.endDate}
                              onChange={e => {
                                const updated = [...resume.articleship];
                                updated[index].endDate = e.target.value;
                                setResume({ ...resume, articleship: updated });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">Location / City</label>
                            <input
                              type="text"
                              value={art.location}
                              onChange={e => {
                                const updated = [...resume.articleship];
                                updated[index].location = e.target.value;
                                setResume({ ...resume, articleship: updated });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">Department / Service Area</label>
                            <input
                              type="text"
                              value={art.department}
                              onChange={e => {
                                const updated = [...resume.articleship];
                                updated[index].department = e.target.value;
                                setResume({ ...resume, articleship: updated });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                              placeholder="e.g. Statutory Audit, Tax Audit, Transfer Pricing"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">Major Client Portfolio & Industries</label>
                            <input
                              type="text"
                              value={art.industriesAudited}
                              onChange={e => {
                                const updated = [...resume.articleship];
                                updated[index].industriesAudited = e.target.value;
                                setResume({ ...resume, articleship: updated });
                              }}
                              className="w-full px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                              placeholder="e.g. Listed FMCG ($500M turnover), Automotive, Banks"
                            />
                          </div>
                        </div>

                        {/* Bullets Manager */}
                        <div className="space-y-1.5 pt-1 border-t border-slate-900">
                          <label className="block text-[10px] text-slate-400">Responsibility & Audit Deliverables Bullets</label>
                          {art.highlights.map((bullet, bIndex) => (
                            <div key={bIndex} className="flex items-start gap-1.5">
                              <span className="text-slate-500 text-xs mt-1">•</span>
                              <textarea
                                rows={2}
                                value={bullet}
                                onChange={e => {
                                  const updated = [...resume.articleship];
                                  updated[index].highlights[bIndex] = e.target.value;
                                  setResume({ ...resume, articleship: updated });
                                }}
                                className="flex-1 p-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-slate-200"
                              />
                              <button
                                onClick={() => {
                                  const updated = [...resume.articleship];
                                  updated[index].highlights = updated[index].highlights.filter((_, i) => i !== bIndex);
                                  setResume({ ...resume, articleship: updated });
                                }}
                                className="text-slate-500 hover:text-rose-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}

                          <button
                            onClick={() => {
                              const updated = [...resume.articleship];
                              updated[index].highlights.push('New key audit accomplishment or procedural highlight.');
                              setResume({ ...resume, articleship: updated });
                            }}
                            className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 mt-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Bullet Point</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-tab 4: Corporate Work Experience */}
              {contentSubTab === 'experience' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Post-Qualification Experience</h4>
                      <p className="text-[11px] text-slate-400">For qualified CAs, ACCA members, and managers</p>
                    </div>
                    <button
                      onClick={handleAddExperience}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                    {resume.experiences && resume.experiences.map((exp, index) => (
                      <div key={exp.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-400">{exp.company}</span>
                          <button
                            onClick={() => {
                              setResume({
                                ...resume,
                                experiences: resume.experiences.filter(e => e.id !== exp.id),
                              });
                            }}
                            className="text-slate-500 hover:text-rose-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Company Name"
                            value={exp.company}
                            onChange={e => {
                              const updated = [...resume.experiences];
                              updated[index].company = e.target.value;
                              setResume({ ...resume, experiences: updated });
                            }}
                            className="px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white font-medium"
                          />
                          <input
                            type="text"
                            placeholder="Role / Title"
                            value={exp.role}
                            onChange={e => {
                              const updated = [...resume.experiences];
                              updated[index].role = e.target.value;
                              setResume({ ...resume, experiences: updated });
                            }}
                            className="px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="Start Date"
                            value={exp.startDate}
                            onChange={e => {
                              const updated = [...resume.experiences];
                              updated[index].startDate = e.target.value;
                              setResume({ ...resume, experiences: updated });
                            }}
                            className="px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                          />
                          <input
                            type="text"
                            placeholder="End Date (or Present)"
                            value={exp.endDate}
                            onChange={e => {
                              const updated = [...resume.experiences];
                              updated[index].endDate = e.target.value;
                              setResume({ ...resume, experiences: updated });
                            }}
                            className="px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                          />
                          <input
                            type="text"
                            placeholder="Location"
                            value={exp.location}
                            onChange={e => {
                              const updated = [...resume.experiences];
                              updated[index].location = e.target.value;
                              setResume({ ...resume, experiences: updated });
                            }}
                            className="px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                          />
                        </div>

                        {/* Bullets */}
                        <div className="space-y-1.5 pt-1">
                          {exp.highlights.map((bullet, bIndex) => (
                            <div key={bIndex} className="flex items-start gap-1.5">
                              <span className="text-slate-500 text-xs mt-1">•</span>
                              <textarea
                                rows={2}
                                value={bullet}
                                onChange={e => {
                                  const updated = [...resume.experiences];
                                  updated[index].highlights[bIndex] = e.target.value;
                                  setResume({ ...resume, experiences: updated });
                                }}
                                className="flex-1 p-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-slate-200"
                              />
                              <button
                                onClick={() => {
                                  const updated = [...resume.experiences];
                                  updated[index].highlights = updated[index].highlights.filter((_, i) => i !== bIndex);
                                  setResume({ ...resume, experiences: updated });
                                }}
                                className="text-slate-500 hover:text-rose-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}

                          <button
                            onClick={() => {
                              const updated = [...resume.experiences];
                              updated[index].highlights.push('Quantified business achievement or financial process improvement.');
                              setResume({ ...resume, experiences: updated });
                            }}
                            className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 mt-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Bullet Point</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-tab 5: Standards, ERP & Competencies */}
              {contentSubTab === 'competencies' && (
                <div className="space-y-4">
                  {/* Regulatory Standards */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-white">
                      Regulatory & Accounting Standards (IFRS, Ind AS, ISA)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {resume.standards.map((std, idx) => (
                        <span key={idx} className="px-2.5 py-1 text-xs rounded-lg bg-blue-950/80 border border-blue-500/30 text-blue-200 flex items-center gap-1.5">
                          <span>{std}</span>
                          <button
                            onClick={() => {
                              setResume({
                                ...resume,
                                standards: resume.standards.filter((_, i) => i !== idx),
                              });
                            }}
                            className="text-blue-400 hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        id="new-std-input"
                        placeholder="Add standard (e.g. IFRS 16 Leases, CARO 2020)"
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            const val = (e.target as HTMLInputElement).value.trim();
                            if (val) {
                              setResume({ ...resume, standards: [...resume.standards, val] });
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const el = document.getElementById('new-std-input') as HTMLInputElement;
                          if (el && el.value.trim()) {
                            setResume({ ...resume, standards: [...resume.standards, el.value.trim()] });
                            el.value = '';
                          }
                        }}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Software & ERP */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <label className="block text-xs font-bold text-white">
                      Financial ERP & Analytics Software (SAP, Tally, Advanced Excel)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {resume.software.map((sw, idx) => (
                        <span key={idx} className="px-2.5 py-1 text-xs rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 flex items-center gap-1.5">
                          <span>{sw}</span>
                          <button
                            onClick={() => {
                              setResume({
                                ...resume,
                                software: resume.software.filter((_, i) => i !== idx),
                              });
                            }}
                            className="text-emerald-400 hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        id="new-sw-input"
                        placeholder="Add software (e.g. SAP S/4HANA, Caseware)"
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white"
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            const val = (e.target as HTMLInputElement).value.trim();
                            if (val) {
                              setResume({ ...resume, software: [...resume.software, val] });
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const el = document.getElementById('new-sw-input') as HTMLInputElement;
                          if (el && el.value.trim()) {
                            setResume({ ...resume, software: [...resume.software, el.value.trim()] });
                            el.value = '';
                          }
                        }}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-tab 6: Education & Certifications */}
              {contentSubTab === 'education' && (
                <div className="space-y-4">
                  {/* Formal Education */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white">Academic Degrees (B.Com, M.Com, BBA)</h4>
                    {resume.education.map((edu, idx) => (
                      <div key={edu.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Institution / College"
                            value={edu.institution}
                            onChange={e => {
                              const updated = [...resume.education];
                              updated[idx].institution = e.target.value;
                              setResume({ ...resume, education: updated });
                            }}
                            className="px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white font-medium"
                          />
                          <input
                            type="text"
                            placeholder="Degree & Major (e.g. B.Com Hons)"
                            value={edu.degree}
                            onChange={e => {
                              const updated = [...resume.education];
                              updated[idx].degree = e.target.value;
                              setResume({ ...resume, education: updated });
                            }}
                            className="px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Years (e.g. 2019 – 2022)"
                            value={`${edu.startDate} – ${edu.endDate}`}
                            onChange={e => {
                              const updated = [...resume.education];
                              const parts = e.target.value.split('–').map(s => s.trim());
                              updated[idx].startDate = parts[0] || '';
                              updated[idx].endDate = parts[1] || '';
                              setResume({ ...resume, education: updated });
                            }}
                            className="px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                          />
                          <input
                            type="text"
                            placeholder="GPA / Marks (e.g. 8.8 CGPA)"
                            value={edu.gpa || ''}
                            onChange={e => {
                              const updated = [...resume.education];
                              updated[idx].gpa = e.target.value;
                              setResume({ ...resume, education: updated });
                            }}
                            className="px-2.5 py-1.5 text-xs rounded bg-slate-900 border border-slate-800 text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TEMPLATE ARCHITECTURES */}
          {activeTab === 'templates' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Select Accounting Resume Layout</h3>
                <p className="text-xs text-slate-400">5 bespoke architectures tuned for Big 4, corporate finance, and trainee applications</p>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {TEMPLATE_ARCHITECTURES.map((arch) => (
                  <button
                    key={arch.id}
                    onClick={() => setResume({
                      ...resume,
                      styling: { ...resume.styling, templateId: arch.id }
                    })}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                      resume.styling.templateId === arch.id
                        ? 'bg-blue-950/60 border-blue-500 shadow-md shadow-blue-500/10'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{arch.name}</span>
                        {arch.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                            {arch.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">{arch.desc}</p>
                    </div>
                    {resume.styling.templateId === arch.id && (
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CURATED BULLET LIBRARY */}
          {activeTab === 'bullet-library' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">Curated Accounting Bullet Library</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Pre-written, Big 4-standard action bullets with quantified metrics. Click "Insert" to add directly to your active experience.
                </p>
              </div>

              <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
                {CURATED_BULLETS_LIBRARY.map((cat, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-xs font-bold text-blue-300 border-b border-slate-800 pb-1">
                      {cat.category}
                    </h4>
                    <div className="space-y-2">
                      {cat.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-2">
                          <p>"{bullet}"</p>
                          <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-900">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(bullet);
                                setCopyFeedback('Bullet copied to clipboard!');
                                setTimeout(() => setCopyFeedback(null), 2500);
                              }}
                              className="px-2 py-0.5 text-[10px] font-semibold text-slate-400 hover:text-white rounded bg-slate-900 border border-slate-800 flex items-center gap-1"
                            >
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </button>
                            <button
                              onClick={() => handleInsertCuratedBullet(bullet)}
                              className="px-2.5 py-0.5 text-[10px] font-bold text-blue-300 hover:text-blue-100 rounded bg-blue-900/60 hover:bg-blue-800 border border-blue-500/30 flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Insert into Resume</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: REAL-TIME ATS AUDIT */}
          {activeTab === 'ats' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-white">Financial ATS Optimization Audit</h3>
                  <p className="text-xs text-slate-400">Scored specifically against Big 4 and financial screening algorithms</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`text-xl font-black px-3 py-1 rounded-xl border ${
                    atsScore >= 85
                      ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                      : atsScore >= 60
                      ? 'bg-amber-950/80 border-amber-500/40 text-amber-400'
                      : 'bg-rose-950/80 border-rose-500/40 text-rose-400'
                  }`}>
                    {atsScore}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    atsScore >= 85 ? 'bg-emerald-500' : atsScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${atsScore}%` }}
                />
              </div>

              {/* Audit Checklist */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recruiter Checklist</h4>
                <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                  {atsChecks.map((chk, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white flex items-center gap-1.5">
                          {chk.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-amber-400" />
                          )}
                          <span>{chk.label}</span>
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">+{chk.points} pts</span>
                      </div>
                      <p className="text-[11px] text-slate-400 pl-5.5">{chk.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: STYLING & THEMING */}
          {activeTab === 'styles' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-white">Color Palette</label>
                <div className="grid grid-cols-2 gap-2">
                  {COLOR_THEMES.map((th) => (
                    <button
                      key={th.id}
                      onClick={() => setResume({
                        ...resume,
                        styling: { ...resume.styling, colorTheme: th.id }
                      })}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                        resume.styling.colorTheme === th.id
                          ? 'border-blue-500 bg-slate-800/80'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: th.primary }} />
                      <span className="text-xs font-medium text-slate-200">{th.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800">
                <label className="block text-xs font-bold text-white">Typography Pairing</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'serif', name: 'Merriweather (Executive Serif)' },
                    { id: 'sans', name: 'Inter (Clean Sans)' },
                    { id: 'mono', name: 'Roboto Mono' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setResume({
                        ...resume,
                        styling: { ...resume.styling, fontFamily: f.id }
                      })}
                      className={`p-2 text-xs rounded-lg border text-center font-medium ${
                        resume.styling.fontFamily === f.id
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800">
                <label className="block text-xs font-bold text-white">Spacing Density</label>
                <div className="grid grid-cols-3 gap-2">
                  {['compact', 'standard', 'spacious'].map((sp) => (
                    <button
                      key={sp}
                      onClick={() => setResume({
                        ...resume,
                        styling: { ...resume.styling, spacing: sp as any }
                      })}
                      className={`p-2 text-xs capitalize rounded-lg border font-medium ${
                        resume.styling.spacing === sp
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      {sp}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800">
                <label className="block text-xs font-bold text-white">Paper Size (Print Margins)</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'a4', label: 'A4 (Global & Commonwealth CA/ACCA standard)' },
                    { id: 'letter', label: 'US Letter (North American standard)' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setResume({
                        ...resume,
                        styling: { ...resume.styling, paperSize: p.id as any }
                      })}
                      className={`p-2 text-xs rounded-lg border text-center font-medium ${
                        resume.styling.paperSize === p.id
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: IMPORT / EXPORT */}
          {activeTab === 'import-export' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Export & Backup Options</h3>
                <p className="text-xs text-slate-400">100% Client-side. No registration, no watermarks, 0 cost.</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="w-full p-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 disabled:opacity-60 cursor-pointer"
                >
                  {isGeneratingPdf ? <RefreshCw className="w-4 h-4 animate-spin text-white" /> : <Download className="w-4 h-4" />}
                  <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download Direct PDF File (.pdf)'}</span>
                </button>

                <button
                  onClick={handlePrintResume}
                  className="w-full p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-emerald-400" />
                  <span>Vector Print / Save as PDF (Clean 0-Blank Pages)</span>
                </button>

                <button
                  onClick={handleCopyPlainText}
                  className="w-full p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Plain Text ATS Resume (For Job Portals)</span>
                </button>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={handleExportJson}
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span>Save JSON Backup</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Load JSON Backup</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json"
                    className="hidden"
                    onChange={handleImportJson}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Live Visual Preview Container (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {/* Preview Toolbar */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white">Live Vector Preview</span>
              <span className="text-[10px] text-slate-400">({resume.styling.paperSize?.toUpperCase() || 'A4'})</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center rounded-lg bg-slate-950 border border-slate-800 px-1 py-0.5">
                <button
                  onClick={() => setZoomLevel(prev => Math.max(60, prev - 10))}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-slate-300 px-1.5">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Fast PDF Trigger */}
              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                title="Download PDF"
              >
                {isGeneratingPdf ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                <span>{isGeneratingPdf ? 'PDF...' : 'PDF'}</span>
              </button>
            </div>
          </div>

          {/* Printable Preview Container */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-2xl overflow-x-auto flex justify-center">
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease',
              }}
            >
              {/* The element designated for CSS print media isolation */}
              <div
                id="printable-resume"
                ref={resumePrintRef}
                className="w-[210mm] max-w-full bg-white text-slate-900 shadow-2xl relative select-text"
                style={{
                  minHeight: '297mm', // standard A4 height
                }}
              >
                {/* Visual A4 Page Boundary Guide */}
                {showPageBoundary && (
                  <div
                    className="absolute left-0 right-0 border-b border-dashed border-rose-300 pointer-events-none no-print flex justify-end px-3"
                    style={{ top: '297mm' }}
                  >
                    <span className="text-[9px] font-mono bg-rose-100 text-rose-600 px-1 py-0.2 rounded -mt-2.5">
                      A4 Page 1 End
                    </span>
                  </div>
                )}

                {/* Render Selected CA & ACCA Template */}
                <CaAccaTemplateRenderer
                  resume={resume}
                  currentTheme={currentTheme}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
