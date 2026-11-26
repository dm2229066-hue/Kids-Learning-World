import React, { useState } from 'react';
import { ArrowLeft, Download, Star, Volume2, WifiOff, X } from 'lucide-react';
import { Language } from '../../types/learning';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

interface SectionHeaderProps {
  titleEn: string;
  titleHi: string;
  subtitleEn?: string;
  subtitleHi?: string;
  language: Language;
  stars: number;
  onBack: () => void;
  onSpeakPrompt?: () => void;
  accentBg?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  titleEn,
  titleHi,
  subtitleEn,
  subtitleHi,
  language,
  stars,
  onBack,
  onSpeakPrompt,
  accentBg = 'bg-sky-500',
}) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 border-slate-200 bg-white p-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onBack}
          className="toy-btn-3d flex min-h-[48px] min-w-[48px] shrink-0 items-center justify-center gap-2 rounded-2xl border-2 border-slate-300 border-b-4 bg-slate-100 px-3.5 py-2 text-sm font-bold text-slate-800 hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 whitespace-nowrap"
          aria-label={language === 'hi' ? 'होम पर जाएं' : 'Back to Home'}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden sm:inline">{language === 'hi' ? 'होम' : 'Home'}</span>
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className={`inline-block h-3.5 w-3.5 shrink-0 rounded-full ${accentBg}`} aria-hidden="true" />
            <h1 className="font-display truncate text-xl font-extrabold text-slate-900 sm:text-2xl">
              {language === 'hi' ? titleHi : titleEn}
            </h1>
          </div>
          {(subtitleEn || subtitleHi) && (
            <p className="mt-0.5 truncate text-xs font-medium text-slate-500 sm:text-sm">
              {language === 'hi' ? subtitleHi : subtitleEn}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {onSpeakPrompt && (
          <button
            type="button"
            onClick={onSpeakPrompt}
            className="toy-btn-3d flex min-h-[48px] items-center gap-2 rounded-2xl border-2 border-sky-600 border-b-4 bg-sky-500 px-4 py-2 text-sm font-bold text-white hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 whitespace-nowrap shrink-0"
          >
            <Volume2 className="h-5 w-5" />
            <span className="hidden sm:inline">{language === 'hi' ? 'सुनें' : 'Listen'}</span>
          </button>
        )}

        <div className="flex min-h-[48px] items-center gap-1.5 rounded-2xl border-2 border-amber-300 bg-amber-50 px-3.5 py-2 text-amber-900">
          <Star className="h-5 w-5 fill-amber-400 text-amber-500" />
          <span className="font-display text-base font-extrabold tabular-nums">{stars}</span>
        </div>
      </div>
    </div>
  );
};

interface CelebrationBannerProps {
  show: boolean;
  titleEn: string;
  titleHi: string;
  starsEarned: number;
  language: Language;
  onContinue: () => void;
  actionLabelEn?: string;
  actionLabelHi?: string;
}

export const CelebrationBanner: React.FC<CelebrationBannerProps> = ({
  show,
  titleEn,
  titleHi,
  starsEarned,
  language,
  onContinue,
  actionLabelEn = 'Play Again',
  actionLabelHi = 'फिर से खेलें',
}) => {
  if (!show) return null;
  return (
    <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-3xl border-2 border-emerald-400 border-b-4 bg-emerald-50 p-5 text-center shadow-sm sm:flex-row sm:text-left">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-3xl shadow-inner">
          🏆
        </div>
        <div>
          <h3 className="font-display text-xl font-extrabold text-emerald-950">
            {language === 'hi' ? titleHi : titleEn}
          </h3>
          <p className="mt-0.5 text-sm font-semibold text-emerald-800">
            {language === 'hi'
              ? `शाबाश! आपने ${starsEarned} स्टार जीते!`
              : `Awesome job! You earned +${starsEarned} reward stars!`}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="toy-btn-3d min-h-[48px] rounded-2xl border-2 border-emerald-700 border-b-4 bg-emerald-500 px-6 py-2.5 text-sm font-extrabold text-white hover:bg-emerald-600 whitespace-nowrap shrink-0"
      >
        {language === 'hi' ? actionLabelHi : actionLabelEn}
      </button>
    </div>
  );
};

export const PWAInstallButton: React.FC<{ language: Language }> = ({ language }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) return null;

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="toy-btn-3d flex min-h-[44px] items-center gap-2 rounded-2xl border-2 border-emerald-700 border-b-4 bg-emerald-500 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-600 whitespace-nowrap shrink-0"
      >
        <Download className="h-4 w-4" />
        <span>{language === 'hi' ? 'ऐप इंस्टॉल करें' : 'Install App'}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="toy-btn-3d flex min-h-[44px] items-center gap-2 rounded-2xl border-2 border-sky-600 border-b-4 bg-sky-500 px-4 py-2 text-sm font-bold text-white hover:bg-sky-600 whitespace-nowrap shrink-0"
        >
          <Download className="h-4 w-4" />
          <span>{language === 'hi' ? 'होम स्क्रीन पर जोड़ें' : 'Add to Home'}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-extrabold text-slate-900">
                  {language === 'hi' ? 'iPhone / iPad पर इंस्टॉल करें' : 'Install on iPhone / iPad'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                1. Tap the <strong>Share</strong> icon in Safari.<br />
                2. Scroll down and tap <strong>Add to Home Screen</strong>.
              </p>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="toy-btn-3d mt-5 min-h-[48px] w-full rounded-2xl border-2 border-sky-700 border-b-4 bg-sky-500 py-2.5 text-sm font-bold text-white"
              >
                {language === 'hi' ? 'ठीक है' : 'Got It'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export const OfflineIndicator: React.FC<{ language: Language }> = ({ language }) => {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 z-40 flex items-center gap-2 rounded-2xl border-2 border-amber-600 bg-amber-500 px-3.5 py-2 text-xs font-bold text-white shadow-lg md:bottom-4">
      <WifiOff className="h-4 w-4 shrink-0" />
      <span>
        {language === 'hi'
          ? 'ऑफ़लाइन मोड — बिना इंटरनेट के सीखें'
          : 'Offline Mode — Learning works without internet'}
      </span>
    </div>
  );
};
