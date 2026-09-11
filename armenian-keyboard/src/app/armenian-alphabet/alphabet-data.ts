export interface ArmenianAlphabetRow {
  forms: string;
  nameClassical: string;
  nameReformed: string;
  letterClassical: string;
  letterEastern: string;
  letterWestern: string;
  transliterationClassical: string;
  transliterationIso9985: string;
}

export const armenianAlphabetRows: ArmenianAlphabetRow[] = [
  { forms: "Ա • ա", nameClassical: "այբ ayb", nameReformed: "այբ ayb", letterClassical: "/ɑ/", letterEastern: "/ɑ/", letterWestern: "/ɑ/", transliterationClassical: "a", transliterationIso9985: "a" },
  { forms: "Բ • բ", nameClassical: "բեն ben", nameReformed: "բեն ben", letterClassical: "/b/", letterEastern: "/b/", letterWestern: "/pʰ/", transliterationClassical: "b", transliterationIso9985: "b" },
  { forms: "Գ • գ", nameClassical: "գիմ gim", nameReformed: "գիմ gim", letterClassical: "/ɡ/", letterEastern: "/ɡ/", letterWestern: "/kʰ/", transliterationClassical: "g", transliterationIso9985: "g" },
  { forms: "Դ • դ", nameClassical: "դա da", nameReformed: "դա da", letterClassical: "/d/", letterEastern: "/d/", letterWestern: "/tʰ/", transliterationClassical: "d", transliterationIso9985: "d" },
  { forms: "Ե • ե", nameClassical: "եչ yečʼ", nameReformed: "եչ yečʼ", letterClassical: "/ɛ/", letterEastern: "/ɛ/, word-initially /jɛ/", letterWestern: "/ɛ/, word-initially /jɛ/", transliterationClassical: "e", transliterationIso9985: "e" },
  { forms: "Զ • զ", nameClassical: "զա za", nameReformed: "զա za", letterClassical: "/z/", letterEastern: "/z/", letterWestern: "/z/", transliterationClassical: "z", transliterationIso9985: "z" },
  { forms: "Է • է", nameClassical: "է ē", nameReformed: "է ē", letterClassical: "/e/", letterEastern: "/ɛ/", letterWestern: "/ɛ/", transliterationClassical: "ê", transliterationIso9985: "ē" },
  { forms: "Ը • ը", nameClassical: "ըթ ëtʼ", nameReformed: "ըթ ëtʼ", letterClassical: "/ə/", letterEastern: "/ə/", letterWestern: "/ə/", transliterationClassical: "ə", transliterationIso9985: "ë" },
  { forms: "Թ • թ", nameClassical: "թո tʼo", nameReformed: "թո tʼo", letterClassical: "/tʰ/", letterEastern: "/tʰ/", letterWestern: "/tʰ/", transliterationClassical: "t̔, tʿ", transliterationIso9985: "ṫ" },
  { forms: "Ժ • ժ", nameClassical: "ժէ žē", nameReformed: "ժե že", letterClassical: "/ʒ/", letterEastern: "/ʒ/", letterWestern: "/ʒ/", transliterationClassical: "ž", transliterationIso9985: "ž" },
  { forms: "Ի • ի", nameClassical: "ինի ini", nameReformed: "ինի ini", letterClassical: "/i/", letterEastern: "/i/", letterWestern: "/i/", transliterationClassical: "i", transliterationIso9985: "i" },
  { forms: "Լ • լ", nameClassical: "լիւն liwn", nameReformed: "լյուն lyun", letterClassical: "/l/", letterEastern: "/l/", letterWestern: "/l/", transliterationClassical: "l", transliterationIso9985: "l" },
  { forms: "Խ • խ", nameClassical: "խէ xē", nameReformed: "խե xe", letterClassical: "/χ/", letterEastern: "/χ/", letterWestern: "/χ/", transliterationClassical: "x", transliterationIso9985: "x" },
  { forms: "Ծ • ծ", nameClassical: "ծա ca", nameReformed: "ծա ca", letterClassical: "/ts/", letterEastern: "/ts/", letterWestern: "/dz/", transliterationClassical: "c", transliterationIso9985: "ç" },
  { forms: "Կ • կ", nameClassical: "կեն ken", nameReformed: "կեն ken", letterClassical: "/k/", letterEastern: "/k/", letterWestern: "/ɡ/", transliterationClassical: "k", transliterationIso9985: "k" },
  { forms: "Հ • հ", nameClassical: "հո ho", nameReformed: "հո ho", letterClassical: "/h/", letterEastern: "/h/", letterWestern: "/h/", transliterationClassical: "h", transliterationIso9985: "h" },
  { forms: "Ձ • ձ", nameClassical: "ձա ja", nameReformed: "ձա ja", letterClassical: "/dz/", letterEastern: "/dz/", letterWestern: "/tsʰ/", transliterationClassical: "j", transliterationIso9985: "j" },
  { forms: "Ղ • ղ", nameClassical: "ղատ ġat", nameReformed: "ղատ ġat", letterClassical: "/ɫ/", letterEastern: "/ʁ/", letterWestern: "/ʁ/", transliterationClassical: "ł", transliterationIso9985: "ġ" },
  { forms: "Ճ • ճ", nameClassical: "ճէ čē", nameReformed: "ճե če", letterClassical: "/tʃ/", letterEastern: "/tʃ/", letterWestern: "/dʒ/", transliterationClassical: "č", transliterationIso9985: "č" },
  { forms: "Մ • մ", nameClassical: "մեն men", nameReformed: "մեն men", letterClassical: "/m/", letterEastern: "/m/", letterWestern: "/m/", transliterationClassical: "m", transliterationIso9985: "m" },
  { forms: "Յ • յ", nameClassical: "յի yi", nameReformed: "հի hi", letterClassical: "/j/", letterEastern: "/h/, /j/", letterWestern: "/j/", transliterationClassical: "y", transliterationIso9985: "y" },
  { forms: "Ն • ն", nameClassical: "նու nu", nameReformed: "նու nu", letterClassical: "/n/, /ŋ/", letterEastern: "/n/, /ŋ/", letterWestern: "/n/, /ŋ/", transliterationClassical: "n", transliterationIso9985: "n" },
  { forms: "Շ • շ", nameClassical: "շա ša", nameReformed: "շա ša", letterClassical: "/ʃ/", letterEastern: "/ʃ/", letterWestern: "/ʃ/", transliterationClassical: "š", transliterationIso9985: "š" },
  { forms: "Ո • ո", nameClassical: "ո o", nameReformed: "ո vo", letterClassical: "/ɔ/", letterEastern: "/ɔ/, word-initially /ʋɔ/", letterWestern: "/ɔ/, word-initially /ʋɔ/", transliterationClassical: "o", transliterationIso9985: "o" },
  { forms: "Չ • չ", nameClassical: "չա čʼa", nameReformed: "չա čʼa", letterClassical: "/tʃʰ/", letterEastern: "/tʃʰ/", letterWestern: "/tʃʰ/", transliterationClassical: "č̔, čʿ", transliterationIso9985: "ċ" },
  { forms: "Պ • պ", nameClassical: "պէ pē", nameReformed: "պե pe", letterClassical: "/p/", letterEastern: "/p/", letterWestern: "/b/", transliterationClassical: "p", transliterationIso9985: "p" },
  { forms: "Ջ • ջ", nameClassical: "ջէ ǰē", nameReformed: "ջե ǰe", letterClassical: "/dʒ/", letterEastern: "/dʒ/", letterWestern: "/tʃʰ/", transliterationClassical: "ǰ", transliterationIso9985: "ǰ" },
  { forms: "Ռ • ռ", nameClassical: "ռա ṙa", nameReformed: "ռա ṙa", letterClassical: "/r/", letterEastern: "/r/", letterWestern: "/ɾ/", transliterationClassical: "ṙ", transliterationIso9985: "ṙ" },
  { forms: "Ս • ս", nameClassical: "սէ sē", nameReformed: "սե se", letterClassical: "/s/", letterEastern: "/s/", letterWestern: "/s/", transliterationClassical: "s", transliterationIso9985: "s" },
  { forms: "Վ • վ", nameClassical: "վեւ vew", nameReformed: "վեվ vev", letterClassical: "/w/", letterEastern: "/v/", letterWestern: "/v/", transliterationClassical: "v", transliterationIso9985: "v" },
  { forms: "Տ • տ", nameClassical: "տիւն tiwn", nameReformed: "տյուն tyun", letterClassical: "/t/", letterEastern: "/t/", letterWestern: "/d/", transliterationClassical: "t", transliterationIso9985: "t" },
  { forms: "Ր • ր", nameClassical: "րէ rē", nameReformed: "րե re", letterClassical: "/ɹ/", letterEastern: "/ɾ/", letterWestern: "/ɾ/", transliterationClassical: "r", transliterationIso9985: "r" },
  { forms: "Ց • ց", nameClassical: "ցո cʼo", nameReformed: "ցո cʼo", letterClassical: "/tsʰ/", letterEastern: "/tsʰ/", letterWestern: "/tsʰ/", transliterationClassical: "c̔, cʿ", transliterationIso9985: "ć" },
  { forms: "Ւ • ւ", nameClassical: "հիւն hiwn", nameReformed: "հյուն hyun, վյուն vyun", letterClassical: "/w/", letterEastern: "—", letterWestern: "/v/", transliterationClassical: "w", transliterationIso9985: "w" },
  { forms: "Ու • ու", nameClassical: "—", nameReformed: "ու u", letterClassical: "—", letterEastern: "/u/", letterWestern: "—", transliterationClassical: "u", transliterationIso9985: "ow" },
  { forms: "Փ • փ", nameClassical: "փիւր pʼiwr", nameReformed: "փյուր pʼyur", letterClassical: "/pʰ/", letterEastern: "/pʰ/", letterWestern: "/pʰ/", transliterationClassical: "p̔, pʿ", transliterationIso9985: "ṕ" },
  { forms: "Ք • ք", nameClassical: "քէ kʼē", nameReformed: "քե kʼe", letterClassical: "/kʰ/", letterEastern: "/kʰ/", letterWestern: "/kʰ/", transliterationClassical: "k̔, kʿ", transliterationIso9985: "ḱ" },
  { forms: "Օ • օ", nameClassical: "օ ò", nameReformed: "օ ò", letterClassical: "/o/", letterEastern: "/o/", letterWestern: "/o/", transliterationClassical: "ô", transliterationIso9985: "ò" },
  { forms: "Ֆ • ֆ", nameClassical: "ֆէ fē", nameReformed: "ֆե fe", letterClassical: "/f/", letterEastern: "/f/", letterWestern: "/f/", transliterationClassical: "f", transliterationIso9985: "f" },
  { forms: "և", nameClassical: "—", nameReformed: "և yew", letterClassical: "—", letterEastern: "/ɛv/, word-initially /jɛv/", letterWestern: "/ɛv/, word-initially /jɛv/", transliterationClassical: "ew", transliterationIso9985: "ew" },
];
