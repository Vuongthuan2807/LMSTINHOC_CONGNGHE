import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  Clock,
  Award,
  RotateCcw,
  CheckCircle2,
  XCircle,
  History,
  Timer,
  ChevronRight,
  Monitor,
  Wrench,
  AlertTriangle,
  Play,
  ArrowLeft,
  Trophy,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Exam, ExamAttempt, Question, GradeLevel, SubjectType } from '../../types';
import { fireFireworks } from '../../services/confetti';
import { soundService } from '../../services/sound';

export const ExamsPage: React.FC = () => {
  const {
    exams,
    questions,
    selectedGrade,
    setSelectedGrade,
    selectedSubject,
    setSelectedSubject,
    examAttempts,
    saveExamAttempt,
  } = useAppStore();

  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [lastAttempt, setLastAttempt] = useState<ExamAttempt | null>(null);
  const [showHistoryTab, setShowHistoryTab] = useState(false);

  // Filter exams
  const currentGradeExams = exams.filter(
    (e) => e.grade === selectedGrade && e.subject === selectedSubject
  );

  // Timer countdown
  useEffect(() => {
    if (!activeExam || isExamCompleted || secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeExam, isExamCompleted, secondsRemaining]);

  const handleStartExam = (exam: Exam, shuffle = true) => {
    soundService.playClick();
    // Get candidate questions for this subject & grade
    let pool = questions.filter(
      (q) => q.grade === exam.grade && q.subject === exam.subject
    );

    if (pool.length === 0) {
      // Fallback pool from current subject if none strictly in grade
      pool = questions.filter((q) => q.subject === exam.subject);
    }

    if (shuffle) {
      pool = [...pool].sort(() => Math.random() - 0.5);
    }

    const selectedQ = pool.slice(0, Math.min(exam.questionCount, pool.length));
    setExamQuestions(selectedQ);
    setActiveExam(exam);
    setCurrentQIndex(0);
    setUserAnswers({});
    setSecondsRemaining(exam.durationMinutes * 60);
    setIsExamCompleted(false);
    setLastAttempt(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuickCustomExam = () => {
    const customExam: Exam = {
      id: `custom_${Date.now()}`,
      title: `Đề thi Luyện Tập Nhanh - ${selectedSubject === 'tinhoc' ? 'Tin Học' : 'Công Nghệ'} Lớp ${selectedGrade}`,
      subject: selectedSubject,
      grade: selectedGrade,
      durationMinutes: 10,
      questionCount: 5,
      createdAt: new Date().toISOString(),
    };
    handleStartExam(customExam, true);
  };

  const handleSelectAnswer = (qId: string, answer: string) => {
    soundService.playClick();
    setUserAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const handleSubmitExam = () => {
    if (!activeExam || isExamCompleted) return;

    // Calculate score
    let correctCount = 0;
    examQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans && ans.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        correctCount++;
      }
    });

    const totalQuestions = examQuestions.length || 1;
    const finalScore = Math.round((correctCount / totalQuestions) * 100) / 10; // Out of 10.0 scale

    const timeSpent = activeExam.durationMinutes * 60 - secondsRemaining;

    const attempt: ExamAttempt = {
      id: `attempt_${Date.now()}`,
      examId: activeExam.id,
      examTitle: activeExam.title,
      subject: activeExam.subject,
      grade: activeExam.grade,
      score: finalScore,
      maxScore: 10,
      correctCount,
      totalQuestions,
      timeSpentSeconds: Math.max(0, timeSpent),
      completedAt: new Date().toISOString(),
      userAnswers: { ...userAnswers },
    };

    saveExamAttempt(attempt);
    setLastAttempt(attempt);
    setIsExamCompleted(true);

    if (finalScore >= 7) {
      soundService.playFanfare();
      fireFireworks();
    } else {
      soundService.playCorrect();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* EXAM IN PROGRESS OR RESULT SCREEN */}
      {activeExam ? (
        <div className="space-y-6">
          
          {/* Header Bar during exam */}
          <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-black">
                  {activeExam.subject === 'tinhoc' ? 'Tin Học' : 'Công Nghệ'} · Khối {activeExam.grade}
                </span>
                <span className="text-xs font-bold text-slate-400">·</span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 truncate">
                  {activeExam.title}
                </h2>
              </div>
            </div>

            {!isExamCompleted && (
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm border tabular-nums ${
                  secondsRemaining < 120
                    ? 'bg-rose-50 text-rose-600 border-rose-300 animate-pulse'
                    : 'bg-purple-50 text-purple-900 border-purple-200'
                }`}>
                  <Timer className="w-4 h-4 text-purple-600" />
                  <span>Thời gian: {formatTime(secondsRemaining)}</span>
                </div>

                <button
                  onClick={handleSubmitExam}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  Nộp bài thi 📝
                </button>
              </div>
            )}
          </div>

          {/* EXAM RESULT SCREEN */}
          {isExamCompleted && lastAttempt ? (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-md space-y-8">
              
              <div className="text-center space-y-3 py-6 bg-gradient-to-b from-purple-50/60 to-pink-50/40 rounded-3xl border border-purple-100">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-lg shadow-amber-400/25">
                  <Trophy className="w-10 h-10" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {lastAttempt.score >= 8
                    ? 'Xuất Sắc! Chúc Mừng Em 🎉'
                    : lastAttempt.score >= 5
                    ? 'Khá Tốt! Cố Gắng Luyện Thêm Nhé 🌟'
                    : 'Hãy Ôn Lại Bài Và Làm Lại Nhé! 💪'}
                </h1>

                <div className="text-4xl sm:text-6xl font-black text-purple-700 tabular-nums">
                  {lastAttempt.score} <span className="text-2xl text-slate-400 font-bold">/ 10 Điểm</span>
                </div>

                <div className="flex items-center justify-center gap-6 text-xs sm:text-sm font-bold text-slate-600 pt-2">
                  <span>Đúng: {lastAttempt.correctCount} / {lastAttempt.totalQuestions} câu</span>
                  <span>·</span>
                  <span>Thời gian làm: {Math.floor(lastAttempt.timeSpentSeconds / 60)}p {lastAttempt.timeSpentSeconds % 60}s</span>
                </div>
              </div>

              {/* REVIEW QUESTION DETAILS */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-lg text-slate-900">
                  Xem lại chi tiết từng câu hỏi:
                </h3>

                <div className="space-y-4">
                  {examQuestions.map((q, idx) => {
                    const studentAns = lastAttempt.userAnswers[q.id];
                    const isRight =
                      studentAns &&
                      studentAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-2xl border ${
                          isRight
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-rose-50/50 border-rose-200'
                        } space-y-3`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-xs px-2.5 py-1 rounded-md bg-white border">
                              Câu {idx + 1}
                            </span>
                            <span className="font-bold text-sm text-slate-800">
                              {q.questionText}
                            </span>
                          </div>

                          <span className={`shrink-0 flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                            isRight ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {isRight ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                            {isRight ? 'Đúng' : 'Chưa đúng'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold pl-2">
                          <div className="text-slate-600">
                            Đáp án của em: <span className="font-bold text-slate-900">{studentAns || '(Chưa chọn)'}</span>
                          </div>
                          <div className="text-emerald-700">
                            Đáp án đúng: <span className="font-black">{q.correctAnswer}</span>
                          </div>
                        </div>

                        {q.explanation && (
                          <div className="text-xs text-slate-600 bg-white/70 p-3 rounded-xl border border-slate-200">
                            <span className="font-bold text-slate-700">Giải thích: </span>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={() => setActiveExam(null)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Về danh sách đề thi</span>
                </button>

                <button
                  onClick={() => handleStartExam(activeExam, true)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại đề này</span>
                </button>
              </div>

            </div>
          ) : (
            /* ACTIVE EXAM QUESTION INTERFACE */
            examQuestions[currentQIndex] && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-md space-y-8">
                
                {/* Tracker Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-xs font-extrabold text-purple-900">
                    Câu số {currentQIndex + 1} trên {examQuestions.length}
                  </span>

                  <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs sm:max-w-md">
                    {examQuestions.map((q, idx) => {
                      const answered = !!userAnswers[q.id];
                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQIndex(idx)}
                          className={`w-7 h-7 rounded-lg text-xs font-black transition-all ${
                            currentQIndex === idx
                              ? 'bg-purple-600 text-white ring-2 ring-purple-300'
                              : answered
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question Text */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {examQuestions[currentQIndex].topic}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {examQuestions[currentQIndex].questionText}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {examQuestions[currentQIndex].type === 'multiple_choice' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {examQuestions[currentQIndex].options.map((opt, optIdx) => {
                        const letter = String.fromCharCode(65 + optIdx);
                        const isSelected = userAnswers[examQuestions[currentQIndex].id] === letter;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(examQuestions[currentQIndex].id, letter)}
                            className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                              isSelected
                                ? 'bg-purple-100 border-purple-500 text-purple-950 ring-2 ring-purple-400 font-bold'
                                : 'bg-slate-50 hover:bg-purple-50/50 border-slate-200 text-slate-800'
                            }`}
                          >
                            <span className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-purple-600 text-white' : 'bg-white border text-slate-700'
                            }`}>
                              {letter}
                            </span>
                            <span className="font-semibold text-sm leading-tight mt-1">
                              {opt}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {examQuestions[currentQIndex].type === 'true_false' && (
                    <div className="grid grid-cols-2 gap-4">
                      {['Đúng', 'Sai'].map((val) => {
                        const isSelected = userAnswers[examQuestions[currentQIndex].id] === val;
                        return (
                          <button
                            key={val}
                            onClick={() => handleSelectAnswer(examQuestions[currentQIndex].id, val)}
                            className={`p-5 rounded-2xl border-2 text-center font-black text-lg transition-all ${
                              isSelected
                                ? 'bg-purple-100 border-purple-600 text-purple-950 ring-2 ring-purple-300'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {val === 'Đúng' ? '👍 ĐÚNG' : '👎 SAI'}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Bottom Step Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <button
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex(currentQIndex - 1)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold ${
                      currentQIndex === 0 ? 'opacity-40 bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Câu trước
                  </button>

                  {currentQIndex < examQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQIndex(currentQIndex + 1)}
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md shadow-purple-600/20"
                    >
                      <span>Câu tiếp theo</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitExam}
                      className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-md shadow-emerald-500/20"
                    >
                      Hoàn thành & Nộp bài
                    </button>
                  )}
                </div>

              </div>
            )
          )}

        </div>
      ) : (
        /* EXAM PORTAL & HISTORY LIST */
        <div className="space-y-6">
          {/* Top Header Card */}
          <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Phòng Thi & Kiểm Tra Định Kỳ
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Hệ thống đếm giờ tự động, chấm điểm tức thì và lưu lịch sử làm bài
                </p>
              </div>

              {/* Navigation toggle: Exams vs History */}
              <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl gap-1">
                <button
                  onClick={() => setShowHistoryTab(false)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    !showHistoryTab
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>Danh Sách Đề Thi</span>
                </button>

                <button
                  onClick={() => setShowHistoryTab(true)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    showHistoryTab
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <History className="w-4 h-4" />
                  <span>Lịch Sử ({examAttempts.length})</span>
                </button>
              </div>
            </div>

            {/* Subject and Grade Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-1">Môn học:</span>
                <button
                  onClick={() => setSelectedSubject('tinhoc')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors ${
                    selectedSubject === 'tinhoc'
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tin Học
                </button>
                <button
                  onClick={() => setSelectedSubject('congnghe')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors ${
                    selectedSubject === 'congnghe'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Công Nghệ
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-400 mr-1">Khối lớp:</span>
                {([1, 2, 3, 4, 5] as GradeLevel[]).map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-colors ${
                      selectedGrade === grade
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Lớp {grade}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Custom Test Generator Banner */}
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-200">
                Thử thách thông minh
              </span>
              <h3 className="text-lg sm:text-xl font-black">
                Tạo Đề Thi Nhanh 10 Phút Ngay Bây Giờ
              </h3>
              <p className="text-xs text-purple-100 max-w-lg">
                Hệ thống tự động chọn ngẫu nhiên 5 câu hỏi từ kho bài tập để kiểm tra phản xạ và kiến thức của em.
              </p>
            </div>

            <button
              onClick={handleStartQuickCustomExam}
              className="px-6 py-3 rounded-2xl bg-amber-300 hover:bg-amber-400 text-amber-950 font-black text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0"
            >
              Làm Đề Nhanh ⚡
            </button>
          </div>

          {/* TAB 1: LIST OF PRE-SET EXAMS */}
          {!showHistoryTab ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentGradeExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-black ${
                        exam.subject === 'tinhoc' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {exam.subject === 'tinhoc' ? 'Tin Học' : 'Công Nghệ'} · Khối {exam.grade}
                      </span>

                      <span className="flex items-center gap-1 text-xs text-purple-600 font-extrabold">
                        <Clock className="w-3.5 h-3.5" />
                        {exam.durationMinutes} phút
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                      {exam.title}
                    </h3>

                    <div className="text-xs text-slate-500 font-medium">
                      Tổng số: <span className="font-bold text-slate-800">{exam.questionCount} câu hỏi</span> trắc nghiệm & đúng sai
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Tự động tính điểm
                    </span>
                    <button
                      onClick={() => handleStartExam(exam, true)}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-xs transition-transform hover:scale-102"
                    >
                      Bắt đầu thi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* TAB 2: EXAM ATTEMPTS HISTORY */
            <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs space-y-4">
              <h3 className="font-black text-lg text-slate-900">
                Lịch Sử Các Lần Làm Bài Trên Thiết Bị Này
              </h3>

              {examAttempts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold tracking-wider">
                        <th className="py-3 px-4">Tên bài thi</th>
                        <th className="py-3 px-4">Môn & Lớp</th>
                        <th className="py-3 px-4">Điểm số</th>
                        <th className="py-3 px-4">Đúng / Tổng</th>
                        <th className="py-3 px-4">Thời gian làm</th>
                        <th className="py-3 px-4">Ngày thi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {examAttempts.map((attempt) => (
                        <tr key={attempt.id} className="hover:bg-purple-50/30 font-semibold text-slate-700">
                          <td className="py-3.5 px-4 font-bold text-slate-900">{attempt.examTitle}</td>
                          <td className="py-3.5 px-4">
                            {attempt.subject === 'tinhoc' ? 'Tin Học' : 'Công Nghệ'} - Khối {attempt.grade}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-lg font-black text-xs ${
                              attempt.score >= 8
                                ? 'bg-emerald-100 text-emerald-800'
                                : attempt.score >= 5
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {attempt.score} / 10
                            </span>
                          </td>
                          <td className="py-3.5 px-4">{attempt.correctCount} / {attempt.totalQuestions} câu</td>
                          <td className="py-3.5 px-4 tabular-nums">
                            {Math.floor(attempt.timeSpentSeconds / 60)}p {attempt.timeSpentSeconds % 60}s
                          </td>
                          <td className="py-3.5 px-4 text-slate-400">
                            {new Date(attempt.completedAt).toLocaleString('vi-VN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <History className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="font-semibold text-xs">Chưa có kết quả làm bài nào được lưu.</p>
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
