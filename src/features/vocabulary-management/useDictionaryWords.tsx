import { getDictionaryWords } from '@/services/ApiVocabulary';
import { useQuery } from '@tanstack/react-query';

export default function useDictionaryWords(word: string, mode: 'create' | 'update') {
  const { data, isPending } = useQuery({
    queryKey: ['dictionary-words', word],
    queryFn: () => getDictionaryWords(word),
    enabled: word.length > 2 && mode == 'create',
  });

  return {
    dictionaryWords: data,
    isPendingDictionaryWords: isPending,
  };
}
