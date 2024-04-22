import { PracticeSessionResultSorting } from '@/features/practice-session-results/PreviousPracticeSessionResultsPage';
import { getPracticeSessionResults } from '@/services/ApiPracticeSession';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function usePreviousPracticeSessionResults(sorting: PracticeSessionResultSorting) {
  const {
    data: previousPracticeSessionResults,
    isPending: isPendingPreviousPracticeSessionResults,
    fetchNextPage: fetchNextPreviousPracticeSessionResultsPage,
    isFetchingNextPage: isFetchingNextPreviousPracticeSessionResultsPage,
    hasNextPage: hasNextPreviousPracticeSessionResultsPage,
  } = useInfiniteQuery({
    queryKey: ['previous-results', sorting.by, sorting.direction],
    queryFn: ({ pageParam }) => getPracticeSessionResults(sorting, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages) => {
      if (lastPage.page.last) return undefined;
      return lastPage.page.number + 1;
    },
  });

  return {
    previousPracticeSessionResults,
    isPendingPreviousPracticeSessionResults,
    fetchNextPreviousPracticeSessionResultsPage,
    isFetchingNextPreviousPracticeSessionResultsPage,
    hasNextPreviousPracticeSessionResultsPage,
  };
}
