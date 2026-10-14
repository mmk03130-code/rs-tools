// Curated Suite of 8 Distinct Architecture Templates for CA, ACCA, and Finance
export interface TemplateMeta {
  id: string; // Unique architecture slug
  code: string; // Short badge code, e.g. 'AUDIT', 'TAX', 'CORP', etc.
  name: string;
  category: 'Finance / Audit' | 'CA / ACCA' | 'Executive' | 'Modern' | 'Minimal';
  atsFriendly: boolean;
  desc: string;
  badge?: string;
  focusArea?: string;
}

export const TEMPLATES_47_CATALOG: TemplateMeta[] = [
  {
    id: 'audit-exec',
    code: 'AUDIT',
    name: 'The Big-4 Audit Executive',
    category: 'Finance / Audit',
    atsFriendly: true,
    desc: 'Deep navy consulting and assurance framework modeled on Big-4 standards. Features dedicated articleship breakdown, ISA assertion tags, and audited client sector metrics.',
    badge: 'Assurance Lead',
    focusArea: 'Statutory Audit, ISA, Assurance'
  },
  {
    id: 'tax-advisory',
    code: 'TAX',
    name: 'Chartered Tax & Fiscal Counsel',
    category: 'CA / ACCA',
    atsFriendly: true,
    desc: 'Authoritative tax practitioner structure with registration badges, corporate tax structuring, transfer pricing documentation, and direct/indirect litigation track record.',
    badge: 'Fiscal Counsel',
    focusArea: 'Corporate Tax, GST, Appellate Law'
  },
  {
    id: 'corp-controller',
    code: 'CORP',
    name: 'Corporate Financial Controller',
    category: 'Modern',
    atsFriendly: false,
    desc: 'Dual-column executive presentation with slate/navy credentials sidebar, IFRS reporting governance, EBITDA stewardship, and month-end close velocity metrics.',
    badge: 'Controllership',
    focusArea: 'Financial Control, IFRS, Board Reporting'
  },
  {
    id: 'acca-analyst',
    code: 'ACCA',
    name: 'ACCA Global Financial Analyst',
    category: 'CA / ACCA',
    atsFriendly: true,
    desc: 'Contemporary international format tailored for ACCA members and global finance analysts. Highlights UK GAAP, multi-currency consolidations, and strategic business leadership.',
    badge: 'International',
    focusArea: 'UK GAAP, Multi-Currency, M&A'
  },
  {
    id: 'ma-treasury',
    code: 'M&A',
    name: 'Investment Banking & Treasury Advisory',
    category: 'Executive',
    atsFriendly: true,
    desc: 'Prestigious serif typography inspired by top-tier investment banking boutiques. Features transaction milestones, DCF valuation multiples, and capital structuring tables.',
    badge: 'M&A Capital',
    focusArea: 'Valuation, DCF, Debt Advisory'
  },
  {
    id: 'risk-assurance',
    code: 'RISK',
    name: 'Risk Governance, SOX & Internal Audit',
    category: 'Finance / Audit',
    atsFriendly: true,
    desc: 'Risk matrix and governance layout detailing Sarbanes-Oxley (SOX 404) compliance, ICFR testing, forensic investigations, and internal control deficiency remediation.',
    badge: 'Governance & SOX',
    focusArea: 'SOX 404, ICFR, Forensic Audit'
  },
  {
    id: 'clean-ats',
    code: 'ATS',
    name: 'Pristine Minimalist Linear ATS',
    category: 'Minimal',
    atsFriendly: true,
    desc: '100% Taleo, Workday, and Greenhouse parser-certified linear structure. Standardized semantic headings, zero floating tables, and optimal machine scanner readability.',
    badge: 'Universal ATS',
    focusArea: 'Universal ATS Scanners'
  },
  {
    id: 'cfo-partner',
    code: 'CFO',
    name: 'Executive CFO & Practice Partner',
    category: 'Executive',
    atsFriendly: false,
    desc: 'Prestigious C-suite portfolio with strategic financial transformation summary, key corporate metrics grid, capital allocation record, and board advisory credentials.',
    badge: 'C-Suite Lead',
    focusArea: 'CFO, Board Advisory, EBITDA Scaling'
  }
];

export const TEMPLATE_CATEGORIES: string[] = [
  'All',
  'Finance / Audit',
  'CA / ACCA',
  'Executive',
  'Modern',
  'Minimal'
];
