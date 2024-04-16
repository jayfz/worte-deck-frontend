import {
  StatPanel,
  StatPanelBody,
  StatPanelHeader,
  StatPanelHeaderSkeleton,
  StatPanelRow,
  StatPanelRowContentSkeleton,
} from '@/features/progress-overview/StrippedStatPanel';
import useLastFewPracticeSessions from '@/features/progress-overview/useLastFewPracticeSessions';
import { Flex } from '@/ui/Flex';
import { formatSecondsToShortString } from '@/utils/formatters';
import { IoStar } from 'react-icons/io5';
import styled from 'styled-components';

const Pill = styled.p`
  background-color: ${(props) => props.theme.primaryTextColor};
  color: ${(props) => props.theme.bg};
  border-radius: 5rem;
  font-weight: 600;
  display: inline-flex;
  padding: 1px 6px;
  margin-left: 0.5rem;
  font-size: 0.75rem;
  align-items: center;
`;

const GlowingStar = styled.div`
  color: ${(props) => props.theme.gameStarsColor};
`;
export default function LastFewPracticeSessionsPanel() {
  const { lastFewPracticeSessions, isPendingLastFewPracticeSessions } = useLastFewPracticeSessions();

  if (isPendingLastFewPracticeSessions || !lastFewPracticeSessions)
    return (
      <StatPanel>
        <StatPanelHeader>
          <StatPanelHeaderSkeleton>
            <GlowingStar>
              <IoStar size={'1.5rem'} />
            </GlowingStar>
          </StatPanelHeaderSkeleton>
        </StatPanelHeader>
        <StatPanelBody>
          <StatPanelRowContentSkeleton $odd={true} />
          <StatPanelRowContentSkeleton $odd={false} />
          <StatPanelRowContentSkeleton $odd={true} />
        </StatPanelBody>
      </StatPanel>
    );
  return (
    <StatPanel>
      <StatPanelHeader>
        <p>LAST 3 PRACTICE SESSIONS</p>
        <GlowingStar>
          <IoStar size={'1.5rem'} />
        </GlowingStar>
      </StatPanelHeader>

      <StatPanelBody>
        {lastFewPracticeSessions.map((lfpc, index) => {
          return (
            <StatPanelRow key={lfpc.id} $odd={index % 2 == 0}>
              <Flex.Column>
                <p>{lfpc.wordsTestedCount} words tested</p>
                <Flex.Row>
                  {new Date(lfpc.createdAt).toDateString()}
                  <Pill>{formatSecondsToShortString(lfpc.durationInSeconds)}</Pill>
                </Flex.Row>
              </Flex.Column>
              <p>{lfpc.score}</p>
            </StatPanelRow>
          );
        })}
      </StatPanelBody>
    </StatPanel>
  );
}
