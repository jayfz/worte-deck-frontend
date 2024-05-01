export type User = {
  firstName: string;
  lastName: string;
  email: string;
};

export type AuthenticatedUser = {
  user: User;
  token: string;
  expirationDate: string;
};

export type AppRestResponse<T> = {
  outcome: 'success' | 'fail';
  payload: T;
};

type ResponsePage = {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  number: number;
  order: 'string';
};

export type CreatedPracticeSession = {
  practiceSessionId: number;
};

export type PagedAppRestResponse<T> = AppRestResponse<T> & {
  page: ResponsePage;
};
export type WordType = 'NOUN' | 'ADJECTIVE' | 'VERB' | 'ADVERB' | 'COMMON_EXPRESSION';

export type BaseWord = {
  id: number;
  word: string;
  pronunciations: string[];
  englishTranslations: string[];
  recordingURLs: string[];
  germanExample: string;
  germanExampleRecordingURLs: string[];
  englishExample: string;
  isReady: boolean;
  matches: string[];
};
export type NounGender = 'MASCULINE' | 'FEMENINE' | 'NEUTER';

export type Noun = BaseWord & {
  type: 'NOUN';
  gender: NounGender | null;
  plural: string | null;
};

export type Adjective = BaseWord & {
  type: 'ADJECTIVE';
  isComparable: boolean | null;
  comparative: string | null;
  superlative: string | null;
};
export type Verb = BaseWord & {
  type: 'VERB';
  isRegular: boolean | null;
  isSeparable: boolean | null;
  hasPrefix: boolean | null;
};

export type Adverb = BaseWord & {
  type: 'ADVERB';
};

export type CommonExpression = BaseWord & {
  type: 'COMMON_EXPRESSION';
};

export type Word = Noun | Adjective | Verb | Adverb | CommonExpression;

export type WordStats = {
  nounCount: number;
  adjectiveCount: number;
  verbCount: number;
  adverbCount: number;
  commonExpressionCount: number;
};

export type PracticeSessionStats = {
  totalCount: number;
  averageScore: number;
  secondsSpent: number;
  vocabularyLevel: string;
  leftSwipeCount: number;
  rightSwipeCount: number;
};

export type DifficultWord = {
  wordId: number;
  word: string;
  englishTranslations: string[];
  leftSwipeCount: number;
};

export type VocabularyWord = {
  id: string;
  word: string;
  englishTranslations: string[];
  recordingURLs: string[];
  pronunciations: string[];
  type: WordType;
};

export type PracticeSessionResultSummary = {
  id: number;
  createdAt: string;
  wordsTestedCount: number;
  durationInSeconds: number;
  score: string;
};
