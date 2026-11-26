import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { getEnglishNumberWord, HINDI_NUMBERS_1_TO_100 } from '../../data/curriculum';
import { Language } from '../../types/learning';
import { playPop, speakText } from '../../utils/audio';
import { SectionHeader } from '../common/ToyUI';

interface NumbersModuleProps {
  language: Language;
  stars: number;
  learnedIds: string[];
  voiceEnabled: boolean;
  sfxEnabled: boolean;
  speechRate: number;
  onMarkLearned: (id: string, starReward?: number) => void;
  onBack: () => void;
}

const RANGES = [
  { id: '1-20', start: 1, end: 20, labelEn: '1 to 20', labelHi: '1 से 20' },
  { id: '21-50', start: 21, end: 50, labelEn: '21 to 50', labelHi: '21 से 50' },
  { id: '51-100', start: 51, end: 100, labelEn: '51 to 100', labelHi: '51 से 100' },
];

export const NumbersModule: React.FC<NumbersModuleProps> = ({
  language,
  stars,
  learnedIds,
  voiceEnabled,
  sfxEnabled,
  speechRate,
  onMarkLearned,
  onBack,
}) => {
  const [rangeId, setRangeId] = useState('1-20');
  const [selectedNumber, setSelectedNumber] = useState(1);

  const activeRange = RANGES.find((r) => r.id === rangeId) || RANGES[0];
  const numbersList = Array.from(
    { length: activeRange.end - activeRange.start + 1 },
    (_, i) => activeRange.start + i
  );

  const enWord = getEnglishNumberWord(selectedNumber);
  const hiWord = HINDI_NUMBERS_1_TO_100[selectedNumber - 1] || String(selectedNumber);

  const handleNumberTap = (n: number) => {
    setSelectedNumber(n);
    playPop(sfxEnabled);
    const spoken = language === 'hi' ? HINDI_NUMBERS_1_TO_100[n - 1] : `${n}. ${getEnglishNumberWord(n)}`;
    speakText(spoken, language, voiceEnabled, speechRate);
    if (!learnedIds.includes(`num_${n}`)) {
      onMarkLearned(`num_${n}`, 1);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeader
        titleEn="Numbers 1 to 100"
        titleHi="गिनती 1 से 100"
        subtitleEn="Tap any number to hear it and count the blocks"
        subtitleHi="सुनने और गिनने के लिए किसी भी संख्या पर टैप करें"
        language={language}
        stars={stars}
        accentBg="bg-sky-500"
        onBack={onBack}
        onSpeakPrompt={() =>
          speakText(
            language === 'hi' ? hiWord : `${selectedNumber}. ${enWord}`,
            language,
            voiceEnabled,
            speechRate
          )
        }
      />

      {/* Range Filter Tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {RANGES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => {
              playPop(sfxEnabled);
              setRangeId(r.id);
              setSelectedNumber(r.start);
            }}
            className={`toy-btn-3d min-h-[44px] rounded-2xl border-2 border-b-4 px-5 py-2 text-sm font-extrabold whitespace-nowrap ${
              rangeId === r.id
                ? 'border-sky-700 bg-sky-500 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {language === 'hi' ? r.labelHi : r.labelEn}
          </button>
        ))}
      </div>

      {/* Number Spotlight + Visual Counting Blocks */}
      <div className="mb-6 rounded-3xl border-2 border-sky-300 border-b-8 bg-sky-50 p-5 shadow-sm sm:p-7">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => handleNumberTap(selectedNumber)}
              className="toy-card flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border-2 border-sky-200 border-b-4 bg-white shadow-md sm:h-32 sm:w-32"
            >
              <span className="font-display text-5xl font-extrabold tabular-nums text-sky-600 sm:text-6xl">
                {selectedNumber}
              </span>
            </button>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-sky-700">
                {language === 'hi' ? 'संख्या और शब्द' : 'Number & Word'}
              </p>
              <h2 className="font-display mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                {language === 'hi' ? hiWord : enWord}
              </h2>
              <p className="mt-1 text-base font-bold text-slate-600">
                {language === 'hi' ? `${enWord} (English)` : `${hiWord} (हिन्दी)`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleNumberTap(selectedNumber)}
            className="toy-btn-3d flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-amber-500 border-b-4 bg-amber-400 px-5 py-2.5 text-sm font-extrabold text-slate-900 whitespace-nowrap"
          >
            <Volume2 className="h-5 w-5" />
            <span>{language === 'hi' ? 'संख्या सुनें' : 'Hear Number'}</span>
          </button>
        </div>

        {/* Visual Star Blocks for 1-20 or Tens Grouping for > 20 */}
        <div className="mt-5 rounded-2xl border border-sky-200 bg-white/90 p-4">
          {selectedNumber <= 20 ? (
            <div>
              <p className="mb-2 text-xs font-bold text-slate-500">
                {language === 'hi'
                  ? `आइए ${selectedNumber} तारे गिनें:`
                  : `Count ${selectedNumber} bright stars:`}
              </p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: selectedNumber }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      playPop(sfxEnabled);
                      speakText(
                        language === 'hi' ? HINDI_NUMBERS_1_TO_100[i] : String(i + 1),
                        language,
                        voiceEnabled,
                        speechRate
                      );
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300 bg-amber-100 text-lg font-bold text-amber-800 transition-transform active:scale-90"
                    aria-label={String(i + 1)}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-700">
              <span>
                {language === 'hi'
                  ? `${Math.floor(selectedNumber / 10)} दहाई (${Math.floor(selectedNumber / 10) * 10}) + ${selectedNumber % 10} इकाई`
                  : `${Math.floor(selectedNumber / 10)} tens (${Math.floor(selectedNumber / 10) * 10}) + ${selectedNumber % 10} ones`}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: Math.floor(selectedNumber / 10) }, (_, t) => (
                  <span
                    key={t}
                    className="rounded-lg bg-sky-100 px-2.5 py-1 text-xs font-extrabold text-sky-800"
                  >
                    10
                  </span>
                ))}
                {selectedNumber % 10 > 0 && (
                  <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-extrabold text-amber-800">
                    +{selectedNumber % 10}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Number Grid */}
      <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        {numbersList.map((n) => {
          const active = n === selectedNumber;
          const colors = [
            'bg-rose-50 border-rose-200',
            'bg-amber-50 border-amber-200',
            'bg-emerald-50 border-emerald-200',
            'bg-sky-50 border-sky-200',
            'bg-orange-50 border-orange-200',
          ];
          const colorCls = colors[n % colors.length];
          return (
            <button
              key={n}
              type="button"
              onClick={() => handleNumberTap(n)}
              className={`toy-card flex min-h-[64px] flex-col items-center justify-center rounded-2xl border-2 border-b-4 p-2 font-display text-xl font-extrabold tabular-nums ${
                active
                  ? 'border-sky-700 bg-sky-500 text-white shadow-md'
                  : `${colorCls} text-slate-900 hover:brightness-95`
              }`}
            >
              <span>{n}</span>
              <span
                className={`text-[10px] font-semibold truncate max-w-full ${
                  active ? 'text-sky-100' : 'text-slate-500'
                }`}
              >
                {language === 'hi' ? HINDI_NUMBERS_1_TO_100[n - 1] : getEnglishNumberWord(n)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
