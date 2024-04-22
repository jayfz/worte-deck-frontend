import { VocabularyWord } from '@/types/domainTypes';
import { Empty } from '@/ui/Empty';
import { Flex } from '@/ui/Flex';
import { SpinningIcon } from '@/ui/SpinningIcon';
import { MouseEventHandler, forwardRef, useEffect, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { IoVolumeHighOutline } from 'react-icons/io5';
import { PiCircleDashedThin } from 'react-icons/pi';
import styled from 'styled-components';

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

    const signalPlayStarted = () => {
      setAudioStatus('playing');
    };
    const signalIdle = () => {
      setAudioStatus('idle');
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
  flex-grow: 1;
  & > p:first-child {
    font-weight: 600;
    font-size: 1.125rem;
  }

  & > p:last-child {
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

const ListItemSkeleton = styled(ListItem)``;

export function VocabularyWordListItemSkeleton() {
  return (
    <ListItemSkeleton>
      <LeftInfo $gap={'0.5rem'}>
        <Empty $height="0.875rem" $width="80%" $borderRadius="0.5rem" />
        <Empty $height="0.875rem" $width="40%" $borderRadius="0.5rem" />
      </LeftInfo>
      <Empty $height="2rem" $width="2rem" $borderRadius="99rem" />
      <RightInfo></RightInfo>
    </ListItemSkeleton>
  );
}

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

export default VocabularyWordListItem;
