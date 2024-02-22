import {
  IoAccessibilityOutline,
  IoBookOutline,
  IoCloseOutline,
  IoEyeOutline,
  IoGameControllerOutline,
  IoLogOutOutline,
  IoReceiptOutline,
} from 'react-icons/io5';

import useDrawerContext from '@/context/useDrawerContext';
import { Flex } from '@/ui/Flex';
import LogoWithText from '@/ui/LogoWithText';
import { MouseEventHandler, PropsWithChildren } from 'react';
import { IconContext } from 'react-icons';
import { NavLink } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

const DrawerOverlay = styled.div<{ $isVisible: boolean }>`
  backdrop-filter: blur(2px);
  width: 100%;
  height: 100%;
  position: absolute;
  transform: ${(props) => (!props.$isVisible ? 'translate(-100%)' : 'translate(0%)')};
  transition: transform 0.25s ease-out;
  z-index: 1000;
`;

function DrawerOverlayContainer(props: PropsWithChildren) {
  const { closeDrawer, isOpen } = useDrawerContext();

  return (
    <DrawerOverlay $isVisible={isOpen} onClick={closeDrawer}>
      {props.children}
    </DrawerOverlay>
  );
}
const DrawerContainer = styled(Flex.Column)`
  width: 80%;
  padding: 1.25rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  background: ${(props) => props.theme.drawerBgColor};
  height: 100svh;
  overflow-y: auto;
`;

const DrawerHeader = styled(Flex.Column)`
  align-items: center;
  height: 25svh;
  & > button:first-child {
    align-self: end;
  }

  & > svg {
    margin: 3rem 0;
  }
`;

const DrawerBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  overflow-y: scroll;
  font-family: 'Inter', sans-serif;
  padding-top: 3rem;

  & > a:last-child {
    margin-top: auto;
    margin-bottom: 1rem;
  }
`;

type DrawerLinkProps = {
  to: string;
} & React.HTMLAttributes<HTMLAnchorElement> &
  React.DOMAttributes<HTMLAnchorElement>;

const StyledDrawerLink = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: ${(props) => props.theme.drawerLinkColor};

  &.active {
    background-color: ${(props) => props.theme.drawerLinkSelectedColor};
  }
`;

function SimpleDrawerLink({ children, to, onClick, ...attributes }: PropsWithChildren<DrawerLinkProps>) {
  const { closeDrawer } = useDrawerContext();

  const onDrawerLinkClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (onClick) onClick(event);
    closeDrawer();
  };

  return (
    <StyledDrawerLink end {...attributes} onClick={onDrawerLinkClick} to={to}>
      {children}
    </StyledDrawerLink>
  );
}

function CloseDrawerButton() {
  const { closeDrawer } = useDrawerContext();
  return (
    <button onClick={closeDrawer}>
      <IoCloseOutline />
    </button>
  );
}

export default function Drawer() {
  const theme = useTheme();
  return (
    <IconContext.Provider value={{ color: theme.drawerIconColor, size: '1.5rem' }}>
      <DrawerOverlayContainer>
        <DrawerContainer>
          <DrawerHeader>
            <CloseDrawerButton />
            <LogoWithText />
          </DrawerHeader>
          <DrawerBody>
            <SimpleDrawerLink to="/app/progress-overview">
              <IoEyeOutline />
              <span>Progress overview</span>
            </SimpleDrawerLink>

            <SimpleDrawerLink to="/app/practice-session">
              <IoGameControllerOutline />
              <span>Practice session</span>
            </SimpleDrawerLink>

            <SimpleDrawerLink to="/app/vocabulary">
              <IoBookOutline />
              <span>Vocabulary learnt</span>
            </SimpleDrawerLink>
            <SimpleDrawerLink to="/app/practice-session/tests">
              <IoReceiptOutline />
              <span>Practice session results</span>
            </SimpleDrawerLink>
            <SimpleDrawerLink to="/app/manage-vocabulary">
              <IoAccessibilityOutline />
              <span>Manage vocabulary</span>
            </SimpleDrawerLink>

            <SimpleDrawerLink to="/logout">
              <IoLogOutOutline />
              <span>Logout</span>
            </SimpleDrawerLink>
          </DrawerBody>
        </DrawerContainer>
      </DrawerOverlayContainer>
    </IconContext.Provider>
  );
}
