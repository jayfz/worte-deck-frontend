import FlashCard from '@/features/practice-session/FlashCard';
import { GameContextProvider } from '@/features/practice-session/GameContext';
import GameProgressBar from '@/features/practice-session/GameProgressBar';
import GameScore from '@/features/practice-session/GameScore';
import GameTimer from '@/features/practice-session/GameTimer';
import useCreatePracticeSession from '@/features/practice-session/useCreatePracticeSession';
import useGameContext from '@/features/practice-session/useGameContext';
import { Button } from '@/ui/Button';
import { Flex } from '@/ui/Flex';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
const PracticeSessionContainer = styled(Flex.Column)`
  padding: 0 1.25rem;
  margin: auto 0;
  align-items: center;
  overflow: hidden;

  & > p,
  & > button {
    font-weight: bold;
    text-align: center;
    font-size: 1.25rem;
    width: 50%;
  }
`;

const DeckContainer = styled.div`
  position: relative;
`;

function FlashCardGame() {
  const { gameStatus, score, gameResults, reportGameResults, isSavingPracticeSessionResults } = useGameContext();

  useEffect(() => {
    if (gameStatus === 'COMPLETED' && !isSavingPracticeSessionResults) {
      reportGameResults();
    }
  }, [gameStatus, isSavingPracticeSessionResults, reportGameResults]);

  if (gameStatus === 'COMPLETED') {
    return <Navigate to="/app/practice-session/results" state={gameResults} />;
  }

  if (gameStatus === 'ABORTED') {
    return <Navigate to="/app" />;
  }

  return (
    <>
      <GameScore key={score} score={score} />
      <Deck />
      <GameProgressBar />
      <GameTimer />
    </>
  );
}
function Deck() {
  const { currentWord, nextWord } = useGameContext();

  const backKeyUsed = `${nextWord?.id ?? '-1'}-back`;
  const frontKeyUsed = `${currentWord?.id ?? '-2'}-front`;

  return (
    <DeckContainer>
      <FlashCard isAtFront={false} key={backKeyUsed} />
      <FlashCard isAtFront={true} key={frontKeyUsed} />
    </DeckContainer>
  );
}

export default function PracticeSessionPage() {
  const { createPracticeSessionQuery, isCreatingPracticeSession, practiceSessionId } = useCreatePracticeSession();

  const onYesClickHandler = () => {
    createPracticeSessionQuery();
  };

  if (isCreatingPracticeSession) {
    return (
      <PracticeSessionContainer>
        <p>Shuffling cards...</p>
      </PracticeSessionContainer>
    );
  }

  if (!practiceSessionId) {
    return (
      <PracticeSessionContainer $gap="1rem">
        <p>Start a new practice session?</p>
        <Button $variant="primary" onClick={onYesClickHandler}>
          Yes!
        </Button>
      </PracticeSessionContainer>
    );
  } else if (practiceSessionId) {
    return (
      <GameContextProvider practiceSessionId={practiceSessionId}>
        <PracticeSessionContainer $gap="1rem">
          <FlashCardGame />
        </PracticeSessionContainer>
      </GameContextProvider>
    );
  }
}
