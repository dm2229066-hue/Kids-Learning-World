import React from 'react';
import { motion } from 'motion/react';
import { Star, Volume2 } from 'lucide-react';
import { AgeGroup, Language, LearningProgress, ModuleId } from '../types/learning';
import { playPop, speakText } from '../utils/audio';
import { PWAInstallButton } from './common/ToyUI';

interface HomeViewProps {
  progress: LearningProgress;
  onSelectModule: (id: ModuleId) => void;
  onSetLanguage: (lang: Language) => void;
  onSetAgeGroup: (age: AgeGroup) => void;
}

interface WorldTile {
  id: ModuleId;
  emoji: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  cardBg: string;
  borderColor: string;
  iconBg: string;
}

const LEARNING_WORLDS: WorldTile[] = [
  {
    id: 'abc',
    emoji: '🔤',
    titleEn: 'English ABCD',
    titleHi: 'अंग्रेज़ी ABCD',
    descEn: 'Letters A–Z with phonics & pictures',
    descHi: 'चित्रों और आवाज़ के साथ A से Z सीखें',
    cardBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    iconBg: 'bg-rose-500',
  },
  {
    id: 'hindi',
    emoji: '🪷',
    titleEn: 'Hindi Varnamala',
    titleHi: 'हिन्दी वर्णमाला',
    descEn: 'Swar (अ-अः) & Vyanjan (क-ज्ञ)',
    descHi: 'स्वर और व्यंजन बोलकर सीखें',
    cardBg: 'bg-orange-50',
    borderColor: 'border-orange-300',
    iconBg: 'bg-orange-500',
  },
  {
    id: 'numbers',
    emoji: '🔢',
    titleEn: 'Numbers 1–100',
    titleHi: 'गिनती 1–100',
    descEn: 'Count stars and hear 1 to 100',
    descHi: 'तारे गिनें और 1 से 100 तक सुनें',
    cardBg: 'bg-sky-50',
    borderColor: 'border-sky-300',
    iconBg: 'bg-sky-500',
  },
  {
    id: 'math',
    emoji: '➕',
    titleEn: 'Add & Subtract',
    titleHi: 'जोड़ और घटाव',
    descEn: 'Count apples & solve fun math',
    descHi: 'सेब गिनकर मज़ेदार गणित सीखें',
    cardBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    iconBg: 'bg-emerald-500',
  },
  {
    id: 'fruits',
    emoji: '🍎',
    titleEn: 'Fruits & Veggies',
    titleHi: 'फल और सब्ज़ियाँ',
    descEn: 'Healthy foods & fun facts',
    descHi: 'स्वादिष्ट फलों और सब्ज़ियों के नाम',
    cardBg: 'bg-lime-50',
    borderColor: 'border-lime-300',
    iconBg: 'bg-lime-600',
  },
  {
    id: 'animals',
    emoji: '🦁',
    titleEn: 'Animals & Birds',
    titleHi: 'जानवर और पक्षी',
    descEn: 'Hear cute animal & bird sounds',
    descHi: 'प्यारे जानवरों और पक्षियों की आवाज़ें',
    cardBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    iconBg: 'bg-amber-500',
  },
  {
    id: 'colors',
    emoji: '🎨',
    titleEn: 'Colors & Shapes',
    titleHi: 'रंग और आकार',
    descEn: 'Bright rainbow colors & shapes',
    descHi: 'चमकते रंग और ज्यामितीय आकार',
    cardBg: 'bg-pink-50',
    borderColor: 'border-pink-300',
    iconBg: 'bg-pink-500',
  },
];

const GAME_WORLDS: WorldTile[] = [
  {
    id: 'spelling',
    emoji: '🐝',
    titleEn: 'Spelling Bee',
    titleHi: 'स्पेलिंग खेल',
    descEn: 'Tap letters to spell cute words',
    descHi: 'अक्षरों को जोड़कर शब्द बनाएँ',
    cardBg: 'bg-indigo-50',
    borderColor: 'border-indigo-300',
    iconBg: 'bg-indigo-500',
  },
  {
    id: 'memory',
    emoji: '🃏',
    titleEn: 'Memory Match',
    titleHi: 'मेमोरी मिलान',
    descEn: 'Flip cards & find matching pairs',
    descHi: 'कार्ड पलटें और जोड़ियाँ मिलाएँ',
    cardBg: 'bg-teal-50',
    borderColor: 'border-teal-300',
    iconBg: 'bg-teal-500',
  },
  {
    id: 'puzzle',
    emoji: '🧩',
    titleEn: 'Picture Puzzles',
    titleHi: 'चित्र पहेली',
    descEn: 'Solve 3D animal & space puzzles',
    descHi: '3D जानवरों और रॉकेट की पहेली सुलझाएँ',
    cardBg: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    iconBg: 'bg-amber-500',
  },
  {
    id: 'drawing',
    emoji: '🖍️',
    titleEn: 'Draw & Color',
    titleHi: 'रंग भरें और बनाएँ',
    descEn: 'Color templates & save your art',
    descHi: 'चित्रों में रंग भरें और सेव करें',
    cardBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    iconBg: 'bg-rose-500',
  },
  {
    id: 'quiz',
    emoji: '🏆',
    titleEn: 'Quiz & Rewards',
    titleHi: 'क्विज़ और पुरस्कार',
    descEn: 'Win stars & collect animal badges',
    descHi: 'सवाल हल करें और स्टार बैज जीतें',
    cardBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    iconBg: 'bg-amber-500',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  progress,
  onSelectModule,
  onSetLanguage,
  onSetAgeGroup,
}) => {
  const lang = progress.language;

  const handleOpen = (tile: WorldTile) => {
    playPop(progress.sfxEnabled);
    speakText(
      lang === 'hi' ? tile.titleHi : tile.titleEn,
      lang,
      progress.voiceEnabled,
      progress.speechRate
    );
    onSelectModule(tile.id);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-8">
      {/* Hero Banner with 3D Cartoon Artwork & Leo Mascot */}
      <section className="overflow-hidden rounded-3xl border-2 border-sky-200 border-b-8 bg-white shadow-sm">
        <div className="grid items-stretch lg:grid-cols-12">
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6">
            <div>
              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playPop(progress.sfxEnabled);
                    speakText(
                      lang === 'hi'
                        ? 'नमस्ते दोस्त! मैं लियो हूँ। आज हम क्या सीखेंगे?'
                        : 'Hello friend! I am Leo the Lion! What shall we learn today?',
                      lang,
                      progress.voiceEnabled,
                      progress.speechRate
                    );
                  }}
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-amber-400 bg-sky-100 shadow-sm sm:h-20 sm:w-20"
                  aria-label="Hear Leo the Lion mascot"
                >
                  <img
                    src="/src/assets/images/mascot_leo_lion_1795690971655.jpg"
                    alt="Leo the Lion Mascot"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </motion.button>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-sky-600">
                    {lang === 'hi' ? 'आयु 2 से 10 वर्ष · ऑफ़लाइन तैयार' : 'Ages 2–10 · Bilingual & Offline Ready'}
                  </p>
                  <h1 className="font-display text-2xl font-extrabold text-slate-900 sm:text-4xl [text-wrap:balance]">
                    {lang === 'hi' ? 'किड्स लर्निंग वर्ल्ड में स्वागत है!' : 'Welcome to Kids Learning World!'}
                  </h1>
                </div>
              </div>

              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                {lang === 'hi'
                  ? 'अंग्रेज़ी ABCD, हिन्दी वर्णमाला, गिनती, मज़ेदार खेल, पहेलियाँ और रंग भरने की दुनिया — बिना किसी विज्ञापन के।'
                  : 'Explore ABCD, Hindi Varnamala, Numbers 1–100, Math, Animals, Puzzles, and Coloring in a safe, ad-free playground.'}
              </p>
            </div>

            {/* Interactive Language, Age, & Install Controls */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center rounded-2xl border-2 border-slate-200 bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => {
                    playPop(progress.sfxEnabled);
                    onSetLanguage('en');
                    speakText('English selected', 'en', progress.voiceEnabled, progress.speechRate);
                  }}
                  className={`min-h-[40px] rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition-colors whitespace-nowrap ${
                    lang === 'en' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playPop(progress.sfxEnabled);
                    onSetLanguage('hi');
                    speakText('हिन्दी चुनी गई', 'hi', progress.voiceEnabled, progress.speechRate);
                  }}
                  className={`min-h-[40px] rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition-colors whitespace-nowrap ${
                    lang === 'hi' ? 'bg-orange-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  हिन्दी
                </button>
              </div>

              {/* Age Selector */}
              <div className="flex items-center rounded-2xl border-2 border-slate-200 bg-slate-100 p-1">
                {(['2-4', '5-7', '8-10'] as AgeGroup[]).map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => {
                      playPop(progress.sfxEnabled);
                      onSetAgeGroup(age);
                    }}
                    className={`min-h-[40px] rounded-xl px-3 py-1.5 text-xs font-extrabold transition-colors whitespace-nowrap ${
                      progress.ageGroup === age
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lang === 'hi' ? `${age} साल` : `Age ${age}`}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  speakText(
                    lang === 'hi'
                      ? 'किड्स लर्निंग वर्ल्ड में आपका स्वागत है! शुरू करने के लिए कोई भी कार्ड दबाएँ।'
                      : 'Welcome to Kids Learning World! Tap any colorful card to start learning.',
                    lang,
                    progress.voiceEnabled,
                    progress.speechRate
                  )
                }
                className="toy-btn-3d flex min-h-[44px] items-center gap-1.5 rounded-2xl border-2 border-amber-500 border-b-4 bg-amber-400 px-4 py-2 text-xs font-extrabold text-slate-900 whitespace-nowrap"
              >
                <Volume2 className="h-4 w-4" />
                <span>{lang === 'hi' ? 'लियो से सुनें' : 'Hear Leo'}</span>
              </button>

              <PWAInstallButton language={lang} />
            </div>
          </div>

          <div className="relative min-h-[220px] bg-sky-100 lg:col-span-6">
            <img
              src="/src/assets/images/hero_playground_world_1795690972943.jpg"
              alt="Kids Learning World 3D Alphabet Island"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
            <div className="absolute right-4 bottom-4 flex items-center gap-2 rounded-2xl border-2 border-amber-300 bg-white/95 px-4 py-2 shadow-md">
              <Star className="h-5 w-5 fill-amber-400 text-amber-500" />
              <span className="font-display text-base font-extrabold tabular-nums text-slate-900">
                {progress.stars} {lang === 'hi' ? 'स्टार' : 'Stars'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Core Learning Worlds */}
      <section id="learn-section">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-extrabold text-slate-900">
            {lang === 'hi' ? 'सीखने की दुनिया' : 'Learning Worlds'}
          </h2>
          <span className="text-xs font-bold text-slate-500">
            {lang === 'hi' ? '7 मज़ेदार विषय' : '7 interactive subjects'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {LEARNING_WORLDS.map((tile) => (
            <button
              key={tile.id}
              type="button"
              onClick={() => handleOpen(tile)}
              className={`toy-card flex min-h-[132px] items-center gap-4 rounded-3xl border-2 ${tile.borderColor} border-b-8 ${tile.cardBg} p-4 text-left shadow-xs hover:brightness-98 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600`}
            >
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${tile.iconBg} text-3xl text-white shadow-inner`}
              >
                {tile.emoji}
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-extrabold text-slate-900">
                  {lang === 'hi' ? tile.titleHi : tile.titleEn}
                </h3>
                <p className="mt-0.5 text-xs font-semibold leading-snug text-slate-600">
                  {lang === 'hi' ? tile.descHi : tile.descEn}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Section 2: Games, Puzzles & Creativity */}
      <section id="games-section">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-extrabold text-slate-900">
            {lang === 'hi' ? 'खेल, पहेलियाँ और कला' : 'Games, Puzzles & Creative Studio'}
          </h2>
          <span className="text-xs font-bold text-slate-500">
            {lang === 'hi' ? 'खेलें और स्टार जीतें' : 'Play & earn reward stars'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GAME_WORLDS.map((tile) => (
            <button
              key={tile.id}
              type="button"
              onClick={() => handleOpen(tile)}
              className={`toy-card flex min-h-[132px] items-center gap-4 rounded-3xl border-2 ${tile.borderColor} border-b-8 ${tile.cardBg} p-5 text-left shadow-xs hover:brightness-98 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600`}
            >
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${tile.iconBg} text-3xl text-white shadow-inner`}
              >
                {tile.emoji}
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-extrabold text-slate-900">
                  {lang === 'hi' ? tile.titleHi : tile.titleEn}
                </h3>
                <p className="mt-0.5 text-xs font-semibold leading-snug text-slate-600">
                  {lang === 'hi' ? tile.descHi : tile.descEn}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
