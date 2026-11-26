import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  BannerAdPosition,
  BannerAdSize,
  MaxAdContentRating,
} from '@capacitor-community/admob';

export const ADMOB_IDS = {
  realAppId: 'ca-app-pub-7496793317592044~6777057990',
  realBannerId: 'ca-app-pub-7496793317592044/6017355147',
  testAppId: 'ca-app-pub-3940256099942544~3347511713',
  testBannerId: 'ca-app-pub-3940256099942544/6300978111',
  testInterstitialId: 'ca-app-pub-3940256099942544/1033173712',
};

let initialized = false;

export function isNativeAndroidOrIOS(): boolean {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}

export async function ensureAdMobInitialized(useTestMode: boolean): Promise<void> {
  if (!isNativeAndroidOrIOS() || initialized) return;
  try {
    await AdMob.initialize({
      initializeForTesting: useTestMode,
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: true,
      maxAdContentRating: MaxAdContentRating.General,
    });
    initialized = true;
  } catch {
    // Ignore initialization errors on non-native environments
  }
}

export async function syncNativeBannerAd(enabled: boolean, useTestMode: boolean): Promise<void> {
  if (!isNativeAndroidOrIOS()) return;
  try {
    if (!enabled) {
      await AdMob.hideBanner().catch(() => {});
      await AdMob.removeBanner().catch(() => {});
      return;
    }

    await ensureAdMobInitialized(useTestMode);
    await AdMob.showBanner({
      adId: useTestMode ? ADMOB_IDS.testBannerId : ADMOB_IDS.realBannerId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 68,
      isTesting: useTestMode,
      npa: true,
    });
  } catch {
    // Prevent native plugin errors from interrupting learning UI
  }
}
