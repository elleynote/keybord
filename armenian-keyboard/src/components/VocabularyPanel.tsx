import type { MouseEvent } from "react";
import type { VocabularyEntry } from "@/types/keyboard";

interface VocabularyPanelProps {
  open: boolean;
  entries: VocabularyEntry[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function VocabularyPanel({ open, entries, onClose, onRemove, onClear }: VocabularyPanelProps) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card vocabulary-modal" role="dialog" aria-modal="true" aria-labelledby="vocabulary-title" onMouseDown={(e: MouseEvent<HTMLElement>) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">Saved locally</p>
            <h2 id="vocabulary-title">My vocabulary</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close vocabulary">×</button>
        </div>

        {entries.length === 0 ? (
          <div className="empty-state">
            <strong>No saved words yet.</strong>
            <span>Use “Save words” after typing Armenian text.</span>
          </div>
        ) : (
          <div className="vocabulary-list">
            {entries.map((entry) => (
              <article className="vocabulary-item" key={entry.id}>
                <div>
                  <strong className="armenian-text">{entry.armenian}</strong>
                  <span>{entry.transliteration}</span>
                </div>
                <button type="button" className="text-link-button" onClick={() => onRemove(entry.id)}>Remove</button>
              </article>
            ))}
          </div>
        )}

        <div className="modal-actions">
          {entries.length > 0 ? <button type="button" className="secondary-button" onClick={onClear}>Clear vocabulary</button> : null}
          <button type="button" className="primary-button" onClick={onClose}>Close</button>
        </div>
      </section>
    </div>
  );
}
