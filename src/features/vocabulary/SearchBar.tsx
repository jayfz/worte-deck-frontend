import { IconContext } from 'react-icons';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import styled from 'styled-components';

const SearchBarContainer = styled.article`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.sectionBg};
  border: 1px solid ${(props) => props.theme.borderColor};
  align-items: center;
  border-radius: 0.5rem;
  padding: 0 0.5rem;
  gap: 0.5rem;
`;
const SearchInput = styled.input`
  outline: none;
  border: none;
  height: 2rem;
  width: auto;
  flex-grow: 1;
  background-color: inherit;
`;
const SearchClearButton = styled.button`
  margin-left: auto;
  background-color: ${(props) => props.theme.bg};
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
`;
type SearchBarProps = {
  text: string;
  updateText: (text: string) => void;
};
export default function SearchBar({ text, updateText }: SearchBarProps) {
  const onClearButtonClick = () => updateText('');
  return (
    <IconContext.Provider value={{ size: '1.5rem' }}>
      <SearchBarContainer>
        <span>
          <IoSearchOutline />
        </span>
        <SearchInput value={text} onChange={({ target }) => updateText(target.value)} />
        <SearchClearButton onClick={onClearButtonClick}>
          <IoCloseOutline />
        </SearchClearButton>
      </SearchBarContainer>
    </IconContext.Provider>
  );
}
