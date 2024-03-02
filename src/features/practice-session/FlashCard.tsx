import { NounGender, Word } from '@/types/domainTypes';
import { Flex } from '@/ui/Flex';
import LogoWithoutText from '@/ui/LogoWithoutText';
import React, { TouchEventHandler, useEffect, useRef, useState } from 'react';
import { IoVolumeHighOutline } from 'react-icons/io5';
import styled from 'styled-components';

type FlashCardProps = {
  word: Word;
};

const FlashCardContainer = styled(Flex.Column).attrs<{ $movementFactor: number }>((props) => props)`
  aspect-ratio: 2/3;
  position: relative;
  z-index: 10;
  width: 80svw;
  background-color: ${(props) => props.theme.sectionBg};
  border: ${(props) => `2px solid ${props.theme.borderColor}`};
  transform-origin: ${(props) => (props.$movementFactor > 0 ? 'right bottom' : 'left bottom')};
  transform: rotate(clamp(-18deg, ${(props) => props.$movementFactor * 16}deg, 18deg))
    translateX(${(props) => props.$movementFactor * 25}rem);

  /* transition: transform 0.5s linear; */
  max-width: 640px;
  border-radius: 1rem;
  padding: 0.75rem;
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

FlashCard.Body = styled(Flex.Column)`
  align-items: center;
  height: 100%;
  padding: 0.875rem 0;
`;

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

const NounPlural = styled.p``;
export default function FlashCard({ word }: FlashCardProps) {
  const [revealedCard, setReveleavedCard] = useState(true);
  const [movementFactor, setMovementFactor] = useState(0);
  const [cardXCoordinate, setCardXCoordinate] = useState(0);

  const guessWord = word.type === 'NOUN' ? `${getDefiniteArticleForGender(word.gender)} ${word.word}` : word.word;

  const flashCardRef = useRef<HTMLDivElement | null>(null);

  const updateMovementFactor = (moveClientX: number) => {
    if (cardXCoordinate == 0 || moveClientX == 0) {
      setCardXCoordinate(moveClientX);
      setMovementFactor(0);
      return;
    }
    setMovementFactor((moveClientX - cardXCoordinate) / document.documentElement.clientWidth);
  };

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    // event.preventDefault(); prevents mouseevents
    // setCardXCoordinate(event.changedTouches.item(0).clientX);
    console.log('touch start fired', event.changedTouches.item(0).clientX);
  };

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
    // event.preventDefault(); prevents mouseevents
    // console.log('touch end fired', event.target);
    updateMovementFactor(0);
  };
  const onTouchCancel: TouchEventHandler<HTMLDivElement> = (event) => {
    // event.preventDefault();
    // console.log('touch cancel fired', event.target);
    // setCardXCoordinate(0);
    updateMovementFactor(0);
  };
  const onTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
    // event.preventDefault();
    // console.log('touch move fired', event.currentTarget);
    console.log(event.changedTouches.item(0));
    const { clientX, clientY } = event.changedTouches.item(0);
    updateMovementFactor(clientX);
    console.log(cardXCoordinate, clientX, movementFactor);
  };

  useEffect(() => {
    // console.log(`${cardXCoordinate} cardxcoordinate`);
  });

  return (
    <FlashCardContainer
      $movementFactor={movementFactor}
      ref={flashCardRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
      onTouchMove={onTouchMove}
    >
      <Corner>
        <LogoWithoutText />
      </Corner>
      <FlashCard.Body>
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
      </FlashCard.Body>
    </FlashCardContainer>
  );
}
