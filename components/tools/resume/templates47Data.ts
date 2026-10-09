// 47 Professional Layout Definitions for CA, ACCA, and Finance CV Studio
export interface TemplateMeta {
  id: string; // 'T-01' to 'T-47'
  name: string;
  category: 'Professional' | 'Modern' | 'Minimal' | 'Executive' | 'Student' | 'CA / ACCA' | 'Finance / Audit' | 'Creative' | 'Academic';
  atsFriendly: boolean;
  desc: string;
  badge?: string;
}

export const TEMPLATES_47_CATALOG: TemplateMeta[] = [
  {
    id: 'T-01',
    name: 'Classic Corporate',
    category: 'Professional',
    atsFriendly: true,
    desc: 'Traditional single-column layout with horizontal rule separators and conservative typography.',
    badge: 'Standard'
  },
  {
    id: 'T-02',
    name: 'Modern Two Column',
    category: 'Modern',
    atsFriendly: false,
    desc: 'Distinct 40/60 two-column split with top navy header and dedicated contact/competency sidebar.'
  },
  {
    id: 'T-03',
    name: 'Left Sidebar',
    category: 'Modern',
    atsFriendly: false,
    desc: 'Strong dark vertical sidebar with top circular portrait, contact details, and tight-side main body.'
  },
  {
    id: 'T-04',
    name: 'Right Sidebar',
    category: 'Professional',
    atsFriendly: false,
    desc: 'Asymmetric inverted structure with wide left experience area and right credentials sidebar.'
  },
  {
    id: 'T-05',
    name: 'Minimal ATS',
    category: 'Minimal',
    atsFriendly: true,
    desc: 'Clean single column with centered header, minimal lines and high scanner readability.'
  },
  {
    id: 'T-06',
    name: 'Modern ATS',
    category: 'Modern',
    atsFriendly: true,
    desc: 'Left-aligned header with subtle dividers, clear section headings, and machine-safe bullets.'
  },
  {
    id: 'T-07',
    name: 'Executive',
    category: 'Executive',
    atsFriendly: false,
    desc: 'Executive-level CV with large serif typography, generous margins, and board leadership statement callout.'
  },
  {
    id: 'T-08',
    name: 'Finance Executive',
    category: 'Finance / Audit',
    atsFriendly: false,
    desc: 'Financial operations presentation with structured KPI blocks and corporate finance credentials.'
  },
  {
    id: 'T-09',
    name: 'Accounting Professional',
    category: 'CA / ACCA',
    atsFriendly: false,
    desc: 'Certification-focused layout with ICAP, ACCA, and CMA credentials prominently pinned at the top.'
  },
  {
    id: 'T-10',
    name: 'Audit Professional',
    category: 'Finance / Audit',
    atsFriendly: false,
    desc: 'Audit & assurance layout highlighting ISA testing assertions and practical client engagement records.'
  },
  {
    id: 'T-11',
    name: 'Tax Professional',
    category: 'Finance / Audit',
    atsFriendly: false,
    desc: 'Specialized direct and indirect tax law layout with compliance badges and litigation exposure.'
  },
  {
    id: 'T-12',
    name: 'Big Four Style',
    category: 'Professional',
    atsFriendly: true,
    desc: 'Clean consulting-inspired design with high information density, crisp typography, and Big 4 hierarchy.'
  },
  {
    id: 'T-13',
    name: 'Consulting',
    category: 'Professional',
    atsFriendly: true,
    desc: 'Management consulting format (McKinsey/BCG style) emphasizing quantitative impact and case leadership.'
  },
  {
    id: 'T-14',
    name: 'Financial Analyst',
    category: 'Finance / Audit',
    atsFriendly: false,
    desc: 'Analytical visual hierarchy with prominent quantitative modeling skills and financial data sections.'
  },
  {
    id: 'T-15',
    name: 'Investment Banking',
    category: 'Finance / Audit',
    atsFriendly: true,
    desc: 'Dense Wall Street financial analyst format with tight margins and transaction/valuation emphasis.'
  },
  {
    id: 'T-16',
    name: 'Graduate',
    category: 'Student',
    atsFriendly: false,
    desc: 'Fresh graduate focused layout: Education and academic honors appear first before experience.'
  },
  {
    id: 'T-17',
    name: 'CA Student',
    category: 'CA / ACCA',
    atsFriendly: false,
    desc: 'Designed specifically for ICAP CA students: Highlights PRC/CAF stages, attempts, CRN, and FTS batch.',
    badge: 'Popular'
  },
  {
    id: 'T-18',
    name: 'ACCA Student',
    category: 'CA / ACCA',
    atsFriendly: false,
    desc: 'Designed specifically for ACCA students & affiliates: Highlights Applied Knowledge, Skills & Strategic Professional.'
  },
  {
    id: 'T-19',
    name: 'Internship',
    category: 'Student',
    atsFriendly: false,
    desc: 'Designed for internship & articleship applicants: Prioritizes education, core skills, and extracurriculars.'
  },
  {
    id: 'T-20',
    name: 'Academic',
    category: 'Academic',
    atsFriendly: true,
    desc: 'Academic & faculty fellow CV format: Education near top, scholarly typography, and research/teaching credentials.'
  },
  {
    id: 'T-21',
    name: 'Timeline',
    category: 'Modern',
    atsFriendly: false,
    desc: 'Experience and education are structured in a continuous vertical timeline with node connectors and milestone dots.'
  },
  {
    id: 'T-22',
    name: 'Split Header',
    category: 'Modern',
    atsFriendly: false,
    desc: 'Header divided into two distinct visual areas: Left side has Name & Subtitle, Right side has Contact Matrix.'
  },
  {
    id: 'T-23',
    name: 'Centered Profile',
    category: 'Modern',
    atsFriendly: false,
    desc: 'Centered profile header with centered photo, centered title tagline, and structured body below.'
  },
  {
    id: 'T-24',
    name: 'Editorial',
    category: 'Creative',
    atsFriendly: false,
    desc: 'Magazine/journal editorial typography: Prominent serif display headline, generous whitespace, stylized quotes.'
  },
  {
    id: 'T-25',
    name: 'Compact Professional',
    category: 'Minimal',
    atsFriendly: false,
    desc: 'Highly compact, space-efficient 2-column layout designed for experienced candidates with multiple credentials.'
  },
  {
    id: 'T-26',
    name: 'Premium Monochrome',
    category: 'Minimal',
    atsFriendly: true,
    desc: 'High-contrast Swiss Black & White typography masterpiece. Zero color, pure typographic elegance.'
  },
  {
    id: 'T-27',
    name: 'Color Block',
    category: 'Creative',
    atsFriendly: false,
    desc: 'Uses an architectural structural color block spanning the left corner and header, altering page composition.'
  },
  {
    id: 'T-28',
    name: 'Top Band',
    category: 'Modern',
    atsFriendly: false,
    desc: 'Large bold header band with integrated contact pill chips and photo badge, transitioning into a clean 2-column body.'
  },
  {
    id: 'T-29',
    name: 'Card Based',
    category: 'Modern',
    atsFriendly: false,
    desc: 'Modular card containers for each section with clean borders, shadow-2xs, and distinct section titles.'
  },
  {
    id: 'T-30',
    name: 'Grid Professional',
    category: 'Modern',
    atsFriendly: false,
    desc: 'Modular grid matrix layout: 2x2 structured sections for qualifications, academics, skills, and experience.'
  },
  {
    id: 'T-31',
    name: 'Asymmetric',
    category: 'Modern',
    atsFriendly: true,
    desc: 'Modern asymmetric layout with 35% Left / 65% Right structural division and clean typography.'
  },
  {
    id: 'T-32',
    name: 'Creative Professional',
    category: 'Creative',
    atsFriendly: false,
    desc: 'Modern Fintech / Tech-Accounting format with rounded tag capsules, dark accents, and contemporary layout.'
  },
  {
    id: 'T-33',
    name: 'International',
    category: 'Professional',
    atsFriendly: false,
    desc: 'Global corporate format with international cross-border reporting & IFRS standardization layout.'
  },
  {
    id: 'T-34',
    name: 'European Style',
    category: 'Professional',
    atsFriendly: false,
    desc: 'Europass/European-inspired curriculum vitae structure with dedicated Personal Information block and CEFR language matrix.'
  },
  {
    id: 'T-35',
    name: 'Modern Minimal',
    category: 'Minimal',
    atsFriendly: true,
    desc: 'Ultra-clean typography, generous whitespace, understated elegance, zero clutter.'
  },
  {
    id: 'T-36',
    name: 'Data / Analytics',
    category: 'Finance / Audit',
    atsFriendly: false,
    desc: 'Designed for finance/data/analytical candidates: Technical software competencies (Power BI, Python, SQL, Advanced Excel) highlighted.'
  },
  {
    id: 'T-37',
    name: 'Management Trainee',
    category: 'Student',
    atsFriendly: false,
    desc: 'Designed for MT / Leadership programs: Academics, leadership roles, case competitions, and potential prioritized.'
  },
  {
    id: 'T-38',
    name: 'Experienced Accountant',
    category: 'Professional',
    atsFriendly: false,
    desc: 'Heavy practical experience focus: GL, financial reporting, and ERP operations dominate, education condensed.'
  },
  {
    id: 'T-39',
    name: 'Senior Finance',
    category: 'Executive',
    atsFriendly: false,
    desc: 'CFO / Head of Finance format: Corporate governance, capital structure, and multi-entity consolidation prioritized.'
  },
  {
    id: 'T-40',
    name: 'Photo Modern',
    category: 'Modern',
    atsFriendly: false,
    desc: 'Photo plays a meaningful structural role: Asymmetric floating portrait card on left anchoring the entire modern layout.'
  },
  {
    id: 'T-41',
    name: 'No Photo Professional',
    category: 'Professional',
    atsFriendly: false,
    desc: 'Intentionally photo-free clean corporate layout with expansive text width and conservative typography.'
  },
  {
    id: 'T-42',
    name: 'Portfolio Style',
    category: 'Creative',
    atsFriendly: false,
    desc: 'Portfolio-inspired professional CV: Highlights client case engagements, audit projects, and advisory deliverables in card grids.'
  },
  {
    id: 'T-43',
    name: 'Professional Resume',
    category: 'Professional',
    atsFriendly: true,
    desc: 'American-style standard 1-page/2-page executive resume format with achievement-driven bullets and clean line separators.'
  },
  {
    id: 'T-44',
    name: 'ATS Advanced',
    category: 'Professional',
    atsFriendly: true,
    desc: 'Pure machine-parser compliant resume: Zero icons, zero sidebars, semantic hierarchy, standard margins.'
  },
  {
    id: 'T-45',
    name: 'ATS Executive',
    category: 'Executive',
    atsFriendly: true,
    desc: 'ATS-compliant Executive Resume: High machine readability, executive summary section, leadership bullets.'
  },
  {
    id: 'T-46',
    name: 'ATS Finance',
    category: 'Finance / Audit',
    atsFriendly: true,
    desc: 'Finance & Audit-specialized ATS format for accounting, treasury, and compliance applications.'
  },
  {
    id: 'T-47',
    name: 'ATS CA / ACCA',
    category: 'CA / ACCA',
    atsFriendly: true,
    desc: 'Specialized machine-readable format for CA & ACCA articleship, audit, tax, and accounting trainees.'
  }
];
