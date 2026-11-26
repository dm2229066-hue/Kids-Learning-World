import React, { useMemo, useState } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import { AgeGroup, Language } from '../../types/learning';
import { playCelebrate, playGentleError, playPop, playSuccess, speakText } from '../../utils/audio';
import { CelebrationBanner, SectionHeader } from '../common/ToyUI';

interface MathModuleProps {
  language: Language;
  ageGroup: AgeGroup;
  stars: number;
  voiceEnabled: boolean;
  sfxEnabled: boolean;
  speechRate: number;
  onAddStars: (amount: number) => void;
  onBack: () => void;
}

type OpMode = 'add' | 'sub' | 'mixed';

interface MathQuestion {
  a: number;
  b: number;
  op: '+' | '-';
  answer: number;
  options: number[];
}

function generateQuestion(mode: OpMode, ageGroup: AgeGroup): MathQuestion {
  const maxNum = ageGroup === '2-4' ? 5 : ageGroup === '5-7' ? 10 : 20;
  const op: '+' | '-' =
    mode === 'add' ? '+' : mode === 'sub' ? '-' : Math.random() > 0.5 ? '+' : '-';

  let a = Math.floor(Math.random() * maxNum) + 1;
  let b = Math.floor(Math.random() * maxNum) + 1;

  if (op === '-' && b > a) {
    [a, b] = [b, a];
  }

  const answer = op === '+' ? a + b : a - b;
  const opts = new Set<number>([answer]);
  while (opts.size < 4) {
    const offset = Math.floor(Math.random() * 5) - 2;
    const candidate = Math.max(0, answer + offset);
    opts.add(candidate);
  }
  const options = Array.from(opts).sort((x, y) => x - y);
  return { a, b, op, answer, options };
}

export const MathModule: React.FC<MathModuleProps> = ({
  language,
  ageGroup,
  stars,
  voiceEnabled,
  sfxEnabled,
  speechRate,
  onAddStars,
  onBack,
}) => {
  const [mode, setMode] = useState<OpMode>('add');
  const [question, setQuestion] = useState<MathQuestion>(() => generateQuestion('add', ageGroup));
  const [roundScore, setRoundScore] = useState(0);
  const [roundCount, setRoundCount] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const roundComplete = roundCount >= 5;

  const spokenEquation = useMemo(() => {
    const wordOp =
      question.op === '+'
        ? language === 'hi'
          ? 'जोड़'
          : 'plus'
        : language === 'hi'
          ? 'घटाव'
          : 'minus';
    return `${question.a} ${wordOp} ${question.b}`;
  }, [question, language]);

  const nextQuestion = (nextMode = mode) => {
    setQuestion(generateQuestion(nextMode, ageGroup));
    setFeedback('idle');
    setSelectedChoice(null);
  };

  const handleModeChange = (nextMode: OpMode) => {
    playPop(sfxEnabled);
    setMode(nextMode);
    setRoundScore(0);
    setRoundCount(0);
    nextQuestion(nextMode);
  };

  const handleAnswer = (choice: number) => {
    if (feedback === 'correct' || roundComplete) return;
    setSelectedChoice(choice);

    if (choice === question.answer) {
      setFeedback('correct');
      const nextCount = roundCount + 1;
      setRoundScore((s) => s + 1);
      setRoundCount(nextCount);
      onAddStars(1);

      if (nextCount >= 5) {
        playCelebrate(sfxEnabled);
        speakText(
          language === 'hi' ? 'शाबाश! राउंड पूरा हुआ!' : 'Awesome! Round complete!',
          language,
          voiceEnabled,
          speechRate
        );
      } else {
        playSuccess(sfxEnabled);
        speakText(
          language === 'hi' ? `सही जवाब! ${question.answer}` : `Great job! ${question.answer}`,
          language,
          voiceEnabled,
          speechRate
        );
        setTimeout(() => {
          nextQuestion();
        }, 900);
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

  const handleRestartRound = () => {
    playPop(sfxEnabled);
    setRoundScore(0);
    setRoundCount(0);
    nextQuestion();
  };

  return (
    <div className="mx-auto max-w-4xl">
      <SectionHeader
        titleEn="Addition & Subtraction"
        titleHi="जोड़ और घटाव खेल"
        subtitleEn="Count the apples and tap the right answer"
        subtitleHi="सेब गिनें और सही उत्तर चुनें"
        language={language}
        stars={stars}
        accentBg="bg-emerald-500"
        onBack={onBack}
        onSpeakPrompt={() => speakText(spokenEquation, language, voiceEnabled, speechRate)}
      />

      {/* Mode Selector & Round Progress */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'add', en: 'Addition (+)', hi: 'जोड़ (+)' },
              { id: 'sub', en: 'Subtraction (-)', hi: 'घटाव (-)' },
              { id: 'mixed', en: 'Mixed (+ / -)', hi: 'दोनों (+ / -)' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleModeChange(item.id)}
              className={`toy-btn-3d min-h-[44px] rounded-2xl border-2 border-b-4 px-4 py-2 text-sm font-extrabold whitespace-nowrap ${
                mode === item.id
                  ? 'border-emerald-700 bg-emerald-500 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {language === 'hi' ? item.hi : item.en}
            </button>
          ))}
        </div>

        <div className="text-sm font-extrabold text-slate-600 tabular-nums">
          {language === 'hi' ? `प्रगति: ${roundCount} / 5` : `Progress: ${roundCount} / 5`}
        </div>
      </div>

      <CelebrationBanner
        show={roundComplete}
        titleEn={`Math Star! Score: ${roundScore}/5`}
        titleHi={`गणित चैंपियन! स्कोर: ${roundScore}/5`}
        starsEarned={roundScore}
        language={language}
        onContinue={handleRestartRound}
      />

      {/* Visual Math Stage */}
      <div className="rounded-3xl border-2 border-emerald-200 border-b-8 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Equation Display */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex flex-col items-center rounded-2xl border-2 border-rose-200 bg-rose-50 px-5 py-3">
              <span className="font-display text-4xl font-extrabold tabular-nums text-rose-600 sm:text-5xl">
                {question.a}
              </span>
              {question.a <= 12 && (
                <div className="mt-2 flex max-w-[140px] flex-wrap justify-center gap-1">
                  {Array.from({ length: question.a }, (_, i) => (
                    <span key={i} className="text-lg leading-none">
                      🍎
                    </span>
                  ))}
                </div>
              )}
            </div>

            <span className="font-display text-4xl font-extrabold text-slate-800 sm:text-5xl">
              {question.op}
            </span>

            <div className="flex flex-col items-center rounded-2xl border-2 border-sky-200 bg-sky-50 px-5 py-3">
              <span className="font-display text-4xl font-extrabold tabular-nums text-sky-600 sm:text-5xl">
                {question.b}
              </span>
              {question.b <= 12 && (
                <div className="mt-2 flex max-w-[140px] flex-wrap justify-center gap-1">
                  {Array.from({ length: question.b }, (_, i) => (
                    <span key={i} className="text-lg leading-none">
                      {question.op === '+' ? '🍏' : '✂️'}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <span className="font-display text-4xl font-extrabold text-slate-800 sm:text-5xl">
              =
            </span>

            <div className="flex h-20 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 font-display text-4xl font-extrabold text-amber-600">
              {feedback === 'correct' ? question.answer : '?'}
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
            {question.options.map((opt) => {
              const isSelected = selectedChoice === opt;
              const isCorrectChoice = feedback === 'correct' && opt === question.answer;
              const isWrongChoice = feedback === 'wrong' && isSelected;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleAnswer(opt)}
                  className={`toy-btn-3d flex min-h-[72px] items-center justify-center rounded-2xl border-2 border-b-4 font-display text-3xl font-extrabold tabular-nums ${
                    isCorrectChoice
                      ? 'border-emerald-700 bg-emerald-500 text-white'
                      : isWrongChoice
                        ? 'border-rose-600 bg-rose-100 text-rose-800'
                        : 'border-sky-300 bg-sky-50 text-slate-900 hover:bg-sky-100'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Bottom Helper */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 w-full">
            <p className="flex items-center gap-1.5 text-sm font-bold text-slate-600">
              <Sparkles className="h-4 w-4 text-amber-500" />
              {feedback === 'correct'
                ? language === 'hi'
                  ? 'बहुत बढ़िया! +1 स्टार मिला!'
                  : 'Awesome! +1 Star earned!'
                : feedback === 'wrong'
                  ? language === 'hi'
                    ? 'कोई बात नहीं, फिर से गिनें!'
                    : 'Almost! Count again and try!'
                  : language === 'hi'
                    ? 'सही संख्या चुनें'
                    : 'Tap the correct answer'}
            </p>
            <button
              type="button"
              onClick={() => nextQuestion()}
              className="toy-btn-3d flex min-h-[44px] items-center gap-1.5 rounded-xl border-2 border-slate-300 border-b-4 bg-slate-100 px-3.5 py-2 text-xs font-extrabold text-slate-700 whitespace-nowrap"
            >
              <RefreshCw className="h-4 w-4" />
              <span>{language === 'hi' ? 'नया सवाल' : 'New Problem'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
