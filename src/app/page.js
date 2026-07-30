'use client';
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1];

      // Detect the real file type from its content, not just the filename
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
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">Insurance Appeal Letter Assistant</h1>
      <p className="text-sm text-gray-600 mb-6">
        This tool provides general information and drafting assistance, not
        legal or medical advice. Appeal outcomes are not guaranteed.
      </p>

      <input
        type="file"
        accept="application/pdf,image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <br />
      <button
        onClick={handleSubmit}
        disabled={!file || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Analyze Denial Letter'}
      </button>

      {result && !result.error && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">What we found:</h2>
          <ul className="text-sm mb-6 space-y-1">
            <li><b>Insurer:</b> {result.extracted.insurer_name}</li>
            <li><b>Reason for denial:</b> {result.extracted.denial_reason_raw}</li>
            <li><b>Category:</b> {result.extracted.denial_reason_category}</li>
            <li><b>Procedure:</b> {result.extracted.procedure_or_service}</li>
            <li><b>Appeal deadline:</b> {result.extracted.appeal_deadline}</li>
          </ul>

          <h2 className="text-lg font-semibold mb-2">Draft appeal letter:</h2>
          <textarea
            className="w-full h-96 border p-3 text-sm font-mono"
            defaultValue={result.letter}
          />
        </div>
      )}

      {result && result.error && (
        <p className="text-red-600 mt-4">
          Something went wrong. Try a different file.
        </p>
      )}
    </main>
  );
}