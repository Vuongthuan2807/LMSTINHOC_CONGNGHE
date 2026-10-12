import React from 'react';
import {
  Sparkles,
  BookOpen,
  CheckSquare,
  ClipboardList,
  Gamepad2,
  Trophy,
  Star,
  Flame,
  ArrowRight,
  Clock,
  Bell,
  GraduationCap,
  Play,
  Monitor,
  Wrench,
  CheckCircle2,
  Camera,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { VisualCard } from '../../components/common/VisualCard';

export const HomePage: React.FC = () => {
  const {
    studentProfile,
    lessons,
    questions,
    exams,
    notices,
    setActiveTab,
    selectedGrade,
    setSelectedGrade,
    setSelectedSubject,
  } = useAppStore();

  // Filter lessons and exercises by current selected grade
  const currentGradeLessons = lessons.filter((l) => l.grade === selectedGrade);
  const currentGradeQuestions = questions.filter((q) => q.grade === selectedGrade);
  const currentGradeExams = exams.filter((e) => e.grade === selectedGrade);

  // Calculate learning progress
  const completedInGrade = currentGradeLessons.filter((l) =>
    studentProfile.completedLessons.includes(l.id)
  ).length;
  const totalInGrade = currentGradeLessons.length || 1;
  const progressPercent = Math.min(100, Math.round((completedInGrade / totalInGrade) * 100));

  // Subject split
  const tinHocLessons = currentGradeLessons.filter((l) => l.subject === 'tinhoc');
  const congNgheLessons = currentGradeLessons.filter((l) => l.subject === 'congnghe');

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* 1. HERO GREETING & STUDENT OVERVIEW BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white p-6 sm:p-10 shadow-xl shadow-sky-500/15">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sky-100 text-xs font-bold border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Năm học 2026 - 2027 · Khối Lớp {selectedGrade}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Chào bạn nhỏ <span className="text-amber-300">{studentProfile.name}</span>! 👋
            </h1>

            <p className="text-sky-100 text-sm sm:text-base leading-relaxed max-w-2xl">
              Hôm nay chúng mình cùng khám phá những điều kỳ thú về máy tính và thiết bị công nghệ nhé. Hãy tiếp tục tích lũy sao thưởng và mở khóa thêm huy hiệu mới!
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedSubject('tinhoc');
                  setActiveTab('lessons');
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-sky-900 font-extrabold text-sm shadow-lg shadow-black/10 hover:bg-amber-300 hover:text-amber-950 transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Vào học ngay</span>
              </button>

              <button
                onClick={() => setActiveTab('games')}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-extrabold text-sm border border-white/20 transition-all"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Chơi trò chơi</span>
              </button>

              <button
                onClick={() => setActiveTab('ai-games')}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>AI Chụp Sách Tạo Game 📸</span>
              </button>
            </div>
          </div>

          {/* Student Status Summary Card */}
          <div className="lg:col-span-4 bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/25 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/15">
              <div className="flex items-center gap-3">
                <span className="text-3xl bg-white/20 rounded-2xl p-2">{studentProfile.avatar}</span>
                <div>
                  <div className="font-extrabold text-base">{studentProfile.name}</div>
                  <div className="text-xs text-sky-200">Học sinh Khối {selectedGrade}</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-200">Điểm sao</span>
                <div className="text-2xl font-black text-amber-300 flex items-center justify-end gap-1">
                  <Star className="w-5 h-5 fill-amber-300" />
                  <span>{studentProfile.totalStars}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-sky-100">Tiến độ bài học Lớp {selectedGrade}</span>
                <span className="text-amber-200">{progressPercent}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-amber-300 to-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-sky-200">
                <span>Đã học: {completedInGrade}/{currentGradeLessons.length} bài</span>
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-300 fill-orange-300" />
                  Chuỗi {studentProfile.streakDays} ngày
                </span>
              </div>
            </div>

            {/* Quick Grade switch pills */}
            <div className="pt-2 border-t border-white/15">
              <span className="text-[11px] font-bold text-sky-200 block mb-1.5">Đổi khối lớp:</span>
              <div className="flex gap-1.5">
                {([1, 2, 3, 4, 5] as const).map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedGrade === grade
                        ? 'bg-amber-300 text-amber-950 shadow-xs'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    Lớp {grade}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Ambient decorative background circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none"></div>
      </section>

      {/* 2. TWO MAIN SUBJECTS CARDS (TIN HỌC & CÔNG NGHỆ) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Môn Học Khối Lớp {selectedGrade}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Chương trình chuẩn GDPT 2018 với lý thuyết sinh động và bài thực hành vui nhộn
            </p>
          </div>
          <button
            onClick={() => setActiveTab('lessons')}
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 hover:underline"
          >
            <span>Tất cả bài học</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TIN HỌC CARD */}
          <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-inner">
                  <Monitor className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-sky-50 text-sky-700 border border-sky-200">
                  {tinHocLessons.length} bài học
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                  Môn Tin Học
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
                  Làm quen với máy tính, chuột và bàn phím, an toàn thông tin số, tư duy lập trình và sử dụng Internet thông minh.
                </p>
              </div>

              <div className="bg-sky-50/70 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-800">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-sky-200">📘 SGK</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-purple-200">📕 SGV</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-amber-200">📙 VBT</span>
                </div>
                <div className="text-xs text-slate-700 font-semibold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{tinHocLessons[0]?.title || 'Làm quen máy tính'}</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500 font-medium">
                {tinHocLessons.filter((l) => studentProfile.completedLessons.includes(l.id)).length} đã xong
              </div>
              <button
                onClick={() => {
                  setSelectedSubject('tinhoc');
                  setActiveTab('lessons');
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-sm shadow-sky-500/20 transition-all hover:scale-102"
              >
                <span>Học Tin Học</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CÔNG NGHỆ CARD */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                  <Wrench className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {congNgheLessons.length} bài học
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Môn Công Nghệ
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
                  Đồ dùng học tập, thiết bị điện gia đình, quy tắc an toàn điện, mô hình kỹ thuật và sáng tạo đồ dùng thông minh.
                </p>
              </div>

              <div className="bg-emerald-50/70 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200">📘 SGK</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-purple-200">📕 SGV</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-amber-200">📙 VBT</span>
                </div>
                <div className="text-xs text-slate-700 font-semibold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{congNgheLessons[0]?.title || 'Thiết bị công nghệ gia đình'}</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500 font-medium">
                {congNgheLessons.filter((l) => studentProfile.completedLessons.includes(l.id)).length} đã xong
              </div>
              <button
                onClick={() => {
                  setSelectedSubject('congnghe');
                  setActiveTab('lessons');
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm shadow-emerald-600/20 transition-all hover:scale-102"
              >
                <span>Học Công Nghệ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BÀI TẬP VÀ KIỂM TRA ĐANG CHỜ & THÔNG BÁO */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Exercises & Exams (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* PENDING EXERCISES */}
          <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Bài Tập Cần Hoàn Thành</h3>
                  <p className="text-xs text-slate-500">Làm bài tập để nhận thêm 5 sao thưởng mỗi câu đúng</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('exercises')}
                className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1"
              >
                <span>Xem tất cả</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {currentGradeQuestions.slice(0, 3).map((q) => {
                const isDone = studentProfile.completedExercises.includes(q.id);
                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-slate-100 transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] font-bold">
                        <span className={`px-2 py-0.5 rounded-md ${
                          q.subject === 'tinhoc' ? 'bg-sky-100 text-sky-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {q.subject === 'tinhoc' ? 'Tin học' : 'Công nghệ'}
                        </span>
                        <span className="text-slate-400 font-normal">·</span>
                        <span className="text-slate-600 truncate">{q.topic}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
                        {q.questionText}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {isDone ? (
                        <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Đã xong</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveTab('exercises')}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-xs shadow-xs transition-colors"
                        >
                          Làm ngay
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* UPCOMING EXAMS */}
          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Bài Kiểm Tra Sắp Tới</h3>
                  <p className="text-xs text-slate-500">Thử thách tính giờ và nhận chứng nhận xuất sắc</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('exams')}
                className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1"
              >
                <span>Xem phòng thi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentGradeExams.length > 0 ? (
                currentGradeExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-4 rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50/50 to-pink-50/30 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-purple-800 mb-1">
                        <span>{exam.subject === 'tinhoc' ? 'Tin học' : 'Công nghệ'}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-purple-500" />
                          {exam.durationMinutes} phút
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-800 line-clamp-2">
                        {exam.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-purple-100/60">
                      <span className="text-xs text-slate-500 font-semibold">
                        {exam.questionCount} câu hỏi
                      </span>
                      <button
                        onClick={() => setActiveTab('exams')}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-colors"
                      >
                        Bắt đầu thi
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-6 text-xs text-slate-500 font-semibold bg-slate-50 rounded-2xl">
                  Chưa có bài kiểm tra mới cho Khối {selectedGrade}. Em hãy ôn luyện bài tập trước nhé!
                </div>
              )}
            </div>
          </div>

          {/* EDUCATIONAL PLAYGROUND TEASER BANNER */}
          <div className="rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 text-white p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-emerald-100">
                <Gamepad2 className="w-4 h-4" />
                <span>Khu vui chơi rèn luyện</span>
              </div>
              <h3 className="text-xl font-black">Vừa Chơi Vừa Nhớ Kiến Thức</h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-md">
                5 trò chơi thú vị: Ghép hình thiết bị, Bé an toàn điện & mạng, Sắp xếp thuật toán, Phân loại thiết bị và Thử thách chuột thần tốc!
              </p>
            </div>

            <button
              onClick={() => setActiveTab('games')}
              className="shrink-0 px-6 py-3 rounded-2xl bg-amber-300 hover:bg-amber-400 text-amber-950 font-extrabold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Chơi ngay 🎮
            </button>
          </div>

        </div>

        {/* Right Column: Achievements & Notices (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* BADGES & ACHIEVEMENTS */}
          <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Bộ Sưu Tập Huy Hiệu</h3>
                <p className="text-xs text-slate-500">Thành tích em đã đạt được</p>
              </div>
            </div>

            <div className="space-y-3">
              {studentProfile.earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/50 border border-amber-100"
                >
                  <span className="text-2xl p-1 bg-white rounded-xl shadow-xs">{badge.icon}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{badge.name}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-50 text-sky-900 text-xs font-semibold flex items-center justify-between">
              <span>Huy hiệu tiếp theo:</span>
              <span className="font-bold text-sky-700">Chuyên Gia Soạn Thảo (Lớp 4)</span>
            </div>
          </div>

          {/* TEACHER NOTICES */}
          <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Thông Báo Thầy Cô</h3>
                <p className="text-xs text-slate-500">Tin tức và lời nhắc nhở mới nhất</p>
              </div>
            </div>

            <div className="space-y-3">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-extrabold text-rose-600">{notice.date}</span>
                    {notice.important && (
                      <span className="px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-bold">
                        Quan trọng
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">
                    {notice.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};
