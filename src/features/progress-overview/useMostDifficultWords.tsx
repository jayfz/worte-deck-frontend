import { getMostDifficultWords } from '@/services/ApiProgressOverview';
import { useQuery } from '@tanstack/react-query';

export default function useMostDifficultWords() {
  const { data: mostDifficultWords, isPending: isPendingMostDifficultWords } = useQuery({
    queryKey: ['progress-overview', 'most-difficult-words'],
    queryFn: () => getMostDifficultWords(),
  });

  return { mostDifficultWords, isPendingMostDifficultWords };
}
