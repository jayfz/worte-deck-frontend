import { postPracticeSessionResults } from '@/services/ApiPracticeSession';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useReportPracticeSessionResults() {
  const queryClient = useQueryClient();

  const { mutate: reportPracticeSessionResults, isPending: isSavingPracticeSessionResults } = useMutation({
    mutationFn: postPracticeSessionResults,
    onSuccess: () => {
      toast.success('Game resutls saved!');
      queryClient.invalidateQueries({ queryKey: ['pracrice-session-results'] });
    },
    onError: () => {
      toast.error('Unable to save game results :(');
    },
  });

  return { reportPracticeSessionResults, isSavingPracticeSessionResults };
}
