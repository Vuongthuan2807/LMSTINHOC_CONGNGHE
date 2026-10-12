export type SubjectType = 'tinhoc' | 'congnghe';
export type GradeLevel = 1 | 2 | 3 | 4 | 5;
export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_in_blank';
export type DifficultyLevel = 'nhan_biet' | 'thong_hieu' | 'van_dung';
export type BookCategory = 'sgk' | 'sgv' | 'sbt'; // Sách giáo khoa, Sách giáo viên, Vở bài tập

export interface Question {
  id: string;
  code: string;
  subject: SubjectType;
  grade: GradeLevel;
  topic: string;
  lessonTitle: string;
  questionText: string;
  type: QuestionType;
  options: string[]; // For multiple_choice: 4 options; for true_false: ['Đúng', 'Sai']; for fill_in_blank: hints
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D' or 'Đúng' | 'Sai' or text string
  explanation: string;
  difficulty: DifficultyLevel;
  points: number;
  imageUrl?: string;
  audioUrl?: string;
  createdAt: string;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  keyTakeaway: string;
  visualType?: 'computer' | 'mouse' | 'keyboard' | 'monitor' | 'internet' | 'safety' | 'tool' | 'circuit' | 'robot';
  imageUrl?: string;
}

export interface Lesson {
  id: string;
  subject: SubjectType;
  grade: GradeLevel;
  bookType: BookCategory; // 'sgk' | 'sgv' | 'sbt'
  bookName: string; // e.g. "Sách Giáo Khoa", "Sách Giáo Viên", "Vở Bài Tập"
  topic: string;
  lessonNumber: string; // e.g. "Bài 1", "Bài 2"
  title: string;
  description: string;
  durationMinutes: number;
  order: number;
  iconName: string;
  objectives?: string[]; // Yêu cầu cần đạt / Mục tiêu
  sections: LessonSection[];
  reviewQuestions: Question[]; // Các bài tập ôn luyện gắn liền với bài học
  completed?: boolean;
}

export interface Exam {
  id: string;
  title: string;
  subject: SubjectType;
  grade: GradeLevel;
  durationMinutes: number;
  questionCount: number;
  questionIds?: string[];
  createdAt: string;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  examTitle: string;
  subject: SubjectType;
  grade: GradeLevel;
  score: number;
  maxScore: number;
  correctCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  completedAt: string;
  userAnswers: Record<string, string>;
}

export interface StudentProfile {
  name: string;
  grade: GradeLevel;
  avatar: string;
  totalStars: number;
  streakDays: number;
  completedLessons: string[];
  completedExercises: string[];
  earnedBadges: {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt: string;
  }[];
}

export interface TeacherNotice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'tintuc' | 'nhacnho' | 'khenthuong';
  important?: boolean;
}

export interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'audio';
  size: number;
  dataUrl: string;
  uploadedAt: string;
}
