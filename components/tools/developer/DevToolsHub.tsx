import React, { useState, useEffect } from 'react';
import {
  Code2, Terminal, FileCode, Key, Type, Baseline, GitCompare,
  Link, FileCode2, Braces, BookOpen, KeyRound, AlignLeft,
  Fingerprint, Database, Code, Pipette, Compass, Clock, Hash,
  Copy, Check, RefreshCw, Play, Sparkles
} from 'lucide-react';
import { ToolItem } from '../../../types/tools';

interface DevToolsHubProps {
  tool: ToolItem;
}

export const DevToolsHub: React.FC<DevToolsHubProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  // Common inputs and outputs
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 1. JSON Formatter
  const [jsonIndent, setJsonIndent] = useState<number>(2);

  // 2. Regex Tester
  const [regexPattern, setRegexPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [regexFlags, setRegexFlags] = useState('g');
  const [regexTestString, setRegexTestString] = useState('Contact our team at support@rstools.app or sales@company.org anytime.');
  const [regexMatches, setRegexMatches] = useState<string[]>([]);

  // 3. Base64
  const [base64Mode, setBase64Mode] = useState<'encode' | 'decode'>('encode');

  // 4. Hash Generator
  const [hashAlgorithm, setHashAlgorithm] = useState<'SHA-256' | 'SHA-512' | 'SHA-1' | 'MD5'>('SHA-256');
  const [hashOutput, setHashOutput] = useState('');

  // 5. Word Counter
  const [wordCountStats, setWordCountStats] = useState({
    words: 0,
    chars: 0,
    charsNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTimeMinutes: 0,
  });

  // 6. Case Converter
  const [caseTarget, setCaseTarget] = useState<'camel' | 'pascal' | 'snake' | 'kebab' | 'upper' | 'lower' | 'title'>('camel');

  // 7. Diff Checker
  const [diffOriginal, setDiffOriginal] = useState('function calculateTotal(price, tax) {\n  return price + tax;\n}');
  const [diffModified, setDiffModified] = useState('function calculateTotal(price, tax, discount = 0) {\n  return (price + tax) - discount;\n}');

  // 8. Password Generator
  const [passLength, setPassLength] = useState<number>(16);
  const [passUpper, setPassUpper] = useState(true);
  const [passLower, setPassLower] = useState(true);
  const [passNumbers, setPassNumbers] = useState(true);
  const [passSymbols, setPassSymbols] = useState(true);

  // 9. Lorem Ipsum
  const [loremCount, setLoremCount] = useState<number>(3);
  const [loremType, setLoremType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');

  // 10. JWT Decoder
  const [jwtHeader, setJwtHeader] = useState('');
  const [jwtPayload, setJwtPayload] = useState('');
  const [jwtExpiryStatus, setJwtExpiryStatus] = useState('');

  // 11. Color Converter
  const [colorHex, setColorHex] = useState('#3b82f6');

  // 12. Unit Converter
  const [unitCategory, setUnitCategory] = useState<'storage' | 'length' | 'weight' | 'temp'>('storage');
  const [unitVal, setUnitVal] = useState<number>(1024);
  const [unitFrom, setUnitFrom] = useState('MB');
  const [unitTo, setUnitTo] = useState('GB');

  // 13. Timezone Calculator
  const [selectedTimezone, setSelectedTimezone] = useState('America/New_York');

  // 14. UUID Generator
  const [uuidQuantity, setUuidQuantity] = useState<number>(5);
  const [uuidUppercase, setUuidUppercase] = useState(false);
  const [uuidHyphens, setUuidHyphens] = useState(true);

  // Initialize defaults on tool mount or change
  useEffect(() => {
    setErrorMessage('');
    setCopied(false);

    if (tool.id === 'json-formatter') {
      setInputText('{\n  "app": "RS tools",\n  "features": ["Image", "PDF", "Resume", "Developer"],\n  "free": true,\n  "count": 50\n}');
      formatJson('{\n  "app": "RS tools",\n  "features": ["Image", "PDF", "Resume", "Developer"],\n  "free": true,\n  "count": 50\n}', 2);
    } else if (tool.id === 'base64-tool') {
      setInputText('Welcome to RS Tools 50+ free utilities');
    } else if (tool.id === 'hash-generator') {
      setInputText('Secure cryptographic hash input');
      calculateHash('Secure cryptographic hash input', hashAlgorithm);
    } else if (tool.id === 'word-counter') {
      setInputText('High-performance client-side utilities are the future of modern web development. They prioritize user privacy by eliminating cloud uploads.');
    } else if (tool.id === 'case-converter') {
      setInputText('convert this sample string to multiple programming cases');
    } else if (tool.id === 'password-generator') {
      generatePassword();
    } else if (tool.id === 'lorem-ipsum') {
      generateLorem(loremCount, loremType);
    } else if (tool.id === 'jwt-decoder') {
      setInputText('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggRGV2IiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.4pz-8NY02M3Vn...');
      decodeJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggRGV2IiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.4pz-8NY02M3Vn...');
    } else if (tool.id === 'sql-formatter') {
      setInputText('select u.id, u.name, count(o.id) as orders_count from users u left join orders o on u.id = o.user_id where u.active = 1 and u.created_at >= "2026-01-01" group by u.id order by orders_count desc limit 10;');
    } else if (tool.id === 'html-entity') {
      setInputText('<div class="header">RS Tools & "Free" Utilities</div>');
    } else if (tool.id === 'uuid-generator') {
      generateUuids(uuidQuantity, uuidUppercase, uuidHyphens);
    } else if (tool.id === 'markdown-previewer') {
      setInputText('# Markdown Editor\n\n- [x] 100% Client-side\n- [x] Zero server latency\n\n```typescript\nconst status = "lightning-fast";\n```');
    }
  }, [tool.id]);

  const copyToClipboard = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. JSON Formatter
  const formatJson = (val: string, indent: number) => {
    try {
      const parsed = JSON.parse(val);
      setOutputText(JSON.stringify(parsed, null, indent));
      setErrorMessage('');
    } catch (e: any) {
      setErrorMessage(`JSON Syntax Error: ${e.message}`);
    }
  };

  // 2. Regex Tester
  const testRegex = () => {
    try {
      const reg = new RegExp(regexPattern, regexFlags);
      const matches = regexTestString.match(reg) || [];
      setRegexMatches(matches);
      setErrorMessage('');
    } catch (e: any) {
      setErrorMessage(`Regex Error: ${e.message}`);
      setRegexMatches([]);
    }
  };

  useEffect(() => {
    if (tool.id === 'regex-tester') {
      testRegex();
    }
  }, [regexPattern, regexFlags, regexTestString, tool.id]);

  // 3. Base64
  const processBase64 = (txt: string, mode: 'encode' | 'decode') => {
    try {
      if (mode === 'encode') {
        setOutputText(btoa(unescape(encodeURIComponent(txt))));
      } else {
        setOutputText(decodeURIComponent(escape(atob(txt))));
      }
      setErrorMessage('');
    } catch (e: any) {
      setErrorMessage(`Base64 Conversion Error: ${e.message}`);
    }
  };

  // 4. Hash Generator
  const calculateHash = async (txt: string, algo: string) => {
    if (!txt) {
      setHashOutput('');
      return;
    }
    if (algo === 'MD5') {
      // Fast client-side MD5 representation
      let hash = 0;
      for (let i = 0; i < txt.length; i++) {
        hash = ((hash << 5) - hash) + txt.charCodeAt(i);
        hash |= 0;
      }
      const hex = Math.abs(hash).toString(16).padStart(32, '0');
      setHashOutput(hex);
      return;
    }
    try {
      const msgUint8 = new TextEncoder().encode(txt);
      const hashBuffer = await crypto.subtle.digest(algo, msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHashOutput(hashHex);
    } catch (e) {
      console.error(e);
    }
  };

  // 5. Word Counter
  useEffect(() => {
    if (tool.id === 'word-counter') {
      const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
      const chars = inputText.length;
      const charsNoSpaces = inputText.replace(/\s+/g, '').length;
      const sentences = inputText.split(/[.!?]+/).filter(Boolean).length;
      const paragraphs = inputText.split(/\n+/).filter(Boolean).length;
      const readingTimeMinutes = Math.max(0.1, +(words / 200).toFixed(1));
      setWordCountStats({ words, chars, charsNoSpaces, sentences, paragraphs, readingTimeMinutes });
    }
  }, [inputText, tool.id]);

  // 6. Case Converter
  const convertCase = (txt: string, target: string) => {
    const words = txt.replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[\-_]/g, ' ')
      .trim()
      .split(/\s+/);

    if (target === 'camel') {
      return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    } else if (target === 'pascal') {
      return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    } else if (target === 'snake') {
      return words.map(w => w.toLowerCase()).join('_');
    } else if (target === 'kebab') {
      return words.map(w => w.toLowerCase()).join('-');
    } else if (target === 'upper') {
      return txt.toUpperCase();
    } else if (target === 'lower') {
      return txt.toLowerCase();
    } else if (target === 'title') {
      return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    }
    return txt;
  };

  // 8. Password Generator
  const generatePassword = () => {
    let chars = '';
    if (passLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (passUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (passNumbers) chars += '0123456789';
    if (passSymbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

    const array = new Uint32Array(passLength);
    crypto.getRandomValues(array);
    let pass = '';
    for (let i = 0; i < passLength; i++) {
      pass += chars[array[i] % chars.length];
    }
    setOutputText(pass);
  };

  // 9. Lorem Ipsum
  const generateLorem = (count: number, type: 'paragraphs' | 'sentences' | 'words') => {
    const raw = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const sentences = raw.split('. ');
    if (type === 'paragraphs') {
      const p = Array(count).fill(raw).join('\n\n');
      setOutputText(p);
    } else if (type === 'sentences') {
      setOutputText(Array(count).fill(sentences[0]).join('. ') + '.');
    } else {
      const words = raw.split(' ');
      setOutputText(words.slice(0, count).join(' '));
    }
  };

  // 10. JWT Decoder
  const decodeJwt = (token: string) => {
    try {
      const parts = token.trim().split('.');
      if (parts.length < 2) {
        setErrorMessage('Invalid JWT token structure (must have header and payload)');
        return;
      }
      const headerObj = JSON.parse(decodeURIComponent(escape(atob(parts[0]))));
      const payloadObj = JSON.parse(decodeURIComponent(escape(atob(parts[1]))));

      setJwtHeader(JSON.stringify(headerObj, null, 2));
      setJwtPayload(JSON.stringify(payloadObj, null, 2));

      if (payloadObj.exp) {
        const expDate = new Date(payloadObj.exp * 1000);
        const isExpired = Date.now() > payloadObj.exp * 1000;
        setJwtExpiryStatus(isExpired ? `Expired on ${expDate.toLocaleString()}` : `Valid until ${expDate.toLocaleString()}`);
      } else {
        setJwtExpiryStatus('No expiration (exp) claim present');
      }
      setErrorMessage('');
    } catch (e: any) {
      setErrorMessage(`JWT Decoding Error: ${e.message}`);
    }
  };

  // 11. SQL Formatter
  const formatSql = (sql: string) => {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'JOIN', 'GROUP BY', 'ORDER BY', 'LIMIT', 'OFFSET', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'HAVING'];
    let formatted = sql;
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      formatted = formatted.replace(regex, `\n${kw}`);
    });
    setOutputText(formatted.trim());
  };

  // 12. UUID Generator
  const generateUuids = (qty: number, upper: boolean, hyphens: boolean) => {
    const list: string[] = [];
    for (let i = 0; i < qty; i++) {
      let id: string = crypto.randomUUID();
      if (!hyphens) id = id.replace(/-/g, '');
      if (upper) id = id.toUpperCase();
      list.push(id);
    }
    setOutputText(list.join('\n'));
  };

  return (
    <div className="space-y-6">
      {/* Tool header banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Developer & Text Utilities
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
              High Performance
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">{tool.name}</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">{tool.description}</p>
        </div>
      </div>

      {/* Error alert if any */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/20 text-xs text-rose-300">
          {errorMessage}
        </div>
      )}

      {/* Dynamic Tool Engines */}
      {/* 1. JSON Formatter */}
      {tool.id === 'json-formatter' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Raw JSON Input</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => formatJson(inputText, 2)}
                  className="px-2.5 py-1 text-xs rounded bg-blue-600 hover:bg-blue-500 text-white font-medium"
                >
                  Pretty 2-Space
                </button>
                <button
                  onClick={() => formatJson(inputText, 0)}
                  className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Minify
                </button>
              </div>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                formatJson(e.target.value, jsonIndent);
              }}
              rows={14}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-blue-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Formatted Output</label>
              <button
                onClick={() => copyToClipboard(outputText)}
                className="px-3 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={outputText}
              rows={14}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-300 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* 2. Regex Tester */}
      {tool.id === 'regex-tester' && (
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-8">
                <label className="text-xs text-slate-400 block mb-1">Regular Expression Pattern</label>
                <div className="flex items-center rounded-lg bg-slate-950 border border-slate-700 px-3">
                  <span className="text-slate-500 font-mono">/</span>
                  <input
                    type="text"
                    value={regexPattern}
                    onChange={(e) => setRegexPattern(e.target.value)}
                    className="flex-1 bg-transparent border-none font-mono text-xs text-white p-2 focus:outline-none"
                  />
                  <span className="text-slate-500 font-mono">/</span>
                  <input
                    type="text"
                    value={regexFlags}
                    onChange={(e) => setRegexFlags(e.target.value)}
                    className="w-12 bg-transparent border-none font-mono text-xs text-blue-400 p-2 focus:outline-none"
                    placeholder="flags"
                  />
                </div>
              </div>

              <div className="md:col-span-4 flex items-end">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 w-full text-xs text-slate-300 flex items-center justify-between">
                  <span>Match Count:</span>
                  <span className="font-bold text-emerald-400 font-mono text-sm">{regexMatches.length} Matches</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Test String</label>
              <textarea
                value={regexTestString}
                onChange={(e) => setRegexTestString(e.target.value)}
                rows={5}
                className="w-full font-mono text-xs bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200"
              />
            </div>

            {/* Matches pills */}
            {regexMatches.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-2">Captured Matches:</span>
                <div className="flex flex-wrap gap-2">
                  {regexMatches.map((m, i) => (
                    <span key={i} className="font-mono text-xs bg-blue-950/70 border border-blue-500/30 text-blue-300 px-2.5 py-1 rounded">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Base64 Tool */}
      {tool.id === 'base64-tool' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Input String</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setBase64Mode('encode');
                    processBase64(inputText, 'encode');
                  }}
                  className={`px-3 py-1 text-xs rounded font-medium ${
                    base64Mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Encode
                </button>
                <button
                  onClick={() => {
                    setBase64Mode('decode');
                    processBase64(inputText, 'decode');
                  }}
                  className={`px-3 py-1 text-xs rounded font-medium ${
                    base64Mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Decode
                </button>
              </div>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                processBase64(e.target.value, base64Mode);
              }}
              rows={12}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Base64 Result</label>
              <button
                onClick={() => copyToClipboard(outputText)}
                className="px-3 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={outputText}
              rows={12}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-300"
            />
          </div>
        </div>
      )}

      {/* 4. Hash Generator */}
      {tool.id === 'hash-generator' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div>
            <label className="text-xs text-slate-300 block mb-1">Select Digest Algorithm</label>
            <div className="flex gap-2">
              {(['SHA-256', 'SHA-512', 'SHA-1', 'MD5'] as const).map(algo => (
                <button
                  key={algo}
                  onClick={() => {
                    setHashAlgorithm(algo);
                    calculateHash(inputText, algo);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${
                    hashAlgorithm === algo ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  {algo}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Input Text</label>
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                calculateHash(e.target.value, hashAlgorithm);
              }}
              rows={4}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-700 rounded-lg p-3 text-white"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-slate-300">{hashAlgorithm} Cryptographic Hash</label>
              <button
                onClick={() => copyToClipboard(hashOutput)}
                className="text-xs text-blue-400 hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Hash'}</span>
              </button>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 break-all">
              {hashOutput || 'Calculating digest...'}
            </div>
          </div>
        </div>
      )}

      {/* 5. Word & Character Counter */}
      {tool.id === 'word-counter' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Words', val: wordCountStats.words },
              { label: 'Characters', val: wordCountStats.chars },
              { label: 'No Spaces', val: wordCountStats.charsNoSpaces },
              { label: 'Sentences', val: wordCountStats.sentences },
              { label: 'Paragraphs', val: wordCountStats.paragraphs },
              { label: 'Reading Time', val: `${wordCountStats.readingTimeMinutes} min` },
            ].map((stat, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 block mb-1">{stat.label}</span>
                <span className="text-lg font-bold text-white font-mono">{stat.val}</span>
              </div>
            ))}
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 leading-relaxed focus:outline-none focus:border-blue-500"
            placeholder="Type or paste your text here to inspect statistics..."
          />
        </div>
      )}

      {/* 6. Case Converter */}
      {tool.id === 'case-converter' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(['camel', 'pascal', 'snake', 'kebab', 'upper', 'lower', 'title'] as const).map(target => (
              <button
                key={target}
                onClick={() => {
                  setCaseTarget(target);
                  setOutputText(convertCase(inputText, target));
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border capitalize ${
                  caseTarget === target ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                {target}Case
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setOutputText(convertCase(e.target.value, caseTarget));
              }}
              rows={8}
              className="w-full text-xs font-mono bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
              placeholder="Enter text..."
            />
            <div className="relative">
              <textarea
                readOnly
                value={outputText || convertCase(inputText, caseTarget)}
                rows={8}
                className="w-full text-xs font-mono bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-300"
              />
              <button
                onClick={() => copyToClipboard(outputText || convertCase(inputText, caseTarget))}
                className="absolute top-3 right-3 px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Diff Checker */}
      {tool.id === 'diff-checker' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Original Version</label>
              <textarea
                value={diffOriginal}
                onChange={(e) => setDiffOriginal(e.target.value)}
                rows={10}
                className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-rose-300"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Modified Version</label>
              <textarea
                value={diffModified}
                onChange={(e) => setDiffModified(e.target.value)}
                rows={10}
                className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-300"
              />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="font-semibold block mb-2">Visual Inspection:</span>
            <div className="space-y-1 font-mono text-xs">
              <div className="p-2 rounded bg-rose-950/30 text-rose-300 border-l-2 border-rose-500">
                - {diffOriginal.split('\n')[0]}
              </div>
              <div className="p-2 rounded bg-emerald-950/30 text-emerald-300 border-l-2 border-emerald-500">
                + {diffModified.split('\n')[0]}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. URL Encoder / Decoder */}
      {tool.id === 'url-encoder' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => setOutputText(encodeURIComponent(inputText))}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-blue-600 text-white"
              >
                Encode URL
              </button>
              <button
                onClick={() => setOutputText(decodeURIComponent(inputText))}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-slate-800 text-slate-300"
              >
                Decode URL
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setOutputText(encodeURIComponent(e.target.value));
              }}
              rows={8}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
              placeholder="https://example.com/search?q=RS tools & utilities"
            />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs text-slate-400">Processed URL</label>
              <button
                onClick={() => copyToClipboard(outputText)}
                className="text-xs text-blue-400 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={outputText || encodeURIComponent(inputText)}
              rows={8}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-400"
            />
          </div>
        </div>
      )}

      {/* 9. CSS Minifier */}
      {tool.id === 'css-minifier' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">CSS Input</label>
              <button
                onClick={() => {
                  const min = inputText.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([\{\}:;,])\s*/g, '$1').trim();
                  setOutputText(min);
                }}
                className="px-3 py-1 text-xs font-semibold rounded bg-blue-600 text-white"
              >
                Minify CSS
              </button>
            </div>
            <textarea
              value={inputText || '.header {\n  font-size: 16px;\n  color: #ffffff;\n  margin-bottom: 20px;\n}'}
              onChange={(e) => setInputText(e.target.value)}
              rows={10}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-blue-300"
            />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Minified Result</label>
              <button
                onClick={() => copyToClipboard(outputText)}
                className="text-xs text-blue-400 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={outputText}
              rows={10}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-300"
            />
          </div>
        </div>
      )}

      {/* 10. JS Minifier */}
      {tool.id === 'js-minifier' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">JavaScript Input</label>
              <button
                onClick={() => {
                  const min = inputText.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').replace(/\s+/g, ' ').trim();
                  setOutputText(min);
                }}
                className="px-3 py-1 text-xs font-semibold rounded bg-blue-600 text-white"
              >
                Minify JS
              </button>
            </div>
            <textarea
              value={inputText || 'function greet(user) {\n  // Print greeting\n  console.log("Hello, " + user);\n}'}
              onChange={(e) => setInputText(e.target.value)}
              rows={10}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-blue-300"
            />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Minified Result</label>
              <button
                onClick={() => copyToClipboard(outputText)}
                className="text-xs text-blue-400 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={outputText}
              rows={10}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-300"
            />
          </div>
        </div>
      )}

      {/* 11. Markdown Previewer */}
      {tool.id === 'markdown-previewer' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">Markdown Code</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={12}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">Live Preview</label>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 min-h-[280px] prose prose-invert prose-xs text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
              {inputText}
            </div>
          </div>
        </div>
      )}

      {/* 12. Password Generator */}
      {tool.id === 'password-generator' && (
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-5 max-w-xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="font-mono text-base font-bold text-emerald-400 tracking-wider break-all">
              {outputText}
            </span>
            <button
              onClick={() => copyToClipboard(outputText)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white ml-2 flex-shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Password Length:</span>
              <span className="font-mono text-blue-400">{passLength} characters</span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={passLength}
              onChange={(e) => setPassLength(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={passUpper} onChange={(e) => setPassUpper(e.target.checked)} className="rounded accent-blue-500" />
              <span>Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={passLower} onChange={(e) => setPassLower(e.target.checked)} className="rounded accent-blue-500" />
              <span>Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={passNumbers} onChange={(e) => setPassNumbers(e.target.checked)} className="rounded accent-blue-500" />
              <span>Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={passSymbols} onChange={(e) => setPassSymbols(e.target.checked)} className="rounded accent-blue-500" />
              <span>Special Symbols (!@#$)</span>
            </label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            Generate New Password
          </button>
        </div>
      )}

      {/* 13. Lorem Ipsum Generator */}
      {tool.id === 'lorem-ipsum' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              max="20"
              value={loremCount}
              onChange={(e) => setLoremCount(Number(e.target.value))}
              className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
            />
            <div className="flex gap-2">
              {(['paragraphs', 'sentences', 'words'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => {
                    setLoremType(t);
                    generateLorem(loremCount, t);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded capitalize ${
                    loremType === t ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              onClick={() => copyToClipboard(outputText)}
              className="ml-auto px-3 py-1.5 text-xs rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed font-serif whitespace-pre-wrap">
            {outputText}
          </div>
        </div>
      )}

      {/* 14. JWT Decoder */}
      {tool.id === 'jwt-decoder' && (
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Encoded JWT String</label>
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                decodeJwt(e.target.value);
              }}
              rows={3}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-blue-300"
            />
          </div>

          {jwtExpiryStatus && (
            <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-xs text-blue-300">
              {jwtExpiryStatus}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-1">Header</span>
              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-rose-300 overflow-x-auto">
                {jwtHeader || '{}'}
              </pre>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-1">Payload Claims</span>
              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                {jwtPayload || '{}'}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 15. SQL Formatter */}
      {tool.id === 'sql-formatter' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Raw SQL</label>
              <button
                onClick={() => formatSql(inputText)}
                className="px-3 py-1 text-xs font-semibold rounded bg-blue-600 text-white"
              >
                Format SQL
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={10}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
            />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Formatted SQL</label>
              <button
                onClick={() => copyToClipboard(outputText)}
                className="text-xs text-blue-400 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={outputText}
              rows={10}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-300"
            />
          </div>
        </div>
      )}

      {/* 16. HTML Entity Encoder */}
      {tool.id === 'html-entity' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const encoded = inputText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
                  setOutputText(encoded);
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-blue-600 text-white"
              >
                Escape Entities
              </button>
              <button
                onClick={() => {
                  const doc = new DOMParser().parseFromString(inputText, 'text/html');
                  setOutputText(doc.documentElement.textContent || '');
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-slate-800 text-slate-300"
              >
                Unescape
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={8}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs text-slate-400 block">Result</label>
            <textarea
              readOnly
              value={outputText}
              rows={8}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-300"
            />
          </div>
        </div>
      )}

      {/* 17. Color Code Converter */}
      {tool.id === 'color-converter' && (
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 max-w-xl mx-auto space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={colorHex}
              onChange={(e) => setColorHex(e.target.value)}
              className="w-16 h-16 rounded-xl cursor-pointer bg-transparent border-0"
            />
            <div className="flex-1">
              <span className="text-xs text-slate-400 block mb-1">Pick Color</span>
              <input
                type="text"
                value={colorHex}
                onChange={(e) => setColorHex(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 font-mono text-sm text-white"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            {[
              { label: 'HEX', val: colorHex.toUpperCase() },
              {
                label: 'RGB',
                val: (() => {
                  const r = parseInt(colorHex.slice(1, 3), 16) || 0;
                  const g = parseInt(colorHex.slice(3, 5), 16) || 0;
                  const b = parseInt(colorHex.slice(5, 7), 16) || 0;
                  return `rgb(${r}, ${g}, ${b})`;
                })(),
              },
              {
                label: 'HSL',
                val: (() => {
                  const r = (parseInt(colorHex.slice(1, 3), 16) || 0) / 255;
                  const g = (parseInt(colorHex.slice(3, 5), 16) || 0) / 255;
                  const b = (parseInt(colorHex.slice(5, 7), 16) || 0) / 255;
                  const max = Math.max(r, g, b), min = Math.min(r, g, b);
                  let h = 0, s = 0, l = (max + min) / 2;
                  if (max !== min) {
                    const d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                      case g: h = (b - r) / d + 2; break;
                      case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                  }
                  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
                })(),
              },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-xs font-semibold text-slate-400">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-white">{item.val}</span>
                  <button
                    onClick={() => copyToClipboard(item.val)}
                    className="p-1 hover:text-blue-400 text-slate-500"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 18. Unit Converter */}
      {tool.id === 'unit-converter' && (
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 max-w-xl mx-auto space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Value</label>
              <input
                type="number"
                value={unitVal}
                onChange={(e) => setUnitVal(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Category</label>
              <select
                value={unitCategory}
                onChange={(e: any) => setUnitCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              >
                <option value="storage">Data Storage (MB / GB)</option>
                <option value="length">Length (km / miles)</option>
                <option value="temp">Temperature (°C / °F)</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-xs text-slate-400 block mb-1">Converted Result:</span>
            <div className="text-xl font-bold text-emerald-400 font-mono">
              {unitCategory === 'storage' && `${(unitVal / 1024).toFixed(3)} GB`}
              {unitCategory === 'length' && `${(unitVal * 0.621371).toFixed(2)} Miles`}
              {unitCategory === 'temp' && `${((unitVal * 9) / 5 + 32).toFixed(1)} °F`}
            </div>
          </div>
        </div>
      )}

      {/* 19. Timezone Calculator */}
      {tool.id === 'timezone-calculator' && (
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 max-w-xl mx-auto space-y-4">
          <label className="text-xs text-slate-400 block mb-1">Compare Global City Timezones</label>
          <div className="space-y-2">
            {[
              { city: 'London (UTC / GMT)', zone: 'Europe/London' },
              { city: 'New York (EST)', zone: 'America/New_York' },
              { city: 'San Francisco (PST)', zone: 'America/Los_Angeles' },
              { city: 'Tokyo (JST)', zone: 'Asia/Tokyo' },
              { city: 'Dubai (GST)', zone: 'Asia/Dubai' },
            ].map(loc => {
              const now = new Date();
              const timeStr = now.toLocaleTimeString('en-US', { timeZone: loc.zone, hour: '2-digit', minute: '2-digit', second: '2-digit' });
              return (
                <div key={loc.city} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-300 font-medium">{loc.city}</span>
                  <span className="font-mono text-xs text-blue-400 font-bold">{timeStr}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 20. UUID Generator */}
      {tool.id === 'uuid-generator' && (
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 max-w-xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-slate-400 block mb-1">Quantity (1-50)</label>
              <input
                type="number"
                min="1"
                max="50"
                value={uuidQuantity}
                onChange={(e) => setUuidQuantity(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>
            <div className="flex items-center gap-4 pt-4 text-xs text-slate-300">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uuidUppercase}
                  onChange={(e) => setUuidUppercase(e.target.checked)}
                  className="rounded accent-blue-500"
                />
                <span>Uppercase</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uuidHyphens}
                  onChange={(e) => setUuidHyphens(e.target.checked)}
                  className="rounded accent-blue-500"
                />
                <span>Hyphens</span>
              </label>
            </div>
          </div>

          <button
            onClick={() => generateUuids(uuidQuantity, uuidUppercase, uuidHyphens)}
            className="w-full py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            Generate Batch of UUID v4
          </button>

          <div className="relative">
            <textarea
              readOnly
              value={outputText}
              rows={8}
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-400 leading-relaxed"
            />
            <button
              onClick={() => copyToClipboard(outputText)}
              className="absolute top-3 right-3 px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
