import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  CheckSquare,
  ClipboardList,
  Gamepad2,
  Settings,
  Volume2,
  VolumeX,
  Star,
  Flame,
  Home,
  GraduationCap,
  Menu,
  X,
  Camera,
} from 'lucide-react';
import { useAppStore, TabType } from '../../store/useAppStore';
import { GradeLevel } from '../../types';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    studentProfile,
    soundEnabled,
    toggleSound,
    selectedGrade,
    setSelectedGrade,
  } = useAppStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showGradeDropdown, setShowGradeDropdown] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Trang chủ', icon: <Home className="w-4 h-4" /> },
    { id: 'lessons', label: 'Bài học', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'exercises', label: 'Bài tập', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'exams', label: 'Kiểm tra', icon: <ClipboardList className="w-4 h-4" /> },
    { id: 'games', label: 'Khu vui chơi', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'ai-games', label: 'AI Chụp Sách Tạo Game', icon: <Camera className="w-4 h-4" /> },
    { id: 'admin', label: 'Quản trị GV', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* ZONE 1: BRAND LOGO & TITLE */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 text-left focus:outline-hidden group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl text-sky-900 tracking-tight leading-tight">
                    HỌC VUI
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                    Lớp 1-5
                  </span>
                </div>
                <p className="text-xs font-semibold text-sky-600">
                  Tin học & Công nghệ Tiểu học
                </p>
              </div>
            </button>

            {/* Quick Grade Badge / Selector */}
            <div className="relative ml-2 hidden lg:block">
              <button
                onClick={() => setShowGradeDropdown(!showGradeDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-lg text-xs font-bold border border-sky-200 transition-colors"
                title="Chọn khối lớp"
              >
                <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                <span>Lớp {selectedGrade}</span>
              </button>

              {showGradeDropdown && (
                <div className="absolute left-0 mt-1 w-32 bg-white rounded-xl shadow-xl border border-sky-100 py-1.5 z-50">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Chọn khối lớp
                  </div>
                  {([1, 2, 3, 4, 5] as GradeLevel[]).map((grade) => (
                    <button
                      key={grade}
                      onClick={() => {
                        setSelectedGrade(grade);
                        setShowGradeDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-bold flex items-center justify-between hover:bg-sky-50 transition-colors ${
                        selectedGrade === grade ? 'text-sky-600 bg-sky-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>Khối Lớp {grade}</span>
                      {selectedGrade === grade && <span className="text-sky-500">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ZONE 2: NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-[1.02]'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: ACTIONS & STUDENT STATUS */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Stars Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span className="font-extrabold text-sm tabular-nums">
                {studentProfile.totalStars}
              </span>
              <span className="text-[11px] font-bold text-amber-600 hidden sm:inline">Sao</span>
            </div>

            {/* Streak Counter */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-orange-50 border border-orange-200 rounded-xl text-orange-700">
              <Flame className="w-4 h-4 fill-orange-400 text-orange-500" />
              <span className="font-bold text-xs tabular-nums">{studentProfile.streakDays} ngày</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-colors ${
                soundEnabled
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
              }`}
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
              aria-label="Cài đặt âm thanh"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Student Avatar */}
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 bg-sky-50 border border-sky-200 rounded-xl hover:bg-sky-100 transition-colors"
              title="Hồ sơ học sinh"
            >
              <span className="text-xl" role="img" aria-label="avatar">
                {studentProfile.avatar}
              </span>
              <span className="text-xs font-bold text-slate-700 hidden lg:inline max-w-[80px] truncate">
                {studentProfile.name}
              </span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* MOBILE MENU ACCORDION */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-sky-100 bg-white">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {([1, 2, 3, 4, 5] as GradeLevel[]).map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold border ${
                    selectedGrade === grade
                      ? 'bg-sky-500 text-white border-sky-500'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Khối Lớp {grade}
                </button>
              ))}
            </div>

            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-left transition-colors ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-sky-50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
