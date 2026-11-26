import React, { useMemo, useState } from 'react';
import { Lock, ShieldCheck, X } from 'lucide-react';
import { Language } from '../../types/learning';
import { playGentleError, playPop, playSuccess } from '../../utils/audio';

interface ParentGateModalProps {
  open: boolean;
  language: Language;
  sfxEnabled: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export const ParentGateModal: React.FC<ParentGateModalProps> = ({
  open,
  language,
  sfxEnabled,
  onSuccess,
  onClose,
}) => {
  const challenge = useMemo(() => {
    const pairs = [
      { a: 7, b: 6, op: '×', ans: 42 },
      { a: 8, b: 7, op: '×', ans: 56 },
      { a: 9, b: 6, op: '×', ans: 54 },
      { a: 14, b: 19, op: '+', ans: 33 },
      { a: 27, b: 15, op: '+', ans: 42 },
    ];
    return pairs[Math.floor(Math.random() * pairs.length)];
  }, [open]);

  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(input.trim()) === challenge.ans) {
      playSuccess(sfxEnabled);
      setInput('');
      setError(false);
      onSuccess();
    } else {
      playGentleError(sfxEnabled);
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-extrabold text-slate-900">
                {language === 'hi' ? 'माता-पिता सत्यापन' : 'Parent Verification'}
              </h2>
              <p className="text-xs font-medium text-slate-500">
                {language === 'hi' ? 'केवल बड़ों के लिए सुरक्षित क्षेत्र' : 'Grown-ups only area'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playPop(sfxEnabled);
              setInput('');
              setError(false);
              onClose();
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5">
          <p className="text-sm font-semibold text-slate-700">
            {language === 'hi'
              ? 'सेटिंग्स खोलने के लिए कृपया इस गणित प्रश्न का उत्तर दें:'
              : 'Please solve this quick problem to enter Parent Settings:'}
          </p>

          <div className="mt-4 rounded-2xl border-2 border-sky-200 bg-sky-50 py-4 text-center font-display text-3xl font-extrabold tabular-nums text-sky-900">
            {challenge.a} {challenge.op} {challenge.b} = ?
          </div>

          <input
            type="number"
            inputMode="numeric"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder={language === 'hi' ? 'उत्तर लिखें' : 'Enter answer'}
            autoFocus
            className="mt-4 w-full rounded-2xl border-2 border-slate-300 px-4 py-3 text-center font-display text-xl font-bold text-slate-900 focus:border-sky-500 focus:outline-none"
          />

          {error && (
            <p className="mt-2 text-center text-xs font-bold text-rose-600">
              {language === 'hi' ? 'सही उत्तर नहीं है, कृपया फिर प्रयास करें।' : 'Incorrect answer. Please try again.'}
            </p>
          )}

          <button
            type="submit"
            className="toy-btn-3d mt-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-sky-700 border-b-4 bg-sky-500 py-2.5 text-sm font-extrabold text-white hover:bg-sky-600"
          >
            <ShieldCheck className="h-5 w-5" />
            <span>{language === 'hi' ? 'सेटिंग्स खोलें' : 'Unlock Parent Zone'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
