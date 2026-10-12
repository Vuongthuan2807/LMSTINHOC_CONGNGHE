import * as XLSX from 'xlsx';
import { Question, SubjectType, GradeLevel, QuestionType, DifficultyLevel } from '../types';

export interface ExcelRow {
  'Mã câu hỏi': string | number;
  'Môn học'?: string; // 'tinhoc' | 'congnghe' | 'Tin học' | 'Công nghệ'
  'Khối lớp'?: string | number; // 1 to 5
  'Chủ đề'?: string;
  'Bài học'?: string;
  'Dạng câu hỏi'?: string; // 'trac_nghiem' | 'dung_sai' | 'dien_khuyet'
  'Nội dung câu hỏi'?: string;
  'Phương án A'?: string;
  'Phương án B'?: string;
  'Phương án C'?: string;
  'Phương án D'?: string;
  'Đáp án đúng'?: string; // 'A' | 'B' | 'C' | 'D' | 'Đúng' | 'Sai'
  'Giải thích'?: string;
  'Mức độ'?: string; // 'nhan_biet' | 'thong_hieu' | 'van_dung'
  'Điểm số'?: string | number;
}

export interface ImportValidationResult {
  validQuestions: Question[];
  invalidRows: { rowNumber: number; reason: string; rawData: unknown }[];
  duplicateCodes: string[];
  totalRows: number;
}

export function downloadSampleExcelTemplate(): void {
  const sampleData = [
    {
      'Mã câu hỏi': 'TH1_01',
      'Môn học': 'Tin học',
      'Khối lớp': 1,
      'Chủ đề': 'Làm quen với máy tính',
      'Bài học': 'Các bộ phận cơ bản của máy tính',
      'Dạng câu hỏi': 'trac_nghiem',
      'Nội dung câu hỏi': 'Bộ phận nào của máy tính dùng để hiển thị hình ảnh và chữ viết?',
      'Phương án A': 'Bàn phím',
      'Phương án B': 'Màn hình',
      'Phương án C': 'Chuột máy tính',
      'Phương án D': 'Loa máy tính',
      'Đáp án đúng': 'B',
      'Giải thích': 'Màn hình là bộ phận xuất hình ảnh, giúp em nhìn thấy kết quả làm việc.',
      'Mức độ': 'nhan_biet',
      'Điểm số': 1,
    },
    {
      'Mã câu hỏi': 'CN1_01',
      'Môn học': 'Công nghệ',
      'Khối lớp': 1,
      'Chủ đề': 'Công nghệ và đời sống',
      'Bài học': 'Thiết bị công nghệ trong gia đình',
      'Dạng câu hỏi': 'trac_nghiem',
      'Nội dung câu hỏi': 'Thiết bị nào trong nhà dùng để giữ lạnh và bảo quản thức ăn tươi ngon?',
      'Phương án A': 'Quạt điện',
      'Phương án B': 'Nồi cơm điện',
      'Phương án C': 'Tủ lạnh',
      'Phương án D': 'Đèn bàn',
      'Đáp án đúng': 'C',
      'Giải thích': 'Tủ lạnh giúp làm mát và bảo quản đồ ăn không bị hỏng.',
      'Mức độ': 'nhan_biet',
      'Điểm số': 1,
    },
    {
      'Mã câu hỏi': 'TH3_01',
      'Môn học': 'Tin học',
      'Khối lớp': 3,
      'Chủ đề': 'Thông tin và xử lý thông tin',
      'Bài học': 'Thông tin xung quanh ta',
      'Dạng câu hỏi': 'dung_sai',
      'Nội dung câu hỏi': 'Tiếng chuông báo thức reo vào buổi sáng là thông tin dạng âm thanh.',
      'Phương án A': 'Đúng',
      'Phương án B': 'Sai',
      'Phương án C': '',
      'Phương án D': '',
      'Đáp án đúng': 'Đúng',
      'Giải thích': 'Tiếng chuông là âm thanh giúp tai ta tiếp nhận thông tin để thức dậy.',
      'Mức độ': 'thong_hieu',
      'Điểm số': 1,
    },
    {
      'Mã câu hỏi': 'CN3_01',
      'Môn học': 'Công nghệ',
      'Khối lớp': 3,
      'Chủ đề': 'An toàn điện',
      'Bài học': 'Sử dụng điện an toàn trong gia đình',
      'Dạng câu hỏi': 'trac_nghiem',
      'Nội dung câu hỏi': 'Khi tay đang bị ướt nước, em cần làm gì trước khi chạm vào công tắc điện?',
      'Phương án A': 'Bật công tắc ngay lập tức',
      'Phương án B': 'Lau tay thật khô bằng khăn sạch',
      'Phương án C': 'Cầm vào dây điện kéo ra',
      'Phương án D': 'Dùng que kim loại chọc vào ổ điện',
      'Đáp án đúng': 'B',
      'Giải thích': 'Nước dẫn điện rất nguy hiểm, cần lau tay thật khô trước khi chạm vào đồ điện.',
      'Mức độ': 'van_dung',
      'Điểm số': 1,
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData);
  // Configure column widths
  worksheet['!cols'] = [
    { wch: 12 }, // Mã
    { wch: 12 }, // Môn
    { wch: 10 }, // Lớp
    { wch: 25 }, // Chủ đề
    { wch: 30 }, // Bài học
    { wch: 15 }, // Dạng câu hỏi
    { wch: 45 }, // Nội dung
    { wch: 20 }, // A
    { wch: 20 }, // B
    { wch: 20 }, // C
    { wch: 20 }, // D
    { wch: 12 }, // Đáp án
    { wch: 35 }, // Giải thích
    { wch: 15 }, // Mức độ
    { wch: 10 }, // Điểm
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'CauHoiMau');
  XLSX.writeFile(workbook, 'Mau_Cau_Hoi_Tin_Hoc_Cong_Nghe.xlsx');
}

export async function parseQuestionsFromExcel(
  file: File,
  existingCodes: Set<string>
): Promise<ImportValidationResult> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  const rawRows = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, { defval: '' });

  const validQuestions: Question[] = [];
  const invalidRows: { rowNumber: number; reason: string; rawData: unknown }[] = [];
  const duplicateCodes: string[] = [];
  const seenCodes = new Set<string>();

  rawRows.forEach((row, index) => {
    const rowNum = index + 2; // +1 for 0-index, +1 for header line
    const code = String(row['Mã câu hỏi'] || '').trim();
    const content = String(row['Nội dung câu hỏi'] || '').trim();
    const rawSubject = String(row['Môn học'] || '').toLowerCase().trim();
    const rawGrade = Number(row['Khối lớp']);
    const rawAnswer = String(row['Đáp án đúng'] || '').trim();
    const rawType = String(row['Dạng câu hỏi'] || '').toLowerCase().trim();

    if (!code) {
      invalidRows.push({ rowNumber: rowNum, reason: 'Thiếu Mã câu hỏi', rawData: row });
      return;
    }

    if (seenCodes.has(code) || existingCodes.has(code)) {
      duplicateCodes.push(code);
      invalidRows.push({ rowNumber: rowNum, reason: `Mã câu hỏi '${code}' bị trùng lặp`, rawData: row });
      return;
    }

    if (!content) {
      invalidRows.push({ rowNumber: rowNum, reason: 'Thiếu nội dung câu hỏi', rawData: row });
      return;
    }

    if (!rawAnswer) {
      invalidRows.push({ rowNumber: rowNum, reason: 'Thiếu đáp án đúng', rawData: row });
      return;
    }

    // Determine subject
    let subject: SubjectType = 'tinhoc';
    if (rawSubject.includes('cong') || rawSubject.includes('công') || rawSubject === 'congnghe') {
      subject = 'congnghe';
    }

    // Determine grade (1 to 5)
    let grade: GradeLevel = 1;
    if ([1, 2, 3, 4, 5].includes(rawGrade)) {
      grade = rawGrade as GradeLevel;
    } else {
      // Default or fallback
      grade = 1;
    }

    // Determine type
    let type: QuestionType = 'multiple_choice';
    if (rawType.includes('dung') || rawType.includes('đúng') || rawType === 'dung_sai') {
      type = 'true_false';
    } else if (rawType.includes('dien') || rawType.includes('điền') || rawType === 'dien_khuyet') {
      type = 'fill_in_blank';
    }

    // Options
    let options: string[] = [];
    if (type === 'multiple_choice') {
      options = [
        String(row['Phương án A'] || '').trim(),
        String(row['Phương án B'] || '').trim(),
        String(row['Phương án C'] || '').trim(),
        String(row['Phương án D'] || '').trim(),
      ].filter(Boolean);

      if (options.length < 2) {
        invalidRows.push({ rowNumber: rowNum, reason: 'Câu trắc nghiệm phải có ít nhất 2 phương án', rawData: row });
        return;
      }
    } else if (type === 'true_false') {
      options = ['Đúng', 'Sai'];
    } else {
      // fill_in_blank
      options = [];
    }

    // Difficulty
    const rawDiff = String(row['Mức độ'] || '').toLowerCase();
    let difficulty: DifficultyLevel = 'nhan_biet';
    if (rawDiff.includes('thong') || rawDiff.includes('thông')) {
      difficulty = 'thong_hieu';
    } else if (rawDiff.includes('van') || rawDiff.includes('vận')) {
      difficulty = 'van_dung';
    }

    const points = Number(row['Điểm số']) || 1;
    const explanation = String(row['Giải thích'] || '').trim();
    const topic = String(row['Chủ đề'] || 'Chủ đề chung').trim();
    const lessonTitle = String(row['Bài học'] || 'Bài học cơ bản').trim();

    seenCodes.add(code);
    validQuestions.push({
      id: `q_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      code,
      subject,
      grade,
      topic,
      lessonTitle,
      questionText: content,
      type,
      options,
      correctAnswer: rawAnswer,
      explanation,
      difficulty,
      points,
      createdAt: new Date().toISOString(),
    });
  });

  return {
    validQuestions,
    invalidRows,
    duplicateCodes,
    totalRows: rawRows.length,
  };
}

export function exportQuestionsToExcel(questions: Question[], filename = 'Danh_Sach_Cau_Hoi.xlsx'): void {
  const exportData = questions.map((q) => {
    let optA = '';
    let optB = '';
    let optC = '';
    let optD = '';
    if (q.type === 'multiple_choice') {
      optA = q.options[0] || '';
      optB = q.options[1] || '';
      optC = q.options[2] || '';
      optD = q.options[3] || '';
    } else if (q.type === 'true_false') {
      optA = 'Đúng';
      optB = 'Sai';
    }

    return {
      'Mã câu hỏi': q.code,
      'Môn học': q.subject === 'tinhoc' ? 'Tin học' : 'Công nghệ',
      'Khối lớp': q.grade,
      'Chủ đề': q.topic,
      'Bài học': q.lessonTitle,
      'Dạng câu hỏi': q.type,
      'Nội dung câu hỏi': q.questionText,
      'Phương án A': optA,
      'Phương án B': optB,
      'Phương án C': optC,
      'Phương án D': optD,
      'Đáp án đúng': q.correctAnswer,
      'Giải thích': q.explanation,
      'Mức độ': q.difficulty,
      'Điểm số': q.points,
      'Ngày tạo': q.createdAt ? new Date(q.createdAt).toLocaleDateString('vi-VN') : '',
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  worksheet['!cols'] = [
    { wch: 12 },
    { wch: 12 },
    { wch: 10 },
    { wch: 25 },
    { wch: 25 },
    { wch: 15 },
    { wch: 45 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 12 },
    { wch: 35 },
    { wch: 15 },
    { wch: 10 },
    { wch: 12 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'CauHoi');
  XLSX.writeFile(workbook, filename);
}
