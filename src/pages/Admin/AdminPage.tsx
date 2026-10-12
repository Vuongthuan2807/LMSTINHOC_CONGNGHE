import React, { useState, useEffect, useRef } from 'react';
import {
  Settings,
  Plus,
  Trash2,
  Edit3,
  Search,
  Filter,
  Download,
  Upload,
  FileSpreadsheet,
  Image,
  Volume2,
  Database,
  BarChart3,
  BookOpen,
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  Eye,
  X,
  RotateCcw,
  Save,
  Play,
  FileCheck,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import {
  Question,
  Lesson,
  Exam,
  MediaItem,
  SubjectType,
  GradeLevel,
  QuestionType,
  DifficultyLevel,
} from '../../types';
import { dbService } from '../../services/db';
import {
  downloadSampleExcelTemplate,
  parseQuestionsFromExcel,
  exportQuestionsToExcel,
  ImportValidationResult,
} from '../../services/excel';
import { soundService } from '../../services/sound';

type AdminTab = 'questions' | 'media' | 'excel' | 'curriculum' | 'stats';

export const AdminPage: React.FC = () => {
  const {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    importQuestions,
    resetDefaultQuestions,
    lessons,
    addLesson,
    deleteLesson,
    exams,
    addExam,
    deleteExam,
    examAttempts,
    resetAllToFactoryDefault,
    importFullSystemBackup,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('questions');

  // Search & Filter state for Questions
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState<'all' | SubjectType>('all');
  const [filterGrade, setFilterGrade] = useState<'all' | GradeLevel>('all');
  const [filterType, setFilterType] = useState<'all' | QuestionType>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | DifficultyLevel>('all');

  // Modal states for Question form
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewQuestionData, setPreviewQuestionData] = useState<Question | null>(null);

  // Question Form Fields
  const [formData, setFormData] = useState<Partial<Question>>({
    code: '',
    subject: 'tinhoc',
    grade: 1,
    topic: '',
    lessonTitle: '',
    questionText: '',
    type: 'multiple_choice',
    options: ['', '', '', ''],
    correctAnswer: 'A',
    explanation: '',
    difficulty: 'nhan_biet',
    points: 1,
    imageUrl: '',
    audioUrl: '',
  });

  // Media Manager state
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Excel Import state
  const excelInputRef = useRef<HTMLInputElement>(null);
  const [importResult, setImportResult] = useState<ImportValidationResult | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccessMsg, setImportSuccessMsg] = useState<string | null>(null);

  // Load IndexedDB media
  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setMediaLoading(true);
    try {
      const items = await dbService.getAllMedia();
      setMediaList(items);
    } catch {
      // Ignore
    } finally {
      setMediaLoading(false);
    }
  };

  // Filtered Questions logic
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || q.subject === filterSubject;
    const matchesGrade = filterGrade === 'all' || q.grade === filterGrade;
    const matchesType = filterType === 'all' || q.type === filterType;
    const matchesDiff = filterDifficulty === 'all' || q.difficulty === filterDifficulty;
    return matchesSearch && matchesSubject && matchesGrade && matchesType && matchesDiff;
  });

  // Open Question Modal
  const handleOpenAddQuestion = () => {
    setEditingQuestion(null);
    setFormData({
      code: `TH_${Date.now().toString().slice(-4)}`,
      subject: 'tinhoc',
      grade: 1,
      topic: '',
      lessonTitle: '',
      questionText: '',
      type: 'multiple_choice',
      options: ['', '', '', ''],
      correctAnswer: 'A',
      explanation: '',
      difficulty: 'nhan_biet',
      points: 1,
      imageUrl: '',
      audioUrl: '',
    });
    setIsQuestionModalOpen(true);
  };

  const handleOpenEditQuestion = (q: Question) => {
    setEditingQuestion(q);
    setFormData({ ...q });
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = () => {
    if (!formData.questionText || !formData.code) {
      alert('Vui lòng nhập đầy đủ Mã câu hỏi và Nội dung câu hỏi!');
      return;
    }

    const questionToSave: Question = {
      id: editingQuestion ? editingQuestion.id : `q_${Date.now()}`,
      code: formData.code || `Q_${Date.now()}`,
      subject: (formData.subject as SubjectType) || 'tinhoc',
      grade: (formData.grade as GradeLevel) || 1,
      topic: formData.topic || 'Chủ đề chung',
      lessonTitle: formData.lessonTitle || 'Bài học cơ bản',
      questionText: formData.questionText || '',
      type: (formData.type as QuestionType) || 'multiple_choice',
      options: formData.type === 'multiple_choice' ? (formData.options || []) : formData.type === 'true_false' ? ['Đúng', 'Sai'] : [],
      correctAnswer: formData.correctAnswer || 'A',
      explanation: formData.explanation || '',
      difficulty: (formData.difficulty as DifficultyLevel) || 'nhan_biet',
      points: Number(formData.points) || 1,
      imageUrl: formData.imageUrl || '',
      audioUrl: formData.audioUrl || '',
      createdAt: editingQuestion?.createdAt || new Date().toISOString(),
    };

    if (editingQuestion) {
      updateQuestion(editingQuestion.id, questionToSave);
    } else {
      addQuestion(questionToSave);
    }

    soundService.playCorrect();
    setIsQuestionModalOpen(false);
  };

  const handleDeleteQuestionConfirm = (id: string, code: string) => {
    if (window.confirm(`Thầy/Cô có chắc chắn muốn xóa câu hỏi [${code}] không?`)) {
      deleteQuestion(id);
      soundService.playClick();
    }
  };

  // Media upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImg = file.type.startsWith('image/');
    const isAud = file.type.startsWith('audio/');

    if (!isImg && !isAud) {
      alert('Vui lòng chọn tệp hình ảnh (PNG, JPG, WebP) hoặc tệp âm thanh (MP3, WAV)!');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const newItem: MediaItem = {
        id: `media_${Date.now()}`,
        name: file.name,
        type: isImg ? 'image' : 'audio',
        size: file.size,
        dataUrl,
        uploadedAt: new Date().toISOString(),
      };

      await dbService.saveMedia(newItem);
      loadMedia();
      soundService.playCorrect();
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteMedia = async (id: string) => {
    if (window.confirm('Xóa tệp đa phương tiện này khỏi IndexedDB?')) {
      await dbService.deleteMedia(id);
      loadMedia();
      soundService.playClick();
    }
  };

  // Excel import handler
  const handleExcelFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    setImportSuccessMsg(null);

    try {
      const existingCodes = new Set(questions.map((q) => q.code));
      const res = await parseQuestionsFromExcel(file, existingCodes);
      setImportResult(res);
      if (res.validQuestions.length === 0 && res.invalidRows.length > 0) {
        setImportError(`Không tìm thấy dòng hợp lệ. Có ${res.invalidRows.length} dòng lỗi.`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setImportError(`Lỗi khi đọc file Excel: ${message}`);
    }
  };

  const handleConfirmImport = () => {
    if (!importResult || importResult.validQuestions.length === 0) return;

    const { addedCount } = importQuestions(importResult.validQuestions);
    setImportSuccessMsg(`Đã nhập thành công ${addedCount} câu hỏi mới vào hệ thống!`);
    setImportResult(null);
    soundService.playFanfare();
  };

  // Export handlers
  const handleExportAll = () => {
    exportQuestionsToExcel(questions, 'Toan_Bo_Cau_Hoi_Tin_Hoc_Cong_Nghe.xlsx');
  };

  const handleExportFiltered = () => {
    exportQuestionsToExcel(filteredQuestions, 'Cau_Hoi_Loc_Theo_Yeu_Cau.xlsx');
  };

  // System Backup / Restore JSON
  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      questions,
      lessons,
      exams,
      examAttempts,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SaoLuu_HocVui_HeThong_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRestoreBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (window.confirm('Khôi phục sẽ cập nhật dữ liệu từ file sao lưu. Tiếp tục?')) {
          importFullSystemBackup(parsed);
          alert('Khôi phục dữ liệu thành công!');
        }
      } catch {
        alert('File sao lưu JSON không đúng định dạng!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Top Banner & Tab Navigation */}
      <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
              <Settings className="w-3.5 h-3.5" />
              <span>Dành Cho Giáo Viên & Quản Trị</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Bảng Điều Khiển Giáo Viên
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Quản lý ngân hàng câu hỏi, bài học, tải lên tài nguyên đa phương tiện và nhập/xuất Excel
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl border">
              Lưu trữ cục bộ: IndexedDB & LocalStorage
            </span>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-100 pt-4">
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 ${
              activeTab === 'questions'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Ngân Hàng Câu Hỏi ({questions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('excel')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 ${
              activeTab === 'excel'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Nhập & Xuất Excel (XLSX)</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 ${
              activeTab === 'media'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Đa Phương Tiện ({mediaList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('curriculum')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 ${
              activeTab === 'curriculum'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Bài Học & Đề Thi</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 ${
              activeTab === 'stats'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Thống Kê & Sao Lưu</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          TAB 1: QUESTION BANK CRUD
          ======================================================== */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          
          {/* Controls: Search, Filters & Add Button */}
          <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Search bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã câu, nội dung, chủ đề..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold focus:border-sky-500 focus:outline-hidden bg-slate-50"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleOpenAddQuestion}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs shadow-md shadow-sky-500/20 transition-all hover:scale-102"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Câu Hỏi Mới</span>
                </button>

                <button
                  onClick={handleExportFiltered}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-colors"
                  title="Xuất các câu hỏi đang lọc ra Excel"
                >
                  <Download className="w-4 h-4" />
                  <span>Xuất Excel</span>
                </button>
              </div>

            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs font-bold text-slate-700">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Môn học</label>
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value as unknown as 'all' | SubjectType)}
                  className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="all">Tất cả môn</option>
                  <option value="tinhoc">Tin Học</option>
                  <option value="congnghe">Công Nghệ</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Khối lớp</label>
                <select
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value === 'all' ? 'all' : (Number(e.target.value) as GradeLevel))}
                  className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="all">Tất cả khối lớp</option>
                  <option value="1">Lớp 1</option>
                  <option value="2">Lớp 2</option>
                  <option value="3">Lớp 3</option>
                  <option value="4">Lớp 4</option>
                  <option value="5">Lớp 5</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Dạng câu hỏi</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as unknown as 'all' | QuestionType)}
                  className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="all">Tất cả dạng</option>
                  <option value="multiple_choice">Trắc nghiệm</option>
                  <option value="true_false">Đúng / Sai</option>
                  <option value="fill_in_blank">Điền khuyết</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Mức độ khó</label>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value as unknown as 'all' | DifficultyLevel)}
                  className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="all">Tất cả mức độ</option>
                  <option value="nhan_biet">Nhận biết</option>
                  <option value="thong_hieu">Thông hiểu</option>
                  <option value="van_dung">Vận dụng</option>
                </select>
              </div>
            </div>
          </div>

          {/* Questions Table */}
          <div className="bg-white rounded-3xl border border-sky-100 shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Hiển thị {filteredQuestions.length} / {questions.length} câu hỏi</span>
              <button
                onClick={resetDefaultQuestions}
                className="text-xs text-sky-600 hover:underline flex items-center gap-1 font-extrabold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Nạp lại bộ câu hỏi mẫu gốc</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider">
                    <th className="py-3 px-4">Mã</th>
                    <th className="py-3 px-4">Môn & Lớp</th>
                    <th className="py-3 px-4">Chủ đề</th>
                    <th className="py-3 px-4 max-w-sm">Nội dung câu hỏi</th>
                    <th className="py-3 px-4">Dạng & Mức độ</th>
                    <th className="py-3 px-4">Đáp án</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredQuestions.map((q) => (
                    <tr key={q.id} className="hover:bg-sky-50/30 transition-colors font-medium text-slate-700">
                      <td className="py-3.5 px-4 font-black text-slate-900">{q.code}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                          q.subject === 'tinhoc' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {q.subject === 'tinhoc' ? 'Tin' : 'Công nghệ'} - L{q.grade}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 truncate max-w-[140px]">{q.topic}</td>
                      <td className="py-3.5 px-4 max-w-sm">
                        <p className="font-bold text-slate-900 line-clamp-2">{q.questionText}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <span className="block text-[10px] uppercase font-bold text-slate-400">
                            {q.type === 'multiple_choice' ? 'Trắc nghiệm' : q.type === 'true_false' ? 'Đúng/Sai' : 'Điền khuyết'}
                          </span>
                          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                            {q.difficulty === 'nhan_biet' ? 'Nhận biết' : q.difficulty === 'thong_hieu' ? 'Thông hiểu' : 'Vận dụng'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-black">
                          {q.correctAnswer}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setPreviewQuestionData(q);
                            setIsPreviewModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                          title="Xem trước"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleOpenEditQuestion(q)}
                          className="p-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteQuestionConfirm(q.id, q.code)}
                          className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredQuestions.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Không tìm thấy câu hỏi nào phù hợp với bộ lọc.
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================
          TAB 2: EXCEL IMPORT & EXPORT (XLSX)
          ======================================================== */}
      {activeTab === 'excel' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-xs space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Nhập & Xuất Dữ Liệu Câu Hỏi Bằng Excel
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Hỗ trợ tệp XLSX chuẩn tiếng Việt, tự động kiểm tra cú pháp, phát hiện lỗi và xem trước
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={downloadSampleExcelTemplate}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-black text-xs transition-colors"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Tải File Excel Mẫu (.XLSX)</span>
              </button>

              <button
                onClick={handleExportAll}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-all hover:scale-102"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Xuất Toàn Bộ ({questions.length} câu)</span>
              </button>
            </div>
          </div>

          {/* File Picker Section */}
          <div className="p-8 rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 text-center space-y-4">
            <FileSpreadsheet className="w-12 h-12 text-emerald-600 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-slate-900">
                Chọn File Excel (.xlsx) Để Nhập Vào Ngân Hàng Câu Hỏi
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Hệ thống sẽ kiểm tra từng dòng, báo cáo các dòng hợp lệ/lỗi và cho phép xem trước trước khi lưu.
              </p>
            </div>

            <input
              type="file"
              ref={excelInputRef}
              accept=".xlsx,.xls"
              onChange={handleExcelFileSelect}
              className="hidden"
            />

            <button
              onClick={() => excelInputRef.current?.click()}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105"
            >
              Chọn tệp từ máy tính 📂
            </button>
          </div>

          {/* Feedback & Error / Success Messages */}
          {importError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{importError}</span>
            </div>
          )}

          {importSuccessMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{importSuccessMsg}</span>
            </div>
          )}

          {/* PREVIEW IMPORTED ROWS TABLE */}
          {importResult && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-black text-base text-slate-900">
                    Kết Quả Kiểm Tra Dữ Liệu Excel
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="text-emerald-700">✓ {importResult.validQuestions.length} dòng hợp lệ</span>
                    <span className="text-rose-600">⚠ {importResult.invalidRows.length} dòng lỗi</span>
                    <span className="text-slate-400">Tổng: {importResult.totalRows} dòng</span>
                  </div>
                </div>

                {importResult.validQuestions.length > 0 && (
                  <button
                    onClick={handleConfirmImport}
                    className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20"
                  >
                    Xác nhận nhập {importResult.validQuestions.length} câu hỏi vào hệ thống 🚀
                  </button>
                )}
              </div>

              {/* Invalid Rows Report */}
              {importResult.invalidRows.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                  <div className="text-xs font-black text-rose-900 uppercase">
                    Danh sách các dòng không hợp lệ:
                  </div>
                  <ul className="list-disc pl-5 text-xs text-rose-700 space-y-1 font-semibold">
                    {importResult.invalidRows.slice(0, 5).map((row, i) => (
                      <li key={i}>
                        Dòng {row.rowNumber}: {row.reason}
                      </li>
                    ))}
                    {importResult.invalidRows.length > 5 && (
                      <li>...và {importResult.invalidRows.length - 5} dòng khác</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Live Preview of Valid Questions */}
              {importResult.validQuestions.length > 0 && (
                <div className="border border-slate-200 rounded-2xl overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 font-bold border-b">
                        <th className="py-2.5 px-3">Mã</th>
                        <th className="py-2.5 px-3">Môn & Lớp</th>
                        <th className="py-2.5 px-3">Nội dung câu hỏi</th>
                        <th className="py-2.5 px-3">Đáp án</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {importResult.validQuestions.slice(0, 5).map((vq, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-bold">{vq.code}</td>
                          <td className="py-2 px-3">{vq.subject === 'tinhoc' ? 'Tin' : 'Công nghệ'} - L{vq.grade}</td>
                          <td className="py-2 px-3 font-semibold text-slate-800 line-clamp-1">{vq.questionText}</td>
                          <td className="py-2 px-3 font-bold text-emerald-700">{vq.correctAnswer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {importResult.validQuestions.length > 5 && (
                    <div className="p-2 text-center text-slate-400 text-[11px] font-semibold bg-slate-50">
                      Đang hiển thị 5 câu mẫu trên tổng số {importResult.validQuestions.length} câu hợp lệ.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* ========================================================
          TAB 3: MEDIA STORAGE (INDEXEDDB)
          ======================================================== */}
      {activeTab === 'media' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Quản Lý Hình Ảnh & Âm Thanh (IndexedDB)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Tệp được lưu trữ trực tiếp trong cơ sở dữ liệu IndexedDB của trình duyệt để không làm đầy LocalStorage
              </p>
            </div>

            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*,audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md shadow-purple-600/20"
              >
                <Upload className="w-4 h-4" />
                <span>Tải Lên Tệp Mới</span>
              </button>
            </div>
          </div>

          {/* Media Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mediaList.map((m) => (
              <div
                key={m.id}
                className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-2 group"
              >
                <div className="h-28 rounded-xl bg-white border border-slate-100 overflow-hidden flex items-center justify-center">
                  {m.type === 'image' ? (
                    <img
                      src={m.dataUrl}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-purple-600">
                      <Volume2 className="w-8 h-8" />
                      <audio controls src={m.dataUrl} className="w-24 h-6 scale-75 mt-1" />
                    </div>
                  )}
                </div>

                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-800 truncate" title={m.name}>
                    {m.name}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {(m.size / 1024).toFixed(1)} KB · {m.type}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(m.dataUrl);
                      alert('Đã sao chép đường dẫn Base64 của tệp!');
                    }}
                    className="text-[10px] font-bold text-sky-600 hover:underline"
                  >
                    Sao chép link
                  </button>
                  <button
                    onClick={() => handleDeleteMedia(m.id)}
                    className="p-1 rounded-md text-rose-600 hover:bg-rose-50"
                    title="Xóa tệp"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {mediaList.length === 0 && !mediaLoading && (
            <div className="py-12 text-center text-slate-400 text-xs">
              Chưa có tệp đa phương tiện nào được tải lên trong IndexedDB.
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 4: CURRICULUM (LESSONS & EXAMS)
          ======================================================== */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Lessons overview */}
            <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-lg text-slate-900">Danh Mục Bài Học ({lessons.length})</h3>
                  <p className="text-xs text-slate-500">Các bài giảng theo chuẩn GDPT 2018</p>
                </div>
              </div>

              <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
                {lessons.map((les) => (
                  <div
                    key={les.id}
                    className="p-3 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-black text-amber-900">
                        <span className="px-1.5 py-0.5 rounded-md bg-amber-200 text-amber-900 text-[10px]">
                          {les.bookType?.toUpperCase() || 'SGK'}
                        </span>
                        <span>{les.subject === 'tinhoc' ? 'Tin' : 'Công nghệ'} - L{les.grade}:</span>
                        <span className="truncate">{les.lessonNumber ? `${les.lessonNumber}: ` : ''}{les.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{les.bookName} · {les.topic} · {les.durationMinutes}p</div>
                    </div>

                    <button
                      onClick={() => {
                        if (window.confirm(`Xóa bài học "${les.title}"?`)) {
                          deleteLesson(les.id);
                        }
                      }}
                      className="p-1 rounded-md text-rose-500 hover:bg-rose-100 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Exams overview */}
            <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-lg text-slate-900">Đề Thi Định Kỳ ({exams.length})</h3>
                  <p className="text-xs text-slate-500">Đề kiểm tra giữa kỳ, cuối kỳ đã tạo</p>
                </div>
              </div>

              <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
                {exams.map((ex) => (
                  <div
                    key={ex.id}
                    className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="font-black text-purple-950 truncate">{ex.title}</div>
                      <div className="text-[11px] text-slate-500">
                        {ex.subject === 'tinhoc' ? 'Tin Học' : 'Công Nghệ'} Lớp {ex.grade} · {ex.questionCount} câu · {ex.durationMinutes} phút
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (window.confirm(`Xóa đề thi "${ex.title}"?`)) {
                          deleteExam(ex.id);
                        }
                      }}
                      className="p-1 rounded-md text-rose-500 hover:bg-rose-100 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: STATISTICS & BACKUP
          ======================================================== */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-sky-100 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-400">Tổng số câu hỏi</span>
              <div className="text-2xl sm:text-3xl font-black text-sky-600 tabular-nums">
                {questions.length}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-400">Môn Tin Học / Công Nghệ</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 tabular-nums">
                {questions.filter((q) => q.subject === 'tinhoc').length} / {questions.filter((q) => q.subject === 'congnghe').length}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-amber-100 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-400">Tổng số bài học</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-500 tabular-nums">
                {lessons.length}
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-1">
              <span className="text-xs font-bold text-slate-400">Lượt thi đã lưu</span>
              <div className="text-2xl sm:text-3xl font-black text-purple-600 tabular-nums">
                {examAttempts.length}
              </div>
            </div>
          </div>

          {/* Backup & Factory Reset Controls */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h3 className="font-black text-lg text-slate-900">
              Sao Lưu & Khôi Phục Toàn Diện Hệ Thống
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              Vì website hoạt động hoàn toàn trên thiết bị (client-side), quý Thầy/Cô có thể xuất toàn bộ câu hỏi, bài học và lịch sử ra file JSON để sao lưu hoặc chuyển đổi sang máy tính khác.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleExportBackup}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Xuất Bản Sao Lưu (.JSON)</span>
              </button>

              <label className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Nhập Bản Sao Lưu (.JSON)</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleRestoreBackup}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => {
                  if (window.confirm('CẢNH BÁO: Thao tác này sẽ đặt lại toàn bộ câu hỏi, bài học và tiến độ về dữ liệu mẫu ban đầu. Tiếp tục?')) {
                    resetAllToFactoryDefault();
                    alert('Đã khôi phục dữ liệu gốc!');
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Đặt lại dữ liệu gốc ban đầu</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================
          QUESTION ADD/EDIT MODAL
          ======================================================== */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-black text-slate-900">
                {editingQuestion ? 'Chỉnh Sửa Câu Hỏi' : 'Thêm Câu Hỏi Mới'}
              </h3>
              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1 text-slate-500">Mã câu hỏi *</label>
                <input
                  type="text"
                  value={formData.code || ''}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="Ví dụ: TH3_05"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-500">Môn học *</label>
                <select
                  value={formData.subject || 'tinhoc'}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value as SubjectType })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                >
                  <option value="tinhoc">Tin Học</option>
                  <option value="congnghe">Công Nghệ</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-slate-500">Khối lớp *</label>
                <select
                  value={formData.grade || 1}
                  onChange={(e) => setFormData({ ...formData, grade: Number(e.target.value) as GradeLevel })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                >
                  {[1, 2, 3, 4, 5].map((g) => (
                    <option key={g} value={g}>Khối Lớp {g}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-1 text-slate-500">Chủ đề</label>
                <input
                  type="text"
                  value={formData.topic || ''}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="Ví dụ: Bàn phím và chuột"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-500">Mức độ khó</label>
                <select
                  value={formData.difficulty || 'nhan_biet'}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as DifficultyLevel })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                >
                  <option value="nhan_biet">Nhận biết</option>
                  <option value="thong_hieu">Thông hiểu</option>
                  <option value="van_dung">Vận dụng</option>
                </select>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-xs font-bold text-slate-700">
              <label className="block mb-1 text-slate-500">Nội dung câu hỏi *</label>
              <textarea
                rows={3}
                value={formData.questionText || ''}
                onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
                placeholder="Nhập nội dung câu hỏi dành cho học sinh..."
                className="w-full p-3 rounded-2xl border border-slate-200 font-semibold"
              />
            </div>

            {/* Question Type */}
            <div className="text-xs font-bold text-slate-700">
              <label className="block mb-1 text-slate-500">Dạng câu hỏi</label>
              <select
                value={formData.type || 'multiple_choice'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as QuestionType })}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              >
                <option value="multiple_choice">Trắc nghiệm 4 lựa chọn</option>
                <option value="true_false">Đúng / Sai</option>
                <option value="fill_in_blank">Điền từ vào chỗ trống</option>
              </select>
            </div>

            {/* Multiple Choice Options */}
            {formData.type === 'multiple_choice' && (
              <div className="space-y-2 text-xs font-bold text-slate-700">
                <label className="block text-slate-500">Các phương án lựa chọn:</label>
                {['A', 'B', 'C', 'D'].map((letter, idx) => (
                  <div key={letter} className="flex items-center gap-2">
                    <span className="w-6 font-black text-slate-600">{letter}.</span>
                    <input
                      type="text"
                      value={formData.options?.[idx] || ''}
                      onChange={(e) => {
                        const newOpts = [...(formData.options || ['', '', '', ''])];
                        newOpts[idx] = e.target.value;
                        setFormData({ ...formData, options: newOpts });
                      }}
                      placeholder={`Nội dung phương án ${letter}`}
                      className="flex-1 p-2 rounded-xl border border-slate-200 font-medium"
                    />
                  </div>
                ))}

                <div className="pt-2">
                  <label className="block mb-1 text-slate-500">Đáp án đúng</label>
                  <select
                    value={formData.correctAnswer || 'A'}
                    onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                    className="w-32 p-2 rounded-xl border border-slate-200 font-black text-emerald-800"
                  >
                    <option value="A">Phương án A</option>
                    <option value="B">Phương án B</option>
                    <option value="C">Phương án C</option>
                    <option value="D">Phương án D</option>
                  </select>
                </div>
              </div>
            )}

            {/* True/False Options */}
            {formData.type === 'true_false' && (
              <div className="text-xs font-bold text-slate-700">
                <label className="block mb-1 text-slate-500">Đáp án đúng</label>
                <select
                  value={formData.correctAnswer || 'Đúng'}
                  onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                  className="w-32 p-2 rounded-xl border border-slate-200 font-black text-emerald-800"
                >
                  <option value="Đúng">Đúng</option>
                  <option value="Sai">Sai</option>
                </select>
              </div>
            )}

            {/* Fill in Blank Option */}
            {formData.type === 'fill_in_blank' && (
              <div className="text-xs font-bold text-slate-700">
                <label className="block mb-1 text-slate-500">Từ / cụm từ chính xác cần điền</label>
                <input
                  type="text"
                  value={formData.correctAnswer || ''}
                  onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                  placeholder="Ví dụ: CPU hoặc Thân máy"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
            )}

            {/* Explanation */}
            <div className="text-xs font-bold text-slate-700">
              <label className="block mb-1 text-slate-500">Giải thích đáp án</label>
              <textarea
                rows={2}
                value={formData.explanation || ''}
                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                placeholder="Giải thích ngắn gọn, dễ hiểu cho học sinh..."
                className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Hủy bỏ
              </button>

              <button
                onClick={handleSaveQuestion}
                className="px-6 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-black shadow-md shadow-sky-500/20"
              >
                Lưu Câu Hỏi 💾
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          PREVIEW QUESTION MODAL
          ======================================================== */}
      {isPreviewModalOpen && previewQuestionData && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-xs font-black text-sky-600 uppercase">
                Xem Trước Câu Hỏi [{previewQuestionData.code}]
              </span>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400">
                {previewQuestionData.subject === 'tinhoc' ? 'Tin Học' : 'Công Nghệ'} - Lớp {previewQuestionData.grade} · {previewQuestionData.topic}
              </div>
              <h4 className="text-lg font-black text-slate-900 leading-snug">
                {previewQuestionData.questionText}
              </h4>

              {previewQuestionData.type === 'multiple_choice' && (
                <div className="space-y-2 pt-2">
                  {previewQuestionData.options.map((opt, i) => {
                    const letter = String.fromCharCode(65 + i);
                    const isRight = letter === previewQuestionData.correctAnswer;
                    return (
                      <div
                        key={i}
                        className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                          isRight ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="w-5">{letter}.</span>
                        <span>{opt}</span>
                        {isRight && <span className="ml-auto text-emerald-600">✓ Đáp án đúng</span>}
                      </div>
                    );
                  })}
                </div>
              )}

              {previewQuestionData.explanation && (
                <div className="p-3 rounded-xl bg-amber-50 text-amber-900 text-xs font-medium border border-amber-200">
                  <span className="font-bold">Giải thích: </span>
                  {previewQuestionData.explanation}
                </div>
              )}
            </div>

            <div className="pt-3 border-t text-right">
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
