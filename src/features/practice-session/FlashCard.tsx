import useGameContext from '@/features/practice-session/useGameContext';
import { NounGender, Word } from '@/types/domainTypes';
import { Flex } from '@/ui/Flex';
import LogoWithoutText from '@/ui/LogoWithoutText';
import { useIntersection } from '@mantine/hooks';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoVolumeHighOutline } from 'react-icons/io5';
import styled from 'styled-components';

const FlashCardContainer = styled(Flex.Column).attrs<{
  $movementFactor: number;
  $isAtFront: boolean;
  $animatingBack: boolean;
}>(({ $movementFactor }) => ({
  style: {
    transformOrigin: $movementFactor > 0 ? 'right bottom' : 'left bottom',
    transform: `rotate(clamp(-19deg, ${$movementFactor * 16}deg, 18deg)) translateX(${$movementFactor * 25}rem)`,
  },
}))`
  aspect-ratio: 2/3;
  position: relative;
  z-index: 10;
  width: 80svw;
  background-color: ${(props) => props.theme.sectionBg};
  border: ${(props) => `2px solid ${props.theme.borderColor}`};
  max-width: 640px;
  border-radius: 1rem;
  padding: 0.75rem;
  position: ${(props) => (props.$isAtFront ? 'relative' : 'absolute')};
  transition: ${(props) => (props.$animatingBack ? 'transform 0.1s ease' : 'none')};
`;

const Corner = styled.div`
  color: ${(props) => `${props.theme.borderColor}`};
`;

type PlayButtonProps = {
  audioSource: string[];
};

const StyledPlayButton = styled.button`
  padding: 1rem;
  border-radius: 999px;
  background-color: ${(props) => props.theme.gamePlayButtonColor};
  width: fit-content;

  & > svg {
    color: ${(props) => props.theme.sectionBg};
  }
`;

export function PlayButton(props: PlayButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onPlayAudio = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;
    audioElement.paused ? audioElement.play() : audioElement.pause();
  };

  return (
    <>
      <audio ref={audioRef}>
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
      <StyledPlayButton onClick={onPlayAudio}>
        <IoVolumeHighOutline size={'1.5rem'} />
      </StyledPlayButton>
    </>
  );
}

function getDefiniteArticleForGender(gender: NounGender) {
  switch (gender) {
    case 'MASCULINE':
      return 'Der';
    case 'FEMENINE':
      return 'Die';
    case 'NEUTER':
      return 'Das';
    default:
      return null;
  }
}

const AlwaysVisibleWordInfo = styled(Flex.Column)`
  font-size: 0.875rem;
  font-weight: 600;
  margin: auto 0;
  align-items: center;
  gap: 0.875rem;
`;

const EnglishTranslations = styled(Flex.Column)`
  align-items: center;
`;
const StyledParagraph = styled.p`
  font-style: italic;
`;
function ExtraWordInfo({ word }: { word: Word }) {
  if (word.type === 'NOUN') {
    return <StyledParagraph>{word.gender.toLowerCase()} noun</StyledParagraph>;
  }

  if (word.type === 'ADJECTIVE') {
    return (
      <>
        <StyledParagraph>{word.isComparable ? 'comparable' : 'not comparable'} adjective </StyledParagraph>
        {word.isComparable && (
          <StyledParagraph>
            <span>{word.comparative}</span>
            &dash;
            <span>{word.superlative}</span>
          </StyledParagraph>
        )}
      </>
    );
  }

  if (word.type === 'VERB') {
    const attributes = [];

    attributes.push(word.isRegular ? 'regular' : 'irregular');
    if (word.isSeparable) attributes.push('separable');
    if (word.hasPrefix) attributes.push('prefixed');
    return <p>{attributes.join(',')} verb</p>;
  }

  return <p>{word.type.toLowerCase()}</p>;
}
const StyledHighlightedWord = styled.span`
  font-weight: 600;
`;

function HighlightedGermanExample({ word }: { word: Word }) {
  if (word.matches.length === 0) {
    return <p>{word.germanExample}</p>;
  }

  return (
    <p>
      {word.germanExample.split(' ').map((sentenceWord, key) => {
        return (
          <React.Fragment key={key}>
            {word.matches.includes(sentenceWord) ? (
              <StyledHighlightedWord>{sentenceWord}</StyledHighlightedWord>
            ) : (
              `${sentenceWord} `
            )}
          </React.Fragment>
        );
      })}
    </p>
  );
}

const RevealedWordInfo = styled(Flex.Column)`
  font-size: 0.875rem;
  gap: 0.5rem;
`;

const GermanWord = styled.p`
  font-size: 1.5rem;
`;

const IpaPronunciation = styled.p`
  font-weight: 400;
  font-family: 'Roboto Condensed', sans-serif;
`;

const FlashCardBaseBody = styled(Flex.Column)``;
const NounPlural = styled.p``;

const LoadingCardContainer = styled(Flex.Column)`
  height: -webkit-fill-available;
  height: -moz-available;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 1.5rem;
  font-weight: 600;
  flex: 1;

  & > svg {
    color: ${(props) => props.theme.gameStarsColor};
    animation: rotation 1s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;
function LoadingCard() {
  return (
    <LoadingCardContainer $gap="0.75rem">
      <AiOutlineLoading3Quarters size={'2rem'} />
      <p>Loading...</p>
    </LoadingCardContainer>
  );
}

type FlashCardProps = {
  isAtFront: boolean;
};

type CardAnimationStatus = 'NOT_STARTED' | 'STARTED' | 'FINISHED';

export default function FlashCard({ isAtFront }: FlashCardProps) {
  const { currentWord, nextWord, recordMove, isFetchingWord } = useGameContext();

  const word = isAtFront ? currentWord : nextWord;

  const [revealedCard, setReveleavedCard] = useState(true);
  const [movementFactor, setMovementFactor] = useState(0);
  const [cardXCoordinate, setCardXCoordinate] = useState<number | null>(null);
  const [userSelectionMade, setUserSelectionMade] = useState(false);

  const [animatingBack, setAnimatingBack] = useState<CardAnimationStatus>('NOT_STARTED');

  const { ref, entry } = useIntersection({
    root: null,
    threshold: 1,
  });

  const myFlashCardRef = useRef<HTMLDivElement | null>(null);
  useImperativeHandle(ref, () => myFlashCardRef.current as HTMLDivElement);

  /* const guessWord =
    isFetchingWord || !isAtFront
      ? 'pendingword'
      : word.type === 'NOUN'
        ? `${getDefiniteArticleForGender(word.gender)} ${word.word}`
        : word.word;
 */
  const guessWord = word
    ? word.type === 'NOUN'
      ? `${getDefiniteArticleForGender(word.gender)} ${word.word}`
      : word.word
    : '';

  const updateMovementFactor = (moveClientX: number) => {
    setMovementFactor((moveClientX - (cardXCoordinate ?? moveClientX)) / document.documentElement.clientWidth);
  };

  const resetMovementFactor = () => {
    setCardXCoordinate(null);
    setMovementFactor(0);
  };

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    console.log('touch start fired', event.target);
    const { clientX } = event.changedTouches.item(0);
    setCardXCoordinate(clientX);
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (event) => {
    resetMovementFactor();
    setAnimatingBack('STARTED');
  };
  const onTouchCancel: React.TouchEventHandler<HTMLDivElement> = (event) => {
    console.log('touch cancel fired', event.target);
    resetMovementFactor();
    setAnimatingBack('STARTED');
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (event) => {
    const { clientX } = event.changedTouches.item(0);
    updateMovementFactor(clientX);
  };

  useEffect(() => {
    console.log('intersection ratio', entry?.intersectionRatio, cardXCoordinate);
    if (entry?.intersectionRatio && entry.intersectionRatio < 0.35) {
      // setUserSelectionMade(true);
      recordMove({
        wordId: word.id,
        decision: movementFactor < 0 ? 'LEFT' : 'RIGHT',
      });
      resetMovementFactor();
    }
  }, [entry?.intersectionRatio, recordMove, movementFactor, word, cardXCoordinate]);

  useEffect(() => {
    if (animatingBack === 'STARTED') {
      const timeout = setTimeout(() => setAnimatingBack('NOT_STARTED'), 100);
      return () => clearTimeout(timeout);
    }
  }, [animatingBack]);

  if (userSelectionMade) {
    return <p>You have selected {movementFactor < 0 ? 'left' : 'right'}. Looking up next card..</p>;
  }

  /* return (
    <FlashCardContainer $movementFactor={0} $isAtFront={isAtFront}>
      <Corner>
        <LogoWithoutText />
      </Corner>
      <LoadingCard />
    </FlashCardContainer>
  ); */

  return !isFetchingWord && word ? (
    <FlashCardContainer
      $isAtFront={isAtFront}
      $animatingBack={animatingBack === 'STARTED'}
      ref={movementFactor != 0 && isAtFront ? myFlashCardRef : undefined}
      $movementFactor={movementFactor}
      onTouchStart={isAtFront && animatingBack === 'NOT_STARTED' ? onTouchStart : undefined}
      onTouchEnd={isAtFront && animatingBack === 'NOT_STARTED' ? onTouchEnd : undefined}
      onTouchCancel={isAtFront && animatingBack === 'NOT_STARTED' ? onTouchCancel : undefined}
      onTouchMove={isAtFront && animatingBack === 'NOT_STARTED' ? onTouchMove : undefined}
    >
      <Corner>
        <LogoWithoutText />
      </Corner>
      <FlashCardBaseBody>
        <AlwaysVisibleWordInfo>
          <PlayButton audioSource={word.recordingURLs} />
          <GermanWord>{guessWord}</GermanWord>
          <IpaPronunciation>[{word.pronunciations[0] ?? 'unavailable'}]</IpaPronunciation>

          <>{word.type === 'NOUN' && <NounPlural>Die {word.plural}</NounPlural>}</>

          <>
            {revealedCard && (
              <EnglishTranslations>
                {word.englishTranslations.slice(0, 3).map((translation, key) => (
                  <p key={key}>{translation}</p>
                ))}
              </EnglishTranslations>
            )}
          </>
        </AlwaysVisibleWordInfo>
        <>
          {revealedCard ? (
            <RevealedWordInfo>
              <HighlightedGermanExample word={word} /> <p>{word.englishExample}</p>
            </RevealedWordInfo>
          ) : (
            <ExtraWordInfo word={word} />
          )}
        </>
      </FlashCardBaseBody>
    </FlashCardContainer>
  ) : (
    <FlashCardContainer $movementFactor={0} $isAtFront={isAtFront}>
      <Corner>
        <LogoWithoutText />
      </Corner>
      <LoadingCard />
    </FlashCardContainer>
  );
}
