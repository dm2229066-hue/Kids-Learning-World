import React, { useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { ALPHABET_DATA, AlphabetItem } from '../../data/curriculum';
import { Language } from '../../types/learning';
import { playPop, playSuccess, speakText } from '../../utils/audio';
import { SectionHeader } from '../common/ToyUI';

interface AlphabetModuleProps {
  language: Language;
  stars: number;
  learnedIds: string[];
  voiceEnabled: boolean;
  sfxEnabled: boolean;
  speechRate: number;
  onMarkLearned: (id: string, starReward?: number) => void;
  onBack: () => void;
}

export const AlphabetModule: React.FC<AlphabetModuleProps> = ({
  language,
  stars,
  learnedIds,
  voiceEnabled,
  sfxEnabled,
  speechRate,
  onMarkLearned,
  onBack,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current: AlphabetItem = ALPHABET_DATA[selectedIndex];
  const learnedId = `abc_${current.letter}`;
  const isLearned = learnedIds.includes(learnedId);

  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
    const item = ALPHABET_DATA[idx];
    playPop(sfxEnabled);
    speakText(
      language === 'hi'
        ? `${item.letter} for ${item.word}. ${item.hindiWord}`
        : `${item.letter}. ${item.phonics}`,
      language,
      voiceEnabled,
      speechRate
    );
    if (!learnedIds.includes(`abc_${item.letter}`)) {
      onMarkLearned(`abc_${item.letter}`, 1);
    }
  };

  const handlePrev = () => {
    const nextIdx = (selectedIndex - 1 + ALPHABET_DATA.length) % ALPHABET_DATA.length;
    handleSelect(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (selectedIndex + 1) % ALPHABET_DATA.length;
    handleSelect(nextIdx);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeader
        titleEn="English ABCD World"
        titleHi="अंग्रेज़ी ABCD सीखें"
        subtitleEn="Tap any letter block to hear phonics and see its picture"
        subtitleHi="आवाज़ सुनने और चित्र देखने के लिए किसी भी अक्षर को दबाएँ"
        language={language}
        stars={stars}
        accentBg="bg-rose-500"
        onBack={onBack}
        onSpeakPrompt={() =>
          speakText(
            `${current.letter} for ${current.word}`,
            'en',
            voiceEnabled,
            speechRate
          )
        }
      />

      {/* Spotlight Flashcard */}
      <div
        className={`mb-6 rounded-3xl border-2 ${current.borderClass} border-b-8 ${current.bgClass} p-5 shadow-sm sm:p-8`}
      >
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-5 sm:gap-8">
            <button
              type="button"
              onClick={() => {
                playSuccess(sfxEnabled);
                speakText(`${current.letter} for ${current.word}`, 'en', voiceEnabled, speechRate);
              }}
              className="toy-card flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border-2 border-white border-b-4 bg-white shadow-md sm:h-36 sm:w-36"
              aria-label={`Hear letter ${current.letter}`}
            >
              <span className="font-display text-6xl font-extrabold text-slate-900 sm:text-7xl">
                {current.letter}
                <span className="text-4xl font-bold text-slate-400 sm:text-5xl">
                  {current.letter.toLowerCase()}
                </span>
              </span>
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>{language === 'hi' ? 'अक्षर कार्ड' : 'Letter Spotlight'}</span>
                {isLearned && (
                  <span className="inline-flex items-center gap-1 text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    {language === 'hi' ? 'सीखा गया' : 'Learned'}
                  </span>
                )}
              </div>
              <h2 className="font-display mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                {current.word}
              </h2>
              <p className="mt-1 text-lg font-bold text-slate-600">
                {current.hindiWord} · {current.phonics}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                playPop(sfxEnabled);
                speakText(current.word, 'en', voiceEnabled, speechRate);
              }}
              className="toy-card flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-white bg-white text-6xl shadow-sm sm:h-28 sm:w-28 sm:text-7xl"
              aria-label={current.word}
            >
              {current.emoji}
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 pt-4">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrev}
              className="toy-btn-3d flex min-h-[48px] items-center gap-1.5 rounded-2xl border-2 border-slate-300 border-b-4 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 whitespace-nowrap"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>{language === 'hi' ? 'पिछला' : 'Previous'}</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="toy-btn-3d flex min-h-[48px] items-center gap-1.5 rounded-2xl border-2 border-sky-600 border-b-4 bg-sky-500 px-4 py-2 text-sm font-bold text-white hover:bg-sky-600 whitespace-nowrap"
            >
              <span>{language === 'hi' ? 'अगला' : 'Next'}</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              speakText(
                `${current.letter}. ${current.phonics}`,
                'en',
                voiceEnabled,
                speechRate
              )
            }
            className="toy-btn-3d flex min-h-[48px] items-center gap-2 rounded-2xl border-2 border-amber-500 border-b-4 bg-amber-400 px-5 py-2 text-sm font-extrabold text-slate-900 hover:bg-amber-300 whitespace-nowrap"
          >
            <Volume2 className="h-5 w-5" />
            <span>{language === 'hi' ? 'बोलकर सुनाएं' : 'Say Letter & Word'}</span>
          </button>
        </div>
      </div>

      {/* Full A-Z Grid */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7">
        {ALPHABET_DATA.map((item, idx) => {
          const active = idx === selectedIndex;
          const done = learnedIds.includes(`abc_${item.letter}`);
          return (
            <button
              key={item.letter}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`toy-card relative flex min-h-[92px] flex-col items-center justify-center rounded-2xl border-2 border-b-4 p-2.5 text-center ${
                active
                  ? 'border-sky-600 bg-sky-500 text-white shadow-md'
                  : `${item.borderClass} ${item.bgClass} text-slate-900 hover:brightness-95`
              }`}
            >
              {done && (
                <CheckCircle2
                  className={`absolute top-1.5 right-1.5 h-4 w-4 ${
                    active ? 'text-white' : 'text-emerald-600'
                  }`}
                />
              )}
              <span className="font-display text-2xl font-extrabold leading-none">
                {item.letter}
              </span>
              <span className="mt-1 text-2xl leading-none">{item.emoji}</span>
              <span
                className={`mt-1 truncate max-w-full text-[11px] font-bold ${
                  active ? 'text-sky-50' : 'text-slate-600'
                }`}
              >
                {item.word}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
