import { createPracticeSession } from '@/services/ApiPracticeSession';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreatePracticeSession() {
  const queryClient = useQueryClient();
  const {
    mutate: createPracticeSessionQuery,
    isPending: isCreatingPracticeSession,
    data: practiceSessionId,
  } = useMutation({
    mutationFn: createPracticeSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['practice-sessions'],
      });
    },
    onError: () => {},
  });

  return { createPracticeSessionQuery, isCreatingPracticeSession, practiceSessionId };
}
