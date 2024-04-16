import useWordStats from '@/features/progress-overview/useWordStats';
import { Flex } from '@/ui/Flex';
import { SpinningIcon } from '@/ui/SpinningIcon';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import styled from 'styled-components';

const Container = styled(Flex.Column)`
  padding: 1.5rem;
  font-weight: 600;
  height: 12rem;
  background: radial-gradient(
    ${(props) => `${props.theme.topCardBackgroundRadial1} 0%,${props.theme.topCardBackgroundRadial2} 75%`}
  );
  border: 2px solid ${(props) => props.theme.topCardBorderColor};
  border-radius: 0.5rem;
  align-items: center;
  justify-content: center;

  color: ${(props) => props.theme.ColoredStatPanelText};

  p:first-child {
    font-size: 3rem;
  }

  p:last-child {
    font-size: 1.5rem;
  }
`;

function TopCardSkeleton() {
  return (
    <Container>
      <SpinningIcon>
        <AiOutlineLoading3Quarters size={'2rem'} />
      </SpinningIcon>
    </Container>
  );
}

export default function TopCard() {
  const { wordStats, isWordStatsPending } = useWordStats();

  if (isWordStatsPending || !wordStats) return <TopCardSkeleton />;

  const total =
    wordStats.adjectiveCount +
    wordStats.adverbCount +
    wordStats.commonExpressionCount +
    wordStats.nounCount +
    wordStats.verbCount;

  return (
    <Container>
      <p>{total}</p>
      <p>WORDS LEARNT</p>
    </Container>
  );
}
