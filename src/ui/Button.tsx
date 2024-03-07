import styled from 'styled-components';

type ButtonType = {
  $variant: 'primary' | 'secondary';
};
export const Button = styled.button<ButtonType>`
  text-align: center;
  background-color: ${(props) => (props.$variant === 'primary' ? props.theme.primaryTextColor : props.theme.bg)};
  color: ${(props) => (props.$variant === 'primary' ? props.theme.bg : props.theme.primaryTextColor)};
  padding: 0.75rem 0;
  border: ${(props) => (props.$variant === 'primary' ? 'none' : `2px solid ${props.theme.primaryTextColor}`)};
  border-radius: 0.5rem;
  font-weight: 600;
`;
