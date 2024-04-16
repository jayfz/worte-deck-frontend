import {
  StatPanel,
  StatPanelBody,
  StatPanelHeader,
  StatPanelHeaderSkeleton,
  StatPanelRow,
  StatPanelRowContentSkeleton,
} from '@/features/progress-overview/StrippedStatPanel';
import useMostDifficultWords from '@/features/progress-overview/useMostDifficultWords';
import { Flex } from '@/ui/Flex';
import { PiHandSwipeLeft } from 'react-icons/pi';

export default function MostDifficultWordsPanel() {
  const { mostDifficultWords, isPendingMostDifficultWords } = useMostDifficultWords();

  if (isPendingMostDifficultWords || !mostDifficultWords)
    return (
      <StatPanel>
        <StatPanelHeader>
          <StatPanelHeaderSkeleton>
            <PiHandSwipeLeft size={'1.5rem'} />
          </StatPanelHeaderSkeleton>
        </StatPanelHeader>
        <StatPanelBody>
          <StatPanelRowContentSkeleton $odd={true} />
          <StatPanelRowContentSkeleton $odd={false} />
          <StatPanelRowContentSkeleton $odd={true} />
        </StatPanelBody>
      </StatPanel>
    );

  return (
    <StatPanel>
      <StatPanelHeader>
        <p>MOST DIFFICULT WORDS</p>
        <PiHandSwipeLeft size={'1.5rem'} />
      </StatPanelHeader>
      <StatPanelBody>
        {mostDifficultWords.map((dw, index) => {
          return (
            <StatPanelRow key={dw.wordId} $odd={index % 2 == 0}>
              <Flex.Column>
                <p>{dw.word}</p>
                <p>{dw.englishTranslations.join(', ')}</p>
              </Flex.Column>
              <p>{dw.leftSwipeCount}</p>
            </StatPanelRow>
          );
        })}
      </StatPanelBody>
    </StatPanel>
  );
}
