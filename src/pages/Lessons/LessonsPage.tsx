import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Monitor,
  Wrench,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Award,
  Lightbulb,
  Lock,
  CheckSquare,
  HelpCircle,
  RotateCcw,
  Star,
  BookMarked,
  FileText,
  Bookmark,
  Layers,
  Camera,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Lesson, GradeLevel, SubjectType, BookCategory, Question } from '../../types';
import { VisualCard } from '../../components/common/VisualCard';
import { fireStars, fireFireworks } from '../../services/confetti';
import { soundService } from '../../services/sound';

export const LessonsPage: React.FC = () => {
  const {
    lessons,
    selectedGrade,
    setSelectedGrade,
    selectedSubject,
    setSelectedSubject,
    selectedBookType,
    setSelectedBookType,
    studentProfile,
    markLessonCompleted,
    setActiveTab,
  } = useAppStore();

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  
  // Lesson detailed view state
  const [activeTabSubView, setActiveTabSubView] = useState<'theory' | 'exercises'>('theory');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Tracking completion of individual parts in the current lesson
  const [readSections, setReadSections] = useState<Record<string, boolean>>({});
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, { answer: string; isChecked: boolean; isCorrect: boolean }>>({});
  const [showWarningNotFinished, setShowWarningNotFinished] = useState(false);

  // Filter lessons by grade, subject, and book category
  const filteredLessons = lessons.filter((l) => {
    const matchGrade = l.grade === selectedGrade;
    const matchSubject = l.subject === selectedSubject;
    const matchBook = selectedBookType === 'all' || l.bookType === selectedBookType;
    return matchGrade && matchSubject && matchBook;
  });

  const isCompleted = (lessonId: string) => studentProfile.completedLessons.includes(lessonId);

  // Open Lesson & Reset Tracking
  const handleOpenLesson = (lesson: Lesson) => {
    soundService.playClick();
    setActiveLesson(lesson);
    setActiveTabSubView('theory');
    setCurrentSectionIndex(0);
    setShowWarningNotFinished(false);

    // If lesson was already completed previously, pre-fill as 100%
    const alreadyDone = studentProfile.completedLessons.includes(lesson.id);
    const initialSectionsState: Record<string, boolean> = {};
    lesson.sections.forEach((sec, idx) => {
      initialSectionsState[sec.id || `sec_${idx}`] = alreadyDone ? true : idx === 0;
    });
    setReadSections(initialSectionsState);

    const initialExerciseState: Record<string, { answer: string; isChecked: boolean; isCorrect: boolean }> = {};
    lesson.reviewQuestions.forEach((q) => {
      initialExerciseState[q.id] = {
        answer: alreadyDone ? q.correctAnswer : '',
        isChecked: alreadyDone,
        isCorrect: alreadyDone,
      };
    });
    setExerciseAnswers(initialExerciseState);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mark a theory section as read
  const handleMarkSectionRead = (sectionId: string) => {
    soundService.playClick();
    setReadSections((prev) => ({
      ...prev,
      [sectionId]: true,
    }));
  };

  // Answer a review exercise
  const handleSelectExerciseOption = (questionId: string, optVal: string) => {
    soundService.playClick();
    setExerciseAnswers((prev) => ({
      ...prev,
      [questionId]: {
        answer: optVal,
        isChecked: false,
        isCorrect: false,
      },
    }));
  };

  const handleCheckExerciseAnswer = (q: Question) => {
    const current = exerciseAnswers[q.id];
    if (!current || !current.answer) return;

    const isRight = current.answer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
    setExerciseAnswers((prev) => ({
      ...prev,
      [q.id]: {
        ...current,
        isChecked: true,
        isCorrect: isRight,
      },
    }));

    if (isRight) {
      soundService.playCorrect();
      fireStars();
    } else {
      soundService.playWrong();
    }
  };

  // Calculate progress percentage of active lesson
  const calculateProgress = () => {
    if (!activeLesson) return 0;
    const totalSections = activeLesson.sections.length;
    const totalExercises = activeLesson.reviewQuestions.length;
    const totalSteps = totalSections + totalExercises;
    if (totalSteps === 0) return 100;

    const completedSectionsCount = activeLesson.sections.filter((s, idx) =>
      readSections[s.id || `sec_${idx}`]
    ).length;

    const completedExercisesCount = activeLesson.reviewQuestions.filter((q) =>
      exerciseAnswers[q.id]?.isCorrect
    ).length;

    const percent = Math.round(((completedSectionsCount + completedExercisesCount) / totalSteps) * 100);
    return Math.min(100, percent);
  };

  const progressPercent = calculateProgress();
  const is100Percent = progressPercent >= 100;

  // Handle Complete Lesson Button Click
  const handleFinishLesson = () => {
    if (!activeLesson) return;

    if (!is100Percent) {
      soundService.playWrong();
      setShowWarningNotFinished(true);
      return;
    }

    markLessonCompleted(activeLesson.id);
    fireFireworks();
    soundService.playFanfare();
    setShowWarningNotFinished(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* ==============================================================
          A. DETAILED LESSON INTERFACE (WHEN A LESSON IS SELECTED)
          ============================================================== */}
      {activeLesson ? (
        <div className="space-y-6">
          
          {/* Top Bar: Back button, book tag, and subject */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-sky-100 shadow-xs">
            <button
              onClick={() => setActiveLesson(null)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại chọn sách & bài học</span>
            </button>

            <div className="flex flex-wrap items-center gap-2 text-xs font-black">
              <span className={`px-3 py-1.5 rounded-xl border ${
                activeLesson.subject === 'tinhoc'
                  ? 'bg-sky-50 text-sky-800 border-sky-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                {activeLesson.subject === 'tinhoc' ? 'Tin Học' : 'Công Nghệ'} · Lớp {activeLesson.grade}
              </span>

              <span className={`px-3 py-1.5 rounded-xl border ${
                activeLesson.bookType === 'sgk'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : activeLesson.bookType === 'sgv'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                {activeLesson.bookName}
              </span>
            </div>
          </div>

          {/* MAIN LESSON CONTAINER */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sky-100 shadow-md space-y-8">
            
            {/* 1. Header with Lesson Title & Meta */}
            <div className="space-y-3 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-2 text-xs font-black text-sky-600 uppercase tracking-wider">
                <span>{activeLesson.topic}</span>
                <span>·</span>
                <span>{activeLesson.lessonNumber}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {activeLesson.lessonNumber}: {activeLesson.title}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {activeLesson.description}
              </p>

              {/* Objectives (Mục tiêu bài học / YCCĐ) */}
              {activeLesson.objectives && activeLesson.objectives.length > 0 && (
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-1.5 mt-3">
                  <div className="text-xs font-black uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Yêu cầu cần đạt sau bài học:</span>
                  </div>
                  <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-700 font-semibold space-y-1">
                    {activeLesson.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 2. REAL-TIME PROGRESS BAR (TIẾN TRÌNH HỌC TẬP CỦA HỌC SINH) */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 border border-sky-200 space-y-2.5">
              <div className="flex items-center justify-between text-xs sm:text-sm font-black">
                <span className="text-sky-950 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  <span>Tiến trình hoàn thành bài học:</span>
                </span>
                <span className={`tabular-nums text-base font-black ${
                  is100Percent ? 'text-emerald-600' : 'text-sky-700'
                }`}>
                  {progressPercent}%
                </span>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-3.5 overflow-hidden p-0.5 shadow-inner">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    is100Percent
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                      : 'bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span>
                  Đã đọc: {activeLesson.sections.filter((s, i) => readSections[s.id || `sec_${i}`]).length} / {activeLesson.sections.length} phần lý thuyết
                </span>
                <span>
                  Đã làm đúng: {activeLesson.reviewQuestions.filter((q) => exerciseAnswers[q.id]?.isCorrect).length} / {activeLesson.reviewQuestions.length} câu bài tập ôn
                </span>
              </div>
            </div>

            {/* 3. SUB-VIEW TABS: LÝ THUYẾT vs BÀI TẬP ÔN LUYỆN */}
            <div className="flex items-center gap-3 border-b border-slate-200 pb-1">
              <button
                onClick={() => {
                  soundService.playClick();
                  setActiveTabSubView('theory');
                }}
                className={`flex items-center gap-2 pb-3 px-3 text-sm font-black border-b-2 transition-all ${
                  activeTabSubView === 'theory'
                    ? 'border-sky-500 text-sky-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Phần 1: Lý Thuyết & Khám Phá ({activeLesson.sections.length})</span>
              </button>

              <button
                onClick={() => {
                  soundService.playClick();
                  setActiveTabSubView('exercises');
                }}
                className={`flex items-center gap-2 pb-3 px-3 text-sm font-black border-b-2 transition-all ${
                  activeTabSubView === 'exercises'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                <span>Phần 2: Bài Tập Ôn Luyện ({activeLesson.reviewQuestions.length})</span>
              </button>
            </div>

            {/* TAB CONTENT: PHẦN 1 - LÝ THUYẾT */}
            {activeTabSubView === 'theory' && (
              <div className="space-y-6">
                {/* Stepper Tabs across sections */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {activeLesson.sections.map((sec, idx) => {
                    const isRead = !!readSections[sec.id || `sec_${idx}`];
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          soundService.playClick();
                          setCurrentSectionIndex(idx);
                        }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
                          currentSectionIndex === idx
                            ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                            : isRead
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isRead && <span className="text-emerald-500">✓</span>}
                        <span>Mục {idx + 1}: {sec.title.split('.')[1] || sec.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Section Content Display */}
                {activeLesson.sections[currentSectionIndex] && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-sky-50/40 p-6 sm:p-8 rounded-3xl border border-sky-100">
                    
                    {/* Visual Card */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-sky-100 shadow-xs">
                      <VisualCard
                        type={activeLesson.sections[currentSectionIndex].visualType || 'computer'}
                        size="lg"
                      />
                      <span className="mt-3 text-xs font-bold text-slate-500 text-center">
                        Hình minh họa bài học
                      </span>
                    </div>

                    {/* Content text */}
                    <div className="md:col-span-8 space-y-4">
                      <h2 className="text-xl sm:text-2xl font-black text-sky-950">
                        {activeLesson.sections[currentSectionIndex].title}
                      </h2>

                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                        {activeLesson.sections[currentSectionIndex].content}
                      </p>

                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900">
                        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-black uppercase tracking-wider text-amber-800">
                            Chốt kiến thức & Ghi nhớ
                          </div>
                          <div className="text-xs sm:text-sm font-bold mt-0.5">
                            {activeLesson.sections[currentSectionIndex].keyTakeaway}
                          </div>
                        </div>
                      </div>

                      {/* Read acknowledgement checkbox button */}
                      <div className="pt-2">
                        <button
                          onClick={() =>
                            handleMarkSectionRead(
                              activeLesson.sections[currentSectionIndex].id ||
                                `sec_${currentSectionIndex}`
                            )
                          }
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${
                            readSections[
                              activeLesson.sections[currentSectionIndex].id ||
                                `sec_${currentSectionIndex}`
                            ]
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-white hover:bg-sky-50 text-sky-700 border-2 border-sky-300'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>
                            {readSections[
                              activeLesson.sections[currentSectionIndex].id ||
                                `sec_${currentSectionIndex}`
                            ]
                              ? 'Đã đọc và hiểu mục này (Đã tính tiến trình)'
                              : 'Bấm để xác nhận: "Em đã đọc & hiểu mục này"'}
                          </span>
                        </button>
                      </div>
                    </div>

                  </div>
                )}

                {/* Section navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    disabled={currentSectionIndex === 0}
                    onClick={() => setCurrentSectionIndex(currentSectionIndex - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30"
                  >
                    Mục trước
                  </button>

                  {currentSectionIndex < activeLesson.sections.length - 1 ? (
                    <button
                      onClick={() => setCurrentSectionIndex(currentSectionIndex + 1)}
                      className="flex items-center gap-1 px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs"
                    >
                      <span>Mục kế tiếp</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTabSubView('exercises')}
                      className="flex items-center gap-1 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs"
                    >
                      <span>Chuyển sang làm bài tập ôn ✏️</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: PHẦN 2 - BÀI TẬP ÔN LUYỆN */}
            {activeTabSubView === 'exercises' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-purple-50 text-purple-900 border border-purple-200 text-xs font-bold flex items-center justify-between">
                  <span>
                    Bé hãy hoàn thành các bài tập ôn để đạt đủ 100% tiến trình học tập nhé!
                  </span>
                  <span className="text-purple-700">
                    ({activeLesson.reviewQuestions.filter((q) => exerciseAnswers[q.id]?.isCorrect).length}/{activeLesson.reviewQuestions.length} câu đúng)
                  </span>
                </div>

                <div className="space-y-6">
                  {activeLesson.reviewQuestions.map((q, qIndex) => {
                    const currentAns = exerciseAnswers[q.id];
                    return (
                      <div
                        key={q.id}
                        className={`p-6 rounded-3xl border-2 space-y-4 transition-all ${
                          currentAns?.isCorrect
                            ? 'bg-emerald-50/50 border-emerald-300'
                            : currentAns?.isChecked
                            ? 'bg-amber-50/50 border-amber-300'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 text-xs font-black">
                              Câu {qIndex + 1}
                            </span>
                            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                              {q.questionText}
                            </h3>
                          </div>

                          {currentAns?.isCorrect ? (
                            <span className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Đã làm đúng ✓</span>
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-slate-400 shrink-0">
                              Chưa hoàn thành
                            </span>
                          )}
                        </div>

                        {/* Options */}
                        {q.type === 'multiple_choice' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {q.options.map((opt, optIdx) => {
                              const letter = String.fromCharCode(65 + optIdx);
                              const isSelected = currentAns?.answer === letter;
                              return (
                                <button
                                  key={optIdx}
                                  disabled={currentAns?.isCorrect}
                                  onClick={() => handleSelectExerciseOption(q.id, letter)}
                                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                                    isSelected
                                      ? 'bg-purple-100 border-purple-500 text-purple-950 font-black ring-2 ring-purple-300'
                                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 font-semibold'
                                  }`}
                                >
                                  <span className="w-6 h-6 rounded-lg bg-white border flex items-center justify-center text-xs font-black shrink-0">
                                    {letter}
                                  </span>
                                  <span className="text-xs sm:text-sm mt-0.5">{opt}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {q.type === 'true_false' && (
                          <div className="grid grid-cols-2 gap-4">
                            {['Đúng', 'Sai'].map((val) => {
                              const isSelected = currentAns?.answer === val;
                              return (
                                <button
                                  key={val}
                                  disabled={currentAns?.isCorrect}
                                  onClick={() => handleSelectExerciseOption(q.id, val)}
                                  className={`p-4 rounded-2xl border-2 font-black text-sm transition-all ${
                                    isSelected
                                      ? 'bg-purple-100 border-purple-500 text-purple-950 ring-2 ring-purple-300'
                                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                                  }`}
                                >
                                  {val === 'Đúng' ? '👍 ĐÚNG' : '👎 SAI'}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Feedback and Check button */}
                        <div className="flex items-center justify-between pt-2">
                          {!currentAns?.isCorrect && (
                            <button
                              disabled={!currentAns?.answer}
                              onClick={() => handleCheckExerciseAnswer(q)}
                              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs disabled:opacity-40"
                            >
                              Kiểm tra câu này
                            </button>
                          )}

                          {currentAns?.isChecked && (
                            <div className="text-xs font-semibold text-slate-600 pl-2">
                              {currentAns.isCorrect ? (
                                <span className="text-emerald-700 font-black">
                                  ✓ Chính xác! {q.explanation}
                                </span>
                              ) : (
                                <span className="text-amber-800 font-bold">
                                  Chưa đúng rồi! Gợi ý: {q.explanation}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. HOÀN THÀNH BÀI HỌC BUTTON & STRICT 100% PROGRESS ENFORCEMENT */}
            <div className="p-6 rounded-3xl border-2 border-slate-200 bg-slate-50 space-y-4">
              
              {showWarningNotFinished && !is100Percent && (
                <div className="p-4 rounded-2xl bg-rose-100 border border-rose-300 text-rose-950 text-xs sm:text-sm font-black flex items-center gap-3 animate-shake">
                  <Lock className="w-5 h-5 text-rose-600 shrink-0" />
                  <div>
                    Chưa thể hoàn thành bài học! Bé mới đạt {progressPercent}% tiến trình.
                    Hãy đọc hết các phần lý thuyết và làm đúng tất cả các câu bài tập ôn để đạt 100% nhé!
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left space-y-1">
                  <div className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-2">
                    {is100Percent ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-5 h-5" />
                        Đã hoàn thành 100% tiến trình học tập!
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1">
                        <Lock className="w-4 h-4 text-amber-500" />
                        Tiến trình hiện tại: {progressPercent}% (Yêu cầu đủ 100% để hoàn thành)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    Phần thưởng: Nhận ngay +15 Sao thưởng ⭐ và huy hiệu thành tích!
                  </p>
                </div>

                <button
                  disabled={!is100Percent}
                  onClick={handleFinishLesson}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg transition-all ${
                    is100Percent
                      ? isCompleted(activeLesson.id)
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white hover:scale-105 active:scale-95'
                      : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed opacity-70'
                  }`}
                >
                  {is100Percent ? (
                    <>
                      <Award className="w-5 h-5" />
                      <span>
                        {isCompleted(activeLesson.id)
                          ? 'Đã hoàn thành bài học! (Xem lại)'
                          : 'Hoàn Thành Bài Học (+15 Sao ⭐)'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Chưa đủ 100% tiến trình ({progressPercent}%)</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* ==============================================================
           B. LESSON SELECTION PORTAL: CHỌN LỚP -> CHỌN SÁCH -> CHỌN BÀI
           ============================================================== */
        <div className="space-y-6">
          
          {/* Top Filter Card */}
          <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-xs space-y-6">
            
            {/* Header Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-black mb-2">
                  <BookMarked className="w-3.5 h-3.5" />
                  <span>Bộ Sách Giáo Khoa & Giáo Viên Chuẩn</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Kho Bài Học Tin Học & Công Nghệ
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Chọn Khối Lớp, chọn Sách Giáo Khoa / Sách Giáo Viên / Vở Bài Tập và bắt đầu bài học!
                </p>
              </div>

              {/* Subject Tabs */}
              <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl gap-1 shrink-0">
                <button
                  onClick={() => setSelectedSubject('tinhoc')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                    selectedSubject === 'tinhoc'
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>Tin Học</span>
                </button>

                <button
                  onClick={() => setSelectedSubject('congnghe')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
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

            {/* BƯỚC 1: CHỌN KHỐI LỚP (LỚP 1 ĐẾN LỚP 5) */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                1. Chọn Khối Lớp:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {([1, 2, 3, 4, 5] as GradeLevel[]).map((grade) => {
                  const isCur = selectedGrade === grade;
                  return (
                    <button
                      key={grade}
                      onClick={() => setSelectedGrade(grade)}
                      className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 ${
                        isCur
                          ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-105'
                          : 'bg-slate-50 hover:bg-sky-50 text-slate-700 border border-slate-200'
                      }`}
                    >
                      Khối Lớp {grade}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BƯỚC 2: CHỌN LOẠI SÁCH (SGK / SGV / VBT) */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                2. Chọn Loại Sách:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedBookType('all')}
                  className={`p-3 rounded-2xl text-xs font-black border text-left flex items-center gap-2.5 transition-all ${
                    selectedBookType === 'all'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Tất cả các sách</span>
                </button>

                <button
                  onClick={() => setSelectedBookType('sgk')}
                  className={`p-3 rounded-2xl text-xs font-black border text-left flex items-center gap-2.5 transition-all ${
                    selectedBookType === 'sgk'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-blue-50/50 hover:bg-blue-100/50 text-blue-900 border-blue-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span>📘 Sách Giáo Khoa (SGK)</span>
                </button>

                <button
                  onClick={() => setSelectedBookType('sgv')}
                  className={`p-3 rounded-2xl text-xs font-black border text-left flex items-center gap-2.5 transition-all ${
                    selectedBookType === 'sgv'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                      : 'bg-purple-50/50 hover:bg-purple-100/50 text-purple-900 border-purple-200'
                  }`}
                >
                  <Bookmark className="w-4 h-4 text-purple-500" />
                  <span>📕 Sách Giáo Viên (SGV)</span>
                </button>

                <button
                  onClick={() => setSelectedBookType('sbt')}
                  className={`p-3 rounded-2xl text-xs font-black border text-left flex items-center gap-2.5 transition-all ${
                    selectedBookType === 'sbt'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                      : 'bg-amber-50/50 hover:bg-amber-100/50 text-amber-900 border-amber-200'
                  }`}
                >
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span>📙 Vở Bài Tập (VBT)</span>
                </button>
              </div>
            </div>

          </div>

          {/* BƯỚC 3: DANH SÁCH BÀI HỌC CỦA SÁCH ĐÃ CHỌN */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                3. Danh Sách Bài Học ({filteredLessons.length} bài)
              </h2>
              <span className="text-xs font-bold text-slate-400">
                Khối {selectedGrade} · {selectedSubject === 'tinhoc' ? 'Tin Học' : 'Công Nghệ'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map((lesson) => {
                const done = isCompleted(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    className="bg-white rounded-3xl p-6 border border-sky-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-sky-300 space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <span className={`px-2.5 py-1 rounded-xl text-[11px] font-black ${
                          lesson.bookType === 'sgk'
                            ? 'bg-blue-100 text-blue-800'
                            : lesson.bookType === 'sgv'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {lesson.bookType.toUpperCase()} · {lesson.lessonNumber}
                        </span>

                        {done ? (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>100% Đã xong</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold">
                            Chưa học
                          </span>
                        )}
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-slate-400 block">
                          {lesson.topic}
                        </span>
                        <h3 className="font-black text-base text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {lesson.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {lesson.durationMinutes} phút
                        </span>
                        <span>·</span>
                        <span>{lesson.sections.length} phần lý thuyết</span>
                        <span>·</span>
                        <span>{lesson.reviewQuestions.length} câu ôn</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-600">
                        +15 Sao thưởng ⭐
                      </span>
                      <button
                        onClick={() => handleOpenLesson(lesson)}
                        className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs shadow-xs transition-transform hover:scale-102"
                      >
                        {done ? 'Học lại' : 'Vào học ngay'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredLessons.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center border border-sky-100 space-y-3">
                <BookOpen className="w-12 h-12 text-sky-300 mx-auto" />
                <h3 className="font-black text-lg text-slate-700">
                  Chưa có bài học cho bộ lọc hiện tại
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Hãy thử chọn "Tất cả các sách" hoặc chuyển sang Khối lớp 4 hoặc Khối lớp 5 nhé!
                </p>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
