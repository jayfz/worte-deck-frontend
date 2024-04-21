import { FilterPill, FilterRow } from '@/features/vocabulary/DraggableFilterRow';
import SearchBar from '@/features/vocabulary/SearchBar';
import VocabularyWordListItem from '@/features/vocabulary/VocabularyWordListItem';
import useVocabularWords from '@/features/vocabulary/useVocabularWords';
import { Flex } from '@/ui/Flex';
import PageTitle from '@/ui/PageTitle';
import { useIntersection } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled(Flex.Column)`
  padding: 0 1.5rem;
  padding-bottom: 1.5rem;
  gap: 1rem;
`;
const PageBody = styled(Flex.Column)`
  gap: 1rem;
`;

export default function VocabularyPage() {
  const [searchText, setSearchText] = useState('');
  const [searchParams] = useSearchParams();
  const filterByWordType = searchParams.get('filterByWordType') || 'ALL';

  const {
    vocabularyWords,
    isPendingVocabularyWords,
    isFetchingNextVocabularyWordsPage,
    hasNextVocabularyPage,
    fetchNextVocabularyWordPage,
  } = useVocabularWords({ searchText: searchText, filterByWordType: filterByWordType });

  const updateSearchText = (text: string) => {
    setSearchText(text);
  };

  const { ref, entry } = useIntersection({
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextVocabularyPage) fetchNextVocabularyWordPage();
  }, [entry, fetchNextVocabularyWordPage, hasNextVocabularyPage]);

  useEffect(() => {
    let toastId: null | string = null;
    if (isFetchingNextVocabularyWordsPage || isPendingVocabularyWords) toastId = toast.loading('Loading');
    return () => toast.dismiss(toastId || '');
  }, [isFetchingNextVocabularyWordsPage, isPendingVocabularyWords]);

  return (
    <PageContainer>
      <PageTitle>Vocabulary repository</PageTitle>
      <PageBody>
        <SearchBar text={searchText} updateText={updateSearchText} />
        <FilterRow>
          <FilterPill $by="NOUN">Nouns</FilterPill>
          <FilterPill $by="ADJECTIVE">Adjectives</FilterPill>
          <FilterPill $by="VERB">Verbs</FilterPill>
          <FilterPill $by="ADVERB">Adverbs</FilterPill>
          <FilterPill $by="COMMON_EXPRESSION">Common Expressions</FilterPill>
        </FilterRow>
        <Flex.Column $gap={'0.5rem'}>
          {!isPendingVocabularyWords &&
            vocabularyWords?.pages
              ?.flatMap((page) => page.payload)
              .map((listItem, index, collection) => {
                return (
                  <VocabularyWordListItem
                    key={listItem.id}
                    word={listItem}
                    ref={collection.length - 1 == index ? ref : undefined}
                  />
                );
              })}
          {!hasNextVocabularyPage && vocabularyWords && <p style={{ textAlign: 'center' }}>All caught up!</p>}
          {!hasNextVocabularyPage && !vocabularyWords && !isPendingVocabularyWords && <p>No data available</p>}
        </Flex.Column>
      </PageBody>
    </PageContainer>
  );
}
