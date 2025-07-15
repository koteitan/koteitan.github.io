export interface Question {
  id: number;
  category: string;
  question: string;
  answer: 'massachusetts' | 'niigata';
  explanation: string;
  value?: string | number;
}

export interface GameState {
  currentQuestionIndex: number;
  score: {
    massachusetts: number;
    niigata: number;
  };
  answeredQuestions: number[];
  lastAnswer: {
    correct: boolean;
    explanation: string;
  } | null;
  gameOver: boolean;
}