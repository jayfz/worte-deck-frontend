import { Flex } from '@/ui/Flex';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export const StatPanel = styled(Flex.Column)`
  background-color: ${(props) => props.theme.sectionBg};
  border: 2px solid ${(props) => props.theme.borderColor};
  padding: 1rem;
  border-radius: 0.5rem;
  gap: 0.5rem;
`;

export const StatPanelHeader = styled(Flex.Row)`
  justify-content: space-between;
  font-weight: 600;
`;

export const StatPanelBody = styled(Flex.Column)``;

type StatPanelRowType = {
  $odd: boolean;
};

export const StatPanelRow = styled(Flex.Row)<StatPanelRowType>`
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.$odd ? props.theme.statPanelOdd : 'inherit')};
  & > div > p:first-child {
    font-weight: 600;
  }

  & > p {
    font-size: 1.5rem;
  }
`;

type EmptyType = {
  $height: string;
  $width: string;
  $borderRadius: string;
};
const Empty = styled.div<EmptyType>`
  height: ${(props) => props.$height};
  width: ${(props) => props.$width};
  border-radius: ${(props) => props.$borderRadius};
  background-color: ${(props) => props.theme.borderColor};
`;

const StatPanelHeaderSkeletonContainer = styled(StatPanelHeader)`
  width: 100%;
  align-items: center;
  svg {
    color: ${(props) => props.theme.borderColor};
  }
`;
export function StatPanelHeaderSkeleton(props: PropsWithChildren) {
  return (
    <StatPanelHeaderSkeletonContainer>
      <Empty $width="80%" $height="1rem" $borderRadius="1rem" />
      {props.children}
    </StatPanelHeaderSkeletonContainer>
  );
}

const StatPanelRowContentSkeletonContainer = styled(StatPanelRow)`
  color: ${(props) => props.theme.borderColor};
  width: 100%;
`;

export function StatPanelRowContentSkeleton(props: StatPanelRowType) {
  return (
    <StatPanelRowContentSkeletonContainer {...props}>
      <Flex.Column style={{ width: '90%', padding: '0.5rem 0' }} $gap="0.50rem">
        <Empty $height="0.75rem" $width="35%" $borderRadius="4rem" />
        <Empty $height="0.75rem" $width="55%" $borderRadius="4rem" />
      </Flex.Column>
      <p>#</p>
      {/* <Empty $height="2.25rem" $width="2.25rem" $borderRadius="1rem" /> */}
    </StatPanelRowContentSkeletonContainer>
  );
}
