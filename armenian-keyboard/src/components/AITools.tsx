"use client";

import { useState, type ChangeEvent, type MouseEvent } from "react";
import { runAIAction } from "@/lib/client-ai";
import type { AIAction, Dialect, Orthography } from "@/types/keyboard";

interface AIToolsProps {
  text: string;
  dialect: Dialect;
  orthography: Orthography;
  onSaveWords: () => void;
  onApplyText: (value: string) => void;
}

interface ToolDefinition {
  action: Exclude<AIAction, "translate"> | "save";
  icon: string;
  title: string;
  description: string;
  cta: string;
}

const tools: ToolDefinition[] = [
  { action: "check", icon: "✓", title: "Check my Armenian", description: "Get spelling and grammar suggestions.", cta: "Check text →" },
  { action: "convert", icon: "⇄", title: "Convert dialect", description: "Switch between Western and Eastern Armenian.", cta: "Convert →" },
  { action: "ask", icon: "✦", title: "Ask Tun AI", description: "Explain, improve or create more with AI.", cta: "Ask a question →" },
  { action: "save", icon: "♧", title: "Save to vocabulary", description: "Save words from your text to practise later.", cta: "Save words →" },
];

export function AITools({ text, dialect, orthography, onSaveWords, onApplyText }: AIToolsProps) {
  const [loading, setLoading] = useState<AIAction | null>(null);
  const [result, setResult] = useState<{ action: AIAction; text: string } | null>(null);
  const [error, setError] = useState("");
  const [askOpen, setAskOpen] = useState(false);
  const [question, setQuestion] = useState("");

  async function execute(action: Exclude<AIAction, "translate">, learnerQuestion?: string) {
    if (!text.trim()) {
      setError("Type or paste some Armenian text first.");
      return;
    }
    setLoading(action);
    setError("");
    try {
      const targetDialect = dialect === "western" ? "eastern" : "western";
      const output = await runAIAction({ action, text, dialect, orthography, targetDialect, question: learnerQuestion });
      setResult({ action, text: output });
      if (action === "ask") setAskOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "This feature is temporarily unavailable.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <section className="smart-tools-section" aria-labelledby="smart-tools-title">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">Smart learning tools</p>
          <h2 id="smart-tools-title">Do more with your Armenian</h2>
        </div>
      </div>

      <div className="feature-card-grid">
        {tools.map((tool) => (
          <article className="feature-card" key={tool.action}>
            <span className="feature-icon" aria-hidden="true">{tool.icon}</span>
            <div>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              <button
                type="button"
                className="outline-action"
                onClick={() => {
                  if (tool.action === "save") onSaveWords();
                  else if (tool.action === "ask") setAskOpen(true);
                  else void execute(tool.action);
                }}
                disabled={tool.action !== "save" && loading !== null}
              >
                {loading === tool.action ? "Working…" : tool.cta}
              </button>
            </div>
          </article>
        ))}
      </div>

      {error ? <p className="status-message status-message--error" role="status">{error}</p> : null}

      {result ? (
        <div className="ai-result-card" role="status">
          <div className="ai-result-header">
            <strong>{result.action === "convert" ? "Converted text" : result.action === "check" ? "Suggestions" : "Tun AI response"}</strong>
            <button type="button" className="text-link-button" onClick={() => setResult(null)}>Dismiss</button>
          </div>
          <div className={result.action === "convert" ? "armenian-text ai-result-text" : "ai-result-text"}>{result.text}</div>
          {result.action === "convert" ? (
            <button type="button" className="secondary-button result-apply-button" onClick={() => onApplyText(result.text)}>Use converted text</button>
          ) : null}
        </div>
      ) : null}

      {askOpen ? (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setAskOpen(false)}>
          <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="ask-title" onMouseDown={(e: MouseEvent<HTMLElement>) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <p className="eyebrow">Tun AI</p>
                <h2 id="ask-title">Ask about your Armenian</h2>
              </div>
              <button type="button" className="icon-button" aria-label="Close" onClick={() => setAskOpen(false)}>×</button>
            </div>
            <label className="field-label" htmlFor="ai-question">What would you like help with?</label>
            <textarea
              id="ai-question"
              className="question-input"
              value={question}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setQuestion(event.target.value)}
              placeholder="For example: Why is this ending used here?"
              maxLength={500}
            />
            <div className="modal-actions">
              <button type="button" className="secondary-button" onClick={() => setAskOpen(false)}>Cancel</button>
              <button type="button" className="primary-button" disabled={!question.trim() || loading !== null} onClick={() => void execute("ask", question)}>
                {loading === "ask" ? "Thinking…" : "Ask Tun AI"}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}
