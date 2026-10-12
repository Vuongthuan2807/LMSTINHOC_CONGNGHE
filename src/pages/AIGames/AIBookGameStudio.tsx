import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  Bot,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Star,
  Layers,
  CheckSquare,
  ListOrdered,
  FileQuestion,
  Bookmark,
  Save,
  Image as ImageIcon,
  Loader2,
  Monitor,
  Wrench,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { AIGameSet, GeneratedGame, SingleChoiceGame, MultiChoiceGame, FillInBlankGame, TrueFalseGame, MatchingGame } from '../../types/aiGame';
import { MatchingBoard } from '../../components/games/MatchingBoard';
import { soundService } from '../../services/sound';
import { fireFireworks, fireStars } from '../../services/confetti';
import { GradeLevel, SubjectType, Question } from '../../types';

// Sample book pages for 1-click test
const SAMPLE_BOOK_SNIPPETS = [
  {
    id: 'sample_th4_b1',
    title: 'Tin học 4 - Bài 1: Phần cứng và phần mềm máy tính',
    subject: 'tinhoc' as SubjectType,
    grade: 4 as GradeLevel,
    desc: 'Trang 18-20 SGK Kết nối tri thức về các thiết bị phần cứng, phần mềm và an toàn máy tính.',
    svgBadge: '🖥️💻',
  },
  {
    id: 'sample_cn5_b1',
    title: 'Công nghệ 5 - Bài 1: Vai trò của công nghệ',
    subject: 'congnghe' as SubjectType,
    grade: 5 as GradeLevel,
    desc: 'Trang 18-21 SGK về sản phẩm công nghệ trong gia đình, năng suất lao động và mặt trái công nghệ.',
    svgBadge: '🚀🔌',
  },
  {
    id: 'sample_th5_b10',
    title: 'Tin học 5 - Bài 10: Cấu trúc tuần tự trong Scratch',
    subject: 'tinhoc' as SubjectType,
    grade: 5 as GradeLevel,
    desc: 'Trang 52-54 SGK về cấu trúc tuần tự, điều khiển chú mèo Scratch di chuyển và chào hỏi.',
    svgBadge: '🐱🧩',
  },
  {
    id: 'sample_cn3_b2',
    title: 'Công nghệ 3 - Bài 2: Sử dụng đèn học an toàn',
    subject: 'congnghe' as SubjectType,
    grade: 3 as GradeLevel,
    desc: 'Trang 8-10 VBT về các bộ phận của đèn học, chao đèn, công tắc và an toàn điện.',
    svgBadge: '💡🛡️',
  },
];

export const AIBookGameStudio: React.FC = () => {
  const { addStars, addQuestion } = useAppStore();

  // Photo state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(4);
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>('tinhoc');
  const [customNote, setCustomNote] = useState('');

  // Generation state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedGameSet, setGeneratedGameSet] = useState<AIGameSet | null>(null);

  // Active game play state
  const [activeGameIndex, setActiveGameIndex] = useState(0);
  const [userSingleChoice, setUserSingleChoice] = useState<string>('');
  const [userMultiChoices, setUserMultiChoices] = useState<string[]>([]);
  const [userFillBlank, setUserFillBlank] = useState<string>('');
  const [userTrueFalse, setUserTrueFalse] = useState<boolean | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(false);
  const [savedToBank, setSavedToBank] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // File Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setGeneratedGameSet(null);
      setErrorMessage(null);
      soundService.playClick();
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSampleSnippet = (snippet: typeof SAMPLE_BOOK_SNIPPETS[0]) => {
    soundService.playClick();
    setSelectedGrade(snippet.grade);
    setSelectedSubject(snippet.subject);

    // Create a clean illustrative canvas image of the sample page
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = snippet.subject === 'tinhoc' ? '#0284C7' : '#059669';
      ctx.fillRect(0, 0, 600, 400);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 26px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(snippet.title, 300, 160);

      ctx.font = '16px sans-serif';
      ctx.fillText(snippet.desc, 300, 210);

      ctx.font = '50px sans-serif';
      ctx.fillText(snippet.svgBadge, 300, 280);

      setImagePreview(canvas.toDataURL('image/jpeg'));
      setGeneratedGameSet(null);
      setErrorMessage(null);
    }
  };

  // Trigger AI Game Generation
  const handleGenerateGames = async () => {
    if (!imagePreview) {
      alert('Vui lòng chụp ảnh hoặc tải lên hình ảnh trang sách trước!');
      return;
    }

    soundService.playClick();
    setIsLoading(true);
    setErrorMessage(null);
    setGeneratedGameSet(null);

    try {
      const response = await fetch('/api/ai/generate-games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType: 'image/jpeg',
          grade: selectedGrade,
          subject: selectedSubject,
          customInstructions: customNote,
        }),
      });

      if (!response.ok) {
        throw new Error(`Lỗi máy chủ: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.games && data.games.length > 0) {
        setGeneratedGameSet(data);
        setActiveGameIndex(0);
        resetCurrentGameState();
        soundService.playFanfare();
        fireFireworks();
      } else {
        throw new Error('AI không thể nhận diện nội dung từ ảnh. Vui lòng thử lại với ảnh rõ nét hơn!');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Không thể tạo trò chơi lúc này. Vui lòng thử lại!');
      soundService.playWrong();
    } finally {
      setIsLoading(false);
    }
  };

  const resetCurrentGameState = () => {
    setUserSingleChoice('');
    setUserMultiChoices([]);
    setUserFillBlank('');
    setUserTrueFalse(null);
    setIsAnswerChecked(false);
    setIsCurrentCorrect(false);
  };

  const handleNextGame = () => {
    if (!generatedGameSet) return;
    soundService.playClick();
    resetCurrentGameState();
    if (activeGameIndex < generatedGameSet.games.length - 1) {
      setActiveGameIndex(activeGameIndex + 1);
    } else {
      setActiveGameIndex(0);
    }
  };

  // Evaluation for Current Game
  const handleCheckAnswer = () => {
    if (!generatedGameSet) return;
    const currentGame = generatedGameSet.games[activeGameIndex];
    if (!currentGame) return;

    soundService.playClick();
    let isRight = false;

    if (currentGame.type === 'single_choice') {
      isRight = userSingleChoice === currentGame.correctAnswer;
    } else if (currentGame.type === 'multiple_choice_multi') {
      const sortedUser = [...userMultiChoices].sort().join(',');
      const sortedCorrect = [...currentGame.correctAnswers].sort().join(',');
      isRight = sortedUser === sortedCorrect;
    } else if (currentGame.type === 'fill_in_blank') {
      isRight = userFillBlank.trim().toLowerCase() === currentGame.correctWord.trim().toLowerCase();
    } else if (currentGame.type === 'true_false') {
      isRight = userTrueFalse === currentGame.isTrue;
    }

    setIsCurrentCorrect(isRight);
    setIsAnswerChecked(true);

    if (isRight) {
      soundService.playCorrect();
      fireStars();
      addStars(10);
    } else {
      soundService.playWrong();
    }
  };

  // Save generated questions to question bank
  const handleSaveToQuestionBank = () => {
    if (!generatedGameSet) return;

    generatedGameSet.games.forEach((g) => {
      if (g.type === 'single_choice') {
        const q: Question = {
          id: `ai_q_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          code: `AI_TH${selectedGrade}_${Date.now().toString().slice(-4)}`,
          subject: selectedSubject,
          grade: selectedGrade,
          topic: generatedGameSet.bookTopic || 'AI Quét Sách',
          lessonTitle: generatedGameSet.bookTopic || 'Bài học từ ảnh sách',
          questionText: g.question,
          type: 'multiple_choice',
          options: g.options,
          correctAnswer: g.correctAnswer,
          explanation: g.explanation,
          difficulty: 'thong_hieu',
          points: 1,
          createdAt: new Date().toISOString(),
        };
        addQuestion(q);
      } else if (g.type === 'true_false') {
        const q: Question = {
          id: `ai_q_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          code: `AI_TF${selectedGrade}_${Date.now().toString().slice(-4)}`,
          subject: selectedSubject,
          grade: selectedGrade,
          topic: generatedGameSet.bookTopic || 'AI Quét Sách',
          lessonTitle: generatedGameSet.bookTopic || 'Bài học từ ảnh sách',
          questionText: g.statement,
          type: 'true_false',
          options: ['Đúng', 'Sai'],
          correctAnswer: g.isTrue ? 'Đúng' : 'Sai',
          explanation: g.explanation,
          difficulty: 'nhan_biet',
          points: 1,
          createdAt: new Date().toISOString(),
        };
        addQuestion(q);
      }
    });

    setSavedToBank(true);
    soundService.playFanfare();
    alert('Đã lưu thành công các câu hỏi vào Ngân Hàng Câu Hỏi trong hệ thống!');
  };

  const currentGame = generatedGameSet?.games[activeGameIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-purple-500/15 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black border border-white/20">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span>Trí Tuệ Nhân Tạo AI Tạo Trò Chơi Giáo Dục</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          Chụp Hình Trang Sách ➜ AI Tạo Bộ Trò Chơi Đa Thể Loại 📸
        </h1>

        <p className="text-purple-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Thầy cô hoặc học sinh chỉ cần chụp trang sách giáo khoa, sách giáo viên hoặc vở bài tập. 
          AI sẽ tự động đọc hiểu và tạo ra ngay 5 thể loại trò chơi: <b>Trắc nghiệm 1 đáp án, Trắc nghiệm nhiều đáp án, Điền chỗ trống, Đúng/Sai, và Nối cột A với cột B</b>!
        </p>
      </div>

      {/* 2. Photo Upload & Configuration Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Camera / File Input Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Camera className="w-5 h-5 text-sky-600" />
            <span>1. Chụp Ảnh Hoặc Tải Lên Trang Sách</span>
          </h2>

          {/* Action Buttons: Camera vs File Upload */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="py-3.5 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 active:scale-95 transition-all"
            >
              <Camera className="w-4 h-4" />
              <span>Chụp Ảnh Bằng Camera</span>
            </button>
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="py-3.5 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-600/20 active:scale-95 transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Tải Ảnh Từ Thiết Bị</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Image Preview Window */}
          <div className="h-64 sm:h-80 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden relative group">
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Trang sách đã chụp"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black text-white text-xs font-bold transition-all"
                >
                  Xóa ảnh này
                </button>
              </>
            ) : (
              <div className="text-center p-6 space-y-2 text-slate-400">
                <ImageIcon className="w-12 h-12 mx-auto text-slate-300" />
                <p className="text-xs sm:text-sm font-bold text-slate-500">
                  Chưa có ảnh trang sách nào được chọn
                </p>
                <p className="text-[11px] text-slate-400">
                  Bấm nút Chụp ảnh hoặc chọn 1 trang sách mẫu bên dưới để thử nghiệm tức thì
                </p>
              </div>
            )}
          </div>

          {/* Quick Sample Pages Pickers */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-black text-slate-500 block">
              💡 Hoặc chọn nhanh trang sách mẫu chuẩn GDPT 2018:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_BOOK_SNIPPETS.map((snip) => (
                <button
                  key={snip.id}
                  onClick={() => handleSelectSampleSnippet(snip)}
                  className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 text-left text-xs transition-colors"
                >
                  <div className="font-black text-slate-800 line-clamp-1">{snip.title}</div>
                  <div className="text-[10px] text-slate-500 line-clamp-1">{snip.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Settings & Trigger (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            <span>2. Cấu Hình Bộ Trò Chơi AI</span>
          </h2>

          {/* Subject & Grade Picker */}
          <div className="space-y-4 text-xs font-bold text-slate-700">
            <div>
              <label className="block text-slate-500 mb-1.5">Môn học</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedSubject('tinhoc')}
                  className={`py-2 px-3 rounded-xl border font-black flex items-center justify-center gap-1.5 ${
                    selectedSubject === 'tinhoc'
                      ? 'bg-sky-500 text-white border-sky-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>Tin Học</span>
                </button>
                <button
                  onClick={() => setSelectedSubject('congnghe')}
                  className={`py-2 px-3 rounded-xl border font-black flex items-center justify-center gap-1.5 ${
                    selectedSubject === 'congnghe'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <Wrench className="w-4 h-4" />
                  <span>Công Nghệ</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-500 mb-1.5">Khối lớp</label>
              <div className="flex gap-1.5">
                {([1, 2, 3, 4, 5] as GradeLevel[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className={`flex-1 py-1.5 rounded-xl border font-black ${
                      selectedGrade === g
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    Lớp {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Included Game Types Indicators */}
            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1.5 text-purple-950">
              <span className="text-[11px] font-black uppercase tracking-wider block text-purple-800">
                Các thể loại AI sẽ tự động tạo:
              </span>
              <ul className="text-[11px] font-bold space-y-1">
                <li className="flex items-center gap-1.5">✓ 1. Trắc nghiệm 1 đáp án đúng</li>
                <li className="flex items-center gap-1.5">✓ 2. Trắc nghiệm nhiều đáp án đúng</li>
                <li className="flex items-center gap-1.5">✓ 3. Điền vào chỗ trống</li>
                <li className="flex items-center gap-1.5">✓ 4. Đúng hoặc Sai</li>
                <li className="flex items-center gap-1.5">✓ 5. Nối cột A với cột B</li>
              </ul>
            </div>

            {/* Custom Teacher Note */}
            <div>
              <label className="block text-slate-500 mb-1">Ghi chú thêm cho AI (nếu có)</label>
              <input
                type="text"
                placeholder="Ví dụ: Tập trung vào các quy tắc an toàn..."
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            disabled={!imagePreview || isLoading}
            onClick={handleGenerateGames}
            className={`w-full py-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all ${
              imagePreview && !isLoading
                ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white hover:scale-102 active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>AI Đang Phân Tích & Sáng Tạo Trò Chơi...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>AI Phân Tích & Tạo Trò Chơi Ngay 🪄</span>
              </>
            )}
          </button>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
              {errorMessage}
            </div>
          )}
        </div>

      </div>

      {/* ==============================================================
          3. INTERACTIVE GAME HUB (PLAYABLE CREATED GAME SET)
          ============================================================== */}
      {generatedGameSet && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-purple-200 shadow-xl space-y-8 animate-fade-in">
          
          {/* Top Game Set Meta Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>AI Đã Tạo Thành Công {generatedGameSet.games.length} Trò Chơi!</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                {generatedGameSet.bookTopic}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {generatedGameSet.summary}
              </p>
            </div>

            <button
              onClick={handleSaveToQuestionBank}
              disabled={savedToBank}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs shadow-md transition-all shrink-0"
            >
              <Save className="w-4 h-4" />
              <span>{savedToBank ? 'Đã Lưu Vào Ngân Hàng ✓' : 'Lưu Vào Ngân Hàng Câu Hỏi'}</span>
            </button>
          </div>

          {/* Stepper Tabs across Game Types */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {generatedGameSet.games.map((g, idx) => {
              const isActive = activeGameIndex === idx;
              let label = 'Trò chơi';
              if (g.type === 'single_choice') label = '1. Trắc nghiệm (1 đáp án)';
              else if (g.type === 'multiple_choice_multi') label = '2. Trắc nghiệm (nhiều đáp án)';
              else if (g.type === 'fill_in_blank') label = '3. Điền chỗ trống';
              else if (g.type === 'true_false') label = '4. Đúng hay Sai';
              else if (g.type === 'matching') label = '5. Nối cột A-B';

              return (
                <button
                  key={g.id || idx}
                  onClick={() => {
                    soundService.playClick();
                    setActiveGameIndex(idx);
                    resetCurrentGameState();
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20 scale-102'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* CURRENT ACTIVE GAME DISPLAY */}
          {currentGame && (
            <div className="space-y-6 bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-slate-200">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-black text-purple-700 uppercase">
                  {currentGame.title}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Câu {activeGameIndex + 1} / {generatedGameSet.games.length}
                </span>
              </div>

              {/* GAME TYPE 1: TRẮC NGHIỆM 1 ĐÁP ÁN ĐÚNG */}
              {currentGame.type === 'single_choice' && (
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {currentGame.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {currentGame.options.map((opt, i) => {
                      const letter = String.fromCharCode(65 + i);
                      const isSel = userSingleChoice === letter;
                      let btnStyle = isSel ? 'bg-purple-100 border-purple-500 text-purple-950 font-black ring-2 ring-purple-300' : 'bg-white border-slate-200 text-slate-800';

                      if (isAnswerChecked) {
                        if (letter === currentGame.correctAnswer) {
                          btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black';
                        } else if (isSel && !isCurrentCorrect) {
                          btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                        }
                      }

                      return (
                        <button
                          key={i}
                          disabled={isAnswerChecked}
                          onClick={() => {
                            soundService.playClick();
                            setUserSingleChoice(letter);
                          }}
                          className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-all ${btnStyle}`}
                        >
                          <span className="w-7 h-7 rounded-xl bg-slate-100 border text-xs font-black flex items-center justify-center shrink-0">
                            {letter}
                          </span>
                          <span className="text-xs sm:text-sm font-bold mt-0.5">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* GAME TYPE 2: TRẮC NGHIỆM NHIỀU ĐÁP ÁN ĐÚNG */}
              {currentGame.type === 'multiple_choice_multi' && (
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Chọn tất cả các đáp án đúng
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-2">
                      {currentGame.question}
                    </h3>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {currentGame.options.map((opt, i) => {
                      const letter = String.fromCharCode(65 + i);
                      const isSelected = userMultiChoices.includes(letter);

                      const toggleChoice = () => {
                        if (isAnswerChecked) return;
                        soundService.playClick();
                        if (isSelected) {
                          setUserMultiChoices(userMultiChoices.filter((c) => c !== letter));
                        } else {
                          setUserMultiChoices([...userMultiChoices, letter]);
                        }
                      };

                      let btnStyle = isSelected ? 'bg-purple-100 border-purple-500 text-purple-950 font-black' : 'bg-white border-slate-200 text-slate-800';
                      if (isAnswerChecked) {
                        if (currentGame.correctAnswers.includes(letter)) {
                          btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                        }
                      }

                      return (
                        <div
                          key={i}
                          onClick={toggleChoice}
                          className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${btnStyle}`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            disabled={isAnswerChecked}
                            onChange={() => {}}
                            className="w-5 h-5 rounded-md text-purple-600 cursor-pointer"
                          />
                          <span className="w-6 text-xs font-black text-slate-500">{letter}.</span>
                          <span className="text-xs sm:text-sm font-bold flex-1">{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* GAME TYPE 3: ĐIỀN VÀO CHỖ TRỐNG */}
              {currentGame.type === 'fill_in_blank' && (
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                    {currentGame.sentence}
                  </h3>

                  <div className="space-y-3 pt-2">
                    <input
                      type="text"
                      disabled={isAnswerChecked}
                      value={userFillBlank}
                      onChange={(e) => setUserFillBlank(e.target.value)}
                      placeholder="Nhập từ cần điền vào chỗ trống..."
                      className="w-full p-4 rounded-2xl border-2 border-slate-300 font-black text-base bg-white focus:border-purple-500 focus:outline-hidden"
                    />

                    {currentGame.hints && currentGame.hints.length > 0 && !isAnswerChecked && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-xs font-bold text-slate-400">Gợi ý từ để chọn:</span>
                        {currentGame.hints.map((hint, hIdx) => (
                          <button
                            key={hIdx}
                            onClick={() => setUserFillBlank(hint)}
                            className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-bold text-purple-700 hover:bg-purple-50 transition-colors"
                          >
                            {hint}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* GAME TYPE 4: ĐÚNG HOẶC SAI */}
              {currentGame.type === 'true_false' && (
                <div className="space-y-6 text-center py-4">
                  <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-sm">
                    <p className="text-lg sm:text-xl font-black text-slate-900">
                      "{currentGame.statement}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <button
                      disabled={isAnswerChecked}
                      onClick={() => {
                        soundService.playClick();
                        setUserTrueFalse(true);
                      }}
                      className={`py-5 rounded-2xl font-black text-base flex flex-col items-center gap-1 border-2 transition-all ${
                        userTrueFalse === true
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg scale-102'
                          : 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-300'
                      }`}
                    >
                      <ThumbsUp className="w-7 h-7" />
                      <span>ĐÚNG 👍</span>
                    </button>

                    <button
                      disabled={isAnswerChecked}
                      onClick={() => {
                        soundService.playClick();
                        setUserTrueFalse(false);
                      }}
                      className={`py-5 rounded-2xl font-black text-base flex flex-col items-center gap-1 border-2 transition-all ${
                        userTrueFalse === false
                          ? 'bg-rose-500 text-white border-rose-500 shadow-lg scale-102'
                          : 'bg-white hover:bg-rose-50 text-rose-800 border-rose-300'
                      }`}
                    >
                      <ThumbsDown className="w-7 h-7" />
                      <span>SAI 👎</span>
                    </button>
                  </div>
                </div>
              )}

              {/* GAME TYPE 5: NỐI CỘT A VỚI CỘT B */}
              {currentGame.type === 'matching' && (
                <MatchingBoard
                  game={currentGame}
                  onCompleted={() => addStars(15)}
                />
              )}

              {/* FEEDBACK FOR TYPES 1-4 */}
              {currentGame.type !== 'matching' && isAnswerChecked && (
                <div
                  className={`p-5 rounded-2xl border-2 space-y-2 transition-all ${
                    isCurrentCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-black'
                      : 'bg-amber-50 border-amber-300 text-amber-950 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2 text-base">
                    {isCurrentCorrect ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                        <span>Chính xác tuyệt vời! Bé nhận được +10 Sao thưởng ⭐</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-6 h-6 text-amber-600 shrink-0" />
                        <span>Chưa đúng rồi! Cùng xem lời giải thích bên dưới nhé.</span>
                      </>
                    )}
                  </div>

                  {currentGame.explanation && (
                    <p className="text-xs sm:text-sm font-semibold pl-8 leading-relaxed">
                      <b>Giải thích:</b> {currentGame.explanation}
                    </p>
                  )}
                </div>
              )}

              {/* BOTTOM ACTIONS */}
              {currentGame.type !== 'matching' && (
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <button
                    onClick={resetCurrentGameState}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại câu này</span>
                  </button>

                  {!isAnswerChecked ? (
                    <button
                      onClick={handleCheckAnswer}
                      className="px-8 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                    >
                      Kiểm tra đáp án 🎯
                    </button>
                  ) : (
                    <button
                      onClick={handleNextGame}
                      className="flex items-center gap-1.5 px-8 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                    >
                      <span>Câu tiếp theo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
};
