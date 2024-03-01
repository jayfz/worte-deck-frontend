import { useApplicationContext } from '@/context/useApplicationContext';
import useDrawerContext from '@/context/useDrawerContext';
import { Flex } from '@/ui/Flex';
import { IconContext } from 'react-icons';
import {
  IoAddOutline,
  IoArrowBackOutline,
  IoCreateOutline,
  IoMenu,
  IoMoonOutline,
  IoSunnyOutline,
} from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

const MenuBarContainer = styled(Flex.Row)`
  justify-content: flex-end;
  padding: 1.25rem;

  & > button:first-child {
    margin-right: auto;
  }
`;

const MenuIconButton = styled.button``;

function BackMenuIcon() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <MenuIconButton onClick={goBack}>
      <IoArrowBackOutline />
    </MenuIconButton>
  );
}

function DrawerMenuIcon() {
  const { openDrawer } = useDrawerContext();
  return (
    <MenuIconButton onClick={openDrawer}>
      <IoMenu />
    </MenuIconButton>
  );
}

function ThemeSwitcherMenuIcon() {
  const { isDarkTheme, toggleTheme } = useApplicationContext();

  return <MenuIconButton onClick={toggleTheme}>{isDarkTheme ? <IoSunnyOutline /> : <IoMoonOutline />}</MenuIconButton>;
}

function ContextualMenuIcon() {
  const location = useLocation();

  switch (location.pathname) {
    case '/app/manage-vocabulary/add-word':
      return (
        <MenuIconButton>
          <Link to="/app/manage-vocabulary/edit-word">
            <IoCreateOutline />
          </Link>
        </MenuIconButton>
      );
    case '/app/manage-vocabulary/edit-word':
      return (
        <MenuIconButton>
          <Link to="/app/manage-vocabulary/add-word">
            <IoAddOutline />
          </Link>
        </MenuIconButton>
      );

    default:
      return null;
  }
}

export default function MenuBar() {
  const theme = useTheme();

  console.log(location);
  return (
    <IconContext.Provider value={{ size: '1.5rem', color: theme.primaryTextColor, style: { strokeWidth: 9 } }}>
      <MenuBarContainer $gap="1rem">
        <BackMenuIcon />
        <ThemeSwitcherMenuIcon />
        <ContextualMenuIcon />
        <DrawerMenuIcon />
      </MenuBarContainer>
    </IconContext.Provider>
  );
}
