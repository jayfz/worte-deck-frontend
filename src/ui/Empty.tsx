import styled from 'styled-components';

type EmptyType = {
  $height: string;
  $width: string;
  $borderRadius: string;
};
export const Empty = styled.div<EmptyType>`
  height: ${(props) => props.$height};
  width: ${(props) => props.$width};
  border-radius: ${(props) => props.$borderRadius};
  background-color: ${(props) => props.theme.borderColor};
`;
