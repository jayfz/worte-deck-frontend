import { getVocabularyWords } from '@/services/ApiVocabulary';
import { useInfiniteQuery } from '@tanstack/react-query';

type useVocabularyWordsProps = {
  searchText: string;
  filterByWordType: string | null;
};

export default function useVocabularWords(props: useVocabularyWordsProps) {
  const {
    data: vocabularyWords,
    isPending: isPendingVocabularyWords,
    isFetchingNextPage: isFetchingNextVocabularyWordsPage,
    hasNextPage: hasNextVocabularyPage,
    fetchNextPage: fetchNextVocabularyWordPage,
  } = useInfiniteQuery({
    queryKey: ['vocabulary', props.searchText, props.filterByWordType],
    queryFn: ({ pageParam }) => getVocabularyWords(props.searchText, props.filterByWordType, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages) => {
      if (lastPage.page.last) return undefined;
      return lastPage.page.number + 1;
    },
  });

  return {
    vocabularyWords,
    isPendingVocabularyWords,
    isFetchingNextVocabularyWordsPage,
    hasNextVocabularyPage,
    fetchNextVocabularyWordPage,
  };
}
