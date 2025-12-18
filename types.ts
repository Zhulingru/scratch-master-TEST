export enum BlockCategory {
  Motion = 'Motion',
  Looks = 'Looks',
  Sound = 'Sound',
  Events = 'Events',
  Control = 'Control',
  Sensing = 'Sensing',
  Operators = 'Operators',
  Variables = 'Variables'
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  category: BlockCategory;
  options: Option[];
  correctOptionId: string;
}

export interface QuizState {
  answers: Record<number, string>; // questionId -> optionId
  isSubmitted: boolean;
  score: number;
}