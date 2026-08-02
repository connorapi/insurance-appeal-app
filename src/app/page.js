'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [paid, setPaid] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId) {
      fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.paid) {
            setPaid(true);
            const saved = sessionStorage.getItem('appealResult');
            if (saved) {
              setResult(JSON.parse(saved));
            }
          }
        });
    }
  }, []);

  const handlePayment = async () => {
    sessionStorage.setItem('appealResult', JSON.stringify(result));
    const response = await fetch('/api/checkout', { method: 'POST' });
    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResult(null);
    }
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
      {/* Nav */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-2 flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-sm flex items-center justify-center font-mono text-xs font-bold"
          style={{ background: 'var(--ink)', color: 'var(--paper)' }}
        >
          O
        </div>
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: 'var(--ink)', opacity: 0.7 }}
        >
          Overturn
        </span>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-10 sm:pb-14 text-center">
        <p
          className="font-mono text-xs tracking-widest uppercase mb-4"
          style={{ color: 'var(--seal-gold)' }}
        >
          Case Intake · 01
        </p>
        <h1
          className="font-display text-3xl sm:text-5xl leading-tight mb-5"
          style={{ color: 'var(--ink)' }}
        >
          Turn a denial into
          <br />a drafted appeal.
        </h1>
        <p
          className="text-sm sm:text-base mb-2 max-w-md mx-auto"
          style={{ color: 'var(--ink)', opacity: 0.7 }}
        >
          Upload your insurance denial letter. Get a formal appeal, drafted
          in minutes, grounded in the specific reason you were denied.
        </p>
        <p
          className="text-xs mb-10 max-w-md mx-auto"
          style={{ color: 'var(--ink)', opacity: 0.5 }}
        >
          General information and drafting assistance — not legal or
          medical advice. Appeal outcomes are not guaranteed.
        </p>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
          {[
            {
              n: '01',
              title: 'Upload',
              desc: 'Send your denial letter or EOB — PDF or photo.',
            },
            {
              n: '02',
              title: 'Review',
              desc: 'Your case is matched to the right appeal strategy.',
            },
            {
              n: '03',
              title: 'Draft',
              desc: 'Get a formal appeal letter, ready to edit and send.',
            },
          ].map((step) => (
            <div
              key={step.n}
              className="step-card rounded-lg p-5"
              style={{ background: '#fff', border: '1px solid var(--folder-tan)' }}
            >
              <p
                className="font-mono text-xs mb-2"
                style={{ color: 'var(--seal-gold)' }}
              >
                {step.n}
              </p>
              <p
                className="font-display text-lg mb-1"
                style={{ color: 'var(--ink)' }}
              >
                {step.title}
              </p>
              <p className="text-xs" style={{ color: 'var(--ink)', opacity: 0.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Upload zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`upload-zone border-2 border-dashed rounded-xl p-8 sm:p-12 mb-6 text-center cursor-pointer ${
            dragActive ? 'drag-active' : ''
          }`}
          style={{ borderColor: 'var(--folder-tan)', background: '#fff' }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            className="mx-auto mb-3"
            style={{ color: 'var(--seal-gold)' }}
          >
            <path
              d="M12 3v12m0-12l-4 4m4-4l4 4M5 17v2a2 2 0 002 2h10a2 2 0 002-2v-2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p
            className="font-mono text-xs uppercase tracking-wide mb-1"
            style={{ color: 'var(--ink)' }}
          >
            {file ? file.name : 'Drop your denial letter here'}
          </p>
          <p
            className="text-xs"
            style={{ color: 'var(--ink)', opacity: 0.5 }}
          >
            or click to browse — PDF, JPG, or PNG
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className="font-mono text-sm uppercase tracking-wide px-8 py-3 rounded transition-opacity disabled:opacity-40"
          style={{ background: 'var(--ink)', color: 'var(--paper)' }}
        >
          {loading ? 'Reviewing case…' : 'Analyze denial letter'}
        </button>

        {result && !result.error && (
          <div className="mt-14 text-left">
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
              className="font-mono text-xs mb-10 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 p-5 rounded"
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

            {!paid && (
              <div
                className="rounded p-8 text-center"
                style={{ background: '#fff', border: '1px solid var(--folder-tan)' }}
              >
                <p className="text-sm mb-4" style={{ opacity: 0.7 }}>
                  Your appeal letter is ready. Unlock it to view and edit the full draft.
                </p>
                <button
                  onClick={handlePayment}
                  className="font-mono text-sm uppercase tracking-wide px-6 py-3 rounded"
                  style={{ background: 'var(--case-green)', color: '#fff' }}
                >
                  Unlock appeal letter — $4.99
                </button>
              </div>
            )}

            {paid && (
              <>
                <p
                  className="font-mono text-xs uppercase tracking-wide mb-3"
                  style={{ opacity: 0.5 }}
                >
                  Draft appeal letter:
                </p>
                <div className="letter-paper rounded p-6 sm:p-8">
                  <textarea
                    className="w-full h-96 text-sm leading-relaxed bg-transparent resize-y focus:outline-none"
                    style={{ color: 'var(--ink)' }}
                    defaultValue={result.letter}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {result && result.error && (
          <p className="mt-6 text-sm" style={{ color: 'var(--stamp-red)' }}>
            Something went wrong. Try a different file.
          </p>
        )}

        <footer
          className="mt-20 pt-6 text-xs flex flex-wrap justify-center gap-4"
          style={{ borderTop: '1px solid var(--folder-tan)', opacity: 0.6 }}
        >
          <a href="/terms" className="underline">Terms of Service</a>
          <a href="/privacy" className="underline">Privacy Policy</a>
        </footer>
      </div>
    </main>
  );
}