import { Question, Lesson, Exam, StudentProfile, TeacherNotice } from '../types';

export const initialQuestions: Question[] = [
  // --- TIN HỌC LỚP 4 ---
  {
    id: 'q_th4_01',
    code: 'TH4_B01_01',
    subject: 'tinhoc',
    grade: 4,
    topic: 'Chủ đề 1: Máy tính và em',
    lessonTitle: 'Bài 1: Phần cứng và phần mềm máy tính',
    questionText: 'Bộ phận nào sau đây của máy tính là thiết bị phần cứng (Hardware)?',
    type: 'multiple_choice',
    options: ['Chuột và bàn phím máy tính', 'Phần mềm Paint vẽ tranh', 'Trò chơi điện tử', 'Phần mềm Word'],
    correctAnswer: 'A',
    explanation: 'Phần cứng là các thiết bị vật lý có thể nhìn thấy và cầm nắm được như màn hình, bàn phím, chuột, thân máy.',
    difficulty: 'nhan_biet',
    points: 1,
    createdAt: '2026-09-01T08:00:00Z',
  },
  {
    id: 'q_th4_02',
    code: 'TH4_B01_02',
    subject: 'tinhoc',
    grade: 4,
    topic: 'Chủ đề 1: Máy tính và em',
    lessonTitle: 'Bài 1: Phần cứng và phần mềm máy tính',
    questionText: 'Phần mềm và phần cứng có mối quan hệ phụ thuộc lẫn nhau để máy tính hoạt động bình thường.',
    type: 'true_false',
    options: ['Đúng', 'Sai'],
    correctAnswer: 'Đúng',
    explanation: 'Phần cứng cần phần mềm điều khiển, còn phần mềm cần phần cứng để lưu trữ và thực thi các câu lệnh.',
    difficulty: 'thong_hieu',
    points: 1,
    createdAt: '2026-09-01T08:05:00Z',
  },
  {
    id: 'q_th4_03',
    code: 'TH4_B02_01',
    subject: 'tinhoc',
    grade: 4,
    topic: 'Chủ đề 1: Máy tính và em',
    lessonTitle: 'Bài 2: Gõ bàn phím đúng cách',
    questionText: 'Khi đặt tay ở vị trí xuất phát trên bàn phím, hai ngón trỏ đặt lên hai phím nào có gờ nổi?',
    type: 'multiple_choice',
    options: ['Phím F và phím J', 'Phím A và phím L', 'Phím G và phím H', 'Phím Space và phím Enter'],
    correctAnswer: 'A',
    explanation: 'Hai ngón trỏ luôn đặt ở phím F (tay trái) và phím J (tay phải) trên hàng phím cơ sở.',
    difficulty: 'nhan_biet',
    points: 1,
    createdAt: '2026-09-02T08:00:00Z',
  },
  {
    id: 'q_th4_04',
    code: 'TH4_B03_01',
    subject: 'tinhoc',
    grade: 4,
    topic: 'Chủ đề 2: Mạng máy tính và Internet',
    lessonTitle: 'Bài 3: Thông tin trên trang web',
    questionText: 'Thông tin chính trên một trang web thông thường bao gồm những dạng nào?',
    type: 'multiple_choice',
    options: ['Văn bản, hình ảnh, âm thanh, video và siêu liên kết', 'Chỉ có văn bản', 'Chỉ có âm thanh', 'Chỉ có các nút bấm'],
    correctAnswer: 'A',
    explanation: 'Trang web là siêu văn bản đa phương tiện chứa văn bản, hình ảnh, âm thanh, video và các siêu liên kết (link).',
    difficulty: 'thong_hieu',
    points: 1,
    createdAt: '2026-09-03T08:00:00Z',
  },

  // --- TIN HỌC LỚP 5 ---
  {
    id: 'q_th5_01',
    code: 'TH5_B01_01',
    subject: 'tinhoc',
    grade: 5,
    topic: 'Chủ đề 1: Máy tính và em',
    lessonTitle: 'Bài 1: Em có thể làm gì với máy tính?',
    questionText: 'Máy tính có thể giúp học sinh thực hiện những hoạt động nào sau đây?',
    type: 'multiple_choice',
    options: [
      'Học tập, giải trí, tìm kiếm thông tin, hợp tác và tạo ra sản phẩm số',
      'Chỉ dùng để chơi game điện tử',
      'Chỉ dùng để gõ chữ in văn bản',
      'Chỉ dùng để xem giờ',
    ],
    correctAnswer: 'A',
    explanation: 'Máy tính là công cụ đa năng hỗ trợ học tập, sáng tạo sản phẩm số, kết nối bạn bè và khám phá thế giới.',
    difficulty: 'nhan_biet',
    points: 1,
    createdAt: '2026-09-04T08:00:00Z',
  },
  {
    id: 'q_th5_02',
    code: 'TH5_B04_01',
    subject: 'tinhoc',
    grade: 5,
    topic: 'Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    lessonTitle: 'Bài 4: Cây thư mục',
    questionText: 'Thư mục được tổ chức theo cấu trúc phân nhánh giống như hình cành cây giúp việc tìm kiếm tệp nhanh chóng và khoa học.',
    type: 'true_false',
    options: ['Đúng', 'Sai'],
    correctAnswer: 'Đúng',
    explanation: 'Cấu trúc cây thư mục (Folder tree) giúp phân loại tệp tin theo nhóm, lớp, môn học rõ ràng.',
    difficulty: 'thong_hieu',
    points: 1,
    createdAt: '2026-09-05T08:00:00Z',
  },
  {
    id: 'q_th5_03',
    code: 'TH5_B10_01',
    subject: 'tinhoc',
    grade: 5,
    topic: 'Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính',
    lessonTitle: 'Bài 10: Cấu trúc tuần tự',
    questionText: 'Trong cấu trúc tuần tự, các khối lệnh trong chương trình Scratch được thực hiện theo thứ tự nào?',
    type: 'multiple_choice',
    options: [
      'Lần lượt từ trên xuống dưới theo thứ tự sắp xếp',
      'Ngẫu nhiên không theo thứ tự',
      'Từ dưới lên trên',
      'Chỉ thực hiện lệnh đầu tiên rồi dừng lại',
    ],
    correctAnswer: 'A',
    explanation: 'Cấu trúc tuần tự thực hiện các lệnh lần lượt từng bước từ trên xuống dưới.',
    difficulty: 'thong_hieu',
    points: 1,
    createdAt: '2026-09-06T08:00:00Z',
  },

  // --- CÔNG NGHỆ LỚP 5 ---
  {
    id: 'q_cn5_01',
    code: 'CN5_B01_01',
    subject: 'congnghe',
    grade: 5,
    topic: 'Phần một: Công nghệ và đời sống',
    lessonTitle: 'Bài 1: Vai trò của công nghệ',
    questionText: 'Sản phẩm công nghệ nào sau đây giúp bảo quản thực phẩm tươi sống trong gia đình?',
    type: 'multiple_choice',
    options: ['Tủ lạnh', 'Máy giặt', 'Máy sấy tóc', 'Đèn bàn học'],
    correctAnswer: 'A',
    explanation: 'Tủ lạnh duy trì nhiệt độ thấp ngăn ngừa vi khuẩn phát triển, bảo quản thực phẩm tươi lâu.',
    difficulty: 'nhan_biet',
    points: 1,
    createdAt: '2026-09-01T09:00:00Z',
  },
  {
    id: 'q_cn5_02',
    code: 'CN5_B02_01',
    subject: 'congnghe',
    grade: 5,
    topic: 'Phần một: Công nghệ và đời sống',
    lessonTitle: 'Bài 2: Nhà sáng chế',
    questionText: 'Nhà sáng chế Tô-mát Ê-đi-xơn (Thomas Edison) nổi tiếng với phát minh vĩ đại nào?',
    type: 'multiple_choice',
    options: [
      'Bóng đèn sợi đốt (năm 1879)',
      'Động cơ hơi nước (năm 1784)',
      'Điện thoại (năm 1876)',
      'Ô tô động cơ bốn thì (năm 1886)',
    ],
    correctAnswer: 'A',
    explanation: 'Thomas Edison đã chế tạo thành công bóng đèn sợi đốt thắp sáng cho nhân loại năm 1879.',
    difficulty: 'nhan_biet',
    points: 1,
    createdAt: '2026-09-02T09:00:00Z',
  },
  {
    id: 'q_cn5_03',
    code: 'CN5_B07_01',
    subject: 'congnghe',
    grade: 5,
    topic: 'Phần hai: Thủ công kĩ thuật',
    lessonTitle: 'Bài 7: Lắp ráp mô hình xe điện chạy bằng pin',
    questionText: 'Mô hình xe điện chạy bằng pin chuyển hóa điện năng từ nguồn pin thành dạng năng lượng nào để bánh xe quay?',
    type: 'multiple_choice',
    options: ['Cơ năng (lực quay trục bánh xe)', 'Quang năng', 'Nhiệt năng', 'Hóa năng'],
    correctAnswer: 'A',
    explanation: 'Động cơ điện (motor) biến đổi điện năng từ pin thành cơ năng làm quay trục bánh xe giúp xe chạy.',
    difficulty: 'thong_hieu',
    points: 1,
    createdAt: '2026-09-03T09:00:00Z',
  },

  // --- CÔNG NGHỆ LỚP 4 ---
  {
    id: 'q_cn4_01',
    code: 'CN4_B01_01',
    subject: 'congnghe',
    grade: 4,
    topic: 'Phần một: Công nghệ và đời sống',
    lessonTitle: 'Bài 1: Lợi ích của hoa, cây cảnh đối với đời sống',
    questionText: 'Cây xanh và hoa trồng trong khuôn viên trường học và gia đình có tác dụng gì?',
    type: 'multiple_choice',
    options: [
      'Làm đẹp cảnh quan, thanh lọc không khí và cung cấp khí oxygen',
      'Gây ô nhiễm môi trường',
      'Làm giảm lượng oxy',
      'Thu hút sâu bọ gây hại',
    ],
    correctAnswer: 'A',
    explanation: 'Cây xanh quang hợp nhả khí oxygen, hút bụi mịn, tạo bóng mát và không gian xanh thư giãn.',
    difficulty: 'nhan_biet',
    points: 1,
    createdAt: '2026-09-01T10:00:00Z',
  },

  // --- CÔNG NGHỆ LỚP 3 ---
  {
    id: 'q_cn3_01',
    code: 'CN3_B02_01',
    subject: 'congnghe',
    grade: 3,
    topic: 'Phần một: Công nghệ và đời sống',
    lessonTitle: 'Bài 2: Sử dụng đèn học',
    questionText: 'Khi ngồi học với đèn học để bàn, ánh sáng đèn nên được chiếu như thế nào?',
    type: 'multiple_choice',
    options: [
      'Chiếu từ phía đối diện tay thuận hoặc từ trên xuống mặt bàn, không chiếu thẳng vào mắt',
      'Chiếu thẳng trực tiếp rọi vào mắt',
      'Đặt đèn sau lưng',
      'Tắt đèn phòng chỉ bật đèn học thật sáng',
    ],
    correctAnswer: 'A',
    explanation: 'Ánh sáng chiếu tập trung xuống trang sách, tránh rọi thẳng vào mắt gây lóa hoặc sấp bóng tay viết.',
    difficulty: 'thong_hieu',
    points: 1,
    createdAt: '2026-09-01T10:30:00Z',
  },
];

export const initialLessons: Lesson[] = [
  // =========================================================================
  // 1. TIN HỌC 4 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
  // =========================================================================
  {
    id: 'les_th4_b01_sgk',
    subject: 'tinhoc',
    grade: 4,
    bookType: 'sgk',
    bookName: 'Sách Giáo Khoa (SGK) - Kết nối tri thức',
    topic: 'Chủ đề 1: Máy tính và em',
    lessonNumber: 'Bài 1',
    title: 'Phần cứng và phần mềm máy tính',
    description: 'Nhận biết các thiết bị phần cứng, các loại phần mềm thông dụng và mối quan hệ chặt chẽ giữa chúng.',
    durationMinutes: 35,
    order: 1,
    iconName: 'Monitor',
    objectives: [
      'Nêu được tên một số thiết bị phần cứng và phần mềm đã biết.',
      'Nêu được sơ lược vai trò của phần cứng, phần mềm và mối quan hệ phụ thuộc lẫn nhau giữa chúng.',
      'Nêu được ví dụ cụ thể về một số thao tác không đúng gây ra lỗi cho phần cứng và phần mềm.',
    ],
    sections: [
      {
        id: 'sec_th4_b01_01',
        title: '1. Khởi động: Tình huống điện thoại của mẹ và bố',
        content: `Minh mượn điện thoại của mẹ để dịch lời một bài hát từ tiếng Anh sang tiếng Việt. Tình huống có vấn đề là điện thoại của mẹ không có từ điển như điện thoại của bố. 
Hai chiếc điện thoại trông giống nhau về hình dạng (màn hình, nút bấm, camera) đó là phần cứng. 
Nhưng hai chiếc điện thoại sử dụng khác nhau vì được cài đặt các phần mềm, ứng dụng khác nhau!`,
        keyTakeaway: 'Phần cứng là hình dáng bên ngoài quan sát được; phần mềm là các chương trình bên trong giúp máy tính thực hiện các công việc khác nhau.',
        visualType: 'computer',
      },
      {
        id: 'sec_th4_b01_02',
        title: '2. Khám phá: Phần cứng hay phần mềm?',
        content: `• Phần cứng (Hardware): Màn hình, bàn phím, chuột, thân máy tính (chứa CPU, RAM, ổ đĩa), loa, máy in, ổ cắm USB, tai nghe. Em có thể chạm tay trực tiếp vào phần cứng.
• Phần mềm (Software): Là các chương trình chỉ dẫn máy tính làm việc. Ví dụ: Phần mềm vẽ Paint, phần mềm gõ tiếng Việt Unikey, phần mềm luyện gõ Kiran's Typing Tutor, phần mềm trình chiếu PowerPoint, phần mềm soạn thảo Word, phần mềm duyệt web Google Chrome.`,
        keyTakeaway: 'Phần cứng là các thiết bị vật lý; phần mềm là các chương trình chạy trên máy tính.',
        visualType: 'monitor',
      },
      {
        id: 'sec_th4_b01_03',
        title: '3. Mối quan hệ giữa phần cứng và phần mềm',
        content: `Giữa phần cứng và phần mềm có mối quan hệ hai chiều không thể tách rời:
- Phần cứng cần thiết để lưu trữ phần mềm và chuyển hoá các mệnh lệnh của phần mềm thành hoạt động thực tế.
- Phần mềm cần thiết để điều khiển phần cứng hoạt động (xử lí thông tin và tương tác với thế giới bên ngoài).
Không có phần mềm, máy tính chỉ là một khối kim loại và mạch điện vô tri! Không có phần cứng, phần mềm không có nơi để chạy.`,
        keyTakeaway: 'Cả phần cứng và phần mềm đều cần thiết để máy tính hoạt động!',
        visualType: 'circuit',
      },
      {
        id: 'sec_th4_b01_04',
        title: '4. Thao tác an toàn bảo vệ phần cứng và phần mềm',
        content: `Những hành vi gây hại cần tránh:
❌ Rút dây nguồn đột ngột khi máy đang chạy (làm hỏng ổ cứng, mất dữ liệu).
❌ Cầm giật dây cáp nối chuột, bàn phím, màn hình.
❌ Tải và mở các tệp lạ từ Internet khiến máy tính nhiễm virus làm hỏng phần mềm.
✅ Tắt máy đúng cách: Nháy chuột vào nút Start -> Chọn Power -> Chọn Shut down.`,
        keyTakeaway: 'Luôn tắt máy tính đúng quy trình và cẩn thận với các thiết bị điện.',
        visualType: 'safety',
      },
    ],
    reviewQuestions: [
      {
        id: 'rq_th4_b01_01',
        code: 'TH4_RQ_01',
        subject: 'tinhoc',
        grade: 4,
        topic: 'Chủ đề 1',
        lessonTitle: 'Bài 1: Phần cứng và phần mềm',
        questionText: 'Trong các mục sau, đâu là phần mềm máy tính?',
        type: 'multiple_choice',
        options: ['Phần mềm luyện gõ bàn phím', 'Màn hình máy tính', 'Bàn phím cơ', 'Chuột quang'],
        correctAnswer: 'A',
        explanation: 'Phần mềm luyện gõ là chương trình ứng dụng, 3 mục còn lại là thiết bị phần cứng.',
        difficulty: 'nhan_biet',
        points: 1,
        createdAt: '2026-09-01T08:00:00Z',
      },
      {
        id: 'rq_th4_b01_02',
        code: 'TH4_RQ_02',
        subject: 'tinhoc',
        grade: 4,
        topic: 'Chủ đề 1',
        lessonTitle: 'Bài 1: Phần cứng và phần mềm',
        questionText: 'Để tắt máy tính an toàn không gây lỗi phần cứng và phần mềm, em thực hiện thao tác nào?',
        type: 'multiple_choice',
        options: [
          'Nháy nút Start -> Power -> Shut down',
          'Rút phích cắm điện ngay lập tức',
          'Bấm giữ nút nguồn trên thân máy 5 giây',
          'Tắt cầu dao điện tổng trong phòng',
        ],
        correctAnswer: 'A',
        explanation: 'Nháy Start -> Power -> Shut down giúp hệ điều hành lưu trữ tệp và đóng các tiến trình an toàn.',
        difficulty: 'van_dung',
        points: 1,
        createdAt: '2026-09-01T08:05:00Z',
      },
    ],
  },

  {
    id: 'les_th4_b01_sgv',
    subject: 'tinhoc',
    grade: 4,
    bookType: 'sgv',
    bookName: 'Sách Giáo Viên (SGV) - Hướng dẫn giảng dạy',
    topic: 'Chủ đề 1: Máy tính và em',
    lessonNumber: 'Bài 1',
    title: 'Kế hoạch bài dạy: Phần cứng và phần mềm máy tính',
    description: 'Kế hoạch tổ chức dạy học, mục tiêu phẩm chất năng lực, các hoạt động khám phá và phương pháp đánh giá theo chuẩn SGV Tin học 4 trang 18-22.',
    durationMinutes: 40,
    order: 2,
    iconName: 'BookOpen',
    objectives: [
      'Năng lực tin học (NLa): Nhận dạng, sử dụng và quản lí các phương tiện công nghệ thông tin.',
      'Phẩm chất: Rèn luyện ý thức trách nhiệm, cẩn thận đối với việc sử dụng thiết bị điện tử.',
      'Tiến trình sư phạm: Khởi động (5p) -> Hoạt động 1 Phân biệt (10p) -> Hoạt động 2 Mối quan hệ (10p) -> Hoạt động 3 An toàn máy tính (10p) -> Luyện tập & Vận dụng (5p).',
    ],
    sections: [
      {
        id: 'sec_th4_b01_sgv_01',
        title: 'Mục đích & Chuẩn bị thiết bị dạy học',
        content: `• Chuẩn bị của GV: Mô hình hoặc hình ảnh thiết bị thực tế, máy chiếu, bài trình chiếu PowerPoint, phiếu học tập nhóm.
• Gợi ý khởi động: Cho HS quan sát 2 chiếc điện thoại hoặc 2 máy tính có phần cứng giống nhau nhưng cài ứng dụng khác nhau để kích thích câu hỏi tại sao.`,
        keyTakeaway: 'Tạo tình huống thực tế để học sinh tự rút ra khái niệm thay vì đọc định nghĩa khô khan.',
        visualType: 'computer',
      },
      {
        id: 'sec_th4_b01_sgv_02',
        title: 'Tổ chức Hoạt động 1: Phân loại phần cứng hay phần mềm',
        content: `GV chia lớp thành các nhóm đôi (2 HS). Phát phiếu bài tập gồm các tranh vẽ thiết bị và ứng dụng.
Yêu cầu HS phân loại vào 2 cột: Cột Phần cứng (Bàn phím, chuột, màn hình, tai nghe) và Cột Phần mềm (Phần mềm vẽ tranh, Unikey, Zoom, Trò chơi điện tử).
Lưu ý cho GV: Tránh dùng định nghĩa "phần cứng là cái có thể chạm vào" một cách tuyệt đối mà nhấn mạnh vào khía cạnh thiết bị vật lý và chương trình lệnh.`,
        keyTakeaway: 'Học sinh làm việc nhóm đôi để thảo luận và bảo vệ ý kiến của mình.',
        visualType: 'monitor',
      },
      {
        id: 'sec_th4_b01_sgv_03',
        title: 'Hướng dẫn đánh giá và câu hỏi củng cố',
        content: `Đáp án câu hỏi củng cố trong SGK trang 20-21:
- Phát biểu sai: "Chương trình luyện gõ bàn phím là phần cứng" -> Sai vì chương trình là phần mềm.
- Mối quan hệ: Cả phần cứng và phần mềm đều cần thiết để máy tính hoạt động.
- Tiêu chí đánh giá: Trả lời đúng, tham gia tích cực, có ý thức giữ gìn phòng máy.`,
        keyTakeaway: 'Đánh giá học sinh qua quá trình thực hành và giải thích lí do câu trả lời.',
        visualType: 'safety',
      },
    ],
    reviewQuestions: [
      {
        id: 'rq_th4_b01_sgv_01',
        code: 'TH4_SGV_01',
        subject: 'tinhoc',
        grade: 4,
        topic: 'Chủ đề 1',
        lessonTitle: 'Bài 1: Phần cứng và phần mềm (SGV)',
        questionText: 'Theo SGV Tin học 4, yếu tố nào dưới đây là phần mềm điều khiển cuộc gọi trên điện thoại?',
        type: 'multiple_choice',
        options: ['Ứng dụng gọi điện thoại (Phone App)', 'Loa trong điện thoại', 'Thẻ SIM vật lý', 'Màn hình cảm ứng'],
        correctAnswer: 'A',
        explanation: 'Ứng dụng gọi điện là phần mềm, còn loa, SIM và màn hình là phần cứng.',
        difficulty: 'thong_hieu',
        points: 1,
        createdAt: '2026-09-01T08:10:00Z',
      },
    ],
  },

  {
    id: 'les_th4_b01_vbt',
    subject: 'tinhoc',
    grade: 4,
    bookType: 'sbt',
    bookName: 'Vở Bài Tập (VBT) - Luyện tập & Vận dụng',
    topic: 'Chủ đề 1: Máy tính và em',
    lessonNumber: 'Bài 1',
    title: 'Thực hành Vở Bài Tập: Phần cứng và phần mềm',
    description: 'Tổng hợp các bài tập điền từ, đánh dấu đúng/sai và ghép nối từ Vở bài tập Tin học 4 trang 5-7.',
    durationMinutes: 25,
    order: 3,
    iconName: 'ClipboardList',
    objectives: [
      'Hoàn thành bài tập đánh dấu phát biểu đúng về phần cứng và phần mềm.',
      'Nhận biết các từ ngữ chuyên môn chỉ phần cứng và phần mềm.',
      'Xử lý tình huống an toàn khi sử dụng thiết bị số.',
    ],
    sections: [
      {
        id: 'sec_th4_b01_vbt_01',
        title: 'Tóm tắt bài tập trọng tâm trong VBT',
        content: `Trong VBT Tin học 4, bài 1 bao gồm:
1. Đánh dấu phát biểu đúng về hình ảnh phim hoạt hình trên màn hình (Màn hình là phần cứng, hình ảnh là do phần mềm điều khiển).
2. Tìm từ chỉ phần cứng (Thiết bị, bàn phím) và từ chỉ phần mềm (Ứng dụng, chương trình).
3. Tình huống xử lý: Khi điện thoại của bố bị nóng lên lúc đang chơi, em nên làm gì? (Tạm dừng chơi, để máy nghỉ ngơi, kiểm tra pin).`,
        keyTakeaway: 'VBT giúp khắc sâu kiến thức lý thuyết thông qua các tình huống thực tiễn hàng ngày.',
        visualType: 'tool',
      },
    ],
    reviewQuestions: [
      {
        id: 'rq_th4_vbt_01',
        code: 'VBT_TH4_01',
        subject: 'tinhoc',
        grade: 4,
        topic: 'Chủ đề 1',
        lessonTitle: 'VBT Bài 1: Phần cứng và phần mềm',
        questionText: 'Trong các cụm từ sau, cụm từ nào mô tả đúng về "phần mềm"?',
        type: 'multiple_choice',
        options: ['Ứng dụng trong máy tính và trò chơi trực tuyến', 'Các linh kiện điện tử bằng nhựa và kim loại', 'Nơi lưu trữ đĩa cứng', 'Dây cáp cắm nguồn'],
        correctAnswer: 'A',
        explanation: 'Ứng dụng và trò chơi là các dạng phần mềm chạy trên máy tính.',
        difficulty: 'nhan_biet',
        points: 1,
        createdAt: '2026-09-01T08:15:00Z',
      },
      {
        id: 'rq_th4_vbt_02',
        code: 'VBT_TH4_02',
        subject: 'tinhoc',
        grade: 4,
        topic: 'Chủ đề 1',
        lessonTitle: 'VBT Bài 1: Phần cứng và phần mềm',
        questionText: 'Khi đang sử dụng điện thoại của bố để tra từ điển, điện thoại hiện thông báo pin yếu, em nên làm gì?',
        type: 'multiple_choice',
        options: [
          'Trả lại điện thoại cho bố để sạc pin an toàn',
          'Vừa cắm sạc vừa tiếp tục bấm chơi game',
          'Cắm sạc rồi mở loa to hết cỡ',
          'Cố dùng đến khi điện thoại sập nguồn',
        ],
        correctAnswer: 'A',
        explanation: 'Tuyệt đối không vừa sạc vừa dùng điện thoại; cần đưa cho người lớn cắm sạc pin an toàn.',
        difficulty: 'van_dung',
        points: 1,
        createdAt: '2026-09-01T08:20:00Z',
      },
    ],
  },

  // =========================================================================
  // 2. TIN HỌC 5 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
  // =========================================================================
  {
    id: 'les_th5_b01_sgk',
    subject: 'tinhoc',
    grade: 5,
    bookType: 'sgk',
    bookName: 'Sách Giáo Khoa (SGK) - Kết nối tri thức',
    topic: 'Chủ đề 1: Máy tính và em',
    lessonNumber: 'Bài 1',
    title: 'Em có thể làm gì với máy tính?',
    description: 'Tìm hiểu những ứng dụng kì diệu của máy tính trong học tập, giao tiếp, tìm kiếm và tạo ra sản phẩm số.',
    durationMinutes: 35,
    order: 1,
    iconName: 'Monitor',
    objectives: [
      'Nêu được ví dụ máy tính giúp học tập, giải trí, tìm kiếm và trao đổi thông tin.',
      'Biết cách hợp tác với bạn bè và tạo ra sản phẩm số theo ý tưởng của bản thân.',
      'Thể hiện mong muốn sử dụng máy tính thành thạo để làm được nhiều việc có ích.',
    ],
    sections: [
      {
        id: 'sec_th5_b01_01',
        title: '1. Khám phá: Em đã dùng phần mềm máy tính để làm gì?',
        content: `Là học sinh lớp 5, em đã biết sử dụng chuột, bàn phím và làm quen với nhiều phần mềm:
- Học tập: Em học ngoại ngữ qua Google Translate, tìm hiểu khoa học qua Kids Games Learning Science, học toán, xem bài giảng trực tuyến.
- Giải trí: Nghe các bài hát thiếu nhi, xem video hoạt hình, chơi trò chơi rèn luyện tư duy.
- Trao đổi thông tin: Gửi thư điện tử (email), gọi video hoặc nhắn tin với ông bà, thầy cô và bạn bè.
- Hợp tác học tập: Tham gia nhóm học tập trực tuyến trên Zoom, Google Meet hoặc Microsoft Teams.
- Tạo ra sản phẩm số: Soạn thảo văn bản bài thơ, thiết kế thiệp chúc mừng, tạo bài trình chiếu báo cáo hay viết chương trình trò chơi bằng Scratch.`,
        keyTakeaway: 'Máy tính có thể giúp em học tập, giải trí, tìm kiếm, trao đổi thông tin, hợp tác và tạo ra sản phẩm số!',
        visualType: 'computer',
      },
      {
        id: 'sec_th5_b01_02',
        title: '2. Thực hành: Trò chơi Mê Cung trên máy tính',
        content: `Trò chơi Mê Cung (Maze) được lập trình bằng ngôn ngữ Scratch:
- Nhiệm vụ: Điều khiển chú chuột đi từ "Lối vào" vượt qua các ngõ hẹp để đến được "Lối ra".
- Thao tác: Sử dụng các phím mũi tên Lên (↑), Xuống (↓), Sang trái (←), Sang phải (→) trên bàn phím.
- Kỹ năng ngón tay: Dùng ngón trỏ, ngón giữa và ngón áp út của bàn tay phải để nhấn các phím mũi tên thật linh hoạt.
Thời gian chơi được tính bằng giây. Đây là một ví dụ tuyệt vời về sản phẩm số do chính học sinh có thể lập trình!`,
        keyTakeaway: 'Sử dụng máy tính thành thạo giúp em rèn luyện tư duy logic và tạo ra trò chơi của riêng mình.',
        visualType: 'robot',
      },
    ],
    reviewQuestions: [
      {
        id: 'rq_th5_b01_01',
        code: 'TH5_RQ_01',
        subject: 'tinhoc',
        grade: 5,
        topic: 'Chủ đề 1',
        lessonTitle: 'Bài 1: Em có thể làm gì với máy tính?',
        questionText: 'Phần mềm nào sau đây giúp học sinh trình bày bài báo cáo sinh động trước lớp?',
        type: 'multiple_choice',
        options: ['Phần mềm trình chiếu (PowerPoint)', 'Phần mềm máy tính bỏ túi', 'Phần mềm nghe nhạc', 'Bộ gõ Unikey'],
        correctAnswer: 'A',
        explanation: 'Phần mềm trình chiếu PowerPoint giúp tạo các trang chiếu kết hợp chữ, hình ảnh và hiệu ứng bắt mắt.',
        difficulty: 'nhan_biet',
        points: 1,
        createdAt: '2026-09-02T08:00:00Z',
      },
      {
        id: 'rq_th5_b01_02',
        code: 'TH5_RQ_02',
        subject: 'tinhoc',
        grade: 5,
        topic: 'Chủ đề 1',
        lessonTitle: 'Bài 1: Em có thể làm gì với máy tính?',
        questionText: 'Tạo một bài thơ, thiệp chúc mừng hoặc chương trình Scratch là hoạt động tạo ra sản phẩm số.',
        type: 'true_false',
        options: ['Đúng', 'Sai'],
        correctAnswer: 'Đúng',
        explanation: 'Sản phẩm số là các tác phẩm dạng dữ liệu điện tử do người dùng tạo ra trên máy tính hoặc thiết bị thông minh.',
        difficulty: 'thong_hieu',
        points: 1,
        createdAt: '2026-09-02T08:05:00Z',
      },
    ],
  },

  {
    id: 'les_th5_b06_sgk',
    subject: 'tinhoc',
    grade: 5,
    bookType: 'sgk',
    bookName: 'Sách Giáo Khoa (SGK) - Kết nối tri thức',
    topic: 'Chủ đề 5: Ứng dụng tin học',
    lessonNumber: 'Bài 6',
    title: 'Định dạng kí tự và bố trí hình ảnh trong văn bản',
    description: 'Thành thạo chọn phông chữ, cỡ chữ, màu sắc, kiểu chữ và cách chèn, căn chỉnh hình ảnh trong văn bản Word.',
    durationMinutes: 35,
    order: 6,
    iconName: 'FileText',
    objectives: [
      'Định dạng được kí tự để trình bày văn bản đẹp hơn: chọn phông, kiểu, cỡ chữ và màu chữ.',
      'Thay đổi được cách bố trí hình ảnh trong văn bản (chữ bao quanh, trên/dưới dòng...).',
    ],
    sections: [
      {
        id: 'sec_th5_b06_01',
        title: '1. Định dạng kí tự trong phần mềm soạn thảo',
        content: `Trong thẻ Home, nhóm lệnh Font cung cấp các công cụ:
- Phông chữ (Font): Chọn Tahoma, Times New Roman, Arial, Calibri...
- Cỡ chữ (Font Size): 12, 14, 16, 20...
- Kiểu chữ: B (Đậm - Bold), I (Nghiêng - Italic), U (Gạch chân - Underline).
- Màu chữ (Font Color): Nút chữ A có thanh màu phía dưới.
Định dạng kí tự giúp tiêu đề nổi bật, bài văn dễ đọc và trang trọng hơn.`,
        keyTakeaway: 'Phông chữ, cỡ chữ và màu chữ nằm trong nhóm lệnh Font trên dải lệnh Home.',
        visualType: 'keyboard',
      },
      {
        id: 'sec_th5_b06_02',
        title: '2. Thay đổi cách bố trí hình ảnh trong văn bản',
        content: `Khi chèn một hình ảnh vào văn bản, nháy chuột vào biểu tượng Layout Options xuất hiện bên cạnh hình:
- In Line with Text: Hình ảnh nằm cùng hàng với dòng chữ (như một kí tự lớn).
- Square: Chữ chạy bao bọc xung quanh khung hình chữ nhật của ảnh.
- Tight: Chữ chạy uốn sát theo đường nét viền của hình ảnh.
- Behind Text: Hình ảnh nằm chìm phía dưới chữ.
- In Front of Text: Hình ảnh nổi đè lên trên chữ.`,
        keyTakeaway: 'Dùng Layout Options để chọn kiểu bố trí hình ảnh hài hòa với các đoạn văn.',
        visualType: 'monitor',
      },
    ],
    reviewQuestions: [
      {
        id: 'rq_th5_b06_01',
        code: 'TH5_B06_01',
        subject: 'tinhoc',
        grade: 5,
        topic: 'Chủ đề 5',
        lessonTitle: 'Bài 6: Định dạng kí tự và hình ảnh',
        questionText: 'Để định dạng chữ in đậm, em nháy chuột vào nút lệnh có biểu tượng chữ cái nào?',
        type: 'multiple_choice',
        options: ['Nút chữ B', 'Nút chữ I', 'Nút chữ U', 'Nút chữ A'],
        correctAnswer: 'A',
        explanation: 'Nút B (Bold) dùng để tạo chữ in đậm; nút I (Italic) chữ nghiêng; nút U (Underline) chữ gạch chân.',
        difficulty: 'nhan_biet',
        points: 1,
        createdAt: '2026-09-06T08:00:00Z',
      },
      {
        id: 'rq_th5_b06_02',
        code: 'TH5_B06_02',
        subject: 'tinhoc',
        grade: 5,
        topic: 'Chủ đề 5',
        lessonTitle: 'Bài 6: Định dạng kí tự và hình ảnh',
        questionText: 'Kiểu bố trí "Square" làm cho chữ chạy bao xung quanh khung hình ảnh.',
        type: 'true_false',
        options: ['Đúng', 'Sai'],
        correctAnswer: 'Đúng',
        explanation: 'Square tạo khoảng cách bao quanh hình vuông/hình chữ nhật của ảnh.',
        difficulty: 'thong_hieu',
        points: 1,
        createdAt: '2026-09-06T08:05:00Z',
      },
    ],
  },

  {
    id: 'les_th5_b10_sgk',
    subject: 'tinhoc',
    grade: 5,
    bookType: 'sgk',
    bookName: 'Sách Giáo Khoa (SGK) - Kết nối tri thức',
    topic: 'Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính',
    lessonNumber: 'Bài 10',
    title: 'Cấu trúc tuần tự trong lập trình Scratch',
    description: 'Hiểu bản chất cấu trúc tuần tự và lập trình điều khiển nhân vật mèo di chuyển và chào hỏi trong Scratch.',
    durationMinutes: 35,
    order: 10,
    iconName: 'Cpu',
    objectives: [
      'Nêu được ví dụ cụ thể mô tả cấu trúc tuần tự.',
      'Sử dụng được cấu trúc tuần tự trong một số chương trình đơn giản.',
    ],
    sections: [
      {
        id: 'sec_th5_b10_01',
        title: '1. Cấu trúc tuần tự là gì?',
        content: `Hằng ngày, có rất nhiều việc được thực hiện theo thứ tự tuần tự:
- Buổi sáng: Thức dậy -> Đánh răng, rửa mặt -> Ăn sáng -> Đi học.
- Động tác thể dục: Lần lượt thực hiện từ động tác 1 đến động tác 8.
Trong chương trình máy tính: Các lệnh hoặc khối lệnh được thực hiện tuần tự, lần lượt từng lệnh một theo đúng thứ tự từ trên xuống dưới.`,
        keyTakeaway: 'Cấu trúc tuần tự thực hiện các hành động lần lượt theo một thứ tự xác định.',
        visualType: 'robot',
      },
      {
        id: 'sec_th5_b10_02',
        title: '2. Lập trình chương trình "Xin chào!" với Scratch',
        content: `Các khối lệnh tuần tự điều khiển chú mèo:
1. Khi bấm vào [Lá cờ xanh]
2. [Di chuyển 100 bước]
3. [Nói "Xin chào!" trong 3 giây]
4. [Phát âm thanh Meow đến hết]
5. [Nói "Rất vui được gặp các bạn." trong 2 giây]
Khi lá cờ xanh được nhấn, chú mèo sẽ thực hiện đúng 5 bước trên theo thứ tự không đảo lộn.`,
        keyTakeaway: 'Ghép các khối lệnh nối tiếp nhau để tạo thành chương trình tuần tự hoàn chỉnh.',
        visualType: 'robot',
      },
    ],
    reviewQuestions: [
      {
        id: 'rq_th5_b10_01',
        code: 'TH5_B10_01',
        subject: 'tinhoc',
        grade: 5,
        topic: 'Chủ đề 6',
        lessonTitle: 'Bài 10: Cấu trúc tuần tự',
        questionText: 'Trong Scratch, khối lệnh nào dùng để tạm dừng giữa hai hành động một khoảng thời gian?',
        type: 'multiple_choice',
        options: ['Khối lệnh "Đợi (1) giây"', 'Khối lệnh "Đi tới"', 'Khối lệnh "Nói"', 'Khối lệnh "Lặp lại"'],
        correctAnswer: 'A',
        explanation: 'Khối lệnh Đợi (Wait ... secs) giúp nhân vật dừng lại đúng số giây trước khi thực hiện lệnh kế tiếp.',
        difficulty: 'thong_hieu',
        points: 1,
        createdAt: '2026-09-10T08:00:00Z',
      },
    ],
  },

  // =========================================================================
  // 3. CÔNG NGHỆ 5 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
  // =========================================================================
  {
    id: 'les_cn5_b01_sgk',
    subject: 'congnghe',
    grade: 5,
    bookType: 'sgk',
    bookName: 'Sách Giáo Khoa (SGK) - Kết nối tri thức',
    topic: 'Phần một: Công nghệ và đời sống',
    lessonNumber: 'Bài 1',
    title: 'Vai trò của công nghệ',
    description: 'Trình bày vai trò to lớn của các sản phẩm công nghệ trong đời sống và nhận thức được các mặt trái cần phòng tránh.',
    durationMinutes: 35,
    order: 1,
    iconName: 'Wrench',
    objectives: [
      'Trình bày được vai trò của sản phẩm công nghệ trong đời sống.',
      'Nhận biết được những mặt trái khi sử dụng công nghệ sai cách hoặc lạm dụng.',
    ],
    sections: [
      {
        id: 'sec_cn5_b01_01',
        title: '1. Vai trò của sản phẩm công nghệ trong đời sống',
        content: `Sản phẩm công nghệ hiện diện ở mọi nơi và mang lại tiện ích to lớn:
- Đáp ứng nhu cầu đi lại, ăn ở, giải trí: Xe máy, ô tô, nhà ở, máy tính, ti vi, tủ lạnh, quạt điện...
- Tăng năng suất lao động: Máy cày, máy gặt đập liên hợp, máy tuốt lúa, dây chuyền đóng chai tự động...
- Cải thiện và bảo vệ môi trường: Túi giấy, ống hút tre, cốc giấy tự hủy, tấm pin mặt trời...`,
        keyTakeaway: 'Công nghệ giúp nâng cao chất lượng cuộc sống, giảm bớt sức lao động và kết nối con người.',
        visualType: 'tool',
      },
      {
        id: 'sec_cn5_b01_02',
        title: '2. Mặt trái khi sử dụng công nghệ không đúng cách',
        content: `Nếu sử dụng công nghệ không hợp lý, con người có thể gặp phải các tác hại:
⚠️ Lệ thuộc vào công nghệ: Phép tính đơn giản cũng dùng máy tính, lười suy nghĩ ghi nhớ.
⚠️ Hạn chế giao tiếp trực tiếp: Trong bữa ăn gia đình mỗi người cắm mặt vào một chiếc điện thoại.
⚠️ Ảnh hưởng sức khỏe: Ngồi sai tư thế gây gù vẹo cột sống, nhìn màn hình quá lâu gây cận thị, mất ngủ.
⚠️ Mất an toàn thông tin: Bị lộ mật khẩu, mất dữ liệu riêng tư, bị kẻ xấu lừa đảo qua mạng.`,
        keyTakeaway: 'Sử dụng công nghệ điều độ, có ý thức và biết cân bằng thời gian vận động.',
        visualType: 'safety',
      },
    ],
    reviewQuestions: [
      {
        id: 'rq_cn5_b01_01',
        code: 'CN5_B01_01',
        subject: 'congnghe',
        grade: 5,
        topic: 'Phần một',
        lessonTitle: 'Bài 1: Vai trò của công nghệ',
        questionText: 'Hành động nào sau đây thể hiện việc sử dụng công nghệ một cách thông minh và an toàn?',
        type: 'multiple_choice',
        options: [
          'Học bài trên máy tính 30 phút rồi nghỉ ngơi, tập thể dục',
          'Vừa ăn cơm vừa bấm điện thoại xem hoạt hình',
          'Ngồi chơi game điện tử liên tục 5 tiếng đồng hồ',
          'Đưa thông tin số điện thoại bố mẹ cho bạn quen trên mạng',
        ],
        correctAnswer: 'A',
        explanation: 'Cân đối thời gian học tập số với vận động thể chất là thói quen lành mạnh.',
        difficulty: 'van_dung',
        points: 1,
        createdAt: '2026-09-01T09:00:00Z',
      },
    ],
  },

  {
    id: 'les_cn5_b02_sgk',
    subject: 'congnghe',
    grade: 5,
    bookType: 'sgk',
    bookName: 'Sách Giáo Khoa (SGK) - Kết nối tri thức',
    topic: 'Phần một: Công nghệ và đời sống',
    lessonNumber: 'Bài 2',
    title: 'Nhà sáng chế',
    description: 'Tìm hiểu về các nhà sáng chế tiêu biểu trong lịch sử nhân loại và rèn luyện các đức tính cần có để sáng chế.',
    durationMinutes: 35,
    order: 2,
    iconName: 'Lightbulb',
    objectives: [
      'Nêu được vai trò của sáng chế trong đời sống và sự phát triển của công nghệ.',
      'Tóm tắt được thông tin về một số nhà sáng chế nổi bật trong lịch sử loài người.',
      'Nêu được một số đức tính cần có để trở thành nhà sáng chế: kiên trì, tò mò khoa học, chăm chỉ.',
    ],
    sections: [
      {
        id: 'sec_cn5_b02_01',
        title: '1. Vai trò của sáng chế đối với đời sống',
        content: `Sáng chế là giải pháp kĩ thuật mới nhằm giải quyết một vấn đề thực tế:
- Bút chì, giấy viết ra đời thay thế cho việc khắc trên mai rùa, tre nứa.
- Bóng đèn điện thay thế cho nến sáp và đèn dầu le lói.
- Guồng nước dẫn nước tưới tiêu giúp mùa màng tươi tốt.
Sáng chế giúp thúc đẩy văn minh nhân loại, tạo ra sản phẩm tiện nghi và văn minh hơn.`,
        keyTakeaway: 'Mỗi sáng chế mới ra đời đều làm thay đổi cuộc sống con người theo hướng tốt đẹp hơn.',
        visualType: 'tool',
      },
      {
        id: 'sec_cn5_b02_02',
        title: '2. Bốn nhà sáng chế vĩ đại trong lịch sử',
        content: `1. Giêm Oát (James Watt, 1736 - 1819): Hoàn thiện Động cơ hơi nước (năm 1784), mở ra cuộc cách mạng công nghiệp.
2. A-lếch-xan-đơ Gra-ham Bell (1847 - 1922): Sáng chế ra chiếc Điện thoại đầu tiên (năm 1876).
3. Tô-mát Ê-đi-xơn (Thomas Edison, 1847 - 1931): Sáng chế Bóng đèn sợi đốt (năm 1879) và máy hát ghi âm.
4. Các Ben (Karl Benz, 1844 - 1929): Sáng chế Ô tô ba bánh chạy bằng động cơ bốn thì (năm 1886).`,
        keyTakeaway: 'Để sáng chế, các nhà khoa học phải trải qua hàng nghìn lần thử nghiệm thất bại nhưng không bao giờ nản lòng.',
        visualType: 'circuit',
      },
      {
        id: 'sec_cn5_b02_03',
        title: '3. Đức tính của nhà sáng chế nhí',
        content: `Để phát triển tư duy sáng chế, học sinh cần rèn luyện:
✨ Tính kiên trì, nhẫn nại, không sợ thất bại.
✨ Tính tò mò khoa học, luôn đặt câu hỏi "Tại sao?" trước các hiện tượng xung quanh.
✨ Óc quan sát tinh tế và khả năng vận dụng vật liệu tái chế để làm ra các mô hình hữu ích.`,
        keyTakeaway: 'Kiên trì + Đam mê tìm tòi = Chìa khóa của sự sáng tạo!',
        visualType: 'tool',
      },
    ],
    reviewQuestions: [
      {
        id: 'rq_cn5_b02_01',
        code: 'CN5_B02_01',
        subject: 'congnghe',
        grade: 5,
        topic: 'Phần một',
        lessonTitle: 'Bài 2: Nhà sáng chế',
        questionText: 'Ai là người đã sáng chế ra chiếc điện thoại truyền âm thanh đầu tiên vào năm 1876?',
        type: 'multiple_choice',
        options: [
          'A-lếch-xan-đơ Gra-ham Bell (Alexander Graham Bell)',
          'Giêm Oát (James Watt)',
          'Tô-mát Ê-đi-xơn (Thomas Edison)',
          'Các Ben (Karl Benz)',
        ],
        correctAnswer: 'A',
        explanation: 'Alexander Graham Bell được cấp bằng sáng chế điện thoại năm 1876.',
        difficulty: 'nhan_biet',
        points: 1,
        createdAt: '2026-09-02T09:00:00Z',
      },
    ],
  },

  {
    id: 'les_cn5_b07_sgk',
    subject: 'congnghe',
    grade: 5,
    bookType: 'sgk',
    bookName: 'Sách Giáo Khoa (SGK) - Kết nối tri thức',
    topic: 'Phần hai: Thủ công kĩ thuật',
    lessonNumber: 'Bài 7',
    title: 'Lắp ráp mô hình xe điện chạy bằng pin',
    description: 'Quy trình lựa chọn chi tiết, lắp ráp khung xe, động cơ và kiểm tra vận hành mô hình xe điện chạy bằng pin.',
    durationMinutes: 40,
    order: 7,
    iconName: 'Wrench',
    objectives: [
      'Kể tên, nhận biết được các chi tiết của bộ lắp ghép mô hình xe điện chạy bằng pin.',
      'Lắp ráp, vận hành được mô hình xe điện chạy bằng pin an toàn.',
    ],
    sections: [
      {
        id: 'sec_cn5_b07_01',
        title: '1. Cấu tạo mô hình xe điện',
        content: `Mô hình xe điện chạy bằng pin gồm 4 bộ phận chính:
1. Khung xe: Các thanh thẳng nhiều lỗ, thanh chữ U, tấm đáy bằng nhựa hoặc kim loại.
2. Trục và bánh xe: Gồm 2 trục xe, 4 bánh xe có lốp cao su ma sát và đai ốc hãm.
3. Động cơ và hệ truyền động: Mô tơ điện mini một chiều (DC) gắn bánh răng truyền động.
4. Nguồn điện: Hộp pin chứa 2 viên pin tiểu (1.5V) kèm công tắc bật/tắt (ON/OFF).`,
        keyTakeaway: 'Nguồn pin cung cấp dòng điện cho mô tơ quay, kéo theo trục bánh xe chuyển động.',
        visualType: 'circuit',
      },
      {
        id: 'sec_cn5_b07_02',
        title: '2. Các bước lắp ráp xe điện',
        content: `Quy trình lắp ráp chuẩn 4 bước:
• Bước 1: Lắp khung xe và giá đỡ mô tơ, hộp pin.
• Bước 2: Lắp trục bánh xe và bánh răng truyền động ăn khớp với trục mô tơ.
• Bước 3: Lắp động cơ và đấu dây điện từ hộp pin qua công tắc đến mô tơ.
• Bước 4: Kiểm tra và vận hành: Lắp pin, bật công tắc xem bánh xe có quay đúng chiều tiến về phía trước hay không.`,
        keyTakeaway: 'Đảm bảo các bu lông được siết vừa đủ chặt, bánh răng ăn khớp nhẹ nhàng không bị kẹt.',
        visualType: 'tool',
      },
    ],
    reviewQuestions: [
      {
        id: 'rq_cn5_b07_01',
        code: 'CN5_B07_01',
        subject: 'congnghe',
        grade: 5,
        topic: 'Phần hai',
        lessonTitle: 'Bài 7: Mô hình xe điện pin',
        questionText: 'Nếu bật công tắc mà bánh xe mô hình không quay, nguyên nhân có thể do đâu?',
        type: 'multiple_choice',
        options: [
          'Hết pin, lắp pin ngược cực hoặc bánh răng bị siết quá chặt',
          'Xe có màu sơn xanh',
          'Xe chạy trên sàn gạch',
          'Do xe có 4 bánh',
        ],
        correctAnswer: 'A',
        explanation: 'Cần kiểm tra pin, chiều cực dương/âm và độ trơn tru của trục bánh xe.',
        difficulty: 'van_dung',
        points: 1,
        createdAt: '2026-09-03T09:00:00Z',
      },
    ],
  },

  // =========================================================================
  // 4. CÔNG NGHỆ 4 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
  // =========================================================================
  {
    id: 'les_cn4_b01_vbt',
    subject: 'congnghe',
    grade: 4,
    bookType: 'sbt',
    bookName: 'Vở Bài Tập (VBT) - Kết nối tri thức',
    topic: 'Phần một: Công nghệ và đời sống',
    lessonNumber: 'Bài 1',
    title: 'Lợi ích của hoa, cây cảnh đối với đời sống',
    description: 'Thực hành các bài tập trắc nghiệm, nối cột về vai trò làm sạch không khí, trang trí cảnh quan của hoa và cây cảnh.',
    durationMinutes: 30,
    order: 1,
    iconName: 'PenTool',
    objectives: [
      'Nhận biết các loài hoa cây cảnh phổ biến trong gia đình và trường học.',
      'Hiểu rõ tác dụng thanh lọc không khí và bảo vệ môi trường của cây xanh.',
    ],
    sections: [
      {
        id: 'sec_cn4_b01_01',
        title: 'Tóm tắt bài học: Hoa và cây cảnh quanh em',
        content: `Hoa và cây cảnh đem lại rất nhiều lợi ích:
🌿 Làm đẹp cảnh quan phòng khách, lớp học, công viên.
🌿 Thanh lọc không khí, hấp thụ khí carbonic và giải phóng oxygen.
🌿 Một số loài cây có tác dụng làm thuốc (hoa cúc, nha đam, tía tô) hoặc làm hương liệu, nước hoa (hoa hồng, hoa nhài).`,
        keyTakeaway: 'Trồng và chăm sóc cây xanh giúp môi trường trong lành và tô điểm không gian sống.',
        visualType: 'tool',
      },
    ],
    reviewQuestions: [
      {
        id: 'rq_cn4_b01_01',
        code: 'CN4_RQ_01',
        subject: 'congnghe',
        grade: 4,
        topic: 'Phần một',
        lessonTitle: 'Bài 1: Lợi ích hoa cây cảnh',
        questionText: 'Khi cây quang hợp dưới ánh sáng mặt trời, cây hấp thụ khí gì và tạo ra khí gì?',
        type: 'multiple_choice',
        options: [
          'Hấp thụ khí carbonic (CO2) và tạo ra khí oxygen (O2)',
          'Hấp thụ khí oxygen và tạo ra carbonic',
          'Hấp thụ khí nitơ và tạo ra khói bụi',
          'Không hấp thụ khí nào',
        ],
        correctAnswer: 'A',
        explanation: 'Quang hợp giúp cân bằng lượng oxy trong khí quyển cho con người hít thở.',
        difficulty: 'thong_hieu',
        points: 1,
        createdAt: '2026-09-01T10:00:00Z',
      },
    ],
  },

  // =========================================================================
  // 5. CÔNG NGHỆ 3 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
  // =========================================================================
  {
    id: 'les_cn3_b02_vbt',
    subject: 'congnghe',
    grade: 3,
    bookType: 'sbt',
    bookName: 'Vở Bài Tập (VBT) - Kết nối tri thức',
    topic: 'Phần một: Công nghệ và đời sống',
    lessonNumber: 'Bài 2',
    title: 'Sử dụng đèn học an toàn',
    description: 'Nhận biết các bộ phận của đèn học để bàn, vị trí đặt đèn chuẩn và các hành vi an toàn phòng tránh giật điện, mỏi mắt.',
    durationMinutes: 30,
    order: 2,
    iconName: 'Zap',
    objectives: [
      'Nêu được tác dụng của đèn học và nhận biết các bộ phận chính: bóng đèn, chao đèn, thân đèn, công tắc, dây nguồn.',
      'Thực hiện được thao tác bật, tắt và điều chỉnh đèn học an toàn.',
    ],
    sections: [
      {
        id: 'sec_cn3_b02_01',
        title: 'Các bộ phận chính của đèn học',
        content: `Chiếc đèn học gồm có:
1. Chao đèn: Gom ánh sáng tập trung xuống bàn học và che đỡ không cho ánh sáng chói vào mắt.
2. Bóng đèn: Phát ra ánh sáng (nên dùng bóng LED ánh sáng dịu chống cận).
3. Thân đèn: Có thể uốn cong hoặc nâng cao thấp linh hoạt.
4. Công tắc: Bật hoặc tắt dòng điện.
5. Đế đèn: Giữ cho đèn đứng vững trên mặt bàn.
6. Phích cắm & Dây nguồn: Dẫn điện an toàn vào đèn.`,
        keyTakeaway: 'Chao đèn giúp bảo vệ mắt, không để bóng đèn bị va đập vỡ nổ.',
        visualType: 'safety',
      },
      {
        id: 'sec_cn3_b02_02',
        title: 'Quy tắc an toàn khi sử dụng đèn',
        content: `⚠️ Tuyệt đối không dùng tay ướt để bật/tắt công tắc hoặc cắm phích điện.
⚠️ Không sờ tay trực tiếp vào bóng đèn khi đèn đang sáng vì bóng rất nóng có thể gây bỏng.
⚠️ Tắt đèn khi không ngồi học để tiết kiệm điện và kéo dài tuổi thọ bóng đèn.`,
        keyTakeaway: 'Tay khô ráo trước khi chạm vào công tắc; tắt đèn khi ra khỏi phòng học.',
        visualType: 'safety',
      },
    ],
    reviewQuestions: [
      {
        id: 'rq_cn3_b02_01',
        code: 'CN3_RQ_01',
        subject: 'congnghe',
        grade: 3,
        topic: 'Phần một',
        lessonTitle: 'Bài 2: Sử dụng đèn học',
        questionText: 'Bộ phận nào của chiếc đèn học có tác dụng định hướng ánh sáng xuống mặt bàn và bảo vệ mắt khỏi bị lóa?',
        type: 'multiple_choice',
        options: ['Chao đèn (chụp đèn)', 'Dây nguồn', 'Đế đèn', 'Phích cắm'],
        correctAnswer: 'A',
        explanation: 'Chao đèn chắn bớt tia sáng chói rọi vào mắt và gom ánh sáng chiếu thẳng vào trang vở.',
        difficulty: 'nhan_biet',
        points: 1,
        createdAt: '2026-09-01T10:30:00Z',
      },
    ],
  },
];

export const initialExams: Exam[] = [
  {
    id: 'exam_th_k4',
    title: 'Đề kiểm tra Giữa kỳ I - Tin học 4 (Kết nối tri thức)',
    subject: 'tinhoc',
    grade: 4,
    durationMinutes: 20,
    questionCount: 4,
    createdAt: '2026-09-15T09:00:00Z',
  },
  {
    id: 'exam_th_k5',
    title: 'Đề kiểm tra Giữa kỳ I - Tin học 5 (Kết nối tri thức)',
    subject: 'tinhoc',
    grade: 5,
    durationMinutes: 20,
    questionCount: 4,
    createdAt: '2026-09-15T09:00:00Z',
  },
  {
    id: 'exam_cn_k5',
    title: 'Đề kiểm tra Định kỳ - Công nghệ 5 (Kết nối tri thức)',
    subject: 'congnghe',
    grade: 5,
    durationMinutes: 20,
    questionCount: 4,
    createdAt: '2026-09-20T09:00:00Z',
  },
  {
    id: 'exam_cn_k4',
    title: 'Đề kiểm tra Định kỳ - Công nghệ 4 (Kết nối tri thức)',
    subject: 'congnghe',
    grade: 4,
    durationMinutes: 15,
    questionCount: 4,
    createdAt: '2026-09-20T09:00:00Z',
  },
];

export const initialStudentProfile: StudentProfile = {
  name: 'Bảo Nam',
  grade: 4,
  avatar: '🚀',
  totalStars: 45,
  streakDays: 5,
  completedLessons: ['les_th4_b01_sgk'],
  completedExercises: ['q_th4_01', 'q_th4_02'],
  earnedBadges: [
    {
      id: 'badge_first_lesson',
      name: 'Khởi đầu rực rỡ',
      description: 'Hoàn thành bài học đầu tiên môn Tin học',
      icon: '🌟',
      unlockedAt: '2026-09-02T10:00:00Z',
    },
    {
      id: 'badge_safe_master',
      name: 'Chiến sĩ An Toàn',
      description: 'Đạt điểm tối đa bài tập An toàn điện',
      icon: '🛡️',
      unlockedAt: '2026-09-08T14:30:00Z',
    },
    {
      id: 'badge_speedy_mouse',
      name: 'Thần Chuột Siêu Tốc',
      description: 'Chiến thắng trò chơi Ghép hình thiết bị',
      icon: '🖱️',
      unlockedAt: '2026-09-12T16:00:00Z',
    },
  ],
};

export const initialNotices: TeacherNotice[] = [
  {
    id: 'notice_01',
    title: 'Cập nhật bộ sách chuẩn: Kết nối tri thức với cuộc sống!',
    content: 'Thầy cô đã bổ sung toàn bộ sách giáo khoa, sách giáo viên và vở bài tập Tin học & Công nghệ từ lớp 1 đến lớp 5. Các em hãy chọn đúng lớp và loại sách để học nhé!',
    date: '12/10/2026',
    category: 'tintuc',
    important: true,
  },
  {
    id: 'notice_02',
    title: 'Quy định hoàn thành bài học: Đạt 100% tiến trình',
    content: 'Để được công nhận hoàn thành bài học và nhận 15 sao thưởng, học sinh cần đọc kĩ tất cả các phần lý thuyết và hoàn thành toàn bộ bài tập ôn trong bài học.',
    date: '10/10/2026',
    category: 'nhacnho',
    important: true,
  },
];
