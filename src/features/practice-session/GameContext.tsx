import useGameWordsList from '@/features/practice-session/useGameWordList';
import { Noun, Word } from '@/types/domainTypes';
import { PropsWithChildren, createContext, useState } from 'react';

type GameContextType = {
  currentWord: Word;
  nextWord: Word;
  recordMove: (movement: GameMovement) => void;
  score: number;
  completed: number;
  isFetchingWord: boolean;
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
  const [gameEnded, setGameEnded] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetching } = useGameWordsList(practiceSessionId);

  const wordPool = data?.pages.flatMap((page) => page.payload) ?? [];
  const gameSessionWordCount = data?.pages[0].page.totalElements ?? 0;

  const recordMove = (move: GameMovement) => {
    const allMovements = [...movements, move];
    setMovements(allMovements);
    if (allMovements.length == gameSessionWordCount) {
      setGameEnded(true);
    } else {
      setCurrentWordIndex((prev) => prev + 1);
      console.log('recorded move', move, allMovements.length);
    }

    if (allMovements.length == wordPool.length && hasNextPage) {
      fetchNextPage();
    }
  };

  const providerValue: GameContextType = {
    completed: (movements.length / gameSessionWordCount) * 100 || 0,
    score: (movements.filter((m) => m.decision === 'RIGHT').length / movements.length) * 5 || 0,
    currentWord: wordPool[currentWordIndex],
    recordMove,
    isFetchingWord: isFetching,
    nextWord: wordPool[currentWordIndex + 1],
  };

  if (gameEnded) {
    return (
      <p>
        game ended :) - score: {providerValue.score}, - totalwords: {gameSessionWordCount}
      </p>
    );
  }

  return <GameContext.Provider value={providerValue}>{children}</GameContext.Provider>;
}
