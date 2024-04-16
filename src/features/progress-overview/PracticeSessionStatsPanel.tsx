import usePracticeSessionStats from '@/features/progress-overview/usePracticeSessionStats';
import { Flex } from '@/ui/Flex';
import { formatSecondsToShortString } from '@/utils/formatters';
import { IoStar } from 'react-icons/io5';
import styled from 'styled-components';

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 0.5rem;
`;

const GridElement = styled(Flex.Column)`
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.sectionBg};
  border: 2px solid ${(props) => props.theme.borderColor};
  padding: 0.5rem 0.5rem;
  border-radius: 0.5rem;

  p:first-child {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const GridElementSkeletonContainer = styled(GridElement)`
  gap: 0.5rem;
  padding: 1.375rem;

  & > div {
    gap: 0.5rem;
  }
`;

const Empty = styled.section`
  height: 1.125rem;
  border-radius: 4rem;
  background-color: ${(props) => props.theme.borderColor};
`;

function GriedElementSkeleton() {
  return (
    <GridElementSkeletonContainer>
      <Flex.Row>
        <Empty style={{ width: '4rem' }} />
      </Flex.Row>
      <Flex.Row>
        <Empty style={{ width: '2rem' }} /> <Empty style={{ width: '3.5rem' }} />
      </Flex.Row>
    </GridElementSkeletonContainer>
  );
}

const Score = styled(Flex.Row)`
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  svg {
    color: ${(props) => props.theme.gameStarsColor};
  }
`;

export default function PracticeSessionStatsPanel() {
  const { practiceSessionStats, isPendingPracticeSessionStats } = usePracticeSessionStats();

  if (isPendingPracticeSessionStats || !practiceSessionStats)
    return (
      <Grid>
        <GriedElementSkeleton />
        <GriedElementSkeleton />
        <GriedElementSkeleton />
        <GriedElementSkeleton />
        <GriedElementSkeleton />
        <GriedElementSkeleton />
      </Grid>
    );
  return (
    <Grid>
      <GridElement>
        <p>{practiceSessionStats.totalCount}</p>
        <p>Practice Sessions</p>
      </GridElement>

      <GridElement>
        <Score>
          <p>{practiceSessionStats.averageScore}</p>
          <IoStar size={'1.5rem'} />
        </Score>
        <p>Average score</p>
      </GridElement>

      <GridElement>
        <p>{formatSecondsToShortString(practiceSessionStats.secondsSpent)}</p>
        <p>Spent practicing</p>
      </GridElement>

      <GridElement>
        <p>{practiceSessionStats.vocabularyLevel}</p>
        <p>Vocabulary level</p>
      </GridElement>
      <GridElement>
        <p>{practiceSessionStats.leftSwipeCount}</p>
        <p>Left swipes</p>
      </GridElement>
      <GridElement>
        <p>{practiceSessionStats.rightSwipeCount}</p>
        <p>Right swipes</p>
      </GridElement>
    </Grid>
  );
}
