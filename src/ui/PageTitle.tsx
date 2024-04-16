import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Title = styled.p`
  font-size: 1.5rem;
`;

export default function PageTitle(props: PropsWithChildren) {
  return <Title>{props.children}</Title>;
}
