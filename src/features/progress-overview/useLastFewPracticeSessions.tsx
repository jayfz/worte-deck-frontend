import { getPracticeSessionResultSummary } from '@/services/ApiProgressOverview';
import { useQuery } from '@tanstack/react-query';

export default function useLastFewPracticeSessions() {
  const { data: lastFewPracticeSessions, isPending: isPendingLastFewPracticeSessions } = useQuery({
    queryKey: ['progress-overview', 'last-few-practice-sessions'],
    queryFn: () => getPracticeSessionResultSummary(),
  });

  return { lastFewPracticeSessions, isPendingLastFewPracticeSessions };
}
