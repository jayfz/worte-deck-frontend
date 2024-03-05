import useGameWordsList from '@/features/practice-session/useGameWordList';
import { Noun, Word } from '@/types/domainTypes';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

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

const testWord: Noun = {
  id: 15,
  word: 'Klärschlamm',
  type: 'NOUN',
  pronunciations: [],
  englishTranslations: ['sludge', 'sewage sludge', 'effluent sludge'],
  recordingURLs: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/De-Klärschlamm.ogg',
    'https://upload.wikimedia.org/wikipedia/commons/transcoded/7/7e/De-Klärschlamm.ogg/De-Klärschlamm.ogg.mp3',
  ],
  germanExample: 'Bei der Reinigung von Abwässern entsteht Klärschlamm',
  germanExampleRecordingURLs: ['none added yet'],
  englishExample: 'Sewage sludge is created when wastewater is cleaned.',
  gender: 'MASCULINE',
  plural: 'Klärschlamme',
  isReady: true,
  matches: ['Klärschlamm'],
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

  const { data, fetchNextPage, hasNextPage, isFetched, isFetchingNextPage, isPending, isSuccess, isFetching } =
    useGameWordsList(practiceSessionId);

  const wordPool = data?.pages.flatMap((page) => page.payload) ?? [];
  const gameSessionWordCount = data?.pages[0].page.totalElements ?? 0;

  const recordMove = (move: GameMovement) => {
    const allMovements = [...movements, move];
    setMovements(allMovements);
    if (allMovements.length == gameSessionWordCount) {
      setGameEnded(true);
    } else {
      setCurrentWordIndex((prev) => prev + 1);
    }

    if (allMovements.length == wordPool.length && hasNextPage) {
      fetchNextPage();
    }
  };

  /*  useEffect(() => {
    if (isFetched && data) {
      setWordPool(data.pages.flatMap((page) => page.payload));
      setGameSessionWordCount(data.pages[0].page.totalElements);
    }
  }, [data, isFetched]); */

  console.log(
    'data',
    data,
    'isFetching',
    isFetching,
    'isPending',
    isPending,
    'isFetchingNextPage',
    isFetchingNextPage,
    'isFetched',
    isFetched,
    'isSuccess',
    isSuccess,
  );

  const providerValue: GameContextType = {
    completed: (movements.length / gameSessionWordCount) * 100 || 0,
    score: (movements.filter((m) => m.decision === 'RIGHT').length / movements.length) * 5 || 0,
    currentWord: wordPool[currentWordIndex],
    recordMove,
    isFetchingWord: isFetching,
    nextWord: wordPool[currentWordIndex + 1],
  };
  /* if (isFetching) {
    return <p>Loading...</p>;
  } */

  if (gameEnded) {
    return (
      <p>
        game ended :) - score: {providerValue.score}, - totalwords: {gameSessionWordCount}
      </p>
    );
  }

  return <GameContext.Provider value={providerValue}>{children}</GameContext.Provider>;
}
