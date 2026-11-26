import React, { useState } from 'react';
import { Eye, RotateCcw } from 'lucide-react';
import { Language } from '../../types/learning';
import { playCelebrate, playPop, speakText } from '../../utils/audio';
import { CelebrationBanner, SectionHeader } from '../common/ToyUI';

interface PicturePuzzleGameProps {
  language: Language;
  stars: number;
  voiceEnabled: boolean;
  sfxEnabled: boolean;
  speechRate: number;
  onRecordSolve: (starsEarned?: number) => void;
  onBack: () => void;
}

const PUZZLES = [
  {
    id: 'jungle',
    titleEn: 'Jungle Friends',
    titleHi: 'जंगल के दोस्त',
    image: '/src/assets/images/puzzle_jungle_friends_1795690972915.jpg',
    fallbackEmoji: '🐘🐒🦜',
  },
  {
    id: 'space',
    titleEn: 'Space Rocket',
    titleHi: 'अंतरिक्ष रॉकेट',
    image: '/src/assets/images/puzzle_space_rocket_1795690973440.jpg',
    fallbackEmoji: '🚀🌙🪐',
  },
  {
    id: 'farm',
    titleEn: 'Sunnyside Farm',
    titleHi: 'प्यारा खेत',
    image: '/src/assets/images/puzzle_farm_barn_1795690974747.jpg',
    fallbackEmoji: '🐮🐑🦆',
  },
];

function createShuffledBoard(gridSize: number): number[] {
  const total = gridSize * gridSize;
  const arr = Array.from({ length: total }, (_, i) => i);
  do {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } while (arr.every((v, idx) => v === idx));
  return arr;
}

export const PicturePuzzleGame: React.FC<PicturePuzzleGameProps> = ({
  language,
  stars,
  voiceEnabled,
  sfxEnabled,
  speechRate,
  onRecordSolve,
  onBack,
}) => {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [gridSize, setGridSize] = useState<2 | 3>(3);
  const [board, setBoard] = useState<number[]>(() => createShuffledBoard(3));
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [solved, setSolved] = useState(false);

  const activePuzzle = PUZZLES[puzzleIdx];

  const startPuzzle = (nextIdx: number, nextGrid: 2 | 3) => {
    playPop(sfxEnabled);
    setPuzzleIdx(nextIdx);
    setGridSize(nextGrid);
    setBoard(createShuffledBoard(nextGrid));
    setSelectedSlot(null);
    setSolved(false);
  };

  const handleTileTap = (slotIndex: number) => {
    if (solved) return;
    playPop(sfxEnabled);

    if (selectedSlot === null) {
      setSelectedSlot(slotIndex);
      return;
    }

    if (selectedSlot === slotIndex) {
      setSelectedSlot(null);
      return;
    }

    const nextBoard = [...board];
    [nextBoard[selectedSlot], nextBoard[slotIndex]] = [
      nextBoard[slotIndex],
      nextBoard[selectedSlot],
    ];
    setBoard(nextBoard);
    setSelectedSlot(null);

    if (nextBoard.every((piece, idx) => piece === idx)) {
      setSolved(true);
      playCelebrate(sfxEnabled);
      speakText(
        language === 'hi' ? 'वाह! पहेली पूरी हो गई!' : 'Hooray! Puzzle solved!',
        language,
        voiceEnabled,
        speechRate
      );
      onRecordSolve(gridSize === 3 ? 3 : 2);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <SectionHeader
        titleEn="Picture Puzzles"
        titleHi="चित्र पहेली"
        subtitleEn="Tap two puzzle pieces to swap them and complete the 3D picture"
        subtitleHi="चित्र पूरा करने के लिए दो टुकड़ों को दबाकर उनकी जगह बदलें"
        language={language}
        stars={stars}
        accentBg="bg-amber-500"
        onBack={onBack}
        onSpeakPrompt={() =>
          speakText(
            language === 'hi'
              ? 'चित्र पूरा करने के लिए दो टुकड़ों को दबाकर जगह बदलें'
              : 'Tap two puzzle pieces to swap them and solve the picture!',
            language,
            voiceEnabled,
            speechRate
          )
        }
      />

      {/* Puzzle & Difficulty Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {PUZZLES.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => startPuzzle(idx, gridSize)}
              className={`toy-btn-3d min-h-[44px] rounded-2xl border-2 border-b-4 px-4 py-2 text-sm font-extrabold whitespace-nowrap ${
                puzzleIdx === idx
                  ? 'border-amber-700 bg-amber-400 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {language === 'hi' ? p.titleHi : p.titleEn}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {([2, 3] as const).map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => startPuzzle(puzzleIdx, sz)}
              className={`toy-btn-3d min-h-[44px] rounded-2xl border-2 border-b-4 px-3.5 py-2 text-xs font-extrabold whitespace-nowrap ${
                gridSize === sz
                  ? 'border-sky-700 bg-sky-500 text-white'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              {sz}×{sz} {sz === 2 ? (language === 'hi' ? 'आसान' : 'Easy') : language === 'hi' ? 'क्लासिक' : 'Classic'}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowPreview((p) => !p)}
            className="toy-btn-3d flex min-h-[44px] items-center gap-1.5 rounded-2xl border-2 border-slate-300 border-b-4 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-700 whitespace-nowrap"
          >
            <Eye className="h-4 w-4" />
            <span>{language === 'hi' ? 'चित्र देखें' : 'Peek Picture'}</span>
          </button>
          <button
            type="button"
            onClick={() => startPuzzle(puzzleIdx, gridSize)}
            className="toy-btn-3d flex min-h-[44px] items-center gap-1.5 rounded-2xl border-2 border-slate-300 border-b-4 bg-slate-100 px-3.5 py-2 text-xs font-extrabold text-slate-700 whitespace-nowrap"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{language === 'hi' ? 'मिलाएँ' : 'Shuffle'}</span>
          </button>
        </div>
      </div>

      <CelebrationBanner
        show={solved}
        titleEn="Picture Complete!"
        titleHi="चित्र पूरा हुआ!"
        starsEarned={gridSize === 3 ? 3 : 2}
        language={language}
        actionLabelEn="Play Another"
        actionLabelHi="अगली पहेली"
        onContinue={() => startPuzzle((puzzleIdx + 1) % PUZZLES.length, gridSize)}
      />

      <div className="grid items-start gap-6 lg:grid-cols-12">
        {/* Interactive Puzzle Board */}
        <div className="lg:col-span-8">
          <div
            className="mx-auto grid aspect-square w-full max-w-[460px] gap-1.5 rounded-3xl border-4 border-amber-300 bg-amber-100 p-2 shadow-md"
            style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
          >
            {board.map((pieceIndex, slotIndex) => {
              const row = Math.floor(pieceIndex / gridSize);
              const col = pieceIndex % gridSize;
              const isSelected = selectedSlot === slotIndex;
              const isInRightSpot = pieceIndex === slotIndex;
              const posX = (col / (gridSize - 1)) * 100;
              const posY = (row / (gridSize - 1)) * 100;

              return (
                <button
                  key={slotIndex}
                  type="button"
                  onClick={() => handleTileTap(slotIndex)}
                  style={{
                    backgroundImage: `url(${activePuzzle.image})`,
                    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                    backgroundPosition: `${posX}% ${posY}%`,
                  }}
                  className={`relative aspect-square w-full overflow-hidden rounded-2xl border-2 transition-transform ${
                    isSelected
                      ? 'scale-95 border-4 border-sky-500 ring-4 ring-sky-300'
                      : isInRightSpot && solved
                        ? 'border-emerald-400'
                        : 'border-white hover:brightness-105'
                  }`}
                  aria-label={`Puzzle piece ${pieceIndex + 1}`}
                >
                  {!solved && (
                    <span className="absolute top-1.5 left-1.5 flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900/65 text-xs font-extrabold text-white">
                      {pieceIndex + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Picture Reference */}
        <div className="lg:col-span-4">
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-4 shadow-xs">
            <h3 className="font-display text-base font-extrabold text-slate-900">
              {language === 'hi' ? 'असली चित्र' : 'Goal Picture'}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-slate-500">
              {language === 'hi'
                ? 'टुकड़ों को 1 से क्रम में सजाएँ'
                : 'Match pieces in order from 1 onward'}
            </p>
            <div className={`mt-3 overflow-hidden rounded-2xl border border-slate-200 ${showPreview || solved ? '' : 'opacity-85'}`}>
              <img
                src={activePuzzle.image}
                alt={activePuzzle.titleEn}
                referrerPolicy="no-referrer"
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
