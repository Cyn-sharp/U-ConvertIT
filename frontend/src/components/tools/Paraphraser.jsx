import { useState, useRef, useEffect } from 'react';
import './Paraphraser.css';

const MODES = [
  { id: 'standard', label: 'Standard' },
  { id: 'fluency', label: 'Fluency' },
  { id: 'formal', label: 'Formal' },
  { id: 'creative', label: 'Creative' },
  { id: 'shorten', label: 'Shorten' },
];

function Paraphraser() {
  const [inputText, setInputText]     = useState('');
  const [outputText, setOutputText]   = useState('');
  const [mode, setMode]               = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied]           = useState(false);
  const [charLimit]                   = useState(2000);
  const inputRef                      = useRef(null);

  /* auto-focus on mount */
  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleParaphrase = async () => {
    if (!inputText.trim() || isProcessing) return;
    setIsProcessing(true);
    setOutputText('');

    /* ── Replace this block with your real API call ── */
    await new Promise(r => setTimeout(r, 1200));
    setOutputText(
      `[${mode.toUpperCase()}] ${inputText
        .split('. ')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join('. ')}`
    );
    /* ─────────────────────────────────────────────── */

    setIsProcessing(false);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text.slice(0, charLimit));
      inputRef.current?.focus();
    } catch { /* user denied clipboard */ }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    inputRef.current?.focus();
  };

  const over = inputText.length >= charLimit;

  return (
    <div className="ph-root">

      {/* ── Mode selector ───────────────────────────── */}
      <div className="ph-modes">
        {MODES.map(m => (
          <button
            key={m.id}
            className={`ph-mode-btn ${mode === m.id ? 'ph-mode-active' : ''}`}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* ── Two-panel layout ────────────────────────── */}
      <div className="ph-panels">

        {/* Input panel */}
        <div className="ph-panel ph-panel--input">
          <div className="ph-panel-header">
            <span className="ph-panel-label">Original Text</span>
            <div className="ph-panel-actions">
              <button className="ph-action-btn" onClick={handlePaste} title="Paste from clipboard">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                </svg>
                Paste
              </button>
              {inputText && (
                <button className="ph-action-btn ph-action-btn--danger" onClick={handleClear} title="Clear">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                  </svg>
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="ph-textarea-wrap">
            {!inputText && (
              <div className="ph-placeholder-overlay" onClick={() => inputRef.current?.focus()}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c0aaa0" strokeWidth="1.5">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                <p>Type or paste your text here…</p>
              </div>
            )}
            <textarea
              ref={inputRef}
              className="ph-textarea"
              value={inputText}
              onChange={e => setInputText(e.target.value.slice(0, charLimit))}
              spellCheck
              aria-label="Input text"
            />
          </div>

          <div className="ph-panel-footer">
            <span className={`ph-char-count ${over ? 'ph-char-count--over' : ''}`}>
              {inputText.length} / {charLimit}
            </span>
            <button
              className="ph-submit-btn"
              onClick={handleParaphrase}
              disabled={!inputText.trim() || isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="ph-spinner" />
                  Paraphrasing…
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                  Paraphrase
                </>
              )}
            </button>
          </div>
        </div>

        {/* Divider arrow */}
        <div className="ph-divider" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B0E0E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>

        {/* Output panel */}
        <div className={`ph-panel ph-panel--output ${isProcessing ? 'ph-panel--loading' : ''}`}>
          <div className="ph-panel-header">
            <span className="ph-panel-label">Paraphrased Result</span>
            <div className="ph-panel-actions">
              <button
                className={`ph-action-btn ${copied ? 'ph-action-btn--success' : ''}`}
                onClick={handleCopy}
                disabled={!outputText}
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="ph-textarea-wrap">
            {isProcessing && (
              <div className="ph-loading-overlay">
                <div className="ph-loading-bars">
                  <span /><span /><span /><span />
                </div>
                <p>Rewriting your text…</p>
              </div>
            )}
            {!isProcessing && !outputText && (
              <div className="ph-empty-state">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d4bfbf" strokeWidth="1.2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
                <p>Your paraphrased text will appear here</p>
              </div>
            )}
            <textarea
              className="ph-textarea ph-textarea--output"
              value={outputText}
              readOnly
              aria-label="Paraphrased output"
              aria-live="polite"
            />
          </div>

          <div className="ph-panel-footer">
            <span className="ph-char-count">{outputText.length > 0 ? `${outputText.length} characters` : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paraphraser;
