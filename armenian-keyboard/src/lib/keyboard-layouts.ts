import type { Dialect, KeyboardLayout, Orthography } from "@/types/keyboard";

export interface KeyboardKey {
  value: string;
  label?: string;
  helper?: string;
  wide?: boolean;
  action?: "backspace" | "shift" | "space" | "enter";
}

const alphabet = [
  "ա", "բ", "գ", "դ", "ե", "զ", "է", "ը", "թ", "ժ", "ի", "լ", "խ", "ծ", "կ", "հ", "ձ", "ղ", "ճ",
  "մ", "յ", "ն", "շ", "ո", "չ", "պ", "ջ", "ռ", "ս", "վ", "տ", "ր", "ց", "ւ", "փ", "ք", "օ", "ֆ",
];

const standardRows = [
  alphabet.slice(0, 10),
  alphabet.slice(10, 20),
  alphabet.slice(20, 29),
  alphabet.slice(29),
];

const phoneticRows = [
  ["ք", "վ", "ե", "ր", "տ", "ը", "ւ", "ի", "ո", "պ", "չ"],
  ["ա", "ս", "դ", "ֆ", "գ", "հ", "յ", "կ", "լ", "խ", "ժ"],
  ["զ", "ց", "ծ", "բ", "ն", "մ", "շ", "ղ", "ճ", "ջ", "ձ"],
  ["է", "թ", "ռ", "փ", "օ"],
];

const commonPhoneticHelpers: Record<string, string> = {
  ա: "a",
  դ: "d",
  ե: "e",
  զ: "z",
  է: "e",
  ը: "ë",
  թ: "t",
  ժ: "zh",
  ի: "i",
  լ: "l",
  խ: "x",
  հ: "h",
  ղ: "gh",
  մ: "m",
  յ: "y",
  ն: "n",
  շ: "sh",
  ո: "o",
  չ: "ch",
  ռ: "rr",
  ս: "s",
  վ: "v",
  ր: "r",
  ց: "ts",
  ւ: "w",
  փ: "p",
  ք: "q",
  օ: "o",
  ֆ: "f",
};

const easternPhoneticHelpers: Record<string, string> = {
  ...commonPhoneticHelpers,
  բ: "b",
  գ: "g",
  ծ: "tz",
  կ: "k",
  ձ: "dz",
  ճ: "ch",
  պ: "p",
  ջ: "j",
  տ: "t",
};

const westernPhoneticHelpers: Record<string, string> = {
  ...commonPhoneticHelpers,
  բ: "p",
  գ: "k",
  ծ: "dz",
  կ: "g",
  ձ: "tz",
  ճ: "j",
  պ: "b",
  ջ: "ch",
  տ: "d",
};

const punctuation: KeyboardKey[] = [
  { value: "՝", label: "՝" },
  { value: "․", label: "․" },
  { value: "։", label: "։" },
  { value: "՞", label: "՞" },
  { value: "՜", label: "՜" },
  { value: "՚", label: "՚" },
];

export const PHONETIC_KEY_MAP: Record<string, string> = {
  a: "ա", b: "բ", g: "գ", d: "դ", e: "ե", z: "զ", t: "տ", y: "յ", i: "ի", l: "լ",
  x: "խ", c: "ծ", k: "կ", h: "հ", j: "ջ", m: "մ", n: "ն", s: "ս", o: "ո", p: "պ",
  r: "ր", v: "վ", f: "ֆ", q: "ք", w: "ւ",
};

export function getKeyboardRows(
  layout: KeyboardLayout,
  dialect: Dialect,
  orthography: Orthography,
  shift: boolean,
): KeyboardKey[][] {
  const sourceRows = layout === "phonetic" ? phoneticRows : standardRows;
  const helpers = dialect === "western" ? westernPhoneticHelpers : easternPhoneticHelpers;
  const mapped: KeyboardKey[][] = sourceRows.map((row) => row.map((value) => ({
    value: shift ? value.toLocaleUpperCase("hy-AM") : value,
    helper: layout === "phonetic" ? helpers[value] : undefined,
  })));

  if (orthography === "reformed") {
    mapped[3] = [...mapped[3], { value: shift ? "ԵՎ" : "և" }];
  }

  return [
    [...mapped[0], punctuation[0]],
    mapped[1],
    mapped[2],
    [
      { value: "Shift", label: "⇧", action: "shift", wide: true },
      ...mapped[3],
      punctuation[1],
      punctuation[2],
      { value: "Backspace", label: "⌫", action: "backspace", wide: true },
    ],
    [
      { value: "Enter", label: "Enter", action: "enter", wide: true },
      { value: "Space", label: "Space", action: "space", wide: true },
      ...punctuation.slice(3),
    ],
  ];
}
