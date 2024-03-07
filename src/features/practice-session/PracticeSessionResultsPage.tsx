import { GameResults } from '@/features/practice-session/GameContext';
import GameScore from '@/features/practice-session/GameScore';
import { Button } from '@/ui/Button';
import { Flex } from '@/ui/Flex';
import { formatSeconds } from '@/utils/formatters';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const PracticeSessionResultsContainer = styled(Flex.Column)`
  margin: auto 0;
  align-self: center;
  width: 80%;
`;

const ResultsInfo = styled(Flex.Column)`
  align-items: center;
`;

const ButtonRow = styled(Flex.Column)``;

const Score = styled.p`
  font-size: 3rem;
  font-weight: 600;
`;

const ScoreMessage = styled(Score)``;

const Duration = styled.p`
  font-size: 1.5rem;
  padding: 0.325rem 0.75rem;
  font-weight: 600;
  font-family: 'Roboto Mono', monospace;
`;

const GameResult = styled.p`
  & > strong {
    font-weight: 600;
  }
`;

export default function PracticeSessionResultsPage() {
  const { state } = useLocation();

  if (!state) {
    return <p>Results are not available yet</p>;
  }

  const gameResults = state as GameResults;

  const correctGuesses = gameResults.movements.filter((m) => m.decision === 'RIGHT').length;
  const score = (correctGuesses / gameResults.movements.length) * 5;

  let message = '';

  if (score < 1) message = 'Better luck next time';
  if (score >= 1 && score < 3) message = 'You can do better';
  if (score >= 3 && score < 4) message = 'Not bad!';
  if (score > 4) message = 'Well done!';

  return (
    <PracticeSessionResultsContainer $gap="1rem">
      <ResultsInfo $gap="0.5rem">
        <Score>{score.toFixed(2)}</Score>
        <GameScore score={score} />
        <ScoreMessage>{message}</ScoreMessage>
        <GameResult>
          <strong> {correctGuesses}</strong> of <strong>{gameResults.movements.length}</strong> words remembered
        </GameResult>
        <Duration>{formatSeconds(gameResults.duration)}</Duration>
      </ResultsInfo>
      <ButtonRow $gap="0.5rem">
        <Button as={Link} $variant="primary" to="/app/practice-session">
          Practice again
        </Button>
        <Button as={Link} $variant="secondary" to="/app">
          Go home
        </Button>
      </ButtonRow>
    </PracticeSessionResultsContainer>
  );
}
