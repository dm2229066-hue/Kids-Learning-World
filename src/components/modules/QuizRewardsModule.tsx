import React, { useMemo, useState } from 'react';
import { Award, Lock, Star, Volume2 } from 'lucide-react';
import {
  ALPHABET_DATA,
  ANIMALS_BIRDS_DATA,
  BADGE_REWARDS,
  COLORS_DATA,
  FRUITS_VEG_DATA,
  HINDI_SWAR,
} from '../../data/curriculum';
import { Language } from '../../types/learning';
import { playCelebrate, playGentleError, playPop, playSuccess, speakText } from '../../utils/audio';
import { CelebrationBanner, SectionHeader } from '../common/ToyUI';

interface QuizRewardsModuleProps {
  language: Language;
  stars: number;
  quizzesCompleted: number;
  voiceEnabled: boolean;
  sfxEnabled: boolean;
  speechRate: number;
  onRecordQuizWin: (starsEarned: number) => void;
  onBack: () => void;
}

type QuizTopic = 'mixed' | 'abc' | 'hindi' | 'animals' | 'fruits' | 'colors';

interface QuizQuestion {
  promptEn: string;
  promptHi: string;
  speakEn: string;
  speakHi: string;
  options: { id: string; visual: string; labelEn: string; labelHi: string; hex?: string }[];
  correctId: string;
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function buildQuizRound(topic: QuizTopic): QuizQuestion[] {
  const topics: Exclude<QuizTopic, 'mixed'>[] =
    topic === 'mixed' ? ['abc', 'hindi', 'animals', 'fruits', 'colors'] : [topic];

  const questions: QuizQuestion[] = [];

  for (let i = 0; i < 5; i++) {
    const t = topics[i % topics.length];
    if (t === 'abc') {
      const picks = pickRandom(ALPHABET_DATA, 4);
      const target = picks[0];
      questions.push({
        promptEn: `Which picture starts with letter "${target.letter}"?`,
        promptHi: `अक्षर "${target.letter}" से कौन सा चित्र शुरू होता है?`,
        speakEn: `Find the picture for letter ${target.letter}`,
        speakHi: `अक्षर ${target.letter} का सही चित्र चुनें`,
        options: pickRandom(picks, 4).map((p) => ({
          id: p.letter,
          visual: p.emoji,
          labelEn: p.word,
          labelHi: p.hindiWord,
        })),
        correctId: target.letter,
      });
    } else if (t === 'hindi') {
      const picks = pickRandom(HINDI_SWAR, 4);
      const target = picks[0];
      questions.push({
        promptEn: `Find the picture for Hindi letter "${target.char}"`,
        promptHi: `"${target.char}" से क्या बनता है? सही चित्र चुनें`,
        speakEn: `Find Hindi letter ${target.translit}`,
        speakHi: `${target.char} से कौन सा चित्र है?`,
        options: pickRandom(picks, 4).map((p) => ({
          id: p.char,
          visual: p.emoji,
          labelEn: p.wordMeaning,
          labelHi: p.word,
        })),
        correctId: target.char,
      });
    } else if (t === 'animals') {
      const picks = pickRandom(ANIMALS_BIRDS_DATA, 4);
      const target = picks[0];
      questions.push({
        promptEn: `Tap the "${target.en}"!`,
        promptHi: `"${target.hi}" को पहचानें और दबाएँ!`,
        speakEn: `Where is the ${target.en}?`,
        speakHi: `${target.hi} कहाँ है?`,
        options: pickRandom(picks, 4).map((p) => ({
          id: p.id,
          visual: p.emoji,
          labelEn: p.en,
          labelHi: p.hi,
        })),
        correctId: target.id,
      });
    } else if (t === 'fruits') {
      const picks = pickRandom(FRUITS_VEG_DATA, 4);
      const target = picks[0];
      questions.push({
        promptEn: `Find the "${target.en}"!`,
        promptHi: `"${target.hi}" को चुनें!`,
        speakEn: `Find the ${target.en}`,
        speakHi: `${target.hi} ढूँढें`,
        options: pickRandom(picks, 4).map((p) => ({
          id: p.id,
          visual: p.emoji,
          labelEn: p.en,
          labelHi: p.hi,
        })),
        correctId: target.id,
      });
    } else {
      const picks = pickRandom(COLORS_DATA, 4);
      const target = picks[0];
      questions.push({
        promptEn: `Which color is "${target.en}"?`,
        promptHi: `"${target.hi}" रंग कौन सा है?`,
        speakEn: `Tap the color ${target.en}`,
        speakHi: `${target.hi} रंग दबाएँ`,
        options: pickRandom(picks, 4).map((p) => ({
          id: p.id,
          visual: p.emoji,
          labelEn: p.en,
          labelHi: p.hi,
          hex: p.hex,
        })),
        correctId: target.id,
      });
    }
  }

  return questions;
}

export const QuizRewardsModule: React.FC<QuizRewardsModuleProps> = ({
  language,
  stars,
  quizzesCompleted,
  voiceEnabled,
  sfxEnabled,
  speechRate,
  onRecordQuizWin,
  onBack,
}) => {
  const [topic, setTopic] = useState<QuizTopic>('mixed');
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => buildQuizRound('mixed'));
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const current = questions[qIndex];

  const startNewRound = (nextTopic: QuizTopic = topic) => {
    playPop(sfxEnabled);
    setTopic(nextTopic);
    setQuestions(buildQuizRound(nextTopic));
    setQIndex(0);
    setScore(0);
    setFinished(false);
    setFeedback('idle');
  };

  const handlePick = (optionId: string) => {
    if (finished || feedback === 'correct') return;
    if (optionId === current.correctId) {
      setFeedback('correct');
      const nextScore = score + 1;
      setScore(nextScore);

      if (qIndex + 1 >= questions.length) {
        setFinished(true);
        playCelebrate(sfxEnabled);
        speakText(
          language === 'hi' ? 'शाबाश! क्विज़ पूरा हुआ!' : 'Bravo! Quiz complete!',
          language,
          voiceEnabled,
          speechRate
        );
        onRecordQuizWin(nextScore);
      } else {
        playSuccess(sfxEnabled);
        speakText(
          language === 'hi' ? 'सही जवाब!' : 'Correct!',
          language,
          voiceEnabled,
          speechRate
        );
        setTimeout(() => {
          setQIndex((i) => i + 1);
          setFeedback('idle');
        }, 750);
      }
    } else {
      setFeedback('wrong');
      playGentleError(sfxEnabled);
      speakText(
        language === 'hi' ? 'फिर से कोशिश करें' : 'Try again!',
        language,
        voiceEnabled,
        speechRate
      );
    }
  };

  const unlockedCount = useMemo(
    () => BADGE_REWARDS.filter((b) => stars >= b.requiredStars).length,
    [stars]
  );

  return (
    <div className="mx-auto max-w-5xl">
      <SectionHeader
        titleEn="Quiz & Star Rewards"
        titleHi="क्विज़ और स्टार पुरस्कार"
        subtitleEn="Answer fun picture questions to collect stars and unlock animal badges"
        subtitleHi="मज़ेदार सवालों के जवाब दें, स्टार जीतें और बैज अनलॉक करें"
        language={language}
        stars={stars}
        accentBg="bg-amber-500"
        onBack={onBack}
        onSpeakPrompt={() =>
          speakText(
            language === 'hi' ? current.speakHi : current.speakEn,
            language,
            voiceEnabled,
            speechRate
          )
        }
      />

      {/* Topic Selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(
          [
            { id: 'mixed', en: 'Mixed Fun', hi: 'मिक्स क्विज़' },
            { id: 'abc', en: 'ABCD', hi: 'ABCD' },
            { id: 'hindi', en: 'Hindi', hi: 'हिन्दी' },
            { id: 'animals', en: 'Animals', hi: 'जानवर' },
            { id: 'fruits', en: 'Fruits & Veg', hi: 'फल और सब्ज़ी' },
            { id: 'colors', en: 'Colors', hi: 'रंग' },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => startNewRound(t.id)}
            className={`toy-btn-3d min-h-[44px] rounded-2xl border-2 border-b-4 px-4 py-2 text-sm font-extrabold whitespace-nowrap ${
              topic === t.id
                ? 'border-amber-600 bg-amber-400 text-slate-900'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {language === 'hi' ? t.hi : t.en}
          </button>
        ))}
      </div>

      <CelebrationBanner
        show={finished}
        titleEn={`Quiz Champion! ${score}/5 Correct`}
        titleHi={`क्विज़ विजेता! ${score}/5 सही`}
        starsEarned={score}
        language={language}
        actionLabelEn="Play New Quiz"
        actionLabelHi="नया क्विज़ खेलें"
        onContinue={() => startNewRound(topic)}
      />

      {/* Active Quiz Card */}
      {!finished && current && (
        <div className="mb-8 rounded-3xl border-2 border-amber-200 border-b-8 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
            <span>
              {language === 'hi'
                ? `सवाल ${qIndex + 1} / ${questions.length}`
                : `Question ${qIndex + 1} of ${questions.length}`}
            </span>
            <button
              type="button"
              onClick={() =>
                speakText(
                  language === 'hi' ? current.speakHi : current.speakEn,
                  language,
                  voiceEnabled,
                  speechRate
                )
              }
              className="flex items-center gap-1 rounded-xl bg-sky-100 px-3 py-1.5 text-sky-800 hover:bg-sky-200"
            >
              <Volume2 className="h-4 w-4" />
              <span>{language === 'hi' ? 'सवाल सुनें' : 'Read Aloud'}</span>
            </button>
          </div>

          <h2 className="font-display mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {language === 'hi' ? current.promptHi : current.promptEn}
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {current.options.map((opt) => {
              const isCorrect = feedback === 'correct' && opt.id === current.correctId;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handlePick(opt.id)}
                  style={opt.hex ? { backgroundColor: opt.hex } : undefined}
                  className={`toy-card flex min-h-[140px] flex-col items-center justify-center rounded-3xl border-2 border-b-6 p-4 text-center ${
                    isCorrect
                      ? 'border-emerald-600 bg-emerald-50 ring-4 ring-emerald-300'
                      : opt.hex
                        ? 'border-slate-900/20 text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-900 hover:bg-sky-50'
                  }`}
                >
                  <span className="text-5xl leading-none">{opt.visual}</span>
                  <span
                    className={`font-display mt-3 text-base font-extrabold ${
                      opt.hex && opt.id === 'yellow' ? 'text-slate-900' : ''
                    }`}
                  >
                    {language === 'hi' ? opt.labelHi : opt.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Reward Stars & Animal Sticker Badges */}
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Award className="h-6 w-6 text-amber-500" />
            <h3 className="font-display text-xl font-extrabold text-slate-900">
              {language === 'hi' ? 'मेरा स्टार और बैज संग्रह' : 'My Sticker & Badge Shelf'}
            </h3>
          </div>
          <span className="text-sm font-bold text-slate-600 tabular-nums">
            {unlockedCount}/{BADGE_REWARDS.length} {language === 'hi' ? 'बैज अनलॉक' : 'Unlocked'} ·{' '}
            {quizzesCompleted} {language === 'hi' ? 'क्विज़ पूरे' : 'Quizzes Done'}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-6">
          {BADGE_REWARDS.map((badge) => {
            const unlocked = stars >= badge.requiredStars;
            return (
              <div
                key={badge.id}
                className={`flex flex-col items-center rounded-2xl border-2 p-4 text-center ${
                  unlocked
                    ? 'border-amber-300 bg-amber-50 text-slate-900'
                    : 'border-slate-200 bg-slate-50 text-slate-400'
                }`}
              >
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-xs">
                  <span className={unlocked ? '' : 'grayscale opacity-40'}>{badge.emoji}</span>
                  {!unlocked && (
                    <Lock className="absolute -right-1 -bottom-1 h-5 w-5 rounded-full bg-slate-200 p-1 text-slate-600" />
                  )}
                </div>
                <span className="font-display mt-2.5 text-sm font-extrabold">
                  {language === 'hi' ? badge.titleHi : badge.titleEn}
                </span>
                <span className="mt-0.5 flex items-center gap-1 text-xs font-bold tabular-nums">
                  <Star className={`h-3.5 w-3.5 ${unlocked ? 'fill-amber-400 text-amber-500' : ''}`} />
                  {badge.requiredStars}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
