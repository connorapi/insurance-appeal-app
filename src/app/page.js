'use client';
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1];

      let realMediaType = file.type;
      if (base64.startsWith('iVBOR')) {
        realMediaType = 'image/png';
      } else if (base64.startsWith('/9j/')) {
        realMediaType = 'image/jpeg';
      } else if (file.type === 'application/pdf') {
        realMediaType = 'application/pdf';
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileBase64: base64,
          mediaType: realMediaType,
        }),
      });

      const data = await response.json();
      setResult(data);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <div className="max-w-2xl mx-auto px-6 py-14">
        <p
          className="font-mono text-xs tracking-widest uppercase mb-3"
          style={{ color: 'var(--seal-gold)' }}
        >
          Case Intake · 01
        </p>
        <h1
          className="font-display text-4xl leading-tight mb-4"
          style={{ color: 'var(--ink)' }}
        >
          Turn a denial into<br />a drafted appeal.
        </h1>
        <p
          className="text-sm mb-10 max-w-md"
          style={{ color: 'var(--ink)', opacity: 0.7 }}
        >
          This tool provides general information and drafting assistance, not
          legal or medical advice. Appeal outcomes are not guaranteed.
        </p>

        <div
          className="border-2 border-dashed rounded-lg p-8 mb-6 text-center"
          style={{ borderColor: 'var(--folder-tan)', background: '#fff' }}
        >
          <p
            className="font-mono text-xs uppercase tracking-wide mb-4"
            style={{ color: 'var(--ink)', opacity: 0.5 }}
          >
            Upload denial letter or EOB
          </p>
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={handleFileChange}
            className="text-sm"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className="font-mono text-sm uppercase tracking-wide px-6 py-3 rounded transition-opacity disabled:opacity-40"
          style={{ background: 'var(--ink)', color: 'var(--paper)' }}
        >
          {loading ? 'Reviewing case…' : 'Analyze denial letter'}
        </button>

        {result && !result.error && (
          <div className="mt-14">
            <div className="flex items-center gap-3 mb-8">
              <span className="stamp">Denied</span>
              <span style={{ color: 'var(--ink)', opacity: 0.4 }}>→</span>
              <span
                className="stamp stamp-green"
                style={{ animationDelay: '0.3s' }}
              >
                Appeal drafted
              </span>
            </div>

            <div
              className="font-mono text-xs mb-10 grid grid-cols-2 gap-y-2 gap-x-4 p-5 rounded"
              style={{ background: '#fff', border: '1px solid var(--folder-tan)' }}
            >
              <span style={{ opacity: 0.5 }}>INSURER</span>
              <span>{result.extracted.insurer_name || '—'}</span>
              <span style={{ opacity: 0.5 }}>CATEGORY</span>
              <span>{result.extracted.denial_reason_category || '—'}</span>
              <span style={{ opacity: 0.5 }}>PROCEDURE</span>
              <span>{result.extracted.procedure_or_service || '—'}</span>
              <span style={{ opacity: 0.5 }}>APPEAL DEADLINE</span>
              <span style={{ color: 'var(--stamp-red)' }}>
                {result.extracted.appeal_deadline || '—'}
              </span>
            </div>

            <p
              className="font-mono text-xs uppercase tracking-wide mb-3"
              style={{ opacity: 0.5 }}
            >
              Draft appeal letter
            </p>
            <div className="letter-paper rounded p-8">
              <textarea
                className="w-full h-96 text-sm leading-relaxed bg-transparent resize-y focus:outline-none"
                style={{ color: 'var(--ink)' }}
                defaultValue={result.letter}
              />
            </div>
          </div>
        )}

        {result && result.error && (
          <p className="mt-6 text-sm" style={{ color: 'var(--stamp-red)' }}>
            Something went wrong. Try a different file.
          </p>
        )}
      </div>
    </main>
  );
}