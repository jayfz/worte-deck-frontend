import { NounGender, Word } from '@/types/domainTypes';
import { Flex } from '@/ui/Flex';
import LogoWithoutText from '@/ui/LogoWithoutText';
import React, { useState } from 'react';
import { IoVolumeHighOutline } from 'react-icons/io5';
import styled from 'styled-components';

type FlashCardProps = {
  word: Word;
};

const FlashCardContainer = styled(Flex.Column)`
  aspect-ratio: 2/3;
  width: 80svw;
  background-color: ${(props) => props.theme.sectionBg};
  border: ${(props) => `2px solid ${props.theme.borderColor}`};
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
  return (
    <StyledPlayButton>
      <IoVolumeHighOutline size={'1.5rem'} />
    </StyledPlayButton>
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
  & > p:nth-child(2) {
    font-size: 1.5rem;
  }

  & > p:nth-child(3) {
    font-weight: 400;
    font-family: 'Roboto Condensed', sans-serif;
  }
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
export default function FlashCard({ word }: FlashCardProps) {
  const [revealedCard, setReveleavedCard] = useState(true);

  const guessWord = word.type === 'NOUN' ? `${getDefiniteArticleForGender(word.gender)} ${word.word}` : word.word;

  return (
    <FlashCardContainer>
      <Corner>
        <LogoWithoutText />
      </Corner>
      <FlashCard.Body>
        <AlwaysVisibleWordInfo>
          <PlayButton audioSource={word.recordingURLs} /> <p>{guessWord}</p>
          <p>[{word.pronunciations[0] ?? 'unavailable'}]</p> {word.type === 'NOUN' ? <p>Die {word.plural}</p> : null}
          {revealedCard && (
            <EnglishTranslations>
              {word.englishTranslations.slice(0, 3).map((translation, key) => (
                <p key={key}>{translation}</p>
              ))}
            </EnglishTranslations>
          )}
        </AlwaysVisibleWordInfo>
        {revealedCard ? (
          <RevealedWordInfo>
            <HighlightedGermanExample word={word} /> <p>{word.englishExample}</p>
          </RevealedWordInfo>
        ) : (
          <ExtraWordInfo word={word} />
        )}
      </FlashCard.Body>
    </FlashCardContainer>
  );
}
