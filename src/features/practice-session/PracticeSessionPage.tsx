import FlashCard from '@/features/practice-session/FlashCard';
import GameProgressBar from '@/features/practice-session/GameProgressBar';
import GameScore from '@/features/practice-session/GameScore';
import GameTimer from '@/features/practice-session/GameTimer';
import { Noun } from '@/types/domainTypes';
import { Button } from '@/ui/Button';
import { Flex } from '@/ui/Flex';
import { useState } from 'react';
import styled from 'styled-components';
const PracticeSessionContainer = styled(Flex.Column)`
  padding: 1.25rem;
  margin: auto 0;
  align-items: center;

  & > p,
  & > button {
    font-weight: bold;
    text-align: center;
    font-size: 1.25rem;
  }
`;

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

export default function PracticeSessionPage() {
  const [gameStarted, setGameStarted] = useState(true);

  const onYesClickHandler = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <PracticeSessionContainer $gap="1rem">
        <p>Start a new practice session?</p>
        <Button $variant="primary" onClick={onYesClickHandler}>
          Yes!
        </Button>
      </PracticeSessionContainer>
    );
  } else {
    return (
      <PracticeSessionContainer $gap="1rem">
        <GameScore score={4.75} />
        <FlashCard word={testWord} />
        <GameProgressBar completed={70} />
        <GameTimer />
      </PracticeSessionContainer>
    );
  }
}
