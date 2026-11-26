import React, { useEffect, useState } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { Language } from '../../types/learning';
import { ADMOB_IDS, isNativeAndroidOrIOS, syncNativeBannerAd } from '../../utils/admob';
import { playPop } from '../../utils/audio';

export const ANDROID_TEST_AD_IDS = {
  appId: ADMOB_IDS.realAppId,
  bannerId: ADMOB_IDS.realBannerId,
  testAppId: ADMOB_IDS.testAppId,
  testBannerId: ADMOB_IDS.testBannerId,
  interstitialId: ADMOB_IDS.testInterstitialId,
};

interface TestAdBannerProps {
  enabled: boolean;
  useTestMode: boolean;
  language: Language;
  sfxEnabled: boolean;
}

export const TestAdBanner: React.FC<TestAdBannerProps> = ({
  enabled,
  useTestMode,
  language,
  sfxEnabled,
}) => {
  const [clicked, setClicked] = useState(false);
  const isNative = isNativeAndroidOrIOS();

  useEffect(() => {
    syncNativeBannerAd(enabled, useTestMode);
  }, [enabled, useTestMode]);

  if (!enabled) return null;

  // On native Android/iOS APK, AdMob renders the real native banner overlay directly
  if (isNative) {
    return <div className="h-[68px]" aria-hidden="true" />;
  }

  const activeBannerId = useTestMode ? ADMOB_IDS.testBannerId : ADMOB_IDS.realBannerId;

  return (
    <div className="mx-auto mt-6 max-w-4xl">
      <div
        role="region"
        aria-label="AdMob Banner Slot"
        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-sky-300 bg-white px-4 py-2.5 shadow-xs"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-extrabold tracking-wide ${
              useTestMode ? 'bg-amber-400 text-slate-900' : 'bg-emerald-500 text-white'
            }`}
          >
            {useTestMode ? 'TEST AD' : 'ADMOB BANNER'}
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-extrabold text-slate-800 sm:text-sm">
              {useTestMode
                ? language === 'hi'
                  ? 'टेस्ट विज्ञापन बैनर · परिवार-सुरक्षित मोड (320×50)'
                  : 'Test Banner Ad · Child-Safe AdMob Demo (320×50)'
                : language === 'hi'
                  ? 'लाइव Android AdMob बैनर यूनिट सक्रिय (बच्चों के लिए सुरक्षित)'
                  : 'Android AdMob Banner Unit Active (Child-Directed Mode)'}
            </p>
            <p className="truncate font-mono text-[11px] text-slate-500">
              {activeBannerId}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playPop(sfxEnabled);
            setClicked((c) => !c);
          }}
          className="flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-xl border border-sky-300 bg-sky-50 px-3 py-1.5 text-xs font-extrabold text-sky-800 hover:bg-sky-100 whitespace-nowrap"
        >
          {clicked ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>{language === 'hi' ? 'यूनिट सक्रिय' : 'Unit Verified'}</span>
            </>
          ) : (
            <>
              <Info className="h-4 w-4" />
              <span>{language === 'hi' ? 'ID देखें' : 'Verify Unit'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

interface TestInterstitialModalProps {
  open: boolean;
  language: Language;
  sfxEnabled: boolean;
  onClose: () => void;
}

export const TestInterstitialModal: React.FC<TestInterstitialModalProps> = ({
  open,
  language,
  sfxEnabled,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl border-2 border-amber-300 bg-white p-6 text-center shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="rounded-lg bg-amber-400 px-2.5 py-1 text-xs font-extrabold text-slate-900">
            TEST INTERSTITIAL AD
          </span>
          <button
            type="button"
            onClick={() => {
              playPop(sfxEnabled);
              onClose();
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
            aria-label="Close test ad"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="my-6 rounded-2xl border-2 border-dashed border-sky-300 bg-sky-50 p-6">
          <p className="text-4xl">🦁✨</p>
          <h3 className="font-display mt-3 text-xl font-extrabold text-slate-900">
            {language === 'hi'
              ? 'AdMob टेस्ट इंटरस्टिशियल विज्ञापन'
              : 'AdMob Test Interstitial Preview'}
          </h3>
          <p className="mt-1.5 text-xs font-medium text-slate-600">
            {language === 'hi'
              ? 'यह Android पैकेजिंग के लिए सुरक्षित टेस्ट विज्ञापन है।'
              : 'Simulated full-screen family-safe test ad for Android packaging verification.'}
          </p>
          <p className="mt-3 rounded-lg bg-white px-3 py-1.5 font-mono text-[11px] font-semibold text-slate-700">
            {ANDROID_TEST_AD_IDS.interstitialId}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            playPop(sfxEnabled);
            onClose();
          }}
          className="toy-btn-3d min-h-[48px] w-full rounded-2xl border-2 border-sky-700 border-b-4 bg-sky-500 py-2.5 text-sm font-extrabold text-white hover:bg-sky-600"
        >
          {language === 'hi' ? 'विज्ञापन बंद करें' : 'Close Test Ad'}
        </button>
      </div>
    </div>
  );
};
