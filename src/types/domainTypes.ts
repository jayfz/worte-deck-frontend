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
  gender: NounGender;
  plural: string;
};

export type Adjective = BaseWord & {
  type: 'ADJECTIVE';
  isComparable: boolean;
  comparative: string;
  superlative: string;
};
export type Verb = BaseWord & {
  type: 'VERB';
  isRegular: boolean;
  isSeparable: boolean;
  hasPrefix: boolean;
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

export type PracticeSessionResultSummary = {
  id: number;
  createdAt: string;
  wordsTestedCount: number;
  durationInSeconds: number;
  score: string;
};
