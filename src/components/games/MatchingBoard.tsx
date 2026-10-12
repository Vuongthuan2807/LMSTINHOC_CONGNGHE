import React, { useState, useEffect } from 'react';
import { MatchingGame, MatchingPair } from '../../types/aiGame';
import { CheckCircle2, RotateCcw, Sparkles, HelpCircle } from 'lucide-react';
import { soundService } from '../../services/sound';
import { fireStars } from '../../services/confetti';

interface MatchingBoardProps {
  game: MatchingGame;
  onCompleted?: () => void;
}

export const MatchingBoard: React.FC<MatchingBoardProps> = ({ game, onCompleted }) => {
  // Pairs
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({}); // leftId -> rightId
  const [shuffledRights, setShuffledRights] = useState<{ id: string; text: string }[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize and shuffle the right column
  const initBoard = () => {
    setSelectedLeft(null);
    setMatchedPairs({});
    setIsSubmitted(false);
    setScore(0);

    const rights = game.pairs.map((p) => ({ id: p.id, text: p.right }));
    // Shuffle
    rights.sort(() => Math.random() - 0.5);
    setShuffledRights(rights);
  };

  useEffect(() => {
    initBoard();
  }, [game]);

  const handleSelectLeft = (leftId: string) => {
    if (isSubmitted) return;
    soundService.playClick();
    setSelectedLeft(leftId);
  };

  const handleSelectRight = (rightId: string) => {
    if (isSubmitted || !selectedLeft) return;
    soundService.playClick();

    // Check if rightId is already paired with another left, remove that pairing
    const newMatched = { ...matchedPairs };
    Object.keys(newMatched).forEach((k) => {
      if (newMatched[k] === rightId) {
        delete newMatched[k];
      }
    });

    newMatched[selectedLeft] = rightId;
    setMatchedPairs(newMatched);
    setSelectedLeft(null);
  };

  const handleUnpair = (leftId: string) => {
    if (isSubmitted) return;
    soundService.playClick();
    const newMatched = { ...matchedPairs };
    delete newMatched[leftId];
    setMatchedPairs(newMatched);
  };

  const handleCheck = () => {
    soundService.playClick();
    let correctCount = 0;
    game.pairs.forEach((p) => {
      if (matchedPairs[p.id] === p.id) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setIsSubmitted(true);

    if (correctCount === game.pairs.length) {
      soundService.playCorrect();
      fireStars();
      if (onCompleted) onCompleted();
    } else {
      soundService.playWrong();
    }
  };

  // Color generator for matched links
  const pairColors = [
    'border-sky-500 bg-sky-50 text-sky-950',
    'border-emerald-500 bg-emerald-50 text-emerald-950',
    'border-purple-500 bg-purple-50 text-purple-950',
    'border-amber-500 bg-amber-50 text-amber-950',
    'border-rose-500 bg-rose-50 text-rose-950',
  ];

  const getPairIndex = (leftId: string) => {
    const keys = Object.keys(matchedPairs);
    const idx = keys.indexOf(leftId);
    return idx >= 0 ? idx % pairColors.length : 0;
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs sm:text-sm font-black text-indigo-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
          <span>{game.instruction || 'Hãy chọn một ô ở Cột A, sau đó chọn ô tương ứng ở Cột B để nối lại với nhau!'}</span>
        </div>
        <button
          onClick={initBoard}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-indigo-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Nối lại</span>
        </button>
      </div>

      {/* MATCHING COLUMNS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* COLUMN A (LEFT) */}
        <div className="space-y-3">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 px-1">
            Cột A (Khái niệm / Thiết bị)
          </div>

          <div className="space-y-2.5">
            {game.pairs.map((p, idx) => {
              const isSelected = selectedLeft === p.id;
              const pairedRightId = matchedPairs[p.id];
              const colorClass = pairedRightId !== undefined ? pairColors[getPairIndex(p.id)] : 'bg-white border-slate-200 text-slate-800';

              let statusBorder = colorClass;
              if (isSubmitted) {
                const isRight = pairedRightId === p.id;
                statusBorder = isRight ? 'border-emerald-500 bg-emerald-50 text-emerald-950' : 'border-rose-500 bg-rose-50 text-rose-950';
              }

              return (
                <div
                  key={p.id}
                  onClick={() => handleSelectLeft(p.id)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 cursor-pointer select-none ${
                    isSelected ? 'ring-4 ring-sky-300 border-sky-600 bg-sky-100 scale-[1.02]' : statusBorder
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 border text-xs font-black flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-extrabold text-xs sm:text-sm">{p.left}</span>
                  </div>

                  {pairedRightId !== undefined && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnpair(p.id);
                      }}
                      className="text-[11px] font-bold text-slate-400 hover:text-rose-600 px-2 py-0.5 rounded-md hover:bg-rose-50 transition-colors"
                      title="Hủy nối cặp này"
                    >
                      ✕ Hủy
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN B (RIGHT) */}
        <div className="space-y-3">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 px-1">
            Cột B (Chức năng / Mô tả)
          </div>

          <div className="space-y-2.5">
            {shuffledRights.map((item, rIdx) => {
              const letter = String.fromCharCode(65 + rIdx); // A, B, C, D...
              
              // Find which left is paired with this right
              const pairedLeftKey = Object.keys(matchedPairs).find((k) => matchedPairs[k] === item.id);
              const isPaired = pairedLeftKey !== undefined;
              const colorClass = isPaired ? pairColors[getPairIndex(pairedLeftKey)] : 'bg-white border-slate-200 text-slate-800';

              let statusBorder = colorClass;
              if (isSubmitted && isPaired) {
                const isRight = pairedLeftKey === item.id;
                statusBorder = isRight ? 'border-emerald-500 bg-emerald-50 text-emerald-950' : 'border-rose-500 bg-rose-50 text-rose-950';
              }

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectRight(item.id)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 cursor-pointer select-none ${statusBorder} ${
                    selectedLeft ? 'hover:scale-[1.01] hover:border-sky-400' : ''
                  }`}
                >
                  <span className="w-7 h-7 rounded-xl bg-slate-100 border text-xs font-black flex items-center justify-center shrink-0">
                    {letter}
                  </span>
                  <span className="font-semibold text-xs sm:text-sm flex-1 leading-snug">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* CHECK ANSWER & RESULTS */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          {isSubmitted && (
            <div className="text-xs sm:text-sm font-black flex items-center gap-2">
              {score === game.pairs.length ? (
                <span className="text-emerald-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5" />
                  Xuất sắc! Bé đã nối đúng toàn bộ {score}/{game.pairs.length} cặp!
                </span>
              ) : (
                <span className="text-amber-700 flex items-center gap-1.5">
                  <HelpCircle className="w-5 h-5 text-amber-500" />
                  Bé nối đúng {score}/{game.pairs.length} cặp. Cùng thử lại để nối chuẩn hơn nhé!
                </span>
              )}
            </div>
          )}
        </div>

        <button
          disabled={Object.keys(matchedPairs).length === 0}
          onClick={handleCheck}
          className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-md shadow-indigo-600/20 disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
        >
          {isSubmitted ? 'Kiểm tra lại 🚀' : 'Kiểm Tra Các Cặp Nối 🎯'}
        </button>
      </div>

      {/* Explanation */}
      {isSubmitted && game.explanation && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-semibold">
          <span className="font-black">Giải thích đáp án: </span>
          {game.explanation}
        </div>
      )}
    </div>
  );
};
