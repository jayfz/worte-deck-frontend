import { postCreateWord } from '@/services/ApiVocabulary';
import { Word } from '@/types/domainTypes';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useCreateWord() {
  const { mutate, isPending } = useMutation({
    mutationFn: (word: Word) => postCreateWord(word),
    onSuccess: () => toast.success('Word saved!'),
    onError: () => toast.error('Unable to save word'),
  });

  return {
    createWord: mutate,
    isCreatingWord: isPending,
  };
}
