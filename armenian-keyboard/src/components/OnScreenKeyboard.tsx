import type { MouseEvent } from "react";
import { getKeyboardRows } from "@/lib/keyboard-layouts";
import type { Dialect, KeyboardLayout, Orthography } from "@/types/keyboard";

interface OnScreenKeyboardProps {
  dialect: Dialect;
  layout: KeyboardLayout;
  orthography: Orthography;
  shift: boolean;
  onToggleShift: () => void;
  onKeyPress: (key: string) => void;
}

export function OnScreenKeyboard({ dialect, layout, orthography, shift, onToggleShift, onKeyPress }: OnScreenKeyboardProps) {
  const rows = getKeyboardRows(layout, dialect, orthography, shift);

  return (
    <div className="armenian-keyboard" aria-label="Armenian on-screen keyboard">
      {rows.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key, keyIndex) => {
            const action = key.action;
            const label = key.label ?? key.value;
            const helperLabel = key.helper ? ` (${key.helper})` : "";
            return (
              <button
                className={`keyboard-key${key.helper ? " keyboard-key--with-helper" : ""}${key.wide ? " keyboard-key--wide" : ""}${action === "space" ? " keyboard-key--space" : ""}${action === "shift" && shift ? " is-active" : ""}`}
                type="button"
                key={`${key.value}-${keyIndex}`}
                aria-label={action ? `${label} key` : `Insert ${label}${helperLabel}`}
                onMouseDown={(event: MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                onClick={() => action === "shift" ? onToggleShift() : onKeyPress(key.value)}
              >
                {key.helper ? (
                  <>
                    <span className="keyboard-key-primary">{label}</span>
                    <span className="keyboard-key-helper">{key.helper}</span>
                  </>
                ) : label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
