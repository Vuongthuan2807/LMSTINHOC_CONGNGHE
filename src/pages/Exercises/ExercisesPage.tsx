import React, { useState } from 'react';
import {
  CheckSquare,
  HelpCircle,
  Sparkles,
  RotateCcw,
  Monitor,
  Wrench,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Award,
  ChevronRight,
  Star,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Question, GradeLevel, SubjectType } from '../../types';
import { fireFireworks, fireStars } from '../../services/confetti';
import { soundService } from '../../services/sound';

export const ExercisesPage: React.FC = () => {
  const {
    questions,
    selectedGrade,
    setSelectedGrade,
    selectedSubject,
    setSelectedSubject,
    studentProfile,
    markExerciseCompleted,
  } = useAppStore();

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [fillAnswerText, setFillAnswerText] = useState<string>('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Filter questions by grade and subject
  const currentQuestions = questions.filter(
    (q) => q.grade === selectedGrade && q.subject === selectedSubject
  );

  const activeQuestion: Question | undefined = currentQuestions[activeQuestionIndex];

  const handleSelectOption = (optKey: string) => {
    if (isAnswerChecked) return;
    soundService.playClick();
    setSelectedAnswer(optKey);
  };

  const handleCheckAnswer = () => {
    if (!activeQuestion) return;

    let userAns = selectedAnswer;
    if (activeQuestion.type === 'fill_in_blank') {
      userAns = fillAnswerText.trim();
    }

    if (!userAns) return;

    const correct =
      userAns.trim().toLowerCase() === activeQuestion.correctAnswer.trim().toLowerCase();

    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      soundService.playCorrect();
      fireStars();
      markExerciseCompleted(activeQuestion.id);
    } else {
      soundService.playWrong();
    }
  };

  const handleNextQuestion = () => {
    soundService.playClick();
    setSelectedAnswer('');
    setFillAnswerText('');
    setIsAnswerChecked(false);
    setIsCorrect(false);
    if (activeQuestionIndex < currentQuestions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    } else {
      setActiveQuestionIndex(0);
    }
  };

  const handleResetCurrent = () => {
    soundService.playClick();
    setSelectedAnswer('');
    setFillAnswerText('');
    setIsAnswerChecked(false);
    setIsCorrect(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Top Filter Bar */}
      <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Luyện Tập Vui Nhộn
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Trả lời đúng để nhận thêm sao thưởng và pháo hoa rực rỡ!
            </p>
          </div>

          {/* Subject Switcher */}
          <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl gap-1 shrink-0">
            <button
              onClick={() => {
                setSelectedSubject('tinhoc');
                setActiveQuestionIndex(0);
                handleResetCurrent();
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                selectedSubject === 'tinhoc'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Tin Học</span>
            </button>

            <button
              onClick={() => {
                setSelectedSubject('congnghe');
                setActiveQuestionIndex(0);
                handleResetCurrent();
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                selectedSubject === 'congnghe'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Công Nghệ</span>
            </button>
          </div>
        </div>

        {/* Grade Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-400 mr-2 shrink-0">Khối lớp:</span>
          {([1, 2, 3, 4, 5] as GradeLevel[]).map((grade) => (
            <button
              key={grade}
              onClick={() => {
                setSelectedGrade(grade);
                setActiveQuestionIndex(0);
                handleResetCurrent();
              }}
              className={`px-4 py-1.5 rounded-2xl text-xs font-black transition-all shrink-0 ${
                selectedGrade === grade
                  ? 'bg-amber-400 text-amber-950 shadow-md shadow-amber-400/20 scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Lớp {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Main Question Exercise Box */}
      {activeQuestion ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sky-100 shadow-md space-y-8">
          
          {/* Question Meta Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-extrabold">
                Câu {activeQuestionIndex + 1} / {currentQuestions.length}
              </span>
              <span className="text-xs font-bold text-slate-400">·</span>
              <span className="text-xs font-bold text-slate-600">{activeQuestion.topic}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                +5 Sao
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {activeQuestion.questionText}
            </h2>
            <div className="text-xs font-bold text-slate-400">
              Bài học liên quan: {activeQuestion.lessonTitle}
            </div>
          </div>

          {/* Options Section */}
          <div className="space-y-3">
            {activeQuestion.type === 'multiple_choice' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeQuestion.options.map((option, idx) => {
                  const letter = String.fromCharCode(65 + idx); // 'A', 'B', 'C', 'D'
                  const isSelected = selectedAnswer === letter;
                  
                  let optionStyles = 'bg-slate-50 hover:bg-sky-50/60 border-slate-200 text-slate-800';
                  if (isSelected) {
                    optionStyles = 'bg-sky-100 border-sky-500 text-sky-950 ring-2 ring-sky-400';
                  }

                  if (isAnswerChecked) {
                    if (letter === activeQuestion.correctAnswer) {
                      optionStyles = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black';
                    } else if (isSelected && !isCorrect) {
                      optionStyles = 'bg-rose-100 border-rose-400 text-rose-950';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerChecked}
                      onClick={() => handleSelectOption(letter)}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${optionStyles} ${
                        !isAnswerChecked ? 'active:scale-98 cursor-pointer' : ''
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-500 text-white' : 'bg-white border border-slate-300 text-slate-700'
                      }`}>
                        {letter}
                      </span>
                      <span className="font-bold text-sm sm:text-base leading-tight mt-1">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {activeQuestion.type === 'true_false' && (
              <div className="grid grid-cols-2 gap-4">
                {['Đúng', 'Sai'].map((val) => {
                  const isSelected = selectedAnswer === val;
                  let btnColor = val === 'Đúng' ? 'hover:bg-emerald-50' : 'hover:bg-rose-50';
                  if (isSelected) {
                    btnColor = val === 'Đúng' ? 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-400' : 'bg-rose-100 border-rose-500 ring-2 ring-rose-400';
                  }
                  if (isAnswerChecked) {
                    if (val === activeQuestion.correctAnswer) {
                      btnColor = 'bg-emerald-200 border-emerald-600 text-emerald-950 font-black';
                    } else if (isSelected && !isCorrect) {
                      btnColor = 'bg-rose-200 border-rose-500 text-rose-950';
                    }
                  }

                  return (
                    <button
                      key={val}
                      disabled={isAnswerChecked}
                      onClick={() => handleSelectOption(val)}
                      className={`p-5 rounded-2xl border-2 text-center font-black text-lg transition-all ${btnColor}`}
                    >
                      {val === 'Đúng' ? '👍 ĐÚNG' : '👎 SAI'}
                    </button>
                  );
                })}
              </div>
            )}

            {activeQuestion.type === 'fill_in_blank' && (
              <div className="space-y-3">
                <input
                  type="text"
                  disabled={isAnswerChecked}
                  value={fillAnswerText}
                  onChange={(e) => setFillAnswerText(e.target.value)}
                  placeholder="Nhập câu trả lời của em vào đây..."
                  className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 focus:border-sky-500 focus:outline-hidden text-base font-bold bg-slate-50"
                />
              </div>
            )}
          </div>

          {/* Feedback & Explanation Box */}
          {isAnswerChecked && (
            <div className={`p-6 rounded-3xl border space-y-3 transition-all ${
              isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}>
              <div className="flex items-center gap-2 font-black text-base sm:text-lg">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <span>Chính xác tuyệt vời! Bé đã nhận được 5 Sao thưởng ⭐</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-6 h-6 text-amber-600 shrink-0" />
                    <span>Chưa đúng rồi! Nhưng không sao, cùng xem gợi ý để nhớ nhé!</span>
                  </>
                )}
              </div>

              {activeQuestion.explanation && (
                <div className="text-sm font-semibold leading-relaxed pl-8">
                  <span className="font-extrabold">Giải thích: </span>
                  {activeQuestion.explanation}
                </div>
              )}
            </div>
          )}

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={handleResetCurrent}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại câu này</span>
            </button>

            {!isAnswerChecked ? (
              <button
                disabled={!selectedAnswer && !fillAnswerText}
                onClick={handleCheckAnswer}
                className={`px-8 py-3 rounded-2xl font-black text-sm shadow-md transition-all ${
                  selectedAnswer || fillAnswerText
                    ? 'bg-amber-400 hover:bg-amber-500 text-amber-950 hover:scale-105 active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Kiểm tra đáp án 🚀
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-sm shadow-md shadow-sky-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Câu tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-sky-100 space-y-3">
          <CheckSquare className="w-12 h-12 text-sky-300 mx-auto" />
          <h3 className="font-extrabold text-lg text-slate-700">
            Chưa có bài tập cho môn {selectedSubject === 'tinhoc' ? 'Tin Học' : 'Công Nghệ'} Khối {selectedGrade}
          </h3>
          <p className="text-xs text-slate-500">
            Thầy cô có thể tạo câu hỏi mới hoặc nhập file Excel trong trang Quản Trị!
          </p>
        </div>
      )}

      {/* Quick Jump Question Tracker Bar */}
      {currentQuestions.length > 0 && (
        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs flex items-center justify-between gap-4 overflow-x-auto">
          <span className="text-xs font-bold text-slate-400 shrink-0">Danh sách câu:</span>
          <div className="flex items-center gap-2">
            {currentQuestions.map((q, idx) => {
              const done = studentProfile.completedExercises.includes(q.id);
              const isActive = idx === activeQuestionIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setActiveQuestionIndex(idx);
                    handleResetCurrent();
                  }}
                  className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${
                    isActive
                      ? 'bg-sky-500 text-white ring-2 ring-sky-300 scale-110'
                      : done
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
