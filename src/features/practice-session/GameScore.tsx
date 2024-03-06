import useGameContext from '@/features/practice-session/useGameContext';
import { Flex } from '@/ui/Flex';
import React from 'react';
import { IconContext } from 'react-icons';
import { IoStar, IoStarHalfOutline, IoStarOutline } from 'react-icons/io5';
import styled from 'styled-components';

const GameScoreContainer = styled(Flex.Row)`
  color: ${(props) => props.theme.gameStarsColor};
`;
export default function GameScore() {
  const { score } = useGameContext();

  const starRow = [];

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

  return (
    <IconContext.Provider value={{ size: '2rem' }}>
      <GameScoreContainer $gap="0.5rem">
        {starRow.map((star, key) => React.cloneElement(star, { key }))}
      </GameScoreContainer>
    </IconContext.Provider>
  );
}
