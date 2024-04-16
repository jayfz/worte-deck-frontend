import useWordStats from '@/features/progress-overview/useWordStats';
import { Flex } from '@/ui/Flex';
import { SpinningIcon } from '@/ui/SpinningIcon';
import { PropsWithChildren } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoArrowForward } from 'react-icons/io5';
import styled from 'styled-components';

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'nouns adverbs'
    'verbs adjectives'
    'commonExp commonExp';
  gap: 0.5rem;
`;

type WordStatsGridElementProps = {
  $gridSlot: 'nouns' | 'adverbs' | 'verbs' | 'adjectives' | 'commonExp' | 'commonExp';
  $height?: string;
  $gradientColor1?: string;
  $gradientColor2?: string;
};

function gradientColorForWordType(wordtype: WordStatsGridElementProps['$gridSlot'], contrast: string) {
  switch (wordtype) {
    case 'nouns':
      return { $gradientColor1: `hsl(0 91 68 / ${contrast})`, $gradientColor2: `hsl(25 100 67 / ${contrast})` };
    case 'adjectives':
      return { $gradientColor1: `hsl(266 100 64 / ${contrast})`, $gradientColor2: `hsl(259 100 76 / ${contrast})` };
    case 'adverbs':
      return { $gradientColor1: `hsl(234 100 65 / ${contrast})`, $gradientColor2: `hsl(205 100 75 / ${contrast})` };
    case 'verbs':
      return { $gradientColor1: `hsl(51 100 72 / ${contrast})`, $gradientColor2: `hsl(47 100 72 / ${contrast})` };
    case 'commonExp':
      return { $gradientColor1: `hsl(155 62 50 / ${contrast})`, $gradientColor2: `hsl(205 100 65 / ${contrast})` };
    default:
      throw new Error('Unknow wordtype');
  }
}
const StyledGridElement = styled(Flex.Row).attrs<WordStatsGridElementProps>((props) => {
  return gradientColorForWordType(props.$gridSlot, props.theme.constrast);
})`
  grid-area: ${(props) => props.$gridSlot};
  height: ${(props) => props.$height ?? 'auto'};
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(to bottom, ${(props) => `${props.$gradientColor1} , ${props.$gradientColor2} `});
  color: ${(props) => props.theme.ColoredStatPanelText};
  padding: 0.5rem 0.5rem;
  border-radius: 0.5rem;
`;

const Stat = styled(Flex.Column)`
  font-weight: 600;
  align-items: center;
  p:first-child {
    font-size: 2rem;
  }
`;

const RowStat = styled(Stat)`
  flex-direction: row;
  gap: 1rem;
  padding: 0.75rem 0.75rem;
`;

type GridElementType = {
  $gridSlot: WordStatsGridElementProps['$gridSlot'];
};
function GridElement(props: PropsWithChildren<GridElementType>) {
  const wordType = props.$gridSlot.charAt(0).toUpperCase() + props.$gridSlot.slice(1);
  return (
    <StyledGridElement $gridSlot={props.$gridSlot}>
      <IoArrowForward size={'2rem'} style={{ opacity: 0 }} />
      <Stat>
        <p>{props.children}</p>
        <p>{wordType}</p>
      </Stat>
      <IoArrowForward size={'2rem'} />
    </StyledGridElement>
  );
}

function GridElementSkeleton(props: PropsWithChildren<GridElementType>) {
  const wordType = props.$gridSlot.charAt(0).toUpperCase() + props.$gridSlot.slice(1);
  return (
    <StyledGridElement $gridSlot={props.$gridSlot} $height="5.5rem">
      <IoArrowForward size={'2rem'} style={{ opacity: 0 }} />
      <Stat>
        <SpinningIcon style={{ padding: '0.5rem 0' }}>
          <AiOutlineLoading3Quarters size={'2rem'} />
        </SpinningIcon>
        <p>{wordType}</p>
      </Stat>

      <IoArrowForward size={'2rem'} style={{ opacity: 0 }} />
    </StyledGridElement>
  );
}

function FullWidthGridElement(props: PropsWithChildren) {
  return (
    <StyledGridElement $gridSlot={'commonExp'}>
      <IoArrowForward size={'2rem'} style={{ opacity: 0 }} />
      <RowStat>
        <p>{props.children}</p>
        <p>Common Expressions</p>
      </RowStat>
      <IoArrowForward size={'2rem'} />
    </StyledGridElement>
  );
}
function FullWidthGridElementSkeleton() {
  return (
    <StyledGridElement $gridSlot={'commonExp'} $height="5.5rem">
      <IoArrowForward size={'2rem'} style={{ opacity: 0 }} />
      <RowStat>
        <SpinningIcon>
          <AiOutlineLoading3Quarters size={'2rem'} />
        </SpinningIcon>
      </RowStat>
      <IoArrowForward size={'2rem'} style={{ opacity: 0 }} />
    </StyledGridElement>
  );
}

export default function WordStatsPanel() {
  const { wordStats, isWordStatsPending } = useWordStats();

  if (isWordStatsPending || !wordStats)
    return (
      <Grid>
        <GridElementSkeleton $gridSlot="nouns" />
        <GridElementSkeleton $gridSlot="adverbs" />
        <GridElementSkeleton $gridSlot="verbs" />
        <GridElementSkeleton $gridSlot="adjectives" />
        <FullWidthGridElementSkeleton />
      </Grid>
    );
  return (
    <Grid>
      <GridElement $gridSlot="nouns">{wordStats.nounCount}</GridElement>
      <GridElement $gridSlot="adverbs">{wordStats.adverbCount}</GridElement>
      <GridElement $gridSlot="verbs">{wordStats.verbCount}</GridElement>
      <GridElement $gridSlot="adjectives">{wordStats.adjectiveCount}</GridElement>
      <FullWidthGridElement>{wordStats.commonExpressionCount}</FullWidthGridElement>
    </Grid>
  );
}
