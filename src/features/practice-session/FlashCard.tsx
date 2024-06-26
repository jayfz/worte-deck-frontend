import useCardAnimation from '@/features/practice-session/useCardAnimation';
import useCardSwipeResult from '@/features/practice-session/useCardSwipeResult';
import useGameContext from '@/features/practice-session/useGameContext';
import { NounGender, Word } from '@/types/domainTypes';
import { Flex } from '@/ui/Flex';
import LogoWithoutText from '@/ui/LogoWithoutText';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoVolumeHighOutline } from 'react-icons/io5';
import styled from 'styled-components';

type FlashCardContainerProps = {
  $isAtFront: boolean;
};
const FlashCardContainer = styled(Flex.Column).attrs<FlashCardContainerProps>((props) => props)`
  aspect-ratio: 2/3;
  z-index: ${(props) => (props.$isAtFront ? 10 : 1)};
  width: 80svw;
  background: ${(props) =>
    `linear-gradient(${props.theme.sectionBg}, ${props.theme.sectionBg}) padding-box, linear-gradient(${props.theme.borderColor}, ${props.theme.borderColor}) border-box`};
  border: 4px solid transparent;
  max-width: 640px;
  border-radius: 1rem;
  padding: 0.75rem;
  position: ${(props) => (props.$isAtFront ? 'relative' : 'absolute')};
`;

const Corner = styled.div`
  color: ${(props) => `${props.theme.borderColor}`};
`;

type PlayButtonProps = {
  audioSource: string[];
  positionId: string;
};

const StyledPlayButton = styled.button.attrs<{ $itemId: string }>((props) => ({
  style: {
    viewTransitionName: `play-button-${props.$itemId}`,
  },
}))`
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

  const onPlayAudio: MouseEventHandler = (event) => {
    event.stopPropagation();
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
      <StyledPlayButton $itemId={props.positionId} onClick={onPlayAudio}>
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
            &mdash;
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
    return <p>{attributes.join(', ')} verb</p>;
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

const GermanWord = styled.p.attrs<{ $itemId: string }>((props) => ({
  style: {
    viewTransitionName: `german-word-${props.$itemId}`,
  },
}))`
  font-size: 1.5rem;
`;

const IpaPronunciation = styled.p.attrs<{ $itemId: string }>((props) => ({
  style: {
    viewTransitionName: `ipa-pronunciation-${props.$itemId}`,
  },
}))`
  font-weight: 400;
  font-family: 'Roboto Condensed', sans-serif;
`;

const FlashCardBaseBody = styled(Flex.Column)`
  flex: 1;
  align-items: center;
`;
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

export default function FlashCard({ isAtFront }: FlashCardProps) {
  const { currentWord, nextWord, recordMove, isFetchingWord } = useGameContext();

  const word = isAtFront ? currentWord : nextWord;

  const [revealedCard, setReveleavedCard] = useState(false);

  const myFlashCardRef = useRef<HTMLDivElement | null>(null);
  const guessWord = word
    ? word.type === 'NOUN'
      ? `${getDefiniteArticleForGender(word.gender)} ${word.word}`
      : word.word
    : '';

  const swipeResult = useCardSwipeResult(myFlashCardRef, isAtFront);
  const cardAnimatedOut = useCardAnimation(myFlashCardRef, isAtFront, swipeResult);

  useEffect(() => {
    if (swipeResult !== 'PENDING' && cardAnimatedOut && !isFetchingWord) {
      recordMove({
        decision: swipeResult,
        wordId: word.id,
      });
    }
  }, [swipeResult, cardAnimatedOut, recordMove, word, isFetchingWord]);

  return !isFetchingWord && word ? (
    <FlashCardContainer
      ref={myFlashCardRef}
      $isAtFront={isAtFront}
      onClick={() => {
        flushSync(() => {
          if (!document.startViewTransition) {
            setReveleavedCard(true);
          } else {
            document.startViewTransition(() => {
              setReveleavedCard((prev) => !prev);
            });
          }
        });
      }}
    >
      <Corner>
        <LogoWithoutText />
      </Corner>
      <FlashCardBaseBody>
        <AlwaysVisibleWordInfo>
          <PlayButton positionId={isAtFront ? 'front' : 'back'} audioSource={word.recordingURLs} />
          <GermanWord $itemId={isAtFront ? 'front' : 'back'}>{guessWord}</GermanWord>
          <IpaPronunciation $itemId={isAtFront ? 'front' : 'back'}>
            [{word.pronunciations[0] ?? 'unavailable'}]
          </IpaPronunciation>

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
    <FlashCardContainer $isAtFront={isAtFront}>
      <Corner>
        <LogoWithoutText />
      </Corner>
      <LoadingCard />
    </FlashCardContainer>
  );
}
