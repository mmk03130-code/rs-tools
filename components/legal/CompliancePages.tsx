import React, { useState, useEffect } from 'react';
import {
  X, ShieldCheck, FileText, Lock, Globe, Check, Copy,
  Printer, ArrowRight, AlertCircle, Scale, Database, EyeOff
} from 'lucide-react';

export type ComplianceTab = 'privacy' | 'terms';

interface CompliancePagesProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: ComplianceTab;
}

export const CompliancePages: React.FC<CompliancePagesProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<ComplianceTab>(initialTab);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopySummary = () => {
    const summary = activeTab === 'privacy'
      ? `RS tools Privacy Policy Summary:\n• 100% Client-Side Processing: All files (PDFs, images, resumes, code) are processed locally in your browser memory.\n• Zero Server Storage: No files are uploaded, cached, or transferred to any remote servers or cloud buckets.\n• AdSense & Cookie Compliance: Google AdSense standard non-personal advertising cookies apply. Local storage is strictly used for UI theme preferences.`
      : `RS tools Terms of Service Summary:\n• 100% Free & Open: Permitted for personal, academic, and commercial usage.\n• Full User Ownership: You retain 100% ownership and copyright over all files, resumes, and assets generated.\n• Disclaimers: Provided AS-IS with zero warranties under the MIT license framework.`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compliance-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Main modal sheet container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 transition-all text-slate-100 light:text-slate-900">
        {/* Top Header */}
        <div className="relative px-6 py-5 border-b border-slate-800 light:border-slate-200 bg-slate-950/60 light:bg-slate-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="compliance-modal-title" className="text-base sm:text-lg font-bold tracking-tight text-white light:text-slate-900">
                  Legal & Compliance Center
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <ShieldCheck className="w-3 h-3" />
                  GDPR & AdSense Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
                Official Data Protection Standards, Privacy Disclosures & Service Terms
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              title="Copy Summary"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 light:bg-slate-200 hover:bg-slate-700 light:hover:bg-slate-300 text-slate-300 light:text-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white light:hover:text-slate-900 hover:bg-slate-800 light:hover:bg-slate-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 pb-0 bg-slate-950/40 light:bg-slate-100/60 border-b border-slate-800/80 light:border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'privacy'
                  ? 'border-blue-500 text-blue-400 light:text-blue-600 bg-slate-900/50 light:bg-white rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Compliance Privacy Policy</span>
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'terms'
                  ? 'border-blue-500 text-blue-400 light:text-blue-600 bg-slate-900/50 light:bg-white rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200 light:text-slate-600 light:hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Terms of Service</span>
            </button>
          </div>

          <span className="text-[11px] text-slate-500 font-mono hidden md:inline">
            Effective: October 2026
          </span>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 font-sans text-xs sm:text-sm leading-relaxed text-slate-300 light:text-slate-700">
          {activeTab === 'privacy' ? (
            /* =================== PRIVACY POLICY =================== */
            <div className="space-y-6">
              {/* Highlight Card: Zero Server Upload Guarantee */}
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 light:text-emerald-900">
                <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base text-emerald-400 light:text-emerald-800 mb-2">
                  <Lock className="w-4 h-4" />
                  <span>The RS tools Air-Gapped Zero-Server Processing Guarantee</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-emerald-200/90 light:text-emerald-950 font-normal">
                  All 50+ utilities hosted on RS tools—including our Image Compressor, Background Remover, PDF Merger, PDF Splitter, Resume Engine, and Developer Cryptographic Hashers—execute <strong>100% locally within your client browser session</strong>. Your uploaded documents, confidential tax forms, private photos, source code snippets, and generated resumes are <strong>never transferred across the public internet, cached on server disks, or stored in remote cloud databases</strong>. When your browser tab closes, all allocated working memory buffers are wiped instantaneously.
                </p>
              </div>

              {/* Section 1 */}
              <section className="space-y-2.5">
                <h3 className="text-sm sm:text-base font-bold text-white light:text-slate-900 flex items-center gap-2">
                  <span className="text-blue-400 font-mono text-xs">1.0</span>
                  <span>Data Protection & Zero-Storage Architecture</span>
                </h3>
                <p>
                  At RS tools, privacy is not merely a policy statement; it is fundamental to our software architecture. Unlike conventional web applications that upload your files to server-side processing queues (e.g., AWS S3, Google Cloud Storage, or private microservices), our platform employs modern client-side Web Standards including:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-400 light:text-slate-600">
                  <li><strong>HTML5 Canvas 2D & WebGL Subsystems:</strong> Image resizing, format conversion, cropping, and color extraction execute purely on your local graphics processor.</li>
                  <li><strong>WebAssembly (WASM) & Bytecode Engines:</strong> Binary PDF parsing, page extraction, splitting, and merging utilize in-memory <code className="text-blue-300 font-mono text-xs">pdf-lib</code> pipelines without server mediation.</li>
                  <li><strong>W3C Web Cryptography API:</strong> Hash generation (SHA-256, MD5) and UUID v4 calculations execute via browser hardware entropy without sending strings to external APIs.</li>
                </ul>
                <p>
                  Because no file upload endpoints exist on our servers, it is architecturally impossible for our engineering team or any unauthorized third party to intercept, view, or retain your proprietary data.
                </p>
              </section>

              {/* Section 2 */}
              <section className="space-y-2.5">
                <h3 className="text-sm sm:text-base font-bold text-white light:text-slate-900 flex items-center gap-2">
                  <span className="text-blue-400 font-mono text-xs">2.0</span>
                  <span>Cookies, Local Storage & Advertising Compliance (Google AdSense)</span>
                </h3>
                <p>
                  To keep all 50+ utilities completely free without requiring subscriptions or paid account tiers, RS tools partners with third-party advertising vendors, including Google AdSense. In compliance with the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), and ePrivacy directives, we clearly delineate our usage of browser storage:
                </p>
                <div className="space-y-3 pt-1">
                  <div className="p-3.5 rounded-lg bg-slate-950/60 light:bg-slate-100 border border-slate-800/80 light:border-slate-200">
                    <h4 className="font-semibold text-xs text-slate-200 light:text-slate-800 mb-1">
                      First-Party Browser Local Storage (Functional Only)
                    </h4>
                    <p className="text-xs text-slate-400 light:text-slate-600">
                      We store strictly functional preferences directly on your device via <code className="font-mono text-blue-300 text-xs">localStorage</code>: specifically your chosen color theme (<code className="font-mono text-xs">rstools_theme: 'dark' | 'light'</code>) and your bookmarked tool IDs (<code className="font-mono text-xs">rstools_favorites</code>). No personally identifiable information (PII) is ever recorded.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-950/60 light:bg-slate-100 border border-slate-800/80 light:border-slate-200">
                    <h4 className="font-semibold text-xs text-slate-200 light:text-slate-800 mb-1">
                      Third-Party Advertising Cookies (Google AdSense & Certified Partners)
                    </h4>
                    <p className="text-xs text-slate-400 light:text-slate-600">
                      Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites across the internet. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our sites and/or other sites on the Internet.
                    </p>
                  </div>
                </div>
                <p className="pt-1">
                  Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">Google Ads Settings</a> or by navigating to <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">www.aboutads.info</a>.
                </p>
              </section>

              {/* Section 3 */}
              <section className="space-y-2.5">
                <h3 className="text-sm sm:text-base font-bold text-white light:text-slate-900 flex items-center gap-2">
                  <span className="text-blue-400 font-mono text-xs">3.0</span>
                  <span>Analytics & Performance Auditing</span>
                </h3>
                <p>
                  We are obsessed with achieving and maintaining a 100/100 Google Lighthouse performance score. To monitor server delivery latency and edge CDN caching, our web server may log standard anonymous HTTP headers (such as user-agent and request status code). We do not conduct user fingerprinting, keystroke recording, session replays, or invasive behavioural tracking.
                </p>
              </section>

              {/* Section 4 */}
              <section className="space-y-2.5">
                <h3 className="text-sm sm:text-base font-bold text-white light:text-slate-900 flex items-center gap-2">
                  <span className="text-blue-400 font-mono text-xs">4.0</span>
                  <span>Data Subject Rights (GDPR & CCPA/CPRA)</span>
                </h3>
                <p>
                  Because RS tools does not store, process, or sell your personal files or credentials on servers, we do not maintain databases of personal records to rectify, delete, or export. If you have questions regarding privacy compliance or wish to submit a data protection inquiry, contact our compliance team at <code className="font-mono text-blue-400 text-xs">privacy@rs-tools.app</code>.
                </p>
              </section>
            </div>
          ) : (
            /* =================== TERMS OF SERVICE =================== */
            <div className="space-y-6">
              {/* Highlight Card */}
              <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-300 light:text-blue-900">
                <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base text-blue-400 light:text-blue-800 mb-2">
                  <Scale className="w-4 h-4" />
                  <span>Fair Use, Zero Paywalls & User Ownership</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-blue-200/90 light:text-blue-950 font-normal">
                  RS tools is distributed as an open utility platform built to provide free, high-performance developer, PDF, and image operations. You retain <strong>100% full ownership, intellectual property rights, and copyright</strong> over any document, resume, modified image, or script generated through our service.
                </p>
              </div>

              {/* Section 1 */}
              <section className="space-y-2.5">
                <h3 className="text-sm sm:text-base font-bold text-white light:text-slate-900 flex items-center gap-2">
                  <span className="text-blue-400 font-mono text-xs">1.0</span>
                  <span>Acceptance of Terms</span>
                </h3>
                <p>
                  By accessing or utilizing any web service, utility, or component within RS tools (accessible at rs-tools.app and related subdomains), you agree to be bound by these Terms of Service. If you do not agree with any provision of these terms, your sole remedy is to cease utilizing the platform.
                </p>
              </section>

              {/* Section 2 */}
              <section className="space-y-2.5">
                <h3 className="text-sm sm:text-base font-bold text-white light:text-slate-900 flex items-center gap-2">
                  <span className="text-blue-400 font-mono text-xs">2.0</span>
                  <span>Permitted Usage & License</span>
                </h3>
                <p>
                  Subject to your compliance with these terms, RS tools grants you a non-exclusive, worldwide, royalty-free license to use the tools for personal, academic, non-profit, and commercial purposes. You may freely use our Resume Builder to create and download job applications, convert company PDF invoices, compress web graphics for production websites, and encode data streams.
                </p>
              </section>

              {/* Section 3 */}
              <section className="space-y-2.5">
                <h3 className="text-sm sm:text-base font-bold text-white light:text-slate-900 flex items-center gap-2">
                  <span className="text-blue-400 font-mono text-xs">3.0</span>
                  <span>User Responsibility & Lawful Processing</span>
                </h3>
                <p>
                  Because all processing occurs within your browser runtime without server validation, you are solely responsible for ensuring that the files and content you manipulate do not violate applicable local or international laws, infringe on third-party intellectual property, or contain malicious software.
                </p>
              </section>

              {/* Section 4 */}
              <section className="space-y-2.5">
                <h3 className="text-sm sm:text-base font-bold text-white light:text-slate-900 flex items-center gap-2">
                  <span className="text-blue-400 font-mono text-xs">4.0</span>
                  <span>Disclaimer of Warranties & Limitation of Liability</span>
                </h3>
                <p>
                  RS tools is provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind, whether express, implied, statutory, or otherwise, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. Under no circumstances shall RS tools, its contributors, or maintainers be liable for any indirect, incidental, consequential, or punitive damages arising from the use of or inability to use the platform.
                </p>
              </section>

              {/* Section 5 */}
              <section className="space-y-2.5">
                <h3 className="text-sm sm:text-base font-bold text-white light:text-slate-900 flex items-center gap-2">
                  <span className="text-blue-400 font-mono text-xs">5.0</span>
                  <span>Third-Party Services & Advertisements</span>
                </h3>
                <p>
                  Our website may feature advertisements and affiliate elements served by third parties such as Google AdSense. RS tools does not endorse or assume responsibility for products, content, or practices of third-party advertisers. Your interactions with advertisers are governed solely by their respective terms and privacy policies.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-4 bg-slate-950/80 light:bg-slate-50 border-t border-slate-800 light:border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 text-slate-400 light:text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Zero Server Footprint Active</span>
            </span>
            <span>·</span>
            <button
              onClick={handlePrint}
              className="hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Policy</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md hover:shadow-blue-500/25"
          >
            I Acknowledge & Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export const ComplianceModal = CompliancePages;
export default CompliancePages;
