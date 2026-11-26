export type Language = 'en' | 'hi';

export type AgeGroup = '2-4' | '5-7' | '8-10';

export type ModuleId =
  | 'home'
  | 'abc'
  | 'hindi'
  | 'numbers'
  | 'math'
  | 'fruits'
  | 'animals'
  | 'colors'
  | 'spelling'
  | 'memory'
  | 'puzzle'
  | 'drawing'
  | 'quiz';

export interface SavedDrawing {
  id: string;
  title: string;
  dataUrl: string;
  createdAt: number;
}

export interface LearningProgress {
  stars: number;
  learnedIds: string[];
  quizzesCompleted: number;
  puzzlesSolved: number;
  gamesWon: number;
  language: Language;
  ageGroup: AgeGroup;
  voiceEnabled: boolean;
  sfxEnabled: boolean;
  speechRate: number;
  testAdsEnabled: boolean;
  adTestMode: boolean;
  savedDrawings: SavedDrawing[];
}
