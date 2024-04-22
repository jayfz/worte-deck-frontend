import usePreviousPracticeSessionResults from '@/features/practice-session-results/usePreviousPracticeSessionResults';
import { PracticeSessionResultSummary } from '@/types/domainTypes';
import { Empty } from '@/ui/Empty';
import { Flex } from '@/ui/Flex';
import PageTitle from '@/ui/PageTitle';
import { Pill } from '@/ui/Pill';
import { formatDate, formatSecondsToShortString } from '@/utils/formatters';
import { useIntersection } from '@mantine/hooks';
import { PropsWithChildren, SetStateAction, forwardRef, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoArrowDownSharp, IoArrowUpSharp, IoStar, IoSwapVertical } from 'react-icons/io5';
import styled from 'styled-components';

const PageContainer = styled(Flex.Column)`
  padding: 0 1.5rem;
  padding-bottom: 1.5rem;
  gap: 1rem;
`;
const PageBody = styled(Flex.Column)`
  gap: 1rem;
`;

const StyledSortingButton = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1px 4px;
  gap: 0.25rem;
  font-size: 0.875rem;
  border: 1px solid ${(props) => (props.$active ? props.theme.sortingPillBorderHighlited : props.theme.borderColor)};

  background-color: ${(props) => (props.$active ? props.theme.sortingPillBackgroundHighlated : props.theme.sectionBg)};
  border-radius: 0.5rem;
`;

type SortingCriteriaProps = {
  active: boolean;
  direction: PracticeSessionResultSorting['direction'] | 'default';
  onClick: () => void;
};
function SortingCriteria(props: PropsWithChildren<SortingCriteriaProps>) {
  return (
    <StyledSortingButton $active={props.active} onClick={props.onClick}>
      {props.children}
      {props.direction == 'desc' && <IoArrowDownSharp />}
      {props.direction == 'asc' && <IoArrowUpSharp />}
      {props.direction == 'default' && <IoSwapVertical />}
    </StyledSortingButton>
  );
}

const StyledSortingRow = styled(Flex.Column)`
  em {
    font-style: normal;
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

type SortingRowProps = {
  sorting: PracticeSessionResultSorting;
  updateSorting: React.Dispatch<SetStateAction<PracticeSessionResultSorting>>;
};
function SortingRow({ sorting, updateSorting }: SortingRowProps) {
  const onClickSortingCriteria = (by: PracticeSessionResultSorting['by']) => {
    if (by == sorting.by) {
      const newSort: PracticeSessionResultSorting = {
        by: by,
        direction: sorting.direction == 'asc' ? 'desc' : 'asc',
      };
      updateSorting(newSort);
    } else {
      const newSort: PracticeSessionResultSorting = {
        by: by,
        direction: 'desc',
      };
      updateSorting(newSort);
    }
  };

  let pillText = '';
  let sortByText = '';
  switch (sorting.by) {
    case 'score':
      pillText = sorting.direction == 'desc' ? 'Highest first' : 'Lowest first';
      sortByText = 'score';
      break;

    case 'createdAt':
      pillText = sorting.direction == 'desc' ? 'Most recent first' : 'Oldest first';
      sortByText = 'date';
      break;

    case 'durationInSeconds':
      pillText = sorting.direction == 'desc' ? 'Longest first' : 'Shortest first';
      sortByText = 'duration';
      break;

    case 'wordsTestedCount':
      pillText = sorting.direction == 'desc' ? 'Highest first' : 'Lowest first';
      sortByText = 'word count';
      break;

    default:
      throw new Error('exhaustive check');
  }
  return (
    <StyledSortingRow $gap={'0.5rem'}>
      <p>
        Sorting by <em>{sortByText}</em>
        <Pill style={{ padding: '0.125rem 0.50rem' }}>{pillText}</Pill>
      </p>
      <Flex.Row $gap={'0.5rem'}>
        <SortingCriteria
          active={sorting.by == 'score'}
          direction={sorting.by == 'score' ? sorting.direction : 'default'}
          onClick={() => onClickSortingCriteria('score')}
        >
          score
        </SortingCriteria>
        <SortingCriteria
          active={sorting.by == 'createdAt'}
          direction={sorting.by == 'createdAt' ? sorting.direction : 'default'}
          onClick={() => onClickSortingCriteria('createdAt')}
        >
          date
        </SortingCriteria>
        <SortingCriteria
          active={sorting.by == 'durationInSeconds'}
          direction={sorting.by == 'durationInSeconds' ? sorting.direction : 'default'}
          onClick={() => onClickSortingCriteria('durationInSeconds')}
        >
          duration
        </SortingCriteria>
        <SortingCriteria
          active={sorting.by == 'wordsTestedCount'}
          direction={sorting.by == 'wordsTestedCount' ? sorting.direction : 'default'}
          onClick={() => onClickSortingCriteria('wordsTestedCount')}
        >
          word count
        </SortingCriteria>
      </Flex.Row>
    </StyledSortingRow>
  );
}

export type PracticeSessionResultSorting = {
  by: 'score' | 'createdAt' | 'durationInSeconds' | 'wordsTestedCount';
  direction: 'asc' | 'desc';
};

type PracticeSessionResultItemProps = {
  result: PracticeSessionResultSummary;
};

const StyledPracticeSessionResultsItem = styled.article`
  display: flex;
  flex-direction: row;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.sectionBg};
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  justify-content: space-between;
  align-items: center;
`;

const LeftInfo = styled(Flex.Column)`
  & > p:first-child {
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const RightInfo = styled(Flex.Row)`
  display: flex;
  justify-content: center;
  align-items: baseline;
  font-size: 1.5rem;
  gap: 0.125rem;

  svg {
    color: ${(props) => props.theme.gameStarsColor};
    transform: translateY(1px);
  }
`;

const PracticeSessionResultsItem = forwardRef<HTMLElement, PracticeSessionResultItemProps>(function resultItem(
  { result }: PracticeSessionResultItemProps,
  ref,
) {
  return (
    <StyledPracticeSessionResultsItem ref={ref}>
      <LeftInfo>
        <p>{result.wordsTestedCount} words tested</p>
        <Flex.Row>
          <p>{formatDate(result.createdAt)}</p>
          <Pill>{formatSecondsToShortString(result.durationInSeconds)}</Pill>
        </Flex.Row>
      </LeftInfo>
      <RightInfo>
        <p>{result.score}</p>
        <IoStar />
      </RightInfo>
    </StyledPracticeSessionResultsItem>
  );
});

const StyledPracticeSessionResultsItemSkeletonContainer = styled(StyledPracticeSessionResultsItem)`
  padding: 1rem 1.5rem;
`;

function PracticeSessionResultsItemSkeleton() {
  return (
    <StyledPracticeSessionResultsItemSkeletonContainer>
      <LeftInfo style={{ flexGrow: '1' }} $gap="0.625rem">
        <Empty $width="80%" $height="0.875rem" className="emptyleft" $borderRadius="0.5rem" />
        <Empty $width="40%" $height="0.875rem" className="emptyleft" $borderRadius="0.5rem" />
      </LeftInfo>
      <RightInfo>
        <Empty $width="2rem" $height="2rem" $borderRadius="0.5rem" />
      </RightInfo>
    </StyledPracticeSessionResultsItemSkeletonContainer>
  );
}

export default function PracticeSessionResultsPage() {
  const [sorting, setSorting] = useState<PracticeSessionResultSorting>({ by: 'createdAt', direction: 'desc' });
  const {
    previousPracticeSessionResults,
    isPendingPreviousPracticeSessionResults,
    fetchNextPreviousPracticeSessionResultsPage,
    isFetchingNextPreviousPracticeSessionResultsPage,
    hasNextPreviousPracticeSessionResultsPage,
  } = usePreviousPracticeSessionResults(sorting);

  let Skeletons = null;
  if (isPendingPreviousPracticeSessionResults && !previousPracticeSessionResults) {
    Skeletons = Array(5).fill(null);
    Skeletons.forEach((item, index, array) => {
      array[index] = <PracticeSessionResultsItemSkeleton key={-index} />;
    });
  }

  const { ref, entry } = useIntersection({
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPreviousPracticeSessionResultsPage)
      fetchNextPreviousPracticeSessionResultsPage();
  }, [entry, hasNextPreviousPracticeSessionResultsPage, fetchNextPreviousPracticeSessionResultsPage]);

  useEffect(() => {
    let toastId: null | string = null;
    if (isFetchingNextPreviousPracticeSessionResultsPage || isPendingPreviousPracticeSessionResults)
      toastId = toast.loading('Loading');
    return () => toast.dismiss(toastId || '');
  }, [isFetchingNextPreviousPracticeSessionResultsPage, isPendingPreviousPracticeSessionResults]);

  return (
    <PageContainer>
      <PageTitle>Practice Session Results</PageTitle>
      <PageBody>
        <SortingRow sorting={sorting} updateSorting={setSorting} />
        <Flex.Column $gap={'0.5rem'}>
          {Skeletons}
          {previousPracticeSessionResults?.pages
            .flatMap((p) => p.payload)
            .map((psr, index, array) => {
              return (
                <PracticeSessionResultsItem
                  key={psr.id}
                  result={psr}
                  ref={index == array.length - 1 ? ref : undefined}
                />
              );
              // return <PracticeSessionResultsItemSkeleton key={psr.id} />;
            })}
          {!hasNextPreviousPracticeSessionResultsPage && previousPracticeSessionResults && (
            <p style={{ textAlign: 'center' }}>All caught up!</p>
          )}
          {!isPendingPreviousPracticeSessionResults &&
            !hasNextPreviousPracticeSessionResultsPage &&
            !previousPracticeSessionResults && <p>No data available</p>}
        </Flex.Column>
      </PageBody>
    </PageContainer>
  );
}
