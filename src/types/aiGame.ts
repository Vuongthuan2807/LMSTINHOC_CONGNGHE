export interface SingleChoiceGame {
  id: string;
  type: 'single_choice';
  title: string;
  question: string;
  options: string[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  explanation: string;
}

export interface MultiChoiceGame {
  id: string;
  type: 'multiple_choice_multi';
  title: string;
  question: string;
  options: string[];
  correctAnswers: string[]; // e.g. ['A', 'C']
  explanation: string;
}

export interface FillInBlankGame {
  id: string;
  type: 'fill_in_blank';
  title: string;
  sentence: string; // e.g. "Khi gõ phím, ngón trỏ đặt ở phím ... và J"
  correctWord: string;
  hints?: string[];
  explanation: string;
}

export interface TrueFalseGame {
  id: string;
  type: 'true_false';
  title: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface MatchingGame {
  id: string;
  type: 'matching';
  title: string;
  instruction: string;
  pairs: MatchingPair[];
  explanation: string;
}

export type GeneratedGame =
  | SingleChoiceGame
  | MultiChoiceGame
  | FillInBlankGame
  | TrueFalseGame
  | MatchingGame;

export interface AIGameSet {
  bookTopic: string;
  summary: string;
  games: GeneratedGame[];
}
