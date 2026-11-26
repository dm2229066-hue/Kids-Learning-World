import React, { useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { HINDI_SWAR, HINDI_VYANJAN, HindiLetterItem } from '../../data/curriculum';
import { Language } from '../../types/learning';
import { playPop, speakText } from '../../utils/audio';
import { SectionHeader } from '../common/ToyUI';

interface HindiVarnamalaModuleProps {
  language: Language;
  stars: number;
  learnedIds: string[];
  voiceEnabled: boolean;
  sfxEnabled: boolean;
  speechRate: number;
  onMarkLearned: (id: string, starReward?: number) => void;
  onBack: () => void;
}

export const HindiVarnamalaModule: React.FC<HindiVarnamalaModuleProps> = ({
  language,
  stars,
  learnedIds,
  voiceEnabled,
  sfxEnabled,
  speechRate,
  onMarkLearned,
  onBack,
}) => {
  const [tab, setTab] = useState<'swar' | 'vyanjan'>('swar');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const list: HindiLetterItem[] = tab === 'swar' ? HINDI_SWAR : HINDI_VYANJAN;
  const current = list[selectedIndex] || list[0];

  const handleTabChange = (nextTab: 'swar' | 'vyanjan') => {
    playPop(sfxEnabled);
    setTab(nextTab);
    setSelectedIndex(0);
  };

  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
    const item = list[idx];
    playPop(sfxEnabled);
    speakText(`${item.char} से ${item.word}`, 'hi', voiceEnabled, speechRate);
    onMarkLearned(`hi_${item.char}`, 1);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeader
        titleEn="Hindi Varnamala"
        titleHi="हिन्दी वर्णमाला"
        subtitleEn="Learn Swar (vowels) and Vyanjan (consonants) with Hindi voice"
        subtitleHi="स्वर और व्यंजन को आवाज़ और चित्रों के साथ सीखें"
        language={language}
        stars={stars}
        accentBg="bg-orange-500"
        onBack={onBack}
        onSpeakPrompt={() =>
          speakText(`${current.char} से ${current.word}`, 'hi', voiceEnabled, speechRate)
        }
      />

      {/* Segmented Swar / Vyanjan Tabs */}
      <div className="mb-6 flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white p-1.5 shadow-xs sm:inline-flex">
        <button
          type="button"
          onClick={() => handleTabChange('swar')}
          className={`min-h-[44px] flex-1 rounded-xl px-5 py-2 text-sm font-extrabold transition-colors whitespace-nowrap sm:flex-initial ${
            tab === 'swar'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {language === 'hi' ? 'स्वर (अ - अः)' : 'Swar Vowels (अ - अः)'}
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('vyanjan')}
          className={`min-h-[44px] flex-1 rounded-xl px-5 py-2 text-sm font-extrabold transition-colors whitespace-nowrap sm:flex-initial ${
            tab === 'vyanjan'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {language === 'hi' ? 'व्यंजन (क - ज्ञ)' : 'Vyanjan Consonants (क - ज्ञ)'}
        </button>
      </div>

      {/* Spotlight Flashcard */}
      <div className="mb-6 rounded-3xl border-2 border-orange-300 border-b-8 bg-orange-50 p-5 shadow-sm sm:p-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-5 sm:gap-8">
            <button
              type="button"
              onClick={() => {
                playPop(sfxEnabled);
                speakText(`${current.char} से ${current.word}`, 'hi', voiceEnabled, speechRate);
              }}
              className="toy-card flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border-2 border-orange-200 border-b-4 bg-white shadow-md sm:h-36 sm:w-36"
            >
              <span className="font-display text-6xl font-extrabold text-orange-600 sm:text-7xl">
                {current.char}
              </span>
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-700">
                {tab === 'swar' ? 'स्वर · Vowel' : 'व्यंजन · Consonant'} · "{current.translit}"
              </span>
              <h2 className="font-display mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                {current.char} से {current.word}
              </h2>
              <p className="mt-1 text-base font-bold text-slate-600">
                {current.wordMeaning}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              speakText(`${current.char} से ${current.word}`, 'hi', voiceEnabled, speechRate)
            }
            className="toy-card flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-white bg-white text-6xl shadow-sm sm:h-28 sm:w-28 sm:text-7xl"
            aria-label={current.word}
          >
            {current.emoji}
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-orange-200/80 pt-4">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleSelect((selectedIndex - 1 + list.length) % list.length)}
              className="toy-btn-3d flex min-h-[48px] items-center gap-1.5 rounded-2xl border-2 border-slate-300 border-b-4 bg-white px-4 py-2 text-sm font-bold text-slate-800 whitespace-nowrap"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>{language === 'hi' ? 'पिछला' : 'Previous'}</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelect((selectedIndex + 1) % list.length)}
              className="toy-btn-3d flex min-h-[48px] items-center gap-1.5 rounded-2xl border-2 border-orange-600 border-b-4 bg-orange-500 px-4 py-2 text-sm font-bold text-white whitespace-nowrap"
            >
              <span>{language === 'hi' ? 'अगला' : 'Next'}</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              speakText(`${current.char} से ${current.word}`, 'hi', voiceEnabled, speechRate)
            }
            className="toy-btn-3d flex min-h-[48px] items-center gap-2 rounded-2xl border-2 border-amber-500 border-b-4 bg-amber-400 px-5 py-2 text-sm font-extrabold text-slate-900 whitespace-nowrap"
          >
            <Volume2 className="h-5 w-5" />
            <span>{language === 'hi' ? 'आवाज़ सुनें' : 'Hear in Hindi'}</span>
          </button>
        </div>
      </div>

      {/* Letter Tiles */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
        {list.map((item, idx) => {
          const active = idx === selectedIndex;
          const done = learnedIds.includes(`hi_${item.char}`);
          return (
            <button
              key={item.char}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`toy-card relative flex min-h-[90px] flex-col items-center justify-center rounded-2xl border-2 border-b-4 p-2 text-center ${
                active
                  ? 'border-orange-700 bg-orange-500 text-white shadow-md'
                  : 'border-orange-200 bg-white text-slate-900 hover:bg-orange-50'
              }`}
            >
              {done && (
                <CheckCircle2
                  className={`absolute top-1.5 right-1.5 h-4 w-4 ${
                    active ? 'text-white' : 'text-emerald-600'
                  }`}
                />
              )}
              <span className="font-display text-3xl font-extrabold leading-none">
                {item.char}
              </span>
              <span className="mt-1 text-xl leading-none">{item.emoji}</span>
              <span
                className={`mt-1 text-[11px] font-bold truncate max-w-full ${
                  active ? 'text-orange-50' : 'text-slate-500'
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
