import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Question,
  Lesson,
  Exam,
  ExamAttempt,
  StudentProfile,
  TeacherNotice,
  SubjectType,
  GradeLevel,
  BookCategory,
} from '../types';
import {
  initialQuestions,
  initialLessons,
  initialExams,
  initialStudentProfile,
  initialNotices,
} from '../data/initialData';
import { soundService } from '../services/sound';

export type TabType = 'home' | 'lessons' | 'exercises' | 'exams' | 'games' | 'ai-games' | 'admin';

interface AppState {
  // Navigation & Preferences
  activeTab: TabType;
  selectedGrade: GradeLevel;
  selectedSubject: SubjectType;
  selectedBookType: 'all' | BookCategory;
  soundEnabled: boolean;

  // Domain Data
  questions: Question[];
  lessons: Lesson[];
  exams: Exam[];
  examAttempts: ExamAttempt[];
  studentProfile: StudentProfile;
  notices: TeacherNotice[];

  // Actions
  setActiveTab: (tab: TabType) => void;
  setSelectedGrade: (grade: GradeLevel) => void;
  setSelectedSubject: (subject: SubjectType) => void;
  setSelectedBookType: (bookType: 'all' | BookCategory) => void;
  toggleSound: () => void;

  // Question Management
  addQuestion: (question: Question) => void;
  updateQuestion: (id: string, updated: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  importQuestions: (newQuestions: Question[]) => { addedCount: number };
  resetDefaultQuestions: () => void;

  // Lesson Management
  addLesson: (lesson: Lesson) => void;
  updateLesson: (id: string, updated: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;
  markLessonCompleted: (lessonId: string) => void;

  // Exam Management
  addExam: (exam: Exam) => void;
  updateExam: (id: string, updated: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  saveExamAttempt: (attempt: ExamAttempt) => void;

  // Student Profile & Gamification
  addStars: (amount: number) => void;
  markExerciseCompleted: (questionId: string) => void;
  updateProfile: (updated: Partial<StudentProfile>) => void;

  // Notice Management
  addNotice: (notice: TeacherNotice) => void;
  deleteNotice: (id: string) => void;

  // Full System Reset / Restore
  resetAllToFactoryDefault: () => void;
  importFullSystemBackup: (backupState: Partial<AppState>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeTab: 'home',
      selectedGrade: 4,
      selectedSubject: 'tinhoc',
      selectedBookType: 'all',
      soundEnabled: soundService.isEnabled(),

      questions: initialQuestions,
      lessons: initialLessons,
      exams: initialExams,
      examAttempts: [],
      studentProfile: initialStudentProfile,
      notices: initialNotices,

      setActiveTab: (tab) => {
        soundService.playClick();
        set({ activeTab: tab });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },

      setSelectedGrade: (grade) => {
        soundService.playClick();
        set({ selectedGrade: grade });
      },

      setSelectedSubject: (subject) => {
        soundService.playClick();
        set({ selectedSubject: subject });
      },

      setSelectedBookType: (bookType) => {
        soundService.playClick();
        set({ selectedBookType: bookType });
      },

      toggleSound: () => {
        const next = soundService.toggle();
        set({ soundEnabled: next });
      },

      addQuestion: (question) => {
        set((state) => ({
          questions: [question, ...state.questions],
        }));
      },

      updateQuestion: (id, updated) => {
        set((state) => ({
          questions: state.questions.map((q) => (q.id === id ? { ...q, ...updated } : q)),
        }));
      },

      deleteQuestion: (id) => {
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        }));
      },

      importQuestions: (newQuestions) => {
        const current = get().questions;
        const currentCodes = new Set(current.map((q) => q.code));
        const filteredNew = newQuestions.filter((q) => !currentCodes.has(q.code));
        set({ questions: [...filteredNew, ...current] });
        return { addedCount: filteredNew.length };
      },

      resetDefaultQuestions: () => {
        set({ questions: initialQuestions });
      },

      addLesson: (lesson) => {
        set((state) => ({
          lessons: [...state.lessons, lesson],
        }));
      },

      updateLesson: (id, updated) => {
        set((state) => ({
          lessons: state.lessons.map((l) => (l.id === id ? { ...l, ...updated } : l)),
        }));
      },

      deleteLesson: (id) => {
        set((state) => ({
          lessons: state.lessons.filter((l) => l.id !== id),
        }));
      },

      markLessonCompleted: (lessonId) => {
        const profile = get().studentProfile;
        if (!profile.completedLessons.includes(lessonId)) {
          const updatedCompleted = [...profile.completedLessons, lessonId];
          const newStars = profile.totalStars + 15;
          set({
            studentProfile: {
              ...profile,
              completedLessons: updatedCompleted,
              totalStars: newStars,
            },
          });
        }
      },

      addExam: (exam) => {
        set((state) => ({
          exams: [exam, ...state.exams],
        }));
      },

      updateExam: (id, updated) => {
        set((state) => ({
          exams: state.exams.map((e) => (e.id === id ? { ...e, ...updated } : e)),
        }));
      },

      deleteExam: (id) => {
        set((state) => ({
          exams: state.exams.filter((e) => e.id !== id),
        }));
      },

      saveExamAttempt: (attempt) => {
        set((state) => {
          const profile = state.studentProfile;
          const starsEarned = Math.round(attempt.score);
          return {
            examAttempts: [attempt, ...state.examAttempts],
            studentProfile: {
              ...profile,
              totalStars: profile.totalStars + starsEarned,
            },
          };
        });
      },

      addStars: (amount) => {
        set((state) => ({
          studentProfile: {
            ...state.studentProfile,
            totalStars: Math.max(0, state.studentProfile.totalStars + amount),
          },
        }));
      },

      markExerciseCompleted: (questionId) => {
        const profile = get().studentProfile;
        if (!profile.completedExercises.includes(questionId)) {
          set({
            studentProfile: {
              ...profile,
              completedExercises: [...profile.completedExercises, questionId],
              totalStars: profile.totalStars + 5,
            },
          });
        }
      },

      updateProfile: (updated) => {
        set((state) => ({
          studentProfile: {
            ...state.studentProfile,
            ...updated,
          },
        }));
      },

      addNotice: (notice) => {
        set((state) => ({
          notices: [notice, ...state.notices],
        }));
      },

      deleteNotice: (id) => {
        set((state) => ({
          notices: state.notices.filter((n) => n.id !== id),
        }));
      },

      resetAllToFactoryDefault: () => {
        set({
          questions: initialQuestions,
          lessons: initialLessons,
          exams: initialExams,
          examAttempts: [],
          studentProfile: initialStudentProfile,
          notices: initialNotices,
        });
      },

      importFullSystemBackup: (backup) => {
        set((state) => ({
          ...state,
          ...(backup.questions && { questions: backup.questions }),
          ...(backup.lessons && { lessons: backup.lessons }),
          ...(backup.exams && { exams: backup.exams }),
          ...(backup.studentProfile && { studentProfile: backup.studentProfile }),
          ...(backup.examAttempts && { examAttempts: backup.examAttempts }),
          ...(backup.notices && { notices: backup.notices }),
        }));
      },
    }),
    {
      name: 'hocvui_tinhoc_app_storage_v2', // bumped to v2 to ensure fresh state with books
    }
  )
);
