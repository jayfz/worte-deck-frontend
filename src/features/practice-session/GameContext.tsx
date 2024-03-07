import useGameWordsList from '@/features/practice-session/useGameWordList';
import useReportPracticeSessionResults from '@/features/practice-session/useReportPracticeSessionResults';
import { Word } from '@/types/domainTypes';
import { PropsWithChildren, createContext, useRef, useState } from 'react';

type GameStatus = 'NOT_STARTED' | 'STARTED' | 'ABORTED' | 'COMPLETED';
export type GameResults = {
  duration: number;
  movements: GameMovement[];
};
type GameContextType = {
  currentWord: Word;
  nextWord: Word;
  score: number;
  completed: number;
  isFetchingWord: boolean;
  recordMove: (movement: GameMovement) => void;
  gameStatus: GameStatus;
  abortGame: () => void;
  reportGameResults: () => void;
  gameResults: GameResults;
  isSavingPracticeSessionResults: boolean;
  //pauseTimer()
  //resumeTimer()
};

export const GameContext = createContext<GameContextType | null>(null);

type GameContextProviderType = {
  practiceSessionId: number;
};

type GameMovement = {
  wordId: number;
  decision: 'LEFT' | 'RIGHT';
};

export function GameContextProvider({ children, practiceSessionId }: PropsWithChildren<GameContextProviderType>) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [movements, setMovements] = useState<GameMovement[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('STARTED');
  const startedAtRef = useRef(Date.now());
  const { reportPracticeSessionResults, isSavingPracticeSessionResults } = useReportPracticeSessionResults();

  const gameResults: GameResults = {
    duration: Math.floor((Date.now() - startedAtRef.current) / 1000),
    movements,
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useGameWordsList(practiceSessionId);

  const wordPool = data?.pages.flatMap((page) => page.payload) ?? [];
  const gameSessionWordCount = data?.pages[0].page.totalElements ?? 0;

  const recordMove = (move: GameMovement) => {
    const allMovements = [...movements, move];
    setMovements(allMovements);
    if (allMovements.length == gameSessionWordCount) {
      setGameStatus('COMPLETED');
    } else {
      setCurrentWordIndex((prev) => prev + 1);
      console.log('recorded move', move, allMovements.length);
    }

    if (allMovements.length == wordPool.length && hasNextPage) {
      fetchNextPage();
    }
  };

  const reportGameResults = () => {
    reportPracticeSessionResults(gameResults);
  };

  const abortGame = () => {
    setGameStatus('ABORTED');
  };

  const providerValue: GameContextType = {
    completed: (movements.length / gameSessionWordCount) * 100 || 0,
    score: (movements.filter((m) => m.decision === 'RIGHT').length / movements.length) * 5 || 0,
    currentWord: wordPool[currentWordIndex],
    isFetchingWord: isFetching,
    nextWord: wordPool[currentWordIndex + 1],
    gameStatus,
    gameResults,
    recordMove,
    abortGame,
    reportGameResults,
    isSavingPracticeSessionResults,
  };

  return <GameContext.Provider value={providerValue}>{children}</GameContext.Provider>;
}
