import { putUpdateWord } from '@/services/ApiVocabulary';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type MutateFnParams = {
  word: Record<string, any>;
  wordId: number;
};

export default function useUpdateWord() {
  const { mutate, isPending } = useMutation({
    mutationFn: (props: MutateFnParams) => putUpdateWord(props.word, props.wordId),
    onSuccess: () => {
      toast.success('word updated!');
    },
    onError: () => {
      toast.error('unable to update word');
    },
  });

  return {
    updateWord: mutate,
    isUpdatingWord: isPending,
  };
}
