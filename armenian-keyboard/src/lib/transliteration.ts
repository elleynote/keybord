import type { Dialect } from "@/types/keyboard";

const eastern: Record<string, string> = {
  ա: "a", բ: "b", գ: "g", դ: "d", ե: "e", զ: "z", է: "e", ը: "ë", թ: "t", ժ: "zh",
  ի: "i", լ: "l", խ: "kh", ծ: "ts", կ: "k", հ: "h", ձ: "dz", ղ: "gh", ճ: "ch", մ: "m",
  յ: "y", ն: "n", շ: "sh", ո: "o", չ: "ch", պ: "p", ջ: "j", ռ: "rr", ս: "s", վ: "v",
  տ: "t", ր: "r", ց: "ts", ւ: "v", փ: "p", ք: "k", օ: "o", ֆ: "f", և: "yev",
};

const western: Record<string, string> = {
  ...eastern,
  բ: "p", գ: "k", դ: "t", ծ: "dz", կ: "g", ձ: "ts", ճ: "j", պ: "b", ջ: "ch", տ: "d",
};

function lowerArmenian(value: string): string {
  return value.toLocaleLowerCase("hy-AM");
}

function transliterateWord(word: string, dialect: Dialect, sentenceStart: boolean): string {
  const lower = lowerArmenian(word);
  if (lower === "եմ") return preserveCase(word, "em");
  if (lower === "ես") return preserveCase(word, sentenceStart ? "yes" : "es");

  const table = dialect === "western" ? western : eastern;
  const chars = [...lower];
  let result = "";
  for (let index = 0; index < chars.length; index += 1) {
    const char = chars[index];
    if (char === "ո" && chars[index + 1] === "ւ") {
      result += "u";
      index += 1;
    } else if (char === "ե") result += index === 0 ? "ye" : "e";
    else if (char === "ո") result += index === 0 ? "vo" : "o";
    else result += table[char] ?? char;
  }
  return preserveCase(word, result);
}

function preserveCase(source: string, value: string): string {
  const first = [...source][0];
  if (first && first === first.toLocaleUpperCase("hy-AM") && first !== first.toLocaleLowerCase("hy-AM")) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return value;
}

export function transliterate(text: string, dialect: Dialect): string {
  let sentenceStart = true;
  return text.replace(/[\u0531-\u0556\u0561-\u0587]+|[^\u0531-\u0556\u0561-\u0587]+/gu, (token) => {
    if (/^[\u0531-\u0556\u0561-\u0587]+$/u.test(token)) {
      const out = transliterateWord(token, dialect, sentenceStart);
      sentenceStart = false;
      return out;
    }
    if (/[.!?։]\s*$/u.test(token)) sentenceStart = true;
    return token;
  });
}
