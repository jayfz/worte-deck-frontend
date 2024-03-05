import { getPracticeSessionWords } from '@/services/ApiPracticeSession';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useGameWordsList(practiceSessionId: number) {
  const { data, isPending, isFetching, fetchNextPage, hasNextPage, isSuccess, isFetched, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['ongoing-practice-session', practiceSessionId],
      queryFn: ({ pageParam }) => getPracticeSessionWords(practiceSessionId, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.page.last) {
          return undefined;
        }

        return lastPage.page.number + 1;
      },
    });

  return {
    data,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isFetched,
    isFetchingNextPage,
  };
}
