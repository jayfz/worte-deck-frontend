import { getWordStats } from '@/services/ApiProgressOverview';
import { useQuery } from '@tanstack/react-query';

export default function useWordStats() {
  const { data: wordStats, isPending: isWordStatsPending } = useQuery({
    queryKey: ['progress-overview', 'wordstats'],
    queryFn: () => getWordStats(),
  });

  return { wordStats, isWordStatsPending };
}
