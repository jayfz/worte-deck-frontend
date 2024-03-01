import { formatSeconds } from '@/utils/formatters';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.p`
  font-weight: 600;
  padding: 0.5rem;
  font-size: 1.25rem;
  font-family: 'Roboto Mono', monospace;
`;
export default function GameTimer() {
  const [seconds, setSeconds] = useState(0);

  const increaseByOneSecond = () => setSeconds((prev) => prev + 1);

  useEffect(() => {
    const timing = setInterval(increaseByOneSecond, 1000);
    return () => clearInterval(timing);
  }, []);

  return <TimerContainer>{formatSeconds(seconds)}</TimerContainer>;
}
