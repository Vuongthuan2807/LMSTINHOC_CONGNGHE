import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Zap,
  Mouse,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Timer,
  Star,
  Flame,
  ArrowRight,
  Layers,
  ListOrdered,
  Camera,
} from 'lucide-react';
import { fireFireworks, fireStars } from '../../services/confetti';
import { soundService } from '../../services/sound';
import { useAppStore } from '../../store/useAppStore';

type GameId = 'matching' | 'sorting' | 'safety' | 'algorithm' | 'reflex';

export const GamesPage: React.FC = () => {
  const { addStars, setActiveTab } = useAppStore();
  const [selectedGame, setSelectedGame] = useState<GameId>('safety');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Top Banner & Game Switcher */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black mb-2">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Góc Vui Học Trải Nghiệm</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Khu Vui Chơi Giáo Dục Số
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Vừa chơi vui nhộn vừa rèn luyện phản xạ, trí nhớ và kiến thức công nghệ
            </p>
          </div>

          <button
            onClick={() => setActiveTab('ai-games')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-md shadow-purple-600/20 hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            <Camera className="w-4 h-4" />
            <span>AI Chụp Sách Tạo Game 📸</span>
          </button>
        </div>

        {/* Game Selection Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <button
            onClick={() => {
              soundService.playClick();
              setSelectedGame('safety');
            }}
            className={`p-3 rounded-2xl text-xs font-black transition-all flex flex-col items-center gap-2 border text-center ${
              selectedGame === 'safety'
                ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20 scale-102'
                : 'bg-slate-50 hover:bg-rose-50/60 border-slate-200 text-slate-700'
            }`}
          >
            <ShieldCheck className="w-6 h-6" />
            <span>Bé An Toàn Điện & Mạng</span>
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              setSelectedGame('matching');
            }}
            className={`p-3 rounded-2xl text-xs font-black transition-all flex flex-col items-center gap-2 border text-center ${
              selectedGame === 'matching'
                ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20 scale-102'
                : 'bg-slate-50 hover:bg-sky-50/60 border-slate-200 text-slate-700'
            }`}
          >
            <Layers className="w-6 h-6" />
            <span>Ghép Thẻ Thiết Bị</span>
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              setSelectedGame('sorting');
            }}
            className={`p-3 rounded-2xl text-xs font-black transition-all flex flex-col items-center gap-2 border text-center ${
              selectedGame === 'sorting'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 scale-102'
                : 'bg-slate-50 hover:bg-emerald-50/60 border-slate-200 text-slate-700'
            }`}
          >
            <Sparkles className="w-6 h-6" />
            <span>Phân Loại Thiết Bị</span>
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              setSelectedGame('algorithm');
            }}
            className={`p-3 rounded-2xl text-xs font-black transition-all flex flex-col items-center gap-2 border text-center ${
              selectedGame === 'algorithm'
                ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20 scale-102'
                : 'bg-slate-50 hover:bg-purple-50/60 border-slate-200 text-slate-700'
            }`}
          >
            <ListOrdered className="w-6 h-6" />
            <span>Sắp Xếp Thuật Toán</span>
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              setSelectedGame('reflex');
            }}
            className={`p-3 rounded-2xl text-xs font-black transition-all flex flex-col items-center gap-2 border text-center ${
              selectedGame === 'reflex'
                ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20 scale-102'
                : 'bg-slate-50 hover:bg-amber-50/60 border-slate-200 text-slate-700'
            }`}
          >
            <Mouse className="w-6 h-6" />
            <span>Chuột Bắt Virus Nhanh</span>
          </button>
        </div>
      </div>

      {/* ACTIVE GAME CONTAINER */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sky-100 shadow-md">
        {selectedGame === 'safety' && <SafetyGame onWin={(stars) => addStars(stars)} />}
        {selectedGame === 'matching' && <MatchingGame onWin={(stars) => addStars(stars)} />}
        {selectedGame === 'sorting' && <SortingGame onWin={(stars) => addStars(stars)} />}
        {selectedGame === 'algorithm' && <AlgorithmGame onWin={(stars) => addStars(stars)} />}
        {selectedGame === 'reflex' && <ReflexGame onWin={(stars) => addStars(stars)} />}
      </div>

    </div>
  );
};

/* =========================================================
   1. TRÒ CHƠI BÉ AN TOÀN ĐIỆN & MẠNG (SAFE VS UNSAFE)
   ========================================================= */
interface SafetyScenario {
  id: number;
  action: string;
  isSafe: boolean;
  explanation: string;
}

const safetyScenarios: SafetyScenario[] = [
  {
    id: 1,
    action: 'Lau khô tay bằng khăn trước khi bấm công tắc đèn điện',
    isSafe: true,
    explanation: 'Rất tốt! Tay khô ráo giúp cách điện và bảo đảm an toàn.',
  },
  {
    id: 2,
    action: 'Dùng que kim loại hoặc compa chọc vào ổ cắm điện',
    isSafe: false,
    explanation: 'Cực kỳ nguy hiểm! Kim loại dẫn điện gây giật điện chết người!',
  },
  {
    id: 3,
    action: 'Chia sẻ mật khẩu tài khoản học tập cho người lạ trên mạng',
    isSafe: false,
    explanation: 'Nguy hiểm! Cần bảo mật mật khẩu cá nhân cẩn thận.',
  },
  {
    id: 4,
    action: 'Ngồi học thẳng lưng và giữ khoảng cách 50-80cm với màn hình máy tính',
    isSafe: true,
    explanation: 'Tuyệt vời! Bảo vệ mắt và cột sống phát triển khỏe mạnh.',
  },
  {
    id: 5,
    action: 'Rút phích cắm điện bằng cách cầm vào sợi dây rồi kéo mạnh',
    isSafe: false,
    explanation: 'Nguy hiểm! Kéo dây có thể làm đứt dây gây hở điện.',
  },
  {
    id: 6,
    action: 'Tắt quạt và đèn khi bước ra khỏi phòng học',
    isSafe: true,
    explanation: 'Rất tốt! Vừa tiết kiệm điện vừa phòng chống cháy nổ.',
  },
  {
    id: 7,
    action: 'Bấm vào đường link lạ có thông báo "Bấm vào để nhận kim cương miễn phí"',
    isSafe: false,
    explanation: 'Nguy hiểm! Đó là link lừa đảo chứa mã độc hại.',
  },
  {
    id: 8,
    action: 'Đưa kéo cho bạn bằng cách hướng cán kéo về phía bạn',
    isSafe: true,
    explanation: 'Chính xác! Đưa cán kéo giúp bạn không bị mũi kéo đâm trúng.',
  },
];

const SafetyGame: React.FC<{ onWin: (stars: number) => void }> = ({ onWin }) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ isRight: boolean; text: string } | null>(null);

  const currentScenario = safetyScenarios[index];

  const handleChoice = (choseSafe: boolean) => {
    if (feedback !== null || gameOver) return;

    const isRight = choseSafe === currentScenario.isSafe;
    if (isRight) {
      soundService.playCorrect();
      fireStars();
      setScore((s) => s + 10);
      setFeedback({ isRight: true, text: `ĐÚNG RỒI! ${currentScenario.explanation}` });
    } else {
      soundService.playWrong();
      setFeedback({ isRight: false, text: `CHƯA ĐÚNG! ${currentScenario.explanation}` });
    }

    setTimeout(() => {
      setFeedback(null);
      if (index < safetyScenarios.length - 1) {
        setIndex((i) => i + 1);
      } else {
        setGameOver(true);
        soundService.playFanfare();
        fireFireworks();
        onWin(15);
      }
    }, 1800);
  };

  const handleRestart = () => {
    soundService.playClick();
    setIndex(0);
    setScore(0);
    setGameOver(false);
    setFeedback(null);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto text-center">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="text-left">
          <span className="text-xs font-black uppercase text-rose-600">Trò chơi 1</span>
          <h2 className="text-xl font-black text-slate-900">Bé An Toàn Điện & Mạng</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Điểm số:</span>
          <span className="text-xl font-black text-amber-500 tabular-nums">{score}</span>
        </div>
      </div>

      {!gameOver ? (
        <div className="space-y-6 py-4">
          <div className="text-xs font-extrabold text-slate-400">
            Tình huống {index + 1} / {safetyScenarios.length}
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border-2 border-slate-200 shadow-inner min-h-[140px] flex items-center justify-center">
            <p className="text-lg sm:text-xl font-black text-slate-800 leading-snug">
              "{currentScenario.action}"
            </p>
          </div>

          {feedback && (
            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm font-black border transition-all ${
                feedback.isRight
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                  : 'bg-rose-100 border-rose-300 text-rose-900'
              }`}
            >
              {feedback.text}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              disabled={feedback !== null}
              onClick={() => handleChoice(true)}
              className="py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex flex-col items-center gap-1"
            >
              <CheckCircle2 className="w-8 h-8" />
              <span>HÀNH ĐỘNG AN TOÀN 👍</span>
            </button>

            <button
              disabled={feedback !== null}
              onClick={() => handleChoice(false)}
              className="py-5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-base shadow-lg shadow-rose-500/20 active:scale-95 transition-all flex flex-col items-center gap-1"
            >
              <XCircle className="w-8 h-8" />
              <span>NGUY HIỂM - CẤM LÀM 🚫</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="py-8 space-y-4">
          <Trophy className="w-16 h-16 text-amber-400 mx-auto" />
          <h3 className="text-2xl font-black text-slate-900">Bé Đã Hoàn Thành Thử Thách!</h3>
          <p className="text-sm font-bold text-slate-600">
            Tổng điểm của bé: <span className="text-rose-600 font-black">{score} điểm</span>. Bé xứng đáng là Dũng Sĩ An Toàn (+15 Sao ⭐)!
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm shadow-md"
          >
            Chơi lại từ đầu 🔄
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   2. GHÉP THẺ THIẾT BỊ (MEMORY CARDS)
   ========================================================= */
interface MemoryCard {
  id: number;
  name: string;
  iconText: string;
  matchId: number;
  flipped: boolean;
  matched: boolean;
}

const initialCardsData: { matchId: number; name: string; iconText: string }[] = [
  { matchId: 1, name: 'Màn hình', iconText: '🖥️' },
  { matchId: 2, name: 'Chuột máy tính', iconText: '🖱️' },
  { matchId: 3, name: 'Bàn phím', iconText: '⌨️' },
  { matchId: 4, name: 'Thân máy (CPU)', iconText: '🖲️' },
  { matchId: 5, name: 'Quạt điện', iconText: '🌀' },
  { matchId: 6, name: 'Đèn bàn', iconText: '💡' },
];

const MatchingGame: React.FC<{ onWin: (stars: number) => void }> = ({ onWin }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const initGame = () => {
    const deck: MemoryCard[] = [];
    initialCardsData.forEach((item, idx) => {
      // Card with icon
      deck.push({
        id: idx * 2,
        name: item.name,
        iconText: item.iconText,
        matchId: item.matchId,
        flipped: false,
        matched: false,
      });
      // Card with name
      deck.push({
        id: idx * 2 + 1,
        name: item.name,
        iconText: item.iconText,
        matchId: item.matchId,
        flipped: false,
        matched: false,
      });
    });

    // Shuffle deck
    deck.sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlippedIndices([]);
    setMoves(0);
    setMatchedPairs(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleFlip = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].flipped || cards[index].matched) return;
    soundService.playClick();

    const nextCards = [...cards];
    nextCards[index].flipped = true;
    setCards(nextCards);

    const nextFlipped = [...flippedIndices, index];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = nextFlipped;
      if (cards[firstIdx].matchId === cards[secondIdx].matchId) {
        // Matched!
        soundService.playCorrect();
        fireStars();
        setTimeout(() => {
          nextCards[firstIdx].matched = true;
          nextCards[secondIdx].matched = true;
          setCards([...nextCards]);
          setFlippedIndices([]);
          setMatchedPairs((p) => {
            const nextP = p + 1;
            if (nextP === initialCardsData.length) {
              soundService.playFanfare();
              fireFireworks();
              onWin(20);
            }
            return nextP;
          });
        }, 500);
      } else {
        // Not matched -> flip back
        soundService.playWrong();
        setTimeout(() => {
          nextCards[firstIdx].flipped = false;
          nextCards[secondIdx].flipped = false;
          setCards([...nextCards]);
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto text-center">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="text-left">
          <span className="text-xs font-black uppercase text-sky-600">Trò chơi 2</span>
          <h2 className="text-xl font-black text-slate-900">Ghép Thẻ Thiết Bị Công Nghệ</h2>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
          <span>Lượt mở: <b className="text-sky-600">{moves}</b></span>
          <span>Đã ghép: <b className="text-emerald-600">{matchedPairs}/{initialCardsData.length}</b></span>
        </div>
      </div>

      {matchedPairs === initialCardsData.length ? (
        <div className="py-8 space-y-4">
          <Trophy className="w-16 h-16 text-amber-400 mx-auto" />
          <h3 className="text-2xl font-black text-slate-900">Trí Nhớ Cực Đỉnh!</h3>
          <p className="text-sm font-bold text-slate-600">
            Bé hoàn thành trong {moves} lượt lật thẻ. (+20 Sao thưởng ⭐)
          </p>
          <button
            onClick={initGame}
            className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-sm shadow-md"
          >
            Chơi lại ván mới 🔄
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 py-4">
          {cards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => handleFlip(idx)}
              className={`h-24 sm:h-28 rounded-2xl font-black text-xs sm:text-sm flex flex-col items-center justify-center p-2 border-2 transition-all ${
                card.matched
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-950 opacity-80'
                  : card.flipped
                  ? 'bg-sky-100 border-sky-400 text-sky-950 scale-102 shadow-md'
                  : 'bg-gradient-to-br from-sky-400 to-indigo-500 border-sky-300 text-white hover:scale-102 cursor-pointer'
              }`}
            >
              {card.flipped || card.matched ? (
                <>
                  <span className="text-2xl sm:text-3xl mb-1">{card.iconText}</span>
                  <span className="truncate max-w-full text-[11px] font-bold">{card.name}</span>
                </>
              ) : (
                <span className="text-2xl">❓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* =========================================================
   3. PHÂN LOẠI THIẾT BỊ (TIN HỌC VS CÔNG NGHỆ GIA ĐỤNG)
   ========================================================= */
interface SortItem {
  id: number;
  name: string;
  category: 'tinhoc' | 'congnghe';
  icon: string;
}

const sortPool: SortItem[] = [
  { id: 1, name: 'Bàn phím máy tính', category: 'tinhoc', icon: '⌨️' },
  { id: 2, name: 'Quạt điện đứng', category: 'congnghe', icon: '🌀' },
  { id: 3, name: 'Chuột quang', category: 'tinhoc', icon: '🖱️' },
  { id: 4, name: 'Nồi cơm điện', category: 'congnghe', icon: '🍚' },
  { id: 5, name: 'Màn hình LCD', category: 'tinhoc', icon: '🖥️' },
  { id: 6, name: 'Tủ lạnh bảo quản', category: 'congnghe', icon: '🧊' },
  { id: 7, name: 'Tai nghe vi tính', category: 'tinhoc', icon: '🎧' },
  { id: 8, name: 'Bình nóng lạnh', category: 'congnghe', icon: '🚿' },
];

const SortingGame: React.FC<{ onWin: (stars: number) => void }> = ({ onWin }) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const currentItem = sortPool[index];

  const handleClassify = (cat: 'tinhoc' | 'congnghe') => {
    if (gameOver) return;

    if (cat === currentItem.category) {
      soundService.playCorrect();
      fireStars();
      setScore((s) => s + 10);
    } else {
      soundService.playWrong();
    }

    if (index < sortPool.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setGameOver(true);
      soundService.playFanfare();
      fireFireworks();
      onWin(15);
    }
  };

  const restart = () => {
    soundService.playClick();
    setIndex(0);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto text-center">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="text-left">
          <span className="text-xs font-black uppercase text-emerald-600">Trò chơi 3</span>
          <h2 className="text-xl font-black text-slate-900">Phân Loại Thiết Bị Nhanh</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Điểm số:</span>
          <span className="text-xl font-black text-amber-500 tabular-nums">{score}</span>
        </div>
      </div>

      {!gameOver ? (
        <div className="space-y-6 py-4">
          <span className="text-xs font-bold text-slate-400">
            Vật phẩm {index + 1} / {sortPool.length}
          </span>

          <div className="p-8 rounded-3xl bg-slate-50 border-2 border-slate-200 flex flex-col items-center justify-center gap-3">
            <span className="text-5xl">{currentItem.icon}</span>
            <span className="text-2xl font-black text-slate-800">{currentItem.name}</span>
          </div>

          <p className="text-xs sm:text-sm font-bold text-slate-500">
            Vật phẩm trên thuộc nhóm nào dưới đây?
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleClassify('tinhoc')}
              className="py-5 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-sm shadow-md shadow-sky-500/20 active:scale-95 transition-all"
            >
              💻 THIẾT BỊ TIN HỌC
            </button>

            <button
              onClick={() => handleClassify('congnghe')}
              className="py-5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
            >
              🔌 THIẾT BỊ CÔNG NGHỆ GIA DỤNG
            </button>
          </div>
        </div>
      ) : (
        <div className="py-8 space-y-4">
          <Trophy className="w-16 h-16 text-amber-400 mx-auto" />
          <h3 className="text-2xl font-black text-slate-900">Hoàn Thành Phân Loại!</h3>
          <p className="text-sm font-bold text-slate-600">
            Bé đạt: <span className="text-emerald-600 font-black">{score} điểm</span>. (+15 Sao ⭐)
          </p>
          <button
            onClick={restart}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md"
          >
            Chơi lại 🔄
          </button>
        </div>
      )}
    </div>
  );
};

/* =========================================================
   4. SẮP XẾP THUẬT TOÁN (ALGORITHM STEPS)
   ========================================================= */
const initialAlgoSteps = [
  { id: 'step_1', text: '1. Cắm dây nguồn hoặc kiểm tra ổ điện an toàn', correctPos: 0 },
  { id: 'step_2', text: '2. Nhấn nút nguồn (Power) trên thân máy tính', correctPos: 1 },
  { id: 'step_3', text: '3. Nhấn nút mở màn hình máy tính', correctPos: 2 },
  { id: 'step_4', text: '4. Chờ máy tính khởi động và xuất hiện màn hình làm việc', correctPos: 3 },
];

const AlgorithmGame: React.FC<{ onWin: (stars: number) => void }> = ({ onWin }) => {
  const [steps, setSteps] = useState(() => [...initialAlgoSteps].sort(() => Math.random() - 0.5));
  const [isSuccess, setIsSuccess] = useState(false);

  const moveUp = (index: number) => {
    if (index === 0) return;
    soundService.playClick();
    const next = [...steps];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    setSteps(next);
  };

  const moveDown = (index: number) => {
    if (index === steps.length - 1) return;
    soundService.playClick();
    const next = [...steps];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    setSteps(next);
  };

  const handleCheckOrder = () => {
    const isCorrect = steps.every((s, idx) => s.correctPos === idx);
    if (isCorrect) {
      soundService.playFanfare();
      fireFireworks();
      setIsSuccess(true);
      onWin(20);
    } else {
      soundService.playWrong();
    }
  };

  const reset = () => {
    soundService.playClick();
    setSteps([...initialAlgoSteps].sort(() => Math.random() - 0.5));
    setIsSuccess(false);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto text-center">
      <div className="border-b border-slate-100 pb-4 text-left">
        <span className="text-xs font-black uppercase text-purple-600">Trò chơi 4</span>
        <h2 className="text-xl font-black text-slate-900">
          Sắp Xếp Thuật Toán: "Bật Máy Tính Đúng Cách"
        </h2>
        <p className="text-xs text-slate-500">
          Dùng nút mũi tên Lên/Xuống để sắp xếp các bước theo thứ tự hợp lý từ 1 đến 4!
        </p>
      </div>

      <div className="space-y-3 py-2">
        {steps.map((st, idx) => (
          <div
            key={st.id}
            className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-center justify-between gap-3 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <span className="font-bold text-xs sm:text-sm text-slate-800">{st.text}</span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                disabled={idx === 0 || isSuccess}
                onClick={() => moveUp(idx)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 disabled:opacity-30"
              >
                ▲
              </button>
              <button
                disabled={idx === steps.length - 1 || isSuccess}
                onClick={() => moveDown(idx)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 disabled:opacity-30"
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>

      {isSuccess ? (
        <div className="p-5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 font-black text-sm space-y-2">
          <div>🎉 Thuật toán hoàn hảo! Bé đã nắm vững các bước bật máy tính chuẩn xác (+20 Sao ⭐)!</div>
          <button
            onClick={reset}
            className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
          >
            Xáo trộn lại 🔄
          </button>
        </div>
      ) : (
        <button
          onClick={handleCheckOrder}
          className="px-8 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-sm shadow-md"
        >
          Kiểm Tra Thứ Tự 🚀
        </button>
      )}
    </div>
  );
};

/* =========================================================
   5. BẮT VIRUS PHẢN XẠ CHUỘT NHANH (FAST CLICK CHALLENGE)
   ========================================================= */
const ReflexGame: React.FC<{ onWin: (stars: number) => void }> = ({ onWin }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [bugPosition, setBugPosition] = useState({ top: 40, left: 50 });

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          soundService.playFanfare();
          fireFireworks();
          onWin(15);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, onWin]);

  const handleStart = () => {
    soundService.playClick();
    setScore(0);
    setTimeLeft(15);
    setIsPlaying(true);
    relocateBug();
  };

  const relocateBug = () => {
    const top = Math.floor(Math.random() * 70) + 10;
    const left = Math.floor(Math.random() * 75) + 10;
    setBugPosition({ top, left });
  };

  const handleCatchBug = () => {
    if (!isPlaying) return;
    soundService.playClick();
    fireStars();
    setScore((s) => s + 1);
    relocateBug();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto text-center">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="text-left">
          <span className="text-xs font-black uppercase text-amber-600">Trò chơi 5</span>
          <h2 className="text-xl font-black text-slate-900">Luyện Chuột Bắt Virus Siêu Tốc</h2>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
          <span>Thời gian: <b className="text-rose-600 tabular-nums">{timeLeft}s</b></span>
          <span>Bắt được: <b className="text-amber-500 text-base tabular-nums">{score}</b> con</span>
        </div>
      </div>

      <div className="relative h-64 sm:h-72 rounded-3xl bg-slate-900 border-2 border-slate-800 overflow-hidden shadow-inner flex items-center justify-center">
        {!isPlaying ? (
          <div className="space-y-3 z-10 text-white">
            <h3 className="text-lg font-black">Sẵn Sàng Bắt Virus Chạy Trốn?</h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Nhấp chuột thật nhanh vào các chú virus sâu máy tính xuất hiện ngẫu nhiên trong 15 giây!
            </p>
            <button
              onClick={handleStart}
              className="px-8 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Bắt đầu ngay 🚀
            </button>
          </div>
        ) : (
          <button
            onClick={handleCatchBug}
            style={{ top: `${bugPosition.top}%`, left: `${bugPosition.left}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-4xl p-2 rounded-2xl hover:scale-125 active:scale-90 transition-transform cursor-pointer animate-bounce select-none"
            title="Bắt lấy!"
          >
            👾
          </button>
        )}
      </div>
    </div>
  );
};
