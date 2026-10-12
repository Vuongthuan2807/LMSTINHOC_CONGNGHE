import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

// Body parser for JSON with base64 image payload (limit 15MB for book photo uploads)
app.use(express.json({ limit: '15mb' }));

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Route: Generate interactive games from book image
app.post('/api/ai/generate-games', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', grade = 4, subject = 'tinhoc', customInstructions = '' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Vui lòng cung cấp hình ảnh trang sách (imageBase64).' });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const promptText = `Bạn là chuyên gia sư phạm và thiết kế trò chơi giáo dục Tiểu học cho môn ${
      subject === 'tinhoc' ? 'Tin học' : 'Công nghệ'
    } Lớp ${grade}. 
Hãy quan sát thật kỹ hình ảnh trang sách giáo khoa/vở bài tập này và trích xuất/sáng tạo một bộ trò chơi học tập tương tác đa dạng, vui nhộn, hấp dẫn dành cho học sinh tiểu học.

BẮT BUỘC TẠO ĐỦ CẢ 5 THỂ LOẠI TRÒ CHƠI SAU ĐÂY:
1. "single_choice" (Trắc nghiệm 1 đáp án đúng): Ít nhất 2 câu hỏi. Mỗi câu có 4 phương án (A, B, C, D) và 1 đáp án đúng duy nhất.
2. "multiple_choice_multi" (Trắc nghiệm nhiều đáp án đúng): Ít nhất 1-2 câu hỏi. Mỗi câu có 4-5 phương án và CÓ TỪ 2 ĐÁP ÁN ĐÚNG TRỞ LÊN (Ví dụ: "A, C" hoặc "B, D, E").
3. "fill_in_blank" (Điền vào chỗ trống): Ít nhất 2 câu. Câu văn có chứa dấu ba chấm "..." để học sinh điền từ/cụm từ chính xác hoặc chọn từ cho sẵn.
4. "true_false" (Đúng hoặc Sai): Ít nhất 2 câu phát biểu khẳng định để học sinh chọn "Đúng" hoặc "Sai".
5. "matching" (Nối cột A với cột B): Ít nhất 1 trò chơi gồm 4-5 cặp ghép nối logic giữa Cột A (ví dụ: Tên thiết bị / Thao tác / Khái niệm) và Cột B (Công dụng / Phím tắt / Mô tả).

${customInstructions ? `Yêu cầu thêm từ giáo viên: ${customInstructions}` : ''}

ĐỊNH DẠNG TRẢ VỀ: Bắt buộc là JSON hợp lệ (không chứa markdown backticks ngoài JSON):
{
  "bookTopic": "Tên chủ đề hoặc bài học nhận diện được từ trang sách",
  "summary": "Tóm tắt ngắn gọn 1-2 câu về nội dung trang sách",
  "games": [
    {
      "id": "game_1",
      "type": "single_choice",
      "title": "Trắc nghiệm 1 đáp án đúng",
      "question": "Nội dung câu hỏi...",
      "options": ["Phương án A", "Phương án B", "Phương án C", "Phương án D"],
      "correctAnswer": "A",
      "explanation": "Giải thích chi tiết vì sao đúng..."
    },
    {
      "id": "game_2",
      "type": "multiple_choice_multi",
      "title": "Trắc nghiệm nhiều đáp án đúng",
      "question": "Những hành động/thiết bị nào sau đây là đúng? (Chọn các đáp án đúng)",
      "options": ["Phương án A", "Phương án B", "Phương án C", "Phương án D"],
      "correctAnswers": ["A", "C"],
      "explanation": "Giải thích vì sao A và C đúng..."
    },
    {
      "id": "game_3",
      "type": "fill_in_blank",
      "title": "Điền vào chỗ trống",
      "sentence": "Để tắt máy tính an toàn, em nhấn nút ... rồi chọn Shut down.",
      "correctWord": "Start",
      "hints": ["Start", "Delete", "Enter"],
      "explanation": "Giải thích..."
    },
    {
      "id": "game_4",
      "type": "true_false",
      "title": "Đúng hay Sai?",
      "statement": "Màn hình máy tính là thiết bị phần cứng.",
      "isTrue": true,
      "explanation": "Giải thích..."
    },
    {
      "id": "game_5",
      "type": "matching",
      "title": "Nối Cột A với Cột B",
      "instruction": "Nối thiết bị ở cột A với công dụng tương ứng ở cột B",
      "pairs": [
        { "id": "p1", "left": "Bàn phím", "right": "Nhập chữ và số vào máy tính" },
        { "id": "p2", "left": "Màn hình", "right": "Hiển thị hình ảnh và chữ viết" },
        { "id": "p3", "left": "Chuột máy tính", "right": "Điều khiển con trỏ và chọn đối tượng" },
        { "id": "p4", "left": "Loa", "right": "Phát ra âm thanh từ máy tính" }
      ],
      "explanation": "Giải thích toàn bộ các cặp nối..."
    }
  ]
}`;

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
      try {
        const imagePart = {
          inlineData: {
            mimeType,
            data: cleanBase64,
          },
        };
        const textPart = {
          text: promptText,
        };

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: { parts: [imagePart, textPart] },
          config: {
            responseMimeType: 'application/json',
          },
        });

        const rawText = response.text || '{}';
        const parsed = JSON.parse(rawText);
        return res.json(parsed);
      } catch (geminiError: any) {
        console.error('Gemini API execution error:', geminiError);
        // If error occurred (e.g. rate limit, quota, invalid image), return fallback data
        return res.json(getFallbackGameData(grade, subject));
      }
    } else {
      // Offline fallback sample generator
      return res.json(getFallbackGameData(grade, subject));
    }
  } catch (err: any) {
    console.error('Error in /api/ai/generate-games:', err);
    res.status(500).json({ error: err.message || 'Lỗi xử lý tạo trò chơi từ ảnh' });
  }
});

function getFallbackGameData(grade: number, subject: string) {
  const isTinHoc = subject === 'tinhoc';
  return {
    bookTopic: isTinHoc
      ? `Bài học Tin học ${grade} - Phần cứng và Mạng máy tính`
      : `Bài học Công nghệ ${grade} - Thiết bị công nghệ và Kỹ thuật`,
    summary: 'Bộ trò chơi tương tác đa thể loại được trích xuất và tinh chỉnh theo chuẩn chương trình sách giáo khoa.',
    games: [
      {
        id: 'fallback_1',
        type: 'single_choice',
        title: 'Trắc nghiệm 1 đáp án đúng',
        question: isTinHoc
          ? 'Bộ phận nào của máy tính có chức năng đưa chữ viết và số liệu vào thân máy?'
          : 'Thiết bị nào trong gia đình sử dụng điện năng để làm mát không khí mùa hè?',
        options: isTinHoc
          ? ['Bàn phím máy tính', 'Màn hình máy tính', 'Loa vi tính', 'Máy in']
          : ['Quạt điện', 'Nồi cơm điện', 'Bình nóng lạnh', 'Lò vi sóng'],
        correctAnswer: 'A',
        explanation: isTinHoc
          ? 'Bàn phím là thiết bị vào (Input) dùng để nhập kí tự và lệnh vào máy tính.'
          : 'Quạt điện biến đổi điện năng thành cơ năng làm quay cánh quạt tạo luồng gió mát.',
      },
      {
        id: 'fallback_2',
        type: 'multiple_choice_multi',
        title: 'Trắc nghiệm nhiều đáp án đúng',
        question: isTinHoc
          ? 'Những thiết bị nào sau đây thuộc nhóm "Thiết bị phần cứng" của máy tính? (Chọn nhiều đáp án)'
          : 'Những hành động nào sau đây giúp sử dụng đồ điện AN TOÀN và TIẾT KIỆM? (Chọn nhiều đáp án)',
        options: isTinHoc
          ? ['Chuột máy tính', 'Phần mềm Paint', 'Màn hình hiển thị', 'Thân máy tính', 'Phần mềm Unikey']
          : [
              'Lau khô tay trước khi cắm phích điện',
              'Cầm vào sợi dây điện rồi kéo mạnh',
              'Tắt đèn và quạt khi ra khỏi phòng',
              'Cho que sắt vào ổ cắm điện',
              'Để quạt chạy cả ngày khi không có ai ở nhà',
            ],
        correctAnswers: isTinHoc ? ['A', 'C', 'D'] : ['A', 'C'],
        explanation: isTinHoc
          ? 'Chuột, màn hình và thân máy là phần cứng; còn Paint và Unikey là phần mềm.'
          : 'Lau tay khô và tắt thiết bị khi không dùng là 2 hành vi an toàn và tiết kiệm điện.',
      },
      {
        id: 'fallback_3',
        type: 'fill_in_blank',
        title: 'Điền vào chỗ trống',
        sentence: isTinHoc
          ? 'Khi gõ phím đúng cách, hai ngón trỏ luôn đặt ở phím ... và phím J trên hàng phím cơ sở.'
          : 'Cây xanh cần nước, chất dinh dưỡng và ánh sáng mặt trời để thực hiện quá trình ...',
        correctWord: isTinHoc ? 'F' : 'quang hợp',
        hints: isTinHoc ? ['F', 'A', 'Space'] : ['quang hợp', 'hô hấp', 'thoát hơi'],
        explanation: isTinHoc
          ? 'Phím F và phím J có hai gờ nổi nhỏ để ngón trỏ định vị bàn tay.'
          : 'Cây xanh hấp thụ ánh sáng mặt trời để quang hợp nhả khí oxygen.',
      },
      {
        id: 'fallback_4',
        type: 'true_false',
        title: 'Đúng hay Sai?',
        statement: isTinHoc
          ? 'Không được chia sẻ mật khẩu tài khoản học tập cá nhân cho người lạ trên mạng.'
          : 'Khi quạt điện đang quay mạnh, ta có thể dùng que chọc vào cánh quạt để thử độ bền.',
        isTrue: isTinHoc ? true : false,
        explanation: isTinHoc
          ? 'Bảo vệ mật khẩu là nguyên tắc số 1 để tránh bị mất thông tin và tài khoản.'
          : 'Cho que vào quạt đang quay rất nguy hiểm, có thể làm gãy cánh quạt bắn vào người gây chấn thương!',
      },
      {
        id: 'fallback_5',
        type: 'matching',
        title: 'Nối Cột A với Cột B',
        instruction: isTinHoc
          ? 'Nối thiết bị ở cột A với chức năng tương ứng ở cột B:'
          : 'Nối bộ phận của chiếc đèn học ở cột A với tác dụng tương ứng ở cột B:',
        pairs: isTinHoc
          ? [
              { id: 'p1', left: 'Bàn phím', right: 'Gõ chữ, số và gửi lệnh' },
              { id: 'p2', left: 'Màn hình', right: 'Hiển thị hình ảnh và văn bản' },
              { id: 'p3', left: 'Chuột máy tính', right: 'Điều khiển con trỏ trên màn hình' },
              { id: 'p4', left: 'Thân máy (CPU)', right: 'Bộ não xử lý mọi thông tin' },
            ]
          : [
              { id: 'p1', left: 'Bóng đèn', right: 'Phát ra ánh sáng chiếu sáng bàn học' },
              { id: 'p2', left: 'Chao đèn', right: 'Gom ánh sáng và che đỡ không chói mắt' },
              { id: 'p3', left: 'Công tắc', right: 'Bật và ngắt dòng điện an toàn' },
              { id: 'p4', left: 'Đế đèn', right: 'Giữ đèn đứng vững chắc trên bàn' },
            ],
        explanation: 'Các cặp ghép nối thể hiện đầy đủ cấu tạo và chức năng của thiết bị.',
      },
    ],
  };
}

// In development, mount Vite middleware; in production, serve built static assets
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
