import React, { useMemo, useState } from 'react';
import { Delete, Lightbulb, RotateCcw, Volume2 } from 'lucide-react';
import { SPELLING_WORDS, SpellingWord } from '../../data/curriculum';
import { AgeGroup, Language } from '../../types/learning';
import { playCelebrate, playGentleError, playPop, playSuccess, speakText } from '../../utils/audio';
import { CelebrationBanner, SectionHeader } from '../common/ToyUI';

interface SpellingGameProps {
  language: Language;
  ageGroup: AgeGroup;
  stars: number;
  voiceEnabled: boolean;
  sfxEnabled: boolean;
  speechRate: number;
  onRecordWin: (starsEarned?: number) => void;
  onBack: () => void;
}

interface Tile {
  id: number;
  char: string;
}

function scrambleWord(word: string): Tile[] {
  const letters = word.split('').map((char, idx) => ({ id: idx, char }));
  const shuffled = [...letters];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  if (shuffled.map((t) => t.char).join('') === word && word.length > 1) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
}

export const SpellingGame: React.FC<SpellingGameProps> = ({
  language,
  ageGroup,
  stars,
  voiceEnabled,
  sfxEnabled,
  speechRate,
  onRecordWin,
  onBack,
}) => {
  const wordPool = useMemo(() => {
    const filtered = SPELLING_WORDS.filter((w) => w.age === ageGroup);
    return filtered.length > 0 ? filtered : SPELLING_WORDS;
  }, [ageGroup]);

  const [wordIndex, setWordIndex] = useState(0);
  const current: SpellingWord = wordPool[wordIndex % wordPool.length];
  const [tiles, setTiles] = useState<Tile[]>(() => scrambleWord(current.word));
  const [pickedIds, setPickedIds] = useState<number[]>([]);
  const [status, setStatus] = useState<'playing' | 'won' | 'wrong'>('playing');

  const builtWord = pickedIds
    .map((id) => tiles.find((t) => t.id === id)?.char || '')
    .join('');

  const loadWord = (idx: number) => {
    const next = wordPool[idx % wordPool.length];
    setWordIndex(idx % wordPool.length);
    setTiles(scrambleWord(next.word));
    setPickedIds([]);
    setStatus('playing');
  };

  const handleTileTap = (tile: Tile) => {
    if (status === 'won' || pickedIds.includes(tile.id)) return;
    playPop(sfxEnabled);
    speakText(tile.char, 'en', voiceEnabled, speechRate);

    const nextPicked = [...pickedIds, tile.id];
    setPickedIds(nextPicked);

    if (nextPicked.length === current.word.length) {
      const attempt = nextPicked
        .map((id) => tiles.find((t) => t.id === id)?.char || '')
        .join('');
      if (attempt === current.word) {
        setStatus('won');
        playCelebrate(sfxEnabled);
        speakText(`Great spelling! ${current.word}`, 'en', voiceEnabled, speechRate);
        onRecordWin(2);
      } else {
        setStatus('wrong');
        playGentleError(sfxEnabled);
        speakText(language === 'hi' ? 'फिर से कोशिश करें' : 'Try again!', language, voiceEnabled, speechRate);
      }
    } else {
      setStatus('playing');
    }
  };

  const handleBackspace = () => {
    if (pickedIds.length === 0 || status === 'won') return;
    playPop(sfxEnabled);
    setPickedIds((prev) => prev.slice(0, -1));
    setStatus('playing');
  };

  const handleHint = () => {
    if (status === 'won') return;
    const nextIndex = pickedIds.length;
    const neededChar = current.word[nextIndex];
    const matchTile = tiles.find((t) => t.char === neededChar && !pickedIds.includes(t.id));
    if (matchTile) {
      playSuccess(sfxEnabled);
      handleTileTap(matchTile);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <SectionHeader
        titleEn="Spelling Bee Game"
        titleHi="स्पेलिंग सीखने का खेल"
        subtitleEn="Look at the picture and tap letters in order to spell the word"
        subtitleHi="चित्र देखें और सही अक्षरों को दबाकर शब्द बनाएँ"
        language={language}
        stars={stars}
        accentBg="bg-indigo-500"
        onBack={onBack}
        onSpeakPrompt={() => speakText(current.word, 'en', voiceEnabled, speechRate)}
      />

      <CelebrationBanner
        show={status === 'won'}
        titleEn={`You spelled ${current.word}!`}
        titleHi={`शाबाश! आपने ${current.word} सही लिखा!`}
        starsEarned={2}
        language={language}
        actionLabelEn="Next Word"
        actionLabelHi="अगला शब्द"
        onContinue={() => loadWord(wordIndex + 1)}
      />

      <div className="rounded-3xl border-2 border-indigo-200 border-b-8 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-indigo-100 bg-indigo-50 text-6xl shadow-inner">
            {current.emoji}
          </div>
          <p className="mt-3 text-base font-bold text-slate-600">
            {language === 'hi'
              ? `${current.hindi} — ${current.hintHi}`
              : `${current.hintEn} (${current.hindi})`}
          </p>

          <button
            type="button"
            onClick={() => speakText(current.word, 'en', voiceEnabled, speechRate)}
            className="toy-btn-3d mt-3 flex min-h-[44px] items-center gap-2 rounded-2xl border-2 border-amber-500 border-b-4 bg-amber-400 px-4 py-2 text-sm font-extrabold text-slate-900"
          >
            <Volume2 className="h-4 w-4" />
            <span>{language === 'hi' ? 'शब्द सुनें' : 'Hear Word'}</span>
          </button>

          {/* Target Letter Slots */}
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {current.word.split('').map((_, slotIdx) => {
              const char = builtWord[slotIdx] || '';
              return (
                <div
                  key={slotIdx}
                  className={`flex h-16 w-14 items-center justify-center rounded-2xl border-2 font-display text-3xl font-extrabold sm:h-20 sm:w-16 ${
                    status === 'won'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : status === 'wrong'
                        ? 'border-rose-400 bg-rose-50 text-rose-700'
                        : char
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                          : 'border-dashed border-slate-300 bg-slate-50 text-slate-300'
                  }`}
                >
                  {char}
                </div>
              );
            })}
          </div>

          {/* Scrambled Letter Tiles */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {tiles.map((tile) => {
              const used = pickedIds.includes(tile.id);
              return (
                <button
                  key={tile.id}
                  type="button"
                  disabled={used || status === 'won'}
                  onClick={() => handleTileTap(tile)}
                  className={`toy-btn-3d flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-b-4 font-display text-3xl font-extrabold ${
                    used
                      ? 'border-slate-200 bg-slate-100 text-slate-300 opacity-50'
                      : 'border-sky-600 bg-sky-500 text-white hover:bg-sky-600'
                  }`}
                >
                  {tile.char}
                </button>
              );
            })}
          </div>

          {/* Action Controls */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleBackspace}
              className="toy-btn-3d flex min-h-[44px] items-center gap-1.5 rounded-2xl border-2 border-slate-300 border-b-4 bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 whitespace-nowrap"
            >
              <Delete className="h-4 w-4" />
              <span>{language === 'hi' ? 'हटाएं' : 'Undo'}</span>
            </button>
            <button
              type="button"
              onClick={handleHint}
              className="toy-btn-3d flex min-h-[44px] items-center gap-1.5 rounded-2xl border-2 border-amber-400 border-b-4 bg-amber-100 px-4 py-2 text-sm font-bold text-amber-900 whitespace-nowrap"
            >
              <Lightbulb className="h-4 w-4" />
              <span>{language === 'hi' ? 'मदद' : 'Hint'}</span>
            </button>
            <button
              type="button"
              onClick={() => loadWord(wordIndex + 1)}
              className="toy-btn-3d flex min-h-[44px] items-center gap-1.5 rounded-2xl border-2 border-indigo-300 border-b-4 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-800 whitespace-nowrap"
            >
              <RotateCcw className="h-4 w-4" />
              <span>{language === 'hi' ? 'बदलें' : 'Skip Word'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
