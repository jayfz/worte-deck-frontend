import FlashCard from '@/features/practice-session/FlashCard';
import { GameContextProvider } from '@/features/practice-session/GameContext';
import GameProgressBar from '@/features/practice-session/GameProgressBar';
import GameScore from '@/features/practice-session/GameScore';
import GameTimer from '@/features/practice-session/GameTimer';
import useCreatePracticeSession from '@/features/practice-session/useCreatePracticeSession';
import useGameContext from '@/features/practice-session/useGameContext';
import { Button } from '@/ui/Button';
import { Flex } from '@/ui/Flex';
import Popup from '@/ui/Popup';
import { useEffect } from 'react';
import { Navigate, useBlocker, useNavigate } from 'react-router-dom';
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
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      gameStatus === 'STARTED' && currentLocation.pathname !== nextLocation.pathname,
  );

  const { abortGame, gameStatus, score, gameResults, reportGameResults, isSavingPracticeSessionResults } =
    useGameContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (gameStatus === 'COMPLETED' && !isSavingPracticeSessionResults) {
      reportGameResults();
      navigate('/app/practice-session/results', { state: gameResults, unstable_viewTransition: true });
    }
  }, [gameStatus, isSavingPracticeSessionResults, reportGameResults, gameResults, navigate]);

  if (gameStatus === 'ABORTED') {
    return <Navigate to="/app" />;
  }

  return (
    <>
      {blocker.state === 'blocked' && (
        <Popup>
          <Popup.Message>Are you sure you want to quit the game?</Popup.Message>
          <Popup.ButtonSelection>
            <Popup.Ok
              onClick={() => {
                blocker.reset();
              }}
            >
              Continue playing
            </Popup.Ok>
            <Popup.Cancel
              onClick={() => {
                abortGame();
                blocker.proceed();
              }}
            >
              Quit
            </Popup.Cancel>
          </Popup.ButtonSelection>
        </Popup>
      )}
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
