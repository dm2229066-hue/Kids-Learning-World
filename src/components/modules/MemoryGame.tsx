import React, { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Language } from '../../types/learning';
import { playCelebrate, playPop, playSuccess, speakText } from '../../utils/audio';
import { CelebrationBanner, SectionHeader } from '../common/ToyUI';

interface MemoryGameProps {
  language: Language;
  stars: number;
  voiceEnabled: boolean;
  sfxEnabled: boolean;
  speechRate: number;
  onRecordWin: (starsEarned?: number) => void;
  onBack: () => void;
}

interface CardItem {
  uid: number;
  pairId: string;
  emoji: string;
  labelEn: string;
  labelHi: string;
  flipped: boolean;
  matched: boolean;
}

const SYMBOLS = [
  { id: 'lion', emoji: '🦁', en: 'Lion', hi: 'शेर' },
  { id: 'elephant', emoji: '🐘', en: 'Elephant', hi: 'हाथी' },
  { id: 'apple', emoji: '🍎', en: 'Apple', hi: 'सेब' },
  { id: 'mango', emoji: '🥭', en: 'Mango', hi: 'आम' },
  { id: 'rocket', emoji: '🚀', en: 'Rocket', hi: 'रॉकेट' },
  { id: 'star', emoji: '⭐', en: 'Star', hi: 'तारा' },
  { id: 'parrot', emoji: '🦜', en: 'Parrot', hi: 'तोता' },
  { id: 'butterfly', emoji: '🦋', en: 'Butterfly', hi: 'तितली' },
];

function createDeck(pairsCount: number): CardItem[] {
  const chosen = SYMBOLS.slice(0, pairsCount);
  const doubled = [...chosen, ...chosen].map((s, idx) => ({
    uid: idx,
    pairId: s.id,
    emoji: s.emoji,
    labelEn: s.en,
    labelHi: s.hi,
    flipped: false,
    matched: false,
  }));
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }
  return doubled;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({
  language,
  stars,
  voiceEnabled,
  sfxEnabled,
  speechRate,
  onRecordWin,
  onBack,
}) => {
  const [pairsCount, setPairsCount] = useState<3 | 6 | 8>(6);
  const [cards, setCards] = useState<CardItem[]>(() => createDeck(6));
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const resetGame = (count: 3 | 6 | 8 = pairsCount) => {
    playPop(sfxEnabled);
    setPairsCount(count);
    setCards(createDeck(count));
    setFlippedIndices([]);
    setMoves(0);
    setWon(false);
  };

  useEffect(() => {
    if (flippedIndices.length !== 2) return;
    const [firstIdx, secondIdx] = flippedIndices;
    const first = cards[firstIdx];
    const second = cards[secondIdx];

    if (first.pairId === second.pairId) {
      playSuccess(sfxEnabled);
      const updated = cards.map((c, idx) =>
        idx === firstIdx || idx === secondIdx ? { ...c, matched: true } : c
      );
      setCards(updated);
      setFlippedIndices([]);

      if (updated.every((c) => c.matched)) {
        setWon(true);
        playCelebrate(sfxEnabled);
        speakText(
          language === 'hi' ? 'शाबाश! आपने सभी जोड़ियाँ ढूँढ लीं!' : 'Amazing! You matched them all!',
          language,
          voiceEnabled,
          speechRate
        );
        onRecordWin(pairsCount === 8 ? 4 : pairsCount === 6 ? 3 : 2);
      }
    } else {
      const timer = setTimeout(() => {
        setCards((prev) =>
          prev.map((c, idx) =>
            idx === firstIdx || idx === secondIdx ? { ...c, flipped: false } : c
          )
        );
        setFlippedIndices([]);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [flippedIndices, cards, language, pairsCount, sfxEnabled, voiceEnabled, speechRate, onRecordWin]);

  const handleCardTap = (idx: number) => {
    if (won || flippedIndices.length >= 2) return;
    const target = cards[idx];
    if (target.flipped || target.matched) return;

    playPop(sfxEnabled);
    speakText(language === 'hi' ? target.labelHi : target.labelEn, language, voiceEnabled, speechRate);

    setCards((prev) => prev.map((c, i) => (i === idx ? { ...c, flipped: true } : c)));
    const nextFlipped = [...flippedIndices, idx];
    setFlippedIndices(nextFlipped);
    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
    }
  };

  const gridCols =
    pairsCount === 3 ? 'grid-cols-3 max-w-md' : pairsCount === 6 ? 'grid-cols-3 sm:grid-cols-4 max-w-2xl' : 'grid-cols-4 max-w-2xl';

  return (
    <div className="mx-auto max-w-4xl">
      <SectionHeader
        titleEn="Memory Match Game"
        titleHi="मेमोरी मिलान खेल"
        subtitleEn="Flip cards and find matching animal and fruit pairs"
        subtitleHi="कार्ड पलटें और एक जैसे चित्रों की जोड़ी बनाएँ"
        language={language}
        stars={stars}
        accentBg="bg-teal-500"
        onBack={onBack}
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(
            [
              { count: 3 as const, en: 'Easy (6)', hi: 'आसान (6)' },
              { count: 6 as const, en: 'Medium (12)', hi: 'मध्यम (12)' },
              { count: 8 as const, en: 'Challenge (16)', hi: 'चुनौती (16)' },
            ]
          ).map((lvl) => (
            <button
              key={lvl.count}
              type="button"
              onClick={() => resetGame(lvl.count)}
              className={`toy-btn-3d min-h-[44px] rounded-2xl border-2 border-b-4 px-4 py-2 text-sm font-extrabold whitespace-nowrap ${
                pairsCount === lvl.count
                  ? 'border-teal-700 bg-teal-500 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {language === 'hi' ? lvl.hi : lvl.en}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-extrabold text-slate-600 tabular-nums">
            {language === 'hi' ? `चालें: ${moves}` : `Moves: ${moves}`}
          </span>
          <button
            type="button"
            onClick={() => resetGame(pairsCount)}
            className="toy-btn-3d flex min-h-[44px] items-center gap-1.5 rounded-2xl border-2 border-slate-300 border-b-4 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-700 whitespace-nowrap"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{language === 'hi' ? 'फिर शुरू' : 'Restart'}</span>
          </button>
        </div>
      </div>

      <CelebrationBanner
        show={won}
        titleEn={`Memory Champion in ${moves} moves!`}
        titleHi={`शाबाश! ${moves} चालों में पूरा किया!`}
        starsEarned={pairsCount === 8 ? 4 : pairsCount === 6 ? 3 : 2}
        language={language}
        onContinue={() => resetGame(pairsCount)}
      />

      <div className={`mx-auto grid gap-3 ${gridCols}`}>
        {cards.map((card, idx) => {
          const isOpen = card.flipped || card.matched;
          return (
            <button
              key={card.uid}
              type="button"
              onClick={() => handleCardTap(idx)}
              className={`toy-card flex aspect-square min-h-[84px] flex-col items-center justify-center rounded-3xl border-2 border-b-6 p-2 transition-colors ${
                card.matched
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                  : isOpen
                    ? 'border-sky-400 bg-white text-slate-900'
                    : 'border-sky-700 bg-sky-500 text-white hover:bg-sky-400'
              }`}
              aria-label={isOpen ? card.labelEn : 'Hidden card'}
            >
              {isOpen ? (
                <>
                  <span className="text-4xl leading-none sm:text-5xl">{card.emoji}</span>
                  <span className="mt-1.5 text-xs font-extrabold">
                    {language === 'hi' ? card.labelHi : card.labelEn}
                  </span>
                </>
              ) : (
                <span className="font-display text-3xl font-extrabold text-white/90">?</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
