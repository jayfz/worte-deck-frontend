import { Button } from '@/ui/Button';
import { PropsWithChildren, useEffect, useRef } from 'react';
import styled from 'styled-components';

/* type PopupProps = {
  onProceed: () => void;
  onCancel: () => void;
}; */

const StyledPopup = styled.dialog`
  z-index: 100;
  background-color: ${(props) => props.theme.bg};
  border: 2px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.primaryTextColor};
  border-radius: 0.5rem;
  max-width: 75svw;
  padding: 1.5rem;
  font-weight: 600;

  & div {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  & section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &::backdrop {
    backdrop-filter: blur(8px);
  }
`;

export default function Popup(props: PropsWithChildren) {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const dialog = ref.current;

    dialog.showModal();

    return () => dialog.close();
  }, []);

  return (
    <StyledPopup ref={ref}>
      <div>{props.children}</div>
    </StyledPopup>
  );
}

type PopupOkProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type PopupCancelProps = PopupOkProps;

Popup.Message = function (props: PropsWithChildren) {
  return <p>{props.children}</p>;
};

Popup.ButtonSelection = function (props: PropsWithChildren) {
  return <section>{props.children}</section>;
};

Popup.Ok = function ({ children, ...rest }: PropsWithChildren<PopupOkProps>) {
  return (
    <Button type="button" $variant="primary" {...rest}>
      {children}
    </Button>
  );
};

Popup.Cancel = function ({ children, ...rest }: PropsWithChildren<PopupCancelProps>) {
  return (
    <Button $variant="secondary" {...rest}>
      {children}
    </Button>
  );
};
