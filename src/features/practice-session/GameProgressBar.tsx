import useGameContext from '@/features/practice-session/useGameContext';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  height: 2rem;
  position: relative;
  overflow: hidden;
  border: 4px solid ${(props) => props.theme.borderColor};
  border-radius: 999px;
  width: 80svw;
  max-width: 640px;
`;

const ProgressBar = styled.div<{ $completed: number }>`
  height: 100%;
  background-color: ${(props) => props.theme.borderColor};
  border-radius: 999px;
  border: 4px solid ${(props) => props.theme.borderColor};
  position: absolute;
  width: 100%;
  transform: ${(props) => `translate(calc(${props.$completed}% - 100%)) scaleY(1.1)`};
`;
export default function GameProgressBar() {
  const { completed } = useGameContext();
  return (
    <ProgressBarContainer>
      <ProgressBar $completed={completed} />
    </ProgressBarContainer>
  );
}
