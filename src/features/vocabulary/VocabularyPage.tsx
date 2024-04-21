import { FilterPill, FilterRow } from '@/features/vocabulary/DraggableFilterRow';
import SearchBar from '@/features/vocabulary/SearchBar';
import useVocabularWords from '@/features/vocabulary/useVocabularWords';
import { VocabularyWord, WordType } from '@/types/domainTypes';
import { Flex } from '@/ui/Flex';
import PageTitle from '@/ui/PageTitle';
import { SpinningIcon } from '@/ui/SpinningIcon';
import { useIntersection } from '@mantine/hooks';
import { MouseEventHandler, PropsWithChildren, forwardRef, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IconContext } from 'react-icons';
import { IoVolumeHighOutline } from 'react-icons/io5';
import { PiCircleDashedThin } from 'react-icons/pi';
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

const PlayButtonContainer = styled.button<{ $audioStatus: 'playing' | 'idle' }>`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${(props) => ('idle' == props.$audioStatus ? 'orange' : 'inherit')};
  border-radius: 4rem;
  & > div {
    position: absolute;
    /* z-index: -1; */
  }
`;

type VocabularyPlayButtonProps = {
  audioSource: string[];
};
const VocabularyPlayButton = (props: VocabularyPlayButtonProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioStatus, setAudioStatus] = useState<'idle' | 'playing'>('idle');

  const onPlayAudio: MouseEventHandler = (event) => {
    event.stopPropagation();
    const audioElement = audioRef.current;
    if (!audioElement) return;
    audioElement.load;
    audioElement.paused ? audioElement.play() : audioElement.pause();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const signalPlayStarted = (event) => {
      setAudioStatus('playing');
      console.log(event);
    };
    const signalIdle = (event) => {
      setAudioStatus('idle');
      console.log(event);
    };
    audio.addEventListener('play', signalPlayStarted);
    audio.addEventListener('ended', signalIdle);

    return () => {
      audio.removeEventListener('play', signalPlayStarted);
      audio.removeEventListener('ended', signalIdle);
    };
  }, []);

  return (
    <IconContext.Provider value={{ size: '2.5rem', color: 'orange' }}>
      <audio ref={audioRef} preload="none">
        {props.audioSource.map((sourceURL) => {
          if (sourceURL.endsWith('.mp3')) {
            return <source key={sourceURL} src={sourceURL} type="audio/mpeg" />;
          }

          if (sourceURL.endsWith('.ogg')) {
            return <source key={sourceURL} src={sourceURL} type="audio/ogg" />;
          }

          return null;
        })}
      </audio>
      <PlayButtonContainer onClick={onPlayAudio} $audioStatus={audioStatus}>
        <IoVolumeHighOutline size={'1.25rem'} color={'idle' == audioStatus ? 'white' : 'orange'} />
        <SpinningIcon>
          <PiCircleDashedThin style={{ display: 'playing' == audioStatus ? 'block' : 'none' }} />
        </SpinningIcon>
      </PlayButtonContainer>
    </IconContext.Provider>
  );
};

const ListItem = styled.article`
  display: flex;
  flex-direction: row;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  justify-content: space-between;
  padding: 1rem;
  background-color: ${(props) => props.theme.sectionBg};
`;
const LeftInfo = styled(Flex.Column)`
  & > p:first-child {
    font-weight: 600;
    font-size: 1.125rem;
  }

  & > p:last-child {
    /* white-space: wrap; */
    text-overflow: ellipsis;
  }
`;
const RightInfo = styled(Flex.Column)`
  align-items: center;
  justify-content: center;
  & > p:last-child {
    font-weight: 600;
    font-size: 0.875rem;
  }
`;

type VocabularyWordListItemProps = {
  word: VocabularyWord;
};

const VocabularyWordListItem = forwardRef<HTMLElement, VocabularyWordListItemProps>(function listItem({ word }, ref) {
  return (
    <ListItem ref={ref}>
      <LeftInfo>
        <p>{word.word}</p>
        <p>{word.englishTranslations.join(', ')}</p>
      </LeftInfo>
      <RightInfo>
        <VocabularyPlayButton audioSource={word.recordingURLs} />
        <p>{word.pronunciations[0] || '[pending]'}</p>
      </RightInfo>
    </ListItem>
  );
});

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
