import LastFewPracticeSessionsPanel from '@/features/progress-overview/LastFewPracticeSessionsPanel';
import MostDifficultWordsPanel from '@/features/progress-overview/MostDifficultWordsPanel';
import PracticeSessionStatsPanel from '@/features/progress-overview/PracticeSessionStatsPanel';
import TopCard from '@/features/progress-overview/TopCard';
import WordStatsPanel from '@/features/progress-overview/WordStatsPanel';
import { Flex } from '@/ui/Flex';
import PageTitle from '@/ui/PageTitle';
import styled from 'styled-components';

const PageContainer = styled(Flex.Column)`
  padding: 0 1.5rem;
  padding-bottom: 1.5rem;
  gap: 1rem;
`;
const PageBody = styled(Flex.Column)`
  gap: 1rem;
`;

export default function ProgressOverviewPage() {
  return (
    <PageContainer>
      <PageTitle>Progress Overview</PageTitle>
      <PageBody>
        <TopCard />
        <WordStatsPanel />
        <PracticeSessionStatsPanel />
        <MostDifficultWordsPanel />
        <LastFewPracticeSessionsPanel />
      </PageBody>
    </PageContainer>
  );
}
