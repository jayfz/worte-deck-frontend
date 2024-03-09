import { Flex } from '@/ui/Flex';
import React, { useRef } from 'react';
import { IconContext } from 'react-icons';
import { IoStar, IoStarHalfOutline, IoStarOutline } from 'react-icons/io5';
import styled from 'styled-components';

const GameScoreContainer = styled(Flex.Row)`
  color: ${(props) => props.theme.gameStarsColor};
  animation: growAndBack 1s 1;
  view-transition-name: score-star;

  @keyframes growAndBack {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.4);
    }

    100% {
      transform: scale(1);
    }
  }
`;

type GameScoreProps = {
  score: number;
};
export default function GameScore({ score }: GameScoreProps) {
  const starRow = [];

  const starRowRef = useRef<HTMLDivElement | null>(null);

  for (let i = 1; i <= 5; i += 1) {
    if (score >= i) {
      starRow.push(<IoStar />);
    }

    if (score < i) {
      const halfStep = i - 0.5;
      if (score >= halfStep) starRow.push(<IoStarHalfOutline />);
      else starRow.push(<IoStarOutline />);
    }
  }

  /* useEffect(() => {
    if (starRowRef.current) {
      const starRowElement = starRowRef.current;
      starRowElement.style.transform = 'scale(1.1)';
      starRowElement.style.transition = 'transform 0.4s ease';
      const animationId = setTimeout(() => {
        starRowRef.c;
      }, 400);
    }
  }, [score]); */

  return (
    <IconContext.Provider value={{ size: '2rem' }}>
      <GameScoreContainer $gap="0.5rem" ref={starRowRef}>
        {starRow.map((star, key) => React.cloneElement(star, { key }))}
      </GameScoreContainer>
    </IconContext.Provider>
  );
}
