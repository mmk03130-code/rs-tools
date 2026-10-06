import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCode, Search, Globe } from 'lucide-react';
import { TOOLS_LIST } from '../data/toolsList';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'xml' | 'jsonld'>('xml');

  if (!isOpen) return null;

  const baseUrl = window.location.origin || 'https://rs-tools.app';
  const currentDate = new Date().toISOString().split('T')[0];

  // Generate XML Sitemap dynamically
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${TOOLS_LIST.map(
  tool => `  <url>
    <loc>${baseUrl}/#/${tool.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${tool.featured ? '0.9' : '0.8'}</priority>
  </url>`
).join('\n')}
</urlset>`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'RS tools',
    url: baseUrl,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All Modern Browsers',
    description: '50+ free online web utilities including image compression, PDF merge/split, ATS resume builder, and developer tools.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    softwareRequirements: 'HTML5, JavaScript, WebAssembly',
    hasPart: TOOLS_LIST.map(tool => ({
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.description,
      applicationCategory: tool.category,
      url: `${baseUrl}/#/${tool.id}`,
    })),
  };

  const copyContent = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSitemap = () => {
    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Next-Gen SEO & XML Sitemap</h3>
              <p className="text-xs text-slate-400">
                Auto-indexed 50+ tool endpoints with Schema.org WebApplication structured data.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 pt-4 flex items-center justify-between gap-4 border-b border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('xml')}
              className={`px-3 py-2 text-xs font-medium rounded-t-lg border-b-2 transition-colors ${
                activeTab === 'xml'
                  ? 'border-blue-500 text-blue-400 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              sitemap.xml ({TOOLS_LIST.length + 1} URLs)
            </button>
            <button
              onClick={() => setActiveTab('jsonld')}
              className={`px-3 py-2 text-xs font-medium rounded-t-lg border-b-2 transition-colors ${
                activeTab === 'jsonld'
                  ? 'border-blue-500 text-blue-400 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Schema.org JSON-LD
            </button>
          </div>

          <div className="flex items-center gap-2 pb-2">
            <button
              onClick={() => copyContent(activeTab === 'xml' ? sitemapXml : JSON.stringify(jsonLd, null, 2))}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors inline-flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            {activeTab === 'xml' && (
              <button
                onClick={downloadSitemap}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download sitemap.xml</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Box */}
        <div className="flex-1 p-6 overflow-y-auto font-mono text-xs text-slate-300 bg-slate-950/70">
          <pre className="whitespace-pre-wrap break-all leading-relaxed">
            {activeTab === 'xml' ? sitemapXml : JSON.stringify(jsonLd, null, 2)}
          </pre>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
          <span>Search engines auto-crawl URLs and schema rich snippets automatically.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
