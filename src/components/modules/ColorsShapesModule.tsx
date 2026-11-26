import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { COLORS_DATA, ColorItem, SHAPES_DATA, ShapeItem } from '../../data/curriculum';
import { Language } from '../../types/learning';
import { playPop, speakText } from '../../utils/audio';
import { SectionHeader } from '../common/ToyUI';

interface ColorsShapesModuleProps {
  language: Language;
  stars: number;
  learnedIds: string[];
  voiceEnabled: boolean;
  sfxEnabled: boolean;
  speechRate: number;
  onMarkLearned: (id: string, starReward?: number) => void;
  onBack: () => void;
}

const ShapeSVG: React.FC<{ id: string; color: string }> = ({ id, color }) => {
  switch (id) {
    case 'circle':
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20">
          <circle cx="50" cy="50" r="38" fill={color} stroke="#1E293B" strokeWidth="4" />
        </svg>
      );
    case 'square':
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20">
          <rect x="16" y="16" width="68" height="68" rx="8" fill={color} stroke="#1E293B" strokeWidth="4" />
        </svg>
      );
    case 'triangle':
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20">
          <polygon points="50,14 88,84 12,84" fill={color} stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      );
    case 'rectangle':
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20">
          <rect x="10" y="26" width="80" height="48" rx="8" fill={color} stroke="#1E293B" strokeWidth="4" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20">
          <polygon
            points="50,10 61,36 90,39 68,58 75,87 50,72 25,87 32,58 10,39 39,36"
            fill={color}
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'heart':
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20">
          <path
            d="M50 84 C20 62 12 42 18 28 C24 15 41 16 50 29 C59 16 76 15 82 28 C88 42 80 62 50 84 Z"
            fill={color}
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'diamond':
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20">
          <polygon points="50,10 86,50 50,90 14,50" fill={color} stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      );
    case 'oval':
    default:
      return (
        <svg viewBox="0 0 100 100" className="h-20 w-20">
          <ellipse cx="50" cy="50" rx="40" ry="27" fill={color} stroke="#1E293B" strokeWidth="4" />
        </svg>
      );
  }
};

export const ColorsShapesModule: React.FC<ColorsShapesModuleProps> = ({
  language,
  stars,
  learnedIds,
  voiceEnabled,
  sfxEnabled,
  speechRate,
  onMarkLearned,
  onBack,
}) => {
  const [tab, setTab] = useState<'colors' | 'shapes'>('colors');

  const handleColorTap = (item: ColorItem) => {
    playPop(sfxEnabled);
    speakText(
      language === 'hi' ? `${item.hi} रंग` : `${item.en} color`,
      language,
      voiceEnabled,
      speechRate
    );
    onMarkLearned(`color_${item.id}`, 1);
  };

  const handleShapeTap = (item: ShapeItem) => {
    playPop(sfxEnabled);
    speakText(
      language === 'hi' ? `${item.hi}. ${item.sidesHi}` : `${item.en}. ${item.sidesEn}`,
      language,
      voiceEnabled,
      speechRate
    );
    onMarkLearned(`shape_${item.id}`, 1);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeader
        titleEn="Colors & Shapes"
        titleHi="रंग और आकार"
        subtitleEn="Tap any color splash or shape block to learn and hear it"
        subtitleHi="सीखने और सुनने के लिए किसी भी रंग या आकार को दबाएँ"
        language={language}
        stars={stars}
        accentBg="bg-pink-500"
        onBack={onBack}
      />

      <div className="mb-6 flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white p-1.5 shadow-xs sm:inline-flex">
        <button
          type="button"
          onClick={() => {
            playPop(sfxEnabled);
            setTab('colors');
          }}
          className={`min-h-[44px] flex-1 rounded-xl px-5 py-2 text-sm font-extrabold transition-colors whitespace-nowrap sm:flex-initial ${
            tab === 'colors' ? 'bg-pink-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🎨 {language === 'hi' ? 'रंग (Colors)' : 'Colors'}
        </button>
        <button
          type="button"
          onClick={() => {
            playPop(sfxEnabled);
            setTab('shapes');
          }}
          className={`min-h-[44px] flex-1 rounded-xl px-5 py-2 text-sm font-extrabold transition-colors whitespace-nowrap sm:flex-initial ${
            tab === 'shapes' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🔺 {language === 'hi' ? 'आकार (Shapes)' : 'Shapes'}
        </button>
      </div>

      {tab === 'colors' ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {COLORS_DATA.map((c) => {
            const done = learnedIds.includes(`color_${c.id}`);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleColorTap(c)}
                style={{ backgroundColor: c.hex }}
                className={`toy-card relative flex min-h-[168px] flex-col items-center justify-center rounded-3xl border-2 border-slate-900/15 border-b-8 p-5 text-center shadow-sm ${
                  c.textDark ? 'text-slate-900' : 'text-white'
                }`}
              >
                {done && <CheckCircle2 className="absolute top-3 right-3 h-5 w-5 opacity-90" />}
                <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/85 text-2xl shadow-xs">
                  {c.emoji}
                </span>
                <span className="font-display text-2xl font-extrabold">
                  {language === 'hi' ? c.hi : c.en}
                </span>
                <span className="mt-1 text-xs font-bold opacity-90">
                  {language === 'hi' ? c.exampleHi : c.exampleEn}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SHAPES_DATA.map((s) => {
            const done = learnedIds.includes(`shape_${s.id}`);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleShapeTap(s)}
                className="toy-card relative flex min-h-[180px] flex-col items-center justify-center rounded-3xl border-2 border-slate-200 border-b-8 bg-white p-5 text-center shadow-xs hover:bg-slate-50"
              >
                {done && (
                  <CheckCircle2 className="absolute top-3 right-3 h-5 w-5 text-emerald-600" />
                )}
                <ShapeSVG id={s.id} color={s.color} />
                <span className="font-display mt-3 text-xl font-extrabold text-slate-900">
                  {language === 'hi' ? s.hi : s.en}
                </span>
                <span className="mt-0.5 text-xs font-bold text-slate-500">
                  {language === 'hi' ? s.sidesHi : s.sidesEn}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
