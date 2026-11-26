import React, { useState } from 'react';
import { CheckCircle2, Volume2 } from 'lucide-react';
import { ANIMALS_BIRDS_DATA, AnimalItem } from '../../data/curriculum';
import { Language } from '../../types/learning';
import { playAnimalTone, speakText } from '../../utils/audio';
import { SectionHeader } from '../common/ToyUI';

interface AnimalsBirdsModuleProps {
  language: Language;
  stars: number;
  learnedIds: string[];
  voiceEnabled: boolean;
  sfxEnabled: boolean;
  speechRate: number;
  onMarkLearned: (id: string, starReward?: number) => void;
  onBack: () => void;
}

export const AnimalsBirdsModule: React.FC<AnimalsBirdsModuleProps> = ({
  language,
  stars,
  learnedIds,
  voiceEnabled,
  sfxEnabled,
  speechRate,
  onMarkLearned,
  onBack,
}) => {
  const [tab, setTab] = useState<'animal' | 'bird'>('animal');
  const filtered = ANIMALS_BIRDS_DATA.filter((a) => a.category === tab);
  const [selected, setSelected] = useState<AnimalItem>(filtered[0]);

  const handleTab = (next: 'animal' | 'bird') => {
    setTab(next);
    const list = ANIMALS_BIRDS_DATA.filter((a) => a.category === next);
    setSelected(list[0]);
  };

  const handleSelect = (item: AnimalItem) => {
    setSelected(item);
    playAnimalTone(item.pitch, sfxEnabled);
    const speech =
      language === 'hi'
        ? `${item.hi}. ${item.soundHi}`
        : `${item.en} says ${item.soundEn}`;
    setTimeout(() => {
      speakText(speech, language, voiceEnabled, speechRate);
    }, 180);
    onMarkLearned(`animal_${item.id}`, 1);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeader
        titleEn="Animals & Birds"
        titleHi="जानवर और पक्षी"
        subtitleEn="Tap any cute animal or bird to hear its name and sound"
        subtitleHi="नाम और आवाज़ सुनने के लिए किसी भी जानवर या पक्षी को दबाएँ"
        language={language}
        stars={stars}
        accentBg="bg-amber-500"
        onBack={onBack}
        onSpeakPrompt={() => handleSelect(selected)}
      />

      <div className="mb-6 flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white p-1.5 shadow-xs sm:inline-flex">
        <button
          type="button"
          onClick={() => handleTab('animal')}
          className={`min-h-[44px] flex-1 rounded-xl px-5 py-2 text-sm font-extrabold transition-colors whitespace-nowrap sm:flex-initial ${
            tab === 'animal' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🦁 {language === 'hi' ? 'जानवर (Animals)' : 'Animals'}
        </button>
        <button
          type="button"
          onClick={() => handleTab('bird')}
          className={`min-h-[44px] flex-1 rounded-xl px-5 py-2 text-sm font-extrabold transition-colors whitespace-nowrap sm:flex-initial ${
            tab === 'bird' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🦜 {language === 'hi' ? 'पक्षी (Birds)' : 'Birds'}
        </button>
      </div>

      {/* Spotlight Card */}
      <div className="mb-6 rounded-3xl border-2 border-amber-300 border-b-8 bg-amber-50 p-5 shadow-sm sm:p-7">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => handleSelect(selected)}
              className="toy-card flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border-2 border-white bg-white text-6xl shadow-md sm:h-28 sm:w-28 sm:text-7xl"
            >
              {selected.emoji}
            </button>
            <div>
              <h2 className="font-display text-3xl font-extrabold text-slate-900">
                {language === 'hi' ? selected.hi : selected.en}
              </h2>
              <p className="text-sm font-bold text-slate-500">
                {language === 'hi' ? selected.en : selected.hi}
              </p>
              <p className="mt-2 font-display text-lg font-extrabold text-amber-800">
                “{language === 'hi' ? selected.soundHi : selected.soundEn}”
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSelect(selected)}
            className="toy-btn-3d flex min-h-[48px] items-center gap-2 rounded-2xl border-2 border-amber-600 border-b-4 bg-amber-400 px-5 py-2.5 text-sm font-extrabold text-slate-900 whitespace-nowrap shrink-0"
          >
            <Volume2 className="h-5 w-5" />
            <span>{language === 'hi' ? 'आवाज़ सुनें' : 'Play Animal Sound'}</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4">
        {filtered.map((item) => {
          const active = selected.id === item.id;
          const done = learnedIds.includes(`animal_${item.id}`);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item)}
              className={`toy-card relative flex min-h-[132px] flex-col items-center justify-center rounded-3xl border-2 border-b-4 p-4 text-center ${
                active
                  ? 'border-amber-600 bg-amber-500 text-white shadow-md'
                  : 'border-amber-200 bg-white text-slate-900 hover:bg-amber-50'
              }`}
            >
              {done && (
                <CheckCircle2
                  className={`absolute top-2.5 right-2.5 h-5 w-5 ${
                    active ? 'text-white' : 'text-emerald-600'
                  }`}
                />
              )}
              <span className="text-5xl leading-none">{item.emoji}</span>
              <span className="font-display mt-2.5 text-lg font-extrabold">
                {language === 'hi' ? item.hi : item.en}
              </span>
              <span className={`text-xs font-bold ${active ? 'text-amber-100' : 'text-slate-500'}`}>
                {language === 'hi' ? item.soundHi : item.soundEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
