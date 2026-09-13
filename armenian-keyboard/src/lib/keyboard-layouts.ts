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

const phoneticHelpers: Record<string, string> = {
  ա: "A",
  բ: "B",
  գ: "G",
  դ: "D",
  ե: "E",
  զ: "Z",
  է: "Ee",
  ը: "Y",
  թ: "Th",
  ժ: "Zh",
  ի: "I",
  լ: "L",
  խ: "X",
  ծ: "C",
  կ: "K",
  հ: "H",
  ձ: "Dz",
  ղ: "Gh",
  ճ: "Ch",
  մ: "M",
  ն: "N",
  շ: "Sh",
  ո: "O",
  չ: "Chh",
  պ: "P",
  ջ: "J",
  ռ: "Rr",
  ս: "S",
  վ: "V",
  տ: "T",
  ր: "R",
  ց: "Ts",
  ւ: "W",
  փ: "Ph",
  ք: "Q",
  օ: "Oo",
  ֆ: "F",
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
  a: "ա", b: "բ", g: "գ", d: "դ", e: "ե", z: "զ", t: "տ", y: "ը", i: "ի", l: "լ",
  x: "խ", c: "ծ", k: "կ", h: "հ", j: "ջ", m: "մ", n: "ն", s: "ս", o: "ո", p: "պ",
  r: "ր", v: "վ", f: "ֆ", q: "ք", w: "ւ",
};

export function getKeyboardRows(
  layout: KeyboardLayout,
  _dialect: Dialect,
  orthography: Orthography,
  shift: boolean,
): KeyboardKey[][] {
  const sourceRows = layout === "phonetic" ? phoneticRows : standardRows;
  const mapped: KeyboardKey[][] = sourceRows.map((row) => row.map((value) => ({
    value: shift ? value.toLocaleUpperCase("hy-AM") : value,
    helper: layout === "phonetic" ? phoneticHelpers[value] : undefined,
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
