import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArmenianAlphabetTable } from "./ArmenianAlphabetTable";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Armenian Alphabet",
  description: "Learn the Armenian alphabet, compare Eastern and Western Armenian pronunciation, and use the free Armenian keyboard online.",
  alternates: { canonical: "/armenian-alphabet" },
};

const keyboardUrl = "https://armeniankeyboard.com";
const learnUrl = "https://tunapp.com/get-started/";

export default function ArmenianAlphabetPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <article className={styles.article}>
          <section className={styles.hero}>
            <p className={styles.eyebrow}>Armenian alphabet guide</p>
            <h1>Armenian Alphabet: Letters, Pronunciation &amp; Online Keyboard</h1>
            <p>The Armenian alphabet is a unique writing system used to write the Armenian language. Whether you&apos;re learning Armenian, trying to read Armenian letters for the first time, or simply need an Armenian online keyboard to type a word or message, this guide will help you understand the Armenian written alphabet.</p>
            <p>Explore every Armenian letter below, including its uppercase and lowercase form, English transliteration, pronunciation and example usage.</p>
            <p>You can also use our free Armenian keyboard to type Armenian directly from your computer, phone or tablet — no Armenian keyboard installation required.</p>
            <a className={styles.cta} href={keyboardUrl}>Start typing with the Armenian Keyboard →</a>
          </section>

          <section className={styles.sectionCard}>
            <h2>The Armenian Alphabet</h2>
            <p>The Armenian language alphabet was created in the early 5th century by Mesrop Mashtots and developed into the distinctive Armenian script still used today.</p>
            <p>Modern Armenian is written from left to right and has 39 letters. The original alphabet created by Mashtots contained 36 letters, with additional characters introduced later.</p>
            <p>The alphabet is used for both major forms of modern Armenian: <strong>Eastern Armenian</strong>, spoken primarily in Armenia and other parts of the former Soviet Union, and <strong>Western Armenian</strong>, historically spoken throughout the Armenian diaspora.</p>
            <p>They share fundamentally the same Armenian script, although differences in pronunciation, orthography, vocabulary and grammar mean the same Armenian lettering isn&apos;t always pronounced or used identically in the two varieties.</p>
          </section>

          <section className={styles.sectionCard}>
            <h2>Armenian Alphabet Chart</h2>
            <p className={styles.tableIntro}>Use the table below to learn the Armenian letters, their names, transliterations and approximate pronunciation.</p>
            <ArmenianAlphabetTable />
            <p className={styles.sourceNote}>Alphabet chart structure and values adapted from the Armenian alphabet reference table on Wikipedia, with the client-requested columns removed.</p>
          </section>

          <section className={styles.sectionCard}>
            <h2>Eastern and Western Armenian Alphabet Pronunciation</h2>
            <p>Armenian pronunciation is much simpler than the English language as each letter has a unique sound. However, pronunciation does vary between Eastern and Western dialects.</p>
            <p>We have prepared two short videos to help you learn the pronunciation in each dialect. Simply play the videos below with sound on to listen to how each letter is pronounced. These videos are courtesy of <a className={styles.textLink} href="https://tunapp.com" target="_blank" rel="noopener noreferrer">Tun Online Armenian School</a>.</p>
            <div className={styles.videoGrid}>
              <div className={styles.videoCard}>
                <h3>Eastern Armenian pronunciation</h3>
                <div className={styles.videoFrame}>
                  <iframe src="https://player.vimeo.com/video/780911329?badge=0&autopause=0&player_id=0&app_id=58479" title="Tun Pronunciation Eastern Armenian" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowFullScreen />
                </div>
              </div>
              <div className={styles.videoCard}>
                <h3>Western Armenian pronunciation</h3>
                <div className={styles.videoFrame}>
                  <iframe src="https://player.vimeo.com/video/780911379?badge=0&autopause=0&player_id=0&app_id=58479" title="Tun Pronunciation Western Armenian" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowFullScreen />
                </div>
              </div>
            </div>
          </section>

          <section className={styles.sectionCard}>
            <h2>How Many Letters Are in the Armenian Alphabet?</h2>
            <p>The modern <strong>Armenian alphabet has 39 letters</strong>.</p>
            <p>Mesrop Mashtots&apos; original alphabet contained <strong>36 letters</strong>. The letters <strong>օ (o)</strong> and <strong>ֆ (fe)</strong> were added during the Middle Ages, while <strong>և</strong> subsequently came to be treated as a separate letter in the modern alphabet.</p>
            <p>Like English, Armenian has uppercase and lowercase forms.</p>
            <div className={styles.inlineLetters}>Ա → ա<br />Բ → բ<br />Գ → գ</div>
            <p>However, Armenian is not written using the Latin alphabet. It has its own distinctive Armenian script, which is one reason Armenian writing looks so different from neighbouring languages.</p>
          </section>

          <section className={styles.sectionCard}>
            <h2>What Does the Armenian Alphabet Look Like?</h2>
            <p>The beginning of the Armenian written alphabet is:</p>
            <span className={styles.inlineLetters}>Ա Բ Գ Դ Ե Զ Է Ը Թ Ժ Ի Լ Խ Ծ Կ Հ Ձ Ղ Ճ Մ Յ Ն Շ Ո Չ Պ Ջ Ռ Ս Վ Տ Ր Ց Ւ Փ Ք Օ Ֆ</span>
            <p>Lowercase:</p>
            <span className={styles.inlineLetters}>ա բ գ դ ե զ է ը թ ժ ի լ խ ծ կ հ ձ ղ ճ մ յ ն շ ո չ պ ջ ռ ս վ տ ր ց ւ փ ք օ ֆ</span>
            <p>You&apos;ll encounter lowercase Armenian lettering most frequently when reading ordinary sentences, websites, books and messages.</p>
          </section>

          <section className={styles.sectionCard}>
            <h2>What Is the Letter A in Armenian?</h2>
            <p>If you&apos;re looking for the <strong>letter A in Armenian</strong>, it is:</p>
            <span className={styles.inlineLetters}>Ա ա</span>
            <p>The uppercase form is <strong>Ա</strong> and the lowercase form is <strong>ա</strong>.</p>
            <p>Its Armenian name is <strong>այբ (ayb)</strong>, and it generally represents an <strong>“a”</strong> sound.</p>
            <p>It is also the first letter of the Armenian alphabet.</p>
            <a className={styles.textLink} href={keyboardUrl}>Try typing Ա and ա on our Armenian keyboard →</a>
          </section>

          <section className={styles.sectionCard}>
            <h2>Eastern Armenian Alphabet</h2>
            <p>The <strong>Eastern Armenian alphabet</strong> uses the same core Armenian writing system as Western Armenian, but some letters are pronounced differently.</p>
            <p>This is important for learners because simply knowing an Armenian letter&apos;s English transliteration doesn&apos;t always tell you exactly how it will sound.</p>
            <p>For example, consonant pronunciation is one of the notable differences between Eastern and Western Armenian. A letter may therefore be represented differently in Latin transliteration depending on the dialect and transliteration convention being used.</p>
            <p>If you&apos;re learning Armenian, choose your dialect before learning pronunciation:</p>
            <p><a className={styles.textLink} href={learnUrl} target="_blank" rel="noopener noreferrer">Eastern Armenian</a> &nbsp; <a className={styles.textLink} href={learnUrl} target="_blank" rel="noopener noreferrer">Western Armenian</a></p>
            <p>Our alphabet chart lets you compare the pronunciation of individual letters across the two.</p>
          </section>

          <section className={styles.sectionCard}>
            <h2>Eastern vs Western Armenian Letters</h2>
            <p>Eastern and Western Armenian are <strong>not different alphabets</strong> in the way that, for example, Latin and Cyrillic are different scripts.</p>
            <p>Both are written using Armenian letters.</p>
            <p>What changes is how some of those letters and letter combinations are <strong>pronounced, spelled and used</strong>.</p>
            <p>This distinction matters particularly for diaspora learners. Someone learning Western Armenian to communicate with family may need different pronunciation guidance from someone learning Eastern Armenian before travelling to Yerevan.</p>
            <p>That&apos;s why ArmenianKeyboard.com allows you to choose between <strong>Eastern Armenian and Western Armenian</strong> rather than presenting Armenian as though there were only one form.</p>
          </section>

          <section className={styles.sectionCard}>
            <h2>English to Armenian Alphabet</h2>
            <p>There isn&apos;t a perfect one-to-one conversion from the <strong>English alphabet to the Armenian alphabet</strong>.</p>
            <p>English uses 26 Latin letters, while modern Armenian uses 39 Armenian letters. Armenian also contains sounds that cannot always be represented accurately by simply substituting one English letter for one Armenian letter.</p>
            <div className={styles.exampleBox}><strong>a → ա</strong></div>
            <p>may be straightforward in many words, but converting complete English words into Armenian requires understanding their <strong>sounds</strong>, rather than replacing individual letters mechanically.</p>
            <p>This is the difference between <strong>translation</strong> and <strong>transliteration</strong>.</p>
            <h3>Translation</h3>
            <p>Changes the language:</p>
            <div className={styles.exampleBox}><strong>Hello → Բարեւ</strong></div>
            <h3>Transliteration</h3>
            <p>Changes the writing system while attempting to preserve pronunciation:</p>
            <div className={styles.exampleBox}><strong>Բարեւ → barev / parev</strong></div>
            <p>If you want to write Armenian but don&apos;t know the Armenian keyboard layout, use our <strong>phonetic Armenian keyboard</strong>. You can type Armenian using familiar Latin characters and convert your typing into Armenian script.</p>
            <a className={styles.textLink} href={keyboardUrl}>Try English-to-Armenian phonetic typing →</a>
          </section>

          <section className={styles.sectionCard}>
            <h2>How to Type Armenian Online</h2>
            <p>You don&apos;t need to buy an Armenian physical keyboard or change your computer settings to start writing Armenian.</p>
            <p>Our free <strong>Armenian online keyboard</strong> lets you type Armenian directly in your browser.</p>
            <p>You can:</p>
            <ul className={styles.twoColumnList}>
              <li>Click Armenian letters using the onscreen keyboard</li>
              <li>Type using a phonetic Latin keyboard</li>
              <li>Switch between Eastern and Western Armenian</li>
              <li>Copy and paste Armenian text</li>
              <li>Transliterate Armenian into Latin characters</li>
              <li>Translate Armenian and English</li>
              <li>Listen to Armenian pronunciation</li>
              <li>Check words and explore their meanings</li>
              <li>Send verbs to the Armenian verb conjugator</li>
            </ul>
            <a className={styles.textLink} href={keyboardUrl}>Open the Armenian Keyboard →</a>
          </section>

          <section className={styles.sectionCard}>
            <h2>Armenian Keyboard for Beginners</h2>
            <p>If you&apos;re still learning where the <strong>Armenian letters</strong> are located, start with the phonetic keyboard.</p>
            <p>Instead of memorising an unfamiliar keyboard layout immediately, you can type approximately how an Armenian word sounds using English letters and convert it into Armenian script.</p>
            <p>As you become more familiar with Armenian writing, you can switch to the standard Armenian keyboard layout.</p>
            <p>This makes the tool useful both for complete beginners and Armenian speakers who simply don&apos;t have an Armenian keyboard installed on their device.</p>
          </section>

          <section className={styles.sectionCard}>
            <h2>Armenian Script and the Armenian Written Language</h2>
            <p>Learning the <strong>Armenian written language</strong> opens up much more than the ability to type.</p>
            <p>Once you recognise Armenian script, you can begin reading Armenian names, signs, messages, books, websites, songs and historical material in their original writing system.</p>
            <p>For new learners, the characters may initially look unfamiliar. The best approach is usually to learn them gradually:</p>
            <div className={styles.exampleBox}><strong>See the letter → hear its sound → type it → see it inside a word → practise reading it in a sentence.</strong></div>
            <p>Rather than trying to memorise all 39 Armenian letters at once, begin with common letters and use them immediately.</p>
          </section>

          <section className={styles.sectionCard}>
            <h2>Learn Armenian Lettering by Typing</h2>
            <p>One of the easiest ways to become familiar with <strong>Armenian lettering</strong> is simply to use it.</p>
            <p>Choose an Armenian letter from the alphabet chart above and find it on the keyboard. Then try typing Armenian words containing that character.</p>
            <p>For example, once you&apos;ve learned <strong>ա</strong>, look for it inside real Armenian words.</p>
            <p>This connects visual recognition of the Armenian character with its sound and position on the keyboard.</p>
            <a className={styles.textLink} href={keyboardUrl}>Practice with the Armenian Keyboard →</a>
          </section>

          <section className={styles.sectionCard}>
            <h2>Frequently Asked Questions About the Armenian Alphabet</h2>
            <div className={styles.faq}>
              <div className={styles.faqItem}><h3>How many letters are in the Armenian alphabet?</h3><p>The modern Armenian alphabet contains <strong>39 letters</strong>. The original alphabet attributed to Mesrop Mashtots contained 36 letters, with additional characters introduced later.</p></div>
              <div className={styles.faqItem}><h3>Who created the Armenian alphabet?</h3><p>The Armenian alphabet is traditionally attributed to <strong>Mesrop Mashtots</strong>, who created it in the early 5th century.</p></div>
              <div className={styles.faqItem}><h3>Is Armenian written from left to right?</h3><p>Yes. Modern Armenian script is written <strong>from left to right</strong>.</p></div>
              <div className={styles.faqItem}><h3>Is the Eastern Armenian alphabet different from Western Armenian?</h3><p>Eastern and Western Armenian use the same underlying Armenian script, but there are important differences in <strong>pronunciation and orthography</strong>, as well as vocabulary and grammar.</p></div>
              <div className={styles.faqItem}><h3>Can I type Armenian with an English keyboard?</h3><p>Yes. A <strong>phonetic Armenian online keyboard</strong> can let you type using Latin characters and produce Armenian script, making it easier to write Armenian without memorising the standard keyboard layout first.</p></div>
              <div className={styles.faqItem}><h3>Can English letters be converted into Armenian letters?</h3><p>Yes, through <strong>transliteration</strong>, although it isn&apos;t always a simple letter-for-letter conversion. Armenian and English contain different sounds and use different writing systems.</p></div>
              <div className={styles.faqItem}><h3>What is the first letter of the Armenian alphabet?</h3><p>The first letter is <strong>Ա / ա</strong>, called <strong>ayb (այբ)</strong>.</p></div>
              <div className={styles.faqItem}><h3>What is the Armenian letter for A?</h3><p>The Armenian equivalent commonly associated with the English <strong>A</strong> is <strong>Ա</strong> uppercase and <strong>ա</strong> lowercase.</p></div>
              <div className={styles.faqItem}><h3>Is Armenian written in Cyrillic?</h3><p>No. Armenian has its <strong>own alphabet and script</strong>. It is not written using the Cyrillic, Greek or Latin alphabet.</p></div>
            </div>
          </section>

          <section className={styles.sectionCard}>
            <h2>Learn the Armenian Alphabet by Using It</h2>
            <p>The fastest way to become comfortable with the <strong>Armenian alphabet</strong> is to move beyond memorising a chart.</p>
            <p>Type the letters. Listen to their pronunciation. Build words. Translate what you&apos;ve written. Compare Eastern and Western Armenian. Then start recognising the same characters in real Armenian sentences.</p>
            <p>Our free Armenian keyboard gives you one place to do it all.</p>
            <a className={styles.cta} href={keyboardUrl}>Start Typing Armenian Online →</a>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
