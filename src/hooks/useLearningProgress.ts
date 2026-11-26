import { useCallback, useEffect, useState } from 'react';
import { AgeGroup, Language, LearningProgress, SavedDrawing } from '../types/learning';

const STORAGE_KEY = 'kids_learning_world_progress_v1';

const DEFAULT_PROGRESS: LearningProgress = {
  stars: 0,
  learnedIds: [],
  quizzesCompleted: 0,
  puzzlesSolved: 0,
  gamesWon: 0,
  language: 'en',
  ageGroup: '5-7',
  voiceEnabled: true,
  sfxEnabled: true,
  speechRate: 0.9,
  testAdsEnabled: true,
  adTestMode: false,
  savedDrawings: [],
};

function loadProgress(): LearningProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<LearningProgress>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      learnedIds: Array.isArray(parsed.learnedIds) ? parsed.learnedIds : [],
      savedDrawings: Array.isArray(parsed.savedDrawings) ? parsed.savedDrawings : [],
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>(loadProgress);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  const addStars = useCallback((amount: number) => {
    setProgress((prev) => ({
      ...prev,
      stars: prev.stars + amount,
    }));
  }, []);

  const markLearned = useCallback((id: string, starReward = 1) => {
    setProgress((prev) => {
      if (prev.learnedIds.includes(id)) return prev;
      return {
        ...prev,
        stars: prev.stars + starReward,
        learnedIds: [...prev.learnedIds, id],
      };
    });
  }, []);

  const recordQuizWin = useCallback((starsEarned: number) => {
    setProgress((prev) => ({
      ...prev,
      stars: prev.stars + starsEarned,
      quizzesCompleted: prev.quizzesCompleted + 1,
    }));
  }, []);

  const recordPuzzleSolve = useCallback((starsEarned = 3) => {
    setProgress((prev) => ({
      ...prev,
      stars: prev.stars + starsEarned,
      puzzlesSolved: prev.puzzlesSolved + 1,
    }));
  }, []);

  const recordGameWin = useCallback((starsEarned = 2) => {
    setProgress((prev) => ({
      ...prev,
      stars: prev.stars + starsEarned,
      gamesWon: prev.gamesWon + 1,
    }));
  }, []);

  const setLanguage = useCallback((language: Language) => {
    setProgress((prev) => ({ ...prev, language }));
  }, []);

  const setAgeGroup = useCallback((ageGroup: AgeGroup) => {
    setProgress((prev) => ({ ...prev, ageGroup }));
  }, []);

  const setVoiceEnabled = useCallback((voiceEnabled: boolean) => {
    setProgress((prev) => ({ ...prev, voiceEnabled }));
  }, []);

  const setSfxEnabled = useCallback((sfxEnabled: boolean) => {
    setProgress((prev) => ({ ...prev, sfxEnabled }));
  }, []);

  const setSpeechRate = useCallback((speechRate: number) => {
    setProgress((prev) => ({ ...prev, speechRate }));
  }, []);

  const setTestAdsEnabled = useCallback((testAdsEnabled: boolean) => {
    setProgress((prev) => ({ ...prev, testAdsEnabled }));
  }, []);

  const setAdTestMode = useCallback((adTestMode: boolean) => {
    setProgress((prev) => ({ ...prev, adTestMode }));
  }, []);

  const saveDrawing = useCallback((drawing: SavedDrawing) => {
    setProgress((prev) => ({
      ...prev,
      stars: prev.stars + 2,
      savedDrawings: [drawing, ...prev.savedDrawings].slice(0, 12),
    }));
  }, []);

  const deleteDrawing = useCallback((id: string) => {
    setProgress((prev) => ({
      ...prev,
      savedDrawings: prev.savedDrawings.filter((d) => d.id !== id),
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  return {
    progress,
    addStars,
    markLearned,
    recordQuizWin,
    recordPuzzleSolve,
    recordGameWin,
    setLanguage,
    setAgeGroup,
    setVoiceEnabled,
    setSfxEnabled,
    setSpeechRate,
    setTestAdsEnabled,
    setAdTestMode,
    saveDrawing,
    deleteDrawing,
    resetProgress,
  };
}
