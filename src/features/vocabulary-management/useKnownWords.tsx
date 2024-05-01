import { getKnownWords } from '@/services/ApiVocabulary';
import { useQuery } from '@tanstack/react-query';

export default function useKnownWords(word: string, mode: 'create' | 'update') {
  const { data, isPending } = useQuery({
    queryKey: ['known-words', word],
    enabled: word.length > 0 && mode == 'update',
    queryFn: () => getKnownWords(word),
  });

  return {
    knownWords: data,
    isPendingKnownWords: isPending,
  };
}
