import { getPracticeSessionStats } from '@/services/ApiProgressOverview';
import { useQuery } from '@tanstack/react-query';

export default function usePracticeSessionStats() {
  const { data: practiceSessionStats, isPending: isPendingPracticeSessionStats } = useQuery({
    queryKey: ['progress-overview', 'global-stats'],
    queryFn: () => getPracticeSessionStats(),
  });

  return { practiceSessionStats, isPendingPracticeSessionStats };
}
