import React, { useState } from 'react';
import { CheckCircle2, Volume2 } from 'lucide-react';
import { FRUITS_VEG_DATA, FoodItem } from '../../data/curriculum';
import { Language } from '../../types/learning';
import { playPop, speakText } from '../../utils/audio';
import { SectionHeader } from '../common/ToyUI';

interface FruitsVegModuleProps {
  language: Language;
  stars: number;
  learnedIds: string[];
  voiceEnabled: boolean;
  sfxEnabled: boolean;
  speechRate: number;
  onMarkLearned: (id: string, starReward?: number) => void;
  onBack: () => void;
}

export const FruitsVegModule: React.FC<FruitsVegModuleProps> = ({
  language,
  stars,
  learnedIds,
  voiceEnabled,
  sfxEnabled,
  speechRate,
  onMarkLearned,
  onBack,
}) => {
  const [tab, setTab] = useState<'fruit' | 'vegetable'>('fruit');
  const filtered = FRUITS_VEG_DATA.filter((item) => item.category === tab);
  const [selected, setSelected] = useState<FoodItem>(filtered[0]);

  const handleTab = (next: 'fruit' | 'vegetable') => {
    playPop(sfxEnabled);
    setTab(next);
    const list = FRUITS_VEG_DATA.filter((item) => item.category === next);
    setSelected(list[0]);
  };

  const handleSelect = (item: FoodItem) => {
    setSelected(item);
    playPop(sfxEnabled);
    const text = language === 'hi' ? `${item.hi}. ${item.factHi}` : `${item.en}. ${item.factEn}`;
    speakText(text, language, voiceEnabled, speechRate);
    onMarkLearned(`food_${item.id}`, 1);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeader
        titleEn="Fruits & Vegetables"
        titleHi="फल और सब्ज़ियाँ"
        subtitleEn="Tap any fruit or vegetable to hear its name and fun fact"
        subtitleHi="नाम और मज़ेदार बात सुनने के लिए किसी भी चित्र को दबाएँ"
        language={language}
        stars={stars}
        accentBg="bg-lime-500"
        onBack={onBack}
        onSpeakPrompt={() =>
          speakText(language === 'hi' ? selected.hi : selected.en, language, voiceEnabled, speechRate)
        }
      />

      {/* Category Toggle */}
      <div className="mb-6 flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white p-1.5 shadow-xs sm:inline-flex">
        <button
          type="button"
          onClick={() => handleTab('fruit')}
          className={`min-h-[44px] flex-1 rounded-xl px-5 py-2 text-sm font-extrabold transition-colors whitespace-nowrap sm:flex-initial ${
            tab === 'fruit' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🍎 {language === 'hi' ? 'फल (Fruits)' : 'Fruits'}
        </button>
        <button
          type="button"
          onClick={() => handleTab('vegetable')}
          className={`min-h-[44px] flex-1 rounded-xl px-5 py-2 text-sm font-extrabold transition-colors whitespace-nowrap sm:flex-initial ${
            tab === 'vegetable'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🥕 {language === 'hi' ? 'सब्ज़ियाँ (Vegetables)' : 'Vegetables'}
        </button>
      </div>

      {/* Spotlight Card */}
      <div className={`mb-6 rounded-3xl border-2 border-lime-300 border-b-8 ${selected.cardBg} p-5 shadow-sm sm:p-7`}>
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
              <p className="mt-2 max-w-md text-sm font-semibold text-slate-700 sm:text-base">
                {language === 'hi' ? selected.factHi : selected.factEn}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSelect(selected)}
            className="toy-btn-3d flex min-h-[48px] items-center gap-2 rounded-2xl border-2 border-amber-500 border-b-4 bg-amber-400 px-5 py-2.5 text-sm font-extrabold text-slate-900 whitespace-nowrap shrink-0"
          >
            <Volume2 className="h-5 w-5" />
            <span>{language === 'hi' ? 'सुनें' : 'Say Name'}</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4">
        {filtered.map((item) => {
          const active = selected.id === item.id;
          const done = learnedIds.includes(`food_${item.id}`);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item)}
              className={`toy-card relative flex min-h-[126px] flex-col items-center justify-center rounded-3xl border-2 border-b-4 p-4 text-center ${
                active
                  ? 'border-emerald-600 bg-emerald-500 text-white shadow-md'
                  : `border-slate-200 ${item.cardBg} text-slate-900 hover:brightness-95`
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
              <span className={`text-xs font-bold ${active ? 'text-emerald-100' : 'text-slate-500'}`}>
                {language === 'hi' ? item.en : item.hi}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
