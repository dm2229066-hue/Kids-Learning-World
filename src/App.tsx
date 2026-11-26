import { useState } from 'react';
import { Award, BookOpen, Home, Lock, Palette } from 'lucide-react';
import { HomeView } from './components/HomeView';
import { TestAdBanner, TestInterstitialModal } from './components/common/TestAdBanner';
import { OfflineIndicator } from './components/common/ToyUI';
import { AlphabetModule } from './components/modules/AlphabetModule';
import { AnimalsBirdsModule } from './components/modules/AnimalsBirdsModule';
import { ColorsShapesModule } from './components/modules/ColorsShapesModule';
import { DrawingColoringGame } from './components/modules/DrawingColoringGame';
import { FruitsVegModule } from './components/modules/FruitsVegModule';
import { HindiVarnamalaModule } from './components/modules/HindiVarnamalaModule';
import { MathModule } from './components/modules/MathModule';
import { MemoryGame } from './components/modules/MemoryGame';
import { NumbersModule } from './components/modules/NumbersModule';
import { PicturePuzzleGame } from './components/modules/PicturePuzzleGame';
import { QuizRewardsModule } from './components/modules/QuizRewardsModule';
import { SpellingGame } from './components/modules/SpellingGame';
import { ParentGateModal } from './components/parent/ParentGateModal';
import { ParentSettingsView } from './components/parent/ParentSettingsView';
import { useLearningProgress } from './hooks/useLearningProgress';
import { ModuleId } from './types/learning';
import { playPop } from './utils/audio';

export default function App() {
  const {
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
  } = useLearningProgress();

  const [activeModule, setActiveModule] = useState<ModuleId>('home');
  const [parentGateOpen, setParentGateOpen] = useState(false);
  const [parentMode, setParentMode] = useState(false);
  const [interstitialOpen, setInterstitialOpen] = useState(false);

  const lang = progress.language;

  const navigateTo = (id: ModuleId) => {
    playPop(progress.sfxEnabled);
    setParentMode(false);
    setActiveModule(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollHomeSection = (sectionId: string) => {
    playPop(progress.sfxEnabled);
    setParentMode(false);
    setActiveModule('home');
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <div className="min-h-screen bg-[#F6FAFF] text-slate-900">
      {/* Top Bar: 3-zone contract on desktop, clean non-sticky bar on mobile */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md md:sticky md:top-0 md:z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
          {/* Zone 1: Single-line Brand Title */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="font-display text-lg font-extrabold tracking-tight text-sky-700 hover:text-sky-600 whitespace-nowrap shrink-0 sm:text-xl"
          >
            Kids Learning World
          </button>

          {/* Zone 2: 4 Concise Nav Links */}
          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="hover:text-sky-600 hover:underline whitespace-nowrap shrink-0"
            >
              {lang === 'hi' ? 'होम' : 'Home'}
            </button>
            <button
              type="button"
              onClick={() => scrollHomeSection('learn-section')}
              className="hover:text-sky-600 hover:underline whitespace-nowrap shrink-0"
            >
              {lang === 'hi' ? 'सीखें' : 'Learn'}
            </button>
            <button
              type="button"
              onClick={() => scrollHomeSection('games-section')}
              className="hover:text-sky-600 hover:underline whitespace-nowrap shrink-0"
            >
              {lang === 'hi' ? 'खेल' : 'Games'}
            </button>
            <button
              type="button"
              onClick={() => navigateTo('quiz')}
              className="hover:text-sky-600 hover:underline whitespace-nowrap shrink-0"
            >
              {lang === 'hi' ? 'पुरस्कार' : 'Rewards'}
            </button>
          </nav>

          {/* Zone 3: Single Primary Action (Parent Gate) */}
          <button
            type="button"
            onClick={() => {
              playPop(progress.sfxEnabled);
              if (parentMode) {
                setParentMode(false);
              } else {
                setParentGateOpen(true);
              }
            }}
            className="toy-btn-3d flex min-h-[42px] items-center gap-1.5 rounded-2xl border-2 border-slate-300 border-b-4 bg-slate-100 px-3.5 py-1.5 text-xs font-extrabold text-slate-800 hover:bg-slate-200 whitespace-nowrap shrink-0"
          >
            <Lock className="h-4 w-4 text-slate-600" />
            <span>
              {parentMode
                ? lang === 'hi'
                  ? 'बच्चों का मोड'
                  : 'Kids Mode'
                : lang === 'hi'
                  ? 'माता-पिता'
                  : 'Parent Zone'}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-5 pb-24 sm:px-6 md:pb-12">
        {parentMode ? (
          <ParentSettingsView
            progress={progress}
            onSetLanguage={setLanguage}
            onSetAgeGroup={setAgeGroup}
            onSetVoiceEnabled={setVoiceEnabled}
            onSetSfxEnabled={setSfxEnabled}
            onSetSpeechRate={setSpeechRate}
            onSetTestAdsEnabled={setTestAdsEnabled}
            onSetAdTestMode={setAdTestMode}
            onPreviewInterstitial={() => setInterstitialOpen(true)}
            onResetProgress={resetProgress}
            onBack={() => setParentMode(false)}
          />
        ) : activeModule === 'home' ? (
          <HomeView
            progress={progress}
            onSelectModule={navigateTo}
            onSetLanguage={setLanguage}
            onSetAgeGroup={setAgeGroup}
            onToggleVoice={setVoiceEnabled}
          />
        ) : activeModule === 'abc' ? (
          <AlphabetModule
            language={lang}
            stars={progress.stars}
            learnedIds={progress.learnedIds}
            voiceEnabled={progress.voiceEnabled}
            sfxEnabled={progress.sfxEnabled}
            speechRate={progress.speechRate}
            onMarkLearned={markLearned}
            onBack={() => navigateTo('home')}
          />
        ) : activeModule === 'hindi' ? (
          <HindiVarnamalaModule
            language={lang}
            stars={progress.stars}
            learnedIds={progress.learnedIds}
            voiceEnabled={progress.voiceEnabled}
            sfxEnabled={progress.sfxEnabled}
            speechRate={progress.speechRate}
            onMarkLearned={markLearned}
            onBack={() => navigateTo('home')}
          />
        ) : activeModule === 'numbers' ? (
          <NumbersModule
            language={lang}
            stars={progress.stars}
            learnedIds={progress.learnedIds}
            voiceEnabled={progress.voiceEnabled}
            sfxEnabled={progress.sfxEnabled}
            speechRate={progress.speechRate}
            onMarkLearned={markLearned}
            onBack={() => navigateTo('home')}
          />
        ) : activeModule === 'math' ? (
          <MathModule
            language={lang}
            ageGroup={progress.ageGroup}
            stars={progress.stars}
            voiceEnabled={progress.voiceEnabled}
            sfxEnabled={progress.sfxEnabled}
            speechRate={progress.speechRate}
            onAddStars={addStars}
            onBack={() => navigateTo('home')}
          />
        ) : activeModule === 'fruits' ? (
          <FruitsVegModule
            language={lang}
            stars={progress.stars}
            learnedIds={progress.learnedIds}
            voiceEnabled={progress.voiceEnabled}
            sfxEnabled={progress.sfxEnabled}
            speechRate={progress.speechRate}
            onMarkLearned={markLearned}
            onBack={() => navigateTo('home')}
          />
        ) : activeModule === 'animals' ? (
          <AnimalsBirdsModule
            language={lang}
            stars={progress.stars}
            learnedIds={progress.learnedIds}
            voiceEnabled={progress.voiceEnabled}
            sfxEnabled={progress.sfxEnabled}
            speechRate={progress.speechRate}
            onMarkLearned={markLearned}
            onBack={() => navigateTo('home')}
          />
        ) : activeModule === 'colors' ? (
          <ColorsShapesModule
            language={lang}
            stars={progress.stars}
            learnedIds={progress.learnedIds}
            voiceEnabled={progress.voiceEnabled}
            sfxEnabled={progress.sfxEnabled}
            speechRate={progress.speechRate}
            onMarkLearned={markLearned}
            onBack={() => navigateTo('home')}
          />
        ) : activeModule === 'spelling' ? (
          <SpellingGame
            language={lang}
            ageGroup={progress.ageGroup}
            stars={progress.stars}
            voiceEnabled={progress.voiceEnabled}
            sfxEnabled={progress.sfxEnabled}
            speechRate={progress.speechRate}
            onRecordWin={recordGameWin}
            onBack={() => navigateTo('home')}
          />
        ) : activeModule === 'memory' ? (
          <MemoryGame
            language={lang}
            stars={progress.stars}
            voiceEnabled={progress.voiceEnabled}
            sfxEnabled={progress.sfxEnabled}
            speechRate={progress.speechRate}
            onRecordWin={recordGameWin}
            onBack={() => navigateTo('home')}
          />
        ) : activeModule === 'puzzle' ? (
          <PicturePuzzleGame
            language={lang}
            stars={progress.stars}
            voiceEnabled={progress.voiceEnabled}
            sfxEnabled={progress.sfxEnabled}
            speechRate={progress.speechRate}
            onRecordSolve={recordPuzzleSolve}
            onBack={() => navigateTo('home')}
          />
        ) : activeModule === 'drawing' ? (
          <DrawingColoringGame
            language={lang}
            stars={progress.stars}
            savedDrawings={progress.savedDrawings}
            voiceEnabled={progress.voiceEnabled}
            sfxEnabled={progress.sfxEnabled}
            speechRate={progress.speechRate}
            onSaveDrawing={saveDrawing}
            onDeleteDrawing={deleteDrawing}
            onBack={() => navigateTo('home')}
          />
        ) : (
          <QuizRewardsModule
            language={lang}
            stars={progress.stars}
            quizzesCompleted={progress.quizzesCompleted}
            voiceEnabled={progress.voiceEnabled}
            sfxEnabled={progress.sfxEnabled}
            speechRate={progress.speechRate}
            onRecordQuizWin={recordQuizWin}
            onBack={() => navigateTo('home')}
          />
        )}

        <TestAdBanner
          enabled={progress.testAdsEnabled && !parentMode}
          useTestMode={progress.adTestMode}
          language={lang}
          sfxEnabled={progress.sfxEnabled}
        />
      </main>

      {/* Mobile Bottom Thumb-Zone Tab Bar (single sticky bar < 10% viewport height) */}
      <nav
        aria-label="Mobile navigation"
        className="fixed right-0 bottom-0 left-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md md:hidden"
      >
        <div className="grid h-16 grid-cols-4 items-center pb-safe">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className={`flex min-h-[44px] flex-col items-center justify-center ${
              !parentMode && activeModule === 'home' ? 'text-sky-600' : 'text-slate-500'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="mt-0.5 text-[11px] font-extrabold">
              {lang === 'hi' ? 'होम' : 'Home'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('abc')}
            className={`flex min-h-[44px] flex-col items-center justify-center ${
              !parentMode && (activeModule === 'abc' || activeModule === 'hindi' || activeModule === 'numbers')
                ? 'text-rose-600'
                : 'text-slate-500'
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span className="mt-0.5 text-[11px] font-extrabold">
              {lang === 'hi' ? 'सीखें' : 'ABCD'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('drawing')}
            className={`flex min-h-[44px] flex-col items-center justify-center ${
              !parentMode && activeModule === 'drawing' ? 'text-pink-600' : 'text-slate-500'
            }`}
          >
            <Palette className="h-5 w-5" />
            <span className="mt-0.5 text-[11px] font-extrabold">
              {lang === 'hi' ? 'कला' : 'Draw'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('quiz')}
            className={`flex min-h-[44px] flex-col items-center justify-center ${
              !parentMode && activeModule === 'quiz' ? 'text-amber-600' : 'text-slate-500'
            }`}
          >
            <Award className="h-5 w-5" />
            <span className="mt-0.5 text-[11px] font-extrabold">
              {lang === 'hi' ? 'स्टार' : 'Quiz'}
            </span>
          </button>
        </div>
      </nav>

      {/* Parent Verification Gate */}
      <ParentGateModal
        open={parentGateOpen}
        language={lang}
        sfxEnabled={progress.sfxEnabled}
        onSuccess={() => {
          setParentGateOpen(false);
          setParentMode(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onClose={() => setParentGateOpen(false)}
      />

      {/* Test Interstitial Ad Preview Modal */}
      <TestInterstitialModal
        open={interstitialOpen}
        language={lang}
        sfxEnabled={progress.sfxEnabled}
        onClose={() => setInterstitialOpen(false)}
      />

      {/* Offline Mode Indicator */}
      <OfflineIndicator language={lang} />
    </div>
  );
}
