import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Download, Eraser, Paintbrush, Save, Trash2, Undo2 } from 'lucide-react';
import { Language, SavedDrawing } from '../../types/learning';
import { playCelebrate, playPop, speakText } from '../../utils/audio';
import { SectionHeader } from '../common/ToyUI';

interface DrawingColoringGameProps {
  language: Language;
  stars: number;
  savedDrawings: SavedDrawing[];
  voiceEnabled: boolean;
  sfxEnabled: boolean;
  speechRate: number;
  onSaveDrawing: (drawing: SavedDrawing) => void;
  onDeleteDrawing: (id: string) => void;
  onBack: () => void;
}

const PALETTE = [
  '#EF4444', // Red
  '#F97316', // Orange
  '#FACC15', // Yellow
  '#22C55E', // Green
  '#0EA5E9', // Sky Blue
  '#2563EB', // Royal Blue
  '#6366F1', // Indigo
  '#EC4899', // Pink
  '#92400E', // Brown
  '#1E293B', // Charcoal
  '#94A3B8', // Grey
  '#FFFFFF', // White
];

type TemplateId = 'free' | 'lion' | 'rocket' | 'apple' | 'butterfly';

const TEMPLATES: { id: TemplateId; en: string; hi: string; emoji: string }[] = [
  { id: 'free', en: 'Free Draw', hi: 'खुला चित्र', emoji: '✏️' },
  { id: 'apple', en: 'Apple', hi: 'सेब', emoji: '🍎' },
  { id: 'rocket', en: 'Rocket', hi: 'रॉकेट', emoji: '🚀' },
  { id: 'butterfly', en: 'Butterfly', hi: 'तितली', emoji: '🦋' },
  { id: 'lion', en: 'Smiling Sun', hi: 'मुस्कुराता सूरज', emoji: '☀️' },
];

function drawTemplateOutline(ctx: CanvasRenderingContext2D, template: TemplateId, w: number, h: number) {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, w, h);
  if (template === 'free') return;

  ctx.save();
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const cx = w / 2;
  const cy = h / 2;

  if (template === 'apple') {
    ctx.beginPath();
    ctx.moveTo(cx, cy - 55);
    ctx.bezierCurveTo(cx + 85, cy - 85, cx + 115, cy + 40, cx + 25, cy + 90);
    ctx.bezierCurveTo(cx + 5, cy + 95, cx - 5, cy + 95, cx - 25, cy + 90);
    ctx.bezierCurveTo(cx - 115, cy + 40, cx - 85, cy - 85, cx, cy - 55);
    ctx.stroke();
    // Stem + leaf
    ctx.beginPath();
    ctx.moveTo(cx, cy - 55);
    ctx.quadraticCurveTo(cx + 6, cy - 95, cx + 22, cy - 105);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx + 32, cy - 82, 26, 13, -0.4, 0, Math.PI * 2);
    ctx.stroke();
  } else if (template === 'rocket') {
    ctx.beginPath();
    ctx.moveTo(cx, cy - 115);
    ctx.quadraticCurveTo(cx + 58, cy - 45, cx + 48, cy + 65);
    ctx.lineTo(cx - 48, cy + 65);
    ctx.quadraticCurveTo(cx - 58, cy - 45, cx, cy - 115);
    ctx.stroke();
    // Window
    ctx.beginPath();
    ctx.arc(cx, cy - 20, 26, 0, Math.PI * 2);
    ctx.stroke();
    // Fins
    ctx.beginPath();
    ctx.moveTo(cx - 48, cy + 25);
    ctx.lineTo(cx - 86, cy + 82);
    ctx.lineTo(cx - 46, cy + 65);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 48, cy + 25);
    ctx.lineTo(cx + 86, cy + 82);
    ctx.lineTo(cx + 46, cy + 65);
    ctx.stroke();
  } else if (template === 'butterfly') {
    // Body
    ctx.beginPath();
    ctx.ellipse(cx, cy, 14, 72, 0, 0, Math.PI * 2);
    ctx.stroke();
    // Top wings
    ctx.beginPath();
    ctx.ellipse(cx - 58, cy - 34, 52, 40, -0.35, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx + 58, cy - 34, 52, 40, 0.35, 0, Math.PI * 2);
    ctx.stroke();
    // Bottom wings
    ctx.beginPath();
    ctx.ellipse(cx - 46, cy + 44, 38, 32, 0.35, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx + 46, cy + 44, 38, 32, -0.35, 0, Math.PI * 2);
    ctx.stroke();
    // Antennae
    ctx.beginPath();
    ctx.moveTo(cx - 5, cy - 72);
    ctx.quadraticCurveTo(cx - 24, cy - 108, cx - 34, cy - 100);
    ctx.moveTo(cx + 5, cy - 72);
    ctx.quadraticCurveTo(cx + 24, cy - 108, cx + 34, cy - 100);
    ctx.stroke();
  } else if (template === 'lion') {
    ctx.beginPath();
    ctx.arc(cx, cy, 70, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < 12; i++) {
      const ang = (i * Math.PI * 2) / 12;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * 82, cy + Math.sin(ang) * 82);
      ctx.lineTo(cx + Math.cos(ang) * 112, cy + Math.sin(ang) * 112);
      ctx.stroke();
    }
    // Eyes & Smile
    ctx.beginPath();
    ctx.arc(cx - 24, cy - 14, 7, 0, Math.PI * 2);
    ctx.arc(cx + 24, cy - 14, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#1E293B';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy + 6, 30, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}

export const DrawingColoringGame: React.FC<DrawingColoringGameProps> = ({
  language,
  stars,
  savedDrawings,
  voiceEnabled,
  sfxEnabled,
  speechRate,
  onSaveDrawing,
  onDeleteDrawing,
  onBack,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [template, setTemplate] = useState<TemplateId>('apple');
  const [color, setColor] = useState('#EF4444');
  const [brushSize, setBrushSize] = useState(12);
  const [isEraser, setIsEraser] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [savedNotice, setSavedNotice] = useState(false);

  const initCanvas = useCallback((tmpl: TemplateId) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawTemplateOutline(ctx, tmpl, canvas.width, canvas.height);
    setHistory([canvas.toDataURL('image/png')]);
  }, []);

  useEffect(() => {
    initCanvas(template);
  }, [template, initCanvas]);

  const getPointerPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.setPointerCapture(e.pointerId);
    const { x, y } = getPointerPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? '#FFFFFF' : color;
    ctx.lineWidth = isEraser ? brushSize * 1.8 : brushSize;
    ctx.lineTo(x + 0.1, y + 0.1);
    ctx.stroke();
    setIsDrawing(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPointerPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHistory((prev) => [...prev.slice(-14), canvas.toDataURL('image/png')]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    playPop(sfxEnabled);
    const prevSnapshot = history[history.length - 2];
    const nextHistory = history.slice(0, -1);
    setHistory(nextHistory);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = prevSnapshot;
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const title = TEMPLATES.find((t) => t.id === template)?.en || 'My Art';
    onSaveDrawing({
      id: `art_${Date.now()}`,
      title,
      dataUrl,
      createdAt: Date.now(),
    });
    playCelebrate(sfxEnabled);
    speakText(
      language === 'hi' ? 'वाह! आपका चित्र सेव हो गया!' : 'Awesome! Your drawing is saved!',
      language,
      voiceEnabled,
      speechRate
    );
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    playPop(sfxEnabled);
    const link = document.createElement('a');
    link.download = `kids-learning-world-${template}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeader
        titleEn="Drawing & Coloring Studio"
        titleHi="चित्रकारी और रंग भरें"
        subtitleEn="Pick a coloring page or draw freely with bright crayon colors"
        subtitleHi="चित्र चुनें या अपनी पसंद से रंग भरें और कला बनाएँ"
        language={language}
        stars={stars}
        accentBg="bg-pink-500"
        onBack={onBack}
      />

      {/* Template Selector */}
      <div className="mb-4 flex flex-wrap gap-2">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              playPop(sfxEnabled);
              setTemplate(t.id);
            }}
            className={`toy-btn-3d min-h-[44px] rounded-2xl border-2 border-b-4 px-4 py-2 text-sm font-extrabold whitespace-nowrap ${
              template === t.id
                ? 'border-pink-700 bg-pink-500 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t.emoji} {language === 'hi' ? t.hi : t.en}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Canvas */}
        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-3xl border-4 border-pink-200 bg-white p-2 shadow-sm">
            <canvas
              ref={canvasRef}
              width={640}
              height={460}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="aspect-[640/460] w-full cursor-crosshair touch-none rounded-2xl border border-slate-200 bg-white"
            />
          </div>
        </div>

        {/* Crayon & Tool Controls */}
        <div className="lg:col-span-4">
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-xs">
            <h3 className="font-display text-base font-extrabold text-slate-900">
              {language === 'hi' ? 'रंग चुनें' : 'Crayon Colors'}
            </h3>
            <div className="mt-3 grid grid-cols-6 gap-2">
              {PALETTE.map((hex) => {
                const active = !isEraser && color === hex;
                return (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => {
                      playPop(sfxEnabled);
                      setColor(hex);
                      setIsEraser(false);
                    }}
                    style={{ backgroundColor: hex }}
                    className={`h-11 w-full rounded-xl border-2 transition-transform ${
                      active ? 'scale-110 border-slate-900 ring-2 ring-sky-400' : 'border-slate-300'
                    }`}
                    aria-label={`Color ${hex}`}
                  />
                );
              })}
            </div>

            <h3 className="font-display mt-5 text-base font-extrabold text-slate-900">
              {language === 'hi' ? 'ब्रश का आकार' : 'Brush Size'}
            </h3>
            <div className="mt-2.5 flex items-center gap-2">
              {[6, 12, 22].map((sz, idx) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => {
                    playPop(sfxEnabled);
                    setBrushSize(sz);
                    setIsEraser(false);
                  }}
                  className={`toy-btn-3d flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl border-2 border-b-4 text-xs font-extrabold ${
                    !isEraser && brushSize === sz
                      ? 'border-sky-600 bg-sky-500 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <Paintbrush className="h-3.5 w-3.5" />
                  <span>{idx === 0 ? 'Small' : idx === 1 ? 'Medium' : 'Big'}</span>
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  playPop(sfxEnabled);
                  setIsEraser((e) => !e);
                }}
                className={`toy-btn-3d flex min-h-[46px] items-center justify-center gap-1.5 rounded-2xl border-2 border-b-4 text-sm font-extrabold ${
                  isEraser
                    ? 'border-amber-600 bg-amber-400 text-slate-900'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <Eraser className="h-4 w-4" />
                <span>{language === 'hi' ? 'रबड़' : 'Eraser'}</span>
              </button>

              <button
                type="button"
                onClick={handleUndo}
                className="toy-btn-3d flex min-h-[46px] items-center justify-center gap-1.5 rounded-2xl border-2 border-slate-200 border-b-4 bg-slate-50 text-sm font-extrabold text-slate-700"
              >
                <Undo2 className="h-4 w-4" />
                <span>{language === 'hi' ? 'पीछे' : 'Undo'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playPop(sfxEnabled);
                  initCanvas(template);
                }}
                className="toy-btn-3d flex min-h-[46px] items-center justify-center gap-1.5 rounded-2xl border-2 border-rose-200 border-b-4 bg-rose-50 text-sm font-extrabold text-rose-700"
              >
                <Trash2 className="h-4 w-4" />
                <span>{language === 'hi' ? 'साफ़ करें' : 'Clear'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="toy-btn-3d flex min-h-[46px] items-center justify-center gap-1.5 rounded-2xl border-2 border-sky-200 border-b-4 bg-sky-50 text-sm font-extrabold text-sky-800"
              >
                <Download className="h-4 w-4" />
                <span>{language === 'hi' ? 'डाउनलोड' : 'Export'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="toy-btn-3d mt-4 flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-emerald-700 border-b-4 bg-emerald-500 text-sm font-extrabold text-white hover:bg-emerald-600"
            >
              <Save className="h-5 w-5" />
              <span>
                {savedNotice
                  ? language === 'hi'
                    ? 'सेव हो गया! (+2 स्टार)'
                    : 'Saved! (+2 Stars)'
                  : language === 'hi'
                    ? 'गैलरी में सेव करें'
                    : 'Save to Art Gallery'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Saved Local Drawings Gallery */}
      {savedDrawings.length > 0 && (
        <div className="mt-8 rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-xs">
          <h3 className="font-display text-lg font-extrabold text-slate-900">
            {language === 'hi' ? 'मेरी कला गैलरी' : 'My Saved Art Gallery'}
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {savedDrawings.map((art) => (
              <div key={art.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <img
                  src={art.dataUrl}
                  alt={art.title}
                  className="aspect-[640/460] w-full rounded-xl bg-white object-cover"
                />
                <div className="mt-2 flex items-center justify-between gap-2 px-1">
                  <span className="truncate text-xs font-bold text-slate-700">{art.title}</span>
                  <button
                    type="button"
                    onClick={() => onDeleteDrawing(art.id)}
                    className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    aria-label="Delete drawing"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
