import styled from 'styled-components';

type FlexProps = {
  $gap?: string;
  $direction?: 'row' | 'column';
};

export const FlexBase = styled.div.attrs<FlexProps>((props) => ({
  $gap: props.$gap ?? '0',
  $direction: props.$direction ?? 'row',
}))`
  display: flex;
  flex-direction: ${(props) => props.$direction};
  gap: ${(props) => props.$gap};
`;
