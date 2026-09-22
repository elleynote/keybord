"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { AITools } from "@/components/AITools";
import { OnScreenKeyboard } from "@/components/OnScreenKeyboard";
import { PromoSidebar } from "@/components/PromoSidebar";
import { SegmentedControl } from "@/components/SegmentedControl";
import { VocabularyPanel } from "@/components/VocabularyPanel";
import { applyEditorKey, countCharacters, countWords } from "@/lib/editor-text";
import { applyOrthographyPreference } from "@/lib/orthography";
import { applyPhoneticEditorKey, type PhoneticSession } from "@/lib/phonetic-input";
import { runAIAction } from "@/lib/client-ai";
import { defaultPreferences, loadPreferences, loadVocabulary, savePreferences, saveVocabulary } from "@/lib/storage";
import { transliterate } from "@/lib/transliteration";
import type { Dialect, KeyboardLayout, Orthography, Preferences, VocabularyEntry } from "@/types/keyboard";

const dialectOptions = [
  { value: "western", label: "Western Armenian" },
  { value: "eastern", label: "Eastern Armenian" },
] as const;
const layoutOptions = [
  { value: "standard", label: "Standard" },
  { value: "phonetic", label: "Phonetic" },
] as const;
const orthographyOptions = [
  { value: "reformed", label: "Reformed" },
  { value: "traditional", label: "Traditional" },
] as const;
const phoneticHelpItems = [
  "a -> ա",
  "barev -> բարև",
  "sh -> շ",
  "ts -> ց",
  "x / kh -> խ",
  "gh -> ղ",
  "rr -> ռ",
  "oo / ou -> ու",
  "ye -> ե",
  "vo -> ո at the start of a word",
  "s'h -> սհ",
] as const;

export function shouldHandlePhysicalPhoneticInput(event: { layout: KeyboardLayout; ctrlKey: boolean; metaKey: boolean; altKey: boolean }) {
  return !event.ctrlKey && !event.metaKey && !event.altKey;
}

export function KeyboardApp() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const phoneticSessionRef = useRef<PhoneticSession | null>(null);
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [hydrated, setHydrated] = useState(false);
  const [shift, setShift] = useState(false);
  const [status, setStatus] = useState("");
  const [translation, setTranslation] = useState("");
  const [translating, setTranslating] = useState(false);
  const [vocabulary, setVocabulary] = useState<VocabularyEntry[]>([]);
  const [vocabularyOpen, setVocabularyOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setPreferences(loadPreferences());
      setVocabulary(loadVocabulary());
      setHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (hydrated) savePreferences(preferences);
  }, [preferences, hydrated]);

  const transliteration = useMemo(() => transliterate(preferences.text, preferences.dialect), [preferences.text, preferences.dialect]);
  const characters = countCharacters(preferences.text);
  const words = countWords(preferences.text);

  function resetPhoneticSession() {
    phoneticSessionRef.current = null;
  }

  function updatePreferences(patch: Partial<Preferences>) {
    resetPhoneticSession();
    setPreferences((current) => ({ ...current, ...patch }));
    setTranslation("");
  }

  function insertKey(key: string) {
    resetPhoneticSession();
    const textarea = textareaRef.current;
    const start = textarea?.selectionStart ?? preferences.text.length;
    const end = textarea?.selectionEnd ?? preferences.text.length;
    const normalizedKey = key === "Backspace" || key === "Space" || key === "Enter" ? key : applyOrthographyPreference(key, preferences.orthography);
    const result = applyEditorKey(preferences.text, start, end, normalizedKey);
    updatePreferences({ text: result.value });
    if (shift && key !== "Backspace" && key !== "Space" && key !== "Enter") setShift(false);
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(result.caret, result.caret);
    });
  }

  function handlePhysicalKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (!shouldHandlePhysicalPhoneticInput({ layout: preferences.layout, ctrlKey: event.ctrlKey, metaKey: event.metaKey, altKey: event.altKey })) return;
    const textarea = textareaRef.current;
    const result = applyPhoneticEditorKey({
      value: preferences.text,
      selectionStart: textarea?.selectionStart ?? preferences.text.length,
      selectionEnd: textarea?.selectionEnd ?? preferences.text.length,
      key: event.key,
      dialect: preferences.dialect,
      orthography: preferences.orthography,
      session: phoneticSessionRef.current,
    });
    if (!result) {
      resetPhoneticSession();
      return;
    }
    event.preventDefault();
    phoneticSessionRef.current = result.session;
    setPreferences((current) => ({ ...current, text: result.value }));
    setTranslation("");
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(result.caret, result.caret);
    });
  }

  async function copyText() {
    if (!preferences.text) return setStatus("There is no text to copy yet.");
    try {
      await navigator.clipboard.writeText(preferences.text);
      setStatus("Copied to clipboard.");
    } catch {
      setStatus("Copy permission was blocked by your browser. Select the text and copy it manually.");
    }
  }

  async function pasteText() {
    try {
      const pasted = await navigator.clipboard.readText();
      if (!pasted) return setStatus("Clipboard is empty.");
      resetPhoneticSession();
      const textarea = textareaRef.current;
      const result = applyEditorKey(preferences.text, textarea?.selectionStart ?? preferences.text.length, textarea?.selectionEnd ?? preferences.text.length, pasted);
      updatePreferences({ text: applyOrthographyPreference(result.value, preferences.orthography) });
      setStatus("Pasted from clipboard.");
    } catch {
      setStatus("Paste permission was blocked by your browser. You can still paste directly into the editor.");
    }
  }

  async function translateToEnglish() {
    if (!preferences.text.trim()) return;
    setTranslating(true);
    setStatus("");
    try {
      const result = await runAIAction({ action: "translate", text: preferences.text, dialect: preferences.dialect, orthography: preferences.orthography });
      setTranslation(result);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "This feature is temporarily unavailable.");
    } finally {
      setTranslating(false);
    }
  }

  function removeVocabulary(id: string) {
    const next = vocabulary.filter((entry) => entry.id !== id);
    setVocabulary(next);
    saveVocabulary(next);
  }

  function clearVocabulary() {
    setVocabulary([]);
    saveVocabulary([]);
  }

  return (
    <>
      <div className="page-shell">
        <div className="keyboard-layout-shell">
          <main className="keyboard-main-column">
            <section className="tool-card" aria-labelledby="keyboard-title">
              <div className="tool-intro">
                <p className="eyebrow">Free Armenian typing tool</p>
                <h1 id="keyboard-title">Armenian Keyboard</h1>
                <p>Type Western or Eastern Armenian online, use a standard or phonetic layout, copy your text and access useful Armenian learning tools.</p>
              </div>

              <div className="control-grid">
                <SegmentedControl label="Dialect" value={preferences.dialect} options={dialectOptions} onChange={(dialect: Dialect) => updatePreferences({ dialect })} />
                <SegmentedControl label="Keyboard layout" value={preferences.layout} options={layoutOptions} onChange={(layout: KeyboardLayout) => updatePreferences({ layout })} />
                <SegmentedControl label="Orthography" value={preferences.orthography} options={orthographyOptions} onChange={(orthography: Orthography) => updatePreferences({ orthography, text: applyOrthographyPreference(preferences.text, orthography) })} />
              </div>

              <div className="editor-wrap">
                <label className="sr-only" htmlFor="armenian-editor">Armenian text</label>
                <textarea
                  id="armenian-editor"
                  ref={textareaRef}
                  className="armenian-editor armenian-text"
                  value={preferences.text}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => updatePreferences({ text: event.target.value })}
                  onKeyDown={handlePhysicalKey}
                  placeholder="Սկսեք գրել հայերեն…"
                  spellCheck={false}
                  maxLength={5000}
                />
                <div className="editor-toolbar">
                  <div className="editor-counts"><span>Characters: {characters}</span><span>Words: {words}</span></div>
                  <div className="editor-actions">
                    <button type="button" onClick={() => updatePreferences({ text: "" })}>⌫ Clear</button>
                    <button type="button" onClick={() => void pasteText()}>▣ Paste</button>
                    <button type="button" onClick={() => void copyText()}>▢ Copy</button>
                  </div>
                </div>
              </div>

              {preferences.layout === "phonetic" ? (
                <div className="phonetic-helper-panel">
                  <div>
                    <h2>Type Armenian phonetically</h2>
                    <p className="phonetic-example-line">sh → շ · ts → ց · x/kh → խ · gh → ղ · ye → ե</p>
                  </div>
                  <details className="phonetic-help-details">
                    <summary>Typing help</summary>
                    <div className="phonetic-help-grid">
                      {phoneticHelpItems.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </details>
                </div>
              ) : null}

              <OnScreenKeyboard dialect={preferences.dialect} layout={preferences.layout} orthography={preferences.orthography} shift={shift} onToggleShift={() => setShift((value) => !value)} onKeyPress={insertKey} />

              <div className="quick-actions-row">
                <button type="button" className="secondary-button" onClick={() => setVocabularyOpen(true)}>Saved vocabulary <span className="count-badge">{vocabulary.length}</span></button>
                <span className="keyboard-note">Phonetic mode also maps common Latin letter keys while you type.</span>
              </div>

              {status ? <p className="status-message" role="status">{status}</p> : null}
            </section>
          </main>

          <PromoSidebar transliteration={transliteration} translation={translation} dialect={preferences.dialect} hasText={Boolean(preferences.text.trim())} translating={translating} onTranslate={() => void translateToEnglish()} />
        </div>

        <AITools />

        <section className="tips-grid" aria-label="Keyboard tips and help">
          <a className="tip-card" href="#keyboard-title"><span className="tip-icon">☼</span><span><strong>Tips for typing</strong><small>Use the phonetic layout if you’re not familiar with the key positions.</small></span><b>›</b></a>
          <div className="tip-card"><span className="tip-icon">⌨</span><span><strong>Keyboard shortcuts</strong><small>Ctrl + A Select all · Ctrl + C Copy · Ctrl + V Paste</small></span></div>
          <a className="tip-card" href="mailto:hello@tunapp.com"><span className="tip-icon">?</span><span><strong>Contact us</strong><small>Contact us via email.</small></span><b>›</b></a>
        </section>
      </div>

      <VocabularyPanel open={vocabularyOpen} entries={vocabulary} onClose={() => setVocabularyOpen(false)} onRemove={removeVocabulary} onClear={clearVocabulary} />
    </>
  );
}
