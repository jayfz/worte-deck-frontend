import styled from 'styled-components';

export const Pill = styled.span`
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
