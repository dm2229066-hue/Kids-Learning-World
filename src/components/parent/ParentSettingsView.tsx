import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Trash2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { AgeGroup, Language, LearningProgress } from '../../types/learning';
import { playPop, speakText } from '../../utils/audio';
import { ANDROID_TEST_AD_IDS } from '../common/TestAdBanner';

interface ParentSettingsViewProps {
  progress: LearningProgress;
  onSetLanguage: (lang: Language) => void;
  onSetAgeGroup: (age: AgeGroup) => void;
  onSetVoiceEnabled: (enabled: boolean) => void;
  onSetSfxEnabled: (enabled: boolean) => void;
  onSetSpeechRate: (rate: number) => void;
  onSetTestAdsEnabled: (enabled: boolean) => void;
  onPreviewInterstitial: () => void;
  onResetProgress: () => void;
  onBack: () => void;
}

export const ParentSettingsView: React.FC<ParentSettingsViewProps> = ({
  progress,
  onSetLanguage,
  onSetAgeGroup,
  onSetVoiceEnabled,
  onSetSfxEnabled,
  onSetSpeechRate,
  onSetTestAdsEnabled,
  onPreviewInterstitial,
  onResetProgress,
  onBack,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const lang = progress.language;

  return (
    <div className="mx-auto max-w-5xl pb-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 border-slate-200 bg-white p-4 shadow-xs sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              playPop(progress.sfxEnabled);
              onBack();
            }}
            className="toy-btn-3d flex min-h-[48px] items-center gap-2 rounded-2xl border-2 border-slate-300 border-b-4 bg-slate-100 px-4 py-2 text-sm font-bold text-slate-800 whitespace-nowrap"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{lang === 'hi' ? 'ऐप पर लौटें' : 'Back to Kids World'}</span>
          </button>
          <div>
            <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
              {lang === 'hi' ? 'माता-पिता सेटिंग्स और गाइड' : 'Parent Settings & Packaging Guide'}
            </h1>
            <p className="text-xs font-medium text-slate-500">
              {lang === 'hi'
                ? '100% सुरक्षित · कोई विज्ञापन नहीं · कोई डेटा संग्रह नहीं'
                : 'Child-Safe Mode · Zero Ads · Zero Data Collection · 100% Offline Ready'}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-bold text-amber-800">Total Stars Earned</p>
          <p className="font-display mt-1 text-3xl font-extrabold tabular-nums text-amber-950">
            {progress.stars}
          </p>
        </div>
        <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-4">
          <p className="text-xs font-bold text-sky-800">Items Learned</p>
          <p className="font-display mt-1 text-3xl font-extrabold tabular-nums text-sky-950">
            {progress.learnedIds.length}
          </p>
        </div>
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-bold text-emerald-800">Quizzes & Games</p>
          <p className="font-display mt-1 text-3xl font-extrabold tabular-nums text-emerald-950">
            {progress.quizzesCompleted + progress.gamesWon}
          </p>
        </div>
        <div className="rounded-3xl border-2 border-pink-200 bg-pink-50 p-4">
          <p className="text-xs font-bold text-pink-800">Saved Drawings</p>
          <p className="font-display mt-1 text-3xl font-extrabold tabular-nums text-pink-950">
            {progress.savedDrawings.length}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Audio & Learning Preferences */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs">
          <h2 className="font-display text-lg font-extrabold text-slate-900">
            Learning & Voice Controls
          </h2>

          <div className="mt-4 space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                App Language (English / हिन्दी)
              </label>
              <div className="mt-2 flex gap-2">
                {(['en', 'hi'] as Language[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => onSetLanguage(l)}
                    className={`min-h-[44px] flex-1 rounded-2xl border-2 px-4 py-2 text-sm font-extrabold ${
                      progress.language === l
                        ? 'border-sky-600 bg-sky-500 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    {l === 'en' ? 'English' : 'हिन्दी (Hindi)'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Child Age Group (Adapts Math & Spelling Difficulty)
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(['2-4', '5-7', '8-10'] as AgeGroup[]).map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => onSetAgeGroup(age)}
                    className={`min-h-[44px] rounded-2xl border-2 px-3 py-2 text-sm font-extrabold ${
                      progress.ageGroup === age
                        ? 'border-emerald-600 bg-emerald-500 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    Ages {age}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Voice Pronunciation Speed
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[
                  { rate: 0.75, label: 'Slow (2–4)' },
                  { rate: 0.9, label: 'Normal' },
                  { rate: 1.05, label: 'Brisk' },
                ].map((opt) => (
                  <button
                    key={opt.rate}
                    type="button"
                    onClick={() => {
                      onSetSpeechRate(opt.rate);
                      speakText('Apple, Ball, Cat', 'en', true, opt.rate);
                    }}
                    className={`min-h-[44px] rounded-2xl border-2 px-3 py-2 text-xs font-extrabold ${
                      progress.speechRate === opt.rate
                        ? 'border-amber-500 bg-amber-400 text-slate-900'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => onSetVoiceEnabled(!progress.voiceEnabled)}
                className={`flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-2xl border-2 px-4 py-2 text-sm font-extrabold ${
                  progress.voiceEnabled
                    ? 'border-sky-500 bg-sky-50 text-sky-900'
                    : 'border-slate-200 bg-slate-100 text-slate-500'
                }`}
              >
                {progress.voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                <span>Voice: {progress.voiceEnabled ? 'ON' : 'OFF'}</span>
              </button>

              <button
                type="button"
                onClick={() => onSetSfxEnabled(!progress.sfxEnabled)}
                className={`flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-2xl border-2 px-4 py-2 text-sm font-extrabold ${
                  progress.sfxEnabled
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200 bg-slate-100 text-slate-500'
                }`}
              >
                <span>Sound FX: {progress.sfxEnabled ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Test Ad Mode (AdMob Android Test Units)
              </label>
              <div className="mt-2 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    playPop(progress.sfxEnabled);
                    onSetTestAdsEnabled(!progress.testAdsEnabled);
                  }}
                  className={`flex min-h-[46px] flex-1 items-center justify-center rounded-2xl border-2 px-4 py-2 text-sm font-extrabold ${
                    progress.testAdsEnabled
                      ? 'border-amber-500 bg-amber-50 text-amber-900'
                      : 'border-slate-200 bg-slate-100 text-slate-600'
                  }`}
                >
                  Test Banner Ad: {progress.testAdsEnabled ? 'ON' : 'OFF'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playPop(progress.sfxEnabled);
                    onPreviewInterstitial();
                  }}
                  className="toy-btn-3d flex min-h-[46px] flex-1 items-center justify-center rounded-2xl border-2 border-sky-600 border-b-4 bg-sky-500 px-4 py-2 text-sm font-extrabold text-white"
                >
                  Preview Interstitial Ad
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Child Safety & Local Reset */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-600" />
            <h2 className="font-display text-lg font-extrabold text-slate-900">
              Child Safety & Privacy Guarantees
            </h2>
          </div>
          <ul className="mt-4 space-y-2.5 text-sm font-medium text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>Test Ad Mode uses non-tracking child-safe demo banners with zero external redirects.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>No chat rooms, social feeds, or third-party tracking.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>All stars, badges, and drawings stay locally on this device via browser storage.</span>
            </li>
          </ul>

          <div className="mt-6 border-t border-slate-200 pt-5">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="flex min-h-[46px] items-center gap-2 rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-2 text-sm font-extrabold text-rose-700 hover:bg-rose-100"
              >
                <Trash2 className="h-4 w-4" />
                <span>Reset Local Learning Progress</span>
              </button>
            ) : (
              <div className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-4">
                <p className="text-xs font-bold text-rose-900">
                  Are you sure? This clears all earned stars, learned badges, and saved drawings on this device.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onResetProgress();
                      setConfirmReset(false);
                    }}
                    className="min-h-[40px] rounded-xl bg-rose-600 px-4 py-1.5 text-xs font-extrabold text-white"
                  >
                    Yes, Reset All
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="min-h-[40px] rounded-xl bg-white px-4 py-1.5 text-xs font-extrabold text-slate-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clear Setup & Android Packaging Instructions */}
      <div className="mt-6 rounded-3xl border-2 border-sky-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Smartphone className="h-6 w-6 text-sky-600" />
          <h2 className="font-display text-lg font-extrabold text-slate-900">
            Setup & Android Packaging Instructions
          </h2>
        </div>

        <div className="mt-4 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-display text-sm font-extrabold text-slate-900">
              1. Local Development Setup
            </h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-900 p-3 text-xs text-sky-100">
{`npm install
npm run dev
# Production build:
npm run build`}
            </pre>
            <p className="mt-2 text-xs text-slate-600">
              The Vite PWA service worker precaches all assets, 3D illustrations, and curriculum modules for full offline play.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-display text-sm font-extrabold text-slate-900">
              2. Install Directly on Android (PWA)
            </h3>
            <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-xs font-medium text-slate-700">
              <li>Open Kids Learning World in Chrome on Android.</li>
              <li>Tap the green <strong>Install App</strong> button on the home toolbar (or Chrome menu → Add to Home screen).</li>
              <li>Launches full-screen without browser bars and works offline on flights or car rides.</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-display text-sm font-extrabold text-slate-900">
              3. Build Android APK (GitHub Actions or Local)
            </h3>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-900 p-3 text-xs text-emerald-100">
{`# Automated on GitHub:
# Push to main -> Actions -> Build Android APK
# Download artifact: Kids-Learning-World-APK

# Or build locally:
npm run build
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap add android && npx cap sync android
cd android && ./gradlew assembleDebug`}
            </pre>
            <p className="mt-2 text-xs text-slate-600">
              GitHub Actions (<code className="font-mono">.github/workflows/android-apk.yml</code>) automatically compiles <code className="font-mono">Kids-Learning-World-debug.apk</code> on every push to <code className="font-mono">main</code>.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <h3 className="font-display text-sm font-extrabold text-amber-950">
            4. Android AdMob Test Ad Configuration (Optional)
          </h3>
          <p className="mt-1 text-xs font-medium text-amber-900">
            For native Android builds with <code className="font-mono">@capacitor-community/admob</code>, use Google&apos;s official family-safe Test IDs before publishing:
          </p>
          <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-900 p-3 text-xs text-amber-100">
{`AdMob App ID:          ${ANDROID_TEST_AD_IDS.appId}
Banner Test ID:        ${ANDROID_TEST_AD_IDS.bannerId}
Interstitial Test ID:  ${ANDROID_TEST_AD_IDS.interstitialId}`}
          </pre>
        </div>
      </div>
    </div>
  );
};
