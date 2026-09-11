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
            return (
              <button
                className={`keyboard-key${key.wide ? " keyboard-key--wide" : ""}${action === "space" ? " keyboard-key--space" : ""}${action === "shift" && shift ? " is-active" : ""}`}
                type="button"
                key={`${key.value}-${keyIndex}`}
                aria-label={action ? `${label} key` : `Insert ${label}`}
                onMouseDown={(event: MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                onClick={() => action === "shift" ? onToggleShift() : onKeyPress(key.value)}
              >
                {label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
